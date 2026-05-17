# STA-30 — HR Demo Time & Attendance Design Approval Pack

> สถานะเอกสาร: **Design approval contract / document-only**  
> เป้าหมาย: ให้ HR ตรวจและอนุมัติทิศทาง UI, screen list, fields, statuses และ persona journeys ของ Time & Attendance ก่อนเริ่ม Backend  
> ข้อห้าม: เอกสารนี้ไม่ใช่การอนุมัติให้ทำ backend, payroll, biometric/device, workflow engine หรือ policy engine

- Source: Seed `/Users/tachongrak/.ouroboros/seeds/seed_cb7269a1c2b9.yaml`; repo evidence paths listed per section.
- Owner: Product/HRIS design owner; HR approver to be named at sign-off.
- TBD: HR sign-off names, final policy owner, backend implementation ticket split.

## 1. Executive approval summary / สรุปเพื่ออนุมัติ

STA-30 ต้องล็อก scope สำหรับ Time & Attendance demo เพื่อให้ HR สามารถเดิน flow ได้ครบทั้ง **Employee** และ **Manager** โดยไม่ต้องพึ่ง Backend จริง ข้อมูลทั้งหมดเป็น mock/static และเลขนโยบายเป็นตัวอย่างเพื่อรีวิวหน้าจอเท่านั้น

ผลลัพธ์ที่ HR ต้องอนุมัติในรอบนี้:

1. รายการหน้าจอและทางเดินของผู้ใช้สำหรับ Time module
2. Field inventory สำหรับ clock, timesheet, leave, overtime, correction และ approval review
3. Status inventory ที่ใช้ใน demo
4. Persona journey map สำหรับ Employee และ Manager
5. ขอบเขต Backend-later ที่ห้ามตีความเป็น commitment ของระบบจริง
6. รายการ cleanup ด้าน Humi token ก่อน presentation ให้ HR
7. เงื่อนไขว่า **Backend implementation is blocked until HR sign-off**

- Source: Seed acceptance criteria; `src/frontend/src/app/[locale]/time/page.tsx`; `src/frontend/src/components/time/time-page.tsx`; `src/frontend/src/app/[locale]/quick-approve/page.tsx`.
- Owner: Product/HRIS + HR reviewer.
- TBD: วันที่ presentation และรายชื่อผู้มีอำนาจ sign-off.

## 2. Scope boundary / ขอบเขต UI approval เทียบกับ Backend-later

### 2.1 UI approval scope สำหรับ STA-30

สิ่งที่อยู่ใน scope รอบนี้คือการอนุมัติ design direction และ demo flow เท่านั้น:

- Employee เห็น landing tiles สำหรับ Timesheet, Time Off, Overtime และ Manager Approvals
- Employee ทำ clock in/out, เห็น live clock, shift progress, geofence/location และ weekly attendance/timesheet statuses
- Employee ยื่น leave request พร้อม half-day morning/afternoon toggle และต้องมี leave type ครบ 8 ประเภทใน approval contract
- Employee ยื่น overtime request และเห็น audit trail
- Employee ยื่น time-correction request
- Manager ตรวจคำขอผ่าน unified `/quick-approve` พร้อม tabs/count badges
- Manager approve/reject/send-back ผ่าน `RejectReturnDrawer`
- Manager เห็น multi-step timeline แบบ Manager → HRBP → SPD ในรายละเอียดคำขอ

### 2.2 Backend-later contracts ที่แยกออกจาก UI approval

รายการต่อไปนี้ **ไม่อยู่ใน scope STA-30** และต้องรอ backend/business-rule design แยกต่างหาก:

| Backend-later contract | สถานะใน STA-30 | หมายเหตุ |
| --- | --- | --- |
| Biometric/device integration | Blocked / later | Clock data ใน demo เป็น mock; ยังไม่ผูก device, badge, face scan, mobile GPS จริง |
| Payroll posting | Blocked / later | OT amount และ attendance summary ห้ามใช้เป็น payroll commitment |
| Attendance calculation engine | Blocked / later | Late/absent/work-hour calculation เป็น mock ไม่ใช่ engine จริง |
| Production workflow engine | Blocked / later | Approval chain เป็น demo evidence ไม่ใช่ runtime workflow engine |
| Thai labor rule enforcement | Blocked / later | OT/leave labor rules ยังไม่ enforce จริง |
| Policy number validation | Blocked / later | Entitlement, balance, multipliers, cut-off เป็น illustrative data |
| Leave balance formula | Blocked / later | Balance formula ต้องรอ HR policy + backend validation |
| OT cut-off logic | Blocked / later | Cut-off และ weekly limits เป็น demo note เท่านั้น |

