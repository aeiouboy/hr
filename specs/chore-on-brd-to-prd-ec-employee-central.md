# Chore: Convert BRD to PRD — Employee Central (EC) Module

## Metadata
adw_id: `on`
prompt: `base on summary BRD, pls convert to PRD template with elegance details '/Users/tachongrak/Library/Containers/com.microsoft.teams2/Data/Downloads/HRM BRD - EC - v1.0 - 20260323  1.xlsx'`

## Chore Description

Convert the Business Requirements Document (BRD) for the Employee Central (EC) module — sourced from `HRM BRD - EC - v1.0 - 20260323 1.xlsx` — into a polished Product Requirements Document (PRD). The PRD must retain all BRD requirements while enriching them with user stories, acceptance criteria, priority tiers, UX considerations, data models, and integration specs following a standard PRD template. The target audience is product managers, engineers, and QA.

---

## Relevant Files

- `HRM BRD - EC - v1.0 - 20260323 1.xlsx` — Source BRD with 219 rows across 42 sheets covering all EC requirements (Thai & English)
- `specs/prd-central-retail-nextgen-hrms.md` — Existing platform PRD for reference and consistency
- `specs/feature-4g6ymsf7-employee-information-module.md` — Prior employee information module feature spec (reference only)
- `docs/epic-breakdown-fe-be.md` — Epic breakdown doc for cross-referencing epic scope

### New Files
- `specs/prd-ec-employee-central-v1.md` — **The PRD to be created** (output of this chore)

---

## Step by Step Tasks

### 1. Read Existing PRD for Template Consistency
- Open `specs/prd-central-retail-nextgen-hrms.md` to understand existing PRD style, section structure, and conventions used in this project
- Note any design principles, personas, and priority frameworks already established

### 2. Parse & Summarize the BRD Data
The BRD Excel has been analyzed. Key modules extracted:

| # | Module | Sub-modules | Feature Count |
|---|--------|-------------|---------------|
| 1 | EC Core & Foundation | Org Foundation, Employee Foundation, Picklists | 3 |
| 2 | Organization & Position Management | Org Data, Position Data, Org Visualization | 8 |
| 3 | Employee Data Management | Personal Info (23), Special Info (60+), Employment Info (24), Lifecycle (9), Compensation (3) | 119+ |
| 4 | EC Reporting | Org/Position, Personal, Employment, Compensation, Foundation, Automation | 42 |
| 5 | EC Self Service | ESS (9), MSS (4), Admin (6) | 19 |
| 6 | EC User Management | Permissions, Roles, Proxy, Audit | 6 |
| 7 | EC Data Management | API/IC, Schedule Report, Survey, System Features | 14 |

### 3. Write PRD — Document Header & Executive Summary
- Product name, version, date, document owner
- Executive summary: what EC is, why it's being built, target users
- Business context: Central Group multi-company, ~Thailand + Vietnam headcount
- Success metrics (KPIs)

### 4. Write PRD — Stakeholders & User Personas
Define personas extracted from BRD roles:
- **Employee (ESS)** — self-service, view/update own data
- **Direct Manager (MSS)** — team visibility, org chart, approvals
- **HRBP** — HR Business Partner, approval workflows, reports
- **SPD (HR Operations)** — data entry, lifecycle management, key operator
- **HRIS Admin** — system configuration, field management, user roles
- **Payroll Admin** — compensation data, payroll sync
- **Recruitment** — hiring flow integration

### 5. Write PRD — Feature Requirements by Module

#### Module 1: EC Core & Foundation
Write requirements for:
- **Organization Foundation Object** — Group → Company → BU → Division (6 layers) → Department → Store Branch → Work Location → Cost Center → Zone → SSO Location
- **Job Foundation Object** — Job Family / Sub Family / Band Code / Salary Structure / JobCode format (`BDA10.41`)
- **Position Foundation Object** — Position Info, Org Info, Job Info, Time Info, Parent Position (solid + dotted line), FTE, Vacancy
- **Payment Foundation Object** — Pay Group ↔ Corporate Title, Pay Grade, Pay Component, Bank, Frequency
- **EC Picklist** — configurable picklist values per locale

#### Module 2: Organization & Position Management
- **Org Relation & Hierarchy** — Group → Country → Business Group → BU → Company → Division (1–6) → Department; Many-to-Many Company ↔ BU; cross-country position hierarchy (TH ↔ VN)
- **Reporting Structure Chart** — Person-to-person, Direct/Dot-line/Matrix/HR Manager types; default from Position Hierarchy; show/hide Matrix; cross-country reporting
- **Position Org Chart** — Position Hierarchy with Headcount + Vacancy; export PDF/PPT
- **Organization Chart** — Org unit hierarchy; export PDF/PPT; role-based field visibility
- Each chart: configurable display fields, permission-based visibility

