/**
 * Toggle.test.tsx — Humi Toggle (switch) primitive tests
 * AC-7: A11y baseline — role="switch", aria-checked, keyboard Space/Enter,
 *       disabled blocks toggle, label/description render
 * ข้อสังเกต: Toggle เป็น flagged critical ใน research (ต้องไม่ใช้ <div>)
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toggle } from '../Toggle';

// ────────────────────────────────────────────────────────────
// AC-7: Element semantics — must be <button role="switch"> ไม่ใช่ <div>
// ────────────────────────────────────────────────────────────
describe('Toggle — element semantics (AC-7)', () => {
  it('renders เป็น <button> element ไม่ใช่ <div>', () => {
    render(<Toggle checked={false} onChange={vi.fn()} ariaLabel="รับการแจ้งเตือน" />);
    const switchBtn = screen.getByRole('switch');
    expect(switchBtn.tagName).toBe('BUTTON');
  });

  it('มี role="switch" (ไม่ใช่ role="checkbox" หรือไม่มี role)', () => {
    render(<Toggle checked={false} onChange={vi.fn()} ariaLabel="ทดสอบ" />);
    // getByRole('switch') จะ throw ถ้า role ไม่ถูกต้อง
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('type="button" เพื่อไม่ submit form', () => {
    render(<Toggle checked={false} onChange={vi.fn()} ariaLabel="ทดสอบ" />);
    expect(screen.getByRole('switch')).toHaveAttribute('type', 'button');
  });
});

// ────────────────────────────────────────────────────────────
// AC-7: aria-checked reflects checked prop
// ────────────────────────────────────────────────────────────
describe('Toggle — aria-checked (AC-7)', () => {
  it('checked=false → aria-checked="false"', () => {
    render(<Toggle checked={false} onChange={vi.fn()} ariaLabel="ทดสอบ" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('checked=true → aria-checked="true"', () => {
    render(<Toggle checked={true} onChange={vi.fn()} ariaLabel="ทดสอบ" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('เปลี่ยน prop checked → aria-checked อัปเดตตาม (controlled)', () => {
    const { rerender } = render(
      <Toggle checked={false} onChange={vi.fn()} ariaLabel="ทดสอบ" />
    );
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    rerender(<Toggle checked={true} onChange={vi.fn()} ariaLabel="ทดสอบ" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });
});

// ────────────────────────────────────────────────────────────
// AC-7: Space key toggles state
// ────────────────────────────────────────────────────────────
describe('Toggle — Space key (AC-7)', () => {
  it('กด Space เรียก onChange ด้วย !checked (false → true)', async () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} ariaLabel="ทดสอบ Space" />);
    const switchBtn = screen.getByRole('switch');
    switchBtn.focus();
    await userEvent.keyboard(' ');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('กด Space เรียก onChange ด้วย false เมื่อ checked=true', async () => {
    const onChange = vi.fn();
    render(<Toggle checked={true} onChange={onChange} ariaLabel="Toggle ปิด" />);
    const switchBtn = screen.getByRole('switch');
    switchBtn.focus();
    await userEvent.keyboard(' ');
    expect(onChange).toHaveBeenCalledWith(false);
  });
});

// ────────────────────────────────────────────────────────────
// AC-7: Enter key toggles state
// ────────────────────────────────────────────────────────────
describe('Toggle — Enter key (AC-7)', () => {
  it('กด Enter เรียก onChange (native button behaviour)', async () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} ariaLabel="Enter Toggle" />);
    const switchBtn = screen.getByRole('switch');
    switchBtn.focus();
    // fireEvent.keyDown + click simulates native Enter on <button>
    fireEvent.keyDown(switchBtn, { key: 'Enter' });
    fireEvent.click(switchBtn);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

// ────────────────────────────────────────────────────────────
// AC-7: disabled blocks toggle
// ────────────────────────────────────────────────────────────
describe('Toggle — disabled state (AC-7)', () => {
  it('disabled=true ทำให้ button มี disabled attribute', () => {
    render(<Toggle checked={false} onChange={vi.fn()} disabled ariaLabel="ปิดการใช้งาน" />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('disabled=true ไม่เรียก onChange เมื่อคลิก', async () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} disabled ariaLabel="ปิดการใช้งาน" />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('disabled=true ไม่เรียก onChange เมื่อกด Space', async () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} disabled ariaLabel="ปิด" />);
    const switchBtn = screen.getByRole('switch');
    switchBtn.focus();
    await userEvent.keyboard(' ');
    expect(onChange).not.toHaveBeenCalled();
  });
});

// ────────────────────────────────────────────────────────────
// AC-8: label + description render (component library feature)
// ────────────────────────────────────────────────────────────
describe('Toggle — label + description (AC-8)', () => {
  it('แสดง label text เมื่อส่ง label prop', () => {
    render(
      <Toggle
        checked={false}
        onChange={vi.fn()}
        label="รับการแจ้งเตือนทางอีเมล"
      />
    );
    expect(screen.getByText('รับการแจ้งเตือนทางอีเมล')).toBeInTheDocument();
  });

  it('label ใช้ <label> element พร้อม htmlFor ที่ตรงกับ button id', () => {
    render(
      <Toggle
        checked={false}
        onChange={vi.fn()}
        label="การแจ้งเตือน"
        id="notif-toggle"
      />
    );
    const labelEl = screen.getByText('การแจ้งเตือน').closest('label');
    expect(labelEl).toHaveAttribute('for', 'notif-toggle');
    expect(screen.getByRole('switch')).toHaveAttribute('id', 'notif-toggle');
  });

  it('แสดง description text เมื่อส่ง description prop', () => {
    render(
      <Toggle
        checked={false}
        onChange={vi.fn()}
        label="การแจ้งเตือน"
        description="รับข่าวสารอัปเดตทุกวัน"
      />
    );
    expect(screen.getByText('รับข่าวสารอัปเดตทุกวัน')).toBeInTheDocument();
  });

  it('switch มี aria-describedby ที่ชี้ไปยัง description element', () => {
    render(
      <Toggle
        checked={false}
        onChange={vi.fn()}
        label="การแจ้งเตือน"
        description="รายละเอียดเพิ่มเติม"
        id="desc-toggle"
      />
    );
    const switchBtn = screen.getByRole('switch');
    const descId = switchBtn.getAttribute('aria-describedby');
    expect(descId).toBeTruthy();
    const descEl = document.getElementById(descId!);
    expect(descEl).toHaveTextContent('รายละเอียดเพิ่มเติม');
  });

  it('ไม่มี label หรือ description → render เป็น span wrapper inline', () => {
    const { container } = render(
      <Toggle checked={false} onChange={vi.fn()} ariaLabel="สวิตช์เดียว" />
    );
    // outer element ควรเป็น span (inline-flex) ไม่ใช่ div row layout
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.tagName).toBe('SPAN');
  });

  it('displayName = "HumiToggle"', () => {
    expect(Toggle.displayName).toBe('HumiToggle');
  });
});
