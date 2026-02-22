# Plan: Central Retail Next-Gen HRMS Full Implementation

## Task Description
Implement the Central Retail Next-Gen HR System (HRMS) as specified in `specs/prd-central-retail-nextgen-hrms.md`. This is a full-stack migration from the existing Vanilla JS prototype (`apps/`) to a modern architecture using Next.js 16 (frontend), NestJS 11 (backend microservices), PostgreSQL 17 (database), Redis (cache), and Keycloak (auth). The system manages 29+ HR modules covering employee self-service, payroll, performance, recruitment, and new AI-powered features (Smart Claims, Quick Approve, Policy Validation). All implementation follows TDD — tests are written before implementation code, and every task must pass validation before the next task begins. README.md is rewritten upon completion.

## Objective
When this plan is complete:
1. A fully functional Next.js 16 frontend with all 29+ modules migrated from the Vanilla JS prototype
2. NestJS 11 backend microservices (13 services) with REST APIs, Prisma ORM, and PostgreSQL schemas
3. Authentication via Keycloak with OAuth2/RBAC (4 roles: Employee, Manager, HR Admin, HR Manager)
4. New features: Smart Claims (AI OCR), Quick Approve Hub, Real-time Policy Validation, Enhanced Manager Dashboard
5. Full test coverage: unit tests, integration tests, and E2E tests (Playwright)
6. Thai/English i18n, WCAG 2.1 AA accessibility, responsive design
7. Updated README.md documenting the new architecture

## Problem Statement
The current system is a Vanilla JS monolithic SPA with mock data (JavaScript arrays), simulated authentication, and no real backend. It cannot scale to 70,000+ employees, lacks real data persistence, has no proper auth/authorization, and cannot support the enterprise features required (AI OCR claims, batch approvals, real-time policy validation). The PRD mandates a migration to a microservices architecture that addresses all these limitations.

## Solution Approach
Follow the PRD's 5-phase roadmap, implemented iteratively with TDD:
- **Phase 1 (Foundation):** Project scaffolding, auth, Employee Center, Organization Service
- **Phase 2 (Core HR):** Leave, Payroll, Workflows, Document Service, Settings
- **Phase 3 (Talent & Recruitment):** Performance, L&D, Recruitment, Time & Attendance, Benefits
- **Phase 4 (Advanced Features):** Smart Claims, Quick Approve, Policy Validation, Manager Dashboard
- **Phase 5 (Integration & Polish):** Data migration scripts, full E2E tests, README rewrite

Each module follows: Write Tests → Implement Backend → Implement Frontend → Validate → Proceed.

## Relevant Files
Use these files to complete the task:

### Existing Files (Reference & Migration Source)
- `specs/prd-central-retail-nextgen-hrms.md` — The full PRD with all requirements, data models, API specs, wireframes
- `apps/index.html` — Current SPA entry point, shows all script load order and existing modules
- `apps/js/state.js` — Current state management pattern (AppState pub/sub) — migrate to Redux/Zustand
- `apps/js/router.js` — Current hash-based routing — migrate to Next.js App Router
- `apps/js/api.js` — Current mock API client — replace with real REST clients
- `apps/js/i18n.js` — Current i18n system — migrate to next-intl (keep dot-notation keys)
- `apps/js/utils/rbac.js` — Current RBAC implementation — migrate to Keycloak JWT claims
- `apps/locales/en.json` — English translations (carry forward keys)
- `apps/locales/th.json` — Thai translations (carry forward keys)
- `apps/js/pages/*.js` — All 29 existing page modules (reference for feature parity)
- `apps/js/components/*.js` — All reusable UI components (reference for migration)
- `apps/js/data/mock-*.js` — All mock data files (reference for database seeding)
- `apps/js/workflow/engine.js` — Workflow engine logic (migrate to backend)
- `apps/js/workflow/rules.js` — Approval rules (migrate to backend)
- `tests/scripts/*.js` — Existing test patterns
- `package.json` — Current project configuration

### New Files (To Be Created)

#### Frontend (Next.js 16)
- `src/frontend/package.json` — Next.js 16 project config
- `src/frontend/next.config.ts` — Next.js configuration
- `src/frontend/tailwind.config.ts` — Tailwind CSS 4.1 config with CG brand colors
- `src/frontend/src/app/layout.tsx` — Root layout with i18n, theme, auth provider
- `src/frontend/src/app/page.tsx` — Home page (dashboard)
- `src/frontend/src/app/[locale]/` — Locale-based routing (th/en)
- `src/frontend/src/app/[locale]/profile/` — Profile pages (6 tabs)
- `src/frontend/src/app/[locale]/workflows/` — Workflow pages
- `src/frontend/src/app/[locale]/leave/` — Leave request pages
- `src/frontend/src/app/[locale]/payroll/` — Payroll pages
- `src/frontend/src/app/[locale]/smart-claims/` — Smart Claims (new)
- `src/frontend/src/app/[locale]/quick-approve/` — Quick Approve Hub (new)
- `src/frontend/src/app/[locale]/manager/` — Manager Dashboard (enhanced)
- `src/frontend/src/components/ui/` — shadcn/ui components
- `src/frontend/src/components/shared/` — Shared components (header, sidebar, modals)
- `src/frontend/src/lib/auth.ts` — Keycloak auth utilities
- `src/frontend/src/lib/api.ts` — API client (fetch wrapper)
- `src/frontend/src/lib/rbac.ts` — RBAC utilities
- `src/frontend/src/lib/i18n.ts` — next-intl configuration
- `src/frontend/src/stores/` — Zustand stores for client state
- `src/frontend/src/types/` — TypeScript type definitions
- `src/frontend/messages/en.json` — English translations (migrated from apps/locales)
- `src/frontend/messages/th.json` — Thai translations (migrated from apps/locales)
- `src/frontend/__tests__/` — Jest/Vitest unit tests

