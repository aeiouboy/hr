# Plan: Dark Theme Support

## Task Description
Implement comprehensive dark theme support for the Next.js HRMS frontend (`src/frontend/`). This includes CSS variable-based theming, a theme provider component, theme toggle in Settings and Header, localStorage persistence, system preference detection, and updating all 88+ component files to support dark mode variants. The implementation must preserve the Central Group brand identity (cg-red #C8102E) across both themes.

## Objective
When complete, users will be able to switch between Light, Dark, and System Default themes. The selected theme persists across sessions via localStorage. All pages and components render correctly in both themes with proper contrast, readability, and brand consistency.

## Problem Statement
The app is currently light-only with ~1,700+ hardcoded color classes (`bg-white`, `text-gray-*`, `border-gray-*`) spread across 88 component files. The Zustand UI store already has a `theme` field and i18n keys exist (`settings.theme`, `settings.themeLight`, `settings.themeDark`, `settings.themeSystem`), but none are wired up. Users working in low-light environments have no way to reduce eye strain.

## Solution Approach
Use Tailwind CSS v4's `@theme` block with CSS custom properties and the `dark:` variant (class-based strategy via a `ThemeProvider` component). This avoids touching every hardcoded color class in a single pass -- instead, we:

1. **Phase 1** - Build the CSS foundation: define semantic CSS variables for surface, text, and border colors that swap values in `.dark` context. Update `globals.css` with a `@layer base` dark theme override.
2. **Phase 2** - Create a `ThemeProvider` that reads from Zustand + localStorage + `prefers-color-scheme`, and applies the `dark` class to `<html>`. Add theme toggle UI.
3. **Phase 3** - Update all UI primitives (`card`, `button`, `badge`, `modal`, `tabs`, `form-field`, `skeleton`, `toast`) with `dark:` variants. Since all pages compose these primitives, this gives ~70% coverage.
4. **Phase 4** - Update shared layout components (`sidebar`, `header`, `mobile-menu`, `page-layout`) and the root layout.
5. **Phase 5** - Sweep remaining page components that use inline colors not covered by UI primitives.
6. **Phase 6** - Validation, contrast checking, and E2E testing.

## Relevant Files
Use these files to complete the task:

### Core Infrastructure (modify)
- `src/frontend/src/app/globals.css` - Add dark theme CSS variables and `@layer base` overrides
- `src/frontend/src/app/layout.tsx` - Wire ThemeProvider, add `suppressHydrationMismatch` to `<html>`
- `src/frontend/src/stores/ui-store.ts` - Already has `theme` state; add localStorage persistence
- `src/frontend/src/hooks/use-settings.ts` - Already has `theme` field in GeneralSettings
- `src/frontend/src/components/settings/settings-page.tsx` - Add theme toggle to System tab
- `src/frontend/messages/en.json` - Already has theme keys; verify completeness
- `src/frontend/messages/th.json` - Already has theme keys; verify completeness

### New Files
- `src/frontend/src/components/shared/theme-provider.tsx` - ThemeProvider component with system detection, localStorage sync, and `dark` class management
- `src/frontend/src/hooks/use-theme.ts` - Hook encapsulating theme logic (reads Zustand store, handles system preference media query)

### UI Primitives (modify for `dark:` variants)
- `src/frontend/src/components/ui/card.tsx` - `bg-white` -> `dark:bg-gray-800`, border/shadow
- `src/frontend/src/components/ui/button.tsx` - Secondary/outline/ghost variants need dark colors
- `src/frontend/src/components/ui/badge.tsx` - All 5 variants need dark bg/text
- `src/frontend/src/components/ui/modal.tsx` - Backdrop, panel bg, text
- `src/frontend/src/components/ui/tabs.tsx` - Active/inactive tab colors
- `src/frontend/src/components/ui/form-field.tsx` - Input bg, border, placeholder, dropdown
- `src/frontend/src/components/ui/skeleton.tsx` - Skeleton pulse color
- `src/frontend/src/components/ui/toast.tsx` - Toast variants

### Layout Components (modify for `dark:` variants)
- `src/frontend/src/components/shared/sidebar.tsx` - Sidebar bg, active item, hover states
- `src/frontend/src/components/shared/header.tsx` - Header bg, search, notification panel
- `src/frontend/src/components/shared/mobile-menu.tsx` - Mobile overlay, menu items
- `src/frontend/src/components/shared/page-layout.tsx` - Main content area bg

### Page Components (modify for `dark:` variants) - 40+ files
- `src/frontend/src/components/profile/` (7 files) - Profile header, tabs, section cards, data grid
- `src/frontend/src/components/leave/` (8 files) - Leave forms, calendar, history tables
- `src/frontend/src/components/payroll/` (3 files) - Payroll tables, processing cards
- `src/frontend/src/components/manager-dashboard/` (6 files) - Summary cards, calendar, org chart
- `src/frontend/src/components/quick-approve/` (5 files) - Request list, slide-over, bulk actions
- `src/frontend/src/components/claims/medical-claims-page.tsx` - Claims form wizard
- `src/frontend/src/components/hospital-referral/` (4 files) - Referral forms, letter preview
- `src/frontend/src/components/workflows/` (3 files) - Workflow list, detail modal
- `src/frontend/src/components/recruitment/` (2 files) - Recruitment, screening
- `src/frontend/src/components/settings/` (3 files) - Settings, geofencing, workflow config
- All remaining page components (idp, learning, location, onboarding, performance, resignation, succession, talent, time, training)

## Implementation Phases

### Phase 1: Foundation - CSS Variables & Theme Infrastructure
Define semantic color tokens in `globals.css` using CSS custom properties that swap in `.dark` context. Create `ThemeProvider` component and `use-theme` hook. Wire into root layout.

**Dark color palette decisions:**
| Token | Light | Dark |
|-------|-------|------|
| `--surface-primary` | `#FFFFFF` | `#1a1a2e` |
| `--surface-secondary` | `#F5F5F5` (cg-light) | `#16213e` |
| `--surface-tertiary` | `#F9FAFB` (gray-50) | `#1e2a47` |
| `--text-primary` | `#333333` (cg-dark) | `#e4e4e7` |
| `--text-secondary` | `#6B7280` (gray-500) | `#a1a1aa` |
| `--text-muted` | `#9CA3AF` (gray-400) | `#71717a` |
| `--border-default` | `#f0f0f0` | `#2d3748` |
| `--border-strong` | `#D1D5DB` (gray-300) | `#4a5568` |
| `cg-red` | `#C8102E` | `#C8102E` (unchanged - brand constant) |
| `cg-red` hover | `#a80d26` | `#e0334a` (lighter for dark bg) |

### Phase 2: Core Implementation - UI Primitives & Layout
Update all 8 UI primitive components and 4 layout components with `dark:` Tailwind variants. This gives the widest coverage since all pages compose from these components.

### Phase 3: Integration & Polish - Page Components, Settings UI, Testing
Sweep all 40+ page components for inline colors. Add theme toggle to Settings and Header. Run E2E validation for visual correctness in both themes.

## Team Orchestration

- You operate as the team lead and orchestrate the team to execute the plan.
- You're responsible for deploying the right team members with the right context to execute the plan.
- IMPORTANT: You NEVER operate directly on the codebase. You use `Task` and `Task*` tools to deploy team members to to the building, validating, testing, deploying, and other tasks.
  - This is critical. You're job is to act as a high level director of the team, not a builder.
  - You're role is to validate all work is going well and make sure the team is on track to complete the plan.
  - You'll orchestrate this by using the Task* Tools to manage coordination between the team members.
  - Communication is paramount. You'll use the Task* Tools to communicate with the team members and ensure they're on track to complete the plan.
- Take note of the session id of each team member. This is how you'll reference them.

### Team Members

- Builder
  - Name: builder-css-infra
  - Role: Implements CSS variables, ThemeProvider, use-theme hook, and root layout wiring
  - Agent Type: builder
  - Resume: true

- Builder
  - Name: builder-ui-primitives
  - Role: Updates all 8 UI primitive components (card, button, badge, modal, tabs, form-field, skeleton, toast) with dark: variants
  - Agent Type: builder
  - Resume: true

- Builder
  - Name: builder-layout
  - Role: Updates layout components (sidebar, header, mobile-menu, page-layout) and settings page theme toggle
  - Agent Type: builder
  - Resume: true

- Builder
  - Name: builder-pages-group-a
  - Role: Updates profile, leave, payroll, manager-dashboard page components with dark: variants
  - Agent Type: builder
  - Resume: true

- Builder
  - Name: builder-pages-group-b
  - Role: Updates quick-approve, claims, hospital-referral, workflows, recruitment, settings page components with dark: variants
  - Agent Type: builder
  - Resume: true

- Builder
  - Name: builder-pages-group-c
  - Role: Updates remaining page components (idp, learning, location, onboarding, performance, resignation, succession, talent, time, training, hrbp, spd) with dark: variants
  - Agent Type: builder
  - Resume: true

- Validator
  - Name: validator-dark-theme
  - Role: Validates all dark theme changes across components, checks contrast ratios, verifies no regressions
  - Agent Type: validator
  - Resume: false

## Step by Step Tasks

- IMPORTANT: Execute every step in order, top to bottom. Each task maps directly to a `TaskCreate` call.
- Before you start, run `TaskCreate` to create the initial task list that all team members can see and execute.

### 1. CSS Variables & Dark Theme Foundation
- **Task ID**: css-foundation
- **Depends On**: none
- **Assigned To**: builder-css-infra
- **Agent Type**: builder
- **Parallel**: false
- Update `src/frontend/src/app/globals.css`:
  - Add CSS custom properties under `@theme` for semantic tokens: `--color-surface-primary`, `--color-surface-secondary`, `--color-surface-tertiary`, `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-border-default`, `--color-border-strong`
  - Add `.dark` class override block that swaps all values to dark palette
  - Keep `cg-red` unchanged (brand constant)
  - Add `--color-cg-red-hover: #a80d26` for light and `#e0334a` for dark
- Ensure Tailwind v4 picks up these tokens so `bg-surface-primary`, `text-text-primary`, etc. are usable utilities

### 2. ThemeProvider & use-theme Hook
- **Task ID**: theme-provider
- **Depends On**: css-foundation
- **Assigned To**: builder-css-infra
- **Agent Type**: builder
- **Parallel**: false
- Create `src/frontend/src/hooks/use-theme.ts`:
  - Read theme from `useUIStore`
  - Listen to `window.matchMedia('(prefers-color-scheme: dark)')` for `system` mode
  - Compute resolved theme: if `system`, use media query result; otherwise use store value
  - Return `{ theme, resolvedTheme, setTheme }`
- Create `src/frontend/src/components/shared/theme-provider.tsx`:
  - Client component that wraps children
  - On mount: read from `localStorage('theme')` and call `useUIStore.setTheme()`
  - Use `useEffect` to apply/remove `dark` class on `document.documentElement`
  - Persist changes to localStorage when theme changes
  - Include inline `<script>` to prevent FOUC (flash of unstyled content) by checking localStorage before React hydrates
- Update `src/frontend/src/app/layout.tsx`:
  - Add `suppressHydrationMismatch` to `<html>` element
  - Wrap body content with `<ThemeProvider>`
- Update `src/frontend/src/stores/ui-store.ts`:
  - No changes needed -- store already has theme state

### 3. Update UI Primitive Components
- **Task ID**: ui-primitives
- **Depends On**: css-foundation
- **Assigned To**: builder-ui-primitives
- **Agent Type**: builder
- **Parallel**: true (can run alongside theme-provider)
- Update each UI component with `dark:` variants:
  - **card.tsx**: `bg-white` -> add `dark:bg-gray-800 dark:border-gray-700`, shadow adjustments
  - **button.tsx**: Secondary `bg-gray-100` -> `dark:bg-gray-700 dark:text-gray-200`; Outline `border-gray-300` -> `dark:border-gray-600 dark:text-gray-200`; Ghost hover `dark:hover:bg-gray-700`; Destructive stays red in both
  - **badge.tsx**: Each variant (success/warning/error/info/neutral) needs dark bg/text. e.g. success: `dark:bg-green-900/30 dark:text-green-400`
  - **modal.tsx**: Backdrop stays dark; panel `bg-white` -> `dark:bg-gray-800`; text colors, dividers
  - **tabs.tsx**: Active tab border `border-cg-red` stays; inactive text `dark:text-gray-400`; tab bar border `dark:border-gray-700`
  - **form-field.tsx**: Input `bg-white border-gray-300` -> `dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200`; placeholder `dark:placeholder-gray-500`; select/combobox dropdown `dark:bg-gray-800`; disabled `dark:bg-gray-900`; label `dark:text-gray-300`; error text stays `text-cg-error`
  - **skeleton.tsx**: Base `bg-gray-200` -> `dark:bg-gray-700`; pulse animation color
  - **toast.tsx**: Toast bg/text per variant; success/error/info/warning dark variants

### 4. Update Layout Components
- **Task ID**: layout-components
- **Depends On**: theme-provider
- **Assigned To**: builder-layout
- **Agent Type**: builder
- **Parallel**: true (can run alongside ui-primitives if theme-provider is done)
- **sidebar.tsx**: `bg-white` -> `dark:bg-gray-900`; border `dark:border-gray-700`; active item `bg-cg-red/10 text-cg-red` stays; inactive `dark:text-gray-400 dark:hover:bg-gray-800`; section headings `dark:text-gray-500`
- **header.tsx**: `bg-white` -> `dark:bg-gray-900`; shadow -> `dark:shadow-gray-900/50`; search input dark; notification dropdown `dark:bg-gray-800`; user menu dropdown `dark:bg-gray-800`; text colors
- **mobile-menu.tsx**: Overlay backdrop stays; menu `bg-white` -> `dark:bg-gray-900`; items same pattern as sidebar
- **page-layout.tsx**: Main area `bg-cg-light` -> `dark:bg-gray-950`; access denied card dark variant
- **layout.tsx** (root): Body class `bg-cg-light text-cg-dark` -> add `dark:bg-gray-950 dark:text-gray-100`

### 5. Add Theme Toggle to Settings & Header
- **Task ID**: theme-toggle-ui
- **Depends On**: theme-provider, layout-components
- **Assigned To**: builder-layout
- **Agent Type**: builder
- **Parallel**: false
- Add theme selector `FormField` (type=select) to System tab in `settings-page.tsx`:
  - Options: Light, Dark, System Default (using existing i18n keys)
  - Wire to `useUIStore.setTheme()`
- Add a small theme toggle icon button to `header.tsx`:
  - Sun icon for light, Moon icon for dark, Monitor icon for system
  - Cycles through light -> dark -> system on click
  - Tooltip showing current theme name
- Verify i18n keys in `en.json` and `th.json` are complete for theme labels

### 6. Update Page Components - Group A (Profile, Leave, Payroll, Manager Dashboard)
- **Task ID**: pages-group-a
- **Depends On**: ui-primitives
- **Assigned To**: builder-pages-group-a
- **Agent Type**: builder
- **Parallel**: true
- For each file, add `dark:` variants to inline color classes not covered by UI primitives:
  - `src/frontend/src/components/profile/` (7 files): profile-header.tsx, profile-tabs.tsx, section-card.tsx, data-grid.tsx, org-chart.tsx, and tabs/ (personal-info, employment, compensation, benefits, scorecard, profile-details)
  - `src/frontend/src/components/leave/` (8 files): leave-balance.tsx, leave-calendar.tsx, leave-detail.tsx, leave-detail-modal.tsx, leave-form.tsx, leave-history.tsx, leave-request-form.tsx, leave-tabs.tsx
  - `src/frontend/src/components/payroll/` (3 files): payroll-processing.tsx, payroll-setup.tsx, government-reports.tsx
  - `src/frontend/src/components/manager-dashboard/` (6 files): TeamSummaryCards.tsx, PendingApprovalsPanel.tsx, TeamCalendar.tsx, TeamMemberGrid.tsx, MiniOrgChart.tsx, UrgentAlertBanner.tsx
  - `src/frontend/src/components/manager/` (2 files): manager-dashboard-page.tsx, quick-approve-page.tsx
- Pattern: `bg-white` -> add `dark:bg-gray-800`; `text-gray-600` -> add `dark:text-gray-400`; `border-gray-200` -> add `dark:border-gray-700`; `bg-gray-50` -> add `dark:bg-gray-800/50`; `hover:bg-gray-50` -> add `dark:hover:bg-gray-700/50`
- Preserve all `text-cg-red` and `bg-cg-red` usages (brand color works in both themes)
- Tables: header row `bg-gray-50` -> `dark:bg-gray-800`; row borders `dark:border-gray-700`; hover `dark:hover:bg-gray-700/30`

### 7. Update Page Components - Group B (Quick Approve, Claims, Hospital, Workflows, Recruitment, Settings)
- **Task ID**: pages-group-b
- **Depends On**: ui-primitives
- **Assigned To**: builder-pages-group-b
- **Agent Type**: builder
- **Parallel**: true (runs alongside pages-group-a)
- Files to update:
  - `src/frontend/src/components/quick-approve/` (5 files): BulkActionBar.tsx, DelegationModal.tsx, RequestList.tsx, RequestSlideOver.tsx, UrgencyBadge.tsx
  - `src/frontend/src/components/claims/medical-claims-page.tsx`
  - `src/frontend/src/components/hospital-referral/` (4 files): referral-detail.tsx, referral-history.tsx, referral-letter-preview.tsx, referral-request-form.tsx
  - `src/frontend/src/components/workflows/` (3 files): workflow-list.tsx, workflow-detail.tsx, workflow-detail-modal.tsx
  - `src/frontend/src/components/recruitment/` (2 files): recruitment-page.tsx, screening-page.tsx
  - `src/frontend/src/components/settings/` (3 files): settings-page.tsx, geofencing-config.tsx, workflow-config.tsx
- Same pattern as Group A for color replacements

### 8. Update Page Components - Group C (Remaining Pages)
- **Task ID**: pages-group-c
- **Depends On**: ui-primitives
- **Assigned To**: builder-pages-group-c
- **Agent Type**: builder
- **Parallel**: true (runs alongside groups A and B)
- Files to update:
  - `src/frontend/src/components/idp/idp-page.tsx`
  - `src/frontend/src/components/learning/learning-page.tsx`
  - `src/frontend/src/components/location/location-page.tsx`
  - `src/frontend/src/components/onboarding/onboarding-page.tsx`
  - `src/frontend/src/components/performance/performance-page.tsx`
  - `src/frontend/src/components/resignation/resignation-page.tsx`
  - `src/frontend/src/components/succession/succession-page.tsx`
  - `src/frontend/src/components/talent/talent-page.tsx`
  - `src/frontend/src/components/time/overtime-page.tsx`
  - `src/frontend/src/components/time/time-page.tsx`
  - `src/frontend/src/components/training/training-records.tsx`
  - `src/frontend/src/components/hrbp/hrbp-reports-page.tsx`
  - `src/frontend/src/components/spd/spd-management-page.tsx`
- Same pattern as Group A for color replacements

### 9. Final Validation
- **Task ID**: validate-all
- **Depends On**: css-foundation, theme-provider, ui-primitives, layout-components, theme-toggle-ui, pages-group-a, pages-group-b, pages-group-c
- **Assigned To**: validator-dark-theme
- **Agent Type**: validator
- **Parallel**: false
- Verify `globals.css` has correct dark theme variables
- Verify `ThemeProvider` component exists and is wired in root layout
- Verify `use-theme` hook exists with system preference detection
- Verify all 8 UI primitives have `dark:` variants
- Verify all 4 layout components have `dark:` variants
- Verify theme toggle exists in both Settings page and Header
- Verify i18n keys are complete in both `en.json` and `th.json`
- Grep for remaining un-dark-ified `bg-white` without adjacent `dark:` in component files
- Run `npm run build` in `src/frontend/` to verify no TypeScript/build errors
- Spot-check 5 representative pages for completeness

## Acceptance Criteria
- [ ] Theme can be toggled between Light, Dark, and System Default from both the Settings page (System tab) and a header icon button
- [ ] Selected theme persists across page refreshes and browser sessions via localStorage
- [ ] System Default mode correctly follows the OS `prefers-color-scheme` setting and responds to changes
- [ ] No flash of unstyled content (FOUC) on page load -- theme applied before React hydrates
- [ ] All 8 UI primitive components render correctly in dark mode with proper contrast
- [ ] All 4 layout components (sidebar, header, mobile-menu, page-layout) render correctly in dark mode
- [ ] All 40+ page components have `dark:` variants for inline color classes
- [ ] Central Group brand color (`cg-red` #C8102E) is preserved and visible in both themes
- [ ] Tables, forms, modals, dropdowns, and tooltips all have appropriate dark backgrounds and text colors
- [ ] `npm run build` passes with zero errors
- [ ] No `bg-white` class exists without a corresponding `dark:` variant in any component file under `src/components/`

## Validation Commands
Execute these commands to validate the task is complete:

- `cd src/frontend && npm run build` - Verify the app builds without errors
- `grep -r "bg-white" src/frontend/src/components/ --include="*.tsx" -l` - List files still using `bg-white` (each should also have `dark:bg-*`)
- `grep -rn "bg-white" src/frontend/src/components/ --include="*.tsx" | grep -v "dark:"` - Find `bg-white` without adjacent `dark:` variant (should be zero or near-zero)
- `grep -c "dark:" src/frontend/src/components/ui/*.tsx` - Confirm all UI primitives have dark variants
- `grep -c "dark:" src/frontend/src/components/shared/*.tsx` - Confirm all layout components have dark variants
- `test -f src/frontend/src/components/shared/theme-provider.tsx && echo "EXISTS" || echo "MISSING"` - Verify ThemeProvider exists
- `test -f src/frontend/src/hooks/use-theme.ts && echo "EXISTS" || echo "MISSING"` - Verify use-theme hook exists
- `grep -c "theme" src/frontend/src/app/layout.tsx` - Verify theme wiring in root layout

## Notes
- **Brand color preservation**: `cg-red` (#C8102E) must NOT change between themes. It has sufficient contrast on both light and dark backgrounds. However, hover states may need adjustment (lighter in dark mode for visibility).
- **FOUC prevention**: The ThemeProvider should inject a blocking `<script>` that reads localStorage and applies the `dark` class before React hydrates. This is a common Next.js pattern.
- **Tailwind v4**: This project uses Tailwind v4 with `@theme` blocks (not `tailwind.config.js`). CSS variables defined in `@theme` are automatically available as utilities.
- **No new dependencies needed**: Tailwind's built-in `dark:` variant with class strategy is sufficient. No need for `next-themes` or similar packages.
- **Zustand store**: Already has `theme` state and `setTheme` action -- no store changes needed, only localStorage persistence in the provider.
- **i18n keys**: Theme translation keys already exist in both `en.json` and `th.json`. Verify they include: `settings.theme`, `settings.themeLight`, `settings.themeDark`, `settings.themeSystem`.
