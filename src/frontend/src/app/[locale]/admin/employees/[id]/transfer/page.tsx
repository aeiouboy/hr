'use client'

// transfer/page.tsx — โอนย้ายพนักงาน (BRD #110, Wave 2)
//
// Archetype B contextual action — Transfer = cross-company/BG move with retain empCode
// (Seniority continuous).
//
// BRD #110: โอนย้ายพนักงานข้ามบริษัท/หน่วยงาน รหัสพนักงานคงเดิม
//   - targetCompany required (PICKLIST_COMPANY)
//   - targetBusinessUnit, targetPosition, effectiveDate required
//   - effectiveDate >= today
//   - migrationNote auto-filled "Seniority continuous", admin can edit
//
// C1: touches only this file (placeholder → real form replace).
// C8: TransferEvent shape from @hrms/shared — no invented variants.

import { useEffect, useMemo, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRightLeft } from 'lucide-react'
import { useTimelines } from '@/lib/admin/store/useTimelines'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import { createClusterWizard } from '@/lib/admin/wizard-template/createClusterWizard'
import { PICKLIST_COMPANY } from '@hrms/shared/picklists'
import type { CompanyId } from '@hrms/shared/picklists'
import type { MockEmployee } from '@/mocks/employees'
import type { TransferEvent } from '@hrms/shared/types/timeline'

// ─── Form shape ─────────────────────────────────────────────────────────────

interface TransferMovement {
  /** บริษัทปลายทาง — PICKLIST_COMPANY | BA validation pending — HR Expert May 1 */
  targetCompany: string
  /** หน่วยงานปลายทาง — free text for now | BA validation pending — HR Expert May 1 */
  targetBusinessUnit: string
  /** ตำแหน่งปลายทาง — free text for now | BA validation pending — HR Expert May 1 */
  targetPosition: string
  /** สถานที่ปลายทาง — optional | BA validation pending — HR Expert May 1 */
  targetLocation: string
  /** วันที่มีผล — ISO date, required, min=today | BA validation pending — HR Expert May 1 */
  effectiveDate: string | null
  /** Cost Center — English label OK (internal field) | BA validation pending — HR Expert May 1 */
  costCenter: string
  /** เหตุผล — free text, optional | BA validation pending — HR Expert May 1 */
  reason: string
  /** หมายเหตุการโอนย้าย — auto-filled "Seniority continuous", admin can edit | BA validation pending — HR Expert May 1 */
  migrationNote: string
}

interface TransferForm {
  movement: TransferMovement
}

const TODAY = new Date().toISOString().slice(0, 10)

const INITIAL_FORM: TransferForm = {
  movement: {
    targetCompany: '',
    targetBusinessUnit: '',
    targetPosition: '',
    targetLocation: '',
    effectiveDate: null,
    costCenter: '',
    reason: '',
    migrationNote: 'Seniority continuous',
  },
}

// ─── Date helpers ────────────────────────────────────────────────────────────

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

