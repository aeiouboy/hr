// EssHomePage.test.tsx — Unit tests สำหรับ ESS Home Dashboard
// ครอบคลุม greeting + 3 quick actions + pending badge (BRD #166)

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EssHomePage from '@/app/[locale]/ess/page'
import mockEmployee from '@/data/admin/mockEmployee.json'

describe('EssHomePage — greeting', () => {
  it('แสดงชื่อพนักงานจาก mockEmployee.json', () => {
    render(<EssHomePage />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.textContent).toContain(mockEmployee.firstNameTh)
    expect(heading.textContent).toContain(mockEmployee.lastNameTh)
    expect(heading.textContent).toMatch(/^สวัสดี/)
  })
})

describe('EssHomePage — quick action cards', () => {
  it('มี 3 การ์ด: แก้ไขข้อมูลส่วนตัว / ขอลางาน / สลิปเงินเดือน', () => {
    render(<EssHomePage />)

    expect(screen.getByText('แก้ไขข้อมูลส่วนตัว')).toBeInTheDocument()
    expect(screen.getByText('ขอลางาน')).toBeInTheDocument()
    expect(screen.getByText('สลิปเงินเดือน')).toBeInTheDocument()
  })

  it('"แก้ไขข้อมูลส่วนตัว" ต้อง link ไป /ess/profile/edit', () => {
    render(<EssHomePage />)
    const card = screen.getByText('แก้ไขข้อมูลส่วนตัว').closest('a')
    expect(card).toHaveAttribute('href', '/ess/profile/edit')
  })

  it('"ขอลางาน" ต้อง link ไป /ess/timeoff', () => {
    render(<EssHomePage />)
    const card = screen.getByText('ขอลางาน').closest('a')
    expect(card).toHaveAttribute('href', '/ess/timeoff')
  })

  it('"สลิปเงินเดือน" ต้อง link ไป /ess/payslip', () => {
    render(<EssHomePage />)
    const card = screen.getByText('สลิปเงินเดือน').closest('a')
    expect(card).toHaveAttribute('href', '/ess/payslip')
  })
})

describe('EssHomePage — pending workflow badge', () => {
  it('แสดง badge "คำขอรออนุมัติ" พร้อม link ไป /ess/workflows', () => {
    render(<EssHomePage />)

    const badge = screen.getByLabelText(/คำขอรออนุมัติ \d+ รายการ/)
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveAttribute('href', '/ess/workflows')
    expect(badge.textContent).toMatch(/คลิกเพื่อดูรายละเอียด/)
  })
})
