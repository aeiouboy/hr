#!/usr/bin/env python3
"""Append 6 critical operational gaps to sf-ec-core-full-spec.excalidraw.

Source: po-review-ec-core-2026-04-16.md (MK XLII review)
Pattern: EX-P009 — direct JSON merge (skip Step 0-6), EX-008 — ไม่ redo existing
Location: new section below current content (y=4220+), canvas limit 8000 OK

Append adds:
- 1 section header
- 2 subsection blocks (Termination × 3 scenarios, Change Emp Type × 3 variants)
- Each scenario: title + source citation + short description

All elements: fontFamily=2 (match existing), stroke #dc2626 (critical indicator)
"""
import json
from pathlib import Path
from uuid import uuid4

DIAGRAM = Path(__file__).parent / 'sf-ec-core-full-spec.excalidraw'

# ---------------------------------------------------------------
# Element factory helpers
# ---------------------------------------------------------------
def base(etype, x, y, w, h, **extra):
    el = {
        'id': extra.pop('id', None) or f'gap_{uuid4().hex[:8]}',
        'type': etype,
        'x': x, 'y': y,
        'width': w, 'height': h,
        'angle': 0,
        'strokeColor': extra.pop('strokeColor', '#374151'),
        'backgroundColor': extra.pop('backgroundColor', 'transparent'),
        'fillStyle': 'solid',
        'strokeWidth': 1,
        'strokeStyle': 'solid',
        'roughness': 1,
        'opacity': 100,
        'groupIds': [],
        'frameId': None,
        'roundness': None,
        'seed': int(uuid4().int % 2_000_000_000),
        'versionNonce': int(uuid4().int % 2_000_000_000),
        'isDeleted': False,
        'boundElements': None,
        'updated': 1,
        'link': None,
        'locked': False,
    }
    el.update(extra)
    return el

def rect(x, y, w, h, bg='#ffffff', stroke='#dc2626', sw=2, **kw):
    return base('rectangle', x, y, w, h,
                backgroundColor=bg, strokeColor=stroke, strokeWidth=sw,
                roundness={'type': 3}, **kw)

def text(x, y, t, size=14, color='#374151', w=None, h=None, align='left', weight=False, **kw):
    font_w_coef = 0.55
    est_w = w or max(80, int(len(t) * size * font_w_coef))
    est_h = h or int(size * 1.5 * (t.count('\n') + 1))
    el = base('text', x, y, est_w, est_h,
              strokeColor=color, **kw)
    el.update({
        'fontSize': size,
        'fontFamily': 2,            # match existing (277/277 elements)
        'text': t,
        'originalText': t,
        'textAlign': align,
        'verticalAlign': 'top',
        'lineHeight': 1.25,
        'baseline': int(size * 0.8),
        'containerId': None,
        'autoResize': True,
    })
    return el

# ---------------------------------------------------------------
# Layout — 6 gaps below existing content (max Y existing = 4178)
# ---------------------------------------------------------------
Y_START = 4230   # 50px gap from existing max

elements = []

# === Section header ===
elements.append(rect(30, Y_START, 1440, 44,
                     bg='#fef2f2', stroke='#dc2626', sw=2,
                     id='gap_section_bg'))
elements.append(text(50, Y_START + 12,
                     '🔴 Appendix: Operational Gaps Identified 2026-04-16 — Integrate into upstream sections during Sprint 1',
                     size=14, color='#dc2626', id='gap_section_title'))

# === Subsection 1: Termination (y=4300) ===
Y1 = Y_START + 70
elements.append(text(50, Y1,
                     'CG-03-05 Manage Termination — 3 Missing Scenarios',
                     size=13, color='#dc2626', id='gap_term_header'))
elements.append(text(50, Y1 + 22,
                     'Source: 11_CneXt_TTT_DETAIL_EC Core_10_Terminate_V0.02.pdf (sub-scenarios 6, 7, 8)',
                     size=10, color='#6b7280', id='gap_term_source'))

