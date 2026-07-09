/**
 * sta-141-current-benefit-revisions.test.tsx
 *
 * STA-141 — 3 tweaks on the individual employee benefit page
 * (/admin/employees/[id]). Mockup phase, in-session state only.
 *
 *   1. Delete (trash) icon on each Current Benefits row → confirm modal
 *      (reuses STA-139's admin_benefits_plans delete copy); confirm removes the
 *      row from the in-session shadow (empty-state when the last row is gone).
 *   2. Attachment FileUploadField MOVED off the Insert date-popup into
 *      BenefitDetailBody (edit mode only); the popup reverts to date-only.
 *   3. Cancel + Save footer at the bottom of the Insert detail page (edit mode).
 *
 * BenefitDetailBody is not exported, so its behaviour is asserted against
 * page.tsx source (the source-guard pattern used across this suite). The
 * InsertChangePopup date-only behaviour is asserted by rendering the real
 * component. The in-session delete filter is asserted as a pure-function unit.
 */

import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// ── next-intl mock: keys pass through; default locale 'en' ────────────────────
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

import { InsertChangePopup } from '@/components/benefits/InsertChangePopup';

const PAGE_SRC = fs.readFileSync(
  path.join(
    process.cwd(),
    'src/app/[locale]/admin/employees/[id]/page.tsx',
  ),
  'utf8',
);

// ── Change 1 — Delete icon + confirm modal ────────────────────────────────────
describe('STA-141 Change 1 — Delete icon + confirm modal on Current Benefits', () => {
  it('renders a Trash2 delete row-action wired to setDeleteTarget', () => {
    // A Delete <td> button opens the confirm modal for that row.
    expect(PAGE_SRC).toMatch(/onClick=\{\(\) => setDeleteTarget\(b\)\}/);
    expect(PAGE_SRC).toMatch(/<Trash2 size=\{16\} aria-hidden \/>/);
    // sr-only Delete label for accessibility (TH/EN parity).
    expect(PAGE_SRC).toMatch(/isTh \? 'ลบ' : 'Delete'/);
  });

  it('renders a delete-confirm Modal reusing the STA-139 admin_benefits_plans copy', () => {
    expect(PAGE_SRC).toContain("useTranslations('admin_benefits_plans')");
    expect(PAGE_SRC).toContain("tPlans('deleteConfirmTitle')");
    expect(PAGE_SRC).toContain("tPlans('deleteConfirmBody')");
    // Delete button is pumpkin danger (NO-RED), Cancel is secondary.
    expect(PAGE_SRC).toMatch(/variant="danger" onClick=\{\(\) => handleDelete\(deleteTarget\)\}/);
    // Body shows the row's benefitName (benefitPlanId).
    expect(PAGE_SRC).toMatch(/deleteTarget\.benefitName\} \(\{deleteTarget\.benefitPlanId\}\)/);
  });

  it('table empty-state + map read the in-session shadow (benefitRows), not the const', () => {
    expect(PAGE_SRC).toContain('const [benefitRows, setBenefitRows]');
    expect(PAGE_SRC).toMatch(/\{benefitRows\.length === 0 \?/);
    expect(PAGE_SRC).toMatch(/\{benefitRows\.map\(\(b\) =>/);
  });

  it('the delete handler removes the row from the in-session list by benefitPlanId', () => {
    // Mirror handleDelete's filter to prove the last-row-removal → empty list.
    type Row = { benefitPlanId: string };
    const rows: Row[] = [{ benefitPlanId: 'TH_MED_001' }, { benefitPlanId: 'TH_DEN_001' }];
    const remove = (prev: Row[], b: Row) => prev.filter((r) => r.benefitPlanId !== b.benefitPlanId);
    const after = remove(rows, { benefitPlanId: 'TH_MED_001' });
    expect(after).toHaveLength(1);
    expect(after[0].benefitPlanId).toBe('TH_DEN_001');
    // Removing the last remaining row yields an empty list → EmptyState renders.
    expect(remove(after, { benefitPlanId: 'TH_DEN_001' })).toHaveLength(0);
  });
});

// ── Change 2 — attachment moved to the detail page (edit mode only) ───────────
describe('STA-141 Change 2 — attachment relocated to BenefitDetailBody (edit mode)', () => {
  it('Insert date-popup renders date-only (no file input)', () => {
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

  it('BenefitDetailBody gates FileUploadField on mode === edit', () => {
    expect(PAGE_SRC).toMatch(/mode === 'edit' && \(\s*<FileUploadField/);
    // wired to in-session attachment state (filename only).
    expect(PAGE_SRC).toContain('onAttachmentChange');
    expect(PAGE_SRC).toContain('const [insertAttachment, setInsertAttachment]');
  });

  it('keeps the direct FileUploadField import (now used by BenefitDetailBody)', () => {
    expect(PAGE_SRC).toContain(
      "import { FileUploadField } from '@/components/humi/molecules/FileUploadField'",
    );
  });
});

// ── Change 3 — Cancel + Save footer on the Insert detail page ─────────────────
describe('STA-141 Change 3 — Cancel/Save footer on the Insert detail (edit mode)', () => {
  it('renders a footer gated on detailMode === edit with Cancel + Save', () => {
    expect(PAGE_SRC).toMatch(/detailMode === 'edit' && \(/);
    expect(PAGE_SRC).toMatch(/variant="secondary" onClick=\{closeDetail\}/);
    expect(PAGE_SRC).toMatch(/variant="primary" onClick=\{handleInsertSave\}/);
    // TH/EN parity on the footer labels.
    expect(PAGE_SRC).toMatch(/isTh \? 'ยกเลิก' : 'Cancel'/);
    expect(PAGE_SRC).toMatch(/isTh \? 'บันทึก' : 'Save'/);
  });

  it('extracts closeDetail (shared by X + Cancel) and a separate handleInsertSave', () => {
    expect(PAGE_SRC).toContain('const closeDetail = ()');
    expect(PAGE_SRC).toContain('const handleInsertSave = ()');
    // Save appends a change-log entry via the same history store (action insert).
    expect(PAGE_SRC).toMatch(/handleInsertSave[\s\S]*?addBenefitHistory\(\{[\s\S]*?action: 'insert'/);
  });
});

// ── InsertChangePopup still works as a date-gate ──────────────────────────────
describe('STA-141 — InsertChangePopup still proceeds with a date', () => {
  it('fires onProceed with the chosen date', () => {
    const onProceed = vi.fn();
    render(
      <InsertChangePopup
        open
        benefitName="Medical"
        defaultDate="2026-06-23"
        onProceed={onProceed}
        onCancel={() => {}}
      />,
    );
    fireEvent.click(screen.getByText('proceed'));
    expect(onProceed).toHaveBeenCalledWith('2026-06-23');
  });
});
