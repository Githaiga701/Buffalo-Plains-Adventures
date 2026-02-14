# Serverless Payment Architecture Implementation

## Overview

This document provides a comprehensive implementation of a production-ready serverless payment architecture for a Next.js 14 application deployed on Vercel, with integrated PayPal and M-Pesa payment processing.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT APPLICATION (React)                  │
│  ┌──────────────────────┐        ┌──────────────────────────┐  │
│  │ PayPalCheckoutButton │        │   MpesaPaymentForm       │  │
│  └──────────────────────┘        └──────────────────────────┘  │
│           │                                    │                 │
│           └────────────┬───────────────────────┘                 │
│                        ▼                                         │
└─────────────────────────────────────────────────────────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS EDGE RUNTIME (Vercel)                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              API ROUTES (Serverless Functions)           │  │
│  │                                                           │  │
│  │  ┌────────────────────┐    ┌────────────────────────┐   │  │
│  │  │    /api/paypal     │    │      /api/mpesa        │   │  │
│  │  │  ┌──────────────┐  │    │  ┌──────────────────┐  │   │  │
│  │  │  │create-order  │  │    │  │   stkpush        │  │   │  │
│  │  │  ├──────────────┤  │    │  ├──────────────────┤  │   │  │
│  │  │  │capture-order │  │    │  │   webhook        │  │   │  │
│  │  │  ├──────────────┤  │    │  │                  │  │   │  │
│  │  │  │  webhook     │  │    │  │                  │  │   │  │
│  │  │  └──────────────┘  │    │  └──────────────────┘  │   │  │
│  │  └────────────────────┘    └────────────────────────┘   │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────┐    │  │
│  │  │         Shared Utilities & Libraries             │    │  │
│  │  │  - lib/paypal.ts                                │    │  │
│  │  │  - lib/mpesa.ts                                 │    │  │
│  │  │  - lib/webhook-security.ts                      │    │  │
│  │  │  - lib/logging.ts                               │    │  │
│  │  │  - lib/validation.ts (Zod schemas)              │    │  │
│  │  │  - lib/middleware.ts                            │    │  │
│  │  └─────────────────────────────────────────────────┘    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
      │                              │                    │
      │ HTTPS                        │ HTTPS              │ HTTPS
      ▼                              ▼                    ▼
┌──────────────────┐    ┌──────────────────────┐   ┌──────────────┐
│   PayPal API     │    │  Safaricom Daraja    │   │  Logging API │
│   (Checkout & OAUTH) │  │     (STK Push)      │   │ (Monitoring) │
└──────────────────┘    └──────────────────────┘   └──────────────┘
      │                              │
      │ Webhook Callback             │ Webhook Callback
      └──────────────┬───────────────┘
                     ▼
      ┌──────────────────────────────┐
      │  Webhook Handlers (Routes)   │
      │  - Signature verification    │
      │  - Idempotency checks        │
      │  - Status updates            │
      │  - Email notifications       │
      └──────────────────────────────┘
