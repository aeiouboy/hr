// lifecycle-validator.test.ts — focused tests for validateAppend (B2)
// Covers: I2, I3, I4, E1, E2, E3, E10 + ACTING_END without START
import { describe, it, expect } from 'vitest'
import { validateAppend } from '../lifecycle-validator'
import type { LifecycleEvent } from '../employment-event-types'
import { DuplicateHireError, IncompleteEventError, LifecycleViolationError } from '../employment-event-types'

// ── helpers ───────────────────────────────────────────────────
function makeEvent(overrides: Partial<LifecycleEvent>): LifecycleEvent {
  return {
    id: 'test-id',
    employeeId: 'EMP001',
    type: 'HIRE',
    effectiveDate: '2020-01-01',
    recordedAt: '2020-01-01T00:00:00Z',
    createdBy: 'system',
    ...overrides,
  }
}

function makeNew(overrides: Partial<Omit<LifecycleEvent, 'id' | 'recordedAt'>>): Omit<LifecycleEvent, 'id' | 'recordedAt'> {
  return {
    employeeId: 'EMP001',
    type: 'HIRE',
    effectiveDate: '2021-01-01',
    createdBy: 'system',
    ...overrides,
  }
}

// ── I2: required fields ───────────────────────────────────────
describe('validateAppend — I2 required fields', () => {
  it('throws on invalid effectiveDate', () => {
    expect(() => validateAppend([], makeNew({ effectiveDate: 'not-a-date' }))).toThrow(LifecycleViolationError)
  })

  it('throws on missing effectiveDate', () => {
    expect(() => validateAppend([], makeNew({ effectiveDate: '' }))).toThrow(LifecycleViolationError)
  })

  it('throws on empty employeeId', () => {
    expect(() => validateAppend([], makeNew({ employeeId: '' }))).toThrow(LifecycleViolationError)
  })

  it('throws on invalid type', () => {
    expect(() =>
      validateAppend([], makeNew({ type: 'UNKNOWN' as LifecycleEvent['type'] })),
    ).toThrow(LifecycleViolationError)
  })

  it('does not throw on valid HIRE event with empty store', () => {
    expect(() => validateAppend([], makeNew({ type: 'HIRE' }))).not.toThrow()
  })
})

// ── E1 / I3: HIRE validation ─────────────────────────────────
describe('validateAppend — E1/I3 HIRE', () => {
  it('E1: throws DuplicateHireError when HIRE exists without TERMINATE', () => {
    const existing = [makeEvent({ type: 'HIRE' })]
    expect(() => validateAppend(existing, makeNew({ type: 'HIRE' }))).toThrow(DuplicateHireError)
  })

  it('I3: throws when HIRE after TERMINATE without REHIRE in between', () => {
    const existing = [
      makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' }),
      makeEvent({ type: 'TERMINATE', effectiveDate: '2022-01-01' }),
    ]
    // ต้อง REHIRE ก่อน ถึงจะ HIRE ใหม่ได้
    expect(() => validateAppend(existing, makeNew({ type: 'HIRE' }))).toThrow(DuplicateHireError)
  })
})

// ── I3: REHIRE validation ────────────────────────────────────
describe('validateAppend — I3 REHIRE', () => {
  it('throws when REHIRE with no prior TERMINATE', () => {
    const existing = [makeEvent({ type: 'HIRE' })]
    expect(() => validateAppend(existing, makeNew({ type: 'REHIRE' }))).toThrow(LifecycleViolationError)
  })

  it('allows REHIRE after TERMINATE', () => {
    const existing = [
      makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' }),
      makeEvent({ type: 'TERMINATE', effectiveDate: '2022-01-01' }),
    ]
    expect(() => validateAppend(existing, makeNew({ type: 'REHIRE' }))).not.toThrow()
  })

  it('throws double REHIRE after single TERMINATE', () => {
    const existing = [
      makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' }),
      makeEvent({ type: 'TERMINATE', effectiveDate: '2022-01-01' }),
      makeEvent({ type: 'REHIRE', effectiveDate: '2022-06-01' }),
    ]
    expect(() => validateAppend(existing, makeNew({ type: 'REHIRE' }))).toThrow(LifecycleViolationError)
  })
})

