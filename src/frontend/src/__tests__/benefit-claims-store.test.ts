import { beforeEach, describe, expect, it } from 'vitest';
import {
  BENEFIT_STATUS_LABEL,
  projectBenefitClaimToRequest,
  useBenefitClaimsStore,
  validateBenefitAttachments,
  validateBenefitClaimInput,
  type BenefitClaimSubmitInput,
} from '@/stores/benefit-claims';

const baseInput: BenefitClaimSubmitInput = {
  employeeId: 'EMP001',
  employeeName: 'จงรักษ์ ทานากะ',
  company: 'Central Group',
  businessUnit: 'Head Office',
  employeeGroup: 'Monthly Staff',
  personalGrade: 'PG4',
  benefitCode: 'MED-OPD',
  benefitName: 'Medical reimbursement',
  claimType: 'medical',
  receiptNo: 'RX-3381',
  receiptDate: '2026-04-15',
  receiptAmount: 4820,
  claimAmount: 4820,
  remainingAmount: 25600,
  hospitalType: 'private',
  hospitalName: 'BNH Hospital',
  opdIpd: 'OPD',
  patientTransferDocument: 'PT-1',
  diseaseDetails: 'ไข้หวัด',
  attachments: [{ id: 'att-1', filename: 'receipt.pdf', mimeType: 'application/pdf', size: 200_000 }],
};

describe('benefit claim store', () => {
  beforeEach(() => {
    localStorage.clear();
    useBenefitClaimsStore.getState().clear();
  });

  it('creates a benefit claim with workflow request projection and audit trail', () => {
    const id = useBenefitClaimsStore.getState().submitClaim(baseInput);
    const claim = useBenefitClaimsStore.getState().claims.find((item) => item.id === id)!;

    expect(claim.workflowRequestId).toMatch(/^REQ-BEN-/);
    expect(claim.status).toBe('pending_spd');
    expect(claim.audit[0]).toMatchObject({ action: 'submit', actorRole: 'employee' });

    const projected = projectBenefitClaimToRequest(claim);
    expect(projected.id).toBe(claim.workflowRequestId);
    expect(projected.type).toContain('เบิกสวัสดิการ');
    expect(projected.status).toBe('pending');
  });

  it('persists approve, reject, send-back labels and duplicate receipt detection', () => {
    const id = useBenefitClaimsStore.getState().submitClaim(baseInput);

    expect(useBenefitClaimsStore.getState().duplicateReceiptExists({ employeeId: 'EMP001', benefitCode: 'MED-OPD', receiptNo: 'rx-3381' })).toBe(true);
    expect(BENEFIT_STATUS_LABEL.send_back).toBe('ส่งกลับให้แก้ไข');

    useBenefitClaimsStore.getState().sendBack(id, { name: 'SPD Benefits' }, 'แนบเอกสารเพิ่ม');
    let claim = useBenefitClaimsStore.getState().claims[0];
    expect(claim.status).toBe('send_back');
    expect(claim.audit.at(-1)?.action).toBe('send_back');

    useBenefitClaimsStore.getState().resubmitCorrection(id, { receiptNo: 'RX-3381-A' });
    claim = useBenefitClaimsStore.getState().claims[0];
    expect(claim.status).toBe('pending_spd');
    expect(claim.previousVersions).toHaveLength(1);

    useBenefitClaimsStore.getState().approve(id, { name: 'SPD Benefits' });
    expect(useBenefitClaimsStore.getState().claims[0].status).toBe('approved');
  });

  it('validates workbook-required medical fields and attachment rules', () => {
    expect(validateBenefitClaimInput({ ...baseInput, hospitalName: '', attachments: [] })).toEqual(
      expect.arrayContaining(['กรุณากรอกชื่อสถานพยาบาล', 'กรุณาแนบเอกสารค่ารักษาอย่างน้อย 1 ไฟล์']),
    );

    expect(validateBenefitAttachments([
      { id: 'bad', filename: 'script.exe', mimeType: 'application/octet-stream', size: 1 },
      { id: 'big', filename: 'large.pdf', mimeType: 'application/pdf', size: 11 * 1024 * 1024 },
    ])).toEqual(expect.arrayContaining(['ไม่รองรับไฟล์ .exe', 'large.pdf มีขนาดเกิน 10 MB']));
  });
});
