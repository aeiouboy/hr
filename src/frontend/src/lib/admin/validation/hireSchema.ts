// hireSchema.ts — Zod schemas สำหรับ validate ข้อมูลแต่ละ step ของ Hire Wizard
// D2 S1: ขยายจาก 13 → 37 BA fields; cross-field DOB < HireDate เป็น zod refine
// Wave 2-A: #14 mod-11, #101 hireDate gate, #12 gender/marital alignment, #15/#16 email/phone
import { z } from 'zod'
import { validateThaiNationalIdMod11, requiresThaiMod11 } from './thaiNationalId'

// ─── Age helper (shared across schema refine + StepIdentity display) ─────────
// คำนวณอายุเต็มปี ณ วันนี้ จาก dateOfBirth (ISO yyyy-mm-dd). null เมื่อ DOB ว่างหรืออยู่ในอนาคต.
export function calcAge(dob: string): number | null {
  if (!dob) return null
  const birth = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age >= 0 ? age : null
}

/** กม.แรงงานไทย: อายุขั้นต่ำในการจ้างงาน 15 ปี (พ.ร.บ.คุ้มครองแรงงาน พ.ศ.2541 ม.44) */
const MIN_HIRE_AGE = 15

// ─── Picklist ID literals (C8: ห้าม invent — ตรงตาม BA-EC-SUMMARY.md) ────────

// 6 HIRE event reason codes — BA row 3, Picklist ID: EventReasonHire
export const HIRE_EVENT_REASONS = [
  'H_NEWHIRE', 'H_RPLMENT', 'H_TEMPASG', 'HIREDM', 'H_CORENTRY', 'H_INENTRY',
] as const
export type HireEventReason = typeof HIRE_EVENT_REASONS[number]

// Salutation codes — BA row 4, Picklist ID: Salutation EN
export const SALUTATION_EN_IDS = ['MR', 'MRS', 'MS', 'DR'] as const
export type SalutationEnId = typeof SALUTATION_EN_IDS[number]

// National ID Card Type — BA row 13, Picklist ID: idType_ID_Card
// SF cite: qas-fields-2026-04-26/sf-qas-PerNationalId-2026-04-26.json#.d.results[0].cardType = "tni2"
// Humi keeps human-readable IDs; SF mapping is in thaiNationalId.ts SF_CARD_TYPE_MAP
export const ID_CARD_TYPE_IDS = ['NATIONAL_ID', 'PASSPORT', 'WORK_PERMIT', 'ALIEN_ID', 'OTHER'] as const
export type IdCardTypeId = typeof ID_CARD_TYPE_IDS[number]

// Employee classes A-H — Appendix 3 (unchanged)
export const EMPLOYEE_CLASSES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const
export type EmployeeClassId = typeof EMPLOYEE_CLASSES[number]

// Gender — BA Personal Info row 12
// SF cite: qas-fields-2026-04-25/sf-qas-picklist-options-LINKED-2026-04-26.json#aggregationByPicklist.gender
// SF QAS has exactly 2 codes: externalCode='Female' / 'Male'.
// Humi uses internal IDs 'M'/'F' (PICKLIST_GENDER.id). 'X' has no SF counterpart — dropped from enum.
// SF-to-Humi mapping: Female→'F', Male→'M'. Schema enforces M/F only (was M/F/X).
export const GENDER_IDS = ['M', 'F'] as const

// Foreigner — BA Personal Info row 14, Picklist: Yes/No (PICKLIST_YES_NO D1.3)
export const YES_NO_IDS = ['YES', 'NO'] as const

// Marital status SF codes — 5 codes
// SF cite: qas-fields-2026-04-25/sf-qas-picklist-options-LINKED-2026-04-26.json#aggregationByPicklist.ecMaritalStatus
// M=Married, E=Engaged (added — was missing), D=Divorced, S=Single, N=Common-law/Unregistered
// Humi kept WIDOWED/SEPARATED as extensions; these are NOT in SF QAS and are kept as local extras.
// Schema accepts SF codes + local extras to remain backward-compatible with existing drafts.
export const MARITAL_STATUS_SF_CODES = ['M', 'E', 'D', 'S', 'N'] as const
// 'SINGLE' (legacy) maps to SF 'S'; 'MARRIED'→'M'; 'DIVORCED'→'D'; 'WIDOWED'/'SEPARATED' are local only
export const MARITAL_STATUS_SINGLE_EQUIVALENTS = ['SINGLE', 'S'] as const

