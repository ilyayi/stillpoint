import type { ElementType, ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Vertical rhythm. Sections breathe — generous space is part of the brand. */
const pad = {
  sm: "py-16 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-24 md:py-36",
  xl: "py-28 md:py-44",
} as const;

export function Section({
  children,
  className = "",
  size = "lg",
  id,
  as: Tag = "section",
  container = true,
}: {
  children: ReactNode;
  className?: string;
  size?: keyof typeof pad;
  id?: string;
  as?: ElementType;
  container?: boolean;
}) {
  return (
    <Tag id={id} className={`${pad[size]} ${className}`}>
      {container ? <div className="u-container">{children}</div> : children}
    </Tag>
  );
}

export function Eyebrow({
  children,
  className = "",
  tone = "dark",
}: {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light" | "muted";
}) {
  const tones = {
    dark: "text-ocean",
    light: "text-ivory/70",
    muted: "text-ink-faint",
  } as const;
  return (
    <span className={`eyebrow flex items-center gap-3 ${tones[tone]} ${className}`}>
      <span aria-hidden className="h-px w-6 bg-current opacity-50" />
      {children}
    </span>
  );
}

/**
 * The standard section opening: eyebrow, heading, optional lead paragraph.
 * Using one component for all of them is what keeps the site feeling composed.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
  size = "display",
  className = "",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  size?: "display" | "title";
  className?: string;
  as?: ElementType;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <Reveal>
          <Eyebrow tone={tone === "light" ? "light" : "dark"} className={centered ? "justify-center" : ""}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <Reveal delay={80}>
        <Tag
          className={`${size === "display" ? "t-display" : "t-title"} mt-6 ${
            tone === "light" ? "text-ivory" : "text-deep"
          } ${centered ? "mx-auto max-w-4xl" : "max-w-3xl"}`}
        >
          {title}
        </Tag>
      </Reveal>
      {lead && (
        <Reveal delay={160}>
          <p
            className={`t-lead mt-7 ${
              tone === "light" ? "text-ivory/80" : "text-ink-soft"
            } ${centered ? "mx-auto u-measure-wide" : "u-measure-wide"}`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
