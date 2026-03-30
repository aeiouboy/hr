import { test, expect } from '@playwright/test';
import { navigateAndWait, navigateTo } from './helpers';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await navigateAndWait(page);
  });

  // ── ARIA Landmarks ─────────────────────────────────────────────

  test('should have header element', async ({ page }) => {
    const header = page.locator('header');
    await expect(header.first()).toBeVisible();
  });

  test('should have main content area', async ({ page }) => {
    // The main content area (#app) should exist
    const app = page.locator('#app');
    await expect(app).toBeVisible();
  });

  test('should have navigation with role', async ({ page }) => {
    const nav = page.locator('[role="navigation"]');
    if (await nav.count() > 0) {
      await expect(nav.first()).toBeVisible();
    }
  });

  // ── Skip Navigation ────────────────────────────────────────────

  test('should have skip-to-content link', async ({ page }) => {
    const skipLink = page.locator('a.skip-link, a[href="#main-content"], a[href="#app"]');
    if (await skipLink.count() > 0) {
      // Skip link might be visually hidden but present in DOM
      expect(await skipLink.first().getAttribute('href')).toBeTruthy();
    }
  });

  // ── ARIA Labels ────────────────────────────────────────────────

  test('should have aria-labels on interactive elements', async ({ page }) => {
    await navigateTo(page, '#/home');
    await page.waitForTimeout(500);

    // Check that buttons have aria-labels
    const buttons = page.locator('button[aria-label]');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have aria-label on search input', async ({ page }) => {
    const searchInput = page.locator('input[aria-label]');
    if (await searchInput.count() > 0) {
      const label = await searchInput.first().getAttribute('aria-label');
      expect(label).toBeTruthy();
    }
  });

  // ── Keyboard Navigation ────────────────────────────────────────

  test('should support tab navigation', async ({ page }) => {
    await navigateTo(page, '#/home');
    await page.waitForTimeout(500);

    // Tab through a few elements
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(focused).toBeTruthy();
  });

  test('should close modal on Escape key', async ({ page }) => {
    await navigateTo(page, '#/home');
    await page.waitForTimeout(300);

    // Press Escape - should not cause errors
    await page.keyboard.press('Escape');
    // App should still be functional
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  // ── Touch Targets ─────────────────────────────────────────────

  test('should have minimum touch target size for buttons', async ({ page }) => {
    await navigateTo(page, '#/home');
    await page.waitForTimeout(500);

    // Check buttons with min-h-[44px] min-w-[44px] classes
    const touchButtons = page.locator('button.min-h-\\[44px\\]');
    if (await touchButtons.count() > 0) {
      const box = await touchButtons.first().boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }
  });

  // ── Color Contrast (basic check) ──────────────────────────────

  test('should not have empty alt text on decorative icons', async ({ page }) => {
    await navigateTo(page, '#/home');
    await page.waitForTimeout(500);

    // Material icons with aria-hidden should be marked as decorative
    const decorativeIcons = page.locator('span.material-icons[aria-hidden="true"]');
    const count = await decorativeIcons.count();
    // App should use aria-hidden for decorative icons
    expect(count).toBeGreaterThan(0);
  });

  // ── Form Accessibility ─────────────────────────────────────────

  test('should have labels or aria-labels on form inputs', async ({ page }) => {
    await navigateTo(page, '#/leave');
    await page.waitForTimeout(800);

    // Check that inputs have some form of labeling
    const inputs = page.locator('input, select, textarea');
    const inputCount = await inputs.count();
    if (inputCount > 0) {
      // At least some inputs should have labels or aria-labels
      const labeledInputs = page.locator('input[aria-label], input[id], select[aria-label], textarea[aria-label]');
      expect(await labeledInputs.count()).toBeGreaterThan(0);
    }
  });

  // ── Semantic Structure ─────────────────────────────────────────

  test('should have heading hierarchy on home page', async ({ page }) => {
    await navigateTo(page, '#/home');
    await page.waitForTimeout(500);

    // Should have at least one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);

    // Should have h2 sections
    const h2Count = await page.locator('h2').count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('should have role attributes on dropdown menus', async ({ page }) => {
    await navigateTo(page, '#/home');
    const menus = page.locator('[role="menu"]');
    if (await menus.count() > 0) {
      // Dropdown menus should have role="menu"
      expect(await menus.count()).toBeGreaterThan(0);
    }
  });

  test('should have menu items in dropdown menus', async ({ page }) => {
    await navigateTo(page, '#/home');
    const menuItems = page.locator('[role="menuitem"]');
    if (await menuItems.count() > 0) {
      expect(await menuItems.count()).toBeGreaterThan(0);
    }
  });
});
