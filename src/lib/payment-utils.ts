/**
 * Payment Utilities
 * Helper functions for payment operations
 */

/**
 * Format currency amount for display
 */
export function formatCurrency(amount: number, currency: "USD" | "KES" = "USD"): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
}

/**
 * Format currency for API payload
 * Convert to 2 decimal places as string
 */
export function formatCurrencyForApi(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  return rounded.toFixed(2);
}

/**
 * Format phone number for display
 * 254712345678 -> +254 712 345 678
 */
export function formatPhoneNumberDisplay(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("254")) {
    const number = cleaned.slice(3);
    return `+254 ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
  } else if (cleaned.startsWith("0")) {
    return `0${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }

  return phone;
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Kenyan phone number
 * Accepts: 0712345678, +254712345678, 254712345678
 */
export function isValidKenyanPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");

  // Must be 10 digits (without country code) or 12 digits (with 254)
  if (cleaned.length === 10) {
    // 0712345678 format
    return /^0[7-9]\d{8}$/.test(phone.replace(/\D/g, "0" + cleaned));
  } else if (cleaned.length === 12) {
    // 254712345678 format
    return /^254[7-9]\d{8}$/.test(cleaned);
  }

  return false;
}

/**
 * Generate reference ID
 * Useful for linking orders to payments
 */
export function generateReferenceId(prefix: string = "REF"): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`.toUpperCase();
}

/**
 * Generate idempotency key
 * Ensures idempotent API requests
 */
export function generateIdempotencyKey(orderId: string): string {
  return `${orderId}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Retry API call with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelayMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (i < maxRetries - 1) {
        const delayMs = initialDelayMs * Math.pow(2, i);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError || new Error("Failed after retries");
}

/**
 * Parse error from API response
 */
export function parseApiError(response: any): { message: string; code: string; details?: any } {
  return {
    message: response.error || response.message || "Unknown error",
    code: response.code || "UNKNOWN_ERROR",
    details: response.details,
  };
}

/**
 * Mask sensitive data for logging
 */
export function maskSensitiveData(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length < 4) return phone;

  return cleaned.slice(0, -4).replace(/\d/g, "*") + cleaned.slice(-4);
}

/**
 * Get payment method display name
 */
export function getPaymentMethodName(method: "paypal" | "mpesa"): string {
  const names: Record<string, string> = {
    paypal: "PayPal",
    mpesa: "M-Pesa",
  };

  return names[method] || method;
}

/**
 * Calculate service fee
 * Typically 2.9% + fixed amount for PayPal, 0.99 + 0.08% for M-Pesa
 */
export function calculateServiceFee(amount: number, method: "paypal" | "mpesa"): number {
  if (method === "paypal") {
    // PayPal: 2.9% + $0.30
    return amount * 0.029 + 0.3;
  } else if (method === "mpesa") {
    // M-Pesa: 0.99 + 0.08%
    return 0.99 + amount * 0.0008;
  }

  return 0;
}

/**
 * Format transaction date
 */
export function formatTransactionDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(d);
}

/**
 * Get payment status color
 */
export function getPaymentStatusColor(status: string): "red" | "yellow" | "green" | "blue" | "gray" {
  const colors: Record<string, any> = {
    completed: "green",
    pending: "yellow",
    failed: "red",
    cancelled: "red",
    processing: "blue",
    unknown: "gray",
  };

  return colors[status] || "gray";
}

/**
 * Convert between currencies (mock - use real exchange rate API in production)
 */
export function convertCurrency(
  amount: number,
  from: "USD" | "KES",
  to: "USD" | "KES",
  exchangeRate: number = 130
): number {
  if (from === to) return amount;

  if (from === "USD" && to === "KES") {
    return amount * exchangeRate;
  } else if (from === "KES" && to === "USD") {
    return amount / exchangeRate;
  }

  return amount;
}

/**
 * Validate amount is reasonable
 */
export function isValidPaymentAmount(amount: number, min: number = 1, max: number = 1000000): boolean {
  return !isNaN(amount) && amount >= min && amount <= max && Number.isFinite(amount);
}
