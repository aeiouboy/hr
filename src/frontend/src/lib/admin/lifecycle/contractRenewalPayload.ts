import type { ContractRenewalEvent } from '@hrms/shared/types/timeline'

export interface BuildContractRenewalTimelineEventInput {
  id: string
  employeeId: string
  currentEndDate: string
  recordedAt: string
  actorUserId: string
  newEndDate: string
  renewalReason?: string
}

export function buildContractRenewalTimelineEvent(
  input: BuildContractRenewalTimelineEventInput,
): ContractRenewalEvent {
  const notes = input.renewalReason?.trim()

  return {
    id: input.id,
    employeeId: input.employeeId,
    kind: 'contract_renewal',
    // Timeline requires an effectiveDate; contract renewal has no separate user-entered effective-date field.
    effectiveDate: input.currentEndDate,
    recordedAt: input.recordedAt,
    actorUserId: input.actorUserId,
    newEndDate: input.newEndDate,
    ...(notes ? { notes } : {}),
  }
}
