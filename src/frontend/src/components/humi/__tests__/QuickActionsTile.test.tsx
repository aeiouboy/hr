/**
 * QuickActionsTile.test.tsx — vitest unit tests
 * BRD #171 — ESS Quick Actions Tile (hr#75)
 * AC3.1 12-tile count | AC3.2 no calendar | AC3.4 tone tokens
 * AC3.5 bilingual labels | AC-4 COMPONENT API | AC-6 ISOLATION
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QuickActionsTile, DEFAULT_ESS_ACTIONS, type QuickAction } from '../molecules/QuickActionsTile';

// Helper: safely coerce className (may be SVGAnimatedString on SVG nodes).
function cls(el: Element): string {
  return typeof el.className === 'string'
    ? el.className
    : String((el.className as SVGAnimatedString).baseVal ?? '');
}

// ────────────────────────────────────────────────────────────
// AC-1 RENDER — humi-card region + header
// ────────────────────────────────────────────────────────────
describe('QuickActionsTile — AC-1 RENDER', () => {
  it('renders ใน region ที่มี aria-label "เมนูลัด"', () => {
    render(<QuickActionsTile />);
    expect(screen.getByRole('region', { name: 'เมนูลัด' })).toBeInTheDocument();
  });

  it('header text "เมนูลัด" ปรากฏใน DOM', () => {
    render(<QuickActionsTile />);
    const matches = screen.getAllByText('เมนูลัด');
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });
});

// ────────────────────────────────────────────────────────────
// AC3.1 — 11 tiles for full/admin persona
// (P1 Item 2: the all-roles "Directory" → /admin/employees tile was cut as a
//  false affordance for non-admin roles, 12 → 11.)
// ────────────────────────────────────────────────────────────
describe('QuickActionsTile — AC3.1 11 tiles', () => {
  it('DEFAULT_ESS_ACTIONS exports exactly 11 รายการ', () => {
    expect(DEFAULT_ESS_ACTIONS).toHaveLength(11);
  });

  it('renders 11 action links when no props.actions passed', () => {
    render(<QuickActionsTile />);
    expect(screen.getAllByRole('link')).toHaveLength(11);
  });

  it('show field is present on at least one role-restricted tile', () => {
    const gated = DEFAULT_ESS_ACTIONS.filter((a) => a.show && a.show.length > 0);
    expect(gated.length).toBeGreaterThanOrEqual(1);
  });

  it('employee-visible tiles number at least 10', () => {
    // P1 Item 2 cut the un-gated "Directory" tile (12 → 11 total, 11 → 10 employee-visible).
    const employeeVisible = DEFAULT_ESS_ACTIONS.filter(
      (a) => !a.show || a.show.includes('Employee'),
    );
    expect(employeeVisible.length).toBeGreaterThanOrEqual(10);
  });
});

// ────────────────────────────────────────────────────────────
// AC3.2 — No calendar grid
// ────────────────────────────────────────────────────────────
describe('QuickActionsTile — AC3.2 no calendar', () => {
  it('queryByRole("grid") is absent from QuickActionsTile', () => {
    render(<QuickActionsTile />);
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
  });

  it('no element with humi-cal class inside tile', () => {
    const { container } = render(<QuickActionsTile />);
    expect(container.querySelector('.humi-cal')).toBeNull();
  });
});

// ────────────────────────────────────────────────────────────
// AC3.4 — Tone tokens: no Tailwind red/rose/pink, no hex
// ────────────────────────────────────────────────────────────
describe('QuickActionsTile — AC3.4 tone token scan', () => {
  it('each badge span className includes a valid tone token class', () => {
    const { container } = render(<QuickActionsTile />);
    const badgeSpans = Array.from(
      container.querySelectorAll('.humi-quick-action-item span[aria-hidden="true"]'),
    );
    expect(badgeSpans.length).toBe(11);
    const tonePatterns = [
      /bg-accent-soft/,
      /bg-\[var\(--color-accent-alt-soft\)\]/,
      /bg-warning-soft/,
    ];
    badgeSpans.forEach((span) => {
      const hasTone = tonePatterns.some((p) => p.test(cls(span)));
      expect(hasTone).toBe(true);
    });
  });

  it('no className contains red/rose/pink Tailwind color', () => {
    const { container } = render(<QuickActionsTile />);
    const allEls = Array.from(container.querySelectorAll('[class]'));
    const badPattern = /(^|\s)(bg|text|border)-(red|rose|pink)-\d/;
    allEls.forEach((el) => {
      expect(cls(el)).not.toMatch(badPattern);
    });
  });

  it('no inline style contains a hex color', () => {
    const { container } = render(<QuickActionsTile />);
    const allEls = Array.from(container.querySelectorAll('[style]'));
    const hexPattern = /#([0-9a-fA-F]{3,8})\b/;
    allEls.forEach((el) => {
      const style = (el as HTMLElement).getAttribute('style') ?? '';
      expect(style).not.toMatch(hexPattern);
    });
  });
});

// ────────────────────────────────────────────────────────────
// AC3.5 — Bilingual labels resolve both locales
// ────────────────────────────────────────────────────────────
describe('QuickActionsTile — AC3.5 bilingual labels', () => {
  it('every DEFAULT_ESS_ACTIONS entry has non-empty labelEn', () => {
    DEFAULT_ESS_ACTIONS.forEach((action) => {
      expect(action.labelEn).toBeTruthy();
      expect(action.labelEn.length).toBeGreaterThan(0);
    });
  });

  it('every DEFAULT_ESS_ACTIONS entry has non-empty labelTh', () => {
    DEFAULT_ESS_ACTIONS.forEach((action) => {
      expect(action.labelTh).toBeTruthy();
      expect(action.labelTh.length).toBeGreaterThan(0);
    });
  });

  it('renders labelTh when locale=th (default)', () => {
    render(<QuickActionsTile locale="th" />);
    expect(screen.getByRole('link', { name: 'ขอลาหยุด' })).toBeInTheDocument();
  });

  it('renders labelEn when locale=en', () => {
    render(<QuickActionsTile locale="en" />);
    expect(screen.getByRole('link', { name: 'Time Off' })).toBeInTheDocument();
  });

  it('labelEn contains no Thai characters', () => {
    DEFAULT_ESS_ACTIONS.forEach((action) => {
      const thaiChars = (action.labelEn.match(/[฀-๿]/g) ?? []).length;
      expect(thaiChars).toBe(0);
    });
  });
});

// ────────────────────────────────────────────────────────────
// AC-4 COMPONENT API — props.actions override
// ────────────────────────────────────────────────────────────
describe('QuickActionsTile — AC-4 COMPONENT API', () => {
  it('รับ props.actions override → render ตาม props ไม่ใช่ DEFAULT_ESS_ACTIONS', () => {
    const customActions: QuickAction[] = [
      { icon: <span data-testid="custom-icon" />, labelTh: 'ทดสอบ', labelEn: 'Test', href: '/test', tone: 'teal' },
    ];
    render(<QuickActionsTile actions={customActions} />);
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.getByRole('link', { name: 'ทดสอบ' })).toHaveAttribute('href', '/test');
    expect(screen.queryByRole('link', { name: 'ขอลาหยุด' })).not.toBeInTheDocument();
  });

  it('empty actions array → render 0 links', () => {
    render(<QuickActionsTile actions={[]} />);
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });

  it('multiple custom actions → render ตามจำนวนที่ส่งมา', () => {
    const twoActions: QuickAction[] = [
      { icon: <span />, labelTh: 'แอ็กชัน 1', labelEn: 'Action 1', href: '/a1', tone: 'teal' },
      { icon: <span />, labelTh: 'แอ็กชัน 2', labelEn: 'Action 2', href: '/a2', tone: 'amber' },
    ];
    render(<QuickActionsTile actions={twoActions} />);
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
});

// ────────────────────────────────────────────────────────────
// AC-5 LANGUAGE — Thai-primary sweep
// ────────────────────────────────────────────────────────────
describe('QuickActionsTile — AC-5 LANGUAGE', () => {
  it('ทุก labelTh ใน DEFAULT_ESS_ACTIONS ไม่มี SF-style "(English)" suffix', () => {
    const sfDriftPattern = /\([A-Z][a-zA-Z ]+\)/;
    DEFAULT_ESS_ACTIONS.forEach((action) => {
      expect(action.labelTh).not.toMatch(sfDriftPattern);
    });
  });

  it('ทุก labelTh ไม่มีคำ English 3+ ตัวอักษรติดกัน', () => {
    DEFAULT_ESS_ACTIONS.forEach((action) => {
      expect(action.labelTh).not.toMatch(/[A-Za-z]{3,}/);
    });
  });

  it('DEFAULT_ESS_ACTIONS.href ทุก item ขึ้นต้นด้วย "/" (relative route)', () => {
    DEFAULT_ESS_ACTIONS.forEach((action) => {
      expect(action.href).toMatch(/^\//);
    });
  });
});

// ────────────────────────────────────────────────────────────
// AC-6 ISOLATION — mount standalone โดยไม่ต้อง provider/context
// ────────────────────────────────────────────────────────────
describe('QuickActionsTile — AC-6 ISOLATION', () => {
  it('mounts standalone โดยไม่ throw (ไม่ต้องการ provider ใดๆ)', () => {
    expect(() => render(<QuickActionsTile />)).not.toThrow();
  });

  it('unmount ไม่ throw', () => {
    const { unmount } = render(<QuickActionsTile />);
    expect(() => unmount()).not.toThrow();
  });
});
