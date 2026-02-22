import 'reflect-metadata';
import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from '../src/filters/http-exception.filter';

// ── Helpers ───────────────────────────────────────────────────────

function buildMockHost(url = '/api/test') {
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const mockRequest = { url };

  return {
    switchToHttp: () => ({
      getResponse: () => mockResponse,
      getRequest: () => mockRequest,
    }),
    mockResponse,
    mockRequest,
  } as any;
}

// ── Tests ─────────────────────────────────────────────────────────

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  beforeEach(() => {
    filter = new HttpExceptionFilter();
  });

  describe('catch()', () => {
    it('should handle HttpException with string response', () => {
      const exception = new HttpException('Resource not found', HttpStatus.NOT_FOUND);
      const { switchToHttp, mockResponse } = buildMockHost('/api/employees/999');

      filter.catch(exception, { switchToHttp } as any);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 404,
          message: 'Resource not found',
          path: '/api/employees/999',
        }),
      );
    });

    it('should handle HttpException with object response', () => {
      const exception = new HttpException(
        { message: 'Validation failed', error: 'Bad Request', details: ['field is required'] },
        HttpStatus.BAD_REQUEST,
      );
      const { switchToHttp, mockResponse } = buildMockHost('/api/employees');

      filter.catch(exception, { switchToHttp } as any);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
          details: ['field is required'],
        }),
      );
    });

    it('should handle generic Error with 500 status', () => {
      const exception = new Error('Database connection failed');
      const { switchToHttp, mockResponse } = buildMockHost('/api/employees');

      filter.catch(exception, { switchToHttp } as any);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 500,
          message: 'Database connection failed',
          error: 'Internal Server Error',
        }),
      );
    });

    it('should handle unknown exception with 500 status', () => {
      const { switchToHttp, mockResponse } = buildMockHost('/api/test');

      filter.catch('something unexpected', { switchToHttp } as any);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 500,
          message: 'Internal server error',
          error: 'Internal Server Error',
        }),
      );
    });

    it('should include path from request URL', () => {
      const exception = new HttpException('Not found', HttpStatus.NOT_FOUND);
      const { switchToHttp, mockResponse } = buildMockHost('/api/employees/EMP001');

      filter.catch(exception, { switchToHttp } as any);

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({ path: '/api/employees/EMP001' }),
      );
    });

    it('should include timestamp in response', () => {
      const exception = new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
      const { switchToHttp, mockResponse } = buildMockHost('/api/test');

      filter.catch(exception, { switchToHttp } as any);

      const callArg = mockResponse.json.mock.calls[0][0];
      expect(callArg.timestamp).toBeDefined();
      expect(typeof callArg.timestamp).toBe('string');
      // Should be a valid ISO date
      expect(new Date(callArg.timestamp).toISOString()).toBe(callArg.timestamp);
    });

    it('should not include details property when not present', () => {
      const exception = new HttpException('Not found', HttpStatus.NOT_FOUND);
      const { switchToHttp, mockResponse } = buildMockHost('/api/test');

      filter.catch(exception, { switchToHttp } as any);

      const callArg = mockResponse.json.mock.calls[0][0];
      expect(callArg).not.toHaveProperty('details');
    });

    it('should include details property when present in exception response', () => {
      const exception = new HttpException(
        { message: 'Validation failed', details: { field: 'email', reason: 'invalid format' } },
        HttpStatus.BAD_REQUEST,
      );
      const { switchToHttp, mockResponse } = buildMockHost('/api/test');

      filter.catch(exception, { switchToHttp } as any);

      const callArg = mockResponse.json.mock.calls[0][0];
      expect(callArg.details).toEqual({ field: 'email', reason: 'invalid format' });
    });

    it('should handle UnauthorizedException (401)', () => {
      const exception = new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      const { switchToHttp, mockResponse } = buildMockHost('/api/protected');

      filter.catch(exception, { switchToHttp } as any);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
    });

    it('should handle ForbiddenException (403)', () => {
      const exception = new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      const { switchToHttp, mockResponse } = buildMockHost('/api/admin');

      filter.catch(exception, { switchToHttp } as any);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
    });
  });
});
