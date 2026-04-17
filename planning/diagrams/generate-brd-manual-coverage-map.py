"""Generate BRD-207 × SAP Manual Workflow Coverage Map (Excalidraw JSON).

Layout: horizontal bar chart arguing "SAP covers 68%, 32% needs custom build"
 Section 0: Title + 3-color legend
 Section 1: 16 workflow bars (TTT-01..11 + FO-10..50), bar length ∝ BRD count
 Section 2: 3 big coverage numbers (107/34/66)
 Section 3: Gap cluster bars (8 rows)
 Section 4: Sprint 1 action guidance
"""
import json
import random
from pathlib import Path

random.seed(42)

OUT = "/Users/tachongrak/stark/projects/hr-platform-replacement/diagrams/brd-manual-coverage-map.excalidraw"

# ── Color Palette (from references/color-palette.md) ──
TITLE = "#1e40af"
SUBTITLE = "#3b82f6"
BODY = "#64748b"
TEXT_LIGHT = "#374151"

TTT_FILL = "#dbeafe"   # light blue for TTT bars
TTT_STROKE = "#1e40af"
FO_FILL = "#ccfbf1"    # light teal for FO bars
FO_STROKE = "#0f766e"

GREEN_FILL = "#a7f3d0"
GREEN_STROKE = "#047857"
YELLOW_FILL = "#fef3c7"
YELLOW_STROKE = "#b45309"
RED_FILL = "#fecaca"
RED_STROKE = "#b91c1c"
WARN_FILL = "#fee2e2"

# ── Data (sourced from brd-207-manual-workflow-matrix.xlsx) ──
TTT_WORKFLOWS = [
    ("TTT-01", "Hire & Rehire", 16),
    ("TTT-02", "Manage Probation", 1),
    ("TTT-03", "Maintain Master Data", 70),
    ("TTT-04", "Manage Employee Movement", 16),
    ("TTT-05", "Manage Pay Rate Change", 13),
    ("TTT-06", "Manage Change Emp Type", 6),
    ("TTT-07", "Manage Suspension", 0),
    ("TTT-08", "Acting Assignment", 3),
    ("TTT-09", "Manage Contract Renewal", 1),
    ("TTT-10", "Terminate", 12),
    ("TTT-11", "EC Report", 42),
]
FO_WORKFLOWS = [
    ("FO-10", "Maintain Organization Structure", 7),
    ("FO-20", "Organization Re-structuring", 2),
    ("FO-30", "Maintain Job", 0),
    ("FO-40", "Position Management", 6),
    ("FO-50", "Other Foundation Object", 2),
]
GAP_CLUSTERS = [
    ("Special Information", 24, "cust_* fields: awards, certs, loans"),
    ("Foundation Reports", 9, "Org/Job/Position master data reports"),
    ("Admin Self Service", 6, "Custom admin actions"),
    ("Employment Info", 4, "Extra attributes"),
    ("System Feature", 4, "E-doc, language, UX/UI"),
    ("Employee Self Service", 3, "ESS custom flows"),
    ("Manager Self Service", 3, "MSS custom flows"),
    ("Permissions & Audit", 13, "Role, Proxy, Data Permission"),
]
TOTAL_BRDS = 207
SUPPORTED = 107
PARTIAL = 34
GAP = 66

elements = []
_id = 0


def next_id(prefix="e"):
    global _id
    _id += 1
    return f"{prefix}_{_id:04d}"


def seed():
    return random.randint(1, 999999)


def base(**kw):
    d = {
        "id": kw.get("id", next_id()),
        "type": kw["type"],
        "x": kw["x"],
        "y": kw["y"],
        "width": kw.get("width", 100),
        "height": kw.get("height", 30),
        "angle": 0,
        "strokeColor": kw.get("strokeColor", "#1e40af"),
        "backgroundColor": kw.get("backgroundColor", "transparent"),
        "fillStyle": kw.get("fillStyle", "solid"),
        "strokeWidth": kw.get("strokeWidth", 1),
        "strokeStyle": kw.get("strokeStyle", "solid"),
        "roughness": 0,
        "opacity": 100,
        "groupIds": [],
        "frameId": None,
        "roundness": kw.get("roundness", None),
        "seed": seed(),
        "version": 1,
        "versionNonce": seed(),
        "isDeleted": False,
        "boundElements": kw.get("boundElements", None),
        "updated": 1,
        "link": None,
        "locked": False,
    }
    return d


