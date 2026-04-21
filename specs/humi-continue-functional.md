# Plan: Humi Continuation — Functional Wiring + Close #1 & #2 Deferrals

## Task Description

ต่อจาก sprint #1 (PARTIAL PASS) + sprint #2 (Phase A port เสร็จใน commit batch A/B/C). ตอนนี้ 11 Humi screens ของ reference bundle (`docs/design-ref/shelfly-bundle/project/`) ถูก port ลง `src/frontend/src/app/[locale]/` แล้ว แต่เป็น **static mocks** — ปุ่มไม่ click form ไม่ submit tab ไม่ switch state. Sprint นี้ = **ทำให้ทุก feature ของ 11 screens ใช้งานได้จริง** + ปิด deferrals ที่ค้างไว้.

งานแบ่งเป็น 4 phase สั่งรัน:

- **Phase A — Savepoint + Cleanup** commit งานที่ยัง in-flight เป็น savepoint + archive invented routes + เคลียร์ 3 deferrals จาก #1 (SSR locale middleware, globals.css Shelfly comment, legacy `#C8102E` ใน payslip)
- **Phase B — Shell Features** จบ #2 Phase B ที่ค้าง: B1 OrgChart zoom/pan re-inject · B2 ThemeProvider dark mode toggle · B3 legacy route decision (document-only) + AppShell nav active state + ⌘K command palette + locale switcher
- **Phase C — Functional Wiring** ทำ 11 screens ให้ interactive ด้วย Zustand slices + localStorage persist (mock backend ในเครื่อง ไม่แตะ API จริง) แบ่ง 3-4 agents parallel ตาม screen group
- **Phase D — Tests + Review + Validate** เขียน layout-integration + thai-heading + per-screen smoke + per-screen functional interaction + Phase B integration tests; MK V independent code review; MK IV honest pixel-zoom walkthrough

**Scope decision — uncommitted triage** (PO ruling):

1. `src/services/employee-center/prisma/schema.prisma` 788-line diff = **OUT OF SCOPE** sprint นี้ → Phase A1 ใช้ `git stash push src/services/employee-center/prisma/schema.prisma` ก่อนทำ savepoint commit; Ken ตัดสินเรื่อง schema แยก (ไม่ใช่ frontend revamp)
2. 13 modified frontend files + 14+ untracked frontend/spec files = **IN SCOPE** → Phase A1 รวมเป็น savepoint commit `chore(humi): savepoint #2 Phase A in-flight before #3` บน branch ใหม่ `humi/continue-functional-issue-3` ก่อนเริ่ม
3. `.ironteam/`, `specs/humi-*.md`, `docs/design-ref/`, `docs/shelfly-hr-design-research.md`, `docs/sprint-1-spec.md`, `src/frontend/src/__tests__/`, `src/frontend/src/components/humi/__tests__/`, `src/frontend/e2e/workflow-e2e-full.spec.ts`, `tests/e2e/sprint1-employee-profile.spec.ts`, `src/frontend/src/components/profile/tabs/ec-personal-info.tsx` = commit ใน savepoint เดียวกัน
4. `planning/logo-concepts/v2/...` + `recolor_local*.py` + `humi-recolor-v3.png` + `humi-recolor-v4-warm.png` + `recolor-v4-warm/` + `recolor-v3/` = **OUT OF SCOPE** (Rungrote direction ยังไม่ lock ตาม `project_humi_branding.md`) → Phase A1 ใช้ `git stash push planning/` ก่อน savepoint
5. `src/services/employee-center/src/employee/employee.service.spec.ts` = OUT OF SCOPE (backend test, Phase A1 stash กับ schema.prisma)

**Reference source of truth** (Rule C8): ทุก feature/label ที่ port ต้อง trace กลับ `docs/design-ref/shelfly-bundle/project/screens/<name>.jsx`. ห้าม invent feature ที่ reference ไม่มี. Functional wiring (Phase C) = ตีความ interaction ที่ reference บอกใบ้ไว้ (เช่น `<button>ส่งคำร้อง</button>` ใน reference → sprint นี้ต้องให้ click แล้วเพิ่ม row ใน history list + reset form)

## Objective

ส่งมอบ Humi HR frontend ที่:

