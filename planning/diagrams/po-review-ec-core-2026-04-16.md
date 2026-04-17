# PO Review — EC Core Diagram Coverage Audit

**วันที่**: 2026-04-16
**Diagram**: `sf-ec-core-full-spec.excalidraw` (539 elements, validator clean)
**Sources**: 12 PDFs จาก `~/Downloads/SAP_USER MANUAL/01-EC/EC-Core/`
**Methodology**: Extract topics จาก PDF → cross-reference 6 sections + EC Report → report `X/Y covered, missing: [...]`
**Constraints**: C8 strict grounding (EC-Core PDFs only), EX-005 hallucination flag, ห้าม propose fix

---

## สรุปผล (Executive Summary)

| Section | Coverage | Status |
|---|---|---|
| CG-03-01 Hiring | 12/12 | ✅ Pass |
| CG-03-02 Probation | 3/3 | ✅ Pass |
| CG-03-03 Master Data | 14/22 | ⚠️ Partial — Profile sub-sections + Dependents generic |
| CG-03-03 Pay Rate | 2/2 + 5/5 events | ✅ Pass |
| CG-03-04 Movement | 4/4 | ✅ Pass |
| CG-03-04 Acting | 2/2 | ✅ Pass |
| CG-03-05 Termination | 5/8 | 🔴 **Gap** — Change/Reverse Term Date + Rehire-flag missing |
| CG-03-06 Contract Renewal | 1/1 | ✅ Pass |
| CG-03-06 Suspension | 2/2 | ✅ Pass |
| CG-03-06 Change Emp Type | 2/5 | 🔴 **Gap** — Extend Retirement, Change in Pay, Data Change ไม่ explicit |
| EC Report | 22/23 + 5/5 categories | ⚠️ Off-by-1 (diagram = 22 Basic, PDF = 23) |

**EX-005 Invented Features**: ✅ **Clean** — ไม่พบ hallucination (รายละเอียดท้ายไฟล์)

---

## รายละเอียดต่อ Section

### CG-03-01 Hiring (12/12) ✅

**PDF**: `2_..._01_Hire and Rehire_V0.02.pdf` — 12 scenarios CG-03-01-01-001 ถึง 012
**Diagram**: ครบทุก scenario, 4-step wizard, 12 event reasons mapped

**Coverage**: ครบ ไม่มี gap

---

### CG-03-02 Probation (3/3) ✅

**PDF**: `3_..._02_Manage Probation_V0.02.pdf` — Pass / Extend / Terminate (Unsuccessful)
**Diagram**: ครบทุก path + Process Trigger (Hire Date + 119 days)

**Coverage**: ครบ ไม่มี gap

---

### CG-03-03 Maintain Master Data (14/22) ⚠️

**PDF**: `4_..._03_Maintain Master Data_V0.02..pdf` — 25+ sub-sections แบ่งเป็น 4 กลุ่ม:

#### Personal Information (covered: 7/8)
- ✅ Biographical, National ID, Personal Info
- ✅ Address (Home/Postal/Permanent)
- ✅ Phone, Email
- ✅ Emergency Contact
- 🔴 **Dependents** — ไม่ explicit ใน diagram (PDF section 4.x มีแยก)

#### Employment Information (covered: 5/5) ✅
- ✅ Job Information, Position, Cost Center, Department
- ✅ Compensation Info, Pay Component
- ✅ Recurring Pay Component (Allowance/Deduction)

#### Profile Data (covered: 0/9 explicit) 🔴
Diagram ระบุเป็น generic "Profile data" แต่ PDF แยกเป็น sub-sections ดังนี้:
- 🔴 Education
- 🔴 Work Experience Within Company
- 🔴 Languages
- 🔴 Certifications / Licenses
- 🔴 Honours / Awards
- 🔴 Goodness / Disciplinary
- 🔴 Salary History
- 🔴 Previous Employment
- 🔴 Learning History

**Gap summary**: Profile sub-sections ทั้ง 9 ไม่ enumerate + Dependents ขาด → 10 missing items

---

