import { test, expect } from '@playwright/test';
import { mockAuthSession } from './helpers/auth.helper';

// Chain 5 — Manager Leave Queue (out-of-EC, separate from BRD #166 personal-info chain)
//
// The leave queue (humi-leave-approvals store) is Manager-owned.
// EC personal-info changes route to SPD per BRD #166 — that is a different chain.
// ensureDemoSeed() fires on AppShell mount and pre-seeds 3 pending leave requests
// with Thai employee names. Because beforeEach clears localStorage before each
// test, the seed re-fires fresh for every test, giving 3 clean pending rows.

test.describe.serial('Chain 5 — Manager Leave Queue (out-of-EC, separate from BRD #166)', () => {
  test.beforeEach(async ({ page }) => {
    // Clear persisted store state so ensureDemoSeed() re-fires on next mount
    await page.goto('/th/home').catch(() => {});
    await page.evaluate(() => localStorage.clear()).catch(() => {});
  });

  test('Manager sees 3 pre-seeded Thai-name leave requests', async ({ page }) => {
    // Skip if dev server is not running
    const isReachable = await page
      .goto('/th/home', { timeout: 10_000 })
      .then(() => true)
      .catch(() => false);
    if (!isReachable) {
      test.skip();
      return;
    }

    await mockAuthSession(page, 'manager');
    await page.goto('/th/quick-approve');

    // Wait for the leave queue card to appear — ensureDemoSeed() runs on mount
    const leaveQueueCard = page.getByText(/คิวลา.*รอหัวหน้าอนุมัติ/);
    await expect(leaveQueueCard).toBeVisible({ timeout: 10_000 });

    // Verify 3 seeded employee rows (all Thai names)
    const kamonrat = page.getByText('กมลรัตน์ จันทร์แดง');
    const thanawat = page.getByText('ธนวัฒน์ สุขเกษม');
    const somsri = page.getByText('สมศรี พรมใจดี');

    await expect(kamonrat.first()).toBeVisible({ timeout: 10_000 });
    await expect(thanawat.first()).toBeVisible({ timeout: 10_000 });
    await expect(somsri.first()).toBeVisible({ timeout: 10_000 });

    // Verify Approve and Reject icon-buttons are present (identified by aria-label)
    const approveButtons = page.locator('[aria-label^="อนุมัติใบลา"]');
    const rejectButtons = page.locator('[aria-label^="ปฏิเสธใบลา"]');
    await expect(approveButtons).toHaveCount(3, { timeout: 10_000 });
    await expect(rejectButtons).toHaveCount(3, { timeout: 10_000 });

    // Footnote proves design intent: leave queue is out-of-EC, personal-info → SPD per BRD #166
    const footnote = page.getByText(/out-of-EC/);
    await expect(footnote.first()).toBeVisible({ timeout: 10_000 });

    const brdRef = page.getByText(/BRD #166/);
    await expect(brdRef.first()).toBeVisible({ timeout: 10_000 });
  });

  test('Approve removes a row from pending', async ({ page }) => {
    // Skip if dev server is not running
    const isReachable = await page
      .goto('/th/home', { timeout: 10_000 })
      .then(() => true)
      .catch(() => false);
    if (!isReachable) {
      test.skip();
      return;
    }

    await mockAuthSession(page, 'manager');
    await page.goto('/th/quick-approve');

    // Wait for 3 approve buttons to confirm seed is loaded
    await expect(page.locator('[aria-label^="อนุมัติใบลา"]')).toHaveCount(3, { timeout: 10_000 });

    // Capture the first pending employee name from the first approve button aria-label
    const firstApproveBtn = page.locator('[aria-label^="อนุมัติใบลา"]').first();
    const ariaLabel = await firstApproveBtn.getAttribute('aria-label');
    // aria-label format: "อนุมัติใบลา <employeeName>"
    const employeeName = ariaLabel?.replace('อนุมัติใบลา ', '').trim() ?? '';

    // Click approve
    await firstApproveBtn.click();

    // The row with that employee name should no longer be pending (count drops to 2)
    await expect(page.locator('[aria-label^="อนุมัติใบลา"]')).toHaveCount(2, { timeout: 10_000 });

    // The approved employee's name row should no longer have an approve button
    await expect(
      page.locator(`[aria-label="อนุมัติใบลา ${employeeName}"]`),
    ).toHaveCount(0, { timeout: 10_000 });
  });

  test('Reject removes another row and persists rejected status in store', async ({ page }) => {
    // Skip if dev server is not running
    const isReachable = await page
      .goto('/th/home', { timeout: 10_000 })
      .then(() => true)
      .catch(() => false);
    if (!isReachable) {
      test.skip();
      return;
    }

    await mockAuthSession(page, 'manager');
    await page.goto('/th/quick-approve');

    // Wait for 3 reject buttons to confirm seed is loaded
    await expect(page.locator('[aria-label^="ปฏิเสธใบลา"]')).toHaveCount(3, { timeout: 10_000 });

    // Capture the first pending employee name from the first reject button aria-label
    const firstRejectBtn = page.locator('[aria-label^="ปฏิเสธใบลา"]').first();
    const ariaLabel = await firstRejectBtn.getAttribute('aria-label');
    // aria-label format: "ปฏิเสธใบลา <employeeName>"
    const employeeName = ariaLabel?.replace('ปฏิเสธใบลา ', '').trim() ?? '';

    // Click reject
    await firstRejectBtn.click();

    // The row with that employee name should no longer be pending (count drops to 2)
    await expect(page.locator('[aria-label^="ปฏิเสธใบลา"]')).toHaveCount(2, { timeout: 10_000 });

    // The rejected employee's reject button should no longer exist in the pending queue
    await expect(
      page.locator(`[aria-label="ปฏิเสธใบลา ${employeeName}"]`),
    ).toHaveCount(0, { timeout: 10_000 });

    // Verify localStorage persists `rejected` status for that request
    const storeData = await page.evaluate(() => {
      const raw = localStorage.getItem('humi-leave-approvals');
      if (!raw) return null;
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    });

    // The store should have state.requests with at least one rejected entry
    const requests: Array<{ employeeName: string; status: string }> =
      storeData?.state?.requests ?? [];
    const rejectedEntry = requests.find(
      (r) => r.employeeName === employeeName && r.status === 'rejected',
    );
    expect(rejectedEntry).toBeDefined();
    expect(rejectedEntry?.status).toBe('rejected');
  });
});
