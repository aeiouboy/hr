# SAP SuccessFactors EC Core — User Manual Summary

> Source: CNeXt TTT (Train-The-Trainer) Documents V0.02, Oct 2018
> Prepared by: Presence of IT for Central Group (QAS environment)
> 12 PDF files covering 11 processes + 1 overview

---

## Overview — Employee Lifecycle in EC Core

```
Hire/Rehire → Probation → Master Data Maintenance → Movement/Pay/Type Change → Suspension → Acting → Contract Renewal → Termination → Reporting
```

## Process Summary

| # | Process | Event | Actor | Workflow? |
|---|---|---|---|---|
| 01 | Hire & Rehire | Hire / Rehire | HR Admin | No |
| 02 | Manage Probation | Completion of Probation / Data Change / Terminate | HR Admin | No |
| 03 | Maintain Master Data | Direct Edit / Change Job & Comp | HR / Employee / Manager | **Yes** (Personal Info) |
| 04 | Employee Movement | Transfer / Promotion / Demotion | HR | No |
| 05 | Pay Rate Change | Pay Rate Change | HR | No |
| 06 | Change Employee Type | Change Emp Type / Data Change | HR | No |
| 07 | Manage Suspension | Suspension / Return from Suspension | HR | No |
| 08 | Acting Assignment | Hire (Temp Assignment) / Terminate (End Assignment) | HR | No |
| 09 | Contract Renewal | Data Change (Extend Contract) | HR | No |
| 10 | Terminate | Resign / Retirement / Dismissal / No Show / Transfer Out | HR / Manager+HRBP | **Yes** (Dismissal only) |
| 11 | EC Report | — | HR / Manager | No |

---

## Employee Groups

| Code | Type | Notes |
|---|---|---|
| A | Permanent (Regular) | No Contract End Date |
| W | Expat Outbound (Regular) | Thai sent abroad (home→host) |
| C | Expat Inbound (Regular) | Foreigner working in Thailand (host→home) |
| D | Retirement (Temp.) | Contract employee post-retirement |
| E | Temporary (Temp) | With/without end date |
| F | DVT (Temp.) | Bilateral program students |
| G | Internship (Temp.) | Student internship |
| H | Contingent Worker | External personnel (paid) |

### Employee Sub-Groups
- Permanent/Expat/Retirement: 07–27
- Temporary pay modes: P1 (Monthly), P2 (Piecework), P3 (Daily)
- DVT: D1/D2, Internship: T1/T2, Consultant: C1
- Piecework: X7-XB, Daily: Y7-YB

### Contract Types
Regular, Contract-Monthly, Contract-Yearly, Contract-Long term

---

## Event & Event Reason Master

| Event | Event Reasons |
|---|---|
| Hire | New Hire, Replacement, Temporary Assignment (Acting), HIRE Incorrect Entry, HIRE Corrected Entry |
| Rehire | Rehiring LT 1 year, Rehiring GE 1 year |
| Completion of Probation | Completion of Probation (COMPROB_COMPROB) |
| Promotion | Promotion (PRM_PRM), Demotion (PRM_DEMO) |
| Reorganization | Reorganization |
| Transfer | Within Co. + change SSO (TRN_TRNWICWSO), Within Co. NOT change SSO (TRN_TRNWICNSO), Across Company (TRN_TRNBWC) |
| Data Change | Extend Probation (DC_EXTPROB), Extend Retirement (DC_EXTRET), Extend Contract (DC_EXCONT), Data Change (DC_DC), Change in Pay (DC_CHGINPAY), Change in Time (DC_CHGINTM), System Change (DC_SC) |
| Position Change | Position Change |
| Change Employee Type | Change Employee Type (JCHG_EMPTYPE) |
| Change to Retirement | Change to Retirement |
| Pay Rate Change | Merit Increase (PRCHG_MERIT), Adjust Position (PRCHG_ADJPOS), Salary Cuts (PRCHG_SALCUT), Salary Adjust (PRCHG_SALADJ), Promotion (PRCHG_PRM) |
| Suspension | Suspension (SUSP_SUSP) |
| Return from Suspension | Return from Suspension (RESUSP_RESUSP) |
| Termination | Resignation (TERM_RESIGN), Unsuccessful probation (TERM_UNSUCPROB), Retirement (TERM_RETRIE), Early Retirement, No Show, Layoff, Passed away, Dismissal (TERM_DISMIS), End of Contract, End of Temp Assignment (TERM_ENDASSIGN), Transfer Out |