**Backend implementation is explicitly blocked until HR sign-off.**

- Source: Seed constraints and exit conditions; `src/frontend/src/hooks/use-time.ts`; `src/frontend/src/hooks/use-settings.ts`; `src/frontend/src/app/[locale]/overtime/page.tsx`.
- Owner: Product/HRIS owns scope split; backend owner TBD after sign-off.
- TBD: Backend contract tickets and authoritative HR policy source.

## 3. Current repo evidence / หลักฐานจากระบบปัจจุบัน

| Area | Evidence | Observed contract for approval |
| --- | --- | --- |
| Time landing | `src/frontend/src/app/[locale]/time/page.tsx` | 4 tiles: Timesheet, Time Off, Overtime, Manager Approvals; routes to `time/timesheet`, `timeoff`, `overtime`, `quick-approve` |
| Clock/timesheet/correction | `src/frontend/src/components/time/time-page.tsx`; `src/frontend/src/hooks/use-time.ts` | Live clock, clock in/out state, geofence/location, shift progress, weekly heatmap, schedule, timesheet table, correction modal |
| Leave data contract | `src/frontend/src/hooks/use-leave.ts` | Canonical hook has 8 leave types: annual, sick, personal, maternity, paternity, ordination, military, unpaid |
| Leave visible route | `src/frontend/src/app/[locale]/timeoff/page.tsx` | Current route shows 3 leave kinds from `HUMI_LEAVE_BALANCES`: vacation, sick, personal; this is a mismatch to fix before HR approval |
| Leave request form component | `src/frontend/src/components/leave/leave-request-form.tsx` | Has half-day toggle: full day, morning, afternoon; submits `halfDay` when single-day leave |
| Overtime | `src/frontend/src/app/[locale]/overtime/page.tsx`; `src/frontend/src/hooks/use-overtime.ts` | OT request form, status chips, approval chain, audit history per request |
| Unified approvals | `src/frontend/src/app/[locale]/quick-approve/page.tsx`; `src/frontend/src/components/manager/quick-approve-page.tsx` | Unified inbox with persona scope, filters, SmartTabs, count badges, rows and drill-in links |
| Approval details | `src/frontend/src/app/[locale]/quick-approve/[id]/page.tsx`; `src/frontend/src/components/quick-approve/detail/RejectReturnDrawer.tsx` | Detail page renders timeline, summary, payload, history, `ActionPanel`, `RejectReturnDrawer` for reject/return |
| Timeline data | `src/frontend/src/components/quick-approve/mock-requests.ts`; detail page mock data | Multiple chains include Manager, HRBP, SPD steps |
| Settings mismatch | `src/frontend/src/hooks/use-settings.ts` | Settings leave policies have 5 types only: annual, sick, personal, maternity, paternity |

- Source: Files listed in table; seed brownfield context referenced store paths but current repo implements these contracts under `src/frontend/src/hooks/*` and related stores.
- Owner: Product/HRIS doc owner validates observed contract; frontend owner validates implementation evidence if needed.
- TBD: Decide whether UI should source leave policy list from `use-leave.ts`, settings, or a new shared policy source after HR approval.

## 4. Screen inventory / รายการหน้าจอสำหรับ HR review

