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
import {
  PICKLIST_CORPORATE_TITLE,
  PICKLIST_DIVISION,
  PICKLIST_JOB_FUNCTION,
} from '@hrms/shared/picklists'

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

      {/* Corporate Title — audit A7/#12 — manual (ไม่อยู่ใน PositionCascade) */}
      <fieldset>
        <label htmlFor="corporate-title" className="humi-label">ระดับองค์กร</label>
        <select id="corporate-title" className="humi-select w-full">
          <option value="">— เลือกระดับองค์กร —</option>
          {PICKLIST_CORPORATE_TITLE.filter((c) => c.active).map((c) => (
            <option key={c.id} value={c.id}>{c.labelTh}</option>
          ))}
        </select>
        <p className="mt-1 text-xs text-ink-faint">สำหรับ promotion ladder — ระดับองค์กร ≠ ตำแหน่งงาน</p>
      </fieldset>

      {/* Division — BRD #2 5-tier org cascade (437 SF divisions) — manual */}
      <fieldset>
        <label htmlFor="division" className="humi-label">ส่วนงาน (Division)</label>
        <input
          id="division"
          list="division-options"
          placeholder="พิมพ์หรือเลือก Division"
          className="humi-input w-full"
        />
        <datalist id="division-options">
          {PICKLIST_DIVISION.filter((d) => d.active).slice(0, 100).map((d) => (
            <option key={d.id} value={`${d.id} — ${d.labelEn}`} />
          ))}
        </datalist>
        <p className="mt-1 text-xs text-ink-faint">มี {PICKLIST_DIVISION.length} รายการ — Sprint 2 จะเปลี่ยนเป็น cascade จาก BU</p>
      </fieldset>

      {/* Job Function — BRD #2 + audit A6 (132 SF functions) — manual */}
      <fieldset>
        <label htmlFor="job-function" className="humi-label">ฝ่ายงาน (Function)</label>
        <select id="job-function" className="humi-select w-full">
          <option value="">— เลือกฝ่ายงาน —</option>
          {PICKLIST_JOB_FUNCTION.filter((f) => f.active).map((f) => (
            <option key={f.id} value={f.id}>{f.id} — {f.labelEn}</option>
          ))}
        </select>
        <p className="mt-1 text-xs text-ink-faint">{PICKLIST_JOB_FUNCTION.length} functions — Sprint 2 จะ filter ตาม BU</p>
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
    </div>
  )
}
