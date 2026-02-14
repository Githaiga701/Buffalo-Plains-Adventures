/**
 * M-Pesa (Daraja) Integration Utility
 * Handles Safaricom M-Pesa STK Push and callback processing
 */

import { MpesaAccessToken, MpesaStkPushRequest, MpesaStkPushResponse, MpesaCallback, MpesaCallbackMetadata, PaymentException } from "./types/payment";
import { logger } from "./logging";
import crypto from "crypto";

const MPESA_API_BASE = "https://api.safaricom.co.ke";

const requiredMpesaEnvVars = ["MPESA_CONSUMER_KEY", "MPESA_CONSUMER_SECRET", "MPESA_SHORTCODE", "MPESA_PASSKEY"];

function validateMpesaEnv(): void {
  const missing = requiredMpesaEnvVars.filter((env) => !process.env[env]);
  if (missing.length > 0) {
    throw new PaymentException(
      `Missing M-Pesa environment variables: ${missing.join(", ")}`,
      "MPESA_CONFIG_ERROR",
      500
    );
  }
}

/**
 * Get M-Pesa Access Token
 * OAuth2 token for M-Pesa API requests
 */
interface TokenCache {
  token: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

export async function getMpesaAccessToken(): Promise<string> {
  try {
    // Return cached token if still valid
    if (tokenCache && tokenCache.expiresAt > Date.now()) {
      return tokenCache.token;
    }

    validateMpesaEnv();

    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString("base64");

    const response = await fetch(`${MPESA_API_BASE}/oauth/v1/generate?grant_type=client_credentials`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new PaymentException(
        `Failed to get M-Pesa access token: ${error}`,
        "MPESA_TOKEN_ERROR",
        response.status
      );
    }

    const data: MpesaAccessToken = await response.json();

    // Cache token with 60 second buffer before expiration
    tokenCache = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in - 60) * 1000,
    };

    logger.debug("M-Pesa access token obtained", "mpesa:auth");

    return data.access_token;
  } catch (error) {
    logger.error("Failed to get M-Pesa access token", error, "mpesa:auth");
    throw error;
  }
}

/**
 * Format phone number to international format
 * Converts various Kenya phone formats to 254xxxxxxxxx
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digits
  let cleaned = phoneNumber.replace(/\D/g, "");

  // Handle various formats
  if (cleaned.startsWith("254")) {
    // Already in international format
    return cleaned;
  } else if (cleaned.startsWith("0")) {
    // Local format: 0712345678 -> 254712345678
    return "254" + cleaned.substring(1);
  } else if (cleaned.length === 9) {
    // Without country code or leading 0: 712345678 -> 254712345678
    return "254" + cleaned;
  } else if (cleaned.length === 10) {
    // With leading 0: 0712345678 -> 254712345678 (should be caught above)
    return "254" + cleaned.substring(1);
  }

  throw new PaymentException("Invalid phone number format", "INVALID_PHONE_FORMAT", 400, { phoneNumber });
}

/**
 * Generate M-Pesa password
 * Required for STK Push authentication
 */
export function generateMpesaPassword(shortCode: string, passkey: string): { password: string; timestamp: string } {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -3);
  const data = shortCode + passkey + timestamp;
  const password = Buffer.from(data).toString("base64");

  return { password, timestamp };
}

/**
 * Initiate M-Pesa STK Push
 */
