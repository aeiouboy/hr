'use client'

// WizardFooter.tsx — ปุ่ม Back / Next / Submit ของ Hire Wizard
// Next disabled ถ้า step ยังไม่ valid (AC-5, AC-7)
interface WizardFooterProps {
  currentStep: number
  totalSteps: number
  isCurrentStepValid: boolean
  onBack: () => void
  onNext: () => void
  onSubmit: () => void
}

export function WizardFooter({
  currentStep,
  totalSteps,
  isCurrentStepValid,
  onBack,
  onNext,
  onSubmit,
}: WizardFooterProps) {
  // Step 1 ไม่มีปุ่ม Back
  const isFirstStep = currentStep === 1
  // Step 8 แสดง Submit แทน Next
  const isLastStep = currentStep === totalSteps

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white">
      {/* ปุ่ม Back */}
      <div>
        {!isFirstStep && (
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            ย้อนกลับ
          </button>
        )}
      </div>

      {/* ปุ่ม Next หรือ Submit */}
      <div>
        {isLastStep ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!isCurrentStepValid}
            className={[
              'px-6 py-2 text-sm font-medium text-white rounded-md transition-colors',
              isCurrentStepValid
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-300 cursor-not-allowed',
            ].join(' ')}
          >
            บันทึก (Submit)
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            disabled={!isCurrentStepValid}
            className={[
              'px-6 py-2 text-sm font-medium text-white rounded-md transition-colors',
              isCurrentStepValid
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-300 cursor-not-allowed',
            ].join(' ')}
          >
            ถัดไป
          </button>
        )}
      </div>
    </div>
  )
}
