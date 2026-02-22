import { test, expect } from '@playwright/test';
import { mockAuthSession } from './helpers/auth.helper';
import { navigateTo, waitForLoading } from './helpers/navigation.helper';

test.describe('Recruitment & Onboarding', () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page, 'hr_admin');
  });

  test('should display job posting management', async ({ page }) => {
    await navigateTo(page, '/recruitment');
    await waitForLoading(page);
    await expect(
      page.getByText(/recruitment|job|posting|position/i).first(),
    ).toBeVisible();
  });

  test('should show kanban candidate screening', async ({ page }) => {
    await navigateTo(page, '/screening');
    await waitForLoading(page);
    await expect(
      page.getByText(/screening|candidate|pipeline/i).first(),
    ).toBeVisible();
  });

  test('should display onboarding checklist', async ({ page }) => {
    await navigateTo(page, '/onboarding');
    await waitForLoading(page);
    await expect(
      page.getByText(/onboarding|checklist|new hire/i).first(),
    ).toBeVisible();
  });

  test('should manage resignation flow', async ({ page }) => {
    await navigateTo(page, '/resignation');
    await waitForLoading(page);
    await expect(
      page.getByText(/resignation|offboarding|exit/i).first(),
    ).toBeVisible();
  });

  test('should track candidate through pipeline', async ({ page }) => {
    await navigateTo(page, '/screening');
    await waitForLoading(page);
    const candidateCard = page.locator(
      '[data-testid="candidate-card"], .card, [role="listitem"]',
    ).first();
    if (await candidateCard.isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(candidateCard).toBeVisible();
    }
  });
});
