import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { PaginationQueryDto, paginate } from '../src/dto/pagination.dto';

describe('PaginationQueryDto', () => {
  // ── Default Values ────────────────────────────────────────────
  describe('Default values', () => {
    it('should have page default of 1', () => {
      const dto = new PaginationQueryDto();
      expect(dto.page).toBe(1);
    });

    it('should have limit default of 20', () => {
      const dto = new PaginationQueryDto();
      expect(dto.limit).toBe(20);
    });

    it('should have order default of asc', () => {
      const dto = new PaginationQueryDto();
      expect(dto.order).toBe('asc');
    });

    it('should have sort as undefined by default', () => {
      const dto = new PaginationQueryDto();
      expect(dto.sort).toBeUndefined();
    });
  });

  // ── Validation ────────────────────────────────────────────────
  describe('Validation', () => {
    it('should pass validation with valid data', async () => {
      const dto = plainToInstance(PaginationQueryDto, { page: '2', limit: '10', order: 'desc' });
      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should pass validation with default values', async () => {
      const dto = plainToInstance(PaginationQueryDto, {});
      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail validation when page is 0', async () => {
      const dto = plainToInstance(PaginationQueryDto, { page: '0' });
      const errors = await validate(dto);
      expect(errors.some((e) => e.property === 'page')).toBe(true);
    });

    it('should fail validation when page is negative', async () => {
      const dto = plainToInstance(PaginationQueryDto, { page: '-1' });
      const errors = await validate(dto);
      expect(errors.some((e) => e.property === 'page')).toBe(true);
    });

    it('should fail validation when limit is 0', async () => {
      const dto = plainToInstance(PaginationQueryDto, { limit: '0' });
      const errors = await validate(dto);
      expect(errors.some((e) => e.property === 'limit')).toBe(true);
    });

    it('should fail validation when limit exceeds 100', async () => {
      const dto = plainToInstance(PaginationQueryDto, { limit: '101' });
      const errors = await validate(dto);
      expect(errors.some((e) => e.property === 'limit')).toBe(true);
    });

    it('should pass validation with limit of exactly 100', async () => {
      const dto = plainToInstance(PaginationQueryDto, { limit: '100' });
      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
      expect(dto.limit).toBe(100);
    });

    it('should fail validation when order is invalid', async () => {
      const dto = plainToInstance(PaginationQueryDto, { order: 'invalid' });
      const errors = await validate(dto);
      expect(errors.some((e) => e.property === 'order')).toBe(true);
    });

    it('should accept asc order', async () => {
      const dto = plainToInstance(PaginationQueryDto, { order: 'asc' });
      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should accept desc order', async () => {
      const dto = plainToInstance(PaginationQueryDto, { order: 'desc' });
      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should transform page to number', () => {
      const dto = plainToInstance(PaginationQueryDto, { page: '5' });
      expect(typeof dto.page).toBe('number');
      expect(dto.page).toBe(5);
    });

    it('should transform limit to number', () => {
      const dto = plainToInstance(PaginationQueryDto, { limit: '50' });
      expect(typeof dto.limit).toBe('number');
      expect(dto.limit).toBe(50);
    });
  });
});

// ── paginate() ────────────────────────────────────────────────────
describe('paginate()', () => {
  const makeQuery = (page = 1, limit = 20): PaginationQueryDto => {
    const q = new PaginationQueryDto();
    q.page = page;
    q.limit = limit;
    q.order = 'asc';
    return q;
  };

  it('should return correct pagination structure', () => {
    const items = [{ id: 1 }, { id: 2 }];
    const result = paginate(items, 50, makeQuery(1, 20));

    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('pagination');
    expect(result.pagination).toHaveProperty('page');
    expect(result.pagination).toHaveProperty('limit');
    expect(result.pagination).toHaveProperty('total');
    expect(result.pagination).toHaveProperty('totalPages');
  });

  it('should return correct data array', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = paginate(items, 3, makeQuery(1, 10));
    expect(result.data).toHaveLength(3);
    expect(result.data[0]).toEqual({ id: 1 });
  });

  it('should calculate totalPages correctly', () => {
    const result = paginate([], 100, makeQuery(1, 20));
    expect(result.pagination.totalPages).toBe(5);
  });

  it('should ceil totalPages for non-even division', () => {
    const result = paginate([], 25, makeQuery(1, 10));
    expect(result.pagination.totalPages).toBe(3);
  });

  it('should report correct page number', () => {
    const result = paginate([], 50, makeQuery(3, 10));
    expect(result.pagination.page).toBe(3);
  });

  it('should report correct limit', () => {
    const result = paginate([], 50, makeQuery(1, 5));
    expect(result.pagination.limit).toBe(5);
  });

  it('should report correct total', () => {
    const result = paginate([], 99, makeQuery(1, 20));
    expect(result.pagination.total).toBe(99);
  });

  it('should handle empty results', () => {
    const result = paginate([], 0, makeQuery(1, 20));
    expect(result.data).toHaveLength(0);
    expect(result.pagination.total).toBe(0);
    expect(result.pagination.totalPages).toBe(0);
  });

  it('should handle single page results', () => {
    const items = [{ id: 1 }];
    const result = paginate(items, 1, makeQuery(1, 20));
    expect(result.pagination.totalPages).toBe(1);
  });

  it('should work with typed data', () => {
    interface Employee { id: string; name: string }
    const items: Employee[] = [
      { id: 'EMP001', name: 'Somchai Prasert' },
      { id: 'EMP002', name: 'Siriporn Kaewmanee' },
    ];
    const result = paginate(items, 2, makeQuery(1, 10));
    expect(result.data[0].id).toBe('EMP001');
    expect(result.data[1].name).toBe('Siriporn Kaewmanee');
  });
});