// ─── Step schemas ─────────────────────────────────────────────────────────────

// ── Cluster 1 "Who" — Identity (20 fields; 13 mandatory per BA) ──────────────

/** BA rows 1-19 + Personal Info row 1 — Identity cluster */
export const stepIdentitySchema = z.object({
  /** BA row 1 — Hire Date * */
  hireDate: z.string().min(1, 'กรุณาระบุวันที่เริ่มงาน'),
  /** BA row 2 — Company * */
  companyCode: z.string().min(1, 'กรุณาเลือกบริษัท'),
  /** BA row 3 — Event Reason * */
  eventReason: z.enum(HIRE_EVENT_REASONS),
  /** BA row 4 — Salutation (EN) * */
  salutationEn: z.enum(SALUTATION_EN_IDS),
  /** BA row 5 — Firstname (EN) * */
  firstNameEn: z.string().min(1, 'กรุณาระบุชื่อ (EN)'),
  /** BA row 6 — Middle Name (EN) — optional */
  middleNameEn: z.string().default(''),
  /** BA row 7 — Lastname (EN) * */
  lastNameEn: z.string().min(1, 'กรุณาระบุนามสกุล (EN)'),
  /** BA row 8 — Date of Birth * (cross-field: must be < hireDate) */
  dateOfBirth: z.string().min(1, 'กรุณาระบุวันเกิด'),
  /** BA row 9 — Country of Birth — optional */
  countryOfBirth: z.string().optional().nullable(),
  /** BA row 10 — Region of Birth — optional */
  regionOfBirth: z.string().default(''),
  // BA row 11 (Age) เป็น derived value จาก dateOfBirth — ไม่ใส่ใน schema เพื่อกัน
  // single-source-of-truth drift (C7); validate ผ่าน .refine ด้านล่างแทน
  /** BA row 12 — Employee ID * */
  employeeId: z.string().min(1, 'กรุณาระบุรหัสพนักงาน'),
  /** BA row 13 — National ID Card Type * */
  nationalIdCardType: z.enum(ID_CARD_TYPE_IDS),
  /** BA row 14 — Country * */
  country: z.string().min(1, 'กรุณาเลือกประเทศ'),
  /** BA row 15 — National ID *
   * SF cite: qas-fields-2026-04-26/sf-qas-PerNationalId-2026-04-26.json#.d.results[0].nationalId
   * mod-11 checksum applied when cardType = NATIONAL_ID (SF tni2) via .refine() below */
  nationalId: z.string().min(1, 'กรุณาระบุเลขบัตร'),
  /** BA row 16 — Issue Date — optional */
  issueDate: z.string().optional().nullable(),
  /** BA row 17 — Expiry Date — optional */
  expiryDate: z.string().optional().nullable(),
  /** BA row 18 — Is Primary * */
  isPrimary: z.enum(YES_NO_IDS),
  /** BA row 19 — [VN] Issue Place — optional (Vietnam only) */
  vnIssuePlace: z.string().default(''),
  /** BA Personal Info row 1 — Salutation (Local) * */
  salutationLocal: z.enum(SALUTATION_EN_IDS),
})
.refine(
  (data) => {
    // BA cross-field rule (row 8 col F verbatim):
    // "Recent Date should be greater than Date of Birth"
    // = hireDate > dateOfBirth
    if (!data.hireDate || !data.dateOfBirth) return true // individual required checks handle empty
    return new Date(data.hireDate) > new Date(data.dateOfBirth)
  },
  {
    message: 'วันที่เริ่มงานต้องหลังวันเกิด (Recent Date should be greater than Date of Birth)',
    path: ['dateOfBirth'],
  },
)
.refine(
  (data) => {
    if (!data.dateOfBirth) return true // individual required check handle empty
    const age = calcAge(data.dateOfBirth)
    return age !== null && age >= MIN_HIRE_AGE
  },
  {
    message: `พนักงานต้องอายุอย่างน้อย ${MIN_HIRE_AGE} ปี (พ.ร.บ.คุ้มครองแรงงาน)`,
    path: ['dateOfBirth'],
  },
)
.refine(
  (data) => {
    // BRD #101: hireDate backdate ≤90 days
    // SF cite: qas-fields-2026-04-26/sf-qas-EmpEmployment-2026-04-26.json#.d.results[0].startDate
    if (!data.hireDate) return true
    const hd = new Date(data.hireDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const diffMs = today.getTime() - hd.getTime()
    const diffDays = Math.floor(diffMs / 86400000)
    return diffDays <= 90 // past: must be ≤90 days ago
  },
  {
    message: 'วันที่เริ่มงานย้อนหลังได้ไม่เกิน 90 วัน (BRD #101) — ถ้าต้องการย้อนหลังมากกว่า กรุณาติดต่อ SPD',
    path: ['hireDate'],
  },
)
.refine(
  (data) => {
    // BRD #14: Thai National ID mod-11 checksum
    // SF cite: qas-fields-2026-04-26/sf-qas-PerNationalId-2026-04-26.json#.d.results[0].cardType = "tni2"
    // Only applies when cardType = NATIONAL_ID (SF: tni2). Passport/work-permit etc. skip.
    if (!requiresThaiMod11(data.nationalIdCardType)) return true
    if (!data.nationalId) return true // empty handled by .min(1) above
    return validateThaiNationalIdMod11(data.nationalId)
  },
  {
    message: 'เลขบัตรประชาชนไม่ถูกต้อง (checksum mod-11 ไม่ผ่าน) / National ID checksum invalid',
    path: ['nationalId'],
  },
)

export type StepIdentityData = z.infer<typeof stepIdentitySchema>

// ── Cluster 2 "Job" — Personal Info (12 fields; all mandatory per BA) ─────────

/** BA Personal Info rows 2-17 — biographical cluster */
export const stepBiographicalSchema = z.object({
  /** BA Personal Info row 2 — Other Title (TH) * */
  otherTitleTh: z.string().min(1, 'กรุณาระบุคำนำหน้า (TH)'),
  /** BA Personal Info row 3 — Firstname (Local) * */
  firstNameLocal: z.string().min(1, 'กรุณาระบุชื่อ (ภาษาท้องถิ่น)'),
  /** BA Personal Info row 4 — Lastname (Local) * */
  lastNameLocal: z.string().min(1, 'กรุณาระบุนามสกุล (ภาษาท้องถิ่น)'),
  /** BA Personal Info row 5 — Middle Name (Local) — optional (SF PerPersonal.secondLastName is sap_required=false) */
  middleNameLocal: z.string().optional().default(''),
  /** BA Personal Info row 10 — Nickname — optional (SF PerPersonal.preferredName is sap_required=false) */
  nickname: z.string().optional().default(''),
  /** BA Personal Info row 11 — Military Status — optional (not in SF schema; Thai-locale custom) */
  militaryStatus: z.string().optional().default(''),
  /** BA Personal Info row 12 — Gender — optional (SF PerPersonal.gender is sap_required=false)
   * SF cite: qas-fields-2026-04-25/sf-qas-picklist-options-LINKED-2026-04-26.json#aggregationByPicklist.gender
   * SF codes: Female / Male only */
  gender: z.enum(GENDER_IDS).optional(),
  /** BA Personal Info row 13 — Nationality * */
  nationality: z.string().min(1),
  /** BA Personal Info row 14 — Foreigner — auto-derived from nationality (SF rule XX-XXX-EIM-OI-SetFlagForeigner) */
  foreigner: z.enum(YES_NO_IDS).optional(),
  /** BA Personal Info row 15 — Blood Type — optional (not in SF schema; Thai-locale custom) */
  bloodType: z.string().optional().default(''),
  /** BA Personal Info row 16 — Marital Status — optional (SF PerPersonal.maritalStatus is sap_required=false) */
  maritalStatus: z.string().optional().default(''),
  /** BA Personal Info row 17 — Marital Status Since — conditional:
   *  required when maritalStatus ≠ SINGLE/S, omitted for SINGLE/S (BRD-BA-SF-AUDIT Finding #7)
   *  SF cite: qas-fields-2026-04-25/sf-qas-picklist-options-LINKED-2026-04-26.json#aggregationByPicklist.ecMaritalStatus */
  maritalStatusSince: z.string().optional(),

  // ── BRD #13: Spouse fields (PerPersonal customString2/3/10/11 + partnerName) ──
  // SF cite: qas-fields-2026-04-26/sf-qas-PerPersonal-2026-04-26.json#.d.results[0].partnerName
  /** PerPersonal.partnerName — คู่สมรสชื่อ (ภาษาไทย) / Thai spouse full name */
  spouseNameTh: z.string().optional(),

  // ── BRD #13: nativePreferredLang ──
  // SF cite: qas-fields-2026-04-26/sf-qas-PerPersonal-2026-04-26.json#.d.results[0].nativePreferredLang
  /** PerPersonal.customString5 = nativePreferredLang code (e.g. "2427" = ภาษาไทย) */
  nativePreferredLang: z.string().optional(),

  // ── BRD #12 MED: religion field ──
  // SF cite: qas-fields-2026-04-26/sf-qas-PerPersonal-2026-04-26.json#.d.results[0].customString1
  // RELIGION_THA picklist: 6 codes (29/24/99/46/43/36)
  /** PerPersonal.customString1 = religion code */
  religion: z.string().optional(),
})
.superRefine((data, ctx) => {
  // Fix per AUDIT #7 — maritalStatusSince required only when maritalStatus ≠ SINGLE/S
  // MARITAL_STATUS_SINGLE_EQUIVALENTS: ['SINGLE', 'S'] covers both legacy and SF codes
  // Guard: maritalStatus is optional after SF parity fix; skip check when not set
  if (!data.maritalStatus) return
  const isSingle = MARITAL_STATUS_SINGLE_EQUIVALENTS.includes(
    data.maritalStatus as typeof MARITAL_STATUS_SINGLE_EQUIVALENTS[number]
  )
  if (!isSingle && !data.maritalStatusSince) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'กรุณาระบุวันที่เปลี่ยนสถานภาพสมรส (ยกเว้นโสด)',
      path: ['maritalStatusSince'],
    })
  }
})

