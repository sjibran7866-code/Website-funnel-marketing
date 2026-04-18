"use client";

import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

type PayPalCheckoutProps = {
  amount: number;
  description: string;
};

export default function PayPalCheckout({ amount, description }: PayPalCheckoutProps) {
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId || clientId === "your_paypal_client_id") {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
        <p className="text-yellow-800 font-medium">PayPal is not configured yet.</p>
        <p className="text-yellow-700 text-sm mt-2">
          Add your PayPal Client ID to <code className="bg-yellow-100 px-1 rounded">.env.local</code> to enable payments.
        </p>
        <p className="text-yellow-600 text-xs mt-2">
          Total: ${amount} for {description}
        </p>
      </div>
    );
  }

  if (paymentStatus === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Booking Confirmed!</h3>
        <p className="text-green-700">Thank you for your payment. We&apos;ll send a confirmation email shortly.</p>
        <p className="text-green-600 text-sm mt-2">
          Questions? Call us at (626) 513-9805
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Pay with PayPal</h3>

      {paymentStatus === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          Payment failed. Please try again or contact us at (626) 513-9805.
        </div>
      )}

      <PayPalScriptProvider options={{ clientId, currency: "USD" }}>
        <PayPalButtons
          style={{ layout: "vertical", shape: "rect", label: "pay" }}
          createOrder={async () => {
            setPaymentStatus("processing");
            const res = await fetch("/api/payment/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ amount, description }),
            });
            const data = await res.json();
            return data.id;
          }}
          onApprove={async (data) => {
            const res = await fetch("/api/payment/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: data.orderID }),
            });
            const details = await res.json();
            if (details.status === "COMPLETED") {
              setPaymentStatus("success");
            } else {
              setPaymentStatus("error");
            }
          }}
          onError={() => {
            setPaymentStatus("error");
          }}
          onCancel={() => {
            setPaymentStatus("idle");
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
