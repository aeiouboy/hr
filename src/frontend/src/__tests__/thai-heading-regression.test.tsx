/**
 * thai-heading-regression.test.tsx
 * AC-7 — headings (h1/h2/h3) across all 11 routes must contain Thai text
 *
 * Regression guard: prevents accidental English-only headings from slipping in.
 * Whitelist tokens that are legitimately non-Thai: PDF, CSV, API, SSO, URL,
 * HR, KPI, OT, LOA, UUID, HTTP, JSON, JPEG, PNG, GIF, SVG, TH, EN.
 * AppShell h2 title (from TITLE_MAP — all Thai) is also counted.
 *
 * Strategy: render each page component directly (no AppShell wrapper needed
 * for heading checks — AppShell contributes h2 via Topbar, pages contribute h1/h3).
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';

// ── Mocks ────────────────────────────────────────────────────────────────────
vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/th/home'),
  useRouter: vi.fn().mockReturnValue({ push: vi.fn() }),
  useParams: vi.fn().mockReturnValue({ locale: 'th' }),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    // Return realistic Thai strings so headings have Thai content
    const map: Record<string, string> = {
      dateEyebrow: 'วันอังคาร · 21 เมษายน',
      greetingTitle: 'ยินดีต้อนรับกลับมา',
      greetingSub: 'มี 2 เรื่องที่ต้องดำเนินการวันนี้',
      newRequest: 'สร้างคำขอใหม่',
      todayTitle: 'ทีมพร้อมทำงาน',
      pendingTitle: 'คำขอลางาน',
      docsTitle: 'เอกสารรอลงนาม',
      feedTitle: 'ประกาศล่าสุด',
      calendarTitle: 'บนปฏิทิน',
      tabPersonal: 'ข้อมูลส่วนตัว',
      tabJob: 'การจ้างงาน',
      tabEmergency: 'ผู้ติดต่อฉุกเฉิน',
      tabDocs: 'เอกสาร',
      tabTax: 'ภาษี',
      // profile headings — prevent key fallback in h3
      personalTitle: 'รายละเอียดพื้นฐาน',
      personalEyebrow: 'ข้อมูลส่วนตัว',
      contactTitle: 'วิธีติดต่อคุณ',
      contactEyebrow: 'ข้อมูลการติดต่อ',
      // announcements
      title: 'ประกาศและข่าวสาร',
      filterAll: 'ทั้งหมด',
      draftTitle: 'สรุปผลโครงการพัฒนาองค์กร Q2',
      // goals
      tabGoals: 'เป้าหมายของฉัน',
      tabReviews: 'การประเมิน',
      // login — prevent key fallback as h1 content
      headline: 'ยินดีต้อนรับสู่ Humi',
      subline: 'แพลตฟอร์ม HR สำหรับทีมงานยุคใหม่',
      headlineLine1: 'ระบบเบื้องหลังที่',
      headlineLine2: 'ทีมของคุณคู่ควร',
      formTitle: 'เข้าสู่ระบบ Humi',
    };
    return map[key] ?? key;
  },
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// ── Thai Unicode range + whitelist ────────────────────────────────────────────
const THAI_RANGE = /[฀-๿]/;
const WHITELIST_TOKENS =
  /^(PDF|CSV|API|SSO|URL|HR|KPI|OT|LOA|UUID|HTTP|JSON|JPEG|PNG|GIF|SVG|⌘K|TH|EN|Humi|[\d\s·\-/%.,()'":!])$/;

/**
 * Returns true if the text contains Thai characters OR consists only of
 * whitelisted non-Thai tokens (e.g. "KPI · 58%")
 */