```

---

## Implementation Files

### Type Definitions
- **[src/lib/types/payment.ts](src/lib/types/payment.ts)**
  - All TypeScript interfaces for payments
  - PayPal order and webhook types
  - M-Pesa STK Push and callback types
  - Error types and exceptions

### Utility Libraries
- **[src/lib/paypal.ts](src/lib/paypal.ts)**
  - `getPayPalAccessToken()` - OAuth2 token management
  - `createPayPalOrder()` - Create checkout order
  - `capturePayPalOrder()` - Capture approved order
  - `verifyPayPalWebhookSignature()` - RSA signature verification
  - `extractPayPalTransactionData()` - Parse webhook event

- **[src/lib/mpesa.ts](src/lib/mpesa.ts)**
  - `getMpesaAccessToken()` - OAuth2 token for Daraja API
  - `initiateMpesaStkPush()` - Trigger STK popup
  - `formatPhoneNumber()` - Standardize phone format
  - `generateMpesaPassword()` - Create auth password
  - `parseMpesaCallback()` - Parse callback response
  - `checkMpesaTransactionStatus()` - Query transaction status

### Security & Validation
- **[src/lib/webhook-security.ts](src/lib/webhook-security.ts)**
  - Idempotency key management
  - Rate limiting (in-memory)
  - Request validation
  - Response builder (`ApiResponse`)
  - Webhook payload validation
  - Sensitive data sanitization

- **[src/lib/logging.ts](src/lib/logging.ts)**
  - Structured logging utility
  - Log levels (info, warn, error, debug)
  - Transaction-specific loggers
  - Webhook logging helpers

- **[src/lib/validation.ts](src/lib/validation.ts)**
  - Zod schemas for request validation
  - PayPal order creation schema
  - M-Pesa STK Push schema
  - M-Pesa callback schema
  - Payment status check schema

- **[src/lib/middleware.ts](src/lib/middleware.ts)**
  - CORS middleware
  - Content-Type validation
  - Size limit checks
  - Rate limiting middleware
  - Request context enrichment

### API Routes (Serverless Functions)
- **[app/api/paypal/create-order/route.ts](app/api/paypal/create-order/route.ts)**
  - Create PayPal order with validation
  - Idempotency handling
  - Return approval URL

- **[app/api/paypal/capture-order/route.ts](app/api/paypal/capture-order/route.ts)**
  - Capture approved order
  - Extract payer information
  - Return captured order details

- **[app/api/paypal/webhook/route.ts](app/api/paypal/webhook/route.ts)**
  - Webhook verification
  - Event routing
  - Idempotency checks
  - Signature verification
  - Event handlers for payment events

- **[app/api/mpesa/stkpush/route.ts](app/api/mpesa/stkpush/route.ts)**
  - Validate phone number
  - Call Safaricom STK Push API
  - Return checkout request ID
  - Idempotency handling

- **[app/api/mpesa/webhook/route.ts](app/api/mpesa/webhook/route.ts)**
  - Parse callback metadata
  - Process payment results
  - Prevent duplicate processing
  - Handle errors gracefully

### Frontend Components
- **[src/components/PayPalCheckoutButton.tsx](src/components/PayPalCheckoutButton.tsx)**
  - Reusable PayPal button component
  - Calls `/api/paypal/create-order`
  - Redirects to PayPal
  - Error handling

- **[src/components/MpesaPaymentForm.tsx](src/components/MpesaPaymentForm.tsx)**
  - Phone number input with formatting
  - Calls `/api/mpesa/stkpush`
  - Shows pending state
  - Real-time validation

### Hooks & Utilities
- **[src/hooks/usePayment.ts](src/hooks/usePayment.ts)**
  - React hook for payment state management
  - Methods: `createPayPalOrder`, `capturePayPalOrder`, `initiateMpesaPayment`
  - Error and status handling

- **[src/lib/payment-utils.ts](src/lib/payment-utils.ts)**
  - Currency formatting
  - Phone number validation
  - Reference ID generation
  - Idempotency key generation
  - Retry logic with exponential backoff

### Configuration & Documentation
- **[.env.example](.env.example)**
  - Environment variables template
  - PayPal configuration
  - M-Pesa configuration
  - Application settings

- **[PAYMENT_INTEGRATION_SETUP.md](PAYMENT_INTEGRATION_SETUP.md)**
  - Complete setup guide
  - PayPal configuration steps
  - M-Pesa configuration steps
  - API endpoint documentation
  - Webhook configuration
  - Testing instructions
  - Deployment checklist

---

## Key Features

### ✅ PayPal Integration
- [x] Create order with REST API
- [x] Capture order with user approval
- [x] Webhook signature verification (RSA-SHA256)
- [x] Event handling (PAYMENT.CAPTURE.COMPLETED, DENIED, etc.)
- [x] Token caching with expiration
- [x] Error handling and logging
- [x] Idempotency support
- [x] Production-ready sandbox testing

### ✅ M-Pesa Integration
- [x] OAuth token management
- [x] STK Push initiation
- [x] Phone number formatting (multiple formats)
- [x] Password generation for authentication
- [x] Callback parsing and validation
- [x] Transaction status checking
- [x] Error handling
- [x] Idempotency keys
- [x] Integration with Daraja API

### ✅ Webhook Security
- [x] PayPal signature verification
- [x] M-Pesa callback validation
- [x] Idempotency checking
- [x] Request deduplication
- [x] Rate limiting
- [x] Webhook payload validation
- [x] Sensitive data sanitization
- [x] Request/response logging

### ✅ Type Safety
- [x] Full TypeScript coverage
- [x] Zod validation schemas
- [x] No `any` types in critical paths
- [x] Type-safe API responses
- [x] Generic handler creation

### ✅ Production Ready
- [x] Error handling and recovery
- [x] Logging system with levels
- [x] Environment variable management
- [x] CORS support
- [x] Request size limits
- [x] Rate limiting
- [x] Exponential backoff retries
- [x] Edge-compatible code
- [x] Monitoring hooks
- [x] Documentation

---

## Security Considerations

### 1. Authentication & Authorization
- PayPal API credentials in environment variables
- M-Pesa Consumer Key/Secret in environment variables
- Webhook signatures verified server-side
- No credentials exposed to client

### 2. Data Protection
- HTTPS-only communication
- Payment data not logged
- Sensitive data sanitized in logs
- PII encrypted in transit

### 3. Idempotency
- All payment requests support idempotency keys
- Prevents duplicate charges
- In-memory store (upgrade to Redis for scaling)
- 24-hour TTL for idempotency records

### 4. Rate Limiting
- Per-webhook rate limiting (100 req/min)
- Per-IP rate limiting
- Configurable thresholds
- Returns Retry-After headers

### 5. Webhook Security
- PayPal: RSA-SHA256 signature verification
- M-Pesa: IP whitelisting at infrastructure level
- Request validation before processing
- Error logging for debugging

---

## Error Handling

### PayPal Errors
```typescript
try {
  const order = await createPayPalOrder(payload, returnUrl, cancelUrl);
} catch (error) {
  if (error instanceof PaymentException) {
    // Handle payment-specific error
    console.log(error.code); // PAYPAL_ORDER_CREATION_FAILED
    console.log(error.statusCode); // 400, 401, 500, etc.
    console.log(error.details); // API response details
  }
}
```

### M-Pesa Errors
```typescript
try {
  const response = await initiateMpesaStkPush(phone, amount, ref, desc, url);
} catch (error) {
  if (error instanceof PaymentException) {
    // Handle M-Pesa error
    console.log(error.code); // MPESA_STKPUSH_FAILED, INVALID_PHONE_FORMAT
  }
}
```

### API Response Errors
```json
{
  "success": false,
  "error": "Invalid phone number format",
  "code": "INVALID_PHONE_FORMAT",
  "details": { "phoneNumber": "invalid format" }
}
```

---

## Testing Guide

### Unit Tests
```bash
npm run test        # Run all tests
npm run test:watch  # Watch mode
```

### Manual Testing
1. **Create PayPal Order**: POST /api/paypal/create-order
2. **Capture PayPal Order**: POST /api/paypal/capture-order
3. **STK Push**: POST /api/mpesa/stkpush
4. **Verify Webhooks**: Use ngrok to expose local server

### Testing Checklist
- [ ] PayPal order creation with valid amount
- [ ] PayPal order creation with invalid amount
- [ ] PayPal capture after approval
- [ ] M-Pesa STK Push with valid phone
- [ ] M-Pesa STK Push with invalid phone
- [ ] Webhook with valid signature
- [ ] Webhook with invalid signature
- [ ] Idempotent request handling
- [ ] Rate limit enforcement
- [ ] Error logging

---

## Deployment to Vercel

### Step 1: Setup Git Repository
```bash
git init
git add .
git commit -m "Add serverless payment integration"
git push origin main
```

### Step 2: Connect to Vercel
- Visit [vercel.com/new](https://vercel.com/new)
- Import your repository
- Configure environment variables
- Deploy

### Step 3: Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
```
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=xxx
PAYPAL_CLIENT_SECRET=xxx
PAYPAL_WEBHOOK_ID=xxx
MPESA_CONSUMER_KEY=xxx
MPESA_CONSUMER_SECRET=xxx
MPESA_SHORTCODE=xxx
MPESA_PASSKEY=xxx
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Step 4: Update Webhook URLs
- PayPal Dashboard → Update webhook URL to production domain
- Daraja Dashboard → Update callback URL to production domain

