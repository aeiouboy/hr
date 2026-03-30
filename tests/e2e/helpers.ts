import { type Page } from '@playwright/test';

export type UserRole = 'employee' | 'manager' | 'hr_admin' | 'hr_manager';

/**
 * Set the user role by modifying MockEmployeeData before the app loads.
 */
export async function setUserRole(page: Page, role: UserRole) {
  await page.addInitScript((r) => {
    (window as any).__TEST_ROLE__ = r;
  }, role);

  // After navigation, inject the role change
  page.on('load', async () => {
    await page.evaluate((r) => {
      if ((window as any).MockEmployeeData) {
        (window as any).MockEmployeeData.currentUser.role = r;
      }
    }, role);
  });
}

/**
 * Navigate to the app and wait for it to fully load.
 */
export async function navigateAndWait(page: Page, hash = '#/home') {
  await page.goto(`/${hash.startsWith('#') ? hash : '#/' + hash}`);
  // Wait for the app to initialize
  await page.waitForFunction(() => {
    return (window as any).AppState && (window as any).AppState.get('currentUser') !== null;
  }, { timeout: 10000 });
  // Small delay for rendering
  await page.waitForTimeout(500);
}

/**
 * Navigate and set a specific role.
 */
export async function navigateWithRole(page: Page, role: UserRole, hash = '#/home') {
  await page.goto('/');
  // Wait for app to load
  await page.waitForFunction(() => {
    return (window as any).AppState && (window as any).AppState.get('currentUser') !== null;
  }, { timeout: 10000 });

  // Switch role
  await page.evaluate((r) => {
    (window as any).MockEmployeeData.currentUser.role = r;
    const user = (window as any).AppState.get('currentUser');
    user.role = r;
    (window as any).AppState.set('currentUser', user);
  }, role);

  // Navigate to target page
  await page.evaluate((h) => {
    window.location.hash = h;
  }, hash);
  await page.waitForTimeout(800);
}

/**
 * Toggle language and wait for re-render.
 */
export async function toggleLanguage(page: Page) {
  await page.evaluate(() => {
    (window as any).i18n.toggleLanguage();
  });
  await page.waitForTimeout(600);
}

/**
 * Get the current language.
 */
export async function getCurrentLanguage(page: Page): Promise<string> {
  return page.evaluate(() => (window as any).AppState.get('language'));
}

/**
 * Navigate to a hash route.
 */
export async function navigateTo(page: Page, hash: string) {
  await page.evaluate((h) => {
    window.location.hash = h;
  }, hash);
  await page.waitForTimeout(800);
}
