/**
 * effective-date-gate.test.tsx — EffectiveDateGate component tests (issue #9)
 * Framework: Vitest + @testing-library/react + jsdom
 *
 * AC-3: Gate Step 1 shows ONLY date picker + section title + Continue + Cancel
 * AC-4: Continue disabled when no date selected
 * AC-5: Selecting valid date (today/future) enables Continue
 * AC-6: Click Continue → Step 2 renders form children
 * AC-7: Cancel at any step closes gate AND does NOT call onConfirm
 * AC-9: i18n TH+EN parity — all gate.* keys render in both locales
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import thMessages from '../../../messages/th.json';
import enMessages from '../../../messages/en.json';

// Mock next/navigation — used by child components that may import it
import { usePathname } from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/th/profile/me'),
}));

import { EffectiveDateGate } from '../profile/EffectiveDateGate';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Format Date as YYYY-MM-DD (local timezone) — mirrors component logic */
function toDateInputValue(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function todayStr(): string {
  return toDateInputValue(new Date());
}

function tomorrowStr(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return toDateInputValue(d);
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return toDateInputValue(d);
}

interface GateProps {
  open?: boolean;
  onClose?: () => void;
  onConfirm?: (effectiveDate: Date, formValues: unknown) => void;
  sectionTitle?: string;
  children?: (effectiveDate: Date) => React.ReactNode;
}

function renderGateTh(props: GateProps = {}) {
  const {
    open = true,
    onClose = vi.fn(),
    onConfirm = vi.fn(),
    sectionTitle = 'ข้อมูลส่วนตัว',
    children = (d: Date) => <div data-testid="form-children">Form effective: {d.toISOString()}</div>,
  } = props;
  return render(
    <NextIntlClientProvider locale="th" messages={thMessages}>
      <EffectiveDateGate
        open={open}
        onClose={onClose}
        onConfirm={onConfirm}
        sectionTitle={sectionTitle}
      >
        {children}
      </EffectiveDateGate>
    </NextIntlClientProvider>,
  );
}

function renderGateEn(props: GateProps = {}) {
  const {
    open = true,
    onClose = vi.fn(),
    onConfirm = vi.fn(),
    sectionTitle = 'Personal Information',
    children = (d: Date) => <div data-testid="form-children">Form effective: {d.toISOString()}</div>,
  } = props;
  return render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <EffectiveDateGate
        open={open}
        onClose={onClose}
        onConfirm={onConfirm}
        sectionTitle={sectionTitle}
      >
        {children}
      </EffectiveDateGate>
    </NextIntlClientProvider>,
  );
}

// ─── AC-3: Gate Step 1 isolated UI ───────────────────────────────────────────

describe('AC-3: EffectiveDateGate Step 1 — isolated UI (TH locale)', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/th/profile/me');
  });

  it('renders section title in Step 1 (AC-3)', () => {
    renderGateTh({ sectionTitle: 'ข้อมูลส่วนตัว' });
    expect(screen.getByText('ข้อมูลส่วนตัว')).toBeInTheDocument();
  });

  it('renders gate.title label (AC-3)', () => {
    renderGateTh();
    // th: "วันที่การแก้ไขนี้มีผล"
    expect(screen.getByText('วันที่การแก้ไขนี้มีผล')).toBeInTheDocument();
  });

  it('renders date input field in Step 1 (AC-3)', () => {
    renderGateTh();
    // <input type="date"> has no implicit textbox role per WAI-ARIA 1.2;
    // query by selector instead
    const input = document.querySelector('input[type="date"]');
    expect(input).not.toBeNull();
  });

  it('renders Continue button in Step 1 (AC-3)', () => {
    renderGateTh();
    // th: "ต่อไป"
    expect(screen.getByRole('button', { name: /ต่อไป/i })).toBeInTheDocument();
  });

  it('renders Cancel button in Step 1 (AC-3)', () => {
    renderGateTh();
    // th: "ยกเลิก"
    expect(screen.getByRole('button', { name: /ยกเลิก/i })).toBeInTheDocument();
  });

  it('does NOT render form children in Step 1 — only date picker visible (AC-3)', () => {
    renderGateTh();
    expect(screen.queryByTestId('form-children')).toBeNull();
  });

  it('does NOT show Back button in Step 1 (AC-3)', () => {
    renderGateTh();
    // th: "ย้อนกลับ"
    expect(screen.queryByRole('button', { name: /ย้อนกลับ/i })).toBeNull();
  });

  it('does NOT show Save button in Step 1 (AC-3)', () => {
    renderGateTh();
    // th: "บันทึก"
    expect(screen.queryByRole('button', { name: /^บันทึก$/i })).toBeNull();
  });
});

// ─── AC-4: Continue disabled when no date selected ────────────────────────────

