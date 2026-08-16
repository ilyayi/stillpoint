import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/layout/PageHero";
import { ClosingCta } from "@/components/shared/ClosingCta";
import { ServiceCard, priceLabel } from "@/components/services/ServiceCard";
import { Button, ArrowRight } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, Eyebrow } from "@/components/ui/Section";
import { PackageNote } from "@/components/shared/PackageNote";
import { WaveRule } from "@/components/ui/Wave";
import { JsonLd } from "@/components/seo/JsonLd";
import { activeServices, formatPrice, getService } from "@/content/services";
import { bookHref, site } from "@/content/site";
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo";

export function generateStaticParams() {
  return activeServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: `${service.name} in ${site.location.city}`,
    description: `${service.summary} Sessions of ${service.durations
      .map((d) => `${d.minutes} minutes`)
      .join(", ")} in ${site.location.city}, California.`,
    path: `/services/${service.slug}`,
    image: service.image,
    keywords: [
      `${service.name.toLowerCase()} ${site.location.city}`,
      `${service.name.toLowerCase()} near me`,
      "massage Santa Barbara",
      "bodywork Santa Barbara",
    ],
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <PageHero
        eyebrow={service.category}
        title={service.name}
        lead={service.tagline}
        image={{ src: service.image, alt: "" }}
        size="sm"
      />

      <Section className="bg-ivory" size="md">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* The work itself */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="t-lead text-deep">{service.summary}</p>
            </Reveal>

            <div className="mt-10 space-y-6 text-ink-soft u-measure-wide">
              {service.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 70}>
                  <p className="leading-[1.8]">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <WaveRule className="mt-14" />
            </Reveal>

            <Reveal delay={60}>
              <div className="mt-12">
                <Eyebrow>What the session includes</Eyebrow>
                <ul className="mt-7 space-y-4">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-4 text-ink-soft">
                      <span
                        aria-hidden
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sea"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Booking rail */}
          <aside className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="lg:sticky lg:top-28">
                <div className="rounded-[1.5rem] rounded-tr-[4rem] border border-dune/60 bg-shell p-8 md:p-10">
                  <h2 className="font-display text-2xl text-deep">Book this session</h2>

                  <dl className="mt-8 space-y-5 text-sm">
                    <div className="border-b border-dune/50 pb-5">
                      <dt className="tracking-[0.12em] text-ink-faint uppercase">Sessions</dt>
                      <dd className="mt-4 space-y-3">
                        {service.durations.map((d) => (
                          <div
                            key={d.minutes}
                            className="flex items-baseline justify-between gap-4"
                          >
                            <span className="text-deep">
                              {d.minutes} min
                              {d.note && (
                                <span className="ml-2 text-xs text-ocean italic">{d.note}</span>
                              )}
                            </span>
                            {site.showPrices && d.price !== undefined && (
                              <span className="font-display text-lg leading-none text-deep">
                                {formatPrice(d.price)}
                              </span>
                            )}
                          </div>
                        ))}
                      </dd>
                    </div>
                    {!site.showPrices && (
                      <div className="flex items-baseline justify-between gap-4 border-b border-dune/50 pb-5">
                        <dt className="tracking-[0.12em] text-ink-faint uppercase">Investment</dt>
                        <dd className="text-deep">{priceLabel(service)}</dd>
                      </div>
                    )}
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="tracking-[0.12em] text-ink-faint uppercase">Where</dt>
                      <dd className="text-deep">
                        {site.location.city}, {site.location.region}
                      </dd>
                    </div>
                  </dl>

                  <PackageNote variant="inline" className="mt-5 border-t border-dune/50 pt-5" />

                  <Button href={bookHref} size="lg" className="mt-7 w-full">
                    {site.booking.label}
                    <ArrowRight />
                  </Button>
                  <p className="mt-5 text-center text-xs text-ink-faint">
                    Not sure this is the right fit?{" "}
                    <Link href="/contact" className="link-underline text-ocean">
                      Ask first
                    </Link>
                    .
                  </p>
                </div>

                <div className="mt-8 rounded-[1.5rem] border border-dune/50 p-8 md:p-10">
                  <Eyebrow>Often a good fit for</Eyebrow>
                  <ul className="mt-6 space-y-3.5 text-[0.9375rem] text-ink-soft">
                    {service.goodFor.map((item) => (
                      <li key={item} className="flex gap-3.5">
                        <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-dune" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-7 border-t border-dune/50 pt-5 text-xs leading-relaxed text-ink-faint">
                    Offered for general wellbeing and recovery. If you are managing a diagnosed
                    condition, are pregnant, or are recovering from surgery or an acute injury,
                    please check with your physician first and let me know before we begin.
                  </p>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <Section className="bg-shell" size="md">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Reveal>
                <Eyebrow>You might also consider</Eyebrow>
              </Reveal>
              <Reveal delay={70}>
                <h2 className="t-title mt-5 font-display text-deep">
                  These pair well with {service.name.toLowerCase()}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <Button href="/services" variant="secondary" size="sm">
                All services
                <ArrowRight />
              </Button>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {related.map((item, i) => (
              <Reveal key={item.slug} delay={i * 90}>
                <div className="h-full">
                  <ServiceCard service={item} />
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <ClosingCta />

      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        ]}
      />
    </>
  );
}
