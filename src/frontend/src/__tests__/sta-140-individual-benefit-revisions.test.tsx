/**
 * sta-140-individual-benefit-revisions.test.tsx
 *
 * STA-140 — 4 changes on the individual employee benefit page
 * (/admin/employees/[id]). Mockup phase, in-session state only.
 *
 *   1. "Adjust entitle amount" button moved into the Current Benefits header,
 *      to the LEFT of "Create special benefit"; removed from the Budget
 *      Reallocation header.
 *   2. "Effective end date" editable (date input) in BenefitDetailBody edit
 *      mode, seeded from the auto-default; status-flip refresh preserved.
 *   3. Attachment FileUploadField on all 5 action forms — InsertChangePopup
 *      gains a default-FALSE `showAttachment` prop-gate so catalog callers are
 *      unaffected; the employee page opts in.
 *   4. Enroll modal "Request Date" is read-only / disabled (keeps default).
 *
 * Page-internal components (BenefitDetailBody, EnrollmentFormBody) are not
 * exported, so those changes are asserted against page.tsx source (the same
 * source-guard pattern used elsewhere in this suite). The InsertChangePopup
 * prop-gate is asserted by rendering the real component.
 */

import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';

// ── next-intl mock: keys pass through; default locale 'en' ────────────────────
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

// ── isolate FileUploadField's Zustand store ───────────────────────────────────
vi.mock('@/stores/humi-profile-slice', () => ({
  useHumiProfileStore: (selector: (s: unknown) => unknown) =>
    selector({ addAttachment: vi.fn(), removeAttachment: vi.fn() }),
}));

import { InsertChangePopup } from '@/components/benefits/InsertChangePopup';

const PAGE_SRC = fs.readFileSync(
  path.join(
    process.cwd(),
    'src/app/[locale]/admin/employees/[id]/page.tsx',
  ),
  'utf8',
);

// ── Change 1 — button move (source structure) ─────────────────────────────────
describe('STA-140 Change 1 — Adjust button moved to Current Benefits header', () => {
  it('Current Benefits headerAction renders Adjust (reallocate) before Create-special', () => {
    const headerStart = PAGE_SRC.indexOf("id=\"emp-current-benefits\"");
    const headerEnd = PAGE_SRC.indexOf('headerAction={', headerStart);
    const block = PAGE_SRC.slice(headerEnd, headerEnd + 900);
    const adjustIdx = block.indexOf('reallocate-budget');
    const specialIdx = block.indexOf('special-privilege');
    expect(adjustIdx).toBeGreaterThan(-1);
    expect(specialIdx).toBeGreaterThan(-1);
    // Adjust (reallocate) must come first (left) in DOM order.
    expect(adjustIdx).toBeLessThan(specialIdx);
  });

  it('Budget Reallocation header no longer renders an Adjust button', () => {
    const start = PAGE_SRC.indexOf("id=\"emp-budget-reallocation\"");
    const end = PAGE_SRC.indexOf('>', PAGE_SRC.indexOf('children', start));
    // Scan the card opening props (up to its first child) — no headerAction here.
    const block = PAGE_SRC.slice(start, start + 700);
    expect(block).not.toContain('reallocate-budget');
  });
});

// ── Change 2 — editable effective end date (source structure) ─────────────────
describe('STA-140 Change 2 — Effective end date editable in edit mode', () => {
  it('BenefitDetailBody renders a date FormInput for the end date in edit mode', () => {
    expect(PAGE_SRC).toContain('onEffectiveEndChange');
    expect(PAGE_SRC).toContain('endDateValue');
    // controlled edit input seeded from the auto-default
    expect(PAGE_SRC).toMatch(
      /endDateValue \?\? effectiveEndDateOverride \?\? benefit\.effectiveEndDate/,
    );
  });

  it('parent holds endDateDraft seeded from the auto-default with a status-flip reset', () => {
    expect(PAGE_SRC).toContain('const [endDateDraft, setEndDateDraft]');
    // useEffect keyed on detailStatus re-applies the default (Inactive → today−1).
    expect(PAGE_SRC).toMatch(/inactiveEndDate\(new Date\(\)\)/);
    expect(PAGE_SRC).toMatch(/\[detailStatus, detailMode, benefitDetail\]/);
  });
});

// ── Change 3 — InsertChangePopup is date-only (STA-141 moved the attachment) ────
// STA-141 reverted STA-140's insert-popup attachment: the `showAttachment` prop
// is gone and the uploader now lives on BenefitDetailBody (edit mode). These
// assertions are updated to STA-141's behaviour so the build gate stays green.
describe('STA-141 — InsertChangePopup renders date-only (attachment relocated)', () => {
  it('renders no file input (the popup is date-only)', () => {
    render(
      <InsertChangePopup
        open
        benefitName="Medical"
        onProceed={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(document.querySelector('input[type="file"]')).toBeNull();
  });

  it('Insert call-site no longer passes showAttachment', () => {
    const idx = PAGE_SRC.indexOf('<InsertChangePopup');
    expect(idx).toBeGreaterThan(-1);
    const block = PAGE_SRC.slice(idx, idx + 600);
    expect(block).not.toContain('showAttachment');
  });

  it('BenefitDetailBody renders FileUploadField gated on edit mode', () => {
    // The attachment now lives in BenefitDetailBody, gated by mode === 'edit'.
    expect(PAGE_SRC).toContain('onAttachmentChange');
    expect(PAGE_SRC).toMatch(/mode === 'edit' && \(\s*<FileUploadField/);
  });

  it('page.tsx imports FileUploadField directly (not the barrel)', () => {
    expect(PAGE_SRC).toContain(
      "import { FileUploadField } from '@/components/humi/molecules/FileUploadField'",
    );
  });
});

// ── Change 4 — Enroll Request Date read-only (source structure) ───────────────
describe('STA-140 Change 4 — Enroll Request Date is read-only', () => {
  it('Request Date FormInput is value-controlled + readOnly + disabled', () => {
    const idx = PAGE_SRC.indexOf("'Request Date'");
    expect(idx).toBeGreaterThan(-1);
    const block = PAGE_SRC.slice(idx, idx + 200);
    expect(block).toMatch(/value=\{today\}\s+readOnly\s+disabled/);
  });
});
