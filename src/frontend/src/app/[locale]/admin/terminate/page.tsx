'use client'

// terminate/page.tsx — Terminate Wizard entry point
// 5 ขั้นตอน: เลือกพนักงาน → เหตุผล+วันสุดท้าย → OK to Rehire → Approval Chain → ยืนยัน
// Wave 3: Step 3 = TerminateStepOkToRehire; Step 5 = inline summary (budget cap)
import { useEffect } from 'react'
import { Stepper } from '@/components/admin/wizard/Stepper'
import { WizardFooter } from '@/components/admin/wizard/WizardFooter'
import { useLifecycleWizard, type MockEmployee } from '@/lib/admin/store/useLifecycleWizard'
import { EmployeePicker } from '@/components/admin/lifecycle/EmployeePicker'
import TerminateStepReason from './steps/TerminateStepReason'
import TerminateStepOkToRehire from './steps/TerminateStepOkToRehire'

// 5 ขั้นตอน Terminate Wizard (PRD §A3 line 156-162 verbatim)
const TERMINATE_STEPS = [
  { number: 1, labelTh: 'เลือกพนักงาน',        labelEn: 'Employee Lookup' },
  { number: 2, labelTh: 'เหตุผลและวันสุดท้าย', labelEn: 'Reason + Last Day' },
  { number: 3, labelTh: 'OK to Rehire',          labelEn: 'OK to Rehire' },
  { number: 4, labelTh: 'Approval Chain',         labelEn: 'Approval Preview' },
  { number: 5, labelTh: 'ยืนยัน',               labelEn: 'Confirm & Submit' },
] as const

// Approval chain preview scaffold (AC-12) — static "Manager → HRBP → SPD"
function ApprovalChainPreview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Approval Chain Preview</h2>
        <p className="text-sm text-gray-500 mt-1">ลำดับการอนุมัติ (static scaffold — Phase 2)</p>
      </div>

      {/* Q2 disclaimer banner — verbatim ตาม AC-12 */}
      <div
        role="alert"
        className="flex items-start gap-3 rounded-md border border-amber-300 bg-amber-50 px-4 py-3"
      >
        <span className="text-amber-500 text-lg leading-none mt-0.5" aria-hidden="true">⚠️</span>
        <p className="text-sm text-amber-800">
          Reason-scope per role (Q2) รอ BA confirm — Phase 2 ใช้ static preview เท่านั้น
        </p>
      </div>

      {/* Approval chain ladder — Manager → HRBP → SPD (BRD #111 PRD line 172-178) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-2">
        {(['Manager', 'HRBP', 'SPD'] as const).map((role, idx, arr) => (
          <div key={role} className="flex items-center gap-2">
            {/* role node */}
            <div
              data-testid={`approval-role-${role}`}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm min-w-[80px] text-center"
            >
              {role}
            </div>
            {/* arrow connector (ยกเว้น node สุดท้าย) */}
            {idx < arr.length - 1 && (
              <span className="text-gray-400 font-bold" aria-hidden="true">→</span>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500">
        * ลำดับการอนุมัติ Phase 2 เป็น static preview เท่านั้น — logic จริงจะถูกกำหนดใน Q2 หลัง BA confirm
      </p>
    </div>
  )
}

// TERM reason label helper (17 codes verbatim from lifecycleSchema)
const TERM_REASON_LABELS: Record<string, string> = {
  TERM_RETIRE: 'เกษียณอายุ (Retire)',
  TERM_DISMISS: 'ไล่ออก (Dismiss)',
  TERM_DM: 'Death/Missing (DM)',
  TERM_ENDASSIGN: 'สิ้นสุดการ Assignment',
  TERM_EOC: 'End of Contract',
  TERM_ERLRETIRE: 'Early Retirement',
  TERM_LAYOFF: 'ถูก Lay Off',
  TERM_NOSHOW: 'ขาดงานไม่มา',
  TERM_PASSAWAY: 'เสียชีวิต',
  TERM_RESIGN: 'ลาออก (Resign)',
  TERM_REORG: 'Reorganization',
  TERM_TRANS: 'โอนย้าย (Transfer)',
  TERM_UNSUCPROB: 'ไม่ผ่านทดลองงาน',
  TERM_COVID: 'COVID-19',
  TERM_CRISIS: 'วิกฤติ (Crisis)',
  TERM_ABSENT: 'ขาดงานเกินกำหนด',
  TERM_REDUNDANCY: 'Redundancy',
}

