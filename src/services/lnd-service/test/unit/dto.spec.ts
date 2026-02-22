import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateCourseDto, UpdateCourseDto } from '../../src/lnd/dto/create-course.dto';
import { EnrollDto } from '../../src/lnd/dto/enroll.dto';
import { CompleteTrainingDto } from '../../src/lnd/dto/complete-training.dto';
import { SubmitEvaluationDto } from '../../src/lnd/dto/submit-evaluation.dto';
import { IssueCertificateDto } from '../../src/lnd/dto/issue-certificate.dto';

describe('CreateCourseDto', () => {
  it('should accept valid course creation', async () => {
    const dto = plainToInstance(CreateCourseDto, {
      code: 'LDR-101',
      name_en: 'Leadership Fundamentals',
      name_th: 'หลักสูตรภาวะผู้นำเบื้องต้น',
      category: 'leadership',
      delivery_method: 'classroom',
      duration_hours: 16,
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should reject missing code', async () => {
    const dto = plainToInstance(CreateCourseDto, {
      name_en: 'Leadership Fundamentals',
      name_th: 'Test',
      category: 'leadership',
      delivery_method: 'classroom',
      duration_hours: 16,
    });

    const errors = await validate(dto);
    const codeError = errors.find((e) => e.property === 'code');
    expect(codeError).toBeDefined();
  });

  it('should reject missing name_en', async () => {
    const dto = plainToInstance(CreateCourseDto, {
      code: 'LDR-101',
      name_th: 'Test',
      category: 'leadership',
      delivery_method: 'classroom',
      duration_hours: 16,
    });

    const errors = await validate(dto);
    const nameError = errors.find((e) => e.property === 'name_en');
    expect(nameError).toBeDefined();
  });

  it('should reject invalid level value', async () => {
    const dto = plainToInstance(CreateCourseDto, {
      code: 'LDR-101',
      name_en: 'Test',
      name_th: 'Test',
      category: 'leadership',
      delivery_method: 'classroom',
      duration_hours: 16,
      level: 'expert', // invalid
    });

    const errors = await validate(dto);
    const levelError = errors.find((e) => e.property === 'level');
    expect(levelError).toBeDefined();
  });

  it('should accept valid level values (beginner, intermediate, advanced)', async () => {
    for (const level of ['beginner', 'intermediate', 'advanced']) {
      const dto = plainToInstance(CreateCourseDto, {
        code: 'LDR-101',
        name_en: 'Test',
        name_th: 'Test',
        category: 'leadership',
        delivery_method: 'classroom',
        duration_hours: 16,
        level,
      });

      const errors = await validate(dto);
      const levelError = errors.find((e) => e.property === 'level');
      expect(levelError).toBeUndefined();
    }
  });

  it('should reject duration_hours less than 0.5', async () => {
    const dto = plainToInstance(CreateCourseDto, {
      code: 'LDR-101',
      name_en: 'Test',
      name_th: 'Test',
      category: 'leadership',
      delivery_method: 'classroom',
      duration_hours: 0.1,
    });

    const errors = await validate(dto);
    const durationError = errors.find((e) => e.property === 'duration_hours');
    expect(durationError).toBeDefined();
  });
});

describe('EnrollDto', () => {
  it('should accept valid enrollment', async () => {
    const dto = plainToInstance(EnrollDto, {
      course_id: 'CRS-001',
      employee_id: 'EMP001',
      employee_name: 'Somchai Prasert',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should reject missing course_id', async () => {
    const dto = plainToInstance(EnrollDto, {
      employee_id: 'EMP001',
      employee_name: 'Somchai Prasert',
    });

    const errors = await validate(dto);
    const courseIdError = errors.find((e) => e.property === 'course_id');
    expect(courseIdError).toBeDefined();
  });

  it('should reject missing employee_id', async () => {
    const dto = plainToInstance(EnrollDto, {
      course_id: 'CRS-001',
      employee_name: 'Somchai Prasert',
    });

    const errors = await validate(dto);
    const employeeIdError = errors.find((e) => e.property === 'employee_id');
    expect(employeeIdError).toBeDefined();
  });
});

describe('CompleteTrainingDto', () => {
  it('should accept valid training completion', async () => {
    const dto = plainToInstance(CompleteTrainingDto, {
      enrollment_id: 'ENR-001',
      employee_id: 'EMP001',
      course_code: 'LDR-101',
      course_name_en: 'Leadership Fundamentals',
      training_type: 'internal',
      category: 'leadership',
      start_date: '2026-02-10',
      duration_hours: 16,
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should reject missing enrollment_id', async () => {
    const dto = plainToInstance(CompleteTrainingDto, {
      employee_id: 'EMP001',
      course_code: 'LDR-101',
      course_name_en: 'Test',
      training_type: 'internal',
      category: 'leadership',
      start_date: '2026-02-10',
      duration_hours: 16,
    });

    const errors = await validate(dto);
    const enrollmentIdError = errors.find((e) => e.property === 'enrollment_id');
    expect(enrollmentIdError).toBeDefined();
  });

  it('should reject invalid start_date format', async () => {
    const dto = plainToInstance(CompleteTrainingDto, {
      enrollment_id: 'ENR-001',
      employee_id: 'EMP001',
      course_code: 'LDR-101',
      course_name_en: 'Test',
      training_type: 'internal',
      category: 'leadership',
      start_date: 'not-a-date',
      duration_hours: 16,
    });

    const errors = await validate(dto);
    const dateError = errors.find((e) => e.property === 'start_date');
    expect(dateError).toBeDefined();
  });
});

describe('SubmitEvaluationDto', () => {
  it('should accept valid evaluation with all Kirkpatrick levels', async () => {
    const dto = plainToInstance(SubmitEvaluationDto, {
      training_record_id: 'TR-001',
      reaction_score: 4.5,
      learning_score: 4.0,
      behavior_score: 3.8,
      results_score: 4.2,
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should accept partial evaluation (only reaction)', async () => {
    const dto = plainToInstance(SubmitEvaluationDto, {
      training_record_id: 'TR-001',
      reaction_score: 4.5,
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should reject missing training_record_id', async () => {
    const dto = plainToInstance(SubmitEvaluationDto, {
      reaction_score: 4.5,
    });

    const errors = await validate(dto);
    const idError = errors.find((e) => e.property === 'training_record_id');
    expect(idError).toBeDefined();
  });

  it('should reject score greater than 5', async () => {
    const dto = plainToInstance(SubmitEvaluationDto, {
      training_record_id: 'TR-001',
      reaction_score: 6.0,
    });

    const errors = await validate(dto);
    const scoreError = errors.find((e) => e.property === 'reaction_score');
    expect(scoreError).toBeDefined();
  });

  it('should reject negative score', async () => {
    const dto = plainToInstance(SubmitEvaluationDto, {
      training_record_id: 'TR-001',
      learning_score: -1,
    });

    const errors = await validate(dto);
    const scoreError = errors.find((e) => e.property === 'learning_score');
    expect(scoreError).toBeDefined();
  });
});

describe('IssueCertificateDto', () => {
  it('should accept valid certificate issuance', async () => {
    const dto = plainToInstance(IssueCertificateDto, {
      employee_id: 'EMP001',
      certificate_number: 'CG-LDR-2026-0001',
      course_name: 'Leadership Fundamentals',
      issue_date: '2026-02-15',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should reject missing employee_id', async () => {
    const dto = plainToInstance(IssueCertificateDto, {
      certificate_number: 'CG-LDR-2026-0001',
      course_name: 'Leadership Fundamentals',
      issue_date: '2026-02-15',
    });

    const errors = await validate(dto);
    const idError = errors.find((e) => e.property === 'employee_id');
    expect(idError).toBeDefined();
  });

  it('should reject missing certificate_number', async () => {
    const dto = plainToInstance(IssueCertificateDto, {
      employee_id: 'EMP001',
      course_name: 'Leadership Fundamentals',
      issue_date: '2026-02-15',
    });

    const errors = await validate(dto);
    const certError = errors.find((e) => e.property === 'certificate_number');
    expect(certError).toBeDefined();
  });

  it('should reject invalid issue_date format', async () => {
    const dto = plainToInstance(IssueCertificateDto, {
      employee_id: 'EMP001',
      certificate_number: 'CG-LDR-2026-0001',
      course_name: 'Leadership Fundamentals',
      issue_date: 'not-a-date',
    });

    const errors = await validate(dto);
    const dateError = errors.find((e) => e.property === 'issue_date');
    expect(dateError).toBeDefined();
  });

  it('should accept optional fields', async () => {
    const dto = plainToInstance(IssueCertificateDto, {
      employee_id: 'EMP001',
      training_record_id: 'TR-001',
      certificate_number: 'CG-LDR-2026-0001',
      course_name: 'Leadership Fundamentals',
      issue_date: '2026-02-15',
      expiry_date: '2028-02-15',
      issuing_authority: 'Central Retail Academy',
      file_url: '/certificates/CG-LDR-2026-0001.pdf',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});
