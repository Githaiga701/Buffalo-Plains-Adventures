"use client";

import React from "react";

type PaymentOptionsProps = {
  amount: number;
  packageName: string;
};

const formatAmount = (a: number) => {
  return a % 1 === 0 ? a.toString() : a.toFixed(2);
};

const PayPalIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true" {...props}>
    <rect x="2" y="3" width="14" height="18" rx="3" fill="#003087" />
    <path d="M7 7h6l-1 7H7z" fill="#009cde" />
    <path d="M9 8h6" stroke="#fff" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MPesaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="10" fill="#0b3d2e" />
    <path d="M8 16l4-8 4 8" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12h6" stroke="#ffd166" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function PaymentOptions({ amount, packageName }: PaymentOptionsProps) {
  const formatted = formatAmount(amount);

  // Vite environment variables - use VITE_ prefix for client-side env vars
  const paypalMe = import.meta.env.VITE_PAYPAL_ME ?? "";
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER ?? "";
  const mpesaInstructionsPath = import.meta.env.VITE_MPESA_INSTRUCTIONS_PATH ?? "";
  const stripeCheckout = import.meta.env.VITE_STRIPE_CHECKOUT ?? "";

  const paypalUrl = paypalMe
    ? paypalMe.endsWith("/")
      ? `${paypalMe}${formatted}`
      : `${paypalMe}/${formatted}`
    : `https://www.paypal.com/checkoutnow?amount=${encodeURIComponent(formatted)}`;

  const whatsappMessage = `Hello, I would like to pay ${formatted} USD for "${packageName}". Please advise on M-Pesa payment details.`;
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}` : "";

  function handleMpesaClick() {
    if (mpesaInstructionsPath) {
      const url = `${mpesaInstructionsPath}${mpesaInstructionsPath.includes("?") ? "&" : "?"}amount=${encodeURIComponent(
        formatted,
      )}&package=${encodeURIComponent(packageName)}`;
      window.location.href = url;
      return;
    }

    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      return;
    }

    const fallback = `Pay ${formatted} for "${packageName}". Please contact us for M-Pesa details.`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fallback).then(
        () => {
          alert("Payment instructions copied to clipboard. Please contact us to complete the payment.");
        },
        () => {
          alert("Please contact the site owner for M-Pesa details.");
        },
      );
    } else {
      alert("Please contact the site owner for M-Pesa details.");
    }
  }

  return (
    <div aria-label="Payment options" className="w-full max-w-xl mx-auto">
      <p className="text-sm text-muted-foreground mb-3">Pay securely</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* PayPal */}
        <a
          href={paypalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-gradient-to-br from-white/60 to-white/30 border border-gray-200 shadow-sm hover:shadow-md transform transition duration-150 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
          aria-label={`Pay ${formatted} USD with PayPal for ${packageName}`}
        >
          <div className="flex items-center gap-2">
            <PayPalIcon />
            <div className="text-left">
              <div className="text-sm font-medium">PayPal</div>
              <div className="text-xs text-muted-foreground">${formatted} · Secure</div>
            </div>
          </div>
        </a>

        {/* M-Pesa */}
        <button
          type="button"
          onClick={handleMpesaClick}
          className="flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-emerald-700 text-white shadow-sm hover:shadow-md transform transition duration-150 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-300"
          aria-label={`Pay ${formatted} USD with M-Pesa for ${packageName}`}
        >
          <div className="flex items-center gap-2">
            <MPesaIcon />
            <div className="text-left">
              <div className="text-sm font-medium">M-Pesa</div>
              <div className="text-xs opacity-90">Mobile Money</div>
            </div>
          </div>
        </button>

        {/* Stripe placeholder */}
        {stripeCheckout ? (
          <a
            href={stripeCheckout}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 shadow-sm hover:shadow-md transform transition duration-150 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400"
            aria-label={`Continue to Stripe checkout for ${packageName} ${formatted}`}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
              <path d="M4 12h16" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="text-left">
              <div className="text-sm font-medium">Stripe</div>
              <div className="text-xs text-muted-foreground">Card payments</div>
            </div>
          </a>
        ) : (
          <button
            type="button"
            disabled
            aria-disabled
            className="flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed"
            aria-label="Stripe checkout coming soon"
            title="Stripe integration coming soon"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
              <path d="M4 12h16" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="text-left">
              <div className="text-sm font-medium">Stripe</div>
              <div className="text-xs">Coming soon</div>
            </div>
          </button>
        )}
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        By continuing you agree to the <a className="underline" href="/terms">terms</a>.
      </p>
    </div>
  );
}
