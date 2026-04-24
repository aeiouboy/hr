# HR Wave 1 — Surgical Cleanup Batch

**Tracking**: aeiouboy/hr#71
**Spec author**: JARVIS (direct, per #46/47/48 pattern for tight-scope batch)
**Created**: 2026-04-24

## Task Description

Close 4 cleanup issues in one coordinated batch — all surgical, independent, low-risk:
- #55 Fix RIS walkthrough doc route reference
- #56 Delete dead Zod enums in `lifecycleSchema.ts`
- #58 Roll `AttachmentDropzone` to 4 lifecycle routes
- #60 Audit Zustand persist stores for `_hasHydrated` guard propagation

## Objective

Ship 4 closed issues with 0 net test regression + E2E smoke pass on AttachmentDropzone-converted routes. Batch justified because all 4 = C1 surgical, no shared code surface, parallel-safe.

## Tech Stack

- Next.js 16 App Router (React 19)
- TypeScript strict mode
- Zustand v4 persist middleware
- Tailwind v4 + Humi design system (primary = teal/accent)
- Vitest + jsdom for unit tests, browser-harness for E2E
- Lucide icons, `@/components/admin/AttachmentDropzone/AttachmentDropzone`

## Relevant Files

**#55 walkthrough doc**
- `projects/hr-platform-replacement/RIS-WALKTHROUGH-2026-04-24.md` (modify ESS section)

**#56 dead Zod enums**
- `src/frontend/src/lib/admin/validation/lifecycleSchema.ts` (delete 3 schemas: transfer/terminate/rehire — 229 lines total)
- `src/__tests__/admin/lifecycleSchema.test.ts` (delete corresponding tests)

**#58 AttachmentDropzone rollout**
- `src/frontend/src/app/[locale]/admin/employees/[id]/transfer/page.tsx`
- `src/frontend/src/app/[locale]/admin/employees/[id]/rehire/page.tsx`
- `src/frontend/src/app/[locale]/admin/employees/[id]/contract-renewal/page.tsx`
- `src/frontend/src/app/[locale]/admin/employees/[id]/promotion/page.tsx`
- Reference pattern: `src/frontend/src/app/[locale]/admin/employees/[id]/terminate/page.tsx` (already uses AttachmentDropzone per #50)

**#60 Zustand audit**
- Audit: `src/frontend/src/stores/*.ts` + `src/frontend/src/lib/admin/store/*.ts` (18 persist stores)
- Reference fix: `src/frontend/src/stores/auth-store.ts` (has `_hasHydrated` via #48)

## Team Orchestration

### Team Members

| Mark | Role | Scope |
|---|---|---|
| **MK III Builder** (A) | #55 + #56 fix | Doc patch + dead code removal (2 files, safe, independent) |
| **Forge Frontend** (B) | #58 AttachmentDropzone rollout | 4 lifecycle routes, follow expertise.yaml pattern |
| **MK V Researcher** (C) | #60 Zustand audit | Grep consumers for sync decisions, report which stores need guard |
| **MK VI Test Writer** | Test coverage | Unit tests for #56 removal + #58 render smoke |
| **MK IV Validator** | Review + validate + E2E screenshots | Full verification |

## Step by Step Tasks

| Task ID | Title | Depends On | Assigned To | Parallel |
|---|---|---|---|---|
| T1 | Fix RIS walkthrough doc #55 | — | MK III (A) | ✅ |
| T2 | Delete dead Zod enums #56 | — | MK III (A) | ✅ |
| T3 | Convert 4 routes to AttachmentDropzone #58 | — | Forge Frontend (B) | ✅ |
| T4 | Audit Zustand persist stores #60 | — | MK V (C) | ✅ |
| T5 | Apply `_hasHydrated` guard based on T4 findings | T4 | MK III (A) if fixes needed | No |
| T6 | Write regression tests | T2, T3 | MK VI | No |
| T7 | Code review | T1-T6 | MK IV dual-role | No |
| T8 | E2E + AC verification | T7 | MK IV | No |

## Pipeline

Phase 0 → Phase 0.5 → Phase 1 → Phase 1.5 → Phase 2 (parallel T1/T2/T3/T4) → Phase 2.5 (dry-run build) → Phase 3a (MK VI writes) → Phase 3b (JARVIS runs) → Phase 3c (evidence) → Phase 4 Code Review → Phase 5 Validate Final → Phase 5b Close (close #71 + #55 + #56 + #58 + #60) → Phase 6b Learn

## Acceptance Criteria

### AC-1 (#55) — Walkthrough doc route reference corrected
- `RIS-WALKTHROUGH-2026-04-24.md` references only existing routes
- grep `/employees/me/profile` returns 0 hits in walkthrough doc
- `/profile/me` or `/employees/me` (actual existing paths) used instead

### AC-2 (#56) — Dead Zod enums deleted
- `lifecycleSchema.ts` no longer exports transferSchema / terminateSchema / rehireSchema
- Corresponding tests in `lifecycleSchema.test.ts` removed (no orphan tests)
- `bunx tsc --noEmit` clean for affected files

### AC-3 (#58) — AttachmentDropzone rolled to 4 routes
- transfer/rehire/contract-renewal/promotion all import `AttachmentDropzone`
- No raw `<input type="file">` for attachment fields in these 4 pages
- Each route renders without runtime error (browser-harness screenshot per route)

### AC-4 (#60) — Zustand audit + conditional fix
- Audit report at `specs/hr-wave1-zustand-audit.md` listing each persist store + sync-consumer risk
- Fixes applied ONLY to stores with confirmed sync race (0 stores = valid if audit clean)
- auth-store (reference) still works — regression check

### AC-5 (overall) — Quality gates
- `bunx tsc --noEmit` 0 new errors in touched files
- Test suite: 0 regression beyond pre-existing 75 failures (#59 baseline)
- E2E smoke via browser-harness: 4 attachment-dropzone routes render

## Validation Commands

```bash
cd /Users/tachongrak/Projects/hr/src/frontend

# Type check
bunx tsc --noEmit 2>&1 | grep -v "\.next" | tail -20

# Unit tests
bunx vitest run 2>&1 | tail -10

# #58 E2E smoke (browser-harness via real Chrome)
# For each route: new_tab + wait_for_load + screenshot to test-artifacts/71/ac-3-<route>.png

# #55 grep verification  
grep -c "/employees/me/profile" projects/hr-platform-replacement/RIS-WALKTHROUGH-2026-04-24.md
# Must be 0

# #56 dead code verification
grep -E "transferSchema|terminateSchema|rehireSchema" src/frontend/src/lib/admin/validation/lifecycleSchema.ts
# Must be 0 matches
```

## Out of Scope (explicit)

- #52 admin/jobs + admin/positions domain rules → Wave 2
- #53 ESS Personal Data edit → Wave 3
- #54 ESS Change Request workflow → Wave 3
- #57 event reason picklist → partial BA-block, defer
- #59 75 test regressions forensic → Wave 4 (uncertain scope)
- #61 BA decisions umbrella → external blocker
- #62-#70 P-B1..P-B9 Sprint 2 chain → Ken infra decision blocker
