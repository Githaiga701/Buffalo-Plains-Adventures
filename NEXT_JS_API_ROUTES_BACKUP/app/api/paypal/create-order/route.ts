/**
 * PayPal Create Order API Route
 * POST /api/paypal/create-order
 * 
 * Creates a PayPal order and returns the order ID for checkout
 */

import { NextRequest, NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/paypal";
import { PayPalCreateOrderSchema } from "@/lib/validation";
import { ApiResponse, checkIdempotencyKey, storeIdempotencyResponse, validateRequest } from "@/lib/webhook-security";
import { logger } from "@/lib/logging";
import { z } from "zod";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Validate request headers
    const headerValidation = validateRequest(request.headers, {
      requireContentType: "application/json",
      requireIdempotencyKey: false,
    });

    if (!headerValidation.valid) {
      logger.warn(headerValidation.error || "Invalid request", "paypal:create-order");
      const response = ApiResponse.badRequest(headerValidation.error || "Invalid request");
      return ApiResponse.toResponse(response);
    }

    // Check idempotency
    const idempotencyKey = request.headers.get("idempotency-key");
    if (idempotencyKey) {
      const cached = checkIdempotencyKey(idempotencyKey);
      if (cached.cached) {
        logger.info("Returning cached response for idempotent request", "paypal:create-order", {
          keyLength: idempotencyKey.length,
        });
        return ApiResponse.toResponse(cached.response);
      }
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch {
      logger.warn("Invalid JSON in request body", "paypal:create-order");
      const response = ApiResponse.badRequest("Invalid JSON in request body");
      return ApiResponse.toResponse(response);
    }

    // Validate payload with Zod
    const validationResult = PayPalCreateOrderSchema.safeParse(body);
    if (!validationResult.success) {
      logger.warn("Validation failed", "paypal:create-order", {
        errors: validationResult.error.errors,
      });
      const response = ApiResponse.badRequest(
        "Validation failed",
        validationResult.error.errors
      );
      return ApiResponse.toResponse(response);
    }

    const { amount, currency, orderId, description, customerEmail, metadata } = validationResult.data;

    logger.logTransactionStart("paypal:create-order", orderId, amount, "PayPal");

    // Prepare PayPal order payload
    const paypalOrderPayload = {
      intent: "CAPTURE" as const,
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: currency,
                value: amount.toFixed(2),
              },
            },
          },
          items: [
            {
              name: description,
              unit_amount: {
                currency_code: currency,
                value: amount.toFixed(2),
              },
              quantity: "1",
              category: "DIGITAL_SERVICE",
            },
          ],
          description,
          reference_id: orderId,
          custom_id: orderId,
          invoice_id: `INV-${orderId}`,
        },
      ],
    };

    // Create PayPal order
    const returnUrl = new URL(request.url).origin + "/payment/success";
    const cancelUrl = new URL(request.url).origin + "/payment/cancel";

    const paypalOrder = await createPayPalOrder(paypalOrderPayload, returnUrl, cancelUrl);

    // Find the approval link
    const approvalLink = paypalOrder.links?.find((link: any) => link.rel === "approve");

    if (!approvalLink) {
      throw new Error("No approval link in PayPal response");
    }

    const responseData = {
      orderId: paypalOrder.id,
      status: paypalOrder.status,
      approvalUrl: approvalLink.href,
      amount,
      currency,
      createdAt: new Date().toISOString(),
      metadata: {
        ...metadata,
        orderId,
        customerEmail,
      },
    };

    logger.info("PayPal order created successfully", "paypal:create-order", {
      paypalOrderId: paypalOrder.id,
      orderId,
    });

    // Store idempotency response
    if (idempotencyKey) {
      storeIdempotencyResponse(
        idempotencyKey,
        ApiResponse.success(responseData, "Order created successfully", 201)
      );
    }

    const response = ApiResponse.success(responseData, "Order created successfully", 201);
    return ApiResponse.toResponse(response);
  } catch (error: any) {
    const orderId = (await request.json().catch(() => ({}))).orderId || "unknown";

    logger.logTransactionFailure("paypal:create-order", orderId, error);

    // Return appropriate error response
    const statusCode = error.statusCode || 500;
    const message = error.message || "Failed to create PayPal order";
    const code = error.code || "INTERNAL_SERVER_ERROR";

    const response = ApiResponse.error(message, code, statusCode, {
      details: process.env.NODE_ENV === "development" ? error.details : undefined,
    });

    return ApiResponse.toResponse(response);
  }
}

// CORS headers
export function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, idempotency-key",
    },
  });
}
