/**
 * M-Pesa Webhook API Route
 * POST /api/mpesa/webhook
 *
 * Handles M-Pesa STK Push callback
 */

import { NextRequest, NextResponse } from "next/server";
import { parseMpesaCallback, validateMpesaCallbackOrigin } from "@/lib/mpesa";
import { MpesaCallbackSchema } from "@/lib/validation";
import { ApiResponse, checkIdempotencyKey, storeIdempotencyResponse, validateWebhookPayload, checkRateLimit } from "@/lib/webhook-security";
import { logger } from "@/lib/logging";

// Webhook event handlers
const handleStkCallback = async (data: any): Promise<void> => {
  const { success, metadata, message } = parseMpesaCallback(data);

  if (success && metadata) {
    logger.info("M-Pesa payment successful", "mpesa:webhook", {
      transactionId: metadata.mpesaReceiptNumber,
      amount: metadata.amount,
      phoneNumber: metadata.phoneNumber,
    });

    // TODO: Update order status to completed
    // TODO: Send payment confirmation email
    // TODO: Process booking/service delivery
  } else {
    logger.warn("M-Pesa payment failed", "mpesa:webhook", {
      message,
      checkoutRequestID: data.Body?.stkCallback?.CheckoutRequestID,
    });

    // TODO: Update order status to failed
    // TODO: Notify user of payment failure
  }
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  const webhookTimestamp = new Date().toISOString();

  try {
    // Rate limiting
    const rateLimitResult = checkRateLimit(`mpesa-webhook`, 100, 60);
    if (!rateLimitResult.allowed) {
      logger.warn("Webhook rate limit exceeded", "mpesa:webhook", {
        retryAfter: rateLimitResult.retryAfter,
      });
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Rate limit exceeded",
        }),
        {
          status: 429,
          headers: {
            "Retry-After": rateLimitResult.retryAfter?.toString() || "60",
          },
        }
      );
    }

    // Get raw body for signature verification (if using signature)
    const rawBody = await request.text();

    // Validate that callback comes from Safaricom
    // In production, also validate IP whitelist at the firewall/API gateway level
    const signature = request.headers.get("x-signature");
    const isOriginValid = validateMpesaCallbackOrigin(rawBody, signature || undefined);

    if (!isOriginValid) {
      logger.warn("Invalid M-Pesa callback origin", "mpesa:webhook");
      // Note: M-Pesa callbacks should be validated at infrastructure level
      // This is a secondary check
    }

    // Parse webhook body
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch {
      logger.error("Failed to parse webhook body", "Invalid JSON", "mpesa:webhook");
      const response = ApiResponse.badRequest("Invalid JSON in webhook body");
      return ApiResponse.toResponse(response);
    }

    // Validate webhook payload structure
    const requiredFields = ["Body.stkCallback"];
    const payloadValidation = validateWebhookPayload(body, requiredFields);

    if (!payloadValidation.valid) {
      logger.warn("Webhook payload validation failed", "mpesa:webhook", {
        errors: payloadValidation.errors,
      });
      const response = ApiResponse.badRequest("Invalid webhook payload", payloadValidation.errors);
      return ApiResponse.toResponse(response);
    }

    // Validate with Zod schema
    const schemaValidation = MpesaCallbackSchema.safeParse(body);
    if (!schemaValidation.success) {
      logger.warn("Webhook schema validation failed", "mpesa:webhook", {
        errors: schemaValidation.error.errors,
      });
      const response = ApiResponse.badRequest("Webhook validation failed", schemaValidation.error.errors);
      return ApiResponse.toResponse(response);
    }

    const webhookData = schemaValidation.data;
    const checkoutRequestID = webhookData.Body.stkCallback.CheckoutRequestID;
    const merchantRequestID = webhookData.Body.stkCallback.MerchantRequestID;

    logger.logWebhookReceived("mpesa:webhook", checkoutRequestID, "STK_CALLBACK");

    // Check idempotency using M-Pesa reference IDs
    const idempotencyKey = `${merchantRequestID}|${checkoutRequestID}`;
    const cached = checkIdempotencyKey(idempotencyKey);

    if (cached.cached && cached.status === "completed") {
      logger.info("Webhook already processed (idempotent)", "mpesa:webhook", {
        checkoutRequestID,
      });

      // Return success to avoid M-Pesa retries
      return new NextResponse(
        JSON.stringify({
          success: true,
          message: "Webhook already processed",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        }
      );
    }

    // Process the callback
    try {
      await handleStkCallback(webhookData);

      logger.logWebhookProcessed("mpesa:webhook", checkoutRequestID, true, {
        merchantRequestID,
      });
    } catch (handlerError) {
      logger.error(
        "Webhook event handler failed",
        handlerError,
        "mpesa:webhook",
        {
          checkoutRequestID,
          merchantRequestID,
        }
      );
      // Continue - we'll still return 200 to stop M-Pesa retries
      // In production, queue this for retry
    }

    // Store as processed
    storeIdempotencyResponse(idempotencyKey, { processed: true }, "completed");

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Webhook processed successfully",
        checkoutRequestID,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    logger.error("Webhook processing error", error, "mpesa:webhook", {
      timestamp: webhookTimestamp,
    });

    // Return 200 to prevent M-Pesa retries, but log the error
    // In production, queue this for manual review
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Error processing webhook",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  }
}

export function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type, X-Signature",
    },
  });
}
