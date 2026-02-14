# Quick Reference Card

## API Endpoints

### PayPal Endpoints

```bash
# Create Order
POST /api/paypal/create-order
Header: idempotency-key: {random-uuid}
{
  "amount": 100.50,
  "currency": "USD",
  "orderId": "order-123",
  "description": "Item description",
  "customerEmail": "user@example.com",
  "metadata": { "key": "value" }
}
Response: { orderId, approvalUrl, status }

# Capture Order
POST /api/paypal/capture-order
Header: idempotency-key: {random-uuid}
{
  "orderId": "paypal-order-id"
}
Response: { orderId, status, payerEmail }

# Webhook (Automatic)
POST /api/paypal/webhook
```

### M-Pesa Endpoints

```bash
# STK Push
POST /api/mpesa/stkpush
Header: idempotency-key: {random-uuid}
{
  "amount": 5000,
  "phoneNumber": "0712345678",
  "orderId": "order-456",
  "accountReference": "booking-ref",
  "transactionDesc": "Payment",
  "customerEmail": "user@example.com"
}
Response: { checkoutRequestID, responseCode }

# Webhook (Automatic)
POST /api/mpesa/webhook
```

---

## Environment Variables

```env
# PayPal
PAYPAL_MODE=sandbox|live
PAYPAL_CLIENT_ID=xxx
PAYPAL_CLIENT_SECRET=xxx
PAYPAL_WEBHOOK_ID=xxx

# M-Pesa
MPESA_CONSUMER_KEY=xxx
MPESA_CONSUMER_SECRET=xxx
MPESA_SHORTCODE=174379
MPESA_PASSKEY=xxx
MPESA_CALLBACK_URL=https://your.com/api/mpesa/webhook
```

---

## Components

### PayPal Button
```tsx
import { PayPalCheckoutButton } from '@/components/PayPalCheckoutButton';

<PayPalCheckoutButton
  amount={100}
  currency="USD"
  orderId="order-123"
  description="3-Day Safari"
  customerEmail="user@example.com"
  onSuccess={(data) => handleSuccess(data)}
  onError={(error) => handleError(error)}
/>
```

### M-Pesa Form
```tsx
import { MpesaPaymentForm } from '@/components/MpesaPaymentForm';

<MpesaPaymentForm
  amount={13000}
  phoneNumber="0712345678"
  orderId="order-123"
  accountReference="safari-001"
  transactionDesc="Safari Booking"
  customerEmail="user@example.com"
  onSuccess={(data) => handleSuccess(data)}
  onError={(error) => handleError(error)}
/>
```

---

## Hooks

### usePayment Hook
```tsx
import { usePayment } from '@/hooks/usePayment';

const payment = usePayment();

// Properties
payment.isLoading          // boolean
payment.error              // string | null
payment.status             // 'idle' | 'processing' | 'success' | 'error'
payment.transactionId      // string | null
payment.data               // any | null

// Methods
await payment.createPayPalOrder({...})
await payment.capturePayPalOrder(orderId)
await payment.initiateMpesaPayment({...})
payment.reset()
payment.setError(message)
payment.setLoading(boolean)
```

---

## Utility Functions

```tsx
import {
  formatCurrency,
  formatPhoneNumberDisplay,
  isValidEmail,
  isValidKenyanPhone,
  generateReferenceId,
  generateIdempotencyKey,
  retryWithBackoff,
  maskSensitiveData,
  getPaymentMethodName
} from '@/lib/payment-utils';

// Examples
formatCurrency(100, 'USD')              // "$100.00"
formatPhoneNumberDisplay('254712345678') // "+254 712 345 678"
isValidKenyanPhone('0712345678')        // true
generateIdempotencyKey('order-123')     // "order-123-1707921000000-abc123"
maskSensitiveData('0712345678')         // "0712***5678"
```

---

## Type System

```tsx
import {
  PaymentMethodType,      // 'paypal' | 'mpesa'
  PaymentStatus,          // 'pending' | 'completed' | 'failed'
  CurrencyCode,           // 'USD' | 'KES'
  PaymentRequest,
  PaymentResponse,
  TransactionLog,
  PaymentException
} from '@/lib/types/payment';

// PaymentResponse type
{
  success: boolean;
  status: 'pending' | 'completed' | 'failed';
  transactionId: string;
  orderId: string;
  amount: number;
  currency: 'USD' | 'KES';
  method: 'paypal' | 'mpesa';
  timestamp: string;
  message: string;
  redirectUrl?: string;
  metadata?: Record<string, any>;
}
```

---

## Common Patterns

### Complete Payment Flow (PayPal)
```tsx
// 1. Create order and redirect to PayPal
const { orderId, approvalUrl } = await payment.createPayPalOrder({
  amount: 100,
  currency: 'USD',
  orderId: 'order-123',
  description: 'Product',
  customerEmail: 'user@example.com'
});
window.location.href = approvalUrl;

// 2. User approves on PayPal, redirected back
// 3. Capture the order
const result = await payment.capturePayPalOrder(orderId);

// 4. Webhook confirms payment and updates database
// Order status: completed
```

### Complete Payment Flow (M-Pesa)
```tsx
// 1. Initiate STK Push
const { checkoutRequestID } = await payment.initiateMpesaPayment({
  amount: 5000,
  phoneNumber: '0712345678',
  orderId: 'order-123',
  accountReference: 'safari-001',
  transactionDesc: 'Safari Booking',
  customerEmail: 'user@example.com'
});

// 2. User enters PIN on phone
// 3. Webhook receives callback
// Order status: completed
```

