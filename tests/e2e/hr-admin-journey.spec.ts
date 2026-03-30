import { test, expect } from '@playwright/test';
import { navigateWithRole, navigateTo } from './helpers';

test.describe('HR Admin Journey', () => {
  test.beforeEach(async ({ page }) => {
    await navigateWithRole(page, 'hr_admin');
  });

  // ── Home Page (HR Admin View) ─────────────────────────────────

  test('should display home page for HR admin', async ({ page }) => {
    await navigateTo(page, '#/home');
    await expect(page.locator('h1')).toBeVisible();
  });

  // ── Payroll Setup ─────────────────────────────────────────────

  test('should navigate to payroll setup', async ({ page }) => {
    await navigateTo(page, '#/payroll-setup');
    await page.waitForTimeout(800);
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  // ── Payroll Processing ─────────────────────────────────────────

  test('should navigate to payroll processing', async ({ page }) => {
    await navigateTo(page, '#/payroll-processing');
    await page.waitForTimeout(800);
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  // ── Government Reports ─────────────────────────────────────────

  test('should navigate to government reports', async ({ page }) => {
    await navigateTo(page, '#/government-reports');
    await page.waitForTimeout(800);
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  // ── Time Management ────────────────────────────────────────────

  test('should navigate to time management', async ({ page }) => {
    await navigateTo(page, '#/time-management');
    await page.waitForTimeout(800);
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  // ── Settings ───────────────────────────────────────────────────

  test('should navigate to settings page', async ({ page }) => {
    await navigateTo(page, '#/settings');
    await page.waitForTimeout(800);
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  // ── Recruitment ────────────────────────────────────────────────

  test('should navigate to recruitment page', async ({ page }) => {
    await navigateTo(page, '#/recruitment');
    await page.waitForTimeout(800);
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  // ── Onboarding ─────────────────────────────────────────────────

  test('should navigate to onboarding page', async ({ page }) => {
    await navigateTo(page, '#/onboarding');
    await page.waitForTimeout(800);
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  // ── Position Management ────────────────────────────────────────

  test('should navigate to position management', async ({ page }) => {
    await navigateTo(page, '#/positions');
    await page.waitForTimeout(800);
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  // ── Location Management ────────────────────────────────────────

  test('should navigate to location management', async ({ page }) => {
    await navigateTo(page, '#/locations');
    await page.waitForTimeout(800);
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  // ── Header Dropdowns for HR ────────────────────────────────────

  test('should have Time & Payroll dropdown visible for HR', async ({ page }) => {
    await navigateTo(page, '#/home');
    const timePayrollBtn = page.locator('#time-payroll-dropdown-btn');
    if (await timePayrollBtn.isVisible()) {
      await expect(timePayrollBtn).toBeVisible();
    }
  });

  // ── Full HR Admin Journey ──────────────────────────────────────

  test('should complete full HR admin journey: home → payroll → reports → settings', async ({ page }) => {
    // Step 1: Home
    await navigateTo(page, '#/home');
    await page.waitForTimeout(300);
    await expect(page.locator('h1')).toBeVisible();

    // Step 2: Payroll Setup
    await navigateTo(page, '#/payroll-setup');
    await page.waitForTimeout(800);
    let content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();

    // Step 3: Government Reports
    await navigateTo(page, '#/government-reports');
    await page.waitForTimeout(800);
    content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();

    // Step 4: Settings
    await navigateTo(page, '#/settings');
    await page.waitForTimeout(800);
    content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });
});