export type StepBiographicalData = z.infer<typeof stepBiographicalSchema>

// ── Cluster 3 "Review" ── EN name dup + attachment (optional) ────────────────

export const stepReviewSchema = z.object({
  /** BA Personal Info rows 6-9 — EN name dup (carry from identity, read-only) */
  salutationEnReview: z.string().optional().nullable(),
  firstNameEnReview: z.string().default(''),
  lastNameEnReview: z.string().default(''),
  middleNameEnReview: z.string().default(''),
  /** BA Personal Info row 18 — Attachment (optional) */
  attachmentName: z.string().optional().nullable(),
})

// ── Phase 1.4: Emergency Contacts (PerEmergencyContacts SF entity) ────────────
// relationship: Edm.String maxLength=50 — free-text at OData level, no picklist constraint
// Phase 2 may upgrade to picklist binding (personRelationshipType / relation).

export const emergencyContactEntrySchema = z.object({
  name: z.string().min(1, 'Name required'),
  relationship: z.string().min(1, 'Relationship required').max(50, 'Max 50 characters'),
  phone: z.string().min(1, 'Phone required'),
  primaryFlag: z.boolean(),
  addressCountry: z.string().default('THA'),
  addressProvince: z.string().default(''),
  addressDistrict: z.string().default(''),
  addressSubDistrict: z.string().default(''),
  addressPostalCode: z.string().default(''),
})