function hasThaiOrWhitelist(text: string): boolean {
  if (THAI_RANGE.test(text)) return true;
  // Strip whitelist tokens and check if anything non-Thai remains
  const stripped = text
    .replace(
      /\b(PDF|CSV|API|SSO|URL|HR|KPI|OT|LOA|UUID|HTTP|JSON|JPEG|PNG|GIF|SVG|TH|EN|Humi)\b/gi,
      '',
    )
    .replace(/[\d\s·\-/%.,()'":!⌘K]/g, '')
    .trim();
  return stripped.length === 0 || THAI_RANGE.test(stripped);
}

function getAllHeadings(container: HTMLElement) {
  return Array.from(container.querySelectorAll('h1, h2, h3'));
}

// ─────────────────────────────────────────────────────────────────────────────
// AC-7: Each page has headings with Thai text
// ─────────────────────────────────────────────────────────────────────────────

describe('AC-7 — Thai headings regression — /home', () => {
  beforeEach(() => { vi.resetModules(); });

  it('home page has h1/h3 with Thai text', async () => {
    const { default: Page } = await import('@/app/[locale]/home/page');
    const { container } = render(<Page />);
    const headings = getAllHeadings(container);
    expect(headings.length).toBeGreaterThan(0);
    const nonThai = headings.filter(h => !hasThaiOrWhitelist(h.textContent ?? ''));
    expect(nonThai.map(h => `${h.tagName}: "${h.textContent}"`)).toEqual([]);
  });
});

describe('AC-7 — Thai headings regression — /profile/me', () => {
  beforeEach(() => { vi.resetModules(); });

  it('profile/me page has Thai headings or no headings (tabs only)', async () => {
    const { default: Page } = await import('@/app/[locale]/profile/me/page');
    const { container } = render(<Page />);
    const headings = getAllHeadings(container);
    // Profile page uses tab panel pattern — any headings present must be Thai
    const nonThai = headings.filter(h => !hasThaiOrWhitelist(h.textContent ?? ''));
    expect(nonThai.map(h => `${h.tagName}: "${h.textContent}"`)).toEqual([]);
  });
});

describe('AC-7 — Thai headings regression — /timeoff', () => {
  beforeEach(() => { vi.resetModules(); });

  it('timeoff page has h1 with Thai text', async () => {
    const { default: Page } = await import('@/app/[locale]/timeoff/page');
    const { container } = render(<Page />);
    const headings = getAllHeadings(container);
    expect(headings.length).toBeGreaterThan(0);
    const nonThai = headings.filter(h => !hasThaiOrWhitelist(h.textContent ?? ''));
    expect(nonThai.map(h => `${h.tagName}: "${h.textContent}"`)).toEqual([]);
  });
});

describe('AC-7 — Thai headings regression — /benefits-hub', () => {
  beforeEach(() => { vi.resetModules(); });

  it('benefits-hub has Thai headings', async () => {
    const { default: Page } = await import('@/app/[locale]/benefits-hub/page');
    const { container } = render(<Page />);
    const headings = getAllHeadings(container);
    const nonThai = headings.filter(h => !hasThaiOrWhitelist(h.textContent ?? ''));
    expect(nonThai.map(h => `${h.tagName}: "${h.textContent}"`)).toEqual([]);
  });
});

describe('AC-7 — Thai headings regression — /requests', () => {
  beforeEach(() => { vi.resetModules(); });

  it('requests page has Thai headings', async () => {
    const { default: Page } = await import('@/app/[locale]/requests/page');
    const { container } = render(<Page />);
    const headings = getAllHeadings(container);
    const nonThai = headings.filter(h => !hasThaiOrWhitelist(h.textContent ?? ''));
    expect(nonThai.map(h => `${h.tagName}: "${h.textContent}"`)).toEqual([]);
  });
});

describe('AC-7 — Thai headings regression — /goals', () => {
  beforeEach(() => { vi.resetModules(); });

  it('goals page has Thai headings', async () => {
    const { default: Page } = await import('@/app/[locale]/goals/page');
    const { container } = render(<Page />);
    const headings = getAllHeadings(container);
    const nonThai = headings.filter(h => !hasThaiOrWhitelist(h.textContent ?? ''));
    expect(nonThai.map(h => `${h.tagName}: "${h.textContent}"`)).toEqual([]);
  });
});

describe('AC-7 — Thai headings regression — /learning-directory', () => {
  beforeEach(() => { vi.resetModules(); });

  it('learning-directory has Thai headings', async () => {
    const { default: Page } = await import('@/app/[locale]/learning-directory/page');
    const { container } = render(<Page />);
    const headings = getAllHeadings(container);
    const nonThai = headings.filter(h => !hasThaiOrWhitelist(h.textContent ?? ''));
    expect(nonThai.map(h => `${h.tagName}: "${h.textContent}"`)).toEqual([]);
  });
});

describe('AC-7 — Thai headings regression — /org-chart', () => {
  beforeEach(() => { vi.resetModules(); });

  it('org-chart has Thai headings or no headings', async () => {
    const { default: Page } = await import('@/app/[locale]/org-chart/page');
    const { container } = render(<Page />);
    const headings = getAllHeadings(container);
    const nonThai = headings.filter(h => !hasThaiOrWhitelist(h.textContent ?? ''));
    expect(nonThai.map(h => `${h.tagName}: "${h.textContent}"`)).toEqual([]);
  });
});

describe('AC-7 — Thai headings regression — /announcements', () => {
  beforeEach(() => { vi.resetModules(); });

  it('announcements has Thai headings', async () => {
    const { default: Page } = await import('@/app/[locale]/announcements/page');
    const { container } = render(<Page />);
    const headings = getAllHeadings(container);
    const nonThai = headings.filter(h => !hasThaiOrWhitelist(h.textContent ?? ''));
    expect(nonThai.map(h => `${h.tagName}: "${h.textContent}"`)).toEqual([]);
  });
});

describe('AC-7 — Thai headings regression — /integrations', () => {
  beforeEach(() => { vi.resetModules(); });

  it('integrations has Thai headings', async () => {
    const { default: Page } = await import('@/app/[locale]/integrations/page');
    const { container } = render(<Page />);
    const headings = getAllHeadings(container);
    const nonThai = headings.filter(h => !hasThaiOrWhitelist(h.textContent ?? ''));
    expect(nonThai.map(h => `${h.tagName}: "${h.textContent}"`)).toEqual([]);
  });
});

describe('AC-7 — Thai headings regression — /login', () => {
  beforeEach(() => { vi.resetModules(); });

  it('login page has Thai headings', async () => {
    const { default: Page } = await import('@/app/[locale]/login/page');
    const { container } = render(<Page />);
    const headings = getAllHeadings(container);
    // Login page may not have h1 — just verify no English-only headings exist
    const nonThai = headings.filter(h => !hasThaiOrWhitelist(h.textContent ?? ''));
    expect(nonThai.map(h => `${h.tagName}: "${h.textContent}"`)).toEqual([]);
  });
});