### CG-03-03 Pay Rate Change (2/2 + 5/5 events) ✅

**PDF**: `6_..._05_Manage Pay Rate Change_V0.02.pdf`
- 2 scenarios: Pay Rate Change (individual), Mass Upload Merit
- 5 events: Promotion, Demotion, Salary Adjustment, Annual Merit, Mass Merit

**Diagram**: ครบทั้ง 2 scenarios + 5 events listed

**Coverage**: ครบ ไม่มี gap

---

### CG-03-04 Manage Employee Movement (4/4) ✅

**PDF**: `5_..._04_Manage Employee Movement_V0.02.pdf` — 4 topics:
1. ✅ Transfer within Company (no SSO change)
2. ✅ Transfer within Company (with SSO change)
3. ✅ Promotion / Demotion
4. ✅ Transfer Across Company

**Coverage**: ครบ ไม่มี gap

---

### CG-03-04 Acting Assignment (2/2) ✅

**PDF**: `9_..._08_Acting Assignment_V0.02.pdf` — 2 topics:
1. ✅ Add Concurrent Employment (Acting = Concurrent, Pay Group 99)
2. ✅ End of Acting (TERM_ENDASSIGN)

**Coverage**: ครบ ไม่มี gap

---

### CG-03-05 Manage Termination (5/8) 🔴

**PDF**: `11_..._10_Terminate_V0.02.pdf` — 8 sub-scenarios:

| # | PDF Sub-scenario | Diagram | Status |
|---|---|---|---|
| 1 | Resignation (TERM_RESIGN) | ✅ explicit | Covered |
| 2 | Dismissal (TERM_DISMIS) + 3-step workflow | ✅ explicit + P1 fix section | Covered |
| 3 | Passed Away | ✅ "Also: ... Passed Away" | Covered |
| 4 | Termination No Show | ✅ "No Show: purge Employee ID" | Covered |
| 5 | Resignation w/ NO ok to rehire (Black List) | ✅ "OK to Rehire = No → permanent blacklist" | Covered |
| 6 | **Change Termination Date** | 🔴 ไม่พบ | **MISSING** |
| 7 | **Reverse Termination Date** | 🔴 ไม่พบ | **MISSING** |
| 8 | **Rehiring with no ok to rehire flag** (verification) | 🔴 ไม่พบ scenario flow | **MISSING** |

**Note**: Diagram label "8 termination types" ตัวเลขใกล้เคียงแต่ enumerate ไม่ครบ — Change Term Date + Reverse Term Date + Rehire-blocked-verification ขาด

**Source citation**: `11_..._10_Terminate_V0.02.pdf` — TOC แบ่ง 8 sub-scenarios

---

### CG-03-06 Manage Contract Renewal (1/1) ✅

**PDF**: `10_..._09_Manage Contract Renewal_V0.02.pdf`
- 1 topic: Extend Contract (Event = Data Change, Reason = Extend Contract)

**Diagram**: ✅ explicit

---

### CG-03-06 Manage Suspension (2/2) ✅

**PDF**: `8_..._07_Manage Suspension_V0.02.pdf`
- ✅ Suspension (DIFFERENT path: Employment Info > Job Info > History > Insert New Record)
- ✅ Return from Suspension

**Coverage**: ครบ + path UI explicit

---

### CG-03-06 Manage Change Employee Type (2/5) 🔴

**PDF**: `7_..._06_Manage Change Emp Type_V0.02.pdf` — 5 topics:

| # | PDF Topic | Diagram | Status |
|---|---|---|---|
| 1 | Manage Change Employee Type (JCHG_EMPTYPE) | ✅ explicit | Covered |
| 2 | **Extend Retirement** | 🔴 ไม่พบ | **MISSING** |
| 3 | Change in Time | ✅ explicit | Covered |
| 4 | **Change in Pay** | 🔴 ไม่พบ explicit (อาจซ้อนกับ Pay Rate?) | **MISSING** |
| 5 | **Data Change** (other reasons) | 🔴 ไม่พบ enumeration | **MISSING** |

