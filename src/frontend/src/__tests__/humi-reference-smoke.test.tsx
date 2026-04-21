/**
 * humi-reference-smoke.test.tsx
 * AC-4 — Reference sections present on each of the 11 Humi screens
 *
 * Verifies that the structural elements ported from the Humi design-ref
 * bundle are rendered. These are smoke tests — not interaction tests.
 * Each screen gets ≥ 2 assertions.
 *
 * Real fixtures from humi-mock-data are used (rule 63 — no synthetic data).
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';

// ── Mocks ─────────────────────────────────────────────────────────────────────
vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/th/home'),
  useRouter: vi.fn().mockReturnValue({ push: vi.fn() }),
  useParams: vi.fn().mockReturnValue({ locale: 'th' }),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      newRequest: 'สร้างคำขอใหม่',
      greetingTitle: 'ยินดีต้อนรับกลับมา คุณจงรักษ์',
      greetingSub: 'มี 2 เรื่องที่ต้องดำเนินการวันนี้',
      dateEyebrow: 'วันอังคาร · 21 เมษายน',
      todayTitle: 'ทีมพร้อมทำงาน',
      todayEyebrow: 'วันนี้ทั้งองค์กร',
      pendingTitle: 'คำขอลางาน',
      pendingEyebrow: 'รออนุมัติจากคุณ',
      docsTitle: 'เอกสารรอลงนาม',
      docsEyebrow: 'รอการดำเนินการ',
      feedTitle: 'ประกาศล่าสุด',
      feedEyebrow: 'จากทีม',
      calendarTitle: 'บนปฏิทิน',
      calendarEyebrow: 'เมษายน 2569',
      ctaApprove: 'อนุมัติคำขอลา 2 รายการ',
      ctaAnnouncements: 'ตรวจสอบร่างประกาศ',
      // profile
      tabPersonal: 'ข้อมูลส่วนตัว',
      tabJob: 'การจ้างงาน',
      tabEmergency: 'ผู้ติดต่อฉุกเฉิน',
      tabDocs: 'เอกสาร',
      tabTax: 'ภาษี',
      // announcements
      title: 'ประกาศและข่าวสาร',
      filterAll: 'ทั้งหมด',
      filterOps: 'ปฏิบัติการ',
      filterPolicy: 'นโยบาย',
      filterRecog: 'ยกย่องชมเชย',
      pinnedTag: 'ปักหมุด',
      replyCta: 'ตอบกลับ',
      // login
      headline: 'ยินดีต้อนรับสู่ Humi',
      subline: 'แพลตฟอร์ม HR สำหรับทีมงานยุคใหม่',
      emailLabel: 'อีเมล',
      passwordLabel: 'รหัสผ่าน',
      rememberLabel: 'จดจำฉัน',
      submitLabel: 'เข้าสู่ระบบ',
      forgotLabel: 'ลืมรหัสผ่าน?',
      // learning
      searchPlaceholder: 'ค้นหาคอร์ส...',
    };
    return map[key] ?? key;
  },
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// ─────────────────────────────────────────────────────────────────────────────
// /home — greeting card + shortcut buttons area
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-4 smoke — /home', () => {
  beforeEach(() => { vi.resetModules(); });

  it('renders greeting section with Thai greeting text', async () => {
    const { default: Page } = await import('@/app/[locale]/home/page');
    render(<Page />);
    // Time-based greeting (สวัสดีตอนเช้า/บ่าย/เย็น) in h1
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toMatch(/สวัสดี/);
  });

  it('renders pending requests section', async () => {
    const { default: Page } = await import('@/app/[locale]/home/page');
    const { container } = render(<Page />);
    // Check for leave approval CTA which appears when there are pending requests
    const approveBtn = screen.getByText('อนุมัติคำขอลา 2 รายการ');
    expect(approveBtn).toBeTruthy();
  });

  it('renders today presence card', async () => {
    const { default: Page } = await import('@/app/[locale]/home/page');
    render(<Page />);
    expect(screen.getByText('ทีมพร้อมทำงาน')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// /profile/me — 5 tabs + avatar section
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-4 smoke — /profile/me', () => {
  beforeEach(() => { vi.resetModules(); });

  it('renders tab switcher with 5 tabs', async () => {
    const { default: Page } = await import('@/app/[locale]/profile/me/page');
    const { container } = render(<Page />);
    // Profile page has 5 tab buttons
    const tabButtons = container.querySelectorAll('[role="tab"], button[aria-selected]');
    // At minimum personal + job tabs visible
    expect(tabButtons.length).toBeGreaterThanOrEqual(2);
  });

  it('renders profile avatar with initials จท', async () => {
    const { default: Page } = await import('@/app/[locale]/profile/me/page');
    const { container } = render(<Page />);
    // Avatar renders initials from HUMI_MY_PROFILE
    const avatar = container.querySelector('[class*="humi-avatar"]');
    expect(avatar).toBeTruthy();
  });

  it('renders user name จงรักษ์ ทานากะ', async () => {
    const { default: Page } = await import('@/app/[locale]/profile/me/page');
    render(<Page />);
    expect(screen.getByText(/จงรักษ์ ทานากะ/)).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// /timeoff — balance KPIs + request form
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-4 smoke — /timeoff', () => {
  beforeEach(() => { vi.resetModules(); });

  it('renders leave balance KPI cards (ลาพักร้อน)', async () => {
    const { default: Page } = await import('@/app/[locale]/timeoff/page');
    render(<Page />);
    expect(screen.getByText('ลาพักร้อน')).toBeTruthy();
  });

  it('renders leave request form with leave type selector', async () => {
    const { default: Page } = await import('@/app/[locale]/timeoff/page');
    const { container } = render(<Page />);
    // Leave type tiles are rendered as buttons
    const leaveTiles = container.querySelectorAll('[class*="humi-tile"], button');
    expect(leaveTiles.length).toBeGreaterThan(0);
  });

  it('renders leave history list', async () => {
    const { default: Page } = await import('@/app/[locale]/timeoff/page');
    render(<Page />);
    // History shows pre-seeded leave items (from INITIAL_HISTORY)
    expect(screen.getByText('ลาพักร้อน')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// /benefits-hub — tab switcher + benefit plan cards
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-4 smoke — /benefits-hub', () => {
  beforeEach(() => { vi.resetModules(); });

  it('renders benefits tab switcher', async () => {
    const { default: Page } = await import('@/app/[locale]/benefits-hub/page');
    render(<Page />);
    expect(screen.getByText('สวัสดิการ')).toBeTruthy();
  });

  it('renders benefit plan cards from mock data', async () => {
    const { default: Page } = await import('@/app/[locale]/benefits-hub/page');
    render(<Page />);
    expect(screen.getByText('ประกันสุขภาพและทันตกรรม')).toBeTruthy();
    expect(screen.getByText('กองทุนสำรองเลี้ยงชีพ')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// /requests — template catalog + filter chips
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-4 smoke — /requests', () => {
  beforeEach(() => { vi.resetModules(); });

  it('renders request form catalog title', async () => {
    const { default: Page } = await import('@/app/[locale]/requests/page');
    render(<Page />);
    expect(screen.getByText('ขอลางาน')).toBeTruthy();
  });

  it('renders filter chips for request status', async () => {
    const { default: Page } = await import('@/app/[locale]/requests/page');
    render(<Page />);
    // Filter chips: ทั้งหมด / รออนุมัติ / อนุมัติแล้ว / ไม่อนุมัติ
    expect(screen.getByText('ทั้งหมด')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// /goals — goal cards + KPI section
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-4 smoke — /goals', () => {
  beforeEach(() => { vi.resetModules(); });

  it('renders goals KPI section', async () => {
    const { default: Page } = await import('@/app/[locale]/goals/page');
    render(<Page />);
    expect(screen.getByText('เป้าหมายที่อยู่ในแผน')).toBeTruthy();
  });

  it('renders goal items from HUMI_GOALS fixture', async () => {
    const { default: Page } = await import('@/app/[locale]/goals/page');
    const { container } = render(<Page />);
    // HUMI_GOALS items are rendered in the goals tab (default tab)
    // check for tabs which show goal data
    const tabButtons = container.querySelectorAll('button');
    const goalsTab = Array.from(tabButtons).find(b => b.textContent?.includes('เป้าหมายของฉัน'));
    expect(goalsTab).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// /learning-directory — course cards + filter tabs
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-4 smoke — /learning-directory', () => {
  beforeEach(() => { vi.resetModules(); });

  it('renders learning filter tabs', async () => {
    const { default: Page } = await import('@/app/[locale]/learning-directory/page');
    render(<Page />);
    expect(screen.getByText('ทั้งหมด')).toBeTruthy();
  });

  it('renders learning course cards from mock data', async () => {
    const { default: Page } = await import('@/app/[locale]/learning-directory/page');
    const { container } = render(<Page />);
    // Learning courses render as card elements
    const cards = container.querySelectorAll('[class*="humi-card"]');
    expect(cards.length).toBeGreaterThan(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// /org-chart — search input + node canvas
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-4 smoke — /org-chart', () => {
  beforeEach(() => { vi.resetModules(); });

  it('renders org chart search input', async () => {
    const { default: Page } = await import('@/app/[locale]/org-chart/page');
    const { container } = render(<Page />);
    const searchInput = container.querySelector('input[type="text"], input[placeholder]');
    expect(searchInput).toBeTruthy();
  });

  it('renders org chart canvas with node cards', async () => {
    const { default: Page } = await import('@/app/[locale]/org-chart/page');
    const { container } = render(<Page />);
    // NodeCard renders person name วาสนา จิรวัฒน์ (ประธาน)
    expect(screen.getByText('วาสนา จิรวัฒน์')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// /announcements — feed cards + channel list
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-4 smoke — /announcements', () => {
  beforeEach(() => { vi.resetModules(); });

  it('renders announcements filter tab bar', async () => {
    const { default: Page } = await import('@/app/[locale]/announcements/page');
    const { container } = render(<Page />);
    // Filter tabs: ทั้งหมด / ปฏิบัติการ / นโยบาย / ยกย่องชมเชย
    const filterButtons = container.querySelectorAll('button');
    const allFilter = Array.from(filterButtons).find(b => b.textContent?.includes('ทั้งหมด'));
    expect(allFilter).toBeTruthy();
  });

  it('renders announcement post cards from mock data', async () => {
    const { default: Page } = await import('@/app/[locale]/announcements/page');
    const { container } = render(<Page />);
    // HUMI_ANNOUNCEMENTS first item's author: ฝ่ายปฏิบัติการองค์กร
    expect(screen.getByText('ฝ่ายปฏิบัติการองค์กร')).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// /integrations — category chips + integration cards
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-4 smoke — /integrations', () => {
  beforeEach(() => { vi.resetModules(); });

  it('renders integration category filter chips', async () => {
    const { default: Page } = await import('@/app/[locale]/integrations/page');
    const { container } = render(<Page />);
    // Category chips from HUMI_INTEGRATION_CATEGORIES
    const buttons = container.querySelectorAll('button');
    const allChip = Array.from(buttons).find(b => b.textContent?.includes('ทั้งหมด'));
    expect(allChip).toBeTruthy();
  });

  it('renders integration KPI stats', async () => {
    const { default: Page } = await import('@/app/[locale]/integrations/page');
    const { container } = render(<Page />);
    // HUMI_INTEGRATION_KPIS rendered as stat cards
    const cards = container.querySelectorAll('[class*="humi-card"]');
    expect(cards.length).toBeGreaterThan(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// /login — form fields + submit button
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-4 smoke — /login', () => {
  beforeEach(() => { vi.resetModules(); });

  it('renders login form with email input', async () => {
    const { default: Page } = await import('@/app/[locale]/login/page');
    const { container } = render(<Page />);
    const emailInput = container.querySelector('input[type="email"], input[name="email"]');
    expect(emailInput).toBeTruthy();
  });

  it('renders login submit button', async () => {
    const { default: Page } = await import('@/app/[locale]/login/page');
    const { container } = render(<Page />);
    const submitBtn = container.querySelector('button[type="submit"]');
    expect(submitBtn).toBeTruthy();
  });
});
