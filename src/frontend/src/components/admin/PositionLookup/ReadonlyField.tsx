'use client'

// ReadonlyField.tsx — แสดงค่า cascade field แบบ read-only หลัง PositionLookup เลือกแล้ว
interface ReadonlyFieldProps {
  label: string
  value: string
}

export function ReadonlyField({ label, value }: ReadonlyFieldProps) {
  return (
    <div className="flex items-baseline gap-2 py-1">
      <span className="text-xs text-ink-soft w-28 shrink-0">{label}</span>
      <span className="text-sm text-ink">{value}</span>
    </div>
  )
}
