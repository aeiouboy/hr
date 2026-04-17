"""Generate all 11 EC flows + overview into a single .excalidraw file."""
import json

# Color palette (from excalidraw skill)
C = {
    "start_fill": "#fed7aa", "start_stroke": "#c2410c",
    "end_fill": "#a7f3d0", "end_stroke": "#047857",
    "process_fill": "#3b82f6", "process_stroke": "#1e3a5f",
    "process2_fill": "#60a5fa", "process2_stroke": "#1e3a5f",
    "decision_fill": "#fef3c7", "decision_stroke": "#b45309",
    "ai_fill": "#ddd6fe", "ai_stroke": "#6d28d9",
    "warn_fill": "#fee2e2", "warn_stroke": "#dc2626",
    "inactive_fill": "#dbeafe", "inactive_stroke": "#1e40af",
    "evidence_bg": "#1e293b", "evidence_text": "#22c55e",
    "title": "#1e40af", "subtitle": "#3b82f6", "detail": "#64748b",
    "on_dark": "#ffffff", "on_light": "#374151",
}

elements = []
seed_counter = [1000]

def next_seed():
    seed_counter[0] += 1
    return seed_counter[0]

def make_text(id, x, y, text, font_size=16, color="#1e40af", align="left", w=200, h=25, container_id=None, v_align="top"):
    return {
        "type": "text", "id": id, "x": x, "y": y, "width": w, "height": h,
        "text": text, "originalText": text,
        "fontSize": font_size, "fontFamily": 3, "textAlign": align, "verticalAlign": v_align,
        "strokeColor": color, "backgroundColor": "transparent",
        "fillStyle": "solid", "strokeWidth": 1, "strokeStyle": "solid", "roughness": 0, "opacity": 100,
        "angle": 0, "seed": next_seed(), "version": 1, "versionNonce": next_seed(),
        "isDeleted": False, "groupIds": [], "boundElements": None, "link": None, "locked": False,
        "containerId": container_id, "lineHeight": 1.25,
    }

def make_rect(id, x, y, w, h, fill, stroke, bound_ids=None, dashed=False):
    return {
        "type": "rectangle", "id": id, "x": x, "y": y, "width": w, "height": h,
        "strokeColor": stroke, "backgroundColor": fill,
        "fillStyle": "solid", "strokeWidth": 2,
        "strokeStyle": "dashed" if dashed else "solid", "roughness": 0, "opacity": 100,
        "angle": 0, "seed": next_seed(), "version": 1, "versionNonce": next_seed(),
        "isDeleted": False, "groupIds": [],
        "boundElements": [{"id": bid, "type": t} for bid, t in (bound_ids or [])],
        "link": None, "locked": False, "roundness": {"type": 3},
    }

def make_ellipse(id, x, y, w, h, fill, stroke, bound_ids=None):
    return {
        "type": "ellipse", "id": id, "x": x, "y": y, "width": w, "height": h,
        "strokeColor": stroke, "backgroundColor": fill,
        "fillStyle": "solid", "strokeWidth": 2, "strokeStyle": "solid", "roughness": 0, "opacity": 100,
        "angle": 0, "seed": next_seed(), "version": 1, "versionNonce": next_seed(),
        "isDeleted": False, "groupIds": [],
        "boundElements": [{"id": bid, "type": t} for bid, t in (bound_ids or [])],
        "link": None, "locked": False,
    }

def make_diamond(id, x, y, w, h, fill, stroke, bound_ids=None):
    return {
        "type": "diamond", "id": id, "x": x, "y": y, "width": w, "height": h,
        "strokeColor": stroke, "backgroundColor": fill,
        "fillStyle": "solid", "strokeWidth": 2, "strokeStyle": "solid", "roughness": 0, "opacity": 100,
        "angle": 0, "seed": next_seed(), "version": 1, "versionNonce": next_seed(),
        "isDeleted": False, "groupIds": [],
        "boundElements": [{"id": bid, "type": t} for bid, t in (bound_ids or [])],
        "link": None, "locked": False,
    }

def make_arrow(id, x, y, points, color, start_id=None, end_id=None):
    w = max(abs(p[0]) for p in points) if points else 0
    h = max(abs(p[1]) for p in points) if points else 0
    return {
        "type": "arrow", "id": id, "x": x, "y": y, "width": w, "height": h,
        "strokeColor": color, "backgroundColor": "transparent",
        "fillStyle": "solid", "strokeWidth": 2, "strokeStyle": "solid", "roughness": 0, "opacity": 100,
        "angle": 0, "seed": next_seed(), "version": 1, "versionNonce": next_seed(),
        "isDeleted": False, "groupIds": [], "boundElements": None, "link": None, "locked": False,
        "points": points,
        "startBinding": {"elementId": start_id, "focus": 0, "gap": 2} if start_id else None,
        "endBinding": {"elementId": end_id, "focus": 0, "gap": 2} if end_id else None,
        "startArrowhead": None, "endArrowhead": "arrow",
    }

def make_line(id, x, y, points, color="#64748b", width=1, dashed=False):
    return {
        "type": "line", "id": id, "x": x, "y": y,
        "width": max(abs(p[0]) for p in points) if points else 0,
        "height": max(abs(p[1]) for p in points) if points else 0,
        "strokeColor": color, "backgroundColor": "transparent",
        "fillStyle": "solid", "strokeWidth": width,
        "strokeStyle": "dashed" if dashed else "solid", "roughness": 0, "opacity": 100,
        "angle": 0, "seed": next_seed(), "version": 1, "versionNonce": next_seed(),
        "isDeleted": False, "groupIds": [], "boundElements": None, "link": None, "locked": False,
        "points": points,
    }

