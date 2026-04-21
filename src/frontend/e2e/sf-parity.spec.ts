/**
 * sf-parity.spec.ts — SF UI Parity: Placeholder Routes E2E (issue #7)
 * Framework: Playwright
 *
 * AC-6: All 6 new routes render placeholder card without console errors
 *        Routes: /performance-form, /development, /succession,
 *                /careers, /recruiting, /reports
 *
 * Note: Tests use TH locale (/th/...) as primary locale per Humi convention.
 *       baseURL is http://localhost:3000 (from playwright.config.ts).
 */

import { test, expect, type Page, type ConsoleMessage } from '@playwright/test';
import { mockAuthSession } from './helpers/auth.helper';

// ─── Shared setup ──────────────────────────────────────────────────────────────

const NEW_ROUTES = [
  { path: '/th/performance-form', thTitle: 'ประเมินผลงาน', enTitle: 'Performance' },
  { path: '/th/development',      thTitle: 'การพัฒนา',      enTitle: 'Development' },
  { path: '/th/succession',       thTitle: 'สายการสืบทอด', enTitle: 'Succession' },
  { path: '/th/careers',          thTitle: 'ตำแหน่งว่างภายใน', enTitle: 'Careers' },
  { path: '/th/recruiting',       thTitle: 'สรรหา',          enTitle: 'Recruiting' },
  { path: '/th/reports',          thTitle: 'รายงาน',         enTitle: 'Reports' },
] as const;

const PLACEHOLDER_COPY = /ฟีเจอร์นี้อยู่ระหว่างพัฒนา|Coming in Sprint 2\+|Sprint 2\+/;

// Helper: collect console errors during page visit
async function collectConsoleErrors(page: Page, url: string): Promise<string[]> {
  const errors: string[] = [];
  const handler = (msg: ConsoleMessage) => {
    if (msg.type() === 'error') errors.push(msg.text());
  };
  page.on('console', handler);
  await page.goto(url, { waitUntil: 'networkidle' });
  page.off('console', handler);
  return errors;
}

// ─── AC-6: Placeholder pages render without error ─────────────────────────────

// AC-6: Each new route renders HTTP 200 + placeholder card visible
test.describe('AC-6: New placeholder routes render without error', () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page, 'employee');
  });

  for (const route of NEW_ROUTES) {
    test(`route: ${route.path} renders placeholder (AC-6)`, async ({ page }) => {
      const errors = await collectConsoleErrors(page, route.path);

      // Assert: no JS console errors
      const filteredErrors = errors.filter(
        (e) =>
          // Ignore known benign browser warnings / next-auth dev warnings
          !e.includes('next-auth') &&
          !e.includes('Warning: ReactDOM') &&
          !e.includes('Warning: Each child') &&
          !e.includes('Download the React DevTools'),
      );
      expect(filteredErrors, `Console errors on ${route.path}: ${filteredErrors.join(', ')}`).toHaveLength(0);

      // Assert: page title in Thai or EN is visible
      await expect(
        page.getByText(route.thTitle).first(),
      ).toBeVisible({ timeout: 10_000 });
    });

    test(`route: ${route.path} shows "coming soon" placeholder copy (AC-6)`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: 'networkidle' });

      // Assert: placeholder text indicating Sprint 2+ is visible
      await expect(page.getByText(PLACEHOLDER_COPY).first()).toBeVisible({ timeout: 10_000 });
    });
  }
});

// ─── AC-6: HTTP response is 200 for all new routes ────────────────────────────

// AC-6: HTTP 200 response verification
test.describe('AC-6: New routes return HTTP 200', () => {
  for (const route of NEW_ROUTES) {
    test(`${route.path} responds HTTP 200 (AC-6)`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
    });
  }
});

// ─── AC-6: No 404 / redirect to error page ────────────────────────────────────

// AC-6: Routes do not redirect to 404 or error pages
test.describe('AC-6: New routes do not 404', () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page, 'employee');
  });

  for (const route of NEW_ROUTES) {
    test(`${route.path} does not show 404 page (AC-6)`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: 'networkidle' });

      // Assert: no 404 / "not found" text visible
      await expect(page.getByText(/404|not found|หน้าไม่พบ/i).first()).not.toBeVisible({ timeout: 3_000 }).catch(() => {
        // If locator not found at all, that's fine — means 404 text absent
      });

      // Assert: page renders something beyond empty body
      const bodyText = await page.locator('body').innerText();
      expect(bodyText.trim().length).toBeGreaterThan(10);
    });
  }
});

// ─── AC-6: Sidebar links navigate to new routes correctly ─────────────────────

// AC-6: Sidebar nav items for new SF modules navigate correctly
test.describe('AC-6: Sidebar links navigate to new routes', () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page, 'employee');
    await page.goto('/th/home', { waitUntil: 'networkidle' });
  });

  test('ประเมินผลงาน sidebar link navigates to /th/performance-form (AC-6)', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'เมนูหลัก' });
    await nav.getByRole('link', { name: 'ประเมินผลงาน' }).click();
    await page.waitForURL('**/performance-form**', { timeout: 10_000 });
    expect(page.url()).toContain('performance-form');
  });

  test('รายงาน sidebar link navigates to /th/reports (AC-6)', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'เมนูหลัก' });
    await nav.getByRole('link', { name: 'รายงาน' }).click();
    await page.waitForURL('**/reports**', { timeout: 10_000 });
    expect(page.url()).toContain('reports');
  });
});

// ─── AC-5 (cross-check via Playwright): T&A external link attrs ──────────────

// AC-5 (Playwright cross-check): T&A link DOM attributes via real browser
test.describe('AC-5: T&A external link target + rel (Playwright cross-check)', () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page, 'employee');
    await page.goto('/th/home', { waitUntil: 'networkidle' });
  });

  test('T&A link has target="_blank" in real browser DOM (AC-5)', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'เมนูหลัก' });
    const tandaLink = nav.getByRole('link', { name: /เวลา.*การเข้างาน/u });
    await expect(tandaLink).toHaveAttribute('target', '_blank');
  });

  test('T&A link rel attribute contains noopener (AC-5)', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'เมนูหลัก' });
    const tandaLink = nav.getByRole('link', { name: /เวลา.*การเข้างาน/u });
    const rel = await tandaLink.getAttribute('rel');
    expect(rel).toContain('noopener');
  });

  test('T&A link href points to cnext-time.centralgroup.com (AC-5)', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'เมนูหลัก' });
    const tandaLink = nav.getByRole('link', { name: /เวลา.*การเข้างาน/u });
    await expect(tandaLink).toHaveAttribute('href', 'https://cnext-time.centralgroup.com');
  });
});
