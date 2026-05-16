# STA-27 — HRBP & SPD Persona (Benefits) — Plan v2

**Linear:** https://linear.app/stark-xix/issue/STA-27
**Author:** Planner (ralplan consensus loop — iteration 1)
**Date:** 2026-05-17
**Phase:** UI Mockup (backend SKIPPED per `CLAUDE.md`)
**Base commit:** master @ `32f21ef` (post STA-28 PR-C merge)
**Foundation:** STA-28 PR-A..F (5/6 merged)
**Supersedes:** `sta-27-hrbp-spd-plan-v1.md` (kept intact for audit trail)
**Revision driver:** Critic ITERATE verdict (8 must-fix items) + Architect steelman split (A.5)

---

## 1. Executive Summary

STA-27 delivers the **HRBP** and **SPD** persona benefits surfaces on top of the STA-28 manager foundation. Per `[[unified-approval-inbox]]`, the STA-27 §5 inbox ACs are **re-scoped to audit-only** (verifying `/quick-approve` Smart Tabs predicates already cover HRBP/SPD scope per PR-B v2) and HRBP exception oversight + reports plus SPD branch view + reports are shipped as **new non-inbox routes**. v2 adopts Architect's **Option A.5 5-PR split** to preserve STA-28's mutation/analytics PR boundary: PR-A foundation, PR-B HRBP exceptions (mutation, ships first to stress-test foundation), PR-B′ HRBP reports (analytics), PR-C SPD branch view, PR-D SPD reports. Mockup-grade only (setTimeout, Humi tokens, bilingual TH/EN, zero new deps).

---

## 2. Memory-Rule Alignment Proof (unchanged from v1)

