import { describe, expect, it } from 'vitest';
import {
  mergeBenefitInboxRows,
  pendingTaskToInboxRow,
} from '@/components/workflow/benefitInboxMerge';
import type { BenefitClaimRequest } from '@/stores/benefit-claims';
import type { PendingTaskSummary } from '@/lib/workflow-api';

function makeMockClaim(id: string): BenefitClaimRequest {
  return {
    id,
    workflowRequestId: `REQ-${id}`,
    employeeId: 'EMP001',
    employeeName: 'จงรักษ์ ทานากะ',
    company: 'Central Group',
    businessUnit: 'People Operations',
    employeeGroup: 'Monthly',
    personalGrade: 'PG4',
    benefitType: 'medical',
    benefitCode: 'BEN-MED-OPD',
    benefitName: 'ค่ารักษาพยาบาล',
    remainingAmount: 18000,
    currency: 'THB',
    receiptNo: 'RCPT-1',
    receiptDate: '2026-04-15',
    receiptAmount: 1000,
    totalClaimAmount: 1000,
    status: 'pending_spd',
    submittedAt: '2026-04-15T09:20:00.000Z',
    updatedAt: '2026-04-15T09:20:00.000Z',
    attachments: [],
    audit: [],
    version: 1,
    previousVersions: [],
    workflowInstanceId: null,
    workflowStatus: 'pending',
  };
}

function makeCamundaTask(id: string): PendingTaskSummary {
  return {
    id,
    name: 'Approve benefit request',
    created: '2026-05-04T09:00:00.000Z',
    assignee: 'mgr-default',
    instanceId: `pi-${id}`,
    processDefinitionKey: 'benefit-request',
    variables: {
      requesterId: 'emp-042',
      managerId: 'mgr-default',
      benefitType: 'medical-reimbursement',
      amount: 3000,
      description: 'Dentist visit',
    },
  };
}

describe('benefitInboxMerge', () => {
  it('pendingTaskToInboxRow tags the row with source=camunda and a stable key', () => {
    const row = pendingTaskToInboxRow(makeCamundaTask('task-1'));
    expect(row.source).toBe('camunda');
    expect(row.key).toBe('camunda:task-1');
    if (row.source === 'camunda') {
      expect(row.task.id).toBe('task-1');
    }
  });

  it('mergeBenefitInboxRows combines both sources, surfaces Camunda first, and tags discriminator', () => {
    const rows = mergeBenefitInboxRows(
      [makeMockClaim('BEN-CLM-0001'), makeMockClaim('BEN-CLM-0002')],
      [makeCamundaTask('task-1')],
    );

    expect(rows).toHaveLength(3);
    expect(rows[0].source).toBe('camunda');
    expect(rows[1].source).toBe('mock');
    expect(rows[2].source).toBe('mock');
    // Stable, source-prefixed keys prevent collisions when a Camunda task and
    // a mock claim happen to share an id.
    expect(rows.map((r) => r.key)).toEqual([
      'camunda:task-1',
      'mock:BEN-CLM-0001',
      'mock:BEN-CLM-0002',
    ]);
  });

  it('mergeBenefitInboxRows returns an empty array when both sources are empty', () => {
    expect(mergeBenefitInboxRows([], [])).toEqual([]);
  });

  it('mergeBenefitInboxRows dedupes a mock claim whose workflowInstanceId matches a Camunda task', () => {
    const linkedMock: BenefitClaimRequest = { ...makeMockClaim('BEN-CLM-LINK'), workflowInstanceId: 'pi-task-1' };
    const unlinkedMock = makeMockClaim('BEN-CLM-UNLINK');
    const rows = mergeBenefitInboxRows(
      [linkedMock, unlinkedMock],
      [makeCamundaTask('task-1')],
    );
    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({ source: 'camunda', key: 'camunda:task-1' });
    expect(rows[1]).toMatchObject({ source: 'mock', key: 'mock:BEN-CLM-UNLINK' });
  });
});
