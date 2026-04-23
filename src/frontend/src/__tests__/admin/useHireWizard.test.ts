// useHireWizard.test.ts — Unit tests สำหรับ Zustand store
// ครอบคลุม AC-5 (gating), AC-6 (sequential unlock), AC-8 (state persistence)

import { describe, it, expect, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'

// helper: reset store ก่อนทุก test เพื่อ isolation
beforeEach(() => {
  act(() => {
    useHireWizard.getState().reset()
  })
})

describe('useHireWizard — initial state', () => {
  it('ต้องเริ่มต้นที่ currentStep=1, maxUnlockedStep=1, formData ว่างทั้งหมด', () => {
    // AC-3: wizard เริ่มที่ Step 1
    const { result } = renderHook(() => useHireWizard())

    expect(result.current.currentStep).toBe(1)
    expect(result.current.maxUnlockedStep).toBe(1)

    // formData ทุก field ต้องเป็น null หรือ empty string (ไม่มีข้อมูลค้าง)
    const { identity, name, biographical, employeeInfo, nationalId, personal, job, compensation } =
      result.current.formData

    expect(identity.hireDate).toBeNull()
    expect(identity.companyCode).toBeNull()
    expect(identity.eventReason).toBeNull()
    expect(name.firstNameTh).toBe('')
    expect(name.lastNameTh).toBe('')
    expect(biographical.dateOfBirth).toBeNull()
    expect(employeeInfo.employeeClass).toBeNull()
    expect(nationalId.value).toBe('')
    expect(personal.addressLine1).toBe('')
    expect(job.position).toBe('')
    expect(job.businessUnit).toBeNull()
    expect(compensation.baseSalary).toBeNull()
  })
})

describe('useHireWizard — isStepValid', () => {
  it('isStepValid(1) เป็น false ถ้า identity fields ว่าง', () => {
    // AC-5: Step 1 ยังไม่ valid ถ้า fields ว่าง
    const { result } = renderHook(() => useHireWizard())
    expect(result.current.isStepValid(1)).toBe(false)
  })

  it('isStepValid(1) เป็น true เมื่อ set ครบ 3 fields', () => {
    // AC-4, AC-5: Step 1 valid หลังกรอกครบ hireDate + companyCode + eventReason
    const { result } = renderHook(() => useHireWizard())

    act(() => {
      result.current.setStepData('identity', {
        hireDate: '2026-05-01',
        companyCode: 'CEN',
        eventReason: 'H_NEWHIRE',
      })
    })

    expect(result.current.isStepValid(1)).toBe(true)
  })

  it('isStepValid(1) เป็น false ถ้าขาด 1 field (partial fill)', () => {
    // กรอกแค่ 2 fields จาก 3 — ยังไม่ valid
    const { result } = renderHook(() => useHireWizard())

    act(() => {
      result.current.setStepData('identity', {
        hireDate: '2026-05-01',
        companyCode: 'CEN',
        // ไม่กรอก eventReason
      })
    })

    expect(result.current.isStepValid(1)).toBe(false)
  })
})

describe('useHireWizard — jumpTo gating', () => {
  it('jumpTo(step > maxUnlockedStep) ต้องไม่เปลี่ยน currentStep', () => {
    // AC-5: ป้องกัน navigation ไปยัง step ที่ยังล็อคอยู่
    const { result } = renderHook(() => useHireWizard())

    act(() => {
      result.current.jumpTo(3) // maxUnlockedStep = 1, ต้อง reject
    })

    // currentStep ต้องยังเป็น 1
    expect(result.current.currentStep).toBe(1)
    expect(result.current.maxUnlockedStep).toBe(1)
  })

  it('jumpTo(1) ต้องทำงานได้ (step ที่ unlock แล้ว)', () => {
    // jumpTo step ที่ unlock แล้ว — ต้องสำเร็จ
    const { result } = renderHook(() => useHireWizard())

    act(() => {
      result.current.jumpTo(1)
    })

    expect(result.current.currentStep).toBe(1)
  })
})

describe('useHireWizard — goNext และ sequential unlock', () => {
  it('goNext() ขณะ Step 1 valid → currentStep=2, maxUnlockedStep=2', () => {
    // AC-6: กด Next หลัง Step 1 valid → ปลดล็อค Step 2
    const { result } = renderHook(() => useHireWizard())

    act(() => {
      result.current.setStepData('identity', {
        hireDate: '2026-05-01',
        companyCode: 'CEN',
        eventReason: 'H_NEWHIRE',
      })
    })

    act(() => {
      result.current.goNext()
    })

    expect(result.current.currentStep).toBe(2)
    expect(result.current.maxUnlockedStep).toBe(2)
  })

  it('goNext() ขณะ Step 1 ไม่ valid → ไม่เปลี่ยน step', () => {
    // AC-5: Next blocked ถ้า step ยังไม่ valid
    const { result } = renderHook(() => useHireWizard())
    // ไม่กรอกอะไรเลย — formData ว่าง

    act(() => {
      result.current.goNext()
    })

    expect(result.current.currentStep).toBe(1)
    expect(result.current.maxUnlockedStep).toBe(1)
  })
})

describe('useHireWizard — state persistence (AC-8)', () => {
  it('formData ยังคงอยู่หลัง goNext() แล้ว goBack()', () => {
    // AC-8: กด Next แล้ว Back — ข้อมูล Step 1 ต้องยังอยู่
    const { result } = renderHook(() => useHireWizard())

    act(() => {
      result.current.setStepData('identity', {
        hireDate: '2026-05-01',
        companyCode: 'CEN',
        eventReason: 'H_NEWHIRE',
      })
      result.current.goNext() // ไป Step 2
    })

    act(() => {
      result.current.goBack() // กลับ Step 1
    })

    // ข้อมูล identity ต้องยังอยู่
    expect(result.current.currentStep).toBe(1)
    expect(result.current.formData.identity.hireDate).toBe('2026-05-01')
    expect(result.current.formData.identity.companyCode).toBe('CEN')
    expect(result.current.formData.identity.eventReason).toBe('H_NEWHIRE')
  })

  it('setStepData merge ไม่ replace — field อื่นต้องยังอยู่', () => {
    // ตรวจสอบ partial update — setStepData ต้อง merge
    const { result } = renderHook(() => useHireWizard())

    act(() => {
      result.current.setStepData('identity', { hireDate: '2026-05-01' })
    })
    act(() => {
      result.current.setStepData('identity', { companyCode: 'CEN' })
    })

    // hireDate ต้องยังอยู่หลัง update companyCode
    expect(result.current.formData.identity.hireDate).toBe('2026-05-01')
    expect(result.current.formData.identity.companyCode).toBe('CEN')
  })
})