def rect(x, y, w, h, fill="transparent", stroke="#1e40af", stroke_width=1, stroke_style="solid", round_=True):
    r = base(type="rectangle", x=x, y=y, width=w, height=h,
             strokeColor=stroke, backgroundColor=fill, strokeWidth=stroke_width,
             strokeStyle=stroke_style,
             roundness={"type": 3} if round_ else None)
    elements.append(r)
    return r


def text(x, y, content, size=14, color=BODY, align="left", width=None, bold=False):
    w = width or max(len(content) * size * 0.55, 30)
    h = size * 1.3
    t = base(type="text", x=x, y=y, width=int(w), height=int(h), strokeColor=color)
    t["text"] = content
    t["originalText"] = content
    t["fontSize"] = size
    t["fontFamily"] = 2
    t["textAlign"] = align
    t["verticalAlign"] = "top"
    t["baseline"] = int(size * 0.9)
    t["lineHeight"] = 1.25
    t["containerId"] = None
    elements.append(t)
    return t


def line(x, y, points, stroke=BODY, stroke_width=1, dashed=False):
    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    w = max(xs) - min(xs) + 1
    h = max(ys) - min(ys) + 1
    l = base(type="line", x=x, y=y, width=w, height=h,
             strokeColor=stroke, strokeWidth=stroke_width,
             strokeStyle="dashed" if dashed else "solid")
    l["points"] = points
    l["startBinding"] = None
    l["endBinding"] = None
    l["lastCommittedPoint"] = None
    l["startArrowhead"] = None
    l["endArrowhead"] = None
    elements.append(l)
    return l


# ─────── SECTION 0: Title + Legend ───────
CANVAS_W = 1680

# Title
text(80, 40, "BRD-207 × SAP Manual Workflow Coverage", size=32, color=TITLE, bold=True, width=900)
text(80, 88, "Gap analysis: คู่มือ SAP ครอบคลุม BRD to-be แค่ไหน และต้อง custom build อะไรบ้าง", size=14, color=BODY, width=900)

# Legend — 3 color chips
lx = 80
ly = 128
CHIP_W = 22
GAP_X = 330

def legend_chip(x, fill, stroke, label, count, pct):
    rect(x, ly, CHIP_W, CHIP_W, fill=fill, stroke=stroke, stroke_width=1.5)
    text(x + CHIP_W + 10, ly + 2, label, size=14, color=TITLE, width=200)
    text(x + CHIP_W + 10, ly + 22, f"{count} BRDs ({pct})", size=12, color=BODY, width=200)

legend_chip(lx, GREEN_FILL, GREEN_STROKE, "Supported", 107, "52%")
legend_chip(lx + GAP_X, YELLOW_FILL, YELLOW_STROKE, "Partial", 34, "16%")
legend_chip(lx + 2 * GAP_X, RED_FILL, RED_STROKE, "Not in Manual", 66, "32%")

# Divider
line(80, 180, [[0, 0], [1520, 0]], stroke="#cbd5e1", stroke_width=1)

# ─────── SECTION 1: Workflow bars ───────
# Section 1 header
text(80, 200, "Step 1 — BRD coverage per SAP manual workflow", size=18, color=TITLE, width=700)
text(80, 226, "Bar length ∝ BRD count. แถวเขียน 0 BRDs = workflow ไม่มี BRD map (⚠️)", size=12, color=BODY, width=700)

# Sub-header: EC Core TTT
TTT_Y0 = 272
text(80, TTT_Y0, "EC Core — 11 Training Manual Processes (TTT-01..11)", size=15, color=SUBTITLE, bold=True, width=700)

