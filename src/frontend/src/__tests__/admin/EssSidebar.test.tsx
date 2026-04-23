// EssSidebar.test.tsx — Unit tests สำหรับ ESS Left Sidebar
// ครอบคลุม 4 nav items (Profile / Time Off / Payslip / Workflows) + active state (BRD #166)

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EssSidebar } from '@/components/admin/ess/EssSidebar'

// mock next/navigation — usePathname ต้อง return string เสมอใน jsdom
vi.mock('next/navigation', () => ({
  usePathname: () => '/ess/profile',
}))

describe('EssSidebar — 4 items spec', () => {
  it('ต้อง render 4 nav items พร้อม Thai labels', () => {
    render(<EssSidebar />)

    expect(screen.getByText('ข้อมูลส่วนตัว')).toBeInTheDocument()
    expect(screen.getByText('การลางาน')).toBeInTheDocument()
    expect(screen.getByText('สลิปเงินเดือน')).toBeInTheDocument()
    expect(screen.getByText('คำขอของฉัน')).toBeInTheDocument()
  })

  it('แต่ละ item ต้องมี href ตรงตาม spec', () => {
    render(<EssSidebar />)

    const profileLink = screen.getByText('ข้อมูลส่วนตัว').closest('a')
    const timeoffLink = screen.getByText('การลางาน').closest('a')
    const payslipLink = screen.getByText('สลิปเงินเดือน').closest('a')
    const workflowsLink = screen.getByText('คำขอของฉัน').closest('a')

    expect(profileLink).toHaveAttribute('href', '/ess/profile')
    expect(timeoffLink).toHaveAttribute('href', '/ess/timeoff')
    expect(payslipLink).toHaveAttribute('href', '/ess/payslip')
    expect(workflowsLink).toHaveAttribute('href', '/ess/workflows')
  })

  it('sidebar ต้องมี aria-label "เมนู Self-Service" (a11y)', () => {
    render(<EssSidebar />)
    expect(screen.getByLabelText('เมนู Self-Service')).toBeInTheDocument()
  })

  it('item ที่ตรง pathname ต้อง active (aria-current="page")', () => {
    render(<EssSidebar />)

    // mock usePathname return '/ess/profile' → Profile ต้อง active
    const profileLink = screen.getByText('ข้อมูลส่วนตัว').closest('a')
    expect(profileLink).toHaveAttribute('aria-current', 'page')

    // items อื่นต้องไม่ active
    const timeoffLink = screen.getByText('การลางาน').closest('a')
    expect(timeoffLink).not.toHaveAttribute('aria-current')
  })

  it('className prop ต้องผสมเข้า aside element', () => {
    const { container } = render(<EssSidebar className="custom-class hidden" />)
    const aside = container.querySelector('aside')
    expect(aside?.className).toContain('custom-class')
    expect(aside?.className).toContain('hidden')
  })
})