export default function TerminatePage() {
  const { active, setFlow, currentStep, maxUnlockedStep, goNext, goBack, jumpTo, isStepValid, reset } =
    useLifecycleWizard()

  // ตั้ง flow เป็น terminate เมื่อเข้าหน้านี้
  useEffect(() => {
    if (!active || active.flow !== 'terminate') {
      setFlow('terminate')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!active || active.flow !== 'terminate') return null

  const totalSteps = active.maxStep
  const formData = active.formData

  // handler สำหรับ Step 1 (employee)
  function handleSelectEmployee(emp: MockEmployee) {
    useLifecycleWizard.getState().setStepData('terminate', 1, { selectedEmployee: emp })
  }

  // Submit handler (mock) — AC-13
  function handleSubmit() {
    const payload = {
      flow: 'terminate',
      ...formData,
      sourceEmployee: formData.step1.selectedEmployee?.externalCode,
    }
    console.log('[Terminate] Mock submit payload:', payload)
    alert('บันทึกสำเร็จ — Terminate ถูกดำเนินการ (mock)\n⚠️ EC Document generation out-of-scope Phase 2')
    reset()
  }

  // render step content
  function renderStep() {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">เลือกพนักงาน</h2>
              <p className="text-sm text-gray-500 mt-1">ค้นหาพนักงาน Active ที่ต้องการดำเนินการออกจากงาน</p>
            </div>
            <EmployeePicker
              id="terminate-employee-picker"
              onSelect={handleSelectEmployee}
              filter="Active"
              required
              value={formData.step1.selectedEmployee}
            />
            {formData.step1.selectedEmployee && (
              <div className="rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm">
                <p className="font-medium text-blue-900">
                  {formData.step1.selectedEmployee.firstName.th} {formData.step1.selectedEmployee.lastName.th}
                  {' '}({formData.step1.selectedEmployee.externalCode})
                </p>
                <p className="text-blue-700 mt-0.5">
                  ตำแหน่ง: {formData.step1.selectedEmployee.position}
                  {' '}· บริษัท: {formData.step1.selectedEmployee.company}
                </p>
              </div>
            )}
          </div>
        )
      case 2: return <TerminateStepReason />
      case 3: return <TerminateStepOkToRehire />
      case 4: return <ApprovalChainPreview />
      case 5: return (
        // Step 5: inline summary + Submit (budget cap — ไม่เกิน 8 files)
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">ยืนยันและส่งคำขอ (Confirm & Submit)</h2>
            <p className="text-sm text-gray-500 mt-1">ตรวจสอบข้อมูลก่อนส่งคำขอออกจากงาน</p>
          </div>

          {/* Summary */}
          <div className="rounded-md border border-gray-200 bg-gray-50 px-5 py-4 space-y-2.5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">สรุปข้อมูล Terminate</p>
            {formData.step1.selectedEmployee && (
              <>
                <div className="flex gap-2 text-sm">
                  <span className="w-40 shrink-0 text-gray-500">พนักงาน</span>
                  <span className="font-medium text-gray-800">
                    {formData.step1.selectedEmployee.firstName.th} {formData.step1.selectedEmployee.lastName.th}
                    {' '}({formData.step1.selectedEmployee.externalCode})
                  </span>
                </div>
                <div className="flex gap-2 text-sm">
                  <span className="w-40 shrink-0 text-gray-500">บริษัท</span>
                  <span className="font-medium text-gray-800">{formData.step1.selectedEmployee.company}</span>
                </div>
              </>
            )}
            <hr className="border-gray-200" />
            <div className="flex gap-2 text-sm">
              <span className="w-40 shrink-0 text-gray-500">เหตุผล</span>
              <span className="font-medium text-gray-800">
                {formData.step2.termReason
                  ? (TERM_REASON_LABELS[formData.step2.termReason] ?? formData.step2.termReason)
                  : '—'}
              </span>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="w-40 shrink-0 text-gray-500">วันทำงานสุดท้าย</span>
              <span className="font-medium text-gray-800">{formData.step2.lastDayWorked ?? '—'}</span>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="w-40 shrink-0 text-gray-500">วันสิ้นสุดการจ้าง</span>
              <span className="font-medium text-gray-800">{formData.step2.effectiveEndDate ?? '—'}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex gap-2 text-sm">
              <span className="w-40 shrink-0 text-gray-500">OK to Rehire</span>
              <span className={['font-medium', formData.step3.okToRehire ? 'text-green-700' : 'text-red-700'].join(' ')}>
                {formData.step3.okToRehire ? 'Yes' : 'No'}
              </span>
            </div>
            {formData.step3.termComments && (
              <div className="flex gap-2 text-sm">
                <span className="w-40 shrink-0 text-gray-500">ความเห็น</span>
                <span className="text-gray-800">{formData.step3.termComments}</span>
              </div>
            )}
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button type="button" onClick={handleSubmit}
              className="rounded-md bg-red-600 px-6 py-2.5 text-sm font-semibold text-white
                hover:bg-red-700 active:bg-red-800
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              ยืนยันการออกจากงาน (Submit)
            </button>
          </div>
        </div>
      )
      default: return null
    }
  }

  // validate ทุก step ผ่าน store (checkTerminateStepValid ครอบคลุมทุก step แล้ว)
  const isValid = isStepValid(currentStep)

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-semibold text-gray-900">ออกจากงาน (Terminate)</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          ขั้นตอน {currentStep} จาก {totalSteps}
        </p>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Stepper sidebar — desktop */}
        <div className="hidden md:flex flex-col w-56 bg-white border-r border-gray-200 overflow-y-auto py-4 px-2">
          <Stepper
            steps={[...TERMINATE_STEPS]}
            currentStep={currentStep}
            maxUnlockedStep={maxUnlockedStep}
            onStepClick={jumpTo}
          />
        </div>

        {/* Mobile progress bar */}
        <div className="md:hidden w-full border-b border-gray-200 bg-white px-4 py-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>ขั้นตอน {currentStep}/{totalSteps}</span>
            <span>{TERMINATE_STEPS[currentStep - 1].labelTh}</span>
          </div>
          <div className="mt-1.5 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              role="progressbar"
              aria-valuenow={currentStep}
              aria-valuemin={1}
              aria-valuemax={totalSteps}
            />
          </div>
        </div>

        {/* Form content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">{renderStep()}</div>
        </div>
      </div>

      {/* Footer navigation */}
      <WizardFooter
        currentStep={currentStep}
        totalSteps={totalSteps}
        isCurrentStepValid={isValid}
        onBack={goBack}
        onNext={goNext}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
