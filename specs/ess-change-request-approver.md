# ESS Change Request Approver — admin queue + approve/reject

**Tracking**: aeiouboy/hr#54
**Seed**: `specs/ess-change-request-approver.seed.json`
**Depends on**: aeiouboy/hr#53 closed 2026-04-25 (commit `469d057`) — employee submit flow at `/profile/me` creates `PendingChange` with `sectionKey` via `submitChangeRequest()`

---

## Task Description

`/admin/self-service/` has config subsurfaces (field-config / visibility / mandatory / readonly / quick-actions / tiles / layout) but **no approver queue**. `humi-profile-slice.ts` has `adminApprove(id)` and `adminReject(id)` actions that are **currently called from zero UI consumers** — they exist but no one uses them.

#54 builds the bridge: a dedicated admin page at `/admin/change-requests` that lists all pending profile-data CRs (created by #53's 5 section editors), groups by `sectionKey`, and lets HR admins approve or reject with optional reason. The store is extended additively with `adminApproveWithReason(id, reason?)` and `adminRejectWithReason(id, reason?)` — existing signatures preserved for non-breaking change.

**DO NOT unify** with `/workflows/page.tsx` (generic leave/OT via `use-workflows` hook) or `/ess/workflows/page.tsx` (5-persona journey via `workflow-approvals` store). Those are separate domains. `humi-profile-slice.pendingChanges` is the ONE source for profile-data CRs.

## Objective

Ship a greenfield approver surface that closes the employee-to-admin loop for personal-data CRs introduced by #53, adding the missing approve/reject actions with audit reason. Must route through `humi-profile-slice`, must group by `sectionKey`, must preserve C7 SSoT boundary vs the two coexisting workflow systems.

## Tech Stack

- Next.js 16 App Router (`src/frontend/src/app/[locale]/admin/change-requests/`)
- React 19 + TypeScript 5
- Zustand 4 (existing `humi-profile-slice`, extend additively)
- `@/components/humi` primitives — Button, Card, Modal, FormField
- next-intl for i18n; append `ess.approver.*` keys to `messages/th.json` + `en.json`
- vitest + @testing-library/react

## Relevant Files

