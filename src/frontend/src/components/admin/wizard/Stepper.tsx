'use client'

// Stepper.tsx — แสดง visual progress ของ 8 ขั้นตอน Hire Wizard
// รองรับ states: locked / active / complete (AC-3, AC-5)
interface StepItem {
  number: number
  labelTh: string
  labelEn: string
}

interface StepperProps {
  steps: StepItem[]
  currentStep: number
  maxUnlockedStep: number
  onStepClick: (step: number) => void
}

export function Stepper({ steps, currentStep, maxUnlockedStep, onStepClick }: StepperProps) {
  return (
    <nav aria-label="ขั้นตอน Hire Wizard" className="flex flex-col gap-1 w-full">
      <ol className="flex flex-col gap-0.5">
        {steps.map((step) => {
          // คำนวณ state ของแต่ละ step
          const isActive = step.number === currentStep
          const isComplete = step.number < currentStep
          // step unlock ถ้า number <= maxUnlockedStep
          const isUnlocked = step.number <= maxUnlockedStep
          const isDisabled = !isUnlocked

          return (
            <li key={step.number} data-testid="step-item">
              <button
                type="button"
                onClick={() => {
                  // ป้องกัน navigation ไปยัง step ที่ยังล็อคอยู่
                  if (!isDisabled) {
                    onStepClick(step.number)
                  }
                }}
                disabled={isDisabled}
                aria-current={isActive ? 'step' : undefined}
                aria-disabled={isDisabled ? 'true' : undefined}
                className={[
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left text-sm transition-colors',
                  isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                  isActive ? 'bg-blue-50 text-blue-700' : '',
                  isComplete && !isActive ? 'text-green-700' : '',
                  !isActive && !isComplete && !isDisabled ? 'text-gray-600 hover:bg-gray-50' : '',
                ].join(' ')}
              >
                {/* ตัวเลขขั้นตอน หรือ checkmark เมื่อ complete */}
                <span
                  className={[
                    'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold border',
                    isActive ? 'bg-blue-600 text-white border-blue-600' : '',
                    isComplete ? 'bg-green-500 text-white border-green-500' : '',
                    isDisabled ? 'bg-gray-100 text-gray-400 border-gray-200' : '',
                    !isActive && !isComplete && !isDisabled ? 'bg-white text-gray-600 border-gray-300' : '',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  {isComplete ? '✓' : step.number}
                </span>

                {/* label ขั้นตอน — ไทยเป็นหลัก */}
                <span className="flex flex-col min-w-0">
                  <span className="font-medium whitespace-nowrap">{step.labelTh}</span>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{step.labelEn}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
