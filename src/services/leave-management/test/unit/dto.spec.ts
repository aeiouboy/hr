import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateLeaveRequestDto } from '../../src/leave/dto/create-leave-request.dto';
import { RejectLeaveDto } from '../../src/leave/dto/reject-leave.dto';
import { ApproveLeaveDto } from '../../src/leave/dto/approve-leave.dto';

describe('CreateLeaveRequestDto', () => {
  it('should accept valid leave request', async () => {
    const dto = plainToInstance(CreateLeaveRequestDto, {
      leave_type_id: 'lt-annual',
      start_date: '2026-03-02',
      end_date: '2026-03-04',
      days: 3,
      reason: 'Family vacation',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should reject missing leave_type_id', async () => {
    const dto = plainToInstance(CreateLeaveRequestDto, {
      start_date: '2026-03-02',
      end_date: '2026-03-04',
      days: 3,
    });

    const errors = await validate(dto);
    const typeError = errors.find((e) => e.property === 'leave_type_id');
    expect(typeError).toBeDefined();
  });

  it('should reject invalid date format', async () => {
    const dto = plainToInstance(CreateLeaveRequestDto, {
      leave_type_id: 'lt-annual',
      start_date: 'not-a-date',
      end_date: '2026-03-04',
      days: 3,
    });

    const errors = await validate(dto);
    const dateError = errors.find((e) => e.property === 'start_date');
    expect(dateError).toBeDefined();
  });

  it('should reject days less than 0.5', async () => {
    const dto = plainToInstance(CreateLeaveRequestDto, {
      leave_type_id: 'lt-annual',
      start_date: '2026-03-02',
      end_date: '2026-03-02',
      days: 0.1,
    });

    const errors = await validate(dto);
    const daysError = errors.find((e) => e.property === 'days');
    expect(daysError).toBeDefined();
  });

  it('should accept half-day value', async () => {
    const dto = plainToInstance(CreateLeaveRequestDto, {
      leave_type_id: 'lt-annual',
      start_date: '2026-03-02',
      end_date: '2026-03-02',
      days: 0.5,
      half_day: 'morning',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should accept optional fields being omitted', async () => {
    const dto = plainToInstance(CreateLeaveRequestDto, {
      leave_type_id: 'lt-annual',
      start_date: '2026-03-02',
      end_date: '2026-03-04',
      days: 3,
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});

describe('RejectLeaveDto', () => {
  it('should require reason field', async () => {
    const dto = plainToInstance(RejectLeaveDto, {});

    const errors = await validate(dto);
    const reasonError = errors.find((e) => e.property === 'reason');
    expect(reasonError).toBeDefined();
  });

  it('should accept valid reason', async () => {
    const dto = plainToInstance(RejectLeaveDto, {
      reason: 'Team is short-staffed this week',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});

describe('ApproveLeaveDto', () => {
  it('should accept optional comment', async () => {
    const dto = plainToInstance(ApproveLeaveDto, {
      comment: 'Approved, enjoy your vacation',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should accept empty dto (all fields optional)', async () => {
    const dto = plainToInstance(ApproveLeaveDto, {});

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});
