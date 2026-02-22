import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateShiftDto } from '../../src/shift/dto/create-shift.dto';
import { UpdateShiftDto } from '../../src/shift/dto/update-shift.dto';
import { RecordAttendanceDto } from '../../src/attendance/dto/record-attendance.dto';
import { SubmitOtDto } from '../../src/overtime/dto/submit-ot.dto';

describe('CreateShiftDto', () => {
  it('should validate with valid data', async () => {
    const dto = plainToInstance(CreateShiftDto, {
      code: 'DAY',
      name_en: 'Day Shift',
      start_time: '08:00',
      end_time: '17:00',
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail without code', async () => {
    const dto = plainToInstance(CreateShiftDto, {
      name_en: 'Day Shift',
      start_time: '08:00',
      end_time: '17:00',
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid time format', async () => {
    const dto = plainToInstance(CreateShiftDto, {
      code: 'DAY',
      name_en: 'Day Shift',
      start_time: '8:00',
      end_time: '17:00',
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});

describe('RecordAttendanceDto', () => {
  it('should validate with valid data', async () => {
    const dto = plainToInstance(RecordAttendanceDto, {
      employee_id: 'EMP001',
      date: '2026-02-20',
      actual_check_in: '08:00',
      actual_check_out: '17:00',
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail without employee_id', async () => {
    const dto = plainToInstance(RecordAttendanceDto, {
      date: '2026-02-20',
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});

describe('SubmitOtDto', () => {
  it('should validate with valid data', async () => {
    const dto = plainToInstance(SubmitOtDto, {
      employee_id: 'EMP001',
      date: '2026-02-20',
      day_type: 'weekday',
      start_time: '18:00',
      end_time: '20:00',
      hours: 2,
      ot_type: 'weekday',
      hourly_rate: 200,
      reason: 'Project deadline',
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail without reason', async () => {
    const dto = plainToInstance(SubmitOtDto, {
      employee_id: 'EMP001',
      date: '2026-02-20',
      day_type: 'weekday',
      start_time: '18:00',
      end_time: '20:00',
      hours: 2,
      ot_type: 'weekday',
      hourly_rate: 200,
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail with invalid time format', async () => {
    const dto = plainToInstance(SubmitOtDto, {
      employee_id: 'EMP001',
      date: '2026-02-20',
      day_type: 'weekday',
      start_time: '6pm',
      end_time: '20:00',
      hours: 2,
      ot_type: 'weekday',
      hourly_rate: 200,
      reason: 'test',
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});

describe('UpdateShiftDto', () => {
  it('should allow empty dto (all optional)', async () => {
    const dto = plainToInstance(UpdateShiftDto, {});
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate optional fields', async () => {
    const dto = plainToInstance(UpdateShiftDto, {
      name_en: 'Updated Shift',
      is_active: false,
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
