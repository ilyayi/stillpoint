#!/usr/bin/env python3
"""
Coastal Light — brand art generator.

Renders the site's photographic-feeling imagery (aerial shorelines, ocean
surface, tide light, sand, sea glass) directly from the brand palette so every
image belongs to one family. Output lands in public/images/.

These are ART-DIRECTED PLACEHOLDERS. To use real photography instead, drop a
file into public/images/ and point the matching slot in src/lib/images.ts at it
(see IMAGES.md for the shot list). Nothing else needs to change.

    python3 scripts/generate-art.py

Requires: numpy, pillow
"""
import os
import numpy as np
from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "images")

# ---------------------------------------------------------------- palette ---
P = {
    "abyss":  (6, 30, 41),
    "deep":   (13, 56, 76),
    "ocean":  (28, 90, 114),
    "sea":    (78, 143, 163),
    "shoal":  (137, 187, 194),
    "mist":   (186, 212, 214),
    "foam":   (232, 238, 235),
    "ivory":  (247, 243, 236),
    "sand":   (227, 213, 192),
    "dune":   (205, 187, 161),
    "clay":   (176, 152, 124),
    "gold":   (200, 160, 99),
    "sun":    (232, 197, 139),
}


def ramp(stops, n=1024):
    """stops: [(pos 0..1, rgb), ...] -> (n,3) float lookup table."""
    stops = sorted(stops, key=lambda s: s[0])
    xs = np.linspace(0.0, 1.0, n)
    out = np.zeros((n, 3))
    for c in range(3):
        out[:, c] = np.interp(xs, [s[0] for s in stops], [s[1][c] for s in stops])
    return out


def apply_ramp(field, lut):
    idx = np.clip(field, 0.0, 1.0) * (len(lut) - 1)
    lo = np.floor(idx).astype(np.int32)
    hi = np.clip(lo + 1, 0, len(lut) - 1)
    t = (idx - lo)[..., None]
    return lut[lo] * (1 - t) + lut[hi] * t


# ------------------------------------------------------------------ noise ---
def noise(h, w, seed=0, octaves=5, cx=3, cy=3, gain=0.5, lac=2.0):
    """Anisotropic fractal value noise. cx/cy = lattice cells across x/y."""
    rng = np.random.default_rng(seed)
    total = np.zeros((h, w), np.float32)
    amp, norm = 1.0, 0.0
    for o in range(octaves):
        gx = max(2, int(cx * lac ** o))
        gy = max(2, int(cy * lac ** o))
        g = (rng.random((gy, gx)) * 255).astype(np.uint8)
        im = Image.fromarray(g).resize((w, h), Image.BICUBIC)
        total += amp * (np.asarray(im, np.float32) / 255.0)
        norm += amp
        amp *= gain
    return total / norm


def fbm(h, w, seed=0, octaves=5, cells=3, gain=0.5, lacunarity=2.0):
    ar = w / max(h, 1)
    return noise(h, w, seed, octaves, max(2, int(cells * ar)), cells, gain, lacunarity)


def warp(field_fn, h, w, seed, strength=0.25, cells=3):
    """Domain warping: offset sample coordinates by two noise fields."""
    wx = (fbm(h, w, seed + 91, 4, cells) - 0.5) * 2
    wy = (fbm(h, w, seed + 137, 4, cells) - 0.5) * 2
    ys, xs = np.mgrid[0:h, 0:w].astype(np.float32)
    ys = np.clip(ys + wy * strength * h, 0, h - 1)
    xs = np.clip(xs + wx * strength * w, 0, w - 1)
    base = field_fn()
    return base[ys.astype(np.int32), xs.astype(np.int32)]


# ------------------------------------------------------------- finishing ---
def grain(img, amount=0.018, seed=7):
    rng = np.random.default_rng(seed)
    h, w = img.shape[:2]
    n = rng.normal(0, 1, (h, w)).astype(np.float32)
    n = np.asarray(Image.fromarray(((n * 0.5 + 0.5) * 255).astype(np.uint8), "L")
                   .filter(ImageFilter.GaussianBlur(0.6)), np.float32) / 255.0 - 0.5
    return img + n[..., None] * amount * 255


