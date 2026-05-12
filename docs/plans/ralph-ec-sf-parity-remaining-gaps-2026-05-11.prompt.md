# Ralph task — implement remaining EC/SF parity gaps (2026-05-11)

WORKING_DIR: `/Users/tachongrak/Projects/hr`

You are Ralph/OMX continuing the EC/SF parity implementation workflow from Honey → Omega. Start by `cd /Users/tachongrak/Projects/hr`.

## Current state

There are already uncommitted changes from the first slice:
- `src/frontend/src/app/[locale]/admin/hire/steps/StepCompensation.tsx`
- `src/frontend/src/app/[locale]/admin/hire/steps/__tests__/StepBAAttachments.regression.test.tsx`
- `docs/plans/ec-sf-parity-implementation-2026-05-11.md`

Do not discard or overwrite those changes. Build on them.

## Source-of-truth docs

Read these first:
- Stark matrix: `/Users/tachongrak/stark/projects/hr-platform-replacement/EC-FEATURE-SF-PARITY-MATRIX-2026-05-11.md`
- Deep interview spec: `/Users/tachongrak/stark/projects/hr-platform-replacement/specs/deep-interview-ec-sf-parity-matrix-2026-05-11.md`
- Existing implementation note: `docs/plans/ec-sf-parity-implementation-2026-05-11.md`

Important: the original research spec was research-only, but Ken has now explicitly asked to implement remaining gaps in the HR app. Keep implementation scoped to high-confidence UI/store/test gaps. Do not modify Stark research artifacts. Do not attempt missing `BRD-COVERAGE-MATRIX-2026-04-24.md` recovery.

## Mission

Implement the next safe remaining EC/SF parity gaps in the HR app, focusing on user-visible P0/P1 surfaces that can be verified locally without new SF extraction or new dependencies.

Prioritize in this order:

1. **5.1 ESS quick actions + document access traceability**
   - Matrix rows: BRD #171 Quick Actions Tile, #173 Document Access.
   - Find existing ESS/profile/home quick-action/document surfaces.
   - Add or improve Thai-primary Humi-visible copy and tests so these surfaces are no longer undocumented/stub-only.
   - Avoid SF-style bilingual labels in visible UI.

2. **5.3 Admin Self Service trace IDs in tests**
   - Matrix rows: #178–183.
   - Existing routes likely under `src/frontend/src/app/[locale]/admin/self-service/*` and hooks/stores.
   - Add regression tests or assertions mapping route/cards/actions to BRD IDs, without exposing BRD IDs in user-facing UI unless already a debug/test artifact.

3. **6.1–6.6 User Management audit/filter parity**
   - Matrix rows: #184–189.
   - Verify existing admin users routes/stores/tests.
   - Improve export/audit/filter tests or small implementation gaps if low-risk.

4. **If time remains: foundation/org/position A6/A7 traceability**
   - Matrix: 1.1–1.3, 2.x, A6/A7.
   - Only add trace/documented tests or small loader mapping improvements if grounded in existing mock data. Do not invent SF rules.

## Guardrails

- Thai-primary UI copy. No visible `Payment Information / Bank Country` style bilingual labels.
- No new dependencies.
- No SF crawler or extraction.
- No backend/schema migration unless absolutely necessary and verified.
- Prefer small, focused changes with tests over broad speculative implementation.
- If a gap cannot be implemented without the missing coverage spine or unsourced business rules, document it clearly in `docs/plans/ec-sf-parity-implementation-2026-05-11.md` under a remaining blockers section.
- Keep changes additive and reversible.

## Required verification before finishing

Run the relevant focused frontend tests. At minimum rerun:

```bash
cd /Users/tachongrak/Projects/hr/src/frontend
bun run test src/app/[locale]/admin/hire/steps/__tests__/StepBAAttachments.regression.test.tsx --run
```

Also run any new/changed tests you add. If tests fail because of pre-existing unrelated issues, isolate and report the exact command/output.

## Final response requirements

When done, report:
- Files changed
- Gaps implemented, mapped to BRD IDs
- Tests run and result
- Remaining blockers with source reason
