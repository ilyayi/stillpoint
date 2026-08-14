import type { FaqItem } from "@/content/faq";

/**
 * Built on native <details>/<summary>: full keyboard support, screen-reader
 * semantics and in-page find all work without a line of JavaScript.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-dune/50 border-y border-dune/50">
      {items.map((item) => (
        <details key={item.q} name="faq" className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 transition-colors duration-500 hover:text-ocean [&::-webkit-details-marker]:hidden">
            <h3 className="font-display text-[1.2rem] leading-snug text-deep transition-colors duration-500 group-hover:text-ocean md:text-[1.35rem]">
              {item.q}
            </h3>
            <span
              aria-hidden
              className="relative mt-2 h-3 w-3 shrink-0 text-ocean transition-transform duration-500 [transition-timing-function:var(--ease-tide)] group-open:rotate-45"
            >
              <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
              <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current transition-opacity duration-500 group-open:opacity-0" />
            </span>
          </summary>
          <div className="pb-8 text-ink-soft u-measure-wide">
            <p className="leading-[1.75]">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
