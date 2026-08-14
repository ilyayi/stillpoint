import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/layout/PageHero";
import { BookingEmbed } from "@/components/booking/BookingEmbed";
import { Reveal } from "@/components/ui/Reveal";
import { Section, Eyebrow } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { activeServices, durationLabel } from "@/content/services";
import { site } from "@/content/site";
import { images } from "@/lib/images";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Book a Session",
  description: `Book massage and bodywork in ${site.location.city}. Choose your session and length — therapeutic, deep tissue, sports recovery, stretching, lymphatic, cranial-sacral and customized bodywork.`,
  path: "/book",
  keywords: ["book massage Santa Barbara", "massage appointment Santa Barbara"],
});

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Booking"
        title="Hold an hour for yourself."
        lead="Pick the session and the length. If you are unsure, book Customized Bodywork — we will decide together in the first few minutes."
        image={images.hero}
        size="sm"
      />

      <Section className="bg-ivory" size="md">
        <BookingEmbed />
      </Section>

      {/* A quick reference while they are deciding */}
      <Section className="bg-shell" size="md">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Reference</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="t-title mt-6 font-display text-deep">Sessions at a glance</h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 text-ink-soft">
                Every session adapts once we begin — this is simply where we start.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 border-t border-dune/60 pt-6 text-sm leading-relaxed text-ink-faint">
                <span className="block tracking-[0.12em] text-ink-soft uppercase">
                  Before you arrive
                </span>
                <span className="mt-2 block">{site.policies.arrival}</span>
                <span className="mt-3 block">{site.policies.cancellation}</span>
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <ul className="divide-y divide-dune/50 border-y border-dune/50">
              {activeServices.map((service, i) => (
                <Reveal key={service.slug} delay={Math.min(i, 6) * 45} as="li">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex flex-col gap-2 py-5 transition-colors duration-500 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <span className="font-display text-[1.35rem] text-deep transition-colors duration-500 group-hover:text-ocean">
                      {service.name}
                    </span>
                    <span className="flex shrink-0 items-baseline gap-6 text-sm text-ink-faint">
                      <span>{durationLabel(service.durations)}</span>
                      <span className="text-xs tracking-[0.14em] text-ocean uppercase">
                        Details
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Book", path: "/book" },
        ])}
      />
    </>
  );
}
