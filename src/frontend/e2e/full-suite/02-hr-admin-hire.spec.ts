import { expect, test } from '@playwright/test';
import { getHrTestCase } from '../testcases/hr-full-suite';
import { qaStep, writeSummary } from '../support/evidence';
import { authedSuiteContext } from '../support/personas';
import { resetSuiteStorage } from '../support/state';

const testCase = getHrTestCase('HR-ADMIN-HIRE-001');

async function expectRenderedBody(page: import('@playwright/test').Page): Promise<string> {
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('body')).toBeVisible();
  const text = await page.locator('body').innerText();
  expect(text.trim().length).toBeGreaterThan(20);
  return `Rendered non-empty page body (${text.trim().length} chars)`;
}

test.describe.serial('HR Admin hire lifecycle QA evidence pack @hr-admin-hire @evidence', () => {
  test.afterAll(() => {
    writeSummary();
  });

  test(`${testCase.id} ${testCase.title} @hr-admin-hire @evidence`, async ({ browser }, testInfo) => {
    const context = await authedSuiteContext(browser, testCase.persona);
    const page = await context.newPage();

    try {
      await qaStep(
        testInfo,
        page,
        {
          caseId: testCase.id,
          stepId: '01-open-hire-wizard',
          title: 'Open hire wizard as HR admin',
          domain: testCase.domain,
          persona: testCase.persona,
          expectedResult: 'HR admin can open the hire wizard and see non-empty wizard content.',
          inputDataRef: testCase.testDataRef,
          assertionType: 'route-render',
          failureCategory: 'navigation-or-render',
          feedbackOnFail: 'Check HR admin route guard, demo auth seed, and /th/admin/hire rendering errors.',
        },
        async () => {
          await page.goto('/th/admin/hire', { waitUntil: 'domcontentloaded' });
          await resetSuiteStorage(page);
          return expectRenderedBody(page);
        },
      );

      await qaStep(
        testInfo,
        page,
        {
          caseId: testCase.id,
          stepId: '02-verify-wizard-controls',
          title: 'Verify hire wizard step controls are present',
          domain: testCase.domain,
          persona: testCase.persona,
          expectedResult: 'Hire wizard exposes a next or submit control for lifecycle progression.',
          inputDataRef: testCase.testDataRef,
          assertionType: 'ui-control-presence',
          failureCategory: 'hire-wizard-controls',
          feedbackOnFail: 'Inspect WizardFooter/Cluster validation state; the lifecycle cannot progress without step controls.',
        },
        async () => {
          const actionButtons = page.locator('button:has-text("ถัดไป"), button:has-text("บันทึกและส่ง")');
          const buttonCount = await actionButtons.count();
          expect(buttonCount).toBeGreaterThan(0);
          const firstButtonText = (await actionButtons.first().innerText()).trim();
          return `Found ${buttonCount} wizard action control(s); first control: ${firstButtonText}`;
        },
      );

      await qaStep(
        testInfo,
        page,
        {
          caseId: testCase.id,
          stepId: '03-open-change-request-queue',
          title: 'Open lifecycle follow-up queue',
          domain: testCase.domain,
          persona: testCase.persona,
          expectedResult: 'HR admin can navigate to the change request queue used to review lifecycle follow-ups.',
          inputDataRef: 'route:/th/admin/change-requests',
          assertionType: 'route-render',
          failureCategory: 'lifecycle-follow-up-route',
          feedbackOnFail: 'Check admin change-request route registration and HR admin persona permissions.',
        },
        async () => {
          await page.goto('/th/admin/change-requests', { waitUntil: 'domcontentloaded' });
          await resetSuiteStorage(page);
          return expectRenderedBody(page);
        },
      );
    } finally {
      await context.close();
    }
  });
});
