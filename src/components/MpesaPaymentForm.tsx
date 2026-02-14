/**
 * M-Pesa Payment Form Component
 * Handles M-Pesa STK Push payment flow
 */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Phone, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export interface MpesaPaymentFormProps {
  amount: number;
  orderId: string;
  accountReference: string;
  transactionDesc: string;
  customerEmail: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  className?: string;
  metadata?: Record<string, any>;
}

type PaymentStatus = "idle" | "loading" | "success" | "error" | "pending";

export function MpesaPaymentForm({
  amount,
  orderId,
  accountReference,
  transactionDesc,
  customerEmail,
  onSuccess,
  onError,
  className,
  metadata,
}: MpesaPaymentFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [checkoutRequestID, setCheckoutRequestID] = useState<string | null>(null);

  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, "");

    // Format as user types
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return cleaned.slice(0, 3) + " " + cleaned.slice(3);
    } else {
      return cleaned.slice(0, 3) + " " + cleaned.slice(3, 6) + " " + cleaned.slice(6, 9);
    }
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, "");
    // Kenya phone: +254 or 0 followed by 7 and 8 more digits
    return /^(?:\+254|0)?7\d{8}$/.test(cleaned) || /^254\d{9}$/.test(cleaned);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Please enter a valid Kenyan phone number");
      return;
    }

    setStatus("loading");

    try {
      // Generate idempotency key
      const idempotencyKey = `${orderId}-${Date.now()}`;

      // Call M-Pesa STK Push API
      const response = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "idempotency-key": idempotencyKey,
        },
        body: JSON.stringify({
          amount,
          phoneNumber,
          orderId,
          accountReference,
          transactionDesc,
          customerEmail,
          metadata,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to initiate payment");
      }

      // Store checkout request ID for status checking
      setCheckoutRequestID(data.data.checkoutRequestID);

      setStatus("pending");
      setSuccessMessage(
        `STK Push sent to ${data.data.phoneNumber}. Check your phone and enter your M-Pesa PIN.`
      );

      // Call success callback
      onSuccess?.(data.data);

      // Auto-reset after 30 seconds
      setTimeout(() => {
        if (status === "pending") {
          setStatus("idle");
          setPhoneNumber("");
        }
      }, 30000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      setStatus("error");
      onError?.(err);
      console.error("M-Pesa payment error:", err);
    }
  };

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isPending = status === "pending";
  const isError = status === "error";

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className || ""}`}>
      {/* Phone Number Input */}
      <div className="space-y-2">
        <Label htmlFor="phone-number">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="phone-number"
            type="tel"
            placeholder="0712 345 678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
            disabled={isLoading || isPending}
            className="pl-10"
            maxLength={13}
          />
        </div>
        <p className="text-xs text-gray-500">
          Enter your Kenyan phone number starting with 0 or +254
        </p>
      </div>

      {/* Amount Display */}
      <div className="rounded-lg bg-gray-50 p-3">
        <p className="text-sm text-gray-600">Amount to pay</p>
        <p className="text-2xl font-bold text-gray-900">KES {amount.toLocaleString()}</p>
      </div>

      {/* Error Alert */}
      {isError && error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Success Alert */}
      {isPending && successMessage && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
        </Alert>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading || isPending || !validatePhoneNumber(phoneNumber)}
        className="w-full"
        size="lg"
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isPending && <CheckCircle className="mr-2 h-4 w-4" />}
        {isLoading ? "Processing..." : isPending ? "Payment Pending..." : "Pay with M-Pesa"}
      </Button>

      {/* Info Text */}
      {!isLoading && !isPending && (
        <p className="text-xs text-gray-500 text-center">
          A prompt will appear on your phone. Enter your M-Pesa PIN to complete the payment.
        </p>
      )}
    </form>
  );
}

export default MpesaPaymentForm;
