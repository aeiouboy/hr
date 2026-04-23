// ProfileView.test.tsx — Unit tests สำหรับ ESS Profile View (read-only)
// ครอบคลุม: 4 section cards, National ID mask, "แก้ไขข้อมูล" link (BRD #166)

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProfileViewPage from '@/app/[locale]/ess/profile/page'
import mockEmployee from '@/data/admin/mockEmployee.json'

describe('ProfileViewPage — 4 section cards', () => {
  it('แสดง section ข้อมูลส่วนตัว พร้อมชื่อไทยและอังกฤษของพนักงาน', () => {
    render(<ProfileViewPage />)

    // ตรวจสอบ section heading "ข้อมูลส่วนตัว"
    expect(screen.getByRole('region', { name: /ข้อมูลส่วนตัว/i })).toBeInTheDocument()

    // ตรวจสอบชื่อพนักงาน (Thai + English) จาก mock data
    expect(screen.getByText(new RegExp(mockEmployee.firstNameTh))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(mockEmployee.firstNameEn))).toBeInTheDocument()
  })

  it('แสดง section ที่อยู่, ผู้ติดต่อฉุกเฉิน, และเลขบัตรประชาชนครบ 4 section', () => {
    render(<ProfileViewPage />)

    // 4 sections ต้องมี heading ครบ
    expect(screen.getByRole('region', { name: /ที่อยู่/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /ผู้ติดต่อฉุกเฉิน/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /เลขบัตรประชาชน/i })).toBeInTheDocument()

    // ที่อยู่ต้องแสดงค่าจาก mock
    expect(screen.getByText(mockEmployee.address)).toBeInTheDocument()

    // ผู้ติดต่อฉุกเฉิน: ชื่อ + เบอร์
    expect(screen.getByText(mockEmployee.emergencyContact.name)).toBeInTheDocument()
    expect(screen.getByText(mockEmployee.emergencyContact.phone)).toBeInTheDocument()
  })

  it('National ID ต้องแสดงในรูปแบบ mask (X-XXXX-XXXXX-XX-X)', () => {
    render(<ProfileViewPage />)

    // ตัวเลขหลังสุด 1 ตัวของ nationalId จะปรากฏใน format X-XXXX-XXXXX-XX-{lastDigit}
    const lastDigit = mockEmployee.nationalId.slice(-1)
    const maskedPattern = new RegExp(`X-XXXX-XXXXX-XX-${lastDigit}`)
    const maskedEl = screen.getByText(maskedPattern)
    expect(maskedEl).toBeInTheDocument()

    // ตรวจสอบว่าเลขจริงทั้งหมดไม่ถูก expose (ยกเว้นตัวสุดท้าย)
    // เลข 13 หลักต้องไม่ปรากฏเป็น plain text
    expect(screen.queryByText(mockEmployee.nationalId)).not.toBeInTheDocument()
  })

  it('"แก้ไขข้อมูล" button ต้อง link ไปที่ /ess/profile/edit', () => {
    render(<ProfileViewPage />)

    const editLink = screen.getByRole('link', { name: /แก้ไขข้อมูล/i })
    expect(editLink).toBeInTheDocument()
    expect(editLink).toHaveAttribute('href', '/ess/profile/edit')
  })
})
