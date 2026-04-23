// loadCompanies.ts — โหลดข้อมูล company จาก FOCompany.json
// normalize shape: flat array (จาก actual JSON) หรือ d.results wrapper (fallback)
// ตาม spec §10 Risk: "try json.d?.results ?? json.value ?? Array.isArray(json) ? json : []"

import type { FOCompanyRaw } from './types'

// shape ที่ใช้ใน UI — normalize แล้ว
export interface Company {
  code: string        // externalCode
  labelEn: string     // name_localized หรือ name
  labelTh: string     // name_th_TH หรือ name_localized
  country: string     // country code (THA, ฯลฯ)
}

// normalize raw JSON ให้เป็น Company[] ที่ใช้ใน UI
function normalizeRaw(raw: unknown): FOCompanyRaw[] {
  if (Array.isArray(raw)) return raw as FOCompanyRaw[]
  // รองรับ OData wrapper รูปแบบ d.results
  const obj = raw as Record<string, unknown>
  if (obj?.d && Array.isArray((obj.d as Record<string, unknown>)?.results)) {
    return (obj.d as { results: FOCompanyRaw[] }).results
  }
  // รองรับ OData value array
  if (Array.isArray(obj?.value)) return obj.value as FOCompanyRaw[]
  // ถ้าไม่ match รูปแบบไหนเลย — log warning แล้ว return array ว่าง (C6: ห้าม silent catch)
  console.warn('[loadCompanies] ไม่รู้จัก shape ของ FOCompany.json — ตรวจสอบไฟล์', raw)
  return []
}

// loadCompanies — อ่านจาก src/data/FOCompany.json แล้ว return Company[]
export function loadCompanies(): Company[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const raw = require('../../../data/admin/FOCompany.json') as unknown
  const items = normalizeRaw(raw)

  return items.map((item) => ({
    code: item.externalCode ?? '',
    labelEn: item.name_localized ?? item.name ?? item.externalCode ?? '',
    labelTh: item.name_th_TH ?? item.name_localized ?? item.name ?? item.externalCode ?? '',
    country: item.country ?? '',
  }))
}
