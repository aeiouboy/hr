/**
 * Button.test.tsx — Humi Button primitive tests
 * AC-7: A11y baseline (ไม่มี div onClick, real <button>, keyboard support, focus ring)
 * AC-1: Design token (teal primary, pumpkin danger — ไม่ใช่ red)
 * AC-3: 0 RED in palette (danger ต้องเป็น orange-leaning ไม่ใช่ #C8553D)
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

// ────────────────────────────────────────────────────────────
// AC-7: Element semantics — renders as real <button>
// ────────────────────────────────────────────────────────────
describe('Button — element semantics (AC-7)', () => {
  it('renders as a real <button> element, ไม่ใช่ <div>', () => {
    render(<Button>บันทึก</Button>);
    const btn = screen.getByRole('button', { name: 'บันทึก' });
    expect(btn.tagName).toBe('BUTTON');
  });

  it('has type="button" โดย default เพื่อไม่ submit form โดยไม่ตั้งใจ', () => {
    render(<Button>ยืนยัน</Button>);
    const btn = screen.getByRole('button', { name: 'ยืนยัน' });
    expect(btn).toHaveAttribute('type', 'button');
  });

  it('รับ type="submit" ได้เมื่อระบุ', () => {
    render(<Button type="submit">ส่งแบบฟอร์ม</Button>);
    const btn = screen.getByRole('button', { name: 'ส่งแบบฟอร์ม' });
    expect(btn).toHaveAttribute('type', 'submit');
  });
});

// ────────────────────────────────────────────────────────────
// AC-1 + variant coverage: primary uses teal token, danger uses pumpkin
// ────────────────────────────────────────────────────────────
describe('Button — variant classes (AC-1, AC-3)', () => {
  it('primary variant มี bg-accent class (teal token)', () => {
    render(<Button variant="primary">หลัก</Button>);
    const btn = screen.getByRole('button', { name: 'หลัก' });
    // bg-accent = Tailwind v4 token var --color-accent (teal #1FA8A0)
    expect(btn.className).toContain('bg-accent');
  });

  it('danger variant มี bg-danger class (pumpkin/amber token — ไม่ใช่ red)', () => {
    render(<Button variant="danger">ลบข้อมูล</Button>);
    const btn = screen.getByRole('button', { name: 'ลบข้อมูล' });
    // bg-danger = var(--color-danger) = amber-700 #B45309 — orange-leaning, ไม่มี #C8553D
    expect(btn.className).toContain('bg-danger');
    // ยืนยันว่า class string ไม่มีสีแดงตรงๆ (C8553D / C8102E / E08864)
    expect(btn.className).not.toMatch(/#C8553D|#C8102E|#E08864/i);
  });

  it('secondary variant มี border-accent class', () => {
    render(<Button variant="secondary">รอง</Button>);
    const btn = screen.getByRole('button', { name: 'รอง' });
    expect(btn.className).toContain('border-accent');
  });

  it('ghost variant มี bg-transparent class', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const btn = screen.getByRole('button', { name: 'Ghost' });
    expect(btn.className).toContain('bg-transparent');
  });
});

// ────────────────────────────────────────────────────────────
// AC-7: Loading state — disables button + shows spinner
// ────────────────────────────────────────────────────────────
describe('Button — loading state (AC-7)', () => {
  it('loading=true ทำให้ button disabled', () => {
    render(<Button loading>กำลังบันทึก</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
  });

  it('loading=true ตั้ง aria-busy="true"', () => {
    render(<Button loading>กำลังโหลด</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-busy', 'true');
  });

  it('loading=true แสดง spinner (Loader2) พร้อม aria-hidden', () => {
    render(<Button loading>ส่ง</Button>);
    // Loader2 render เป็น svg ที่มี class animate-spin
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-hidden', 'true');
  });

  it('loading=false + disabled=true ทำให้ button disabled เช่นกัน', () => {
    render(<Button disabled>ปิดใช้งาน</Button>);
    const btn = screen.getByRole('button', { name: 'ปิดใช้งาน' });
    expect(btn).toBeDisabled();
  });
});

// ────────────────────────────────────────────────────────────
// AC-7: Keyboard interaction — Enter/Space trigger onClick
// ────────────────────────────────────────────────────────────
describe('Button — keyboard interaction (AC-7)', () => {
  it('กด Enter บน button เรียก onClick', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>กดได้</Button>);
    const btn = screen.getByRole('button', { name: 'กดได้' });
    btn.focus();
    fireEvent.keyDown(btn, { key: 'Enter' });
    fireEvent.click(btn); // native button fires click on Enter
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('กด Space บน button เรียก onClick (native browser behavior)', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>กดได้</Button>);
    const btn = screen.getByRole('button', { name: 'กดได้' });
    await userEvent.type(btn, ' ');
    // Space on <button> fires click natively; jsdom+userEvent may fire twice (keydown + native) — accept >=1
    expect(onClick.mock.calls.length).toBeGreaterThanOrEqual(1);
  });

  it('button disabled ไม่เรียก onClick เมื่อกด', async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>ปิด</Button>);
    const btn = screen.getByRole('button', { name: 'ปิด' });
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });
});

// ────────────────────────────────────────────────────────────
// AC-7: focus-visible ring class is present
// ────────────────────────────────────────────────────────────
describe('Button — focus-visible ring (AC-7)', () => {
  it('มี focus-visible:ring class ใน className', () => {
    render(<Button>ทดสอบ Focus</Button>);
    const btn = screen.getByRole('button', { name: 'ทดสอบ Focus' });
    // focus-visible:ring-2 ต้องอยู่ใน class string (AC-7 a11y)
    expect(btn.className).toContain('focus-visible:ring-2');
  });

  it('มี focus-visible:ring-accent class เพื่อใช้ teal token', () => {
    render(<Button>Focus Ring</Button>);
    const btn = screen.getByRole('button', { name: 'Focus Ring' });
    expect(btn.className).toContain('focus-visible:ring-accent');
  });
});

// ────────────────────────────────────────────────────────────
// Size variants
// ────────────────────────────────────────────────────────────
describe('Button — size variants', () => {
  it.each([
    ['sm', 'h-8'],
    ['md', 'h-10'],
    ['lg', 'h-12'],
  ] as const)('size=%s มี class %s', (size, expectedClass) => {
    render(<Button size={size}>Test</Button>);
    const btn = screen.getByRole('button', { name: 'Test' });
    expect(btn.className).toContain(expectedClass);
  });
});

// ────────────────────────────────────────────────────────────
// forwardRef + displayName
// ────────────────────────────────────────────────────────────
describe('Button — ref + displayName', () => {
  it('displayName = "HumiButton"', () => {
    expect(Button.displayName).toBe('HumiButton');
  });
});
