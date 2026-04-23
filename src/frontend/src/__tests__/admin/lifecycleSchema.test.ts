// lifecycleSchema.test.ts — Unit tests สำหรับ Zod schemas ทั้ง 3 lifecycle flows
// ครอบคลุม: valid paths, missing required fields, conditional fields, enum rejection
// Part B Wave 1 — [part-b-wave1-tests]

import { describe, it, expect } from 'vitest'
import {
  rehireSchema,
  transferSchema,
  terminateSchema,
  transferStep4AcrossSchema,
  transferStep4WithinSchema,
  TERMINATION_EVENT_REASONS,
} from '@/lib/admin/validation/lifecycleSchema'

// =========================================================
// Helper fixtures
// =========================================================

const validMockEmployee = {
  externalCode: 'EMP0016',
  firstName: { th: 'พิมพ์ใจ', en: 'Phimjai' },
  lastName:  { th: 'ทรงศักดิ์', en: 'Songsak' },
  nationalId: '1101600678901',
  company: 'C001',
  businessUnit: '10000000',
  position: 'ฝ่ายบุคคล',
  hireDate: '2019-02-01',
  status: 'Terminated' as const,
  lastTermDate: '2026-01-23',
  okToRehire: true,
}

const validActiveEmployee = {
  externalCode: 'EMP0001',
  firstName: { th: 'สมชาย', en: 'Somchai' },
  lastName:  { th: 'มานะดี', en: 'Manadee' },
  nationalId: '1100100123456',
  company: 'C001',
  businessUnit: '10000000',
  position: 'พนักงานขาย',
  hireDate: '2020-03-01',
  status: 'Active' as const,
}

// =========================================================
// REHIRE SCHEMA
// =========================================================

describe('rehireSchema — valid input ผ่าน', () => {
  it('ข้อมูลครบถ้วน 7 steps ต้องผ่าน validation', () => {
    const validRehire = {
      step1: {
        selectedEmployee: validMockEmployee,
        eventReason: 'RE_REHIRE_LT1' as const,
      },
      step2: { rehireDate: '2026-05-01' },
      step3: { dateOfBirth: '1990-06-15' },
      step4: { employeeClass: 'A' as const },
      step5: { addressLine1: '123 ถนนสุขุมวิท กรุงเทพฯ' },
      step6: { position: 'ผู้ช่วยผู้จัดการ', businessUnit: '10000000' },
      step7: { baseSalary: 35000 },
    }

    const result = rehireSchema.safeParse(validRehire)
    expect(result.success).toBe(true)
  })
})

describe('rehireSchema — missing required field ไม่ผ่าน', () => {
  it('ขาด selectedEmployee ใน step1 ต้อง fail', () => {
    const invalid = {
      step1: {
        // selectedEmployee หายไป
        eventReason: 'RE_REHIRE_LT1',
      },
      step2: { rehireDate: '2026-05-01' },
      step3: { dateOfBirth: '1990-06-15' },
      step4: { employeeClass: 'A' },
      step5: { addressLine1: '123 ถนนสุขุมวิท' },
      step6: { position: 'ผู้ช่วยผู้จัดการ', businessUnit: '10000000' },
      step7: { baseSalary: 35000 },
    }

    const result = rehireSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })

  it('eventReason ไม่ถูกต้อง (unknown code) ต้อง fail', () => {
    const invalid = {
      step1: {
        selectedEmployee: validMockEmployee,
        eventReason: 'RE_INVALID_CODE', // ไม่ใช่ LT1/GE1
      },
      step2: { rehireDate: '2026-05-01' },
      step3: { dateOfBirth: '1990-06-15' },
      step4: { employeeClass: 'A' },
      step5: { addressLine1: '123 ถนน' },
      step6: { position: 'ผู้ช่วยผู้จัดการ', businessUnit: '10000000' },
      step7: { baseSalary: 35000 },
    }

    const result = rehireSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })

  it('selectedEmployee ที่ okToRehire=false ต้อง fail (step1 refine)', () => {
    // EMP0020 — okToRehire=false
    const employeeNotOkToRehire = {
      ...validActiveEmployee,
      externalCode: 'EMP0020',
      status: 'Terminated' as const,
      lastTermDate: '2023-05-01',
      okToRehire: false,
    }

    const invalid = {
      step1: {
        selectedEmployee: employeeNotOkToRehire,
        eventReason: 'RE_REHIRE_GE1' as const,
      },
      step2: { rehireDate: '2026-05-01' },
      step3: { dateOfBirth: '1990-06-15' },
      step4: { employeeClass: 'A' },
      step5: { addressLine1: '123 ถนน' },
      step6: { position: 'ผู้ช่วยผู้จัดการ', businessUnit: '10000000' },
      step7: { baseSalary: 35000 },
    }

    const result = rehireSchema.safeParse(invalid)
    expect(result.success).toBe(false)
    if (!result.success) {
      // ต้องมี error ที่ step1
      const step1Errors = result.error.errors.filter((e) => e.path[0] === 'step1')
      expect(step1Errors.length).toBeGreaterThan(0)
    }
  })
})