describe('AC-4: Continue disabled when no date selected', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/th/profile/me');
  });

  it('Continue button has disabled attribute when no date entered (AC-4)', () => {
    renderGateTh();
    const btn = screen.getByRole('button', { name: /ต่อไป/i });
    // Component sets both disabled and aria-disabled
    expect(btn).toHaveAttribute('disabled');
  });

  it('Continue button has aria-disabled="true" when no date entered (AC-4)', () => {
    renderGateTh();
    const btn = screen.getByRole('button', { name: /ต่อไป/i });
    expect(btn).toHaveAttribute('aria-disabled', 'true');
  });
});

// ─── AC-5: Valid date enables Continue ────────────────────────────────────────

describe('AC-5: Selecting valid date enables Continue', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/th/profile/me');
  });

  it('Continue enabled after typing today\'s date (AC-5)', () => {
    renderGateTh();
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: todayStr() } });
    const btn = screen.getByRole('button', { name: /ต่อไป/i });
    expect(btn).not.toHaveAttribute('disabled');
    expect(btn).toHaveAttribute('aria-disabled', 'false');
  });

  it('Continue enabled after selecting future date (AC-5)', () => {
    renderGateTh();
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: tomorrowStr() } });
    const btn = screen.getByRole('button', { name: /ต่อไป/i });
    expect(btn).not.toHaveAttribute('disabled');
  });

  it('Continue remains disabled for past date (AC-5 boundary)', () => {
    renderGateTh();
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: yesterdayStr() } });
    const btn = screen.getByRole('button', { name: /ต่อไป/i });
    expect(btn).toHaveAttribute('disabled');
  });

  it('error message shown for past date (AC-5 boundary)', () => {
    renderGateTh();
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: yesterdayStr() } });
    // th: "เลือกวันที่ตั้งแต่วันนี้เป็นต้นไป"
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert').textContent).toMatch(/วันที่ตั้งแต่วันนี้/);
  });

  it('error cleared when valid date typed after invalid (AC-5)', () => {
    renderGateTh();
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: yesterdayStr() } });
    expect(screen.getByRole('alert')).toBeInTheDocument();
    fireEvent.change(input, { target: { value: todayStr() } });
    expect(screen.queryByRole('alert')).toBeNull();
  });
});

// ─── AC-6: Continue → Step 2 renders form children ───────────────────────────

describe('AC-6: Click Continue transitions to Step 2', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/th/profile/me');
  });

  it('renders form children after valid date + Continue (AC-6)', () => {
    renderGateTh();
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: todayStr() } });
    fireEvent.click(screen.getByRole('button', { name: /ต่อไป/i }));
    expect(screen.getByTestId('form-children')).toBeInTheDocument();
  });

  it('render-prop child receives effectiveDate as Date object (AC-6)', () => {
    const childFn = vi.fn((_d: Date) => <div data-testid="child-called">called</div>);
    renderGateTh({ children: childFn });
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: todayStr() } });
    fireEvent.click(screen.getByRole('button', { name: /ต่อไป/i }));
    expect(screen.getByTestId('child-called')).toBeInTheDocument();
    expect(childFn).toHaveBeenCalledWith(expect.any(Date));
  });

  it('date picker hidden in Step 2 (AC-6)', () => {
    renderGateTh();
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: todayStr() } });
    fireEvent.click(screen.getByRole('button', { name: /ต่อไป/i }));
    // In step 2 the date input is no longer rendered
    expect(document.querySelector('input[type="date"]')).toBeNull();
  });

  it('Step 2 renders Back + Save + Cancel buttons (AC-6)', () => {
    renderGateTh();
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: todayStr() } });
    fireEvent.click(screen.getByRole('button', { name: /ต่อไป/i }));
    expect(screen.getByRole('button', { name: /ย้อนกลับ/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^บันทึก$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ยกเลิก/i })).toBeInTheDocument();
  });
});

// ─── AC-7: Cancel closes gate without calling onConfirm ──────────────────────

