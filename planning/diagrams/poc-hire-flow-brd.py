#!/usr/bin/env python3
"""POC: Hire workflow diagram with BRD annotations — real diagram (shapes + arrows).

Pattern: Timeline + decision branching + BRD badges per step
Scope: flow-09 Hire subset only (~20 elements) — throw-away if not matching user intent
"""
import json
from pathlib import Path
from uuid import uuid4

OUT = Path(__file__).parent / 'poc-hire-flow-brd.excalidraw'

# ---------------------------------------------------------------
# Element factory
# ---------------------------------------------------------------
def base(etype, x, y, w, h, **kw):
    return {
        'id': kw.pop('id', f'p_{uuid4().hex[:8]}'),
        'type': etype, 'x': x, 'y': y, 'width': w, 'height': h,
        'angle': 0,
        'strokeColor': kw.pop('strokeColor', '#374151'),
        'backgroundColor': kw.pop('backgroundColor', 'transparent'),
        'fillStyle': 'solid', 'strokeWidth': kw.pop('strokeWidth', 2),
        'strokeStyle': 'solid', 'roughness': 0, 'opacity': 100,
        'groupIds': [], 'frameId': None,
        'roundness': kw.pop('roundness', {'type': 3}),
        'seed': int(uuid4().int % 2_000_000_000),
        'versionNonce': int(uuid4().int % 2_000_000_000),
        'isDeleted': False,
        'boundElements': kw.pop('boundElements', None),
        'updated': 1, 'link': None, 'locked': False,
        **kw,
    }

def rect(id_, x, y, w, h, bg, stk, sw=2):
    return base('rectangle', x, y, w, h, id=id_, backgroundColor=bg, strokeColor=stk, strokeWidth=sw)

def ellipse(id_, x, y, w, h, bg, stk):
    return base('ellipse', x, y, w, h, id=id_, backgroundColor=bg, strokeColor=stk, strokeWidth=2)

def diamond(id_, x, y, w, h, bg, stk):
    return base('diamond', x, y, w, h, id=id_, backgroundColor=bg, strokeColor=stk, strokeWidth=2)

def txt(x, y, t, size=13, color='#111827', w=None, align='center', bold=False, **kw):
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

def arrow(id_, x1, y1, x2, y2, start_id=None, end_id=None):
    """Arrow with 2 points + optional bindings."""
    dx, dy = x2 - x1, y2 - y1
    el = base('arrow', x1, y1, abs(dx), abs(dy),
              id=id_, strokeColor='#374151', strokeWidth=1.5, roundness={'type':2})
    el.update({
        'points': [[0, 0], [dx, dy]],
        'lastCommittedPoint': None,
        'startBinding': {'elementId': start_id, 'focus': 0, 'gap': 4} if start_id else None,
        'endBinding': {'elementId': end_id, 'focus': 0, 'gap': 4} if end_id else None,
        'startArrowhead': None,
        'endArrowhead': 'arrow',
        'elbowed': False,
    })
    return el

def brd_badge(x, y, brds, pii=False):
    """Small BRD badge (rectangle with BRD # list)."""
    label = ' '.join(f'#{n}' for n in brds)
    w = max(80, len(label) * 7 + 16)
    h = 22
    bg = '#fef2f2' if pii else '#ecfdf5'
    stk = '#dc2626' if pii else '#047857'
    lock = '🔒 ' if pii else ''
    els = []
    els.append(base('rectangle', x, y, w, h,
                    backgroundColor=bg, strokeColor=stk, strokeWidth=1,
                    roundness={'type': 3}))
    els.append(txt(x + 6, y + 3, f'{lock}BRD {label}',
                   size=10, color=stk, w=w - 8, align='left'))
    return els

# ---------------------------------------------------------------
# LAYOUT — Hire workflow
# ---------------------------------------------------------------
els = []

# Title
els.append(txt(40, 30,
               'POC — Hire Workflow with BRD Annotations',
               size=22, color='#111827', w=800, align='left'))
els.append(txt(40, 64,
               'flow-09 Lifecycle subset  ·  BRD tags inline at each step',
               size=12, color='#6b7280', w=700, align='left'))

# Layout: vertical timeline, left side = workflow, right side = evidence/notes
Y = 120
STEP_W = 200
STEP_H = 70
CENTER_X = 280

# Step 1: START ellipse
s1 = 's1_start'
els.append(ellipse(s1, CENTER_X - STEP_W//2, Y, STEP_W, STEP_H,
                   bg='#dcfce7', stk='#047857'))
els.append(txt(CENTER_X - 90, Y + 18, 'START — Position Vacant',
               size=13, color='#047857', w=180, align='center', id='s1_t'))
