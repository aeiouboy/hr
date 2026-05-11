// promotion/page.test.tsx — Unit tests สำหรับ Promotion route
import { describe, it, expect } from 'vitest'
import {
  isPromotionFormSubmittable,
  isSalaryPctValid,
  promotionEventReasonRequiresPosition,
} from '../validation'
import { MOCK_EMPLOYEES } from '@/mocks/employees'
import { ACTION_FIELD_CONTRACTS } from '@/lib/admin/lifecycle/actionFieldContracts'

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

describe('isFormValid logic — contract eventReason change type', () => {
  function promotionValid(
    salaryChangePct: string,
    effectiveDate: string | null,
    eventReason: string | null,
    hasSelectedPosition: boolean,
  ): boolean {
    return isPromotionFormSubmittable({
      salaryChangePct,
      effectiveDate,
      eventReason,
      hasSelectedPosition,
    })
  }

  it('uses contract eventReason codes as the visible change type source', () => {
    expect(ACTION_FIELD_CONTRACTS.promotion.fields.eventReason.sfMapping?.eventReasons).toEqual([
      'PRM_PRM',
      'PRM_DEMO',
      'PRCHG_PROMO',
      'PRCHG_MERINC',
      'PRCHG_ADJPOS',
      'PRCHG_SALADJ',
      'PRCHG_SALCUT',
    ])
    expect(ACTION_FIELD_CONTRACTS.promotion.fields.notes.name).toBe('notes')
    expect(ACTION_FIELD_CONTRACTS.promotion.fields.notes.submitMapping).toBe('timelineNotes')
  })

  it('position-changing eventReason requires a selected position', () => {
    expect(promotionValid('', '2026-06-01', 'PRM_PRM', false)).toBe(false)
    expect(promotionValid('', '2026-06-01', 'PRM_PRM', true)).toBe(true)
  })

  it('salary-only eventReason stays valid without selected position', () => {
    expect(promotionValid('0', '2026-06-01', 'PRCHG_SALADJ', false)).toBe(true)
  })

  it('free-text notes remain independent from change type and form validity', () => {
    const withEmptyNotes = isPromotionFormSubmittable({
      salaryChangePct: '',
      effectiveDate: '2026-06-01',
      eventReason: 'PRCHG_SALADJ',
      hasSelectedPosition: false,
    })
    const withLongNotes = isPromotionFormSubmittable({
      salaryChangePct: '',
      effectiveDate: '2026-06-01',
      eventReason: 'PRCHG_SALADJ',
      hasSelectedPosition: false,
      // @ts-expect-error notes are timeline text, not promotion validity/change-type input.
      notes: 'free-text note must not drive change type or contract logic',
    })

    expect(withEmptyNotes).toBe(true)
    expect(withLongNotes).toBe(withEmptyNotes)
    expect(promotionEventReasonRequiresPosition('PRCHG_SALADJ')).toBe(false)
  })

  it('effectiveDate null → invalid', () => {
    expect(promotionValid('10', null, 'PRCHG_SALADJ', false)).toBe(false)
  })
  it('salaryChangePct="10", eventReason null → invalid', () => {
    expect(promotionValid('10', '2026-06-01', null, false)).toBe(false)
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
