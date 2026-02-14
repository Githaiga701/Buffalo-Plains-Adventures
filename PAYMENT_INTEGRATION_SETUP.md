## Serverless Payment Integration Guide

Complete setup guide for PayPal and M-Pesa payment integration using Next.js serverless architecture.

### Table of Contents

1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Environment Setup](#environment-setup)
4. [PayPal Integration Setup](#paypal-integration-setup)
5. [M-Pesa Integration Setup](#mpesa-integration-setup)
6. [API Endpoints](#api-endpoints)
7. [Frontend Components](#frontend-components)
8. [Webhook Configuration](#webhook-configuration)
9. [Testing](#testing)
10. [Deployment](#deployment)
11. [Security Best Practices](#security-best-practices)

---

## Project Structure

```
app/
├── api/
│   ├── paypal/
│   │   ├── create-order/route.ts      # Create PayPal order
│   │   ├── capture-order/route.ts     # Capture PayPal order
│   │   └── webhook/route.ts           # PayPal webhook handler
│   └── mpesa/
│       ├── stkpush/route.ts           # Initiate M-Pesa STK Push
│       └── webhook/route.ts           # M-Pesa callback handler

src/
├── lib/
│   ├── types/
│   │   └── payment.ts                 # Payment type definitions
│   ├── paypal.ts                      # PayPal utilities
│   ├── mpesa.ts                       # M-Pesa utilities
│   ├── logging.ts                     # Logging utility
│   ├── webhook-security.ts            # Webhook security & validation
│   └── validation.ts                  # Zod schemas

└── components/
    ├── PayPalCheckoutButton.tsx       # PayPal button component
    └── MpesaPaymentForm.tsx           # M-Pesa form component
```

---

## Prerequisites

- **Node.js 18+** with npm/yarn/bun
- **TypeScript** knowledge
- PayPal Developer Account
- Safaricom Daraja API Account (for M-Pesa)
- HTTPS endpoint for webhook callbacks

---

## Environment Setup

### 1. Copy Environment Variables

```bash
cp .env.example .env.local
```

### 2. Configure Environment Variables

Update `.env.local` with your credentials (see detailed setup sections below).

### 3. Install Dependencies

```bash
# If using Bun
bun install

# Or npm/yarn
npm install
yarn install
```

Ensure these packages are installed:
- `zod` - for validation
- `react-hook-form` - for form handling (already installed)

---

## PayPal Integration Setup

### Step 1: Create PayPal Developer Account

1. Go to [developer.paypal.com](https://developer.paypal.com)
2. Sign in or create a new account
3. Navigate to **Dashboard** → **Apps & Credentials**

### Step 2: Create an Application

1. Under **Sandbox**, click "Create App"
2. Enter app name (e.g., "Buffalo Plains Booking System")
3. Select **Merchant** as app type
4. Click **Create App**

### Step 3: Get Credentials

1. You'll see your **Client ID** and **Secret**
2. Copy these to your `.env.local`:

```env
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_client_secret
PAYPAL_MODE=sandbox
```

### Step 4: Create Webhook

1. In PayPal Dashboard, go to **Account Settings** → **Webhooks**
2. Click "Create Webhook"
3. Webhook URL: `https://your-domain.com/api/paypal/webhook`
4. Select these events:
   - `PAYMENT.CAPTURE.COMPLETED`
   - `PAYMENT.CAPTURE.DENIED`
   - `CHECKOUT.ORDER.APPROVED`
5. Copy the **Webhook ID** to `.env.local`:

```env
PAYPAL_WEBHOOK_ID=your_webhook_id
```

### Step 5: Test Mode

For testing:
- Use `PAYPAL_MODE=sandbox`
- PayPal will display a payment page on your return URL
- Test transactions show up in your dashboard

For production:
- Change `PAYPAL_MODE=live`
- Update `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` to production credentials
- Update webhook URL and webhook ID

---

## M-Pesa Integration Setup

### Step 1: Register with Safaricom Daraja

1. Go to [developer.safaricom.co.ke](https://developer.safaricom.co.ke)
2. Sign up for a developer account
3. Verify your email

### Step 2: Create an App

1. In your dashboard, create a new app
2. Select **Lipa Na M-Pesa Online** as the use case
3. You'll receive:
   - **Consumer Key**
   - **Consumer Secret**
   - Copy these to `.env.local`:

```env
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
```

### Step 3: Get Business Shortcode

1. In Safaricom Daraja dashboard, find your **Business Shortcode**
2. In test mode, use: `174379` (Safaricom test shortcode)
3. Add to `.env.local`:

```env
MPESA_SHORTCODE=174379
```

### Step 4: Get Passkey

1. Go to Settings in your Daraja app
2. Find the **Online Passkey**
3. Copy to `.env.local`:

```env
MPESA_PASSKEY=your_passkey
```

### Step 5: Configure Callback URL

1. In Daraja dashboard, set your callback URL:
   ```
   https://your-domain.com/api/mpesa/webhook
   ```
2. Add to `.env.local`:

```env
MPESA_CALLBACK_URL=https://your-domain.com/api/mpesa/webhook
```

### Step 6: Test Credentials

Use these test credentials for Safaricom sandbox:

```env
MPESA_SHORTCODE=174379
MPESA_PASSKEY=bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
```

Test phone number: `254708374149`

---

## API Endpoints

### PayPal Endpoints

#### 1. Create Order
```http
POST /api/paypal/create-order

Content-Type: application/json
Idempotency-Key: unique-key-12345

{
  "amount": 100.50,
  "currency": "USD",
  "orderId": "order-123",
  "description": "3-Day Kenya Safari",
  "customerEmail": "customer@example.com",
  "metadata": {
    "packageId": "safari-001"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "paypal-order-123",
    "status": "CREATED",
    "approvalUrl": "https://sandbox.paypal.com/checkoutnow?token=...",
    "amount": 100.50,
    "currency": "USD",
    "createdAt": "2024-02-14T10:30:00.000Z",
    "metadata": {...}
  },
  "message": "Order created successfully"
}
```

#### 2. Capture Order
```http
POST /api/paypal/capture-order

Content-Type: application/json
Idempotency-Key: unique-key-12346

{
  "orderId": "paypal-order-123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "paypal-order-123",
    "status": "COMPLETED",
    "payerEmail": "payer@example.com",
    "payerId": "payer-123",
    "capturedAt": "2024-02-14T10:35:00.000Z"
  },
  "message": "Order captured successfully"
}
```

### M-Pesa Endpoints

#### 1. STK Push
```http
POST /api/mpesa/stkpush

Content-Type: application/json
Idempotency-Key: unique-key-12347

{
  "amount": 5000,
  "phoneNumber": "0712345678",
  "accountReference": "order-456",
  "transactionDesc": "Safari Booking",
  "orderId": "order-456",
  "customerEmail": "customer@example.com",
  "metadata": {
    "packageId": "safari-002"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "checkoutRequestID": "ws_CO_123456...",
    "merchantRequestID": "1234567890",
    "responseCode": "0",
    "responseDescription": "Success. Request accepted for processing",
    "customerMessage": "Success. Request accepted for processing",
    "amount": 5000,
    "phoneNumber": "254712345678",
    "createdAt": "2024-02-14T10:40:00.000Z",
    "metadata": {...}
  },
  "message": "STK Push initiated successfully"
}
```

### Webhook Endpoints

#### PayPal Webhook
```
POST /api/paypal/webhook

x-paypal-transmission-id: transmission-123
x-paypal-transmission-time: 2024-02-14T10:45:00Z
x-paypal-cert-url: https://api.paypal.com/...
x-paypal-auth-algo: SHA256withRSA
x-paypal-transmission-sig: signature...

{
  "id": "WH-123456...",
  "event_type": "PAYMENT.CAPTURE.COMPLETED",
  "resource": {
    "id": "1234567890",
    "status": "COMPLETED",
    "amount": {...},
    ...
  }
}
```

#### M-Pesa Webhook
```
POST /api/mpesa/webhook

Content-Type: application/json

{
  "Body": {
    "stkCallback": {
      "MerchantRequestID": "1234567890",
      "CheckoutRequestID": "ws_CO_123456...",
      "ResultCode": 0,
      "ResultDesc": "The service request has been processed successfully.",
      "CallbackMetadata": {
        "Item": [
          {"Name": "Amount", "Value": 5000},
          {"Name": "MpesaReceiptNumber", "Value": "LK451A83TP"},
          {"Name": "TransactionDate", "Value": "20240214104600"},
          {"Name": "PhoneNumber", "Value": "254712345678"}
        ]
      }
    }
  }
}
```

---

## Frontend Components

### PayPal Checkout Button

```tsx
import { PayPalCheckoutButton } from "@/components/PayPalCheckoutButton";

export default function BookingPage() {
  return (
    <PayPalCheckoutButton
      amount={100.50}
      currency="USD"
      orderId="order-123"
      description="3-Day Kenya Safari"
      customerEmail="customer@example.com"
      onSuccess={(data) => {
        console.log("Payment successful:", data);
        // Redirect or update UI
      }}
      onError={(error) => {
        console.error("Payment failed:", error);
        // Show error message
      }}
    />
  );
}
```

### M-Pesa Payment Form

```tsx
import { MpesaPaymentForm } from "@/components/MpesaPaymentForm";

export default function BookingPage() {
  return (
    <MpesaPaymentForm
      amount={5000}
      orderId="order-456"
      accountReference="order-456"
      transactionDesc="Safari Booking"
      customerEmail="customer@example.com"
      onSuccess={(data) => {
        console.log("Payment initiated:", data);
        // Show pending state, wait for webhook
      }}
      onError={(error) => {
        console.error("Payment failed:", error);
        // Show error message
      }}
    />
  );
}
```

---

## Webhook Configuration

### Setting Up Webhooks on Vercel

1. **PayPal Webhook:**
   - URL: `https://your-vercel-domain.com/api/paypal/webhook`
   - Make sure it's publicly accessible
   - Set in PayPal Dashboard → Webhooks

2. **M-Pesa Webhook:**
   - URL: `https://your-vercel-domain.com/api/mpesa/webhook`
   - Must be HTTPS (not HTTP)
   - Whitelist Safaricom IP addresses at your infrastructure level

### Testing Webhooks Locally

Use ngrok to expose local server to internet:

```bash
# Install ngrok (one-time)
npm install -g ngrok

# Start your development server
npm run dev

# In another terminal, expose port 3000
ngrok http 3000

# Use the ngrok URL as your webhook URL in PayPal/Daraja dashboards
```

### Webhook Security

- **PayPal:** Signature verification implemented in `/api/paypal/webhook`
- **M-Pesa:** Callback validation in `/api/mpesa/webhook`
- **Idempotency:** Prevents duplicate processing of same webhook
- **Rate limiting:** Built-in protection against abuse

---

## Testing

### Test Payment Scenarios

#### PayPal Test Transactions

Use test account in sandbox mode:
- Sandbox URL: `https://sandbox.paypal.com`
- Use your sandbox merchant and buyer test accounts

#### M-Pesa Test Transactions

Use Safaricom's test shortcode:
```env
MPESA_SHORTCODE=174379
MPESA_PASSKEY=bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
```

Test phone: `254708374149`

### Integration Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch
```

### Manual Testing Checklist

- [ ] Create PayPal order
- [ ] Approve and capture PayPal order
- [ ] Receive and process PayPal webhook
- [ ] Initiate M-Pesa STK Push
- [ ] Receive and process M-Pesa callback
- [ ] Verify idempotency (resend same request)
- [ ] Check logging and transaction records

---

## Deployment

### Preparing for Production

1. **Update Environment Variables:**
   ```env
   NODE_ENV=production
   PAYPAL_MODE=live
   PAYPAL_CLIENT_ID=production_id
   PAYPAL_CLIENT_SECRET=production_secret
   PAYPAL_WEBHOOK_ID=production_webhook_id
   MPESA_CONSUMER_KEY=production_key
   MPESA_CONSUMER_SECRET=production_secret
   ```

2. **Database Setup:**
   - Set up PostgreSQL or your database
   - Create tables for transaction logging
   - Implement proper error handling and retries

3. **Monitoring:**
   - Set up error tracking (Sentry, etc.)
   - Monitor webhook processing
   - Set up alerts for payment failures

4. **Security:**
   - Enable HTTPS (automatic on Vercel)
   - Implement rate limiting at edge
   - Regular security audits
   - Keep dependencies updated

### Deploy to Vercel

```bash
# Push to git repository
git add .
git commit -m "Add payment integration"
git push origin main

# Vercel will auto-deploy
# Set environment variables in Vercel dashboard
# Project → Settings → Environment Variables
```

### Post-Deployment Checklist

- [ ] Verify webhook URLs are correct
- [ ] Test first real transaction
- [ ] Monitor webhook delivery
- [ ] Check logging and error tracking
- [ ] Verify payment confirmations are sent
- [ ] Test edge cases and error scenarios

---

## Security Best Practices

### API Security

1. **Request Validation:**
   - Validate all inputs with Zod
   - Check payload size
   - Verify content types

2. **Idempotency:**
   - Use idempotency keys for all payment requests
   - Prevent duplicate charges
   - Built-in with `idempotency-key` header

3. **Webhook Verification:**
   - PayPal: Signature verification via RSA-SHA256
   - M-Pesa: IP whitelisting at infrastructure level

4. **Rate Limiting:**
   - Built-in rate limiting per webhook type
   - Prevents abuse and DDoS attacks

### Secrets Management

1. **Environment Variables:**
   - Never commit `.env.local` to git
   - Use `.gitignore` to exclude
   - Store in Vercel vault

2. **API Keys:**
   - Rotate periodically
   - Use separate keys for test and production
   - Monitor for leaks

3. **Sensitive Data:**
   - Don't log payment details
   - Sanitize PII in logs
   - Use HTTPS everywhere

### Data Protection

1. **Payment Data:**
   - Encrypt stored payment information
   - Comply with PCI-DSS if storing cards
   - Use tokenization where possible

2. **Customer Data:**
   - GDPR compliant data handling
   - Secure storage and transmission
   - Clear privacy policy

3. **Logs:**
   - Sanitize logs before storage
   - Implement log retention policies
   - Secure log access

### Database

1. **Connection:**
   - Use environment variables for connection strings
   - Enable SSL/TLS
   - Use connection pooling

2. **Access Control:**
   - Principle of least privilege
   - Role-based access control
   - Audit logging

3. **Backups:**
   - Regular automated backups
   - Test backup restoration
   - Geo-redundancy for production

---

## Troubleshooting

### Common Issues

**1. PayPal Order Creation Fails**
```
Error: Missing PayPal environment variables
Solution: Verify PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in .env.local
```

**2. M-Pesa Phone Number Validation**
```
Error: Invalid phone number format
Solution: Ensure phone starts with 0 or +254 followed by 9 digits
Format: 0712345678 or +254712345678
```

**3. Webhook Not Receiving**
```
Error: 404 on webhook endpoint
Solution: 
- Verify webhook URL is correct in PayPal/Daraja dashboard
- Ensure endpoint is publicly accessible (ngrok for local testing)
- Check firewall rules
```

**4. Signature Verification Fails**
```
Error: Webhook signature verification failed
Solution:
- Verify webhook ID is correct
- Check that webhook headers are not modified
- For M-Pesa: Verify IP whitelisting is configured
```

---

## Support & Resources

- **PayPal Integration:** https://developer.paypal.com/docs/checkout/
- **M-Pesa STK Push:** https://developer.safaricom.co.ke/docs/
- **Next.js API Routes:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **Zod Validation:** https://zod.dev/

---

## License

This payment integration is part of the Buffalo Plains Adventures booking system.

---

**Last Updated:** February 14, 2024
