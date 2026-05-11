import type {
  DependentEntry,
  FormData as HireFormData,
} from '@/lib/admin/store/useHireWizard'

const THAI_NATIONALITY_CODES = new Set(['TH', 'THA'])

export function isForeignNationality(nationality: string | null | undefined): boolean {
  const code = (nationality ?? '').trim().toUpperCase()
  return code !== '' && !THAI_NATIONALITY_CODES.has(code)
}

function hasWorkPermitDraftData(formData: HireFormData): boolean {
  const workPermit = formData.workPermit
  return Boolean(
    workPermit.documentType.trim() ||
      workPermit.country.trim() ||
      workPermit.documentNumber.trim() ||
      workPermit.issueDate ||
      workPermit.expiryDate ||
      workPermit.arrivalDateVisa ||
      workPermit.ninetyDayReportVisa ||
      workPermit.attachmentName.trim(),
  )
}

export function shouldShowWorkPermitSection(formData: HireFormData): boolean {
  return isForeignNationality(formData.biographical?.nationality) || hasWorkPermitDraftData(formData)
}

export function shouldShowDependentsSection(formData: HireFormData): boolean {
  return (formData.dependents?.length ?? 0) > 0
}

export function createEmptyDependentEntry(): DependentEntry {
  return {
    relationshipType: '',
    salutationEn: null,
    firstNameEn: '',
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
    attachmentName: null,
  }
}
