# STA-27 — `/quick-approve` Predicate Audit (HRBP / SPD Scope)

**Linear:** https://linear.app/stark-xix/issue/STA-27
**PR:** PR-A (HRBP/SPD foundation)
**Date:** 2026-05-17
**Status:** Audit-only — no code change required in `/quick-approve` predicate layer.

---

## Why this doc exists

Original STA-27 §5 ACs called for dedicated `/hrbp/benefits/inbox` and `/spd/benefits/inbox` routes. The **unified-approval-inbox** memory rule forbids per-persona inbox surfaces: approvals must surface through the `/quick-approve` umbrella (tabs + rows + count), and detail pages live under `/workflows/<type>/[id]`.

This audit confirms that the `/quick-approve` Smart Tabs predicates already handle the HRBP/SPD persona group — no inbox code needs to be written. The single gap (a mockup-data limitation, not a code defect) is the `partneredDepts` scope filter, which is intentionally degraded to "all visible" in mockup mode. We surface this gap to the user via `<HrbpScopeBanner />` on `/quick-approve`.

---

## Predicate evidence (verbatim)

File: `src/frontend/src/components/manager/quick-approve/predicates.ts`

### Persona classification (line ~40)

```ts
export type PersonaGroup = 'manager' | 'hrbp_spd' | 'hr_admin_manager';

export function getPersonaGroup(persona: Role): PersonaGroup {
  if (persona === 'manager') return 'manager';
  if (persona === 'hrbp' || persona === 'spd') return 'hrbp_spd';
  return 'hr_admin_manager'; // hr_admin | hr_manager
}
```

HRBP and SPD personas are classified into the shared `hrbp_spd` group. This group is referenced by `isActionRequired`, `isWatching`, and `isHistory` — so all three Smart Tabs already filter for HRBP + SPD visibility correctly.

### Action Required predicate (lines ~65–69) — the limitation

```ts
case 'hrbp_spd':
  // partneredDepts not in mock data — default to true (all items visible)
  return !escalatedToHR && isPending;
```

**This is the only line in the predicate layer that admits a mockup-time scope gap.** The intent (per the original ACs) is to filter the queue by the HRBP's partnered departments — but the mock data shape on `PendingRequest` does not carry a `dept` tag, so the predicate degrades to "all items pending and not escalated to HR".

### Watching predicate (lines ~88–92)

```ts
case 'hrbp_spd':
  // Full visibility across partnered depts (all pending, including escalated)
  return isPending;
```

Same shape — full visibility in mockup mode.

### History predicate (lines ~115–122)

```ts
case 'hrbp_spd':
  return isDone;
```

Same.

---

## Verdict

| Question | Answer |
|---|---|
| Does `/quick-approve` already accept HRBP + SPD personas? | **Yes** — see `getPersonaGroup()` above. |
| Are tab predicates wired for HRBP/SPD? | **Yes** — `hrbp_spd` branch exists in all 3 predicates. |
| Does scope filtering by `partneredDepts` work? | **No (mockup)** — degrades to "all visible" because mock data has no `dept` tag. |
| Code change needed in `/quick-approve` for STA-27 PR-A? | **No.** Persona detection + scope filter are already in place; only the scope-filter input data is missing, and that lands with backend phase. |
| Visible UX gap? | **Yes** — HRBP/SPD users see a broader queue than their real partnered scope would allow. **Mitigation:** `<HrbpScopeBanner />` mounted on `/quick-approve` flags this transparently. |

**Decision:** STA-27 PR-A ships a transparency banner (`<HrbpScopeBanner />`) instead of new inbox routes. Backend phase will replace the `partneredDepts not in mock data` comment with a real filter pulling from `useHrbpScope().partneredDepts`.

---

## Phase-2 backlog

- Add `dept: string` (or `departmentId`) to the `PendingRequest` shape in `quick-approve-api.ts` mock data.
- Wire `useHrbpScope().partneredDepts` into `isActionRequired` / `isWatching` for the `hrbp_spd` branch.
- Remove the `<HrbpScopeBanner />` once real scoping lands (or repurpose it to show "Showing N of M items in scope").

---

## Related surfaces

- `<HrbpScopeBanner />` — `src/frontend/src/components/manager/quick-approve/HrbpScopeBanner.tsx`
- `useHrbpScope()` — `src/frontend/src/hooks/use-hrbp-scope.ts`
- `useSpdBranches()` — `src/frontend/src/hooks/use-spd-branches.ts`
- `predicates.ts` — `src/frontend/src/components/manager/quick-approve/predicates.ts`
- Plan v2 — `specs/sta-27-hrbp-spd-plan-v2.md` §4 PR-A AC #7

---

**End of audit.**
