'use client'

// StepJob.tsx — Step 7: ข้อมูลงาน
// Area B: PositionLookup + cascade (BRD #95) + readonly org chips
// Fields: PositionLookup (required) + storeBranchCode (optional) + hrDistrict (optional)
// Cascade → readonly: businessUnit, branch, job, jobGrade
// Manual (not in PositionCascade): Division, JobFunction, CorporateTitle
import { useState, useEffect, useCallback } from 'react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { stepJobSchema } from '@/lib/admin/validation/hireSchema'
import PositionLookup from '@/components/admin/PositionLookup'
import { MOCK_POSITION_MASTER } from '@/lib/admin/mock/positions'
import type { Position, PositionCascade } from '@/lib/admin/types/position'

// Retail picklists — audit A6/#11 (8 store codes + 5 HR districts)
const STORE_BRANCH_OPTIONS = [
  { value: 'CDS-CTW', label: 'CDS-CTW — CentralWorld' },
  { value: 'CDS-CPN', label: 'CDS-CPN — CPN Pinklao' },
  { value: 'CDS-RMA', label: 'CDS-RMA — CRC Rama 9' },
  { value: 'ROB-CLN', label: 'ROB-CLN — Robinson Chaeng Watthana' },
  { value: 'ROB-RMA', label: 'ROB-RMA — Robinson Rama 9' },
  { value: 'ROB-UPC', label: 'ROB-UPC — Robinson Chiang Mai' },
  { value: 'CDS-PAT', label: 'CDS-PAT — CRC Pattaya' },
  { value: 'ROB-KON', label: 'ROB-KON — Robinson Khon Kaen' },
]

const HR_DISTRICT_OPTIONS = [
  { value: 'D-BKK-1', label: 'D-BKK-1 — กรุงเทพ โซน 1' },
  { value: 'D-BKK-2', label: 'D-BKK-2 — กรุงเทพ โซน 2' },
  { value: 'D-CNX-N', label: 'D-CNX-N — เชียงใหม่ / ภาคเหนือ' },
  { value: 'D-UPC-N', label: 'D-UPC-N — ต่างจังหวัด ภาคเหนือ' },
  { value: 'D-EAS-E', label: 'D-EAS-E — ภาคตะวันออก' },
]

export interface StepJobProps {
  onValidChange?: (isValid: boolean) => void
}