---

## Monitoring & Observability

### Logging
- All transactions logged with structured format
- Webhook events logged with timestamps
- Error tracking with stack traces
- Sensitive data sanitized

### Metrics to Monitor
- Order creation success rate
- Order capture success rate
- Webhook delivery success rate
- Average response time
- Error rates by type
- Idempotency cache hit rate

### Alerts to Setup
- Payment processing failures
- High error rate (>5%)
- Rate limit breaching
- Signature verification failures
- Webhook processing delays

---

## Scaling Considerations

### Current Limitations (In-Memory Store)
- Idempotency store limited to server memory
- Rate limit store limited to server memory
- Works well for single Vercel instance

### Scaling to Multiple Instances
1. **Replace In-Memory Store**: Use Redis
   ```typescript
   // Replace idempotencyStore with Redis
   const redis = new Redis(process.env.REDIS_URL);
   ```

2. **Database Integration**: Store transactions
   ```typescript
   // Save to database instead of just logging
   await db.transactions.create({...});
   ```

3. **Queue System**: Handle webhooks asynchronously
   ```typescript
   // Use Bull/BullMQ for job queue
   await paymentQueue.add('process-webhook', data);
   ```

4. **Caching**: Cache PayPal/M-Pesa tokens with TTL
   ```typescript
   // Already implemented with in-memory cache
   // Upgrade to Redis for distributed systems
   ```

---

## Maintenance

### Regular Tasks
- [ ] Rotate API credentials quarterly
- [ ] Update PayPal/M-Pesa SDKs monthly
- [ ] Review and update logs weekly
- [ ] Monitor error rates daily
- [ ] Test webhook delivery monthly
- [ ] Security audit quarterly

### Dependency Updates
```bash
# Check for outdated packages
npm outdated

# Update in place with testing
npm update

# Major version updates (test thoroughly)
npm install package@latest
```

---

## Support & Resources

- **PayPal API Docs**: https://developer.paypal.com/
- **M-Pesa Daraja**: https://developer.safaricom.co.ke/
- **Next.js Docs**: https://nextjs.org/docs/
- **Zod Validation**: https://zod.dev/
- **Vercel Docs**: https://vercel.com/docs/

---

## Implementation Status

- [x] Type definitions
- [x] PayPal integration
- [x] M-Pesa integration
- [x] Webhook handlers
- [x] Frontend components
- [x] Validation schemas
- [x] Error handling
- [x] Logging system
- [x] Security middleware
- [x] Documentation
- [ ] Database integration (future)
- [ ] Email notifications (future)
- [ ] Admin dashboard (future)
- [ ] Transaction history UI (future)

---

**Last Updated**: February 14, 2024  
**Status**: Production Ready ✅
