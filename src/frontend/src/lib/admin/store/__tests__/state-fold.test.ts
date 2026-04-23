// state-fold.test.ts — focused tests for foldEventsToSnapshot (B2)
// Covers: I5, I6, I7, I8, I14, E4, E5, E6
import { describe, it, expect } from 'vitest'
import { foldEventsToSnapshot } from '../state-fold'
import type { LifecycleEvent } from '../employment-event-types'

// ── helpers ───────────────────────────────────────────────────
function makeEvent(overrides: Partial<LifecycleEvent>): LifecycleEvent {
  return {
    id: `evt-${Math.random().toString(36).slice(2)}`,
    employeeId: 'EMP001',
    type: 'HIRE',
    effectiveDate: '2020-01-01',
    recordedAt: '2020-01-01T00:00:00Z',
    createdBy: 'system',
    ...overrides,
  }
}

const EMP = 'EMP001'

// ── I7 / E4: empty events ─────────────────────────────────────
describe('foldEventsToSnapshot — E4/I7 empty events', () => {
  it('E4: returns PENDING_HIRE with empty actingPositions when no events', () => {
    const result = foldEventsToSnapshot(EMP, [], '2024-01-01')
    expect(result.status).toBe('PENDING_HIRE')
    expect(result.actingPositions).toEqual([])
    expect(result.events).toEqual([])
  })

  it('I7: stateAsOf before any event = PENDING_HIRE', () => {
    const events = [makeEvent({ type: 'HIRE', effectiveDate: '2025-01-01' })]
    const result = foldEventsToSnapshot(EMP, events, '2020-01-01')
    expect(result.status).toBe('PENDING_HIRE')
  })
})

// ── I5: eventsAsOf filter ─────────────────────────────────────
describe('foldEventsToSnapshot — I5 events filter', () => {
  it('I5: events after asOfDate are excluded from snapshot.events', () => {
    const events = [
      makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' }),
      makeEvent({ type: 'TRANSFER', effectiveDate: '2022-06-01', meta: { fromBU: 'BU1', toBU: 'BU2' } }),
    ]
    const result = foldEventsToSnapshot(EMP, events, '2021-12-31')
    // only HIRE should be included
    expect(result.events).toHaveLength(1)
    expect(result.events[0].type).toBe('HIRE')
    expect(result.currentBU).toBeUndefined()
  })
})

// ── E6: inclusive boundary ────────────────────────────────────
describe('foldEventsToSnapshot — E6 inclusive effectiveDate boundary', () => {
  it('E6: event on exactly asOfDate is INCLUDED', () => {
    const events = [
      makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' }),
      makeEvent({ type: 'TRANSFER', effectiveDate: '2022-06-01', meta: { fromBU: 'BU1', toBU: 'BU-NEW' } }),
    ]
    const result = foldEventsToSnapshot(EMP, events, '2022-06-01')
    expect(result.events).toHaveLength(2)
    expect(result.currentBU).toBe('BU-NEW')
  })
})

// ── I6: TERMINATED status ─────────────────────────────────────
describe('foldEventsToSnapshot — I6 TERMINATED status', () => {
  it('I6: status = TERMINATED when last event is TERMINATE', () => {
    const events = [
      makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' }),
      makeEvent({ type: 'TERMINATE', effectiveDate: '2023-06-01' }),
    ]
    const result = foldEventsToSnapshot(EMP, events, '2024-01-01')
    expect(result.status).toBe('TERMINATED')
  })

  it('I6: status = ACTIVE after TERMINATE + REHIRE', () => {
    const events = [
      makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' }),
      makeEvent({ type: 'TERMINATE', effectiveDate: '2022-01-01' }),
      makeEvent({ type: 'REHIRE', effectiveDate: '2023-01-01' }),
    ]
    const result = foldEventsToSnapshot(EMP, events, '2024-01-01')
    expect(result.status).toBe('ACTIVE')
  })
})

// ── I8: future-dated events ───────────────────────────────────
describe('foldEventsToSnapshot — I8 future-dated projection', () => {
  it('I8: future asOfDate includes all events (valid use case)', () => {
    const events = [
      makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' }),
      makeEvent({ type: 'TRANSFER', effectiveDate: '2030-06-01', meta: { fromBU: 'BU1', toBU: 'BU-FUTURE' } }),
    ]
    const result = foldEventsToSnapshot(EMP, events, '2030-12-31')
    expect(result.events).toHaveLength(2)
    expect(result.currentBU).toBe('BU-FUTURE')
  })
})

