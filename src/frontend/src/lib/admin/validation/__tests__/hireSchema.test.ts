// hireSchema.test.ts — AC-3/AC-4 validator polish unit tests
// Traceability: specs/hr-phase1-ris-finish.md §4 "Write Tests" + AC-3 + AC-4
//
// AC-3 R1: DOB < HireDate cross-field refine (hireSchema.ts)
// AC-4 R2: maritalStatusSince conditional required superRefine (hireSchema.ts)
// AC-5 R3: minimum hire age 15 cross-field refine (hireSchema.ts)

import { describe, it, expect } from 'vitest'
import { stepIdentitySchema, stepBiographicalSchema, calcAge } from '@/lib/admin/validation/hireSchema'

// ── Base valid fixture: stepIdentitySchema (ทุก required field ครบ) ──────────
const validIdentity = {
  hireDate:           '2026-05-01',
  companyCode:        'CEN',
  eventReason:        'H_NEWHIRE' as const,
  salutationEn:       'MR' as const,
  firstNameEn:        'Somchai',
  middleNameEn:       '',
  lastNameEn:         'Jaidee',
  dateOfBirth:        '1990-01-15',
  countryOfBirth:     'TH',
  regionOfBirth:      '',
  age:                36,
  employeeId:         'EMP-00001',
  nationalIdCardType: 'PASSPORT' as const,   // PASSPORT skips mod-11 (BRD #14); use realistic fixture
  country:            'TH',
  nationalId:         '1234567890123',
  issueDate:          null,
  expiryDate:         null,
  isPrimary:          'YES' as const,
  vnIssuePlace:       '',
  salutationLocal:    'MR' as const,
}

// ── Base valid fixture: stepBiographicalSchema (ทุก required field ครบ) ─────
const validBio = {
  otherTitleTh:       'นาย',
  firstNameLocal:     'สมชาย',
  lastNameLocal:      'ใจดี',
  middleNameLocal:    'กลาง',
  nickname:           'แดง',
  militaryStatus:     'EXEMPTED',
  gender:             'M' as const,
  nationality:        'TH',
  foreigner:          'NO' as const,
  bloodType:          'A_POS',
  maritalStatus:      'SINGLE',
  maritalStatusSince: '2020-01-01',
}

// ─── AC-3 R1: DOB < HireDate ──────────────────────────────────────────────────

describe('AC-3 R1 DOB<HireDate — stepIdentitySchema cross-field refine', () => {
  it('PASS: hireDate (2026-05-01) > dateOfBirth (1990-01-15)', () => {
    // BA cross-field rule verbatim: "Recent Date should be greater than Date of Birth"
    const result = stepIdentitySchema.safeParse(validIdentity)
    expect(result.success).toBe(true)
  })

  it('FAIL: hireDate <= dateOfBirth — error path ต้องเป็น ["dateOfBirth"] + message มี "วันที่เริ่มงาน"', () => {
    // hireDate เท่ากับ dateOfBirth = invalid (BA rule: strictly greater)
    const result = stepIdentitySchema.safeParse({
      ...validIdentity,
      hireDate:    '1990-01-15',
      dateOfBirth: '1990-01-15',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0])
      expect(paths).toContain('dateOfBirth')
      const msgs = result.error.issues.map((i) => i.message)
      expect(msgs.some((m) => m.includes('วันที่เริ่มงาน'))).toBe(true)
    }
  })
})

// ─── AC-5 R3: minimum hire age (Thai labor law 15 ปี) ────────────────────────

