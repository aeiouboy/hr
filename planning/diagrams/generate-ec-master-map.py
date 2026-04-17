#!/usr/bin/env python3
"""Generate ec-master-map-part{1,2,3}.excalidraw — embed 207 BRDs inline into flow overview.

Split rationale (canvas limit 8000):
  Part 1: Foundation & Infrastructure (flow-01, 02, 03, 05, 10, 11) — 82 BRDs + 28 reports
  Part 2: Employee Data Core (flow-06, 07, 08) — 97 BRDs (heavy-weight)
  Part 3: Operations & Lifecycle (flow-04, 09) — 28 BRDs

Each BRD card: #num (bold) · 🔒 PII flag · title · sub-category tag
Pattern: EX-P004 (generator) + EX-P010 (per-context config) — layout hand-designed, data driven
"""
import json, re
from pathlib import Path
from uuid import uuid4

BRD_MD = Path('/Users/tachongrak/stark/projects/hr-platform-replacement/BRD-EC-summary.md')
OUT_DIR = Path(__file__).parent

# ---------------------------------------------------------------
# PARSE BRDs from markdown
# ---------------------------------------------------------------
def parse_brds():
    md = BRD_MD.read_text()
    brd_re = re.compile(r'^### (🔒\s*)?BRD #(\d+)\s*—\s*(.+?)$', re.M)
    brds = {}
    for m in brd_re.finditer(md):
        n = int(m.group(2))
        if n in brds:
            continue
        brds[n] = {
            'num': n, 'title': m.group(3).strip(),
            'pii': bool(m.group(1)),
            'flow': None, 'sub_cat': None,
        }
    # Attach flow + sub_cat from category tables
    blocks = md.split('\n### ')
    for block in blocks:
        if not block.startswith(('EC ', 'Employee ', 'Organization')):
            continue
        sub = None
        for line in block.split('\n'):
            if line.startswith('#### '):
                sub = re.sub(r'\s*\(\d+\)\s*$', '', line.replace('#### ', '')).strip()
            m = re.match(r'\|\s*\*?\*?(\d+)\*?\*?\s*\|\s*(.+?)\s*\|\s*`(flow-\d+)`', line)
            if m:
                n = int(m.group(1))
                if n in brds:
                    brds[n]['flow'] = m.group(3)
                    brds[n]['sub_cat'] = sub
    return sorted(brds.values(), key=lambda b: b['num'])

# ---------------------------------------------------------------
# PALETTE
# ---------------------------------------------------------------
C_TITLE   = '#111827'
C_SUBTLE  = '#6b7280'
C_STROKE  = '#374151'
C_FLOW_HDR_BG = '#1e293b'
C_FLOW_HDR_TXT = '#ffffff'
C_SUB_BG = '#f1f5f9'
C_SUB_STRK = '#475569'
C_PII_BG = '#fef2f2'
C_PII_STRK = '#dc2626'
C_CARD_BG = '#ffffff'
C_CARD_STRK = '#cbd5e1'

# Per-flow accent (varied — not uniform)
FLOW_ACCENT = {
    'flow-01': ('#fef3c7', '#b45309', 'Core & Foundation'),
    'flow-02': ('#eff6ff', '#1e40af', 'Data Management'),
    'flow-03': ('#faf5ff', '#7c3aed', 'Reporting'),
    'flow-04': ('#ecfdf5', '#047857', 'Self Service'),
    'flow-05': ('#fff7ed', '#c2410c', 'User Management'),
    'flow-06': ('#fdf2f8', '#be185d', 'Personal Information'),
    'flow-07': ('#f5f3ff', '#6d28d9', 'Special Information (cust_*)'),
    'flow-08': ('#ecfeff', '#0e7490', 'Employment Information'),
    'flow-09': ('#fff1f2', '#be123c', 'Employee Lifecycle'),
    'flow-10': ('#f0fdf4', '#166534', 'Compensation'),
    'flow-11': ('#eef2ff', '#4338ca', 'Organization & Position'),
}

