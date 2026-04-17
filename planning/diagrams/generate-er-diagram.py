"""Generate ER Diagram from entity schemas — BRD-annotated, single .excalidraw file."""
import json

C = {
    "person_fill": "#a7f3d0", "person_stroke": "#047857",
    "emp_fill": "#3b82f6", "emp_stroke": "#1e3a5f",
    "emp2_fill": "#60a5fa",
    "position_fill": "#ddd6fe", "position_stroke": "#6d28d9",
    "foundation_fill": "#fef3c7", "foundation_stroke": "#b45309",
    "payment_fill": "#fed7aa", "payment_stroke": "#c2410c",
    "evidence_bg": "#1e293b", "evidence_text": "#22c55e",
    "title": "#1e40af", "subtitle": "#3b82f6", "detail": "#64748b",
    "on_dark": "#ffffff", "on_light": "#374151",
    "fk_line": "#64748b", "warn_stroke": "#dc2626",
}

elements = []
seed_counter = [1000]
def ns(): seed_counter[0] += 1; return seed_counter[0]

def txt(id, x, y, text, fs=16, color="#1e40af", align="left", w=200, h=25, cid=None, va="top"):
    return {"type":"text","id":id,"x":x,"y":y,"width":w,"height":h,
            "text":text,"originalText":text,"fontSize":fs,"fontFamily":3,
            "textAlign":align,"verticalAlign":va,"strokeColor":color,
            "backgroundColor":"transparent","fillStyle":"solid","strokeWidth":1,
            "strokeStyle":"solid","roughness":0,"opacity":100,"angle":0,
            "seed":ns(),"version":1,"versionNonce":ns(),"isDeleted":False,
            "groupIds":[],"boundElements":None,"link":None,"locked":False,
            "containerId":cid,"lineHeight":1.25}

def rect(id, x, y, w, h, fill, stroke, bids=None):
    return {"type":"rectangle","id":id,"x":x,"y":y,"width":w,"height":h,
            "strokeColor":stroke,"backgroundColor":fill,"fillStyle":"solid",
            "strokeWidth":2,"strokeStyle":"solid","roughness":0,"opacity":100,
            "angle":0,"seed":ns(),"version":1,"versionNonce":ns(),"isDeleted":False,
            "groupIds":[],"boundElements":[{"id":b,"type":t} for b,t in (bids or [])],
            "link":None,"locked":False,"roundness":{"type":3}}

def line(id, x, y, pts, color="#64748b", sw=1, dashed=False):
    return {"type":"line","id":id,"x":x,"y":y,
            "width":max(abs(p[0]) for p in pts) if pts else 0,
            "height":max(abs(p[1]) for p in pts) if pts else 0,
            "strokeColor":color,"backgroundColor":"transparent","fillStyle":"solid",
            "strokeWidth":sw,"strokeStyle":"dashed" if dashed else "solid",
            "roughness":0,"opacity":100,"angle":0,"seed":ns(),"version":1,
            "versionNonce":ns(),"isDeleted":False,"groupIds":[],"boundElements":None,
            "link":None,"locked":False,"points":pts}

def arrow(id, x, y, pts, color, sid=None, eid=None):
    return {"type":"arrow","id":id,"x":x,"y":y,
            "width":max(abs(p[0]) for p in pts) if pts else 0,
            "height":max(abs(p[1]) for p in pts) if pts else 0,
            "strokeColor":color,"backgroundColor":"transparent","fillStyle":"solid",
            "strokeWidth":1,"strokeStyle":"solid","roughness":0,"opacity":100,
            "angle":0,"seed":ns(),"version":1,"versionNonce":ns(),"isDeleted":False,
            "groupIds":[],"boundElements":None,"link":None,"locked":False,
            "points":pts,
            "startBinding":{"elementId":sid,"focus":0,"gap":2} if sid else None,
            "endBinding":{"elementId":eid,"focus":0,"gap":2} if eid else None,
            "startArrowhead":None,"endArrowhead":"arrow"}

