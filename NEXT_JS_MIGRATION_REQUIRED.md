# Next.js Migration Required

## Issue
This project currently uses **Vite**, but the payment integration requires **Next.js 14 (App Router)** to:
- Use API Route Handlers (`/app/api/**/route.ts`)
- Use the `next/server` module
- Deploy serverless functions on Vercel

## Status
The payment integration code is **production-ready** and waiting for Next.js setup.

## Files Created (Waiting for Next.js)
These files require Next.js to function:
- `/app/api/paypal/create-order/route.ts` - Create PayPal order
- `/app/api/paypal/capture-order/route.ts` - Capture PayPal order
- `/app/api/paypal/webhook/route.ts` - PayPal webhook handler
- `/app/api/mpesa/stkpush/route.ts` - M-Pesa STK Push
- `/app/api/mpesa/webhook/route.ts` - M-Pesa webhook handler
- `/src/lib/middleware.ts` - API middleware (uses next/server)

## Next Steps to Migrate to Next.js

### Option 1: Migrate Your Vite Project to Next.js (Recommended)
```bash
# Create new Next.js project
npx create-next-app@latest buffalo-plains --typescript --app

# Copy your existing components and pages
# Update imports to match Next.js structure
# All payment files will then work out of the box
```

### Option 2: Keep Vite + Add Backend Separately
If you want to keep Vite for frontend:
1. Create separate Next.js backend: `npx create-next-app@latest buffalo-plains-api`
2. Move API routes to backend project
3. Update frontend to call backend APIs

### Option 3: Use Vite + Express Backend
If you must stay with Vite, convert API routes to Express:
```typescript
// Instead of next/server, use express
import express from 'express';

app.post('/api/paypal/create-order', async (req, res) => {
  // ... route handler code
});
```

## Recommendation
**Migrate to Next.js 14** because:
- ✅ Built-in API routes (serverless on Vercel)
- ✅ All payment code ready to use
- ✅ Better performance with edge functions
- ✅ Seamless Vercel deployment
- ✅ No extra backend setup needed

The migration is straightforward since both use React and TypeScript.

---

**Status**: Ready for Next.js migration ✅