| Original STA-27 §5 AC | Original implication | New scope (memory-rule-compliant) | Justification |
|---|---|---|---|
| HR-EX-00 / SP-EX-00 "Persona sees benefits inbox" | Build `/hrbp/benefits/inbox`, `/spd/benefits/inbox` | **Audit-only** — verify `/quick-approve` Smart Tabs predicates (`getPersonaGroup`, `isActionRequired`, `isWatching`) at `src/frontend/src/components/manager/quick-approve/predicates.ts` already handle HRBP/SPD group. **PLUS** PR-A ships an HRBP info banner on `/quick-approve` calling out the `partneredDepts` mockup limitation (see Risks row 3 + AC #7). | Memory rule + transparent demo. |
| HR-EX-01..05 (exception review/approval) | Persona-scoped exception oversight | **NEW route** `/hrbp/benefits/exceptions` — exceptions are HRBP-exclusive oversight artifacts, not benefit claims. | Distinct artifact, not approval traffic. |
| HR-RP-01..04 (HRBP reports) | Cross-employee reports | **NEW route** `/hrbp/benefits/reports` — read-only analytics. | Outside umbrella scope. |
| SP-BR-01..05 (SPD branch view) | Branch enrollment matrix | **NEW route** `/spd/benefits/branch-view` — snapshot/overview, not approval queue. | Drill-in to single claim still routes to `/workflows/benefit-claim/[id]`. |
| SP-RP-01..03 (SPD reports) | Branch-scoped reports | **NEW route** `/spd/benefits/reports` — read-only analytics. | Same as HRBP reports. |
| Drill-in to a single claim | Per-persona claim page? | **Reuse** `/workflows/benefit-claim/[id]/page.tsx` from STA-28 PR-A. | Persona-agnostic by design. |

**Net result:** zero new inbox routes; 4 new non-inbox routes; HRBP info banner on `/quick-approve` for transparency.

---

## 3. PR Breakdown (Option A.5 — 5 PRs)

| # | Branch | Scope | LOC budget | Depends on |
|---|---|---|---|---|
| PR-A | `feat/sta-27-hrbp-spd-foundation` | Sidebar entries (HRBP + SPD sections, NO inbox links), `useHrbpScope()` hook, `useSpdBranches()` hook, `BenefitExceptionRecord` model + mock data, `hrbpApproveException()` / `hrbpRejectException()` store actions, **`actorRole` widen to include `'hrbp'`** + matching chip/label maps in `AuditTimeline.tsx`, **`ApproveTriadButtons` prop extension** (`onReject?` + `hideSendBack?` + `hideUpdate?`), **`dvtVariant?: boolean`** added to `plan-registry.ts` plan shape (2 plans flagged), **`/quick-approve` HRBP info banner** + predicate-audit doc | ≤410 (was ≤380, +30 delta per CRIT items 2/3/4) | master (STA-28 PR-F merged) |
| PR-B | `feat/sta-27-hrbp-exceptions` | `/hrbp/benefits/exceptions` page (queue + Approve/Reject + AuditTimeline reuse + paired +/− borrow-forward visual + ApproveTriadButtons via new `hideSendBack=true` / `onReject` props) | ≤340 | PR-A |
| PR-B′ | `feat/sta-27-hrbp-reports` | `/hrbp/benefits/reports` page (4 reports HR-RP-01..04 cards + drawer sub-pages + CSV export reuse) | ≤300 | PR-A (soft dep on PR-B for sidebar order only — no code dep, parallel-safe) |
| PR-C | `feat/sta-27-spd-branch-view` | `/spd/benefits/branch-view` page (branch-employee × plan matrix, **DVT Variant column reads `plan.dvtVariant` from registry**, drill-in to `/workflows/benefit-claim/[id]`) | ≤420 | PR-A |
| PR-D | `feat/sta-27-spd-reports` | `/spd/benefits/reports` page (3 branch-scoped reports SP-RP-01..03) | ≤280 | PR-A (parallel-safe with PR-B/B′/C) |

**Total ~1750 LOC across 5 PRs.**

---

## 4. Per-PR Detail

### PR-A — Foundation (≤410 LOC)

**Goal:** Ship shared scaffolding, foundation widen for HRBP audit semantics, registry DVT flag, ApproveTriadButtons extension, predicate audit doc + HRBP info banner.

**File targets**

*New:*
- `src/frontend/src/lib/hooks/useHrbpScope.ts` — `{ partneredDepts: string[], scopeLabel: string }`
- `src/frontend/src/lib/hooks/useSpdBranches.ts` — `{ assignedBranches: BranchRef[], scopeLabel: string }`
- `src/frontend/src/lib/benefit-exception-mock.ts` — `BenefitExceptionRecord` type + ≥12 deterministic records spanning HR-EX-01..05 categories
- `src/frontend/src/stores/benefit-exception-store.ts` *(CRIT #1 — corrected path: `src/stores/`, NOT `src/lib/stores/`, matches existing `src/stores/benefit-claims.ts` convention)* — `hrbpApproveException(id, note)` + `hrbpRejectException(id, reason)`, both setTimeout(300) mock async, push `AuditTimelineEntry` with `actorRole: 'hrbp'` (exceptions are terminal — no auto-restore needed)
- `docs/sta-27-quick-approve-predicate-audit.md` — quoted excerpt of `predicates.ts:68` (the `partneredDepts not in mock data — default to true` comment), HRBP/SPD persona-group classification table, screenshots of `/quick-approve` Watching tab as HRBP, "no code change required" verdict with explicit scope-limitation callout
- `src/frontend/src/components/quick-approve/HrbpScopeBanner.tsx` *(CRIT #6 — concrete UI surface for the doc's verdict)* — small info banner (Humi info token) rendered on `/quick-approve` only when persona ∈ {hrbp, spd}: "Demo mode: cross-team queue not yet filtered by partnered departments. See audit doc." with link.

*Modified:*
- `src/frontend/src/stores/benefit-claims.ts:29` *(CRIT #2)* — extend `actorRole` union from `'employee' | 'spd' | 'manager' | 'system'` → `'employee' | 'spd' | 'manager' | 'hrbp' | 'system'`. Update any TypeScript narrowing sites flagged by tsc.
- `src/frontend/src/components/manager/benefits/AuditTimeline.tsx` *(CRIT #2)* — extend role chip color map + i18n label map to include `'hrbp'` (Humi info token; bilingual labels: TH "HR Business Partner" / EN "HR Business Partner").
- `src/frontend/src/components/manager/benefits/ApproveTriadButtons.tsx` *(CRIT #3 — Option (a) extension chosen over standalone ExceptionActionBar)* — extend `ApproveTriadButtonsProps`:
  - add `onReject?: (reason: string) => Promise<void>` (renders Reject button when provided)
  - add `hideSendBack?: boolean` (default false — preserves existing manager UX)
  - add `hideUpdate?: boolean` (default false — preserves existing manager UX)
  Estimated ~10-15 LOC change to component; preserves backward compatibility (all existing callers continue to work unchanged).
- `src/frontend/src/data/benefits/plan-registry.ts` *(CRIT #4 — DVT field defined HERE, not deferred to PR-C)* — add `dvtVariant?: boolean` to plan shape; flag exactly 2 plans (the 2 known DVT-eligible plans — Planner picks the 2 most plausible at implementation time; Critic can specify if a different pair is preferred).
- `src/frontend/src/app/[locale]/quick-approve/page.tsx` *(CRIT #6 + risk-row-3)* — render `<HrbpScopeBanner />` above the Smart Tabs when persona ∈ {hrbp, spd}.
- Sidebar component — add HRBP section (Exceptions, Reports) + SPD section (Branch View, Reports). NO inbox links.
- `src/frontend/src/locales/{en,th}.json` — labels for sidebar, banner, scope copy.

**Acceptance criteria (numbered)**
1. Sidebar renders HRBP + SPD sections only when current persona ∈ {`hrbp`, `spd`} respectively.
2. Sidebar has **zero entries pointing to `/hrbp/benefits/inbox` or `/spd/benefits/inbox`** — grep proves zero matches.
3. `useHrbpScope()` returns ≥1 partnered dept in mock mode; `useSpdBranches()` returns ≥2 assigned branches.
4. `benefit-exception-mock.ts` exports ≥12 deterministic records spanning HR-EX-01..05 categories.
5. `hrbpApproveException` and `hrbpRejectException` push an `AuditTimelineEntry` with `actorRole: 'hrbp'` and resolve after ~300ms.
6. `benefit-claims.ts:29` `actorRole` union includes `'hrbp'`; `AuditTimeline.tsx` renders `'hrbp'` chip with Humi info token + bilingual label. **Exception audit entries log with `actorRole: 'hrbp'`** (CRIT #2 verbatim).
7. *(CRIT #6 — rewritten behaviorally)* `/quick-approve` as HRBP renders `<HrbpScopeBanner />` above Smart Tabs; banner text matches the audit doc's quoted excerpt of `predicates.ts:68`; banner links to `docs/sta-27-quick-approve-predicate-audit.md`. Audit doc renders the quoted excerpt verbatim. HR demo opens both surfaces without surprise.
8. `ApproveTriadButtons` accepts `onReject?`, `hideSendBack?`, `hideUpdate?` props; all existing manager call-sites in `/workflows/benefit-claim/[id]/page.tsx` continue to behave identically (props default to current behavior).
9. `plan-registry.ts` plan shape exposes `dvtVariant?: boolean`; exactly 2 plans flagged `true`. Type-check passes across all 5 known consumers (admin/benefits/plans page, hospital-claim page, reimbursement page, team-benefits-matrix, PendingApprovalsReport).
10. Bilingual TH/EN parity for sidebar + banner + scope copy.

**Smoke walkthrough (5 steps)**
1. Log in as HRBP → sidebar shows "HRBP > Exceptions" + "HRBP > Reports", **no Inbox link**; toggle TH.
2. Log in as SPD → sidebar shows "SPD > Branch View" + "SPD > Reports", **no Inbox link**.
3. Open `/quick-approve` as HRBP → lands on Watching tab (PR-B v2); info banner renders above tabs.
4. Click banner link → audit doc opens with `predicates.ts:68` excerpt quoted verbatim.
5. tsc passes; existing /workflows/benefit-claim/[id] approve/sendBack still functions unchanged.

**LOC budget:** ≤410 (was ≤380, +30 per CRIT items 2/3/4). **Hard constraints:** no new deps; setTimeout only; Humi tokens; bilingual; preserve backward-compat for ApproveTriadButtons callers.

---

### PR-B — HRBP Exceptions (mutation) (≤340 LOC) — SHIPS FIRST after PR-A per Architect sequencing

**Goal:** HRBP can review/approve/reject benefit exceptions. Stress-tests PR-A foundation (store actions, actorRole widen, ApproveTriadButtons prop extension) with the hardest mutation-bearing consumer.

**File targets**

*New:*
- `src/frontend/src/app/[locale]/hrbp/benefits/exceptions/page.tsx` — Server Component shell
- `src/frontend/src/components/hrbp/exceptions/ExceptionsQueue.tsx` — table of `BenefitExceptionRecord` rows (filter by status, type, employee); expandable detail with paired +/− borrow-forward CSS-bar visual + AuditTimeline reuse + `<ApproveTriadButtons hideSendBack={true} hideUpdate={true} onReject={hrbpRejectException} onApprove={hrbpApproveException} />` *(CRIT #5 — hideSendBack=true adopted; rationale: exceptions are terminal artifacts, not workflow drafts that round-trip back to a requester)*
- `src/frontend/src/components/hrbp/exceptions/PairedDeltaVisual.tsx` — small CSS bar showing +/− borrow-forward diff (no chart lib)

*Modified:*
- `src/frontend/src/locales/{en,th}.json` — queue chrome + reject reason validation copy

**Acceptance criteria (numbered)**
1. `/hrbp/benefits/exceptions` lists ≥12 mock exception records with filter by status (Pending / Approved / Rejected) and exception type (HR-EX-01..05).
2. Each row expands to show `PairedDeltaVisual` (CSS bar, no chart lib) + `AuditTimeline` (reused with HRBP chip rendered correctly).
3. Approve action calls `hrbpApproveException`, updates table optimistically after setTimeout, pushes timeline entry with `actorRole: 'hrbp'`, shows toast.
4. Reject action calls `hrbpRejectException` with required reason ≥10 chars; same UX.
5. **`ExceptionsQueue` passes `hideSendBack={true}` to `ApproveTriadButtons`** *(CRIT #5 verbatim)*. Rationale documented inline as code comment: "Exceptions are terminal artifacts — no send-back round-trip semantics; PR-A's hideSendBack prop hides the button without affecting manager UX in /workflows/benefit-claim/[id]."
6. Drill-in from exception row to underlying claim (when `exception.claimId` set) routes to `/workflows/benefit-claim/[id]`.
7. Bilingual TH/EN parity.
8. No new npm deps; CSS bars only; no Tailwind red.

**Smoke walkthrough (5 steps)**
1. As HRBP, Sidebar → HRBP > Exceptions; see 12+ rows.
2. Filter by "Pending"; expand one row → see paired +/− diff + AuditTimeline (no Send Back button visible).
3. Click Approve → toast after ~300ms; row flips to Approved; timeline gets new HRBP entry with HRBP chip.
4. Click Reject on another row → reason modal opens; submit; row flips to Rejected.
5. Open Manager claim detail in another tab → Send Back button STILL renders (backward-compat preserved).

**LOC budget:** ≤340. **Hard constraints:** reuse `ApproveTriadButtons` + `AuditTimeline` via PR-A props; CSS bars only; no Send Back button visible (hideSendBack=true).

---

### PR-B′ — HRBP Reports (analytics) (≤300 LOC)

**Goal:** 4 cross-employee analytical reports — pure read-only analytics, no mutations, no store changes.

**File targets**

*New:*
- `src/frontend/src/app/[locale]/hrbp/benefits/reports/page.tsx` — Server Component shell
- `src/frontend/src/components/hrbp/reports/HrbpReportsLanding.tsx` — 4 report cards (HR-RP-01..04) following PR-E manager-reports pattern:
  - HR-RP-01 Cross-Employee Claim Report
  - HR-RP-02 Cost Analysis (Actual + Predictive)
  - HR-RP-03 Enrollment Statistics
  - HR-RP-04 Special Privilege Report
- `src/frontend/src/components/hrbp/reports/__report_helpers__.ts` — pure functions deriving stats from `manager-reports-mock` (`getThroughputStats`, `csvExport`) reshaped for cross-employee scope (uses `useHrbpScope().partneredDepts` to filter)

*Modified:*
- `src/frontend/src/locales/{en,th}.json` — 4 report titles + descriptions

**Acceptance criteria (numbered)**
1. `/hrbp/benefits/reports` shows 4 report cards in 2×2 grid (Humi tokens, no hex).
2. Each card opens drawer/sub-page with stat tiles + CSV export button reusing `manager-reports-mock.csvExport`.
3. Report data respects `useHrbpScope().partneredDepts`.
4. Bilingual TH/EN parity.
5. HR-RP-01..04 mapping documented in PR description.
6. No new deps; no chart libs; CSS bars only for any visualizations.
7. Zero changes to `benefit-claims.ts`, `benefit-exception-store.ts`, or any STA-28 component — pure analytics PR.

**Smoke walkthrough (4 steps)**
1. As HRBP, Sidebar → HRBP > Reports; see 4 cards.
2. Open "Cost Analysis"; tile grid + bar visual render.
3. CSV export downloads file.
4. Toggle TH → labels Thai.

**LOC budget:** ≤300. **Hard constraints:** reuse manager-reports-mock; pure analytics — no mutations.

---

### PR-C — SPD Branch View (≤420 LOC)

**Goal:** SPD branch-scoped enrollment matrix with DVT Variant flag reading from PR-A's `plan.dvtVariant` field.

**File targets**

*New:*
- `src/frontend/src/app/[locale]/spd/benefits/branch-view/page.tsx` — Server Component shell
- `src/frontend/src/components/spd/branch-view/BranchMatrix.tsx` — rows = branch employees (`useSpdBranches()`), columns = active benefit plans (`BENEFIT_PLAN_REGISTRY`), cells = enrollment status badge. **Extra "DVT Variant" column reads `plan.dvtVariant === true` from PR-A's field** *(CRIT #4 — testable against actual field)*
- `src/frontend/src/components/spd/branch-view/BranchFilters.tsx` — branch (multi), plan, status filters
- `src/frontend/src/components/spd/branch-view/EmployeeDrillIn.tsx` — clicking employee name opens detail panel (reuse `WorkflowParticipantsPopover` pattern); enrollment cell with active claim routes to `/workflows/benefit-claim/[id]`

*Modified:*
- `src/frontend/src/lib/team-benefits-mock.ts` — add `getBranchEmployees(branchId: string)` helper (deterministic hash, matches existing seed pattern)
- `src/frontend/src/locales/{en,th}.json` — branch view chrome

**Acceptance criteria (numbered)**
1. `/spd/benefits/branch-view` renders matrix of ≥15 employees × all `BENEFIT_PLAN_REGISTRY` plans.
2. Branch selector defaults to first assigned branch; switching re-derives matrix client-side.
3. **"DVT Variant" column shows badge when `plan.dvtVariant === true`** (reads PR-A's `dvtVariant?: boolean` field; exactly 2 plans show the badge, matching PR-A flag).
4. Enrollment cell click for an active claim routes to `/workflows/benefit-claim/[id]`.
5. Employee name click opens drill-in panel (reuse popover pattern).
6. SP-BR-01..05 mapping documented in PR description.
7. Bilingual TH/EN parity; sticky header row + sticky first column (CSS only).
8. Empty state when no branches assigned: friendly message.

**Smoke walkthrough (5 steps)**
1. As SPD, Sidebar → SPD > Branch View; matrix loads with first assigned branch.
2. Switch branch → matrix re-renders.
3. DVT Variant column shows badge for exactly 2 plans; tooltip explains variant.
4. Click enrollment cell with active claim → routes to claim detail.
5. Toggle TH → labels Thai.

**LOC budget:** ≤420. **Hard constraints:** sticky CSS only; reuse `BENEFIT_PLAN_REGISTRY` + PR-A's `dvtVariant`; popover reused from STA-28.

---

### PR-D — SPD Reports (≤280 LOC)

**Goal:** 3 branch-scoped audit/movement reports.

**File targets**

*New:*
- `src/frontend/src/app/[locale]/spd/benefits/reports/page.tsx` — Server Component shell
- `src/frontend/src/components/spd/reports/SpdReportsLanding.tsx` — 3 report cards SP-RP-01..03:
  - SP-RP-01 Branch Enrollment Movement
  - SP-RP-02 Branch Cost Snapshot
  - SP-RP-03 Branch Special Privilege Audit
- `src/frontend/src/components/spd/reports/__report_helpers__.ts` — branch-scoped derivations

*Modified:*
- `src/frontend/src/locales/{en,th}.json` — 3 report titles + descriptions

**Acceptance criteria (numbered)**
1. `/spd/benefits/reports` shows 3 cards (Humi tokens).
2. Each drawer/sub-page shows tiles scoped to `useSpdBranches().assignedBranches`.
3. CSV export reuses `manager-reports-mock.csvExport`.
4. Bilingual TH/EN parity.
5. SP-RP-01..03 mapping documented.
6. No new deps.

**Smoke walkthrough (4 steps)**
1. As SPD, Sidebar → SPD > Reports; see 3 cards.
2. Open "Branch Enrollment Movement"; tiles render.
3. CSV exports.
4. Toggle TH → labels Thai.

**LOC budget:** ≤280.

---

## 5. Sequencing Diagram (updated per Architect: PR-B first)

```
                 ┌────────────┐
                 │   PR-A     │  Foundation
                 │ (sidebar,  │  (sidebar, hooks, exception model,
                 │  hooks,    │   actorRole widen, ApproveTriad
                 │  registry, │   prop extension, dvtVariant field,
                 │  banner)   │   audit doc + banner)
                 └──────┬─────┘
                        │
                        ▼
                 ┌────────────┐
                 │   PR-B     │  HRBP Exceptions (MUTATION) ── ships FIRST
                 │ (queue +   │  Stress-tests PR-A foundation by hardest consumer:
                 │  mutation) │  store actions + actorRole + ApproveTriad new props
                 └──────┬─────┘
                        │
       ┌────────────────┼────────────────┐
       │                │                │
       ▼                ▼                ▼
 ┌──────────┐    ┌──────────┐    ┌──────────┐
 │  PR-B′   │    │   PR-C   │    │   PR-D   │
 │   HRBP   │    │   SPD    │    │   SPD    │
 │ reports  │    │ branch   │    │ reports  │
 │(analytics│    │  view    │    │          │
 └──────────┘    └──────────┘    └──────────┘
   (parallel-safe after PR-B merges; each is independent analytics or read-only)
```

**Rationale (Architect):** PR-B (mutation) ships immediately after PR-A so foundation gets stress-tested by the hardest consumer first. Any PR-A foundation defects surface inside PR-B review, not buried under 3 parallel analytics PRs. PR-B′/C/D are all parallel-safe after PR-B merges.

---

## 6. Risks + Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| PR-B exceeds 340 LOC after `PairedDeltaVisual` complexity creep | Medium | Medium | If breach, push `PairedDeltaVisual` into PR-A foundation (it's a primitive). PR-A budget has headroom under cap. |
| HR expects literal `/hrbp/benefits/inbox` route | Medium | High | PR-A ships audit doc **plus** HRBP info banner on `/quick-approve` (CRIT #6 + #8). Demo walkthrough opens both surfaces. No quiet assumptions. |
| `partneredDepts` scope filter not actually applied (mock defaults to "all visible") | High | Medium-High | **Documented in 3 surfaces** *(CRIT #8 — sharpened)*: (1) audit doc quotes `predicates.ts:68` verbatim; (2) `<HrbpScopeBanner />` renders on `/quick-approve` as HRBP/SPD with the limitation copy; (3) PR-A README note in commit message. HR cannot quietly assume real scoping. |
| `actorRole` enum widen breaks TypeScript narrowing in undiscovered call-sites | Medium | Medium | PR-A AC #9 requires tsc green across all 5 known consumers; reviewer runs `tsc --noEmit` before merge; any narrowing fix lands in PR-A (kept self-contained). |
| `ApproveTriadButtons` prop extension breaks existing manager UX in `/workflows/benefit-claim/[id]` | Low | High | New props all default-false; PR-B smoke step 5 explicitly verifies manager Send Back button still renders; PR-A AC #8 freezes backward-compat. |
| Branch matrix performance at >50×>20 cells | Low | Low | Sticky CSS scales fine at mockup data sizes. |
| AuditTimeline shape mismatch between BenefitClaim and BenefitException entities | Medium | Low | Wrap exception adapter in PR-A: `toAuditTimelineEntries(exception)`; `AuditTimeline` already prop-driven. |
| Q9 dual-control exception workflow scope creep | Medium | Medium | Out of scope for mockup — flagged in §7; PR-B ships single-approver only. |
| Sidebar churn collision with concurrent STA work | Low | Low | PR-A modifies sidebar exactly once. |

---

## 7. Open Questions (3 items now — DVT removed per CRIT #4)

| # | Question | Proposed disposition |
|---|---|---|
| Q9 | Dual-control exception workflow (two HRBPs sign-off)? | **Defer.** Mockup ships single-approver; flag for future enhancement. |
| Q2 | SPD scope — claim handling for branch employees vs onboarding-only? | **Defer.** SPD ships branch-view + reports; claim drill-in routes to existing /workflows/benefit-claim/[id]; claim approval stays in /quick-approve. |
| HR-PO-* | HRBP policy oversight (audit-trail of plan changes)? | **Out of scope here.** Belongs in STA-25 companion; referenced in audit doc only. |

~~Q4 DVT Variant data source~~ — **RESOLVED in v2 per CRIT #4**: `dvtVariant?: boolean` lands in PR-A on `plan-registry.ts`; 2 plans flagged true; PR-C reads field directly.

Appended to `.omc/plans/open-questions.md`.

---

## 8. ADR — STA-27 HRBP/SPD Plan v2

**Decision:** Ship STA-27 as **5 PRs (Option A.5)** — foundation, HRBP exceptions (mutation, first), HRBP reports (analytics), SPD branch view, SPD reports — re-scoping STA-27 §5 inbox ACs to audit-only + HRBP info banner, with PR-A widening `actorRole` to `'hrbp'`, extending `ApproveTriadButtons` props (`onReject`, `hideSendBack`, `hideUpdate`), and adding `dvtVariant?: boolean` to `plan-registry.ts`.

**Drivers:**
1. `[[unified-approval-inbox]]` memory rule + STA-27 §5 literal inbox AC tension → audit-only re-scope + HRBP info banner for transparency.
2. STA-28 foundation reuse → extend cleanly (new props default-false) rather than fork.
3. Mockup phase mandates ≤500 LOC/PR, no real API, no new deps.
4. **Mutation/analytics PR boundary** (precedent from STA-28 PR-A vs PR-E) → split HRBP across PR-B (mutation) and PR-B′ (analytics).
5. **Foundation stress-test sequencing** → PR-B (mutation) ships first after PR-A to surface defects fast.

**Alternatives considered:**
- **Option A (4-PR — original v1)**: HRBP exceptions + reports combined in single PR-B. *Pros:* fewer merges, HRBP ships as one demo cut. *Cons:* mixes mutation + analytics in one PR; near LOC cap after +30 delta from CRIT items 2/3/4; rollback granularity poor for mutation-bearing code. **Rejected** in favor of A.5.
- **Option A.5 (5-PR — Architect steelman, ADOPTED)**: split HRBP into PR-B (mutation) + PR-B′ (analytics). *Pros:* preserves STA-28's mutation/analytics PR boundary; smaller per-PR review surface (~280-340 LOC each); parallel review feasible after PR-B; cleaner rollback granularity for mutation-bearing PR-B; concentrates foundation stress-test in PR-B (Architect's sequencing concern resolved naturally). *Cons:* one extra merge; PR-B′ depends on PR-A (not PR-B) so soft sidebar-order coordination needed but no code dep. **Adopted.**
- **Option B (5-PR — v1 original split)**: same shape as A.5 but split was less principled (not aligned to mutation/analytics axis). **Superseded by A.5.**
- **Option C (3-PR mega)**: all HRBP in 1, all SPD in 1. *Cons:* violates 500 LOC cap; poor rollback granularity. **Rejected.**
- **Honor STA-27 §5 inbox routes literally**: violates memory rule. **Rejected.**
- **Per-persona inbox as thin redirect to /quick-approve**: still creates orphan routes + sidebar entries the rule forbids. **Rejected.**
- **Standalone `ExceptionActionBar.tsx`** (CRIT #3 option b): ~50 LOC, no STA-28 churn. *Pros:* zero churn risk on STA-28 component. *Cons:* duplicates triad UX; two action-bar patterns in codebase; future bug-fixes need to land in two places. **Rejected** — CRIT recommended option (a) prop extension is cleaner. ~10-15 LOC extension preserves backward-compat via default-false props.

**Why chosen (Option A.5):** Smallest principled plan that (i) ships every non-inbox STA-27 surface, (ii) stays inside per-PR LOC budget post +30 foundation delta, (iii) preserves STA-28's mutation/analytics PR boundary, (iv) concentrates foundation stress-test in PR-B for fast defect surfacing, (v) gives HR one demoable HRBP-mutation cut + one demoable HRBP-analytics cut + two demoable SPD cuts, (vi) produces audit doc + UI banner proving inbox compliance without writing inbox code.

**Consequences:**
- Sidebar gains HRBP + SPD sections (no inbox entries).
- 4 new routes total; 1 reused claim-detail page; 0 new inbox routes; 1 new banner on `/quick-approve`.
- `BenefitExceptionRecord` entity introduced — new mock domain.
- `useHrbpScope` / `useSpdBranches` hooks established as canonical persona-scope pattern.
- `actorRole` enum permanently widened to include `'hrbp'`; all 5 known consumers updated.
- `ApproveTriadButtons` API extended (backward-compat preserved); future personas can reuse `onReject` / `hideSendBack` props.
- `plan-registry.ts` plan shape now exposes `dvtVariant?: boolean` — future plans can flag variant status.
- Audit doc + HRBP info banner become canonical references for any future inbox-related ACs across modules.

**Follow-ups:**
- Real API wiring for exceptions + reports (backend phase).
- Q9 dual-control workflow design.
- Q2 SPD claim handling clarification with HR Team.
- HR-PO-* policy oversight in STA-25 companion ticket.
- Playwright smoke for sidebar entries TH/EN parity per `[[playwright-test-before-linear-close]]` after PR-A merge.
- Playwright smoke for HRBP info banner visibility per persona after PR-A merge.
- HR Team explicit sign-off on audit-only inbox re-scope (Open Q listed in `.omc/plans/open-questions.md`).

---

**End of Plan v2.**
