#!/usr/bin/env python3
"""Flow-09 Hire workflow — proper swimlane + BRD inline + side detail panels.

Design:
  - Header banner (title + BRD summary)
  - Data source row
  - BAND 1 header
  - Actor/Goal strip
  - Swimlane: 4 lanes horizontal (Employee/Manager/HR/System)
    × timeline columns left-to-right
    × each step in lane of actor who does it
    × arrows cross lanes showing handoffs
  - BRD side panels (right) with real content from BRD-EC-summary.md

All text width pre-calculated to prevent overflow.
Iteration: render → inspect → fix → re-render until clean.
"""
import json
from pathlib import Path
from uuid import uuid4

OUT = Path(__file__).parent / 'BRD-ec-flow-09-hire-lifecycle.excalidraw'
BRD_DATA = Path('/tmp/brd-details.json')

# ---------------------------------------------------------------
# HELPERS
# ---------------------------------------------------------------
FONT_W_COEF = 0.55   # char width = fontSize × 0.55
def text_width(t, size):
    """Estimate rendered text width."""
    longest = max(len(line) for line in str(t).split('\n'))
    return int(longest * size * FONT_W_COEF)

def text_height(t, size, line_height=1.25):
    lines = str(t).count('\n') + 1
    return int(size * line_height * lines)

def wrap(text, max_chars):
    """Simple word wrap."""
    words = text.split()
    lines, cur = [], ''
    for w in words:
        if len(cur) + len(w) + 1 <= max_chars:
            cur = (cur + ' ' + w).strip()
        else:
            if cur: lines.append(cur)
            cur = w
    if cur: lines.append(cur)
    return '\n'.join(lines)

# ---------------------------------------------------------------
# ELEMENT FACTORY
# ---------------------------------------------------------------
def base(etype, x, y, w, h, **kw):
    return {
        'id': kw.pop('id', f'f9_{uuid4().hex[:8]}'),
        'type': etype, 'x': x, 'y': y, 'width': w, 'height': h,
        'angle': 0,
        'strokeColor': kw.pop('strokeColor', '#374151'),
        'backgroundColor': kw.pop('backgroundColor', 'transparent'),
        'fillStyle': 'solid',
        'strokeWidth': kw.pop('strokeWidth', 2),
        'strokeStyle': kw.pop('strokeStyle', 'solid'),
        'roughness': 0, 'opacity': 100,
        'groupIds': [], 'frameId': None,
        'roundness': kw.pop('roundness', {'type': 3}),
        'seed': int(uuid4().int % 2_000_000_000),
        'versionNonce': int(uuid4().int % 2_000_000_000),
        'isDeleted': False,
        'boundElements': kw.pop('boundElements', None),
        'updated': 1, 'link': None, 'locked': False,
        **kw,
    }

def rect(id_, x, y, w, h, bg='#ffffff', stk='#374151', sw=2, **kw):
    return base('rectangle', x, y, w, h, id=id_,
                backgroundColor=bg, strokeColor=stk, strokeWidth=sw, **kw)

def ellipse(id_, x, y, w, h, bg, stk):
    return base('ellipse', x, y, w, h, id=id_,
                backgroundColor=bg, strokeColor=stk, strokeWidth=2)

def diamond(id_, x, y, w, h, bg, stk):
    return base('diamond', x, y, w, h, id=id_,
                backgroundColor=bg, strokeColor=stk, strokeWidth=2)

def line_el(x1, y1, x2, y2, stk='#cbd5e1', sw=1, dashed=False):
    el = base('line', min(x1,x2), min(y1,y2), abs(x2-x1), abs(y2-y1),
              strokeColor=stk, strokeWidth=sw, roundness=None,
              strokeStyle='dashed' if dashed else 'solid')
    el['points'] = [[0, 0], [x2-x1, y2-y1]]
    return el