// =========================================================
// TRANSFER SCHEMA — conditional newCompany
// =========================================================

describe('transferSchema — across-company vs within-company', () => {
  it('TRN_TRNACCOMP ต้องการ newCompany — ขาดไป ต้อง fail (step4AcrossSchema)', () => {
    const invalidAcross = {
      businessUnit: '10000000',
      department: '',
      position: 'ผู้จัดการแผนก',
      costCenter: '',
      jobCode: '',
      location: '',
      // newCompany หายไป
    }

    const result = transferStep4AcrossSchema.safeParse(invalidAcross)
    expect(result.success).toBe(false)
  })

  it('TRN_TRNACCOMP พร้อม newCompany → step4AcrossSchema ผ่าน', () => {
    const validAcross = {
      newCompany: 'C003',
      businessUnit: '10000000',
      department: '',
      position: 'ผู้จัดการแผนก',
      costCenter: '',
      jobCode: '',
      location: '',
    }

    const result = transferStep4AcrossSchema.safeParse(validAcross)
    expect(result.success).toBe(true)
  })

  it('TRN_ROTATION/TRNWIC ไม่ต้องการ newCompany — step4WithinSchema ผ่านโดยไม่มี newCompany', () => {
    const validWithin = {
      businessUnit: '10000000',
      department: '',
      position: 'นักวิเคราะห์',
      costCenter: '',
      jobCode: '',
      location: '',
      // newCompany ไม่มี — ต้องผ่าน
    }

    const result = transferStep4WithinSchema.safeParse(validWithin)
    expect(result.success).toBe(true)
  })

  it('transferSchema full valid (TRN_ROTATION — within company) ต้องผ่าน', () => {
    const validTransfer = {
      step1: { selectedEmployee: validActiveEmployee },
      step2: { transferReason: 'TRN_ROTATION' as const },
      step3: { effectiveDate: '2026-06-01' },
      step4: {
        businessUnit: '20000000',
        department: '',
        position: 'ผู้ประสานงาน',
        costCenter: '',
        jobCode: '',
        location: '',
      },
      step5: { carryOverCompensation: true, newBaseSalary: null },
      step6: {},
    }

    const result = transferSchema.safeParse(validTransfer)
    expect(result.success).toBe(true)
  })

  it('transferSchema ต้อง reject employee ที่ status=Terminated (step1 refine)', () => {
    const invalidTransfer = {
      step1: { selectedEmployee: validMockEmployee }, // validMockEmployee เป็น Terminated
      step2: { transferReason: 'TRN_ROTATION' as const },
      step3: { effectiveDate: '2026-06-01' },
      step4: { businessUnit: '10000000', department: '', position: 'ผู้ประสานงาน', costCenter: '', jobCode: '', location: '' },
      step5: { carryOverCompensation: true, newBaseSalary: null },
      step6: {},
    }

    const result = transferSchema.safeParse(invalidTransfer)
    expect(result.success).toBe(false)
  })
})

