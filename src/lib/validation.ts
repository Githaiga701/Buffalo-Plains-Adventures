/**
 * Validation Schemas using Zod
 * Request body and webhook validation
 */

import { z } from "zod";

// ==================== PAYPAL SCHEMAS ====================

export const PayPalCreateOrderSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  currency: z.enum(["USD", "KES"]).default("USD"),
  orderId: z.string().min(1, "Order ID is required"),
  description: z.string().min(1, "Description is required"),
  customerEmail: z.string().email("Invalid email address"),
  metadata: z.record(z.any()).optional(),
});

export type PayPalCreateOrderPayload = z.infer<typeof PayPalCreateOrderSchema>;

export const PayPalCaptureOrderSchema = z.object({
  orderId: z.string().min(1, "PayPal Order ID is required"),
  paymentIntentId: z.string().optional(),
});

export type PayPalCaptureOrderPayload = z.infer<typeof PayPalCaptureOrderSchema>;

export const PayPalWebhookSchema = z.object({
  id: z.string(),
  event_type: z.string(),
  create_time: z.string(),
  resource: z.record(z.any()),
  resource_type: z.string(),
});

export type PayPalWebhookPayload = z.infer<typeof PayPalWebhookSchema>;

// ==================== MPESA SCHEMAS ====================

export const MpesaStkPushSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  phoneNumber: z
    .string()
    .regex(/^(?:\+254|0)7\d{8}$/, "Invalid Kenyan phone number format"),
  accountReference: z.string().min(1, "Account reference is required"),
  transactionDesc: z
    .string()
    .min(1, "Transaction description is required")
    .max(13, "Description must be 13 characters or less"),
  orderId: z.string().min(1, "Order ID is required"),
  customerEmail: z.string().email("Invalid email address"),
  metadata: z.record(z.any()).optional(),
});

export type MpesaStkPushPayload = z.infer<typeof MpesaStkPushSchema>;

export const MpesaCallbackSchema = z.object({
  Body: z.object({
    stkCallback: z.object({
      MerchantRequestID: z.string(),
      CheckoutRequestID: z.string(),
      ResultCode: z.number(),
      ResultDesc: z.string(),
      CallbackMetadata: z
        .object({
          Item: z.array(
            z.object({
              Name: z.string(),
              Value: z.union([z.string(), z.number()]),
            })
          ),
        })
        .optional(),
    }),
  }),
});

export type MpesaCallbackPayload = z.infer<typeof MpesaCallbackSchema>;

// ==================== COMMON SCHEMAS ====================

export const PaymentStatusCheckSchema = z.object({
  transactionId: z.string().min(1, "Transaction ID is required"),
  method: z.enum(["paypal", "mpesa"]),
});

export type PaymentStatusCheckPayload = z.infer<typeof PaymentStatusCheckSchema>;

export const ErrorResponseSchema = z.object({
  success: z.boolean().default(false),
  error: z.string(),
  code: z.string(),
  details: z.record(z.any()).optional(),
});

export const SuccessResponseSchema = z.object({
  success: z.boolean().default(true),
  data: z.record(z.any()),
  message: z.string().optional(),
});
