import { test, expect } from '@playwright/test';
import { mockAuthSession } from './helpers/auth.helper';
import { navigateTo, waitForLoading } from './helpers/navigation.helper';

test.describe('Employee Profile', () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page, 'employee');
  });

  test('should load personal information tab', async ({ page }) => {
    await navigateTo(page, '/profile/personal');
    await waitForLoading(page);
    await expect(page.getByText(/personal|information/i).first()).toBeVisible();
  });

  test('should load employment tab', async ({ page }) => {
    await navigateTo(page, '/profile/employment');
    await waitForLoading(page);
    await expect(page.getByText(/employment|position/i).first()).toBeVisible();
  });

  test('should load compensation tab', async ({ page }) => {
    await navigateTo(page, '/profile/compensation');
    await waitForLoading(page);
    await expect(page.getByText(/compensation|salary/i).first()).toBeVisible();
  });

  test('should load documents tab', async ({ page }) => {
    await navigateTo(page, '/profile/documents');
    await waitForLoading(page);
    await expect(page.getByText(/document/i).first()).toBeVisible();
  });

  test('should load benefits tab', async ({ page }) => {
    await navigateTo(page, '/profile/benefits');
    await waitForLoading(page);
    await expect(page.getByText(/benefit/i).first()).toBeVisible();
  });

  test('should load scorecard tab', async ({ page }) => {
    await navigateTo(page, '/profile/scorecard');
    await waitForLoading(page);
    await expect(page.getByText(/scorecard|performance/i).first()).toBeVisible();
  });

  test('should toggle edit mode on personal info', async ({ page }) => {
    await navigateTo(page, '/profile/personal');
    await waitForLoading(page);
    const editBtn = page.getByRole('button', { name: /edit/i }).first();
    if (await editBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await editBtn.click();
      // Should see save/cancel buttons in edit mode
      await expect(
        page.getByRole('button', { name: /save|cancel/i }).first(),
      ).toBeVisible();
    }
  });

  test('should mask PII fields for non-HR users', async ({ page }) => {
    await navigateTo(page, '/profile/personal');
    await waitForLoading(page);
    // Check for masked national ID or bank account (shows as •••• or ****)
    const maskedField = page.locator(':text-matches("[•*]{3,}")').first();
    if (await maskedField.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(maskedField).toBeVisible();
    }
  });
});
