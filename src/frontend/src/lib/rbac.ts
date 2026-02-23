export type Role = 'employee' | 'manager' | 'hr_admin' | 'hr_manager';

// Role hierarchy: hr_manager > hr_admin > manager > employee
const ROLE_HIERARCHY: Record<Role, Role[]> = {
  hr_manager: ['hr_admin', 'manager', 'employee'],
  hr_admin: ['manager', 'employee'],
  manager: ['employee'],
  employee: [],
};

const MODULE_ACCESS: Record<string, Role[]> = {
  profile: ['employee', 'manager', 'hr_admin', 'hr_manager'],
  leave: ['employee', 'manager', 'hr_admin', 'hr_manager'],
  payslip: ['employee', 'manager', 'hr_admin', 'hr_manager'],
  performance: ['employee', 'manager', 'hr_admin', 'hr_manager'],
  workflows: ['employee', 'manager', 'hr_admin', 'hr_manager'],
  home: ['employee', 'manager', 'hr_admin', 'hr_manager'],
  'payroll-setup': ['hr_admin', 'hr_manager'],
  'payroll-processing': ['hr_admin', 'hr_manager'],
  'time-management': ['hr_admin', 'hr_manager'],
  'government-reports': ['hr_admin', 'hr_manager'],
  settings: ['hr_admin', 'hr_manager'],
  'manager-dashboard': ['manager', 'hr_admin', 'hr_manager'],
  recruitment: ['hr_admin', 'hr_manager'],
  'candidate-screening': ['hr_admin', 'hr_manager'],
  onboarding: ['hr_admin', 'hr_manager'],
  resignation: ['hr_admin', 'hr_manager'],
  'talent-management': ['hr_admin', 'hr_manager'],
  learning: ['employee', 'manager', 'hr_admin', 'hr_manager'],
  idp: ['employee', 'manager', 'hr_admin', 'hr_manager'],
  'training-records': ['employee', 'manager', 'hr_admin', 'hr_manager'],
  'succession-planning': ['hr_admin', 'hr_manager'],
  'org-chart': ['employee', 'manager', 'hr_admin', 'hr_manager'],
  positions: ['hr_admin', 'hr_manager'],
  'transfer-request': ['hr_admin', 'hr_manager'],
  locations: ['hr_admin', 'hr_manager'],
  overtime: ['hr_admin', 'hr_manager'],
  'smart-claims': ['employee', 'manager', 'hr_admin', 'hr_manager'],
  'quick-approve': ['manager', 'hr_admin', 'hr_manager'],
  'hospital-referral': ['employee', 'manager', 'hr_admin', 'hr_manager'],
};

export function hasRole(userRoles: Role[], required: Role): boolean {
  return userRoles.some((role) => {
    if (role === required) return true;
    return ROLE_HIERARCHY[role]?.includes(required) ?? false;
  });
}

export function hasAnyRole(userRoles: Role[], required: Role[]): boolean {
  return required.some((role) => hasRole(userRoles, role));
}

export function canAccessModule(userRoles: Role[], module: string): boolean {
  const allowedRoles = MODULE_ACCESS[module];
  if (!allowedRoles) return false;
  return hasAnyRole(userRoles, allowedRoles);
}

export function getHighestRole(userRoles: Role[]): Role {
  const priority: Role[] = ['hr_manager', 'hr_admin', 'manager', 'employee'];
  for (const role of priority) {
    if (userRoles.includes(role)) return role;
  }
  return 'employee';
}

export function isManager(userRoles: Role[]): boolean {
  return hasRole(userRoles, 'manager');
}

export function isHR(userRoles: Role[]): boolean {
  return hasRole(userRoles, 'hr_admin');
}
