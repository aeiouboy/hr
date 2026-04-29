'use client'

// hire/page.tsx — Hire Wizard entry (Option-1 3-step restructure)
// Shell + 3 cluster wrappers. State/validation/persist live in useHireWizard.
// UX refactor: URL mirrored step navigation + frozen candidate context.
import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { WizardShell } from '@/components/admin/wizard/WizardShell'
import { type HireCandidateContext, useHireWizard } from '@/lib/admin/store/useHireWizard'
import { useHireAudit } from '@/stores/hire-audit'
import { useAuthStore } from '@/stores/auth-store'
import { useRecruitment } from '@/hooks/use-recruitment'
import ClusterWho from './clusters/ClusterWho'
import ClusterJob from './clusters/ClusterJob'
import ClusterReview from './clusters/ClusterReview'

function parseStep(value: string | null): 1 | 2 | 3 | null {
  if (value === '1' || value === '2' || value === '3') return Number(value) as 1 | 2 | 3
  return null
}

export default function HirePage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.toString()
  const candidateId = searchParams.get('candidateId')
  const applicantId = searchParams.get('applicantId') ?? undefined
  const source = searchParams.get('source') ?? undefined
  const {
    currentStep,
    maxUnlockedStep,
    lastSavedAt,
    goNext,
    goBack,
    jumpTo,
    isStepValid,
    reset,
    candidateContext,
    freezeCandidateContext,
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

  const buildStepHref = useCallback((step: number) => {
    const params = new URLSearchParams(search)
    params.set('step', String(step))
    const qs = params.toString()
    return qs ? `${pathname}?${qs}` : pathname
  }, [pathname, search])

  const mirrorStep = useCallback((step: number, mode: 'push' | 'replace' = 'push') => {
    const href = buildStepHref(step)
    if (searchParams.get('step') === String(step)) return
    router[mode](href)
  }, [buildStepHref, router, searchParams])

  useEffect(() => {
    const urlStep = parseStep(searchParams.get('step'))
    const state = useHireWizard.getState()

    if (!urlStep) {
      router.replace(buildStepHref(state.currentStep))
      return
    }

    if (urlStep > state.maxUnlockedStep) {
      router.replace(buildStepHref(state.currentStep))
      return
    }

    if (urlStep !== state.currentStep) {
      state.jumpTo(urlStep)
    }
  }, [buildStepHref, router, searchParams, search])

  const urlCandidateDiffers = useMemo(() => {
    if (!candidateId || !candidateContext) return false
    return candidateContext.candidateId !== candidateId
      || (candidateContext.applicantId ?? '') !== (applicantId ?? '')
  }, [applicantId, candidateContext, candidateId])

  useEffect(() => {
    if (!candidateId || candidateContext || recruitmentLoading) return
    const candidate = candidates.find((item) => item.id === candidateId)
    const contextSource = source ?? candidate?.source
    const snapshot: HireCandidateContext = {
      candidateId,
      ...(applicantId ? { applicantId } : {}),
      ...(contextSource ? { source: contextSource } : {}),
      displayName: candidate?.name ?? candidateId,
      ...(candidate?.email ? { email: candidate.email } : {}),
      ...(candidate?.phone ? { phone: candidate.phone } : {}),
      ...(candidate?.position ? { position: candidate.position } : {}),
      ...(candidate?.status ? { initialStatus: candidate.status } : {}),
      frozenAt: new Date().toISOString(),
    }
    freezeCandidateContext(snapshot)
  }, [applicantId, candidateContext, candidateId, candidates, freezeCandidateContext, recruitmentLoading, source])

  const handleBack = () => {
    goBack()
    mirrorStep(useHireWizard.getState().currentStep)
  }

  const handleNext = () => {
    goNext()
    mirrorStep(useHireWizard.getState().currentStep)
  }

  const handleStepClick = (step: number) => {
    jumpTo(step)
    mirrorStep(useHireWizard.getState().currentStep)
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
    router.replace(buildStepHref(1))
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
        <div className="mx-6 mt-4 rounded-md border border-hairline bg-surface px-4 py-3 text-sm text-ink-soft">
          <div className="humi-eyebrow">Frozen candidate context</div>
          <div className="mt-1 font-medium text-ink">{candidateContext.displayName}</div>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
            <span>Candidate: {candidateContext.candidateId}</span>
            {candidateContext.applicantId && <span>Applicant: {candidateContext.applicantId}</span>}
            {candidateContext.email && <span>{candidateContext.email}</span>}
            {candidateContext.position && <span>{candidateContext.position}</span>}
          </div>
        </div>
      )}
      {urlCandidateDiffers && (
        <div className="mx-6 mt-4 rounded-md border border-warning bg-warning-soft px-4 py-3 text-sm text-ink">
          This draft is frozen for {candidateContext?.candidateId}. The URL requested {candidateId}, so the stored draft context was preserved.
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
