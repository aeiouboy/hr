# Product Requirements Document
# Employee Central (EC) Module — Central Group NextGen HRMS

---

| Field | Value |
|-------|-------|
| Version | 1.0 |
| Date | 2026-03-27 |
| Status | Draft |
| Document Owner | Product Team — RIS |
| Source BRD | HRM BRD - EC - v1.0 - 20260323 1.xlsx (219 rows, 42 sheets) |
| Platform PRD Reference | specs/prd-central-retail-nextgen-hrms.md v2.0 |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement & Business Context](#2-problem-statement--business-context)
3. [Goals & Success Metrics](#3-goals--success-metrics)
4. [Stakeholders](#4-stakeholders)
5. [User Personas & Jobs-to-be-Done](#5-user-personas--jobs-to-be-done)
6. [Scope](#6-scope)
7. [Feature Requirements](#7-feature-requirements)
8. [Data Model Overview](#8-data-model-overview)
9. [Integration Map](#9-integration-map)
10. [Workflow & Approval Flows](#10-workflow--approval-flows)
11. [Non-Functional Requirements](#11-non-functional-requirements)
12. [UX Principles & Constraints](#12-ux-principles--constraints)
13. [Open Questions & Risks](#13-open-questions--risks)
14. [Appendix](#14-appendix)

---

# 1. Executive Summary

Employee Central (EC) is the core Human Capital Management module of Central Group's NextGen HRMS platform. It serves as the single source of truth for all employee, organizational, and position data across Central Retail Corporation (CRC), Central Pattana (CPN), and affiliated entities operating in Thailand and Vietnam.

EC replaces SAP SuccessFactors Employee Central with a modern, microservices-based architecture that supports 100,000+ employees across multiple companies, business units, and countries. The module covers seven functional areas: Core Foundation, Organization & Position Management, Employee Data Management, Reporting, Self-Service (ESS/MSS), User Management, and Data Management.

**Key outcomes:**
- Unified employee master data across all Central Group entities
- Self-service capabilities reducing SPD (HR Operations) workload by 60%
- Role-based access with field-level permission controls
- Tri-lingual support (Thai, English, Vietnamese)
- Full PDPA compliance with consent tracking and data encryption

---

# 2. Problem Statement & Business Context

## 2.1 Problem Statement

Central Group currently operates SAP SuccessFactors as its Employee Central system. The existing system presents the following challenges:

1. **License cost escalation** — SuccessFactors licensing for 100,000+ employees is unsustainable
2. **Limited customization** — BRD contains 60+ "Special Information" objects that require flexible, configurable data structures beyond what SF provides out-of-box
3. **Multi-company complexity** — Cross-company transfers, shared services, and matrix reporting across CRC/CPN/NON-CNEXT require custom handling that SF does not natively support
4. **Regional expansion** — Vietnam operations require Vietnamese language support and cross-country position hierarchies that current SF setup does not handle cleanly
5. **Integration friction** — Existing integrations with Payroll, Recruitment, Competency, and LMS systems are brittle and require SF-specific middleware

## 2.2 Business Context

- **Organization**: Central Group — one of Southeast Asia's largest conglomerates
- **Scale**: ~100,000+ employees across Thailand and Vietnam
- **Corporate structure**: Multiple companies (CRC, CPN, NON-CNEXT) under one Group, with shared services and cross-company transfers
- **Regulatory environment**: Thailand PDPA (Personal Data Protection Act), Thai labor law, Social Security Office (SSO) compliance
- **Current system**: SAP SuccessFactors EC (being replaced)
- **Target**: Full replacement with in-house NextGen HRMS built on NestJS + Next.js microservices architecture

---

# 3. Goals & Success Metrics

| Goal | KPI | Target | Baseline |
|------|-----|--------|----------|
| Centralize employee master data | Single source of truth adoption | 100% of entities on EC | Fragmented across SF + spreadsheets |
| Reduce HR operations workload | SPD manual data entry tasks | -60% reduction | Current SF-based workflow |
| Improve data accuracy | Employee data completeness rate | 95%+ | ~75% estimated |
| Accelerate HR processes | Approval cycle time (hire/transfer/terminate) | < 24 hours | 3–5 business days |
| Enable employee self-service | ESS adoption rate | > 80% of employees | ~30% using SF ESS |
| Ensure compliance | PDPA consent completion | 100% of active employees | Partial tracking |
| Support multi-country | Vietnam entity go-live | Full trilingual EC | Thai/English only |
| System reliability | Platform uptime | 99.9% SLA | N/A (new system) |

---

# 4. Stakeholders

| Stakeholder | Role | Interest |
|------------|------|----------|
| RIS (Retail Information Services) | Platform owner, engineering | System delivery, architecture decisions |
| HR Transformation Office | Program sponsor | Business case, timeline, budget |
| SPD (HR Operations / สำนักบริหารทรัพยากรบุคคล) | Key operator | Day-to-day data management, lifecycle workflows |
| HRBP (HR Business Partners) | Business-side HR | Approval workflows, team reports, employee relations |
| HRIS (HR Information Systems) | System admin | Configuration, field management, user roles, audit |
| Payroll Team | Downstream consumer | Compensation data accuracy, sync reliability |
| Recruitment Team | Upstream provider | Hiring flow integration, candidate-to-employee conversion |
| IT Security | Governance | Data encryption, access control, audit compliance |
| Legal / Compliance | Regulatory | PDPA, consent forms, data retention policies |

---

# 5. User Personas & Jobs-to-be-Done

## 5.1 Employee (ESS — Employee Self Service)

**Profile**: Any Central Group employee (65,000+ users)
**Tech comfort**: Variable — from store associates using mobile to office workers on desktop
**Language**: Primarily Thai; some English; Vietnamese for VN operations

| Job-to-be-Done | Frequency | Priority |
|----------------|-----------|----------|
| View my profile and employment details | Weekly | P0 |
| Update my address, phone, emergency contact | As needed | P0 |
| Submit name/marital status change with documents | Rare | P1 |
| View my org chart and reporting line | Monthly | P1 |
| View my compensation / pay statement | Monthly | P1 |
| Submit termination (resignation) request | Rare | P0 |
| Access my personal documents (merit/bonus letters) | Quarterly | P1 |
| Complete consent form on first login | Once | P0 |

## 5.2 Direct Manager (MSS — Manager Self Service)

**Profile**: Department/store managers (4,000+ users)
**Primary concern**: Team visibility and approval efficiency

| Job-to-be-Done | Frequency | Priority |
|----------------|-----------|----------|
| View team member information | Daily | P0 |
| View team org chart (direct + matrix lines) | Weekly | P0 |
| Approve termination requests from direct reports | As needed | P0 |
| View team headcount and vacancy status | Monthly | P1 |
| View team movement reports | Monthly | P1 |

## 5.3 HRBP (HR Business Partner)

**Profile**: Business-aligned HR professionals (200+ users)
**Primary concern**: Employee lifecycle management, compliance, approvals

| Job-to-be-Done | Frequency | Priority |
|----------------|-----------|----------|
| Approve personal info change requests | Daily | P0 |
| Approve termination workflows | As needed | P0 |
| Review probation status and reminders | Weekly | P0 |
| Run headcount / movement reports by org unit | Monthly | P1 |
| Monitor employee lifecycle events | Daily | P0 |

## 5.4 SPD (HR Operations / สำนักบริหารทรัพยากรบุคคล)

**Profile**: Central HR operations team — the key data operators (100+ users)
**Primary concern**: Data entry accuracy, lifecycle processing, bulk operations

| Job-to-be-Done | Frequency | Priority |
|----------------|-----------|----------|
| Enter new hire data from Recruitment | Daily | P0 |
| Process cross-company transfers | Weekly | P0 |
| Execute termination / revert termination | As needed | P0 |
| Perform mass data import/updates | Monthly | P0 |
| Manage Foundation data (org, position, job structures) | Monthly | P0 |
| Generate and export standard reports | Daily | P1 |
| Manage employee documents | Daily | P1 |

## 5.5 HRIS Admin (HR Information Systems)

**Profile**: System administrators responsible for EC configuration (20+ users)
**Primary concern**: Field configuration, permissions, system integrity

| Job-to-be-Done | Frequency | Priority |
|----------------|-----------|----------|
| Configure field visibility/mandatory rules by role | As needed | P0 |
| Manage data permission groups and application roles | Monthly | P0 |
| Set up picklist values | As needed | P1 |
| Configure quick actions and home page tiles | Quarterly | P2 |
| Review audit logs | Weekly | P1 |
| Manage proxy access assignments | As needed | P1 |

## 5.6 Payroll Admin

**Profile**: Payroll processing team (50+ users)
**Primary concern**: Compensation data accuracy and timely sync

| Job-to-be-Done | Frequency | Priority |
|----------------|-----------|----------|
| View employee payment and salary information | Daily | P0 |
| Receive notifications on new hires affecting payroll | As events occur | P0 |
| Access payroll-relevant fields (pay group, pay grade, pay components) | Daily | P0 |
| Run compensation reports | Monthly | P1 |

---

# 6. Scope

## 6.1 In Scope

| Area | Description |
|------|-------------|
| EC Core Foundation | Organization, Job, Position, Payment foundation objects; Picklists |
| Organization Management | Org hierarchy, reporting structures, org charts (person/position/org) |
| Employee Data | Personal info, employment info, compensation, special information (60+ configurable sections) |
| Employee Lifecycle | Hiring, transfer, termination, revert terminate, probation, re-hiring, promotion/demotion |
| Reporting | 40+ standard reports, scheduled reports, custom reports, Employee Profile PDF export |
| Self-Service | ESS (view/edit own data), MSS (team data), Admin self-service (field config) |
| User Management | Data permission groups, application role groups, proxy access, audit trail |
| Data Management | API/IC export, survey forms, document management, consent forms |
| Multi-language | Thai, English, Vietnamese — all UI and data fields |
| Mobile responsive | Full functionality on mobile browsers (iOS + Android) |
| PDPA compliance | Consent tracking, data encryption, audit logging |

## 6.2 Out of Scope

| Area | Rationale |
|------|-----------|
| Payroll calculation engine | Separate Payroll module — EC provides data only |
| Time & Attendance processing | Separate Time Management module |
| Benefits administration | Separate Benefits module (EC provides payment foundation) |
| Performance evaluation | External system (UA System); EC stores uploaded results in Special Information |
| Learning / e-Learning | External LMS system; EC provides JobCode sync outbound |
| Recruitment pipeline | Separate Recruitment module; EC receives hired candidate data |
| Native mobile app | Web responsive is target; native app is future phase |
| Data migration execution | HRIS prepares templates; RIS executes migration — treated as implementation task, not product feature |

---

# 7. Feature Requirements

## Module 1: EC Core & Foundation (P0)

### 1.1 Organization Foundation Object

**Description**: Hierarchical structure representing the entire Central Group organizational topology.

**Hierarchy levels**: Group → Company → Business Unit (BU) → Division (6 layers) → Department → Store Branch → Work Location → Cost Center → Zone → SSO Location

**User Stories**:

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-F-001 | HRIS Admin | define and manage the organization hierarchy (Group → Company → BU → Division 1–6 → Department → Store Branch) | the system reflects the actual Central Group corporate structure | P0 |
| EC-F-002 | HRIS Admin | configure Work Location, Cost Center, Zone, and SSO Location as linked foundation objects | downstream modules (Payroll, Benefits, Time) reference correct organizational metadata | P0 |
| EC-F-003 | HRIS Admin | establish many-to-many relationships between Company and BU | shared-service BUs that span multiple companies are correctly modeled | P0 |
| EC-F-004 | SPD | view and navigate the org hierarchy visually | I can verify the structure before making changes | P1 |

**Acceptance Criteria**:
- Hierarchy supports minimum 10 levels depth
- Many-to-many Company ↔ BU relationship persisted and queryable
- Each org unit has: Code, Name (TH/EN/VN), Effective Date, Status (Active/Inactive), Parent
- Org unit changes are date-effective (historical records preserved)
- API supports tree traversal (ancestors, descendants, siblings)

### 1.2 Job Foundation Object

**Description**: Job classification structure used across all companies.

**Structure**: Job Family → Job Sub-Family → Band Code → Salary Structure → Job Code (format: `BDA10.41`)

**User Stories**:

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-F-005 | HRIS Admin | define Job Family, Sub-Family, Band Code, and Salary Structure | jobs are consistently classified across all entities | P0 |
| EC-F-006 | HRIS Admin | create Job Codes following the standard format (e.g., `BDA10.41`) | each position can be mapped to a standardized job classification | P0 |
| EC-F-007 | SPD | search and filter jobs by family, sub-family, or band | I can quickly find the correct job code when creating positions | P1 |

**Acceptance Criteria**:
- Job Code format validated on input (`[A-Z]{3}\d{2}\.\d{2}` or configurable pattern)
- Job Family → Sub-Family → Band hierarchy enforced
- Salary Structure linked to Band Code
- All job foundation objects support effective dating
- Outbound sync to Competency/LMS systems via JobCode

### 1.3 Position Foundation Object

**Description**: Defines each position within the organization, linking to org structure and job classification.

**User Stories**:

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-F-008 | HRIS Admin | create and manage positions with Position Info, Org Info, Job Info, and Time Info sections | each role in the organization is formally defined | P0 |
| EC-F-009 | HRIS Admin | define parent position relationships (solid line + dotted line) | reporting structures are correctly established | P0 |
| EC-F-010 | HRIS Admin | track FTE allocation and vacancy count per position | headcount planning is accurate | P0 |
| EC-F-011 | HRIS Admin | define cross-country position hierarchy (TH ↔ VN) | international reporting lines are supported | P1 |

**Acceptance Criteria**:
- Position has: Position Code, Title (TH/EN/VN), Org Unit, Job Code, Parent Position (solid), Dotted-line Parent, FTE, Headcount, Vacancy
- Solid-line and dotted-line parent positions are distinct relationships
- Cross-country hierarchy: a position in VN can report to a position in TH and vice versa
- Position changes are date-effective
- Vacancy = Headcount - Active Incumbents (auto-calculated)

### 1.4 Payment Foundation Object

**Description**: Foundation for compensation processing — links corporate title to pay groups and defines payment structures.

**User Stories**:

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-F-012 | HRIS Admin | configure Pay Group linked to Corporate Title | employees are automatically assigned to correct payroll grouping | P0 |
| EC-F-013 | HRIS Admin | define Pay Grade, Pay Component, Bank, and Payment Frequency | payroll has all foundation data needed for processing | P0 |

**Acceptance Criteria**:
- Pay Group ↔ Corporate Title mapping (one-to-one or one-to-many)
- Pay Components: define code, name, type (earning/deduction), frequency
- Bank master: bank code, bank name, branch support
- Payment Frequency: Monthly, Bi-weekly configurable per Pay Group

### 1.5 EC Picklist Management

**Description**: Configurable dropdown values used across all EC modules.

**User Stories**:

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-F-014 | HRIS Admin | create, edit, and manage picklist values with locale-specific labels (TH/EN/VN) | dropdown fields display correctly in the user's language | P1 |
| EC-F-015 | HRIS Admin | activate/deactivate individual picklist values without deleting | obsolete values no longer appear in forms but historical records remain intact | P1 |

**Acceptance Criteria**:
- Each picklist value: Code, Label (TH), Label (EN), Label (VN), Status, Sort Order
- Deactivated values hidden from new entry but displayed in historical records
- Picklist values filterable by module/field context
- Import/export picklist values via Excel template

---

## Module 2: Organization & Position Management (P0)

### 2.1 Organization Hierarchy & Relations

**User Stories**:

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-ORG-001 | SPD | view the full org hierarchy from Group → Country → Business Group → BU → Company → Division (1–6) → Department | I understand the complete organizational structure | P0 |
| EC-ORG-002 | SPD | manage many-to-many relationships between Company and BU | shared-service BUs spanning multiple companies are correctly represented | P0 |
| EC-ORG-003 | Manager | view cross-country position hierarchy (TH ↔ VN) | international reporting lines are visible | P1 |

**Acceptance Criteria**:
- Full hierarchy traversal API with configurable depth
- Company ↔ BU many-to-many junction table
- Cross-country links treated as standard parent-child with country attribute
- Changes to org structure propagate "Position Changed" event to affected employee profiles

### 2.2 Reporting Structure Chart (Person-to-Person)

**User Stories**:

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-ORG-004 | Employee | view my reporting line (who I report to, who reports to me) | I understand my place in the organization | P0 |
| EC-ORG-005 | Manager | see my team's full reporting structure including direct, dotted-line, matrix, and HR Manager relationships | I have complete visibility of team composition | P0 |
| EC-ORG-006 | HRIS Admin | configure which fields are displayed on the reporting structure chart | sensitive information is hidden based on role | P1 |
| EC-ORG-007 | Manager | toggle show/hide matrix reporting lines | the chart is not cluttered when matrix lines are not needed | P1 |

**Acceptance Criteria**:
- Chart shows: Direct line (solid), Dotted line (dashed), Matrix (distinct style), HR Manager (distinct style)
- Default structure derived from Position Hierarchy (can be overridden per person)
- Configurable display fields per role (e.g., Manager sees phone number; Employee does not)
- Cross-country reporting rendered correctly
- Show/hide matrix toggle persisted per user preference

### 2.3 Position Org Chart

**User Stories**:

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-ORG-008 | SPD | view the Position Hierarchy with Headcount and Vacancy per position | I can identify understaffed positions | P0 |
| EC-ORG-009 | Manager | export the Position Org Chart as PDF or PPT | I can use it in presentations and planning meetings | P1 |

**Acceptance Criteria**:
- Each position node displays: Position Title, Incumbent Name(s), Headcount, Vacancy, FTE
- Vacant positions highlighted visually
- Export to PDF and PPT (PowerPoint) formats
- Role-based field visibility (same chart, different detail level per role)

### 2.4 Organization Chart (Org-Unit Based)

**User Stories**:

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-ORG-010 | Employee | view the org unit hierarchy | I understand departmental structure | P1 |
| EC-ORG-011 | SPD | export org chart as PDF or PPT | I can share the structure with stakeholders | P1 |

**Acceptance Criteria**:
- Org unit nodes show: Unit Name, Head of Unit, Headcount
- Export to PDF and PPT
- Role-based field visibility applied

---

## Module 3: Employee Data Management (P0)

### 3A. Personal Information

#### 3A.1 Biographical & Personal Info

**User Stories**:

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-PI-001 | SPD | enter and manage biographical information (Name TH/EN, DOB, Gender, Nationality, Religion, Blood Type) | the employee master record is complete | P0 |
| EC-PI-002 | Employee (ESS) | view my biographical information | I can verify my data is correct | P0 |
| EC-PI-003 | SPD | manage marital status with effective date | changes are tracked historically | P0 |

**Acceptance Criteria**:
- Name fields: Title (TH/EN), First Name (TH/EN), Last Name (TH/EN), Nickname
- All fields support Thai, English, and Vietnamese character sets
- DOB stored in Gregorian; displayed in Buddhist Era (BE) for Thai locale
- Marital status: date-effective with history

#### 3A.2 National ID & Identity Documents

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-PI-004 | SPD | record National ID number, type, and expiry date | government reporting requirements are met | P0 |
| EC-PI-005 | Employee (ESS) | view my National ID information (masked in display) | I can verify it without exposing full number | P0 |

**Acceptance Criteria**:
- National ID displayed masked (e.g., `X-XXXX-XXXXX-XX-X` showing only last 4 digits)
- Unmasked value accessible only to SPD and HRIS Admin roles
- Expiry date tracking with configurable advance warning
- Support multiple ID types (National ID, Passport, Work Permit)

#### 3A.3 Contact Information

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-PI-006 | SPD | manage email addresses (corporate + personal) and phone numbers (mobile, home, emergency) | all contact channels are recorded | P0 |
| EC-PI-007 | Employee (ESS) | update my phone numbers | my contact info stays current without SPD involvement | P0 |

#### 3A.4 Address (Cascading Dropdown)

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-PI-008 | Employee (ESS) | enter my address using cascading dropdowns (Province → District → Sub-district → Postal Code) | address entry is fast and error-free | P0 |
| EC-PI-009 | SPD | approve address change requests from employees | verified addresses are recorded | P0 |

**Acceptance Criteria**:
- Waterfall cascade: selecting Province filters Districts; selecting District filters Sub-districts; Postal Code auto-fills
- Address data source: Thailand administrative divisions (7,255 sub-districts)
- Multiple address types: Current, Permanent, Mailing
- ESS address changes trigger SPD approval workflow

#### 3A.5 Work Permit

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-PI-010 | SPD | record work permit details (number, type, issue/expiry dates) for foreign employees | visa/permit compliance is tracked | P1 |

**Acceptance Criteria**:
- Fields: Permit Number, Type, Issue Date, Expiry Date, Issuing Country
- Expiry alert: configurable days-before notification
- Only visible for employees with Nationality ≠ Thai (or manually enabled)

#### 3A.6 Emergency Contact

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-PI-011 | Employee (ESS) | add and edit my emergency contacts (name, relationship, phone) | the company can reach someone in an emergency | P0 |

**Acceptance Criteria**:
- Multiple emergency contacts supported
- Fields: Name, Relationship (picklist), Phone, Address (optional)
- Dependents stored as separate entity (not mixed with emergency contacts)

#### 3A.7 Dependents

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-PI-012 | SPD | manage dependent records (spouse, parents, children) separately from emergency contacts | benefits and tax calculations reference correct dependents | P0 |

**Acceptance Criteria**:
- Dependent types: Spouse, Parent, Child
- Fields: Name, Relationship, DOB, National ID (masked), Status
- Linked to Benefits module for eligibility calculations

#### 3A.8 Formal Education

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-PI-013 | SPD | record education history (degree, major, institution, year) | qualification data supports talent management | P1 |

#### 3A.9 Disability Information

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-PI-014 | SPD | record disability type and status (Active/Inactive) | compliance reporting and accommodation tracking are possible | P1 |

---

### 3B. Employment Information

#### 3B.1 Assignment Details

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-EI-001 | SPD | create assignment records for each employment event (New Hire, Branch Transfer, Company Transfer, Resignation) | the full employment history is tracked | P0 |
| EC-EI-002 | SPD | manage sequence order within the same effective date | when multiple events occur on the same day, the order is correct | P0 |

**Acceptance Criteria**:
- Each assignment record: Event Type, Effective Date, Sequence Number, Org Assignment (BU + Branch + Position + Group + Job), Status
- Assignment history is immutable (new records appended, not overwritten)
- Sequence within same effective date is user-definable

#### 3B.2 Tenure Calculations (Year of Service / Year in Position / etc.)

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-EI-003 | Employee (ESS) | view my Year of Service, Year in Position, Year in Job, etc. | I know my tenure details | P0 |
| EC-EI-004 | SPD | configure tenure calculation rules that differ by company (CRC, CPN, NON-CNEXT) | each entity's HR policy is correctly applied | P0 |

**Acceptance Criteria**:

| Tenure Field | Calculation Rule | Reset Trigger |
|-------------|-----------------|---------------|
| Year of Service | From original hire date; re-hire → new Emp Code + optional Seniority Start Date override | Never (continuous) |
| Year in Store Branch | From Branch Code change in Emp Job | Branch Code change |
| Year in Position | From Position ID change | Position change (EXCLUDES "Change Position" and "Reorganization" event types) |
| Year in Job | From Job Sub-Family change | Job Sub-Family change |
| Year in Job Grade (JG) | From JG change | JG change only (transfer without JG change = no reset) |
| Year in Personal Grade (PG) | From PG change | PG change |
| Year in BU | From BU change (org sync propagates to Emp Job) | BU change |

- **Age** displayed as Year.Month format; auto-compute Generation (Baby Boomer, Gen X, Gen Y, Gen Z)
- All tenures displayed in Year.Month format
- Re-hire rules: CRC & CPN = new Employee Code; Seniority Date overridable for continuous service credit

#### 3B.3 Custom Effective Date

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-EI-005 | SPD | override the effective date used for position start date computation | exceptions to standard dating rules are handled | P1 |

#### 3B.4 Acting Position

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-EI-006 | SPD | assign acting positions to employees (1 primary + multiple acting roles) | temporary role assignments are tracked | P1 |

**Acceptance Criteria**:
- One employee can hold: 1 Primary Position + N Acting Positions
- Acting positions have: Start Date, End Date, Position ID
- Acting positions reflected in relevant org charts

#### 3B.5 Alternative Cost Distribution

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-EI-007 | SPD | split an employee's cost across multiple cost centers with percentage allocation | shared-resource costing is accurately captured for finance | P1 |

**Acceptance Criteria**:
- Multiple cost center rows per employee, each with percentage (0–100%)
- Total must equal 100%
- Effective-dated (historical splits preserved)

#### 3B.6 EC Documents

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-EI-008 | SPD | attach documents (merit letters, bonus letters, contracts) to employee profiles per section | all employee documents are centralized | P0 |
| EC-EI-009 | Employee (ESS) | view my documents in-browser without downloading | I can quickly check my documents on any device | P0 |

**Acceptance Criteria**:
- Supported formats: JPG, PNG, WEBP, PDF
- In-browser viewing (PDF viewer embedded; image preview)
- No forced download — view-only mode with optional download
- Volume: support ~50,000 PDFs/year (merit/bonus letter generation)
- Documents attached per profile section (not just a flat list)
- PC and Mobile responsive viewing
- Role-based document access (employees see own documents; SPD sees all)

---

### 3C. Special Information (Configurable Sections)

**Description**: A flexible framework for storing additional employee data beyond standard fields. The BRD identifies 60+ configurable objects. Rather than hard-coding each, EC provides a **configurable section framework** where HRIS Admins define new sections with custom fields.

**User Stories**:

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-SI-001 | HRIS Admin | create unlimited custom data sections with configurable fields | new data requirements can be met without code changes | P0 |
| EC-SI-002 | HRIS Admin | attach document upload capability to any custom section | supporting documents are stored alongside the data | P1 |
| EC-SI-003 | SPD | enter and manage data in custom sections | all required employee information is captured | P0 |

**Named Section Examples** (pre-configured at launch):

| Section Code | Section Name | Key Fields |
|-------------|-------------|------------|
| `cust_awards` | Awards & Certificates | Award Name, Date, Issuer, Document |
| `cust_membership` | Professional Memberships | Organization, Start Date, End Date |
| `cust_disciplinary` | Disciplinary Records | Type, Date, Severity, Resolution, Document |
| `cust_goodness` | Goodness Records (ความดี) | Type, Date, Description, Document |
| `cust_companyLoan` | Company Loan | Loan Type, Amount, Start Date, End Date, Balance |
| `cust_companyAsset` | Company Asset | Asset Type, Asset ID, Issue Date, Return Date |
| `cust_courtOrder` | Court Order (กรมบังคับคดี) | Case Number, Amount, Start Date, Status |
| `cust_studentLoan` | Student Loan (กยศ) | Loan ID, Monthly Deduction, Balance |
| `cust_scholarship` | Scholarship | Type, Amount, Start/End Date, Conditions |
| `cust_ebo` | Employee Benefit Obligation | Category, Amount, Calculation Date |
| `cust_workExpInternal` | Work Experience (Inside Company) | Position, Department, Start/End Date |
| `cust_workExpExternal` | Work Experience (Outside Company) | Company, Position, Start/End Date |
| `cust_talentRef` | Talent Reference | Rating, Reviewer, Date, Notes |
| `cust_rotationPlan` | Rotation Plan | Target Position, Target Date, Status |
| `cust_devGoals` | Development Goals | Goal, Target Date, Status, Progress |
| `cust_perfHistory` | Performance History | Year, Overall KPI, Competency Score, Rating |
| `cust_eLetter` | E-Letter | Letter Type, Date, Document |
| `cust_eLetterPwd` | E-Letter Password | Encrypted Password |
| `cust_ohsCert` | OHS Certificate | Type, Issue Date, Expiry Date, Document |
| `cust_ohsDoc` | OHS Document | Document Type, Date, Document |
| `cust_dvtProject` | DVT Project | Project Name, Global Info, Status |

**Acceptance Criteria**:
- Unlimited sections per employee
- Each section supports: custom fields (text, number, date, picklist, document), sort order, active/inactive status
- Performance History data uploaded from external UA system (not manually entered)
- Field-level permissions apply to custom sections
- Audit trail for all changes
- Search across custom sections

---

### 3D. Employee Lifecycle Management

#### 3D.1 Hiring Flow

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-LC-001 | SPD | receive candidate data from the Recruitment system and create an employee record | new hires are onboarded efficiently | P0 |
| EC-LC-002 | System | auto-assign HRBP based on org unit rules | every new hire has an HR Business Partner from day one | P0 |
| EC-LC-003 | System | send email notifications to Manager, Payroll, and HRBP upon hire completion | all stakeholders are informed immediately | P0 |

**Acceptance Criteria**:
- Integration: Recruitment system pushes candidate → EC creates Employee record
- SPD can also manually create employees (data entry path)
- Auto-assign HRBP: configurable rules based on BU, Division, Department
- Email notifications sent on hire event: Direct Manager, Payroll Admin, assigned HRBP
- Employee Code generation: auto-increment per company rules

#### 3D.2 Transfer Flow

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-LC-004 | SPD | process cross-company transfers while retaining the employee's code | the employee's identity and history are preserved | P0 |
| EC-LC-005 | System | automatically transfer accumulated pay components on cross-company transfer | payroll continuity is maintained | P0 |
| EC-LC-006 | System | maintain continuous service count across transfers | tenure calculations remain accurate | P0 |

**Acceptance Criteria**:
- Cross-company transfer: Employee Code retained
- Pay components auto-transferred to new company's payroll setup
- Service continuity: Year of Service not reset on transfer
- New assignment record created with event type "Company Transfer"
- Dummy Assignment pattern supported for cross-group transfers (CRC ↔ CPN ↔ NON-CNEXT)

#### 3D.3 Termination Flow

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-LC-007 | Employee (ESS) | submit a termination (resignation) request through the system | I can initiate my departure formally | P0 |
| EC-LC-008 | Manager | approve or reject a termination request from my direct report | the first level of review is completed | P0 |
| EC-LC-009 | HRBP | approve or reject a termination request after manager approval | HR review is completed | P0 |
| EC-LC-010 | SPD | view completed termination workflows and process the termination | the employee record is updated | P0 |
| EC-LC-011 | System | show different termination reasons based on the viewer's role | sensitive reasons (e.g., misconduct) are only visible to authorized roles | P0 |

**Acceptance Criteria**:
- Workflow: Employee → Direct Manager Approve → HRBP Approve → SPD View/Process
- Email notification at each approval step
- Termination reasons: role-based visibility (Employee sees subset; HRBP/SPD see all)
- `ok_to_rehire` checkbox: auto-defaulted based on termination reason; SPD can override
- Contract employees: auto-terminate at contract end date with 30-day advance notification to Manager + HRBP
- Termination creates final assignment record with event type "Resignation" or "Termination"

#### 3D.4 Revert Termination

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-LC-012 | SPD | revert a completed termination | an employee who rescinds their resignation can be reactivated | P1 |

**Acceptance Criteria**:
- SPD-only action (no other role can perform)
- Only available for workflows in "Completed" status
- Auto-set Payroll Active Date upon revert
- Audit log records the revert action with reason

#### 3D.5 Pass Probation

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-LC-013 | System | automatically pass probation at Day 119 | probation completion is not missed | P0 |
| EC-LC-014 | System | send email reminders at Day 30, 75, and 90 to Direct Manager and HRBP | managers have time to evaluate before probation auto-completes | P0 |

**Acceptance Criteria**:
- Auto-pass job runs daily, processing employees at Day 119 of probation
- 3 reminder emails: Day 30, Day 75, Day 90 → Direct Manager + HRBP
- Manager can submit early evaluation before Day 119
- Probation period configurable per position level / job type / org structure (per BRD)

#### 3D.6 Re-Hiring

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-LC-015 | SPD | re-hire a previously terminated employee with appropriate service continuity | returning employees are correctly tracked | P1 |

**Acceptance Criteria**:
- CRC & CPN: new Employee Code generated on re-hire
- Seniority Start Date override available for continuous service credit
- Cross-group transfer via Dummy Assignment pattern (e.g., CRC → Dummy → CPN)
- Previous employee record linked for history continuity

#### 3D.7 Promotion / Demotion

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-LC-016 | SPD | process promotions and demotions (JG/PG changes) | employee progression is formally recorded | P0 |

**Acceptance Criteria**:
- JG (Job Grade) and PG (Personal Grade) changes tracked with effective date
- PT → FT type change recorded as "Change Employee Type" event
- Continuous service preserved on promotion/demotion
- Assignment record created with appropriate event type

#### 3D.8 Hire Date Correction

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-LC-017 | SPD | correct an employee's hire date (forward or backward) and re-sync all calculated fields | data errors are correctable without manual recalculation | P1 |

**Acceptance Criteria**:
- Hire date change triggers re-calculation of: Year of Service, Probation dates, all tenure fields
- Forward and backward correction supported
- Audit trail records original and corrected dates

#### 3D.9 Mass Import / Delete

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-LC-018 | SPD | bulk import Foundation and Employment data via Excel templates | large-scale data operations are efficient | P0 |
| EC-LC-019 | SPD | mass delete unused Foundation records | the system stays clean | P1 |

**Acceptance Criteria**:
- Excel template upload with validation before import
- Validation report: row-by-row errors/warnings before committing
- Support: Foundation objects (org, position, job) and Employee data (profile, assignment)
- Photo attachment via bulk upload
- Mass delete restricted to unused records (with referential integrity check)
- Audit trail for all bulk operations

---

### 3E. Compensation

#### 3E.1 Payment Information

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-CO-001 | SPD | manage employee payment information (bank account, payment method, frequency) | payroll processing has correct disbursement details | P0 |

**Acceptance Criteria**:
- Fields: Bank (from Bank master), Account Number (masked), Account Name, Payment Method, Frequency
- Pay Group auto-linked via Corporate Title
- Bank account number masked in display (last 4 digits visible)

#### 3E.2 Payroll Information

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-CO-002 | Payroll Admin | view payroll-relevant fields for an employee | payroll calculation inputs are accessible | P0 |

#### 3E.3 Salary Base Information

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-CO-003 | SPD | record base salary with effective date and change reason | salary history is maintained for audit and reporting | P0 |

**Acceptance Criteria**:
- Salary record: Amount, Currency, Effective Date, Change Reason (picklist), Changed By
- Full salary history preserved (no overwrites)
- Access restricted to SPD, HRIS Admin, Payroll Admin, and authorized HRBP

---

## Module 4: EC Reporting (P1)

### 4.1 Standard Reports (Pre-built)

**Description**: 40+ pre-built reports covering all EC data domains.

| Category | Reports | Priority |
|----------|---------|----------|
| Organization & Position | Organization Master Data, Org Hierarchy, Position Master Data, Position Budget/HC/FTE | P1 |
| Personal Information | Basic Info, Contact, Address, Work Permit, Disability (Active/Inactive), Acting Employee, Active Employee, Benefit Special Privilege | P1 |
| Employment | Assignment Details, Alternative Cost Distribution, Employee Movement, Employee Profile (PDF export with selectable portlets) | P1 |
| Compensation | Payment Info, Payroll Info, Salary Changed Details (All Records) | P1 |
| Miscellaneous | Work Experience, Disciplinary, Guarantee, EMP Compensation, Hiring & Rehire, Job Relationships, Movement (SPDHR), Resignation, Performance Appraisal Grade, FTE by Position, Employment Detail | P2 |
| Foundation | Position, Organization, Function, Store Branch, Work Location, Cost Center, Brand, HR District, Section Group | P2 |
| Workflow | All pending approval items | P1 |

**User Stories**:

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-RPT-001 | SPD | run standard reports with role-based data visibility | I see only data I'm authorized to access, and blank fields for restricted data | P1 |
| EC-RPT-002 | SPD | export reports to Excel and PDF | I can share data with stakeholders offline | P1 |
| EC-RPT-003 | Manager | view my team's Employee Profile as PDF with selectable sections/portlets | I have a printable summary for meetings | P1 |

**Acceptance Criteria**:
- Role-based visibility: same report template, but fields display as blank/hidden if user lacks permission
- Export formats: Excel (.xlsx), PDF
- Employee Profile PDF: user selects which portlets/sections to include before export
- Report filters: by company, BU, department, date range, employee group, etc.
- Report execution time < 10 seconds for standard reports

### 4.2 Report Automation / Scheduled Reports

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-RPT-004 | HRIS Admin | schedule reports to run automatically on a defined schedule | recurring reporting needs are automated | P1 |
| EC-RPT-005 | HRIS Admin | configure report delivery via email or CG File Gateway | report consumers receive data without logging in | P2 |

**Acceptance Criteria**:
- Schedule: daily, weekly, monthly, custom cron
- Delivery: email attachment (Excel/PDF) or CG File Gateway upload
- Execution log: status, timestamp, recipient list, file size

### 4.3 Custom Reports

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-RPT-006 | HRIS Admin | create custom reports by selecting fields, joining tables, with per-BU configuration | ad-hoc reporting needs are met without developer involvement | P2 |
| EC-RPT-007 | HRIS Admin | create Story Reports / Analysis Reports | executive-level data visualizations are available | P2 |

### 4.4 Favourite Reports

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-RPT-008 | Any User | pin frequently used reports to my homepage | I can quickly access my most-used reports | P2 |

---

## Module 5: EC Self Service (P0/P1)

### 5.1 Employee Self Service (ESS)

#### 5.1.1 View Personal Information

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-ESS-001 | Employee | view my full profile with field-level permission controls | I see all information I'm authorized to see | P0 |

#### 5.1.2 Update Personal Information

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-ESS-002 | Employee | update my address and phone number directly | my contact info stays current without HR involvement | P0 |
| EC-ESS-003 | Employee | submit name, address, or marital status changes with supporting documents for SPD approval | changes requiring verification go through proper review | P0 |

**Acceptance Criteria**:
- Direct-edit fields (no approval needed): phone numbers
- Approval-required fields: Name, Address, Marital Status → triggers SPD approval workflow
- Document attachment required for: Name change (court order), Marital status change (marriage/divorce certificate)
- Workflow notification to SPD on submission

#### 5.1.3 View Employment Info

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-ESS-004 | Employee | view my organization, position, job, and supervisor information | I have visibility into my employment details | P0 |

#### 5.1.4 View Org Chart

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-ESS-005 | Employee | view the org chart with configurable upper levels and visible fields | I understand my place in the organization | P1 |

**Acceptance Criteria**:
- Configurable: how many levels above/below the employee are shown
- Display fields configurable by HRIS Admin (role-based)

#### 5.1.5 View Compensation / Pay Statement

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-ESS-006 | Employee | view my compensation and pay statements | I can check my salary information | P1 |

**Acceptance Criteria**:
- Access controlled by role permissions
- Pay statement rendered in-browser; optional download

#### 5.1.6 Quick Actions Tile

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-ESS-007 | Employee | access configurable quick action shortcuts on my homepage (My Profile, Org Chart, Manage Team, Pay Statement) | I can quickly navigate to frequent tasks | P1 |

#### 5.1.7 Termination Request

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-ESS-008 | Employee | initiate a termination (resignation) request through the system | my resignation is formally submitted and tracked | P0 |

*See [3D.3 Termination Flow](#3d3-termination-flow) for full workflow details.*

#### 5.1.8 Document Access

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-ESS-009 | Employee | view and download my personal documents (merit letters, bonus letters, contracts) | I have access to my HR documents at any time | P1 |

### 5.2 Manager Self Service (MSS)

#### 5.2.1 View Team Information

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-MSS-001 | Manager | view my team members' information with field-level permissions | I have appropriate visibility into my team's data | P0 |

#### 5.2.2 Team Org Chart

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-MSS-002 | Manager | view my team's org chart showing direct and matrix reporting lines | I understand the full team structure | P0 |

#### 5.2.3 Team Reports

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-MSS-003 | Manager | view team headcount and movement reports | I can track team changes | P1 |

#### 5.2.4 Position & Vacancy Overview

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-MSS-004 | Manager | view team positions with headcount and vacancy status | I can identify staffing needs | P1 |

### 5.3 Admin Self Service (HRIS)

#### 5.3.1 Field Configuration

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-ADM-001 | HRIS Admin | add, edit, and disable fields per module | the system adapts to changing business requirements | P0 |
| EC-ADM-002 | HRIS Admin | control field visibility by Role, Country, and Org unit | different user groups see appropriate fields | P0 |
| EC-ADM-003 | HRIS Admin | set conditional mandatory rules for fields | data quality is enforced contextually | P0 |
| EC-ADM-004 | HRIS Admin | set fields as read-only based on status or role | data integrity is protected | P0 |

**Acceptance Criteria**:
- Field config UI: per-module field list with toggles for Visible, Mandatory, Read-Only
- Rules engine: IF [condition] THEN [field behavior] (e.g., IF Country=VN THEN show VN-specific fields)
- Changes apply immediately (no deployment required)
- Audit trail for field configuration changes

#### 5.3.2 Quick Actions & Home Page Management

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-ADM-005 | HRIS Admin | configure quick action shortcuts per role/group | each user type sees relevant shortcuts | P2 |
| EC-ADM-006 | HRIS Admin | manage home page tiles and announcements targeted by Role, Org, or Employee Group | communication is targeted and relevant | P2 |

**Acceptance Criteria**:
- Tile types: News/Announcement, Quick Link, External Link (People Portal, E-Patient Transfer, Executive Payroll)
- Targeting: by Role, Org Unit, Employee Group, All Employees
- Rich content: image, title, description, link
- Sort order configurable

---

## Module 6: EC User Management (P0)

### 6.1 Data Permission Group

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-UM-001 | HRIS Admin | define Data Permission Groups scoped by Business Group, Company, Division, Department, Employee Group, and PG | data access is precisely controlled | P0 |

**Acceptance Criteria**:
- Permission scope dimensions: Business Group, Company, Division, Department, Employee Group, Personal Grade
- Multiple dimensions can be combined (AND logic)
- A user can belong to multiple Data Permission Groups (OR logic across groups)

### 6.2 Application Role Group

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-UM-002 | HRIS Admin | define Application Role Groups controlling menu and function access (View/Edit/Enable/Disable) per EC module | functional access is managed independently from data access | P0 |

**Acceptance Criteria**:
- Granularity: per module, per function, per action (View, Edit, Create, Delete, Enable, Disable)
- Role inheritance: parent roles can be extended by child roles

### 6.3 User Assignment

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-UM-003 | HRIS Admin | map groups of users to both Data Permission Groups and Application Role Groups | access control is managed through group membership | P0 |

### 6.4 Proxy Access

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-UM-004 | HRIS Admin | grant proxy access allowing designated admins to view/edit employee data on behalf of others | support and troubleshooting can be performed without sharing credentials | P1 |

**Acceptance Criteria**:
- Admin-role only feature
- Proxy sessions fully logged: who, when, what was viewed/changed
- Proxy indicator visible in UI during proxy session
- Time-limited proxy sessions (configurable duration)

### 6.5 Revised Foundation Events

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-UM-005 | System | stamp a "Position Changed" event on employee profiles when their associated Foundation object (org, position) is revised | employees are aware when organizational changes affect their assignment | P1 |

**Acceptance Criteria**:
- Triggered by Foundation revision (org unit rename, position restructure, etc.)
- Effective Date = 1st of the month in which the change occurs
- Event visible in employee's assignment history

### 6.6 Audit Report

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-UM-006 | HRIS Admin | view who Created, Edited, or Deleted any record across all EC modules | I can investigate data changes and maintain accountability | P0 |

**Acceptance Criteria**:
- Audit log captures: User, Action (Create/Edit/Delete), Module, Record ID, Timestamp, Old Value, New Value
- Filterable by: user, module, date range, action type
- Exportable to Excel
- Viewable in-app (dedicated Audit Report page)
- Includes proxy session actions with proxy user identified

---

## Module 7: EC Data Management & System Features (P1/P2)

### 7.1 API / Integration Center (IC)

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-DM-001 | HRIS Admin | export any EC/PY/TM/BE data via an admin export tool | data can be shared with external systems and for analysis | P1 |

**Acceptance Criteria**:
- Admin-only tool
- Export formats: CSV, Excel, JSON
- Field selection: choose which fields to include
- Filters: same as reporting (company, BU, date range, etc.)
- Scheduled exports supported

### 7.2 Survey Form

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-DM-002 | HRIS Admin | create and distribute surveys within the HRMS (replacing O365 Forms) | survey data is captured without additional license costs and saved to employee Special Information | P2 |

**Acceptance Criteria**:
- Survey builder: question types (text, rating, multiple choice, checkbox)
- Distribution: by Org unit, Employee Group, or All
- Responses saved to employee's Special Information section
- Replace O365 Forms (license cost driver)

### 7.3 Language Switching

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-DM-003 | Any User | switch between Thai, English, and Vietnamese across all EC modules | the system is usable in my preferred language | P0 |

**Acceptance Criteria**:
- Language toggle in header — applies immediately (no page reload)
- All UI labels, validation messages, and system notifications translated
- Data fields (names, addresses) stored in multiple languages; displayed per user preference
- Required modules for trilingual: EC, TIME, BENEFIT

### 7.4 E-Document Management

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-DM-004 | SPD | migrate documents from the existing SPD E-Document system into the new HRMS | all employee documents are consolidated in one platform | P1 |
| EC-DM-005 | SPD | store contracts, applications, transfer documents, and resignation documents in EC | document management is centralized | P1 |

**Acceptance Criteria**:
- Migration tool for existing SPD E-Document system
- Document types: Contract, Application, Transfer, Resignation, General
- Document metadata: type, upload date, effective date, uploaded by
- Integration with EC Documents (Module 3B.6)

### 7.5 Consent Form

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-DM-006 | HRIS Admin | configure a first-login consent form targeting all employees or specific groups | PDPA compliance is enforced | P0 |
| EC-DM-007 | System | track which employees have and haven't completed the consent form | compliance status is visible | P0 |

**Acceptance Criteria**:
- Consent form displayed on first login (blocking — must complete to proceed)
- Targeting: All Employees, specific Employee Groups, specific Org units
- Tracking dashboard: consented count, pending count, percentage
- Consent record: employee, timestamp, version of consent form accepted
- Re-consent triggered when consent form version is updated

### 7.6 Traffic Report (Login Tracking)

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-DM-008 | HRIS Admin | view daily login tracking reports | system usage patterns are monitored | P2 |

### 7.7 Hidden Profile

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-DM-009 | HRIS Admin | mark certain employees as "Hidden Profile" | confidential employees are excluded from org charts and O365 sync while remaining in the system | P1 |

**Acceptance Criteria**:
- Hidden Profile flag on employee record
- Hidden employees excluded from: Org Chart, Employee Directory, O365/AD sync
- Visible only to: HRIS Admin, SPD, HRBP (configurable)
- All standard data management still applies (payroll, benefits, etc.)

### 7.8 Direct User Accounts

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-DM-010 | HRIS Admin | create Direct User accounts (non-SSO) for backend job runs | automated processes run independently of person-specific credentials | P2 |

**Acceptance Criteria**:
- SSO for all human users (mandatory)
- Direct User: service accounts for automated job runs (report scheduling, data sync, etc.)
- Direct Users excluded from: login tracking, consent forms, org chart
- Audit log distinguishes Direct User actions from human user actions

### 7.9 Data Encryption

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-DM-011 | IT Security | ensure sensitive and confidential fields are encrypted at the database level | data is protected at rest per PDPA requirements | P0 |

**Acceptance Criteria**:
- Encryption at rest for: National ID, Bank Account, Salary, Disability info, Court Order, Student Loan
- Access control matrix documented: which roles can decrypt which fields
- Encryption key management: separate from application credentials

### 7.10 Session Timeout

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-DM-012 | HRIS Admin | configure session timeout duration | idle sessions are automatically terminated for security | P1 |

**Acceptance Criteria**:
- Default: 30 minutes (per platform PRD)
- Configurable by HRIS Admin
- Warning popup 5 minutes before timeout
- Session extension on user activity

### 7.11 Mobile Responsive

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-DM-013 | Employee | access all EC features on my mobile browser | I can use the system on-the-go from any device | P0 |

**Acceptance Criteria**:
- All EC screens functional on mobile (iOS Safari, Android Chrome)
- Touch-friendly: minimum tap target 44px
- Document viewing optimized for mobile screens
- Responsive navigation (hamburger menu, collapsible sections)

### 7.12 Edit / Copy Feature

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|------------|----------|
| EC-DM-014 | SPD | copy an existing record and insert as new record with pre-filled data | repetitive data entry is minimized | P2 |

**Acceptance Criteria**:
- Available on all data entry screens
- Copy creates new record with editable pre-filled fields
- Unique fields (codes, IDs) are cleared on copy
- Audit trail records the source record of the copy

---

# 8. Data Model Overview

## 8.1 Core Entities

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FOUNDATION LAYER                              │
├─────────────┬──────────────┬──────────────┬────────────────────────┤
│ Organization│   Job        │  Position    │  Payment               │
│ Foundation  │   Foundation │  Foundation  │  Foundation            │
│             │              │              │                        │
│ • Org Unit  │ • Job Family │ • Position   │ • Pay Group            │
│ • Company   │ • Sub-Family │ • Parent Pos │ • Pay Grade            │
│ • BU        │ • Band Code  │ • FTE        │ • Pay Component        │
│ • Division  │ • Salary Str │ • Vacancy    │ • Bank Master          │
│ • Department│ • Job Code   │ • Solid/Dot  │ • Frequency            │
│ • Branch    │              │   Line       │ • Corporate Title      │
│ • Location  │              │              │                        │
│ • Cost Ctr  │              │              │                        │
│ • Zone      │              │              │                        │
└─────┬───────┴──────┬───────┴──────┬───────┴────────────┬───────────┘
      │              │              │                    │
      ▼              ▼              ▼                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        EMPLOYEE LAYER                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Employee Master Record                                              │
│  ├── Personal Information (Biographical, National ID, Contact,       │
│  │   Address, Work Permit, Emergency Contact, Dependents,            │
│  │   Education, Disability)                                          │
│  ├── Employment Information (Assignment History, Tenure Fields,      │
│  │   Acting Position, Alt Cost Distribution)                         │
│  ├── Compensation (Payment Info, Payroll Info, Salary Base)          │
│  ├── Special Information (60+ configurable sections)                 │
│  └── Documents (per-section attachments)                             │
│                                                                      │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     ACCESS CONTROL LAYER                             │
├─────────────────────────────────────────────────────────────────────┤
│  Data Permission Group (scope: BG, Company, Div, Dept, EG, PG)     │
│  Application Role Group (module/function/action permissions)         │
│  User Group → Data Perm Group + App Role Group mapping              │
│  Field Config (visibility, mandatory, read-only rules)              │
│  Proxy Access (admin-only, fully audited)                           │
└─────────────────────────────────────────────────────────────────────┘
```

## 8.2 Key Relationships

| Relationship | Type | Description |
|-------------|------|-------------|
| Company ↔ BU | Many-to-Many | Shared-service BUs span multiple companies |
| Org Unit → Parent Org Unit | Many-to-One | Hierarchical tree (up to 10+ levels) |
| Position → Org Unit | Many-to-One | Position belongs to one org unit |
| Position → Job Code | Many-to-One | Position classified by one job code |
| Position → Parent Position (Solid) | Many-to-One | Direct reporting line |
| Position → Parent Position (Dotted) | Many-to-Many | Matrix/secondary reporting |
| Employee → Position | Many-to-One (Primary) + Many-to-Many (Acting) | One primary, N acting positions |
| Employee → Assignment | One-to-Many | Historical assignment records |
| Employee → Special Info Section | One-to-Many per section type | Configurable data sections |
| Employee → Document | One-to-Many | Documents attached per section |
| User Group → Data Permission Group | Many-to-Many | Access scope mapping |
| User Group → Application Role Group | Many-to-Many | Functional access mapping |

## 8.3 Data Dictionary Reference

The BRD contains 42 Excel sheets with detailed field-level specifications for each module. These serve as the authoritative data dictionary and are referenced as:

> **Source**: HRM BRD - EC - v1.0 - 20260323 1.xlsx — Sheets 1–42

Key sheets:
- Sheet "Org Foundation" — Organization unit fields and hierarchy rules
- Sheet "Job Foundation" — Job classification fields
- Sheet "Position Foundation" — Position fields and relationships
- Sheet "Personal Info" — 23 personal information field groups
- Sheet "Employment Info" — 24 employment field groups
- Sheet "Special Info" — 60+ configurable section definitions
- Sheet "Compensation" — Payment and salary fields
- Sheet "Reports" — 42 report specifications
- Sheet "Self Service" — ESS/MSS feature matrix

---

# 9. Integration Map

```
                                    ┌─────────────────┐
                                    │   EMPLOYEE       │
                                    │   CENTRAL (EC)   │
                                    └────────┬────────┘
                                             │
                ┌────────────┬───────────────┼───────────────┬────────────┐
                │            │               │               │            │
                ▼            ▼               ▼               ▼            ▼
┌───────────────────┐ ┌──────────┐ ┌──────────────┐ ┌───────────┐ ┌──────────────┐
│ Recruitment       │ │ Payroll  │ │ Competency / │ │ O365 /    │ │ CG File      │
│ System            │ │ System   │ │ LMS          │ │ MS Teams  │ │ Gateway      │
│                   │ │          │ │              │ │ Viva      │ │              │
│ → Hired candidate │ │ ← Comp   │ │ ← JobCode   │ │ ← Profile │ │ ← Scheduled  │
│   data to EC      │ │   data   │ │   sync       │ │   sync    │ │   Reports    │
│   (inbound)       │ │ → Payroll│ │   (outbound) │ │ (excl.    │ │   (outbound) │
│                   │ │   fields │ │              │ │  Hidden)  │ │              │
└───────────────────┘ │ (bi-dir) │ └──────────────┘ └───────────┘ └──────────────┘
                      └──────────┘
                ┌────────────┬───────────────┬───────────────┐
                │            │               │               │
                ▼            ▼               ▼               ▼
┌───────────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐
│ SPD E-Document    │ │ UA System    │ │ Integration  │ │ External Survey  │
│ System            │ │ (Perf Mgmt)  │ │ Center (IC)  │ │ (replacing O365) │
│                   │ │              │ │              │ │                  │
│ → Document        │ │ → KPI/Comp/  │ │ → Admin data │ │ → Responses to   │
│   migration       │ │   Perf data  │ │   export for │ │   Special Info   │
│   to EC           │ │   to Special │ │   any module │ │                  │
│   (one-time)      │ │   Info       │ │              │ │                  │
└───────────────────┘ └──────────────┘ └──────────────┘ └──────────────────┘
```

### Integration Details

| # | Source/Target | Direction | Data | Trigger | Protocol | Priority |
|---|--------------|-----------|------|---------|----------|----------|
| 1 | Recruitment System | Inbound → EC | Candidate → Employee record | On hire approval | REST API | P0 |
| 2 | Payroll System | Bi-directional | Compensation, payment, salary data | On data change (event) | REST API + Event Bus | P0 |
| 3 | Competency / LMS | Outbound ← EC | JobCode, Job Family, Sub-Family | On job foundation change | REST API | P1 |
| 4 | O365 / MS Teams / Viva | Outbound ← EC | Employee profile (name, title, dept, photo) | Scheduled sync (daily) | Microsoft Graph API | P1 |
| 5 | CG File Gateway | Outbound ← EC | Scheduled report files (Excel/CSV) | Cron schedule | SFTP / API | P2 |
| 6 | SPD E-Document System | Inbound → EC | Historical employee documents | One-time migration | Bulk import | P1 |
| 7 | UA System (Performance) | Inbound → EC | Overall KPI, Competency, Perf Rating | Annual/periodic upload | REST API / File | P1 |
| 8 | Integration Center (IC) | Outbound ← EC | Any EC/PY/TM/BE data | On-demand / scheduled | Admin tool (REST API) | P1 |

---

# 10. Workflow & Approval Flows

## 10.1 Personal Info Update (Name / Address / Marital Status)

```
Employee (ESS)                    SPD
    │                              │
    ├─ Submit change request ─────▶│
    │  (with document attachment)  │
    │                              ├─ Review documents
    │                              ├─ Approve / Reject
    │◀─ Notification ─────────────┤
    │                              │
    │  [If Approved]               │
    │  Employee record updated     │
```

**Rules**:
- Direct-edit (no approval): Phone numbers
- Approval required: Name change, Address change, Marital Status change
- Document attachment mandatory for: Name (court order), Marital Status (certificate)
- SPD is sole approver

## 10.2 Termination Request (Resignation)

```
Employee        Direct Manager       HRBP              SPD
    │                │                 │                 │
    ├─ Submit ──────▶│                 │                 │
    │  resignation   │                 │                 │
    │                ├─ Approve ──────▶│                 │
    │  [email]       │  [email]        │                 │
    │                │                 ├─ Approve ──────▶│
    │                │                 │  [email]        │
    │                │                 │                 ├─ View & Process
    │                │                 │                 │  termination
    │◀─ Final notification ───────────────────────────────┤
```

**Rules**:
- 4-step flow: Employee → Manager → HRBP → SPD
- Email notification at each step
- Termination reason visibility: Employee sees subset; Manager/HRBP/SPD see full list
- `ok_to_rehire`: auto-set based on reason code; SPD can override
- Contract employee auto-terminate: system job fires at 30 days before end date

## 10.3 Transfer Flow

```
SPD
 ├─ Initiate cross-company transfer
 ├─ System auto-transfers accumulated pay components
 ├─ System maintains continuous service count
 ├─ New assignment record created (event: "Company Transfer")
 └─ Notifications to: Manager (old), Manager (new), Payroll, HRBP
```

**Rules**:
- SPD-initiated (no employee self-service for transfers)
- Employee Code retained across companies
- Dummy Assignment pattern for cross-group transfers

## 10.4 Probation Management

```
Day 0: Hire ──────▶ Day 30: Reminder 1 ──────▶ Day 75: Reminder 2
                     (→ Manager + HRBP)          (→ Manager + HRBP)

──────▶ Day 90: Reminder 3 ──────▶ Day 119: Auto-pass Probation
         (→ Manager + HRBP)        (System job)
```

**Rules**:
- Daily system job checks probation status
- 3 email reminders: Day 30, 75, 90 → Direct Manager + HRBP
- Auto-pass at Day 119 if no action taken
- Manager can submit early evaluation/extension before Day 119
- Probation period configurable per position level / job type

## 10.5 Contract Auto-Termination

```
Day -30: System sends advance notification ──▶ Manager + HRBP
         ├── Option: Extend contract (manual)
         └── Option: No action → Auto-terminate at contract end date
```

---

# 11. Non-Functional Requirements

| Category | Requirement | Target |
|----------|-------------|--------|
| **Performance** | Page load time | < 3 seconds |
| | Standard report generation | < 10 seconds |
| | Search response time | < 2 seconds |
| **Scalability** | Employee records | 100,000+ (TH + VN) |
| | Concurrent users | 10,000+ |
| | Document storage | ~50,000 PDFs/year + historical |
| **Security** | Data encryption | At-rest for PII fields (National ID, Bank Account, Salary) |
| | Access control | Role-based + Field-level + Data-scope permissions |
| | Audit trail | All Create/Edit/Delete across all modules |
| | Session management | Configurable timeout (default 30 min) |
| **Availability** | Uptime SLA | 99.9% |
| | Disaster recovery | RPO < 1 hour, RTO < 4 hours |
| **Languages** | UI and data | Thai, English, Vietnamese |
| | Locale-specific | Buddhist Era dates for TH; Gregorian for EN/VN |
| **Browser** | Primary | Chrome (latest 2 versions) |
| | Secondary | Safari (iOS), Edge |
| **Mobile** | Responsive | Full functionality on iOS Safari + Android Chrome |
| | Touch targets | Minimum 44px |
| **Compliance** | PDPA | Consent tracking, data encryption, right to access/rectify |
| | Thai labor law | Employment record retention per legal requirements |
| **Integration** | API compatibility | RESTful APIs; event-driven sync via message bus |
| | File exchange | CG File Gateway (SFTP); Excel/CSV/JSON exports |

---

# 12. UX Principles & Constraints

## 12.1 Design Principles

1. **Role-aware UI** — The same screen adapts based on user role: fields visible/hidden, edit/read-only, and navigation items change per Data Permission + Application Role
2. **Progressive disclosure** — Show essential information first; details available on expansion (especially for employee profiles with many sections)
3. **Minimal clicks** — Quick Actions, configurable tiles, and batch operations reduce navigation overhead
4. **Consistent data entry** — Cascading dropdowns, picklists, and auto-fill reduce manual entry and errors
5. **Bilingual by default** — Every label, message, and notification available in TH/EN/VN; data fields stored multilingually

## 12.2 Constraints

- **No native mobile app** — Web responsive only (native app is future phase)
- **No offline mode** — All operations require network connectivity
- **SSO mandatory** — All human users authenticate via SSO (Azure AD); no local password login except Direct User service accounts
- **Thai Buddhist Era** — Date display in Buddhist Era for Thai locale; storage in Gregorian
- **Masking by default** — PII fields (National ID, Bank Account) masked in UI; unmasking requires explicit permission
- **Document view-only** — Documents open in-browser viewer; download is optional and permission-controlled

## 12.3 Branding

Per platform PRD:
- Primary: CG Red (`#C8102E`)
- Tailwind custom colors: `cg-red`, `cg-dark`, `cg-light`, `cg-success`, `cg-warning`, `cg-error`, `cg-info`

---

# 13. Open Questions & Risks

## 13.1 Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| OQ-1 | What is the exact probation period for each position level/job type? BRD says "configurable" but no default values provided. | HR Transformation | Open |
| OQ-2 | How should cross-group transfers (CRC → CPN) handle benefit plan differences? | Payroll Team | Open |
| OQ-3 | What is the data retention policy for terminated employees? How long before records are archived? | Legal / Compliance | Open |
| OQ-4 | Vietnam-specific fields and regulations — what are the VN equivalents of Thai Social Security, PDPA, etc.? | VN HR Team | Open |
| OQ-5 | O365 sync — which exact fields are synced, and what is the conflict resolution strategy? | IT / Microsoft Team | Open |
| OQ-6 | What is the expected volume and frequency of Mass Import operations? | SPD | Open |
| OQ-7 | Survey Form — what is the scope? Simple forms only, or does it need branching logic? | HRIS | Open |
| OQ-8 | E-Document migration — how many documents, total storage, and timeline? | SPD | Open |
| OQ-9 | Hidden Profile — exact visibility rules per role? Which reports should exclude hidden profiles? | HRIS | Open |
| OQ-10 | Data Encryption — which specific fields per module are classified as Sensitive vs. Confidential? | IT Security | Open |

## 13.2 Risks

| # | Risk | Impact | Likelihood | Mitigation |
|---|------|--------|------------|------------|
| R-1 | BRD has 60+ Special Information objects; building a fully generic framework may delay MVP | High | Medium | Phase delivery: launch with top 20 sections; add remaining post-launch |
| R-2 | Cross-company transfer logic is complex (Dummy Assignment, pay component transfer); edge cases may cause data inconsistency | High | Medium | Dedicated QA test suite for transfer scenarios; production dry-run |
| R-3 | 50,000+ PDFs/year for merit/bonus letters may strain document storage | Medium | Low | Cloud object storage (S3/MinIO) with CDN; lazy-load documents |
| R-4 | Vietnam expansion requires trilingual support and VN-specific compliance — requirements not fully documented | Medium | High | Engage VN HR team early; treat VN as separate phase if needed |
| R-5 | SF-to-EC data migration for 100,000+ employees is a major operational risk | High | Medium | Migration tool with validation; parallel run period; rollback plan |
| R-6 | Field-level permission configuration across all modules creates combinatorial complexity | Medium | Medium | Permission simulator / preview tool; template-based setup |
| R-7 | Probation auto-pass system job must be reliable — missing Day 119 has legal implications | High | Low | Job monitoring, alerting, manual override capability |

---

# 14. Appendix

## 14.1 Glossary

| Term | Thai (ภาษาไทย) | Definition |
|------|----------------|------------|
| BU | หน่วยธุรกิจ | Business Unit |
| CRC | เซ็นทรัล รีเทล คอร์ปอเรชั่น | Central Retail Corporation — retail arm of Central Group |
| CPN | เซ็นทรัลพัฒนา | Central Pattana — property development arm |
| NON-CNEXT | — | Non-Central Next entities (affiliates outside core CRC/CPN) |
| SPD | สำนักบริหารทรัพยากรบุคคล | HR Operations department — the key data operators |
| HRBP | — | HR Business Partner |
| HRIS | — | HR Information Systems (system administrators) |
| ESS | — | Employee Self Service |
| MSS | — | Manager Self Service |
| JG | — | Job Grade (organizational grade of the position) |
| PG | — | Personal Grade (individual grade of the employee) |
| FTE | — | Full-Time Equivalent |
| HC | — | Headcount |
| PDPA | พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล | Thailand Personal Data Protection Act |
| SSO (Social Security) | สำนักงานประกันสังคม | Social Security Office |
| SSO (Auth) | — | Single Sign-On (authentication) |
| BE (Buddhist Era) | พุทธศักราช | Thai calendar year = Gregorian + 543 |
| IC | — | Integration Center (admin data export tool) |
| UA System | — | Universal Assessment — external performance management system |
| DVT | — | Digital Value Transformation project |
| OHS | — | Occupational Health and Safety |
| EBO | — | Employee Benefit Obligation |
| กยศ | กองทุนเงินให้กู้ยืมเพื่อการศึกษา | Student Loan Fund (Thailand) |
| กรมบังคับคดี | — | Legal Execution Department (court orders / wage garnishment) |

## 14.2 BRD Source Reference

| Item | Value |
|------|-------|
| BRD File | HRM BRD - EC - v1.0 - 20260323 1.xlsx |
| Total Rows | 219 |
| Total Sheets | 42 |
| Modules Covered | 7 (Core Foundation, Org & Position, Employee Data, Reporting, Self Service, User Management, Data Management) |
| Language | Thai with English terminology |
| Date | 2026-03-23 |

## 14.3 Priority Framework

| Priority | Criteria | Examples |
|----------|----------|---------|
| **P0** — Must Have | Core employee lifecycle, data integrity, security, compliance | Hiring flow, termination flow, personal info, assignment details, data encryption, PDPA consent |
| **P1** — Should Have | Reporting, self-service features, integration, operational efficiency | Standard reports, document management, org charts, scheduled reports |
| **P2** — Nice to Have | Advanced analytics, convenience features, specialized integrations | Custom reports, story reports, survey forms, traffic reports, copy record feature |

## 14.4 Module Coverage Verification

| Module | BRD Rows (approx.) | PRD Sections | Status |
|--------|-------------------|-------------|--------|
| 1. EC Core & Foundation | 15 | 1.1–1.5 | Covered |
| 2. Org & Position Management | 20 | 2.1–2.4 | Covered |
| 3. Employee Data Management | 119+ | 3A–3E | Covered |
| 4. EC Reporting | 42 | 4.1–4.4 | Covered |
| 5. EC Self Service | 19 | 5.1–5.3 | Covered |
| 6. EC User Management | 6 | 6.1–6.6 | Covered |
| 7. EC Data Management | 14 | 7.1–7.12 | Covered |
| **Total** | **~219** | **7 modules, 40+ features** | **Complete** |

---

*Document generated from BRD: HRM BRD - EC - v1.0 - 20260323 1.xlsx*
*PRD Template aligned with: specs/prd-central-retail-nextgen-hrms.md v2.0*
