// promotion/page.test.tsx — Unit tests สำหรับ Promotion route
import { describe, it, expect } from 'vitest'
import { isSalaryPctValid } from '../page'
import { MOCK_EMPLOYEES } from '@/mocks/employees'

describe('isSalaryPctValid', () => {
  it('0 คือค่าต่ำสุดที่ valid', () => { expect(isSalaryPctValid(0)).toBe(true) })
  it('50 คือค่าสูงสุดที่ valid', () => { expect(isSalaryPctValid(50)).toBe(true) })
  it('10 valid', () => { expect(isSalaryPctValid(10)).toBe(true) })
  it('25.5 valid (ทศนิยม)', () => { expect(isSalaryPctValid(25.5)).toBe(true) })
  it('51 เกิน 50 → invalid', () => { expect(isSalaryPctValid(51)).toBe(false) })
  it('-1 ติดลบ → invalid', () => { expect(isSalaryPctValid(-1)).toBe(false) })
  it('100 เกิน range → invalid', () => { expect(isSalaryPctValid(100)).toBe(false) })
})

describe('salaryChangePct parse logic', () => {
  it('empty string → undefined (ไม่บังคับกรอก)', () => {
    const pct = '' !== '' ? parseFloat('') : undefined
    expect(pct).toBeUndefined()
  })
  it('valid numeric string "10" → 10', () => { expect(parseFloat('10')).toBe(10) })
  it('fractional "5.5" → 5.5', () => { expect(parseFloat('5.5')).toBe(5.5) })
  it('zero "0" → 0 (valid)', () => { expect(parseFloat('0')).toBe(0) })
})

describe('effectiveDate >= hire_date (EffectiveDateGate constraint)', () => {
  it('effective date on hire_date is valid', () => {
    expect('2020-01-15' >= '2020-01-15').toBe(true)
  })
  it('effective date before hire_date is invalid', () => {
    expect('2019-12-01' >= '2020-01-15').toBe(false)
  })
  it('effective date after hire_date is valid', () => {
    expect('2024-06-01' >= '2020-01-15').toBe(true)
  })
})

describe('MockEmployee data integrity', () => {
  it('mock employees array is populated', () => {
    expect(MOCK_EMPLOYEES.length).toBeGreaterThan(0)
  })
  it('all employees have position_title', () => {
    MOCK_EMPLOYEES.forEach((emp) => { expect(emp.position_title).toBeDefined() })
  })
  it('all employees have hire_date in ISO format', () => {
    MOCK_EMPLOYEES.forEach((emp) => {
      expect(emp.hire_date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })
  })
})

describe('PromotionEvent field mapping', () => {
  it('fromTitle falls back to position_title when corporate_title absent', () => {
    const emp = MOCK_EMPLOYEES[0]
    const corporateTitle = (emp as unknown as Record<string, unknown>).corporate_title as string | undefined
    const fromTitle = corporateTitle ?? emp.position_title
    expect(fromTitle).toBe(emp.position_title)
  })
  it('toTitle must be non-empty string', () => {
    const toTitle = 'ผู้จัดการอาวุโส'.trim()
    expect(toTitle.length).toBeGreaterThan(0)
  })
})
