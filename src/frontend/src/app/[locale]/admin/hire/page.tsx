'use client'

// hire/page.tsx — Hire Wizard entry (Option-1 3-step restructure)
// Shell + 3 cluster wrappers. State/validation/persist live in
// useHireWizard store — persist middleware auto-saves draft to
// localStorage on every setStepData call.
// DEF-01: Add confirmation state after successful submit
import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { WizardShell } from '@/components/admin/wizard/WizardShell'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { useHireAudit } from '@/stores/hire-audit'
import { useAuthStore } from '@/stores/auth-store'
import { useRecruitment } from '@/hooks/use-recruitment'
import ClusterWho from './clusters/ClusterWho'
import ClusterJob from './clusters/ClusterJob'
import ClusterReview from './clusters/ClusterReview'

function parseStep(value: string | null): number | null {
  if (value == null) return null
  const n = Number(value)
  return n === 1 || n === 2 || n === 3 ? n : null
}

export default function HirePage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const {
    currentStep,
    maxUnlockedStep,
    lastSavedAt,
    candidateContext,
    freezeCandidateContext,
    goNext,
    goBack,
    jumpTo,
    isStepValid,
    reset,
  } = useHireWizard()
  const { candidates, loading: recruitmentLoading } = useRecruitment()

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
  const paramsString = searchParams.toString()
  const requestedCandidateId = searchParams.get('candidateId')
  const requestedApplicantId = searchParams.get('applicantId') ?? undefined

  const requestedCandidate = useMemo(
    () => candidates.find((candidate) => candidate.id === requestedCandidateId),
    [candidates, requestedCandidateId],
  )

  const makeStepUrl = (step: number) => {
    const params = new URLSearchParams(paramsString)
    params.set('step', String(step))
    const query = params.toString()
    return query ? `${pathname}?${query}` : pathname
  }

  const mirrorStepToUrl = (step: number, mode: 'push' | 'replace' = 'push') => {
    const url = makeStepUrl(step)
    const currentUrl = paramsString ? `${pathname}?${paramsString}` : pathname
    if (url === currentUrl) return
    router[mode](url, { scroll: false })
  }

  useEffect(() => {
    const urlStep = parseStep(searchParams.get('step'))
    if (urlStep == null || urlStep > maxUnlockedStep) {
      mirrorStepToUrl(currentStep, 'replace')
      return
    }
    if (urlStep !== currentStep) {
      jumpTo(urlStep)
    }
  // `searchParams` is intentionally represented as paramsString to avoid
  // object-identity churn from Next navigation mocks and runtime wrappers.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsString, currentStep, maxUnlockedStep, pathname])

  useEffect(() => {
    if (!requestedCandidateId || candidateContext) return
    if (recruitmentLoading && !requestedCandidate) return
    freezeCandidateContext({
      candidateId: requestedCandidateId,
      applicantId: requestedApplicantId,
      source: requestedCandidate?.source ?? 'url',
      displayName: requestedCandidate?.name ?? requestedCandidateId,
      email: requestedCandidate?.email,
      phone: requestedCandidate?.phone,
      position: requestedCandidate?.position,
      initialStatus: requestedCandidate?.status,
      frozenAt: new Date().toISOString(),
    })
  }, [candidateContext, freezeCandidateContext, recruitmentLoading, requestedApplicantId, requestedCandidate, requestedCandidateId])

  const hasCandidateConflict = Boolean(
    candidateContext &&
    requestedCandidateId &&
    (candidateContext.candidateId !== requestedCandidateId ||
      (candidateContext.applicantId ?? '') !== (requestedApplicantId ?? '')),
  )

  const handleBack = () => {
    goBack()
    mirrorStepToUrl(useHireWizard.getState().currentStep)
  }

  const handleNext = () => {
    goNext()
    mirrorStepToUrl(useHireWizard.getState().currentStep)
  }

  const handleStepClick = (step: number) => {
    jumpTo(step)
    mirrorStepToUrl(useHireWizard.getState().currentStep)
  }

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
    router.replace(makeStepUrl(1), { scroll: false })
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
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent text-3xl">✓</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-ink mb-1">บันทึกเรียบร้อย</h2>
            <p className="text-sm text-ink-soft">Employee saved successfully</p>
          </div>
          <div className="humi-card humi-card--cream py-4 px-5 text-left space-y-1">
            <p className="text-xs text-ink-muted uppercase tracking-wide">รหัสพนักงาน / Employee ID</p>
            <p className="text-lg font-mono font-semibold text-ink">{submittedEmployeeId}</p>
            {submittedName && <p className="text-sm text-ink-soft">{submittedName}</p>}
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            <button type="button" onClick={handleAddAnother} className="humi-btn humi-btn--secondary">เพิ่มพนักงานใหม่</button>
            <button type="button" onClick={handleViewEmployee} className="humi-btn humi-btn--primary">ดูรายละเอียดพนักงาน</button>
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
      {candidateContext && (
        <section className="mb-4 humi-card humi-card--cream" aria-label="Frozen candidate context">
          <div className="humi-eyebrow">Candidate snapshot</div>
          <h2 className="mt-1 font-display text-base font-semibold text-ink">
            {candidateContext.displayName}
          </h2>
          <p className="mt-1 text-small text-ink-soft">
            {candidateContext.position ?? 'Manual hire'} · {candidateContext.email ?? candidateContext.candidateId}
          </p>
          <p className="mt-1 text-[11px] text-ink-muted">
            Frozen at {new Date(candidateContext.frozenAt).toLocaleString('th-TH')}
          </p>
        </section>
      )}
      {hasCandidateConflict && (
        <div className="mb-4 rounded border border-warning/30 bg-warning/10 p-3 text-sm text-ink" role="alert">
          URL candidate differs from the frozen hire draft. The existing draft snapshot was not overwritten.
        </div>
      )}
      <WizardShell
        currentStep={currentStep}
        maxUnlockedStep={maxUnlockedStep}
        isCurrentStepValid={isStepValid(currentStep)}
        lastSavedAt={lastSavedAt}
        onStepClick={handleStepClick}
        onBack={handleBack}
        onNext={handleNext}
        onSubmit={handleSubmit}
      >
        {currentStep === 1 && <ClusterWho />}
        {currentStep === 2 && <ClusterJob />}
        {currentStep === 3 && <ClusterReview hrbpError={hrbpError} />}
      </WizardShell>
    </div>
  )
}
