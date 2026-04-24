# BA Forward-Facing Field Catalog — 7 B-Actions

**Date**: 2026-04-24
**Author**: MK V — Researcher
**Purpose**: Forward-facing catalog ให้ BA เอาไปเขียน sheet ต่อ (BA workbook `EC- list of fields.xlsx` ยังมีเฉพาะ Hire 37 fields — B-actions ทั้ง 7 action ยังไม่มี sub-sheet)
**Sources**:
- 7 routes ที่ `src/frontend/src/app/[locale]/admin/employees/[id]/*/page.tsx`
- `src/frontend/src/lib/admin/validation/lifecycleSchema.ts` (229 lines — schema ส่วน Rehire/Transfer/Terminate)
- `src/services/shared/src/picklists/data/EventReason{All,Hire,Trans,Term}.json`
- `stark/projects/hr-platform-replacement/ba-source/BA-EC-SUMMARY.md`

**Companions**:
- `BRD-COVERAGE-MATRIX-2026-04-24.md` — BRD-to-code matrix
- `PLACEHOLDER-AUDIT-2026-04-24.md` — route reachability audit
- `RIS-WALKTHROUGH-2026-04-24.md` — RIS reviewer packet
- `BA-REVIEW-PREP-2026-04-24.md` — BA review meta (companion)

---

## Summary tally

| # | Action | Route | page.tsx lines | Fields | Mandatory | Optional | Conditional | Status |
|---|--------|-------|---------------:|-------:|----------:|---------:|------------:|--------|
| 1 | Transfer | `/admin/employees/[id]/transfer` | 494 | 8 | 4 | 4 | 0 | 🟡 real form — schema drift |
| 2 | Terminate | `/admin/employees/[id]/terminate` | 608 | 6 | 4 | 2 | 0 | 🟡 real form — schema drift |
| 3 | Contract Renewal | `/admin/employees/[id]/contract-renewal` | 474 | 5 | 1 | 4 | 1 | 🟡 real form — no schema ref |
| 4 | Rehire | `/admin/employees/[id]/rehire` | 615 | 5 | 2 | 3 | 1 | 🟡 real form — schema drift |
| 5 | Promotion | `/admin/employees/[id]/promotion` | 335 | 4 | 2 | 2 | 0 | ✅ real form — no schema |
| 6 | Acting | `/admin/employees/[id]/acting` | 324 | 5 | 2 | 3 | 0 | ✅ real form — no schema |
| 7 | Probation | `/admin/employees/[id]/probation` | 639 | 6 | 2 | 4 | 2 | ✅ real form — no schema |

**Totals**: 39 fields across 7 actions — **17 mandatory** / **22 optional** / **4 conditional**

## BA gap flag (load-bearing)

BA workbook (`EC- list of fields.xlsx`) มี sheet `Employee file` ที่ cover Hire 37 fields แล้ว (Identity 19 + Personal Info 18). **BA ต้องเพิ่ม 7 sub-sheet** ต่อ B-action ให้ match pattern เดิม (col A section, C UI Field, D UI Mandatory, K DB Field, L Type, N LOV) เพื่อ:

