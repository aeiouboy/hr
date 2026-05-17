# STA-29 — Employee Center demo scope สำหรับ HR design approval ก่อน Backend

> **สถานะ:** Design-approval contract เท่านั้น — ห้ามเริ่ม Backend implementation จนกว่า HR จะ sign-off เป็นลายลักษณ์อักษร  
> **Linear:** STA-29 — `[HR Demo][Employee Center] Seed scope for HR design approval before backend`  
> **Seed:** `/Users/tachongrak/.ouroboros/seeds/seed_19e991472285.yaml`  
> **วันที่จัดทำ:** 2026-05-17  
> **ภาษา:** Thai-primary พร้อม English technical terms เพื่อให้ HR/BA/Engineering ใช้ร่วมกัน

---

## 1. วัตถุประสงค์และข้อห้ามสำคัญ

เอกสารนี้ล็อกขอบเขต **Employee Center demo** สำหรับให้ HR ตรวจแบบ end-to-end ก่อนมีการทำ Backend จริง โดยอ้างอิง Seed STA-29 เป็น source of truth และตรวจ route evidence ใน repo ปัจจุบันแล้ว

### เป้าหมายการอนุมัติ

HR ต้องสามารถเดิน demo ได้ครบ 3 persona โดยไม่มี dead end:

1. **Employee** — ดูข้อมูลตนเอง, แก้ไข 6-tab profile, ส่ง change request, เห็น pending state
2. **Manager** — เห็นงานที่ต้องอนุมัติ, review probation, เห็น pending employee-change approval state
3. **HR Admin / HRBP** — ค้นพนักงาน, เปิด employee detail, ใช้ lifecycle actions แบบ mock/click-through, เห็น owner/TBD/source ชัดเจน

### Backend block / stop condition

- **Backend implementation ถูก BLOCKED จนกว่า HR sign-off จะครบ**
- ห้ามต่อ API จริง, persistence จริง, SuccessFactors writeback, cron job, integration job หรือ production authorization ใน STA-29
- Demo state ทั้งหมดเป็น **design-only / mock-click-through** เว้นแต่ระบุว่าเป็น backend-later
- หลัง HR sign-off เท่านั้นจึงแยก Backend backlog/contract implementation ได้

---

## 2. Source of truth และ route evidence ที่ตรวจแล้ว

| Source | Evidence | ใช้เพื่อ |
|---|---|---|
| Seed STA-29 | `/Users/tachongrak/.ouroboros/seeds/seed_19e991472285.yaml` | Scope, constraints, acceptance criteria, persona list |
| Employee profile | `src/frontend/src/app/[locale]/profile/me/page.tsx` | 6-tab ESS profile, edit/save/modal, pending changes |
| Legacy ESS edit | `src/frontend/src/app/[locale]/ess/profile/edit/page.tsx` | ข้อมูลประกอบเรื่อง submit เพื่ออนุมัติ |
| Workflow inbox | `src/frontend/src/app/[locale]/workflows/page.tsx` | Pending/approved/rejected workflow state รวมถึง employee-change state |
| Quick approve | `src/frontend/src/app/[locale]/quick-approve/page.tsx`, `src/frontend/src/components/manager/quick-approve-page.tsx`, `src/frontend/src/app/[locale]/quick-approve/[id]/page.tsx` | Manager/SPD/HRBP approval inbox + pending change detail evidence |
| Manager dashboard | `src/frontend/src/app/[locale]/manager-dashboard/page.tsx` | Manager landing + approval queue entry |
| Manager probation list | `src/frontend/src/app/[locale]/manager-dashboard/probations/page.tsx` | Team probation evaluation, pending HR state |
| Probation workflow list/detail | `src/frontend/src/app/[locale]/workflows/probation/page.tsx`, `src/frontend/src/app/[locale]/workflows/probation/[id]/page.tsx` | STA-23 manager approve/review surface |
| HR admin employee list/detail | `src/frontend/src/app/[locale]/admin/employees/page.tsx`, `src/frontend/src/app/[locale]/admin/employees/[id]/page.tsx` | Employee search/list/detail hub + lifecycle action cards |
| Hire route | `src/frontend/src/app/[locale]/admin/hire/page.tsx` | Standalone Archetype A hire wizard |
| Lifecycle child routes | `src/frontend/src/app/[locale]/admin/employees/[id]/{edit,transfer,acting,pay-rate-change,probation,terminate,rehire,contract-renewal}/page.tsx` | Archetype B lifecycle actions |
| Benefit manager views | `src/frontend/src/app/[locale]/manager/benefits/team/page.tsx`, `src/frontend/src/app/[locale]/manager/benefits/reports/page.tsx` | Explicitly out-of-scope; owned by STA-28 |
| Linear current issues | STA-5, STA-23, STA-24 read-only issue evidence | Gap split design-only vs backend-later |

