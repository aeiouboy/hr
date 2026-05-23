# STA-39 - Benefit HRBP/SPD Approval Clarification

Status: Approval seed / storyboard decision note  
Linear: STA-39 - [HR Demo][Benefit] HRBP/SPD approval clarification linked to STA-27  
Date: 2026-05-17  
Scope: Benefit demo approval only before backend implementation

## 1. Decision Summary

STA-39 clarifies how HRBP and SPD should be presented in the Benefit demo so HR can approve persona boundaries before backend work starts. It is linked to STA-27 but does not replace STA-27.

Recommended default:

- Show HRBP as the policy/business-context reviewer for benefit eligibility, exception rationale, employee relationship context, and escalation recommendation.
- Show SPD as the Benefit service operations reviewer for reimbursement, referral/ePatient handling, special privilege handling, branch/service oversight, and referral letter issue.
- Show HR Admin as the record, rule, report, payment-preview, and admin-control owner after HRBP/SPD review decisions are clear.
- Use `Employee -> Manager -> HRBP -> SPD -> HR Admin` as an optional storyboard chain only when HR confirms it is the right policy story for the request type.
- Keep current demo implementation honest: some existing screens show combined `HRBP/SPD` or SPD-only action states. STA-39 asks HR to approve the intended storyboard, not to treat current client state as a production workflow engine.

Decision to approve: HR accepts Option A in Section 2 as the default demo posture, with request-type chain decisions documented in Section 6.

## 2. HR Approval Options

| Option | Storyboard posture | Pros | Risks | Recommendation |
| --- | --- | --- | --- | --- |
| A. HRBP policy review + SPD service operations | HRBP reviews eligibility/context/exceptions; SPD handles benefit service review, referral/ePatient, special privilege, and final service action; HR Admin maintains records/payment preview | Clearest split from HR Admin; aligns STA-27 summary and current Benefit demo anchors; practical for HR approval | Requires presenters to say backend routing is later | Recommended default |
| B. SPD-only Benefit review | SPD owns all benefit claim/referral approvals; HRBP sees reports/escalations only | Matches current SPD inbox actions most closely | Understates STA-27 HRBP role and hides policy/employee-context review need | Use only for simple demo if HR rejects HRBP stage |
| C. Manager -> HRBP -> SPD for every claim | Every claim/referral passes Manager, then HRBP, then SPD | Easy story to explain as one chain | Too heavy for low-risk claims; may imply backend workflow certainty before policy approval | Not recommended as universal rule |
| D. HR Admin owns final benefit approval | HRBP/SPD advise; HR Admin approves all benefit items | Emphasizes HR Admin control | Blurs STA-27 distinction and may make SPD service ownership look passive | Use only for admin-record/payment handoff, not service review |

Recommended approval wording:

> Approve Option A for the HR demo: HRBP is policy/context oversight, SPD is Benefit service operations and referral/special handling, HR Admin owns records/payment/reporting. Request-specific chains remain policy/storyboard choices until backend workflow design.

## 3. HRBP vs SPD Persona Boundary Matrix

| Boundary | HRBP | SPD | HR Admin |
| --- | --- | --- | --- |
| Primary demo purpose | Policy oversight, business/employee context, exception recommendation, escalation decision | Benefit service operations, claim/referral review, special privilege handling, branch/service oversight, letter issue | Plan setup, rules, records, lifecycle, reporting, import/export/payment preview |
| Typical Thai-facing wording | HRBP ตรวจนโยบายและบริบทพนักงาน | SPD ตรวจบริการสวัสดิการและออกใบส่งตัว | HR Admin ดูแลข้อมูลและรายงาน |
| Eligibility and policy | Reviews whether policy/eligibility context supports the request | Checks service evidence against Benefit operating rule | Maintains plan/rule setup and entitlement records |
| Reimbursement claim | Reviews exception-sensitive or manager-escalated cases | Approve, reject, send back, review documents/claim details | Payment-preview/report handoff after approval |
| Referral/ePatient | Reviews eligibility or sensitive edge cases where policy requires | Start review, approve, send back, reject, issue referral letter | Maintains hospital/network/admin setup preview |
| Exceptions | Reviews policy rationale and employee/business impact | Handles service/special privilege operational path | Records exception entry, reporting, and admin trace preview |
| Reporting/audit context | Monitors policy patterns, exceptions, business-unit risk | Monitors service throughput, referral status, special branch/service cases | Owns admin reports, exports, payment previews |
| Not owned in STA-39 | Backend workflow rules, RBAC, audit log, SLA, entitlement engine | Backend integration with hospital/ePatient/insurer/payment | Production persistence, payment, payroll posting, document storage |

