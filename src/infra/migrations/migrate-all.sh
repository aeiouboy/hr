#!/bin/bash
# Run Prisma migrations for all microservices
set -e

SERVICES_DIR="$(dirname "$0")/../../services"
SERVICES=(
  "employee-center"
  "organization-service"
  "payroll-management"
  "leave-management"
  "time-attendance"
  "workflow-engine"
  "document-service"
  "settings-service"
  "recruitment-onboarding"
  "performance-talent"
  "smart-claims"
  "benefits-management"
  "lnd-service"
  "recruitment"
)

# Color output
GREEN='[0;32m'
RED='[0;31m'
YELLOW='[1;33m'
NC='[0m'

echo "========================================"
echo "  HRMS Database Migration Runner"
echo "========================================"

MODE=${1:-"dev"}  # dev, deploy, reset, status

for service in "${SERVICES[@]}"; do
  SERVICE_DIR="$SERVICES_DIR/$service"
  SCHEMA="$SERVICE_DIR/prisma/schema.prisma"

  if [ \! -f "$SCHEMA" ]; then
    echo -e "${YELLOW}Warning: Skipping $service - no schema.prisma found${NC}"
    continue
  fi

  echo -e "
${GREEN}>>  Migrating $service...${NC}"

  case $MODE in
    dev)
      cd "$SERVICE_DIR" && npx prisma migrate dev --name init --skip-generate 2>&1 || echo -e "${RED}Failed: $service${NC}"
      ;;
    deploy)
      cd "$SERVICE_DIR" && npx prisma migrate deploy 2>&1 || echo -e "${RED}Failed: $service${NC}"
      ;;
    reset)
      cd "$SERVICE_DIR" && npx prisma migrate reset --force 2>&1 || echo -e "${RED}Failed: $service${NC}"
      ;;
    status)
      cd "$SERVICE_DIR" && npx prisma migrate status 2>&1 || echo -e "${RED}Failed: $service${NC}"
      ;;
    generate)
      cd "$SERVICE_DIR" && npx prisma generate 2>&1 || echo -e "${RED}Failed: $service${NC}"
      ;;
    *)
      echo "Usage: $0 [dev|deploy|reset|status|generate]"
      exit 1
      ;;
  esac
done

echo -e "
${GREEN}Migration complete\!${NC}"