**Wiki preflight:** `omx_wiki/index.md` ไม่พบใน worktree นี้ จึงไม่มี canary token ให้ verify

---

## 3. Persona demo journeys แบบ end-to-end

### 3.1 Employee journey — Self-service profile + pending change

**Demo intent:** พนักงานเห็น Employee Center เป็นที่เดียวสำหรับข้อมูลตนเอง และส่งคำขอแก้ไขได้โดยไม่หลุด flow

| Step | Route / source | Visible section | Owner | State | TBD / approval note |
|---:|---|---|---|---|---|
| 1 | `/th/profile/me` จาก `profile/me/page.tsx` | Header card: ชื่อ, ตำแหน่ง, แผนก, manager, employment type | HR Product + Design | Clickable | HR ยืนยัน copy/field visibility |
| 2 | `/th/profile/me?tab=personal` | **ข้อมูลส่วนตัว** พร้อม edit button | HR Product | Clickable | Sensitive fields ต้องยืนยัน masking/attachment requirement |
| 3 | `/th/profile/me?tab=employment` | **งาน/ตำแหน่ง** read-only employment context | HR Product | Clickable | Backend-later: org/job source of truth |
| 4 | `/th/profile/me?tab=emergency` (`compensation` key maps to emergency tab label) | **ผู้ติดต่อฉุกเฉิน** edit section | HR Product | Clickable | HR ยืนยันว่าชื่อ tab/technical key ไม่สับสนใน demo script |
| 5 | `/th/profile/me?tab=benefits` | Benefit summary inside profile | Benefits owner | Context only | ไม่ทำ manager benefit views ใน STA-29; deep benefit scope = STA-28 |
| 6 | `/th/profile/me?tab=documents` | Employee documents | Document/EC owner | Mock/read-only | Backend-later: storage/signature policy |
| 7 | `/th/profile/me?tab=tax` | Activity / pending changes + tax docs | HR Product | Clickable | ใช้เป็นหลักฐาน pending-change flow |
| 8 | Edit field → modal effective date/attachment → save | Change request created in store; pending badge/card visible | HR Product | Mock functional | Backend-later: approval workflow engine + master-data apply job |
| 9 | Pending card → withdraw before decision | Employee can withdraw while pending | HR Product | Mock functional | HR sign-off required on allowed withdraw window |

**Employee no-dead-end rule:** ทุก tab ต้องมี route หรือ query state ที่กลับมาหน้า profile ได้; pending card ต้องมี status/action ที่เข้าใจได้ ไม่ใช่ blank state ที่ไม่มี next step

### 3.2 Manager journey — approvals, probation, employee-change state

**Demo intent:** Manager ใช้ one lightweight approval/review path ไม่ใช่ full HR Admin portal และไม่รวม benefit manager module

| Step | Route / source | Visible section | Owner | State | TBD / approval note |
|---:|---|---|---|---|---|
| 1 | `/th/manager-dashboard` | KPI strip, approval queue snippet, quick actions | Manager/Approval owner | Clickable | HR ยืนยันว่า queue copy รองรับ Employee Center demo |
| 2 | `/th/quick-approve` via dashboard CTA | Unified approval queue | STA-28/Approval owner | Context route | STA-29 ใช้เฉพาะ pending employee-change state; STA-28 owns benefit queue design |
| 3 | `/th/workflows` | Tabs: pending / sent back / approved / rejected | Workflow owner | Clickable | Pending employee-change approval state ต้องแสดงอย่างน้อยหนึ่งรายการใน demo data/script |
| 4 | `/th/manager-dashboard/probations` | Team probation list, Evaluate button, pending HR chip after submit | EC owner | Clickable | ใช้เป็น Manager demo surface สำหรับ probation review |
| 5 | Evaluation modal submit | Success banner: pending HR Admin review | EC owner | Mock functional | Backend-later: real routing to HR Admin/SPD |
| 6 | `/th/workflows/probation` | Probation cases list, pending approval tab | EC owner | Clickable | STA-23 alignment; HR ยืนยัน columns/copy |
| 7 | `/th/workflows/probation/[id]` | Manager approve view with five outcomes and conditional fields | EC owner | Clickable | STA-23: fail reason LOV and BA/HR field list remain TBD |
| 8 | Back links to list/dashboard | No dead end | EC owner | Clickable | Demo script must include route back after submit/cancel |

