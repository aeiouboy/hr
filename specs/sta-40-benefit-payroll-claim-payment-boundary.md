# STA-40 - Benefit x Payroll Claim Payment Boundary

Status: Approval seed / storyboard decision note  
Linear: STA-40 - [HR Demo][Benefit x Payroll] Claim payment boundary and handoff wording  
Date: 2026-05-17  
Scope: Benefit x Payroll wording approval only before backend implementation

## 1. Decision Summary

STA-40 resolves the STA-33 High RAID item: approved Benefit claims and payment previews must not imply real payment, payroll posting, bank integration, insurer sync, GL posting, or statutory/payment execution.

Recommended default:

- Use **Approved claim** / **อนุมัติคำขอแล้ว** for the Benefit service decision.
- Use **Reimbursement preview** / **ตัวอย่างรายการเบิกคืน** for employee-facing or HR-facing amount preview.
- Use **Payment preview** / **ตัวอย่างการจ่าย** only for HR Admin or Payroll/Finance review surfaces.
- Use **Payroll handoff preview** / **ตัวอย่างส่งต่อ Payroll** when a Benefit-approved claim is prepared for Payroll/Finance review.
- Use **Finance export preview** / **ตัวอย่างไฟล์ส่งต่อ Finance** for downloadable/export-shaped demo artifacts.
- Avoid **paid**, **posted**, **transferred**, **bank file generated**, **sent to payroll**, **sent to insurer**, or **synced** unless the same sentence says **demo/mock only, not executed**.

Approval request: HR Benefit, HR Admin/SPD, Payroll/Finance, Product, and Engineering approve this wording as the default demo contract before any backend work starts.

## 2. HR / Payroll / Benefit Approval Options

| Option | Wording posture | Pros | Risks | Recommendation |
| --- | --- | --- | --- | --- |
| A. Preview-only handoff wording | Approved Benefit claim creates reimbursement/payment/payroll handoff previews only | Safest; aligns STA-31, STA-32, STA-33, STA-38, and STA-39; clear for HR approval decks | Presenter must repeat boundary when showing payment dashboard | Recommended default |
| B. Operational payment wording with disclaimer | Use terms like paid/posted but add mock-only disclaimers | Sounds realistic | High risk stakeholders read demo as real payment or payroll posting readiness | Not recommended |
| C. Benefit-only wording | Stop at Approved claim and hide payment/payroll preview | Very safe | Payroll/Finance cannot approve handoff field shape before backend | Use only if Finance rejects preview surfaces |
| D. Full finance/payroll terminology | Show bank file, SAP/payroll posting, finance export as if ready | Strong backend story | Conflicts with STA-33/STA-38; implies integrations not approved | Reject for demo seed |

Decision to approve: choose Option A. Benefit owns approval status; Payroll/Finance owns future real payroll/payment truth; Engineering keeps backend blocked until signed follow-up implementation scope exists.

## 3. Lifecycle Wording Contract

| Term | Use this when | Must not imply | Recommended copy |
| --- | --- | --- | --- |
| Approved claim | SPD/HR/approved demo actor has accepted the claim request | Money has been paid, payroll has accepted it, insurer has synced, or documents are audit-grade | "Claim approved for demo review. Payment and payroll execution are not started." |
| Reimbursement preview | Employee, SPD, or HR Admin sees the eligible amount and claim context | Legal reimbursement entitlement, final payable amount, bank transfer, tax treatment, or payroll posting | "Preview reimbursement amount for approval discussion." |
| Payment preview | HR Admin/Payroll/Finance sees a candidate payment row or dashboard state | Real payment, paid status, payment instruction, SAP posting, bank file generation, or close-period truth | "Payment preview only - not paid, not posted." |
| Payroll handoff | Benefit-approved row is ready for Payroll/Finance review in the storyboard | Payroll has imported it, calculated it, posted it, deducted it, or included it in a pay run | "Ready for Payroll/Finance review; backend handoff later." |
| Finance export preview | Demo export/download/table shows fields that Finance may later need | Production export, bank file, GL entry, accounting posting, retention, or audit evidence | "Preview export layout; no production file created." |
| Paid/Closed | Only if showing an explicitly fake terminal demo state | Actual payment settlement, bank confirmation, employee receipt, payroll lock, or insurer settlement | Prefer "Closed in demo" or "Mock paid/closed state." |

Thai guidance: prefer **ตัวอย่าง**, **รอส่งต่อ**, **เพื่อการอนุมัติแบบ Demo**, and **ยังไม่จ่ายเงินจริง**. Avoid standalone **จ่ายแล้ว**, **โพสต์เข้า Payroll แล้ว**, **ส่งธนาคารแล้ว**, or **sync insurer แล้ว**.

## 4. Boundary Matrix