export type EmergencyContactEntryData = z.infer<typeof emergencyContactEntrySchema>

export const stepEmergencyContactsSchema = z.object({
  emergencyContacts: z.array(emergencyContactEntrySchema).optional().default([]),
})

export type StepEmergencyContactsData = z.infer<typeof stepEmergencyContactsSchema>

// ── Phase 5b-2: Global Information (PerGlobalInfoTHA SF entity) ──────────────
export const globalInfoEntrySchema = z.object({
  numberOfChildren: z.number().nullable(),
  religion: z.string().nullable(),
  disabilityStatus: z.string(),
  disabilityCertStartDate: z.string().nullable(),
  disabilityCertEndDate: z.string().nullable(),
  typeOfDisability: z.string(),
  certificateId: z.string(),
  spouseFatherIdNumber: z.string(),
  spouseMotherIdNumber: z.string(),
  additionalInformation: z.string(),
})

export const stepGlobalInfoSchema = z.object({
  globalInfo: globalInfoEntrySchema,
})

export type GlobalInfoEntryData = z.infer<typeof globalInfoEntrySchema>
export type StepGlobalInfoData = z.infer<typeof stepGlobalInfoSchema>

// ── Phase 5b-3: Work Permit (EmpWorkPermit SF entity) ────────────────────────
// Required when foreigner — refine in component
export const workPermitEntrySchema = z.object({
  documentType: z.string(),
  country: z.string(),
  documentNumber: z.string(),
  issueDate: z.string().nullable(),
  expiryDate: z.string().nullable(),
  arrivalDateVisa: z.string().nullable(),
  ninetyDayReportVisa: z.string().nullable(),
  attachmentName: z.string(),
})

