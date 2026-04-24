'use client'

// StepCompensation.tsx — Compensation section (base salary).
// Option-1 restructure (2026-04-23): Submit button + toast removed — submit
// is owned by WizardFooter on Step 3 Review. Keeping an inner submit here
// created the "double submit button" Ken flagged in the Job cluster screenshot.
import { useState, useEffect, useCallback } from 'react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { stepCompensationSchema } from '@/lib/admin/validation/hireSchema'
import { PICKLIST_PAY_FREQUENCY, PICKLIST_PAY_COMPONENT_GROUP } from '@hrms/shared/picklists'

export interface StepCompensationProps {
  onValidChange?: (isValid: boolean) => void
}

export default function StepCompensation({ onValidChange }: StepCompensationProps) {
  const { formData, setStepData } = useHireWizard()
  const [salaryInput, setSalaryInput] = useState<string>(
    formData.compensation.baseSalary != null ? String(formData.compensation.baseSalary) : ''
  )
  const [touched, setTouched] = useState(false)
  const [error, setError]     = useState<string | undefined>()

  const validate = useCallback(
    (raw: string) => {
      const num = raw === '' ? NaN : Number(raw)
      const result = stepCompensationSchema.safeParse({
        baseSalary: isNaN(num) ? undefined : num,
      })
      if (result.success) {
        setError(undefined)
        setStepData('compensation', { baseSalary: num })
        onValidChange?.(true)
        return true
      } else {
        setError(result.error.issues[0]?.message)
        onValidChange?.(false)
        return false
      }
    },
    [setStepData, onValidChange]
  )

  useEffect(() => { validate(salaryInput) }, [salaryInput, validate])

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
      {/* เงินเดือนพื้นฐาน */}
      <fieldset>
        <label htmlFor="base-salary" className="humi-label">
          เงินเดือนพื้นฐาน (บาท)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-muted select-none">฿</span>
          <input
            id="base-salary"
            type="number"
            min={1}
            step={1}
            required
            aria-required="true"
            aria-invalid={touched && !!error}
            aria-describedby={touched && error ? 'salary-error' : undefined}
            placeholder="ระบุจำนวนเงิน"
            value={salaryInput}
            onChange={(e) => setSalaryInput(e.target.value)}
            onBlur={() => setTouched(true)}
            className="humi-input w-full pl-7"
          />
        </div>
        {touched && error && (
          <p id="salary-error" role="alert" className="mt-1 text-xs text-warning">{error}</p>
        )}
      </fieldset>

      {/* Currency — audit #13 (non-TH support per BRD #120) — mockup stub */}
      <fieldset>
        <label htmlFor="currency" className="humi-label">สกุลเงิน</label>
        <select id="currency" defaultValue="THB" className="humi-select w-full">
          <option value="THB">บาทไทย (THB)</option>
          <option value="USD">ดอลลาร์สหรัฐ (USD)</option>
          <option value="SGD">ดอลลาร์สิงคโปร์ (SGD)</option>
          <option value="JPY">เยนญี่ปุ่น (JPY)</option>
        </select>
      </fieldset>

      {/* Pay Frequency — audit #13 / BRD #120 — wired to SF PICKLIST_PAY_FREQUENCY (6 items) */}
      <fieldset>
        <label htmlFor="pay-frequency" className="humi-label">ความถี่การจ่ายเงิน</label>
        <select id="pay-frequency" defaultValue="MON" className="humi-select w-full">
          {PICKLIST_PAY_FREQUENCY.filter((f) => f.active).map((f) => (
            <option key={f.id} value={f.id}>{f.labelTh}</option>
          ))}
        </select>
      </fieldset>

      {/* Payment Method — audit #13 (BRD #118) — mockup stub */}
      <fieldset>
        <label htmlFor="payment-method" className="humi-label">วิธีรับเงินเดือน</label>
        <select id="payment-method" defaultValue="TRANSFER" className="humi-select w-full">
          <option value="TRANSFER">โอนเงินผ่านธนาคาร</option>
          <option value="CASH">เงินสด</option>
          <option value="CHEQUE">เช็ค</option>
        </select>
      </fieldset>

      {/* Cost Distribution — audit #13b (BRD #119) — mockup stub */}
      <fieldset className="md:col-span-2">
        <CostDistributionSection />
      </fieldset>
    </div>
  )
}