def add_flow_section(prefix, y_base, title, subtitle_text, steps, extra_elements_fn=None):
    """Add a flow section with title, subtitle, and step boxes."""
    els = []
    # Title
    els.append(make_text(f"{prefix}_title", 50, y_base, title, font_size=24, color=C["title"], w=600, h=30))
    # Subtitle
    els.append(make_text(f"{prefix}_sub", 50, y_base + 35, subtitle_text, font_size=13, color=C["detail"], w=900, h=18))

    # Steps as assembly line
    step_y = y_base + 70
    step_w = 150
    step_h = 65
    gap = 40
    x = 50

    # Start node
    start_id = f"{prefix}_start"
    start_txt_id = f"{prefix}_start_txt"
    first_arrow_id = f"{prefix}_a_start"
    els.append(make_ellipse(start_id, x, step_y, 90, 50,
                            C["start_fill"], C["start_stroke"],
                            [(start_txt_id, "text"), (first_arrow_id, "arrow")]))
    els.append(make_text(start_txt_id, x+10, step_y+12, "Start", font_size=13, color=C["start_stroke"],
                         align="center", w=70, h=25, container_id=start_id, v_align="middle"))
    x += 90

    prev_id = start_id
    for i, (step_name, detail_lines) in enumerate(steps):
        arrow_id = f"{prefix}_a{i}" if i > 0 else first_arrow_id
        rect_id = f"{prefix}_s{i}"
        txt_id = f"{prefix}_s{i}_t"
        detail_id = f"{prefix}_s{i}_d"
        next_arrow_id = f"{prefix}_a{i+1}"

        # Arrow from previous
        els.append(make_arrow(arrow_id, x, step_y + 25, [[0, 0], [gap, 0]],
                              C["process_stroke"], prev_id, rect_id))
        x += gap

        # Step box
        fill = C["process_fill"] if i % 2 == 0 else C["process2_fill"]
        bound = [(txt_id, "text"), (arrow_id, "arrow")]
        if i < len(steps) - 1:
            bound.append((next_arrow_id, "arrow"))
        else:
            bound.append((f"{prefix}_a_end", "arrow"))
        els.append(make_rect(rect_id, x, step_y, step_w, step_h, fill, C["process_stroke"], bound))
        els.append(make_text(txt_id, x+10, step_y+10, step_name, font_size=13, color=C["on_dark"],
                             align="center", w=step_w-20, h=45, container_id=rect_id, v_align="middle"))

        # Detail text below
        if detail_lines:
            detail_text = "\n".join(detail_lines)
            els.append(make_text(detail_id, x, step_y + step_h + 8, detail_text,
                                 font_size=10, color=C["detail"], w=step_w, h=len(detail_lines)*14))

        prev_id = rect_id
        x += step_w

    # End node
    end_id = f"{prefix}_end"
    end_txt_id = f"{prefix}_end_txt"
    els.append(make_arrow(f"{prefix}_a_end", x, step_y + 25, [[0, 0], [gap, 0]],
                          C["end_stroke"], prev_id, end_id))
    x += gap
    els.append(make_ellipse(end_id, x, step_y, 90, 50,
                            C["end_fill"], C["end_stroke"],
                            [(end_txt_id, "text"), (f"{prefix}_a_end", "arrow")]))
    els.append(make_text(end_txt_id, x+10, step_y+12, "Done", font_size=13, color=C["end_stroke"],
                         align="center", w=70, h=25, container_id=end_id, v_align="middle"))

    # Extra elements (custom per flow)
    if extra_elements_fn:
        els.extend(extra_elements_fn(prefix, y_base))

    return els

# ═══════════════════════════════════════════════
# OVERVIEW
# ═══════════════════════════════════════════════
Y = 0
elements.append(make_text("main_title", 50, Y, "SAP EC Core — All 11 Flows", font_size=32, color=C["title"], w=800, h=40))
elements.append(make_text("main_sub", 50, Y+45, "Source: CNeXt TTT V0.02 (Oct 2018)  |  Presence of IT for Central Group  |  11 Processes + 1 Overview", font_size=13, color=C["detail"], w=1000, h=18))

# Overview lifecycle timeline
ov_y = Y + 90
lifecycle = ["Hire/Rehire", "Probation", "Master Data", "Movement", "Pay Change",
             "Emp Type", "Suspension", "Acting", "Contract", "Terminate", "Report"]
ov_x = 50
elements.append(make_line("ov_line", ov_x, ov_y + 20, [[0, 0], [1200, 0]], C["process_stroke"], width=3))

for i, label in enumerate(lifecycle):
    dot_x = ov_x + i * 110
    dot_id = f"ov_dot_{i}"
    elements.append(make_ellipse(dot_id, dot_x - 6, ov_y + 14, 12, 12, C["process_fill"], C["process_stroke"]))
    elements.append(make_text(f"ov_label_{i}", dot_x - 30, ov_y + 35, f"{i+1:02d}. {label}",
                              font_size=11, color=C["title"], w=100, h=16, align="center"))

# Separator
sep_y = Y + 170
elements.append(make_line("sep_overview", 50, sep_y, [[0, 0], [1350, 0]], C["detail"], width=1, dashed=True))

