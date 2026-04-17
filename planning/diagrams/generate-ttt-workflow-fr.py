"""Generate TTT Workflow + Functional Requirements diagram from SAP User Manual PDFs.
Single excalidraw file with all 11 processes, scenarios, and extracted FRs."""
import json, sys

C = {
    "start_fill": "#fed7aa", "start_stroke": "#c2410c",
    "end_fill": "#a7f3d0", "end_stroke": "#047857",
    "process_fill": "#3b82f6", "process_stroke": "#1e3a5f",
    "process2_fill": "#60a5fa",
    "decision_fill": "#fef3c7", "decision_stroke": "#b45309",
    "ai_fill": "#ddd6fe", "ai_stroke": "#6d28d9",
    "warn_fill": "#fee2e2", "warn_stroke": "#dc2626",
    "inactive_fill": "#dbeafe", "inactive_stroke": "#1e40af",
    "evidence_bg": "#1e293b", "evidence_text": "#22c55e",
    "title": "#1e40af", "subtitle": "#3b82f6", "detail": "#64748b",
    "on_dark": "#ffffff",
}
elements = []
sc = [1000]
def ns(): sc[0] += 1; return sc[0]

def txt(id,x,y,text,fs=16,color="#1e40af",align="left",w=200,h=25,cid=None,va="top"):
    return {"type":"text","id":id,"x":x,"y":y,"width":w,"height":h,"text":text,"originalText":text,
            "fontSize":fs,"fontFamily":3,"textAlign":align,"verticalAlign":va,"strokeColor":color,
            "backgroundColor":"transparent","fillStyle":"solid","strokeWidth":1,"strokeStyle":"solid",
            "roughness":0,"opacity":100,"angle":0,"seed":ns(),"version":1,"versionNonce":ns(),
            "isDeleted":False,"groupIds":[],"boundElements":None,"link":None,"locked":False,
            "containerId":cid,"lineHeight":1.25}

def rect(id,x,y,w,h,fill,stroke,bids=None):
    return {"type":"rectangle","id":id,"x":x,"y":y,"width":w,"height":h,
            "strokeColor":stroke,"backgroundColor":fill,"fillStyle":"solid","strokeWidth":2,
            "strokeStyle":"solid","roughness":0,"opacity":100,"angle":0,"seed":ns(),"version":1,
            "versionNonce":ns(),"isDeleted":False,"groupIds":[],
            "boundElements":[{"id":b,"type":t} for b,t in (bids or [])],"link":None,"locked":False,
            "roundness":{"type":3}}

def ln(id,x,y,pts,color="#64748b",sw=1,dashed=False):
    return {"type":"line","id":id,"x":x,"y":y,"width":max(abs(p[0]) for p in pts),"height":max(abs(p[1]) for p in pts),
            "strokeColor":color,"backgroundColor":"transparent","fillStyle":"solid","strokeWidth":sw,
            "strokeStyle":"dashed" if dashed else "solid","roughness":0,"opacity":100,"angle":0,
            "seed":ns(),"version":1,"versionNonce":ns(),"isDeleted":False,"groupIds":[],
            "boundElements":None,"link":None,"locked":False,"points":pts}

def arrow(id,x,y,pts,color,sid=None,eid=None):
    return {"type":"arrow","id":id,"x":x,"y":y,"width":max(abs(p[0]) for p in pts),"height":max(abs(p[1]) for p in pts),
            "strokeColor":color,"backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,
            "strokeStyle":"solid","roughness":0,"opacity":100,"angle":0,"seed":ns(),"version":1,
            "versionNonce":ns(),"isDeleted":False,"groupIds":[],"boundElements":None,"link":None,"locked":False,
            "points":pts,"startBinding":{"elementId":sid,"focus":0,"gap":2} if sid else None,
            "endBinding":{"elementId":eid,"focus":0,"gap":2} if eid else None,
            "startArrowhead":None,"endArrowhead":"arrow"}

def process_section(prefix, y, proc_id, proc_name, actor, scenarios, frs, workflow=False):
    """Create a process section with scenarios + functional requirements."""
    els = []
    # Title
    wf_tag = " ⚡WF" if workflow else ""
    els.append(txt(f"{prefix}_title", 50, y, f"{proc_id} — {proc_name}{wf_tag}", fs=20, color=C["title"], w=700, h=25))
    els.append(txt(f"{prefix}_actor", 50, y+28, f"Actor: {actor}  |  Scenarios: {len(scenarios)}", fs=12, color=C["detail"], w=500, h=16))

    # Scenarios as cards
    sy = y + 52
    row_w = 5  # cards per row
    for i, (sc_id, sc_name) in enumerate(scenarios):
        col = i % row_w
        row = i // row_w
        sx = 50 + col * 230
        cy = sy + row * 55
        fill = C["start_fill"] if "Hire" in sc_name or "Rehire" in sc_name else \
               C["warn_fill"] if "Termin" in sc_name or "Dismiss" in sc_name or "Fail" in sc_name else \
               C["end_fill"] if "Pass" in sc_name or "Return" in sc_name or "Renew" in sc_name else \
               C["process_fill"]
        stroke = C["start_stroke"] if fill == C["start_fill"] else \
                 C["warn_stroke"] if fill == C["warn_fill"] else \
                 C["end_stroke"] if fill == C["end_fill"] else C["process_stroke"]
        tcolor = stroke if fill in [C["start_fill"], C["warn_fill"], C["end_fill"], C["decision_fill"]] else C["on_dark"]
        rid = f"{prefix}_sc{i}"
        els.append(rect(rid, sx, cy, 215, 42, fill, stroke, [(f"{rid}_t", "text")]))
        els.append(txt(f"{rid}_t", sx+5, cy+3, f"{sc_id}\n{sc_name}", fs=9, color=tcolor,
                       align="center", w=205, h=36, cid=rid, va="middle"))

    # FR evidence box
    sc_rows = (len(scenarios) - 1) // row_w + 1
    fy = sy + sc_rows * 55 + 10
    els.append(txt(f"{prefix}_fr_title", 50, fy, "Functional Requirements", fs=14, color=C["subtitle"], w=300, h=18))
    fy += 20
    fr_text = "\n".join(frs)
    fr_h = len(frs) * 13 + 10
    els.append(rect(f"{prefix}_fr_bg", 50, fy, 1100, fr_h, C["evidence_bg"], C["process_stroke"],
                     [(f"{prefix}_fr_t", "text")]))
    els.append(txt(f"{prefix}_fr_t", 60, fy+5, fr_text, fs=10, color=C["evidence_text"],
                   w=1080, h=fr_h-10, cid=f"{prefix}_fr_bg", va="top"))

    total_h = fy + fr_h + 15 - y
    return els, total_h + 10

def ellipse(id,x,y,w,h,fill,stroke,bids=None):
    return {"type":"ellipse","id":id,"x":x,"y":y,"width":w,"height":h,
            "strokeColor":stroke,"backgroundColor":fill,"fillStyle":"solid","strokeWidth":2,
            "strokeStyle":"solid","roughness":0,"opacity":100,"angle":0,"seed":ns(),"version":1,
            "versionNonce":ns(),"isDeleted":False,"groupIds":[],
            "boundElements":[{"id":b,"type":t} for b,t in (bids or [])],"link":None,"locked":False}

def diamond(id,x,y,w,h,fill,stroke,bids=None):
    return {"type":"diamond","id":id,"x":x,"y":y,"width":w,"height":h,
            "strokeColor":stroke,"backgroundColor":fill,"fillStyle":"solid","strokeWidth":2,
            "strokeStyle":"solid","roughness":0,"opacity":100,"angle":0,"seed":ns(),"version":1,
            "versionNonce":ns(),"isDeleted":False,"groupIds":[],
            "boundElements":[{"id":b,"type":t} for b,t in (bids or [])],"link":None,"locked":False}