| Boundary | Benefit | HR Admin / SPD | Payroll / Finance | Engineering |
| --- | --- | --- | --- | --- |
| Claim approval | Owns claim status, SPD/HRBP/SPD service review wording, and employee history state | HR Admin can review records, reports, exceptions, payment preview | May view approved-claim preview for finance/payroll discussion | No backend workflow, audit, or persistence from this seed |
| Reimbursement amount | Shows demo claim amount and eligible preview | Can review amount in admin/payment preview | Treats amount as illustrative until payroll/finance rules approved | No calculation engine or entitlement engine |
| Payment preview | Provides approved rows to admin/payment preview | Owns dashboard wording and disabled/mock actions | Reviews handoff fields; no payment authority from UI | No bank files, payment APIs, SAP posting, or GL |
| Payroll handoff | Marks item as candidate for handoff only | Confirms item is admin-reviewed before handoff preview | Future owner of pay run import, tax treatment, deduction/reimbursement posting | Backend issue required before integration or posting |
| Finance export | Supplies preview fields such as employee, plan, amount, period, wage type placeholder | May show disabled export or preview table | Defines future format only after sign-off | No production export/download retention |
| Insurer / hospital / ePatient | Referral and claim evidence remain Benefit service context | SPD owns referral letter demo state | No payroll/payment dependency | No insurer, hospital, ePatient, or provider sync |
| Sensitive data | Claim/payment details minimized and masked per STA-38 | Medical-like detail visible only in role story | Payment refs and bank refs masked/shortened | No server RBAC/re-auth/audit implementation |

## 5. Demo Copy And Narration Guidance

Screens:

- Label dashboard rows as **Payment preview**, **Payroll handoff preview**, or **Finance export preview**.
- If current UI says `posted`, `payDate`, `bank file`, or SAP wage type, presenter copy must explain these are mock reference fields and not executed state.
- Disabled payment buttons should remain framed as **ปิดใช้งานในโหมด Mockup** / disabled in mockup.
- Approved claim cards should say the service decision is complete, while payment and payroll are still later.

Decks and storyboard notes:

- Use "Approved claims can be reviewed by HR Admin and Payroll/Finance before backend design" rather than "claims are sent to payroll."
- Use "field layout for future finance export" rather than "finance export file."
- Use "candidate payroll period" rather than "posted payroll period."
- Add a footer on payment/payroll slides: "Demo preview only: no payroll posting, bank file, payment execution, insurer sync, or GL posting."

Exports:

- Export samples must be called **preview export** or **mock export**.
- Mask or fictionalize employee identifiers, bank/payment references, receipts, dependent identifiers, medical-like details, and amounts unless the owner group explicitly reviews in role context.
- No filename should imply production payment, bank upload, insurer submission, or payroll import.

Presenter mode:

- Start with: "วันนี้แสดง flow และ wording เพื่ออนุมัติ story เท่านั้น ยังไม่ใช่ backend/payment/payroll truth."
- When moving from Benefit to Payroll, say: "Benefit has approved the claim in demo state; Payroll/Finance is only reviewing a preview of what a future handoff may need."
- Close with: "Backend work remains blocked until owners sign the wording, masking, and handoff gates."

## 6. STA-38 Masking Alignment

STA-40 inherits STA-38 Option A: strict shared-demo masking by default with reveal only in explicit owner role context.

| Data category | STA-40 rule |
| --- | --- |
| Benefit claim/payment detail | Mask or minimize in shared demo; SPD/HR role story may show only what is needed for approval |
| Payment references | Use mock reference, prefix plus last 4, or masked value; never present as real bank/payment confirmation |
| Bank account / bank file | Do not show full account or production bank file; bank file remains backend-later |
| Tax ID / national ID | Never full in shared demo; masked only if needed |
| Payroll amounts and totals | Mask in presenter/shared deck unless Payroll/Finance owner reviews in explicit role context |
| Exports/screenshots/downloads | Mock-only, masked or fictionalized, no production storage or retention claim |
| Medical-like and dependent data | Minimize hospital, disease/category, receipt, attachment, dependent identifier, and referral/ePatient detail |

Recommended reference wording: "Payment and payroll references are masked and fictional for demo approval; they are not payment instructions."

## 7. UI Demo Status vs Backend Truth

The demo may show client-side statuses, disabled buttons, mock rows, and preview exports. These are **UI/demo statuses only**.

| UI/demo status | Backend/payment/payroll/insurer truth |
| --- | --- |
| Claim approved | Benefit service decision only; no payment has happened |
| Eligible / ready for payment preview | Candidate row only; no payable ledger or liability created |
| Posted in current mock table | Treat as mock label only; no payroll, SAP, GL, bank, or finance posting |
| Payment period / pay date | Candidate calendar preview only; no payroll lock or payment calendar authority |
| Wage type mapping | Placeholder for owner discussion; no SAP or payroll configuration approved |
| Generate / export / copy disabled action | Disabled mock action; no production file, storage, retention, or audit evidence |
| Referral letter issued | Demo referral state only; no hospital/ePatient/insurer sync |
| Paid/Closed if shown | Closed demo story only; not settlement or employee payment receipt |

