/**
 * global-setup.ts
 *
 * Warms up Next.js dev server routes before any Playwright test runs.
 * Prevents cold-compile timeouts in beforeAll/beforeEach hooks when
 * multiple workers all hit the same uncompiled route simultaneously.
 *
 * Called once before the entire test suite via playwright.config.ts
 * `globalSetup` option.
 */

import { request } from '@playwright/test';

const ROUTES = [
  '/th/home',
  '/th/login',
  '/th/spd/inbox',
  '/th/quick-approve',
  '/th/resignation',
  '/th/hrbp-reports',
  '/th/admin/hire',
  '/th/admin/employees',
  '/th/ess/profile/edit',
  '/th/ess/workflows',
  '/th/admin/employees/EMP-0001',
];

async function globalSetup(): Promise<void> {
  const baseURL = process.env.BASE_URL ?? 'http://localhost:3001';

  console.log(`[global-setup] Warming up ${ROUTES.length} routes on ${baseURL} …`);

  const context = await request.newContext({
    baseURL,
    // Long timeout per request to allow full Next.js cold compile
    timeout: 90_000,
    // Ignore SSL errors (not needed for localhost but harmless)
    ignoreHTTPSErrors: true,
  });

  for (const route of ROUTES) {
    try {
      const res = await context.get(route);
      const status = res.status();
      if (status >= 500) {
        console.warn(`[global-setup] ${route} → ${status} (continuing)`);
      } else {
        console.log(`[global-setup] ${route} → ${status}`);
      }
    } catch (err) {
      // Log and continue — a single unreachable route must not abort the run
      console.warn(`[global-setup] ${route} → ERROR: ${(err as Error).message}`);
    }
  }

  await context.dispose();

  console.log('[global-setup] Route warm-up complete.');
}

export default globalSetup;
