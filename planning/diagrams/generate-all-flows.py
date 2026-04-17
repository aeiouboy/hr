#!/usr/bin/env python3
"""Generate swimlane diagrams for all remaining EC flows (flow-01..11 except 09).

Reuses flow-09 style:
  - Banner + data source + BAND + actor strip
  - 4-lane swimlane (Employee/Manager/HR/System)
  - Steps with BRD# chips inline
  - Side panels with real BRD Function/Category from BRD-EC-summary.md
  - Pre-calculated text widths (no overflow)

Per-flow config below (FLOW_CONFIGS) — verified BRDs only.
"""
import json, sys
from pathlib import Path
from uuid import uuid4

OUT_DIR = Path(__file__).parent
BRDS = json.loads(Path('/tmp/brd-details.json').read_text())

def B(n):
    return BRDS.get(str(n), {'num': n, 'title': f'BRD #{n}', 'pii': False,
                              'function': '', 'category': ''})

# ---------------------------------------------------------------
# HELPERS
# ---------------------------------------------------------------
FONT_W_COEF = 0.55
def text_width(t, size):
    longest = max(len(line) for line in str(t).split('\n'))
    return int(longest * size * FONT_W_COEF)

def text_height(t, size, line_height=1.25):
    lines = str(t).count('\n') + 1
    return int(size * line_height * lines)

def wrap(text, max_chars):
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
        'id': kw.pop('id', f'af_{uuid4().hex[:8]}'),
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
    return base('rectangle', x, y, w, h, id=id_, backgroundColor=bg, strokeColor=stk, strokeWidth=sw, **kw)

def ellipse(id_, x, y, w, h, bg, stk):
    return base('ellipse', x, y, w, h, id=id_, backgroundColor=bg, strokeColor=stk, strokeWidth=2)

def diamond(id_, x, y, w, h, bg, stk):
    return base('diamond', x, y, w, h, id=id_, backgroundColor=bg, strokeColor=stk, strokeWidth=2)

def line_el(x1, y1, x2, y2, stk='#cbd5e1', sw=1, dashed=False):
    el = base('line', min(x1,x2), min(y1,y2), abs(x2-x1), abs(y2-y1),
              strokeColor=stk, strokeWidth=sw, roundness=None,
              strokeStyle='dashed' if dashed else 'solid')
    el['points'] = [[0, 0], [x2-x1, y2-y1]]
    return el

def txt(x, y, t, size=13, color='#111827', w=None, align='left', **kw):
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

def arrow_el(id_, x1, y1, x2, y2, start_id=None, end_id=None, stk='#374151'):
    dx, dy = x2 - x1, y2 - y1
    el = base('arrow', x1, y1, abs(dx), abs(dy),
              id=id_, strokeColor=stk, strokeWidth=1.5, roundness={'type':2})
    el.update({
        'points': [[0, 0], [dx, dy]],
        'lastCommittedPoint': None,
        'startBinding': {'elementId': start_id, 'focus': 0, 'gap': 4} if start_id else None,
        'endBinding': {'elementId': end_id, 'focus': 0, 'gap': 4} if end_id else None,
        'startArrowhead': None, 'endArrowhead': 'arrow', 'elbowed': False,
    })
    return el

# ---------------------------------------------------------------
# LAYOUT CONSTANTS
# ---------------------------------------------------------------
CANVAS_W = 2600
LEFT_MARGIN = 40
SIDE_PANEL_X = 1950
SIDE_PANEL_W = 610
LANE_LABEL_W = 130
LANE_H = 140
STEP_W = 230
STEP_H = 72

LANES = [
    ('Employee',  '👤',  '#fdf2f8', '#be185d'),
    ('Manager',   '👔',  '#eff6ff', '#1e40af'),
    ('HR / SPD',  '👥',  '#fff7ed', '#c2410c'),
    ('System',    '⚙️',  '#f3f4f6', '#475569'),
]

