'use client'

// hire/page.tsx — Hire Wizard entry (Option-1 3-step restructure)
// Shell + 3 cluster wrappers. State/validation/persist live in
// useHireWizard store — persist middleware auto-saves draft to
// localStorage on every setStepData call.
import { WizardShell } from '@/components/admin/wizard/WizardShell'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
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

  const handleSubmit = () => {
    // TODO: wire to lifecycle action backend (Part B). For now print + reset.
    console.info('[HirePage] submit', useHireWizard.getState().formData)
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
