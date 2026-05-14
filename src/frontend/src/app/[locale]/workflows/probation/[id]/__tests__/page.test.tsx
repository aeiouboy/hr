import '@testing-library/jest-dom/vitest';
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

let routeId = 'PB-001';
let routePath = '/en/workflows/probation/PB-001';

vi.mock('next/navigation', () => ({
  useParams: () => ({ id: routeId }),
  usePathname: () => routePath,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/components/ui/person-hero', () => ({
  PersonHero: ({ name, employeeId }: { name: { en: string; th: string }; employeeId: string }) => (
    <section data-testid="person-hero">
      <h1>{name.en}</h1>
      <p>{employeeId}</p>
    </section>
  ),
}));

vi.mock('@/components/humi', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Capability: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Button: ({
    children,
    disabled,
    loading,
    onClick,
  }: {
    children: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
  }) => (
    <button disabled={disabled || loading} onClick={onClick}>
      {children}
    </button>
  ),
  Modal: ({ open, title, children }: { open: boolean; title?: string; children: React.ReactNode }) =>
    open ? <div role="dialog" aria-label={title}>{children}</div> : null,
}));

import ProbationDetailPage from '../page';

async function renderLoaded(id = 'PB-001', path = `/en/workflows/probation/${id}`) {
  routeId = id;
  routePath = path;
  const view = render(<ProbationDetailPage />);
  await screen.findByTestId('person-hero');
  return view;
}

describe('ProbationDetailPage manager approval UI', () => {
  it('renders employee, org/job, manager request, probation, and assessment context', async () => {
    await renderLoaded('PB-001');

    expect(screen.getByTestId('person-hero')).toHaveTextContent('Somchai Sukjai');
    expect(screen.getByText('Employee org/job context')).toBeInTheDocument();
    expect(screen.getAllByText('Central Group').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Digital & IT').length).toBeGreaterThan(0);
    expect(screen.getByText('Request / manager context')).toBeInTheDocument();
    expect(screen.getByText('PB-001')).toBeInTheDocument();
    expect(screen.getByText('Assessment / reason / remarks')).toBeInTheDocument();
    expect(screen.getByText('Pending manager decision')).toBeInTheDocument();
    expect(screen.getByText(/Employee Central \/ Probation API mappings are TBD/)).toBeInTheDocument();
  });

  it('requires a reject reason before opening confirmation', async () => {
    await renderLoaded('PB-001');

    fireEvent.click(screen.getByText('probation.reject'));

    expect(screen.queryByRole('dialog', { name: 'Confirm probation rejection' })).not.toBeInTheDocument();
    expect(screen.getByText('Manager comment/reason is required before rejecting.')).toBeInTheDocument();
  });

  it('confirms reject, disables through save, and updates to final read-only status', async () => {
    await renderLoaded('PB-001');

    fireEvent.change(screen.getByPlaceholderText('probation.commentPlaceholder'), {
      target: { value: 'Performance goals were not met.' },
    });
    fireEvent.click(screen.getByText('probation.reject'));

    expect(screen.getByRole('dialog', { name: 'Confirm probation rejection' })).toBeInTheDocument();
    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => expect(screen.getByText('Probation rejection/extension recorded.')).toBeInTheDocument());
    expect(screen.getAllByText('ไม่ผ่าน').length).toBeGreaterThan(0);
    expect(screen.queryByText('probation.approve')).not.toBeInTheDocument();
    expect(screen.queryByText('probation.reject')).not.toBeInTheDocument();
  });

  it('hides decision buttons for already completed items', async () => {
    await renderLoaded('PB-003');

    expect(screen.getAllByText('ผ่านทดลองงาน').length).toBeGreaterThan(0);
    expect(screen.queryByText('probation.approve')).not.toBeInTheDocument();
    expect(screen.queryByText('probation.reject')).not.toBeInTheDocument();
  });
});
