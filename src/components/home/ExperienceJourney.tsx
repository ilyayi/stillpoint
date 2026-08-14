import Image from "next/image";
import { Button, ArrowRight } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { steps } from "@/content/experience";
import { blurDataURLLight } from "@/lib/images";

/**
 * ARRIVE → BREATHE → RELEASE → RECONNECT → LEAVE RENEWED
 * A horizontal rail on desktop, a vertical thread on mobile. The hairline that
 * connects the steps is the point — it should read as one continuous movement.
 */
export function ExperienceJourney() {
  return (
    <section className="relative overflow-hidden bg-shell py-24 md:py-36">
      <div className="u-container">
        <SectionHeading
          eyebrow="The Experience"
          title="Five movements of a session"
          lead="Sessions are individual, never one-size-fits-all — but the shape stays the same, so you always know where you are."
          align="center"
        />

        <ol className="relative mt-20 grid gap-12 md:grid-cols-5 md:gap-6">
          {/* the thread */}
          <div
            aria-hidden
            className="absolute top-[3.25rem] left-[1.375rem] hidden h-[calc(100%-6rem)] w-px bg-gradient-to-b from-transparent via-dune to-transparent sm:block md:top-[4.5rem] md:left-0 md:h-px md:w-full md:bg-gradient-to-r"
          />

          {steps.map((step, i) => (
            <Reveal key={step.key} delay={i * 110} as="li" className="relative">
              <div className="flex gap-6 sm:gap-8 md:block">
                <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 md:h-24 md:w-24">
                  <div className="grain relative h-full w-full overflow-hidden rounded-[1.6rem] rounded-tl-[2.2rem] ring-1 ring-dune/60">
                    <Image
                      src={step.image}
                      alt=""
                      fill
                      sizes="96px"
                      placeholder="blur"
                      blurDataURL={blurDataURLLight}
                      className="object-cover"
                    />
                  </div>
                  <span className="absolute -top-2.5 -right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-deep font-sans text-[0.625rem] tracking-widest text-ivory ring-4 ring-shell">
                    {step.index}
                  </span>
                </div>

                <div className="md:mt-7">
                  <h3 className="font-display text-[1.5rem] leading-none text-deep">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] text-ocean italic">{step.subtitle}</p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft md:pr-4">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <div className="mt-20 text-center">
            <Button href="/experience" variant="secondary">
              What to expect, in detail
              <ArrowRight />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
