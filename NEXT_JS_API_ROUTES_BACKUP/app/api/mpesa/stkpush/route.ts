/**
 * M-Pesa STK Push API Route
 * POST /api/mpesa/stkpush
 *
 * Initiates M-Pesa STK Push for mobile payment
 */

import { NextRequest, NextResponse } from "next/server";
import { initiateMpesaStkPush, formatPhoneNumber } from "@/lib/mpesa";
import { MpesaStkPushSchema } from "@/lib/validation";
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
      logger.warn(headerValidation.error || "Invalid request", "mpesa:stkpush");
      const response = ApiResponse.badRequest(headerValidation.error || "Invalid request");
      return ApiResponse.toResponse(response);
    }

    // Check idempotency
    const idempotencyKey = request.headers.get("idempotency-key");
    if (idempotencyKey) {
      const cached = checkIdempotencyKey(idempotencyKey);
      if (cached.cached) {
        logger.info("Returning cached response for idempotent request", "mpesa:stkpush", {
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
      logger.warn("Invalid JSON in request body", "mpesa:stkpush");
      const response = ApiResponse.badRequest("Invalid JSON in request body");
      return ApiResponse.toResponse(response);
    }

    // Validate payload with Zod
    const validationResult = MpesaStkPushSchema.safeParse(body);
    if (!validationResult.success) {
      logger.warn("Validation failed", "mpesa:stkpush", {
        errors: validationResult.error.errors,
      });
      const response = ApiResponse.badRequest(
        "Validation failed",
        validationResult.error.errors
      );
      return ApiResponse.toResponse(response);
    }

    const {
      amount,
      phoneNumber,
      accountReference,
      transactionDesc,
      orderId,
      customerEmail,
      metadata,
    } = validationResult.data;

    logger.logTransactionStart("mpesa:stkpush", orderId, amount, "M-Pesa");

    // Construct callback URL
    const origin = new URL(request.url).origin;
    const callbackUrl = `${origin}/api/mpesa/webhook`;

    // Initiate STK Push
    const stkResponse = await initiateMpesaStkPush(
      phoneNumber,
      amount,
      accountReference,
      transactionDesc,
      callbackUrl
    );

    // Prepare response
    const responseData = {
      checkoutRequestID: stkResponse.CheckoutRequestID,
      merchantRequestID: stkResponse.MerchantRequestID,
      responseCode: stkResponse.ResponseCode,
      responseDescription: stkResponse.ResponseDescription,
      customerMessage: stkResponse.CustomerMessage,
      amount,
      phoneNumber: formatPhoneNumber(phoneNumber),
      createdAt: new Date().toISOString(),
      metadata: {
        ...metadata,
        orderId,
        customerEmail,
      },
    };

    logger.info("M-Pesa STK Push initiated successfully", "mpesa:stkpush", {
      checkoutRequestID: stkResponse.CheckoutRequestID,
      orderId,
    });

    // Store idempotency response
    if (idempotencyKey) {
      storeIdempotencyResponse(
        idempotencyKey,
        ApiResponse.success(responseData, "STK Push initiated successfully", 201)
      );
    }

    const response = ApiResponse.success(
      responseData,
      "STK Push initiated successfully",
      201
    );
    return ApiResponse.toResponse(response);
  } catch (error: any) {
    const orderId = (await request.json().catch(() => ({}))).orderId || "unknown";

    logger.logTransactionFailure("mpesa:stkpush", orderId, error);

    // Return appropriate error response
    const statusCode = error.statusCode || 500;
    const message = error.message || "Failed to initiate M-Pesa STK Push";
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
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, idempotency-key",
    },
  });
}
