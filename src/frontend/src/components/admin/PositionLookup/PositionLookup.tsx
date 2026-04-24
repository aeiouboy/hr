'use client'

// PositionLookup.tsx — Spec B3: searchable combobox for Position Master
// System Invariants I1-I12 | WAI-ARIA combobox pattern | hand-rolled (no new dep)
// BRD #95: on select → cascade all org fields automatically (all-or-nothing)

import { useState, useEffect, useRef, useCallback, useId } from 'react'
import type { Position, PositionCascade } from '@/lib/admin/types/position'

export interface PositionLookupProps {
  /** Source of positions — consumer chooses store/API/mock */
  positionMaster: Position[]
  /** Controlled mode: parent passes selected Position */
  value?: Position | null
  /** Uncontrolled seed (only honored on first mount) */
  defaultValue?: Position | null
  /** Called with full cascade payload on selection (I2) */
  onSelect: (cascade: PositionCascade | null) => void
  /** Optional BU filter — e.g. restrict to a specific BU for Transfer */
  filter?: (p: Position) => boolean
  /** Loading state (future async hook) */
  isLoading?: boolean
  /** Disabled — read-only chip, no search */
  disabled?: boolean
  /** Label override — default: "ตำแหน่งงาน" */
  label?: string
  /** Placeholder override */
  placeholder?: string
  /** Required marker */
  required?: boolean
  /** a11y id for label association */
  id?: string
}

const DEFAULT_TOP_N = 10
const DEBOUNCE_MS = 150 // constant per spec §11 decision 2

// ─── helpers ─────────────────────────────────────────────────────────────────

function nfcLower(s: string): string {
  return s.normalize('NFC').toLowerCase()
}

function matchesQuery(p: Position, query: string): boolean {
  if (!query) return true
  const q = nfcLower(query)
  return (
    nfcLower(p.code).includes(q) ||
    nfcLower(p.titleTh).includes(q) ||
    nfcLower(p.titleEn).includes(q)
  )
}

function toCascade(p: Position): PositionCascade {
  return {
    code: p.code,
    titleTh: p.titleTh,
    titleEn: p.titleEn,
    businessUnit: p.businessUnit,
    businessUnitLabel: p.businessUnitLabel,
    branch: p.branch,
    branchLabel: p.branchLabel,
    job: p.job,
    jobLabel: p.jobLabel,
    jobGrade: p.jobGrade,
    jobGradeLabel: p.jobGradeLabel,
    managerPositionCode: p.managerPositionCode,
    managerPositionLabel: p.managerPositionLabel,
    hrDistrict: p.hrDistrict,
  }
}

