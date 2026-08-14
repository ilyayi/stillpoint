import Link from "next/link";
import { site } from "@/content/site";

/**
 * The mark: concentric ripples resolving to a single still point at the centre.
 * It reads as water, and as the idea the brand is named for.
 */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <circle cx="20" cy="20" r="2.1" fill="currentColor" />
      <path
        d="M8.6 20a11.4 11.4 0 0 1 22.8 0"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M31.4 20a11.4 11.4 0 0 1-22.8 0"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M2.5 20A17.5 17.5 0 0 1 37.5 20"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M37.5 20A17.5 17.5 0 0 1 2.5 20"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.18"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  showDescriptor = false,
  tone = "inherit",
}: {
  className?: string;
  showDescriptor?: boolean;
  tone?: "inherit" | "light" | "dark";
}) {
  const toneClass = tone === "light" ? "text-ivory" : tone === "dark" ? "text-deep" : "";
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`group inline-flex items-center gap-3 ${toneClass} ${className}`}
    >
      <Mark className="h-8 w-8 shrink-0 transition-transform duration-[1200ms] [transition-timing-function:var(--ease-tide)] group-hover:rotate-[180deg]" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.4rem] font-normal tracking-[0.18em] uppercase">
          {site.name}
        </span>
        {showDescriptor && (
          <span className="eyebrow mt-1.5 text-[0.5625rem] opacity-60">{site.descriptor}</span>
        )}
      </span>
    </Link>
  );
}