---

## Process Details

### 01 — Hire & Rehire

**Entry**: Search "add new employee" or button

**5 Steps:**
1. **Identity**: Hire Date, Company, Event Reason, Name EN, DOB, National ID (+ attachment)
2. **Personal Info**: Name TH, Gender, Marital Status, Nationality, Race, Foreigner flag, Military Status, Contact, Address (Province→District→Sub-District→Postal cascade), Emergency Contact, Dependents
3. **Job Information**: Position (auto-fills Org/Job/Time info), Employee Group (manual), Employee Subgroup (manual), Contract Type (manual), Contract End Date (manual for non-Permanent), Probation End Date (auto = Hire+119 days), Corporate Title (manual)
4. **Job Relationship**: Matrix Manager, Custom Manager (LMS), Work Permit Info
5. **Compensation**: Pay Group, Pay Component/Amount/Currency/Frequency, Payment Method (Bank Transfer/Cash/Cheque), Bank details

**Rehire specifics:**
- System triggers Duplicate Check on DOB + National ID match
- Accept Match → reuse existing data
- Original Start Date preserved, Seniority Start Date reset to rehire date
- Event Reason: Rehiring LT/GE 1 year

**Hire Date Correction (post-payroll, future date):**
- Step 1: Edit history → Event Reason = HIRE Incorrect Entry
- Step 2: Insert New Record → correct date → Event Reason = HIRE Corrected Entry

### 02 — Manage Probation

**3 Scenarios:**

| Scenario | Event | Event Reason |
|---|---|---|
| Pass | Completion of Probation | COMPROB_COMPROB |
| Extend | Data Change | DC_EXTPROB (change Probation End Date) |
| Fail | Terminate | TERM_UNSUCPROB (Involuntary) |

- Pass: Change Job & Comp Info → verify Pass Probation Date in Employment Details
- Extend: Change Probation End Date → system warning → Proceed
- Fail: Terminate action → OK to Rehire decision → Transfer subordinates if any

### 03 — Maintain Master Data

**Edit methods by section:**

| Section | Data Type | Edit Method |
|---|---|---|
| National ID, Biographical, Contact, Address, Emergency Contact, Work Permit | Current | Direct edit |
| Personal Info, Dependents | Historical | Direct edit |
| Org Info, Job Info, Job Relationships, Compensation | Historical | Take Action: Change Job & Comp |
| Payment Info | Historical | Direct edit (with effective date) |
| Alt Cost Distribution | Historical | Take Action: Manage Alt Cost Distribution |
| All Profile sections | Current | Direct edit |

**Workflow-triggering fields:** First name, Last name, Name TH, Lastname TH, Marital Status, Military Status, Address Info

**Employee Profile (Background Elements):**
Formal Education, Work Experience Within Company, Salary History, Previous Employment, Language Skills, Certification/Licences, Honours/Awards, Goodness/Disciplinary Records, Legal Execution, Company Loan, Product Damage Insurance, Student Loan (กยศ.), Scholarship, Guarantee, EBO, Company Asset, Mobility

### 04 — Employee Movement

**5 Scenarios:**

| Process | Event | Event Reason |
|---|---|---|
| Transfer within Co. (no SSO change) | Transfer | TRN_TRNWICNSO |
| Transfer within Co. (SSO change) | Transfer | TRN_TRNWICWSO |
| Promotion | Promotion | PRM_PRM |
| Demotion | Promotion | PRM_DEMO |
| Transfer across Company | Transfer | TRN_TRNBWC |

- Select new Position → system auto-fills Org/Job/Time info
- SSO change → additional Compensation step (update Pay Group)
- Transfer across Company = Terminate at source + Hire at destination
- Payroll Period Lock: Effective Date locked to period start (01.mm or 21.mm)

### 05 — Pay Rate Change

**Individual:** Actions → Change Job & Comp → Compensation Info → Event = Pay Rate Change → use Change Calculator (amount or %)

**Mass Upload (2-file import):**
1. Import Compensation Information (`CompInfoImportTemplate.csv`)
2. Import Pay Component Recurring (`PayComponentRecurringImportTemplate.csv`)
- Purge Type = Incremental Load, Date format = dd/MM/yyyy, Encoding = UTF-8

**Event Reasons:** PRCHG_MERIT, PRCHG_ADJPOS, PRCHG_SALCUT, PRCHG_SALADJ, PRCHG_PRM

