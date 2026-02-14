/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYPAL_ME?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_MPESA_INSTRUCTIONS_PATH?: string;
  readonly VITE_STRIPE_CHECKOUT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