1. Lock field list ต่อ action ก่อน Sprint 2 backend design
2. Map DB field/table สำหรับ append-only event log (BRD #205 effective dating)
3. Confirm event reason picklist IDs per action (3 picklists แล้ว — Trans/Term/Rehire; ยังไม่มี Promotion/Acting/Contract Renewal picklist)
4. Resolve schema drift issues ด้านล่าง (lifecycleSchema.ts vs page.tsx)

**ข้อสังเกตเพิ่มเติม (code-level)**:
- `lifecycleSchema.ts` นิยาม `rehireSchema` (7 steps), `transferSchema` (6 steps), `terminateSchema` (5 steps) — **แต่ไม่มี page.tsx ไฟล์ไหน import schema เหล่านั้นจริง** ทุก route ใช้ inline validator แทน
- Promotion / Acting / Contract Renewal ไม่มี Zod schema ใน lifecycleSchema.ts เลย
- Schema ใน lifecycleSchema.ts จึงเป็น "aspirational artifact" (อ้างอิง BRD Appendix 2) — อาจเป็น spec draft สำหรับ Sprint 2 wiring

---

## 1. Transfer

**Route**: `/admin/employees/[id]/transfer`
**File**: `page.tsx` (494 lines)
**Zod schema**: `transferSchema` ที่ `lifecycleSchema.ts:172-179` (defined but **NOT imported by page.tsx**)
**Form shape**: inline `TransferForm.movement` (interface ที่ line 34-51)
**Event shape**: `TransferEvent` จาก `@hrms/shared/types/timeline`

### Fields

| UI Label | Form Field | Type | Mandatory | Conditional | Event Reason / Picklist | BRD Ref |
|----------|-----------|------|:-:|---|---|---|
| บริษัทปลายทาง | `targetCompany` | select (string) | ✓ | — | `PICKLIST_COMPANY` (@hrms/shared) | #110 |
| หน่วยงานปลายทาง | `targetBusinessUnit` | text (string) | ✓ | — | — (free text, BA TBD) | #110 |
| ตำแหน่งปลายทาง | `targetPosition` | text (string) | ✓ | — | — (free text, BA TBD) | #110 |
| วันที่มีผล | `effectiveDate` | date (ISO) | ✓ | `>= today` (via EffectiveDateGate) | — | #110, #205 |
| สถานที่ปลายทาง | `targetLocation` | text | | — | — | #110 |
| Cost Center | `costCenter` | text | | — | — | — |
| เหตุผล | `reason` | textarea | | — | — (free text; **ไม่ใช่ picklist**) | #110 |
| หมายเหตุการโอนย้าย | `migrationNote` | text (auto-fill "Seniority continuous") | | — | — | #110 |

### Schema drift vs lifecycleSchema.ts
- `transferSchema` ใน lifecycleSchema.ts คาดว่าจะใช้ **6-step wizard** (selectedEmployee, transferReason picklist, effectiveDate, step4 target, step5 compensation carry-over, step6 confirm)
- Page ใช้ **single-form flat** ไม่มี employee picker (ใช้ `[id]` จาก URL), ไม่มี `transferReason` picklist (ใช้ free-text `reason`), ไม่มี compensation step

### Event Reason picklist (EventReasonTrans.json)
| ID | Th | En |
|----|-----|-----|
| `TRN_TRNWIC` | โอนย้ายภายในบริษัท | Transfer within Company |
| `TRN_TRNACCOMP` | โอนย้ายข้ามบริษัท | Transfer across Company |
| `TRN_ROTATION` | หมุนเวียนสายงาน | Rotation |

**Observation**: page ยังไม่ได้ wire picklist นี้ — ใช้ `targetCompany` เทียบกับ `employee.company` เอาเอง (implicit acc vs within)

### Deferred rules (Sprint 2+)
- Audit log on submit (BRD #110 — no backend)
- Approval workflow (Cross-BG transfer เคย flag ใน BRD — ยังไม่มี)
- `transferReason` picklist wiring (schema มี, UI ยังไม่เปิด)
- Seniority carry-over logic (auto-filled note, ยังไม่ persist)

---

## 2. Terminate

**Route**: `/admin/employees/[id]/terminate`
**File**: `page.tsx` (608 lines)
**Zod schema**: `terminateSchema` ที่ `lifecycleSchema.ts:221-227` (defined but **NOT imported by page.tsx**)
**Form shape**: inline `TerminateForm.termination` (line 47-56)
**Event shape**: `TerminateEvent` จาก `@hrms/shared/types/timeline`

### Fields

| UI Label | Form Field | Type | Mandatory | Conditional | Event Reason / Picklist | BRD Ref |
|----------|-----------|------|:-:|---|---|---|
| สาเหตุการลาออก | `reasonCode` | select | ✓ | — | `TERMINATION_REASONS` stub (5 codes, page-local) | #111, #113 |
| รายละเอียดเพิ่มเติม | `reasonNote` | textarea | | — | — | #111 |
| วันสุดท้ายที่ทำงาน | `lastDay` | date (via EffectiveDateGate) | ✓ | `>= hire_date` | — | #111 |
| วันที่มีผล Payroll | `payrollEffectiveDate` | date | ✓ | `>= lastDay` | — | #112 |
| อนุญาตให้จ้างซ้ำ? | `okToRehire` | radio boolean | ✓ | — | — | #102 (rehire dep) |
| แนบเอกสาร | `attachmentNote` | text (placeholder for real upload) | | — | — | deferred Phase 2.5+ |

### Schema drift vs lifecycleSchema.ts
- `terminateStep2Schema` คาดว่า `termReason` ใช้ `TERMINATION_EVENT_REASONS` (17 codes — TERM_RETIRE, TERM_DISMISS, ...) — ตรงกับ `EventReasonTerm.json`
- Page ใช้ **stub picklist 5 codes ใน TERMINATION_REASONS** (line 37-43): `RESIGN, RETIRE, LAYOFF, MISCONDUCT, CONTRACT_END` — **ไม่ตรง** กับทั้ง schema และ JSON
- Schema มี `effectiveEndDate` (date สัญญาจ้างสิ้นสุด) + `lastDayWorked` (วันทำงานวันสุดท้าย) เป็น 2 field แยก page collapse เป็น `lastDay` + `payrollEffectiveDate` (semantic ต่างกัน)

### Event Reason picklist (EventReasonTerm.json — 17 codes)
| ID | Th | En |
|----|-----|-----|
| `TERM_RESIGN` | ลาออก | Resignation |
| `TERM_EOC` | สิ้นสุดสัญญาจ้าง | End of Contract |
| `TERM_RETIRE` | เกษียณอายุ | Retirement |
| `TERM_ERLRETIRE` | เกษียณก่อนกำหนด | Early Retirement |
| `TERM_DISMISS` | ไล่ออก | Dismissal |
| `TERM_LAYOFF` | ปลดออก | Layoff |
| `TERM_REORG` | ปรับโครงสร้างองค์กร | Reorganization |
| `TERM_REDUNDANCY` | ลดจำนวนพนักงาน | Redundancy |
| `TERM_ENDASSIGN` | สิ้นสุดการมอบหมายชั่วคราว | End of Temporary Assignment |
| `TERM_UNSUCPROB` | ไม่ผ่านทดลองงาน | Unsuccessful Probation |
| `TERM_PASSAWAY` | เสียชีวิต | Passed Away |
| `TERM_NOSHOW` | ไม่มาปฏิบัติงาน | No Show |
| `TERM_TRANS` | โอนย้ายออก | Transfer Out |
| `TERM_DM` | ย้ายข้อมูล | Termination (DM) |
| `TERM_COVID` | สถานการณ์ COVID-19 | COVID-19 |
| `TERM_CRISIS` | ภาวะวิกฤต | Crisis Management |
| `TERM_ABSENT` | ขาดงาน | Absent |

### Deferred rules (Sprint 2+)
- Approval chain Employee → Manager → HRBP → SPD (BRD #111 — comment in page.tsx:9-10)
- 50 ทวิ auto-gen (BRD #111 — comment)
- Role-based reason visibility (BRD #113 — Phase 2.5+ RBAC)
- Real file upload for attachment (stub text only)
- **Real 17-code picklist wiring** (stub 5 codes — C8 drift)

---

## 3. Contract Renewal

**Route**: `/admin/employees/[id]/contract-renewal`
**File**: `page.tsx` (474 lines)
**Zod schema**: **ไม่มี** ใน lifecycleSchema.ts
**Form shape**: local `useState` (no wizard factory), shape interface ที่ line 34-42
**Event shape**: `ContractRenewalEvent` จาก `@hrms/shared/types/timeline`

### Fields

| UI Label | Form Field | Type | Mandatory | Conditional | Event Reason / Picklist | BRD Ref |
|----------|-----------|------|:-:|---|---|---|
| วันสิ้นสุดสัญญาปัจจุบัน | `currentEndDate` | date read-only (derived = `hire_date + 1 year` stub) | — | — | — | #93 |
| วันสิ้นสุดสัญญาใหม่ | `newEndDate` | date | ✓ | `> currentEndDate` | — | #93 |
| เหตุผลการต่อสัญญา | `renewalReason` | textarea | | — | — | #93 |
| ค่าตอบแทนเพิ่มเติม (THB) | `newAllowanceAmount` | number (≥0) | | — | — | #93 |
| หมายเหตุค่าตอบแทน | `newAllowanceNote` | textarea | | shown ถ้า `newAllowanceAmount > 0` | — | #93 |

### Day-30 banner (UI hint only)
BRD #93 Day-30 auto-terminate rule — page แสดง warning banner ถ้า `daysUntilExpiry <= 30` แต่ **ไม่มี auto-terminate job** (BA validation pending — HR Expert May 1, comment at line 13)

### Schema drift / gap
- ไม่มี Zod schema → validation ใช้ inline `newEndDateValid` check (line 170-172)
- **ไม่มี Event Reason picklist** — ไม่มีใน `EventReasonAll.json` (ยังไม่ได้ตั้ง `CR_*` หรือ `CONTRACT_*` ids)
- `currentEndDate` เป็น stub (hire_date + 1 year) — ยังไม่มี contract record field ใน MockEmployee schema (comment line 141-146)

### Deferred rules (Sprint 2+)
- Real contract record read (stub = hire_date + 1 year)
- Day-30 auto-terminate cron job (UI banner only)
- Event Reason picklist (TBD BA)
- Allowance commit to payroll

---

## 4. Rehire

**Route**: `/admin/employees/[id]/rehire`
**File**: `page.tsx` (615 lines)
**Zod schema**: `rehireSchema` ที่ `lifecycleSchema.ts:105-113` (defined but **NOT imported by page.tsx**)
**Form shape**: inline `RehireForm.rehire` (line 33-43) + `createClusterWizard` factory
**Event shape**: `RehireEvent` จาก `@hrms/shared/types/timeline`

### Fields

| UI Label | Form Field | Type | Mandatory | Conditional | Event Reason / Picklist | BRD Ref |
|----------|-----------|------|:-:|---|---|---|
| วันที่กลับมาทำงาน | `newHireDate` | date (via EffectiveDateGate) | ✓ | `>= today` | — | #102 |
| ใช้รหัสพนักงานใหม่? | `useNewCode` | radio boolean (default per company rule) | ✓ | — | — | #102 |
| รหัสพนักงานใหม่ | `newEmployeeCode` | text (auto-suggest EMP-XXXX) | ✓ ถ้า `useNewCode=true` | shown ถ้า `useNewCode=true` | — | #102 |
| วันเริ่มอายุงาน (Seniority) | `seniorityDateOverride` | date | | `<= newHireDate` | — | #102 |
| เหตุผล | `reason` | textarea | | — | — | #102 |

### Company rule (page-local, line 50-57)
| Company | Default `useNewCode` | Rule |
|---------|---------------------|------|
| CRC | `true` | ใช้รหัสใหม่ seniority reset |
| CPN | `false` | ใช้รหัสเดิม seniority carry |
| อื่นๆ (10+) | `false` | ไม่มี rule ชัด — tooltip ("ตรวจสอบกับ HR") |

### Schema drift vs lifecycleSchema.ts
- `rehireStep1Schema` คาดว่าจะมี employee picker + auto-classify `eventReason` (RE_REHIRE_LT1 / RE_REHIRE_GE1) — **page ไม่มี eventReason field เลย**
- Schema 7 steps คาดว่า collect address + position + base salary ตอน rehire — **page collapse เป็น 1 step เพราะใช้ employee record เดิม**

### Event Reason picklist (EventReasonAll.json, 2 codes)
| ID | Th | En |
|----|-----|-----|
| `RE_REHIRE_LT1` | Rehire หลังออกน้อยกว่า 1 ปี | Rehire < 1 year |
| `RE_REHIRE_GE1` | Rehire หลังออก 1 ปีขึ้นไป | Rehire ≥ 1 year |

**Observation**: page สามารถ derive event reason จาก `employee.hire_date` (= lastTermDate) vs `newHireDate` (< 1 year = RE_REHIRE_LT1) ได้ — แต่ยังไม่ได้ set ลง event object

### Deferred rules (Sprint 2+)
- Event reason auto-classify (RE_REHIRE_LT1 / RE_REHIRE_GE1) — ยังไม่ persist
- `OK-to-Rehire` guard check (schema บอก `okToRehire !== false` — page ไม่เช็ค)
- Rules สำหรับ 10+ บริษัทที่เหลือ (BRD #102 blocker — HR Expert May 1)

---

## 5. Promotion

**Route**: `/admin/employees/[id]/promotion`
**File**: `page.tsx` (335 lines)
**Zod schema**: **ไม่มี** ใน lifecycleSchema.ts
**Form shape**: local `useState` (no wizard factory)
**Event shape**: `PromotionEvent` จาก `@hrms/shared/types/timeline`

### Fields

| UI Label | Form Field | Type | Mandatory | Conditional | Event Reason / Picklist | BRD Ref |
|----------|-----------|------|:-:|---|---|---|
| ตำแหน่งปัจจุบัน | derived from `employee.position_title` / `corporate_title` | readonly | — | — | — | #95 |
| เลื่อนไปเป็น (ระดับ/ตำแหน่งใหม่) | `selectedPosition` (PositionCascade) | lookup via `<PositionLookup>` + `MOCK_POSITION_MASTER` | ✓ | — | Position Master (BRD #95 cascade) | #95 |
| วันที่มีผล | `effectiveDate` | date (via EffectiveDateGate) | ✓ | `>= hire_date` | — | #205 |
| ปรับขึ้น (%) | `salaryChangePct` | number (0–50) | | — | — | — |
| หมายเหตุ | `notes` | textarea | | — | — | — |

### Gap
- ไม่มี Zod schema → validation inline (`isFormValid` line 120)
- ไม่มี **Event Reason picklist** — ยังไม่มี `PRM_*` ids ใน `EventReasonAll.json`
- `salaryChangePct` 0–50 range จำกัด arbitrary (C8 pending BA confirm)

### Deferred rules (Sprint 2+)
- Event Reason picklist (TBD BA)
- Corporate_title field ใน MockEmployee schema (comment line 52-53)
- Approval chain
- Compensation record update

---

## 6. Acting

**Route**: `/admin/employees/[id]/acting`
**File**: `page.tsx` (324 lines)
**Zod schema**: **ไม่มี** ใน lifecycleSchema.ts
**Form shape**: local `useState` (no wizard factory)
**Event shape**: `ActingEvent` จาก `@hrms/shared/types/timeline` (`acting_start` + `acting_end` kinds)

### Fields

| UI Label | Form Field | Type | Mandatory | Conditional | Event Reason / Picklist | BRD Ref |
|----------|-----------|------|:-:|---|---|---|
| ตำแหน่งที่รักษาการ | `actingPosition` | text | ✓ | — | — (free text) | Audit #19 SAP SF DOC-E5E2A1CC |
| วันเริ่มรักษาการ | `effectiveDate` | date (via EffectiveDateGate) | ✓ | `>= hire_date` | — | Audit #19 |
| วันที่สิ้นสุด | `endDate` | date | | `>= effectiveDate` (optional) | — | Audit #19 |
| กำหนดเป็นตำแหน่งหลัก | `isPrimary` | checkbox (default false) | | — | — | Audit #19 |
| หมายเหตุ | `notes` | textarea | | — | — | Audit #19 |

### Gap
- ไม่มี Zod schema → validation inline (`isFormValid` line 98)
- ไม่มี **Event Reason picklist** — Acting = concurrent-employment event, อาจ map เข้า existing picklist เช่น `TRN_*` แต่ยัง unclear
- `actingPosition` เป็น free text — ควร link Position Master เหมือน Promotion? (BA TBD)

### Deferred rules (Sprint 2+)
- Event Reason picklist (Acting Start vs Acting End — TBD BA)
- Link `actingPosition` เข้า Position Master
- Primary toggle cascade (BRD clarity: ตำแหน่งหลัก vs รักษาการ-หลัก)

---

## 7. Probation

**Route**: `/admin/employees/[id]/probation`
**File**: `page.tsx` (639 lines)
**Zod schema**: **ไม่มี** ใน lifecycleSchema.ts
**Form shape**: inline `ProbationForm.assessment` (line 32-54) + `createClusterWizard` factory
**Event shape**: `ProbationEvent` จาก `@hrms/shared/types/timeline`

### Fields

| UI Label | Form Field | Type | Mandatory | Conditional | Event Reason / Picklist | BRD Ref |
|----------|-----------|------|:-:|---|---|---|
| ผลการประเมิน | `outcome` | radio enum (`pass` \| `no_pass` \| `extend`) | ✓ | — | — (outcome enum, ไม่ใช่ event reason) | #117 |
| วันที่มีผล (ประเมิน) | `effectiveDate` | date (via EffectiveDateGate) | ✓ | `hire_date <= x <= hire_date+119d` | — | #117 |
| ขยายถึงวันที่ | `extendUntil` | date | ✓ ถ้า `outcome === 'extend'` | shown+required ถ้า `outcome=extend`, `> effectiveDate` | — | #117 |
| จำนวน Allowance | `allowanceAmount` | number (≥0) | | shown ถ้า `outcome=pass` | — | #117 |
| วันที่ยืนยัน (HR) | `confirmDate` | date | | shown ถ้า `outcome=pass` | — | #117 |
| หมายเหตุ | `note` | textarea | | — | — | #117 |

### Gap
- ไม่มี Zod schema → validation inline (`isValid` line 288-291)
- `outcome` ไม่ใช่ event reason (UI field) — แต่ persist เป็น `outcome` บน ProbationEvent shape (`pass` / `terminate_during_probation` / `extend`)
- ไม่มี **Event Reason picklist** — แต่ `EventReasonAll.json` มี `COMPROB_COMPROB` = "Completion of Probation" + `TERM_UNSUCPROB` = "ไม่ผ่านทดลองงาน"

### Conditional logic (BRD #117)
- `outcome=no_pass` → confirm dialog ก่อน submit (employee จะ `terminate_during_probation`)
- `outcome=extend` → require `extendUntil`
- `outcome=pass` → optional `allowanceAmount` + `confirmDate`
- Auto-pass ที่ day 119 — UI banner only (ยังไม่มี cron job)

### Deferred rules (Sprint 2+)
- Wire `outcome` → event reason picklist (COMPROB_COMPROB / TERM_UNSUCPROB / TBD extend)
- `confirmDate` มี field จริงใน schema — ตอนนี้ stuff ใส่ notes (line 322-328)
- Auto-pass day 119 cron job
- Allowance commit to payroll

---

## Event Reasons per Action (cross-ref สำหรับ Doc 2 §4)

| Action | Picklist used in page | Picklist in `lifecycleSchema.ts` | Picklist in `EventReason*.json` | Verdict |
|--------|----------------------|----------------------------------|----------------------------------|---------|
| Transfer | ไม่ใช้ (free text `reason`) | `TRANSFER_EVENT_REASONS` (3 codes) | `EventReasonTrans.json` (3 codes — TRN_TRNWIC, TRN_TRNACCOMP, TRN_ROTATION) | 🟡 picklist พร้อม — page ยังไม่ wire |
| Terminate | `TERMINATION_REASONS` stub (5 codes page-local: RESIGN, RETIRE, LAYOFF, MISCONDUCT, CONTRACT_END) | `TERMINATION_EVENT_REASONS` (17 codes) | `EventReasonTerm.json` (17 codes — TERM_*) | ❌ drift — page stub ≠ schema ≠ JSON |
| Contract Renewal | — | — | ❌ ไม่มี | ❌ ยังไม่มี picklist |
| Rehire | — (derive จาก useNewCode) | `REHIRE_EVENT_REASONS` (2 codes: RE_REHIRE_LT1/GE1) | `EventReasonAll.json` (2 codes RE_REHIRE_*) | 🟡 picklist พร้อม — page ยังไม่ wire |
| Promotion | — | — | ❌ ไม่มี | ❌ ยังไม่มี picklist |
| Acting | — | — | ❌ ไม่มี | ❌ ยังไม่มี picklist |
| Probation | — (use outcome enum) | — | 🟡 `COMPROB_COMPROB` + `TERM_UNSUCPROB` exist ใน EventReasonAll.json แต่ไม่มี action-specific file | 🟡 codes มี — page ใช้ outcome enum แทน |

---

## Schema drift summary (code-level)

| File | Schema | Status |
|------|--------|--------|
| `lifecycleSchema.ts:105-113` | `rehireSchema` (7 steps) | ⚠️ ไม่ถูก import โดย rehire/page.tsx |
| `lifecycleSchema.ts:172-179` | `transferSchema` (6 steps) | ⚠️ ไม่ถูก import โดย transfer/page.tsx |
| `lifecycleSchema.ts:221-227` | `terminateSchema` (5 steps) | ⚠️ ไม่ถูก import โดย terminate/page.tsx |
| — | `contractRenewalSchema` | ❌ ไม่มี |
| — | `promotionSchema` | ❌ ไม่มี |
| — | `actingSchema` | ❌ ไม่มี |
| — | `probationSchema` | ❌ ไม่มี |

**Implication**: `lifecycleSchema.ts` = aspirational Sprint-2 spec; ปัจจุบันทุก page ใช้ inline validator. BA sheet ควรเขียนจาก **page.tsx field list (as-is)** เป็น truth ไม่ใช่จาก schema.

---

## Out of scope (this doc)

- Backend API fields — Sprint 2 (current code 100% client-side + Zustand persist)
- Audit log / approval workflow wire — Sprint 2 backend
- Cron jobs (auto-terminate Day-30 BRD #93, auto-pass Day-119 BRD #117) — Sprint 2 backend
- `/admin/hire` Hire flow fields (37 fields) — ดู `EC-FIELD-AUDIT-2026-04-24.md` (Hire-only)
- BA workbook re-fetch from SharePoint — ดู `BA-REVIEW-PREP-2026-04-24.md §1`
- Ken decision on `TERMINATION_REASONS` stub (5 vs 17) — flag ไว้ใน Doc 2 §2 Open Issues