def vignette(img, strength=0.35, softness=1.5):
    h, w = img.shape[:2]
    ys, xs = np.mgrid[0:h, 0:w].astype(np.float32)
    d = np.sqrt(((xs / w - .5) * 2) ** 2 + ((ys / h - .5) * 2) ** 2) / 1.4142
    return img * (1 - strength * np.clip(d, 0, 1) ** softness)[..., None]


def bloom(img, threshold=185, radius=42, amount=0.42):
    """Highlight bleed — the single biggest cue that reads as 'photographic'."""
    lum = img.mean(axis=2)
    mask = np.clip((lum - threshold) / max(255 - threshold, 1), 0, 1)[..., None]
    bright = np.clip(img * mask, 0, 255).astype(np.uint8)
    blurred = np.asarray(Image.fromarray(bright).filter(
        ImageFilter.GaussianBlur(radius)), np.float32)
    return img + blurred * amount


def lift(img, shadow=(10, 22, 28), amt=0.05):
    """Filmic shadow lift — keeps blacks from going digital-flat."""
    s = np.array(shadow, np.float32)
    l = (1 - img / 255.0) ** 2
    return img * (1 - amt) + (img + s) * amt * (1 - l) + s * l * amt


def save(arr, name, quality=86, blur=0.0, sharpen=True):
    a = np.clip(arr, 0, 255).astype(np.uint8)
    im = Image.fromarray(a, "RGB")
    if blur:
        im = im.filter(ImageFilter.GaussianBlur(blur))
    if sharpen:
        im = im.filter(ImageFilter.UnsharpMask(radius=2, percent=42, threshold=3))
    path = os.path.join(OUT, name)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"  {name}  {im.size[0]}x{im.size[1]}  {os.path.getsize(path)//1024}kb")


def finish(rgb, seed=1, vig=0.3, grain_amt=0.016):
    rgb = lift(rgb)
    rgb = vignette(rgb, vig)
    rgb = grain(rgb, grain_amt, seed)
    return rgb


# ----------------------------------------------------------- generators ---
def aerial_shoreline(w, h, seed=3, sand_side=0.22, palette=None, tilt=0.35):
    """Looking straight down at surf meeting sand — the signature frame."""
    lut = ramp(palette or [
        (0.00, P["abyss"]), (0.13, P["deep"]), (0.30, P["ocean"]),
        (0.46, P["sea"]), (0.58, P["shoal"]), (0.66, P["mist"]),
        (0.71, P["foam"]), (0.78, P["ivory"]), (0.86, P["sand"]),
        (0.94, P["dune"]), (1.00, P["clay"]),
    ])
    ys, xs = np.mgrid[0:h, 0:w].astype(np.float32)
    u, v = xs / w, ys / h
    # shoreline runs on a diagonal, softened by large-scale noise
    edge = u * (1 - tilt) + v * tilt
    edge = edge + (fbm(h, w, seed, 5, 2) - 0.5) * 0.30
    depth = np.clip((edge - (1 - sand_side)) * 2.6 + 0.5, 0, 1)
    # foam: thin bright bands riding the water/sand boundary
    bands = np.sin((edge * 26 + fbm(h, w, seed + 5, 4, 4) * 7) * np.pi)
    foam = np.clip(bands, 0, 1) ** 3 * np.clip(1 - abs(depth - 0.70) * 5.5, 0, 1)
    field = np.clip(depth + foam * 0.16, 0, 1)
    rgb = apply_ramp(field, lut)
    rgb = rgb + (foam ** 2)[..., None] * np.array([46, 48, 44]) * 0.9
    # texture in the water + a wash of low sun
    rgb *= (0.93 + 0.14 * fbm(h, w, seed + 21, 6, 6))[..., None]
    sun = np.clip(1 - ((u - 0.82) ** 2 + (v - 0.10) ** 2) * 2.4, 0, 1) ** 2
    rgb += sun[..., None] * np.array(P["sun"], np.float32) * 0.16
    return finish(rgb, seed, vig=0.26)