describe('AC-5 R3 อายุพนักงานขั้นต่ำ 15 ปี — stepIdentitySchema cross-field refine', () => {
  it('FAIL: DOB ทำให้อายุ < 15 ปี — error path ["dateOfBirth"] + message มี "อายุ"', () => {
    // Regression: ก่อนหน้านี้ปุ่ม "ถัดไป" disable เงียบ ๆ เพราะ schema มี age.positive() ที่ reject 0
    const result = stepIdentitySchema.safeParse({
      ...validIdentity,
      dateOfBirth: '2026-04-16',  // DOB ในปีปัจจุบัน → calcAge = 0
      hireDate:    '2026-04-25',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const issue = result.error.issues.find(
        (i) => i.path[0] === 'dateOfBirth' && i.message.includes('อายุ')
      )
      expect(issue).toBeDefined()
      expect(issue?.message).toContain('15 ปี')
    }
  })

  it('PASS: DOB ทำให้อายุ ≥ 15 ปี (ผู้ใหญ่)', () => {
    const result = stepIdentitySchema.safeParse({
      ...validIdentity,
      dateOfBirth: '1990-01-15',  // age ~36
    })
    expect(result.success).toBe(true)
  })

  it('calcAge helper — null เมื่อ DOB อยู่ในอนาคต', () => {
    expect(calcAge('')).toBeNull()
    expect(calcAge('2099-12-31')).toBeNull()
  })
})

// ─── AC-4 R2: maritalStatusSince conditional required ─────────────────────────

describe('AC-4 R2 maritalStatusSince conditional — stepBiographicalSchema superRefine', () => {
  it('PASS: SINGLE + maritalStatusSince ว่าง — .min(1) trigger แต่ superRefine ไม่เพิ่ม error เพราะ SINGLE', () => {
    // superRefine rule: iff maritalStatus !== SINGLE && !maritalStatusSince → addIssue
    // SINGLE + empty → superRefine ไม่ trigger; แต่ .min(1) จะ trigger ทำให้ result.success = false
    // Test นี้ verify ว่า: error ที่เกิดขึ้น ไม่ใช่จาก superRefine message (ยกเว้นโสด)
    const result = stepBiographicalSchema.safeParse({
      ...validBio,
      maritalStatus:      'SINGLE',
      maritalStatusSince: '',
    })
    // .min(1) ยังคง trigger → result.success = false, แต่ error message ต้องไม่มี "(ยกเว้นโสด)"
    if (!result.success) {
      const msgs = result.error.issues.map((i) => i.message)
      expect(msgs.some((m) => m.includes('ยกเว้นโสด'))).toBe(false)
    }
    // (ถ้า success = true ก็ผ่าน เพราะ superRefine ไม่ trigger)
  })

  it('FAIL: MARRIED + maritalStatusSince ว่าง — error path ["maritalStatusSince"] + Thai message (ยกเว้นโสด)', () => {
    // superRefine rule: MARRIED !== SINGLE && empty → addIssue
    const result = stepBiographicalSchema.safeParse({
      ...validBio,
      maritalStatus:      'MARRIED',
      maritalStatusSince: '',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const superRefineIssue = result.error.issues.find(
        (i) => i.path[0] === 'maritalStatusSince' && i.message.includes('ยกเว้นโสด')
      )
      expect(superRefineIssue).toBeDefined()
      expect(superRefineIssue?.message).toBe(
        'กรุณาระบุวันที่เปลี่ยนสถานภาพสมรส (ยกเว้นโสด)'
      )
    }
  })

  it('PASS: MARRIED + maritalStatusSince มีค่า — ผ่านทั้ง .min(1) และ superRefine', () => {
    const result = stepBiographicalSchema.safeParse({
      ...validBio,
      maritalStatus:      'MARRIED',
      maritalStatusSince: '2020-01-15',
    })
    expect(result.success).toBe(true)
  })

  it('PASS: SINGLE + maritalStatusSince มีค่า — superRefine ไม่ trigger', () => {
    // SINGLE + valid since → ทั้ง .min(1) pass และ superRefine ไม่ trigger
    const result = stepBiographicalSchema.safeParse({
      ...validBio,
      maritalStatus:      'SINGLE',
      maritalStatusSince: '2020-01-15',
    })
    expect(result.success).toBe(true)
  })
})
