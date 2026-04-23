'use client'

// EffectiveDateGate.tsx — SF Pattern 1 UI-enforced effective dating (spec B1)
//
// Behaviour:
//   Mount  → gate card visible, child hidden, confirm button disabled
//   Confirm valid date → child mounts (render-prop), ribbon shows formatted date
//   Past date confirmed → recompute warning (I6)
//   Future date confirmed → "not yet on profile" banner (I7)
//   "เปลี่ยน" link in ribbon → gate re-opens as modal overlay (J5)
//   Child data preserved across gate reopen (I8)
//
// API: see EffectiveDateGateProps below (spec §5.1)
// Humi tokens: uses humi-input, humi-label, humi-card, humi-eyebrow, warning/accent CSS vars
// NO global * reset — Tailwind utilities only (rule 26b)
// Thai-primary copy (rule C10 + feedback_no_sf_style_bilingual_labels)

import { useState, useCallback, useId, type ReactNode } from 'react'

// ─── Types ────────────────────────────────────────────────────

export interface EffectiveDateGateProps {
  /** Pre-confirmed date ISO-8601 (YYYY-MM-DD). If provided, gate skips to child immediately. */
  initialEffectiveDate?: string

  /** Label for the date picker. Default: "วันที่มีผล" */
  label?: string

  /** Instructions copy. Default: two-sentence Thai. */
  instructions?: string

  /** Min/max bounds ISO-8601. Default: none. */
  min?: string
  max?: string

  /** Render-prop child — only mounts after gate is confirmed. Receives effectiveDate + reopenGate. */
  children: (ctx: { effectiveDate: string; reopenGate: () => void }) => ReactNode

  /** Called every time gate confirms / re-confirms with new date. */
  onEffectiveDateChange?: (date: string) => void
}

// ─── Helpers ──────────────────────────────────────────────────

/** Today in local timezone as YYYY-MM-DD */
function todayISO(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Format ISO date to Thai locale "23 เม.ย. 2569" (Buddhist Era) */
function formatThaiDate(isoDate: string): string {
  // Parse as local midnight to avoid UTC offset shifting the day
  const [y, mo, d] = isoDate.split('-').map(Number)
  const date = new Date(y, mo - 1, d)
  return date.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// ─── Minimal inline Callout (no <Callout> primitive in humi/) ──

interface CalloutProps {
  children: ReactNode
}

function WarningCallout({ children }: CalloutProps) {
  return (
    <div
      role="alert"
      style={{
        background: 'var(--color-warning-soft)',
        borderLeft: '3px solid var(--color-warning)',
        borderRadius: 8,
        padding: '10px 14px',
        fontSize: 13,
        color: '#6B4E14',
        lineHeight: 1.5,
      }}
    >
      {children}
    </div>
  )
}

// ─── Gate Card — initial screen ────────────────────────────────

interface GateCardProps {
  label: string
  instructions: string
  min?: string
  max?: string
  onConfirm: (date: string) => void
  inputId: string
}

function GateCard({ label, instructions, min, max, onConfirm, inputId }: GateCardProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const today = todayISO()

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setValue(v)
    if (v && v < today) {
      setError('วันที่ต้องไม่อยู่ในอดีต กรุณาเลือกวันที่ตั้งแต่วันนี้เป็นต้นไป')
    } else {
      setError('')
    }
  }, [today])

  const isValid = value.length === 10 && value >= today

  function handleConfirm() {
    if (!isValid) return
    onConfirm(value)
  }

  return (
    <div className="humi-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div className="humi-eyebrow" style={{ marginBottom: 6 }}>วันมีผล</div>
        <h2
          className="font-display"
          style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-ink)', marginBottom: 4 }}
        >
          {label}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--color-ink-muted)', lineHeight: 1.6 }}>
          {instructions}
        </p>
      </div>

      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <label htmlFor={inputId} className="humi-label">
          {label}
          <span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input
          id={inputId}
          type="date"
          value={value}
          min={min}
          max={max}
          aria-required="true"
          aria-invalid={!!error || undefined}
          aria-label={label}
          onChange={handleChange}
          className="humi-input"
          style={{ display: 'block', marginTop: 6 }}
        />
        {error && (
          <p role="alert" className="humi-error" style={{ marginTop: 6 }}>
            {error}
          </p>
        )}
      </fieldset>

      <div className="flex justify-stretch sm:justify-end">
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!isValid}
          aria-disabled={!isValid}
          className="humi-btn humi-btn--primary w-full sm:w-auto"
          style={{
            padding: '10px 24px',
            borderRadius: 'var(--radius-md)',
            background: isValid ? 'var(--color-accent)' : 'var(--color-ink-faint)',
            color: isValid ? '#fff' : 'var(--color-ink-muted)',
            fontWeight: 600,
            fontSize: 14,
            border: 'none',
            cursor: isValid ? 'pointer' : 'not-allowed',
            transition: 'background 150ms ease',
            maxWidth: '100%',
            boxSizing: 'border-box',
          }}
        >
          ยืนยันวันที่มีผล
        </button>
      </div>
    </div>
  )
}

