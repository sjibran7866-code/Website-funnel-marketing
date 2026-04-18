"use client";

import { useEffect, useRef, useState } from "react";

type StaggerChildrenProps = {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
};

export default function StaggerChildren({
  children,
  staggerDelay = 100,
  className = "",
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ["--stagger-delay" as string]: `${staggerDelay}ms`,
      }}
    >
      {isVisible ? (
        <div className="stagger-visible">{children}</div>
      ) : (
        <div className="stagger-hidden">{children}</div>
      )}
    </div>
  );
}
