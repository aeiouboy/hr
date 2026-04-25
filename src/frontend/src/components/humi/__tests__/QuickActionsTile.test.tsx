/**
 * QuickActionsTile.test.tsx — vitest unit tests
 * BRD #171 — ESS Quick Actions Tile (hr#75)
 * AC-1 RENDER | AC-2 BASELINE ACTIONS | AC-3 NAVIGATION
 * AC-4 COMPONENT API | AC-5 LANGUAGE | AC-6 ISOLATION
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuickActionsTile, DEFAULT_ESS_ACTIONS } from '../QuickActionsTile';

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
    // 'เมนูลัด' ปรากฏ 2 ครั้ง: aria-label (region) + visible eyebrow text — ใช้ getAllBy
    const matches = screen.getAllByText('เมนูลัด');
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });
});

// ────────────────────────────────────────────────────────────
// AC-2 BASELINE ACTIONS — 4 default items, correct labels
// ────────────────────────────────────────────────────────────
describe('QuickActionsTile — AC-2 BASELINE ACTIONS', () => {
  it('DEFAULT_ESS_ACTIONS export มี exactly 4 รายการ', () => {
    expect(DEFAULT_ESS_ACTIONS).toHaveLength(4);
  });

  it('renders 4 action links เมื่อไม่ส่ง props.actions', () => {
    render(<QuickActionsTile />);
    expect(screen.getAllByRole('link')).toHaveLength(4);
  });

  it.each([
    ['ขอลาหยุด',      '/th/timeoff'],
    ['สลิปเงินเดือน',  '/th/payslip'],
    ['ดูข้อมูลส่วนตัว', '/th/profile/me'],
    ['เบิกสวัสดิการ',   '/th/benefits-hub'],
  ])('renders link "%s" → href "%s"', (labelTh, href) => {
    render(<QuickActionsTile />);
    const link = screen.getByRole('link', { name: labelTh });
    expect(link).toHaveAttribute('href', href);
  });
});

// ────────────────────────────────────────────────────────────
// AC-3 NAVIGATION — href correctness (user-event click + assertion)
// ────────────────────────────────────────────────────────────
describe('QuickActionsTile — AC-3 NAVIGATION', () => {
  it('แต่ละ link ใน DEFAULT_ESS_ACTIONS มี href ถูกต้องครบ 4 รายการ', () => {
    render(<QuickActionsTile />);
    DEFAULT_ESS_ACTIONS.forEach((action) => {
      const link = screen.getByRole('link', { name: action.labelTh });
      expect(link).toHaveAttribute('href', action.href);
    });
  });

  // BEHAVIOR test (not implementation): href ต้องขึ้นต้นด้วย locale prefix
  // เช่น /th/ ตามที่ /home/page.tsx ใช้ pattern เดียวกัน (line 113, 119, 324).
  // ป้องกัน C8 source-grounding bug ที่ #75 v1 เคยปล่อย ('/timeoff' โดดๆ — 404)
  it('ทุก href ใน DEFAULT_ESS_ACTIONS ขึ้นต้นด้วย locale prefix /th/ ตาม codebase convention', () => {
    DEFAULT_ESS_ACTIONS.forEach((action) => {
      expect(action.href).toMatch(/^\/th\//);
    });
  });

  it('user-event click บน link ไม่ throw error', async () => {
    const user = userEvent.setup();
    render(<QuickActionsTile />);
    const link = screen.getByRole('link', { name: 'ขอลาหยุด' });
    // jsdom ไม่ navigate จริง — ตรวจว่า click ไม่ throw
    await expect(user.click(link)).resolves.not.toThrow();
  });
});

// ────────────────────────────────────────────────────────────
// AC-4 COMPONENT API — props.actions override
// ────────────────────────────────────────────────────────────
describe('QuickActionsTile — AC-4 COMPONENT API', () => {
  it('รับ props.actions override → render ตาม props ไม่ใช่ DEFAULT_ESS_ACTIONS', () => {
    const customActions = [
      { icon: <span data-testid="custom-icon" />, labelTh: 'ทดสอบ', href: '/test' },
    ];
    render(<QuickActionsTile actions={customActions} />);
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.getByRole('link', { name: 'ทดสอบ' })).toHaveAttribute('href', '/test');
    // DEFAULT_ESS_ACTIONS labels ไม่ควรปรากฏ
    expect(screen.queryByRole('link', { name: 'ขอลาหยุด' })).not.toBeInTheDocument();
  });

  it('empty actions array → render 0 links', () => {
    render(<QuickActionsTile actions={[]} />);
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });

  it('multiple custom actions → render ตามจำนวนที่ส่งมา', () => {
    const twoActions = [
      { icon: <span />, labelTh: 'แอ็กชัน 1', href: '/a1' },
      { icon: <span />, labelTh: 'แอ็กชัน 2', href: '/a2' },
    ];
    render(<QuickActionsTile actions={twoActions} />);
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
});

// ────────────────────────────────────────────────────────────
// AC-5 LANGUAGE — Thai-primary sweep, ไม่มี SF-style English suffix
// ────────────────────────────────────────────────────────────
describe('QuickActionsTile — AC-5 LANGUAGE', () => {
  it('ทุก labelTh ใน DEFAULT_ESS_ACTIONS ไม่มี SF-style "(English)" suffix', () => {
    // C10: ห้าม pattern 'ขอลาหยุด (Time-off)' หรือ 'สลิป (Payslip)'
    const sfDriftPattern = /\([A-Z][a-zA-Z ]+\)/;
    DEFAULT_ESS_ACTIONS.forEach((action) => {
      expect(action.labelTh).not.toMatch(sfDriftPattern);
    });
  });

  it('ทุก labelTh ไม่มีคำ English 3+ ตัวอักษรติดกัน (ไม่ใช่ English-only label)', () => {
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
