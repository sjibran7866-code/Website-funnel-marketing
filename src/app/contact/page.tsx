import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Stay Golden Photo Booth. Call (626) 513-9805 or fill out our contact form for a free quote on photo booth rentals in Southern California.",
};

export default function ContactPage() {
  const content = getContent();

  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {content.contact.headline}
          </h1>
          <p className="text-lg text-gray-600">{content.contact.subheadline}</p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Contact Information</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="tel:6265139805" className="flex items-start gap-3 text-gray-600 hover:text-brand transition-colors">
                      <svg className="w-5 h-5 mt-0.5 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-foreground">{content.contact.phone}</p>
                        <p className="text-sm">Tap to call</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${content.contact.email}`} className="flex items-start gap-3 text-gray-600 hover:text-brand transition-colors">
                      <svg className="w-5 h-5 mt-0.5 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-foreground">{content.contact.email}</p>
                        <p className="text-sm">We respond within 24 hours</p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <svg className="w-5 h-5 mt-0.5 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-foreground">{content.contact.address}</p>
                      <p className="text-sm">Serving all of Southern California</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600">
                    <svg className="w-5 h-5 mt-0.5 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-foreground">{content.contact.hours}</p>
                      <p className="text-sm">Available 7 days a week</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Social links */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {[
                    { name: "Instagram", href: "https://instagram.com/staygoldenphotobooth" },
                    { name: "Facebook", href: "https://facebook.com/StayGoldenPhotoBooth" },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:text-brand hover:border-brand transition-colors"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="aspect-[4/3] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p className="text-sm">Google Maps embed</p>
                  <p className="text-xs mt-1">Add your Google Maps API key</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
