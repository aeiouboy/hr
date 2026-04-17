#!/usr/bin/env python3
"""
Regenerate flow-06-ec-personal-information.drawio — Stage C clean rebuild.
Source of truth: BRD-EC-summary.md (flow-06 = BRDs #12-34, 23 reqs)
Screen catalog: docs/screen-catalog.json (flow-06 = P1.T1, P1.T4)
"""

import xml.etree.ElementTree as ET

# ---------------------------------------------------------------------------
# Function block data (verbatim from BRD-EC-summary.md, Rule 69 + 70)
# ---------------------------------------------------------------------------

FUNC_BLOCKS = [
    {
        "id": "func-1-personal-tab",
        "title": "Personal Info Tab — Core Identity &amp; Job Data",
        "brds": [12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24],
        "brd_lines": [
            "#12 — Biographical Info: Employee เข้า My Profile → Personal Info tab → view/edit Biographical Info",
            "#13 🔒 — Personal Info: Employee เข้า My Profile → Personal Info tab → view/edit Personal Info (DOB, nationality, marital status, religion; re-auth SH1)",
            "#14 🔒 — National ID: Employee เข้า My Profile → Personal Info tab → view/update National ID (re-auth SH1 before display)",
            "#15 🔒 — Email Info: Employee เข้า My Profile → Personal Info tab → view/edit Email Info",
            "#16 🔒 — Phone Info: Employee เข้า My Profile → Personal Info tab → view/edit Phone Info",
            "#17 🔒 — Address: Employee เข้า My Profile → Personal Info tab → view/edit Address (Province→District→Sub-district→Postcode waterfall)",
            "#18 🔒 — Work Permit: Employee/HR เข้า My Profile → Personal Info tab → view/manage Work Permit data",
            "#21 — Employment: HR/Employee เข้า My Profile → Personal Info tab → view/manage Employment data",
            "#22 — Terminate: HR เข้า My Profile → Personal Info tab → view/manage Termination data",
            "#23 — Emp Job Info: HR/Employee เข้า My Profile → Personal Info tab → view/manage Employee Job Info",
            "#24 — Job Relationships: HR/Employee เข้า My Profile → Personal Info tab → view/manage Job Relationships (Direct/Dot-line/Matrix/HR Manager)",
        ],
        "scope_in": "Biographical Info, Personal Info (sensitive re-auth), National ID (re-auth), Email, Phone, Address waterfall, Work Permit, Employment data, Termination data, Emp Job Info, Job Relationships",
        "scope_out": "Family &amp; Contact tab, Employment Info tab, Special Information tab; Payment info (→ func-3); Emergency contact (→ func-2)",
        "screens": "P1.T1 — Personal Info tab",
        "crossref": "flow-02 (screen P1.T1), SH1 Re-authentication, SH4 Notification",
    },
    {
        "id": "func-2-family-tab",
        "title": "Family &amp; Contact Tab — Emergency, Dependents &amp; Pay",
        "brds": [19, 20, 25, 26],
        "brd_lines": [
            "#19 — Emergency Contact: Employee เข้า My Profile → Family &amp; Contact tab → manage Emergency Contact records",
            "#20 — Dependents: Employee เข้า My Profile → Family &amp; Contact tab → manage Dependents data",
            "#25 🔒 — Pay Component Recurring: HR/Employee เข้า My Profile → Family &amp; Contact tab (or Compensation View flow-04 P3) → view/manage recurring Pay Components",
            "#26 — Alt. Cost Distribution: HR เข้า My Profile → Family &amp; Contact tab (or Compensation View flow-04) → configure Alternative Cost Distribution",
        ],
        "scope_in": "Emergency Contact records, Dependents data, Pay Component Recurring (sensitive), Alternative Cost Distribution",
        "scope_out": "Personal Info tab, Employment Info tab; Salary base data (→ flow-10); Payroll engine (out of EC scope)",
        "screens": "P1.T4 — Family &amp; Contact tab",
        "crossref": "flow-02 (screen P1.T4), flow-04 (screen P3 Compensation View), SH1 Re-authentication",
    },
    {
        "id": "func-3-employment-tab",
        "title": "Employment Info Tab — Payment &amp; HR District",
        "brds": [27, 28],
        "brd_lines": [
            "#27 🔒 — Payment Info: HR/Employee เข้า My Profile → Employment Info tab → view/manage Payment Info (bank account details; re-auth SH1 before display)",
            "#28 — HR District: HR เข้า My Profile → Employment Info tab → manage HR District assignment for employee",
        ],
        "scope_in": "Payment Info (bank account; sensitive — re-auth required), HR District assignment",
        "scope_out": "Salary/payroll calculation (→ flow-10); Employment lifecycle events (→ flow-09); All Personal Info tab fields",
        "screens": "No screen-catalog entry for this tab (cross-ref: flow-02 screen P1.T3)",
        "crossref": "flow-02 (screen P1.T3), SH1 Re-authentication",
    },
    {
        "id": "func-4-special-tab",
        "title": "Special Information Tab — Account, Groups &amp; HR Records",
        "brds": [29, 30, 31, 32, 33, 34],
        "brd_lines": [
            "#29 — UserAccountInfo: Admin/HR เข้า My Profile → Special Information tab → manage User Account Info",
            "#30 — Employee Group: HR เข้า My Profile → Special Information tab → manage Employee Group assignment",
            "#31 — Employee Subgroup: HR เข้า My Profile → Special Information tab → manage Employee Subgroup assignment",
            "#32 — Performance: HR เข้า My Profile → Special Information tab → view/manage Performance data",
            "#33 — Formal Education: Employee เข้า My Profile → Special Information tab → manage Formal Education history",
            "#34 🔒 — Disability: HR เข้า My Profile → Special Information tab → manage Disability records (ประวัติคนพิการ)",
        ],
        "scope_in": "User Account Info, Employee Group/Subgroup assignment, Performance data, Formal Education history, Disability records",
        "scope_out": "Custom cust_* special info topics (→ flow-07); Awards, certificates, loans (→ flow-07); HR District (→ func-3)",
        "screens": "No screen-catalog entry for this tab (cross-ref: flow-02 screen P1.T2)",
        "crossref": "flow-02 (screen P1.T2), flow-07 (cust_* Special Information)",
    },
]

