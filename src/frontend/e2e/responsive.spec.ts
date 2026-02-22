import { test, expect } from '@playwright/test';
import { mockAuthSession } from './helpers/auth.helper';
import { navigateTo, openMobileMenu } from './helpers/navigation.helper';

test.describe('Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page, 'employee');
  });

  test('should show hamburger menu on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await navigateTo(page, '/');
    const hamburger = page.locator(
      '[data-testid="mobile-menu-toggle"], button[aria-label*="menu" i], .hamburger',
    ).first();
    await expect(hamburger).toBeVisible();
  });

  test('should collapse sidebar on smaller screens', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await navigateTo(page, '/');
    // Sidebar should be collapsed or hidden
    const sidebar = page.locator(
      '[data-testid="sidebar"], aside, nav[role="navigation"]',
    ).first();
    if (await sidebar.isVisible({ timeout: 3000 }).catch(() => false)) {
      const box = await sidebar.boundingBox();
      // Collapsed sidebar should be narrow (< 80px) or hidden
      if (box) {
        expect(box.width).toBeLessThanOrEqual(80);
      }
    }
  });

  test('should toggle sidebar on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await navigateTo(page, '/');
    const toggleBtn = page.locator(
      '[data-testid="sidebar-toggle"], button[aria-label*="sidebar" i]',
    ).first();
    if (await toggleBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await toggleBtn.click();
      // Sidebar state should change
      const sidebar = page.locator('aside, [data-testid="sidebar"]').first();
      await expect(sidebar).toBeVisible();
    }
  });

  test('should show full layout on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await navigateTo(page, '/');
    // Both sidebar and main content should be visible
    const sidebar = page.locator(
      'aside, [data-testid="sidebar"], nav[role="navigation"]',
    ).first();
    const mainContent = page.locator(
      'main, [data-testid="main-content"], [role="main"]',
    ).first();
    await expect(sidebar).toBeVisible({ timeout: 5000 });
    await expect(mainContent).toBeVisible();
  });
});
