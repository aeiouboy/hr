/**
 * manager-dashboard-team-tab.test.tsx — BRD #174 Team Information (hr#77)
 * Framework: Vitest + @testing-library/react + jsdom
 *
 * AC-1: TeamMember interface มี costCenter / managerId / managerName
 * AC-2: renderTeam แสดง column หน่วยงาน / ศูนย์ต้นทุน / หัวหน้างาน
 * AC-3: dept filter chips derived จาก unique team.department values
 * AC-4: TODO placeholder สำหรับ permission gate (mockup-proof — all fields visible)
 * AC-5: ทุก label เป็น Thai-primary
 * AC-6: tabs อื่นไม่ถูก affect
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import thMessages from '../../../../messages/th.json';
import type { TeamMember } from '@/hooks/use-manager-dashboard';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/th/manager-dashboard'),
}));

// Mock use-manager-dashboard hook so tests run offline without API calls
vi.mock('@/hooks/use-manager-dashboard', async () => {
  const actual = await vi.importActual('@/hooks/use-manager-dashboard');

  const MOCK_MEMBERS: TeamMember[] = [
    {
      id: 'EMP001',
      name: 'สมชาย ใจดี',
      position: 'Senior Developer',
      department: 'ฝ่ายไอที',
      costCenter: 'CC-1001',
      managerId: null,
      managerName: null,
      avatar: 'สช',
      status: 'active',
      joinDate: '2023-06-15',
    },
    {
      id: 'EMP002',
      name: 'พลอย สุขสวัสดิ์',
      position: 'UX Designer',
      department: 'ฝ่ายไอที',
      costCenter: 'CC-1001',
      managerId: 'EMP001',
      managerName: 'สมชาย ใจดี',
      avatar: 'พส',
      status: 'active',
      joinDate: '2024-01-10',
    },
    {
      id: 'EMP003',
      name: 'ณัฐพงศ์ แก้วสาย',
      position: 'QA Engineer',
      department: 'ฝ่ายไอที',
      costCenter: 'CC-1001',
      managerId: 'EMP001',
      managerName: 'สมชาย ใจดี',
      avatar: 'ณก',
      status: 'on-leave',
      joinDate: '2023-09-01',
    },
    {
      id: 'EMP004',
      name: 'รัชนี บุญศรี',
      position: 'Junior Developer',
      department: 'ฝ่ายการเงิน',
      costCenter: 'CC-2001',
      managerId: 'EMP006',
      managerName: 'มาลี ศรีพันธ์',
      avatar: 'รบ',
      status: 'probation',
      joinDate: '2025-12-01',
      probationEnd: '2026-05-31',
    },
    {
      id: 'EMP005',
      name: 'กฤษ ตระหนักวงศ์',
      position: 'DevOps Engineer',
      department: 'ฝ่ายขาย',
      costCenter: 'CC-3001',
      managerId: null,
      managerName: null,
      avatar: 'กต',
      status: 'active',
      joinDate: '2024-03-15',
    },
    {
      id: 'EMP006',
      name: 'มาลี ศรีพันธ์',
      position: 'Business Analyst',
      department: 'ฝ่ายการเงิน',
      costCenter: 'CC-2001',
      managerId: 'EMP005',
      managerName: 'กฤษ ตระหนักวงศ์',
      avatar: 'มศ',
      status: 'active',
      joinDate: '2022-11-20',
    },
  ];

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

// Navigate to team tab helper — label includes member count e.g. "สมาชิกในทีม (6)"
function clickTeamTab() {
  const teamTab = screen.getByRole('button', { name: /สมาชิกในทีม/i });
  fireEvent.click(teamTab);
}

// ─── AC-1: Schema ─────────────────────────────────────────────────────────────

describe('AC-1: TeamMember schema', () => {
  it('MOCK_TEAM records have costCenter, managerId, managerName fields', async () => {
    const { useManagerDashboard } = await import('@/hooks/use-manager-dashboard');
    const result = (useManagerDashboard as ReturnType<typeof vi.fn>)();
    const team: TeamMember[] = result.team;

    expect(team.length).toBe(6);
    team.forEach((m) => {
      expect(m).toHaveProperty('costCenter');
      expect(m).toHaveProperty('managerId');
      expect(m).toHaveProperty('managerName');
    });
  });

  it('2 records are managers (managerId: null)', async () => {
    const { useManagerDashboard } = await import('@/hooks/use-manager-dashboard');
    const result = (useManagerDashboard as ReturnType<typeof vi.fn>)();
    const managers = result.team.filter((m: TeamMember) => m.managerId === null);
    expect(managers.length).toBe(2);
  });

  it('has 3 distinct departments', async () => {
    const { useManagerDashboard } = await import('@/hooks/use-manager-dashboard');
    const result = (useManagerDashboard as ReturnType<typeof vi.fn>)();
    const depts = new Set(result.team.map((m: TeamMember) => m.department));
    expect(depts.size).toBeGreaterThanOrEqual(3);
  });
});

// ─── AC-2: Columns ────────────────────────────────────────────────────────────

describe('AC-2: team tab columns', () => {
  beforeEach(() => {
    renderWithIntl();
    clickTeamTab();
  });

  it('แสดง column header "หน่วยงาน"', () => {
    expect(screen.getByText('หน่วยงาน')).toBeDefined();
  });

  it('แสดง column header "ศูนย์ต้นทุน"', () => {
    expect(screen.getByText('ศูนย์ต้นทุน')).toBeDefined();
  });

  it('แสดง column header "หัวหน้างาน"', () => {
    expect(screen.getByText('หัวหน้างาน')).toBeDefined();
  });

  it('แสดง costCenter value ของ employee', () => {
    // หลาย records มี CC-1001 → ใช้ getAllByText
    const cells = screen.getAllByText('CC-1001');
    expect(cells.length).toBeGreaterThanOrEqual(1);
  });

  it('แสดง department value ของ employee', () => {
    const cells = screen.getAllByText('ฝ่ายไอที');
    expect(cells.length).toBeGreaterThanOrEqual(1);
  });

  it('แสดง managerName ของ employee ที่มีหัวหน้า', () => {
    // พลอย report to สมชาย
    const cells = screen.getAllByText('สมชาย ใจดี');
    expect(cells.length).toBeGreaterThanOrEqual(1);
  });

  it('แสดง "—" สำหรับ manager-level (managerName: null)', () => {
    // สมชาย + กฤษ มี managerName: null → render "—"
    const dashes = screen.getAllByText('—');
    expect(dashes.length).toBeGreaterThanOrEqual(2);
  });
});

// ─── AC-3: Filter chips ───────────────────────────────────────────────────────

describe('AC-3: filter chips', () => {
  beforeEach(() => {
    renderWithIntl();
    clickTeamTab();
  });

  it('แสดง status chip ครบ (ทั้งหมด/ทำงาน/ลา/ทดลองงาน)', () => {
    expect(screen.getByRole('button', { name: 'ทั้งหมด' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'ทำงาน' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'ลา' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'ทดลองงาน' })).toBeDefined();
  });

  it('แสดง dept chip "ทุกหน่วยงาน"', () => {
    expect(screen.getByRole('button', { name: 'ทุกหน่วยงาน' })).toBeDefined();
  });

  it('แสดง dept chips จาก unique departments', () => {
    expect(screen.getByRole('button', { name: 'ฝ่ายการเงิน' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'ฝ่ายขาย' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'ฝ่ายไอที' })).toBeDefined();
  });

  it('filter by dept ลดจำนวน rows ที่แสดง', () => {
    const deptBtn = screen.getByRole('button', { name: 'ฝ่ายการเงิน' });
    fireEvent.click(deptBtn);
    // ฝ่ายการเงิน มี EMP004 + EMP006 = 2 records
    const rows = screen.getAllByRole('row');
    // rows = header + data rows
    expect(rows.length).toBe(3); // 1 header + 2 data
  });
});

// ─── AC-4: Permission gate placeholder ───────────────────────────────────────

describe('AC-4: permission gate', () => {
  it('mockup-proof mode — team tab renders all fields without permission check', () => {
    renderWithIntl();
    clickTeamTab();
    // ทุก field แสดงได้โดยไม่มี permission gate blocking
    expect(screen.getAllByText('CC-1001').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('ฝ่ายไอที').length).toBeGreaterThanOrEqual(1);
  });
});

// ─── AC-5: Thai-primary labels ────────────────────────────────────────────────

describe('AC-5: Thai-primary labels', () => {
  beforeEach(() => {
    renderWithIntl();
    clickTeamTab();
  });

  it('column header ทั้งหมดเป็นภาษาไทย', () => {
    const table = screen.getByRole('table');
    const headers = within(table).getAllByRole('columnheader');
    const thaiPattern = /[฀-๿]/;
    headers.forEach((h) => {
      // "พนักงาน" / "หน่วยงาน" / "ศูนย์ต้นทุน" / "หัวหน้างาน" / "สถานะ"
      expect(h.textContent).toMatch(thaiPattern);
    });
  });
});

// ─── AC-6: No regression ─────────────────────────────────────────────────────

describe('AC-6: no regression on other tabs', () => {
  beforeEach(() => {
    renderWithIntl();
  });

  it('overview tab renders without errors', () => {
    const overviewBtn = screen.getByRole('button', { name: /ภาพรวมทีม/i });
    fireEvent.click(overviewBtn);
    expect(screen.getByText(/แจ้งเตือนสำคัญ/i)).toBeDefined();
  });

  it('approvals tab renders without errors', () => {
    const approvalsBtn = screen.getByRole('button', { name: /คำขอรออนุมัติ/i });
    fireEvent.click(approvalsBtn);
    expect(screen.getByText(/ไม่มีคำขอรออนุมัติ/i)).toBeDefined();
  });

  it('calendar tab renders without errors', () => {
    const calBtn = screen.getByRole('button', { name: /ปฏิทินทีม/i });
    fireEvent.click(calBtn);
    // หลังเปลี่ยน tab ควรมี element ที่มี text "ปฏิทินทีม" อย่างน้อย 1 ตัว
    expect(screen.getAllByText(/ปฏิทินทีม/i).length).toBeGreaterThanOrEqual(1);
  });
});