# ═══════════════════════════════════════════════
# FLOW 01 — Hire & Rehire
# ═══════════════════════════════════════════════
Y = 200
def flow01_extras(prefix, y_base):
    els = []
    ey = y_base + 220
    # Rehire sub-section
    els.append(make_text(f"{prefix}_rehire_title", 50, ey, "Rehire: Duplicate Check", font_size=16, color=C["subtitle"], w=300, h=22))
    ey += 30
    els.append(make_rect(f"{prefix}_dup", 50, ey, 160, 50, C["ai_fill"], C["ai_stroke"],
                         [(f"{prefix}_dup_t", "text")]))
    els.append(make_text(f"{prefix}_dup_t", 60, ey+5, "Duplicate Check\nDOB + National ID", font_size=11,
                         color=C["ai_stroke"], align="center", w=140, h=40, container_id=f"{prefix}_dup", v_align="middle"))
    els.append(make_arrow(f"{prefix}_dup_a", 212, ey+25, [[0,0],[38,0]], C["ai_stroke"], f"{prefix}_dup", f"{prefix}_match"))
    els.append(make_diamond(f"{prefix}_match", 250, ey, 80, 50, C["decision_fill"], C["decision_stroke"],
                            [(f"{prefix}_match_t", "text")]))
    els.append(make_text(f"{prefix}_match_t", 265, ey+12, "Match?", font_size=11, color=C["decision_stroke"],
                         align="center", w=50, h=25, container_id=f"{prefix}_match", v_align="middle"))
    # Yes path
    els.append(make_arrow(f"{prefix}_yes_a", 332, ey+25, [[0,0],[38,0]], C["end_stroke"], f"{prefix}_match", f"{prefix}_reuse"))
    els.append(make_text(f"{prefix}_yes_l", 340, ey+5, "Yes", font_size=10, color=C["end_stroke"], w=25, h=14))
    els.append(make_rect(f"{prefix}_reuse", 370, ey, 150, 50, C["end_fill"], C["end_stroke"],
                         [(f"{prefix}_reuse_t", "text")]))
    els.append(make_text(f"{prefix}_reuse_t", 380, ey+8, "Accept Match\nReuse existing data", font_size=11,
                         color=C["end_stroke"], align="center", w=130, h=34, container_id=f"{prefix}_reuse", v_align="middle"))
    # No path
    els.append(make_arrow(f"{prefix}_no_a", 290, ey+52, [[0,0],[0,30]], C["warn_stroke"], f"{prefix}_match", f"{prefix}_fresh"))
    els.append(make_text(f"{prefix}_no_l", 298, ey+55, "No", font_size=10, color=C["warn_stroke"], w=20, h=14))
    els.append(make_rect(f"{prefix}_fresh", 230, ey+82, 120, 35, C["process_fill"], C["process_stroke"],
                         [(f"{prefix}_fresh_t", "text")]))
    els.append(make_text(f"{prefix}_fresh_t", 240, ey+85, "New record", font_size=11,
                         color=C["on_dark"], align="center", w=100, h=25, container_id=f"{prefix}_fresh", v_align="middle"))
    # Business rules
    els.append(make_text(f"{prefix}_rules_title", 600, ey-5, "Key Rules", font_size=14, color=C["subtitle"], w=150, h=20))
    els.append(make_rect(f"{prefix}_rules_bg", 600, ey+18, 280, 100, C["evidence_bg"], C["process_stroke"],
                         [(f"{prefix}_rules_t", "text")]))
    els.append(make_text(f"{prefix}_rules_t", 610, ey+22, "• Employee ID = auto-generated\n• Probation = Hire + 119 days\n• Rehire: Original Start Date preserved\n• Seniority Start Date = rehire date\n• OK to Rehire = No → blacklist\n• Events pre-delivered (relabel only)",
                         font_size=10, color=C["evidence_text"], w=260, h=90, container_id=f"{prefix}_rules_bg", v_align="middle"))
    return els

elements.extend(add_flow_section("f01", Y,
    "01 — Hire & Rehire",
    "Actor: HR Admin  |  Event: Hire / Rehire  |  Workflow: No",
    [
        ("Step 1\nIdentity", ["Hire Date, Company", "Event Reason", "Name EN, DOB", "National ID"]),
        ("Step 2\nPersonal Info", ["Name TH, Gender", "Marital, Nationality", "Contact, Address", "Emergency, Dependents"]),
        ("Step 3\nJob Info", ["Position (auto-fill)", "Employee Group", "Contract Type", "Probation End Date"]),
        ("Step 4\nJob Relation", ["Matrix Manager", "Custom Mgr (LMS)", "Work Permit"]),
        ("Step 5\nCompensation", ["Pay Group", "Pay Component", "Payment Method", "Bank Details"]),
    ],
    flow01_extras
))
elements.append(make_line("sep_01", 50, Y+370, [[0,0],[1350,0]], C["detail"], width=1, dashed=True))

# ═══════════════════════════════════════════════
# FLOW 02 — Manage Probation
# ═══════════════════════════════════════════════
Y = 600
def flow02_extras(prefix, y_base):
    els = []
    ey = y_base + 200
    els.append(make_text(f"{prefix}_scenarios", 50, ey, "3 Scenarios", font_size=16, color=C["subtitle"], w=200, h=22))
    ey += 30
    scenarios = [
        ("Pass", "Completion of\nProbation", C["end_fill"], C["end_stroke"]),
        ("Extend", "Data Change\nDC_EXTPROB", C["decision_fill"], C["decision_stroke"]),
        ("Fail", "Terminate\nTERM_UNSUCPROB", C["warn_fill"], C["warn_stroke"]),
    ]
    for i, (label, detail, fill, stroke) in enumerate(scenarios):
        sx = 50 + i * 200
        rid = f"{prefix}_sc{i}"
        els.append(make_rect(rid, sx, ey, 170, 55, fill, stroke, [(f"{rid}_t", "text")]))
        els.append(make_text(f"{rid}_t", sx+10, ey+5, f"{label}\n{detail}", font_size=11,
                             color=stroke, align="center", w=150, h=45, container_id=rid, v_align="middle"))
    return els

elements.extend(add_flow_section("f02", Y,
    "02 — Manage Probation",
    "Actor: HR Admin  |  Event: Completion of Probation / Data Change / Terminate  |  Workflow: No",
    [
        ("Identify\nEmployee", ["Search employee", "Check probation status"]),
        ("Evaluate\nProbation", ["Pass / Extend / Fail", "Check end date"]),
        ("Execute\nAction", ["Change Job & Comp", "or Terminate"]),
    ],
    flow02_extras
))
elements.append(make_line("sep_02", 50, Y+340, [[0,0],[1350,0]], C["detail"], width=1, dashed=True))

# ═══════════════════════════════════════════════
# FLOW 03 — Maintain Master Data
# ═══════════════════════════════════════════════
Y = 970
def flow03_extras(prefix, y_base):
    els = []
    ey = y_base + 200
    els.append(make_text(f"{prefix}_methods", 50, ey, "Edit Methods by Section", font_size=16, color=C["subtitle"], w=300, h=22))
    ey += 25
    els.append(make_rect(f"{prefix}_tbl", 50, ey, 520, 100, C["evidence_bg"], C["process_stroke"],
                         [(f"{prefix}_tbl_t", "text")]))
    els.append(make_text(f"{prefix}_tbl_t", 60, ey+5,
        "Direct Edit:     National ID, Contact, Address, Emergency\n"
        "Direct (hist):   Personal Info, Dependents, Payment Info\n"
        "Change Job&Comp: Org Info, Job Info, Compensation\n"
        "Alt Cost Dist:   Take Action → Manage Alt Cost\n"
        "Profile:         Direct edit (Background Elements)\n"
        "⚠ Workflow triggers: First/Last name, Marital, Address",
        font_size=10, color=C["evidence_text"], w=500, h=90, container_id=f"{prefix}_tbl", v_align="middle"))
    return els