els.append(txt(CENTER_X - 90, Y + 40, '(HR identifies open role)',
               size=10, color='#6b7280', w=180, align='center'))
# BRD badge for this step
bx = CENTER_X + 130
els.extend(brd_badge(bx, Y + 20, [1, 5, 11]))
els.append(txt(bx + 110, Y + 24, '← Org + Job + Position Foundation',
               size=10, color='#6b7280', w=260, align='left'))

# Arrow down
Y2 = Y + STEP_H + 40
els.append(arrow('a1', CENTER_X, Y + STEP_H + 2, CENTER_X, Y2 - 2,
                 start_id=s1, end_id='s2_create'))

# Step 2: Create Requisition (rectangle)
els.append(rect('s2_create', CENTER_X - STEP_W//2, Y2, STEP_W, STEP_H,
                bg='#eff6ff', stk='#1e40af'))
els.append(txt(CENTER_X - 90, Y2 + 18, 'Create Hire Request',
               size=13, color='#1e40af', w=180, align='center'))
els.append(txt(CENTER_X - 90, Y2 + 40, 'Manager submits via MSS',
               size=10, color='#6b7280', w=180, align='center'))
bx = CENTER_X + 130
els.extend(brd_badge(bx, Y2 + 8, [177]))
els.append(txt(bx + 60, Y2 + 12, '← Position Vacancy Overview (MSS)',
               size=10, color='#6b7280', w=240, align='left'))
els.extend(brd_badge(bx, Y2 + 36, [167]))
els.append(txt(bx + 60, Y2 + 40, '← Employment Info Update (ESS)',
               size=10, color='#6b7280', w=240, align='left'))

# Arrow down
Y3 = Y2 + STEP_H + 40
els.append(arrow('a2', CENTER_X, Y2 + STEP_H + 2, CENTER_X, Y3 - 2,
                 start_id='s2_create', end_id='s3_hire'))

# Step 3: Hire Employee (rectangle with PII)
els.append(rect('s3_hire', CENTER_X - STEP_W//2, Y3, STEP_W, STEP_H,
                bg='#fef3c7', stk='#b45309'))
els.append(txt(CENTER_X - 90, Y3 + 18, 'Hire Employee',
               size=13, color='#b45309', w=180, align='center'))
els.append(txt(CENTER_X - 90, Y3 + 40, 'Enter Personal + Job Info',
               size=10, color='#6b7280', w=180, align='center'))
# PII cluster
bx = CENTER_X + 130
els.extend(brd_badge(bx, Y3 - 8, [21], pii=False))
els.append(txt(bx + 50, Y3 - 4, '← Employment (BR-EMP-001)',
               size=10, color='#6b7280', w=240, align='left'))
els.extend(brd_badge(bx, Y3 + 16, [13, 14, 15, 16, 17], pii=True))
els.append(txt(bx + 170, Y3 + 20, '← Personal Info (PII — encrypted)',
               size=10, color='#dc2626', w=260, align='left'))
els.extend(brd_badge(bx, Y3 + 40, [23, 25, 27], pii=True))
els.append(txt(bx + 110, Y3 + 44, '← Job + Pay Rec + Payment (PII)',
               size=10, color='#dc2626', w=260, align='left'))

# Arrow down
Y4 = Y3 + STEP_H + 40
els.append(arrow('a3', CENTER_X, Y3 + STEP_H + 2, CENTER_X, Y4 - 2,
                 start_id='s3_hire', end_id='s4_decision'))

# Step 4: Decision (diamond) — New hire or Rehire?
els.append(diamond('s4_decision', CENTER_X - 110, Y4, 220, 80,
                   bg='#faf5ff', stk='#6d28d9'))
els.append(txt(CENTER_X - 90, Y4 + 28, 'New Hire or\nRehire?',
               size=12, color='#6d28d9', w=180, align='center'))
bx = CENTER_X + 130
els.extend(brd_badge(bx, Y4 + 30, [127]))
els.append(txt(bx + 60, Y4 + 34, '← OK to Rehire flag check',
               size=10, color='#6b7280', w=220, align='left'))

# Arrow branches — new hire goes down, rehire goes right then down
Y5 = Y4 + 80 + 40
# New hire branch (down)
els.append(arrow('a4a', CENTER_X, Y4 + 82, CENTER_X, Y5 - 2,
                 start_id='s4_decision', end_id='s5_onboard'))
els.append(txt(CENTER_X + 20, Y4 + 95, 'new',
               size=11, color='#047857', w=60, align='left'))

# Rehire branch (diagonal to right side)
els.append(arrow('a4b', CENTER_X + 110, Y4 + 40, CENTER_X + 250, Y5 - 2,
                 start_id='s4_decision'))
