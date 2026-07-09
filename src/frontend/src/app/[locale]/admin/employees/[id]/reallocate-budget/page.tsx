// VALIDATION_EXEMPT: STA-101 R2 — Benefits Exception form (SuccessFactors parity).
'use client'

// reallocate-budget/page.tsx — Benefits Exception (STA-101 request 2)
//
// Rebuilt to match the SuccessFactors "Benefits Exception" form (option ข — a
// whole new form). KEEPS the page shell from PR #268 (back nav, employee
// snapshot, "Allocate Entitlement amount / จัดสรรจำนวนสิทธิ" title, attachment
// button) and REPLACES the single-plan reallocation body with the Benefits
// Exception header fields + an editable detail grid. Mockup phase — in-session
// state only, no backend.

import { useCallback, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  ArrowLeft,
  ArrowLeftRight,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
} from 'lucide-react'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import { formatDate } from '@/lib/date'
import { useAuthStore } from '@/stores/auth-store'
import { ActionGuardBanner } from '@/components/admin/ActionGuardBanner'
import { actionAvailability } from '@/lib/admin/actionAvailability'
import { FileUploadField } from '@/components/humi/molecules/FileUploadField'
import { BENEFIT_PLAN_REGISTRY } from '@/data/benefits/plan-registry'
import {
  useBenefitExceptionFormStore,
  type ExceptionFor,
  type BenefitExceptionRow,
} from '@/stores/benefit-exception-form-store'

const SELECT_CLASS = [
  'w-full rounded-md border px-3 py-2 text-body bg-surface text-ink',
  'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas',
  'border-hairline focus:border-accent',
].join(' ')

const EXCEPTION_FOR_KEYS: ExceptionFor[] = ['claim', 'entitlement', 'accumulation']
const SELECTED_PERIOD_KEYS = ['claim2026', 'entitlement2026', 'accum2026'] as const

let rowSeq = 0
const newRow = (): BenefitExceptionRow => ({
  id: `bex-row-${++rowSeq}`,
  benefitPlanId: '',
  relevantPeriod: 'none',
  selectedPeriod: '',
  adjustmentAmount: 0,
  details: '',
})