1. **ทุก screen interactive** — 11 Humi screens ปุ่ม/form/tab/toggle ทำงานจริง state persist ด้วย Zustand + localStorage (mock layer ไม่แตะ API backend)
2. **Shell feature complete** — Sidebar active state ถูก pathname, Topbar search ⌘K เปิด command palette (search ข้ามทุก screen + route jump), Topbar theme toggle light/dark, Sidebar มี locale switcher th/en
3. **#2 Phase B ปิด** — OrgChart zoom/pan re-injected, ThemeProvider dark mode ทำงาน round-trip, legacy route decision ถูก document ใน code comment (ไม่ expand sidebar)
4. **#1 deferrals เคลียร์** — (a) SSR locale middleware (`src/frontend/middleware.ts` next-intl) first paint เป็น Thai (b) `globals.css` ลบ `Adapted จาก Shelfly bundle` comment (c) `src/frontend/src/app/[locale]/payslip/page.tsx` แทน 6 จุด `#C8102E` ด้วย token Humi (เก็บ visual ใกล้เคียง ไม่ rewrite)
5. **Invented pages archived** — `src/frontend/src/app/[locale]/employees/` + `/settings/` ย้าย `.archive-2026-04/` (Phase A15 จาก #2), imports ที่ reference path เก่าต้อง redirect ไป `/profile/me` และ `/integrations`
6. **Thai-primary** — 0 English user-facing string ใน 11 ported screens + shell + command palette (whitelist: PDF/CSV/API/SSO/URL/HR/KPI/OT/LOA/UUID/HTTP/JSON/JPEG/PNG/GIF/SVG/⌘K)
7. **NO RED** — 0 `#C8102E` ในไฟล์ที่แตะ (รวมถึง payslip หลัง migrate)
8. **Tailwind hygiene** — `globals.css` ไม่มี global `* { padding/margin: 0 }` reset (Rule 26b)
9. **Validation guards** — layout-integration + thai-heading + humi-reference-smoke + humi-functional (ใหม่) + humi-phase-b + Playwright walkthrough โดย MK IV + reference-match audit โดย MK V

## Tech Stack

- **Language**: TypeScript (strict)
- **Framework**: Next.js 16 (App Router, `[locale]` routing), React 19
- **Runtime**: Node.js, npm
- **Styling**: Tailwind v4 + Humi CSS variables (`@theme` block in `src/frontend/src/app/globals.css`) — NO global `*` reset (Rule 26b) + NO `#C8102E`
- **State**: Zustand slices (new: `timeoff-slice`, `requests-slice`, `goals-slice`, `benefits-slice`, `learning-slice`, `announcements-slice`, `integrations-slice`, `profile-slice`) with `persist` middleware to localStorage (`humi-state-v1` key)
- **i18n**: next-intl v4 + **NEW** `src/frontend/middleware.ts` (SSR locale fix — closes #1 deferral)
- **Icons**: lucide-react + `components/humi/icons/` (existing from sprint #2)
- **Fonts**: CPN family (already loaded)
- **Testing**: vitest + jsdom (unit + integration), Playwright 1.x (screenshot), chrome-browse MCP (walkthrough)
- **Auth**: existing MSAL flow — **ห้ามแตะ** (AC-11 from #2)

## Relevant Files

### Phase A — Savepoint + Cleanup

- **Savepoint commit** (Task a1-savepoint, `archive-builder`):
  - All 13 M files + 14 in-scope untracked
  - `git stash push src/services/employee-center/prisma/schema.prisma src/services/employee-center/src/employee/employee.service.spec.ts planning/` before commit
- **Archive invented** (Task a2-archive):
  - `src/frontend/src/app/[locale]/employees/` → `src/frontend/.archive-2026-04/employees/`
  - `src/frontend/src/app/[locale]/employees/[id]/` → `src/frontend/.archive-2026-04/employees-[id]/`
  - `src/frontend/src/app/[locale]/settings/` → `src/frontend/.archive-2026-04/settings/`
  - `src/frontend/.archive-2026-04/README.md` (NEW, document rationale + route rewrites)
- **SSR locale middleware** (Task a3-middleware):
  - `src/frontend/middleware.ts` (NEW) — next-intl `createMiddleware` with `locales: ['th','en']`, `defaultLocale: 'th'`, `localeDetection: false`
  - `src/frontend/next.config.ts` (verify no conflicting rewrites)
- **globals.css comment clean** (Task a4-css-clean):
  - `src/frontend/src/app/globals.css` line 9: ลบคอมเมนต์ `Adapted จาก Shelfly bundle` (replace with neutral `Humi design tokens` comment) — ไม่แตะ CSS body
- **Payslip red migrate** (Task a5-payslip-red):
  - `src/frontend/src/app/[locale]/payslip/page.tsx` — 6 จุด `#C8102E` → `var(--color-warning)` หรือ `var(--color-accent)` ตาม semantic usage (ไม่ rewrite layout, surgical ≤ 15 lines changed)

### Phase B — Shell Features

- **OrgChart zoom re-inject** (Task b1-orgchart-zoom):
  - `src/frontend/src/app/[locale]/org-chart/page.tsx` (EDIT, mount `<OrgChart>` ใน canvas slot ที่ว่างไว้)
  - `src/frontend/src/components/profile/org-chart.tsx` (verify compat; ≤ 30 lines diff allowed for prop adjustments)
  - `src/frontend/src/__tests__/humi-phase-b.test.tsx` (NEW, wheel event → transform changes)
- **ThemeProvider toggle** (Task b2-theme-toggle):
  - `src/frontend/src/components/humi/shell/Topbar.tsx` (ADD sun/moon IconButton beside bell)
  - `src/frontend/src/components/shared/theme-provider.tsx` (verify sets `html[data-theme="dark"]` — align with styles.css selector)
  - `src/frontend/src/app/[locale]/layout.tsx` (ensure ThemeProvider wraps AppShell)
- **Legacy route doc** (Task b3-legacy-decision):
  - `src/frontend/src/components/humi/shell/Sidebar.tsx` (ADD file-top comment explaining decision)
- **Nav active state** (Task b4-nav-active):
  - `src/frontend/src/components/humi/shell/Sidebar.tsx` (verify `usePathname()` → `.active` class on current route's nav-item; fix if drift)
- **⌘K command palette** (Task b5-command-palette):
  - `src/frontend/src/components/humi/shell/CommandPalette.tsx` (NEW)
  - `src/frontend/src/components/humi/shell/Topbar.tsx` (wire search pill + ⌘K hotkey → open palette)
  - `src/frontend/src/lib/humi-command-registry.ts` (NEW, static list ของ 11 routes + nav-item labels → palette entries)
- **Locale switcher** (Task b6-locale-switcher):
  - `src/frontend/src/components/humi/shell/Sidebar.tsx` (ADD th/en toggle ใน sidebar-foot ใต้ user chip)
  - `src/frontend/src/lib/humi-locale.ts` (NEW, helper: read/swap locale segment ใน pathname + router.push)

### Phase C — Functional Wiring (11 screens)

**New Zustand slices** (all use `persist` middleware, key `humi-state-v1`):

- `src/frontend/src/stores/humi-profile-slice.ts` (NEW) — 5-tab active state + edit draft + save-to-localStorage
- `src/frontend/src/stores/humi-timeoff-slice.ts` (NEW) — balance (static) + history list + submit handler (append)
- `src/frontend/src/stores/humi-benefits-slice.ts` (NEW) — enrolled benefits set + active tab
- `src/frontend/src/stores/humi-requests-slice.ts` (NEW) — filter state + request submission list + status transitions
- `src/frontend/src/stores/humi-goals-slice.ts` (NEW) — goals list + progress edits + create/edit drafts
- `src/frontend/src/stores/humi-learning-slice.ts` (NEW) — search query + active filter tab + enrolled set
- `src/frontend/src/stores/humi-orgchart-slice.ts` (NEW) — search query + selected node id
- `src/frontend/src/stores/humi-announcements-slice.ts` (NEW) — pinned set (optimistic) + active filter tab
- `src/frontend/src/stores/humi-integrations-slice.ts` (NEW) — enabled set + active category filter
- `src/frontend/src/stores/humi-ui-slice.ts` (NEW) — command palette open, theme, locale (can extend existing `ui-store.ts` instead — PO leaves decision to builder c7-builders)

**Screen edits** (all in `src/frontend/src/app/[locale]/<route>/page.tsx`):

- `home/page.tsx` (EDIT) — shortcut tiles → `router.push`, greeting dynamic `new Date().getHours()`
- `profile/me/page.tsx` (EDIT) — wire 5 tabs to slice active tab; edit form → draft → save button → commit to slice
- `timeoff/page.tsx` (EDIT) — request form: date pickers + reason + submit (validate → append history list via slice)
- `benefits-hub/page.tsx` (EDIT) — tab switcher bound to slice; modal detail on card click; enroll button → slice toggle
- `requests/page.tsx` (EDIT) — form template selector (radio → controlled) + submit (validate + append) + filter chips + status badge per row
- `goals/page.tsx` (EDIT) — create modal + edit modal + progress slider (0-100) + save button
- `learning-directory/page.tsx` (EDIT) — search input controlled; filter tabs bound to slice; enroll button → slice toggle + visual state
- `org-chart/page.tsx` (EDIT) — search controlled; node click → detail panel (existing layout) + `<OrgChart>` zoom (from b1)
- `announcements/page.tsx` (EDIT) — filter tabs bound; pin button → optimistic toggle via slice
- `integrations/page.tsx` (EDIT) — toggle switch bound to slice; category chips filter
- `login/page.tsx` — **ห้ามแตะ MSAL** — smoke test only, no code change

### Phase D — Tests

- `src/frontend/src/__tests__/layout-integration.test.tsx` (NEW) — sidebar visible ทุก route, wordmark "Hum", ⌘K kbd present, bell icon, user avatar chip
- `src/frontend/src/__tests__/thai-heading-regression.test.tsx` (NEW) — render 11 routes, h1/h2/h3 match `/[฀-๿]/`, whitelist ok
- `src/frontend/src/__tests__/humi-reference-smoke.test.tsx` (NEW) — per screen key sections present per reference bundle
- `src/frontend/src/__tests__/humi-functional.test.tsx` (NEW) — per screen **interaction tests**:
  - home: click shortcut → mock `router.push` called with correct path
  - profile: click tab 2/3/4/5 → active class flips; edit field → save → slice state updated
  - timeoff: submit form → history list length +1
  - benefits: tab click → active; enroll button → enrolled set contains id
  - requests: submit → submissions list +1; filter chip click → filtered rows
  - goals: create → list +1; slider change → progress updated
  - learning: search input → filter applied; enroll → slice flips
  - org-chart: search → node highlighted; node click → detail panel shown
  - announcements: pin click → pinned set toggled
  - integrations: switch click → enabled set toggled
  - shell: ⌘K hotkey → palette open; palette select → route jump; theme toggle → `data-theme` flips; locale toggle → pathname `/th/...` → `/en/...`
- `src/frontend/src/__tests__/humi-phase-b.test.tsx` (NEW) — OrgChart wheel → transform changes; theme toggle round-trip; middleware redirect root `/` → `/th/`

### Tests to preserve (verify still pass)

- `src/frontend/src/__tests__/employee-profile.test.tsx` (existing)
- `src/frontend/src/components/humi/__tests__/{Button,DataTable,Nav,Toggle}.test.tsx` (existing)
- All 149 tests from sprint #1

### i18n

- `src/frontend/src/messages/th.json` (EDIT, ADD keys: `commandPalette.*`, `shell.theme.*`, `shell.locale.*`, plus any missing functional labels like `timeoff.form.submitSuccess`, `goals.modal.*`)
- `src/frontend/src/messages/en.json` (mirror)

## Team Orchestration

JARVIS orchestrates — never touches code directly. Each task Assigned To one agent. Dependencies declared via "Depends On" for the pipeline DAG.

### Team Members

- **Cleanup Builder**
  - Name: cleanup-builder
  - Agent: MK III — Builder
  - Role: Phase A — savepoint commit, archive invented pages, SSR middleware, globals.css comment, payslip red migrate (low-risk mechanical work, no new UI)

- **Shell Integrator**
  - Name: shell-integrator
  - Agent: frontend-design — UI Engineer
  - Role: Phase B — OrgChart zoom re-inject + theme toggle + legacy doc + nav active + ⌘K command palette + locale switcher (6 shell tasks, ≤ 8 files each = split sub-tasks)

- **Functional Builder A**
  - Name: functional-builder-a
  - Agent: frontend-design — UI Engineer
  - Role: Phase C wiring — home + profile + announcements + login-smoke (4 screens batch, max 8 files)

- **Functional Builder B**
  - Name: functional-builder-b
  - Agent: frontend-design — UI Engineer
  - Role: Phase C wiring — timeoff + benefits-hub + requests + goals (4 form-heavy screens, max 8 files)

- **Functional Builder C**
  - Name: functional-builder-c
  - Agent: frontend-design — UI Engineer
  - Role: Phase C wiring — learning-directory + org-chart + integrations (3 screens + Zustand slice infrastructure, max 8 files)

- **Test Writer**
  - Name: test-writer
  - Agent: MK VI — Test Writer
  - Role: Phase D tests — layout-integration + thai-heading + humi-reference-smoke + humi-functional + humi-phase-b. Writes failing tests first, runs vitest, reports pass/fail (JARVIS runs tests — rule 21)

- **Code Reviewer**
  - Name: code-reviewer
  - Agent: MK V — Researcher (independent reviewer per #2 AC-15)
  - Role: Code Review — reference-match audit per ported screen, functional behavior audit (does submit actually persist?), Zustand slice hygiene, Rule 26b CSS reset sweep, NO-RED grep sweep, Thai whitelist sweep. Post reviewer table as issue #3 comment

- **Validator**
  - Name: validator
  - Agent: MK IV — Validator
  - Role: Validate Final — chrome-browse MCP walkthrough primary (Playwright CLI fallback per `feedback_e2e_prefer_chrome_over_playwright_cli.md`), screenshot 11 routes at 1440x900, Read each PNG + pixel-zoom (Rule 62), per-AC PASS/FAIL with terminal evidence (Rule C2), computed-style check (Rule 26c), no rubber-stamp

## Step by Step Tasks

### 1. Savepoint commit on new branch

- **Task ID**: a1-savepoint
- **Depends On**: none
- **Assigned To**: cleanup-builder
- **Parallel**: false
- **Files**:
  - New branch `humi/continue-functional-issue-3` from `master`
  - 13 modified + 14 in-scope untracked (see Scope decision § 2-3 in Task Description)
- **Actions**:
  - `git checkout -b humi/continue-functional-issue-3`
  - `git stash push -m "out-of-scope sprint #3" src/services/employee-center/prisma/schema.prisma src/services/employee-center/src/employee/employee.service.spec.ts planning/`
  - `git add` all in-scope files (exclude stashed paths)
  - Commit: `chore(humi): savepoint sprint #2 Phase A in-flight work before sprint #3 continuation`
  - Push branch: `git push -u origin humi/continue-functional-issue-3`
  - Verify: `git status` clean except stash
  - Max 0 lines of new code (pure commit)

### 2. Archive invented screens

- **Task ID**: a2-archive
- **Depends On**: a1-savepoint
- **Assigned To**: cleanup-builder
- **Parallel**: false
- **Files**:
  - `src/frontend/src/app/[locale]/employees/` → `src/frontend/.archive-2026-04/employees/`
  - `src/frontend/src/app/[locale]/employees/[id]/` → `src/frontend/.archive-2026-04/employees-[id]/`
  - `src/frontend/src/app/[locale]/settings/` → `src/frontend/.archive-2026-04/settings/`
  - `src/frontend/.archive-2026-04/README.md` (NEW)
- **Actions**:
  - `git mv` 3 folders to archive path
  - Write `README.md` documenting: reference bundle doesn't include these screens; `/employees` → `/profile/me`, `/employees/[id]` → `/profile/me`, `/settings` → `/integrations`
  - Grep `src/frontend/src` for imports/links referencing `/employees` or `/settings` path → redirect to new routes
  - Run `npm run build --prefix src/frontend` → exit 0 required
  - Max 8 files touched outside archive folder (link updates only)

### 3. SSR locale middleware

- **Task ID**: a3-middleware
- **Depends On**: a1-savepoint
- **Assigned To**: cleanup-builder
- **Parallel**: true
- **Files**:
  - `src/frontend/middleware.ts` (NEW)
  - Optional `src/frontend/next.config.ts` (verify matcher + rewrites compat)
- **Actions**:
  - Use `createMiddleware` from `next-intl/middleware` with `locales: ['th','en']`, `defaultLocale: 'th'`, `localeDetection: false`
  - `config.matcher: ['/((?!api|_next|.*\\..*).*)']`
  - Verify root `/` now redirects to `/th/` on first request (no client hydration flip)
  - Smoke: `curl -I localhost:3000/` returns 307 → `/th/`; `curl localhost:3000/th/home` returns 200 + Thai h1
  - Max 30 lines across 2 files

### 4. globals.css comment cleanup

- **Task ID**: a4-css-clean
- **Depends On**: a1-savepoint
- **Assigned To**: cleanup-builder
- **Parallel**: true
- **Files**: `src/frontend/src/app/globals.css`
- **Actions**:
  - Replace line 9 comment `Adapted จาก Shelfly bundle (cream / teal / ink) + NO-RED scrub` with neutral text: `Humi design tokens (cream + teal + ink) — NO RED constraint`
  - ไม่แตะ CSS body. Surgical change only.
  - Verify no other `Shelfly` occurrence in `globals.css`: `grep -n Shelfly src/frontend/src/app/globals.css` = empty
  - Max 1 line changed

### 5. Payslip red migrate

- **Task ID**: a5-payslip-red
- **Depends On**: a1-savepoint
- **Assigned To**: cleanup-builder
- **Parallel**: true
- **Files**: `src/frontend/src/app/[locale]/payslip/page.tsx`
- **Actions**:
  - Replace 6 occurrences of `#C8102E` with `var(--color-warning)` (error/alert) or `var(--color-accent)` (brand) per semantic context (see each usage case-by-case — reviewer verifies choice)
  - ไม่ rewrite layout; surgical replacement only
  - Verify: `grep -n "#C8102E" src/frontend/src/app/[locale]/payslip/page.tsx` returns empty
  - Verify: `grep -n "#C8102E" src/frontend/src` returns only allowed matches (test fixtures ok, non-user-facing components ok)
  - Max 12 lines changed

### 6. OrgChart zoom/pan re-inject

- **Task ID**: b1-orgchart-zoom
- **Depends On**: a2-archive
- **Assigned To**: shell-integrator
- **Parallel**: false
- **Files**:
  - `src/frontend/src/app/[locale]/org-chart/page.tsx` (EDIT — replace inline canvas with `<OrgChart>` component + keep reference toolbar)
  - `src/frontend/src/components/profile/org-chart.tsx` (verify compat, ≤ 30 lines diff for prop/tone adjustments; do NOT rewrite)
- **Actions**:
  - Mount `<OrgChart data={...} onNodeClick={...} />` inside the canvas slot in page.tsx (the big node-tree area)
  - Keep reference toolbar (search + zoom +/- + reset) wired to OrgChart's imperative zoom methods (expose via ref if needed)
  - Restyle OrgChart node visuals using Humi tokens (`bg-accent-soft`, `bg-[color:var(--color-sage-soft)]`) if minor; otherwise skin only surrounding chrome
  - Smoke test: wheel event on chart → inline `transform: scale()` style changes; reset button → transform back to `scale(1)`
  - Max 8 files

### 7. Theme toggle

- **Task ID**: b2-theme-toggle
- **Depends On**: a4-css-clean
- **Assigned To**: shell-integrator
- **Parallel**: true
- **Files**:
  - `src/frontend/src/components/humi/shell/Topbar.tsx` (ADD IconButton sun/moon beside bell)
  - `src/frontend/src/components/shared/theme-provider.tsx` (verify `html[data-theme="dark"]`)
  - `src/frontend/src/app/[locale]/layout.tsx` (verify ThemeProvider wraps AppShell)
  - `src/frontend/src/messages/{th,en}.json` (add `shell.theme.light/dark/aria` keys)
- **Actions**:
  - Wire IconButton `aria-label="สลับโหมดมืด/สว่าง"` to ThemeProvider toggle
  - Verify round-trip light → dark → light, no flicker, all Humi tokens respond
  - Max 5 files

### 8. Legacy route documentation

- **Task ID**: b3-legacy-decision
- **Depends On**: a2-archive
- **Assigned To**: shell-integrator
- **Parallel**: true
- **Files**: `src/frontend/src/components/humi/shell/Sidebar.tsx`
- **Actions**:
  - Add file-top comment block: "PO direction (#3): Humi sidebar stays clean to 10 reference items. Legacy routes (payroll, performance, permissions, onboarding, workflows, and 12 others) remain URL-accessible (`/th/<route>`) but are NOT surfaced in sidebar. Reason: preserves Humi information architecture per design-ref bundle. If expansion needed, add `'บริษัท' > { id: 'legacy', label: 'เครื่องมือเพิ่มเติม' }` pointing to `/legacy` hub page (separate sprint)."
  - No nav change. Documentation-only task.
  - Max 1 file, ≤ 15 lines added

### 9. Nav active state verification

- **Task ID**: b4-nav-active
- **Depends On**: a2-archive
- **Assigned To**: shell-integrator
- **Parallel**: true
- **Files**: `src/frontend/src/components/humi/shell/Sidebar.tsx`
- **Actions**:
  - Verify `usePathname()` → `.nav-item.active` class flips on route change
  - Fix drift if exists (e.g., strip locale prefix `/th/` for comparison, handle `/profile/me` matching `/profile/*`)
  - Smoke: navigate `/th/home` → home nav-item has `.active`; navigate `/th/timeoff` → timeoff has `.active`, home doesn't
  - Max 1 file, ≤ 20 lines diff

### 10. ⌘K command palette

- **Task ID**: b5-command-palette
- **Depends On**: b4-nav-active
- **Assigned To**: shell-integrator
- **Parallel**: false
- **Files**:
  - `src/frontend/src/components/humi/shell/CommandPalette.tsx` (NEW)
  - `src/frontend/src/components/humi/shell/Topbar.tsx` (wire search pill + ⌘K hotkey)
  - `src/frontend/src/lib/humi-command-registry.ts` (NEW, static list of 11 routes + nav labels)
  - `src/frontend/src/messages/{th,en}.json` (commandPalette keys)
- **Actions**:
  - CommandPalette = modal overlay, search input at top, filtered command list below (keyboard arrow up/down + enter), esc to close
  - Hotkey: `⌘K` on macOS / `Ctrl+K` on Windows (detect via `navigator.platform`)
  - Registry: `[{ id, label: 'หน้าหลัก', route: '/home', icon }]` × 11 (exclude login)
  - Select → `router.push(localePrefix + route)`
  - No new dependency — build from primitives + Tailwind
  - Thai-primary labels (`ค้นหา…`, `ไม่มีผลลัพธ์`)
  - Max 8 files

### 11. Locale switcher

- **Task ID**: b6-locale-switcher
- **Depends On**: a3-middleware, b4-nav-active
- **Assigned To**: shell-integrator
- **Parallel**: false
- **Files**:
  - `src/frontend/src/components/humi/shell/Sidebar.tsx` (ADD th/en toggle in sidebar-foot, below user chip)
  - `src/frontend/src/lib/humi-locale.ts` (NEW, helper functions)
  - `src/frontend/src/messages/{th,en}.json` (`shell.locale.*` keys)
- **Actions**:
  - Render 2 button pills: TH | EN (active one highlighted)
  - Click → swap locale segment in pathname (e.g., `/th/goals` ↔ `/en/goals`) + `router.push`
  - Smoke: click EN → URL changes + page re-renders with en.json messages
  - Max 6 files

### 12. Profile functional wiring

- **Task ID**: c1-profile-functional
- **Depends On**: b2-theme-toggle, b5-command-palette
- **Assigned To**: functional-builder-a
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/profile/me/page.tsx` (EDIT)
  - `src/frontend/src/stores/humi-profile-slice.ts` (NEW)
  - `src/frontend/src/messages/{th,en}.json` (profile functional keys)
- **Actions**:
  - Zustand slice: `{ activeTab: 'personal'|'employment'|'compensation'|'documents'|'activity', draft, save() }`
  - Persist to localStorage key `humi-profile-v1`
  - 5 tabs click → slice.activeTab flips → panel content swaps (use `data-tab-id` map)
  - Edit button → enter draft mode → form fields controlled from `draft` → save button → commit draft to `profile` field → persist + toast "บันทึกเรียบร้อย"
  - No API call; pure local persistence
  - Max 8 files

### 13. Home functional wiring

- **Task ID**: c2-home-functional
- **Depends On**: b2-theme-toggle, b5-command-palette
- **Assigned To**: functional-builder-a
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/home/page.tsx` (EDIT)
  - `src/frontend/src/messages/{th,en}.json` (`home.greeting.morning/afternoon/evening`)
- **Actions**:
  - Shortcut tiles: wrap in `<Link>` or `onClick={() => router.push(...)}` to target routes
  - Greeting: `getHours() < 12` → "สวัสดีตอนเช้า", < 18 → "สวัสดีตอนบ่าย", else → "สวัสดีตอนเย็น"
  - User name from `useAuthStore().username` (Thai preferred if available)
  - No slice needed
  - Max 4 files

### 14. Announcements functional wiring

- **Task ID**: c3-announcements-functional
- **Depends On**: b2-theme-toggle, b5-command-palette
- **Assigned To**: functional-builder-a
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/announcements/page.tsx` (EDIT)
  - `src/frontend/src/stores/humi-announcements-slice.ts` (NEW)
  - `src/frontend/src/messages/{th,en}.json` (announcements functional keys)
- **Actions**:
  - Slice: `{ pinned: Set<id>, activeFilter: 'all'|'pinned'|'news'|'policy', togglePin(id), setFilter() }`
  - Filter tabs bound to `activeFilter`
  - Pin icon click → optimistic toggle in `pinned` set, persist to localStorage
  - Pinned items sort to top in feed
  - Max 5 files

### 15. Login smoke test

- **Task ID**: c4-login-smoke
- **Depends On**: b2-theme-toggle
- **Assigned To**: functional-builder-a
- **Parallel**: true
- **Files**: `src/frontend/src/app/[locale]/login/page.tsx` (READ-ONLY verification; no code change unless MSAL broken)
- **Actions**:
  - Manual smoke: dev server login → MSAL callback → redirect to `/th/home`
  - If broken → escalate to Ken, do NOT fix without direction (out of scope auth)
  - If passing → report "AC-11 MSAL flow preserved" ✓
  - Max 0 files changed (read-only)

### 16. Timeoff functional wiring

- **Task ID**: c5-timeoff-functional
- **Depends On**: b2-theme-toggle, b5-command-palette
- **Assigned To**: functional-builder-b
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/timeoff/page.tsx` (EDIT)
  - `src/frontend/src/stores/humi-timeoff-slice.ts` (NEW)
  - `src/frontend/src/messages/{th,en}.json` (timeoff form keys)
- **Actions**:
  - Slice: `{ history: [...initial], submit(request) }`
  - Request form: leave type + start/end date + reason + attachment placeholder
  - Validation: start < end, reason length ≥ 5, required fields
  - Submit → append to history with status `'pending'` + timestamp + toast; form resets
  - Balance display = static mock data (read from existing `humi-mock-data.ts`)
  - Max 5 files

### 17. Benefits-hub functional wiring

- **Task ID**: c6-benefits-functional
- **Depends On**: b2-theme-toggle, b5-command-palette
- **Assigned To**: functional-builder-b
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/benefits-hub/page.tsx` (EDIT)
  - `src/frontend/src/stores/humi-benefits-slice.ts` (NEW)
  - `src/frontend/src/components/humi/Modal.tsx` (NEW, small modal primitive if not reusing existing)
  - `src/frontend/src/messages/{th,en}.json` (benefits keys)
- **Actions**:
  - Slice: `{ enrolled: Set<id>, activeTab: string, toggleEnroll(id), setTab() }`
  - Tab switcher bound to slice
  - Benefit card click → Modal detail
  - Enroll button in modal → `toggleEnroll(id)` → button text flips "สมัคร" ↔ "ยกเลิกสมัคร" + badge "เข้าร่วมแล้ว" ปรากฏบน card
  - Max 6 files

### 18. Requests functional wiring

- **Task ID**: c7-requests-functional
- **Depends On**: b2-theme-toggle, b5-command-palette
- **Assigned To**: functional-builder-b
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/requests/page.tsx` (EDIT)
  - `src/frontend/src/stores/humi-requests-slice.ts` (NEW)
  - `src/frontend/src/messages/{th,en}.json` (requests keys)
- **Actions**:
  - Slice: `{ submissions: [...], filter: 'all'|'pending'|'approved'|'rejected', submit(), setFilter() }`
  - Form template selector (radio group) swaps form fields
  - Submit → validate → append to submissions with status `'pending'` + timestamp
  - Filter chips bound to `filter`, status badge colors per status
  - Max 6 files

### 19. Goals functional wiring

- **Task ID**: c8-goals-functional
- **Depends On**: b2-theme-toggle, b5-command-palette
- **Assigned To**: functional-builder-b
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/goals/page.tsx` (EDIT)
  - `src/frontend/src/stores/humi-goals-slice.ts` (NEW)
  - `src/frontend/src/messages/{th,en}.json` (goals keys)
- **Actions**:
  - Slice: `{ goals: [...], create(g), update(id, patch), remove(id) }`
  - Create modal: title + target + due date + progress 0 → save → append
  - Edit modal: same fields + slider 0-100 for progress
  - Progress ring reflects `progress` value (update on slider change)
  - Max 6 files

### 20. Learning-directory functional wiring

- **Task ID**: c9-learning-functional
- **Depends On**: b2-theme-toggle, b5-command-palette
- **Assigned To**: functional-builder-c
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/learning-directory/page.tsx` (EDIT)
  - `src/frontend/src/stores/humi-learning-slice.ts` (NEW)
  - `src/frontend/src/messages/{th,en}.json` (learning keys)
- **Actions**:
  - Slice: `{ query: string, filter: 'all'|'enrolled'|'new'|..., enrolled: Set<id>, setQuery(), setFilter(), toggleEnroll(id) }`
  - Search input controlled from slice, filters course list by title/tag case-insensitive
  - Filter tabs bound
  - Enroll button flips visual state + adds to `enrolled`
  - Max 5 files

### 21. Org-chart functional wiring

- **Task ID**: c10-orgchart-functional
- **Depends On**: b1-orgchart-zoom
- **Assigned To**: functional-builder-c
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/org-chart/page.tsx` (EDIT)
  - `src/frontend/src/stores/humi-orgchart-slice.ts` (NEW)
  - `src/frontend/src/messages/{th,en}.json` (orgChart keys)
- **Actions**:
  - Slice: `{ query: string, selectedId: string|null, setQuery(), select(id) }`
  - Search input filters node list + highlights match
  - Node click (on OrgChart canvas) → `select(id)` → detail panel shows on right (name, role, team, email, phone from mock)
  - Zoom controls from b1 wired (no change here)
  - Max 5 files

### 22. Integrations functional wiring

- **Task ID**: c11-integrations-functional
- **Depends On**: b2-theme-toggle, b5-command-palette
- **Assigned To**: functional-builder-c
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/integrations/page.tsx` (EDIT)
  - `src/frontend/src/stores/humi-integrations-slice.ts` (NEW)
  - `src/frontend/src/messages/{th,en}.json` (integrations keys)
- **Actions**:
  - Slice: `{ enabled: Set<id>, category: 'all'|'hr'|'finance'|'communications'|..., toggle(id), setCategory() }`
  - Toggle switch (humi/Toggle primitive) bound to `enabled.has(id)` + click → `toggle(id)`
  - Category chips filter integration grid
  - Status badge ("เชื่อมต่อแล้ว" / "ยังไม่เชื่อมต่อ") reacts to state
  - Max 5 files

### 23. Write Tests

- **Task ID**: write-tests
- **Depends On**: c1-profile-functional, c2-home-functional, c3-announcements-functional, c4-login-smoke, c5-timeoff-functional, c6-benefits-functional, c7-requests-functional, c8-goals-functional, c9-learning-functional, c10-orgchart-functional, c11-integrations-functional, b3-legacy-decision, b6-locale-switcher
- **Assigned To**: test-writer
- **Parallel**: false
- **Files**:
  - `src/frontend/src/__tests__/layout-integration.test.tsx` (NEW)
  - `src/frontend/src/__tests__/thai-heading-regression.test.tsx` (NEW)
  - `src/frontend/src/__tests__/humi-reference-smoke.test.tsx` (NEW)
  - `src/frontend/src/__tests__/humi-functional.test.tsx` (NEW)
  - `src/frontend/src/__tests__/humi-phase-b.test.tsx` (NEW)
- **Actions**:
  - layout-integration: mount LocaleLayout with 11 route fixtures → assert `<aside class*="sidebar">` present, wordmark "Hum", ⌘K kbd, bell, avatar. Traceability: `// AC-1, AC-2`
  - thai-heading: render 11 routes → query h1/h2/h3 → assert `/[฀-๿]/` match; whitelist tokens (PDF, API, SSO, ⌘K, ฯลฯ) allowed. Traceability: `// AC-7`
  - humi-reference-smoke: per screen assert reference sections (home → greeting + shortcut grid, timeoff → balance KPIs + form, goals → goal cards + slider, etc.). Traceability: `// AC-4`
  - humi-functional: per screen interaction — simulate click/type/submit → assert slice state change OR DOM update. 11 screens × ≥ 1 interaction each = ≥ 15 test cases. Plus shell: ⌘K open palette, theme toggle, locale swap. Traceability: `// AC-3, AC-5, AC-6`
  - humi-phase-b: OrgChart wheel event → transform style changes; reset → transform reset; theme round-trip; middleware redirect `/` → `/th/` (mocked). Traceability: `// AC-8, AC-9, AC-14`
  - JARVIS runs `npm test --prefix src/frontend -- --run` — total ≥ 180 (149 existing + ≥ 31 new), 0 failures
  - Attach actual terminal output to report (Rule C2)

### 24. Code Review

- **Task ID**: code-review
- **Depends On**: write-tests
- **Assigned To**: code-reviewer
- **Parallel**: false
- **Actions**:
  - **Reference-match audit**: per 11 ported screen, `diff -u docs/design-ref/shelfly-bundle/project/screens/<name>.jsx src/frontend/src/app/[locale]/<route>/page.tsx`. Build table: reference section | ported + functional behavior | match-status (exact/adapted/missing/extended). `extended` ok if adds interactivity hinted in reference (e.g., button → actually submits); `missing` BLOCKS
  - **Functional behavior audit**: per screen, trace user flow against slice state: click → slice action → state update → UI reflect. Flag any "button is no-op" → BLOCK
  - **Slice hygiene**: each Zustand slice uses `persist` middleware, localStorage key namespaced `humi-*-v1`, no cross-slice cyclic imports
  - **Rule 26b sweep**: `grep -E '^\* ?\{ ?(padding|margin)' src/frontend/src/app/globals.css` returns empty
  - **NO-RED sweep**: `grep -rn '#C8102E' src/frontend/src/{app,components}` returns only test fixtures (Button.test.tsx) + `components/learning/learning-page.tsx` + `components/time/time-page.tsx` (legacy, out of scope); `src/frontend/src/app/[locale]/` returns empty
  - **Thai whitelist sweep**: `grep -E '>[A-Za-z]{4,}<' src/frontend/src/app/[locale]/{home,profile,timeoff,benefits-hub,requests,goals,learning-directory,org-chart,announcements,integrations,login}/**/*.tsx` — manually verify each hit is whitelist token
  - **Archive audit**: `.archive-2026-04/README.md` present; `grep -rn "@/app/\[locale\]/employees\|@/app/\[locale\]/settings" src/frontend/src` empty
  - **Dual-role check**: confirm test-writer ≠ code-reviewer ≠ validator (all 3 different agents)
  - **Payslip audit**: `grep -n '#C8102E' src/frontend/src/app/[locale]/payslip/page.tsx` empty; visual diff ≤ 20 lines (surgical)
  - Post full Markdown table as comment on issue #3 with verdict per AC; BLOCK merge if any AC fails

### 25. Validate Final

- **Task ID**: validate-all
- **Depends On**: code-review
- **Assigned To**: validator
- **Parallel**: false
- **Actions**:
  - Start dev server: `npm run dev --prefix src/frontend` (port 3000)
  - **Primary walkthrough via chrome-browse MCP** (per rule `feedback_e2e_prefer_chrome_over_playwright_cli.md`): navigate each of 11 routes + login, perform per-screen key interaction (click tab, submit form, toggle switch), screenshot at each state
  - **Fallback**: if chrome-browse MCP unavailable → Playwright CLI `npx playwright screenshot` (per `feedback_playwright_cli_over_mcp.md`)
  - Screenshots at 1440x900 saved to `test-artifacts/2026-04-21-continue-functional/<route>-<state>.png` (e.g., `timeoff-before-submit.png`, `timeoff-after-submit.png`)
  - **Read each PNG via Read tool** (Rule 62 pixel-zoom) — not just list filenames. Inspect: Thai headings, sidebar visible, nav active correct, theme toggle reflects `data-theme`, no red, CPN font, spacing matches reference
  - For each AC-1..AC-16 emit PASS/FAIL with terminal output evidence + screenshot reference. No rubber-stamp — if h1 English in any PNG → AC-7 FAIL
  - Run `npm run build --prefix src/frontend` — exit 0 required; paste actual terminal output (Rule C2)
  - Run `npm test --prefix src/frontend -- --run` — 0 failures; paste actual test summary (≥ 180 tests)
  - `getComputedStyle` check (Rule 26c): pick `.nav-item.active`, `.pill`, `.topbar` on 3 routes via `page.evaluate` → assert padding + margin + color non-empty
  - Middleware smoke: `curl -I localhost:3000/` returns 307 → `/th/`; `curl localhost:3000/th/home | grep -o '<h1[^>]*>[^<]*' | head -1` shows Thai chars
  - If any FAIL → assign back to appropriate builder via issue comment with reproduction steps; max 2 retries then escalate to Ken

## Pipeline

```
a1-savepoint
    │
    ├── a2-archive ──────┐
    ├── a3-middleware    │
    ├── a4-css-clean     │
    └── a5-payslip-red   │
                         │
          ┌──────────────┴─ (all Phase A done) ─┐
          ↓                                      ↓
    b1-orgchart-zoom                b2-theme-toggle  b3-legacy-decision  b4-nav-active
          │                               │              │                    │
          │                               │              │                    ↓
          │                               │              │             b5-command-palette
          │                               │              │                    │
          │                               │              │                    ↓
          │                               └──────────────┴──────────── b6-locale-switcher
          │                                                                   │
          └──────────────── (Phase B fan out) ─────────────┬──────────────────┘
                                                            ↓
                    ┌────────────── Phase C fan-out — 3 builders parallel ─────────────┐
                    ↓                             ↓                           ↓
          functional-builder-a          functional-builder-b         functional-builder-c
          c1 profile (serial)           c5 timeoff                    c9  learning
          c2 home                       c6 benefits-hub               c10 org-chart
          c3 announcements              c7 requests                   c11 integrations
          c4 login-smoke                c8 goals
                    └─────────────────────────┬──────────────────────────────┘
                                              ↓
                                        write-tests
                                              ↓
                                         Code Review
                                              ↓
                                       Validate Final
                                              ↓
                                 FAIL? → fix → re-review → re-validate
                                 (max 2 retries → escalate to Ken)
```

**Parallel zones**:

- Zone A (after a1): a2, a3, a4, a5 concurrent (cleanup-builder sequential within agent, but different files = safe)
- Zone B1 (after a2-archive + a4-css-clean): b1, b2, b3, b4 concurrent (shell-integrator, different files except b2/b4 both touch Sidebar — sequenced)
- Zone B2 (after b4): b5 → b6 (need nav active logic from b4)
- Zone C (after Phase B): c1..c11 split across 3 builders, each builder's 3-4 tasks serial (same agent thread, avoid race), 3 builders parallel across branches
- Sequential tail: write-tests → Code Review → Validate Final

**Retry policy**: 2 retries max after Validate Final FAIL. If builder can't fix within retries → escalate to Ken with reproduction + log.

## Acceptance Criteria

- **AC-1**: AppShell sidebar 3 groups + 10 items + correct badges (timeoff:2, benefits:1, requests:1), nav active state flips on route change — verified by layout-integration test + chrome-browse walkthrough
- **AC-2**: Topbar renders eyebrow + search pill (with ⌘K kbd) + bell + **theme toggle** + **command palette opens on ⌘K** (per route) — verified by test + walkthrough
- **AC-3**: All 11 Humi routes render 200 with Thai h1 on **first paint** (SSR via middleware, not client hydration flip) — verified by `curl -I /` returns 307 → `/th/` + `curl /th/home` h1 Thai
- **AC-4**: Each ported screen matches reference layout + adds functional interactivity hinted in reference (button → submit/click actually does something). Reference-match table by MK V shows 0 `missing` rows
- **AC-5**: 11 screens **interactive**: profile (5 tabs switch + edit + save), timeoff (form submit → history+1), benefits (tab + modal + enroll toggle), requests (template select + submit + filter), goals (create + edit + slider), learning (search + filter + enroll), org-chart (search + node click + zoom), announcements (filter + pin), integrations (toggle + category filter), home (shortcut → route), login (MSAL preserved) — verified by humi-functional test + walkthrough state screenshots
- **AC-6**: Shell features: ⌘K opens command palette → select → route jump; theme toggle light ↔ dark with no flicker; locale switcher th ↔ en swaps URL + messages — verified by humi-functional test + walkthrough
- **AC-7**: **0 English user-facing strings** in 11 ported screens + shell + command palette. Whitelist: PDF/CSV/API/SSO/URL/HR/KPI/OT/LOA/UUID/HTTP/JSON/JPEG/PNG/GIF/SVG/⌘K. AC fails if ANY h1/h2/h3/button/label outside whitelist is English
- **AC-8**: **0 `#C8102E` red** in `src/frontend/src/app/[locale]/` after payslip migration (`grep` returns empty). Test fixture Button.test.tsx allowed (explicit style test); legacy `components/{learning,time}/*-page.tsx` out of scope for this sprint
- **AC-9**: OrgChart zoom/pan re-injected + reset works — verified by humi-phase-b test (wheel → transform change) + walkthrough
- **AC-10**: ThemeProvider dark mode round-trip light → dark → light no flicker; `html[data-theme]` flips; all Humi tokens respond
- **AC-11**: MSAL login flow NOT broken — manual dev-server login → callback → `/th/home`; Login page visual may change (restyle already done) but auth logic untouched. Validator confirms explicitly in final report
- **AC-12**: Invented pages archived — `src/frontend/.archive-2026-04/{employees,employees-[id],settings}/` present with README; `grep -rn "@/app/\[locale\]/employees\|@/app/\[locale\]/settings" src/frontend/src` empty
- **AC-13**: SSR locale middleware works — `curl -I localhost:3000/` returns 307 → `/th/`; first-paint h1 is Thai (no client flip)
- **AC-14**: `globals.css` no longer contains "Shelfly" string; `grep -E '^\* ?\{ ?(padding|margin)' src/frontend/src/app/globals.css` returns empty (Rule 26b)
- **AC-15**: All tests pass — existing 149 + new layout-integration + thai-heading + humi-reference-smoke + humi-functional + humi-phase-b tests. Total ≥ 180. Terminal output attached to validator report (Rule C2). `npm run build --prefix src/frontend` exit 0.
- **AC-16**: **MK V independent Code Review** signs off with reference-match + functional-behavior audit posted to issue #3 — not MK IV dual-role. **MK IV Validator** Reads each of 11+ screenshot PNGs and emits honest PASS/FAIL per AC. If English heading visible in any PNG → AC-7 explicitly FAIL — no silent pass.

## Validation Commands

- `cd src/frontend && npm run build` — frontend build (exit 0 required)
- `cd src/frontend && npm test -- --run` — unit + integration tests (0 failures, total ≥ 180)
- `cd src/frontend && npm test -- --run src/__tests__/layout-integration.test.tsx`
- `cd src/frontend && npm test -- --run src/__tests__/thai-heading-regression.test.tsx`
- `cd src/frontend && npm test -- --run src/__tests__/humi-reference-smoke.test.tsx`
- `cd src/frontend && npm test -- --run src/__tests__/humi-functional.test.tsx`
- `cd src/frontend && npm test -- --run src/__tests__/humi-phase-b.test.tsx`
- `cd src/frontend && npm run dev` (port 3000) + chrome-browse MCP walkthrough 11 routes at 1440x900 (Playwright CLI fallback)
- Screenshots saved `test-artifacts/2026-04-21-continue-functional/<route>-<state>.png`; Read each via Read tool (Rule 62)
- Middleware smoke: `curl -I localhost:3000/` returns 307 → `/th/`; `curl localhost:3000/th/home` returns 200 + Thai h1 on first line of body
- Reference-match diff: per screen `diff -u docs/design-ref/shelfly-bundle/project/screens/<name>.jsx src/frontend/src/app/[locale]/<route>/page.tsx | head -200` — MK V reviewer attaches summary to issue #3
- NO-RED sweep: `grep -rn '#C8102E' src/frontend/src/app/\[locale\]/` must return empty
- Rule 26b sweep: `grep -E '^\* ?\{ ?(padding|margin)' src/frontend/src/app/globals.css` must return empty
- Shelfly string sweep: `grep -n "Shelfly" src/frontend/src/app/globals.css` must return empty
- Archive imports: `grep -rn "@/app/\[locale\]/employees\|@/app/\[locale\]/settings" src/frontend/src` must return empty
- Computed style evidence: Playwright `page.evaluate(el => getComputedStyle(el).padding)` for `.nav-item.active`, `.pill`, `.topbar` on 3 routes — non-empty values (Rule 26c)
- Functional smoke via chrome-browse: per screen perform 1 key interaction (submit form / toggle switch / tab click), screenshot before + after, verify state delta visible in DOM

## Out of Scope

- Backend / API changes (MSAL, employee-center, cashflow ฯลฯ)
- `src/services/employee-center/prisma/schema.prisma` 788-line diff (Ken to triage separately — stashed before savepoint)
- The 16 legacy routes beyond "URL-accessible, not in sidebar" decision (payroll, performance, permissions, onboarding, workflows, hrbp-reports, government-reports, idp, locations, manager-dashboard, overtime, quick-approve, recruitment, resignation, screening, spd-management, succession, talent-management, training-records, hospital-referral, benefits [legacy vs benefits-hub], leave [legacy vs timeoff], learning [legacy vs learning-directory], time — separate sprint)
- Logo generation / brand asset work (`planning/logo-concepts/v2/...` — awaiting Rungrote direction lock per `project_humi_branding.md` — stashed)
- `src/frontend/src/components/{learning,time}/*-page.tsx` legacy `#C8102E` (not touched by this sprint's screens — separate sprint)
- CI/CD changes
- Real backend persistence for functional wiring — this sprint uses Zustand + localStorage only; connecting to actual APIs = separate sprint
- Dark theme feature-complete polish beyond "toggle works" — per-component dark contrast tuning = separate sprint
- Locale content completeness for EN messages (EN mirrors TH structure; polished EN copy = separate sprint)
- Mobile responsive breakpoints beyond existing sprint #2 layout
- Accessibility audit beyond existing ARIA (WCAG pass is separate sprint)
- New features / routes not in reference bundle — this is a functional-wiring + cleanup sprint
