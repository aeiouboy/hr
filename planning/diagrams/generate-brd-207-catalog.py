"""Generate BRD-207 Reference Catalog (Excalidraw JSON).

Catalog/Grid pattern: 207 mini-cards grouped by Category, color-coded by Coverage.
Purpose: Browsable reference for BU — look up any BRD by #, see workflow + coverage at a glance.

Companion to: all-flows-ec.excalidraw (argue-first) + brd-manual-coverage-map.excalidraw (argue-first)
"""
import json
import random
from pathlib import Path

random.seed(200)

OUT = "/Users/tachongrak/stark/projects/hr-platform-replacement/diagrams/brd-207-catalog.excalidraw"
DATA = "/tmp/brd_catalog_data.json"

# ── Palette ──
TITLE = "#1e40af"
SUBTITLE = "#3b82f6"
BODY = "#64748b"
TEXT_DARK = "#1e293b"

GREEN_F, GREEN_S = "#a7f3d0", "#047857"
YELLOW_F, YELLOW_S = "#fef3c7", "#b45309"
RED_F, RED_S = "#fecaca", "#b91c1c"

# Font: 3 = Cascadia monospace (matches all-flows-ec style)
FONT = 3

# Card layout
CARD_W = 220
CARD_H = 58
GAP_X = 12
GAP_Y = 12
COLS = 6  # 6 cards per row
MARGIN = 60

# Category sort order (largest first, with foundation last)
CAT_ORDER = [
    "Employee Data Management",
    "EC Reporting",
    "EC Self Service",
    "EC Data Management",
    "Organization & Position Management",
    "EC User Management",
    "EC Core & Foundation",
]

data = json.loads(Path(DATA).read_text())
# Group by category, sort BRDs by # within each
by_cat = {}
for b in data:
    c = b["cat"] or "Uncategorized"
    by_cat.setdefault(c, []).append(b)
for c in by_cat:
    by_cat[c].sort(key=lambda x: x["no"])

elements = []
_id = 0


def next_id():
    global _id
    _id += 1
    return f"cat_{_id:04d}"


def seed():
    return random.randint(1, 999999)


def mk_rect(x, y, w, h, fill, stroke, stroke_width=1.2, stroke_style="solid", rounded=True):
    return {
        "id": next_id(), "type": "rectangle",
        "x": x, "y": y, "width": w, "height": h,
        "angle": 0, "strokeColor": stroke, "backgroundColor": fill,
        "fillStyle": "solid", "strokeWidth": stroke_width, "strokeStyle": stroke_style,
        "roughness": 0, "opacity": 100, "groupIds": [], "frameId": None,
        "roundness": {"type": 3} if rounded else None, "seed": seed(),
        "version": 1, "versionNonce": seed(), "isDeleted": False,
        "boundElements": None, "updated": 1, "link": None, "locked": False,
    }


def mk_text(x, y, text, size, color, w=None, h=None, align="left", bold=False):
    if w is None:
        w = max(20, int(len(text) * size * 0.55))
    if h is None:
        h = int(size * 1.3)
    return {
        "id": next_id(), "type": "text",
        "x": x, "y": y, "width": w, "height": h,
        "angle": 0, "strokeColor": color, "backgroundColor": "transparent",
        "fillStyle": "solid", "strokeWidth": 1, "strokeStyle": "solid",
        "roughness": 0, "opacity": 100, "groupIds": [], "frameId": None,
        "roundness": None, "seed": seed(),
        "version": 1, "versionNonce": seed(), "isDeleted": False,
        "boundElements": None, "updated": 1, "link": None, "locked": False,
        "text": text, "originalText": text,
        "fontSize": size, "fontFamily": FONT,
        "textAlign": align, "verticalAlign": "top",
        "baseline": int(size * 0.9), "lineHeight": 1.25, "containerId": None,
    }


def mk_line(x, y, points, stroke=BODY, width=1, dashed=False):
    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    return {
        "id": next_id(), "type": "line",
        "x": x, "y": y,
        "width": max(xs) - min(xs) + 1, "height": max(ys) - min(ys) + 1,
        "angle": 0, "strokeColor": stroke, "backgroundColor": "transparent",
        "fillStyle": "solid", "strokeWidth": width,
        "strokeStyle": "dashed" if dashed else "solid",
        "roughness": 0, "opacity": 100, "groupIds": [], "frameId": None,
        "roundness": None, "seed": seed(),
        "version": 1, "versionNonce": seed(), "isDeleted": False,
        "boundElements": None, "updated": 1, "link": None, "locked": False,
        "points": points, "startBinding": None, "endBinding": None,
        "lastCommittedPoint": None, "startArrowhead": None, "endArrowhead": None,
    }


def coverage_colors(cov):
    if cov == "Supported":
        return GREEN_F, GREEN_S
    if cov == "Partial":
        return YELLOW_F, YELLOW_S
    return RED_F, RED_S


def render_card(x, y, brd):
    fill, stroke = coverage_colors(brd["coverage"])
    # Card background
    elements.append(mk_rect(x, y, CARD_W, CARD_H, fill, stroke, stroke_width=1.2))
    # BRD number (top-left, bold, large)
    elements.append(mk_text(x + 8, y + 5, f"#{brd['no']}", 15, TEXT_DARK, w=50))
    # Coverage dot (top-right) — small filled circle
    dot_size = 10
    elements.append(mk_rect(x + CARD_W - 18, y + 7, dot_size, dot_size, stroke, stroke, stroke_width=1))
    # Feature name (truncated, center-y)
    feat = brd["feature"]
    if len(feat) > 26:
        feat = feat[:24] + "…"
    elements.append(mk_text(x + 8, y + 25, feat, 10, TEXT_DARK, w=CARD_W - 16))
    # Workflow tags (bottom, small)
    wfs = brd["wfs"]
    tag_txt = " ".join(wfs[:3])
    if len(wfs) > 3:
        tag_txt += f" +{len(wfs)-3}"
    if not wfs:
        tag_txt = "— no workflow"
    elements.append(mk_text(x + 8, y + 42, tag_txt, 9, BODY, w=CARD_W - 16))