def txt(x, y, t, size=13, color='#111827', w=None, align='left', **kw):
    # Pre-calc width if not given
    if w is None:
        w = max(40, text_width(t, size) + 10)
    h = text_height(t, size)
    el = base('text', x, y, w, h, strokeColor=color, roundness=None, **kw)
    el.update({
        'fontSize': size, 'fontFamily': 2,
        'text': str(t), 'originalText': str(t),
        'textAlign': align, 'verticalAlign': 'top',
        'lineHeight': 1.25, 'baseline': int(size * 0.8),
        'containerId': None, 'autoResize': True,
    })
    return el

def arrow(id_, x1, y1, x2, y2, start_id=None, end_id=None, stk='#374151', dashed=False):
    dx, dy = x2 - x1, y2 - y1
    el = base('arrow', x1, y1, abs(dx), abs(dy),
              id=id_, strokeColor=stk, strokeWidth=1.5, roundness={'type':2},
              strokeStyle='dashed' if dashed else 'solid')
    el.update({
        'points': [[0, 0], [dx, dy]],
        'lastCommittedPoint': None,
        'startBinding': {'elementId': start_id, 'focus': 0, 'gap': 4} if start_id else None,
        'endBinding': {'elementId': end_id, 'focus': 0, 'gap': 4} if end_id else None,
        'startArrowhead': None, 'endArrowhead': 'arrow',
        'elbowed': False,
    })
    return el

# ---------------------------------------------------------------
# LOAD BRD DATA
# ---------------------------------------------------------------
BRDS = json.loads(BRD_DATA.read_text())
def B(n):
    return BRDS.get(str(n), {'num': n, 'title': f'BRD #{n}', 'pii': False,
                              'function': '', 'category': ''})

# ---------------------------------------------------------------
# LAYOUT CONSTANTS
# ---------------------------------------------------------------
CANVAS_W = 2600
LEFT_MARGIN = 40
SIDE_PANEL_X = 1950   # where BRD detail panels start
SIDE_PANEL_W = 610
WORKFLOW_W = SIDE_PANEL_X - LEFT_MARGIN - 20

Y_BANNER = 30
BANNER_H = 60
Y_SOURCE = Y_BANNER + BANNER_H + 12
SOURCE_H = 42
Y_BAND = Y_SOURCE + SOURCE_H + 16
BAND_H = 36
Y_ACTOR = Y_BAND + BAND_H + 8
ACTOR_H = 48
Y_SWIM = Y_ACTOR + ACTOR_H + 20

# Swimlane
LANES = [
    ('Employee',  '👤',  '#fdf2f8', '#be185d'),    # pink
    ('Manager',   '👔',  '#eff6ff', '#1e40af'),    # blue
    ('HR / SPD',  '👥',  '#fff7ed', '#c2410c'),    # orange
    ('System',    '⚙️',  '#f3f4f6', '#475569'),    # gray
]
LANE_LABEL_W = 130
LANE_H = 140

# Timeline columns (x positions)
# 6 columns in workflow area, each ~280px
TIMELINE_X = [LEFT_MARGIN + LANE_LABEL_W + 10 + i * 275 for i in range(7)]

# ---------------------------------------------------------------
# BUILD
# ---------------------------------------------------------------
els = []

# ====== BANNER ======
els.append(rect('banner', LEFT_MARGIN, Y_BANNER, CANVAS_W - 2*LEFT_MARGIN, BANNER_H,
                bg='#eef2ff', stk='#4338ca', sw=2))
els.append(txt(LEFT_MARGIN + 20, Y_BANNER + 8,
               'Flow-09: EC Employee Lifecycle — Hire Workflow',
               size=20, color='#1e1b4b', w=900))
els.append(txt(LEFT_MARGIN + 20, Y_BANNER + 34,
               '9 BRDs in scope · #109 Hiring Flow (primary) · verified 2026-04-16',
               size=12, color='#4338ca', w=900))

# ====== DATA SOURCE ======
els.append(rect('source', LEFT_MARGIN, Y_SOURCE, CANVAS_W - 2*LEFT_MARGIN, SOURCE_H,
                bg='#fefce8', stk='#ca8a04', sw=1))