export const stepWorkPermitSchema = z.object({
  workPermit: workPermitEntrySchema,
})

export type WorkPermitEntryData = z.infer<typeof workPermitEntrySchema>
export type StepWorkPermitData = z.infer<typeof stepWorkPermitSchema>

// ── Phase 5b-4: Dependents (PerPersonRelationship SF entity) ─────────────────
export const dependentEntrySchema = z.object({
  relationshipType: z.string().min(1, 'Relationship required'),
  salutationEn: z.string().nullable(),
  firstNameEn: z.string(),
  lastNameEn: z.string(),
  salutationLocal: z.string().nullable(),
  firstNameLocal: z.string(),
  lastNameLocal: z.string(),
  nationality: z.string().nullable(),
  dateOfBirth: z.string().nullable(),
  country: z.string().nullable(),
  nationalIdCardType: z.string().nullable(),
  nationalIdCountry: z.string().nullable(),
  nationalId: z.string(),
  phone: z.string(),
  email: z.string(),
  isTaxDependent: z.boolean(),
  addressLine1: z.string(),
})

export const stepDependentsSchema = z.object({
  dependents: z.array(dependentEntrySchema).optional().default([]),
})

export type DependentEntryData = z.infer<typeof dependentEntrySchema>
export type StepDependentsData = z.infer<typeof stepDependentsSchema>

// ─── Legacy schemas (unchanged — backward compat with existing tests) ─────────

export const stepNameSchema = z.object({
  firstNameTh: z.string().min(1, 'กรุณาระบุชื่อภาษาไทย'),
  lastNameTh: z.string().min(1, 'กรุณาระบุนามสกุลภาษาไทย'),
  firstNameEn: z.string().default(''),
  lastNameEn: z.string().default(''),
})

export const stepEmployeeInfoSchema = z.object({
  // Phase 6: employeeClass UI removed — rely on employeeGroup+employeeSubGroup only.
  // Keep optional in schema for migration compat; mapper already drops it.
  employeeClass: z.enum(EMPLOYEE_CLASSES).optional(),
  originalStartDate: z.string().min(1, 'กรุณาระบุวันเริ่มงานครั้งแรก'),
  seniorityStartDate: z.string().min(1, 'กรุณาระบุวันนับอายุงาน'),
  // Phase 4: SSN — User.ssn (sap_label="National ID", sap_creatable=true).
  // Optional 13-digit Thai social security / national ID number for User entity.
  ssn: z.string().optional().default(''),
})

