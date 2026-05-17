# STA-31 Payroll demo design approval pack

**Linear:** STA-31 — `[HR Demo][Payroll] Seed scope for payroll design approval before backend`  
**Approval purpose:** HR/Payroll design sign-off before engineering starts backend implementation.  
**Gate:** Backend implementation is blocked until HR/Payroll sign-off is complete.

## 1. Executive approval summary

This pack defines the Payroll demo scope that should be reviewed by HR, Payroll, and Finance stakeholders before backend work begins. It is a UI/demo approval contract, not a calculation specification.

The demo story must cover the full cycle: **Setup**, **Run**, **Review**, **Approve**, **Payslip**, and **Report**. The intended reviewer outcome is a clear approve / reject / change-request decision on screen coverage, data visibility, masking, demo caveats, and workflow boundaries.

Decision requested from reviewers:

- Confirm the current screen inventory is sufficient for a Payroll design demo.
- Confirm sensitive data is masked or excluded in the correct places.
- Confirm government report actions are mock-only and acceptable for design approval.
- Confirm backend implementation can remain blocked until every sign-off checklist item is accepted.

## 2. Scope boundary: UI/demo approval vs backend-later

### In scope for STA-31 approval

- Payroll landing/navigation cards for setup, processing, government reports, and tax review.
- Payroll setup UI for pay period, payment day, SSO rate, provident fund/PVD default rate, tax brackets, and bank transfer display.
- Payroll processing UI for period selection, calculation progress, review table, anomalies, export affordance, and approval action.
- Employee-facing Payslip / pay statement access via the canonical profile employment anchor.
- Government report generation/history UI for **PND1**, **SSO**, and **PVD**.
- Tax review / employee tax planning requests routed to Payroll review with masked Tax ID and approve/reject/send-back actions.
- Persona access expectations for **Payroll Officer**, **HR/Finance Approver**, and **Employee read-only**.
- Masking requirements for currency, bank account, National ID, and tax ID.

### Out of scope until after sign-off

- Real payroll calculation engine, production tax logic, or binding payroll outputs.
- Bank file generation, bank transfer submission, or direct banking integration.
- Revenue Department submission, SSO submission, or PVD provider submission.
- GL posting or accounting integration.
- Production audit controls, re-authentication, cut-off calendar, approvals engine, or backend data model.
- Any source implementation in this worktree. This deliverable is document-only.

**Backend implementation is blocked until HR/Payroll sign-off** on this pack. If sign-off changes the UI contract, backend design must follow the signed version, not current mock assumptions.

## 3. Current repo evidence

| Evidence area | Current implementation evidence | Approval implication |
| --- | --- | --- |
| Payroll landing | `src/frontend/src/app/[locale]/payroll/page.tsx` gates access with `canAccessModule(roles, 'payroll-processing')`, shows `DemoValuesDisclaimer`, quick stats, and cards for setup, processing, reports, and tax review. | Landing page can act as the review hub, but quick stats are illustrative. |
| Setup | `src/frontend/src/components/payroll/payroll-setup.tsx` shows pay period/payment day, SSO/PF rates, read-only Thai PIT brackets, and bank transfer status. | Reviewers should approve setup fields as demo fields only. |
| Run/Review/Approve | `src/frontend/src/components/payroll/payroll-processing.tsx` uses stages `period_selection`, `calculation`, `review`, `approval`; review table includes employee, department, gross, tax, SSO, PF, deductions, net, and anomaly icon. | This is the core **Run → Review → Approve** story. |
| Reports | `src/frontend/src/components/payroll/government-reports.tsx` supports report types `pnd1`, `pnd1_kor`, `sso`, `pvd`; generation adds mock history and download icon. | Report actions are preview/download affordances only, not filing. |
| Payslip route | `src/frontend/src/app/[locale]/payslip/page.tsx` redirects legacy payslip bookmarks to `/profile/me?tab=employment#pay-statements`. | Current employee Payslip is profile-based, not a standalone payroll route. |
| Employee payslip route | `src/frontend/src/app/[locale]/employees/me/payslip/page.tsx` also redirects to `/profile/me?tab=employment#pay-statements`. | Same canonical Payslip destination for Employee read-only persona. |
| Employee compensation/payslip surface | `src/frontend/src/components/profile/CompensationSummary.tsx` has `maskCurrency`, an eye toggle, `DemoValuesDisclaimer`, and pay statement links. | Employee salary visibility follows the masking/reveal demo pattern. |
| Bank account masking | `src/frontend/src/components/profile/tabs/compensation.tsx` renders bank account through `maskValue(...)`; `src/frontend/src/lib/date.ts` keeps only the final visible characters. | Bank account masking must remain default for employee-facing compensation. |
| Tax planning/review | `src/frontend/src/app/[locale]/payroll/tax-review/page.tsx` shows a Payroll review queue with masked Tax ID, estimate summary, notes, start/send-back/approve/reject/cancel actions. | Tax review is safe-summary review, not full payroll or filing. |
| RBAC | `src/frontend/src/lib/rbac.ts` allows `payroll-setup`, `payroll-processing`, and `government-reports` for `hr_admin` and `hr_manager`; employee can access `payslip`. | Demo personas map to existing roles but need business labels for approval. |
| Mock data | `src/frontend/src/hooks/use-payroll.ts` contains mock config, earning/deduction types, tax brackets, banks, payroll runs, payslips, and report history. | Mock numeric values are illustrative and non-binding. |

