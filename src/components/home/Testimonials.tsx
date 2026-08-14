import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { placeholderPrompts, showPlaceholders, testimonials } from "@/content/testimonials";
import { getService } from "@/content/services";

function QuoteMark() {
  return (
    <svg viewBox="0 0 40 28" aria-hidden className="h-6 w-8 text-dune" fill="currentColor">
      <path d="M0 28V15.1C0 6.9 4.9 1.2 13.6 0l1.5 4.3c-4.6 1.1-7 3.7-7.3 7.4H14V28H0Zm25 0V15.1C25 6.9 29.9 1.2 38.6 0l1.4 4.3c-4.5 1.1-7 3.7-7.2 7.4H39V28H25Z" />
    </svg>
  );
}

export function Testimonials() {
  const hasReal = testimonials.length > 0;
  if (!hasReal && !showPlaceholders) return null;

  return (
    <section className="bg-ivory py-24 md:py-36">
      <div className="u-container">
        <SectionHeading
          eyebrow="In their words"
          title={
            hasReal ? (
              <>
                What clients say <span className="text-ocean italic">afterwards</span>
              </>
            ) : (
              <>
                Client words, <span className="text-ocean italic">coming soon</span>
              </>
            )
          }
          lead={
            hasReal
              ? undefined
              : "This space is reserved for real testimonials from real clients. Nothing here has been invented — the section stays empty until there is something genuine to put in it."
          }
          align="center"
        />

        {hasReal ? (
          <div className="mt-16 grid gap-6 md:grid-cols-3 lg:gap-8">
            {testimonials.slice(0, 3).map((t, i) => {
              const service = t.service ? getService(t.service) : undefined;
              return (
                <Reveal key={t.name + i} delay={i * 100}>
                  <figure className="flex h-full flex-col rounded-[1.5rem] rounded-tr-[4rem] border border-dune/50 bg-shell/60 p-8 md:p-10">
                    <QuoteMark />
                    <blockquote className="mt-6 flex-1">
                      <p className="font-display text-[1.3rem] leading-[1.5] text-deep">
                        {t.quote}
                      </p>
                    </blockquote>
                    <figcaption className="mt-8 border-t border-dune/50 pt-5 text-sm">
                      <span className="block tracking-[0.1em] text-deep uppercase">{t.name}</span>
                      {(t.context || service) && (
                        <span className="mt-1.5 block text-ink-faint">
                          {[t.context, service?.name].filter(Boolean).join(" · ")}
                        </span>
                      )}
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <>
            <div className="mt-16 grid gap-6 md:grid-cols-3 lg:gap-8">
              {placeholderPrompts.map((p, i) => (
                <Reveal key={p.label} delay={i * 100}>
                  <div className="flex h-full flex-col rounded-[1.5rem] rounded-tr-[4rem] border border-dashed border-dune bg-shell/40 p-8 md:p-10">
                    <QuoteMark />
                    <p className="mt-6 flex-1 font-display text-[1.25rem] leading-[1.5] text-ink-faint italic">
                      {p.hint}
                    </p>
                    <p className="mt-8 border-t border-dashed border-dune pt-5 text-[0.6875rem] tracking-[0.18em] text-clay-deep uppercase">
                      {p.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="mx-auto mt-10 max-w-2xl rounded-2xl border border-dashed border-gold/70 bg-gold/[0.07] p-5 text-center text-sm leading-relaxed text-ink-soft">
                <span className="eyebrow block text-gold-deep">Setup — remove before launch</span>
                <span className="mt-3 block">
                  Add real quotes to{" "}
                  <code className="rounded bg-deep/8 px-1.5 py-0.5 text-[0.85em]">
                    src/content/testimonials.ts
                  </code>{" "}
                  and these placeholders disappear on their own. To hide the section entirely, set{" "}
                  <code className="rounded bg-deep/8 px-1.5 py-0.5 text-[0.85em]">
                    showPlaceholders = false
                  </code>
                  .
                </span>
              </p>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