function dedupeAndWarn(positions: Position[]): Position[] {
  const seen = new Map<string, Position>()
  for (const p of positions) {
    if (seen.has(p.code)) {
      // E2: warn in dev, use first occurrence
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[PositionLookup] Duplicate position code "${p.code}" — using first occurrence`)
      }
    } else {
      seen.set(p.code, p)
    }
  }
  return Array.from(seen.values())
}

// ─── component ───────────────────────────────────────────────────────────────

export default function PositionLookup({
  positionMaster,
  value,
  defaultValue,
  onSelect,
  filter,
  isLoading = false,
  disabled = false,
  label = 'ตำแหน่งงาน',
  placeholder = 'ค้นด้วยรหัส / ชื่อตำแหน่ง (TH/EN)',
  required = false,
  id: externalId,
}: PositionLookupProps) {
  const autoId = useId()
  const inputId = externalId ?? autoId

  // Controlled vs uncontrolled (I4, I5)
  const isControlled = value !== undefined
  const [internalSelected, setInternalSelected] = useState<Position | null>(defaultValue ?? null)
  const selected = isControlled ? (value ?? null) : internalSelected

  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const listboxId = `${inputId}-listbox`

  // ── dedupe on mount/change (E2) ──────────────────────────────────
  const master = dedupeAndWarn(positionMaster)

  // Warn on orphan managerPositionCode (I11)
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return
    const codes = new Set(master.map((p) => p.code))
    for (const p of master) {
      if (p.managerPositionCode && !codes.has(p.managerPositionCode)) {
        console.warn(
          `[PositionLookup] Orphan managerPositionCode "${p.managerPositionCode}" on position "${p.code}"`,
        )
      }
    }
  }, [master])

  // ── debounce (E7) ───────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [query])

  // ── controlled: sync when value changes externally (E4) ─────────
  useEffect(() => {
    if (isControlled) {
      setQuery('')
      setFocusedIndex(-1)
    }
  }, [value, isControlled])

  // ── filter + search results (I1, I3, I7) ────────────────────────
  const candidates = master.filter((p) => {
    if (!p.active) return false // I1: active only
    if (filter && !filter(p)) return false
    return true
  })

  const results: Position[] = debouncedQuery
    ? candidates.filter((p) => matchesQuery(p, debouncedQuery))
    : candidates.sort((a, b) => a.titleTh.localeCompare(b.titleTh, 'th')).slice(0, DEFAULT_TOP_N)

  // ── keyboard handlers (I6) ──────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          if (!open) {
            setOpen(true)
            setFocusedIndex(0)
          } else {
            setFocusedIndex((prev) => Math.min(prev + 1, results.length - 1))
          }
          break
        case 'ArrowUp':
          e.preventDefault()
          setFocusedIndex((prev) => Math.max(prev - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (open && focusedIndex >= 0 && results[focusedIndex]) {
            handleSelect(results[focusedIndex])
          }
          break
        case 'Escape':
          e.preventDefault()
          setOpen(false)
          setFocusedIndex(-1)
          break
      }
    },
    [open, focusedIndex, results, disabled],
  )

  function handleSelect(p: Position) {
    if (!isControlled) setInternalSelected(p)
    onSelect(toCascade(p))
    setQuery('')
    setOpen(false)
    setFocusedIndex(-1)
    // Return focus to input (a11y)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  function handleClear() {
    if (!isControlled) setInternalSelected(null)
    onSelect(null)
    setQuery('')
    setOpen(false)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  // ── empty positionMaster (E1) ────────────────────────────────────
  if (master.length === 0 && !isLoading) {
    return (
      <fieldset>
        <label htmlFor={inputId} className="humi-label">
          {label}{required && <span aria-hidden="true" className="humi-asterisk ml-1">*</span>}
        </label>
        <div className="humi-input w-full max-w-sm flex items-center text-ink-soft text-sm" aria-disabled="true">
          ไม่มีข้อมูล Position Master
        </div>
      </fieldset>
    )
  }

  // ── selected chip (I10, I12) ─────────────────────────────────────
  if (selected && !disabled) {
    const chipLabel = selected.branchLabel
      ? `${selected.code} · ${selected.titleTh} · ${selected.branchLabel}`
      : `${selected.code} · ${selected.titleTh}`
    const isLong = chipLabel.length > 60

    return (
      <fieldset>
        <label className="humi-label">
          {label}{required && <span aria-hidden="true" className="humi-asterisk ml-1">*</span>}
        </label>
        <div
          data-testid="position-chip"
          className="flex items-start justify-between gap-2 rounded border border-border bg-surface px-3 py-2 max-w-sm"
          role="status"
          aria-label={`ตำแหน่งที่เลือก: ${selected.titleTh}`}
        >
          <div className="flex flex-col min-w-0">
            <span
              className={`text-sm font-medium text-ink${isLong ? ' truncate' : ''}`}
              title={isLong ? chipLabel : undefined}
            >
              {selected.titleTh}
            </span>
            <span className="text-xs text-ink-soft">{selected.titleEn}</span>
            <span className="text-xs text-ink-soft mt-0.5">{selected.code}</span>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="humi-link shrink-0 text-xs"
            aria-label="เปลี่ยนตำแหน่งงาน"
          >
            เปลี่ยน
          </button>
        </div>
      </fieldset>
    )
  }

  // ── disabled chip (read-only) ────────────────────────────────────
  if (selected && disabled) {
    return (
      <fieldset>
        <label className="humi-label">
          {label}{required && <span aria-hidden="true" className="humi-asterisk ml-1">*</span>}
        </label>
        <div className="text-sm text-ink">{selected.titleTh}</div>
        <div className="text-xs text-ink-soft">{selected.titleEn}</div>
      </fieldset>
    )
  }

  // ── loading skeleton (I9) ─────────────────────────────────────────
  if (isLoading) {
    return (
      <fieldset>
        <label className="humi-label">
          {label}{required && <span aria-hidden="true" className="humi-asterisk ml-1">*</span>}
        </label>
        <div className="humi-input w-full max-w-sm animate-pulse bg-surface-muted h-10" aria-busy="true" />
      </fieldset>
    )
  }

  // ── main combobox ─────────────────────────────────────────────────
  const activedescendant =
    open && focusedIndex >= 0 && results[focusedIndex]
      ? `${listboxId}-option-${focusedIndex}`
      : undefined

  return (
    <fieldset className="relative">
      <label htmlFor={inputId} className="humi-label">
        {label}{required && <span aria-hidden="true" className="humi-asterisk ml-1">*</span>}
      </label>
      <input
        ref={inputRef}
        id={inputId}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={activedescendant}
        aria-required={required}
        disabled={disabled}
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
          setFocusedIndex(-1)
        }}
        onFocus={() => { if (!open && !disabled) setOpen(true) }}
        onBlur={() => {
          // Small delay — allow click on option to register before closing
          setTimeout(() => setOpen(false), 150)
        }}
        onKeyDown={handleKeyDown}
        className="humi-input w-full max-w-sm"
        autoComplete="off"
      />

      {/* Dropdown listbox */}
      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={`ผลการค้นหา${label}`}
          className="absolute z-50 mt-1 w-full max-w-sm rounded border border-border bg-white shadow-md max-h-60 overflow-y-auto"
        >
          {results.length === 0 ? (
            <li
              role="option"
              aria-selected={false}
              className="px-3 py-2 text-sm text-ink-soft select-none"
              data-testid="no-results"
            >
              <div>ไม่พบตำแหน่งที่ตรงกับคำค้น</div>
              <div className="text-xs mt-0.5">
                {filter
                  ? 'ลองเปลี่ยนเงื่อนไขการกรอง หรือค้นด้วยรหัส'
                  : 'ลองใช้รหัส หรือชื่อภาษาอังกฤษ'}
              </div>
            </li>
          ) : (
            results.map((p, idx) => (
              <li
                key={p.code}
                id={`${listboxId}-option-${idx}`}
                role="option"
                aria-selected={idx === focusedIndex}
                data-testid={`position-option-${p.code}`}
                className={`px-3 py-2 cursor-pointer select-none${idx === focusedIndex ? ' bg-surface-muted' : ' hover:bg-surface-muted'}`}
                onMouseDown={(e) => {
                  // mousedown before blur fires — prevent blur closing list before click registers
                  e.preventDefault()
                  handleSelect(p)
                }}
              >
                <div className="text-sm font-medium text-ink">{p.titleTh}</div>
                <div className="text-xs text-ink-soft">{p.titleEn} · {p.code}</div>
              </li>
            ))
          )}
        </ul>
      )}
    </fieldset>
  )
}
