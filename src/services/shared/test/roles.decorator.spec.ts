import 'reflect-metadata';
import { Roles, ROLES_KEY } from '../src/decorators/roles.decorator';

describe('Roles Decorator', () => {
  describe('ROLES_KEY', () => {
    it('should be the string "roles"', () => {
      expect(ROLES_KEY).toBe('roles');
    });
  });

  describe('@Roles decorator', () => {
    it('should set metadata on a class method', () => {
      class TestController {
        @Roles('hr_admin')
        hrOnlyMethod() {}
      }

      const metadata = Reflect.getMetadata(ROLES_KEY, TestController.prototype.hrOnlyMethod);
      expect(metadata).toEqual(['hr_admin']);
    });

    it('should support multiple roles', () => {
      class TestController {
        @Roles('hr_admin', 'hr_manager')
        multiRoleMethod() {}
      }

      const metadata = Reflect.getMetadata(ROLES_KEY, TestController.prototype.multiRoleMethod);
      expect(metadata).toEqual(['hr_admin', 'hr_manager']);
    });

    it('should support single role', () => {
      class TestController {
        @Roles('employee')
        employeeMethod() {}
      }

      const metadata = Reflect.getMetadata(ROLES_KEY, TestController.prototype.employeeMethod);
      expect(metadata).toEqual(['employee']);
    });

    it('should support all system roles', () => {
      class TestController {
        @Roles('employee', 'manager', 'hr_admin', 'hr_manager')
        allRolesMethod() {}
      }

      const metadata = Reflect.getMetadata(ROLES_KEY, TestController.prototype.allRolesMethod);
      expect(metadata).toContain('employee');
      expect(metadata).toContain('manager');
      expect(metadata).toContain('hr_admin');
      expect(metadata).toContain('hr_manager');
    });

    it('should apply different roles to different methods independently', () => {
      class TestController {
        @Roles('employee')
        employeeMethod() {}

        @Roles('hr_admin')
        hrMethod() {}
      }

      const employeeMetadata = Reflect.getMetadata(ROLES_KEY, TestController.prototype.employeeMethod);
      const hrMetadata = Reflect.getMetadata(ROLES_KEY, TestController.prototype.hrMethod);

      expect(employeeMetadata).toEqual(['employee']);
      expect(hrMetadata).toEqual(['hr_admin']);
    });

    it('should return a function (decorator factory)', () => {
      const decorator = Roles('hr_admin');
      expect(typeof decorator).toBe('function');
    });
  });
});
