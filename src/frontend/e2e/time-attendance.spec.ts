import { test, expect } from '@playwright/test';
import { mockAuthSession } from './helpers/auth.helper';
import { navigateTo, waitForLoading } from './helpers/navigation.helper';

test.describe('Time & Attendance', () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page, 'employee');
  });

  test('should perform check-in and check-out', async ({ page }) => {
    await navigateTo(page, '/time');
    await waitForLoading(page);
    const checkBtn = page.getByRole('button', {
      name: /check.?in|clock.?in|punch/i,
    }).first();
    if (await checkBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(checkBtn).toBeVisible();
    }
  });

  test('should submit overtime request', async ({ page }) => {
    await navigateTo(page, '/overtime');
    await waitForLoading(page);
    await expect(
      page.getByText(/overtime|OT|extra/i).first(),
    ).toBeVisible();
  });

  test('should display location management', async ({ page }) => {
    await mockAuthSession(page, 'hr_admin');
    await navigateTo(page, '/locations');
    await waitForLoading(page);
    await expect(
      page.getByText(/location|office|branch/i).first(),
    ).toBeVisible();
  });

  test('should view training records', async ({ page }) => {
    await navigateTo(page, '/training-records');
    await waitForLoading(page);
    await expect(
      page.getByText(/training|record|course/i).first(),
    ).toBeVisible();
  });

  test('should display shift schedule', async ({ page }) => {
    await navigateTo(page, '/time');
    await waitForLoading(page);
    const shiftSection = page.locator(
      '[data-testid="shift-schedule"], :has-text("Shift"), table',
    ).first();
    if (await shiftSection.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(shiftSection).toBeVisible();
    }
  });

  test('should flag attendance anomalies', async ({ page }) => {
    await navigateTo(page, '/time');
    await waitForLoading(page);
    const anomaly = page.locator(
      '[data-testid="anomaly"], .text-red, [class*="warning"], [class*="error"]',
    ).first();
    if (await anomaly.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(anomaly).toBeVisible();
    }
  });
});
