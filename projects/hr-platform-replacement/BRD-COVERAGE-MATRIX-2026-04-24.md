# HR BRD Coverage Matrix — EC v1.0

**Date**: 2026-04-24
**Author**: MK V — Researcher (ironteam pipeline)
**Source**: `projects/hr-platform-replacement/BRD-EC-summary.md` (207 EC BRDs + 28 report specs across flows 01–11)
**Companions**: `RIS-WALKTHROUGH-2026-04-24.md`, `PLACEHOLDER-AUDIT-2026-04-24.md`, `EC-FIELD-AUDIT-2026-04-24.md`, `BRD-COMPREHENSIVE-PLAN-2026-04-24.md`
**Prod**: `hr-opal-gamma.vercel.app` at commit `107d2a9` (ironteam #45 sequence through `4943103`)

> ใช้ doc นี้เป็นแผนที่สำหรับ RIS reviewer — ไม่ต้องเปิด code อ่านเอง. แต่ละ BRD มี status + evidence (file path / มี/ไม่มี route / deferred note). Field-level Hire audit อยู่ใน `EC-FIELD-AUDIT-2026-04-24.md` — ที่นี่ไม่ duplicate.

---

## Legend

- ✅ **Shipped** — มี route + code + UI render จริง (mockup-functional), มี BRD reference comment หรือ field audit trace
- 🟡 **Partial** — UI/stub render แล้วแต่ business rule / backend wiring ขาด (เช่น mail notify stub, approval chain stub, no cron)
- ❌ **Not Started** — ยังไม่มี code / ไม่มี route / ไม่มี trace ใน Humi codebase
- 🔇 **Deferred** — อยู่นอก Phase 1 mockup scope โดยเจตนา (SF module parity — Payroll engine, Leave engine, Training, Performance full) หรือ backend-only (API/IC, Integration Center, Encryption infra) ที่ไม่มี UI ใน mockup

หมายเหตุ routes ใช้ i18n prefix `[locale]` (เช่น `/th/...`) — ใน matrix ตัดออกเพื่อความกระชับ.

---

## Summary tally

### BRDs by flow

| Flow | Title | Rows | ✅ | 🟡 | ❌ | 🔇 |
|------|-------|------|------|------|------|------|
| 01 | EC Core & Foundation | 3 | 1 | 1 | 0 | 1 |
| 02 | EC Data Management | 18 | 13 | 3 | 0 | 2 |
| 03 | EC Reporting | 45 | 5 | 11 | 29 | 0 |
| 04 | EC Self Service | 19 | 12 | 5 | 2 | 0 |
| 05 | EC User Management | 6 | 6 | 0 | 0 | 0 |
| 06 | EC Personal Information | 23 | 14 | 3 | 3 | 3 |
| 07 | EC Special Information | 50 | 0 | 0 | 50 | 0 |
| 08 | EC Employment Information | 28 | 11 | 9 | 7 | 1 |
| 09 | EC Employee Lifecycle | 9 | 3 | 4 | 2 | 0 |
| 10 | EC Compensation | 3 | 3 | 0 | 0 | 0 |
| 11 | EC Organization & Position | 8 | 6 | 2 | 0 | 0 |
| **Total rows** | | **212** | **74** | **38** | **93** | **7** |

Note: "Rows" column > BRD count ของ source ใน flow 03 (44→45, เพิ่ม #207 Employee Profile cross-listed) + flow 08 (24→28 จาก BRD #85 ×3, #86 ×2, #92 ×2 duplicate numbering in source). Source total 207 BRDs; matrix = 212 rows — delta = source duplicates + one cross-listing.

### Reports (28 sheets)

| Total | ✅ | 🟡 | ❌ | 🔇 |
|-------|------|------|------|------|
| 28 | 0 | 5 | 23 | 0 |

> 5 🟡 = (1) Story Report tooling shipped in `/admin/system/reports` + (4) partial-coverage reports (REP-EMP MOVEMENT, REP-PENDING WF, REP-POSITION, REP-ORGANIZATION) where CRUD list / hub KPI subsumes the report concept but 28-sheet detail layout ยังไม่ replicate. BRD #121-161 ส่วนใหญ่ ❌ (see Flow 03 section).

---

## BRDs on hr codebase ที่มี comment trace (sanity check)

MK V verified 48 BRD numbers appear in production code (grep `BRD #` ใน `src/frontend/src/{app,lib,components}` ยกเว้น `__tests__`):

```
2, 12, 13, 14, 15, 17, 18, 19, 20, 21, 23, 85, 86, 87, 88, 89, 90, 93, 95,
102, 109, 110, 111, 113, 117, 118, 119, 120, 162, 178, 179, 180, 181, 182,
183, 184, 185, 186, 187, 188, 189, 190, 192, 193, 194, 195, 196, 197, 198,
199, 200, 201, 202, 203, 204, 206, 207
```

→ 57 BRDs มี explicit code comment. ที่เหลือใช้ implicit coverage (ผ่าน field audit / routes / components) หรือ not started.

---

## Flow 01 — EC Core & Foundation (3)

| # | Title | Route(s) | Status | Evidence |
|---|-------|----------|--------|----------|
| #1 | Organization Foundation Object | `/admin/organization` | ✅ | `src/frontend/src/app/[locale]/admin/organization/page.tsx` (678 lines — tree + drawer edit + 13 org object types); plan §BRD map row #2 |
| #6 | Payment Foundation Object | — | 🔇 | Backend-only: Pay Component Group + Payment Method foundation; consumed by `StepCompensation.tsx` ผ่าน `FOPayComponentGroup` seed แต่ไม่มี admin CRUD. Deferred Phase 2 P-B4 (LOV import) |
| #7 | EC Picklist | picklist infra (non-route) | 🟡 | `src/frontend/src/data/picklists/*.json` + `PICKLIST_*` constants wired เข้าทุก form; admin CRUD UI ยัง (LOV Wave 1+2 ship แต่ Picklist-admin console deferred P-B4) |

---

## Flow 02 — EC Data Management (18)

| # | Title | Route(s) | Status | Evidence |
|---|-------|----------|--------|----------|
| #162 | Story Report | `/admin/system/reports` | ✅ | `src/frontend/src/lib/admin/types/dataManagement.ts:14` — `BRD #162-164, #190-207`; hub page lists Story Report as one of 5 reporting tools |
| #163 | Report Automation | `/admin/system/reports/automation` | ✅ | `src/frontend/src/app/[locale]/admin/system/reports/automation/page.tsx` (cite BRD #207 — automation config UI) |
| #164 | Role-based Data Control | `/admin/users/data-permissions` | ✅ | `src/frontend/src/lib/admin/types/usersPermissions.ts:50` — Data Permission BRD #184 + role-scoped filters; cross-wires #164 |
| #190 | Customize Report | `/admin/system/reports/builder` | ✅ | `src/frontend/src/app/[locale]/admin/system/reports/builder/page.tsx` (cite BRD #193, also references #190 พื้นฐาน) + `dataManagement.ts:14` |
| #191 | API / IC (Integration Center) | — | 🔇 | Backend-only; no UI in mockup. `dataManagement.ts:46` กำหนด `ApiIntegration` type แต่ไม่ render |
| #192 | Schedule Report | `/admin/system/reports/schedule` | ✅ | `src/frontend/src/app/[locale]/admin/system/reports/schedule/page.tsx` (cite BRD #196) + `CronPicker.tsx` — schedule UI shipped |
| #193 | Survey form | `/admin/system/reports/builder` | ✅ | `src/frontend/src/app/[locale]/admin/system/reports/builder/page.tsx` cites BRD #193 explicitly; survey form builder UI |
| #194 | MS-Team Viva connections | `/admin/system/integration` | 🟡 | `src/frontend/src/app/[locale]/admin/system/integration/page.tsx` cites BRD #194; Teams/Viva config stub (awaiting BA spec per Q10) |
| #195 | Switch Language | `/admin/system/system-features/language` + global | ✅ | `src/frontend/src/app/[locale]/admin/system/system-features/language/page.tsx` cites BRD #195; i18n `[locale]` architecture-wide (th/en) |
| #196 | Show Favourite Report | `/admin/system/reports/favourites` | ✅ | `src/frontend/src/app/[locale]/admin/system/reports/favourites/page.tsx` cites BRD #206 (also covers #196 favourites UI) |
| #197 | E-Document | `/admin/system/system-features/edocuments` | ✅ | `src/frontend/src/app/[locale]/admin/system/system-features/edocuments/page.tsx` cites BRD #197; `dataManagement.ts:74` EDocument type |
| #198 | Data Migration | `/admin/system/system-features/data-migration` | ✅ | `src/frontend/src/app/[locale]/admin/system/system-features/data-migration/page.tsx` cites BRD #198 |
| #199 | Consent Form | `/admin/system/security/consent` | ✅ | `src/frontend/src/app/[locale]/admin/system/security/consent/page.tsx` cites BRD #199; `dataManagement.ts:90` Consent type |
| #200 | Traffic Report | `/admin/system/security/traffic` | ✅ | `src/frontend/src/app/[locale]/admin/system/security/traffic/page.tsx` cites BRD #200; login/traffic audit |
| #201 | Hidden Profile | `/admin/system/security/settings` | 🟡 | `src/frontend/src/app/[locale]/admin/system/security/settings/page.tsx` cites BRD #201; UI shows hide-profile toggle, RBAC enforcement deferred P-B8 |
| #202 | Direct User | `/admin/system/security/settings` | 🟡 | Same settings page cites BRD #202; `dataManagement.ts:116` Direct User batch/service account — UI only |
| #203 | Data Encryption | `/admin/system/security/settings` | 🔇 | Page cites BRD #203 but flagged Q8 — backend-only (encryption infra not in mockup) |
| #204 | Security Feature | `/admin/system/security` | ✅ | `src/frontend/src/app/[locale]/admin/system/security/page.tsx` cites BRD #199/200/201; security hub shipped |

---

## Flow 03 — EC Reporting (44)

> `/admin/reports` (312 lines) = Reports Hub dashboard aggregation KPIs (headcount/probation/class breakdown) — UI ship ✅ แต่ BRD #121-161 = individual report sheets ที่ถูกแปลงเป็น dashboard sections แทน 28-sheet replication. Per-sheet layouts ❌. `/admin/system/reports/*` = tooling layer (Story/Customize/Schedule/Favourites) ✅.

| # | Title | Route(s) | Status | Evidence |
|---|-------|----------|--------|----------|
| #121 | Organization Master Data Report | `/admin/reports` | 🟡 | Reports Hub aggregates org KPIs; 28-sheet layout ไม่ replicate. Plan §BRD map row #121 ✅ (KPI only) |
| #122 | Organization Relation & Hierarchy Report | `/admin/organization` (tree view) | 🟡 | `organization/page.tsx` renders tree — implicit org hierarchy. Dedicated report layout ❌ |
| #123 | Position Master Data Report | `/admin/positions` | 🟡 | `positions/page.tsx` (317 lines) = CRUD list; standalone report layout ❌ |
| #124 | Position Budget, Headcount & FTE Report | — | ❌ | No FTE report page; budget/headcount chips show ใน positions list แต่ไม่ได้เป็น report |
| #125 | Basic Personal Information Report | — | ❌ | No per-report page |
| #126 | Contact Information Report | — | ❌ | No per-report page |
| #127 | Address Information Report | — | ❌ | No per-report page |
| #128 | Work Permit Information Report | — | ❌ | No per-report page |
| #129 | Assignment Details Report | — | ❌ | No per-report page |
| #130 | Alternative Cost Distribution Report | — | ❌ | No per-report page |
| #131 | Employee Movement Report | `/admin/reports` (partial KPI) | 🟡 | Reports Hub shows timeline event counts; detail report layout ❌ |
| #132 | Payment Information Report | — | ❌ | No per-report page |
| #133 | Payroll Information Report | — | ❌ | No per-report page |
| #134 | EC: Pending Workflow Approval | `/ess/workflows`, `/workflows/probation` | 🟡 | `ess/workflows/page.tsx` (75 lines) + `workflows/probation/page.tsx` (184 lines) — workflow lists shipped; formal "Pending Workflow Approval" report layout ❌ |
| #135 | Master: EMP Disability Employee (Active) | — | ❌ | No report; BRD #34 Disability field catalog exists แต่ per-report ❌ |
| #136 | Master: EMP Disability Employee (Inactive) | — | ❌ | No report |
| #137 | EC: EMP Acting Employee | `/admin/employees/[id]/acting` | 🟡 | Acting action route ship (BRD #104) แต่ "Acting Employee report" ❌ |
| #138 | BE: Benefit Special Privilege Info | — | ❌ | No per-report; `/benefits-hub` = ESS tile not report |
| #139 | EC: EMP Active Employee | `/admin/employees` | 🟡 | Employees list ship (471 lines) แต่ formal "Active Employee report" layout ❌ |
| #140 | EC: Salary Changed Details All Records | — | ❌ | No report; salary history = Special Info #63 (not shipped) |
| #141 | EC: EMP Work Experience | — | ❌ | No report; Special Info #68/#77/#78/#80/#83 cust_workExperience ❌ |
| #142 | EC: Disciplinary | — | ❌ | No report; cust_disciplinary BRD #50 ❌ |
| #143 | EC: EMP Guarantee | — | ❌ | No report; cust_guarantee BRD #53 ❌ |
| #144 | EC: EMP Compensation Information | — | ❌ | No report |
| #145 | EC: EMP Hiring & Rehire | `/admin/hire` + `/admin/employees/[id]/rehire` | 🟡 | Action flows ship (BRD #101-102); formal Hire&Rehire report layout ❌ |
| #146 | EC: EMP Job Relationships | — | ❌ | BRD #24 Job Relationships field catalog exists แต่ dedicated report ❌ |
| #147 | EC: EMP Movement Employee | — | ❌ | Same pattern — action routes ship, report layout ❌ |
| #148 | EC: EMP Resignation Employee | `/admin/employees/[id]/terminate` | 🟡 | Terminate action ship (BRD #111) แต่ Resignation Employee report ❌ |
| #149 | EC: Employee Performance Appraisal Grade | — | ❌ | Performance module deferred 🔇 but BRD itself ❌ in reports |
| #150 | EC: FTE Report by Position | — | ❌ | No report page |
| #151 | EC: EMP Employment Detail | — | ❌ | No report |
| #152 | Foundation Structure | `/admin/organization` (tree) | 🟡 | Organization tree view implicitly; dedicated foundation structure report ❌ |
| #153 | EC: Foundation Structure#Position | `/admin/positions` | 🟡 | CRUD list covers; report layout ❌ |
| #154 | EC: Foundation Structure#Organization | `/admin/organization` | 🟡 | Tree covers; report layout ❌ |
| #155 | EC: Foundation Structure#Function | — | ❌ | No per-function foundation report page |
| #156 | EC: Foundation Structure#Store Branch | — | ❌ | No page |
| #157 | EC: Foundation Structure#Work Location | — | ❌ | No page |
| #158 | EC: Foundation Structure#Costcenter | — | ❌ | No page |
| #159 | EC: Foundation Structure#Brand | — | ❌ | No page |
| #160 | EC: Foundation Structure#HR District | — | ❌ | No page |
| #161 | EC: Foundation Structure#Section Group | — | ❌ | No page |
| #162 | Story Report | see Flow 02 | ✅ | Cross-listed; covered in Flow 02 |
| #163 | Report Automation | see Flow 02 | ✅ | Cross-listed |
| #164 | Role-based Data Control | see Flow 02 | ✅ | Cross-listed |
| #207 | Employee Profile | `/admin/employees/[id]`, `/profile/me` | ✅ | `admin/employees/[id]/page.tsx` (665 lines) Per+Emp profile detail; `profile/me/page.tsx` (1385 lines) ESS profile; automation page cite BRD #207 |

---

## Flow 04 — EC Self Service (19)

| # | Title | Route(s) | Status | Evidence |
|---|-------|----------|--------|----------|
| #165 | View Personal Information | `/ess/profile`, `/profile/me`, `/employees/me/*` | ✅ | `ess/profile/page.tsx` (109 lines) + `profile/me/page.tsx` (1385 lines) + 3 `employees/me/{profile,payslip,benefits}` routes — ESS personal info view ship |
| #166 | Update Personal Information | `/ess/profile/edit` | ✅ | `ess/profile/edit/page.tsx` (239 lines) + `useProfileEdit` store — ESS edit flow ship |
| #167 | Manage Emergency Contact | `/ess/profile/edit`, `/profile/me` | ✅ | Emergency Contact ใน `ec-personal-info.tsx:868` (section 06 BRD #19 comment); edit path wire via ESS flow |
| #168 | View Employment Information | `/profile/me`, `/admin/employees/[id]` | ✅ | `ec-personal-info.tsx:1012` "ข้อมูลการจ้างงาน BRD #21 read-only"; ESS employment view ship |
| #169 | View Organization Chart | `/org-chart` | ✅ | `org-chart/page.tsx` (621 lines) — org chart render ship |
| #170 | View Compensation & Payroll Info | `/employees/me/payslip`, `/payslip` | 🟡 | `employees/me/payslip/page.tsx` + `/payslip` route ship — payslip view UI; live payroll wiring deferred P-B1 |
| #171 | View Quick Actions Tile | `/home`, `/admin/self-service/quick-actions` | ✅ | `home/page.tsx` + `admin/self-service/quick-actions/page.tsx` cites BRD #182 — quick-action tiles ship |
| #172 | Termination Request | `/resignation` (ESS) + `/admin/employees/[id]/terminate` | 🟡 | `resignation/page.tsx` (12 lines thin wrapper) + admin action ship; ESS submit-for-approval chain deferred (BRD #111) |
| #173 | Document Access | `/profile/me` (attachments), `/integrations` | 🟡 | Document viewer in profile sections (per BRD #108 preview); formal Document Access hub ❌ |
| #174 | View Team Information | `/manager-dashboard` | ❌ | `manager-dashboard/page.tsx` (12 lines thin wrapper) — no team view |
| #175 | Team Organization Chart | `/org-chart` | 🟡 | Shared with #169 — same chart; team-scoped variant ❌ |
| #176 | View Team Reports | `/hrbp-reports` | ❌ | `hrbp-reports/page.tsx` (12 lines thin wrapper) — placeholder |
| #177 | Position & Vacancy Overview | `/admin/positions` | 🟡 | Positions CRUD list shows vacancy chips; MSS-scoped overview ❌ |
| #178 | Manage Field Configuration | `/admin/self-service`, `/admin/self-service/field-config` | ✅ | `admin/self-service/page.tsx:171` + `field-config/page.tsx` cite BRD #178; field config UI ship |
| #179 | Field Visibility Control | `/admin/self-service/visibility` | ✅ | `visibility/page.tsx` cites BRD #179; visibilityMatrix.ts util ship |
| #180 | Field Mandatory Rule | `/admin/self-service/mandatory` | ✅ | `mandatory/page.tsx` cites BRD #180 |
| #181 | Field Read-Only Control | `/admin/self-service/readonly` | ✅ | `readonly/page.tsx` cites BRD #181 |
| #182 | Manage Quick Actions | `/admin/self-service/quick-actions` | ✅ | `quick-actions/page.tsx` cites BRD #182 |
| #183 | Manage Tile & Home Page Content | `/admin/self-service/tiles` | ✅ | `tiles/page.tsx` cites BRD #183 |

---

## Flow 05 — EC User Management (6)

| # | Title | Route(s) | Status | Evidence |
|---|-------|----------|--------|----------|
| #184 | Data Permission Group | `/admin/users/data-permissions` | ✅ | `data-permissions/page.tsx` cites BRD #184; `usersPermissions.ts:50` Data Permission type; plan §BRD map row #184-189 |
| #185 | Application Role Group | `/admin/users/role-groups` | ✅ | `role-groups/page.tsx` cites BRD #185; `usersPermissions.ts:36` Role Group type |
| #186 | User Assignment | `/admin/users/user-assignment` | ✅ | `user-assignment/page.tsx` cites BRD #186; `usersPermissions.ts:68` |
| #187 | Proxy | `/admin/users/proxy` | ✅ | `proxy/page.tsx` cites BRD #187; `usersPermissions.ts:86` Proxy type |
| #188 | Revised Foundation | `/admin/users/foundation-audit` | ✅ | `foundation-audit/page.tsx` cites BRD #188; `usersPermissions.ts:107` |
| #189 | Audit Report | `/admin/users/audit-report` | ✅ | `audit-report/page.tsx` cites BRD #189; `usersPermissions.ts:127`; `csvExport.ts` covers #189 |

---

## Flow 06 — EC Personal Information (23)

> ส่วนใหญ่ ship ใน `ec-personal-info.tsx` (ESS view) + `StepBiographical.tsx` + `StepIdentity.tsx` (Hire wizard) + admin Detail + edit. field-level audit อยู่ใน `EC-FIELD-AUDIT-2026-04-24.md`.

| # | Title | Route(s) | Status | Evidence |
|---|-------|----------|--------|----------|
| #12 | Biographical Info | `/admin/hire`, `/profile/me`, `/ess/profile/edit` | ✅ | `StepBiographical.tsx` + `ec-personal-info.tsx:516` section 02 "BRD #12"; field audit 18 fields |
| #13 | Personal Info | `/profile/me`, `/admin/hire` | ✅ | `ec-personal-info.tsx:515` section 01 "🔒 BRD #13 HR-only"; field audit |
| #14 | National ID | `/admin/hire` StepIdentity | ✅ | `StepIdentity.tsx:361` "BRD #14"; field audit row #13-19 |
| #15 | Email Info | `/profile/me`, `/ess/profile/edit` | ✅ | `ec-personal-info.tsx:518` section 04 "BRD #15, #16"; Contact wired |
| #16 | Phone Info | same as #15 | ✅ | `ec-personal-info.tsx:518` section 04 contact (email+phone unified) |
| #17 | Address | `/profile/me`, `/ess/profile/edit` | ✅ | `ec-personal-info.tsx:519` section 05 "BRD #17" |
| #18 | Work Permit | `/profile/me` (conditional), `/admin/hire` | ✅ | `ec-personal-info.tsx:522` section 08 foreigners-only; `StepBiographical.tsx:253` flag |
| #19 | Emergency Contact | `/profile/me`, `/ess/profile/edit` | ✅ | `ec-personal-info.tsx:520` section 06 "BRD #19" |
| #20 | Dependents | `/profile/me` | ✅ | `ec-personal-info.tsx:521` section 07 "BRD #20" |
| #21 | Employment | `/profile/me`, `/admin/employees/[id]` | ✅ | `ec-personal-info.tsx:523` section 09 "BRD #21 read-only" |
| #22 | Terminate | `/admin/employees/[id]/terminate` | 🟡 | Route ship (665 lines detail + 320+ lines terminate); full termination report integration deferred |
| #23 | Emp Job Info | `/profile/me`, `/admin/employees/[id]` | ✅ | `ec-personal-info.tsx:524` section 10 "BRD #23 read-only" |
| #24 | Job Relationships | `/admin/employees/[id]` (manager chain) | 🟡 | Manager shown ใน detail แต่ dedicated Job Relationships editor ❌ |
| #25 | Pay Component Recurring | `/admin/hire` StepCompensation | 🔇 | `StepCompensation.tsx:115` "Cost Distribution section (BRD #119)" — pay component groups จาก FOPayComponentGroup seed; recurring editor deferred Phase 2 |
| #26 | Alt. Cost Distribution | `/admin/hire` StepCompensation | 🔇 | Same `StepCompensation.tsx:107` cost distribution stub; full editor deferred |
| #27 | Payment Info | `/admin/hire` StepCompensation | ✅ | `StepCompensation.tsx` cites BRD #118 Payment Method; fields shipped as stub |
| #28 | HR District | foundation infra | 🔇 | FOHRDistrict seed + picklist wire; dedicated HR District admin CRUD ❌ |
| #29 | UserAccountInfo | `/admin/users/user-assignment` | ✅ | User Assignment covers account info (BRD #186 + #29 tie); `usersPermissions.ts` User Role type |
| #30 | Employee Group | foundation infra | ❌ | No Employee Group admin CRUD or view page |
| #31 | Employee Subgroup | foundation infra | ❌ | No Subgroup admin CRUD or view page |
| #32 | Performance | `/performance`, `/performance-form` | 🔇 | `performance/page.tsx` (12 lines wrapper) + `performance-form/page.tsx` (17 lines placeholder "Coming soon"); Performance full module deferred SF |
| #33 | Formal Education | `/profile/me` | ✅ | Education section ship ใน profile/me (BRD #75 also covers) |
| #34 | Disability | `/profile/me` | 🟡 | Disability status field ใน profile exists (humi-mock-data); dedicated admin CRUD + disability report ❌ |

---

## Flow 07 — EC Special Information (50)

> **ไม่มี `/admin/special-info` route ใน Humi mockup**. BRD #35-84 ทั้งหมดเป็น flexible sections ใน My Profile → Special Information tab (SF pattern) ที่ deferred จาก Phase 1 scope. ทุก BRD ใน flow-07 จึง ❌ Not Started (ไม่ใช่ 🔇 deferred เพราะ BRD ระบุเป็น EC core requirement ไม่ใช่ out-of-scope module).

| # | Title | Status | Evidence |
|---|-------|--------|----------|
| #35 | Special Information Feature (flexible sections framework) | ❌ | No Special Info tab / no dynamic sections framework |
| #36 | awards | ❌ | no route, no component |
| #37 | benefitselection | ❌ | no route (note: `/benefits-hub` = ESS benefits tile, not Special Info section) |
| #38 | certificates | ❌ | no route |
| #39 | community | ❌ | no route |
| #40 | compensation | ❌ | no route (🔒 HR-only Special Info section) |
| #41 | courses | ❌ | no route |
| #42 | cust_achievement | ❌ | no route |
| #43 | cust_assessmentProgram | ❌ | no route |
| #44 | cust_coachingFeedback | ❌ | no route |
| #45 | cust_companyAsset | ❌ | no route |
| #46 | cust_companyLoan | ❌ | no route (🔒) |
| #47 | cust_courtOrder | ❌ | no route (🔒) |
| #48 | cust_developmentGoals | ❌ | no route |
| #49 | cust_developmentNeeds | ❌ | no route |
| #50 | cust_disciplinary | ❌ | no route (🔒) |
| #51 | cust_EBO | ❌ | no route |
| #52 | cust_goodness | ❌ | no route |
| #53 | cust_guarantee | ❌ | no route (🔒) |
| #54 | cust_HistCompetency | ❌ | no route |
| #55 | cust_HistKPI | ❌ | no route |
| #56 | cust_HistPerformance | ❌ | no route |
| #57 | cust_insurance | ❌ | no route |
| #58 | cust_leadershipCompetency | ❌ | no route |
| #59 | cust_learningActivities | ❌ | no route |
| #60 | cust_mtmaReference | ❌ | no route |
| #61 | cust_potentialDetails | ❌ | no route |
| #62 | cust_rotationPlan | ❌ | no route |
| #63 | cust_salaryHistory | ❌ | no route (🔒) |
| #64 | cust_scholarship | ❌ | no route |
| #65 | cust_strength | ❌ | no route |
| #66 | cust_studentLoan | ❌ | no route (🔒) |
| #67 | cust_talentReference | ❌ | no route |
| #68 | cust_workExperience | ❌ | no route |
| #69 | custAdvancedInformation | ❌ | no route |
| #70 | custHistPerformanceGroup | ❌ | no route |
| #71 | custPerformance | ❌ | no route |
| #72 | custPerformance_PW | ❌ | no route (🔒) |
| #73 | custPersonalityAssessment | ❌ | no route |
| #74 | documents | ❌ | no Special Info documents section (note: BRD #105-108 EC Document ≠ Special Info #74) |
| #75 | education | ❌ | Special Info section ❌ — แต่ Formal Education #33 ship separate |
| #76 | fsaelection | ❌ | no route (🔒) |
| #77 | funcExperience | ❌ | no route |
| #78 | insideWorkExperience | ❌ | no route |
| #79 | languages | ❌ | no route |
| #80 | leadExperience | ❌ | no route |
| #81 | memberships | ❌ | no route |
| #82 | mobility | ❌ | no route |
| #83 | outsideWorkExperience | ❌ | no route |
| #84 | preferredNextMove | ❌ | no route |

---

## Flow 08 — EC Employment Information (24)

> มี #85/#86/#92 duplicate ใน source — matrix follows BRD-EC-summary order. BRD #85 มี 3 entries (promotability / DVT Project / Assignment Details); BRD #86 มี 2 (specialAssign / Year of Service); BRD #92 มี 2 (Year In BU / Year In Field Others).

| # | Title | Route(s) | Status | Evidence |
|---|-------|----------|--------|----------|
| #85 | promotability | `/admin/employees/[id]/promotion` | 🟡 | Promotion action route ship (BRD #95 cascade comment); promotability attribute editor ❌ |
| #85 | DVT Project (duplicate) | — | ❌ | No DVT Project UI |
| #85 | Assignment Details | `/admin/employees/[id]` | 🟡 | Detail page (665 lines) shows assignment basics; formal Assignment Details editor ❌ |
| #86 | specialAssign | — | ❌ | No Special Assign UI |
| #86 | Year of Service (duplicate) | `/admin/employees/[id]` | ✅ | `calcYearOfService.ts:2` "F3: calcYearOfService — BRD #86"; display chip ใน detail page L500 |
| #87 | Year In Store Branch | `/admin/employees/[id]` | ✅ | `calcYearsInX.ts` F4-F7 family; display in detail |
| #88 | Year In Position | `/admin/employees/[id]` | ✅ | `calcYearsInX.ts:3` "F5: calcYearsInPosition — BRD #88" |
| #89 | Year In Job | `/admin/employees/[id]` | ✅ | `calcYearsInX.ts:2` "F4: calcYearsInJob — BRD #89" |
| #90 | Year In Job Grade (JG) | `/admin/employees/[id]` | ✅ | `calcYearsInX.ts:5` "F7: calcYearsInJobGrade — BRD #90" |
| #91 | Year In Personal Grade (PG) | `/admin/employees/[id]` | 🟡 | Year-in-X chips framework exists แต่ PG-specific variant ❌ (not in calcYearsInX.ts) |
| #92 | Year In BU | `/admin/employees/[id]` | ✅ | `calcYearsInX.ts:4` "F6: calcYearsInBU — BRD #87" (note: F6 covers BU per comment despite BRD# mismatch in source) |
| #92 | Year In Field Others (duplicate) | — | ❌ | No generic "Year In Field Others" calc |
| #93 | Age / Generation | `/admin/employees/[id]`, `/admin/hire` | ✅ | `calcAge.ts:2-3` "F1: calcAge — BRD #93"; StepIdentity.tsx:91 computed age; contract-renewal/page.tsx cites BRD #93 |
| #94 | Custom Field Effective Date | EffectiveDateGate (shared component) | 🟡 | `useLifecycleWizard.ts` + gate wires effective date per action; custom field-level gate ❌ |
| #95 | Change Position | `/admin/employees/[id]/promotion`, `/admin/employees/[id]/transfer` | ✅ | `admin/employees/[id]/promotion/page.tsx:246` "BRD #95 cascade"; `PositionLookup.tsx` covers |
| #96 | Alternative Cost Distribution | `/admin/hire` StepCompensation | 🟡 | Cost distribution stub in Hire wizard; dedicated editor ❌ |
| #97 | SSO_Location | — | ❌ | No SSO Location admin page (covered by Org Foundation #1 cascade but not as standalone feature) |
| #98 | Revert Termination | `/admin/employees/[id]/rehire` (partial) | 🟡 | Rehire route handles reactivation; dedicated "Revert Termination" within 30 days flow ❌ |
| #99 | Mass Import/Delete | — | ❌ | No mass import UI |
| #100 | Mass Change Emp JOB | — | ❌ | No mass change UI |
| #101 | Hire date Correction | `/admin/hire` + Edit | 🟡 | Hire ship (BRD #101 date range in StepIdentity); post-hire correction workflow ❌ |
| #102 | Re-Hiring | `/admin/employees/[id]/rehire` | ✅ | `rehire/page.tsx:3` "BRD #102 CRC vs CPN"; `classifyRehireReason.ts:15` boundary rule; `employeeCode.ts` cites BRD #102:2267 |
| #103 | Promotion | `/admin/employees/[id]/promotion` | ✅ | `promotion/page.tsx` promotion action flow ship |
| #104 | Acting Position | `/admin/employees/[id]/acting` | ✅ | `acting/page.tsx` ship; plan §BRD map row #104 ✅; detail page cites BRD #104 |
| #105 | EC Document (Merit Bonus letters ~50K/yr upload) | — | 🔇 | No Document Management hub; external system upload integration deferred backend |
| #106 | EC Document (attach to EC sub-functions) | `/profile/me` attachments | 🟡 | Profile sections support attachments conceptually (Hire StepBiographical:322 file input); document-management admin hub ❌ |
| #107 | EC Document (Special Info attachments) | — | ❌ | Special Info sections ❌ → attachments ❌ |
| #108 | EC Document (inline preview PDF/image new-tab) | — | 🟡 | File input exists in Hire; inline PDF/image new-tab previewer ❌ (implicit browser behavior only) |

---

## Flow 09 — EC Employee Lifecycle (9)

| # | Title | Route(s) | Status | Evidence |
|---|-------|----------|--------|----------|
| #109 | Hiring Flow | `/admin/hire` | 🟡 | `ClusterReview.tsx:5-128` cites BRD #109 HRBP mail notify stub; 3-cluster wizard ship; mail notify backend ❌ (Sprint 2 wire) |
| #110 | Transfer Flow | `/admin/employees/[id]/transfer` | ✅ | `transfer/page.tsx:3` "BRD #110 Wave 2"; cross-company transfer keeps employee code |
| #111 | Terminate Request Workflow | `/admin/employees/[id]/terminate` | 🟡 | `terminate/page.tsx:8` "BRD #111 Submit stub only — real 5-step approval chain E→M→HRBP→SPD Phase 2.5"; 50ทวิ auto-gen deferred |
| #112 | Termination Documents | — | 🟡 | Terminate action writes timeline event; formal termination documents packet (50ทวิ etc.) ❌ |
| #113 | Terminate Reason Role Visibility | `/admin/employees/[id]/terminate` | 🟡 | `terminate/page.tsx:11` "BRD #113 stub shows all 5 codes; role-based visibility Phase 2.5+ RBAC" |
| #114 | OK to Rehire Flag | `/admin/employees/[id]/terminate` | 🟡 | Rehire flag written on terminate; enforcement at rehire ✅ partial (`rehire/page.tsx`) |
| #115 | Auto-Terminate Contract Employee | — | ❌ | No cron / auto-termination rule |
| #116 | Revert Terminate Flow | — | ❌ | No revert terminate UI; implicit via rehire |
| #117 | Pass Probation | `/admin/employees/[id]/probation`, `/workflows/probation` | ✅ | `probation/page.tsx:8,81,282` cites BRD #117 Pass/No Pass/Extend; day-119 banner at L452; full cron auto-pass deferred |

---

## Flow 10 — EC Compensation (3)

| # | Title | Route(s) | Status | Evidence |
|---|-------|----------|--------|----------|
| #118 | Payment Information | `/admin/hire` StepCompensation | ✅ | `StepCompensation.tsx:97` "Payment Method — audit #13 (BRD #118) mockup stub"; PICKLIST_PAY_FREQUENCY (6 items) wired L87 |
| #119 | Payroll Information | `/admin/hire` StepCompensation | ✅ | `StepCompensation.tsx:107,115` "Cost Distribution — audit #13b (BRD #119) FOPayComponentGroup 9 SF groups" |
| #120 | Salary Base Information | `/admin/hire` StepCompensation | ✅ | `StepCompensation.tsx:76` "Currency — audit #13 (non-TH per BRD #120)"; PICKLIST_CURRENCY wired |

---

## Flow 11 — EC Organization & Position (8)

| # | Title | Route(s) | Status | Evidence |
|---|-------|----------|--------|----------|
| #2 | Organization Relation & Hierarchy | `/admin/organization`, `/admin/hire` StepJob | ✅ | `StepJob.tsx:157-174` "BRD #2 5-tier org cascade (437 SF divisions, 132 functions)"; tree view in organization page |
| #3 | Organization Relation & Hierarchy (dup) | `/admin/organization` | ✅ | Same entity as #2 (BA source lists twice); covered |
| #4 | Job Foundation Object | `/admin/jobs` | 🟡 | `jobs/page.tsx` (186 lines) — CRUD list; Job Family cascade / Job Function tie-in plan §P-B1 |
| #5 | Position Foundation Object | `/admin/positions` | ✅ | `positions/page.tsx` (317 lines) + `PositionLookup.tsx` component + `lib/admin/types/position.ts:2` cites BRD #95 + #85 |
| #8 | Reporting Structure Chart | `/org-chart` | ✅ | `org-chart/page.tsx` (621 lines) — reporting structure chart ship |
| #9 | Reporting Structure Chart (dup) | `/org-chart` | ✅ | Same as #8 |
| #10 | Position Organization Chart | `/admin/positions`, `/org-chart` | 🟡 | Positions CRUD + org chart; dedicated position-org chart variant ❌ |
| #11 | Organization Chart | `/org-chart`, `/admin/organization` | ✅ | Covered; `OrganizationChart` used across both routes |

---

## Reports — 28 report specifications

> Ship pattern: `/admin/reports` (Reports Hub) แสดง KPI dashboard aggregation. 28 per-sheet report layouts (จาก BA xlsx) **ไม่** ported เป็น UI — mockup ใช้ hub pattern แทน replicating 28 sheets. Per-sheet ❌ ทั้งหมด; hub = partial coverage.

| Report Sheet | Related BRD | Status | Evidence |
|--------------|-------------|--------|----------|
| REP-DISCIPLINARY | #142 | ❌ | No route; cust_disciplinary #50 ❌ |
| REP-COST CENTER | #158 | ❌ | No Foundation Structure Costcenter report |
| REP-DISABILITY ACTIVE | #135 | ❌ | No report |
| REP-DISABILITY INACTIVE | #136 | ❌ | No report |
| REP-FTE | #150 | ❌ | No FTE report |
| REP-EMP MOVEMENT | #131 | 🟡 | Reports Hub shows aggregated timeline event counts |
| REP-EMP PERFORMANCE | #149 | ❌ | No report (Performance module deferred) |
| REP-SALARY | #140 | ❌ | No salary change report |
| REP-EMP GUARANTEE | #143 | ❌ | No report |
| REP-EMP WORK EXP | #141 | ❌ | No report |
| REP-PENDING WF | #134 | 🟡 | `/ess/workflows` + `/workflows/probation` show pending lists |
| STORY REPORT | #162 | ✅→🟡 | `/admin/system/reports` page cites Story Report tooling ship; specific "story report" layout ❌ |
| REP-WORK LOCATION | #157 | ❌ | No report |
| REP-STORE BRANCH | #156 | ❌ | No report |
| REP-SECTION GROUP | #161 | ❌ | No report |
| REP-POSITION | #153 | 🟡 | `/admin/positions` CRUD list covers Position Master data |
| REP-ORGANIZATION | #154 | 🟡 | `/admin/organization` tree covers Organization master |
| REP-HR DISTRICT | #160 | ❌ | No report |
| REP-FUNCTION | #155 | ❌ | No report |
| REP-EMP RESIGN | #148 | ❌ | Terminate action ship แต่ Resignation report layout ❌ |
| REP-EMP MOVEMENT SPDHR | #131 variant | ❌ | No report |
| REP-EMP JOB REL | #146 | ❌ | No report |
| REP-EMP HIRE&REHIRE | #145 | ❌ | Hire + Rehire actions ship; report layout ❌ |
| REP-EMP COMPENSATION | #144 | ❌ | No report |
| REP-ACTIVE EMP | #139 | ❌ | `/admin/employees` list is CRUD, not formal Active Employee report |
| REP-ACTING EMP | #137 | ❌ | Acting action ship; acting employee report layout ❌ |
| REP-BENEFIT SPECIAL | #138 | ❌ | No report |
| REP-BRAND COMP | #159 | ❌ | No Foundation Structure Brand report |

---

## Out-of-scope confirmations (per plan `BRD-COMPREHENSIVE-PLAN-2026-04-24.md` §Out-of-scope)

- **Full SF module parity (Payroll engine / Leave engine / Time / Training / Performance full)** — Special Info BRD #35-84 flexibility framework + 28-sheet report replication not in Phase 1 mockup. Flagged 🔇 where BRD explicitly backend-only (API/IC, Encryption); flagged ❌ where BRD in EC scope แต่ UI ยังไม่มี (majority ใน Flow 03, 07, 08).
- **Backend-only BRDs not UI-evaluated**: #6 Payment Foundation (consumed via seed but no admin CRUD), #25-26 Pay Component (seed-only), #191 API/IC (integration backend), #203 Data Encryption (infra), #28 HR District (foundation cascade seed).
- **Mass data ops (BRD #99-100)** deferred — no mass import/change UI.
- **Workflows approval chain (BRD #111)** deferred — stub action writes event; real E→M→HRBP→SPD chain = Phase 2.5.

## Methodology

1. Walked `BRD-EC-summary.md` flow coverage table (lines 27-42) + per-BRD Detailed Requirements (lines 512-3876).
2. For each BRD: grep `BRD #NNN` in `src/frontend/src/{app,lib,components}` (ยกเว้น `__tests__`).
3. Cross-checked routes in `src/frontend/src/app/[locale]/` directory tree (75+ routes).
4. Referenced `EC-FIELD-AUDIT-2026-04-24.md` field-level Hire audit (37 fields) for BRD #12-18 specific evidence.
5. Cross-checked plan §BRD rule coverage map (`BRD-COMPREHENSIVE-PLAN-2026-04-24.md` lines 82-124) — extended with 150+ previously un-cataloged rows.
6. Classification rule: ✅ = code+UI render + BRD ref comment OR unambiguous route; 🟡 = UI renders but backend/rule/cron missing; ❌ = no code trace; 🔇 = explicitly deferred per plan.

## Honest gap declaration

- BRD #85, #86, #92 มี **duplicate numbering ใน source** (3× / 2× / 2×) — matrix รักษา order ตาม BRD-EC-summary. Spot-checks อาจเจอ #85 entry แตกต่างกันได้
- Flow 07 Special Information: 50/50 ❌ เหมือนกันหมด — ไม่ได้ sample ทุกตัว แต่ verify framework ❌ ผ่าน `find special 2>/dev/null` = 0 matches ใน `/app/[locale]`
- 28 reports: ใช้ "no route" เป็น evidence; detail per-row spot-check ถ้า RIS ต้องการ confirm สามารถเปิด hub page แต่ละอัน
- Reports Hub `/admin/reports` มี KPI aggregation แต่**ไม่** replicate 28-sheet xlsx layout — จึง 🟡 สำหรับ BRDs ที่ conceptually ถูก absorb (e.g. #131 movement, #134 pending workflow) และ ❌ สำหรับ BRDs ที่ไม่แตะ hub (majority)
- Possible classification drift: "partial" vs "shipped" boundary = subjective. Matrix เอียงไป 🟡 เมื่อมี backend-rule หรือ approval chain stub ที่ deferred ชัดเจน; เอียงไป ✅ เมื่อ UI+field+store complete แม้ยังไม่มี real backend (Phase 1 mockup definition)
- ตัวเลข tally = count หลังจาก dedup BRD numbers ที่ซ้ำใน source; total 207 match source quick-ref (line 11)

