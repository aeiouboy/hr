# Navigation Cleanup Spec

> **Generated**: 2026-04-26
> **Author**: architect (autopilot navigation cleanup pass)
> **Source**: live grep of `src/frontend/src/app/[locale]/**/page.tsx`, `src/components/humi/QuickActionsTile.tsx`, `src/components/humi/shell/Sidebar.tsx`, `src/components/admin/shell/AdminSidebar.tsx`, `src/data/admin/mockAdminSelfService.json`, `next.config.ts`, `specs/hr-drift-matrix.md`
> **Hard constraints**: no new pages, no backend, Thai-primary labels, adopt-not-reinvent, redirect-or-remove only
>
> **Scope summary**: 8 duplicate-entry groups, 17 EN-only/EN-mixed labels, 9 files modified.

---

## Duplicate-entry groups (8 groups found)

| # | Feature | Canonical | Aliases (action) | Reason |
|---|---|---|---|---|
| 1 | Leave / Time-off | `/th/timeoff` | `/th/leave` (redirect → `/th/timeoff`)<br>`/th/leave/request` (redirect → `/th/timeoff?tab=request`)<br>`/th/leave/history` (redirect → `/th/timeoff?tab=history`) | Sidebar comment lines 279-281 already declares `/timeoff` canonical; `humi-timeoff-slice` is the active store; `/leave/*` are legacy ts-build code. Drift-matrix has no Wave-1 BRD pinning `/leave/*`. Keep redirects (don't `rm`) so existing seeded admin tile `qa_leave_request` (`mockAdminSelfService.json:453`) keeps resolving until that seed is sanitized. |
| 2 | Profile (ESS) | `/th/profile/me` | `/th/profile` (redirect → `/th/profile/me`)<br>`/th/ess` (redirect → `/th/profile/me`)<br>`/th/ess/profile` (redirect → `/th/profile/me`)<br>`/th/employees/me` (already redirects — keep) | Sidebar item `profile` (line 91) and BRD #166/#173 reference `/profile/me`. `/employees/me/page.tsx` already redirects (line 1, 14). `/ess/page.tsx` is a 4-tile mini-dashboard whose 3 tiles ALL re-link into canonical pages — pure duplication. `/profile/page.tsx` predates `profile/me` and has stale `router.push('/profile?id=...')` that drops locale. |
| 3 | Profile edit | `/th/ess/profile/edit` | (none — keep, but stop deep-linking from elsewhere) | BRD #166 surface; `qa_manage_data` tile (`mockAdminSelfService.json:437`) already targets it. **Decision**: keep `/ess/profile/edit` as canonical edit form (don't redirect — it's a working flow), but remove the `/ess/profile` *view* page (covered above). |
| 4 | Payslip | `/th/employees/me/payslip` | `/th/payslip` (already redirects — verified `payslip/page.tsx:1-11`) | Already correctly redirected. No code change needed. **Action**: update `mockAdminSelfService.json:405` `qa_pay_statement` to point at `/th/employees/me/payslip` (not `/th/payslip`) so the seed reflects canonical. |
| 5 | Payroll (Admin) | `/th/payroll` (landing) + `/th/payroll/processing` + `/th/payroll/setup` + `/th/payroll/reports` (sub-routes) | `/th/payroll-processing` (redirect → `/th/payroll/processing`)<br>`/th/payroll-setup` (redirect → `/th/payroll/setup`) | Hyphenated flat versions are legacy; nested `/payroll/*` is the SF-aligned tree. Per Sidebar.tsx:294-299 all 6 routes are `SIDEBAR_LEGACY` (BRD #62 blocked) — consolidating to nested form lets future sidebar surface a single `/payroll` entry. |
| 6 | Recruitment | `/th/recruiting` | `/th/recruitment` (redirect → `/th/recruiting`) | Sidebar line 123 wires `/recruiting`; `/recruitment/page.tsx` is older `<RecruitmentPage>` PageLayout shell. Sidebar.tsx:301 marks `/recruitment` as legacy. |
| 7 | Reports | `/th/reports` (employee/manager) + `/th/admin/reports` (HR Admin) | `/th/government-reports` (redirect → `/th/admin/system/reports`)<br>`/th/hrbp-reports` (redirect → `/th/reports?scope=hrbp`)<br>`/th/admin/system/reports` keeps existing role-specific deep entry | `/reports` is wired in main sidebar (line 124) and `/admin/reports` in admin sidebar (line 58); both render distinct dashboards. The `/government-reports` and `/hrbp-reports` are `SIDEBAR_LEGACY` (lines 304-305) — they're surfaced via `/reports` action cards. Redirect to consolidate. |
| 8 | Hire / Onboarding | `/th/admin/hire` | `/th/onboarding` (redirect → `/th/admin/hire`) | `/admin/hire` is the Wave-1 canonical hire wizard (BRD #14, #17, #109 all anchor to it per drift matrix). `/onboarding/page.tsx` is a stale `<OnboardingPage>` shell with no BRD coverage. SPD reference Sidebar.tsx:291 marks `/onboarding` legacy. |
| — | SPD | `/th/spd/inbox` (workflow inbox) + `/th/spd-management` (admin config) | (no consolidation — distinct features) | Drift-matrix #134/#95 anchors `/spd/inbox` as workflow inbox; `/spd-management` is admin-tier setup screen. Different concerns. **No action**. |

**Note**: Workflows family (`/workflows`, `/workflows/probation`, `/ess/workflows`, `/quick-approve`) is intentionally NOT consolidated — each surface has a distinct persona/tab role per BRD #117/#103. Sidebar already separates them correctly (lines 95, 102).

---

## EN-only / EN-mixed labels to fix (17 instances)

All in admin self-service seed and `government-reports` page (admin sidebar + main sidebar are clean Thai). Thai-primary rule: Thai is the visible label; English may stay as a smaller subtitle/aria but must NOT be the only string.

| File:line | Current label | Should be (Thai-primary) |
|---|---|---|
| `src/data/admin/mockAdminSelfService.json:404` | `"Pay Statement"` | `"สลิปเงินเดือน"` |
| `src/data/admin/mockAdminSelfService.json:412` | `"Request Feedback"` | `"ขอฟีดแบ็ก"` |
| `src/data/admin/mockAdminSelfService.json:419` | `"Give Feedback"` | `"ให้ฟีดแบ็ก"` |
| `src/data/admin/mockAdminSelfService.json:427` | `"Create Activity"` | `"สร้างกิจกรรม"` |
| `src/data/admin/mockAdminSelfService.json:435` | `"Manage My Data"` | `"จัดการข้อมูลของฉัน"` |
| `src/data/admin/mockAdminSelfService.json:443` | `"Reminders"` | `"รายการแจ้งเตือน"` |
| `src/data/admin/mockAdminSelfService.json:451` | `"Leave Request"` | `"ขอลาหยุด"` |
| `src/data/admin/mockAdminSelfService.json:459` | `"Time Sheet"` | `"ใบลงเวลา"` |
| `src/data/admin/mockAdminSelfService.json:469` | `"Org Chart"` | `"ผังองค์กร"` |
| `src/data/admin/mockAdminSelfService.json:483` | `"Pending Workflows"` | `"คำขอรออนุมัติ"` |
| `src/data/admin/mockAdminSelfService.json:497` | `"Admin Alerts"` | `"แจ้งเตือนผู้ดูแล"` |
| `src/data/admin/mockAdminSelfService.json:509` | `"Payslip"` | `"สลิปเงินเดือน"` |
| `src/data/admin/mockAdminSelfService.json:522` | `"Reminders"` | `"รายการแจ้งเตือน"` |
| `src/app/[locale]/government-reports/page.tsx:46` | `"Submitted"` (badge) | `"ส่งแล้ว"` |
| `src/app/[locale]/government-reports/page.tsx:55` | `"Generated"` (badge) | `"สร้างแล้ว"` |
| `src/app/[locale]/government-reports/page.tsx:297` | `"Status"` (table header) | use `t('status')` (already imported `useTranslations`) |
| `src/app/[locale]/government-reports/page.tsx:346` | `"Download"` link text | `"ดาวน์โหลด"` (mobile copy on line 392 same fix) |

**Note on `/government-reports`**: page is being redirected per Group 7 above. If redirect is permanent, label fixes can be skipped (page becomes unreachable). Marked here for completeness in case redirect is delayed.

---

## Exec plan (parallel-safe groupings)

Each group is independent — can be assigned to one executor each.

### Group A — Route consolidation (Next.js redirects in `next.config.ts`)
**Files**: `src/frontend/next.config.ts` (single-file edit, additive to existing `redirects()` array on lines 8-16).

Add the following entries to the `redirects()` return array. Use `permanent: false` (matches existing `/` → `/th/home` style) so legacy bookmarks redirect but search engines aren't told the route is gone forever during transition.

```ts
// Leave family → /timeoff canonical
{ source: '/:locale(th|en)/leave', destination: '/:locale/timeoff', permanent: false },
{ source: '/:locale(th|en)/leave/request', destination: '/:locale/timeoff?tab=request', permanent: false },
{ source: '/:locale(th|en)/leave/history', destination: '/:locale/timeoff?tab=history', permanent: false },

// Profile alt-paths → /profile/me canonical
{ source: '/:locale(th|en)/profile', destination: '/:locale/profile/me', permanent: false },
{ source: '/:locale(th|en)/ess', destination: '/:locale/profile/me', permanent: false },
{ source: '/:locale(th|en)/ess/profile', destination: '/:locale/profile/me', permanent: false },
// /employees/me already self-redirects in page.tsx — no entry needed

// Payroll flat → nested
{ source: '/:locale(th|en)/payroll-processing', destination: '/:locale/payroll/processing', permanent: false },
{ source: '/:locale(th|en)/payroll-setup', destination: '/:locale/payroll/setup', permanent: false },

// Recruitment → recruiting (sidebar canonical)
{ source: '/:locale(th|en)/recruitment', destination: '/:locale/recruiting', permanent: false },

// Reports satellites → main reports (or admin/system/reports for gov)
{ source: '/:locale(th|en)/government-reports', destination: '/:locale/admin/system/reports', permanent: false },
{ source: '/:locale(th|en)/hrbp-reports', destination: '/:locale/reports?scope=hrbp', permanent: false },

// Hire / onboarding
{ source: '/:locale(th|en)/onboarding', destination: '/:locale/admin/hire', permanent: false },
```

**Then delete** the now-shadowed `page.tsx` files (Next.js redirect runs before route resolution, but leaving the files behind drifts the route table and breaks the design-gate sidebar-coverage parser):

- `src/app/[locale]/leave/page.tsx`
- `src/app/[locale]/leave/request/page.tsx`
- `src/app/[locale]/leave/history/page.tsx`
- `src/app/[locale]/leave/` (directory, after the three page.tsx are gone)
- `src/app/[locale]/profile/page.tsx` (keep `profile/me/` and `profile/[tab]/`)
- `src/app/[locale]/ess/page.tsx` (keep `ess/workflows/` and `ess/profile/edit/` — the latter is canonical edit)
- `src/app/[locale]/ess/profile/page.tsx` (keep `ess/profile/edit/page.tsx`)
- `src/app/[locale]/payroll-processing/page.tsx`
- `src/app/[locale]/payroll-setup/page.tsx`
- `src/app/[locale]/recruitment/page.tsx`
- `src/app/[locale]/government-reports/page.tsx`
- `src/app/[locale]/hrbp-reports/page.tsx`
- `src/app/[locale]/onboarding/page.tsx`

Update Sidebar.tsx coverage annotations (lines 266-322): remove the `SIDEBAR_LEGACY:` lines for routes that no longer exist as files (e.g. `/leave`, `/leave/history`, `/leave/request`, `/profile`, `/ess`, `/ess/profile`, `/payroll-processing`, `/payroll-setup`, `/recruitment`, `/government-reports`, `/hrbp-reports`, `/onboarding`). Leave the `/payslip` and `/employees/me*` lines intact.

### Group B — Sidebar + tile label cleanup
**Files**: `src/data/admin/mockAdminSelfService.json`

Apply the 13 label rewrites from the table above (rows targeting this JSON file). This file is consumed by `/home` page line 116-119 (`useAdminSelfService` → `makeAdminQuickActions`), which renders Thai labels via `<QuickActionsTile actions={…}>`. The current EN strings flow straight into the tile's visible text, violating Thai-primary.

Also update **3 hrefs** in this file to canonical routes:
- `qa_pay_statement.href: "/th/payslip"` → `"/th/employees/me/payslip"` (line 405)
- `qa_leave_request.href: "/th/leave/request"` → `"/th/timeoff?tab=request"` (line 453)
- `qa_request_feedback.href` and `qa_give_feedback.href` (`/th/workflows`) — leave (still valid route).

### Group C — QuickActions seed sanitization & admin editor consistency
**Files**: `src/lib/admin/store/useAdminSelfService.ts` (if it has duplicate hard-coded fallbacks), `src/app/[locale]/admin/self-service/quick-actions/page.tsx`, `src/app/[locale]/admin/self-service/tiles/page.tsx`.

Verify the admin editors that drive `mockAdminSelfService.json` enforce a Thai label minimum (no submit if label only contains ASCII). Add a single `validateThaiPrimary(label: string): boolean` helper (must contain ≥1 Thai char in the U+0E00..U+0E7F range) and gate the publish button. This prevents future regression. **No new page**, just inline validation.

### Group D — e2e + unit-test updates
**Files**: any test under `src/frontend/src/**/__tests__/` or `e2e/` that asserts on the removed routes.

Run `rg -l "'/th/(leave|leave/request|leave/history|profile($|\?)|ess($|\?)|ess/profile($|\?)|payroll-processing|payroll-setup|recruitment|government-reports|hrbp-reports|onboarding)'" src/frontend` and update each hit to the canonical route. The `QuickActionsTile.test.tsx` already exists — re-run after Group B JSON changes to confirm Thai labels assert.

Also update Sidebar `SIDEBAR_LEGACY:` comment block (Sidebar.tsx:266-322) — remove lines for paths no longer present so the design-gate `sidebar-coverage.ts` parser stays accurate.

---

## Stub redirects (for legacy routes you can't remove)

All redirects live in `next.config.ts` `redirects()` (Group A above). Summary table:

| Stale route | Redirect target | Permanent? |
|---|---|---|
| `/th/leave` | `/th/timeoff` | false (transition) |
| `/th/leave/request` | `/th/timeoff?tab=request` | false |
| `/th/leave/history` | `/th/timeoff?tab=history` | false |
| `/th/profile` | `/th/profile/me` | false |
| `/th/ess` | `/th/profile/me` | false |
| `/th/ess/profile` | `/th/profile/me` | false |
| `/th/payroll-processing` | `/th/payroll/processing` | false |
| `/th/payroll-setup` | `/th/payroll/setup` | false |
| `/th/recruitment` | `/th/recruiting` | false |
| `/th/government-reports` | `/th/admin/system/reports` | false |
| `/th/hrbp-reports` | `/th/reports?scope=hrbp` | false |
| `/th/onboarding` | `/th/admin/hire` | false |

**Locale match note**: Use `:locale(th|en)` in the source pattern so both `/th/...` and `/en/...` redirect. Don't hard-code `/th/` — that breaks the EN locale switcher.

**`/employees/me` note**: already self-redirects via `redirect()` in the page handler (`src/app/[locale]/employees/me/page.tsx:14`). Don't add a duplicate Next.js-level redirect — the page-level one handles dynamic locale param more cleanly.

---

## Estimated impact

- **Files modified**: 9 (1 next.config.ts + 1 mockAdminSelfService.json + 1 government-reports/page.tsx if labels-only path chosen + 1 useAdminSelfService.ts validator + 2 admin/self-service editor pages + 1 Sidebar.tsx annotation cleanup + ~2 test files)
- **Files deleted**: 12 (page.tsx files for the consolidated routes; the entire `src/app/[locale]/leave/` directory disappears; `ess/page.tsx` and `ess/profile/page.tsx` removed; `profile/page.tsx` removed)
- **Routes redirected**: 12 (in next.config.ts)
- **Tile entries fixed (href)**: 2 (Pay Statement, Leave Request) in `mockAdminSelfService.json`
- **Label fixes**: 17 total (13 in JSON seed + 4 in `government-reports/page.tsx` if not redirected)

---

## Risks & rollback

- **Risk**: `/profile` is referenced by `src/app/[locale]/profile/page.tsx:119` (`router.push('/profile?id=${id}')`) — this is *inside* the file being deleted, so safe.
- **Risk**: `/leave/request` query-param redirect (`?tab=request`) requires `/timeoff` to read the query. `timeoff/page.tsx:85` initializes `tab` via `useState<TabKey>('request')` ignoring URL — needs a 5-line `useSearchParams()` patch to honor the redirected query, otherwise users land on default tab silently. **Add to executor brief.**
- **Risk**: Removing `/ess/page.tsx` breaks any inbound link to `/th/ess` — covered by the redirect, but verify no test asserts on the EssHomePage greeting copy.
- **Rollback**: each group is one PR; revert just `next.config.ts` to restore all routes (deleted page.tsx files would need to come back via `git revert`, so keep deletions in a separate commit from redirects-add).

---

## Execution order

1. **Group A first** (additive — adds redirects without removing files yet) → deploy → verify redirects work in staging.
2. **Group B** (label/href fix in JSON) → independent, parallel-safe.
3. **Group A delete commit** (remove the 12 page.tsx files in a follow-up commit) → redirects already in place absorb traffic.
4. **Group C** (validator) → defensive only, no behavior change.
5. **Group D** (test updates) → must complete before merging Group A delete commit, else CI breaks.

This staging order means at no point is a route left without a handler.