els.append(txt(LEFT_MARGIN + 14, Y_SOURCE + 6,
               '📎 Source: BRD-EC-summary.md  ·  ~/Downloads/SAP_USER MANUAL/01-EC/EC-Core/',
               size=11, color='#713f12', w=900))
els.append(txt(LEFT_MARGIN + 14, Y_SOURCE + 24,
               '🔒 3 PII BRDs  ·  1 Decision branch  ·  Actors: Employee/Manager/HR/System',
               size=11, color='#713f12', w=900))

# ====== BAND HEADER ======
els.append(rect('band1', LEFT_MARGIN, Y_BAND, CANVAS_W - 2*LEFT_MARGIN, BAND_H,
                bg='#dcfce7', stk='#166534', sw=1))
els.append(txt(LEFT_MARGIN + 14, Y_BAND + 8,
               '🔄 BAND 1 — Workflow Steps (actors × timeline + BR annotation)',
               size=14, color='#14532d', w=900))

# ====== ACTOR STRIP ======
els.append(rect('actor_strip', LEFT_MARGIN, Y_ACTOR, CANVAS_W - 2*LEFT_MARGIN, ACTOR_H,
                bg='#faf5ff', stk='#7c3aed', sw=1))
els.append(txt(LEFT_MARGIN + 14, Y_ACTOR + 6,
               '👤 Actors: SPD/HR · Manager · Employee · System',
               size=11, color='#4c1d95', w=600))
els.append(txt(LEFT_MARGIN + 620, Y_ACTOR + 6,
               '🎯 Goal: Onboard new hire → active employee after probation',
               size=11, color='#4c1d95', w=700))
els.append(txt(LEFT_MARGIN + 14, Y_ACTOR + 26,
               '▶ Start: Position vacant confirmed  ·  ✓ End: Employee active / Terminated',
               size=11, color='#6b7280', w=900))

# ====== SWIMLANE BACKGROUND ======
SWIM_W = CANVAS_W - 2*LEFT_MARGIN - (CANVAS_W - SIDE_PANEL_X + 20)
SWIM_H = len(LANES) * LANE_H

# Lane rows + labels
for i, (name, icon, bg, stk) in enumerate(LANES):
    ly = Y_SWIM + i * LANE_H
    # Lane bg (full workflow width)
    els.append(rect(f'lane_bg_{i}', LEFT_MARGIN, ly, SWIM_W, LANE_H,
                    bg=bg, stk=stk, sw=1, roundness=None))
    # Lane label box (dark on left)
    els.append(rect(f'lane_label_{i}', LEFT_MARGIN, ly, LANE_LABEL_W, LANE_H,
                    bg=stk, stk=stk, sw=2, roundness=None))
    label_text = f'{icon} {name}'
    els.append(txt(LEFT_MARGIN + 10, ly + LANE_H//2 - 10, label_text,
                   size=13, color='#ffffff', w=LANE_LABEL_W - 20))
    # Separator line between lanes
    if i > 0:
        els.append(line_el(LEFT_MARGIN + LANE_LABEL_W, ly,
                           LEFT_MARGIN + SWIM_W, ly,
                           stk=stk, sw=1, dashed=True))

# ====== STEP BOXES ======
# Step def: (id, lane_idx, col_idx, title, subtitle, brd_nums_inline)
STEPS = [
    ('st_vacant', 1, 0, 'Position Vacant', 'Manager identifies',   [5, 10]),
    ('st_key',    2, 1, 'Key Hire Data',   'SPD → Hire Form',      [109]),
    ('st_pers',   2, 2, 'Personal Info',   'Biographical + PII',   [13, 14, 17]),
    ('st_emp',    2, 3, 'Emp Job & Pay',   'Job + Pay setup',      [23, 25, 27]),
    ('st_hrbp',   3, 4, 'Auto HRBP Assign','System routing',       [109]),
    ('st_mail',   3, 5, 'Mail Notify',     'Mgr/Payroll/HRBP',     [109]),
    ('st_view',   0, 5, 'Self-View ESS',   'Employee verifies',    [165, 167]),
    ('st_prob',   1, 6, 'Probation Review','Manager evaluates',    [32]),
]
STEP_W = 230
STEP_H = 72
STEP_Y_OFFSET = 16  # inside lane

