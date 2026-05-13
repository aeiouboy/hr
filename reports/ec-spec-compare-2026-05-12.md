# EC Spec Compare — 2026-05-12

Scope: compare current HR frontend against latest BA EC source `EC-list-of-fields-2026-05-10.*` and current BRD coverage matrix, using TDD-first gap framing.

## OMX execution status

- `omx status`: no active team/autopilot session.
- `omx doctor`: passed 14/14.
- `omx explore --prompt ...`: failed before analysis because OMX generated a Codex call with unsupported `--add-dir` for the installed Codex CLI.
- `CODEX_HOME=/Users/tachongrak/.codex omx exec ...`: authenticated but failed because installed Codex CLI is too old for `gpt-5.5`.
- `omx update`: blocked by npm `EACCES` at `/usr/local/lib/node_modules/oh-my-codex`.

Result: OMX did not complete the compare. JARVIS performed the read-only comparison directly and preserved the dirty worktree.

## Latest EC source baseline

Source: `/Users/tachongrak/stark/projects/hr-platform-replacement/ba-source/BA-EC-SUMMARY-2026-05-10.md`

- Employee file rows: 375 parsed rows
- Hiring: 205 rows
- Maintain employee: 170 rows
- Payrate change workflow: 10 rows
- Old 2026-04-23 baseline is stale: it had only 36 parsed main employee field rows.

## Current focused test status

Command run from `src/frontend`:

```bash
npm test -- --run \
  src/app/[locale]/admin/hire/steps/__tests__/StepBAFieldCoverage.regression.test.ts \
  src/app/[locale]/admin/hire/steps/__tests__/StepBAAttachments.regression.test.tsx \
  src/__tests__/org-position-profile-coverage.test.tsx
```

Result: PASS — 3 files / 19 tests.

Notes:
- `StepBAFieldCoverage.regression.test.ts` already points to the 2026-05-10 BA CSV and asserts 205 Hiring rows are accounted for.
- The attachment regression suite passes but logs a JSDOM fetch warning for `/picklists/address/_provinces.json`; not a failure.
- The org/position/profile tests confirm the internal profile `ผังองค์กร` tab behavior.

## Gap summary vs latest EC spec

### 1. Hiring coverage is guarded, but several rows are intentionally uncovered

The current TDD guard covers the 205-row Hiring baseline and classifies known misses in `CURRENTLY_UNCOVERED_BA_ROWS`.

Highest-value remaining Hiring gaps:
- Social Accounts Information: Domain, Instant Messaging ID
- Address detail parity: Room No., House Number, Street, payroll-derived province/district/subdistrict system fields
- Copy Address from Employee controls for emergency contact/dependents
- Organization/job detail parity: Point of Sales, Job Role, Store Brand/Format, Supervisor ID
- DVT project rows
- Probation/end-date and band/special benefit rows

TDD next test:
- Add a focused RED test in `src/app/[locale]/admin/hire/steps/__tests__/StepBAFieldCoverage.regression.test.ts` by removing one row from `CURRENTLY_UNCOVERED_BA_ROWS` and asserting the UI/source now contains the required token.

### 2. Maintain employee/Profile coverage is not yet guarded like Hiring

Latest spec adds 170 maintain rows. Current code has profile tabs and EC catalogue surfaces, but there is no equivalent maintain-row coverage regression test.

Naive source-token scan against profile/admin employee code estimated:
- Maintain rows: 170
- Naively covered: 85
- Naively uncovered: 85

Largest uncovered groups:
- Profile special sections: Advanced Information, COI Approval, Certification/License, Disciplinary, Previous Employment, Language Skills, Company Asset
- Employment Information: Current JG/PG effective dates and years, previous employee IDs, PF service date
- Compensation Information: E-Letter, 50BIS, Tax Deduction
- Time Management: time-related maintain rows

TDD next test:
- Create `src/app/[locale]/profile/me/__tests__/ECMaintainFieldCoverage.regression.test.ts` (or shared `src/__tests__/ec-maintain-profile-coverage.test.ts`) that parses `EC-list-of-fields-2026-05-10.employee-file.csv`, filters `process === 'maintain'`, and requires every row to be either source-covered or explicitly classified in a `CURRENTLY_UNCOVERED_MAINTAIN_ROWS` map.

### 3. Payrate change workflow is newly present in latest spec but not represented

Latest workbook adds dedicated `payrate change` sheet with 10 fields:
- When should these changes take effect?
- Event
- Event Reason
- Reason for Salary Adjust
- Pay Group
- Payroll ID
- Pay Component
- Amount
- Currency
- Frequency

Current search found no `Payrate`, `Pay Rate`, `Salary Adjust`, or `Reason for Salary Adjust` UI/source tokens in frontend.

Important rule: `Reason for Salary Adjust` required only when Event Reason = “Salary Adjust”; otherwise greyed out/not editable.

TDD next tests:
- Add `src/frontend/src/__tests__/payrate-change-coverage.test.tsx` or route-level test once the target route is chosen.
- First RED assertion: salary-adjust reason field is disabled when Event Reason is not `Salary Adjust`.
- Second RED assertion: salary-adjust reason field becomes required/enabled when Event Reason is `Salary Adjust`.

### 4. BRD matrix remains structurally accurate, but new profile/org work improves Flow 04/11 UX

Relevant current confirmations:
- Flow 04 #169 View Organization Chart: profile now includes an internal `ผังองค์กร` tab.
- Flow 11 #8/#9/#11 org chart: still reachable via `/org-chart`; now also embedded from profile context.
- Flow 11 #5 Position Foundation: admin positions coverage test exists.
- Flow 11 #2/#3/#11 organization coverage test exists.

Recommended matrix update if keeping docs current:
- Update BRD coverage evidence for #169/#175/#8/#9/#11 to mention internal profile tab, not only `/org-chart` route.

## Recommended TDD order

1. Add maintain employee coverage regression test with explicit uncovered-row map.
2. Add payrate-change workflow RED tests for the conditional salary-adjust rule.
3. Promote one high-value Hiring uncovered row to covered behavior, starting with `Supervisor ID` or `Job Role` because they affect org/position autopilot completeness.
4. Update BRD coverage matrix evidence for profile org chart internal tab.

## Verification commands used

```bash
omx status
omx doctor
omx explore --prompt "..."
CODEX_HOME=/Users/tachongrak/.codex omx exec "..."
omx update
npm test -- --run src/app/[locale]/admin/hire/steps/__tests__/StepBAFieldCoverage.regression.test.ts src/app/[locale]/admin/hire/steps/__tests__/StepBAAttachments.regression.test.tsx src/__tests__/org-position-profile-coverage.test.tsx
```
