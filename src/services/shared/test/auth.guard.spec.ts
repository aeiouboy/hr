import 'reflect-metadata';
import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '../src/guards/auth.guard';

// ── Helpers ──────────────────────────────────────────────────────

function buildJwtToken(payload: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = 'fakesignature';
  return `${header}.${body}.${sig}`;
}

const mockPayload = {
  sub: 'EMP001',
  email: 'somchai.p@centralgroup.com',
  preferred_username: 'somchai.p',
  given_name: 'Somchai',
  family_name: 'Prasert',
  realm_access: { roles: ['employee'] },
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 3600,
};

function buildMockContext(authHeader?: string) {
  const request: Record<string, unknown> = { headers: {} as Record<string, string> };
  if (authHeader) {
    (request.headers as Record<string, string>)['authorization'] = authHeader;
  }

  return {
    switchToHttp: () => ({
      getRequest: () => request,
    }),
    getHandler: () => ({}),
    getClass: () => ({}),
  } as any;
}

// ── Tests ─────────────────────────────────────────────────────────

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    guard = new AuthGuard();
  });

  describe('canActivate', () => {
    it('should allow request with valid Bearer token', () => {
      const token = buildJwtToken(mockPayload);
      const ctx = buildMockContext(`Bearer ${token}`);

      const result = guard.canActivate(ctx);

      expect(result).toBe(true);
    });

    it('should set user on request from token payload', () => {
      const token = buildJwtToken(mockPayload);
      const ctx = buildMockContext(`Bearer ${token}`);
      const request = ctx.switchToHttp().getRequest();

      guard.canActivate(ctx);

      expect(request.user).toBeDefined();
      expect(request.user.id).toBe('EMP001');
      expect(request.user.email).toBe('somchai.p@centralgroup.com');
      expect(request.user.username).toBe('somchai.p');
      expect(request.user.firstName).toBe('Somchai');
      expect(request.user.lastName).toBe('Prasert');
      expect(request.user.roles).toEqual(['employee']);
    });

    it('should throw UnauthorizedException when no authorization header', () => {
      const ctx = buildMockContext();
      expect(() => guard.canActivate(ctx)).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when authorization header does not start with Bearer', () => {
      const ctx = buildMockContext('Basic dXNlcjpwYXNz');
      expect(() => guard.canActivate(ctx)).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for empty Bearer token', () => {
      const ctx = buildMockContext('Bearer ');
      expect(() => guard.canActivate(ctx)).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for malformed JWT (2 parts only)', () => {
      const ctx = buildMockContext('Bearer header.payload');
      expect(() => guard.canActivate(ctx)).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for JWT with invalid base64 payload', () => {
      const ctx = buildMockContext('Bearer header.!!!invalid!!!.signature');
      expect(() => guard.canActivate(ctx)).toThrow(UnauthorizedException);
    });

    it('should map realm_access roles from payload', () => {
      const hrPayload = {
        ...mockPayload,
        sub: 'HR001',
        realm_access: { roles: ['hr_admin', 'employee'] },
      };
      const token = buildJwtToken(hrPayload);
      const ctx = buildMockContext(`Bearer ${token}`);
      const request = ctx.switchToHttp().getRequest();

      guard.canActivate(ctx);

      expect(request.user.roles).toContain('hr_admin');
      expect(request.user.roles).toContain('employee');
    });

    it('should use empty roles array when realm_access is missing', () => {
      const payloadWithoutRoles = {
        sub: 'EMP001',
        email: 'somchai.p@centralgroup.com',
        preferred_username: 'somchai.p',
        given_name: 'Somchai',
        family_name: 'Prasert',
        // no realm_access
      };
      const token = buildJwtToken(payloadWithoutRoles);
      const ctx = buildMockContext(`Bearer ${token}`);
      const request = ctx.switchToHttp().getRequest();

      guard.canActivate(ctx);

      expect(request.user.roles).toEqual([]);
    });
  });
});