---

## Error Handling

```tsx
import { PaymentException } from '@/lib/types/payment';

try {
  const result = await payment.createPayPalOrder(data);
} catch (error) {
  if (error instanceof PaymentException) {
    console.log(error.code);       // PAYPAL_ORDER_CREATION_FAILED
    console.log(error.statusCode); // 400, 401, 500
    console.log(error.details);    // API response details
  }
}
```

---

## Validation

```tsx
import {
  PayPalCreateOrderSchema,
  MpesaStkPushSchema,
  MpesaCallbackSchema,
  PaymentStatusCheckSchema
} from '@/lib/validation';

// Validate request
const result = PayPalCreateOrderSchema.safeParse(data);
if (!result.success) {
  console.log(result.error.errors);
} else {
  // Process validated data
  const validData = result.data;
}
```

---

## Logging

```tsx
import { logger } from '@/lib/logging';

// Basic logging
logger.info('Payment processed', 'context-name', { orderId, amount });
logger.warn('Webhook delayed', 'webhook', { delay: 5000 });
logger.error('Payment failed', error, 'handler', { orderId });
logger.debug('Token cached', 'auth', { expiresIn: 3600 });

// Transaction logging
logger.logTransactionStart('paypal', orderId, amount, 'PayPal');
logger.logTransactionSuccess('paypal', orderId, transactionId, amount);
logger.logTransactionFailure('paypal', orderId, error);

// Webhook logging
logger.logWebhookReceived('paypal', webhookId, eventType);
logger.logWebhookProcessed('paypal', webhookId, true, { details });
```

---

## Middleware

```tsx
import { withMiddleware, withRateLimit } from '@/lib/middleware';
import { ApiResponse } from '@/lib/webhook-security';

// In API route
export const POST = withMiddleware(
  request,
  async (request) => {
    // Your handler logic
    return ApiResponse.toResponse(
      ApiResponse.success(data, 'Success')
    );
  },
  {
    requireContentType: 'application/json',
    requireIdempotencyKey: true,
    validateCors: true
  }
);
```

---

## Testing with cURL

```bash
# Create PayPal Order
curl -X POST http://localhost:3000/api/paypal/create-order \
  -H "Content-Type: application/json" \
  -H "idempotency-key: test-key-1" \
  -d '{
    "amount": 100,
    "currency": "USD",
    "orderId": "order-123",
    "description": "Test Order",
    "customerEmail": "test@example.com"
  }'

# STK Push
curl -X POST http://localhost:3000/api/mpesa/stkpush \
  -H "Content-Type: application/json" \
  -H "idempotency-key: test-key-2" \
  -d '{
    "amount": 1000,
    "phoneNumber": "0712345678",
    "orderId": "order-456",
    "accountReference": "booking-001",
    "transactionDesc": "Test",
    "customerEmail": "test@example.com"
  }'
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "PayPal env vars missing" | Check .env.local has PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_WEBHOOK_ID |
| "Invalid phone format" | Use 0712345678 or +254712345678 or 254712345678 format |
| "Webhook not received" | Use ngrok for local testing, update webhook URL in PayPal/Daraja |
| "Signature verification failed" | Check PAYPAL_WEBHOOK_ID is correct in .env.local |
| "Idempotency key missing" | Add `idempotency-key` header to request |
| "Rate limit exceeded" | Wait before retrying, limit is 100 req/min |
| "CORS error" | Ensure endpoint allows your origin |

---

## Phone Number Formats (M-Pesa)

```
All these are valid:
✅ 0712345678
✅ +254712345678
✅ 254712345678

Invalid:
❌ 712345678 (missing country code or leading 0)
❌ 00254712345678 (double leading 0)
❌ +2540712345678 (extra 0 before 7)
```

---

## File Locations

| What | Where |
|------|-------|
| Type definitions | `src/lib/types/payment.ts` |
| PayPal utilities | `src/lib/paypal.ts` |
| M-Pesa utilities | `src/lib/mpesa.ts` |
| Validation schemas | `src/lib/validation.ts` |
| Security utilities | `src/lib/webhook-security.ts` |
| Logging | `src/lib/logging.ts` |
| Middleware | `src/lib/middleware.ts` |
| Utilities | `src/lib/payment-utils.ts` |
| PayPal routes | `app/api/paypal/*/route.ts` |
| M-Pesa routes | `app/api/mpesa/*/route.ts` |
| PayPal button | `src/components/PayPalCheckoutButton.tsx` |
| M-Pesa form | `src/components/MpesaPaymentForm.tsx` |
| Payment hook | `src/hooks/usePayment.ts` |

---

## Documentation Files

- **IMPLEMENTATION_COMPLETE.md** - Overview and quick start
- **PAYMENT_INTEGRATION_SETUP.md** - Detailed setup instructions
- **SERVERLESS_ARCHITECTURE.md** - Architecture and design
- **IMPLEMENTATION_CHECKLIST.md** - Step-by-step guide
- **PAYMENT_EXAMPLE.tsx** - Example usage

---

## External Resources

- **PayPal**: https://developer.paypal.com/docs/
- **M-Pesa**: https://developer.safaricom.co.ke/docs/
- **Next.js**: https://nextjs.org/docs/
- **Zod**: https://zod.dev/
- **Vercel**: https://vercel.com/docs/

---

**Keep this card handy while developing!**
