/**
 * edit-pencil.test.tsx — EditPencilButton component tests (issue #9)
 * Framework: Vitest + @testing-library/react + jsdom
 *
 * Tests: icon present, onClick handler called, custom aria-label respected
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import thMessages from '../../../messages/th.json';
import enMessages from '../../../messages/en.json';

// Mock next/navigation — component dependency chain
import { usePathname } from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/th/profile/me'),
}));

import { EditPencilButton } from '../profile/EditPencilButton';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderButtonTh(props: { onClick?: () => void; ariaLabel?: string } = {}) {
  const { onClick = vi.fn(), ariaLabel } = props;
  return render(
    <NextIntlClientProvider locale="th" messages={thMessages}>
      <EditPencilButton onClick={onClick} ariaLabel={ariaLabel} />
    </NextIntlClientProvider>,
  );
}

function renderButtonEn(props: { onClick?: () => void; ariaLabel?: string } = {}) {
  const { onClick = vi.fn(), ariaLabel } = props;
  return render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <EditPencilButton onClick={onClick} ariaLabel={ariaLabel} />
    </NextIntlClientProvider>,
  );
}

// ─── Icon presence ────────────────────────────────────────────────────────────

describe('EditPencilButton — icon', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/th/profile/me');
  });

  it('renders a button element', () => {
    renderButtonTh();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders Pencil SVG icon inside the button', () => {
    renderButtonTh();
    const btn = screen.getByRole('button');
    const svg = btn.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('SVG has lucide pencil dimensions class h-4 w-4', () => {
    renderButtonTh();
    const btn = screen.getByRole('button');
    const svg = btn.querySelector('svg');
    // lucide-react sets className on svg
    expect(svg?.getAttribute('class')).toMatch(/h-4/);
    expect(svg?.getAttribute('class')).toMatch(/w-4/);
  });
});

// ─── Click handler ────────────────────────────────────────────────────────────

describe('EditPencilButton — click handler', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/th/profile/me');
  });

  it('calls onClick when clicked once', () => {
    const handler = vi.fn();
    renderButtonTh({ onClick: handler });
    fireEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledOnce();
  });

  it('calls onClick with no args (click event)', () => {
    const handler = vi.fn();
    renderButtonTh({ onClick: handler });
    fireEvent.click(screen.getByRole('button'));
    // handler receives MouseEvent — just verify it was called
    expect(handler).toHaveBeenCalled();
  });

  it('calls onClick twice on two clicks', () => {
    const handler = vi.fn();
    renderButtonTh({ onClick: handler });
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledTimes(2);
  });
});

// ─── aria-label ───────────────────────────────────────────────────────────────

describe('EditPencilButton — aria-label', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/th/profile/me');
  });

  it('uses default i18n aria-label from gate.editAria when none provided (TH)', () => {
    renderButtonTh();
    const btn = screen.getByRole('button');
    // th.json gate.editAria = "แก้ไขข้อมูล"
    expect(btn).toHaveAttribute('aria-label', 'แก้ไขข้อมูล');
  });

  it('uses custom aria-label when provided', () => {
    renderButtonTh({ ariaLabel: 'แก้ไขข้อมูลส่วนตัว' });
    expect(screen.getByRole('button', { name: 'แก้ไขข้อมูลส่วนตัว' })).toBeInTheDocument();
  });

  it('custom aria-label overrides i18n default', () => {
    renderButtonTh({ ariaLabel: 'Edit Personal Info' });
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-label', 'Edit Personal Info');
  });

  it('uses default EN aria-label when none provided (EN locale)', () => {
    vi.mocked(usePathname).mockReturnValueOnce('/en/profile/me');
    renderButtonEn();
    const btn = screen.getByRole('button');
    // en.json gate.editAria = "Edit section"
    expect(btn).toHaveAttribute('aria-label', 'Edit section');
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('EditPencilButton — accessibility', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/th/profile/me');
  });

  it('button is accessible by aria-label (getByRole)', () => {
    renderButtonTh();
    expect(screen.getByRole('button', { name: /แก้ไขข้อมูล/i })).toBeInTheDocument();
  });

  it('does not throw when rendered without ariaLabel prop', () => {
    expect(() => renderButtonTh()).not.toThrow();
  });
});
