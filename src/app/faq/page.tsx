import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { ClosingCta } from "@/components/shared/ClosingCta";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Button, ArrowRight } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, Eyebrow } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqGroups, faqs } from "@/content/faq";
import { bookHref, site } from "@/content/site";
import { images } from "@/lib/images";
import { breadcrumbSchema, buildMetadata, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "What to expect, what to wear, how to choose the right massage, how long to book, working with athletes, aftercare, cancellations and booking — answered plainly.",
  path: "/faq",
  keywords: ["massage FAQ Santa Barbara", "what to expect massage", "massage cancellation policy"],
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Good to know"
        title="Questions, answered plainly."
        lead="Everything worth knowing before your first session. If yours isn't here, ask — a straight answer beforehand is better than a surprise on the table."
        image={images.sand}
        size="sm"
      />

      <Section className="bg-ivory" size="lg">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <Eyebrow>Still wondering?</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="t-title mt-6 font-display text-deep">
                  Ask before you book, not after.
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-6 text-ink-soft">
                  Describe what has been bothering you and I will tell you honestly whether this is
                  the right work for it — and which session and length would suit.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-9 flex flex-col items-start gap-4">
                  <Button href="/contact" variant="secondary" size="sm">
                    Send a note
                    <ArrowRight />
                  </Button>
                  <a
                    href={`tel:${site.contact.phoneHref}`}
                    className="link-underline inline-block py-1.5 text-sm text-ocean"
                  >
                    {site.contact.phone}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            {faqGroups.map((group, gi) => {
              const items = faqs.filter((f) => f.group === group);
              if (!items.length) return null;
              return (
                <div key={group} className={gi > 0 ? "mt-16" : ""}>
                  <Reveal>
                    <h2 className="eyebrow mb-6 text-clay-deep">{group}</h2>
                  </Reveal>
                  <Reveal delay={60}>
                    <FaqAccordion items={items} />
                  </Reveal>
                </div>
              );
            })}

            <Reveal>
              <div className="mt-14 rounded-[1.5rem] rounded-tr-[4rem] border border-dune/60 bg-shell p-8 md:p-10">
                <h2 className="font-display text-2xl text-deep">Ready when you are</h2>
                <p className="mt-4 text-ink-soft">
                  Book online, or get in touch if you would rather talk it through first.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href={bookHref}>
                    {site.booking.label}
                    <ArrowRight />
                  </Button>
                  <Button href="/services" variant="secondary">
                    Browse services
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <ClosingCta />

      <JsonLd
        data={[
          faqSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />
    </>
  );
}
