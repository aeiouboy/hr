#!/bin/bash
# Generate Prisma clients for all microservices
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
echo "  HRMS Prisma Client Generator"
echo "========================================"

SUCCESS=0
FAILED=0
SKIPPED=0

for service in "${SERVICES[@]}"; do
  SERVICE_DIR="$SERVICES_DIR/$service"
  SCHEMA="$SERVICE_DIR/prisma/schema.prisma"

  if [ ! -f "$SCHEMA" ]; then
    echo -e "${YELLOW}Warning: Skipping $service - no schema.prisma found${NC}"
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  echo -e "
${GREEN}>>  Generating client for $service...${NC}"

  if cd "$SERVICE_DIR" && npx prisma generate 2>&1; then
    SUCCESS=$((SUCCESS + 1))
  else
    echo -e "${RED}Failed: $service${NC}"
    FAILED=$((FAILED + 1))
  fi
done

echo ""
echo "========================================"
echo "  Results"
echo "========================================"
echo -e "${GREEN}Success: $SUCCESS${NC}"
echo -e "${RED}Failed:  $FAILED${NC}"
echo -e "${YELLOW}Skipped: $SKIPPED${NC}"
echo "========================================"
