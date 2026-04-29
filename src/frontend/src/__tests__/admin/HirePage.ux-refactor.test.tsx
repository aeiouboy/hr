import { describe, it, expect, beforeEach, vi } from 'vitest'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'

const nav = vi.hoisted(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  pathname: '/th/admin/hire',
  params: new URLSearchParams(),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: nav.push, replace: nav.replace }),
  usePathname: () => nav.pathname,
  useSearchParams: () => nav.params,
}))

vi.mock('@/hooks/use-recruitment', () => ({
  useRecruitment: () => ({
    loading: false,
    candidates: [
      {
        id: 'CAN001',
        name: 'Anya Kowalski',
        email: 'anya.k@email.com',
        phone: '+66 81 234 5678',
        position: 'Senior Software Engineer',
        status: 'interview',
        source: 'LinkedIn',
      },
      {
        id: 'CAN002',
        name: 'Thanapat Srisuk',
        email: 'thanapat.s@email.com',
        phone: '+66 89 876 5432',
        position: 'Marketing Manager',
        status: 'screening',
        source: 'JobsDB',
      },
    ],
  }),
}))

vi.mock('@/components/admin/wizard/WizardShell', () => ({
  WizardShell: ({ currentStep, maxUnlockedStep, onBack, onNext, onStepClick, children }: any) => (
    <div>
      <div data-testid="step-state">{currentStep}/{maxUnlockedStep}</div>
      <button type="button" onClick={onBack}>Back</button>
      <button type="button" onClick={onNext}>Next</button>
      <button type="button" onClick={() => onStepClick(2)}>Step 2</button>
      <button type="button" onClick={() => onStepClick(3)}>Step 3</button>
      {children}
    </div>
  ),
}))

vi.mock('@/stores/hire-audit', () => ({ useHireAudit: () => vi.fn() }))
vi.mock('@/stores/auth-store', () => ({ useAuthStore: (selector: any) => selector({ userId: 'ADM001', username: 'HR Admin' }) }))
vi.mock('@/app/[locale]/admin/hire/clusters/ClusterWho', () => ({ default: () => <div>Cluster Who</div> }))
vi.mock('@/app/[locale]/admin/hire/clusters/ClusterJob', () => ({ default: () => <div>Cluster Job</div> }))
vi.mock('@/app/[locale]/admin/hire/clusters/ClusterReview', () => ({ default: () => <div>Cluster Review</div> }))

import HirePage from '@/app/[locale]/admin/hire/page'

function resetPage(search = '') {
  nav.push.mockClear()
  nav.replace.mockClear()
  nav.params = new URLSearchParams(search)
  localStorage.clear()
  act(() => useHireWizard.getState().reset())
}

describe('HirePage UX refactor navigation and candidate context', () => {
  beforeEach(() => resetPage())

  it('canonicalizes a missing step query to the current store step', async () => {
    render(<HirePage />)

    await waitFor(() => expect(nav.replace).toHaveBeenCalledWith('/th/admin/hire?step=1', { scroll: false }))
  })

  it('honors an unlocked URL step and rejects a locked direct URL step', async () => {
    act(() => {
      useHireWizard.getState().goNext()
    })
    resetPage('step=2')
    act(() => {
      useHireWizard.setState({ currentStep: 1, maxUnlockedStep: 2 })
    })

    render(<HirePage />)
    await waitFor(() => expect(screen.getByTestId('step-state')).toHaveTextContent('2/2'))

    resetPage('step=3')
    render(<HirePage />)
    await waitFor(() => expect(nav.replace).toHaveBeenCalledWith('/th/admin/hire?step=1', { scroll: false }))
    expect(useHireWizard.getState().maxUnlockedStep).toBe(1)
  })

  it('mirrors Next, Back, and stepper navigation to the URL without duplicate calls when already current', async () => {
    resetPage('step=1&foo=bar')
    const { rerender } = render(<HirePage />)

    nav.push.mockClear()
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(nav.push).toHaveBeenCalledWith('/th/admin/hire?step=2&foo=bar', { scroll: false })

    nav.params = new URLSearchParams('step=2&foo=bar')
    rerender(<HirePage />)
    nav.push.mockClear()
    fireEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(nav.push).toHaveBeenCalledWith('/th/admin/hire?step=1&foo=bar', { scroll: false })

    nav.params = new URLSearchParams('step=1&foo=bar')
    rerender(<HirePage />)
    nav.push.mockClear()
    act(() => {
      useHireWizard.setState({ currentStep: 1, maxUnlockedStep: 2 })
    })
    fireEvent.click(screen.getByRole('button', { name: 'Step 2' }))
    expect(nav.push).toHaveBeenCalledWith('/th/admin/hire?step=2&foo=bar', { scroll: false })

    nav.replace.mockClear()
    resetPage('step=1')
    render(<HirePage />)
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(nav.replace).not.toHaveBeenCalled()
  })

  it('freezes and renders read-only candidate context without overwriting on conflicting URL', async () => {
    resetPage('candidateId=CAN001&applicantId=APP001&step=1')
    const { rerender } = render(<HirePage />)

    await waitFor(() => expect(screen.getByText('Anya Kowalski')).toBeInTheDocument())
    expect(useHireWizard.getState().candidateContext?.candidateId).toBe('CAN001')
    expect(useHireWizard.getState().formData.job.position).toBe('Senior Software Engineer')

    nav.params = new URLSearchParams('candidateId=CAN002&applicantId=APP002&step=1')
    rerender(<HirePage />)

    expect(await screen.findByRole('alert')).toHaveTextContent('URL candidate differs')
    expect(useHireWizard.getState().candidateContext?.candidateId).toBe('CAN001')
    expect(screen.getByText('Anya Kowalski')).toBeInTheDocument()
  })

  it('manual hire without candidate query has no candidate-context requirement', () => {
    render(<HirePage />)

    expect(useHireWizard.getState().candidateContext).toBeNull()
    expect(useHireWizard.getState().isStepValid(1)).toBe(true)
  })
})
