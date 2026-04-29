import { beforeEach, describe, expect, it } from 'vitest';
import {
  BENEFIT_CLAIM_STATUS_LABEL,
  useBenefitClaimsStore,
  validateBenefitAttachments,
  type BenefitClaimDraftInput,
} from '@/stores/benefit-claims';

const baseClaim: BenefitClaimDraftInput = {
  employeeId: 'EMP001',
  employeeName: 'จงรักษ์ ทานากะ',
  company: 'Central Group',
  businessUnit: 'Retail HR',
  employeeGroup: 'Monthly-paid',
  personalGrade: 'PG4',
  benefitType: 'medical',
  benefitCode: 'MED-OPD',
  benefitName: 'Medical reimbursement',
  remainingAmount: 18000,
  receiptNo: 'RC-001',
  receiptDate: '2026-04-29',
  receiptAmount: 1200,
  claimAmount: 1200,
  hospitalType: 'OPD',
  hospitalName: 'Bangkok Hospital',
  patientTransferDocument: 'TR-001',
  diseaseDetails: 'ไข้หวัด',
  attachments: [{ id: 'att-1', name: 'receipt.pdf', extension: '.pdf', sizeMb: 1 }],
};

describe('benefit claim store', () => {
  beforeEach(() => {
    localStorage.clear();
    useBenefitClaimsStore.setState({ claims: [] });
  });

  it('creates benefit and workflow IDs, audit, Thai status labels and request projection', () => {
    const claim = useBenefitClaimsStore.getState().submitClaim(baseClaim);

    expect(claim.id).toBe('BEN-0001');
    expect(claim.workflowRequestId).toBe('REQ-BEN-0001');
    expect(claim.status).toBe('pending_spd');
    expect(claim.audit[0]).toMatchObject({ action: 'submitted' });
    expect(BENEFIT_CLAIM_STATUS_LABEL.pending_spd).toBe('รอ SPD อนุมัติ');

    const projection = useBenefitClaimsStore.getState().requestProjections()[0];
    expect(projection).toMatchObject({ id: 'REQ-BEN-0001', status: 'pending', rawStatus: 'pending_spd' });
    expect(projection.sub).toContain('RC-001');
  });

  it('detects duplicate receipts per employee and benefit code', () => {
    useBenefitClaimsStore.getState().submitClaim(baseClaim);

    expect(useBenefitClaimsStore.getState().findDuplicateReceipt('EMP001', 'MED-OPD', 'RC-001')).toBeTruthy();
    expect(useBenefitClaimsStore.getState().findDuplicateReceipt('EMP002', 'MED-OPD', 'RC-001')).toBeFalsy();
  });

  it('records approve, reject and send-back audit transitions', () => {
    const first = useBenefitClaimsStore.getState().submitClaim(baseClaim);
    const second = useBenefitClaimsStore.getState().submitClaim({ ...baseClaim, receiptNo: 'RC-002' });
    const third = useBenefitClaimsStore.getState().submitClaim({ ...baseClaim, receiptNo: 'RC-003' });

    useBenefitClaimsStore.getState().approveClaim(first.id, 'ok');
    useBenefitClaimsStore.getState().rejectClaim(second.id, 'invalid');
    useBenefitClaimsStore.getState().sendBackClaim(third.id, 'missing hospital');

    const claims = useBenefitClaimsStore.getState().claims;
    expect(claims.find((claim) => claim.id === first.id)?.status).toBe('approved');
    expect(claims.find((claim) => claim.id === second.id)?.status).toBe('rejected');
    expect(claims.find((claim) => claim.id === third.id)?.status).toBe('send_back');
    expect(claims.find((claim) => claim.id === third.id)?.audit.at(-1)).toMatchObject({ action: 'send_back', note: 'missing hospital' });
  });

  it('validates supported attachment extensions, size and max count', () => {
    expect(validateBenefitAttachments([{ id: '1', name: 'receipt.xlsx', extension: '.xlsx', sizeMb: 10 }])).toBeNull();
    expect(validateBenefitAttachments([{ id: '1', name: 'script.exe', extension: '.exe', sizeMb: 1 }])).toContain('รองรับเฉพาะ');
    expect(validateBenefitAttachments([{ id: '1', name: 'large.pdf', extension: '.pdf', sizeMb: 11 }])).toContain('รองรับเฉพาะ');
    expect(validateBenefitAttachments(Array.from({ length: 6 }, (_, index) => ({ id: String(index), name: `${index}.pdf`, extension: '.pdf', sizeMb: 1 })))).toContain('สูงสุด 5 ไฟล์');
  });
});
