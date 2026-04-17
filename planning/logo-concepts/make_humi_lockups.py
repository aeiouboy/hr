#!/usr/bin/env python3
"""Compose vertical lockup (illustration + 'humi' wordmark) for concepts 01-24."""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

HERE = Path(__file__).parent
SIZE = 2048
NAVY = (15, 23, 42)
MARK_AREA_TOP = 0.08
MARK_AREA_RATIO = 0.60
WORDMARK_Y_RATIO = 0.76
FONT_SIZE = 320

def load_font(size):
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial Bold.ttf",
    ]
    for p in candidates:
        if Path(p).exists():
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()

font = load_font(FONT_SIZE)

made = 0
for n in range(1, 25):
    src = HERE / f"concept-{n:02d}.png"
    if not src.exists():
        print(f"skip concept-{n:02d}.png (not found)")
        continue

    concept = Image.open(src).convert("RGB")
    target = int(SIZE * MARK_AREA_RATIO)
    concept.thumbnail((target, target), Image.LANCZOS)

    out = Image.new("RGB", (SIZE, SIZE), (255, 255, 255))
    cx = (SIZE - concept.width) // 2
    cy = int(SIZE * MARK_AREA_TOP)
    out.paste(concept, (cx, cy))

    draw = ImageDraw.Draw(out)
    text = "humi"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    tx = (SIZE - tw) // 2 - bbox[0]
    ty = int(SIZE * WORDMARK_Y_RATIO) - bbox[1]
    draw.text((tx, ty), text, font=font, fill=NAVY)

    out_path = HERE / f"concept-{n:02d}-lockup.png"
    out.save(out_path, "PNG", optimize=True)
    made += 1

print(f"done: {made} lockups saved")
