// WorkflowsPage.test.tsx — Unit tests สำหรับ ESS Workflows list
// ครอบคลุม: 2 mock entries, status badges, link ไป /ess/profile/edit (BRD #166)

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import WorkflowsPage from '@/app/[locale]/ess/workflows/page'

const MOCK_USER_ID = 'EMP001'

// Mock next/navigation so useParams returns locale='th'
vi.mock('next/navigation', () => ({
  useParams: () => ({ locale: 'th' }),
  useRouter: () => ({ push: vi.fn() }),
  usePathname: vi.fn().mockReturnValue('/th/ess/workflows'),
}))

// Mock auth store so userId matches submitted requests
vi.mock('@/stores/auth-store', () => ({
  useAuthStore: (sel: (s: { userId: string }) => unknown) =>
    sel({ userId: MOCK_USER_ID }),
}))

// Mock workflow-approvals store with 2 entries for MOCK_USER_ID
vi.mock('@/stores/workflow-approvals', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/stores/workflow-approvals')>()
  const NOW = new Date().toISOString()
  return {
    ...original,
    useWorkflowApprovals: (sel: (s: { requests: unknown[] }) => unknown) =>
      sel({
        requests: [
          {
            id: 'REQ-001',
            submittedBy: { id: MOCK_USER_ID, name: 'ทดสอบ', role: 'employee' },
            submittedAt: NOW,
            status: 'pending_spd',
            diffs: [{ path: 'firstNameTh', label: 'ชื่อ (ไทย)', before: 'เก่า', after: 'ใหม่' }],
            audit: [{ actorName: 'ทดสอบ', action: 'submit', at: NOW }],
          },
          {
            id: 'REQ-002',
            submittedBy: { id: MOCK_USER_ID, name: 'ทดสอบ', role: 'employee' },
            submittedAt: NOW,
            status: 'approved',
            diffs: [{ path: 'lastNameTh', label: 'นามสกุล (ไทย)', before: 'เก่า', after: 'ใหม่' }],
            audit: [{ actorName: 'SPD', action: 'approve', at: NOW }],
          },
        ],
      }),
  }
})

beforeEach(() => {
  vi.clearAllMocks()
})

describe('WorkflowsPage — workflow list', () => {
  it('แสดง heading "คำขอของฉัน"', () => {
    render(<WorkflowsPage />)

    expect(screen.getByRole('heading', { level: 1, name: /คำขอของฉัน/i })).toBeInTheDocument()
  })

  it('แสดง 2 workflow entries ใน list', () => {
    render(<WorkflowsPage />)

    const list = screen.getByRole('list', { name: /รายการคำขอของฉัน/i })
    const items = list.querySelectorAll('li')
    expect(items).toHaveLength(2)
  })

  it('รายการแรกต้อง status "รอ SPD อนุมัติ" (pending badge)', () => {
    render(<WorkflowsPage />)

    expect(screen.getByText('รอ SPD อนุมัติ')).toBeInTheDocument()
  })

  it('รายการที่สองต้อง status "อนุมัติแล้ว" (approved badge)', () => {
    render(<WorkflowsPage />)

    expect(screen.getByText('อนุมัติแล้ว')).toBeInTheDocument()
  })

  it('"ยื่นคำขอใหม่" button ต้อง link ไป /th/ess/profile/edit', () => {
    render(<WorkflowsPage />)

    const newRequestLink = screen.getByRole('link', { name: /ยื่นคำขอใหม่/i })
    expect(newRequestLink).toBeInTheDocument()
    expect(newRequestLink).toHaveAttribute('href', '/th/ess/profile/edit')
  })
})
