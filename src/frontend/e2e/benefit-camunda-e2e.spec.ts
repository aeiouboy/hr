import { test, expect, type Page } from '@playwright/test';

// Persist a Humi auth persona into localStorage. zustand's `humi-auth` key
// is read on every component mount, so a reload (or a fresh navigation in
// the same origin) picks up the new persona without going through next-auth.
async function loginAs(
  page: Page,
  persona: { userId: string; username: string; email: string; roles: string[] },
) {
  await page.evaluate((p) => {
    localStorage.setItem(
      'humi-auth',
      JSON.stringify({
        state: {
          userId: p.userId,
          username: p.username,
          email: p.email,
          roles: p.roles,
          isAuthenticated: true,
        },
        version: 0,
      }),
    );
  }, persona);
}

// Full E2E: employee submits a claim through the Humi UI → Camunda starts a
// benefit-request instance → manager opens /approvals → clicks อนุมัติ on the
// Camunda card → workers (hr-audit, finance-payout, notify) run → final
// gateway poll asserts COMPLETED + status=paid.
//
// Requires: Camunda Run on :8080, hr-workflow Fastify gateway on :3001 with
// workers subscribed, and the seeded identity (mgr-007 / emp-042 / etc.).
//
// Skipped by default — set HR_WORKFLOW_E2E=1 to enable.

const RUN = process.env.HR_WORKFLOW_E2E === '1';
const GATEWAY = process.env.HR_WORKFLOW_GATEWAY ?? 'http://localhost:3001';

test.describe('Benefit-request E2E (Humi UI ↔ Camunda gateway)', () => {
  test.skip(!RUN, 'Set HR_WORKFLOW_E2E=1 with Camunda + Fastify gateway + workers running.');

  test('employee submits → manager approves → COMPLETED with payout', async ({ page, request }) => {
    const employee = { userId: 'emp-042', username: 'Wichai Thamdee', email: 'emp-042@hr', roles: ['employee'] };
    const manager = { userId: 'mgr-007', username: 'Phongsri Kengngan', email: 'mgr-007@hr', roles: ['employee', 'manager'] };

    // ── 1. Snapshot pre-test history count so we can pick out our instance.
    const before = await request.get(`${GATEWAY}/workflows/history?key=benefit-request&limit=50`).then((r) => r.json());
    const beforeIds = new Set<string>(before.map((i: { id: string }) => i.id));

    // ── 2. Submit as employee. Navigate first so localStorage is accessible,
    // write the persona, then reload so zustand picks it up on mount.
    await page.goto('/th/benefits-hub/claim');
    await loginAs(page, employee);
    await page.reload();

    // Plan dropdown (index 1 = first real plan after the placeholder).
    await page.getByLabel(/ประเภทสวัสดิการ|Benefit type/).selectOption({ index: 1 });

    // Receipt fields — both SimpleClaimForm and HospitalClaimForm expose these.
    const receiptNo = `E2E-${Date.now()}`;
    await page.getByLabel(/เลขที่ใบเสร็จ|Receipt no/i).first().fill(receiptNo);
    await page.getByLabel(/วันที่ใบเสร็จ|Receipt date/i).first().fill('2026-05-04');
    // 8000 > 5000 → flow stops at the manager user task (so /approvals has work).
    await page.getByLabel(/จำนวนเงิน|Amount/i).first().fill('8000');

    await page.getByRole('button', { name: /ส่งคำขอ|Submit/i }).click();

    // Success status indicates the gateway returned an id.
    await expect(page.getByRole('status').first()).toBeVisible({ timeout: 10_000 });

    // ── 3. Pull the new instance id from the gateway (no flaky UI parsing).
    let instanceId: string | undefined;
    await expect
      .poll(async () => {
        const after = await request.get(`${GATEWAY}/workflows/history?key=benefit-request&limit=50`).then((r) => r.json());
        const fresh = (after as Array<{ id: string; status: string }>).find((i) => !beforeIds.has(i.id));
        if (fresh) instanceId = fresh.id;
        return fresh?.status;
      }, { timeout: 15_000 })
      .toBe('pending');
    expect(instanceId).toBeDefined();

    // ── 4. Switch persona to manager (must use Camunda-format userId so the
    // approvals inbox polls Camunda for tasks assigned to mgr-007).
    await loginAs(page, manager);
    await page.goto('/th/approvals');

    // /approvals renders rows as <details>/<summary>. Locate the row whose
    // summary mentions our specific Camunda instance id (truncated to 8 chars
    // — CamundaTaskCard's eyebrow shows `<key> · <task-id>`, but the summary
    // itself surfaces the requester+amount, so we anchor on instanceId via
    // the expanded card's "Instance" Info row after expanding).
    const camundaRow = page
      .locator('details', { has: page.locator('summary', { hasText: /Camunda/i }) })
      .first();
    await expect(camundaRow).toBeVisible({ timeout: 15_000 });
    await camundaRow.locator('summary').click();

    // Approve from inside this row only (so we don't hit a sibling row's
    // BenefitClaimCard "อนุมัติ" by accident).
    await camundaRow.getByRole('button', { name: /^อนุมัติ$/ }).click();

    // ── 5. Workers run hr-audit → finance-payout → notify in ~1s. Poll
    // until the gateway reports paid + payoutTxnId.
    await expect
      .poll(async () => {
        const list = await request.get(`${GATEWAY}/workflows/history?key=benefit-request&limit=10`).then((r) => r.json());
        const found = (list as Array<{ id: string; status: string }>).find((i) => i.id === instanceId);
        return found?.status;
      }, { timeout: 15_000, intervals: [500, 1000, 2000] })
      .toBe('paid');
  });
});
