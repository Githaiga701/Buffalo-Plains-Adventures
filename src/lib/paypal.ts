/**
 * PayPal Integration Utility
 * Handles PayPal API interactions for serverless environment
 */

import { PayPalAccessToken, PayPalCreateOrderRequest, PayPalOrder, PayPalWebhookEvent, PaymentException } from "./types/payment";
import { logger } from "./logging";
import crypto from "crypto";

const PAYPAL_API_BASE = process.env.PAYPAL_MODE === "live" ? "https://api.paypal.com" : "https://api.sandbox.paypal.com";

const requiredPayPalEnvVars = ["PAYPAL_CLIENT_ID", "PAYPAL_CLIENT_SECRET", "PAYPAL_WEBHOOK_ID"];

function validatePayPalEnv(): void {
  const missing = requiredPayPalEnvVars.filter((env) => !process.env[env]);
  if (missing.length > 0) {
    throw new PaymentException(
      `Missing PayPal environment variables: ${missing.join(", ")}`,
      "PAYPAL_CONFIG_ERROR",
      500
    );
  }
}

/**
 * Get PayPal Access Token
 * Caches token in memory with expiration
 */
interface TokenCache {
  token: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

export async function getPayPalAccessToken(): Promise<string> {
  try {
    // Return cached token if still valid
    if (tokenCache && tokenCache.expiresAt > Date.now()) {
      return tokenCache.token;
    }

    validatePayPalEnv();

    const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64");

    const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      const error = await response.text();
      throw new PaymentException(
        `Failed to get PayPal access token: ${error}`,
        "PAYPAL_TOKEN_ERROR",
        response.status
      );
    }

    const data: PayPalAccessToken = await response.json();

    // Cache token with 60 second buffer before expiration
    tokenCache = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in - 60) * 1000,
    };

    logger.debug("PayPal access token obtained", "paypal:auth");

    return data.access_token;
  } catch (error) {
    logger.error("Failed to get PayPal access token", error, "paypal:auth");
    throw error;
  }
}

/**
 * Create PayPal Order
 */
export async function createPayPalOrder(
  orderData: PayPalCreateOrderRequest,
  returnUrl: string,
  cancelUrl: string
): Promise<PayPalOrder> {
  try {
    validatePayPalEnv();
    const accessToken = await getPayPalAccessToken();

    // Add experience context to payment source
    const payload: PayPalCreateOrderRequest = {
      ...orderData,
      payment_source: {
        paypal: {
          experience_context: {
            return_url: returnUrl,
            cancel_url: cancelUrl,
            shipping_preference: "NO_SHIPPING",
            user_action: "PAY_NOW",
            locale: "en-US",
          },
        },
      },
    };

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      logger.error("PayPal order creation failed", JSON.stringify(error), "paypal:create-order", {
        statusCode: response.status,
        errorData: error,
      });
      throw new PaymentException(
        `Failed to create PayPal order: ${error.message || "Unknown error"}`,
        "PAYPAL_ORDER_CREATION_FAILED",
        response.status,
        error
      );
    }

    const order: PayPalOrder = await response.json();
    logger.info("PayPal order created successfully", "paypal:create-order", {
      orderId: order.id,
      status: order.status,
    });

    return order;
  } catch (error) {
    logger.error("Error creating PayPal order", error, "paypal:create-order");
    throw error;
  }
}

/**
 * Capture PayPal Order
 */
export async function capturePayPalOrder(orderIdRef: string): Promise<PayPalOrder> {
  try {
    validatePayPalEnv();
    const accessToken = await getPayPalAccessToken();

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderIdRef}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      logger.error("PayPal order capture failed", JSON.stringify(error), "paypal:capture-order", {
        orderIdRef,
        statusCode: response.status,
        errorData: error,
      });
      throw new PaymentException(
        `Failed to capture PayPal order: ${error.message || "Unknown error"}`,
        "PAYPAL_ORDER_CAPTURE_FAILED",
        response.status,
        error
      );
    }

    const order: PayPalOrder = await response.json();
    logger.info("PayPal order captured successfully", "paypal:capture-order", {
      orderId: order.id,
      status: order.status,
    });

    return order;
  } catch (error) {
    logger.error("Error capturing PayPal order", error, "paypal:capture-order", { orderIdRef });
    throw error;
  }
}

/**
 * Verify PayPal Webhook Signature
 * Implements PayPal webhook signature verification
 */
export async function verifyPayPalWebhookSignature(
  transmissionId: string,
  transmissionTime: string,
  certUrl: string,
  authAlgo: string,
  transmissionSig: string,
  webhookEvent: PayPalWebhookEvent
): Promise<boolean> {
  try {
    validatePayPalEnv();

    // Construct the expected signature
    const expectedSigString = `${transmissionId}|${transmissionTime}|${process.env.PAYPAL_WEBHOOK_ID}|${webhookEvent.id}`;

    // Fetch PayPal certificate
    const certResponse = await fetch(certUrl);
    if (!certResponse.ok) {
      throw new PaymentException("Failed to fetch PayPal certificate", "PAYPAL_CERT_FETCH_ERROR", 500);
    }
    const cert = await certResponse.text();

    // Verify signature
    const verifier = crypto.createVerify("RSA-SHA256");
    verifier.update(expectedSigString, "utf8");

    const isValid = verifier.verify(cert, transmissionSig, "base64");

    if (!isValid) {
      logger.warn("PayPal webhook signature verification failed", "paypal:webhook-verify", {
        webhookId: webhookEvent.id,
        transmissionId,
      });
    } else {
      logger.debug("PayPal webhook signature verified", "paypal:webhook-verify");
    }

    return isValid;
  } catch (error) {
    logger.error("Error verifying PayPal webhook signature", error, "paypal:webhook-verify");
    throw error;
  }
}

/**
 * Get transaction details from PayPal webhook
 */
export function extractPayPalTransactionData(event: PayPalWebhookEvent): Record<string, any> {
  const { resource, event_type, create_time } = event;

  return {
    transactionId: resource.id,
    status: resource.status,
    amount: resource.amount?.value,
    currency: resource.amount?.currency_code,
    payerEmail: resource.payer?.email_address,
    payerId: resource.payer?.id,
    orderId: resource.supplementary_data?.related_ids?.order_id,
    eventType: event_type,
    timestamp: create_time,
  };
}
