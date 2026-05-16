# STA-27 — HRBP & SPD Persona (Benefits) — Plan v1

**Linear:** https://linear.app/stark-xix/issue/STA-27
**Author:** Planner (ralplan consensus loop)
**Date:** 2026-05-17
**Phase:** UI Mockup (backend SKIPPED per `CLAUDE.md`)
**Base commit:** master @ `32f21ef` (post STA-28 PR-C merge)
**Foundation:** STA-28 PR-A..F (5/6 merged)

---

## 1. Executive Summary

STA-27 delivers the **HRBP** and **SPD** persona surfaces for the EC Benefits module on top of the STA-28 manager foundation. Per the `[[unified-approval-inbox]]` memory rule, **no per-persona benefits inbox pages are built**; instead, the existing `/quick-approve` Smart Tabs (predicate matrix already maps HRBP/SPD scope via PR-B v2) is the single approval surface, audited but not re-implemented. New routes are limited to **non-inbox** persona-specific work: HRBP exception oversight + 4 reports, and SPD branch-scoped enrollment view + 3 branch reports. All UI is mockup-grade (setTimeout async, Humi tokens, bilingual TH/EN, no new deps), shipped across **4 PRs** each ≤500 LOC. Persona drill-in to individual claims continues to use the shared `/workflows/benefit-claim/[id]` detail page already built in STA-28 PR-A.

---

## 2. Memory-Rule Alignment Proof

The original STA-27 §5 acceptance criteria literally name inbox routes for HRBP and SPD. Those AC items are **re-scoped to audit-only** to comply with `[[unified-approval-inbox]]`.

| Original STA-27 §5 AC | Original implication | New scope (memory-rule-compliant) | Justification |
|---|---|---|---|
| HR-EX-00 / SP-EX-00 "Persona sees benefits inbox" | Build `/hrbp/benefits/inbox`, `/spd/benefits/inbox` | **Audit-only** — verify `/quick-approve` Smart Tabs predicates (`getPersonaGroup`, `isActionRequired`, `isWatching`) at `src/frontend/src/components/manager/quick-approve/predicates.ts` already handle HRBP/SPD persona group. No new code. | Memory rule `[[unified-approval-inbox]]`: "approvals surface in `/quick-approve` umbrella; never standalone per-feature entry pages." PR-B v2 already shipped persona-aware default tab landing on Watching for HRBP/SPD. |
| HR-EX-01..05 (exception review/approval) | Persona-scoped exception oversight | **NEW route** `/hrbp/benefits/exceptions` — non-conflict because exception records are a distinct artifact (not Benefit Claims) and lack approval triad treatment in /quick-approve. | Exceptions are HRBP-exclusive oversight artifacts, not employee-initiated approval traffic. They map to the "review and approve borrow-forward / +/− paired adjustments" workflow, which is not a benefit claim. |
| HR-RP-01..04 (HRBP reports) | Cross-employee report views | **NEW route** `/hrbp/benefits/reports` — reports are analytics surfaces, never approval queues. | Reports are read-only analytics; outside the umbrella's "approval traffic" definition. |
| SP-BR-01..05 (SPD branch view) | Branch-scoped enrollment matrix | **NEW route** `/spd/benefits/branch-view` — matrix is enrollment overview, not an approval queue. | Branch matrix is a snapshot/overview surface. Drill-in to a single claim still routes to `/workflows/benefit-claim/[id]`. |
| SP-RP-01..03 (SPD reports) | Branch-scoped reports | **NEW route** `/spd/benefits/reports` — same justification as HRBP reports. | Read-only analytics. |
| Drill-in to a single claim from any HRBP/SPD surface | Per-persona claim page? | **Reuse** `/workflows/benefit-claim/[id]/page.tsx` from STA-28 PR-A. | Already persona-agnostic per STA-28 design. |

**Net result:** original AC count preserved; **zero new inbox routes**; one unified claim-detail page; 4 new non-inbox routes (2 HRBP + 2 SPD).

---

## 3. PR Breakdown

