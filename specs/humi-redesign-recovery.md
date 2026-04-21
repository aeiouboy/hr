# Plan: Humi Redesign Recovery — Phase A Port Reference + Phase B Preserve Features

## Task Description

Sprint #1 (`aeiouboy/hr` issue #1) ลง PARTIAL PASS เพราะ spec เดิมสั่ง "overwrite" 3 หน้า แต่ **ไม่เคย port** reference bundle ที่ Ken sync ไว้ที่ `docs/design-ref/shelfly-bundle/project/` (shell.jsx + styles.css 581 lines + icons.jsx + 11 screens). สิ่งที่เกิดขึ้น:

- AppShell ปัจจุบันใน `src/frontend/src/components/humi/AppShell.tsx` เป็นของ **JARVIS invent เอง** ไม่ได้ port จาก `shell.jsx`
- มีแค่ 5 หน้า (home, employees list/detail, org-chart, settings) ซึ่ง 3 ใน 5 (**employees list, employees/[id], settings**) เป็น invented — reference ไม่มี — ต้อง archive แทน port
- 11 หน้าใน reference (`home / profile / timeoff / benefits / requests / goals / learning_directory / orgchart / announcements / integrations / login`) ยังไม่ได้ port เลย

Ken ตัดสินใจ **A แล้ว B**:
- **Phase A** = port reference 1:1 (shell + styles + icons + 11 screens) + archive หน้า invented
- **Phase B** = re-integrate legacy features ที่ต้องรักษาไว้ (OrgChart zoom/pan component, ThemeProvider dark mode, legacy route exposure) เข้า A-ported pages

งานนี้เป็น **expanded recovery sprint** — port reference + restyle-preserve-features + ปิด gap ของ sprint เดิม (MK V independent reviewer + MK IV honest pixel-zoom validation).

**Root cause ของ sprint #1**:
1. PO spec เดิมไม่ reference bundle ที่ Ken sync ไว้ → builders invent
2. MK IV dual-role (tests + validate) → rubber-stamp Thai AC
3. ไม่มี layout-integration test → 149 unit tests pass แต่ sidebar mount ก็ผ่าน

**Reference bundle** (source of truth สำหรับทุก design decision):
- Path: `/Users/tachongrak/Projects/hr/docs/design-ref/shelfly-bundle/project/`
- `shell.jsx` 81 บรรทัด, `styles.css` 581 บรรทัด, `icons.jsx` 53 บรรทัด
- `screens/*.jsx` 11 ไฟล์ (3,054 บรรทัดรวม)
- Fonts CPN 10 ไฟล์ sync ไปที่ `src/frontend/public/fonts/cpn/` แล้ว
- HTML ground truth: `Shelfly HR.html` + `Central Retail Deck.html`

## Objective

ส่งมอบ Humi HR frontend ที่:

1. **Port reference 1:1** — shell.jsx + styles.css + icons.jsx + 11 screens → ทุก label/layout/interaction trace กลับ `docs/design-ref/shelfly-bundle/project/` ได้ (Rule C8)
2. **Adapt retail → generic HR** — copy ที่ retail-specific (เช่น `ผู้จัดการร้าน · สาขาฮัมเบอร์`) ปรับเป็น Central Group HR context ตามที่ Ken expand scope
3. **Archive invented screens** — employees list/detail, settings ที่ sprint #1 สร้างขึ้นโดย reference ไม่มี → move ไป `.archive-2026-04/` แทน port
4. **Preserve existing interactive features** — OrgChart zoom/pan real component + ThemeProvider dark mode + legacy route exposure
5. **Thai-primary user-facing** — 0 English heading/button/label ที่ไม่อยู่ใน whitelist (PDF, CSV, API, SSO, URL, HR, KPI ฯลฯ)
6. **Not red** — 0 `#C8102E` ในไฟล์ที่แตะ (Humi palette NO RED)
7. **Validation guards** — layout-integration test + Thai heading regression + per-screen smoke test + MK V independent review + MK IV honest pixel-zoom Read() ทุก PNG

## Tech Stack

- **Language**: TypeScript (strict)
- **Framework**: Next.js 16 (App Router, `[locale]` routing), React 19
- **Runtime**: Node.js, npm
- **Styling**: Tailwind v4 + Humi CSS variables (`@theme` block ใน `src/frontend/src/app/globals.css`) — NO global `*` reset (Rule 26b) + NO `#C8102E`
- **Fonts**: CPN family (Light/Regular/Bold/Condensed/Compressed) from `src/frontend/public/fonts/cpn/`
- **i18n**: next-intl (`src/frontend/src/messages/{th,en}.json`)
- **Icons**: lucide-react (existing) + custom `ShelflyMark`/`Hum` wordmark port จาก `icons.jsx`
- **State**: existing `useAuthStore`, `useSettings` hooks (preserved)
- **Testing**: vitest + jsdom (unit + integration), Playwright (screenshot evidence)
- **Auth**: existing MSAL flow (must not break)

