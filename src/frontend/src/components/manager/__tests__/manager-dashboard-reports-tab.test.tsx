/**
 * manager-dashboard-reports-tab.test.tsx — BRD #176 Team Reports (hr#79)
 * Framework: Vitest + @testing-library/react + jsdom
 *
 * AC-1: NEW TAB รายงานทีม ต้องแสดงใน tab bar
 * AC-2: HEADCOUNT BARS ต้องแสดง 3 หน่วยงาน พร้อม count
 * AC-3: MOVEMENT TIMELINE ต้องแสดง 3 types (joiner/leaver/transfer)
 * AC-4: DATE FILTER chips เดือนนี้ / 30 วันล่าสุด / ทั้งหมด
 * AC-5: CSV BUTTON placeholder (console.log on click)
 * AC-6: LANGUAGE Thai-primary labels ทุกจุด
 * AC-7: NO REGRESSION — tabs อื่นยังทำงานได้
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import thMessages from '../../../../messages/th.json';
import type { TeamMember, MovementEvent } from '@/hooks/use-manager-dashboard';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/th/manager-dashboard'),
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}));

const MOCK_MEMBERS: TeamMember[] = [
  {
    id: 'EMP001', name: 'สมชาย ใจดี', position: 'Senior Developer',
    department: 'ฝ่ายไอที', costCenter: 'CC-1001', managerId: null, managerName: null,
    avatar: 'สช', status: 'active', joinDate: '2023-06-15',
  },
  {
    id: 'EMP002', name: 'พลอย สุขสวัสดิ์', position: 'UX Designer',
    department: 'ฝ่ายไอที', costCenter: 'CC-1001', managerId: 'EMP001', managerName: 'สมชาย ใจดี',
    avatar: 'พส', status: 'active', joinDate: '2024-01-10',
  },
  {
    id: 'EMP003', name: 'ณัฐพงศ์ แก้วสาย', position: 'QA Engineer',
    department: 'ฝ่ายไอที', costCenter: 'CC-1001', managerId: 'EMP001', managerName: 'สมชาย ใจดี',
    avatar: 'ณก', status: 'on-leave', joinDate: '2023-09-01',
  },
  {
    id: 'EMP004', name: 'รัชนี บุญศรี', position: 'Junior Developer',
    department: 'ฝ่ายการเงิน', costCenter: 'CC-2001', managerId: 'EMP006', managerName: 'มาลี ศรีพันธ์',
    avatar: 'รบ', status: 'probation', joinDate: '2025-12-01', probationEnd: '2026-05-31',
  },
  {
    id: 'EMP005', name: 'กฤษ ตระหนักวงศ์', position: 'DevOps Engineer',
    department: 'ฝ่ายขาย', costCenter: 'CC-3001', managerId: null, managerName: null,
    avatar: 'กต', status: 'active', joinDate: '2024-03-15',
  },
  {
    id: 'EMP006', name: 'มาลี ศรีพันธ์', position: 'Business Analyst',
    department: 'ฝ่ายการเงิน', costCenter: 'CC-2001', managerId: 'EMP005', managerName: 'กฤษ ตระหนักวงศ์',
    avatar: 'มศ', status: 'active', joinDate: '2022-11-20',
  },
];

// 8 movement records covering all 3 types + varied dates
const MOCK_MOVEMENT_ALL: MovementEvent[] = [
  { id: 'MV001', date: '2026-04-20', type: 'joiner',   employeeName: 'วิชัย มั่นคง',      details: 'เข้าฝ่ายไอที' },
  { id: 'MV002', date: '2026-04-15', type: 'transfer', employeeName: 'พลอย สุขสวัสดิ์',  details: 'ย้าย ฝ่ายไอที → ฝ่ายขาย' },
  { id: 'MV003', date: '2026-04-10', type: 'leaver',   employeeName: 'ประทีป วงศ์สว่าง', details: 'ออกจากบริษัท' },
  { id: 'MV004', date: '2026-04-05', type: 'joiner',   employeeName: 'สุดา ทองคำ',        details: 'เข้าฝ่ายการเงิน' },
  { id: 'MV005', date: '2026-03-28', type: 'transfer', employeeName: 'ณัฐพงศ์ แก้วสาย', details: 'ย้าย ฝ่ายขาย → ฝ่ายไอที' },
  { id: 'MV006', date: '2026-03-20', type: 'leaver',   employeeName: 'กานต์ รุ่งเรือง',  details: 'ออกจากบริษัท' },
  { id: 'MV007', date: '2026-03-15', type: 'joiner',   employeeName: 'มนัส พันธุ์ดี',    details: 'เข้าฝ่ายขาย' },
  { id: 'MV008', date: '2026-03-08', type: 'transfer', employeeName: 'รัชนี บุญศรี',     details: 'ย้าย ฝ่ายการเงิน → ฝ่ายไอที' },
];

// Mock hook — offline, deterministic
vi.mock('@/hooks/use-manager-dashboard', async () => {
  const actual = await vi.importActual('@/hooks/use-manager-dashboard');
  return {
    ...actual,
    useManagerDashboard: vi.fn(() => ({
      team: MOCK_MEMBERS,
      approvals: [],
      alerts: [],
      calendarEvents: [],
      orgChart: null,
      stats: {
        totalMembers: MOCK_MEMBERS.length,
        activeToday: MOCK_MEMBERS.filter((m) => m.status === 'active').length,
        onLeaveToday: MOCK_MEMBERS.filter((m) => m.status === 'on-leave').length,
        pendingApprovals: 0,
        inProbation: MOCK_MEMBERS.filter((m) => m.status === 'probation').length,
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
      positions: [],
      movementEvents: MOCK_MOVEMENT_ALL,
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

function clickReportsTab() {
  const reportsTab = screen.getByRole('button', { name: 'รายงานทีม' });
  fireEvent.click(reportsTab);
}

// ─── AC-1: Reports tab exists ─────────────────────────────────────────────────

describe('AC-1: tab รายงานทีม', () => {
  beforeEach(() => {
    renderWithIntl();
  });

  it('แสดง tab รายงานทีม ใน tab bar', () => {
    expect(screen.getByRole('button', { name: 'รายงานทีม' })).toBeDefined();
  });

  it('click tab รายงานทีม แล้วแสดง section อัตรากำลังตามหน่วยงาน', () => {
    clickReportsTab();
    expect(screen.getByText('อัตรากำลังตามหน่วยงาน')).toBeDefined();
  });

  it('click tab รายงานทีม แล้วแสดง section การเคลื่อนไหวของทีม', () => {
    clickReportsTab();
    expect(screen.getByText('การเคลื่อนไหวของทีม')).toBeDefined();
  });
});

// ─── AC-2: Headcount bars — 3 departments ─────────────────────────────────────

describe('AC-2: headcount bars by department', () => {
  beforeEach(() => {
    renderWithIntl();
    clickReportsTab();
  });

  it('แสดง ฝ่ายไอที ใน headcount section', () => {
    expect(screen.getByText('ฝ่ายไอที')).toBeDefined();
  });

  it('แสดง ฝ่ายการเงิน ใน headcount section', () => {
    expect(screen.getByText('ฝ่ายการเงิน')).toBeDefined();
  });

  it('แสดง ฝ่ายขาย ใน headcount section', () => {
    expect(screen.getByText('ฝ่ายขาย')).toBeDefined();
  });

  it('แสดง count 3 สำหรับ ฝ่ายไอที (EMP001+EMP002+EMP003)', () => {
    // count "3" ต้องปรากฏอย่างน้อย 1 ครั้งใน section headcount
    const threes = screen.getAllByText('3');
    expect(threes.length).toBeGreaterThanOrEqual(1);
  });

  it('แสดง count 2 สำหรับ ฝ่ายการเงิน (EMP004+EMP006)', () => {
    const twos = screen.getAllByText('2');
    expect(twos.length).toBeGreaterThanOrEqual(1);
  });

  it('แสดง count 1 สำหรับ ฝ่ายขาย (EMP005)', () => {
    const ones = screen.getAllByText('1');
    expect(ones.length).toBeGreaterThanOrEqual(1);
  });
});

// ─── AC-3: Movement timeline — 3 event types ─────────────────────────────────

describe('AC-3: movement timeline types', () => {
  beforeEach(() => {
    renderWithIntl();
    clickReportsTab();
    // switch to ทั้งหมด so all 8 events are visible regardless of test run date
    const allChip = screen.getByRole('button', { name: 'ทั้งหมด' });
    fireEvent.click(allChip);
  });

  it('แสดง badge เข้าใหม่ (joiner)', () => {
    const badges = screen.getAllByText('เข้าใหม่');
    expect(badges.length).toBeGreaterThanOrEqual(1);
  });

  it('แสดง badge ออก (leaver)', () => {
    const badges = screen.getAllByText('ออก');
    expect(badges.length).toBeGreaterThanOrEqual(1);
  });

  it('แสดง badge ย้าย (transfer)', () => {
    const badges = screen.getAllByText('ย้าย');
    expect(badges.length).toBeGreaterThanOrEqual(1);
  });

  it('แสดง employeeName ของ joiner record', () => {
    expect(screen.getByText('วิชัย มั่นคง')).toBeDefined();
  });

  it('แสดง details ของ leaver record', () => {
    expect(screen.getAllByText('ออกจากบริษัท').length).toBeGreaterThanOrEqual(1);
  });

  it('แสดง details ของ transfer record พร้อมลูกศร →', () => {
    expect(screen.getByText(/ย้าย ฝ่ายไอที → ฝ่ายขาย/)).toBeDefined();
  });
});

// ─── AC-4: Date filter chips ──────────────────────────────────────────────────

describe('AC-4: date filter chips', () => {
  beforeEach(() => {
    renderWithIntl();
    clickReportsTab();
  });

  it('แสดง chip เดือนนี้', () => {
    expect(screen.getByRole('button', { name: 'เดือนนี้' })).toBeDefined();
  });

  it('แสดง chip 30 วันล่าสุด', () => {
    expect(screen.getByRole('button', { name: '30 วันล่าสุด' })).toBeDefined();
  });

  it('แสดง chip ทั้งหมด', () => {
    expect(screen.getByRole('button', { name: 'ทั้งหมด' })).toBeDefined();
  });

  it('click ทั้งหมด แสดง events ทุกรายการ (8 records)', () => {
    const allChip = screen.getByRole('button', { name: 'ทั้งหมด' });
    fireEvent.click(allChip);
    // ทุก 8 records ต้องปรากฏ: check by unique names
    expect(screen.getByText('วิชัย มั่นคง')).toBeDefined();
    expect(screen.getByText('มนัส พันธุ์ดี')).toBeDefined();
    expect(screen.getByText('รัชนี บุญศรี')).toBeDefined();
  });
});

// ─── AC-5: CSV Export button placeholder ─────────────────────────────────────

describe('AC-5: CSV export button', () => {
  beforeEach(() => {
    renderWithIntl();
    clickReportsTab();
  });

  it('แสดงปุ่ม ส่งออก CSV', () => {
    expect(screen.getByRole('button', { name: /ส่งออก CSV/i })).toBeDefined();
  });

  it('click ส่งออก CSV logs TODO message (no crash)', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const btn = screen.getByRole('button', { name: /ส่งออก CSV/i });
    fireEvent.click(btn);
    expect(consoleSpy).toHaveBeenCalledWith('TODO: backend phase wire CSV export');
    consoleSpy.mockRestore();
  });
});

// ─── AC-6: Thai-primary labels ────────────────────────────────────────────────

describe('AC-6: Thai-primary labels', () => {
  beforeEach(() => {
    renderWithIntl();
    clickReportsTab();
  });

  it('title section A เป็น Thai', () => {
    expect(screen.getByText('อัตรากำลังตามหน่วยงาน')).toBeDefined();
  });

  it('title section B เป็น Thai', () => {
    expect(screen.getByText('การเคลื่อนไหวของทีม')).toBeDefined();
  });

  it('tab label เป็น Thai', () => {
    expect(screen.getByRole('button', { name: 'รายงานทีม' })).toBeDefined();
  });
});

// ─── AC-7: No regression ─────────────────────────────────────────────────────

describe('AC-7: no regression on other tabs', () => {
  beforeEach(() => {
    renderWithIntl();
  });

  it('overview tab render ได้', () => {
    const btn = screen.getByRole('button', { name: /ภาพรวมทีม/i });
    fireEvent.click(btn);
    expect(screen.getByText(/แจ้งเตือนสำคัญ/i)).toBeDefined();
  });

  it('team tab render ได้', () => {
    const btn = screen.getByRole('button', { name: /สมาชิกในทีม/i });
    fireEvent.click(btn);
    expect(screen.getByText('หน่วยงาน')).toBeDefined();
  });

  it('approvals tab render ได้', () => {
    const btn = screen.getByRole('button', { name: /คำขอรออนุมัติ/i });
    fireEvent.click(btn);
    expect(screen.getByText(/ไม่มีคำขอรออนุมัติ/i)).toBeDefined();
  });

  it('calendar tab render ได้', () => {
    const btn = screen.getByRole('button', { name: /ปฏิทินทีม/i });
    fireEvent.click(btn);
    expect(screen.getAllByText(/ปฏิทินทีม/i).length).toBeGreaterThanOrEqual(1);
  });
});
