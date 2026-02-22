import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UpdatePersonalInfoDto } from '../../src/employee/dto/update-personal-info.dto';
import { UpdateContactInfoDto } from '../../src/employee/dto/update-contact-info.dto';
import { CreateEmergencyContactDto } from '../../src/employee/dto/create-emergency-contact.dto';
import { CreateDependentDto } from '../../src/employee/dto/create-dependent.dto';

describe('UpdatePersonalInfoDto', () => {
  it('should accept valid personal info update', async () => {
    const dto = plainToInstance(UpdatePersonalInfoDto, {
      first_name_en: 'Chongrak',
      last_name_en: 'Tanaka',
      gender: 'male',
      date_of_birth: '1988-05-12',
      nationality: 'Thai',
      religion: 'buddhist',
      blood_type: 'O+',
      marital_status: 'married',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should reject invalid date format for date_of_birth', async () => {
    const dto = plainToInstance(UpdatePersonalInfoDto, {
      date_of_birth: 'not-a-date',
    });

    const errors = await validate(dto);
    const dobError = errors.find((e) => e.property === 'date_of_birth');
    expect(dobError).toBeDefined();
  });

  it('should reject invalid gender enum value', async () => {
    const dto = plainToInstance(UpdatePersonalInfoDto, {
      gender: 'invalid_gender',
    });

    const errors = await validate(dto);
    const genderError = errors.find((e) => e.property === 'gender');
    expect(genderError).toBeDefined();
  });

  it('should reject empty first_name', async () => {
    const dto = plainToInstance(UpdatePersonalInfoDto, {
      first_name_en: '',
    });

    const errors = await validate(dto);
    const nameError = errors.find((e) => e.property === 'first_name_en');
    expect(nameError).toBeDefined();
  });

  it('should accept partial update (not all fields required)', async () => {
    const dto = plainToInstance(UpdatePersonalInfoDto, {
      nationality: 'Japanese',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});

describe('UpdateContactInfoDto', () => {
  it('should accept valid contact info update', async () => {
    const dto = plainToInstance(UpdateContactInfoDto, {
      email: 'valid@centralgroup.com',
      personal_mobile: '+66 91 111 2222',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should reject invalid email format', async () => {
    const dto = plainToInstance(UpdateContactInfoDto, {
      email: 'not-an-email',
    });

    const errors = await validate(dto);
    const emailError = errors.find((e) => e.property === 'email');
    expect(emailError).toBeDefined();
  });

  it('should reject invalid phone format', async () => {
    const dto = plainToInstance(UpdateContactInfoDto, {
      personal_mobile: 'abc',
    });

    const errors = await validate(dto);
    const phoneError = errors.find((e) => e.property === 'personal_mobile');
    expect(phoneError).toBeDefined();
  });

  it('should accept partial update', async () => {
    const dto = plainToInstance(UpdateContactInfoDto, {
      email: 'only-email@company.com',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});

describe('CreateEmergencyContactDto', () => {
  it('should require name, relationship, and phone', async () => {
    const dto = plainToInstance(CreateEmergencyContactDto, {
      name: 'Jane Doe',
      relationship: 'spouse',
      phone: '+66 81 234 5678',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should reject missing required fields', async () => {
    const dto = plainToInstance(CreateEmergencyContactDto, {});

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);

    const properties = errors.map((e) => e.property);
    expect(properties).toContain('name');
    expect(properties).toContain('relationship');
    expect(properties).toContain('phone');
  });
});

describe('CreateDependentDto', () => {
  it('should require name, relationship_type, date_of_birth', async () => {
    const dto = plainToInstance(CreateDependentDto, {
      name: 'Sakura Tanaka',
      relationship_type: 'child',
      date_of_birth: '2020-06-20',
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should validate relationship_type is valid enum (spouse, child, parent, sibling, other)', async () => {
    const dto = plainToInstance(CreateDependentDto, {
      name: 'Test Person',
      relationship_type: 'cousin',
      date_of_birth: '2000-01-01',
    });

    const errors = await validate(dto);
    const relError = errors.find((e) => e.property === 'relationship_type');
    expect(relError).toBeDefined();
  });
});
