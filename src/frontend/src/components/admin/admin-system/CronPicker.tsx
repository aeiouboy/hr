// VALIDATION_EXEMPT: presentational primitive — parent form owns validator (per design-gates Track C 2026-04-26)
'use client'

// CronPicker.tsx — visual cron builder (daily/weekly/monthly presets + custom HH:MM)
// Output: cron expression string — ใช้ cronFormat util จาก lib/utils/cronFormat.ts
// Part E Wave 2a — BRD #196

import { useState } from 'react'
import { formatCron } from '@/lib/admin/utils/cronFormat'

type Preset = 'daily' | 'weekly' | 'monthly'

const DAYS_TH = [
  { value: '0', label: 'อาทิตย์' },
  { value: '1', label: 'จันทร์' },
  { value: '2', label: 'อังคาร' },
  { value: '3', label: 'พุธ' },
  { value: '4', label: 'พฤหัสบดี' },
  { value: '5', label: 'ศุกร์' },
  { value: '6', label: 'เสาร์' },
] as const

interface CronPickerProps {
  value: string                  // cron expression
  onChange: (cron: string) => void
}

export function CronPicker({ value, onChange }: CronPickerProps) {
  // Parse initial preset from value
  function detectPreset(cron: string): Preset {
    const p = cron.trim().split(/\s+/)
    if (p.length !== 5) return 'daily'
    if (p[2] !== '*') return 'monthly'
    if (p[4] !== '*') return 'weekly'
    return 'daily'
  }

  const [preset, setPreset] = useState<Preset>(() => detectPreset(value))
  const [hour, setHour] = useState('09')
  const [minute, setMinute] = useState('00')
  const [dayOfWeek, setDayOfWeek] = useState('1')
  const [dayOfMonth, setDayOfMonth] = useState('1')

  function buildCron(): string {
    const m = minute.padStart(2, '0')
    const h = hour.padStart(2, '0')
    if (preset === 'daily') return `${parseInt(m, 10)} ${parseInt(h, 10)} * * *`
    if (preset === 'weekly') return `${parseInt(m, 10)} ${parseInt(h, 10)} * * ${dayOfWeek}`
    // monthly
    return `${parseInt(m, 10)} ${parseInt(h, 10)} ${dayOfMonth} * *`
  }

  function handleChange(updates: Partial<{ preset: Preset; hour: string; minute: string; dayOfWeek: string; dayOfMonth: string }>) {
    const next = {
      preset: updates.preset ?? preset,
      hour: updates.hour ?? hour,
      minute: updates.minute ?? minute,
      dayOfWeek: updates.dayOfWeek ?? dayOfWeek,
      dayOfMonth: updates.dayOfMonth ?? dayOfMonth,
    }
    if (updates.preset !== undefined) setPreset(next.preset)
    if (updates.hour !== undefined) setHour(next.hour)
    if (updates.minute !== undefined) setMinute(next.minute)
    if (updates.dayOfWeek !== undefined) setDayOfWeek(next.dayOfWeek)
    if (updates.dayOfMonth !== undefined) setDayOfMonth(next.dayOfMonth)

    const m = next.minute.padStart(2, '0')
    const h = next.hour.padStart(2, '0')
    let cron = ''
    if (next.preset === 'daily') cron = `${parseInt(m, 10)} ${parseInt(h, 10)} * * *`
    else if (next.preset === 'weekly') cron = `${parseInt(m, 10)} ${parseInt(h, 10)} * * ${next.dayOfWeek}`
    else cron = `${parseInt(m, 10)} ${parseInt(h, 10)} ${next.dayOfMonth} * *`
    onChange(cron)
  }

  const currentCron = buildCron()
  let humanReadable = ''
  try {
    humanReadable = formatCron(currentCron)
  } catch {
    console.warn('[CronPicker] formatCron error — show raw')
    humanReadable = currentCron
  }

  return (
    <div className="space-y-3">
      {/* Preset tabs */}
      <div className="flex gap-1 rounded-lg bg-gray-100 p-1 w-fit">
        {(['daily', 'weekly', 'monthly'] as Preset[]).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => handleChange({ preset: p })}
            className={[
              'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
              preset === p
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700',
            ].join(' ')}
          >
            {p === 'daily' ? 'ทุกวัน' : p === 'weekly' ? 'รายสัปดาห์' : 'รายเดือน'}
          </button>
        ))}
      </div>

      {/* Time inputs */}
      <div className="flex items-center gap-2">
        <label className="text-xs text-gray-500 whitespace-nowrap">เวลา:</label>
        <input
          type="number"
          min={0}
          max={23}
          value={hour}
          onChange={(e) => handleChange({ hour: e.target.value.padStart(2, '0') })}
          aria-label="ชั่วโมง"
          className="w-14 rounded border border-gray-300 px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-gray-400">:</span>
        <input
          type="number"
          min={0}
          max={59}
          value={minute}
          onChange={(e) => handleChange({ minute: e.target.value.padStart(2, '0') })}
          aria-label="นาที"
          className="w-14 rounded border border-gray-300 px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-xs text-gray-400">น.</span>
      </div>

      {/* Weekly: day picker */}
      {preset === 'weekly' && (
        <div className="flex flex-wrap gap-1.5">
          {DAYS_TH.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => handleChange({ dayOfWeek: d.value })}
              className={[
                'rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
                dayOfWeek === d.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-500 hover:border-gray-400',
              ].join(' ')}
            >
              {d.label}
            </button>
          ))}
        </div>
      )}

      {/* Monthly: day of month */}
      {preset === 'monthly' && (
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 whitespace-nowrap">วันที่:</label>
          <input
            type="number"
            min={1}
            max={31}
            value={dayOfMonth}
            onChange={(e) => handleChange({ dayOfMonth: e.target.value })}
            aria-label="วันที่ของเดือน"
            className="w-16 rounded border border-gray-300 px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-xs text-gray-400">ของทุกเดือน</span>
        </div>
      )}

      {/* Human readable + raw cron */}
      <div className="rounded-md bg-gray-50 border border-gray-200 px-3 py-2">
        <p className="text-xs text-gray-500">
          <span className="font-medium text-gray-700">{humanReadable}</span>
          <span className="ml-2 font-mono text-gray-400">({currentCron})</span>
        </p>
      </div>
    </div>
  )
}
