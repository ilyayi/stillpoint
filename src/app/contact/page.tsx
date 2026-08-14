import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button, ArrowRight } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, Eyebrow } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { bookHref, fullAddress, site } from "@/content/site";
import { images } from "@/lib/images";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch about massage and bodywork in ${site.location.city}. Ask a question, describe what has been bothering you, or arrange a session directly.`,
  path: "/contact",
  keywords: ["massage Santa Barbara contact", "book massage Santa Barbara"],
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell me what's going on."
        lead="The more you tell me beforehand, the better the first session is. Describe what has been bothering you and I'll tell you honestly whether this is the right work for it."
        image={images.aboutLight}
        size="sm"
      />

      <Section className="bg-ivory" size="lg">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Send a note</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="t-title mt-6 mb-10 font-display text-deep">
                A few details, and I&rsquo;ll come back to you personally.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <ContactForm />
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="lg:sticky lg:top-28">
                <div className="rounded-[1.5rem] rounded-tr-[4rem] border border-dune/60 bg-shell p-8 md:p-10">
                  <h2 className="font-display text-2xl text-deep">Direct</h2>
                  <dl className="mt-8 space-y-6 text-sm">
                    <div>
                      <dt className="eyebrow text-ink-faint">Phone</dt>
                      <dd className="mt-2">
                        <a
                          href={`tel:${site.contact.phoneHref}`}
                          className="link-underline text-lg text-deep"
                        >
                          {site.contact.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-ink-faint">Email</dt>
                      <dd className="mt-2">
                        <a
                          href={`mailto:${site.contact.email}`}
                          className="link-underline break-all text-deep"
                        >
                          {site.contact.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-ink-faint">Studio</dt>
                      <dd className="mt-2 text-ink-soft">
                        <address className="not-italic">{fullAddress}</address>
                        <a
                          href={site.location.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline mt-2 inline-block text-ocean"
                        >
                          Open in maps
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-ink-faint">Hours</dt>
                      <dd className="mt-2 text-ink-soft">
                        {site.hours.note}
                        {!site.hours.byAppointment && (
                          <ul className="mt-3 space-y-1">
                            {site.hours.schedule.map((block) => (
                              <li key={block.days.join()}>
                                {block.days[0]}
                                {block.days.length > 1 && `–${block.days[block.days.length - 1]}`}:{" "}
                                {block.opens}–{block.closes}
                              </li>
                            ))}
                          </ul>
                        )}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-9 border-t border-dune/60 pt-8">
                    <p className="text-sm text-ink-soft">
                      Already know what you want? Skip the note and pick a time.
                    </p>
                    <Button href={bookHref} className="mt-6 w-full">
                      {site.booking.label}
                      <ArrowRight />
                    </Button>
                  </div>
                </div>

                <p className="mt-8 rounded-2xl border border-dune/50 p-6 text-xs leading-relaxed text-ink-faint">
                  Serving {site.location.areasServed.join(", ")}. Massage and bodywork are offered
                  for general wellbeing and recovery, and are not a substitute for medical care.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: `Contact ${site.name}`,
            url: `${site.url}/contact`,
          },
        ]}
      />
    </>
  );
}
