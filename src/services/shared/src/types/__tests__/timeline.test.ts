// timeline.test.ts — Type-level assertions for TimelineEvent discriminated union
//
// AC-3: @hrms/shared exports TimelineEvent + 7 variants discriminated by kind.
// Strategy: runtime object construction validates shape; TypeScript compile
// enforces exhaustiveness (each variant satisfies its interface).
//
// Traceability: specs/hr-phase-1-d1-foundation.md §AC-3 + §D1.3

import type {
  TimelineEvent,
  HireEvent,
  ProbationEvent,
  TransferEvent,
  TerminateEvent,
  RehireEvent,
  ContractRenewalEvent,
  PromotionEvent,
  TimelineEventBase,
  TimelineEventKind,
} from '../timeline'

// ─── Base field fixture helper ────────────────────────────────────────────────

function base(overrides: Partial<TimelineEventBase> = {}): TimelineEventBase {
  return {
    id: 'ev-001',
    employeeId: 'emp-001',
    kind: 'hire',
    effectiveDate: '2026-05-01',
    recordedAt: '2026-05-01T08:00:00Z',
    actorUserId: 'usr-001',
    ...overrides,
  }
}

// ─── AC-3: TimelineEvent — 7 variants ────────────────────────────────────────

describe('TimelineEvent — 7 variants discriminated by kind', () => {
  // AC-3: HireEvent has kind="hire" + newClass + position
  it('AC-3: HireEvent kind="hire" with newClass + position', () => {
    const e: HireEvent = {
      ...base({ kind: 'hire' }),
      kind: 'hire',
      newClass: 'A',
      position: 'Software Engineer',
    }
    expect(e.kind).toBe('hire')
    expect(e.newClass).toBe('A')
    expect(e.position).toBe('Software Engineer')
  })

  // AC-3: ProbationEvent has kind="probation_assess" + outcome
  it('AC-3: ProbationEvent kind="probation_assess" with outcome', () => {
    const e: ProbationEvent = {
      ...base({ kind: 'probation_assess' }),
      kind: 'probation_assess',
      outcome: 'pass',
    }
    expect(e.kind).toBe('probation_assess')
    expect(e.outcome).toBe('pass')
  })

  // AC-3: ProbationEvent outcome can be 'extend'
  it('AC-3: ProbationEvent outcome="extend" is valid', () => {
    const e: ProbationEvent = {
      ...base({ kind: 'probation_assess' }),
      kind: 'probation_assess',
      outcome: 'extend',
    }
    expect(e.outcome).toBe('extend')
  })

  // AC-3: ProbationEvent outcome can be 'terminate_during_probation'
  it('AC-3: ProbationEvent outcome="terminate_during_probation" is valid', () => {
    const e: ProbationEvent = {
      ...base({ kind: 'probation_assess' }),
      kind: 'probation_assess',
      outcome: 'terminate_during_probation',
    }
    expect(e.outcome).toBe('terminate_during_probation')
  })

  // AC-3: TransferEvent has kind="transfer" + from/to org + position
  it('AC-3: TransferEvent kind="transfer" with fromOrgUnit/toOrgUnit/fromPosition/toPosition', () => {
    const e: TransferEvent = {
      ...base({ kind: 'transfer' }),
      kind: 'transfer',
      fromOrgUnit: 'CDS-IT',
      toOrgUnit: 'CEN-TECH',
      fromPosition: 'Developer',
      toPosition: 'Senior Developer',
    }
    expect(e.kind).toBe('transfer')
    expect(e.fromOrgUnit).toBe('CDS-IT')
    expect(e.toOrgUnit).toBe('CEN-TECH')
    expect(e.fromPosition).toBe('Developer')
    expect(e.toPosition).toBe('Senior Developer')
  })

  // AC-3: TerminateEvent has kind="terminate" + reasonCode + lastDay
  it('AC-3: TerminateEvent kind="terminate" with reasonCode + lastDay', () => {
    const e: TerminateEvent = {
      ...base({ kind: 'terminate' }),
      kind: 'terminate',
      reasonCode: 'TERM_RESIGN',
      lastDay: '2026-06-30',
    }
    expect(e.kind).toBe('terminate')
    expect(e.reasonCode).toBe('TERM_RESIGN')
    expect(e.lastDay).toBe('2026-06-30')
  })

  // AC-3: TerminateEvent.okToRehire is optional
  it('AC-3: TerminateEvent.okToRehire is optional (can be omitted)', () => {
    const withFlag: TerminateEvent = {
      ...base({ kind: 'terminate' }),
      kind: 'terminate',
      reasonCode: 'TERM_EOC',
      lastDay: '2026-05-31',
      okToRehire: true,
    }
    const withoutFlag: TerminateEvent = {
      ...base({ kind: 'terminate' }),
      kind: 'terminate',
      reasonCode: 'TERM_EOC',
      lastDay: '2026-05-31',
    }
    expect(withFlag.okToRehire).toBe(true)
    expect(withoutFlag.okToRehire).toBeUndefined()
  })

  // AC-3: RehireEvent has kind="rehire" + priorEmployeeId
  it('AC-3: RehireEvent kind="rehire" with priorEmployeeId', () => {
    const e: RehireEvent = {
      ...base({ kind: 'rehire' }),
      kind: 'rehire',
      priorEmployeeId: 'emp-old-001',
    }
    expect(e.kind).toBe('rehire')
    expect(e.priorEmployeeId).toBe('emp-old-001')
  })

  // AC-3: ContractRenewalEvent has kind="contract_renewal" + newEndDate
  it('AC-3: ContractRenewalEvent kind="contract_renewal" with newEndDate', () => {
    const e: ContractRenewalEvent = {
      ...base({ kind: 'contract_renewal' }),
      kind: 'contract_renewal',
      newEndDate: '2027-04-30',
    }
    expect(e.kind).toBe('contract_renewal')
    expect(e.newEndDate).toBe('2027-04-30')
  })

  // AC-3: PromotionEvent has kind="promotion" + fromTitle + toTitle
  it('AC-3: PromotionEvent kind="promotion" with fromTitle + toTitle', () => {
    const e: PromotionEvent = {
      ...base({ kind: 'promotion' }),
      kind: 'promotion',
      fromTitle: 'Junior Developer',
      toTitle: 'Senior Developer',
    }
    expect(e.kind).toBe('promotion')
    expect(e.fromTitle).toBe('Junior Developer')
    expect(e.toTitle).toBe('Senior Developer')
  })

  // AC-3: PromotionEvent.salaryChangePct is optional
  it('AC-3: PromotionEvent.salaryChangePct is optional (can be omitted)', () => {
    const withPct: PromotionEvent = {
      ...base({ kind: 'promotion' }),
      kind: 'promotion',
      fromTitle: 'A',
      toTitle: 'B',
      salaryChangePct: 15,
    }
    const withoutPct: PromotionEvent = {
      ...base({ kind: 'promotion' }),
      kind: 'promotion',
      fromTitle: 'A',
      toTitle: 'B',
    }
    expect(withPct.salaryChangePct).toBe(15)
    expect(withoutPct.salaryChangePct).toBeUndefined()
  })
})

