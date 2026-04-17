#!/usr/bin/env python3
"""Humi brand deck v2 — 18 production directions across three families (wordmark-led + mark-led symmetric + horizontal gradient lockups)."""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

HERE = Path(__file__).parent
OUT = HERE / "humi-brand-deck.png"

FAMILIES = [
    {
        "label": "FAMILY A · WORDMARK-LED",
        "title": "Typography is the mark",
        "blurb": "Pure type · the name is the brand · Linear / Gusto / SuccessFactors territory",
        "directions": [
            {"id": "01", "name": "The Minimal Dot",        "lockup": "humi.",        "refs": "Gusto · Linear · Vercel",          "mood": "minimal editorial SaaS · amber accent dot doubles as favicon"},
            {"id": "02", "name": "The Enterprise Wordmark","lockup": "Humi",         "refs": "SuccessFactors · Odoo · SAP",       "mood": "serious monochrome · trustworthy · zero decoration"},
            {"id": "03", "name": "The Chip Lockup",        "lockup": "[h] humi",     "refs": "Slack · Notion · Linear",           "mood": "friendly consumer SaaS · chip doubles as app icon"},
            {"id": "04", "name": "The Humanist",           "lockup": "humi",         "refs": "Airbnb · Stripe · Bear",            "mood": "premium humanist · flared terminals · crafted not generic"},
            {"id": "05", "name": "The All-Caps",           "lockup": "HUMI",         "refs": "PeopleSoft · IBM · Oracle",         "mood": "authoritative · purple-indigo · enterprise presence"},
            {"id": "06", "name": "The Dot Mark",           "lockup": "◯ humi",      "refs": "Figma · Notion · Loom",             "mood": "minimalist tool · mark extracts letter-i from wordmark"},
        ],
    },
    {
        "label": "FAMILY B · MARK-LED (SYMMETRIC GRAPHICS)",
        "title": "The graphic is the mark",
        "blurb": "Symbol-first · wordmark supports · Airbnb Bélo / Mastercard / Asana territory",
        "directions": [
            {"id": "07", "name": "The People Wreath",      "lockup": "six persons radial",   "refs": "Airbnb Bélo · Mastercard · Target",        "mood": "6-fold rotational · community · alternating teal+amber"},
            {"id": "08", "name": "The h-Chip",             "lockup": "h inside teal square", "refs": "Pinterest · Dropbox · Loom",                "mood": "iconic rounded-square · h letterform as brand seal"},
            {"id": "09", "name": "The Network Diamond",    "lockup": "4-node hub diagram",   "refs": "Asana · Square · clean tech",               "mood": "4-fold symmetric · org network · connected team"},
            {"id": "10", "name": "The Growth Peaks",       "lockup": "twin peaks + arrow",   "refs": "Patagonia · REI · growth brands",           "mood": "mirror symmetric · ascent · forest + gold"},
            {"id": "11", "name": "The Honeycomb Cell",     "lockup": "concentric hexagons",  "refs": "cell biology · modular tech",               "mood": "6-fold symmetric · individual inside organization"},
            {"id": "12", "name": "The Orbital Dot",        "lockup": "ring + top dot",       "refs": "Chrome simple · Figma · Japanese mon",      "mood": "mirror symmetric · minimal · most iconic"},
        ],
    },
    {
        "label": "FAMILY C · HORIZONTAL GRADIENT LOCKUPS",
        "title": "Colorful side-by-side",
        "blurb": "Mark left · wordmark right · gradient and multi-color · Slack / Instagram / Linear territory",
        "directions": [
            {"id": "13", "name": "The Gradient Chip",        "lockup": "[h] humi",             "refs": "Slack · Figma · Loom",              "mood": "diagonal teal→amber gradient chip · vibrant app icon"},
            {"id": "14", "name": "The Sunrise Arc",          "lockup": "∩ humi",               "refs": "Instagram · Asana",                 "mood": "amber→coral→plum horizontal sweep · rising energy"},
            {"id": "15", "name": "The Ascending Bars",       "lockup": "▮▮▮ humi",             "refs": "Linear · Monday.com",               "mood": "5 discrete-color bars · growth · data viz"},
            {"id": "16", "name": "The Gradient Orb",         "lockup": "● humi",               "refs": "Discord · Loom",                    "mood": "vertical teal→amber circle · soft luminous"},
            {"id": "17", "name": "The Overlapping Circles",  "lockup": "◉◉◉ humi",             "refs": "Mastercard · Adobe CC",             "mood": "3 translucent circles · brand colors blending"},
            {"id": "18", "name": "The Gradient Letter",      "lockup": "h humi",               "refs": "Stripe · Monday.com",               "mood": "standalone h with diagonal gradient · minimal · letter IS the mark"},
        ],
    },
]

COLS = 2
TILE = 920
GUTTER = 56
OUTER = 112
TILE_BG = (250, 250, 250)
TILE_BORDER = (232, 232, 232)
PAGE_BG = (255, 255, 255)
INK = (15, 23, 42)
INK_SOFT = (95, 95, 100)
INK_FAINT = (158, 158, 165)
ACCENT = (245, 158, 11)
RULE = (222, 222, 228)
DARK_BG = (15, 23, 42)
DARK_INK = (245, 245, 247)
DARK_SOFT = (155, 160, 172)