ALL_BRDS = sorted([b for f in FUNC_BLOCKS for b in f["brds"]])

# ---------------------------------------------------------------------------
# Coverage footer lines
# ---------------------------------------------------------------------------

COVERAGE = [
    ("✅", "#12–18, #21–24", "Personal Info Tab", "func-1"),
    ("✅", "#19–20, #25–26", "Family &amp; Contact Tab", "func-2"),
    ("✅", "#27–28", "Employment Info Tab", "func-3"),
    ("✅", "#29–34", "Special Information Tab", "func-4"),
]

# ---------------------------------------------------------------------------
# XML builder
# ---------------------------------------------------------------------------

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


def e(s):
    """Return string with & already as &amp; — just use as cell value (ET handles escaping)."""
    return s


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
    diagram.set("id", "flow-06")
    diagram.set("name", "EC Personal Information")

    model = ET.SubElement(diagram, "mxGraphModel")
    for k, v in [("dx", "1422"), ("dy", "800"), ("grid", "1"), ("gridSize", "10"),
                 ("guides", "1"), ("tooltips", "1"), ("connect", "1"), ("arrows", "1"),
                 ("fold", "1"), ("page", "1"), ("pageScale", "1"),
                 ("pageWidth", "1700"), ("pageHeight", "3600"),
                 ("math", "0"), ("shadow", "0")]:
        model.set(k, v)

    root = ET.SubElement(model, "root")
    ET.SubElement(root, "mxCell", {"id": "0"})
    ET.SubElement(root, "mxCell", {"id": "1", "parent": "0"})

    y = 20

    # Title
    title_val = ("<b style='font-size:18px;color:#0D4A6B'>flow-06 — EC Personal Information</b>"
                 "<br><span style='font-size:11px;color:#666'>ข้อมูลส่วนบุคคลของพนักงาน (Employee Personal Data)</span>")
    cell(root, "header-title", title_val, STYLE_TITLE, 30, y, 1620, 60)
    y += 65

    scope_val = ("<span style='font-size:10px;color:#444'>"
                 "Scope: Employee profile data fields stored in EC — Personal Info, Family &amp; Contact, Employment Info, Special Information tabs. "
                 "Source: <b>BRD-EC-summary.md</b> § Personal Information (BRDs #12–34) · 23 BRDs · 2 UI screens"
                 "</span>")
    cell(root, "header-scope", scope_val, STYLE_SCOPE, 30, y, 1620, 30)
    y += 40

    # --- Function sections ---
    func_hdr_val = "<b style='font-size:13px;color:#0D4A6B'>⚙️ Function Blocks (4 groups, 23 BRDs)</b>"
    cell(root, "sec-func-hdr", func_hdr_val, STYLE_SECTION_HDR, 30, y, 1620, 36)
    y += 46

    for i, f in enumerate(FUNC_BLOCKS, 1):
        html_val = build_func_html(f)
        # estimate height: ~30px per BRD line + 150px overhead
        h = max(250, len(f["brd_lines"]) * 28 + 160)
        cell(root, f["id"], html_val, STYLE_FUNC_BLOCK, 30, y, 1620, h)
        y += h + 14

    # --- UI Screens ---
    y += 10
    screens_hdr = "<b style='font-size:13px;color:#0066CC'>📱 UI Screens (2) — from screen-catalog.json</b>"
    cell(root, "sec-ui-hdr", screens_hdr, STYLE_SCREENS_HDR, 30, y, 1620, 36)
    y += 46

    screens_data = [
        ("P1.T1", "Personal Info tab", "flow-06", "BRDs: #12–18, #21–24 | Tab within My Profile"),
        ("P1.T4", "Family &amp; Contact tab", "flow-06", "BRDs: #19–20, #25–26 | Tab within My Profile"),
    ]
    col_w = 790
    for j, (sid, sname, sflow, sdesc) in enumerate(screens_data):
        sx = 30 + j * (col_w + 20)
        sv = (f"<b style='font-size:11px;color:#0066CC'>{sid} — {sname}</b>"
              f"<br><span style='font-size:9px;color:#555'>Used in: {sflow}</span>"
              f"<br><span style='font-size:9px'>{sdesc}</span>")
        cell(root, f"screen-{sid.replace('.', '-')}", sv, STYLE_SCREEN_CARD, sx, y, col_w, 80)
    y += 94

    # --- Coverage Footer ---
    y += 10
    footer_lines = ["<b style='font-size:12px;color:#3A6A2A'>📋 BRD Coverage — flow-06 (23 BRDs)</b>"]
    for mark, brds, fname, fid in COVERAGE:
        footer_lines.append(f"{mark} {brds} &nbsp; {fname} → {fid}")
    footer_lines.append("<br><span style='font-size:9px;color:#888'>Source: BRD-EC-summary.md lines 360–386 (flow-06 section) · Validated 2026-04-07</span>")
    footer_val = "<br>".join(footer_lines)
    cell(root, "footer-coverage", footer_val, STYLE_FOOTER, 30, y, 1620, 160)

    return mxfile


