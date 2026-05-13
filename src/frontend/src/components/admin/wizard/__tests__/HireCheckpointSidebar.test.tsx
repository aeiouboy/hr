/**
 * HireCheckpointSidebar.test.tsx
 * Covers: render count, navigation clicks, locked step guard, validity badge.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { HireCheckpointSidebar } from '../HireCheckpointSidebar'

const mockRouterPush = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockRouterPush }),
  usePathname: () => '/th/admin/hire',
  useSearchParams: () => new URLSearchParams('step=1&candidateId=CAN001'),
}))

vi.mock('lucide-react', () => {
  const stub = (name: string) => ({ 'aria-hidden': _h, ...rest }: Record<string, unknown>) =>
    <span data-icon={name} {...rest} />
  return {
    Fingerprint: stub('Fingerprint'),
    User2: stub('User2'),
    Phone: stub('Phone'),
    AlertCircle: stub('AlertCircle'),
    Globe: stub('Globe'),
    FileText: stub('FileText'),
    Users: stub('Users'),
    Briefcase: stub('Briefcase'),
    Building2: stub('Building2'),
    Wallet: stub('Wallet'),
    ClipboardList: stub('ClipboardList'),
    CheckCircle2: stub('CheckCircle2'),
  }
})

vi.mock('@/lib/utils', () => ({
  cn: (...args: unknown[]) => (args as string[]).filter(Boolean).join(' '),
}))

const mockJumpTo = vi.fn()
const mockSetSectionCollapsed = vi.fn()

const defaultState = {
  currentStep: 1,
  maxUnlockedStep: 3,
  formData: {
    biographical: { nationality: null as string | null },
    workPermit: { documentType: '', country: '', documentNumber: '', issueDate: null, expiryDate: null, arrivalDateVisa: null, ninetyDayReportVisa: null, attachmentName: '' },
    dependents: [] as Array<{ relationshipType: string }>,
  },
  stepValidity: {
    identity: false, biographical: false, contact: false,
    emergencyContacts: false, employeeInfo: false, job: false,
    compensation: false, globalInfo: false, workPermit: false, dependents: false,
  },
  jumpTo: mockJumpTo,
  setSectionCollapsed: mockSetSectionCollapsed,
}

let stateOverride: Partial<typeof defaultState> = {}

vi.mock('@/lib/admin/store/useHireWizard', () => ({
  useHireWizard: (selector: (s: typeof defaultState) => unknown) =>
    selector({ ...defaultState, ...stateOverride }),
}))

beforeEach(() => {
  vi.clearAllMocks()
  stateOverride = {}
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => { cb(0); return 0 })
  const fakeEl = document.createElement('div')
  fakeEl.scrollIntoView = vi.fn()
  vi.spyOn(document, 'getElementById').mockReturnValue(fakeEl)
})

describe('HireCheckpointSidebar — render', () => {
  it('renders only always-applicable section buttons by default: 5 who + 3 job + 3 review', () => {
    render(<HireCheckpointSidebar />)
    expect(screen.getAllByRole('button')).toHaveLength(11)
    expect(screen.getByText('ระบุตัวตน')).toBeTruthy()
    expect(screen.getByText('ประเภทการจ้างงาน')).toBeTruthy()
    expect(screen.getByText('ชื่อ-นามสกุลภาษาอังกฤษ')).toBeTruthy()
    expect(screen.getByText('อนุมัติโดย Direct Manager + HRBP')).toBeTruthy()
    expect(screen.getByText('สรุปข้อมูลก่อนส่ง')).toBeTruthy()
    expect(screen.queryByText('ใบอนุญาตทำงาน')).toBeNull()
    expect(screen.queryByText('บุคคลในอุปการะ')).toBeNull()
  })

  it('shows Work Permit checkpoint only for non-Thai nationality', () => {
    stateOverride = {
      formData: {
        ...defaultState.formData,
        biographical: { nationality: 'USA' },
      },
    }
    render(<HireCheckpointSidebar />)
    expect(screen.getByText('ใบอนุญาตทำงาน')).toBeTruthy()
    expect(screen.queryByText('บุคคลในอุปการะ')).toBeNull()
  })

  it('shows Dependents checkpoint only when dependent rows exist', () => {
    stateOverride = {
      formData: {
        ...defaultState.formData,
        dependents: [{ relationshipType: 'Child' }],
      },
    }
    render(<HireCheckpointSidebar />)
    expect(screen.queryByText('ใบอนุญาตทำงาน')).toBeNull()
    expect(screen.getByText('บุคคลในอุปการะ')).toBeTruthy()
  })
})

describe('HireCheckpointSidebar — navigation', () => {
  it('click unlocked who section calls jumpTo(1) and setSectionCollapsed(id, false)', () => {
    render(<HireCheckpointSidebar />)
    fireEvent.click(screen.getByText('ระบุตัวตน'))
    expect(mockJumpTo).toHaveBeenCalledWith(1)
    expect(mockSetSectionCollapsed).toHaveBeenCalledWith('who.identity', false)
    expect(mockRouterPush).toHaveBeenCalledWith('/th/admin/hire?step=1&candidateId=CAN001', { scroll: false })
  })

  it('click review section (step=3) calls jumpTo(3) but NOT setSectionCollapsed', () => {
    render(<HireCheckpointSidebar />)
    fireEvent.click(screen.getByText('สรุปข้อมูลก่อนส่ง'))
    expect(mockJumpTo).toHaveBeenCalledWith(3)
    expect(mockSetSectionCollapsed).not.toHaveBeenCalled()
    expect(mockRouterPush).toHaveBeenCalledWith('/th/admin/hire?step=3&candidateId=CAN001', { scroll: false })
  })
})

describe('HireCheckpointSidebar — free navigation', () => {
  it('step=2 section buttons remain enabled when maxUnlockedStep=1', () => {
    stateOverride = { maxUnlockedStep: 1 }
    render(<HireCheckpointSidebar />)
    const jobBtn = screen.getByText('ประเภทการจ้างงาน').closest('button') as HTMLButtonElement
    expect(jobBtn.disabled).toBe(false)
    expect(jobBtn.title).toBe('')
  })

  it('click on a future section navigates and opens that section', () => {
    stateOverride = { maxUnlockedStep: 1 }
    render(<HireCheckpointSidebar />)
    fireEvent.click(screen.getByText('ประเภทการจ้างงาน').closest('button')!)
    expect(mockJumpTo).toHaveBeenCalledWith(2)
    expect(mockSetSectionCollapsed).toHaveBeenCalledWith('job.employeeInfo', false)
    expect(mockRouterPush).toHaveBeenCalledWith('/th/admin/hire?step=2&candidateId=CAN001', { scroll: false })
  })
})

describe('HireCheckpointSidebar — validity badge', () => {
  it('shows CheckCircle2 only when stepValidity[key] === true', () => {
    stateOverride = {
      stepValidity: { ...defaultState.stepValidity, identity: true, biographical: false },
    }
    render(<HireCheckpointSidebar />)
    expect(screen.getByText('ระบุตัวตน').closest('button')!
      .querySelector('[data-icon="CheckCircle2"]')).toBeTruthy()
    expect(screen.getByText('ข้อมูลส่วนตัว').closest('button')!
      .querySelector('[data-icon="CheckCircle2"]')).toBeNull()
  })

  it('does NOT show badge when validity key is undefined', () => {
    stateOverride = {
      stepValidity: { ...defaultState.stepValidity, identity: undefined as unknown as boolean },
    }
    render(<HireCheckpointSidebar />)
    expect(screen.getByText('ระบุตัวตน').closest('button')!
      .querySelector('[data-icon="CheckCircle2"]')).toBeNull()
  })
})
