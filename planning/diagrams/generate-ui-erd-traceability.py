"""Generate UI × ERD Traceability diagram — separate file from workflow diagram.
Maps UI fields (TTT Manual) → ERD entities (entity-schemas) per workflow step."""
import json, sys

C = {
    "process_fill": "#3b82f6", "process_stroke": "#1e3a5f",
    "decision_fill": "#fef3c7", "decision_stroke": "#b45309",
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

def trace_section(prefix, y, flow_title, mappings, gaps=None, partials=None):
    els = []
    els.append(txt(f"{prefix}_tt", 50, y, flow_title, fs=18, color=C["title"], w=700, h=22))
    y += 28
    col_widths = [180, 200, 200, 50, 470]
    headers = ["UI Field", "ERD Entity", "ERD Column", "Status", "Notes"]
    row_h = 22
    hx = 50
    for ci, (header, cw) in enumerate(zip(headers, col_widths)):
        els.append(rect(f"{prefix}_th{ci}", hx, y, cw, 24, C["process_fill"], C["process_stroke"]))
        els.append(txt(f"{prefix}_th{ci}_t", hx+4, y+4, header, fs=11, color=C["on_dark"], w=cw-8, h=16))
        hx += cw
    y += 24
    for ri, (ui_field, entity, column, status, note) in enumerate(mappings):
        hx = 50
        fill = "#fee2e2" if status == "✗" else "#fef3c7" if status == "~" else "#ecfdf5" if status == "+" else "#f8fafc"
        border = "#b91c1c" if status == "✗" else "#b45309" if status == "~" else "#047857" if status == "+" else "#94a3b8"
        color = "#b91c1c" if status == "✗" else "#b45309" if status == "~" else "#047857" if status == "+" else "#1e293b"
        for ci, (val, cw) in enumerate(zip([ui_field, entity, column, status, note], col_widths)):
            els.append(rect(f"{prefix}_r{ri}c{ci}", hx, y, cw, row_h, fill, border))
            els.append(txt(f"{prefix}_r{ri}c{ci}_t", hx+4, y+3, val, fs=10, color=color, w=cw-8, h=row_h-6))
            hx += cw
        y += row_h
    if gaps:
        y += 12
        els.append(txt(f"{prefix}_gap_title", 50, y, "✗ GAPS — UI fields ไม่มีใน ERD:", fs=13, color="#b91c1c", w=500, h=18))
        y += 20
        for gi, (field, issue) in enumerate(gaps):
            els.append(txt(f"{prefix}_gap{gi}", 70, y, f"• {field}: {issue}", fs=11, color="#b91c1c", w=1050, h=16))
            y += 18
    if partials:
        y += 8
        els.append(txt(f"{prefix}_part_title", 50, y, "~ PARTIAL — มีอยู่แต่ไม่ตรง:", fs=13, color="#b45309", w=500, h=18))
        y += 20
        for pi, (field, col, issue) in enumerate(partials):
            els.append(txt(f"{prefix}_part{pi}", 70, y, f"• {field} → {col}: {issue}", fs=11, color="#b45309", w=1050, h=16))
            y += 18
    y += 10
    els.append(ln(f"{prefix}_sep", 50, y, [[0,0],[1300,0]], C["detail"], sw=1, dashed=True))
    return els, y + 10

# ═══════════════════════════════════════════════
# TITLE
# ═══════════════════════════════════════════════
Y = 20
elements.append(txt("title", 50, Y, "UI × ERD Traceability — Field Mapping per Workflow", fs=28, color="#b91c1c", w=900, h=35))
elements.append(txt("sub", 50, Y+40,
    "Cross-reference UI fields (TTT Manual) → ERD entities (entity-schemas)  |  ✓=Match  ~=Partial  ✗=Gap  +=ERD-only  |  Gaps = must design before implementation",
    fs=12, color=C["detail"], w=1200, h=16))

# Legend
LY = Y + 65
legend = [
    ("✓ Match — UI field = ERD column", "#f8fafc", "#94a3b8"),
    ("~ Partial — exists but misaligned", "#fef3c7", "#b45309"),
    ("✗ Gap — UI field NOT in ERD", "#fee2e2", "#b91c1c"),
    ("+ ERD-only — not in UI", "#ecfdf5", "#047857"),
]
for i, (label, fill, stroke) in enumerate(legend):
    lx = 50 + i * 300
    elements.append(rect(f"leg_{i}", lx, LY, 14, 14, fill, stroke))
    elements.append(txt(f"leg_{i}_t", lx+20, LY, label, fs=10, color=C["detail"], w=270, h=14))

Y = LY + 30

# ═══════════════════════════════════════════════
# TRACE SECTIONS
# ═══════════════════════════════════════════════

els, Y = trace_section("tr01", Y, "CG-03-01 Step 1: Identity → ERD Mapping",
    [("*Hire Date", "EC_EMP_EMPLOYMENT", "EFFECTIVE_START_DATE", "✓", "DATETIME — Hire Date"),
     ("*Company", "EC_EMP_JOB", "COMPANY_ID", "✓", "FK → FOCompany.externalCode"),
     ("*Event Reason", "EC_EMP_JOB", "EVENT_REASON_ID", "✓", "FK → FOEventReason.externalCode"),
     ("*Firstname (EN)", "EC_PER_PERSONAL", "FIRST_NAME", "✓", "VARCHAR(40)"),
     ("*Lastname (EN)", "EC_PER_PERSONAL", "LAST_NAME", "✓", "VARCHAR(40)"),
     ("*Date of Birth", "EC_PER_PERSON", "DATE_OF_BIRTH", "✓", "DATETIME — Encrypted"),
     ("Employee ID", "EC_PER_PERSON", "PERSON_ID", "+", "Auto-generated (BR-02)"),
     ("*National ID", "EC_PER_NATIONAL_ID", "NATIONAL_ID", "✓", "Encrypted VARCHAR(256)"),
     ("*Card Type", "EC_PER_NATIONAL_ID", "CARD_TYPE_ID", "✓", "Type 2 = concurrent 2 CG (BR-03)"),
     ("Event (Hire/Rehire)", "EC_EMP_JOB", "EVENT", "~", "FK target = 'NEW TABLE ??' — unresolved")],
    partials=[("Event", "EC_EMP_JOB.EVENT", "FK target undefined — design EVENT table")])
elements.extend(els)

els, Y = trace_section("tr02", Y, "CG-03-01 Step 2: Personal Info → ERD Mapping",
    [("*Salutation (TH)", "EC_PER_PERSONAL", "SALUTATION_LOCAL", "✓", "Picklist: SALUTATION"),
     ("*Firstname (TH)", "EC_PER_PERSONAL", "FIRSTNAME_LOCAL", "✓", "VARCHAR(40)"),
     ("*Lastname (TH)", "EC_PER_PERSONAL", "LASTNAME_LOCAL", "✓", "VARCHAR(40)"),
     ("Gender", "EC_PER_PERSONAL", "GENDER", "✓", "VARCHAR(2)"),
     ("Marital Status", "EC_PER_PERSONAL", "MARITAL_STATUS", "✓", "Workflow trigger (BR-20)"),
     ("*Nationality", "EC_PER_PERSONAL", "NATIONALITY", "✓", "VARCHAR(128)"),
     ("Race", "—", "—", "✗", "NO column in any entity"),
     ("Foreigner", "EC_PER_PERSONAL", "FOREIGNER", "✓", "Picklist: YES_NO"),
     ("Military Status", "EC_PER_PERSONAL", "MILITARY_STATUS", "✓", "Workflow trigger"),
     ("Address (cascade)", "EC_PER_ADDRESS", "PROVINCE/DISTRICT/...", "✓", "Cascade filter (BR-07)"),
     ("Email", "EC_PER_EMAIL", "EMAIL_ADDRESS", "✓", ""),
     ("Phone", "EC_PER_PHONE", "PHONE_NUMBER", "✓", "Country Code default 66"),
     ("Emergency Contact", "EC_PER_EMERGENCY_CONTACTS", "CONTACT_NAME/PHONE", "✓", "Address duplicated"),
     ("Dependents", "EC_PER_PERSON_RELATIONSHIP", "FIRST/LAST_NAME", "✓", "Relationship + DOB")],
    gaps=[("Race", "No RACE column — add to EC_PER_PERSONAL or use RESERVE_FIELD")],
    partials=[("Marital Status Since", "MILITARY_STATUS_SINCE", "Column name error"),
              ("Emergency Address", "EC_PER_EMERGENCY.*", "Address embedded, not FK — duplication")])
elements.extend(els)

els, Y = trace_section("tr03", Y, "CG-03-01 Step 3: Job Information → ERD Mapping",
    [("*Position", "EC_EMP_JOB", "POSITION_ID", "✓", "FK → Position — auto-fill 12+ fields (BR-04)"),
     ("*Business Unit", "EC_EMP_JOB", "BUSINESS_UNIT_ID", "✓", "Auto-fill from Position"),
     ("*Department", "EC_EMP_JOB", "DEPARTMENT_ID", "✓", "Auto-fill from Position"),
     ("*SSO Location", "EC_EMP_JOB", "SSO_LOCATION_ID", "✓", "Pay Group follows SSO"),
     ("*Cost Centre", "EC_EMP_JOB", "COST_CENTER_ID", "✓", "Auto-fill / overridable"),
     ("*Emp Group (A-H)", "EC_EMP_JOB", "EMPLOYEE_GROUP_ID", "✓", "Manual select (BR-05)"),
     ("*Contract Type", "EC_EMP_JOB", "CONTRACT_TYPE", "✓", "Regular/Monthly/Yearly/Long term"),
     ("Probation End Date", "EC_EMP_JOB", "PROBATION_PERIOD_END_DATE", "✓", "= Hire + 119d (BR-06)"),
     ("Corporate Title", "EC_EMP_JOB", "CORPORATE_TITLE", "✓", "Picklist"),
     ("Job Title/Role", "EC_EMP_JOB", "JOB_TITLE_ID", "~", "FK target '??' — define table"),
     ("Standard Hours", "EC_EMP_JOB", "WORKING_HOUR_ID", "~", "UI=numeric, ERD=FK ID")],
    partials=[("JOB_TITLE_ID", "??", "FK target undefined"),
              ("Standard Hours", "WORKING_HOUR_ID", "UI shows value, ERD stores FK")])
elements.extend(els)

els, Y = trace_section("tr04", Y, "CG-03-01 Step 4: Job Relationship → ERD Mapping",
    [("Matrix Manager", "EC_EMP_JOB_RELATIONSHIPS?", "—", "✗", "Not in EC_EMP_JOB"),
     ("Custom Manager (LMS)", "—", "—", "✗", "Not in provided schemas"),
     ("Work Permit", "EC_EMP_WORK_PERMIT", "DOCUMENT_NUMBER", "~", "Entity exists, not linked in Step 4"),
     ("Is Concurrent Emp", "EC_EMP_JOB", "IS_CONCURRENT_EMPLOYMENT", "✓", "For Acting")],
    gaps=[("Matrix Manager", "Use EC_EMP_JOB_RELATIONSHIPS entity"),
          ("Custom Manager (LMS)", "Need custom field")])
elements.extend(els)

els, Y = trace_section("tr05", Y, "CG-03-01 Step 5: Compensation → ERD Mapping",
    [("Pay Group", "—", "—", "✗", "NO PAY_GROUP — critical for payroll + Acting PG=99"),
     ("Pay Component", "PaymentInfoDetailV3", "customPayType", "~", "Name mismatch"),
     ("Amount", "PaymentInfoDetailV3", "amount", "✓", "DECIMAL"),
     ("Currency", "PaymentInfoDetailV3", "currency", "✓", "String"),
     ("Frequency", "—", "—", "✗", "Not in PaymentInfoDetailV3"),
     ("Payment Method", "PaymentInfoDetailV3", "paymentMethod", "✓", "Bank/Cash/Cheque"),
     ("Bank", "PaymentInfoDetailV3", "bank", "✓", "FK → Bank entity"),
     ("Account Number", "PaymentInfoDetailV3", "accountNumber", "✓", "Encrypted")],
    gaps=[("Pay Group", "CRITICAL — payroll + Acting PG=99 (BR-32)"),
          ("Frequency", "Find PayComponentRecurring entity")],
    partials=[("Pay Component", "customPayType", "Name differs")])
elements.extend(els)

els, Y = trace_section("tr06", Y, "Employment Details & Seniority → ERD Mapping",
    [("Original Start Date", "EC_EMP_EMPLOYMENT", "ORIGINAL_START_DATE", "✓", "Preserved on Rehire"),
     ("Seniority Date", "EC_EMP_EMPLOYMENT", "SENIORITY_DATE", "✓", "Reset on Rehire"),
     ("Pass Probation Date", "EC_EMP_EMPLOYMENT", "PASS_PROBATION_DATE_CONFIRM_DATE", "✓", "Verified after pass"),
     ("Retirement Date", "EC_EMP_EMPLOYMENT", "RETIREMENT_DATE", "✓", "= DOB + 60 yrs"),
     ("OK to Rehire", "EC_EMP_EMPLOYMENT", "OK_TO_REHIRE", "~", "Duplicated in 3 entities!"),
     ("Year of Service", "EC_EMP_EMPLOYMENT", "YEAR_OF_SERVICE", "+", "Calculated — CRC/CPN rules"),
     ("Current Years In *", "EC_EMP_EMPLOYMENT", "CURRENT_YEARS_IN_*", "+", "7 calculated fields"),
     ("Override Dates", "EC_EMP_JOB", "OVERRIDE_CURRENT_*", "+", "6 override fields")],
    partials=[("OK to Rehire", "3 entities", "EC_EMP_EMPLOYMENT + TERMINATION + JOB — inconsistency risk")])
elements.extend(els)

els, Y = trace_section("tr07", Y, "CG-03-05 Terminate → ERD Mapping",
    [("Resigned Date", "EC_EMP_EMPLOYMENT_TERMINATION", "EFFECTIVE_END_DATE", "✓", ""),
     ("Last Date Worked", "EC_EMP_EMPLOYMENT_TERMINATION", "LAST_DATE_WORKED", "✓", ""),
     ("Event Reason", "EC_EMP_EMPLOYMENT_TERMINATION", "EVENT_REASON", "✓", "FK → FOEventReason"),
     ("Reason for Termination", "EC_EMP_EMPLOYMENT_TERMINATION", "REASON_FOR_TERMINATION", "~", "Duplicated in 3 entities"),
     ("Voluntary/Involuntary", "EC_EMP_EMPLOYMENT_TERMINATION", "TERMINATE_VOLUNTARY_INVOLUNTARY", "~", "Duplicated in 3 entities"),
     ("OK to Rehire", "EC_EMP_EMPLOYMENT_TERMINATION", "OK_TO_REHIRE", "✓", "No = blacklist"),
     ("Transfer Subordinates", "—", "—", "✗", "Process outcome, not stored field")],
    gaps=[("Transfer Subordinates", "Triggers MANAGER_ID update on subordinates")])
elements.extend(els)

els, Y = trace_section("tr08", Y, "CG-03-04 Acting → ERD Mapping",
    [("Secondary Employment", "EC_EMP_JOB", "IS_CONCURRENT_EMPLOYMENT", "✓", "= Yes for acting"),
     ("Pay Group = 99", "—", "—", "✗", "PAY_GROUP column missing"),
     ("Primary Position flag", "—", "—", "✗", "No IS_PRIMARY flag"),
     ("End Acting Reason", "EC_EMP_EMPLOYMENT_TERMINATION", "EVENT_REASON", "✓", "TERM_ENDASSIGN")],
    gaps=[("Pay Group", "Add PAY_GROUP column (critical for Acting PG=99)"),
          ("Primary Position", "Add IS_PRIMARY_EMPLOYMENT flag")])
elements.extend(els)

# ═══════════════════════════════════════════════
# GAP SUMMARY
# ═══════════════════════════════════════════════
Y += 10
elements.append(txt("gap_title", 50, Y, "Gap Summary — 8 Critical Fields", fs=20, color="#b91c1c", w=600, h=25))
Y += 30
gap_data = [
    ("1. Race", "Step 2", "EC_PER_PERSONAL", "Add RACE column or RESERVE_FIELD", "Low"),
    ("2. Pay Group", "Step 5+Acting", "EC_EMP_JOB/CompInfo", "CRITICAL — payroll + Acting PG=99", "HIGH"),
    ("3. Pay Frequency", "Step 5", "PayComponentRecurring?", "Find missing entity", "Medium"),
    ("4. Matrix Manager", "Step 4", "EC_EMP_JOB_RELATIONSHIPS", "Use existing entity", "Medium"),
    ("5. Custom Mgr", "Step 4", "—", "New custom field", "Low"),
    ("6. Work Permit", "Step 4", "EC_EMP_WORK_PERMIT", "Link existing entity", "Low"),
    ("7. Primary Pos flag", "Acting", "EC_EMP_JOB", "Add IS_PRIMARY", "Medium"),
    ("8. EVENT table", "Step 1", "EC_EMP_JOB", "Design EVENT lookup", "HIGH"),
]
cols = [130, 120, 200, 350, 80]
headers = ["Gap", "UI Screen", "Target Entity", "Resolution", "Priority"]
hx = 50
for ci, (h, cw) in enumerate(zip(headers, cols)):
    elements.append(rect(f"gs_h{ci}", hx, Y, cw, 26, "#b91c1c", "#b91c1c"))
    elements.append(txt(f"gs_h{ci}_t", hx+4, Y+4, h, fs=11, color=C["on_dark"], w=cw-8, h=18))
    hx += cw
Y += 26
for ri, row in enumerate(gap_data):
    hx = 50
    is_high = "HIGH" in row[4]
    fill = "#fee2e2" if is_high else "#fef3c7"
    border = "#b91c1c" if is_high else "#b45309"
    color = "#b91c1c" if is_high else "#b45309"
    for ci, (val, cw) in enumerate(zip(row, cols)):
        elements.append(rect(f"gs_r{ri}c{ci}", hx, Y, cw, 24, fill, border))
        elements.append(txt(f"gs_r{ri}c{ci}_t", hx+4, Y+3, val, fs=10, color=color, w=cw-8, h=18))
        hx += cw
    Y += 24

# ERD Issues
Y += 15
elements.append(txt("erd_title", 50, Y, "ERD Issues — ต้องแก้ใน Entity Schema", fs=16, color="#b45309", w=500, h=20))
Y += 24
elements.append(rect("erd_bg", 50, Y, 1100, 90, C["decision_fill"], C["decision_stroke"]))
elements.append(txt("erd_t", 60, Y+5,
    "1. EVENT column FK target = 'NEW TABLE ??' — design EVENT lookup table\n"
    "2. JOB_TITLE_ID FK target = '??' — define JOB_TITLE entity\n"
    "3. OK_TO_REHIRE duplicated in 3 tables — single source of truth needed\n"
    "4. MILITARY_STATUS_SINCE column name != label 'Marital Status Since'\n"
    "5. Emergency Contact address fields embedded (not FK) — data duplication",
    fs=10, color=C["decision_stroke"], w=1080, h=80))

# ═══════════════════════════════════════════════
# OUTPUT
# ═══════════════════════════════════════════════
doc = {
    "type": "excalidraw", "version": 2, "source": "https://excalidraw.com",
    "elements": elements,
    "appState": {"viewBackgroundColor": "#ffffff", "gridSize": 20},
    "files": {},
}
out = "/Users/tachongrak/stark/projects/hr-platform-replacement/diagrams/ui-erd-traceability.excalidraw"
with open(out, "w") as f:
    json.dump(doc, f, indent=2, ensure_ascii=False)
print(f"Generated {len(elements)} elements → {out}")

import subprocess
result = subprocess.run(["python3", "validate_excalidraw.py", out], capture_output=True, text=True)
print(result.stdout)
if result.returncode != 0:
    print("VALIDATION FAILED!")
    sys.exit(1)
