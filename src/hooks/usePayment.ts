/**
 * Payment Integration Hook
 * Manages payment state and operations
 */

"use client";

import { useState, useCallback } from "react";

export interface PaymentState {
  isLoading: boolean;
  error: string | null;
  status: "idle" | "processing" | "success" | "error";
  transactionId: string | null;
  data: any | null;
}

export function usePayment() {
  const [state, setState] = useState<PaymentState>({
    isLoading: false,
    error: null,
    status: "idle",
    transactionId: null,
    data: null,
  });

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      status: "idle",
      transactionId: null,
      data: null,
    });
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({
      ...prev,
      error,
      status: error ? "error" : prev.status,
    }));
  }, []);

  const setSuccess = useCallback((transactionId: string, data: any) => {
    setState({
      isLoading: false,
      error: null,
      status: "success",
      transactionId,
      data,
    });
  }, []);

  const createPayPalOrder = useCallback(
    async (orderData: {
      amount: number;
      currency: string;
      orderId: string;
      description: string;
      customerEmail: string;
      metadata?: Record<string, any>;
    }) => {
      setLoading(true);
      setError(null);

      try {
        const idempotencyKey = `${orderData.orderId}-${Date.now()}`;
        const response = await fetch("/api/paypal/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "idempotency-key": idempotencyKey,
          },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to create PayPal order");
        }

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.error);
        }

        setState((prev) => ({
          ...prev,
          isLoading: false,
          status: "processing",
          data: result.data,
        }));

        return result.data;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        setError(errorMessage);
        throw error;
      }
    },
    [setLoading, setError]
  );

  const capturePayPalOrder = useCallback(
    async (orderId: string) => {
      setLoading(true);
      setError(null);

      try {
        const idempotencyKey = `capture-${orderId}-${Date.now()}`;
        const response = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "idempotency-key": idempotencyKey,
          },
          body: JSON.stringify({ orderId }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to capture PayPal order");
        }

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.error);
        }

        setSuccess(orderId, result.data);
        return result.data;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        setError(errorMessage);
        throw error;
      }
    },
    [setLoading, setError, setSuccess]
  );

  const initiateMpesaPayment = useCallback(
    async (paymentData: {
      amount: number;
      phoneNumber: string;
      orderId: string;
      accountReference: string;
      transactionDesc: string;
      customerEmail: string;
      metadata?: Record<string, any>;
    }) => {
      setLoading(true);
      setError(null);

      try {
        const idempotencyKey = `${paymentData.orderId}-${Date.now()}`;
        const response = await fetch("/api/mpesa/stkpush", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "idempotency-key": idempotencyKey,
          },
          body: JSON.stringify(paymentData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to initiate M-Pesa payment");
        }

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.error);
        }

        setState((prev) => ({
          ...prev,
          isLoading: false,
          status: "processing",
          transactionId: result.data.checkoutRequestID,
          data: result.data,
        }));

        return result.data;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        setError(errorMessage);
        throw error;
      }
    },
    [setLoading, setError]
  );

  return {
    ...state,
    reset,
    createPayPalOrder,
    capturePayPalOrder,
    initiateMpesaPayment,
    setError,
    setLoading,
  };
}

export default usePayment;
