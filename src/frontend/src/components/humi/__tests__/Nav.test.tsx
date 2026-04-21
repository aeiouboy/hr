/**
 * Nav.test.tsx — Humi Nav (vertical sidebar) primitive tests
 * AC-7: A11y — aria-current="page", ใช้ <Link>/<a> ไม่ใช่ <div>
 * AC-8: Component library — 3 sections, icon + label render
 *
 * หมายเหตุ: Nav ใช้ next/link ต้อง mock ใน test environment
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { Home, Users, Building2, Settings, Bell } from 'lucide-react';
import { Nav, type NavSection } from '../Nav';

// Mock next/link เพื่อให้ render ใน jsdom ได้
vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// ────────────────────────────────────────────────────────────
// Test fixture — 3 sections ตาม Humi spec
// ────────────────────────────────────────────────────────────

const SECTIONS: NavSection[] = [
  {
    id: 'workspace',
    label: 'พื้นที่ทำงานของฉัน',
    items: [
      { id: 'home', label: 'หน้าหลัก', href: '/th/home', icon: Home },
      { id: 'notifications', label: 'การแจ้งเตือน', href: '/th/notifications', icon: Bell, badge: 3 },
    ],
  },
  {
    id: 'people',
    label: 'บุคลากร',
    items: [
      { id: 'employees', label: 'พนักงาน', href: '/th/employees', icon: Users, active: true },
      { id: 'org-chart', label: 'ผังองค์กร', href: '/th/org-chart', icon: Building2 },
    ],
  },
  {
    id: 'company',
    label: 'บริษัท',
    items: [
      { id: 'settings', label: 'ตั้งค่า', href: '/th/settings', icon: Settings },
    ],
  },
];

// ────────────────────────────────────────────────────────────
// AC-8: renders all 3 sections from sections prop
// ────────────────────────────────────────────────────────────
describe('Nav — sections render (AC-8)', () => {
  it('render section labels ครบทั้ง 3 sections', () => {
    render(<Nav sections={SECTIONS} ariaLabel="เมนูหลัก" />);
    expect(screen.getByText('พื้นที่ทำงานของฉัน')).toBeInTheDocument();
    expect(screen.getByText('บุคลากร')).toBeInTheDocument();
    expect(screen.getByText('บริษัท')).toBeInTheDocument();
  });

  it('render nav items ครบทุกรายการใน sections', () => {
    render(<Nav sections={SECTIONS} ariaLabel="เมนูหลัก" />);
    expect(screen.getByText('หน้าหลัก')).toBeInTheDocument();
    expect(screen.getByText('การแจ้งเตือน')).toBeInTheDocument();
    expect(screen.getByText('พนักงาน')).toBeInTheDocument();
    expect(screen.getByText('ผังองค์กร')).toBeInTheDocument();
    expect(screen.getByText('ตั้งค่า')).toBeInTheDocument();
  });

  it('render ใน <nav> element พร้อม aria-label', () => {
    render(<Nav sections={SECTIONS} ariaLabel="เมนูหลัก" />);
    const navEl = screen.getByRole('navigation', { name: 'เมนูหลัก' });
    expect(navEl).toBeInTheDocument();
  });

  it('section ที่ไม่มี label ไม่ render eyebrow text', () => {
    const sectionsNoLabel: NavSection[] = [
      {
        id: 'anon',
        // label ไม่ระบุ
        items: [{ id: 'x', label: 'Item X', href: '/x' }],
      },
    ];
    render(<Nav sections={sectionsNoLabel} ariaLabel="เมนู" />);
    expect(screen.queryByText('anon')).not.toBeInTheDocument();
    expect(screen.getByText('Item X')).toBeInTheDocument();
  });
});

// ────────────────────────────────────────────────────────────
// AC-7: active item gets aria-current="page"
// ────────────────────────────────────────────────────────────
describe('Nav — active item aria-current (AC-7)', () => {
  it('item ที่ active=true มี aria-current="page"', () => {
    render(<Nav sections={SECTIONS} ariaLabel="เมนูหลัก" />);
    // "พนักงาน" active=true
    const activeLink = screen.getByText('พนักงาน').closest('a')!;
    expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  it('item ที่ active=false ไม่มี aria-current attribute', () => {
    render(<Nav sections={SECTIONS} ariaLabel="เมนูหลัก" />);
    // "หน้าหลัก" active ไม่ระบุ = false โดย default
    const inactiveLink = screen.getByText('หน้าหลัก').closest('a')!;
    expect(inactiveLink).not.toHaveAttribute('aria-current');
  });

  it('มีเพียง 1 item ที่ active ในขณะเดียวกัน', () => {
    render(<Nav sections={SECTIONS} ariaLabel="เมนูหลัก" />);
    const activeLinks = screen.getAllByRole('link', { current: 'page' });
    expect(activeLinks).toHaveLength(1);
  });
});

// ────────────────────────────────────────────────────────────
// AC-7: each nav item uses <Link> or <a> (not <div>)
// ────────────────────────────────────────────────────────────
describe('Nav — nav items use Link/a (AC-7)', () => {
  it('ทุก nav item render เป็น <a> element (ผ่าน next/link mock)', () => {
    render(<Nav sections={SECTIONS} ariaLabel="เมนูหลัก" />);
    const links = screen.getAllByRole('link');
    // ต้องมี link อย่างน้อย 5 รายการ (จำนวน items ทั้งหมด)
    expect(links.length).toBeGreaterThanOrEqual(5);
  });

  it('nav items ไม่มี <div> ที่มี onClick (ตรวจ AC-7 antipattern)', () => {
    const { container } = render(<Nav sections={SECTIONS} ariaLabel="เมนูหลัก" />);
    // ตรวจสอบ div ที่มี event handler onclick (anti-pattern)
    const divsWithOnclick = container.querySelectorAll('div[onclick]');
    expect(divsWithOnclick).toHaveLength(0);
  });

  it('link มี href ที่ถูกต้อง', () => {
    render(<Nav sections={SECTIONS} ariaLabel="เมนูหลัก" />);
    const homeLink = screen.getByText('หน้าหลัก').closest('a')!;
    expect(homeLink).toHaveAttribute('href', '/th/home');
  });
});

// ────────────────────────────────────────────────────────────
// AC-8: icon + label both render
// ────────────────────────────────────────────────────────────
describe('Nav — icon + label render (AC-8)', () => {
  it('render label text ทุก item', () => {
    render(<Nav sections={SECTIONS} ariaLabel="เมนูหลัก" />);
    // ตรวจสอบ label text แต่ละรายการ
    ['หน้าหลัก', 'การแจ้งเตือน', 'พนักงาน', 'ผังองค์กร', 'ตั้งค่า'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('render icon SVG elements (lucide icons)', () => {
    const { container } = render(<Nav sections={SECTIONS} ariaLabel="เมนูหลัก" />);
    // Lucide icons render เป็น <svg> elements
    const svgIcons = container.querySelectorAll('svg');
    // ควรมี icon อย่างน้อย 5 (1 per item)
    expect(svgIcons.length).toBeGreaterThanOrEqual(5);
  });

  it('icon มี aria-hidden (ไม่อ่านออกเสียง — label เป็น text แทน)', () => {
    const { container } = render(<Nav sections={SECTIONS} ariaLabel="เมนูหลัก" />);
    const svgIcons = container.querySelectorAll('svg[aria-hidden]');
    expect(svgIcons.length).toBeGreaterThanOrEqual(1);
  });
});

// ────────────────────────────────────────────────────────────
// Badge render
// ────────────────────────────────────────────────────────────
describe('Nav — badge render', () => {
  it('badge แสดง count เมื่อระบุ badge prop', () => {
    render(<Nav sections={SECTIONS} ariaLabel="เมนูหลัก" />);
    // "การแจ้งเตือน" มี badge=3
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('badge มี aria-label สำหรับ screen reader', () => {
    render(<Nav sections={SECTIONS} ariaLabel="เมนูหลัก" />);
    // badge ที่เป็น number จะมี aria-label "N รายการใหม่"
    const badge = screen.getByLabelText('3 รายการใหม่');
    expect(badge).toBeInTheDocument();
  });
});

// ────────────────────────────────────────────────────────────
// Brand + footer slots
// ────────────────────────────────────────────────────────────
describe('Nav — brand + footer slots', () => {
  it('render brand slot เมื่อส่ง brand prop', () => {
    render(
      <Nav
        sections={SECTIONS}
        ariaLabel="เมนูหลัก"
        brand={<span>Humi Logo</span>}
      />
    );
    expect(screen.getByText('Humi Logo')).toBeInTheDocument();
  });

  it('render footer slot เมื่อส่ง footer prop', () => {
    render(
      <Nav
        sections={SECTIONS}
        ariaLabel="เมนูหลัก"
        footer={<button>ออกจากระบบ</button>}
      />
    );
    expect(screen.getByText('ออกจากระบบ')).toBeInTheDocument();
  });

  it('displayName = "HumiNav"', () => {
    expect(Nav.displayName).toBe('HumiNav');
  });
});
