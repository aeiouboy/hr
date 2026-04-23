// SystemIntegration.test.tsx — Part E Wave 3: Integration page
// ครอบคลุม: endpoints table, Teams Viva tab switcher, tenant ID form
// Vitest + RTL — 5 tests

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { act, render, screen, fireEvent } from '@testing-library/react'
import { useDataManagement } from '@/lib/admin/store/useDataManagement'

// -----------------------------------------------------------------------
// Mocks
// -----------------------------------------------------------------------

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

import IntegrationPage from '@/app/[locale]/admin/system/integration/page'

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

describe('IntegrationPage — IC/API Endpoints + Teams Viva', () => {
  it('TC-INT-1: แสดง heading "การเชื่อมต่อ"', () => {
    render(<IntegrationPage />)
    expect(screen.getByRole('heading', { name: /การเชื่อมต่อ/i })).toBeInTheDocument()
  })

  it('TC-INT-2: แสดง endpoints table พร้อม 2 entries จาก seed (ชื่อ endpoint ปรากฏ)', () => {
    render(<IntegrationPage />)
    // seed มี 2 endpoints — ตรวจ table header + มี row
    expect(screen.getByText('ชื่อ Endpoint')).toBeInTheDocument()
    const tableRows = screen.getByRole('table').querySelectorAll('tbody tr')
    expect(tableRows).toHaveLength(2)
  })

  it('TC-INT-3: tab "Microsoft Teams Viva" เมื่อ click ต้องแสดง Tenant ID input', () => {
    render(<IntegrationPage />)
    const vivaTab = screen.getByRole('tab', { name: /Microsoft Teams Viva/i })
    fireEvent.click(vivaTab)

    // ต้องแสดง Tenant ID input
    expect(screen.getByRole('textbox', { name: /Tenant ID/i })).toBeInTheDocument()
  })

  it('TC-INT-4: tab "IC/API Endpoints" ต้อง aria-selected=true by default', () => {
    render(<IntegrationPage />)
    const endpointsTab = screen.getByRole('tab', { name: /IC\/API Endpoints/i })
    expect(endpointsTab).toHaveAttribute('aria-selected', 'true')
  })

  it('TC-INT-5: Teams Viva tab — baSpecPending=true ต้องมี warning banner "Q10 — รอ BA Spec"', () => {
    render(<IntegrationPage />)
    const vivaTab = screen.getByRole('tab', { name: /Microsoft Teams Viva/i })
    fireEvent.click(vivaTab)

    // seed baSpecPending=true → ต้องมี Q10 banner
    expect(screen.getByText(/Q10/i)).toBeInTheDocument()
    expect(screen.getByText(/รอ BA Spec/i)).toBeInTheDocument()
  })
})
