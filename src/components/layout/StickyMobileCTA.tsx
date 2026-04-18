"use client";

import Link from "next/link";

export default function StickyMobileCTA() {
  return (
    <div className="mobile-cta fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
      <div className="flex items-center">
        <a
          href="tel:6265139805"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-foreground font-semibold border-r border-gray-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          Call Us
        </a>
        <Link
          href="/book"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-brand text-white font-semibold"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