#### Backend Microservices (NestJS 11)
- `src/services/employee-center/` — MS-01: Profile, Personal Info
- `src/services/payroll-management/` — MS-02: Payroll Setup, Processing, Compensation, Gov Reports
- `src/services/benefits-management/` — MS-03: Benefits, Smart Claims
- `src/services/time-attendance/` — MS-04: Time Management, Location, Overtime
- `src/services/leave-management/` — MS-05: Leave Requests
- `src/services/document-service/` — MS-06: Payslip PDFs, Certificates
- `src/services/workflow-engine/` — MS-07: Workflows, Quick Approve
- `src/services/performance-talent/` — MS-08: Performance, Scorecard, Talent, Succession, IDP
- `src/services/lnd-service/` — MS-09: Learning, Training Records
- `src/services/recruitment-onboarding/` — MS-10: Recruitment, Screening, Onboarding, Resignation
- `src/services/organization-service/` — MS-11: Positions, Transfers, Org Chart
- `src/services/manager-self-service/` — MS-12: Manager Dashboard (API aggregation)
- `src/services/settings-service/` — MS-13: System Configuration
- `src/services/shared/` — Shared NestJS libraries (auth guard, pagination, logging, events)

Each service follows structure:
```
src/services/<name>/
├── package.json
├── tsconfig.json
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── main.ts                # NestJS bootstrap
│   ├── app.module.ts          # Root module
│   ├── <domain>/
│   │   ├── <domain>.controller.ts
│   │   ├── <domain>.service.ts
│   │   ├── <domain>.module.ts
│   │   ├── dto/               # Request/Response DTOs
│   │   └── entities/          # Prisma entities
│   └── common/                # Guards, filters, interceptors
└── test/
    ├── unit/                  # Unit tests
    ├── integration/           # Integration tests
    └── e2e/                   # E2E tests
```

#### Infrastructure
- `docker-compose.yml` — Local dev: PostgreSQL, Redis, Keycloak, Kafka
- `src/infra/keycloak/` — Keycloak realm config, roles, clients
- `src/infra/seed/` — Database seed scripts (from mock data)

#### Root
- `README.md` — Rewritten project documentation

## Implementation Phases

### Phase 1: Foundation (Tasks 1-8)
Set up the monorepo structure, development infrastructure (Docker Compose with PostgreSQL, Redis, Keycloak), Next.js 16 frontend scaffold with Tailwind/shadcn, NestJS shared library, and the first two microservices: Employee Center (MS-01) and Organization Service (MS-11). Implement authentication with Keycloak and RBAC framework. All with TDD.

### Phase 2: Core HR (Tasks 9-16)
Implement Leave Management (MS-05), Payroll Management (MS-02), Document Service (MS-06), Workflow Engine (MS-07), and Settings Service (MS-13). Migrate existing workflow rules and approval logic from the prototype. Build corresponding frontend pages.

### Phase 3: Talent & Recruitment (Tasks 17-22)
Implement Performance & Talent (MS-08), L&D Service (MS-09), Recruitment & Onboarding (MS-10), Time & Attendance (MS-04), and Benefits Management (MS-03). Migrate all remaining prototype modules.

### Phase 4: Advanced Features (Tasks 23-28)
Implement the 4 new features: Smart Claims with AI OCR (F6), Enhanced Manager Dashboard (F7), Quick Approve Hub (F8), and Real-time Policy Validation (F9). These are the differentiators from the prototype.

### Phase 5: Integration & Polish (Tasks 29-33)
Data migration scripts, full E2E test suite, accessibility audit, performance optimization, and README.md rewrite.

## Team Orchestration

- You operate as the team lead and orchestrate the team to execute the plan.
- You're responsible for deploying the right team members with the right context to execute the plan.
- IMPORTANT: You NEVER operate directly on the codebase. You use `Task` and `Task*` tools to deploy team members to the building, validating, testing, deploying, and other tasks.
  - This is critical. Your job is to act as a high level director of the team, not a builder.
  - Your role is to validate all work is going well and make sure the team is on track to complete the plan.
  - You'll orchestrate this by using the Task* Tools to manage coordination between the team members.
  - Communication is paramount. You'll use the Task* Tools to communicate with the team members and ensure they're on track to complete the plan.
- Take note of the session id of each team member. This is how you'll reference them.

### Team Members

- Builder
  - Name: builder-infra
  - Role: Infrastructure setup — Docker Compose, project scaffolding, shared libraries, Keycloak config
  - Agent Type: builder
  - Resume: true

- Builder
  - Name: builder-backend
  - Role: NestJS microservice implementation — controllers, services, Prisma schemas, DTOs, unit tests
  - Agent Type: builder
  - Resume: true

- Builder
  - Name: builder-frontend
  - Role: Next.js 16 frontend implementation — pages, components, API integration, i18n, accessibility
  - Agent Type: builder
  - Resume: true

