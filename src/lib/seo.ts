import type { Metadata } from "next";
import { fullAddress, site } from "@/content/site";
import { activeServices, type Service } from "@/content/services";
import { faqs } from "@/content/faq";
import { images } from "@/lib/images";

/**
 * Where the site actually lives. Resolved at build time, in this order:
 *
 *   1. NEXT_PUBLIC_SITE_URL   — set this once you point a custom domain here
 *   2. RAILWAY_PUBLIC_DOMAIN  — Railway sets this for you automatically
 *   3. site.url               — the value in src/content/site.ts
 *
 * This is what canonical links, the sitemap, and social share cards use, so on
 * Railway they point at the real deployment from the very first build instead
 * of at a domain that does not exist yet. Changing it needs a redeploy.
 */
function resolveBaseUrl() {
  const candidate =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.RAILWAY_PUBLIC_DOMAIN?.trim() ||
    site.url;
  const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return site.url.replace(/\/$/, "");
  }
}

export const BASE_URL = resolveBaseUrl();

const abs = (path: string) => `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * One helper for every page's metadata, so titles, canonicals, Open Graph and
 * Twitter cards can never drift apart.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  keywords,
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article" | "profile";
}): Metadata {
  const url = abs(path);
  const ogImage = abs(image ?? images.og.src);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: "en_US",
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${site.name} — ${title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [ogImage],
    },
  };
}

/* ─────────────────────────────────────────────────────── structured data ── */

const postalAddress = {
  "@type": "PostalAddress",
  ...(site.location.street ? { streetAddress: site.location.street } : {}),
  addressLocality: site.location.city,
  addressRegion: site.location.region,
  postalCode: site.location.postalCode,
  addressCountry: site.location.country,
};

const openingHours = site.hours.schedule.map((block) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: block.days.map((d) => `https://schema.org/${d}`),
  opens: block.opens,
  closes: block.closes,
}));

const sameAs = Object.values(site.social).filter(Boolean);

/**
 * The business itself. Typed as both LocalBusiness and HealthAndBeautyBusiness,
 * with `additionalType` naming massage therapy explicitly — schema.org has no
 * dedicated MassageTherapist class, so this is the accurate way to say it.
 *
 * No aggregateRating or review markup is emitted: there are no real reviews yet,
 * and inventing them would be both dishonest and a search-guidelines violation.
 * Once you collect genuine reviews, add them here.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
    "@id": `${BASE_URL}/#business`,
    additionalType: [
      "https://en.wikipedia.org/wiki/Massage",
      "https://www.wikidata.org/wiki/Q179467",
    ],
    name: site.name,
    alternateName: `${site.name} ${site.descriptor}`,
    description: `${site.tagline} Therapeutic massage, deep tissue, sports recovery, stretching and mobility, and specialized bodywork in ${site.location.city}, ${site.location.regionName}.`,
    url: BASE_URL,
    telephone: site.contact.phone,
    email: site.contact.email,
    image: abs(images.hero.src),
    logo: abs("/icon.svg"),
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.location.geo.latitude,
      longitude: site.location.geo.longitude,
    },
    hasMap: site.location.mapUrl,
    areaServed: site.location.areasServed.map((name) => ({
      "@type": "City",
      name,
      containedInPlace: { "@type": "State", name: site.location.regionName },
    })),
    openingHoursSpecification: openingHours,
    availableLanguage: "English",
    currenciesAccepted: site.currency,
    knowsAbout: [
      "Therapeutic massage",
      "Deep tissue massage",
      "Trigger point therapy",
      "Table Shiatsu",
      "Lymphatic drainage",
      "Cranial-sacral technique",
      "Assisted stretching",
      "Mobility work",
      "Sports and recovery massage",
      "Relaxation massage",
    ],
    employee: {
      "@type": "Person",
      name: site.practitioner.name,
      jobTitle: site.practitioner.title,
      description:
        "750+ hours of formal massage therapy education at Santa Barbara Body Therapy Institute, additional Genius of Flexibility / RFST training, and professional experience in a chiropractic and sports-care practice.",
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Santa Barbara Body Therapy Institute",
      },
    },
    ...(sameAs.length ? { sameAs } : {}),
    ...(site.booking.url ? { potentialAction: bookAction() } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Massage & Bodywork Sessions",
      itemListElement: activeServices.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.summary,
          url: abs(`/services/${service.slug}`),
        },
        ...(site.showPrices && service.startingPrice
          ? {
              priceSpecification: {
                "@type": "PriceSpecification",
                price: service.startingPrice,
                priceCurrency: site.currency,
                valueAddedTaxIncluded: true,
              },
            }
          : {}),
      })),
    },
  };
}

function bookAction() {
  return {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: site.booking.url,
      inLanguage: "en-US",
      actionPlatform: [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/MobileWebPlatform",
      ],
    },
    result: { "@type": "Reservation", name: "Massage appointment" },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: site.name,
    description: site.tagline,
    publisher: { "@id": `${BASE_URL}/#business` },
    inLanguage: "en-US",
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.summary,
    url: abs(`/services/${service.slug}`),
    image: abs(service.image),
    category: service.category,
    provider: { "@id": `${BASE_URL}/#business` },
    areaServed: site.location.areasServed.map((name) => ({ "@type": "City", name })),
    audience: { "@type": "Audience", audienceType: service.goodFor.join("; ") },
    ...(site.showPrices && service.startingPrice
      ? {
          offers: {
            "@type": "Offer",
            price: service.startingPrice,
            priceCurrency: site.currency,
            availability: "https://schema.org/InStock",
            url: abs("/book"),
          },
        }
      : {}),
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

/** Convenience for pages that describe the practitioner. */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.practitioner.name,
    jobTitle: site.practitioner.title,
    worksFor: { "@id": `${BASE_URL}/#business` },
    address: postalAddress,
    url: abs("/about"),
  };
}

export const localSummary = `${site.name} — massage therapy and bodywork in ${site.location.city}, ${site.location.regionName}. ${fullAddress}.`;
