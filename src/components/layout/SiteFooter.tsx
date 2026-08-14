import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button, ArrowRight } from "@/components/ui/Button";
import { WaveRule } from "@/components/ui/Wave";
import { bookHref, expansion, fullAddress, nav, site } from "@/content/site";
import { activeServices } from "@/content/services";

const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  tiktok: "TikTok",
  linkedin: "LinkedIn",
};

export function SiteFooter() {
  const socials = Object.entries(site.social).filter(([, url]) => url);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-abyss text-ivory">
      {/* a faint horizon line, low in the frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(120%_100%_at_50%_100%,rgba(78,143,163,0.22),transparent_70%)]"
      />

      <div className="u-container relative pt-20 pb-10 md:pt-28">
        {/* Closing invitation */}
        <div className="flex flex-col items-start justify-between gap-10 border-b border-ivory/12 pb-16 lg:flex-row lg:items-end">
          <div>
            <WaveRule className="mb-8 text-sea/60" />
            <h2 className="t-title max-w-xl font-display text-ivory">
              Your body already knows how to settle. Give it the hour.
            </h2>
          </div>
          <Button href={bookHref} variant="light" size="lg">
            {site.booking.label}
            <ArrowRight />
          </Button>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-3 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <Logo tone="light" showDescriptor />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/70">
              Expert massage and bodywork on the California coast — built around your body, your
              week, and how you want to feel when you leave.
            </p>
            {socials.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
                {socials.map(([key, url]) => (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-xs tracking-[0.14em] text-ivory/70 uppercase hover:text-ivory"
                    >
                      {socialLabels[key] ?? key}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:col-span-3">
            <h3 className="eyebrow text-ivory/60">Sessions</h3>
            <ul className="mt-6 space-y-3">
              {activeServices.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="link-underline text-sm text-ivory/70 hover:text-ivory"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="link-underline text-sm text-shoal hover:text-ivory"
                >
                  All services
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="eyebrow text-ivory/60">Explore</h3>
            <ul className="mt-6 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-ivory/70 hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/book" className="link-underline text-sm text-ivory/70 hover:text-ivory">
                  Book
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="eyebrow text-ivory/60">Visit</h3>
            <address className="mt-6 space-y-3 text-sm not-italic text-ivory/70">
              <p>{fullAddress}</p>
              <p>
                <a href={`tel:${site.contact.phoneHref}`} className="link-underline hover:text-ivory">
                  {site.contact.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.contact.email}`} className="link-underline hover:text-ivory">
                  {site.contact.email}
                </a>
              </p>
              <p className="pt-2 text-ivory/65">{site.hours.note}</p>
            </address>
          </div>
        </div>

        {/* What's coming — the brand is bigger than the current menu */}
        <div className="border-t border-ivory/12 py-10">
          <h3 className="eyebrow text-ivory/60">On the horizon</h3>
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2.5">
            {expansion.map((item) => (
              <li key={item.label}>
                {item.live && item.href ? (
                  <Link
                    href={item.href}
                    className="inline-block rounded-full border border-ivory/20 px-4 py-1.5 text-xs text-ivory/75 transition-colors hover:border-ivory/50 hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="inline-block rounded-full border border-ivory/20 px-4 py-1.5 text-xs text-ivory/60">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Local reach — genuinely useful, and good for local search */}
        <div className="border-t border-ivory/12 py-8">
          <p className="text-xs leading-relaxed text-ivory/60">
            <span className="text-ivory/80">Serving </span>
            {site.location.areasServed.join(" · ")}
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-ivory/12 pt-8 text-xs text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {site.location.city}, {site.location.regionName}.
          </p>
          <p className="max-w-lg sm:text-right">
            Massage and bodywork are offered for general wellbeing and relaxation, and are not a
            substitute for medical care.
          </p>
        </div>
      </div>
    </footer>
  );
}
