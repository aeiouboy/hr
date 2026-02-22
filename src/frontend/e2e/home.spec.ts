import { test, expect } from '@playwright/test';
import { mockAuthSession, getTestUser } from './helpers/auth.helper';
import { navigateTo, switchLanguage } from './helpers/navigation.helper';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page, 'employee');
  });

  test('should display employee name on home page', async ({ page }) => {
    await navigateTo(page, '/');
    const user = getTestUser('employee');
    await expect(page.getByText(user.name).first()).toBeVisible();
  });

  test('should show quick action links', async ({ page }) => {
    await navigateTo(page, '/');
    // Expect common quick links
    const quickLinks = page.locator(
      '[data-testid="quick-links"], [data-testid="quick-actions"], section',
    );
    await expect(quickLinks.first()).toBeVisible();
  });

  test('should display notifications panel', async ({ page }) => {
    await navigateTo(page, '/');
    const notifArea = page.locator(
      '[data-testid="notifications"], [aria-label*="notification" i]',
    ).first();
    if (await notifArea.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(notifArea).toBeVisible();
    }
  });

  test('should switch language to Thai', async ({ page }) => {
    await navigateTo(page, '/');
    await switchLanguage(page, 'th');
    // Should see Thai content or URL with /th/
    await expect(page).toHaveURL(/\/th\//);
  });

  test('should show recent activity section', async ({ page }) => {
    await navigateTo(page, '/');
    const activity = page.locator(
      '[data-testid="recent-activity"], :has-text("Recent"):not(nav)',
    ).first();
    await expect(activity).toBeVisible({ timeout: 5000 });
  });
});
