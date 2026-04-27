# Wave 8 Navigation Cleanup Spec

> **Generated**: 2026-04-26
> **Author**: architect (autopilot navigation cleanup pass — Wave 8)
> **Source**: live grep + Read across `src/frontend/src/app/[locale]/{me/documents,resignation,requests,time,quick-approve,spd/inbox}/page.tsx`, `src/components/{resignation,time,manager}/`, `src/components/humi/shell/{Sidebar,PersonaSwitcher}.tsx`, `src/lib/demo-users.ts`, `next.config.ts`, `specs/hr-navigation-cleanup.md` (Wave 7), `specs/hr-drift-matrix.md`
> **Hard constraints**: no new pages, no backend, Thai-primary labels, adopt-not-reinvent, redirect/relabel only
>
> **Scope summary**: 0 deletions, 0 new redirects, 1 label-canonicalization across 1 file (`demo-users.ts`). All four "approval queue" surfaces are confirmed distinct features. Both "old design" pages (`/me/documents`, `/resignation`) are real BRD-anchored surfaces — KEEP, no action.

---

## A. Old design pages — status table

| Page | Verdict | Canonical | Reason / Evidence |
|---|---|---|---|
| `/th/me/documents` | **KEEP** | itself | BRD #173 (HR document library). `Sidebar.tsx:273` declares `SIDEBAR_LEGACY: /me/documents reachable from /profile/me Documents tab`. Inbound link confirmed at `profile/me/page.tsx:1414` (`href={`/${locale}/me/documents`}`). Page is fully Thai-primary, uses canonical helpers (`HUMI_HR_DOCS`, `HR_DOC_TYPE_LABELS`, `formatDate`). The "old design" impression is purely visual — needs design refresh, but **not a navigation/structural problem**. Mark out-of-scope for Wave 8. |
| `/th/resignation` | **KEEP** | itself | BRD #172 (Chain 1: termination request). Inbound link at `profile/me/page.tsx:1282` (`href={`/${locale}/resignation`}`). `Sidebar.tsx:277` declares `SIDEBAR_LEGACY: /resignation reachable from /profile/me Resignation section (BRD #172)`. Component (`resignation-page.tsx:24-60`) writes to `useTerminationApprovals` store consumed by both `/quick-approve` (Manager step) and `/spd/inbox` (SPD step). Removing/redirecting it would break the entire Chain 1 employee submission flow. **No action.** |

**Visual-refresh note (out of scope)**: both pages use older inline-style patterns (`style={{...}}`) rather than the newer Card/Button/CardEyebrow tokens used in `/requests`. A design-only Wave 9 could refresh both without touching routing. Flag for `/designer` if user requests.

---

## B. Approval/queue surfaces — purpose matrix

