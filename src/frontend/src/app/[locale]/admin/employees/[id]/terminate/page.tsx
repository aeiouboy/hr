// VALIDATION_EXEMPT: B-action factory page — pre-submit gate via actionAvailability + ActionGuardBanner; Zod wire deferred to Sprint 2 lifecycleSchema audit (#47)
'use client'

// terminate/page.tsx — สิ้นสุดสภาพพนักงาน (M2, BRD #111-115)
//
// Archetype B contextual action — mirrors probation/page.tsx (S4 pattern).
// Single-cluster wizard via createClusterWizard factory (D1 reuse).
//
// BRD #111: Submit stub only — real 5-step approval chain (Employee→Manager→HRBP→SPD)
//   deferred to Phase 2.5 backend. UI records intent and updates local state.
// BRD #111: 50ทวิ auto-gen — deferred to Phase 2.5 backend. Note only.
// BRD #113: Role-based reason visibility — Phase 2.5+ RBAC. Stub shows all 5 codes.
//
// C1: touches only this file (placeholder replaced).
// C8: TerminateEvent shape from @hrms/shared — no invented variants.

import { useEffect, useMemo, useState, useCallback } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, UserX, Circle } from 'lucide-react'
import { AttachmentDropzone } from '@/components/admin/AttachmentDropzone/AttachmentDropzone'
import type { AttachedFile } from '@/components/admin/AttachmentDropzone/AttachmentDropzone'
import { ReasonPicker } from '@/components/admin/lifecycle/ReasonPicker'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import { createClusterWizard } from '@/lib/admin/wizard-template/createClusterWizard'
import { ActionGuardBanner } from '@/components/admin/ActionGuardBanner'
import { actionAvailability } from '@/lib/admin/actionAvailability'
import { useTerminationApprovals, TERMINATION_REASON_LABEL } from '@/stores/termination-approvals'
import { useAuthStore } from '@/stores/auth-store'
import { FormField, FormInput } from '@/components/humi'
import {
  TERMINATION_LOGIC,
  TERMINATION_LOGIC_CODES,
  TRANSFER_OUT_COMPANIES,
  TRANSFER_OUT_REASON_CODE,
  NO_SELECTION,
  computeTerminationDate,
} from '@/lib/admin/termination-logic'
import {
  buildTerminationRequestPayload,
  normalizeTerminationReason,
} from '@/lib/termination-request'
import { hasAnyRole } from '@/lib/rbac'
import type { MockEmployee } from '@/mocks/employees'

// ─── Chain progress stepper (BRD #22, #111) ───────────────────────────────────
// HR-admin initiates termination → triggers 4-step approval chain post-submit.
// Chain wiring deferred to Sprint 2 backend. Stepper is informational only.
// Step order: Employee → Manager → HRBP → SPD (BRD #111, SF workflow pattern).

const CHAIN_STEPS = [
  { id: 'employee', labelTh: 'พนักงาน' },
  { id: 'manager',  labelTh: 'Manager' },
  { id: 'hrbp',     labelTh: 'HRBP' },
  { id: 'spd',      labelTh: 'SPD' },
] as const