# ---------------------------------------------------------------
# Element factory
# ---------------------------------------------------------------
def base(etype, x, y, w, h, **kw):
    return {
        'id': kw.pop('id', f'em_{uuid4().hex[:8]}'),
        'type': etype, 'x': x, 'y': y, 'width': w, 'height': h,
        'angle': 0,
        'strokeColor': kw.pop('strokeColor', C_STROKE),
        'backgroundColor': kw.pop('backgroundColor', 'transparent'),
        'fillStyle': 'solid',
        'strokeWidth': kw.pop('strokeWidth', 1),
        'strokeStyle': 'solid', 'roughness': 0, 'opacity': 100,
        'groupIds': [], 'frameId': None,
        'roundness': kw.pop('roundness', {'type': 3}),
        'seed': int(uuid4().int % 2_000_000_000),
        'versionNonce': int(uuid4().int % 2_000_000_000),
        'isDeleted': False, 'boundElements': None, 'updated': 1,
        'link': None, 'locked': False,
        **kw,
    }

def rect(x, y, w, h, bg='transparent', stk=C_STROKE, sw=1, **kw):
    return base('rectangle', x, y, w, h, backgroundColor=bg, strokeColor=stk, strokeWidth=sw, **kw)

def txt(x, y, t, size=12, color=C_STROKE, w=None, h=None, align='left', **kw):
    est_w = w or max(50, int(len(str(t)) * size * 0.55))
    est_h = h or int(size * 1.5 * (str(t).count('\n') + 1))
    el = base('text', x, y, est_w, est_h, strokeColor=color, roundness=None, **kw)
    el.update({
        'fontSize': size, 'fontFamily': 2,
        'text': str(t), 'originalText': str(t),
        'textAlign': align, 'verticalAlign': 'top',
        'lineHeight': 1.25, 'baseline': int(size * 0.8),
        'containerId': None, 'autoResize': True,
    })
    return el

# ---------------------------------------------------------------
# BRD card (uniform inside flow — catalog exception)
# ---------------------------------------------------------------
CARD_W = 200
CARD_H = 62

def brd_card(x, y, brd):
    title = brd['title']
    if len(title) > 24:
        title = title[:22] + '…'
    els = []
    # Card body
    bg = C_PII_BG if brd['pii'] else C_CARD_BG
    stk = C_PII_STRK if brd['pii'] else C_CARD_STRK
    sw = 1.5 if brd['pii'] else 1
    els.append(rect(x, y, CARD_W, CARD_H, bg=bg, stk=stk, sw=sw))
    # Number (bold top-left)
    num_color = C_PII_STRK if brd['pii'] else C_TITLE
    els.append(txt(x + 8, y + 6, f'#{brd["num"]}', size=13, color=num_color))
    # PII lock (top-right)
    if brd['pii']:
        els.append(txt(x + CARD_W - 22, y + 6, '🔒', size=12, color=C_PII_STRK))
    # Title (middle)
    els.append(txt(x + 8, y + 26, title, size=10, color=C_STROKE, w=CARD_W-16))
    # Sub-category (bottom small)
    if brd['sub_cat']:
        sub = brd['sub_cat'][:30]
        els.append(txt(x + 8, y + 45, sub, size=8, color=C_SUBTLE, w=CARD_W-16))
    return els