| Surface | Persona | Purpose | Request types handled | BRD | Verdict |
|---|---|---|---|---|---|
| `/th/requests` | **Employee** | Self-service form submitter + own-request tracker. Catalog of 9 request templates → user fills → `useRequestsStore.submit()`. Three tabs: `mine` (my own filterable list), `catalog` (template grid), `approvals` (manager-tier preview using `HUMI_APPROVAL_QUEUE` static mock — preview only). | Generic catalog (leave/claim/OT/etc — not wired to real workflow stores) | (no BRD anchor in drift matrix; ESS feature) | **KEEP** — sidebar entry `requests` (`Sidebar.tsx:94`). Distinct from queue surfaces because this is the *employee submission* surface; tabs mine + catalog have no analog elsewhere. The `approvals` tab is a vestigial mock — flag for follow-up cleanup but not in Wave 8. |
| `/th/time` | **Employee** | Clock-in/clock-out attendance + time-correction request submission. Live wall-clock, shift progress bar, attendance history. | Time correction requests (employee → manager) | (Time/Attendance — sidebar uses external `cnext-time.centralgroup.com`) | **KEEP** — internal scaffold per `Sidebar.tsx:282`. NOT an approval queue at all — it's an employee data-entry/check-in surface. Mislabeled as "queue" in user's question. **No merge.** |
| `/th/quick-approve` | **Manager** | Manager approval queue for direct reports. Filters by type/urgency/date, bulk select, quick approve/reject. Reads from `useLeaveApprovals` + `useTerminationApprovals` (Manager step only). | leave, expense, overtime, claim, transfer, change_request, **termination Chain 1 Manager step (BRD #172)** | (anchored to BRD #117 manager workflow + BRD #172 Manager step) | **KEEP** — sidebar entry `quick-approve` role-gated to `manager,hr_admin,hr_manager` (`Sidebar.tsx:102`). Manager persona only — distinct from SPD inbox. **No merge.** |
| `/th/spd/inbox` | **SPD** | SPD final-approver inbox using unified `WorkflowRequestInbox` shell with 3 store slots. **NO leave** (Manager auto-approves leave). | Chain 3 ESS personal-info change requests (BRD #166), Chain 1 termination (BRD #172, SPD step), Chain 4 promotion (BRD #103) | BRD #134, #95, #103, #166, #172 | **KEEP** — sidebar entry `spd-inbox` role-gated to `spd,hr_admin,hr_manager` (`Sidebar.tsx:103`). SPD persona only. **No merge.** |

### Why "no merge" — 3 axes prove these are 4 distinct features

1. **Persona axis**: `/requests` = Employee author; `/time` = Employee clock-in (not approval at all); `/quick-approve` = Manager approver; `/spd/inbox` = SPD approver. Each is a different role's primary surface.
2. **Direction axis**: `/requests` writes (submit), `/time` writes (clock-in/correction), `/quick-approve` and `/spd/inbox` read+act on existing rows.
3. **Workflow-stage axis**: For Chain 1 termination, the same `useTerminationApprovals` request flows through THREE surfaces in sequence — submitted at `/resignation`, Manager step approved at `/quick-approve`, SPD step approved at `/spd/inbox`. Merging any two breaks the chain stage separation BRD #172 mandates.

**Carry-over note**: `/requests` "approvals" tab uses static `HUMI_APPROVAL_QUEUE` mock and is *not* wired to either of the real approval stores. This is technical debt but not a navigation duplication — left for a future cleanup pass.

---

## C. Persona switcher fix

### Files
- **Source of truth**: `src/frontend/src/lib/demo-users.ts:104-115` (`PERSONA_BADGE` map)
- **Consumer**: `src/frontend/src/components/humi/shell/PersonaSwitcher.tsx:32, 78, 114` (renders `badge.label` as the chip)

### Current chip-label generation (lines 104-115)

```ts
export const PERSONA_BADGE: Record<string, { label: string; tone: string }> = {
  'admin@humi.test':    { label: 'Admin',    tone: 'humi-tag--ink' },     // ← (a)
  'spd@humi.test':      { label: 'SPD',      tone: 'humi-tag--accent' },
  'hrbp@humi.test':     { label: 'HRBP',     tone: 'humi-tag--butter' },
  'manager@humi.test':  { label: 'Manager',  tone: 'humi-tag--sage' },
  'employee@humi.test': { label: 'Employee', tone: 'humi-tag' },
  // T7 — SF-canonical
  'ken@humi.test':      { label: 'HR Admin', tone: 'humi-tag--ink' },     // ← (b) MISMATCH
  'apinya@humi.test':   { label: 'HRBP',     tone: 'humi-tag--butter' },
  'worawee@humi.test':  { label: 'SPD',      tone: 'humi-tag--accent' },
  'rungrote@humi.test': { label: 'Manager',  tone: 'humi-tag--sage' },
};
```

### Mismatch (screenshot evidence)
- Line 105: `'admin@humi.test'` → label `"Admin"` for `roles: ['hr_admin', 'hr_manager', 'spd', 'hrbp', 'manager', 'employee']` (super-user)
- Line 111: `'ken@humi.test'` → label `"HR Admin"` for `roles: ['hr_admin', 'employee']`

Both effectively render as the **HR Admin** role chip family (same `tone: 'humi-tag--ink'`), but with different visible text. User reports this as inconsistent in the demo switcher dropdown.

### Decision: which canonical label?

Two reasonable options:
1. **`"HR Admin"` for both** — accurate to the primary `hr_admin` role; matches `ROLE_LANDING` table (`demo-users.ts:126` ties `hr_admin` → `/admin`).
2. **`"Admin"` for both** — shorter, fits in the chip pill better; matches the existing topbar tone class `humi-tag--ink` semantically.

**Recommend Option 1 (`"HR Admin"`)** because:
- The role enum is literally `hr_admin` (`rbac.ts:6`), so the chip should mirror the canonical role name (consistency with HRBP/SPD/Manager which all match their role acronyms).
- `admin@humi.test` is a *super-user* with 6 roles — labeling it just `"Admin"` *under-states* the privilege (it's actually the HR Admin landing path that fires per `ROLE_LANDING[0]`).
- The 4 SF-canonical personas (Ken/Apinya/Worawee/Rungrote) were deliberately seeded to mirror real role names — keep that pattern as the source of truth.

### Fix (single 1-line change)

`src/frontend/src/lib/demo-users.ts:105`:
```diff
-  'admin@humi.test':    { label: 'Admin',    tone: 'humi-tag--ink' },
+  'admin@humi.test':    { label: 'HR Admin', tone: 'humi-tag--ink' },
```

Comment on line 100-103 already says *"Badge = role acronym ONLY (consistent pattern across all 9 personas)"* — the fix realigns reality with the doc.

### Persona-count question (8 vs 5)

User asked whether to consolidate to 5 canonical (1 per role).

**Recommend KEEP all 9 personas as-is.** Reasoning:
- Comment at `demo-users.ts:101-103`: *"Tone color encodes role family — repetition (2× Manager / 2× HRBP / 2× SPD) is meaningful: same RBAC scope, different person identity for demo coverage."*
- The 4 SF-canonical (Ken/Apinya/Worawee/Rungrote) come from `RBAC-MATRIX-V2-2026-04-26` per `demo-users.ts:1-4` and are required for SF-parity demos. Removing them would break the Wave 7 RBAC V2 traceability.
- The 5 generic (admin/spd/hrbp/manager/employee) are needed for clean role-only smoke tests.
- Cost is minor — the dropdown is demo-only and already labeled "สลับบทบาทเพื่อ demo" so duplication is expected.

If the user later requests slimming, propose a **toggle** in the switcher (`generic | sf-canonical`) rather than deletion — preserves both audiences.

---

## Exec plan (parallel-safe groups)

### Group A — Old-design pages
**No action.** Both `/me/documents` and `/resignation` are real BRD-anchored surfaces. Visual refresh is a design-only follow-up out of Wave 8 scope.

### Group B — Approval queues
**No action.** All four surfaces (`/requests`, `/time`, `/quick-approve`, `/spd/inbox`) are confirmed distinct features. No sidebar consolidation, no redirects. Document the "no merge" decisions in this spec for future audits.

### Group C — Persona switcher labels
**Single file edit.**
- `src/frontend/src/lib/demo-users.ts:105` — change `label: 'Admin'` → `label: 'HR Admin'`

That's it. No other touch points — `PersonaSwitcher.tsx` reads from `PERSONA_BADGE[email]` directly, no hard-coded label fallbacks elsewhere (verified by grep).

### Group D — Tests
**Optional 1 file** if a test asserts the exact chip text "Admin":
- Run `rg -n "Admin" src/frontend/src/components/humi/shell/__tests__/` and `rg -n "PERSONA_BADGE" src/frontend/src/__tests__/` to scan. If found, update assertion strings to `"HR Admin"`. (Not load-bearing — the badge is purely visual.)

---

## Estimated impact

- **Files modified**: 1 (`src/frontend/src/lib/demo-users.ts`)
- **Files deleted**: 0
- **Routes redirected**: 0
- **Persona-label fixes**: 1 (admin@humi.test chip: `Admin` → `HR Admin`)
- **No-merge decisions documented**: 4 (the `/requests`, `/time`, `/quick-approve`, `/spd/inbox` quartet)
- **No-action documented**: 2 (`/me/documents`, `/resignation` — kept, real BRD anchors)

---

## Risks & rollback

- **Risk (label fix)**: any e2e test asserting topbar chip text equals `"Admin"` would break. Mitigation: Group D scan. **Rollback**: 1-line revert.
- **Risk (no-merge call)**: user later disagrees and wants `/requests`-`/quick-approve` consolidated despite distinct personas. Mitigation: this spec documents the 3-axis justification (persona / direction / workflow-stage). Argument is durable.
- **Risk (out-of-scope flag)**: visual refresh of `/me/documents` and `/resignation` deferred. Mitigation: explicit OOS note above so future Wave 9 can pick them up cleanly.

---

## Top 3 most-impactful changes

1. **`demo-users.ts:105` label fix** — the only concrete code change in Wave 8. Eliminates the one observable inconsistency in the demo persona switcher.
2. **Documenting the 4-surface "no merge" matrix** — durable artifact preventing future cleanup waves from re-litigating the same approval-queue collapse question.
3. **Documenting the 2 "old design" KEEP decisions** — flags `/me/documents` + `/resignation` as visual-refresh candidates (Wave 9 design pass) without touching routing now.

---

## Execution order

1. Group C (single-line label fix) → done.
2. Group D (test scan) → only if scan finds hits; otherwise skip.

That's it. Wave 8 is mostly a *no-action documentation pass* with one tiny label canonicalization.