// ─── AC-3: Base fields present in every variant ───────────────────────────────

describe('TimelineEventBase — base fields required in every variant', () => {
  // AC-3: Every variant must carry the 6 required base fields
  it('AC-3: base fields: id, employeeId, kind, effectiveDate, recordedAt, actorUserId', () => {
    const e: HireEvent = {
      id: 'ev-base',
      employeeId: 'emp-base',
      kind: 'hire',
      effectiveDate: '2026-05-01',
      recordedAt: '2026-05-01T00:00:00Z',
      actorUserId: 'usr-base',
      newClass: 'B',
      position: 'Analyst',
    }
    expect(e.id).toBe('ev-base')
    expect(e.employeeId).toBe('emp-base')
    expect(e.kind).toBe('hire')
    expect(e.effectiveDate).toBe('2026-05-01')
    expect(e.recordedAt).toBe('2026-05-01T00:00:00Z')
    expect(e.actorUserId).toBe('usr-base')
  })

  // AC-3: notes field is optional on base
  it('AC-3: notes is optional — can be undefined or a string', () => {
    const withNotes: HireEvent = {
      ...base({ kind: 'hire' }),
      kind: 'hire',
      newClass: 'A',
      position: 'PM',
      notes: 'Approved by HR Director',
    }
    const withoutNotes: HireEvent = {
      ...base({ kind: 'hire' }),
      kind: 'hire',
      newClass: 'A',
      position: 'PM',
    }
    expect(withNotes.notes).toBe('Approved by HR Director')
    expect(withoutNotes.notes).toBeUndefined()
  })
})