elements.extend(add_flow_section("f03", Y,
    "03 — Maintain Master Data",
    "Actor: HR / Employee / Manager  |  Event: Direct Edit / Change Job & Comp  |  Workflow: Yes (Personal Info fields)",
    [
        ("Select\nEmployee", ["Search by name/ID"]),
        ("Choose\nSection", ["Current vs Historical", "Edit method varies"]),
        ("Edit\nFields", ["Direct edit or", "Take Action menu"]),
        ("Save &\nWorkflow", ["Auto-trigger for", "name/marital/address"]),
    ],
    flow03_extras
))
elements.append(make_line("sep_03", 50, Y+340, [[0,0],[1350,0]], C["detail"], width=1, dashed=True))

# ═══════════════════════════════════════════════
# FLOW 04 — Employee Movement
# ═══════════════════════════════════════════════
Y = 1340
def flow04_extras(prefix, y_base):
    els = []
    ey = y_base + 200
    els.append(make_text(f"{prefix}_scenarios", 50, ey, "5 Scenarios", font_size=16, color=C["subtitle"], w=200, h=22))
    ey += 25
    scenarios = [
        ("Transfer (no SSO)", "TRN_TRNWICNSO"),
        ("Transfer (SSO)", "TRN_TRNWICWSO"),
        ("Promotion", "PRM_PRM"),
        ("Demotion", "PRM_DEMO"),
        ("Cross-Company", "Terminate + Hire"),
    ]
    for i, (label, code) in enumerate(scenarios):
        sx = 50 + i * 180
        rid = f"{prefix}_sc{i}"
        fill = C["warn_fill"] if i == 4 else C["process_fill"] if i % 2 == 0 else C["process2_fill"]
        stroke = C["warn_stroke"] if i == 4 else C["process_stroke"]
        tcolor = C["warn_stroke"] if i == 4 else C["on_dark"]
        els.append(make_rect(rid, sx, ey, 160, 45, fill, stroke, [(f"{rid}_t", "text")]))
        els.append(make_text(f"{rid}_t", sx+5, ey+5, f"{label}\n{code}", font_size=10,
                             color=tcolor, align="center", w=150, h=35, container_id=rid, v_align="middle"))
    # Rule
    els.append(make_text(f"{prefix}_rule", 50, ey+60, "⚠ Payroll Period Lock: Effective Date locked to 01.mm or 21.mm  |  Cross-Company = Terminate at source + Hire at destination",
                         font_size=10, color=C["warn_stroke"], w=900, h=14))
    return els

elements.extend(add_flow_section("f04", Y,
    "04 — Employee Movement",
    "Actor: HR  |  Event: Transfer / Promotion  |  Workflow: No",
    [
        ("Select\nEmployee", ["Search employee"]),
        ("Change Job\n& Comp", ["Select new Position", "Auto-fill Org/Job"]),
        ("Set Event\n& Reason", ["Transfer / Promotion", "/ Demotion"]),
        ("Update\nComp", ["If SSO change →", "update Pay Group"]),
    ],
    flow04_extras
))
elements.append(make_line("sep_04", 50, Y+320, [[0,0],[1350,0]], C["detail"], width=1, dashed=True))

# ═══════════════════════════════════════════════
# FLOW 05 — Pay Rate Change
# ═══════════════════════════════════════════════
Y = 1690
def flow05_extras(prefix, y_base):
    els = []
    ey = y_base + 200
    els.append(make_text(f"{prefix}_mass", 50, ey, "Mass Upload (2-file import)", font_size=16, color=C["subtitle"], w=350, h=22))
    ey += 25
    els.append(make_rect(f"{prefix}_mass_bg", 50, ey, 400, 55, C["evidence_bg"], C["process_stroke"],
                         [(f"{prefix}_mass_t", "text")]))
    els.append(make_text(f"{prefix}_mass_t", 60, ey+5,
        "1. CompInfoImportTemplate.csv\n2. PayComponentRecurringImportTemplate.csv\nPurge = Incremental  |  Date = dd/MM/yyyy  |  UTF-8",
        font_size=10, color=C["evidence_text"], w=380, h=45, container_id=f"{prefix}_mass_bg", v_align="middle"))
    els.append(make_text(f"{prefix}_rule", 480, ey,
        "Event Reasons: PRCHG_MERIT, PRCHG_ADJPOS,\nPRCHG_SALCUT, PRCHG_SALADJ, PRCHG_PRM\n⚠ Future-dated record blocks backdated insert",
        font_size=10, color=C["detail"], w=350, h=45))
    return els

elements.extend(add_flow_section("f05", Y,
    "05 — Pay Rate Change",
    "Actor: HR  |  Event: Pay Rate Change  |  Workflow: No",
    [
        ("Actions →\nChange Job", ["Select employee"]),
        ("Compensation\nInfo", ["Event = Pay Rate", "Change"]),
        ("Change\nCalculator", ["Amount or %", "Set effective date"]),
    ],
    flow05_extras
))
elements.append(make_line("sep_05", 50, Y+310, [[0,0],[1350,0]], C["detail"], width=1, dashed=True))

# ═══════════════════════════════════════════════
# FLOW 06 — Change Employee Type
# ═══════════════════════════════════════════════
Y = 2030
elements.extend(add_flow_section("f06", Y,
    "06 — Change Employee Type",
    "Actor: HR  |  Event: JCHG_EMPTYPE  |  Workflow: No",
    [
        ("Actions →\nChange Job", ["Select employee"]),
        ("Job Info\nEmp Type", ["Event = Change", "Employee Type"]),
        ("Comp Update\n(if needed)", ["If Pay Group changes", "→ DC_CHGINPAY"]),
        ("Time Change\n(if needed)", ["OT Flag, Holiday", "Working Hours"]),
    ],
))
elements.append(make_text("f06_rule", 50, Y+210, "⚠ FTE reduction → Standard Weekly Hours auto-adjust proportionally",
                          font_size=10, color=C["warn_stroke"], w=600, h=14))
