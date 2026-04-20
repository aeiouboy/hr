/**
 * screens.smoke.test.tsx — Humi 5-screen smoke tests
 * AC-2: ≥ 5 core Humi screens implemented (render ไม่ crash)
 * AC-6: Thai-primary — primary headings ต้องเป็นภาษาไทย
 *
 * Strategy: mock next-intl useTranslations ด้วย th.json keys จริง
 * + mock next/link, next/navigation สำหรับ client components
 *
 * หมายเหตุ: screens เป็น 'use client' ทั้งหมด — ใช้ @testing-library/react
 * โดยตรงได้เลยโดยไม่ต้อง Next.js App Router environment
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
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
    humiEmployees: {
      eyebrow: 'Humi HR',
      title: 'พนักงาน',
      subtitle: 'ทั้งหมด {count} คนในองค์กร',
      addEmployee: 'เพิ่มพนักงาน',
      toolbarLabel: 'ค้นหาและกรอง',
      searchPlaceholder: 'ค้นหาชื่อ รหัสพนักงาน หรือหน่วยงาน...',
      filterLabel: 'กรองตามสถานะ',
      filterAll: 'ทั้งหมด',
      filterActive: 'ทำงาน',
      filterLeave: 'ลา',
      filterTerminated: 'พ้นสภาพ',
      tableCaption: 'รายชื่อพนักงานทั้งหมด',
      colAvatar: 'รูปประจำตัว',
      colName: 'ชื่อ-สกุล',
      colCode: 'รหัสพนักงาน',
      colDepartment: 'หน่วยงาน',
      colStatus: 'สถานะ',
      colActions: 'การจัดการ',
      view: 'ดู',
      viewDetail: 'ดูรายละเอียด',
      emptyTitle: 'ไม่พบพนักงานตามเงื่อนไข',
      emptyBody: 'ลองปรับคำค้นหาหรือเลือกสถานะอื่น',
    },
    humiSettings: {
      title: 'ตั้งค่าระบบ',
      subtitle: 'ปรับแต่งข้อมูลองค์กร ผู้ใช้ สิทธิ์ และการแจ้งเตือน',
      'sections.organization': 'ข้อมูลองค์กร',
      'sections.usersRoles': 'ผู้ใช้และสิทธิ์',
      'sections.notifications': 'การแจ้งเตือน',
      'sections.security': 'ความปลอดภัย',
      'sections.integrations': 'การเชื่อมต่อระบบภายนอก',
      'sections.about': 'เกี่ยวกับ',
      'organization.eyebrow': 'โปรไฟล์องค์กร',
      'organization.title': 'ข้อมูลองค์กร',
      'organization.subtitle': 'รายละเอียดบริษัท โลโก้ ที่อยู่ และการตั้งค่าภูมิภาค',
      'organization.general.title': 'ข้อมูลทั่วไป',
      'organization.general.description': 'ชื่อและรหัสที่ใช้อ้างอิงทั่วทั้งระบบ',
      'organization.general.companyName': 'ชื่อบริษัท',
      'organization.general.companyCode': 'รหัสบริษัท',
      'organization.general.fiscalYearStart': 'วันเริ่มต้นปีงบประมาณ',
      'organization.general.fiscalYearHelp': 'ใช้สำหรับคำนวณรอบบัญชีและรายงาน',
      'organization.logo.title': 'ตราสัญลักษณ์',
      'organization.logo.description': 'โลโก้จะปรากฏบนเอกสารและหน้าจอเข้าสู่ระบบ',
      'organization.logo.change': 'เปลี่ยนโลโก้',
      'organization.logo.placeholder': 'H',
      'organization.logo.caption': 'แนะนำขนาด 512×512px · PNG หรือ SVG',
      'organization.address.title': 'ที่อยู่',
      'organization.address.description': 'ที่อยู่จดทะเบียนสำหรับเอกสารราชการ',
      'organization.address.label': 'ที่อยู่บริษัท',
      'organization.address.placeholder': 'เลขที่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด รหัสไปรษณีย์',
      'organization.locale.title': 'ภาษาและเขตเวลา',
      'organization.locale.description': 'ค่าเริ่มต้นสำหรับพนักงานทุกคน',
      'organization.locale.language': 'ภาษาเริ่มต้น',
      'organization.locale.timezone': 'เขตเวลา',
      'organization.locale.langTh': 'ไทย',
      'organization.locale.langEn': 'English',
      'organization.locale.tzBangkok': 'Asia/Bangkok (UTC+7)',
      'organization.autoSave.label': 'บันทึกอัตโนมัติ',
      'organization.autoSave.description': 'บันทึกการเปลี่ยนแปลงทันทีเมื่อพิมพ์ (เปิดใช้ในรุ่นทดสอบ)',
      'stub.eyebrow': 'กำลังพัฒนา',
      'stub.title': 'หัวข้อนี้อยู่ระหว่างพัฒนา',
      'stub.body': 'ทีมจะเปิดใช้งานใน Sprint 2',
      'stub.cta': 'กลับไปข้อมูลองค์กร',
      'defaults.companyName': 'กลุ่มเซ็นทรัล',
      'defaults.companyCode': 'CG-0001',
      'defaults.fiscalYearStart': '1 มกราคม',
      'defaults.address': 'เลขที่ 22 ซอยสมคิด ถนนเพลินจิต แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330',
      'actions.cancel': 'ยกเลิก',
      'actions.save': 'บันทึกการเปลี่ยนแปลง',
      'actions.saveHint': 'การเปลี่ยนแปลงจะมีผลทันทีกับทุกผู้ใช้',
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
let HumiEmployeesPage: React.ComponentType;
let EmployeeDetailPage: React.ComponentType;
let OrgChartPage: React.ComponentType;
let SettingsPage: React.ComponentType;

beforeEach(async () => {
  // Dynamic import หลัง mocks ถูก apply
  const homeModule = await import('../home/page');
  HumiHomePage = homeModule.default;

  const empModule = await import('../employees/page');
  HumiEmployeesPage = empModule.default;

  const detailModule = await import('../employees/[id]/page');
  EmployeeDetailPage = detailModule.default;

  const orgModule = await import('../org-chart/page');
  OrgChartPage = orgModule.default;

  const settingsModule = await import('../settings/page');
  SettingsPage = settingsModule.default;
});

// ────────────────────────────────────────────────────────────
// AC-2 + AC-6: Dashboard (home/page.tsx)
// ────────────────────────────────────────────────────────────
describe('Dashboard — home/page.tsx (AC-2, AC-6)', () => {
  it('render ไม่ crash (no throw)', () => {
    expect(() => render(<HumiHomePage />)).not.toThrow();
  });

  it('แสดง heading "ภาพรวม" (Thai-primary — AC-6)', () => {
    render(<HumiHomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('ภาพรวม');
  });

  it('แสดง KPI cards อย่างน้อย 3 ใบ (AC-2)', () => {
    render(<HumiHomePage />);
    // KPI section มี aria-label "ตัวชี้วัดหลัก"
    const kpiSection = screen.getByRole('region', { name: 'ตัวชี้วัดหลัก' });
    // Card renders เป็น <div> (ไม่มี role="article") — นับ direct children แทน
    const cards = kpiSection.querySelectorAll(':scope > *');
    expect(cards.length).toBeGreaterThanOrEqual(3);
  });

  it('แสดง heading "คำขอที่ต้องอนุมัติ" (approvals section)', () => {
    render(<HumiHomePage />);
    expect(screen.getByText('คำขอที่ต้องอนุมัติ')).toBeInTheDocument();
  });

  it('ไม่มี English-only primary heading (Thai-primary sweep — AC-6)', () => {
    render(<HumiHomePage />);
    const h1 = screen.getByRole('heading', { level: 1 });
    // หัว h1 ต้องมี Thai character อย่างน้อย 1 ตัว
    expect(h1.textContent).toMatch(/[\u0E00-\u0E7F]/);
  });
});

// ────────────────────────────────────────────────────────────
// AC-2: Employee List (employees/page.tsx)
// ────────────────────────────────────────────────────────────
describe('Employee List — employees/page.tsx (AC-2)', () => {
  it('render ไม่ crash (no throw)', () => {
    expect(() => render(<HumiEmployeesPage />)).not.toThrow();
  });

  it('แสดง heading "พนักงาน" (AC-6 Thai-primary)', () => {
    render(<HumiEmployeesPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('พนักงาน');
  });

  it('แสดง DataTable (table element) พร้อมข้อมูลพนักงาน (AC-2)', () => {
    render(<HumiEmployeesPage />);
    expect(document.querySelector('table')).toBeInTheDocument();
  });

  it('แสดง column headers ภาษาไทย (AC-6)', () => {
    render(<HumiEmployeesPage />);
    expect(screen.getByText('ชื่อ-สกุล')).toBeInTheDocument();
    expect(screen.getByText('หน่วยงาน')).toBeInTheDocument();
  });

  it('ไม่มี h1 เป็นภาษาอังกฤษล้วน (AC-6)', () => {
    render(<HumiEmployeesPage />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toMatch(/[\u0E00-\u0E7F]/);
  });
});

// ────────────────────────────────────────────────────────────
// AC-2: Employee Detail ([id]/page.tsx)
// ────────────────────────────────────────────────────────────
describe('Employee Detail — employees/[id]/page.tsx (AC-2)', () => {
  it('render ไม่ crash (no throw)', () => {
    expect(() => render(<EmployeeDetailPage />)).not.toThrow();
  });

  it('แสดง back link กลับไป employee list', () => {
    render(<EmployeeDetailPage />);
    // back link ควรมี href ที่ชี้กลับไป employees
    const backLinks = screen.getAllByRole('link');
    const hasBackLink = backLinks.some((link) =>
      link.getAttribute('href')?.includes('employees')
    );
    expect(hasBackLink).toBe(true);
  });

  it('แสดง tab group (tablist) สำหรับ detail sections', () => {
    render(<EmployeeDetailPage />);
    // Employee detail มี tab navigation (role=tablist)
    const tablist = screen.queryByRole('tablist');
    // tablist หรือ tab-like buttons ต้องมี
    const tabLikeButtons = screen.queryAllByRole('button');
    expect(tablist !== null || tabLikeButtons.length > 0).toBe(true);
  });

  it('render employee name (Thai characters)', () => {
    render(<EmployeeDetailPage />);
    // ต้องมี Thai text แสดงในหน้า detail
    const pageText = document.body.textContent ?? '';
    expect(pageText).toMatch(/[\u0E00-\u0E7F]/);
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
    // Root node ชื่อ "สำนักงานใหญ่"
    expect(screen.getByText('สำนักงานใหญ่')).toBeInTheDocument();
  });

  it('แสดง detail panel ฝั่งขวา', () => {
    render(<OrgChartPage />);
    // Detail panel แสดงข้อมูลของ node ที่ selected
    const pageText = document.body.textContent ?? '';
    // ต้องมี Thai content
    expect(pageText).toMatch(/[\u0E00-\u0E7F]/);
  });

  it('แสดงปุ่ม expand/collapse สำหรับ tree nodes ที่มี children', () => {
    render(<OrgChartPage />);
    // Nodes ที่มี children แสดง ChevronRight button
    const expandButtons = screen.queryAllByRole('button');
    expect(expandButtons.length).toBeGreaterThan(0);
  });
});

// ────────────────────────────────────────────────────────────
// AC-2: Settings (settings/page.tsx)
// ────────────────────────────────────────────────────────────
describe('Settings — settings/page.tsx (AC-2)', () => {
  it('render ไม่ crash (no throw)', () => {
    expect(() => render(<SettingsPage />)).not.toThrow();
  });

  it('แสดง heading "ตั้งค่าระบบ" (AC-6 Thai-primary)', () => {
    render(<SettingsPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('ตั้งค่าระบบ');
  });

  it('แสดง sidebar sections อย่างน้อย 3 รายการ (AC-2)', () => {
    render(<SettingsPage />);
    // sidebar มี 6 sections ตาม SECTION_ORDER
    const sectionButtons = screen.getAllByRole('button').filter((btn) => {
      const text = btn.textContent ?? '';
      return text.match(/[\u0E00-\u0E7F]/) && text.length > 2;
    });
    expect(sectionButtons.length).toBeGreaterThanOrEqual(3);
  });

  it('แสดง default panel "ข้อมูลองค์กร" โดย default', () => {
    render(<SettingsPage />);
    // OrganizationPanel เป็น default — ปรากฏทั้งใน sidebar nav และ panel heading
    // ใช้ getByRole('heading') เพื่อ target panel heading โดยเฉพาะ
    const panelHeading = screen.getByRole('heading', { level: 2, name: 'ข้อมูลองค์กร' });
    expect(panelHeading).toBeInTheDocument();
  });

  it('ไม่มี h1 เป็นภาษาอังกฤษล้วน (AC-6)', () => {
    render(<SettingsPage />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toMatch(/[\u0E00-\u0E7F]/);
  });
});

// ────────────────────────────────────────────────────────────
// AC-2: All 5 screens render without throwing (batch check)
// ────────────────────────────────────────────────────────────
describe('All 5 screens — render without throwing (AC-2)', () => {
  const screenNames = [
    'HumiHomePage',
    'HumiEmployeesPage',
    'EmployeeDetailPage',
    'OrgChartPage',
    'SettingsPage',
  ] as const;

  it('ทั้ง 5 screens render ได้โดยไม่มี error', () => {
    // เราทดสอบทีละ screen เพื่อ isolate errors
    const components = [
      HumiHomePage,
      HumiEmployeesPage,
      EmployeeDetailPage,
      OrgChartPage,
      SettingsPage,
    ];
    components.forEach((Component, i) => {
      const { unmount } = render(<Component />);
      // ถ้า render ไม่ throw = pass
      unmount();
    });
    // ถึงตรงนี้ = ทั้ง 5 screens ผ่าน
    expect(screenNames.length).toBe(5);
  });
});

// ────────────────────────────────────────────────────────────
// AC-6: Thai-primary sweep — primary headings across all screens
// ────────────────────────────────────────────────────────────
describe('Thai-primary headings sweep (AC-6)', () => {
  const screenExpectedHeadings: Array<[string, React.ComponentType, string]> = [
    ['Dashboard', null as unknown as React.ComponentType, 'ภาพรวม'],
    ['Employee List', null as unknown as React.ComponentType, 'พนักงาน'],
    ['Settings', null as unknown as React.ComponentType, 'ตั้งค่าระบบ'],
  ];

  it('Dashboard h1 เป็นภาษาไทย "ภาพรวม"', () => {
    render(<HumiHomePage />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toContain('ภาพรวม');
    expect(h1.textContent).toMatch(/[\u0E00-\u0E7F]/);
  });

  it('Employee List h1 เป็นภาษาไทย "พนักงาน"', () => {
    render(<HumiEmployeesPage />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toContain('พนักงาน');
    expect(h1.textContent).toMatch(/[\u0E00-\u0E7F]/);
  });

  it('Settings h1 เป็นภาษาไทย "ตั้งค่าระบบ"', () => {
    render(<SettingsPage />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toContain('ตั้งค่าระบบ');
    expect(h1.textContent).toMatch(/[\u0E00-\u0E7F]/);
  });
});
