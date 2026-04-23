// ReasonPicker.test.tsx — Unit tests สำหรับ ReasonPicker (lifecycle wizards)
// ครอบคลุม: event code filter (5584/5604/5597), option counts, Thai labels verbatim (C8), error display

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ReasonPicker } from '@/components/admin/lifecycle/ReasonPicker'

describe('ReasonPicker — event code filter', () => {
  it('event="5584" (REHIRE) ต้องแสดง 2 options: RE_REHIRE_LT1 + RE_REHIRE_GE1', () => {
    render(<ReasonPicker event="5584" value={null} onChange={() => {}} />)
    const select = screen.getByRole('combobox')
    // 2 reason options + 1 placeholder "— เลือกเหตุผล —"
    const options = select.querySelectorAll('option')
    expect(options.length).toBe(3)
    expect(screen.getByText(/RE_REHIRE_LT1/)).toBeInTheDocument()
    expect(screen.getByText(/RE_REHIRE_GE1/)).toBeInTheDocument()
  })

  it('event="5604" (TRANSFER) ต้องแสดง 3 options: ROTATION + TRNACCOMP + TRNWIC', () => {
    render(<ReasonPicker event="5604" value={null} onChange={() => {}} />)
    const select = screen.getByRole('combobox')
    const options = select.querySelectorAll('option')
    expect(options.length).toBe(4) // 3 + placeholder
    expect(screen.getByText(/TRN_ROTATION/)).toBeInTheDocument()
    expect(screen.getByText(/TRN_TRNACCOMP/)).toBeInTheDocument()
    expect(screen.getByText(/TRN_TRNWIC/)).toBeInTheDocument()
  })

  it('event="5597" (TERMINATE) ต้องแสดง 17 options (verbatim ตาม Appendix 2 — C8)', () => {
    render(<ReasonPicker event="5597" value={null} onChange={() => {}} />)
    const select = screen.getByRole('combobox')
    const options = select.querySelectorAll('option')
    expect(options.length).toBe(18) // 17 + placeholder

    // Sample check — 17 TERM codes ต้องอยู่ครบ
    const expectedCodes = [
      'TERM_RETIRE', 'TERM_DISMISS', 'TERM_DM', 'TERM_ENDASSIGN', 'TERM_EOC',
      'TERM_ERLRETIRE', 'TERM_LAYOFF', 'TERM_NOSHOW', 'TERM_PASSAWAY', 'TERM_RESIGN',
      'TERM_REORG', 'TERM_TRANS', 'TERM_UNSUCPROB', 'TERM_COVID', 'TERM_CRISIS',
      'TERM_ABSENT', 'TERM_REDUNDANCY',
    ]
    for (const code of expectedCodes) {
      expect(screen.getByText(new RegExp(code))).toBeInTheDocument()
    }
  })
})

describe('ReasonPicker — Thai labels verbatim (C8 source-grounding)', () => {
  it('TERM_RETIRE ต้องมี label "เกษียณอายุ"', () => {
    render(<ReasonPicker event="5597" value={null} onChange={() => {}} />)
    expect(screen.getByText(/เกษียณอายุ \(Retirement\)/)).toBeInTheDocument()
  })

  it('TRN_ROTATION ต้องมี label "Rotation — สับเปลี่ยนหมุนเวียน"', () => {
    render(<ReasonPicker event="5604" value={null} onChange={() => {}} />)
    expect(screen.getByText(/Rotation — สับเปลี่ยนหมุนเวียน/)).toBeInTheDocument()
  })

  it('RE_REHIRE_LT1 ต้องมี label "จ้างใหม่ — ออกไม่เกิน 1 ปี"', () => {
    render(<ReasonPicker event="5584" value={null} onChange={() => {}} />)
    expect(screen.getByText(/จ้างใหม่ — ออกไม่เกิน 1 ปี/)).toBeInTheDocument()
  })
})

describe('ReasonPicker — interaction', () => {
  it('onChange ต้องถูกเรียกด้วย code เมื่อเลือก option', () => {
    const onChange = vi.fn()
    render(<ReasonPicker event="5584" value={null} onChange={onChange} />)
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'RE_REHIRE_LT1' } })
    expect(onChange).toHaveBeenCalledWith('RE_REHIRE_LT1')
  })

  it('value prop ต้อง reflect เป็น selected option', () => {
    render(<ReasonPicker event="5597" value="TERM_RESIGN" onChange={() => {}} />)
    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe('TERM_RESIGN')
  })
})

describe('ReasonPicker — error + accessibility', () => {
  it('required=true ต้อง set aria-required และแสดง asterisk', () => {
    render(<ReasonPicker event="5584" value={null} onChange={() => {}} required />)
    const select = screen.getByRole('combobox')
    expect(select).toHaveAttribute('aria-required', 'true')
    // asterisk aria-hidden (screen reader ใช้ aria-required)
    const asterisk = screen.getByText('*')
    expect(asterisk).toBeInTheDocument()
  })

  it('error prop ต้องแสดง alert message + aria-invalid=true', () => {
    render(
      <ReasonPicker
        event="5584"
        value={null}
        onChange={() => {}}
        error="กรุณาเลือกเหตุผล"
      />
    )
    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('กรุณาเลือกเหตุผล')
    const select = screen.getByRole('combobox')
    expect(select).toHaveAttribute('aria-invalid', 'true')
  })

  it('ไม่มี error → ไม่มี alert element', () => {
    render(<ReasonPicker event="5584" value={null} onChange={() => {}} />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
