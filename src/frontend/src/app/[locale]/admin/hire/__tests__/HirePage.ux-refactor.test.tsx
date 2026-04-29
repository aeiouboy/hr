import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HirePage from '../page'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'

let currentSearch = ''
const syncSearchFromHref = (href: string) => {
  currentSearch = href.split('?')[1] ?? ''
}
const push = vi.fn(syncSearchFromHref)
const replace = vi.fn(syncSearchFromHref)

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push, replace }),
  usePathname: () => '/th/admin/hire',
  useSearchParams: () => new URLSearchParams(currentSearch),
}))

vi.mock('@/hooks/use-recruitment', () => ({
  useRecruitment: () => ({
    loading: false,
    candidates: [
      {
        id: 'CAN001',
        name: 'Anya Kowalski',
        email: 'anya@example.com',
        phone: '+66 81 234 5678',
        position: 'Senior Software Engineer',
        status: 'offer',
        source: 'LinkedIn',
      },
      {
        id: 'CAN002',
        name: 'Thanapat Srisuk',
        email: 'thanapat@example.com',
        phone: '+66 89 876 5432',
        position: 'Marketing Manager',
        status: 'screening',
        source: 'JobsDB',
      },
    ],
  }),
}))

vi.mock('@/components/admin/wizard/WizardShell', () => ({
  WizardShell: ({ currentStep, maxUnlockedStep, onBack, onNext, onStepClick, children }: {
    currentStep: number
    maxUnlockedStep: number
    onBack: () => void
    onNext: () => void
    onStepClick: (step: number) => void
    children: React.ReactNode
  }) => (
    <div>
      <div data-testid="current-step">{currentStep}</div>
      <div data-testid="max-unlocked-step">{maxUnlockedStep}</div>
      <button type="button" onClick={onBack}>Back</button>
      <button type="button" onClick={onNext}>Next</button>
      <button type="button" onClick={() => onStepClick(3)}>Step 3</button>
      {children}
    </div>
  ),
}))

vi.mock('../clusters/ClusterWho', () => ({ default: () => <div>Who cluster</div> }))
vi.mock('../clusters/ClusterJob', () => ({ default: () => <div>Job cluster</div> }))
vi.mock('../clusters/ClusterReview', () => ({ default: () => <div>Review cluster</div> }))

describe('HirePage UX refactor navigation and candidate context', () => {
  beforeEach(() => {
    currentSearch = ''
    push.mockClear()
    replace.mockClear()
    push.mockImplementation(syncSearchFromHref)
    replace.mockImplementation(syncSearchFromHref)
    act(() => {
      useHireWizard.getState().reset()
    })
  })

  it('canonicalizes a missing step query to the current store step', async () => {
    render(<HirePage />)

    await waitFor(() => {
      expect(replace).toHaveBeenCalledWith('/th/admin/hire?step=1')
    })
    expect(screen.getByTestId('current-step')).toHaveTextContent('1')
  })

  it('does not unlock a direct URL to a locked step', async () => {
    currentSearch = 'step=3&candidateId=CAN001'

    render(<HirePage />)

    await waitFor(() => {
      expect(replace).toHaveBeenCalledWith('/th/admin/hire?step=1&candidateId=CAN001')
    })
    expect(useHireWizard.getState().currentStep).toBe(1)
    expect(useHireWizard.getState().maxUnlockedStep).toBe(1)
  })

  it('mirrors Next and Stepper actions to the URL after store navigation resolves', async () => {
    const user = userEvent.setup()
    currentSearch = 'step=1&candidateId=CAN001'
    render(<HirePage />)

    await user.click(screen.getByRole('button', { name: 'Next' }))
    expect(useHireWizard.getState().currentStep).toBe(2)
    expect(push).toHaveBeenLastCalledWith('/th/admin/hire?step=2&candidateId=CAN001')

    await user.click(screen.getByRole('button', { name: 'Next' }))
    expect(useHireWizard.getState().currentStep).toBe(3)
    expect(push).toHaveBeenLastCalledWith('/th/admin/hire?step=3&candidateId=CAN001')
  })

  it('freezes candidate context once and preserves it when the URL candidate changes', async () => {
    const { rerender } = render(<HirePage />)
    currentSearch = 'candidateId=CAN001&applicantId=APP001&step=1'
    rerender(<HirePage />)

    await waitFor(() => {
      expect(useHireWizard.getState().candidateContext).toMatchObject({
        candidateId: 'CAN001',
        applicantId: 'APP001',
        displayName: 'Anya Kowalski',
        email: 'anya@example.com',
        position: 'Senior Software Engineer',
      })
    })
    expect(screen.getByText('Anya Kowalski')).toBeInTheDocument()

    currentSearch = 'candidateId=CAN002&applicantId=APP002&step=1'
    rerender(<HirePage />)

    expect(useHireWizard.getState().candidateContext?.candidateId).toBe('CAN001')
    expect(await screen.findByText(/stored draft context was preserved/i)).toBeInTheDocument()
  })
})
