import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreatePayrollRunDto } from '../../src/payroll/dto/create-payroll-run.dto';
import { UpdatePayrollSettingsDto } from '../../src/payroll/dto/payroll-settings.dto';

describe('CreatePayrollRunDto', () => {
  it('should validate with valid period', async () => {
    const dto = plainToInstance(CreatePayrollRunDto, {
      period: '2026-01',
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail without period', async () => {
    const dto = plainToInstance(CreatePayrollRunDto, {});
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid period format (single digit month)', async () => {
    const dto = plainToInstance(CreatePayrollRunDto, {
      period: '2026-1',
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with non-date period format', async () => {
    const dto = plainToInstance(CreatePayrollRunDto, {
      period: 'invalid',
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should accept optional type field', async () => {
    const dto = plainToInstance(CreatePayrollRunDto, {
      period: '2026-01',
      type: 'bonus',
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
    expect(dto.type).toBe('bonus');
  });

  it('should accept period without type', async () => {
    const dto = plainToInstance(CreatePayrollRunDto, {
      period: '2026-12',
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});

describe('UpdatePayrollSettingsDto', () => {
  it('should validate with valid pay_period', async () => {
    const dto = plainToInstance(UpdatePayrollSettingsDto, {
      pay_period: 'monthly',
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with invalid pay_period', async () => {
    const dto = plainToInstance(UpdatePayrollSettingsDto, {
      pay_period: 'daily',
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should validate payment_day within range (1-31)', async () => {
    const dto = plainToInstance(UpdatePayrollSettingsDto, {
      payment_day: 15,
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with payment_day out of range', async () => {
    const dto = plainToInstance(UpdatePayrollSettingsDto, {
      payment_day: 32,
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should validate pf_default_rate within range (0-15)', async () => {
    const valid = plainToInstance(UpdatePayrollSettingsDto, { pf_default_rate: 10 });
    const invalid = plainToInstance(UpdatePayrollSettingsDto, { pf_default_rate: 20 });
    expect((await validate(valid)).length).toBe(0);
    expect((await validate(invalid)).length).toBeGreaterThan(0);
  });

  it('should allow empty dto (all optional)', async () => {
    const dto = plainToInstance(UpdatePayrollSettingsDto, {});
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
