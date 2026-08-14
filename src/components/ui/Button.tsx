import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "light" | "outline-light" | "quiet";
type Size = "sm" | "md" | "lg";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Force a new tab. External http(s) links get this automatically. */
  external?: boolean;
  "aria-label"?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-sans " +
  "uppercase tracking-[0.16em] whitespace-nowrap transition-all duration-500 " +
  "[transition-timing-function:var(--ease-tide)] focus-visible:outline-2 focus-visible:outline-offset-3";

const variants: Record<Variant, string> = {
  // Primary action on light grounds
  primary:
    "bg-deep text-ivory hover:bg-abyss shadow-[0_1px_2px_rgba(6,30,41,0.16)] hover:shadow-[0_10px_30px_-10px_rgba(6,30,41,0.55)] hover:-translate-y-px",
  // Secondary on light grounds
  secondary:
    "border border-deep/25 text-deep hover:border-deep/70 hover:bg-deep/[0.04] hover:-translate-y-px",
  // Primary action over photography
  light:
    "bg-ivory text-abyss hover:bg-white shadow-[0_10px_40px_-16px_rgba(0,0,0,0.6)] hover:-translate-y-px",
  // Secondary over photography
  "outline-light":
    "border border-ivory/45 text-ivory backdrop-blur-[2px] hover:border-ivory hover:bg-ivory/10 hover:-translate-y-px",
  // Text-only. Keeps vertical padding so it still clears the 24px target size.
  quiet: "text-ocean hover:text-deep px-0! py-1.5! rounded-none link-underline",
};

const sizes: Record<Size, string> = {
  sm: "text-[0.6875rem] px-5 py-2.5",
  md: "text-[0.75rem] px-7 py-3.5",
  lg: "text-[0.8125rem] px-9 py-4.5",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external,
  ...rest
}: Props) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

/** Small right-pointing arrow that eases outward on hover. */
export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`h-3.5 w-3.5 transition-transform duration-500 [transition-timing-function:var(--ease-tide)] group-hover:translate-x-1 ${className}`}
    >
      <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