def ui_mockup(prefix, x, y, title, sections):
    """Create a UI mockup box that mimics the actual SAP SuccessFactors form layout.
    sections: list of (section_name, [(field_label, field_type, field_value)])
    field_type: 'text'|'select'|'date'|'readonly'|'table'|'attachment'
    section_name can start with special prefixes:
      'TAB:' → render as horizontal tab bar
      'COL_LEFT:' / 'COL_RIGHT:' → 2-column layout (left or right half)
    Returns elements and height.
    """
    els = []
    w = 350
    half_w = w // 2 - 4
    # Window chrome
    els.append(rect(f"{prefix}_chrome", x, y, w, 22, "#e5e7eb", "#9ca3af"))
    els.append(txt(f"{prefix}_chrome_t", x+5, y+3, title, fs=9, color="#374151", w=w-10, h=16, cid=f"{prefix}_chrome", va="middle"))
    cy = y + 22
    col_right_start_y = None  # track where right column should start

    for si, (sec_name, fields) in enumerate(sections):

        # === TAB BAR ===
        if sec_name.startswith("TAB:"):
            tab_labels = [f[0] for f in fields]
            active_idx = next((i for i, f in enumerate(fields) if len(f) > 1 and f[1] == "active"), 0)
            tab_w = w // len(tab_labels)
            for ti, tl in enumerate(tab_labels):
                is_active = ti == active_idx
                tfill = "#c2410c" if is_active else "#9ca3af"
                tbg = "#fed7aa" if is_active else "#e5e7eb"
                tid = f"{prefix}_tab{si}_{ti}"
                els.append(rect(tid, x + ti * tab_w, cy, tab_w, 18, tbg, tfill))
                els.append(txt(f"{tid}_t", x + ti * tab_w + 3, cy+1, tl, fs=7, color=tfill,
                               w=tab_w-6, h=16, cid=tid, va="middle", align="center"))
            cy += 20
            continue

        # === 2-COLUMN LEFT ===
        if sec_name.startswith("COL_LEFT:"):
            real_name = sec_name[9:]
            col_right_start_y = cy  # save y for right column
            # Section header (left half)
            els.append(rect(f"{prefix}_sh{si}", x, cy, half_w, 16, "#f3f4f6", "#d1d5db"))
            els.append(txt(f"{prefix}_sh{si}_t", x+6, cy+1, real_name, fs=7, color="#374151", w=half_w-12, h=14, cid=f"{prefix}_sh{si}", va="middle"))
            cy += 18
            for fi, field in enumerate(fields):
                fid = f"{prefix}_f{si}_{fi}"
                label, ftype = field[0], field[1] if len(field) > 1 else "text"
                value = field[2] if len(field) > 2 else ""
                els.append(txt(f"{fid}_l", x+6, cy+1, label, fs=6, color="#64748b", w=half_w-12, h=10))
                cy += 11
                iw = half_w - 16
                ibg = "#f3f4f6" if ftype == "readonly" else "#ffffff"
                els.append(rect(f"{fid}_i", x+6, cy, iw, 12, ibg, "#d1d5db"))
                els.append(txt(f"{fid}_v", x+9, cy+1, value or ("▼" if ftype == "select" else ""), fs=6, color="#9ca3af" if ftype == "readonly" else "#374151", w=iw-6, h=10, cid=f"{fid}_i", va="middle"))
                cy += 14
            cy += 4
            continue

        # === 2-COLUMN RIGHT ===
        if sec_name.startswith("COL_RIGHT:"):
            real_name = sec_name[10:]
            ry = col_right_start_y if col_right_start_y else cy
            rx = x + half_w + 8
            els.append(rect(f"{prefix}_sh{si}", rx, ry, half_w, 16, "#f3f4f6", "#d1d5db"))
            els.append(txt(f"{prefix}_sh{si}_t", rx+6, ry+1, real_name, fs=7, color="#374151", w=half_w-12, h=14, cid=f"{prefix}_sh{si}", va="middle"))
            ry += 18
            for fi, field in enumerate(fields):
                fid = f"{prefix}_f{si}_{fi}"
                label, ftype = field[0], field[1] if len(field) > 1 else "text"
                value = field[2] if len(field) > 2 else ""
                els.append(txt(f"{fid}_l", rx+6, ry+1, label, fs=6, color="#64748b", w=half_w-12, h=10))
                ry += 11
                iw = half_w - 16
                ibg = "#f3f4f6" if ftype == "readonly" else "#ffffff"
                els.append(rect(f"{fid}_i", rx+6, ry, iw, 12, ibg, "#d1d5db"))
                els.append(txt(f"{fid}_v", rx+9, ry+1, value or "", fs=6, color="#9ca3af" if ftype == "readonly" else "#374151", w=iw-6, h=10, cid=f"{fid}_i", va="middle"))
                ry += 14
            cy = max(cy, ry + 4)  # take the taller column
            continue

        # === NORMAL SECTION (full width) ===
        els.append(rect(f"{prefix}_sh{si}", x, cy, w, 18, "#f3f4f6", "#d1d5db"))
        els.append(txt(f"{prefix}_sh{si}_t", x+8, cy+1, sec_name, fs=8, color="#374151", w=w-16, h=16, cid=f"{prefix}_sh{si}", va="middle"))
        cy += 20

        for fi, field in enumerate(fields):
            label = field[0]
            ftype = field[1] if len(field) > 1 else "text"
            value = field[2] if len(field) > 2 else ""
            fid = f"{prefix}_f{si}_{fi}"
            label_w = 120
            input_w = w - label_w - 16
            els.append(txt(f"{fid}_l", x+8, cy+1, label, fs=7, color="#64748b", w=label_w, h=12))

            if ftype == "text":
                els.append(rect(f"{fid}_i", x+label_w+8, cy, input_w, 14, "#ffffff", "#d1d5db"))
                if value:
                    els.append(txt(f"{fid}_v", x+label_w+11, cy+1, value, fs=7, color="#374151", w=input_w-6, h=12, cid=f"{fid}_i", va="middle"))
            elif ftype == "select":
                els.append(rect(f"{fid}_i", x+label_w+8, cy, input_w, 14, "#ffffff", "#d1d5db"))
                els.append(txt(f"{fid}_v", x+label_w+11, cy+1, f"{value or 'No Selection'} ▼", fs=7, color="#9ca3af", w=input_w-6, h=12, cid=f"{fid}_i", va="middle"))
            elif ftype == "date":
                els.append(rect(f"{fid}_i", x+label_w+8, cy, input_w, 14, "#ffffff", "#d1d5db"))
                els.append(txt(f"{fid}_v", x+label_w+11, cy+1, value or "dd MMM yyyy 📅", fs=7, color="#9ca3af", w=input_w-6, h=12, cid=f"{fid}_i", va="middle"))
            elif ftype == "readonly":
                els.append(rect(f"{fid}_i", x+label_w+8, cy, input_w, 14, "#f3f4f6", "#d1d5db"))
                els.append(txt(f"{fid}_v", x+label_w+11, cy+1, value or "(auto)", fs=7, color="#9ca3af", w=input_w-6, h=12, cid=f"{fid}_i", va="middle"))
            elif ftype == "table":
                els.append(rect(f"{fid}_i", x+8, cy+14, w-16, 18, "#e5e7eb", "#d1d5db"))
                els.append(txt(f"{fid}_v", x+12, cy+15, value, fs=6, color="#64748b", w=w-24, h=16, cid=f"{fid}_i", va="middle"))
                cy += 18
            cy += 16
        cy += 4

    # Buttons
    btn_y = cy + 2
    els.append(rect(f"{prefix}_btn_cancel", x+w-170, btn_y, 50, 16, "#ffffff", "#d1d5db", [(f"{prefix}_btn_cancel_t", "text")]))
    els.append(txt(f"{prefix}_btn_cancel_t", x+w-168, btn_y+1, "Cancel", fs=7, color="#64748b", w=46, h=14, cid=f"{prefix}_btn_cancel", va="middle", align="center"))
    els.append(rect(f"{prefix}_btn_draft", x+w-115, btn_y, 55, 16, "#ffffff", "#d1d5db", [(f"{prefix}_btn_draft_t", "text")]))
    els.append(txt(f"{prefix}_btn_draft_t", x+w-113, btn_y+1, "Save Draft", fs=7, color="#64748b", w=51, h=14, cid=f"{prefix}_btn_draft", va="middle", align="center"))
    els.append(rect(f"{prefix}_btn_submit", x+w-55, btn_y, 50, 16, C["warn_fill"], C["warn_stroke"], [(f"{prefix}_btn_submit_t", "text")]))
    els.append(txt(f"{prefix}_btn_submit_t", x+w-53, btn_y+1, "Submit", fs=7, color=C["warn_stroke"], w=46, h=14, cid=f"{prefix}_btn_submit", va="middle", align="center"))

    total_h = btn_y + 22 - y
    els.append(rect(f"{prefix}_border", x, y, w, total_h, "transparent", "#9ca3af"))
    return els, total_h

