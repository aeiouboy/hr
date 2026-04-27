'use client'

// hire/page.tsx — Hire Wizard entry (Option-1 3-step restructure)
// Shell + 3 cluster wrappers. State/validation/persist live in
// useHireWizard store — persist middleware auto-saves draft to
// localStorage on every setStepData call.
// DEF-01: Add confirmation state after successful submit
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { WizardShell } from '@/components/admin/wizard/WizardShell'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { useHireAudit } from '@/stores/hire-audit'
import { useAuthStore } from '@/stores/auth-store'
import ClusterWho from './clusters/ClusterWho'
import ClusterJob from './clusters/ClusterJob'
import ClusterReview from './clusters/ClusterReview'

export default function HirePage() {
  const router = useRouter()
  const {
    currentStep,
    maxUnlockedStep,
    lastSavedAt,
    goNext,
    goBack,
    jumpTo,
    isStepValid,
    reset,
  } = useHireWizard()

  const appendHireAudit = useHireAudit((s) => s.append)
  const hrAdminId = useAuthStore((s) => s.userId) ?? 'ADM001'
  const hrAdminName = useAuthStore((s) => s.username) ?? 'HR Admin'

  // DEF-01: confirmation state after submit
  const [submittedEmployeeId, setSubmittedEmployeeId] = useState<string | null>(null)
  const [submittedName, setSubmittedName] = useState('')
  // DEF-04: HRBP validation error (BRD #109 enforced at submit, not button gate)
  const [hrbpError, setHrbpError] = useState(false)
  // DEF-HYBRID: Strict validation error state for final submit
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = () => {
    const state = useHireWizard.getState()
    const formData = state.formData
    const hrbpAssignee = state.hrbpAssignee

    setSubmitError(null)
    setHrbpError(false)

    // Final strict validation gate (Option C)
    const isS1Valid = state.isStepValid(1, true)
    const isS2Valid = state.isStepValid(2, true)

    if (!isS1Valid || !isS2Valid) {
      setSubmitError('กรุณาตรวจสอบข้อมูลให้ถูกต้องครบถ้วนก่อนบันทึก (Please fix validation errors before saving)')
      return
    }

    // DEF-04: BRD #109 — HRBP must be assigned before submission
    if (!hrbpAssignee) {
      setHrbpError(true)
      return
    }

    // Log SH4 hire notification audit entry (Chain 2 / BRD #109)
    const firstNameTh = formData.biographical?.firstNameLocal?.trim() || formData.identity?.firstNameEn?.trim() || 'พนักงานใหม่'
    const lastNameTh = formData.biographical?.lastNameLocal?.trim() || formData.identity?.lastNameEn?.trim() || ''
    const candidateName = `${firstNameTh} ${lastNameTh}`.trim()
    const position = formData.job?.position?.trim() || 'ไม่ระบุตำแหน่ง'
    const company = formData.identity?.companyCode ?? 'CEN'
    const hireDate = formData.identity?.hireDate ?? new Date().toISOString().slice(0, 10)
    const employeeId = formData.identity?.employeeId || 'EMP-NEW'

    // Resolve selected HRBP email from roster if available
    const hrbpEmail = hrbpAssignee ? `${hrbpAssignee}@humi.test` : 'hrbp@humi.test'

    appendHireAudit({
      candidateName,
      position,
      company: company ?? 'CEN',
      hireDate: hireDate ?? new Date().toISOString().slice(0, 10),
      hrbpEmail,
      hrAdminName,
      hrAdminId,
    })

    // DEF-01: show confirmation instead of silently resetting
    setSubmittedEmployeeId(employeeId)
    setSubmittedName(candidateName)
    reset()
  }

  const handleAddAnother = () => {
    setSubmittedEmployeeId(null)
    setSubmittedName('')
  }

  const handleViewEmployee = () => {
    if (submittedEmployeeId) {
      router.push(`/admin/employees/${submittedEmployeeId}`)
    }
  }

  // DEF-01: show confirmation card after successful submission
  if (submittedEmployeeId) {
    return (
      <div className="h-full flex items-start justify-center pt-16 px-4">
        <div className="humi-card max-w-lg w-full text-center space-y-6 p-8">
          <div className="flex justify-center">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent text-3xl">
              ✓
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-ink mb-1">บันทึกเรียบร้อย</h2>
            <p className="text-sm text-ink-soft">Employee saved successfully</p>
          </div>
          <div className="humi-card humi-card--cream py-4 px-5 text-left space-y-1">
            <p className="text-xs text-ink-muted uppercase tracking-wide">รหัสพนักงาน / Employee ID</p>
            <p className="text-lg font-mono font-semibold text-ink">{submittedEmployeeId}</p>
            {submittedName && (
              <p className="text-sm text-ink-soft">{submittedName}</p>
            )}
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              type="button"
              onClick={handleAddAnother}
              className="humi-btn humi-btn--secondary"
            >
              เพิ่มพนักงานใหม่
            </button>
            <button
              type="button"
              onClick={handleViewEmployee}
              className="humi-btn humi-btn--primary"
            >
              ดูรายละเอียดพนักงาน
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full">
      {submitError && (
        <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded text-error text-sm text-center animate-in fade-in slide-in-from-top-1">
          {submitError}
        </div>
      )}
      <WizardShell
        currentStep={currentStep}
        maxUnlockedStep={maxUnlockedStep}
        isCurrentStepValid={isStepValid(currentStep)}
        lastSavedAt={lastSavedAt}
        onStepClick={jumpTo}
        onBack={goBack}
        onNext={goNext}
        onSubmit={handleSubmit}
      >
        {currentStep === 1 && <ClusterWho />}
        {currentStep === 2 && <ClusterJob />}
        {currentStep === 3 && <ClusterReview hrbpError={hrbpError} />}
      </WizardShell>
    </div>
  )
}
