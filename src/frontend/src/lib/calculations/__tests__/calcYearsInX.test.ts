// __tests__/calcYearsInX.test.ts
// Covers: I7, I8, I9, I10, E5, E6, E7, E8

import { describe, it, expect } from 'vitest'
import { calcYearsInJob, calcYearsInPosition, calcYearsInBU, calcYearsInJobGrade } from '../calcYearsInX'
import { InvalidEventError } from '../calcYearOfService'
import type { LifecycleEvent } from '../types'

const AS_OF = '2026-04-23'

describe('calcYearsInJob (F4)', () => {
  // I9: CHANGE_JOB resets; CHANGE_POSITION does NOT
  it('I9 — CHANGE_JOB resets counter', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2018-01-01' },
      { type: 'CHANGE_JOB', effectiveDate: '2023-01-01' },
    ]
    const result = calcYearsInJob(events, AS_OF)
    // From 2023-01-01 to 2026-04-23 = ~3y3m
    expect(result.years).toBe(3)
    expect(result.months).toBe(3)
  })

  it('I9 — CHANGE_POSITION does NOT reset years-in-job', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2020-01-01' },
      { type: 'CHANGE_POSITION', effectiveDate: '2023-01-01' },
    ]
    const result = calcYearsInJob(events, AS_OF)
    // No CHANGE_JOB → falls back to HIRE 2020-01-01
    expect(result.years).toBeGreaterThanOrEqual(6)
  })

  // I11: no CHANGE_JOB → count from HIRE
  it('I11 — no CHANGE_JOB: count from HIRE', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2020-04-23' },
    ]
    const result = calcYearsInJob(events, AS_OF)
    expect(result.years).toBe(6)
    expect(result.months).toBe(0)
  })

  // E6: out-of-order events sorted internally
  it('E6 — out-of-order events give same result as in-order', () => {
    const inOrder: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2020-01-01' },
      { type: 'CHANGE_JOB', effectiveDate: '2023-01-01' },
    ]
    const outOfOrder: LifecycleEvent[] = [
      { type: 'CHANGE_JOB', effectiveDate: '2023-01-01' },
      { type: 'HIRE', effectiveDate: '2020-01-01' },
    ]
    expect(calcYearsInJob(inOrder, AS_OF).decimal).toBe(calcYearsInJob(outOfOrder, AS_OF).decimal)
  })

  // E7: event missing effectiveDate → throws
  it('E7 — event missing effectiveDate throws InvalidEventError', () => {
    const events: LifecycleEvent[] = [
      { type: 'CHANGE_JOB', effectiveDate: '' },
    ]
    expect(() => calcYearsInJob(events, AS_OF)).toThrow(InvalidEventError)
  })

  // E5: multiple rehires (REHIRE after REHIRE) — most recent HIRE/REHIRE wins
  it('E5 — multiple HIRE/REHIRE: uses most recent for fallback', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2015-01-01' },
      { type: 'TERMINATE', effectiveDate: '2017-01-01' },
      { type: 'REHIRE', effectiveDate: '2018-01-01' },
      { type: 'TERMINATE', effectiveDate: '2020-01-01' },
      { type: 'REHIRE', effectiveDate: '2021-06-01' },
    ]
    const result = calcYearsInJob(events, AS_OF)
    // No CHANGE_JOB → fallback to last REHIRE 2021-06-01
    expect(result.years).toBe(4)
  })
})

describe('calcYearsInPosition (F5)', () => {
  // I10: CHANGE_POSITION resets; CHANGE_JOB within same position does NOT
  it('I10 — CHANGE_POSITION resets counter', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2020-01-01' },
      { type: 'CHANGE_POSITION', effectiveDate: '2023-04-23' },
    ]
    const result = calcYearsInPosition(events, AS_OF)
    // From 2023-04-23 to 2026-04-23 = 3 years exactly
    expect(result.years).toBe(3)
    expect(result.months).toBe(0)
  })

  it('I10 — spec example: HIRE 2020, CHANGE_POSITION 2023 → yearsInPosition from 2023', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2020-01-01' },
      { type: 'CHANGE_POSITION', effectiveDate: '2023-01-01' },
    ]
    const result = calcYearsInPosition(events, AS_OF)
    expect(result.years).toBe(3)
  })

  it('I10 — CHANGE_JOB does NOT reset yearsInPosition', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2020-01-01' },
      { type: 'CHANGE_JOB', effectiveDate: '2023-01-01' },
    ]
    const result = calcYearsInPosition(events, AS_OF)
    // No CHANGE_POSITION → count from HIRE
    expect(result.years).toBeGreaterThanOrEqual(6)
  })

  // I11: no CHANGE_POSITION → count from HIRE
  it('I11 — no CHANGE_POSITION: count from HIRE', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2022-04-23' },
    ]
    const result = calcYearsInPosition(events, AS_OF)
    expect(result.years).toBe(4)
    expect(result.months).toBe(0)
  })
})

