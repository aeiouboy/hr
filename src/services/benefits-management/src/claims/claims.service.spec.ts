import { SmartClaimsService } from './claims.service';
import { NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';

const mockPrisma: any = {
  claimRequest: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  },
  oCRResult: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
  policyCheck: {
    createMany: jest.fn(),
    findMany: jest.fn(),
  },
  policyRule: {
    findMany: jest.fn(),
  },
  $transaction: jest.fn((fn: any) => fn(mockPrisma)),
};

const employee = { id: 'user-1', roles: ['employee'], employee_id: 'EMP001' };
const manager = { id: 'user-2', roles: ['manager'], employee_id: 'EMP002' };
const hrManager = { id: 'user-3', roles: ['hr_manager'], employee_id: 'EMP003' };

const baseClaim: Record<string, unknown> = {
  id: 'claim-1',
  employee_id: 'EMP001',
  receipt_id: null,
  category: 'medical',
  amount: 1500.0,
  currency: 'THB',
  description: 'Doctor visit',
  status: 'draft',
  auto_approved: false,
  approved_by: null,
  approved_at: null,
  rejected_by: null,
  rejected_reason: null,
  submitted_at: null,
  ocr_result_id: null,
  created_at: new Date('2026-01-15'),
  updated_at: new Date('2026-01-15'),
};