| # | Branch | Scope | LOC budget | Depends on |
|---|---|---|---|---|
| PR-A | `feat/sta-27-hrbp-spd-foundation` | Sidebar entries (HRBP + SPD sections, no inbox links), `useHrbpScope()` hook, `useSpdBranches()` hook, `BenefitExceptionRecord` model + mock data, `hrbpApproveException()` / `hrbpRejectException()` store actions, predicate-audit doc (`docs/sta-27-quick-approve-predicate-audit.md`) | ≤380 | master (STA-28 PR-F merged) |
| PR-B | `feat/sta-27-hrbp-exceptions-reports` | `/hrbp/benefits/exceptions` page (review queue + Approve/Reject + AuditTimeline reuse + paired +/− visual), `/hrbp/benefits/reports` page (4 reports HR-RP-01..04) | ≤480 | PR-A |
| PR-C | `feat/sta-27-spd-branch-view` | `/spd/benefits/branch-view` page (branch-employee × plan matrix, DVT Project variant column flag, drill-in to `/workflows/benefit-claim/[id]`) | ≤420 | PR-A |
| PR-D | `feat/sta-27-spd-reports` | `/spd/benefits/reports` page (3 branch-scoped reports SP-RP-01..03) | ≤280 | PR-A (parallel-safe with PR-B/PR-C) |

**Total ~1560 LOC across 4 PRs.**

---

## 4. Per-PR Detail

### PR-A — Foundation

**Goal:** Ship the shared scaffolding HRBP+SPD pages need, plus the audit doc proving `/quick-approve` already routes HRBP/SPD inbox traffic.

**File targets**

*New:*
- `src/frontend/src/lib/hooks/useHrbpScope.ts` — returns `{ partneredDepts: string[], scopeLabel: string }` from mock seed
- `src/frontend/src/lib/hooks/useSpdBranches.ts` — returns `{ assignedBranches: BranchRef[], scopeLabel: string }` from mock seed
- `src/frontend/src/lib/benefit-exception-mock.ts` — `BenefitExceptionRecord` type + 12 deterministic mock records (HRBP scope)
- `src/frontend/src/lib/stores/benefit-exception-store.ts` — Zustand-style (matches existing `BenefitClaimsStore` pattern): `hrbpApproveException(id, note)`, `hrbpRejectException(id, reason)`, both setTimeout(300) mock async, push `AuditTimelineEntry` per Q10 pattern (no auto-restore needed — exceptions are terminal)
- `docs/sta-27-quick-approve-predicate-audit.md` — short doc enumerating: HRBP persona group classification, Action/Watching/History predicate behavior for HRBP+SPD, screenshot reference list, "no code change required" verdict

*Modified:*
- `src/frontend/src/components/layout/Sidebar.tsx` (or equivalent) — add HRBP section (2 entries: Exceptions, Reports) + SPD section (2 entries: Branch View, Reports). **NO inbox link** — unified rule.
- `src/frontend/src/locales/{en,th}.json` — labels for sidebar entries + exception/branch/report page chrome

**Acceptance criteria (numbered)**
1. Sidebar renders HRBP + SPD sections only when current user persona ∈ {`hrbp`, `spd`} respectively (use existing RBAC helper).
2. Sidebar has **zero entries pointing to `/hrbp/benefits/inbox` or `/spd/benefits/inbox`** — grep proves zero matches.
3. `useHrbpScope()` returns ≥1 partnered dept in mock mode.
4. `useSpdBranches()` returns ≥2 assigned branches in mock mode.
5. `benefit-exception-mock.ts` exports ≥10 deterministic records spanning all 3 exception types (HR-EX-01..05 categories).
6. `hrbpApproveException` and `hrbpRejectException` push an `AuditTimelineEntry` and resolve after ~300ms (matches `managerApprove` cadence).
7. `docs/sta-27-quick-approve-predicate-audit.md` exists, cites `predicates.ts` line refs, and concludes "no code change" with rationale.
8. Bilingual TH/EN labels load; no hardcoded English in sidebar entries.

**Smoke walkthrough (5 steps)**
1. Log in as HRBP persona → sidebar shows "HRBP > Exceptions" and "HRBP > Reports", **no Inbox link**.
2. Log in as SPD persona → sidebar shows "SPD > Branch View" and "SPD > Reports", **no Inbox link**.
3. Toggle TH locale → labels switch to Thai.
4. Open `/quick-approve` as HRBP → lands on Watching tab by default (PR-B v2 behavior preserved).
5. Open the audit doc → it references `predicates.ts` and confirms no rework.

**LOC budget:** ≤380. **Hard constraints:** no new deps; setTimeout only; Humi tokens; bilingual.

---

### PR-B — HRBP Exceptions + Reports

**Goal:** HRBP can review/approve/reject benefit exceptions AND view 4 cross-employee analytical reports.

**File targets**

