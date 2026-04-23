'use client'

// WizardFooter.tsx — Humi-skinned Back / Next / Submit
// Accent teal primary + outlined secondary. Disabled state uses
// canvas-soft instead of a loud greyed-out button so it blends.
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps

  const primaryClass = cn(
    'inline-flex items-center gap-2 rounded-md px-5 py-2 min-h-[44px] text-body font-semibold transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
    isCurrentStepValid
      ? 'bg-accent text-white shadow-sm hover:shadow-md'
      : 'cursor-not-allowed bg-canvas-soft text-ink-muted',
  )

  return (
    <div className="flex items-center justify-between border-t border-hairline bg-surface px-6 py-4">
      <div>
        {!isFirstStep && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-md border border-hairline bg-surface px-4 py-2 min-h-[44px] text-body font-medium text-ink transition-colors hover:bg-canvas-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]"
          >
            <ArrowLeft size={14} aria-hidden />
            ย้อนกลับ
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        {!isCurrentStepValid && (
          <span className="text-small text-ink-muted" aria-live="polite">
            กรอกข้อมูลที่จำเป็นให้ครบก่อนดำเนินการต่อ
          </span>
        )}
        {isLastStep ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!isCurrentStepValid}
            className={primaryClass}
          >
            <Check size={16} aria-hidden />
            บันทึกและส่ง
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            disabled={!isCurrentStepValid}
            className={primaryClass}
          >
            ถัดไป
            <ArrowRight size={16} aria-hidden />
          </button>
        )}
      </div>
    </div>
  )
}