step_pos = {}

def draw_step(step_id, lane_idx, col_idx, title, subtitle, brds, custom_y=None):
    x = TIMELINE_X[col_idx] - STEP_W//2 + 10
    y = (custom_y if custom_y is not None
         else Y_SWIM + lane_idx * LANE_H + STEP_Y_OFFSET)
    _, _, _, lane_stk = LANES[lane_idx]
    # Step box
    els.append(rect(step_id, x, y, STEP_W, STEP_H,
                    bg='#ffffff', stk=lane_stk, sw=2))
    # Title
    els.append(txt(x + 10, y + 8, title,
                   size=13, color=lane_stk, w=STEP_W - 20))
    # Subtitle
    els.append(txt(x + 10, y + 28, subtitle,
                   size=10, color='#6b7280', w=STEP_W - 20))
    # BRD inline tags (row of small chips)
    cy = y + 48
    cx = x + 8
    for num in brds:
        b = B(num)
        chip_bg = '#fef2f2' if b['pii'] else '#ecfdf5'
        chip_stk = '#dc2626' if b['pii'] else '#047857'
        lock = '🔒' if b['pii'] else ''
        chip_label = f'{lock}#{num}'
        chip_w = max(44, text_width(chip_label, 10) + 12)
        els.append(rect(f'{step_id}_chip_{num}', cx, cy, chip_w, 18,
                        bg=chip_bg, stk=chip_stk, sw=1))
        els.append(txt(cx + 4, cy + 2, chip_label,
                       size=10, color=chip_stk, w=chip_w - 4))
        cx += chip_w + 4
    step_pos[step_id] = (x, y, STEP_W, STEP_H)
    return x, y

for s in STEPS:
    draw_step(*s)

# ====== DECISION DIAMOND ======
# Place in Manager lane, column 7 area
DEC_X = TIMELINE_X[6] + 150
DEC_Y = Y_SWIM + 1 * LANE_H + 30
DEC_W = 140
DEC_H = 80
els.append(diamond('dec', DEC_X, DEC_Y, DEC_W, DEC_H,
                   bg='#faf5ff', stk='#6d28d9'))
els.append(txt(DEC_X + 22, DEC_Y + 26, 'Probation\nPass?',
               size=12, color='#6d28d9', w=DEC_W - 44, align='center'))
step_pos['dec'] = (DEC_X, DEC_Y, DEC_W, DEC_H)

# ====== END STATES ======
# Active (green, bottom-right)
AE_X = TIMELINE_X[6] + 150
AE_Y = Y_SWIM + 3 * LANE_H + 30  # in System lane
AE_W = 150
AE_H = 60
els.append(ellipse('end_active', AE_X, AE_Y, AE_W, AE_H,
                   bg='#dcfce7', stk='#047857'))
els.append(txt(AE_X + 16, AE_Y + 20, 'Active Employee',
               size=13, color='#047857', w=AE_W - 32, align='center'))
step_pos['end_active'] = (AE_X, AE_Y, AE_W, AE_H)

# Terminated (red, Manager lane right)
TE_X = TIMELINE_X[6] + 320
TE_Y = Y_SWIM + 1 * LANE_H + 40
TE_W = 150
TE_H = 60
els.append(ellipse('end_term', TE_X, TE_Y, TE_W, TE_H,
                   bg='#fef2f2', stk='#dc2626'))
els.append(txt(TE_X + 30, TE_Y + 20, 'Terminated',
               size=13, color='#dc2626', w=TE_W - 60, align='center'))
step_pos['end_term'] = (TE_X, TE_Y, TE_W, TE_H)

# ====== ARROWS (handoffs) ======
def arrow_from_step(a_id, b_id, stk='#374151'):
    """Arrow from center-right of A to center-left of B."""
    ax, ay, aw, ah = step_pos[a_id]
    bx, by, bw, bh = step_pos[b_id]
    x1, y1 = ax + aw, ay + ah//2
    x2, y2 = bx, by + bh//2
    els.append(arrow(f'arr_{a_id}_{b_id}', x1, y1, x2, y2,
                     start_id=a_id, end_id=b_id, stk=stk))