def entity_box(prefix, x, y, name, fields_text, brds, fill, stroke, w=240, h=None):
    """Create an entity box with name header + fields."""
    lines = fields_text.split("\n")
    field_h = len(lines) * 13 + 10
    header_h = 30
    total_h = h or (header_h + field_h + 5)
    els = []
    # Header
    hid = f"{prefix}_h"
    htid = f"{prefix}_ht"
    els.append(rect(hid, x, y, w, header_h, fill, stroke, [(htid, "text")]))
    els.append(txt(htid, x+5, y+2, name, fs=12, color=stroke if fill != C["emp_fill"] else C["on_dark"],
                   align="center", w=w-10, h=26, cid=hid, va="middle"))
    # BRD badge
    if brds:
        els.append(txt(f"{prefix}_brd", x+w-len(brds)*7, y-14, brds, fs=9, color=C["warn_stroke"], w=len(brds)*7, h=12))
    # Body
    bid = f"{prefix}_b"
    btid = f"{prefix}_bt"
    els.append(rect(bid, x, y+header_h, w, total_h-header_h, "#ffffff", stroke, [(btid, "text")]))
    els.append(txt(btid, x+8, y+header_h+4, fields_text, fs=10, color=C["on_light"],
                   align="left", w=w-16, h=total_h-header_h-8, cid=bid, va="top"))
    return els, total_h

# ═══════════════════════════════════════════════
# TITLE
# ═══════════════════════════════════════════════
elements.append(txt("title", 50, 20, "EC Core — Entity Relationship Diagram", fs=28, color=C["title"], w=800, h=35))
elements.append(txt("subtitle", 50, 60, "5 Domains, 63 Entities, 207 BRD References  |  Source: entity-schemas/*.xlsx  |  For implementation team", fs=13, color=C["detail"], w=1200, h=18))

# Legend
LX = 1050
elements.append(txt("legend_title", LX, 20, "Legend", fs=14, color=C["title"], w=100, h=18))
legend = [
    ("Personal Info", C["person_fill"], C["person_stroke"], "#12-34"),
    ("Employment", C["emp_fill"], C["emp_stroke"], "#21-24, #85-108"),
    ("Position", C["position_fill"], C["position_stroke"], "#2-5"),
    ("Foundation", C["foundation_fill"], C["foundation_stroke"], "#1, 4, 6, 7"),
    ("Payment", C["payment_fill"], C["payment_stroke"], "#6, #118-120"),
]
for i, (label, fill, stroke, brds) in enumerate(legend):
    ly = 42 + i * 22
    elements.append(rect(f"leg_{i}", LX, ly, 14, 14, fill, stroke))
    elements.append(txt(f"leg_{i}_t", LX+20, ly, f"{label} ({brds})", fs=10, color=C["detail"], w=300, h=14))

# ═══════════════════════════════════════════════
# DOMAIN 1: PERSONAL INFORMATION (left column)
# ═══════════════════════════════════════════════
PX, PY = 50, 130
elements.append(txt("d1_title", PX, PY, "Personal Information", fs=18, color=C["person_stroke"], w=300, h=22))
PY += 30

# EC_PER_PERSON - root
els, h = entity_box("person", PX, PY, "EC_PER_PERSON",
    "PK PERSON_ID VARCHAR(15)\nDATE_OF_BIRTH 🔒\nCOUNTRY_OF_BIRTH\nREGION_OF_BIRTH\nAGE\n+ 20 RESERVE_FIELD",
    "#12-34", C["person_fill"], C["person_stroke"])
