'use client'

// WizardShell.tsx — Container หลักของ Hire Wizard
// รวม Stepper (ซ้าย) + content area (กลาง) + WizardFooter (ล่าง)
// รองรับ mobile responsive — stepper ซ้อนบนใน mobile (AC-10)
import { Stepper } from './Stepper'
import { WizardFooter } from './WizardFooter'

// 8 ขั้นตอน Hire Wizard ตาม spec §5.2
export const WIZARD_STEPS = [
  { number: 1, labelTh: 'ข้อมูลระบุตัวตน', labelEn: 'Identity' },
  { number: 2, labelTh: 'ชื่อ-นามสกุล',   labelEn: 'Name' },
  { number: 3, labelTh: 'ข้อมูลประวัติ',    labelEn: 'Biographical' },
  { number: 4, labelTh: 'ข้อมูลพนักงาน',   labelEn: 'Employee Info' },
  { number: 5, labelTh: 'เลขบัตรประชาชน',  labelEn: 'National ID' },
  { number: 6, labelTh: 'ข้อมูลส่วนตัว',   labelEn: 'Personal' },
  { number: 7, labelTh: 'ข้อมูลงาน',       labelEn: 'Job' },
  { number: 8, labelTh: 'ค่าตอบแทน',       labelEn: 'Compensation' },
] as const

interface WizardShellProps {
  currentStep: number
  maxUnlockedStep: number
  isCurrentStepValid: boolean
  onStepClick: (step: number) => void
  onBack: () => void
  onNext: () => void
  onSubmit: () => void
  children: React.ReactNode
}

export function WizardShell({
  currentStep,
  maxUnlockedStep,
  isCurrentStepValid,
  onStepClick,
  onBack,
  onNext,
  onSubmit,
  children,
}: WizardShellProps) {
  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header ของ Wizard */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-semibold text-gray-900">เพิ่มพนักงานใหม่</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          ขั้นตอน {currentStep} จาก {WIZARD_STEPS.length}
        </p>
      </div>

      {/* Body — Stepper ซ้าย + content ขวา */}
      <div className="flex flex-1 overflow-hidden">
        {/* Stepper sidebar — hidden บน mobile */}
        <div className="hidden md:flex flex-col w-56 bg-white border-r border-gray-200 overflow-y-auto py-4 px-2">
          <Stepper
            steps={[...WIZARD_STEPS]}
            currentStep={currentStep}
            maxUnlockedStep={maxUnlockedStep}
            onStepClick={onStepClick}
          />
        </div>

        {/* Mobile Stepper — แสดง compact progress bar บน mobile */}
        <div className="md:hidden w-full border-b border-gray-200 bg-white px-4 py-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>ขั้นตอน {currentStep}/{WIZARD_STEPS.length}</span>
            <span>{WIZARD_STEPS[currentStep - 1].labelTh}</span>
          </div>
          <div className="mt-1.5 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{ width: `${(currentStep / WIZARD_STEPS.length) * 100}%` }}
              role="progressbar"
              aria-valuenow={currentStep}
              aria-valuemin={1}
              aria-valuemax={WIZARD_STEPS.length}
            />
          </div>
        </div>

        {/* Form content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>

      {/* Footer navigation */}
      <WizardFooter
        currentStep={currentStep}
        totalSteps={WIZARD_STEPS.length}
        isCurrentStepValid={isCurrentStepValid}
        onBack={onBack}
        onNext={onNext}
        onSubmit={onSubmit}
      />
    </div>
  )
}
