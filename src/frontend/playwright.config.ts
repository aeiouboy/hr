import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL ?? 'http://localhost:3000';
const targetHost = (() => {
  try {
    return new URL(baseURL).hostname.toLowerCase();
  } catch {
    return 'localhost';
  }
})();
const isProductionTarget =
  process.env.HR_TEST_TARGET === 'prod' ||
  process.env.HR_TEST_TARGET === 'production' ||
  process.env.VERCEL_ENV === 'production' ||
  !['localhost', '127.0.0.1', '::1'].includes(targetHost);
const isDemoOrSeededDataScope = process.env.HR_TEST_DATA_SCOPE === 'demo' || process.env.HR_TEST_DATA_SCOPE === 'seeded';
const allowProductionScreenshots = process.env.HR_TEST_ALLOW_PROD_SCREENSHOTS === '1' && isDemoOrSeededDataScope;

export default defineConfig({
  testDir: './e2e',
  globalSetup: './e2e/global-setup.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  timeout: 30_000,
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: isProductionTarget && !allowProductionScreenshots ? 'off' : 'only-on-failure',
    locale: 'en',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 14'] },
    },
  ],
  webServer: process.env.CI
    ? undefined
    : {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: true,
        timeout: 120_000,
        // NEXT_PUBLIC_DEMO_MODE enables persona-switching in Playwright runs.
        // next start is a production-NODE_ENV build — .env.development is not loaded
        // in that mode, so we inject the flag here explicitly.
        env: {
          NEXT_PUBLIC_DEMO_MODE: 'true',
        },
      },
});