### Read-only (understand shape)
- `src/frontend/src/stores/humi-profile-slice.ts` — existing pendingChanges state, adminApprove/adminReject actions (lines 125, 137, 212, 216); FileAttachment shape (line ~25)
- `src/frontend/src/app/[locale]/admin/layout.tsx` — admin shell (for nav link discovery)
- `src/frontend/src/app/[locale]/admin/self-service/page.tsx` — existing self-service admin config
- `src/frontend/messages/th.json` + `en.json` — existing `ess.*` branch (from #53)

### Files to EDIT (surgical)
- `src/frontend/src/stores/humi-profile-slice.ts` — add `adminApproveWithReason(id, reason?)` + `adminRejectWithReason(id, reason?)`; keep existing `adminApprove`/`adminReject` as thin wrappers; extend `PendingChange` with optional `reason?: string`. NO version bump required (additive-only; v2 shape includes optional field).
- `src/frontend/messages/th.json` + `en.json` — append `ess.approver.*` keys

### Files to CREATE (new)
- `src/frontend/src/app/[locale]/admin/change-requests/page.tsx` — approver list view
- `src/frontend/src/components/admin/change-requests/ChangeRequestCard.tsx` — item card with approve/reject + attachment list
- `src/frontend/src/components/admin/change-requests/ReasonModal.tsx` — shared approve/reject reason capture
- Tests: `src/frontend/src/__tests__/approver-list.test.tsx`, `reason-modal.test.tsx`, `humi-profile-slice.approve-reject.test.ts`

### Files NOT touched
- `src/frontend/src/hooks/use-workflows.ts` — generic workflows (leave/OT) — different domain
- `src/frontend/src/stores/workflow-approvals.ts` — 5-persona journey store — different domain
- `src/frontend/src/app/[locale]/workflows/page.tsx` — generic workflow admin
- `src/frontend/src/app/[locale]/ess/workflows/page.tsx` — employee workflows view

## Team Orchestration

### Team Members

| Mark | Phase | Deliverable |
|---|---|---|
| **MK III — Builder** | T1 | Extend humi-profile-slice (PendingChange.reason + adminApproveWithReason/RejectWithReason additive variants; preserve existing wrappers) |
| **Forge Frontend — UI Builder** | T2 | Create `/admin/change-requests/page.tsx` + ChangeRequestCard + ReasonModal + i18n keys |
| **MK VI — Test Writer** | T3 | Vitest — store extensions, list render grouping, modal flow, live-update on approve |
| **MK IV — Validator** | T4 | Review + validate + browser-harness screenshots + outcomes.json for G3 |

## Step by Step Tasks

| Task ID | Description | Depends On | Assigned To | Parallel |
|---|---|---|---|---|
| T1 | Extend `humi-profile-slice.ts`: add `reason?: string` to PendingChange; add `adminApproveWithReason(id, reason?)` + `adminRejectWithReason(id, reason?)` that set reason+approvedAt+status; change existing `adminApprove(id)`/`adminReject(id)` to delegate to With-Reason variants with undefined reason (preserve callers). Max 1 file. | — | MK III — Builder | false |
| T2 | Create 3 new files: `/admin/change-requests/page.tsx` (list of pendingChanges grouped by sectionKey; history section below; empty state; header with pending count badge), `ChangeRequestCard.tsx` (diff display, attachment thumbnails, approve/reject buttons), `ReasonModal.tsx` (textarea + mode toggle + confirm/cancel). Append `ess.approver.*` i18n keys (~15 keys: list.title / list.pending / list.history / list.empty / card.approve / card.reject / card.oldValue / card.newValue / card.effectiveDate / card.attachments / modal.approveTitle / modal.rejectTitle / modal.reasonLabel / modal.reasonRequired / modal.confirm / modal.cancel). Max 5 files (3 new components + 2 i18n). | T1 | Forge Frontend | false |
| T3 | Vitest: `humi-profile-slice.approve-reject.test.ts` (with-reason variants + reason persist + legacy wrappers still work); `approver-list.test.tsx` (grouping by sectionKey + empty state + live update); `reason-modal.test.tsx` (open/close + required-for-reject validation). Write only. Max 3 test files. | T2 | MK VI — Test Writer | false |
| T4 | Code Review C1/C3/C6/C7/C8/C10 + JARVIS-runs-tests (Bash, Phase 3b) + browser-harness screenshots for AC-1/2/4/5 at `/admin/change-requests` + outcomes.json for G3 + Validate Final verdict. | T3 | MK IV — Validator | false |

## Pipeline

1. Phase 0 — issue #54 already open; kickoff comment on v1 entry
2. Phase 0.5 — Prior Knowledge via grep (3-store coexistence documented in seed brownfieldContext)
3. Phase 1 / 1.5 / 1.6 — spec + G1 PASS (this doc + seed)
4. Phase 2 Build — T1 → T2 (sequential: T2 imports adminApproveWithReason from T1)
5. Phase 2.5 Dry-run — `bun run build` + C10 grep + `tsc --noEmit`
6. Phase 3 Test — T3 MK VI writes; JARVIS runs `bun run test`
7. Phase 3c Evidence — capture to `test-artifacts/ironteam-54/test-output.txt`
8. Phase 4 Code Review — MK IV dual-role
9. Phase 5 Validate — MK IV screenshots via browser-harness (fallback Playwright) + outcomes.json
10. Phase 5a G3 Gate — gate-g3.ts; exit 1 → retry loop
11. Phase 5b Close — sprint-log row + `gh issue close #54`
12. Phase 6b Learn — Self-Improve MK III / Forge Frontend / MK IV / MK VI

## Acceptance Criteria

See `specs/ess-change-request-approver.seed.json` `acceptanceCriteria` (10 ACs — 3 invariants marked). Summary:

- **AC-1** — `/admin/change-requests/page.tsx` lists pending with employee/section/field/diff/effectiveDate/attachments
- **AC-2** — approve/reject open shared ReasonModal; confirm calls With-Reason variant
- **AC-3** — humi-profile-slice extended additively (invariant)
- **AC-4** — list grouped by sectionKey with Thai labels; empty state
- **AC-5** — history section (last 20 approved/rejected) with status chip + reason
- **AC-6** — live Zustand re-render on approve/reject (invariant)
- **AC-7** — attachments clickable (open base64 dataURL); filename + size
- **AC-8** — C10 Thai-primary (invariant)
- **AC-9** — vitest ≥ 1 passing test per AC-1/2/3/4/6
- **AC-10** — suite green vs post-#53 baseline (1217 pass / 9 fail floor)

## Validation Commands

```bash
# Dry-run (Phase 2.5)
cd /Users/tachongrak/Projects/hr/src/frontend && bun run build 2>&1 | tail -20
bunx tsc --noEmit 2>&1 | grep -v "^\.next" | head -20

# C10 sweep on new admin files
grep -rnE '[A-Z][a-z]+([ -][A-Z][a-z]+){1,}' src/frontend/src/app/\[locale\]/admin/change-requests/ src/frontend/src/components/admin/change-requests/ 2>&1 | grep -v '//' | grep -v 'import '

# Tests (Phase 3b — JARVIS runs)
cd /Users/tachongrak/Projects/hr && mkdir -p test-artifacts/ironteam-54
cd /Users/tachongrak/Projects/hr/src/frontend && bunx vitest run 2>&1 | tee ../../test-artifacts/ironteam-54/test-output.txt

# G3 (Phase 5a)
bun run /Users/tachongrak/stark/core/gate/bin/gate-g3.ts specs/ess-change-request-approver.seed.json test-artifacts/ironteam-54/outcomes.json

# Close gate (Phase 5b — only if exit 0)
gh issue close 54 --repo aeiouboy/hr --comment "..."
```

## Out of Scope

- Store unification (humi-profile-slice vs use-workflows vs workflow-approvals) — separate task
- Employee-side workflow list — `/ess/workflows/` already owns it
- Backend cron that applies approved CRs to employee master on effectiveDate
- Email / push notification triggers
- Bulk approve/reject
- Audit log persistence to backend
- Refactor of `/workflows/page.tsx` or `/ess/workflows/page.tsx`
