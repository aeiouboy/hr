// AdminSS-FieldConfig.test.tsx — FieldConfigPage component tests (BRD #178)
// Mock pattern: vi.mock + vi.hoisted — useAdminSelfService mocked (do NOT import real store)
// 6 tests

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'

// ---------- Hoisted mock state + action fns ----------
const hoisted = vi.hoisted(() => {
  const fieldConfigSeed = [
    { id: 'first_name_th',  label: 'ชื่อ (ภาษาไทย)',     scope: 'Person',     fieldType: 'text', defaultValue: null, isSystem: true  },
    { id: 'last_name_th',   label: 'นามสกุล (ภาษาไทย)',  scope: 'Person',     fieldType: 'text', defaultValue: null, isSystem: true  },
    { id: 'first_name_en',  label: 'First Name (EN)',     scope: 'Person',     fieldType: 'text', defaultValue: null, isSystem: true  },
    { id: 'last_name_en',   label: 'Last Name (EN)',      scope: 'Person',     fieldType: 'text', defaultValue: null, isSystem: true  },
    { id: 'national_id',    label: 'เลขบัตรประชาชน',       scope: 'Person',     fieldType: 'text', defaultValue: null, isSystem: false },
    { id: 'date_of_birth',  label: 'วันเกิด',              scope: 'Person',     fieldType: 'date', defaultValue: null, isSystem: false },
    { id: 'gender',         label: 'เพศ',                  scope: 'Person',     fieldType: 'select', defaultValue: null, isSystem: false },
    { id: 'phone_number',   label: 'เบอร์โทรศัพท์',         scope: 'Person',     fieldType: 'text', defaultValue: null, isSystem: false },
    { id: 'address_line1',  label: 'ที่อยู่',               scope: 'Person',     fieldType: 'text', defaultValue: null, isSystem: false },
    { id: 'hire_date',      label: 'วันที่เริ่มงาน',         scope: 'Employment', fieldType: 'date', defaultValue: null, isSystem: true  },
    { id: 'company_code',   label: 'บริษัท',               scope: 'Employment', fieldType: 'select', defaultValue: null, isSystem: true },
    { id: 'employee_class', label: 'ประเภทพนักงาน',        scope: 'Employment', fieldType: 'select', defaultValue: 'A',  isSystem: false },
    { id: 'business_unit',  label: 'หน่วยธุรกิจ',           scope: 'Job',        fieldType: 'select', defaultValue: null, isSystem: false },
    { id: 'position',       label: 'ตำแหน่งงาน',           scope: 'Job',        fieldType: 'text', defaultValue: null, isSystem: false },
    { id: 'base_salary',    label: 'เงินเดือน',            scope: 'Job',        fieldType: 'number', defaultValue: null, isSystem: false },
  ]

  const mockSetFieldConfig   = vi.fn()
  const mockSetVisibility    = vi.fn()
  const mockSetMandatory     = vi.fn()
  const mockSetReadOnly      = vi.fn()
  const mockSetQuickActions  = vi.fn()
  const mockSetTiles         = vi.fn()
  const mockSaveDraft        = vi.fn()
  const mockPublish          = vi.fn()
  const mockResetDraft       = vi.fn()
  const mockSetCurrentEditor = vi.fn()

  const mockState = {
    draft:     { fieldConfig: fieldConfigSeed, visibility: {}, mandatory: {}, readonly: {}, quickActions: [], tiles: [] },
    published: { fieldConfig: fieldConfigSeed, visibility: {}, mandatory: {}, readonly: {}, quickActions: [], tiles: [] },
    audit: [],
    isDirty: false,
    currentEditor: null,
    setFieldConfig:    mockSetFieldConfig,
    setVisibility:     mockSetVisibility,
    setMandatory:      mockSetMandatory,
    setReadOnly:       mockSetReadOnly,
    setQuickActions:   mockSetQuickActions,
    setTiles:          mockSetTiles,
    saveDraft:         mockSaveDraft,
    publish:           mockPublish,
    resetDraft:        mockResetDraft,
    setCurrentEditor:  mockSetCurrentEditor,
  }

  return { mockState, mockSetFieldConfig, mockPublish, mockResetDraft }
})

vi.mock('@/lib/admin/store/useAdminSelfService', () => {
  const useAdminSelfService = Object.assign(
    (selector?: (s: typeof hoisted.mockState) => unknown) =>
      selector ? selector(hoisted.mockState) : hoisted.mockState,
    {
      getState:  () => hoisted.mockState,
      setState:  vi.fn(),
      subscribe: vi.fn(),
    }
  )
  return { useAdminSelfService }
})

