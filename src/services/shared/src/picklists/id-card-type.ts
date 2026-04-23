// id-card-type.ts — National ID Card Type picklist
// Source: BA-EC-SUMMARY.md row 13 (National ID Card Type)
// Picklist ID: idType_ID_Card
import type { PicklistItem } from './index'

export const PICKLIST_ID_CARD_TYPE: readonly PicklistItem[] = [
  { id: 'NATIONAL_ID',   labelTh: 'บัตรประชาชน',          labelEn: 'National ID Card',        sortOrder: 1, active: true },
  { id: 'PASSPORT',      labelTh: 'หนังสือเดินทาง',         labelEn: 'Passport',                sortOrder: 2, active: true },
  { id: 'WORK_PERMIT',   labelTh: 'ใบอนุญาตทำงาน',        labelEn: 'Work Permit',             sortOrder: 3, active: true },
  { id: 'ALIEN_ID',      labelTh: 'บัตรประจำตัวคนต่างด้าว', labelEn: 'Alien ID Card',          sortOrder: 4, active: true },
  { id: 'OTHER',         labelTh: 'อื่นๆ',                 labelEn: 'Other',                   sortOrder: 9, active: true },
] as const

export type IdCardTypeId = 'NATIONAL_ID' | 'PASSPORT' | 'WORK_PERMIT' | 'ALIEN_ID' | 'OTHER'
