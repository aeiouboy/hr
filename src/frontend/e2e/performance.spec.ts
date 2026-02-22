import { test, expect } from '@playwright/test';
import { mockAuthSession } from './helpers/auth.helper';
import { navigateTo, waitForLoading } from './helpers/navigation.helper';

test.describe('Performance Management', () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page, 'employee');
  });

  test('should display goal setting page', async ({ page }) => {
    await navigateTo(page, '/performance');
    await waitForLoading(page);
    await expect(
      page.getByText(/goal|objective|performance/i).first(),
    ).toBeVisible();
  });

  test('should open self-evaluation form', async ({ page }) => {
    await navigateTo(page, '/performance');
    await waitForLoading(page);
    const selfEvalBtn = page.locator(
      '[data-testid="self-eval"], button:has-text("Self"), a:has-text("Evaluation")',
    ).first();
    if (await selfEvalBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await selfEvalBtn.click();
      await expect(page.getByText(/evaluation|assess/i).first()).toBeVisible();
    }
  });

  test('should display scorecard view', async ({ page }) => {
    await navigateTo(page, '/profile/scorecard');
    await waitForLoading(page);
    await expect(
      page.getByText(/scorecard|score|rating/i).first(),
    ).toBeVisible();
  });

  test('should show 9-box grid for managers', async ({ page }) => {
    await mockAuthSession(page, 'manager');
    await navigateTo(page, '/talent-management');
    await waitForLoading(page);
    const grid = page.locator(
      '[data-testid="nine-box"], [data-testid="9-box"], .grid',
    ).first();
    await expect(grid).toBeVisible({ timeout: 5000 });
  });

  test('should display succession planning', async ({ page }) => {
    await mockAuthSession(page, 'hr_admin');
    await navigateTo(page, '/succession');
    await waitForLoading(page);
    await expect(
      page.getByText(/succession|planning|successor/i).first(),
    ).toBeVisible();
  });

  test('should manage IDP (Individual Development Plan)', async ({ page }) => {
    await navigateTo(page, '/idp');
    await waitForLoading(page);
    await expect(
      page.getByText(/development|IDP|plan/i).first(),
    ).toBeVisible();
  });

  test('should access talent management dashboard', async ({ page }) => {
    await mockAuthSession(page, 'hr_admin');
    await navigateTo(page, '/talent-management');
    await waitForLoading(page);
    await expect(
      page.getByText(/talent|management/i).first(),
    ).toBeVisible();
  });
});
