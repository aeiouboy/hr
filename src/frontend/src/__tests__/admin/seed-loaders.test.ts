// seed-loaders.test.ts — Unit tests สำหรับ seed loader functions
// ครอบคลุม AC-4: ข้อมูลเพียงพอสำหรับ Company typeahead + Event Reason dropdown + BU dropdown

import { describe, it, expect } from 'vitest'
import { loadCompanies } from '@/lib/admin/store/loadCompanies'
import { loadEventReasons } from '@/lib/admin/store/loadEventReasons'
import { loadBusinessUnits } from '@/lib/admin/store/loadBusinessUnits'

// รายการ externalCodes ที่ถูกต้องสำหรับ HIRE event reasons (จาก Appendix 2)
const EXPECTED_HIRE_CODES = [
  'H_NEWHIRE',
  'H_RPLMENT',
  'H_TEMPASG',
  'HIREDM',
  'H_CORENTRY',
  'H_INENTRY',
]

describe('loadCompanies', () => {
  it('ต้องคืน 164 รายการ', () => {
    // AC-4: Company typeahead ต้องมีตัวเลือก 164 รายการ
    const companies = loadCompanies()
    expect(companies).toHaveLength(164)
  })

  it('แต่ละรายการต้องมี shape: { code, labelEn, labelTh, country }', () => {
    // ตรวจสอบ normalize shape ตาม spec §3
    const companies = loadCompanies()
    const first = companies[0]
    expect(first).toHaveProperty('code')
    expect(first).toHaveProperty('labelEn')
    expect(first).toHaveProperty('labelTh')
    expect(first).toHaveProperty('country')
    // code ต้องไม่ว่าง
    expect(typeof first.code).toBe('string')
    expect(first.code.length).toBeGreaterThan(0)
  })

  it('ต้องไม่มี duplicate externalCode', () => {
    // ตรวจสอบ data integrity — code ต้องไม่ซ้ำ
    const companies = loadCompanies()
    const codes = companies.map((c) => c.code)
    const uniqueCodes = new Set(codes)
    expect(uniqueCodes.size).toBe(codes.length)
  })
})

describe('loadEventReasons', () => {
  it('ต้องคืนเฉพาะ HIRE event reasons — 6 รายการ', () => {
    // AC-4: Event Reason dropdown ต้องมีตัวเลือก 6 รายการ (filter event=5609)
    const reasons = loadEventReasons()
    expect(reasons).toHaveLength(6)
  })

  it('externalCodes ต้องตรงกับ Appendix 2 verbatim', () => {
    // ตรวจสอบ externalCodes ตาม spec Appendix 2 — ห้าม invent (C8)
    const reasons = loadEventReasons()
    const codes = reasons.map((r) => r.code)
    // ตรวจสอบว่ามีครบทุก code ที่กำหนด
    for (const expected of EXPECTED_HIRE_CODES) {
      expect(codes).toContain(expected)
    }
    // ตรวจสอบว่าไม่มี code นอกเหนือจากที่กำหนด
    expect(codes.sort()).toEqual([...EXPECTED_HIRE_CODES].sort())
  })

  it('แต่ละรายการต้องมี shape: { code, name, emplStatus }', () => {
    // ตรวจสอบ shape ที่ใช้ใน UI
    const reasons = loadEventReasons()
    for (const reason of reasons) {
      expect(reason).toHaveProperty('code')
      expect(reason).toHaveProperty('name')
      expect(reason).toHaveProperty('emplStatus')
      expect(typeof reason.code).toBe('string')
      expect(reason.code.length).toBeGreaterThan(0)
    }
  })
})

describe('loadBusinessUnits', () => {
  it('ต้องคืน 44 รายการ', () => {
    // ข้อมูล BU สำหรับ Step 7 — 44 options ตาม spec §3
    const bus = loadBusinessUnits()
    expect(bus).toHaveLength(44)
  })

  it('แต่ละรายการต้องมี shape: { code, labelEn, labelTh }', () => {
    // ตรวจสอบ normalize shape
    const bus = loadBusinessUnits()
    const first = bus[0]
    expect(first).toHaveProperty('code')
    expect(first).toHaveProperty('labelEn')
    expect(first).toHaveProperty('labelTh')
    expect(typeof first.code).toBe('string')
    expect(first.code.length).toBeGreaterThan(0)
  })
})
