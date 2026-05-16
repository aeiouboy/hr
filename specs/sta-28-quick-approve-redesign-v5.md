# Plan v5 — STA-28 Manager Persona (Gemini-redesigned, 2-PR split per Architect v4)

**Linear:** STA-28 https://linear.app/stark-xix/issue/STA-28
**Status:** In Review (PR #159 paused for refactor)
**Phase:** UI mockup สมบูรณ์ for HR Team confirmation. Backend SKIPPED.

## Architect v4 blocker resolutions

| Blocker | Resolution in v5 |
|---|---|
| Persona-aware default tab/Mine state | Baked into PR-B v2 AC (table below) |
| Smart Tabs predicate per persona | Defined in matrix below |
| Tab count memoization (single useMemo) | Mandatory implementation note in PR-B v2 |
| 2-PR split recommendation | **ACCEPTED** — see split below |
| Mobile safe-area floating toolbar | Hard-constraint line in PR-B v2 |

## Steelman split decision: ACCEPTED

PR-B v2 (Gemini's 4 patterns combined, ~700 LOC) → split into 2 PRs:

- **PR-B v2** (~400 LOC) — Smart Tabs (#1) + Contextual Bulk Toolbar (#4) only. Resolves the "เยอะเกินไป" complaint via tabs; adds bulk action.
- **PR-B v3** (~300 LOC) — Stacked Metadata (#2) + Progressive Filter Disclosure (#3). Polish, deferred until HR feedback signal arrives after PR-B v2 demo.

**Rationale:** Tabs alone resolve the #1 complaint. 400 LOC PR easier to review/rollback. HR feedback after Tabs may invalidate Stacked Metadata design — defer until signal arrives.

## Persona × default state matrix (PR-B v2 AC)

| Persona | Default Tab | "Show Only Mine" toggle |
|---|---|---|
| `manager` | `Action Required` | **ON** (filter to direct-reports' pending) |
| `hrbp` | `Watching` (or `All`) | **OFF** (cross-team queue) |
| `spd` | `Watching` (or `All`) | **OFF** (cross-team queue) |
| `hr_admin` | `All` | **OFF** |
| `hr_manager` | `All` | **OFF** |

Source: `src/frontend/src/lib/rbac.ts:49` (5-persona consumer list).

## Smart Tabs predicate matrix (persona × tab)

| Tab | Manager | HRBP / SPD | HR Admin / HR Manager |
|---|---|---|---|
| `Action Required` | `assignee === currentUserId` AND `status === pending` | `requesterDept ∈ partneredDepts` AND `escalatedToHR === false` | `escalatedToHR === true` OR `slaOverrun === true` |
| `Watching` | direct reports' indirect items (their reports' submissions) | `requesterDept ∈ partneredDepts` (full visibility) | `escalatedToHR === false` (full visibility) |
| `History` | last 90 days where `assignee === currentUserId` AND `status ∈ {approved, rejected, sent_back}` | last 90 days within `partneredDepts` | last 90 days all |

Implementation note: predicate functions live in `src/frontend/src/components/manager/quick-approve/predicates.ts` (NEW, ~60 LOC). Memoized via `useMemo` keyed on `(currentUserId, persona, dataset)`.

## Updated PR sequence (6 PRs total — was 5)

| # | Branch | Scope | LOC | Gate |
|---|---|---|---|---|
| **PR-A v2** | `feat/sta-28-manager-foundation` (force-push amend #159) | Drop inbox+audit stubs+sidebar entries; keep components+hook+enum+adapter+layout+team/reports stubs | ~350 (after drops) | none |
| **PR-B v2** | `feat/sta-28-quick-approve-tabs-bulk` | Smart Tabs (#1) + Contextual Bulk Toolbar (#4) + persona-aware default + memoized counts + safe-area | ~400 | depends PR-A v2 |
| **PR-B v3** | `feat/sta-28-quick-approve-polish` | Stacked Metadata (#2) + Progressive Filter Disclosure (#3) | ~300 | depends PR-B v2 + HR feedback signal |
| **PR-C** | `feat/sta-28-benefit-claim-detail` | `/workflows/benefit-claim/[id]` detail + ApproveTriad + ImpactPreview + AuditTimeline inline | ~700 | **🔒 BLOCKED on Q10** |
| **PR-D** | `feat/sta-28-manager-team` | `/manager/benefits/team` team overview matrix | ~440 | depends PR-A v2 |
| **PR-E** | `feat/sta-28-manager-reports` | `/manager/benefits/reports` 4 mock reports | ~500 | depends PR-A v2 |

**Total: ~2,690 LOC across 6 PRs.**

## PR-B v2 detailed scope (~400 LOC)

### Branch
`feat/sta-28-quick-approve-tabs-bulk` off `origin/master` (post-PR-A v2 merge).

### Files
- `src/frontend/src/components/manager/quick-approve-page.tsx` (+~150 LOC) — wire Smart Tabs + Bulk Toolbar; preserve existing chip strip (Stacked Metadata + Progressive Filter Disclosure deferred to PR-B v3)
- NEW `src/frontend/src/components/manager/quick-approve/SmartTabs.tsx` (~80 LOC) — 3-tab nav (`Action Required` / `Watching` / `History`) with count badges; persona-aware default
- NEW `src/frontend/src/components/manager/quick-approve/BulkActionToolbar.tsx` (~100 LOC) — floating bottom bar (hidden until selection); high-risk plan-type disable + tooltip
- NEW `src/frontend/src/components/manager/quick-approve/predicates.ts` (~60 LOC) — persona × tab predicate functions; single `useMemo` source for tab counts
- NEW `src/frontend/src/hooks/usePersonaDefault.ts` (~30 LOC) — returns `{ defaultTab, mineToggleDefault }` per current user persona

### Hard constraints
- Humi tokens only (`bg-canvas-soft`, `shadow-card`, `bg-accent-soft`, `text-ink-muted`)
- Bilingual TH/EN parity for 3 tab labels + toolbar buttons + tooltip
- No new npm deps
- All async = `setTimeout` via mock-async
- ≤500 LOC net delta
- **Floating toolbar mobile safe-area:** `pb-[env(safe-area-inset-bottom)]` on the floating bar root
- **Tab count memoization:** SINGLE `useMemo` keyed on `(currentUserId, persona, dataset)` — NOT 3 independent adapter calls

### Acceptance criteria

**AC-1 (persona default — Architect blocker 1):**
- Manager logs in → default = `Action Required` tab + `Mine ON`
- HRBP/SPD logs in → default = `Watching` tab + `Mine OFF`
- HR Admin / HR Manager logs in → default = `All` (or equivalent) + `Mine OFF`
- Verify via `usePersonaDefault()` mock per persona

**AC-2 (tab predicate — Architect blocker 2):** Predicate functions in `predicates.ts` match the persona × tab matrix above. Each tab returns the correct row count per persona.

**AC-3 (memoized counts — Architect blocker 3):** Tab badges show counts derived from a single `useMemo`. Verify via React DevTools Profiler — predicate runs N times for N tabs over the SAME memoized base list, not 3 independent fetches.

**AC-4 (Smart Tabs UI):** 3 tab buttons render; active tab gets `bg-accent-soft text-accent`; click switches active tab + filters table.

**AC-5 (Bulk Toolbar visibility):** Toolbar is HIDDEN by default. Selecting any row checkbox slides toolbar up from bottom. Deselecting all hides it.

**AC-6 (Bulk Toolbar high-risk gating):** Selecting only Gas/Toll/Parking → `Approve` enabled. Selecting any of {medical, transfer, payrate, probation} → `Approve` disabled + tooltip "Sensitive items must be reviewed individually" / "ต้องตรวจรายการสำคัญทีละรายการ".

**AC-7 (Mobile safe-area):** Inspect floating toolbar in iOS Safari 375px viewport — bottom edge clears bottom-nav. CSS includes `pb-[env(safe-area-inset-bottom)]`.

**AC-8 (HR persona regression):** HRBP can still see cross-team queue on first load (default = Watching, Mine OFF). HRBP smoke walkthrough included in PR description.

**AC-9 (existing chip strip preserved):** Type chips + urgency chips + search + date range from current `/quick-approve` REMAIN unchanged in PR-B v2. Stacked Metadata + Progressive Filter Disclosure are deferred to PR-B v3.

### Smoke (5-step + persona switching)

1. Login as Manager → /quick-approve → default = `Action Required` tab + `Mine ON` toggle; row count visibly smaller than `All`
2. Switch to HRBP persona → default = `Watching`, Mine OFF; cross-team rows visible
3. Click `History` tab as Manager → past 90 days of own decisions render
4. As Manager, select 3 Gas-claim rows → floating toolbar slides up; `Approve` enabled
5. Add 1 transfer row → `Approve` disables + tooltip; remove transfer → `Approve` re-enables

## PR-B v3 detailed scope (~300 LOC, deferred)

### Branch
`feat/sta-28-quick-approve-polish` off `origin/master` (post-PR-B v2 merge AND HR feedback signal).

### Files
- `src/frontend/src/components/manager/quick-approve-page.tsx` (+~50 LOC) — wire ApprovalRow + FilterPopover replacing existing chip strip
- NEW `ApprovalRow.tsx` (~80 LOC) — Stacked Metadata (#2): Requester (name bold + dept) + Type/SLA stacked
- NEW `FilterPopover.tsx` (~120 LOC) — Progressive Filter Disclosure (#3): segmented control top-3 types + "More" + Filters popover
- Optional: extract `<SLABadge>` consumption from PR-A v2 components

### Hard constraints
- Same as PR-B v2 (Humi, bilingual, no deps, mock async, mobile safe-area continued)
- ≤350 LOC net delta

### AC + smoke
Defined post-HR-feedback in PR-B v3 spec (out of scope for plan v5).

## Other PRs (unchanged from v3/v4)

- **PR-A v2:** force-push amend `feat/sta-28-manager-foundation`. Drop `app/[locale]/manager/benefits/{inbox,audit}/page.tsx` + sidebar entries `กล่องอนุมัติ` + `ประวัติการอนุมัติ`. Keep `manager/layout.tsx` + 3 components (`<WorkflowParticipantsPopover>`, `<ApproveTriadButtons>`, `<SLABadge>`) + `useDirectReports()` + `BenefitClaimStatus` enum + `STATUS_CHIP` map + `/quick-approve` adapter + 2 sidebar entries (team+reports) + 2 stub routes. ~350 LOC after drops.

- **PR-C:** `/workflows/benefit-claim/[id]/page.tsx` (~500 LOC) + inline `<ClaimEntitlementImpactPreview>` (~60 LOC) + inline `<AuditTimeline>` (~100 LOC). **BLOCKED on Q10 send-back semantics.**

- **PR-D:** `/manager/benefits/team` (~440 LOC) — replace stub. Uses `useDirectReports()` from PR-A v2.

- **PR-E:** `/manager/benefits/reports` (~500 LOC) — replace stub. 4 mock reports + CSV export stub.

## Sequencing diagram

```
PR-A v2 (amend #159, force-push) ── merge ──┬── PR-B v2 (Tabs + Bulk) ── merge ── HR feedback ── PR-B v3 (Stacked + Progressive)
                                            ├── PR-D (/team)         (parallel)
                                            ├── PR-E (/reports)      (parallel)
                                            └── PR-C ⊘ blocked on Q10 (claim detail)
```

PR-B v2 / PR-D / PR-E parallelize after PR-A v2 merges. PR-B v3 waits on HR feedback after PR-B v2 demo. PR-C waits on Q10 PO answer.

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| HR persona regression (5 personas use /quick-approve) | Persona-aware default table (Manager → Action Required+Mine; HR → Watching+Off); explicit AC-1 + AC-8 + HRBP smoke |
| Tab count perf | Single `useMemo` over base list (AC-3) |
| Floating toolbar mobile overlap | `pb-[env(safe-area-inset-bottom)]` (AC-7) |
| LOC budget growth (4 components → 2) | Split into PR-B v2 + PR-B v3; v2 = ~400 LOC; v3 = ~300 LOC |
| Q10 send-back gate (still blocks PR-C) | Linear comment after PR-A v2 merges; PR-B/D/E parallel keeps velocity |
| PR #159 force-push confusion | PR comment + Linear note pointing at `feedback_unified_approval_inbox` (already posted) |
| Stacked Metadata design invalidated by HR feedback | Deferred to PR-B v3; ship PR-B v2 first to gather signal |

## ADR (delta only from v4)

- **Decision:** PR-B v2 split into 2 PRs (Tabs+Bulk first, Stacked+Progressive Filter as PR-B v3 follow-up)
- **Driver:** Architect v4 found `/quick-approve` has 5-persona consumer list; default change to "Mine ON" would regress HRBP/SPD/HR_*. Split lets us validate Tabs first then iterate on polish.
- **Alternatives considered:** ship all 4 patterns in one PR-B v2 (~700 LOC) — rejected: too big, harder to roll back if HR feedback flags something.
- **Why chosen:** smallest first-ship that resolves "เยอะเกินไป" complaint via tabs alone; keeps HR persona unbroken via persona-aware default; defers polish until HR signal validates the direction.
- **Consequences:** 5 PRs → 6 PRs (added PR-B v3); slight schedule expansion; trade-off is HR-feedback-informed polish vs ship-everything-and-pray.
- **Lesson learned:** When asking for design help (Gemini), feed the FULL persona consumer list — Gemini's recommendation was Manager-centric and missed HRBP/SPD/HR Admin impact. Architect caught it via `rbac.ts` audit.

## Memory rule alignment (carry from v3)

> "All manager/admin approvals must surface in the single `/quick-approve` umbrella. Sidebar should not link directly to a per-type inbox. Detail pages can live under `/workflows/<type>/[id]`."

Plan v5 satisfies this: zero new sidebar entries for approval surfaces (only /team and /reports remain, neither is approval). All approval views converge on `/quick-approve` with Smart Tabs.

## Word count: ~1,580 (over 900 cap — this is the canonical persisted spec, includes matrices and AC verbatim)
