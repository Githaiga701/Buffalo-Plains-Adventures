/**
 * Webhook Security & Idempotency Utility
 * Handles webhook verification, idempotency, and request validation
 */

import { logger } from "./logging";

/**
 * Simulated idempotency store
 * In production, use Redis or a database
 */
interface IdempotencyRecord {
  id: string;
  status: "pending" | "completed" | "failed";
  response: any;
  createdAt: number;
}

// In-memory store (should be replaced with Redis/DB in production)
const idempotencyStore = new Map<string, IdempotencyRecord>();

// Cleanup old records every 24 hours (86400 seconds)
const IDEMPOTENCY_TTL = 86400 * 1000;

setInterval(() => {
  const now = Date.now();
  for (const [key, value] of idempotencyStore.entries()) {
    if (now - value.createdAt > IDEMPOTENCY_TTL) {
      idempotencyStore.delete(key);
    }
  }
}, IDEMPOTENCY_TTL);

/**
 * Check idempotency key
 * Returns cached response if request was already processed
 */
export function checkIdempotencyKey(
  idempotencyKey: string
): { cached: boolean; response?: any; status?: string } {
  if (!idempotencyKey) {
    return { cached: false };
  }

  const record = idempotencyStore.get(idempotencyKey);

  if (!record) {
    return { cached: false };
  }

  if (record.status === "pending") {
    return {
      cached: true,
      status: "pending",
      response: { error: "Request is being processed" },
    };
  }

  if (record.status === "failed") {
    return {
      cached: true,
      status: "failed",
      response: record.response,
    };
  }

  return {
    cached: true,
    status: "completed",
    response: record.response,
  };
}

/**
 * Store idempotency response
 */
export function storeIdempotencyResponse(
  idempotencyKey: string,
  response: any,
  status: "completed" | "failed" = "completed"
): void {
  if (!idempotencyKey) return;

  const record: IdempotencyRecord = {
    id: idempotencyKey,
    status,
    response,
    createdAt: Date.now(),
  };

  idempotencyStore.set(idempotencyKey, record);

  logger.debug("Idempotency response stored", "webhook-security", {
    keyLength: idempotencyKey.length,
    status,
  });
}

/**
 * Validate API request headers
 */
export interface ValidateRequestOptions {
  requireContentType?: string;
  requireIdempotencyKey?: boolean;
  maxBodySize?: number; // in bytes
}

export function validateRequest(
  headers: Headers,
  options: ValidateRequestOptions = {}
): { valid: boolean; error?: string } {
  const { requireContentType = "application/json", requireIdempotencyKey = true, maxBodySize = 1024 * 1024 } = options;

  // Validate content type
  if (requireContentType) {
    const contentType = headers.get("content-type");
    if (!contentType || !contentType.includes(requireContentType)) {
      return {
        valid: false,
        error: `Invalid content-type. Expected: ${requireContentType}`,
      };
    }
  }

  // Validate idempotency key
  if (requireIdempotencyKey) {
    const idempotencyKey = headers.get("idempotency-key");
    if (!idempotencyKey) {
      return {
        valid: false,
        error: "Missing required header: idempotency-key",
      };
    }

    if (idempotencyKey.length < 16 || idempotencyKey.length > 256) {
      return {
        valid: false,
        error: "Invalid idempotency-key format",
      };
    }
  }

  return { valid: true };
}

/**
 * Rate limiter for webhooks
 * Simple in-memory implementation
 */
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowSeconds: number = 60
): { allowed: boolean; remaining: number; retryAfter?: number } {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  let record = rateLimitStore.get(identifier);

  // Reset if window expired
  if (!record || record.resetAt < now) {
    record = {
      count: 0,
      resetAt: now + windowMs,
    };
    rateLimitStore.set(identifier, record);
  }

  if (record.count >= maxRequests) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfter,
    };
  }

  record.count++;

  return {
    allowed: true,
    remaining: maxRequests - record.count,
  };
}

/**
 * Response builder for consistent API responses
 */
export class ApiResponse {
  static success<T>(data: T, message: string = "Success", statusCode: number = 200) {
    return {
      success: true,
      data,
      message,
      statusCode,
    };
  }

  static error(error: string, code: string, statusCode: number = 400, details?: any) {
    return {
      success: false,
      error,
      code,
      details,
      statusCode,
    };
  }

  static created<T>(data: T, message: string = "Resource created") {
    return this.success(data, message, 201);
  }

  static badRequest(message: string, details?: any) {
    return this.error(message, "BAD_REQUEST", 400, details);
  }

  static unauthorized(message: string = "Unauthorized") {
    return this.error(message, "UNAUTHORIZED", 401);
  }

  static forbidden(message: string = "Forbidden") {
    return this.error(message, "FORBIDDEN", 403);
  }

  static notFound(message: string = "Not found") {
    return this.error(message, "NOT_FOUND", 404);
  }

  static conflict(message: string, details?: any) {
    return this.error(message, "CONFLICT", 409, details);
  }

  static serverError(message: string = "Internal server error", details?: any) {
    return this.error(message, "INTERNAL_SERVER_ERROR", 500, details);
  }

  static toResponse(response: any) {
    const { statusCode, ...body } = response;
    return new Response(JSON.stringify(body), {
      status: statusCode || 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }
}

/**
 * Webhook payload validator
 * Ensures webhook data matches expected structure
 */
export function validateWebhookPayload(payload: any, requiredFields: string[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  requiredFields.forEach((field) => {
    const keys = field.split(".");
    let value = payload;

    for (const key of keys) {
      if (value && typeof value === "object" && key in value) {
        value = value[key];
      } else {
        errors.push(`Missing required field: ${field}`);
        break;
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitize sensitive data from logs
 */
export function sanitizeForLogging(obj: any): any {
  if (!obj) return obj;

  const sensitiveFields = ["password", "secret", "token", "apiKey", "cardNumber", "cvv", "ssn"];
  const deepClone = JSON.parse(JSON.stringify(obj));

  function sanitize(target: any): void {
    if (target === null || target === undefined) return;

    if (Array.isArray(target)) {
      target.forEach(sanitize);
    } else if (typeof target === "object") {
      Object.keys(target).forEach((key) => {
        if (sensitiveFields.some((field) => key.toLowerCase().includes(field.toLowerCase()))) {
          target[key] = "***REDACTED***";
        } else {
          sanitize(target[key]);
        }
      });
    }
  }

  sanitize(deepClone);
  return deepClone;
}
