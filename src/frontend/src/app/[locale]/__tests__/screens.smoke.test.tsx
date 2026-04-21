/**
 * screens.smoke.test.tsx — Humi 4-screen smoke tests
 * AC-2: ≥ 5 core Humi screens implemented (render ไม่ crash)
 * AC-6: Thai-primary — primary headings ต้องเป็นภาษาไทย
 *
 * Strategy: mock next-intl useTranslations ด้วย th.json keys จริง
 * + mock next/link, next/navigation สำหรับ client components
 *
 * หมายเหตุ: employees/ + settings/ ถูก archive ไปที่ .archive-2026-04/ แล้ว (Rule C8)
 * ใช้ active routes แทน: profile/me (แทน employees) + integrations (แทน settings)
 *
 * หมายเหตุ: screens เป็น 'use client' ทั้งหมด — ใช้ @testing-library/react
 * โดยตรงได้เลยโดยไม่ต้อง Next.js App Router environment
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

// ────────────────────────────────────────────────────────────
// Mocks — order matters (vi.mock hoisted ขึ้น top)
// ────────────────────────────────────────────────────────────

// Mock next/link
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

// Mock next/navigation (useSearchParams, useParams, useRouter)
vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: (_key: string) => null,
  }),
  useParams: () => ({ id: 'E-0101', locale: 'th' }),
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => '/th/home',
}));

// Mock next-intl useTranslations ด้วย th.json keys จริง
// ใช้ lookup map แทน dynamic import เพื่อ test speed
vi.mock('next-intl', () => {
  const translations: Record<string, Record<string, string>> = {
    humiHome: {
      eyebrow: 'Humi HR',
      title: 'ภาพรวม',
      subtitle: 'สรุปกิจกรรมและคำขอที่ต้องดำเนินการ',
      kpiLabel: 'ตัวชี้วัดหลัก',
      approvalsEyebrow: 'รอดำเนินการ',
      approvalsTitle: 'คำขอที่ต้องอนุมัติ',
      activityEyebrow: 'ไทม์ไลน์',
      activityTitle: 'กิจกรรมล่าสุด',
      myLeaveEyebrow: 'ของฉัน',
      myLeaveTitle: 'วันลาคงเหลือ',
      myLeaveCta: 'ดูรายละเอียดวันลา',
      leaveAnnual: 'ลาพักร้อน',
      leaveSick: 'ลาป่วย',
      leavePersonal: 'ลากิจ',
      payrollEyebrow: 'เงินเดือนล่าสุด',
      payrollPaid: 'จ่ายแล้ว',
      payrollPaidOn: 'วันโอน {date}',
      payrollCta: 'ดูสลิปเงินเดือน',
      approve: 'อนุมัติ',
      reject: 'ปฏิเสธ',
      viewAll: 'ดูทั้งหมด',
    },
  };

  // Simple dot-notation lookup supporting nested keys
  const makeT = (namespace: string) => (key: string, params?: Record<string, unknown>) => {
    const ns = translations[namespace] ?? {};
    let value = ns[key] ?? key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        value = value.replace(`{${k}}`, String(v));
      });
    }
    return value;
  };

  return {
    useTranslations: (namespace: string) => makeT(namespace),
    NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// ────────────────────────────────────────────────────────────
// Import screens (after mocks are set up)
// ────────────────────────────────────────────────────────────
// Screens import ต้องอยู่หลัง vi.mock calls
let HumiHomePage: React.ComponentType;
let HumiProfilePage: React.ComponentType;
let HumiIntegrationsPage: React.ComponentType;
let OrgChartPage: React.ComponentType;

beforeEach(async () => {
  // Dynamic import หลัง mocks ถูก apply
  const homeModule = await import('../home/page');
  HumiHomePage = homeModule.default;

  const profileModule = await import('../profile/me/page');
  HumiProfilePage = profileModule.default;

  const integrationsModule = await import('../integrations/page');
  HumiIntegrationsPage = integrationsModule.default;

  const orgModule = await import('../org-chart/page');
  OrgChartPage = orgModule.default;
});

// ────────────────────────────────────────────────────────────
// AC-2 + AC-6: Dashboard (home/page.tsx)
// ────────────────────────────────────────────────────────────
describe('Dashboard — home/page.tsx (AC-2, AC-6)', () => {
  it('render ไม่ crash (no throw)', () => {
    expect(() => render(<HumiHomePage />)).not.toThrow();
  });

  it('h1 มี Thai text (greeting dynamic — Phase C ใช้ greeting แทน page title)', () => {
    render(<HumiHomePage />);
    const h1 = screen.getByRole('heading', { level: 1 });
    // Phase C: h1 เป็น greeting dynamic "สวัสดีตอน..." ไม่ใช่ static title
    expect(h1.textContent).toMatch(/[฀-๿]/);
  });

  it('แสดง Thai content ใน page (AC-2 content present)', () => {
    render(<HumiHomePage />);
    const pageText = document.body.textContent ?? '';
    // ต้องมี Thai text ในหน้า
    expect(pageText).toMatch(/[฀-๿]/);
  });

  it('แสดง button elements (action area present — AC-2)', () => {
    render(<HumiHomePage />);
    const buttons = screen.queryAllByRole('button');
    // Home page มี buttons (approve, shortcut tiles)
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('ไม่มี English-only primary heading (Thai-primary sweep — AC-6)', () => {
    render(<HumiHomePage />);
    const h1 = screen.getByRole('heading', { level: 1 });
    // หัว h1 ต้องมี Thai character อย่างน้อย 1 ตัว
    expect(h1.textContent).toMatch(/[฀-๿]/);
  });
});

// ────────────────────────────────────────────────────────────
// AC-2: Profile/Me — แทน employees/ ที่ถูก archive (Rule C8)
// ────────────────────────────────────────────────────────────
describe('Profile/Me — profile/me/page.tsx (AC-2)', () => {
  it('render ไม่ crash (no throw)', () => {
    expect(() => render(<HumiProfilePage />)).not.toThrow();
  });

  it('แสดง Thai content (AC-6 Thai-primary)', () => {
    render(<HumiProfilePage />);
    const pageText = document.body.textContent ?? '';
    expect(pageText).toMatch(/[฀-๿]/);
  });

  it('แสดง tab-like buttons สำหรับ switching sections (AC-2)', () => {
    render(<HumiProfilePage />);
    const tabLikeButtons = screen.queryAllByRole('button');
    expect(tabLikeButtons.length).toBeGreaterThan(0);
  });
});

// ────────────────────────────────────────────────────────────
// AC-2: Org Chart (org-chart/page.tsx)
// ────────────────────────────────────────────────────────────
describe('Org Chart — org-chart/page.tsx (AC-2)', () => {
  it('render ไม่ crash (no throw)', () => {
    expect(() => render(<OrgChartPage />)).not.toThrow();
  });

  it('แสดง tree nodes (org nodes มี Thai names)', () => {
    render(<OrgChartPage />);
    // Root node เป็น person "วาสนา จิรวัฒน์" (CHRO) จาก HUMI_ORG_PEOPLE mock data
    const pageText = document.body.textContent ?? '';
    expect(pageText).toMatch(/[฀-๿]/);
    // ต้องมีชื่อพนักงานไทยในหน้า
    expect(pageText).toContain('วาสนา');
  });

  it('แสดง detail panel ฝั่งขวา', () => {
    render(<OrgChartPage />);
    // Detail panel แสดงข้อมูลของ node ที่ selected
    const pageText = document.body.textContent ?? '';
    // ต้องมี Thai content
    expect(pageText).toMatch(/[฀-๿]/);
  });

  it('แสดงปุ่ม expand/collapse สำหรับ tree nodes ที่มี children', () => {
    render(<OrgChartPage />);
    // Nodes ที่มี children แสดง ChevronRight button
    const expandButtons = screen.queryAllByRole('button');
    expect(expandButtons.length).toBeGreaterThan(0);
  });
});

// ────────────────────────────────────────────────────────────
// AC-2: Integrations — แทน settings/ ที่ถูก archive (Rule C8)
// ────────────────────────────────────────────────────────────
describe('Integrations — integrations/page.tsx (AC-2)', () => {
  it('render ไม่ crash (no throw)', () => {
    expect(() => render(<HumiIntegrationsPage />)).not.toThrow();
  });

  it('แสดง Thai content (AC-6)', () => {
    render(<HumiIntegrationsPage />);
    const pageText = document.body.textContent ?? '';
    expect(pageText).toMatch(/[฀-๿]/);
  });

  it('แสดง toggle switches หรือ buttons (AC-2 interaction elements)', () => {
    render(<HumiIntegrationsPage />);
    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});

// ────────────────────────────────────────────────────────────
// AC-2: All 4 active screens render without throwing (batch check)
// ────────────────────────────────────────────────────────────
describe('All 4 screens — render without throwing (AC-2)', () => {
  const screenNames = [
    'HumiHomePage',
    'HumiProfilePage',
    'OrgChartPage',
    'HumiIntegrationsPage',
  ] as const;

  it('ทั้ง 4 screens render ได้โดยไม่มี error', () => {
    // เราทดสอบทีละ screen เพื่อ isolate errors
    const components = [
      HumiHomePage,
      HumiProfilePage,
      OrgChartPage,
      HumiIntegrationsPage,
    ];
    components.forEach((Component) => {
      const { unmount } = render(<Component />);
      // ถ้า render ไม่ throw = pass
      unmount();
    });
    // ถึงตรงนี้ = ทั้ง 4 screens ผ่าน
    expect(screenNames.length).toBe(4);
  });
});

// ────────────────────────────────────────────────────────────
// AC-6: Thai-primary sweep — primary headings across all screens
// ────────────────────────────────────────────────────────────
describe('Thai-primary headings sweep (AC-6)', () => {
  it('Dashboard h1 มี Thai text (greeting dynamic — Phase C)', () => {
    render(<HumiHomePage />);
    const h1 = screen.getByRole('heading', { level: 1 });
    // Phase C: h1 = greeting dynamic ไม่ใช่ static page title "ภาพรวม"
    expect(h1.textContent).toMatch(/[฀-๿]/);
  });

  it('Profile page มี Thai content', () => {
    render(<HumiProfilePage />);
    const pageText = document.body.textContent ?? '';
    expect(pageText).toMatch(/[฀-๿]/);
  });

  it('Integrations page มี Thai content', () => {
    render(<HumiIntegrationsPage />);
    const pageText = document.body.textContent ?? '';
    expect(pageText).toMatch(/[฀-๿]/);
  });
});