# Bar chart constants
BAR_X = 340       # where bars start
BAR_MAX_W = 900   # max bar width (for max count)
BAR_H = 30
ROW_GAP = 42
MAX_COUNT = 70

def draw_bar(y, wf_id, name, count, bar_fill, bar_stroke, total=TOTAL_BRDS):
    # Workflow ID + name (left)
    text(80, y + 5, f"{wf_id}  {name}", size=13, color=TEXT_LIGHT, width=240)
    # Bar (scaled)
    if count == 0:
        # Empty marker: dashed red thin rect
        rect(BAR_X, y, 80, BAR_H, fill=WARN_FILL, stroke=RED_STROKE, stroke_style="dashed")
        text(BAR_X + 8, y + 7, "0  ⚠️  no BRDs", size=12, color=RED_STROKE, width=120)
    else:
        bar_w = max(30, int((count / MAX_COUNT) * BAR_MAX_W))
        rect(BAR_X, y, bar_w, BAR_H, fill=bar_fill, stroke=bar_stroke, stroke_width=1.2)
        # Count badge inside bar (right-aligned)
        text(BAR_X + bar_w + 10, y + 7, f"{count} BRDs", size=13, color=TITLE, width=100, bold=True)
        pct = 100 * count / total
        text(BAR_X + bar_w + 95, y + 8, f"({pct:.1f}%)", size=11, color=BODY, width=80)

ty = TTT_Y0 + 34
for wf_id, name, count in TTT_WORKFLOWS:
    draw_bar(ty, wf_id, name, count, TTT_FILL, TTT_STROKE)
    ty += ROW_GAP

# Sub-header: EC FO
FO_Y0 = ty + 18
text(80, FO_Y0, "EC FO — 5 Foundation Object Workflows (FO-10..50)", size=15, color="#0f766e", bold=True, width=700)

fy = FO_Y0 + 34
for wf_id, name, count in FO_WORKFLOWS:
    draw_bar(fy, wf_id, name, count, FO_FILL, FO_STROKE)
    fy += ROW_GAP

# Divider after section 1
divider_y = fy + 20
line(80, divider_y, [[0, 0], [1520, 0]], stroke="#cbd5e1", stroke_width=1)

# ─────── SECTION 2: Big Coverage Numbers ───────
STATS_Y = divider_y + 30
text(80, STATS_Y, "Step 2 — Overall Manual Coverage", size=18, color=TITLE, width=600)

# 3 big numbers in a strip
BIG_Y = STATS_Y + 44
box_w = 480
gap_x = 40

def big_number(x, num, label, color_fill, color_stroke, note):
    # Large number
    text(x + 20, BIG_Y + 30, str(num), size=72, color=color_stroke, bold=True, width=box_w-40)
    text(x + 20, BIG_Y + 120, label, size=20, color=TITLE, bold=True, width=box_w-40)
    text(x + 20, BIG_Y + 152, note, size=13, color=BODY, width=box_w-40)
    # Color chip next to number
    rect(x + 420, BIG_Y + 50, 36, 36, fill=color_fill, stroke=color_stroke, stroke_width=1.5)

big_number(80, SUPPORTED, "🟢 Supported", GREEN_FILL, GREEN_STROKE,
           "Manual covers end-to-end → configure only")
big_number(80 + box_w + gap_x, PARTIAL, "🟡 Partial", YELLOW_FILL, YELLOW_STROKE,
           "Manual touches concept → extend/refine")
big_number(80 + 2 * (box_w + gap_x), GAP, "🔴 Custom Build", RED_FILL, RED_STROKE,
           "Not in manual → develop from scratch")

# Divider after section 2
divider_y_2 = BIG_Y + 200
line(80, divider_y_2, [[0, 0], [1520, 0]], stroke="#cbd5e1", stroke_width=1)

# ─────── SECTION 3: Gap Cluster Breakdown ───────
GAP_Y0 = divider_y_2 + 30
text(80, GAP_Y0, "Step 3 — Where the 66 custom-build BRDs live", size=18, color=TITLE, width=700)
text(80, GAP_Y0 + 26, "สำรวจ 66 BRDs ที่ไม่อยู่ใน manual — cluster ตาม sub-category (เรียงตามจำนวน)", size=12, color=BODY, width=900)

