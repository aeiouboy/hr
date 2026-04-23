// hireSchema.ts — Zod schemas สำหรับ validate ข้อมูลแต่ละ step ของ Hire Wizard
// Step 1 strict validation, Steps 2-8 scaffold (จะ strict ใน Phase 2)
import { z } from 'zod'

// 6 HIRE event reason codes ที่ valid — ตาม spec Appendix 2 verbatim (C8: ห้าม invent)
export const HIRE_EVENT_REASONS = [
  'H_NEWHIRE',
  'H_RPLMENT',
  'H_TEMPASG',
  'HIREDM',
  'H_CORENTRY',
  'H_INENTRY',
] as const

export type HireEventReason = typeof HIRE_EVENT_REASONS[number]

// Step 1 — Identity: strict validation (AC-4)
export const stepIdentitySchema = z.object({
  hireDate: z
    .string({ required_error: 'กรุณาระบุวันที่เริ่มงาน' })
    .min(1, 'กรุณาระบุวันที่เริ่มงาน'),
  companyCode: z
    .string({ required_error: 'กรุณาเลือกบริษัท' })
    .min(1, 'กรุณาเลือกบริษัท'),
  eventReason: z
    .enum(HIRE_EVENT_REASONS, { required_error: 'กรุณาเลือก Event Reason' }),
})

export type StepIdentityData = z.infer<typeof stepIdentitySchema>

// Step 2 — Name: scaffold
export const stepNameSchema = z.object({
  firstNameTh: z.string().min(1, 'กรุณาระบุชื่อภาษาไทย'),
  lastNameTh: z.string().min(1, 'กรุณาระบุนามสกุลภาษาไทย'),
  firstNameEn: z.string().default(''),
  lastNameEn: z.string().default(''),
})

// Step 3 — Biographical: scaffold
export const stepBiographicalSchema = z.object({
  dateOfBirth: z.string().min(1, 'กรุณาระบุวันเกิด'),
})

// Step 4 — Employee Info: scaffold
// Employee Class A-H ตาม Appendix 3
export const EMPLOYEE_CLASSES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const
export const stepEmployeeInfoSchema = z.object({
  employeeClass: z.enum(EMPLOYEE_CLASSES, { required_error: 'กรุณาเลือก Employee Class' }),
})

// Step 5 — National ID: 13 digits Thai pattern
export const stepNationalIdSchema = z.object({
  value: z
    .string({ required_error: 'กรุณาระบุเลขบัตรประชาชน' })
    .min(1, 'กรุณาระบุเลขบัตรประชาชน')
    .regex(/^[0-9]{13}$/, 'เลขบัตรประชาชนต้องเป็นตัวเลข 13 หลัก'),
})

// Step 6 — Personal: scaffold
export const stepPersonalSchema = z.object({
  addressLine1: z.string().min(1, 'กรุณาระบุที่อยู่'),
})

// Step 7 — Job: position required + businessUnit required (non-empty string)
export const stepJobSchema = z.object({
  position: z.string({ required_error: 'กรุณาระบุตำแหน่ง' }).min(1, 'กรุณาระบุตำแหน่ง'),
  businessUnit: z
    .string({ required_error: 'กรุณาเลือกหน่วยธุรกิจ' })
    .min(1, 'กรุณาเลือกหน่วยธุรกิจ'),
})

// Step 8 — Compensation: scaffold
export const stepCompensationSchema = z.object({
  baseSalary: z
    .number({ required_error: 'กรุณาระบุเงินเดือน' })
    .positive('เงินเดือนต้องมากกว่า 0'),
})
