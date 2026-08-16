# Stillpoint — Coastal Wellness & Bodywork

A production-ready website for a massage therapy and wellness brand in Santa Barbara, California.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4**. Every page is
statically generated, so it deploys anywhere and loads fast.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

Extra tooling (the last two need the site running):

```bash
npm run lint                  # eslint
npm run photos                # re-fetch and re-grade the photography (needs numpy + pillow)
npm run shots                 # screenshot every page, desktop + mobile
npm run shots -- /about       # …or just one
npm run a11y                  # contrast, heading order, alt text, tap targets, landmarks
```

`npm run a11y` reports **✓ clean** for every route at both desktop and mobile widths.
Re-run it after you change colours or add pages — it catches contrast regressions that are
easy to miss by eye.

---

## ⚑ Before you launch — the checklist

Everything below is a clearly-marked placeholder. Nothing has been invented: no fake prices, no
fake testimonials, no invented certifications, no made-up reviews.

| # | What | Where |
|---|------|-------|
| 1 | **Business name** — "Stillpoint" is a starting point, not a decision. Check availability locally. | `src/content/site.ts` → `name`, `descriptor` |
| 2 | ~~Your name~~ — done (Richard Hynds) | `src/content/site.ts` → `practitioner` |
| 3 | ~~Phone, email~~ — done. **Street address** still city-level only. | `src/content/site.ts` → `contact`, `location` |
| 4 | **Booking link** — the single most important setting | `src/content/site.ts` → `booking.url` |
| 5 | **Prices** — live, but **estimates** from a $200/hr rate. Check them. | `src/content/services.ts` → `price` on each duration |
| 6 | **Testimonials** — add real client quotes, or hide the section | `src/content/testimonials.ts` |
| 7 | **Your portrait** — the highest-impact image on the site | `src/lib/images.ts` → `practitionerPortrait` |
| 8 | **A personal paragraph in your own voice** | `src/content/about.ts` → `personalNote` |
| 9 | **Domain** — used for canonical URLs, sitemap, Open Graph | `src/content/site.ts` → `url` |
| 10 | **Social links** — empty ones hide themselves | `src/content/site.ts` → `social` |
| 11 | **Hours** | `src/content/site.ts` → `hours` |

Three blocks on the site are visible **setup notes** with a dashed gold border. They exist so you
can't miss them, and they disappear on their own once the matching content is filled in:

- the booking panel on `/book` (goes away once `booking.url` is set)
- the testimonial note on the homepage (goes away once you add a real quote)
- the portrait frame on `/about` (goes away once you set `practitionerPortrait`)

---

## Where everything lives

```
src/
  content/            ← EDIT THESE. Plain data files, no code required.
    site.ts             business info, contact, booking, hours, social, nav, future offerings
    services.ts         the nine sessions: copy, durations, prices, images
    about.ts            the story, training, principles, techniques
    experience.ts       the five movements of a session
    faq.ts              questions and answers (also becomes FAQ rich results)
    testimonials.ts     real client quotes (empty by design)

  lib/
    images.ts           every image on the site, in one place — swap a path, done
    seo.ts              metadata + all structured data

  components/
    layout/             header, footer, page hero, sticky mobile book bar
    home/               the homepage sections, in order
    services/           service card
    experience/ faq/ contact/ booking/ shared/ seo/
    ui/                 buttons, section shells, reveal, parallax, wave dividers, logo

  app/                  routes — one folder per page
public/images/          the imagery (see IMAGES.md)
scripts/                photo pipeline, screenshots, accessibility sweep
```

### Common edits

**Change a price** → `src/content/services.ts`. Each session length carries its own `price`, e.g.
`{ minutes: 90, price: 290 }`. The "from £/$" figure on cards and in the schema is the cheapest
length, derived automatically. `showPrices: false` in `site.ts` hides every price at once.

**Change the multi-session discount** → `site.ts` → `packages`. Setting `enabled: false` removes
every mention of it across the site.

**Change the cancellation policy** → `site.ts` → `policies`. It appears on `/book`, `/experience`
and in the FAQ.

**Add a service** → copy any block in `services.ts`, change the `slug`, drop an image at
`public/images/services/<slug>.jpg`. The services page, homepage grid, footer, booking list,
sitemap and structured data all pick it up automatically. A detail page is generated for free.

**Hide a service without deleting it** → add `active: false` to its entry.

**Change the booking destination** → `site.ts` → `booking.url`. Set `mode: "external"` to send
people straight out to your scheduler, or leave it `"internal"` to keep them on `/book`.

**Add a nav item** → `site.ts` → `nav`. It appears in the header, mobile menu and footer.

**Replace an image** → put your file in `public/images/` and point the matching slot in
`src/lib/images.ts` at it. See **IMAGES.md** for the shot list.

---

## The design system

Change a token in `src/app/globals.css` and it propagates everywhere — Tailwind generates
utilities from these names, so `--color-ocean` gives you `bg-ocean`, `text-ocean`, `border-ocean`.