| Persona | Screen/route | Purpose | Demo dependency | HR review question |
| --- | --- | --- | --- | --- |
| Employee | `/time` | Time module landing with four tiles | Mock/navigation only | Tiles cover the correct employee/manager entry points? |
| Employee | Time page clock tab | Clock in/out, live clock, location, geofence, shift progress | `use-time.ts` mock state | HR accepts clock hero and location wording? |
| Employee | Time page weekly overview | Weekly attendance heatmap and monthly stats | `use-time.ts` mock attendance | Status colors/labels are understandable? |
| Employee | Time page schedule tab | Week schedule, shift time, break time, off days | `use-time.ts` mock schedule | Shift display matches expected HR demo story? |
| Employee | Time page timesheet tab | Daily rows: date, shift, in, out, work, OT, location, status | `use-time.ts` mock attendance | Timesheet fields are sufficient before backend? |
| Employee | Time page correction tab/modal | New correction request and correction history | `submitCorrection` mock insert | Correction reasons and fields are acceptable? |
| Employee | `/timeoff` | Leave request, balances, history/approvals | `humi-timeoff-slice`, `humi-mock-data`, current page-local `LEAVE_TYPES` | Must expand/reconcile visible leave types before approval? |
| Employee | `LeaveRequestForm` component | Leave type, dates, half-day, reason, substitute, policy validation panel | `use-leave.ts` + component form | Half-day morning/afternoon behavior approved? |
| Employee | `/overtime` | OT submit, status list, approval chain, audit history | `use-overtime.ts` + page demo audit maps | OT fields/audit story approved? |
| Manager | `/quick-approve` | Unified approval inbox with SmartTabs and count badges | `MOCK_PENDING_REQUESTS`, probation and benefits adapters | Inbox is acceptable as the single manager review surface? |
| Manager | `/quick-approve/[id]` | Request detail, timeline, payload, history and actions | Detail mock data | Detail level supports Manager review? |
| Manager | `RejectReturnDrawer` | Reject/send-back reason and optional comments | Component-local reason lists | Reason list fits HR language? |

- Source: `src/frontend/src/app/[locale]/time/page.tsx`; `src/frontend/src/components/time/time-page.tsx`; `src/frontend/src/app/[locale]/timeoff/page.tsx`; `src/frontend/src/components/leave/leave-request-form.tsx`; `src/frontend/src/app/[locale]/overtime/page.tsx`; `src/frontend/src/components/manager/quick-approve-page.tsx`; `src/frontend/src/app/[locale]/quick-approve/[id]/page.tsx`.
- Owner: HR process owner approves screens; Product owns final wording.
- TBD: Confirm whether `/time/timesheet` standalone route remains in demo script or Time page tab is the canonical review screen.

## 5. Field inventory / รายการ field ที่ HR ต้องเห็น

### 5.1 Clock and attendance fields

| Field | Visible meaning | Source evidence | Approval note |
| --- | --- | --- | --- |
| Current live time | เวลาปัจจุบัน HH:MM:SS | `LiveClock` in `time-page.tsx` | UI only; not device/server time |
| Clock status | Clock In / Clock Out action state | `clockStatus.isClockedIn` | Backend-later: actual punch persistence |
| Clock-in time | Time employee clocked in | `clockStatus.clockInTime`; attendance rows | Mock value |
| Clock-out time | Time employee clocked out | `clockStatus.clockOutTime`; attendance rows | Mock value |
| Current shift | Regular/morning/evening/night/flexible/off | `ShiftSchedule.type`; `clockStatus.currentShift` | Shift taxonomy needs HR confirmation |
| Shift start/end | Work window | `shiftStart`, `shiftEnd`, schedule rows | Backend-later schedule engine |
| Break start/end | Break period | `breakStart`, `breakEnd` | Backend-later policy rule |
| Location name | Work location/geofence label | `locationName: CDS Headquarters, Bangna`; row `location` | Backend-later location/device integration |
| Geofence flag | In Zone / Out of Zone | `isWithinGeofence` | Demo display only |
| Work hours | Daily hours | attendance `workHours` | Backend-later calculation engine |
| Overtime hours | Daily OT hours | attendance `overtimeHours` | Backend-later payroll posting/cut-off |

### 5.2 Weekly timesheet/status fields

| Field | Visible meaning | Source evidence | Approval note |
| --- | --- | --- | --- |
| Date/day | Daily attendance row | `AttendanceRecord.date`, `dayOfWeek` | Visible in heatmap/table |
| Shift label | Shift assigned | `AttendanceRecord.shift` | Mock label |
| Check-in/check-out | Recorded daily punches | attendance rows | Device integration later |
| Work/OT columns | Work hours and OT hours | timesheet tab | Calculation not approved here |
| Location column | Attendance location | timesheet tab | Device/location later |
| Status badge | present, late, absent, leave, holiday, weekend | `AttendanceRecord.status` | Status wording/color to approve |