// =========================================================
// TERMINATE SCHEMA — 17 TERM codes + lastDayWorked <= endDate
// =========================================================

describe('terminateSchema — event code validation', () => {
  it('TERM_RESIGN (code ถูกต้อง) ต้องผ่าน', () => {
    const valid = {
      step1: { selectedEmployee: validActiveEmployee },
      step2: {
        termReason: 'TERM_RESIGN' as const,
        lastDayWorked: '2026-06-30',
        effectiveEndDate: '2026-06-30',
      },
      step3: { okToRehire: true, termComments: '' },
      step4: {},
      step5: {},
    }

    const result = terminateSchema.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it('TERM_RETIRE ต้องผ่าน', () => {
    const valid = {
      step1: { selectedEmployee: validActiveEmployee },
      step2: {
        termReason: 'TERM_RETIRE' as const,
        lastDayWorked: '2026-04-30',
        effectiveEndDate: '2026-04-30',
      },
      step3: { okToRehire: false, termComments: 'เกษียณอายุ' },
      step4: {},
      step5: {},
    }

    const result = terminateSchema.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it('TERM_REDUNDANCY ต้องผ่าน (ตรวจสอบ edge code)', () => {
    const valid = {
      step1: { selectedEmployee: validActiveEmployee },
      step2: {
        termReason: 'TERM_REDUNDANCY' as const,
        lastDayWorked: '2026-05-31',
        effectiveEndDate: '2026-05-31',
      },
      step3: { okToRehire: true, termComments: '' },
      step4: {},
      step5: {},
    }

    const result = terminateSchema.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it('TERMINATION_EVENT_REASONS ต้องมีครบ 17 codes', () => {
    // ตรวจสอบ array ว่ามี 17 items ตรงกับ BRD Appendix 2 (event=5597)
    expect(TERMINATION_EVENT_REASONS.length).toBe(17)
  })

  it('event code ไม่รู้จัก ต้อง fail', () => {
    const invalid = {
      step1: { selectedEmployee: validActiveEmployee },
      step2: {
        termReason: 'TERM_UNKNOWN_CODE', // ไม่มีใน enum
        lastDayWorked: '2026-06-30',
        effectiveEndDate: '2026-06-30',
      },
      step3: { okToRehire: true, termComments: '' },
      step4: {},
      step5: {},
    }

    const result = terminateSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })

  it('lastDayWorked ว่าง ต้อง fail (AC-11: required field)', () => {
    const invalid = {
      step1: { selectedEmployee: validActiveEmployee },
      step2: {
        termReason: 'TERM_RESIGN' as const,
        lastDayWorked: '', // ว่าง — ต้อง fail
        effectiveEndDate: '2026-06-30',
      },
      step3: { okToRehire: true, termComments: '' },
      step4: {},
      step5: {},
    }

    const result = terminateSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })

  it('terminateSchema: missing okToRehire ต้อง fail (boolean required — ไม่มี default)', () => {
    const invalid = {
      step1: { selectedEmployee: validActiveEmployee },
      step2: {
        termReason: 'TERM_RESIGN' as const,
        lastDayWorked: '2026-06-30',
        effectiveEndDate: '2026-06-30',
      },
      step3: {
        // okToRehire หายไป
        termComments: '',
      },
      step4: {},
      step5: {},
    }

    const result = terminateSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })

  it('terminateSchema ต้อง reject employee ที่ status=Terminated (step1 refine)', () => {
    const invalid = {
      step1: { selectedEmployee: validMockEmployee }, // Terminated
      step2: {
        termReason: 'TERM_RESIGN' as const,
        lastDayWorked: '2026-06-30',
        effectiveEndDate: '2026-06-30',
      },
      step3: { okToRehire: true, termComments: '' },
      step4: {},
      step5: {},
    }

    const result = terminateSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })
})
