# HR Full-Suite Foundation + P0 Evidence Pack

This suite is the first-pass evidence foundation for HR testing. It is not yet
the exhaustive full regression suite; it defines the evidence contract and P0
coverage pack that later domain specs should extend.

## Commands

```bash
npm run test:e2e:full -- --project=chromium --grep @smoke --workers=1
npm run test:e2e:evidence
npm run test:e2e:full:mobile -- --grep @smoke --workers=1
```

## Artifact contract

Default output:

```text
test-artifacts/hr-full-suite/<run-id>/
  results.jsonl
  summary.md
  qa-report.md
  screenshots/<caseId>/<stepId>-<status>.png
```

Environment overrides:

- `HR_TEST_RUN_ID`: set a stable run id for the whole suite.
- `HR_TEST_ARTIFACT_DIR`: set a custom artifact root.

Evidence runs use `--workers=1` in the first pass so `results.jsonl` and
`summary.md` stay deterministic.

## Adding a test case

1. Add a deterministic ID in `../testcases/hr-full-suite.ts`.
2. Wrap each meaningful action/assertion in `qaStep(...)`.
3. Use demo/mock data only; never capture production HR data. Production screenshots are blocked unless `HR_TEST_ALLOW_PROD_SCREENSHOTS=1` and `HR_TEST_DATA_SCOPE=demo|seeded`.
4. Add QA metadata (`expectedResult`, `inputDataRef`, `assertionType`, failure feedback) for scenario steps.
5. Reset suite state between tests with `resetSuiteStorage(...)` unless the
   test intentionally seeds workflow state.

## Coverage matrix

| Future full-suite file | Domain | Existing specs to reuse/wrap | First-pass status |
|---|---|---|---|
| `00-smoke.spec.ts` | Core persona/domain smoke | `persona-walkthrough.spec.ts`, `home.spec.ts` | Implemented now |
| `01-auth-persona.spec.ts` | Auth/persona/session | `auth.spec.ts`, `persona-switch-qa.spec.ts` | Matrix now; expand next |
| `02-employee-self-service.spec.ts` | ESS/profile/documents/resignation | `profile-edit-e2e.spec.ts`, `chain-1-ess-termination.spec.ts`, `chain-3-ess-profile-edit.spec.ts` | Representative route flow now |
| `02-hr-admin-hire.spec.ts` | HR admin hire lifecycle QA evidence | `add-employee-sanity.spec.ts`, `chain-2-hire-audit.spec.ts` | Implemented as first QA metadata scenario pack |
| `03-hr-admin-employee-lifecycle.spec.ts` | Hire/employee lifecycle/audit | `add-employee-sanity.spec.ts`, `chain-2-hire-audit.spec.ts`, `chain-4-promotion.spec.ts` | Expand next |
| `04-manager-approvals.spec.ts` | Manager/SPD/HRBP approvals | `quick-approve.spec.ts`, `chain-5-manager-leave-queue.spec.ts` | Matrix now |
| `05-time-benefits-payroll.spec.ts` | Time, benefits, payroll | `time-attendance.spec.ts`, `benefit-claim-workflow.spec.ts`, `payroll.spec.ts` | Matrix now |
| `06-performance-learning-talent.spec.ts` | Performance, learning, talent | `performance.spec.ts`, learning/talent routes | Matrix now |
| `07-system-admin-reports.spec.ts` | System admin/users/reports | `settings.spec.ts`, admin/system tests | Matrix now |
| `08-cross-cutting-a11y-i18n-responsive.spec.ts` | Accessibility/i18n/mobile/Humi | `accessibility.spec.ts`, `i18n.spec.ts`, `responsive.spec.ts` | Matrix now |
