'use client'

// probation/page.tsx — Probation Wizard entry point
//
// Proof-of-reusability: this page is structurally identical to hire/page.tsx
// but uses useProbationWizard (created via createClusterWizard factory) instead
// of useHireWizard. Zero copy-paste of Hire wizard logic.
//
// Route: /[locale]/admin/probation (e.g. /th/admin/probation)
// Store: useProbationWizard — persist key "probation-wizard-draft" (localStorage)
// Steps: 3 clusters (Employee / Assessment / Review)

import { WizardShell } from '@/components/admin/wizard/WizardShell'
import { useProbationWizard, PROBATION_STEPS } from './store'
import ClusterEmployee from './clusters/ClusterEmployee'
import ClusterAssessment from './clusters/ClusterAssessment'
import ClusterReview from './clusters/ClusterReview'

export default function ProbationPage() {
  const {
    currentStep,
    maxUnlockedStep,
    lastSavedAt,
    goNext,
    goBack,
    jumpTo,
    isStepValid,
    reset,
  } = useProbationWizard()

  const handleSubmit = () => {
    // TODO: wire to Probation lifecycle action backend (Phase 1+).
    // For now log + reset (same pattern as hire/page.tsx).
    console.info('[ProbationPage] submit', useProbationWizard.getState().formData)
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
        steps={PROBATION_STEPS}
        flowEyebrow="Probation Workflow"
        flowTitleTh="ทดลองงาน"
      >
        {currentStep === 1 && <ClusterEmployee />}
        {currentStep === 2 && <ClusterAssessment />}
        {currentStep === 3 && <ClusterReview />}
      </WizardShell>
    </div>
  )
}
