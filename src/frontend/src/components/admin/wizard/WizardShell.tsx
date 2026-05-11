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
  { number: 1, labelTh: 'ข้อมูลบุคคล',    labelEn: 'ข้อมูลหลัก',    descTh: 'ระบุตัวตน • ชื่อ • บัตรประชาชน • ประวัติ' },
  { number: 2, labelTh: 'ข้อมูลงาน',       labelEn: 'งานและค่าตอบแทน', descTh: 'ประเภทการจ้างงาน • ตำแหน่ง • ค่าตอบแทน' },
  { number: 3, labelTh: 'ตรวจสอบและส่ง',  labelEn: 'ส่งอนุมัติ',     descTh: 'ข้อมูลติดต่อ • ตรวจสอบก่อนส่ง' },
] as const

interface StepItem {
  number: number
  labelTh: string
  labelEn: string
  descTh?: string
}

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
  /** Override step list — defaults to WIZARD_STEPS (Hire) when omitted. */
  steps?: readonly StepItem[] | StepItem[]
  /** Override eyebrow label — defaults to "Hire Workflow". */
  flowEyebrow?: string
  /** Override page title (Thai) — defaults to "เพิ่มพนักงานใหม่". */
  flowTitleTh?: string
  /** aria-label สำหรับ stepper nav — defaults to "ขั้นตอน Hire Wizard". */
  stepperLabel?: string
  /** Optional section-level checkpoint nav rendered below the Stepper in the left aside. */
  sidebarContent?: React.ReactNode
  /** Hide the primary 3-step rail when the caller provides a fuller checkpoint nav. */
  showStepperRail?: boolean
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
  steps = WIZARD_STEPS,
  flowEyebrow = 'ขั้นตอนการจ้างงาน',
  flowTitleTh = 'เพิ่มพนักงานใหม่',
  stepperLabel,
  sidebarContent,
  showStepperRail = true,
}: WizardShellProps) {
  const step = steps[currentStep - 1] ?? steps[0]

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
      <div className="border-b border-hairline bg-surface px-6 py-4 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="humi-eyebrow">{flowEyebrow}</div>
            <h1 className="mt-1 font-display text-[22px] font-semibold leading-tight text-ink">
              {flowTitleTh}
            </h1>
            <p className="mt-1 text-small text-ink-soft">
              ขั้นตอนที่ {currentStep} จาก {steps.length} · {step.labelTh}
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
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <aside className="hidden w-[280px] shrink-0 overflow-y-auto border-r border-hairline bg-canvas-soft px-4 py-5 md:block">
          {showStepperRail && (
            <Stepper
              steps={[...steps]}
              currentStep={currentStep}
              maxUnlockedStep={maxUnlockedStep}
              onStepClick={onStepClick}
              stepperLabel={stepperLabel}
            />
          )}
          {sidebarContent && (
            <>
              {showStepperRail && <div className="my-3 border-t border-hairline" />}
              {sidebarContent}
            </>
          )}
        </aside>

        {/* Mobile progress bar */}
        <div className="w-full border-b border-hairline bg-surface px-4 py-3 md:hidden">
          <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-wide text-ink-muted">
            <span>ขั้นตอน {currentStep}/{steps.length}</span>
            <span className="text-ink">{step.labelTh}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-canvas-soft">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
              role="progressbar"
              aria-valuenow={currentStep}
              aria-valuemin={1}
              aria-valuemax={steps.length}
            />
          </div>
        </div>

        {/* Content — max-width container with generous rhythm */}
        <div className="flex-1 overflow-y-auto bg-canvas">
          <div className="mx-auto w-full max-w-[1120px] px-5 py-6 lg:px-8 lg:py-8">{children}</div>
        </div>
      </div>

      <WizardFooter
        currentStep={currentStep}
        totalSteps={steps.length}
        isCurrentStepValid={isCurrentStepValid}
        onBack={onBack}
        onNext={onNext}
        onSubmit={onSubmit}
      />
    </div>
  )
}
