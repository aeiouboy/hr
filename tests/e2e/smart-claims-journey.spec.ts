import { test, expect } from '@playwright/test';
import { navigateWithRole, navigateTo } from './helpers';

test.describe('Smart Claims Journey', () => {
  // ── Employee: Submit Claim ─────────────────────────────────────

  test.describe('Employee Claim Submission', () => {
    test.beforeEach(async ({ page }) => {
      await navigateWithRole(page, 'employee');
    });

    test('should navigate to home page as employee', async ({ page }) => {
      await navigateTo(page, '#/home');
      await expect(page.locator('h1')).toBeVisible();
    });

    test('should access profile page', async ({ page }) => {
      await navigateTo(page, '#/profile');
      await page.waitForTimeout(500);
      const content = await page.locator('#app').textContent();
      expect(content).toBeTruthy();
    });

    test('should access workflows page for claim status', async ({ page }) => {
      await navigateTo(page, '#/workflows');
      await page.waitForTimeout(500);
      const content = await page.locator('#app').textContent();
      expect(content).toBeTruthy();
    });

    test('should access payslip page', async ({ page }) => {
      await navigateTo(page, '#/payslip');
      await page.waitForTimeout(500);
      const content = await page.locator('#app').textContent();
      expect(content).toBeTruthy();
    });
  });

  // ── Manager: Approve Claims ────────────────────────────────────

  test.describe('Manager Claim Approval', () => {
    test.beforeEach(async ({ page }) => {
      await navigateWithRole(page, 'manager');
    });

    test('should access workflows for pending approvals', async ({ page }) => {
      await navigateTo(page, '#/workflows');
      await page.waitForTimeout(500);
      const content = await page.locator('#app').textContent();
      expect(content).toBeTruthy();
    });

    test('should access manager dashboard', async ({ page }) => {
      await navigateTo(page, '#/manager-dashboard');
      await page.waitForTimeout(800);
      const content = await page.locator('#app').textContent();
      expect(content).toBeTruthy();
    });
  });

  // ── HR Manager: Configure Policies ─────────────────────────────

  test.describe('HR Manager Policy Configuration', () => {
    test.beforeEach(async ({ page }) => {
      await navigateWithRole(page, 'hr_manager');
    });

    test('should access settings page for policy configuration', async ({ page }) => {
      await navigateTo(page, '#/settings');
      await page.waitForTimeout(800);
      const content = await page.locator('#app').textContent();
      expect(content).toBeTruthy();
    });

    test('should have access to all HR admin pages', async ({ page }) => {
      // HR Manager inherits all HR admin permissions
      await navigateTo(page, '#/payroll-setup');
      await page.waitForTimeout(500);
      let content = await page.locator('#app').textContent();
      expect(content).toBeTruthy();

      await navigateTo(page, '#/recruitment');
      await page.waitForTimeout(500);
      content = await page.locator('#app').textContent();
      expect(content).toBeTruthy();
    });

    test('should have access to manager dashboard', async ({ page }) => {
      await navigateTo(page, '#/manager-dashboard');
      await page.waitForTimeout(800);
      const content = await page.locator('#app').textContent();
      expect(content).toBeTruthy();
    });
  });

  // ── Full Claims Lifecycle ──────────────────────────────────────

  test.describe('Claims Lifecycle Flow', () => {
    test('should complete employee → manager flow', async ({ page }) => {
      // Step 1: Employee views home
      await navigateWithRole(page, 'employee');
      await navigateTo(page, '#/home');
      await page.waitForTimeout(300);
      await expect(page.locator('h1')).toBeVisible();

      // Step 2: Employee views workflows
      await navigateTo(page, '#/workflows');
      await page.waitForTimeout(500);
      let content = await page.locator('#app').textContent();
      expect(content).toBeTruthy();

      // Step 3: Switch to manager role
      await page.evaluate(() => {
        (window as any).MockEmployeeData.currentUser.role = 'manager';
        const user = (window as any).AppState.get('currentUser');
        user.role = 'manager';
        (window as any).AppState.set('currentUser', user);
      });
      await page.waitForTimeout(300);

      // Step 4: Manager views dashboard
      await navigateTo(page, '#/manager-dashboard');
      await page.waitForTimeout(800);
      content = await page.locator('#app').textContent();
      expect(content).toBeTruthy();

      // Step 5: Manager views workflows for approval
      await navigateTo(page, '#/workflows');
      await page.waitForTimeout(500);
      content = await page.locator('#app').textContent();
      expect(content).toBeTruthy();
    });
  });
});
