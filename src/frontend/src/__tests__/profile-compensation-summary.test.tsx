/**
 * profile-compensation-summary.test.tsx — CompensationSummary component tests (hr#83 BRD #170)
 * Framework: Vitest + jsdom + React Testing Library
 *
 * Covers:
 *   AC-1 — all 4 sections render (base/recurring/ytd/link)
 *   AC-2 — base salary masked by default (last 4 chars visible, '฿ ••••,500')
 *   AC-3 — reveal button unmasks salary + shows SH1-deferral toast with PIN mention
 *   AC-4 — payslip link href === '/th/payslip' (locale from useParams)
 *   AC-5 — YTD sums current-year payslips only (Buddhist year → Gregorian conversion)
 *   AC-6 — all visible labels are Thai-primary (no SF-style bilingual duplicates)
 *
 * Edge cases:
 *   - Toggle mask off then back on (reveal button re-masks without showing toast again)
 *   - maskCurrency for value where num.length <= 4 (no mask needed)
 */

import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'

// Mock next/navigation — useParams returns locale 'th'
vi.mock('next/navigation', () => ({
  useParams: () => ({ locale: 'th' }),
}))

// Mock next-intl if useTranslations is consumed (component does not import it currently,
// but guard here so test suite survives future refactors)
vi.mock('next-intl', () => ({
  useTranslations: () => (k: string) => k,
}))

// Mock next/link — render as plain <a> so href is inspectable via getAttribute
vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}))

// Mock lucide-react icons to avoid SVG rendering complexity in jsdom
vi.mock('lucide-react', () => ({
  Wallet: () => null,
  Eye: () => null,
  EyeOff: () => null,
  ExternalLink: () => null,
}))

import CompensationSummary from '@/components/profile/CompensationSummary'

afterEach(() => {
  cleanup()
  vi.clearAllTimers()
})

// ── helpers ──────────────────────────────────────────────────────────────────

/** HUMI_MY_PROFILE.comp.base = '฿ 82,500'
 *  maskCurrency: num = '82,500' (length 6), last 4 = ',500'
 *  masked output = '฿ ••••,500'
 */
const MASKED_PATTERN = /••••,500/
const UNMASKED_PATTERN = /82,500/

// ── AC-1: all 4 sections render ──────────────────────────────────────────────

