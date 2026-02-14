/**
 * PayPal Checkout Button Component
 * Handles PayPal payment flow
 */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export interface PayPalCheckoutButtonProps {
  amount: number;
  currency?: "USD" | "KES";
  orderId: string;
  description: string;
  customerEmail: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost";
  disabled?: boolean;
  metadata?: Record<string, any>;
}

export function PayPalCheckoutButton({
  amount,
  currency = "USD",
  orderId,
  description,
  customerEmail,
  onSuccess,
  onError,
  className,
  variant = "default",
  disabled = false,
  metadata,
}: PayPalCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Generate idempotency key for request
      const idempotencyKey = `${orderId}-${Date.now()}`;

      // Call our serverless API to create PayPal order
      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "idempotency-key": idempotencyKey,
        },
        body: JSON.stringify({
          amount,
          currency,
          orderId,
          description,
          customerEmail,
          metadata,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success || !data.data.approvalUrl) {
        throw new Error(data.error || "Failed to create PayPal order");
      }

      // Redirect to PayPal approval page
      window.location.href = data.data.approvalUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      onError?.(err);
      console.error("PayPal checkout error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handleClick}
        disabled={disabled || isLoading}
        variant={variant}
        className={className}
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <svg
              className="mr-2 h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9.012 0c-.927.024-1.772.204-2.541.603-.768.399-1.413.981-1.933 1.746-.52.765-.792 1.67-.792 2.715 0 .68.108 1.305.325 1.875.217.57.584 1.088 1.1 1.553.517.465 1.184.831 2 1.097.817.267 1.796.4 2.95.4h1.575v3.6c0 .48.108.9.325 1.26.217.36.542.636.975.828.433.192.992.288 1.675.288.733 0 1.346-.112 1.838-.336.492-.224.854-.571 1.087-1.041.233-.47.35-1.05.35-1.738V0h-6.384z" />
            </svg>
            Pay with PayPal
          </>
        )}
      </Button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default PayPalCheckoutButton;
