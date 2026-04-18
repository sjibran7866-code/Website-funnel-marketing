"use client";

import { useState, useEffect } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import type { Testimonial } from "@/types";

type TestimonialCarouselProps = {
  title: string;
  testimonials: Testimonial[];
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 transition-colors duration-300 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialCarousel({ title, testimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="fade-up">
          <SectionHeading title={title} />
        </AnimateOnScroll>

        {/* Desktop: show 3 cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.slice(0, 6).map((testimonial, i) => (
            <AnimateOnScroll key={testimonial.id} animation="fade-up" delay={i * 100}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 card-hover h-full">
                <StarRating rating={testimonial.rating} />
                <p className="mt-4 text-gray-600 leading-relaxed italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.eventType}</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Mobile: carousel with crossfade */}
        <div className="md:hidden relative">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.id}
              className={`transition-all duration-500 ${
                i === current
                  ? "opacity-100 translate-x-0 relative"
                  : "opacity-0 translate-x-4 absolute inset-0 pointer-events-none"
              }`}
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <StarRating rating={testimonial.rating} />
                <p className="mt-4 text-gray-600 leading-relaxed italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.eventType}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current ? "bg-brand w-8" : "bg-gray-300 w-2.5"
                }`}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
