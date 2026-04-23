// yes-no.ts — YES_NO picklist
// Follows PicklistItem shape from picklists/index.ts (C1: match existing style).
import type { PicklistItem } from './index'

export const PICKLIST_YES_NO: readonly PicklistItem[] = [
  { id: 'YES', labelTh: 'ใช่',    labelEn: 'Yes', sortOrder: 1, active: true },
  { id: 'NO',  labelTh: 'ไม่ใช่', labelEn: 'No',  sortOrder: 2, active: true },
] as const

export type YesNoId = 'YES' | 'NO'