export async function initiateMpesaStkPush(
  phoneNumber: string,
  amount: number,
  accountReference: string,
  transactionDesc: string,
  callbackUrl: string
): Promise<MpesaStkPushResponse> {
  try {
    validateMpesaEnv();
    const accessToken = await getMpesaAccessToken();

    const formattedPhone = formatPhoneNumber(phoneNumber);
    const shortCode = process.env.MPESA_SHORTCODE!;
    const passkey = process.env.MPESA_PASSKEY!;

    const { password, timestamp } = generateMpesaPassword(shortCode, passkey);

    const payload: MpesaStkPushRequest = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.floor(amount).toString(),
      PartyA: formattedPhone,
      PartyB: shortCode,
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: accountReference.substring(0, 13), // M-Pesa limit
      TransactionDesc: transactionDesc.substring(0, 13), // M-Pesa limit
    };

    const response = await fetch(`${MPESA_API_BASE}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      logger.error("M-Pesa STK Push failed", JSON.stringify(error), "mpesa:stkpush", {
        statusCode: response.status,
        phoneNumber: formattedPhone,
        errorData: error,
      });
      throw new PaymentException(
        `Failed to initiate M-Pesa STK Push: ${error.errorMessage || error.message || "Unknown error"}`,
        "MPESA_STKPUSH_FAILED",
        response.status,
        error
      );
    }

    const data: MpesaStkPushResponse = await response.json();

    if (data.ResponseCode !== "0") {
      logger.warn("M-Pesa STK Push returned non-zero code", "mpesa:stkpush", {
        responseCode: data.ResponseCode,
        responseDescription: data.ResponseDescription,
        checkoutRequestID: data.CheckoutRequestID,
      });
    }

    logger.info("M-Pesa STK Push initiated successfully", "mpesa:stkpush", {
      checkoutRequestID: data.CheckoutRequestID,
      phoneNumber: formattedPhone,
      amount,
    });

    return data;
  } catch (error) {
    logger.error("Error initiating M-Pesa STK Push", error, "mpesa:stkpush");
    throw error;
  }
}

/**
 * Parse M-Pesa callback
 * Extracts transaction metadata from callback
 */
export function parseMpesaCallback(callbackData: MpesaCallback): { success: boolean; metadata?: MpesaCallbackMetadata; message: string } {
  try {
    const { stkCallback } = callbackData.Body;
    const { ResultCode, ResultDesc, CheckoutRequestID, MerchantRequestID, CallbackMetadata } = stkCallback;

    // ResultCode 0 = success
    if (ResultCode !== 0) {
      return {
        success: false,
        message: ResultDesc,
      };
    }

    if (!CallbackMetadata || !CallbackMetadata.Item) {
      return {
        success: false,
        message: "No callback metadata received",
      };
    }

    // Parse metadata items
    const metadata: Record<string, any> = {};
    CallbackMetadata.Item.forEach((item) => {
      metadata[item.Name] = item.Value;
    });

    const callbackMetadata: MpesaCallbackMetadata = {
      amount: Number(metadata.Amount) || 0,
      mpesaReceiptNumber: metadata.MpesaReceiptNumber || "",
      transactionDate: metadata.TransactionDate?.toString() || "",
      phoneNumber: metadata.PhoneNumber?.toString() || "",
      checkoutRequestID: CheckoutRequestID,
      merchantRequestID: MerchantRequestID,
    };

    return {
      success: true,
      metadata: callbackMetadata,
      message: "Transaction completed successfully",
    };
  } catch (error) {
    logger.error("Error parsing M-Pesa callback", error, "mpesa:callback");
    return {
      success: false,
      message: "Failed to parse callback data",
    };
  }
}

/**
 * Validate M-Pesa callback signature
 * Note: M-Pesa doesn't use signature validation like PayPal
 * This is a placeholder for potential future validation
 */
export function validateMpesaCallbackOrigin(body: string, signature?: string): boolean {
  // In production, implement IP whitelisting for M-Pesa callbacks
  // M-Pesa callbacks come from Safaricom servers only
  // Optional: Calculate HMAC-SHA256 if signature is provided
  if (signature) {
    const hmac = crypto.createHmac("sha256", process.env.MPESA_CONSUMER_SECRET || "");
    const calculated = hmac.update(body).digest("base64");
    return calculated === signature;
  }

  // If no signature validation, trust Safaricom IP whitelist
  // This should be handled at infrastructure level (firewall/API gateway)
  return true;
}

/**
 * Check M-Pesa transaction status
 * Can be used to verify transaction before processing callback
 */
export async function checkMpesaTransactionStatus(checkoutRequestId: string): Promise<{ success: boolean; status: string; metadata?: Record<string, any> }> {
  try {
    validateMpesaEnv();
    const accessToken = await getMpesaAccessToken();

    const shortCode = process.env.MPESA_SHORTCODE!;
    const passkey = process.env.MPESA_PASSKEY!;

    const { password, timestamp } = generateMpesaPassword(shortCode, passkey);

    const payload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    };

    const response = await fetch(`${MPESA_API_BASE}/mpesa/stkpushquery/v1/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new PaymentException(
        `Failed to check transaction status: ${error.message || "Unknown error"}`,
        "MPESA_STATUS_CHECK_FAILED",
        response.status,
        error
      );
    }

    const data = await response.json();

    return {
      success: data.ResponseCode === "0",
      status: data.ResponseDescription || "Unknown",
      metadata: data,
    };
  } catch (error) {
    logger.error("Error checking M-Pesa transaction status", error, "mpesa:status-check", { checkoutRequestId });
    throw error;
  }
}