## Relevant Files

### Infrastructure (Phase A1-A3)

- `src/frontend/src/components/humi/AppShell.tsx` — REPLACE JARVIS-invented version with port of `shell.jsx` (sidebar layout)
- `src/frontend/src/components/humi/Topbar.tsx` — NEW, port from `shell.jsx` Topbar section (search + bell + eyebrow)
- `src/frontend/src/components/humi/icons/ShelflyMark.tsx` — NEW, port brand mark from `icons.jsx`
- `src/frontend/src/components/humi/icons/index.ts` — NEW, map reference icon names → lucide equivalents + custom
- `src/frontend/src/app/globals.css` — EXTEND with component classes from `styles.css` (pill, avatar, nav-item, sidebar-foot, search, topbar, kbd, icon-btn, dot-badge, eyebrow, wordmark) that don't translate cleanly to Tailwind utilities
- `src/frontend/src/app/[locale]/layout.tsx` — UPDATE to mount new AppShell + Topbar pair

### Ported screens (Phase A4-A14)

Route mapping (reference file → Next.js route):

| Reference | Route | Action | Notes |
|---|---|---|---|
| `home.jsx` | `src/frontend/src/app/[locale]/home/page.tsx` | OVERWRITE | Existing partial English restyle → port ref |
| `profile.jsx` | `src/frontend/src/app/[locale]/profile/me/page.tsx` | NEW | Existing `/profile` เก็บไว้ (legacy) |
| `timeoff.jsx` | `src/frontend/src/app/[locale]/timeoff/page.tsx` | NEW | Existing `/leave` เก็บไว้ (Phase B feature) |
| `benefits.jsx` | `src/frontend/src/app/[locale]/benefits-hub/page.tsx` | NEW | Existing `/benefits` เก็บไว้ (Phase B) |
| `requests.jsx` | `src/frontend/src/app/[locale]/requests/page.tsx` | NEW | — |
| `goals.jsx` | `src/frontend/src/app/[locale]/goals/page.tsx` | NEW | — |
| `learning_directory.jsx` | `src/frontend/src/app/[locale]/learning-directory/page.tsx` | NEW | Existing `/learning` เก็บไว้ (Phase B) |
| `orgchart.jsx` | `src/frontend/src/app/[locale]/org-chart/page.tsx` | OVERWRITE + B1 | Port ref layout + Phase B re-inject existing `<OrgChart>` zoom/pan |
| `announcements.jsx` | `src/frontend/src/app/[locale]/announcements/page.tsx` | NEW | — |
| `integrations.jsx` | `src/frontend/src/app/[locale]/integrations/page.tsx` | NEW | — |
| `login.jsx` | `src/frontend/src/app/[locale]/login/page.tsx` | RESTYLE | **ห้ามแตะ MSAL flow logic** — restyle visual only |

### Archive (Phase A15)

- `src/frontend/src/app/[locale]/employees/` → `src/frontend/.archive-2026-04/employees/`
- `src/frontend/src/app/[locale]/employees/[id]/` → `src/frontend/.archive-2026-04/employees-[id]/`
- `src/frontend/src/app/[locale]/settings/` → `src/frontend/.archive-2026-04/settings/`
- (Rationale: reference bundle ไม่มี 3 หน้านี้; `profile.jsx` + `integrations.jsx` เป็นตัวแทน)

### Components to preserve as-is (Phase B inputs)

- `src/frontend/src/components/profile/org-chart.tsx` — existing real zoom/pan/drag 168 lines → re-injected in B1
- `src/frontend/src/components/shared/theme-provider.tsx` — existing dark mode hook → preserved in B2
- `src/frontend/src/components/humi/{Button,Card,Nav,DataTable,FormField,Avatar,Toggle}.tsx` — primitives from sprint #1 (reuse)
- `src/frontend/src/components/shared/{header,sidebar,mobile-menu,page-shell,page-layout}.tsx` — NOT touched (legacy routes still use)
- `src/frontend/src/lib/humi-mock-data.ts` — EXTEND with per-screen data (home cards, timeoff balance, requests list, ฯลฯ)

### i18n

- `src/frontend/src/messages/th.json` — ADD keys per screen namespace (`home`, `profile`, `timeoff`, `benefits`, `requests`, `goals`, `learning`, `orgChart`, `announcements`, `integrations`, `login`, `shell`)
- `src/frontend/src/messages/en.json` — mirror structure (next-intl requires both)

### Tests (Phase A/B write tests)

- `src/frontend/src/__tests__/layout-integration.test.tsx` — sidebar visible ทุก route + brand wordmark "Hum" + ⌘K hint
- `src/frontend/src/__tests__/thai-heading-regression.test.tsx` — h1/h2/h3 match `[\u0E00-\u0E7F]` ทุก route
- `src/frontend/src/__tests__/humi-reference-smoke.test.tsx` — per-screen: correct sections/cards render, feature buttons present
- `src/frontend/src/__tests__/humi-phase-b.test.tsx` — OrgChart zoom/pan callbacks wired + theme toggle round-trip

