/**
 * Organic section transitions.
 *
 * Sections meet along soft swell curves rather than hard horizontal rules —
 * this is the detail that keeps the layout from feeling like stacked boxes.
 * `fill` should match the colour of the section the curve is entering.
 */

export function WaveDivider({
  fill = "var(--color-ivory)",
  flip = false,
  className = "",
  height = "clamp(48px, 7vw, 110px)",
}: {
  fill?: string;
  /** Curve upward instead of downward. */
  flip?: boolean;
  className?: string;
  height?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative w-full overflow-hidden leading-[0] ${className}`}
      style={{ height, transform: flip ? "rotate(180deg)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-full w-full"
        focusable="false"
      >
        <path
          d="M0,120 L0,58 C160,14 300,2 470,22 C640,42 760,96 940,102 C1110,108 1290,74 1440,34 L1440,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/** A single hairline swell — used as a quiet decorative accent. */
export function WaveRule({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 12"
      aria-hidden="true"
      className={`h-3 w-32 text-dune ${className}`}
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M0 6C16.7 6 16.7 2 33.3 2S50 6 66.7 6 83.3 2 100 2s16.7 4 33.3 4S150 2 166.7 2 183.3 6 200 6"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Scroll cue for the hero. Sinks gently, like something settling in water. */
export function ScrollCue({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex flex-col items-center gap-3 text-ivory/70 ${className}`}
    >
      <span className="eyebrow text-[0.5625rem]">Scroll</span>
      <span className="relative block h-14 w-px overflow-hidden bg-ivory/25">
        <span className="absolute inset-x-0 top-0 block h-5 animate-[sink_2.8s_var(--ease-swell)_infinite] bg-ivory/90" />
      </span>
    </span>
  );
}
