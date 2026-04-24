// lifecycleSchema.ts — Zod schemas for employee lookup validation
// Trimmed 2026-04-24 (#56): removed dead aggregate schemas (rehireSchema/transferSchema/terminateSchema)
// + step schemas + event reason enums — none were imported by production pages.
// mockEmployeeSchema retained — used by mockEmployees.test.ts.

import { z } from 'zod'

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