- Builder
  - Name: builder-tests
  - Role: Test-first development — writes tests BEFORE implementation, E2E tests with Playwright, integration tests
  - Agent Type: builder
  - Resume: true

- Validator
  - Name: validator-tdd
  - Role: Validates each task completion — runs all tests, checks acceptance criteria, blocks next task if validation fails
  - Agent Type: validator
  - Resume: false

## Step by Step Tasks

- IMPORTANT: Execute every step in order, top to bottom. Each task maps directly to a `TaskCreate` call.
- Before you start, run `TaskCreate` to create the initial task list that all team members can see and execute.
- **TDD RULE**: For every implementation task, builder-tests writes failing tests FIRST, then the implementation builder makes them pass, then validator-tdd confirms all tests pass before proceeding.

---

### 1. Setup Monorepo & Development Infrastructure
- **Task ID**: setup-infra
- **Depends On**: none
- **Assigned To**: builder-infra
- **Agent Type**: builder
- **Parallel**: false
- Create monorepo directory structure: `src/frontend/`, `src/services/`, `src/infra/`
- Create `docker-compose.yml` with PostgreSQL 17, Redis 7.4, Keycloak 26 containers
- Configure Keycloak realm `central-hrms` with 4 roles: `employee`, `manager`, `hr_admin`, `hr_manager`
- Create `src/services/shared/` NestJS library with common guards, filters, interceptors, pagination utility
- Install and configure root-level tooling: TypeScript, ESLint, Prettier
- Write a root `Makefile` or `package.json` scripts for `dev`, `test`, `build`, `seed` commands
- **Acceptance**: `docker compose up -d` starts all services; Keycloak admin console accessible at localhost:8080

### 2. Validate Infrastructure Setup
- **Task ID**: validate-infra
- **Depends On**: setup-infra
- **Assigned To**: validator-tdd
- **Agent Type**: validator
- **Parallel**: false
- Verify `docker-compose.yml` contains PostgreSQL, Redis, Keycloak with correct versions
- Verify Keycloak realm config has 4 roles
- Verify shared library has auth guard, pagination, error filter
- Run `docker compose config` to validate compose file syntax
- **Acceptance**: All infrastructure files exist and are syntactically valid

### 3. Scaffold Next.js 16 Frontend
- **Task ID**: scaffold-frontend
- **Depends On**: validate-infra
- **Assigned To**: builder-frontend
- **Agent Type**: builder
- **Parallel**: false
- Initialize Next.js 16 project in `src/frontend/` with App Router, TypeScript
- Configure Tailwind CSS 4.1 with CG brand colors (`cg-red: #C8102E`, `cg-dark: #333333`, `cg-light: #F5F5F5`, `cg-success: #28A745`, `cg-warning: #FFC107`, `cg-error: #DC3545`, `cg-info: #17A2B8`)
- Install and configure shadcn/ui components
- Set up next-intl for Thai/English i18n — migrate existing keys from `apps/locales/en.json` and `apps/locales/th.json`
- Create root layout with: auth provider (Keycloak), i18n provider, Tailwind theme
- Create shared components: Header (with CG logo, nav, language toggle, notification bell, avatar), Sidebar (for desktop), MobileMenu
- Implement RBAC utility in `src/frontend/src/lib/rbac.ts` matching existing role hierarchy
- Set up Vitest for unit testing
- **Acceptance**: `npm run dev` starts frontend; homepage renders with header, i18n toggle works, brand colors applied

### 4. Write Tests for Employee Center Backend (MS-01)
- **Task ID**: tests-employee-center
- **Depends On**: validate-infra
- **Assigned To**: builder-tests
- **Agent Type**: builder
- **Parallel**: true (can run alongside scaffold-frontend)
- Write unit tests for Employee Center service covering:
  - `GET /api/v1/employees/:id` — returns employee profile with personal info, employment info, contact info
  - `PATCH /api/v1/employees/:id/personal-info` — updates personal info fields (HR only)
  - `PATCH /api/v1/employees/:id/contact-info` — updates contact info (Employee self-service)
  - `GET /api/v1/employees/:id/employment` — returns employment details, org info, job info
  - `POST /api/v1/employees/:id/emergency-contacts` — CRUD emergency contacts
  - `POST /api/v1/employees/:id/dependents` — CRUD dependents
  - `GET /api/v1/employees/:id/work-permits` — work permit info (HR only)
- Write integration tests for Prisma queries against test database
- Tests must follow data model from PRD Section 4.1 and 4.2
- All tests should FAIL at this point (TDD red phase)
- **Acceptance**: Test files exist in `src/services/employee-center/test/`, all tests fail with "not implemented" errors

### 5. Implement Employee Center Backend (MS-01)
- **Task ID**: impl-employee-center
- **Depends On**: tests-employee-center
- **Assigned To**: builder-backend
- **Agent Type**: builder
- **Parallel**: false
- Create NestJS project in `src/services/employee-center/`
- Define Prisma schema for `employee_db` with tables: `employees`, `personal_info`, `contact_info`, `addresses`, `emergency_contacts`, `dependents`, `work_permits`
- Implement controllers, services, DTOs per PRD Section 8.3 (Employee Profile JSON payload)
- Implement RBAC guards using shared auth library — Employee sees own data, Manager sees team, HR Admin/Manager sees all
- Implement PII masking for `national_id` (use PRD Section 13.4 Data Access Levels)
- Implement history tracking for all changes (audit log)
- Seed database with data from `apps/js/data/mock-employee.js`
- Make all tests from Task 4 pass (TDD green phase)
- **Acceptance**: All unit and integration tests pass; API returns correct employee data with proper RBAC

