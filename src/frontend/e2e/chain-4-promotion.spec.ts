import { test, expect, type Browser, type BrowserContext, type Page } from '@playwright/test';
import { mockAuthSession } from './helpers/auth.helper';

// ─── Chain 4 — Promotion → SPD (BRD #103) ─────────────────────────────────────
//
// Tests the full approval chain introduced in the Phase 4 fix:
//   1. HR Admin submits promotion → stored as pending_spd
//   2. Phase 4 fix: timeline event is NOT written at submit time (verified here)
//   3. SPD approves → timeline event written inside approve() action
//   4. HR Admin navigates back → event IS now visible
//
// Shared BrowserContext: all three tests share one page so localStorage (Zustand
// persist) survives across steps. Playwright test.describe.serial guarantees
// sequential execution. A fresh browserContext is created in beforeAll and torn
// down in afterAll — the test's {page} fixture is deliberately unused.
//
// Employee: EMP-0001 is chosen because the deterministic PRNG (seed 42) generates
// it as status='active', probation_status='passed' — satisfying actionAvailability
// .promotion.ok. We navigate directly by ID rather than clicking through the list.

const EMPLOYEE_ID = 'EMP-0001';

// Effective date must be today or future (EffectiveDateGate validation).
// Pick tomorrow in YYYY-MM-DD to guarantee it is never "today" at midnight.
function tomorrowISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

// ─── Shared state across the serial suite ────────────────────────────────────

let sharedBrowser: Browser;
let sharedContext: BrowserContext;
let sharedPage: Page;

