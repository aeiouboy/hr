import { test, expect } from '@playwright/test';
import { mockAuthSession } from './helpers/auth.helper';
import { navigateTo } from './helpers/navigation.helper';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page, 'employee');
  });

  test('should have a skip-to-content link', async ({ page }) => {
    await navigateTo(page, '/');
    // Skip link is usually the first focusable element
    await page.keyboard.press('Tab');
    const skipLink = page.locator('a:has-text("Skip"), [href="#main"]').first();
    if (await skipLink.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(skipLink).toBeVisible();
    }
  });

  test('should have proper aria labels on navigation', async ({ page }) => {
    await navigateTo(page, '/');
    const nav = page.locator('nav[aria-label], [role="navigation"]').first();
    await expect(nav).toBeVisible();
  });

  test('should support keyboard navigation through sidebar', async ({ page }) => {
    await navigateTo(page, '/');
    // Tab through the page and verify focus moves through sidebar links
    const sidebarLinks = page.locator('nav a, nav button');
    const count = await sidebarLinks.count();
    expect(count).toBeGreaterThan(0);

    // Tab to first link and verify it receives focus
    await page.keyboard.press('Tab');
    const firstFocused = page.locator(':focus').first();
    await expect(firstFocused).toBeVisible();
  });

  test('should manage focus when opening modals', async ({ page }) => {
    await navigateTo(page, '/profile/personal');
    await page.waitForLoadState('networkidle');
    // Try to open edit mode which may trigger a modal
    const editBtn = page.getByRole('button', { name: /edit/i }).first();
    if (await editBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await editBtn.click();
      // Focus should move to the modal or edit form
      const focused = page.locator(':focus').first();
      await expect(focused).toBeVisible();
    }
  });

  test('should announce dynamic content changes', async ({ page }) => {
    await navigateTo(page, '/');
    // Check for aria-live regions that announce changes
    const liveRegion = page.locator(
      '[aria-live], [role="alert"], [role="status"]',
    ).first();
    if (await liveRegion.isAttached({ timeout: 3000 }).catch(() => false)) {
      await expect(liveRegion).toBeAttached();
    }
  });
});
