// Phase 3 — empJob mapper unit tests
// Verifies specific field mappings, errata remaps, and key derivations.
import { describe, it, expect } from 'vitest'
import { EmpJobMapper } from '../empJob'
import type { FormData } from '../../../store/useHireWizard'

// Minimal fixture with values set so the payload has non-null test targets
const baseFormData: FormData = {
  identity: {
    hireDate: '2026-05-01', companyCode: 'CRC', eventReason: 'H_NEWHIRE',
    salutationEn: 'MR', firstNameEn: 'Somchai', middleNameEn: '', lastNameEn: 'Jaidee',
    dateOfBirth: '1990-01-15', countryOfBirth: 'THA', regionOfBirth: '',
    age: 36, employeeId: 'EMP00123', nationalIdCardType: 'NATIONAL_ID',
    country: 'THA', nationalId: '1234567890123', issueDate: null, expiryDate: null,
    isPrimary: 'YES', vnIssuePlace: '', salutationLocal: 'MR',
    attachmentName: null,
  },
  biographical: {
    otherTitleTh: 'นาย', firstNameLocal: 'สมชาย', lastNameLocal: 'ใจดี',
    middleNameLocal: '', nickname: '', militaryStatus: null,
    gender: 'M', nationality: 'THA', foreigner: null,
    bloodType: null, maritalStatus: 'S', maritalStatusSince: null,
  },
  review: {
    salutationEnReview: null, firstNameEnReview: '', lastNameEnReview: '',
    middleNameEnReview: '', attachmentName: null,
  },
  contact: {
    phones: [{ type: 'mobile', value: '0812345678', isPrimary: true }],
    emails: [{ type: 'personal', value: 'somchai@example.com', isPrimary: true }],
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
  name: { firstNameTh: 'สมชาย', lastNameTh: 'ใจดี', firstNameEn: 'Somchai', lastNameEn: 'Jaidee' },
  employeeInfo: {
    employeeClass: null,
    originalStartDate: '2026-05-01', seniorityStartDate: '2026-05-01',
    retirementDate: '', pfServiceDate: '', dvtPreviousId: '', cgPreviousEmployeeId: '',
    employeeGroup: 'EG01', employeeSubGroup: 'ESG01',
  },
  nationalId: { value: '1234567890123' },
  personal: { addressLine1: '123 Main St' },
  job: {
    position: 'POS-00042', businessUnit: 'ROBINSON', businessUnitLabel: 'Robinson',
    branch: 'ROB-RMA', branchLabel: 'Robinson Rama 9', jobCode: 'RETAIL_OPS',
    jobLabel: 'Retail Operations Manager', jobGrade: 'JG-08', jobGradeLabel: 'Senior Manager',
    storeBranchCode: 'cust_WorkLocation_TOPS_PHUKET', hrDistrict: 'HR01-08',
    supervisorId: '20001001', supervisorLabel: 'Direct Manager from FO',
    workSchedule: 'D05H0800', holidayTypeCondition: 'HO', timeManagementStatus: '9',
    otFlag: 'YES', standardWeeklyHours: 40, overrideStandardWeeklyHours: true,
    dayOffType: 'FIXED', dailyWorkingHours: 8,
    workingDaysPerWeek: 5, fte: 1, holidayCalendar: 'TH_PUBLIC', timeProfile: 'TP_STD',
    timeRecordingVariant: '01',
    attachmentName: null,
    // Phase 3 fields
    department: 'D-RETAIL-OPS', division: 'DIV-RETAIL', divisionLabel: 'Retail Division',
    costCenter: 'CC-1001', jobFunction: 'JF-MGT', jobFunctionLabel: 'Management',
    corporateTitle: 'L50', payScaleType: 'TH01', payScaleArea: '01',
    payScaleGroup: 'TH_MGMT', payScaleLevel: '08',
    policyProfile: 'RBS', ssoLocation: 'SSO-BKK', groupCompanyGroup: 'S00001',
    contractType: 'C1', zone: 'Z-CENTRAL', contractEndDate: null, probationEndDate: '2026-11-01',
    emplStatus: 'A', event: 'H', employmentType: 'P1',
  },
  compensation: { baseSalary: 50000 },
}

describe('EmpJobMapper', () => {
  it('verb is UPSERT', () => {
    expect(EmpJobMapper.verb).toBe('UPSERT')
  })

  it('payload is non-null', () => {
    const result = EmpJobMapper.build(baseFormData)
    expect(result.payload).not.toBeNull()
  })

  it('userId derived from identity.employeeId', () => {
    const result = EmpJobMapper.build(baseFormData)
    const p = result.payload as Record<string, unknown>
    expect(p.userId).toBe('EMP00123')
  })

  it('startDate derived from identity.hireDate as SF /Date()/ format', () => {
    const result = EmpJobMapper.build(baseFormData)
    const p = result.payload as Record<string, unknown>
    expect(typeof p.startDate).toBe('string')
    expect(p.startDate).toMatch(/^\/Date\(\d+\)\/$/)
  })

  it('errata: corporateTitle → customString5', () => {
    const result = EmpJobMapper.build(baseFormData)
    const p = result.payload as Record<string, unknown>
    expect(p.customString5).toBe('L50')
  })

  it('errata: dailyWorkingHours → customDouble1', () => {
    const result = EmpJobMapper.build(baseFormData)
    const p = result.payload as Record<string, unknown>
    expect(p.customDouble1).toBe(8)
  })

  it('errata: hrDistrict → customString25', () => {
    const result = EmpJobMapper.build(baseFormData)
    const p = result.payload as Record<string, unknown>
    expect(p.customString25).toBe('HR01-08')
  })

  it('customString7 (Work Location) uses storeBranchCode', () => {
    const result = EmpJobMapper.build(baseFormData)
    const p = result.payload as Record<string, unknown>
    expect(p.customString7).toBe('cust_WorkLocation_TOPS_PHUKET')
  })

  it('maps Supervisor ID from Position FO to managerId', () => {
    const result = EmpJobMapper.build(baseFormData)
    const p = result.payload as Record<string, unknown>
    expect(p.managerId).toBe('20001001')
  })

  it('customString2 (Employee Group) from employeeInfo slice', () => {
    const result = EmpJobMapper.build(baseFormData)
    const p = result.payload as Record<string, unknown>
    expect(p.customString2).toBe('EG01')
  })

  it('customString3 (Employee Subgroup) from employeeInfo slice', () => {
    const result = EmpJobMapper.build(baseFormData)
    const p = result.payload as Record<string, unknown>
    expect(p.customString3).toBe('ESG01')
  })

  it('customString1 (Policy Profile) from job.policyProfile', () => {
    const result = EmpJobMapper.build(baseFormData)
    const p = result.payload as Record<string, unknown>
    expect(p.customString1).toBe('RBS')
  })

  it('customString16 (Group/Company Group) from job.groupCompanyGroup', () => {
    const result = EmpJobMapper.build(baseFormData)
    const p = result.payload as Record<string, unknown>
    expect(p.customString16).toBe('S00001')
  })

  it('customString24 (Contract Type) from job.contractType', () => {
    const result = EmpJobMapper.build(baseFormData)
    const p = result.payload as Record<string, unknown>
    expect(p.customString24).toBe('C1')
  })

  it('customString19 (Job Grade) duplicates payGrade', () => {
    const result = EmpJobMapper.build(baseFormData)
    const p = result.payload as Record<string, unknown>
    expect(p.customString19).toBe(p.payGrade)
    expect(p.payGrade).toBe('JG-08')
  })

  it('timezone hardcoded to Asia/Bangkok', () => {
    const result = EmpJobMapper.build(baseFormData)
    const p = result.payload as Record<string, unknown>
    expect(p.timezone).toBe('Asia/Bangkok')
  })

  it('emplStatus defaults to A when not set', () => {
    const formWithNullStatus: FormData = {
      ...baseFormData,
      job: { ...baseFormData.job, emplStatus: null },
    }
    const result = EmpJobMapper.build(formWithNullStatus)
    const p = result.payload as Record<string, unknown>
    expect(p.emplStatus).toBe('A')
  })

  it('event defaults to H (hire) when not set', () => {
    const formWithNullEvent: FormData = {
      ...baseFormData,
      job: { ...baseFormData.job, event: null },
    }
    const result = EmpJobMapper.build(formWithNullEvent)
    const p = result.payload as Record<string, unknown>
    expect(p.event).toBe('H')
  })

  it('insurance/union fields (customString104-110) emitted as null', () => {
    const result = EmpJobMapper.build(baseFormData)
    const p = result.payload as Record<string, unknown>
    for (const key of ['customString104', 'customString105', 'customString106',
                       'customString107', 'customString109', 'customString110']) {
      expect(p).toHaveProperty(key)
      expect(p[key]).toBeNull()
    }
  })

  it('all 38 SF sap_required=true keys present in payload', () => {
    const REQUIRED_KEYS = [
      'userId', 'startDate', 'eventReason', 'company', 'businessUnit', 'department',
      'division', 'costCenter', 'jobCode', 'jobTitle', 'position', 'location',
      'payGrade', 'payScaleType', 'payScaleArea', 'payScaleGroup', 'payScaleLevel',
      'standardHours', 'workscheduleCode', 'timezone',
      'customString1', 'customString2', 'customString3', 'customString6',
      'customString7', 'customString8', 'customString9', 'customString16',
      'customString19', 'customString21', 'customString24', 'customString31',
      'customString104', 'customString105', 'customString106', 'customString107',
      'customString109', 'customString110',
    ]
    const result = EmpJobMapper.build(baseFormData)
    const p = result.payload as Record<string, unknown>
    const payloadKeys = new Set(Object.keys(p))
    const missing = REQUIRED_KEYS.filter(k => !payloadKeys.has(k))
    expect(missing).toHaveLength(0)
  })
})
