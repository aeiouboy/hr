import { expect, test } from '@playwright/test';
import { getHrTestCase } from '../testcases/hr-full-suite';
import { collectRuntimeIssues, filterKnownRuntimeNoise } from '../support/console';
import { qaStep, writeSummary } from '../support/evidence';
import { authedSuiteContext } from '../support/personas';
import { resetSuiteStorage } from '../support/state';

interface SmokeStep {
  stepId: string;
  title: string;
  path: string;
}

const smokeRoutes: Record<string, SmokeStep[]> = {
  'HR-ESS-001': [
    { stepId: '01-home', title: 'Open employee home', path: '/th/home' },
    { stepId: '02-profile', title: 'Open employee profile', path: '/th/profile/me' },
    { stepId: '03-timeoff', title: 'Open timeoff', path: '/th/timeoff' },
    { stepId: '04-benefits', title: 'Open benefits hub', path: '/th/benefits-hub' },
    { stepId: '05-documents', title: 'Open my documents', path: '/th/me/documents' },
  ],
  'HR-MGR-001': [
    { stepId: '01-dashboard', title: 'Open manager dashboard', path: '/th/manager-dashboard' },
    { stepId: '02-quick-approve', title: 'Open quick approve', path: '/th/quick-approve' },
  ],
  'HR-HRBP-001': [
    { stepId: '01-dashboard', title: 'Open HRBP dashboard', path: '/th/hrbp/dashboard' },
    { stepId: '02-talent-search', title: 'Open HRBP talent search', path: '/th/hrbp/talent-search' },
    { stepId: '03-quick-approve', title: 'Open HRBP quick approve', path: '/th/quick-approve' },
  ],
  'HR-SPD-001': [
    { stepId: '01-management', title: 'Open SPD management', path: '/th/spd-management' },
    { stepId: '02-quick-approve', title: 'Open SPD quick approve', path: '/th/quick-approve' },
  ],
  'HR-ADMIN-001': [
    { stepId: '01-admin', title: 'Open admin landing', path: '/th/admin' },
    { stepId: '02-employees', title: 'Open employees list', path: '/th/admin/employees' },
    { stepId: '03-hire', title: 'Open hire wizard', path: '/th/admin/hire' },
    { stepId: '04-system', title: 'Open system admin', path: '/th/admin/system' },
    { stepId: '05-users', title: 'Open user admin', path: '/th/admin/users' },
    { stepId: '06-benefits', title: 'Open benefits admin', path: '/th/admin/benefits' },
  ],
};

async function expectPageReady(page: import('@playwright/test').Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('body')).toBeVisible();
  await expect.poll(async () => (await page.locator('body').innerText()).trim().length).toBeGreaterThan(20);
}

test.describe('HR full-suite P0 smoke evidence @smoke @critical @evidence', () => {
  test.afterAll(() => {
    writeSummary();
  });

  for (const caseId of Object.keys(smokeRoutes)) {
    const testCase = getHrTestCase(caseId);

    test(`${testCase.id} ${testCase.title} @smoke @evidence`, async ({ browser }, testInfo) => {
      const context = await authedSuiteContext(browser, testCase.persona);
      const page = await context.newPage();
      const runtimeIssues = collectRuntimeIssues(page);

      try {
        for (const route of smokeRoutes[testCase.id]) {
          await qaStep(
            testInfo,
            page,
            {
              caseId: testCase.id,
              stepId: route.stepId,
              title: route.title,
              domain: testCase.domain,
              persona: testCase.persona,
            },
            async () => {
              await page.goto(route.path, { waitUntil: 'domcontentloaded' });
              await resetSuiteStorage(page);
              await expectPageReady(page);
            },
          );
        }

        expect.soft(filterKnownRuntimeNoise(runtimeIssues)).toEqual([]);
      } finally {
        await context.close();
      }
    });
  }
});