def biz_workflow(prefix, y, title, steps, rules=None, mockups=None):
    """Create a business workflow diagram with steps, decisions, branches, and business rules.
    steps: list of (type, label, detail) where type = 'start'|'step'|'decision'|'end'|'branch_yes'|'branch_no'
    rules: list of rule strings to display as annotation below workflow
    Returns elements and total height.
    """
    els = []
    els.append(txt(f"{prefix}_bw_title", 50, y, f"Business Workflow: {title}", fs=14, color=C["ai_stroke"], w=500, h=18))

    cx = 50  # current x
    cy = y + 25  # current y (main flow line)
    step_h = 45
    step_w = 140
    gap = 10
    branch_y = cy  # track branch positions
    prev_id = None

    for i, item in enumerate(steps):
        stype = item[0]
        label = item[1]
        detail = item[2] if len(item) > 2 else None
        sid = f"{prefix}_bw{i}"

        if stype == 'start':
            els.append(ellipse(sid, cx, cy, 80, 40, C["start_fill"], C["start_stroke"], [(f"{sid}_t", "text")]))
            els.append(txt(f"{sid}_t", cx+5, cy+8, label, fs=10, color=C["start_stroke"],
                          align="center", w=70, h=24, cid=sid, va="middle"))
            prev_id = sid
            cx += 80 + gap

        elif stype == 'end':
            # Arrow from prev
            if prev_id:
                els.append(arrow(f"{sid}_a", cx, cy+20, [[0, 0], [gap+5, 0]], C["end_stroke"]))
                cx += gap + 5
            els.append(ellipse(sid, cx, cy, 80, 40, C["end_fill"], C["end_stroke"], [(f"{sid}_t", "text")]))
            els.append(txt(f"{sid}_t", cx+5, cy+8, label, fs=10, color=C["end_stroke"],
                          align="center", w=70, h=24, cid=sid, va="middle"))
            cx += 80 + gap

        elif stype == 'step':
            # Arrow from prev
            if prev_id:
                els.append(arrow(f"{sid}_a", cx, cy+20, [[0, 0], [gap+5, 0]], C["process_stroke"]))
                cx += gap + 5
            els.append(rect(sid, cx, cy, step_w, step_h, C["process_fill"], C["process_stroke"], [(f"{sid}_t", "text")]))
            els.append(txt(f"{sid}_t", cx+5, cy+3, label, fs=10, color=C["on_dark"],
                          align="center", w=step_w-10, h=step_h-6, cid=sid, va="middle"))
            if detail:
                els.append(txt(f"{sid}_d", cx, cy+step_h+3, detail, fs=8, color=C["detail"], w=step_w, h=20))
            prev_id = sid
            cx += step_w + gap

        elif stype == 'decision':
            # Arrow from prev
            if prev_id:
                els.append(arrow(f"{sid}_a", cx, cy+20, [[0, 0], [gap+5, 0]], C["decision_stroke"]))
                cx += gap + 5
            dw, dh = 90, 55
            els.append(diamond(sid, cx, cy-5, dw, dh, C["decision_fill"], C["decision_stroke"], [(f"{sid}_t", "text")]))
            els.append(txt(f"{sid}_t", cx+15, cy+8, label, fs=9, color=C["decision_stroke"],
                          align="center", w=dw-30, h=30, cid=sid, va="middle"))
            prev_id = sid
            branch_y = cy
            cx += dw + gap

        elif stype == 'yes':
            # Yes path (continue right)
            els.append(txt(f"{sid}_yl", cx-15, cy+2, "Yes", fs=8, color=C["end_stroke"], w=25, h=12))
            els.append(rect(sid, cx, cy, step_w, step_h, C["end_fill"], C["end_stroke"], [(f"{sid}_t", "text")]))
            els.append(txt(f"{sid}_t", cx+5, cy+3, label, fs=10, color=C["end_stroke"],
                          align="center", w=step_w-10, h=step_h-6, cid=sid, va="middle"))
            if detail:
                els.append(txt(f"{sid}_d", cx, cy+step_h+3, detail, fs=8, color=C["detail"], w=step_w, h=20))
            prev_id = sid
            cx += step_w + gap

        elif stype == 'no':
            # No path (branch down)
            no_y = branch_y + 65
            no_x = cx - step_w - gap - 90  # back to decision x
            els.append(arrow(f"{sid}_na", no_x+45, branch_y+50, [[0, 0], [0, 20]], C["warn_stroke"]))
            els.append(txt(f"{sid}_nl", no_x+50, branch_y+52, "No", fs=8, color=C["warn_stroke"], w=20, h=12))
            els.append(rect(sid, no_x-20, no_y, step_w, 35, C["warn_fill"], C["warn_stroke"], [(f"{sid}_t", "text")]))
            els.append(txt(f"{sid}_t", no_x-15, no_y+3, label, fs=9, color=C["warn_stroke"],
                          align="center", w=step_w-10, h=29, cid=sid, va="middle"))

    # Calculate actual height needed
    has_branch = any(item[0] == 'no' for item in steps)
    has_detail = any(len(item) > 2 and item[2] for item in steps if item[0] in ('step', 'yes'))
    total_h = 25 + step_h + 30  # title + steps + margin
    if has_branch:
        total_h += 80
    if has_detail:
        total_h += 20

    # Business rules annotation
    if rules:
        rules_y = y + total_h
        rules_text = "\n".join(rules)
        rules_h = len(rules) * 13 + 10
        els.append(txt(f"{prefix}_rules_label", 50, rules_y, "⚠ Business Rules", fs=11, color=C["warn_stroke"], w=200, h=14))
        rules_y += 16
        els.append(rect(f"{prefix}_rules_bg", 50, rules_y, 1100, rules_h, C["warn_fill"], C["warn_stroke"],
                         [(f"{prefix}_rules_t", "text")]))
        els.append(txt(f"{prefix}_rules_t", 60, rules_y+5, rules_text, fs=9, color=C["warn_stroke"],
                       w=1080, h=rules_h-10, cid=f"{prefix}_rules_bg", va="top"))
        total_h += rules_h + 22

    # UI Mockups
    if mockups:
        mock_y = y + total_h + 5
        els.append(txt(f"{prefix}_mock_label", 50, mock_y, "Screen Reference (from TTT Manual)", fs=11, color=C["ai_stroke"], w=400, h=14))
        mock_y += 18
        mock_x = 50
        max_mock_h = 0
        for mi, (mtitle, msections) in enumerate(mockups):
            mel, mh = ui_mockup(f"{prefix}_m{mi}", mock_x, mock_y, mtitle, msections)
            els.extend(mel)
            max_mock_h = max(max_mock_h, mh)
            mock_x += 370  # next mockup to the right
        total_h = mock_y + max_mock_h + 10 - y

    total_h += 20  # bottom padding
    els.append(ln(f"{prefix}_bw_sep", 50, y + total_h, [[0,0],[1300,0]], C["detail"], sw=1, dashed=True))
    return els, total_h + 10

