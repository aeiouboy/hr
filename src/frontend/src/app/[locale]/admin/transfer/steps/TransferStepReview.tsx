'use client'

// TransferStepReview.tsx — Transfer Wizard Step 6
// สรุปข้อมูล + Submit mock (AC-13)
// schema: transferStep6Schema (empty — summary only)
import { useLifecycleWizard } from '@/lib/admin/store/useLifecycleWizard'

// Label map สำหรับ transferReason
const TRANSFER_REASON_LABELS: Record<string, string> = {
  TRN_ROTATION:   'Rotation (TRN_ROTATION)',
  TRN_TRNACCOMP:  'Transfer across Company (TRN_TRNACCOMP)',
  TRN_TRNWIC:     'Transfer within Company (TRN_TRNWIC)',
}

// Row helper — แสดงแถว label + value
function ReviewRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="w-44 shrink-0 text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value || '—'}</span>
    </div>
  )
}

export default function TransferStepReview() {
  const { active, reset } = useLifecycleWizard()

  // guard: ต้องอยู่ใน transfer flow
  if (!active || active.flow !== 'transfer') return null

  const { formData } = active
  const emp = formData.step1.selectedEmployee

  // Submit handler (mock) — AC-13
  function handleSubmit() {
    const payload = {
      flow: 'transfer',
      sourceEmployee: emp?.externalCode,
      transferReason: formData.step2.transferReason,
      effectiveDate: formData.step3.effectiveDate,
      newCompany: formData.step4.newCompany,
      businessUnit: formData.step4.businessUnit,
      position: formData.step4.position,
      carryOverCompensation: formData.step5.carryOverCompensation,
      newBaseSalary: formData.step5.newBaseSalary,
    }
    console.log('[Transfer] Mock submit payload:', JSON.stringify(payload, null, 2))
    alert('บันทึกสำเร็จ — Transfer ถูกดำเนินการ (mock)')
    reset()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">ยืนยันและส่งคำขอ (Review & Submit)</h2>
        <p className="text-sm text-gray-500 mt-1">
          ตรวจสอบข้อมูลก่อนส่งคำขอโอนย้ายพนักงาน
        </p>
      </div>

      {/* Summary card */}
      <div className="rounded-md border border-gray-200 bg-gray-50 px-5 py-4 space-y-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">สรุปข้อมูล Transfer</p>

        {/* Step 1 — พนักงาน */}
        <ReviewRow
          label="พนักงาน"
          value={emp ? `${emp.firstName.th} ${emp.lastName.th} (${emp.externalCode})` : null}
        />
        <ReviewRow label="บริษัทเดิม" value={emp?.company} />
        <ReviewRow label="ตำแหน่งเดิม" value={emp?.position} />

        <hr className="border-gray-200" />

        {/* Step 2 — ประเภทการย้าย */}
        <ReviewRow
          label="ประเภทการย้าย"
          value={formData.step2.transferReason
            ? TRANSFER_REASON_LABELS[formData.step2.transferReason] ?? formData.step2.transferReason
            : null}
        />

        {/* Step 3 — วันที่มีผล */}
        <ReviewRow label="วันที่มีผล" value={formData.step3.effectiveDate} />

        <hr className="border-gray-200" />

        {/* Step 4 — สังกัดใหม่ */}
        {formData.step4.newCompany && (
          <ReviewRow label="บริษัทปลายทาง" value={formData.step4.newCompany} />
        )}
        <ReviewRow label="หน่วยธุรกิจใหม่" value={formData.step4.businessUnit} />
        <ReviewRow label="ตำแหน่งใหม่" value={formData.step4.position} />

        <hr className="border-gray-200" />

        {/* Step 5 — ค่าตอบแทน */}
        <ReviewRow
          label="ค่าตอบแทน"
          value={formData.step5.carryOverCompensation
            ? 'Carry over (คงเดิม)'
            : formData.step5.newBaseSalary
              ? `฿${formData.step5.newBaseSalary.toLocaleString('th-TH')}`
              : 'ไม่ระบุ'}
        />
      </div>

      {/* Submit button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white
            hover:bg-blue-700 active:bg-blue-800
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          ยืนยันการโอนย้าย (Submit)
        </button>
      </div>
    </div>
  )
}