Engineering must not treat UI status names as backend state-machine requirements until a signed backend seed defines APIs, persistence, integration contracts, RBAC, audit, retry/error handling, and ownership.

## 8. Owner And Sign-Off Gates Before Backend Work

| Gate | Required owner/sign-off | Decision required |
| --- | --- | --- |
| Default wording option | HR leadership + HR Benefit + Payroll/Finance + Product | Approve Option A or choose replacement wording |
| Benefit approval term | HR Benefit + SPD + HRBP where applicable | Confirm "Approved claim" means service approval only |
| Payroll handoff term | Payroll owner + Finance owner | Confirm preview wording does not imply import/posting/run inclusion |
| Finance export term | Finance owner + Product | Confirm export preview wording and field list are acceptable |
| Payment reference masking | Finance + Security/Legal + HR Benefit | Confirm STA-38 masking for payment refs, bank refs, claim details, screenshots, and exports |
| HR Admin payment dashboard | HR Admin + SPD + Payroll/Finance | Confirm admin dashboard is review/preview only |
| Backend unblock | Product + Engineering + above owners | Confirm signed approval exists and separate backend implementation issues are created |

Sign-off checklist:

| Gate | Decision |
| --- | --- |
| Recommended default: preview-only handoff wording | [ ] Approved / [ ] Revise |
| Approved claim does not mean paid, posted, banked, insurer-synced, or payroll-imported | [ ] Approved / [ ] Revise |
| Payment preview and finance export preview remain mock/demo-only | [ ] Approved / [ ] Revise |
| Payroll handoff preview does not unlock payroll calculation, posting, deduction, or reimbursement integration | [ ] Approved / [ ] Revise |
| STA-38 masking applies to payment refs, claim details, payroll amounts, screenshots, decks, and exports | [ ] Approved / [ ] Revise |
| Backend remains blocked until a signed implementation seed exists | [ ] Approved / [ ] Revise |

## 9. Backend-Later Boundaries

STA-40 does not authorize:

- Backend APIs, database schema, migrations, production seed loaders, persistence, or integration contracts.
- Workflow engine, queue assignment, notifications, SLA timers, escalation rules, immutable audit logs, or production approval authority.
- Entitlement calculation, claim adjudication engine, payroll calculation, deduction/reimbursement posting, tax treatment, payroll lock, retro/off-cycle logic, or pay-run import.
- Payment execution, bank transfer files, bank API/SFTP, payment confirmation, employee settlement, or reconciliation.
- SAP/payroll provider posting, wage type configuration, GL/accounting posting, finance ledger entries, or statutory reporting.
- Insurer, hospital, ePatient, provider, or document-center sync.
- Production document storage, receipt/medical certificate retention, payslip/payment PDFs, signatures, or download controls.
- Server-side RBAC, row-level policy, sensitive reveal re-auth/PIN, or audit-grade access evidence.

Backend work may start only from a separate signed backend seed or implementation issue that references STA-40 and contains owner-approved state names, field contracts, security controls, error/retry behavior, and source-of-truth ownership.

## 10. Candidate Follow-Up Issues

Do not create Linear issues from STA-40 automatically. Raise only if owners request them.

| Candidate follow-up | Trigger | Suggested scope |
| --- | --- | --- |
| Benefit payment preview copy cleanup | HR approves Option A and wants UI labels updated before demo | Replace risky labels such as standalone posted/paid/bank file with preview-only wording |
| Benefit x Payroll backend handoff seed | Owners approve wording and want backend discovery | Define API, state machine, field contract, ownership, RBAC, audit, retry, and non-goals |
| Finance export field approval seed | Finance needs a signed field list before implementation | Lock preview export columns, masking, formats, retention, and owner review |
| Payroll treatment decision seed | Payroll needs tax/deduction/reimbursement policy decisions | Decide whether approved claims become reimbursement earnings, deductions, adjustments, or off-cycle items |
| Payment reference masking implementation seed | Security/Finance want enforceable UI behavior | Define reference patterns, presenter mode, screenshots, exports, role reveal, and tests |

## 11. Approval Note For Review Meeting

Recommended meeting decision text:

> HR, Benefit, SPD/HR Admin, Payroll/Finance, Product, and Engineering approve Option A for the HR demo: an approved Benefit claim may appear in reimbursement preview, payment preview, payroll handoff preview, and finance export preview. These words describe storyboard review only. They do not mean real payment, payroll posting, bank integration, insurer sync, SAP posting, GL posting, statutory filing, document storage, or backend source-of-truth state. Backend implementation remains blocked until a separate signed implementation seed exists.

