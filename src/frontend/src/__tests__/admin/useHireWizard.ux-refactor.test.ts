import { describe, it, expect, beforeEach, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'

const snapshot = {
  candidateId: 'CAN001',
  applicantId: 'APP001',
  source: 'LinkedIn',
  displayName: 'Anya Kowalski',
  email: 'anya.k@email.com',
  phone: '+66 81 234 5678',
  position: 'Senior Software Engineer',
  initialStatus: 'interview',
  frozenAt: '2026-04-29T00:00:00.000Z',
}

beforeEach(() => {
  localStorage.clear()
  vi.setSystemTime(new Date('2026-04-29T00:00:00.000Z'))
  act(() => useHireWizard.getState().reset())
})

describe('useHireWizard UX refactor state', () => {
  it('starts without candidate context or collapsed sections', () => {
    const { result } = renderHook(() => useHireWizard())

    expect(result.current.candidateContext).toBeNull()
    expect(result.current.sectionCollapse).toEqual({})
  })

  it('freezes a new candidate snapshot and only prefills blank fields', () => {
    const { result } = renderHook(() => useHireWizard())

    act(() => {
      result.current.setStepData('identity', { firstNameEn: 'Existing' })
      result.current.freezeCandidateContext(snapshot)
    })

    expect(result.current.candidateContext).toEqual(snapshot)
    expect(result.current.formData.identity.firstNameEn).toBe('Existing')
    expect(result.current.formData.identity.lastNameEn).toBe('Kowalski')
    expect(result.current.formData.contact.emails[0].value).toBe('anya.k@email.com')
    expect(result.current.formData.contact.phones[0].value).toBe('+66 81 234 5678')
    expect(result.current.formData.job.position).toBe('Senior Software Engineer')
  })

  it('is idempotent for the same candidate/applicant and does not overwrite a different context', () => {
    const { result } = renderHook(() => useHireWizard())

    act(() => result.current.freezeCandidateContext(snapshot))
    act(() => result.current.freezeCandidateContext({ ...snapshot, displayName: 'Changed Name' }))
    expect(result.current.candidateContext?.displayName).toBe('Anya Kowalski')

    act(() => {
      result.current.freezeCandidateContext({
        ...snapshot,
        candidateId: 'CAN999',
        applicantId: 'APP999',
        displayName: 'Different Candidate',
      })
    })
    expect(result.current.candidateContext).toEqual(snapshot)
  })

  it('clears candidate context and section collapse state on reset', () => {
    const { result } = renderHook(() => useHireWizard())

    act(() => {
      result.current.freezeCandidateContext(snapshot)
      result.current.setSectionCollapsed('who.identity', true)
      result.current.toggleSection('job.assignment')
      result.current.reset()
    })

    expect(result.current.candidateContext).toBeNull()
    expect(result.current.sectionCollapse).toEqual({})
    expect(result.current.currentStep).toBe(1)
    expect(result.current.maxUnlockedStep).toBe(1)
  })

  it('persists and toggles collapsed section ids with missing ids treated as expanded by consumers', () => {
    const { result } = renderHook(() => useHireWizard())

    expect(result.current.sectionCollapse['who.identity'] ?? false).toBe(false)

    act(() => result.current.setSectionCollapsed('who.identity', true))
    expect(result.current.sectionCollapse['who.identity']).toBe(true)

    act(() => result.current.toggleSection('who.identity'))
    expect(result.current.sectionCollapse['who.identity']).toBe(false)
  })

  it('migrates a v8-shaped draft to v9 metadata without losing form data', () => {
    const migrate = (useHireWizard as unknown as { persist: { getOptions: () => { migrate: (state: unknown, version: number) => unknown } } })
      .persist.getOptions().migrate
    const v8Draft = {
      currentStep: 2,
      maxUnlockedStep: 2,
      formData: {
        identity: { companyCode: 'CEN', attachmentName: null },
        contact: { phones: [], emails: [], jobRelationships: [], addressAttachmentName: null },
        compensation: { baseSalary: 50000, costDistribution: [] },
        job: { position: 'HR Officer' },
        employeeInfo: {},
        emergencyContacts: [],
        dependents: [],
      },
      lastSavedAt: null,
      employeeClassToggle: 'PERMANENT',
    }

    const migrated = migrate(v8Draft, 8) as typeof v8Draft & { candidateContext: unknown; sectionCollapse: unknown }

    expect(migrated.candidateContext).toBeNull()
    expect(migrated.sectionCollapse).toEqual({})
    expect(migrated.formData.identity.companyCode).toBe('CEN')
    expect(migrated.formData.job.position).toBe('HR Officer')
  })

  it('keeps loose navigation and strict validation invariants unchanged', () => {
    const { result } = renderHook(() => useHireWizard())

    expect(result.current.isStepValid(1)).toBe(true)
    expect(result.current.isStepValid(1, true)).toBe(false)
    expect(result.current.isStepValid(2)).toBe(true)
    expect(result.current.isStepValid(3, true)).toBe(true)
  })
})