# ── Title ──
elements.append(mk_text(MARGIN, 30, "BRD-207 Reference Catalog", 30, TITLE, w=900))
elements.append(mk_text(MARGIN, 72, "Browsable index of all 207 EC BRDs · grouped by category · color = manual coverage",
                         13, BODY, w=1000))

# ── Legend ──
legend_y = 105
LCHIP = 18
elements.append(mk_rect(MARGIN, legend_y, LCHIP, LCHIP, GREEN_F, GREEN_S))
elements.append(mk_text(MARGIN + LCHIP + 8, legend_y + 2, "Supported (107)", 12, GREEN_S, w=200))

elements.append(mk_rect(MARGIN + 240, legend_y, LCHIP, LCHIP, YELLOW_F, YELLOW_S))
elements.append(mk_text(MARGIN + 240 + LCHIP + 8, legend_y + 2, "Partial (34)", 12, YELLOW_S, w=200))

elements.append(mk_rect(MARGIN + 460, legend_y, LCHIP, LCHIP, RED_F, RED_S))
elements.append(mk_text(MARGIN + 460 + LCHIP + 8, legend_y + 2, "Not in Manual (66)", 12, RED_S, w=200))

# Usage hint
elements.append(mk_text(MARGIN + 760, legend_y + 2,
                         "Card = BRD# + feature + workflow tags",
                         11, BODY, w=400))

# ── Divider ──
elements.append(mk_line(MARGIN, legend_y + 35, [[0, 0], [COLS * (CARD_W + GAP_X) - GAP_X, 0]],
                         stroke="#cbd5e1", width=1))

# ── Category sections ──
y_cursor = legend_y + 65

for cat in CAT_ORDER:
    brds = by_cat.get(cat, [])
    if not brds:
        continue

    # Category header
    elements.append(mk_text(MARGIN, y_cursor, cat, 20, TITLE, w=700, bold=True))
    cov_counts = {"Supported": 0, "Partial": 0, "Not in Manual": 0}
    for b in brds:
        cov_counts[b.get("coverage", "Not in Manual")] = cov_counts.get(b.get("coverage", "Not in Manual"), 0) + 1
    stats = f"{len(brds)} BRDs  ·  🟢 {cov_counts.get('Supported',0)}  🟡 {cov_counts.get('Partial',0)}  🔴 {cov_counts.get('Not in Manual',0)}"
    elements.append(mk_text(MARGIN, y_cursor + 28, stats, 12, BODY, w=700))

    y_cursor += 58

    # Cards in grid
    for i, brd in enumerate(brds):
        col = i % COLS
        row = i // COLS
        cx = MARGIN + col * (CARD_W + GAP_X)
        cy = y_cursor + row * (CARD_H + GAP_Y)
        render_card(cx, cy, brd)

    rows = (len(brds) + COLS - 1) // COLS
    y_cursor += rows * (CARD_H + GAP_Y) + 28

# Uncategorized (edge case: BRD #100 has empty category)
misc = [b for b in data if not b["cat"]]
if misc:
    elements.append(mk_text(MARGIN, y_cursor, "Uncategorized", 20, TITLE, w=700))
    y_cursor += 40
    for i, brd in enumerate(misc):
        col = i % COLS
        row = i // COLS
        cx = MARGIN + col * (CARD_W + GAP_X)
        cy = y_cursor + row * (CARD_H + GAP_Y)
        render_card(cx, cy, brd)
    rows = (len(misc) + COLS - 1) // COLS
    y_cursor += rows * (CARD_H + GAP_Y) + 20

# ── Footer ──
footer_y = y_cursor + 20
elements.append(mk_line(MARGIN, footer_y, [[0, 0], [COLS * (CARD_W + GAP_X) - GAP_X, 0]],
                         stroke="#cbd5e1", width=1))
elements.append(mk_text(MARGIN, footer_y + 10,
                         "Source: brd-207-manual-workflow-matrix.xlsx · Coverage map: brd-manual-coverage-map.excalidraw · Flows: all-flows-ec.excalidraw",
                         10, "#94a3b8", w=1400))
elements.append(mk_text(MARGIN, footer_y + 28,
                         "Generated: 2026-04-16 · HR Platform Replacement · Sprint 1 Pre-work",
                         10, "#94a3b8", w=1000))

# ── Output ──
doc = {
    "type": "excalidraw",
    "version": 2,
    "source": "https://excalidraw.com",
    "elements": elements,
    "appState": {"viewBackgroundColor": "#ffffff", "gridSize": 20},
    "files": {},
}

Path(OUT).write_text(json.dumps(doc, indent=2, ensure_ascii=False))
max_y = max(e.get("y", 0) + e.get("height", 0) for e in elements)
max_x = max(e.get("x", 0) + e.get("width", 0) for e in elements)
print(f"Elements: {len(elements)}")
print(f"Canvas: {int(max_x)} × {int(max_y)}")
print(f"Saved: {OUT}")
