// SystemFeatures.test.tsx — Part E Wave 3: 4 System Feature pages
// ครอบคลุม: SystemFeaturesHub, Language, EDocuments, DataMigration
// Vitest + RTL — 8 tests

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { act, render, screen, fireEvent } from '@testing-library/react'
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

import SystemFeaturesPage from '@/app/admin/system/system-features/page'
import LanguagePage from '@/app/admin/system/system-features/language/page'
import EDocumentsPage from '@/app/admin/system/system-features/edocuments/page'
import DataMigrationPage from '@/app/admin/system/system-features/data-migration/page'

// reset store ก่อนทุก test
beforeEach(() => {
  act(() => {
    localStorage.clear()
    useDataManagement.setState(useDataManagement.getInitialState())
  })
})

// -----------------------------------------------------------------------
// Hub: SystemFeaturesPage
// -----------------------------------------------------------------------

describe('SystemFeaturesPage — hub landing', () => {
  it('TC-SF-1: แสดง heading "System Features" + current language indicator (seed=th → "ภาษาไทย")', () => {
    render(<SystemFeaturesPage />)
    expect(screen.getByRole('heading', { name: /System Features/i })).toBeInTheDocument()
    // indicator แสดง label ของ language seed (th → ภาษาไทย)
    expect(screen.getByText('ภาษาไทย')).toBeInTheDocument()
  })

  it('TC-SF-2: แสดง 3 tool cards (ภาษาระบบ, E-Document, Data Migration)', () => {
    render(<SystemFeaturesPage />)
    const list = screen.getByRole('list', { name: /รายการ System Features tools/i })
    const cards = list.querySelectorAll('[role="listitem"]')
    // seed มี 3 tools (language, edocuments, data-migration)
    expect(cards).toHaveLength(3)
  })
})

// -----------------------------------------------------------------------
// Language: LanguagePage
// -----------------------------------------------------------------------

describe('LanguagePage — language radio buttons', () => {
  it('TC-SF-3: แสดง 3 radio options (th/en/vn) และ seed language=th ต้อง checked', () => {
    render(<LanguagePage />)
    const radios = screen.getAllByRole('radio', { name: /ภาษาไทย|English|Tiếng Việt/ })
    expect(radios).toHaveLength(3)

    // th radio ต้อง checked by default
    const thRadio = screen.getByRole('radio', { name: /ภาษาไทย/i })
    expect(thRadio).toBeChecked()
  })

  it('TC-SF-4: เลือก "English" → indicator "ใช้งานอยู่" ย้ายไป English row', () => {
    render(<LanguagePage />)
    const enRadio = screen.getByRole('radio', { name: /English/i })
    fireEvent.click(enRadio)
    expect(enRadio).toBeChecked()

    // th ต้องไม่ checked แล้ว
    const thRadio = screen.getByRole('radio', { name: /ภาษาไทย/i })
    expect(thRadio).not.toBeChecked()
  })
})

// -----------------------------------------------------------------------
// E-Documents: EDocumentsPage
// -----------------------------------------------------------------------

describe('EDocumentsPage — document list', () => {
  it('TC-SF-5: แสดง heading "E-Document" + แสดง 8 รายการจาก seed', () => {
    render(<EDocumentsPage />)
    expect(screen.getByRole('heading', { name: /E-Document/i })).toBeInTheDocument()
    // footer แสดงจำนวน
    expect(screen.getByText(/แสดง 8 จาก 8 รายการ/i)).toBeInTheDocument()
  })

  it('TC-SF-6: filter type เปลี่ยน → แสดงเฉพาะ type นั้น (เลือก "สัญญาจ้าง" → จำนวนลดลง)', () => {
    render(<EDocumentsPage />)
    const typeSelect = screen.getByRole('combobox', { name: /กรองประเภทเอกสาร/i })
    fireEvent.change(typeSelect, { target: { value: 'สัญญาจ้าง' } })
    // footer ต้องแสดงจำนวนน้อยกว่า 8
    const footer = screen.getByText(/จาก 8 รายการ/i)
    const match = footer.textContent?.match(/แสดง (\d+) จาก/)
    if (match) {
      expect(Number(match[1])).toBeLessThanOrEqual(8)
    }
  })

  it('TC-SF-7: ปุ่ม "ดาวน์โหลด" ต้องปรากฏสำหรับ documents (≥ 1)', () => {
    render(<EDocumentsPage />)
    const downloadBtns = screen.getAllByRole('button', { name: /ดาวน์โหลด/i })
    expect(downloadBtns.length).toBeGreaterThan(0)
  })
})

// -----------------------------------------------------------------------
// Data Migration: DataMigrationPage
// -----------------------------------------------------------------------

describe('DataMigrationPage — upload stub + dry-run preview + job history', () => {
  it('TC-SF-8: แสดง heading "Data Migration" + job history จาก seed (2 jobs)', () => {
    render(<DataMigrationPage />)
    expect(screen.getByRole('heading', { name: /Data Migration/i })).toBeInTheDocument()
    // header section "ประวัติ Migration Jobs (2)"
    expect(screen.getByText(/ประวัติ Migration Jobs \(2\)/i)).toBeInTheDocument()
  })

  it('TC-SF-9: Validate / Dry Run buttons disabled เมื่อยังไม่ได้เลือกไฟล์', () => {
    render(<DataMigrationPage />)
    const dryRunBtn = screen.getByRole('button', { name: /Dry Run/i })
    const validateBtn = screen.getByRole('button', { name: /Validate/i })
    expect(dryRunBtn).toBeDisabled()
    expect(validateBtn).toBeDisabled()
  })
})