### 5.3 Leave request fields

Required approval contract for Employee leave:

| Field | Required in HR demo | Current evidence | Gap/TBD |
| --- | --- | --- | --- |
| Leave type | 8 types: annual, sick, personal, maternity, paternity, ordination, military, unpaid | `use-leave.ts` has all 8 | `/timeoff` currently shows only vacation/sick/personal; settings has 5 policies |
| Start date | Required | `LeaveRequestForm`; `/timeoff` request tab | Date picker vs text input to align later |
| End date | Required | `LeaveRequestForm`; `/timeoff` request tab | Same as above |
| Half-day | Full day / morning / afternoon | `LeaveRequestForm` `halfDayOption` | Must be in HR demo for single-day leave |
| Days/working days | Calculated display | `workingDays` display | Formula backend-later |
| Reason | Required | `reason` field | HR wording to approve |
| Substitute | Optional substitute person | `substituteId`; mock substitute list | Business requirement TBD |
| Attachment | Optional medical/support document | current `/timeoff` dropzone; `hasDocument` in `use-leave.ts` | Storage backend-later |
| Balance | Entitled/used/pending/remaining | `use-leave.ts` balances | Formula/backend validation later |
| Approval status | pending/approved/rejected/cancelled | `LeaveStatus` | Status taxonomy to approve |

### 5.4 Overtime request fields

| Field | Visible meaning | Source evidence | Approval note |
| --- | --- | --- | --- |
| Date | OT date | `/overtime` form | Required |
| Start/end time | OT period | `/overtime` form | Required |
| Total hours | Calculated/displayed | `OTRequest.totalHours` | Formula backend-later |
| OT type | weekday/weekend/etc. | `use-overtime.ts` / page submit defaults weekday | Taxonomy needs HR confirmation |
| Reason/project | Business reason/project | page form/audit; seed mentions project | Project field may need explicit UI later |
| Estimated amount | Mock OT amount | `estimatedAmount` in page mock | Payroll posting blocked |
| Status | pending/approved/completed/rejected/cancelled | `OTStatus` labels | Status labels to approve |
| Audit trail | actor, action, comment, timestamp | `OT_AUDIT`, `OT_AUDIT_DEMO` | Demo only |

### 5.5 Time-correction fields

| Field | Visible meaning | Source evidence | Approval note |
| --- | --- | --- | --- |
| Date | Date to correct | correction modal | Required |
| Correction type | forgot-clock, missing-checkin, missing-checkout, wrong-time | `TimeCorrectionRequest.type` | HR to confirm labels |
| Original time | Existing value where available | correction history | Optional |
| Corrected time | New requested time | correction modal | Required |
| Reason | Explanation | correction modal | Required |
| Status | pending/approved/rejected | `TimeCorrectionRequest.status` | Approval backend later |
| Approved by | Approval actor display | correction history | Mock |

### 5.6 Manager approval fields

| Field | Visible meaning | Source evidence | Approval note |
| --- | --- | --- | --- |
| Request type | leave/overtime/claim/transfer/change_request/probation | `RequestType` | Time demo focuses leave/overtime/correction where present |
| Requester | Employee identity/department | `PendingRequest.requester` | Sensitive-data masking policy outside STA-30 |
| Description | Summary | `PendingRequest.description` | HR language review |
| Submitted at/waiting days | SLA context | `submittedAt`, `waitingDays` | SLA rules backend-later |
| Urgency | urgent/normal/low | `Urgency` | Policy source TBD |
| Approval timeline | steps/status/date/comment | `ApprovalStep` | Demo chain only |
| Action | approve/reject/return/send-back | `ActionPanel`; `RejectReturnDrawer` | Production workflow engine later |
| Reason/comment | Reject/return reason + optional comment | `RejectReturnDrawer` | HR to approve reason list |

- Source: Files named in each table.
- Owner: HR process owner approves field sufficiency; Product owns final field labels.
- TBD: Canonical policy dictionary, sensitive data display rules, and backend schema names.

