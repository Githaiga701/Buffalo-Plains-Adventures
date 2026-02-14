# Implementation Checklist & Next Steps

## Phase 1: Foundation Setup ✅ COMPLETE

### Environment Configuration
- [x] Copy `.env.example` to `.env.local`
- [x] Create `.env.example` with all variables
- [ ] Populate actual credentials in `.env.local` (DO NOT COMMIT)
- [ ] Test environment variables load correctly

### Dependencies
- [x] Zod is already installed
- [x] React Hook Form is already installed
- [ ] Verify all dependencies with: `npm list`
- [ ] Run: `npm ci` to ensure exact versions

### Project Structure
- [x] Create `/app/api/paypal/` folder structure
- [x] Create `/app/api/mpesa/` folder structure
- [x] Create `/src/lib/types/` folder structure
- [x] Create utility files in `/src/lib/`
- [x] Create components in `/src/components/`
- [x] Create hooks in `/src/hooks/`

---

## Phase 2: PayPal Integration 🔵 READY FOR TESTING

### PayPal Account Setup
- [ ] Create PayPal Developer Account (https://developer.paypal.com)
- [ ] Navigate to Dashboard → Apps & Credentials
- [ ] Create new application
- [ ] Copy Client ID and Secret to `.env.local`
- [ ] Switch to Sandbox mode for testing

### Webhook Configuration
- [ ] Go to Account Settings → Webhooks
- [ ] Create new webhook for local testing (use ngrok)
- [ ] Subscribe to events:
  - [ ] PAYMENT.CAPTURE.COMPLETED
  - [ ] PAYMENT.CAPTURE.DENIED
  - [ ] CHECKOUT.ORDER.APPROVED
- [ ] Copy Webhook ID to `.env.local`
- [ ] Test webhook delivery

### API Testing
```bash
# Test Create Order Endpoint
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
```

### Implementation Verification
- [ ] Confirm order creation returns approval URL
- [ ] Verify token caching works (check logs)
- [ ] Test with invalid data (error handling)
- [ ] Test idempotency (same request twice)

---

## Phase 3: M-Pesa Integration 🔵 READY FOR TESTING

### Safaricom Daraja Setup
- [ ] Create account at https://developer.safaricom.co.ke
- [ ] Verify email
- [ ] Create new application
- [ ] Copy Consumer Key and Secret to `.env.local`
- [ ] Get Business Shortcode (use 174379 for testing)
- [ ] Get Passkey from settings

### Configuration
- [ ] Set `MPESA_SHORTCODE=174379` (test shortcode)
- [ ] Set `MPESA_PASSKEY=bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919`
- [ ] Set `MPESA_CALLBACK_URL=http://localhost:3000/api/mpesa/webhook` (local)

### API Testing
```bash
# Test STK Push Endpoint
curl -X POST http://localhost:3000/api/mpesa/stkpush \
  -H "Content-Type: application/json" \
  -H "idempotency-key: test-key-2" \
  -d '{
    "amount": 1000,
    "phoneNumber": "254708374149",
    "orderId": "order-456",
    "accountReference": "order-456",
    "transactionDesc": "Test Payment",
    "customerEmail": "test@example.com"
  }'
```

### Implementation Verification
- [ ] STK prompt appears on test phone
- [ ] Callback received and processed
- [ ] Idempotency works correctly
- [ ] Error handling for invalid phone

---

## Phase 4: Webhook Setup 🔵 READY

### Local Testing with ngrok
```bash
# Install ngrok
npm install -g ngrok

# Start your app
npm run dev

# In another terminal, expose to internet
ngrok http 3000

# Update webhooks to use ngrok URL:
# PayPal: https://xxxx-xx-xxx-xxx-xx.ngrok.io/api/paypal/webhook
# M-Pesa: https://xxxx-xx-xxx-xxx-xx.ngrok.io/api/mpesa/webhook
```

### Webhook Testing
- [ ] Send test webhook from PayPal dashboard
- [ ] Send test webhook from Daraja dashboard
- [ ] Verify both are received and logged
- [ ] Check signature verification
- [ ] Test duplicate webhook handling

### Logging Verification
- [ ] Check console logs for webhook events
- [ ] Verify transaction is logged
- [ ] Check idempotency cache prevents duplicates
- [ ] Confirm error logging works

---

## Phase 5: Frontend Integration 🔵 READY

### Component Integration
- [ ] Import PayPalCheckoutButton in your page
- [ ] Import MpesaPaymentForm in your page
- [ ] Test button renders correctly
- [ ] Test form renders correctly
- [ ] Test error states

### Example Implementation
```tsx
// In your booking page
import { PayPalCheckoutButton } from '@/components/PayPalCheckoutButton';
import { MpesaPaymentForm } from '@/components/MpesaPaymentForm';
import { usePayment } from '@/hooks/usePayment';

export function BookingPage() {
  const payment = usePayment();

  return (
    <div>
      <PayPalCheckoutButton
        amount={100}
        currency="USD"
        orderId="order-123"
        description="3-Day Safari"
        customerEmail="customer@example.com"
        onSuccess={(data) => console.log('Success:', data)}
        onError={(error) => console.log('Error:', error)}
      />

      <MpesaPaymentForm
        amount={13000}
        orderId="order-123"
        accountReference="order-123"
        transactionDesc="Safari Booking"
        customerEmail="customer@example.com"
        onSuccess={(data) => console.log('Success:', data)}
      />
    </div>
  );
}
```

### Component Testing
- [ ] PayPal button initiates order creation
- [ ] M-Pesa form validates phone number
- [ ] Both components handle errors gracefully
- [ ] Loading states display correctly
- [ ] Success messages show

---

## Phase 6: End-to-End Testing 🔵 READY

### Test Scenarios
- [ ] User selects PayPal → creates order → approves → captures
- [ ] User selects M-Pesa → initiates STK → enters PIN → receives confirmation
- [ ] Webhook from PayPal → updates order status → sends email
- [ ] Webhook from M-Pesa → confirms payment → updates booking
- [ ] Duplicate webhook → handled by idempotency → no double charge
- [ ] Invalid input → proper error message → user can retry
- [ ] Network error → timeout handling → user can retry

### Manual Testing Checklist
- [ ] Complete full PayPal flow in sandbox
- [ ] Complete full M-Pesa flow with test account
- [ ] Verify emails sent (if configured)
- [ ] Check database entries created (if using DB)
- [ ] Test all error scenarios
- [ ] Verify logging captures everything
- [ ] Confirm no sensitive data in logs

---

## Phase 7: Database Integration (Optional)

### If Using PostgreSQL
```typescript
// Add to .env.local
DATABASE_URL=postgresql://user:password@localhost/payments

// Create schema
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id VARCHAR NOT NULL UNIQUE,
  transaction_id VARCHAR NOT NULL UNIQUE,
  method VARCHAR(20) NOT NULL, -- 'paypal' or 'mpesa'
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  status VARCHAR(20) NOT NULL, -- 'pending', 'completed', 'failed'
  customer_email VARCHAR NOT NULL,
  phone_number VARCHAR,
  webhook_data JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  errors TEXT[]
);

CREATE INDEX idx_order_id ON transactions(order_id);
CREATE INDEX idx_transaction_id ON transactions(transaction_id);
CREATE INDEX idx_created_at ON transactions(created_at);
```

### Integration Steps
- [ ] Install database client: `npm install prisma @prisma/client`
- [ ] Set up Prisma schema
- [ ] Update webhook handlers to save transactions
- [ ] Create transaction history page
- [ ] Add admin dashboard for viewing transactions

---

## Phase 8: Production Deployment 🔵 READY

### Pre-Deployment Checklist
- [ ] All tests passing
- [ ] No sensitive data in code
- [ ] Environment variables validated
- [ ] Error handling complete
- [ ] Logging configured
- [ ] Documentation updated
- [ ] Security review completed

### Vercel Deployment
```bash
# Create Vercel project
vercel

# Set production environment variables in dashboard
# PAYPAL_MODE=live (with production credentials)
# MPESA_* (with production credentials)

# Deploy
git push origin main
# Vercel auto-deploys from GitHub
```

### Post-Deployment
- [ ] Test all endpoints on production domain
- [ ] Update PayPal webhook URL to production
- [ ] Update M-Pesa callback URL to production
- [ ] Test webhook delivery from production
- [ ] Monitor logs for errors
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure monitoring alerts

---

## Phase 9: Monitoring & Maintenance

### Daily Checks
- [ ] Monitor error logs
- [ ] Check webhook delivery
- [ ] Verify payment confirmations sent
- [ ] Monitor API response times

### Weekly Tasks
- [ ] Review transaction logs
- [ ] Check error patterns
- [ ] Update documentation
- [ ] Test backup procedures

### Monthly Maintenance
- [ ] Rotate API credentials
- [ ] Update dependencies
- [ ] Security audit
- [ ] Performance review
- [ ] Customer support feedback review

### Quarterly Review
- [ ] Full system security audit
- [ ] Compliance check (PCI-DSS, GDPR, etc.)
- [ ] Disaster recovery test
- [ ] Architecture review for scalability

---

## Critical Files Summary

### Core Implementation
```
✅ /src/lib/types/payment.ts           - Type definitions
✅ /src/lib/paypal.ts                 - PayPal utilities
✅ /src/lib/mpesa.ts                  - M-Pesa utilities
✅ /src/lib/webhook-security.ts       - Security utilities
✅ /src/lib/logging.ts                - Logging system
✅ /src/lib/validation.ts             - Zod schemas
✅ /src/lib/middleware.ts             - API middleware
✅ /src/lib/payment-utils.ts          - Helper utilities
```

### API Routes
```
✅ /app/api/paypal/create-order/route.ts
✅ /app/api/paypal/capture-order/route.ts
✅ /app/api/paypal/webhook/route.ts
✅ /app/api/mpesa/stkpush/route.ts
✅ /app/api/mpesa/webhook/route.ts
```

### Frontend
```
✅ /src/components/PayPalCheckoutButton.tsx
✅ /src/components/MpesaPaymentForm.tsx
✅ /src/hooks/usePayment.ts
```

### Documentation
```
✅ /.env.example
✅ /PAYMENT_INTEGRATION_SETUP.md
✅ /SERVERLESS_ARCHITECTURE.md
✅ /PAYMENT_EXAMPLE.tsx
```

---

## Common Issues & Solutions

### 1. "PayPal Env Vars Missing"
```
Solution: 
1. Copy .env.example to .env.local
2. Fill in actual values from PayPal
3. Restart dev server
```

### 2. "M-Pesa Phone Validation Fails"
```
Solution:
Phone format must be: 0712345678 or +254712345678 or 254712345678
- Valid: 0712345678 ✓
- Invalid: 712345678 ✗
```

### 3. "Webhook Not Received"
```
Solution:
1. Are you using ngrok for local testing?
2. Is ngrok URL updated in PayPal/Daraja dashboard?
3. Is the endpoint publicly accessible?
4. Check firewall isn't blocking
```

### 4. "Signature Verification Failed"
```
Solution:
1. Verify PAYPAL_WEBHOOK_ID is correct
2. Check webhook headers aren't modified
3. Confirm PayPal sent webhook (not local test)
4. Check certificate fetch isn't failing
```

---

## Next Steps

### Immediate (This Week)
1. [ ] Set up PayPal Developer Account
2. [ ] Populate `.env.local` with credentials
3. [ ] Test PayPal order creation
4. [ ] Set up M-Pesa account
5. [ ] Test M-Pesa STK Push

### Short Term (This Month)
1. [ ] Complete end-to-end testing
2. [ ] Integrate with booking system
3. [ ] Add email notifications
4. [ ] Set up database (optional)
5. [ ] Deploy to production

### Long Term (Next Quarter)
1. [ ] Add transaction history UI
2. [ ] Create admin dashboard
3. [ ] Implement refunds handling
4. [ ] Add subscription support
5. [ ] Multi-currency support

---

## Support Resources

- **PayPal**: https://developer.paypal.com/docs/
- **M-Pesa**: https://developer.safaricom.co.ke/docs/
- **Next.js**: https://nextjs.org/docs/
- **Vercel**: https://vercel.com/docs/
- **Zod**: https://zod.dev/
- **React Hook Form**: https://react-hook-form.com/

---

## Questions?

Refer to:
1. **PAYMENT_INTEGRATION_SETUP.md** - Detailed setup instructions
2. **SERVERLESS_ARCHITECTURE.md** - Architecture and implementation details
3. **Type definitions** - For understanding data structures
4. **Code comments** - Each file has detailed comments

---

**Start Date**: February 14, 2024  
**Current Phase**: Phase 1-2 (Foundation Ready)  
**Estimated Completion**: 2 weeks for Phase 1-6  
**Status**: 🟢 All Components Ready for Integration

---
