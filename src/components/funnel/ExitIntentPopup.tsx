"use client";

import { useState, useEffect } from "react";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("exitPopupDismissed");
    if (dismissed) return;

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) {
        setShow(true);
        document.removeEventListener("mouseout", handleMouseLeave);
      }
    }

    // Delay listener so it doesn't fire immediately
    const timer = setTimeout(() => {
      document.addEventListener("mouseout", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  function dismiss() {
    setShow(false);
    sessionStorage.setItem("exitPopupDismissed", "true");
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="popup-backdrop absolute inset-0 bg-black/50" onClick={dismiss} />

      {/* Modal */}
      <div className="popup-content relative bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 text-brand mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Wait! Don&apos;t go yet!</h3>
          <p className="text-gray-600 mb-6">
            Get <span className="text-brand font-bold">10% off</span> your first photo booth rental.
            Enter your email and we&apos;ll send you a special discount code!
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              dismiss();
            }}
            className="space-y-3"
          >
            <input
              type="email"
              placeholder="Your email address"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-brand text-white py-3 rounded-lg font-semibold hover:bg-brand-dark transition-colors cursor-pointer"
            >
              Get My 10% Discount
            </button>
          </form>

          <button onClick={dismiss} className="mt-4 text-sm text-gray-400 hover:text-gray-600 cursor-pointer">
            No thanks, I&apos;ll pay full price
          </button>
        </div>
      </div>
    </div>
  );
}
