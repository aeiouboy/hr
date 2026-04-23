// useAdminSelfService.test.ts — Unit tests สำหรับ Admin Self-Service Zustand store (Part C)
// 8 smoke tests ครอบคลุม AC-6, AC-7, AC-8 (lifecycle: draft/publish/reset + audit)

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useAdminSelfService } from '@/lib/admin/store/useAdminSelfService'

// mock localStorage ก่อนทุก test — isolate side effects
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: vi.fn(() => { store = {} }),
  }
})()

// ใส่ localStorage mock ก่อน import store (เพราะ zustand/persist อ่าน localStorage ตอน init)
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true })

// reset store + localStorage ก่อนทุก test เพื่อ isolation
beforeEach(() => {
  localStorageMock.clear()
  vi.clearAllMocks()
  act(() => {
    // reset draft กลับเป็น published (= seed defaults)
    useAdminSelfService.getState().resetDraft()
    // reset isDirty
    useAdminSelfService.setState({ isDirty: false, currentEditor: null })
  })
})

// Test 1: initial state — draft equals published equals seed defaults
describe('useAdminSelfService — initial state', () => {
  it('draft และ published ต้องเริ่มต้นเท่ากัน และ isDirty=false', () => {
    const { result } = renderHook(() => useAdminSelfService())
    const { draft, published, isDirty, currentEditor } = result.current

    // ทั้งสองต้องมี fieldConfig ครบ 15 entries (ตาม seed)
    expect(draft.fieldConfig).toHaveLength(15)
    expect(published.fieldConfig).toHaveLength(15)

    // draft.visibility ต้องมี key เท่ากับ published.visibility
    expect(Object.keys(draft.visibility)).toEqual(Object.keys(published.visibility))

    // isDirty ต้องเป็น false เมื่อยังไม่มีการแก้ไข
    expect(isDirty).toBe(false)

    // currentEditor ต้องเป็น null เริ่มต้น
    expect(currentEditor).toBeNull()
  })
})

// Test 2: setVisibility → isDirty=true
describe('useAdminSelfService — setVisibility', () => {
  it('setVisibility เปลี่ยน draft.visibility และ set isDirty=true', () => {
    const { result } = renderHook(() => useAdminSelfService())

    // อ่านค่าเดิม
    const originalValue = result.current.draft.visibility['national_id']?.['Manager']

    act(() => {
      result.current.setVisibility('national_id', 'Manager', !originalValue)
    })

    // draft ต้องเปลี่ยน
    expect(result.current.draft.visibility['national_id']['Manager']).toBe(!originalValue)
    // isDirty ต้องเป็น true
    expect(result.current.isDirty).toBe(true)
    // published ต้องไม่เปลี่ยน (immutable)
    expect(result.current.published.visibility['national_id']['Manager']).toBe(originalValue)
  })
})

// Test 3: saveDraft → localStorage write
describe('useAdminSelfService — saveDraft', () => {
  it('saveDraft ต้อง write ลง localStorage key admin-ss-draft-v1', () => {
    const { result } = renderHook(() => useAdminSelfService())

    // แก้ draft ก่อน
    act(() => {
      result.current.setVisibility('gender', 'SPD', true)
    })

    act(() => {
      result.current.saveDraft()
    })

    // localStorage.setItem ต้องถูกเรียก
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'admin-ss-draft-v1',
      expect.any(String)
    )

    // JSON ที่ save ต้องมี visibility key
    const savedRaw = localStorageMock.setItem.mock.calls.find(
      (c) => c[0] === 'admin-ss-draft-v1'
    )
    expect(savedRaw).toBeDefined()
    const saved = JSON.parse(savedRaw![1])
    expect(saved).toHaveProperty('visibility')
  })
})

// Test 4: publish → copy draft to published + push audit entry + reset isDirty
describe('useAdminSelfService — publish', () => {
  it('publish ต้อง copy draft → published, push audit entry, และ reset isDirty=false', () => {
    const { result } = renderHook(() => useAdminSelfService())

    // แก้ draft ก่อน
    act(() => {
      result.current.setVisibility('gender', 'Employee', false)
    })
    expect(result.current.isDirty).toBe(true)

    // publish
    act(() => {
      result.current.publish('visibility')
    })

    // published ต้องมีค่าเดียวกับ draft ที่แก้ไว้
    expect(result.current.published.visibility['gender']['Employee']).toBe(false)
    // isDirty ต้องกลับเป็น false
    expect(result.current.isDirty).toBe(false)
    // audit ต้องมี entry ≥ 1 และ ≤ 10 (limitAudit keeps last 10)
    expect(result.current.audit.length).toBeGreaterThanOrEqual(1)
    expect(result.current.audit.length).toBeLessThanOrEqual(10)
    // entry ล่าสุดต้องมี editor ถูกต้อง
    const latestEntry = result.current.audit[result.current.audit.length - 1]
    expect(latestEntry.editor).toBe('visibility')
    expect(latestEntry.action).toBe('Published visibility')
  })
})

