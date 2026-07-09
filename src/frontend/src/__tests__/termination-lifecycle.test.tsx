import '@testing-library/jest-dom/vitest';
import React, { Suspense } from 'react';
import { act, cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import RequestsPage from '@/app/[locale]/requests/page';
import ResignationDetailPage from '@/app/[locale]/workflows/resignation/[id]/page';
import { buildTerminationRequestPayload } from '@/lib/termination-request';
import { useEmployees } from '@/lib/admin/store/useEmployees';
import { useTimelines } from '@/lib/admin/store/useTimelines';
import type { Role } from '@/lib/rbac';
import { useAuthStore } from '@/stores/auth-store';
import { useEssRequestActions } from '@/stores/ess-request-actions';
import { useRequestsStore } from '@/stores/humi-requests-slice';
import { useTerminationApprovals } from '@/stores/termination-approvals';

const pushSpy = vi.fn();
const pathnameSpy = vi.fn(() => '/th/requests');

vi.mock('next/navigation', () => ({
  usePathname: () => pathnameSpy(),
  useRouter: () => ({ push: pushSpy }),
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'th',
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    readonly href: string;
    readonly children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const SUBMITTER_ID = 'EMP-LIFE-001';
const SUBMITTER_NAME = 'Narin Requester';
const SEND_BACK_NOTE = 'Please clarify the transfer target before approval';

function getActiveEmployeeId(): string {
  const employee = useEmployees.getState().all.find((item) => item.status === 'active');
  if (!employee) throw new Error('No active employee fixture available for termination lifecycle test.');
  return employee.employee_id;
}

function setViewer(user: { readonly id: string; readonly name: string; readonly roles: readonly Role[] }) {
  useAuthStore.setState({
    userId: user.id,
    username: user.name,
    email: `${user.id.toLowerCase()}@example.com`,
    roles: [...user.roles],
    isAuthenticated: true,
    _hasHydrated: true,
  });
}

async function renderApprovalDetail(id: string) {
  await act(async () => {
    render(
      <Suspense fallback={null}>
        <ResignationDetailPage params={Promise.resolve({ id, locale: 'th' })} />
      </Suspense>,
    );
  });
  await screen.findByRole('heading', { name: /อนุมัติการลาออก/ });
}

function createEssTerminationRequest(employeeId: string): string {
  const payload = buildTerminationRequestPayload(
    {
      employeeId,
      employeeName: 'Somchai Lifecycle',
      requestedLastDay: '2026-08-31',
      reasonCode: 'TERM_RESIGN',
      reasonText: 'Relocating to another province',
      reasonForTermination: 'Family relocation',
      transferOutTo: 'Central Retail Shared Services',
      okToRehire: true,
      additionalInfo: 'Initial additional details',
      personalEmail: 'somchai.lifecycle@example.com',
      attachments: [
        {
          id: 'att-life-001',
          name: 'resignation-letter.pdf',
          size: 12_800,
          type: 'application/pdf',
        },
      ],
    },
    {
      id: SUBMITTER_ID,
      name: SUBMITTER_NAME,
      role: 'employee',
      sourceRoute: 'ess',
    },
  );
  return useTerminationApprovals.getState().addRequest(payload);
}

describe('termination request lifecycle across approval and requester surfaces', () => {
  beforeEach(() => {
    pushSpy.mockClear();
    pathnameSpy.mockReturnValue('/th/requests');
    localStorage.clear();
    useTerminationApprovals.setState({ requests: [] });
    useEssRequestActions.setState({ actions: {} });
    useRequestsStore.setState({ filter: 'all' });
    useTimelines.setState({ byEmployee: {} });
  });

  afterEach(() => {
    cleanup();
    useTerminationApprovals.setState({ requests: [] });
    useEssRequestActions.setState({ actions: {} });
    useRequestsStore.setState({ filter: 'all' });
    useTimelines.setState({ byEmployee: {} });
    useAuthStore.setState({ userId: null, username: null, roles: [], isAuthenticated: false });
  });

  it('drives ESS submit through send-back, revise, approvals, and final termination commit', async () => {
    const employeeId = getActiveEmployeeId();
    useEmployees.getState().updateEmployee(employeeId, { status: 'active' });
    const requestId = createEssTerminationRequest(employeeId);

    setViewer({ id: 'MGR-LIFE', name: 'Manager Lifecycle', roles: ['manager'] });
    await renderApprovalDetail(requestId);

    expect(screen.getByText('resignation-letter.pdf')).toBeInTheDocument();
    expect(screen.getByText('Family relocation')).toBeInTheDocument();
    expect(screen.getByText('Central Retail Shared Services')).toBeInTheDocument();
    expect(screen.getByText('somchai.lifecycle@example.com')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /^ส่งกลับ$/ }));
    await userEvent.type(await screen.findByPlaceholderText(/ต้องการรายละเอียดเพิ่มเติม/), SEND_BACK_NOTE);
    await userEvent.click(screen.getByRole('button', { name: /ยืนยันส่งกลับ/ }));

    await waitFor(() => {
      expect(useTerminationApprovals.getState().requests[0]?.status).toBe('sent_back');
    });
    expect(useTerminationApprovals.getState().requests[0]?.audit.at(-1)).toMatchObject({
      action: 'send_back',
      comment: SEND_BACK_NOTE,
    });

    cleanup();
    setViewer({ id: SUBMITTER_ID, name: SUBMITTER_NAME, roles: ['employee'] });
    render(<RequestsPage />);

    const requesterRow = await screen.findByText(new RegExp(requestId));
    const row = requesterRow.closest('li');
    if (!row) throw new Error('Could not find termination request row.');
    expect(within(row).getByText(/ถูกส่งกลับ — แก้ไขได้ \/ Sent back — needs revision/)).toBeInTheDocument();
    expect(within(row).getByRole('button', { name: 'ถอนคำขอ' })).toBeInTheDocument();
    expect(within(row).getByRole('link', { name: 'แก้ไขและส่งใหม่' })).toHaveAttribute(
      'href',
      `/th/resignation?edit=${requestId}`,
    );
    await userEvent.click(within(row).getByRole('button', { name: new RegExp(`ดูรายละเอียดการอนุมัติ ${requestId}`) }));
    expect(await screen.findByText(SEND_BACK_NOTE)).toBeInTheDocument();
    expect(screen.getByText('Family relocation')).toBeInTheDocument();

    act(() => {
      useTerminationApprovals.getState().updateRequest(requestId, {
        additionalInfo: 'Revised with transfer destination confirmed',
      });
      useTerminationApprovals.getState().resubmit(requestId);
      useEssRequestActions.getState().resubmit(requestId);
    });
    expect(useTerminationApprovals.getState().requests[0]?.status).toBe('pending_manager');

    cleanup();
    setViewer({ id: 'MGR-LIFE', name: 'Manager Lifecycle', roles: ['manager'] });
    await renderApprovalDetail(requestId);
    await userEvent.click(screen.getByRole('button', { name: /^อนุมัติ$/ }));
    await waitFor(() => {
      expect(useTerminationApprovals.getState().requests[0]?.status).toBe('pending_spd');
    });

    cleanup();
    setViewer({ id: 'SPD-LIFE', name: 'SPD Lifecycle', roles: ['hr_admin'] });
    await renderApprovalDetail(requestId);
    await userEvent.click(screen.getByRole('button', { name: /^อนุมัติ$/ }));

    await waitFor(() => {
      expect(useTerminationApprovals.getState().requests[0]?.status).toBe('approved');
    });
    expect(useEmployees.getState().getById(employeeId)?.status).toBe('terminated');
    expect(useTimelines.getState().get(employeeId).some((event) => event.kind === 'terminate')).toBe(true);
  });
});
