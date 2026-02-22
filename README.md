# Central Retail Next-Gen HRMS

A comprehensive, enterprise-grade Human Resource Management System built for Central Group. Monorepo architecture with 14 NestJS microservices + 1 shared library, a vanilla JS SPA frontend, and full bilingual Thai/English support.

## Architecture Overview

```
                                    ┌─────────────────────────────┐
                                    │     Frontend SPA (apps/)    │
                                    │  Vanilla JS + Tailwind CSS  │
                                    │   34 pages  |  17 components│
                                    └─────────────┬───────────────┘
                                                  │ REST API
                          ┌───────────────────────┼───────────────────────┐
                          │                       │                       │
              ┌───────────┴──────┐    ┌──────────┴──────────┐   ┌──────┴────────────┐
              │  Phase 1: Core   │    │  Phase 2: Workforce  │   │  Phase 3: Talent   │
              │                  │    │                      │   │                    │
              │  Employee Center │    │  Leave Management    │   │  Performance &     │
              │  Organization    │    │  Time & Attendance   │   │    Talent Mgmt     │
              │  Workflow Engine │    │  Benefits Management │   │  L&D / Training    │
              │  Payroll Mgmt   │    │  Document Service    │   │  Recruitment       │
              │  Settings       │    │  Smart Claims        │   │  Succession Plan   │
              └────────┬─────────┘    └──────────┬───────────┘   └──────┬────────────┘
                       │                         │                      │
              ┌────────┴─────────────────────────┴──────────────────────┴──┐
              │                    Infrastructure                          │
              │  PostgreSQL 17  |  Redis 7.4  |  Keycloak 26  |  Prisma 6 │
              └────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer            | Technology                                  |
|------------------|---------------------------------------------|
| **Frontend**     | Vanilla JS (ES6+), Tailwind CSS 3, IIFE modules |
| **Backend**      | NestJS 11, TypeScript 5.7                   |
| **ORM**          | Prisma 6 (per-service isolated clients)     |
| **Database**     | PostgreSQL 17                               |
| **Cache**        | Redis 7.4                                   |
| **Auth/IAM**     | Keycloak 26 (SSO/OIDC)                      |
| **Testing**      | Jest, ts-jest, Playwright (E2E)             |
| **Infra**        | Docker Compose, npm workspaces              |
| **i18n**         | Custom i18n engine (Thai/English, 2800+ keys) |
| **Fonts**        | Sarabun, Noto Sans Thai (Google Fonts)      |

## Microservices Inventory

| #  | Service                 | Port | Description                                           |
|----|-------------------------|------|-------------------------------------------------------|
| 01 | `employee-center`       | 3001 | Employee profiles, contacts, dependents, work permits  |
| 02 | `payroll-management`    | 3002 | Payroll runs, payslips, Thai PIT, SSO, PVD             |
| 03 | `benefits-management`   | 3012 | Benefit plans, enrollment, dependents, claims          |
| 04 | `time-attendance`       | 3011 | Shifts, attendance records, anomaly detection          |
| 05 | `leave-management`      | 3003 | Leave types, balances, requests, public holidays       |
| 06 | `document-service`      | 3006 | Document upload, storage, versioning                   |
| 07 | `workflow-engine`       | 3004 | Multi-level approvals, delegations, policy rules       |
| 08 | `performance-talent`    | 3005 | Goals, KPIs, evaluations, talent pools, 9-box grid     |
| 09 | `lnd-service`           | 3009 | Courses, enrollments, training records, IDP            |
| 10 | `recruitment-onboarding`| 3010 | Job postings, candidates, screening, onboarding, resignation |
| 11 | `organization-service`  | 3008 | Departments, positions, org chart, reporting lines     |
| 12 | `smart-claims`          | 3013 | Expense claims, receipt OCR, approval routing          |
| 13 | `settings-service`      | 3007 | System config, tax rates, social security params       |
| 14 | `manager-self-service`  | 3014 | Manager dashboard, team views, quick approvals         |
| 15 | `shared`                | ---  | Common DTOs, interfaces, decorators, guards            |

## Frontend Pages (34 modules)

| Category              | Pages                                                        |
|-----------------------|--------------------------------------------------------------|
| **Dashboard**         | Home, Manager Dashboard                                      |
| **Employee Profile**  | Profile, Personal Info, Employment, Compensation, Benefits, Scorecard, Profile Details |
| **Time & Leave**      | Time Management, Leave Request, Overtime                     |
| **Payroll**           | Payslip, Payroll Setup, Payroll Processing, Government Reports |
| **Organization**      | Org Chart, Position Management, Location Management, Transfer Request |
| **Talent**            | Performance, Talent Management, Succession Planning, IDP     |
| **Learning**          | Learning, Training Records                                   |
| **Recruitment**       | Recruitment, Candidate Screening, Onboarding, Resignation    |
| **Admin**             | Workflows, Settings                                          |

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- Docker & Docker Compose
- npm (bundled with Node.js)

### 1. Clone & Install

```bash
git clone <repo-url>
cd hr
npm install
```

### 2. Start Infrastructure

```bash
docker compose up -d
# Starts PostgreSQL 17, Redis 7.4, Keycloak 26
```

### 3. Generate Prisma Clients & Run Migrations

```bash
npm run db:generate       # Generate Prisma clients for all services
npm run db:migrate        # Run migrations (dev mode)
npm run db:seed           # Seed database with demo data
```

### 4. Start Services

```bash
# Start all services
npm run dev

