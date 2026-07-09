# Spec: Atomic-design reorg of the Humi design system (Phase 7a)

**Owner of execution:** Codex CLI. **Owner of spec + verification:** Claude.
**Working tree:** `/Users/tachongrak/Projects/hr-cleanup` (branch `chore/production-grade-cleanup`).
**Run all commands from** `src/frontend/`.

## Goal
Give `src/frontend/src/components/humi/` an Atomic-Design internal structure
(`atoms/`, `molecules/`, `organisms/`) **without changing its public import path**.
The barrel `components/humi/index.ts` is imported by 225 files via `@/components/humi`
— those 225 imports MUST keep working untouched.

## Hard constraints (do NOT violate)
1. **Preserve the public API.** `import { Button, Card, ... } from '@/components/humi'`
   must resolve exactly as before. Only the barrel's INTERNAL relative paths change
   (`from './Button'` → `from './atoms/Button'`).
2. **Do NOT touch `components/ui/`** this round. Its merge into humi (and the
   FormField vs `ui/form-field` vs `ui/field` duplication) is a separate,
   judgment-heavy step deferred to a human decision. Leave `ui/` exactly as-is.
3. **Do NOT delete or merge any component.** This is a MOVE + re-path only.
4. **Keep `components/humi/shell/`** where it is (it is already a coherent
   organism group: AppShell, Sidebar, Topbar, CommandPalette, LoginAsRibbon,
   PersonaSwitcher). Do not move shell files.
5. **Keep `components/humi/__tests__/`** working — update any relative import in
   those tests that points at a moved file.
6. No new dependencies. No design/behaviour changes. No hex (Humi design hook
   blocks raw hex).

## File → layer mapping (apply this categorization)
Move each `components/humi/*.tsx` into a subfolder:

- **atoms/** (single-purpose primitives): `Button.tsx`, `Avatar.tsx`, `Toggle.tsx`,
  `Textarea.tsx`, `Capability.tsx`
- **molecules/** (small compositions of atoms): `Card.tsx`, `FormField.tsx`,
  `EmptyState.tsx`, `FileUploadField.tsx`, `Nav.tsx`, `QuickActionsTile.tsx`,
  `DemoValuesDisclaimer.tsx`
- **organisms/** (complex / stateful widgets): `DataTable.tsx`, `Modal.tsx`,
  `LeaveRangeCalendar.tsx`, `ClaimStepper.tsx`, `CancelRequestModal.tsx`,
  `NotificationBell.tsx`, `TodoBell.tsx`, `ModuleContextStrip.tsx`

If a file is not in this list, place it by the same rule and note it in the report.
(`AppShell.tsx` at the humi root, if present, is a duplicate re-export of
`shell/AppShell` — leave it in place; do not move.)

## Steps
1. `git mv` each primitive into `atoms/` | `molecules/` | `organisms/` per the map.
2. Update the INTERNAL relative paths in `components/humi/index.ts` to the new
   subfolder locations. External exports (the names) stay identical.
3. Fix the ~48 files that import humi via DEEP paths (`@/components/humi/<Name>`
   or relative `../humi/<Name>`) to point at the new subfolder path. Find them:
   `grep -rln "components/humi/[A-Z]" src --include='*.ts' --include='*.tsx'`
   (prefer redirecting them through the barrel `@/components/humi` where the symbol
   is exported there; only use the deep subfolder path when it isn't).
4. Update relative imports inside `components/humi/__tests__/` for moved files.

## Verification (all must pass; run from src/frontend/)
- `npm run build` — green (this is the real typecheck gate; a wrong path fails here).
- `npm run lint` — 0 errors (warnings OK; do not add new errors).
- `npx vitest run` — failure count must stay **83 failed / 22 files** (the current
  origin/master baseline). Do NOT introduce new failures. If a test breaks solely
  because of a moved import path, fix the import; do not edit assertions.
- `grep -rc "from '@/components/humi'" src | ...` sanity: the 225 barrel importers
  are unchanged.

## Out of scope (leave for humans / later phases)
- Merging `components/ui/` into humi + deduping FormField/field/form-field.
- Moving feature-specific organisms (ClaimStepper, LeaveRangeCalendar,
  CancelRequestModal, TodoBell) OUT of the design system into their domain folders
  — that changes the barrel's public exports and needs a separate decision.

## Deliverable
One commit on `chore/production-grade-cleanup`:
`refactor(humi): atomic-design internal structure (atoms/molecules/organisms) — public @/components/humi API unchanged`
Then report: files moved per layer, deep-import sites fixed, and the build/lint/vitest results.