### 6. Validate Employee Center Backend
- **Task ID**: validate-employee-center
- **Depends On**: impl-employee-center, scaffold-frontend
- **Assigned To**: validator-tdd
- **Agent Type**: validator
- **Parallel**: false
- Run all Employee Center tests: `cd src/services/employee-center && npm test`
- Verify Prisma schema matches PRD Section 4.1 and 4.2 data fields
- Verify RBAC is enforced (Employee cannot access other employees, Manager sees team only)
- Verify PII masking on national_id and bank accounts
- Verify API response format matches PRD Section 8.3
- **Acceptance**: 100% test pass rate, schema matches PRD, RBAC enforced correctly

### 7. Implement Employee Center Frontend Pages
- **Task ID**: impl-employee-frontend
- **Depends On**: validate-employee-center
- **Assigned To**: builder-frontend
- **Agent Type**: builder
- **Parallel**: false
- Create profile page with 6 tabs matching PRD Section 9.4 wireframe: Personal Info, Employment, Compensation, Benefits, Profile Details, Scorecard
- Implement Personal Info tab with view/edit modes (PRD F2.1-F2.7)
- Implement Employment tab with read-only display (PRD F3.1-F3.4)
- Implement interactive Org Chart component (migrate from `apps/js/components/org-chart.js`)
- Implement Profile Header component with photo, name, title, ID, location (PRD F1.1-F1.5)
- Connect to Employee Center API with proper auth headers
- Implement Thai/English date formatting (Buddhist Era for Thai)
- Implement responsive design: Desktop >= 1280px, Tablet 768-1279px, Mobile < 768px
- **Acceptance**: Profile page renders all tabs, data loads from API, i18n works, responsive layout

### 8. Write Tests & Implement Organization Service (MS-11)
- **Task ID**: impl-org-service
- **Depends On**: validate-employee-center
- **Assigned To**: builder-backend
- **Agent Type**: builder
- **Parallel**: true (can run alongside impl-employee-frontend)
- Write tests FIRST for: position management CRUD, transfer requests, org chart tree query
- Create NestJS project in `src/services/organization-service/`
- Define Prisma schema for `org_db`: `positions`, `departments`, `transfers`, `org_nodes`
- Implement APIs: `GET /api/v1/org/chart/:employeeId`, `GET /api/v1/org/positions`, `POST /api/v1/org/transfers`
- Seed with data from `apps/js/data/mock-org-structure.js` and `apps/js/data/mock-positions.js`
- Make all tests pass
- **Acceptance**: All org service tests pass, org chart API returns tree structure

### 9. Validate Phase 1 Complete
- **Task ID**: validate-phase1
- **Depends On**: impl-employee-frontend, impl-org-service
- **Assigned To**: validator-tdd
- **Agent Type**: validator
- **Parallel**: false
- Run ALL tests across all services: `npm run test:all` from root
- Verify Employee Center + Organization Service APIs work end-to-end
- Verify frontend Profile page loads data from backend APIs
- Verify RBAC works for all 4 roles
- Verify i18n toggle between Thai and English
- Verify org chart renders correctly
- **Acceptance**: Phase 1 milestone met — "100 employees can use Employee Profile on Next-Gen System"

---

### 10. Write Tests & Implement Leave Management (MS-05)
- **Task ID**: impl-leave-management
- **Depends On**: validate-phase1
- **Assigned To**: builder-backend
- **Agent Type**: builder
- **Parallel**: false
- Write tests FIRST for: leave request CRUD, balance calculation, calendar conflict detection, 8 leave types
- Create NestJS project in `src/services/leave-management/`
- Prisma schema for `leave_db`: `leave_requests`, `leave_balances`, `leave_types`, `leave_calendar`
- Implement PRD Section 7.4 Leave Request Workflow: balance check, manager approval (<=5 days) or manager+HR (>5 days)
- Implement API per PRD Section 8.3 (Leave Request payload with policyCheck)
- Seed with mock data
- Make all tests pass
- **Acceptance**: Leave request tests pass, workflow routing works, balance deduction correct

### 11. Implement Leave Management Frontend
- **Task ID**: impl-leave-frontend
- **Depends On**: impl-leave-management
- **Assigned To**: builder-frontend
- **Agent Type**: builder
- **Parallel**: false
- Create leave request page with form: leave type, date range, half-day option, reason, substitute, attachments
- Implement leave calendar component (migrate from `apps/js/components/leave-calendar.js`)
- Show real-time balance check inline (PRD F9.1 — policy validation before submit)
- Show leave history with status tracking
- Connect to Leave Management API
- **Acceptance**: Leave request form works, balance shown, calendar displays, responsive

### 12. Write Tests & Implement Workflow Engine (MS-07)
- **Task ID**: impl-workflow-engine
- **Depends On**: validate-phase1
- **Assigned To**: builder-backend
- **Agent Type**: builder
- **Parallel**: true (can run alongside leave management)
- Write tests FIRST for: workflow creation, multi-level approval routing, delegation, bulk approval
- Create NestJS project in `src/services/workflow-engine/`
- Prisma schema for `workflow_db`: `workflows`, `workflow_steps`, `approval_actions`, `delegations`
- Implement PRD Section 7.1 approval levels table (Contact Info auto-approve, Leave needs manager, Transfer needs 3 levels, etc.)
- Implement audit trail for every approval action (PRD F5.7)
- Migrate logic from `apps/js/workflow/engine.js` and `apps/js/workflow/rules.js`
- Make all tests pass
- **Acceptance**: Workflow routing tests pass for all 10 change types in PRD Section 7.1