// ── E2: TRANSFER missing meta ─────────────────────────────────
describe('validateAppend — E2 TRANSFER meta', () => {
  it('throws IncompleteEventError when TRANSFER missing fromBU', () => {
    const existing = [makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' })]
    expect(() =>
      validateAppend(existing, makeNew({ type: 'TRANSFER', meta: { toBU: 'BU2' } })),
    ).toThrow(IncompleteEventError)
  })

  it('throws IncompleteEventError when TRANSFER missing toBU', () => {
    const existing = [makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' })]
    expect(() =>
      validateAppend(existing, makeNew({ type: 'TRANSFER', meta: { fromBU: 'BU1' } })),
    ).toThrow(IncompleteEventError)
  })

  it('allows TRANSFER with both fromBU and toBU', () => {
    const existing = [makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' })]
    expect(() =>
      validateAppend(existing, makeNew({ type: 'TRANSFER', meta: { fromBU: 'BU1', toBU: 'BU2' } })),
    ).not.toThrow()
  })
})

// ── E3: PROMOTION/DEMOTION no-op ─────────────────────────────
describe('validateAppend — E3 PROMOTION/DEMOTION', () => {
  it('throws when PROMOTION fromJG === toJG', () => {
    const existing = [makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' })]
    expect(() =>
      validateAppend(existing, makeNew({ type: 'PROMOTION', meta: { fromJG: 'JG5', toJG: 'JG5' } })),
    ).toThrow(IncompleteEventError)
  })

  it('throws when DEMOTION fromJG === toJG', () => {
    const existing = [makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' })]
    expect(() =>
      validateAppend(existing, makeNew({ type: 'DEMOTION', meta: { fromJG: 'JG3', toJG: 'JG3' } })),
    ).toThrow(IncompleteEventError)
  })

  it('allows PROMOTION with different JG', () => {
    const existing = [makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' })]
    expect(() =>
      validateAppend(existing, makeNew({ type: 'PROMOTION', meta: { fromJG: 'JG4', toJG: 'JG5' } })),
    ).not.toThrow()
  })
})

// ── I4: SUSPEND overlap ───────────────────────────────────────
describe('validateAppend — I4 SUSPEND overlap', () => {
  it('throws when SUSPEND_START while already suspended', () => {
    const existing = [
      makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' }),
      makeEvent({ type: 'SUSPEND_START', effectiveDate: '2021-01-01' }),
    ]
    expect(() =>
      validateAppend(existing, makeNew({ type: 'SUSPEND_START', effectiveDate: '2021-06-01' })),
    ).toThrow(LifecycleViolationError)
  })

  it('allows second SUSPEND_START after SUSPEND_END', () => {
    const existing = [
      makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' }),
      makeEvent({ type: 'SUSPEND_START', effectiveDate: '2021-01-01' }),
      makeEvent({ type: 'SUSPEND_END', effectiveDate: '2021-06-01' }),
    ]
    expect(() =>
      validateAppend(existing, makeNew({ type: 'SUSPEND_START', effectiveDate: '2022-01-01' })),
    ).not.toThrow()
  })
})

// ── E10: SUSPEND_END without START ──────────────────────────
describe('validateAppend — E10 SUSPEND_END without START', () => {
  it('throws when SUSPEND_END with no open SUSPEND_START', () => {
    const existing = [makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' })]
    expect(() =>
      validateAppend(existing, makeNew({ type: 'SUSPEND_END' })),
    ).toThrow(LifecycleViolationError)
  })

  it('allows SUSPEND_END after SUSPEND_START', () => {
    const existing = [
      makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' }),
      makeEvent({ type: 'SUSPEND_START', effectiveDate: '2021-01-01' }),
    ]
    expect(() =>
      validateAppend(existing, makeNew({ type: 'SUSPEND_END', effectiveDate: '2021-06-01' })),
    ).not.toThrow()
  })
})

// ── Post-TERMINATE gate ──────────────────────────────────────
describe('validateAppend — post-TERMINATE gate', () => {
  it('throws CHANGE_POSITION after TERMINATE without REHIRE', () => {
    const existing = [
      makeEvent({ type: 'HIRE', effectiveDate: '2020-01-01' }),
      makeEvent({ type: 'TERMINATE', effectiveDate: '2022-01-01' }),
    ]
    expect(() =>
      validateAppend(existing, makeNew({ type: 'CHANGE_POSITION', effectiveDate: '2022-06-01' })),
    ).toThrow(LifecycleViolationError)
  })
})
