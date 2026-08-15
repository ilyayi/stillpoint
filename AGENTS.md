<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-notes -->

## This project

A massage therapy & wellness brand site for Santa Barbara, CA. Read `README.md` first — it
explains the content layer and the pre-launch checklist.

**Editing content almost never means editing components.** Everything the owner changes lives in
`src/content/` (site config, services, about, FAQ, testimonials, experience steps) and
`src/lib/images.ts` (every image path). Prefer changing data over changing JSX.

**Two things must stay true:**

1. **Never invent facts.** No prices, testimonials, reviews, certifications, awards, ratings or
   medical claims that were not supplied by the owner. `startingPrice` is `null` and
   `testimonials` is empty on purpose. No `aggregateRating` in the schema.
2. **Never promise medical outcomes.** Copy says "may help", "designed to", "often". It does not
   say "treats", "heals" or "cures".

**Tailwind v4 gotcha, already hit once:** `.inline-flex` is emitted *after* `.hidden`, so
`className="hidden sm:inline-flex"` on a component whose base classes include a display utility
does nothing at equal specificity. Use `max-sm:hidden` instead — media-query variants always sort
later. See the comment in `src/components/layout/SiteHeader.tsx`.

**Photography** lives in `scripts/build-photos.py` — a source list plus a shared colour grade.
Add or swap a photo there and re-run `npm run photos`, so everything keeps one treatment.
Sources cache in `.cache/photos`.

**Before calling any UI change done:** `npm run build`, then `npm run a11y` (needs the server
running). The a11y sweep is currently ✓ clean on every route at desktop and mobile — keep it that
way.

<!-- END:project-notes -->
