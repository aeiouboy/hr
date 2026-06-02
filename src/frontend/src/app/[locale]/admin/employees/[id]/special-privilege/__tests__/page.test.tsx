// special-privilege/page.test.tsx — STA-90 regression for /special-privilege route
// Covers: render with employee context, required-reason gating, successful submit
// writes to useSpecialPrivilegeStore, deep-link guard for inactive employees.

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

// ─── Mock next/navigation ────────────────────────────────────────────────────
const navMocks = vi.hoisted(() => ({
  push: vi.fn(),
  params: { id: 'EMP-0005', locale: 'th' } as { id: string; locale: string },
}))
vi.mock('next/navigation', () => ({
  useParams: vi.fn(() => navMocks.params),
  useRouter: vi.fn(() => ({
    push: navMocks.push,
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  })),
}))

// ─── Mock next-intl — return key for assertable identity ─────────────────────
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

// ─── Mock next/link ──────────────────────────────────────────────────────────
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

// ─── Mock auth store ─────────────────────────────────────────────────────────
vi.mock('@/stores/auth-store', () => {
  const state = { userId: 'ADM001', username: 'HR Admin' }
  const useAuthStore = Object.assign(
    (selector?: (s: typeof state) => unknown) => (selector ? selector(state) : state),
    { getState: () => state, setState: vi.fn(), subscribe: vi.fn() },
  )
  return { useAuthStore }
})

// ─── Mock employees store ─────────────────────────────────────────────────────
const ACTIVE_EMP = {
  employee_id: 'EMP-0005',
  first_name_th: 'กมลรัตน์',
  last_name_th: 'สุวรรณ',
  first_name_en: 'Kamonrat',
  last_name_en: 'Suwan',
  status: 'active' as const,
  probation_status: 'passed' as const,
  employee_class: 'PERMANENT' as const,
}
const INACTIVE_EMP = { ...ACTIVE_EMP, status: 'inactive' as const }

const empMocks = vi.hoisted(() => ({ current: null as unknown }))
vi.mock('@/lib/admin/store/useEmployees', () => {
  const useEmployees = Object.assign(
    (selector?: (s: { getById: (id: string) => unknown }) => unknown) => {
      const state = { getById: (_id: string) => empMocks.current }
      return selector ? selector(state) : state
    },
    { getState: () => ({ getById: (_id: string) => empMocks.current }), setState: vi.fn(), subscribe: vi.fn() },
  )
  return { useEmployees }
})

describe('/admin/employees/[id]/special-privilege', () => {
  beforeEach(() => {
    localStorage.clear()
    navMocks.push.mockClear()
    navMocks.params = { id: 'EMP-0005', locale: 'th' }
    empMocks.current = ACTIVE_EMP
  })

  it('renders the form with employee context (no picker)', async () => {
    const { default: Page } = await import('../page')
    render(<Page />)
    expect(screen.getByText('EMP-0005')).toBeInTheDocument()
    expect(screen.getByText('กมลรัตน์ สุวรรณ')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('blocks submit with empty reason and shows validation', async () => {
    const { useSpecialPrivilegeStore } = await import('@/stores/special-privilege-store')
    useSpecialPrivilegeStore.getState().clear()
    const before = useSpecialPrivilegeStore.getState().records.length
    const { default: Page } = await import('../page')
    render(<Page />)
    fireEvent.click(screen.getByText('buttons.submit'))
    expect(screen.getByText('validation.reasonRequired')).toBeInTheDocument()
    expect(useSpecialPrivilegeStore.getState().records.length).toBe(before)
    expect(navMocks.push).not.toHaveBeenCalled()
  })

  it('writes a record on valid submit and navigates back', async () => {
    const { useSpecialPrivilegeStore } = await import('@/stores/special-privilege-store')
    useSpecialPrivilegeStore.getState().clear()
    const before = useSpecialPrivilegeStore.getState().records.length
    const { default: Page } = await import('../page')
    render(<Page />)
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'ทดสอบเหตุผล' },
    })
    fireEvent.click(screen.getByText('buttons.submit'))
    const records = useSpecialPrivilegeStore.getState().records
    expect(records.length).toBe(before + 1)
    const added = records[records.length - 1]
    expect(added.employeeId).toBe('EMP-0005')
    expect(added.reason).toBe('ทดสอบเหตุผล')
    expect(added.createdBy).toBe('HR Admin')
    expect(navMocks.push).toHaveBeenCalledWith('/th/admin/employees/EMP-0005')
  })

  it('shows guard banner for an inactive employee (deep-link)', async () => {
    empMocks.current = INACTIVE_EMP
    const { default: Page } = await import('../page')
    render(<Page />)
    // ActionGuardBanner renders instead of the form — no reason textbox present
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })
})
