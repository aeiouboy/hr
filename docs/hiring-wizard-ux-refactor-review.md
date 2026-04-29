# Hiring Wizard UX Refactor — Review and Integration Notes

_Date: 2026-04-29_

This document captures the review lane for the Hiring wizard UX refactor described in:

- `.omx/plans/prd-hiring-wizard-ux-refactor.md`
- `.omx/plans/test-spec-hiring-wizard-ux-refactor.md`

The implementation scope is the Hire wizard under `src/frontend/src/app/[locale]/admin/hire`, the wizard store in `src/frontend/src/lib/admin/store/useHireWizard.ts`, shared wizard components in `src/frontend/src/components/admin/wizard`, and focused tests under `src/frontend/src/__tests__/admin` / `src/frontend/src/app/[locale]/admin/hire/**/__tests__`.

## Current baseline review

The baseline inspected by this worker keeps the existing 3-step wizard model and strict final submit validation, but it has not yet implemented the new UX requirements:

| Requirement | Baseline state | Integration expectation |
| --- | --- | --- |
| Frozen candidate/applicant context | `useHireWizard` persists `formData`, step metadata, and HRBP-related state only. No top-level `candidateContext` exists yet. | Add top-level `candidateContext` with idempotent `freezeCandidateContext`, non-overwriting conflict behavior, and reset/migration defaults. |
| Collapsible form sections | `ClusterWho.tsx` and `ClusterJob.tsx` render repeated `humi-card` + `SectionHeader` blocks. No reusable collapsible card exists yet. | Replace the repeated cards with `CollapsibleSectionCard` while keeping children mounted and preserving validation callback effects. |
| Browser back/forward step navigation | `HirePage` imports only `useRouter`; navigation is store-only through `goNext`, `goBack`, and `jumpTo`. | Add `?step=1|2|3` synchronization using store as source of truth, with locked-step canonicalization and loop guards. |
| Humi design-system contract | Existing cards use `humi-card`, `humi-step-section`, and token classes. | New UI must continue using token classes and avoid hardcoded colors / forbidden Tailwind red classes. |
| Existing validation invariants | Final submit still calls `isStepValid(1, true)`, `isStepValid(2, true)`, and HRBP validation. | Refactor must not let hidden/collapsed sections bypass strict submit checks. |

## Code quality checklist for implementation merge

Use this checklist when integrating the implementation and test lanes.

### Store and migration

- Bump the persisted store version from `8` to `9` only once.
- Keep `candidateContext` and `sectionCollapse` as top-level store metadata, not nested inside `formData`; the SuccessFactors mapper expects the existing `formData` shape.
- `freezeCandidateContext(snapshot)` must be idempotent for the same `candidateId` + `applicantId`, and must not overwrite a different frozen context.
- `clearCandidateContext()` should clear only candidate metadata; `reset()` should clear both `candidateContext` and `sectionCollapse` along with existing reset behavior.
- Migration from v8-shaped drafts must preserve existing `formData`, `currentStep`, `maxUnlockedStep`, `lastSavedAt`, and `employeeClassToggle`, while defaulting `candidateContext: null` and `sectionCollapse: {}`.

### Collapsible sections

- Stable section ids:
  - `who.identity`
  - `who.biographical`
  - `who.contact`
  - `who.emergencyContacts`
  - `who.globalInfo`
  - `who.workPermit`
  - `who.dependents`
  - `job.employeeInfo`
  - `job.assignment`
  - `job.compensation`
- Missing `sectionCollapse[id]` must mean expanded.
- `true` must mean collapsed.
- The toggle must be a real `<button type="button">` with `aria-expanded` and `aria-controls`.
- Collapsed content must stay mounted. Prefer an always-rendered content container with a documented hiding strategy over conditional rendering.
- Keep the existing step component ordering and `onValidChange` callbacks; validation effects depend on mounted children.

### URL step navigation

- Preserve locale path and unrelated query parameters when writing `step`.
- For button navigation, call the store action first, then mirror the actual resulting `currentStep` to the URL.
- For browser history / direct URL input:
  - accept only `1`, `2`, or `3`;
  - call `jumpTo(step)` only when the step is unlocked;
  - replace invalid or locked URLs with the actual current store step;
  - avoid push/replace loops when URL already matches store state.
- Direct `?step=3` must never unlock step 3 by itself.

### Candidate context UX

- Manual hires without `candidateId` must remain valid and must not require candidate context at submit time.
- With a candidate query and no frozen context, freeze exactly one snapshot.
- When the URL candidate differs from the frozen context, render a non-destructive conflict banner and keep the existing frozen draft unchanged.
- Optional prefill should be one-time, from the frozen snapshot only, and only into blank fields.

## Focused verification matrix

Run these checks from `src/frontend` after implementation lands:

```bash
npm test -- --run src/__tests__/admin/useHireWizard.test.ts
npm test -- --run src/__tests__/admin/hireSchema.test.ts
npm test -- --run src/components/admin/wizard/__tests__/CollapsibleSectionCard.test.tsx
npm test -- --run src/app/[locale]/admin/hire/clusters/__tests__/ClusterCollapsibleSections.test.tsx
npm test -- --run src/app/[locale]/admin/hire/__tests__/HirePage.navigation.test.tsx
npx tsc --noEmit
npm run build
```

If the route-level navigation mocks prove brittle, add a Playwright smoke test covering:

1. open `/admin/hire?step=1`;
2. navigate to step 2 and step 3 with wizard controls;
3. use browser back to return to step 2;
4. collapse and expand one section without losing a typed value.

## Review findings to watch during final integration

- `ClusterWho.tsx` currently repeats seven card wrappers; the collapsible conversion should reduce duplication but avoid introducing a configuration abstraction that hides step-specific validation callbacks.
- `ClusterJob.tsx` has only three sections; keep the same component order to avoid changing the user-facing data-entry path.
- `HirePage` currently resets the store after successful submit; if URL sync is added, reset should also canonicalize the URL back to step 1 or otherwise avoid leaving `?step=3` on a fresh empty draft.
- Confirmation navigation uses `router.push('/admin/employees/${submittedEmployeeId}')`; the refactor should not accidentally strip locale handling beyond the existing behavior.
- Existing final submit validation is intentionally strict while wizard movement is demo-friendly/loose. Do not gate normal step navigation on strict validation.
