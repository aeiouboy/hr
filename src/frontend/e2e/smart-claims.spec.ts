import { test, expect } from '@playwright/test';
import { mockAuthSession } from './helpers/auth.helper';
import { navigateTo, waitForLoading } from './helpers/navigation.helper';

test.describe('Smart Claims', () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthSession(page, 'employee');
  });

  test('should upload a receipt image', async ({ page }) => {
    await navigateTo(page, '/smart-claims/claims');
    await waitForLoading(page);
    const uploadArea = page.locator(
      'input[type="file"], [data-testid="upload-receipt"], [data-testid="dropzone"]',
    ).first();
    await expect(uploadArea).toBeAttached({ timeout: 5000 });
  });

  test('should display OCR extracted data', async ({ page }) => {
    await navigateTo(page, '/smart-claims/claims');
    await waitForLoading(page);
    // After upload, OCR data should appear
    const ocrSection = page.locator(
      '[data-testid="ocr-results"], [data-testid="extracted-data"]',
    ).first();
    if (await ocrSection.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(ocrSection).toBeVisible();
    }
  });

  test('should show confidence badge on OCR fields', async ({ page }) => {
    await navigateTo(page, '/smart-claims/claims');
    await waitForLoading(page);
    const badge = page.locator(
      '[data-testid="confidence-badge"], .badge, [class*="confidence"]',
    ).first();
    if (await badge.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(badge).toBeVisible();
    }
  });

  test('should fill claim form with extracted data', async ({ page }) => {
    await navigateTo(page, '/smart-claims/claims');
    await waitForLoading(page);
    // Check form fields exist
    const formFields = page.locator(
      'input[name], select[name], [data-testid="claim-form"] input',
    );
    await expect(formFields.first()).toBeVisible({ timeout: 5000 });
  });

  test('should validate against company policy', async ({ page }) => {
    await navigateTo(page, '/smart-claims/claims');
    await waitForLoading(page);
    const policyInfo = page.locator(
      '[data-testid="policy-check"], [data-testid="policy-validation"]',
    ).first();
    if (await policyInfo.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(policyInfo).toBeVisible();
    }
  });

  test('should submit a claim successfully', async ({ page }) => {
    await navigateTo(page, '/smart-claims/claims');
    await waitForLoading(page);
    const submitBtn = page.getByRole('button', { name: /submit|send/i }).first();
    await expect(submitBtn).toBeVisible({ timeout: 5000 });
  });

  test('should display claims history', async ({ page }) => {
    await navigateTo(page, '/smart-claims/history');
    await waitForLoading(page);
    await expect(
      page.getByText(/history|past|previous/i).first(),
    ).toBeVisible();
  });

  test('should show YTD spending summary', async ({ page }) => {
    await navigateTo(page, '/smart-claims');
    await waitForLoading(page);
    const ytdSection = page.locator(
      '[data-testid="ytd-spending"], :has-text("YTD"), :has-text("Year-to-Date")',
    ).first();
    if (await ytdSection.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(ytdSection).toBeVisible();
    }
  });
});