## Team Orchestration

JARVIS orchestrates — never touches code directly. Each task Assigned To one agent. Dependencies declared via "Depends On" for the pipeline DAG.

### Team Members

- **Infra Researcher**
  - Name: infra-researcher
  - Agent: MK V — Researcher
  - Role: Phase A1-A3 infrastructure port. Read shell.jsx + styles.css + icons.jsx precisely, decide Tailwind-utility vs scoped-CSS per component class, port AppShell + Topbar + icon set. Requires strict reading (no interpolation)

- **Screen Builder A**
  - Name: screen-builder-a
  - Agent: frontend-design — UI Engineer
  - Role: Port home + profile + announcements + login (4 simpler screens batch 1)

- **Screen Builder B**
  - Name: screen-builder-b
  - Agent: frontend-design — UI Engineer
  - Role: Port timeoff + benefits + requests + goals (4 form-heavy screens batch 2)

- **Screen Builder C**
  - Name: screen-builder-c
  - Agent: frontend-design — UI Engineer
  - Role: Port learning_directory + orgchart + integrations (3 complex screens batch 3, includes Phase B1 OrgChart re-inject)

- **Archive Builder**
  - Name: archive-builder
  - Agent: MK III — Builder
  - Role: Phase A15 archive invented screens (non-UI task: file moves + import cleanup + route verification)

- **Phase B Integrator**
  - Name: phase-b-integrator
  - Agent: frontend-design — UI Engineer
  - Role: Phase B2 (ThemeProvider wiring in A-ported pages) + B3 (legacy route exposure in sidebar). Depends on Phase A complete

- **Test Writer**
  - Name: test-writer
  - Agent: MK VI — Test Writer
  - Role: layout-integration + Thai-heading + per-screen smoke + phase-B tests. Writes failing tests first, builders fix until green

- **Code Reviewer**
  - Name: code-reviewer
  - Agent: MK V — Researcher/Independent Reviewer
  - Role: Independent Code Review (NOT MK IV dual-role). Reference-match audit: compare each ported file vs `docs/design-ref/shelfly-bundle/project/screens/<name>.jsx` — list feature/section/copy mismatches. Block merge if drift > 5%

- **Validator**
  - Name: validator
  - Agent: MK IV — Validator
  - Role: Validate Final — run all tests, capture Playwright screenshots ทุก route, Read() each PNG, pixel-zoom per Rule 62, honest PASS/FAIL per AC. No rubber-stamp

## Step by Step Tasks

### 1. Port shell.jsx → AppShell + Topbar

- **Task ID**: a1-port-shell
- **Depends On**: none
- **Assigned To**: infra-researcher
- **Parallel**: false
- **Files**:
  - `src/frontend/src/components/humi/AppShell.tsx` (REPLACE invented)
  - `src/frontend/src/components/humi/Topbar.tsx` (NEW)
  - `src/frontend/src/app/[locale]/layout.tsx` (UPDATE mount)
  - `src/frontend/src/messages/{th,en}.json` (shell namespace keys)
- **Actions**:
  - Read `docs/design-ref/shelfly-bundle/project/shell.jsx` line-by-line
  - Port NAV array with 3 groups `พื้นที่ทำงานของฉัน / บุคลากร / บริษัท` + 10 items with icon names + badges (`timeoff: 2, benefits: 1, requests: 1`)
  - Port Sidebar: `wordmark` ("Hum" + ShelflyMark 20px accent), `nav-label`, `nav-item` + `active` state, `sidebar-foot` with avatar "จท" coral + name + role
  - **Adapt role**: `ผู้จัดการร้าน · สาขาฮัมเบอร์` → generic HR (propose: `ผู้จัดการฝ่ายบุคคล · สำนักงานใหญ่`). Document in commit message that retail copy was adapted
  - Port Topbar: eyebrow (subtitle), h2 title, search pill ("ค้นหาพนักงาน เอกสาร…" + kbd ⌘K), icon-btn bell with dot-badge
  - Replace existing invented AppShell consumers — existing pages still work (sidebar still renders, just authored correctly now)
  - Wire active-nav detection via `usePathname()` from next/navigation (map pathname → nav item id)
  - Add i18n keys `shell.sidebar.groups.*`, `shell.sidebar.items.*`, `shell.topbar.search.placeholder`, `shell.topbar.greeting.morning/afternoon/evening`
  - Ship as client component (`"use client"`) — needs pathname hook + onClick
  - Max 350 lines changed total across 4 files

### 2. Port styles.css → globals.css + component CSS

