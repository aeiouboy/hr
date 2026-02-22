import { type Page } from '@playwright/test';

export type UserRole = 'employee' | 'manager' | 'hr_admin' | 'hr_manager';

interface TestUser {
  username: string;
  password: string;
  name: string;
  employeeId: string;
  roles: string[];
}

const TEST_USERS: Record<UserRole, TestUser> = {
  employee: {
    username: 'emp.test@central.co.th',
    password: 'Test1234!',
    name: 'Somchai Jaidee',
    employeeId: 'EMP001',
    roles: ['employee'],
  },
  manager: {
    username: 'mgr.test@central.co.th',
    password: 'Test1234!',
    name: 'Siriporn Sukjai',
    employeeId: 'MGR001',
    roles: ['employee', 'manager'],
  },
  hr_admin: {
    username: 'hr.admin@central.co.th',
    password: 'Test1234!',
    name: 'Narong Prasert',
    employeeId: 'HRA001',
    roles: ['employee', 'hr_admin'],
  },
  hr_manager: {
    username: 'hr.mgr@central.co.th',
    password: 'Test1234!',
    name: 'Wipada Thongchai',
    employeeId: 'HRM001',
    roles: ['employee', 'hr_admin', 'hr_manager'],
  },
};

/**
 * Login as a specific role via the sign-in page.
 */
export async function loginAs(page: Page, role: UserRole): Promise<TestUser> {
  const user = TEST_USERS[role];
  await page.goto('/auth/signin');
  await page.getByLabel(/email|username/i).fill(user.username);
  await page.getByLabel(/password/i).fill(user.password);
  await page.getByRole('button', { name: /sign in|log in/i }).click();
  await page.waitForURL('**/en/**', { timeout: 10_000 });
  return user;
}

/**
 * Login and store auth state for reuse across tests.
 */
export async function loginAndSaveState(
  page: Page,
  role: UserRole,
  storagePath: string,
): Promise<void> {
  await loginAs(page, role);
  await page.context().storageState({ path: storagePath });
}

/**
 * Mock the auth session by setting cookies/storage directly (faster than UI login).
 */
export async function mockAuthSession(
  page: Page,
  role: UserRole,
): Promise<TestUser> {
  const user = TEST_USERS[role];
  // Set a mock session cookie that next-auth recognizes in dev mode
  await page.context().addCookies([
    {
      name: 'next-auth.session-token',
      value: `mock-session-${role}-${Date.now()}`,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    },
  ]);
  // Mock the session API endpoint
  await page.route('**/api/auth/session', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user: {
          id: user.employeeId,
          name: user.name,
          email: user.username,
          roles: user.roles,
        },
        expires: new Date(Date.now() + 86400000).toISOString(),
        accessToken: `mock-token-${role}`,
      }),
    }),
  );
  return user;
}

export function getTestUser(role: UserRole): TestUser {
  return TEST_USERS[role];
}
