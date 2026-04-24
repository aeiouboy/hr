// StepIdentity.vn-issue-place.test.tsx — AC-5 R3 VN Issue Place conditional render
// Traceability: specs/hr-phase1-ris-finish.md §4 "Write Tests" + AC-5
//
// AC-5 R3: StepIdentity renders "สถานที่ออกบัตร" field ก็ต่อเมื่อ
//   country === 'VN' หรือ biographical.nationality === 'VN'
//   (OR condition — StepIdentity.tsx line 465)
//
// Source rule: BA row 19 — [VN] Issue Place — optional (Vietnam only)

import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import StepIdentity from '@/app/[locale]/admin/hire/steps/StepIdentity'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'

// ── mock loadCompanies เพื่อให้ companies พร้อมทันที (pattern จาก StepIdentity.test.tsx) ──
vi.mock('@/lib/admin/store/loadCompanies', () => ({
  loadCompanies: () => [
    { code: 'CEN', labelEn: 'Central Group', labelTh: 'กลุ่มเซ็นทรัล', country: 'THA' },
  ],
}))

// reset store ก่อนทุก test เพื่อ isolation
beforeEach(() => {
  act(() => {
    useHireWizard.getState().reset()
  })
})

// ─── AC-5 R3: VN Issue Place conditional render ───────────────────────────────

describe('AC-5 R3 VN Issue Place — conditional render ตาม nationality/country', () => {
  it('Case 1: nationality="VN" → สถานที่ออกบัตร input ต้องแสดง', () => {
    // seed biographical.nationality = 'VN' ใน store ก่อน render
    // StepIdentity อ่าน nationality จาก formData.biographical?.nationality
    act(() => {
      useHireWizard.getState().setStepData('biographical', { nationality: 'VN' })
    })

    render(<StepIdentity />)

    // label คือ "สถานที่ออกบัตร" (StepIdentity.tsx line 468)
    const field = screen.getByLabelText(/สถานที่ออกบัตร/)
    expect(field).toBeInTheDocument()
  })

  it('Case 2: nationality="TH" → สถานที่ออกบัตร input ต้องไม่แสดง', () => {
    // default country ใน identity store = '' (ไม่ใช่ VN)
    // biographical.nationality = 'TH' → ทั้งสองเงื่อนไขไม่ match → ซ่อน field
    act(() => {
      useHireWizard.getState().setStepData('biographical', { nationality: 'TH' })
    })

    render(<StepIdentity />)

    const field = screen.queryByLabelText(/สถานที่ออกบัตร/)
    expect(field).toBeNull()
  })

  it('Case 3 (bonus): country="VN" + nationality="TH" → OR condition → field แสดง', () => {
    // country ใน identity slice = 'VN' → condition ซ้ายเป็น true → field แสดง
    // แม้ nationality ไม่ใช่ VN (OR logic ที่ StepIdentity.tsx line 465)
    act(() => {
      useHireWizard.getState().setStepData('identity', { country: 'VN' })
      useHireWizard.getState().setStepData('biographical', { nationality: 'TH' })
    })

    render(<StepIdentity />)

    const field = screen.getByLabelText(/สถานที่ออกบัตร/)
    expect(field).toBeInTheDocument()
  })
})