export default function ReallocateBudgetPage() {
  const params = useParams()
  const empId = params.id as string
  const locale = params.locale as string

  const employee = useEmployees((s) => s.getById(empId)) ?? null
  const t = useTranslations('admin.reallocateBudget')
  const tx = useTranslations('admin.reallocateBudget.benefitException')

  const addException = useBenefitExceptionFormStore((s) => s.addException)
  const actorName = useAuthStore((s) => s.username) ?? 'HR Admin'

  // ── Header state ──────────────────────────────────────────────────────────
  // Legal Entity is fixed to RIS (read-only) and email notification was removed
  // per STA-134 — both are no longer user-editable.
  const [exceptionFor, setExceptionFor] = useState<ExceptionFor>('claim')

  // ── Detail rows ───────────────────────────────────────────────────────────
  const [rows, setRows] = useState<BenefitExceptionRow[]>(() => [newRow()])

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const creationDate = useMemo(() => formatDate(new Date(), 'long', locale), [locale])

  const updateRow = useCallback(
    (id: string, patch: Partial<BenefitExceptionRow>) => {
      setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)))
      setError(null)
    },
    [],
  )
  const deleteRow = useCallback((id: string) => {
    setRows((rs) => rs.filter((r) => r.id !== id))
  }, [])
  const moveRow = useCallback((id: string, dir: -1 | 1) => {
    setRows((rs) => {
      const i = rs.findIndex((r) => r.id === id)
      const j = i + dir
      if (i < 0 || j < 0 || j >= rs.length) return rs
      const next = [...rs]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  }, [])
  const addRow = useCallback(() => setRows((rs) => [...rs, newRow()]), [])

  const doSubmit = useCallback(() => {
    if (!employee) return
    if (rows.length === 0) {
      setError(tx('validation.noRows'))
      return
    }
    if (rows.some((r) => !r.benefitPlanId)) {
      setError(tx('validation.benefitRequired'))
      return
    }
    if (rows.some((r) => !r.selectedPeriod)) {
      setError(tx('validation.selectedPeriodRequired'))
      return
    }
    addException({
      employeeId: empId,
      workerId: employee.employee_id,
      exceptionFor,
      legalEntities: ['ris'],
      creationDate: new Date().toISOString(),
      emailNotification: false,
      rows,
      createdBy: actorName,
    })
    setError(null)
    setSubmitted(true)
  }, [
    employee, rows, exceptionFor,
    addException, empId, actorName, tx,
  ])

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

  // Deep-link guard — same change_type isActive gate as the action card.
  const guard = actionAvailability(employee).change_type
  if (!guard.ok) {
    return (
      <ActionGuardBanner
        actionKey="change_type"
        reason={guard.reason ?? ''}
        backHref={`/${locale}/admin/employees/${empId}`}
        actionLabel={t('title')}
      />
    )
  }

  const nameTh = `${employee.first_name_th} ${employee.last_name_th}`
  const nameEn = `${employee.first_name_en} ${employee.last_name_en}`

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

      {/* Page title (kept from #268) */}
      <div className="humi-row" style={{ gap: 10, alignItems: 'center' }}>
        <div
          style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'var(--color-accent-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, color: 'var(--color-accent)',
          }}
        >
          <ArrowLeftRight size={18} aria-hidden />
        </div>
        <div>
          <div className="humi-eyebrow">{t('pageTitle')}</div>
          <h1 className="font-display text-xl font-semibold text-ink">{t('title')}</h1>
        </div>
      </div>

      {/* Employee snapshot (kept from #268) */}
      <div className="humi-card humi-card--cream">
        <div className="humi-eyebrow" style={{ marginBottom: 4 }}>{employee.employee_id}</div>
        <div className="font-display text-lg font-semibold text-ink">{nameTh}</div>
        <div className="text-small text-ink-muted">{nameEn}</div>
        <p className="text-small text-ink-soft" style={{ marginTop: 8 }}>{tx('subtitle')}</p>
      </div>

      {/* Success banner */}
      {submitted && (
        <div
          role="status"
          className="humi-row"
          style={{
            gap: 10, alignItems: 'center', padding: '12px 16px', borderRadius: 10,
            background: 'var(--color-accent-soft)', color: 'var(--color-accent)',
          }}
        >
          <CheckCircle2 size={18} aria-hidden />
          <span className="text-body font-semibold">
            {tx('successBanner', { count: rows.length })}
          </span>
        </div>
      )}

      {/* Form */}
      <div className="humi-card ring-1 ring-accent-soft">
        {/* ── Header fields ── */}
        <div className="humi-eyebrow" style={{ marginBottom: 12 }}>{tx('headerSection')}</div>

        <div className="humi-row" style={{ gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
          {/* Worker ID (read-only) */}
          <div style={{ flex: '1 1 220px' }}>
            <label htmlFor="bex-worker" className="text-body font-semibold text-ink" style={{ display: 'block', marginBottom: 6 }}>
              {tx('fields.workerId')} <span className="text-danger" aria-hidden>*</span>
            </label>
            <input
              id="bex-worker"
              type="text"
              value={employee.employee_id}
              readOnly
              className="humi-input"
              style={{ maxWidth: 240, background: 'var(--color-canvas-soft)' }}
            />
          </div>

          {/* Exception For */}
          <div style={{ flex: '1 1 220px' }}>
            <label htmlFor="bex-for" className="text-body font-semibold text-ink" style={{ display: 'block', marginBottom: 6 }}>
              {tx('fields.exceptionFor')} <span className="text-danger" aria-hidden>*</span>
            </label>
            <select
              id="bex-for"
              value={exceptionFor}
              onChange={(e) => setExceptionFor(e.target.value as ExceptionFor)}
              className={SELECT_CLASS}
              style={{ maxWidth: 280 }}
            >
              {EXCEPTION_FOR_KEYS.map((k) => (
                <option key={k} value={k}>{tx(`exceptionForOptions.${k}`)}</option>
              ))}
            </select>
          </div>

          {/* Creation date (read-only, Thai BE) */}
          <div style={{ flex: '1 1 220px' }}>
            <label htmlFor="bex-created" className="text-body font-semibold text-ink" style={{ display: 'block', marginBottom: 6 }}>
              {tx('fields.creationDate')}
            </label>
            <input
              id="bex-created"
              type="text"
              value={creationDate}
              readOnly
              className="humi-input"
              style={{ maxWidth: 240, background: 'var(--color-canvas-soft)' }}
            />
          </div>

          {/* Legal Entity (read-only — fixed to RIS per STA-134) */}
          <div style={{ flex: '1 1 220px' }}>
            <label htmlFor="bex-legal" className="text-body font-semibold text-ink" style={{ display: 'block', marginBottom: 6 }}>
              {tx('fields.legalEntity')}
            </label>
            <input
              id="bex-legal"
              type="text"
              value={tx('legalEntityOptions.ris')}
              readOnly
              className="humi-input"
              style={{ maxWidth: 240, background: 'var(--color-canvas-soft)' }}
            />
          </div>
        </div>

        {/* ── Benefit Exception Details — editable grid ── */}
        <div className="humi-eyebrow" style={{ marginBottom: 12 }}>{tx('detailsSection')}</div>

        <div style={{ overflowX: 'auto', marginBottom: 12 }}>
          <table className="w-full" style={{ borderCollapse: 'collapse', minWidth: 880 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                {[
                  'benefit', 'selectedPeriod', 'adjustmentAmount', 'details', 'actions',
                ].map((c) => (
                  <th
                    key={c}
                    className="humi-eyebrow"
                    style={{ textAlign: 'left', padding: '8px 10px', whiteSpace: 'nowrap' }}
                  >
                    {tx(`columns.${c}`)}
                    {(c === 'benefit' || c === 'selectedPeriod') && (
                      <span className="text-danger" aria-hidden> *</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => {
                const negative = row.adjustmentAmount < 0
                return (
                  <tr key={row.id} style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                    {/* Benefit */}
                    <td style={{ padding: '8px 10px', minWidth: 220 }}>
                      <select
                        value={row.benefitPlanId}
                        onChange={(e) => updateRow(row.id, { benefitPlanId: e.target.value })}
                        className={SELECT_CLASS}
                        aria-label={tx('columns.benefit')}
                      >
                        <option value="">{tx('benefitPlaceholder')}</option>
                        {BENEFIT_PLAN_REGISTRY.map((p) => (
                          <option key={p.id} value={p.id}>
                            {locale === 'th' ? p.nameTh : p.nameEn}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Selected period */}
                    <td style={{ padding: '8px 10px', minWidth: 260 }}>
                      <select
                        value={row.selectedPeriod}
                        onChange={(e) => updateRow(row.id, { selectedPeriod: e.target.value })}
                        className={SELECT_CLASS}
                        aria-label={tx('columns.selectedPeriod')}
                      >
                        <option value="">{tx('selectedPeriodPlaceholder')}</option>
                        {SELECTED_PERIOD_KEYS.map((k) => (
                          <option key={k} value={k}>{tx(`selectedPeriodOptions.${k}`)}</option>
                        ))}
                      </select>
                    </td>

                    {/* Adjustment amount — accepts negative; negatives render in pumpkin, never red */}
                    <td style={{ padding: '8px 10px', minWidth: 140 }}>
                      <input
                        type="number"
                        value={Number.isFinite(row.adjustmentAmount) ? row.adjustmentAmount : 0}
                        onChange={(e) =>
                          updateRow(row.id, { adjustmentAmount: Number(e.target.value) })
                        }
                        className="humi-input tabular-nums"
                        style={negative ? { color: 'var(--color-danger)' } : undefined}
                        aria-label={tx('columns.adjustmentAmount')}
                      />
                    </td>

                    {/* Details */}
                    <td style={{ padding: '8px 10px', minWidth: 90 }}>
                      <span className="text-small text-accent" style={{ cursor: 'default' }}>
                        {tx('detailsLabel')}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '8px 10px', whiteSpace: 'nowrap' }}>
                      <div className="humi-row" style={{ gap: 6 }}>
                        <button
                          type="button"
                          onClick={() => moveRow(row.id, -1)}
                          disabled={idx === 0}
                          aria-label={tx('moveUp')}
                          className="text-ink-muted hover:text-accent transition-colors disabled:opacity-30"
                          style={{ display: 'inline-flex', lineHeight: 0 }}
                        >
                          <ArrowUp size={16} aria-hidden />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveRow(row.id, 1)}
                          disabled={idx === rows.length - 1}
                          aria-label={tx('moveDown')}
                          className="text-ink-muted hover:text-accent transition-colors disabled:opacity-30"
                          style={{ display: 'inline-flex', lineHeight: 0 }}
                        >
                          <ArrowDown size={16} aria-hidden />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteRow(row.id)}
                          aria-label={tx('deleteRow')}
                          className="text-ink-muted hover:text-danger transition-colors"
                          style={{ display: 'inline-flex', lineHeight: 0 }}
                        >
                          <Trash2 size={16} aria-hidden />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Add row affordance */}
        <button
          type="button"
          onClick={addRow}
          className="humi-row text-body text-ink-muted hover:text-accent transition-colors"
          style={{
            gap: 8, alignItems: 'center', width: '100%', justifyContent: 'flex-start',
            padding: '10px 12px', borderRadius: 10, marginBottom: 20,
            border: '1px dashed var(--color-hairline)',
          }}
        >
          <Plus size={16} aria-hidden />
          {tx('addRow')}
        </button>

        {error && (
          <p role="alert" className="text-small text-danger" style={{ marginBottom: 16 }}>
            {error}
          </p>
        )}

        {/* Attachments — always visible (no toggle). */}
        <div style={{ marginBottom: 24 }}>
          <FileUploadField label={tx('fields.attachments')} maxFiles={5} />
        </div>

        {/* Actions */}
        <div className="humi-row" style={{ justifyContent: 'flex-end', gap: 10 }}>
          <Link href={`/${locale}/admin/employees/${empId}`} className="humi-btn humi-btn--ghost">
            {tx('buttons.cancel')}
          </Link>
          <button
            type="button"
            onClick={doSubmit}
            className="humi-btn humi-btn--primary"
          >
            {tx('buttons.save')}
          </button>
        </div>
      </div>
    </div>
  )
}
