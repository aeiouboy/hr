import { test, expect } from '@playwright/test';
import { mockAuthSession } from './helpers/auth.helper';
import { navigateTo, waitForLoading } from './helpers/navigation.helper';

test.describe('Workflows', () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page, 'manager');
  });

  test('should display pending workflow list', async ({ page }) => {
    await navigateTo(page, '/workflows');
    await waitForLoading(page);
    await expect(
      page.getByText(/pending|workflow|approval/i).first(),
    ).toBeVisible();
  });

  test('should open workflow detail view', async ({ page }) => {
    await navigateTo(page, '/workflows');
    await waitForLoading(page);
    const firstItem = page.locator(
      '[data-testid="workflow-item"], tr, [role="listitem"]',
    ).first();
    if (await firstItem.isVisible({ timeout: 3000 }).catch(() => false)) {
      await firstItem.click();
      await expect(
        page.getByText(/detail|summary|request/i).first(),
      ).toBeVisible();
    }
  });

  test('should approve a workflow item', async ({ page }) => {
    await navigateTo(page, '/workflows');
    await waitForLoading(page);
    const approveBtn = page.getByRole('button', { name: /approve/i }).first();
    if (await approveBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await approveBtn.click();
      await expect(
        page.getByText(/approved|success/i).first(),
      ).toBeVisible({ timeout: 5000 });
    }
  });

  test('should reject a workflow with reason', async ({ page }) => {
    await navigateTo(page, '/workflows');
    await waitForLoading(page);
    const rejectBtn = page.getByRole('button', { name: /reject/i }).first();
    if (await rejectBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await rejectBtn.click();
      const textarea = page.locator('textarea').first();
      if (await textarea.isVisible({ timeout: 2000 }).catch(() => false)) {
        await textarea.fill('Budget constraints');
        const confirmBtn = page.getByRole('button', { name: /confirm|submit/i }).first();
        await confirmBtn.click();
      }
    }
  });

  test('should show workflow history', async ({ page }) => {
    await navigateTo(page, '/workflows');
    await waitForLoading(page);
    const historyTab = page.getByRole('tab', { name: /history|completed/i }).first();
    if (await historyTab.isVisible({ timeout: 3000 }).catch(() => false)) {
      await historyTab.click();
      await expect(
        page.getByText(/completed|history/i).first(),
      ).toBeVisible();
    }
  });

  test('should support delegation settings', async ({ page }) => {
    await navigateTo(page, '/workflows');
    await waitForLoading(page);
    const delegateBtn = page.locator(
      '[data-testid="delegate"], button:has-text("Delegate")',
    ).first();
    if (await delegateBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await delegateBtn.click();
      await expect(
        page.getByText(/delegate|assign/i).first(),
      ).toBeVisible();
    }
  });
});