describe('calcYearsInBU (F6)', () => {
  // I7: TRANSFER with fromBU !== toBU resets; CHANGE_POSITION within same BU does NOT
  it('I7 — cross-BU TRANSFER resets counter', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2018-01-01' },
      { type: 'TRANSFER', effectiveDate: '2023-01-01', meta: { fromBU: 'BU-A', toBU: 'BU-B' } },
    ]
    const result = calcYearsInBU(events, AS_OF)
    expect(result.years).toBe(3)
    expect(result.months).toBe(3)
  })

  it('I7 — same-BU CHANGE_POSITION does NOT reset', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2018-01-01' },
      { type: 'CHANGE_POSITION', effectiveDate: '2023-01-01' },
    ]
    const result = calcYearsInBU(events, AS_OF)
    // No cross-BU transfer → count from HIRE 2018-01-01
    expect(result.years).toBeGreaterThanOrEqual(8)
  })

  it('I7 — same-BU TRANSFER (fromBU === toBU) does NOT reset', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2020-01-01' },
      { type: 'TRANSFER', effectiveDate: '2023-01-01', meta: { fromBU: 'BU-A', toBU: 'BU-A' } },
    ]
    const result = calcYearsInBU(events, AS_OF)
    // Same BU → count from HIRE
    expect(result.years).toBeGreaterThanOrEqual(6)
  })

  // E8: HIRE has no meta.toBU → treat HIRE as BU start (no crash)
  it('E8 — HIRE with no meta.toBU treated as BU start', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2020-04-23' },
    ]
    expect(() => calcYearsInBU(events, AS_OF)).not.toThrow()
    const result = calcYearsInBU(events, AS_OF)
    expect(result.years).toBe(6)
  })

  // TRANSFER missing BU meta → no reset (conservative)
  it('E8 — TRANSFER missing fromBU/toBU meta → no reset', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2020-01-01' },
      { type: 'TRANSFER', effectiveDate: '2023-01-01' },  // no meta
    ]
    const result = calcYearsInBU(events, AS_OF)
    // No cross-BU detected → count from HIRE
    expect(result.years).toBeGreaterThanOrEqual(6)
  })
})

describe('calcYearsInJobGrade (F7)', () => {
  // I8: PROMOTION/DEMOTION with fromJG !== toJG resets; CHANGE_POSITION without JG change does NOT
  it('I8 — PROMOTION with JG change resets counter', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2018-01-01' },
      { type: 'PROMOTION', effectiveDate: '2023-01-01', meta: { fromJG: 'G5', toJG: 'G6' } },
    ]
    const result = calcYearsInJobGrade(events, AS_OF)
    expect(result.years).toBe(3)
    expect(result.months).toBe(3)
  })

  it('I8 — DEMOTION with JG change resets counter', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2018-01-01' },
      { type: 'DEMOTION', effectiveDate: '2024-01-01', meta: { fromJG: 'G6', toJG: 'G5' } },
    ]
    const result = calcYearsInJobGrade(events, AS_OF)
    expect(result.years).toBe(2)
    expect(result.months).toBe(3)
  })

  it('I8 — CHANGE_POSITION without JG change does NOT reset', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2020-01-01' },
      { type: 'CHANGE_POSITION', effectiveDate: '2023-01-01' },
    ]
    const result = calcYearsInJobGrade(events, AS_OF)
    // No JG-changing event → count from HIRE
    expect(result.years).toBeGreaterThanOrEqual(6)
  })

  // PROMOTION with same JG → no reset
  it('I8 — PROMOTION where fromJG === toJG does NOT reset (title change only)', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2020-01-01' },
      { type: 'PROMOTION', effectiveDate: '2023-01-01', meta: { fromJG: 'G5', toJG: 'G5' } },
    ]
    const result = calcYearsInJobGrade(events, AS_OF)
    expect(result.years).toBeGreaterThanOrEqual(6)
  })

  // I11: no JG-changing event → count from HIRE
  it('I11 — no PROMOTION/DEMOTION: count from HIRE', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2021-04-23' },
    ]
    const result = calcYearsInJobGrade(events, AS_OF)
    expect(result.years).toBe(5)
    expect(result.months).toBe(0)
  })

  // I14: display string Thai-only
  it('I14 — display is Thai-only string', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2020-01-01' },
    ]
    const result = calcYearsInJobGrade(events, AS_OF)
    expect(result.display).toMatch(/ปี|เดือน/)
    expect(result.display).not.toMatch(/year|month/i)
  })
})
