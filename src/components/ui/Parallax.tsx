"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Pixels of travel across the full scroll pass. Keep it small — 40 to 120. */
  distance?: number;
  className?: string;
};

/**
 * Very slight vertical drift as an element passes through the viewport.
 *
 * Deliberately restrained: the brief asks for something that feels like it is
 * breathing, not a scroll-jacked showreel. Uses a single rAF-throttled passive
 * listener and writes only to a CSS custom property, so it never causes layout.
 */
export function Parallax({ children, distance = 70, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      if (rect.bottom < -200 || rect.top > vh + 200) return;
      // -1 (element below the fold) → 1 (element above it)
      const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      el.style.setProperty("--parallax", `${(-progress * distance).toFixed(2)}px`);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [distance]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: "translate3d(0, var(--parallax, 0px), 0)", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