| Role | Token | |
|------|-------|-|
| Deepest ground | `abyss` | `#061e29` |
| Primary dark | `deep` | `#0d384c` |
| Accent / links | `ocean` | `#1c5a72` |
| Soft sea | `sea` `shoal` `mist` `foam` | |
| Page ground | `ivory` `shell` | `#f7f3ec` `#f1ebe0` |
| Warm shore | `sand` `dune` `clay` | |
| Sun, used sparingly | `gold` `sunlight` | `#c8a063` |
| Text | `ink` `ink-soft` `ink-faint` | |

**Type** — Fraunces (display) and Jost (text), loaded through `next/font` so there is no layout
shift and no external request at runtime. Sizes are fluid: `.t-hero`, `.t-display`, `.t-title`,
`.t-lead`, `.eyebrow`.

**Motion** — three easing curves (`--ease-tide`, `--ease-swell`, `--ease-drift`), a slow drift on
hero imagery, restrained parallax, and reveal-on-scroll. Every one of them stops when the visitor's
system asks for reduced motion, and content stays visible if JavaScript never runs.

---

## SEO

- Per-page titles, descriptions, canonical URLs, Open Graph and Twitter cards (`src/lib/seo.ts`)
- `LocalBusiness` + `HealthAndBeautyBusiness` schema with geo, service area, opening hours, the
  full service catalogue, and the practitioner's training
- `Service` schema on each service page, `FAQPage` on the FAQ, `HowTo` on the experience page,
  `BreadcrumbList` throughout
- `sitemap.xml` and `robots.txt` generated from your content
- Semantic HTML with one `<h1>` per page and a sensible heading order
- Local relevance is carried by real copy — neighbourhoods in the footer, a section on practising
  in Santa Barbara, service pages named for what people actually search — not keyword stuffing

**No `aggregateRating` or review markup is emitted.** There are no real reviews yet, and faking
them violates Google's guidelines. Add them to `seo.ts` once you have genuine ones.

---

## Accessibility

Skip link, visible focus rings, `aria-current` on the active nav item, labelled form controls,
native `<details>` for the FAQ (keyboard and screen-reader friendly, and findable with ⌘F),
alt text on meaningful images with decorative ones marked `alt=""`, 44px+ tap targets, and full
`prefers-reduced-motion` support.

---

## Deploying

### Railway (configured and ready)

The repo already contains everything Railway needs — `railway.json`, a pinned Node version in
`.nvmrc`, and a start script that binds Railway's injected `$PORT` on `0.0.0.0`.

1. **railway.com → New Project → Deploy from GitHub repo → `stillpoint`.**
2. Railway detects Node, runs `npm ci` → `npm run build` → `npm run start`. No settings to change.
3. **Settings → Networking → Generate Domain.** You get a `*.up.railway.app` URL.
4. **Redeploy once** after generating the domain (see below).

**Why the redeploy matters.** Every page is statically generated at build time, and canonical
links, the sitemap and social share cards are baked in during that build. The build reads
`RAILWAY_PUBLIC_DOMAIN`, which does not exist until you generate a domain — so the first build
falls back to `site.url`. One redeploy after step 3 and every URL on the site is correct.

**Custom domain.** Add it under Settings → Networking, then set a variable:

```
NEXT_PUBLIC_SITE_URL = https://your-domain.com
```

and redeploy. That variable wins over everything else. (Order: `NEXT_PUBLIC_SITE_URL` →
`RAILWAY_PUBLIC_DOMAIN` → `site.url`. See `resolveBaseUrl()` in `src/lib/seo.ts`.)

**No other environment variables are required.** The site has no database, no API keys and no
secrets — the contact form composes an email client-side, and booking is an external link.

**Cost note.** Railway bills for a container that runs continuously. This site is entirely static
output being served by Node, so it sits at the bottom of the usage range — but it is not free
the way a static host is. If that matters, the same repo deploys to Vercel, Netlify or Cloudflare
Pages unchanged.

### Anywhere else

Any Node host works: `npm ci && npm run build && npm run start`. On **Vercel**, import the repo —
no configuration needed, and `NEXT_PUBLIC_SITE_URL` is the only variable worth setting.

---

## Honest notes

- **The photography is well-chosen stock, colour-graded to the brand.** Sources are Unsplash and
  Pexels (both licenses allow commercial use, no attribution required — see `CREDITS.md`), pulled
  and graded by `scripts/build-photos.py` so they read as one commissioned set rather than a grab
  bag. Every frame was picked by eye: no hot stones, no orchids, no reed diffusers. It is still not
  a photograph of *your* hands or *your* room — see **IMAGES.md** for the two shots that would
  upgrade the site most.
- **The brand name is a proposal.** Verify it before you print anything.
- **Nothing was invented** — no credentials, no awards, no testimonials, no prices, no medical
  claims. Every factual statement on the site traces back to real background you provided.
