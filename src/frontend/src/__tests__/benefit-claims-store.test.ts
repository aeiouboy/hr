import { beforeEach, describe, expect, it } from 'vitest';
import {
  BENEFIT_CLAIMS_PERSIST_VERSION,
  BENEFIT_STATUS_LABEL,
  migrateBenefitClaimsPersistedState,
  selectBenefitRequestSummaries,
  useBenefitClaimsStore,
  validateBenefitAttachmentRules,
} from '@/stores/benefit-claims';

describe('benefit claim store', () => {
  beforeEach(() => {
    localStorage.clear();
    useBenefitClaimsStore.setState({ claims: [] });
  });

  it('creates a benefit claim aggregate and projects it into request tracking', () => {
    const claim = useBenefitClaimsStore.getState().submitClaim({
      benefitType: 'medical',
      receiptNo: 'RCPT-001',
      receiptDate: '2026-04-29',
      claimDate: '2026-04-28',
      receiptAmount: 1500,
      totalClaimAmount: 1500,
      remark: 'OPD follow-up',
      hospitalName: 'Bangkok Hospital',
      attachments: [{ id: 'a1', filename: 'receipt.pdf', sizeMb: 1 }],
    });

    expect(claim.id).toMatch(/^BEN-CLM-/);
    expect(claim.workflowRequestId).toMatch(/^REQ-BEN-/);
    expect(claim.status).toBe('pending_spd');
    expect(claim.claimDate).toBe('2026-04-28');
    expect(claim.remark).toBe('OPD follow-up');
    expect(claim.audit).toHaveLength(1);

    const [row] = selectBenefitRequestSummaries(useBenefitClaimsStore.getState().claims);
    expect(row.id).toBe(claim.workflowRequestId);
    expect(row.type).toContain('เบิกสวัสดิการ');
    expect(row.sub).toContain('RCPT-001');
    expect(row.status).toBe('pending');
  });

  it('tracks approve, reject, and send-back audit history with Thai labels', () => {
    const claim = useBenefitClaimsStore.getState().submitClaim({
      benefitType: 'gasoline',
      receiptNo: 'FUEL-001',
      receiptDate: '2026-04-29',
      receiptAmount: 800,
      totalClaimAmount: 800,
      gasolineClaimType: 'actual',
    });

    useBenefitClaimsStore.getState().sendBackClaim(claim.id, { role: 'spd', name: 'SPD' }, 'แก้ไขเลขที่ใบเสร็จ');
    expect(useBenefitClaimsStore.getState().claims[0].status).toBe('send_back');
    expect(BENEFIT_STATUS_LABEL.send_back).toBe('ส่งกลับให้แก้ไข');

    useBenefitClaimsStore.getState().resubmitClaim(claim.id, { receiptNo: 'FUEL-002' });
    useBenefitClaimsStore.getState().approveClaim(claim.id, { role: 'spd', name: 'SPD' });

    const updated = useBenefitClaimsStore.getState().claims[0];
    expect(updated.status).toBe('approved');
    expect(updated.previousVersions).toHaveLength(1);
    expect(updated.previousVersions[0]).toMatchObject({
      receiptNo: 'FUEL-001',
      claimDate: '2026-04-29',
      remark: '',
    });
    expect(updated.audit.map((entry) => entry.action)).toEqual(['submit', 'send_back', 'resubmit', 'approve']);
  });

  it('detects duplicate receipts and validates attachment rules', () => {
    useBenefitClaimsStore.getState().submitClaim({
      benefitType: 'mobile',
      receiptNo: 'MOB-001',
      receiptDate: '2026-04-29',
      receiptAmount: 500,
      totalClaimAmount: 500,
    });

    expect(useBenefitClaimsStore.getState().hasDuplicateReceipt('EMP001', 'BEN-MOBILE', 'MOB-001')).toBe(true);
    expect(validateBenefitAttachmentRules({ benefitType: 'medical', attachments: [] })).toContain('ค่ารักษาพยาบาลต้องแนบเอกสารอย่างน้อย 1 ไฟล์');
    expect(validateBenefitAttachmentRules({ benefitType: 'mobile', attachments: [{ id: 'x', filename: 'receipt.exe', sizeMb: 11 }] })).toEqual([
      'ชนิดไฟล์ไม่รองรับ: receipt.exe',
      'ไฟล์เกิน 10 MB: receipt.exe',
    ]);
  });

  it('provides a persist migration for stored benefit-claims snapshots', () => {
    expect(BENEFIT_CLAIMS_PERSIST_VERSION).toBe(2);

    const migrated = migrateBenefitClaimsPersistedState({ claims: [] });
    expect(migrated.claims).toEqual([]);

    const receiptDateFallback = migrateBenefitClaimsPersistedState({
      claims: [{
        id: 'old-claim-1',
        workflowRequestId: 'REQ-OLD-1',
        employeeId: 'EMP001',
        employeeName: 'จงรักษ์ ทานากะ',
        company: 'Central Group',
        businessUnit: 'People Operations',
        employeeGroup: 'Monthly',
        personalGrade: 'PG4',
        benefitType: 'medical',
        benefitCode: 'BEN-MED-OPD',
        benefitName: 'ค่ารักษาพยาบาล',
        remainingAmount: 1000,
        currency: 'THB',
        receiptNo: 'OLD-001',
        receiptDate: '2026-03-03',
        receiptAmount: 100,
        totalClaimAmount: 100,
        status: 'pending_spd',
        submittedAt: '2026-03-04T02:00:00.000Z',
        updatedAt: '2026-03-04T02:00:00.000Z',
        attachments: [],
        audit: [],
        version: 1,
        previousVersions: [{ receiptNo: 'OLD-000', receiptAmount: 90, totalClaimAmount: 90, updatedAt: '2026-03-02T02:00:00.000Z', version: 1 }],
      }],
    });
    expect(receiptDateFallback.claims?.[0]).toMatchObject({
      claimDate: '2026-03-03',
      remark: '',
      previousVersions: [{ claimDate: '2026-03-03', remark: '' }],
    });

    const submittedAtFallback = migrateBenefitClaimsPersistedState({
      claims: [{
        id: 'old-claim-2',
        workflowRequestId: 'REQ-OLD-2',
        employeeId: 'EMP001',
        employeeName: 'จงรักษ์ ทานากะ',
        company: 'Central Group',
        businessUnit: 'People Operations',
        employeeGroup: 'Monthly',
        personalGrade: 'PG4',
        benefitType: 'medical',
        benefitCode: 'BEN-MED-OPD',
        benefitName: 'ค่ารักษาพยาบาล',
        remainingAmount: 1000,
        currency: 'THB',
        receiptNo: 'OLD-002',
        receiptDate: '',
        receiptAmount: 100,
        totalClaimAmount: 100,
        claimDate: '2026-03-05',
        remark: 'preserve me',
        status: 'pending_spd',
        submittedAt: '2026-03-06T02:00:00.000Z',
        updatedAt: '2026-03-06T02:00:00.000Z',
        attachments: [],
        audit: [],
        version: 1,
        previousVersions: [{ receiptNo: 'OLD-001', receiptAmount: 90, totalClaimAmount: 90, claimDate: '2026-03-04', remark: 'old note', updatedAt: '2026-03-05T02:00:00.000Z', version: 1 }],
      }, {
        id: 'old-claim-3',
        workflowRequestId: 'REQ-OLD-3',
        employeeId: 'EMP001',
        employeeName: 'จงรักษ์ ทานากะ',
        company: 'Central Group',
        businessUnit: 'People Operations',
        employeeGroup: 'Monthly',
        personalGrade: 'PG4',
        benefitType: 'medical',
        benefitCode: 'BEN-MED-OPD',
        benefitName: 'ค่ารักษาพยาบาล',
        remainingAmount: 1000,
        currency: 'THB',
        receiptNo: 'OLD-003',
        receiptDate: '',
        receiptAmount: 100,
        totalClaimAmount: 100,
        status: 'pending_spd',
        submittedAt: '2026-03-07T02:00:00.000Z',
        updatedAt: '2026-03-07T02:00:00.000Z',
        attachments: [],
        audit: [],
        version: 1,
        previousVersions: [],
      }],
    });
    expect(submittedAtFallback.claims?.[0].claimDate).toBe('2026-03-05');
    expect(submittedAtFallback.claims?.[0].remark).toBe('preserve me');
    expect(submittedAtFallback.claims?.[0].previousVersions[0]).toMatchObject({ claimDate: '2026-03-04', remark: 'old note' });
    expect(submittedAtFallback.claims?.[1].claimDate).toBe('2026-03-07');

    const fallback = migrateBenefitClaimsPersistedState({ stale: true });
    expect(fallback.claims?.length).toBeGreaterThan(0);
  });
});