**Explicit out-of-scope for Manager:**

- `/th/manager/benefits/team` และ `/th/manager/benefits/reports` เป็น **STA-28** ไม่ใช่ STA-29
- STA-29 อนุญาตให้กล่าวถึงเป็น cross-module context เท่านั้น ห้ามใช้เป็น acceptance gate ของ Employee Center

### 3.3 HR Admin / HRBP journey — employee detail + lifecycle mock actions

**Demo intent:** HR Admin/HRBP เปิด employee record, เห็น timeline, และเดิน lifecycle action surfaces ได้แบบ mock เพื่ออนุมัติ design ก่อน backend

| Step | Route / source | Visible section | Owner | State | TBD / approval note |
|---:|---|---|---|---|---|
| 1 | `/th/admin/employees` | Employee list, search/filter, role barrier for non-admin | HR Admin owner | Clickable | HR ยืนยัน columns ที่ใช้ใน approval review |
| 2 | `/th/admin/employees/[id]` | Snapshot card, status, class, org info | HR Admin owner | Clickable | HR ยืนยัน field priority และ masking |
| 3 | same detail page | Timeline event log | HR Admin owner | Clickable | Backend-later: audit/event source of truth |
| 4 | same detail page | Action menu / lifecycle cards | HR Admin owner | Clickable/mock | Seed says 8 but route evidence shows 9 surfaces; reconciliation below |
| 5 | child lifecycle route | Wizard/form for selected action | HR Admin owner | Mock functional | No real API; route must return to detail or show review state |
| 6 | `/th/workflows` or relevant detail state | Pending/approved workflow status | Workflow owner | Mock state | Backend-later: workflow engine and SLA/escalation |
| 7 | HRBP review note | HRBP can review but not own Benefits manager views | HRBP owner | Design-only | Role permission matrix must be signed off separately |

---

## 4. Admin lifecycle route reconciliation

Seed text says “8 admin lifecycle routes” but also lists **hire, edit, transfer, acting, pay-rate-change, probation, terminate, rehire, contract-renewal**. Counted literally, that is **9 lifecycle surfaces**. Repo evidence also supports **9 Employee Center lifecycle surfaces** when standalone hire is included.

| Lifecycle surface | Expected by STA-29 | Repo evidence | Demo classification | Owner/TBD |
|---|---:|---|---|---|
| Hire | Yes | `src/frontend/src/app/[locale]/admin/hire/page.tsx` | Clickable mock, standalone Archetype A | STA-5 gaps apply; HR to approve field set |
| Edit employee data | Yes | `src/frontend/src/app/[locale]/admin/employees/[id]/edit/page.tsx` | Clickable mock | Backend-later effective-date enforcement |
| Transfer | Yes | `src/frontend/src/app/[locale]/admin/employees/[id]/transfer/page.tsx` | Clickable mock | HR to approve org/job fields |
| Acting | Yes | `src/frontend/src/app/[locale]/admin/employees/[id]/acting/page.tsx` | Clickable mock | HR to approve acting terminology |
| Pay-rate-change | Yes | `src/frontend/src/app/[locale]/admin/employees/[id]/pay-rate-change/page.tsx` | Clickable mock | STA-24 gaps apply; compensation masked |
| Probation | Yes | `src/frontend/src/app/[locale]/admin/employees/[id]/probation/page.tsx` | Clickable mock | STA-23/BRD #117 gaps apply |
| Terminate | Yes | `src/frontend/src/app/[locale]/admin/employees/[id]/terminate/page.tsx` | Clickable mock | Backend-later resignation/termination API |
| Rehire | Yes | `src/frontend/src/app/[locale]/admin/employees/[id]/rehire/page.tsx` | Clickable mock | HR to approve old employee lookup behavior |
| Contract renewal | Yes, if present | `src/frontend/src/app/[locale]/admin/employees/[id]/contract-renewal/page.tsx` | Clickable mock | BA validation pending for day-30 behavior |

### Additional route evidence not counted as required STA-29 core

