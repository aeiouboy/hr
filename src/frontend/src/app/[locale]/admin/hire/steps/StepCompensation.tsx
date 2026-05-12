'use client'

// StepCompensation.tsx — Compensation section (base salary + pay group + recurring components).
// Option-1 restructure (2026-04-23): Submit button + toast removed — submit
// is owned by WizardFooter on Step 3 Review.
// BRD #26, #27, #96:
//   - payGroup picklist sourced from SF EmpCompensation.payGroup (QA/QF/QG/RA/SA/SI/TA/UA)
//     SF source: jq '[.d.results[].payGroup] | unique' sf-qas-EmpCompensation-2026-04-26.json
//   - empPayCompRecurringNav recurring pay components (type, amount, currency, frequency)
//     SF source: jq '.d.results[0].empPayCompRecurringNav' sf-qas-EmpCompensation-2026-04-26.json
//   - currency defaults to THB (Thailand country code → THA → THB)
import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import type { CostDistributionEntry, RecurringPayComponentEntry } from '@/lib/admin/store/useHireWizard'
import { stepCompensationSchema } from '@/lib/admin/validation/hireSchema'
import {
  AttachmentDropzone,
  type AttachedFile,
} from '@/components/admin/AttachmentDropzone/AttachmentDropzone'
import {
  attachmentNameFromFiles,
  filesFromAttachmentName,
} from '@/components/admin/AttachmentDropzone/attachmentFiles'
import { PICKLIST_PAY_FREQUENCY, PICKLIST_PAY_COMPONENT_GROUP } from '@hrms/shared/picklists'

// SF EmpCompensation.payGroup — 8 codes from QAS extract
// SF source: jq '[.d.results[].payGroup] | unique' sf-qas-EmpCompensation-2026-04-26.json
const PICKLIST_PAY_GROUP = [
  { id: 'QA', labelTh: 'QA — รายเดือน (Permanent Staff)', active: true },
  { id: 'QF', labelTh: 'QF — รายวัน (Daily-paid)', active: true },
  { id: 'QG', labelTh: 'QG — Outsource / Contract', active: true },
  { id: 'RA', labelTh: 'RA — CPN Monthly', active: true },
  { id: 'SA', labelTh: 'SA — CRC Monthly', active: true },
  { id: 'SI', labelTh: 'SI — CRC Hourly', active: true },
  { id: 'TA', labelTh: 'TA — CDSC Monthly', active: true },
  { id: 'UA', labelTh: 'UA — TOPS Monthly', active: true },
] as const

export interface StepCompensationProps {
  onValidChange?: (isValid: boolean) => void
}

// Recurring pay component line item — matches RecurringPayComponentEntry in store
// (lifted from local state to store so EmpPayCompRecurringMapper can read it)
type RecurringPayComponent = RecurringPayComponentEntry

