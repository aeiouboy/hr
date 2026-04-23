'use client'

// EffectiveDatePicker.tsx — Date picker สำหรับ lifecycle wizards
// รองรับ label, required marker, touched state (pattern เดียวกับ StepBiographical)
// Emits ISO 8601 string ผ่าน onChange

import { useState } from 'react'

interface EffectiveDatePickerProps {
  label: string
  value: string | null
  onChange: (isoDate: string) => void
  minDate?: string   // ISO date string — ป้องกันเลือกวันในอดีต
  maxDate?: string   // ISO date string
  required?: boolean
  id?: string
}

export function EffectiveDatePicker({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  required = false,
  id = 'effective-date',
}: EffectiveDatePickerProps) {
  // touched state สำหรับแสดง error เฉพาะหลัง user ออกจาก field แล้ว
  const [touched, setTouched] = useState(false)

  const labelId = `${id}-label`
  const hasError = touched && required && (!value || value === '')

  return (
    <div>
      <label id={labelId} htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
      </label>

      <input
        id={id}
        type="date"
        aria-labelledby={labelId}
        aria-required={required}
        aria-invalid={hasError}
        value={value ?? ''}
        min={minDate}
        max={maxDate}
        onChange={(e) => {
          onChange(e.target.value)
          setTouched(true)
        }}
        onBlur={() => setTouched(true)}
        className={[
          'w-full rounded-md border px-3 py-2 text-sm bg-white text-gray-900',
          'focus:outline-none focus:ring-2 focus:ring-blue-500',
          hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
        ].join(' ')}
      />

      {/* Error message เมื่อ touched + required + empty */}
      {hasError && (
        <p className="mt-1 text-xs text-red-600" role="alert">
          กรุณาระบุ{label}
        </p>
      )}
    </div>
  )
}
