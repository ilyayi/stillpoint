#!/usr/bin/env python3
"""
Photography pipeline.

Downloads the site's photographs from their sources, crops each one to the shape
its slot needs, applies a single shared colour grade, and writes optimised JPEGs
into public/images/.

The grade is the point. The photographs come from different shoots — warm lamp-lit
treatment rooms, cool Pacific water, a bright stretching studio — and without a
common treatment they look like a stock-photo grab bag. One grade (slight
desaturation, teal shadows, warm highlights, a gentle film curve, fine grain)
makes them read as one commissioned set.

    python3 scripts/build-photos.py            # everything
    python3 scripts/build-photos.py hero       # one slot, for iterating

Requires: numpy, pillow. Needs network access on first run; sources are cached
in .cache/photos so re-grading is instant.

Licensing: every source is Unsplash or Pexels. Both licenses permit commercial
use without attribution. CREDITS.md is regenerated with every source URL so the
provenance of each image is checkable.
"""
import os
import sys
import urllib.request
import numpy as np
from PIL import Image, ImageFilter

Image.MAX_IMAGE_PIXELS = None

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "images")
CACHE = os.path.join(ROOT, ".cache", "photos")
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"


def unsplash(pid):
    return ("unsplash", pid, f"https://images.unsplash.com/{pid}?w=2600&q=82&fm=jpg&fit=max",
            f"https://unsplash.com/photos/{pid.replace('photo-', '')}")


def pexels(pid):
    return ("pexels", str(pid),
            f"https://images.pexels.com/photos/{pid}/pexels-photo-{pid}.jpeg?auto=compress&cs=tinysrgb&w=2400",
            f"https://www.pexels.com/photo/{pid}/")


# ─────────────────────────────────────────────────────────────── the library ──
# Each photograph is fetched once and may feed more than one output.
SRC = {
    # Coast
    "dawn_rock":     unsplash("photo-1500375592092-40eb2168fd21"),  # wave over rock, pastel dawn
    "aerial_sand":   unsplash("photo-1505118380757-91f5f5632de0"),  # turquoise meeting pale sand
    "aerial_foam":   unsplash("photo-1505142468610-359e7d316be0"),  # foam swirl on wet sand
    "turquoise":     unsplash("photo-1540206395-68808572332f"),     # aerial water, foam texture
    "dark_sea":      unsplash("photo-1518837695005-2083093ee35b"),  # dark minimal sea surface
    "sunrise_shore": unsplash("photo-1507525428034-b723cf961d3e"),  # beach at sunrise, pastel
    "headland":      unsplash("photo-1444927714506-8492d94b4e3d"),  # misty coastal ridges
    "surfer":        unsplash("photo-1455729552865-3658a5d39692"),  # surfer on a teal wave
    "sunset":        unsplash("photo-1473116763249-2faaef81ccda"),  # golden sunset over gentle surf
    # The space
    "retreat":       unsplash("photo-1560750588-73207b1ef5b8"),     # calm room, plants, water
    "room":          pexels(5240699),                               # treatment room and cart
    # Hands-on work
    "back_hands":    pexels(5240681),                               # two hands flat on an upper back
    "forearm":       pexels(5240695),                               # forearm along the spine, warm lamp
    "thumbs":        pexels(5240696),                               # thumbs into tissue, close
    "knuckle":       pexels(5240678),                               # knuckle work, close
    "head":          pexels(5240700),                               # head and neck held, calm
    "foot":          pexels(5240677),                               # foot cradled in both hands
    "wrist":         unsplash("photo-1519823551278-64ac92734fb1"),  # hands on a forearm, cool light
    "soft_back":     unsplash("photo-1519824145371-296894a0daa9"),  # hands on a back, pale, soft
    "oil":           unsplash("photo-1515377905703-c4788e51af15"),  # oil poured to the hand, dark
    # Movement
    "stretch_seat":  pexels(4056723),                               # seated stretch, window light
    "stretch_reach": pexels(4056730),                               # reaching overhead, studio
}

