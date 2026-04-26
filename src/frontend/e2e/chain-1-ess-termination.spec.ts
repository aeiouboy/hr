/**
 * chain-1-ess-termination.spec.ts
 *
 * Proves Chain 1 (BRD #172) end-to-end:
 *   Employee submits ESS termination → SPD approves → HR Admin sees approved status
 *
 * Design decisions:
 *   - Shared `page` via beforeAll so Zustand localStorage persists across the
 *     3 serial steps. Serial order enforced by test.describe.serial.
 *   - localStorage is cleared once in beforeAll, NOT in beforeEach, so the
 *     humi-termination-approvals entry created in step 1 survives to step 2/3.
 *   - SPD persona: auth.helper.ts only types employee|manager|hr_admin|hr_manager.
 *     We replicate the same cookie+route pattern inline for 'spd' rather than
 *     extending the shared helper (narrow scope).
 *   - Employee ID EMP-001: mock data uses `EMP-${padded3}` format; EMP001
 *     would not resolve on the detail page.
 *   - Reason code TERM_RESIGN ('ลาออกโดยสมัครใจ') — the task mentioned
 *     TERM_HEALTH which does not exist in the store's 17 SF codes.
 *   - humi-auth is seeded via addInitScript so Zustand has userId/username
 *     before React hydration (AuthSync's !isAuthenticated guard would
 *     otherwise block re-sync when the store already has a stale value).
 */

import { test, expect, type Page, type Browser } from '@playwright/test';
import { mockAuthSession } from './helpers/auth.helper';

// ── Constants ─────────────────────────────────────────────────────────────────

const TEST_EMPLOYEE_ID = 'EMP-001';
const EMPLOYEE_NAME    = 'Somchai Jaidee';  // matches auth.helper TEST_USERS.employee
const EMPLOYEE_EMAIL   = 'emp.test@central.co.th';
const RESIGN_REASON_VALUE = 'TERM_RESIGN';
const RESIGN_REASON_LABEL = 'ลาออกโดยสมัครใจ';
const THAI_COMMENT        = 'ทดสอบการยื่นคำขอลาออกผ่านระบบ Self-Service';

// Last working day = today + 31 days (min is 30; +1 to clear TZ edge cases)
function lastWorkingDay(): string {
  const d = new Date(Date.now() + 31 * 24 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

// ── Inline SPD session helper (mirrors mockAuthSession for 'spd' role) ────────

async function mockSpdSession(page: Page): Promise<void> {
  await page.context().addCookies([
    {
      name: 'next-auth.session-token',
      value: `mock-session-spd-${Date.now()}`,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    },
  ]);
  await page.route('**/api/auth/session', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user: {
          id: 'SPD001',
          name: 'Kamol Srisuwan',
          email: 'spd.test@central.co.th',
          roles: ['spd'],
        },
        expires: new Date(Date.now() + 86_400_000).toISOString(),
        accessToken: 'mock-token-spd',
      }),
    }),
  );
}

// ── Seed Zustand humi-auth store before page load ─────────────────────────────
// AuthSync only calls setUser when !isAuthenticated; if a stale value lingers
// it won't re-sync.  addInitScript runs before any JS so the store starts clean.

async function seedAuthStore(
  page: Page,
  userId: string,
  username: string,
  email: string,
  roles: string[],
): Promise<void> {
  await page.addInitScript(
    ({ userId, username, email, roles }) => {
      localStorage.setItem(
        'humi-auth',
        JSON.stringify({
          state: {
            userId,
            username,
            email,
            roles,
            isAuthenticated: false, // let AuthSync pick it up normally
            originalUser: null,
          },
          version: 0,
        }),
      );
    },
    { userId, username, email, roles },
  );
}

// ── Suite ─────────────────────────────────────────────────────────────────────

