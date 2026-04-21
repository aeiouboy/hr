# Plan: Humi Frontend Redesign — Sprint Adapt from Shelfly Bundle

## Task Description

Redesign Humi HR (Central Group HR platform replacement) frontend โดย **adapt** design quality + interaction patterns จาก Shelfly/Humi design handoff bundle (10 screens + design tokens + CPN fonts) ที่ persist อยู่ใน `hr/docs/design-ref/shelfly-bundle/`. Scope คือ **visual re-skin + core screens 5 หน้า** ของ existing `hrms-frontend` (Next.js 16 + Tailwind v4) — ไม่แตะ backend schema, API routes, prisma migrations, MSAL auth (parallel track กับ Sprint 1 backend).

**ไม่ใช่** full clone ของ bundle — คง Humi identity (Central Group HR multi-persona) แทนที่ retail-centric copy/assets. คำว่า "Shelfly" ใน bundle เป็น placeholder รอบแรก — final state = Humi แล้ว แต่ branding/color audit ต้องทำใหม่ตาม Rungrote NO-RED constraint.

อ้างอิง research: `hr/docs/shelfly-hr-design-research.md` (MK V, 320 บรรทัด — design tokens, component inventory, risks scrub list).

## Objective

ส่งมอบ redesign baseline ที่ **measurable**:

- Design tokens SSOT ใน Tailwind v4 `@theme` (`globals.css`) — 4 primary colors (teal + indigo + cream + navy ink) + CPN font family wired
- ≥ 5 core Humi screens implemented (Dashboard/หน้าหลัก, Employee List/บุคลากร, Employee Detail, Org Chart/ผังองค์กร, Settings) — visually adapt จาก bundle
- **0 RED** ใน palette (grep confirm ไม่มี `#C8553D`, `#E08864`, `#C8102E` legacy brand red)
- **0 "Shelfly"** string ใน code/markup
- **0 retail-domain copy** (ไม่มี "store", "cashier", "inventory", "POS")
- Thai-primary UI — ทุก visible text ภาษาไทย, English เฉพาะ tech acronyms
- A11y baseline — ไม่มี `<div onClick>` antipattern, Lighthouse a11y ≥ 90
- Component library reusable — 5 primitives (Button, Card, Nav, DataTable, FormField)
- Playwright screenshots 4-6 รูป captured เพื่อ MK IV validation

## Tech Stack

- **Language**: TypeScript 5.7
- **Framework**: Next.js 16 (App Router) + React 19
- **Styling**: Tailwind CSS v4 (`@theme` inline config via `globals.css`) — ไม่ใช้ `tailwind.config.ts` (v4 pattern)
- **UI Library**: shadcn/ui pattern (class-variance-authority + tailwind-merge — already installed)
- **Icons**: lucide-react 0.460 (ไม่ port ตรงจาก bundle SVG — ใช้ Lucide ที่มีอยู่แล้ว)
- **State**: zustand 5 (existing) + React.useState
- **i18n**: next-intl 4 (existing — structure พร้อม เพิ่ม copy deck เข้า `messages/th.json`)
- **Runtime**: Node.js 20 (hr monorepo convention — **ไม่ใช่ bun**)
- **Testing**: vitest 2 + @testing-library/react 16 + jsdom 25 (existing) + Playwright 1.49
- **Fonts**: CPN family (copy จาก `docs/design-ref/shelfly-bundle/project/fonts/`) loaded via `next/font/local`; IBM Plex Sans Thai fallback ผ่าน next/font/google

## Technical Design

### Architecture

