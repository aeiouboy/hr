#!/usr/bin/env python3
"""
Regenerate flow-09-ec-employee-lifecycle.drawio — Stage C clean rebuild.
Source of truth: BRD-EC-summary.md (flow-09 = BRDs #109-117, 9 reqs)
Screen catalog: docs/screen-catalog.json (flow-09 = P5 Pass Probation)
Note: #116 (Revert Terminate Flow) belongs to flow-09 per BRD-EC-summary.md line 327 — KEPT.
"""

import xml.etree.ElementTree as ET

FUNC_BLOCKS = [
    {
        "id": "func-1-hire-transfer",
        "title": "Hire &amp; Transfer",
        "brds": [109, 110],
        "brd_lines": [
            "#109 — Hiring Flow: SPD/Recruiter เข้า Hire Form → initiate hiring (manual key-in or Recruitment system integration); auto HRBP assignment; notify Manager/Payroll/HRBP on hire completion",
            "#110 — Transfer Flow: SPD เข้า Transfer Request → process cross-company/BG transfer; retain employee code; auto-migrate income/deductions; continuous seniority counting",
        ],
        "scope_in": "Hire Form (manual entry + Recruitment integration), HRBP auto-assignment, hire mail notification; Transfer across company/BG, employee code retention, income/deduction migration, seniority continuity",
        "scope_out": "Position management (→ flow-11); Org structure changes (→ flow-11); Promotion workflow (covered in flow-08 BRD #103); Payroll calculation engine (out of EC scope)",
        "screens": "No screen-catalog entry for this function (lifecycle forms cross-ref flow-07/09 screens)",
        "crossref": "flow-07 (screen P1 Hire Form, screen P2 Transfer Request), flow-08 (#103 Promotion), SH4 Notification",
    },
    {
        "id": "func-2-termination",
        "title": "Termination Workflow",
        "brds": [111, 112, 113, 114, 115],
        "brd_lines": [
            "#111 — Terminate Request Workflow: Employee/Manager/HRBP เข้า Termination Form → submit via approval chain (Employee→Manager→HRBP→SPD); skip-step allowed; pending mail reminder; auto Payroll Active Date; log kept",
            "#112 — Termination Documents: Employee/HRBP เข้า Termination Flow → generate 50ทวิ + salary certificate for terminated employee; deliver to personal email; re-runnable by Employee or HRBP",
            "#113 — Terminate Reason Role Visibility: System เข้า Termination Form → display Terminate Reason field with role-based visibility (Employee / Manager / HRBP / SPD each see different scope)",
            "#114 — OK to Rehire Flag: HR/SPD เข้า Termination Form → review and set OK_to_Rehire checkbox (auto-defaulted based on Terminate Reason)",
            "#115 — Auto-Terminate Contract Employee: System → notify Direct Report Manager and HRBP 30 days before contract end; auto-terminate with End of Contract reason if no extension action taken",
        ],
        "scope_in": "Terminate Request multi-step approval chain, skip-step workflow, payroll active date auto-record, termination documents (50ทวิ + salary cert), role-based terminate reason visibility, OK_to_Rehire flag, auto-terminate for contract employees",
        "scope_out": "Revert termination (→ func-3); Employment Info data fields (→ flow-08 BRD #98); Offboarding IT/access revocation (out of EC scope)",
        "screens": "No screen-catalog entry (cross-ref: flow-07 screen P3 Termination Form)",
        "crossref": "flow-07 (screen P3 Termination Form), flow-08 (#98 Revert Termination data), SH4 Notification",
    },
    {
        "id": "func-3-revert-terminate",
        "title": "Revert Termination",
        "brds": [116],
        "brd_lines": [
            "#116 — Revert Terminate Flow: SPD เข้า Revert Termination (flow-07 screen P4) → revert completed termination (Workflow Status: Completed only); system auto-updates Payroll Active Date",
        ],
        "scope_in": "Revert completed termination workflow, auto Payroll Active Date update on revert",
        "scope_out": "Revert of pending/in-progress terminations (not supported); Employment Info revert (→ flow-08 #98)",
        "screens": "No screen-catalog entry (cross-ref: flow-07 screen P4 Revert Termination)",
        "crossref": "flow-07 (screen P4 Revert Termination), flow-08 (#98 Revert Termination data fields)",
    },
    {
        "id": "func-4-pass-probation",
        "title": "Pass Probation",
        "brds": [117],
        "brd_lines": [
            "#117 — Pass Probation: Direct Manager เข้า Pass Probation (screen P5) → decide Pass/No Pass/Extend for probationary employee; auto-pass at Day 119 if no action; mail reminders at Day 30, 75, 90 to Direct Manager + HRBP",
        ],
        "scope_in": "Pass Probation decision (Pass/No Pass/Extend), auto-pass at Day 119, reminder notifications at Day 30/75/90",
        "scope_out": "Allowance changes on probation pass (→ Payroll, from Recruitment); Competency/LMS sync (→ flow-08 #93 Job Foundation)",
        "screens": "P5 — Pass Probation (screen-catalog.json flow-09)",
        "crossref": "flow-07 (screen P5 Pass Probation), flow-04 (self-service view), SH4 Notification, CRC/CU/CPN mail notify pattern",
    },
]

