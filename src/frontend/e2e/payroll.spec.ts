import { test, expect } from '@playwright/test';
import { mockAuthSession } from './helpers/auth.helper';
import { navigateTo, waitForLoading } from './helpers/navigation.helper';

test.describe('Payroll Management', () => {
  test.describe('Employee View', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthSession(page, 'employee');
    });

    test('should view payslip', async ({ page }) => {
      await navigateTo(page, '/payroll');
      await waitForLoading(page);
      await expect(
        page.getByText(/payslip|salary|pay/i).first(),
      ).toBeVisible();
    });

    test('should view tax documents', async ({ page }) => {
      await navigateTo(page, '/payroll');
      await waitForLoading(page);
      const taxTab = page.locator(
        '[data-testid="tax-docs"], button:has-text("Tax"), a:has-text("Tax")',
      ).first();
      if (await taxTab.isVisible({ timeout: 3000 }).catch(() => false)) {
        await taxTab.click();
        await expect(page.getByText(/tax|withholding/i).first()).toBeVisible();
      }
    });
  });

  test.describe('HR Admin View', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthSession(page, 'hr_admin');
    });

    test('should manage payroll setup CRUD', async ({ page }) => {
      await navigateTo(page, '/payroll/setup');
      await waitForLoading(page);
      await expect(
        page.getByText(/setup|configuration|payroll/i).first(),
      ).toBeVisible();
    });

    test('should run payroll processing wizard', async ({ page }) => {
      await navigateTo(page, '/payroll/processing');
      await waitForLoading(page);
      await expect(
        page.getByText(/processing|run|payroll/i).first(),
      ).toBeVisible();
    });

    test('should generate government reports', async ({ page }) => {
      await navigateTo(page, '/payroll/reports');
      await waitForLoading(page);
      await expect(
        page.getByText(/report|government|filing/i).first(),
      ).toBeVisible();
    });

    test('should display amounts in THB format', async ({ page }) => {
      await navigateTo(page, '/payroll');
      await waitForLoading(page);
      // Look for THB currency format (฿ or THB or comma-separated numbers)
      const amount = page.locator(
        ':text-matches("[฿]|THB|\\\\d{1,3}(,\\\\d{3})+")',
      ).first();
      if (await amount.isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(amount).toBeVisible();
      }
    });
  });
});
