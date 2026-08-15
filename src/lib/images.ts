/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  IMAGE SLOTS
 *
 *  Every image on the site is referenced through this file. To swap one out,
 *  drop your file into /public/images/ and change the `src` below. Nothing else
 *  needs to change — sizing, cropping, lazy-loading, blur-up and modern formats
 *  are handled by the components.
 *
 *  The photographs are sourced and colour-graded by scripts/build-photos.py, so
 *  they share one treatment rather than looking like a stock-photo grab bag.
 *  See CREDITS.md for provenance and IMAGES.md for the shot list.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type ImageSlot = {
  src: string;
  /** Alt text. Describe the image; leave "" only for purely decorative art. */
  alt: string;
};

export const images = {
  /** Homepage hero. Wide, and dark enough in the lower half to hold white type. */
  hero: {
    src: "/images/hero/dawn-coast.jpg",
    alt: "A wave breaking over rock at dawn, pale light on the Pacific",
  },
  /** Portrait crop of the hero, available if you want separate mobile framing. */
  heroPortrait: {
    src: "/images/hero/dawn-coast-portrait.jpg",
    alt: "A wave breaking over rock at dawn on the California coast",
  },
  /** Philosophy section — tall crop, quiet, plenty of space. */
  philosophy: {
    src: "/images/coast/aerial-sand.jpg",
    alt: "Turquoise water meeting pale sand, seen from directly above",
  },
  /** Expertise section — sits behind type, so it stays dark and low-detail. */
  expertise: {
    src: "/images/coast/dark-sea.jpg",
    alt: "The dark surface of the open ocean at dusk",
  },
  /** Full-bleed immersive break — "Slow down. Breathe deep. Be here." */
  coastalBreak: {
    src: "/images/coast/aerial-foam.jpg",
    alt: "Surf drawing back across wet sand, seen from above",
  },
  /** Services hero and the closing call-to-action band. */
  tideline: {
    src: "/images/coast/turquoise.jpg",
    alt: "Clear turquoise water breaking into white foam",
  },
  /** Experience hero and the 404 page. */
  openWater: {
    src: "/images/coast/sunrise-shore.jpg",
    alt: "Sunrise over a calm shoreline, light spilling across wet sand",
  },
  /** FAQ hero. */
  sand: {
    src: "/images/coast/headland.jpg",
    alt: "Coastal ridges fading into morning haze above the water",
  },
  /** About hero — the calm of the space itself. */
  aboutPortrait: {
    src: "/images/space/retreat.jpg",
    alt: "A quiet room opening onto planting and still water",
  },
  /** Contact hero, and the ground behind the About "place" section. */
  aboutLight: {
    src: "/images/work/oil.jpg",
    alt: "Massage oil poured into an open hand in low warm light",
  },
  /** Open Graph / social sharing card. */
  og: {
    src: "/images/og/base.jpg",
    alt: "",
  },
} satisfies Record<string, ImageSlot>;

/**
 * ⚑ REPLACE ME FIRST — a photograph of the practitioner.
 *
 * This is the single highest-impact image on the whole site: people book a
 * person, not a service. Until a real portrait is set, the About page shows a
 * clearly-marked placeholder rather than a stranger from a stock library.
 *
 * Add e.g. /public/images/about/portrait.jpg and set:
 *   src: "/images/about/portrait.jpg", alt: "…"
 */
export const practitionerPortrait: ImageSlot | null = null;

/** Small blur-up placeholder — a single dark teal pixel, inlined. */
export const blurDataURL =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="#14384a"/></svg>`,
  ).toString("base64");

/** Pale version, for images that sit on ivory. */
export const blurDataURLLight =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="#e7ded1"/></svg>`,
  ).toString("base64");