def ocean(w, h, seed=11, mood="dusk", horizon=0.40, sun_x=0.66):
    """
    Ocean under real perspective: overlapping swell trains projected onto a
    ground plane, a specular sun path, and atmospheric haze at the horizon.
    horizon <= 0 drops the sky and fills the frame with water.
    """
    ys, xs = np.mgrid[0:h, 0:w].astype(np.float32)
    u, v = xs / w, ys / h

    if mood == "dusk":
        sky_lut = ramp([(0.0, (11, 38, 56)), (0.30, (30, 74, 98)),
                        (0.58, (96, 128, 146)), (0.79, (196, 174, 152)),
                        (0.92, (233, 195, 143)), (1.0, (245, 214, 163))])
        far, near = np.array((168, 166, 158), np.float32), np.array((9, 36, 49), np.float32)
        sun_rgb, sun_amt, glow_amt = np.array(P["sun"], np.float32), 1.25, 1.0
    else:  # morning — higher key, cooler, more air
        sky_lut = ramp([(0.0, (108, 152, 172)), (0.4, (168, 196, 206)),
                        (0.75, (216, 226, 224)), (1.0, (243, 238, 228))])
        far, near = np.array((196, 212, 212), np.float32), np.array(P["deep"], np.float32)
        sun_rgb, sun_amt, glow_amt = np.array((252, 246, 232), np.float32), 0.80, 0.45

    hz = horizon if horizon > 0 else -0.06
    dv = np.maximum(v - hz, 1e-3)
    scale = np.clip(1.0 / (dv + 0.028), 0, 34)
    X = (u - 0.5) * scale * 1.7
    Y = scale
    n = noise(h, w, seed + 7, 5, 7, 7)

    height = np.zeros((h, w), np.float32)
    for i, (ang, freq, amp) in enumerate([(0.06, 0.95, 1.00), (0.34, 1.7, 0.52),
                                          (-0.28, 2.9, 0.30), (0.62, 5.1, 0.16)]):
        d = X * np.sin(ang) + Y * np.cos(ang)
        height += amp * np.sin(np.pi * (d * freq + n * 2.4 + i * 1.7))
    height /= 1.98
    height += (noise(h, w, seed + 13, 5, 26, 14) - 0.5) * 0.55
    damp = np.clip(dv * 7.0, 0, 1)                 # calm the far field
    height *= damp

    t = np.clip(dv / max(1 - hz, 1e-3), 0, 1) ** 0.72
    water = far[None, None, :] * (1 - t[..., None]) + near[None, None, :] * t[..., None]
    water *= (0.90 + 0.20 * noise(h, w, seed + 3, 4, 5, 5))[..., None]

    # specular sun path: crests inside a cone that widens toward the viewer
    path = np.exp(-(((u - sun_x) / (0.045 + dv * 1.05)) ** 2) * 2.2)
    crest = np.clip(height, 0, 1) ** 6
    water += (crest * path * damp)[..., None] * sun_rgb * sun_amt
    water += (np.clip(height, 0, 1) ** 10 * damp)[..., None] * sun_rgb * 0.16
    # trough shading gives the surface body
    water *= (1 + np.clip(height, -1, 0) * 0.28)[..., None]

    rgb = water
    if horizon > 0:
        st = np.clip(v / horizon, 0, 1)
        cloud = noise(h, w, seed + 2, 5, 3, 13)
        sky = apply_ramp(np.clip(st * 0.96 + (cloud - 0.5) * 0.13 * (1 - st * 0.6), 0, 1), sky_lut)
        glow = np.exp(-((((u - sun_x) / 0.20) ** 2) + (((v - horizon) / 0.16) ** 2)))
        sky += glow[..., None] * sun_rgb * glow_amt
        rgb = np.where((v < horizon)[..., None], sky, water)
        # horizon haze bleeding into the water
        bleed = np.exp(-np.clip(v - horizon, 0, None) * 34)[..., None]
        rgb = rgb * (1 - bleed * 0.55) + far[None, None, :] * bleed * 0.55

    rgb = bloom(rgb, threshold=170, radius=int(min(w, h) * 0.045), amount=0.34)
    return finish(rgb, seed, vig=0.32 if horizon > 0 else 0.26)