GAP_BAR_X = 340
GAP_MAX_W = 700
GAP_MAX_COUNT = 24
GAP_ROW_GAP = 38

gy = GAP_Y0 + 64
for cluster, count, note in GAP_CLUSTERS:
    text(80, gy + 5, cluster, size=13, color=TEXT_LIGHT, width=240, bold=True)
    bar_w = max(40, int((count / GAP_MAX_COUNT) * GAP_MAX_W))
    rect(GAP_BAR_X, gy, bar_w, 26, fill=RED_FILL, stroke=RED_STROKE, stroke_width=1.2)
    text(GAP_BAR_X + bar_w + 10, gy + 5, f"{count} BRDs", size=13, color=RED_STROKE, bold=True, width=80)
    # Note
    text(GAP_BAR_X + bar_w + 90, gy + 6, f"— {note}", size=11, color=BODY, width=400)
    gy += GAP_ROW_GAP

# Divider after section 3
divider_y_3 = gy + 20
line(80, divider_y_3, [[0, 0], [1520, 0]], stroke="#cbd5e1", stroke_width=1)

# ─────── SECTION 4: Action Summary ───────
ACTION_Y = divider_y_3 + 30
text(80, ACTION_Y, "Step 4 — Sprint 1 Scope Guidance", size=18, color=TITLE, width=700)

AX = 80
ay = ACTION_Y + 40

def action_item(y, icon, title, detail):
    text(AX, y, icon, size=16, color=TITLE, width=28)
    text(AX + 36, y, title, size=14, color=TITLE, bold=True, width=900)
    text(AX + 36, y + 22, detail, size=12, color=BODY, width=1200)

action_item(ay, "✓",
            "Config-first: TTT-03 Master Data (70) + TTT-11 Report (42) + TTT-01 Hire (16) = 128 BRDs ready",
            "ใช้ SAP standard capability — configure, ไม่ต้อง build → effort ต่ำสุด, ROI สูง เริ่มได้ Sprint 1")
action_item(ay + 56, "⚠",
            "Custom budget: 66 BRDs — 24 Special Information เป็น cust_* fields (awards, certs, loans, guarantors)",
            "ต้อง scope + estimate แยก, เป็น CFR-specific extension ที่ SAP manual ไม่คลุม")
action_item(ay + 112, "❓",
            "Validate with BA: FO-30 Maintain Job + TTT-07 Suspension = 0 BRDs mapped — อาจพลาด",
            "เช็คว่า Job Foundation + Suspension workflow ยังขาด BRD หรือ sub-category ถูก bundle ไว้ที่อื่น")
action_item(ay + 168, "📊",
            "Priority for Sprint 1: Epic 1 (Org Foundation 13 types) + Epic 2 (Position & Job)",
            "จาก priorities.md — FO-10 (7) + FO-40 (6) + flow-01/flow-11 BRDs = scope ชัดเจน, migration พร้อม")

# ─────── Bottom footer ───────
footer_y = ay + 240
text(80, footer_y, "Source: brd-207-manual-workflow-matrix.xlsx (207 BRDs · 16 workflows · 197 mappings)",
     size=10, color="#94a3b8", width=1000)
text(80, footer_y + 18, "Generated: 2026-04-16 · HR Platform Replacement · Sprint 1 Pre-work",
     size=10, color="#94a3b8", width=1000)

# ─────── Output ───────
doc = {
    "type": "excalidraw",
    "version": 2,
    "source": "https://excalidraw.com",
    "elements": elements,
    "appState": {"viewBackgroundColor": "#ffffff", "gridSize": 20},
    "files": {},
}

Path(OUT).parent.mkdir(parents=True, exist_ok=True)
Path(OUT).write_text(json.dumps(doc, indent=2, ensure_ascii=False))
print(f"Elements: {len(elements)}")
print(f"Max Y: ~{footer_y + 40}")
print(f"Saved: {OUT}")