elements.append(make_line("sep_06", 50, Y+240, [[0,0],[1350,0]], C["detail"], width=1, dashed=True))

# ═══════════════════════════════════════════════
# FLOW 07 — Manage Suspension
# ═══════════════════════════════════════════════
Y = 2300
def flow07_extras(prefix, y_base):
    els = []
    ey = y_base + 200
    els.append(make_text(f"{prefix}_note", 50, ey,
        "⚠ Unique entry: Employment Info → Job Information → History icon → Insert New Record\n"
        "Position unchanged during suspension  |  Must Insert Return record (not delete) for audit trail",
        font_size=10, color=C["warn_stroke"], w=800, h=28))
    return els

elements.extend(add_flow_section("f07", Y,
    "07 — Manage Suspension",
    "Actor: HR  |  Event: Suspension / Return from Suspension  |  Workflow: No",
    [
        ("Employment\nInfo Tab", ["History icon →", "Insert New Record"]),
        ("Suspend\nSUSP_SUSP", ["Status → Suspended", "Position unchanged"]),
        ("Return\nRESUSP", ["Insert Return record", "Status → Active"]),
    ],
    flow07_extras
))
elements.append(make_line("sep_07", 50, Y+260, [[0,0],[1350,0]], C["detail"], width=1, dashed=True))

# ═══════════════════════════════════════════════
# FLOW 08 — Acting Assignment
# ═══════════════════════════════════════════════
Y = 2590
def flow08_extras(prefix, y_base):
    els = []
    ey = y_base + 200
    els.append(make_rect(f"{prefix}_mech", 50, ey, 350, 50, C["evidence_bg"], C["process_stroke"],
                         [(f"{prefix}_mech_t", "text")]))
    els.append(make_text(f"{prefix}_mech_t", 60, ey+5,
        "Mechanism: Concurrent Employment\nPay Group = 99 (Non-PY relevant) — no separate payroll",
        font_size=10, color=C["evidence_text"], w=330, h=40, container_id=f"{prefix}_mech", v_align="middle"))
    return els

elements.extend(add_flow_section("f08", Y,
    "08 — Acting Assignment",
    "Actor: HR  |  Event: Hire (Temp) / Terminate (End)  |  Workflow: No",
    [
        ("Add Concurrent\nEmployment", ["Secondary = Yes", "Pay Group = 99"]),
        ("Set Acting\nPosition", ["Star icon = primary", "position indicator"]),
        ("End Acting\nTerminate", ["Terminate selected", "TERM_ENDASSIGN"]),
    ],
    flow08_extras
))
elements.append(make_line("sep_08", 50, Y+280, [[0,0],[1350,0]], C["detail"], width=1, dashed=True))

# ═══════════════════════════════════════════════
# FLOW 09 — Contract Renewal
# ═══════════════════════════════════════════════
Y = 2900
elements.extend(add_flow_section("f09", Y,
    "09 — Contract Renewal",
    "Actor: HR  |  Event: Data Change / DC_EXCONT  |  Workflow: No",
    [
        ("Actions →\nChange Job", ["Select employee"]),
        ("Job Info\nContract", ["Event = Data Change", "Reason = DC_EXCONT"]),
        ("New End\nDate", ["Change Contract", "End Date"]),
    ],
))
elements.append(make_text("f09_rule", 50, Y+200, "⚠ System warning if Contract End Date not changed → Proceed or Correct",
                          font_size=10, color=C["warn_stroke"], w=600, h=14))
elements.append(make_line("sep_09", 50, Y+230, [[0,0],[1350,0]], C["detail"], width=1, dashed=True))

# ═══════════════════════════════════════════════
# FLOW 10 — Terminate
# ═══════════════════════════════════════════════
Y = 3160
def flow10_extras(prefix, y_base):
    els = []
    ey = y_base + 200
    els.append(make_text(f"{prefix}_scenarios", 50, ey, "5 Scenarios", font_size=16, color=C["subtitle"], w=200, h=22))
    ey += 25
    scenarios = [
        ("Resign", "TERM_RESIGN", "Voluntary", False),
        ("Retirement", "TERM_RETRIE", "Involuntary", False),
        ("Dismissal", "TERM_DISMIS", "Involuntary", True),
        ("No Show", "Purge EmpID", "Involuntary", False),
        ("Transfer Out", "Transfer", "Involuntary", False),
    ]
    for i, (label, code, vol, has_wf) in enumerate(scenarios):
        sx = 50 + i * 180
        rid = f"{prefix}_sc{i}"
        fill = C["warn_fill"] if has_wf else (C["end_fill"] if vol == "Voluntary" else C["inactive_fill"])
        stroke = C["warn_stroke"] if has_wf else (C["end_stroke"] if vol == "Voluntary" else C["inactive_stroke"])
        els.append(make_rect(rid, sx, ey, 160, 55, fill, stroke, [(f"{rid}_t", "text")]))
        wf_tag = "\n⚡ WORKFLOW" if has_wf else ""
        els.append(make_text(f"{rid}_t", sx+5, ey+5, f"{label} ({vol})\n{code}{wf_tag}", font_size=10,
                             color=stroke, align="center", w=150, h=45, container_id=rid, v_align="middle"))
    els.append(make_text(f"{prefix}_rule", 50, ey+70,
        "Key fields: Resigned Date, Last Date Worked, OK to Rehire (Yes/No=blacklist), Transfer Direct Subordinates\n"
        "Multi-position rule: Must select 'All Employments' to truly terminate from company",
        font_size=10, color=C["detail"], w=900, h=28))
    return els

elements.extend(add_flow_section("f10", Y,
    "10 — Terminate",
    "Actor: HR / Manager+HRBP  |  Event: Termination  |  Workflow: Yes (Dismissal only — Manager↔HRBP)",
    [
        ("Select\nEmployee", ["Search employee"]),
        ("Choose\nReason", ["Resign / Retire /", "Dismiss / No Show"]),
        ("Set Details\n& Dates", ["Last Date Worked", "OK to Rehire?"]),
        ("Transfer\nSubordinates", ["3 options for", "direct reports"]),
    ],
    flow10_extras
))
elements.append(make_line("sep_10", 50, Y+340, [[0,0],[1350,0]], C["detail"], width=1, dashed=True))

