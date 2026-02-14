/**
 * Payment System Type Definitions
 * Comprehensive types for PayPal and M-Pesa integration
 */

// ==================== PAYPAL TYPES ====================

export interface PayPalAccessToken {
  scope: string;
  access_token: string;
  token_type: string;
  app_id: string;
  expires_in: number;
}

export interface PayPalOrder {
  id: string;
  status: "CREATED" | "APPROVED" | "COMPLETED" | "SAVED" | "VOIDED" | "PAYER_ACTION_REQUIRED";
  links: Array<{
    rel: string;
    href: string;
    method?: string;
  }>;
  payment_source?: {
    paypal: {
      email_address: string;
      account_id: string;
      account_status: string;
      name?: {
        given_name: string;
        surname: string;
      };
      address?: {
        country_code: string;
      };
    };
  };
}

export interface PayPalCreateOrderRequest {
  intent: "CAPTURE" | "AUTHORIZE";
  purchase_units: Array<{
    amount: {
      currency_code: string;
      value: string;
      breakdown?: {
        item_total?: { currency_code: string; value: string };
        shipping?: { currency_code: string; value: string };
        tax_total?: { currency_code: string; value: string };
      };
    };
    items?: Array<{
      name: string;
      unit_amount: { currency_code: string; value: string };
      quantity: string;
      description?: string;
      category?: string;
    }>;
    description?: string;
    reference_id?: string;
    custom_id?: string;
    invoice_id?: string;
    shipping?: {
      name: { full_name: string };
      address: {
        address_line_1: string;
        address_line_2?: string;
        admin_area_2: string;
        admin_area_1?: string;
        postal_code?: string;
        country_code: string;
      };
    };
  }>;
  payment_source?: {
    paypal: {
      experience_context: {
        return_url: string;
        cancel_url: string;
        shipping_preference?: "GET_FROM_FILE" | "SET_PROVIDED_ADDRESS" | "NO_SHIPPING";
        user_action?: "CONTINUE" | "PAY_NOW";
        payment_method_preference?: string;
        locale?: string;
        brand_name?: string;
      };
    };
  };
}

export interface PayPalCaptureOrderRequest {
  payment_source?: object;
}

export interface PayPalWebhookEvent {
  id: string;
  event_version: string;
  create_time: string;
  event_type: string;
  resource_type: string;
  resource: {
    id: string;
    status: string;
    amount?: {
      currency_code: string;
      value: string;
    };
    supplementary_data?: {
      related_ids?: {
        order_id?: string;
      };
    };
    [key: string]: any;
  };
  links: Array<{ rel: string; href: string }>;
}

export interface PayPalWebhookSignature {
  id: string;
  event_body: string;
  transmission_id: string;
  transmission_time: string;
  cert_url: string;
  auth_algo: string;
  transmission_sig: string;
  webhook_id: string;
  webhook_event: PayPalWebhookEvent;
}

// ==================== MPESA TYPES ====================

export interface MpesaAccessToken {
  access_token: string;
  expires_in: number;
}

export interface MpesaStkPushRequest {
  BusinessShortCode: string;
  Password: string;
  Timestamp: string;
  TransactionType: "CustomerPayBillOnline";
  Amount: string;
  PartyA: string;
  PartyB: string;
  PhoneNumber: string;
  CallBackURL: string;
  AccountReference: string;
  TransactionDesc: string;
}

export interface MpesaStkPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

export interface MpesaCallback {
  Body: {
    stkCallback: {
      MerchantRequestID: string;
      CheckoutRequestID: string;
      ResultCode: number;
      ResultDesc: string;
      CallbackMetadata?: {
        Item: Array<{
          Name: string;
          Value: string | number;
        }>;
      };
    };
  };
}

export interface MpesaCallbackMetadata {
  amount: number;
  mpesaReceiptNumber: string;
  transactionDate: string;
  phoneNumber: string;
  checkoutRequestID: string;
  merchantRequestID: string;
}

// ==================== GENERIC PAYMENT TYPES ====================

export type PaymentMethodType = "paypal" | "mpesa";
export type PaymentStatus = "pending" | "completed" | "failed" | "cancelled";
export type CurrencyCode = "USD" | "KES";

export interface PaymentRequest {
  method: PaymentMethodType;
  amount: number;
  currency: CurrencyCode;
  orderId: string;
  description: string;
  customerEmail: string;
  phoneNumber?: string;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  success: boolean;
  status: PaymentStatus;
  transactionId: string;
  orderId: string;
  amount: number;
  currency: CurrencyCode;
  method: PaymentMethodType;
  timestamp: string;
  message: string;
  redirectUrl?: string;
  metadata?: Record<string, any>;
}

export interface TransactionLog {
  id: string;
  orderId: string;
  transactionId: string;
  method: PaymentMethodType;
  amount: number;
  currency: CurrencyCode;
  status: PaymentStatus;
  customerEmail: string;
  phoneNumber?: string;
  webhookData?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  errors?: string[];
}

// ==================== ERROR TYPES ====================

export interface PaymentError {
  code: string;
  message: string;
  details?: Record<string, any>;
  statusCode: number;
}

export class PaymentException extends Error {
  code: string;
  statusCode: number;
  details?: Record<string, any>;

  constructor(message: string, code: string, statusCode: number = 400, details?: Record<string, any>) {
    super(message);
    this.name = "PaymentException";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}
