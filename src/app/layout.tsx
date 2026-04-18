import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import PromoBanner from "@/components/funnel/PromoBanner";
import ExitIntentPopup from "@/components/funnel/ExitIntentPopup";
import AnalyticsScripts from "@/components/funnel/AnalyticsScripts";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Affordable Photo Booth Rental Los Angeles | Stay Golden Photo Booth",
    template: "%s | Stay Golden Photo Booth",
  },
  description:
    "Southern California's most trusted photo booth rental company. 7,500+ clients served. Classic, Glam, 360, Mirror & Mini booths for weddings, parties, and corporate events.",
  keywords: [
    "photo booth rental",
    "Los Angeles photo booth",
    "wedding photo booth",
    "360 photo booth",
    "photo booth rental near me",
    "affordable photo booth",
    "Southern California photo booth",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Stay Golden Photo Booth",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <AnalyticsScripts />
        <PromoBanner />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyMobileCTA />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
