// EffectiveDatePicker.test.tsx — Unit tests สำหรับ EffectiveDatePicker (lifecycle wizards)
// ครอบคลุม: label, required indicator, onChange ISO, min/max bounds, touched/error state

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { EffectiveDatePicker } from '@/components/admin/lifecycle/EffectiveDatePicker'

describe('EffectiveDatePicker — label + required', () => {
  it('ต้อง render label พร้อม htmlFor ตรงกับ input id', () => {
    render(
      <EffectiveDatePicker
        id="my-date"
        label="วันที่มีผล"
        value={null}
        onChange={() => {}}
      />
    )
    const label = screen.getByText('วันที่มีผล')
    const input = screen.getByLabelText('วันที่มีผล')
    expect(label).toBeInTheDocument()
    expect(input).toHaveAttribute('id', 'my-date')
  })

  it('required=true ต้องแสดง asterisk + aria-required', () => {
    render(
      <EffectiveDatePicker
        label="วันที่มีผล"
        value={null}
        onChange={() => {}}
        required
      />
    )
    // asterisk visible (aria-hidden เพราะ screen reader ใช้ aria-required)
    expect(screen.getByText('*')).toBeInTheDocument()
    const input = screen.getByLabelText(/วันที่มีผล/)
    expect(input).toHaveAttribute('aria-required', 'true')
  })

  it('required=false (default) ต้องไม่แสดง asterisk', () => {
    render(
      <EffectiveDatePicker
        label="วันที่มีผล"
        value={null}
        onChange={() => {}}
      />
    )
    expect(screen.queryByText('*')).not.toBeInTheDocument()
  })
})

describe('EffectiveDatePicker — onChange emits ISO date string', () => {
  it('onChange ต้องถูกเรียกด้วย ISO date (YYYY-MM-DD)', () => {
    const onChange = vi.fn()
    render(
      <EffectiveDatePicker
        label="วันที่มีผล"
        value={null}
        onChange={onChange}
      />
    )
    const input = screen.getByLabelText(/วันที่มีผล/)
    fireEvent.change(input, { target: { value: '2026-05-01' } })
    expect(onChange).toHaveBeenCalledWith('2026-05-01')
  })

  it('value prop null ต้อง render empty string', () => {
    render(
      <EffectiveDatePicker
        label="วันที่มีผล"
        value={null}
        onChange={() => {}}
      />
    )
    const input = screen.getByLabelText(/วันที่มีผล/) as HTMLInputElement
    expect(input.value).toBe('')
  })

  it('value prop ISO ต้อง reflect เข้า input', () => {
    render(
      <EffectiveDatePicker
        label="วันที่มีผล"
        value="2026-05-15"
        onChange={() => {}}
      />
    )
    const input = screen.getByLabelText(/วันที่มีผล/) as HTMLInputElement
    expect(input.value).toBe('2026-05-15')
  })
})

describe('EffectiveDatePicker — min/max bounds', () => {
  it('minDate ต้อง set เข้า input min attribute', () => {
    render(
      <EffectiveDatePicker
        label="วันที่"
        value={null}
        onChange={() => {}}
        minDate="2026-01-01"
      />
    )
    const input = screen.getByLabelText(/วันที่/)
    expect(input).toHaveAttribute('min', '2026-01-01')
  })

  it('maxDate ต้อง set เข้า input max attribute', () => {
    render(
      <EffectiveDatePicker
        label="วันที่"
        value={null}
        onChange={() => {}}
        maxDate="2027-12-31"
      />
    )
    const input = screen.getByLabelText(/วันที่/)
    expect(input).toHaveAttribute('max', '2027-12-31')
  })
})

describe('EffectiveDatePicker — touched + error state', () => {
  it('ก่อน touched ไม่ต้องแสดง error แม้ required + empty', () => {
    render(
      <EffectiveDatePicker
        label="วันที่มีผล"
        value={null}
        onChange={() => {}}
        required
      />
    )
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('หลัง blur (required + empty) ต้องแสดง error + aria-invalid', () => {
    render(
      <EffectiveDatePicker
        label="วันที่มีผล"
        value={null}
        onChange={() => {}}
        required
      />
    )
    const input = screen.getByLabelText(/วันที่มีผล/)
    fireEvent.blur(input)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('กรุณาระบุวันที่มีผล')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('หลัง touched + มี value ต้องไม่แสดง error', () => {
    const onChange = vi.fn()
    const { rerender } = render(
      <EffectiveDatePicker
        label="วันที่มีผล"
        value={null}
        onChange={onChange}
        required
      />
    )
    const input = screen.getByLabelText(/วันที่มีผล/)
    // simulate user interaction
    fireEvent.change(input, { target: { value: '2026-05-01' } })
    fireEvent.blur(input)
    // re-render ด้วย value ที่ parent set กลับมา
    rerender(
      <EffectiveDatePicker
        label="วันที่มีผล"
        value="2026-05-01"
        onChange={onChange}
        required
      />
    )
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
