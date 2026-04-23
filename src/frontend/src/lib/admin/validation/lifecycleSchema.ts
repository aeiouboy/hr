// lifecycleSchema.ts — Zod schemas สำหรับ validate 3 lifecycle flows
// pattern ต่อเนื่องจาก hireSchema.ts — ขยาย ไม่ duplicate
import { z } from 'zod'

// ---------- REHIRE event reason codes (Appendix 2, event=5584) — Rule C8: verbatim ----------
export const REHIRE_EVENT_REASONS = ['RE_REHIRE_LT1', 'RE_REHIRE_GE1'] as const
export type RehireEventReason = typeof REHIRE_EVENT_REASONS[number]

// ---------- TRANSFER event reason codes (Appendix 2, event=5604) — Rule C8: verbatim ----------
export const TRANSFER_EVENT_REASONS = ['TRN_ROTATION', 'TRN_TRNACCOMP', 'TRN_TRNWIC'] as const
export type TransferEventReason = typeof TRANSFER_EVENT_REASONS[number]

// ---------- TERMINATION event reason codes (Appendix 2, event=5597) — Rule C8: verbatim ----------
export const TERMINATION_EVENT_REASONS = [
  'TERM_RETIRE',
  'TERM_DISMISS',
  'TERM_DM',
  'TERM_ENDASSIGN',
  'TERM_EOC',
  'TERM_ERLRETIRE',
  'TERM_LAYOFF',
  'TERM_NOSHOW',
  'TERM_PASSAWAY',
  'TERM_RESIGN',
  'TERM_REORG',
  'TERM_TRANS',
  'TERM_UNSUCPROB',
  'TERM_COVID',
  'TERM_CRISIS',
  'TERM_ABSENT',
  'TERM_REDUNDANCY',
] as const
export type TerminationEventReason = typeof TERMINATION_EVENT_REASONS[number]

// ---------- MockEmployee schema (reuse ใน picker validation) ----------

export const mockEmployeeSchema = z.object({
  externalCode: z.string().min(1),
  firstName: z.object({ th: z.string(), en: z.string() }),
  lastName:  z.object({ th: z.string(), en: z.string() }),
  nationalId: z.string().regex(/^[0-9]{13}$/, 'เลขบัตรประชาชนต้องเป็นตัวเลข 13 หลัก'),
  company: z.string().min(1),
  businessUnit: z.string().min(1),
  position: z.string(),
  hireDate: z.string().min(1),
  status: z.enum(['Active', 'Terminated']),
  lastTermDate: z.string().optional(),
  okToRehire: z.boolean().optional(),
})

// =========================================================
// REHIRE SCHEMA — 7 steps
// =========================================================

// Step 1: เลือกพนักงานเดิม + auto-classify reason
export const rehireStep1Schema = z.object({
  selectedEmployee: mockEmployeeSchema.refine(
    (emp) => emp.okToRehire !== false,
    { message: 'พนักงานนี้ไม่ได้รับอนุญาตให้จ้างใหม่ (OK-to-Rehire = No)' }
  ),
  eventReason: z.enum(REHIRE_EVENT_REASONS, {
    required_error: 'กรุณาเลือก Event Reason (จะถูกกำหนดอัตโนมัติหลังเลือกพนักงาน)',
  }),
})

// Step 2: วันที่เริ่มงานใหม่ + override reason
export const rehireStep2Schema = z.object({
  rehireDate: z
    .string({ required_error: 'กรุณาระบุวันที่เริ่มงานใหม่' })
    .min(1, 'กรุณาระบุวันที่เริ่มงานใหม่'),
})

// Step 3: ข้อมูลประวัติ (scaffold — auto-populate จาก PerPersonal)
export const rehireStep3Schema = z.object({
  dateOfBirth: z.string().min(1, 'กรุณาระบุวันเกิด'),
})

// Step 4: ข้อมูลพนักงาน — Employee Class A-H
export const EMPLOYEE_CLASSES_LIFECYCLE = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const
export const rehireStep4Schema = z.object({
  employeeClass: z.enum(EMPLOYEE_CLASSES_LIFECYCLE, {
    required_error: 'กรุณาเลือก Employee Class',
  }),
})

// Step 5: ที่อยู่
export const rehireStep5Schema = z.object({
  addressLine1: z.string().min(1, 'กรุณาระบุที่อยู่'),
})

// Step 6: ข้อมูลงาน
export const rehireStep6Schema = z.object({
  position: z.string().min(1, 'กรุณาระบุตำแหน่ง'),
  businessUnit: z.string({ required_error: 'กรุณาเลือกหน่วยธุรกิจ' }).min(1),
})

// Step 7: ค่าตอบแทน + Submit
export const rehireStep7Schema = z.object({
  baseSalary: z
    .number({ required_error: 'กรุณาระบุเงินเดือน' })
    .positive('เงินเดือนต้องมากกว่า 0'),
})

