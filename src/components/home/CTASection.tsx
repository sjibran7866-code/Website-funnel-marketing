import Button from "@/components/ui/Button";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

type CTASectionProps = {
  headline: string;
  subheadline: string;
};

export default function CTASection({ headline, subheadline }: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-dark via-brand to-brand-light relative overflow-hidden">
      {/* Animated decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-[float_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 animate-[float_10s_ease-in-out_infinite_2s]" />
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-white/5 rounded-full animate-[float_6s_ease-in-out_infinite_1s]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <AnimateOnScroll animation="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {headline}
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-up" delay={100}>
          <p className="text-lg text-white/80 mb-10 leading-relaxed">{subheadline}</p>
        </AnimateOnScroll>
        <AnimateOnScroll animation="zoom-in" delay={200}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/book" size="lg" className="btn-animate bg-white text-brand hover:bg-gray-100 hover:shadow-xl">
              Book Your Booth
            </Button>
            <a
              href="tel:6265139805"
              className="inline-flex items-center gap-2 text-white font-semibold text-lg hover:underline group"
            >
              <svg className="w-5 h-5 group-hover:animate-[pulse-glow_1.5s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call (626) 513-9805
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