# ═══════════════════════════════════════════════
# TITLE + OVERVIEW
# ═══════════════════════════════════════════════
elements.append(txt("main_title", 50, 20, "EC Core — Workflow & Functional Requirements", fs=28, color=C["title"], w=900, h=35))
elements.append(txt("main_sub", 50, 60, "Source: CNeXt TTT V0.02 (Oct 2018) — 12 PDF Manuals, 11 Processes, ~200 pages  |  Extracted for implementation team",
                     fs=12, color=C["detail"], w=1200, h=16))

# ═══════════════════════════════════════════════
# LEGEND — Color Meaning
# ═══════════════════════════════════════════════
LX = 50
LY = 85
elements.append(txt("legend_title", LX, LY, "Legend — Color Meaning", fs=14, color=C["title"], w=300, h=18))
LY += 20
legend_items = [
    ("Start / Entry Point", C["start_fill"], C["start_stroke"], "ellipse"),
    ("Process Step", C["process_fill"], C["process_stroke"], "rectangle"),
    ("Decision / Branch", C["decision_fill"], C["decision_stroke"], "diamond"),
    ("Success / End", C["end_fill"], C["end_stroke"], "ellipse"),
    ("Warning / Error", C["warn_fill"], C["warn_stroke"], "rectangle"),
    ("Auto / System", C["ai_fill"], C["ai_stroke"], "rectangle"),
]
for li, (label, fill, stroke, shape) in enumerate(legend_items):
    lx = LX + li * 190
    lid = f"legend_{li}"
    elements.append(rect(lid, lx, LY, 14, 14, fill, stroke))
    elements.append(txt(f"{lid}_t", lx+20, LY, label, fs=10, color=C["detail"], w=165, h=14))

# Section type legend
LY += 22
section_legend = [
    ("Scenario Cards", C["process_fill"], "process/scenario type"),
    ("Functional Reqs (FR)", C["evidence_bg"], "dark box = evidence"),
    ("Business Rules (BR)", C["warn_fill"], "pink box = rules"),
    ("Screen Reference", "#e5e7eb", "gray box = UI mockup"),
    ("Workflow ⚡", C["ai_fill"], "purple = has approval"),
]
for li, (label, fill, note) in enumerate(section_legend):
    lx = LX + li * 230
    lid = f"secleg_{li}"
    elements.append(rect(lid, lx, LY, 14, 14, fill, C["detail"]))
    elements.append(txt(f"{lid}_t", lx+20, LY, f"{label} ({note})", fs=9, color=C["detail"], w=205, h=14))

LY += 30
elements.append(ln("sep_legend", LX, LY, [[0,0],[1300,0]], C["title"], sw=2))
LY += 15

# Overview process flow
elements.append(txt("ov_title", 50, LY, "EC-Core Employee Process (Process ID: EC-Core 03)", fs=16, color=C["subtitle"], w=600, h=20))
OV_Y = LY + 28
procs = ["CG-03-01\nHire &\nRehire", "CG-03-02\nManage\nProbation", "CG-03-03\nManage\nEmp Data",
         "CG-03-04\nManage\nMovement", "CG-03-05\nManage\nTermination", "CG-03-06\nManage\nContract"]
for i, label in enumerate(procs):
    px = 50 + i * 200
    pid = f"ov_p{i}"
    fill = C["start_fill"] if i == 0 else C["warn_fill"] if i == 4 else C["end_fill"] if i == 5 else C["process_fill"]
    stroke = C["start_stroke"] if i == 0 else C["warn_stroke"] if i == 4 else C["end_stroke"] if i == 5 else C["process_stroke"]
    tcolor = stroke if fill in [C["start_fill"], C["warn_fill"], C["end_fill"]] else C["on_dark"]
    elements.append(rect(pid, px, OV_Y, 180, 55, fill, stroke, [(f"{pid}_t", "text")]))
    elements.append(txt(f"{pid}_t", px+5, OV_Y+5, label, fs=11, color=tcolor, align="center", w=170, h=45, cid=pid, va="middle"))
    if i < len(procs) - 1:
        elements.append(arrow(f"ov_a{i}", px+182, OV_Y+28, [[0, 0], [18, 0]], C["process_stroke"]))

elements.append(ln("sep_ov", 50, OV_Y+70, [[0,0],[1300,0]], C["title"], sw=2))

# ═══════════════════════════════════════════════
# PROCESS SECTIONS
# ═══════════════════════════════════════════════
Y = OV_Y + 90

# CG-03-01 — Hire & Rehire
els, h = process_section("p01", Y, "CG-03-01", "Hiring and Rehiring", "HR Admin",
    [
        ("001", "Hiring - Permanent"),
        ("002", "Hiring - Expatriate"),
        ("003", "Hiring - Inpatriate"),
        ("004", "Hiring - Temporary"),
        ("005", "Hiring - Internship"),
        ("006", "Hiring - Contingent Worker"),
        ("007", "Hiring - DVT"),
        ("008", "Rehiring - Permanent"),
        ("009", "Rehiring - Part Time"),
        ("010", "Rehiring - DVT"),
        ("011", "Manage Pending Recruits"),
        ("012", "Hire Date Correction"),
    ],
    [
        "FR-01: HR Admin only can add new employee (search 'add new employee' or button in Org Chart)",
        "FR-02: 5-Step Wizard: Identity → Personal Info → Job Info → Job Relationship → Compensation",
        "FR-03: Employee ID = auto-generated by system (never manual)",
        "FR-04: National ID Card Type 1 = normal, Type 2 = concurrent in 2 CG companies",
        "FR-05: Personal Info: Name EN/TH, Gender, Marital, Nationality, Race, Foreigner, Military, Blood Type",
        "FR-06: Address cascade: Province → District → Sub-District → Postal Code (auto-filter)",
        "FR-07: Job Info: Position auto-fills Org/Job/Time info (Group, BU, Function, Dept, SSO, Store, Zone, Cost Center)",
        "FR-08: Employee Group (A-H) + Subgroup (07-27, P1-P3, D1-D2, T1-T2, C1, X7-YB) must be manual",
        "FR-09: Contract Type: Regular / Contract-Monthly / Contract-Yearly / Contract-Long term",
        "FR-10: Probation End Date = Hire Date + 119 days (system-calculated)",
        "FR-11: Compensation: Pay Group, Pay Component/Amount/Currency/Frequency, Payment Method (Bank/Cash/Cheque)",
        "FR-12: Rehire: Duplicate Check on DOB + National ID → Accept Match reuses existing data",
        "FR-13: Rehire: Original Start Date preserved, Seniority Start Date reset to rehire date",
        "FR-14: Hire Date Correction: 2-step (Edit History → HIRE Incorrect Entry, Insert → HIRE Corrected Entry)",
        "FR-15: Save Draft available at any step for completing later",
    ])
elements.extend(els)
Y += h

