# HR Team UI Review — Demo Walkthrough (Apr W4 2026)

> **Workspace**: `/Users/tachongrak/Projects/hr-5p` on branch `jarvis/5persona-approvals`
> **Dev server**: `cd src/frontend && npm run dev` → http://localhost:3001/th/home (or :3000)
> **Spec**: `/Users/tachongrak/Projects/hr/.omc/specs/deep-interview-hr-ec-mockup-ui-review-apr-w4.md` (REVISION 2026-04-26 block at top)
> **Demo language**: Thai-primary
> **Bar**: Demo-script bar — 5 persona happy-paths, no per-BRD coverage promise

## Pre-flight

1. `cd /Users/tachongrak/Projects/hr-5p/src/frontend && npm run dev`
2. Browser → http://localhost:3001/th/home — should redirect through login if not signed in.
3. Open devtools console → confirm no red errors on initial load.
4. The Topbar has a **Persona Switcher** dropdown for in-session role swapping (no logout/login needed between chains).

## DEMO_USERS (5 personas)

| Email | Role | Lands on |
|---|---|---|
| `employee@humi.test` | Employee | `/home` |
| `manager@humi.test` | Manager | `/home` |
| `hrbp@humi.test` | HRBP | `/admin/employees` (Pattern 2 — direct edit, no approval inbox) |
| `spd@humi.test` | SPD | `/spd/inbox` |
| `admin@humi.test` | HR Admin | `/admin` |

Use Persona Switcher in Topbar to swap mid-demo without re-logging in.

---

## Chain 3 — ESS Profile Edit → SPD (BRD #166) — already shipped, verify only

**Story**: Employee edits their personal info; SPD approves; status reflects on Employee profile.

1. Sign in as `employee@humi.test`.
2. Navigate to **`/ess/profile/edit`**.
3. Edit a few fields (e.g. last name, phone). Submit.
4. Toast appears: `"รอ SPD อนุมัติ"`.
5. **Persona switch** → SPD.
6. Land on `/spd/inbox`. The pending request appears with the employee's real name + field-level diff preview (before/after for each changed field).
7. Click **Approve** (or Reject with reason).
8. **Persona switch** back → Employee.
9. `/profile/me` (or `/ess/workflows`) reflects the new status.

