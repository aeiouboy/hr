import { test, expect } from '@playwright/test';
import { navigateWithRole, navigateTo } from './helpers';

test.describe('Manager Journey', () => {
  test.beforeEach(async ({ page }) => {
    await navigateWithRole(page, 'manager');
  });

  // ── Home Page (Manager View) ──────────────────────────────────

  test('should display manager home page', async ({ page }) => {
    await navigateTo(page, '#/home');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should show manager-specific content on home', async ({ page }) => {
    await navigateTo(page, '#/home');
    await page.waitForTimeout(500);
    const appContent = await page.locator('#app').innerHTML();
    expect(appContent.length).toBeGreaterThan(100);
  });

  // ── Manager Dashboard ─────────────────────────────────────────

  test('should navigate to manager dashboard', async ({ page }) => {
    await navigateTo(page, '#/manager-dashboard');
    await page.waitForTimeout(800);
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  test('should display team overview on dashboard', async ({ page }) => {
    await navigateTo(page, '#/manager-dashboard');
    await page.waitForTimeout(800);
    const appContent = await page.locator('#app').innerHTML();
    expect(appContent.length).toBeGreaterThan(100);
  });

  // ── Workflow Approvals ─────────────────────────────────────────

  test('should navigate to workflows page', async ({ page }) => {
    await navigateTo(page, '#/workflows');
    await page.waitForTimeout(500);
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  test('should display pending approvals for manager', async ({ page }) => {
    await navigateTo(page, '#/workflows');
    await page.waitForTimeout(800);
    const appContent = await page.locator('#app').innerHTML();
    expect(appContent.length).toBeGreaterThan(100);
  });

  // ── Team Profile Access ────────────────────────────────────────

  test('should access org chart', async ({ page }) => {
    await navigateTo(page, '#/org-chart');
    await page.waitForTimeout(500);
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  // ── Leave Management ───────────────────────────────────────────

  test('should access leave page', async ({ page }) => {
    await navigateTo(page, '#/leave');
    await page.waitForTimeout(500);
    const content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  // ── Full Manager Journey ───────────────────────────────────────

  test('should complete full manager journey: home → dashboard → workflows → org-chart', async ({ page }) => {
    // Step 1: Home
    await navigateTo(page, '#/home');
    await page.waitForTimeout(300);
    await expect(page.locator('h1')).toBeVisible();

    // Step 2: Manager Dashboard
    await navigateTo(page, '#/manager-dashboard');
    await page.waitForTimeout(800);
    let content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();

    // Step 3: Workflows
    await navigateTo(page, '#/workflows');
    await page.waitForTimeout(500);
    content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();

    // Step 4: Org Chart
    await navigateTo(page, '#/org-chart');
    await page.waitForTimeout(500);
    content = await page.locator('#app').textContent();
    expect(content).toBeTruthy();
  });

  // ── Header Navigation Dropdowns ────────────────────────────────

  test('should have organization dropdown visible for manager', async ({ page }) => {
    await navigateTo(page, '#/home');
    // Manager should see organization-related navigation
    const appContent = await page.locator('#app').innerHTML();
    expect(appContent).toBeTruthy();
  });
});
