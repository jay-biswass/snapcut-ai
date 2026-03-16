// Razorpay Standard Checkout integration utility
// Docs: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number; // Amount in paise (₹1 = 100 paise)
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: RazorpayFailureResponse) => void) => void;
  close: () => void;
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface RazorpayFailureResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id?: string;
      payment_id?: string;
    };
  };
}

export interface CheckoutParams {
  planName: string;
  amount: number; // Amount in paise
  description: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  onSuccess?: (response: RazorpaySuccessResponse) => void;
  onFailure?: (response: RazorpayFailureResponse) => void;
  onDismiss?: () => void;
}

/**
 * Dynamically loads the Razorpay checkout.js script on demand.
 * Only loads once — subsequent calls resolve immediately.
 */
function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Already loaded
    if (typeof window.Razorpay !== "undefined") {
      resolve();
      return;
    }

    // Check if script tag already exists (loading in progress)
    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load Razorpay SDK")));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.head.appendChild(script);
  });
}

/**
 * Opens the Razorpay Standard Checkout popup.
 * Loads the Razorpay SDK on-demand (only when a payment button is clicked).
 *
 * @example
 * openRazorpayCheckout({
 *   planName: "Pro Monthly",
 *   amount: 49900, // ₹499 in paise
 *   description: "Pro Plan - Monthly Subscription",
 *   onSuccess: (res) => console.log("Payment ID:", res.razorpay_payment_id),
 * });
 */
export async function openRazorpayCheckout({
  planName,
  amount,
  description,
  prefill,
  onSuccess,
  onFailure,
  onDismiss,
}: CheckoutParams): Promise<void> {
  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const companyName = import.meta.env.VITE_RAZORPAY_COMPANY_NAME || "SnapCut AI";
  const themeColor = import.meta.env.VITE_RAZORPAY_THEME_COLOR || "#7c3aed";

  if (!keyId || keyId === "rzp_test_XXXXXXXXXXXX") {
    console.error(
      "Razorpay Key ID is not configured. Please set VITE_RAZORPAY_KEY_ID in your .env file."
    );
    alert(
      "Payment gateway is not configured yet. Please contact support."
    );
    return;
  }

  // Load Razorpay SDK on demand
  try {
    await loadRazorpayScript();
  } catch {
    alert("Payment service is temporarily unavailable. Please try again later.");
    return;
  }

  const options: RazorpayOptions = {
    key: keyId,
    amount,
    currency: "INR",
    name: companyName,
    description,
    handler: (response) => {
      console.log("Payment successful:", response);
      onSuccess?.(response);
    },
    prefill: prefill || {},
    notes: {
      plan: planName,
    },
    theme: {
      color: themeColor,
    },
    modal: {
      ondismiss: () => {
        console.log("Payment popup dismissed");
        onDismiss?.();
      },
    },
  };

  const razorpayInstance = new window.Razorpay(options);

  razorpayInstance.on("payment.failed", (response: RazorpayFailureResponse) => {
    console.error("Payment failed:", response.error);
    onFailure?.(response);
  });

  razorpayInstance.open();
}