### 13. Write Tests & Implement Payroll Management (MS-02)
- **Task ID**: impl-payroll
- **Depends On**: validate-phase1
- **Assigned To**: builder-backend
- **Agent Type**: builder
- **Parallel**: true (can run alongside workflow engine)
- Write tests FIRST for: payroll setup, 4-stage processing (PRD Section 7.5), compensation display, gov reports
- Create NestJS project in `src/services/payroll-management/`
- Prisma schema for `payroll_db`: `payroll_runs`, `payslips`, `compensation`, `tax_deductions`, `government_reports`
- Implement payroll processing workflow: Period Selection → Calculation → Review → Approval
- Implement Thai PIT calculation, SSO deduction, provident fund
- Encrypt salary fields with AES-256 (PRD Section 10.2)
- Seed with data from `apps/js/data/mock-payroll.js`
- Make all tests pass
- **Acceptance**: Payroll processing tests pass, salary encryption works, PIT calculation correct

### 14. Implement Document Service (MS-06) & Settings Service (MS-13)
- **Task ID**: impl-document-settings
- **Depends On**: impl-payroll
- **Assigned To**: builder-backend
- **Agent Type**: builder
- **Parallel**: false
- Write tests FIRST for: PDF payslip generation, tax document download, system settings CRUD
- Create Document Service: PDF generation for payslips, tax forms (50 Tawi), certificates
- Create Settings Service: company info, leave policies, payroll settings, notification preferences
- Prisma schemas for both services
- Implement audit log for document downloads (PRD F4.3)
- Seed settings from `apps/js/data/mock-settings.js`
- Make all tests pass
- **Acceptance**: PDF generation works, settings CRUD works, all tests pass

### 15. Implement Phase 2 Frontend Pages
- **Task ID**: impl-phase2-frontend
- **Depends On**: impl-leave-frontend, impl-workflow-engine, impl-payroll, impl-document-settings
- **Assigned To**: builder-frontend
- **Agent Type**: builder
- **Parallel**: false
- Create Workflows page: pending requests, sent back, approved, reassign tabs (PRD Section 9.6)
- Create Payroll Setup page (HR Admin only)
- Create Payroll Processing page with 4-stage wizard (HR Admin only)
- Create Compensation tab in profile: payment info (masked bank account), payslip download, tax documents
- Create Government Reports page (HR Admin only)
- Create Settings page with tabs based on role (PRD RBAC Matrix)
- Connect all pages to respective backend APIs
- **Acceptance**: All Phase 2 frontend pages render, data flows from APIs, RBAC enforced per page

### 16. Validate Phase 2 Complete
- **Task ID**: validate-phase2
- **Depends On**: impl-phase2-frontend
- **Assigned To**: validator-tdd
- **Agent Type**: validator
- **Parallel**: false
- Run ALL tests across all services
- Verify leave request → workflow → approval → balance update end-to-end
- Verify payroll processing 4-stage workflow
- Verify payslip PDF generation
- Verify government reports generation
- Verify settings CRUD with RBAC
- **Acceptance**: Phase 2 milestone met — "HR can process first payroll run on Next-Gen System"

---

### 17. Write Tests & Implement Performance & Talent (MS-08)
- **Task ID**: impl-performance-talent
- **Depends On**: validate-phase2
- **Assigned To**: builder-backend
- **Agent Type**: builder
- **Parallel**: false
- Write tests FIRST for: goal setting, performance evaluation, scorecard, talent pool, succession planning, IDP
- Create NestJS project in `src/services/performance-talent/`
- Prisma schema for `talent_db`: `goals`, `evaluations`, `scorecards`, `competencies`, `talent_pool`, `succession_plans`, `idp_plans`
- Implement CG Competency model (6 competencies from PRD Section 4.6)
- Implement 9-Box Grid (Performance-Potential Matrix)
- Implement IDP creation and sign-off workflow
- Seed with mock data
- Make all tests pass
- **Acceptance**: All performance/talent tests pass, 9-Box grid calculation works

### 18. Write Tests & Implement L&D Service (MS-09) & Recruitment (MS-10)
- **Task ID**: impl-lnd-recruitment
- **Depends On**: validate-phase2
- **Assigned To**: builder-backend
- **Agent Type**: builder
- **Parallel**: true (can run alongside performance-talent)
- Write tests FIRST for: course catalog, enrollment, training history, certificates; job posting, candidate screening, onboarding checklist, resignation workflow
- Create L&D Service: `lnd_db` with `courses`, `enrollments`, `training_records`, `certificates`
- Create Recruitment & Onboarding Service: `hiring_db` with `job_postings`, `candidates`, `screenings`, `onboarding_tasks`, `resignations`
- Implement Kirkpatrick evaluation model (4 levels)
- Implement resignation workflow: submit → manager approve → HR clearance → settlement
- Seed from `apps/js/data/mock-training.js`, `apps/js/data/mock-recruitment.js`, etc.
- Make all tests pass
- **Acceptance**: All L&D and recruitment tests pass

