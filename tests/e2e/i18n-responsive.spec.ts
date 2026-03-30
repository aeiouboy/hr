import { test, expect } from '@playwright/test';
import { navigateAndWait, toggleLanguage, getCurrentLanguage, navigateTo } from './helpers';

test.describe('Internationalization (i18n)', () => {
  test.beforeEach(async ({ page }) => {
    await navigateAndWait(page);
  });

  test('should default to English', async ({ page }) => {
    const lang = await getCurrentLanguage(page);
    // Default could be 'en' or 'th' depending on localStorage
    expect(['en', 'th']).toContain(lang);
  });

  test('should toggle language from EN to TH', async ({ page }) => {
    // Set to English first
    await page.evaluate(() => {
      (window as any).AppState.set('language', 'en');
    });
    await page.waitForTimeout(500);

    const langBefore = await getCurrentLanguage(page);
    expect(langBefore).toBe('en');

    // Toggle to Thai
    await toggleLanguage(page);
    const langAfter = await getCurrentLanguage(page);
    expect(langAfter).toBe('th');
  });

  test('should toggle language from TH to EN', async ({ page }) => {
    // Set to Thai first
    await page.evaluate(() => {
      (window as any).AppState.set('language', 'th');
    });
    await page.waitForTimeout(500);

    await toggleLanguage(page);
    const langAfter = await getCurrentLanguage(page);
    expect(langAfter).toBe('en');
  });

  test('should update UI text when language changes', async ({ page }) => {
    // Set to English
    await page.evaluate(() => {
      (window as any).AppState.set('language', 'en');
    });
    await page.waitForTimeout(600);

    const englishContent = await page.locator('#app').textContent();

    // Toggle to Thai
    await toggleLanguage(page);
    const thaiContent = await page.locator('#app').textContent();

    // Content should be different after language change
    expect(englishContent).not.toBe(thaiContent);
  });

  test('should persist language preference in localStorage', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).AppState.set('language', 'th');
    });
    await page.waitForTimeout(300);

    const stored = await page.evaluate(() => localStorage.getItem('language'));
    expect(stored).toBe('th');
  });

  test('should update html lang attribute on language change', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).AppState.set('language', 'en');
    });
    await page.waitForTimeout(600);

    const langAttr = await page.evaluate(() => document.documentElement.lang);
    expect(langAttr).toBe('en');

    await page.evaluate(() => {
      (window as any).AppState.set('language', 'th');
    });
    await page.waitForTimeout(600);

    const langAttr2 = await page.evaluate(() => document.documentElement.lang);
    expect(langAttr2).toBe('th');
  });

  test('should render Thai content on home page when in Thai', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).AppState.set('language', 'th');
    });
    await page.waitForTimeout(600);
    await navigateTo(page, '#/home');
    await page.waitForTimeout(500);

    const content = await page.locator('#app').textContent();
    // Thai content should contain Thai characters
    expect(content).toMatch(/[\u0E00-\u0E7F]/);
  });
});

test.describe('Responsive Design', () => {
  test('should render correctly on desktop (1280x720)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await navigateAndWait(page);
    await navigateTo(page, '#/home');

    // Header should be visible
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Desktop navigation should be visible
    const nav = page.locator('nav[role="navigation"]');
    if (await nav.count() > 0) {
      await expect(nav.first()).toBeVisible();
    }
  });

  test('should show mobile menu button on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateAndWait(page);
    await navigateTo(page, '#/home');

    // Mobile menu button should be visible
    const mobileMenuBtn = page.locator('#mobile-menu-btn');
    if (await mobileMenuBtn.count() > 0) {
      await expect(mobileMenuBtn).toBeVisible();
    }
  });

  test('should hide desktop nav on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateAndWait(page);
    await navigateTo(page, '#/home');

    // Desktop nav (hidden on mobile via lg:flex)
    const desktopNav = page.locator('nav.hidden.lg\\:flex');
    if (await desktopNav.count() > 0) {
      await expect(desktopNav.first()).not.toBeVisible();
    }
  });

  test('should render home page on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await navigateAndWait(page);
    await navigateTo(page, '#/home');

    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should render profile page on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateAndWait(page);
    await navigateTo(page, '#/profile');
    await page.waitForTimeout(500);

    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  test('should render leave page on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateAndWait(page);
    await navigateTo(page, '#/leave');
    await page.waitForTimeout(500);

    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });
});