- **Task ID**: a2-port-styles
- **Depends On**: a1-port-shell
- **Assigned To**: infra-researcher
- **Parallel**: false
- **Files**:
  - `src/frontend/src/app/globals.css` (EXTEND)
  - `src/frontend/src/components/humi/AppShell.tsx` (wire classes from a1)
  - `src/frontend/src/components/humi/Topbar.tsx` (wire classes)
- **Actions**:
  - Read `docs/design-ref/shelfly-bundle/project/styles.css` (581 lines)
  - Skip `:root` tokens — already live in `globals.css` `@theme` block from sprint #1 (verify coverage via grep, add gaps only)
  - Skip `* { box-sizing }` line 49 + `html, body, #root` resets — Tailwind preflight handles this (Rule 26b: NO global `*` reset that would override utilities; keep only `box-sizing: border-box` if needed at wrapper level)
  - Port component classes to `globals.css` `@layer components`: `.pill`, `.avatar`, `.avatar.coral`, `.nav-item`, `.nav-item.active`, `.nav-label`, `.sidebar`, `.sidebar-foot`, `.brand`, `.wordmark`, `.search`, `.topbar`, `.kbd`, `.icon-btn`, `.dot-badge`, `.eyebrow`, `.spacer`
  - Port dark mode `html[data-theme="dark"]` token overrides to same block (Phase B2 enables this)
  - Tailwind-utility substitution: classes that are trivial (padding/margin/flex) → inline as utility classes in components; only keep CSS for multi-state or pseudo-element rules (`:hover`, `::before`, etc.)
  - Document decision per class in comment (e.g., `/* kept as CSS: needs :hover + complex transition */`)
  - Run `npm run build` → exit 0 (no Tailwind errors)

### 3. Port icons.jsx → components/humi/icons/

- **Task ID**: a3-port-icons
- **Depends On**: none
- **Parallel**: true
- **Assigned To**: infra-researcher
- **Files**:
  - `src/frontend/src/components/humi/icons/ShelflyMark.tsx` (NEW, port from `icons.jsx` line 45-50)
  - `src/frontend/src/components/humi/icons/index.ts` (NEW, name → component map)
- **Actions**:
  - Port `ShelflyMark` component 1:1 (gumdrop shape, `var(--accent)` default, size prop)
  - Port 31 entries of `I` icon set → map to lucide-react equivalents where visual match (e.g., `home` → `Home`, `calendar` → `Calendar`, `bell` → `Bell`) + port custom inline SVG for any non-lucide (check `globe`, `plug`, `mega`, `pin`, `party` carefully — may need custom)
  - Export a typed map: `export const HumiIcons: Record<ReferenceIconName, LucideIcon | CustomIcon>`
  - Unit test: each reference name resolves to a renderable component

### 4. Port home.jsx

- **Task ID**: a4-port-home
- **Depends On**: a1-port-shell, a3-port-icons
- **Assigned To**: screen-builder-a
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/home/page.tsx` (OVERWRITE current partial)
  - `src/frontend/src/lib/humi-mock-data.ts` (EXTEND: home section data)
  - `src/frontend/src/messages/{th,en}.json` (home namespace)
- **Actions**:
  - Read `docs/design-ref/shelfly-bundle/project/screens/home.jsx` (227 lines)
  - Port layout 1:1 using Humi primitives + ported shell
  - Adapt any retail-specific copy → generic HR
  - Use `humi/Card`, `humi/Button`, `humi/Avatar` where API matches reference markup
  - Thai-primary, no English user-facing strings
  - Max 8 files touched
  - Smoke test: `curl localhost:3000/th/home` returns 200 + Thai h1 present

### 5. Port profile.jsx

- **Task ID**: a5-port-profile
- **Depends On**: a1-port-shell, a3-port-icons
- **Assigned To**: screen-builder-a
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/profile/me/page.tsx` (NEW)
  - `src/frontend/src/lib/humi-mock-data.ts` (EXTEND)
  - `src/frontend/src/messages/{th,en}.json` (profile namespace)
- **Actions**:
  - Read `docs/design-ref/shelfly-bundle/project/screens/profile.jsx` (184 lines)
  - Port 1:1, adapt retail copy → generic HR
  - Max 8 files

### 6. Port timeoff.jsx

- **Task ID**: a6-port-timeoff
- **Depends On**: a1-port-shell, a3-port-icons
- **Assigned To**: screen-builder-b
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/timeoff/page.tsx` (NEW)
  - `src/frontend/src/lib/humi-mock-data.ts` (EXTEND)
  - `src/frontend/src/messages/{th,en}.json` (timeoff namespace)
- **Actions**:
  - Read `screens/timeoff.jsx` (185 lines) — port leave balance + request form + history
  - Existing `/th/leave` route NOT touched (Phase B will surface legacy in nav if needed)
  - Max 8 files

### 7. Port benefits.jsx

- **Task ID**: a7-port-benefits
- **Depends On**: a1-port-shell, a3-port-icons
- **Assigned To**: screen-builder-b
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/benefits-hub/page.tsx` (NEW)
  - `src/frontend/src/lib/humi-mock-data.ts` (EXTEND)
  - `src/frontend/src/messages/{th,en}.json` (benefits namespace)