```
src/frontend/src/
├── app/
│   ├── globals.css              ← Tailwind v4 @theme tokens (Humi palette) — REPLACES existing Precision Cool
│   ├── layout.tsx               ← Root layout, font loading (CPN + Plex Sans Thai)
│   └── [locale]/
│       ├── home/page.tsx        ← Screen 1: Dashboard (greeting + KPIs + approvals + announcements)
│       ├── people/page.tsx      ← Screen 2: Employee List (table + filters)
│       ├── people/[id]/page.tsx ← Screen 3: Employee Detail (banner + tabs)
│       ├── org-chart/page.tsx   ← Screen 4: Org Chart (split tree + profile panel)
│       └── settings/page.tsx    ← Screen 5: Settings (theme, language, profile)
├── components/
│   └── humi/                    ← NEW directory — Humi redesign primitives
│       ├── Button.tsx           ← .btn variants (primary/accent/ghost)
│       ├── Card.tsx             ← .card variants (default/tight/cream/ink/accent)
│       ├── Sidebar.tsx          ← 3-section nav (พื้นที่ทำงาน / บุคลากร / บริษัท)
│       ├── Topbar.tsx           ← Sticky cream-gradient header + search + notifications
│       ├── DataTable.tsx        ← Table primitive (header-body same DOM — Rule from cashflow)
│       ├── FormField.tsx        ← Label + input + error + focus ring (accent-soft 4px)
│       ├── KpiCard.tsx          ← border-left color variant pattern (Goals screen)
│       ├── Eyebrow.tsx          ← 11px uppercase section label
│       ├── Blob.tsx             ← Decorative organic shape (CSS squircle)
│       └── Avatar.tsx           ← Initials with gradient bg variants
└── lib/
    └── humi-theme.ts            ← Accent color helper (teal default + indigo alt only — NO clay)
```

### Key Design Decisions

**D1. Tailwind v4 `@theme` SSOT — not tailwind.config.ts**
Existing `globals.css` ใช้ v4 pattern (`@theme { --color-* }`). Redesign จะ **replace** Precision Cool palette ทั้ง block ด้วย Humi tokens — ไม่สร้าง `tailwind.config.ts` (v4 ไม่ต้อง). rationale: ทีมเดิมใช้ v4 pattern แล้ว ให้ consistent.

**D2. NO-RED palette scrub — hard requirement**
Map bundle tokens → Humi palette:

| Bundle token | Hex | Humi decision |
|---|---|---|
| `--accent` teal | `#1FA8A0` | ✅ เก็บเป็น primary accent |
| `--accent` indigo (ผู้ใช้ switch) | `#5B6CE0` | ✅ เก็บเป็น alt accent (Tweaks optional) |
| `clay` accent | `#C8553D` | ❌ **ลบทิ้ง** — red family |
| `--coral` | `#E08864` | ❌ **swap เป็น amber** `#F59E0B` (Tailwind amber-500) หรือ pumpkin `#FB923C` (orange-400) — ไม่อยู่ใน red family |
| `--danger` | `#C8553D` | ❌ **swap เป็น** `#B45309` (amber-700) — orange-leaning danger, ยังอ่านเป็น error แต่ไม่ red |
| `--coral-soft` | `#F6DDCE` | swap เป็น amber-50 `#FEF3C7` |
| ทั้งหมด: `--ink/cream/paper/sage/butter/ok` | — | ✅ เก็บตรง — ไม่แตะ |

**D3. Legacy `#C8102E` brand red ใน existing globals.css ต้องถูก replace**
existing `--color-brand: #C8102E` (Central retail red) จะถูกเปลี่ยนเป็น Humi teal `#1FA8A0`. Sprint 1 backend + auth ไม่ได้ผูกกับ color var นี้ จึงปลอดภัยที่จะ replace.

**D4. CPN font loading via `next/font/local`**
copy CPN `.otf` files จาก `docs/design-ref/shelfly-bundle/project/fonts/` → `src/frontend/public/fonts/cpn/`, โหลดผ่าน `next/font/local` ใน `layout.tsx`. Fallback = IBM Plex Sans Thai (google font). **ห้าม** `<link>` CDN เพราะจะ layout-shift.

**D5. Component extraction jsx → React/TSX**
Bundle ใช้ `<script type="text/babel">` + `window.ComponentName` + prop drilling. Port เป็น ES modules + typed props + Next.js client/server component boundary ที่เหมาะสม (Sidebar + Topbar = client; pages = server ถ้า data ไม่ interactive).

