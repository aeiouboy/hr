// EffectiveDateGate.test.tsx — spec B1 System Invariants I1-I8
// Framework: Vitest + @testing-library/react + jsdom
//
// I1  Date picker is the only visible field on initial mount; child NOT visible
// I2  Save/Submit buttons within child are disabled until gate is confirmed
// I3  Gate confirm rejects empty / invalid date (stays on gate)
// I4  After gate confirm, effectiveDate propagates to child via render-prop
// I5  Ribbon shows formatted Thai date, not ISO
// I6  Past-date confirm shows recompute warning
// I7  Future-date confirm shows "not yet on profile" banner
// I8  Changing effective date after child has data does NOT clear child data

import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { EffectiveDateGate } from './EffectiveDateGate'

// ─── Date helpers ──────────────────────────────────────────────

function localISO(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function todayStr(): string {
  return localISO(new Date())
}

function tomorrowStr(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return localISO(d)
}

function yesterdayStr(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return localISO(d)
}

// ─── Fixtures ─────────────────────────────────────────────────

/** Confirm the gate with a given ISO date value */
function confirmGate(dateValue: string) {
  const input = document.querySelector('input[type="date"]') as HTMLInputElement
  fireEvent.change(input, { target: { value: dateValue } })
  fireEvent.click(screen.getByRole('button', { name: /ยืนยันวันที่มีผล/i }))
}

/** Minimal child that exposes a data-testid, a submit button, and an input */
function ChildFixture({ effectiveDate }: { effectiveDate: string }) {
  return (
    <div data-testid="child-form-inner">
      <span data-testid="received-date">{effectiveDate}</span>
      <input data-testid="child-input" defaultValue="" />
      <button type="button">บันทึก</button>
      <button type="submit">ส่ง</button>
    </div>
  )
}

// ─── I1: Only date picker visible on initial mount ─────────────

describe('I1 — initial mount: only date picker visible, child hidden', () => {
  it('shows the date input on initial mount', () => {
    render(
      <EffectiveDateGate>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    const input = document.querySelector('input[type="date"]')
    expect(input).not.toBeNull()
    expect(input).toBeVisible()
  })

  it('does NOT render child-form before gate is confirmed (I1)', () => {
    render(
      <EffectiveDateGate>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    // Spec §4 I1: expect(screen.queryByTestId('child-form')).toBeNull()
    expect(screen.queryByTestId('child-form')).toBeNull()
  })

  it('aria-label on date input matches label prop', () => {
    render(
      <EffectiveDateGate label="วันที่มีผล">
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    const input = document.querySelector('input[type="date"]') as HTMLInputElement
    expect(input.getAttribute('aria-label')).toMatch(/วันที่มีผล/)
  })
})

// ─── I2: Save/Submit disabled until gate confirmed ─────────────

describe('I2 — Save/Submit buttons disabled before gate confirmation', () => {
  it('submit-like buttons do NOT appear before gate is confirmed (I2)', () => {
    render(
      <EffectiveDateGate>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    // Child is not mounted yet — บันทึก/ส่ง must not be in DOM
    // Spec §4 I2: expect(screen.getByRole('button', { name: /save|ยืนยัน|submit/i })).toBeDisabled()
    // Here: child not rendered → button simply absent (same semantic: cannot be used)
    expect(screen.queryByRole('button', { name: /^บันทึก$/i })).toBeNull()
    expect(screen.queryByRole('button', { name: /^ส่ง$/i })).toBeNull()
  })

  it('confirm button itself is disabled when no date entered (I2)', () => {
    render(
      <EffectiveDateGate>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    const btn = screen.getByRole('button', { name: /ยืนยันวันที่มีผล/i })
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute('aria-disabled', 'true')
  })

  it('confirm button enabled only after valid date (today) is entered', () => {
    render(
      <EffectiveDateGate>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    const input = document.querySelector('input[type="date"]') as HTMLInputElement
    fireEvent.change(input, { target: { value: todayStr() } })
    const btn = screen.getByRole('button', { name: /ยืนยันวันที่มีผล/i })
    expect(btn).not.toBeDisabled()
  })
})

// ─── I3: Gate stays on screen when no/invalid date ────────────

describe('I3 — gate rejects empty or invalid date on confirm', () => {
  it('clicking confirm with empty value keeps gate visible (I3)', () => {
    render(
      <EffectiveDateGate>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    // Confirm button is disabled — clicking does nothing; gate stays on screen
    const btn = screen.getByRole('button', { name: /ยืนยันวันที่มีผล/i })
    fireEvent.click(btn)
    // Gate still visible (date input present)
    expect(document.querySelector('input[type="date"]')).not.toBeNull()
    // Child NOT mounted
    expect(screen.queryByTestId('child-form')).toBeNull()
  })

  it('past date keeps confirm disabled (I3)', () => {
    render(
      <EffectiveDateGate>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    const input = document.querySelector('input[type="date"]') as HTMLInputElement
    fireEvent.change(input, { target: { value: yesterdayStr() } })
    const btn = screen.getByRole('button', { name: /ยืนยันวันที่มีผล/i })
    expect(btn).toBeDisabled()
  })

  it('past date shows validation error message (I3)', () => {
    render(
      <EffectiveDateGate>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    const input = document.querySelector('input[type="date"]') as HTMLInputElement
    fireEvent.change(input, { target: { value: yesterdayStr() } })
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByRole('alert').textContent).toMatch(/ย้อนหลัง|อดีต|ตั้งแต่วันนี้/i)
  })
})

// ─── I4: effectiveDate propagates to child ─────────────────────

describe('I4 — effectiveDate ISO-8601 propagates to child via render-prop', () => {
  it('child receives effectiveDate as ISO-8601 string (I4)', () => {
    render(
      <EffectiveDateGate>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    confirmGate(todayStr())
    // child-form is now in DOM
    expect(screen.getByTestId('child-form')).toBeInTheDocument()
    // received-date shows the ISO date we passed in
    expect(screen.getByTestId('received-date').textContent).toBe(todayStr())
  })

  it('effectiveDate in child matches the value entered in gate (I4)', () => {
    render(
      <EffectiveDateGate>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    confirmGate(tomorrowStr())
    expect(screen.getByTestId('received-date').textContent).toBe(tomorrowStr())
  })
})

// ─── I5: Ribbon shows formatted Thai date ─────────────────────

describe('I5 — ribbon shows Thai-formatted date, not ISO', () => {
  it('ribbon text does NOT contain the raw ISO date (I5)', () => {
    render(
      <EffectiveDateGate>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    confirmGate(todayStr())
    const ribbon = screen.getByTestId('effective-date-ribbon')
    // Should NOT display ISO like "2026-04-23"
    expect(ribbon.textContent).not.toMatch(/\d{4}-\d{2}-\d{2}/)
  })

  it('ribbon contains Thai month abbreviation (I5)', () => {
    // Spec §4 I5: expect(ribbon).toHaveTextContent(/\d{1,2}\s(มกราคม|...|เม.ย.|...)\s25\d{2}/)
    render(
      <EffectiveDateGate>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    confirmGate(todayStr())
    const ribbon = screen.getByTestId('effective-date-ribbon')
    // Thai short month abbreviations used in th-TH locale (เม.ย., ม.ค., ก.พ., etc.)
    expect(ribbon.textContent).toMatch(
      /มกราคม|กุมภาพันธ์|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม|ม\.ค\.|ก\.พ\.|มี\.ค\.|เม\.ย\.|พ\.ค\.|มิ\.ย\.|ก\.ค\.|ส\.ค\.|ก\.ย\.|ต\.ค\.|พ\.ย\.|ธ\.ค\./,
    )
  })

  it('ribbon text contains "มีผลตั้งแต่" prefix (I5)', () => {
    render(
      <EffectiveDateGate>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    confirmGate(todayStr())
    expect(screen.getByTestId('effective-date-ribbon').textContent).toMatch(/มีผลตั้งแต่/)
  })
})

// ─── I6: Past-date confirm shows recompute warning ────────────

describe('I6 — past-date confirmed via initialEffectiveDate shows recompute warning', () => {
  it('recompute warning visible when initialEffectiveDate is in the past (I6)', () => {
    // Note: gate input blocks past dates, so past-date path is exercised via
    // initialEffectiveDate (pre-confirmed) which bypasses the gate input validation.
    // This represents editing an existing record that already has a past effective date.
    render(
      <EffectiveDateGate initialEffectiveDate={yesterdayStr()}>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    // Spec §4 I6: expect(screen.getByRole('alert')).toHaveTextContent(/recompute|ย้อนหลัง/i)
    const alert = screen.getByRole('alert')
    expect(alert.textContent).toMatch(/recompute|ย้อนหลัง/i)
  })

  it('past-date ribbon visible when initialEffectiveDate is in the past (I6)', () => {
    render(
      <EffectiveDateGate initialEffectiveDate={yesterdayStr()}>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    expect(screen.getByTestId('effective-date-ribbon')).toBeInTheDocument()
    expect(screen.getByTestId('child-form')).toBeInTheDocument()
  })
})

// ─── I7: Future-date confirm shows "not yet on profile" ────────

describe('I7 — future-date confirmed shows "not yet on profile" banner', () => {
  it('future date banner shows "ยังไม่ปรากฏ" / "อนาคต" text (I7)', () => {
    render(
      <EffectiveDateGate>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    confirmGate(tomorrowStr())
    // Spec §4 I7: expect(screen.getByRole('alert')).toHaveTextContent(/ยังไม่ปรากฏ|future|อนาคต/i)
    const alert = screen.getByRole('alert')
    expect(alert.textContent).toMatch(/ยังไม่ปรากฏ|อนาคต/i)
  })

  it('future date banner uses role="alert" (I7)', () => {
    render(
      <EffectiveDateGate>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    confirmGate(tomorrowStr())
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('today date does NOT show future banner (I7 — decision §9.1)', () => {
    render(
      <EffectiveDateGate>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    confirmGate(todayStr())
    // No alert for present date
    expect(screen.queryByRole('alert')).toBeNull()
  })
})

// ─── I8: Child data preserved when gate is reopened ───────────

describe('I8 — child data preserved across gate reopen', () => {
  it('child input value preserved after reopening gate via ribbon and cancelling (I8)', () => {
    render(
      <EffectiveDateGate>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    // 1. Confirm gate
    confirmGate(todayStr())

    // 2. Type into child input
    const childInput = screen.getByTestId('child-input') as HTMLInputElement
    fireEvent.change(childInput, { target: { value: 'นิรันดร์' } })
    expect(childInput.value).toBe('นิรันดร์')

    // 3. Click "เปลี่ยน" to open modal
    fireEvent.click(screen.getByRole('button', { name: /เปลี่ยน/i }))

    // 4. Modal is open (dialog role)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // 5. Cancel modal — child stays mounted, data preserved
    fireEvent.click(screen.getByRole('button', { name: /ยกเลิก/i }))

    // 6. Child form still in DOM with same value
    expect(screen.getByTestId('child-form')).toBeInTheDocument()
    expect((screen.getByTestId('child-input') as HTMLInputElement).value).toBe('นิรันดร์')
  })

  it('child data preserved after gate reopened with new date (I8)', () => {
    render(
      <EffectiveDateGate>
        {({ effectiveDate }) => <ChildFixture effectiveDate={effectiveDate} />}
      </EffectiveDateGate>,
    )
    // Confirm gate (today)
    confirmGate(todayStr())

    // Type into child input
    const childInput = screen.getByTestId('child-input') as HTMLInputElement
    fireEvent.change(childInput, { target: { value: 'สมชาย' } })
    expect(childInput.value).toBe('สมชาย')

    // Reopen gate via "เปลี่ยน" ribbon link → modal opens
    fireEvent.click(screen.getByRole('button', { name: /เปลี่ยน/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // Confirm with new date (tomorrow) via modal date input
    // Modal renders a second date input — query all date inputs and use the last one
    const dateInputs = document.querySelectorAll('input[type="date"]')
    const modalDateInput = dateInputs[dateInputs.length - 1] as HTMLInputElement
    fireEvent.change(modalDateInput, { target: { value: tomorrowStr() } })
    fireEvent.click(screen.getByRole('button', { name: /ยืนยันวันที่มีผล/i }))

    // Modal closed
    expect(screen.queryByRole('dialog')).toBeNull()

    // Child still mounted, user-entered data preserved (I8)
    expect(screen.getByTestId('child-form')).toBeInTheDocument()
    expect((screen.getByTestId('child-input') as HTMLInputElement).value).toBe('สมชาย')

    // Ribbon updated to new date
    expect(screen.getByTestId('effective-date-ribbon')).toBeInTheDocument()
  })
})
