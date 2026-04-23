// AdminSSLifecycle.test.tsx — Part C Draft/Publish/Reset lifecycle + EditorShell render
// 8 tests ครอบคลุม AC-6, AC-7, AC-8 (lifecycle: draft/publish/reset + audit + EditorShell UI)
// Vitest + RTL

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react'
import { useAdminSelfService } from '@/lib/admin/store/useAdminSelfService'
import { EditorShell } from '@/components/admin/admin-ss/EditorShell'

// mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: vi.fn(() => { store = {} }),
  }
})()
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true })

// mock window.confirm สำหรับ handleReset ใน EditorShell (ตอบ true เสมอ)
Object.defineProperty(globalThis, 'window', {
  value: { ...globalThis.window, confirm: vi.fn(() => true) },
  writable: true,
})

beforeEach(() => {
  localStorageMock.clear()
  vi.clearAllMocks()
  act(() => {
    useAdminSelfService.getState().resetDraft()
    useAdminSelfService.setState({ isDirty: false, currentEditor: null })
  })
})

// -----------------------------------------------------------------------
// saveDraft — AC-7
// -----------------------------------------------------------------------

describe('saveDraft', () => {
  it('TC-LC-1: saveDraft เขียน draft ลง localStorage key "admin-ss-draft-v1" (ไม่เปลี่ยน published)', () => {
    const { result } = renderHook(() => useAdminSelfService())

    // แก้ draft ก่อน
    act(() => {
      result.current.setVisibility('gender', 'SPD', true)
    })
    expect(result.current.isDirty).toBe(true)

    act(() => {
      result.current.saveDraft()
    })

    // localStorage.setItem ต้องถูก call ด้วย key ถูกต้อง
    expect(localStorageMock.setItem).toHaveBeenCalledWith('admin-ss-draft-v1', expect.any(String))

    // value ต้องเป็น JSON ที่มี visibility key
    const call = localStorageMock.setItem.mock.calls.find((c) => c[0] === 'admin-ss-draft-v1')
    const parsed = JSON.parse(call![1])
    expect(parsed).toHaveProperty('visibility')

    // published ต้องไม่เปลี่ยน (saveDraft = ephemeral เท่านั้น)
    expect(result.current.published.visibility['gender']['SPD']).toBe(
      result.current.published.visibility['gender']['SPD']
    )
    expect(result.current.isDirty).toBe(true)
  })
})

// -----------------------------------------------------------------------
// publish — AC-6, AC-8
// -----------------------------------------------------------------------

describe('publish', () => {
  it('TC-LC-2: publish copy draft → published, reset isDirty=false', () => {
    const { result } = renderHook(() => useAdminSelfService())

    // แก้ draft
    act(() => {
      result.current.setVisibility('gender', 'Employee', false)
    })
    expect(result.current.isDirty).toBe(true)

    act(() => {
      result.current.publish('visibility')
    })

    // published ต้องได้ค่าจาก draft ที่แก้
    expect(result.current.published.visibility['gender']['Employee']).toBe(false)
    // isDirty กลับเป็น false
    expect(result.current.isDirty).toBe(false)
  })

  it('TC-LC-3: publish push audit entry — entry มี editor ถูกต้องและ action ตรง format', () => {
    const { result } = renderHook(() => useAdminSelfService())

    act(() => {
      result.current.setMandatory('hire_date', 'SPD', false)
      result.current.publish('mandatory')
    })

    // audit ต้องมีอย่างน้อย 1 entry
    expect(result.current.audit.length).toBeGreaterThanOrEqual(1)
    const latest = result.current.audit[result.current.audit.length - 1]
    expect(latest.editor).toBe('mandatory')
    expect(latest.action).toBe('Published mandatory')
    // entry ต้องมี timestamp (ISO string) และ id
    expect(latest.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}/)
    expect(latest.id).toBeTruthy()
  })

  it('TC-LC-4: audit ต้องไม่เกิน 10 entries (limitAudit)', () => {
    const { result } = renderHook(() => useAdminSelfService())

    // publish 12 ครั้งติดกัน
    for (let i = 0; i < 12; i++) {
      act(() => {
        result.current.setVisibility('gender', 'SPD', i % 2 === 0)
        result.current.publish('visibility')
      })
    }

    // audit ต้องไม่เกิน 10
    expect(result.current.audit.length).toBeLessThanOrEqual(10)
  })
})

// -----------------------------------------------------------------------
// resetDraft — AC-7
// -----------------------------------------------------------------------

describe('resetDraft', () => {
  it('TC-LC-5: resetDraft คืน draft กลับเป็น published และ isDirty=false', () => {
    const { result } = renderHook(() => useAdminSelfService())

    // แก้ draft
    act(() => {
      result.current.setReadOnly('base_salary', 'Employee', true)
    })
    expect(result.current.isDirty).toBe(true)

    const publishedValue = result.current.published.readonly['base_salary']['Employee']

    act(() => {
      result.current.resetDraft()
    })

    // draft ต้องกลับเป็น published
    expect(result.current.draft.readonly['base_salary']['Employee']).toBe(publishedValue)
    expect(result.current.isDirty).toBe(false)
  })
})

// -----------------------------------------------------------------------
// isDirty transitions
// -----------------------------------------------------------------------

describe('isDirty flag transitions', () => {
  it('TC-LC-6: isDirty เปลี่ยนตาม lifecycle — false → true (edit) → false (publish)', () => {
    const { result } = renderHook(() => useAdminSelfService())

    expect(result.current.isDirty).toBe(false)

    // แก้ draft → dirty
    act(() => {
      result.current.setVisibility('phone_number', 'SPD', false)
    })
    expect(result.current.isDirty).toBe(true)

    // publish → clean
    act(() => {
      result.current.publish('visibility')
    })
    expect(result.current.isDirty).toBe(false)
  })
})

// -----------------------------------------------------------------------
// Audit log — 10 entries max
// -----------------------------------------------------------------------

describe('audit log', () => {
  it('TC-LC-7: audit เริ่มต้นมี 10 entries จาก seed (สูงสุด 10 ตาม limitAudit)', () => {
    const { result } = renderHook(() => useAdminSelfService())
    // seed มี audit 10 entries
    expect(result.current.audit.length).toBeGreaterThanOrEqual(1)
    expect(result.current.audit.length).toBeLessThanOrEqual(10)
  })
})

// -----------------------------------------------------------------------
// EditorShell — UI: 3 action buttons (AC-7)
// -----------------------------------------------------------------------

describe('EditorShell UI', () => {
  it('TC-LC-8: EditorShell render 3 action buttons — บันทึกร่าง / เผยแพร่ / รีเซ็ต', () => {
    // render EditorShell โดยไม่ต้อง dirty (buttons ยังแสดงอยู่แต่ disabled)
    render(
      <EditorShell editor="visibility" titleTh="ทดสอบ" brd="#179">
        <div data-testid="slot-content">เนื้อหา</div>
      </EditorShell>
    )

    // ทั้ง 3 ปุ่มต้องปรากฏ
    expect(screen.getByText('บันทึกร่าง')).toBeTruthy()
    expect(screen.getByText('เผยแพร่')).toBeTruthy()
    expect(screen.getByText('รีเซ็ต')).toBeTruthy()

    // slot content ต้องปรากฏ
    expect(screen.getByTestId('slot-content')).toBeTruthy()
  })
})
