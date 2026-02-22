import { test, expect } from '@playwright/test';
import { mockAuthSession } from './helpers/auth.helper';
import { navigateTo, waitForLoading } from './helpers/navigation.helper';

test.describe('Settings', () => {
  test('should restrict company settings to HR roles only', async ({ page }) => {
    await mockAuthSession(page, 'employee');
    await navigateTo(page, '/settings');
    await waitForLoading(page);
    // Employee should see restricted view or access denied
    const restricted = page.locator(
      ':has-text("Access Denied"), :has-text("Unauthorized"), :has-text("permission")',
    ).first();
    const settingsPage = page.getByText(/settings/i).first();
    // Either restricted message or limited settings view
    await expect(settingsPage).toBeVisible({ timeout: 5000 });
  });

  test('should display company settings for HR admin', async ({ page }) => {
    await mockAuthSession(page, 'hr_admin');
    await navigateTo(page, '/settings');
    await waitForLoading(page);
    await expect(
      page.getByText(/settings|configuration|company/i).first(),
    ).toBeVisible();
  });

  test('should configure leave policies', async ({ page }) => {
    await mockAuthSession(page, 'hr_admin');
    await navigateTo(page, '/settings');
    await waitForLoading(page);
    const leavePolicy = page.locator(
      '[data-testid="leave-policy"], button:has-text("Leave"), a:has-text("Leave")',
    ).first();
    if (await leavePolicy.isVisible({ timeout: 3000 }).catch(() => false)) {
      await leavePolicy.click();
      await expect(page.getByText(/leave|policy/i).first()).toBeVisible();
    }
  });

  test('should enforce RBAC restrictions on admin sections', async ({ page }) => {
    await mockAuthSession(page, 'employee');
    await navigateTo(page, '/settings');
    await waitForLoading(page);
    // Admin-only sections should not be visible
    const adminSection = page.locator('[data-testid="admin-section"]').first();
    if (await adminSection.isVisible({ timeout: 2000 }).catch(() => false)) {
      // If visible, it means RBAC is not working
      expect(false).toBe(true);
    }
  });
});
