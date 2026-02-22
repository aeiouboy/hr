import 'reflect-metadata';
import { ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from '../src/guards/roles.guard';
import { ROLES_KEY } from '../src/decorators/roles.decorator';
import { CurrentUser } from '../src/interfaces/jwt-payload.interface';

// ── Helpers ───────────────────────────────────────────────────────

function buildMockContext(user?: Partial<CurrentUser>, handler = {}, cls = {}) {
  const request = { user };
  return {
    switchToHttp: () => ({
      getRequest: () => request,
    }),
    getHandler: () => handler,
    getClass: () => cls,
  } as any;
}

function buildReflector(roles: string[] | undefined) {
  return {
    getAllAndOverride: jest.fn().mockReturnValue(roles),
  } as unknown as Reflector;
}

const mockEmployee: CurrentUser = {
  id: 'EMP001',
  email: 'somchai.p@centralgroup.com',
  username: 'somchai.p',
  firstName: 'Somchai',
  lastName: 'Prasert',
  roles: ['employee'],
};

const mockHrAdmin: CurrentUser = {
  id: 'HR001',
  email: 'hr.admin@centralgroup.com',
  username: 'hr.admin',
  firstName: 'Nattaya',
  lastName: 'Srisakul',
  roles: ['hr_admin', 'employee'],
};

// ── Tests ─────────────────────────────────────────────────────────

describe('RolesGuard', () => {
  it('should allow access when no roles are required', () => {
    const reflector = buildReflector(undefined);
    const guard = new RolesGuard(reflector);
    const ctx = buildMockContext(mockEmployee);

    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('should allow access when required roles array is empty', () => {
    const reflector = buildReflector([]);
    const guard = new RolesGuard(reflector);
    const ctx = buildMockContext(mockEmployee);

    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('should allow access when user has required role', () => {
    const reflector = buildReflector(['employee']);
    const guard = new RolesGuard(reflector);
    const ctx = buildMockContext(mockEmployee);

    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('should allow access when user has one of multiple required roles', () => {
    const reflector = buildReflector(['hr_admin', 'hr_manager']);
    const guard = new RolesGuard(reflector);
    const ctx = buildMockContext(mockHrAdmin);

    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('should throw ForbiddenException when user lacks required role', () => {
    const reflector = buildReflector(['hr_admin']);
    const guard = new RolesGuard(reflector);
    const ctx = buildMockContext(mockEmployee);

    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
  });

  it('should throw ForbiddenException when no user on request', () => {
    const reflector = buildReflector(['employee']);
    const guard = new RolesGuard(reflector);
    const ctx = buildMockContext(undefined);

    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
  });

  it('should throw ForbiddenException when user has no roles property', () => {
    const reflector = buildReflector(['employee']);
    const guard = new RolesGuard(reflector);
    const userWithNoRoles = { id: 'EMP001', email: 'test@test.com' } as any;
    const ctx = buildMockContext(userWithNoRoles);

    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
  });

  it('should include required roles in error message', () => {
    const reflector = buildReflector(['hr_admin', 'hr_manager']);
    const guard = new RolesGuard(reflector);
    const ctx = buildMockContext(mockEmployee);

    try {
      guard.canActivate(ctx);
      fail('Should have thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
      expect((error as ForbiddenException).message).toContain('hr_admin');
      expect((error as ForbiddenException).message).toContain('hr_manager');
    }
  });

  it('should check roles from both handler and class via getAllAndOverride', () => {
    const handler = {};
    const cls = {};
    const reflector = buildReflector(['employee']);
    const guard = new RolesGuard(reflector);
    const ctx = buildMockContext(mockEmployee, handler, cls);

    guard.canActivate(ctx);

    expect(reflector.getAllAndOverride).toHaveBeenCalledWith(ROLES_KEY, [handler, cls]);
  });
});