## 4. Screen inventory for HR/Payroll review

| Screen | URL / entry | Primary reviewer | Purpose | Approval question |
| --- | --- | --- | --- | --- |
| Payroll hub | `/{locale}/payroll` | Payroll Officer, HR/Finance Approver | Entry point for Payroll demo modules. | Are the four cards and summary stats sufficient for demo navigation? |
| Setup | `/{locale}/payroll/setup` | Payroll Officer | Confirm demo setup fields: pay period, payment day, SSO, PF/PVD, tax brackets, bank status. | Are these fields enough for a design demo before backend rules are known? |
| Run / processing | `/{locale}/payroll/processing` | Payroll Officer | Select month/year and scope, then Run calculation. | Is the period/scope model acceptable without a cut-off calendar? |
| Review | Stage 3 inside processing | Payroll Officer | Review payroll table, totals, anomalies, and export affordance. | Are columns sufficient and are prohibited identifiers absent? |
| Approve | Stage 4 inside processing | HR/Finance Approver | Approve the calculated payroll run in demo. | Is one approval action enough for demo, with production approval matrix backend-later? |
| Payslip | `/profile/me?tab=employment#pay-statements` via legacy redirects | Employee read-only | Show employee pay statement links and masked current compensation. | Is profile employment the approved Payslip location? |
| Report | `/{locale}/payroll/reports` | Payroll Officer, HR/Finance Approver | Generate and view history for PND1, SSO, PVD mock reports. | Are preview/download mock actions enough before filing integrations? |
| Tax review | `/{locale}/payroll/tax-review` | Payroll Officer | Review employee tax planning requests with masked Tax ID and safe summaries. | Are approve/reject/send-back actions sufficient for design review? |
| Tax planning | `/{locale}/payroll/tax-planning` | Employee read-only, Payroll Officer | Employee estimate/request surface feeding Payroll review. | Is this understood as planning only, not payroll or tax filing submission? |

## 5. Field inventory and masking model

### Payroll admin review table

Allowed fields for Payroll Officer and HR/Finance Approver in admin payroll tables:

- Employee name
- Employee ID only if needed for reconciliation; current processing table uses employee name and department
- Department
- Gross, tax, SSO, PVD/PF, deductions, net pay
- Anomaly indicator and text
- Run period, totals, status

Prohibited fields in payroll tables:

- **National ID / tax ID must not show in payroll tables**.
- Raw bank account number must not show in payroll tables.
- Full employee tax ID must not show in payroll processing or government report history tables.

### Employee read-only masking

Employee-facing payroll/compensation views must default to masked values:

- `maskCurrency` masks the current compensation amount until the employee toggles visibility.
- Bank account masking uses `maskValue(...)` and should show only the final visible characters.
- Tax ID is masked through `maskTaxId(...)` in tax planning/review contexts.
- Cross-employee presentation mode must use masked or aggregate values only; individual pay should not be exposed outside authorized Payroll Officer / HR/Finance Approver contexts.

### Masking approval rules

