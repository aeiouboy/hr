// classifyRehireReason.ts — pure function สำหรับ classify rehire reason
// จาก lastTermDate gap: gap < 365 days → LT1, gap >= 365 days → GE1
// ไม่มี side effect, ไม่มี DOM dependency — unit-testable in isolation (Rule C3 + AC-15)

export type RehireReasonCode = 'RE_REHIRE_LT1' | 'RE_REHIRE_GE1'

/**
 * classifyRehireReason — คำนวณ event reason จากช่วงเวลา lastTermDate ถึง today
 *
 * @param lastTermDate - วันที่ออกจากงานครั้งล่าสุด (ISO 8601 string หรือ Date)
 * @param today        - วันที่ปัจจุบัน (ISO 8601 string หรือ Date) — inject เพื่อ testability
 * @returns RE_REHIRE_LT1 ถ้า gap < 365 days, RE_REHIRE_GE1 ถ้า gap >= 365 days
 * @throws Error ถ้า lastTermDate อยู่ในอนาคต (มากกว่า today)
 *
 * Boundary: gap = 365 days → GE1 (inclusive on GE1 side ตาม BRD #102 naming)
 */
export function classifyRehireReason(
  lastTermDate: string | Date,
  today: string | Date
): RehireReasonCode {
  // แปลง input เป็น Date object (trim whitespace เพื่อป้องกัน parse error)
  const termDate = lastTermDate instanceof Date
    ? lastTermDate
    : new Date(typeof lastTermDate === 'string' ? lastTermDate.trim() : lastTermDate)

  const todayDate = today instanceof Date
    ? today
    : new Date(typeof today === 'string' ? today.trim() : today)

  // ตรวจสอบ Date parse ถูกต้อง
  if (isNaN(termDate.getTime())) {
    throw new Error(`[classifyRehireReason] lastTermDate ไม่ถูกต้อง: "${String(lastTermDate)}"`)
  }
  if (isNaN(todayDate.getTime())) {
    throw new Error(`[classifyRehireReason] today ไม่ถูกต้อง: "${String(today)}"`)
  }

  // lastTermDate ต้องไม่อยู่ในอนาคต
  if (termDate > todayDate) {
    throw new Error(
      `[classifyRehireReason] lastTermDate (${termDate.toISOString()}) อยู่ในอนาคต — ไม่สามารถคำนวณได้`
    )
  }

  // คำนวณ gap เป็นวัน (milliseconds → days, ปัดทศนิยมลงเพื่อ floor)
  const MS_PER_DAY = 1000 * 60 * 60 * 24
  const gapDays = Math.floor((todayDate.getTime() - termDate.getTime()) / MS_PER_DAY)

  // Boundary: gap >= 365 → GE1 (รวมวันที่ครบ 365 วันพอดี), gap < 365 → LT1
  return gapDays >= 365 ? 'RE_REHIRE_GE1' : 'RE_REHIRE_LT1'
}
