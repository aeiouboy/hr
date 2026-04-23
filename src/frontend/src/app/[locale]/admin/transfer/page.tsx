'use client'

// transfer/page.tsx — Transfer Wizard entry point
// 6 ขั้นตอน: เลือกพนักงาน → ประเภทการย้าย → วันที่มีผล → สังกัดใหม่ → ค่าตอบแทน → ยืนยัน
// Wave 3: Steps 4-6 = component impl (TransferStepNewAssignment/Location/Review)
import { useEffect } from 'react'
import { Stepper } from '@/components/admin/wizard/Stepper'
import { WizardFooter } from '@/components/admin/wizard/WizardFooter'
import { useLifecycleWizard, type MockEmployee } from '@/lib/admin/store/useLifecycleWizard'
import { EmployeePicker } from '@/components/admin/lifecycle/EmployeePicker'
import { ReasonPicker } from '@/components/admin/lifecycle/ReasonPicker'
import { EffectiveDatePicker } from '@/components/admin/lifecycle/EffectiveDatePicker'
import TransferStepNewAssignment from './steps/TransferStepNewAssignment'
import TransferStepLocation from './steps/TransferStepLocation'
import TransferStepReview from './steps/TransferStepReview'

// 6 ขั้นตอน Transfer Wizard (PRD §A2 line 107-113 + Step 6 Confirm per Phase 1 pattern)
const TRANSFER_STEPS = [
  { number: 1, labelTh: 'เลือกพนักงาน',    labelEn: 'Employee Lookup' },
  { number: 2, labelTh: 'ประเภทการย้าย',   labelEn: 'Transfer Type' },
  { number: 3, labelTh: 'วันที่มีผล',       labelEn: 'Effective Date' },
  { number: 4, labelTh: 'สังกัดใหม่',       labelEn: 'New Assignment' },
  { number: 5, labelTh: 'ค่าตอบแทน',       labelEn: 'Compensation Carry' },
  { number: 6, labelTh: 'ยืนยัน',           labelEn: 'Confirm & Submit' },
] as const

export default function TransferPage() {
  const { active, setFlow, currentStep, maxUnlockedStep, goNext, goBack, jumpTo, isStepValid, reset } =
    useLifecycleWizard()

  // ตั้ง flow เป็น transfer เมื่อเข้าหน้านี้
  useEffect(() => {
    if (!active || active.flow !== 'transfer') {
      setFlow('transfer')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!active || active.flow !== 'transfer') return null

  const totalSteps = active.maxStep
  const formData = active.formData

  // handlers สำหรับ Step 1 (employee)
  function handleSelectEmployee(emp: MockEmployee) {
    useLifecycleWizard.getState().setStepData('transfer', 1, { selectedEmployee: emp })
  }

  // handler สำหรับ Step 2 (reason)
  function handleReasonChange(code: string) {
    useLifecycleWizard.getState().setStepData('transfer', 2, {
      transferReason: code as 'TRN_ROTATION' | 'TRN_TRNACCOMP' | 'TRN_TRNWIC',
    })
  }

  // handler สำหรับ Step 3 (effective date)
  function handleDateChange(date: string) {
    useLifecycleWizard.getState().setStepData('transfer', 3, { effectiveDate: date })
  }

  // Submit handler (mock) — AC-13
  function handleSubmit() {
    const payload = {
      flow: 'transfer',
      ...formData,
      sourceEmployee: formData.step1.selectedEmployee?.externalCode,
    }
    console.log('[Transfer] Mock submit payload:', payload)
    alert('บันทึกสำเร็จ — Transfer ถูกดำเนินการ (mock)')
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
              <p className="text-sm text-gray-500 mt-1">ค้นหาพนักงาน Active ที่ต้องการโอนย้าย</p>
            </div>
            <EmployeePicker
              id="transfer-employee-picker"
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

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">ประเภทการย้าย</h2>
              <p className="text-sm text-gray-500 mt-1">เลือกประเภทการโอนย้ายสำหรับพนักงาน (AC-7)</p>
            </div>
            <ReasonPicker
              id="transfer-reason-picker"
              event="5604"
              value={formData.step2.transferReason}
              onChange={handleReasonChange}
              required
            />
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">วันที่มีผล</h2>
              <p className="text-sm text-gray-500 mt-1">ระบุวันที่การโอนย้ายมีผลบังคับใช้</p>
            </div>
            <EffectiveDatePicker
              id="transfer-effective-date"
              label="วันที่มีผล (Effective Date)"
              value={formData.step3.effectiveDate}
              onChange={handleDateChange}
              required
            />
          </div>
        )

      case 4: return <TransferStepNewAssignment />
      case 5: return <TransferStepLocation />
      case 6: return <TransferStepReview />
      default: return null
    }
  }

  // validate ทุก step ผ่าน store (checkTransferStepValid ครอบคลุมทุก step แล้ว)
  const isValid = isStepValid(currentStep)

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-semibold text-gray-900">โอนย้ายพนักงาน (Transfer)</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          ขั้นตอน {currentStep} จาก {totalSteps}
        </p>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Stepper sidebar — desktop */}
        <div className="hidden md:flex flex-col w-56 bg-white border-r border-gray-200 overflow-y-auto py-4 px-2">
          <Stepper
            steps={[...TRANSFER_STEPS]}
            currentStep={currentStep}
            maxUnlockedStep={maxUnlockedStep}
            onStepClick={jumpTo}
          />
        </div>

        {/* Mobile progress bar */}
        <div className="md:hidden w-full border-b border-gray-200 bg-white px-4 py-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>ขั้นตอน {currentStep}/{totalSteps}</span>
            <span>{TRANSFER_STEPS[currentStep - 1].labelTh}</span>
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