#### Module 3: Employee Data Management

**3A. Personal Information**
| Section | Key Fields | Notes |
|---------|-----------|-------|
| Biographical Info | Name, DOB, Gender, Nationality | Required |
| Personal Info | Marital Status, Religion, Blood Type | — |
| National ID | ID Number, Expiry, Type | Mask in display |
| Email Info | Corporate + Personal email | — |
| Phone Info | Mobile, Home, Emergency | — |
| Address | Province > District > Sub-district > Postal (waterfall cascade) | — |
| Work Permit | Permit No., Type, Expiry | — |
| Emergency Contact | Name, Relation, Phone | — |
| Dependents | Spouse, Parent, Children | Separate from Emergency Contact |
| Formal Education | Degree, Major, Institution | — |
| Disability | Type, Status (Active/Inactive) | — |

**3B. Employment Information**
| Feature | Requirement |
|---------|-------------|
| Assignment Details | Record per event: New Hire / Branch Transfer / Company Transfer / Resignation; Sequence within same Effective Date |
| Year of Service | Calculated field; Re-hire → new Emp Code, override via Seniority Start Date; rules differ per company (CRC, CPN, NON-CNEXT) |
| Year In Store Branch | Track from Branch Code change in Emp Job |
| Year In Position | Track from Position ID change; exclude Change Position / Reorganization events from reset |
| Year In Job | Track from Job Sub Family change |
| Year In Job Grade (JG) | Reset only when JG changes; Transfer without JG change = no reset |
| Year In Personal Grade (PG) | Track from Personal Grade change |
| Year In BU | Track from BU change; Org sync propagates to Emp Job |
| Age | Display as Year.Month; compute Generation |
| Custom Effective Date | Override field for Position start date computation |
| Acting Position | Primary + Acting positions; 1 employee → multiple acting roles |
| Alternative Cost Distribution | Multi-cost center split with percentage (0–100%) |
| EC Documents | Merit/Bonus letters (~50,000 PDFs/year); attach per section; view in-browser (no download); support JPG/PNG/WEBP/PDF; PC + Mobile |

**3C. Special Information (Flexible Sections)**
Unlimited custom sections; each section supports document attachment. Key sections:
- Awards / Certificates / Memberships
- Disciplinary Records (`cust_disciplinary`) and Goodness Records (`cust_goodness`)
- Company Loan (`cust_companyLoan`), Company Asset (`cust_companyAsset`)
- Court Order — กรมบังคับคดี (`cust_courtOrder`)
- Student Loan — กยศ (`cust_studentLoan`)
- Scholarship (`cust_scholarship`)
- EBO — Employee Benefit Obligation
- Work Experience (Inside + Outside company)
- Talent Reference, Rotation Plan, Development Goals
- Performance History (Overall KPI, Competency, Performance rating — uploaded from UA system)
- E-Letter + E-Letter Password
- OHS Certificate / OHS Document
- DVT Project (global info)

**3D. Employee Lifecycle Management**
| Flow | Key Requirements |
|------|-----------------|
| **Hiring Flow** | Recruit / SPD data entry; Recruitment system integration; Auto-assign HRBP; Mail notify Manager, Payroll, HRBP on hire |
| **Transfer Flow** | Cross-company transfer; retain Emp Code; auto-transfer accumulated pay components; continuous service count |
| **Terminate Flow** | Employee self-request → Manager Approve → HRBP Approve → SPD View; Mail notify at each step; show terminate reason per role (Employee/Manager/HRBP/SPD); `ok_to_rehire` checkbox (auto-default by reason); auto-terminate Contract employees at end-date with 30-day advance notify |
| **Revert Terminate** | SPD-only action; auto-set Payroll Active Date; only for Completed-status workflows |
| **Pass Probation** | Auto-pass at Day 119; 3 mail reminders at Day 30, 75, 90 to Direct Manager + HRBP |
| **Re-Hiring** | CRC & CPN: new Emp Code; override Seniority Date for continuous service; cross-group transfer via Dummy Assignment pattern |
| **Promotion/Demotion** | JG/PG changes; PT→FT change = "Change Employee Type"; continuous service preserved |
| **Hire Date Correction** | Forward/backward; re-sync all calculated fields |
| **Mass Import/Delete** | Foundation + Employment Info bulk upload; validate before import; attach photos; mass delete unused Foundation records |

**3E. Compensation**
- **Payment Information** — Bank account, payment method, frequency, Pay Group linked to Corporate Title
- **Payroll Information** — Fields used in payroll calculation
- **Salary Base Information** — Base salary record, effective date, change reason

