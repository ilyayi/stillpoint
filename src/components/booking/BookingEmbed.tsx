import { Button, ArrowRight } from "@/components/ui/Button";
import { bookingReady, site } from "@/content/site";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE BOOKING INTEGRATION POINT
 *
 *  Set `booking.url` in src/content/site.ts and this component starts working.
 *  Choose how it renders with `booking.embed`:
 *
 *   "iframe"  Square Appointments, Acuity, Vagaro, Schedulicity, Calendly,
 *             Massagebook, Jane — all provide an embeddable URL. Paste it in.
 *
 *   "link"    A large button that opens your scheduler in a new tab. The safest
 *             option, and the fastest to set up.
 *
 *   "script"  Some providers give you a <script> snippet instead of a URL.
 *             Paste it where the TODO is marked below, then set embed:"script".
 *
 *  Until a URL is set, visitors see the direct contact fallback below — so the
 *  page is never a dead end.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function BookingEmbed() {
  if (bookingReady && site.booking.embed === "iframe") {
    return (
      <div className="overflow-hidden rounded-3xl border border-dune/50 bg-white shadow-[0_30px_80px_-50px_rgba(6,30,41,0.45)]">
        <iframe
          src={site.booking.url}
          title={`Book an appointment with ${site.name}`}
          loading="lazy"
          className="h-[820px] w-full border-0 md:h-[900px]"
          allow="payment"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  if (bookingReady && site.booking.embed === "link") {
    return (
      <div className="rounded-3xl border border-dune/50 bg-shell p-10 text-center md:p-16">
        <h2 className="t-title font-display text-deep">Choose a time that suits you</h2>
        <p className="t-lead mx-auto mt-5 u-measure text-ink-soft">
          Availability, session lengths and pricing are all on the booking page.
        </p>
        <Button href={site.booking.url} size="lg" className="mt-10" external>
          {site.booking.label}
          <ArrowRight />
        </Button>
      </div>
    );
  }

  if (bookingReady && site.booking.embed === "script") {
    return (
      <div className="rounded-3xl border border-dune/50 bg-white p-6">
        {/* TODO: paste your scheduling provider's embed snippet here. In Next.js,
            wrap third-party scripts with next/script:

              import Script from "next/script";
              <Script src="https://…/embed.js" strategy="lazyOnload" />
              <div id="provider-embed-target" />
        */}
        <div id="booking-embed-target" className="min-h-[600px]" />
      </div>
    );
  }

  /* ── Not configured yet ─────────────────────────────────────────────────── */
  return (
    <div className="space-y-8">
      {/* Visitor-facing fallback: real, working ways to get in touch. */}
      <div className="rounded-3xl border border-dune/50 bg-shell p-10 text-center md:p-16">
        <h2 className="t-title font-display text-deep">Booking by phone or email</h2>
        <p className="t-lead mx-auto mt-5 u-measure text-ink-soft">
          Online scheduling is being set up. In the meantime, reach out directly and we will find a
          time that works — tell me roughly what you are looking for and how long you would like.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href={`tel:${site.contact.phoneHref}`} size="lg">
            Call {site.contact.phone}
          </Button>
          <Button href={`mailto:${site.contact.email}`} variant="secondary" size="lg">
            Email
          </Button>
        </div>
      </div>

      {/* Owner-facing setup note. Delete this block once booking is live. */}
      <div className="rounded-2xl border border-dashed border-gold/70 bg-gold/[0.07] p-6 text-sm leading-relaxed text-ink-soft">
        <p className="eyebrow text-gold-deep">Setup — remove before launch</p>
        <p className="mt-3">
          To turn on online booking, open{" "}
          <code className="rounded bg-deep/8 px-1.5 py-0.5 text-[0.8em]">src/content/site.ts</code>{" "}
          and set <code className="rounded bg-deep/8 px-1.5 py-0.5 text-[0.8em]">booking.url</code>{" "}
          to your scheduling link (Square Appointments, Acuity, Vagaro, Schedulicity, Calendly,
          Massagebook, Jane…). Choose{" "}
          <code className="rounded bg-deep/8 px-1.5 py-0.5 text-[0.8em]">booking.embed</code> —{" "}
          <em>iframe</em> to show the scheduler inline, or <em>link</em> to send people to it. Every
          &ldquo;{site.booking.label}&rdquo; button across the site updates automatically.
        </p>
      </div>
    </div>
  );
}