def arrow_down_to(a_id, b_id, stk='#374151'):
    """Arrow from bottom-center of A to top-center of B (vertical handoff)."""
    ax, ay, aw, ah = step_pos[a_id]
    bx, by, bw, bh = step_pos[b_id]
    x1, y1 = ax + aw//2, ay + ah
    x2, y2 = bx + bw//2, by
    els.append(arrow(f'arr_{a_id}_{b_id}', x1, y1, x2, y2,
                     start_id=a_id, end_id=b_id, stk=stk))

# Vacant (Mgr) → Key Hire (HR) — handoff down+right
ax, ay, aw, ah = step_pos['st_vacant']
bx, by, bw, bh = step_pos['st_key']
els.append(arrow('arr_vacant_key',
                 ax + aw//2, ay + ah,
                 bx + bw//2, by,
                 start_id='st_vacant', end_id='st_key'))
# HR chain
arrow_from_step('st_key', 'st_pers')
arrow_from_step('st_pers', 'st_emp')
# HR → System (down handoff)
ax, ay, aw, ah = step_pos['st_emp']
bx, by, bw, bh = step_pos['st_hrbp']
els.append(arrow('arr_emp_hrbp',
                 ax + aw, ay + ah//2,
                 bx + bw//2, by,
                 start_id='st_emp', end_id='st_hrbp'))
# System chain
arrow_from_step('st_hrbp', 'st_mail')
# System → Employee (up handoff)
ax, ay, aw, ah = step_pos['st_mail']
bx, by, bw, bh = step_pos['st_view']
els.append(arrow('arr_mail_view',
                 ax + aw//2, ay,
                 bx + bw//2, by + bh,
                 start_id='st_mail', end_id='st_view'))
# Employee → Manager (down handoff)
ax, ay, aw, ah = step_pos['st_view']
bx, by, bw, bh = step_pos['st_prob']
els.append(arrow('arr_view_prob',
                 ax + aw, ay + ah//2,
                 bx + bw//2, by,
                 start_id='st_view', end_id='st_prob'))
# Prob → Decision
arrow_from_step('st_prob', 'dec')
# Decision → Active (pass, down)
ax, ay, aw, ah = step_pos['dec']
bx, by, bw, bh = step_pos['end_active']
els.append(arrow('arr_dec_active',
                 ax + aw//2, ay + ah,
                 bx + bw//2, by,
                 start_id='dec', end_id='end_active', stk='#047857'))
els.append(txt(ax + aw//2 + 6, ay + ah + 6, 'pass',
               size=11, color='#047857', w=50))
# Decision → Terminated (fail, right)
arrow_from_step('dec', 'end_term', stk='#dc2626')
ax, ay, aw, ah = step_pos['dec']
els.append(txt(ax + aw + 6, ay + ah//2 - 18, 'fail',
               size=11, color='#dc2626', w=50))

# ====== BRD SIDE DETAIL PANELS ======
# Side panels — color by COVERAGE (green Supported / amber Partial / red Custom Build)
# PII indicated by 🔒 icon independent of coverage color
SIDE_BRDS = [109, 13, 23, 27, 22, 111, 114, 32]
PANEL_W = SIDE_PANEL_W
PANEL_GAP = 12
panel_y = Y_SWIM

COV_STYLE = {
    'Supported':     ('#dcfce7', '#047857', '🟢 Supported'),
    'Partial':       ('#fef3c7', '#b45309', '🟡 Partial'),
    'Not in Manual': ('#fee2e2', '#b91c1c', '🔴 Custom Build'),
    'Unknown':       ('#f3f4f6', '#6b7280', '⚪ Unknown'),
}

