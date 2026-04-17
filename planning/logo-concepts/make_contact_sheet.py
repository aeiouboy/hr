#!/usr/bin/env python3
"""Brand-showcase style contact sheet for Humi (32 logo concepts)."""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

HERE = Path(__file__).parent
OUT = HERE / "contact-sheet.png"

SETS = [
    {
        "label": "Set 04 · Recommended",
        "title": "Production Wordmark Logos",
        "desc": "usable today · header · favicon · business card — SuccessFactors / Odoo / Linear / Gusto vibe",
        "items": [
            ("25", "humi.",               "strong"),
            ("26", "Humi Navy",           "strong"),
            ("27", "hu ligature",         "strong"),
            ("28", "Hu icon + Humi",      "strong"),
            ("29", ".humi dot-prefix",    "pick"),
            ("30", "H mark + Humi",       "strong"),
            ("31", "humi underline",      "pick"),
            ("32", "HUMI all-caps",       "pick"),
        ],
    },
    {
        "label": "Set 01",
        "title": "People & Warmth",
        "desc": "inclusivity · unity · human-centric baseline",
        "items": [
            ("01", "Hands Circle",        ""),
            ("02", "H-Letter People",     ""),
            ("03", "Blooming Flower",     "pick"),
            ("04", "Warm Sun Crowd",      ""),
            ("05", "People Network",      ""),
            ("06", "Heart from People",   "pick"),
            ("07", "Employee Orbit",      ""),
            ("08", "Hu Monogram",         "pick"),
        ],
    },
    {
        "label": "Set 02",
        "title": "Tech × Retail × People",
        "desc": "hex grid · circuit · data ring · bag · storefront · barcode · tag",
        "items": [
            ("09", "Hex Tech Grid",       "strong"),
            ("10", "Shopping Bag People", ""),
            ("11", "Circuit Person",      ""),
            ("12", "Storefront H",        ""),
            ("13", "Data Ring People",    "strong"),
            ("14", "Barcode → People",    ""),
            ("15", "Price Tag Badge",     "pick"),
            ("16", "Pixel Hu",            ""),
        ],
    },
    {
        "label": "Set 03",
        "title": "Diverse Palettes & Concepts",
        "desc": "nature · enterprise · calm · personal · SaaS stack",
        "items": [
            ("17", "Seedling Hands",      "strong"),
            ("18", "Tree of People",      "strong"),
            ("19", "Lotus Bloom",         "pick"),
            ("20", "Origami Person",      ""),
            ("21", "Journey Path",        ""),
            ("22", "Compass Person",      ""),
            ("23", "Signature h",         "strong"),
            ("24", "Platform Stack",      "pick"),
        ],
    },
]

COLS = 4
TILE = 520
GUTTER = 36
OUTER = 88
TILE_BG = (250, 250, 250)
TILE_BORDER = (232, 232, 232)
PAGE_BG = (255, 255, 255)
INK = (17, 17, 17)
INK_SOFT = (110, 110, 112)
INK_FAINT = (168, 168, 172)
ACCENT = (232, 121, 57)
ACCENT_STRONG = (212, 90, 28)
RULE = (220, 220, 224)

META_H = 124
SECTION_H = 168
FOOTER_H = 192
HEADER_H = 260

W = OUTER * 2 + COLS * TILE + (COLS - 1) * GUTTER
ROWS_PER_SET = 2

NUM_SETS = len(SETS)
H = HEADER_H
for s in SETS:
    H += SECTION_H + ROWS_PER_SET * (TILE + META_H) + (ROWS_PER_SET - 1) * GUTTER + 40
H += FOOTER_H

def load_font(size, bold=False, mono=False):
    if mono:
        candidates = [
            "/System/Library/Fonts/Menlo.ttc",
            "/System/Library/Fonts/SFNSMono.ttf",
            "/Library/Fonts/Courier New Bold.ttf" if bold else "/Library/Fonts/Courier New.ttf",
        ]
    else:
        candidates = [
            "/System/Library/Fonts/Helvetica.ttc",
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
            "/Library/Fonts/Arial Bold.ttf" if bold else "/Library/Fonts/Arial.ttf",
        ]
    for p in candidates:
        if Path(p).exists():
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()

f_hero = load_font(88, bold=True)
f_hero_sub = load_font(22)
f_kicker = load_font(18, bold=True, mono=True)
f_section = load_font(56, bold=True)
f_section_desc = load_font(20)
f_id = load_font(16, bold=True, mono=True)
f_name = load_font(26, bold=True)
f_tag = load_font(14, bold=True, mono=True)
f_foot_title = load_font(22, bold=True)
f_foot_body = load_font(18)
f_foot_mono = load_font(16, bold=True, mono=True)

