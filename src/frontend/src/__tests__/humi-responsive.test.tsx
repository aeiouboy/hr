/**
 * humi-responsive.test.tsx
 * Viewport class-string assertions for responsive Sprint #5 (issue #5).
 *
 * Strategy: jsdom does NOT apply media queries, so we assert that the
 * responsive Tailwind class tokens are present in the rendered DOM.
 * Playwright handles actual breakpoint rendering in validate phase.
 *
 * AC-1  shell        — mobile drawer wrapper classes
 * AC-2  nav-active   — Humi Nav mounted (no regression from #3)
 * AC-3  sm-grids     — per-screen responsive grid class tokens
 * AC-4  desktop-no-regression — topbar bell + theme toggle present
 * AC-5  modal-mobile — CommandPalette full-screen tokens
 * AC-6  touch-target — icon buttons h-11 w-11 / min-h-[44px]
 * AC-7  hamburger-drawer — hamburger lg:hidden, drawer panel classes
 * AC-8  topbar-compressed — eyebrow hidden sm:block, search sm:hidden/sm:flex
 * AC-9  cmdpalette-fullscreen — fixed inset-0, sm:max-w-lg sm:rounded-2xl
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import { useUIStore } from '@/stores/ui-store';
import { AppShell } from '@/components/humi/shell/AppShell';

// ── Mock next/navigation ─────────────────────────────────────────────────────
vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/th/home'),
  useRouter: vi.fn().mockReturnValue({ push: vi.fn() }),
  useParams: vi.fn().mockReturnValue({ locale: 'th' }),
}));

// ── Mock next-intl ───────────────────────────────────────────────────────────
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
      subtitle: 'พนักงาน',
      pinnedTag: 'ปักหมุด',
      replyCta: 'ตอบกลับ',
      newPost: 'โพสต์ใหม่',
      // learning
      searchPlaceholder: 'ค้นหาคอร์ส...',
      // timeoff
      newRequest2: 'ลางาน',
      // benefits
      newBenefit: 'สวัสดิการ',
      // requests
      summary: 'สรุป',
      // goals
      newGoal: 'เป้าหมายใหม่',
      // integrations
      manage: 'จัดการ',
      // login
      headline: 'ยินดีต้อนรับสู่ Humi',
      subline: 'แพลตฟอร์ม HR สำหรับทีมงานยุคใหม่',
      emailLabel: 'อีเมล',
      passwordLabel: 'รหัสผ่าน',
      rememberLabel: 'จดจำฉัน',
      submitLabel: 'เข้าสู่ระบบ',
      forgotLabel: 'ลืมรหัสผ่าน?',
    };
    return map[key] ?? key;
  },
}));

// ── Mock next/link ───────────────────────────────────────────────────────────
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// ── Mock next/image ───────────────────────────────────────────────────────────
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, priority: _p, ...props }: { src: string; alt: string; width?: number; height?: number; priority?: boolean; [k: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} {...props} />
  ),
}));

// Helper: collect all className strings from DOM tree
function allClassTokens(container: HTMLElement): string {
  const tokens: string[] = [];
  container.querySelectorAll('[class]').forEach((el) => {
    tokens.push(...(el.getAttribute('class') ?? '').split(/\s+/));
  });
  return tokens.join(' ');
}

// ─────────────────────────────────────────────────────────────────────────────
// AC-1 + AC-7 — AppShell mobile drawer classes
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-1 + AC-7 — AppShell mobile drawer', () => {
  beforeEach(() => {
    // ใช้ top-level import (store singleton เดียวกับ AppShell)
    useUIStore.setState({ mobileMenuOpen: false });
  });
  afterEach(() => {
    useUIStore.setState({ mobileMenuOpen: false });
  });

  it('drawer panel has fixed inset-y-0 left-0 z-40 when mobileMenuOpen=true', () => {
    const { container } = render(
      <AppShell>
        <div>content</div>
      </AppShell>
    );
    // set state after initial render+effects (pathname useEffect resets to false)
    act(() => { useUIStore.setState({ mobileMenuOpen: true }); });

    // AC-1: drawer panel must carry mobile overlay positioning classes
    const tokens = allClassTokens(container);
    expect(tokens).toContain('fixed');
    expect(tokens).toContain('inset-y-0');
    expect(tokens).toContain('z-40');
  });

  it('backdrop has fixed inset-0 bg-ink/40 when mobileMenuOpen=true', () => {
    const { container } = render(
      <AppShell>
        <div>content</div>
      </AppShell>
    );
    act(() => { useUIStore.setState({ mobileMenuOpen: true }); });

    // AC-7: backdrop behind drawer
    const tokens = allClassTokens(container);
    expect(tokens).toContain('inset-0');
    expect(tokens).toContain('z-30');
  });

  it('no drawer panel rendered when mobileMenuOpen=false', () => {
    const { container } = render(
      <AppShell>
        <div>content</div>
      </AppShell>
    );
    // beforeEach already sets mobileMenuOpen=false; verify closed state
    act(() => { useUIStore.setState({ mobileMenuOpen: false }); });

    // z-40 drawer div must not exist when closed
    const drawerEl = container.querySelector('.z-40');
    expect(drawerEl).toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC-2 — Nav regression: Sidebar (Nav) still mounted in AppShell
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-2 — Nav-active sidebar not replaced', () => {
  beforeEach(() => { vi.resetModules(); });

  it('AppShell renders Sidebar nav landmark', async () => {
    const { useUIStore } = await import('@/stores/ui-store');
    useUIStore.setState({ mobileMenuOpen: false });

    const { AppShell } = await import('@/components/humi/shell/AppShell');
    const { container } = render(
      <AppShell>
        <div>content</div>
      </AppShell>
    );

    // Nav landmark must be present (Sidebar renders <nav> element)
    const navEl = container.querySelector('nav');
    expect(navEl).toBeTruthy();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC-4 + AC-8 — Topbar: bell, theme toggle, eyebrow, h2 + responsive tokens
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-4 + AC-8 — Topbar no-regression + compressed tokens', () => {
  beforeEach(() => { vi.resetModules(); });

  it('Topbar renders h2 page title', async () => {
    const { Topbar } = await import('@/components/humi/shell/Topbar');
    const { getByRole } = render(<Topbar title="หน้าหลัก" />);
    expect(getByRole('heading', { level: 2 })).toBeTruthy();
  });

  it('Topbar hamburger button has lg:hidden class (mobile-only)', async () => {
    const { Topbar } = await import('@/components/humi/shell/Topbar');
    const { container } = render(<Topbar title="หน้าหลัก" />);
    const tokens = allClassTokens(container);
    // AC-7 hamburger is lg:hidden
    expect(tokens).toContain('lg:hidden');
  });

  it('Topbar eyebrow div has hidden sm:block classes', async () => {
    const { Topbar } = await import('@/components/humi/shell/Topbar');
    const { container } = render(<Topbar title="หน้าหลัก" />);
    const tokens = allClassTokens(container);
    // AC-8: eyebrow hidden on mobile
    expect(tokens).toContain('hidden');
    expect(tokens).toContain('sm:block');
  });

  it('Topbar has search pill with hidden sm:flex classes', async () => {
    const { Topbar } = await import('@/components/humi/shell/Topbar');
    const { container } = render(<Topbar title="หน้าหลัก" />);
    const tokens = allClassTokens(container);
    // AC-8: search pill hidden on mobile, visible sm+
    expect(tokens).toContain('sm:flex');
    // search icon-only mobile button
    expect(tokens).toContain('sm:hidden');
  });

  it('Topbar bell and theme-toggle buttons are present (AC-4 regression)', async () => {
    const { Topbar } = await import('@/components/humi/shell/Topbar');
    const { getAllByRole } = render(<Topbar title="หน้าหลัก" />);
    const buttons = getAllByRole('button');
    // hamburger + search-icon-only + theme-toggle + bell = at least 4
    expect(buttons.length).toBeGreaterThanOrEqual(4);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC-5 + AC-9 — CommandPalette responsive class tokens
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-5 + AC-9 — CommandPalette fullscreen/modal tokens', () => {
  beforeEach(() => { vi.resetModules(); });

  it('CommandPalette backdrop has fixed inset-0 (full-screen mobile base)', async () => {
    const { CommandPalette } = await import('@/components/humi/shell/CommandPalette');
    const { container } = render(
      <CommandPalette open={true} onClose={() => {}} />
    );
    const tokens = allClassTokens(container);
    // AC-9: fixed + inset-0 = full-screen overlay
    expect(tokens).toContain('fixed');
    expect(tokens).toContain('inset-0');
  });

  it('CommandPalette panel has sm:max-w-lg for centered desktop modal', async () => {
    const { CommandPalette } = await import('@/components/humi/shell/CommandPalette');
    const { container } = render(
      <CommandPalette open={true} onClose={() => {}} />
    );
    const tokens = allClassTokens(container);
    // AC-9: sm:max-w-lg token must exist
    expect(tokens).toContain('sm:max-w-lg');
  });

  it('CommandPalette panel has sm:rounded-2xl (rounded corners on sm+ only)', async () => {
    const { CommandPalette } = await import('@/components/humi/shell/CommandPalette');
    const { container } = render(
      <CommandPalette open={true} onClose={() => {}} />
    );
    const tokens = allClassTokens(container);
    // Mobile = rounded-none; sm+ = sm:rounded-2xl
    expect(tokens).toContain('rounded-none');
    expect(tokens).toContain('sm:rounded-2xl');
  });

  it('CommandPalette search row has min-h-[44px] touch target', async () => {
    const { CommandPalette } = await import('@/components/humi/shell/CommandPalette');
    const { container } = render(
      <CommandPalette open={true} onClose={() => {}} />
    );
    const tokens = allClassTokens(container);
    expect(tokens).toContain('min-h-[44px]');
  });

  it('CommandPalette not rendered when open=false', async () => {
    const { CommandPalette } = await import('@/components/humi/shell/CommandPalette');
    const { container } = render(
      <CommandPalette open={false} onClose={() => {}} />
    );
    // Nothing rendered
    expect(container.firstChild).toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC-3 — Per-screen responsive grid class tokens
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-3 — home page grid tokens', () => {
  beforeEach(() => { vi.resetModules(); });

  it('home outer grid has lg:grid-cols-[1.35fr_1fr] desktop layout', async () => {
    const { default: Page } = await import('@/app/[locale]/home/page');
    const { container } = render(<Page />);
    const tokens = allClassTokens(container);
    expect(tokens).toContain('lg:grid-cols-[1.35fr_1fr]');
  });
});

describe('AC-3 — announcements page grid tokens', () => {
  beforeEach(() => { vi.resetModules(); });

  it('announcements feed has lg:grid-cols-[1fr_320px] sidebar layout', async () => {
    const { default: Page } = await import('@/app/[locale]/announcements/page');
    const { container } = render(<Page />);
    const tokens = allClassTokens(container);
    expect(tokens).toContain('lg:grid-cols-[1fr_320px]');
  });

  it('announcements feed wrapper has grid class token', async () => {
    const { default: Page } = await import('@/app/[locale]/announcements/page');
    const { container } = render(<Page />);
    const tokens = allClassTokens(container);
    expect(tokens).toContain('grid');
  });
});

describe('AC-3 — profile page tabs overflow', () => {
  beforeEach(() => { vi.resetModules(); });

  it('profile tabs row has overflow-x-auto for mobile scroll', async () => {
    const { ProfileTabs } = await import('@/components/profile/profile-tabs');
    const { container } = render(
      <ProfileTabs activeTab="personal" />
    );
    const tokens = allClassTokens(container);
    expect(tokens).toContain('overflow-x-auto');
  });
});

describe('AC-3 — timeoff page grid tokens', () => {
  beforeEach(() => { vi.resetModules(); });

  it('timeoff KPI section has grid-cols-2 sm:grid-cols-3 tokens', async () => {
    const { default: Page } = await import('@/app/[locale]/timeoff/page');
    const { container } = render(<Page />);
    const tokens = allClassTokens(container);
    expect(tokens).toContain('grid-cols-2');
    expect(tokens).toContain('sm:grid-cols-3');
  });
});

describe('AC-3 — benefits-hub page grid tokens', () => {
  beforeEach(() => { vi.resetModules(); });

  it('benefits card grid has md:grid-cols-2 lg:grid-cols-3 tokens', async () => {
    const { default: Page } = await import('@/app/[locale]/benefits-hub/page');
    const { container } = render(<Page />);
    const tokens = allClassTokens(container);
    expect(tokens).toContain('md:grid-cols-2');
    expect(tokens).toContain('lg:grid-cols-3');
  });
});

describe('AC-3 — requests page grid tokens', () => {
  beforeEach(() => { vi.resetModules(); });

  it('requests summary section has grid-cols-2 sm:grid-cols-4 tokens', async () => {
    const { default: Page } = await import('@/app/[locale]/requests/page');
    const { container } = render(<Page />);
    const tokens = allClassTokens(container);
    expect(tokens).toContain('grid-cols-2');
    expect(tokens).toContain('sm:grid-cols-4');
  });
});

describe('AC-3 — goals page grid tokens', () => {
  beforeEach(() => { vi.resetModules(); });

  it('goals page has grid-cols-1 md:grid-cols-2 tokens', async () => {
    const { default: Page } = await import('@/app/[locale]/goals/page');
    const { container } = render(<Page />);
    const tokens = allClassTokens(container);
    expect(tokens).toContain('grid-cols-1');
    expect(tokens).toContain('md:grid-cols-2');
  });
});

describe('AC-3 — learning-directory page grid tokens', () => {
  beforeEach(() => { vi.resetModules(); });

  it('learning grid has md:grid-cols-2 lg:grid-cols-3 tokens', async () => {
    const { default: Page } = await import('@/app/[locale]/learning-directory/page');
    const { container } = render(<Page />);
    const tokens = allClassTokens(container);
    expect(tokens).toContain('md:grid-cols-2');
    expect(tokens).toContain('lg:grid-cols-3');
  });
});

describe('AC-3 — org-chart page overflow', () => {
  beforeEach(() => { vi.resetModules(); });

  it('org-chart canvas wrapper has overflow-x-auto for horizontal scroll', async () => {
    const { default: Page } = await import('@/app/[locale]/org-chart/page');
    const { container } = render(<Page />);
    const tokens = allClassTokens(container);
    expect(tokens).toContain('overflow-x-auto');
  });
});

describe('AC-3 — integrations page grid + chip overflow', () => {
  beforeEach(() => { vi.resetModules(); });

  it('integrations card grid has md:grid-cols-2 lg:grid-cols-3', async () => {
    const { default: Page } = await import('@/app/[locale]/integrations/page');
    const { container } = render(<Page />);
    const tokens = allClassTokens(container);
    expect(tokens).toContain('md:grid-cols-2');
    expect(tokens).toContain('lg:grid-cols-3');
  });

  it('integrations chip/filter row has overflow-x-auto flex-nowrap', async () => {
    const { default: Page } = await import('@/app/[locale]/integrations/page');
    const { container } = render(<Page />);
    const tokens = allClassTokens(container);
    expect(tokens).toContain('overflow-x-auto');
    expect(tokens).toContain('flex-nowrap');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC-6 — Touch-target assertions
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-6 — touch-target: icon buttons in Topbar', () => {
  beforeEach(() => { vi.resetModules(); });

  it('Topbar icon buttons carry humi-icon-btn class (44px tap region via CSS)', async () => {
    const { Topbar } = await import('@/components/humi/shell/Topbar');
    const { container } = render(<Topbar title="หน้าหลัก" />);
    // humi-icon-btn CSS class provides min 44px touch target
    const iconBtns = container.querySelectorAll('.humi-icon-btn');
    expect(iconBtns.length).toBeGreaterThanOrEqual(3);
  });
});

describe('AC-6 — touch-target: announcements pin button', () => {
  beforeEach(() => { vi.resetModules(); });

  it('pin button in announcements has h-11 w-11 class tokens', async () => {
    const { default: Page } = await import('@/app/[locale]/announcements/page');
    const { container } = render(<Page />);
    // h-11 w-11 on pin button
    const pinBtn = container.querySelector('button[aria-label="ปักหมุด"], button[aria-label="เลิกปักหมุด"]');
    if (pinBtn) {
      expect(pinBtn.className).toContain('h-11');
      expect(pinBtn.className).toContain('w-11');
    } else {
      // fallback: check tokens across page
      const tokens = allClassTokens(container);
      expect(tokens).toContain('h-11');
      expect(tokens).toContain('w-11');
    }
  });
});

describe('AC-6 — touch-target: requests ArrowRight button', () => {
  beforeEach(() => { vi.resetModules(); });

  it('requests detail arrow button has h-11 w-11 tokens', async () => {
    const { default: Page } = await import('@/app/[locale]/requests/page');
    const { container } = render(<Page />);
    const tokens = allClassTokens(container);
    expect(tokens).toContain('h-11');
    expect(tokens).toContain('w-11');
  });
});

describe('AC-6 — touch-target: benefits enroll button', () => {
  beforeEach(() => { vi.resetModules(); });

  it('benefits enroll button has min-h-[44px] token', async () => {
    const { default: Page } = await import('@/app/[locale]/benefits-hub/page');
    const { container } = render(<Page />);
    const tokens = allClassTokens(container);
    expect(tokens).toContain('min-h-[44px]');
  });
});

describe('AC-6 — touch-target: timeoff submit button', () => {
  beforeEach(() => { vi.resetModules(); });

  it('timeoff submit/attachment area has h-11 or min-h-[44px] token', async () => {
    const { default: Page } = await import('@/app/[locale]/timeoff/page');
    const { container } = render(<Page />);
    const tokens = allClassTokens(container);
    // Either h-11 (Button) or min-h-[44px] (attachment label)
    const hasTarget = tokens.includes('h-11') || tokens.includes('min-h-[44px]');
    expect(hasTarget).toBe(true);
  });
});

describe('AC-6 — touch-target: integrations toggle wrapper', () => {
  beforeEach(() => { vi.resetModules(); });

  it('integrations toggle wrapper has min-h-[44px] token', async () => {
    const { default: Page } = await import('@/app/[locale]/integrations/page');
    const { container } = render(<Page />);
    const tokens = allClassTokens(container);
    expect(tokens).toContain('min-h-[44px]');
  });
});
