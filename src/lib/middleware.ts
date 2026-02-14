/**
 * API Middleware & Request Validation
 * Reusable middleware for API routes
 * 
 * Note: For Next.js deployment, import NextRequest/NextResponse from "next/server"
 * This file provides generic request/response types for Vite compatibility
 */

import { logger } from "./logging";
import { ApiResponse } from "./webhook-security";

// Generic Request/Response types for Vite compatibility
export interface GenericRequest {
  headers: Map<string, string> | Record<string, string>;
  method: string;
  url: string;
  body?: any;
}

export interface GenericResponse {
  status: number;
  headers: Record<string, string>;
  body: any;
}

// For Next.js, use: import { NextRequest as GenericRequest, NextResponse as GenericResponse } from "next/server";

/**
 * Middleware configuration
 */
export interface MiddlewareOptions {
  requireAuth?: boolean;
  requireContentType?: string;
  requireIdempotencyKey?: boolean;
  maxBodySize?: number;
  validateCors?: boolean;
}

/**
 * CORS middleware
 */
export function withCors(request: GenericRequest, allowedOrigins: string[] = ["*"]) {
  const headers = request.headers instanceof Map 
    ? request.headers 
    : new Map(Object.entries(request.headers));
  const origin = (headers.get("origin") || headers.get("Origin") || "") as string;
  const isAllowed = allowedOrigins.includes("*") || allowedOrigins.includes(origin);

  if (!isAllowed) {
    logger.warn("CORS request from unauthorized origin", "middleware:cors", { origin });
    return ApiResponse.forbidden("Origin not allowed");
  }

  return null;
}

/**
 * Content-Type validation middleware
 */
export function withContentTypeValidation(request: GenericRequest, expectedType: string) {
  const headers = request.headers instanceof Map 
    ? request.headers 
    : new Map(Object.entries(request.headers));
  const contentType = (headers.get("content-type") || headers.get("Content-Type") || "") as string;

  if (!contentType || !contentType.includes(expectedType)) {
    logger.warn("Invalid content-type", "middleware:content-type", {
      expected: expectedType,
      received: contentType,
    });
    return ApiResponse.badRequest(`Content-Type must be ${expectedType}`);
  }

  return null;
}

/**
 * Size limit middleware
 */
export function withSizeLimit(request: GenericRequest, maxBytes: number = 1024 * 1024) {
  const headers = request.headers instanceof Map 
    ? request.headers 
    : new Map(Object.entries(request.headers));
  const contentLength = headers.get("content-length") || headers.get("Content-Length");

  if (contentLength && parseInt(contentLength) > maxBytes) {
    logger.warn("Request body too large", "middleware:size-limit", {
      size: contentLength,
      max: maxBytes,
    });
    return ApiResponse.error("Request body too large", "PAYLOAD_TOO_LARGE", 413);
  }

  return null;
}

/**
 * Rate limiting middleware
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function withRateLimit(
  request: GenericRequest,
  maxRequests: number = 100,
  windowSeconds: number = 60
) {
  const headers = request.headers instanceof Map 
    ? request.headers 
    : new Map(Object.entries(request.headers));
  const identifier = (headers.get("x-forwarded-for") || headers.get("X-Forwarded-For") || "unknown") as string;
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  let record = rateLimitMap.get(identifier);

  if (!record || record.resetAt < now) {
    record = { count: 0, resetAt: now + windowMs };
    rateLimitMap.set(identifier, record);
  }

  record.count++;

  if (record.count > maxRequests) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    logger.warn("Rate limit exceeded", "middleware:rate-limit", {
      identifier,
      retryAfter,
    });

    return ApiResponse.error("Too many requests", "RATE_LIMIT_EXCEEDED", 429);
  }

  return null;
}

/**
 * Wrap API route with middleware
 */
export async function withMiddleware(
  request: GenericRequest,
  handler: (request: GenericRequest) => Promise<GenericResponse | any>,
  options: MiddlewareOptions = {}
) {
  try {
    const headers = request.headers instanceof Map 
      ? request.headers 
      : new Map(Object.entries(request.headers));
    
    // Request logging
    logger.debug(
      `${request.method} ${request.url}`,
      "middleware:request",
      {
        contentType: headers.get("content-type"),
        userAgent: headers.get("user-agent"),
      }
    );

    // CORS validation
    if (options.validateCors) {
      const corsError = withCors(request);
      if (corsError) return corsError;
    }

    // Content-Type validation
    if (options.requireContentType && request.method !== "GET") {
      const contentTypeError = withContentTypeValidation(
        request,
        options.requireContentType
      );
      if (contentTypeError) return contentTypeError;
    }

    // Size limit validation
    const sizeError = withSizeLimit(request, options.maxBodySize);
    if (sizeError) return sizeError;

    // Rate limiting
    const rateLimitError = withRateLimit(request);
    if (rateLimitError) return rateLimitError;

    // Execute handler
    const response = await handler(request);

    // Response logging
    const status = response?.status || 200;
    logger.debug(
      `Response: ${status}`,
      "middleware:response",
      { status }
    );

    return response;
  } catch (error) {
    logger.error("Middleware error", error, "middleware:error");
    return ApiResponse.serverError("Internal server error");
  }
}

/**
 * Create type-safe API handler
 * Note: For Next.js deployment, use NextRequest/NextResponse types from next/server
 */
export function createApiHandler<T extends Record<string, any>>(
  handler: (
    request: GenericRequest,
    body: T
  ) => Promise<GenericResponse | any>,
  options: MiddlewareOptions = {}
) {
  return async (request: GenericRequest) => {
    return withMiddleware(request, async (req) => {
      if (req.method === "GET") {
        return handler(req, {} as T);
      }

      try {
        const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
        return handler(req, body as T);
      } catch (error) {
        logger.warn("Failed to parse JSON", "handler:json-parse");
        return ApiResponse.badRequest("Invalid JSON");
      }
    }, options);
  };
}

/**
 * Request context enrichment
 */
export interface RequestContext {
  requestId: string;
  timestamp: string;
  method: string;
  path: string;
  ip: string;
  userAgent?: string;
}

export function getRequestContext(request: GenericRequest): RequestContext {
  const headers = request.headers instanceof Map 
    ? request.headers 
    : new Map(Object.entries(request.headers));
  
  return {
    requestId: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
    timestamp: new Date().toISOString(),
    method: request.method,
    path: request.url,
    ip: (headers.get("x-forwarded-for") || headers.get("X-Forwarded-For") || "unknown") as string,
    userAgent: (headers.get("user-agent") || headers.get("User-Agent")) as string | undefined,
  };
}

/**
 * Add request context to response headers
 */
export function addRequestContextHeaders(response: GenericResponse | any, context: RequestContext): GenericResponse | any {
  if (response?.headers) {
    response.headers["X-Request-ID"] = context.requestId;
    response.headers["X-Request-Time"] = context.timestamp;
  }
  return response;
}