# BW-01: Hire workflow
els, h = biz_workflow("bw01", Y, "Hire New Employee",
    [('start', 'HR Admin'),
     ('step', 'Search\n"add new\nemployee"'),
     ('step', 'Step 1\nIdentity', 'Hire Date, Company\nEvent Reason, Name\nDOB, National ID'),
     ('step', 'Step 2\nPersonal\nInfo', 'Name TH, Gender\nMarital, Contact\nAddress, Emergency'),
     ('step', 'Step 3\nJob Info', 'Position (auto-fill)\nEmp Group/Sub\nContract Type'),
     ('step', 'Step 4\nJob\nRelation', 'Matrix Manager\nWork Permit'),
     ('step', 'Step 5\nComp', 'Pay Group\nPay Component\nBank Details'),
     ('end', 'Employee\nCreated')],
    rules=[
        "BR-01: HR Admin only can Add New Employee — ไม่มี role อื่นที่สร้างได้",
        "BR-02: Employee ID = auto-generated by system — ห้ามกรอกเอง",
        "BR-03: National ID Card Type 1 = ปกติ, Type 2 = ทำงาน 2 บริษัทใน CG พร้อมกัน",
        "BR-04: Position auto-fills 12+ fields (Group, BU, Function, Dept, SSO, Store, Zone, Cost Center, Work Location, Time Zone)",
        "BR-05: Employee Group (A-H) + Subgroup (07-27) ต้องเลือกเอง ไม่ auto-fill",
        "BR-06: Probation End Date = Hire Date + 119 วัน (system-calculated)",
        "BR-07: Address cascade: Province → District → Sub-District → Postal Code (auto-filter ตามลำดับ)",
        "BR-08: Save Draft ได้ทุก step — กลับมาทำต่อทีหลัง",
    ],
    mockups=[
        ("Step 1: Identity", [
            ("Identity", [
                ("*Hire Date", "date", "14 Sep 2018"),
                ("*Company", "select", ""),
                ("*Event Reason", "select", ""),
            ]),
            ("Name Information", [
                ("*Salutation (EN)", "select", ""),
                ("*Firstname (EN)", "text", ""),
                ("Middle Name", "text", ""),
                ("*Lastname (EN)", "text", ""),
            ]),
            ("Biographical Info", [
                ("*Date of Birth", "date", ""),
                ("Country of Birth", "select", ""),
                ("Region of Birth", "text", ""),
            ]),
            ("Employee Info", [
                ("Employee ID", "readonly", "(auto-generated)"),
            ]),
            ("National ID", [
                ("*Country / *Type / *ID", "table", "Country | Card Type | National ID | Issue | Expiry | Primary | Attach"),
            ]),
        ]),
        ("Step 2: Personal Information", [
            ("Personal Info", [
                ("*Salutation (Local)", "select", "นาย"),
                ("*Firstname (Local)", "text", ""),
                ("*Lastname (Local)", "text", ""),
                ("Gender", "select", "Male"),
                ("Marital Status", "select", ""),
                ("*Nationality", "select", "Thailand"),
                ("Race", "select", ""),
                ("Foreigner", "select", ""),
                ("Military Status", "select", ""),
                ("Blood Type", "select", ""),
            ]),
            ("Global Info (THA)", [
                ("Number of Children", "text", ""),
                ("Religion", "select", ""),
                ("Disability Status", "select", ""),
            ]),
        ]),
        ("Step 3: Job Information", [
            ("Target Position", [
                ("*Position", "select", "(search)"),
                ("*Company", "readonly", "(from Position)"),
            ]),
            ("Organization Info", [
                ("*Group", "readonly", "(auto-fill)"),
                ("*Business Unit", "readonly", "(auto-fill)"),
                ("*Function", "readonly", "(auto-fill)"),
                ("*Organization", "readonly", "(auto-fill)"),
                ("*SSO Location", "readonly", "(auto-fill)"),
                ("*Store/Branch", "readonly", "(auto-fill)"),
                ("*Cost Centre", "readonly", "(auto-fill)"),
            ]),
            ("Employment Detail", [
                ("*Emp Group", "select", "A-H"),
                ("*Emp Subgroup", "select", "07-27"),
                ("*Contract Type", "select", ""),
                ("Probation End", "readonly", "(Hire+119d)"),
            ]),
        ]),
    ])
elements.extend(els)
Y += h

# BW-01b: Rehire workflow
els, h = biz_workflow("bw01b", Y, "Rehire Employee",
    [('start', 'HR Admin'),
     ('step', 'Add New\nEmployee'),
     ('step', 'Enter DOB\n+ National ID'),
     ('decision', 'Duplicate\nMatch?'),
     ('yes', 'Accept Match\nReuse Data', 'Original Start\nDate preserved'),
     ('no', 'New Record\n(fresh start)'),
     ('step', '5-Step\nWizard'),
     ('end', 'Rehired')],
    rules=[
        "BR-09: Duplicate Check อัตโนมัติจาก DOB + National ID — ถ้า match ระบบถาม Accept หรือ New",
        "BR-10: Accept Match → Original Start Date preserved, Seniority Start Date = rehire date",
        "BR-11: OK to Rehire = No จาก record เก่า → ไม่สามารถ rehire ได้ (permanent blacklist)",
        "BR-12: Event Reason: Rehiring LT 1 year / Rehiring GE 1 year (ต่างกันเรื่อง seniority counting)",
    ],
    mockups=[
        ("Rehire: Duplicate Check", [
            ("System Check", [
                ("DOB Match", "readonly", "(auto-check)"),
                ("National ID Match", "readonly", "(auto-check)"),
            ]),
            ("Match Result", [
                ("Action", "select", "Accept Match ▼"),
                ("Original Start Date", "readonly", "(preserved)"),
                ("Seniority Date", "date", "(reset to rehire)"),
                ("OK to Rehire", "readonly", "Yes"),
            ]),
        ]),
    ])
elements.extend(els)
Y += h

# CG-03-02 — Manage Probation
els, h = process_section("p02", Y, "CG-03-02", "Manage Probation", "HR Admin",
    [
        ("001", "Pass Probation"),
        ("002", "Extend Probation"),
        ("003", "Fail Probation (Terminate)"),
    ],
    [
        "FR-16: Pass = Change Job & Comp → Event: Completion of Probation (COMPROB_COMPROB)",
        "FR-17: Extend = Change Probation End Date → system warning → Proceed (Event: DC_EXTPROB)",
        "FR-18: Fail = Terminate action → OK to Rehire decision → Transfer subordinates if any (TERM_UNSUCPROB)",
        "FR-19: Verify Pass Probation Date in Employment Details after completion",
    ])
elements.extend(els)
Y += h

# BW-02: Probation workflow
els, h = biz_workflow("bw02", Y, "Manage Probation (Pass / Extend / Fail)",
    [('start', 'HR Admin'),
     ('step', 'Select\nEmployee'),
     ('step', 'Check\nProbation\nEnd Date'),
     ('decision', 'Result?'),
     ('yes', 'Pass\nCOMPROB', 'Change Job &\nComp → verify\nPass Date'),
     ('no', 'Extend DC_EXTPROB\nor Fail TERM')],
    rules=[
        "BR-13: Probation = 119 วัน (ไม่ใช่ 120) — system-calculated จาก Hire Date",
        "BR-14: Pass → ต้อง verify Pass Probation Date ใน Employment Details หลัง complete",
        "BR-15: Extend → เปลี่ยน Probation End Date → system warning → Proceed",
        "BR-16: Fail → Terminate (TERM_UNSUCPROB, Involuntary) → ต้องตัดสินใจ OK to Rehire + Transfer subordinates",
    ],
    mockups=[
        ("Pass: Change Job & Comp", [
            ("Job Information", [
                ("Event", "readonly", "Completion of Probation"),
                ("Event Reason", "readonly", "COMPROB_COMPROB"),
            ]),
            ("Employment Details", [
                ("Pass Probation Date", "readonly", "(verify here)"),
                ("Employee Status", "readonly", "Active"),
            ]),
        ]),
        ("Extend: Data Change", [
            ("Job Information", [
                ("Event", "readonly", "Data Change"),
                ("Event Reason", "readonly", "DC_EXTPROB"),
                ("Probation End Date", "date", "(new date)"),
            ]),
        ]),
    ])
elements.extend(els)
Y += h

# CG-03-03 — Manage Employee Data
els, h = process_section("p03", Y, "CG-03-03", "Manage Employee Data",
    "HR / Employee / Manager",
    [
        ("001", "Maintain Master Data"),
        ("002", "Pay Rate Change - Individual"),
        ("003", "Pay Rate Change - Mass Upload"),
        ("004", "Maintain Profile Data"),
    ],
    [
        "FR-20: Direct Edit sections: National ID, Biographical, Contact, Address, Emergency Contact, Work Permit",
        "FR-21: Historical Edit (with effective date): Personal Info, Dependents, Payment Info",
        "FR-22: Change Job & Comp required for: Org Info, Job Info, Job Relationships, Compensation",
        "FR-23: Alt Cost Distribution via Take Action → Manage Alt Cost Distribution (must sum to 100%)",
        "FR-24: Workflow-triggering fields: First Name, Last Name, Name TH/EN, Marital Status, Military, Address",
        "FR-25: Employee Profile (Background Elements): Education, Work Exp, Salary History, Certifications, etc.",
        "FR-26: Pay Rate Change: Actions → Change Job & Comp → Use Change Calculator (amount or %)",
        "FR-27: Mass Upload: 2-file import (CompInfoImportTemplate.csv + PayComponentRecurringImportTemplate.csv)",
        "FR-28: Mass Upload: Purge Type = Incremental, Date = dd/MM/yyyy, Encoding = UTF-8",
        "FR-29: Future-dated record blocks backdated insert → must delete future record first",
    ],
    workflow=True)
