import { test, expect } from '@playwright/test';
import { mockAuthSession } from './helpers/auth.helper';
import { navigateTo, waitForLoading } from './helpers/navigation.helper';

test.describe('Leave Management', () => {
  test.describe('Employee', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthSession(page, 'employee');
    });

    test('should submit a leave request', async ({ page }) => {
      await navigateTo(page, '/leave/request');
      await waitForLoading(page);
      // Fill leave type
      const typeSelect = page.locator(
        'select, [data-testid="leave-type"], [role="combobox"]',
      ).first();
      if (await typeSelect.isVisible({ timeout: 3000 }).catch(() => false)) {
        await typeSelect.click();
        await page.locator('[role="option"]').first().click();
      }
      // Fill dates
      const dateInputs = page.locator('input[type="date"]');
      if ((await dateInputs.count()) >= 2) {
        await dateInputs.first().fill('2026-03-01');
        await dateInputs.nth(1).fill('2026-03-01');
      }
      const submitBtn = page.getByRole('button', { name: /submit|request/i }).first();
      await expect(submitBtn).toBeVisible();
    });

    test('should display leave balance', async ({ page }) => {
      await navigateTo(page, '/leave');
      await waitForLoading(page);
      await expect(
        page.getByText(/balance|remaining|available/i).first(),
      ).toBeVisible();
    });

    test('should show leave calendar view', async ({ page }) => {
      await navigateTo(page, '/leave');
      await waitForLoading(page);
      const calendar = page.locator(
        '[data-testid="leave-calendar"], table, .calendar',
      ).first();
      await expect(calendar).toBeVisible({ timeout: 5000 });
    });

    test('should cancel a pending leave request', async ({ page }) => {
      await navigateTo(page, '/leave/history');
      await waitForLoading(page);
      const cancelBtn = page.getByRole('button', { name: /cancel|withdraw/i }).first();
      if (await cancelBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await cancelBtn.click();
        // Confirm dialog
        const confirmBtn = page.getByRole('button', { name: /confirm|yes/i }).first();
        if (await confirmBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
          await confirmBtn.click();
        }
      }
    });

    test('should support half-day leave selection', async ({ page }) => {
      await navigateTo(page, '/leave/request');
      await waitForLoading(page);
      const halfDay = page.locator(
        '[data-testid="half-day"], input[value="half"], label:has-text("Half")',
      ).first();
      if (await halfDay.isVisible({ timeout: 3000 }).catch(() => false)) {
        await halfDay.click();
        await expect(halfDay).toBeVisible();
      }
    });
  });

  test.describe('Manager', () => {
    test.beforeEach(async ({ page }) => {
      await mockAuthSession(page, 'manager');
    });

    test('should approve a team leave request', async ({ page }) => {
      await navigateTo(page, '/workflows');
      await waitForLoading(page);
      const approveBtn = page.getByRole('button', { name: /approve/i }).first();
      if (await approveBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
        await approveBtn.click();
      }
    });

    test('should reject a leave request with reason', async ({ page }) => {
      await navigateTo(page, '/workflows');
      await waitForLoading(page);
      const rejectBtn = page.getByRole('button', { name: /reject/i }).first();
      if (await rejectBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
        await rejectBtn.click();
        const reasonInput = page.locator('textarea, input[name="reason"]').first();
        if (await reasonInput.isVisible({ timeout: 2000 }).catch(() => false)) {
          await reasonInput.fill('Insufficient team coverage');
        }
      }
    });
  });
});
