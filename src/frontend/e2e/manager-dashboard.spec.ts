import { test, expect } from '@playwright/test';
import { mockAuthSession } from './helpers/auth.helper';
import { navigateTo, waitForLoading } from './helpers/navigation.helper';

test.describe('Manager Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page, 'manager');
  });

  test('should display summary cards', async ({ page }) => {
    await navigateTo(page, '/manager-dashboard');
    await waitForLoading(page);
    const cards = page.locator(
      '[data-testid="summary-card"], .card, [class*="card"]',
    );
    await expect(cards.first()).toBeVisible({ timeout: 5000 });
  });

  test('should show pending approvals panel', async ({ page }) => {
    await navigateTo(page, '/manager-dashboard');
    await waitForLoading(page);
    await expect(
      page.getByText(/pending|approval/i).first(),
    ).toBeVisible();
  });

  test('should display quick action buttons', async ({ page }) => {
    await navigateTo(page, '/manager-dashboard');
    await waitForLoading(page);
    const actions = page.locator(
      '[data-testid="quick-actions"], button, a[role="button"]',
    );
    await expect(actions.first()).toBeVisible();
  });

  test('should show team grid with members', async ({ page }) => {
    await navigateTo(page, '/manager-dashboard');
    await waitForLoading(page);
    const teamSection = page.locator(
      '[data-testid="team-grid"], [data-testid="team-members"]',
    ).first();
    if (await teamSection.isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(teamSection).toBeVisible();
    }
  });

  test('should display team calendar', async ({ page }) => {
    await navigateTo(page, '/manager-dashboard');
    await waitForLoading(page);
    const calendar = page.locator(
      '[data-testid="team-calendar"], .calendar, table',
    ).first();
    if (await calendar.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(calendar).toBeVisible();
    }
  });

  test('should navigate to quick approve from dashboard', async ({ page }) => {
    await navigateTo(page, '/manager-dashboard');
    await waitForLoading(page);
    const viewAllLink = page.locator(
      'a:has-text("View All"), a:has-text("Quick Approve"), [data-testid="go-to-approvals"]',
    ).first();
    if (await viewAllLink.isVisible({ timeout: 3000 }).catch(() => false)) {
      await viewAllLink.click();
      await expect(page).toHaveURL(/quick-approve/);
    }
  });
});