// ─── Modal overlay — for reopen-gate (J5) ──────────────────────

interface GateModalProps {
  label: string
  instructions: string
  min?: string
  max?: string
  onConfirm: (date: string) => void
  onCancel: () => void
  inputId: string
}

function GateModal({ label, instructions, min, max, onConfirm, onCancel, inputId }: GateModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(14, 27, 44, 0.45)',
      }}
    >
      <div
        className="humi-card"
        style={{ width: '100%', maxWidth: 480, margin: '0 16px', display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <GateCard
          label={label}
          instructions={instructions}
          min={min}
          max={max}
          onConfirm={onConfirm}
          inputId={inputId}
        />
        <div style={{ borderTop: '1px solid var(--color-hairline-soft)', paddingTop: 12 }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-ink-muted)',
              fontSize: 14,
              cursor: 'pointer',
              padding: '4px 0',
            }}
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Ribbon ────────────────────────────────────────────────────

interface RibbonProps {
  effectiveDate: string
  onReopen: () => void
}

function Ribbon({ effectiveDate, onReopen }: RibbonProps) {
  const formatted = formatThaiDate(effectiveDate)
  const today = todayISO()
  const isFuture = effectiveDate > today
  const isPast = effectiveDate < today

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* Ribbon bar */}
      <div
        data-testid="effective-date-ribbon"
        style={{
          background: 'var(--color-accent-soft)',
          borderRadius: 8,
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 13,
          color: 'var(--color-accent)',
          fontWeight: 500,
        }}
      >
        <span aria-hidden="true" style={{ fontSize: 15 }}>&#9200;</span>
        <span>
          มีผลตั้งแต่:{' '}
          <strong style={{ fontWeight: 700 }}>{formatted}</strong>
        </span>
        <span style={{ marginLeft: 4, color: 'var(--color-ink-muted)', fontWeight: 400 }}>·</span>
        <button
          type="button"
          onClick={onReopen}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-accent)',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            textDecoration: 'underline',
            padding: 0,
          }}
        >
          เปลี่ยน
        </button>
      </div>

      {/* Past date warning */}
      {isPast && (
        <WarningCallout>
          ปรับย้อนหลัง — ระบบจะ recompute calculated fields (อายุงาน, probation, ฯลฯ)
        </WarningCallout>
      )}

      {/* Future date banner */}
      {isFuture && (
        <WarningCallout>
          ข้อมูลจะมีผลในอนาคต — ยังไม่ปรากฏบน Profile จนถึงวันดังกล่าว
        </WarningCallout>
      )}
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────

const DEFAULT_LABEL = 'วันที่มีผล'
const DEFAULT_INSTRUCTIONS =
  'กรุณาระบุวันที่การเปลี่ยนแปลงนี้จะมีผล เพื่อให้ระบบบันทึกประวัติและคำนวณฟิลด์ที่เกี่ยวข้องได้ถูกต้อง'

export function EffectiveDateGate({
  initialEffectiveDate,
  label = DEFAULT_LABEL,
  instructions = DEFAULT_INSTRUCTIONS,
  min,
  max,
  children,
  onEffectiveDateChange,
}: EffectiveDateGateProps) {
  // confirmed = gate passed; undefined = gate not yet confirmed
  const [confirmedDate, setConfirmedDate] = useState<string | undefined>(initialEffectiveDate)
  // modalOpen = reopen-gate modal (J5)
  const [modalOpen, setModalOpen] = useState(false)

  const inputId = useId()

  const handleGateConfirm = useCallback((date: string) => {
    setConfirmedDate(date)
    setModalOpen(false)
    onEffectiveDateChange?.(date)
  }, [onEffectiveDateChange])

  const reopenGate = useCallback(() => {
    setModalOpen(true)
  }, [])

  const handleModalCancel = useCallback(() => {
    setModalOpen(false)
  }, [])

  // Gate not yet confirmed — show only the gate card
  if (!confirmedDate) {
    return (
      <GateCard
        label={label}
        instructions={instructions}
        min={min}
        max={max}
        onConfirm={handleGateConfirm}
        inputId={inputId}
      />
    )
  }

  // Gate confirmed — show ribbon + child form (+ optional modal overlay)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Ribbon effectiveDate={confirmedDate} onReopen={reopenGate} />

      {/* Child form — preserves state (I8) across reopen because it stays mounted */}
      <div data-testid="child-form">
        {children({ effectiveDate: confirmedDate, reopenGate })}
      </div>

      {/* Reopen modal (J5) — rendered on top; child remains mounted underneath */}
      {modalOpen && (
        <GateModal
          label={label}
          instructions={instructions}
          min={min}
          max={max}
          onConfirm={handleGateConfirm}
          onCancel={handleModalCancel}
          inputId={`${inputId}-modal`}
        />
      )}
    </div>
  )
}
