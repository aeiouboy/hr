// Phase 1.3 smoke test — verifies buildAll runs without throwing.
// After Phase 1.3, 6 mappers return real CREATE/UPSERT payloads;
// the remaining 11 are still PENDING stubs.
import { describe, it, expect } from 'vitest'
import { buildAll, mappers } from '../index'
import type { FormData } from '../../../store/useHireWizard'

const minimalFormData: FormData = {
  identity: {
    hireDate: null, companyCode: null, eventReason: null,
    salutationEn: null, firstNameEn: '', middleNameEn: '', lastNameEn: '',
    dateOfBirth: null, countryOfBirth: null, regionOfBirth: '',
    age: null, employeeId: '', nationalIdCardType: null,
    country: null, nationalId: '', issueDate: null, expiryDate: null,
    isPrimary: null, vnIssuePlace: '', salutationLocal: null,
    attachmentName: null,
  },
  biographical: {
    otherTitleTh: '', firstNameLocal: '', lastNameLocal: '',
    middleNameLocal: '', nickname: '', militaryStatus: null,
    gender: null, nationality: null, foreigner: null,
    bloodType: null, maritalStatus: null, maritalStatusSince: null,
  },
  review: {
    salutationEnReview: null, firstNameEnReview: '',
    lastNameEnReview: '', middleNameEnReview: '', attachmentName: null,
  },
  contact: {
    phones: [{ type: 'mobile', value: '', isPrimary: true }],
    emails: [{ type: 'personal', value: '', isPrimary: true }],
    jobRelationships: [],
  },
  emergencyContacts: [],
  globalInfo: {
    numberOfChildren: null, religion: null, disabilityStatus: '',
    disabilityCertStartDate: null, disabilityCertEndDate: null,
    typeOfDisability: '', certificateId: '',
    spouseFatherIdNumber: '', spouseMotherIdNumber: '',
    additionalInformation: '',
  },
  workPermit: {
    documentType: '', country: '', documentNumber: '',
    issueDate: null, expiryDate: null,
    arrivalDateVisa: null, ninetyDayReportVisa: null,
    attachmentName: '',
  },
  dependents: [],
  name: { firstNameTh: '', lastNameTh: '', firstNameEn: '', lastNameEn: '' },
  employeeInfo: {
    employeeClass: null,
    originalStartDate: '', seniorityStartDate: '', retirementDate: '',
    pfServiceDate: '', dvtPreviousId: '', cgPreviousEmployeeId: '',
    ssn: '',
  },
  nationalId: { value: '' },
  personal: { addressLine1: '' },
  job: {
    position: '', businessUnit: null, businessUnitLabel: null,
    branch: null, branchLabel: null, jobCode: null, jobLabel: null,
    jobGrade: null, jobGradeLabel: null, storeBranchCode: null, hrDistrict: null, supervisorId: null, supervisorLabel: null,
    workSchedule: '', holidayTypeCondition: '', timeManagementStatus: '',
    otFlag: '', standardWeeklyHours: 0, overrideStandardWeeklyHours: false, dayOffType: '', dailyWorkingHours: 0,
    workingDaysPerWeek: 0, fte: 0, holidayCalendar: '', timeProfile: '',
    timeRecordingVariant: '',
    attachmentName: null,
    // Phase 3 new fields
    department: null, division: null, divisionLabel: null,
    costCenter: null, jobFunction: null, jobFunctionLabel: null,
    corporateTitle: null, payScaleType: null, payScaleArea: null,
    payScaleGroup: null, payScaleLevel: null, policyProfile: null,
    ssoLocation: null, groupCompanyGroup: null, contractType: null,
    zone: null, contractEndDate: null, probationEndDate: null,
    emplStatus: null, event: null, employmentType: null,
  },
  compensation: { baseSalary: null },
}

// Phase 1.3: 6 mappers return real verb+payload
// Phase 1.4: perEmergencyContacts added (7 total implemented)
// Phase 2:   perAddressDEFLT added (8 total implemented)
// Phase 3:   empJob added (9 total implemented)
// Phase 5b-1: empJobRelationships added (10 total implemented)
// Phase 4:   empEmployment added (11 total implemented)
// Phase 5b-2: perGlobalInfoTHA added (12 total implemented)
// Phase 5b-3: empWorkPermit added (13 total implemented) — conditional; payload=null when not foreigner
// Phase 5b-4: perPersonRelationship added (14 total implemented)
// Phase 5+:   empCompensation, empPayCompRecurring, paymentInformationV3 added (17 total implemented)
const IMPLEMENTED_MAPPERS = new Set([
  'user', 'perPerson', 'perPersonal', 'perNationalId', 'perEmail', 'perPhone',
  'perEmergencyContacts', 'perAddressDEFLT', 'empJob', 'empJobRelationships',
  'empEmployment', 'perGlobalInfoTHA', 'empWorkPermit', 'perPersonRelationship',
  'empCompensation', 'empPayCompRecurring', 'paymentInformationV3',
])

