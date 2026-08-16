import { site } from "@/content/site";

/**
 * The multi-session discount, shown wherever someone is looking at prices.
 * Renders nothing when `packages.enabled` is false in src/content/site.ts, so
 * turning the offer off removes every mention of it site-wide.
 */
export function PackageNote({
  variant = "card",
  className = "",
}: {
  /** "card" for a standalone block, "inline" for a quiet line under prices. */
  variant?: "card" | "inline" | "light";
  className?: string;
}) {
  if (!site.packages.enabled) return null;
  const { label, note, discountPercent, minSessions } = site.packages;

  if (variant === "inline") {
    return (
      <p className={`text-xs leading-relaxed text-ink-soft ${className}`}>
        <span className="font-display text-sm text-gold-deep">{label}.</span>{" "}
        {minSessions} or more booked together, {discountPercent}% off the total.
      </p>
    );
  }

  if (variant === "light") {
    return (
      <div
        className={`rounded-2xl border border-ivory/25 bg-ivory/10 p-6 backdrop-blur-sm ${className}`}
      >
        <p className="font-display text-xl text-ivory">{label}</p>
        <p className="mt-2.5 text-sm leading-relaxed text-ivory/75">{note}</p>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-4 rounded-[1.5rem] rounded-tr-[3.5rem] border border-gold/45 bg-gradient-to-br from-sunlight/25 via-sand/25 to-transparent p-7 sm:flex-row sm:items-center sm:gap-8 md:p-9 ${className}`}
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-deep">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-6 w-6">
          <path
            d="M12 3v18M5 8h14M5 16h14"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </div>
      <div>
        <p className="font-display text-[1.4rem] leading-tight text-deep">{label}</p>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{note}</p>
      </div>
    </div>
  );
}