| Evidence | Interpretation | Decision |
|---|---|---|
| Detail action card links to `/${locale}/admin/employees/${id}/change-type` | Action card exists, but no matching route file was found in current route listing | **TBD / design gap** — do not present as complete unless route is implemented in another branch |
| `src/frontend/src/app/[locale]/admin/employees/[id]/promotion/page.tsx` exists | Detail page labels promotion/pay-rate together and routes canonical path to pay-rate-change | Treat promotion as candidate/bonus route; not a separate required STA-29 journey unless HR asks |
| Detail page note says “9 core lifecycle surfaces พร้อม promotion เป็น candidate/bonus surface” | Current UI itself acknowledges 9 surfaces | Documented here for HR design approval |

**Design approval requirement:** HR must explicitly accept whether the final demo count is “9 including standalone hire” or “9 detail action cards plus hire as separate journey”. Until then, Backend remains blocked.

---

## 5. Section source / owner / TBD matrix for visible demo surfaces

| Visible section | Route/source | Owner | Scope split | TBD note |
|---|---|---|---|---|
| Employee profile header | `/profile/me` | EC Product | Design-only now; Backend-later employee API | HR confirms shown fields |
| Profile 6 tabs | `/profile/me?tab=*` | EC Product | Design-only/mock state | Confirm tab labels and field grouping |
| Personal edit modal | `profile/me/page.tsx` | EC Product | Mock functional | Confirm attachment-required fields |
| Pending change activity | `/profile/me?tab=tax` | Workflow + EC | Design-only now; Backend-later workflow/apply job | Confirm pending/withdraw policy |
| Manager approval queue | `/manager-dashboard`, `/workflows`, `/quick-approve` | Workflow owner | Design-only in STA-29 | Benefit approval details deferred to STA-28 |
| Manager probation list | `/manager-dashboard/probations` | EC Product | Mock functional | Confirm pending HR status copy |
| Probation approve detail | `/workflows/probation/[id]` | EC Product | Design-only now; Backend-later workflow engine | STA-23 fail reason LOV pending HR/BA |
| HR employee list | `/admin/employees` | HR Admin owner | Mock data | Confirm columns and filters |
| HR employee detail | `/admin/employees/[id]` | HR Admin owner | Mock data | Confirm timeline and lifecycle cards |
| Hire wizard | `/admin/hire` | HR Admin owner | Mock functional | STA-5 field/order/generator gaps |
| Lifecycle B-actions | `/admin/employees/[id]/*` | HR Admin owner | Mock functional | Backend-later validations, workflow, audit |
| Benefits manager views | `/manager/benefits/team`, `/manager/benefits/reports` | STA-28 | Out-of-scope | Mention only as dependency boundary |

---

## 6. Gaps vs STA-5, STA-23, STA-24

### 6.1 STA-5 — `[EC] HR Feedback #1` / Hiring section

| Gap | Design-only handling for STA-29 | Backend-later / not in STA-29 |
|---|---|---|
| Remove fields that HR says are not in hiring / not in Excel | Mark as HR review checkpoint in hire wizard demo; do not build new fields in STA-29 | Backend schema and import mapping after HR field list sign-off |
| Direct manager to approve; notify direct manager and HRBP | Show approval chain/copy in demo script only | Real workflow routing + notifications |
| Previous Employee ID (DVT) should move to first personal-data screen and prefill old data for prior trainee/employee | Include as design approval question in hire step 1 | Lookup service, duplicate detection, prefill API |
| Missing Supervisor ID auto-derived from FO | Show as TBD/source note | FO integration and authoritative org source |
| Missing Day off type / Override Standard Weekly Hours | List as HR field approval gap | Time/work-schedule backend mapping |
| Employee ID generated after submit, starts with `2`, 8 digits | Demo copy only; no real generator change in STA-29 | Backend ID generator and collision policy |

### 6.2 STA-23 — `[EC] Probation: Manager approve view`

| Gap | Design-only handling for STA-29 | Backend-later / not in STA-29 |
|---|---|---|
| Manager approve view must match HR/PO field list | Use `/workflows/probation/[id]` with five outcomes in demo | Backend probation workflow API |
| Fail reason LOV currently TODO | Mark as TBD in sign-off | Real picklist from BA/HR master |
| Effective-date rules for early pass/fail/extend | Demonstrate validation/copy in UI | Server-side validation and audit |
| Auto notifications / day-based reminders | Explain as future behavior, not demo guarantee | Cron/email scheduler and escalation |
| Pending HR Admin review after manager evaluation | Demo via `/manager-dashboard/probations` pending HR chip | Workflow engine routing to HR Admin/SPD |

