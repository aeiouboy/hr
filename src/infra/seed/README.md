# Database Seed Scripts

Migration of frontend mock data (`apps/js/data/mock-*.js`) to PostgreSQL via Prisma ORM.

## Prerequisites

- Node.js 18+
- PostgreSQL databases provisioned for each microservice
- Prisma clients generated (`npx prisma generate` in each service directory)
- Environment variables set for each service's `DATABASE_URL`

## Quick Start

```bash
cd src/infra/seed

# Install dependencies
npm install

# Seed all services (dependency order)
npm run seed:all

# Seed all + run validation
npm run seed:all -- --validate

# Seed a single service
npm run seed:all -- --service employee
npm run seed:all -- --service organization

# Run validation only
npm run validate
```

## Directory Structure

```
src/infra/seed/
  package.json            # Dependencies and npm scripts
  tsconfig.json           # TypeScript configuration
  seed-all.ts             # Master orchestrator
  validate.ts             # Record counts and integrity checks
  seed-employee.ts        # Employee Center (employees, employments, addresses, contacts, dependents, work permits)
  seed-organization.ts    # Organization Service (departments, positions, org nodes, reporting lines)
  seed-leave.ts           # Leave Management (leave types, balances, requests, public holidays)
  seed-payroll.ts         # Payroll Management (compensations, payroll runs, payslips, tax deductions)
  seed-attendance.ts      # Time & Attendance (shifts, attendance records, attendance config)
  seed-overtime.ts        # Time & Attendance (overtime requests)
  seed-training.ts        # Learning & Development (courses, enrollments, training records)
  seed-recruitment.ts     # Recruitment & Onboarding (job postings, candidates, onboarding templates, resignations)
  seed-performance.ts     # Performance & Talent (competencies, goals, evaluations, talent profiles, succession, IDP)
  seed-locations.ts       # Time & Attendance (location hierarchy, employee location assignments)
  seed-settings.ts        # Settings Service (general, tax, social security, payroll, workflow config)
  seed-workflows.ts       # Workflow Engine (workflows, steps, delegations, policy rules)
  seed-benefits.ts        # Benefits Management (plans, enrollments, dependents, claims)
  README.md               # This file
```

## Seed Order (Dependency Chain)

The master orchestrator (`seed-all.ts`) runs seeds in this order:

| Order | Service        | Depends On                |
|-------|----------------|---------------------------|
| 1     | settings       | (none)                    |
| 2     | employee       | (none)                    |
| 3     | organization   | (none)                    |
| 4     | locations      | (none)                    |
| 5     | leave          | employees                 |
| 6     | attendance     | employees, locations      |
| 7     | overtime       | employees                 |
| 8     | payroll        | employees, settings       |
| 9     | training       | employees                 |
| 10    | recruitment    | organization              |
| 11    | performance    | employees, organization   |
| 12    | benefits       | employees                 |
| 13    | workflows      | employees                 |

## Data Mapping

### Frontend to Database

| Frontend (camelCase)   | Database (snake_case)      | Notes                                |
|------------------------|----------------------------|--------------------------------------|
| `employeeId`           | `employee_id`              | String key (e.g., `EMP001`)          |
| `firstName` / `firstNameTh` | `first_name` / `first_name_th` | Bilingual fields                |
| `dateOfBirth`          | `date_of_birth`            | Converted to `Date` objects          |
| `baseSalary`           | `base_salary`              | Stored as encrypted string placeholder |
| `leaveBalance`         | `leave_balance`            | Numeric                             |
| `departmentCode`       | `department_code`          | Used for upsert unique keys          |

### Employee IDs

The following employee IDs are used consistently across all seed files:

| ID          | Role              | Name                    |
|-------------|-------------------|-------------------------|
| `EMP001`    | Employee          | Somchai Tanaka          |
| `EMP_SUP001`| Manager           | Narong Wongsakul        |
| `EMP_HR001` | HR Administrator  | Pranee Srisai           |
| `EMP_HR002` | HR Manager        | Kamolwan Jantaraksa     |
| `EMP_DR001` | Direct Report     | Apinya Charoensuk       |
| `EMP_DR002` | Direct Report     | Wichai Somboon          |
| `EMP_DR003` | Direct Report     | Natthaporn Kittisak     |
| `EMP_DR004` | Direct Report     | Ratana Phromma          |
| `EMP_DIR001`| Director          | Prasit Lertpanyavit     |
| `EMP_CTO001`| CTO               | Suphachai Techakamphu   |
| `EMP_CEO001`| CEO               | Tos Chirathivat         |
| `EMP_CFO001`| CFO               | Yuwadee Kasemsan        |

## Idempotency

All seed scripts use **upsert** operations where possible:

- Records with unique constraints use Prisma `upsert()` (create or update)
- Records without unique constraints use `deleteMany()` + `create()` pattern
- Hierarchical data (departments, locations) uses a two-pass approach:
  1. First pass: create all records without parent references
  2. Second pass: update parent references

Running `seed:all` multiple times produces the same result.

## Validation

The `validate.ts` script checks:

1. **Record counts** - Counts rows in all tables across 11 services (~40 tables)
2. **Empty table warnings** - Flags tables with zero records
3. **Referential integrity**:
   - Employees without employment records
   - Positions referencing non-existent departments
   - Leave balances referencing non-existent leave types
   - Benefit enrollments referencing non-existent plans

```bash
npm run validate
```

Output example:

```
============================================================
  Data Validation Report
============================================================

Record Counts:
------------------------------------------------------------
Service              Table                      Count
------------------------------------------------------------
employee-center      employees                     12
employee-center      employments                   12
...
------------------------------------------------------------
TOTAL                                             185

Referential Integrity Checks:
------------------------------------------------------------
  All integrity checks passed.

Validation complete.
```

## Thai Business Context

Seed data reflects Central Group (Thai retail conglomerate) context:

- **Tax brackets**: Thai progressive income tax (fiscal year 2567/2024)
- **Social security**: 5% employee/employer, max 750 THB/month
- **Provident fund**: 3-15% employee, 5% employer, 5-year vesting
- **Leave types**: Thai Labor Protection Act compliant (annual, sick, personal, maternity, military, etc.)
- **Public holidays**: 2026 Thai public holidays (19 days)
- **Overtime**: 1.5x regular, 3x holiday per Thai labor law
- **Currency**: THB throughout
- **Bilingual**: All name fields include `_en` and `_th` variants
- **Buddhist calendar**: Date settings support Buddhist Era display

## Troubleshooting

**Prisma client not found**: Run `npx prisma generate` in the relevant service directory first.

**Database connection error**: Ensure `DATABASE_URL` is set for each service. Each service uses its own database.

**Foreign key constraint errors**: Run `seed:all` (not individual seeds) to ensure correct dependency order.

**Duplicate key errors**: This should not happen with upsert operations. If it does, check that unique constraints in the schema match the `where` clauses in the seed.
