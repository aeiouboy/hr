# HRMS Database Migrations

Prisma migration helper scripts for all HRMS microservices.

## Quick Start

```bash
# From the repository root:

# Run dev migrations for all services
npm run db:migrate

# Generate Prisma clients for all services
npm run db:generate

# Check migration status
npm run db:migrate:status

# Validate all schemas
npm run db:validate
```

## Scripts

| Script | npm command | Description |
|--------|------------|-------------|
| `migrate-all.sh dev` | `npm run db:migrate` | Run dev migrations (creates migration files) |
| `migrate-all.sh deploy` | `npm run db:migrate:deploy` | Apply pending migrations (production) |
| `migrate-all.sh reset` | `npm run db:migrate:reset` | Reset all databases and re-apply migrations |
| `migrate-all.sh status` | `npm run db:migrate:status` | Show migration status for all services |
| `generate-all.sh` | `npm run db:generate` | Generate Prisma clients for all services |
| `check-schemas.sh` | `npm run db:validate` | Validate all Prisma schema files |
| `db-status.sh` | — | Show detailed migration status |

## Running Migrations

### All Services

```bash
# Development — creates and applies migrations
bash src/infra/migrations/migrate-all.sh dev

# Production — applies pending migrations only
bash src/infra/migrations/migrate-all.sh deploy

# Reset all databases (WARNING: destroys all data)
bash src/infra/migrations/migrate-all.sh reset

# Check status
bash src/infra/migrations/migrate-all.sh status

# Generate all Prisma clients
bash src/infra/migrations/generate-all.sh
```

### Single Service

```bash
# Navigate to the service directory
cd src/services/employee-center

# Run a dev migration
npx prisma migrate dev --name describe_your_change

# Apply pending migrations (production)
npx prisma migrate deploy

# Reset the database
npx prisma migrate reset --force

# Check status
npx prisma migrate status

# Generate client
npx prisma generate

# Validate schema
npx prisma validate
```

## Resetting Databases

```bash
# Reset ALL service databases (destroys all data, re-applies migrations)
npm run db:migrate:reset

# Reset a single service
cd src/services/employee-center
npx prisma migrate reset --force
```

## Seeding Data

```bash
# Seed all databases
npm run db:seed

# This runs: cd src/infra/seed && ts-node seed-all.ts
```

Seed scripts are located in `src/infra/seed/`. Each service can have its own seed file that populates initial/test data.

## Database Naming Convention

Each microservice has its own database following this naming pattern:

| Service | Database Name |
|---------|--------------|
| employee-center | `hrms_employee` |
| organization-service | `hrms_organization` |
| payroll-management | `hrms_payroll` |
| leave-management | `hrms_leave` |
| time-attendance | `hrms_attendance` |
| workflow-engine | `hrms_workflow` |
| document-service | `hrms_document` |
| settings-service | `hrms_settings` |
| recruitment-onboarding | `hrms_recruitment` |
| performance-talent | `hrms_performance` |
| smart-claims | `hrms_claims` |
| benefits-management | `hrms_benefits` |
| lnd-service | `hrms_lnd` |
| recruitment | `hrms_recruit` |

## Environment Setup

Each service requires a `DATABASE_URL` in its `.env` file (or via environment variables). The connection string format for PostgreSQL:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

### Local Development

For local development with Docker Compose, the infrastructure is started via:

```bash
npm run infra:up    # Start PostgreSQL, Redis, etc.
npm run infra:down  # Stop infrastructure
```

Ensure the databases listed above exist in your PostgreSQL instance before running migrations.

### Creating Databases

```sql
CREATE DATABASE hrms_employee;
CREATE DATABASE hrms_organization;
CREATE DATABASE hrms_payroll;
CREATE DATABASE hrms_leave;
CREATE DATABASE hrms_attendance;
CREATE DATABASE hrms_workflow;
CREATE DATABASE hrms_document;
CREATE DATABASE hrms_settings;
CREATE DATABASE hrms_recruitment;
CREATE DATABASE hrms_performance;
CREATE DATABASE hrms_claims;
CREATE DATABASE hrms_benefits;
CREATE DATABASE hrms_lnd;
CREATE DATABASE hrms_recruit;
```

## Troubleshooting

### "Schema not found" warnings

If a service is listed but has no `prisma/schema.prisma` file, the script will skip it with a warning. This is normal for services that haven't been set up yet.

### Migration conflicts

If you encounter migration conflicts after pulling changes:

```bash
# Check which migrations are pending
npx prisma migrate status

# If needed, reset and re-apply
npx prisma migrate reset --force
```

### Permission errors

Ensure the shell scripts are executable:

```bash
chmod +x src/infra/migrations/*.sh
```