**Rule:** Future-dated record blocks backdated insert → delete future record first

### 06 — Change Employee Type

- Actions → Change Job & Comp → Job Info → Event = Change Employee Type (JCHG_EMPTYPE)
- If Pay Group changes → additional Compensation step with DC_CHGINPAY
- Change in Time (DC_CHGINTM): modify OT Flag, Holiday Type, Working Hours
- FTE reduction → Standard Weekly Hours auto-adjust proportionally

### 07 — Manage Suspension

**Unique entry path:** Employment Info tab → Job Information → History icon → Insert New Record

| Action | Event | Result |
|---|---|---|
| Suspend | Suspension (SUSP_SUSP) | Status → Suspended |
| Return | Return from Suspension (RESUSP_RESUSP) | Status → Active |

- Position unchanged during suspension
- Must Insert Return record (not just delete Suspension) for audit trail

### 08 — Acting Assignment

**Mechanism:** Concurrent Employment (multi-position per employee)

**Start Acting:**
- Actions → Add: Concurrent Employment
- Set as secondary employment = **Yes**
- Pay Group = **99 (Non-PY relevant)** — no separate payroll
- Star icon = primary position indicator

**End Acting:**
- Select acting position → Actions → Terminate
- Choose "Terminate selected assignment" (NOT "All Employments")
- Event Reason = End of Temporary Assignment (TERM_ENDASSIGN)

### 09 — Contract Renewal

- Actions → Change Job & Comp → Job Info
- Event = Data Change, Event Reason = Extend Contract (DC_EXCONT)
- Change Contract End Date to new date
- System warning if Contract End Date not changed → Proceed or Correct

### 10 — Terminate

**5 Scenarios:**

| Type | Reason Code | Voluntary? | Workflow? |
|---|---|---|---|
| Resign | TERM_RESIGN | Voluntary | No |
| Retirement | TERM_RETRIE | Involuntary | No |
| Dismissal | TERM_DISMIS | Involuntary | **Yes (Manager↔HRBP)** |
| No Show | (purge Employee ID) | Involuntary | No |
| Transfer Out | (transfer) | Involuntary | No |

**Key fields:** Resigned Date, Last Date Worked, OK to Rehire (Yes/No = blacklist), Transfer Direct Subordinates (3 options)

**Dismissal workflow:** Line Manager initiates → HRBP approves (or vice versa)

**Multi-position rule:** Must select "All Employments" to truly terminate from company

### 11 — EC Report

**Path:** Home → Reporting → Report Centre

**Features:** Search by keyword, Runtime Filters (Business Unit, Company, Cost Center, etc.), Export (Excel/PDF/Word/PPT), Schedule for large reports

**Standard Reports:** Position Overview, Birthday List, Employee Register, Employment Changes, Headcount & FTEs, New Hires, Terminated Employments, Turnover Report, Workflow logs, and more

---

## Critical Business Rules

1. **HR Admin only** can Add New Employee
2. **Employee ID auto-generated** — never manual input
3. **Probation = Hire Date + 119 days** (system-calculated)
4. **Retirement Date = DOB + 60 years** (CPN: 1 Jan Year+1, others: 1 Mar Year+1)
5. **Rehire Duplicate Check** automatic on DOB + National ID
6. **OK to Rehire = No** → permanent blacklist for that position
7. **Position auto-fill** → Org/Job/Time info pulled automatically
8. **SSO Location change → separate Compensation step** (Pay Group follows SSO)
9. **Transfer across Company = Terminate + Hire** (not just Change Job)
10. **Acting = Concurrent Employment** + Pay Group 99 (Non-PY)
11. **Suspension uses different UI path** (History → Insert, not Actions menu)
12. **Dismissal = mandatory workflow** — all other terminations are direct
13. **Multi-position → "All Employments"** to terminate from company
14. **Mass Pay Rate = 2-file import** (CompInfo + PayComponentRecurring)
15. **Hire Date Correction post-payroll** = 2 Events (Incorrect + Corrected Entry)
16. **National ID Card Type (2)** = for employees hired concurrently in 2 CG companies
17. **Events/Event Reasons are pre-delivered** — can relabel but cannot create new ones
18. **Alternative Cost Distribution** = split cost across multiple cost centers (must sum to 100%)
19. **FTE reduction → Weekly Hours auto-adjust** proportionally
20. **Future-dated record blocks backdated insert** — must delete future record first