*New:*
- `src/frontend/src/app/[locale]/hrbp/benefits/exceptions/page.tsx` — Server Component shell
- `src/frontend/src/components/hrbp/exceptions/ExceptionsQueue.tsx` — table of `BenefitExceptionRecord` rows (filter by status, type, employee). Each row → expandable detail with paired +/− borrow-forward diff (small CSS bar visual), AuditTimeline reuse, and ApproveTriadButtons reuse (Approve / Send Back / Reject) wired to `hrbpApproveException` / `hrbpRejectException`.
- `src/frontend/src/app/[locale]/hrbp/benefits/reports/page.tsx` — Server Component shell
- `src/frontend/src/components/hrbp/reports/HrbpReportsLanding.tsx` — 4 report cards (HR-RP-01..04) following PR-E manager reports pattern:
  - HR-RP-01 Cross-Employee Claim Report
  - HR-RP-02 Cost Analysis (Actual + Predictive)
  - HR-RP-03 Enrollment Statistics
  - HR-RP-04 Special Privilege Report
- `src/frontend/src/components/hrbp/reports/__report_helpers__.ts` — pure functions deriving stats from `manager-reports-mock` helpers (`getThroughputStats`, `csvExport`) reshaped for cross-employee scope (uses `useHrbpScope().partneredDepts` to filter)

*Modified:*
- `src/frontend/src/locales/{en,th}.json` — strings for queue chrome + 4 report titles/descriptions

**Acceptance criteria (numbered)**
1. `/hrbp/benefits/exceptions` lists ≥10 mock exception records with filter by status (Pending / Approved / Rejected) and exception type.
2. Each exception row expands to show paired +/− borrow-forward visualization (CSS bar, no chart lib) and AuditTimeline (reused).
3. Approve action calls `hrbpApproveException`, updates table optimistically after setTimeout, pushes timeline entry, shows toast.
4. Reject action calls `hrbpRejectException` with required reason ≥10 chars; same UX.
5. `/hrbp/benefits/reports` shows 4 report cards in 2×2 grid (Humi tokens, no hex).
6. Each report card opens a drawer/sub-page with stat tiles + CSV export button reusing `manager-reports-mock.csvExport`.
7. Report data respects `useHrbpScope().partneredDepts` (e.g., only shows employees from partnered depts).
8. Bilingual TH/EN parity verified for all chrome.
9. No new npm deps; no chart libs; no Tailwind red.
10. Drill-in from exception row to underlying claim (if applicable) routes to `/workflows/benefit-claim/[id]`.

**Smoke walkthrough (5 steps)**
1. As HRBP, navigate Sidebar → HRBP > Exceptions; see 10+ rows.
2. Filter by "Pending"; expand one row → see paired +/− diff + AuditTimeline.
3. Click Approve → toast appears after ~300ms; row status flips to Approved; timeline gets a new HRBP entry.
4. Navigate Sidebar → HRBP > Reports; open "Cost Analysis"; CSV downloads.
5. Toggle to TH locale; labels Thai-correct.

**LOC budget:** ≤480. **Hard constraints:** reuse ApproveTriadButtons + AuditTimeline + manager-reports-mock; CSS bars only; paired +/− visual must be inline SVG or CSS.

---

### PR-C — SPD Branch View

**Goal:** SPD persona sees a branch-scoped enrollment matrix with DVT Project variant flag.

**File targets**

*New:*
- `src/frontend/src/app/[locale]/spd/benefits/branch-view/page.tsx` — Server Component shell
- `src/frontend/src/components/spd/branch-view/BranchMatrix.tsx` — rows = branch employees (from `useSpdBranches()`), columns = active benefit plans (from existing `BENEFIT_PLAN_REGISTRY`), cells = enrollment status badge (Enrolled / Pending / N/A). One extra column "DVT Variant" with badge when plan is DVT Project variant.
- `src/frontend/src/components/spd/branch-view/BranchFilters.tsx` — branch selector (multi), plan selector, status filter
- `src/frontend/src/components/spd/branch-view/EmployeeDrillIn.tsx` — clicking employee name opens detail panel (uses existing `WorkflowParticipantsPopover` pattern); clicking enrollment cell with active claim routes to `/workflows/benefit-claim/[id]`

*Modified:*
- `src/frontend/src/lib/team-benefits-mock.ts` — add `getBranchEmployees(branchId: string)` helper (deterministic hash-based, matches existing seed pattern)
- `src/frontend/src/locales/{en,th}.json` — branch view chrome strings

