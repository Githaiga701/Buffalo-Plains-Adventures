/**
 * PayPal Webhook API Route
 * POST /api/paypal/webhook
 *
 * Handles PayPal webhook events with signature verification
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyPayPalWebhookSignature, extractPayPalTransactionData } from "@/lib/paypal";
import { PayPalWebhookSchema } from "@/lib/validation";
import { ApiResponse, checkIdempotencyKey, storeIdempotencyResponse, validateWebhookPayload, checkRateLimit } from "@/lib/webhook-security";
import { logger } from "@/lib/logging";

// Webhook event handlers map
const eventHandlers: Record<string, (data: any) => Promise<void>> = {
  "PAYMENT.CAPTURE.COMPLETED": async (data: any) => {
    const transactionData = extractPayPalTransactionData(data);
    logger.info("Payment capture completed", "paypal:webhook", transactionData);
    // TODO: Update order status in your database
    // TODO: Send confirmation email to customer
  },

  "PAYMENT.CAPTURE.DENIED": async (data: any) => {
    const transactionData = extractPayPalTransactionData(data);
    logger.warn("Payment capture denied", "paypal:webhook", transactionData);
    // TODO: Update order status to failed
    // TODO: Notify user of payment denial
  },

  "CHECKOUT.ORDER.APPROVED": async (data: any) => {
    const transactionData = extractPayPalTransactionData(data);
    logger.info("Checkout order approved", "paypal:webhook", transactionData);
    // TODO: Update order status to approved (pending capture)
  },
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  const webhookId = request.headers.get("paypal-transmission-id") || "unknown";

  try {
    // Rate limiting
    const rateLimitResult = checkRateLimit(`paypal-webhook`, 100, 60);
    if (!rateLimitResult.allowed) {
      logger.warn("Webhook rate limit exceeded", "paypal:webhook", {
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

    // Extract webhook headers
    const transmissionId = request.headers.get("paypal-transmission-id");
    const transmissionTime = request.headers.get("paypal-transmission-time");
    const certUrl = request.headers.get("paypal-cert-url");
    const authAlgo = request.headers.get("paypal-auth-algo");
    const transmissionSig = request.headers.get("paypal-transmission-sig");

    // Validate webhook headers
    if (!transmissionId || !transmissionTime || !certUrl || !authAlgo || !transmissionSig) {
      logger.warn("Missing webhook headers", "paypal:webhook");
      const response = ApiResponse.badRequest("Missing required PayPal webhook headers");
      return ApiResponse.toResponse(response);
    }

    // Check idempotency using PayPal transmission ID
    const cached = checkIdempotencyKey(transmissionId);
    if (cached.cached && cached.status === "completed") {
      logger.info("Webhook already processed (idempotent)", "paypal:webhook", {
        transmissionId,
      });
      return new NextResponse(
        JSON.stringify({ success: true, message: "Webhook already processed" }),
        { status: 200 }
      );
    }

    // Parse webhook body
    let body;
    try {
      body = await request.json();
    } catch {
      logger.error("Failed to parse webhook body", "Invalid JSON", "paypal:webhook");
      const response = ApiResponse.badRequest("Invalid JSON in webhook body");
      return ApiResponse.toResponse(response);
    }

    // Validate webhook payload structure
    const requiredFields = ["id", "event_type", "resource", "resource_type"];
    const payloadValidation = validateWebhookPayload(body, requiredFields);

    if (!payloadValidation.valid) {
      logger.warn("Webhook payload validation failed", "paypal:webhook", {
        errors: payloadValidation.errors,
        transmissionId,
      });
      const response = ApiResponse.badRequest("Invalid webhook payload", payloadValidation.errors);
      return ApiResponse.toResponse(response);
    }

    // Validate webhook with ZOD
    const schemaValidation = PayPalWebhookSchema.safeParse(body);
    if (!schemaValidation.success) {
      logger.warn("Webhook schema validation failed", "paypal:webhook", {
        errors: schemaValidation.error.errors,
      });
      const response = ApiResponse.badRequest("Webhook validation failed", schemaValidation.error.errors);
      return ApiResponse.toResponse(response);
    }

    const webhookEvent = schemaValidation.data;

    logger.logWebhookReceived("paypal:webhook", transmissionId, webhookEvent.event_type);

    // Verify webhook signature (IMPORTANT for security)
    const isSignatureValid = await verifyPayPalWebhookSignature(
      transmissionId,
      transmissionTime,
      certUrl,
      authAlgo,
      transmissionSig,
      webhookEvent
    );

    if (!isSignatureValid) {
      logger.error(
        "Webhook signature verification failed - rejecting webhook",
        "Signature mismatch",
        "paypal:webhook",
        {
          transmissionId,
          eventId: webhookEvent.id,
        }
      );
      const response = ApiResponse.error("Signature verification failed", "SIGNATURE_INVALID", 401);
      return ApiResponse.toResponse(response);
    }

    // Get event handler
    const eventHandler = eventHandlers[webhookEvent.event_type];

    if (eventHandler) {
      try {
        await eventHandler(webhookEvent);
        logger.logWebhookProcessed("paypal:webhook", transmissionId, true, {
          eventType: webhookEvent.event_type,
        });
      } catch (handlerError) {
        logger.error(
          "Webhook event handler failed",
          handlerError,
          "paypal:webhook",
          {
            eventType: webhookEvent.event_type,
            transmissionId,
          }
        );
        // Still mark as processed but log the error
        // In a real system, you might want to retry or queue this
      }
    } else {
      logger.debug(`No handler for event type: ${webhookEvent.event_type}`, "paypal:webhook");
    }

    // Store as processed
    storeIdempotencyResponse(transmissionId, { processed: true }, "completed");

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Webhook processed successfully",
        webhookId: webhookEvent.id,
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
    logger.error("Webhook processing error", error, "paypal:webhook", {
      transmissionId: webhookId,
    });

    const response = ApiResponse.serverError(
      "Failed to process webhook",
      process.env.NODE_ENV === "development" ? error.message : undefined
    );

    return ApiResponse.toResponse(response);
  }
}

export function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
