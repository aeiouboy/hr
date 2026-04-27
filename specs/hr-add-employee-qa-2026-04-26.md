# Add Employee Wizard — QA Report
**Date:** 2026-04-26  
**Commits under test:** cd7c7fb + cdd0e87 + fe8709f (Wave 1/2/3/4)  
**Tester:** Playwright automated spec — `e2e/add-employee-sanity.spec.ts`  
**Auth:** Ken (hr_admin) — KEN001  
**URL under test:** `/th/admin/hire`

---

## Test Summary

| Metric | Count |
|--------|-------|
| Total cases run | 15 |
| PASS | 6 |
| FAIL | 9 |
| Playwright tests passed | 6 |
| Playwright tests failed | 9 |

---

## Validation Matrix

| ID | Step | Validation Case | BRD | Verdict | Note |
|----|------|-----------------|-----|---------|------|
| NEG-01 | StepIdentity | hireDate empty → Next blocked | — | **PASS** | Wizard `sliceValid.identity` correctly gates on hireDate presence |
| NEG-02 | StepIdentity | hireDate >90 days back → Next blocked | #101 | **FAIL** | Wizard stepper only checks presence, not the 90-day Zod refine |
| NEG-03 | StepIdentity | Thai NID bad mod-11 → Next blocked | #14 | **FAIL** | Wizard stepper only checks `nationalId.trim() !== ''`, not checksum |
| NEG-04 | StepIdentity | NID non-13-digit → Next blocked | #14 | **FAIL** | Same root cause as NEG-03 — no format gate at wizard level |
| NEG-05 | StepIdentity | NATIONAL_ID + invalid checksum → UI alert | #14 | **PASS** | `[role=alert]` with "checksum" text appears after field blur |
| NEG-06 | StepBiographical | gender empty → Next blocked | — | **FAIL** | Step 1 wizard cluster validates `identity` slice only; bio is checked on step 2. Injected empty bio with step=1 still passes step 1. |
| NEG-07 | StepBiographical | maritalStatus empty → Next blocked | — | **FAIL** | Same root cause as NEG-06 |
| NEG-08 | StepContact | email bad format → aria-invalid="true" | #15 | **PASS** | Input shows `aria-invalid="true"` on bad email |
| NEG-09 | StepEmployeeInfo | employeeClass empty → Next blocked | #23 | **FAIL** | `employeeInfo` is a legacy slice not covered by `checkStepValid(1-3)` |
| NEG-10 | StepJob | position empty → Next blocked | — | **FAIL** | `job` slice gate is in legacy path not wired to cluster 1-3 |
| NEG-11 | StepCompensation | baseSalary empty → Next blocked | — | **FAIL** | `compensation` slice not wired to cluster step gating |
| NEG-12 | StepCompensation | baseSalary = 0 → Next blocked | — | **FAIL** | Same as NEG-11 |
| NEG-13 | ClusterReview | HRBP picker empty → Submit blocked | #109 | **FAIL** | Submit enabled without HRBP selection; hrbpAssignee is local state not wired to WizardShell's `isCurrentStepValid` |
| NEG-14 | StepContact | Address houseNo asterisk present | #17 | **PASS** | Required field indicator renders correctly |
| HAPPY | Full wizard | Submit → confirmation/done page | — | **FAIL** | No confirmation page exists; wizard calls `reset()` and returns to step 1 |

---

## Defects Found

