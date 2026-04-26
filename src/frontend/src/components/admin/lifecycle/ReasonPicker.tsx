'use client'

// ReasonPicker.tsx — Dropdown สำหรับเลือก Event Reason ตาม flow
// filter ด้วย event code prop:
//   '5584' = REHIRE, '5587' = PRCHG (Promotion), '5589' = POSCHG (Acting),
//   '5597' = TERMINATE, '5604' = TRANSFER
// ใช้ข้อมูลจาก FOEventReason.json (Appendix 2, Rule C8: verbatim — ห้าม invent)
// SF source: sf-qas-workflow-2026-04-25.json — jq '.foEventReason[] | select(.event == "5587")'

// Thai labels สำหรับแต่ละ event reason code (Rule C10: Thai-primary)
// ข้อมูล source: Appendix 2 + FOEventReason.json + sf-qas-workflow-2026-04-25.json
const REASON_LABELS: Record<string, string> = {
  // REHIRE (event=5584)
  RE_REHIRE_LT1: 'จ้างใหม่ — ออกไม่เกิน 1 ปี (Rehiring LT 1 year)',
  RE_REHIRE_GE1: 'จ้างใหม่ — ออกเกิน 1 ปี (Rehiring GE 1 year)',
  // PROMOTION / PAY CHANGE (event=5587) — SF foEventReason externalCodes
  // source: jq '.foEventReason[] | select(.event=="5587")' sf-qas-workflow-2026-04-25.json
  PRCHG_PROMO:   'เลื่อนตำแหน่ง (Promotion)',
  PRCHG_MERINC:  'ปรับขึ้นตามผลงาน (Merit Increase)',
  PRCHG_ADJPOS:  'ปรับตำแหน่ง (Adjust Position)',
  PRCHG_SALADJ:  'ปรับเงินเดือน (Salary Adjust)',
  PRCHG_SALCUT:  'ลดเงินเดือน (Salary Cuts)',
  // POSITION CHANGE / ACTING (event=5589) — SF foEventReason externalCode
  // source: jq '.foEventReason[] | select(.event=="5589")' sf-qas-workflow-2026-04-25.json
  POSCHG_POSCHG: 'เปลี่ยนตำแหน่ง / รักษาการ (Position Change)',
  // TRANSFER (event=5604)
  TRN_ROTATION: 'Rotation — สับเปลี่ยนหมุนเวียน',
  TRN_TRNACCOMP: 'โอนย้ายข้ามบริษัท (Transfer across Company)',
  TRN_TRNWIC: 'โอนย้ายภายในบริษัท (Transfer within Company)',
  // TERMINATION (event=5597) — 17 codes verbatim ตาม Appendix 2
  TERM_RETIRE: 'เกษียณอายุ (Retirement)',
  TERM_DISMISS: 'ไล่ออก (Dismissal)',
  TERM_DM: 'ยกเลิกสัญญา DM (Termination DM)',
  TERM_ENDASSIGN: 'สิ้นสุดงานชั่วคราว (End of Temporary Assignment)',
  TERM_EOC: 'สิ้นสุดสัญญา (End of Contract)',
  TERM_ERLRETIRE: 'เกษียณก่อนกำหนด (Early Retirement)',
  TERM_LAYOFF: 'เลิกจ้าง (Layoff)',
  TERM_NOSHOW: 'ขาดงาน ไม่มารายงานตัว (No Show)',
  TERM_PASSAWAY: 'เสียชีวิต (Passed away)',
  TERM_RESIGN: 'ลาออก (Resignation)',
  TERM_REORG: 'ปรับโครงสร้างองค์กร (Reorganization)',
  TERM_TRANS: 'โอนย้ายออกนอกกลุ่ม (Transfer Out)',
  TERM_UNSUCPROB: 'ผ่านทดลองงานไม่ผ่าน (Unsuccessful probation)',
  TERM_COVID: 'สถานการณ์ COVID-19',
  TERM_CRISIS: 'บริหารวิกฤต (Crisis Management)',
  TERM_ABSENT: 'ขาดงานเกินกำหนด (Absent)',
  TERM_REDUNDANCY: 'ลดขนาดองค์กร (Redundancy)',
  // ESS voluntary subset — Ken U2 (4 codes, mode='ess-voluntary' เท่านั้น)
  RESIGN_PERSONAL: 'ลาออกด้วยเหตุส่วนตัว',
  RESIGN_STUDY: 'ลาออกเพื่อศึกษาต่อ',
  RESIGN_FAMILY: 'ลาออกด้วยเหตุครอบครัว',
  RESIGN_OTHER: 'ลาออกด้วยเหตุอื่น',
}

