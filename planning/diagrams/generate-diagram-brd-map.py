#!/usr/bin/env python3
"""Generate diagram-brd-coverage-map.excalidraw — maps 22 diagrams × 11 BRD flows.

Source: BRD-EC-summary.md (207 BRDs across 11 flows) + diagrams/ folder inventory
Pattern: EX-P004 Generator — hand-designed layout, data rows generated
Palette: matches brd-manual-coverage-map.excalidraw (red/amber/green coverage)
"""
import json
from pathlib import Path
from uuid import uuid4

OUT = Path(__file__).parent / 'diagram-brd-coverage-map.excalidraw'

# ---------------------------------------------------------------
# DATA — Mapping (manually audited 2026-04-16 against BRD flows)
# Coverage codes: 'P'=primary ●, 'X'=partial ◐, 'R'=related ○, '-'=none
# Scope: 'in'=in EC BRD, 'out'=out of scope, 'meta'=architecture/reference
# ---------------------------------------------------------------
FLOWS = [
    ('01', 'Core & Fdn',     3),
    ('02', 'Data Mgmt',     18),
    ('03', 'Reporting',     44),
    ('04', 'Self Service',  19),
    ('05', 'User Mgmt',      6),
    ('06', 'Personal Info', 23),
    ('07', 'Special Info',  50),
    ('08', 'Employment',    24),
    ('09', 'Lifecycle',      9),
    ('10', 'Compensation',   3),
    ('11', 'Org & Position', 8),
]
#             [01][02][03][04][05][06][07][08][09][10][11]
DIAGRAMS = [
    # (filename, elems, scope, coverage_per_flow, note)
    ('brd-207-catalog',             1063, 'meta', 'P P P P P P P P P P P', 'SoT — all 207 BRDs catalog'),
    ('brd-manual-coverage-map',      143, 'meta', 'R R R R R R R R R R R', 'BRD × SAP Manual coverage'),
    ('all-flows-ec',                1572, 'in',   'P P P P P P P P P P P', 'Overview — all 11 flows'),
    ('sf-module-interconnection',    126, 'in',   'R R R R R R R R R R R', 'Cross-module deps'),
    ('sf-ec-foundation-objects',     183, 'in',   'P - - - - - - - - - X', 'SoT — flow-01 Foundation'),
    ('sf-ec-core-full-spec',         569, 'in',   '- - X R X P P P P P X', 'SoT — EC Core full spec'),
    ('sf-ec-core-comprehensive',      70, 'in',   '- - - R - X - X X - -', 'Core — UI + workflow'),
    ('sf-ec-core-flow',               63, 'in',   '- - - - - - - X P - -', 'Core — module flow'),
    ('sf-ec-core-process-bank',       53, 'in',   '- - - - - - - R P - -', 'Core — process bank'),
    ('sf-ec-core-ui-process',         47, 'in',   '- - - P - - - - X - -', 'Core — UI-to-process'),
    ('sf-ec-hire-workflow',           43, 'in',   '- - - - - - - - P - -', 'Lifecycle — Hire'),
    ('sf-ec-hire-ui-mockup',          53, 'in',   '- - - - - - - - P - -', 'Lifecycle — Hire UI'),
    ('sf-ec-probation-workflow',      25, 'in',   '- - - - - - - - P - -', 'Lifecycle — Probation'),
    ('flow-01-hire-rehire',           59, 'in',   '- - - - - - - - P - -', 'Misnamed — actually flow-09'),
    ('er-diagram-brd',               212, 'in',   'R - - - - P R P - - R', 'ER — entity structure'),
    ('ui-erd-traceability',          885, 'in',   'R - - R - P R P R - -', 'UI × ERD field mapping'),
    ('seniority-date-mapping',        33, 'in',   '- - - - - - - R P - -', 'Cross-cut — seniority'),
    ('ttt-workflow-fr',             1086, 'in',   'X - - R X P X P P X X', 'TTT FRs (52 extracted)'),
    ('sf-benefits',                  122, 'out',  '- - - - - - - - - - -', 'OUT — separate Benefits BRD'),
    ('sf-payroll',                   182, 'out',  '- - - - - - - - - - -', 'OUT — separate Payroll BRD'),
    ('sf-time-management',            98, 'out',  '- - - - - - - - - - -', 'OUT — separate Time BRD'),
    ('ag-ui-protocol',                53, 'meta', '- - - - - - - - - - -', 'META — architecture ref'),
]

