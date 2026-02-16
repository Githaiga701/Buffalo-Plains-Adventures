/**
 * Validation Schema Tests
 */
import { describe, it, expect } from 'vitest';
import {
  PayPalCreateOrderSchema,
  PayPalCaptureOrderSchema,
  PayPalWebhookSchema,
  MpesaStkPushSchema,
  MpesaCallbackSchema,
  PaymentStatusCheckSchema,
} from '../lib/validation';

describe('PayPalCreateOrderSchema', () => {
  it('should validate a correct payload', () => {
    const payload = {
      amount: 100,
      currency: 'USD',
      orderId: 'order-123',
      description: 'Safari tour booking',
      customerEmail: 'test@example.com',
    };

    const result = PayPalCreateOrderSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('should accept KES currency', () => {
    const payload = {
      amount: 10000,
      currency: 'KES',
      orderId: 'order-456',
      description: 'Safari tour booking',
      customerEmail: 'test@example.com',
    };

    const result = PayPalCreateOrderSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('should default currency to USD when not provided', () => {
    const payload = {
      amount: 100,
      orderId: 'order-123',
      description: 'Safari tour booking',
      customerEmail: 'test@example.com',
    };

    const result = PayPalCreateOrderSchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.currency).toBe('USD');
    }
  });

  it('should reject negative amounts', () => {
    const payload = {
      amount: -100,
      orderId: 'order-123',
      description: 'Safari tour booking',
      customerEmail: 'test@example.com',
    };

    const result = PayPalCreateOrderSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it('should reject zero amount', () => {
    const payload = {
      amount: 0,
      orderId: 'order-123',
      description: 'Safari tour booking',
      customerEmail: 'test@example.com',
    };

    const result = PayPalCreateOrderSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it('should reject invalid email', () => {
    const payload = {
      amount: 100,
      orderId: 'order-123',
      description: 'Safari tour booking',
      customerEmail: 'invalid-email',
    };

    const result = PayPalCreateOrderSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it('should reject empty orderId', () => {
    const payload = {
      amount: 100,
      orderId: '',
      description: 'Safari tour booking',
      customerEmail: 'test@example.com',
    };

    const result = PayPalCreateOrderSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it('should reject empty description', () => {
    const payload = {
      amount: 100,
      orderId: 'order-123',
      description: '',
      customerEmail: 'test@example.com',
    };

    const result = PayPalCreateOrderSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it('should accept optional metadata', () => {
    const payload = {
      amount: 100,
      orderId: 'order-123',
      description: 'Safari tour booking',
      customerEmail: 'test@example.com',
      metadata: { packageId: 'pkg-001', guests: 2 },
    };

    const result = PayPalCreateOrderSchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.metadata).toEqual({ packageId: 'pkg-001', guests: 2 });
    }
  });

  it('should reject invalid currency', () => {
    const payload = {
      amount: 100,
      currency: 'EUR',
      orderId: 'order-123',
      description: 'Safari tour booking',
      customerEmail: 'test@example.com',
    };

    const result = PayPalCreateOrderSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });
});

describe('PayPalCaptureOrderSchema', () => {
  it('should validate a correct payload', () => {
    const payload = {
      orderId: 'PAYPAL-ORDER-123',
    };

    const result = PayPalCaptureOrderSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('should accept optional paymentIntentId', () => {
    const payload = {
      orderId: 'PAYPAL-ORDER-123',
      paymentIntentId: 'pi_12345',
    };

    const result = PayPalCaptureOrderSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('should reject empty orderId', () => {
    const payload = {
      orderId: '',
    };

    const result = PayPalCaptureOrderSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it('should reject missing orderId', () => {
    const payload = {};

    const result = PayPalCaptureOrderSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });
});

describe('PayPalWebhookSchema', () => {
  it('should validate a correct webhook payload', () => {
    const payload = {
      id: 'WH-123456',
      event_type: 'PAYMENT.CAPTURE.COMPLETED',
      create_time: '2024-01-15T10:00:00Z',
      resource: { id: 'capture-123' },
      resource_type: 'capture',
    };

    const result = PayPalWebhookSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('should reject missing event_type', () => {
    const payload = {
      id: 'WH-123456',
      create_time: '2024-01-15T10:00:00Z',
      resource: { id: 'capture-123' },
      resource_type: 'capture',
    };

    const result = PayPalWebhookSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });
});

describe('MpesaStkPushSchema', () => {
  it('should validate a correct payload with 254 prefix', () => {
    const payload = {
      amount: 1000,
      phoneNumber: '+254712345678',
      accountReference: 'ORDER123',
      transactionDesc: 'Safari Tour',
      orderId: 'order-123',
      customerEmail: 'test@example.com',
    };

    const result = MpesaStkPushSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('should validate a correct payload with 0 prefix', () => {
    const payload = {
      amount: 1000,
      phoneNumber: '0712345678',
      accountReference: 'ORDER123',
      transactionDesc: 'Safari Tour',
      orderId: 'order-123',
      customerEmail: 'test@example.com',
    };

    const result = MpesaStkPushSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('should reject invalid phone number format', () => {
    const payload = {
      amount: 1000,
      phoneNumber: '1234567890',
      accountReference: 'ORDER123',
      transactionDesc: 'Safari Tour',
      orderId: 'order-123',
      customerEmail: 'test@example.com',
    };

    const result = MpesaStkPushSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it('should reject transaction description longer than 13 characters', () => {
    const payload = {
      amount: 1000,
      phoneNumber: '+254712345678',
      accountReference: 'ORDER123',
      transactionDesc: 'This is way too long for description',
      orderId: 'order-123',
      customerEmail: 'test@example.com',
    };

    const result = MpesaStkPushSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it('should reject negative amount', () => {
    const payload = {
      amount: -100,
      phoneNumber: '+254712345678',
      accountReference: 'ORDER123',
      transactionDesc: 'Safari Tour',
      orderId: 'order-123',
      customerEmail: 'test@example.com',
    };

    const result = MpesaStkPushSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it('should reject empty account reference', () => {
    const payload = {
      amount: 1000,
      phoneNumber: '+254712345678',
      accountReference: '',
      transactionDesc: 'Safari Tour',
      orderId: 'order-123',
      customerEmail: 'test@example.com',
    };

    const result = MpesaStkPushSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it('should accept optional metadata', () => {
    const payload = {
      amount: 1000,
      phoneNumber: '+254712345678',
      accountReference: 'ORDER123',
      transactionDesc: 'Safari Tour',
      orderId: 'order-123',
      customerEmail: 'test@example.com',
      metadata: { tourDate: '2024-06-15' },
    };

    const result = MpesaStkPushSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });
});

describe('MpesaCallbackSchema', () => {
  it('should validate a successful callback payload', () => {
    const payload = {
      Body: {
        stkCallback: {
          MerchantRequestID: 'MR123',
          CheckoutRequestID: 'CR456',
          ResultCode: 0,
          ResultDesc: 'The service request is processed successfully.',
          CallbackMetadata: {
            Item: [
              { Name: 'Amount', Value: 1000 },
              { Name: 'MpesaReceiptNumber', Value: 'ABC123' },
              { Name: 'TransactionDate', Value: '20240115120000' },
              { Name: 'PhoneNumber', Value: '254712345678' },
            ],
          },
        },
      },
    };

    const result = MpesaCallbackSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('should validate a failed callback payload (no metadata)', () => {
    const payload = {
      Body: {
        stkCallback: {
          MerchantRequestID: 'MR123',
          CheckoutRequestID: 'CR456',
          ResultCode: 1032,
          ResultDesc: 'Request cancelled by user.',
        },
      },
    };

    const result = MpesaCallbackSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('should reject missing Body', () => {
    const payload = {
      stkCallback: {
        MerchantRequestID: 'MR123',
        CheckoutRequestID: 'CR456',
        ResultCode: 0,
        ResultDesc: 'Success',
      },
    };

    const result = MpesaCallbackSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it('should reject missing ResultCode', () => {
    const payload = {
      Body: {
        stkCallback: {
          MerchantRequestID: 'MR123',
          CheckoutRequestID: 'CR456',
          ResultDesc: 'Success',
        },
      },
    };

    const result = MpesaCallbackSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });
});

describe('PaymentStatusCheckSchema', () => {
  it('should validate paypal method', () => {
    const payload = {
      transactionId: 'TXN123',
      method: 'paypal',
    };

    const result = PaymentStatusCheckSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('should validate mpesa method', () => {
    const payload = {
      transactionId: 'TXN456',
      method: 'mpesa',
    };

    const result = PaymentStatusCheckSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('should reject invalid method', () => {
    const payload = {
      transactionId: 'TXN123',
      method: 'stripe',
    };

    const result = PaymentStatusCheckSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it('should reject empty transactionId', () => {
    const payload = {
      transactionId: '',
      method: 'paypal',
    };

    const result = PaymentStatusCheckSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it('should reject missing transactionId', () => {
    const payload = {
      method: 'paypal',
    };

    const result = PaymentStatusCheckSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });
});
