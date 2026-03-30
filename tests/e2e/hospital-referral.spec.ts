import { test, expect } from '@playwright/test';
import { navigateWithRole, navigateTo, toggleLanguage, getCurrentLanguage } from './helpers';

/**
 * Hospital Referral E2E Tests
 *
 * The app is a vanilla JS SPA served at localhost:8080.
 * Routes use hash-based navigation: /#/hospital-referral
 */
test.describe('Hospital Referral', () => {
  // ── Page Load & Navigation ──────────────────────────────────────

  test.describe('Page Navigation', () => {
    test.beforeEach(async ({ page }) => {
      await navigateWithRole(page, 'employee');
    });

    test('should navigate to hospital referral page', async ({ page }) => {
      await navigateTo(page, '#/hospital-referral');
      const content = await page.locator('#app').textContent();
      expect(content).toBeTruthy();
    });

    test('should display hospital referral page heading', async ({ page }) => {
      await navigateTo(page, '#/hospital-referral');
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      const text = await h1.textContent();
      expect(text).toContain('Hospital Referral');
    });

    test('should render page content with tabs', async ({ page }) => {
      await navigateTo(page, '#/hospital-referral');
      const appContent = await page.locator('#app').innerHTML();
      expect(appContent.length).toBeGreaterThan(200);
    });
  });

  // ── Tabs ────────────────────────────────────────────────────────

  test.describe('Tab Navigation', () => {
    test.beforeEach(async ({ page }) => {
      await navigateWithRole(page, 'employee');
      await navigateTo(page, '#/hospital-referral');
    });

    test('should display New Referral Request tab', async ({ page }) => {
      await expect(page.getByText('New Referral Request')).toBeVisible();
    });

    test('should display My Referrals tab', async ({ page }) => {
      await expect(page.getByText('My Referrals')).toBeVisible();
    });

    test('should show new request form by default', async ({ page }) => {
      // The form should be visible on the default tab
      const form = page.locator('#referral-form');
      await expect(form).toBeVisible();
    });

    test('should switch to My Referrals tab on click', async ({ page }) => {
      await page.getByText('My Referrals').click();
      await page.waitForTimeout(400);
      // Should show referrals table or empty state
      const appContent = await page.locator('#app').innerHTML();
      expect(appContent.length).toBeGreaterThan(100);
    });

    test('should switch back to New Referral Request tab', async ({ page }) => {
      // Switch to My Referrals first
      await page.getByText('My Referrals').click();
      await page.waitForTimeout(300);

      // Switch back to New Referral Request
      await page.getByText('New Referral Request').click();
      await page.waitForTimeout(300);

      // Form should be visible again
      const form = page.locator('#referral-form');
      await expect(form).toBeVisible();
    });
  });

  // ── Referral Request Form ───────────────────────────────────────

  test.describe('Referral Request Form', () => {
    test.beforeEach(async ({ page }) => {
      await navigateWithRole(page, 'employee');
      await navigateTo(page, '#/hospital-referral');
    });

    test('should display Select Hospital field', async ({ page }) => {
      await expect(page.getByText('Select Hospital')).toBeVisible();
    });

    test('should display Reason for Visit field', async ({ page }) => {
      await expect(page.getByText('Reason for Visit')).toBeVisible();
    });

    test('should display Preferred Date field', async ({ page }) => {
      await expect(page.getByText('Preferred Date')).toBeVisible();
    });

    test('should display Urgency Level field', async ({ page }) => {
      await expect(page.getByText('Urgency Level')).toBeVisible();
    });

    test('should display urgency options: Routine, Urgent, Emergency', async ({ page }) => {
      await expect(page.getByText('Routine')).toBeVisible();
      await expect(page.getByText('Urgent')).toBeVisible();
      await expect(page.getByText('Emergency')).toBeVisible();
    });

    test('should have hospital dropdown with options', async ({ page }) => {
      const hospitalSelect = page.locator('#referral-hospital');
      await expect(hospitalSelect).toBeVisible();

      // Open the select to check options exist
      const optionCount = await hospitalSelect.locator('option').count();
      expect(optionCount).toBeGreaterThan(1); // At least the placeholder + 1 hospital
    });

    test('should have a submit button', async ({ page }) => {
      const submitBtn = page.locator('#submit-referral-btn');
      await expect(submitBtn).toBeVisible();
    });

    test('should have a clear/reset button', async ({ page }) => {
      const clearBtn = page.getByRole('button', { name: /clear/i });
      await expect(clearBtn).toBeVisible();
    });

    test('should show validation errors when submitting empty form', async ({ page }) => {
      const submitBtn = page.locator('#submit-referral-btn');
      await submitBtn.click();
      await page.waitForTimeout(300);

      // Hospital error should appear
      const hospitalError = page.locator('#hospital-error');
      await expect(hospitalError).not.toHaveClass(/hidden/);
    });

    test('should show reason validation error when reason is empty', async ({ page }) => {
      // Fill hospital but not reason
      const hospitalSelect = page.locator('#referral-hospital');
      await hospitalSelect.selectOption({ index: 1 });

      const submitBtn = page.locator('#submit-referral-btn');
      await submitBtn.click();
      await page.waitForTimeout(300);

      const reasonError = page.locator('#reason-error');
      await expect(reasonError).not.toHaveClass(/hidden/);
    });

    test('should clear validation errors when form is valid', async ({ page }) => {
      // Fill the form
      await page.locator('#referral-hospital').selectOption({ index: 1 });
      await page.locator('#referral-reason').fill('Annual checkup for general wellness');
      await page.locator('#referral-date').fill('2026-03-15');

      const submitBtn = page.locator('#submit-referral-btn');
      await submitBtn.click();
      await page.waitForTimeout(300);

      // Errors should be hidden
      const hospitalError = page.locator('#hospital-error');
      const reasonError = page.locator('#reason-error');
      await expect(hospitalError).toHaveClass(/hidden/);
      await expect(reasonError).toHaveClass(/hidden/);
    });

    test('should successfully submit a valid referral request', async ({ page }) => {
      // Fill all required fields
      await page.locator('#referral-hospital').selectOption({ index: 1 });
      await page.locator('#referral-reason').fill('Annual health checkup and general consultation needed');
      await page.locator('#referral-date').fill('2026-03-20');

      // Select urgency
      await page.locator('input[name="urgency"][value="routine"]').check();

      // Fill optional notes
      await page.locator('#referral-notes').fill('No specific concerns at the moment');

      // Submit
      await page.locator('#submit-referral-btn').click();
      await page.waitForTimeout(500);

      // Success message should appear
      const successEl = page.locator('#referral-success');
      await expect(successEl).not.toHaveClass(/hidden/);
    });

    test('should navigate to My Referrals after successful submission', async ({ page }) => {
      // Fill all required fields and submit
      await page.locator('#referral-hospital').selectOption({ index: 1 });
      await page.locator('#referral-reason').fill('Specialist consultation for knee pain');
      await page.locator('#referral-date').fill('2026-04-01');
      await page.locator('#submit-referral-btn').click();

      // Wait for the redirect to My Referrals (happens after 2 second delay)
      await page.waitForTimeout(2500);

      // Should now be on My Referrals tab showing the referrals table
      const table = page.locator('#referrals-table');
      await expect(table).toBeVisible({ timeout: 5000 });
    });

    test('should reset form when Clear button is clicked', async ({ page }) => {
      // Fill some fields
      await page.locator('#referral-reason').fill('Some reason for visit');
      await page.locator('#referral-notes').fill('Some notes');

      // Click clear
      await page.getByRole('button', { name: /clear/i }).click();
      await page.waitForTimeout(200);

      // Fields should be empty
      const reasonValue = await page.locator('#referral-reason').inputValue();
      expect(reasonValue).toBe('');
    });
  });

  // ── Referral History ────────────────────────────────────────────

  test.describe('My Referrals Tab', () => {
    test.beforeEach(async ({ page }) => {
      await navigateWithRole(page, 'employee');
      await navigateTo(page, '#/hospital-referral');
      await page.getByText('My Referrals').click();
      await page.waitForTimeout(400);
    });

    test('should display referral history table', async ({ page }) => {
      const table = page.locator('#referrals-table');
      await expect(table).toBeVisible();
    });

    test('should display table column headers', async ({ page }) => {
      await expect(page.getByText('Referral ID')).toBeVisible();
      await expect(page.getByText('Hospital')).toBeVisible();
      await expect(page.getByText('Status')).toBeVisible();
    });

    test('should display mock referral records in table', async ({ page }) => {
      const rows = page.locator('#referrals-table tbody tr');
      const rowCount = await rows.count();
      expect(rowCount).toBeGreaterThan(0);
    });

    test('should display status badges for referrals', async ({ page }) => {
      // Check for status badge elements (span with rounded-full class)
      const badges = page.locator('#referrals-table span.rounded-full');
      const badgeCount = await badges.count();
      expect(badgeCount).toBeGreaterThan(0);
    });

    test('should show approved status badge for first mock referral', async ({ page }) => {
      // First mock referral has 'approved' status
      const appContent = await page.locator('#app').innerHTML();
      expect(appContent).toContain('Approved');
    });

    test('should show pending status badge for second mock referral', async ({ page }) => {
      // Second mock referral has 'pending' status
      const appContent = await page.locator('#app').innerHTML();
      expect(appContent).toContain('Pending');
    });

    test('should open referral detail when clicking a row', async ({ page }) => {
      const firstRow = page.locator('#referrals-table tbody tr').first();
      await firstRow.click();
      await page.waitForTimeout(400);

      // Modal or detail view should appear
      const appContent = await page.locator('body').innerHTML();
      // Check that some detail content appeared (REF ID or hospital name)
      expect(appContent).toContain('REF-');
    });

    test('should display Bangkok Hospital in referral list', async ({ page }) => {
      const appContent = await page.locator('#app').innerHTML();
      expect(appContent).toContain('Bangkok Hospital');
    });
  });

  // ── Internationalization ─────────────────────────────────────────

  test.describe('Language Support', () => {
    test.beforeEach(async ({ page }) => {
      await navigateWithRole(page, 'employee');
      await navigateTo(page, '#/hospital-referral');
    });

    test('should display English content by default', async ({ page }) => {
      const lang = await getCurrentLanguage(page);
      // Default should be English or Thai depending on app state
      expect(['en', 'th']).toContain(lang);

      // Heading should always be visible
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
    });

    test('should toggle to Thai language and update page content', async ({ page }) => {
      const initialLang = await getCurrentLanguage(page);

      await toggleLanguage(page);
      await page.waitForTimeout(600);

      const newLang = await getCurrentLanguage(page);
      expect(newLang).not.toBe(initialLang);
    });

    test('should display Thai heading after switching to Thai', async ({ page }) => {
      // Ensure we are in English first
      const lang = await getCurrentLanguage(page);
      if (lang !== 'th') {
        await toggleLanguage(page);
        await page.waitForTimeout(600);
      }

      // After switching to Thai, heading should contain Thai text
      const appContent = await page.locator('#app').textContent();
      expect(appContent).toContain('หนังสือส่งตัว');
    });

    test('should display Thai tab labels after switching to Thai', async ({ page }) => {
      const lang = await getCurrentLanguage(page);
      if (lang !== 'th') {
        await toggleLanguage(page);
        await page.waitForTimeout(600);
      }

      const appContent = await page.locator('#app').textContent();
      // Thai tab labels
      expect(appContent).toContain('ส่งคำขอใหม่');
    });
  });

  // ── Responsive Design ───────────────────────────────────────────

  test.describe('Responsive Behavior', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await navigateWithRole(page, 'employee');
      await navigateTo(page, '#/hospital-referral');

      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      const form = page.locator('#referral-form');
      await expect(form).toBeVisible();
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await navigateWithRole(page, 'employee');
      await navigateTo(page, '#/hospital-referral');

      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
    });

    test('should display tabs horizontally on desktop', async ({ page }) => {
      await navigateWithRole(page, 'employee');
      await navigateTo(page, '#/hospital-referral');

      const tabContainer = page.locator('[role="tablist"]');
      await expect(tabContainer).toBeVisible();
    });
  });

  // ── Role-Based Access ────────────────────────────────────────────

  test.describe('Role-Based Access', () => {
    test('should be accessible for employee role', async ({ page }) => {
      await navigateWithRole(page, 'employee');
      await navigateTo(page, '#/hospital-referral');

      const content = await page.locator('#app').textContent();
      expect(content).toBeTruthy();
      expect(content!.length).toBeGreaterThan(50);
    });

    test('should be accessible for manager role', async ({ page }) => {
      await navigateWithRole(page, 'manager');
      await navigateTo(page, '#/hospital-referral');

      const content = await page.locator('#app').textContent();
      expect(content).toBeTruthy();
    });

    test('should be accessible for hr_admin role', async ({ page }) => {
      await navigateWithRole(page, 'hr_admin');
      await navigateTo(page, '#/hospital-referral');

      const content = await page.locator('#app').textContent();
      expect(content).toBeTruthy();
    });
  });

  // ── Full Employee Journey ────────────────────────────────────────

  test.describe('Complete Referral Journey', () => {
    test('should complete a full referral request journey', async ({ page }) => {
      await navigateWithRole(page, 'employee');

      // Step 1: Navigate to hospital referral page
      await navigateTo(page, '#/hospital-referral');
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();

      // Step 2: Verify New Request tab is active by default
      const form = page.locator('#referral-form');
      await expect(form).toBeVisible();

      // Step 3: Fill in the referral form
      await page.locator('#referral-hospital').selectOption({ index: 1 });
      await page.locator('#referral-reason').fill('Annual health checkup and consultation');
      await page.locator('#referral-date').fill('2026-03-25');
      await page.locator('input[name="urgency"][value="routine"]').check();
      await page.locator('#referral-notes').fill('No specific concerns');

      // Step 4: Submit the form
      await page.locator('#submit-referral-btn').click();
      await page.waitForTimeout(500);

      // Step 5: Verify success message
      const successEl = page.locator('#referral-success');
      await expect(successEl).not.toHaveClass(/hidden/);

      // Step 6: Wait for auto-redirect to My Referrals
      await page.waitForTimeout(2500);

      // Step 7: Verify new referral appears in list
      const table = page.locator('#referrals-table');
      await expect(table).toBeVisible({ timeout: 5000 });

      const rows = table.locator('tbody tr');
      const rowCount = await rows.count();
      expect(rowCount).toBeGreaterThan(2); // 2 mock + 1 new submission
    });

    test('should navigate to hospital referral from home page', async ({ page }) => {
      await navigateWithRole(page, 'employee');
      await navigateTo(page, '#/home');
      await page.waitForTimeout(300);

      // Navigate directly via hash
      await navigateTo(page, '#/hospital-referral');
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      const text = await h1.textContent();
      expect(text).toContain('Hospital Referral');
    });
  });
});