#### Module 4: EC Reporting

**Standard Reports (Pre-built)**
| Category | Reports |
|----------|---------|
| Org & Position | Organization Master Data, Org Hierarchy, Position Master Data, Position Budget/HC/FTE |
| Personal Info | Basic Info, Contact, Address, Work Permit, Disability (Active/Inactive), Acting Employee, Active Employee, Benefit Special Privilege |
| Employment | Assignment Details, Alt. Cost Distribution, Employee Movement, Employee Profile (PDF export, selectable portlets) |
| Compensation | Payment Info, Payroll Info, Salary Changed Details (All Records) |
| Misc | Work Experience, Disciplinary, Guarantee, EMP Compensation, Hiring & Rehire, Job Relationships, Movement (SPDHR), Resignation, Performance Appraisal Grade, FTE by Position, Employment Detail |
| Foundation | Position, Organization, Function, Store Branch, Work Location, Cost Center, Brand, HR District, Section Group |
| Pending Workflow | All pending approval items |

**Reporting Features**
- Role-based data visibility (same report; fields blank if no permission)
- Report Automation / Schedule Report: run on schedule → email or CG File Gateway
- Customize Report: Admin selects fields, joins tables, per-BU config
- Story Report / Analysis Report
- Employee Profile: Print to PDF, selectable sections/portlets
- Export to Excel, PDF

#### Module 5: EC Self Service

**Employee Self Service (ESS)**
| Feature | Detail |
|---------|--------|
| View Personal Info | Full profile view with field-level permission |
| Update Personal Info | Address, phone editable by employee; Name/Address/Marital Status → triggers SPD approval workflow with document attachment |
| Emergency Contact | Add/Edit; Dependents stored separately |
| View Employment Info | Org, Position, Job, Supervisor |
| View Org Chart | Reporting line; configurable upper levels; configurable visible fields |
| View Compensation / Pay Statement | Based on role permissions |
| Quick Actions Tile | Configurable shortcuts: My Profile, Org Chart, Manage Team, Pay Statement |
| Termination Request | Employee-initiated resignation → workflow |
| Document Access | View & download personal documents |

**Manager Self Service (MSS)**
| Feature | Detail |
|---------|--------|
| View Team Information | Team member data; field-level permission |
| Team Org Chart | Direct + Matrix reporting |
| View Team Reports | Headcount, Movement |
| Position & Vacancy Overview | Team positions with HC / Vacancy |

**Admin Self Service (HRIS)**
| Feature | Detail |
|---------|--------|
| Field Configuration | Add/Edit/Disable fields per module |
| Field Visibility Control | By Role, Country, Org unit |
| Field Mandatory Rule | Conditional mandatory rules |
| Field Read-Only Control | By status or role |
| Quick Actions Management | Configure home shortcuts per role/group |
| Tile & Home Page Content | News/announcement tiles; target by Role, Org, Employee Group; include People Portal, E-Patient Transfer Document, Executive Payroll links |

#### Module 6: EC User Management
| Feature | Detail |
|---------|--------|
| Data Permission Group | Scope: Business Group, Company, Division, Department, Employee Group, PG |
| Application Role Group | Menu & Function level: View/Edit/Enable/Disable per EC module |
| User Assignment | Map Group of Users → Data Permission Group + Application Role Group |
| Proxy | Admin role only; view/edit employee data on behalf; full audit log of proxy sessions |
| Revised Foundation | Trigger "Position Changed" event stamp to Emp Profile when Foundation is revised; Effective Date = 01st of month |
| Audit Report | View who Created/Edited/Deleted any record across all modules; export log; viewable in-app |

#### Module 7: EC Data Management & System Features
| Feature | Detail |
|---------|--------|
| API / IC (Integration Center) | Export any EC/PY/TM/BE data; Admin tool |
| Survey Form | Replace O365 survey (license issue); in-system survey → save to Special Information |
| MS Teams Viva Connections | Integration support |
| Switch Language | Thai / English / Vietnamese across all modules (EC, TIME, BENEFIT required) |
| Favourite Reports | Pin reports to user homepage |
| E-Document | Migrate from SPD E-Document system; store contracts, applications, transfer, resignation docs in new HRMS |
| Data Migration | HRIS prepares data per Template → RIS uploads to Production |
| Consent Form | First-login consent; target All Emp or specific groups; track who has/hasn't consented |
| Traffic Report | Daily login tracking |
| Hidden Profile | Some employees excluded from Org Chart; visible only to HRIS/SPD/HRBP admins; excluded from O365 sync |
| Direct User | SSO for all users; special Direct User accounts for backend Job Runs (non-person-dependent workflows) |
| Data Encryption | Database encryption for Sensitive/Confidential fields; access control documented |
| Session Timeout | Configurable session timeout |
| Mobile Responsive | Full UI accessible on mobile |
| Edit / Copy Feature | All screens support Copy Record → Insert New Record with copied data |

