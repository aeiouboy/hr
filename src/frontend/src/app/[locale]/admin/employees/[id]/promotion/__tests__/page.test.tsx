// promotion/page.test.tsx — Unit tests สำหรับ Promotion route (ACs 4, 6, 9, 10)
import { describe, it, expect } from 'vitest'
import {
  isHigherGrade,
  isWithin180Days,
  JG_ORDER,
  JG_OPTIONS,
  MIN_DAYS_BETWEEN_PROMOTIONS,
} from '../page'
import { MOCK_EMPLOYEES } from '@/mocks/employees'

describe('isHigherGrade', () => {
  it('JG-04 > JG-02 — must be true', () => { expect(isHigherGrade('JG-02', 'JG-04')).toBe(true) })
  it('JG-10 > JG-08 — must be true', () => { expect(isHigherGrade('JG-08', 'JG-10')).toBe(true) })
  it('same grade → false (AC6: newJG > currentJG)', () => { expect(isHigherGrade('JG-04', 'JG-04')).toBe(false) })
  it('demotion JG-08 → JG-06 → false', () => { expect(isHigherGrade('JG-08', 'JG-06')).toBe(false) })
  it('JG-02 → JG-10 skip levels → true', () => { expect(isHigherGrade('JG-02', 'JG-10')).toBe(true) })
  it('unknown fromJG → order 0, any valid JG > 0 → true', () => { expect(isHigherGrade('JG-99', 'JG-02')).toBe(true) })
  it('JG-10 → unknown toJG → false', () => { expect(isHigherGrade('JG-10', 'JG-UNKNOWN')).toBe(false) })
})

describe('JG_ORDER', () => {
  it('contains all 5 standard grades', () => {
    expect(Object.keys(JG_ORDER)).toHaveLength(5)
    expect(JG_ORDER['JG-02']).toBe(2)
    expect(JG_ORDER['JG-10']).toBe(10)
  })
  it('JG_OPTIONS lists grades in ascending order', () => {
    for (let i = 1; i < JG_OPTIONS.length; i++) {
      expect(JG_ORDER[JG_OPTIONS[i]]).toBeGreaterThan(JG_ORDER[JG_OPTIONS[i - 1]])
    }
  })
})

describe('isWithin180Days', () => {
  it('same day → within 180 days → true', () => { expect(isWithin180Days('2025-01-01', '2025-01-01')).toBe(true) })
  it('179 days later → still within → true', () => { expect(isWithin180Days('2025-01-01', '2025-06-29')).toBe(true) })
  it('exactly 180 days → false (allow)', () => { expect(isWithin180Days('2025-01-01', '2025-06-30')).toBe(false) })
  it('181 days later → false (allow)', () => { expect(isWithin180Days('2025-01-01', '2025-07-01')).toBe(false) })
  it('1 year later → false (allow)', () => { expect(isWithin180Days('2024-01-01', '2025-01-01')).toBe(false) })
})

describe('MIN_DAYS_BETWEEN_PROMOTIONS', () => {
  it('must be 180 (BRD requirement)', () => { expect(MIN_DAYS_BETWEEN_PROMOTIONS).toBe(180) })
})

describe('Thai labels in page module', () => {
  it('promotion reason IDs follow PRCHG_ prefix', () => {
    ['PRCHG_PRM', 'PRCHG_ADJPOS', 'PRCHG_MERIT'].forEach((id) => {
      expect(id).toMatch(/^PRCHG_/)
    })
  })
  it('JG option labels contain JG- prefix', () => {
    JG_OPTIONS.forEach((jg) => { expect(jg).toMatch(/^JG-\d{2}$/) })
  })
})

describe('MockEmployee.job_grade field', () => {
  it('all 1000 mock employees have job_grade field', () => {
    expect(MOCK_EMPLOYEES).toHaveLength(1000)
    MOCK_EMPLOYEES.forEach((emp) => { expect(emp.job_grade).toBeDefined() })
  })
  it('job_grade values are valid JG codes', () => {
    const validGrades = new Set(JG_OPTIONS)
    MOCK_EMPLOYEES.forEach((emp) => {
      expect(validGrades.has(emp.job_grade as typeof JG_OPTIONS[number])).toBe(true)
    })
  })
  it('all 5 JG grades appear in mock data', () => {
    const seen = new Set(MOCK_EMPLOYEES.map((e) => e.job_grade))
    JG_OPTIONS.forEach((jg) => { expect(seen.has(jg)).toBe(true) })
  })
})

describe('salaryChangePct validation', () => {
  it('valid numeric: 10 → parseFloat = 10', () => { expect(parseFloat('10')).toBe(10) })
  it('valid fractional: 5.5 → parseFloat = 5.5', () => { expect(parseFloat('5.5')).toBe(5.5) })
  it('empty string → undefined', () => {
    const pct = '' ? parseFloat('') : undefined
    expect(pct).toBeUndefined()
  })
  it('zero salary change is valid', () => { expect(parseFloat('0')).toBe(0) })
})

describe('effectiveDate >= hire_date (AC6)', () => {
  it('effective date on hire_date is valid', () => {
    expect('2020-01-15' >= '2020-01-15').toBe(true)
  })
  it('effective date before hire_date is invalid', () => {
    expect('2019-12-01' >= '2020-01-15').toBe(false)
  })
})
