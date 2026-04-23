// EmployeePicker.test.tsx — Unit tests สำหรับ EmployeePicker typeahead
// ครอบคลุม: filter active/terminated, search matching (id/name), keyboard nav, select emission
//
// S2 migration: ใช้ MockEmployee จาก @/mocks/employees (snake_case schema)
// filter prop ใช้ lowercase ('active'/'terminated') ตาม S2 status values

import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { EmployeePicker } from '@/components/admin/lifecycle/EmployeePicker'
import { MOCK_EMPLOYEES } from '@/mocks/employees'
import type { MockEmployee } from '@/mocks/employees'

// jsdom ไม่ implement scrollIntoView — mock เพื่อกัน throw เมื่อ keyboard nav highlight option
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn()
})

// helper: pick first active + terminated จาก 1K fixture
const activeEmp = MOCK_EMPLOYEES.find((e) => e.status === 'active')!
const terminatedEmp = MOCK_EMPLOYEES.find((e) => e.status === 'terminated')!

describe('EmployeePicker — render + accessibility', () => {
  it('ต้อง render combobox input + label ภาษาไทย', () => {
    render(<EmployeePicker onSelect={() => {}} />)
    const input = screen.getByRole('combobox')
    expect(input).toHaveAttribute('aria-autocomplete', 'list')
    expect(screen.getByText(/ค้นหาพนักงาน/)).toBeInTheDocument()
  })

  it('required=true → aria-required + asterisk', () => {
    render(<EmployeePicker onSelect={() => {}} required />)
    const input = screen.getByRole('combobox')
    expect(input).toHaveAttribute('aria-required', 'true')
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('value prop ที่ส่งเข้ามา ต้อง sync label แสดงใน input', () => {
    render(<EmployeePicker onSelect={() => {}} value={activeEmp} />)
    const input = screen.getByRole('combobox') as HTMLInputElement
    expect(input.value).toContain(activeEmp.employee_id)
    expect(input.value).toContain(activeEmp.first_name_th)
  })
})

describe('EmployeePicker — status filter', () => {
  it('filter="active" → ค้น employee_id ของ terminated ต้องไม่เปิด listbox', () => {
    render(<EmployeePicker onSelect={() => {}} filter="active" />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: terminatedEmp.employee_id } })
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(input).toHaveAttribute('aria-expanded', 'false')
  })

  it('filter="terminated" → ค้น employee_id ของ active ต้องไม่เปิด listbox', () => {
    render(<EmployeePicker onSelect={() => {}} filter="terminated" />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: activeEmp.employee_id } })
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('filter="terminated" → search ด้วย employee_id ของ terminated ต้องเจอ', () => {
    render(<EmployeePicker onSelect={() => {}} filter="terminated" />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: terminatedEmp.employee_id } })
    const listbox = screen.getByRole('listbox')
    expect(within(listbox).getByText(terminatedEmp.employee_id)).toBeInTheDocument()
  })
})

describe('EmployeePicker — search matching (employee_id / Thai name)', () => {
  it('ค้นด้วย employee_id prefix ต้องเจอ', () => {
    render(<EmployeePicker onSelect={() => {}} />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: activeEmp.employee_id.slice(0, 4) } })
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('ค้นด้วยชื่อไทย (first_name_th substring) ต้องเจอ', () => {
    render(<EmployeePicker onSelect={() => {}} />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: activeEmp.first_name_th } })
    const listbox = screen.getByRole('listbox')
    expect(listbox).toBeInTheDocument()
    // แสดงอย่างน้อย 1 row
    expect(within(listbox).getAllByRole('option').length).toBeGreaterThan(0)
  })

  it('ค้นด้วย string ว่าง ต้องไม่เปิด dropdown', () => {
    render(<EmployeePicker onSelect={() => {}} />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: '' } })
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('dropdown จำกัดสูงสุด 8 ผลลัพธ์ (MAX_RESULTS)', () => {
    render(<EmployeePicker onSelect={() => {}} />)
    const input = screen.getByRole('combobox')
    // ค้นด้วย prefix กว้าง "EMP" ควร match ทุกคน
    fireEvent.change(input, { target: { value: 'EMP' } })
    const listbox = screen.getByRole('listbox')
    const options = within(listbox).getAllByRole('option')
    expect(options.length).toBeLessThanOrEqual(8)
  })
})

describe('EmployeePicker — selection', () => {
  it('onSelect ต้องถูกเรียกด้วย employee object เมื่อคลิก option', () => {
    const onSelect = vi.fn()
    render(<EmployeePicker onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: activeEmp.employee_id } })
    const listbox = screen.getByRole('listbox')
    const firstOption = within(listbox).getAllByRole('option')[0]
    // component ใช้ onMouseDown (ไม่ใช่ click) เพื่อป้องกัน blur ก่อน select
    fireEvent.mouseDown(firstOption)
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect.mock.calls[0][0]).toHaveProperty('employee_id')
  })

  it('เลือก option ด้วย Enter key (keyboard nav) → onSelect ถูกเรียก', () => {
    const onSelect = vi.fn()
    render(<EmployeePicker onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: activeEmp.employee_id } })
    // ArrowDown ไป highlight row แรก
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('Escape ต้องปิด dropdown (aria-expanded=false)', () => {
    render(<EmployeePicker onSelect={() => {}} />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: activeEmp.employee_id } })
    expect(input).toHaveAttribute('aria-expanded', 'true')
    fireEvent.keyDown(input, { key: 'Escape' })
    expect(input).toHaveAttribute('aria-expanded', 'false')
  })
})

describe('EmployeePicker — no match', () => {
  it('ค้นด้วย string ที่ไม่ match → listbox ไม่ปรากฏ (aria-expanded=false)', () => {
    render(<EmployeePicker onSelect={() => {}} />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: 'XYZ_NOT_EXIST_9999' } })
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(input).toHaveAttribute('aria-expanded', 'false')
  })
})
