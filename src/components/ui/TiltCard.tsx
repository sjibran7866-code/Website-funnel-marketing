"use client";

import { useRef, useCallback } from "react";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Maximum rotation angle in degrees. Default: 10 */
  maxTilt?: number;
  /** Scale-up factor on hover. Default: 1.02 */
  scale?: number;
};

/**
 * TiltCard – wraps any content with an interactive 3-D perspective tilt
 * and a glare overlay, driven purely by CSS custom properties.
 * No external animation library is used.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 10,
  scale = 1.03,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;   // 0 → 1
      const y = (e.clientY - rect.top) / rect.height;    // 0 → 1

      const rx = (0.5 - y) * maxTilt * 2;  // positive = top tilts towards viewer
      const ry = (x - 0.5) * maxTilt * 2;  // positive = right tilts towards viewer

      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        if (!ref.current) return;
        ref.current.style.setProperty("--rx", `${rx}deg`);
        ref.current.style.setProperty("--ry", `${ry}deg`);
        ref.current.style.setProperty("--scale", `${scale}`);

        if (glareRef.current) {
          glareRef.current.style.setProperty("--glare-x", `${x * 100}%`);
          glareRef.current.style.setProperty("--glare-y", `${y * 100}%`);
          glareRef.current.style.setProperty("--glare-opacity", "1");
        }
      });
    },
    [maxTilt, scale],
  );

  const onLeave = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      ref.current.style.setProperty("--rx", "0deg");
      ref.current.style.setProperty("--ry", "0deg");
      ref.current.style.setProperty("--scale", "1");

      if (glareRef.current) {
        glareRef.current.style.setProperty("--glare-opacity", "0");
      }
    });
  }, []);

  return (
    <div
      ref={ref}
      className={`tilt-card relative ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Glare overlay */}
      <div ref={glareRef} className="tilt-glare" aria-hidden="true" />
      {children}
    </div>
  );
}