describe('AC-7: Cancel closes gate and does NOT call onConfirm', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/th/profile/me');
  });

  it('AC-7a: Cancel in Step 1 calls onClose', () => {
    const onClose = vi.fn();
    const onConfirm = vi.fn();
    renderGateTh({ onClose, onConfirm });
    fireEvent.click(screen.getByRole('button', { name: /ยกเลิก/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('AC-7a: Cancel in Step 1 does NOT call onConfirm', () => {
    const onClose = vi.fn();
    const onConfirm = vi.fn();
    renderGateTh({ onClose, onConfirm });
    fireEvent.click(screen.getByRole('button', { name: /ยกเลิก/i }));
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('AC-7b: Cancel in Step 2 calls onClose', () => {
    const onClose = vi.fn();
    const onConfirm = vi.fn();
    renderGateTh({ onClose, onConfirm });
    // Advance to step 2
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: todayStr() } });
    fireEvent.click(screen.getByRole('button', { name: /ต่อไป/i }));
    // Click Cancel in Step 2
    fireEvent.click(screen.getByRole('button', { name: /ยกเลิก/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('AC-7b: Cancel in Step 2 does NOT call onConfirm', () => {
    const onClose = vi.fn();
    const onConfirm = vi.fn();
    renderGateTh({ onClose, onConfirm });
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: todayStr() } });
    fireEvent.click(screen.getByRole('button', { name: /ต่อไป/i }));
    fireEvent.click(screen.getByRole('button', { name: /ยกเลิก/i }));
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('AC-7c: Save in Step 2 calls onConfirm with effectiveDate + values', () => {
    const onClose = vi.fn();
    const onConfirm = vi.fn();
    renderGateTh({ onClose, onConfirm });
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: todayStr() } });
    fireEvent.click(screen.getByRole('button', { name: /ต่อไป/i }));
    fireEvent.click(screen.getByRole('button', { name: /^บันทึก$/i }));
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(onConfirm).toHaveBeenCalledWith(expect.any(Date), expect.anything());
  });

  it('AC-7c: Save calls onConfirm with correct effectiveDate (today)', () => {
    const onConfirm = vi.fn();
    renderGateTh({ onConfirm });
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: todayStr() } });
    fireEvent.click(screen.getByRole('button', { name: /ต่อไป/i }));
    fireEvent.click(screen.getByRole('button', { name: /^บันทึก$/i }));
    const calledDate = onConfirm.mock.calls[0][0] as Date;
    // effectiveDate should match todayStr (local midnight)
    expect(toDateInputValue(calledDate)).toBe(todayStr());
  });

  it('Back button returns to Step 1 without calling onClose (AC-6 + AC-7)', () => {
    const onClose = vi.fn();
    renderGateTh({ onClose });
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: todayStr() } });
    fireEvent.click(screen.getByRole('button', { name: /ต่อไป/i }));
    fireEvent.click(screen.getByRole('button', { name: /ย้อนกลับ/i }));
    // Step 1 restored
    expect(document.querySelector('input[type="date"]')).not.toBeNull();
    expect(onClose).not.toHaveBeenCalled();
  });
});

// ─── AC-9: i18n TH+EN parity ─────────────────────────────────────────────────

describe('AC-9: i18n TH+EN parity — all gate.* keys', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/th/profile/me');
  });

  it('TH: gate.title renders "วันที่การแก้ไขนี้มีผล" (AC-9)', () => {
    renderGateTh();
    expect(screen.getByText('วันที่การแก้ไขนี้มีผล')).toBeInTheDocument();
  });

  it('TH: gate.continue renders "ต่อไป" (AC-9)', () => {
    renderGateTh();
    expect(screen.getByRole('button', { name: /ต่อไป/i })).toBeInTheDocument();
  });

  it('TH: gate.cancel renders "ยกเลิก" (AC-9)', () => {
    renderGateTh();
    expect(screen.getByRole('button', { name: /ยกเลิก/i })).toBeInTheDocument();
  });

  it('TH: gate.save renders "บันทึก" in Step 2 (AC-9)', () => {
    renderGateTh();
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: todayStr() } });
    fireEvent.click(screen.getByRole('button', { name: /ต่อไป/i }));
    expect(screen.getByRole('button', { name: /^บันทึก$/i })).toBeInTheDocument();
  });

  it('TH: gate.back renders "ย้อนกลับ" in Step 2 (AC-9)', () => {
    renderGateTh();
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: todayStr() } });
    fireEvent.click(screen.getByRole('button', { name: /ต่อไป/i }));
    expect(screen.getByRole('button', { name: /ย้อนกลับ/i })).toBeInTheDocument();
  });

  it('TH: gate.invalidDate renders for past date (AC-9)', () => {
    renderGateTh();
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: yesterdayStr() } });
    expect(screen.getByRole('alert').textContent).toMatch(/เลือกวันที่ตั้งแต่วันนี้เป็นต้นไป/);
  });

  it('EN: gate.title renders "When should these changes take effect?" (AC-9)', () => {
    renderGateEn();
    expect(screen.getByText('When should these changes take effect?')).toBeInTheDocument();
  });

  it('EN: gate.continue renders "Continue" (AC-9)', () => {
    renderGateEn();
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  it('EN: gate.cancel renders "Cancel" (AC-9)', () => {
    renderGateEn();
    expect(screen.getByRole('button', { name: /^cancel$/i })).toBeInTheDocument();
  });

  it('EN: gate.save renders "Save" in Step 2 (AC-9)', () => {
    renderGateEn();
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: todayStr() } });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByRole('button', { name: /^save$/i })).toBeInTheDocument();
  });

  it('EN: gate.back renders "Back" in Step 2 (AC-9)', () => {
    renderGateEn();
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: todayStr() } });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByRole('button', { name: /^back$/i })).toBeInTheDocument();
  });

  it('EN: gate.invalidDate renders for past date (AC-9)', () => {
    renderGateEn();
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: yesterdayStr() } });
    expect(screen.getByRole('alert').textContent).toMatch(/Please select today or a future date/);
  });

  it('component does not crash when open=false (guard)', () => {
    expect(() => renderGateTh({ open: false })).not.toThrow();
  });
});
