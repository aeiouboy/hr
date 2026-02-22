import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateWorkflowDto } from '../../src/workflow/dto/create-workflow.dto';
import { ApproveStepDto } from '../../src/workflow/dto/approve-step.dto';
import { RejectStepDto } from '../../src/workflow/dto/reject-step.dto';
import { SendBackDto } from '../../src/workflow/dto/send-back.dto';
import { ResubmitDto } from '../../src/workflow/dto/resubmit.dto';
import { BulkApproveDto } from '../../src/workflow/dto/bulk-approve.dto';
import { CreateDelegationDto } from '../../src/workflow/dto/create-delegation.dto';

describe('CreateWorkflowDto', () => {
  it('should accept valid workflow creation', async () => {
    const dto = plainToInstance(CreateWorkflowDto, {
      change_type: 'personal_info_change',
      section: 'personalInfo',
      effective_date: '2026-03-01',
      old_values: { first_name_en: 'Chongrak' },
      new_values: { first_name_en: 'Updated' },
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should reject missing change_type', async () => {
    const dto = plainToInstance(CreateWorkflowDto, {
      section: 'personalInfo',
      effective_date: '2026-03-01',
      new_values: { name: 'test' },
    });

    const errors = await validate(dto);
    const changeTypeError = errors.find((e) => e.property === 'change_type');
    expect(changeTypeError).toBeDefined();
  });

  it('should reject missing section', async () => {
    const dto = plainToInstance(CreateWorkflowDto, {
      change_type: 'personal_info_change',
      effective_date: '2026-03-01',
      new_values: { name: 'test' },
    });

    const errors = await validate(dto);
    const sectionError = errors.find((e) => e.property === 'section');
    expect(sectionError).toBeDefined();
  });

  it('should reject missing new_values', async () => {
    const dto = plainToInstance(CreateWorkflowDto, {
      change_type: 'personal_info_change',
      section: 'personalInfo',
      effective_date: '2026-03-01',
    });

    const errors = await validate(dto);
    const newValuesError = errors.find((e) => e.property === 'new_values');
    expect(newValuesError).toBeDefined();
  });

  it('should reject invalid effective_date format', async () => {
    const dto = plainToInstance(CreateWorkflowDto, {
      change_type: 'personal_info_change',
      section: 'personalInfo',
      effective_date: 'not-a-date',
      new_values: { name: 'test' },
    });

    const errors = await validate(dto);
    const dateError = errors.find((e) => e.property === 'effective_date');
    expect(dateError).toBeDefined();
  });

  it('should accept valid change_type enum values', async () => {
    const validTypes = [
      'contact_info_personal_email',
      'personal_info_change',
      'address_change',
      'bank_account_change',
      'leave_request',
      'transfer_internal',
    ];

    for (const type of validTypes) {
      const dto = plainToInstance(CreateWorkflowDto, {
        change_type: type,
        section: 'test',
        effective_date: '2026-03-01',
        new_values: { key: 'value' },
      });

      const errors = await validate(dto);
      const typeError = errors.find((e) => e.property === 'change_type');
      expect(typeError).toBeUndefined();
    }
  });
});

describe('ApproveStepDto', () => {
  it('should accept approval with comments', async () => {
    const dto = plainToInstance(ApproveStepDto, {
      comments: 'Looks good, approved',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should accept approval without comments (optional)', async () => {
    const dto = plainToInstance(ApproveStepDto, {});

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});

describe('RejectStepDto', () => {
  it('should accept rejection with reason', async () => {
    const dto = plainToInstance(RejectStepDto, {
      reason: 'Information is incorrect',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should reject empty reason', async () => {
    const dto = plainToInstance(RejectStepDto, {
      reason: '',
    });

    const errors = await validate(dto);
    const reasonError = errors.find((e) => e.property === 'reason');
    expect(reasonError).toBeDefined();
  });

  it('should reject missing reason', async () => {
    const dto = plainToInstance(RejectStepDto, {});

    const errors = await validate(dto);
    const reasonError = errors.find((e) => e.property === 'reason');
    expect(reasonError).toBeDefined();
  });
});

describe('SendBackDto', () => {
  it('should accept send-back with reason', async () => {
    const dto = plainToInstance(SendBackDto, {
      reason: 'Please correct the dates',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should reject missing reason', async () => {
    const dto = plainToInstance(SendBackDto, {});

    const errors = await validate(dto);
    const reasonError = errors.find((e) => e.property === 'reason');
    expect(reasonError).toBeDefined();
  });
});

describe('ResubmitDto', () => {
  it('should accept resubmission with new_values', async () => {
    const dto = plainToInstance(ResubmitDto, {
      new_values: { first_name_en: 'Corrected' },
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should reject missing new_values', async () => {
    const dto = plainToInstance(ResubmitDto, {});

    const errors = await validate(dto);
    const valuesError = errors.find((e) => e.property === 'new_values');
    expect(valuesError).toBeDefined();
  });
});

describe('BulkApproveDto', () => {
  it('should accept bulk approval with workflow IDs', async () => {
    const dto = plainToInstance(BulkApproveDto, {
      workflow_ids: ['WF-001', 'WF-002'],
      comments: 'Bulk approved',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should reject empty workflow_ids array', async () => {
    const dto = plainToInstance(BulkApproveDto, {
      workflow_ids: [],
    });

    const errors = await validate(dto);
    const idsError = errors.find((e) => e.property === 'workflow_ids');
    expect(idsError).toBeDefined();
  });

  it('should reject missing workflow_ids', async () => {
    const dto = plainToInstance(BulkApproveDto, {
      comments: 'test',
    });

    const errors = await validate(dto);
    const idsError = errors.find((e) => e.property === 'workflow_ids');
    expect(idsError).toBeDefined();
  });
});

describe('CreateDelegationDto', () => {
  it('should accept valid delegation', async () => {
    const dto = plainToInstance(CreateDelegationDto, {
      delegate_id: 'MGR002',
      start_date: '2026-03-01',
      end_date: '2026-03-15',
      change_types: ['personal_info_change', 'address_change'],
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should reject missing delegate_id', async () => {
    const dto = plainToInstance(CreateDelegationDto, {
      start_date: '2026-03-01',
      end_date: '2026-03-15',
      change_types: ['personal_info_change'],
    });

    const errors = await validate(dto);
    const delegateError = errors.find((e) => e.property === 'delegate_id');
    expect(delegateError).toBeDefined();
  });

  it('should reject missing start_date', async () => {
    const dto = plainToInstance(CreateDelegationDto, {
      delegate_id: 'MGR002',
      end_date: '2026-03-15',
      change_types: ['personal_info_change'],
    });

    const errors = await validate(dto);
    const dateError = errors.find((e) => e.property === 'start_date');
    expect(dateError).toBeDefined();
  });

  it('should reject missing end_date', async () => {
    const dto = plainToInstance(CreateDelegationDto, {
      delegate_id: 'MGR002',
      start_date: '2026-03-01',
      change_types: ['personal_info_change'],
    });

    const errors = await validate(dto);
    const dateError = errors.find((e) => e.property === 'end_date');
    expect(dateError).toBeDefined();
  });

  it('should reject empty change_types array', async () => {
    const dto = plainToInstance(CreateDelegationDto, {
      delegate_id: 'MGR002',
      start_date: '2026-03-01',
      end_date: '2026-03-15',
      change_types: [],
    });

    const errors = await validate(dto);
    const typesError = errors.find((e) => e.property === 'change_types');
    expect(typesError).toBeDefined();
  });
});
