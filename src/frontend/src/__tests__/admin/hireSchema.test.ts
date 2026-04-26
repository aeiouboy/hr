// hireSchema.test.ts — Unit tests สำหรับ cross-field validator + schema D2 S1
// ครอบคลุม AC: cross-field DOB < HireDate (BA row 8 col F verbatim)

import { describe, it, expect } from 'vitest'
import { stepIdentitySchema, stepBiographicalSchema } from '@/lib/admin/validation/hireSchema'

// ── Helper: base valid identity payload (ทุก required field กรอกครบ) ──────────
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

describe('stepIdentitySchema — cross-field DOB < HireDate', () => {
  it('PASS: hireDate (2026-05-01) > dateOfBirth (1990-01-15)', () => {
    // AC: BA cross-field rule verbatim "Recent Date should be greater than Date of Birth"
    const result = stepIdentitySchema.safeParse(validIdentity)
    expect(result.success).toBe(true)
  })

  it('FAIL: hireDate = dateOfBirth — เท่ากันต้องไม่ผ่าน', () => {
    const result = stepIdentitySchema.safeParse({
      ...validIdentity,
      hireDate:    '1990-01-15',
      dateOfBirth: '1990-01-15',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0])
      // cross-field error ควร path กลับที่ dateOfBirth
      expect(paths).toContain('dateOfBirth')
    }
  })

  it('FAIL: hireDate ก่อน dateOfBirth — เกิดหลังเข้างาน', () => {
    const result = stepIdentitySchema.safeParse({
      ...validIdentity,
      hireDate:    '1985-01-01',  // ก่อนเกิด
      dateOfBirth: '1990-01-15',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const msgs = result.error.issues.map((i) => i.message)
      expect(msgs.some((m) => m.includes('วันที่เริ่มงานต้องหลังวันเกิด'))).toBe(true)
    }
  })

  it('PASS: hireDate มากกว่า dateOfBirth — boundary condition (recent date to pass BRD #101 ≤90d gate)', () => {
    // hireDate must be: (a) > dateOfBirth AND (b) not more than 90 days in the past (BRD #101)
    const result = stepIdentitySchema.safeParse({
      ...validIdentity,
      hireDate:    '2026-05-01',   // recent date within 90d window
      dateOfBirth: '1990-01-15',  // well before hireDate
    })
    expect(result.success).toBe(true)
  })
})

describe('stepIdentitySchema — required fields', () => {
  it('FAIL: hireDate ว่าง', () => {
    const result = stepIdentitySchema.safeParse({ ...validIdentity, hireDate: undefined })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'hireDate')).toBe(true)
    }
  })

  it('FAIL: salutationEn ค่าไม่ถูกต้อง', () => {
    const result = stepIdentitySchema.safeParse({ ...validIdentity, salutationEn: 'INVALID' as never })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'salutationEn')).toBe(true)
    }
  })

  it('FAIL: nationalIdCardType ค่าไม่ถูกต้อง', () => {
    const result = stepIdentitySchema.safeParse({ ...validIdentity, nationalIdCardType: 'FAKE' as never })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'nationalIdCardType')).toBe(true)
    }
  })

  it('PASS: middleNameEn ว่างได้ (optional)', () => {
    const result = stepIdentitySchema.safeParse({ ...validIdentity, middleNameEn: '' })
    expect(result.success).toBe(true)
  })

  it('PASS: countryOfBirth = null ได้ (optional)', () => {
    const result = stepIdentitySchema.safeParse({ ...validIdentity, countryOfBirth: null })
    expect(result.success).toBe(true)
  })
})

describe('stepBiographicalSchema — required fields', () => {
  const validBio = {
    otherTitleTh:      'นาย',
    firstNameLocal:    'สมชาย',
    lastNameLocal:     'ใจดี',
    middleNameLocal:   'กลาง',
    nickname:          'แดง',
    militaryStatus:    'EXEMPTED',
    gender:            'M' as const,
    nationality:       'TH',
    foreigner:         'NO' as const,
    bloodType:         'A_POS',
    maritalStatus:     'SINGLE',
    maritalStatusSince:'2020-01-01',
  }

  it('PASS: กรอกครบทุก required field', () => {
    const result = stepBiographicalSchema.safeParse(validBio)
    expect(result.success).toBe(true)
  })

  it('FAIL: firstNameLocal ว่าง', () => {
    const result = stepBiographicalSchema.safeParse({ ...validBio, firstNameLocal: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'firstNameLocal')).toBe(true)
    }
  })

  it('FAIL: gender ค่าไม่ถูกต้อง', () => {
    const result = stepBiographicalSchema.safeParse({ ...validBio, gender: 'OTHER' as never })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'gender')).toBe(true)
    }
  })

  it('FAIL: foreigner ค่าไม่ถูกต้อง', () => {
    const result = stepBiographicalSchema.safeParse({ ...validBio, foreigner: 'MAYBE' as never })
    expect(result.success).toBe(false)
  })
})