**D6. A11y uplift — mandatory**
- `<div onClick>` → `<button>` หรือ `role="button"` + `onKeyDown` handler (Enter/Space)
- Tabs → `role="tablist"` + `aria-selected` + arrow-key navigation
- Focus ring visible — ไม่ override `:focus-visible`
- `<label htmlFor>` ทุก field

**D7. Rule 26b NO global `*` reset**
Tailwind v4 preflight จัดการแล้ว. Bundle `styles.css` มี `*` reset — **ห้าม port** block นั้น. Port เฉพาะ `:root` tokens + component classes.

**D8. Mock data only — ห้ามแตะ API**
Sprint 1 backend (Org CRUD + ltree + 13 org types) เดิน parallel อยู่. Redesign ใช้ mock/fixture data ใน `src/frontend/src/lib/humi-mock.ts` — ไม่ fetch จริง.

**D9. i18n-ready structure (not full extraction)**
เพิ่ม copy ใหม่เข้า `messages/th.json` + `messages/en.json` (existing next-intl setup). Hardcoded Thai ใน bundle → extract เป็น message keys ที่ structured (`humi.dashboard.greeting`, `humi.nav.people`, etc.). **ไม่ต้อง** extract ทั้ง codebase รอบนี้.

**D10. Logo asset pick (not generate)**
เลือก Humi logo variant จาก `stark/projects/hr-platform-replacement/logo-concepts/v2/` — pick 1 cool (teal/indigo) + 1 warm (amber/gold) เป็น fallback. Copy เข้า `src/frontend/public/brand/humi-logo.svg` + `humi-wordmark.svg`. ห้าม generate logo ใหม่.

### Out-of-scope Guardrails

- ห้ามแตะ `src/services/*` (backend), `src/infra/migrations/` (prisma), `src/infra/seed/`, auth flow (next-auth config)
- ห้าม add dependency ใหม่ (ใช้เฉพาะ Tailwind v4, class-variance-authority, tailwind-merge, lucide-react, next-intl ที่ installed แล้ว)
- ห้าม change route structure ที่มีอยู่ — add 5 routes ใหม่ใน `[locale]/` เท่านั้น ส่วนหน้าอื่นๆ ของ existing UI คงเดิม

## Relevant Files