# Or start individual services
cd src/services/employee-center && npm run start:dev
```

### 5. Start Frontend

```bash
python -m http.server 8080 -d apps
# Open http://localhost:8080
```

## Project Structure

```
hr/
├── apps/                           # Frontend SPA
│   ├── index.html                  # Entry point (script load order matters)
│   ├── locales/                    # i18n translations
│   │   ├── en.json                 # English (2800+ keys)
│   │   └── th.json                 # Thai
│   └── js/
│       ├── app.js                  # Bootstrap & route registration
│       ├── state.js                # Centralized pub/sub store
│       ├── router.js               # Hash-based SPA routing
│       ├── api.js                  # Mock API client (300ms delays)
│       ├── i18n.js                 # Internationalization engine
│       ├── components/             # 17 reusable UI components
│       ├── data/                   # 20 mock data files
│       ├── pages/                  # 34 page modules
│       ├── utils/                  # date, mask, rbac, validation, a11y
│       └── workflow/               # Client-side workflow engine
│
├── src/
│   ├── services/                   # 14 NestJS microservices + shared lib
│   │   ├── employee-center/
│   │   │   ├── prisma/schema.prisma
│   │   │   ├── src/
│   │   │   │   ├── employee/       # Module: controller, service, DTOs
│   │   │   │   ├── prisma/         # PrismaService
│   │   │   │   ├── app.module.ts
│   │   │   │   └── main.ts
│   │   │   └── test/               # Unit & integration tests
│   │   ├── payroll-management/
│   │   ├── benefits-management/
│   │   ├── ... (12 more services)
│   │   └── shared/                 # Shared lib (DTOs, guards, decorators)
│   │
│   └── infra/
│       ├── keycloak/               # Keycloak realm config
│       ├── migrations/             # Migration helper scripts
│       │   ├── migrate-all.sh      # Run migrations for all services
│       │   ├── generate-all.sh     # Generate all Prisma clients
│       │   ├── check-schemas.sh    # Validate schemas
│       │   └── db-status.sh        # Migration status
│       ├── seed/                   # Database seed scripts
│       │   ├── seed-all.ts         # Orchestrator (dependency-ordered)
│       │   ├── seed-employee.ts    # 12 employees with full profiles
│       │   ├── seed-*.ts           # 13 domain-specific seed files
│       │   └── validate.ts         # Post-seed integrity checks
│       └── storage/
│
├── tests/
│   ├── scripts/                    # Frontend verification tests
│   └── e2e/                        # Playwright E2E test suites
│
├── docker-compose.yml              # PostgreSQL, Redis, Keycloak
├── package.json                    # Workspaces, db:* scripts
└── specs/                          # Feature specs & chore plans
```

## Testing

### Backend Tests (1,307 passing / 1,369 total across 15 services)

Unit tests pass fully across all services. Integration test failures (62 total) are expected without a running PostgreSQL/Prisma database connection.

| Service                 | Suites | Passed | Total |
|-------------------------|--------|--------|-------|
| `employee-center`       | 4      | 64     | 71    |
| `payroll-management`    | 9      | 105    | 105   |
| `benefits-management`   | 10     | 137    | 150   |
| `time-attendance`       | 7      | 105    | 114   |
| `leave-management`      | 4      | 50     | 64    |
| `document-service`      | 2      | 17     | 17    |
| `workflow-engine`       | 8      | 193    | 201   |
| `performance-talent`    | 9      | 112    | 112   |
| `lnd-service`           | 7      | 113    | 119   |
| `recruitment-onboarding`| 4      | 55     | 55    |
| `organization-service`  | 5      | 49     | 54    |
| `smart-claims`          | 6      | 114    | 114   |
| `settings-service`      | 3      | 35     | 35    |
| `manager-self-service`  | 2      | 57     | 57    |
| `shared`                | 8      | 101    | 101   |

```bash
# Run all service tests
npm run test:services