## 6. Status inventory / รายการสถานะ

| Domain | Statuses in approval pack | Source evidence | Notes |
| --- | --- | --- | --- |
| Attendance | present, late, absent, leave, holiday, weekend | `AttendanceRecord.status`; `STATUS_CONFIG` | Must be visible in weekly timesheet/status legend |
| Team attendance | present, late, early_departure, leave | `TeamAttendanceRecord.status` | Manager team attendance is data evidence, not primary STA-30 screen |
| Correction | pending, approved, rejected | `TimeCorrectionRequest.status` | Used in correction history |
| Leave | pending, approved, rejected, cancelled | `LeaveStatus` in `use-leave.ts` | Cancellation flow not required for STA-30 unless HR requests |
| Overtime | pending, approved, completed, rejected, cancelled | `OTStatus` in `/overtime` | Completed/cancelled are history states |
| Approval step | approved, pending, rejected | `ApprovalStep.status` | Used in quick-approve timeline |
| Urgency | urgent, normal, low | `Urgency` | Rule source TBD |
| Action | approve, reject, return/send-back | `ActionPanel`; `RejectReturnDrawer` | Return is send-back wording for HR demo |

- Source: `src/frontend/src/hooks/use-time.ts`; `src/frontend/src/hooks/use-leave.ts`; `src/frontend/src/app/[locale]/overtime/page.tsx`; `src/frontend/src/lib/quick-approve-api.ts`; `src/frontend/src/components/quick-approve/detail/ActionPanel.tsx`.
- Owner: HR process owner validates status vocabulary.
- TBD: Final Thai labels, SLA/urgency rules, and backend enum naming.

## 7. Employee persona journey map / เส้นทาง Employee

### Journey E1 — Clock in/out และ live attendance

1. Employee เข้า `/time`
2. เลือก Time/Timesheet surface ที่แสดง clock hero
3. เห็น live clock, current shift, location `CDS Headquarters, Bangna`, In Zone/Out of Zone
4. กด Clock In หรือ Clock Out
5. เห็น shift progress, clock-in/out time และ recent attendance
6. ตรวจ weekly heatmap และ timesheet table ที่มี statuses: present, late, absent, leave, holiday, weekend

Acceptance for HR: เดิน flow ได้จบโดยไม่ใช้ Backend; HR เห็นว่า UI wording/action placement เหมาะสม

### Journey E2 — Leave request พร้อม half-day และ 8 leave types

1. Employee เข้า `/timeoff` หรือ leave request entry
2. เห็น leave type ครบ 8 ประเภทตาม approval contract: annual, sick, personal, maternity, paternity, ordination, military, unpaid
3. เลือกวันที่เริ่ม/สิ้นสุด
4. ถ้าเป็นวันเดียว เลือก full day / morning / afternoon
5. ระบุ reason, substitute และ attachment ถ้ามี
6. ส่งคำขอและเห็นสถานะ pending ใน history/approval area

Current gap: repo evidence แยกกันอยู่ — `use-leave.ts` มี 8 types แต่ `/timeoff` visible page มี 3 kinds และ `use-settings.ts` มี 5 policies ดังนั้น HR approval pack ต้องบันทึก mismatch นี้ และห้ามเริ่ม Backend จนกว่าจะตัดสิน canonical leave type source

### Journey E3 — Overtime request พร้อม audit trail

1. Employee เข้า `/overtime`
2. กด New OT Request / ยื่นคำขอ OT
3. ใส่ date, start time, end time, reason
4. ส่งคำขอและเห็น pending/approved/rejected history
5. เปิด audit history เพื่อดู actor, action, comment, timestamp
6. เห็น approval chain display

### Journey E4 — Time-correction request

1. Employee เข้า Time page correction tab
2. กด New Correction Request
3. ใส่ date, correction type, corrected time, reason
4. Submit Request
5. เห็น correction request ใน history พร้อม status pending/approved/rejected

- Source: `src/frontend/src/app/[locale]/time/page.tsx`; `src/frontend/src/components/time/time-page.tsx`; `src/frontend/src/components/leave/leave-request-form.tsx`; `src/frontend/src/hooks/use-leave.ts`; `src/frontend/src/app/[locale]/timeoff/page.tsx`; `src/frontend/src/app/[locale]/overtime/page.tsx`.
- Owner: Employee experience owner + HR reviewer.
- TBD: Which visible leave screen becomes canonical for 8-type HR demo.