| Data element | Payroll Officer | HR/Finance Approver | Employee read-only | Rule |
| --- | --- | --- | --- | --- |
| Payroll amounts in admin run table | Visible | Visible for approval | Not visible across employees | Admin amounts may be unmasked for authorized review. |
| Own current compensation | Not the primary viewer | Not the primary viewer | Masked by default with `maskCurrency` reveal toggle | Reveal is demo-only; real re-auth is backend-later. |
| Own Payslip / pay statement summary | Not the primary viewer | Not the primary viewer | Own records only | Payslip is own-record, read-only access. |
| Bank account | Masked unless future approved process requires otherwise | Masked unless future approved process requires otherwise | Masked by default | Bank account masking is mandatory in employee surfaces. |
| National ID | Hidden | Hidden | Hidden from payroll surfaces | National ID must not show in payroll tables. |
| Tax ID | Masked summary only for tax review | Masked summary only for approval context | Masked in tax planning | Full tax ID must not show in payroll tables. |

## 6. Payroll status/stage inventory

### Processing stages

| Stage | Repo stage key | Demo label | Success condition |
| --- | --- | --- | --- |
| Setup | setup screen, not a processing stage | Setup | Demo pay period, payment day, SSO/PVD, bank status, and tax bracket fields are visible. |
| Run | `period_selection` then `calculation` | Run | Payroll Officer selects month/year/scope and triggers calculation. |
| Review | `review` | Review | Totals, employee payroll rows, deductions, net pay, and anomalies are visible for review. |
| Approve | `approval` | Approve | HR/Finance Approver can approve the mock run. |
| Payslip | profile employment pay statements | Payslip | Employee read-only can reach own pay statements without seeing other employees. |
| Report | government report screen | Report | PND1, SSO, and PVD report generation/history/download mock actions are visible. |

### Run statuses and report statuses

- Payroll run status values in current mock hook: `draft`, `calculated`, `reviewed`, `approved`.
- Government report status values in current mock hook: `generated`, `submitted`, `accepted`.
- Tax planning status values include `draft`, `estimated`, `submitted_payroll`, `payroll_reviewing`, `send_back`, `approved`, `rejected`, and `cancelled`.

Approval note: `reviewed` exists in the type model but the current processing UI moves directly from Review to Approve. If HR/Finance requires a distinct reviewed/locked state, that is a backend-later requirement unless requested before sign-off.

## 7. Persona journey maps

### Payroll Officer

1. Open Payroll hub.
2. Enter Setup and confirm demo configuration.
3. Enter processing and Run a payroll period.
4. Review totals, row-level deductions, anomalies, and export affordance.
5. Prepare handoff to HR/Finance Approver.
6. Generate Report previews/downloads for PND1, SSO, and PVD after approval.
7. Review tax planning requests: start review, send back, approve, or reject.

Access expectation: maps to current `hr_admin` / `hr_manager` gates for payroll modules until a dedicated Payroll Officer role is approved.

### HR/Finance Approver

1. Open Payroll hub and processing approval stage.
2. Review period, employee count, total net pay, and exception status.
3. Approve or reject by business decision; current demo only includes approve, so reject/return is backend-later unless added before sign-off.
4. Confirm government Report history and download affordances are acceptable as mock actions.

Access expectation: maps to current `hr_admin` / `hr_manager`; final authority matrix is backend-later.

### Employee read-only

1. Open Payslip from legacy route or quick action and land on profile employment `#pay-statements`.
2. View own pay statement links only.
3. See compensation masked by default through `maskCurrency`.
4. See bank account masking in compensation payment info.
5. Submit Tax review / employee tax planning requests through the tax planning flow when in scope.

Access expectation: employee can access own payslip/profile data only; no cross-employee payroll table access.

## 8. Mock data registry and illustrative-number caveats

All mock numeric values are illustrative and non-binding. They are useful for design review, visual layout, and story completeness only; they must not be interpreted as payroll, tax, SSO, PVD, or payslip calculation correctness.