META_H = 172
HEADER_H = 360
FOOTER_H = 260
SECTION_H = 240

W = OUTER * 2 + COLS * TILE + (COLS - 1) * GUTTER

total_dirs = sum(len(f["directions"]) for f in FAMILIES)
rows_total = 0
for f in FAMILIES:
    rows_total += (len(f["directions"]) + COLS - 1) // COLS
row_h = TILE + META_H
H = HEADER_H + len(FAMILIES) * SECTION_H + rows_total * row_h + (rows_total - len(FAMILIES)) * GUTTER + FOOTER_H + 60

def font(size, bold=False, mono=False):
    if mono:
        paths = ["/System/Library/Fonts/Menlo.ttc", "/System/Library/Fonts/SFNSMono.ttf"]
    else:
        paths = [
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Helvetica.ttc",
            "/System/Library/Fonts/Helvetica.ttc",
        ]
    for p in paths:
        if Path(p).exists():
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()

f_hero = font(104, bold=True)
f_hero_sub = font(24)
f_kicker = font(18, bold=True, mono=True)
f_section = font(56, bold=True)
f_section_blurb = font(20)
f_dir_num = font(40, bold=True, mono=True)
f_dir_name = font(42, bold=True)
f_dir_refs = font(18, mono=True)
f_dir_mood = font(20)
f_foot_title = font(24, bold=True)
f_foot_body = font(18)
f_foot_mono = font(16, bold=True, mono=True)

canvas = Image.new("RGB", (W, H), PAGE_BG)
draw = ImageDraw.Draw(canvas)

draw.text((OUTER, 90),  "HUMI — BRAND LOGO SYSTEM", font=f_kicker, fill=ACCENT)
draw.text((OUTER, 124), "Eighteen directions", font=f_hero, fill=INK)
draw.text((OUTER, 258),
          "Three families: wordmark-led, mark-led symmetric, and horizontal gradient lockups · production-grade · pick one direction to lock the full brand system · 2026-04-17",
          font=f_hero_sub, fill=INK_SOFT)
draw.line([OUTER, HEADER_H - 24, W - OUTER, HEADER_H - 24], fill=RULE, width=1)

def paste_logo(x, y, path):
    draw.rectangle([x, y, x + TILE, y + TILE], fill=TILE_BG, outline=TILE_BORDER, width=1)
    try:
        img = Image.open(path).convert("RGB")
        inset = 48
        inner = TILE - inset * 2
        img.thumbnail((inner, inner), Image.LANCZOS)
        canvas.paste(img, (x + (TILE - img.width) // 2, y + (TILE - img.height) // 2))
    except FileNotFoundError:
        draw.text((x + 24, y + 24), f"missing {path.name}", font=f_dir_refs, fill=(180, 30, 30))

y_cursor = HEADER_H
for fam in FAMILIES:
    draw.line([OUTER, y_cursor + 16, W - OUTER, y_cursor + 16], fill=RULE, width=1)
    draw.text((OUTER, y_cursor + 36),  fam["label"], font=f_kicker, fill=ACCENT)
    draw.text((OUTER, y_cursor + 64),  fam["title"], font=f_section, fill=INK)
    draw.text((OUTER, y_cursor + 140), fam["blurb"], font=f_section_blurb, fill=INK_SOFT)
    grid_top = y_cursor + SECTION_H

    for i, d in enumerate(fam["directions"]):
        row = i // COLS
        col = i % COLS
        x = OUTER + col * (TILE + GUTTER)
        y = grid_top + row * (row_h + GUTTER)
        paste_logo(x, y, HERE / f"humi-{d['id']}.png")
        my = y + TILE + 24
        draw.text((x, my), f"— DIRECTION {d['id']}", font=f_kicker, fill=ACCENT)
        draw.text((x, my + 26), d["name"], font=f_dir_name, fill=INK)
        draw.text((x, my + 86), d["refs"].upper(), font=f_dir_refs, fill=INK_FAINT)
        draw.text((x, my + 118), d["mood"], font=f_dir_mood, fill=INK_SOFT)

    rows_in_fam = (len(fam["directions"]) + COLS - 1) // COLS
    y_cursor = grid_top + rows_in_fam * row_h + (rows_in_fam - 1) * GUTTER + 40

fy = H - FOOTER_H
draw.rectangle([0, fy, W, H], fill=DARK_BG)
draw.text((OUTER, fy + 48), "DECISION", font=f_kicker, fill=ACCENT)
draw.text((OUTER, fy + 78), "Pick one direction — we develop the full brand system from there",
          font=f_foot_title, fill=DARK_INK)
draw.text((OUTER, fy + 124),
          "next steps after direction lock: color system · typography pairings · favicon + app icon · dark mode · usage guidelines · business card + header template",
          font=f_foot_body, fill=DARK_SOFT)
draw.text((OUTER, fy + 184), "RUNGROTE · CHONGRAK · APR 2026", font=f_foot_mono, fill=DARK_SOFT)

canvas.save(OUT, "PNG", optimize=True)
print(f"saved: {OUT}  ({W}×{H})")