## 8. Manager persona journey map / เส้นทาง Manager

### Journey M1 — Unified `/quick-approve` review

1. Manager เข้า `/quick-approve`
2. เห็น header card: persona chip, queue scope badge, urgent count, total count
3. เห็น SmartTabs พร้อม count badges: Action Required, Watching, History; HR personas อาจเห็น All
4. ใช้ filters/search/date/type/urgency เพื่อหา leave/overtime requests
5. เปิด row เพื่อดูรายละเอียดคำขอ

### Journey M2 — Detail review and timeline

1. Manager เข้า `/quick-approve/[id]`
2. เห็น approval timeline chain
3. เห็น request summary, payload, history timeline
4. ตัวอย่าง timeline ต้องครอบคลุม Manager → HRBP → SPD อย่างน้อยหนึ่งรายการ เช่น detail mock มี Manager approved, HRBP approved, SPD pending
5. Manager ตัดสินใจ approve, reject หรือ send-back/return

### Journey M3 — Reject/send-back with `RejectReturnDrawer`

1. Manager กด Reject หรือ Return/send-back จาก action panel
2. `RejectReturnDrawer` เปิดขึ้น
3. เลือก reason จาก list ภาษาไทย/อังกฤษ
4. ใส่ additional comments ถ้าต้องการ
5. Confirm Reject หรือ Confirm Return
6. Demo ไม่ dispatch backend; production API เป็น Backend-later

- Source: `src/frontend/src/components/manager/quick-approve-page.tsx`; `src/frontend/src/components/manager/quick-approve/SmartTabs.tsx`; `src/frontend/src/app/[locale]/quick-approve/[id]/page.tsx`; `src/frontend/src/components/quick-approve/detail/ActionPanel.tsx`; `src/frontend/src/components/quick-approve/detail/RejectReturnDrawer.tsx`; `src/frontend/src/components/quick-approve/mock-requests.ts`.
- Owner: Manager workflow owner + HRBP/SPD reviewers.
- TBD: Final approval authority matrix and production workflow engine behavior.

## 9. Leave type mismatch / ความไม่ตรงกันของ leave type

STA-30 ต้องบันทึก gap นี้ชัดเจนก่อน HR presentation:

| Source | Count | Types visible/configured | Risk |
| --- | ---: | --- | --- |
| `src/frontend/src/hooks/use-leave.ts` | 8 | annual, sick, personal, maternity, paternity, ordination, military, unpaid | ตรงกับ seed/STA-30 approval contract |
| `src/frontend/src/hooks/use-settings.ts` | 5 | annual, sick, personal, maternity, paternity | ขาด ordination, military, unpaid |
| `src/frontend/src/app/[locale]/timeoff/page.tsx` and `src/frontend/src/lib/humi-mock-data.ts` | 3 | vacation, sick, personal | Visible route ยังไม่แสดงครบ 8 และใช้ key `vacation` แทน `annual` |

Decision required before backend:

- HR ต้องยืนยัน canonical leave type set สำหรับ demo approval ว่าคือ 8 ประเภทตาม `use-leave.ts`
- Product/Frontend ต้องตัดสินใจภายหลังว่าจะ reconcile `vacation` vs `annual`
- Backend ห้ามเริ่ม leave schema/policy implementation จนกว่าจะ resolve mismatch และ HR sign-off

- Source: `src/frontend/src/hooks/use-leave.ts`; `src/frontend/src/hooks/use-settings.ts`; `src/frontend/src/app/[locale]/timeoff/page.tsx`; `src/frontend/src/lib/humi-mock-data.ts`.
- Owner: HR policy owner + Product.
- TBD: Canonical key names, Thai labels, entitlement source, migration path.

## 10. Humi design-token risks / ความเสี่ยงด้าน design token ก่อน HR presentation

Seed กำหนดว่า Time module ต้องใช้ Humi design tokens เท่านั้น และต้องไม่มี raw hex, hardcoded gradients หรือ red-ish legacy classes ใน Time module screens เอกสารนี้ไม่แก้ source code แต่บันทึก cleanup requirement ก่อน HR presentation