for num in SIDE_BRDS:
    b = B(num)
    cov = b.get('coverage', 'Unknown')
    bg, stk, cov_label = COV_STYLE.get(cov, COV_STYLE['Unknown'])
    title_line = f"BRD #{num} — {b['title']}"
    if b['pii']:
        title_line = '🔒 ' + title_line
    cat_line = f"Cat: {b['category'][:60]}" if b.get('category') else ''
    fn = b.get('function', '').replace('**','').replace('`','')
    fn_wrapped = wrap(fn[:220], 68)

    panel_h = 34 + 20 + 18 + text_height(fn_wrapped, 10) + 16
    panel_h = max(108, panel_h)

    els.append(rect(f'panel_{num}', SIDE_PANEL_X, panel_y, PANEL_W, panel_h,
                    bg=bg, stk=stk, sw=1.5))
    # Title
    els.append(txt(SIDE_PANEL_X + 10, panel_y + 8, title_line,
                   size=13, color=stk, w=PANEL_W - 20))
    # Coverage tag
    els.append(txt(SIDE_PANEL_X + 10, panel_y + 28, cov_label,
                   size=10, color=stk, w=200))
    # Category
    if cat_line:
        els.append(txt(SIDE_PANEL_X + 10, panel_y + 46, cat_line,
                       size=10, color='#6b7280', w=PANEL_W - 20))
    # Function
    els.append(txt(SIDE_PANEL_X + 10, panel_y + 64, fn_wrapped,
                   size=10, color='#374151', w=PANEL_W - 20))
    panel_y += panel_h + PANEL_GAP

# ====== LEGEND (bottom) ======
Y_LEG = Y_SWIM + SWIM_H + 40
els.append(txt(LEFT_MARGIN, Y_LEG, 'Legend',
               size=13, color='#111827'))
legend_items = [
    ('ellipse',  '#dcfce7', '#047857', 'Start / End state'),
    ('rectangle', '#ffffff', '#1e40af', 'Process step (colored by lane)'),
    ('diamond',  '#faf5ff', '#6d28d9', 'Decision point'),
]
x = LEFT_MARGIN
y = Y_LEG + 24
for shape, bg, stk, label in legend_items:
    if shape == 'ellipse':
        els.append(base('ellipse', x, y, 36, 22, backgroundColor=bg, strokeColor=stk, strokeWidth=2))
    elif shape == 'diamond':
        els.append(diamond(f'lg_d', x, y, 36, 22, bg=bg, stk=stk))
    else:
        els.append(rect('lg_r', x, y, 36, 22, bg=bg, stk=stk, sw=2))
    els.append(txt(x + 44, y + 4, label, size=11, color='#374151'))
    x += 290
# BRD chip legend
y2 = y + 30
els.append(rect('lg_chip_ok', LEFT_MARGIN, y2, 50, 18,
                bg='#ecfdf5', stk='#047857', sw=1))
els.append(txt(LEFT_MARGIN + 8, y2 + 2, '#N', size=10, color='#047857'))
els.append(txt(LEFT_MARGIN + 60, y2 + 2, 'BRD reference (normal)',
               size=11, color='#374151'))
els.append(rect('lg_chip_pii', LEFT_MARGIN + 290, y2, 60, 18,
                bg='#fef2f2', stk='#dc2626', sw=1))
els.append(txt(LEFT_MARGIN + 296, y2 + 2, '🔒#N', size=10, color='#dc2626'))
els.append(txt(LEFT_MARGIN + 360, y2 + 2, 'PII / security-sensitive BRD',
               size=11, color='#374151'))

# ---------------------------------------------------------------
# WRITE
# ---------------------------------------------------------------
doc = {
    'type': 'excalidraw', 'version': 2,
    'source': 'https://excalidraw.com',
    'elements': els,
    'appState': {'viewBackgroundColor': '#ffffff', 'gridSize': 20},
    'files': {},
}
OUT.write_text(json.dumps(doc, indent=2, ensure_ascii=False))
mx = max(e.get('x',0)+e.get('width',0) for e in els)
my = max(e.get('y',0)+e.get('height',0) for e in els)
print(f'✅ {OUT.name}: {len(els)} elements, canvas {mx:.0f}×{my:.0f}')