| Registry item | Current source | Examples / shape | Caveat |
| --- | --- | --- | --- |
| Payroll config | `use-payroll.ts` `MOCK_CONFIG` | monthly pay period, payment day 25, SSO 5%, PVD/PF 5%, SSO base 15,000, Bangkok Bank | Not final business rules. |
| Earning types | `use-payroll.ts` `MOCK_EARNING_TYPES` | BASE, OT, HOUSE, TRANS, PERF | Labels/categories are demo taxonomy. |
| Deduction types | `use-payroll.ts` `MOCK_DEDUCTION_TYPES` | TAX, SSO, PVD, LOAN | Not final deduction engine. |
| Tax brackets | `use-payroll.ts` `THAI_TAX_BRACKETS`; `tax-planning.ts` assumptions | Progressive tax brackets and caps | Not legal advice or binding tax computation. |
| Banks | `use-payroll.ts` `MOCK_BANKS` | BBL, KBANK, SCB, KTB, TMB | Bank integration is display-only. |
| Payroll runs | `use-payroll.ts` `MOCK_PAYROLL_RUNS` | January/February 2026 totals | Totals are illustrative and non-binding. |
| Payslip summaries | `use-payroll.ts` `MOCK_PAYSLIPS` | Employee, department, gross, tax, SSO, PF, net, anomaly | No raw bank account, National ID, or tax ID should be added to this table. |
| Report history | `use-payroll.ts` `MOCK_REPORT_HISTORY` | PND1, SSO, PVD generated/submitted/accepted rows | Download is mock-only. |
| Pay statements | `CompensationSummary.tsx` `PAY_STATEMENTS` | Monthly statement links and net pay text | Statement values are illustrative and non-binding. |
| Tax planning profile/drafts | `benefit-tax-planning.ts`, `tax-planning.ts` | maskedTaxId, safe estimate summary, status transitions | Planning only; not tax filing or payroll snapshot mutation. |

## 9. Government reporting boundary

Government reports in the STA-31 demo are for review of UI affordances only.

Included:

- **PND1** monthly withholding report option.
- PND1 Kor annual withholding report option as an adjacent mock report type.
- **SSO** monthly social security report option.
- **PVD** monthly provident fund report option.
- Generate button, report history, status badge, record count, and download icon.

Excluded until backend-later:

- Official file schema validation.
- Digital signature, submission, or agency login.
- Revenue Department filing.
- SSO filing.
- PVD provider file delivery.
- Reconciliation, correction filings, or audit trail.

Approval wording: HR/Payroll should approve only that the Report screen represents the right report families and actions for a demo. Backend implementation is blocked until HR/Payroll sign-off confirms whether the final report list is PND1, PND1 Kor, SSO, PVD, or a different statutory taxonomy.

## 10. Humi/design-token risk notes

The Payroll demo should conform to Humi design token/component conventions:

- Use Humi components such as `Card`, `CardTitle`, `Button`, `DemoValuesDisclaimer`, and tokenized text/surface classes.
- Use token colors and surfaces such as `text-ink`, `text-ink-muted`, `border-hairline`, `bg-surface`, and Humi card styles.
- Keep Thai-first copy where the local screen is Thai-first, with English terms only where already used for payroll labels.
- Avoid legacy red/admin styles; danger/reject states should follow approved Humi danger treatment.
- Keep `DemoValuesDisclaimer` visible on demo numeric screens to reinforce that mock numeric values are illustrative and non-binding.

Risks to review:

- `PayrollProcessing` currently uses a yellow icon class for anomaly highlighting; reviewers should approve only the behavior, while final visual token alignment can be cleaned during implementation.
- Employee Payslip is currently embedded in profile employment and not a standalone detailed payslip breakdown. If HR/Payroll expects a separate detailed Payslip screen, this must be captured before backend work.
- Current business personas are represented through existing `hr_admin`, `hr_manager`, and `employee` roles; dedicated Payroll Officer and HR/Finance Approver role labels are not yet implemented.

## 11. Demo checklist

Use this checklist during the review meeting.

- [ ] Open Payroll hub and confirm setup, processing, reports, and tax review navigation cards.
- [ ] Open Setup and confirm pay period, payment day, SSO, PVD/PF, tax bracket, and bank transfer fields.
- [ ] Run payroll for a month/year and confirm the flow advances to Review.
- [ ] Confirm Review table has the required payroll columns and omits National ID / tax ID.
- [ ] Confirm anomalies are visible enough for Payroll Officer review.
- [ ] Confirm Approve stage gives HR/Finance Approver enough context to approve the mock run.
- [ ] Confirm Payslip route lands on profile employment pay statements.
- [ ] Confirm `maskCurrency` masks employee compensation by default.
- [ ] Confirm bank account masking is present in employee compensation payment info.
- [ ] Confirm Report screen includes PND1, SSO, and PVD mock actions.
- [ ] Confirm tax review / employee tax planning requests use masked Tax ID and safe summaries.
- [ ] Confirm all mock numeric values are illustrative and non-binding.

