import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/layout/PageHero";
import { ClosingCta } from "@/components/shared/ClosingCta";
import { Button, ArrowRight } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { WaveRule } from "@/components/ui/Wave";
import { JsonLd } from "@/components/seo/JsonLd";
import { about } from "@/content/about";
import { bookHref, expansion, site } from "@/content/site";
import { blurDataURLLight, images, practitionerPortrait } from "@/lib/images";
import { breadcrumbSchema, buildMetadata, personSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "750+ hours of formal massage therapy education at Santa Barbara Body Therapy Institute, additional Genius of Flexibility / RFST training, and professional experience in a chiropractic and sports-care practice working with 50+ clients a week.",
  path: "/about",
  type: "profile",
  keywords: [
    "massage therapist Santa Barbara",
    "Santa Barbara Body Therapy Institute",
    "bodyworker Santa Barbara",
  ],
});

/** Shown until a real photograph is added to src/lib/images.ts. */
function PortraitSlot() {
  if (practitionerPortrait) {
    return (
      <div className="grain relative aspect-4/5 overflow-hidden rounded-[1.5rem] rounded-tl-[7rem]">
        <Image
          src={practitionerPortrait.src}
          alt={practitionerPortrait.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-4/5 flex-col items-center justify-center rounded-[1.5rem] rounded-tl-[7rem] border border-dashed border-clay/70 bg-shell/70 p-10 text-center">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-9 w-9 text-clay">
        <path
          d="M4 18.5 9 13l3.5 3.5L16 13l4 4.5M4 5h16v14H4z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="9" r="1.6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <p className="eyebrow mt-6 text-clay-deep">Your portrait</p>
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-faint">
        The most valuable image on this site. People book a person, not a service — a warm, natural
        photograph of you belongs here.
      </p>
      <p className="mt-5 max-w-xs text-xs leading-relaxed text-ink-faint">
        Add <code className="rounded bg-deep/8 px-1 py-0.5">/public/images/about/portrait.jpg</code>{" "}
        and set <code className="rounded bg-deep/8 px-1 py-0.5">practitionerPortrait</code> in{" "}
        <code className="rounded bg-deep/8 px-1 py-0.5">src/lib/images.ts</code>.
      </p>
    </div>
  );
}

export default function AboutPage() {
  const hasPersonalNote = about.personalNote.trim().length > 0;

  return (
    <>
      <PageHero
        eyebrow={about.eyebrow}
        title={about.title}
        lead={about.lead}
        image={images.aboutPortrait}
      />

      {/* Story + portrait */}
      <Section className="bg-ivory" size="lg">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <div className="space-y-7 text-ink-soft u-measure-wide">
              {about.story.map((paragraph, i) => (
                <Reveal key={i} delay={i * 60}>
                  <p className={i === 0 ? "t-lead text-deep" : "leading-[1.85]"}>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            {hasPersonalNote && (
              <Reveal>
                <blockquote className="mt-14 border-l-2 border-sea/60 pl-7">
                  <p className="font-display text-[1.35rem] leading-[1.6] text-deep italic">
                    {about.personalNote}
                  </p>
                  <footer className="mt-6 text-sm">
                    <span className="block tracking-[0.12em] text-deep uppercase">
                      {site.practitioner.name}
                    </span>
                    <span className="mt-1 block text-ink-faint">{site.practitioner.title}</span>
                  </footer>
                </blockquote>
              </Reveal>
            )}

            <Reveal>
              <Button href={bookHref} className="mt-12">
                {site.booking.label}
                <ArrowRight />
              </Button>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <div className="lg:sticky lg:top-28">
                <PortraitSlot />
                <p className="mt-6 flex items-center gap-3 text-xs tracking-[0.14em] text-ink-faint uppercase">
                  <span aria-hidden className="h-px w-8 bg-dune" />
                  {site.location.city}, {site.location.regionName}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Training & experience */}
      <Section className="bg-deep text-ivory" size="lg">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Training & experience"
              tone="light"
              size="title"
              title="Where the hands were trained"
              lead="Stated plainly, with nothing added."
            />
          </div>

          <div className="lg:col-span-8">
            <ol className="space-y-px overflow-hidden rounded-2xl">
              {about.background.map((item, i) => (
                <Reveal key={item.title} delay={i * 90} as="li">
                  <div className="bg-ivory/[0.055] p-8 md:p-10">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="font-display text-[1.5rem] text-ivory">{item.title}</h3>
                      <span className="text-xs tracking-[0.14em] text-shoal uppercase">
                        {item.meta}
                      </span>
                    </div>
                    <p className="mt-4 text-ivory/65">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={200}>
              <div className="mt-10">
                <h3 className="eyebrow text-ivory/65">The full toolkit</h3>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {about.techniques.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-ivory/18 px-4 py-2 text-sm text-ivory/75"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Principles */}
      <Section className="bg-shell" size="lg">
        <SectionHeading
          eyebrow="How I work"
          title="Three things that shape every session"
          align="center"
        />
        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {about.principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 110}>
              <div className="h-full border-t border-dune pt-8">
                <span className="font-display text-sm text-clay-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-[1.6rem] leading-snug text-deep">
                  {p.title}
                </h3>
                <p className="mt-4 leading-relaxed text-ink-soft">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Place — why Santa Barbara matters to the work */}
      <Section className="relative isolate overflow-hidden bg-abyss text-ivory" size="lg">
        <div className="absolute inset-0 -z-10 scale-110">
          <Parallax distance={50} className="absolute inset-0">
            <Image
              src={images.aboutLight.src}
              alt=""
              fill
              sizes="100vw"
              placeholder="blur"
              blurDataURL={blurDataURLLight}
              className="object-cover opacity-30"
            />
          </Parallax>
          <div className="absolute inset-0 bg-abyss/70" />
          <div className="grain absolute inset-0" />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <WaveRule className="mx-auto text-sea/60" />
          </Reveal>
          <Reveal delay={80}>
            <h2 className="t-title mt-8 font-display text-ivory">
              A practice shaped by where it sits
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="t-lead mt-7 text-ivory/75">
              Santa Barbara moves at a particular pace. People here surf before work, hike the front
              country at lunch, and still spend eight hours at a desk. That mix — active bodies with
              modern habits — is exactly what this practice is built for.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-6 text-ivory/55">
              Serving {site.location.areasServed.slice(0, 5).join(", ")} and the surrounding coast.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Where this is going */}
      <Section className="bg-ivory" size="lg">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>What&rsquo;s next</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="t-title mt-6 font-display text-deep">
                Massage is the foundation, not the ceiling.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <p className="t-lead text-ink-soft">
                The hands-on work comes first, and it always will. But the thinking behind it —
                presence, movement, recovery, feeling at home in your body — reaches further than an
                hour on a table.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 text-ink-soft">
                Mobility programming, workshops, coastal wellness experiences and retreats are all
                part of where this is heading. If any of it sounds like something you would want,
                say so — early interest shapes what gets built first.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <ul className="mt-9 flex flex-wrap gap-2.5">
                {expansion.map((item) => (
                  <li
                    key={item.label}
                    className="rounded-full border border-dune px-4 py-2 text-sm text-ink-soft"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={300}>
              <Button href="/contact" variant="quiet" className="mt-10">
                Tell me what you&rsquo;d want first
                <ArrowRight />
              </Button>
            </Reveal>
          </div>
        </div>
      </Section>

      <ClosingCta
        title="Come see what trained hands notice."
        lead="Book a session, or send a note with what has been bothering you and I will tell you honestly whether this is the right work for it."
      />

      <JsonLd
        data={[
          personSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
    </>
  );
}