| Risk area | Evidence | Cleanup requirement before HR presentation |
| --- | --- | --- |
| Hardcoded gradient | `time-page.tsx` uses `linear-gradient(90deg, var(--color-ink) 0%, var(--color-accent) 100%)` for shift progress | Replace with Humi token-approved progress style or documented design token |
| Tailwind emerald/amber/sky/indigo classes | `time-page.tsx` has `bg-emerald-500`, `text-emerald-600`, `bg-amber-400`, `text-sky-500`, `text-indigo-500` | Normalize to Humi semantic tokens (`success`, `warning`, `info`, `danger`, accent) |
| Red-ish/danger presentation risk | Time status/OT chips use danger/tint classes for absent/rejected; seed also flags zero red-ish violations | Confirm pumpkin danger token only; avoid legacy red classes |
| Overtime non-Humi status chips | `/overtime/page.tsx` uses `bg-amber-50`, `text-amber-700`, `bg-green-50`, `text-green-700`, `border-green-200` | Replace with Humi status badge/tokens before HR visual review |
| Duplicate/mixed styling | Time pages mix Humi primitives with route-local classes and `components/ui` badges/form fields | Align migrated surfaces to Humi primitives before presentation |

Cleanup is explicitly **out of scope for STA-30 document-only task**. It must be tracked as a separate implementation task before HR presentation.

- Source: `src/frontend/src/components/time/time-page.tsx`; `src/frontend/src/app/[locale]/overtime/page.tsx`; seed Humi token constraint.
- Owner: Frontend/design-system owner.
- TBD: Implementation ticket, visual QA acceptance, whether STA-34 covers this cleanup.

## 11. Demo checklist / Checklist สำหรับวันรีวิว HR

### Employee checklist

- [ ] Open `/time` and confirm landing tiles: Timesheet, Time Off, Overtime, Manager Approvals
- [ ] Show live clock and current date/time display
- [ ] Show Clock In/Clock Out action and mock state change
- [ ] Show location and In Zone/Out of Zone display
- [ ] Show shift progress with start/break/end markers
- [ ] Show weekly heatmap/status legend
- [ ] Show timesheet table with present, late, absent, leave, holiday, weekend statuses
- [ ] Show correction request modal: date, type, corrected time, reason
- [ ] Show leave request with 8 leave types in approval contract
- [ ] Show half-day morning/afternoon toggle for single-day leave
- [ ] Show leave balances/history as illustrative only
- [ ] Show overtime request form: date, start/end, reason
- [ ] Show OT audit trail and approval chain

### Manager checklist

- [ ] Open `/quick-approve`
- [ ] Confirm persona chip and queue scope badge
- [ ] Confirm SmartTabs and count badges
- [ ] Filter by request type including leave/overtime
- [ ] Open a request detail
- [ ] Confirm timeline includes Manager → HRBP → SPD example
- [ ] Confirm approve button exists
- [ ] Confirm reject opens `RejectReturnDrawer`
- [ ] Confirm send-back/return opens `RejectReturnDrawer`
- [ ] Confirm reason picker and optional comments are understandable
- [ ] Confirm demo has no backend dependency and no production workflow claim

### Design readiness checklist

- [ ] Humi token cleanup risks resolved or explicitly accepted by HR for non-final visual demo
- [ ] Leave type mismatch resolved or accepted as known gap with backend blocked
- [ ] Backend-later contracts reviewed and accepted
- [ ] Sign-off section completed before implementation begins

- Source: Seed acceptance criteria; evidence files in sections 3–10.
- Owner: Demo lead + HR reviewer.
- TBD: Presentation runbook, test account/persona setup, screenshots if requested.

## 12. RAID and TBD register

