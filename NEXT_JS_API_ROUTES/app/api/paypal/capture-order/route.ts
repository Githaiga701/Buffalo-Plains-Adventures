/**
 * PayPal Capture Order API Route
 * POST /api/paypal/capture-order
 *
 * Captures a PayPal order after user approval
 */

import { NextRequest, NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";
import { PayPalCaptureOrderSchema } from "@/lib/validation";
import { ApiResponse, checkIdempotencyKey, storeIdempotencyResponse, validateRequest } from "@/lib/webhook-security";
import { logger } from "@/lib/logging";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Validate request headers
    const headerValidation = validateRequest(request.headers, {
      requireContentType: "application/json",
      requireIdempotencyKey: false,
    });

    if (!headerValidation.valid) {
      logger.warn(headerValidation.error || "Invalid request", "paypal:capture-order");
      const response = ApiResponse.badRequest(headerValidation.error || "Invalid request");
      return ApiResponse.toResponse(response);
    }

    // Check idempotency
    const idempotencyKey = request.headers.get("idempotency-key");
    if (idempotencyKey) {
      const cached = checkIdempotencyKey(idempotencyKey);
      if (cached.cached) {
        logger.info("Returning cached response for idempotent request", "paypal:capture-order", {
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
      logger.warn("Invalid JSON in request body", "paypal:capture-order");
      const response = ApiResponse.badRequest("Invalid JSON in request body");
      return ApiResponse.toResponse(response);
    }

    // Validate payload with Zod
    const validationResult = PayPalCaptureOrderSchema.safeParse(body);
    if (!validationResult.success) {
      logger.warn("Validation failed", "paypal:capture-order", {
        errors: validationResult.error.errors,
      });
      const response = ApiResponse.badRequest(
        "Validation failed",
        validationResult.error.errors
      );
      return ApiResponse.toResponse(response);
    }

    const { orderId } = validationResult.data;

    logger.info("Attempting to capture PayPal order", "paypal:capture-order", {
      orderId,
    });

    // Capture the order
    const capturedOrder = await capturePayPalOrder(orderId);

    if (capturedOrder.status !== "COMPLETED") {
      logger.warn("Order capture status not completed", "paypal:capture-order", {
        orderId,
        status: capturedOrder.status,
      });
    }

    // Extract payment details
    const paymentDetails = capturedOrder.payment_source?.paypal;

    const responseData = {
      orderId: capturedOrder.id,
      status: capturedOrder.status,
      payerEmail: paymentDetails?.email_address,
      payerId: paymentDetails?.account_id,
      capturedAt: new Date().toISOString(),
    };

    logger.logTransactionSuccess("paypal:capture-order", orderId, orderId, 0);

    // Store idempotency response
    if (idempotencyKey) {
      storeIdempotencyResponse(
        idempotencyKey,
        ApiResponse.success(responseData, "Order captured successfully")
      );
    }

    const response = ApiResponse.success(responseData, "Order captured successfully");
    return ApiResponse.toResponse(response);
  } catch (error: any) {
    const orderId = (await request.json().catch(() => ({}))).orderId || "unknown";

    logger.logTransactionFailure("paypal:capture-order", orderId, error);

    // Return appropriate error response
    const statusCode = error.statusCode || 500;
    const message = error.message || "Failed to capture PayPal order";
    const code = error.code || "INTERNAL_SERVER_ERROR";

    const response = ApiResponse.error(message, code, statusCode, {
      details: process.env.NODE_ENV === "development" ? error.details : undefined,
    });

    return ApiResponse.toResponse(response);
  }
}

export function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, idempotency-key",
    },
  });
}
