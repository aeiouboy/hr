// lib/employee/empStatus.ts — BRD #87
//
// Maps SF emplStatus codes to Humi display values.
// Source: sf-extract/qas-fields-2026-04-26/sf-qas-EmpJob-2026-04-26.json
//   → .d.results[0].emplStatus = "5581" (active employee in QAS)
// SF picklist values (EmpJob.emplStatus):
//   5581 = A (Active)
//   5597 = T (Terminated)
//   5598 = D (Dormant)
//   5599 = L (Leave of absence)
//   5600 = S (Suspended)
// Reference: SF EmpJob API field emplStatus (string code, not label)

export type EmplStatusCode = '5581' | '5597' | '5598' | '5599' | '5600'

/** Thai display labels per SF emplStatus code */
export const EMPL_STATUS_LABEL: Record<EmplStatusCode, string> = {
  '5581': 'ทำงานอยู่',       // Active
  '5597': 'ออกจากงานแล้ว',  // Terminated
  '5598': 'พักงาน',          // Dormant
  '5599': 'ลาหยุดงาน',       // Leave of absence
  '5600': 'ถูกระงับ',        // Suspended
}

/** English status key for Humi status field mapping */
export const EMPL_STATUS_KEY: Record<EmplStatusCode, string> = {
  '5581': 'active',
  '5597': 'terminated',
  '5598': 'inactive',
  '5599': 'inactive',
  '5600': 'inactive',
}

/**
 * Maps SF emplStatus code to Thai display string.
 * Returns the code itself as fallback if unrecognised (graceful degradation).
 */
export function mapEmplStatusCode(code: string): string {
  return EMPL_STATUS_LABEL[code as EmplStatusCode] ?? code
}
