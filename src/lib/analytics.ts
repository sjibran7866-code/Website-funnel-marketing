type EventParams = Record<string, string | number | boolean>;

export function trackEvent(eventName: string, params?: EventParams) {
  // Google Analytics 4
  if (typeof window !== "undefined" && "gtag" in window) {
    (window as unknown as Record<string, Function>).gtag("event", eventName, params);
  }

  // Facebook Pixel
  if (typeof window !== "undefined" && "fbq" in window) {
    (window as unknown as Record<string, Function>).fbq("track", eventName, params);
  }

  // TikTok Pixel
  if (typeof window !== "undefined" && "ttq" in window) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).ttq.track(eventName, params);
  }
}

export function trackPageView(url: string) {
  if (typeof window !== "undefined" && "gtag" in window) {
    (window as unknown as Record<string, Function>).gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
}

export function trackLead(data: { value?: number; currency?: string }) {
  trackEvent("Lead", data);
}

export function trackPurchase(data: { value: number; currency: string; transactionId: string }) {
  trackEvent("Purchase", data);
}