# ---------------------------------------------------------------
# DIAGRAM GENERATOR (reusable)
# ---------------------------------------------------------------
def generate_flow(config):
    flow_code = config['code']
    flow_title = config['title']
    flow_subtitle = config['subtitle']
    steps = config['steps']     # list of (step_id, lane_idx, col, title, subtitle, [brd_nums])
    side_brds = config['side_brds']    # list of BRD nums to show in side panels
    has_decision = config.get('has_decision', False)
    decision_label = config.get('decision_label', '')
    pass_label = config.get('pass_label', 'Active')
    fail_label = config.get('fail_label', 'Rejected')

    Y_BANNER = 30
    Y_SOURCE = Y_BANNER + 72
    Y_BAND = Y_SOURCE + 54
    Y_ACTOR = Y_BAND + 44
    Y_LEGEND = Y_ACTOR + 68
    Y_SWIM = Y_LEGEND + 44

    els = []

    # Banner
    els.append(rect(f'{flow_code}_banner', LEFT_MARGIN, Y_BANNER, CANVAS_W - 2*LEFT_MARGIN, 60,
                    bg='#eef2ff', stk='#4338ca', sw=2))
    els.append(txt(LEFT_MARGIN + 20, Y_BANNER + 8,
                   f'{flow_code.capitalize()}: {flow_title}',
                   size=20, color='#1e1b4b', w=900))
    els.append(txt(LEFT_MARGIN + 20, Y_BANNER + 34,
                   flow_subtitle,
                   size=12, color='#4338ca', w=1800))

    # Source
    els.append(rect(f'{flow_code}_source', LEFT_MARGIN, Y_SOURCE, CANVAS_W - 2*LEFT_MARGIN, 42,
                    bg='#fefce8', stk='#ca8a04', sw=1))
    els.append(txt(LEFT_MARGIN + 14, Y_SOURCE + 6,
                   f'📎 Source: BRD-EC-summary.md  ·  verified 2026-04-16',
                   size=11, color='#713f12', w=900))
    pii_count = sum(1 for n in side_brds if B(n).get('pii'))
    els.append(txt(LEFT_MARGIN + 14, Y_SOURCE + 24,
                   f'🔒 {pii_count} PII BRDs  ·  {len(side_brds)} BRDs detailed in panels',
                   size=11, color='#713f12', w=900))

    # BAND
    els.append(rect(f'{flow_code}_band', LEFT_MARGIN, Y_BAND, CANVAS_W - 2*LEFT_MARGIN, 36,
                    bg='#dcfce7', stk='#166534', sw=1))
    els.append(txt(LEFT_MARGIN + 14, Y_BAND + 8,
                   f'🔄 BAND 1 — Workflow Steps (actors × timeline + BR annotation)',
                   size=14, color='#14532d', w=900))

    # Actor strip
    els.append(rect(f'{flow_code}_actor', LEFT_MARGIN, Y_ACTOR, CANVAS_W - 2*LEFT_MARGIN, 48,
                    bg='#faf5ff', stk='#7c3aed', sw=1))
    els.append(txt(LEFT_MARGIN + 14, Y_ACTOR + 6,
                   f'👤 Actors: {config.get("actors", "Employee · Manager · HR · System")}',
                   size=11, color='#4c1d95', w=900))
    els.append(txt(LEFT_MARGIN + 14, Y_ACTOR + 26,
                   f'🎯 Goal: {config.get("goal", "")}',
                   size=11, color='#4c1d95', w=1800))

    # Legend — 3-tier coverage + highlighted step meaning
    els.append(rect(f'{flow_code}_legend', LEFT_MARGIN, Y_LEGEND, CANVAS_W - 2*LEFT_MARGIN, 36,
                    bg='#f9fafb', stk='#9ca3af', sw=1))
    lx = LEFT_MARGIN + 14
    ly = Y_LEGEND + 10
    els.append(txt(lx, ly, '🗂 Legend:', size=11, color='#374151', w=80))
    lx += 80
    # Supported
    els.append(rect(f'{flow_code}_lg_s', lx, ly - 2, 20, 14, bg='#dcfce7', stk='#047857', sw=1))
    els.append(txt(lx + 26, ly, '🟢 Supported (native SF)', size=10, color='#047857', w=200))
    lx += 240
    # Partial
    els.append(rect(f'{flow_code}_lg_p', lx, ly - 2, 20, 14, bg='#fef3c7', stk='#b45309', sw=1))
    els.append(txt(lx + 26, ly, '🟡 Partial (config+extend)', size=10, color='#b45309', w=210))
    lx += 250
    # Not in Manual
    els.append(rect(f'{flow_code}_lg_n', lx, ly - 2, 20, 14, bg='#fee2e2', stk='#b91c1c', sw=1))
    els.append(txt(lx + 26, ly, '🔴 Custom Build (not in manual)', size=10, color='#b91c1c', w=240))
    lx += 280
    # Highlighted step
    els.append(rect(f'{flow_code}_lg_hl', lx, ly - 4, 26, 18, bg='#ffffff', stk='#b91c1c', sw=2, strokeStyle='dashed'))
    els.append(txt(lx + 32, ly, '= Step needs Custom Build (highlighted)', size=10, color='#b91c1c', w=320))

    # Swimlane
    SWIM_W = SIDE_PANEL_X - LEFT_MARGIN - 20
    SWIM_H = len(LANES) * LANE_H
    # Timeline columns
    max_col = max([s[2] for s in steps], default=0) + 1
    col_w = (SWIM_W - LANE_LABEL_W - 30) // max(1, max_col)
    TIMELINE_X = [LEFT_MARGIN + LANE_LABEL_W + 15 + i * col_w for i in range(max_col + 2)]

    # Lanes
    for i, (name, icon, bg, stk) in enumerate(LANES):
        ly = Y_SWIM + i * LANE_H
        els.append(rect(f'{flow_code}_lane_bg_{i}', LEFT_MARGIN, ly, SWIM_W, LANE_H,
                        bg=bg, stk=stk, sw=1, roundness=None))
        els.append(rect(f'{flow_code}_lane_label_{i}', LEFT_MARGIN, ly, LANE_LABEL_W, LANE_H,
                        bg=stk, stk=stk, sw=2, roundness=None))
        els.append(txt(LEFT_MARGIN + 10, ly + LANE_H//2 - 10, f'{icon} {name}',
                       size=13, color='#ffffff', w=LANE_LABEL_W - 20))
        if i > 0:
            els.append(line_el(LEFT_MARGIN + LANE_LABEL_W, ly, LEFT_MARGIN + SWIM_W, ly,
                               stk=stk, sw=1, dashed=True))

    step_pos = {}

    # Coverage → chip colors (used on BRD chips inside steps)
    COV_CHIP = {
        'Supported':     ('#dcfce7', '#047857'),
        'Partial':       ('#fef3c7', '#b45309'),
        'Not in Manual': ('#fee2e2', '#b91c1c'),
        'Unknown':       ('#f3f4f6', '#6b7280'),
    }

    def step_coverage(brd_nums):
        """Aggregate coverage of BRDs in a step. Returns (label, color, highlight)."""
        covs = [B(n).get('coverage', 'Unknown') for n in brd_nums]
        if not covs:
            return ('No BRDs', '#9ca3af', False)
        if 'Not in Manual' in covs:
            return ('🔴 Custom Build needed', '#b91c1c', True)
        if 'Partial' in covs:
            return ('🟡 Partial gap', '#b45309', False)
        if all(c == 'Supported' for c in covs):
            return ('🟢 Supported', '#047857', False)
        return ('⚪ Mixed', '#6b7280', False)

    def draw_step(step_id, lane_idx, col_idx, title, subtitle, brd_nums):
        x = TIMELINE_X[col_idx] - STEP_W//2 + 10
        y = Y_SWIM + lane_idx * LANE_H + 16
        _, _, _, lane_stk = LANES[lane_idx]
        cov_label, cov_color, highlight = step_coverage(brd_nums)
        # Step box — red dashed border + thicker stroke if Not in Manual present
        border_stk = cov_color if highlight else lane_stk
        border_sw = 3 if highlight else 2
        border_style = 'dashed' if highlight else 'solid'
        els.append(rect(step_id, x, y, STEP_W, STEP_H,
                        bg='#ffffff', stk=border_stk, sw=border_sw,
                        strokeStyle=border_style))
        els.append(txt(x + 10, y + 6, title, size=13, color=lane_stk, w=STEP_W - 20))
        els.append(txt(x + 10, y + 24, subtitle, size=10, color='#6b7280', w=STEP_W - 20))
        # Coverage status line (step-level reference)
        els.append(txt(x + 10, y + 38, cov_label, size=9, color=cov_color, w=STEP_W - 20))
        cy = y + 52
        cx = x + 8
        for num in brd_nums:
            b = B(num)
            cov = b.get('coverage', 'Unknown')
            chip_bg, chip_stk = COV_CHIP.get(cov, COV_CHIP['Unknown'])
            lock = '🔒' if b['pii'] else ''
            chip_label = f'{lock}#{num}'
            chip_w = max(44, text_width(chip_label, 10) + 12)
            els.append(rect(f'{step_id}_chip_{num}', cx, cy, chip_w, 16,
                            bg=chip_bg, stk=chip_stk, sw=1))
            els.append(txt(cx + 4, cy + 1, chip_label, size=10, color=chip_stk, w=chip_w - 4))
            cx += chip_w + 4
            if cx > x + STEP_W - 20:
                break  # row full, don't overflow
        step_pos[step_id] = (x, y, STEP_W, STEP_H)

    for step_id, lane_idx, col_idx, title, subtitle, brd_nums in steps:
        draw_step(step_id, lane_idx, col_idx, title, subtitle, brd_nums)

    # Sequential arrows (step[i] → step[i+1])
    for i in range(len(steps) - 1):
        a_id = steps[i][0]
        b_id = steps[i+1][0]
        if a_id not in step_pos or b_id not in step_pos:
            continue
        ax, ay, aw, ah = step_pos[a_id]
        bx, by, bw, bh = step_pos[b_id]
        # Choose arrow route based on lane/column
        a_lane, a_col = steps[i][1], steps[i][2]
        b_lane, b_col = steps[i+1][1], steps[i+1][2]
        if a_col == b_col:
            # Vertical handoff (same column, different lane)
            if a_lane < b_lane:
                x1, y1 = ax + aw//2, ay + ah
                x2, y2 = bx + bw//2, by
            else:
                x1, y1 = ax + aw//2, ay
                x2, y2 = bx + bw//2, by + bh
        else:
            # Horizontal or diagonal
            x1, y1 = ax + aw, ay + ah//2
            x2, y2 = bx, by + bh//2
        els.append(arrow_el(f'{flow_code}_arr_{i}', x1, y1, x2, y2,
                            start_id=a_id, end_id=b_id))

    # Decision + end states (optional)
    if has_decision and steps:
        last_id = steps[-1][0]
        last_x, last_y, last_w, last_h = step_pos[last_id]
        dec_x = last_x + last_w + 60
        dec_y = last_y - 4
        els.append(diamond(f'{flow_code}_dec', dec_x, dec_y, 140, 80, bg='#faf5ff', stk='#6d28d9'))
        els.append(txt(dec_x + 16, dec_y + 28, decision_label,
                       size=12, color='#6d28d9', w=108, align='center'))
        # Pass → Active (green ellipse below-right)
        ae_x = dec_x + 180
        ae_y = dec_y + 100
        els.append(ellipse(f'{flow_code}_active', ae_x, ae_y, 150, 50,
                           bg='#dcfce7', stk='#047857'))
        els.append(txt(ae_x + 16, ae_y + 18, pass_label,
                       size=13, color='#047857', w=118, align='center'))
        # Fail → Rejected/Terminated (red ellipse)
        te_x = dec_x + 180
        te_y = dec_y - 60
        els.append(ellipse(f'{flow_code}_fail', te_x, te_y, 150, 50,
                           bg='#fef2f2', stk='#dc2626'))
        els.append(txt(te_x + 20, te_y + 18, fail_label,
                       size=13, color='#dc2626', w=110, align='center'))
        # Arrows from last step → decision
        lx, ly, lw, lh = step_pos[last_id]
        els.append(arrow_el(f'{flow_code}_arr_last_dec',
                            lx + lw, ly + lh//2, dec_x, dec_y + 40,
                            start_id=last_id, end_id=f'{flow_code}_dec'))
        els.append(arrow_el(f'{flow_code}_arr_pass',
                            dec_x + 140, dec_y + 60, ae_x, ae_y + 25,
                            start_id=f'{flow_code}_dec', end_id=f'{flow_code}_active',
                            stk='#047857'))
        els.append(txt(dec_x + 145, dec_y + 70, 'pass', size=11, color='#047857'))
        els.append(arrow_el(f'{flow_code}_arr_fail',
                            dec_x + 140, dec_y + 20, te_x, te_y + 25,
                            start_id=f'{flow_code}_dec', end_id=f'{flow_code}_fail',
                            stk='#dc2626'))
        els.append(txt(dec_x + 145, dec_y - 12, 'fail', size=11, color='#dc2626'))

    # Side panels — color by COVERAGE status (green=Supported, amber=Partial, red=Not in Manual)
    # PII indicated by 🔒 icon independent of coverage color
    COV_STYLE = {
        'Supported':     ('#dcfce7', '#047857', '🟢 Supported'),
        'Partial':       ('#fef3c7', '#b45309', '🟡 Partial'),
        'Not in Manual': ('#fee2e2', '#b91c1c', '🔴 Custom Build'),
        'Unknown':       ('#f3f4f6', '#6b7280', '⚪ Unknown'),
    }
    panel_y = Y_SWIM
    for num in side_brds:
        b = B(num)
        cov = b.get('coverage', 'Unknown')
        bg, stk, cov_label = COV_STYLE.get(cov, COV_STYLE['Unknown'])
        title_line = f"BRD #{num} — {b['title']}"
        if b['pii']:
            title_line = '🔒 ' + title_line
        cat_line = f"Cat: {b.get('category','')[:60]}"
        fn = b.get('function','').replace('**','').replace('`','')
        fn_wrapped = wrap(fn[:220], 68)
        panel_h = 34 + 20 + 18 + text_height(fn_wrapped, 10) + 16
        panel_h = max(108, panel_h)
        els.append(rect(f'{flow_code}_panel_{num}', SIDE_PANEL_X, panel_y, SIDE_PANEL_W, panel_h,
                        bg=bg, stk=stk, sw=1.5))
        els.append(txt(SIDE_PANEL_X + 10, panel_y + 8, title_line,
                       size=13, color=stk, w=SIDE_PANEL_W - 20))
        # Coverage tag (second line)
        els.append(txt(SIDE_PANEL_X + 10, panel_y + 28, cov_label,
                       size=10, color=stk, w=200))
        els.append(txt(SIDE_PANEL_X + 10, panel_y + 46, cat_line,
                       size=10, color='#6b7280', w=SIDE_PANEL_W - 20))
        els.append(txt(SIDE_PANEL_X + 10, panel_y + 64, fn_wrapped,
                       size=10, color='#374151', w=SIDE_PANEL_W - 20))
        panel_y += panel_h + 12

    # Write — output filename includes topic slug to match renamed files
    slug = config.get('filename_slug', f'{flow_code}-workflow')
    out = OUT_DIR / f'BRD-ec-{slug}.excalidraw'
    doc = {
        'type': 'excalidraw', 'version': 2,
        'source': 'https://excalidraw.com',
        'elements': els,
        'appState': {'viewBackgroundColor': '#ffffff', 'gridSize': 20},
        'files': {},
    }
    out.write_text(json.dumps(doc, indent=2, ensure_ascii=False))
    mx = max(e.get('x',0)+e.get('width',0) for e in els)
    my = max(e.get('y',0)+e.get('height',0) for e in els)
    print(f'  ✅ {flow_code}: {len(els)} elements, canvas {mx:.0f}×{my:.0f}')
    return out

