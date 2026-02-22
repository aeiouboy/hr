import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateClaimDto } from '../../src/claims/dto/create-claim.dto';
import { SubmitClaimDto } from '../../src/claims/dto/submit-claim.dto';
import { ApproveClaimDto } from '../../src/claims/dto/approve-claim.dto';
import { RejectClaimDto } from '../../src/claims/dto/reject-claim.dto';
import { UpdateClaimDto } from '../../src/claims/dto/update-claim.dto';
import { CreatePolicyRuleDto } from '../../src/policy/dto/create-policy-rule.dto';
import { UpdatePolicyRuleDto } from '../../src/policy/dto/update-policy-rule.dto';
import { UpdateOcrResultDto } from '../../src/ocr/dto/update-ocr-result.dto';

describe('Smart Claims DTOs', () => {
  // ── CreateClaimDto ───────────────────────────────────────────

  describe('CreateClaimDto', () => {
    it('should validate a valid claim', async () => {
      const dto = plainToInstance(CreateClaimDto, {
        claim_type: 'medical',
        amount: 1500,
        receipt_date: '2026-02-20',
        receipt_url: 's3://bucket/receipt.jpg',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should reject missing claim_type', async () => {
      const dto = plainToInstance(CreateClaimDto, {
        amount: 1500,
        receipt_date: '2026-02-20',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'claim_type')).toBe(true);
    });

    it('should reject missing amount', async () => {
      const dto = plainToInstance(CreateClaimDto, {
        claim_type: 'medical',
        receipt_date: '2026-02-20',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'amount')).toBe(true);
    });

    it('should reject negative amount', async () => {
      const dto = plainToInstance(CreateClaimDto, {
        claim_type: 'medical',
        amount: -100,
        receipt_date: '2026-02-20',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should reject missing receipt_date', async () => {
      const dto = plainToInstance(CreateClaimDto, {
        claim_type: 'medical',
        amount: 1500,
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'receipt_date')).toBe(true);
    });

    it('should reject invalid claim_type', async () => {
      const dto = plainToInstance(CreateClaimDto, {
        claim_type: 'invalid',
        amount: 1500,
        receipt_date: '2026-02-20',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should accept valid claim types: medical, travel, meal, equipment, other', async () => {
      for (const type of ['medical', 'travel', 'meal', 'equipment', 'other']) {
        const dto = plainToInstance(CreateClaimDto, {
          claim_type: type,
          amount: 100,
          receipt_date: '2026-02-20',
        });

        const errors = await validate(dto);
        expect(errors).toHaveLength(0);
      }
    });
  });

  // ── RejectClaimDto ───────────────────────────────────────────

  describe('RejectClaimDto', () => {
    it('should validate with reason', async () => {
      const dto = plainToInstance(RejectClaimDto, {
        reason: 'Invalid receipt',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should reject missing reason', async () => {
      const dto = plainToInstance(RejectClaimDto, {});

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'reason')).toBe(true);
    });

    it('should reject empty reason', async () => {
      const dto = plainToInstance(RejectClaimDto, { reason: '' });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  // ── ApproveClaimDto ──────────────────────────────────────────

  describe('ApproveClaimDto', () => {
    it('should validate with optional comments', async () => {
      const dto = plainToInstance(ApproveClaimDto, {
        comments: 'Looks good',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should validate without comments', async () => {
      const dto = plainToInstance(ApproveClaimDto, {});

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });
  });

  // ── UpdateClaimDto ───────────────────────────────────────────

  describe('UpdateClaimDto', () => {
    it('should validate partial update with amount only', async () => {
      const dto = plainToInstance(UpdateClaimDto, {
        amount: 2000,
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should validate partial update with receipt_url only', async () => {
      const dto = plainToInstance(UpdateClaimDto, {
        receipt_url: 's3://bucket/new-receipt.jpg',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should reject negative amount in update', async () => {
      const dto = plainToInstance(UpdateClaimDto, {
        amount: -500,
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  // ── CreatePolicyRuleDto ──────────────────────────────────────

  describe('CreatePolicyRuleDto', () => {
    it('should validate a complete policy rule', async () => {
      const dto = plainToInstance(CreatePolicyRuleDto, {
        rule_name: 'Medical Policy',
        claim_type: 'medical',
        max_amount: 5000,
        max_amount_per_month: 15000,
        requires_receipt: true,
        effective_from: '2026-01-01',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should reject missing rule_name', async () => {
      const dto = plainToInstance(CreatePolicyRuleDto, {
        claim_type: 'medical',
        max_amount: 5000,
        max_amount_per_month: 15000,
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should reject missing max_amount', async () => {
      const dto = plainToInstance(CreatePolicyRuleDto, {
        rule_name: 'Medical Policy',
        claim_type: 'medical',
        max_amount_per_month: 15000,
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should accept optional auto_approve_threshold', async () => {
      const dto = plainToInstance(CreatePolicyRuleDto, {
        rule_name: 'Medical Policy',
        claim_type: 'medical',
        max_amount: 5000,
        max_amount_per_month: 15000,
        auto_approve_threshold: 1000,
        effective_from: '2026-01-01',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });
  });

  // ── UpdateOcrResultDto ───────────────────────────────────────

  describe('UpdateOcrResultDto', () => {
    it('should validate override of extracted_amount', async () => {
      const dto = plainToInstance(UpdateOcrResultDto, {
        extracted_amount: 1600,
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should validate override of extracted_merchant', async () => {
      const dto = plainToInstance(UpdateOcrResultDto, {
        extracted_merchant: 'Bangkok Hospital',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should validate override of extracted_date', async () => {
      const dto = plainToInstance(UpdateOcrResultDto, {
        extracted_date: '2026-02-21',
      });

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });
  });
});
