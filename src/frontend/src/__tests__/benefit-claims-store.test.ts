import { beforeEach, describe, expect, it } from 'vitest';
import {
  BENEFIT_STATUS_LABEL,
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
      receiptAmount: 1500,
      totalClaimAmount: 1500,
      hospitalName: 'Bangkok Hospital',
      attachments: [{ id: 'a1', filename: 'receipt.pdf', sizeMb: 1 }],
    });

    expect(claim.id).toMatch(/^BEN-CLM-/);
    expect(claim.workflowRequestId).toMatch(/^REQ-BEN-/);
    expect(claim.status).toBe('pending_spd');
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
});
