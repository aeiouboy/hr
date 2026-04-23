'use client'

// hire/page.tsx — Hire Wizard entry point
// Renders WizardShell + routes step components 1-8
// Store: useHireWizard (Zustand) — goNext/goBack/jumpTo/isStepValid/reset
import { WizardShell } from '@/components/admin/wizard/WizardShell'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import StepIdentity from './steps/StepIdentity'
import StepName from './steps/StepName'
import StepBiographical from './steps/StepBiographical'
import StepEmployeeInfo from './steps/StepEmployeeInfo'
import StepNationalId from './steps/StepNationalId'
import StepPersonal from './steps/StepPersonal'
import StepJob from './steps/StepJob'
import StepCompensation from './steps/StepCompensation'

export default function HirePage() {
  const { currentStep, maxUnlockedStep, goNext, goBack, jumpTo, isStepValid } = useHireWizard()

  // Step 8 submit ถูก handle ใน StepCompensation (console.log + toast + reset)
  const handleSubmit = () => undefined

  return (
    <div className="h-full">
      <WizardShell
        currentStep={currentStep}
        maxUnlockedStep={maxUnlockedStep}
        isCurrentStepValid={isStepValid(currentStep)}
        onStepClick={jumpTo}
        onBack={goBack}
        onNext={goNext}
        onSubmit={handleSubmit}
      >
        {currentStep === 1 && <StepIdentity />}
        {currentStep === 2 && <StepName />}
        {currentStep === 3 && <StepBiographical />}
        {currentStep === 4 && <StepEmployeeInfo />}
        {currentStep === 5 && <StepNationalId />}
        {currentStep === 6 && <StepPersonal />}
        {currentStep === 7 && <StepJob />}
        {currentStep === 8 && <StepCompensation />}
      </WizardShell>
    </div>
  )
}