// รวม schema ทั้ง 7 steps สำหรับ full-form validation
export const rehireSchema = z.object({
  step1: rehireStep1Schema,
  step2: rehireStep2Schema,
  step3: rehireStep3Schema,
  step4: rehireStep4Schema,
  step5: rehireStep5Schema,
  step6: rehireStep6Schema,
  step7: rehireStep7Schema,
})

export type RehireFormValues = z.infer<typeof rehireSchema>

// =========================================================
// TRANSFER SCHEMA — 6 steps
// =========================================================

// Step 1: เลือกพนักงาน (Active only)
export const transferStep1Schema = z.object({
  selectedEmployee: mockEmployeeSchema.refine(
    (emp) => emp.status === 'Active',
    { message: 'Transfer ได้เฉพาะพนักงานที่มีสถานะ Active' }
  ),
})

// Step 2: ประเภทการย้าย
export const transferStep2Schema = z.object({
  transferReason: z.enum(TRANSFER_EVENT_REASONS, {
    required_error: 'กรุณาเลือกประเภทการย้าย',
  }),
})

// Step 3: วันที่มีผล
export const transferStep3Schema = z.object({
  effectiveDate: z
    .string({ required_error: 'กรุณาระบุวันที่มีผล' })
    .min(1, 'กรุณาระบุวันที่มีผล'),
})

// Step 4: สังกัดใหม่ — discriminated union บน transferReason
// ถ้า TRN_TRNACCOMP → newCompany required; ถ้า ROTATION/TRNWIC → newCompany optional
const transferStep4BaseSchema = z.object({
  businessUnit:  z.string({ required_error: 'กรุณาเลือกหน่วยธุรกิจใหม่' }).min(1),
  department:    z.string().default(''),
  position:      z.string().min(1, 'กรุณาระบุตำแหน่งใหม่'),
  costCenter:    z.string().default(''),
  jobCode:       z.string().default(''),
  location:      z.string().default(''),
})

export const transferStep4AcrossSchema = transferStep4BaseSchema.extend({
  newCompany: z.string({ required_error: 'กรุณาเลือกบริษัทปลายทาง (Transfer across Company)' }).min(1),
})

export const transferStep4WithinSchema = transferStep4BaseSchema.extend({
  newCompany: z.string().optional(),
})

// Step 5: ค่าตอบแทน (carry-over)
export const transferStep5Schema = z.object({
  carryOverCompensation: z.boolean(),
  newBaseSalary: z.number().positive().optional().nullable(),
})

// Step 6: ยืนยัน + Submit (ไม่มี field เพิ่มเติม)
export const transferStep6Schema = z.object({})

// รวม schema ทั้ง 6 steps
export const transferSchema = z.object({
  step1: transferStep1Schema,
  step2: transferStep2Schema,
  step3: transferStep3Schema,
  step4: transferStep4BaseSchema,   // validator ใช้ base; UI เช็ค conditional ผ่าน store
  step5: transferStep5Schema,
  step6: transferStep6Schema,
})

export type TransferFormValues = z.infer<typeof transferSchema>

// =========================================================
// TERMINATE SCHEMA — 5 steps
// =========================================================

// Step 1: เลือกพนักงาน (Active only)
export const terminateStep1Schema = z.object({
  selectedEmployee: mockEmployeeSchema.refine(
    (emp) => emp.status === 'Active',
    { message: 'Terminate ได้เฉพาะพนักงานที่มีสถานะ Active' }
  ),
})

// Step 2: เหตุผลและวันสุดท้าย — ทุก field required (AC-11)
export const terminateStep2Schema = z.object({
  termReason: z.enum(TERMINATION_EVENT_REASONS, {
    required_error: 'กรุณาเลือกเหตุผลการออก',
  }),
  lastDayWorked: z
    .string({ required_error: 'กรุณาระบุวันทำงานวันสุดท้าย' })
    .min(1, 'กรุณาระบุวันทำงานวันสุดท้าย'),
  effectiveEndDate: z
    .string({ required_error: 'กรุณาระบุวันสิ้นสุดการจ้างงาน' })
    .min(1, 'กรุณาระบุวันสิ้นสุดการจ้างงาน'),
})

// Step 3: OK to Rehire + ความเห็นเพิ่มเติม
export const terminateStep3Schema = z.object({
  okToRehire: z.boolean(),
  termComments: z.string().default(''),
})

// Step 4: Approval Chain Preview (scaffold — ไม่มี field จริง)
export const terminateStep4Schema = z.object({})

// Step 5: ยืนยัน + Submit
export const terminateStep5Schema = z.object({})

// รวม schema ทั้ง 5 steps
export const terminateSchema = z.object({
  step1: terminateStep1Schema,
  step2: terminateStep2Schema,
  step3: terminateStep3Schema,
  step4: terminateStep4Schema,
  step5: terminateStep5Schema,
})

export type TerminateFormValues = z.infer<typeof terminateSchema>