elements.extend(els)
Y += h

# BW-03: Master Data Edit workflow
els, h = biz_workflow("bw03a", Y, "Maintain Master Data (Direct Edit vs Change Job & Comp)",
    [('start', 'HR/Emp'),
     ('step', 'Select\nEmployee'),
     ('step', 'Choose\nSection'),
     ('decision', 'Edit\nType?'),
     ('yes', 'Direct Edit\n(Current)', 'NatID, Contact\nAddress, Profile'),
     ('no', 'Change Job &\nComp (Historical)')],
    rules=[
        "BR-17: Direct Edit sections: National ID, Biographical, Contact, Address, Emergency, Work Permit, Profile",
        "BR-18: Historical Edit (ต้อง effective date): Personal Info, Dependents, Payment Info",
        "BR-19: Change Job & Comp required สำหรับ: Org Info, Job Info, Compensation, Job Relationships",
        "BR-20: Workflow triggers อัตโนมัติเมื่อแก้: First Name, Last Name, Name TH, Marital Status, Military, Address",
        "BR-21: Alt Cost Distribution ต้อง sum = 100% เสมอ",
    ],
    mockups=[
        ("People Profile — Personal Info", [
            ("TAB: Navigation", [
                ("PERSONAL INFO", "active"),
                ("EMPLOYMENT", ""),
                ("COMPENSATION", ""),
                ("PROFILE", ""),
            ]),
            ("COL_LEFT: Personal Sections", [
                ("National ID Info", "readonly", "✏ Edit / ⊕ Add / ⏰ History"),
                ("Personal Info", "readonly", "✏ Edit (Historical, eff.date)"),
                ("Biographical Info", "readonly", "✏ Edit (Current)"),
                ("Dependents", "readonly", "✏ Edit (Historical)"),
            ]),
            ("COL_RIGHT: Contact Sections", [
                ("Contact Info", "readonly", "✏ Edit (Email + Phone)"),
                ("Address Info", "readonly", "✏ Edit (Cascade filter)"),
                ("Work Permit Info", "readonly", "✏ Edit"),
                ("Emergency Contact", "readonly", "✏ Edit (Name + Phone)"),
            ]),
        ]),
        ("People Profile — Employment Info", [
            ("TAB: Navigation", [
                ("PERSONAL INFO", ""),
                ("EMPLOYMENT", "active"),
                ("COMPENSATION", ""),
                ("PROFILE", ""),
            ]),
            ("COL_LEFT: Org Sections", [
                ("Org Chart", "readonly", "(Display only)"),
                ("Position Info", "readonly", "Company + Position"),
                ("Organization Info", "readonly", "Group, BU, Dept, SSO"),
            ]),
            ("COL_RIGHT: Job Sections", [
                ("Job Information", "readonly", "Status, Family, Code, Role"),
                ("Job Relationships", "readonly", "✏ via Change Job & Comp"),
                ("Alt Cost Dist", "readonly", "✏ Manage (sum = 100%)"),
            ]),
        ]),
    ])
elements.extend(els)
Y += h

# BW-03b: Pay Rate Change
els, h = biz_workflow("bw03b", Y, "Pay Rate Change (Individual / Mass)",
    [('start', 'HR Admin'),
     ('decision', 'Individual\nor Mass?'),
     ('yes', 'Change Job\n& Comp →\nCalculator', 'Amount or %\nEvent Reason'),
     ('no', '2-file CSV\nImport'),
     ('step', 'Verify\nChanges'),
     ('end', 'Pay\nUpdated')],
    rules=[
        "BR-22: Event Reasons: PRCHG_MERIT, PRCHG_ADJPOS, PRCHG_SALCUT, PRCHG_SALADJ, PRCHG_PRM",
        "BR-23: Mass Upload = 2 files: CompInfoImportTemplate.csv + PayComponentRecurringImportTemplate.csv",
        "BR-24: Mass Upload settings: Purge = Incremental, Date = dd/MM/yyyy, Encoding = UTF-8",
        "BR-25: Future-dated record blocks backdated insert → ต้องลบ future record ก่อน",
    ],
    mockups=[
        ("Pay Rate: Change Calculator", [
            ("Compensation Info", [
                ("Event", "readonly", "Pay Rate Change"),
                ("Event Reason", "select", "PRCHG_MERIT ▼"),
            ]),
            ("Change Calculator", [
                ("Method", "select", "Amount / % ▼"),
                ("Current Salary", "readonly", "50,000"),
                ("Change Value", "text", ""),
                ("New Salary", "readonly", "(calculated)"),
                ("Effective Date", "date", ""),
            ]),
        ]),
        ("Mass: 2-File Import", [
            ("File 1", [
                ("Template", "readonly", "CompInfoImport.csv"),
                ("Purge Type", "select", "Incremental"),
                ("Date Format", "readonly", "dd/MM/yyyy"),
                ("Encoding", "readonly", "UTF-8"),
            ]),
            ("File 2", [
                ("Template", "readonly", "PayCompRecurring.csv"),
                ("Purge Type", "select", "Incremental"),
            ]),
        ]),
    ])
elements.extend(els)
Y += h

# CG-03-04 — Manage Employee Movement
els, h = process_section("p04", Y, "CG-03-04", "Manage Employee Movement", "HR",
    [
        ("001", "Transfer within Company"),
        ("002", "Promotion"),
        ("003", "Transfer across Company"),
        ("004", "Manage Acting Assignment"),
        ("005", "End Acting Assignment"),
        ("006", "Demotion"),
        ("007", "Change Employee Type"),
        ("008", "Manage Suspension"),
        ("009", "Return from Suspension"),
    ],
    [
        "FR-30: Transfer within Co (no SSO change): Event = Transfer, Reason = TRN_TRNWICNSO",
        "FR-31: Transfer within Co (SSO change): TRN_TRNWICWSO → additional Compensation step (update Pay Group)",
        "FR-32: Promotion: Event = Promotion, Reason = PRM_PRM | Demotion: PRM_DEMO",
        "FR-33: Transfer across Company = Terminate at source + Hire at destination (not just Change Job)",
        "FR-34: Payroll Period Lock: Effective Date locked to period start (01.mm or 21.mm)",
        "FR-35: Acting = Concurrent Employment: secondary = Yes, Pay Group = 99 (Non-PY relevant)",
        "FR-36: End Acting: Terminate selected assignment (NOT 'All Employments'), TERM_ENDASSIGN",
        "FR-37: Change Employee Type: JCHG_EMPTYPE → if Pay Group changes → DC_CHGINPAY",
        "FR-38: FTE reduction → Standard Weekly Hours auto-adjust proportionally",
        "FR-39: Suspension: unique path via Employment Info → Job Info → History → Insert New Record",
        "FR-40: Must Insert Return record (not delete Suspension) for audit trail",
        "FR-41: Position unchanged during suspension period",
    ])
elements.extend(els)
Y += h