# ═══════════════════════════════════════════════
# FLOW 11 — EC Report
# ═══════════════════════════════════════════════
Y = 3530
def flow11_extras(prefix, y_base):
    els = []
    ey = y_base + 200
    els.append(make_text(f"{prefix}_reports", 50, ey, "Standard Reports", font_size=16, color=C["subtitle"], w=250, h=22))
    ey += 25
    els.append(make_rect(f"{prefix}_rpt_bg", 50, ey, 500, 55, C["evidence_bg"], C["process_stroke"],
                         [(f"{prefix}_rpt_t", "text")]))
    els.append(make_text(f"{prefix}_rpt_t", 60, ey+5,
        "Position Overview | Birthday List | Employee Register | Employment Changes\n"
        "Headcount & FTEs | New Hires | Terminated | Turnover | Workflow Logs",
        font_size=10, color=C["evidence_text"], w=480, h=45, container_id=f"{prefix}_rpt_bg", v_align="middle"))
    return els

elements.extend(add_flow_section("f11", Y,
    "11 — EC Report",
    "Actor: HR / Manager  |  Path: Home → Reporting → Report Centre  |  Workflow: No",
    [
        ("Search\nReport", ["Search by keyword"]),
        ("Runtime\nFilters", ["BU, Company,", "Cost Center, etc."]),
        ("Export /\nSchedule", ["Excel/PDF/Word/PPT", "Schedule for large"]),
    ],
    flow11_extras
))
elements.append(make_line("sep_11", 50, Y+290, [[0,0],[1350,0]], C["detail"], width=1, dashed=True))

# ═══════════════════════════════════════════════════════════════════
#   OUTSTANDING — BRD Requirements ที่ไม่มีใน TTT Manual (41 Gap items)
# ═══════════════════════════════════════════════════════════════════

Y = 3860
elements.append(make_text("outstanding_header", 50, Y,
    "Outstanding — BRD Requirements ไม่มีใน TTT Manual", font_size=28, color="#b91c1c", w=900, h=35))
elements.append(make_text("outstanding_sub", 50, Y+40,
    "41 Gap items (20% of 207 BRDs) + New features beyond TTT  |  ต้อง design flow ใหม่สำหรับ new system  |  ⚠ ไม่มี as-is reference",
    font_size=13, color=C["detail"], w=1100, h=18))
elements.append(make_line("sep_outstanding_top", 50, Y+65, [[0,0],[1350,0]], "#b91c1c", width=2))

# ─── Section A: Foundation Config ───
Y = 3940
elements.append(make_text("oa_title", 50, Y, "A — Foundation Configuration", font_size=22, color=C["title"], w=500, h=28))
elements.append(make_text("oa_sub", 50, Y+32,
    "BRDs #1, 6, 7, 188  |  System admin tasks — no TTT coverage  |  ต้อง setup ก่อน go-live",
    font_size=12, color=C["detail"], w=800, h=16))
Y_items = Y + 60
items_a = [
    ("#1 — Org Foundation", "Org structure, Job\nClassification, Pay\nGrade, Business Unit", C["process_fill"]),
    ("#6 — Payment\nFoundation", "Pay Component, Pay\nFrequency, Currency,\nBank setup", C["process2_fill"]),
    ("#7 — EC Picklist", "Dropdown values:\nNationality, Religion,\nMarital Status, etc.", C["process_fill"]),
    ("#188 — Revised\nFoundation", "Foundation object\nversion control &\nchange tracking", C["process2_fill"]),
]
for i, (label, detail, fill) in enumerate(items_a):
    sx = 50 + i * 250
    rid = f"oa_item{i}"
    elements.append(make_rect(rid, sx, Y_items, 220, 70, fill, C["process_stroke"], [(f"{rid}_t", "text")]))
    elements.append(make_text(f"{rid}_t", sx+10, Y_items+5, label, font_size=12,
                              color=C["on_dark"], align="center", w=200, h=60, container_id=rid, v_align="middle"))
    elements.append(make_text(f"{rid}_d", sx, Y_items+78, detail, font_size=10, color=C["detail"], w=220, h=45))

elements.append(make_line("sep_oa", 50, Y+200, [[0,0],[1350,0]], C["detail"], width=1, dashed=True))

# ─── Section B: Integration & Security ───
Y = 4170
elements.append(make_text("ob_title", 50, Y, "B — Integration & Security", font_size=22, color=C["title"], w=500, h=28))
elements.append(make_text("ob_sub", 50, Y+32,
    "BRDs #191, 193-195, 197, 199, 203-205  |  External systems, data protection, UX  |  New system design required",
    font_size=12, color=C["detail"], w=900, h=16))
Y_items = Y + 60
items_b = [
    ("#191 — API / IC", "Integration Center\nData exchange with\nexternal systems"),
    ("#194 — MS Teams\nViva Connections", "Employee experience\nplatform integration"),
    ("#195 — Switch\nLanguage", "Multi-language UI\nTH / EN switching"),
    ("#197 — E-Document", "Digital document\nmanagement &\nstorage"),
    ("#199 — Consent\nForm", "PDPA compliance\ndata consent\ncollection"),
]
for i, (label, detail) in enumerate(items_b):
    sx = 50 + i * 230
    rid = f"ob_item{i}"
    fill = C["ai_fill"] if i < 2 else C["process_fill"]
    stroke = C["ai_stroke"] if i < 2 else C["process_stroke"]
    tcolor = C["ai_stroke"] if i < 2 else C["on_dark"]
    elements.append(make_rect(rid, sx, Y_items, 200, 60, fill, stroke, [(f"{rid}_t", "text")]))
    elements.append(make_text(f"{rid}_t", sx+10, Y_items+5, label, font_size=11,
                              color=tcolor, align="center", w=180, h=50, container_id=rid, v_align="middle"))
    elements.append(make_text(f"{rid}_d", sx, Y_items+68, detail, font_size=10, color=C["detail"], w=200, h=45))

