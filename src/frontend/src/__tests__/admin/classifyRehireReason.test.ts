// classifyRehireReason.test.ts — unit tests สำหรับ pure function classifier
// AC-3 + AC-15: gap=364 → LT1, gap=365 → GE1, gap=366 → GE1, leap year, future date throws
import { describe, it, expect } from 'vitest'
import { classifyRehireReason } from '@/lib/admin/utils/classifyRehireReason'

describe('classifyRehireReason', () => {
  // ---- กรณีทั่วไป (boundary ตาม spec) ----

  it('gap 364 วัน → RE_REHIRE_LT1', () => {
    // today = 2026-04-23, lastTermDate = 364 วันก่อน = 2025-04-24
    const today = new Date('2026-04-23')
    const termDate = new Date(today)
    termDate.setDate(termDate.getDate() - 364)
    expect(classifyRehireReason(termDate, today)).toBe('RE_REHIRE_LT1')
  })

  it('gap 365 วัน → RE_REHIRE_GE1 (boundary inclusive)', () => {
    // exactly 365 days = GE1 ตาม BRD #102 naming
    const today = new Date('2026-04-23')
    const termDate = new Date(today)
    termDate.setDate(termDate.getDate() - 365)
    expect(classifyRehireReason(termDate, today)).toBe('RE_REHIRE_GE1')
  })

  it('gap 366 วัน → RE_REHIRE_GE1', () => {
    const today = new Date('2026-04-23')
    const termDate = new Date(today)
    termDate.setDate(termDate.getDate() - 366)
    expect(classifyRehireReason(termDate, today)).toBe('RE_REHIRE_GE1')
  })

  // ---- ตัวอย่างจาก AC-3 verbatim ----

  it('lastTermDate=2025-08-01, today=2026-04-23 (gap 265 วัน) → LT1', () => {
    expect(classifyRehireReason('2025-08-01', '2026-04-23')).toBe('RE_REHIRE_LT1')
  })

  it('lastTermDate=2024-04-23, today=2026-04-23 (gap 731 วัน) → GE1', () => {
    expect(classifyRehireReason('2024-04-23', '2026-04-23')).toBe('RE_REHIRE_GE1')
  })

  // ---- Leap year handling ----

  it('leap year: ปี 2024 มี 366 วัน — ไม่กระทบ logic (นับ ms ไม่ใช่ month)', () => {
    // gap ข้ามปี 2024 (leap): 2023-02-28 → 2024-02-28 = 366 วัน → GE1
    expect(classifyRehireReason('2023-02-28', '2024-02-28')).toBe('RE_REHIRE_GE1')
  })

  it('leap year: gap 364 วันข้ามปี leap → LT1', () => {
    // 2024-02-29 → 2025-02-27 = 364 วัน (leap day ทำให้ gap ไม่ถึง 365) → LT1
    expect(classifyRehireReason('2024-02-29', '2025-02-27')).toBe('RE_REHIRE_LT1')
  })

  // ---- Edge cases ----

  it('same day (gap 0) → LT1', () => {
    expect(classifyRehireReason('2026-04-23', '2026-04-23')).toBe('RE_REHIRE_LT1')
  })

  it('gap 1 วัน → LT1', () => {
    expect(classifyRehireReason('2026-04-22', '2026-04-23')).toBe('RE_REHIRE_LT1')
  })

  it('gap > 10 ปี → GE1', () => {
    expect(classifyRehireReason('2010-01-01', '2026-04-23')).toBe('RE_REHIRE_GE1')
  })

  // ---- รับ string หรือ Date ได้ทั้งคู่ ----

  it('รับ Date object ได้โดยตรง', () => {
    const termDate = new Date('2025-01-01')
    const today = new Date('2026-04-23')
    expect(classifyRehireReason(termDate, today)).toBe('RE_REHIRE_GE1')
  })

  it('รับ string ISO ได้โดยตรง', () => {
    expect(classifyRehireReason('2026-04-01', '2026-04-23')).toBe('RE_REHIRE_LT1')
  })

  // ---- Error cases ----

  it('lastTermDate อยู่ในอนาคต → throw Error', () => {
    expect(() => classifyRehireReason('2027-01-01', '2026-04-23')).toThrowError(
      /lastTermDate.*อยู่ในอนาคต/
    )
  })

  it('lastTermDate ไม่ถูกต้อง (invalid string) → throw Error', () => {
    expect(() => classifyRehireReason('not-a-date', '2026-04-23')).toThrowError(
      /lastTermDate ไม่ถูกต้อง/
    )
  })

  it('today ไม่ถูกต้อง (invalid string) → throw Error', () => {
    expect(() => classifyRehireReason('2025-01-01', 'tomorrow')).toThrowError(
      /today ไม่ถูกต้อง/
    )
  })
})