describe('SmartClaimsService', () => {
  let service: SmartClaimsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new SmartClaimsService(mockPrisma as any);
  });

  // ── Receipt Upload & OCR ──────────────────────────────────────────

  describe('uploadReceipt', () => {
    it('should accept a JPG file under 10MB and store metadata', async () => {
      const file = { originalname: 'receipt.jpg', mimetype: 'image/jpeg', size: 5_000_000, buffer: Buffer.alloc(0) };
      const expected = { id: 'ocr-1', receipt_file_name: 'receipt.jpg', receipt_file_type: 'jpg', receipt_file_size: 5_000_000 };
      mockPrisma.oCRResult.create.mockResolvedValue(expected);

      const result = await service.uploadReceipt('claim-1', file as any, employee as any);
      expect(result.receipt_file_name).toBe('receipt.jpg');
      expect(mockPrisma.oCRResult.create).toHaveBeenCalled();
    });

    it('should accept a PNG file', async () => {
      const file = { originalname: 'receipt.png', mimetype: 'image/png', size: 3_000_000, buffer: Buffer.alloc(0) };
      mockPrisma.oCRResult.create.mockResolvedValue({ id: 'ocr-2', receipt_file_type: 'png' });

      const result = await service.uploadReceipt('claim-1', file as any, employee as any);
      expect(result.receipt_file_type).toBe('png');
    });

    it('should accept a PDF file', async () => {
      const file = { originalname: 'receipt.pdf', mimetype: 'application/pdf', size: 2_000_000, buffer: Buffer.alloc(0) };
      mockPrisma.oCRResult.create.mockResolvedValue({ id: 'ocr-3', receipt_file_type: 'pdf' });

      const result = await service.uploadReceipt('claim-1', file as any, employee as any);
      expect(result.receipt_file_type).toBe('pdf');
    });

    it('should reject files larger than 10MB', async () => {
      const file = { originalname: 'big.jpg', mimetype: 'image/jpeg', size: 11_000_000, buffer: Buffer.alloc(0) };
      await expect(service.uploadReceipt('claim-1', file as any, employee as any)).rejects.toThrow(BadRequestException);
    });

    it('should reject unsupported file formats', async () => {
      const file = { originalname: 'doc.docx', mimetype: 'application/vnd.openxmlformats', size: 1_000_000, buffer: Buffer.alloc(0) };
      await expect(service.uploadReceipt('claim-1', file as any, employee as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('processOCR', () => {
    it('should return OCRResult with vendor, amount, date, category, and confidence_score', async () => {
      const ocrResult = {
        id: 'ocr-1',
        vendor_name: 'Bangkok Hospital',
        amount: 3500.0,
        receipt_date: new Date('2026-01-10'),
        category: 'medical',
        confidence_score: 0.92,
      };
      mockPrisma.oCRResult.findUnique.mockResolvedValue(ocrResult);

      const result = await service.processOCR('ocr-1');
      expect(result.vendor_name).toBe('Bangkok Hospital');
      expect(result.confidence_score).toBeGreaterThanOrEqual(0);
      expect(result.confidence_score).toBeLessThanOrEqual(1);
    });

    it('should auto-populate form when confidence >= 0.8', async () => {
      const ocrResult = { id: 'ocr-1', confidence_score: 0.85, vendor_name: 'Test', amount: 100 };
      mockPrisma.oCRResult.findUnique.mockResolvedValue(ocrResult);

      const result = await service.processOCR('ocr-1');
      expect(result.confidence_score).toBeGreaterThanOrEqual(0.8);
      expect(result.auto_populate).toBe(true);
    });

    it('should return warning when confidence < 0.8', async () => {
      const ocrResult: Record<string, unknown> = { id: 'ocr-1', confidence_score: 0.65, vendor_name: null, amount: null };
      mockPrisma.oCRResult.findUnique.mockResolvedValue(ocrResult);

      const result = await service.processOCR('ocr-1');
      expect(result.confidence_score).toBeLessThan(0.8);
      expect(result.auto_populate).toBe(false);
      expect(result.warning).toBeDefined();
    });
  });

  // ── Policy Validation ─────────────────────────────────────────────

  describe('validateClaim', () => {
    const rules = [
      { id: 'rule-1', name: 'max_single_claim', rule_type: 'hard_limit', condition_field: 'max_amount', condition_value: '5000', is_active: true, category: 'medical' },
      { id: 'rule-2', name: 'monthly_cap', rule_type: 'hard_limit', condition_field: 'monthly_cap', condition_value: '15000', is_active: true, category: null },
      { id: 'rule-3', name: 'receipt_required', rule_type: 'required_document', condition_field: 'required_docs', condition_value: '["receipt"]', is_active: true, category: null },
      { id: 'rule-4', name: 'eligible_categories', rule_type: 'category_restriction', condition_field: 'eligible_categories', condition_value: '["medical","dental","travel","meals"]', is_active: true, category: null },
    ];

    it('should validate claim against max_amount rule and pass', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([rules[0]]);
      const claim = structuredClone({ ...baseClaim, amount: 3000 });

      const results = await service.validateClaim(claim as any);
      expect(results).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ rule_name: 'max_single_claim', passed: true }),
        ]),
      );
    });

    it('should fail validation when amount exceeds max_amount', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([rules[0]]);
      const claim = structuredClone({ ...baseClaim, amount: 6000 });

      const results = await service.validateClaim(claim as any);
      expect(results).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ rule_name: 'max_single_claim', passed: false }),
        ]),
      );
    });

    it('should check monthly_cap including YTD spending', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([rules[1]]);
      mockPrisma.claimRequest.findMany.mockResolvedValue([
        { amount: 10000, status: 'approved' },
      ]);
      const claim = structuredClone({ ...baseClaim, amount: 6000 });

      const results = await service.validateClaim(claim as any);
      expect(results).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ rule_name: 'monthly_cap', passed: false, message: expect.stringContaining('monthly') }),
        ]),
      );
    });

    it('should check required_documents', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([rules[2]]);
      const claim = structuredClone({ ...baseClaim, receipt_id: null });

      const results = await service.validateClaim(claim as any);
      expect(results).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ rule_name: 'receipt_required', passed: false }),
        ]),
      );
    });

    it('should validate eligible_categories', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([rules[3]]);
      const claim = structuredClone({ ...baseClaim, category: 'entertainment' });

      const results = await service.validateClaim(claim as any);
      expect(results).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ rule_name: 'eligible_categories', passed: false }),
        ]),
      );
    });

    it('should distinguish hard rules (block) vs soft rules (warn)', async () => {
      const softRule = { ...rules[0], rule_type: 'soft_warning', name: 'spending_advisory' };
      mockPrisma.policyRule.findMany.mockResolvedValue([softRule]);
      const claim = structuredClone({ ...baseClaim, amount: 6000 });

      const results = await service.validateClaim(claim as any);
      const softResult = results.find((r: any) => r.rule_name === 'spending_advisory');
      expect(softResult?.is_blocking).toBe(false);
    });
  });

  // ── Claim Status Tracking ─────────────────────────────────────────

  describe('createClaim', () => {
    it('should create a claim in Draft status', async () => {
      const expected = structuredClone({ ...baseClaim, status: 'draft' });
      mockPrisma.claimRequest.create.mockResolvedValue(expected);

      const result = await service.createClaim(
        { category: 'medical', amount: 1500, description: 'Doctor visit' },
        employee as any,
      );
      expect(result.status).toBe('draft');
      expect(mockPrisma.claimRequest.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          employee_id: 'EMP001',
          status: 'draft',
          category: 'medical',
          amount: 1500,
        }),
      });
    });
  });

  describe('submitClaim', () => {
    it('should move claim from Draft to Submitted', async () => {
      const draft = structuredClone({ ...baseClaim, status: 'draft' });
      mockPrisma.claimRequest.findUnique.mockResolvedValue(draft);
      mockPrisma.claimRequest.update.mockResolvedValue({ ...draft, status: 'submitted', submitted_at: new Date() });

      const result = await service.submitClaim('claim-1', employee as any);
      expect(result.status).toBe('submitted');
    });

    it('should reject submission of non-draft claims', async () => {
      mockPrisma.claimRequest.findUnique.mockResolvedValue({ ...baseClaim, status: 'approved' });
      await expect(service.submitClaim('claim-1', employee as any)).rejects.toThrow(BadRequestException);
    });

    it('should trigger policy validation on submit', async () => {
      const draft = structuredClone({ ...baseClaim, status: 'draft' });
      mockPrisma.claimRequest.findUnique.mockResolvedValue(draft);
      mockPrisma.policyRule.findMany.mockResolvedValue([]);
      mockPrisma.claimRequest.update.mockResolvedValue({ ...draft, status: 'submitted' });

      await service.submitClaim('claim-1', employee as any);
      expect(mockPrisma.policyRule.findMany).toHaveBeenCalled();
    });
  });

  describe('processClaim', () => {
    it('should move Submitted to Processing', async () => {
      const submitted = structuredClone({ ...baseClaim, status: 'submitted' });
      mockPrisma.claimRequest.findUnique.mockResolvedValue(submitted);
      mockPrisma.claimRequest.update.mockResolvedValue({ ...submitted, status: 'processing' });

      const result = await service.processClaim('claim-1');
      expect(result.status).toBe('processing');
    });
  });

  describe('approveClaim', () => {
    it('should move Processing to Approved with approver info', async () => {
      const processing = structuredClone({ ...baseClaim, status: 'processing' });
      mockPrisma.claimRequest.findUnique.mockResolvedValue(processing);
      mockPrisma.claimRequest.update.mockResolvedValue({
        ...processing,
        status: 'approved',
        approved_by: 'user-2',
        approved_at: new Date(),
      });

      const result = await service.approveClaim('claim-1', manager as any);
      expect(result.status).toBe('approved');
      expect(result.approved_by).toBe('user-2');
    });

    it('should reject approval of non-processing claims', async () => {
      mockPrisma.claimRequest.findUnique.mockResolvedValue({ ...baseClaim, status: 'draft' });
      await expect(service.approveClaim('claim-1', manager as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('rejectClaim', () => {
    it('should move Processing to Rejected with reason', async () => {
      const processing = structuredClone({ ...baseClaim, status: 'processing' });
      mockPrisma.claimRequest.findUnique.mockResolvedValue(processing);
      mockPrisma.claimRequest.update.mockResolvedValue({
        ...processing,
        status: 'rejected',
        rejected_by: 'user-2',
        rejected_reason: 'Missing receipt',
      });

      const result = await service.rejectClaim('claim-1', 'Missing receipt', manager as any);
      expect(result.status).toBe('rejected');
      expect(result.rejected_reason).toBe('Missing receipt');
    });
  });

  describe('auto-approve logic', () => {
    it('should auto-approve when amount <= threshold and all hard rules pass', async () => {
      const submitted = structuredClone({ ...baseClaim, status: 'submitted', amount: 500 });
      mockPrisma.claimRequest.findUnique.mockResolvedValue(submitted);
      mockPrisma.policyRule.findMany.mockResolvedValue([]);
      mockPrisma.claimRequest.update.mockResolvedValue({
        ...submitted,
        status: 'approved',
        auto_approved: true,
      });

      const result = await service.processClaim('claim-1');
      expect(result.status).toBe('approved');
      expect(result.auto_approved).toBe(true);
    });

    it('should route to manager when amount > auto_approve_threshold', async () => {
      const submitted = structuredClone({ ...baseClaim, status: 'submitted', amount: 10000 });
      mockPrisma.claimRequest.findUnique.mockResolvedValue(submitted);
      mockPrisma.policyRule.findMany.mockResolvedValue([]);
      mockPrisma.claimRequest.update.mockResolvedValue({ ...submitted, status: 'processing' });

      const result = await service.processClaim('claim-1');
      expect(result.status).toBe('processing');
      expect(result.auto_approved).toBeFalsy();
    });

    it('should require finance approval when amount > finance_threshold', async () => {
      const submitted = structuredClone({ ...baseClaim, status: 'submitted', amount: 50000 });
      mockPrisma.claimRequest.findUnique.mockResolvedValue(submitted);
      mockPrisma.claimRequest.update.mockResolvedValue({
        ...submitted,
        status: 'processing',
        requires_finance_approval: true,
      });

      const result = await service.processClaim('claim-1');
      expect(result.requires_finance_approval).toBe(true);
    });
  });

  // ── Claim History & Reporting ─────────────────────────────────────

  describe('getClaimHistory', () => {
    it('should return paginated list of claims', async () => {
      mockPrisma.claimRequest.findMany.mockResolvedValue([structuredClone(baseClaim)]);
      mockPrisma.claimRequest.count.mockResolvedValue(1);

      const result = await service.getClaimHistory('EMP001', { page: 1, limit: 10 }, employee as any);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
    });

    it('should filter by status', async () => {
      mockPrisma.claimRequest.findMany.mockResolvedValue([]);
      mockPrisma.claimRequest.count.mockResolvedValue(0);

      await service.getClaimHistory('EMP001', { page: 1, limit: 10, status: 'approved' }, employee as any);
      expect(mockPrisma.claimRequest.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: expect.objectContaining({ status: 'approved' }) }),
      );
    });

    it('should filter by category', async () => {
      mockPrisma.claimRequest.findMany.mockResolvedValue([]);
      mockPrisma.claimRequest.count.mockResolvedValue(0);

      await service.getClaimHistory('EMP001', { page: 1, limit: 10, category: 'medical' }, employee as any);
      expect(mockPrisma.claimRequest.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: expect.objectContaining({ category: 'medical' }) }),
      );
    });

    it('should filter by date range', async () => {
      mockPrisma.claimRequest.findMany.mockResolvedValue([]);
      mockPrisma.claimRequest.count.mockResolvedValue(0);

      await service.getClaimHistory('EMP001', {
        page: 1,
        limit: 10,
        from: '2026-01-01',
        to: '2026-01-31',
      }, employee as any);
      expect(mockPrisma.claimRequest.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            created_at: expect.objectContaining({ gte: expect.any(Date), lte: expect.any(Date) }),
          }),
        }),
      );
    });
  });

  describe('getYTDSpending', () => {
    it('should aggregate spending by category for current year', async () => {
      mockPrisma.claimRequest.findMany.mockResolvedValue([
        { category: 'medical', amount: 3000, status: 'approved' },
        { category: 'medical', amount: 2000, status: 'approved' },
        { category: 'dental', amount: 1500, status: 'approved' },
      ]);

      const result = await service.getYTDSpending('EMP001', employee as any);
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ category: 'medical', total: 5000 }),
          expect.objectContaining({ category: 'dental', total: 1500 }),
        ]),
      );
    });
  });

  describe('getClaimById', () => {
    it('should return a single claim with full audit trail', async () => {
      const claimWithAudit = {
        ...structuredClone(baseClaim),
        policy_checks: [{ rule_name: 'max_amount', passed: true }],
        ocr_result: { vendor_name: 'Test', confidence_score: 0.9 },
      };
      mockPrisma.claimRequest.findUnique.mockResolvedValue(claimWithAudit);

      const result = await service.getClaimById('claim-1', employee as any);
      expect(result.id).toBe('claim-1');
      expect(result.policy_checks).toHaveLength(1);
      expect(result.ocr_result).toBeDefined();
    });

    it('should throw NotFoundException for invalid id', async () => {
      mockPrisma.claimRequest.findUnique.mockResolvedValue(null);
      await expect(service.getClaimById('invalid', employee as any)).rejects.toThrow(NotFoundException);
    });
  });
});