### 19. Write Tests & Implement Time & Attendance (MS-04) & Benefits (MS-03)
- **Task ID**: impl-time-benefits
- **Depends On**: validate-phase2
- **Assigned To**: builder-backend
- **Agent Type**: builder
- **Parallel**: true (can run alongside performance-talent)
- Write tests FIRST for: shift management, attendance recording, OT requests; benefits enrollment, dependent coverage
- Create Time & Attendance Service: `time_db` with `shifts`, `attendance_records`, `overtime_requests`, `locations`
- Create Benefits Management Service: `benefits_db` with `benefit_plans`, `enrollments`, `dependents_coverage`
- Implement OT approval workflow (manager approval)
- Seed from `apps/js/data/mock-attendance.js`, `apps/js/data/mock-overtime.js`, `apps/js/data/mock-locations.js`
- Make all tests pass
- **Acceptance**: All time/attendance and benefits tests pass, OT workflow works

### 20. Implement Phase 3 Frontend Pages
- **Task ID**: impl-phase3-frontend
- **Depends On**: impl-performance-talent, impl-lnd-recruitment, impl-time-benefits
- **Assigned To**: builder-frontend
- **Agent Type**: builder
- **Parallel**: false
- Create Performance page: goal setting, evaluation form, KPI display
- Create Scorecard tab: CG Competency radar chart, assessment history, 9-Box grid
- Create Talent Management page (HR Admin only): talent pool, Hi-Po identification
- Create Succession Planning page: nomination, pipeline view
- Create IDP page: development plan creation, sign-off
- Create Learning page: course catalog, enrollment, history
- Create Training Records page: records list, certificates
- Create Recruitment page: job board, application form
- Create Candidate Screening page (HR Admin only)
- Create Onboarding page (HR Admin only)
- Create Resignation page: submit form, clearance checklist
- Create Time Management page: shift calendar, attendance log
- Create Overtime page: request form, history
- Create Location Management page: location hierarchy, employee assignment
- Create Benefits tab in profile: active enrollments, dependent coverage
- **Acceptance**: All 29 modules have frontend pages, connected to APIs

### 21. Validate Phase 3 Complete
- **Task ID**: validate-phase3
- **Depends On**: impl-phase3-frontend
- **Assigned To**: validator-tdd
- **Agent Type**: validator
- **Parallel**: false
- Run ALL tests across ALL 11 microservices
- Verify all 29 modules have working frontend pages
- Verify cross-service workflows (e.g., leave request → workflow → notification)
- Verify RBAC matrix matches PRD Section 13.2 for all 29 modules
- **Acceptance**: Phase 3 milestone — "Full HR lifecycle works across 29 modules"

---

### 22. Write Tests for Smart Claims (F6)
- **Task ID**: tests-smart-claims
- **Depends On**: validate-phase3
- **Assigned To**: builder-tests
- **Agent Type**: builder
- **Parallel**: false
- Write tests for Smart Claims workflow per PRD Section 7.2:
  - Receipt upload (JPG, PNG, PDF) with simulated OCR response
  - OCR result display with confidence score
  - Policy validation: max_amount per claim, monthly cap, required documents
  - Claim status tracking: Draft → Submitted → Processing → Approved/Rejected
  - Auto-approve threshold routing
  - Claim history and YTD spending report
- Write tests for `ClaimRequest` and `PolicyRule` entities (PRD Section 4.7)
- Write tests for `OCRResult` entity
- All tests should FAIL (TDD red phase)
- **Acceptance**: Smart Claims test files exist, all tests fail

### 23. Implement Smart Claims Backend & Frontend
- **Task ID**: impl-smart-claims
- **Depends On**: tests-smart-claims
- **Assigned To**: builder-backend
- **Agent Type**: builder
- **Parallel**: false
- Add Smart Claims to Benefits Management Service (MS-03)
- Prisma schema additions: `claim_requests`, `policy_rules`, `ocr_results` per PRD Section 4.7
- Implement simulated OCR processing (< 3 seconds) with configurable confidence threshold (0.8)
- Implement real-time policy check: validate against `policy_rules` table
- Implement claim approval routing: amount <= threshold → auto-approve, else → manager → finance
- Make all Smart Claims tests pass
- **Acceptance**: All Smart Claims tests pass, OCR simulation works, policy validation works

### 24. Implement Smart Claims Frontend
- **Task ID**: impl-smart-claims-frontend
- **Depends On**: impl-smart-claims
- **Assigned To**: builder-frontend
- **Agent Type**: builder
- **Parallel**: false
- Create Smart Claims page matching PRD Section 9.2 wireframe:
  - Step 1: Receipt upload (drag-drop, file select) — JPG, PNG, PDF up to 10MB
  - Step 2: OCR result display with confidence score badge (green >= 0.8, yellow < 0.8)
  - Step 3: Claim details form (type dropdown, amount input with THB formatting)
  - Real-time policy check panel (checkmarks for each rule)
  - Save Draft / Submit Claim buttons
- Create claim history page with status timeline
- Create YTD spending dashboard per category
- **Acceptance**: Smart Claims form works end-to-end, policy check displays inline, responsive

