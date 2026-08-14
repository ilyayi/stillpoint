import Image from "next/image";
import { Button, ArrowRight } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollCue } from "@/components/ui/Wave";
import { bookHref, site } from "@/content/site";
import { blurDataURL, images } from "@/lib/images";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-abyss md:min-h-svh">
      {/* Image. Drifts almost imperceptibly — the page should feel like it is breathing. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={images.hero.src}
          alt={images.hero.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blurDataURL}
          className="animate-drift object-cover object-[62%_center] md:object-center"
        />
        <div className="scrim-bottom absolute inset-0" />
        {/* Keeps the transparent header readable over the bright horizon band. */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-abyss/65 to-transparent" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="u-container relative pt-32 pb-12 md:pb-16">
        <Reveal>
          <span className="eyebrow flex items-center gap-3 text-ivory/70">
            <span aria-hidden className="h-px w-8 bg-current opacity-60" />
            {site.location.city}, {site.location.regionName}
          </span>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="t-hero mt-8 max-w-[15ch] font-display text-ivory">
            Come back to yourself.
          </h1>
        </Reveal>

        <Reveal delay={230}>
          <p className="t-lead mt-8 max-w-xl text-ivory/80">
            Expert massage and bodywork designed to help you slow down, reconnect with your body,
            and feel more present.
          </p>
        </Reveal>

        <Reveal delay={330}>
          <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={bookHref} variant="light" size="lg">
              {site.booking.label}
              <ArrowRight />
            </Button>
            <Button href="/services" variant="outline-light" size="lg">
              Explore Services
            </Button>
          </div>
        </Reveal>

        {/* Quiet credibility, right where the eye lands after the buttons. */}
        <Reveal delay={430}>
          <div className="mt-14 flex flex-wrap items-end justify-between gap-8 border-t border-ivory/15 pt-7">
            <dl className="flex flex-wrap gap-x-10 gap-y-4 text-ivory/75">
              {[
                { t: "750+ hours", d: "Formal massage training" },
                { t: "50+ clients weekly", d: "Chiropractic & sports-care practice" },
                { t: "20–120 min", d: "Focused to full-length sessions" },
              ].map((item) => (
                <div key={item.t}>
                  <dt className="font-display text-lg text-ivory">{item.t}</dt>
                  <dd className="mt-1 text-[0.8125rem] tracking-wide text-ivory/55">{item.d}</dd>
                </div>
              ))}
            </dl>
            <ScrollCue className="max-lg:hidden" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