// mock window.confirm (EditorShell.handleReset เรียก ตอน render ไม่เรียก แต่กัน jsdom warn)
Object.defineProperty(globalThis, 'window', {
  value: { ...globalThis.window, confirm: vi.fn(() => true) },
  writable: true,
})

// import หลัง vi.mock เพื่อให้ module graph hook เข้า mock
import FieldConfigPage from '@/app/admin/self-service/field-config/page'

beforeEach(() => {
  vi.clearAllMocks()
  // reset state ที่อาจถูกแก้โดย test ก่อนหน้า
  hoisted.mockState.isDirty = false
})

describe('FieldConfigPage (BRD #178) — component', () => {
  it('TC-FC-COMP-1: render without crash + แสดง heading "จัดการ Field Configuration" + BRD #178 pill', () => {
    render(<FieldConfigPage />)
    expect(screen.getByRole('heading', { name: /จัดการ Field Configuration/i })).toBeInTheDocument()
    expect(screen.getByText(/BRD #178/i)).toBeInTheDocument()
  })

  it('TC-FC-COMP-2: filter buttons 4 ปุ่ม (ทั้งหมด / Person / Employment / Job) — คลิก Person → 9 data rows', () => {
    render(<FieldConfigPage />)
    expect(screen.getByRole('button', { name: /^ทั้งหมด$/ })).toBeInTheDocument()
    const personBtn = screen.getByRole('button', { name: /^Person$/ })
    expect(screen.getByRole('button', { name: /^Employment$/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Job$/ })).toBeInTheDocument()

    fireEvent.click(personBtn)

    // หลัง filter: tbody มี 9 rows (Person scope)
    const tbody = document.querySelector('tbody')!
    const rows = within(tbody).getAllByRole('row')
    expect(rows).toHaveLength(9)
  })

  it('TC-FC-COMP-3: default (ทั้งหมด) แสดง 15 rows จาก seed', () => {
    render(<FieldConfigPage />)
    const tbody = document.querySelector('tbody')!
    const rows = within(tbody).getAllByRole('row')
    expect(rows).toHaveLength(15)
  })

  it('TC-FC-COMP-4: system field row (hire_date, isSystem=true) — ปุ่ม แก้ไข ถูก disabled', () => {
    render(<FieldConfigPage />)
    // find row ที่มี id hire_date
    const hireDateCell = screen.getByText('hire_date').closest('tr')!
    const editBtn = within(hireDateCell).getByRole('button', { name: /แก้ไข/ })
    expect(editBtn).toBeDisabled()
  })

  it('TC-FC-COMP-5: non-system row (date_of_birth) — คลิก แก้ไข เปิด modal role="dialog"', () => {
    render(<FieldConfigPage />)
    const dobRow = screen.getByText('date_of_birth').closest('tr')!
    const editBtn = within(dobRow).getByRole('button', { name: /แก้ไข/ })
    expect(editBtn).not.toBeDisabled()

    fireEvent.click(editBtn)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-label', 'แก้ไข field วันเกิด')
  })

  it('TC-FC-COMP-6: modal บันทึก → setFieldConfig callback ถูกเรียกด้วย updated entries; คลิก ยกเลิก → modal ปิดโดยไม่เรียก callback', () => {
    render(<FieldConfigPage />)

    // เปิด modal
    const dobRow = screen.getByText('date_of_birth').closest('tr')!
    fireEvent.click(within(dobRow).getByRole('button', { name: /แก้ไข/ }))

    // แก้ type → number, default → "0" — label ไม่มี htmlFor ใช้ role + placeholder
    const typeSelect = within(screen.getByRole('dialog')).getByRole('combobox')
    fireEvent.change(typeSelect, { target: { value: 'number' } })
    const defaultInput = screen.getByPlaceholderText(/ไม่ระบุ = ไม่มีค่าเริ่มต้น/)
    fireEvent.change(defaultInput, { target: { value: '0' } })

    fireEvent.click(screen.getByRole('button', { name: /^บันทึก$/ }))

    expect(hoisted.mockSetFieldConfig).toHaveBeenCalledTimes(1)
    const updated = hoisted.mockSetFieldConfig.mock.calls[0][0]
    const dob = updated.find((f: { id: string }) => f.id === 'date_of_birth')
    expect(dob).toMatchObject({ fieldType: 'number', defaultValue: '0' })

    // modal ต้องปิด
    expect(screen.queryByRole('dialog')).toBeNull()

    // เปิด modal ใหม่ → คลิกยกเลิก → callback ไม่ถูกเรียกเพิ่ม
    fireEvent.click(within(dobRow).getByRole('button', { name: /แก้ไข/ }))
    fireEvent.click(screen.getByRole('button', { name: /^ยกเลิก$/ }))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(hoisted.mockSetFieldConfig).toHaveBeenCalledTimes(1)
  })
})
