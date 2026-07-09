'use client';

import type { ReactNode } from 'react';
import { useCapabilities } from '@/hooks/use-capabilities';
import type { Action, Entity } from '@/lib/capabilities';

interface CapabilityProps {
  /** Show children only if the named entity is visible (partial/full). */
  entity?: Entity;
  /** Show children only if the action is allowed. */
  action?: Action;
  /** Rendered when the gate denies. Defaults to null (hide silently). */
  fallback?: ReactNode;
  children: ReactNode;
}

/**
 * Field-level RBAC gate. Pattern #7 from extracted-context-2026-05-02/01-sf-system-baseline.md §5.
 *
 * Examples:
 *   <Capability entity="BenefitEmployeeClaim"><ClaimDetail /></Capability>
 *   <Capability action="bulkApprove"><BulkApproveButton /></Capability>
 *   <Capability action="talentSearch"><TalentNav /></Capability>
 *
 * If both `entity` and `action` are passed, BOTH must pass (AND).
 */
/**
 * CLIENT-ONLY GATE — backend must re-check every gated action. Do not use
 * this to protect data fetches; it only governs presentation.
 */
export function Capability({
  entity,
  action,
  fallback = null,
  children,
}: CapabilityProps) {
  const caps = useCapabilities();

  const entityOk = entity ? caps.canSee(entity) : true;
  const actionOk = action ? caps.canDo(action) : true;

  if (entityOk && actionOk) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
