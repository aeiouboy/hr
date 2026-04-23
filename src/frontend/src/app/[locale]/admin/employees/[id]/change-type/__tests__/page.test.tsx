/**
 * change-type/page.test.tsx — unit tests สำหรับ Change Employee Type route
 *
 * AC-11 target: ≥ 8 tests pass
 * Strategy: mock next/navigation + stores → render ด้วย @testing-library/react
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'

// ─── Mocks (hoisted) ─────────────────────────────────────────────────────────

const mockPush = vi.fn()
const mockAppendEvent = vi.fn()
const mockUpdateEmployee = vi.fn()

vi.mock('next/navigation', () => ({
  useParams: () => ({ id: 'EMP-0001', locale: 'th' }),
  useRouter: () => ({ push: mockPush, back: vi.fn() }),
}))

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

const mockEmployee = {
  employee_id: 'EMP-0001',
  first_name_th: 'สมชาย',
  last_name_th: 'สุวรรณ',
  first_name_en: 'Somchai',
  last_name_en: 'Suwan',
  employee_class: 'PERMANENT' as const,
  date_of_birth: '1985-03-15',
  hire_date: '2020-01-10',
  company: 'CEN' as const,
  position_title: 'Software Engineer',
  org_unit: 'IT - Infrastructure',
  probation_status: 'passed' as const,
  status: 'active' as const,
}

// Mock useEmployees — Zustand pattern with selector + static getState
vi.mock('@/lib/admin/store/useEmployees', () => {
  const employeesState = {
    all: [mockEmployee],
    searchQuery: '',
    setSearchQuery: vi.fn(),
    getById: (_id: string) => mockEmployee,
    getFiltered: () => [mockEmployee],
    updateEmployee: mockUpdateEmployee,
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storeHook: any = (selector?: (s: typeof employeesState) => unknown) =>
    selector ? selector(employeesState) : employeesState
  storeHook.getState = () => employeesState
  return { useEmployees: storeHook }
})

// Mock useTimelines — selector-or-value pattern
const mockTimelinesState = { seed: vi.fn(), append: vi.fn(), byEmployee: {}, get: () => [] }
const useTimelinesMock = vi.fn((selector?: (s: typeof mockTimelinesState) => unknown) =>
  selector ? selector(mockTimelinesState) : mockTimelinesState,
)
vi.mock('@/lib/admin/store/useTimelines', () => ({
  useTimelines: useTimelinesMock,
}))

// Mock useEmploymentEvents — selector-or-value pattern
const mockEventsState = {
  appendEvent: mockAppendEvent,
  events: [],
  eventsForEmployee: () => [],
  eventsAsOf: () => [],
  stateAsOf: () => ({ employeeId: '', asOfDate: '', status: 'ACTIVE', actingPositions: [], events: [] }),
  seedFromEmployees: vi.fn(),
  _reset: vi.fn(),
}
const useEmploymentEventsMock = vi.fn((selector?: (s: typeof mockEventsState) => unknown) =>
  selector ? selector(mockEventsState) : mockEventsState,
)
vi.mock('@/lib/admin/store/useEmploymentEvents', () => ({
  useEmploymentEvents: useEmploymentEventsMock,
}))

// ─── Import page after mocks ──────────────────────────────────────────────────

let ChangeEmployeeTypePage: React.ComponentType

beforeEach(async () => {
  vi.clearAllMocks()
  const mod = await import('../page')
  ChangeEmployeeTypePage = mod.default
})

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('ChangeEmployeeTypePage — render (AC-1 / AC-9)', () => {
  it('render ไม่ crash — route exists', () => {
    expect(() => render(<ChangeEmployeeTypePage />)).not.toThrow()
  })

  it('แสดง h1 "เปลี่ยนประเภทการจ้าง" (Thai-primary)', () => {
    render(<ChangeEmployeeTypePage />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.textContent).toContain('เปลี่ยนประเภทการจ้าง')
  })

  it('แสดงชื่อพนักงานไทย (AC-1 snapshot)', () => {
    render(<ChangeEmployeeTypePage />)
    const pageText = document.body.textContent ?? ''
    expect(pageText).toContain('สมชาย')
    expect(pageText).toContain('สุวรรณ')
  })

  it('แสดงประเภทพนักงานปัจจุบัน read-only (AC-5)', () => {
    render(<ChangeEmployeeTypePage />)
    const pageText = document.body.textContent ?? ''
    expect(pageText).toContain('พนักงานประจำ')
  })

  it('แสดง dropdown ประเภทพนักงานใหม่ (AC-3)', () => {
    render(<ChangeEmployeeTypePage />)
    const select = screen.getByLabelText('ประเภทพนักงานใหม่')
    expect(select).toBeTruthy()
    const pageText = document.body.textContent ?? ''
    expect(pageText).toContain('พนักงานพาร์ทไทม์')
  })
})

describe('ChangeEmployeeTypePage — validation (AC-4)', () => {
  it('ปุ่ม submit disabled เมื่อ form ยังไม่ครบ', () => {
    render(<ChangeEmployeeTypePage />)
    const btn = screen.getByRole('button', { name: /บันทึกการเปลี่ยนแปลง/ })
    expect(btn).toHaveAttribute('aria-disabled', 'true')
  })

  it('แสดง error เมื่อเลือก type เดียวกับปัจจุบัน (AC-4: new type must differ)', () => {
    render(<ChangeEmployeeTypePage />)
    fireEvent.change(screen.getByLabelText('ประเภทพนักงานใหม่'), {
      target: { value: 'PERMANENT' },
    })
    const pageText = document.body.textContent ?? ''
    expect(pageText).toContain('ประเภทใหม่ต้องต่างจากปัจจุบัน')
  })

  it('แสดง field วันสิ้นสุดสัญญา เมื่อเลือก CONTRACT (AC-3)', () => {
    render(<ChangeEmployeeTypePage />)
    fireEvent.change(screen.getByLabelText('ประเภทพนักงานใหม่'), {
      target: { value: 'CONTRACT' },
    })
    const contractEndInput = screen.getByLabelText('วันสิ้นสุดสัญญา')
    expect(contractEndInput).toBeTruthy()
  })

  it('ซ่อน field วันสิ้นสุดสัญญา เมื่อสลับจาก CONTRACT → PARTIME (AC-4)', () => {
    render(<ChangeEmployeeTypePage />)
    fireEvent.change(screen.getByLabelText('ประเภทพนักงานใหม่'), { target: { value: 'CONTRACT' } })
    fireEvent.change(screen.getByLabelText('ประเภทพนักงานใหม่'), { target: { value: 'PARTIME' } })
    const contractEndInput = screen.queryByLabelText('วันสิ้นสุดสัญญา')
    expect(contractEndInput).toBeNull()
  })

  it('ปุ่ม submit enabled เมื่อ form ครบทุก required field (PARTIME)', () => {
    render(<ChangeEmployeeTypePage />)
    fireEvent.change(screen.getByLabelText('ประเภทพนักงานใหม่'), { target: { value: 'PARTIME' } })
    fireEvent.change(screen.getByLabelText('วันที่มีผลของการเปลี่ยนประเภทการจ้าง'), { target: { value: '2025-07-01' } })
    fireEvent.change(screen.getByLabelText('รหัสเหตุผลการเปลี่ยนประเภทการจ้าง'), { target: { value: 'JCHG_EMPTYPE' } })
    const btn = screen.getByRole('button', { name: /บันทึกการเปลี่ยนแปลง/ })
    expect(btn).not.toHaveAttribute('aria-disabled', 'true')
  })
})

describe('ChangeEmployeeTypePage — review cluster (AC-6)', () => {
  it('แสดง transition label "พนักงานประจำ → พนักงานพาร์ทไทม์" ใน review cluster', () => {
    render(<ChangeEmployeeTypePage />)
    fireEvent.change(screen.getByLabelText('ประเภทพนักงานใหม่'), { target: { value: 'PARTIME' } })
    const pageText = document.body.textContent ?? ''
    expect(pageText).toContain('พนักงานประจำ → พนักงานพาร์ทไทม์')
  })
})

describe('ChangeEmployeeTypePage — submit (AC-7 / AC-8)', () => {
  it('เรียก appendEvent + updateEmployee + router.push หลัง submit สำเร็จ', () => {
    render(<ChangeEmployeeTypePage />)

    fireEvent.change(screen.getByLabelText('ประเภทพนักงานใหม่'), { target: { value: 'PARTIME' } })
    fireEvent.change(screen.getByLabelText('วันที่มีผลของการเปลี่ยนประเภทการจ้าง'), { target: { value: '2025-08-01' } })
    fireEvent.change(screen.getByLabelText('รหัสเหตุผลการเปลี่ยนประเภทการจ้าง'), { target: { value: 'JCHG_EMPTYPE' } })

    fireEvent.click(screen.getByRole('button', { name: /บันทึกการเปลี่ยนแปลง/ }))

    // appendEvent ถูกเรียกด้วย type ถูกต้อง
    expect(mockAppendEvent).toHaveBeenCalledOnce()
    const callArg = mockAppendEvent.mock.calls[0][0]
    expect(callArg.type).toBe('CHANGE_EMPLOYEE_TYPE')
    expect(callArg.employeeId).toBe('EMP-0001')
    expect(callArg.effectiveDate).toBe('2025-08-01')
    expect(callArg.meta?.reason).toBe('JCHG_EMPTYPE')

    // updateEmployee ถูกเรียก (AC-8: mock employee store updates employeeClass)
    expect(mockUpdateEmployee).toHaveBeenCalledWith('EMP-0001', { employee_class: 'PARTIME' })

    // router.push กลับหน้า detail
    expect(mockPush).toHaveBeenCalledOnce()
    expect(mockPush.mock.calls[0][0]).toContain('/th/admin/employees/EMP-0001')
  })
})