**Acceptance criteria (numbered)**
1. `/spd/benefits/branch-view` renders matrix of ≥15 employees × all benefit plans from `BENEFIT_PLAN_REGISTRY`.
2. Branch selector defaults to first assigned branch from `useSpdBranches()`; switching branches re-derives matrix client-side.
3. "DVT Variant" column shows badge when plan has DVT variant flag (mock 2 plans as DVT).
4. Enrollment cell click for an active claim routes to `/workflows/benefit-claim/[id]`.
5. Employee name click opens drill-in panel (reuse popover pattern).
6. SP-BR-01..05 mapping documented in PR description (1 line each).
7. Bilingual TH/EN parity.
8. Humi tokens only; sticky header row + sticky first column for matrix readability.
9. Empty state when no branches assigned: friendly message + sidebar reference.

**Smoke walkthrough (5 steps)**
1. As SPD, Sidebar → SPD > Branch View; matrix loads with first assigned branch.
2. Switch branch in selector → matrix re-renders.
3. Click DVT badge column header → tooltip explains variant.
4. Click an enrollment cell with an active claim → routes to claim detail (STA-28 PR-A page).
5. Toggle TH → labels Thai.

**LOC budget:** ≤420. **Hard constraints:** sticky CSS only (no virtualization lib); reuse `BENEFIT_PLAN_REGISTRY`; popover reused from STA-28.

---

### PR-D — SPD Reports

**Goal:** SPD has 3 branch-scoped reports (audit/movement focus).

**File targets**

*New:*
- `src/frontend/src/app/[locale]/spd/benefits/reports/page.tsx` — Server Component shell
- `src/frontend/src/components/spd/reports/SpdReportsLanding.tsx` — 3 report cards (SP-RP-01..03):
  - SP-RP-01 Branch Enrollment Movement
  - SP-RP-02 Branch Cost Snapshot
  - SP-RP-03 Branch Special Privilege Audit
- `src/frontend/src/components/spd/reports/__report_helpers__.ts` — branch-scoped derivations from `manager-reports-mock` + `team-benefits-mock`

*Modified:*
- `src/frontend/src/locales/{en,th}.json` — 3 report titles + descriptions

**Acceptance criteria (numbered)**
1. `/spd/benefits/reports` shows 3 report cards (Humi tokens).
2. Each card drawer/sub-page shows stat tiles scoped to `useSpdBranches().assignedBranches`.
3. CSV export per report reuses `manager-reports-mock.csvExport`.
4. Bilingual TH/EN parity.
5. SP-RP-01..03 mapping documented in PR description.
6. No new deps.

**Smoke walkthrough (4 steps)**
1. As SPD, Sidebar → SPD > Reports; see 3 cards.
2. Open "Branch Enrollment Movement" → see tiles for assigned branches.
3. Click CSV export → file downloads.
4. Toggle TH → labels Thai.

**LOC budget:** ≤280. **Hard constraints:** reuse manager-reports-mock; no chart lib; no new deps.

---

## 5. Sequencing Diagram

```
                 ┌────────────┐
                 │   PR-A     │  Foundation (sidebar, hooks, exception model, audit doc)
                 └──────┬─────┘
                        │
       ┌────────────────┼────────────────┐
       │                │                │
       ▼                ▼                ▼
 ┌──────────┐    ┌──────────┐    ┌──────────┐
 │   PR-B   │    │   PR-C   │    │   PR-D   │
 │  HRBP    │    │   SPD    │    │   SPD    │
 │ exc+rpt  │    │ branch   │    │ reports  │
 └──────────┘    └──────────┘    └──────────┘
   (parallel-safe after PR-A merges; each independent)
```

PR-B, PR-C, PR-D can be authored in **parallel branches** off PR-A's merge commit. Suggested merge order is PR-A → PR-B → PR-C → PR-D for cleanest HR demo cadence (HRBP first, SPD second), but reviewer order is flexible.

---

