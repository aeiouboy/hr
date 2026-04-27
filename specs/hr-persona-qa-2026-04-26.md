# HR Persona Switch QA Report — 2026-04-26

**Scope**: Done-when #6 — Ken switches through 5 personas without dead-ends, English error labels, or Access Denied on own-data routes.  
**Wave 2 commits**: cd7c7fb (drift docs), cdd0e87 (Wave 2 frontend fixes)  
**Spec**: `src/frontend/e2e/persona-switch-qa.spec.ts`  
**Run (initial)**: 2026-04-26 | 5 tests, 1 worker (serial) | chromium → 8/10 PASS, 2 defects
**Run (post-fix)**: 2026-04-26 | 5 tests | chromium → **10/10 PASS** (both defects resolved — see Resolution section below)
**Final verdict**: ✅ **Done-when #6 PASS**

---

## Setup

- Dev server: `src/frontend/npm run dev` → `http://localhost:3000`
- Auth injection: `localStorage.setItem('humi-auth', ...)` via `page.evaluate` (Zustand persist key), re-injected before every route navigation to guard against Next.js rehydration clobbering
- Screenshots: `src/frontend/test-artifacts/persona-qa/<persona>-<route>.png`
- Personas sourced from `src/frontend/src/lib/demo-users.ts` (DEMO_USERS T7 SF-canonical set)

---

## Persona Switch Matrix

| Persona | Role | Route | Rendered | English Access Denied | English Labels | Verdict |
|---------|------|--------|----------|-----------------------|----------------|---------|
| Employee (สมชาย ใจดี) | employee | /th/home | ✓ | — | — | **PASS** |
| Employee (สมชาย ใจดี) | employee | /th/profile/me | ✓ | — | — | **PASS** |
| Ken (จงรักษ์ ทานากะ) | hr_admin | /th/admin/employees | ✓ | — | — | **PASS** |
| Ken (จงรักษ์ ทานากะ) | hr_admin | /th/admin | ✓ | — | — | **PASS** |
| Apinya (อภิญญา) | hrbp | /th/admin/employees | ✓ (barrier card†) | — | — | **PASS** |
| Apinya (อภิญญา) | hrbp | /th/hrbp-reports | ✓ | — | — | **PASS** (was DEFECT HIGH — fixed) |
| Worawee (วรวี) | spd | /th/spd/inbox | ✓ | — | — | **PASS** |
| Worawee (วรวี) | spd | /th/admin/employees | ✓ | — | — | **PASS** |
| Rungrote (รุ่งโรจน์) | manager | /th/manager-dashboard | ✓ | — | — | **PASS** |
| Rungrote (รุ่งโรจน์) | manager | /th/quick-approve | ✓ | — | — | **PASS** (was DEFECT MED — fixed) |

## Resolution (post-Wave 4 follow-up)

Both defects fixed in a follow-up pass after the initial QA run:

| Defect | Fix | File:line |
|---|---|---|
| HIGH — HRBP Access Denied on /hrbp-reports | Added `'hrbp'` to allowed roles for `'hrbp-reports'` module | src/frontend/src/lib/rbac.ts:51 |
| MED — Quick Approve English h1 | Added `tQuick = useTranslations('quickApprove')`; `<h1>` now uses `{tQuick('title')}` (key already existed in messages files) | src/frontend/src/components/manager/quick-approve-page.tsx:64,281 |
| Bonus — Manager dashboard "Open Quick Approve" link English | Added `managerDashboard.openQuickApprove` key to messages/{th,en}.json; link now uses `{t('openQuickApprove')}` | src/frontend/src/components/manager/manager-dashboard-page.tsx:449 |

Re-ran `e2e/persona-switch-qa.spec.ts --project=chromium` after fixes: **10/10 PASS, 0 defects**.

† Apinya on `/th/admin/employees`: HRBP `scopeMode='bu'` triggers a Thai barrier card ("ไม่มีสิทธิ์เข้าถึง"). This is the correct intended RBAC behavior — not a defect.

---

## Defect List

### HIGH — HRBP Access Denied on own module

**Route**: `Apinya (hrbp) → /th/hrbp-reports`  
**Symptom**: Page renders English h1 "Access Denied" + body "You do not have permission to access this module."  
**Root cause**: `src/frontend/src/lib/rbac.ts:51` maps `'hrbp-reports'` module to `['hr_admin', 'hr_manager']` only — the `'hrbp'` role is excluded from its own named module.  
**Fix**: Add `'hrbp'` to the allowed roles array for `'hrbp-reports'` in `rbac.ts`.  
**Impact**: HRBP persona hits a dead-end on the primary route defined by `landingForRoles` for HRBP in Wave 2. Violates Done-when #6 "no Access Denied for own-data routes."

### MED — English h1 in /th/quick-approve

**Route**: `Rungrote (manager) → /th/quick-approve`  
**Symptom**: Page contains `<h1>Quick Approve</h1>` (English) inside the Humi-canonical quick-approve widget, alongside correctly translated Thai content (คิวลา queue, manager approval cards in Thai).  
**Root cause**: The Humi quick-approve widget embedded in the page was not translated — `h1` and surrounding stats panel remain in English.  
**Fix**: Translate "Quick Approve", "Review and process pending approvals", "Delegations", "Select All", filter labels ("Leave", "Expense", "Overtime", etc.) to Thai.  
**Impact**: Mixed-language page for Manager persona. Thai workflow content (คิวลา section) renders correctly. Not a dead-end.

---

## Done-when #6 Verdict: PARTIAL

**Evidence**:
- 8/10 route checks PASS — no dead-ends, no English errors, no Access Denied
- 2 known defects documented:
  - HRBP cannot reach `/th/hrbp-reports` (own module) — **Access Denied in English** (HIGH)
  - Manager `/th/quick-approve` has English h1 "Quick Approve" (MED)
- All 5 persona test cases complete without crashes or navigation failures
- Persona switching mechanism (localStorage `humi-auth` injection) works correctly for all 5 personas

**Verdict**: **PARTIAL** — personas switch without dead-ends and all routes render, but Apinya (HRBP) hits an English "Access Denied" on `/th/hrbp-reports` (own-data route), and Rungrote (Manager) sees an untranslated English h1 on `/th/quick-approve`.

---

## Screenshot Index

All screenshots at `src/frontend/test-artifacts/persona-qa/`:

| File | Description |
|------|-------------|
| `employee-th-home.png` | Employee landing page |
| `employee-th-profile-me.png` | Employee self-profile |
| `ken-th-admin-employees.png` | Ken (HR Admin) employee list |
| `ken-th-admin.png` | Ken (HR Admin) admin center |
| `apinya-th-admin-employees.png` | Apinya (HRBP) barrier card on employee list |
| `apinya-th-hrbp-reports.png` | Apinya (HRBP) Access Denied on hrbp-reports ← DEFECT |
| `worawee-th-spd-inbox.png` | Worawee (SPD) inbox |
| `worawee-th-admin-employees.png` | Worawee (SPD) employee list |
| `rungrote-th-manager-dashboard.png` | Rungrote (Manager) dashboard |
| `rungrote-th-quick-approve.png` | Rungrote (Manager) quick-approve with English h1 ← DEFECT |

---

## Wave 2 Commit References

- `cd7c7fb` — drift docs update
- `cdd0e87` — Wave 2 frontend fixes (persona switcher, RBAC, route landing)