canvas = Image.new("RGB", (W, H), PAGE_BG)
draw = ImageDraw.Draw(canvas)

# Hero header
draw.text((OUTER, 80),  "HUMI — LOGO SYSTEM", font=f_kicker, fill=ACCENT_STRONG)
draw.text((OUTER, 108), "Thirty-two concepts", font=f_hero, fill=INK)
draw.text((OUTER, 216),
          "Thirty-two Humi logos · Sets 01-03 mark+wordmark lockups · Set 04 pure wordmarks · NO red · 2026-04-17",
          font=f_hero_sub, fill=INK_SOFT)
draw.line([OUTER, HEADER_H - 28, W - OUTER, HEADER_H - 28], fill=RULE, width=1)

def text_size(t, f):
    b = draw.textbbox((0, 0), t, font=f)
    return b[2] - b[0], b[3] - b[1]

def draw_tile(x, y, cid, name, mark, img_path):
    draw.rectangle([x, y, x + TILE, y + TILE], fill=TILE_BG, outline=TILE_BORDER, width=1)
    try:
        logo = Image.open(img_path).convert("RGB")
        inset = 48
        inner = TILE - inset * 2
        logo.thumbnail((inner, inner), Image.LANCZOS)
        ox = x + (TILE - logo.width) // 2
        oy = y + (TILE - logo.height) // 2
        canvas.paste(logo, (ox, oy))
    except FileNotFoundError:
        draw.text((x + 12, y + 12), f"missing {cid}", font=f_id, fill=(180, 0, 0))

    meta_y = y + TILE + 22
    draw.text((x, meta_y), f"— {cid}", font=f_id, fill=INK_FAINT)
    draw.text((x, meta_y + 22), name, font=f_name, fill=INK)

    if mark == "strong":
        tag = "★★  SHORTLIST"
        color = ACCENT_STRONG
    elif mark == "pick":
        tag = "★   CONSIDER"
        color = ACCENT
    else:
        tag = ""
        color = INK_FAINT
    if tag:
        tw, _ = text_size(tag, f_tag)
        draw.text((x + TILE - tw, meta_y + 26), tag, font=f_tag, fill=color)

y_cursor = HEADER_H
for s in SETS:
    sy = y_cursor
    draw.line([OUTER, sy + 10, W - OUTER, sy + 10], fill=RULE, width=1)
    draw.text((OUTER, sy + 28),   s["label"].upper(), font=f_kicker, fill=ACCENT_STRONG)
    draw.text((OUTER, sy + 56),   s["title"],         font=f_section, fill=INK)
    draw.text((OUTER, sy + 126),  s["desc"],          font=f_section_desc, fill=INK_SOFT)

    grid_top = sy + SECTION_H
    for i, item in enumerate(s["items"]):
        row = i // COLS
        col = i % COLS
        cid, name, mark = item
        x = OUTER + col * (TILE + GUTTER)
        ty = grid_top + row * (TILE + META_H + GUTTER)
        draw_tile(x, ty, cid, name, mark, HERE / f"concept-{cid}.png")

    y_cursor = grid_top + ROWS_PER_SET * (TILE + META_H) + (ROWS_PER_SET - 1) * GUTTER + 40

# Footer
fy = H - FOOTER_H
draw.rectangle([0, fy, W, H], fill=(20, 20, 22))
draw.text((OUTER, fy + 40), "SHORTLIST", font=f_kicker, fill=(232, 121, 57))
draw.text((OUTER, fy + 70), "Five concepts recommended for presentation to Khun Boy",
          font=f_foot_title, fill=(245, 245, 247))
shortlist = [
    ("25", "humi.",            "Gusto / Lattice tier"),
    ("26", "Humi Navy",        "Odoo / SuccessFactors"),
    ("28", "Hu icon + Humi",   "Linear / Notion lockup"),
    ("30", "H + Humi",         "Stripe / Notion mark"),
    ("27", "hu ligature",      "Airbnb-style custom type"),
]
col_width = (W - OUTER * 2) // 5
for i, (cid, name, note) in enumerate(shortlist):
    cx = OUTER + i * col_width
    draw.text((cx, fy + 118), f"— {cid}", font=f_foot_mono, fill=(232, 121, 57))
    draw.text((cx, fy + 138), name, font=f_foot_body, fill=(245, 245, 247))
    draw.text((cx, fy + 160), note, font=f_foot_body, fill=(155, 155, 160))

canvas.save(OUT, "PNG", optimize=True)
print(f"saved: {OUT}  ({W}×{H})")
