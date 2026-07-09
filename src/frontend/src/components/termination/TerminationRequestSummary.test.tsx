import '@testing-library/jest-dom/vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { TerminationRequestSummary } from './TerminationRequestSummary';
import type { TerminationRequest } from '@/stores/termination-approvals';

const FULL_REQUEST: TerminationRequest = {
  id: 'TR-FULL',
  employeeId: 'EMP-4001',
  employeeName: 'Pim S.',
  requestedLastDay: '2026-08-31',
  terminationDate: '2026-09-01',
  reasonCode: 'TERM_TRANS',
  voluntary: 'involuntary',
  reasonForTermination: 'Transfer to BG',
  transferOutTo: 'RIS',
  okToRehire: true,
  additionalInfo: 'Transfer confirmed with receiving company',
  personalEmail: 'pim@example.com',
  attachments: [
    {
      id: 'ATT-1',
      name: 'transfer-confirmation.pdf',
      size: 44_000,
      type: 'application/pdf',
    },
  ],
  status: 'pending_spd',
  submittedAt: '2026-07-01T01:00:00.000Z',
  submittedBy: { id: 'HR-1', name: 'HR Admin', role: 'hr' },
  sourceRoute: 'admin',
  audit: [],
};

const ESS_REQUEST: TerminationRequest = {
  id: 'TR-SPARSE',
  employeeId: 'EMP-4002',
  employeeName: 'Narin S.',
  requestedLastDay: '2026-08-15',
  terminationDate: '2026-08-16',
  reasonCode: 'TERM_RESIGN',
  reasonText: 'New role',
  voluntary: 'voluntary',
  additionalInfo: 'Please send documents to personal email',
  personalEmail: 'narin@example.com',
  status: 'pending_manager',
  submittedAt: '2026-07-01T01:00:00.000Z',
  submittedBy: { id: 'EMP-4002', name: 'Narin S.', role: 'employee' },
  sourceRoute: 'ess',
  audit: [],
};

describe('TerminationRequestSummary', () => {
  it('renders a full admin record with all 10 rows', async () => {
    render(<TerminationRequestSummary request={FULL_REQUEST} locale="en" />);

    const rows = screen.getAllByRole('term');
    expect(rows).toHaveLength(10);
    expect(screen.getByText('Termination Reason')).toBeInTheDocument();
    expect(screen.getByText('เหตุผลการสิ้นสุดสภาพ')).toBeInTheDocument();
    expect(screen.getByText('Involuntary')).toBeInTheDocument();
    expect(screen.getByText('RIS')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('transfer-confirmation.pdf')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /transfer-confirmation.pdf/i }));
    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByText('Sample document')).toBeInTheDocument();
  });

  // BA feedback (STA-264): every request renders the FULL 10-field list —
  // sparse ESS records show "—" for the fields they did not submit.
  it('renders all 10 rows for a sparse ESS record with — placeholders', () => {
    render(<TerminationRequestSummary request={ESS_REQUEST} locale="en" />);

    expect(screen.getAllByRole('term')).toHaveLength(10);
    expect(screen.getByText('Resigned Date')).toBeInTheDocument();
    expect(screen.getByText('วันที่ทำงานวันสุดท้าย')).toBeInTheDocument();
    expect(screen.getByText('Voluntary')).toBeInTheDocument();
    expect(screen.getByText('Transfer out to')).toBeInTheDocument();
    expect(screen.getByText('OK to Rehire')).toBeInTheDocument();
    expect(screen.getByText('Attachments')).toBeInTheDocument();
    expect(screen.getAllByText('—').length).toBeGreaterThanOrEqual(3);
  });

  it('renders Thai-first labels when locale is th', () => {
    render(<TerminationRequestSummary request={ESS_REQUEST} locale="th" />);

    expect(screen.getByText('วันที่สิ้นสุดสภาพ')).toBeInTheDocument();
    expect(screen.getByText('Termination date')).toBeInTheDocument();
    expect(screen.getByText('สมัครใจ')).toBeInTheDocument();
  });
});
