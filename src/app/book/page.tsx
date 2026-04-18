import type { Metadata } from "next";
import { getBooths, getAddOns } from "@/lib/content";
import BookingWizard from "./BookingWizard";

export const metadata: Metadata = {
  title: "Book Your Photo Booth",
  description:
    "Book a photo booth rental from Stay Golden. Choose from Classic, Glam, 360, Mirror, Mini, Enclosed, or Portrait Studio booths. Instant online booking with PayPal.",
};

export default function BookPage() {
  const booths = getBooths();
  const addOns = getAddOns();

  return (
    <>
      {/* Hero */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Book Your Photo Booth
          </h1>
          <p className="text-lg text-gray-600">
            Select your booth, choose your options, and secure your date in minutes.
          </p>
        </div>
      </section>

      {/* Booking wizard */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingWizard booths={booths} addOns={addOns} />
        </div>
      </section>
    </>
  );
}
