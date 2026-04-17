#!/usr/bin/env python3
"""Hand-craft concept-31 (new/hr slash) and concept-32 (NEWHR all-caps) via PIL."""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

HERE = Path(__file__).parent
SIZE = 2048

def load_font(size, bold=True, mono=False):
    candidates_mono_bold = [
        "/System/Library/Fonts/Menlo.ttc",
        "/System/Library/Fonts/SFNSMono.ttf",
    ]
    candidates_sans_bold = [
        "/System/Library/Fonts/Supplemental/Arial Black.ttf",
        "/Library/Fonts/Arial Black.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    ]
    candidates = candidates_mono_bold if mono else candidates_sans_bold
    for p in candidates:
        if Path(p).exists():
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()

def draw_centered(img, draw, parts, y_offset=0):
    """parts = [(text, font, color)]; draw centered horizontally on canvas."""
    sizes = [(draw.textbbox((0, 0), t, font=f), f, c, t) for (t, f, c) in parts]
    widths = [b[2] - b[0] for (b, _, _, _) in sizes]
    total = sum(widths)
    x = (img.width - total) // 2
    max_h = max(b[3] - b[1] for (b, _, _, _) in sizes)
    y = (img.height - max_h) // 2 + y_offset
    for (bbox, f, color, text), w in zip(sizes, widths):
        draw.text((x - bbox[0], y - bbox[1]), text, font=f, fill=color)
        x += w

# ---------- Concept 32 — HUMI all-caps single navy (PIL fallback) ----------
img32 = Image.new("RGB", (SIZE, SIZE), (255, 255, 255))
d32 = ImageDraw.Draw(img32)
font_caps = load_font(560, bold=True, mono=False)
NAVY = (15, 23, 42)
draw_centered(img32, d32, [
    ("HUMI", font_caps, NAVY),
])
img32.save(HERE / "concept-32.png", "PNG", optimize=True)
print("saved concept-32.png")
