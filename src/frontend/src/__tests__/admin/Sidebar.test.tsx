// Sidebar.test.tsx — Unit tests สำหรับ Admin Portal Sidebar (Lifecycle Actions section)
// ครอบคลุม AC-1: 4 lifecycle sub-links (Hire/Rehire/Transfer/Terminate), active state, aria-current

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { Sidebar } from '@/components/admin/shell-ref/Sidebar'

// mock usePathname — ต้องเปลี่ยนค่าได้ระหว่าง tests
let mockPathname = '/admin'
vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}))

beforeEach(() => {
  mockPathname = '/admin'
  cleanup()
})

describe('Sidebar — Lifecycle Actions section (AC-1)', () => {
  it('ต้อง render 4 sub-links: Hire, Rehire, Transfer, Terminate', () => {
    render(<Sidebar />)

    // Thai labels สำหรับ 4 sub-items
    expect(screen.getByText('รับพนักงานใหม่')).toBeInTheDocument()
    expect(screen.getByText('จ้างใหม่อีกครั้ง')).toBeInTheDocument()
    expect(screen.getByText('โอนย้าย')).toBeInTheDocument()
    expect(screen.getByText('ออกจากงาน')).toBeInTheDocument()
  })

  it('sub-links ต้องมี href ตรงตาม spec', () => {
    render(<Sidebar />)

    expect(screen.getByText('รับพนักงานใหม่').closest('a')).toHaveAttribute('href', '/admin/hire')
    expect(screen.getByText('จ้างใหม่อีกครั้ง').closest('a')).toHaveAttribute('href', '/admin/rehire')
    expect(screen.getByText('โอนย้าย').closest('a')).toHaveAttribute('href', '/admin/transfer')
    expect(screen.getByText('ออกจากงาน').closest('a')).toHaveAttribute('href', '/admin/terminate')
  })

  it('section header "Lifecycle Actions" ต้องปรากฏ', () => {
    render(<Sidebar />)
    expect(screen.getByText('Lifecycle Actions')).toBeInTheDocument()
  })
})

describe('Sidebar — active state', () => {
  it('อยู่ที่ /admin/rehire → link Rehire ต้อง active (aria-current="page")', () => {
    mockPathname = '/admin/rehire'
    render(<Sidebar />)

    const rehireLink = screen.getByText('จ้างใหม่อีกครั้ง').closest('a')
    expect(rehireLink).toHaveAttribute('aria-current', 'page')

    // link อื่นต้องไม่ active
    const transferLink = screen.getByText('โอนย้าย').closest('a')
    expect(transferLink).not.toHaveAttribute('aria-current')
  })

  it('อยู่ที่ /admin/terminate/step-2 (sub-path) → Terminate ยัง active', () => {
    mockPathname = '/admin/terminate/step-2'
    render(<Sidebar />)

    const terminateLink = screen.getByText('ออกจากงาน').closest('a')
    expect(terminateLink).toHaveAttribute('aria-current', 'page')
  })

  it('อยู่ที่ /admin (dashboard) → 4 lifecycle links ต้องไม่ active', () => {
    mockPathname = '/admin'
    render(<Sidebar />)

    const hireLink = screen.getByText('รับพนักงานใหม่').closest('a')
    const rehireLink = screen.getByText('จ้างใหม่อีกครั้ง').closest('a')
    const transferLink = screen.getByText('โอนย้าย').closest('a')
    const terminateLink = screen.getByText('ออกจากงาน').closest('a')

    expect(hireLink).not.toHaveAttribute('aria-current')
    expect(rehireLink).not.toHaveAttribute('aria-current')
    expect(transferLink).not.toHaveAttribute('aria-current')
    expect(terminateLink).not.toHaveAttribute('aria-current')
  })
})

describe('Sidebar — accessibility + structure', () => {
  it('aside ต้องมี aria-label "เมนูหลัก"', () => {
    render(<Sidebar />)
    expect(screen.getByLabelText('เมนูหลัก')).toBeInTheDocument()
  })

  it('className prop ต้องผสมเข้า aside element', () => {
    const { container } = render(<Sidebar className="custom-sidebar hidden" />)
    const aside = container.querySelector('aside')
    expect(aside?.className).toContain('custom-sidebar')
    expect(aside?.className).toContain('hidden')
  })
})
