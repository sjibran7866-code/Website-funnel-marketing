import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Stay Golden Photo Booth — a veteran-owned, family-operated photo booth rental company serving Southern California since 2017.",
};

const timeline = [
  { year: "2017", event: "Founded by Thomas & Roxanne Praxedes during wedding planning" },
  { year: "2018", event: "Expanded fleet to include Glam Cam and 360 Video Booth" },
  { year: "2019", event: "Reached 1,000+ events served across Southern California" },
  { year: "2020", event: "Added contactless digital sharing and Mini Booth options" },
  { year: "2022", event: "Surpassed 5,000 clients and 500+ five-star Google reviews" },
  { year: "2024", event: "Launched Portrait Studio and expanded to San Diego & Inland Empire" },
  { year: "2026", event: "7,500+ clients served and growing every day" },
];

export default function AboutPage() {
  const content = getContent();

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-brand/10 text-brand rounded-full text-sm font-medium mb-6">
            Veteran-Owned &amp; Family-Operated
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {content.about.headline}
          </h1>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg className="w-20 h-20 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm">Founder photo placeholder</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Meet the Founders</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {content.about.founderStory}
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                {content.about.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Values" subtitle="What drives us every single day." />
          <div className="grid sm:grid-cols-2 gap-6">
            {content.about.values.map((value, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm">
                <div className="shrink-0 w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <p className="text-foreground font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Journey" subtitle="From a wedding side-hustle to Southern California's most trusted photo booth company." />
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={item.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {item.year}
                  </div>
                  {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 my-2" />}
                </div>
                <div className="pb-8 pt-3">
                  <p className="text-foreground">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let&apos;s Make Your Event Golden</h2>
          <p className="text-white/80 text-lg mb-8">
            Join 7,500+ happy clients. Book your photo booth today!
          </p>
          <Button href="/book" size="lg" className="bg-white text-brand hover:bg-gray-100">
            Book Now
          </Button>
        </div>
      </section>
    </>
  );
}
