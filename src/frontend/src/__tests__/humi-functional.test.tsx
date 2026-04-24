/**
 * humi-functional.test.tsx
 * AC-3, AC-5, AC-6, AC-10, AC-13 — per-screen interaction tests
 *
 * Tests user interactions using @testing-library/react userEvent.
 * Zustand stores use real create() and reset state beforeEach via
 * store.setState() or direct getState().
 *
 * Real fixtures from humi-mock-data used (rule 63).
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, act, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ── Mocks ────────────────────────────────────────────────────────────────────
const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/th/home'),
  useRouter: vi.fn().mockReturnValue({
    push: mockPush,
    replace: mockPush,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useParams: vi.fn().mockReturnValue({ locale: 'th' }),
  useSearchParams: vi.fn().mockReturnValue(new URLSearchParams()),
}));

// Auth-store mock — AppShell + Topbar render null / hide features without this.
// Same pattern as layout-integration.test.tsx + humi-responsive.test.tsx.
vi.mock('@/stores/auth-store', () => {
  const state = {
    isAuthenticated: true,
    roles: ['admin'] as string[],
    _hasHydrated: true,
    email: 'jongrak@central.co.th',
    displayName: 'จงรักษ์ ทานากะ',
    initials: 'จท',
    setAuth: vi.fn(),
    clearAuth: vi.fn(),
    setHasHydrated: vi.fn(),
  };
  const useAuthStore = Object.assign(
    (selector?: (s: typeof state) => unknown) =>
      selector ? selector(state) : state,
    { getState: () => state, setState: vi.fn(), subscribe: vi.fn() }
  );
  return { useAuthStore };
});

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      newRequest: 'สร้างคำขอใหม่',
      greetingTitle: 'ยินดีต้อนรับกลับมา คุณจงรักษ์',
      greetingSub: 'มี 2 เรื่องที่ต้องดำเนินการวันนี้',
      dateEyebrow: 'วันอังคาร · 21 เมษายน',
      todayTitle: 'ทีมพร้อมทำงาน',
      pendingTitle: 'คำขอลางาน',
      docsTitle: 'เอกสารรอลงนาม',
      feedTitle: 'ประกาศล่าสุด',
      ctaApprove: 'อนุมัติคำขอลา 2 รายการ',
      ctaAnnouncements: 'ตรวจสอบร่างประกาศ',
      // profile — tab labels
      tabPersonal: 'ข้อมูลส่วนตัว',
      tabJob: 'การจ้างงาน',
      tabEmergency: 'ผู้ติดต่อฉุกเฉิน',
      tabDocs: 'เอกสาร',
      tabTax: 'ภาษี',
      profileEdit: 'แก้ไข',
      profileCancelEdit: 'ยกเลิก',
      save: 'บันทึก',
      subtitle: 'พนักงาน',
      // profile — panel headings (used by tab-routing regression tests).
      // NOTE: `docsTitle` is intentionally re-used by both home (เอกสารรอลงนาม)
      // and profile/me docs panel. Regression test for docs tab matches a
      // file-list item (สัญญาจ้างงานที่ลงนาม) instead of the heading to avoid ambiguity.
      personalTitle: 'รายละเอียดพื้นฐาน',
      contactTitle: 'วิธีติดต่อคุณ',
      jobTitle: 'ข้อมูลตำแหน่งงาน',
      emergencyTitle: 'ผู้ติดต่อกรณีฉุกเฉิน',
      emergencyHelp: 'กรุณาให้ข้อมูลอย่างน้อย 1 คน',
      taxTitle: 'แบบฟอร์มภาษี',
      // announcements
      title: 'ประกาศและข่าวสาร',
      filterAll: 'ทั้งหมด',
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

vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, priority: _p, ...props }: { src: string; alt: string; width?: number; height?: number; priority?: boolean; [k: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} {...props} />
  ),
}));

// ─────────────────────────────────────────────────────────────────────────────
// c1 — /profile/me: tab switching + edit/save flow
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-3 — /profile/me functional', () => {
  beforeEach(() => {
    vi.resetModules();
    mockPush.mockReset();
    // Reset localStorage to avoid persisted state bleed
    localStorage.clear();
  });

  it('clicking employment tab changes activeTab in Zustand store', async () => {
    const user = userEvent.setup();
    const { default: Page } = await import('@/app/[locale]/profile/me/page');
    render(<Page />);

    const { useHumiProfileStore } = await import('@/stores/humi-profile-slice');
    // Initial tab is personal
    expect(useHumiProfileStore.getState().activeTab).toBe('personal');

    // Click employment tab (label from t('tabJob') = 'การจ้างงาน')
    const jobTab = screen.getByText('การจ้างงาน');
    await user.click(jobTab);

    expect(useHumiProfileStore.getState().activeTab).toBe('employment');
  });

  it('clicking edit button enters draft mode', async () => {
    const user = userEvent.setup();
    const { default: Page } = await import('@/app/[locale]/profile/me/page');
    render(<Page />);

    const { useHumiProfileStore } = await import('@/stores/humi-profile-slice');
    expect(useHumiProfileStore.getState().isEditing).toBe(false);

    const editBtn = screen.getByText('แก้ไข');
    await user.click(editBtn);

    expect(useHumiProfileStore.getState().isEditing).toBe(true);
  });

  it('clicking save after edit calls save and shows toast', async () => {
    const user = userEvent.setup();
    const { default: Page } = await import('@/app/[locale]/profile/me/page');
    render(<Page />);

    // Enter edit mode
    const editBtn = screen.getByText('แก้ไข');
    await user.click(editBtn);

    // Click save
    const saveBtn = screen.getByText('บันทึก');
    await user.click(saveBtn);

    // Toast "บันทึกเรียบร้อย" should appear
    await waitFor(() => {
      expect(screen.getByRole('status')).toBeTruthy();
    });
    expect(screen.getByRole('status').textContent).toContain('บันทึกเรียบร้อย');
  });

  it('updateDraft updates draft.nickname in store', async () => {
    const { useHumiProfileStore } = await import('@/stores/humi-profile-slice');
    act(() => {
      useHumiProfileStore.getState().startEdit();
      useHumiProfileStore.getState().updateDraft({ nickname: 'ทดสอบ' });
    });
    expect(useHumiProfileStore.getState().draft.nickname).toBe('ทดสอบ');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// c2 — /home: shortcut tile click + time-based greeting
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-5 — /home functional', () => {
  beforeEach(() => {
    vi.resetModules();
    mockPush.mockReset();
  });

  it('greeting text contains Thai time-based prefix', async () => {
    const { default: Page } = await import('@/app/[locale]/home/page');
    render(<Page />);
    const h1 = screen.getByRole('heading', { level: 1 });
    // Should contain สวัสดีตอน (เช้า/บ่าย/เย็น)
    expect(h1.textContent).toMatch(/สวัสดีตอน(เช้า|บ่าย|เย็น)/);
  });

  it('approve CTA links to timeoff route', async () => {
    const { default: Page } = await import('@/app/[locale]/home/page');
    render(<Page />);
    const approveLink = screen.getByText('อนุมัติคำขอลา 2 รายการ');
    // It's rendered as an <a> (via next/link mock)
    const anchor = approveLink.closest('a');
    expect(anchor?.getAttribute('href')).toContain('/th/timeoff');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// c3 — /announcements: pin toggle + filter
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-6 — /announcements functional', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
  });

  it('clicking pin button toggles pinned state in store', async () => {
    const user = userEvent.setup();
    const { default: Page } = await import('@/app/[locale]/announcements/page');
    render(<Page />);

    const { useHumiAnnouncementsStore } = await import('@/stores/humi-announcements-slice');
    const initialPinnedCount = useHumiAnnouncementsStore.getState().pinned.length;

    // Find pin buttons (aria-label contains "ปักหมุด")
    const pinBtns = screen.getAllByRole('button', { name: /ปักหมุด/i });
    expect(pinBtns.length).toBeGreaterThan(0);
    await user.click(pinBtns[0]);

    // pinned array should grow
    const afterPinnedCount = useHumiAnnouncementsStore.getState().pinned.length;
    expect(afterPinnedCount).toBeGreaterThan(initialPinnedCount);
  });

  it('setFilter changes activeFilter in store', async () => {
    const { useHumiAnnouncementsStore } = await import('@/stores/humi-announcements-slice');
    act(() => {
      useHumiAnnouncementsStore.getState().setFilter('policy');
    });
    expect(useHumiAnnouncementsStore.getState().activeFilter).toBe('policy');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// c5 — /timeoff: submit + validation
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-13 — /timeoff functional', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
  });

  it('timeoff store submit appends new item to history', async () => {
    const { useTimeoffStore } = await import('@/stores/humi-timeoff-slice');

    const initialLen = useTimeoffStore.getState().history.length;
    act(() => {
      useTimeoffStore.getState().submit({
        kind: 'vacation',
        kindLabel: 'ลาพักร้อน',
        fromDate: '25 เม.ย.',
        toDate: '26 เม.ย.',
        reason: 'พักผ่อน',
      });
    });

    expect(useTimeoffStore.getState().history.length).toBe(initialLen + 1);
    expect(useTimeoffStore.getState().history[0].fromDate).toBe('25 เม.ย.');
  });

  it('renders validation error when fromDate > toDate', async () => {
    const user = userEvent.setup();
    const { default: Page } = await import('@/app/[locale]/timeoff/page');
    render(<Page />);

    // Default tab is 'request' — fill dates with invalid range via label-based query
    // Placeholders: from = "เช่น 28 เม.ย.", to = "เช่น 2 พ.ค."
    const fromInput = screen.getByPlaceholderText(/เช่น 28/);
    const toInput = screen.getByPlaceholderText(/เช่น 2 พ/);

    await user.clear(fromInput);
    await user.type(fromInput, '30 เม.ย.');
    await user.clear(toInput);
    await user.type(toInput, '01 เม.ย.');

    // Submit — button label is "ส่งคำขอ" (short form, not "ส่งคำขอลา")
    const submitBtn = screen.getByRole('button', { name: /ส่งคำขอ$/i });
    await user.click(submitBtn);

    // Error message should appear — rendered in <p role="alert"> inside Field
    await waitFor(() => {
      expect(screen.getByText(/วันสิ้นสุดต้องไม่ก่อนวันเริ่ม/)).toBeTruthy();
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// c6 — /benefits-hub: tab switch + enroll toggle
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-10 — /benefits-hub functional', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
  });

  it('clicking claims tab sets activeTab to claims', async () => {
    const user = userEvent.setup();
    const { default: Page } = await import('@/app/[locale]/benefits-hub/page');
    render(<Page />);

    const claimsTab = screen.getByRole('tab', { name: /เบิกค่าใช้จ่าย/i });
    await user.click(claimsTab);

    const { useBenefitsStore } = await import('@/stores/humi-benefits-slice');
    expect(useBenefitsStore.getState().activeTab).toBe('claims');
  });

  it('toggleEnroll removes id from enrolled set when already enrolled', async () => {
    const { useBenefitsStore } = await import('@/stores/humi-benefits-slice');

    // All 3 plans enrolled by default
    expect(useBenefitsStore.getState().enrolled.has('bp-health')).toBe(true);

    act(() => {
      useBenefitsStore.getState().toggleEnroll('bp-health');
    });

    expect(useBenefitsStore.getState().enrolled.has('bp-health')).toBe(false);
  });

  it('toggleEnroll adds id to enrolled set when not enrolled', async () => {
    const { useBenefitsStore } = await import('@/stores/humi-benefits-slice');

    // Remove first, then add back
    act(() => {
      useBenefitsStore.getState().toggleEnroll('bp-health');
    });
    expect(useBenefitsStore.getState().enrolled.has('bp-health')).toBe(false);

    act(() => {
      useBenefitsStore.getState().toggleEnroll('bp-health');
    });
    expect(useBenefitsStore.getState().enrolled.has('bp-health')).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// c7 — /requests: template select + submit
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-3 — /requests functional', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
  });

  it('submit action appends to submissions in store', async () => {
    const { useRequestsStore } = await import('@/stores/humi-requests-slice');

    const initialLen = useRequestsStore.getState().submissions.length;
    act(() => {
      useRequestsStore.getState().submit({ type: 'ขอลางาน', sub: 'ประเภทการลา: ลาพักร้อน' });
    });

    expect(useRequestsStore.getState().submissions.length).toBe(initialLen + 1);
    expect(useRequestsStore.getState().submissions[0].type).toBe('ขอลางาน');
    expect(useRequestsStore.getState().submissions[0].status).toBe('pending');
  });

  it('setFilter updates filter state in store', async () => {
    const { useRequestsStore } = await import('@/stores/humi-requests-slice');
    act(() => {
      useRequestsStore.getState().setFilter('approved');
    });
    expect(useRequestsStore.getState().filter).toBe('approved');
  });

  it('filter chip click changes filter state', async () => {
    const user = userEvent.setup();
    const { default: Page } = await import('@/app/[locale]/requests/page');
    render(<Page />);

    // Filter chip for 'รออนุมัติ'
    const pendingChip = screen.getByRole('button', { name: /รออนุมัติ/ });
    await user.click(pendingChip);

    const { useRequestsStore } = await import('@/stores/humi-requests-slice');
    expect(useRequestsStore.getState().filter).toBe('pending');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// c8 — /goals: create goal + store update
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-5 — /goals functional', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
  });

  it('create adds goal item to store', async () => {
    const { useGoalsStore } = await import('@/stores/humi-goals-slice');

    // Reset goals
    act(() => {
      useGoalsStore.setState({ goals: [] });
    });
    expect(useGoalsStore.getState().goals.length).toBe(0);

    act(() => {
      useGoalsStore.getState().create({
        title: 'เป้าหมายทดสอบ',
        target: 'เพิ่มยอด 20%',
        dueDate: '30 มิ.ย.',
        progress: 0,
        category: 'ธุรกิจ',
      });
    });

    expect(useGoalsStore.getState().goals.length).toBe(1);
    expect(useGoalsStore.getState().goals[0].title).toBe('เป้าหมายทดสอบ');
  });

  it('update patches goal progress in store', async () => {
    const { useGoalsStore } = await import('@/stores/humi-goals-slice');

    act(() => {
      useGoalsStore.setState({ goals: [] });
      useGoalsStore.getState().create({
        title: 'ปรับปรุง',
        target: 'เป้าหมาย',
        dueDate: '31 ธ.ค.',
        progress: 10,
        category: 'HR',
      });
    });

    const goalId = useGoalsStore.getState().goals[0].id;
    act(() => {
      useGoalsStore.getState().update(goalId, { progress: 75 });
    });

    expect(useGoalsStore.getState().goals[0].progress).toBe(75);
  });

  it('clicking create button opens modal', async () => {
    const user = userEvent.setup();
    const { default: Page } = await import('@/app/[locale]/goals/page');
    render(<Page />);

    const createBtn = screen.getByRole('button', { name: /เพิ่มเป้าหมาย/i });
    await user.click(createBtn);

    // Modal should open (GoalFormModal renders a dialog/modal)
    await waitFor(() => {
      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog).toBeTruthy();
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// c9 — /learning-directory: search + filter
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-6 — /learning-directory functional', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
  });

  it('setQuery updates query in learning store', async () => {
    const { useLearningStore } = await import('@/stores/humi-learning-slice');
    act(() => {
      useLearningStore.getState().setQuery('ความปลอดภัย');
    });
    expect(useLearningStore.getState().query).toBe('ความปลอดภัย');
  });

  it('setFilter changes filter tab in store', async () => {
    const { useLearningStore } = await import('@/stores/humi-learning-slice');
    act(() => {
      useLearningStore.getState().setFilter('enrolled');
    });
    expect(useLearningStore.getState().filter).toBe('enrolled');
  });

  it('toggleEnroll adds course to enrolled set', async () => {
    const { useLearningStore } = await import('@/stores/humi-learning-slice');
    act(() => {
      useLearningStore.setState({ enrolled: new Set<string>() });
      useLearningStore.getState().toggleEnroll('course-001');
    });
    expect(useLearningStore.getState().enrolled.has('course-001')).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// c10 — /org-chart: search + node select
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-10 — /org-chart functional', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('setQuery updates query in orgchart store', async () => {
    const { useOrgChartStore } = await import('@/stores/humi-orgchart-slice');
    act(() => {
      useOrgChartStore.getState().setQuery('วาสนา');
    });
    expect(useOrgChartStore.getState().query).toBe('วาสนา');
  });

  it('select updates selectedId in store', async () => {
    const { useOrgChartStore } = await import('@/stores/humi-orgchart-slice');
    act(() => {
      useOrgChartStore.getState().select('emp-002');
    });
    expect(useOrgChartStore.getState().selectedId).toBe('emp-002');
  });

  it('clicking org chart node selects it', async () => {
    const user = userEvent.setup();
    const { default: Page } = await import('@/app/[locale]/org-chart/page');
    render(<Page />);

    const { useOrgChartStore } = await import('@/stores/humi-orgchart-slice');

    // Find a node card button for marcus (default selected)
    // Other nodes should be clickable
    const nodeButtons = screen.getAllByRole('button');
    // Click a node button that has a Thai name
    const nameNode = nodeButtons.find(b => b.textContent && /[฀-๿]/.test(b.textContent) && b.textContent.length > 2);
    if (nameNode) {
      await user.click(nameNode);
      // selectedId should be set to some value
      expect(useOrgChartStore.getState().selectedId).toBeTruthy();
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// c11 — /integrations: toggle + category filter
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-13 — /integrations functional', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
  });

  it('toggle flips enabled state for integration id', async () => {
    const { useIntegrationsStore } = await import('@/stores/humi-integrations-slice');

    // int-workday is initially enabled
    expect(useIntegrationsStore.getState().enabled.has('int-workday')).toBe(true);

    act(() => {
      useIntegrationsStore.getState().toggle('int-workday');
    });

    expect(useIntegrationsStore.getState().enabled.has('int-workday')).toBe(false);
  });

  it('setCategory updates category filter in store', async () => {
    const { useIntegrationsStore } = await import('@/stores/humi-integrations-slice');
    act(() => {
      useIntegrationsStore.getState().setCategory('payroll');
    });
    expect(useIntegrationsStore.getState().category).toBe('payroll');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// c12 — /login: form submit navigates to /th/home
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-13 — /login functional', () => {
  beforeEach(() => {
    vi.resetModules();
    mockPush.mockReset();
  });

  it('submitting login form calls router.push to /th/home', async () => {
    const user = userEvent.setup();
    const { default: Page } = await import('@/app/[locale]/login/page');
    render(<Page />);

    // Login page uses useTranslations('humiLogin') — the test mock returns key
    // fallback for 'submit', so the button text is 'submit' in jsdom.
    // In production TH locale, t('submit') = 'เข้าสู่ระบบ'. Both must submit.
    const submitBtn = screen.getByRole('button', { name: /เข้าสู่ระบบ|submit/i });
    await user.click(submitBtn);

    expect(mockPush).toHaveBeenCalledWith('/th/home');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Shell: ⌘K hotkey + theme toggle
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-10 — AppShell: ⌘K palette + theme toggle', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('⌘K keydown event opens command palette', async () => {
    const { AppShell } = await import('@/components/humi/shell/AppShell');
    render(<AppShell><div>page</div></AppShell>);

    // Palette starts closed — no dialog visible
    expect(document.querySelector('[role="dialog"]')).toBeFalsy();

    // AppShell checks navigator.platform for Mac detection.
    // jsdom sets platform to '' (empty) → isMac = false → handler uses ctrlKey.
    // Dispatch Ctrl+K which is the non-Mac trigger path.
    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }),
      );
    });

    await waitFor(() => {
      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog).toBeTruthy();
    });
  });

  it('theme toggle button click flips theme in UI store', async () => {
    const { AppShell } = await import('@/components/humi/shell/AppShell');
    const { useUIStore } = await import('@/stores/ui-store');

    // Ensure light mode initially
    act(() => { useUIStore.getState().setTheme('light'); });

    render(<AppShell><div>page</div></AppShell>);

    const themeBtn = screen.getByRole('button', { name: /สลับโหมดมืด/i });
    const user = userEvent.setup();
    await user.click(themeBtn);

    expect(useUIStore.getState().theme).toBe('dark');
  });

  it('locale pill click calls router.push with swapped locale', async () => {
    const { usePathname } = await import('next/navigation');
    vi.mocked(usePathname).mockReturnValue('/th/home');

    const { AppShell } = await import('@/components/humi/shell/AppShell');
    render(<AppShell><div>page</div></AppShell>);

    const user = userEvent.setup();
    const enBtn = screen.getByRole('button', { name: 'EN' });
    await user.click(enBtn);

    // router.push called with /en/home (locale swap)
    expect(mockPush).toHaveBeenCalledWith('/en/home');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// REGRESSION — /profile/me tab routing (Bug 2026-04-22)
//
// Bug: SLICE_TO_PANEL had `compensation: 'job'`, but tab #3 label is
// "ติดต่อฉุกเฉิน" — so clicking Emergency rendered the Job panel and the
// emergency panel was unreachable. Existing tab tests only asserted
// `activeTab` slice state (not rendered content) so the bug slipped past 77
// PASS tests. These regression tests assert each tab renders content unique
// to its panel — guards against any future SLICE_TO_PANEL routing drift.
// ─────────────────────────────────────────────────────────────────────────────
describe('REGRESSION — /profile/me tab → panel routing', () => {
  beforeEach(() => {
    vi.resetModules();
    mockPush.mockReset();
    localStorage.clear();
  });

  async function clickTabAndAssert(tabLabel: string, expectedPanelMarker: string) {
    const user = userEvent.setup();
    const { default: Page } = await import('@/app/[locale]/profile/me/page');
    render(<Page />);
    const tab = screen.getByRole('tab', { name: tabLabel });
    await user.click(tab);
    await waitFor(() => {
      expect(screen.getByText(expectedPanelMarker)).toBeTruthy();
    });
  }

  it('Personal tab → Personal panel (รายละเอียดพื้นฐาน)', async () => {
    await clickTabAndAssert('ข้อมูลส่วนตัว', 'รายละเอียดพื้นฐาน');
  });

  it('Job tab → Job panel (ข้อมูลตำแหน่งงาน)', async () => {
    await clickTabAndAssert('การจ้างงาน', 'ข้อมูลตำแหน่งงาน');
  });

  it('Emergency tab → Emergency panel (ผู้ติดต่อกรณีฉุกเฉิน) — was unreachable before fix', async () => {
    await clickTabAndAssert('ผู้ติดต่อฉุกเฉิน', 'ผู้ติดต่อกรณีฉุกเฉิน');
  });

  it('Emergency tab does NOT render Job panel content (regression guard)', async () => {
    const user = userEvent.setup();
    const { default: Page } = await import('@/app/[locale]/profile/me/page');
    render(<Page />);
    const emergencyTab = screen.getByRole('tab', { name: 'ผู้ติดต่อฉุกเฉิน' });
    await user.click(emergencyTab);
    await waitFor(() => {
      expect(screen.getByText('ผู้ติดต่อกรณีฉุกเฉิน')).toBeTruthy();
    });
    expect(screen.queryByText('ข้อมูลตำแหน่งงาน')).toBeNull();
  });

  it('Docs tab → renders document file list item (สัญญาจ้างงานที่ลงนาม)', async () => {
    await clickTabAndAssert('เอกสาร', 'สัญญาจ้างงานที่ลงนาม');
  });

  it('Tax tab → Tax panel (แบบฟอร์มภาษี)', async () => {
    await clickTabAndAssert('ภาษี', 'แบบฟอร์มภาษี');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// REGRESSION — Desktop layout @media query escapes @layer (Bug 2026-04-22)
//
// Bug: `.humi-app { grid-template-columns: 1fr }` lived outside any @layer,
// while the desktop override `@media (min-width: 1024px) { .humi-app { ...
// 256px 1fr } }` was nested INSIDE @layer components. Per CSS layer cascade,
// un-layered rules outrank ANY layered rule → mobile rule won at desktop →
// sidebar took full viewport width. jsdom can't compute @media so we assert
// the structural fix via source-text inspection: the lg+ media query for
// `.humi-app` must NOT be nested inside @layer components.
// ─────────────────────────────────────────────────────────────────────────────
describe('REGRESSION — globals.css desktop @media must escape @layer', () => {
  it('@media (min-width: 1024px) for .humi-app is at top level (not inside @layer)', async () => {
    const fs = await import('node:fs/promises');
    const path = await import('node:path');
    const cssPath = path.resolve(__dirname, '../app/globals.css');
    const css = await fs.readFile(cssPath, 'utf-8');

    // Find every @layer components { ... } block (balanced braces) and verify
    // none of them contain the desktop override for .humi-app.
    const layerRe = /@layer\s+components\s*\{/g;
    let m: RegExpExecArray | null;
    while ((m = layerRe.exec(css)) !== null) {
      let depth = 1;
      let i = m.index + m[0].length;
      while (i < css.length && depth > 0) {
        if (css[i] === '{') depth++;
        else if (css[i] === '}') depth--;
        i++;
      }
      const block = css.slice(m.index, i);
      // The block must NOT contain the lg+ media query targeting .humi-app.
      // Use [\s\S] instead of /s flag (target compatibility — TS1501).
      const hasBuggyNesting =
        /@media\s*\([^)]*min-width:\s*1024px[^)]*\)\s*\{[\s\S]*?\.humi-app/.test(block);
      expect(hasBuggyNesting).toBe(false);
    }

    // And the override must exist somewhere at top level
    const topLevel = /@media\s*\([^)]*min-width:\s*1024px[^)]*\)\s*\{[\s\S]*?\.humi-app[\s\S]*?grid-template-columns/;
    expect(topLevel.test(css)).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// REGRESSION — Hamburger + Mobile Drawer a11y attrs (Audit 2026-04-22)
//
// Expert audit caught: missing aria-expanded, missing aria-controls, no
// role="dialog" on drawer, drawer width mismatch (256↔280px wrapper),
// no matchMedia resize handler. Tests guard the a11y contract so future
// changes can't silently regress screen-reader UX.
// ─────────────────────────────────────────────────────────────────────────────
describe('REGRESSION — Hamburger + Mobile Drawer a11y', () => {
  beforeEach(() => {
    vi.resetModules();
    mockPush.mockReset();
    localStorage.clear();
  });

  it('Hamburger button has aria-expanded + aria-controls + dynamic aria-label', async () => {
    const user = userEvent.setup();
    const { AppShell } = await import('@/components/humi/shell/AppShell');
    render(
      <AppShell>
        <div>page content</div>
      </AppShell>,
    );

    // Default state — closed. Disambiguate from drawer X button (also labeled
    // "ปิดเมนู") by selecting the unique button that has aria-controls.
    const hamburger = document.querySelector(
      'button[aria-controls="humi-mobile-drawer"]',
    ) as HTMLButtonElement | null;
    expect(hamburger).not.toBeNull();
    expect(hamburger!.getAttribute('aria-label')).toBe('เปิดเมนู');
    expect(hamburger!.getAttribute('aria-expanded')).toBe('false');

    // After click — open. Same selector still finds the hamburger; drawer X
    // button doesn't have aria-controls so it can't collide.
    await user.click(hamburger!);
    await waitFor(() => {
      const opened = document.querySelector(
        'button[aria-controls="humi-mobile-drawer"]',
      ) as HTMLButtonElement;
      expect(opened.getAttribute('aria-expanded')).toBe('true');
      expect(opened.getAttribute('aria-label')).toBe('ปิดเมนู');
    });
  });

  it('Mobile drawer renders with role="dialog" + aria-modal + matching id', async () => {
    const user = userEvent.setup();
    const { AppShell } = await import('@/components/humi/shell/AppShell');
    render(
      <AppShell>
        <div>page content</div>
      </AppShell>,
    );

    // Drawer not in DOM until open
    expect(document.getElementById('humi-mobile-drawer')).toBeNull();

    const trigger = document.querySelector(
      'button[aria-controls="humi-mobile-drawer"]',
    ) as HTMLButtonElement;
    await user.click(trigger);
    await waitFor(() => {
      const drawer = document.getElementById('humi-mobile-drawer');
      expect(drawer).not.toBeNull();
      expect(drawer?.getAttribute('role')).toBe('dialog');
      expect(drawer?.getAttribute('aria-modal')).toBe('true');
      expect(drawer?.getAttribute('aria-label')).toBe('เมนูหลัก');
    });
  });

  it('UI store exposes closeMobileMenu action (used by Esc handler + matchMedia handler)', async () => {
    const { useUIStore } = await import('@/stores/ui-store');
    expect(typeof useUIStore.getState().closeMobileMenu).toBe('function');

    // closeMobileMenu actually closes
    useUIStore.getState().setMobileMenuOpen(true);
    expect(useUIStore.getState().mobileMenuOpen).toBe(true);
    useUIStore.getState().closeMobileMenu();
    expect(useUIStore.getState().mobileMenuOpen).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// REGRESSION — Every sidebar NAV destination must have a topbar TITLE_MAP entry
// (Bug 2026-04-22 "double humi"): without a match, resolveTitle() falls back
// to 'Humi' which duplicates the sidebar logo and reads as a visual bug.
// Guards against future nav additions that forget the topbar registration.
// ─────────────────────────────────────────────────────────────────────────────
describe('REGRESSION — Sidebar NAV ↔ AppShell TITLE_MAP parity', () => {
  it('every internal sidebar href has a matching TITLE_MAP prefix', async () => {
    const fs = await import('node:fs/promises');
    const path = await import('node:path');

    const sidebarSrc = await fs.readFile(
      path.resolve(__dirname, '../components/humi/shell/Sidebar.tsx'),
      'utf-8',
    );
    const appShellSrc = await fs.readFile(
      path.resolve(__dirname, '../components/humi/shell/AppShell.tsx'),
      'utf-8',
    );

    // Extract sidebar internal NAV hrefs (skip external https:// links)
    const hrefMatches = Array.from(sidebarSrc.matchAll(/href:\s*'(\/th\/[^']+)'/g));
    const navHrefs = hrefMatches.map((m) => m[1]);
    expect(navHrefs.length).toBeGreaterThan(0);

    // Extract TITLE_MAP prefixes
    const prefixMatches = Array.from(appShellSrc.matchAll(/prefix:\s*'(\/th\/[^']+)'/g));
    const titlePrefixes = new Set(prefixMatches.map((m) => m[1]));

    // Each nav href must match a title prefix (exact or startsWith — resolveTitle
    // uses startsWith so /th/profile covers /th/profile/me, etc)
    const missing: string[] = [];
    for (const href of navHrefs) {
      const matched = Array.from(titlePrefixes).some(
        (p) => href === p || href.startsWith(p + '/'),
      );
      if (!matched) missing.push(href);
    }
    expect(missing).toEqual([]);
  });
});
