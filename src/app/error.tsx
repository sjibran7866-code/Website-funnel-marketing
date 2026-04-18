"use client";

import Button from "@/components/ui/Button";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <section className="py-32 text-center">
      <div className="max-w-lg mx-auto px-4">
        <h1 className="text-8xl font-bold text-gray-300 mb-4">500</h1>
        <h2 className="text-2xl font-bold text-foreground mb-4">Something Went Wrong</h2>
        <p className="text-gray-600 mb-8">
          We hit an unexpected error. Please try again or contact us if the problem persists.
        </p>
        {error.digest && (
          <p className="text-xs text-gray-400 mb-4">Error reference: {error.digest}</p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={unstable_retry}
            className="bg-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark transition-colors cursor-pointer"
          >
            Try Again
          </button>
          <Button href="/" variant="outline">Go Home</Button>
          <Button href="/contact" variant="outline">Contact Us</Button>
        </div>
      </div>
    </section>
  );
}