test.describe.serial('Chain 4 — Promotion → SPD (BRD #103)', () => {
  test.beforeAll(async ({ browser }) => {
    sharedBrowser = browser;
    sharedContext = await browser.newContext();
    sharedPage = await sharedContext.newPage();
  });

  test.afterAll(async () => {
    await sharedContext.close();
  });

  // Skip entire suite gracefully if dev server is unreachable.
  test.beforeAll(async () => {
    const reachable = await sharedPage
      .goto('/th/home', { timeout: 10_000 })
      .then(() => true)
      .catch(() => false);
    if (!reachable) {
      test.skip();
    }
  });

  // ── Test 1: HR Admin submits promotion; timeline NOT yet materialized ─────

  test('HR Admin submits promotion (timeline NOT yet materialized)', async () => {
    const page = sharedPage;

    // Establish HR Admin session on the shared page
    await mockAuthSession(page, 'hr_admin');

    // Navigate directly to the promotion form for the chosen employee
    await page.goto(`/th/admin/employees/${EMPLOYEE_ID}/promotion`);
    await expect(page.getByRole('heading', { name: /เลื่อนตำแหน่ง/i })).toBeVisible({
      timeout: 10_000,
    });

    // ── Step 1: Satisfy the EffectiveDateGate ─────────────────────────────
    // The gate renders an <input type="date"> with aria-label "วันที่มีผล".
    // Fill it with a future date then click "ยืนยันวันที่มีผล".
    const dateInput = page.getByRole('textbox', { name: /วันที่มีผล/i });
    await expect(dateInput).toBeVisible({ timeout: 10_000 });
    await dateInput.fill(tomorrowISO());
    await page.getByRole('button', { name: /ยืนยันวันที่มีผล/i }).click();

    // The child form should now be visible (EffectiveDateGate confirmed).
    await expect(page.getByText(/ข้อมูลการเลื่อนตำแหน่ง/i)).toBeVisible({ timeout: 10_000 });

    // ── Step 2: Fill the PositionLookup combobox ──────────────────────────
    // The combobox has role="combobox" with placeholder text.
    // Type a search term, wait for the listbox, then click the first option.
    const positionInput = page.getByRole('combobox', {
      name: /เลื่อนไปเป็น/i,
    });
    await expect(positionInput).toBeVisible({ timeout: 10_000 });
    await positionInput.fill('ผู้จัดการ');
    // Wait for at least one option to appear in the listbox
    const firstOption = page.getByRole('option').first();
    await expect(firstOption).toBeVisible({ timeout: 10_000 });
    await firstOption.click();
    // Chip confirms selection was made
    await expect(page.getByRole('status', { name: /ตำแหน่งที่เลือก/i })).toBeVisible({
      timeout: 10_000,
    });

    // ── Step 3: Submit the form ───────────────────────────────────────────
    await page.getByRole('button', { name: /บันทึกการเลื่อนตำแหน่ง/i }).click();

    // After submit the page redirects to the detail page with a banner
    await expect(page).toHaveURL(
      new RegExp(`/th/admin/employees/${EMPLOYEE_ID}`),
      { timeout: 10_000 },
    );
    // Banner confirms submission went to SPD queue
    await expect(
      page.getByText(/รอ SPD อนุมัติ/i).first(),
    ).toBeVisible({ timeout: 10_000 });

    // ── Phase 4 fix verification (most critical assertion) ────────────────
    // At this point status is pending_spd. The approve() action has NOT been
    // called, so useTimelines.append() was NOT called. The timeline section on
    // the detail page must NOT contain a "เลื่อนตำแหน่ง" event row.
    //
    // We assert the timeline event label is absent. The detail page renders
    // timeline events using EVENT_LABELS.promotion = 'เลื่อนตำแหน่ง' as row text,
    // but only once the timeline store has an event of kind 'promotion'.
    // Before SPD approval there is no such event, so the text must not appear
    // inside the timeline section.
    await expect(
      page.getByText('เลื่อนตำแหน่ง').first(),
    ).not.toBeVisible({ timeout: 5_000 });
  });

  // ── Test 2: SPD approves the promotion ───────────────────────────────────

  test('SPD approves the promotion', async () => {
    const page = sharedPage;

    // Switch session to SPD on the same shared context (localStorage survives)
    await mockAuthSession(page, 'spd');

    await page.goto('/th/spd/inbox');
    await expect(
      page.getByText(/คำขอเลื่อนตำแหน่ง — รอ SPD อนุมัติ/i),
    ).toBeVisible({ timeout: 10_000 });

    // The pending section must show the submitted employee row
    await expect(
      page.getByText(new RegExp(EMPLOYEE_ID)).first(),
    ).toBeVisible({ timeout: 10_000 });

    // Click "อนุมัติ" on the first pending card
    const approveBtn = page.getByRole('button', { name: /^อนุมัติ$/i }).first();
    await expect(approveBtn).toBeVisible({ timeout: 10_000 });
    await approveBtn.click();

    // Confirmation panel appears — click "ยืนยันอนุมัติ"
    const confirmBtn = page.getByRole('button', { name: /ยืนยันอนุมัติ/i });
    await expect(confirmBtn).toBeVisible({ timeout: 10_000 });
    await confirmBtn.click();

    // The card moves to history — the tag "อนุมัติแล้ว" should appear
    await expect(
      page.getByText('อนุมัติแล้ว').first(),
    ).toBeVisible({ timeout: 10_000 });
  });

  // ── Test 3: HR Admin sees approved status + timeline event materialized ──

  test('HR Admin sees approved status + timeline event materialized', async () => {
    const page = sharedPage;

    // Switch back to HR Admin session
    await mockAuthSession(page, 'hr_admin');

    await page.goto(`/th/admin/employees/${EMPLOYEE_ID}`);
    await expect(
      page.getByRole('heading', { level: 1 }).first(),
    ).toBeVisible({ timeout: 10_000 });

    // Promotion workflow status chip should show "อนุมัติแล้ว"
    await expect(
      page.getByText('อนุมัติแล้ว').first(),
    ).toBeVisible({ timeout: 10_000 });

    // ── Phase 4 fix verification (most critical assertion) ────────────────
    // approve() called useTimelines.getState().append() which wrote a
    // PromotionEvent (kind: 'promotion') into the timeline store.
    // The detail page renders this as EVENT_LABELS.promotion = 'เลื่อนตำแหน่ง'.
    // NOW the text MUST be visible in the timeline.
    await expect(
      page.getByText('เลื่อนตำแหน่ง').first(),
    ).toBeVisible({ timeout: 10_000 });
  });
});