# Security row
Y_sec = Y_items + 130
sec_items = [
    ("#203 — Data\nEncryption", "Sensitive field\nencryption at rest"),
    ("#204 — Security\nFeature", "Auth, session mgmt,\nbrute force protection"),
    ("#205 — UX/UI", "Responsive design,\naccessibility, i18n"),
    ("#193 — Survey\nForm", "Employee survey\ncreation & collection"),
]
for i, (label, detail) in enumerate(sec_items):
    sx = 50 + i * 230
    rid = f"ob_sec{i}"
    elements.append(make_rect(rid, sx, Y_sec, 200, 55, C["warn_fill"], C["warn_stroke"], [(f"{rid}_t", "text")]))
    elements.append(make_text(f"{rid}_t", sx+10, Y_sec+5, label, font_size=11,
                              color=C["warn_stroke"], align="center", w=180, h=45, container_id=rid, v_align="middle"))
    elements.append(make_text(f"{rid}_d", sx, Y_sec+63, detail, font_size=10, color=C["detail"], w=200, h=35))

elements.append(make_line("sep_ob", 50, Y+310, [[0,0],[1350,0]], C["detail"], width=1, dashed=True))

# ─── Section C: Self-Service UI ───
Y = 4510
elements.append(make_text("oc_title", 50, Y, "C — Self-Service & UI Configuration", font_size=22, color=C["title"], w=600, h=28))
elements.append(make_text("oc_sub", 50, Y+32,
    "BRDs #169, 171, 173-183  |  ESS/MSS features + admin field config  |  11 Gap items — largest outstanding group",
    font_size=12, color=C["detail"], w=900, h=16))
Y_items = Y + 60

# ESS row
ess_items = [
    ("#169 — Org Chart", "View Organization\nChart (interactive)"),
    ("#171 — Quick\nActions Tile", "Home page tiles\nfor common tasks"),
    ("#173 — Document\nAccess", "Employee document\nrepository"),
    ("#174 — View Team\nInfo", "Manager → view\nteam details"),
    ("#175 — Team\nOrg Chart", "Manager → team\nhierarchy view"),
]
for i, (label, detail) in enumerate(ess_items):
    sx = 50 + i * 220
    rid = f"oc_ess{i}"
    elements.append(make_rect(rid, sx, Y_items, 195, 55, C["end_fill"], C["end_stroke"], [(f"{rid}_t", "text")]))
    elements.append(make_text(f"{rid}_t", sx+10, Y_items+5, label, font_size=11,
                              color=C["end_stroke"], align="center", w=175, h=45, container_id=rid, v_align="middle"))
    elements.append(make_text(f"{rid}_d", sx, Y_items+63, detail, font_size=10, color=C["detail"], w=195, h=30))

# Admin config row
Y_admin = Y_items + 110
admin_items = [
    ("#177 — Position &\nVacancy Overview", "Position budget\n& vacancy tracking"),
    ("#178 — Field\nConfiguration", "Admin: configure\nfield display rules"),
    ("#179 — Field\nVisibility", "Show/hide fields\nper role/context"),
    ("#180 — Field\nMandatory Rule", "Required field\nrules per event"),
    ("#181 — Field\nRead-Only", "Lock fields per\nrole/status"),
]
for i, (label, detail) in enumerate(admin_items):
    sx = 50 + i * 220
    rid = f"oc_admin{i}"
    elements.append(make_rect(rid, sx, Y_admin, 195, 55, C["decision_fill"], C["decision_stroke"], [(f"{rid}_t", "text")]))
    elements.append(make_text(f"{rid}_t", sx+10, Y_admin+5, label, font_size=11,
                              color=C["decision_stroke"], align="center", w=175, h=45, container_id=rid, v_align="middle"))
    elements.append(make_text(f"{rid}_d", sx, Y_admin+63, detail, font_size=10, color=C["detail"], w=195, h=30))

# Tile config
Y_tile = Y_admin + 110
tile_items = [
    ("#182 — Manage\nQuick Actions", "Configure quick\naction buttons"),
    ("#183 — Manage\nTile & Home Page", "Home page layout\nconfiguration"),
]
for i, (label, detail) in enumerate(tile_items):
    sx = 50 + i * 220
    rid = f"oc_tile{i}"
    elements.append(make_rect(rid, sx, Y_tile, 195, 55, C["decision_fill"], C["decision_stroke"], [(f"{rid}_t", "text")]))
    elements.append(make_text(f"{rid}_t", sx+10, Y_tile+5, label, font_size=11,
                              color=C["decision_stroke"], align="center", w=175, h=45, container_id=rid, v_align="middle"))
    elements.append(make_text(f"{rid}_d", sx, Y_tile+63, detail, font_size=10, color=C["detail"], w=195, h=30))

elements.append(make_line("sep_oc", 50, Y+350, [[0,0],[1350,0]], C["detail"], width=1, dashed=True))

# ─── Section D: RBAC & Permissions ───
Y = 4890
elements.append(make_text("od_title", 50, Y, "D — RBAC & Permissions", font_size=22, color=C["title"], w=500, h=28))
elements.append(make_text("od_sub", 50, Y+32,
    "BRDs #184-187, 189, 198, 200-202  |  Security model — maps to Keycloak in new system",
    font_size=12, color=C["detail"], w=800, h=16))
Y_items = Y + 60
rbac_items = [
    ("#184 — Data\nPermission Group", "Row-level security\nField-level access\nper role"),
    ("#185 — Application\nRole Group", "Feature access\ncontrol (menus,\nbuttons, pages)"),
    ("#186 — User\nAssignment", "Assign users to\nroles & permission\ngroups"),
    ("#187 — Proxy", "Delegation: act\non behalf of\nanother user"),
]
for i, (label, detail) in enumerate(rbac_items):
    sx = 50 + i * 250
    rid = f"od_item{i}"
    elements.append(make_rect(rid, sx, Y_items, 220, 65, C["warn_fill"], C["warn_stroke"], [(f"{rid}_t", "text")]))
    elements.append(make_text(f"{rid}_t", sx+10, Y_items+5, label, font_size=12,
                              color=C["warn_stroke"], align="center", w=200, h=55, container_id=rid, v_align="middle"))
    elements.append(make_text(f"{rid}_d", sx, Y_items+73, detail, font_size=10, color=C["detail"], w=220, h=45))

