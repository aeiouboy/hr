// __tests__/calcYearOfService.test.ts
// Covers: I5, I6, I11, I12, I13, I14, E2, E3, E6, E7, E9

import { describe, it, expect } from 'vitest'
import { calcYearOfService, InvalidEventError } from '../calcYearOfService'
import type { LifecycleEvent } from '../types'

const AS_OF = '2026-04-23'

describe('calcYearOfService', () => {
  // I11: no events → count from hireDate
  it('I11 — no events: count from hireDate to asOf', () => {
    const result = calcYearOfService('2020-01-01', [], AS_OF)
    expect(result.years).toBe(6)
    expect(result.months).toBeGreaterThanOrEqual(0)
  })

  // I12: asOf earlier than hireDate → return 0
  it('I12 — asOf before hireDate returns 0', () => {
    const result = calcYearOfService('2025-01-01', [], '2020-01-01')
    expect(result.years).toBe(0)
    expect(result.months).toBe(0)
  })

  // I13: pure function — fixed asOf gives deterministic result
  it('I13 — same inputs always return same result (pure)', () => {
    const a = calcYearOfService('2020-06-01', [], AS_OF)
    const b = calcYearOfService('2020-06-01', [], AS_OF)
    expect(a).toEqual(b)
  })

  // I14: display string is Thai-only
  it('I14 — display is Thai-localized string', () => {
    const result = calcYearOfService('2020-01-01', [], AS_OF)
    expect(result.display).toMatch(/ปี|เดือน/)
    expect(result.display).not.toMatch(/year|month/i)
  })

  // I5: Suspension gaps excluded from tenure
  it('I5 — suspension gap excluded from tenure', () => {
    // Hire 2020-01-01, suspend 2022-01-01 → 2022-07-01 (6 months gap)
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2020-01-01' },
      { type: 'SUSPEND_START', effectiveDate: '2022-01-01' },
      { type: 'SUSPEND_END', effectiveDate: '2022-07-01' },
    ]
    const withSuspend = calcYearOfService('2020-01-01', events, '2023-01-01')
    const withoutSuspend = calcYearOfService('2020-01-01', [], '2023-01-01')
    // withSuspend should be ~6 months less
    expect(withSuspend.decimal).toBeLessThan(withoutSuspend.decimal)
    // Active time = 2020-01-01 to 2022-01-01 (24mo) + 2022-07-01 to 2023-01-01 (6mo) = 30mo ~ 2.5 years
    expect(withSuspend.years).toBe(2)
    expect(withSuspend.months).toBeGreaterThanOrEqual(4)
  })

  // I6: Rehire continuity — default is continuous
  it('I6 — REHIRE after TERMINATE defaults to continuous service', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2018-01-01' },
      { type: 'TERMINATE', effectiveDate: '2020-01-01' },
      { type: 'REHIRE', effectiveDate: '2021-01-01' },
    ]
    // Continuous: segments [2018-01-01, 2020-01-01) + [2021-01-01, asOf)
    const result = calcYearOfService('2018-01-01', events, '2023-01-01')
    // Active = 2 years + 2 years = 4 years
    expect(result.years).toBe(4)
  })

  it('I6 — REHIRE with new_employee_code resets service counter', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2018-01-01' },
      { type: 'TERMINATE', effectiveDate: '2020-01-01' },
      { type: 'REHIRE', effectiveDate: '2021-01-01', meta: { reason: 'new_employee_code' } },
    ]
    const result = calcYearOfService('2018-01-01', events, '2023-01-01')
    // Reset: only 2021-01-01 to 2023-01-01 = 2 years
    expect(result.years).toBe(2)
  })

  // E2: future hireDate → return 0 (no throw)
  it('E2 — future hireDate returns 0 without throwing', () => {
    expect(() => {
      const result = calcYearOfService('2030-01-01', [], AS_OF)
      expect(result.years).toBe(0)
      expect(result.months).toBe(0)
    }).not.toThrow()
  })

  // E3: same-day hire as asOf → 0
  it('E3 — same-day hire and asOf returns years 0 months 0', () => {
    const result = calcYearOfService('2026-04-23', [], '2026-04-23')
    expect(result.years).toBe(0)
    expect(result.months).toBe(0)
  })

  // E6: events out of order → sorted internally
  it('E6 — out-of-order events sorted internally', () => {
    const events: LifecycleEvent[] = [
      { type: 'SUSPEND_END', effectiveDate: '2022-07-01' },
      { type: 'SUSPEND_START', effectiveDate: '2022-01-01' },
    ]
    const inOrder: LifecycleEvent[] = [
      { type: 'SUSPEND_START', effectiveDate: '2022-01-01' },
      { type: 'SUSPEND_END', effectiveDate: '2022-07-01' },
    ]
    const outOfOrder = calcYearOfService('2020-01-01', events, '2023-01-01')
    const ordered = calcYearOfService('2020-01-01', inOrder, '2023-01-01')
    expect(outOfOrder.decimal).toBe(ordered.decimal)
  })

  // E7: event missing effectiveDate → throws InvalidEventError
  it('E7 — event missing effectiveDate throws InvalidEventError', () => {
    const events: LifecycleEvent[] = [
      { type: 'SUSPEND_START', effectiveDate: '' },
    ]
    expect(() => calcYearOfService('2020-01-01', events, AS_OF)).toThrow(InvalidEventError)
  })

  // E9: currently suspended (no SUSPEND_END) → exclude from today back to SUSPEND_START
  it('E9 — open suspension (no SUSPEND_END) excluded from asOf back', () => {
    const events: LifecycleEvent[] = [
      { type: 'SUSPEND_START', effectiveDate: '2025-01-01' },
    ]
    const withSuspend = calcYearOfService('2020-01-01', events, AS_OF)
    const noSuspend = calcYearOfService('2020-01-01', [], AS_OF)
    // Should be ~15+ months shorter
    expect(withSuspend.decimal).toBeLessThan(noSuspend.decimal)
    // Active = 2020-01-01 to 2025-01-01 = 5 years
    expect(withSuspend.years).toBe(5)
    expect(withSuspend.months).toBe(0)
  })

  // I5 (exact spec example): hire 2020-01-01, suspend 2022-01-01→2022-06-30
  it('I5 — spec example: 5-month suspend gap excluded', () => {
    const events: LifecycleEvent[] = [
      { type: 'HIRE', effectiveDate: '2020-01-01' },
      { type: 'SUSPEND_START', effectiveDate: '2022-01-01' },
      { type: 'SUSPEND_END', effectiveDate: '2022-06-30' },
    ]
    const asOf = '2024-01-01'
    const result = calcYearOfService('2020-01-01', events, asOf)
    // Active: 2020-01-01→2022-01-01 (24mo) + 2022-06-30→2024-01-01 (18mo) = 42mo ≈ 3.5yr
    // Should be less than 4 years (which would be without suspension)
    const withoutSuspend = calcYearOfService('2020-01-01', [], asOf)
    expect(result.decimal).toBeLessThan(withoutSuspend.decimal)
    expect(result.years).toBe(3)
  })
})
