'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Fingerprint, User2, Phone, AlertCircle, Globe, FileText,
  Users, Briefcase, Building2, Wallet, ClipboardList,
  CheckCircle2,
} from 'lucide-react'
import { useHireWizard, type StepValidity } from '@/lib/admin/store/useHireWizard'
import { cn } from '@/lib/utils'
import {
  shouldShowDependentsSection,
  shouldShowWorkPermitSection,
} from '@/lib/admin/hire/conditional-sections'

interface SectionDef {
  id: string
  validityKey: keyof StepValidity | null
  icon: React.ElementType
  labelTh: string
}

interface StepGroup {
  step: 1 | 2 | 3
  labelTh: string
  sections: SectionDef[]
}

const CHECKPOINT_GROUPS: StepGroup[] = [
  {
    step: 1,
    labelTh: 'ข้อมูลบุคคล',
    sections: [
      { id: 'who.identity',          validityKey: 'identity',          icon: Fingerprint,  labelTh: 'ระบุตัวตน' },
      { id: 'who.biographical',      validityKey: 'biographical',      icon: User2,        labelTh: 'ข้อมูลส่วนตัว' },
      { id: 'who.contact',           validityKey: 'contact',           icon: Phone,        labelTh: 'ข้อมูลติดต่อ' },
      { id: 'who.emergencyContacts', validityKey: 'emergencyContacts', icon: AlertCircle,  labelTh: 'ผู้ติดต่อฉุกเฉิน' },
      { id: 'who.globalInfo',        validityKey: 'globalInfo',        icon: Globe,        labelTh: 'ข้อมูลทั่วไป' },
      { id: 'who.workPermit',        validityKey: 'workPermit',        icon: FileText,     labelTh: 'ใบอนุญาตทำงาน' },
      { id: 'who.dependents',        validityKey: 'dependents',        icon: Users,        labelTh: 'บุคคลในอุปการะ' },
    ],
  },
  {
    step: 2,
    labelTh: 'ข้อมูลงาน',
    sections: [
      { id: 'job.employeeInfo', validityKey: 'employeeInfo', icon: Briefcase, labelTh: 'ประเภทการจ้างงาน' },
      { id: 'job.assignment',   validityKey: 'job',          icon: Building2, labelTh: 'ตำแหน่งและสังกัด' },
      { id: 'job.compensation', validityKey: 'compensation', icon: Wallet,    labelTh: 'ค่าตอบแทน' },
    ],
  },
  {
    step: 3,
    labelTh: 'ตรวจสอบและส่ง',
    sections: [
      { id: 'review.enName', validityKey: null, icon: User2, labelTh: 'ชื่อ-นามสกุลภาษาอังกฤษ' },
      { id: 'review.hrbp', validityKey: null, icon: User2, labelTh: 'อนุมัติโดย Direct Manager + HRBP' },
      { id: 'review.summary', validityKey: null, icon: ClipboardList, labelTh: 'สรุปข้อมูลก่อนส่ง' },
    ],
  },
]

// Retry scroll via rAF until element mounts (handles cross-step navigation where
// the new cluster renders asynchronously after jumpTo triggers a state update).
function tryScroll(sectionId: string, attempts = 0): void {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }
  if (attempts < 10) {
    requestAnimationFrame(() => tryScroll(sectionId, attempts + 1))
  }
}

export function HireCheckpointSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentStep = useHireWizard((s) => s.currentStep)
  const stepValidity = useHireWizard((s) => s.stepValidity)
  const formData = useHireWizard((s) => s.formData)
  const jumpTo = useHireWizard((s) => s.jumpTo)
  const setSectionCollapsed = useHireWizard((s) => s.setSectionCollapsed)

  const mirrorStepToUrl = (step: 1 | 2 | 3) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('step', String(step))
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  const handleSectionClick = (step: 1 | 2 | 3, sectionId: string) => {
    jumpTo(step)
    mirrorStepToUrl(step)
    if (step !== 3) {
      setSectionCollapsed(sectionId, false)
    }
    requestAnimationFrame(() => tryScroll(sectionId))
  }

  return (
    <nav
      aria-label="หัวข้อการกรอกข้อมูล"
      className="mt-4 space-y-4 px-1"
    >
      <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
        หัวข้อย่อย
      </p>

      {CHECKPOINT_GROUPS.map((group) => {
        const isCurrentStep = group.step === currentStep

        return (
          <div key={group.step} className="space-y-1">
            {/* Step group label */}
            <div className="flex items-center gap-2 px-1 py-0.5">
              <span
                className={cn(
                  'flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold',
                  isCurrentStep
                    ? 'bg-accent text-white'
                    : 'bg-accent/20 text-accent',
                )}
              >
                {group.step}
              </span>
              <span
                className={cn(
                  'text-[11px] font-semibold tracking-wide',
                  isCurrentStep ? 'text-accent' : 'text-ink-soft',
                )}
              >
                {group.labelTh}
              </span>
            </div>

            {/* Section items */}
            <div className="ml-3 space-y-1 border-l border-hairline pl-2.5">
              {group.sections.filter((section) => {
                if (section.id === 'who.workPermit') return shouldShowWorkPermitSection(formData)
                if (section.id === 'who.dependents') return shouldShowDependentsSection(formData)
                return true
              }).map((section) => {
                const isValid =
                  section.validityKey != null
                    ? stepValidity[section.validityKey]
                    : undefined
                const Icon = section.icon

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => handleSectionClick(group.step, section.id)}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors',
                      'cursor-pointer text-ink-soft hover:bg-canvas-soft hover:text-ink',
                    )}
                  >
                    <Icon size={11} className="shrink-0 text-ink-muted" aria-hidden />
                    <span className="flex-1 leading-snug">{section.labelTh}</span>
                    {isValid === true && (
                      <CheckCircle2
                        size={11}
                        className="shrink-0 text-success"
                        aria-label="ส่วนนี้ครบถ้วน"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </nav>
  )
}
