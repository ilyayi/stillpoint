import { Button, ArrowRight } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { faqs } from "@/content/faq";
import { site } from "@/content/site";

export function FaqPreview() {
  const preview = faqs.slice(0, 5);

  return (
    <section className="bg-shell py-24 md:py-36">
      <div className="u-container">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Good to know</Eyebrow>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="t-title mt-7 font-display text-deep">
                Questions people ask before their first session
              </h2>
            </Reveal>
            <Reveal delay={170}>
              <p className="mt-6 text-ink-soft">
                If yours isn&rsquo;t here, just ask — a straight answer before you book is better
                than a surprise on the table.
              </p>
            </Reveal>
            <Reveal delay={230}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-start">
                <Button href="/faq" variant="secondary" size="sm">
                  All questions
                  <ArrowRight />
                </Button>
                <Button href="/contact" variant="quiet" size="sm">
                  Ask something else
                </Button>
              </div>
            </Reveal>
            <Reveal delay={280}>
              <p className="mt-10 border-t border-dune/60 pt-6 text-sm leading-relaxed text-ink-faint">
                <span className="block tracking-[0.12em] text-ink-soft uppercase">
                  Cancellations
                </span>
                <span className="mt-2 block">{site.policies.cancellation}</span>
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={120}>
              <FaqAccordion items={preview} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
