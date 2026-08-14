import Image from "next/image";
import { Button, ArrowRight } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { WaveRule } from "@/components/ui/Wave";
import { bookHref, fullAddress, site } from "@/content/site";
import { blurDataURL, images } from "@/lib/images";

export function ClosingCta({
  title = "An hour is enough to change the week.",
  lead = "Book a session, or send a note first if you would rather talk it through. Either way, we will find the work your body is actually asking for.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-abyss">
      <div className="absolute inset-0 -z-10 scale-110">
        <Parallax distance={60} className="absolute inset-0">
          <Image
            src={images.tideline.src}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-cover opacity-70"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/85 via-abyss/70 to-abyss/90" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="u-container py-28 text-center md:py-40">
        <Reveal>
          <WaveRule className="mx-auto text-sea/60" />
        </Reveal>
        <Reveal delay={80}>
          <h2 className="t-display mx-auto mt-9 max-w-3xl font-display text-ivory">{title}</h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="t-lead mx-auto mt-7 u-measure text-ivory/75">{lead}</p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-11 flex flex-wrap justify-center gap-4">
            <Button href={bookHref} variant="light" size="lg">
              {site.booking.label}
              <ArrowRight />
            </Button>
            <Button href="/contact" variant="outline-light" size="lg">
              Get in touch
            </Button>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <dl className="mx-auto mt-20 grid max-w-3xl gap-10 border-t border-ivory/15 pt-10 text-left sm:grid-cols-3">
            <div>
              <dt className="eyebrow text-ivory/65">Where</dt>
              <dd className="mt-3 text-sm text-ivory/75">{fullAddress}</dd>
            </div>
            <div>
              <dt className="eyebrow text-ivory/65">When</dt>
              <dd className="mt-3 text-sm text-ivory/75">{site.hours.note}</dd>
            </div>
            <div>
              <dt className="eyebrow text-ivory/65">Reach me</dt>
              <dd className="mt-3 text-sm text-ivory/75">
                <a href={`tel:${site.contact.phoneHref}`} className="link-underline block">
                  {site.contact.phone}
                </a>
                <a href={`mailto:${site.contact.email}`} className="link-underline mt-1 block">
                  {site.contact.email}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
