// loadEventReasons.ts — โหลด Event Reason สำหรับ HIRE (filter event === '5609')
// ผลลัพธ์ต้องเป็น 6 รายการ ตาม spec Appendix 2

import type { FOEventReasonRaw } from './types'

// EVENT_CODE_HIRE — OData event code สำหรับ Hire (จาก FOEventReason.json)
const EVENT_CODE_HIRE = '5609'

// shape ที่ใช้ใน UI
export interface EventReason {
  code: string        // externalCode
  name: string        // display name
  emplStatus: string  // '5574' = Active, '5581' = Terminated
}

// normalize raw JSON array
function normalizeRaw(raw: unknown): FOEventReasonRaw[] {
  if (Array.isArray(raw)) return raw as FOEventReasonRaw[]
  const obj = raw as Record<string, unknown>
  if (obj?.d && Array.isArray((obj.d as Record<string, unknown>)?.results)) {
    return (obj.d as { results: FOEventReasonRaw[] }).results
  }
  if (Array.isArray(obj?.value)) return obj.value as FOEventReasonRaw[]
  console.warn('[loadEventReasons] ไม่รู้จัก shape ของ FOEventReason.json', raw)
  return []
}

// loadEventReasons — filter เฉพาะ event === '5609' (HIRE codes)
// คืน 6 รายการตาม Appendix 2: H_NEWHIRE, H_RPLMENT, H_TEMPASG, HIREDM, H_CORENTRY, H_INENTRY
export function loadEventReasons(): EventReason[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const raw = require('../../../data/admin/FOEventReason.json') as unknown
  const items = normalizeRaw(raw)

  const hireReasons = items
    .filter((item) => item.event === EVENT_CODE_HIRE && item.status === 'A')
    .map((item) => ({
      code: item.externalCode ?? '',
      name: item.name ?? item.externalCode ?? '',
      emplStatus: item.emplStatus ?? '',
    }))

  // ตรวจสอบผลลัพธ์ — ควรได้ 6 รายการ
  if (hireReasons.length !== 6) {
    console.warn(
      `[loadEventReasons] คาดว่าจะได้ 6 HIRE reasons แต่ได้ ${hireReasons.length} รายการ`,
      hireReasons
    )
  }

  return hireReasons
}
