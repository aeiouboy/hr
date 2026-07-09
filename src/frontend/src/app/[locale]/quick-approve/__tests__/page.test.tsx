/**
 * /quick-approve page.test.tsx
 *
 * Smoke tests: the route page renders QuickApproveSimple without crashing.
 * The page delegates to QuickApproveSimple (PR-5 Req7) — a unified status-
 * filtered inbox with title "คิวอนุมัติ" (t('title') in the simple namespace),
 * status filter tabs (all/pending/approved/rejected), and a DataTable.
 *
 * Inline bulk multi-select (restored): the pending inbox now offers a leading
 * checkbox column + sticky action bar gated behind the `bulkApprove` capability,
 * dispatching through the shared useBulkApproveDispatch engine. These tests drive
 * that flow against a controlled approval-registry mock (spy adapters + a mutable
 * queue) so approve/reject dispatch and pending-removal are deterministic.
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ── Controlled approval-registry (spy adapters + mutable queue) ────────────────
// Hoisted so the vi.mock factory can share the same state the tests inspect.
const reg = vi.hoisted(() => {
  const approveSpy = vi.fn();
  const rejectSpy = vi.fn();
  const state = { queue: [] as Array<{ row: Record<string, unknown>; status: string; awaitingNext?: boolean }> };
  const removeRow = (id: string) => {
    state.queue = state.queue.filter((q) => (q.row as { id: string }).id !== id);
  };
  return { approveSpy, rejectSpy, state, removeRow };
});

vi.mock('@/lib/approval-registry', () => ({
  useSelectPendingApprovals: () => reg.state.queue,
  isTerminationId: () => false,
  APPROVAL_REGISTRY: new Proxy(
    {},
    {
      get: () => ({
        approve: (id: string, actor: unknown) => {
          reg.approveSpy(id, actor);
          reg.removeRow(id);
        },
        reject: (id: string, actor: unknown, reason: string) => {
          reg.rejectSpy(id, actor, reason);
          reg.removeRow(id);
        },
      }),
    },
  ),
}));

// ── next-intl mock ─────────────────────────────────────────────────────────
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    // Return the last segment so nested keys like "filter.all" → "ทั้งหมด"
    const map: Record<string, string> = {
      'title': 'คิวอนุมัติ',
      'breadcrumb': 'อนุมัติ',
      'subtitlePending': '{n} รายการรอการตัดสินใจ',
      'filter.all': 'ทั้งหมด',
      'filter.pending': 'รออนุมัติ',
      'filter.approved': 'อนุมัติแล้ว',
      'filter.rejected': 'ปฏิเสธแล้ว',
      'columns.ref': 'เลขที่',
      'columns.employee': 'พนักงาน',
      'columns.type': 'ประเภท',
      'columns.filed': 'วันที่ส่ง',
      'columns.detail': 'รายละเอียด',
      'columns.status': 'สถานะ',
      'actions.approve': 'อนุมัติ',
      'actions.reject': 'ปฏิเสธ',
      'actions.view': 'ดูรายละเอียด',
      'status.pending': 'รออนุมัติ',
      'status.approved': 'อนุมัติแล้ว',
      'status.rejected': 'ปฏิเสธแล้ว',
      'status.awaitingNext': 'รอผู้อนุมัติถัดไป',
    };
    return map[key] ?? key;
  },
  useLocale: () => 'th',
}));

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

// ── Humi component stubs ───────────────────────────────────────────────────
vi.mock('@/components/humi', async () => {
  const { Capability } = await vi.importActual<typeof import('@/components/humi/atoms/Capability')>(
    '@/components/humi/atoms/Capability',
  );
  return {
    Card: ({ children }: any) => <div>{children}</div>,
    CardTitle: ({ children }: any) => <h2>{children}</h2>,
    Button: ({ children, onClick, disabled }: any) => (
      <button onClick={onClick} disabled={disabled}>{children}</button>
    ),
    Modal: ({ open, children, title }: any) =>
      open ? <div role="dialog" aria-label={title}>{children}</div> : null,
    FormField: ({ children, label }: any) => (
      <div>
        <label>{label}</label>
        {typeof children === 'function' ? children({}) : children}
      </div>
    ),
    DataTable: ({ rows, columns }: any) => (
      <div data-testid="data-table">
        {rows.length === 0
          ? <div data-testid="empty-state" />
          : (
            <div data-testid="has-rows">
              {rows.map((row: any) => (
                <div key={row.id} data-testid={`row-${row.id}`} data-type={row.type}>
                  {columns?.map((col: any) => (
                    <span key={col.id}>{col.cell ? col.cell(row) : null}</span>
                  ))}
                </div>
              ))}
            </div>
          )}
      </div>
    ),
    Capability,
  };
});

// ── localStorage mock ──────────────────────────────────────────────────────
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v; },
    removeItem: (k: string) => { delete store[k]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true });

import { useAuthStore } from '@/stores/auth-store';

function setRoles(roles: string[], id = 'TEST-SPD', name = 'SPD Test') {
  useAuthStore.setState({
    userId: id,
    username: name,
    email: 'spd@humi.test',
    roles,
    isAuthenticated: true,
    originalUser: null,
    _hasHydrated: true,
  } as Parameters<typeof useAuthStore.setState>[0]);
}

// Minimal QueueApproval fixture the inbox reads.
function mkRow(id: string, type = 'leave', status = 'pending') {
  return {
    row: {
      id,
      type,
      requester: { id: 'E1', name: `Emp ${id}`, position: 'Dev', department: 'IT', employeeId: 'E1' },
      submittedAt: '2026-06-01T09:00:00.000Z',
      submitDate: '2026-06-01T09:00:00.000Z',
      description: `desc ${id}`,
      urgency: 'normal',
      waitingDays: 1,
      details: {},
    } as Record<string, unknown>,
    status,
    awaitingNext: false,
  };
}

beforeEach(() => {
  localStorageMock.clear();
  reg.approveSpy.mockClear();
  reg.rejectSpy.mockClear();
  reg.state.queue = [];
  setRoles(['spd']);
});

describe('/quick-approve page route', () => {
  it('renders without crashing and shows the workspace title', async () => {
    const { default: QuickApprovePageRoute } = await import('@/app/[locale]/quick-approve/page');
    render(<QuickApprovePageRoute />);
    // QuickApproveSimple renders t('title') = 'คิวอนุมัติ' as an <h1>
    expect(screen.getByRole('heading', { level: 1, name: /คิวอนุมัติ/ })).toBeInTheDocument();
  });

  it('renders the data table and status filter tabs', async () => {
    const { default: QuickApprovePageRoute } = await import('@/app/[locale]/quick-approve/page');
    render(<QuickApprovePageRoute />);
    // DataTable is always rendered (stub shows empty-state when rows=[])
    expect(screen.getByTestId('data-table')).toBeInTheDocument();
    // Status tabs: all / pending / approved / rejected
    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBeGreaterThanOrEqual(4);
  });

  it('shows status filter tab buttons for all four states', async () => {
    const { default: QuickApprovePageRoute } = await import('@/app/[locale]/quick-approve/page');
    render(<QuickApprovePageRoute />);
    // Four segmented filter tabs rendered as role=tab buttons
    expect(screen.getByRole('tab', { name: /ทั้งหมด/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /รออนุมัติ/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /อนุมัติแล้ว/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /ปฏิเสธแล้ว/ })).toBeInTheDocument();
  });
});

describe('/quick-approve inline bulk multi-select', () => {
  const idOf = (btn: Element) =>
    btn.closest('[data-testid^="row-"]')?.getAttribute('data-testid')?.replace('row-', '') ?? '';

  it('offers a checkbox only for actionable pending rows (non-actionable rows have none)', async () => {
    reg.state.queue = [mkRow('R-A'), mkRow('R-B'), mkRow('R-D', 'leave', 'approved')];
    const { default: Route } = await import('@/app/[locale]/quick-approve/page');
    render(<Route />);
    // Two pending rows → two checkboxes; the approved row gets none.
    const boxes = screen.getAllByRole('button', { name: 'bulk.selectRow' });
    expect(boxes).toHaveLength(2);
    const approvedRow = screen.getByTestId('row-R-D');
    expect(within(approvedRow).queryByRole('button', { name: 'bulk.selectRow' })).toBeNull();
  });

  it('selects 2 rows → Approve → both dispatched and removed from pending', async () => {
    const user = userEvent.setup();
    reg.state.queue = [mkRow('R-A'), mkRow('R-B'), mkRow('R-C')];
    const { default: Route } = await import('@/app/[locale]/quick-approve/page');
    render(<Route />);

    const boxes = screen.getAllByRole('button', { name: 'bulk.selectRow' });
    expect(boxes).toHaveLength(3);
    const id0 = idOf(boxes[0]);
    const id1 = idOf(boxes[1]);
    await user.click(boxes[0]);
    await user.click(boxes[1]);

    // Sticky action bar appears → open the approve confirm modal, then confirm.
    await user.click(screen.getByRole('button', { name: 'bulk.approveSelected' }));
    await user.click(screen.getByRole('button', { name: 'bulk.confirm' }));

    // Both rows dispatched to their per-type approve adapter.
    expect(reg.approveSpy).toHaveBeenCalledTimes(2);
    const dispatched = reg.approveSpy.mock.calls.map((c) => c[0]);
    expect(dispatched).toEqual(expect.arrayContaining([id0, id1]));
    expect(reg.rejectSpy).not.toHaveBeenCalled();

    // Removed from pending: their rows/checkboxes are gone, one selectable remains.
    expect(screen.queryByTestId(`row-${id0}`)).toBeNull();
    expect(screen.queryByTestId(`row-${id1}`)).toBeNull();
    expect(screen.getAllByRole('button', { name: 'bulk.selectRow' })).toHaveLength(1);
  });

  it('selects a row → Reject with reason → reject dispatched with the reason', async () => {
    const user = userEvent.setup();
    reg.state.queue = [mkRow('R-A'), mkRow('R-B')];
    const { default: Route } = await import('@/app/[locale]/quick-approve/page');
    render(<Route />);

    const boxes = screen.getAllByRole('button', { name: 'bulk.selectRow' });
    const id0 = idOf(boxes[0]);
    await user.click(boxes[0]);

    await user.click(screen.getByRole('button', { name: 'bulk.reject' }));
    // Reject-reason modal: type a reason, then confirm.
    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'ไม่ครบเอกสาร');
    await user.click(screen.getByRole('button', { name: 'bulk.confirm' }));

    expect(reg.rejectSpy).toHaveBeenCalledTimes(1);
    expect(reg.rejectSpy).toHaveBeenCalledWith(id0, expect.anything(), 'ไม่ครบเอกสาร');
    expect(reg.approveSpy).not.toHaveBeenCalled();
    expect(screen.queryByTestId(`row-${id0}`)).toBeNull();
  });

  it('hides the bulk affordance for a persona without the bulkApprove capability', async () => {
    setRoles(['manager'], 'TEST-MGR', 'Manager Test');
    reg.state.queue = [mkRow('R-A'), mkRow('R-B')];
    const { default: Route } = await import('@/app/[locale]/quick-approve/page');
    render(<Route />);
    // No checkbox column, no bulk action bar for a non-bulkApprove persona.
    expect(screen.queryAllByRole('button', { name: 'bulk.selectRow' })).toHaveLength(0);
    expect(screen.queryByRole('button', { name: 'bulk.approveSelected' })).toBeNull();
  });
});