// ── I14: pure function idempotency ────────────────────────────
describe('foldEventsToSnapshot — I14 pure function', () => {
  it('I14: multiple calls with same args return deep-equal result', () => {
    const events = [
      makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' }),
      makeEvent({ type: 'TRANSFER', effectiveDate: '2021-01-01', meta: { fromBU: 'BU1', toBU: 'BU2' } }),
    ]
    const r1 = foldEventsToSnapshot(EMP, events, '2024-01-01')
    const r2 = foldEventsToSnapshot(EMP, events, '2024-01-01')
    expect(r1).toEqual(r2)
  })

  it('I14: does not mutate input events array', () => {
    const events = [
      makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' }),
    ]
    const original = [...events]
    foldEventsToSnapshot(EMP, events, '2024-01-01')
    expect(events).toEqual(original)
  })
})

// ── E5: concurrent acting positions ──────────────────────────
describe('foldEventsToSnapshot — E5 concurrent ACTING', () => {
  it('E5: multiple ACTING_START without ACTING_END = all in actingPositions', () => {
    const events = [
      makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' }),
      makeEvent({ type: 'ACTING_START', effectiveDate: '2021-01-01', meta: { toPosition: 'Head of A' } }),
      makeEvent({ type: 'ACTING_START', effectiveDate: '2022-01-01', meta: { toPosition: 'Head of B' } }),
    ]
    const result = foldEventsToSnapshot(EMP, events, '2024-01-01')
    expect(result.actingPositions).toHaveLength(2)
    expect(result.actingPositions).toContain('Head of A')
    expect(result.actingPositions).toContain('Head of B')
  })

  it('ACTING_END removes matching role', () => {
    const events = [
      makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' }),
      makeEvent({ type: 'ACTING_START', effectiveDate: '2021-01-01', meta: { toPosition: 'Head of A' } }),
      makeEvent({ type: 'ACTING_START', effectiveDate: '2022-01-01', meta: { toPosition: 'Head of B' } }),
      makeEvent({ type: 'ACTING_END', effectiveDate: '2023-01-01', meta: { toPosition: 'Head of A' } }),
    ]
    const result = foldEventsToSnapshot(EMP, events, '2024-01-01')
    expect(result.actingPositions).toHaveLength(1)
    expect(result.actingPositions).not.toContain('Head of A')
    expect(result.actingPositions).toContain('Head of B')
  })
})

// ── SUSPENDED status ─────────────────────────────────────────
describe('foldEventsToSnapshot — SUSPENDED status', () => {
  it('status = SUSPENDED when SUSPEND_START without matching SUSPEND_END', () => {
    const events = [
      makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' }),
      makeEvent({ type: 'SUSPEND_START', effectiveDate: '2023-06-01' }),
    ]
    const result = foldEventsToSnapshot(EMP, events, '2024-01-01')
    expect(result.status).toBe('SUSPENDED')
  })

  it('status = ACTIVE after SUSPEND_END', () => {
    const events = [
      makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' }),
      makeEvent({ type: 'SUSPEND_START', effectiveDate: '2022-01-01' }),
      makeEvent({ type: 'SUSPEND_END', effectiveDate: '2022-06-01' }),
    ]
    const result = foldEventsToSnapshot(EMP, events, '2024-01-01')
    expect(result.status).toBe('ACTIVE')
  })
})

// ── hireDate + mostRecentStartDate ────────────────────────────
describe('foldEventsToSnapshot — hire date tracking', () => {
  it('hireDate = first HIRE effectiveDate', () => {
    const events = [makeEvent({ type: 'HIRE', effectiveDate: '2018-03-15' })]
    const result = foldEventsToSnapshot(EMP, events, '2024-01-01')
    expect(result.hireDate).toBe('2018-03-15')
  })

  it('mostRecentStartDate = REHIRE effectiveDate after TERMINATE+REHIRE', () => {
    const events = [
      makeEvent({ type: 'HIRE', effectiveDate: '2018-01-01' }),
      makeEvent({ type: 'TERMINATE', effectiveDate: '2020-06-01' }),
      makeEvent({ type: 'REHIRE', effectiveDate: '2021-01-01' }),
    ]
    const result = foldEventsToSnapshot(EMP, events, '2024-01-01')
    expect(result.hireDate).toBe('2018-01-01')       // original HIRE
    expect(result.mostRecentStartDate).toBe('2021-01-01')  // REHIRE
    expect(result.status).toBe('ACTIVE')
  })
})