# ---------------------------------------------------------------
# FLOW SECTION — header + sub-cat groups + card grid
# ---------------------------------------------------------------
def flow_section(x_start, y_start, flow_code, brds_in_flow, canvas_w=1800):
    """Layout: header bar + sub-category clusters (each cluster = sub-header + card grid).
       Returns (elements, final_y)"""
    els = []
    accent_bg, accent_stk, flow_name = FLOW_ACCENT[flow_code]

    # Flow header bar (full width)
    hdr_h = 44
    els.append(rect(x_start, y_start, canvas_w, hdr_h,
                    bg=C_FLOW_HDR_BG, stk=C_FLOW_HDR_BG, sw=1))
    els.append(txt(x_start + 14, y_start + 8, flow_code,
                   size=15, color=C_FLOW_HDR_TXT))
    els.append(txt(x_start + 100, y_start + 8, flow_name,
                   size=15, color=C_FLOW_HDR_TXT))
    els.append(txt(x_start + canvas_w - 140, y_start + 10,
                   f'{len(brds_in_flow)} BRDs', size=13, color=C_FLOW_HDR_TXT))
    # Accent stripe
    els.append(rect(x_start, y_start + hdr_h, canvas_w, 4,
                    bg=accent_stk, stk=accent_stk, sw=0,
                    roundness=None))

    y = y_start + hdr_h + 20

    # Group BRDs by sub_cat (preserve order)
    groups = {}
    for b in brds_in_flow:
        key = b['sub_cat'] or '(other)'
        groups.setdefault(key, []).append(b)

    # Cards per row based on canvas width
    cards_per_row = max(1, (canvas_w - 40) // (CARD_W + 12))

    for sub_name, brds in groups.items():
        # Sub-header
        els.append(txt(x_start + 20, y, f'{sub_name} ({len(brds)})',
                       size=12, color=accent_stk, w=400))
        y += 24
        # Card grid
        for i, b in enumerate(brds):
            row = i // cards_per_row
            col = i % cards_per_row
            cx = x_start + 20 + col * (CARD_W + 12)
            cy = y + row * (CARD_H + 10)
            els.extend(brd_card(cx, cy, b))
        rows = (len(brds) + cards_per_row - 1) // cards_per_row
        y += rows * (CARD_H + 10) + 16
    y += 20  # gap after flow
    return els, y

# ---------------------------------------------------------------
# BUILD ONE PART
# ---------------------------------------------------------------
def build_part(part_num, part_title, flow_list, brds_all):
    els = []
    canvas_w = 1800

    # Hero title
    els.append(txt(40, 40, f'EC Master Map — Part {part_num}: {part_title}',
                   size=26, color=C_TITLE, w=1600))
    els.append(txt(40, 78,
                   f'Flows: {", ".join(flow_list)}  ·  Source: BRD-EC-summary.md  ·  2026-04-16',
                   size=12, color=C_SUBTLE, w=1400))

    # Legend
    y_leg = 108
    els.append(rect(40, y_leg, 16, 16, bg=C_CARD_BG, stk=C_CARD_STRK, sw=1))
    els.append(txt(62, y_leg + 2, 'Normal BRD', size=11, color=C_STROKE))
    els.append(rect(170, y_leg, 16, 16, bg=C_PII_BG, stk=C_PII_STRK, sw=1.5))
    els.append(txt(192, y_leg + 2, '🔒 PII / Security-sensitive BRD',
                   size=11, color=C_PII_STRK))
    els.append(txt(420, y_leg + 2,
                   f'Total BRDs ใน part นี้: {sum(1 for b in brds_all if b.get("flow") in flow_list)}',
                   size=11, color=C_SUBTLE))

    y = 150
    brds_in_scope = [b for b in brds_all if b.get('flow') in flow_list]
    # Sort flows by order
    for flow_code in flow_list:
        flow_brds = [b for b in brds_in_scope if b['flow'] == flow_code]
        if not flow_brds:
            continue
        section_els, y = flow_section(40, y, flow_code, flow_brds, canvas_w)
        els.extend(section_els)

    # Write file
    out = OUT_DIR / f'ec-master-map-part{part_num}.excalidraw'
    doc = {
        'type': 'excalidraw', 'version': 2,
        'source': 'https://excalidraw.com',
        'elements': els,
        'appState': {'viewBackgroundColor': '#ffffff', 'gridSize': 20},
        'files': {},
    }
    out.write_text(json.dumps(doc, indent=2, ensure_ascii=False))
    max_y = max(e.get('y',0)+e.get('height',0) for e in els)
    print(f'  ✅ part{part_num}: {len(els)} elements, max Y {max_y:.0f}  →  {out.name}')
    return out

# ---------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------
brds = parse_brds()
print(f'Parsed {len(brds)} BRDs ({sum(1 for b in brds if b["pii"])} PII)')

# Part 1: Infrastructure (light weight flows)
build_part(1, 'Foundation & Infrastructure',
           ['flow-01', 'flow-11', 'flow-10', 'flow-05', 'flow-02', 'flow-03'],
           brds)

# Part 2: Employee Data (heavy weight)
build_part(2, 'Employee Data Core',
           ['flow-06', 'flow-08', 'flow-07'],
           brds)

# Part 3: Operations (lifecycle + services)
build_part(3, 'Operations & Lifecycle',
           ['flow-04', 'flow-09'],
           brds)
