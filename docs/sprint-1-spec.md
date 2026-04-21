# Sprint 1 Spec — EC Core: Employee Profile + Hire

> **Sprint**: 1 (2 weeks)
> **Focus**: flow-06 (Personal Information) + flow-09 BRD#109 (Hiring Flow)
> **TTT Process**: 01 (Hire & Rehire) + 03 (Maintain Master Data)
> **Author**: MK XLII — Product Owner
> **Date**: 2026-04-10
> **Status**: Draft

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | NestJS 11 + Prisma 6 + PostgreSQL 17 |
| Auth | Keycloak 26 (RBAC) |
| Frontend | Next.js 16 + Tailwind v4 + shadcn/ui |
| Validation | class-validator (backend) + zod (frontend) |
| Testing | Jest (unit) + Playwright (E2E) |

---

## 1. User Stories

### US-1: View Employee Profile (Person Archetype)

**As** HR Admin / Employee / Manager
**I want** to view an employee's full profile on a single page
**So that** I can see all personal, job, and contact information at a glance

**Acceptance Criteria:**
- [ ] Profile page renders as Person archetype (NOT config card grid — Rule 79)
- [ ] Tabs/sections: Personal Info, Biographical, Contact, Address, Emergency Contact, Dependents, Work Permit, Job Info, Payment Info
- [ ] Employee photo displayed with fallback avatar
- [ ] Header shows: Employee ID (auto-generated), Full Name (EN+TH), Position, Department, Status badge
- [ ] RBAC: Employee sees own profile, Manager sees direct reports, HR Admin sees all
- [ ] Fields marked 🔒 (Personal Info, National ID, Payment Info, Disability) hidden from non-HR roles
- [ ] Page loads < 2s with all sections

**BRD Refs**: #12-20, #21, #23, #27, #165, #168

---

### US-2: Edit Personal Information (BRD #12-16)

**As** HR Admin (or Employee via Self-Service with approval)
**I want** to edit an employee's personal and biographical information
**So that** master data stays accurate