- **Actions**:
  - Read `screens/benefits.jsx` (256 lines) — port salary breakdown + benefit cards
  - Max 8 files

### 8. Port requests.jsx

- **Task ID**: a8-port-requests
- **Depends On**: a1-port-shell, a3-port-icons
- **Assigned To**: screen-builder-b
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/requests/page.tsx` (NEW)
  - `src/frontend/src/lib/humi-mock-data.ts` (EXTEND)
  - `src/frontend/src/messages/{th,en}.json` (requests namespace)
- **Actions**:
  - Read `screens/requests.jsx` (649 lines — largest) — port form templates + submission list
  - Split into subcomponents inside `src/frontend/src/components/humi/requests/` if needed (max 8 files total)
  - Max 8 files

### 9. Port goals.jsx

- **Task ID**: a9-port-goals
- **Depends On**: a1-port-shell, a3-port-icons
- **Assigned To**: screen-builder-b
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/goals/page.tsx` (NEW)
  - `src/frontend/src/lib/humi-mock-data.ts` (EXTEND)
  - `src/frontend/src/messages/{th,en}.json` (goals namespace)
- **Actions**:
  - Read `screens/goals.jsx` (196 lines) — port goal cards + progress rings
  - Max 8 files

### 10. Port learning_directory.jsx

- **Task ID**: a10-port-learning
- **Depends On**: a1-port-shell, a3-port-icons
- **Assigned To**: screen-builder-c
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/learning-directory/page.tsx` (NEW)
  - `src/frontend/src/lib/humi-mock-data.ts` (EXTEND)
  - `src/frontend/src/messages/{th,en}.json` (learning namespace)
- **Actions**:
  - Read `screens/learning_directory.jsx` (83 lines) — port course grid
  - Max 8 files

### 11. Port orgchart.jsx (layout only — Phase B1 adds zoom)

- **Task ID**: a11-port-orgchart
- **Depends On**: a1-port-shell, a3-port-icons
- **Assigned To**: screen-builder-c
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/org-chart/page.tsx` (OVERWRITE)
  - `src/frontend/src/lib/humi-mock-data.ts` (EXTEND org data)
  - `src/frontend/src/messages/{th,en}.json` (orgChart namespace)
- **Actions**:
  - Read `screens/orgchart.jsx` (283 lines) — port card+tree visual layout + search + filter controls
  - Do NOT wire `OrgChart` zoom component yet — that is Phase B1
  - Leave a placeholder `<div data-orgchart-slot />` where Phase B1 will mount existing `@/components/profile/org-chart.tsx`
  - Max 8 files

### 12. Port announcements.jsx

- **Task ID**: a12-port-announcements
- **Depends On**: a1-port-shell, a3-port-icons
- **Assigned To**: screen-builder-a
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/announcements/page.tsx` (NEW)
  - `src/frontend/src/lib/humi-mock-data.ts` (EXTEND)
  - `src/frontend/src/messages/{th,en}.json` (announcements namespace)
- **Actions**:
  - Read `screens/announcements.jsx` (119 lines) — port announcement feed + pinned items
  - Max 8 files

### 13. Port integrations.jsx

- **Task ID**: a13-port-integrations
- **Depends On**: a1-port-shell, a3-port-icons
- **Assigned To**: screen-builder-c
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/integrations/page.tsx` (NEW)
  - `src/frontend/src/lib/humi-mock-data.ts` (EXTEND)
  - `src/frontend/src/messages/{th,en}.json` (integrations namespace)
- **Actions**:
  - Read `screens/integrations.jsx` (149 lines) — port integration catalog + status cards
  - Supersedes invented `/settings` (which will be archived in A15)
  - Max 8 files

### 14. Port login.jsx (visual only — preserve MSAL)