// Test 5: resetDraft → draft reset to published
describe('useAdminSelfService — resetDraft', () => {
  it('resetDraft ต้องคืน draft กลับเป็น published และ isDirty=false', () => {
    const { result } = renderHook(() => useAdminSelfService())

    // แก้ draft
    act(() => {
      result.current.setMandatory('hire_date', 'Employee', false)
    })
    expect(result.current.isDirty).toBe(true)
    // ยืนยัน draft ต่างจาก published
    expect(result.current.draft.mandatory['hire_date']['Employee']).toBe(false)

    // reset
    act(() => {
      result.current.resetDraft()
    })

    // draft ต้องกลับเป็น published
    expect(result.current.draft.mandatory['hire_date']['Employee']).toBe(
      result.current.published.mandatory['hire_date']['Employee']
    )
    // isDirty ต้องเป็น false
    expect(result.current.isDirty).toBe(false)
  })
})

// Test 6: publish pushes new audit entry (distinct from Test 4 — tests audit content)
describe('useAdminSelfService — publish audit accumulation', () => {
  it('publish 2 ครั้ง entries ล่าสุด 2 ตัวต้องมี editor ถูกต้อง', () => {
    const { result } = renderHook(() => useAdminSelfService())

    act(() => {
      result.current.setReadOnly('base_salary', 'Employee', false)
      result.current.publish('readonly')
    })

    act(() => {
      result.current.setQuickActions([...result.current.draft.quickActions])
      result.current.publish('quick-actions')
    })

    // audit ต้องอยู่ใน range 1-10 เสมอ (limitAudit)
    expect(result.current.audit.length).toBeGreaterThanOrEqual(1)
    expect(result.current.audit.length).toBeLessThanOrEqual(10)
    // entries ล่าสุด 2 ตัวต้องมี editor ถูกต้อง (ตามลำดับ)
    const entries = result.current.audit.slice(-2)
    expect(entries[0].editor).toBe('readonly')
    expect(entries[1].editor).toBe('quick-actions')
  })
})

// Test 7: Matrix toggle doesn't leak to other roles
describe('useAdminSelfService — matrix isolation', () => {
  it('toggle role หนึ่งต้องไม่กระทบ role อื่นใน row เดียวกัน', () => {
    const { result } = renderHook(() => useAdminSelfService())

    // บันทึก state เดิมของทุก role สำหรับ national_id
    const originalEmployee = result.current.draft.visibility['national_id']['Employee']
    const originalHRBP     = result.current.draft.visibility['national_id']['HRBP']
    const originalSPD      = result.current.draft.visibility['national_id']['SPD']

    // toggle เฉพาะ Manager
    act(() => {
      result.current.setVisibility('national_id', 'Manager', true)
    })

    // Manager เปลี่ยน
    expect(result.current.draft.visibility['national_id']['Manager']).toBe(true)
    // Roles อื่นต้องไม่เปลี่ยน
    expect(result.current.draft.visibility['national_id']['Employee']).toBe(originalEmployee)
    expect(result.current.draft.visibility['national_id']['HRBP']).toBe(originalHRBP)
    expect(result.current.draft.visibility['national_id']['SPD']).toBe(originalSPD)
  })
})

// Test 8: setCurrentEditor switches UI context
describe('useAdminSelfService — setCurrentEditor', () => {
  it('setCurrentEditor ต้องเปลี่ยน currentEditor ได้ถูกต้อง', () => {
    const { result } = renderHook(() => useAdminSelfService())

    expect(result.current.currentEditor).toBeNull()

    act(() => {
      result.current.setCurrentEditor('field-config')
    })
    expect(result.current.currentEditor).toBe('field-config')

    act(() => {
      result.current.setCurrentEditor('tiles')
    })
    expect(result.current.currentEditor).toBe('tiles')

    // set null = ออกจาก editor
    act(() => {
      result.current.setCurrentEditor(null)
    })
    expect(result.current.currentEditor).toBeNull()
  })
})
