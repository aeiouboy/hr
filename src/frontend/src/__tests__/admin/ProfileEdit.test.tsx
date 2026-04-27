// ProfileEdit.test.tsx — Unit tests สำหรับ ESS Profile Edit form
// ครอบคลุม: 4 sections, National ID readonly, required fields, saveDraft toast, submit toast (BRD #166)

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProfileEditPage from '@/app/[locale]/ess/profile/edit/page'
import { useProfileEdit } from '@/lib/admin/store/useProfileEdit'

// mock next/navigation — ProfileEditPage ใช้ useRouter().push
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

// reset Zustand store + localStorage ก่อนทุก test
beforeEach(() => {
  localStorage.clear()
  act(() => {
    useProfileEdit.getState().reset()
  })
})

describe('ProfileEditPage — 4 sections render', () => {
  it('แสดง section headings: ข้อมูลส่วนตัว, ที่อยู่, ผู้ติดต่อฉุกเฉิน', () => {
    const { container } = render(<ProfileEditPage />)

    // sections ใช้ humi-eyebrow class (div) ไม่ใช่ h2
    const eyebrows = container.querySelectorAll('.humi-eyebrow')
    const texts = Array.from(eyebrows).map((el) => el.textContent ?? '')

    expect(texts.some((t) => t.includes('ข้อมูลส่วนตัว'))).toBe(true)
    expect(texts.some((t) => t.includes('ที่อยู่'))).toBe(true)
    expect(texts.some((t) => t.includes('ผู้ติดต่อฉุกเฉิน'))).toBe(true)
  })

  it('National ID section ต้องแสดงเป็น read-only (ไม่มี editable input)', () => {
    render(<ProfileEditPage />)

    // มี section เลขบัตรประชาชน (label ใน component = "เลขบัตรประชาชน (National ID)")
    expect(screen.getByText(/เลขบัตรประชาชน/i)).toBeInTheDocument()

    // label ที่อธิบายว่าแก้ไขไม่ได้ต้องปรากฏ
    expect(screen.getByText(/แก้ไขไม่ได้/i)).toBeInTheDocument()

    // ตรวจสอบว่าไม่มี editable input ที่มี id="nationalId"
    expect(screen.queryByLabelText(/เลขบัตรประชาชน/i)).toBeNull()
  })

  it('required fields ต้องมี asterisk (*) กำกับ', () => {
    const { container } = render(<ProfileEditPage />)

    // component ใช้ span[class*="color-danger"] สำหรับ * ไม่ใช่ text-red-500
    const asterisks = container.querySelectorAll('span[class*="color-danger"]')
    // ต้องมี * อย่างน้อย 4 ตัว
    expect(asterisks.length).toBeGreaterThanOrEqual(4)
  })
})

describe('ProfileEditPage — บันทึกร่าง', () => {
  it('คลิก "บันทึกร่าง" ต้องแสดง toast "บันทึกร่างแล้ว"', async () => {
    const user = userEvent.setup()
    render(<ProfileEditPage />)

    const saveDraftBtn = screen.getByRole('button', { name: /บันทึกร่าง/i })
    await user.click(saveDraftBtn)

    // toast ต้องปรากฏทันที
    await waitFor(() => {
      const toast = screen.getByRole('status')
      expect(toast.textContent).toContain('บันทึกร่างแล้ว')
    })
  })
})

describe('ProfileEditPage — ส่งเพื่ออนุมัติ', () => {
  it('คลิก "ส่งเพื่ออนุมัติ" เมื่อมีการเปลี่ยนแปลง → แสดง toast success', async () => {
    const user = userEvent.setup()

    // ตั้ง draft ให้ต่างจาก baseline เพื่อให้ computeDiff() เจอ diff
    // ใช้ nickname (ไม่ใช่ชื่อ/นามสกุล) เพื่อหลีก nameChanged guard ที่บล็อก submit
    act(() => {
      useProfileEdit.setState({
        isDirty: true,
        draft: { ...useProfileEdit.getState().draft, nickname: 'ทดสอบ' },
      })
    })

    render(<ProfileEditPage />)
    await act(async () => {})

    const submitBtn = screen.getByRole('button', { name: /ส่งเพื่ออนุมัติ/i })
    await user.click(submitBtn)

    // toast success ปรากฏ = submit success path ทำงาน
    await waitFor(
      () => {
        const toast = screen.queryByRole('status')
        expect(toast).not.toBeNull()
        expect(toast!.textContent).toContain('ส่งคำขอแก้ไขข้อมูลส่วนตัวแล้ว')
      },
      { timeout: 3000 }
    )
  })

  it('ระหว่าง submit — ปุ่มต้องแสดง loading state "กำลังส่ง..." เมื่อ isSubmitting=true', async () => {
    // ตั้ง state ตรงๆ ผ่าน setState — หลบ vi.spyOn Zustand incompat
    useProfileEdit.setState({ isSubmitting: true })

    render(<ProfileEditPage />)
    await act(async () => {})

    // ปุ่มต้อง disabled + text = "กำลังส่ง..."
    const btn = screen.getByRole('button', { name: /กำลังส่ง/i })
    expect(btn).toBeDisabled()

    // cleanup
    useProfileEdit.setState({ isSubmitting: false })
  })
})
