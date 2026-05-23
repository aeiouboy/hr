import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/components/humi', () => ({
  Avatar: ({ name }: { name: string; src?: string; size?: string }) => <div data-testid="avatar">{name}</div>,
  Capability: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('@/components/quick-approve/UrgencyBadge', () => ({
  UrgencyBadge: ({ urgency }: { urgency: string }) => <span data-testid={`urgency-${urgency}`}>{urgency}</span>,
}));

import { RequestSummary } from '@/components/quick-approve/detail/RequestSummary';
import { MOCK_PENDING_REQUESTS } from '@/components/quick-approve/mock-requests';

describe('RequestSummary requester metadata', () => {
  it('does not repeat department when it is already part of the position label', () => {
    const claimRequest = MOCK_PENDING_REQUESTS.find((request) => request.id === 'WF-2026-004');

    expect(claimRequest).toBeDefined();
    render(<RequestSummary request={claimRequest!} />);

    expect(screen.getByText('HR Specialist')).toBeInTheDocument();
    expect(screen.queryByText('HR')).not.toBeInTheDocument();
  });
});