// Mappers that may legitimately return payload=null (conditional on runtime data, not PENDING stubs)
const CONDITIONAL_NULL_MAPPERS = new Set([
  'empWorkPermit', // Foreigners only — minimal fixture has nationality=null → not foreigner → payload=null
])

describe('sfMapper scaffold smoke', () => {
  it('buildAll returns 17 keys', () => {
    const result = buildAll(minimalFormData)
    expect(Object.keys(result)).toHaveLength(17)
  })

  it('PENDING mappers (0) — all 17 mappers implemented', () => {
    const result = buildAll(minimalFormData)
    for (const key of Object.keys(result)) {
      if (!IMPLEMENTED_MAPPERS.has(key)) {
        expect(result[key as keyof typeof result].verb).toBe('PENDING')
        expect(result[key as keyof typeof result].payload).toBeNull()
      }
    }
  })

  it('implemented mappers (17) return correct verbs; conditional mappers may have null payload', () => {
    const result = buildAll(minimalFormData)

    // User: CREATE
    expect(result.user.verb).toBe('CREATE')
    expect(result.user.payload).not.toBeNull()

    // UPSERT single-record mappers
    for (const key of ['perPerson', 'perPersonal', 'perNationalId'] as const) {
      expect(result[key].verb).toBe('UPSERT')
      expect(result[key].payload).not.toBeNull()
    }

    // UPSERT multi-record mappers — empty arrays are valid (no non-empty entries in minimal data)
    for (const key of ['perEmail', 'perPhone'] as const) {
      expect(result[key].verb).toBe('UPSERT')
      expect(Array.isArray(result[key].payload)).toBe(true)
    }

    // perAddressDEFLT: Phase 2 — UPSERT single-record address
    expect(result.perAddressDEFLT.verb).toBe('UPSERT')
    expect(result.perAddressDEFLT.payload).not.toBeNull()

    // empJob: Phase 3 — UPSERT single-record (all 38 mandatory fields)
    expect(result.empJob.verb).toBe('UPSERT')
    expect(result.empJob.payload).not.toBeNull()

    // empJobRelationships: Phase 5b-1 — UPSERT multi-record (empty array valid when no relationships)
    expect(result.empJobRelationships.verb).toBe('UPSERT')
    expect(Array.isArray(result.empJobRelationships.payload)).toBe(true)

    // empEmployment: Phase 4 — UPSERT single-record (5 mandatory hire fields)
    expect(result.empEmployment.verb).toBe('UPSERT')
    expect(result.empEmployment.payload).not.toBeNull()

    // perGlobalInfoTHA: Phase 5b-2 — UPSERT single-record (10 optional BA fields)
    expect(result.perGlobalInfoTHA.verb).toBe('UPSERT')
    expect(result.perGlobalInfoTHA.payload).not.toBeNull()

    // empWorkPermit: Phase 5b-3 — UPSERT conditional (foreigners only)
    // Minimal fixture has nationality=null → not a foreigner → payload=null by design (not a PENDING stub)
    expect(result.empWorkPermit.verb).toBe('UPSERT')
    // payload is intentionally null when fixture is not a foreigner — CONDITIONAL_NULL_MAPPERS documents this
    expect(CONDITIONAL_NULL_MAPPERS.has('empWorkPermit')).toBe(true)

    // perPersonRelationship: Phase 5b-4 — UPSERT multi-record (empty array valid when no dependents)
    expect(result.perPersonRelationship.verb).toBe('UPSERT')
    expect(Array.isArray(result.perPersonRelationship.payload)).toBe(true)

    // empCompensation: Phase 5 — UPSERT single-record (userId, startDate, payGroup, eventReason)
    expect(result.empCompensation.verb).toBe('UPSERT')
    expect(result.empCompensation.payload).not.toBeNull()

    // empPayCompRecurring: Phase 5 — UPSERT multi-record (empty array when baseSalary=null)
    expect(result.empPayCompRecurring.verb).toBe('UPSERT')
    expect(Array.isArray(result.empPayCompRecurring.payload)).toBe(true)

    // paymentInformationV3: Phase 5 — UPSERT single-record with deep-insert nav
    expect(result.paymentInformationV3.verb).toBe('UPSERT')
    expect(result.paymentInformationV3.payload).not.toBeNull()
  })

  it('all mappers declare entity string and CREATE or UPSERT verb', () => {
    for (const [, mapper] of Object.entries(mappers)) {
      expect(typeof mapper.entity).toBe('string')
      expect(mapper.entity.length).toBeGreaterThan(0)
      expect(['CREATE', 'UPSERT']).toContain(mapper.verb)
    }
  })

  it('User mapper verb is CREATE (not UPSERT)', () => {
    expect(mappers.user.verb).toBe('CREATE')
  })
})