# BW-04a: Transfer workflow
els, h = biz_workflow("bw04a", Y, "Transfer (Within Company)",
    [('start', 'HR'),
     ('step', 'Select\nEmployee'),
     ('step', 'Change Job\n& Comp'),
     ('step', 'Select New\nPosition', 'Auto-fill Org\nJob/Time info'),
     ('decision', 'SSO\nChange?'),
     ('yes', 'Update\nPay Group', 'Compensation\nstep required'),
     ('no', 'Skip Comp'),
     ('end', 'Transferred')],
    rules=[
        "BR-26: Transfer within Co (no SSO): TRN_TRNWICNSO | Transfer (SSO change): TRN_TRNWICWSO",
        "BR-27: SSO Location change → ต้องทำ Compensation step เพิ่ม (update Pay Group ตาม SSO ใหม่)",
        "BR-28: Transfer across Company ≠ Change Job — ต้อง Terminate ที่ต้นทาง + Hire ที่ปลายทาง",
        "BR-29: Payroll Period Lock: Effective Date ล็อคที่ต้นงวด (01.mm หรือ 21.mm) เท่านั้น",
        "BR-30: Promotion (PRM_PRM) / Demotion (PRM_DEMO) — ใช้ Event เดียวกัน = Promotion",
    ],
    mockups=[
        ("Transfer: Change Job & Comp", [
            ("Job Information", [
                ("Event", "select", "Transfer ▼"),
                ("Event Reason", "select", "TRN_TRNWICNSO ▼"),
                ("*Position", "select", "(new position)"),
            ]),
            ("Auto-fill from Position", [
                ("*Group", "readonly", "(auto)"),
                ("*Business Unit", "readonly", "(auto)"),
                ("*SSO Location", "readonly", "(auto)"),
                ("*Cost Centre", "readonly", "(auto)"),
            ]),
            ("If SSO Changed", [
                ("Pay Group", "select", "(update required)"),
                ("Effective Date", "readonly", "01.mm or 21.mm"),
            ]),
        ]),
    ])
elements.extend(els)
Y += h

# BW-04b: Acting Assignment
els, h = biz_workflow("bw04b", Y, "Acting Assignment (Start → End)",
    [('start', 'HR'),
     ('step', 'Add\nConcurrent\nEmployment', 'Secondary = Yes\nPay Group = 99'),
     ('step', 'Set Acting\nPosition', 'Star = primary'),
     ('step', '... Acting\nPeriod ...'),
     ('step', 'Terminate\nSelected\nAssignment', 'NOT All\nEmployments'),
     ('end', 'Acting\nEnded')],
    rules=[
        "BR-31: Acting = Concurrent Employment mechanism — ไม่ใช่ Transfer",
        "BR-32: Pay Group = 99 (Non-PY relevant) — ไม่มี payroll แยกสำหรับ acting position",
        "BR-33: Star icon = primary position indicator — ต้องกำหนดว่า position ไหนเป็นหลัก",
        "BR-34: End Acting = Terminate SELECTED assignment only — ห้ามเลือก 'All Employments'",
        "BR-35: Event Reason: End of Temporary Assignment (TERM_ENDASSIGN)",
    ],
    mockups=[
        ("Start: Add Concurrent Emp", [
            ("Concurrent Employment", [
                ("Secondary Employment", "select", "Yes"),
                ("*Pay Group", "readonly", "99 (Non-PY)"),
                ("*Position", "select", "(acting position)"),
            ]),
            ("Star Indicator", [
                ("Primary Position", "readonly", "★ (star icon)"),
                ("Acting Position", "readonly", "(secondary)"),
            ]),
        ]),
        ("End: Terminate Assignment", [
            ("Terminate", [
                ("Scope", "select", "Selected Assignment ▼"),
                ("Event", "readonly", "Termination"),
                ("Reason", "readonly", "TERM_ENDASSIGN"),
            ]),
            ("⚠ Warning", [
                ("Do NOT select", "readonly", "'All Employments'"),
            ]),
        ]),
    ])
elements.extend(els)
Y += h

# BW-04c: Suspension
els, h = biz_workflow("bw04c", Y, "Suspension & Return",
    [('start', 'HR'),
     ('step', 'Employment\nInfo Tab', 'History icon →\nInsert New Record'),
     ('step', 'Insert\nSuspension\nSUSP_SUSP', 'Status →\nSuspended'),
     ('step', '... Period\n(Position\nunchanged) ...'),
     ('step', 'Insert\nReturn\nRecord', 'RESUSP_RESUSP\nStatus → Active'),
     ('end', 'Returned')],
    rules=[
        "BR-36: Suspension ใช้ UI path ต่างจากปกติ: Employment Info → Job Info → History → Insert (ไม่ใช่ Actions menu)",
        "BR-37: Position ไม่เปลี่ยนระหว่าง suspension — พนักงานยังครอง position เดิม",
        "BR-38: ต้อง Insert Return record (ห้ามลบ Suspension record) เพื่อ audit trail",
    ],
    mockups=[
        ("Suspend: Insert Record", [
            ("⚠ Unique Entry Path", [
                ("Tab", "readonly", "Employment Info"),
                ("Section", "readonly", "Job Information"),
                ("Action", "readonly", "History → Insert"),
            ]),
            ("Insert New Record", [
                ("Event", "readonly", "Suspension"),
                ("Event Reason", "readonly", "SUSP_SUSP"),
                ("Effective Date", "date", ""),
                ("Status → ", "readonly", "Suspended"),
            ]),
        ]),
    ])
elements.extend(els)
Y += h

# CG-03-05 — Manage Termination
els, h = process_section("p05", Y, "CG-03-05", "Manage Termination",
    "HR / Manager+HRBP",
    [
        ("001", "Resignation (Voluntary)"),
        ("002", "Termination with Pay"),
        ("003", "Termination without Pay"),
        ("004", "Retirement"),
        ("005", "Termination Due to Death"),
        ("006", "Dismissal ⚡WORKFLOW"),
        ("007", "No Show"),
        ("008", "End of Contract"),
        ("009", "Transfer Out"),
    ],
    [
        "FR-42: Resign: TERM_RESIGN (Voluntary) → no workflow required",
        "FR-43: Retirement: TERM_RETRIE → Retirement Date = DOB + 60 years (CPN: 1 Jan Y+1, Others: 1 Mar Y+1)",
        "FR-44: Dismissal: TERM_DISMIS (Involuntary) → MANDATORY workflow (Manager ↔ HRBP approval)",
        "FR-45: No Show: Purge Employee ID from system",
        "FR-46: Key fields: Resigned Date, Last Date Worked, OK to Rehire (Yes/No = blacklist)",
        "FR-47: Transfer Direct Subordinates: 3 options available before termination completes",
        "FR-48: Multi-position rule: Must select 'All Employments' to truly terminate from company",
        "FR-49: End of Contract: automatic when contract end date reached",
    ],
    workflow=True)
elements.extend(els)
Y += h

# BW-05a: Resignation
els, h = biz_workflow("bw05a", Y, "Resignation (No Workflow)",
    [('start', 'HR'),
     ('step', 'Select\nEmployee'),
     ('step', 'Actions →\nTerminate'),
     ('step', 'Set Reason\nTERM_RESIGN\n(Voluntary)', 'Last Date Worked\nOK to Rehire?'),
     ('step', 'Transfer\nSubordinates', '3 options'),
     ('end', 'Terminated')],
    rules=[
        "BR-39: Resignation = Voluntary — ไม่ต้อง workflow approval",
        "BR-40: OK to Rehire = No → permanent blacklist สำหรับ position นั้น",
        "BR-41: ต้อง Transfer Direct Subordinates ก่อน termination complete (3 options)",
        "BR-42: Retirement Date = DOB + 60 ปี (CPN: 1 ม.ค. ปี+1, อื่นๆ: 1 มี.ค. ปี+1)",
    ],
    mockups=[
        ("Terminate: Key Fields", [
            ("Termination", [
                ("Event", "readonly", "Termination"),
                ("Event Reason", "select", "TERM_RESIGN ▼"),
                ("Voluntary", "readonly", "Voluntary"),
            ]),
            ("Dates", [
                ("Resigned Date", "date", ""),
                ("Last Date Worked", "date", ""),
                ("OK to Rehire", "select", "Yes / No ▼"),
            ]),
            ("Subordinates", [
                ("Transfer to", "select", "(3 options)"),
            ]),
        ]),
    ])