scenarios_term = [
    {
        'num': 'Sub-6',
        'title': 'Change Termination Date',
        'desc': 'แก้ไขวันที่ terminate ก่อน effective date\n(e.g. employee ขอถอนการลาออก แล้วกำหนดใหม่)',
        'event': 'DATA_CHANGE\nReason: Change Term Date',
    },
    {
        'num': 'Sub-7',
        'title': 'Reverse Termination Date',
        'desc': 'ยกเลิก termination record ที่ post แล้ว\n(e.g. HR อนุมัติผิด ต้อง reverse)',
        'event': 'REVERSE_TERM\nReason: Reverse Term',
    },
    {
        'num': 'Sub-8',
        'title': 'Rehire Blocked Verification',
        'desc': 'Verify flag "OK to Rehire = No" ขัดขวาง\nการ hire ซ้ำ (blacklist check)',
        'event': 'HIRE (blocked)\nSystem: check ok_to_rehire',
    },
]
for i, s in enumerate(scenarios_term):
    bx = 50 + i * 470
    by = Y1 + 55
    bw, bh = 450, 160
    elements.append(rect(bx, by, bw, bh,
                         bg='#ffffff', stroke='#dc2626', sw=2,
                         id=f'gap_term_box_{i+1}'))
    # Num + title
    elements.append(text(bx + 12, by + 10,
                         f'{s["num"]}: {s["title"]}',
                         size=12, color='#dc2626', id=f'gap_term_title_{i+1}'))
    # Desc
    elements.append(text(bx + 12, by + 42,
                         s['desc'],
                         size=10, color='#374151', id=f'gap_term_desc_{i+1}'))
    # Event
    elements.append(text(bx + 12, by + 108,
                         s['event'],
                         size=10, color='#047857', id=f'gap_term_event_{i+1}'))

# === Subsection 2: Change Emp Type (y=4500) ===
Y2 = Y1 + 240
elements.append(text(50, Y2,
                     'CG-03-06 Manage Change Employee Type — 3 Missing Variants',
                     size=13, color='#dc2626', id='gap_ce_header'))
elements.append(text(50, Y2 + 22,
                     'Source: 7_CneXt_TTT_DETAIL_EC Core_06_Manage Change Emp Type_V0.02.pdf (topics 2, 4, 5)',
                     size=10, color='#6b7280', id='gap_ce_source'))

scenarios_ce = [
    {
        'num': 'Topic-2',
        'title': 'Extend Retirement',
        'desc': 'ขยายวันเกษียณของพนักงาน\nที่ถึงอายุ mandatory retirement',
        'event': 'DATA_CHANGE\nReason: Extend Retirement',
    },
    {
        'num': 'Topic-4',
        'title': 'Change in Pay (disambiguation)',
        'desc': 'แยกจาก CG-03-03 Pay Rate Change\nใช้สำหรับ pay change ที่ไม่ใช่ promotion/merit',
        'event': 'DATA_CHANGE\nReason: Change in Pay',
    },
    {
        'num': 'Topic-5',
        'title': 'Data Change (other reasons)',
        'desc': 'Generic Data Change event\nสำหรับ reasons อื่นๆ ที่ไม่มี category เฉพาะ',
        'event': 'DATA_CHANGE\nReason: <various>',
    },
]
for i, s in enumerate(scenarios_ce):
    bx = 50 + i * 470
    by = Y2 + 55
    bw, bh = 450, 160
    elements.append(rect(bx, by, bw, bh,
                         bg='#ffffff', stroke='#dc2626', sw=2,
                         id=f'gap_ce_box_{i+1}'))
    elements.append(text(bx + 12, by + 10,
                         f'{s["num"]}: {s["title"]}',
                         size=12, color='#dc2626', id=f'gap_ce_title_{i+1}'))
    elements.append(text(bx + 12, by + 42,
                         s['desc'],
                         size=10, color='#374151', id=f'gap_ce_desc_{i+1}'))
    elements.append(text(bx + 12, by + 108,
                         s['event'],
                         size=10, color='#047857', id=f'gap_ce_event_{i+1}'))

# ---------------------------------------------------------------
# Merge + write
# ---------------------------------------------------------------
d = json.loads(DIAGRAM.read_text())
existing_ids = {e['id'] for e in d['elements']}
for e in elements:
    if e['id'] in existing_ids:
        raise SystemExit(f'ID collision: {e["id"]} already exists')

d['elements'].extend(elements)
DIAGRAM.write_text(json.dumps(d, indent=2, ensure_ascii=False))
max_y = max(e.get('y', 0) + e.get('height', 0) for e in d['elements'])
print(f'✅ Appended {len(elements)} elements. Total: {len(d["elements"])}. Max Y: {max_y:.0f} (canvas limit 8000)')
