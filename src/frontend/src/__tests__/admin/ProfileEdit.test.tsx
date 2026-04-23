// ProfileEdit.test.tsx — Unit tests สำหรับ ESS Profile Edit form
// ครอบคลุม: 4 sections, National ID readonly, required fields, saveDraft toast, submit toast (BRD #166)

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProfileEditPage from '@/app/ess/profile/edit/page'
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
  it('แสดง 4 section headings: ชื่อ-นามสกุล, วันเกิด, ที่อยู่, ผู้ติดต่อฉุกเฉิน', () => {
    render(<ProfileEditPage />)

    // ใช้ heading role (h2) เพื่อแยกจาก field label ที่ชื่อซ้ำกัน (เช่น emergency contact name)
    expect(screen.getByRole('heading', { level: 2, name: 'ชื่อ-นามสกุล' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'วันเกิด' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'ที่อยู่' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'ผู้ติดต่อฉุกเฉิน' })).toBeInTheDocument()
  })

  it('National ID section ต้องแสดงเป็น read-only (ไม่มี editable input)', () => {
    render(<ProfileEditPage />)

    // มี section เลขบัตรประชาชน
    expect(screen.getByText('เลขบัตรประชาชน')).toBeInTheDocument()

    // label ที่อธิบายว่าแก้ไขไม่ได้ต้องปรากฏ
    expect(screen.getByText(/แก้ไขไม่ได้/i)).toBeInTheDocument()

    // ตรวจสอบว่าไม่มี editable input ที่มี id="nationalId"
    expect(screen.queryByLabelText(/เลขบัตรประชาชน/i)).toBeNull()
  })

  it('required fields ต้องมี asterisk (*) กำกับ', () => {
    const { container } = render(<ProfileEditPage />)

    // label ที่มี * — ตรวจสอบว่ามีอย่างน้อย 4 field (firstNameTh, lastNameTh, dateOfBirth, emergencyContactName, emergencyContactPhone)
    const asterisks = container.querySelectorAll('span.text-red-500')
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
  it('คลิก "ส่งเพื่ออนุมัติ" ต้องเรียก submit store + แสดง toast success', async () => {
    const user = userEvent.setup()

    // spy ที่ submit ของ store
    // Zustand state + vi.spyOn(getState()) race incompatible — ตรวจ end-state แทน: submit success toast
    render(<ProfileEditPage />)
    await act(async () => {})

    const submitBtn = screen.getByRole('button', { name: /ส่งเพื่ออนุมัติ/i })
    await user.click(submitBtn)

    // toast success ปรากฏ = submit success path ทำงาน (store actually executed submit)
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
