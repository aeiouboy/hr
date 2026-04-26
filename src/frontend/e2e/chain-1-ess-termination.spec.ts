/**
 * chain-1-ess-termination.spec.ts
 *
 * Proves Chain 1 (BRD #172) end-to-end:
 *   Employee submits ESS termination → SPD approves → HR Admin sees approved status
 *
 * Auth strategy: storageState from e2e/.auth/<role>.json (set by global-setup).
 * Each persona gets its own browser context so the Zustand humi-auth store is
 * isolated per role transition.
 *
 * localStorage clear strategy: only clear non-auth humi-* keys so the
 * humi-auth store (required for routing) is preserved.
 */

import { test, expect, type Browser, type Page } from '@playwright/test';
import { authedContext } from './helpers/storage-auth.helper';

// ── Constants ─────────────────────────────────────────────────────────────────

const TEST_EMPLOYEE_ID = 'EMP-001';
const EMPLOYEE_NAME    = 'สมชาย ใจดี';  // DEMO_USERS employee@humi.test
const RESIGN_REASON_VALUE = 'TERM_RESIGN';
const RESIGN_REASON_LABEL = 'ลาออกโดยสมัครใจ';
const THAI_COMMENT        = 'ทดสอบการยื่นคำขอลาออกผ่านระบบ Self-Service';

// Last working day = today + 31 days (min is 30; +1 to clear TZ edge cases)
function lastWorkingDay(): string {
  const d = new Date(Date.now() + 31 * 24 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

/** Clear all humi-* localStorage keys except humi-auth. */
async function clearNonAuthStorage(page: Page): Promise<void> {
  await page.evaluate(() => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith('humi-') && k !== 'humi-auth')
      .forEach((k) => localStorage.removeItem(k));
  });
}

// ── Suite ─────────────────────────────────────────────────────────────────────

test.describe.serial('Chain 1 — ESS Termination → SPD → HR Admin (BRD #172)', () => {
  // ── Test 1: Employee submits termination request ─────────────────────────

  test('Employee submits termination request', async ({ browser }) => {
    const ctx = await authedContext(browser, 'employee');
    const page = await ctx.newPage();

    try {
      // Skip gracefully if dev server is unreachable
      let reachable = true;
      await page.goto('/th/home', { timeout: 10_000 }).catch(() => { reachable = false; });
      if (!reachable) {
        test.skip(true, 'Dev server unreachable');
        return;
      }

      await clearNonAuthStorage(page);

      // Navigate to resignation page
      await page.goto('/th/resignation', { waitUntil: 'domcontentloaded' });

      // Wait for the form to render
      await expect(
        page.getByText(/วันทำงานวันสุดท้าย/),
      ).toBeVisible({ timeout: 10_000 });

      // Fill last working day
      await page.getByLabel(/วันทำงานวันสุดท้าย/).fill(lastWorkingDay());

      // Select resignation reason
      await page.getByLabel(/เหตุผลการลาออก/).selectOption({ value: RESIGN_REASON_VALUE });

      // Fill Thai comment
      await page.getByLabel(/หมายเหตุเพิ่มเติม/).fill(THAI_COMMENT);

      // Submit
      await page.getByRole('button', { name: 'ส่งคำขอลาออก' }).click();

      // Confirm success banner / toast
      await expect(
        page.getByText(/ส่งคำขอลาออกแล้ว|รอ SPD อนุมัติ/),
      ).toBeVisible({ timeout: 10_000 });

      // Confirmation card shows reason label
      await expect(
        page.getByText(RESIGN_REASON_LABEL),
      ).toBeVisible({ timeout: 10_000 });
    } finally {
      await ctx.close();
    }
  });

  // ── Test 2: SPD approves the termination ────────────────────────────────

  test('SPD approves the termination', async ({ browser }) => {
    const ctx = await authedContext(browser, 'spd');
    const page = await ctx.newPage();

    try {
      // Navigate to SPD inbox
      await page.goto('/th/spd/inbox', { waitUntil: 'domcontentloaded' });

      // Wait for TerminationInbox section header
      await expect(
        page.getByText(/คำขอลาออก.*รอ SPD อนุมัติ|การลาออก|Termination/i).first(),
      ).toBeVisible({ timeout: 10_000 });

      // Locate the pending row for our employee / reason
      const pendingRow = page
        .getByText(RESIGN_REASON_LABEL)
        .or(page.getByText(EMPLOYEE_NAME))
        .first();
      await expect(pendingRow).toBeVisible({ timeout: 10_000 });

      // Click the Approve button in the TerminationCard
      const approveBtn = page.getByRole('button', { name: 'อนุมัติ' }).first();
      await expect(approveBtn).toBeVisible({ timeout: 10_000 });
      await approveBtn.click();

      // Confirmation textarea appears; click ยืนยันอนุมัติ
      const confirmBtn = page.getByRole('button', { name: 'ยืนยันอนุมัติ' }).first();
      await expect(confirmBtn).toBeVisible({ timeout: 10_000 });
      await confirmBtn.click();

      // After approval the row should show approved state
      await expect(
        page.getByText(/ไม่มีคำขอลาออกรอการอนุมัติ|อนุมัติแล้ว/).first(),
      ).toBeVisible({ timeout: 10_000 });
    } finally {
      await ctx.close();
    }
  });

  // ── Test 3: HR Admin sees approved status on the detail snapshot ─────────

  test('HR Admin sees approved status on Employee Detail snapshot', async ({ browser }) => {
    const ctx = await authedContext(browser, 'hr_admin');
    const page = await ctx.newPage();

    try {
      // Navigate to employee detail page for EMP-001
      await page.goto(`/th/admin/employees/${TEST_EMPLOYEE_ID}`, {
        waitUntil: 'domcontentloaded',
      });

      // Confirm the employee detail page loaded
      await expect(
        page.getByText(/ข้อมูลส่วนตัว|ข้อมูลการจ้างงาน/).first(),
      ).toBeVisible({ timeout: 10_000 });

      // Workflow status snapshot section
      await expect(
        page.getByText('คำขอที่เกี่ยวข้อง'),
      ).toBeVisible({ timeout: 10_000 });

      // Termination request label
      await expect(
        page.getByText(/คำขอลาออก.*BRD.*172/),
      ).toBeVisible({ timeout: 10_000 });

      // Status badge shows อนุมัติแล้ว
      await expect(
        page.getByText('อนุมัติแล้ว'),
      ).toBeVisible({ timeout: 10_000 });
    } finally {
      await ctx.close();
    }
  });
});
