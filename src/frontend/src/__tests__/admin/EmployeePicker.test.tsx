// EmployeePicker.test.tsx — Unit tests สำหรับ EmployeePicker typeahead
// ครอบคลุม: filter Active/Terminated, search matching (code/name/nationalId), keyboard nav, select emission

import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { EmployeePicker } from '@/components/admin/lifecycle/EmployeePicker'
import employees from '@/data/admin/mockEmployees.json'
import type { MockEmployee } from '@/lib/admin/store/useLifecycleWizard'

// jsdom ไม่ implement scrollIntoView — mock เพื่อกัน throw เมื่อ keyboard nav highlight option
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn()
})

// helper: pick first Active + Terminated จาก fixture
const activeEmp = (employees as MockEmployee[]).find((e) => e.status === 'Active')!
const terminatedEmp = (employees as MockEmployee[]).find((e) => e.status === 'Terminated')!

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
    expect(input.value).toContain(activeEmp.externalCode)
    expect(input.value).toContain(activeEmp.firstName.th)
  })
})

describe('EmployeePicker — status filter', () => {
  it('filter="Active" → ค้น externalCode ของ Terminated ต้องไม่เปิด listbox', () => {
    render(<EmployeePicker onSelect={() => {}} filter="Active" />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: terminatedEmp.externalCode } })
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(input).toHaveAttribute('aria-expanded', 'false')
  })

  it('filter="Terminated" → ค้น externalCode ของ Active ต้องไม่เปิด listbox', () => {
    render(<EmployeePicker onSelect={() => {}} filter="Terminated" />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: activeEmp.externalCode } })
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('filter="Terminated" → search ด้วย externalCode ของ Terminated ต้องเจอ', () => {
    render(<EmployeePicker onSelect={() => {}} filter="Terminated" />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: terminatedEmp.externalCode } })
    const listbox = screen.getByRole('listbox')
    expect(within(listbox).getByText(terminatedEmp.externalCode)).toBeInTheDocument()
  })
})

describe('EmployeePicker — search matching (code / Thai name / nationalId)', () => {
  it('ค้นด้วย externalCode prefix ต้องเจอ', () => {
    render(<EmployeePicker onSelect={() => {}} />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: activeEmp.externalCode.slice(0, 4) } })
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('ค้นด้วยชื่อไทย (firstName.th substring) ต้องเจอ', () => {
    render(<EmployeePicker onSelect={() => {}} />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: activeEmp.firstName.th } })
    const listbox = screen.getByRole('listbox')
    expect(listbox).toBeInTheDocument()
    // แสดงอย่างน้อย 1 row
    expect(within(listbox).getAllByRole('option').length).toBeGreaterThan(0)
  })

  it('ค้นด้วย nationalId substring (10 หลักแรก) ต้องเจอ', () => {
    render(<EmployeePicker onSelect={() => {}} />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: activeEmp.nationalId.slice(0, 10) } })
    expect(screen.getByRole('listbox')).toBeInTheDocument()
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
    fireEvent.change(input, { target: { value: activeEmp.externalCode } })
    const listbox = screen.getByRole('listbox')
    const firstOption = within(listbox).getAllByRole('option')[0]
    // component ใช้ onMouseDown (ไม่ใช่ click) เพื่อป้องกัน blur ก่อน select
    fireEvent.mouseDown(firstOption)
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect.mock.calls[0][0]).toHaveProperty('externalCode')
  })

  it('เลือก option ด้วย Enter key (keyboard nav) → onSelect ถูกเรียก', () => {
    const onSelect = vi.fn()
    render(<EmployeePicker onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: activeEmp.externalCode } })
    // ArrowDown ไป highlight row แรก
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('Escape ต้องปิด dropdown (aria-expanded=false)', () => {
    render(<EmployeePicker onSelect={() => {}} />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: activeEmp.externalCode } })
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
