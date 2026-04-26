'use client'

// hire/page.tsx — Hire Wizard entry (Option-1 3-step restructure)
// Shell + 3 cluster wrappers. State/validation/persist live in
// useHireWizard store — persist middleware auto-saves draft to
// localStorage on every setStepData call.
import { WizardShell } from '@/components/admin/wizard/WizardShell'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { useHireAudit } from '@/stores/hire-audit'
import { useAuthStore } from '@/stores/auth-store'
import ClusterWho from './clusters/ClusterWho'
import ClusterJob from './clusters/ClusterJob'
import ClusterReview from './clusters/ClusterReview'

export default function HirePage() {
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

  const handleSubmit = () => {
    const formData = useHireWizard.getState().formData
    // Log SH4 hire notification audit entry (Chain 2 / BRD #109)
    const firstNameTh = formData.biographical?.firstNameLocal?.trim() || formData.identity?.firstNameEn?.trim() || 'พนักงานใหม่'
    const lastNameTh = formData.biographical?.lastNameLocal?.trim() || formData.identity?.lastNameEn?.trim() || ''
    const candidateName = `${firstNameTh} ${lastNameTh}`.trim()
    const position = formData.job?.position?.trim() || 'ไม่ระบุตำแหน่ง'
    const company = formData.identity?.companyCode ?? 'CEN'
    const hireDate = formData.identity?.hireDate ?? new Date().toISOString().slice(0, 10)
    appendHireAudit({
      candidateName,
      position,
      company: company ?? 'CEN',
      hireDate: hireDate ?? new Date().toISOString().slice(0, 10),
      hrbpEmail: 'hrbp@humi.test',
      hrAdminName,
      hrAdminId,
    })
    reset()
  }

  return (
    <div className="h-full">
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
        {currentStep === 3 && <ClusterReview />}
      </WizardShell>
    </div>
  )
}