function formatDateTh(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('th-TH', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

// ─── Employee snapshot (readonly) ────────────────────────────────────────────

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
      <div className="font-display text-[18px] font-semibold text-ink">{nameTh}</div>
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
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>บริษัทปัจจุบัน</div>
          <div className="text-body font-medium text-ink">{employee.company}</div>
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

// ─── Main page ───────────────────────────────────────────────────────────────

export default function TransferPage() {
  const params = useParams()
  const router = useRouter()
  const empId = params.id as string
  const locale = params.locale as string

  const employee = useEmployees((s) => s.getById(empId)) ?? null

  // ── Factory: per-employee wizard instance (Archetype B, D1 factory pattern) ──
  // Memoized so factory is called once per empId.
  const transferWizard = useMemo(() => {
    if (!employee) return null
    return createClusterWizard<TransferForm>({
      name: 'transfer',
      storeKey: `transfer-wizard-draft-${empId}`,
      initialFormData: INITIAL_FORM,
      clusterSteps: [
        { number: 1, labelTh: 'โอนย้ายพนักงาน', labelEn: 'Employee Transfer' },
      ],
      validators: {
        1: (d) =>
          !!d.movement.targetCompany &&
          !!d.movement.targetBusinessUnit &&
          !!d.movement.targetPosition &&
          !!d.movement.effectiveDate &&
          d.movement.effectiveDate >= TODAY,
      },
      employeeId: empId,
      preloadedEmployee: {},
    })
  }, [empId, employee])

  const useStore = transferWizard?.useStore
  const formData = useStore?.((s) => s.formData) ?? INITIAL_FORM
  const setStepData = useStore?.((s) => s.setStepData)
  const reset = useStore?.((s) => s.reset)

  const movement = formData.movement

  // ── Validation ───────────────────────────────────────────────────────────
  const isValid =
    !!movement.targetCompany &&
    !!movement.targetBusinessUnit &&
    !!movement.targetPosition &&
    !!movement.effectiveDate &&
    movement.effectiveDate >= TODAY

  // ── State ────────────────────────────────────────────────────────────────
  const [submitted, setSubmitted] = useState(false)

  // Seed timeline if not already seeded
  const { append, seed } = useTimelines()
  useEffect(() => {
    if (employee) seed(employee)
  }, [employee, seed])

  // ── Patch handler ────────────────────────────────────────────────────────
  const patch = useCallback(
    (partial: Partial<TransferMovement>) => {
      setStepData?.('movement', partial)
    },
    [setStepData],
  )

  // ── Submit logic ─────────────────────────────────────────────────────────
  const doSubmit = useCallback(() => {
    if (!employee || !isValid) return

    const event: TransferEvent = {
      id: `evt-tra-${Date.now()}`,
      employeeId: empId,
      kind: 'transfer',
      effectiveDate: movement.effectiveDate!,
      recordedAt: new Date().toISOString(),
      actorUserId: 'admin-current',
      fromOrgUnit: employee.org_unit,
      toOrgUnit: movement.targetBusinessUnit,
      fromPosition: employee.position_title,
      toPosition: movement.targetPosition,
      notes: movement.reason || undefined,
    }

    append(empId, event)
    useEmployees.getState().updateEmployee(empId, {
      company: movement.targetCompany as CompanyId,
      org_unit: movement.targetBusinessUnit,
      position_title: movement.targetPosition,
    })
    reset?.()
    setSubmitted(true)

    router.push(
      `/${locale}/admin/employees/${empId}?banner=${encodeURIComponent('บันทึกการโอนย้าย — รหัสพนักงานคงเดิม (ต่ออายุงาน)')}`,
    )
  }, [employee, isValid, movement, empId, append, reset, router, locale])

  // ── Not found ────────────────────────────────────────────────────────────
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
          <ArrowRightLeft size={18} aria-hidden />
        </div>
        <div>
          <div className="humi-eyebrow">การดำเนินการ</div>
          <h1 className="font-display text-[20px] font-semibold text-ink">
            โอนย้ายพนักงาน
          </h1>
        </div>
      </div>

      {/* Employee snapshot */}
      <EmployeeSnapshot employee={employee} />

      {/* Transfer form */}
      <div className="humi-card">
        <div className="humi-eyebrow" style={{ marginBottom: 16 }}>
          ข้อมูลการโอนย้าย
        </div>

        {/* ── บริษัทปลายทาง (required) ── */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="targetCompany"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            บริษัทปลายทาง <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <select
            id="targetCompany"
            value={movement.targetCompany}
            onChange={(e) => patch({ targetCompany: e.target.value })}
            className="humi-input"
            style={{ maxWidth: 400 }}
            aria-label="เลือกบริษัทปลายทาง"
          >
            <option value="">— เลือกบริษัท —</option>
            {PICKLIST_COMPANY.filter((c) => c.active).map((c) => (
              <option key={c.id} value={c.id}>
                {c.labelTh}
              </option>
            ))}
          </select>
        </div>

        {/* ── หน่วยงานปลายทาง (required) ── */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="targetBusinessUnit"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            หน่วยงานปลายทาง <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <input
            id="targetBusinessUnit"
            type="text"
            value={movement.targetBusinessUnit}
            onChange={(e) => patch({ targetBusinessUnit: e.target.value })}
            placeholder="เช่น ฝ่ายการตลาด, สำนักงานใหญ่"
            className="humi-input"
            style={{ maxWidth: 400 }}
            aria-label="หน่วยงานปลายทาง"
          />
        </div>

        {/* ── ตำแหน่งปลายทาง (required) ── */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="targetPosition"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            ตำแหน่งปลายทาง <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <input
            id="targetPosition"
            type="text"
            value={movement.targetPosition}
            onChange={(e) => patch({ targetPosition: e.target.value })}
            placeholder="เช่น ผู้จัดการฝ่ายการตลาด"
            className="humi-input"
            style={{ maxWidth: 400 }}
            aria-label="ตำแหน่งปลายทาง"
          />
        </div>

        {/* ── สถานที่ปลายทาง (optional) ── */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="targetLocation"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            สถานที่ปลายทาง <span className="text-small text-ink-muted">(ไม่จำเป็น)</span>
          </label>
          <input
            id="targetLocation"
            type="text"
            value={movement.targetLocation}
            onChange={(e) => patch({ targetLocation: e.target.value })}
            placeholder="เช่น สำนักงานใหญ่, สาขาเชียงใหม่"
            className="humi-input"
            style={{ maxWidth: 400 }}
            aria-label="สถานที่ปลายทาง"
          />
        </div>

        <hr className="humi-divider" />

        {/* ── วันที่มีผล (required, min=today) ── */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="effectiveDate"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            วันที่มีผล <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <input
            id="effectiveDate"
            type="date"
            value={movement.effectiveDate ?? ''}
            min={TODAY}
            onChange={(e) => patch({ effectiveDate: e.target.value || null })}
            className="humi-input"
            style={{ maxWidth: 240 }}
            aria-label="วันที่มีผลของการโอนย้าย"
          />
          <p className="text-small text-ink-muted mt-1">
            ต้องเป็นวันที่ปัจจุบันหรือหลังจากนี้
          </p>
        </div>

        {/* ── Cost Center (optional, English label OK) ── */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="costCenter"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            Cost Center <span className="text-small text-ink-muted">(ไม่จำเป็น)</span>
          </label>
          <input
            id="costCenter"
            type="text"
            value={movement.costCenter}
            onChange={(e) => patch({ costCenter: e.target.value })}
            placeholder="เช่น CC-1001"
            className="humi-input"
            style={{ maxWidth: 240 }}
            aria-label="Cost Center"
          />
        </div>

        <hr className="humi-divider" />

        {/* ── เหตุผล (optional) ── */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="reason"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            เหตุผล <span className="text-small text-ink-muted">(ไม่จำเป็น)</span>
          </label>
          <textarea
            id="reason"
            value={movement.reason}
            onChange={(e) => patch({ reason: e.target.value })}
            rows={3}
            placeholder="เหตุผลในการโอนย้าย..."
            className="humi-input"
            style={{ width: '100%', resize: 'vertical' }}
            aria-label="เหตุผลการโอนย้าย"
          />
        </div>

        {/* ── หมายเหตุการโอนย้าย (auto-filled, editable) ── */}
        <div style={{ marginBottom: 24 }}>
          <label
            htmlFor="migrationNote"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            หมายเหตุการโอนย้าย
          </label>
          <input
            id="migrationNote"
            type="text"
            value={movement.migrationNote}
            onChange={(e) => patch({ migrationNote: e.target.value })}
            className="humi-input"
            style={{ maxWidth: 400 }}
            aria-label="หมายเหตุการโอนย้าย (auto-filled)"
          />
          <p className="text-small text-ink-muted mt-1">
            กรอกอัตโนมัติ — แก้ไขได้ตามต้องการ
          </p>
        </div>

        {/* ── Submit button ── */}
        <div className="humi-row" style={{ justifyContent: 'flex-end', gap: 10 }}>
          <Link
            href={`/${locale}/admin/employees/${empId}`}
            className="humi-btn humi-btn--ghost"
          >
            ยกเลิก
          </Link>
          <button
            onClick={doSubmit}
            disabled={!isValid || submitted}
            className="humi-btn humi-btn--primary"
            aria-disabled={!isValid || submitted}
          >
            บันทึกการโอนย้าย
          </button>
        </div>
      </div>
    </div>
  )
}
