import { readFileSync } from 'node:fs'
import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import StepIdentity from '@/app/[locale]/admin/hire/steps/StepIdentity'
import StepBiographical from '@/app/[locale]/admin/hire/steps/StepBiographical'
import StepContact from '@/app/[locale]/admin/hire/steps/StepContact'
import StepDependents from '@/app/[locale]/admin/hire/steps/StepDependents'
import StepJob from '@/app/[locale]/admin/hire/steps/StepJob'
import StepCompensation from '@/app/[locale]/admin/hire/steps/StepCompensation'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'th',
}))

type CandidateSection = {
  name: string
  sourceFile: string
  renderStep: () => void
  setup?: () => void
}

const candidateSections: CandidateSection[] = [
  {
    name: 'Identity National ID',
    sourceFile: '../StepIdentity.tsx',
    renderStep: () => render(<StepIdentity />),
  },
  {
    name: 'Personal Information',
    sourceFile: '../StepBiographical.tsx',
    renderStep: () => render(<StepBiographical />),
  },
  {
    name: 'Addresses',
    sourceFile: '../StepContact.tsx',
    renderStep: () => render(<StepContact />),
  },
  {
    name: 'Dependents',
    sourceFile: '../StepDependents.tsx',
    setup: () => {
      useHireWizard.setState((state) => ({
        formData: {
          ...state.formData,
          dependents: [
            {
              relationshipType: 'Daughter',
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
              copyAddressFromEmployee: false,
              addressLine1: '',
              building: '', floor: '', street: '',
            },
          ],
        },
      }))
    },
    renderStep: () => render(<StepDependents />),
  },
  {
    name: 'Job Information',
    sourceFile: '../StepJob.tsx',
    renderStep: () => render(<StepJob />),
  },
  {
    name: 'Payment Information',
    sourceFile: '../StepCompensation.tsx',
    renderStep: () => render(<StepCompensation />),
  },
]

function sourceFor(section: CandidateSection) {
  return readFileSync(new URL(section.sourceFile, import.meta.url), 'utf8')
}

beforeEach(() => {
  localStorage.clear()
  act(() => {
    useHireWizard.getState().reset()
  })
})

describe('hire wizard BA attachment rows beyond Work Permit', () => {
  it('Personal Information tolerates stale drafts without the review slice', () => {
    act(() => {
      useHireWizard.setState((state) => {
        const formDataWithoutReview = { ...state.formData } as Partial<typeof state.formData>
        delete formDataWithoutReview.review
        return {
          formData: formDataWithoutReview as typeof state.formData,
        }
      })
    })

    render(<StepBiographical />)

    expect(screen.getByRole('button', { name: 'พื้นที่แนบไฟล์' })).toBeInTheDocument()
  })

  it.each(candidateSections)('$name does not expose a legacy filename textbox', (section) => {
    const source = sourceFor(section)

    expect(source).not.toMatch(/placeholder=\{?["'`][^"'`]*(ชื่อไฟล์|filename|file name)/i)
  })

  for (const section of candidateSections) {
    it(`${section.name} renders the Humi attachment dropzone instead of a filename text input`, () => {
      act(() => {
        section.setup?.()
      })

      section.renderStep()

      expect(screen.getByRole('button', { name: 'พื้นที่แนบไฟล์' })).toBeInTheDocument()
      expect(screen.queryByPlaceholderText(/ชื่อไฟล์|filename|file name/i)).not.toBeInTheDocument()
    })
  }
})

describe('hire compensation payment information copy', () => {
  it('renders the P0 payment account slice with Thai-primary Humi field labels', () => {
    render(<StepCompensation />)

    expect(screen.getByText('ข้อมูลบัญชีจ่ายเงินเดือน')).toBeInTheDocument()
    expect(screen.getByLabelText(/ประเทศของบัญชีธนาคาร/)).toBeInTheDocument()
    expect(screen.getByLabelText(/วิธีการจ่ายเงิน/)).toBeInTheDocument()
    expect(screen.getByLabelText(/รูปแบบการจ่าย/)).toBeInTheDocument()
    expect(screen.getByLabelText('ชื่อธนาคาร')).toBeInTheDocument()
    expect(screen.getByLabelText('เลขที่บัญชี')).toBeInTheDocument()
    expect(screen.getByLabelText('รหัสธนาคาร (BIC/SWIFT)')).toBeInTheDocument()
    expect(screen.getByText('ไฟล์แนบข้อมูลบัญชีจ่ายเงินเดือน')).toBeInTheDocument()

    expect(screen.queryByText(/Payment Information/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Bank Country\/Region/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Payment Method/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Pay Type/)).not.toBeInTheDocument()
  })
})
