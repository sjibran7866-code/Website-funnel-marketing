"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Button from "@/components/ui/Button";

type HeroProps = {
  headline: string;
  subheadline: string;
  ctaText: string;
};

// Deterministic particle config — generated once, stable across renders
const PARTICLES = [
  { id: 0, size: 4,  x: "15%",  y: "70%", dx: "50px",  dy: "-130px", dur: "7s",  delay: "0s"    },
  { id: 1, size: 6,  x: "80%",  y: "60%", dx: "-60px", dy: "-110px", dur: "9s",  delay: "1.2s"  },
  { id: 2, size: 3,  x: "45%",  y: "80%", dx: "40px",  dy: "-100px", dur: "6s",  delay: "2.5s"  },
  { id: 3, size: 5,  x: "65%",  y: "75%", dx: "-45px", dy: "-125px", dur: "8s",  delay: "0.8s"  },
  { id: 4, size: 3,  x: "25%",  y: "85%", dx: "55px",  dy: "-90px",  dur: "7.5s",delay: "3.1s"  },
  { id: 5, size: 7,  x: "55%",  y: "65%", dx: "30px",  dy: "-140px", dur: "10s", delay: "1.8s"  },
  { id: 6, size: 4,  x: "88%",  y: "82%", dx: "-50px", dy: "-100px", dur: "6.5s",delay: "4.0s"  },
  { id: 7, size: 5,  x: "10%",  y: "55%", dx: "65px",  dy: "-120px", dur: "8.5s",delay: "2.0s"  },
  { id: 8, size: 3,  x: "72%",  y: "90%", dx: "-35px", dy: "-95px",  dur: "7s",  delay: "0.5s"  },
  { id: 9, size: 6,  x: "35%",  y: "78%", dx: "45px",  dy: "-115px", dur: "9.5s",delay: "3.5s"  },
  { id: 10,size: 4,  x: "92%",  y: "45%", dx: "-40px", dy: "-130px", dur: "6s",  delay: "1.5s"  },
  { id: 11,size: 3,  x: "5%",   y: "40%", dx: "70px",  dy: "-105px", dur: "8s",  delay: "2.8s"  },
];

export default function Hero({ headline, subheadline, ctaText }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Avoid SSR mismatch for particles
  useEffect(() => { setMounted(true); }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current || !spotlightRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      if (!spotlightRef.current) return;
      spotlightRef.current.style.setProperty("--mouse-x", `${x}%`);
      spotlightRef.current.style.setProperty("--mouse-y", `${y}%`);
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    // Gently drift the spotlight back to center
    frameRef.current = requestAnimationFrame(() => {
      if (!spotlightRef.current) return;
      spotlightRef.current.style.setProperty("--mouse-x", "50%");
      spotlightRef.current.style.setProperty("--mouse-y", "50%");
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* ── Layer 0: base gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-brand-dark" />

      {/* ── Layer 1: hero photo ── */}
      <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-30" />

      {/* ── Layer 2: vignette ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* ── Layer 3: enhanced animated orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb-a absolute top-1/4 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-3xl" />
        <div className="orb-b absolute bottom-1/4 right-1/5 w-[28rem] h-[28rem] bg-brand-light/8 rounded-full blur-3xl" />
        <div className="orb-c absolute top-2/3 left-1/2 w-64 h-64 bg-brand-dark/15 rounded-full blur-2xl" />
      </div>

      {/* ── Layer 4: mouse-follow spotlight ── */}
      <div
        ref={spotlightRef}
        className="hero-spotlight"
        aria-hidden="true"
        style={{ "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties}
      />

      {/* ── Layer 5: floating particle dots ── */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {PARTICLES.map((p) => (
            <span
              key={p.id}
              className="hero-particle"
              style={{
                width: p.size,
                height: p.size,
                left: p.x,
                top: p.y,
                "--dx": p.dx,
                "--dy": p.dy,
                "--dur": p.dur,
                "--delay": p.delay,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {/* ── Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <span className="hero-badge inline-block px-4 py-1.5 bg-brand/20 border border-brand/30 text-brand-light rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
          Veteran-Owned &amp; Family-Operated
        </span>

        {/* Shimmer gradient headline */}
        <h1 className="hero-title hero-title-shimmer text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          {headline}
        </h1>

        <p className="hero-subtitle text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          {subheadline}
        </p>

        <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/book" size="lg" variant="primary" className="btn-animate btn-pulse">
            {ctaText}
          </Button>
          <Button
            href="/contact"
            size="lg"
            variant="outline"
            className="btn-animate border-white text-white hover:bg-white hover:text-foreground"
          >
            Get a Free Quote
          </Button>
        </div>

        <p className="hero-trust mt-8 text-white/50 text-sm">
          Trusted by 7,500+ clients across Southern California
        </p>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
        <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