// mapping event code → รายการ reason codes (ตาม Appendix 2 + FOEventReason.json)
const EVENT_REASONS: Record<string, string[]> = {
  '5584': ['RE_REHIRE_LT1', 'RE_REHIRE_GE1'],
  // event 5587 = Pay Change / Promotion — SF source: sf-qas-workflow-2026-04-25.json
  '5587': ['PRCHG_PROMO', 'PRCHG_MERINC', 'PRCHG_ADJPOS', 'PRCHG_SALADJ', 'PRCHG_SALCUT'],
  // event 5589 = Position Change / Acting — SF source: sf-qas-workflow-2026-04-25.json
  '5589': ['POSCHG_POSCHG'],
  '5604': ['TRN_ROTATION', 'TRN_TRNACCOMP', 'TRN_TRNWIC'],
  '5597': [
    'TERM_RETIRE', 'TERM_DISMISS', 'TERM_DM', 'TERM_ENDASSIGN', 'TERM_EOC',
    'TERM_ERLRETIRE', 'TERM_LAYOFF', 'TERM_NOSHOW', 'TERM_PASSAWAY', 'TERM_RESIGN',
    'TERM_REORG', 'TERM_TRANS', 'TERM_UNSUCPROB', 'TERM_COVID', 'TERM_CRISIS',
    'TERM_ABSENT', 'TERM_REDUNDANCY',
  ],
}

// ESS voluntary subset — filter EVENT_REASONS['5597'] to these 4 codes (Ken U2)
const ESS_VOLUNTARY_CODES = ['RESIGN_PERSONAL', 'RESIGN_STUDY', 'RESIGN_FAMILY', 'RESIGN_OTHER'] as const;

interface ReasonPickerProps {
  event: '5584' | '5587' | '5589' | '5597' | '5604'
  value: string | null
  onChange: (code: string) => void
  required?: boolean
  error?: string
  id?: string
  /** mode='ess-voluntary': แสดงเฉพาะ 4 RESIGN_* codes (employee self-service). Default 'admin' = 17 TERM_* codes. */
  mode?: 'admin' | 'ess-voluntary'
}

export function ReasonPicker({
  event,
  value,
  onChange,
  required = false,
  error,
  id = 'reason-picker',
  mode = 'admin',
}: ReasonPickerProps) {
  const allOptions = EVENT_REASONS[event] ?? []
  const options = mode === 'ess-voluntary' && event === '5597'
    ? ESS_VOLUNTARY_CODES
    : allOptions
  const labelId = `${id}-label`

  return (
    <div>
      <label id={labelId} htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        เหตุผล / ประเภทรายการ
        {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
      </label>

      <select
        id={id}
        aria-labelledby={labelId}
        aria-required={required}
        aria-invalid={!!error}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className={[
          'w-full rounded-md border px-3 py-2 text-sm bg-white text-gray-900',
          'focus:outline-none focus:ring-2 focus:ring-blue-500',
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
        ].join(' ')}
      >
        <option value="" disabled>
          — เลือกเหตุผล —
        </option>
        {options.map((code) => (
          <option key={code} value={code}>
            {code} — {REASON_LABELS[code] ?? code}
          </option>
        ))}
      </select>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
