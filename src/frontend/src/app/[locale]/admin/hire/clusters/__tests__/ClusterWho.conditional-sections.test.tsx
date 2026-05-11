import { act, render, screen, fireEvent } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ClusterWho from '../ClusterWho'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'

vi.mock('lucide-react', () => {
  const stub = (name: string) => () => <span data-icon={name} />
  return {
    Fingerprint: stub('Fingerprint'),
    User2: stub('User2'),
    Phone: stub('Phone'),
    AlertCircle: stub('AlertCircle'),
    Globe: stub('Globe'),
    FileText: stub('FileText'),
    Users: stub('Users'),
  }
})

vi.mock('@/components/admin/wizard/CollapsibleSectionCard', () => ({
  CollapsibleSectionCard: ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <section data-testid={id} aria-label={title}>
      <h2>{title}</h2>
      {children}
    </section>
  ),
}))

vi.mock('@/app/[locale]/admin/hire/steps/StepIdentity', () => ({ default: () => <div>identity step</div> }))
vi.mock('@/app/[locale]/admin/hire/steps/StepBiographical', () => ({ default: () => <div>bio step</div> }))
vi.mock('@/app/[locale]/admin/hire/steps/StepContact', () => ({ default: () => <div>contact step</div> }))
vi.mock('@/app/[locale]/admin/hire/steps/StepEmergencyContacts', () => ({ default: () => <div>emergency step</div> }))
vi.mock('@/app/[locale]/admin/hire/steps/StepGlobalInfo', () => ({ default: () => <div>global step</div> }))
vi.mock('@/app/[locale]/admin/hire/steps/StepWorkPermit', () => ({ default: () => <div>work permit step</div> }))
vi.mock('@/app/[locale]/admin/hire/steps/StepDependents', () => ({ default: () => <div>dependents step</div> }))

beforeEach(() => {
  localStorage.clear()
  act(() => {
    useHireWizard.getState().reset()
  })
})

describe('ClusterWho conditional BA sections', () => {
  it('does not render Work Permit or Dependents sections by default', () => {
    render(<ClusterWho />)

    expect(screen.queryByTestId('who.workPermit')).not.toBeInTheDocument()
    expect(screen.queryByTestId('who.dependents')).not.toBeInTheDocument()
    expect(screen.queryByText('work permit step')).not.toBeInTheDocument()
    expect(screen.queryByText('dependents step')).not.toBeInTheDocument()
  })

  it('renders Work Permit only after a non-Thai nationality is selected', () => {
    act(() => {
      useHireWizard.getState().setStepData('biographical', { nationality: 'USA' })
    })

    render(<ClusterWho />)

    expect(screen.getByTestId('who.workPermit')).toBeInTheDocument()
    expect(screen.queryByTestId('who.dependents')).not.toBeInTheDocument()
  })

  it('can reveal Dependents through the conditional family data launcher', () => {
    render(<ClusterWho />)

    fireEvent.click(screen.getByRole('button', { name: 'เพิ่มข้อมูลครอบครัวตามกรณี' }))

    expect(screen.getByTestId('who.dependents')).toBeInTheDocument()
    expect(useHireWizard.getState().formData.dependents).toHaveLength(1)
  })

  it('renders Dependents only when the draft already has dependent rows', () => {
    act(() => {
      useHireWizard.setState((state) => ({
        formData: {
          ...state.formData,
          dependents: [
            {
              relationshipType: 'Child',
              salutationEn: null,
              firstNameEn: 'Test',
              lastNameEn: '',
              salutationLocal: null,
              firstNameLocal: '',
              lastNameLocal: '',
              nationality: null,
              dateOfBirth: null,
              country: 'THA',
              nationalIdCardType: null,
              nationalIdCountry: null,
              nationalId: '',
              phone: '',
              email: '',
              isTaxDependent: false,
              addressLine1: '',
            },
          ],
        },
      }))
    })

    render(<ClusterWho />)

    expect(screen.queryByTestId('who.workPermit')).not.toBeInTheDocument()
    expect(screen.getByTestId('who.dependents')).toBeInTheDocument()
  })
})