## 4. Benefit Demo Journey Impact

| Persona | Demo impact to approve | Recommended story |
| --- | --- | --- |
| Employee | Employee submits claims/referrals and sees status/history without needing to understand internal routing details | Employee sees clear status labels such as pending Manager, HRBP/SPD, SPD review, approved, send back, rejected, or letter issued |
| Manager | Manager may approve only when HR policy needs line-manager validation; otherwise manager benefit views remain read-only team context | Manager approval is not universal; it is request-type dependent |
| HRBP | HRBP appears as policy/context approver or reviewer for eligibility, exceptions, and escalation-sensitive cases | HRBP should not look like a data-entry admin or payment operator |
| SPD | SPD appears as Benefit operations reviewer for reimbursement and referral/ePatient, including letter issue and special handling | SPD should not be reduced to a generic HR Admin role |
| HR Admin | HR Admin owns setup, records, import/export preview, reports, payment dashboard preview, and admin maintenance | HR Admin does not replace HRBP/SPD policy/service distinction |

Presenter note: current demo surfaces can still use combined labels such as `รอ HRBP/SPD อนุมัติ` while HR approves the intended split. The presenter must state this is a storyboard boundary, not implemented workflow routing.

## 5. STA-39 Coverage vs STA-27 Backlog

| Area | STA-39 covers | Remains in STA-27 backlog |
| --- | --- | --- |
| Purpose | Focused approval seed for Benefit demo HRBP/SPD boundaries | Broader HRBP/SPD persona implementation backlog |
| Persona split | HRBP policy/context vs SPD service/special handling wording for HR approval | Role permissions, screens, queues, workflow behavior, audit/reporting depth |
| Approval chains | Request-type policy/storyboard options for benefit requests, claims, exceptions, referrals | Backend workflow engine, assignment rules, SLA, notifications, immutable audit |
| Demo assumptions | Mock/demo-only chain narration and backend-later boundaries | Production integration and implementation acceptance criteria |
| Existing backlog | References STA-27 and avoids replacing it | STA-27 continues to own HRBP & SPD persona policy, exception oversight, reporting, audit, special privilege |

STA-39 stop condition: HR has enough options to approve how HRBP and SPD are shown in the Benefit demo before backend work. It is not a build ticket.

## 6. Approval Chain Options By Request Type

These are policy/storyboard choices only. They must not be treated as implemented workflow configuration.

