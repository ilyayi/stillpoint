import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/layout/PageHero";
import { ClosingCta } from "@/components/shared/ClosingCta";
import { Button, ArrowRight } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { experienceIntro, steps } from "@/content/experience";
import { bookHref, site } from "@/content/site";
import { blurDataURLLight, images } from "@/lib/images";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "The Experience",
  description:
    "What to expect from a massage session in Santa Barbara — arrival and intake, how the work builds, pressure and feedback, assisted stretching, and how a session closes.",
  path: "/experience",
  keywords: ["what to expect massage", "first massage Santa Barbara", "massage session"],
});

const practical = [
  {
    q: "Arrive",
    a: "Five to ten minutes early if you can. Arriving unhurried genuinely changes the session.",
  },
  {
    q: "Wear",
    a: "For table work, undress to your comfort level — you are draped throughout. For stretching sessions, comfortable clothes you can move in.",
  },
  {
    q: "Say",
    a: "Anything relevant: injuries, surgeries, pregnancy, areas to avoid, pressure preferences. More information means better work.",
  },
  {
    q: "After",
    a: "Water, easy movement, and a little space before anything demanding. Some tenderness the next day is normal after deeper work.",
  },
];

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow={experienceIntro.eyebrow}
        title={experienceIntro.title}
        lead={experienceIntro.lead}
        image={images.openWater}
      >
        <Button href={bookHref} variant="light" size="lg">
          {site.booking.label}
          <ArrowRight />
        </Button>
      </PageHero>

      {/* The five movements, alternating */}
      {steps.map((step, i) => {
        const flipped = i % 2 === 1;
        return (
          <Section
            key={step.key}
            size="md"
            className={i % 2 === 0 ? "bg-ivory" : "bg-shell"}
            id={step.key}
          >
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
              <div className={`lg:col-span-6 ${flipped ? "lg:order-2" : ""}`}>
                <Reveal>
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-5xl leading-none text-clay-deep/80">
                      {step.index}
                    </span>
                    <h2 className="t-display font-display text-deep">{step.title}</h2>
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <p className="mt-6 font-display text-[1.3rem] text-ocean italic">
                    {step.subtitle}
                  </p>
                </Reveal>
                <Reveal delay={140}>
                  <p className="t-lead mt-7 text-ink-soft u-measure">{step.body}</p>
                </Reveal>
                <Reveal delay={200}>
                  <ul className="mt-9 space-y-4 border-t border-dune/60 pt-8">
                    {step.detail.map((d) => (
                      <li key={d} className="flex gap-4 text-[0.9375rem] text-ink-soft">
                        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sea" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <div className={`lg:col-span-6 ${flipped ? "lg:order-1" : ""}`}>
                <Reveal delay={120}>
                  <div
                    className={`grain relative aspect-4/3 overflow-hidden ${
                      flipped
                        ? "rounded-[1.5rem] rounded-tr-[9rem]"
                        : "rounded-[1.5rem] rounded-tl-[9rem]"
                    }`}
                  >
                    <Parallax distance={40} className="absolute inset-0">
                      <Image
                        src={step.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 46vw, 100vw"
                        placeholder="blur"
                        blurDataURL={blurDataURLLight}
                        className="scale-110 object-cover"
                      />
                    </Parallax>
                  </div>
                </Reveal>
              </div>
            </div>
          </Section>
        );
      })}

      {/* Practical answers */}
      <Section className="bg-deep text-ivory" size="lg">
        <SectionHeading
          eyebrow="Practical"
          tone="light"
          title="The short version"
          align="center"
        />
        <dl className="mx-auto mt-16 grid max-w-5xl gap-px overflow-hidden rounded-2xl bg-ivory/12 sm:grid-cols-2">
          {practical.map((item, i) => (
            <Reveal key={item.q} delay={i * 80} className="bg-deep">
              <div className="h-full p-8 md:p-10">
                <dt className="font-display text-2xl text-shoal">{item.q}</dt>
                <dd className="mt-4 text-ivory/70">{item.a}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
        <Reveal>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-ivory/70">
            {site.policies.cancellation}
          </p>
        </Reveal>
      </Section>

      <ClosingCta
        title="Now you know how it goes."
        lead="The only thing left is the hour itself."
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "The Experience", path: "/experience" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "What to expect from a massage session",
            description: experienceIntro.lead,
            step: steps.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title,
              text: s.body,
              url: `${site.url}/experience#${s.key}`,
            })),
          },
        ]}
      />
    </>
  );
}
