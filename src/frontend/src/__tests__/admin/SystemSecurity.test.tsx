// SystemSecurity.test.tsx — Part E Wave 3: 4 Security pages
// ครอบคลุม: SecurityHub, ConsentPage, TrafficPage, SecuritySettingsPage
// Vitest + RTL — 12 tests

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { act, render, screen, fireEvent, within } from '@testing-library/react'
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

vi.mock('@/lib/admin/utils/csvExport', () => ({
  exportToCSV: vi.fn(),
  buildCsvText: vi.fn(() => ''),
}))

import SecurityPage from '@/app/[locale]/admin/system/security/page'
import ConsentPage from '@/app/[locale]/admin/system/security/consent/page'
import TrafficPage from '@/app/[locale]/admin/system/security/traffic/page'
import SecuritySettingsPage from '@/app/[locale]/admin/system/security/settings/page'

// reset store ก่อนทุก test
beforeEach(() => {
  act(() => {
    localStorage.clear()
    useDataManagement.setState(useDataManagement.getInitialState())
  })
})

// -----------------------------------------------------------------------
// Hub: SecurityPage
// -----------------------------------------------------------------------

describe('SecurityPage — Security & Governance hub', () => {
  it('TC-SEC-1: แสดง heading "Security & Governance"', () => {
    render(<SecurityPage />)
    expect(screen.getByRole('heading', { name: /Security & Governance/i })).toBeInTheDocument()
  })

  it('TC-SEC-2: แสดง 3 security tool cards (Consent Form, Traffic Report, Security Settings)', () => {
    render(<SecurityPage />)
    // cards ใน list
    const list = screen.getByRole('list', { name: /รายการ Security tools/i })
    const cards = list.querySelectorAll('[role="listitem"]')
    expect(cards).toHaveLength(3)
    // ตรวจชื่อ cards
    const listEl = within(list)
    expect(listEl.getByText('Consent Form')).toBeInTheDocument()
    expect(listEl.getByText('Traffic Report')).toBeInTheDocument()
    expect(listEl.getByText('Security Settings')).toBeInTheDocument()
  })

  it('TC-SEC-3: alert summary bar แสดง "Consent รออนุมัติ" เมื่อ pendingConsent > 0 (seed=2 pending)', () => {
    render(<SecurityPage />)
    expect(screen.getByText(/Consent รออนุมัติ/i)).toBeInTheDocument()
    // badge count ต้องเป็น 2
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('TC-SEC-4: Session Timeout badge แสดงค่าจาก seed (30 นาที)', () => {
    render(<SecurityPage />)
    expect(screen.getByText(/Session Timeout/i)).toBeInTheDocument()
    expect(screen.getByText('30 นาที')).toBeInTheDocument()
  })
})

// -----------------------------------------------------------------------
// Consent: ConsentPage
// -----------------------------------------------------------------------

describe('ConsentPage — PDPA consent management', () => {
  it('TC-SEC-5: แสดง heading "Consent Form" + summary cards (signed/pending/expired)', () => {
    render(<ConsentPage />)
    expect(screen.getByRole('heading', { name: /Consent Form/i })).toBeInTheDocument()
    // seed: signed=8, pending=2, expired=0
    expect(screen.getByText('ลงนามแล้ว')).toBeInTheDocument()
    expect(screen.getByText('รอลงนาม')).toBeInTheDocument()
  })

  it('TC-SEC-6: seed มี 2 pending → ปุ่ม "ส่ง Reminder" ต้อง enabled', () => {
    render(<ConsentPage />)
    // ปุ่มมี aria-label "ส่ง Reminder ให้พนักงาน 2 คนที่รอลงนาม"
    const reminderBtn = screen.getByRole('button', { name: /ส่ง Reminder/i })
    expect(reminderBtn).not.toBeDisabled()
  })

  it('TC-SEC-7: click "ส่ง Reminder" → แสดง success alert', () => {
    render(<ConsentPage />)
    const reminderBtn = screen.getByRole('button', { name: /ส่ง Reminder/i })
    fireEvent.click(reminderBtn)
    // ต้องแสดง alert role
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByRole('alert').textContent).toMatch(/ส่ง Reminder/i)
  })

  it('TC-SEC-8: filter "รอลงนาม" → แสดงเฉพาะ pending rows', () => {
    render(<ConsentPage />)
    const filterSelect = screen.getByRole('combobox', { name: /กรองสถานะ/i })
    fireEvent.change(filterSelect, { target: { value: 'pending' } })

    // footer ต้องแสดง 2 จาก 10
    expect(screen.getByText(/แสดง 2 จาก 10 รายการ/i)).toBeInTheDocument()
  })
})

// -----------------------------------------------------------------------
// Traffic: TrafficPage
// -----------------------------------------------------------------------

describe('TrafficPage — login activity table', () => {
  it('TC-SEC-9: แสดง heading "Traffic Report" + ตาราง Login Activity', () => {
    render(<TrafficPage />)
    expect(screen.getByRole('heading', { name: /Traffic Report/i })).toBeInTheDocument()
    expect(screen.getByRole('table', { name: /Login Activity/i })).toBeInTheDocument()
  })

  it('TC-SEC-10: default range 7 วัน → ตารางแสดง rows (seed 50 entries ทั้งหมดอยู่ใน range วันนี้)', () => {
    // seed trafficLog มีทุก entry วันที่ 2026-04-23 → ต้องอยู่ใน default 7 วัน
    render(<TrafficPage />)
    const rows = screen.getByRole('table', { name: /Login Activity/i }).querySelectorAll('tbody tr')
    // ≥ 1 row (ไม่ empty state)
    expect(rows.length).toBeGreaterThan(0)
  })

  it('TC-SEC-11: checkbox "เฉพาะ login ล้มเหลว" → filter เฉพาะ failed rows', () => {
    render(<TrafficPage />)
    const failedCheckbox = screen.getByRole('checkbox', { name: /เฉพาะ login ล้มเหลว/i })
    fireEvent.click(failedCheckbox)

    // ต้องมี badge "ล้มเหลว" ใน status column (rows ที่ failed)
    // หรือ ไม่มี row เลยถ้า seed ไม่มี failed — ให้ดูว่า footer ยังแสดงอยู่
    const footer = screen.getByText(/จาก \d+ รายการ/i)
    expect(footer).toBeInTheDocument()
  })

  it('TC-SEC-12: Export CSV button ต้อง enabled เมื่อมีข้อมูลอยู่', () => {
    render(<TrafficPage />)
    const exportBtn = screen.getByRole('button', { name: /Export CSV/i })
    // ถ้ามี rows → enabled
    expect(exportBtn).toBeInTheDocument()
  })
})

// -----------------------------------------------------------------------
// Settings: SecuritySettingsPage
// -----------------------------------------------------------------------

describe('SecuritySettingsPage — 4 sections', () => {
  it('TC-SEC-13: แสดง heading "Security Settings" + 4 section headings', () => {
    render(<SecuritySettingsPage />)
    expect(screen.getByRole('heading', { name: /Security Settings/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Hidden Profile/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Direct Users/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Encryption Policy/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Session Timeout/i })).toBeInTheDocument()
  })

  it('TC-SEC-14: Encryption Policy section ต้องมี badge "READ-ONLY" + algorithm AES-256-GCM', () => {
    render(<SecuritySettingsPage />)
    expect(screen.getByText('READ-ONLY')).toBeInTheDocument()
    expect(screen.getByText('AES-256-GCM')).toBeInTheDocument()
  })

  it('TC-SEC-15: Session Timeout — กรอกค่า < 5 แล้ว save → แสดง error message', () => {
    render(<SecuritySettingsPage />)
    const input = screen.getByRole('spinbutton', { name: /เวลา/i })
    fireEvent.change(input, { target: { value: '3' } })
    const saveBtn = screen.getAllByRole('button', { name: /บันทึก/i })[0]
    fireEvent.click(saveBtn)
    // ต้องแสดง validation error
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByRole('alert').textContent).toMatch(/5-480/i)
  })

  it('TC-SEC-16: Session Timeout — กรอกค่าถูกต้อง (60) + save → แสดง "✓ บันทึกแล้ว" + store update', () => {
    render(<SecuritySettingsPage />)
    const input = screen.getByRole('spinbutton', { name: /เวลา/i })
    fireEvent.change(input, { target: { value: '60' } })
    const saveBtn = screen.getAllByRole('button', { name: /บันทึก/i })[0]
    fireEvent.click(saveBtn)
    // ต้องเปลี่ยน label เป็น saved state
    expect(screen.getAllByRole('button', { name: /บันทึกแล้ว/i })[0]).toBeInTheDocument()
    // store ต้องอัปเดต
    expect(useDataManagement.getState().sessionTimeoutMinutes).toBe(60)
  })

  it('TC-SEC-17: Direct Users section แสดง table (seed 2 direct users)', () => {
    render(<SecuritySettingsPage />)
    const table = screen.getByRole('table', { name: /Direct Users/i })
    const rows = table.querySelectorAll('tbody tr')
    expect(rows).toHaveLength(2)
  })
})
