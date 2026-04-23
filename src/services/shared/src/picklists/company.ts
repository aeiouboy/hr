// company.ts — Company picklist (Central Group entities)
// Source: BA-EC-SUMMARY.md row 2 (Company)
import type { PicklistItem } from './index'

export const PICKLIST_COMPANY: readonly PicklistItem[] = [
  { id: 'CEN',      labelTh: 'บริษัท เซ็นทรัล จำกัด',                      labelEn: 'Central Co., Ltd.',                sortOrder: 1, active: true },
  { id: 'CRC',      labelTh: 'บริษัท เซ็นทรัล รีเทล คอร์ปอเรชั่น จำกัด',   labelEn: 'Central Retail Corporation',       sortOrder: 2, active: true },
  { id: 'CU',       labelTh: 'บริษัท เซ็นทรัล ยูทิลิตี้ จำกัด',             labelEn: 'Central Utility Co., Ltd.',        sortOrder: 3, active: true },
  { id: 'CPN',      labelTh: 'บริษัท เซ็นทรัลพัฒนา จำกัด (มหาชน)',         labelEn: 'Central Pattana Plc.',             sortOrder: 4, active: true },
  { id: 'ROBINSON', labelTh: 'บริษัท โรบินสัน จำกัด (มหาชน)',               labelEn: 'Robinson Plc.',                    sortOrder: 5, active: true },
] as const

export type CompanyId = 'CEN' | 'CRC' | 'CU' | 'CPN' | 'ROBINSON'