ALL_BRDS = [109, 110, 111, 112, 113, 114, 115, 116, 117]

COVERAGE = [
    ("✅", "#109–110", "Hire &amp; Transfer", "func-1"),
    ("✅", "#111–115", "Termination Workflow", "func-2"),
    ("✅", "#116", "Revert Termination", "func-3"),
    ("✅", "#117", "Pass Probation", "func-4"),
]

STYLE_TITLE = ("text;html=1;align=center;verticalAlign=middle;fontSize=14;"
               "strokeColor=none;fillColor=none;")
STYLE_SCOPE = ("text;html=1;align=center;verticalAlign=middle;fontSize=10;"
               "strokeColor=none;fillColor=none;")
STYLE_SECTION_HDR = ("text;html=1;align=left;verticalAlign=middle;fontSize=13;"
                     "fillColor=#E8F4FD;strokeColor=#0D4A6B;spacingLeft=12;")
STYLE_FUNC_BLOCK = ("rounded=1;whiteSpace=wrap;html=1;align=left;"
                    "verticalAlign=top;fontSize=10;fillColor=#F8FBFE;"
                    "strokeColor=#0D4A6B;spacingLeft=8;spacingTop=6;")
STYLE_SCREENS_HDR = ("text;html=1;align=left;verticalAlign=middle;fontSize=13;"
                     "fillColor=#E8F4FD;strokeColor=#0066CC;spacingLeft=12;")
STYLE_SCREEN_CARD = ("rounded=1;whiteSpace=wrap;html=1;align=left;"
                     "verticalAlign=top;fontSize=10;fillColor=#EBF5FB;"
                     "strokeColor=#0066CC;spacingLeft=8;spacingTop=6;")
STYLE_FOOTER = ("text;html=1;align=left;verticalAlign=top;fontSize=10;"
                "fillColor=#F0F8E8;strokeColor=#5B8A3C;spacingLeft=8;spacingTop=6;")


def cell(root, cid, val, style, x, y, w, h, parent="1"):
    c = ET.SubElement(root, "mxCell")
    c.set("id", cid)
    c.set("value", val)
    c.set("style", style)
    c.set("vertex", "1")
    c.set("parent", parent)
    geo = ET.SubElement(c, "mxGeometry")
    geo.set("x", str(x))
    geo.set("y", str(y))
    geo.set("width", str(w))
    geo.set("height", str(h))
    geo.set("as", "geometry")
    return c


def build_func_html(f):
    lines = []
    lines.append(f"<b style='font-size:12px;color:#0D4A6B'>{f['title']}</b>")
    lines.append(f"<span style='color:#444;font-size:9px'>BRDs: {', '.join('#' + str(b) for b in f['brds'])}</span>")
    lines.append("<br><b>BRD Verbatim Spec (BRD-EC-summary.md Rule 69):</b>")
    for bl in f["brd_lines"]:
        lines.append(f"• {bl}")
    lines.append(f"<br><b>IN scope:</b> {f['scope_in']}")
    lines.append(f"<b>OUT scope:</b> {f['scope_out']}")
    lines.append(f"<b>UI Screens:</b> {f['screens']}")
    lines.append(f"<b>Cross-ref:</b> {f['crossref']}")
    return "<br>".join(lines)


