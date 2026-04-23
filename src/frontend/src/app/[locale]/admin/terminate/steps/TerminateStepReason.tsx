'use client'

// TerminateStepReason.tsx — Terminate Wizard Step 2
// เหตุผลและวันสุดท้าย: TERM_* reason (17 codes) + Last Day Worked + Effective End Date
// AC-10: 17 TERM codes verbatim, AC-11: ทุก field required
import { useLifecycleWizard } from '@/lib/admin/store/useLifecycleWizard'
import { ReasonPicker } from '@/components/admin/lifecycle/ReasonPicker'
import { EffectiveDatePicker } from '@/components/admin/lifecycle/EffectiveDatePicker'

export default function TerminateStepReason() {
  const { active, setStepData } = useLifecycleWizard()

  // guard: ต้องอยู่ใน terminate flow
  if (!active || active.flow !== 'terminate') return null

  const { termReason, lastDayWorked, effectiveEndDate } = active.formData.step2

  function handleReasonChange(code: string) {
    setStepData('terminate', 2, { termReason: code })
  }

  function handleLastDayChange(date: string) {
    setStepData('terminate', 2, { lastDayWorked: date })
  }

  function handleEndDateChange(date: string) {
    setStepData('terminate', 2, { effectiveEndDate: date })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">เหตุผลและวันสุดท้าย</h2>
        <p className="text-sm text-gray-500 mt-1">
          ระบุเหตุผลการออกจากงานและวันที่ที่เกี่ยวข้อง (ทุก field จำเป็น — AC-11)
        </p>
      </div>

      {/* ReasonPicker — 17 TERM codes (AC-10) */}
      <ReasonPicker
        id="terminate-reason-picker"
        event="5597"
        value={termReason}
        onChange={handleReasonChange}
        required
      />

      {/* Last Day Worked */}
      <EffectiveDatePicker
        id="terminate-last-day"
        label="วันทำงานวันสุดท้าย (Last Day Worked)"
        value={lastDayWorked}
        onChange={handleLastDayChange}
        required
      />

      {/* Effective End Date */}
      <EffectiveDatePicker
        id="terminate-end-date"
        label="วันสิ้นสุดการจ้างงาน (Effective End Date)"
        value={effectiveEndDate}
        onChange={handleEndDateChange}
        required
        minDate={lastDayWorked ?? undefined}
      />

      {/* ข้อมูลช่วยเหลือ */}
      <div className="rounded-md bg-yellow-50 border border-yellow-200 px-4 py-3 text-xs text-yellow-800">
        <strong>หมายเหตุ:</strong> Last Day Worked = วันสุดท้ายที่พนักงานมาทำงาน,
        Effective End Date = วันที่การจ้างงานสิ้นสุดอย่างเป็นทางการ (อาจต่างกันได้)
      </div>
    </div>
  )
}