## 12. RAID/TBD register

| Type | Item | Current position | Owner before backend |
| --- | --- | --- | --- |
| Risk | Current Payslip is profile-embedded, not standalone detail breakdown. | Accept for demo or request a screen change before backend. | HR/Payroll |
| Risk | Dedicated Payroll Officer / HR/Finance Approver roles are business labels, not current RBAC roles. | Map to `hr_admin` / `hr_manager` for demo. | Product + HRIS |
| Risk | Admin payroll review table shows full amounts. | Allowed for Payroll Officer and HR/Finance Approver; cross-employee presentation mode must mask/aggregate. | HR/Payroll |
| Assumption | Month/year picker is sufficient for demo. | Cut-off calendar is backend-later. | Payroll |
| Assumption | PND1, SSO, PVD are sufficient statutory report anchors for approval. | PND1 Kor exists in mock options and needs final acceptance. | Payroll + Finance |
| Issue | Reject/return from payroll approval is not implemented in current processing stage. | Backend-later unless required for design sign-off. | HR/Finance Approver |
| Dependency | Final payroll calculation formulas and statutory rules. | Explicitly out of scope; mock numeric values are illustrative and non-binding. | Payroll + backend later |
| TBD | Whether employee tax planning approval should update payroll inputs. | Current boundary says no direct payroll snapshot mutation. | Payroll + Tax |

## 13. Sign-off checklist

Backend implementation is blocked until HR/Payroll sign-off completes all items below.

- [ ] STA-31 scope approved as UI/demo approval only.
- [ ] Full cycle approved: Setup, Run, Review, Approve, Payslip, Report.
- [ ] Persona model approved: Payroll Officer, HR/Finance Approver, Employee read-only.
- [ ] Payroll Officer access and unmasked admin amount visibility approved.
- [ ] HR/Finance Approver approval-stage visibility approved.
- [ ] Employee read-only own Payslip access approved.
- [ ] `maskCurrency` employee compensation behavior approved.
- [ ] Bank account masking behavior approved.
- [ ] National ID / tax ID exclusion from payroll tables approved.
- [ ] Government report boundary approved for PND1, SSO, and PVD mock actions only.
- [ ] Tax review / employee tax planning requests approved as safe-summary planning flow only.
- [ ] Mock numeric values are illustrative and non-binding disclaimer approved.
- [ ] Humi design token/component conformance accepted for the demo approval direction.
- [ ] Backend implementation unblocked only after all above boxes are checked by HR/Payroll.

## 14. Knowledge sources consulted

No `omx_wiki/index.md` was present in this fresh worktree; no relevant `.omx/context` or `.omx/plans` files were found for STA-31/payroll during preflight.

- `/Users/tachongrak/Projects/hr/AGENTS.md`
- `/Users/tachongrak/.ouroboros/seeds/seed_db62bafb4a3f.yaml`
- `src/frontend/src/app/[locale]/payroll/page.tsx`
- `src/frontend/src/components/payroll/payroll-processing.tsx`
- `src/frontend/src/components/payroll/payroll-setup.tsx`
- `src/frontend/src/components/payroll/government-reports.tsx`
- `src/frontend/src/app/[locale]/payslip/page.tsx`
- `src/frontend/src/app/[locale]/employees/me/payslip/page.tsx`
- `src/frontend/src/app/[locale]/payroll/setup/page.tsx`
- `src/frontend/src/app/[locale]/payroll/processing/page.tsx`
- `src/frontend/src/app/[locale]/payroll/reports/page.tsx`
- `src/frontend/src/app/[locale]/payroll/tax-planning/page.tsx`
- `src/frontend/src/app/[locale]/payroll/tax-review/page.tsx`
- `src/frontend/src/hooks/use-payroll.ts`
- `src/frontend/src/lib/rbac.ts`
- `src/frontend/src/lib/date.ts`
- `src/frontend/src/lib/tax-planning.ts`
- `src/frontend/src/stores/benefit-tax-planning.ts`
- `src/frontend/src/components/profile/CompensationSummary.tsx`
- `src/frontend/src/components/profile/tabs/compensation.tsx`