### 6.3 STA-24 — `[EC] Payrate change: List of missing fields #1`

| Gap | Design-only handling for STA-29 | Backend-later / not in STA-29 |
|---|---|---|
| Reason for Salary Adjust required only for salary-adjust event reason | Show conditional field behavior if present; otherwise mark design TBD | Backend picklist/validation |
| Pay group, Payroll ID, Pay component, Currency, Frequency | Use existing mock fields/source notes; values remain illustrative | Payroll/compensation master data integration |
| Amount supports percent and flat amount | Demo the concept; mask sensitive compensation values | Payroll-ready calculations out of scope |
| UI name currently promotion-biased | Use label “เลื่อนตำแหน่ง / ปรับเงินเดือน” and call out HR naming sign-off | Final taxonomy after HR approves |
| Promotion + pay-rate route split/canonicalization | Demo canonical `/pay-rate-change`; note `/promotion` as candidate/bonus route | Backend event-reason taxonomy and approvals |

---

## 7. Design-only vs Backend-later split

### Design-only in STA-29

- Persona walkthrough scripts and HR approval pack
- Existing route evidence mapped to demo journeys
- Mock/click-through lifecycle routes
- Existing Zustand/local mock state for profile pending changes and probation evaluation
- Owner/TBD/source annotation for every visible section
- Explicit out-of-scope boundary for STA-28 Benefits manager views

### Backend-later after HR sign-off

- Employee Center API and database persistence
- SuccessFactors or FO writeback/sync
- Workflow engine, notification, escalation, SLA, audit log
- Employee ID generator and prior employee lookup service
- Payroll/compensation integration for pay-rate-change
- Probation cron/email/day-119 auto-pass behavior
- Document storage/signature and attachment retention policy
- Server-side permission, validation, masking, and PDPA audit enforcement

---

## 8. RAID / TBD list

| Type | Item | Owner | Current decision | Required sign-off |
|---|---|---|---|---|
| Risk | Seed says 8 but evidence/count shows 9 lifecycle surfaces | EC Product + HR | Document as 9 for approval | HR confirms final count |
| Risk | `change-type` action card has no route evidence | EC Product | Do not demo as complete core route | Decide implement/defer/remove in later task |
| Assumption | Manager pending employee-change state can be shown via `/workflows`/`quick-approve` mock queue | Workflow owner | Accept for design demo | HR confirms sufficient for Manager persona |
| Issue | STA-5 hire field corrections are not fully backend-backed | HR Admin + BA | Design-only review in STA-29 | HR confirms field set/order |
| Issue | STA-23 fail reason LOV remains TODO | HR/BA | Keep as TBD | HR/BA provides final LOV |
| Issue | STA-24 compensation fields sensitive and not payroll-ready | Comp/SPD + Payroll | Mask/illustrate only | Payroll confirms backend-later boundary |
| Dependency | STA-28 owns benefit manager views | Benefits owner | Out-of-scope | HR accepts separation |
| Dependency | Backend blocked | Engineering lead | No implementation before sign-off | HR sign-off required |

---

## 9. Demo checklist for HR review

### Employee checklist

- [ ] Open `/th/profile/me`
- [ ] Review 6 tabs: Personal, Employment, Emergency, Benefits, Documents, Activity/Tax
- [ ] Edit at least one personal field
- [ ] Add effective date and required attachment where applicable
- [ ] Submit and confirm pending badge/card appears
- [ ] Review withdraw behavior for pending change
- [ ] Confirm no dead end from every tab

### Manager checklist

- [ ] Open `/th/manager-dashboard`
- [ ] Open approval queue / pending employee-change state
- [ ] Open `/th/manager-dashboard/probations`
- [ ] Submit probation evaluation for one employee
- [ ] Confirm pending HR state appears
- [ ] Open `/th/workflows/probation`
- [ ] Open `/th/workflows/probation/[id]` and review five outcome options
- [ ] Confirm benefit manager views are acknowledged as STA-28 out-of-scope

### HR Admin / HRBP checklist

- [ ] Open `/th/admin/employees`
- [ ] Search/select one employee
- [ ] Review snapshot, timeline, and lifecycle cards on `/th/admin/employees/[id]`
- [ ] Open hire wizard `/th/admin/hire`
- [ ] Open each required lifecycle route: edit, transfer, acting, pay-rate-change, probation, terminate, rehire, contract-renewal
- [ ] Confirm seed-count reconciliation: 8 stated vs 9 evidenced surfaces
- [ ] Confirm promotion/change-type handling decision
- [ ] Confirm Backend remains blocked until sign-off

