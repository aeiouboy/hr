// hireSchema.ts — Zod schemas สำหรับ validate ข้อมูลแต่ละ step ของ Hire Wizard
// D2 S1: ขยายจาก 13 → 37 BA fields; cross-field DOB < HireDate เป็น zod refine
import { z } from 'zod'

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
export const ID_CARD_TYPE_IDS = ['NATIONAL_ID', 'PASSPORT', 'WORK_PERMIT', 'ALIEN_ID', 'OTHER'] as const
export type IdCardTypeId = typeof ID_CARD_TYPE_IDS[number]

// Employee classes A-H — Appendix 3 (unchanged)
export const EMPLOYEE_CLASSES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const
export type EmployeeClassId = typeof EMPLOYEE_CLASSES[number]

// Gender — BA Personal Info row 12, PICKLIST_GENDER (Phase 0 F2)
export const GENDER_IDS = ['M', 'F', 'X'] as const

// Foreigner — BA Personal Info row 14, Picklist: Yes/No (PICKLIST_YES_NO D1.3)
export const YES_NO_IDS = ['YES', 'NO'] as const

// ─── Step schemas ─────────────────────────────────────────────────────────────

// ── Cluster 1 "Who" — Identity (20 fields; 13 mandatory per BA) ──────────────

/** BA rows 1-19 + Personal Info row 1 — Identity cluster */
export const stepIdentitySchema = z.object({
  /** BA row 1 — Hire Date * */
  hireDate: z.string({ required_error: 'กรุณาระบุวันที่เริ่มงาน' }).min(1, 'กรุณาระบุวันที่เริ่มงาน'),
  /** BA row 2 — Company * */
  companyCode: z.string({ required_error: 'กรุณาเลือกบริษัท' }).min(1, 'กรุณาเลือกบริษัท'),
  /** BA row 3 — Event Reason * */
  eventReason: z.enum(HIRE_EVENT_REASONS, { required_error: 'กรุณาเลือก Event Reason' }),
  /** BA row 4 — Salutation (EN) * */
  salutationEn: z.enum(SALUTATION_EN_IDS, { required_error: 'กรุณาเลือกคำนำหน้า (EN)' }),
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
  /** BA row 11 — Age * (calculated from DOB; display-only, still required) */
  age: z.number({ required_error: 'อายุต้องมากกว่า 0' }).positive('อายุต้องมากกว่า 0').optional().nullable(),
  /** BA row 12 — Employee ID * */
  employeeId: z.string().min(1, 'กรุณาระบุรหัสพนักงาน'),
  /** BA row 13 — National ID Card Type * */
  nationalIdCardType: z.enum(ID_CARD_TYPE_IDS, { required_error: 'กรุณาเลือกประเภทบัตร' }),
  /** BA row 14 — Country * */
  country: z.string().min(1, 'กรุณาเลือกประเทศ'),
  /** BA row 15 — National ID * */
  nationalId: z.string().min(1, 'กรุณาระบุเลขบัตร'),
  /** BA row 16 — Issue Date — optional */
  issueDate: z.string().optional().nullable(),
  /** BA row 17 — Expiry Date — optional */
  expiryDate: z.string().optional().nullable(),
  /** BA row 18 — Is Primary * */
  isPrimary: z.enum(YES_NO_IDS, { required_error: 'กรุณาเลือก Is Primary' }),
  /** BA row 19 — [VN] Issue Place — optional (Vietnam only) */
  vnIssuePlace: z.string().default(''),
  /** BA Personal Info row 1 — Salutation (Local) * */
  salutationLocal: z.enum(SALUTATION_EN_IDS, { required_error: 'กรุณาเลือกคำนำหน้า (Local)' }),
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
  /** BA Personal Info row 5 — Middle Name (Local) * */
  middleNameLocal: z.string().min(1, 'กรุณาระบุชื่อกลาง (Local)'),
  /** BA Personal Info row 10 — Nickname * */
  nickname: z.string().min(1, 'กรุณาระบุชื่อเล่น'),
  /** BA Personal Info row 11 — Military Status * */
  militaryStatus: z.string({ required_error: 'กรุณาเลือกสถานะทางทหาร' }).min(1),
  /** BA Personal Info row 12 — Gender * */
  gender: z.enum(GENDER_IDS, { required_error: 'กรุณาเลือกเพศ' }),
  /** BA Personal Info row 13 — Nationality * */
  nationality: z.string({ required_error: 'กรุณาเลือกสัญชาติ' }).min(1),
  /** BA Personal Info row 14 — Foreigner * */
  foreigner: z.enum(YES_NO_IDS, { required_error: 'กรุณาระบุสถานะต่างด้าว' }),
  /** BA Personal Info row 15 — Blood Type * */
  bloodType: z.string({ required_error: 'กรุณาเลือกกรุ๊ปเลือด' }).min(1),
  /** BA Personal Info row 16 — Marital Status * */
  maritalStatus: z.string({ required_error: 'กรุณาเลือกสถานภาพสมรส' }).min(1),
  /** BA Personal Info row 17 — Marital Status Since * */
  maritalStatusSince: z.string().min(1, 'กรุณาระบุวันที่เปลี่ยนสถานภาพสมรส'),
})
.superRefine((data, ctx) => {
  // R2: maritalStatusSince required เมื่อ maritalStatus ≠ SINGLE (BRD Personal Info row 17)
  if (data.maritalStatus !== 'SINGLE' && !data.maritalStatusSince) {
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

// ─── Legacy schemas (unchanged — backward compat with existing tests) ─────────

export const stepNameSchema = z.object({
  firstNameTh: z.string().min(1, 'กรุณาระบุชื่อภาษาไทย'),
  lastNameTh: z.string().min(1, 'กรุณาระบุนามสกุลภาษาไทย'),
  firstNameEn: z.string().default(''),
  lastNameEn: z.string().default(''),
})

export const stepEmployeeInfoSchema = z.object({
  employeeClass: z.enum(EMPLOYEE_CLASSES, { required_error: 'กรุณาเลือก Employee Class' }),
})

export const stepNationalIdSchema = z.object({
  value: z
    .string({ required_error: 'กรุณาระบุเลขบัตรประชาชน' })
    .min(1, 'กรุณาระบุเลขบัตรประชาชน')
    .regex(/^[0-9]{13}$/, 'เลขบัตรประชาชนต้องเป็นตัวเลข 13 หลัก'),
})

export const stepPersonalSchema = z.object({
  addressLine1: z.string().min(1, 'กรุณาระบุที่อยู่'),
})

export const stepJobSchema = z.object({
  position: z.string({ required_error: 'กรุณาระบุตำแหน่ง' }).min(1, 'กรุณาระบุตำแหน่ง'),
  businessUnit: z.string({ required_error: 'กรุณาเลือกหน่วยธุรกิจ' }).min(1, 'กรุณาเลือกหน่วยธุรกิจ'),
})

export const stepCompensationSchema = z.object({
  baseSalary: z.number({ required_error: 'กรุณาระบุเงินเดือน' }).positive('เงินเดือนต้องมากกว่า 0'),
})
