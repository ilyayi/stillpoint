/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — edit this file first.
 *  Everything here flows through the whole site: nav, footer, schema, SEO,
 *  booking buttons, contact links.
 *
 *  Items marked  ⚑ PLACEHOLDER  need your real business information before launch.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  /** ⚑ PLACEHOLDER — brand name. Chosen as a starting point, not a final answer.
   *  "Stillpoint" is a craniosacral term for the quiet pause between rhythms —
   *  it points at presence, and it does not lock the brand into "massage."
   *  Verify the name is available in your area before printing anything. */
  name: "Stillpoint",
  /** Used in the logo lockup under the wordmark, and in the footer. */
  descriptor: "Bodywork & Coastal Wellness",
  /** One line. Used for the meta description fallback and the footer. */
  tagline: "Expert massage and bodywork in Santa Barbara, California.",

  /** ⚑ PLACEHOLDER — the practitioner's name. Appears in the About signature,
   *  the schema markup, and the footer. */
  practitioner: {
    name: "[Your Name]",
    /** Shown under the name. Keep it factual — no invented credentials. */
    title: "Massage Therapist & Bodyworker",
  },

  /** ⚑ PLACEHOLDER — replace with your real contact details. */
  contact: {
    email: "hello@example.com",
    phone: "(805) 000-0000",
    /** Digits only, for tel: links. */
    phoneHref: "+18050000000",
  },

  location: {
    /** ⚑ PLACEHOLDER — street address. Leave `street` empty if you prefer not to
     *  publish it; the site and schema will fall back to city-level only. */
    street: "",
    city: "Santa Barbara",
    region: "CA",
    regionName: "California",
    postalCode: "93101",
    country: "US",
    /** Neighbourhoods and nearby towns you serve. Used in the footer and schema. */
    areasServed: [
      "Santa Barbara",
      "Montecito",
      "Goleta",
      "Carpinteria",
      "Summerland",
      "The Mesa",
      "Funk Zone",
      "Hope Ranch",
    ],
    /** Approximate coordinates for downtown Santa Barbara. Update if you publish
     *  a street address. */
    geo: { latitude: 34.4208, longitude: -119.6982 },
    /** ⚑ PLACEHOLDER — link to your Google Business Profile / map pin. */
    mapUrl: "https://www.google.com/maps/place/Santa+Barbara,+CA",
  },

  /** ─────────────────────────────────────────────────────────────────────────
   *  BOOKING — the single most important setting on the site.
   *
   *  Drop in the URL from your scheduling platform (Square Appointments, Acuity,
   *  Vagaro, Calendly, Schedulicity, Massagebook, Jane…) and every "Book" button
   *  on the site starts sending people there.
   *
   *  mode:
   *    "internal" → buttons go to /book, which shows your embed (or the setup
   *                 panel if `url` is still empty). Best for SEO and tracking.
   *    "external" → buttons link straight out to `url` in a new tab.
   *
   *  embed:
   *    "iframe"  → /book renders `url` in a responsive iframe.
   *    "link"    → /book shows a large call-to-action that opens `url`.
   *    "script"  → paste your provider's <script> snippet into
   *                src/components/booking/BookingEmbed.tsx (marked with a TODO).
   *  ───────────────────────────────────────────────────────────────────────── */
  booking: {
    /** ⚑ PLACEHOLDER — your scheduling link. */
    url: "",
    mode: "internal" as "internal" | "external",
    embed: "iframe" as "iframe" | "link" | "script",
    /** Text used on primary buttons across the site. */
    label: "Book a Session",
    shortLabel: "Book",
  },

  /** ⚑ PLACEHOLDER — hours. Set `byAppointment` true to show a line instead of
   *  a table. `schedule` still feeds the LocalBusiness schema. */
  hours: {
    byAppointment: true,
    note: "By appointment — including early mornings and evenings.",
    schedule: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "19:00" },
      { days: ["Saturday"], opens: "09:00", closes: "17:00" },
    ],
  },

  /** ⚑ PLACEHOLDER — remove any you do not use; the footer hides empty ones. */
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
    tiktok: "",
    linkedin: "",
  },

  /** Production URL. Used for canonical links, sitemap and Open Graph. */
  url: "https://www.stillpointsb.com",

  /**
   * Prices are hidden until you are ready. Set `showPrices: true` and fill in
   * `startingPrice` on each service in src/content/services.ts — every price on
   * the site appears at once. Until then, cards read "Pricing on request".
   */
  showPrices: false,
  currency: "USD",

  /** Shown in the booking policy areas and the FAQ. Edit to match your policy. */
  policies: {
    cancellation:
      "Please give at least 24 hours' notice to change or cancel a session. Late cancellations and missed appointments may be charged in full, out of respect for the time held for you.",
    arrival: "Arriving five to ten minutes early gives us time to talk before we begin.",
  },
} as const;

/** Primary navigation. Add a route here and it appears in the header and footer. */
export const nav = [
  { label: "Services", href: "/services" },
  { label: "The Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Where the brand is going. These render as a quiet "what's coming" row in the
 * footer and on the About page. Set `live: true` and add an `href` once a
 * section exists — the component turns it into a link automatically.
 */
export type ExpansionItem = { label: string; live: boolean; href?: string };

export const expansion: ExpansionItem[] = [
  { label: "Stretching & Mobility Sessions", live: false, href: "/services/stretching-mobility" },
  { label: "Workshops", live: false },
  { label: "Coastal Wellness Retreats", live: false },
  { label: "Memberships", live: false },
  { label: "Gift Cards", live: false },
  { label: "Corporate & Team Wellness", live: false },
  { label: "Events", live: false },
];

export const fullAddress = [
  site.location.street,
  `${site.location.city}, ${site.location.region} ${site.location.postalCode}`,
]
  .filter(Boolean)
  .join(", ");

/** True when the owner has wired up a real scheduling link. */
export const bookingReady = site.booking.url.length > 0;

/** Where a "Book" button should point. */
export const bookHref =
  bookingReady && site.booking.mode === "external" ? site.booking.url : "/book";