def sand(w, h, seed=23, warmth=1.0):
    lut = ramp([(0.0, P["clay"]), (0.35, P["dune"]), (0.72, P["sand"]),
                (1.0, P["ivory"])])
    base = warp(lambda: fbm(h, w, seed, 6, 5), h, w, seed, 0.05)
    ripple = np.sin((base * 5 + np.mgrid[0:h, 0:w][0] / h * 22) * np.pi) * 0.5 + 0.5
    field = np.clip(base * 0.72 + ripple * 0.28, 0, 1)
    rgb = apply_ramp(field, lut)
    # raking light
    ys = np.mgrid[0:h, 0:w][0].astype(np.float32) / h
    rgb *= (0.90 + 0.18 * (1 - ys))[..., None]
    rgb[..., 0] *= warmth
    return finish(rgb, seed, vig=0.30, grain_amt=0.022)


def caustics(w, h, seed=31, dark=True):
    """Sunlight refracted through moving water onto a shallow floor."""
    lut = ramp([(0.0, P["abyss"]), (0.42, P["deep"]), (0.78, P["ocean"]),
                (1.0, P["sea"])] if dark else
               [(0.0, P["sea"]), (0.45, P["shoal"]), (0.82, P["mist"]), (1.0, P["foam"])])
    # Physical model: a wavy surface refracts light onto the floor, so brightness
    # is the inverse of how much the mapping stretches area (the Jacobian).
    surf = np.asarray(Image.fromarray((fbm(h, w, seed, 3, 4) * 255).astype(np.uint8))
                      .filter(ImageFilter.GaussianBlur(min(w, h) * 0.045)), np.float32) / 255.0
    gy, gx = np.gradient(surf)
    gyy, gyx = np.gradient(gy)
    gxy, gxx = np.gradient(gx)
    k = min(w, h) ** 2 * 0.035
    det = (1 + k * gxx) * (1 + k * gyy) - (k * gxy) * (k * gyx)
    web = np.clip(0.85 / (np.abs(det) + 0.85), 0, 1) ** 3.2
    web *= (0.45 + 0.85 * fbm(h, w, seed + 29, 3, 2))   # let the web breathe
    a = fbm(h, w, seed + 3, 4, 3)
    rgb = apply_ramp(np.clip(a * 0.85 + 0.08, 0, 1), lut)
    rgb += web[..., None] * np.array(P["foam"], np.float32) * (1.5 if dark else 0.75)
    rgb = bloom(rgb, threshold=150, radius=int(min(w, h) * 0.05), amount=0.55)
    return finish(rgb, seed, vig=0.34)


def light_wash(w, h, seed=41, stops=None, softness=90):
    """Quiet, out-of-focus light — for cards and section grounds."""
    lut = ramp(stops or [(0.0, P["ivory"]), (0.5, P["sand"]), (1.0, P["dune"])])
    f = warp(lambda: fbm(h, w, seed, 4, 2), h, w, seed, 0.18, cells=2)
    ys, xs = np.mgrid[0:h, 0:w].astype(np.float32)
    grad = (xs / w) * 0.45 + (ys / h) * 0.55
    field = np.clip(f * 0.55 + grad * 0.55, 0, 1)
    rgb = apply_ramp(field, lut)
    rgb = np.asarray(Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8))
                     .filter(ImageFilter.GaussianBlur(softness * min(w, h) / 1400)), np.float32)
    return finish(rgb, seed, vig=0.22, grain_amt=0.024)


def wet_stone(w, h, seed=53):
    """Dark, wet sea rock — the moodiest frame in the set."""
    lut = ramp([(0.0, (12, 26, 32)), (0.30, (34, 56, 62)), (0.58, (72, 96, 100)),
                (0.82, P["shoal"]), (1.0, P["foam"])])
    f = warp(lambda: fbm(h, w, seed, 7, 3), h, w, seed, 0.06)
    grit = noise(h, w, seed + 11, 4, 40, 40)
    field = np.clip(f * 1.15 - 0.12 + (grit - 0.5) * 0.16, 0, 1)
    rgb = apply_ramp(field, lut)
    # wet specular: a raking highlight on the upper faces
    slope = np.clip(np.gradient(f, axis=0) * -260, 0, 1) ** 1.6
    rgb += slope[..., None] * np.array(P["foam"], np.float32) * 0.45
    rgb = bloom(rgb, threshold=175, radius=int(min(w, h) * 0.03), amount=0.3)
    return finish(rgb, seed, vig=0.40, grain_amt=0.026)