### Existing (read/modify):
- `src/frontend/package.json` — confirm no new deps needed
- `src/frontend/src/app/globals.css` — **REPLACE** Precision Cool `@theme` block ด้วย Humi tokens
- `src/frontend/src/app/layout.tsx` — add CPN font loader via `next/font/local`
- `src/frontend/next.config.ts` — verify static asset config OK
- `src/frontend/src/i18n/*` — existing next-intl config (extend, don't refactor)
- `src/frontend/messages/th.json`, `messages/en.json` — add Humi copy keys
- `src/frontend/vitest.config.ts` — confirm jsdom ready (Rule 93)
- `src/frontend/playwright.config.ts` — screenshot tests

### New files (create):
- `src/frontend/public/fonts/cpn/*.otf` — copy 10 CPN font files
- `src/frontend/public/brand/humi-logo.svg`, `humi-wordmark.svg` — picked from logo-concepts v2
- `src/frontend/src/components/humi/Button.tsx`
- `src/frontend/src/components/humi/Card.tsx`
- `src/frontend/src/components/humi/Sidebar.tsx`
- `src/frontend/src/components/humi/Topbar.tsx`
- `src/frontend/src/components/humi/DataTable.tsx`
- `src/frontend/src/components/humi/FormField.tsx`
- `src/frontend/src/components/humi/KpiCard.tsx`
- `src/frontend/src/components/humi/Eyebrow.tsx`
- `src/frontend/src/components/humi/Blob.tsx`
- `src/frontend/src/components/humi/Avatar.tsx`
- `src/frontend/src/app/[locale]/home/page.tsx` — Dashboard screen
- `src/frontend/src/app/[locale]/people/page.tsx` — Employee List
- `src/frontend/src/app/[locale]/people/[id]/page.tsx` — Employee Detail
- `src/frontend/src/app/[locale]/org-chart/page.tsx` — Org Chart (split layout)
- `src/frontend/src/app/[locale]/settings/page.tsx` — Settings
- `src/frontend/src/lib/humi-mock.ts` — mock fixtures (employees, org, approvals, announcements)
- `src/frontend/src/lib/humi-theme.ts` — theme util (accent teal/indigo only)
- `src/frontend/src/__tests__/humi/Button.test.tsx` — component tests
- `src/frontend/src/__tests__/humi/Card.test.tsx`
- `src/frontend/src/__tests__/humi/Sidebar.test.tsx`
- `src/frontend/src/__tests__/humi/DataTable.test.tsx`
- `src/frontend/src/__tests__/humi/FormField.test.tsx`
- `src/frontend/e2e/humi-screens.spec.ts` — Playwright screenshot capture (5 screens)
- `src/frontend/e2e/humi-a11y.spec.ts` — axe-core accessibility scan

### Reference (read-only):
- `hr/docs/shelfly-hr-design-research.md` — full research report
- `hr/docs/design-ref/shelfly-bundle/project/styles.css` — source tokens
- `hr/docs/design-ref/shelfly-bundle/project/screens/*.jsx` — 10 source screens
- `hr/docs/design-ref/shelfly-bundle/project/icons.jsx` — reference icons (port to Lucide equivalents)
- `stark/projects/hr-platform-replacement/logo-concepts/v2/` — Humi logo variants

## Team Orchestration

JARVIS orchestrates — never touches code directly. Each task assigned to one Mark.

**IMPORTANT — Rule 26a compliance**: UI-facing work ต้องใช้ `frontend-design` skill (หรือ `frontend-ui-ux-engineer` agent) ตั้งแต่ scaffold — **ไม่ใช่ Forge Frontend**. Forge Frontend เก็บไว้ใช้เฉพาะ internal tools.

### Team Members

- **Research Lead**
  - Name: research-lead
  - Agent: MK V — Researcher
  - Role: อ่าน existing `src/frontend/` tree + verify no hidden dep, confirm mock data shape matches Sprint 1 backend contracts (read-only)

- **Design System Builder**
  - Name: design-system-builder
  - Agent: frontend-design skill (UI specialist)
  - Role: Tailwind v4 `@theme` tokens, CPN font loading, NO-RED palette cleanup, logo pick, globals.css authoring

- **Component Library Builder**
  - Name: component-library-builder
  - Agent: frontend-design skill
  - Role: 10 primitives ใน `components/humi/` (Button/Card/Sidebar/Topbar/DataTable/FormField/KpiCard/Eyebrow/Blob/Avatar) — typed, a11y-clean, ไม่มี `<div onClick>`

- **Screen Builder A (Dashboard + Employee List)**
  - Name: screen-builder-a
  - Agent: frontend-design skill
  - Role: `home/page.tsx` + `people/page.tsx` + mock fixtures for these 2 screens

- **Screen Builder B (Employee Detail + Org Chart)**
  - Name: screen-builder-b
  - Agent: frontend-design skill
  - Role: `people/[id]/page.tsx` + `org-chart/page.tsx` split layout + peer/report nodes + sticky tree

- **Screen Builder C (Settings + i18n copy)**
  - Name: screen-builder-c
  - Agent: frontend-design skill
  - Role: `settings/page.tsx` + extend `messages/th.json` + `messages/en.json` with Humi copy keys

- **Test Writer**
  - Name: test-writer
  - Agent: MK VI — Test Writer
  - Role: vitest component tests (5 primitives) + Playwright screenshot e2e + axe-core a11y scan. Traceability comments reference AC IDs.

- **Code Reviewer**
  - Name: code-reviewer
  - Agent: MK II — Code Reviewer
  - Role: Quality/security/30-sec readability, verify NO RED grep clean, NO "Shelfly" grep clean, NO `<div onClick>`, NO global `*` reset (Rule 26b), fix directly if simple

- **Validator**
  - Name: validator
  - Agent: MK IV — Validator
  - Role: Run `npm test` + `npx playwright test` + pixel-zoom screenshots (Rule 62) + verify all 10 ACs + capture actual terminal output (Rule C2). Rule 26c computed-style check.

## Step by Step Tasks

### 1. Research Current Frontend + Scaffold Audit
- **Task ID**: research-scaffold-audit
- **Depends On**: none
- **Assigned To**: research-lead
- **Parallel**: false
- **Files**: read-only audit of `src/frontend/src/**` + `package.json` + `globals.css` + `vitest.config.ts`
- **Actions**:
  - Confirm Next.js 16 + Tailwind v4 + vitest + jsdom already wired (Rule 93)
  - Verify no global `*` CSS reset in existing code (Rule 26b)
  - Document current i18n structure in `messages/th.json` + `messages/en.json`
  - Identify any existing route conflict with proposed `home/`, `people/`, `org-chart/`, `settings/`
  - Confirm Sprint 1 backend doesn't export frontend types that conflict
  - Report: green-light or blockers found

### 2. Design System Foundation (Tokens + Fonts + Logo)
- **Task ID**: design-system-foundation
- **Depends On**: research-scaffold-audit
- **Assigned To**: design-system-builder
- **Parallel**: false
- **Files**:
  - `src/frontend/src/app/globals.css` (REPLACE `@theme` block)
  - `src/frontend/src/app/layout.tsx` (add CPN font loader)
  - `src/frontend/public/fonts/cpn/*.otf` (copy 10 files from bundle)
  - `src/frontend/public/brand/humi-logo.svg`, `humi-wordmark.svg` (pick from logo-concepts/v2)
  - `src/frontend/src/lib/humi-theme.ts` (accent helper)
- **Actions**:
  - Replace Precision Cool `@theme` block with Humi tokens (teal `#1FA8A0` primary, indigo `#5B6CE0` alt, cream `#F6F1E8` bg, navy ink `#0E1B2C`)
  - Scrub RED: no `#C8553D`, `#E08864`, `#C8102E`; replace danger with `#B45309` amber-700
  - Copy CPN fonts from `hr/docs/design-ref/shelfly-bundle/project/fonts/` to `public/fonts/cpn/`
  - Wire `next/font/local` for CPN + Plex Sans Thai fallback in `layout.tsx`
  - Pick logo variant (1 cool + 1 warm) from `stark/projects/hr-platform-replacement/logo-concepts/v2/`
  - Ensure NO global `*` reset added (Rule 26b)

### 3. Component Library (10 Primitives)
- **Task ID**: component-library
- **Depends On**: design-system-foundation
- **Assigned To**: component-library-builder
- **Parallel**: false
- **Files**: 10 files in `src/frontend/src/components/humi/`
- **Actions**:
  - Port Button (primary/accent/ghost) with class-variance-authority
  - Port Card + 4 variants (default/tight/cream/ink/accent)
  - Port Sidebar (3-section nav: พื้นที่ทำงานของฉัน / บุคลากร / บริษัท) — all `<button>`/`<Link>`, NO `<div onClick>`
  - Port Topbar (sticky, cream gradient, search, notifications, primary action slot)
  - Port DataTable (header-body same DOM, no sticky-per-cell — from cashflow rule)
  - Port FormField (label + input + focus ring 4px accent-soft, `<label htmlFor>`)
  - Port KpiCard (border-left color variant)
  - Port Eyebrow (11px uppercase, 0.14em tracking)
  - Port Blob (CSS squircle radius, 4 color variants — NO clay)
  - Port Avatar (initials + gradient bg, sage/teal/butter/ink variants only — NO coral/clay)
  - Every interactive element has keyboard handler + aria-label where needed

### 4. Dashboard + Employee List Screens
- **Task ID**: screens-a-dashboard-people
- **Depends On**: component-library
- **Assigned To**: screen-builder-a
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/home/page.tsx`
  - `src/frontend/src/app/[locale]/people/page.tsx`
  - `src/frontend/src/lib/humi-mock.ts` (employees + approvals + announcements fixtures)
- **Actions**:
  - Dashboard: greeting hero + team availability ring + pending approvals list + docs to sign + announcements preview + mini-calendar + birthdays ink card
  - Employee List: DataTable + filters + search, 20-row mock data (corporate HR + mall ops + warehouse personas — NOT retail-only)
  - Thai-primary copy: "ยินดีต้อนรับกลับมา คุณ...", "การอนุมัติที่รอ", "บุคลากรทั้งหมด"
  - NO retail copy ("store", "cashier", "POS", "inventory")
  - All widgets use humi/* primitives — no custom one-offs

### 5. Employee Detail + Org Chart Screens
- **Task ID**: screens-b-detail-org
- **Depends On**: component-library
- **Assigned To**: screen-builder-b
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/people/[id]/page.tsx`
  - `src/frontend/src/app/[locale]/org-chart/page.tsx`
- **Actions**:
  - Employee Detail: banner + avatar + 4-col quick stats + contact + employment + skills + goals (progress bars) + training + HR notes ink card
  - Org Chart: split `1.1fr 1.5fr` — LEFT sticky manager-chain tree (Node sm/md/lg + Connector 2px) + peers row + direct reports; RIGHT profile pane identical to Detail
  - Selected node = accent-soft bg + shadow-lg
  - Keyboard navigation: Tab through tree nodes, Enter/Space to select
  - Use existing Sprint 1 backend contract for org types (13 types) — mock shape matches

### 6. Settings Screen + i18n Copy Extract
- **Task ID**: screens-c-settings-i18n
- **Depends On**: component-library
- **Assigned To**: screen-builder-c
- **Parallel**: true
- **Files**:
  - `src/frontend/src/app/[locale]/settings/page.tsx`
  - `src/frontend/messages/th.json` (extend)
  - `src/frontend/messages/en.json` (extend)
- **Actions**:
  - Settings: theme accent picker (teal/indigo only — NO clay), language toggle (th/en), profile preferences, notification settings
  - Extract all new Thai strings to `messages/th.json` under `humi.*` namespace
  - Mirror structure in `messages/en.json` (English fallback strings)
  - Update 3 other screen builders to use `useTranslations('humi')` hook (light touch — not full repo extract)

### 7. Write Tests
- **Task ID**: write-tests
- **Depends On**: screens-a-dashboard-people, screens-b-detail-org, screens-c-settings-i18n
- **Assigned To**: test-writer
- **Parallel**: false
- **Files**:
  - `src/frontend/src/__tests__/humi/Button.test.tsx`
  - `src/frontend/src/__tests__/humi/Card.test.tsx`
  - `src/frontend/src/__tests__/humi/Sidebar.test.tsx`
  - `src/frontend/src/__tests__/humi/DataTable.test.tsx`
  - `src/frontend/src/__tests__/humi/FormField.test.tsx`
  - `src/frontend/e2e/humi-screens.spec.ts`
  - `src/frontend/e2e/humi-a11y.spec.ts`
- **Actions**:
  - vitest unit tests: render + variant coverage + keyboard interaction + aria attributes
  - Traceability comments: `// AC-7` on a11y tests, `// AC-3` on palette tests
  - Regression guard: assert `getComputedStyle` NO `#C8553D`/`#E08864`/`#C8102E` appears (Rule 26c)
  - Playwright: navigate 5 screens, screenshot 1920x1080, 4-6 artifacts total
  - axe-core: scan 5 screens, assert 0 serious/critical violations

### 8. Code Review
- **Task ID**: code-review
- **Depends On**: write-tests
- **Assigned To**: code-reviewer
- **Parallel**: false
- **Actions**:
  - Review all new files for quality, 30-sec readability
  - Grep verify: `rg "Shelfly"` returns 0 matches in code (bundle dir OK)
  - Grep verify: `rg "#C8553D|#E08864|#C8102E"` returns 0 matches in `src/frontend/`
  - Grep verify: `rg "store|cashier|POS|inventory" --glob 'src/frontend/**/*.tsx'` returns 0 retail copy
  - Scan for `<div onClick>` antipattern — fail if found
  - Scan for global `*` reset — fail if found (Rule 26b)
  - Verify `vitest.config.ts` + `jsdom` present (Rule 93)
  - Fix issues directly if simple (typo, missing aria-label); escalate to builder if architectural

### 9. Validate Final Output
- **Task ID**: validate-all
- **Depends On**: code-review
- **Assigned To**: validator
- **Parallel**: false
- **Actions**:
  - `cd src/frontend && npm run build` — verify 0 errors
  - `cd src/frontend && npm test` — verify all vitest pass, copy terminal output (Rule C2)
  - `cd src/frontend && npm run dev` in background, wait for ready
  - `cd src/frontend && npx playwright test e2e/humi-screens.spec.ts` — capture 5 screenshots
  - `cd src/frontend && npx playwright test e2e/humi-a11y.spec.ts` — axe-core report
  - Rule 26c: JS inspect `getComputedStyle` on sample `.btn`, `.card`, `.nav-item` to confirm tokens apply in browser (not just tsc-pass)
  - Rule 62: pixel-zoom screenshots for overlap/misalignment before PASS verdict
  - Lighthouse a11y ≥ 90 on 5 screens
  - Write AC table to `docs/humi-redesign-validation.md` with pass/fail per AC + evidence
  - If any AC fail → send back to relevant builder (max 2 retries → escalate to Ken)

## Pipeline

```
research-scaffold-audit
    ↓
design-system-foundation
    ↓
component-library
    ↓
    ├─► screens-a-dashboard-people ─┐
    ├─► screens-b-detail-org        ├─► write-tests → Code Review (MK II) → Validate Final (MK IV)
    └─► screens-c-settings-i18n ────┘                                            ↓
                                                                            FAIL? → fix → re-review → re-validate
                                                                                    (max 2 retries → escalate)
```

**Parallel batch**: Tasks 4, 5, 6 run parallel after Task 3 completes — each agent owns ≤ 3 files (well under Rule 22 limit of 8 files).
**Sequential gates**: Task 1 → 2 → 3 are sequential (tokens must exist before components, components before screens).
**Post-build**: write-tests → Code Review → Validate Final is mandatory serial path.
If validator fails → responsible Builder fixes → re-run Code Review → re-validate. After 2 failed retries → JARVIS escalates to Ken with full context.

## Acceptance Criteria

- **AC-1**: Design tokens centralized in `src/frontend/src/app/globals.css` `@theme` block — 4 primary colors (teal `#1FA8A0` / indigo `#5B6CE0` / cream `#F6F1E8` / navy ink `#0E1B2C`) + CPN font-family loaded via `next/font/local` with IBM Plex Sans Thai fallback. Verifiable: `grep -E '#1FA8A0|#5B6CE0|#F6F1E8|#0E1B2C' src/frontend/src/app/globals.css` returns 4 matches.
- **AC-2**: ≥ 5 core Humi screens implemented (`home`, `people` list, `people/[id]` detail, `org-chart`, `settings`) — ทุกหน้าเปิดได้บน `npm run dev`, ไม่มี console error, render ครบตาม bundle reference (ring KPI, border-left KPI cards, split layout for org chart, sticky topbar). Verifiable: Playwright captures 5 screenshots at 1920x1080 with no error overlay.
- **AC-3**: **0 RED** — `rg -n '#C8553D|#E08864|#C8102E' src/frontend/src/ src/frontend/public/` returns 0 matches. Tweaks/theme options expose teal + indigo only (no `clay` accent).
- **AC-4**: **0 "Shelfly"** — `rg -n 'Shelfly' src/frontend/src/ src/frontend/public/ src/frontend/messages/` returns 0 matches (excluded: `docs/design-ref/shelfly-bundle/` reference dir).
- **AC-5**: **0 retail-centric copy** — `rg -n -i 'store|cashier|POS|inventory|\bshift\b.*wage' src/frontend/src/app/\[locale\]/` returns 0 matches in new Humi screens. Mock personas include corporate HR + mall ops + warehouse roles (not retail-only).
- **AC-6**: **Thai-primary** — ทุก visible page title + nav label + primary copy ใน 5 หน้าเป็นภาษาไทย (English เฉพาะ tech acronyms เช่น "HR", "SSO", "API"). Verifiable: MK IV visual review + `messages/th.json` contains all `humi.*` keys used in screens.
- **AC-7**: **A11y baseline** — `rg -n '<div[^>]*onClick' src/frontend/src/components/humi/ src/frontend/src/app/\[locale\]/` returns 0 matches. axe-core Playwright scan reports 0 serious/critical violations. Lighthouse a11y score ≥ 90 on all 5 screens. No global `*` CSS reset (Rule 26b): `rg '^\s*\*\s*\{' src/frontend/src/app/globals.css` returns 0 matches.
- **AC-8**: Component library extracted — 10 primitives in `src/frontend/src/components/humi/` (Button, Card, Sidebar, Topbar, DataTable, FormField, KpiCard, Eyebrow, Blob, Avatar) — all typed, all use class-variance-authority variants, reused ≥ 2x across 5 screens each (verified by Code Reviewer).
- **AC-9**: Dev server + build + tests clean — `cd src/frontend && npm run build` returns exit 0, no TypeScript errors. `npm test` returns 0 failures with coverage on 5 primitive tests. `npm run dev` loads `/th/home` with no console error.
- **AC-10**: Rule 26c computed-style check passes — JS inspect via Playwright (or chrome-browse) on `.btn`, `.card`, `.nav-item` confirms padding/margin/color tokens apply in browser (not just tsc-green). Evidence: 4-6 Playwright screenshots + JSON dump of getComputedStyle attached to validation report.

## Validation Commands

- `cd src/frontend && npm run build` — Next.js build, must exit 0
- `cd src/frontend && npm test` — vitest suite, must exit 0
- `cd src/frontend && npm run dev` (background) then `curl -I http://localhost:3000/th/home` returns 200
- `cd src/frontend && npx playwright test e2e/humi-screens.spec.ts` — 5-screen screenshot capture
- `cd src/frontend && npx playwright test e2e/humi-a11y.spec.ts` — axe-core scan
- `rg -n '#C8553D|#E08864|#C8102E' src/frontend/src/ src/frontend/public/` — expect 0 matches (AC-3)
- `rg -n 'Shelfly' src/frontend/src/ src/frontend/public/ src/frontend/messages/` — expect 0 matches (AC-4)
- `rg -n -i 'store|cashier|POS|inventory' src/frontend/src/app/\[locale\]/home src/frontend/src/app/\[locale\]/people src/frontend/src/app/\[locale\]/org-chart src/frontend/src/app/\[locale\]/settings` — expect 0 retail copy (AC-5)
- `rg -n '<div[^>]*onClick' src/frontend/src/components/humi/ src/frontend/src/app/\[locale\]/home src/frontend/src/app/\[locale\]/people src/frontend/src/app/\[locale\]/org-chart src/frontend/src/app/\[locale\]/settings` — expect 0 matches (AC-7)
- `rg '^\s*\*\s*\{' src/frontend/src/app/globals.css` — expect 0 matches (Rule 26b)
- Manual: Ken/PO visual review of 5 screenshots for "adapt don't clone" identity fit
- Manual: Rungrote NO-RED sign-off on accent swatches in Settings screen

## Out of Scope

- Backend schema / API changes (Sprint 1 backend team owns — parallel track)
- Prisma migrations, ltree org tree query work (Sprint 1)
- Authentication / MSAL / next-auth flow (separate oms-login-style effort)
- Real data integration (API fetch) — mock fixtures only this sprint
- Full i18n extraction of existing (non-Humi) screens — extend th.json/en.json for new screens only
- CI/CD pipeline changes
- Logo generation (pick from existing `logo-concepts/v2/` — do not create new)
- Mobile responsive pass (`< 768px` layout) — Sprint 2, if Rungrote confirms design direction
- Dark mode — existing code has `@variant dark` hook but Humi dark palette not yet specified
- Animation/motion library (Framer Motion etc.) — bundle uses minimal 0.15s transitions only
- Retail-specific screens (Shift Scheduler, POS Integrations tab) — out of Central Group HR scope
- Email/domain rebrand (`@humi.shop` placeholders) — replace with neutral `@example.com` in mock only; real domain decision = ops concern
- Testimonial rewrites in Login (out of 5-screen scope this sprint)
