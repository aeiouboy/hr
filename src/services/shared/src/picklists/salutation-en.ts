// salutation-en.ts — Salutation (English) picklist
// Source: BA-EC-SUMMARY.md row 4 (Salutation EN) + row 1 Personal Info (Salutation Local)
import type { PicklistItem } from './index'

export const PICKLIST_SALUTATION_EN: readonly PicklistItem[] = [
  { id: 'MR',  labelTh: 'นาย',   labelEn: 'Mr.',  sortOrder: 1, active: true },
  { id: 'MRS', labelTh: 'นาง',   labelEn: 'Mrs.', sortOrder: 2, active: true },
  { id: 'MS',  labelTh: 'นางสาว', labelEn: 'Ms.', sortOrder: 3, active: true },
  { id: 'DR',  labelTh: 'ดร.',   labelEn: 'Dr.',  sortOrder: 4, active: true },
] as const

export type SalutationEnId = 'MR' | 'MRS' | 'MS' | 'DR'