# ---------------------------------------------------------------
# COLOR PALETTE (match brd-manual-coverage-map)
# ---------------------------------------------------------------
C_PRIMARY_BG    = '#dcfce7'   # green-100 — primary coverage
C_PRIMARY_STRK  = '#047857'   # green-700
C_PARTIAL_BG    = '#fef3c7'   # amber-100 — partial
C_PARTIAL_STRK  = '#b45309'   # amber-700
C_RELATED_BG    = '#eff6ff'   # blue-50 — related/tangential
C_RELATED_STRK  = '#1e40af'   # blue-700
C_NONE_BG       = '#f3f4f6'   # gray-100 — none
C_NONE_STRK     = '#9ca3af'   # gray-400
C_OUT_BG        = '#fef2f2'   # red-50 — out-of-scope
C_OUT_STRK      = '#dc2626'
C_META_BG       = '#f5f3ff'   # violet-50 — meta
C_META_STRK     = '#6d28d9'
C_HEADER_BG     = '#1e293b'   # slate-800
C_HEADER_TXT    = '#ffffff'
C_TITLE         = '#111827'
C_SUBTITLE      = '#6b7280'
C_STROKE        = '#374151'

COV_STYLE = {
    'P': (C_PRIMARY_BG, C_PRIMARY_STRK, '●'),
    'X': (C_PARTIAL_BG, C_PARTIAL_STRK, '◐'),
    'R': (C_RELATED_BG, C_RELATED_STRK, '○'),
    '-': (C_NONE_BG,    C_NONE_STRK,    '—'),
}
SCOPE_STYLE = {
    'in':   ('#047857', 'IN'),
    'out':  ('#dc2626', 'OUT'),
    'meta': ('#6d28d9', 'META'),
}

