import Button from "@/components/ui/Button";

type HeroProps = {
  headline: string;
  subheadline: string;
  ctaText: string;
};

export default function Hero({ headline, subheadline, ctaText }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-brand-dark" />
      <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <span className="inline-block px-4 py-1.5 bg-brand/20 border border-brand/30 text-brand-light rounded-full text-sm font-medium mb-6">
          Veteran-Owned &amp; Family-Operated
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          {headline}
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          {subheadline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/book" size="lg" variant="primary">
            {ctaText}
          </Button>
          <Button href="/contact" size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-foreground">
            Get a Free Quote
          </Button>
        </div>
        <p className="mt-8 text-white/50 text-sm">
          Trusted by 7,500+ clients across Southern California
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