# slot: (source, output path, width, height, focus 0..1 vertical, exposure)
# `focus` picks what survives the crop: 0.0 keeps the top, 1.0 the bottom.
# `exposure` < 1 darkens — used where white type sits on the image.
JOBS = [
    # Structural / coastal
    ("dawn_rock",     "hero/dawn-coast.jpg",          2560, 1600, 0.55, 0.88),
    ("dawn_rock",     "hero/dawn-coast-portrait.jpg", 1400, 1900, 0.55, 0.88),
    ("aerial_sand",   "coast/aerial-sand.jpg",        1600, 2000, 0.50, 1.00),
    ("aerial_foam",   "coast/aerial-foam.jpg",        2560, 1500, 0.50, 0.95),
    ("turquoise",     "coast/turquoise.jpg",          2200, 1500, 0.50, 0.95),
    ("dark_sea",      "coast/dark-sea.jpg",           2200, 1300, 0.50, 0.86),
    ("sunrise_shore", "coast/sunrise-shore.jpg",      2200, 1350, 0.55, 0.94),
    ("headland",      "coast/headland.jpg",           2200, 1300, 0.50, 0.95),
    ("retreat",       "space/retreat.jpg",            2400, 1400, 0.50, 0.90),
    ("room",          "space/room.jpg",               1600, 2000, 0.50, 0.95),
    ("oil",           "work/oil.jpg",                 2200, 1300, 0.50, 0.90),

    # Service cards (4:3).
    # Deliberately arranged so that no category row shows the same subject or
    # room twice — the services page groups these three-up, and two crops of one
    # shoot side by side instantly reads as stock.
    #   Therapeutic: pale/cool · warm lamp · cool grey
    #   Restorative: warm feet · bright overhead
    #   Performance: ocean · studio
    #   Specialized: head · dark still life
    ("soft_back",     "services/therapeutic-massage.jpg", 1600, 1200, 0.50, 1.00),
    ("forearm",       "services/deep-tissue.jpg",         1600, 1200, 0.50, 1.00),
    ("wrist",         "services/trigger-point.jpg",       1600, 1200, 0.50, 1.00),
    # A sunset rather than hands: relaxation is the one session that is about a
    # state rather than a technique, and a close crop of hands on a foot read as
    # ambiguous next to the other cards.
    ("sunset",        "services/relaxation-massage.jpg",  1600, 1200, 0.50, 1.00),
    ("back_hands",    "services/lymphatic.jpg",           1600, 1200, 0.50, 1.00),
    ("surfer",        "services/sports-recovery.jpg",     1600, 1200, 0.50, 1.00),
    ("stretch_seat",  "services/stretching-mobility.jpg", 1600, 1200, 0.45, 1.00),
    ("head",          "services/cranial-sacral.jpg",      1600, 1200, 0.50, 1.00),
    ("oil",           "services/customized-bodywork.jpg", 1600, 1200, 0.50, 1.00),

    # The five movements (square)
    ("room",          "texture/arrive.jpg",     1200, 1200, 0.50, 1.00),
    ("aerial_sand",   "texture/breathe.jpg",    1200, 1200, 0.50, 1.00),
    ("knuckle",       "texture/release.jpg",    1200, 1200, 0.50, 1.00),
    ("stretch_reach", "texture/reconnect.jpg",  1200, 1200, 0.35, 1.00),
    ("sunrise_shore", "texture/renew.jpg",      1200, 1200, 0.50, 1.00),

    # Social card
    ("dawn_rock",     "og/base.jpg", 1200, 630, 0.55, 0.88),
]


# ──────────────────────────────────────────────────────────────────── fetch ──
def fetch(key):
    kind, pid, url, credit = SRC[key]
    os.makedirs(CACHE, exist_ok=True)
    path = os.path.join(CACHE, f"{kind}-{pid}.jpg")
    if not os.path.exists(path) or os.path.getsize(path) < 40000:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=90) as r:
            data = r.read()
        if len(data) < 40000:
            raise RuntimeError(f"{key}: suspiciously small download ({len(data)} bytes)")
        with open(path, "wb") as f:
            f.write(data)
        print(f"   fetched {key}  {len(data)//1024}kb")
    return Image.open(path).convert("RGB")


# ──────────────────────────────────────────────────────────────────── grade ──
SHADOW = np.array([10, 46, 62], np.float32)    # deep ocean
HIGHLIGHT = np.array([252, 244, 230], np.float32)  # warm ivory