### 25. Write Tests & Implement Quick Approve Hub (F8)
- **Task ID**: impl-quick-approve
- **Depends On**: validate-phase3
- **Assigned To**: builder-backend
- **Agent Type**: builder
- **Parallel**: true (can run alongside Smart Claims)
- Write tests FIRST for: pending requests aggregation, bulk select (max 50), bulk approve/reject, filter by type/urgency/date
- Add Quick Approve endpoints to Workflow Engine (MS-07):
  - `GET /api/v1/workflows/pending?type=&urgency=&dateFrom=&dateTo=` — aggregated pending list
  - `POST /api/v1/workflows/bulk-approve` — batch approve with optional reason
  - `POST /api/v1/workflows/bulk-reject` — batch reject with required reason
- Implement slide-over preview for request detail (PRD F8.4)
- Implement delegation: temporary approval assignment to another employee (PRD F8.6)
- Make all tests pass
- **Acceptance**: Quick Approve tests pass, bulk operations work for up to 50 items

### 26. Implement Quick Approve & Manager Dashboard Frontend
- **Task ID**: impl-quick-approve-manager-frontend
- **Depends On**: impl-quick-approve, impl-smart-claims-frontend
- **Assigned To**: builder-frontend
- **Agent Type**: builder
- **Parallel**: false
- Create Quick Approve Hub page matching PRD Section 9.3 wireframe:
  - Filter bar: type, urgency, date range, search
  - Select all / filtered checkbox
  - Bulk Approve / Bulk Reject buttons
  - Request list with urgency badges (red=urgent, yellow=normal, green=low)
  - Slide-over preview panel
  - Confirmation modal with item count
- Create Enhanced Manager Dashboard matching PRD Section 9.1 wireframe:
  - Urgent alerts banner
  - Team summary cards: Members, Present, On Leave, Pending, Probation
  - Pending approvals panel with quick action buttons
  - Team members list with status
  - Mini org chart for direct reports
  - Team calendar (shift + leave overlay)
- **Acceptance**: Quick Approve and Manager Dashboard render correctly, bulk actions work, responsive

### 27. Implement Real-time Policy Validation (F9)
- **Task ID**: impl-policy-validation
- **Depends On**: impl-quick-approve
- **Assigned To**: builder-backend
- **Agent Type**: builder
- **Parallel**: false
- Write tests FIRST for: pre-submit policy checking (leave balance, OT limit, claim cap), inline warnings, hard rule blocking, soft rule with justification
- Add policy validation endpoints to relevant services:
  - `POST /api/v1/leave/validate` — check balance, calendar conflict, min notice
  - `POST /api/v1/overtime/validate` — check OT limit, approval requirements
  - `POST /api/v1/benefits/claims/validate` — check amount cap, monthly spending, required documents
- Implement `PolicyRule` configuration CRUD (HR Manager only) per PRD Section 4.7
- Implement hard rules (block submit) vs soft rules (warn + require justification)
- Make all tests pass
- **Acceptance**: Policy validation tests pass, hard/soft rule distinction works

### 28. Validate Phase 4 Complete
- **Task ID**: validate-phase4
- **Depends On**: impl-quick-approve-manager-frontend, impl-policy-validation
- **Assigned To**: validator-tdd
- **Agent Type**: validator
- **Parallel**: false
- Run ALL tests across ALL services including new features
- Verify Smart Claims end-to-end: upload → OCR → policy check → submit → approve
- Verify Quick Approve: filter → select → bulk approve → notifications
- Verify Manager Dashboard: metrics display, quick actions, team calendar
- Verify Policy Validation: inline warnings on leave/OT/claims forms
- **Acceptance**: Phase 4 milestone — "All new features (F6-F9) working"

---

### 29. Database Seed & Migration Scripts
- **Task ID**: impl-seed-migration
- **Depends On**: validate-phase4
- **Assigned To**: builder-infra
- **Agent Type**: builder
- **Parallel**: false
- Create comprehensive seed scripts in `src/infra/seed/` that migrate all mock data from `apps/js/data/mock-*.js` to PostgreSQL
- Create Prisma migration files for all 13 microservice databases
- Create data validation scripts to verify migration accuracy
- Document the migration process
- **Acceptance**: All mock data seeded correctly, migration scripts idempotent

### 30. Full E2E Test Suite
- **Task ID**: impl-e2e-tests
- **Depends On**: validate-phase4
- **Assigned To**: builder-tests
- **Agent Type**: builder
- **Parallel**: true (can run alongside seed migration)
- Write Playwright E2E tests covering critical user journeys:
  - Employee: login → view profile → update contact info → submit leave request → view payslip
  - Manager: login → view dashboard → approve leave → bulk approve in Quick Approve Hub
  - HR Admin: login → process payroll → generate reports → manage settings
  - Smart Claims: upload receipt → verify OCR → submit claim → manager approves
- Test all 4 roles against RBAC matrix
- Test i18n toggle (Thai/English) across all pages
- Test responsive design (desktop/tablet/mobile viewports)
- Test accessibility (keyboard navigation, ARIA labels, color contrast)
- **Acceptance**: All E2E tests pass across all roles and viewports

### 31. Accessibility & Performance Audit
- **Task ID**: audit-a11y-perf
- **Depends On**: impl-e2e-tests, impl-seed-migration
- **Assigned To**: validator-tdd
- **Agent Type**: validator
- **Parallel**: false
- Run Lighthouse audit on all main pages — target FCP < 1.5s, TTI < 3s
- Verify WCAG 2.1 AA compliance: keyboard nav, screen reader, contrast ratio >= 4.5:1, touch target >= 44x44px
- Verify all interactive elements have ARIA labels
- Verify skip-to-content link works
- Report any failures with specific remediation recommendations
- **Acceptance**: Lighthouse performance score >= 90, accessibility score >= 90