| Request type | Option 1 | Option 2 | Option 3 | Recommended demo default |
| --- | --- | --- | --- | --- |
| Standard reimbursement claim | Manager only if line validation is required | Manager -> HRBP -> SPD | SPD-only for low-risk/self-contained claims | SPD-only or Manager -> SPD depending on HR policy; do not force HRBP for every claim |
| Medical or dependent claim | Manager -> HRBP -> SPD | HRBP -> SPD | SPD-only special handling | HRBP -> SPD when eligibility/dependent/policy sensitivity matters |
| Referral / ePatient / hospital letter | HRBP -> SPD -> HR Admin | SPD-only special handling | Manager -> HRBP -> SPD | HRBP -> SPD, with HR Admin only for admin setup/report/payment preview handoff |
| Exception / borrow-forward / override | Manager -> HRBP -> SPD -> HR Admin | HRBP -> SPD -> HR Admin | SPD-only special handling | HRBP -> SPD -> HR Admin because policy rationale and admin record are both needed |
| Benefit Special Privilege | SPD-only special handling | HRBP -> SPD | HRBP -> SPD -> HR Admin | SPD owns service handling; HRBP joins when policy/employee context is material |
| Admin-only records | HR Admin only | HRBP advisory -> HR Admin | SPD advisory -> HR Admin | HR Admin only unless HR confirms HRBP/SPD review is required |
| Payment/reimbursement handoff | HR Admin/Payroll preview only | SPD approval -> HR Admin payment preview | Manager/HRBP/SPD -> HR Admin | Approved claim appears in HR Admin/payment preview; no real payment execution |

Approval questions for HR:

- Which benefit request types require Manager approval?
- Which request types require HRBP review before SPD?
- Which request types are SPD-only special handling?
- Which request types require HR Admin final record/payment-preview ownership?

## 7. Current Demo Anchors And Interpretation

| Anchor | What it shows today | STA-39 interpretation |
| --- | --- | --- |
| `src/frontend/src/data/benefits/plan-registry.ts` | `ApproverStage` includes `manager`, `hrbp`, `spd`, `hr_admin`; common benefit chain is `hrbp -> spd -> hr_admin` | Good storyboard anchor, not production routing |
| `src/frontend/src/app/[locale]/benefits-hub/referral/page.tsx` | Referral route labels pending as `HRBP/SPD`, shows chain `hrbp -> spd -> hr_admin`, and uses mock audit entries | Good approval story for split review, but current state is mock |
| `src/frontend/src/app/[locale]/admin/benefits/page.tsx` | Admin page mentions Benefit Special Privilege, EBO reporting, SPD workflows, disabled exports, disabled ePatient/bank actions | Confirms HR Admin/service boundary and backend-later guardrails |
| `src/frontend/src/app/[locale]/spd/inbox/page.tsx` | SPD inbox includes Benefit Reimbursement and Hospital Referral lanes | Confirms SPD operational review surface |
| `src/frontend/src/components/workflow/BenefitClaimsInbox.tsx` | SPD can approve, reject, send back reimbursement claims in client state | Demo action surface only, not production authority |
| `src/frontend/src/components/workflow/BenefitReferralInbox.tsx` | SPD can start review, approve, reject, send back, and issue referral letter | Demo action surface only, not hospital/ePatient integration |
| `src/frontend/src/stores/benefit-claims.ts` | Claim statuses include `pending_manager_approval` and `pending_spd`; summary currently shows SPD Benefits as the chain | Manager stage exists in mock status, but chain policy still needs HR approval |
| `src/frontend/src/stores/benefit-referrals.ts` | Referral statuses are draft, pending SPD, SPD reviewing, send back, approved, rejected, letter issued, cancelled | Current store is SPD-centered; HRBP stage remains storyboard/backlog unless implemented later |
| `src/frontend/src/app/[locale]/admin/benefits/payment/page.tsx` | Payment dashboard includes pending SPD approval and disabled/mock payment boundaries | Supports no real payment/payroll posting from this seed |

## 8. Mock/Demo-Only And Backend-Later Boundaries

STA-39 does not authorize any of the following:

- Backend APIs, database schema, persistence, migrations, production seed loaders, or integration contracts.
- Workflow engine, queue assignment, SLA timers, notifications, escalation automation, or immutable audit logs.
- Server RBAC, row-level security, role claims, approval authority enforcement, sensitive reveal rules, or re-auth/PIN.
- Entitlement calculation engine, eligibility engine, policy engine, payroll deduction logic, or tax treatment logic.
- Payment execution, bank file generation, payroll posting, insurer sync, hospital/ePatient sync, provider integration, or real finance export.
- Production document storage, receipt/medical certificate storage, referral letter PDF generation, document retention, signatures, or download controls.
- Production report builder, export retention, audit evidence, or legal compliance reporting.