### 6. Write PRD — Non-Functional Requirements
- **Performance**: Page load < 3s; report generation < 10s for standard reports
- **Scalability**: Support Central Group scale (~100,000+ employees TH + VN)
- **Security**: Database encryption for PII; role-based data access; audit trail for all mutations; session timeout
- **Availability**: 99.9% uptime SLA
- **Languages**: Thai, English, Vietnamese (UI + data)
- **Browser/Device**: Chrome primary; Mobile responsive (iOS + Android)
- **Compliance**: PDPA (Thailand Personal Data Protection Act); consent tracking
- **Integration**: SAP SuccessFactors EC API-compatible patterns; CG File Gateway; O365/MS Teams Viva; Recruitment system; LMS; Competency system; Payroll system

### 7. Write PRD — Integration Map
Document integration touchpoints identified in BRD:
- **Recruitment System** → EC Hiring Flow (inbound employee data)
- **Payroll System** → EC Compensation data sync (bi-directional)
- **Competency/LMS** → JobCode sync (outbound from EC)
- **O365 / MS Teams** → User profile sync (excluding Hidden Profiles); Viva Connections
- **CG File Gateway** → Scheduled report delivery
- **E-Document System (SPD)** → Document migration to EC
- **UA System** → Performance/KPI/Competency rating upload to Special Information
- **Integration Center (IC)** → Admin-level data export tool for all modules

### 8. Write PRD — Workflow & Approval Flows
Document key approval chains:
1. **Personal Info Update** (Name/Address/Marital Status): Employee → SPD Approval (with document verification)
2. **Termination Request**: Employee → Direct Manager → HRBP → SPD (view)
3. **Transfer Flow**: SPD-initiated → auto salary/benefit transfer
4. **Pass Probation**: Auto at Day 119; reminders at Day 30/75/90
5. **Contract Auto-Terminate**: System job at Day -30; manual extend or auto-terminate

### 9. Create PRD Output File
Write the full PRD to `specs/prd-ec-employee-central-v1.md` following the structure:

```
1. Document Info (version, owner, date, status)
2. Executive Summary
3. Problem Statement & Business Context
4. Goals & Success Metrics
5. Stakeholders
6. User Personas & Jobs-to-be-Done
7. Scope (In / Out of Scope)
8. Feature Requirements (by module, with user stories + acceptance criteria)
9. Data Model Overview
10. Integration Map
11. Workflow & Approval Flows
12. Non-Functional Requirements
13. UX Principles & Constraints
14. Open Questions & Risks
15. Appendix (BRD source reference, glossary)
```

### 10. Validate the PRD
- Verify all 7 BRD modules are represented
- Verify all 219 BRD rows are accounted for (grouped into features)
- Check that all roles from BRD (Employee, Manager, HRBP, SPD, HRIS) appear in persona and access matrix
- Verify integration points are complete
- Verify no BRD requirement is missing from acceptance criteria

---

## Validation Commands

```bash
# Verify PRD file was created
ls -la specs/prd-ec-employee-central-v1.md

# Check PRD covers all 7 modules
grep -c "## Module\|### Module\|#### Module" specs/prd-ec-employee-central-v1.md

# Check all major persona roles are mentioned
grep -i "HRBP\|SPD\|Manager\|Employee\|HRIS\|Payroll" specs/prd-ec-employee-central-v1.md | wc -l

# Check integration section exists
grep -i "integration\|API\|O365\|Payroll sync" specs/prd-ec-employee-central-v1.md | head -5

# Check word count (PRD should be substantial)
wc -w specs/prd-ec-employee-central-v1.md
```

---

## Notes

- The BRD is written in Thai with some English terminology; the PRD should be in English with Thai terms in parentheses where needed for clarity
- "CRC" = Central Retail Corporation, "CPN" = Central Pattana, "NON-CNEXT" = non-Central group entities — include a glossary
- Special Information sections are highly flexible (60+ objects in BRD); PRD should treat these as a configurable framework with named examples, not enumerate all 60 individually
- Some BRD rows are duplicates (e.g., Terminate Flow has 7 sub-rows for one feature) — consolidate into single requirement with sub-points
- Priority tiers (P0/P1/P2) should be assigned based on: P0 = lifecycle & core data, P1 = reporting & self-service, P2 = advanced analytics & integrations
- The BRD references 42 Excel sheets for detailed field specs; the PRD should reference these as "data dictionary" appendix items rather than reproducing all fields inline
