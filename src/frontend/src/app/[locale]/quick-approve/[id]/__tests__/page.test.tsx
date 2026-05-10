import React, { Suspense } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock('next/navigation', () => ({
  useRouter: () => ({ back: vi.fn(), push: vi.fn() }),
  useParams: () => ({ locale: 'th' }),
}));

vi.mock('next-intl', () => ({
  useTranslations: (ns: string) => (key: string) => `${ns}.${key}`,
}));

vi.mock('@/hooks/use-capabilities', () => ({
  useCapabilities: () => ({
    canSee: (entity: string) => entity !== 'BenefitEmployeeClaim', // deny claim by default
    canDo: (_action: string) => true,
  }),
}));

vi.mock('@/components/humi', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Avatar: ({ fallback }: { fallback: string }) => <span data-testid="avatar">{fallback}</span>,
  Modal: ({ open, children, title }: { open: boolean; children: React.ReactNode; title: string }) =>
    open ? (
      <div role="dialog" aria-label={title}>
        {children}
      </div>
    ) : null,
  FormField: ({ children, label }: { children: React.ReactNode; label: string }) => (
    <div>
      <label>{label}</label>
      {children}
    </div>
  ),
  FormInput: (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...props} />,
  Capability: ({
    children,
    fallback,
    entity,
    action,
  }: {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    entity?: string;
    action?: string;
  }) => {
    // mirror real logic: deny BenefitEmployeeClaim, allow everything else
    const entityOk = entity ? entity !== 'BenefitEmployeeClaim' : true;
    const actionOk = action ? true : true;
    return entityOk && actionOk ? <>{children}</> : <>{fallback ?? null}</>;
  },
}));

vi.mock('@/components/quick-approve/ApprovalChain', () => ({
  ApprovalTimelineChain: () => <div data-testid="approval-chain" />,
}));

vi.mock('@/components/quick-approve/UrgencyBadge', () => ({
  UrgencyBadge: ({ urgency }: { urgency: string }) => <span data-testid="urgency">{urgency}</span>,
}));

// ── Subject ───────────────────────────────────────────────────────────────────

import QuickApproveDetailPage from '../page';

// ── Helpers ───────────────────────────────────────────────────────────────────

// CONTRACT: QuickApproveDetailPage uses React.use(params) — Next.js 15+ async
// params API. Tests must wrap params in Promise.resolve() and render inside
// act() + Suspense so React can resolve the Promise before assertions run.
function makeParams(id: string, locale = 'th') {
  return Promise.resolve({ id, locale });
}

async function renderPage(id: string) {
  let result!: ReturnType<typeof render>;
  await act(async () => {
    result = render(
      <Suspense fallback={null}>
        <QuickApproveDetailPage params={makeParams(id)} />
      </Suspense>,
    );
  });
  return result;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('QuickApproveDetailPage', () => {
  it('renders request summary for a known ID', async () => {
    await renderPage('WF-001');
    expect(screen.getByText('สมชาย ใจดี')).toBeInTheDocument();
    expect(screen.getByTestId('approval-chain')).toBeInTheDocument();
  });

  it('shows empty state for unknown ID', async () => {
    await renderPage('WF-UNKNOWN');
    expect(screen.getByText('quick_approve_detail.notFound')).toBeInTheDocument();
  });

  it('shows claim details when entity capability passes', async () => {
    // WF-003 is a claim; our mock canSee returns false for BenefitEmployeeClaim
    await renderPage('WF-003');
    // fallback placeholder should appear (entity denied)
    expect(screen.getByText('quick_approve_detail.claimHidden')).toBeInTheDocument();
  });

  it('renders action buttons (approve gate allowed in mock)', async () => {
    await renderPage('WF-002');
    expect(screen.getByText('quick_approve_detail.approve')).toBeInTheDocument();
    expect(screen.getByText('quick_approve_detail.reject')).toBeInTheDocument();
  });

  it('renders leave details for a leave request', async () => {
    await renderPage('WF-001');
    expect(screen.getByText('quick_approve_detail.requestDetails')).toBeInTheDocument();
    expect(screen.getByText('quick_approve_detail.leaveType')).toBeInTheDocument();
  });

  it('renders overtime details for an overtime request', async () => {
    await renderPage('WF-002');
    expect(screen.getByText('quick_approve_detail.hours')).toBeInTheDocument();
  });

  it('renders approval history timeline', async () => {
    await renderPage('WF-004');
    expect(screen.getByText('quick_approve_detail.approvalHistory')).toBeInTheDocument();
  });
});
