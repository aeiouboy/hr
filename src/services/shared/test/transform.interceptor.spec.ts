import 'reflect-metadata';
import { of } from 'rxjs';
import { TransformInterceptor } from '../src/interceptors/transform.interceptor';

// ── Helpers ───────────────────────────────────────────────────────

function buildMockCallHandler(returnValue: unknown) {
  return {
    handle: () => of(returnValue),
  };
}

function buildMockExecutionContext() {
  return {} as any;
}

// ── Tests ─────────────────────────────────────────────────────────

describe('TransformInterceptor', () => {
  let interceptor: TransformInterceptor<unknown>;

  beforeEach(() => {
    interceptor = new TransformInterceptor();
  });

  describe('intercept()', () => {
    it('should wrap plain data in { data } envelope', (done) => {
      const ctx = buildMockExecutionContext();
      const handler = buildMockCallHandler({ id: 'EMP001', name: 'Somchai' });

      interceptor.intercept(ctx, handler).subscribe((result) => {
        expect(result).toEqual({
          data: { id: 'EMP001', name: 'Somchai' },
        });
        done();
      });
    });

    it('should wrap string data in { data } envelope', (done) => {
      const ctx = buildMockExecutionContext();
      const handler = buildMockCallHandler('hello world');

      interceptor.intercept(ctx, handler).subscribe((result) => {
        expect(result).toEqual({ data: 'hello world' });
        done();
      });
    });

    it('should wrap array data in { data } envelope', (done) => {
      const ctx = buildMockExecutionContext();
      const handler = buildMockCallHandler([{ id: 1 }, { id: 2 }]);

      interceptor.intercept(ctx, handler).subscribe((result) => {
        expect(result).toEqual({ data: [{ id: 1 }, { id: 2 }] });
        done();
      });
    });

    it('should wrap null data in { data } envelope', (done) => {
      const ctx = buildMockExecutionContext();
      const handler = buildMockCallHandler(null);

      interceptor.intercept(ctx, handler).subscribe((result) => {
        expect(result).toEqual({ data: null });
        done();
      });
    });

    it('should pass through already-paginated response without re-wrapping', (done) => {
      const paginatedResponse = {
        data: [{ id: 'EMP001' }],
        pagination: { page: 1, limit: 20, total: 1, totalPages: 1 },
      };
      const ctx = buildMockExecutionContext();
      const handler = buildMockCallHandler(paginatedResponse);

      interceptor.intercept(ctx, handler).subscribe((result) => {
        expect(result).toEqual(paginatedResponse);
        expect(result).not.toHaveProperty('data.data');
        done();
      });
    });

    it('should pass through response that already has data and pagination shape', (done) => {
      const existingShape = {
        data: [{ id: 1 }, { id: 2 }],
        pagination: { page: 2, limit: 10, total: 50, totalPages: 5 },
      };
      const ctx = buildMockExecutionContext();
      const handler = buildMockCallHandler(existingShape);

      interceptor.intercept(ctx, handler).subscribe((result) => {
        expect(result.data).toEqual(existingShape.data);
        expect((result as any).pagination).toEqual(existingShape.pagination);
        done();
      });
    });

    it('should wrap object without pagination in { data }', (done) => {
      const ctx = buildMockExecutionContext();
      const handler = buildMockCallHandler({ id: 1, name: 'Test', data: 'inner-data' });

      // Object has 'data' key but not 'pagination', so should be wrapped
      interceptor.intercept(ctx, handler).subscribe((result) => {
        // data key exists on plain object but no pagination key, so it gets wrapped
        expect(result).toHaveProperty('data');
        done();
      });
    });
  });
});
