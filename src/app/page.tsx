import Hero from "@/components/home/Hero";
import StatsCounter from "@/components/home/StatsCounter";
import BoothShowcase from "@/components/home/BoothShowcase";
import TrustBadges from "@/components/home/TrustBadges";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import HomeFAQ from "@/components/home/HomeFAQ";
import CTASection from "@/components/home/CTASection";
import { getContent, getBooths, getTestimonials, getFAQs } from "@/lib/content";

export default function HomePage() {
  const content = getContent();
  const booths = getBooths();
  const testimonials = getTestimonials();
  const faqs = getFAQs();

  return (
    <>
      <Hero
        headline={content.homepage.heroHeadline}
        subheadline={content.homepage.heroSubheadline}
        ctaText={content.homepage.heroCtaText}
      />

      <StatsCounter stats={content.homepage.statsSection} />

      <BoothShowcase title={content.homepage.boothSectionTitle} booths={booths} />

      <TrustBadges />

      <TestimonialCarousel
        title={content.homepage.testimonialSectionTitle}
        testimonials={testimonials}
      />

      <HomeFAQ faqs={faqs} />

      <CTASection
        headline={content.homepage.ctaHeadline}
        subheadline={content.homepage.ctaSubheadline}
      />
    </>
  );
}
