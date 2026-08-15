import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/Button";
import { bookHref, site } from "@/content/site";
import { durationLabel, formatPrice, startingPrice, type Service } from "@/content/services";
import { blurDataURLLight } from "@/lib/images";

/** Prices stay hidden entirely while site.showPrices is false. */
export function priceLabel(service: Service) {
  const from = startingPrice(service);
  if (site.showPrices && from !== null) {
    return `From ${formatPrice(from)}`;
  }
  return "Pricing on request";
}

export function ServiceCard({
  service,
  priority = false,
}: {
  service: Service;
  priority?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] rounded-tr-[4.5rem] border border-dune/50 bg-shell/60 transition-all duration-700 [transition-timing-function:var(--ease-tide)] hover:-translate-y-1.5 hover:border-dune hover:bg-shell hover:shadow-[0_36px_70px_-46px_rgba(6,30,41,0.5)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          placeholder="blur"
          blurDataURL={blurDataURLLight}
          className="object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-tide)] group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss/45 to-transparent opacity-70" />
        <span className="eyebrow absolute top-5 left-6 text-ivory/85">{service.category}</span>
      </div>

      <div className="flex flex-1 flex-col p-7 md:p-8">
        <h3 className="font-display text-[1.6rem] leading-tight text-deep">
          {/* The whole card is clickable, but only the title is a link — one
              tab stop per card, and the URL still previews on hover. */}
          <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0">
            {service.name}
          </Link>
        </h3>

        <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-ink-soft">{service.summary}</p>

        <div className="mt-6 border-t border-dune/50 pt-5">
          <p className="text-[0.8125rem] leading-relaxed text-ink-faint">
            <span className="tracking-[0.12em] text-ink-soft uppercase">Good for</span>
            <span className="mt-1.5 block">{service.goodFor.slice(0, 2).join(" · ")}</span>
          </p>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-6 text-[0.8125rem]">
          <span className="text-ink-soft">{durationLabel(service.durations)}</span>
          <span className="text-deep">{priceLabel(service)}</span>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-[0.75rem] tracking-[0.16em] text-ocean uppercase">
            Learn more
            <ArrowRight />
          </span>
          <Link
            href={bookHref}
            className="relative z-10 rounded-full border border-deep/25 px-5 py-2 text-[0.6875rem] tracking-[0.16em] text-deep uppercase transition-colors duration-500 hover:border-deep hover:bg-deep hover:text-ivory"
          >
            {site.booking.shortLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