- **Task ID**: a14-port-login
- **Depends On**: a1-port-shell, a3-port-icons
- **Assigned To**: screen-builder-a
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/login/page.tsx` (RESTYLE)
  - `src/frontend/src/messages/{th,en}.json` (login namespace)
- **Actions**:
  - Read `screens/login.jsx` (89 lines)
  - **Restyle visual only** — do NOT touch MSAL `signIn()` calls, auth callback URLs, redirect logic, useAuth hook wiring
  - Wrap existing auth component tree in new Humi layout (branded left panel + form right)
  - Verify MSAL round-trip still works (dev-server login → callback → dashboard)
  - Max 4 files

### 15. Archive invented screens

- **Task ID**: a15-archive-invented
- **Depends On**: a4-port-home through a14-port-login (all ports done)
- **Assigned To**: archive-builder
- **Parallel**: false
- **Files**:
  - Move `src/frontend/src/app/[locale]/employees/` → `src/frontend/.archive-2026-04/employees/`
  - Move `src/frontend/src/app/[locale]/settings/` → `src/frontend/.archive-2026-04/settings/`
  - `src/frontend/.gitignore` or `.archive-2026-04/README.md` to document why
- **Actions**:
  - Confirm with `grep -rn "/employees\|/settings" src/frontend/src` — find all referencing links/imports, update to new routes:
    - `/employees` → `/profile/me` (profile.jsx supersedes as "your person page")
    - `/employees/[id]` → `/profile/me` (invented detail not in ref)
    - `/settings` → `/integrations` (integrations.jsx supersedes for system admin)
  - Run `npm run build` → exit 0
  - Run existing tests `npm test -- --run` → no failures from broken imports
  - Document move + route rewrites in `src/frontend/.archive-2026-04/README.md`

### 16. Phase B1 — Re-inject OrgChart zoom/pan

- **Task ID**: b1-orgchart-zoom
- **Depends On**: a11-port-orgchart, a15-archive-invented
- **Assigned To**: phase-b-integrator
- **Parallel**: false
- **Files**:
  - `src/frontend/src/app/[locale]/org-chart/page.tsx` (EDIT, mount OrgChart into slot)
  - `src/frontend/src/components/profile/org-chart.tsx` (verify API compat, minor prop adjustments allowed)
- **Actions**:
  - Replace `<div data-orgchart-slot />` placeholder (from a11) with `<OrgChart data={...} onNodeClick={...} />`
  - Keep reference-layout: card + search controls + filter chips wrap around the OrgChart
  - Preserve zoom/pan/drag/reset — verify via smoke test (simulate mouse wheel zoom → transform style changes)
  - Restyle OrgChart node visuals using Humi tokens (avatar.coral, card, nav-label) if diff is small; otherwise leave visuals untouched and skin only the surrounding chrome
  - Max 30 lines changed in existing `org-chart.tsx` component

### 17. Phase B2 — ThemeProvider wiring (dark mode)

- **Task ID**: b2-theme-provider
- **Depends On**: a2-port-styles, a15-archive-invented
- **Assigned To**: phase-b-integrator
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/layout.tsx` (ensure ThemeProvider wraps children)
  - `src/frontend/src/components/humi/AppShell.tsx` (add theme toggle button in topbar actions or sidebar-foot — use `Ic.sun`/`Ic.moon` from icon port)
  - `src/frontend/src/components/shared/theme-provider.tsx` (verify it sets `html[data-theme="dark"]` attribute to match styles.css token selector)
- **Actions**:
  - Verify existing ThemeProvider uses same attribute (`data-theme="dark"`) as ported styles.css. If different, align
  - Wire toggle button in Topbar near bell icon — `aria-label="สลับโหมดมืด/สว่าง"`
  - Test round-trip: light → dark → light, all token-driven classes flip correctly
  - Max 5 files touched

### 18. Phase B3 — Legacy route exposure in sidebar

- **Task ID**: b3-legacy-route-nav
- **Depends On**: a1-port-shell, a15-archive-invented
- **Assigned To**: phase-b-integrator
- **Parallel**: true
- **Files**:
  - `src/frontend/src/components/humi/AppShell.tsx` (NAV extension OR no-op with documentation)
- **Actions**:
  - Scan `src/frontend/src/app/[locale]/**/page.tsx` for non-ported routes (payroll, performance, permissions, onboarding, workflows ฯลฯ — 17 legacy routes per sprint context)
  - **Decision (PO direction)**: keep sidebar clean to the 10 reference items; legacy routes accessible via URL only (no "อื่นๆ" expandable section — avoids cluttering the Humi-designed sidebar). Document rationale in file comment
  - If Ken later wants legacy exposed, add `"บริษัท" > { id: "legacy", label: "เครื่องมือเพิ่มเติม", icon: "more" }` → links to `/legacy` index page (not in this sprint)
  - Deliverable: file comment + zero nav changes (task is a decision-document task, no code change)

### 19. Write Tests

- **Task ID**: write-tests
- **Depends On**: b1-orgchart-zoom, b2-theme-provider, b3-legacy-route-nav
- **Assigned To**: test-writer
- **Parallel**: false
- **Files**:
  - `src/frontend/src/__tests__/layout-integration.test.tsx`
  - `src/frontend/src/__tests__/thai-heading-regression.test.tsx`
  - `src/frontend/src/__tests__/humi-reference-smoke.test.tsx`
  - `src/frontend/src/__tests__/humi-phase-b.test.tsx`
