#!/usr/bin/env python3
"""POC: Hire workflow as SWIMLANE diagram — 4 actors × horizontal timeline + BRD details.

Pattern: Swimlane (Employee / Manager / HR Admin / System) with BRD annotations
Goal: Visual argument showing WHO does WHAT and WHICH BRDs govern each step
"""
import json
from pathlib import Path
from uuid import uuid4

OUT = Path(__file__).parent / 'poc-hire-swimlane-brd.excalidraw'

# ---------------------------------------------------------------
# Element factory
# ---------------------------------------------------------------
def base(etype, x, y, w, h, **kw):
    return {
        'id': kw.pop('id', f'sw_{uuid4().hex[:8]}'),
        'type': etype, 'x': x, 'y': y, 'width': w, 'height': h,
        'angle': 0,
        'strokeColor': kw.pop('strokeColor', '#374151'),
        'backgroundColor': kw.pop('backgroundColor', 'transparent'),
        'fillStyle': 'solid', 'strokeWidth': kw.pop('strokeWidth', 2),
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

def rect(id_, x, y, w, h, bg='transparent', stk='#374151', sw=2, **kw):
    return base('rectangle', x, y, w, h, id=id_, backgroundColor=bg, strokeColor=stk, strokeWidth=sw, **kw)

def diamond(id_, x, y, w, h, bg, stk):
    return base('diamond', x, y, w, h, id=id_, backgroundColor=bg, strokeColor=stk, strokeWidth=2)

def line_el(x1, y1, x2, y2, stk='#cbd5e1', sw=1, dashed=False):
    el = base('line', min(x1,x2), min(y1,y2), abs(x2-x1), abs(y2-y1),
              strokeColor=stk, strokeWidth=sw, roundness=None,
              strokeStyle='dashed' if dashed else 'solid')
    el['points'] = [[0, 0], [x2-x1, y2-y1]]
    return el

def txt(x, y, t, size=13, color='#111827', w=None, align='left', **kw):
    est_w = w or max(50, int(len(str(t)) * size * 0.55))
    est_h = int(size * 1.5 * (str(t).count('\n') + 1))
    el = base('text', x, y, est_w, est_h, strokeColor=color, roundness=None, **kw)
    el.update({
        'fontSize': size, 'fontFamily': 2,
        'text': str(t), 'originalText': str(t),
        'textAlign': align, 'verticalAlign': 'top',
        'lineHeight': 1.25, 'baseline': int(size * 0.8),
        'containerId': None, 'autoResize': True,
    })
    return el

def arrow(id_, x1, y1, x2, y2, start_id=None, end_id=None, stk='#374151'):
    dx, dy = x2 - x1, y2 - y1
    el = base('arrow', x1, y1, abs(dx), abs(dy),
              id=id_, strokeColor=stk, strokeWidth=1.5, roundness={'type':2})
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
# LAYOUT CONSTANTS
# ---------------------------------------------------------------
LANES = [
    ('👤 Employee',  '#fdf2f8', '#be185d'),   # pink
    ('👔 Manager',   '#eff6ff', '#1e40af'),   # blue
    ('👥 HR Admin',  '#fff7ed', '#c2410c'),   # orange
    ('⚙️ System',    '#f3f4f6', '#475569'),   # gray
]
LANE_H = 240   # expanded to fit BRD detail panels
LANE_LABEL_W = 150
X_START = LANE_LABEL_W + 40
DIAGRAM_W = 2200
DIAGRAM_W_INNER = DIAGRAM_W - LANE_LABEL_W
Y_TOP = 140  # below title area
STEP_W = 220   # wider to fit function text
STEP_H = 50

# Load real BRD details
import json as _json
BRD_DETAILS = _json.loads(open('/tmp/brd-details.json').read())

def brd_info(num):
    b = BRD_DETAILS.get(str(num), {})
    return {
        'num': num,
        'title': b.get('title', f'BRD #{num}'),
        'pii': b.get('pii', False),
        'function': b.get('function', '') or b.get('description', '').split('\n')[0] or '',
    }

# Step definitions: (id, title, lane_idx, x_offset, [brd_nums])
# VERIFIED 2026-04-16: each BRD mapped based on actual content in BRD-EC-summary.md
# ลบที่เดาผิด (เช่น #178, #203, #204, #127) — แทนด้วย BRDs ที่ content ตรงกับ Hire workflow จริง
STEPS = [
    # lane 0=Employee, 1=Manager, 2=HR, 3=System
    ('s1', 'Identify Vacancy',       1, 0,    [5, 10]),         # #5 Position Foundation + #10 Position Org Chart
    ('s2', 'Key Hire Data',          2, 260,  [109]),           # #109 Hiring Flow (primary SPD/Recruiter action)
    ('s3', 'Personal Info Entry',    2, 520,  [13, 14, 17]),    # #13 Personal Info, #14 National ID, #17 Address (all PII)
    ('s4', 'Employment Info',        2, 780,  [23, 25, 27]),    # #23 Emp Job, #25 Pay Rec, #27 Payment Info
    ('s5', 'Auto-Assign HRBP',       3, 1040, [109]),           # #109 (HRBP auto-assign clause in Hiring Flow)
    ('s6', 'Mail Notify',            3, 1300, [109]),           # #109 (mail notify clause)
    ('s7', 'Employee Self-View',     0, 1560, [165, 167]),      # #165 View Personal Info ESS, #167 Update Emp Info
    ('s8', 'Probation Review',       1, 1820, [32]),            # #32 Performance (covers probation evaluation)
]
# Decision point at end
DECISION = ('d1', 'Pass?', 1, 1760,
            [(127, 'OK to Rehire flag', False),
             (22,  'Terminate (fail)', False)])
END_STEPS = [
    ('e1', 'Active Employee',  3, 1540, 'end'),  # y-offset variant, placed in system lane below
]

# ---------------------------------------------------------------
# BUILD
# ---------------------------------------------------------------
els = []

# ====== Title ======
els.append(txt(40, 30,
               'Hire Workflow — Swimlane + BRD Annotations',
               size=22, color='#111827', w=900, align='left'))
els.append(txt(40, 62,
               'flow-09 Lifecycle  ·  4 actors × horizontal timeline  ·  BRD# + description at each step',
               size=12, color='#6b7280', w=1200, align='left'))

# ====== Swimlane structure ======
# Outer border
total_h = LANE_H * len(LANES)
els.append(rect('swim_outer', LANE_LABEL_W, Y_TOP, DIAGRAM_W_INNER + 100, total_h,
                bg='#ffffff', stk='#1e293b', sw=2, roundness=None))

# Lane backgrounds + labels
for i, (name, bg, stk) in enumerate(LANES):
    ly = Y_TOP + i * LANE_H
    # Lane background (full width)
    els.append(rect(f'lane_bg_{i}', LANE_LABEL_W, ly, DIAGRAM_W_INNER + 100, LANE_H,
                    bg=bg, stk=stk, sw=1, roundness=None))
    # Lane label box
    els.append(rect(f'lane_lbl_{i}', 40, ly, LANE_LABEL_W - 40, LANE_H,
                    bg=stk, stk=stk, sw=2, roundness=None))
    els.append(txt(50, ly + LANE_H//2 - 12, name,
                   size=14, color='#ffffff', w=LANE_LABEL_W - 50, align='left'))
    # Lane separator (top border of each except first)
    if i > 0:
        els.append(line_el(LANE_LABEL_W, ly, LANE_LABEL_W + DIAGRAM_W_INNER + 100, ly,
                           stk='#1e293b', sw=1))

# ====== Steps ======
def add_step(step_id, title, lane_idx, x_off, brd_nums):
    ly = Y_TOP + lane_idx * LANE_H + 16
    sx = X_START + x_off
    _, _, lane_stk = LANES[lane_idx]
    # Step box
    els.append(rect(step_id, sx, ly, STEP_W, STEP_H,
                    bg='#ffffff', stk=lane_stk, sw=2))
    els.append(txt(sx + 10, ly + 14, title,
                   size=14, color=lane_stk, w=STEP_W - 20, align='left'))
    # BRD badges below step — with real function text
    by = ly + STEP_H + 8
    for num in brd_nums:
        b = brd_info(num)
        bg = '#fef2f2' if b['pii'] else '#ecfdf5'
        st = '#dc2626' if b['pii'] else '#047857'
        lock = '🔒 ' if b['pii'] else ''
        # Badge box — taller to fit function text (2 lines)
        badge_h = 48
        els.append(rect(f'{step_id}_b{num}', sx, by, STEP_W, badge_h,
                        bg=bg, stk=st, sw=1))
        # Header: #num + title
        header = f'{lock}#{num} {b["title"][:22]}'
        els.append(txt(sx + 6, by + 3, header,
                       size=10, color=st, w=STEP_W - 12, align='left'))
        # Function snippet (2 lines, truncated)
        fn = b['function']
        # Clean markdown
        fn = fn.replace('**', '').replace('`', '')
        fn = fn[:105] + ('…' if len(fn) > 105 else '')
        els.append(txt(sx + 6, by + 20, fn,
                       size=8, color='#374151', w=STEP_W - 12, align='left'))
        by += badge_h + 4
    return sx, ly

step_pos = {}
for step_id, title, lane, xoff, brd_nums in STEPS:
    sx, sy = add_step(step_id, title, lane, xoff, brd_nums)
    step_pos[step_id] = (sx, sy)

# ====== Decision diamond ======
# VERIFIED: decision point itself has no BRD. Fail path → #111 Terminate Request Workflow
# Previously I used #127 (Address Report) = WRONG. Correct: #111 for terminate trigger, #114 for rehire flag
DECISION2_NUMS = [22, 111, 114]  # Terminate data + Terminate Workflow + OK to Rehire Flag
did, dtitle, dlane, dxoff = 'd1', 'Pass?', 1, 2080
dly = Y_TOP + dlane * LANE_H + 16
dsx = X_START + dxoff
els.append(diamond(did, dsx, dly, 140, 70,
                   bg='#faf5ff', stk='#6d28d9'))
els.append(txt(dsx + 32, dly + 22, 'Probation\nPass?',
               size=12, color='#6d28d9', w=100, align='center'))
step_pos[did] = (dsx, dly)
# BRD tied to decision (Terminate reference if fail)
by = dly + 80
for num in DECISION2_NUMS:
    b = brd_info(num)
    bg = '#fef2f2' if b['pii'] else '#ecfdf5'
    st = '#dc2626' if b['pii'] else '#047857'
    lock = '🔒 ' if b['pii'] else ''
    els.append(rect(f'{did}_b{num}', dsx - 20, by, 180, 48,
                    bg=bg, stk=st, sw=1))
    els.append(txt(dsx - 14, by + 3, f'{lock}#{num} {b["title"][:20]}',
                   size=10, color=st, w=170, align='left'))
    fn = b['function'].replace('**','').replace('`','')[:100]
    els.append(txt(dsx - 14, by + 20, fn,
                   size=8, color='#374151', w=170, align='left'))
    by += 54

# ====== End state (Active Employee) — in system lane ======
esx = X_START + 2250
ely = Y_TOP + 3 * LANE_H + 16
els.append(base('ellipse', esx, ely, 150, 50,
                id='e1', backgroundColor='#dcfce7', strokeColor='#047857', strokeWidth=2))
els.append(txt(esx + 20, ely + 16, 'Active Employee',
               size=12, color='#047857', w=120, align='center'))

# Terminate end (in Manager lane, below decision)
esx2 = X_START + 2250
ely2 = Y_TOP + 1 * LANE_H + 16
els.append(base('ellipse', esx2, ely2, 150, 50,
                id='e2_terminate',
                backgroundColor='#fef2f2', strokeColor='#dc2626', strokeWidth=2))
els.append(txt(esx2 + 36, ely2 + 16, 'Terminated',
               size=12, color='#dc2626', w=90, align='center'))

# ====== Arrows (horizontal flow + lane handoffs) ======
def arrow_between(from_id, to_id, via_brd_offset=False):
    """Create arrow from end of from_id to start of to_id."""
    fx, fy = step_pos[from_id]
    tx, ty = step_pos[to_id]
    # Start from right-center of source box
    x1 = fx + STEP_W
    y1 = fy + STEP_H // 2
    # End at left-center of target box
    x2 = tx
    y2 = ty + STEP_H // 2
    els.append(arrow(f'arr_{from_id}_{to_id}', x1, y1, x2, y2,
                     start_id=from_id, end_id=to_id))

# Sequence: s1 → s2 (same lane)
arrow_between('s1', 's2')
# s2 → s3 (Manager → HR Admin, cross lane)
arrow_between('s2', 's3')
# s3 → s4
arrow_between('s3', 's4')
# s4 → s5
arrow_between('s4', 's5')
# s5 → s6 (HR Admin → System)
arrow_between('s5', 's6')
# s6 → s7 (System → Employee — full swing)
arrow_between('s6', 's7')
# s7 → s8 (Employee → Manager)
arrow_between('s7', 's8')
# s8 → d1 (decision)
arrow_between('s8', 'd1')
# d1 → Active (pass) — go DOWN to System lane end
dfx, dfy = step_pos['d1']
els.append(arrow('arr_d1_active',
                 dfx + 70, dfy + 70,
                 esx + 75, ely,
                 start_id='d1', end_id='e1',
                 stk='#047857'))
els.append(txt(dfx + 145, dfy + 75, 'pass',
               size=11, color='#047857', w=50, align='left'))
# d1 → Terminate (fail) — right across Manager lane
els.append(arrow('arr_d1_term',
                 dfx + 140, dfy + 35,
                 esx2, ely2 + 25,
                 start_id='d1', end_id='e2_terminate',
                 stk='#dc2626'))
els.append(txt(dfx + 145, dfy + 10, 'fail',
               size=11, color='#dc2626', w=40, align='left'))

# ====== Legend ======
Y_LEG = Y_TOP + total_h + 50
els.append(txt(40, Y_LEG, 'Legend',
               size=14, color='#111827', w=100, align='left'))
# Shapes
y = Y_LEG + 30
els.append(rect('lg_rect', 40, y, 40, 24, bg='#ffffff', stk='#1e40af'))
els.append(txt(90, y + 5, 'Process step (colored by lane owner)',
               size=11, color='#374151', w=300, align='left'))
y += 30
els.append(diamond('lg_diamond', 40, y, 40, 24, bg='#faf5ff', stk='#6d28d9'))
els.append(txt(90, y + 5, 'Decision point',
               size=11, color='#374151', w=200, align='left'))
y += 30
els.append(base('ellipse', 40, y, 40, 24,
                id='lg_end',
                backgroundColor='#dcfce7', strokeColor='#047857', strokeWidth=2))
els.append(txt(90, y + 5, 'End state (active / terminated)',
               size=11, color='#374151', w=250, align='left'))
y += 30
# BRD badges
els.append(rect('lg_brd_ok', 40, y, 140, 24,
                bg='#ecfdf5', stk='#047857', sw=1))
els.append(txt(46, y + 3, 'BRD #21  desc',
               size=10, color='#047857', w=130, align='left'))
els.append(txt(190, y + 5, 'Normal BRD — title/description',
               size=11, color='#374151', w=260, align='left'))
y += 30
els.append(rect('lg_brd_pii', 40, y, 140, 24,
                bg='#fef2f2', stk='#dc2626', sw=1))
els.append(txt(46, y + 3, '🔒 BRD #13 desc',
               size=10, color='#dc2626', w=130, align='left'))
els.append(txt(190, y + 5, 'PII / security-sensitive BRD',
               size=11, color='#374151', w=260, align='left'))

# Actor legend
y = Y_LEG + 30
x_leg2 = 520
els.append(txt(x_leg2, Y_LEG, 'Swimlanes (actors)',
               size=14, color='#111827', w=200, align='left'))
for i, (name, bg, stk) in enumerate(LANES):
    els.append(rect(f'lg_lane_{i}', x_leg2, y, 24, 24, bg=bg, stk=stk, sw=1))
    els.append(txt(x_leg2 + 32, y + 5, name,
                   size=11, color=stk, w=200, align='left'))
    y += 30

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
