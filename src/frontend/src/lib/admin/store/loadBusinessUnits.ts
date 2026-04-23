// loadBusinessUnits.ts — โหลดข้อมูล Business Unit จาก FOBusinessUnit.json
// ใช้ใน Step 7 (Job) — 44 options

import type { FOBusinessUnitRaw } from './types'

// shape ที่ใช้ใน UI
export interface BusinessUnit {
  code: string        // externalCode
  labelEn: string     // name_localized หรือ name
  labelTh: string     // name_th_TH หรือ name_localized
}

// normalize raw JSON array
function normalizeRaw(raw: unknown): FOBusinessUnitRaw[] {
  if (Array.isArray(raw)) return raw as FOBusinessUnitRaw[]
  const obj = raw as Record<string, unknown>
  if (obj?.d && Array.isArray((obj.d as Record<string, unknown>)?.results)) {
    return (obj.d as { results: FOBusinessUnitRaw[] }).results
  }
  if (Array.isArray(obj?.value)) return obj.value as FOBusinessUnitRaw[]
  console.warn('[loadBusinessUnits] ไม่รู้จัก shape ของ FOBusinessUnit.json', raw)
  return []
}

export function loadBusinessUnits(): BusinessUnit[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const raw = require('../../../data/admin/FOBusinessUnit.json') as unknown
  const items = normalizeRaw(raw)

  return items.map((item) => ({
    code: item.externalCode ?? '',
    labelEn: item.name_localized ?? item.name ?? item.externalCode ?? '',
    labelTh: item.name_th_TH ?? item.name_localized ?? item.name ?? item.externalCode ?? '',
  }))
}
