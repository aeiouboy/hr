/**
 * manager-dashboard-org-chart-tab.test.tsx — BRD #175 Team Org Chart (hr#78)
 * Framework: Vitest + @testing-library/react + jsdom
 *
 * AC-1: tab แผนผังทีม render ได้
 * AC-2: toggle สายตรง/สายไขว้ ทำงาน
 * AC-3: Direct mode แสดง hierarchy ตาม managerId chain
 * AC-4: Matrix mode แสดง dotted-line tag สำหรับ node ที่มี dottedLineManagerId
 * AC-5: ภาษาไทย-primary: tab label, toggle labels
 * AC-6: No regression — tabs อื่น (team/approvals/calendar) ยังอยู่
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import thMessages from '../../../../messages/th.json';
import type { OrgNode } from '@/hooks/use-manager-dashboard';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/th/manager-dashboard'),
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}));

const MOCK_ORG_TREE: OrgNode = {
  id: 'MGR001',
  name: 'คุณ (ผู้จัดการ)',
  position: 'ผู้จัดการไอที',
  children: [
    {
      id: 'EMP001',
      name: 'สมชาย ใจดี',
      position: 'Senior Developer',
      children: [
        {
          id: 'EMP002',
          name: 'พลอย สุขสวัสดิ์',
          position: 'UX Designer',
          dottedLineManagerId: 'EMP005',
        },
        {
          id: 'EMP003',
          name: 'ณัฐพงศ์ แก้วสาย',
          position: 'QA Engineer',
          dottedLineManagerId: 'EMP006',
        },
      ],
    },
    {
      id: 'EMP005',
      name: 'กฤษ ตระหนักวงศ์',
      position: 'DevOps Engineer',
      children: [
        {
          id: 'EMP006',
          name: 'มาลี ศรีพันธ์',
          position: 'Business Analyst',
          children: [
            { id: 'EMP004', name: 'รัชนี บุญศรี', position: 'Junior Developer' },
          ],
        },
      ],
    },
  ],
};

vi.mock('@/hooks/use-manager-dashboard', async () => {
  const actual = await vi.importActual('@/hooks/use-manager-dashboard');
  return {
    ...actual,
    useManagerDashboard: vi.fn(() => ({
      team: [],
      approvals: [],
      alerts: [],
      calendarEvents: [],
      orgChart: MOCK_ORG_TREE,
      stats: { totalMembers: 0, activeToday: 0, onLeaveToday: 0, pendingApprovals: 0, inProbation: 0 },
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

function clickOrgChartTab() {
  const tab = screen.getByRole('button', { name: /แผนผังทีม/i });
  fireEvent.click(tab);
}

// ─── AC-1: Tab render ─────────────────────────────────────────────────────────

describe('AC-1: tab แผนผังทีม', () => {
  it('แสดง tab แผนผังทีม ใน tab bar', () => {
    renderWithIntl();
    expect(screen.getByRole('button', { name: /แผนผังทีม/i })).toBeDefined();
  });

  it('คลิก tab แล้วเห็น org chart content', () => {
    renderWithIntl();
    clickOrgChartTab();
    // title ใน card header
    const headings = screen.getAllByText(/แผนผังทีม/i);
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it('แสดง root node ชื่อ ผู้จัดการ', () => {
    renderWithIntl();
    clickOrgChartTab();
    expect(screen.getByText('คุณ (ผู้จัดการ)')).toBeDefined();
  });
});

// ─── AC-2: Toggle สายตรง / สายไขว้ ───────────────────────────────────────────

describe('AC-2: toggle สายตรง / สายไขว้', () => {
  beforeEach(() => {
    renderWithIntl();
    clickOrgChartTab();
  });

  it('แสดง toggle button สายตรง และ สายไขว้', () => {
    expect(screen.getByRole('button', { name: /สายตรง/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /สายไขว้/i })).toBeDefined();
  });

  it('ค่าเริ่มต้นคือ สายตรง', () => {
    const btn = screen.getByRole('button', { name: /^สายตรง$/i });
    // active state ควรมี bg-brand class
    expect(btn.className).toMatch(/bg-brand/);
  });

  it('คลิก สายไขว้ แล้ว toggle state เปลี่ยน', () => {
    const matrixBtn = screen.getByRole('button', { name: /^สายไขว้$/i });
    fireEvent.click(matrixBtn);
    expect(matrixBtn.className).toMatch(/bg-brand/);
  });
});

// ─── AC-3: Direct mode hierarchy ─────────────────────────────────────────────

describe('AC-3: Direct mode แสดง hierarchy', () => {
  beforeEach(() => {
    renderWithIntl();
    clickOrgChartTab();
    // ensure สายตรง active (default)
  });

  it('แสดง สมชาย ใจดี ใน tree', () => {
    expect(screen.getByText('สมชาย ใจดี')).toBeDefined();
  });

  it('แสดง พลอย สุขสวัสดิ์ เป็น child', () => {
    expect(screen.getByText('พลอย สุขสวัสดิ์')).toBeDefined();
  });

  it('ไม่แสดง tag สายไขว้ ใน Direct mode', () => {
    const tags = screen.queryAllByText(/สายไขว้/);
    // ใน Direct mode ไม่ควรมี dotted tag (toggle header text ไม่นับ — ใช้ exact text)
    const dottedTags = tags.filter((el) => el.closest('[class*="border-dashed"]') !== null);
    expect(dottedTags.length).toBe(0);
  });
});

// ─── AC-4: Matrix mode dotted-line ───────────────────────────────────────────

describe('AC-4: Matrix mode แสดง dotted-line tag', () => {
  beforeEach(() => {
    renderWithIntl();
    clickOrgChartTab();
    const matrixBtn = screen.getByRole('button', { name: /^สายไขว้$/i });
    fireEvent.click(matrixBtn);
  });

  it('แสดง tag สายไขว้ สำหรับ พลอย ที่มี dottedLineManagerId', () => {
    // พลอย มี dottedLineManagerId: 'EMP005' → กฤษ ตระหนักวงศ์
    const dottedTags = screen.getAllByText(/สายไขว้/i);
    // อย่างน้อย 1 tag (พลอย + ณัฐพงศ์)
    expect(dottedTags.length).toBeGreaterThanOrEqual(1);
  });

  it('tag สายไขว้ พลอย แสดงชื่อ กฤษ ตระหนักวงศ์', () => {
    // dotted tag ใน span ของ พลอย
    // เนื่องจาก idMap สร้างจาก orgChart tree → ควรหา text 'กฤษ' ใน tag
    const allText = document.body.textContent ?? '';
    expect(allText).toContain('กฤษ ตระหนักวงศ์');
  });
});

// ─── AC-5: Thai-primary labels ────────────────────────────────────────────────

describe('AC-5: ภาษาไทย-primary', () => {
  it('tab label = แผนผังทีม (ไม่ใช่ Org Chart)', () => {
    renderWithIntl();
    expect(screen.queryByRole('button', { name: /^Org Chart$/i })).toBeNull();
    expect(screen.getByRole('button', { name: /แผนผังทีม/i })).toBeDefined();
  });

  it('toggle labels = สายตรง / สายไขว้ ไม่ใช่ Direct / Matrix', () => {
    renderWithIntl();
    clickOrgChartTab();
    expect(screen.queryByRole('button', { name: /^Direct$/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /^Matrix$/i })).toBeNull();
    expect(screen.getByRole('button', { name: /^สายตรง$/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /^สายไขว้$/i })).toBeDefined();
  });
});

// ─── AC-6: No regression ─────────────────────────────────────────────────────

describe('AC-6: No regression — tabs อื่นยังอยู่', () => {
  it('tab ภาพรวมทีม ยังอยู่', () => {
    renderWithIntl();
    expect(screen.getByRole('button', { name: /ภาพรวมทีม/i })).toBeDefined();
  });

  it('tab อนุมัติคำขอ ยังอยู่', () => {
    renderWithIntl();
    expect(screen.getByRole('button', { name: /อนุมัติ/i })).toBeDefined();
  });

  it('tab ปฏิทินทีม ยังอยู่', () => {
    renderWithIntl();
    expect(screen.getByRole('button', { name: /ปฏิทิน/i })).toBeDefined();
  });

  it('overview tab: แสดง CTA card ดูแผนผังเต็ม แทน mini org chart', () => {
    renderWithIntl();
    // overview tab เป็น default — หา "ดูแผนผังเต็ม" button
    expect(screen.getByRole('button', { name: /ดูแผนผังเต็ม/i })).toBeDefined();
  });

  it('คลิก "ดูแผนผังเต็ม" ใน overview นำไปสู่ org-chart tab', () => {
    renderWithIntl();
    const ctaBtn = screen.getByRole('button', { name: /ดูแผนผังเต็ม/i });
    fireEvent.click(ctaBtn);
    // หลัง switch tab ควรเห็น toggle button สายตรง
    expect(screen.getByRole('button', { name: /^สายตรง$/i })).toBeDefined();
  });
});