Minimum conditions before backend:

- Owner sign-off table in Section 8 is completed.
- STA-38 masking decisions are accepted for shared demo, decks, exports, and presenter mode.
- Payroll/Finance confirms the handoff phrase does not imply pay-run inclusion or posting.
- HR Benefit/SPD confirms approved claim means service approval only.
- Product/Engineering confirms future backend state names will not be inferred directly from current UI mock labels.

## 12. Acceptance Coverage

| Acceptance criterion | Coverage in this artifact | Status |
| --- | --- | --- |
| Produces a concise seed or approval note with clear HR decision options | Sections 1, 2, and 11 provide recommended default, options, and meeting approval wording | Covered |
| Lists owner/sign-off required before backend work | Section 8 lists owner gates and sign-off checklist | Covered |
| Calls out mock/demo-only assumptions and backend-later boundaries | Sections 1, 3, 5, 7, 9, and 11 state preview-only and blocked backend scope | Covered |
| Includes Benefit claim/payment lifecycle wording and what each term must not imply | Section 3 defines approved claim, reimbursement preview, payment preview, payroll handoff, finance export, and paid/closed caution | Covered |
| Includes boundary matrix across Benefit, HR Admin/SPD, Payroll/Finance, and Engineering | Section 4 provides the matrix | Covered |
| Includes demo copy/narration guidance for screens, decks, exports, and presenter mode | Section 5 provides copy guidance by artifact type | Covered |
| Aligns sensitive data/payment reference masking with STA-38 | Section 6 applies STA-38 masking to STA-40 payment/handoff contexts | Covered |
| Separates UI/demo status from backend/payment/payroll/insurer truth | Section 7 provides explicit separation table | Covered |
| Includes owner/sign-off gates before backend work | Section 8 provides gates and checklist | Covered |
| Includes candidate follow-up issues only if needed and does not create Linear issues | Section 10 lists candidates only | Covered |
| Includes Knowledge Sources Consulted | Section 13 lists exact sources consulted | Covered |

## 13. Knowledge Sources Consulted

- `AGENTS.md`
- `docs/design-system-humi.md`
- `docs/humi-components.md`
- `/Users/tachongrak/Projects/hr.omx-worktrees/launch-sta-31-payroll-demo-scope/specs/sta-31-payroll-demo-scope.md`
- `/Users/tachongrak/Projects/hr.omx-worktrees/launch-sta-32-benefit-demo-scope/specs/sta-32-benefit-demo-scope.md`
- `/Users/tachongrak/Projects/hr.omx-worktrees/launch-sta-33-all-modules-approval-pack/specs/sta-33-all-modules-approval-pack.md`
- `/Users/tachongrak/Projects/hr.omx-worktrees/build-sta-38-cross-module-masking-policy/specs/sta-38-cross-module-masking-presenter-policy.md`
- `/Users/tachongrak/Projects/hr.omx-worktrees/build-sta-39-benefit-hrbp-spd-approval-clarification/specs/sta-39-benefit-hrbp-spd-approval-clarification.md`
- `src/frontend/src/app/[locale]/admin/benefits/payment/page.tsx`
- `src/frontend/src/app/[locale]/benefits-hub/reimbursement/page.tsx`
- `src/frontend/src/app/[locale]/benefits-hub/hospital-claim/page.tsx`
- `src/frontend/src/app/[locale]/benefits-hub/referral/page.tsx`
- `src/frontend/src/app/[locale]/benefits-hub/history/page.tsx`
- `src/frontend/src/app/[locale]/admin/benefits/exception/page.tsx`
- `src/frontend/src/app/[locale]/admin/benefits/reports/page.tsx`
- `src/frontend/src/components/workflow/BenefitClaimsInbox.tsx`
- `src/frontend/src/components/workflow/BenefitReferralInbox.tsx`
- `src/frontend/src/stores/benefit-claims.ts`
- `src/frontend/src/stores/benefit-referrals.ts`
- `src/frontend/src/stores/benefit-tax-planning.ts`
- `src/frontend/src/app/[locale]/payroll/page.tsx`
- `src/frontend/src/app/[locale]/payroll/setup/page.tsx`
- `src/frontend/src/app/[locale]/payroll/processing/page.tsx`
- `src/frontend/src/app/[locale]/payroll/reports/page.tsx`
- `src/frontend/src/app/[locale]/payroll/tax-review/page.tsx`
- `src/frontend/src/components/payroll/payroll-setup.tsx`
- `src/frontend/src/components/payroll/payroll-processing.tsx`
- `src/frontend/src/components/payroll/government-reports.tsx`
- `omx_wiki/index.md`: none found in this worktree; no wiki canary applicable
- `.omx/context/*.md`: none found by preflight
- `.omx/plans/*.md`: none found by preflight
