"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Stagger in ms — use small increments (60–120) for a natural cascade. */
  delay?: number;
  /** How far into the viewport before it triggers. */
  threshold?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Fades and lifts content into view once, when it first enters the viewport.
 * Content is visible by default if JavaScript never runs, and the CSS honours
 * prefers-reduced-motion, so nothing is ever hidden from a reader who needs it.
 */
export function Reveal({
  children,
  delay = 0,
  threshold = 0.15,
  className = "",
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No observer support: show everything on the next tick. Readers who prefer
    // reduced motion are handled in CSS, which also covers the no-JS case.
    if (typeof IntersectionObserver === "undefined") {
      const id = setTimeout(() => setShown(true), 0);
      return () => clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
