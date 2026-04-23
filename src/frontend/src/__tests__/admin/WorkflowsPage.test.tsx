// WorkflowsPage.test.tsx — Unit tests สำหรับ ESS Workflows list
// ครอบคลุม: 2 mock entries, status badges, link ไป /ess/profile/edit (BRD #166)

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import WorkflowsPage from '@/app/[locale]/ess/workflows/page'

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

  it('รายการแรกต้อง status "รออนุมัติ" (pending badge)', () => {
    render(<WorkflowsPage />)

    // badge "รออนุมัติ" ต้องปรากฏ
    expect(screen.getByText('รออนุมัติ')).toBeInTheDocument()
  })

  it('รายการที่สองต้อง status "อนุมัติแล้ว" (approved badge)', () => {
    render(<WorkflowsPage />)

    // badge "อนุมัติแล้ว" ต้องปรากฏ
    expect(screen.getByText('อนุมัติแล้ว')).toBeInTheDocument()
  })

  it('"ยื่นคำขอใหม่" button ต้อง link ไป /ess/profile/edit', () => {
    render(<WorkflowsPage />)

    const newRequestLink = screen.getByRole('link', { name: /ยื่นคำขอใหม่/i })
    expect(newRequestLink).toBeInTheDocument()
    expect(newRequestLink).toHaveAttribute('href', '/ess/profile/edit')
  })
})
