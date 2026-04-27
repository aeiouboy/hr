import { test, expect } from '@playwright/test';
import { authedContext } from './helpers/storage-auth.helper';

// Chain 5 — Manager Leave Queue (out-of-EC, separate from BRD #166 personal-info chain)
//
// The leave queue (humi-leave-approvals store) is Manager-owned.
// EC personal-info changes route to SPD per BRD #166 — that is a different chain.
// ensureDemoSeed() fires on AppShell mount and pre-seeds 3 pending leave requests
// with Thai employee names. Because beforeEach clears non-auth localStorage before
// each test, the seed re-fires fresh for every test, giving 3 clean pending rows.
//
// Auth strategy: authedContext() with addInitScript safety belt for reliable
// Zustand rehydration.

test.describe.serial('Chain 5 — Manager Leave Queue (out-of-EC, separate from BRD #166)', () => {
  // ── Wave 2: BRD context — manager queue surfaces correctly ──────────────────
  test('Wave 2 — manager queue page accessible and leave queue store initialised', async ({ browser }) => {
    const ctx = await authedContext(browser, 'manager');
    const page = await ctx.newPage();

    try {
      const isReachable = await page
        .goto('/th/home', { timeout: 10_000 })
        .then(() => true)
        .catch(() => false);
      if (!isReachable) { test.skip(); return; }

      // Clear non-auth stores so ensureDemoSeed() re-fires cleanly
      await page.evaluate(() => {
        Object.keys(localStorage)
          .filter((k) => k.startsWith('humi-') && k !== 'humi-auth')
          .forEach((k) => localStorage.removeItem(k));
      });

      await page.goto('/th/quick-approve', { waitUntil: 'domcontentloaded', timeout: 15_000 });

      // Manager queue page must load (not redirect to /login)
      await expect(page).not.toHaveURL(/\/login/, { timeout: 5_000 });

      // Wait for leave queue card — ensureDemoSeed fires on mount
      await expect(page.getByText(/คิวลา.*รอหัวหน้าอนุมัติ/)).toBeVisible({ timeout: 10_000 });

      // humi-leave-approvals store seeded by ensureDemoSeed on mount
      const storeSeeded = await page.evaluate(() => {
        const raw = localStorage.getItem('humi-leave-approvals');
        if (!raw) return false;
        try {
          const parsed = JSON.parse(raw);
          return (parsed?.state?.requests ?? []).length > 0;
        } catch { return false; }
      });
      expect(storeSeeded).toBe(true);
    } finally {
      await ctx.close().catch(() => {});
    }
  });

  test('Manager sees 3 pre-seeded Thai-name leave requests', async ({ browser }) => {
    const ctx = await authedContext(browser, 'manager');
    const page = await ctx.newPage();

    try {
      // Skip if dev server is not running
      const isReachable = await page
        .goto('/th/home', { timeout: 10_000 })
        .then(() => true)
        .catch(() => false);
      if (!isReachable) {
        test.skip();
        return;
      }

      // Clear non-auth humi stores so ensureDemoSeed() re-fires
      await page.evaluate(() => {
        Object.keys(localStorage)
          .filter((k) => k.startsWith('humi-') && k !== 'humi-auth')
          .forEach((k) => localStorage.removeItem(k));
      });

      await page.goto('/th/quick-approve');

      // Wait for the leave queue card to appear — ensureDemoSeed() runs on mount
      const leaveQueueCard = page.getByText(/คิวลา.*รอหัวหน้าอนุมัติ/);
      await expect(leaveQueueCard).toBeVisible({ timeout: 10_000 });

      // Verify 3 seeded employee rows (all Thai names)
      await expect(page.getByText('กมลรัตน์ จันทร์แดง').first()).toBeVisible({ timeout: 10_000 });
      await expect(page.getByText('ธนวัฒน์ สุขเกษม').first()).toBeVisible({ timeout: 10_000 });
      await expect(page.getByText('สมศรี พรมใจดี').first()).toBeVisible({ timeout: 10_000 });

      // Verify Approve and Reject icon-buttons are present
      await expect(page.locator('[aria-label^="อนุมัติใบลา"]')).toHaveCount(3, { timeout: 10_000 });
      await expect(page.locator('[aria-label^="ปฏิเสธใบลา"]')).toHaveCount(3, { timeout: 10_000 });

      // Footnote proves design intent
      await expect(page.getByText(/out-of-EC/).first()).toBeVisible({ timeout: 10_000 });
      await expect(page.getByText(/BRD #166/).first()).toBeVisible({ timeout: 10_000 });
    } finally {
      await ctx.close();
    }
  });

  test('Approve removes a row from pending', async ({ browser }) => {
    const ctx = await authedContext(browser, 'manager');
    const page = await ctx.newPage();

    try {
      const isReachable = await page
        .goto('/th/home', { timeout: 10_000 })
        .then(() => true)
        .catch(() => false);
      if (!isReachable) {
        test.skip();
        return;
      }

      // Clear non-auth stores so seed re-fires
      await page.evaluate(() => {
        Object.keys(localStorage)
          .filter((k) => k.startsWith('humi-') && k !== 'humi-auth')
          .forEach((k) => localStorage.removeItem(k));
      });

      await page.goto('/th/quick-approve');

      await expect(page.locator('[aria-label^="อนุมัติใบลา"]')).toHaveCount(3, { timeout: 10_000 });

      const firstApproveBtn = page.locator('[aria-label^="อนุมัติใบลา"]').first();
      const ariaLabel = await firstApproveBtn.getAttribute('aria-label');
      const employeeName = ariaLabel?.replace('อนุมัติใบลา ', '').trim() ?? '';

      await firstApproveBtn.click();

      await expect(page.locator('[aria-label^="อนุมัติใบลา"]')).toHaveCount(2, { timeout: 10_000 });
      await expect(
        page.locator(`[aria-label="อนุมัติใบลา ${employeeName}"]`),
      ).toHaveCount(0, { timeout: 10_000 });
    } finally {
      await ctx.close();
    }
  });

  test('Reject removes another row and persists rejected status in store', async ({ browser }) => {
    const ctx = await authedContext(browser, 'manager');
    const page = await ctx.newPage();

    try {
      const isReachable = await page
        .goto('/th/home', { timeout: 10_000 })
        .then(() => true)
        .catch(() => false);
      if (!isReachable) {
        test.skip();
        return;
      }

      // Clear non-auth stores so seed re-fires
      await page.evaluate(() => {
        Object.keys(localStorage)
          .filter((k) => k.startsWith('humi-') && k !== 'humi-auth')
          .forEach((k) => localStorage.removeItem(k));
      });

      await page.goto('/th/quick-approve');

      await expect(page.locator('[aria-label^="ปฏิเสธใบลา"]')).toHaveCount(3, { timeout: 10_000 });

      const firstRejectBtn = page.locator('[aria-label^="ปฏิเสธใบลา"]').first();
      const ariaLabel = await firstRejectBtn.getAttribute('aria-label');
      const employeeName = ariaLabel?.replace('ปฏิเสธใบลา ', '').trim() ?? '';

      await firstRejectBtn.click();

      await expect(page.locator('[aria-label^="ปฏิเสธใบลา"]')).toHaveCount(2, { timeout: 10_000 });
      await expect(
        page.locator(`[aria-label="ปฏิเสธใบลา ${employeeName}"]`),
      ).toHaveCount(0, { timeout: 10_000 });

      // Verify localStorage persists rejected status
      const storeData = await page.evaluate(() => {
        const raw = localStorage.getItem('humi-leave-approvals');
        if (!raw) return null;
        try { return JSON.parse(raw); } catch { return null; }
      });

      const requests: Array<{ employeeName: string; status: string }> =
        storeData?.state?.requests ?? [];
      const rejectedEntry = requests.find(
        (r) => r.employeeName === employeeName && r.status === 'rejected',
      );
      expect(rejectedEntry).toBeDefined();
      expect(rejectedEntry?.status).toBe('rejected');
    } finally {
      await ctx.close();
    }
  });
});