elements.extend(els)
Y += h

# BW-05b: Dismissal (with workflow)
els, h = biz_workflow("bw05b", Y, "Dismissal (Mandatory Approval Workflow)",
    [('start', 'Manager\nor HRBP'),
     ('step', 'Initiate\nDismissal\nTERM_DISMIS'),
     ('step', '⚡ Workflow\nApproval', 'Manager ↔ HRBP\nmust approve'),
     ('decision', 'Approved?'),
     ('yes', 'Execute\nTermination', 'Set dates\nOK to Rehire'),
     ('no', 'Rejected\n(cancelled)'),
     ('step', 'Transfer\nSubordinates'),
     ('end', 'Dismissed')],
    rules=[
        "BR-43: Dismissal = ONLY termination type ที่ต้อง mandatory workflow approval",
        "BR-44: Workflow: Line Manager initiate → HRBP approve (หรือกลับกัน)",
        "BR-45: Multi-position: ต้องเลือก 'All Employments' ถึงจะ terminate จากบริษัทจริง",
        "BR-46: No Show = ไม่ใช่ Dismissal — purge Employee ID โดยไม่ต้อง workflow",
    ],
    mockups=[
        ("Dismissal: Workflow Approval", [
            ("Initiate", [
                ("Initiator", "readonly", "Manager / HRBP"),
                ("Event Reason", "readonly", "TERM_DISMIS"),
                ("Type", "readonly", "Involuntary"),
            ]),
            ("⚡ Approval Chain", [
                ("Step 1", "readonly", "Manager → Approve"),
                ("Step 2", "readonly", "HRBP → Approve"),
                ("Status", "select", "Approved / Rejected"),
            ]),
            ("Multi-Position", [
                ("Scope", "select", "All Employments ▼"),
                ("⚠ Must select", "readonly", "'All' to truly exit"),
            ]),
        ]),
    ])
elements.extend(els)
Y += h

# CG-03-06 — Contract Renewal
els, h = process_section("p06", Y, "CG-03-06", "Manage Contract Renewal", "HR",
    [
        ("001", "End of Contract"),
        ("002", "Contract Renewal"),
    ],
    [
        "FR-50: Actions → Change Job & Comp → Event = Data Change, Reason = DC_EXCONT",
        "FR-51: Change Contract End Date to new date",
        "FR-52: System warning if Contract End Date not changed → Proceed or Correct",
    ])
elements.extend(els)
Y += h

# BW-06: Contract Renewal
els, h = biz_workflow("bw06", Y, "Contract Renewal",
    [('start', 'HR'),
     ('step', 'Select\nEmployee'),
     ('step', 'Actions →\nChange Job\n& Comp'),
     ('step', 'Event:\nData Change\nDC_EXCONT'),
     ('step', 'Set New\nContract\nEnd Date'),
     ('decision', 'Date\nChanged?'),
     ('yes', 'Save\nChanges'),
     ('no', 'System Warning\n→ Correct'),
     ('end', 'Renewed')],
    rules=[
        "BR-47: Event = Data Change, Reason = Extend Contract (DC_EXCONT)",
        "BR-48: System warning ถ้า Contract End Date ไม่ถูกเปลี่ยน → ต้อง Proceed หรือ Correct",
        "BR-49: Contract Types: Regular / Contract-Monthly / Contract-Yearly / Contract-Long term",
        "BR-50: Events/Event Reasons = pre-delivered by SuccessFactors — relabel ได้แต่สร้างใหม่ไม่ได้",
    ],
    mockups=[
        ("Contract: Change End Date", [
            ("Job Information", [
                ("Event", "readonly", "Data Change"),
                ("Event Reason", "readonly", "DC_EXCONT"),
                ("Contract End Date", "date", "(new date)"),
                ("Contract Type", "readonly", "(current)"),
            ]),
            ("System Warning", [
                ("⚠ If date unchanged", "readonly", "Warning popup"),
                ("Action", "select", "Proceed / Correct"),
            ]),
        ]),
    ])
elements.extend(els)
Y += h

# ═══════════════════════════════════════════════
# EVENT-REASON MATRIX (evidence)
# ═══════════════════════════════════════════════
elements.append(txt("ev_title", 50, Y, "Event-Reason Matrix (pre-delivered, relabel only)", fs=18, color=C["title"], w=600, h=22))
Y += 28
elements.append(rect("ev_bg", 50, Y, 1300, 150, C["evidence_bg"], C["process_stroke"], [("ev_t", "text")]))
elements.append(txt("ev_t", 60, Y+5,
    "Hire:         New Hire | Replacement | Temporary Assignment (Acting) | HIRE Incorrect Entry | HIRE Corrected Entry\n"
    "Rehire:       Rehiring LT 1 year | Rehiring GE 1 year\n"
    "Probation:    Completion of Probation\n"
    "Promotion:    Promotion | Demotion\n"
    "Reorg:        Reorganization\n"
    "Transfer:     Within Co + change SSO | Within Co NOT change SSO | Across Company\n"
    "Data Change:  Extend Probation | Extend Retirement | Extend Contract | Data Change | Change in Pay | Change in Time | System Change\n"
    "Pay Rate:     Merit Increase | Adjust Position | Salary Cuts | Salary Adjust | Promotion\n"
    "Position:     Position Change  |  Change Emp Type: JCHG_EMPTYPE  |  Change to Retirement\n"
    "Suspension:   Suspension  |  Return from Suspension\n"
    "Termination:  Resignation | Unsuccessful Probation | Retirement | Early Retirement | No Show | Layoff | Passed Away | Dismissal | End of Contract | End of Temp Assignment | Transfer Out",
    fs=9, color=C["evidence_text"], w=1280, h=140, cid="ev_bg", va="top"))
Y += 165

# ═══════════════════════════════════════════════
# EMPLOYEE GROUPS (evidence)
# ═══════════════════════════════════════════════
elements.append(txt("eg_title", 50, Y, "Employee Groups & Contract Types", fs=18, color=C["title"], w=500, h=22))
Y += 28
elements.append(rect("eg_bg", 50, Y, 900, 80, C["evidence_bg"], C["process_stroke"], [("eg_t", "text")]))
elements.append(txt("eg_t", 60, Y+5,
    "A=Permanent | W=Expat Outbound | C=Expat Inbound | D=Retirement | E=Temporary | F=DVT | G=Internship | H=Contingent\n"
    "Subgroups: Permanent/Expat 07-27 | Temp: P1(Monthly) P2(Piecework) P3(Daily) | DVT: D1/D2 | Intern: T1/T2 | C1=Consultant\n"
    "Piecework: X7-XB | Daily: Y7-YB\n"
    "Contract Types: Regular | Contract-Monthly | Contract-Yearly | Contract-Long term",
    fs=9, color=C["evidence_text"], w=880, h=70, cid="eg_bg", va="top"))
Y += 95

# Business rules now embedded in each workflow — summary removed to avoid duplication

# Traceability section moved to separate file: generate-ui-erd-traceability.py

# ═══════════════════════════════════════════════
# OUTPUT
# ═══════════════════════════════════════════════
doc = {
    "type": "excalidraw", "version": 2, "source": "https://excalidraw.com",
    "elements": elements,
    "appState": {"viewBackgroundColor": "#ffffff", "gridSize": 20},
    "files": {},
}
out = "/Users/tachongrak/stark/projects/hr-platform-replacement/diagrams/ttt-workflow-fr.excalidraw"
with open(out, "w") as f:
    json.dump(doc, f, indent=2, ensure_ascii=False)
print(f"Generated {len(elements)} elements → {out}")

# Auto-validate
import subprocess
result = subprocess.run(["python3", "validate_excalidraw.py", out], capture_output=True, text=True)
print(result.stdout)
if result.returncode != 0:
    print("⛔ VALIDATION FAILED — fix errors before rendering!")
    sys.exit(1)