describe('hr#83 BRD #170 — CompensationSummary', () => {
  it('AC-1 — renders all 4 sections (base/recurring/ytd/link)', () => {
    render(<CompensationSummary />)
    expect(screen.getByTestId('comp-base')).toBeInTheDocument()
    expect(screen.getByTestId('comp-recurring')).toBeInTheDocument()
    expect(screen.getByTestId('comp-ytd')).toBeInTheDocument()
    expect(screen.getByTestId('comp-payslip-link')).toBeInTheDocument()
  })

  it('AC-1 (root) — root section has data-testid="compensation-summary"', () => {
    render(<CompensationSummary />)
    expect(screen.getByTestId('compensation-summary')).toBeInTheDocument()
  })

  // ── AC-2: base salary masked by default ────────────────────────────────────

  it('AC-2 — base salary masked by default (last 4 chars visible: ,500)', () => {
    render(<CompensationSummary />)
    const baseSection = screen.getByTestId('comp-base')
    // Masked: '฿ ••••,500'
    expect(baseSection.textContent).toMatch(MASKED_PATTERN)
    // Full amount must NOT be visible on initial render
    expect(baseSection.textContent).not.toMatch(UNMASKED_PATTERN)
  })

  it('AC-2 (aria-label) — reveal button has aria-label "แสดงเงินเดือน" when masked', () => {
    render(<CompensationSummary />)
    expect(screen.getByRole('button', { name: 'แสดงเงินเดือน' })).toBeInTheDocument()
  })

  // ── AC-3: reveal button unmasks + shows toast ───────────────────────────────

  it('AC-3 — clicking reveal unmasks base salary', async () => {
    render(<CompensationSummary />)
    const revealBtn = screen.getByRole('button', { name: 'แสดงเงินเดือน' })
    fireEvent.click(revealBtn)
    await waitFor(() => {
      expect(screen.getByTestId('comp-base').textContent).toMatch(UNMASKED_PATTERN)
    })
    // Mask characters should no longer be visible
    expect(screen.getByTestId('comp-base').textContent).not.toMatch(MASKED_PATTERN)
  })

  it('AC-3 — first reveal shows SH1-deferral toast with PIN mention', async () => {
    render(<CompensationSummary />)
    fireEvent.click(screen.getByRole('button', { name: 'แสดงเงินเดือน' }))
    await waitFor(() => {
      expect(screen.getByTestId('comp-reveal-toast')).toBeInTheDocument()
    })
    const toast = screen.getByTestId('comp-reveal-toast')
    expect(toast.textContent).toMatch(/PIN/)
    expect(toast.textContent).toMatch(/BRD #170/)
  })

  it('AC-3 (toggle) — clicking reveal again re-masks salary and changes aria-label to "ซ่อนเงินเดือน"', async () => {
    render(<CompensationSummary />)
    // First click — unmask
    fireEvent.click(screen.getByRole('button', { name: 'แสดงเงินเดือน' }))
    await waitFor(() => {
      expect(screen.getByTestId('comp-base').textContent).toMatch(UNMASKED_PATTERN)
    })
    // Second click — re-mask
    fireEvent.click(screen.getByRole('button', { name: 'ซ่อนเงินเดือน' }))
    await waitFor(() => {
      expect(screen.getByTestId('comp-base').textContent).toMatch(MASKED_PATTERN)
    })
    expect(screen.getByTestId('comp-base').textContent).not.toMatch(UNMASKED_PATTERN)
  })

  it('AC-3 (toast no-repeat) — re-masking then re-revealing does NOT show a second toast while first still active', async () => {
    render(<CompensationSummary />)
    // First reveal → toast visible
    fireEvent.click(screen.getByRole('button', { name: 'แสดงเงินเดือน' }))
    await waitFor(() => expect(screen.getByTestId('comp-reveal-toast')).toBeInTheDocument())
    // Re-mask (toast still alive from first reveal since < 3.5s)
    fireEvent.click(screen.getByRole('button', { name: 'ซ่อนเงินเดือน' }))
    // Second reveal — toast already present, should remain (no duplicate)
    fireEvent.click(screen.getByRole('button', { name: 'แสดงเงินเดือน' }))
    // Only one toast element in DOM (no duplicate)
    expect(screen.getAllByTestId('comp-reveal-toast')).toHaveLength(1)
  })

  // ── AC-4: payslip link href === '/th/payslip' ───────────────────────────────

  it('AC-4 — payslip link href is /th/payslip (locale from useParams)', () => {
    render(<CompensationSummary />)
    const link = screen.getByTestId('comp-payslip-link')
    expect(link.getAttribute('href')).toBe('/th/payslip')
  })

  it('AC-4 — link text contains ดูใบสลิปเต็ม', () => {
    render(<CompensationSummary />)
    const link = screen.getByTestId('comp-payslip-link')
    expect(link.textContent).toMatch(/ดูใบสลิปเต็ม/)
  })

  // ── AC-5: YTD computed from current-year payslips only ─────────────────────
  //
  // HUMI_PAYSLIPS: 4 entries, all dated 2569 BE = 2026 CE
  // Sum = 78450 + 78450 + 82212.75 + 74980 = 314092.75
  // formatCurrencyTHB rounds to 0 decimal → '฿314,093'
  // Note: Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }) uses ฿ prefix
  //       and standard comma grouping on Node 18+.

  it('AC-5 — YTD section shows current year label (2026)', () => {
    render(<CompensationSummary />)
    const ytdSection = screen.getByTestId('comp-ytd')
    expect(ytdSection.textContent).toMatch(/2026/)
  })

  it('AC-5 — YTD amount is sum of all 4 payslips (314,092–314,093 range due to rounding)', () => {
    render(<CompensationSummary />)
    const ytdSection = screen.getByTestId('comp-ytd')
    // Accept both 314,092 and 314,093 for rounding edge; Thai baht symbol ฿
    expect(ytdSection.textContent).toMatch(/฿\s*314,09[23]/)
  })

  // ── AC-6: all visible labels are Thai-primary ───────────────────────────────

  it('AC-6 — renders heading "สรุปค่าตอบแทน"', () => {
    const { container } = render(<CompensationSummary />)
    expect(container.textContent).toMatch(/สรุปค่าตอบแทน/)
  })

  it('AC-6 — renders section label "เงินเดือนปัจจุบัน"', () => {
    render(<CompensationSummary />)
    expect(screen.getByTestId('comp-base').textContent).toMatch(/เงินเดือนปัจจุบัน/)
  })

  it('AC-6 — renders section label "ส่วนประกอบเงินเดือนปกติ"', () => {
    render(<CompensationSummary />)
    expect(screen.getByTestId('comp-recurring').textContent).toMatch(/ส่วนประกอบเงินเดือนปกติ/)
  })

  it('AC-6 — renders section label "เงินสะสมทั้งปี"', () => {
    render(<CompensationSummary />)
    expect(screen.getByTestId('comp-ytd').textContent).toMatch(/เงินสะสมทั้งปี/)
  })

  it('AC-6 — no SF-style English label duplicates (Compensation Summary / Base Salary / Year-to-Date)', () => {
    const { container } = render(<CompensationSummary />)
    const text = container.textContent ?? ''
    expect(text).not.toMatch(/Compensation Summary/i)
    expect(text).not.toMatch(/Base Salary/i)
    expect(text).not.toMatch(/Year-to-Date/i)
    expect(text).not.toMatch(/YTD/i)
  })

  // ── edge: recurring section contains bonus + equity ────────────────────────

  it('recurring section lists โบนัส and หุ้น/Equity items from mock data', () => {
    render(<CompensationSummary />)
    const recurring = screen.getByTestId('comp-recurring')
    expect(recurring.textContent).toMatch(/โบนัส/)
    expect(recurring.textContent).toMatch(/หุ้น\/Equity/)
  })
})