// ─── Cost Distribution section (BRD #119) — source: FOPayComponentGroup (9 SF groups) ───
// Replaced hardcoded stub with real SF PayComponentGroup picklist
const COST_CENTERS = PICKLIST_PAY_COMPONENT_GROUP
  .filter((g) => g.active)
  .map((g) => ({ code: g.id, label: g.labelEn }))

interface CostSplit {
  id: string
  costCenter: string
  pct: string
}

function CostDistributionSection() {
  const [rows, setRows] = useState<CostSplit[]>([])
  const [showSection, setShowSection] = useState(false)

  const sum = rows.reduce((acc, r) => acc + (parseFloat(r.pct) || 0), 0)
  const sumOk = rows.length === 0 || Math.abs(sum - 100) < 0.01

  const addRow = () => {
    setRows((prev) => [...prev, { id: crypto.randomUUID(), costCenter: '', pct: '' }])
  }
  const removeRow = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id))
  }
  const updateRow = (id: string, field: 'costCenter' | 'pct', value: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
  }

  if (!showSection) {
    return (
      <button
        type="button"
        onClick={() => { setShowSection(true); addRow() }}
        className="humi-button humi-button--ghost"
        style={{ display: 'inline-flex', gap: 6 }}
      >
        <span>+ แบ่งค่าใช้จ่ายข้าม cost center</span>
      </button>
    )
  }

  return (
    <div className="humi-card humi-card--cream" style={{ padding: 16 }}>
      <div className="humi-row" style={{ marginBottom: 12, gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div className="humi-eyebrow">การกระจายค่าใช้จ่าย</div>
          <p className="text-small text-ink-muted" style={{ marginTop: 2 }}>
            แบ่งงบประมาณเงินเดือนข้ามหน่วยบัญชี — รวมต้องเท่ากับ 100%
          </p>
        </div>
        <button
          type="button"
          onClick={() => { setShowSection(false); setRows([]) }}
          className="text-xs text-ink-muted hover:text-warning"
          aria-label="ปิด cost distribution"
        >
          ปิดส่วนนี้
        </button>
      </div>

      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.id} className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_120px_auto] md:items-end">
            <div>
              <label className="humi-label text-xs" htmlFor={`cc-${row.id}`}>หน่วยบัญชี</label>
              <select
                id={`cc-${row.id}`}
                value={row.costCenter}
                onChange={(e) => updateRow(row.id, 'costCenter', e.target.value)}
                className="humi-select w-full"
              >
                <option value="">— เลือกหน่วยบัญชี —</option>
                {COST_CENTERS.map((cc) => (
                  <option key={cc.code} value={cc.code}>{cc.code} — {cc.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="humi-label text-xs" htmlFor={`pct-${row.id}`}>สัดส่วน (%)</label>
              <input
                id={`pct-${row.id}`}
                type="number"
                min={0}
                max={100}
                step={0.01}
                value={row.pct}
                onChange={(e) => updateRow(row.id, 'pct', e.target.value)}
                placeholder="0-100"
                className="humi-input w-full"
              />
            </div>
            <button
              type="button"
              onClick={() => removeRow(row.id)}
              className="text-xs text-ink-muted hover:text-warning"
              aria-label="ลบแถวนี้"
              style={{ padding: '8px 12px' }}
            >
              ลบ
            </button>
          </div>
        ))}
      </div>

      <div className="humi-row" style={{ marginTop: 12, gap: 8, justifyContent: 'space-between' }}>
        <button
          type="button"
          onClick={addRow}
          className="humi-button humi-button--ghost text-sm"
        >
          + เพิ่มแถว
        </button>
        <div className="text-sm">
          รวม: <span className={sumOk ? 'text-accent font-semibold' : 'text-warning font-semibold'}>{sum.toFixed(2)}%</span>
          {!sumOk && <span className="ml-2 text-xs text-warning">(ต้องเท่ากับ 100)</span>}
        </div>
      </div>
    </div>
  )
}