**Acceptance**: 1-step routing through SPD only. No HRBP, no Manager involvement (per BRD #166 toast `"รอ SPD อนุมัติ"`).

---

## Chain 1 — ESS Termination → SPD (BRD #172)

**Story**: Employee submits a resignation; SPD reviews + approves; HR Admin sees status reflected.

1. Sign in as `employee@humi.test`.
2. Navigate to **`/resignation`** (or `/th/resignation`).
3. Fill the form:
   - **Last working day** (date picker)
   - **Reason** picklist — 17 SF `TERM_*` codes (e.g. `TERM_HEALTH`, `TERM_RELOCATE`, `TERM_FAMILY`, `TERM_SALARY`, `TERM_OTHER`, etc.)
   - **Comment** (free-text Thai)
   - Optional file attachment
4. Submit. Toast: `"ส่งคำขอลาออกแล้ว — รอ SPD อนุมัติ"`.
5. **Persona switch** → SPD.
6. `/spd/inbox` — the **TerminationInbox** section (sibling to Profile-Edit ApprovalInbox) shows the new request with employee name + reason + last-working-day.
7. Click **Approve** (or Reject).
8. **Persona switch** → HR Admin.
9. `/admin/employees/[id]` for the affected employee — Detail card shows the latest termination request status (workflow status snapshot card).

**Acceptance**: Real-name request flows Employee → SPD → HR Admin status sync. Reject path also exercised.

---

## Chain 4 — Promotion → SPD (BRD #103)

**Story**: HR Admin proposes a promotion; SPD approves; Employee Detail reflects status.

1. Sign in as `admin@humi.test`.
2. Navigate to **`/admin/employees`** → pick any employee → **`/admin/employees/[id]/promotion`**.
3. Submit a promotion (from-position auto-filled; to-position from picklist; effective date; salary delta optional; notes).
4. Success banner: `"รอ SPD อนุมัติ"`. Note: timeline event is also appended immediately (double-write pattern).
5. **Persona switch** → SPD.
6. `/spd/inbox` — the **PromotionInbox** section shows the new request with employee name + from→to position + effective date.
7. Click **Approve** (or Reject).
8. **Persona switch** back → HR Admin.
9. Employee `/admin/employees/[id]` Detail card snapshot reflects the outcome.

**Acceptance**: Three SPD inbox sections visible (Profile-Edit + Termination + Promotion); each independently actionable with real-name rows.

---

## Chain 2 — Hire → HRBP audit panel (NO approval, BRD #109)

**Story**: HR Admin completes a hire; HRBP receives an SH4 audit notification — informational only, no Approve/Reject button (per Apr 24 design: HRBP edits via /admin/employees Pattern 2, not approval inbox).

1. Sign in as `admin@humi.test`.
2. Navigate to **`/admin/hire`** → 3-cluster wizard (Identity / Job / Compensation).
3. Fill the wizard (or use existing in-progress data) → Submit at Step 3 (Review).
4. On submit, `appendHireAudit()` logs an entry: `{ candidateName, position, company, hireDate, hrbpEmail, hrAdminName, sentAt }`.
5. **Persona switch** → HRBP.
6. `/hrbp-reports` — section **"Hire Notifications (SH4)"** shows the new audit row with full details.
7. **No Approve/Reject buttons** — informational only.

**Acceptance**: Hire wizard submit produces an audit row visible to HRBP; HRBP /hrbp-reports has NO approval surface.

---

## Chain 5 — Manager Leave queue (separate from EC, out-of-scope but covers Manager)

**Story**: Manager sees a queue of pending leave requests with real Employee names; approves or rejects.

1. **Pre-seeded** at session boot: 3 mock pending leave requests (Thai employee names from `MOCK_EMPLOYEES`) appear in `/quick-approve`.
2. Sign in as `manager@humi.test`.
3. Navigate to **`/quick-approve`**.
4. **Leave queue** section at top shows pending rows: employee name + leave type + dates + reason.
5. Click **Approve** or **Reject** on a row.
6. Status mutates; row leaves the pending view.
7. Footnote at bottom of page: `"คิวลา (out-of-EC) — Manager จัดการเฉพาะใบลา; การเปลี่ยนข้อมูลส่วนตัวไปที่ SPD ตาม BRD #166"`.

**Acceptance**: Manager has a working approval surface for leave (out-of-EC scope) with real-name rows; clear separation from EC personal-info flow (which goes to SPD).

---

## Picklist fidelity (Option B)

While running through any of the chains, picklists are sourced from `@hrms/shared/picklists` (no mock placeholders).

Notable corrections shipped this round:

- **MaritalStatus** now includes `N=สมรสไม่จดทะเบียน` (Common-law / Unregistered marriage) — was missing per SF QAS option `N`.
- **EmployeeClass** Thai labels corrected for codes B / D / F (per SF QAS).
- **Religion** SIKH spelling fixed (`ซิกห์` → `ซิกข์`).

Verify by opening any form that uses these picklists (e.g. Hire wizard StepBiographical — MaritalStatus dropdown should show 6 options ending with `สมรสไม่จดทะเบียน`).

## Pre-existing scope note

The following were **already shipped on this branch before this autopilot run** and form the foundation of the demo:

- `workflow-approvals` Zustand store (BRD #166 / personal-info chain) — Chain 3 functional
- PersonaSwitcher in Topbar — 5 personas with role-priority landing
- `lib/demo-seed.ts` — seeds initial mock data on first mount
- Role-gated sidebar (Employee / Manager / HRBP / SPD / Admin)

If the reviewer asks "where did these come from?" — commits `ba05d87` and `22f48b3` (both Apr 24 2026, before this autopilot run).

## Out of scope (Sprint 2)

- Real backend / persistence beyond localStorage
- Schema migrations (Per/Emp split, EmploymentState history)
- Payment Foundation (BRD #6)
- Special Information cust_* (BRDs #35–84)
- Reports module individual specs (#121–152, #162–164)
- Playwright e2e suite for demo paths
- English i18n / language toggle
- ESS Profile Edit approver fork (BA-1) — closed as SPD-only per BRD #166 + commit 22f48b3

## Known partials / footnotes for the reviewer

- Chain 5 is **out-of-EC** by design (Leave is timeoff, separate from EC personal-info). The footnote on `/quick-approve` makes this explicit.
- Chain 2 (Hire) does NOT have an HRBP approval inbox — by design (Apr 24 22f48b3 commit walked back the 3-step Manager→HRBP→SPD chain to SF-canonical 1-step). HRBP is informational only.
- Promotion uses **double-write**: timeline event lands immediately on submit (existing pattern); promotion-approvals store is additive for SPD review.
- Resignation page was **rewritten** (the previous 3-tab UI for recording/clearance/settlement was unrelated to ESS-initiated termination per BRD #172 — Chain 1 is the canonical path).

## Console-error sweep checklist

For each persona/chain above:
- [ ] Devtools open before navigating
- [ ] No red errors on initial route load
- [ ] No red errors on form submit
- [ ] No red errors on Persona Switcher swap
- [ ] No red errors on Approve/Reject button click