| Type | Item | Impact | Owner | Status/TBD |
| --- | --- | --- | --- | --- |
| Risk | Humi token violations in Time module | HR may reject visual direction or see inconsistent brand | Frontend/design-system | Cleanup required before HR presentation; not implemented here |
| Risk | Leave type mismatch 8 vs 5 vs 3 | Backend schema and HR approval could diverge | HR policy + Product | Must resolve before backend |
| Risk | Policy numbers look authoritative | Payroll/leave commitments could be misunderstood | Product + HR | Mark all policy numbers illustrative/TBD |
| Assumption | Mock/static data is acceptable for design approval | HR can review without backend dependency | Product | Confirm during sign-off |
| Issue | `use-leave.ts`/`use-settings.ts` are hooks, while seed references stores | Source naming mismatch may confuse future implementers | Product/Frontend | Documented in section 3 |
| Dependency | HRBP/SPD approval authority | Production workflow cannot be designed from demo alone | HR/Compliance | Backend-later workflow design |
| TBD | Final Thai labels for statuses and drawer reasons | Demo polish and policy clarity | HR reviewer | To be confirmed in presentation |
| TBD | Canonical route for leave request | Prevent duplicate surfaces | Product/Frontend | Decide after HR feedback |
| TBD | Backend contract split | Implementation planning | Engineering lead | Blocked until sign-off |

- Source: Seed constraints; repo evidence in sections 3–10.
- Owner: Product owns RAID tracking.
- TBD: Convert accepted items into follow-up Linear tickets after sign-off; do not update Linear from this task.

## 13. Sign-off / การอนุมัติ

Backend implementation remains blocked until this section is completed by HR.

| Role | Name | Decision | Date | Notes |
| --- | --- | --- | --- | --- |
| HR process owner | TBD | Pending | TBD | Approves screen inventory, field inventory, status inventory |
| HRBP representative | TBD | Pending | TBD | Approves Manager → HRBP journey and wording |
| SPD representative | TBD | Pending | TBD | Approves SPD timeline visibility and backend-later boundary |
| Product owner | TBD | Pending | TBD | Confirms UI approval scope and backend block |
| Engineering owner | TBD | Pending | TBD | Confirms no backend implementation until HR sign-off |

Sign-off statement:

> HR confirms that STA-30 Time & Attendance UI approval scope is sufficient for design direction only. HR understands that biometric/device integration, payroll posting, attendance calculation engine, production workflow engine, Thai labor rule enforcement, policy number validation, leave balance formula, and OT cut-off logic are Backend-later and not approved for implementation by this document. Backend implementation may start only after all required sign-off rows are completed.

- Source: Seed exit condition `hr_design_approval` and backend-later constraints.
- Owner: HR approvers + Product owner.
- TBD: Actual names, dates, and decision notes.

## 14. Knowledge sources consulted

- `/Users/tachongrak/.ouroboros/seeds/seed_cb7269a1c2b9.yaml`
- `AGENTS.md`
- `src/frontend/src/app/[locale]/time/page.tsx`
- `src/frontend/src/components/time/time-page.tsx`
- `src/frontend/src/app/[locale]/timeoff/page.tsx`
- `src/frontend/src/components/leave/leave-request-form.tsx`
- `src/frontend/src/app/[locale]/overtime/page.tsx`
- `src/frontend/src/hooks/use-time.ts`
- `src/frontend/src/hooks/use-leave.ts`
- `src/frontend/src/hooks/use-settings.ts`
- `src/frontend/src/hooks/use-quick-approve.ts`
- `src/frontend/src/lib/quick-approve-api.ts`
- `src/frontend/src/components/manager/quick-approve-page.tsx`
- `src/frontend/src/components/manager/quick-approve/SmartTabs.tsx`
- `src/frontend/src/components/manager/quick-approve/predicates.ts`
- `src/frontend/src/app/[locale]/quick-approve/page.tsx`
- `src/frontend/src/app/[locale]/quick-approve/[id]/page.tsx`
- `src/frontend/src/components/quick-approve/detail/ActionPanel.tsx`
- `src/frontend/src/components/quick-approve/detail/RejectReturnDrawer.tsx`
- `src/frontend/src/components/quick-approve/mock-requests.ts`

Local knowledge preflight:

- `omx_wiki/index.md`: none found
- `.omx/context/*.md`: none found
- `.omx/plans/*.md`: none found
- Canary token: none found because no project wiki exists

- Source: local repository inspection on 2026-05-17.
- Owner: Document author.
- TBD: Add future wiki link if project creates one.
