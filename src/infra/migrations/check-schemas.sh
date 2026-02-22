#!/bin/bash
# Validate all Prisma schemas
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
echo "  HRMS Prisma Schema Validator"
echo "========================================"

SUCCESS=0
FAILED=0
SKIPPED=0
FAILED_SERVICES=()

for service in "${SERVICES[@]}"; do
  SERVICE_DIR="$SERVICES_DIR/$service"
  SCHEMA="$SERVICE_DIR/prisma/schema.prisma"

  if [ ! -f "$SCHEMA" ]; then
    echo -e "${YELLOW}Warning: Skipping $service - no schema.prisma found${NC}"
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  if cd "$SERVICE_DIR" && npx prisma validate 2>&1; then
    echo -e "${GREEN}OK: $service${NC}"
    SUCCESS=$((SUCCESS + 1))
  else
    echo -e "${RED}INVALID: $service${NC}"
    FAILED=$((FAILED + 1))
    FAILED_SERVICES+=("$service")
  fi
done

echo ""
echo "========================================"
echo "  Validation Results"
echo "========================================"
echo -e "${GREEN}Valid:   $SUCCESS${NC}"
echo -e "${RED}Invalid: $FAILED${NC}"
echo -e "${YELLOW}Skipped: $SKIPPED${NC}"

if [ $FAILED -gt 0 ]; then
  echo ""
  echo -e "${RED}Failed schemas:${NC}"
  for svc in "${FAILED_SERVICES[@]}"; do
    echo -e "  ${RED}- $svc${NC}"
  done
  exit 1
fi

echo "========================================"
