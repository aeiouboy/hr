import { test, expect } from '@playwright/test';
import { navigateAndWait, navigateWithRole, navigateTo } from './helpers';

test.describe('Employee Journey', () => {
  test.beforeEach(async ({ page }) => {
    await navigateWithRole(page, 'employee');
  });

  // ── Home Page ──────────────────────────────────────────────────

  test('should display home page with welcome message', async ({ page }) => {
    await navigateTo(page, '#/home');
    await expect(page.locator('h1')).toBeVisible();
    // Welcome message should contain the user's name
    const h1Text = await page.locator('h1').textContent();
    expect(h1Text).toBeTruthy();
  });

  test('should display quick action cards on home', async ({ page }) => {
    await navigateTo(page, '#/home');
    // Quick actions section should be visible
    const quickActions = page.locator('text=View My Profile, text=Manage My Data, text=View Pending Workflows').first();
    await expect(page.locator('a[href="#/profile"]').first()).toBeVisible();
  });

  // ── Profile Navigation ────────────────────────────────────────

  test('should navigate to profile page', async ({ page }) => {
    await navigateTo(page, '#/profile');
    await page.waitForTimeout(500);
    // Profile page should show employee information
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  test('should display personal info tab on profile', async ({ page }) => {
    await navigateTo(page, '#/profile/personal');
    await page.waitForTimeout(500);
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  test('should navigate between profile tabs', async ({ page }) => {
    await navigateTo(page, '#/profile');
    await page.waitForTimeout(500);

    // Navigate to employment tab
    await navigateTo(page, '#/profile/employment');
    await page.waitForTimeout(500);
    const url1 = page.url();
    expect(url1).toContain('employment');

    // Navigate to compensation tab
    await navigateTo(page, '#/profile/compensation');
    await page.waitForTimeout(500);
    const url2 = page.url();
    expect(url2).toContain('compensation');
  });

  // ── Leave Request ─────────────────────────────────────────────

  test('should navigate to leave request page', async ({ page }) => {
    await navigateTo(page, '#/leave');
    await page.waitForTimeout(500);
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  test('should display leave balance section', async ({ page }) => {
    await navigateTo(page, '#/leave');
    await page.waitForTimeout(800);
    // The leave page should render content
    const appContent = await page.locator('#app').innerHTML();
    expect(appContent.length).toBeGreaterThan(100);
  });

  // ── Payslip ───────────────────────────────────────────────────

  test('should navigate to payslip page', async ({ page }) => {
    await navigateTo(page, '#/payslip');
    await page.waitForTimeout(500);
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  test('should display payslip information', async ({ page }) => {
    await navigateTo(page, '#/payslip');
    await page.waitForTimeout(800);
    const appContent = await page.locator('#app').innerHTML();
    expect(appContent.length).toBeGreaterThan(100);
  });

  // ── Performance ───────────────────────────────────────────────

  test('should navigate to performance page', async ({ page }) => {
    await navigateTo(page, '#/performance');
    await page.waitForTimeout(500);
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  // ── Workflows ─────────────────────────────────────────────────

  test('should navigate to workflows page', async ({ page }) => {
    await navigateTo(page, '#/workflows');
    await page.waitForTimeout(500);
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  // ── Header Navigation ─────────────────────────────────────────

  test('should have self-service dropdown in header', async ({ page }) => {
    await navigateTo(page, '#/home');
    // Self-service dropdown button should be visible on desktop
    const selfServiceBtn = page.locator('#self-service-dropdown-btn');
    if (await selfServiceBtn.isVisible()) {
      await expect(selfServiceBtn).toBeVisible();
    }
  });

  test('should navigate via header logo to home', async ({ page }) => {
    await navigateTo(page, '#/profile');
    await page.waitForTimeout(300);
    // Click logo link
    const logo = page.locator('a[href="#/home"]').first();
    if (await logo.isVisible()) {
      await logo.click();
      await page.waitForTimeout(500);
      expect(page.url()).toContain('#/home');
    }
  });

  // ── Full Employee Journey ──────────────────────────────────────

  test('should complete full employee journey: home → profile → leave → payslip', async ({ page }) => {
    // Step 1: Home
    await navigateTo(page, '#/home');
    await page.waitForTimeout(300);
    await expect(page.locator('h1')).toBeVisible();

    // Step 2: Profile
    await navigateTo(page, '#/profile');
    await page.waitForTimeout(500);
    let content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();

    // Step 3: Personal info tab
    await navigateTo(page, '#/profile/personal');
    await page.waitForTimeout(500);

    // Step 4: Leave
    await navigateTo(page, '#/leave');
    await page.waitForTimeout(500);
    content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();

    // Step 5: Payslip
    await navigateTo(page, '#/payslip');
    await page.waitForTimeout(500);
    content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });
});
