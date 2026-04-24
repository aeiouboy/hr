// useProfileEdit.test.ts — Unit tests สำหรับ ESS Profile Edit Zustand store
// ครอบคลุม state transitions, submit flow, persist partialize (BRD #166)

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useProfileEdit, type ProfileEditData } from '@/lib/admin/store/useProfileEdit'

const SAMPLE_EMPLOYEE: ProfileEditData = {
  firstNameTh: 'ชงรัก',
  lastNameTh: 'ธนะ',
  firstNameEn: 'Chongrak',
  lastNameEn: 'Thana',
  dateOfBirth: '1989-01-01',
  address: '555/24 สมุทรปราการ',
  emergencyContactName: 'ชัยชนะ เทพย์ตุ้มเขา',
  emergencyContactPhone: '0865254197',
}

// reset store + clear persist storage ก่อนทุก test — ป้องกัน localStorage leak
beforeEach(() => {
  localStorage.clear()
  act(() => {
    useProfileEdit.getState().reset()
  })
})

describe('useProfileEdit — initial state', () => {
  it('draft ต้องว่างทุก field, isDirty=false, isSubmitting=false', () => {
    const { result } = renderHook(() => useProfileEdit())

    expect(result.current.draft.firstNameTh).toBe('')
    expect(result.current.draft.lastNameTh).toBe('')
    expect(result.current.draft.firstNameEn).toBe('')
    expect(result.current.draft.lastNameEn).toBe('')
    expect(result.current.draft.dateOfBirth).toBe('')
    expect(result.current.draft.address).toBe('')
    expect(result.current.draft.emergencyContactName).toBe('')
    expect(result.current.draft.emergencyContactPhone).toBe('')
    expect(result.current.isDirty).toBe(false)
    expect(result.current.isSubmitting).toBe(false)
  })
})

describe('useProfileEdit — setField', () => {
  it('setField แก้ไข field เดียวและตั้ง isDirty=true', () => {
    const { result } = renderHook(() => useProfileEdit())

    act(() => {
      result.current.setField('firstNameTh', 'สมชาย')
    })

    expect(result.current.draft.firstNameTh).toBe('สมชาย')
    // field อื่นต้องไม่ถูกแตะ
    expect(result.current.draft.lastNameTh).toBe('')
    expect(result.current.isDirty).toBe(true)
  })

  it('setField ต่อเนื่องหลาย field — draft อัปเดตสะสม', () => {
    const { result } = renderHook(() => useProfileEdit())

    act(() => {
      result.current.setField('firstNameTh', 'สมชาย')
      result.current.setField('lastNameTh', 'ใจดี')
      result.current.setField('emergencyContactPhone', '0812345678')
    })

    expect(result.current.draft.firstNameTh).toBe('สมชาย')
    expect(result.current.draft.lastNameTh).toBe('ใจดี')
    expect(result.current.draft.emergencyContactPhone).toBe('0812345678')
    expect(result.current.isDirty).toBe(true)
  })
})

describe('useProfileEdit — loadFromEmployee', () => {
  it('loadFromEmployee ตั้ง draft ตามข้อมูลพนักงานและ reset isDirty=false', () => {
    const { result } = renderHook(() => useProfileEdit())

    // จงใจทำให้ dirty ก่อน แล้ว load ใหม่ → isDirty ต้องกลับเป็น false
    act(() => {
      result.current.setField('firstNameTh', 'ของเก่า')
    })
    expect(result.current.isDirty).toBe(true)

    act(() => {
      result.current.loadFromEmployee(SAMPLE_EMPLOYEE)
    })

    expect(result.current.draft).toEqual(SAMPLE_EMPLOYEE)
    expect(result.current.isDirty).toBe(false)
  })
})

describe('useProfileEdit — submit flow', () => {
  it('submit สำเร็จ — flip isSubmitting + reset isDirty หลัง resolve', async () => {
    const { result } = renderHook(() => useProfileEdit())

    act(() => {
      result.current.loadFromEmployee(SAMPLE_EMPLOYEE)
      result.current.setField('address', '123 ที่อยู่ใหม่')
    })
    expect(result.current.isDirty).toBe(true)

    // silence console.log ใน submit
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await act(async () => {
      await result.current.submit()
    })

    expect(result.current.isSubmitting).toBe(false)
    expect(result.current.isDirty).toBe(false)
    // payload ต้อง log พร้อม requestType + employeeId + draft
    expect(logSpy).toHaveBeenCalledWith(
      '[useProfileEdit] submit payload:',
      expect.objectContaining({
        requestType: 'PERSONAL_INFO_UPDATE',
        employeeId: 'E001',
        data: expect.objectContaining({ address: '123 ที่อยู่ใหม่' }),
      })
    )

    logSpy.mockRestore()
  })

  it('submit ต้องตั้ง isSubmitting=true ระหว่างรัน', async () => {
    const { result } = renderHook(() => useProfileEdit())
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    let submitPromise: Promise<string | null>
    act(() => {
      submitPromise = result.current.submit()
    })

    // หลังเริ่ม submit แต่ก่อน resolve → isSubmitting ต้อง true
    expect(result.current.isSubmitting).toBe(true)

    await act(async () => {
      await submitPromise!
    })

    expect(result.current.isSubmitting).toBe(false)
    logSpy.mockRestore()
  })
})

describe('useProfileEdit — reset', () => {
  it('reset กลับ initial state ทุก field', () => {
    const { result } = renderHook(() => useProfileEdit())

    act(() => {
      result.current.loadFromEmployee(SAMPLE_EMPLOYEE)
      result.current.setField('firstNameTh', 'เปลี่ยนแล้ว')
    })
    expect(result.current.draft.firstNameTh).toBe('เปลี่ยนแล้ว')
    expect(result.current.isDirty).toBe(true)

    act(() => {
      result.current.reset()
    })

    expect(result.current.draft.firstNameTh).toBe('')
    expect(result.current.draft.address).toBe('')
    expect(result.current.isDirty).toBe(false)
    expect(result.current.isSubmitting).toBe(false)
  })
})

describe('useProfileEdit — persist', () => {
  it('draft + isDirty ต้องถูก persist ลง localStorage (key=ess-profile-edit-draft)', () => {
    const { result } = renderHook(() => useProfileEdit())

    act(() => {
      result.current.setField('firstNameTh', 'ทดสอบ Persist')
    })

    const stored = localStorage.getItem('ess-profile-edit-draft')
    expect(stored).not.toBeNull()

    const parsed = JSON.parse(stored!)
    expect(parsed.state.draft.firstNameTh).toBe('ทดสอบ Persist')
    expect(parsed.state.isDirty).toBe(true)
    // isSubmitting ต้องไม่อยู่ใน persist (partialize กรองออก)
    expect(parsed.state.isSubmitting).toBeUndefined()
  })
})