test.describe.serial('Chain 1 — ESS Termination → SPD → HR Admin (BRD #172)', () => {
  let browser: Browser;
  let page: Page;

  test.beforeAll(async ({ browser: b }) => {
    browser = b;
    page = await browser.newPage();
    // Clear all localStorage once at the start of the chain
    await page.goto('/th/home').catch(() => {});
    await page.evaluate(() => localStorage.clear()).catch(() => {});
  });

  test.afterAll(async () => {
    await page.close().catch(() => {});
  });

  // ── Test 1: Employee submits termination request ─────────────────────────

  test('Employee submits termination request', async () => {
    // Skip gracefully if dev server is unreachable
    let reachable = true;
    await page.goto('/th/home', { timeout: 10_000 }).catch(() => { reachable = false; });
    if (!reachable) {
      test.skip(true, 'Dev server unreachable');
      return;
    }

    // Set up employee session + seed auth store
    await mockAuthSession(page, 'employee');
    await seedAuthStore(page, TEST_EMPLOYEE_ID, EMPLOYEE_NAME, EMPLOYEE_EMAIL, ['employee']);

    // Navigate to resignation page
    await page.goto('/th/resignation', { waitUntil: 'domcontentloaded' });

    // Wait for the form to render (label or heading present)
    await expect(
      page.getByText(/วันทำงานวันสุดท้าย/),
    ).toBeVisible({ timeout: 10_000 });

    // Fill last working day
    await page.getByLabel(/วันทำงานวันสุดท้าย/).fill(lastWorkingDay());

    // Select resignation reason
    await page.getByLabel(/เหตุผลการลาออก/).selectOption({ value: RESIGN_REASON_VALUE });

    // Fill Thai comment
    await page.getByLabel(/หมายเหตุเพิ่มเติม/).fill(THAI_COMMENT);

    // File attachment is optional — skip per spec

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
  });

  // ── Test 2: SPD approves the termination ────────────────────────────────

  test('SPD approves the termination', async () => {
    // Switch to SPD persona: clear auth so AuthSync re-syncs, then mock session
    await page.evaluate(() => localStorage.removeItem('humi-auth')).catch(() => {});
    await mockSpdSession(page);
    await seedAuthStore(page, 'SPD001', 'Kamol Srisuwan', 'spd.test@central.co.th', ['spd']);

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
    // The card renders "อนุมัติ" only in mode=none; after click it enters mode=approve
    const approveBtn = page.getByRole('button', { name: 'อนุมัติ' }).first();
    await expect(approveBtn).toBeVisible({ timeout: 10_000 });
    await approveBtn.click();

    // Confirmation textarea appears (mode=approve); click ยืนยันอนุมัติ
    const confirmBtn = page.getByRole('button', { name: 'ยืนยันอนุมัติ' }).first();
    await expect(confirmBtn).toBeVisible({ timeout: 10_000 });
    await confirmBtn.click();

    // After approval the row should move to history; the pending section should
    // show empty state or the card should no longer have "อนุมัติ" action
    await expect(
      page.getByText(/ไม่มีคำขอลาออกรอการอนุมัติ|อนุมัติแล้ว/).first(),
    ).toBeVisible({ timeout: 10_000 });
  });

  // ── Test 3: HR Admin sees approved status on the detail snapshot ─────────

  test('HR Admin sees approved status on Employee Detail snapshot', async () => {
    // Switch to HR Admin persona
    await page.evaluate(() => localStorage.removeItem('humi-auth')).catch(() => {});
    await mockAuthSession(page, 'hr_admin');
    await seedAuthStore(page, 'HRA001', 'Narong Prasert', 'hr.admin@central.co.th', ['hr_admin']);

    // Navigate to employee detail page for EMP-001
    await page.goto(`/th/admin/employees/${TEST_EMPLOYEE_ID}`, {
      waitUntil: 'domcontentloaded',
    });

    // Confirm the employee detail page loaded (section heading)
    await expect(
      page.getByText(/ข้อมูลส่วนตัว|ข้อมูลการจ้างงาน/).first(),
    ).toBeVisible({ timeout: 10_000 });

    // Workflow status snapshot section: "คำขอที่เกี่ยวข้อง"
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
  });
});