- **Actions**:
  - layout-integration: mount LocaleLayout → assert sidebar `<aside class="sidebar">` visible + wordmark text "Hum" + ⌘K kbd present + bell icon + user avatar "จท". Traceability: `// AC-1/AC-5`
  - thai-heading: for each of 11 reference routes + archived routes (which should 404 or redirect), render + query h1/h2/h3 → assert innerText matches `/[\u0E00-\u0E7F]/`. Traceability: `// AC-7`
  - humi-reference-smoke: per screen, assert key reference sections present (home → greeting + shortcut grid; timeoff → balance card + request form; goals → goal cards; etc.). Traceability: `// AC-3/AC-4`
  - humi-phase-b: OrgChart zoom callback fires on wheel event; theme toggle flips `data-theme` attribute. Traceability: `// AC-9/AC-10`
  - Confirm all existing tests still pass: `npm test --prefix src/frontend -- --run`

### 20. Code Review

- **Task ID**: code-review
- **Depends On**: write-tests
- **Assigned To**: code-reviewer
- **Parallel**: false
- **Actions**:
  - **Reference-match audit**: for each of 11 ported screens, `diff -u docs/design-ref/shelfly-bundle/project/screens/<name>.jsx src/frontend/src/app/[locale]/<route>/page.tsx` — build per-screen table: reference section | ported section | match-status (exact/adapted/missing). Adapted is OK if retail→HR; missing is BLOCK
  - **Infra audit**: verify AppShell sidebar has 3 groups + 10 items + correct badges (2/1/1). Topbar has search + ⌘K + bell + dot-badge + eyebrow. globals.css has all component classes that styles.css had
  - **Archive audit**: verify `.archive-2026-04/` has README + no live imports reference archived paths
  - **Token sweep**: `grep -rn '#C8102E' src/frontend/src/app/\[locale\]/` must return empty + `grep -rn '\* {' src/frontend/src/app/globals.css` shows no `* { padding/margin: 0 }` global reset (Rule 26b)
  - **Dual-role check**: confirm test-writer agent ≠ validator agent (Rule from sprint #1 post-mortem)
  - **30-second readability** per ported page + per primitive usage
  - Post a Markdown summary as issue #2 comment with the full reference-match table. If any row is "missing" → BLOCK merge with change request to appropriate builder

### 21. Validate Final

- **Task ID**: validate-all
- **Depends On**: code-review
- **Assigned To**: validator
- **Parallel**: false
- **Actions**:
  - Start dev server: `npm run dev --prefix src/frontend` (port 3000)
  - Capture Playwright screenshots at 1440x900 for each of 11 ported routes + login: `/th/home`, `/th/profile/me`, `/th/timeoff`, `/th/benefits-hub`, `/th/requests`, `/th/goals`, `/th/learning-directory`, `/th/org-chart`, `/th/announcements`, `/th/integrations`, `/th/login`
  - **Read each PNG via the Read tool** (not just list filenames) — Rule 62 pixel-zoom: headings Thai, sidebar visible, no red, font is CPN, spacing matches reference screenshots from `Shelfly HR.html`
  - For each AC-1 through AC-14, emit PASS/FAIL with terminal output evidence + screenshot reference. No rubber-stamp — if any h1 English, AC-7 is FAIL
  - Run `npm run build --prefix src/frontend` — exit 0 required; paste actual terminal output (Rule C2)
  - Run `npm test --prefix src/frontend -- --run` — 0 failures; paste actual test summary output
  - Capture `getComputedStyle` evidence for at least 3 Humi classes on 3 routes (Rule 26c): padding, margin, color applied
  - If any FAIL → send back to appropriate builder; max 2 retries then escalate to Ken

## Pipeline

```
                    ┌─ a3-port-icons ──┐
a1-port-shell ──────┤                   ├─→ (a4..a14 in parallel) ─→ a15-archive-invented
                    └─ a2-port-styles ──┘         11 screen ports            ↓
                                                                     ┌──────┼──────┐
                                                                     ↓      ↓      ↓
                                                                    b1     b2     b3
                                                                     └──────┼──────┘
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

Parallel zones:
- Zone 1 (after a1 + a3): a4, a5, a12, a14 (builder-a) + a6, a7, a8, a9 (builder-b) + a10, a11, a13 (builder-c) — 11 ports concurrent, batched per builder
- Zone 2 (after a15): b1, b2, b3 concurrent (different files, no conflicts)
- Sequential zones: write-tests → Code Review → Validate Final

If Validate Final fails → builder fixes → re-run Code Review → Validate. After 2 failed retries → JARVIS escalates to Ken.

## Acceptance Criteria

- AC-1: AppShell sidebar has exactly 3 groups `พื้นที่ทำงานของฉัน / บุคลากร / บริษัท` + 10 items with correct icons (`home, people, calendar, heart, doc, shield, book, globe, mega, plug`) + 3 badges (`timeoff: 2, benefits: 1, requests: 1`) — verified by layout-integration test assertion
- AC-2: Topbar renders eyebrow greeting + search pill ("ค้นหาพนักงาน เอกสาร…" + ⌘K kbd) + bell icon with dot-badge — verified by Playwright screenshot + DOM assertion
- AC-3: All 11 reference screens render at their mapped routes (`curl localhost:3000/th/<route>` returns 200 + Thai h1 present per screen)
- AC-4: Each ported screen matches reference layout within 5% tolerance — MK IV visual diff + MK V reference-match table both sign off (no "missing" row)
- AC-5: `styles.css` component classes ported — `.pill, .avatar, .nav-item, .sidebar-foot, .search, .topbar, .kbd, .icon-btn, .dot-badge, .eyebrow, .wordmark` all present in `globals.css` (grep confirms) + computed-style check (Rule 26c) shows padding/margin applied
- AC-6: Sidebar + Topbar visible on ALL 11 routes — layout-integration test assertion
- AC-7: **0 English user-facing strings** in 11 ported screens + shell. Whitelist: PDF, CSV, API, SSO, URL, HR, KPI, OT, LOA, UUID, HTTP, JSON, JPEG, PNG, GIF, SVG, ⌘K. AC fails if ANY h1/h2/h3/button/label outside whitelist is English
- AC-8: **0 `#C8102E` red** in any touched file (`grep -rn '#C8102E' src/frontend/src/{app,components}/` returns empty)
- AC-9: OrgChart zoom/pan preserved (Phase B1) — smoke test simulates wheel event → transform style changes + reset button restores transform to identity
- AC-10: ThemeProvider dark mode works (Phase B2) — toggle button flips `html[data-theme]` attribute, all Humi tokens flip in one frame, round-trip light/dark 3x no flicker
- AC-11: Existing MSAL login flow NOT broken (Phase A14) — manual dev-server login works; existing auth tests still pass
- AC-12: Archive cleanup complete (Phase A15) — `.archive-2026-04/` has README + `grep -rn "from '@/app/\[locale\]/employees\|from '@/app/\[locale\]/settings'" src/frontend/src` returns empty (no live imports to archived paths)
- AC-13: `npm run build --prefix src/frontend` exits 0 with no warnings
- AC-14: All tests pass — existing 149 + new layout-integration + thai-heading + humi-reference-smoke + humi-phase-b tests. Total ≥ 160. Terminal output attached to validator report (Rule C2)
- AC-15: **MK V independent Code Review** signs off with full reference-match table posted to issue #2 — not MK IV rubber-stamp
- AC-16: **MK IV Validator** Reads each of 11 screenshot PNGs and emits honest PASS/FAIL per AC. If English heading visible in any PNG, AC-7 is explicitly marked FAIL with screenshot reference — no silent pass

## Validation Commands

- `cd src/frontend && npm run build` — frontend build (exit 0 required)
- `cd src/frontend && npm test -- --run` — unit + integration tests (0 failures)
- `cd src/frontend && npm test -- --run src/__tests__/layout-integration.test.tsx` — sidebar + Topbar guard
- `cd src/frontend && npm test -- --run src/__tests__/thai-heading-regression.test.tsx` — Thai sweep guard
- `cd src/frontend && npm test -- --run src/__tests__/humi-reference-smoke.test.tsx` — per-screen section assertions
- `cd src/frontend && npm test -- --run src/__tests__/humi-phase-b.test.tsx` — OrgChart zoom + theme toggle guards
- `cd src/frontend && npm run dev` (port 3000) + Playwright screenshot 11 routes at 1440x900 → save `test-artifacts/recovery/<route>.png`
- Manual: Read each screenshot via Read tool + pixel-zoom inspect — per Rule 62
- Reference-match diff: for each ported screen, `diff -u docs/design-ref/shelfly-bundle/project/screens/<name>.jsx src/frontend/src/app/[locale]/<route>/page.tsx | head -100` — MK V reviews and attaches summary to issue #2
- Token sweep: `grep -rn '#C8102E' src/frontend/src/{app,components}/` must return empty
- CSS reset check: `grep -E '^\* \{ (padding|margin)' src/frontend/src/app/globals.css` must return empty (Rule 26b)
- Imports to archived paths: `grep -rn "@/app/\\[locale\\]/employees\\|@/app/\\[locale\\]/settings" src/frontend/src` must return empty
- Computed style evidence: Playwright `page.evaluate(el => getComputedStyle(el).padding)` for `.nav-item`, `.pill`, `.topbar` on 3 routes — non-empty values required (Rule 26c)

## Out of Scope

- Backend / API changes
- Any of the 17 legacy routes (payroll, performance, permissions, onboarding, workflows, ฯลฯ) beyond the "keep URL accessible, don't surface in sidebar" decision in B3 — separate sprint
- Logo generation / brand asset work (see `project_humi_branding.md` — awaiting Rungrote direction lock)
- CI/CD changes
- Full i18n extraction tooling (th.json + en.json updates for the 12 namespaces are in scope; broader extraction automation is not)
- Dark theme feature-complete polish beyond "wiring works" (separate spec `2026-03-27-dark-theme-support.md` already tracks that)
- New features or routes not in reference bundle — this is a port+recovery sprint