function ApprovalChainStepper() {
  return (
    <div
      role="status"
      aria-label="ลำดับการอนุมัติ"
      style={{
        background: 'var(--color-accent-soft, #EFF6FF)',
        border: '1.5px solid var(--color-accent, #3B82F6)',
        borderRadius: 10,
        padding: '10px 16px',
      }}
    >
      <div className="humi-eyebrow" style={{ marginBottom: 8, color: 'var(--color-accent)' }}>
        ลำดับการอนุมัติ
      </div>
      <div
        className="humi-row"
        style={{ gap: 0, flexWrap: 'wrap', alignItems: 'center' }}
        aria-label="4 ขั้นตอน: พนักงาน → Manager → HRBP → SPD"
      >
        {CHAIN_STEPS.map((step, i) => (
          <div key={step.id} className="humi-row" style={{ gap: 0, alignItems: 'center' }}>
            <div className="humi-row" style={{ gap: 5, alignItems: 'center', padding: '4px 8px' }}>
              <Circle size={14} aria-hidden style={{ color: 'var(--color-ink-muted)' }} />
              <span className="text-small text-ink-muted">{step.labelTh}</span>
            </div>
            {i < CHAIN_STEPS.length - 1 && (
              <span
                className="text-small text-ink-faint"
                aria-hidden
                style={{ padding: '0 2px' }}
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="text-small text-ink-muted" style={{ marginTop: 6 }}>
        เมื่อบันทึกแล้ว คำขอจะส่งเข้าระบบอนุมัติ 4 ขั้น
      </p>
    </div>
  )
}

// ─── Form shape ───────────────────────────────────────────────────────────────
// Reason codes: use canonical SF Appendix 2 (17 TERM_* codes) via ReasonPicker.
// BRD #113 role-based visibility deferred Phase 2.5+ RBAC.

interface TerminationData {
  /** Resigned Date — required, must be in the future (> today). */
  resignedDate: string | null
  /** Termination date — auto = Resigned Date + 1 day, read-only. */
  terminationDate: string | null
  reasonCode: string
  /** Voluntary/Involuntary — derived from reason, read-only display. */
  voluntary: boolean | null
  /** Reason for termination — sub-LOV; auto-set to default on reason change. */
  reasonForTermination: string
  /** Transfer out to — 'NONE' default; company code only when reason = Transfer Out. */
  transferOutTo: string
  /** OK to Rehire — default from registry; editable; NOT required. */
  okToRehire: boolean | null
  /** Personal Email — required, email format. */
  personalEmail: string
  /** Additional Information (Termination) — free text, not required. */
  additionalInfo: string
  /** Mockup files — real upload deferred. */
  attachmentFiles: AttachedFile[]
}

interface TerminateForm {
  termination: TerminationData
}

const INITIAL_FORM: TerminateForm = {
  termination: {
    resignedDate: null,
    terminationDate: null,
    reasonCode: '',
    voluntary: null,
    reasonForTermination: '',
    transferOutTo: NO_SELECTION,
    okToRehire: null,
    personalEmail: '',
    additionalInfo: '',
    attachmentFiles: [],
  },
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Personal Email source (Q2): MockEmployee has no email field, so auto-fill from
// a single seeded value on mount. The field stays editable + required; if this
// is empty the field renders blank and required-validation still fires.
const SEEDED_PERSONAL_EMAIL = 'personal.email@gmail.com'
const PERSONAL_EMAIL_REMARK =
  'อีเมลนี้ใช้สำหรับรับหนังสือรับรองการทำงาน (Employment Letter), สลิปเงินเดือน (Payslip) และ 50 ทวิ (50BIS) / This email is used to receive the Employment Letter, Payslip and 50BIS.'

// ─── Date helpers ─────────────────────────────────────────────────────────────

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function formatDateTh(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('th-TH', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function calcTenure(hireDateStr: string): string {
  const hire = new Date(hireDateStr)
  const now = new Date()
  let years = now.getFullYear() - hire.getFullYear()
  let months = now.getMonth() - hire.getMonth()
  if (months < 0) { years -= 1; months += 12 }
  if (years === 0) return `${months} เดือน`
  if (months === 0) return `${years} ปี`
  return `${years} ปี ${months} เดือน`
}

// ─── Employee snapshot (readonly) ─────────────────────────────────────────────

function EmployeeSnapshot({ employee }: { employee: MockEmployee }) {
  const nameTh = `${employee.first_name_th} ${employee.last_name_th}`
  const nameEn = `${employee.first_name_en} ${employee.last_name_en}`
  const tenure = calcTenure(employee.hire_date)
  const hireDateFmt = formatDateTh(employee.hire_date)
  const classFmt = employee.status === 'active' ? 'ทำงานอยู่' : 'ออกจากงาน'

  return (
    <div className="humi-card humi-card--cream">
      <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
        {employee.employee_id}
      </div>
      <div className="font-display text-lg font-semibold text-ink">{nameTh}</div>
      <div className="text-small text-ink-muted mb-3">{nameEn}</div>
      <div
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        style={{ marginTop: 8 }}
      >
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>สถานะ</div>
          <div className="text-body font-medium text-ink">{classFmt}</div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ประเภท</div>
          <div className="text-body font-medium text-ink">
            {employee.employee_class === 'PERMANENT' ? 'Permanent' : 'Part-time'}
          </div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>วันที่เริ่มงาน</div>
          <div className="text-body font-medium text-ink">{hireDateFmt}</div>
          <div className="text-small text-ink-muted">{tenure}</div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ตำแหน่ง</div>
          <div className="text-body font-medium text-ink">{employee.position_title}</div>
        </div>
      </div>
    </div>
  )
}

// ─── Confirm terminate dialog ─────────────────────────────────────────────────

interface ConfirmTerminateDialogProps {
  open: boolean
  empId: string
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmTerminateDialog({
  open, empId, onConfirm, onCancel,
}: ConfirmTerminateDialogProps) {
  if (!open) return null
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.35)',
      }}
    >
      <div
        className="humi-card"
        style={{ maxWidth: 420, width: '100%', margin: 16 }}
      >
        <h2
          id="dialog-title"
          className="font-display text-lg font-semibold text-ink"
          style={{ marginBottom: 8 }}
        >
          ยืนยันส่งคำขอสิ้นสุดสภาพ?
        </h2>
        <p className="text-body text-ink-muted" style={{ marginBottom: 8 }}>
          ส่งคำขอสิ้นสุดสภาพพนักงาน <strong className="text-ink">{empId}</strong> เข้าสู่การอนุมัติ?
        </p>
        <p className="text-small text-ink-muted" style={{ marginBottom: 20 }}>
          พนักงานจะยังไม่ถูกปรับสถานะเป็นสิ้นสุดสภาพจนกว่าคำขอได้รับอนุมัติครบขั้น
        </p>
        <div className="humi-row" style={{ gap: 10, justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            className="humi-btn humi-btn--ghost"
          >
            ยกเลิก
          </button>
          <button
            onClick={onConfirm}
            className="humi-btn humi-btn--danger"
          >
            ยืนยัน ส่งคำขออนุมัติ
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function TerminatePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const empId = params.id as string
  const locale = params.locale as string
  const editRequestId = searchParams.get('edit')

  const employee = useEmployees((s) => s.getById(empId)) ?? null
  const actorId = useAuthStore((s) => s.userId) ?? 'admin-current'
  const actorName = useAuthStore((s) => s.username) ?? 'HR Admin'
  const actorRoles = useAuthStore((s) => s.roles)
  const actorRole = hasAnyRole(actorRoles, ['hrbp', 'spd', 'hr_admin', 'hr_manager'])
    ? 'hr'
    : 'manager'

  // ── Resignation cross-reference: show banner if approved ESS resignation exists ──
  const resignationRequests = useTerminationApprovals((s) => s.requests)
  const editRequest = editRequestId
    ? resignationRequests.find((r) => r.id === editRequestId)
    : undefined
  const approvedResignation = resignationRequests.find(
    (r) => r.employeeId === empId && r.status === 'approved',
  )
  const pendingResignation = resignationRequests.find(
    (r) => r.employeeId === empId && (r.status === 'pending_manager' || r.status === 'pending_spd'),
  )

  // ── Factory: per-employee wizard instance (Archetype B, D1 reuse) ─────────
  // Memoized — createClusterWizard creates a Zustand store internally;
  // must NOT be called on every render.
  const terminateWizard = useMemo(() => {
    if (!employee) return null
    return createClusterWizard<TerminateForm>({
      name: 'terminate',
      storeKey: `terminate-wizard-draft-${empId}`,
      initialFormData: INITIAL_FORM,
      clusterSteps: [
        { number: 1, labelTh: 'สิ้นสุดสภาพพนักงาน', labelEn: 'Termination' },
      ],
      validators: {
        1: (d) =>
          !!d.termination.resignedDate &&
          !!d.termination.reasonCode &&
          !!d.termination.reasonForTermination &&
          !!d.termination.transferOutTo &&
          !!d.termination.personalEmail,
      },
      employeeId: empId,
      preloadedEmployee: {},
    })
  }, [empId, employee])

  const useStore = terminateWizard?.useStore
  const formData = useStore?.((s) => s.formData) ?? INITIAL_FORM
  const setStepData = useStore?.((s) => s.setStepData)
  const reset = useStore?.((s) => s.reset)

  const termination = formData.termination
  const today = todayISO()
  // Resigned Date must be in the future → earliest selectable is tomorrow.
  const resignedMin = computeTerminationDate(today)

  // ── Validation (BA "Termination" sheet) ─────────────────────────────────────
  //   - resignedDate: required, must be in the future (> today)
  //   - terminationDate: auto = resignedDate + 1 day (always valid once resignedDate set)
  //   - reasonCode: required
  //   - reasonForTermination: required
  //   - transferOutTo: required; if reason = Transfer Out, must pick a real company
  //   - personalEmail: required + valid email format
  //   - okToRehire: NOT required
  const resignedDateValid =
    !!termination.resignedDate && termination.resignedDate > today

  const isTransferOut = termination.reasonCode === TRANSFER_OUT_REASON_CODE
  const transferOutValid = isTransferOut
    ? termination.transferOutTo !== NO_SELECTION && !!termination.transferOutTo
    : !!termination.transferOutTo

  const personalEmailValid =
    !!termination.personalEmail && EMAIL_RE.test(termination.personalEmail)

  const isValid =
    resignedDateValid &&
    !!termination.reasonCode &&
    !!termination.reasonForTermination &&
    transferOutValid &&
    personalEmailValid

  // ── State ──────────────────────────────────────────────────────────────────
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [hydratedEditId, setHydratedEditId] = useState<string | null>(null)

  // Auto-fill Personal Email from the seeded source on mount (Q2 default).
  // Field stays editable + required; only fills when currently blank so manual
  // edits aren't clobbered on re-render.
  useEffect(() => {
    if (!employee || !setStepData) return
    if (editRequest) return
    if (!termination.personalEmail && SEEDED_PERSONAL_EMAIL) {
      setStepData('termination', { personalEmail: SEEDED_PERSONAL_EMAIL })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee, setStepData, editRequest])

  useEffect(() => {
    if (!employee || !setStepData || !editRequest || hydratedEditId === editRequest.id) return
    const reasonCode = normalizeTerminationReason(editRequest.reasonCode)
    const entry = TERMINATION_LOGIC[reasonCode]
    setStepData('termination', {
      resignedDate: editRequest.requestedLastDay,
      terminationDate: editRequest.terminationDate ?? computeTerminationDate(editRequest.requestedLastDay),
      reasonCode,
      voluntary: editRequest.voluntary
        ? editRequest.voluntary === 'voluntary'
        : entry.voluntary,
      reasonForTermination: editRequest.reasonForTermination ?? entry.reasonForTermination.default,
      transferOutTo: editRequest.transferOutTo ?? entry.transferOutDefault,
      okToRehire: editRequest.okToRehire ?? entry.okToRehireDefault,
      personalEmail: editRequest.personalEmail ?? SEEDED_PERSONAL_EMAIL,
      additionalInfo: editRequest.additionalInfo ?? editRequest.reasonText ?? '',
      attachmentFiles: editRequest.attachments ?? [],
    })
    setHydratedEditId(editRequest.id)
  }, [editRequest, employee, hydratedEditId, setStepData])

  // ── Patch handler ──────────────────────────────────────────────────────────
  const patch = useCallback(
    (partial: Partial<TerminationData>) => {
      setStepData?.('termination', partial)
    },
    [setStepData],
  )

  // Resigned Date change → auto-compute Termination date (= resigned + 1 day, read-only)
  const handleResignedDateChange = useCallback(
    (value: string) => {
      patch({
        resignedDate: value || null,
        terminationDate: value ? computeTerminationDate(value) : null,
      })
    },
    [patch],
  )

  // Reason change → auto-populate derived fields (all editable except voluntary display)
  const handleReasonChange = useCallback(
    (code: string) => {
      const entry = TERMINATION_LOGIC[code]
      if (!entry) {
        patch({ reasonCode: code })
        return
      }
      patch({
        reasonCode: code,
        voluntary: entry.voluntary,
        reasonForTermination: entry.reasonForTermination.default,
        transferOutTo: entry.transferOutDefault,
        okToRehire: entry.okToRehireDefault,
      })
    },
    [patch],
  )

  const activeEntry = termination.reasonCode
    ? TERMINATION_LOGIC[termination.reasonCode]
    : undefined
  const isTransferOutReason = termination.reasonCode === TRANSFER_OUT_REASON_CODE

  // ── Submit logic ───────────────────────────────────────────────────────────
  const submitApprovalRequest = useCallback(() => {
    if (!employee || !isValid) return

    const payload = buildTerminationRequestPayload({
      employeeId: empId,
      employeeName: `${employee.first_name_th} ${employee.last_name_th}`,
      requestedLastDay: termination.resignedDate ?? '',
      reasonCode: termination.reasonCode,
      reasonForTermination: termination.reasonForTermination,
      transferOutTo: isTransferOutReason && termination.transferOutTo !== NO_SELECTION
        ? termination.transferOutTo
        : undefined,
      okToRehire: termination.okToRehire ?? undefined,
      additionalInfo: termination.additionalInfo,
      personalEmail: termination.personalEmail,
      attachments: termination.attachmentFiles,
    }, {
      id: actorId,
      name: actorName,
      role: actorRole,
      sourceRoute: 'admin',
    })

    const store = useTerminationApprovals.getState()
    if (editRequestId) {
      store.updateRequest(editRequestId, payload)
      store.resubmit(editRequestId)
    } else {
      store.addRequest(payload)
    }
    reset?.()
    setSubmitted(true)
  }, [
    employee,
    isValid,
    termination,
    isTransferOutReason,
    empId,
    actorId,
    actorName,
    actorRole,
    editRequestId,
    reset,
  ])

  const handleSubmit = useCallback(() => {
    if (!isValid) return
    setShowConfirmDialog(true)
  }, [isValid])

  // ── Not found ──────────────────────────────────────────────────────────────
  if (!employee) {
    return (
      <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <Link
            href={`/${locale}/admin/employees`}
            className="humi-row text-body text-ink-muted hover:text-accent transition-colors"
            style={{ display: 'inline-flex', gap: 6 }}
          >
            <ArrowLeft size={16} aria-hidden />
            <span>รายการพนักงาน</span>
          </Link>
        </div>
        <div className="humi-card" style={{ textAlign: 'center', padding: 40 }}>
          <p className="text-body text-ink-muted">ไม่พบพนักงานรหัส &ldquo;{empId}&rdquo;</p>
        </div>
      </div>
    )
  }

  // Defense-in-depth (P3)
  const guard = actionAvailability(employee).terminate
  if (!guard.ok) {
    return (
      <ActionGuardBanner
        actionKey="terminate"
        reason={guard.reason ?? ''}
        backHref={`/${locale}/admin/employees/${empId}`}
        actionLabel="สิ้นสุดการจ้างงาน"
      />
    )
  }

  return (
    <>
      <ConfirmTerminateDialog
        open={showConfirmDialog}
        empId={employee.employee_id}
        onConfirm={() => { setShowConfirmDialog(false); submitApprovalRequest() }}
        onCancel={() => setShowConfirmDialog(false)}
      />

      <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Back nav */}
        <div>
          <Link
            href={`/${locale}/admin/employees/${empId}`}
            className="humi-row text-body text-ink-muted hover:text-accent transition-colors"
            style={{ display: 'inline-flex', gap: 6 }}
          >
            <ArrowLeft size={16} aria-hidden />
            <span>กลับไปหน้าข้อมูลพนักงาน</span>
          </Link>
        </div>

        {/* Page title */}
        <div className="humi-row" style={{ gap: 10, alignItems: 'center' }}>
          <div
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'var(--color-danger-soft)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, color: 'var(--color-danger)',
            }}
          >
            <UserX size={18} aria-hidden />
          </div>
          <div>
            <div className="humi-eyebrow">การดำเนินการ</div>
            <h1 className="font-display text-xl font-semibold text-ink">
              สิ้นสุดสภาพพนักงาน
            </h1>
          </div>
        </div>

        {/* Employee snapshot */}
        <EmployeeSnapshot employee={employee} />

        {/* Resignation cross-reference: approved or pending ESS resignation */}
        {approvedResignation && (
          <div className="humi-card humi-card--success" style={{ padding: '12px 16px' }}>
            <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
              จากคำขอลาออก ESS
            </div>
            <div className="text-small text-ink">
              รหัสคำขอ <strong>{approvedResignation.id}</strong>
              {' — '}อนุมัติแล้ว วันสุดท้าย{' '}
              {new Date(approvedResignation.requestedLastDay).toLocaleDateString('th-TH', {
                year: 'numeric', month: 'short', day: 'numeric',
              })}
              {' — '}เหตุผล: {TERMINATION_REASON_LABEL[approvedResignation.reasonCode]}
            </div>
          </div>
        )}
        {pendingResignation && !approvedResignation && (
          <div className="humi-card humi-card--info" style={{ padding: '12px 16px' }}>
            <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
              มีคำขอลาออก ESS ที่รออนุมัติ
            </div>
            <div className="text-small text-ink">
              รหัสคำขอ <strong>{pendingResignation.id}</strong>
              {' — '}
              {pendingResignation.status === 'pending_manager'
                ? 'รอ Manager อนุมัติ'
                : 'รอ SPD อนุมัติ'}
              {' — '}วันสุดท้ายที่ขอ:{' '}
              {new Date(pendingResignation.requestedLastDay).toLocaleDateString('th-TH', {
                year: 'numeric', month: 'short', day: 'numeric',
              })}
            </div>
          </div>
        )}

        {/* BRD #22, #111 — 4-step approval chain stepper (informational) */}
        <ApprovalChainStepper />

        {submitted && (
          <div className="humi-card humi-card--success" style={{ padding: '12px 16px' }}>
            <div className="font-display text-body font-semibold text-ink">
              ส่งคำขอเข้าสู่การอนุมัติแล้ว / Request submitted for approval
            </div>
            <Link href={`/${locale}/quick-approve`} className="text-small text-accent hover:underline">
              เปิดคิวอนุมัติ
            </Link>
          </div>
        )}

        <div className="humi-card">
          <div className="humi-eyebrow" style={{ marginBottom: 16 }}>
            บันทึกการสิ้นสุดการจ้างงาน
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" style={{ marginBottom: 20 }}>
            <FormField
              id="resignedDate"
              label="วันที่ทำงานวันสุดท้าย (Resigned Date)"
              required
              help="ต้องเป็นวันในอนาคต ระบบจะคำนวณวันสิ้นสุดสภาพให้อัตโนมัติ"
            >
              {(ctrl) => (
                <FormInput
                  {...ctrl}
                  type="date"
                  value={termination.resignedDate ?? ''}
                  onChange={(e) => handleResignedDateChange(e.target.value)}
                  min={resignedMin}
                  className="max-w-[240px]"
                />
              )}
            </FormField>

            <FormField
              id="terminationDate"
              label="วันที่สิ้นสุดสภาพ (Termination date)"
              help="คำนวณอัตโนมัติ = วันที่ลาออก + 1 วัน"
            >
              {(ctrl) => (
                <FormInput
                  {...ctrl}
                  type="date"
                  value={termination.terminationDate ?? ''}
                  readOnly
                  disabled
                  className="max-w-[240px] opacity-70"
                  aria-readonly="true"
                />
              )}
            </FormField>
          </div>

          <hr className="humi-divider" />

          {/* ── 3. Termination Reason (LOV — restricted to the 13 spec codes) ── */}
          <div style={{ marginBottom: 20 }}>
            <ReasonPicker
              event="5597"
              id="reasonCode"
              value={termination.reasonCode}
              onChange={(code) => handleReasonChange(code)}
              restrictTo={TERMINATION_LOGIC_CODES}
              required
            />
          </div>

          {/* ── 4. Voluntary / Involuntary (read-only, derived) ── */}
          <div style={{ marginBottom: 20 }}>
            <label
              className="text-body font-semibold text-ink"
              style={{ display: 'block', marginBottom: 6 }}
            >
              ประเภทการพ้นสภาพ (Voluntary / Involuntary)
            </label>
            <div
              className="humi-input"
              style={{ maxWidth: 240, opacity: 0.7, display: 'flex', alignItems: 'center' }}
              aria-readonly="true"
            >
              {termination.voluntary === null
                ? '—'
                : termination.voluntary
                  ? 'Voluntary'
                  : 'Involuntary'}
            </div>
            <p className="text-small text-ink-muted mt-1">กำหนดอัตโนมัติตามเหตุผลที่เลือก</p>
          </div>

          {/* ── 5. Reason for termination (sub-LOV) ── */}
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="reasonForTermination"
              className="text-body font-semibold text-ink"
              style={{ display: 'block', marginBottom: 6 }}
            >
              เหตุผลย่อย (Reason for termination){' '}
              <span style={{ color: 'var(--color-danger)' }}>*</span>
            </label>
            <select
              id="reasonForTermination"
              value={termination.reasonForTermination}
              onChange={(e) => patch({ reasonForTermination: e.target.value })}
              disabled={!activeEntry}
              className="humi-input"
              style={{ width: '100%' }}
              aria-required="true"
            >
              {!activeEntry && <option value="">— เลือกเหตุผลหลักก่อน —</option>}
              {activeEntry?.reasonForTermination.options.map((o) => (
                <option key={o.code} value={o.code}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* ── 6. Transfer out to (LOV — company list only for Transfer Out) ── */}
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="transferOutTo"
              className="text-body font-semibold text-ink"
              style={{ display: 'block', marginBottom: 6 }}
            >
              โอนย้ายออกไปยัง (Transfer out to){' '}
              <span style={{ color: 'var(--color-danger)' }}>*</span>
            </label>
            <select
              id="transferOutTo"
              value={termination.transferOutTo}
              onChange={(e) => patch({ transferOutTo: e.target.value })}
              disabled={!isTransferOutReason}
              className="humi-input"
              style={{ maxWidth: 240, opacity: isTransferOutReason ? 1 : 0.7 }}
              aria-required="true"
            >
              <option value={NO_SELECTION}>No Selection</option>
              {isTransferOutReason &&
                TRANSFER_OUT_COMPANIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
            </select>
            {!isTransferOutReason && (
              <p className="text-small text-ink-muted mt-1">
                เลือกบริษัทปลายทางได้เฉพาะเหตุผล &ldquo;โอนย้ายออกนอกกลุ่ม&rdquo;
              </p>
            )}
          </div>

          <hr className="humi-divider" />

          {/* ── 7. OK to Rehire (LOV Yes/No — editable, NOT required) ── */}
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="okToRehire"
              className="text-body font-semibold text-ink"
              style={{ display: 'block', marginBottom: 6 }}
            >
              อนุญาตให้จ้างซ้ำในอนาคต (OK to Rehire){' '}
              <span className="text-small text-ink-muted">(ไม่จำเป็น)</span>
            </label>
            <select
              id="okToRehire"
              value={termination.okToRehire === null ? '' : termination.okToRehire ? 'yes' : 'no'}
              onChange={(e) =>
                patch({
                  okToRehire:
                    e.target.value === '' ? null : e.target.value === 'yes',
                })
              }
              className="humi-input"
              style={{ maxWidth: 240 }}
            >
              <option value="">— ไม่ระบุ —</option>
              <option value="yes">ใช่ (Yes)</option>
              <option value="no">ไม่ใช่ (No)</option>
            </select>
          </div>

          {/* ── 8. Additional Information (Termination) — free text ── */}
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="additionalInfo"
              className="text-body font-semibold text-ink"
              style={{ display: 'block', marginBottom: 6 }}
            >
              ข้อมูลเพิ่มเติม{' '}
              <span className="text-small text-ink-muted">(ไม่จำเป็น)</span>
            </label>
            <textarea
              id="additionalInfo"
              value={termination.additionalInfo}
              onChange={(e) => patch({ additionalInfo: e.target.value })}
              rows={3}
              placeholder="อธิบายข้อมูลเพิ่มเติม..."
              className="humi-input"
              style={{ width: '100%', resize: 'vertical' }}
              aria-label="ข้อมูลเพิ่มเติม"
            />
          </div>

          {/* ── 9. Personal Email (required, email format) ── */}
          <div style={{ marginBottom: 20 }}>
            <FormField
              id="personalEmail"
              label="อีเมลส่วนตัว (Personal Email)"
              required
              help={PERSONAL_EMAIL_REMARK}
              error={!!termination.personalEmail && !personalEmailValid ? 'รูปแบบอีเมลไม่ถูกต้อง' : undefined}
            >
              {(ctrl) => (
                <FormInput
                  {...ctrl}
                  type="email"
                  value={termination.personalEmail}
                  onChange={(e) => patch({ personalEmail: e.target.value })}
                  placeholder="name@example.com"
                  invalid={!!termination.personalEmail && !personalEmailValid}
                  className="max-w-[320px]"
                />
              )}
            </FormField>
          </div>

          <hr className="humi-divider" />

          {/* ── 10. Attachment ID (BA row — เอกสารประกอบการเลิกจ้าง) ── */}
          <div style={{ marginBottom: 24 }}>
            <AttachmentDropzone
              files={termination.attachmentFiles}
              onFilesChange={(files) => patch({ attachmentFiles: files })}
              label="เอกสารประกอบการเลิกจ้าง"
              maxFiles={5}
              maxSizeMB={10}
            />
          </div>

          {/* ── Submit button ── */}
          <div className="humi-row" style={{ justifyContent: 'flex-end', gap: 10, marginTop: 24 }}>
            <Link
              href={`/${locale}/admin/employees/${empId}`}
              className="humi-btn humi-btn--ghost"
            >
              ยกเลิก
            </Link>
            <button
              onClick={handleSubmit}
              disabled={!isValid || submitted}
              className="humi-btn humi-btn--danger"
              aria-disabled={!isValid || submitted}
            >
              บันทึกการสิ้นสุดสภาพ
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
