// __tests__/calcAge.test.ts
// Covers: I1-I4, E1-E4

import { describe, it, expect } from 'vitest'
import { calcAge, calcGeneration, InvalidDateError } from '../calcAge'

const AS_OF = '2026-04-23'

describe('calcAge', () => {
  // I1: decimal ≈ (asOf − dob + 1) / 365.25 per BRD #93
  it('I1 — decimal matches (asOf - dob + 1) / 365.25 within ±0.1', () => {
    const result = calcAge('1990-01-01', AS_OF)
    expect(result.decimal).toBeCloseTo(36.3, 0)
    // Independent verify
    const msPerDay = 86_400_000
    const dob = new Date('1990-01-01')
    const asOf = new Date(AS_OF)
    const days = Math.floor((asOf.getTime() - dob.getTime()) / msPerDay) + 1
    const expected = Math.round((days / 365.25) * 10) / 10
    expect(result.decimal).toBe(expected)
  })

  // I2: Year.month format — months is remainder count, not fraction
  it('I2 — birthday today: years = full years, months = 0', () => {
    const result = calcAge('1990-04-23', '2026-04-23')
    expect(result.years).toBe(36)
    expect(result.months).toBe(0)
  })

  it('I2 — mid-year birthday: months = remainder months', () => {
    // born 1990-01-01, asOf 2026-04-23 → 36 years + ~3 months
    const result = calcAge('1990-01-01', '2026-04-23')
    expect(result.years).toBe(36)
    expect(result.months).toBe(3)
  })

  // I4: missing/invalid dob → throws InvalidDateError
  it('I4 — empty dob throws InvalidDateError', () => {
    expect(() => calcAge('')).toThrow(InvalidDateError)
  })

  it('I4 — invalid date string throws InvalidDateError', () => {
    expect(() => calcAge('not-a-date', AS_OF)).toThrow(InvalidDateError)
  })

  // E1: DOB in the future → throws InvalidDateError
  it('E1 — DOB in future throws InvalidDateError', () => {
    expect(() => calcAge('2030-01-01', AS_OF)).toThrow(InvalidDateError)
    expect(() => calcAge('2030-01-01', AS_OF)).toThrow('DOB cannot be future')
  })

  // E3: same-day hire + as-of → years 0 months 0
  it('E3 — born same day as asOf: years 0 months 0', () => {
    const result = calcAge('2026-04-23', '2026-04-23')
    expect(result.years).toBe(0)
    expect(result.months).toBe(0)
  })

  // E4: Leap-year birthday (Feb 29) on non-leap asOf year
  it('E4 — Feb 29 birthday on non-leap year uses Feb 28 as anniversary', () => {
    // born 2000-02-29 (leap year), asOf = 2026-02-28 (non-leap) → exact birthday
    const result = calcAge('2000-02-29', '2026-02-28')
    expect(result.years).toBe(26)
    expect(result.months).toBe(0)
  })

  it('E4 — Feb 29 birthday, asOf = 2026-03-01 (1 month after non-leap anniversary Feb 28)', () => {
    // Anniversary = 2026-02-28 (non-leap). asOf = 2026-03-01 → 1 month after anniversary
    const result = calcAge('2000-02-29', '2026-03-01')
    expect(result.years).toBe(26)
    expect(result.months).toBe(1)
  })
})

describe('calcAge — display (I14)', () => {
  it('I14 — display string is Thai-only', () => {
    const result = calcAge('1990-01-01', AS_OF)
    expect(result.display).toMatch(/ปี|เดือน/)
    expect(result.display).not.toMatch(/year|month/i)
  })

  it('display format: years + months', () => {
    const result = calcAge('1990-01-01', '2026-04-23')
    expect(result.display).toBe('36 ปี 3 เดือน')
  })

  it('display format: years only (no months)', () => {
    const result = calcAge('1990-04-23', '2026-04-23')
    expect(result.display).toBe('36 ปี')
  })

  it('display format: months only (under 1 year)', () => {
    const result = calcAge('2026-01-23', '2026-04-23')
    expect(result.display).toBe('3 เดือน')
  })
})

describe('calcGeneration', () => {
  // I3: generation boundary tests per spec B4 §8 decision 1
  it('I3 — 1990-01-01 → Millennial', () => {
    expect(calcGeneration('1990-01-01')).toBe('Millennial')
  })

  it('I3 — 1955-06-15 → BabyBoomer', () => {
    expect(calcGeneration('1955-06-15')).toBe('BabyBoomer')
  })

  it('I3 — 1970-03-20 → GenX', () => {
    expect(calcGeneration('1970-03-20')).toBe('GenX')
  })

  it('I3 — 2000-12-01 → GenZ', () => {
    expect(calcGeneration('2000-12-01')).toBe('GenZ')
  })

  it('I3 — 2015-07-04 → GenAlpha', () => {
    expect(calcGeneration('2015-07-04')).toBe('GenAlpha')
  })

  // Boundary year checks
  it('boundary — 1964-12-31 → BabyBoomer (last year)', () => {
    expect(calcGeneration('1964-12-31')).toBe('BabyBoomer')
  })

  it('boundary — 1965-01-01 → GenX (first year)', () => {
    expect(calcGeneration('1965-01-01')).toBe('GenX')
  })

  it('boundary — 1980-12-31 → GenX (last year)', () => {
    expect(calcGeneration('1980-12-31')).toBe('GenX')
  })

  it('boundary — 1981-01-01 → Millennial (first year)', () => {
    expect(calcGeneration('1981-01-01')).toBe('Millennial')
  })

  it('boundary — 1996-12-31 → Millennial (last year)', () => {
    expect(calcGeneration('1996-12-31')).toBe('Millennial')
  })

  it('boundary — 1997-01-01 → GenZ (first year)', () => {
    expect(calcGeneration('1997-01-01')).toBe('GenZ')
  })

  it('boundary — 2012-12-31 → GenZ (last year)', () => {
    expect(calcGeneration('2012-12-31')).toBe('GenZ')
  })

  it('boundary — 2013-01-01 → GenAlpha (first year)', () => {
    expect(calcGeneration('2013-01-01')).toBe('GenAlpha')
  })

  // E10: DOB before 1946 → BabyBoomer
  it('E10 — DOB before 1946 returns BabyBoomer', () => {
    expect(calcGeneration('1930-05-10')).toBe('BabyBoomer')
    expect(calcGeneration('1900-01-01')).toBe('BabyBoomer')
  })

  // I4: invalid dob → throws
  it('I4 — empty dob throws InvalidDateError', () => {
    expect(() => calcGeneration('')).toThrow(InvalidDateError)
  })
})
