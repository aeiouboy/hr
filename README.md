# Central Retail Next-Gen HRMS

Enterprise HR Management System for Central Group, currently in a **clickable UI-mockup phase** — built to let the HR Team demo every flow end-to-end and approve the visual + interaction direction before any production backend work begins.

> ⚠️ **The active product is the Next.js frontend in [`src/frontend/`](src/frontend/).** Everything else is legacy or reference (see [Legacy](#legacy--historical)). Do all product work in `src/frontend/`.

## Tech Stack (active app)

| Layer        | Technology                                            |
|--------------|-------------------------------------------------------|
| Framework    | Next.js 16 (App Router), React 19, TypeScript 5.7     |
| Styling      | Tailwind CSS 4 (`@theme` tokens in `globals.css`)     |
| State        | Zustand 5                                             |
| i18n         | next-intl 4 — Thai/English, default **`th`**          |
| Auth (mock)  | next-auth 5 (beta)                                    |
| Testing      | Vitest 2 (unit), Playwright 1.49 (E2E)                |

Backend (real API, persistence, auth wiring, payroll integration) is **out of scope** during the mockup phase. `lib/api.ts` + `*-api.ts` simulate async against static/registry seeds.

## Modules (what the app demos)

| Area                | Surfaces                                                                 |
|---------------------|--------------------------------------------------------------------------|
| **Home & shell**    | role-aware home, sidebar, command palette, persona switcher, notifications |
| **Employee profile**| `profile/[tab]` self-service profile, ESS edits, document boundary        |
| **Time & leave**    | `timeoff` requests/balances, `time` corrections, `overtime`, `roster`     |
| **Payroll**         | `payslip` (masked), `payroll` setup/processing, imports                   |
| **Benefits**        | `benefits-hub`, smart claims, hospital referral, enrollment, exceptions   |
| **Performance**     | `performance`, `goals`, `idp`, `talent-management`, `succession`          |
| **Learning**        | `learning`, `learning-directory`, `training-records` (external system)    |
| **Recruiting**      | `recruiting`, `screening`, `admin/hire` onboarding wizard                 |
| **Org & people**    | `org-chart`, `locations`, `announcements`, `hrbp`, `spd` privilege mgmt   |
| **Approvals**       | unified `/quick-approve` inbox; detail under `/workflows/<type>/[id]`     |
| **Admin**           | `admin/*` config, picklists, reports, permissions, integrations          |

> Performance Management and Learning are **external systems** — they appear as placeholder/demo surfaces here, but the real functionality lives outside this HRMS.

## Getting Started

```bash
cd src/frontend
npm install
npm run dev      # → http://localhost:3000 (lands on /th/home)
```

English is at `/en`. Port 3000 is the only supported target (Keycloak occupies 8080).

```bash
npm run build    # production build — also the TS typecheck gate
npm run start    # serve the production build
```

## Demo & Personas

Auth is mocked. Switch roles live from the shell **Persona Switcher** (top bar) or the **Login-As ribbon** — no real login needed. Roles map onto 4 demo tiers (`src/lib/persona-tiers.ts`):

| Tier | Persona                 | Roles                  | Sees                                  |
|------|-------------------------|------------------------|---------------------------------------|
| **A** | System / HR Admin      | `hr_admin`, `hr_manager` | top-tier config + all records       |
| **B** | People Partners        | `hrbp`, `spd`          | BU partners, dev/privilege approvers  |
| **C** | Manager                | `manager`              | team views + quick approvals          |
| **D** | Employee               | `employee`             | ESS baseline (own profile/requests)   |

Seed personas live in `src/lib/demo-users.ts` (e.g. `admin@humi.test`, `hrbp@humi.test`, `manager@humi.test`, `employee@humi.test`, `hris@humi.test`). **Menu RBAC removes inaccessible items entirely** — it never renders them locked/disabled.

## Testing

```bash
cd src/frontend
npm test                  # Vitest unit/integration (~244 test files, colocated)
npm run test:watch        # Vitest watch
npm run test:e2e          # Playwright E2E (e2e/*.spec.ts, ~38 specs)
npm run test:e2e:headed   # Playwright headed
npm run lint              # ESLint — scoped to a file allowlist in package.json
```

Focused runs: `npm test -- --run <pattern>`, `npm run test:e2e -- --project=chromium <spec>`.

### Verify gate

Run `cd src/frontend && npm run verify` before opening a PR. Vitest will join this gate after the pre-existing baseline failures are fixed.

## Architecture (`src/frontend/src/`)

```
src/
├── app/
│   ├── [locale]/...        # ~48 route groups (file-based; locale-prefixed)
│   │   ├── home, profile/[tab], benefits-hub, payroll, quick-approve/[id],
│   │   │   timeoff, admin/*, hrbp/*, workflows, performance, org-chart, ...
│   │   └── globals.css     # Humi design tokens (Tailwind @theme) — source of truth
│   └── api/                # minimal (auth redirects)
├── components/
│   ├── humi/               # Humi design system: 20 primitives + shell/ (6 components)
│   └── <domain>/           # ~35 feature folders (benefits, payroll, leave, time, ...)
├── stores/                 # ~44 Zustand stores (ui/auth, humi-*-slice, *-approvals, domain)
├── lib/                    # ~50 files: rbac, persona-tiers, mock data/seeds, api mocks, date/mask
├── i18n/                   # config.ts (locales, default), routing.ts, request.ts
└── messages/               # en.json + th.json (kept at parity, ~5.6k lines each)
middleware.ts               # next-intl locale routing
next.config.ts              # root + legacy-path redirects
```

### Routing
File-based, no registry. Add a screen = create `src/app/[locale]/<route>/page.tsx`. Locale prefix is handled by `middleware.ts`. `next.config.ts` redirects `/` → `/th/home` and normalizes legacy aliases (`/leave`→`/timeoff`, `/ess`→`/profile/me`, etc.). Keep the active locale on all navigation.

### Humi Design System (canonical)
Start every UI task from Humi primitives + tokens — no route-local card markup or raw hex.
- **Tokens**: `src/app/globals.css` (Tailwind `@theme`, no `tailwind.config.ts` override).
- **Primitives**: `src/components/humi/` — `Card`, `Button`, `FormField`, `DataTable`, `Modal`, `Nav`, `Avatar`, `Toggle`, `Textarea`, `EmptyState`, `FileUploadField`, etc. (20 total) + shell (`AppShell`, `Sidebar`, `Topbar`, `CommandPalette`, `PersonaSwitcher`, `LoginAsRibbon`).
- **Palette**: cream canvas `#F6F1E8` + navy ink `#0E1B2C`; primary/active = **teal** `#1FA8A0`; info/alt = indigo `#5B6CE0`.
- **NO-RED guardrail**: danger uses **pumpkin** `#FB923C`, never red/crimson/coral.

### State (Zustand)
Stores in `src/stores/` — UI/session (`ui-store`, `auth-store`), Humi slices (`humi-*-slice`), approval queues (`*-approvals` feeding `approval-registry.ts`), plus domain stores (benefit claims/referrals, leave balances, time corrections, import jobs, ...). Use the slice that already owns a domain before adding a store.

### RBAC & Demo Personas
- Roles (`src/lib/rbac.ts`): `employee` < `manager` < `hrbp` < `spd` < `hr_admin` < `hr_manager` (inherited).
- `src/lib/persona-tiers.ts` maps roles to 4 demo tiers (A System/HR Admin, B People Partners, C Manager, D Employee), surfaced by the shell `PersonaSwitcher` + `LoginAsRibbon`.
- **Menu RBAC = remove, not hide** — drop inaccessible items entirely; never render them locked.
- **Approvals are unified** — every approval surfaces in the `/quick-approve` umbrella; detail pages live under `/workflows/<type>/[id]`.

### i18n
Add keys to **both** `messages/en.json` and `messages/th.json`; keep TH/EN parity. Thai Buddhist Era dates via `src/lib/date.ts`; sensitive fields (bank accounts, national IDs) use masking helpers. Default locale is `th`.

## Conventions
- Server Components by default; add `'use client'` only when interactivity/state is needed.
- Reuse existing Humi primitives, Zustand stores, lib helpers, and routes before introducing new patterns. Keep diffs small and reversible.
- No new dependencies without an explicit request. No legacy card classes / route-local card styling in Humi routes.
- For route/UI/behavior changes, add or update a Vitest/Playwright regression test alongside the change.

See [`CLAUDE.md`](CLAUDE.md) for the full working agreement and current project phase.

## Legacy / historical

The `src/services/*` tree (14 NestJS microservices) and the removed `apps/` vanilla-JS SPA describe an **earlier architecture that is no longer the product**. Treat them — and the git history referencing PostgreSQL/Redis/Keycloak/Prisma microservices — as historical context only. Docker Compose (`docker-compose.yml`) still starts PostgreSQL/Redis/Keycloak for those legacy services, but the Next.js mockup does not require them.

## License

Proprietary — Central Group (Central Retail Corporation).
