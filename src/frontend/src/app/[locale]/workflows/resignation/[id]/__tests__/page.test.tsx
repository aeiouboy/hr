import '@testing-library/jest-dom/vitest';
import React, { Suspense } from 'react';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ResignationDetailPage from '../page';
import {
  useTerminationApprovals,
  type TerminationRequest,
} from '@/stores/termination-approvals';
import { useAuthStore } from '@/stores/auth-store';

const pushSpy = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushSpy }),
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

const REQUEST_ID = 'TR-20260424-0800-X1KM';

function pendingResignation(): TerminationRequest {
  return {
    id: REQUEST_ID,
    employeeId: 'EMP-0800',
    employeeName: 'Prasert Wattanachai',
    requestedLastDay: '2026-05-31',
    reasonCode: 'TERM_RESIGN',
    reasonText: 'New opportunity',
    attachments: [
      {
        id: 'ATT-001',
        name: 'resignation-letter.pdf',
        size: 42_000,
        type: 'application/pdf',
      },
    ],
    status: 'pending_manager',
    submittedAt: '2026-04-24T08:00:00.000Z',
    submittedBy: { id: 'EMP-0800', name: 'Prasert Wattanachai', role: 'employee' },
    audit: [
      {
        actorRole: 'employee',
        actorName: 'Prasert Wattanachai',
        action: 'submit',
        at: '2026-04-24T08:00:00.000Z',
      },
    ],
  };
}

async function renderPage() {
  await act(async () => {
    render(
      <Suspense fallback={null}>
        <ResignationDetailPage params={Promise.resolve({ id: REQUEST_ID, locale: 'en' })} />
      </Suspense>,
    );
  });
  await screen.findByRole('heading', { name: /Approve resignation/i });
}

function pendingHrAdminResignation(): TerminationRequest {
  return {
    ...pendingResignation(),
    status: 'pending_spd',
    audit: [
      {
        actorRole: 'employee',
        actorName: 'Prasert Wattanachai',
        action: 'submit',
        at: '2026-04-24T08:00:00.000Z',
      },
      {
        actorRole: 'manager',
        actorName: 'ผู้จัดการ / Manager',
        action: 'approve',
        at: '2026-04-25T08:00:00.000Z',
      },
    ],
  };
}

function setViewer(roles: Array<'manager' | 'hr_admin'>, username: string) {
  useAuthStore.setState({ roles, username, isAuthenticated: true, _hasHydrated: true });
}