Mock/demo assumptions:

- All current benefit claims, referrals, statuses, audits, approval chains, amounts, hospitals, employee names, attachments, and letters are illustrative.
- Client-side buttons and Zustand state changes are design evidence only.
- Existing mixed wording such as HRBP/SPD is acceptable for storyboard approval only if HR signs the intended split.
- Sensitive benefit claim details follow STA-38 masking/presenter policy in shared demos.

## 9. Owner And Sign-Off Gates Before Backend Work

| Gate | Required owner/sign-off | Decision required |
| --- | --- | --- |
| HRBP/SPD persona split | HR leadership + HRBP owner + SPD owner | Approve Option A or choose a different persona split |
| Claim approval chain | HR Benefit + HRBP + SPD + Manager representative | Decide when Manager, HRBP, SPD, and HR Admin appear |
| Referral/ePatient chain | SPD + HR Benefit + HRBP + IT/integration owner | Decide HRBP vs SPD-only referral handling and confirm ePatient remains backend-later |
| Exception/special privilege handling | HR Benefit + HRBP + SPD + HR Admin | Decide special handling owner and HR Admin record boundary |
| Payment handoff wording | HR Admin + Payroll/Finance + SPD | Confirm approved claim/payment preview does not imply real payment or payroll posting |
| Sensitive benefit detail | HR Benefit + SPD + Legal/Security | Confirm STA-38 masking/minimization for shared demo |
| Backend unblock | Product + Engineering + above owners | Confirm signed approval exists and implementation issues are separate from STA-39 |

Sign-off checklist:

| Gate | Decision |
| --- | --- |
| Default persona split: HRBP policy/context, SPD service operations, HR Admin records/payment/reporting | [ ] Approved / [ ] Revise |
| Request-type approval chain options in Section 6 | [ ] Approved / [ ] Revise |
| Referral/ePatient is storyboard-only until backend integration seed | [ ] Approved / [ ] Revise |
| Special privilege/exception owner wording | [ ] Approved / [ ] Revise |
| Payment/export/payroll handoff remains mock/preview-only | [ ] Approved / [ ] Revise |
| STA-27 remains the implementation/persona backlog | [ ] Approved / [ ] Revise |

## 10. Candidate Follow-Up Issues

Do not create Linear issues from STA-39 automatically. Raise only if owners request them after review.

| Candidate follow-up | Trigger | Suggested scope |
| --- | --- | --- |
| Benefit approval-chain taxonomy seed | HR wants one signed table of request types and approver chains | Lock Manager/HRBP/SPD/HR Admin chain per benefit request type before backend workflow design |
| Benefit medical-detail minimization seed | HR Benefit, SPD, or Legal wants finer visibility rules | Define which medical-like fields are visible to Employee, Manager, HRBP, SPD, and HR Admin |
| Referral/ePatient backend integration seed | SPD approves demo and wants implementation discovery | Define API, queue, letter, validity, retry, audit, and hospital sync requirements |
| Special privilege policy seed | SPD/HRBP need separate special branch or privilege decisions | Define special handling owner, approval evidence, reporting, and exception thresholds |
| Benefit-payment handoff seed | HR Admin/Payroll need implementation detail | Define approved-claim handoff to payment preview, payroll posting boundary, and finance export rules |

## 11. Presenter Storyboard

Recommended demo narration:

1. Employee submits a benefit claim or referral from Benefits Hub.
2. Manager appears only for request types where HR wants line-manager validation.
3. HRBP reviews policy, eligibility, employee/business context, or exception rationale when the request is sensitive or escalated.
4. SPD performs Benefit service review, handles referral/ePatient, approves/sends back/rejects, and issues referral letters in demo state.
5. HR Admin owns setup, records, reporting, payment preview, import/export preview, and backend-later handoff.
6. Presenter closes by saying the chain is HR-approved storyboard policy only; backend workflow, RBAC, audit, integrations, and payment remain later.

