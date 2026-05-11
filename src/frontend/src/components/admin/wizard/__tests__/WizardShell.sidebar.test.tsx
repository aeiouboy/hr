import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { WizardShell } from '../WizardShell'

vi.mock('lucide-react', () => ({
  Check: () => <span data-icon="Check" />,
  ArrowLeft: () => <span data-icon="ArrowLeft" />,
  ArrowRight: () => <span data-icon="ArrowRight" />,
}))

const baseProps = {
  currentStep: 3,
  maxUnlockedStep: 3,
  isCurrentStepValid: true,
  onStepClick: vi.fn(),
  onBack: vi.fn(),
  onNext: vi.fn(),
  onSubmit: vi.fn(),
  children: <div>content</div>,
}

describe('WizardShell sidebar rail', () => {
  it('can hide the primary stepper when a checkpoint sidebar is the single nav surface', () => {
    render(
      <WizardShell
        {...baseProps}
        sidebarContent={<nav aria-label="หัวข้อการกรอกข้อมูล">หัวข้อย่อย</nav>}
        showStepperRail={false}
      />,
    )

    expect(screen.queryByLabelText('ขั้นตอน Hire Wizard')).not.toBeInTheDocument()
    expect(screen.getByLabelText('หัวข้อการกรอกข้อมูล')).toBeInTheDocument()
    expect(screen.getByText('หัวข้อย่อย')).toBeInTheDocument()
  })
})