describe('ResignationDetailPage — manager step (pending_manager)', () => {
  beforeEach(() => {
    pushSpy.mockClear();
    setViewer(['manager'], 'ผู้จัดการ / Manager');
    useTerminationApprovals.setState({ requests: [pendingResignation()] });
  });

  afterEach(() => {
    cleanup();
    useTerminationApprovals.setState({ requests: [] });
    useAuthStore.setState({ roles: [], username: null, isAuthenticated: false });
  });

  it('shows approve-and-send-back and send-back actions, without talk-first or reject', async () => {
    await renderPage();

    expect(screen.getByRole('button', { name: /^Approve$/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /^Send back$/i })).toBeEnabled();
    expect(screen.queryByRole('button', { name: /Talk first/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Reject/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/talk first/i)).not.toBeInTheDocument();
  });

  it('removes the "Your decision" section from the page', async () => {
    await renderPage();

    expect(screen.queryByText(/Your decision/i)).not.toBeInTheDocument();
  });

  it('approves the resignation and sends the manager back to quick approve', async () => {
    await renderPage();

    await userEvent.click(screen.getByRole('button', { name: /^Approve$/i }));

    await waitFor(() => {
      expect(pushSpy).toHaveBeenCalledWith('/en/quick-approve?decided=resignation-approved');
    });
    const request = useTerminationApprovals
      .getState()
      .requests.find((item) => item.id === REQUEST_ID);
    expect(request?.status).toBe('pending_spd');
    expect(request?.audit.at(-1)).toMatchObject({
      actorRole: 'manager',
      actorName: 'ผู้จัดการ / Manager',
      action: 'approve',
    });
  });

  it('requires a reason before confirming send back', async () => {
    await renderPage();

    await userEvent.click(screen.getByRole('button', { name: /^Send back$/i }));

    const confirmButton = await screen.findByRole('button', { name: /Confirm send back/i });
    expect(confirmButton).toBeDisabled();

    expect(pushSpy).not.toHaveBeenCalled();
  });

  it('sends the resignation back with a reason and returns to quick approve', async () => {
    await renderPage();

    await userEvent.click(screen.getByRole('button', { name: /^Send back$/i }));
    const reasonInput = await screen.findByPlaceholderText(/Need more details/i);
    await userEvent.type(reasonInput, 'Need the last-day date confirmed');

    const confirmButton = screen.getByRole('button', { name: /Confirm send back/i });
    expect(confirmButton).toBeEnabled();
    await userEvent.click(confirmButton);

    await waitFor(() => {
      expect(pushSpy).toHaveBeenCalledWith('/en/quick-approve?decided=resignation-sent-back');
    });
    const request = useTerminationApprovals
      .getState()
      .requests.find((item) => item.id === REQUEST_ID);
    expect(request?.status).toBe('sent_back');
    expect(request?.audit.at(-1)).toMatchObject({
      actorRole: 'manager',
      actorName: 'ผู้จัดการ / Manager',
      action: 'send_back',
      comment: 'Need the last-day date confirmed',
    });
  });
});

describe('ResignationDetailPage — HR Admin step (pending_spd)', () => {
  beforeEach(() => {
    pushSpy.mockClear();
    setViewer(['hr_admin'], 'ผู้ดูแลระบบ HR / HR Admin');
    useTerminationApprovals.setState({ requests: [pendingHrAdminResignation()] });
  });

  afterEach(() => {
    cleanup();
    useTerminationApprovals.setState({ requests: [] });
    useAuthStore.setState({ roles: [], username: null, isAuthenticated: false });
  });

  it('lets HR Admin approve at the HR Admin step (was previously stuck disabled for everyone)', async () => {
    await renderPage();

    expect(screen.getByRole('button', { name: /^Approve$/i })).toBeEnabled();
    await userEvent.click(screen.getByRole('button', { name: /^Approve$/i }));

    await waitFor(() => {
      expect(pushSpy).toHaveBeenCalledWith('/en/quick-approve?decided=resignation-approved');
    });
    const request = useTerminationApprovals
      .getState()
      .requests.find((item) => item.id === REQUEST_ID);
    expect(request?.status).toBe('approved');
    expect(request?.audit.at(-1)).toMatchObject({
      actorRole: 'hr_admin',
      actorName: 'ผู้ดูแลระบบ HR / HR Admin',
      action: 'approve',
    });
  });

  it('lets HR Admin send the request back at the HR Admin step', async () => {
    await renderPage();

    await userEvent.click(screen.getByRole('button', { name: /^Send back$/i }));
    const reasonInput = await screen.findByPlaceholderText(/Need more details/i);
    await userEvent.type(reasonInput, 'Missing final pay documentation');
    await userEvent.click(screen.getByRole('button', { name: /Confirm send back/i }));

    await waitFor(() => {
      expect(pushSpy).toHaveBeenCalledWith('/en/quick-approve?decided=resignation-sent-back');
    });
    const request = useTerminationApprovals
      .getState()
      .requests.find((item) => item.id === REQUEST_ID);
    expect(request?.status).toBe('sent_back');
    expect(request?.audit.at(-1)).toMatchObject({
      actorRole: 'hr_admin',
      actorName: 'ผู้ดูแลระบบ HR / HR Admin',
      action: 'send_back',
      comment: 'Missing final pay documentation',
    });
  });
});

describe('ResignationDetailPage — cross-step view-only (remove not hide would be wrong here)', () => {
  afterEach(() => {
    cleanup();
    useTerminationApprovals.setState({ requests: [] });
    useAuthStore.setState({ roles: [], username: null, isAuthenticated: false });
  });

  it('shows the HR-Admin-step request to a manager as view-only, not actionable', async () => {
    pushSpy.mockClear();
    setViewer(['manager'], 'ผู้จัดการ / Manager');
    useTerminationApprovals.setState({ requests: [pendingHrAdminResignation()] });

    await renderPage();

    expect(screen.getByRole('button', { name: /^Approve$/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /^Send back$/i })).toBeDisabled();
    expect(screen.getByText(/Awaiting HR Admin/i)).toBeInTheDocument();
  });

  it('shows a still-pending-manager request to HR Admin as view-only, not actionable', async () => {
    pushSpy.mockClear();
    setViewer(['hr_admin'], 'ผู้ดูแลระบบ HR / HR Admin');
    useTerminationApprovals.setState({ requests: [pendingResignation()] });

    await renderPage();

    expect(screen.getByRole('button', { name: /^Approve$/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /^Send back$/i })).toBeDisabled();
    expect(screen.getByText(/Awaiting manager/i)).toBeInTheDocument();
  });
});