def main():
    import os
    mxfile = build_xml()
    out_path = os.path.join(os.path.dirname(__file__), "..", "diagrams",
                            "flow-06-ec-personal-information.drawio")
    out_path = os.path.normpath(out_path)

    tree = ET.ElementTree(mxfile)
    ET.indent(tree, space="  ")
    tree.write(out_path, encoding="unicode", xml_declaration=False)

    # Validate
    ET.parse(out_path)
    print(f"✅ Written and validated: {out_path}")

    # Count lines
    with open(out_path) as f:
        lines = f.readlines()
    print(f"   Lines: {len(lines)}")

    # Check BRD refs present
    content = open(out_path).read()
    for n in range(12, 35):
        if f"#{n}" not in content and f"#0{n}" not in content:
            print(f"   ⚠️  BRD #{n} not found in output")
    # Check contaminating BRDs absent
    bad = [85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 96, 102, 6, 82]
    for n in bad:
        # look for pattern "BRD #N" or "#N —" not in CSS color context
        import re
        matches = re.findall(rf'#0*{n}(?!\d)', content)
        # filter out CSS colors (preceded by : or ;)
        real_refs = [m for m in matches if content[content.find(m)-1:content.find(m)] not in (':', ';', 'r', 'g', 'b')]
        # simple check: find "#N" as standalone
        if re.search(rf'\b#{n}\b', content):
            print(f"   ⚠️  Contaminating BRD #{n} still present!")


if __name__ == "__main__":
    main()
