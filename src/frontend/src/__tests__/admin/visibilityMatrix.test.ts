// visibilityMatrix.test.ts — Unit tests สำหรับ pure utility functions
// ครอบคลุม toggleCell / countEnabled / validateMatrix / ALL_ROLES constant

import { describe, it, expect } from 'vitest'
import {
  ALL_ROLES,
  toggleCell,
  countEnabled,
  validateMatrix,
} from '@/lib/admin/utils/visibilityMatrix'
import type { VisibilityMatrix } from '@/lib/admin/types/adminSelfService'

// helper: build a full matrix row ครบ 4 roles
function row(e: boolean, m: boolean, h: boolean, s: boolean) {
  return { Employee: e, Manager: m, HRBP: h, SPD: s }
}

describe('ALL_ROLES', () => {
  it('ต้องมีครบ 4 roles ตาม BRD #184 verbatim', () => {
    // ห้าม invent role อื่น (Rule C8)
    expect(ALL_ROLES).toEqual(['Employee', 'Manager', 'HRBP', 'SPD'])
    expect(ALL_ROLES).toHaveLength(4)
  })
})

describe('toggleCell', () => {
  it('flip true → false สำหรับ cell ที่กำหนด', () => {
    const matrix: VisibilityMatrix = {
      national_id: row(true, true, true, true),
    }
    const next = toggleCell(matrix, 'national_id', 'Manager')
    expect(next.national_id.Manager).toBe(false)
  })

  it('flip false → true สำหรับ cell ที่กำหนด', () => {
    const matrix: VisibilityMatrix = {
      base_salary: row(false, false, true, true),
    }
    const next = toggleCell(matrix, 'base_salary', 'Employee')
    expect(next.base_salary.Employee).toBe(true)
  })

  it('immutable — ไม่แก้ matrix ต้นฉบับ', () => {
    const matrix: VisibilityMatrix = {
      gender: row(true, false, true, false),
    }
    const snapshot = JSON.stringify(matrix)
    toggleCell(matrix, 'gender', 'Manager')
    // ต้นฉบับต้องเหมือนเดิม
    expect(JSON.stringify(matrix)).toBe(snapshot)
  })

  it('ไม่กระทบ role อื่นใน row เดียวกัน', () => {
    const matrix: VisibilityMatrix = {
      hire_date: row(true, true, true, true),
    }
    const next = toggleCell(matrix, 'hire_date', 'Manager')
    expect(next.hire_date.Employee).toBe(true)
    expect(next.hire_date.HRBP).toBe(true)
    expect(next.hire_date.SPD).toBe(true)
    expect(next.hire_date.Manager).toBe(false)
  })

  it('ไม่กระทบ row อื่นใน matrix', () => {
    const matrix: VisibilityMatrix = {
      first_name_th: row(true, true, true, true),
      last_name_th:  row(true, true, true, true),
    }
    const next = toggleCell(matrix, 'first_name_th', 'Employee')
    // last_name_th ต้องไม่เปลี่ยน + reference เดียวกัน (shallow copy เฉพาะ row เป้าหมาย)
    expect(next.last_name_th).toBe(matrix.last_name_th)
  })

  it('fieldId ที่ยังไม่มีใน matrix — สร้าง row ใหม่พร้อม role เดียว', () => {
    const matrix: VisibilityMatrix = {}
    const next = toggleCell(matrix, 'new_field', 'HRBP')
    // role ที่ toggle: undefined → !undefined === true
    expect(next.new_field.HRBP).toBe(true)
    // role อื่นใน row นี้ยังเป็น undefined
    expect(next.new_field.Employee).toBeUndefined()
    expect(next.new_field.Manager).toBeUndefined()
    expect(next.new_field.SPD).toBeUndefined()
  })

  it('toggle 2 ครั้งต้องกลับมาเหมือนเดิม (round-trip)', () => {
    const matrix: VisibilityMatrix = {
      phone_number: row(true, true, true, false),
    }
    const once  = toggleCell(matrix, 'phone_number', 'SPD')
    const twice = toggleCell(once, 'phone_number', 'SPD')
    expect(twice.phone_number).toEqual(matrix.phone_number)
  })
})

describe('countEnabled', () => {
  it('นับจำนวน cell ที่เป็น true สำหรับ role ที่ระบุ', () => {
    const matrix: VisibilityMatrix = {
      a: row(true,  false, true,  true),
      b: row(false, true,  true,  false),
      c: row(true,  true,  false, true),
    }
    expect(countEnabled(matrix, 'Employee')).toBe(2) // a, c
    expect(countEnabled(matrix, 'Manager')).toBe(2)  // b, c
    expect(countEnabled(matrix, 'HRBP')).toBe(2)     // a, b
    expect(countEnabled(matrix, 'SPD')).toBe(2)      // a, c
  })

  it('คืน 0 เมื่อไม่มี cell ที่ enable สำหรับ role', () => {
    const matrix: VisibilityMatrix = {
      a: row(false, false, false, false),
      b: row(false, false, false, false),
    }
    expect(countEnabled(matrix, 'HRBP')).toBe(0)
  })

  it('คืน 0 สำหรับ empty matrix', () => {
    expect(countEnabled({}, 'Employee')).toBe(0)
  })

  it('นับเฉพาะ strict true — undefined/null/truthy-non-boolean ไม่นับ', () => {
    const matrix: VisibilityMatrix = {
      a: row(true,  true, true, true),
      // row ที่ไม่มี key Manager (undefined) — strict equality ไม่นับ
      b: { Employee: true } as never,
    }
    // Manager: เฉพาะ row a ที่มี true → 1
    expect(countEnabled(matrix, 'Manager')).toBe(1)
  })
})

describe('validateMatrix', () => {
  it('คืน true เมื่อทุก row มีครบ 4 roles เป็น boolean', () => {
    const matrix: VisibilityMatrix = {
      first_name: row(true, false, true, false),
      last_name:  row(false, true, false, true),
    }
    expect(validateMatrix(matrix)).toBe(true)
  })

  it('คืน true สำหรับ empty matrix (vacuous truth — ไม่มี row ให้ invalid)', () => {
    expect(validateMatrix({})).toBe(true)
  })

  it('คืน false เมื่อ row ขาด role บางตัว', () => {
    const broken = {
      a: { Employee: true, Manager: false, HRBP: true } as never,
    }
    expect(validateMatrix(broken)).toBe(false)
  })

  it('คืน false เมื่อ value ไม่ใช่ boolean', () => {
    const broken = {
      a: { Employee: true, Manager: false, HRBP: 'yes', SPD: true } as never,
    }
    expect(validateMatrix(broken)).toBe(false)
  })

  it('คืน false เมื่อ row เดียวพังในจำนวนหลาย rows', () => {
    const matrix = {
      ok:     row(true, true, true, true),
      broken: { Employee: true, Manager: false, HRBP: true } as never, // missing SPD
    }
    expect(validateMatrix(matrix)).toBe(false)
  })
})