// ─── AC-3: Discriminated union narrowing via kind ────────────────────────────

describe('TimelineEvent — discriminated union narrowing', () => {
  // AC-3: kind discriminator narrows to the correct variant at runtime
  it('AC-3: kind="hire" narrows to HireEvent fields at runtime', () => {
    const events: TimelineEvent[] = [
      {
        ...base({ kind: 'hire' }),
        kind: 'hire',
        newClass: 'A',
        position: 'Dev',
      },
      {
        ...base({ kind: 'probation_assess' }),
        kind: 'probation_assess',
        outcome: 'pass',
      },
    ]

    const hire = events.find((e) => e.kind === 'hire')
    expect(hire).toBeDefined()
    // At runtime, accessing the discriminated field is safe
    if (hire && hire.kind === 'hire') {
      expect(hire.newClass).toBe('A')
      expect(hire.position).toBe('Dev')
    }
  })

  // AC-3: 7 distinct kind values exist in TimelineEventKind union
  it('AC-3: exactly 7 kind values are valid', () => {
    const validKinds: TimelineEventKind[] = [
      'hire',
      'probation_assess',
      'transfer',
      'terminate',
      'rehire',
      'contract_renewal',
      'promotion',
    ]
    expect(validKinds).toHaveLength(7)
    // Ensure each kind is a unique string
    const uniqueKinds = new Set(validKinds)
    expect(uniqueKinds.size).toBe(7)
  })

  // AC-3: switch exhaustiveness — each kind routes correctly
  it('AC-3: runtime switch on kind handles all 7 variants', () => {
    const allEvents: TimelineEvent[] = [
      { ...base({ kind: 'hire' }), kind: 'hire', newClass: 'A', position: 'P' },
      { ...base({ kind: 'probation_assess' }), kind: 'probation_assess', outcome: 'pass' },
      { ...base({ kind: 'transfer' }), kind: 'transfer', fromOrgUnit: 'A', toOrgUnit: 'B', fromPosition: 'X', toPosition: 'Y' },
      { ...base({ kind: 'terminate' }), kind: 'terminate', reasonCode: 'TERM_RESIGN', lastDay: '2026-01-01' },
      { ...base({ kind: 'rehire' }), kind: 'rehire', priorEmployeeId: 'old-1' },
      { ...base({ kind: 'contract_renewal' }), kind: 'contract_renewal', newEndDate: '2027-01-01' },
      { ...base({ kind: 'promotion' }), kind: 'promotion', fromTitle: 'Jr', toTitle: 'Sr' },
    ]

    const routed: string[] = []

    for (const e of allEvents) {
      switch (e.kind) {
        case 'hire': routed.push('hire'); break
        case 'probation_assess': routed.push('probation_assess'); break
        case 'transfer': routed.push('transfer'); break
        case 'terminate': routed.push('terminate'); break
        case 'rehire': routed.push('rehire'); break
        case 'contract_renewal': routed.push('contract_renewal'); break
        case 'promotion': routed.push('promotion'); break
        default: {
          // TypeScript exhaustiveness guard
          const _never: never = e
          routed.push('unknown')
        }
      }
    }

    expect(routed).toEqual([
      'hire',
      'probation_assess',
      'transfer',
      'terminate',
      'rehire',
      'contract_renewal',
      'promotion',
    ])
  })
})
