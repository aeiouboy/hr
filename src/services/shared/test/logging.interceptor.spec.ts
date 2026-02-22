import 'reflect-metadata';
import { of } from 'rxjs';
import { LoggingInterceptor } from '../src/interceptors/logging.interceptor';

// ── Helpers ───────────────────────────────────────────────────────

function buildMockContext(method = 'GET', url = '/api/employees', statusCode = 200) {
  const mockResponse = { statusCode };
  const mockRequest = { method, url };

  return {
    switchToHttp: () => ({
      getRequest: () => mockRequest,
      getResponse: () => mockResponse,
    }),
  } as any;
}

function buildMockCallHandler(returnValue: unknown = { id: 'EMP001' }) {
  return {
    handle: () => of(returnValue),
  };
}

// ── Tests ─────────────────────────────────────────────────────────

describe('LoggingInterceptor', () => {
  let interceptor: LoggingInterceptor;
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    interceptor = new LoggingInterceptor();
    // Spy on the logger to avoid actual log output during tests
    logSpy = jest.spyOn((interceptor as any).logger, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('intercept()', () => {
    it('should return an observable', () => {
      const ctx = buildMockContext();
      const handler = buildMockCallHandler();

      const result = interceptor.intercept(ctx, handler);

      expect(result).toBeDefined();
      expect(typeof result.subscribe).toBe('function');
    });

    it('should log after successful request', (done) => {
      const ctx = buildMockContext('GET', '/api/employees', 200);
      const handler = buildMockCallHandler({ data: [] });

      interceptor.intercept(ctx, handler).subscribe({
        complete: () => {
          expect(logSpy).toHaveBeenCalledTimes(1);
          done();
        },
      });
    });

    it('should log the HTTP method', (done) => {
      const ctx = buildMockContext('POST', '/api/employees', 201);
      const handler = buildMockCallHandler({ id: 'EMP001' });

      interceptor.intercept(ctx, handler).subscribe({
        complete: () => {
          const logCall = logSpy.mock.calls[0][0] as string;
          expect(logCall).toContain('POST');
          done();
        },
      });
    });

    it('should log the URL', (done) => {
      const ctx = buildMockContext('GET', '/api/employees/EMP001', 200);
      const handler = buildMockCallHandler({ id: 'EMP001' });

      interceptor.intercept(ctx, handler).subscribe({
        complete: () => {
          const logCall = logSpy.mock.calls[0][0] as string;
          expect(logCall).toContain('/api/employees/EMP001');
          done();
        },
      });
    });

    it('should log the status code', (done) => {
      const ctx = buildMockContext('DELETE', '/api/employees/EMP001', 204);
      const handler = buildMockCallHandler(null);

      interceptor.intercept(ctx, handler).subscribe({
        complete: () => {
          const logCall = logSpy.mock.calls[0][0] as string;
          expect(logCall).toContain('204');
          done();
        },
      });
    });

    it('should log the duration in milliseconds', (done) => {
      const ctx = buildMockContext('GET', '/api/test', 200);
      const handler = buildMockCallHandler({});

      interceptor.intercept(ctx, handler).subscribe({
        complete: () => {
          const logCall = logSpy.mock.calls[0][0] as string;
          expect(logCall).toMatch(/\d+ms/);
          done();
        },
      });
    });

    it('should pass through the response data unchanged', (done) => {
      const responseData = { id: 'EMP001', name: 'Somchai Prasert', roles: ['employee'] };
      const ctx = buildMockContext('GET', '/api/employees/EMP001', 200);
      const handler = buildMockCallHandler(responseData);

      interceptor.intercept(ctx, handler).subscribe({
        next: (result) => {
          expect(result).toEqual(responseData);
          done();
        },
      });
    });
  });
});
