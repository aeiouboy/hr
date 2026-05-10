import { expect, test } from '@playwright/test';
import { getHrTestCase } from '../testcases/hr-full-suite';
import { qaStep, writeSummary } from '../support/evidence';
import { authedSuiteContext } from '../support/personas';
import { resetSuiteStorage } from '../support/state';

const testCase = getHrTestCase('HR-ADMIN-EMP-001');

test.describe.serial('HR full-suite functional evidence flow @smoke @evidence', () => {
  test.afterAll(() => {
    writeSummary();
  });

  test(`${testCase.id} ${testCase.title} @smoke @evidence`, async ({ browser }, testInfo) => {
    const context = await authedSuiteContext(browser, testCase.persona);
    const page = await context.newPage();

    try {
      await qaStep(
        testInfo,
        page,
        {
          caseId: testCase.id,
          stepId: '01-open-employees',
          title: 'Open employee directory',
          domain: testCase.domain,
          persona: testCase.persona,
        },
        async () => {
          await page.goto('/th/admin/employees', { waitUntil: 'domcontentloaded' });
          await resetSuiteStorage(page);
          await expect(page.locator('body')).toBeVisible();
          await expect.poll(async () => (await page.locator('body').innerText()).trim().length).toBeGreaterThan(20);
        },
      );

      await qaStep(
        testInfo,
        page,
        {
          caseId: testCase.id,
          stepId: '02-open-hire',
          title: 'Open hire wizard entry point',
          domain: testCase.domain,
          persona: testCase.persona,
        },
        async () => {
          await page.goto('/th/admin/hire', { waitUntil: 'domcontentloaded' });
          await resetSuiteStorage(page);
          await expect(page.locator('body')).toBeVisible();
          await expect.poll(async () => (await page.locator('body').innerText()).trim().length).toBeGreaterThan(20);
        },
      );

      await qaStep(
        testInfo,
        page,
        {
          caseId: testCase.id,
          stepId: '03-open-change-requests',
          title: 'Open change request queue',
          domain: testCase.domain,
          persona: testCase.persona,
        },
        async () => {
          await page.goto('/th/admin/change-requests', { waitUntil: 'domcontentloaded' });
          await resetSuiteStorage(page);
          await expect(page.locator('body')).toBeVisible();
          await expect.poll(async () => (await page.locator('body').innerText()).trim().length).toBeGreaterThan(20);
        },
      );
    } finally {
      await context.close();
    }
  });
});
