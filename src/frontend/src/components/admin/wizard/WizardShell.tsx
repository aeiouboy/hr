'use client'

// WizardShell.tsx — Hire Wizard container (Humi-skinned, 3-step)
//
// Option 1 restructure (2026-04-23): 8 visible steps → 3 clusters.
// formData slice shape unchanged so inner Step*.tsx components
// still dispatch setStepData('identity' | 'name' | ...) as before.
//
// Layout: stepper rail (left, desktop) / mobile progress bar,
// content area centred inside humi-card, draft-chip in header
// so admin sees "บันทึกร่างอัตโนมัติ · HH:MM" at a glance.
import { useEffect, useState } from 'react'
import { Stepper } from './Stepper'
import { WizardFooter } from './WizardFooter'

export const WIZARD_STEPS = [
  { number: 1, labelTh: 'ข้อมูลบุคคล',    labelEn: 'Who',    descTh: 'ระบุตัวตน • ชื่อ • บัตรประชาชน • ประวัติ' },
  { number: 2, labelTh: 'ข้อมูลงาน',       labelEn: 'Job',    descTh: 'Employee Info • ตำแหน่ง • ค่าตอบแทน' },
  { number: 3, labelTh: 'ตรวจสอบและส่ง',  labelEn: 'Review', descTh: 'ข้อมูลติดต่อ • สรุปก่อน Submit' },
] as const

interface WizardShellProps {
  currentStep: number
  maxUnlockedStep: number
  isCurrentStepValid: boolean
  lastSavedAt?: number | null
  onStepClick: (step: number) => void
  onBack: () => void
  onNext: () => void
  onSubmit: () => void
  children: React.ReactNode
}

function formatTime(ts: number): string {
  const d = new Date(ts)
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

export function WizardShell({
  currentStep,
  maxUnlockedStep,
  isCurrentStepValid,
  lastSavedAt,
  onStepClick,
  onBack,
  onNext,
  onSubmit,
  children,
}: WizardShellProps) {
  const step = WIZARD_STEPS[currentStep - 1]

  // Ticks every 30s so "บันทึก X นาทีที่แล้ว" stays fresh without the parent
  // having to re-render on its own timer.
  const [, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header — humi-card style without the card chrome so it reads as page section */}
      <div className="border-b border-hairline bg-canvas-soft px-6 py-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="humi-eyebrow">Hire Workflow</div>
            <h1 className="mt-1 font-display text-[22px] font-semibold leading-tight text-ink">
              เพิ่มพนักงานใหม่
            </h1>
            <p className="mt-1 text-small text-ink-soft">
              ขั้นตอนที่ {currentStep} จาก {WIZARD_STEPS.length} · {step.labelTh}
            </p>
          </div>
          {lastSavedAt != null && (
            <span
              className="humi-draft-chip"
              title={new Date(lastSavedAt).toLocaleString('th-TH')}
              aria-live="polite"
            >
              บันทึกร่างอัตโนมัติ · {formatTime(lastSavedAt)}
            </span>
          )}
        </div>
      </div>

      {/* Body — stepper rail + form scroll area */}
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-64 shrink-0 overflow-y-auto border-r border-hairline bg-surface px-3 py-5 md:block">
          <Stepper
            steps={[...WIZARD_STEPS]}
            currentStep={currentStep}
            maxUnlockedStep={maxUnlockedStep}
            onStepClick={onStepClick}
          />
        </aside>

        {/* Mobile progress bar */}
        <div className="w-full border-b border-hairline bg-surface px-4 py-3 md:hidden">
          <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-wide text-ink-muted">
            <span>ขั้นตอน {currentStep}/{WIZARD_STEPS.length}</span>
            <span className="text-ink">{step.labelTh}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-canvas-soft">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${(currentStep / WIZARD_STEPS.length) * 100}%` }}
              role="progressbar"
              aria-valuenow={currentStep}
              aria-valuemin={1}
              aria-valuemax={WIZARD_STEPS.length}
            />
          </div>
        </div>

        {/* Content — max-width container with generous rhythm */}
        <div className="flex-1 overflow-y-auto bg-canvas">
          <div className="mx-auto max-w-3xl px-6 py-6">{children}</div>
        </div>
      </div>

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