# ---------------------------------------------------------------
# PER-FLOW CONFIG — verified BRD mapping from BRD-EC-summary.md
# ---------------------------------------------------------------
# Lane idx: 0=Employee, 1=Manager, 2=HR/SPD, 3=System

FLOW_CONFIGS = {
    'flow-01': {
        'code': 'flow-01',
        'filename_slug': 'flow-01-foundation-setup',
        'title': 'EC Core & Foundation — Setup',
        'subtitle': 'Foundation Objects (5 native 🟢) + prerequisites: Data Migration 🔴 · Audit 🟡 · Perm Group 🔴',
        'actors': 'HR Admin · System',
        'goal': 'ตั้งค่า Foundation Objects ให้พร้อมก่อน go-live',
        'steps': [
            ('f1_s1', 2, 0, 'Enter Foundation Admin', 'HR Admin login', [1]),
            ('f1_s2', 2, 1, 'Setup Organization', 'Company→BU→Div→Dept', [1]),
            ('f1_s3', 2, 2, 'Setup Position', 'Position hierarchy', [4, 5]),
            ('f1_s4', 2, 3, 'Setup Payment 🔒', 'Pay Group, Grade', [6]),
            ('f1_s5', 2, 4, 'Import Picklist', '81,049 values', [7]),
            ('f1_s6', 3, 5, 'Data Migration', 'Legacy → Foundation (Custom)', [198]),
            ('f1_s7', 3, 6, 'Validate + Audit', 'FK checks + audit log', [189]),
            ('f1_s8', 2, 7, 'Grant Perm Group', 'Who can edit Foundation', [184]),
        ],
        'side_brds': [1, 4, 5, 6, 7, 189, 198, 184],
    },
    'flow-02': {
        'code': 'flow-02',
        'filename_slug': 'flow-02-data-integration',
        'title': 'EC Data Management — Integration & Reports',
        'subtitle': 'Dependencies: Foundation 🟢 · Core reports 🟡 · Integration/Encryption 🔴',
        'actors': 'HR Admin · System · External',
        'goal': 'Data integration, migration, encryption, consent tracking',
        'steps': [
            ('f2_s0', 2, 0, 'Foundation prereq', 'Org + Job + Position (native)', [1]),
            ('f2_s1', 2, 1, 'Integration Center', 'API + IC setup', [191]),
            ('f2_s2', 2, 2, 'Reports Setup', 'Customize + Analysis + Schedule', [162, 190, 192]),
            ('f2_s3', 2, 3, 'Consent 🔒', 'Consent form tracking', [199]),
            ('f2_s4', 3, 4, 'Encryption 🔒', 'Database encryption', [203]),
            ('f2_s5', 3, 5, 'Hidden Profile 🔒', 'Sensitive data hiding', [201]),
            ('f2_s6', 2, 6, 'Data Migration', 'Legacy data import', [198]),
        ],
        'side_brds': [1, 162, 190, 192, 191, 199, 203, 201, 198],
    },
    'flow-03': {
        'code': 'flow-03',
        'filename_slug': 'flow-03-reporting',
        'title': 'EC Reporting — 44 Report Templates',
        'subtitle': '44 BRDs · 🟢 19 Supported · 🟡 16 Partial · 🔴 9 Custom Build',
        'actors': 'HR · Manager · Employee',
        'goal': 'Generate reports from multiple data sources',
        'steps': [
            ('f3_s1', 1, 0, 'Position Reports', 'Position Overview', [121, 122]),
            ('f3_s2', 2, 1, 'Personal Info Reports', 'Birthday, Address, Emergency', [125, 126, 127]),
            ('f3_s3', 2, 2, 'Employment Reports', 'Hierarchy, Movements, Turnover', [129, 130, 131]),
            ('f3_s4', 2, 3, 'Compensation 🔒', 'Payment + Pay Range', [132, 133]),
            ('f3_s5', 0, 4, 'Workflow Reports', 'Activity Log, Open Reqs', [144, 149, 161]),
            ('f3_s6', 2, 5, 'Custom/Automation', 'Custom build reports', [153, 163, 164]),
        ],
        'side_brds': [121, 125, 127, 131, 132, 153, 163],
    },
    'flow-04': {
        'code': 'flow-04',
        'filename_slug': 'flow-04-self-service',
        'title': 'EC Self Service — ESS/MSS/ASS',
        'subtitle': '19 BRDs · 🟢 3 Supported · 🟡 4 Partial · 🔴 12 Custom Build',
        'actors': 'Employee · Manager · HR Admin',
        'goal': 'Enable self-service for each role',
        'steps': [
            ('f4_s1', 0, 0, 'ESS: View Profile', 'Personal info view', [165, 168]),
            ('f4_s2', 0, 1, 'ESS: Update Info', 'Emergency/Employment', [166, 167]),
            ('f4_s3', 0, 2, 'ESS: View Comp 🔒', 'Payment/Payroll', [169, 170]),
            ('f4_s4', 1, 3, 'MSS: Team View', 'Team info + org chart', [174, 175]),
            ('f4_s5', 1, 4, 'MSS: Team Reports', 'Team metrics', [176, 177]),
            ('f4_s6', 2, 5, 'ASS: Field Config', 'Field rules + visibility', [178, 179, 180]),
            ('f4_s7', 2, 6, 'ASS: Mandatory Rules', 'Read-only/mandatory', [181, 182, 183]),
        ],
        'side_brds': [166, 167, 172, 165, 170, 169, 178, 181],
    },
    'flow-05': {
        'code': 'flow-05',
        'filename_slug': 'flow-05-user-management',
        'title': 'EC User Management — RBAC + Audit',
        'subtitle': 'Dependencies: Foundation 🟢 · Audit 🟡 · RBAC/Proxy 🔴 (5 Custom Builds)',
        'actors': 'HR Admin · System',
        'goal': 'Setup user roles + access control + audit trail',
        'steps': [
            ('f5_s0', 2, 0, 'Foundation prereq', 'Org + Position (native)', [1]),
            ('f5_s1', 2, 1, 'Define Data Perm Group', 'Who sees which data', [184]),
            ('f5_s2', 2, 2, 'Create Role Group', 'App role bundles', [185]),
            ('f5_s3', 2, 3, 'Assign Users', 'User → Role mapping', [186]),
            ('f5_s4', 2, 4, 'Setup Proxy 🔒', 'Delegation (sensitive)', [187]),
            ('f5_s5', 3, 5, 'Log All Access', 'Audit trail active', [189]),
        ],
        'side_brds': [1, 184, 185, 186, 187, 188, 189],
    },
    'flow-06': {
        'code': 'flow-06',
        'filename_slug': 'flow-06-personal-info',
        'title': 'EC Personal Information',
        'subtitle': '23 BRDs · 🟢 21 Supported · 🟡 2 Partial · 🔴 0 Custom',
        'actors': 'Employee · HR',
        'goal': 'Manage employee personal data (highly PII-sensitive zone)',
        'steps': [
            ('f6_s1', 0, 0, 'Biographical', 'Name, DOB, gender', [12]),
            ('f6_s2', 0, 1, 'Personal Info 🔒', 'Nationality, marital', [13]),
            ('f6_s3', 0, 2, 'Contact 🔒', 'Email/Phone/Address', [15, 16, 17]),
            ('f6_s4', 2, 3, 'National ID 🔒', 'Gov ID + Work Permit', [14, 18]),
            ('f6_s5', 2, 4, 'Emergency+Dep', 'Emergency + Dependents', [19, 20]),
            ('f6_s6', 2, 5, 'Employment', 'Emp status + Job Info', [21, 23]),
            ('f6_s7', 2, 6, 'Performance+Ed', 'Performance + Education', [32, 33]),
        ],
        'side_brds': [12, 13, 14, 17, 19, 21, 27, 32, 34],
    },
    'flow-07': {
        'code': 'flow-07',
        'filename_slug': 'flow-07-special-info',
        'title': 'EC Special Information — Custom Fields',
        'subtitle': '50 BRDs · 🟢 25 Supported · 🟡 1 Partial · 🔴 24 Custom Build',
        'actors': 'HR · Employee',
        'goal': 'Manage custom extensible fields (Special Info tab)',
        'steps': [
            ('f7_s1', 0, 0, 'Basic Info', 'Feature + awards + benefits', [35, 36, 37]),
            ('f7_s2', 0, 1, 'Education 🔒', 'Certs + Courses + Competency', [38, 41, 40]),
            ('f7_s3', 2, 2, 'Financial 🔒', 'Loans + Scholarships + Salary Hist', [46, 47, 53, 63]),
            ('f7_s4', 2, 3, 'Goals + Development', 'Dev goals + KPIs', [48, 49, 55]),
            ('f7_s5', 2, 4, 'Disciplinary 🔒', 'Disciplinary + Court Order', [50, 47]),
            ('f7_s6', 2, 5, 'Assets + Insurance', 'Company asset + Insurance', [45, 57]),
        ],
        'side_brds': [35, 38, 40, 45, 48, 63, 50, 61],
    },
    'flow-08': {
        'code': 'flow-08',
        'filename_slug': 'flow-08-employment-info',
        'title': 'EC Employment Information',
        'subtitle': '24 BRDs · 🟢 17 Supported · 🟡 3 Partial · 🔴 4 Custom Build',
        'actors': 'HR · Manager · System',
        'goal': 'Manage employment-related data (Job, Pay, Position)',
        'steps': [
            ('f8_s1', 2, 0, 'Job Info', 'Position + Job Code', [87]),
            ('f8_s2', 2, 1, 'Year Calc', 'Year in Position/Grade', [88, 90]),
            ('f8_s3', 2, 2, 'Pay Component 🔒', 'Recurring + Alt Cost', [25, 26]),
            ('f8_s4', 2, 3, 'Position Change', 'Position & Job changes', [95]),
            ('f8_s5', 2, 4, 'Sensitive 🔒', 'Hidden Profile + Security', [98, 99, 100]),
            ('f8_s6', 3, 5, 'Validate + Audit', 'FK + audit trail', [105, 106, 107]),
        ],
        'side_brds': [87, 88, 95, 98, 105, 107],
    },
    'flow-10': {
        'code': 'flow-10',
        'filename_slug': 'flow-10-compensation',
        'title': 'EC Compensation — Payment Setup',
        'subtitle': 'Native: 3 🟢 · Dependencies: Encryption 🔴 · Pay Report 🟡 · ESS View 🟢',
        'actors': 'HR · System · Employee',
        'goal': 'Configure Payment Info + Pay Components',
        'steps': [
            ('f10_s1', 2, 0, 'Payment Info 🔒', 'Bank + account details', [118]),
            ('f10_s2', 2, 1, 'Pay Components 🔒', 'Recurring deductions/allowances', [119]),
            ('f10_s3', 2, 2, 'Salary Base 🔒', 'Base rate setup', [120]),
            ('f10_s4', 3, 3, 'Encryption at rest 🔒', 'DB encryption (Custom)', [203]),
            ('f10_s5', 3, 4, 'Payroll Export', 'Scheduled report to payroll', [132]),
            ('f10_s6', 0, 5, 'ESS View Payment 🔒', 'Employee sees own payslip', [169]),
        ],
        'side_brds': [118, 119, 120, 169, 132, 203],
    },
    'flow-11': {
        'code': 'flow-11',
        'filename_slug': 'flow-11-org-position',
        'title': 'EC Organization & Position',
        'subtitle': 'Native: 8 🟢 · Dependencies: User Assignment 🔴 · Report Automation 🟡 · Audit 🟡',
        'actors': 'HR · Manager · System',
        'goal': 'Setup org hierarchy + visualize position structure',
        'steps': [
            ('f11_s1', 2, 0, 'Org Data Mgmt', 'BRD #2 #3 relationships', [2, 3]),
            ('f11_s2', 2, 1, 'Position Data', 'Job + Position foundation', [4, 5]),
            ('f11_s3', 3, 2, 'Build Reporting', 'Reporting structure chart', [8, 9]),
            ('f11_s4', 1, 3, 'View Position Org', 'Manager views hierarchy', [10]),
            ('f11_s5', 1, 4, 'View Org Chart', 'Full org visualization', [11]),
            ('f11_s6', 2, 5, 'Assign Position Owner', 'User → Position (Custom)', [186]),
            ('f11_s7', 3, 6, 'Scheduled Org Report', 'Auto-distribute org chart', [162]),
        ],
        'side_brds': [2, 3, 4, 5, 8, 9, 10, 11, 186, 162, 189],
    },
}

# ---------------------------------------------------------------
# MAIN — generate all
# ---------------------------------------------------------------
print('Generating all EC flow diagrams...\n')
for flow_code, config in FLOW_CONFIGS.items():
    generate_flow(config)
print(f'\n✅ Done — {len(FLOW_CONFIGS)} flow diagrams generated')