**Acceptance Criteria:**
- [ ] Editable fields — Biographical (BRD #12): Gender, Date of Birth, Nationality, Race, Religion, Blood Type, Marital Status, Military Status, Foreigner Flag
- [ ] Editable fields — Personal Info 🔒 (BRD #13): Name EN, Name TH, Nickname
- [ ] Editable fields — National ID 🔒 (BRD #14): National ID, Card Type (1=primary, 2=concurrent employment), Attachment upload
- [ ] Editable fields — Email (BRD #15): Business Email, Personal Email
- [ ] Editable fields — Phone (BRD #16): Business Phone, Personal Mobile
- [ ] Validation: National ID = 13 digits, Thai format
- [ ] Validation: Email = valid email format
- [ ] Validation: Phone = Thai format (0x-xxxx-xxxx)
- [ ] Workflow trigger on change: First Name, Last Name, Name TH, Lastname TH, Marital Status, Military Status (per TTT Process 03)
- [ ] Non-workflow fields save immediately (Direct Edit method per TTT)
- [ ] AuditLog entry created for every change with `performed_by`, `changes` JSON diff

**BRD Refs**: #12, #13, #14, #15, #16

---

### US-3: Manage Address, Emergency Contact, Dependents, Work Permit (BRD #17-20)

**As** HR Admin
**I want** to CRUD address, emergency contacts, dependents, and work permits
**So that** employee records are complete for compliance

**Acceptance Criteria:**

**Address (BRD #17):**
- [ ] Address types: Permanent, Current, Mailing
- [ ] Province → District → Sub-District → Postal Code cascade (per TTT hire step 2)
- [ ] Country defaults to "Thailand"
- [ ] Direct edit method (current data, no effective date)

**Emergency Contact (BRD #19):**
- [ ] Fields: Name, Relationship, Phone, Email, Address, is_primary flag
- [ ] At least 1 emergency contact required (validation)
- [ ] Direct edit method

**Dependents (BRD #20):**
- [ ] Fields: Name, Relationship Type, DOB, Gender, National ID, is_tax_deductible
- [ ] Historical data (edit creates new version, preserves history)
- [ ] Validation: Dependent National ID = 13 digits if provided

**Work Permit (BRD #18):**
- [ ] Fields: Permit Type, Permit Number, Issue Date, Expiry Date, Issuing Country, Status, Attachment
- [ ] Alert when expiry_date < 90 days from today
- [ ] Direct edit method

**BRD Refs**: #17, #18, #19, #20

---

### US-4: View Job Information (BRD #21, #23)

**As** HR Admin / Manager / Employee
**I want** to see job and employment information
**So that** I understand org assignment and employment terms

**Acceptance Criteria:**
- [ ] Display fields — Employment (BRD #21): Hire Date, Original Start Date, Seniority Start Date, Status, Probation End Date, Contract Type, Contract End Date, Employee Group, Employee Subgroup
- [ ] Display fields — Job Info (BRD #23): Position (linked to org-service), Job Title, Department, Division, Location/SSO, Grade, Level, Corporate Title, FTE, Standard Weekly Hours, OT Flag, Holiday Type
- [ ] Job Info edit = "Change Job & Comp" action (historical, effective-dated) — NOT direct edit
- [ ] Event + Event Reason required for every job change
- [ ] Show job history timeline (previous positions/changes)
- [ ] Position selection auto-fills: Org Unit, Job Classification, Time Info (per TTT rule 7)
- [ ] Read-only for Employee role (view only)

**BRD Refs**: #21, #23

---

### US-5: View/Edit Payment Info (BRD #27) 🔒

**As** HR Admin (ONLY — 🔒 sensitive)
**I want** to manage employee payment information
**So that** payroll processes correctly

**Acceptance Criteria:**
- [ ] Fields: Payment Method (Bank Transfer / Cash / Cheque), Bank Name, Bank Branch, Account Number, Account Holder Name
- [ ] 🔒 Requires re-authentication (Keycloak step-up auth) before viewing
- [ ] 🔒 Visible to HR Admin role ONLY — hidden from Employee/Manager views
- [ ] Historical data with effective date (per TTT Process 03 — "Direct edit with effective date")
- [ ] Validation: Thai bank account = 10-12 digits
- [ ] AuditLog with full before/after diff
- [ ] Mask account number in UI (show last 4 digits only, full on expand with re-auth)

**BRD Refs**: #27, #118

---

### US-6: Hire New Employee (BRD #109)

**As** HR Admin
**I want** to hire a new employee through a guided multi-step form
**So that** all required data is captured correctly at onboarding

**Acceptance Criteria:**

**Step 1 — Identity:**
- [ ] Fields: Hire Date, Company (from org-service), Event = "Hire", Event Reason (New Hire / Replacement / Temporary Assignment)
- [ ] Name EN (First, Last), Date of Birth, National ID + attachment upload
- [ ] Validation: Hire Date required, DOB required, National ID 13-digit

**Step 2 — Personal Info:**
- [ ] Name TH, Gender, Marital Status, Nationality, Race, Foreigner Flag, Military Status
- [ ] Contact: Email (business + personal), Phone (business + personal)
- [ ] Address: Province→District→Sub-District→Postal cascade
- [ ] Emergency Contact: at least 1 required
- [ ] Dependents: optional, add multiple

**Step 3 — Job Information:**
- [ ] Position selector (from org-service) → auto-fills Org Unit, Job, Time info
- [ ] Manual fields: Employee Group (A/W/C/D/E/F/G/H), Employee Subgroup, Contract Type, Contract End Date (required for non-Permanent), Corporate Title
- [ ] Probation End Date = auto-calculate (Hire Date + 119 days) per TTT rule 3
- [ ] Retirement Date = auto-calculate (DOB + 60 years, CPN: 1 Jan Year+1, others: 1 Mar Year+1) per TTT rule 4

**Step 4 — Job Relationships:**
- [ ] Direct Manager (manager_id)
- [ ] Matrix Manager (optional)
- [ ] Custom Manager / LMS Manager (optional)
- [ ] Work Permit info (if Foreigner Flag = true)

**Step 5 — Compensation:**
- [ ] Pay Group assignment
- [ ] Pay Component: component type, amount, currency (THB default), frequency
- [ ] Payment Method: Bank Transfer / Cash / Cheque + bank details
- [ ] Validation: at least 1 pay component required

**Cross-cutting:**
- [ ] Employee ID = auto-generated (per TTT rule 2) — running number from sequence
- [ ] Duplicate Check on DOB + National ID match (per TTT rehire rule 5)
- [ ] If duplicate found → prompt "Rehire?" with original data pre-filled
- [ ] Rehire: Original Start Date preserved, Seniority Start Date = rehire date, Event Reason = Rehiring LT/GE 1 year
- [ ] All 5 steps must complete before save (transactional)
- [ ] Creates records: Employee + Employment + Address + EmergencyContact + (optional) Dependent + (optional) WorkPermit + PaymentInfo + PayComponent + AuditLog
- [ ] Event record: type="Hire", reason=selected, effective_date=hire_date

**BRD Refs**: #109, TTT Process 01

---

### US-7: Employee Group & Subgroup Management (BRD #30, #31)

**As** HR Admin
**I want** the system to enforce Employee Group/Subgroup rules
**So that** employment classification is correct

**Acceptance Criteria:**
- [ ] Employee Groups: A (Permanent), W (Expat Outbound), C (Expat Inbound), D (Retirement), E (Temporary), F (DVT), G (Internship), H (Contingent Worker)
- [ ] Subgroup cascades from Group selection (e.g., Temporary → P1/P2/P3)
- [ ] Contract End Date required when Group != A (Permanent)
- [ ] Contract Type auto-set based on Group (Regular for A, Contract-Monthly/Yearly/Long-term for others)
- [ ] Validation: prevent invalid Group+Subgroup combinations

**BRD Refs**: #30, #31

---

## 2. Data Model — Missing Fields

### Current Schema vs. Required (gap analysis)

#### Employee model — fields to ADD:

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| `title_en` | String? | TTT | Mr/Mrs/Ms |
| `title_th` | String? | TTT | นาย/นาง/นางสาว |
| `middle_name_en` | String? | BRD #13 | |
| `middle_name_th` | String? | BRD #13 | |
| `race` | String? | BRD #12 | |
| `foreigner_flag` | Boolean | BRD #12 / TTT | default false |
| `military_status` | String? | BRD #12 / TTT | Exempt/Served/Pending |
| `disability_flag` | Boolean | BRD #34 | 🔒 HR-only |
| `disability_description` | String? | BRD #34 | 🔒 |
| `social_security_id` | String? | TTT | SSO number |

#### Employment model — fields to ADD:

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| `company_id` | String | TTT Step 1 | FK to org-service Company |
| `original_start_date` | DateTime? | TTT rehire | Preserved on rehire |
| `seniority_start_date` | DateTime? | TTT rehire | Reset on rehire |
| `retirement_date` | DateTime? | TTT rule 4 | Auto-calc from DOB |
| `contract_type` | String? | TTT Step 3 | Regular/Contract-Monthly/Yearly/Long-term |
| `contract_end_date` | DateTime? | TTT Step 3 | Required for non-Permanent |
| `employee_group` | String? | TTT Step 3 | A/W/C/D/E/F/G/H |
| `employee_subgroup` | String? | TTT Step 3 | 07-27, P1-P3, etc. |
| `corporate_title` | String? | TTT Step 3 | |
| `fte` | Decimal? | BRD #23 | default 1.0 |
| `standard_weekly_hours` | Decimal? | BRD #23 / TTT | |
| `ot_flag` | Boolean | TTT | OT eligible |
| `holiday_type` | String? | TTT | |
| `sso_location` | String? | BRD #97 | SSO branch |
| `pay_group` | String? | TTT Step 5 | |

#### NEW model: JobHistory (effective-dated job changes)

| Field | Type | Notes |
|-------|------|-------|
| `id` | String @id | UUID |
| `employment_id` | String | FK |
| `effective_date` | DateTime | When change takes effect |
| `event_type` | String | Hire/Rehire/Transfer/Promotion/DataChange/etc. |
| `event_reason` | String | Event Reason code (e.g., PRM_PRM) |
| `position_id` | String? | |
| `job_title` | String? | |
| `department` | String? | |
| `division` | String? | |
| `location` | String? | |
| `grade` | String? | |
| `level` | String? | |
| `employee_group` | String? | |
| `employee_subgroup` | String? | |
| `corporate_title` | String? | |
| `performed_by` | String | User ID who made change |
| `notes` | String? | |
| `created_at` | DateTime | |

#### NEW model: JobRelationship

| Field | Type | Notes |
|-------|------|-------|
| `id` | String @id | UUID |
| `employment_id` | String | FK |
| `relationship_type` | String | direct_manager / matrix_manager / custom_manager / lms_manager |
| `related_employee_id` | String | FK to Employee |
| `effective_date` | DateTime | |
| `end_date` | DateTime? | |
| `created_at` | DateTime | |

#### NEW model: PaymentInfo (🔒 sensitive)

| Field | Type | Notes |
|-------|------|-------|
| `id` | String @id | UUID |
| `employee_id` | String | FK |
| `effective_date` | DateTime | Historical with effective date |
| `payment_method` | String | bank_transfer / cash / cheque |
| `bank_name` | String? | |
| `bank_branch` | String? | |
| `account_number` | String? | Encrypted at rest |
| `account_holder_name` | String? | |
| `is_current` | Boolean | default true |
| `created_at` | DateTime | |

#### NEW model: PayComponentRecurring

| Field | Type | Notes |
|-------|------|-------|
| `id` | String @id | UUID |
| `employee_id` | String | FK |
| `effective_date` | DateTime | |
| `component_type` | String | Base Salary / Allowance / etc. |
| `amount` | Decimal | |
| `currency` | String | default "THB" |
| `frequency` | String | Monthly / Daily / etc. |
| `is_current` | Boolean | default true |
| `created_at` | DateTime | |

#### NEW model: EventLog (lifecycle events)

| Field | Type | Notes |
|-------|------|-------|
| `id` | String @id | UUID |
| `employee_id` | String | FK |
| `event_type` | String | Hire/Rehire/Terminate/Transfer/Promotion/etc. |
| `event_reason` | String | Reason code per TTT master |
| `effective_date` | DateTime | |
| `payload` | Json? | Event-specific data |
| `performed_by` | String | |
| `created_at` | DateTime | |

#### Address model — fields to ADD:

| Field | Type | Notes |
|-------|------|-------|
| `house_number` | String? | Separate from address_line_1 for Thai address format |
| `moo` | String? | หมู่ |
| `soi` | String? | ซอย |
| `road` | String? | ถนน |

#### Dependent model — fields to ADD:

| Field | Type | Notes |
|-------|------|-------|
| `name_th` | String? | Thai name |
| `effective_date` | DateTime? | Historical data per TTT |
| `end_date` | DateTime? | |

#### WorkPermit model — fields to ADD:

| Field | Type | Notes |
|-------|------|-------|
| `attachment_url` | String? | Scanned document |
| `notes` | String? | |

---

## 3. API Endpoints

### Base path: `/api/v1/employee-center`

#### Employee (Profile)

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/employees` | List employees (paginated, filtered) | HR, Manager |
| GET | `/employees/:id` | Get full employee profile | HR, Manager (own reports), Employee (own) |
| POST | `/employees` | **Hire new employee** (multi-step) | HR Admin only |
| PATCH | `/employees/:id/personal` | Update personal/biographical info | HR Admin |
| PATCH | `/employees/:id/contact` | Update email/phone | HR Admin, Employee (triggers workflow) |

#### Address

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/employees/:id/addresses` | List addresses | HR, Employee (own) |
| POST | `/employees/:id/addresses` | Add address | HR Admin |
| PATCH | `/employees/:id/addresses/:addrId` | Update address | HR Admin |
| DELETE | `/employees/:id/addresses/:addrId` | Remove address | HR Admin |

#### Emergency Contact

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/employees/:id/emergency-contacts` | List contacts | HR, Employee (own) |
| POST | `/employees/:id/emergency-contacts` | Add contact | HR Admin, Employee |
| PATCH | `/employees/:id/emergency-contacts/:ecId` | Update contact | HR Admin, Employee |
| DELETE | `/employees/:id/emergency-contacts/:ecId` | Remove contact | HR Admin |

#### Dependent

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/employees/:id/dependents` | List dependents (history-aware) | HR, Employee (own) |
| POST | `/employees/:id/dependents` | Add dependent | HR Admin |
| PATCH | `/employees/:id/dependents/:depId` | Update dependent (creates history) | HR Admin |
| DELETE | `/employees/:id/dependents/:depId` | Soft-delete dependent | HR Admin |

#### Work Permit

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/employees/:id/work-permits` | List permits | HR, Employee (own) |
| POST | `/employees/:id/work-permits` | Add permit | HR Admin |
| PATCH | `/employees/:id/work-permits/:wpId` | Update permit | HR Admin |
| DELETE | `/employees/:id/work-permits/:wpId` | Remove permit | HR Admin |

#### Job Information (read in Sprint 1, write via "Change Job" in later sprints)

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/employees/:id/employment` | Get current employment | HR, Manager, Employee (own) |
| GET | `/employees/:id/job-history` | Get job change history | HR, Manager |
| GET | `/employees/:id/job-relationships` | Get manager chain | HR, Manager, Employee (own) |

#### Payment Info 🔒

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/employees/:id/payment-info` | Get payment info (step-up auth) | HR Admin ONLY |
| POST | `/employees/:id/payment-info` | Add payment record | HR Admin ONLY |
| PATCH | `/employees/:id/payment-info/:piId` | Update (creates history) | HR Admin ONLY |

#### Hire Workflow

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/employees/hire` | Full hire flow (5 steps, transactional) | HR Admin ONLY |
| POST | `/employees/hire/duplicate-check` | Check DOB + National ID | HR Admin |
| POST | `/employees/hire/rehire/:id` | Rehire existing employee | HR Admin |

#### Lookup / Reference

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/lookups/employee-groups` | Employee Group picklist | All |
| GET | `/lookups/employee-subgroups/:groupCode` | Subgroup by Group | All |
| GET | `/lookups/event-reasons/:eventType` | Event Reasons | HR |
| GET | `/lookups/provinces` | Province cascade start | All |
| GET | `/lookups/districts/:provinceCode` | District cascade | All |
| GET | `/lookups/subdistricts/:districtCode` | Sub-district + postal | All |

---

## 4. Validation Rules (per TTT Business Rules)

| Rule | Implementation | Source |
|------|---------------|--------|
| Employee ID auto-generated | DB sequence, never user-input | TTT rule 2 |
| Probation = Hire Date + 119 days | Backend auto-calc on hire | TTT rule 3 |
| Retirement = DOB + 60y (CPN: 1 Jan Y+1, others: 1 Mar Y+1) | Backend auto-calc | TTT rule 4 |
| Rehire duplicate check | DOB + National ID match query | TTT rule 5 |
| OK to Rehire = No → block rehire | Check flag before allowing rehire | TTT rule 6 |
| Position auto-fills org/job/time | Frontend fetches position detail from org-service | TTT rule 7 |
| Contract End Date required for non-Permanent | Frontend + backend validation when group != A | TTT |
| National ID = 13 digits | Regex + checksum validation | Thai standard |
| At least 1 emergency contact | Backend validation on hire + profile | Business rule |
| Payment Info encrypted at rest | Prisma field-level encryption or PG pgcrypto | Security |
| Workflow trigger fields | First Name, Last Name, Name TH, Lastname TH, Marital Status, Military Status, Address Info | TTT Process 03 |
| AuditLog on every mutation | Prisma middleware / NestJS interceptor | Compliance |

---

## 5. Out of Scope (Sprint 1)

สิ่งที่ **ไม่อยู่** ใน Sprint 1 — จะทำใน Sprint ถัดไป:

| Item | Target Sprint | Notes |
|------|---------------|-------|
| Employee Movement (Transfer/Promotion/Demotion) | Sprint 2 | TTT Process 04, BRD #110 |
| Terminate flow | Sprint 2 | TTT Process 10, BRD #111-116 |
| Probation management (pass/extend/fail) | Sprint 2 | TTT Process 02, BRD #117 |
| Pay Rate Change | Sprint 3 | TTT Process 05, BRD #25 |
| Mass Import/Delete | Sprint 3 | BRD #99-100 |
| Change Employee Type | Sprint 3 | TTT Process 06 |
| Acting Assignment (concurrent employment) | Sprint 3 | TTT Process 08, BRD #104 |
| Suspension management | Sprint 3 | TTT Process 07 |
| Contract Renewal | Sprint 3 | TTT Process 09, BRD #115 |
| Self-Service workflows (employee-initiated changes) | Sprint 2 | BRD #166-167 (flow-04) |
| Special Information / Background Elements | Sprint 4+ | flow-07, 50 BRDs |
| Reporting | Sprint 4+ | flow-03, 44 BRDs |
| Alt Cost Distribution | Sprint 2 | BRD #26 |
| Hire Date Correction (post-payroll) | Sprint 2 | TTT 2-event flow |
| E-Documents / Attachments | Sprint 3 | BRD #105-108, #197 |
| Org Chart visualization | Sprint 4+ | BRD #4, #169, #175 |
| Admin config (field visibility, mandatory, read-only) | Sprint 4+ | BRD #178-183 |
| Security features (encryption, data permission groups) | Sprint 3 | BRD #184-186, #203-204 |

---

## 6. Dependencies

| Dependency | Service | Status | Blocker? |
|-----------|---------|--------|----------|
| Position data | organization-service | Exists | No |
| Company data | organization-service | Exists | No |
| Keycloak roles (HR Admin, Manager, Employee) | Auth | Needs setup | **Yes** — Sprint 1 blocker |
| Province/District/Sub-District reference data | employee-center seed | Needs import | **Yes** — Thai address cascade |
| Employee Group/Subgroup picklist | employee-center seed | Needs import | No — can hardcode initially |
| Event/Event Reason master | employee-center seed | Needs import | **Yes** — Hire flow needs this |
| Workflow engine integration | workflow-engine service | Exists | Partial — only for personal info change approval |

---

## 7. Definition of Done

- [ ] All 7 User Stories pass acceptance criteria
- [ ] Prisma schema migrated with new models (no data loss)
- [ ] API endpoints return correct data with proper RBAC
- [ ] Frontend: Employee Profile page (Person archetype) renders correctly
- [ ] Frontend: Hire wizard (5-step form) completes successfully
- [ ] Payment Info requires step-up auth
- [ ] Unit tests: >80% coverage on service layer
- [ ] E2E tests: Hire flow + Profile view/edit
- [ ] AuditLog captures all mutations
- [ ] Seed data: Thai provinces, Employee Groups, Event Reasons
- [ ] No invented features — every field traces to BRD or TTT source

---

## Appendix A: Event Reason Codes (Sprint 1 scope)

| Event | Code | Label |
|-------|------|-------|
| Hire | HIRE_NEWHIRE | New Hire |
| Hire | HIRE_REPLACE | Replacement |
| Hire | HIRE_TEMPASSIGN | Temporary Assignment (Acting) |
| Hire | HIRE_INCORRECT | HIRE Incorrect Entry |
| Hire | HIRE_CORRECTED | HIRE Corrected Entry |
| Rehire | REHIRE_LT1Y | Rehiring LT 1 year |
| Rehire | REHIRE_GE1Y | Rehiring GE 1 year |

## Appendix B: Employee Group Reference

| Code | Type | Category | Contract End Date? |
|------|------|----------|-------------------|
| A | Permanent (Regular) | Regular | No |
| W | Expat Outbound | Regular | No |
| C | Expat Inbound | Regular | No |
| D | Retirement | Temporary | Yes |
| E | Temporary | Temporary | Yes |
| F | DVT | Temporary | Yes |
| G | Internship | Temporary | Yes |
| H | Contingent Worker | External | Yes |
