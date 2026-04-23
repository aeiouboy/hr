// cronFormat.ts — cron expression helpers สำหรับ Data Management module
// ใช้กับ ScheduledJob.cron field — format เป็น Thai-readable string

// -----------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------

export interface CronParts {
  minute: string
  hour: string
  dayOfMonth: string
  month: string
  dayOfWeek: string
}

// -----------------------------------------------------------------------
// Thai day-of-week mapping
// -----------------------------------------------------------------------

const THAI_DAYS: Record<string, string> = {
  '0': 'อาทิตย์',
  '1': 'จันทร์',
  '2': 'อังคาร',
  '3': 'พุธ',
  '4': 'พฤหัสบดี',
  '5': 'ศุกร์',
  '6': 'เสาร์',
  '7': 'อาทิตย์', // alias 7 = 0
}

const THAI_MONTHS: Record<string, string> = {
  '1': 'ม.ค.',
  '2': 'ก.พ.',
  '3': 'มี.ค.',
  '4': 'เม.ย.',
  '5': 'พ.ค.',
  '6': 'มิ.ย.',
  '7': 'ก.ค.',
  '8': 'ส.ค.',
  '9': 'ก.ย.',
  '10': 'ต.ค.',
  '11': 'พ.ย.',
  '12': 'ธ.ค.',
}

// -----------------------------------------------------------------------
// parseCronParts — แยก cron string เป็น object
// -----------------------------------------------------------------------

/**
 * parseCronParts — แยก cron expression (5-field standard) เป็น object
 *
 * @param cron - cron string เช่น "0 9 * * 1"
 * @returns CronParts หรือ throw ถ้า cron ไม่ valid
 */
export function parseCronParts(cron: string): CronParts {
  const parts = cron.trim().split(/\s+/)
  if (parts.length !== 5) {
    console.warn(`[cronFormat] parseCronParts: cron "${cron}" ไม่ใช่ 5-field standard — ได้ ${parts.length} fields`)
    throw new Error(`cron expression ต้องมี 5 fields แต่ได้ ${parts.length}: "${cron}"`)
  }
  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts
  return { minute, hour, dayOfMonth, month, dayOfWeek }
}

// -----------------------------------------------------------------------
// formatCron — แปลง cron เป็น Thai readable string
// -----------------------------------------------------------------------

/**
 * formatCron — แปลง cron expression เป็นข้อความภาษาไทย
 *
 * รองรับ pattern ที่พบบ่อย:
 * - ทุกวัน: "0 9 * * *" → "ทุกวัน 09:00 น."
 * - รายสัปดาห์: "0 9 * * 1" → "จันทร์ 09:00 น."
 * - รายเดือน: "0 9 1 * *" → "ทุกเดือน วันที่ 1 เวลา 09:00 น."
 * - รายเดือนวันเฉพาะ: "0 9 15 * *" → "ทุกเดือน วันที่ 15 เวลา 09:00 น."
 * - รายปี: "0 9 1 1 *" → "ม.ค. วันที่ 1 เวลา 09:00 น."
 * - Pattern ซับซ้อน: fallback เป็น cron string ดิบ
 */
export function formatCron(cron: string): string {
  let parts: CronParts
  try {
    parts = parseCronParts(cron)
  } catch {
    console.warn(`[cronFormat] formatCron: ไม่สามารถ parse cron "${cron}" — คืนค่า raw`)
    return cron
  }

  const { minute, hour, dayOfMonth, month, dayOfWeek } = parts

  // คำนวณเวลาแสดง (HH:MM)
  const timeStr = buildTimeStr(hour, minute)

  // ---------------------------------------------------------------
  // ตรวจ pattern ตามลำดับ specificity: ปี > เดือน > สัปดาห์ > วัน
  // ---------------------------------------------------------------

  // รายปี: minute hour dayOfMonth MONTH *
  if (month !== '*' && dayOfMonth !== '*' && dayOfWeek === '*') {
    const monthThai = THAI_MONTHS[month] ?? month
    return `${monthThai} วันที่ ${dayOfMonth} เวลา ${timeStr}`
  }

  // รายเดือน: minute hour dayOfMonth * *
  if (dayOfMonth !== '*' && month === '*' && dayOfWeek === '*') {
    return `ทุกเดือน วันที่ ${dayOfMonth} เวลา ${timeStr}`
  }

  // รายสัปดาห์: minute hour * * dayOfWeek
  if (dayOfWeek !== '*' && dayOfMonth === '*') {
    // รองรับ multiple days เช่น "1,3,5"
    if (dayOfWeek.includes(',')) {
      const dayNames = dayOfWeek.split(',').map((d) => THAI_DAYS[d.trim()] ?? d).join('/')
      return `${dayNames} ${timeStr}`
    }
    const dayThai = THAI_DAYS[dayOfWeek] ?? dayOfWeek
    return `${dayThai} ${timeStr}`
  }

  // ทุกวัน: minute hour * * *
  if (dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
    return `ทุกวัน ${timeStr}`
  }

  // fallback — คืนค่า cron ดิบ (pattern ซับซ้อนเกิน)
  console.warn(`[cronFormat] formatCron: cron "${cron}" ไม่ match pattern ที่รองรับ — คืนค่า raw`)
  return cron
}

// -----------------------------------------------------------------------
// Internal helper
// -----------------------------------------------------------------------

/** buildTimeStr — สร้าง "HH:MM น." จาก hour/minute field */
function buildTimeStr(hour: string, minute: string): string {
  // ถ้าเป็น wildcard ให้แสดงตามจริง
  if (hour === '*' || minute === '*') {
    return `${hour}:${minute}`
  }
  const hh = hour.padStart(2, '0')
  const mm = minute.padStart(2, '0')
  return `${hh}:${mm} น.`
}
