// military-status.ts — Military Status picklist
// Source: BA-EC-SUMMARY.md row 11 Personal Info (Military Status)
import type { PicklistItem } from './index'

export const PICKLIST_MILITARY_STATUS: readonly PicklistItem[] = [
  { id: 'EXEMPTED',    labelTh: 'ได้รับการยกเว้น',     labelEn: 'Exempted',         sortOrder: 1, active: true },
  { id: 'COMPLETED',   labelTh: 'ปลดประจำการแล้ว',     labelEn: 'Completed Service', sortOrder: 2, active: true },
  { id: 'SERVING',     labelTh: 'กำลังรับราชการ',       labelEn: 'Currently Serving', sortOrder: 3, active: true },
  { id: 'DEFERRED',    labelTh: 'ได้รับการผ่อนผัน',     labelEn: 'Deferred',         sortOrder: 4, active: true },
  { id: 'NOT_APPLICABLE', labelTh: 'ไม่เกี่ยวข้อง (เพศหญิง)', labelEn: 'Not Applicable (Female)', sortOrder: 5, active: true },
] as const

export type MilitaryStatusId = 'EXEMPTED' | 'COMPLETED' | 'SERVING' | 'DEFERRED' | 'NOT_APPLICABLE'