---

## 10. HR sign-off section

### Required decision

HR Design Approval for STA-29 Employee Center demo is:

- [ ] Approved — proceed to split Backend-later work items
- [ ] Approved with revisions — update design pack/demo script before Backend
- [ ] Not approved — Backend remains blocked

### Required approvers

| Role | Name | Decision | Date | Notes |
|---|---|---|---|---|
| HR Product Owner | TBD | TBD | TBD | Must approve persona journeys |
| HR Admin / SPD representative | TBD | TBD | TBD | Must approve lifecycle and hire scope |
| HRBP representative | TBD | TBD | TBD | Must approve Manager/HRBP approval surface |
| Comp/SPD or Payroll representative | TBD | TBD | TBD | Must approve STA-24 boundary |
| Engineering lead | TBD | TBD | TBD | Acknowledges Backend blocked until HR approval |

**sign-off rule:** ถ้าไม่มี decision เป็น `Approved` หรือ `Approved with revisions` พร้อมรายการ revision ที่ปิดได้ ห้ามเริ่ม Backend implementation สำหรับ Employee Center demo scope นี้

---

## 11. Acceptance criteria mapping

| AC | Evidence in this pack |
|---|---|
| 1. One end-to-end journey per Employee, Manager, HR Admin/HRBP with no dead ends | Sections 3.1–3.3 and checklist |
| 2. Every visible section has route/source/owner/TBD notes | Sections 2, 3, 5 |
| 3. Gaps vs STA-5, STA-23, STA-24 split design-only vs backend-later | Section 6 |
| 4. Backend blocked until HR sign-off | Sections 1, 7, 10 |
| 5. Admin lifecycle routes enumerated and seed 8 vs repo 9 reconciled | Section 4 |
| 6. Employee self-service profile 6-tab edit and pending-change flow covered | Section 3.1 |
| 7. Manager probation approval/review and pending employee-change state covered; benefit manager views out of scope STA-28 | Section 3.2 |
| 8. Includes sign-off, RAID/TBD, demo checklist | Sections 8, 9, 10 |
| 9. Document-only; no frontend/backend implementation | Sections 1 and 7 |

---

## 12. Knowledge sources consulted

- `AGENTS.md`
- `/Users/tachongrak/.ouroboros/seeds/seed_19e991472285.yaml`
- `specs/prd-ec-employee-central-v1.md`
- `specs/sta-28-quick-approve-redesign-v5.md`
- `src/frontend/src/app/[locale]/profile/me/page.tsx`
- `src/frontend/src/app/[locale]/ess/profile/edit/page.tsx`
- `src/frontend/src/app/[locale]/workflows/page.tsx`
- `src/frontend/src/app/[locale]/workflows/probation/page.tsx`
- `src/frontend/src/app/[locale]/quick-approve/page.tsx`
- `src/frontend/src/components/manager/quick-approve-page.tsx`
- `src/frontend/src/app/[locale]/quick-approve/[id]/page.tsx`
- `src/frontend/src/app/[locale]/workflows/probation/[id]/page.tsx`
- `src/frontend/src/app/[locale]/manager-dashboard/page.tsx`
- `src/frontend/src/app/[locale]/manager-dashboard/probations/page.tsx`
- `src/frontend/src/app/[locale]/admin/employees/page.tsx`
- `src/frontend/src/app/[locale]/admin/employees/[id]/page.tsx`
- `src/frontend/src/app/[locale]/admin/hire/page.tsx`
- `src/frontend/src/app/[locale]/admin/employees/[id]/edit/page.tsx`
- `src/frontend/src/app/[locale]/admin/employees/[id]/transfer/page.tsx`
- `src/frontend/src/app/[locale]/admin/employees/[id]/acting/page.tsx`
- `src/frontend/src/app/[locale]/admin/employees/[id]/pay-rate-change/page.tsx`
- `src/frontend/src/app/[locale]/admin/employees/[id]/probation/page.tsx`
- `src/frontend/src/app/[locale]/admin/employees/[id]/terminate/page.tsx`
- `src/frontend/src/app/[locale]/admin/employees/[id]/rehire/page.tsx`
- `src/frontend/src/app/[locale]/admin/employees/[id]/contract-renewal/page.tsx`
- Linear read-only issue evidence: STA-5, STA-23, STA-24
- `omx_wiki/index.md`: none found; no canary token available
