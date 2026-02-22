import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreatePlanDto } from '../../src/plan/dto/create-plan.dto';
import { EnrollDto } from '../../src/enrollment/dto/enroll.dto';
import { SubmitClaimDto } from '../../src/claim/dto/submit-claim.dto';
import { AddDependentDto } from '../../src/enrollment/dto/add-dependent.dto';

describe('CreatePlanDto', () => {
  it('should validate with all required fields', async () => {
    const dto = plainToInstance(CreatePlanDto, {
      code: 'HEALTH-001',
      name_en: 'Health Insurance',
      category: 'health',
      effective_date: '2026-01-01',
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail without required code', async () => {
    const dto = plainToInstance(CreatePlanDto, {
      name_en: 'Health Insurance',
      category: 'health',
      effective_date: '2026-01-01',
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid category', async () => {
    const dto = plainToInstance(CreatePlanDto, {
      code: 'INV-001',
      name_en: 'Invalid',
      category: 'invalid_category',
      effective_date: '2026-01-01',
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});

describe('EnrollDto', () => {
  it('should validate with valid data', async () => {
    const dto = plainToInstance(EnrollDto, {
      employee_id: 'EMP001',
      plan_id: 'plan-1',
      coverage_level: 'individual',
      effective_date: '2026-01-01',
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with invalid coverage level', async () => {
    const dto = plainToInstance(EnrollDto, {
      employee_id: 'EMP001',
      plan_id: 'plan-1',
      coverage_level: 'invalid_level',
      effective_date: '2026-01-01',
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});

describe('SubmitClaimDto', () => {
  it('should validate with valid data', async () => {
    const dto = plainToInstance(SubmitClaimDto, {
      plan_id: 'plan-1',
      claim_type: 'medical',
      amount: 5000,
      receipt_date: '2026-01-15',
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with invalid claim type', async () => {
    const dto = plainToInstance(SubmitClaimDto, {
      plan_id: 'plan-1',
      claim_type: 'invalid_type',
      amount: 5000,
      receipt_date: '2026-01-15',
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail without amount', async () => {
    const dto = plainToInstance(SubmitClaimDto, {
      plan_id: 'plan-1',
      claim_type: 'medical',
      receipt_date: '2026-01-15',
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});

describe('AddDependentDto', () => {
  it('should validate with valid data', async () => {
    const dto = plainToInstance(AddDependentDto, {
      name: 'Jane Doe',
      relationship: 'spouse',
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with invalid relationship', async () => {
    const dto = plainToInstance(AddDependentDto, {
      name: 'Jane Doe',
      relationship: 'friend',
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