elements.extend(els)
PERSON_CENTER = (PX + 120, PY + h//2)
PY += h + 15

# EC_PER_PERSONAL
els, h = entity_box("personal", PX, PY, "EC_PER_PERSONAL",
    "PK PER_PERSONAL_ID\nFK PERSON_ID\nEFFECTIVE_START_DATE\nFIRST_NAME, LAST_NAME\nFIRSTNAME_LOCAL\nLASTNAME_LOCAL\nNATIONALITY, GENDER\nMARITAL_STATUS\nMILITARY_STATUS\nFOREIGNER\n⚡ Workflow trigger fields",
    "#13", C["person_fill"], C["person_stroke"])
elements.extend(els)
PY += h + 12

# EC_PER_ADDRESS
els, h = entity_box("address", PX, PY, "EC_PER_ADDRESS",
    "PK PER_ADDRESS_DEFLT_ID\nFK PERSON_ID\nFK COUNTRY_ID → Territory\nADDRESS_TYPE\nPROVINCE→DISTRICT→\n  SUB_DISTRICT→POSTAL\n⚡ Workflow trigger",
    "#17", C["person_fill"], C["person_stroke"])
elements.extend(els)
PY += h + 12

# EC_PER_NATIONAL_ID
els, h = entity_box("natid", PX, PY, "EC_PER_NATIONAL_ID",
    "PK PER_NATIONAL_ID\nFK PERSON_ID\nFK CARD_TYPE_ID\nNATIONAL_ID 🔒 encrypted\nISSUE_DATE, EXPIRY_DATE\nIS_PRIMARY",
    "#14", C["person_fill"], C["person_stroke"])
elements.extend(els)
PY += h + 12

# Smaller personal entities (compact)
small_personal = [
    ("email", "EC_PER_EMAIL", "FK PERSON_ID\nEMAIL_TYPE\nEMAIL_ADDRESS", "#15"),
    ("phone", "EC_PER_PHONE", "FK PERSON_ID\nPHONE_TYPE\nPHONE_NUMBER", "#16"),
    ("emergency", "EC_PER_EMERGENCY\n_CONTACTS", "FK PERSON_ID\nCONTACT_NAME\nRELATIONSHIP\nPHONE", "#19"),
    ("relationship", "EC_PER_PERSON\n_RELATIONSHIP", "FK PERSON_ID\nFK RELATED_PERSON_ID\nRELATIONSHIP_TYPE", "#20"),
]
sx = PX
for pfx, name, fields, brd in small_personal:
    els, h = entity_box(pfx, sx, PY, name, fields, brd, C["person_fill"], C["person_stroke"], w=175)
    elements.extend(els)
    sx += 185
PY += 120

# Country-specific
els, h = entity_box("tha", PX, PY, "EC_PER_GLOBAL_INFO_THA",
    "FK PERSON_ID\nDISABILITY_STATUS 🔒\nRELIGION\nTAX_DEPENDENT\nNUMBEROF_CHILDREN",
    "#34", C["person_fill"], C["person_stroke"], w=220)
elements.extend(els)
els, h = entity_box("vnm", PX+235, PY, "EC_PER_GLOBAL_INFO_VNM",
    "FK PERSON_ID\nVN_RACE, VN_RELIGION\nTAX_DEPENDENT\nSOCIAL_INSURANCE\nISSUING_AUTHORITY",
    "#34", C["person_fill"], C["person_stroke"], w=220)
elements.extend(els)

# ═══════════════════════════════════════════════
# DOMAIN 2: EMPLOYMENT INFORMATION (center)
# ═══════════════════════════════════════════════
EX, EY = 530, 130
elements.append(txt("d2_title", EX, EY, "Employment Information", fs=18, color=C["emp_stroke"], w=300, h=22))
EY += 30

# EC_EMP_EMPLOYMENT - root
els, h = entity_box("employment", EX, EY, "EC_EMP_EMPLOYMENT",
    "PK EMP_EMPLOYMENT_ID\nUQ PERSON_ID → EC_PER_PERSON\nUQ USER_ID\nHIRE_DATE (EFFECTIVE_START)\nORIGINAL_START_DATE\nSENIORITY_DATE\nPASS_PROBATION_DATE\nRETIREMENT_DATE\nRESIGNED_DATE (END)\nLAST_DATE_WORKED\nOK_TO_REHIRE\nYEAR_OF_SERVICE\n+ 7 CURRENT_YEARS_IN_*\n+ 7 *_EFFECTIVE_DATE\n+ 20 RESERVE_FIELD",
    "#21-24,85-92", C["emp_fill"], C["emp_stroke"], w=280)
elements.extend(els)
EMP_CENTER = (EX + 140, EY + h//2)
EY += h + 15

# EC_EMP_JOB - the beast (128 fields, 38 FKs)
els, h = entity_box("empjob", EX, EY, "EC_EMP_JOB (128 fields, 38 FKs)",
    "PK EMP_JOB_ID\nFK USER_ID → EMPLOYMENT\nEFFECTIVE_START_DATE\nSEQ_NUMBER\nEVENT, EVENT_REASON_ID\nEMPLOYEE_STATUS\nCORPORATE_TITLE, BAND\n── Org Structure ──\nFK COMPANY_ID → FOCompany\nFK BUSINESS_UNIT_ID\nFK DIVISION_ID\nFK DEPARTMENT_ID\nFK POSITION_ID → Position\n── Location ──\nFK LOCATION_ID → FOLocation\nFK COST_CENTER_ID\nFK SSO_LOCATION_ID\n── Job Class ──\nFK JOB_CODE_ID → FOJobCode\nFK JOB_FAMILY_ID\nFK PAY_GRADE_ID\n── Employment ──\nCONTRACT_TYPE\nFTE, IS_FULLTIME\nPROBATION_END_DATE\nIS_CONCURRENT_EMP\n── Manager ──\nFK MANAGER_ID → self\n── Time Mgmt ──\nFK WORKING_HOUR_ID\nFK WORK_SCHEDULE_ID",
    "#23,85-97", C["emp_fill"], C["emp_stroke"], w=280)
elements.extend(els)
EY += h + 15

# EC_EMP_EMPLOYMENT_TERMINATION
els, h = entity_box("term", EX, EY, "EC_EMP_EMPLOYMENT_TERMINATION",
    "PK TERMINATION_ID\nFK PERSON_ID, USER_ID\nFK EVENT_REASON\nRESIGNED_DATE\nREASON_FOR_TERMINATION\nVOLUNTARY/INVOLUNTARY\nOK_TO_REHIRE\nTRANSFER_OUT_TO",
    "#22,109-116", C["emp2_fill"], C["emp_stroke"], w=280)
elements.extend(els)
EY += h + 12

# Side-by-side: Job Relationships + Work Permit
els, h = entity_box("jobrel", EX, EY, "EC_EMP_JOB_RELATIONSHIPS",
    "FK USER_ID\nFK RELATED_USER_ID\nRELATIONSHIP_TYPE\nEFFECTIVE_START/END",
    "#24", C["emp2_fill"], C["emp_stroke"], w=135)
elements.extend(els)
els, h2 = entity_box("workpermit", EX+145, EY, "EC_EMP_WORK_PERMIT",
    "FK USER_ID\nDOCUMENT_NUMBER\nDOCUMENT_TYPE\nISSUE/EXPIRY_DATE\n90DAYS_REPORT",
    "#18", C["emp2_fill"], C["emp_stroke"], w=135)
elements.extend(els)

# ═══════════════════════════════════════════════
# DOMAIN 3: POSITION (right-center)
# ═══════════════════════════════════════════════
POX, POY = 870, 130
elements.append(txt("d3_title", POX, POY, "Position", fs=18, color=C["position_stroke"], w=200, h=22))
POY += 30

els, h = entity_box("position_e", POX, POY, "Position (98 fields)",
    "PK code + effectiveStartDate\npositionTitle, jobTitle\nFK jobCode → FOJobCode\nFK company → FOCompany\nFK businessUnit\nFK department\nFK division\nFK location\nFK costCenter\nFK payGrade, payRange\nFK parentPosition → self\ntargetFTE\nstandardHours\nvacant, positionControlled\nmultipleIncumbents\nemployeeClass\nemploymentType\nregularTemporary",
    "#2-5", C["position_fill"], C["position_stroke"], w=260)
elements.extend(els)
POY += h + 12

els, h = entity_box("posmatrix", POX, POY, "PositionMatrixRelationship",
    "FK Position (code+date)\nmatrixRelationshipType\nFK relatedPosition\n(dot-line hierarchy)",
    "#5", C["position_fill"], C["position_stroke"], w=260)
elements.extend(els)
POY += h + 12

els, h = entity_box("posentity", POX, POY, "PositionEntity",
    "PK externalCode (GUID)\nFK position → Position\nFK jobCode\nstatus, subModule",
    "#5", C["position_fill"], C["position_stroke"], w=260)
elements.extend(els)
POY += h + 12

# Skill + Competency
els, h = entity_box("poscomp", POX, POY, "PositionCompetency\nMappingEntity",
    "FK PositionEntity\ncompetency\nrating, weight",
    "#5", C["position_fill"], C["position_stroke"], w=125)
elements.extend(els)
els, h2 = entity_box("posskill", POX+135, POY, "PositionSkill\nMappingEntity",
    "FK PositionEntity\nskill\nproLevel",
    "#5", C["position_fill"], C["position_stroke"], w=125)
elements.extend(els)
POY += max(h, h2) + 12

els, h = entity_box("posrtr", POX, POY, "PositionRightToReturn",
    "FK position\nFK userId\nstartDate, endDate\nreason, loaTimeType",
    "#5", C["position_fill"], C["position_stroke"], w=260)
elements.extend(els)

# ═══════════════════════════════════════════════
# DOMAIN 4: FOUNDATION (bottom-left)
# ═══════════════════════════════════════════════
FX, FY = 50, 1050
elements.append(txt("d4_title", FX, FY, "Foundation Objects", fs=18, color=C["foundation_stroke"], w=300, h=22))
elements.append(txt("d4_sub", FX, FY+24, "Org hierarchy: Company → BU → Division/Function → Department/Org → Location/Store", fs=11, color=C["detail"], w=700, h=14))
FY += 45

# Org hierarchy row
org_entities = [
    ("focompany", "FOCompany", "PK externalCode+startDate\nname (multilingual)\ncountry, currency\nstandardHours", "#1"),
    ("fobu", "FOBusinessUnit", "PK externalCode+startDate\nname\nheadOfUnit\n→ FOCompany (parent)", "#1"),
    ("fodiv", "FODivision\n(Function)", "PK externalCode+startDate\nname\n→ FOBusinessUnit", "#1"),
    ("fodept", "FODepartment\n(Organization)", "PK externalCode+startDate\nname\ncostCenter\n→ FODivision", "#1"),
    ("foloc", "FOLocation\n(Store/Branch)", "PK externalCode+startDate\naddress block\nstoreFormat, storeSize\nzone, hrDistrict", "#1"),
]
for i, (pfx, name, fields, brd) in enumerate(org_entities):
    ex = FX + i * 230
    els, h = entity_box(pfx, ex, FY, name, fields, brd, C["foundation_fill"], C["foundation_stroke"], w=215)
    elements.extend(els)

# Arrows between org hierarchy
for i in range(len(org_entities)-1):
    ax = FX + (i+1)*230 - 15
    elements.append(arrow(f"org_a{i}", ax, FY+40, [[15, 0]], C["foundation_stroke"]))

FY += 140

# Job classification row
job_entities = [
    ("fojobcode", "FOJobCode\n(Job Role)", "PK externalCode+startDate\nname = Job Role\nFK jobFunction\ncust_jobType\ncust_JGMin/Max", "#1,4"),
    ("fojobfunc", "FOJobFunction\n(Job Family)", "PK externalCode+startDate\nname = Job Family\nstatus", "#1,4"),
    ("fopaygr", "FOPayGrade", "PK externalCode+startDate\nname\ncustomLong1 (numeric)", "#6"),
    ("fopaygrp", "FOPayGroup", "PK externalCode+startDate\nname\npayFrequency\neligibleForCarAllo", "#6"),
    ("foevreason", "FOEventReason", "PK externalCode+startDate\nname, event\nemplStatus\npayrollEvent", "#1"),
]
for i, (pfx, name, fields, brd) in enumerate(job_entities):
    ex = FX + i * 230
    els, h = entity_box(pfx, ex, FY, name, fields, brd, C["foundation_fill"], C["foundation_stroke"], w=215)
    elements.extend(els)
FY += 130

# Remaining foundation (compact list)
elements.append(txt("fo_other_title", FX, FY, "Other Foundation Objects (20+)", fs=14, color=C["foundation_stroke"], w=400, h=18))
FY += 22
elements.append(rect("fo_other_bg", FX, FY, 1100, 55, C["evidence_bg"], C["foundation_stroke"],
                      [("fo_other_t", "text")]))
elements.append(txt("fo_other_t", FX+10, FY+5,
    "FOCostCenter (#1) | FOPayComponent (#6) | FOPayComponentGroup | FOPayRange | FOFrequency | FOGeozone | FOLocationGroup\n"
    "FOCorporateAddress | FODynamicRole | FOWfConfig + StepApprover (#111) | FoTranslation | Territory\n"
    "PayCalendar | PayPeriod | PayScaleArea/Group/Level/Type/PayComponent | JobClassificationCountry | LocalizedData",
    fs=10, color=C["evidence_text"], w=1080, h=45, cid="fo_other_bg", va="top"))

# ═══════════════════════════════════════════════
# DOMAIN 5: PAYMENT INFORMATION (bottom-right)
# ═══════════════════════════════════════════════
PAX, PAY = 870, 830
elements.append(txt("d5_title", PAX, PAY, "Payment Information", fs=18, color=C["payment_stroke"], w=300, h=22))
PAY += 30

els, h = entity_box("payinfo", PAX, PAY, "PaymentInformationV3",
    "PK effectiveStartDate+worker\nFK worker → Employment\njobCountry\n→ PaymentInfoDetailV3",
    "#6,118-120", C["payment_fill"], C["payment_stroke"], w=260)
elements.extend(els)
PAY += h + 12

els, h = entity_box("paydetail", PAX, PAY, "PaymentInfoDetailV3 (70f)",
    "FK PaymentInfoV3 (composite)\nFK bank → Bank\nFK paymentMethod\nFK customPayType\naccountNumber 🔒\naccountOwner\ncurrency, amount\npayType, paySequence\n+ 46 country extensions",
    "#6,118", C["payment_fill"], C["payment_stroke"], w=260)
elements.extend(els)
PAY += h + 12

els, h = entity_box("bank", PAX, PAY, "Bank",
    "PK externalCode\nbankName, bankBranch\nbankCountry\nroutingNumber\nswiftCode",
    "#6", C["payment_fill"], C["payment_stroke"], w=125)
elements.extend(els)
els, h2 = entity_box("paymethod", PAX+135, PAY, "PaymentMethodV3",
    "PK externalCode\nname\npaymentType\nstatus",
    "#6", C["payment_fill"], C["payment_stroke"], w=125)
elements.extend(els)

# ═══════════════════════════════════════════════
# CROSS-DOMAIN RELATIONSHIPS (arrows)
# ═══════════════════════════════════════════════

# Person → Employment (the bridge)
elements.append(arrow("fk_person_emp", 290, 200, [[240, 0]], C["person_stroke"], "person_h", "employment_h"))

# Employment → EmpJob
elements.append(line("rel_emp_job", 670, 395, [[0, 30]], C["emp_stroke"], sw=2))

# EmpJob → Position (cross-domain)
elements.append(arrow("fk_job_pos", 810, 500, [[60, 0]], C["position_stroke"]))
elements.append(txt("fk_job_pos_l", 815, 485, "POSITION_ID", fs=9, color=C["position_stroke"], w=80, h=12))

# EmpJob → Foundation (multiple FKs)
elements.append(arrow("fk_job_fo", 670, 790, [[0, 270]], C["foundation_stroke"]))
elements.append(txt("fk_job_fo_l", 675, 830, "38 FKs to\nFoundation", fs=9, color=C["foundation_stroke"], w=70, h=24))

# Employment → Payment
elements.append(arrow("fk_emp_pay", 810, 250, [[60, 600]], C["payment_stroke"]))
elements.append(txt("fk_emp_pay_l", 835, 600, "worker", fs=9, color=C["payment_stroke"], w=50, h=12))

# ═══════════════════════════════════════════════
# BRD COVERAGE SUMMARY (bottom)
# ═══════════════════════════════════════════════
BY = 1400
elements.append(txt("brd_title", 50, BY, "BRD → Entity Coverage Summary", fs=18, color=C["title"], w=500, h=22))
BY += 28
elements.append(rect("brd_bg", 50, BY, 1100, 100, C["evidence_bg"], C["emp_stroke"], [("brd_t", "text")]))
elements.append(txt("brd_t", 60, BY+5,
    "BRDs #1,6,7     → Foundation Objects (FOCompany, FOJobCode, FOPayGrade, Picklists)\n"
    "BRDs #2-5       → Position, PositionEntity, PositionMatrix, Competency, Skill\n"
    "BRDs #12-34     → EC_PER_PERSON + 10 child entities (Personal, Address, NationalID, Email, Phone, Emergency, etc.)\n"
    "BRDs #21-24     → EC_EMP_EMPLOYMENT, EC_EMP_JOB (128 fields!), Termination, JobRelationships, WorkPermit\n"
    "BRDs #85-108    → EC_EMP_JOB detail fields (Year-In-*, Seniority, Override dates, Acting, Hire Correction)\n"
    "BRDs #109-117   → EC_EMP_EMPLOYMENT lifecycle (Hire, Transfer, Terminate, Revert, Probation)\n"
    "BRDs #118-120   → PaymentInformationV3, PaymentInfoDetailV3, Bank\n"
    "BRDs #121-164   → Reports (read from all entities above) | BRDs #165-183 → Self-Service UI (no new entities)",
    fs=10, color=C["evidence_text"], w=1080, h=90, cid="brd_bg", va="top"))

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

out = "/Users/tachongrak/stark/projects/hr-platform-replacement/diagrams/er-diagram-brd.excalidraw"
with open(out, "w") as f:
    json.dump(doc, f, indent=2, ensure_ascii=False)
print(f"Generated {len(elements)} elements → {out}")
