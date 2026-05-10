import { test, expect, type ConsoleMessage, type Request } from '@playwright/test';

// Smoke test for /th/admin/hire after defensive-default fix in ClusterReview.tsx.
// Captures console errors + uncaught page errors to detect React runtime failures.

test('th/admin/hire renders without runtime TypeError', async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];

  page.on('console', (msg: ConsoleMessage) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => {
    pageErrors.push(err.message);
  });
  page.on('requestfailed', (req: Request) => {
    failedRequests.push(`${req.method()} ${req.url()} — ${req.failure()?.errorText ?? '?'}`);
  });

  const response = await page.goto('http://localhost:3000/th/admin/hire', {
    waitUntil: 'networkidle',
    timeout: 30000,
  });

  expect(response?.status(), 'HTTP status').toBe(200);

  // Wait for React hydration + any cluster mount
  await page.waitForTimeout(2000);

  // Scrape body text — detect Next.js dev error overlay
  const bodyText = await page.locator('body').innerText();
  const hasErrorOverlay = /Runtime TypeError|Unhandled Runtime Error|TypeError: undefined/i.test(bodyText);

  console.log('=== PAGE TITLE:', await page.title());
  console.log('=== CONSOLE ERRORS:', consoleErrors.length);
  consoleErrors.forEach((e) => console.log('  ERR:', e));
  console.log('=== PAGE ERRORS (uncaught):', pageErrors.length);
  pageErrors.forEach((e) => console.log('  PAGE-ERR:', e));
  console.log('=== FAILED REQUESTS:', failedRequests.length);
  failedRequests.forEach((r) => console.log('  REQ-FAIL:', r));
  console.log('=== ERROR OVERLAY DETECTED:', hasErrorOverlay);

  expect(hasErrorOverlay, 'Next.js dev error overlay should NOT be visible').toBe(false);
  expect(pageErrors, 'No uncaught page errors').toEqual([]);
});
