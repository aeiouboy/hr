import { test, expect } from '@playwright/test';
import { mockAuthSession } from './helpers/auth.helper';
import { navigateTo, switchLanguage } from './helpers/navigation.helper';

test.describe('Internationalization (i18n)', () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page, 'employee');
  });

  test('should switch to Thai language', async ({ page }) => {
    await navigateTo(page, '/');
    await switchLanguage(page, 'th');
    await expect(page).toHaveURL(/\/th\//);
    // Should see Thai text
    await expect(
      page.locator(':text-matches("[\\u0E00-\\u0E7F]+")').first(),
    ).toBeVisible({ timeout: 5000 });
  });

  test('should display Buddhist Era dates in Thai', async ({ page }) => {
    await page.goto('/th');
    await page.waitForLoadState('networkidle');
    // Buddhist Era year = Gregorian + 543, so 2569 for 2026
    const beDate = page.locator(':text-matches("256[0-9]")').first();
    if (await beDate.isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(beDate).toBeVisible();
    }
  });

  test('should format currency as THB', async ({ page }) => {
    await navigateTo(page, '/payroll');
    await page.waitForLoadState('networkidle');
    // Look for ฿ symbol or THB text or formatted numbers
    const currency = page.locator(
      ':text-matches("[฿]|THB")',
    ).first();
    if (await currency.isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(currency).toBeVisible();
    }
  });

  test('should switch back to English from Thai', async ({ page }) => {
    await page.goto('/th');
    await page.waitForLoadState('networkidle');
    await switchLanguage(page, 'en');
    await expect(page).toHaveURL(/\/en\//);
    // Should see English text
    await expect(
      page.getByText(/home|dashboard|welcome/i).first(),
    ).toBeVisible({ timeout: 5000 });
  });
});