## 12. Acceptance Coverage

| Acceptance criterion | Coverage in this artifact | Status |
| --- | --- | --- |
| Produces a concise seed or approval note with clear HR decision options | Sections 1 and 2 provide recommended default and alternatives | Covered |
| Lists owner/sign-off required before backend work | Section 9 lists owners and sign-off gates | Covered |
| Calls out mock/demo-only assumptions and backend-later boundaries | Sections 1, 5, 8, and 11 state approval-only and backend-later scope | Covered |
| Includes HRBP vs SPD persona boundary matrix | Section 3 provides the matrix | Covered |
| Includes Benefit demo journey impact for Employee, Manager, HRBP, SPD, HR Admin | Section 4 provides the journey impact table | Covered |
| Clarifies STA-39 vs STA-27 | Section 5 states STA-39 is a focused approval seed and STA-27 remains backlog | Covered |
| Includes approval chain options for requests, claims, exceptions, referrals | Section 6 provides request-type chain options | Covered |
| Keeps approval chains as policy/storyboard, not implementation | Sections 1, 6, 7, 8, and 11 repeat this boundary | Covered |
| Includes candidate follow-up issues only if needed and does not create Linear issues | Section 10 lists candidates only | Covered |
| Includes Knowledge Sources Consulted | Section 13 lists exact sources consulted | Covered |

## 13. Knowledge Sources Consulted

- `AGENTS.md`
- `docs/design-system-humi.md`
- `docs/humi-components.md`
- `/Users/tachongrak/Projects/hr.omx-worktrees/launch-sta-32-benefit-demo-scope/specs/sta-32-benefit-demo-scope.md`
- `/Users/tachongrak/Projects/hr.omx-worktrees/launch-sta-33-all-modules-approval-pack/specs/sta-33-all-modules-approval-pack.md`
- `/Users/tachongrak/Projects/hr.omx-worktrees/build-sta-38-cross-module-masking-policy/specs/sta-38-cross-module-masking-presenter-policy.md`
- `src/frontend/src/app/[locale]/benefits-hub/page.tsx`
- `src/frontend/src/app/[locale]/benefits-hub/reimbursement/page.tsx`
- `src/frontend/src/app/[locale]/benefits-hub/referral/page.tsx`
- `src/frontend/src/app/[locale]/benefits-hub/hospital-claim/page.tsx`
- `src/frontend/src/app/[locale]/benefits-hub/beneficiary/page.tsx`
- `src/frontend/src/app/[locale]/benefits-hub/life-accident/page.tsx`
- `src/frontend/src/app/[locale]/benefits-hub/history/page.tsx`
- `src/frontend/src/app/[locale]/admin/benefits/page.tsx`
- `src/frontend/src/app/[locale]/admin/benefits/exception/page.tsx`
- `src/frontend/src/app/[locale]/admin/benefits/payment/page.tsx`
- `src/frontend/src/app/[locale]/admin/benefits/reports/page.tsx`
- `src/frontend/src/app/[locale]/admin/benefits/rules/page.tsx`
- `src/frontend/src/app/[locale]/admin/benefits/rules/_components/EntitlementRulesManager.tsx`
- `src/frontend/src/app/[locale]/spd/inbox/page.tsx`
- `src/frontend/src/components/workflow/BenefitClaimsInbox.tsx`
- `src/frontend/src/components/workflow/BenefitReferralInbox.tsx`
- `src/frontend/src/data/benefits/plan-registry.ts`
- `src/frontend/src/stores/benefit-claims.ts`
- `src/frontend/src/stores/benefit-referrals.ts`
- `specs/hr-navigation-cleanup.md` for `spd-management` route context
- `omx_wiki/index.md`: none found in this worktree; no wiki canary applicable
- `.omx/context/*.md`: none found by preflight
- `.omx/plans/*.md`: none found by preflight