def build_xml():
    mxfile = ET.Element("mxfile")
    mxfile.set("host", "claude-rebuild")
    mxfile.set("modified", "2026-04-07")
    mxfile.set("agent", "claude")
    mxfile.set("version", "22.0.0")

    diagram = ET.SubElement(mxfile, "diagram")
    diagram.set("id", "flow-09")
    diagram.set("name", "EC Employee Lifecycle")

    model = ET.SubElement(diagram, "mxGraphModel")
    for k, v in [("dx", "1422"), ("dy", "800"), ("grid", "1"), ("gridSize", "10"),
                 ("guides", "1"), ("tooltips", "1"), ("connect", "1"), ("arrows", "1"),
                 ("fold", "1"), ("page", "1"), ("pageScale", "1"),
                 ("pageWidth", "1700"), ("pageHeight", "2600"),
                 ("math", "0"), ("shadow", "0")]:
        model.set(k, v)

    root = ET.SubElement(model, "root")
    ET.SubElement(root, "mxCell", {"id": "0"})
    ET.SubElement(root, "mxCell", {"id": "1", "parent": "0"})

    y = 20

    title_val = ("<b style='font-size:18px;color:#0D4A6B'>flow-09 — EC Employee Lifecycle</b>"
                 "<br><span style='font-size:11px;color:#666'>วงจรพนักงาน: Hire, Transfer, Terminate, Revert, Pass Probation</span>")
    cell(root, "header-title", title_val, STYLE_TITLE, 30, y, 1620, 60)
    y += 65

    scope_val = ("<span style='font-size:10px;color:#444'>"
                 "Scope: Employee lifecycle transaction flows — hiring, transfer, termination (with approval chain), revert termination, pass probation. "
                 "Source: <b>BRD-EC-summary.md</b> § Employee Lifecycle Management (BRDs #109–117) · 9 BRDs · 1 UI screen"
                 "</span>")
    cell(root, "header-scope", scope_val, STYLE_SCOPE, 30, y, 1620, 30)
    y += 40

    func_hdr_val = "<b style='font-size:13px;color:#0D4A6B'>⚙️ Function Blocks (4 groups, 9 BRDs)</b>"
    cell(root, "sec-func-hdr", func_hdr_val, STYLE_SECTION_HDR, 30, y, 1620, 36)
    y += 46

    for i, f in enumerate(FUNC_BLOCKS, 1):
        html_val = build_func_html(f)
        h = max(220, len(f["brd_lines"]) * 32 + 170)
        cell(root, f["id"], html_val, STYLE_FUNC_BLOCK, 30, y, 1620, h)
        y += h + 14

    y += 10
    screens_hdr = "<b style='font-size:13px;color:#0066CC'>📱 UI Screens (1) — from screen-catalog.json</b>"
    cell(root, "sec-ui-hdr", screens_hdr, STYLE_SCREENS_HDR, 30, y, 1620, 36)
    y += 46

    sv = ("<b style='font-size:11px;color:#0066CC'>P5 — Pass Probation</b>"
          "<br><span style='font-size:9px;color:#555'>Used in: flow-09</span>"
          "<br><span style='font-size:9px'>BRD #117 | Direct Manager action screen</span>")
    cell(root, "screen-P5", sv, STYLE_SCREEN_CARD, 30, y, 790, 80)
    y += 94

    y += 10
    footer_lines = ["<b style='font-size:12px;color:#3A6A2A'>📋 BRD Coverage — flow-09 (9 BRDs)</b>"]
    for mark, brds, fname, fid in COVERAGE:
        footer_lines.append(f"{mark} {brds} &nbsp; {fname} → {fid}")
    footer_lines.append("<br><span style='font-size:9px;color:#888'>Source: BRD-EC-summary.md lines 316–328 (flow-09 section) · Validated 2026-04-07</span>")
    footer_lines.append("<span style='font-size:9px;color:#888'>Note: #116 (Revert Terminate Flow) belongs to flow-09 per BRD-EC-summary.md line 327 — confirmed kept (NOT flow-08)</span>")
    footer_val = "<br>".join(footer_lines)
    cell(root, "footer-coverage", footer_val, STYLE_FOOTER, 30, y, 1620, 180)

    return mxfile


def main():
    import os, re
    mxfile = build_xml()
    out_path = os.path.join(os.path.dirname(__file__), "..", "diagrams",
                            "flow-09-ec-employee-lifecycle.drawio")
    out_path = os.path.normpath(out_path)

    tree = ET.ElementTree(mxfile)
    ET.indent(tree, space="  ")
    tree.write(out_path, encoding="unicode", xml_declaration=False)

    ET.parse(out_path)
    print(f"✅ Written and validated: {out_path}")

    with open(out_path) as f:
        lines = f.readlines()
    print(f"   Lines: {len(lines)}")

    content = open(out_path).read()
    for n in ALL_BRDS:
        if f"#{n}" not in content:
            print(f"   ⚠️  BRD #{n} not found in output")

    bad = [85, 95, 98, 129, 130, 145, 172, 6, 82]
    for n in bad:
        if re.search(rf'\b#{n}\b', content):
            print(f"   ⚠️  Contaminating BRD #{n} still present!")

    print("   #116 note: Revert Terminate Flow — flow-09 per source (NOT misplaced)")


if __name__ == "__main__":
    main()
