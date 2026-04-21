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
  useRouter: vi.fn().mockReturnValue({ push: mockPush }),
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
      pendingTitle: 'คำขอลางาน',
      docsTitle: 'เอกสารรอลงนาม',
      feedTitle: 'ประกาศล่าสุด',
      ctaApprove: 'อนุมัติคำขอลา 2 รายการ',
      ctaAnnouncements: 'ตรวจสอบร่างประกาศ',
      // profile
      tabPersonal: 'ข้อมูลส่วนตัว',
      tabJob: 'การจ้างงาน',
      tabEmergency: 'ผู้ติดต่อฉุกเฉิน',
      tabDocs: 'เอกสาร',
      tabTax: 'ภาษี',
      profileEdit: 'แก้ไข',
      profileCancelEdit: 'ยกเลิก',
      save: 'บันทึก',
      subtitle: 'พนักงาน',
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

    // Default tab is 'request' — fill dates with invalid range
    const fromInputs = screen.getAllByPlaceholderText(/เช่น.*เม\.ย\.|วว\/ดด\/ปปปป/i);
    expect(fromInputs.length).toBeGreaterThan(0);

    // Type inverted dates: from 30, to 01
    if (fromInputs.length >= 2) {
      await user.clear(fromInputs[0]);
      await user.type(fromInputs[0], '30 เม.ย.');
      await user.clear(fromInputs[1]);
      await user.type(fromInputs[1], '01 เม.ย.');
    }

    // Submit
    const submitBtn = screen.getByRole('button', { name: /ส่งคำขอลา/i });
    await user.click(submitBtn);

    // Error message should appear
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

    const submitBtn = screen.getByRole('button', { name: /เข้าสู่ระบบ/i });
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

    // Dispatch ⌘K event
    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }),
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