# Run tests for a specific service
cd src/services/employee-center && npm test
cd src/services/payroll-management && npm test
cd src/services/manager-self-service && npm test
```

### Frontend Verification Tests

```bash
npm run test:all          # Run all frontend test suites
npm run test:verification # Core module verification
npm run test:profile      # Profile details tests
npm run test:scorecard    # Scorecard tab tests
npm run test:benefits     # Benefits tab tests
```

### E2E Tests (Playwright)

```bash
# Via Playwright MCP server (see .mcp.json)
# Tests cover: navigation, forms, workflows, i18n switching, RBAC
```

## Key Features

### Role-Based Access Control (RBAC)

| Role        | Capabilities                                                  |
|-------------|---------------------------------------------------------------|
| Employee    | View own profile, edit contacts, submit requests, view payslips |
| Manager     | + View team profiles, approve/reject workflows, team dashboard |
| HR Admin    | + View all profiles, edit employment data, manage org structure |
| HR Manager  | + Edit compensation, approve sensitive changes, full system access |

### Internationalization (i18n)

- Full Thai/English bilingual support (2800+ translation keys)
- Thai Buddhist Era date formatting (BE 2569)
- Dot-notation keys: `nav.home`, `profile.personalInfo`, `common.save`
- Real-time language switching without page reload

### Workflow Approval System

- Multi-level routing: Employee -> Manager -> HR Admin -> HR Manager
- Configurable approval chains per change type
- Delegation support (temporary authority transfer)
- Policy rules engine (leave balance, OT limits, claim thresholds)
- Audit trail for all approval actions

### Thai Payroll Compliance

- Progressive Personal Income Tax (PIT) calculation with expense deduction
- Social Security (SSO): 5% rate, 750 THB/month cap, 15,000 THB wage base
- Provident Fund (PVD) integration
- Government reports: PND1, PND1 KOR, SSO, PVD
- AES-256-GCM encryption for salary data

### Time & Attendance

- Shift management with flexible scheduling
- Anomaly detection: missing check-in/out, late arrival, early departure, unapproved OT
- Thai Labor Law OT rates: weekday 1.5x, weekend 2.0x, holiday 3.0x
- 36-hour weekly OT limit enforcement

### Security

- Keycloak SSO/OIDC authentication
- Field-level RBAC permissions
- Data masking for sensitive fields (bank accounts, national IDs)
- WCAG 2.1 AA accessibility compliance
- AES-256-GCM encryption for financial data

## Database

### Migrations

```bash
npm run db:migrate         # Dev mode (creates migration)
npm run db:migrate:deploy  # Production (applies pending)
npm run db:migrate:status  # Check migration status
npm run db:migrate:reset   # Reset all databases (destructive)
npm run db:generate        # Regenerate all Prisma clients
npm run db:validate        # Validate all schemas
```

### Seeding

```bash
npm run db:seed                                    # Seed all services
cd src/infra/seed && ts-node seed-all.ts --service employee  # Single service
cd src/infra/seed && ts-node seed-all.ts --validate          # Validate after seed
```

Seed data includes 12 employees, 10 departments, 12 positions, 8 leave types, 19 Thai public holidays, 6 shifts, 8 training courses, 6 benefit plans, and more.

## Branding

Central Group brand colors:

| Color       | Hex       | Usage                |
|-------------|-----------|----------------------|
| CG Red      | `#C8102E` | Primary / headers    |
| CG Dark     | `#1E3A5F` | Text / sidebar       |
| CG Light    | `#F3F4F6` | Backgrounds          |
| Success     | `#10B981` | Confirmations        |
| Warning     | `#F59E0B` | Alerts               |
| Error       | `#EF4444` | Errors               |
| Info        | `#3B82F6` | Information          |

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Statistics

| Metric                | Count  |
|-----------------------|--------|
| Microservices         | 14     |
| Shared library        | 1      |
| Frontend pages        | 34     |
| UI components         | 17     |
| Backend test suites   | 88     |
| Backend tests         | 1,369  |
| Frontend JS files     | 82     |
| Mock data files       | 20     |
| i18n translation keys | 2800+  |
| Seed scripts          | 13     |
| Database models       | 50+    |

## Contributing

1. Create a feature branch from `main`
2. Follow existing patterns: NestJS modules for backend, IIFE for frontend
3. Add translations to both `en.json` and `th.json`
4. Write tests for new services (Jest + ts-jest)
5. Run `npm run test:all` and `npm run test:services` before submitting
6. Use conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`

## License

Proprietary - Central Group (Central Retail Corporation)
