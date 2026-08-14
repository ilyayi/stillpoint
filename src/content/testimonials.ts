/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  TESTIMONIALS
 *
 *  ⚑ THIS ARRAY IS INTENTIONALLY EMPTY. No testimonials have been invented.
 *
 *  While it is empty, the site shows clearly-labelled placeholder cards so you
 *  can see the finished design. Add real client words below and the placeholders
 *  disappear automatically — nothing else to change.
 *
 *  Before you publish: either add real testimonials, or set
 *  `showPlaceholders: false` to hide the section entirely.
 *
 *  A note on collecting them: ask after a good session, request permission in
 *  writing, and use first name + last initial unless the client says otherwise.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Testimonial = {
  /** The client's words, unedited beyond light trimming. */
  quote: string;
  /** e.g. "Marisa L." */
  name: string;
  /** Optional context: "Runner, Santa Barbara" or "Client since 2023". */
  context?: string;
  /** Optional — links the quote to a service slug. */
  service?: string;
};

export const testimonials: Testimonial[] = [
  // {
  //   quote: "…",
  //   name: "First name + last initial",
  //   context: "Runner, Santa Barbara",
  //   service: "sports-recovery",
  // },
];

/** Set to false to hide the testimonial section until you have real quotes. */
export const showPlaceholders = true;

/** Shown only while `testimonials` is empty. */
export const placeholderPrompts = [
  {
    label: "Testimonial slot 01",
    hint: "A quote about the quality of the hands-on work — depth, precision, what finally shifted.",
  },
  {
    label: "Testimonial slot 02",
    hint: "A quote from an athlete or an active client about recovery, range or performance.",
  },
  {
    label: "Testimonial slot 03",
    hint: "A quote about how the session felt — the calm, the attention, leaving different than you arrived.",
  },
];
