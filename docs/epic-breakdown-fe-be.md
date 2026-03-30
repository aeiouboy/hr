# Epic Breakdown — HR Solution (FE/BE Split)

> 369 User Stories จาก `User_Stories_HR_Solution.xlsx` แบ่งเป็น 9 Epics
> แต่ละ Epic แบ่ง Story เป็น **Platform (BE)** / **Frontend (FE)** / **Integration** / **Report**

---

## สารบัญ

| # | Epic | Stories | High | Medium | Low |
|---|------|---------|------|--------|-----|
| 1 | [Employee Central](#epic-1-employee-central) | 54 | 5 | 14 | 35 |
| 2 | [Payroll](#epic-2-payroll) | 58 | 4 | 10 | 44 |
| 3 | [Time Management](#epic-3-time-management) | 21 | 5 | 10 | 6 |
| 4 | [Compensation & Benefits](#epic-4-compensation--benefits) | 35 | 5 | 12 | 18 |
| 5 | [Self Service (ESS/MSS)](#epic-5-self-service-essmss) | 27 | 5 | 9 | 13 |
| 6 | [Performance Management](#epic-6-performance-management) | 41 | 5 | 9 | 27 |
| 7 | [Talent Management](#epic-7-talent-management) | 29 | 5 | 7 | 17 |
| 8 | [Learning Management](#epic-8-learning-management) | 48 | 5 | 9 | 34 |
| 9 | [E-Recruitment](#epic-9-e-recruitment) | 56 | 5 | 12 | 39 |
| | **Total** | **369** | **44** | **92** | **233** |

---

## Epic 1: Employee Central

**54 stories** | ข้อมูลองค์กร, ข้อมูลพนักงาน, การโยกย้าย, วางแผนอัตรากำลัง, รายงาน

### Feature 1.1: Organization Structure (15 stories)

#### BE Stories (API + Database)

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-1.1.1 | US-1EC-001 | High | 5 | **Multi-company / Multi-BU data model** — DB schema รองรับ business group, matrix org, international structure |
| BE-1.1.2 | US-1EC-002 | High | 5 | **Org-Cost Center linking API** — ผูก org unit กับ cost center, CRUD endpoints |
| BE-1.1.3 | US-1EC-003 | High | 5 | **Org hierarchy API** — Direct line / Dotted line across BU, tree query |
| BE-1.1.4 | US-1EC-005 | High | 5 | **Job layer API** — Job name layering, CRUD |
| BE-1.1.5 | US-1EC-006 | Medium | 5 | **Position layer API** — Position name layering, CRUD |
| BE-1.1.6 | US-1EC-007 | Medium | 8 | **RBAC by dimension** — Security: by Company, Payroll Group, Job Grade, People Group, Org |
| BE-1.1.7 | US-1EC-008 | Medium | 5 | **Auto-assign responsibility** — Assign responsibility by work structure automatically |
| BE-1.1.8 | US-1EC-009 | Medium | 5 | **Location API** — Location of work, headcount by location |
| BE-1.1.9 | US-1EC-010 | Medium | 3 | **Budget API** — Include budgeting in org structure |
| BE-1.1.10 | US-1EC-011 | Medium | 3 | **Auto budget calculation** — Auto-calculate budget on org change/simulation |
| BE-1.1.11 | US-1EC-012 | Medium | 3 | **Location zone API** — Location by business zone, link to Comp&Ben module |
| BE-1.1.12 | US-1EC-013 | Medium | 5 | **People group API** — Employee grouping (Officer, Staff, Dept Manager, etc.) |
| BE-1.1.13 | US-1EC-014 | Medium | 5 | **Standardized job structure** — Standard Org/Position/Job across all BUs |
| BE-1.1.14 | US-1EC-015 | Medium | 5 | **Mass update API** — Bulk update org structure, employee profile, assignment |

#### FE Stories (UI)

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-1.1.1 | US-1EC-001 | High | 5 | **Multi-company org chart UI** — แสดงผังองค์กรแบบ multi-BU, matrix view |
| FE-1.1.2 | US-1EC-002 | High | 5 | **Org chart + cost center view** — แสดง cost center ในผังองค์กร |
| FE-1.1.3 | US-1EC-003 | High | 5 | **Direct/Dotted line visualization** — แสดงเส้นสายบังคับบัญชา solid/dashed |
| FE-1.1.4 | US-1EC-004 | High | 5 | **Org chart management UI** — Move, Add, Revise, Simulation + Print/Export |
| FE-1.1.5 | US-1EC-009 | Medium | 5 | **Location management page** — แสดง headcount by location |
| FE-1.1.6 | US-1EC-013 | Medium | 5 | **People group filter** — กรอง/แสดงพนักงานตาม people group |
| FE-1.1.7 | US-1EC-015 | Medium | 5 | **Mass update UI** — Upload Excel สำหรับ bulk update |

---

### Feature 1.2: Employee Information (15 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-1.2.1 | US-1EC-016 | Low | 5 | **Employee type-category linking** — DB relationship: type ↔ category |
| BE-1.2.2 | US-1EC-017 | Low | 5 | **Multi employee type support** — Full Time, Part Time, Expat, Contract |
| BE-1.2.3 | US-1EC-018 | Low | 5 | **Employee category support** — FT-monthly, PT-vocational (DS), PT-daily/hourly/monthly |
| BE-1.2.4 | US-1EC-019 | Low | 5 | **Job description API** — Setup JD with qualifications |
| BE-1.2.5 | US-1EC-020 | Low | 5 | **Probation & notice period API** — Rules by position level, job type, org structure |
| BE-1.2.6 | US-1EC-021 | Low | 5 | **Personal info API** — คำนำหน้า, ชื่อ, ที่อยู่, การศึกษา, ข้อมูลความดี-ผิด |
| BE-1.2.7 | US-1EC-022 | Low | 5 | **Assignment API** — CRUD assignment (Org=BU+Branch+Position+Group+Job), history |
| BE-1.2.8 | US-1EC-023 | Low | 5 | **Emergency contact API** — ชื่อ, ความสัมพันธ์, ที่อยู่, เบอร์ติดต่อ |
| BE-1.2.9 | US-1EC-024 | Low | 5 | **Probation evaluation API** — ผู้ประเมิน, วันเริ่ม-สิ้นสุด, ผลประเมิน |
| BE-1.2.10 | US-1EC-025 | Low | 8 | **Resignation API** — บันทึก/reverse ลาออก, เหตุผล, วันอนุมัติ |
| BE-1.2.11 | US-1EC-026 | Low | 8 | **Additional personal info API** — Health info, payroll info, company asset, previous employment |
| BE-1.2.12 | US-1EC-028 | Low | 3 | **Previous employment API** — ประวัติการจ้างงานก่อนเข้าทำงาน |
| BE-1.2.13 | US-1EC-030 | Low | 5 | **Employee search engine** — Search by function, job family, education, age, etc. |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-1.2.1 | US-1EC-021 | Low | 5 | **Personal info form** — ฟอร์มข้อมูลส่วนตัว (คำนำหน้า, ชื่อ, ที่อยู่, การศึกษา) |
| FE-1.2.2 | US-1EC-023 | Low | 5 | **Emergency contact form** — ฟอร์มผู้ติดต่อฉุกเฉิน |
| FE-1.2.3 | US-1EC-027 | Low | 5 | **Configurable employee screen** — ปรับเปลี่ยนหน้าจอ เปิด/ปิด field ได้เอง |
| FE-1.2.4 | US-1EC-029 | Low | 3 | **Tenure display page** — แสดง year in service, year in level, year in position |
| FE-1.2.5 | US-1EC-030 | Low | 5 | **Advanced search UI** — Search engine: function, job family, education, age |

---

### Feature 1.3: Employee Movement (4 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-1.3.1 | US-1EC-031 | Low | 5 | **Supervisor auto-assignment** — พนักงานต้องมี supervisor เสมอ, auto-fill เมื่อ supervisor ลาออก |
| BE-1.3.2 | US-1EC-032 | Low | 8 | **Rehire API** — กลับเข้าทำงานใหม่: ใช้รหัสเดิม หรือ รหัสใหม่ + ดูประวัติเก่า |
| BE-1.3.3 | US-1EC-033 | Low | 5 | **Cross-company transfer** — Transfer ข้ามบริษัท, เก็บประวัติย้อนหลัง |
| BE-1.3.4 | US-1EC-034 | Low | 5 | **Multi-company employee ID** — รองรับรหัสพนักงานข้าม Central Group |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-1.3.1 | US-1EC-032 | Low | 8 | **Rehire UI** — หน้าจอ rehire พร้อม demo condition |
| FE-1.3.2 | US-1EC-033 | Low | 5 | **Employee history timeline** — แสดงประวัติแม้ลาออก/ย้ายบริษัท |

---

### Feature 1.4: Workforce Planning (7 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-1.4.1 | US-1EC-035 | Low | 5 | **Probation workflow engine** — Workflow สำหรับกระบวนการทดลองงาน |
| BE-1.4.2 | US-1EC-036 | Low | 8 | **Budget headcount API** — Setup by BU, level, org, job position, grade |
| BE-1.4.3 | US-1EC-037 | Low | 5 | **Multi cost center** — ชื่อแผนกเดียวกัน cost center ต่างกัน |
| BE-1.4.4 | US-1EC-038 | Low | 5 | **Multi payroll account** — รองรับ account ที่ต่างกันตาม legacy finance system |
| BE-1.4.5 | US-1EC-039 | Low | 3 | **National identifier** — รองรับทั้งคนไทยและต่างชาติ |
| BE-1.4.6 | US-1EC-041 | Low | 5 | **Transfer workflow** — Workflow โอนย้าย: ต้นสังกัด → สังกัดใหม่ approve + ตรวจ budget |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-1.4.1 | US-1EC-040 | Low | 5 | **Resign checklist UI** — Checklist: ทรัพย์สิน, เงินคงค้าง, สัญญา, exit interview |

---

### Feature 1.5: Reports (13 stories)

#### BE Stories (Report API + Data Export)

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-1.5.1 | US-1EC-042 | Low | 5 | **Certificate/letter generation API** — หนังสือรับรอง, จดหมายแสดงความยินดี, สวัสดิการ (per-company template) |
| BE-1.5.2 | US-1EC-043 | Low | 5 | **Ad-hoc report engine** — Custom report builder with graph support |
| BE-1.5.3 | US-1EC-044 | Low | 5 | **Manpower report API** — Headcount report |
| BE-1.5.4 | US-1EC-045 | Low | 5 | **Turnover report API** — By division/function, graph, YoY comparison |
| BE-1.5.5 | US-1EC-046 | Low | 5 | **HR-to-financial comparison** — HR factor vs productivity, budget simulation |
| BE-1.5.6 | US-1EC-047 | Low | 3 | **Benchmark manpower API** — Cross function & BU, quarterly/yearly comparison |
| BE-1.5.7 | US-1EC-048 | Low | 5 | **Vacancy report API** — By condition |
| BE-1.5.8 | US-1EC-049 | Low | 3 | **Movement report API** — Promotion, Transfer, SA by condition |
| BE-1.5.9 | US-1EC-050 | Low | 3 | **Income & benefit report** — By JG/Position/Level/Group |
| BE-1.5.10 | US-1EC-051 | Low | 5 | **FTE report API** — FTE by condition |
| BE-1.5.11 | US-1EC-052 | Low | 3 | **Workforce reporting tool** — Complete picture + data for partners/government |
| BE-1.5.12 | US-1EC-053 | Low | 5 | **Employee movement export** — Export from other systems → CG HRIS |
| BE-1.5.13 | US-1EC-054 | Low | 3 | **Terminated employee report** — รายชื่อพนักงานที่พ้นสภาพ |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-1.5.1 | US-1EC-043 | Low | 5 | **Report builder UI** — Ad-hoc report with drag-and-drop, graph visualization |
| FE-1.5.2 | US-1EC-045 | Low | 5 | **Turnover dashboard** — Graph comparing this year vs last year |
| FE-1.5.3 | US-1EC-046 | Low | 5 | **HR productivity dashboard** — HR factor vs financial performance simulation |

---

## Epic 2: Payroll

**58 stories** | Setup เงินเดือน, ภาษี, ประกันสังคม, กองทุน, คำนวณ, รายงานส่งรัฐ

### Feature 2.1: Payroll Setup & Configuration (15 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-2.1.1 | US-2PY-001 | High | 5 | **Company payroll master** — ชื่อบริษัท, ที่อยู่, เลขภาษี, เลข ปกส., บัญชีเงินเดือน, ชื่อย่อ |
| BE-2.1.2 | US-2PY-002 | High | 8 | **Payment period API** — รหัสงวด, ชื่อไทย/อังกฤษ, ครั้ง/ปี, วันที่จ่าย |
| BE-2.1.3 | US-2PY-003 | High | 5 | **Multi-period payment** — จ่ายเงินได้มากกว่า 1 งวด ใน 1 วัน |
| BE-2.1.4 | US-2PY-004 | High | 5 | **Tax table API** — ขั้นเงินได้, อัตราภาษี, ภาษีสะสม |
| BE-2.1.5 | US-2PY-005 | High | 5 | **Tax exemption API** — ค่าลดหย่อนตาม ภ.ง.ด. 90, 91 |
| BE-2.1.6 | US-2PY-006 | Medium | 5 | **Social security API** — อัตราหักลูกจ้าง/นายจ้าง, ฐานค่าจ้างต่ำสุด-สูงสุด |
| BE-2.1.7 | US-2PY-007 | Medium | 5 | **Provident fund setup** — อายุงาน, % หักพนักงาน/บริษัท, เงินได้ที่นำมาหัก |
| BE-2.1.8 | US-2PY-008 | Medium | 8 | **Earning & deduction setup** — 300+ codes, อายุงาน, %, เงินได้ที่นำมาหัก |
| BE-2.1.9 | US-2PY-009 | Medium | 3 | **Pro-rate calculation** — เงื่อนไขเงินได้ตามสัดส่วน |
| BE-2.1.10 | US-2PY-013 | Medium | 3 | **Working hour config** — ชั่วโมงทำงาน/วัน by Company/หน้าร้าน/หลังร้าน |
| BE-2.1.11 | US-2PY-014 | Medium | 5 | **Multi-bank payment** — Setup >1 bank, แบ่ง % จ่าย |
| BE-2.1.12 | US-2PY-056 | Low | 5 | **Employee payroll info** — เลขบัญชี, ข้อมูลสะสม, ค่าลดหย่อน, ประกันชีวิต |
| BE-2.1.13 | US-2PY-025 | Low | 5 | **Payroll security** — กำหนดสิทธิ์: BU, โครงสร้าง, พนักงาน, เงินได้/หัก |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-2.1.1 | US-2PY-001~008 | High | 8 | **Payroll setup wizard** — Tax table, SSO, provident fund, earning/deduction UI |
| FE-2.1.2 | US-2PY-014 | Medium | 5 | **Multi-bank config UI** — Setup หลาย bank + แบ่ง % |

---

### Feature 2.2: Salary & Calculation (10 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-2.2.1 | US-2PY-012 | Medium | 8 | **Salary calculation engine** — สูตร: (เงินเดือน/30/ชม.ทำงาน)*ชม.ลา หรือ /30*วันลา |
| BE-2.2.2 | US-2PY-010 | Medium | 5 | **Resign auto-stop** — ใส่วันลาออก → เงินได้ทุกประเภทไม่จ่ายเกินวัน |
| BE-2.2.3 | US-2PY-011 | Medium | 5 | **Provident fund calc** — หักพนักงาน + สมทบบริษัท, setup ครั้งเดียวใช้ทุก BU |
| BE-2.2.4 | US-2PY-015 | Medium | 5 | **Salary adjustment API** — ปรับเพิ่ม/ลด + วันที่มีผล + เหตุผล + upload Excel |
| BE-2.2.5 | US-2PY-016 | Low | 5 | **Retroactive payment** — คำนวณจ่ายย้อนหลัง |
| BE-2.2.6 | US-2PY-017 | Low | 8 | **Deduction processing** — Import เงินหักประจำงวด, ยกเลิก import, recurring deduction |
| BE-2.2.7 | US-2PY-018 | Low | 5 | **Non-taxable benefits** — Benefits รวมแต่ไม่คิดภาษี (recurring/non-recurring) |
| BE-2.2.8 | US-2PY-019 | Low | 3 | **Retirement tax calc** — คำนวณภาษีเฉพาะเงินได้ตอนเกษียณ |
| BE-2.2.9 | US-2PY-022 | Low | 8 | **Mid-month hire SSO calc** — คำนวณ ปกส. สำหรับพนักงานเข้าใหม่ปลายเดือน |
| BE-2.2.10 | US-2PY-050 | Low | 3 | **Hour-based time calc** — รองรับฐาน 60/100 |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-2.2.1 | US-2PY-015 | Medium | 5 | **Salary adjustment UI** — ฟอร์มปรับเงิน + upload Excel |
| FE-2.2.2 | US-2PY-057 | Low | 5 | **Salary history page** — ประวัติเงินเดือน + เหตุผลปรับ + approval |

---

### Feature 2.3: Payroll Processing & Validation (7 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-2.3.1 | US-2PY-021 | Low | 5 | **Anomaly detection** — Export รายการผิดปกติ: in-active มี transaction, เงินติดลบ |
| BE-2.3.2 | US-2PY-026 | Low | 3 | **Pay verification** — ตรวจ net income ผิดปกติภายใต้ % ที่กำหนด |
| BE-2.3.3 | US-2PY-042 | Low | 5 | **Payroll checklist engine** — Checklist process + alert ขั้นตอนที่ติดปัญหา |
| BE-2.3.4 | US-2PY-043 | Low | 5 | **Anomaly report** — ตรวจยอดจ่ายผิดปกติตามเงื่อนไข |
| BE-2.3.5 | US-2PY-047 | Low | 3 | **Audit trail** — User ที่แก้ไข + วัน-เวลา |
| BE-2.3.6 | US-2PY-029 | Low | 5 | **Transfer payroll data** — โอนย้ายข้ามบริษัท: เวลา, ลา, เงินเดือน, สวัสดิการ |
| BE-2.3.7 | US-2PY-030 | Low | 5 | **Employee data cleansing** — ลบพนักงานไม่มี transaction / archive ที่มี |
| BE-2.3.8 | US-2PY-051 | Low | 5 | **Payroll alert engine** — Alert: ลาซ้ำ, ลาเกินสิทธิ์, ลาวันหยุด, OT ผิดปกติ |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-2.3.1 | US-2PY-042 | Low | 5 | **Payroll processing dashboard** — Checklist view + status alerts |
| FE-2.3.2 | US-2PY-032 | Low | 3 | **Payslip online** — พิมพ์รายบุคคล/ตามแผนก/ตามรหัส |

---

### Feature 2.4: Government & Bank Integration (12 stories)

#### BE Stories (Integration/Export)

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-2.4.1 | US-2PY-023 | Low | 8 | **Tax report generation** — ภ.ง.ด. 1, ภ.ง.ด. 1ก, submit to สรรพากร |
| BE-2.4.2 | US-2PY-024 | Low | 5 | **Bank/SSO/Fund data pack** — Text file: เงินเดือน, ประกันสังคม, กองทุน |
| BE-2.4.3 | US-2PY-027 | Low | 5 | **Bank text file export** — กรุงเทพ, กสิกรไทย format |
| BE-2.4.4 | US-2PY-028 | Low | 5 | **Finance text file export** — Payroll, loan, สหกรณ์, กรมบังคับคดี, สรรพากร |
| BE-2.4.5 | US-2PY-033 | Low | 5 | **Bank file format (extended)** — รองรับ format ตามธนาคารกำหนด |
| BE-2.4.6 | US-2PY-034 | Low | 5 | **SSO file submission** — สปส 1-10, สปส 1-10-1 ตาม format ที่กำหนด |
| BE-2.4.7 | US-2PY-031 | Low | 3 | **Foreign employee tax** — ยื่นภาษีพนักงานต่างชาติ |
| BE-2.4.8 | US-2PY-058 | Low | 5 | **Ministry of Labor reports** — สปส, แจ้งเข้า-ออก |
| BE-2.4.9 | US-2PY-040 | Low | 3 | **Compensation fund report** — กท.20 |

---

### Feature 2.5: Payroll Reports (14 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-2.5.1 | US-2PY-020 | Low | 5 | **Retirement budget estimation** — รายงานผู้เกษียณ + คำนวณเงิน + ภาษี ล่วงหน้า |
| BE-2.5.2 | US-2PY-035 | Low | 5 | **Master file report** — รายได้/รายหักทั้งหมด 1 คน/1 บรรทัด แยกฝ่าย/แผนก |
| BE-2.5.3 | US-2PY-036 | Low | 3 | **Home loan report** — จ่ายเงินกู้ ธ.อ.ส. แยกตามธนาคาร |
| BE-2.5.4 | US-2PY-037 | Low | 3 | **Emergency loan report** — เงินกู้บริษัท |
| BE-2.5.5 | US-2PY-038 | Low | 3 | **Resigned employee salary report** — รายได้/รายหัก ของพนง.ลาออก รายเดือน |
| BE-2.5.6 | US-2PY-039 | Low | 5 | **Withholding tax cert** — หนังสือรับรองหักภาษี สำหรับออกระหว่างเดือน |
| BE-2.5.7 | US-2PY-041 | Low | 3 | **Reconcile report** — กระทบยอดการจ่าย |
| BE-2.5.8 | US-2PY-044 | Low | 3 | **Allowance export** — Fixed allowance + เริ่มต้น, สิ้นสุด, เงื่อนไข |
| BE-2.5.9 | US-2PY-045 | Low | 3 | **SSO group export** — แยกกลุ่มจ่าย/ไม่จ่าย ปกส. |
| BE-2.5.10 | US-2PY-046 | Low | 3 | **Tax reconciliation** — ภงด 1/1ก กระทบยอดภาษีย้อนหลัง |
| BE-2.5.11 | US-2PY-048 | Low | 3 | **Custom report builder** — Develop report ตามสิทธิ์ |
| BE-2.5.12 | US-2PY-049 | Low | 3 | **Loan balance report** — ยอดคงเหลือเงินกู้สวัสดิการ |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-2.5.1 | US-2PY-043 | Low | 5 | **Report export UI** — Export: Excel, Text, PDF, HTML |

---

### Feature 2.6: DVT Employee (4 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-2.6.1 | US-2PY-052 | Low | 3 | **DVT employee model** — พนักงานที่บริษัทส่งเสียค่าเล่าเรียน/ค่าเช่าบ้าน |
| BE-2.6.2 | US-2PY-053 | Low | 3 | **DVT cost center** — Setup cost center แยก (ลดหย่อน 200%) |
| BE-2.6.3 | US-2PY-054 | Low | 5 | **DVT benefit → payroll interface** — ค่าเล่าเรียน, ค่าหนังสือ → payroll |
| BE-2.6.4 | US-2PY-055 | Low | 5 | **DVT employee info** — รายละเอียดเหมือนพนักงาน + benefit ที่เบิก + วันที่เริ่มส่ง |

---

## Epic 3: Time Management

**21 stories** | กะทำงาน, OT, ลา, รูดบัตร, คำนวณเวลา

### Feature 3.1: Shift & Time Setup (6 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-3.1.1 | US-3TIME-001 | High | 5 | **Shift policy engine** — เงินได้ประจำกะ, เบี้ยเลี้ยงตามเงื่อนไข |
| BE-3.1.2 | US-3TIME-007 | Medium | 5 | **Work shift setup** — กะทำงาน + โอนย้ายกะเมื่อย้ายบริษัท |
| BE-3.1.3 | US-3TIME-008 | Medium | 5 | **Mass shift update API** — Bulk update กะการทำงาน |
| BE-3.1.4 | US-3TIME-012 | Medium | 5 | **OT type config** — วันนักขัตฤกษ์, ล่วงเวลาปกติ, วันหยุดกะ |
| BE-3.1.5 | US-3TIME-013 | Medium | 5 | **OT condition engine** — กำหนดเงื่อนไข + จำนวนชั่วโมง OT |
| BE-3.1.6 | US-3TIME-020 | Low | 8 | **Shift record API** — รองรับ >5,000 กะ, upload Excel, ไม่ซ้ำวันเดิม |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-3.1.1 | US-3TIME-007 | Medium | 5 | **Shift management UI** — ตั้งค่ากะ + assign พนักงาน |
| FE-3.1.2 | US-3TIME-008 | Medium | 5 | **Mass shift update UI** — Bulk upload กะทำงาน |

---

### Feature 3.2: Time Calculation & OT (7 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-3.2.1 | US-3TIME-002 | High | 8 | **OT calculation engine** — อัตราค่า OT ตามเงื่อนไข (ตามกฎหมายไทย) |
| BE-3.2.2 | US-3TIME-004 | High | 5 | **OT structure** — โครงสร้างเงินล่วงเวลา, มาตรฐานการจ่ายของไทย |
| BE-3.2.3 | US-3TIME-005 | High | 8 | **Time processing engine** — คำนวณจากเครื่องรูดบัตร, ประมวลผลมาทำงาน, ลา, OT, โอนย้าย |
| BE-3.2.4 | US-3TIME-010 | Medium | 8 | **Time attendance import** — Import: เวลาทำงาน, ลาทุกประเภท, time reconciliation |
| BE-3.2.5 | US-3TIME-017 | Low | 3 | **Cross-day OT calc** — กะข้ามวัน, OT ข้ามวัน |
| BE-3.2.6 | US-3TIME-019 | Low | 5 | **Auto sick leave conversion** — ลาป่วยเกิน 30 วัน → ลาไม่จ่ายเงินอัตโนมัติ |

---

### Feature 3.3: Leave Configuration (2 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-3.3.1 | US-3TIME-003 | High | 5 | **Leave condition engine** — ลากิจ/ป่วย/พักร้อน: หัก/ไม่หักเงิน, limit, ผูก payroll + gov report |
| BE-3.3.2 | US-3TIME-006 | Medium | 8 | **Leave condition setup API** — Setup เงื่อนไขการลาทุกประเภท |

---

### Feature 3.4: Time Reports & Alerts (6 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-3.4.1 | US-3TIME-009 | Medium | 3 | **Attendance scoring** — คิดคะแนนขาด/ลา/มาสาย + สรุปผล |
| BE-3.4.2 | US-3TIME-015 | Medium | 5 | **Time anomaly detection** — ตรวจสอบเวลาผิดปกติ + รายงาน |
| BE-3.4.3 | US-3TIME-016 | Low | 5 | **OT summary report** — สรุป OT ตามแผนก/ฝ่าย/พนักงาน/ช่วงเวลา |
| BE-3.4.4 | US-3TIME-018 | Low | 5 | **3-day absence alert** — แจ้งเตือนหัวหน้าเมื่อพนักงานไม่รูดบัตร 3 วันติด |
| BE-3.4.5 | US-3TIME-021 | Low | 5 | **Attendance vs leave check** — ลาออกมีรูดบัตร, ลาพักร้อนเป็นชม., ลาวันหยุด |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-3.4.1 | US-3TIME-011 | Medium | 5 | **Time performance report** — พิมพ์ใบสรุปคะแนนปฏิบัติงาน (Auto to PMS) |
| FE-3.4.2 | US-3TIME-014 | Medium | 5 | **Shift change viewer** — ดูข้อมูลเปลี่ยนเวร: วันที่, ชม., พนักงานแทน |

---

## Epic 4: Compensation & Benefits

**35 stories** | สวัสดิการ, เงินกู้, โครงสร้างเงินเดือน, Merit & Bonus, Budget

### Feature 4.1: Benefit Planning (9 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-4.1.1 | US-4BENEFIT-001 | High | 8 | **Benefit setup engine** — สิทธิ์ตาม Job Grade + People Group, แบ่ง Recurring/Non-Recurring |
| BE-4.1.2 | US-4BENEFIT-002 | High | 5 | **Loan type API** — เงินกู้บริษัท, ธอส., ประกันพนง., ซื้อรถ (≥4 บัญชี) |
| BE-4.1.3 | US-4BENEFIT-004 | High | 3 | **Flexible benefit API** — ให้พนักงานเลือก package เอง |
| BE-4.1.4 | US-4BENEFIT-005 | High | 5 | **Reimbursement tracking** — ประวัติการเบิก, วงเงินตามสิทธิ์, แจ้งเตือนเกิน/เหลือ |
| BE-4.1.5 | US-4BENEFIT-008 | Medium | 3 | **Benefit keyword standardization** — Keyword เดียวกันทุก BG |
| BE-4.1.6 | US-4BENEFIT-009 | Medium | 5 | **Travel cost calculator** — คำนวณระยะทางต้นทาง-ปลายทาง → จำนวนเงิน |
| BE-4.1.7 | US-4BENEFIT-032 | Low | 5 | **Benefit reminder engine** — แจ้งเตือน: อายุงานครบ 1 ปี → สิทธิ์กองทุน |
| BE-4.1.8 | US-4BENEFIT-034 | Low | 5 | **Provident fund self-service** — เลือก contribution rate สูงกว่าบริษัท, เปลี่ยนแผน |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-4.1.1 | US-4BENEFIT-003 | High | 3 | **Benefit claim UI (self-service)** — พนักงาน key เบิก benefit ผ่าน HRMS |
| FE-4.1.2 | US-4BENEFIT-005 | High | 5 | **Benefit balance dashboard** — แสดงสิทธิ์/ประวัติเบิก/วงเงินคงเหลือ |
| FE-4.1.3 | US-4BENEFIT-013 | Medium | 3 | **Medical claim self-service** — เรียกดู + พิมพ์ใบส่งตัว + วงเงินคงเหลือ |

---

### Feature 4.2: Budgeting (5 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-4.2.1 | US-4BENEFIT-010 | Medium | 5 | **Benefit budget auto-update** — Auto update จำนวนผู้มีสิทธิ์ + ตั้ง/จ่าย/ตัด budget |
| BE-4.2.2 | US-4BENEFIT-011 | Medium | 5 | **FAST integration** — ส่ง budget planning เข้า FAST + ดูสถิติการใช้ |
| BE-4.2.3 | US-4BENEFIT-012 | Medium | 5 | **Merit/Bonus budget estimation** — Generate ผู้มีสิทธิ์ + % ขึ้น + estimate budget |
| BE-4.2.4 | US-4BENEFIT-013 | Medium | 5 | **Annual personnel budget** — คำนวณ Payroll, OT, Bonus, Provident Fund |
| BE-4.2.5 | US-4BENEFIT-014 | Medium | 5 | **Budget vs actual analytics** — เปรียบเทียบ by Month, Department, YTD |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-4.2.1 | US-4BENEFIT-014 | Medium | 5 | **Budget analytics dashboard** — Budget vs Actual: monthly, dept, YTD chart |

---

### Feature 4.3: Compensation Administration (4 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-4.3.1 | US-4BENEFIT-015 | Medium | 5 | **Bell curve grouping** — จำแนกพนักงานตามเงื่อนไข HR สำหรับ bell curve |
| BE-4.3.2 | US-4BENEFIT-016 | Low | 3 | **Pay scenario support** — Taxable, Non-taxable, Company-taxable |
| BE-4.3.3 | US-4BENEFIT-017 | Low | 3 | **Compensation policy API** — แสดง policy by BGs |
| BE-4.3.4 | US-4BENEFIT-020 | Low | 3 | **International compensation** — รองรับค่าตอบแทนต่างประเทศ |

---

### Feature 4.4: Salary Structure (5 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-4.4.1 | US-4BENEFIT-021 | Low | 8 | **Salary structure engine** — Quartile/Percentile comparison, simulate structure |
| BE-4.4.2 | US-4BENEFIT-022 | Low | 3 | **SA/Bonus simulation** — Simulation การปรับ SA, Annual SA, Bonus |
| BE-4.4.3 | US-4BENEFIT-023 | Low | 5 | **Zone/percentile ranking** — แบ่ง zone 1/2/3 + ลำดับ percentile |
| BE-4.4.4 | US-4BENEFIT-025 | Low | 3 | **Peer salary comparison** — เปรียบเทียบ % ระหว่าง peer |
| BE-4.4.5 | US-4BENEFIT-026 | Low | 8 | **Manager salary view** — Line manager ดูเงินเดือนลูกน้องเทียบโครงสร้าง |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-4.4.1 | US-4BENEFIT-021 | Low | 8 | **Salary structure chart** — Quartile/percentile visualization + simulation |
| FE-4.4.2 | US-4BENEFIT-026 | Low | 8 | **Manager comp comparison UI** — ดูเงินเดือนลูกน้อง vs โครงสร้าง |

---

### Feature 4.5: Merit & Bonus (5 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-4.5.1 | US-4BENEFIT-027 | Low | 8 | **Salary adjustment engine** — ปรับ %, จำนวนเงิน, mid point, compa ratio |
| BE-4.5.2 | US-4BENEFIT-028 | Low | 5 | **Merit/Bonus calculation** — คำนวณตามสิทธิ์นโยบาย, เงื่อนไขประเมินผล, อายุงาน |
| BE-4.5.3 | US-4BENEFIT-029 | Low | 3 | **BG merit/bonus template** — Standard template by BG |
| BE-4.5.4 | US-4BENEFIT-031 | Low | 3 | **Bonus month calculation** — คำนวณจำนวนเดือนโบนัส |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-4.5.1 | US-4BENEFIT-030 | Low | 3 | **Bell curve summary** — Manager ดึง summary นำเสนอ |

---

### Feature 4.6: Comp & Ben Reports (7 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-4.6.1 | US-4BENEFIT-006 | Medium | 3 | **Medical expense report** — ค่ารักษาพยาบาลรายคน/สาขา |
| BE-4.6.2 | US-4BENEFIT-007 | Medium | 3 | **Benefit allowance report** — ดึงข้อมูลทั้งบริษัท/แผนก |
| BE-4.6.3 | US-4BENEFIT-018 | Low | 5 | **Incentive report** — Total company by dept/individual + simulate policy change |
| BE-4.6.4 | US-4BENEFIT-019 | Low | 3 | **SA/Allowance report** — By Level, Dept, Monthly, JG, PG |
| BE-4.6.5 | US-4BENEFIT-024 | Low | 3 | **Average salary report** — By JG/PG for BG |
| BE-4.6.6 | US-4BENEFIT-033 | Low | 5 | **Report import/export** — ส่ง payroll/finance ตามเงื่อนไข |
| BE-4.6.7 | US-4BENEFIT-035 | Low | 3 | **Merit/Bonus letter** — พิมพ์จดหมายแจ้งปรับ ประจำปี/ระหว่างปี |

---

## Epic 5: Self Service (ESS/MSS)

**27 stories** | Employee Self-Service, Manager Self-Service, Career Planning

### Feature 5.1: Workflow Setup (1 story)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-5.1.1 | US-5ESS-001 | High | 5 | **Workflow engine setup** — Setup workflow ตามสายบังคับบัญชา |

---

### Feature 5.2: Employee Self-Service (13 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-5.2.1 | US-5ESS-002 | High | 8 | **Personal info update API** — แก้ไข: การศึกษา, คุณวุฒิ, สถานะ, ที่อยู่ + workflow approval |
| BE-5.2.2 | US-5ESS-003 | High | 8 | **Employee history API** — ประวัติ: เงินเดือน, competency, ลา, อบรม, ความดี-ความผิด |
| BE-5.2.3 | US-5ESS-004 | High | 5 | **Special Information Type (SIT)** — ข้อมูล SIT ที่พนักงานดู/สร้างเอง |
| BE-5.2.4 | US-5ESS-007 | Medium | 5 | **Leave request API** — ขาดงาน, ลาทุกประเภท, รับรองเวลา, ขอ OT, เบิก benefit |
| BE-5.2.5 | US-5ESS-008 | Medium | 3 | **Leave type support** — Sick, vacation, business, maternity/paternity, etc. |
| BE-5.2.6 | US-5ESS-009 | Medium | 3 | **Leave history API** — ประวัติการลาย้อนหลัง |
| BE-5.2.7 | US-5ESS-010 | Medium | 3 | **Leave balance warning** — Alert เมื่อ time exceed leave balance ตอน payroll |
| BE-5.2.8 | US-5ESS-011 | Medium | 3 | **Tax info self-edit** — พนักงานแก้ไขข้อมูลลดหย่อนภาษีเอง |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-5.2.1 | US-5ESS-002 | High | 8 | **Personal info edit form** — ฟอร์มแก้ไขข้อมูลส่วนตัว + approval flow |
| FE-5.2.2 | US-5ESS-005 | High | 5 | **Payslip viewer** — ดู + พิมพ์สลิปเงินเดือน online |
| FE-5.2.3 | US-5ESS-006 | Medium | 3 | **Career path viewer** — พนักงาน FT ดู career path ของตัวเอง |
| FE-5.2.4 | US-5ESS-012 | Medium | 3 | **HR intranet / policy page** — ดู policy + ข้อมูล HR online |
| FE-5.2.5 | US-5ESS-013 | Medium | 3 | **Benefit balance + ใบส่งตัว** — ดู allowance + พิมพ์ใบส่งตัวรักษา |
| FE-5.2.6 | US-5ESS-014 | Medium | 3 | **Self-check time/leave/OT** — ตรวจสอบเวลา/ลา/OT โดยไม่ผ่าน ESC |

---

### Feature 5.3: Manager Self-Service (10 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-5.3.1 | US-5ESS-015 | Medium | 5 | **Manager hierarchy API** — แสดงรายชื่อลูกน้องตาม org structure |
| BE-5.3.2 | US-5ESS-016 | Low | 5 | **Work status change API** — แก้ไข location, shift ของลูกน้อง |
| BE-5.3.3 | US-5ESS-017 | Low | 3 | **Termination API** — หัวหน้าระบุสิ้นสุดการจ้างงาน |
| BE-5.3.4 | US-5ESS-018 | Low | 5 | **Manager leave approval** — อนุมัติ/ปฏิเสธลาผ่าน email |
| BE-5.3.5 | US-5ESS-019 | Low | 5 | **Delegate approval** — ส่งสิทธิ์อนุมัติให้ผู้อื่นเมื่อหัวหน้าไม่อยู่ |
| BE-5.3.6 | US-5ESS-020 | Low | 3 | **Mass approve API** — อนุมัติ OT/ลา หลายรายการพร้อมกัน via email |
| BE-5.3.7 | US-5ESS-022 | Low | 5 | **Vacation rules engine** — Auto-delegate + แจ้งเตือนลาทับซ้อน |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-5.3.1 | US-5ESS-015 | Medium | 5 | **Team view UI** — แสดง org + รายชื่อลูกน้อง |
| FE-5.3.2 | US-5ESS-021 | Low | 3 | **Approval tracking UI** — ดูรายการลาที่อนุมัติ/ไม่อนุมัติ |
| FE-5.3.3 | US-5ESS-023 | Low | 5 | **Employee monitoring dashboard** — ดูข้อมูลลูกน้อง: training, performance, วินัย |
| FE-5.3.4 | US-5ESS-024 | Low | 5 | **Manager leave keying** — หัวหน้าคีย์ลาแทนพนักงาน (สาขา) |

---

### Feature 5.4: Career Planning (3 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-5.4.1 | US-5ESS-025 | Low | 3 | **Career planning API** — หัวหน้าวางแผน career ให้พนักงาน individual |
| BE-5.4.2 | US-5ESS-026 | Low | 3 | **Performance self-eval** — ประเมินผลผ่าน self-service + เก็บประวัติ |
| BE-5.4.3 | US-5ESS-027 | Low | 3 | **Shift management (MSS)** — จัดการกะของลูกน้อง |

---

## Epic 6: Performance Management

**41 stories** | Performance review, KPI, Competency, Bell Curve, Merit & Bonus

### Feature 6.1: Performance Review Process (9 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-6.1.1 | US-6PMS-001 | High | 8 | **PMS security/responsibility** — สิทธิ์ตามสาย Direct/Dotted line |
| BE-6.1.2 | US-6PMS-002 | High | 5 | **Rating scale setup** — Numerical (1-10), KPI, G-BEST, Competency |
| BE-6.1.3 | US-6PMS-003 | High | 3 | **Section weighting** — กำหนด % น้ำหนัก (50/30/20) by BG |
| BE-6.1.4 | US-6PMS-004 | High | 8 | **Objective template** — Mass KPI/G-BEST for Front Office by BU/Position |
| BE-6.1.5 | US-6PMS-005 | High | 5 | **Competency template** — หลาย function: General, Management, Technical |
| BE-6.1.6 | US-6PMS-006 | Medium | 8 | **Appraisal template engine** — KPI/G-BEST/Competency by Job Grade |
| BE-6.1.7 | US-6PMS-007 | Medium | 8 | **Performance plan API** — แผนประเมินปี: เงื่อนไข, ช่วงเวลา, ผู้ประเมิน |
| BE-6.1.8 | US-6PMS-008 | Medium | 5 | **Performance data API** — เกรดประเมินตาม JG, PG, Hi-Po |
| BE-6.1.9 | US-6PMS-033 | Low | 5 | **Joint KPI API** — KPI ร่วมระหว่าง function + standard samples |

---

### Feature 6.2: Integrations & Analysis (8 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-6.2.1 | US-6PMS-009 | Medium | 5 | **Competency ↔ training link** — Competency topic setup กับ training course |
| BE-6.2.2 | US-6PMS-010 | Medium | 5 | **Bell curve engine** — ทดลองปรับ bell curve ตาม JG/PG/Dept |
| BE-6.2.3 | US-6PMS-011 | Medium | 3 | **New hire evaluation form** — สร้างรายการประเมินพนักงานเข้าใหม่ |
| BE-6.2.4 | US-6PMS-012 | Medium | 8 | **Gap analysis engine** — Expected vs actual + display gap |
| BE-6.2.5 | US-6PMS-014 | Medium | 5 | **Promotion criteria filter** — แนะนำพนักงานที่อยู่ในเกณฑ์ promote |
| BE-6.2.6 | US-6PMS-016 | Low | 5 | **Training recommendation** — Gap → แนะนำหลักสูตร + timeline |
| BE-6.2.7 | US-6PMS-019 | Low | 5 | **Auto supervisor reassign** — เปลี่ยนหัวหน้า auto เมื่อลาออก/ย้าย |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-6.2.1 | US-6PMS-013 | Medium | 8 | **IDP portfolio report** — พิมพ์ Competency Profile + IDP + Development Progress |
| FE-6.2.2 | US-6PMS-012 | Medium | 8 | **Gap analysis visualization** — แสดง expected vs actual with gap chart |

---

### Feature 6.3: Manager Tools (6 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-6.3.1 | US-6PMS-015 | Medium | 8 | **Evaluation recording** — บันทึกผล KPI/G-BEST/Competency/Time + alert ยังไม่ส่ง |
| BE-6.3.2 | US-6PMS-017 | Low | 5 | **Mass submit/approve** — ส่ง KPI/G-BEST/Competency/Time ทั้งกลุ่มครั้งเดียว |
| BE-6.3.3 | US-6PMS-018 | Low | 5 | **Change appraiser** — เปลี่ยนผู้ประเมินเมื่อ N-1/N-2 เปลี่ยนแปลง |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-6.3.1 | US-6PMS-020 | Low | 3 | **Profile + grade viewer** — ดูประวัติ + เกรดประเมิน by JG/PG |
| FE-6.3.2 | US-6PMS-021 | Low | 3 | **Manager competency dashboard** — ดู competency/IDP/dev progress ลูกน้อง |
| FE-6.3.3 | US-6PMS-022 | Low | 5 | **Evaluation deadline notifier** — แจ้งเตือนให้ประเมิน/วางแผนตามเวลา |

---

### Feature 6.4: Merit & Bonus (4 stories)

#### BE + FE Stories

| Story | ID | Priority | SP | Layer | Description |
|-------|-----|----------|-----|-------|-------------|
| BE-6.4.1 | US-6PMS-026 | Low | 3 | BE | **Linkage time score** — ผูกคะแนน time management เข้า PMS |
| FE-6.4.1 | US-6PMS-023 | Low | 3 | FE | **Multi-device PMS** — Submit/Approve PMS ผ่านหลาย device |
| FE-6.4.2 | US-6PMS-024 | Low | 5 | FE | **Comment/notable actions** — บันทึกคุณงามความดี/สิ่งที่ควรปรับ |
| BE-6.4.2 | US-6PMS-025 | Low | 5 | BE | **PMS timeline notification** — แจ้งแผน: Q1 ตั้ง KPI, coaching ทุก Q |

---

### Feature 6.5: Competency Content (4 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-6.5.1 | US-6PMS-027 | Low | 5 | **Competency criteria CRUD** — เพิ่ม/ลด/แก้ไข + นำข้อมูลวินัยมาคำนวณ |
| BE-6.5.2 | US-6PMS-034 | Low | 3 | **Job-Competency mapping** — Job ID ของพนักงาน ↔ Competency |
| BE-6.5.3 | US-6PMS-035 | Low | 3 | **360-degree comparison** — เปรียบเทียบ evaluation 360 |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-6.5.1 | US-6PMS-029 | Low | 3 | **Evaluation guideline UI** — Step-by-step การประเมิน |

---

### Feature 6.6: PMS Reports (10 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-6.6.1 | US-6PMS-028 | Low | 5 | **Evaluation tracking report** — Status by BU/แผนก/รายบุคคล |
| BE-6.6.2 | US-6PMS-030 | Low | 3 | **Shared KPI report** — KPI แต่ละ BU (Turnover, Internal Growth) |
| BE-6.6.3 | US-6PMS-031 | Low | 3 | **Monthly KPI tracking** — Result รายเดือน |
| BE-6.6.4 | US-6PMS-032 | Low | 3 | **Escalation notification** — แจ้งหัวหน้าระดับถัดไปเมื่อยังไม่ประเมิน |
| BE-6.6.5 | US-6PMS-036 | Low | 5 | **Resigned employee PMS cleanup** — ลบเฉพาะรายการยังไม่บันทึกผล |
| BE-6.6.6 | US-6PMS-037 | Low | 5 | **Development progress report** — สรุปผลการพัฒนาตนเอง + แจ้งเตือน |
| BE-6.6.7 | US-6PMS-038 | Low | 3 | **Record update notification** — แจ้งพนักงาน+หัวหน้า ให้ update record |
| BE-6.6.8 | US-6PMS-039 | Low | 3 | **KPI/G-BEST/Competency Excel** — Import & Export |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-6.6.1 | US-6PMS-040 | Low | 5 | **PMS real-time dashboard** — บันทึก/ดูข้อมูลแบบ real time + control report |
| FE-6.6.2 | US-6PMS-041 | Low | 3 | **Sub-curve viewer** — ดู curve ย่อยของแต่ละสาย |

---

## Epic 7: Talent Management

**29 stories** | Talent identification, ICDP, Succession, Analysis

### Feature 7.1: Identification & Pre-screen (9 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-7.1.1 | US-7TALENT-001 | High | 8 | **Talent RBAC** — TM Team, Mentor, Coach, BHR, Supervisor roles |
| BE-7.1.2 | US-7TALENT-002 | High | 8 | **Talent profile API** — คุณสมบัติเฉพาะตำแหน่ง + เปรียบเทียบ |
| BE-7.1.3 | US-7TALENT-003 | High | 5 | **Hi-Po identification** — Identify + rank by salary percentile |
| BE-7.1.4 | US-7TALENT-004 | High | 3 | **Hi-Po evaluation criteria** — Design criteria สำหรับ Hi-Po |
| BE-7.1.5 | US-7TALENT-005 | High | 5 | **Talent profile report** — Target vs Actual, YIL/YIP/YOS |
| BE-7.1.6 | US-7TALENT-006 | Medium | 3 | **Criteria pass list** — แสดงรายชื่อผ่าน criteria |
| BE-7.1.7 | US-7TALENT-007 | Medium | 3 | **Unreviewed flag** — Flag หัวหน้าที่ยังไม่ประเมิน potential |
| BE-7.1.8 | US-7TALENT-008 | Medium | 5 | **Success story API** — เพิ่ม/แก้ไข success story 2 ปีย้อนหลัง |
| BE-7.1.9 | US-7TALENT-009 | Medium | 5 | **Follow-up scheduler** — Schedule + notification สำหรับ MT/FT, Hi-Po, Successor |

---

### Feature 7.2: Career Planning / ICDP (6 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-7.2.1 | US-7TALENT-010 | Medium | 5 | **Gap analysis → training link** — วิเคราะห์ gap + link กับหลักสูตร Leadership |
| BE-7.2.2 | US-7TALENT-012 | Medium | 8 | **ICDP planning API** — Career Path/Development Need/Development Plan across org |
| BE-7.2.3 | US-7TALENT-013 | Medium | 5 | **IDP road map (GM up)** — Road map สำหรับผู้บริหาร |
| BE-7.2.4 | US-7TALENT-014 | Medium | 5 | **360/180 assessment** — ประเมิน Hi-Po 360°/180° + ผลเชื่อมกับ development |
| BE-7.2.5 | US-7TALENT-015 | Medium | 3 | **Universal career plan** — Career plan ทุกคน + แยก Talent/ปกติ |
| BE-7.2.6 | US-7TALENT-016 | Low | 3 | **ICDP/IDP summary report** — สรุปแผน + forecast successors |

---

### Feature 7.3: Talent Administration (3 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-7.3.1 | US-7TALENT-011 | Medium | 5 | **Talent review report** — Talent profile report สำหรับ meeting |
| BE-7.3.2 | US-7TALENT-025 | Low | 5 | **Cross-BG talent pool** — Share talent pool ข้าม BG ระดับบริหารขึ้นไป |
| BE-7.3.3 | US-7TALENT-026 | Low | 5 | **Recruiting ↔ Talent integration** — Internal sourcing จาก talent pool |

---

### Feature 7.4: Succession Planning (6 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-7.4.1 | US-7TALENT-017 | Low | 5 | **Key position on org chart** — Identify key position ใน org |
| BE-7.4.2 | US-7TALENT-018 | Low | 3 | **Critical position forecast** — Forecast + identify critical position |
| BE-7.4.3 | US-7TALENT-019 | Low | 3 | **Succession KPI link** — Link to PMS for setting succession KPIs |
| BE-7.4.4 | US-7TALENT-021 | Low | 5 | **Promotion alert** — แจ้งเตือน promote/rotate เพื่อรักษา Hi-Po |
| BE-7.4.5 | US-7TALENT-022 | Low | 5 | **Career goal analysis** — วิเคราะห์ career goal → competency → development program |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-7.4.1 | US-7TALENT-023 | Low | 8 | **Succession org chart** — Nine Box Matrix + simulate move (drag & drop) + risk/impact/readiness |

---

### Feature 7.5: Analysis & Monitoring (5 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-7.5.1 | US-7TALENT-020 | Low | 3 | **Turnover vs talent report** — T/O compare current employee |
| BE-7.5.2 | US-7TALENT-027 | Low | 3 | **Side-by-side comparison** — เปรียบเทียบ candidate |
| BE-7.5.3 | US-7TALENT-028 | Low | 5 | **IDP gap analysis** — เสนอหลักสูตร + เครื่องมือเติมเต็ม Hi-Po |
| BE-7.5.4 | US-7TALENT-029 | Low | 5 | **Special salary adjustment** — ปรับค่าตอบแทนสำหรับ Hi-Po |
| BE-7.5.5 | US-7TALENT-024 | Low | 5 | **Workforce planning** — วางแผนอัตรากำลัง + Internal Source + Build/Buy ratio |

---

## Epic 8: Learning Management

**48 stories** | Training roadmap, E-Learning, Course admin, Report

### Feature 8.1: Course & Resource Management (3 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-8.1.1 | US-8LMS-001 | High | 8 | **Training roadmap engine** — Criteria: YOS, people group, job, BU, position |
| BE-8.1.2 | US-8LMS-002 | High | 8 | **Auto-select learners** — Auto select ตาม YOS, people group, job, BU + ไม่ซ้ำ |
| BE-8.1.3 | US-8LMS-029 | Low | 5 | **IDP → LMS notification** — แจ้ง line manager สำหรับ IDP จาก competency assessment |

---

### Feature 8.2: Enrollment & Registration (6 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-8.2.1 | US-8LMS-003 | High | 5 | **Training roadmap CRUD** — สร้าง/แก้ไข/ลบ/ค้นหา + manual + import Excel |
| BE-8.2.2 | US-8LMS-004 | High | 5 | **Training category/course/class** — CRUD by BG (e.g. CFR, CPN) |
| BE-8.2.3 | US-8LMS-005 | High | 5 | **Training center setup** — ผูก training center กับ BU-Branch |
| BE-8.2.4 | US-8LMS-006 | Medium | 3 | **Master data export** — Export setup data to Excel |
| BE-8.2.5 | US-8LMS-007 | Medium | 8 | **Online questionnaire** — ประเมิน: ห้อง, ผู้เข้าอบรม, วิทยากร, หลักสูตร |
| BE-8.2.6 | US-8LMS-008 | Medium | 5 | **Course hierarchy** — Setup หลักสูตรตาม hierarchy (Soft Skill → sub by BG) |

---

### Feature 8.3: E-Learning (8 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-8.3.1 | US-8LMS-010 | Medium | 3 | **E-Learning platform** — รองรับ e-learning ตามหลักสูตร |
| BE-8.3.2 | US-8LMS-011 | Medium | 5 | **E-Learning wizard** — สร้าง/customize e-learning + test/scoring |
| BE-8.3.3 | US-8LMS-013 | Medium | 3 | **E-Library** — เก็บคู่มือ online |
| BE-8.3.4 | US-8LMS-014 | Medium | 3 | **KM sharing** — Knowledge management sharing platform |
| BE-8.3.5 | US-8LMS-015 | Medium | 5 | **Learner criteria engine** — กำหนดกลุ่มผู้เข้าอบรมตาม employee ID, position, BU |
| BE-8.3.6 | US-8LMS-016 | Low | 8 | **Booking system** — Meeting room, coffee break, lunch, material, projector + % AC calc |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-8.3.1 | US-8LMS-009 | Medium | 3 | **Training history viewer** — พนักงานดู training record ของตัวเอง |
| FE-8.3.2 | US-8LMS-012 | Medium | 3 | **Multi-device e-learning** — รองรับ online courses ทุก location + หลาย device |

---

### Feature 8.4: Workflow (2 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-8.4.1 | US-8LMS-017 | Low | 3 | **Self-registration API** — พนักงานลงทะเบียนเรียนเอง |
| BE-8.4.2 | US-8LMS-018 | Low | 3 | **Supervisor approval** — อนุมัติ training via email + multi-device |

---

### Feature 8.5: Learning Administration (8 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-8.5.1 | US-8LMS-019 | Low | 8 | **Compulsory course registration** — HR ลงทะเบียนหลักสูตรบังคับ + import Excel |
| BE-8.5.2 | US-8LMS-020 | Low | 5 | **Training survey notification** — แจ้งหัวหน้า + CC พนักงาน เมื่อถึงเวลาทำแบบประเมิน |
| BE-8.5.3 | US-8LMS-021 | Low | 5 | **Score import** — Update score จาก Excel |
| BE-8.5.4 | US-8LMS-022 | Low | 8 | **Training cost tracking** — วิทยากร, อาหาร, เอกสาร → สรุป/cost allocation |
| BE-8.5.5 | US-8LMS-024 | Low | 5 | **VAT calculation** — คำนวณ/สรุป VAT สำหรับส่งรัฐ |
| BE-8.5.6 | US-8LMS-025 | Low | 3 | **Finance interface** — ส่ง training cost เข้า finance (charge to cost center) |
| BE-8.5.7 | US-8LMS-026 | Low | 3 | **Budget vs actual report** — เปรียบเทียบ budget กับ actual |
| BE-8.5.8 | US-8LMS-027 | Low | 8 | **Post-training recording** — บันทึก/import ผลหลังอบรม + รายงาน |

---

### Feature 8.6: Skills & Competency (1 story)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-8.6.1 | US-8LMS-028 | Low | 5 | **IDP follow-up** — ติดตาม + generate IDP จาก competency assessment |

---

### Feature 8.7: Reporting & Analytics (16 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-8.7.1 | US-8LMS-030 | Low | 5 | **Annual plan report** — ตาม duration, course, target group |
| BE-8.7.2 | US-8LMS-031 | Low | 5 | **Plan comparison** — เปรียบเทียบ annual plan ข้ามปี + training roadmap |
| BE-8.7.3 | US-8LMS-032 | Low | 3 | **Detailed training report** |
| BE-8.7.4 | US-8LMS-033 | Low | 8 | **Report export** — Text, Word, Excel + send link on intranet |
| BE-8.7.5 | US-8LMS-034 | Low | 8 | **Gantt chart report** — กิจกรรมประจำปี by year/quarter/month |
| BE-8.7.6 | US-8LMS-036 | Low | 3 | **Instructor pool** — ข้อมูลวิทยากรภายใน/ภายนอก |
| BE-8.7.7 | US-8LMS-037 | Low | 8 | **Instructor suggestion** — แนะนำวิทยากรจาก pool ตาม criteria |
| BE-8.7.8 | US-8LMS-038 | Low | 8 | **Registration template** — Template + learner details |
| BE-8.7.9 | US-8LMS-039 | Low | 3 | **Cost summary report** |
| BE-8.7.10 | US-8LMS-023 | Low | 3 | **Training cost report (incl. VAT)** |
| BE-8.7.11 | US-8LMS-035 | Low | 3 | **Instructor directory** — ทำเนียบวิทยากร |
| BE-8.7.12 | US-8LMS-040 | Low | 3 | **Training evaluation** — ประเมินผลการฝึกอบรม |
| BE-8.7.13 | US-8LMS-041 | Low | 3 | **Course evaluation report** |
| BE-8.7.14 | US-8LMS-042 | Low | 5 | **Training summary** — สรุปรายงานฝึกอบรมทั้งหมด |
| BE-8.7.15 | US-8LMS-043 | Low | 3 | **Monthly evaluation summary** — สรุปผลประเมินรายเดือน |
| BE-8.7.16 | US-8LMS-044 | Low | 5 | **Executive analysis** — วิเคราะห์ quarterly/yearly สำหรับนำเสนอผู้บริหาร |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-8.7.1 | US-8LMS-045 | Low | 5 | **Manager training analysis** — รายงานวิเคราะห์สำหรับ line manager |
| FE-8.7.2 | US-8LMS-046 | Low | 5 | **Mass import UI** — Import ตาม required format |
| FE-8.7.3 | US-8LMS-047 | Low | 5 | **Individual training summary** — สรุปสำหรับ audit |

---

### Feature 8.8: Training Calendar (1 story)

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-8.8.1 | US-8LMS-048 | Low | 3 | **Training calendar view** — ปฏิทินหลักสูตร |

---

## Epic 9: E-Recruitment

**56 stories** | Recruitment marketing, Sourcing, Selection, Onboarding, Report

### Feature 9.1: Recruitment Marketing (4 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-9.1.1 | US-9REC-001 | High | 3 | **QR code generation** — CG + BU recruitment QR code for mobile |
| BE-9.1.2 | US-9REC-002 | High | 3 | **Real-time chat** — Chat สำหรับผู้สมัคร |
| BE-9.1.3 | US-9REC-003 | High | 3 | **Candidate pool API** — Prospective candidate pool management |
| BE-9.1.4 | US-9REC-004 | High | 5 | **Job posting engine** — Job posting + matching + search (internal + external CG) |

---

### Feature 9.2: Sourcing (13 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-9.2.1 | US-9REC-005 | High | 5 | **Online application** — Central online job application + super user content |
| BE-9.2.2 | US-9REC-006 | Medium | 5 | **Job requisition API** — สร้างจาก vacancy (auto interface) |
| BE-9.2.3 | US-9REC-007 | Medium | 8 | **Vacancy validation** — ตรวจ budget/current/holding position + internal/external source |
| BE-9.2.4 | US-9REC-008 | Medium | 5 | **JD attachment** — แนบ JD file สำหรับ vacancy |
| BE-9.2.5 | US-9REC-009 | Medium | 5 | **Online manpower request** — สร้างคำขออัตรากำลัง online |
| BE-9.2.6 | US-9REC-010 | Medium | 5 | **JD + competency extraction** — ดึง JD + competency mapping for job posting |
| BE-9.2.7 | US-9REC-011 | Medium | 5 | **CV format support** — PDF, Word, JPEG |
| BE-9.2.8 | US-9REC-012 | Medium | 3 | **Cross-BG recruitment sharing** — Share ข้อมูลสรรหาข้าม BG |
| BE-9.2.9 | US-9REC-013 | Medium | 5 | **Vacancy notification** — Email แจ้งผู้สมัครเมื่อมีตำแหน่งว่าง |
| BE-9.2.10 | US-9REC-014 | Medium | 3 | **Disabled person recruitment** — ระบบสรรหาพิเศษสำหรับผู้พิการ |
| BE-9.2.11 | US-9REC-015 | Medium | 3 | **Internal job board** — ประกาศตำแหน่งภายใน |
| BE-9.2.12 | US-9REC-016 | Low | 5 | **Relocation request API** — พนักงานขอย้ายไปตำแหน่งว่าง |
| BE-9.2.13 | US-9REC-017 | Low | 3 | **Applicant tracking** — Tracking status ผู้สมัคร |

---

### Feature 9.3: Selection (20 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-9.3.1 | US-9REC-018 | Low | 5 | **Application tracking API** — View/update/track all applications per vacancy |
| BE-9.3.2 | US-9REC-019 | Low | 5 | **Interview management** — Interview team, scheduling, notification |
| BE-9.3.3 | US-9REC-021 | Low | 3 | **Online hiring/approval** — Hiring workflow online |
| BE-9.3.4 | US-9REC-022 | Low | 3 | **HR core + contract link** — เชื่อม hiring → HR core + สัญญา |
| BE-9.3.5 | US-9REC-023 | Low | 3 | **Online test/assessment** — ทดสอบ online |
| BE-9.3.6 | US-9REC-024 | Low | 8 | **Blacklist API** — บันทึก personal blacklist |
| BE-9.3.7 | US-9REC-025 | Low | 5 | **Job order vs vacancy comparison** — เปรียบเทียบ |
| BE-9.3.8 | US-9REC-026 | Low | 5 | **Personnel requisition approval** — อนุมัติ online + notify line manager/recruiter |
| BE-9.3.9 | US-9REC-027 | Low | 5 | **Timeframe notification** — แจ้ง approve/disapprove ภายในเวลา |
| BE-9.3.10 | US-9REC-028 | Low | 5 | **Auto manpower budget** — บันทึก budget อัตโนมัติ |
| BE-9.3.11 | US-9REC-029 | Low | 5 | **Recruitment workflow** — Workflow engine สำหรับ recruitment |
| BE-9.3.12 | US-9REC-030 | Low | 5 | **Timeline feature** — Timeline สำหรับ recruitment process |
| BE-9.3.13 | US-9REC-031 | Low | 5 | **Rejection comments** — เหตุผลที่ไม่ผ่าน |
| BE-9.3.14 | US-9REC-035 | Low | 3 | **Applicant status notification** — แจ้ง status via email |
| BE-9.3.15 | US-9REC-036 | Low | 5 | **Auto reference check** — Email + compare with current company |
| BE-9.3.16 | US-9REC-037 | Low | 5 | **Auto rejection** — SMS/email สำหรับผู้ไม่ผ่าน min requirement |
| BE-9.3.17 | US-9REC-038 | Low | 3 | **Online competency test** — Competency + Core Value + THAI model mapping |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-9.3.1 | US-9REC-032 | Low | 8 | **Side-by-side comparison UI** — เปรียบเทียบผู้สมัครตำแหน่งเดียวกัน |
| FE-9.3.2 | US-9REC-033 | Low | 3 | **Mobile pre-screening** — Pre-screen on mobile/iPad/iPhone |
| FE-9.3.3 | US-9REC-034 | Low | 3 | **Mobile candidate profile** — ดู candidate profile on mobile |

---

### Feature 9.4: Onboarding (11 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-9.4.1 | US-9REC-020 | Low | 5 | **New hire notification** — แจ้ง line manager + พนักงานใหม่ via email/mobile |
| BE-9.4.2 | US-9REC-039 | Low | 5 | **Contract/document printing** — พิมพ์สัญญา + เอกสารการจ้าง |
| BE-9.4.3 | US-9REC-040 | Low | 5 | **Employee ID generation** — Auto/manual generate ID |
| BE-9.4.4 | US-9REC-041 | Low | 5 | **Document storage** — สมุดสุขภาพ, บัญชีธนาคาร, ปกส., สัญญา, ผลประเมิน |
| BE-9.4.5 | US-9REC-042 | Low | 8 | **Cross-division notification** — แจ้ง payroll, IT, ประกาศ, ทรัพย์สิน, security |
| BE-9.4.6 | US-9REC-043 | Low | 5 | **LMS link** — Development/training plan + notify training |
| BE-9.4.7 | US-9REC-044 | Low | 5 | **New comer kit** — CG handbook, manager info, benefits, org chart, procedure |
| BE-9.4.8 | US-9REC-045 | Low | 3 | **Start date email** — Email แจ้งวันเริ่มงาน |
| BE-9.4.9 | US-9REC-046 | Low | 3 | **Photo upload** — Upload รูปพนักงาน |
| BE-9.4.10 | US-9REC-047 | Low | 3 | **Welcome message** — Email ต้อนรับ via LINE/Facebook |
| BE-9.4.11 | US-9REC-048 | Low | 5 | **Company info page** — Contact details, office location, FAQ |

---

### Feature 9.5: Report & Analytics (8 stories)

#### BE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| BE-9.5.1 | US-9REC-049 | Low | 3 | **Interview report** — ข้อมูลการสัมภาษณ์ |
| BE-9.5.2 | US-9REC-050 | Low | 3 | **SLA tracking** — Tracking system compare +/- |
| BE-9.5.3 | US-9REC-051 | Low | 5 | **Application tracking (manager)** — Line manager ดู tracking ผู้สมัคร |
| BE-9.5.4 | US-9REC-052 | Low | 5 | **Sourcing cost report** — Job level, salary, channel cost, referral |
| BE-9.5.5 | US-9REC-053 | Low | 3 | **University/course report** — สรุปผู้สมัครตามมหาวิทยาลัย/สาขา |
| BE-9.5.6 | US-9REC-054 | Low | 3 | **Hire-to-recruiter ratio** — เปรียบเทียบ new hire / recruiter |
| BE-9.5.7 | US-9REC-055 | Low | 5 | **Recruitment cost tracking** — บันทึกค่าใช้จ่ายตามสื่อ |

#### FE Stories

| Story | ID | Priority | SP | Description |
|-------|-----|----------|-----|-------------|
| FE-9.5.1 | US-9REC-056 | Low | 8 | **Hiring analysis dashboard** — Channel analysis, monthly vacancy, interview status, cost-per-hire |

---

## สรุป: Dependency Map & Phase Plan

```
┌─────────────────────────────────────────────────────────┐
│                    Platform Layer (BE)                    │
│  ┌─────────┐  ┌──────────┐  ┌────────────┐  ┌────────┐ │
│  │  Auth &  │  │ Workflow │  │  DB Schema │  │  RBAC  │ │
│  │  SSO     │  │  Engine  │  │ & Migration│  │ Engine │ │
│  └────┬─────┘  └────┬─────┘  └─────┬──────┘  └───┬────┘ │
└───────┼──────────────┼─────────────┼──────────────┼──────┘
        │              │             │              │
┌───────▼──────────────▼─────────────▼──────────────▼──────┐
│ Phase 1: Foundation                                       │
│  Epic 1: Employee Central (54)  ←── ทุก epic ใช้ข้อมูลนี้ │
│  Epic 5: Self Service ESS/MSS (27) ←── workflow + UI base │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│ Phase 2: Core Operations                                  │
│  Epic 3: Time Management (21) ──→ feeds into ──┐         │
│  Epic 2: Payroll (58)          ←───────────────┘         │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│ Phase 3: Compensation & Benefits                          │
│  Epic 4: Comp & Benefits (35) ←── needs payroll + EC data│
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│ Phase 4: People Development                               │
│  Epic 6: Performance Management (41)                      │
│  Epic 7: Talent Management (29)  ←── needs PMS data      │
│  Epic 8: Learning Management (48) ←── needs competency   │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│ Phase 5: Talent Acquisition                               │
│  Epic 9: E-Recruitment (56)   ←── needs EC + position    │
└──────────────────────────────────────────────────────────┘
```

### Story Points Summary

| Epic | BE Stories | FE Stories | Total SP |
|------|-----------|-----------|----------|
| 1. Employee Central | ~45 | ~9 | 272 |
| 2. Payroll | ~50 | ~5 | 273 |
| 3. Time Management | ~17 | ~4 | 112 |
| 4. Compensation & Benefits | ~28 | ~7 | 166 |
| 5. Self Service | ~18 | ~9 | 118 |
| 6. Performance Management | ~30 | ~11 | 210 |
| 7. Talent Management | ~25 | ~1 | 139 |
| 8. Learning Management | ~38 | ~6 | 226 |
| 9. E-Recruitment | ~42 | ~7 | 280 |
| **Total** | **~293** | **~59** | **~1,796** |

> **สัดส่วน BE:FE ≈ 83:17** — สะท้อนว่า business logic หนักฝั่ง backend, FE ส่วนใหญ่มี mock อยู่แล้ว เหลือแค่ integration