## 6. Risks + Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| PR-B exceeds 500 LOC (exceptions + reports combined) | Medium | Medium | Split late if needed: extract `HrbpReportsLanding` into PR-B.5; PR-A's foundation already isolates shared bits to keep PR-B lean. |
| HR stakeholder expects `/hrbp/benefits/inbox` route per literal STA-27 §5 wording | Medium | High | Audit doc in PR-A explicitly addresses this; planner cites `[[unified-approval-inbox]]` memory rule; demo walkthrough opens `/quick-approve` as HRBP to show Watching tab handles it. |
| Predicate audit reveals HRBP/SPD scope filter NOT actually applied (mock data lacks `partneredDepts`) | Low | Medium | Audit doc acknowledges current `predicates.ts` defaults to "all visible" for hrbp_spd group (line 67 comment "partneredDepts not in mock data — default to true"). Document this as a known mockup limitation, not a bug; HR demo unaffected. |
| Branch matrix performance with >50 employees × >20 plans | Low | Low | Sticky CSS scales fine; no virtualization needed at mockup data sizes. |
| AuditTimeline + ApproveTriadButtons surface mismatch between BenefitClaim and BenefitException entity shape | Medium | Low | Wrap exception adapter in PR-A: `toAuditTimelineEntries(exception)` shim; ApproveTriadButtons already prop-driven. |
| Q9 dual-control exception workflow scope creep | Medium | Medium | Out of scope for mockup phase — document as Open Question; PR-B ships single-approver flow only. |
| Sidebar churn collisions with concurrent STA-* work | Low | Low | PR-A modifies sidebar exactly once; subsequent PRs touch routes only. |

---

## 7. Open Questions (flag-only, don't block)

| # | Question | Proposed disposition for STA-27 |
|---|---|---|
| Q9 | Dual-control exception workflow (two HRBPs sign-off)? | **Defer.** Mockup ships single-approver flow showing state transition; document as future enhancement. |
| Q2 | SPD scope — claim handling for branch employees vs onboarding-only? | **Defer.** SPD ships branch-view + reports only; claim drill-in routes to existing /workflows/benefit-claim/[id]; claim approval stays in /quick-approve. |
| HR-PO-* | HRBP policy oversight (audit-trail of plan changes)? | **Out of scope here.** Belongs in STA-25 companion (configurator persona); reference only in audit doc. |
| Branch DVT Variant data source | Mock vs registry-driven? | **PR-C decides:** mock 2 plans as DVT in `BENEFIT_PLAN_REGISTRY` extension for variant column. |

These are appended to `.omc/plans/open-questions.md` per Planner protocol.

---

## 8. ADR — STA-27 HRBP/SPD Plan v1

**Decision:** Ship STA-27 as 4 PRs (foundation + HRBP exceptions/reports combined + SPD branch view + SPD reports), re-scoping STA-27 §5 inbox ACs to audit-only and reusing the STA-28 foundation.

**Drivers:**
1. `[[unified-approval-inbox]]` memory rule forbids per-persona inbox routes; STA-27 §5 wording predates this rule.
2. STA-28 foundation (5 components + 2 mock helpers + 1 claim-detail page + Q10 send-back pattern) is reusable as-is.
3. Mockup phase mandates ≤500 LOC/PR, no real API, no new deps, Humi tokens, bilingual TH/EN.

**Alternatives considered:**
- **5-PR split** (separate HRBP exceptions from HRBP reports): rejected — extra merge tax with no offsetting reviewer/demo benefit.
- **3-PR mega** (collapse all HRBP into 1 PR, all SPD into 1): rejected — violates 500 LOC cap, poor rollback granularity.
- **Honor STA-27 §5 inbox routes literally**: rejected — violates `[[unified-approval-inbox]]`.
- **Build per-persona inbox as a thin redirect to /quick-approve**: rejected — still creates orphan routes and sidebar entries the rule forbids.

**Why chosen:** Option A is the smallest plan that ships every non-inbox surface STA-27 requires, stays inside LOC budget when foundation isolates shared bits, gives HR one demoable HRBP cut + one demoable SPD cut, and produces an audit doc proving inbox compliance without writing inbox code.

**Consequences:**
- Sidebar gains HRBP + SPD sections (no inbox entries).
- 4 new routes total; 1 reused claim-detail page; 0 new inbox routes.
- `BenefitExceptionRecord` entity introduced — new mock domain to maintain.
- `useHrbpScope` / `useSpdBranches` hooks established as the canonical persona-scope pattern future work should reuse.
- Audit doc becomes the reference for any future inbox-related ACs across other modules.

**Follow-ups:**
- Real API wiring for exceptions + reports (deferred — backend phase).
- Q9 dual-control workflow design.
- Q2 SPD claim handling clarification with HR Team.
- HR-PO-* policy oversight in STA-25 companion ticket.
- After PR-A merge, run Playwright smoke for sidebar entries TH/EN parity per `[[playwright-test-before-linear-close]]`.

---

**End of Plan v1.**
