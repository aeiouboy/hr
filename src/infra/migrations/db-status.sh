#!/bin/bash
# Show migration status for all microservices
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
echo "  HRMS Database Migration Status"
echo "========================================"

for service in "${SERVICES[@]}"; do
  SERVICE_DIR="$SERVICES_DIR/$service"
  SCHEMA="$SERVICE_DIR/prisma/schema.prisma"

  if [ \! -f "$SCHEMA" ]; then
    echo -e "${YELLOW}Warning: Skipping $service - no schema.prisma found${NC}"
    continue
  fi

  echo ""
  echo "----------------------------------------"
  echo "  $service"
  echo "----------------------------------------"

  cd "$SERVICE_DIR" && npx prisma migrate status 2>&1 || echo -e "${RED}Failed to get status: $service${NC}"
done

echo ""
echo -e "${GREEN}Status check complete\!${NC}"