export default function StepJob({ onValidChange }: StepJobProps) {
  const { formData, setStepData } = useHireWizard()
  const job = formData.job

  // Find initial Position object matching stored position code (controlled mode)
  const initialPosition = job.position
    ? MOCK_POSITION_MASTER.find((p) => p.code === job.position) ?? null
    : null
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(initialPosition)

  const [storeBranchCode, setStoreBranchCode] = useState<string>(job.storeBranchCode ?? '')
  const [hrDistrict, setHrDistrict]           = useState<string>(job.hrDistrict ?? '')

  // Time Information state (Area C — SF Image 15)
  const [workSchedule,        setWorkSchedule]        = useState<string>(job.workSchedule ?? '')
  const [holidayTypeCondition,setHolidayTypeCondition]= useState<string>(job.holidayTypeCondition ?? '')
  const [timeManagementStatus,setTimeManagementStatus]= useState<string>(job.timeManagementStatus ?? '')
  const [otFlag,              setOtFlag]              = useState<string>(job.otFlag ?? '')
  const [standardWeeklyHours, setStandardWeeklyHours] = useState<number>(job.standardWeeklyHours ?? 40)
  const [dailyWorkingHours,   setDailyWorkingHours]   = useState<number>(job.dailyWorkingHours ?? 8)
  const [workingDaysPerWeek,  setWorkingDaysPerWeek]  = useState<number>(job.workingDaysPerWeek ?? 5)
  const [fte,                 setFte]                 = useState<number>(job.fte ?? 1)
  const [holidayCalendar,     setHolidayCalendar]     = useState<string>(job.holidayCalendar ?? '')
  const [timeProfile,         setTimeProfile]         = useState<string>(job.timeProfile ?? '')
  const [timeRecordingVariant,setTimeRecordingVariant]= useState<string>(job.timeRecordingVariant ?? '')

  // Compute FTE when standard weekly hours change
  useEffect(() => {
    const computed = standardWeeklyHours > 0 ? standardWeeklyHours / 40 : 0
    setFte(parseFloat(computed.toFixed(2)))
  }, [standardWeeklyHours])

  // Sync Time Information to store
  useEffect(() => {
    setStepData('job', {
      workSchedule,
      holidayTypeCondition,
      timeManagementStatus,
      otFlag,
      standardWeeklyHours,
      dailyWorkingHours,
      workingDaysPerWeek,
      fte,
      holidayCalendar,
      timeProfile,
      timeRecordingVariant,
    })
  }, [workSchedule, holidayTypeCondition, timeManagementStatus, otFlag, standardWeeklyHours,
      dailyWorkingHours, workingDaysPerWeek, fte, holidayCalendar, timeProfile, timeRecordingVariant,
      setStepData])

  const validate = useCallback(
    (positionCode: string, bu: string | null, sbc: string, hrd: string) => {
      const result = stepJobSchema.safeParse({
        position: positionCode || undefined,
        businessUnit: bu || undefined,
      })
      if (result.success) {
        onValidChange?.(true)
      } else {
        onValidChange?.(false)
      }
    },
    [onValidChange],
  )

  useEffect(() => {
    validate(job.position, job.businessUnit, storeBranchCode, hrDistrict)
  }, [job.position, job.businessUnit, storeBranchCode, hrDistrict, validate])

  // ── handleCascade: called by PositionLookup on select/clear ──────────────────
  const handleCascade = useCallback(
    (cascade: PositionCascade | null) => {
      if (!cascade) {
        setSelectedPosition(null)
        setStepData('job', {
          position: '',
          businessUnit: null,
          businessUnitLabel: null,
          branch: null,
          branchLabel: null,
          jobCode: null,
          jobLabel: null,
          jobGrade: null,
          jobGradeLabel: null,
          hrDistrict: null,
        })
        return
      }
      // Resolve full Position object for controlled value prop
      const pos = MOCK_POSITION_MASTER.find((p) => p.code === cascade.code) ?? null
      setSelectedPosition(pos)
      setStepData('job', {
        position: cascade.code,
        businessUnit: cascade.businessUnit,
        businessUnitLabel: cascade.businessUnitLabel,
        branch: cascade.branch ?? null,
        branchLabel: cascade.branchLabel ?? null,
        jobCode: cascade.job,
        jobLabel: cascade.jobLabel,
        jobGrade: cascade.jobGrade,
        jobGradeLabel: cascade.jobGradeLabel,
        hrDistrict: cascade.hrDistrict ?? null,
      })
    },
    [setStepData],
  )

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
      {/* ตำแหน่งงาน — PositionLookup (BRD #95 cascade) */}
      <div className="md:col-span-2">
        <PositionLookup
          id="hire-position-lookup"
          positionMaster={MOCK_POSITION_MASTER}
          value={selectedPosition}
          onSelect={handleCascade}
          required
          label="ตำแหน่งงาน"
        />
      </div>

      {/* หน่วยธุรกิจ — readonly after cascade */}
      <fieldset>
        <label className="humi-label">
          หน่วยธุรกิจ
          <span className="text-xs text-ink-muted ml-1">(จาก Position)</span>
        </label>
        <div className="humi-input w-full bg-canvas-soft text-ink-muted">
          {job.businessUnitLabel || job.businessUnit || '—'}
        </div>
      </fieldset>

      {/* สาขา — readonly after cascade */}
      <fieldset>
        <label className="humi-label">
          สาขา
          <span className="text-xs text-ink-muted ml-1">(จาก Position)</span>
        </label>
        <div className="humi-input w-full bg-canvas-soft text-ink-muted">
          {job.branchLabel || job.branch || '—'}
        </div>
      </fieldset>

      {/* ฝ่ายงาน / Job Family — readonly after cascade */}
      <fieldset>
        <label className="humi-label">
          ฝ่ายงาน
          <span className="text-xs text-ink-muted ml-1">(จาก Position)</span>
        </label>
        <div className="humi-input w-full bg-canvas-soft text-ink-muted">
          {job.jobLabel || job.jobCode || '—'}
        </div>
      </fieldset>

      {/* เกรดงาน — readonly after cascade */}
      <fieldset>
        <label className="humi-label">
          เกรดงาน (JG)
          <span className="text-xs text-ink-muted ml-1">(จาก Position)</span>
        </label>
        <div className="humi-input w-full bg-canvas-soft text-ink-muted">
          {job.jobGradeLabel
            ? `${job.jobGrade} — ${job.jobGradeLabel}`
            : job.jobGrade || '—'}
        </div>
      </fieldset>

      {/* Store / Branch — retail optional — audit A6/#11 — manual (รหัสสาขา retail ≠ branch จาก Position) */}
      <fieldset>
        <label htmlFor="store-branch-code" className="humi-label">สาขา/หน่วยงานค้าปลีก</label>
        <select
          id="store-branch-code"
          value={storeBranchCode}
          onChange={(e) => {
            setStoreBranchCode(e.target.value)
            setStepData('job', { storeBranchCode: e.target.value || null })
          }}
          className="humi-select w-full"
        >
          <option value="">— ไม่ระบุ / ไม่ใช่สาขา —</option>
          {STORE_BRANCH_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </fieldset>

      {/* HR District — retail optional — audit A6/#11 — cascaded from Position หรือ manual override */}
      <fieldset>
        <label htmlFor="hr-district" className="humi-label">เขต HR</label>
        <select
          id="hr-district"
          value={hrDistrict}
          onChange={(e) => {
            setHrDistrict(e.target.value)
            setStepData('job', { hrDistrict: e.target.value || null })
          }}
          className="humi-select w-full"
        >
          <option value="">— ไม่ระบุ / ไม่ใช่สาขา —</option>
          {HR_DISTRICT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </fieldset>

      {/* ── Time Information (Area C — SF Image 15) ────────────────────────── */}
      <fieldset className="md:col-span-2 mt-4 pt-4 border-t border-hairline-soft">
        <legend className="humi-section-legend text-sm font-semibold text-ink mb-3">ข้อมูลเวลาทำงาน</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">

          {/* ตารางการทำงาน */}
          <fieldset>
            <label htmlFor="work-schedule" className="humi-label">
              ตารางการทำงาน<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <select
              id="work-schedule"
              value={workSchedule}
              onChange={(e) => setWorkSchedule(e.target.value)}
              className="humi-select w-full"
            >
              <option value="">— เลือกตาราง —</option>
              <option value="D05H0800">D05H0800 (มาตรฐาน 5 วัน × 8 ชั่วโมง)</option>
              <option value="D06H0700">D06H0700 (6 วัน × 7 ชั่วโมง)</option>
              <option value="D05H0900">D05H0900 (5 วัน × 9 ชั่วโมง)</option>
            </select>
          </fieldset>

          {/* ประเภทวันหยุด */}
          <fieldset>
            <label htmlFor="holiday-type" className="humi-label">
              ประเภทวันหยุด<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <select
              id="holiday-type"
              value={holidayTypeCondition}
              onChange={(e) => setHolidayTypeCondition(e.target.value)}
              className="humi-select w-full"
            >
              <option value="">— เลือก —</option>
              <option value="HO">HO (ปฏิทินสำนักงานใหญ่)</option>
              <option value="STORE">STORE (ปฏิทินสาขา)</option>
              <option value="CALL_CENTER">CALL_CENTER (ปฏิทิน call center)</option>
            </select>
          </fieldset>

          {/* สถานะจัดการเวลา */}
          <fieldset>
            <label htmlFor="time-mgmt-status" className="humi-label">
              สถานะจัดการเวลา<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <select
              id="time-mgmt-status"
              value={timeManagementStatus}
              onChange={(e) => setTimeManagementStatus(e.target.value)}
              className="humi-select w-full"
            >
              <option value="">— เลือก —</option>
              <option value="9">9 — Time Eval (มาตรฐาน)</option>
              <option value="7">7 — PDC</option>
              <option value="0">0 — ไม่มี</option>
            </select>
          </fieldset>

          {/* สถานะ OT */}
          <fieldset>
            <label htmlFor="ot-flag" className="humi-label">
              สถานะ OT<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <select
              id="ot-flag"
              value={otFlag}
              onChange={(e) => setOtFlag(e.target.value)}
              className="humi-select w-full"
            >
              <option value="">— เลือก —</option>
              <option value="YES">ได้รับ OT</option>
              <option value="NO">ไม่ได้รับ OT</option>
            </select>
          </fieldset>

          {/* ชั่วโมงทำงานต่อสัปดาห์ */}
          <fieldset>
            <label htmlFor="weekly-hours" className="humi-label">ชั่วโมงทำงานต่อสัปดาห์</label>
            <input
              id="weekly-hours"
              type="number"
              min={0}
              max={168}
              value={standardWeeklyHours}
              onChange={(e) => setStandardWeeklyHours(Number(e.target.value))}
              className="humi-input w-full"
            />
          </fieldset>

          {/* ชั่วโมงทำงานต่อวัน */}
          <fieldset>
            <label htmlFor="daily-hours" className="humi-label">ชั่วโมงทำงานต่อวัน</label>
            <input
              id="daily-hours"
              type="number"
              min={0}
              max={24}
              value={dailyWorkingHours}
              onChange={(e) => setDailyWorkingHours(Number(e.target.value))}
              className="humi-input w-full"
            />
          </fieldset>

          {/* วันทำงานต่อสัปดาห์ */}
          <fieldset>
            <label htmlFor="work-days" className="humi-label">วันทำงานต่อสัปดาห์</label>
            <input
              id="work-days"
              type="number"
              min={0}
              max={7}
              value={workingDaysPerWeek}
              onChange={(e) => setWorkingDaysPerWeek(Number(e.target.value))}
              className="humi-input w-full"
            />
          </fieldset>

          {/* FTE (computed) */}
          <fieldset>
            <label htmlFor="fte" className="humi-label">
              FTE <span className="text-xs text-ink-muted ml-1">(คำนวณอัตโนมัติ)</span>
            </label>
            <input
              id="fte"
              type="number"
              value={fte}
              readOnly
              className="humi-input w-full bg-canvas-soft"
            />
          </fieldset>

          {/* ปฏิทินวันหยุด */}
          <fieldset>
            <label htmlFor="holiday-cal" className="humi-label">ปฏิทินวันหยุด</label>
            <select
              id="holiday-cal"
              value={holidayCalendar}
              onChange={(e) => setHolidayCalendar(e.target.value)}
              className="humi-select w-full"
            >
              <option value="">— เลือก —</option>
              <option value="TH_PUBLIC">ปฏิทินวันหยุดราชการไทย</option>
              <option value="CG_CORP">ปฏิทิน Central Group Corporate</option>
            </select>
          </fieldset>

          {/* Time Profile */}
          <fieldset>
            <label htmlFor="time-profile" className="humi-label">Time Profile</label>
            <select
              id="time-profile"
              value={timeProfile}
              onChange={(e) => setTimeProfile(e.target.value)}
              className="humi-select w-full"
            >
              <option value="">— เลือก —</option>
              <option value="TP_STD">TP_STD — มาตรฐาน</option>
              <option value="TP_FLEX">TP_FLEX — Flexible</option>
              <option value="TP_SHIFT">TP_SHIFT — กะ</option>
            </select>
          </fieldset>

          {/* รูปแบบการบันทึกเวลา */}
          <fieldset>
            <label htmlFor="time-variant" className="humi-label">รูปแบบการบันทึกเวลา</label>
            <select
              id="time-variant"
              value={timeRecordingVariant}
              onChange={(e) => setTimeRecordingVariant(e.target.value)}
              className="humi-select w-full"
            >
              <option value="">— เลือก —</option>
              <option value="01">01 — ระบบสแกนนิ้ว</option>
              <option value="02">02 — Clock-in app</option>
              <option value="03">03 — Manual</option>
            </select>
          </fieldset>

        </div>
      </fieldset>
    </div>
  )
}