### 32. Rewrite README.md
- **Task ID**: rewrite-readme
- **Depends On**: audit-a11y-perf
- **Assigned To**: builder-frontend
- **Agent Type**: builder
- **Parallel**: false
- Rewrite `README.md` at project root documenting:
  - Project overview: Central Retail Next-Gen HRMS
  - Architecture diagram (ASCII): Client Tier → API Gateway → Auth → Microservices → Data Tier
  - Tech stack table: Next.js 16, NestJS 11, PostgreSQL 17, Redis, Keycloak, Prisma, Tailwind CSS, shadcn/ui
  - Getting started: prerequisites, `docker compose up`, `npm run dev`, seed commands
  - Project structure: monorepo layout with frontend/ and services/
  - Module inventory: 29+ modules mapped to microservices
  - API documentation: base URL, auth headers, conventions
  - Testing: unit, integration, E2E commands
  - i18n: how to add translations
  - RBAC: role hierarchy and permissions
  - Contributing guidelines
  - License
- **Acceptance**: README.md is comprehensive, accurate, and follows standard open-source conventions

### 33. Final Validation — Full System
- **Task ID**: validate-all
- **Depends On**: rewrite-readme
- **Assigned To**: validator-tdd
- **Agent Type**: validator
- **Parallel**: false
- Run complete test suite: `npm run test:all` from root (unit + integration + E2E)
- Verify all 13 microservices start without errors
- Verify frontend builds without errors: `cd src/frontend && npm run build`
- Verify README.md exists and has all required sections
- Verify all 29+ modules are accessible in the frontend
- Verify RBAC matrix matches PRD Section 13.2 completely
- Verify i18n works for all pages in both Thai and English
- Run final Lighthouse audit
- **Acceptance**: ALL acceptance criteria met, system is complete and production-ready

## Acceptance Criteria
1. All 13 NestJS microservices implemented with Prisma schemas matching PRD data model
2. All 29+ modules migrated from Vanilla JS prototype to Next.js 16 frontend
3. 4 new features implemented: Smart Claims (F6), Manager Dashboard (F7), Quick Approve (F8), Policy Validation (F9)
4. Authentication via Keycloak with OAuth2 and 4 RBAC roles enforced correctly
5. Full TDD: every implementation task has tests written BEFORE code, >80% coverage
6. Thai/English i18n working across all pages with Buddhist Era date formatting
7. WCAG 2.1 AA accessibility compliance
8. Responsive design: desktop, tablet, mobile
9. All E2E tests passing for critical user journeys across all roles
10. PII masking (national ID, bank accounts) and salary encryption (AES-256)
11. Workflow engine supporting all 10 approval types per PRD Section 7.1
12. README.md rewritten with comprehensive project documentation
13. Docker Compose local development environment works with one command

## Validation Commands
Execute these commands to validate the task is complete:

- `docker compose config` — Validate Docker Compose syntax
- `docker compose up -d && docker compose ps` — Verify all containers start
- `cd src/services/employee-center && npm test` — Employee Center unit tests
- `cd src/services/leave-management && npm test` — Leave Management unit tests
- `cd src/services/workflow-engine && npm test` — Workflow Engine unit tests
- `cd src/services/payroll-management && npm test` — Payroll Management unit tests
- `cd src/services/benefits-management && npm test` — Benefits Management unit tests (includes Smart Claims)
- `cd src/services/performance-talent && npm test` — Performance & Talent unit tests
- `cd src/services/lnd-service && npm test` — L&D Service unit tests
- `cd src/services/recruitment-onboarding && npm test` — Recruitment unit tests
- `cd src/services/time-attendance && npm test` — Time & Attendance unit tests
- `cd src/services/organization-service && npm test` — Organization Service unit tests
- `cd src/services/document-service && npm test` — Document Service unit tests
- `cd src/services/settings-service && npm test` — Settings Service unit tests
- `cd src/services/manager-self-service && npm test` — Manager Self-Service unit tests
- `cd src/frontend && npm test` — Frontend unit tests
- `cd src/frontend && npm run build` — Frontend production build
- `npx playwright test` — E2E test suite
- `npx lighthouse http://localhost:3000 --output json` — Lighthouse audit

## Notes
- **Node.js version**: Require Node.js >= 20.x for Next.js 16 compatibility
- **Package manager**: Use `npm` (consistent with existing `package.json`)
- **Database**: Each microservice gets its own PostgreSQL database (schema-per-service pattern)
- **OCR simulation**: Smart Claims OCR is simulated for this implementation (no real AI model). Use a mock OCR service that returns pre-configured results with configurable confidence scores
- **Keycloak**: Use Docker Keycloak with imported realm config. No external IdP integration needed for initial implementation
- **Kafka**: For initial implementation, use direct HTTP calls between services. Kafka event streaming is a future optimization
- **File storage**: Use local filesystem (`src/infra/storage/`) instead of S3/MinIO for development
- **Existing prototype**: The `apps/` directory (Vanilla JS prototype) remains untouched as reference. New code goes in `src/`
- **i18n keys**: Carry forward existing dot-notation keys from `apps/locales/` to maintain compatibility
- **Thai compliance**: PIT calculation uses 2026 Thai tax brackets. Buddhist Era dates use BE = CE + 543
