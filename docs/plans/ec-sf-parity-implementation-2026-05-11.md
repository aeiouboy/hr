# EC/SF parity implementation note — 2026-05-11

Source context: Stark `EC-FEATURE-SF-PARITY-MATRIX-2026-05-11.md` and deep-interview spec from 2026-05-11. This HR repo note maps matrix findings to executable code work; it is not a replacement for the Stark source-of-truth docs.

## High-confidence P0 mappings found in this repo

| Matrix feature | Parity evidence | Existing HR surface | Implementation status / backlog |
|---|---|---|---|
| 1.4 Payment Foundation Object; 3E Compensation | BA fallback rows 190–206; payrate-change rows 2–11; BRD #118/#120 | `src/app/[locale]/admin/hire/steps/StepCompensation.tsx`, hire wizard compensation store/SF mapper, profile bank editor | Implemented first slice: hire compensation payment-account fields now use Thai-primary Humi-visible labels and Humi attachment dropzone copy for the P0 payment account surface. Deeper payment-routing rules remain backlog until SF/API rules are sourced. |
| 5.1 ESS | BRD #165–173; profile, emergency contact, org chart, compensation/payroll info | `src/app/[locale]/profile/me`, `src/app/[locale]/ess/*`, profile store/components | Existing surfaces cover personal/contact/bank/emergency and compensation summary. Backlog: reconcile quick-actions tile and document access against matrix BRD #171/#173. |
| 5.3 Admin Self Service | BRD #178–183 | `src/app/[locale]/admin/self-service/*`, `useAdminSelfService` | Existing admin SS routes and tests present. Backlog: add matrix trace IDs to route tests without exposing SF labels in UI. |
| 6.1–6.6 User Management | BRD #184–189 | `src/app/[locale]/admin/users/*`, `useUsersPermissions` | Existing routes/store/tests cover data permissions, roles, assignment, proxy, foundation audit, audit report. Backlog: verify export/audit filters against matrix once BRD coverage spine is restored. |
| 1.1–1.3 and 2.x Foundation/org/job/position | SF FO/Position/FODepartment cites | `src/app/[locale]/admin/organization`, `admin/jobs`, `admin/positions`, `org-chart`, loaders/stores | Backlog: map foundation hierarchy and A6/A7 title split to current org/position mock loaders before code changes; current matrix lacks enough UI business rules for new fields. |
| 3A/3B Employee personal/employment | Per/Emp entities; A1/A3/A8 gap notes | `profile/me`, `admin/employees`, lifecycle wizard/store | Existing profile and lifecycle surfaces are broad. Backlog: implement only sourced gaps (effective-date/history/3 start dates) through lifecycle contracts; do not infer rules. |

## This run's implementation slice

- Scope: P0 payment account information in admin hire compensation.
- Why safe: route/store/component already exists; parity matrix explicitly identifies Payment Foundation and Compensation as P0; Humi contract requires Thai-primary UI and no visible SF-style/internal labels.
- Non-goals: no payment API behavior, no payroll engine, no new SF extraction, no new dependency.
- Verification target: focused hire-step tests plus Humi design-system scan for changed files.

## Ralph continuation slice — remaining P0/P1 parity gaps

- 5.1 ESS quick actions + document access:
  - BRD #171 is traced by `QuickActionsTile` and its focused test; default ESS actions remain Thai-primary and include the document request action.
  - BRD #173 document access is traced by `/me/documents` tests, and the home document card now links to the canonical document library instead of an unrelated benefits route.
- 5.3 Admin Self Service:
  - BRD #178-183 route/card traceability is covered by a hub-level regression test. Existing BRD badges remain in the admin/test surface; no new BRD IDs were added to employee-facing UI.
- 6.1-6.6 User Management:
  - BRD #184 data-permission scope coverage now has explicit store assertions.
  - BRD #189 audit filter parity now includes a combined user + action + entity regression, alongside existing date/action/export tests.

## Remaining blockers

- Foundation/org/position A6/A7 traceability remains blocked for implementation because the matrix itself flags several rows as needing SF MDF extraction or the missing `BRD-COVERAGE-MATRIX-2026-04-24.md` spine. This run did not invent hierarchy/title rules beyond existing mock data.
- Deeper payment routing, payroll engine behavior, and backend/schema changes remain out of scope until sourced rules or API contracts are available.

## JARVIS continuation slice — profile compensation parity

- BRD #170: `/profile/me` now keeps Compensation as its own tab, separate from Employment and Emergency Contacts, with `CompensationSummary` as the canonical masked salary + pay-statement surface.
- Legacy payslip links now route to `/profile/me?tab=compensation#pay-statements` instead of the Employment tab.
- Profile tab copy remains Thai-primary (`ค่าตอบแทน`, `ติดต่อฉุกเฉิน`) with English locale support and no new dependencies.
