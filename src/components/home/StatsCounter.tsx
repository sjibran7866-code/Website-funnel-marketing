"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  label: string;
  value: number;
  suffix: string;
};

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-brand">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

type StatsCounterProps = {
  stats: {
    clients: number;
    googleReviews: number;
    yelpReviews: number;
    yearsInBusiness: number;
  };
};

export default function StatsCounter({ stats }: StatsCounterProps) {
  const items: Stat[] = [
    { label: "Happy Clients", value: stats.clients, suffix: "+" },
    { label: "Google Reviews", value: stats.googleReviews, suffix: "+" },
    { label: "Yelp Reviews", value: stats.yelpReviews, suffix: "+" },
    { label: "Years in Business", value: stats.yearsInBusiness, suffix: "+" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
