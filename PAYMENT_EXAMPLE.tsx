/**
 * Example: Payment Selection Page
 * Shows how to integrate payment components
 * 
 * Path: src/pages/PaymentExample.tsx
 */

"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./src/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./src/components/ui/tabs";
import { Alert, AlertDescription } from "./src/components/ui/alert";
import { PayPalCheckoutButton } from "./src/components/PayPalCheckoutButton";
import { MpesaPaymentForm } from "./src/components/MpesaPaymentForm";
import { usePayment } from "./src/hooks/usePayment";
import { formatCurrency } from "./src/lib/payment-utils";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

interface Package {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
}

const EXAMPLE_PACKAGE: Package = {
  id: "safari-001",
  name: "3-Day Kenya Safari",
  description: "Experience the magic of Kenya's wildlife",
  priceUSD: 750,
};

type PaymentStatus = "idle" | "selecting" | "processing" | "success" | "error";

export function PaymentExample() {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("selecting");
  const [selectedMethod, setSelectedMethod] = useState<"paypal" | "mpesa" | null>(null);
  const payment = usePayment();

  const priceKES = EXAMPLE_PACKAGE.priceUSD * 130; // Mock conversion
  const orderId = `order-${Date.now()}-${Math.random().toString(36).substring(7)}`;
  const customerEmail = "customer@example.com"; // In real app, get from user

  const handlePaymentSuccess = (data: any) => {
    setPaymentStatus("success");
    console.log("Payment initiated successfully:", data);

    // In a real app:
    // 1. Save order to database
    // 2. Send confirmation email
    // 3. Redirect to booking details page
  };

  const handlePaymentError = (error: any) => {
    setPaymentStatus("error");
    console.error("Payment failed:", error);

    // In a real app:
    // Show error notification to user
    // Allow retry
  };

  return (
    <div className="space-y-8 p-8">
      {/* Package Summary */}
      <Card>
        <CardHeader>
          <CardTitle>{EXAMPLE_PACKAGE.name}</CardTitle>
          <CardDescription>{EXAMPLE_PACKAGE.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {EXAMPLE_PACKAGE.name} - Booking Confirmation
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      {paymentStatus === "selecting" && (
        <Card>
          <CardHeader>
            <CardTitle>Select Payment Method</CardTitle>
            <CardDescription>Choose how you'd like to pay for your booking</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedMethod || ""} onValueChange={(v: string) => setSelectedMethod(v as "paypal" | "mpesa")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
                <TabsTrigger value="mpesa">M-Pesa</TabsTrigger>
              </TabsList>

              {/* PayPal Tab */}
              <TabsContent value="paypal" className="space-y-4" key="paypal">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Secure payment via PayPal. Pay with your PayPal account or credit card.
                  </p>

                  <PayPalCheckoutButton
                    amount={EXAMPLE_PACKAGE.priceUSD}
                    currency="USD"
                    orderId={orderId}
                    description={EXAMPLE_PACKAGE.name}
                    customerEmail={customerEmail}
                    metadata={{
                      packageId: EXAMPLE_PACKAGE.id,
                      packageName: EXAMPLE_PACKAGE.name,
                    }}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />

                  <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                    <p>
                      You'll be redirected to PayPal to complete your payment securely.
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* M-Pesa Tab */}
              <TabsContent value="mpesa" className="space-y-4">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Pay using M-Pesa. A prompt will appear on your phone asking for your PIN.
                  </p>

                  <MpesaPaymentForm
                    amount={priceKES}
                    orderId={orderId}
                    accountReference={EXAMPLE_PACKAGE.id}
                    transactionDesc="Safari Booking"
                    customerEmail={customerEmail}
                    metadata={{
                      packageId: EXAMPLE_PACKAGE.id,
                      packageName: EXAMPLE_PACKAGE.name,
                    }}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />

                  <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
                    <p>
                      Works with all Safaricom numbers. Charges apply per M-Pesa rates.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Success State */}
      {paymentStatus === "success" && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <h3 className="text-lg font-semibold text-green-900">Payment Initiated!</h3>
              </div>

              <p className="text-sm text-green-800">
                {selectedMethod === "paypal" ? (
                  <>
                    Your PayPal payment has been captured. You'll receive a confirmation
                    email shortly.
                  </>
                ) : (
                  <>
                    Your M-Pesa payment is being processed. Please complete the
                    transaction on your phone. You'll receive an SMS confirmation once paid.
                  </>
                )}
              </p>

              <div className="space-y-2 rounded-lg bg-white p-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Order ID:</span>
                  <span className="font-mono text-sm font-medium">{orderId}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setPaymentStatus("selecting");
                  setSelectedMethod(null);
                }}
                className="w-full rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Complete Booking
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {paymentStatus === "error" && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            There was an error processing your payment. Please try again or contact support.
          </AlertDescription>
        </Alert>
      )}

      {/* Test Credentials */}
      <Card>
        <CardHeader>
          <CardTitle>Test Credentials (Development Only)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm">PayPal Sandbox</h4>
            <p className="text-xs text-gray-600 mt-1">
              Use your sandbox buyer account or test credit cards
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm">M-Pesa Test</h4>
            <p className="text-xs text-gray-600 mt-1">
              Short Code: 174379 | Phone: 254708374149
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentExample;
