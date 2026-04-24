// timeline.ts — TimelineEvent discriminated union for EC-Core lifecycle tracking
// Types only — no runtime logic, no schema, no handlers.
// Variants: 8 types from Plan §4 + Audit #19 ActingEvent (C8: ห้าม invent additional variants).

export type TimelineEventKind =
  | 'hire'
  | 'probation_assess'
  | 'transfer'
  | 'terminate'
  | 'rehire'
  | 'contract_renewal'
  | 'promotion'
  | 'acting_start'
  | 'acting_end'

export interface TimelineEventBase {
  id: string
  employeeId: string
  kind: TimelineEventKind
  effectiveDate: string   // ISO date YYYY-MM-DD
  recordedAt: string      // ISO datetime
  actorUserId: string
  notes?: string
}

export interface HireEvent extends TimelineEventBase {
  kind: 'hire'
  newClass: string
  position: string
}

export interface ProbationEvent extends TimelineEventBase {
  kind: 'probation_assess'
  outcome: 'pass' | 'extend' | 'terminate_during_probation'
}

export interface TransferEvent extends TimelineEventBase {
  kind: 'transfer'
  fromOrgUnit: string
  toOrgUnit: string
  fromPosition: string
  toPosition: string
}

export interface TerminateEvent extends TimelineEventBase {
  kind: 'terminate'
  reasonCode: string
  lastDay: string
  okToRehire?: boolean
}

export interface RehireEvent extends TimelineEventBase {
  kind: 'rehire'
  priorEmployeeId: string
}

export interface ContractRenewalEvent extends TimelineEventBase {
  kind: 'contract_renewal'
  newEndDate: string
}

export interface PromotionEvent extends TimelineEventBase {
  kind: 'promotion'
  fromTitle: string
  toTitle: string
  salaryChangePct?: number
}

export interface ActingEvent extends TimelineEventBase {
  kind: 'acting_start' | 'acting_end'
  position: string      // target position title
  isPrimary?: boolean   // default false — acting = secondary unless flagged
}

export type TimelineEvent =
  | HireEvent
  | ProbationEvent
  | TransferEvent
  | TerminateEvent
  | RehireEvent
  | ContractRenewalEvent
  | PromotionEvent
  | ActingEvent