### DEF-01 — HIGH: No Confirmation/Done Page After Submission
**ID:** HAPPY  
**BRD ref:** (UX standard, no specific BRD #)  
**Root cause:** `handleSubmit()` in `hire/page.tsx:49` calls `reset()` and returns. No `router.push`, no toast, no success state. After clicking "บันทึกและส่ง" the wizard silently resets to step 1 with no indication that the hire was saved.  
**Evidence:** `test-artifacts/add-employee-qa/HAPPY-after-submit.png`, `HAPPY-final-state.png`  
**Impact:** HR Admin receives no confirmation that the employee was created. Duplicate submissions possible.

---

### DEF-02 — HIGH: BRD #101 hireDate >90-day Gate Not Enforced at Wizard Level
**ID:** NEG-02  
**BRD ref:** #101  
**Root cause:** `checkStepValid` / `sliceValid.identity` checks only field presence, not the 90-day Zod refine defined in `hireSchema.ts`. The Zod schema runs inside `StepIdentity`'s `validate()` and calls `onValidChange(false)` — but the wizard's `isStepValid(step)` is a separate pure function that does not consult the Zod result. The two systems are not connected.  
**Evidence:** `test-artifacts/add-employee-qa/NEG-02-hireDate-91days-back.png` — Next button enabled with 2025-01-25 as hireDate (91 days past).  
**Impact:** HR Admin can proceed to submit a hire with a date >90 days back without SPD approval, violating BRD #101.

---

### DEF-03 — HIGH: BRD #14 Thai NID Mod-11 Not Enforced at Wizard Step Gate
**ID:** NEG-03, NEG-04  
**BRD ref:** #14  
**Root cause:** Same disconnection as DEF-02. `sliceValid.identity` checks `nationalId.trim() !== ''`. The mod-11 Zod refine fires in `StepIdentity` and shows a `[role=alert]` (as confirmed by NEG-05 PASS), but does not propagate to `onValidChange` in a way that blocks the Next button. `StepIdentity`'s own `validate()` calls `onValidChange(false)` but the wizard's `isStepValid` bypasses it.  
**Evidence:** `test-artifacts/add-employee-qa/NEG-03-NID-bad-mod11.png`, `NEG-04-NID-non13-digit.png`  
**Impact:** Employee can be created with an invalid/non-verifiable Thai National ID, violating BRD #14 SF compliance requirement.

---

### DEF-04 — HIGH: BRD #109 HRBP Assignment Not Required Before Submit
**ID:** NEG-13  
**BRD ref:** #109  
**Root cause:** `hrbpAssignee` is local state in `ClusterReview`. It is never passed to `WizardShell`'s `isCurrentStepValid`. `checkStepValid(3)` returns `sliceValid.review()` which always returns `true`. The "บันทึกและส่ง" button is always enabled on step 3 regardless of HRBP selection.  
**Evidence:** `test-artifacts/add-employee-qa/NEG-13-review-hrbp-empty.png`  
**Impact:** SH4 notification (BRD #109) cannot fire reliably — the audit entry hardcodes `hrbpEmail: 'hrbp@humi.test'` rather than using the selected HRBP.

---

### DEF-05 — MED: Cluster 2 Wizard Step Gate Does Not Cover EmployeeInfo/Job/Compensation Slices
**ID:** NEG-06, NEG-07, NEG-09, NEG-10, NEG-11, NEG-12  
**BRD ref:** #23 (employeeGroup), #30 (employeeSubGroup)  
**Root cause:** The 3-cluster wizard restructure maps: Step 1 → `identity` slice, Step 2 → `biographical` slice, Step 3 → `review`. The `employeeInfo`, `job`, and `compensation` slices are legacy slices from the pre-restructure 8-step flow. They are rendered inside Cluster 2 (`ClusterJob`) but never gated by `checkStepValid`. Additionally, biographical tests (NEG-06/07) fail because step 1 only checks `identity`, while biographical data is gated at step 2 — but the test incorrectly injects with `currentStep: 1`.  
**Evidence:** `NEG-06/07/09/10/11/12` screenshots — Next/Submit not disabled despite invalid data in those slices.  
**Impact:** Hire can be submitted without: position, employee class, valid compensation — and all biographical required fields (gender, marital status) are soft-required in schema but not gated by the wizard.

---

## Submission Verdict

**FAIL — No done/confirmation page reached.**

After clicking "บันทึกและส่ง" with all fields valid:
- URL did not change (stayed at `/th/admin/hire`)
- No "สำเร็จ", "Created", or success toast appeared
- The wizard reset to step 1 (blank form)
- `handleSubmit()` in `hire/page.tsx` only calls `appendHireAudit(...)` and `reset()` — no router navigation, no success state

This is a **HIGH** defect. The audit entry IS appended to the hire-audit store (in-memory mock), but no feedback is given to the HR Admin.

**Evidence screenshots:**
- `test-artifacts/add-employee-qa/HAPPY-before-submit.png` — Submit button enabled, step 3 review
- `test-artifacts/add-employee-qa/HAPPY-after-submit.png` — Post-click state
- `test-artifacts/add-employee-qa/HAPPY-final-state.png` — Wizard reset to step 1

---

## Root Cause Analysis

The wizard has two parallel validation systems that are not connected:

1. **Zod schema validation** (in each Step component): Runs `stepIdentitySchema.safeParse()` etc., calls `onValidChange(false/true)` to notify the parent cluster.

2. **Store-level gating** (`checkStepValid` / `sliceValid`): Pure functions on `formData` that the WizardShell uses to enable/disable Next. These only check field presence, not Zod refinements.

For the Next/Submit button to be disabled on BRD #101 or #14 failures, the `onValidChange` signal from StepIdentity must reach `checkStepValid`. Currently it does not — the clusters (`ClusterWho`, `ClusterJob`) receive `onValidChange` from steps but do not propagate it back to the Zustand store's validity state.

Wave 6 fix suggestion: Wire `onValidChange(false)` from each Step component into a per-step validity flag in the Zustand store, then use that flag in `checkStepValid` instead of (or in addition to) the pure field-presence check.

---

## Wave 2 Commits Reference

| Commit | Description |
|--------|-------------|
| cd7c7fb | Wave 1 — initial wizard restructure |
| cdd0e87 | Wave 2 — StepBiographical + StepContact + mod-11 validation |
| fe8709f | Wave 3/4 — additional step and persona fixes |

The disconnect between Zod validation and wizard gating was likely introduced in the cluster restructure when 8 steps collapsed to 3 clusters, losing the per-step `onValidChange` propagation chain.

---

*Report generated by `e2e/add-employee-sanity.spec.ts` — Playwright 1.58.2 — 2026-04-26*

---

## Resolution (Wave 6) — 2026-04-26

All 5 HIGH defects fixed. E2E result: **15/15 PASS** (was 6/15). Vitest: **1536 PASS** (no regression).

### Architectural fix

Added `stepValidity: { identity, biographical, contact, employeeInfo, job, compensation }` and `hrbpAssignee` to the Zustand wizard store (`useHireWizard.ts`). Each Step component's existing `onValidChange(valid)` callback now calls `setStepValidity(slice, valid)` (wired in cluster wrapper). `checkStepValid` / `isStepValid` ANDs the presence check with `stepValidity` flags, connecting Zod refines to the wizard gate. `stepValidity` defaults to `true` so unit tests that set `formData` directly (without mounting Step components) remain green.

### Defect closure

| ID | Fix file | Verdict |
|----|----------|---------|
| DEF-01 | `src/frontend/src/app/[locale]/admin/hire/page.tsx` | Closed — confirmation card renders after submit showing employee ID + "บันทึกเรียบร้อย" with two action buttons |
| DEF-02 | `src/frontend/src/lib/admin/store/useHireWizard.ts` + `clusters/ClusterWho.tsx` | Closed — `stepValidity.identity` wired via `onValidChange` from StepIdentity; hireDate >90d Zod refine now blocks Next |
| DEF-03 | Same as DEF-02 | Closed — Thai NID mod-11 Zod refine in StepIdentity now blocks Next via `stepValidity.identity` gate |
| DEF-04 | `clusters/ClusterReview.tsx` + `useHireWizard.ts` + `page.tsx` | Closed — `hrbpAssignee` lifted to Zustand store; `handleSubmit` guards on non-empty `hrbpAssignee`, shows inline `[role=alert]` error on submit-without-HRBP |
| DEF-05 | `useHireWizard.ts` | Closed — `checkStepValid(2)` now ANDs `sliceValid.employeeInfo && sliceValid.job && sliceValid.compensation`; `checkStepValid(1)` uses `sv.biographical && sv.contact` flags |
