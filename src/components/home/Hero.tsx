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

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand/10 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-brand-light/5 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_1s]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <span className="hero-badge inline-block px-4 py-1.5 bg-brand/20 border border-brand/30 text-brand-light rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
          Veteran-Owned &amp; Family-Operated
        </span>
        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          {headline}
        </h1>
        <p className="hero-subtitle text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          {subheadline}
        </p>
        <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/book" size="lg" variant="primary" className="btn-animate btn-pulse">
            {ctaText}
          </Button>
          <Button href="/contact" size="lg" variant="outline" className="btn-animate border-white text-white hover:bg-white hover:text-foreground">
            Get a Free Quote
          </Button>
        </div>
        <p className="hero-trust mt-8 text-white/50 text-sm">
          Trusted by 7,500+ clients across Southern California
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
        <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
