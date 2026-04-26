// VALIDATION_EXEMPT: B-action factory page — pre-submit gate via actionAvailability + ActionGuardBanner; Zod wire deferred to Sprint 2 lifecycleSchema audit (#47)
'use client'

// rehire/page.tsx — รับกลับเข้าทำงาน (M4, BRD #102 — CRC vs CPN rules)
//
// Archetype B contextual action — accessed from TERMINATED employee detail.
// Non-terminated employee → warning banner (ไม่ต้องจ้างซ้ำ).
//
// BRD #102:
//   - CRC  → default useNewCode=true  (new employee code, new seniority)
//   - CPN  → default useNewCode=false (reuse employee code, same seniority)
//   - Other companies → no explicit rule (tooltip + default false)
//
// C1: touches only this file (no factory/store changes).
// C8: RehireEvent shape from @hrms/shared — no invented variants.

/**
 * BA validation pending — BRD #102 CRC/CPN explicit; other 10+ companies TBD via HR Expert
 */

import { useEffect, useMemo, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, UserCheck, AlertTriangle, Info } from 'lucide-react'
import { useTimelines } from '@/lib/admin/store/useTimelines'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import { createClusterWizard } from '@/lib/admin/wizard-template/createClusterWizard'
import { EffectiveDateGate } from '@/components/admin/EffectiveDateGate'
import type { MockEmployee } from '@/mocks/employees'
import type { RehireEvent } from '@hrms/shared/types/timeline'

// ─── Form shape ──────────────────────────────────────────────────────────────

interface RehireCluster {
  newHireDate: string | null
  newEmployeeCode: string
  seniorityDateOverride: string | null
  useNewCode: boolean
  reason: string
}

interface RehireForm {
  rehire: RehireCluster
}

// ─── Company rule helpers ─────────────────────────────────────────────────────

type CompanyCode = MockEmployee['company']

/** CRC default = new code, CPN default = reuse code, others = no rule */
function defaultUseNewCode(company: CompanyCode): boolean {
  if (company === 'CRC') return true
  return false
}

function companyHasExplicitRule(company: CompanyCode): boolean {
  return company === 'CRC' || company === 'CPN'
}

function newCodeLabel(company: CompanyCode): string {
  if (company === 'CRC') return 'ใช่ (CRC ใช้รหัสใหม่)'
  if (company === 'CPN') return 'ใช่ (CPN ใช้รหัสใหม่)'
  return 'ใช่ (ใช้รหัสพนักงานใหม่)'
}

function sameCodeLabel(company: CompanyCode): string {
  if (company === 'CRC') return 'ไม่ (ใช้รหัสเดิม)'
  if (company === 'CPN') return 'ไม่ (CPN ใช้รหัสเดิม)'
  return 'ไม่ (ใช้รหัสเดิม)'
}

// ─── Next code stub ───────────────────────────────────────────────────────────

