import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  checkIdempotencyKey,
  storeIdempotencyResponse,
  validateRequest,
  checkRateLimit,
  ApiResponse,
  validateWebhookPayload,
  sanitizeForLogging,
} from '../lib/webhook-security';

describe('webhook-security', () => {
  describe('checkIdempotencyKey', () => {
    it('should return cached: false for empty key', () => {
      const result = checkIdempotencyKey('');
      expect(result).toEqual({ cached: false });
    });

    it('should return cached: false for non-existent key', () => {
      const result = checkIdempotencyKey('non-existent-key-12345');
      expect(result).toEqual({ cached: false });
    });

    it('should return cached response for completed request', () => {
      const key = 'test-completed-key-' + Date.now();
      const response = { data: 'test-data' };
      storeIdempotencyResponse(key, response, 'completed');

      const result = checkIdempotencyKey(key);
      expect(result.cached).toBe(true);
      expect(result.status).toBe('completed');
      expect(result.response).toEqual(response);
    });

    it('should return cached response for failed request', () => {
      const key = 'test-failed-key-' + Date.now();
      const response = { error: 'Something went wrong' };
      storeIdempotencyResponse(key, response, 'failed');

      const result = checkIdempotencyKey(key);
      expect(result.cached).toBe(true);
      expect(result.status).toBe('failed');
      expect(result.response).toEqual(response);
    });
  });

  describe('storeIdempotencyResponse', () => {
    it('should not store empty key', () => {
      storeIdempotencyResponse('', { data: 'test' });
      const result = checkIdempotencyKey('');
      expect(result.cached).toBe(false);
    });

    it('should store completed response by default', () => {
      const key = 'test-default-status-' + Date.now();
      storeIdempotencyResponse(key, { success: true });

      const result = checkIdempotencyKey(key);
      expect(result.status).toBe('completed');
    });
  });

  describe('validateRequest', () => {
    it('should validate correct content-type', () => {
      const headers = new Headers({
        'content-type': 'application/json',
        'idempotency-key': 'valid-key-1234567890',
      });

      const result = validateRequest(headers);
      expect(result.valid).toBe(true);
    });

    it('should reject invalid content-type', () => {
      const headers = new Headers({
        'content-type': 'text/plain',
        'idempotency-key': 'valid-key-1234567890',
      });

      const result = validateRequest(headers);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid content-type');
    });

    it('should reject missing content-type', () => {
      const headers = new Headers({
        'idempotency-key': 'valid-key-1234567890',
      });

      const result = validateRequest(headers);
      expect(result.valid).toBe(false);
    });

    it('should reject missing idempotency-key when required', () => {
      const headers = new Headers({
        'content-type': 'application/json',
      });

      const result = validateRequest(headers, { requireIdempotencyKey: true });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('idempotency-key');
    });

    it('should pass without idempotency-key when not required', () => {
      const headers = new Headers({
        'content-type': 'application/json',
      });

      const result = validateRequest(headers, { requireIdempotencyKey: false });
      expect(result.valid).toBe(true);
    });

    it('should reject short idempotency-key', () => {
      const headers = new Headers({
        'content-type': 'application/json',
        'idempotency-key': 'short',
      });

      const result = validateRequest(headers);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid idempotency-key format');
    });

    it('should reject too long idempotency-key', () => {
      const headers = new Headers({
        'content-type': 'application/json',
        'idempotency-key': 'a'.repeat(300),
      });

      const result = validateRequest(headers);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid idempotency-key format');
    });

    it('should skip content-type validation when not required', () => {
      const headers = new Headers({
        'idempotency-key': 'valid-key-1234567890',
      });

      const result = validateRequest(headers, { requireContentType: '' });
      expect(result.valid).toBe(true);
    });
  });

  describe('checkRateLimit', () => {
    it('should allow requests within limit', () => {
      const identifier = 'test-rate-limit-' + Date.now();

      const result = checkRateLimit(identifier, 5, 60);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(4);
    });

    it('should decrement remaining count', () => {
      const identifier = 'test-decrement-' + Date.now();

      checkRateLimit(identifier, 5, 60);
      const result = checkRateLimit(identifier, 5, 60);
      expect(result.remaining).toBe(3);
    });

    it('should block requests after limit reached', () => {
      const identifier = 'test-block-' + Date.now();

      // Make 5 requests
      for (let i = 0; i < 5; i++) {
        checkRateLimit(identifier, 5, 60);
      }

      // 6th request should be blocked
      const result = checkRateLimit(identifier, 5, 60);
      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
      expect(result.retryAfter).toBeDefined();
      expect(result.retryAfter).toBeGreaterThan(0);
    });

    it('should use default values', () => {
      const identifier = 'test-defaults-' + Date.now();
      const result = checkRateLimit(identifier);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(9); // default is 10 requests
    });
  });

  describe('ApiResponse', () => {
    describe('success', () => {
      it('should create success response with default values', () => {
        const response = ApiResponse.success({ id: 1 });
        expect(response.success).toBe(true);
        expect(response.data).toEqual({ id: 1 });
        expect(response.message).toBe('Success');
        expect(response.statusCode).toBe(200);
      });

      it('should create success response with custom message', () => {
        const response = ApiResponse.success({ id: 1 }, 'Custom message');
        expect(response.message).toBe('Custom message');
      });
    });

    describe('error', () => {
      it('should create error response', () => {
        const response = ApiResponse.error('Something went wrong', 'ERR_001', 400);
        expect(response.success).toBe(false);
        expect(response.error).toBe('Something went wrong');
        expect(response.code).toBe('ERR_001');
        expect(response.statusCode).toBe(400);
      });

      it('should include details when provided', () => {
        const response = ApiResponse.error('Error', 'ERR', 400, { field: 'email' });
        expect(response.details).toEqual({ field: 'email' });
      });
    });

    describe('created', () => {
      it('should return 201 status', () => {
        const response = ApiResponse.created({ id: 1 });
        expect(response.statusCode).toBe(201);
        expect(response.message).toBe('Resource created');
      });
    });

    describe('badRequest', () => {
      it('should return 400 status', () => {
        const response = ApiResponse.badRequest('Invalid input');
        expect(response.statusCode).toBe(400);
        expect(response.code).toBe('BAD_REQUEST');
      });
    });

    describe('unauthorized', () => {
      it('should return 401 status', () => {
        const response = ApiResponse.unauthorized();
        expect(response.statusCode).toBe(401);
        expect(response.code).toBe('UNAUTHORIZED');
      });
    });

    describe('forbidden', () => {
      it('should return 403 status', () => {
        const response = ApiResponse.forbidden();
        expect(response.statusCode).toBe(403);
        expect(response.code).toBe('FORBIDDEN');
      });
    });

    describe('notFound', () => {
      it('should return 404 status', () => {
        const response = ApiResponse.notFound();
        expect(response.statusCode).toBe(404);
        expect(response.code).toBe('NOT_FOUND');
      });
    });

    describe('conflict', () => {
      it('should return 409 status', () => {
        const response = ApiResponse.conflict('Duplicate entry');
        expect(response.statusCode).toBe(409);
        expect(response.code).toBe('CONFLICT');
      });
    });

    describe('serverError', () => {
      it('should return 500 status', () => {
        const response = ApiResponse.serverError();
        expect(response.statusCode).toBe(500);
        expect(response.code).toBe('INTERNAL_SERVER_ERROR');
      });
    });

    describe('toResponse', () => {
      it('should create Response object', () => {
        const apiResponse = ApiResponse.success({ id: 1 });
        const response = ApiResponse.toResponse(apiResponse);

        expect(response).toBeInstanceOf(Response);
        expect(response.status).toBe(200);
        expect(response.headers.get('Content-Type')).toBe('application/json');
      });

      it('should use default 500 status when statusCode is missing', () => {
        const response = ApiResponse.toResponse({});
        expect(response.status).toBe(500);
      });
    });
  });

  describe('validateWebhookPayload', () => {
    it('should validate payload with all required fields', () => {
      const payload = {
        event: 'payment.completed',
        data: { id: '123', amount: 100 },
      };

      const result = validateWebhookPayload(payload, ['event', 'data.id']);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing top-level field', () => {
      const payload = {
        data: { id: '123' },
      };

      const result = validateWebhookPayload(payload, ['event', 'data.id']);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Missing required field: event');
    });

    it('should detect missing nested field', () => {
      const payload = {
        event: 'payment.completed',
        data: { amount: 100 },
      };

      const result = validateWebhookPayload(payload, ['event', 'data.id']);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Missing required field: data.id');
    });

    it('should detect missing deeply nested field', () => {
      const payload = {
        event: 'payment.completed',
        data: { user: { name: 'John' } },
      };

      const result = validateWebhookPayload(payload, ['data.user.email']);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Missing required field: data.user.email');
    });

    it('should validate empty required fields array', () => {
      const result = validateWebhookPayload({}, []);
      expect(result.valid).toBe(true);
    });
  });

  describe('sanitizeForLogging', () => {
    it('should return null/undefined as is', () => {
      expect(sanitizeForLogging(null)).toBe(null);
      expect(sanitizeForLogging(undefined)).toBe(undefined);
    });

    it('should redact password field', () => {
      const obj = { username: 'john', password: 'secret123' };
      const result = sanitizeForLogging(obj);
      expect(result.username).toBe('john');
      expect(result.password).toBe('***REDACTED***');
    });

    it('should redact secret field', () => {
      const obj = { apiSecret: 'my-secret-key' };
      const result = sanitizeForLogging(obj);
      expect(result.apiSecret).toBe('***REDACTED***');
    });

    it('should redact token field', () => {
      const obj = { accessToken: 'bearer-token-123' };
      const result = sanitizeForLogging(obj);
      expect(result.accessToken).toBe('***REDACTED***');
    });

    it('should redact apiKey field', () => {
      const obj = { apiKey: 'key-12345' };
      const result = sanitizeForLogging(obj);
      expect(result.apiKey).toBe('***REDACTED***');
    });

    it('should redact cardNumber field', () => {
      const obj = { cardNumber: '4111111111111111' };
      const result = sanitizeForLogging(obj);
      expect(result.cardNumber).toBe('***REDACTED***');
    });

    it('should redact cvv field', () => {
      const obj = { cvv: '123' };
      const result = sanitizeForLogging(obj);
      expect(result.cvv).toBe('***REDACTED***');
    });

    it('should redact ssn field', () => {
      const obj = { ssn: '123-45-6789' };
      const result = sanitizeForLogging(obj);
      expect(result.ssn).toBe('***REDACTED***');
    });

    it('should redact nested sensitive fields', () => {
      const obj = {
        user: {
          name: 'John',
          credentials: {
            password: 'secret',
            apiKey: 'key-123',
          },
        },
      };
      const result = sanitizeForLogging(obj);
      expect(result.user.name).toBe('John');
      expect(result.user.credentials.password).toBe('***REDACTED***');
      expect(result.user.credentials.apiKey).toBe('***REDACTED***');
    });

    it('should handle arrays with sensitive data', () => {
      const obj = {
        users: [
          { name: 'John', password: 'pass1' },
          { name: 'Jane', password: 'pass2' },
        ],
      };
      const result = sanitizeForLogging(obj);
      expect(result.users[0].password).toBe('***REDACTED***');
      expect(result.users[1].password).toBe('***REDACTED***');
    });

    it('should not modify the original object', () => {
      const original = { password: 'secret' };
      sanitizeForLogging(original);
      expect(original.password).toBe('secret');
    });

    it('should handle case-insensitive field matching', () => {
      const obj = { PASSWORD: 'secret', ApiKey: 'key' };
      const result = sanitizeForLogging(obj);
      expect(result.PASSWORD).toBe('***REDACTED***');
      expect(result.ApiKey).toBe('***REDACTED***');
    });
  });
});