# Second row
Y_r2 = Y_items + 130
r2_items = [
    ("#189 — Audit\nReport", "Who did what when\nChange log tracking"),
    ("#198 — Data\nMigration", "SAP → new system\ndata migration tools"),
    ("#200 — Traffic\nReport", "System usage &\nlogin analytics"),
    ("#201 — Hidden\nProfile", "Sensitive employee\nprofile masking"),
    ("#202 — Direct\nUser", "Non-employee system\naccess (external)"),
]
for i, (label, detail) in enumerate(r2_items):
    sx = 50 + i * 220
    rid = f"od_r2_{i}"
    fill = C["inactive_fill"]
    stroke = C["inactive_stroke"]
    elements.append(make_rect(rid, sx, Y_r2, 195, 55, fill, stroke, [(f"{rid}_t", "text")]))
    elements.append(make_text(f"{rid}_t", sx+10, Y_r2+5, label, font_size=11,
                              color=stroke, align="center", w=175, h=45, container_id=rid, v_align="middle"))
    elements.append(make_text(f"{rid}_d", sx, Y_r2+63, detail, font_size=10, color=C["detail"], w=195, h=30))

elements.append(make_line("sep_od", 50, Y+280, [[0,0],[1350,0]], C["detail"], width=1, dashed=True))

# ─── Section E: New BRD Features (beyond TTT) ───
Y = 5200
elements.append(make_text("oe_title", 50, Y, "E — New Features (BRD adds beyond TTT)", font_size=22, color=C["title"], w=600, h=28))
elements.append(make_text("oe_sub", 50, Y+32,
    "Features ที่ BRD กำหนดแต่ TTT ไม่มี — ต้อง design + build ใหม่ทั้งหมด  |  High impact on new system architecture",
    font_size=12, color=C["detail"], w=900, h=16))
Y_items = Y + 60
new_items = [
    ("#98/116 — Revert\nTermination", "Undo termination\nRestore employee\nrecord + history", C["warn_fill"], C["warn_stroke"]),
    ("#117 — Auto Pass\nProbation", "Auto-pass at 119 days\nMail alerts: Day\n30, 75, 90", C["end_fill"], C["end_stroke"]),
    ("#115 — Auto\nTerminate Contract", "Auto-terminate when\ncontract end date\nreached", C["decision_fill"], C["decision_stroke"]),
    ("#105-108 — EC\nDocuments", "Merit letters,\nattachments, preview,\ndownload", C["process_fill"], C["process_stroke"]),
]
for i, (label, detail, fill, stroke) in enumerate(new_items):
    sx = 50 + i * 260
    rid = f"oe_item{i}"
    elements.append(make_rect(rid, sx, Y_items, 230, 70, fill, stroke, [(f"{rid}_t", "text")]))
    elements.append(make_text(f"{rid}_t", sx+10, Y_items+5, label, font_size=12,
                              color=stroke, align="center", w=210, h=60, container_id=rid, v_align="middle"))
    elements.append(make_text(f"{rid}_d", sx, Y_items+78, detail, font_size=10, color=C["detail"], w=230, h=45))

# Org features
Y_org = Y_items + 140
org_items = [
    ("#4 — Org\nVisualization", "Interactive org chart\nviewer (tree/matrix)", C["ai_fill"], C["ai_stroke"]),
    ("#5 — Org Unit\nManagement", "Create/edit/archive\norg units + hierarchy", C["ai_fill"], C["ai_stroke"]),
    ("#111 — Multi-step\nTerminate Workflow", "Extended approval\nchain (beyond\nDismissal only)", C["warn_fill"], C["warn_stroke"]),
    ("#99-100 — Mass\nOperations", "Mass Import/Delete\nMass Change\nEmp Job", C["process_fill"], C["process_stroke"]),
]
for i, (label, detail, fill, stroke) in enumerate(org_items):
    sx = 50 + i * 260
    rid = f"oe_org{i}"
    elements.append(make_rect(rid, sx, Y_items+140, 230, 70, fill, stroke, [(f"{rid}_t", "text")]))
    elements.append(make_text(f"{rid}_t", sx+10, Y_items+145, label, font_size=12,
                              color=stroke, align="center", w=210, h=60, container_id=rid, v_align="middle"))
    elements.append(make_text(f"{rid}_d", sx, Y_items+218, detail, font_size=10, color=C["detail"], w=230, h=45))

# Seniority outstanding note
Y_sen = Y_items + 290
elements.append(make_text("oe_sen_title", 50, Y_sen, "Seniority Date Outstanding (cross-cutting)", font_size=16, color="#b91c1c", w=500, h=22))
elements.append(make_rect("oe_sen_bg", 50, Y_sen+25, 900, 80, C["evidence_bg"], "#b91c1c",
                           [("oe_sen_t", "text")]))
elements.append(make_text("oe_sen_t", 60, Y_sen+30,
    "TTT covers 1 scenario only (Rehire reset). BRD adds 10 scenarios across 6 workflows:\n"
    "#86 CRC/CPN counting rules + NON-CNEXT Dummy Assignment  |  #87 Branch size rules (CPN)\n"
    "#88 Year In Position event-based reset  |  #94 Override fields (6 custom dates)  |  #102 Re-Hire override\n"
    "#103 Promotion/PT→FT always continuous  |  #110 Transfer retain code + continuous  |  #117 Auto-pass 119d",
    font_size=10, color=C["evidence_text"], w=880, h=70, container_id="oe_sen_bg", v_align="middle"))

# ═══════════════════════════════════════════════
# OUTPUT
# ═══════════════════════════════════════════════
doc = {
    "type": "excalidraw",
    "version": 2,
    "source": "https://excalidraw.com",
    "elements": elements,
    "appState": {"viewBackgroundColor": "#ffffff", "gridSize": 20},
    "files": {},
}

out_path = "/Users/tachongrak/stark/projects/hr-platform-replacement/diagrams/all-flows-ec.excalidraw"
with open(out_path, "w") as f:
    json.dump(doc, f, indent=2, ensure_ascii=False)
print(f"Generated {len(elements)} elements → {out_path}")
