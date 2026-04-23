// mockEmployees.test.ts — Unit tests สำหรับ fixture data integrity
// ตรวจสอบ: row count, status distribution, edge cases, nationalId format
// Part B Wave 1 — [part-b-wave1-tests]

import { describe, it, expect } from 'vitest'
import employees from '@/data/admin/mockEmployees.json'
import { mockEmployeeSchema } from '@/lib/admin/validation/lifecycleSchema'
import { classifyRehireReason } from '@/lib/admin/utils/classifyRehireReason'

// =========================================================
// Row count
// =========================================================

describe('mockEmployees — row count', () => {
  it('ต้องมีพนักงานทั้งหมด 20 คน', () => {
    expect(employees.length).toBe(20)
  })
})

// =========================================================
// Status distribution
// =========================================================

describe('mockEmployees — status distribution', () => {
  it('ต้องมี Active 15 คน + Terminated 5 คน', () => {
    const active = employees.filter((e) => e.status === 'Active')
    const terminated = employees.filter((e) => e.status === 'Terminated')

    expect(active.length).toBe(15)
    expect(terminated.length).toBe(5)
  })
})

// =========================================================
// Edge cases — LT1/GE1 distribution และ okToRehire
// =========================================================

describe('mockEmployees — edge cases Terminated employees', () => {
  // วันที่ที่ใช้ใน test สอดคล้องกับข้อมูลที่ออกแบบ (2026-04-23)
  const TODAY = '2026-04-23'

  it('Terminated ที่ lastTermDate < 365 วัน ต้องมีอย่างน้อย 2 คน (LT1 segment)', () => {
    // EMP0016 lastTermDate=2026-01-23 (~89 วัน) — LT1
    // EMP0017 lastTermDate=2026-02-15 (~67 วัน) — LT1
    const terminatedWithDate = employees.filter(
      (e) => e.status === 'Terminated' && e.lastTermDate
    )

    const lt1Count = terminatedWithDate.filter((e) => {
      const code = classifyRehireReason(e.lastTermDate!, TODAY)
      return code === 'RE_REHIRE_LT1'
    }).length

    expect(lt1Count).toBeGreaterThanOrEqual(2)
  })

  it('Terminated ที่ lastTermDate >= 365 วัน ต้องมีอย่างน้อย 2 คน (GE1 segment)', () => {
    // EMP0018 lastTermDate=2025-04-10 (~378 วัน) — GE1
    // EMP0019 lastTermDate=2024-12-01 (~508 วัน) — GE1
    const terminatedWithDate = employees.filter(
      (e) => e.status === 'Terminated' && e.lastTermDate
    )

    const ge1Count = terminatedWithDate.filter((e) => {
      const code = classifyRehireReason(e.lastTermDate!, TODAY)
      return code === 'RE_REHIRE_GE1'
    }).length

    expect(ge1Count).toBeGreaterThanOrEqual(2)
  })

  it('ต้องมีพนักงาน okToRehire=false อย่างน้อย 1 คน (EMP0020)', () => {
    // edge case: HR ต้องเห็น warning ก่อน proceed
    const notOkToRehire = employees.filter((e) => e.okToRehire === false)
    expect(notOkToRehire.length).toBeGreaterThanOrEqual(1)

    // ตรวจว่า EMP0020 เป็น Terminated
    const emp0020 = notOkToRehire.find((e) => e.externalCode === 'EMP0020')
    expect(emp0020).toBeDefined()
    expect(emp0020?.status).toBe('Terminated')
  })
})

// =========================================================
// nationalId format — 13 digits
// =========================================================

describe('mockEmployees — nationalId format', () => {
  it('ทุก externalCode ต้องมี nationalId เป็นตัวเลข 13 หลัก', () => {
    const nationalIdRegex = /^[0-9]{13}$/

    const invalid = employees.filter((e) => !nationalIdRegex.test(e.nationalId))

    // รายงาน externalCode ที่ fail เพื่อ debug ง่าย
    expect(invalid.map((e) => e.externalCode)).toEqual([])
  })

  it('ทุก row ต้องผ่าน mockEmployeeSchema (Zod validation)', () => {
    // ตรวจสอบครบทุก field ผ่าน schema จริง
    employees.forEach((emp) => {
      const result = mockEmployeeSchema.safeParse(emp)
      if (!result.success) {
        // แสดง error detail เมื่อ fail เพื่อ debug
        console.error(`[mockEmployees] ${emp.externalCode} fail schema:`, result.error.flatten())
      }
      expect(result.success).toBe(true)
    })
  })
})