/** Stub: find highest EMP-XXXX numeric suffix in store, return next. */
function stubNextCode(all: MockEmployee[], currentEmpId: string): string {
  const nums = all
    .map((e) => {
      const m = e.employee_id.match(/^EMP-(\d+)$/)
      return m ? parseInt(m[1], 10) : 0
    })
    .filter((n) => n > 0)
  const max = nums.length > 0 ? Math.max(...nums) : 1000
  return `EMP-${max + 1}`
}

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

  return (
    <div className="humi-card humi-card--cream">
      <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
        {employee.employee_id} · {employee.company}
      </div>
      <div className="font-display text-[18px] font-semibold text-ink">{nameTh}</div>
      <div className="text-small text-ink-muted mb-3">{nameEn}</div>
      <div
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        style={{ marginTop: 8 }}
      >
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>สถานะ</div>
          <div className="text-body font-medium text-ink">ออกจากงาน</div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ประเภท</div>
          <div className="text-body font-medium text-ink">
            {employee.employee_class === 'PERMANENT' ? 'Permanent' : 'Part-time'}
          </div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>วันที่เริ่มงานเดิม</div>
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

// ─── Company rule tooltip ─────────────────────────────────────────────────────

function OtherCompanyTooltip() {
  const [show, setShow] = useState(false)
  return (
    <span style={{ position: 'relative', display: 'inline-flex', marginLeft: 6, verticalAlign: 'middle' }}>
      <button
        type="button"
        aria-label="ข้อมูลเพิ่มเติมเกี่ยวกับ rule รหัสพนักงาน"
        onClick={() => setShow((v) => !v)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--color-ink-muted)' }}
      >
        <Info size={14} aria-hidden />
      </button>
      {show && (
        <div
          role="tooltip"
          style={{
            position: 'absolute', left: 20, top: -4, zIndex: 20,
            background: 'var(--color-ink)', color: '#fff',
            padding: '8px 12px', borderRadius: 8, fontSize: 12, lineHeight: 1.5,
            width: 220, boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
          }}
        >
          บริษัทนี้ยังไม่มี rule ชัดเจน — ตรวจสอบกับ HR
        </div>
      )}
    </span>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function RehirePage() {
  const params = useParams()
  const router = useRouter()
  const empId = params.id as string
  const locale = params.locale as string

  const allEmployees = useEmployees((s) => s.all)
  const employee = useEmployees((s) => s.getById(empId)) ?? null
  const updateEmployee = useEmployees((s) => s.updateEmployee)

  const today = todayISO()

  // Derive company and default code toggle from employee
  const company = (employee?.company ?? 'CEN') as CompanyCode
  const defaultCode = defaultUseNewCode(company)

  // Compute initial form — memoized so createClusterWizard is stable
  const INITIAL_FORM: RehireForm = useMemo(() => ({
    rehire: {
      newHireDate: null,
      newEmployeeCode: employee ? stubNextCode(allEmployees, empId) : 'EMP-1001',
      seniorityDateOverride: null,
      useNewCode: defaultCode,
      reason: '',
    },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [empId]) // intentionally stable per empId

  // ── Factory: per-employee wizard instance ──────────────────────────────────
  const rehireWizard = useMemo(() => {
    if (!employee) return null
    return createClusterWizard<RehireForm>({
      name: 'rehire',
      storeKey: `rehire-wizard-draft-${empId}`,
      initialFormData: INITIAL_FORM,
      clusterSteps: [
        { number: 1, labelTh: 'รับกลับเข้าทำงาน', labelEn: 'Rehire' },
      ],
      validators: {
        1: (d) => {
          const r = d.rehire
          if (!r.newHireDate) return false
          if (r.newHireDate < today) return false
          if (r.useNewCode && (!r.newEmployeeCode || r.newEmployeeCode === empId)) return false
          if (r.seniorityDateOverride && r.seniorityDateOverride > r.newHireDate) return false
          return true
        },
      },
      employeeId: empId,
      preloadedEmployee: {},
    })
  }, [empId, employee]) // eslint-disable-line react-hooks/exhaustive-deps

  const useStore = rehireWizard?.useStore
  const formData = useStore?.((s) => s.formData) ?? INITIAL_FORM
  const setStepData = useStore?.((s) => s.setStepData)
  const reset = useStore?.((s) => s.reset)

  const rehire = formData.rehire

  // ── Validation ─────────────────────────────────────────────────────────────
  const isValid = useMemo(() => {
    if (!rehire.newHireDate) return false
    if (rehire.newHireDate < today) return false
    if (rehire.useNewCode && (!rehire.newEmployeeCode || rehire.newEmployeeCode === empId)) return false
    if (rehire.seniorityDateOverride && rehire.seniorityDateOverride > rehire.newHireDate) return false
    return true
  }, [rehire, today, empId])

  // ── State ──────────────────────────────────────────────────────────────────
  const [submitted, setSubmitted] = useState(false)

  // Seed timeline
  const { append, seed } = useTimelines()
  useEffect(() => {
    if (employee) seed(employee)
  }, [employee, seed])

  // ── Patch handler ──────────────────────────────────────────────────────────
  const patch = useCallback(
    (partial: Partial<RehireCluster>) => {
      setStepData?.('rehire', partial)
    },
    [setStepData],
  )

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(() => {
    if (!employee || !isValid || submitted) return

    const event: RehireEvent = {
      id: `evt-rehire-${Date.now()}`,
      employeeId: empId,
      kind: 'rehire',
      effectiveDate: rehire.newHireDate!,
      recordedAt: new Date().toISOString(),
      actorUserId: 'admin-current',
      priorEmployeeId: empId,
      notes: rehire.reason || undefined,
    }

    append(empId, event)

    // Update employee in store per CRC/CPN rule
    const newId = rehire.useNewCode ? rehire.newEmployeeCode : employee.employee_id
    updateEmployee(empId, {
      status: 'active',
      hire_date: rehire.newHireDate!,
      employee_id: newId,
    })

    reset?.()
    setSubmitted(true)

    const bannerMsg = rehire.useNewCode
      ? `จ้างซ้ำสำเร็จ — รหัสใหม่: ${rehire.newEmployeeCode}`
      : `จ้างซ้ำสำเร็จ — รหัสเดิม: ${employee.employee_id}`

    router.push(
      `/${locale}/admin/employees/${newId}?banner=${encodeURIComponent(bannerMsg)}`,
    )
  }, [employee, isValid, submitted, rehire, empId, append, updateEmployee, reset, router, locale])

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

  // ── Non-terminated guard ───────────────────────────────────────────────────
  if (employee.status !== 'terminated') {
    return (
      <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
        <EmployeeSnapshot employee={employee} />
        <div
          role="alert"
          className="humi-card"
          style={{
            display: 'flex', gap: 12, alignItems: 'flex-start',
            background: 'var(--color-warning-soft, #fffbeb)',
            border: '1.5px solid var(--color-warning, #f59e0b)',
          }}
        >
          <AlertTriangle
            size={20}
            aria-hidden
            style={{ color: 'var(--color-warning, #f59e0b)', flexShrink: 0, marginTop: 2 }}
          />
          <div>
            <div className="text-body font-semibold text-ink" style={{ marginBottom: 4 }}>
              พนักงานยังทำงานอยู่ ไม่ต้องจ้างซ้ำ
            </div>
            <p className="text-small text-ink-muted">
              Rehire ใช้ได้เฉพาะพนักงานที่มีสถานะ &ldquo;ออกจากงาน&rdquo; เท่านั้น
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ── Main form ──────────────────────────────────────────────────────────────
  return (
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
            background: 'var(--color-accent-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, color: 'var(--color-accent)',
          }}
        >
          <UserCheck size={18} aria-hidden />
        </div>
        <div>
          <div className="humi-eyebrow">การดำเนินการ</div>
          <h1 className="font-display text-[20px] font-semibold text-ink">
            รับกลับเข้าทำงาน
          </h1>
        </div>
      </div>

      {/* Employee snapshot */}
      <EmployeeSnapshot employee={employee} />

      {/* Rehire form */}
      <EffectiveDateGate
        initialEffectiveDate={rehire.newHireDate ?? undefined}
        onEffectiveDateChange={(date) => patch({
          newHireDate: date,
          seniorityDateOverride: rehire.seniorityDateOverride && rehire.seniorityDateOverride > date
            ? null
            : rehire.seniorityDateOverride,
        })}
        label="วันที่กลับมาทำงาน"
      >
        {() => (
      <div className="humi-card">
        <div className="humi-eyebrow" style={{ marginBottom: 16 }}>
          ข้อมูลการจ้างซ้ำ
        </div>

        <hr className="humi-divider" />

        {/* ── ใช้รหัสพนักงานใหม่? ── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <span className="text-body font-semibold text-ink">
              ใช้รหัสพนักงานใหม่?
            </span>
            {!companyHasExplicitRule(company) && <OtherCompanyTooltip />}
          </div>

          <div
            role="radiogroup"
            aria-label="เลือกว่าจะใช้รหัสพนักงานใหม่หรือรหัสเดิม"
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
          >
            {/* ใช่ — new code */}
            <label
              className="humi-row"
              style={{
                gap: 10, cursor: 'pointer', padding: '10px 14px',
                borderRadius: 10,
                border: `1.5px solid ${rehire.useNewCode
                  ? 'var(--color-accent)'
                  : 'var(--color-hairline-soft)'}`,
                background: rehire.useNewCode
                  ? 'var(--color-accent-soft)'
                  : 'transparent',
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              <input
                type="radio"
                name="useNewCode"
                value="true"
                checked={rehire.useNewCode}
                onChange={() => patch({ useNewCode: true })}
                style={{ accentColor: 'var(--color-accent)' }}
                aria-label={newCodeLabel(company)}
              />
              <span className="text-body text-ink">{newCodeLabel(company)}</span>
            </label>

            {/* ไม่ — same code */}
            <label
              className="humi-row"
              style={{
                gap: 10, cursor: 'pointer', padding: '10px 14px',
                borderRadius: 10,
                border: `1.5px solid ${!rehire.useNewCode
                  ? 'var(--color-accent)'
                  : 'var(--color-hairline-soft)'}`,
                background: !rehire.useNewCode
                  ? 'var(--color-accent-soft)'
                  : 'transparent',
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              <input
                type="radio"
                name="useNewCode"
                value="false"
                checked={!rehire.useNewCode}
                onChange={() => patch({ useNewCode: false })}
                style={{ accentColor: 'var(--color-accent)' }}
                aria-label={sameCodeLabel(company)}
              />
              <span className="text-body text-ink">{sameCodeLabel(company)}</span>
            </label>
          </div>
        </div>

        {/* ── รหัสพนักงานใหม่ (conditional) ── */}
        {rehire.useNewCode && (
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="newEmployeeCode"
              className="text-body font-semibold text-ink"
              style={{ display: 'block', marginBottom: 6 }}
            >
              รหัสพนักงานใหม่ <span style={{ color: 'var(--color-danger)' }}>*</span>
            </label>
            <input
              id="newEmployeeCode"
              type="text"
              value={rehire.newEmployeeCode}
              onChange={(e) => patch({ newEmployeeCode: e.target.value })}
              className="humi-input"
              style={{ maxWidth: 240 }}
              aria-describedby="newEmployeeCode-hint"
            />
            {rehire.newEmployeeCode === empId && (
              <p
                id="newEmployeeCode-hint"
                className="text-small mt-1"
                style={{ color: 'var(--color-danger)' }}
                role="alert"
              >
                รหัสใหม่ต้องไม่ซ้ำกับรหัสเดิม
              </p>
            )}
            {rehire.newEmployeeCode !== empId && (
              <p id="newEmployeeCode-hint" className="text-small text-ink-muted mt-1">
                ระบบสร้างรหัสให้อัตโนมัติ — แก้ไขได้
              </p>
            )}
          </div>
        )}

        <hr className="humi-divider" />

        {/* ── วันเริ่มอายุงาน (Seniority) ── */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="seniorityDateOverride"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            วันเริ่มอายุงาน (Seniority){' '}
            <span className="text-small text-ink-muted">(ไม่จำเป็น)</span>
          </label>
          <input
            id="seniorityDateOverride"
            type="date"
            value={rehire.seniorityDateOverride ?? ''}
            max={rehire.newHireDate ?? undefined}
            onChange={(e) => patch({ seniorityDateOverride: e.target.value || null })}
            className="humi-input"
            style={{ maxWidth: 240 }}
            aria-describedby="seniority-hint"
          />
          <p id="seniority-hint" className="text-small text-ink-muted mt-1">
            ปล่อยว่างไว้ = ใช้วันที่กลับมาทำงานใหม่
            {rehire.newHireDate && (
              <> (default: {formatDateTh(rehire.newHireDate)})</>
            )}
          </p>
          {rehire.seniorityDateOverride && rehire.newHireDate &&
            rehire.seniorityDateOverride > rehire.newHireDate && (
            <p className="text-small mt-1" style={{ color: 'var(--color-danger)' }} role="alert">
              วัน Seniority ต้องไม่เกินกว่าวันที่กลับมาทำงาน
            </p>
          )}
        </div>

        <hr className="humi-divider" />

        {/* ── เหตุผล ── */}
        <div style={{ marginBottom: 24 }}>
          <label
            htmlFor="reason"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            เหตุผล <span className="text-small text-ink-muted">(ไม่จำเป็น)</span>
          </label>
          <textarea
            id="reason"
            value={rehire.reason}
            onChange={(e) => patch({ reason: e.target.value })}
            rows={3}
            placeholder="เหตุผลที่รับกลับเข้าทำงาน..."
            className="humi-input"
            style={{ width: '100%', resize: 'vertical' }}
            aria-label="เหตุผลการรับกลับเข้าทำงาน"
          />
        </div>

        {/* ── Submit ── */}
        <div className="humi-row" style={{ justifyContent: 'flex-end', gap: 10 }}>
          <Link
            href={`/${locale}/admin/employees/${empId}`}
            className="humi-btn humi-btn--ghost"
          >
            ยกเลิก
          </Link>
          <button
            onClick={handleSubmit}
            disabled={!isValid || submitted}
            className="humi-btn humi-btn--primary"
            aria-disabled={!isValid || submitted}
          >
            บันทึกการจ้างซ้ำ
          </button>
        </div>
      </div>
        )}
      </EffectiveDateGate>
    </div>
  )
}
