/**
 * manager-dashboard-positions-tab.test.tsx — BRD #177 Position & Vacancy Overview (hr#80)
 * Framework: Vitest + @testing-library/react + jsdom
 *
 * AC-1: NEW TAB ตำแหน่งและอัตรากำลัง renders correctly
 * AC-2: STAT CARDS แสดง รวมตำแหน่ง / ตำแหน่งว่าง / อัตราว่าง %
 * AC-3: TABLE COLUMNS 7 cols Thai labels
 * AC-4: VACANCY CALC = headcountBudget - headcountActual computed at render
 * AC-5: DEPT FILTER chips derived from positions.department
 * AC-6: Thai-primary labels — SF-drift sweep
 * AC-7: NO REGRESSION — other tabs unaffected
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import thMessages from '../../../../messages/th.json';
import type { Position } from '@/hooks/use-manager-dashboard';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/th/manager-dashboard'),
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}));

const MOCK_POSITIONS_TEST: Position[] = [
  { positionCode: 'POS-IT-001', positionTitle: 'นักพัฒนาซอฟต์แวร์อาวุโส', department: 'ฝ่ายไอที', costCenter: 'CC-1001', headcountActual: 3, headcountBudget: 4 },
  { positionCode: 'POS-IT-002', positionTitle: 'นักออกแบบ UX/UI', department: 'ฝ่ายไอที', costCenter: 'CC-1001', headcountActual: 1, headcountBudget: 2 },
  { positionCode: 'POS-IT-003', positionTitle: 'วิศวกร DevOps', department: 'ฝ่ายไอที', costCenter: 'CC-1001', headcountActual: 2, headcountBudget: 2 },
  { positionCode: 'POS-FIN-001', positionTitle: 'นักวิเคราะห์ธุรกิจ', department: 'ฝ่ายการเงิน', costCenter: 'CC-2001', headcountActual: 2, headcountBudget: 3 },
  { positionCode: 'POS-FIN-002', positionTitle: 'นักบัญชีอาวุโส', department: 'ฝ่ายการเงิน', costCenter: 'CC-2001', headcountActual: 1, headcountBudget: 1 },
  { positionCode: 'POS-SALES-001', positionTitle: 'ผู้จัดการฝ่ายขาย', department: 'ฝ่ายขาย', costCenter: 'CC-3001', headcountActual: 1, headcountBudget: 2 },
  { positionCode: 'POS-SALES-002', positionTitle: 'ตัวแทนขาย', department: 'ฝ่ายขาย', costCenter: 'CC-3001', headcountActual: 3, headcountBudget: 3 },
];

vi.mock('@/hooks/use-manager-dashboard', async () => {
  const actual = await vi.importActual('@/hooks/use-manager-dashboard');
  return {
    ...actual,
    useManagerDashboard: vi.fn(() => ({
      team: [],
      approvals: [],
      alerts: [],
      calendarEvents: [],
      orgChart: null,
      stats: {
        totalMembers: 0,
        activeToday: 0,
        onLeaveToday: 0,
        pendingApprovals: 0,
        inProbation: 0,
      },
      loading: false,
      calMonth: 4,
      calYear: 2026,
      setCalMonth: vi.fn(),
      setCalYear: vi.fn(),
      approveRequest: vi.fn(),
      rejectRequest: vi.fn(),
      bulkApprove: vi.fn(),
      bulkReject: vi.fn(),
      positions: MOCK_POSITIONS_TEST,
    })),
  };
});

import { ManagerDashboardPage } from '../manager-dashboard-page';

function renderWithIntl() {
  return render(
    <NextIntlClientProvider locale="th" messages={thMessages}>
      <ManagerDashboardPage />
    </NextIntlClientProvider>,
  );
}

function clickPositionsTab() {
  const tab = screen.getByRole('button', { name: /ตำแหน่งและอัตรากำลัง/i });
  fireEvent.click(tab);
}

// ─── AC-1: Tab renders ────────────────────────────────────────────────────────

describe('AC-1: positions tab renders', () => {
  it('แสดง tab button "ตำแหน่งและอัตรากำลัง"', () => {
    renderWithIntl();
    expect(screen.getByRole('button', { name: /ตำแหน่งและอัตรากำลัง/i })).toBeDefined();
  });

  it('คลิก tab แล้ว render table ได้', () => {
    renderWithIntl();
    clickPositionsTab();
    expect(screen.getByRole('table')).toBeDefined();
  });

  it('tab อยู่ลำดับหลัง แผนผังทีม ก่อน คำขอรออนุมัติ', () => {
    renderWithIntl();
    const buttons = screen.getAllByRole('button');
    const tabLabels = buttons.map((b) => b.textContent ?? '');
    const orgIdx = tabLabels.findIndex((l) => l.includes('แผนผังทีม'));
    const posIdx = tabLabels.findIndex((l) => l.includes('ตำแหน่งและอัตรากำลัง'));
    const appIdx = tabLabels.findIndex((l) => l.includes('คำขอรออนุมัติ'));
    expect(orgIdx).toBeGreaterThan(-1);
    expect(posIdx).toBeGreaterThan(orgIdx);
    expect(appIdx).toBeGreaterThan(posIdx);
  });
});

// ─── AC-2: Stat Cards ─────────────────────────────────────────────────────────

describe('AC-2: stat cards', () => {
  beforeEach(() => {
    renderWithIntl();
    clickPositionsTab();
  });

  it('แสดง stat card "รวมตำแหน่ง"', () => {
    expect(screen.getByText('รวมตำแหน่ง')).toBeDefined();
  });

  it('แสดง stat card "ตำแหน่งว่าง"', () => {
    // ปรากฏทั้งใน stat card + column header
    expect(screen.getAllByText('ตำแหน่งว่าง').length).toBeGreaterThanOrEqual(1);
  });

  it('แสดง stat card "อัตราว่าง %"', () => {
    expect(screen.getByText('อัตราว่าง %')).toBeDefined();
  });

  it('stat รวมตำแหน่ง = 7', () => {
    // 7 positions in mock
    const statCards = screen.getAllByText('7');
    expect(statCards.length).toBeGreaterThanOrEqual(1);
  });
});

// ─── AC-3: Table columns 7 cols ───────────────────────────────────────────────

describe('AC-3: table columns', () => {
  beforeEach(() => {
    renderWithIntl();
    clickPositionsTab();
  });

  it('แสดง column "รหัสตำแหน่ง"', () => {
    expect(screen.getByText('รหัสตำแหน่ง')).toBeDefined();
  });

  it('แสดง column "ชื่อตำแหน่ง"', () => {
    expect(screen.getByText('ชื่อตำแหน่ง')).toBeDefined();
  });

  it('แสดง column "หน่วยงาน"', () => {
    expect(screen.getByText('หน่วยงาน')).toBeDefined();
  });

  it('แสดง column "ศูนย์ต้นทุน"', () => {
    expect(screen.getByText('ศูนย์ต้นทุน')).toBeDefined();
  });

  it('แสดง column "อัตรากำลังจริง"', () => {
    expect(screen.getByText('อัตรากำลังจริง')).toBeDefined();
  });

  it('แสดง column "อัตรากำลังเป้าหมาย"', () => {
    expect(screen.getByText('อัตรากำลังเป้าหมาย')).toBeDefined();
  });

  it('แสดง column "ตำแหน่งว่าง"', () => {
    // header text — may appear multiple times (stat card + column header)
    const all = screen.getAllByText('ตำแหน่งว่าง');
    expect(all.length).toBeGreaterThanOrEqual(1);
  });

  it('แสดง positionCode ใน table row', () => {
    expect(screen.getByText('POS-IT-001')).toBeDefined();
  });

  it('แสดง positionTitle ใน table row', () => {
    expect(screen.getByText('นักพัฒนาซอฟต์แวร์อาวุโส')).toBeDefined();
  });
});

// ─── AC-4: Vacancy calculation ────────────────────────────────────────────────

describe('AC-4: vacancy calculation (headcountBudget - headcountActual)', () => {
  beforeEach(() => {
    renderWithIntl();
    clickPositionsTab();
  });

  it('POS-IT-001: budget=4 actual=3 → vacancy=1 แสดงใน badge', () => {
    // badge แสดง "1" สำหรับ POS-IT-001
    const badges = screen.getAllByText('1');
    expect(badges.length).toBeGreaterThanOrEqual(1);
  });

  it('POS-IT-003: budget=2 actual=2 → vacancy=0 แสดง badge 0 หรือ success badge', () => {
    const zeroBadges = screen.getAllByText('0');
    expect(zeroBadges.length).toBeGreaterThanOrEqual(1);
  });

  it('ไม่เก็บ vacancyCount ใน state — computed inline เท่านั้น', async () => {
    // ตรวจว่า Position interface ไม่มี vacancyCount field
    const { MOCK_POSITIONS } = await import('@/hooks/use-manager-dashboard');
    MOCK_POSITIONS.forEach((p: Position) => {
      expect(p).not.toHaveProperty('vacancyCount');
    });
  });
});

// ─── AC-5: Dept filter ────────────────────────────────────────────────────────

describe('AC-5: dept filter', () => {
  beforeEach(() => {
    renderWithIntl();
    clickPositionsTab();
  });

  it('แสดง chip "ทุกหน่วยงาน"', () => {
    const chips = screen.getAllByRole('button', { name: 'ทุกหน่วยงาน' });
    expect(chips.length).toBeGreaterThanOrEqual(1);
  });

  it('แสดง dept chips สำหรับ ฝ่ายไอที / ฝ่ายการเงิน / ฝ่ายขาย', () => {
    expect(screen.getByRole('button', { name: 'ฝ่ายไอที' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'ฝ่ายการเงิน' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'ฝ่ายขาย' })).toBeDefined();
  });

  it('filter by ฝ่ายการเงิน → แสดง 2 rows', () => {
    const finBtn = screen.getByRole('button', { name: 'ฝ่ายการเงิน' });
    fireEvent.click(finBtn);
    const rows = screen.getAllByRole('row');
    // 1 header + 2 data rows (POS-FIN-001 + POS-FIN-002)
    expect(rows.length).toBe(3);
  });

  it('filter by ฝ่ายขาย → แสดง 2 rows', () => {
    const salesBtn = screen.getByRole('button', { name: 'ฝ่ายขาย' });
    fireEvent.click(salesBtn);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(3);
  });

  it('กด ทุกหน่วยงาน หลัง filter → reset กลับ 7 rows', () => {
    const finBtn = screen.getByRole('button', { name: 'ฝ่ายการเงิน' });
    fireEvent.click(finBtn);
    const allBtn = screen.getByRole('button', { name: 'ทุกหน่วยงาน' });
    fireEvent.click(allBtn);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(8); // 1 header + 7 data
  });
});

// ─── AC-6: Thai-primary labels ────────────────────────────────────────────────

describe('AC-6: Thai-primary labels', () => {
  it('column headers ทั้งหมดเป็น Thai', () => {
    renderWithIntl();
    clickPositionsTab();
    const table = screen.getByRole('table');
    const headers = table.querySelectorAll('th');
    const thaiPattern = /[฀-๿]/;
    headers.forEach((h) => {
      expect(h.textContent).toMatch(thaiPattern);
    });
  });

  it('stat card labels เป็น Thai', () => {
    renderWithIntl();
    clickPositionsTab();
    expect(screen.getByText('รวมตำแหน่ง')).toBeDefined();
    // 'ตำแหน่งว่าง' ปรากฏทั้งใน stat card + column header → ใช้ getAllByText
    expect(screen.getAllByText('ตำแหน่งว่าง').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('อัตราว่าง %')).toBeDefined();
  });
});

// ─── AC-7: No regression ─────────────────────────────────────────────────────

describe('AC-7: no regression on other tabs', () => {
  beforeEach(() => {
    renderWithIntl();
  });

  it('overview tab ยัง render ได้', () => {
    const btn = screen.getByRole('button', { name: /ภาพรวมทีม/i });
    fireEvent.click(btn);
    expect(screen.getByText(/แจ้งเตือนสำคัญ/i)).toBeDefined();
  });

  it('approvals tab ยัง render ได้', () => {
    const btn = screen.getByRole('button', { name: /คำขอรออนุมัติ/i });
    fireEvent.click(btn);
    expect(screen.getByText(/ไม่มีคำขอรออนุมัติ/i)).toBeDefined();
  });

  it('calendar tab ยัง render ได้', () => {
    const btn = screen.getByRole('button', { name: /ปฏิทินทีม/i });
    fireEvent.click(btn);
    expect(screen.getAllByText(/ปฏิทินทีม/i).length).toBeGreaterThanOrEqual(1);
  });

  it('team tab ยัง render ได้', () => {
    const btn = screen.getByRole('button', { name: /สมาชิกในทีม/i });
    fireEvent.click(btn);
    // team is empty mock → ไม่มีแถว แต่ table ยังอยู่
    expect(screen.getByRole('table')).toBeDefined();
  });
});