els.append(txt(CENTER_X + 130, Y4 + 20, 'rehire',
               size=11, color='#b45309', w=60, align='left'))

# Step 5: Onboarding (rectangle)
els.append(rect('s5_onboard', CENTER_X - STEP_W//2, Y5, STEP_W, STEP_H,
                bg='#eff6ff', stk='#1e40af'))
els.append(txt(CENTER_X - 90, Y5 + 18, 'Onboarding',
               size=13, color='#1e40af', w=180, align='center'))
els.append(txt(CENTER_X - 90, Y5 + 40, 'Workflow + Approvals',
               size=10, color='#6b7280', w=180, align='center'))
bx = CENTER_X + 130
els.extend(brd_badge(bx, Y5 + 20, [28, 29]))
els.append(txt(bx + 80, Y5 + 24, '← HR District + User Account',
               size=10, color='#6b7280', w=240, align='left'))

# Rehire path endpoint — Verify Ok-to-Rehire
s5b = 's5b_verify'
els.append(rect(s5b, CENTER_X + 160, Y5, 180, STEP_H,
                bg='#fef2f2', stk='#dc2626', sw=2))
els.append(txt(CENTER_X + 170, Y5 + 18, 'Verify Rehire OK',
               size=12, color='#dc2626', w=160, align='center'))
els.append(txt(CENTER_X + 170, Y5 + 40, 'Block if blacklisted',
               size=10, color='#6b7280', w=160, align='center'))

# Arrow down
Y6 = Y5 + STEP_H + 40
els.append(arrow('a5', CENTER_X, Y5 + STEP_H + 2, CENTER_X, Y6 - 2,
                 start_id='s5_onboard', end_id='s6_probation'))

# Step 6: Probation Period (rectangle)
els.append(rect('s6_probation', CENTER_X - STEP_W//2, Y6, STEP_W, STEP_H,
                bg='#fef3c7', stk='#b45309'))
els.append(txt(CENTER_X - 90, Y6 + 18, 'Probation (119 days)',
               size=13, color='#b45309', w=180, align='center'))
els.append(txt(CENTER_X - 90, Y6 + 40, 'Performance review',
               size=10, color='#6b7280', w=180, align='center'))
bx = CENTER_X + 130
els.extend(brd_badge(bx, Y6 + 24, [32]))
els.append(txt(bx + 50, Y6 + 28, '← Performance evaluation',
               size=10, color='#6b7280', w=240, align='left'))

# Arrow down to END
Y7 = Y6 + STEP_H + 40
els.append(arrow('a6', CENTER_X, Y6 + STEP_H + 2, CENTER_X, Y7 - 2,
                 start_id='s6_probation', end_id='s7_end'))

# Step 7: END ellipse (active employee)
els.append(ellipse('s7_end', CENTER_X - STEP_W//2, Y7, STEP_W, STEP_H,
                   bg='#dcfce7', stk='#047857'))
els.append(txt(CENTER_X - 90, Y7 + 18, 'END — Active Employee',
               size=13, color='#047857', w=180, align='center'))
els.append(txt(CENTER_X - 90, Y7 + 40, '(regular employment)',
               size=10, color='#6b7280', w=180, align='center'))

# === Legend (bottom-left) ===
Y_LEG = Y7 + STEP_H + 60
els.append(txt(40, Y_LEG, 'Legend',
               size=14, color='#111827', w=100, align='left'))
# Shape legend
y = Y_LEG + 28
els.append(ellipse('lg1', 40, y, 40, 24, bg='#dcfce7', stk='#047857'))
els.append(txt(90, y + 5, 'Start / End (ellipse)',
               size=11, color='#374151', w=200, align='left'))
y += 30
els.append(rect('lg2', 40, y, 40, 24, bg='#eff6ff', stk='#1e40af'))
els.append(txt(90, y + 5, 'Process step (rectangle)',
               size=11, color='#374151', w=200, align='left'))
y += 30
els.append(diamond('lg3', 40, y, 40, 24, bg='#faf5ff', stk='#6d28d9'))
els.append(txt(90, y + 5, 'Decision (diamond)',
               size=11, color='#374151', w=200, align='left'))
y += 30
els.extend(brd_badge(40, y, [21]))
els.append(txt(90, y + 4, 'BRD tag (green) = normal',
               size=11, color='#374151', w=260, align='left'))
y += 26
els.extend(brd_badge(40, y, [13, 27], pii=True))
els.append(txt(90, y + 4, 'BRD tag (red 🔒) = PII / security-sensitive',
               size=11, color='#374151', w=280, align='left'))

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
