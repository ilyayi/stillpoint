#!/usr/bin/env python3
"""Slice a tall screenshot into readable segments for review.

    python3 scripts/slice.py <png> <out-prefix> [segment-height] [target-width]
"""
import sys
from PIL import Image

Image.MAX_IMAGE_PIXELS = None

src, prefix = sys.argv[1], sys.argv[2]
seg_h = int(sys.argv[3]) if len(sys.argv) > 3 else 1250
target_w = int(sys.argv[4]) if len(sys.argv) > 4 else 1000

im = Image.open(src)
w, h = im.size
n = 0
for top in range(0, h, seg_h):
    box = (0, top, w, min(top + seg_h, h))
    seg = im.crop(box)
    if seg.size[1] < 60:
        break
    scale = target_w / w
    seg = seg.resize((target_w, max(1, int(seg.size[1] * scale))), Image.LANCZOS)
    out = f"{prefix}-{n:02d}.png"
    seg.convert("RGB").save(out, "PNG", optimize=True)
    print(out, seg.size)
    n += 1
print(f"source {w}x{h} -> {n} segments")