def grade(img, exposure=1.0, desat=0.13, split=0.16, contrast=0.13,
          vignette=0.16, grain_amt=0.011, seed=0):
    a = np.asarray(img, np.float32)

    if exposure != 1.0:
        a *= exposure

    lum = (a * np.array([0.2126, 0.7152, 0.0722], np.float32)).sum(axis=2, keepdims=True)

    # 1. ease the saturation back — stock photography is usually pushed too far
    a = a * (1 - desat) + lum * desat

    # 2. split tone: cool the shadows toward ocean, warm the highlights toward ivory
    t = np.clip(lum / 255.0, 0, 1)
    shadow_w = ((1 - t) ** 2) * split
    high_w = (t ** 2.2) * split * 0.55
    a = a * (1 - shadow_w - high_w) + SHADOW * shadow_w + HIGHLIGHT * high_w

    # 3. gentle S-curve around mid grey
    x = np.clip(a / 255.0, 0, 1)
    x = x + contrast * (x - 0.5) * (1 - np.abs(x - 0.5) * 2) * 2
    a = np.clip(x, 0, 1) * 255

    # 4. filmic shadow lift so blacks are never dead
    a = a * 0.985 + 5.0

    # 5. vignette
    if vignette:
        h, w = a.shape[:2]
        ys, xs = np.mgrid[0:h, 0:w].astype(np.float32)
        d = np.sqrt(((xs / w - .5) * 2) ** 2 + ((ys / h - .5) * 2) ** 2) / 1.4142
        a *= (1 - vignette * np.clip(d, 0, 1) ** 1.7)[..., None]

    # 6. fine grain, blurred slightly so it reads as film not noise
    if grain_amt:
        rng = np.random.default_rng(seed)
        h, w = a.shape[:2]
        n = rng.normal(0, 1, (h, w)).astype(np.float32)
        n = np.asarray(Image.fromarray(((n * .5 + .5) * 255).astype(np.uint8))
                       .filter(ImageFilter.GaussianBlur(0.55)), np.float32) / 255.0 - 0.5
        a += n[..., None] * grain_amt * 255

    return np.clip(a, 0, 255).astype(np.uint8)


def crop_to(img, w, h, focus=0.5):
    """Cover-crop to the target aspect, keeping the interesting part."""
    tw, th = w / h, img.width / img.height
    if th > tw:                                   # source is wider — trim sides
        new_w = int(img.height * tw)
        left = (img.width - new_w) // 2
        img = img.crop((left, 0, left + new_w, img.height))
    else:                                         # source is taller — trim top/bottom
        new_h = int(img.width / tw)
        top = int((img.height - new_h) * focus)
        img = img.crop((0, top, img.width, top + new_h))
    return img.resize((w, h), Image.LANCZOS)


def build(job, index):
    key, rel, w, h, focus, exposure = job
    img = crop_to(fetch(key), w, h, focus)
    out = grade(img, exposure=exposure, seed=index)
    im = Image.fromarray(out).filter(ImageFilter.UnsharpMask(radius=1.6, percent=48, threshold=3))
    path = os.path.join(OUT, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, "JPEG", quality=82, optimize=True, progressive=True)
    print(f"  {rel:44} {w}x{h}  {os.path.getsize(path)//1024}kb  ← {key}")


def credits():
    lines = [
        "# Photography credits",
        "",
        "Every photograph on this site comes from Unsplash or Pexels. Both licenses allow",
        "free commercial use, with no attribution required — this file exists so the",
        "provenance of each image is checkable, and so you can find the original if you",
        "ever need a different crop.",
        "",
        "All images are colour-graded to the brand palette by `scripts/build-photos.py`,",
        "so they will not look identical to the originals.",
        "",
        "| Key | Source | Original |",
        "| --- | ------ | -------- |",
    ]
    used = {j[0] for j in JOBS}
    for key in sorted(used):
        kind, pid, _, credit = SRC[key]
        lines.append(f"| `{key}` | {kind.capitalize()} | {credit} |")
    lines += [
        "",
        "## Replacing a photograph",
        "",
        "Point the slot in `src/lib/images.ts` (or the `image` field in",
        "`src/content/services.ts`) at your own file — that is all it takes. To keep the",
        "shared grade, add your file to `SRC` in `scripts/build-photos.py` instead and",
        "re-run it. See IMAGES.md for the shot list.",
        "",
    ]
    with open(os.path.join(ROOT, "CREDITS.md"), "w") as f:
        f.write("\n".join(lines))
    print(f"  CREDITS.md ({len(used)} photographs)")


def main():
    only = sys.argv[1] if len(sys.argv) > 1 else None
    jobs = [j for j in JOBS if not only or only in j[1] or only == j[0]]
    if not jobs:
        print(f"no slot matching {only!r}")
        return
    print(f"Building {len(jobs)} image(s)")
    for i, job in enumerate(jobs):
        build(job, i)
    if not only:
        credits()
    print("done ->", OUT)


if __name__ == "__main__":
    main()