# ---------------------------------------------------------------
# Element factory
# ---------------------------------------------------------------
def base(etype, x, y, w, h, **kw):
    return {
        'id': kw.pop('id', f'm_{uuid4().hex[:8]}'),
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
    return base('rectangle', x, y, w, h,
                backgroundColor=bg, strokeColor=stk, strokeWidth=sw, **kw)

def txt(x, y, t, size=12, color=C_STROKE, w=None, h=None, align='left', **kw):
    est_w = w or max(50, int(len(str(t)) * size * 0.55))
    est_h = h or int(size * 1.5 * (str(t).count('\n') + 1))
    el = base('text', x, y, est_w, est_h,
              strokeColor=color, roundness=None, **kw)
    el.update({
        'fontSize': size, 'fontFamily': 2,
        'text': str(t), 'originalText': str(t),
        'textAlign': align, 'verticalAlign': 'top',
        'lineHeight': 1.25, 'baseline': int(size * 0.8),
        'containerId': None, 'autoResize': True,
    })
    return el

# ---------------------------------------------------------------
# LAYOUT — hand-designed
# ---------------------------------------------------------------
els = []

# ===== HERO TITLE =====
els.append(txt(40, 40, 'Diagram Inventory × BRD Coverage Map',
               size=30, color=C_TITLE, w=900))
els.append(txt(40, 80, f'{len(DIAGRAMS)} diagrams × 11 EC BRD flows (207 total BRDs) — 2026-04-16 audit',
               size=14, color=C_SUBTITLE, w=900))

# ===== LEGEND =====
Y_LEG = 120
legend_items = [
    ('●', C_PRIMARY_STRK, 'Primary — diagram IS the SoT for this flow'),
    ('◐', C_PARTIAL_STRK, 'Partial — covers subset of the flow'),
    ('○', C_RELATED_STRK, 'Related — tangential / cross-cuts'),
    ('—', C_NONE_STRK,    'None'),
]
x = 40
for sym, color, desc in legend_items:
    els.append(txt(x, Y_LEG, sym, size=16, color=color))
    els.append(txt(x + 20, Y_LEG + 2, desc, size=11, color=C_SUBTITLE))
    x += 280
# Scope tags
Y_LEG2 = Y_LEG + 24
x = 40
for tag, (color, label) in SCOPE_STYLE.items():
    els.append(rect(x, Y_LEG2, 38, 18, bg='#ffffff', stk=color, sw=1))
    els.append(txt(x + 6, Y_LEG2 + 3, label, size=10, color=color))
    x += 48
els.append(txt(x + 10, Y_LEG2 + 3,
               'IN = inside EC BRD  ·  OUT = separate BRD (Benefits/Payroll/Time)  ·  META = architecture/reference',
               size=11, color=C_SUBTITLE))

# ===== FLOW SUMMARY BAR =====
Y_FLOW = 195
els.append(txt(40, Y_FLOW, 'BRD Distribution Across 11 EC Flows',
               size=16, color=C_TITLE))
# 11 flow cards showing BRD count + diagram count
total_brd = sum(b for _,_,b in FLOWS)
x = 40
y_cards = Y_FLOW + 32
card_w = 130
card_gap = 8
for i, (code, name, brd_count) in enumerate(FLOWS):
    cx = 40 + i * (card_w + card_gap)
    # Count diagrams with P or X on this flow
    diag_count = sum(1 for _,_,_,cov,_ in DIAGRAMS
                     if cov.split()[i] in ('P', 'X'))
    # Color by density
    if diag_count >= 3:
        hdr_color, hdr_bg = C_PRIMARY_STRK, C_PRIMARY_BG
    elif diag_count >= 1:
        hdr_color, hdr_bg = C_PARTIAL_STRK, C_PARTIAL_BG
    else:
        hdr_color, hdr_bg = C_OUT_STRK, C_OUT_BG
    els.append(rect(cx, y_cards, card_w, 70, bg=hdr_bg, stk=hdr_color, sw=1.5))
    els.append(txt(cx + 8, y_cards + 6, f'flow-{code}', size=13, color=hdr_color))
    els.append(txt(cx + 8, y_cards + 24, name, size=10, color=C_STROKE))
    els.append(txt(cx + 8, y_cards + 44, f'{brd_count} BRDs', size=10, color=C_SUBTITLE))
    els.append(txt(cx + 70, y_cards + 44, f'{diag_count} diagrams',
                   size=10, color=hdr_color))

# ===== MAIN MATRIX =====
Y_MTX = 310
els.append(txt(40, Y_MTX, 'Coverage Matrix — 22 diagrams × 11 flows',
               size=16, color=C_TITLE))

# Matrix columns
COL_DIAG_X = 40
COL_DIAG_W = 280
COL_ELEM_X = COL_DIAG_X + COL_DIAG_W
COL_ELEM_W = 55
COL_SCP_X = COL_ELEM_X + COL_ELEM_W
COL_SCP_W = 48
COL_FLOW_X = COL_SCP_X + COL_SCP_W + 8
CELL_W = 55
CELL_H = 34
COL_NOTE_X = COL_FLOW_X + 11 * CELL_W + 12
COL_NOTE_W = 300

ROW_H = 36
Y_HDR = Y_MTX + 36

# Header row
els.append(rect(COL_DIAG_X, Y_HDR, COL_DIAG_W, ROW_H,
                bg=C_HEADER_BG, stk=C_HEADER_BG, sw=1))
els.append(txt(COL_DIAG_X + 10, Y_HDR + 10, 'Diagram',
               size=12, color=C_HEADER_TXT))
els.append(rect(COL_ELEM_X, Y_HDR, COL_ELEM_W, ROW_H,
                bg=C_HEADER_BG, stk=C_HEADER_BG, sw=1))
els.append(txt(COL_ELEM_X + 8, Y_HDR + 10, 'Elem',
               size=11, color=C_HEADER_TXT))
els.append(rect(COL_SCP_X, Y_HDR, COL_SCP_W, ROW_H,
                bg=C_HEADER_BG, stk=C_HEADER_BG, sw=1))
els.append(txt(COL_SCP_X + 8, Y_HDR + 10, 'Scope',
               size=11, color=C_HEADER_TXT))
# Flow column headers
for i, (code, _, _) in enumerate(FLOWS):
    fx = COL_FLOW_X + i * CELL_W
    els.append(rect(fx, Y_HDR, CELL_W, ROW_H,
                    bg=C_HEADER_BG, stk=C_HEADER_BG, sw=1))
    els.append(txt(fx + 10, Y_HDR + 10, code,
                   size=12, color=C_HEADER_TXT))
# Note column header
els.append(rect(COL_NOTE_X, Y_HDR, COL_NOTE_W, ROW_H,
                bg=C_HEADER_BG, stk=C_HEADER_BG, sw=1))
els.append(txt(COL_NOTE_X + 10, Y_HDR + 10, 'Note',
               size=12, color=C_HEADER_TXT))

# Data rows
Y_DATA = Y_HDR + ROW_H
for row_i, (fname, elems, scope, cov, note) in enumerate(DIAGRAMS):
    ry = Y_DATA + row_i * ROW_H
    row_bg = '#ffffff' if row_i % 2 == 0 else '#fafafa'
    # Filename cell
    els.append(rect(COL_DIAG_X, ry, COL_DIAG_W, ROW_H,
                    bg=row_bg, stk=C_NONE_STRK, sw=1))
    els.append(txt(COL_DIAG_X + 10, ry + 10, fname,
                   size=11, color=C_TITLE))
    # Elem count
    els.append(rect(COL_ELEM_X, ry, COL_ELEM_W, ROW_H,
                    bg=row_bg, stk=C_NONE_STRK, sw=1))
    elem_color = C_PRIMARY_STRK if elems >= 500 else (C_PARTIAL_STRK if elems >= 100 else C_SUBTITLE)
    els.append(txt(COL_ELEM_X + 10, ry + 10, str(elems),
                   size=11, color=elem_color))
    # Scope tag
    scp_color, scp_label = SCOPE_STYLE[scope]
    els.append(rect(COL_SCP_X, ry, COL_SCP_W, ROW_H,
                    bg=row_bg, stk=C_NONE_STRK, sw=1))
    els.append(rect(COL_SCP_X + 6, ry + 8, 36, 18,
                    bg='#ffffff', stk=scp_color, sw=1))
    els.append(txt(COL_SCP_X + 10, ry + 11, scp_label,
                   size=9, color=scp_color))
    # Coverage cells
    cov_codes = cov.split()
    for i, c in enumerate(cov_codes):
        bg, stk, sym = COV_STYLE[c]
        fx = COL_FLOW_X + i * CELL_W
        els.append(rect(fx, ry, CELL_W, ROW_H, bg=bg, stk=stk, sw=1))
        els.append(txt(fx + 20, ry + 10, sym, size=14, color=stk))
    # Note
    els.append(rect(COL_NOTE_X, ry, COL_NOTE_W, ROW_H,
                    bg=row_bg, stk=C_NONE_STRK, sw=1))
    els.append(txt(COL_NOTE_X + 10, ry + 10, note,
                   size=10, color=C_SUBTITLE))

# ===== GAP ANALYSIS (bottom) =====
Y_GAP = Y_DATA + len(DIAGRAMS) * ROW_H + 40
els.append(txt(40, Y_GAP, 'Key Findings — Coverage Gaps & Redundancy',
               size=16, color=C_TITLE))

# Per-flow coverage count
gap_rows = []
for i, (code, name, brd_count) in enumerate(FLOWS):
    primary = sum(1 for _,_,_,cov,_ in DIAGRAMS if cov.split()[i] == 'P')
    partial = sum(1 for _,_,_,cov,_ in DIAGRAMS if cov.split()[i] == 'X')
    total = primary + partial
    if total == 0:
        gap_rows.append(('🔴', f'flow-{code} {name}', f'{brd_count} BRDs', 'No primary or partial coverage — undocumented'))
    elif total == 1:
        gap_rows.append(('🟡', f'flow-{code} {name}', f'{brd_count} BRDs', f'Only 1 diagram covers this — single point of failure'))
    else:
        pass  # OK

y = Y_GAP + 32
for icon, flow, brd, reason in gap_rows:
    els.append(txt(40, y, icon, size=14))
    els.append(txt(68, y + 2, flow, size=12, color=C_TITLE, w=160))
    els.append(txt(240, y + 2, brd, size=11, color=C_SUBTITLE, w=80))
    els.append(txt(330, y + 2, reason, size=11, color=C_STROKE, w=900))
    y += 26

# Redundancy finding
y += 16
els.append(txt(40, y, '📊', size=14))
els.append(txt(68, y + 2,
               'Lifecycle (flow-09): 7 diagrams cover same content — redundancy candidate for consolidation',
               size=11, color=C_STROKE, w=900))
y += 26
els.append(txt(40, y, '⚠️', size=14))
els.append(txt(68, y + 2,
               'flow-01-hire-rehire is misnamed — content matches flow-09 (Lifecycle), not flow-01 (Foundation)',
               size=11, color=C_STROKE, w=900))
y += 26
els.append(txt(40, y, '🎯', size=14))
els.append(txt(68, y + 2,
               'SoT candidates per flow: brd-207-catalog (index) · sf-ec-foundation-objects (flow-01) · sf-ec-core-full-spec (flow-06..10)',
               size=11, color=C_STROKE, w=1100))

# ---------------------------------------------------------------
# WRITE
# ---------------------------------------------------------------
doc = {
    'type': 'excalidraw',
    'version': 2,
    'source': 'https://excalidraw.com',
    'elements': els,
    'appState': {
        'viewBackgroundColor': '#ffffff',
        'gridSize': 20,
    },
    'files': {},
}
OUT.write_text(json.dumps(doc, indent=2, ensure_ascii=False))
max_y = max(e.get('y',0)+e.get('height',0) for e in els)
max_x = max(e.get('x',0)+e.get('width',0) for e in els)
print(f'✅ Wrote {OUT.name}: {len(els)} elements, canvas {max_x:.0f}×{max_y:.0f}')