export default function StepCompensation({ onValidChange }: StepCompensationProps) {
  const t = useTranslations('hireForm.compensation')
  const { formData, setStepData } = useHireWizard()
  const [salaryInput, setSalaryInput] = useState<string>(
    formData.compensation.baseSalary != null ? String(formData.compensation.baseSalary) : ''
  )
  // BRD #96: currency defaults to THB (THA country = THB currency)
  const [currency, setCurrency] = useState<string>(formData.compensation.currency ?? 'THB')
  // BRD #27: payGroup — SF EmpCompensation.payGroup picklist (8 codes)
  const [payGroup, setPayGroup] = useState<string>(formData.compensation.payGroup ?? '')
  const [payFrequency, setPayFrequency] = useState<string>(formData.compensation.payFrequency ?? 'MON')
  // BRD #26: recurring pay components (empPayCompRecurringNav line items)
  // Lifted from local state to store so EmpPayCompRecurringMapper can read them
  const [recurringComponents, setRecurringComponents] = useState<RecurringPayComponent[]>(
    () => (formData.compensation.recurringComponents ?? []).map(r => ({ ...r }))
  )
  const [costDistributionRows, setCostDistributionRows] = useState<CostSplit[]>(() =>
    (formData.compensation.costDistribution ?? []).map((row) => ({
      id: crypto.randomUUID(),
      costCenter: row.costCenter,
      pct: String(row.percent),
    }))
  )

  // Phase 5: Payment Information (PaymentInformationV3 — BA Required fields)
  const [bankCountry, setBankCountry]       = useState<string>(formData.compensation.bankCountry ?? '')
  const [paymentMethod, setPaymentMethod]   = useState<string>(formData.compensation.paymentMethod ?? '')
  const [payType, setPayType]               = useState<string>(formData.compensation.payType ?? '')
  const [bank, setBank]                     = useState<string>(formData.compensation.bank ?? '')
  const [accountNumber, setAccountNumber]   = useState<string>(formData.compensation.accountNumber ?? '')
  const [bankCode, setBankCode]             = useState<string>(formData.compensation.bankCode ?? '')
  const [paymentAttachmentFiles, setPaymentAttachmentFiles] = useState<AttachedFile[]>(
    () => filesFromAttachmentName(formData.compensation.paymentAttachmentName, 'payment-existing'),
  )

  const [touched, setTouched] = useState(false)
  const [error, setError]     = useState<string | undefined>()
  const [costDistributionError, setCostDistributionError] = useState<string | undefined>()

  const validate = useCallback(
    (raw: string, rows: CostSplit[]) => {
      const num = raw === '' ? NaN : Number(raw)
      const result = stepCompensationSchema.safeParse({
        baseSalary: isNaN(num) ? undefined : num,
        costDistribution: rows.map((row) => ({
          costCenter: row.costCenter,
          percent: row.pct === '' ? undefined : Number(row.pct),
        })),
      })
      const salaryValid = !isNaN(num) && num > 0
      if (salaryValid) {
        setStepData('compensation', { baseSalary: num })
      }
      if (result.success) {
        setError(undefined)
        setCostDistributionError(undefined)
        setStepData('compensation', {
          baseSalary: num,
          costDistribution: result.data.costDistribution as CostDistributionEntry[],
        })
        onValidChange?.(true)
        return true
      } else {
        const salaryIssue = result.error.issues.find((issue) => issue.path[0] === 'baseSalary')
        const costIssue = result.error.issues.find((issue) => issue.path[0] === 'costDistribution')
        setError(salaryIssue?.message)
        setCostDistributionError(costIssue?.message)
        onValidChange?.(false)
        return false
      }
    },
    [setStepData, onValidChange]
  )

  useEffect(() => { validate(salaryInput, costDistributionRows) }, [salaryInput, costDistributionRows, validate])

  // Sync payGroup, currency, payFrequency to store (BRD #26, #27, #96)
  useEffect(() => {
    setStepData('compensation', { payGroup, currency, payFrequency })
  }, [payGroup, currency, payFrequency, setStepData])

  // Sync recurring components to store (Phase 5 — so mapper can read them)
  useEffect(() => {
    setStepData('compensation', { recurringComponents })
  }, [recurringComponents, setStepData])

  // Sync bank/payment fields to store (Phase 5 — PaymentInformationV3)
  useEffect(() => {
    setStepData('compensation', { bankCountry, paymentMethod, payType, bank, accountNumber, bankCode })
  }, [bankCountry, paymentMethod, payType, bank, accountNumber, bankCode, setStepData])

  function handlePaymentAttachmentFilesChange(files: AttachedFile[]) {
    setPaymentAttachmentFiles(files)
    setStepData('compensation', {
      paymentAttachmentName: attachmentNameFromFiles(files) || null,
    })
  }

  // Handlers for recurring pay components (BRD #26)
  const addRecurringRow = () => {
    setRecurringComponents((prev) => [
      ...prev,
      { id: crypto.randomUUID(), payComponent: '', amount: '', currencyCode: currency, frequency: payFrequency },
    ])
  }
  const removeRecurringRow = (id: string) => {
    setRecurringComponents((prev) => prev.filter((r) => r.id !== id))
  }
  const updateRecurringRow = (id: string, field: keyof Omit<RecurringPayComponent, 'id'>, value: string) => {
    setRecurringComponents((prev) => prev.map((r) => r.id === id ? { ...r, [field]: value } : r))
  }

  const addCostDistributionRow = () => {
    setCostDistributionRows((prev) => [...prev, { id: crypto.randomUUID(), costCenter: '', pct: '' }])
  }
  const removeCostDistributionRow = (id: string) => {
    setCostDistributionRows((prev) => prev.filter((r) => r.id !== id))
  }
  const updateCostDistributionRow = (id: string, field: 'costCenter' | 'pct', value: string) => {
    setCostDistributionRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
  }
  const clearCostDistributionRows = () => {
    setCostDistributionRows([])
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
      {/* เงินเดือนพื้นฐาน */}
      <fieldset>
        <label htmlFor="base-salary" className="humi-label">
          {t('baseSalary')}<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
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
            placeholder={t('salaryPlaceholder')}
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

      {/* สกุลเงิน — BRD #96: default THB (THA → THB) */}
      {/* SF source: EmpCompensation.currencyCode — Thailand = THA → THB */}
      <fieldset>
        <label htmlFor="currency" className="humi-label">{t('currency')}</label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="humi-select w-full"
        >
          <option value="THB">บาทไทย (THB)</option>
          <option value="USD">ดอลลาร์สหรัฐ (USD)</option>
          <option value="SGD">ดอลลาร์สิงคโปร์ (SGD)</option>
          <option value="JPY">เยนญี่ปุ่น (JPY)</option>
        </select>
        <p className="mt-1 text-xs text-ink-faint">{t('currencyDefault')}</p>
      </fieldset>

      {/* Pay Group — BRD #27 — SF EmpCompensation.payGroup (8 codes) */}
      {/* SF source: jq '[.d.results[].payGroup] | unique' sf-qas-EmpCompensation-2026-04-26.json */}
      <fieldset>
        <label htmlFor="pay-group" className="humi-label">{t('payGroup')}</label>
        <select
          id="pay-group"
          value={payGroup}
          onChange={(e) => setPayGroup(e.target.value)}
          className="humi-select w-full"
        >
          <option value="">{t('selectPayGroup')}</option>
          {PICKLIST_PAY_GROUP.filter((g) => g.active).map((g) => (
            <option key={g.id} value={g.id}>{g.labelTh}</option>
          ))}
        </select>
        <p className="mt-1 text-xs text-ink-faint">{t('payGroupHelp')}</p>
      </fieldset>

      {/* Pay Frequency — audit #13 / BRD #120 — wired to SF PICKLIST_PAY_FREQUENCY (6 items) */}
      <fieldset>
        <label htmlFor="pay-frequency" className="humi-label">{t('payFrequency')}</label>
        <select
          id="pay-frequency"
          value={payFrequency}
          onChange={(e) => setPayFrequency(e.target.value)}
          className="humi-select w-full"
        >
          {PICKLIST_PAY_FREQUENCY.filter((f) => f.active).map((f) => (
            <option key={f.id} value={f.id}>{f.labelTh}</option>
          ))}
        </select>
      </fieldset>

      {/* Cost Distribution — audit #13b (BRD #119) */}
      <fieldset className="md:col-span-2">
        <CostDistributionSection
          rows={costDistributionRows}
          error={costDistributionError}
          onAdd={addCostDistributionRow}
          onRemove={removeCostDistributionRow}
          onUpdate={updateCostDistributionRow}
          onClear={clearCostDistributionRows}
        />
      </fieldset>

      {/* Recurring Pay Components — BRD #26 — SF EmpPayCompRecurring (multi-record) */}
      {/* SF fields: payComponent, paycompvalue, currencyCode, frequency */}
      <fieldset className="md:col-span-2 mt-4 pt-4 border-t border-hairline-soft">
        <RecurringPaySection
          rows={recurringComponents}
          defaultCurrency={currency}
          defaultFrequency={payFrequency}
          onAdd={addRecurringRow}
          onRemove={removeRecurringRow}
          onUpdate={updateRecurringRow}
        />
      </fieldset>

      {/* ── Payment Information (Phase 5 — PaymentInformationV3 + Detail) ──────── */}
      {/* BA Required: Bank Country, Currency (above), Payment Method, Pay Type */}
      {/* SF: PaymentInformationV3.paymentInformationDetailV3Nav deep-insert */}
      <fieldset className="md:col-span-2 mt-4 pt-4 border-t border-hairline-soft">
        <div className="humi-eyebrow mb-3">ข้อมูลบัญชีจ่ายเงินเดือน</div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
          {/* Bank Country/Region — BA Required — SF: bankCountry */}
          <fieldset>
            <label htmlFor="bank-country" className="humi-label">
              ประเทศของบัญชีธนาคาร<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <select
              id="bank-country"
              value={bankCountry}
              onChange={(e) => setBankCountry(e.target.value)}
              className="humi-select w-full"
            >
              <option value="">เลือกประเทศ</option>
              <option value="THA">ไทย (THA)</option>
              <option value="SGP">สิงคโปร์ (SGP)</option>
              <option value="USA">สหรัฐอเมริกา (USA)</option>
              <option value="GBR">สหราชอาณาจักร (GBR)</option>
              <option value="JPN">ญี่ปุ่น (JPN)</option>
            </select>
          </fieldset>

          {/* Payment Method — BA Required — SF: paymentMethod */}
          <fieldset>
            <label htmlFor="payment-method" className="humi-label">
              วิธีการจ่ายเงิน<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <select
              id="payment-method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="humi-select w-full"
            >
              <option value="">เลือกวิธีการจ่ายเงิน</option>
              <option value="B">โอนเข้าบัญชีธนาคาร</option>
              <option value="C">เช็ค</option>
              <option value="M">เงินสด</option>
            </select>
          </fieldset>

          {/* Pay Type — BA Required — SF: payType */}
          <fieldset>
            <label htmlFor="pay-type" className="humi-label">
              รูปแบบการจ่าย<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <select
              id="pay-type"
              value={payType}
              onChange={(e) => setPayType(e.target.value)}
              className="humi-select w-full"
            >
              <option value="">เลือกรูปแบบการจ่าย</option>
              <option value="P">เปอร์เซ็นต์ (%)</option>
              <option value="V">จำนวนเงินคงที่</option>
              <option value="R">ยอดเงินคงเหลือ</option>
            </select>
          </fieldset>

          {/* Bank Name — optional — SF: bank */}
          <fieldset>
            <label htmlFor="bank-name" className="humi-label">ชื่อธนาคาร</label>
            <input
              id="bank-name"
              type="text"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              placeholder="ระบุชื่อธนาคาร"
              className="humi-input w-full"
            />
          </fieldset>

          {/* Account Number — optional — SF: accountNumber */}
          <fieldset>
            <label htmlFor="account-number" className="humi-label">เลขที่บัญชี</label>
            <input
              id="account-number"
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="ระบุเลขที่บัญชี"
              className="humi-input w-full"
            />
          </fieldset>

          {/* Bank Code (BIC/SWIFT) — optional — SF: businessIdentifierCode */}
          <fieldset>
            <label htmlFor="bank-code" className="humi-label">รหัสธนาคาร (BIC/SWIFT)</label>
            <input
              id="bank-code"
              type="text"
              value={bankCode}
              onChange={(e) => setBankCode(e.target.value)}
              placeholder="ระบุรหัสธนาคาร"
              className="humi-input w-full"
            />
          </fieldset>

          {/* BA Payment Information row 281 — Attachment */}
          <fieldset className="md:col-span-2">
            <AttachmentDropzone
              id="payment-info-attachment"
              files={paymentAttachmentFiles}
              onFilesChange={handlePaymentAttachmentFilesChange}
              label="ไฟล์แนบข้อมูลบัญชีจ่ายเงินเดือน"
              maxFiles={5}
              maxSizeMB={10}
            />
          </fieldset>
        </div>
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

interface CostDistributionSectionProps {
  rows: CostSplit[]
  error?: string
  onAdd: () => void
  onRemove: (id: string) => void
  onUpdate: (id: string, field: 'costCenter' | 'pct', value: string) => void
  onClear: () => void
}

function CostDistributionSection({ rows, error, onAdd, onRemove, onUpdate, onClear }: CostDistributionSectionProps) {
  const t = useTranslations('hireForm.compensation')
  const [showSection, setShowSection] = useState(rows.length > 0)

  const sum = rows.reduce((acc, r) => acc + (parseFloat(r.pct) || 0), 0)
  const sumOk = rows.length === 0 || Math.abs(sum - 100) < 0.01

  if (!showSection) {
    return (
      <button
        type="button"
        onClick={() => { setShowSection(true); onAdd() }}
        className="humi-button humi-button--ghost"
        style={{ display: 'inline-flex', gap: 6 }}
      >
        <span>{t('costDistributionToggle')}</span>
      </button>
    )
  }

  return (
    <div className="humi-card humi-card--cream" style={{ padding: 16 }}>
      <div className="humi-row" style={{ marginBottom: 12, gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div className="humi-eyebrow">{t('costDistributionTitle')}</div>
          <p className="text-small text-ink-muted" style={{ marginTop: 2 }}>
            {t('costDistributionDesc')}
          </p>
        </div>
        <button
          type="button"
          onClick={() => { setShowSection(false); onClear() }}
          className="text-xs text-ink-muted hover:text-warning"
          aria-label={t('closeSection')}
        >
          {t('closeSection')}
        </button>
      </div>

      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.id} className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_120px_auto] md:items-end">
            <div>
              <label className="humi-label text-xs" htmlFor={`cc-${row.id}`}>{t('costCenter')}</label>
              <select
                id={`cc-${row.id}`}
                value={row.costCenter}
                onChange={(e) => onUpdate(row.id, 'costCenter', e.target.value)}
                className="humi-select w-full"
              >
                <option value="">{t('selectCostCenter')}</option>
                {COST_CENTERS.map((cc) => (
                  <option key={cc.code} value={cc.code}>{cc.code} — {cc.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="humi-label text-xs" htmlFor={`pct-${row.id}`}>{t('allocation')}</label>
              <input
                id={`pct-${row.id}`}
                type="number"
                min={0}
                max={100}
                step={0.01}
                value={row.pct}
                onChange={(e) => onUpdate(row.id, 'pct', e.target.value)}
                placeholder={t('allocationPlaceholder')}
                className="humi-input w-full"
              />
            </div>
            <button
              type="button"
              onClick={() => onRemove(row.id)}
              className="text-xs text-ink-muted hover:text-warning"
              aria-label={t('removeRow')}
              style={{ padding: '8px 12px' }}
            >
              {t('removeRow')}
            </button>
          </div>
        ))}
      </div>

      <div className="humi-row" style={{ marginTop: 12, gap: 8, justifyContent: 'space-between' }}>
        <button
          type="button"
          onClick={onAdd}
          className="humi-button humi-button--ghost text-sm"
        >
          {t('addRow')}
        </button>
        <div className="text-sm">
          {t('totalLabel')} <span className={sumOk ? 'text-accent font-semibold' : 'text-warning font-semibold'}>{sum.toFixed(2)}%</span>
          {!sumOk && <span className="ml-2 text-xs text-warning">{t('totalMustBe100')}</span>}
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs text-warning">{error}</p>
      )}
    </div>
  )
}

// ─── Recurring Pay Components section (BRD #26) ───────────────────────────────
// SF entity: EmpPayCompRecurring
// Store shape: RecurringPayComponentEntry { id, payComponent, amount, currencyCode, frequency }
interface RecurringSectionProps {
  rows: RecurringPayComponent[]
  defaultCurrency: string
  defaultFrequency: string
  onAdd: () => void
  onRemove: (id: string) => void
  onUpdate: (id: string, field: keyof Omit<RecurringPayComponent, 'id'>, value: string) => void
}

function RecurringPaySection({ rows, defaultCurrency, defaultFrequency, onAdd, onRemove, onUpdate }: RecurringSectionProps) {
  const t = useTranslations('hireForm.compensation')
  const [showSection, setShowSection] = useState(rows.length > 0)

  if (!showSection) {
    return (
      <div>
        <div className="humi-eyebrow mb-1">{t('recurringOtherTitle')}</div>
        <button
          type="button"
          onClick={() => { setShowSection(true); onAdd() }}
          className="humi-button humi-button--ghost"
          style={{ display: 'inline-flex', gap: 6 }}
        >
          <span>{t('recurringToggle')}</span>
        </button>
        <p className="mt-1 text-xs text-ink-faint">{t('recurringDesc')}</p>
      </div>
    )
  }

  return (
    <div className="humi-card humi-card--cream" style={{ padding: 16 }}>
      <div className="humi-row" style={{ marginBottom: 12, gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div className="humi-eyebrow">{t('recurringActiveTitle')}</div>
          <p className="text-small text-ink-muted" style={{ marginTop: 2 }}>
            {t('recurringActiveDesc')}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowSection(false)}
          className="text-xs text-ink-muted hover:text-warning"
          aria-label={t('closeSection')}
        >
          {t('closeSection')}
        </button>
      </div>

      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.id} className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_1fr_100px_1fr_auto] md:items-end">
            {/* ประเภทค่าตอบแทน — SF: payComponent */}
            <div>
              <label className="humi-label text-xs" htmlFor={`rpc-type-${row.id}`}>{t('recurringType')}</label>
              <select
                id={`rpc-type-${row.id}`}
                value={row.payComponent}
                onChange={(e) => onUpdate(row.id, 'payComponent', e.target.value)}
                className="humi-select w-full"
              >
                <option value="">{t('selectType')}</option>
                {PICKLIST_PAY_COMPONENT_GROUP.filter((g) => g.active).map((g) => (
                  <option key={g.id} value={g.id}>{g.id} — {g.labelEn}</option>
                ))}
              </select>
            </div>
            {/* จำนวนเงิน — SF: paycompvalue */}
            <div>
              <label className="humi-label text-xs" htmlFor={`rpc-amt-${row.id}`}>{t('amount')}</label>
              <input
                id={`rpc-amt-${row.id}`}
                type="number"
                min={0}
                step={1}
                value={row.amount}
                onChange={(e) => onUpdate(row.id, 'amount', e.target.value)}
                placeholder={t('amountPlaceholder')}
                className="humi-input w-full"
              />
            </div>
            {/* สกุลเงิน — SF: currencyCode */}
            <div>
              <label className="humi-label text-xs" htmlFor={`rpc-cur-${row.id}`}>{t('currency')}</label>
              <select
                id={`rpc-cur-${row.id}`}
                value={row.currencyCode || defaultCurrency}
                onChange={(e) => onUpdate(row.id, 'currencyCode', e.target.value)}
                className="humi-select w-full"
              >
                <option value="THB">THB</option>
                <option value="USD">USD</option>
                <option value="SGD">SGD</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
            {/* ความถี่ — SF: frequency */}
            <div>
              <label className="humi-label text-xs" htmlFor={`rpc-freq-${row.id}`}>{t('frequency')}</label>
              <select
                id={`rpc-freq-${row.id}`}
                value={row.frequency || defaultFrequency}
                onChange={(e) => onUpdate(row.id, 'frequency', e.target.value)}
                className="humi-select w-full"
              >
                {PICKLIST_PAY_FREQUENCY.filter((f) => f.active).map((f) => (
                  <option key={f.id} value={f.id}>{f.labelTh}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => onRemove(row.id)}
              className="text-xs text-ink-muted hover:text-warning"
              aria-label={t('removeItem')}
              style={{ padding: '8px 12px' }}
            >
              {t('removeItem')}
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="humi-button humi-button--ghost text-sm mt-3"
      >
        {t('addItem')}
      </button>
    </div>
  )
}