export const stepNationalIdSchema = z.object({
  value: z
    .string()
    .min(1, 'กรุณาระบุเลขบัตรประชาชน')
    .regex(/^[0-9]{13}$/, 'เลขบัตรประชาชนต้องเป็นตัวเลข 13 หลัก'),
})

export const stepPersonalSchema = z.object({
  addressLine1: z.string().min(1, 'กรุณาระบุที่อยู่'),
})

// Phase 3: EmpJob picklist codes (SF-authoritative, from MISSING-PICKLISTS.md)
export const POLICY_PROFILE_CODES = [
  'SCM','PWB','OFM','CRG','CPN','CMG','CHR','CHG','CFR','CFM',
  'B2S','SSP','RBS','CDS','999','SU-CMC & SDO','SU-MA','SU-INTERNAL AUDIT',
  'SU-CIS','SU-T1C','SU-CNG','SU-CGO','SU-OTHER','SU-FAST','SU-BD','SU-RIS','SU-HR',
] as const

export const CORPORATE_TITLE_CODES = [
  '111','L90','L80','L70','L60','L50','L40','L30','L20','L10',
  'S70','S60','S50','S40','S30','S20','S10','999',
] as const

export const CONTRACT_TYPE_CODES = ['R1','C1','C2','C3','C4','C5','V1'] as const

export const EMPLOYMENT_TYPE_CODES = [
  '7','8','9','07','08','09','10','11','12','13','14','15','16','17','18','19',
  '20','21','22','23','24','25','26','27','C1','C2','C3','C4','C5','C6',
  'D1','D2','P1','P2','P3','P5','T1','T2','T3','UC','X7','X8','X9','XA','XB',
  'Y7','Y8','Y9','YA','YB',
] as const

export const stepJobSchema = z.object({
  position: z.string().min(1, 'กรุณาระบุตำแหน่ง'),
  businessUnit: z.string().min(1, 'กรุณาเลือกหน่วยธุรกิจ'),
  // Phase 3: new optional/nullable fields — mandatory enforcement happens at mapper level
  department: z.string().optional().nullable(),
  division: z.string().optional().nullable(),
  divisionLabel: z.string().optional().nullable(),
  costCenter: z.string().optional().nullable(),
  jobFunction: z.string().optional().nullable(),
  jobFunctionLabel: z.string().optional().nullable(),
  corporateTitle: z.string().optional().nullable(),
  payScaleType: z.string().optional().nullable(),
  payScaleArea: z.string().optional().nullable(),
  payScaleGroup: z.string().optional().nullable(),
  payScaleLevel: z.string().optional().nullable(),
  policyProfile: z.string().optional().nullable(),
  ssoLocation: z.string().optional().nullable(),
  groupCompanyGroup: z.string().optional().nullable(),
  contractType: z.string().optional().nullable(),
  zone: z.string().optional().nullable(),
  contractEndDate: z.string().optional().nullable(),
  probationEndDate: z.string().optional().nullable(),
  emplStatus: z.string().optional().nullable(),
  event: z.string().optional().nullable(),
  employmentType: z.string().optional().nullable(),
})

const costDistributionRowSchema = z.object({
  costCenter: z.string().min(1, 'กรุณาเลือก cost center'),
  percent: z
    .number()
    .positive('สัดส่วน cost center ต้องมากกว่า 0')
    .max(100, 'สัดส่วน cost center ต้องไม่เกิน 100'),
})

export const stepCompensationSchema = z.object({
  baseSalary: z.number().positive('เงินเดือนต้องมากกว่า 0'),
  costDistribution: z.array(costDistributionRowSchema).optional().default([]),
}).superRefine((data, ctx) => {
  const rows = data.costDistribution ?? []
  if (rows.length === 0) return

  const total = rows.reduce((sum, row) => sum + row.percent, 0)
  if (Math.abs(total - 100) >= 0.01) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'สัดส่วน cost center รวมต้องเท่ากับ 100%',
      path: ['costDistribution'],
    })
  }
})
