# Imagery — what's here, and the shot list to replace it

## What is currently on the site

Real photography — Pacific coastline, aerial shorelines, and genuine hands-on bodywork — sourced
from Unsplash and Pexels, then put through one shared colour grade by `scripts/build-photos.py`.

**The grade is the important part.** The photographs come from different shoots: a warm lamp-lit
treatment room, cool Pacific water, a bright stretching studio. Dropped in raw they look like a
stock-photo grab bag. A single treatment — slight desaturation, teal shadows, warm highlights, a
gentle film curve, fine grain — makes them read as one commissioned set.

Every frame was chosen by eye against the brief. No hot stones, no folded towels with orchids, no
reed diffusers, no gloved clinical facials. Service cards are also arranged so no category row
shows the same subject or room twice, because two crops of one shoot side by side reads as stock
instantly.

To re-fetch and re-grade (needs `numpy` and `pillow`):

```bash
npm run photos                       # everything
python3 scripts/build-photos.py hero # one slot, for iterating
```

Sources are cached in `.cache/photos`, so re-grading after a tweak is instant and offline.
`CREDITS.md` lists every source URL. Both the Unsplash and Pexels licenses permit commercial use
with no attribution required.

**This is still not photography of you, your hands, or your room.** It is honest, well-chosen
stock. Replacing the two shots below with real photographs of your practice is the single biggest
upgrade left on this site.

## How to swap in a real photograph

1. Put the file in `public/images/` (any folder).
2. Open `src/lib/images.ts` and point the matching slot at it.
3. Update the `alt` text to describe the actual photo.

That's it — sizing, cropping, lazy-loading, blur-up and modern formats are handled for you.

```ts
hero: {
  src: "/images/hero/my-photo.jpg",
  alt: "Morning light on the water at Butterfly Beach",
},
```

---

## The shot list

Priority order. If you only ever shoot two things, shoot **1** and **2**.

### 1. Your portrait — `practitionerPortrait` in `src/lib/images.ts`
**Crop:** portrait, 4:5 · **Min:** 1200 × 1500

The highest-value image on the site. People book a person. Natural light, an unforced expression,
looking at the camera. In the treatment space or outdoors near the coast — not a studio headshot
with a grey backdrop, and not arms folded in a polo shirt. Warm, calm, competent.
*Currently a marked placeholder frame on `/about`.*

### 2. Your own hands at work — replaces any of the service card images
**Crop:** landscape 4:3 · **Min:** 1600 px wide

The images doing this job right now are good, but they are someone else's hands in someone else's
room. Close, shallow depth of field, warm light: forearm along a back, thumbs at a shoulder blade,
a hand supporting a neck. Crop tight enough that it is about *touch*, not about a spa scene. Shoot
a handful in one session with a real client (get written permission) and you can replace the whole
service set at once.

### 3. Homepage hero — `hero`
**Crop:** wide 16:10 or wider · **Min:** 2400 px wide · **Must be dark enough on the lower half for white type**

Santa Barbara water at first light or last light. Butterfly Beach, Hendry's, the Mesa bluffs,
Rincon. Calm, spacious, atmospheric — no crowds, no umbrellas, no pier postcards.
*A portrait-cropped version can go in `heroPortrait` if you want a different mobile framing.*

### 4. Immersive break — `coastalBreak`
**Crop:** wide · **Min:** 2400 px wide · Sits behind "Slow down. Breathe deep. Be here."

Open water, generous sky, almost nothing happening. The quieter the better — this is the moment
the page exhales.

### 5. The treatment space — could replace `philosophy` or `aboutLight`
**Crop:** portrait 4:5 · **Min:** 1400 px wide

The room as it feels five minutes before a session: warm table, soft light, uncluttered. Shoot it
in daylight with the lamps off if you can.

### 6. Movement and recovery — replaces a service image
**Crop:** landscape 4:3 · **Min:** 1600 px wide

Assisted stretching on the table, a hip opened at the end of range, a shoulder taken through
rotation. **Stretching & Mobility** currently uses a studio floor-stretch and **Sports & Recovery**
uses a surfer — both work, but neither shows your table work.

### 7. Texture and detail — anywhere
**Crop:** square or 4:3 · **Min:** 900 px

Linen, warm oil, a hand on a wrist, morning light across a wall, wet sand. These fill the small
tiles in the five-step experience rail (`/images/texture/*.jpg`) and reward the scroll.

---

## Slot reference

Every slot lives in `src/lib/images.ts`.

| Slot | Where it appears | Ideal crop |
|------|------------------|-----------|
| `hero` | Homepage hero, `/book` hero | wide, dark lower half |
| `heroPortrait` | optional mobile hero art direction | 3:4 |
| `philosophy` | Homepage philosophy section | 4:5 portrait |
| `expertise` | Behind the dark credibility band | wide, low detail |
| `coastalBreak` | Full-bleed "Slow down" section | wide |
| `tideline` | `/services` hero, closing CTA band | wide |
| `openWater` | `/experience` hero, 404 page | wide |
| `sand` | `/faq` hero | wide |
| `aboutPortrait` | `/about` hero | wide |
| `aboutLight` | `/contact` hero, About place section | 4:5 portrait |
| `og` | social share card | 1200 × 630 |
| service images | cards + detail heroes | 4:3, one per service |
| step images | five-step experience rail | square |

## Practical notes

- **Format:** JPEG for photographs. Next.js serves AVIF/WebP automatically — no need to convert.
- **Size:** keep source files under ~500 KB where you can; Next resizes and re-encodes per device.
- **Alt text:** describe what is in the frame. Decorative images use `alt=""`, which is already set
  where appropriate — leave those alone.
- **Licensing:** if you buy stock, keep the licence. If you hire a photographer, get commercial use
  and web rights in writing.