# ------------------------------------------------------------------ main ---
def main():
    os.makedirs(OUT, exist_ok=True)
    print("Coastal Light — generating brand imagery")

    print("hero/")
    save(ocean(2400, 1500, seed=11, mood="dusk", horizon=0.42), "hero/ocean-dusk.jpg", 84)
    save(ocean(1400, 1900, seed=11, mood="dusk", horizon=0.36), "hero/ocean-dusk-portrait.jpg", 84)
    save(aerial_shoreline(2400, 1350, seed=3), "hero/shoreline-aerial.jpg", 84)

    print("coastal/")
    save(ocean(2400, 1200, seed=61, mood="morning", horizon=0.44, sun_x=0.30), "coastal/morning-water.jpg", 84)
    save(ocean(2000, 1250, seed=71, mood="dusk", horizon=0.0, sun_x=0.5), "coastal/open-water.jpg", 84)
    save(aerial_shoreline(2000, 1400, seed=8, sand_side=0.34, tilt=0.55), "coastal/tideline.jpg", 84)
    save(sand(1800, 1200, seed=23), "coastal/sand.jpg", 84)
    save(wet_stone(1600, 1100, seed=53), "coastal/stone.jpg", 84)

    print("about/")
    save(light_wash(1400, 1750, seed=41, stops=[
        (0.0, P["ivory"]), (0.45, P["sand"]), (0.8, P["dune"]), (1.0, P["clay"])]), "about/light.jpg", 86)
    save(aerial_shoreline(1400, 1750, seed=15, sand_side=0.45, tilt=0.15), "about/shoreline.jpg", 86)

    print("services/")
    # each service gets its own frame; same family, its own temperature
    specs = [
        ("therapeutic-massage", lambda: aerial_shoreline(1400, 1000, seed=101, sand_side=0.30)),
        ("deep-tissue", lambda: ocean(1400, 1000, seed=102, mood="dusk", horizon=0.0)),
        ("relaxation-massage", lambda: light_wash(1400, 1000, seed=103, stops=[
            (0.0, P["ivory"]), (0.55, P["sand"]), (1.0, P["shoal"])])),
        ("sports-recovery", lambda: ocean(1400, 1000, seed=104, mood="morning", horizon=0.0)),
        ("trigger-point", lambda: wet_stone(1400, 1000, seed=105)),
        ("stretching-mobility", lambda: aerial_shoreline(1400, 1000, seed=106, sand_side=0.5, tilt=0.7)),
        ("lymphatic", lambda: light_wash(1400, 1000, seed=107, stops=[
            (0.0, P["ivory"]), (0.5, P["mist"]), (1.0, P["sea"])])),
        ("cranial-sacral", lambda: ocean(1400, 1000, seed=108, mood="morning", horizon=0.52)),
        ("customized-bodywork", lambda: sand(1400, 1000, seed=109)),
    ]
    for name, fn in specs:
        save(fn(), f"services/{name}.jpg", 82)

    print("texture/")
    # These are shown small on the homepage rail and large on /experience, so
    # they need real structure — not just a wash — and 2x resolution.
    steps = [("arrive", lambda: sand(1200, 1200, seed=201)),
             ("breathe", lambda: ocean(1200, 1200, seed=202, mood="morning", horizon=0.30, sun_x=0.4)),
             ("release", lambda: ocean(1200, 1200, seed=203, mood="dusk", horizon=0.0)),
             ("reconnect", lambda: aerial_shoreline(1200, 1200, seed=204, sand_side=0.4)),
             ("renew", lambda: ocean(1200, 1200, seed=205, mood="morning", horizon=0.55))]
    for name, fn in steps:
        save(fn(), f"texture/{name}.jpg", 82)
    save(light_wash(1600, 900, seed=77, stops=[
        (0.0, P["ivory"]), (0.6, P["sand"]), (1.0, P["mist"])], softness=140), "texture/paper.jpg", 80)

    print("og/")
    save(ocean(1200, 630, seed=11, mood="dusk", horizon=0.46), "og/base.jpg", 88)
    print("done ->", OUT)


if __name__ == "__main__":
    main()
