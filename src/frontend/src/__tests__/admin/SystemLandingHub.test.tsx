// SystemLandingHub.test.tsx — Part E Wave 3: /admin/system/page.tsx landing hub
// ครอบคลุม: 4 hub cards, stat widgets, navigation links
// Vitest + RTL — 5 tests

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import { useDataManagement } from '@/lib/admin/store/useDataManagement'

// -----------------------------------------------------------------------
// Mocks
// -----------------------------------------------------------------------

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children?: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

vi.mock('@/lib/admin/store/useUsersPermissions', () => {
  const mockStore = {
    getState: () => ({ appendAudit: vi.fn() }),
    setState: vi.fn(),
    subscribe: vi.fn(),
    destroy: vi.fn(),
    getInitialState: vi.fn(() => ({})),
  }
  const useUsersPermissions = Object.assign(vi.fn(() => ({})), mockStore)
  return { useUsersPermissions }
})

import SystemPage from '@/app/[locale]/admin/system/page'

// reset store ก่อนทุก test
beforeEach(() => {
  act(() => {
    localStorage.clear()
    useDataManagement.setState(useDataManagement.getInitialState())
  })
})

// -----------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------

describe('SystemPage — /admin/system landing hub', () => {
  it('TC-SYS-1: แสดง heading "ระบบ" ระดับ h1', () => {
    render(<SystemPage />)
    expect(screen.getByRole('heading', { level: 1, name: /ระบบ/ })).toBeInTheDocument()
  })

  it('TC-SYS-2: แสดง 4 hub cards พร้อม href ถูกต้อง (reports, integration, features, security)', () => {
    render(<SystemPage />)
    // hub links ตาม HUBS constant
    expect(screen.getByRole('link', { name: /รายงาน/i })).toHaveAttribute('href', '/admin/system/reports')
    expect(screen.getByRole('link', { name: /การเชื่อมต่อ/i })).toHaveAttribute('href', '/admin/system/integration')
    expect(screen.getByRole('link', { name: /ฟีเจอร์ระบบ/i })).toHaveAttribute('href', '/admin/system/features')
    expect(screen.getByRole('link', { name: /ความปลอดภัย/i })).toHaveAttribute('href', '/admin/system/security')
  })

  it('TC-SYS-3: stat widget "รายงานทั้งหมด" แสดงค่า 10 จาก seed', () => {
    render(<SystemPage />)
    // ดู stat widget — text "รายงานทั้งหมด" กับตัวเลข "10" ต้องปรากฏ
    expect(screen.getByText('รายงานทั้งหมด')).toBeInTheDocument()
    // value ข้างๆ
    const statWidget = screen.getByText('รายงานทั้งหมด').closest('div')
    expect(statWidget?.textContent).toContain('10')
  })

  it('TC-SYS-4: stat widget "การยินยอมรอดำเนินการ" แสดงค่า 2 (seed 2 pending consent)', () => {
    render(<SystemPage />)
    expect(screen.getByText('การยินยอมรอดำเนินการ')).toBeInTheDocument()
    const consentWidget = screen.getByText('การยินยอมรอดำเนินการ').closest('div')
    expect(consentWidget?.textContent).toContain('2')
  })

  it('TC-SYS-5: stat widget "Endpoints" แสดงค่า 2 (seed 2 endpoints)', () => {
    render(<SystemPage />)
    expect(screen.getByText('Endpoints')).toBeInTheDocument()
    const endpointWidget = screen.getByText('Endpoints').closest('div')
    expect(endpointWidget?.textContent).toContain('2')
  })
})