**Gap**: Extend Retirement event ขาด (สำคัญสำหรับ HR ops), Change in Pay ไม่ชัดว่าซ้อนกับ CG-03-03 Pay Rate หรือไม่ — ต้อง disambiguate

---

### EC Report (22/23 + 5/5 categories) ⚠️

**PDF**: `12_..._11_EC Report_V0.02.pdf` — Report Centre + Standard Reports

**Categories cross-check**:

| Category | PDF count | Diagram count | Status |
|---|---|---|---|
| Position Mgmt | 1 | 1 (Position Overview) | ✅ |
| Personal Info | 7 | 5 (Birthday, Address, Dependents, Emergency, Work Eligibility) | ⚠️ list ไม่ครบ |
| Compensation | 2 | 2 (Payment Info, Pay Range) | ✅ |
| Employment | 10 | 8 (Hierarchy, Movements, Multi-Emp, Turnover, Headcount, etc.) | ⚠️ list ไม่ครบ |
| Workflow | 3 | 3 (Activity Log, Open Requests, Stats) | ✅ |
| **Total Basic** | **23** | **22** | ⚠️ off-by-1 |
| **Total Advanced** | (PDF ไม่ enumerate) | 8 | — |

**Gap**: ตัวเลข 22 vs 23 (off-by-1) + รายชื่อ report ใน Personal Info และ Employment ไม่ครบทั้งหมด แต่ category coverage ครบ 5/5

---

## EX-005 Invented Features Check ✅

**Scan keywords**: AI, Smart, OCR, Biometric, Wizard, Drag-drop, Drag-and-drop, ML, Machine Learning, NLP, Auto-suggest, Predict

**Findings**:
- ❌ **AI** hits — ทั้งหมดเป็น **substring false positives** (FAIL, DETAIL, Maintain, Email, Phone) ไม่ใช่ AI feature จริง
- ✅ **Wizard** hit — "4-step wizard" สำหรับ Hire flow → **GROUNDED**: SF EC Standard UI "Hire New Employee" ใช้ wizard pattern จริงตาม PDF
- ❌ **OCR / Biometric / Smart / ML / NLP / Auto-suggest / Predict** — ไม่พบ

**Conclusion**: ✅ **Clean** — ไม่มี invented feature ใน diagram

---

## Gap List สรุป (เรียงตามความสำคัญ)

### 🔴 Critical (operational scenarios ขาด)
1. **CG-03-05** Change Termination Date scenario
2. **CG-03-05** Reverse Termination Date scenario
3. **CG-03-05** Rehiring with no ok to rehire flag (verification flow)
4. **CG-03-06** Extend Retirement event
5. **CG-03-06** Change in Pay vs Pay Rate Change disambiguation
6. **CG-03-06** Data Change reasons (other than Contract Renewal/Change in Time)

### ⚠️ Medium (enumeration ขาด — มี generic แต่ไม่ enumerate)
7. **CG-03-03** Profile sub-sections × 9 (Education, Work Exp Within, Languages, Certifications, Honours, Disciplinary, Salary History, Previous Employment, Learning History)
8. **CG-03-03** Dependents (Personal Info)

### 🟡 Low (count discrepancy)
9. **EC Report** Basic templates count (diagram = 22, PDF = 23 → off-by-1)
10. **EC Report** Personal Info + Employment report lists ไม่ครบ (5/7 และ 8/10)

---

## หมายเหตุท้ายไฟล์

- **C8 Compliance**: ทุก gap trace กลับ EC-Core PDF source แล้ว ไม่มี cross-contamination จาก BE/TM/PY
- **EX-005 Compliance**: Clean — diagram ไม่มี invented features
- **Coverage methodology**: Topic-level (sub-scenario / event reason / report template) ไม่ใช่ field-level — field-level audit เป็น scope แยก
- **ห้าม propose fix**: ตาม spec — review นี้ส่ง gap list ให้ PO ตัดสินใจว่าจะให้ Designer/Builder revise diagram หรือไม่

**Reviewer**: JARVIS (Claude Opus 4.6)
**Time spent**: ~12 min (PDF read + diagram parse + cross-ref)
