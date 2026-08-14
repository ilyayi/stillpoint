import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/layout/PageHero";
import { ClosingCta } from "@/components/shared/ClosingCta";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Button, ArrowRight } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { activeServices, serviceCategories } from "@/content/services";
import { bookHref, site } from "@/content/site";
import { images } from "@/lib/images";
import { BASE_URL, breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Massage & Bodywork Services",
  description:
    "Therapeutic massage, deep tissue, sports and recovery, trigger point therapy, stretching and mobility, lymphatic, cranial-sacral and customized bodywork in Santa Barbara. Sessions from 30 to 120 minutes.",
  path: "/services",
  keywords: [
    "deep tissue massage Santa Barbara",
    "sports massage Santa Barbara",
    "therapeutic massage Santa Barbara",
    "relaxation massage Santa Barbara",
    "lymphatic massage Santa Barbara",
    "stretching Santa Barbara",
  ],
});

const lengths = [
  { time: "30 min", use: "One focused area — neck and shoulders, or a single problem spot." },
  { time: "60 min", use: "One or two regions, addressed properly. The most common first booking." },
  { time: "90 min", use: "Full body without rushing, or one area very thoroughly. Most requested." },
  { time: "120 min", use: "Everything, unhurried — best if you take a while to settle." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Sessions"
        title="Bodywork, built around the body in front of me."
        lead="Nine starting points. Which one you book matters less than what we find in the first ten minutes — every session adapts from there."
        image={images.tideline}
      >
        <Button href={bookHref} variant="light" size="lg">
          {site.booking.label}
          <ArrowRight />
        </Button>
        <Button href="#choosing" variant="outline-light" size="lg">
          Help me choose
        </Button>
      </PageHero>

      {/* Everything, grouped by intent */}
      {serviceCategories.map((category, ci) => {
        const items = activeServices.filter((s) => s.category === category.key);
        if (!items.length) return null;
        return (
          <Section
            key={category.key}
            size="md"
            className={ci % 2 === 0 ? "bg-ivory" : "bg-shell"}
          >
            <div className="flex flex-col gap-4 border-b border-dune/50 pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Reveal>
                  <Eyebrow>{category.label}</Eyebrow>
                </Reveal>
                <Reveal delay={70}>
                  <h2 className="t-title mt-5 font-display text-deep">{category.blurb}</h2>
                </Reveal>
              </div>
              <Reveal delay={120}>
                <span className="text-sm text-ink-faint">
                  {items.length} {items.length === 1 ? "session" : "sessions"}
                </span>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {items.map((service, i) => (
                <Reveal key={service.slug} delay={(i % 3) * 90}>
                  <div className="h-full">
                    <ServiceCard service={service} priority={ci === 0 && i < 3} />
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
        );
      })}

      {/* How to choose — the question people actually have */}
      <Section id="choosing" className="bg-deep text-ivory" size="lg">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Choosing"
              tone="light"
              size="title"
              title="How long should I book?"
              lead="Length changes a session more than the name on it does. If you are unsure, ninety minutes is rarely the wrong answer."
            />
            <Reveal delay={220}>
              <Button href={bookHref} variant="light" className="mt-10">
                {site.booking.label}
                <ArrowRight />
              </Button>
            </Reveal>
          </div>

          <dl className="lg:col-span-7">
            {lengths.map((l, i) => (
              <Reveal key={l.time} delay={i * 80}>
                <div className="flex flex-col gap-2 border-b border-ivory/15 py-6 sm:flex-row sm:gap-10">
                  <dt className="font-display text-2xl text-shoal sm:w-32 sm:shrink-0">{l.time}</dt>
                  <dd className="text-ivory/70">{l.use}</dd>
                </div>
              </Reveal>
            ))}
            <Reveal delay={360}>
              <p className="pt-8 text-sm text-ivory/70">
                Still unsure? Book{" "}
                <Link href="/services/customized-bodywork" className="link-underline text-shoal">
                  Customized Bodywork
                </Link>{" "}
                — it draws on everything here, and we decide together once we start.
              </p>
            </Reveal>
          </dl>
        </div>
      </Section>

      <ClosingCta
        title="Book the session your body is asking for."
        lead="If you are between two options, book the longer one. Nobody has ever regretted the extra thirty minutes."
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Massage & Bodywork Services",
            itemListElement: activeServices.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.name,
              url: `${BASE_URL}/services/${s.slug}`,
            })),
          },
        ]}
      />
    </>
  );
}
