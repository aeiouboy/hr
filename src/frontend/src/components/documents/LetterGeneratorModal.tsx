'use client';

// ════════════════════════════════════════════════════════════
// LetterGeneratorModal — employee self-service "Generate Document"
//
// SF SuccessFactors "Document Generation" (ESS) model: pick a curated
// letter → the merge engine fills it with the LOGGED-IN employee's OWN
// data → preview → instant download. NO approval, NO request queue.
//
// Self-service = own data only: the employee record is resolved from the
// signed-in email; there is NO employee picker here.
// ════════════════════════════════════════════════════════════

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { FileText, Download, Printer } from 'lucide-react';
import { Modal } from '@/components/humi/organisms/Modal';
import { Button } from '@/components/humi/atoms/Button';
import {
  GENERATABLE_LETTERS,
  type GeneratableLetter,
} from '@/data/documents/templates';
import {
  mergeLetter,
  letterToHtml,
  downloadLetter,
  mockHireDate,
} from '@/lib/documents/merge-letter';
import type { HumiEmployee } from '@/lib/humi-mock-data';
import { formatDate } from '@/lib/date';

interface LetterGeneratorModalProps {
  open: boolean;
  onClose: () => void;
  /** The logged-in employee (self). When null, generation is disabled. */
  employee: HumiEmployee | null;
}

/**
 * Deterministic mock monthly salary for the salary certificate.
 * The HumiEmployee pool carries NO salary field (audit gap), so for the
 * self-service mockup we derive a stable pseudo-salary from the employee id
 * — same employee always yields the same number. Range ~25k–95k THB.
 */
function mockMonthlySalary(emp: HumiEmployee): number {
  let hash = 0;
  for (const ch of emp.id) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return 25000 + (hash % 71) * 1000;
}

export function LetterGeneratorModal({ open, onClose, employee }: LetterGeneratorModalProps) {
  const locale = useLocale() as 'th' | 'en';
  const t = useTranslations('doc_generate');
  const [selectedId, setSelectedId] = useState<string>(GENERATABLE_LETTERS[0]?.id ?? '');

  const selected: GeneratableLetter | undefined = useMemo(
    () => GENERATABLE_LETTERS.find((l) => l.id === selectedId),
    [selectedId],
  );

  // Merge the selected letter against the signed-in employee's OWN data.
  const merged = useMemo(() => {
    if (!employee || !selected) return null;
    return mergeLetter(selected, employee, locale, {
      today: formatDate(new Date().toISOString().slice(0, 10), 'long', locale),
      salaryMonthly: mockMonthlySalary(employee),
      hireDate: employee.hireDate ?? mockHireDate(employee),
    });
  }, [employee, selected, locale]);

  const employeeName = employee
    ? locale === 'th'
      ? `${employee.firstNameTh} ${employee.lastNameTh}`.trim()
      : `${employee.firstNameEn || employee.firstNameTh} ${employee.lastNameEn || employee.lastNameTh}`.trim()
    : '';

  function handleDownload() {
    if (!merged || !selected) return;
    const html = letterToHtml(merged, locale);
    downloadLetter(html, `${selected.id}-${employee?.employeeCode ?? 'self'}.html`);
  }

  function handlePrint() {
    if (!merged || typeof window === 'undefined') return;
    const html = letterToHtml(merged, locale);
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(html);
    w.document.close();
    w.focus();
    w.print();
  }

  return (
    <Modal open={open} onClose={onClose} title={t('modalTitle')} widthClass="max-w-2xl">
      <div data-testid="letter-generator">
        {!employee ? (
          <p
            data-testid="generator-no-employee"
            className="rounded-md border border-hairline bg-canvas-soft px-4 py-3 text-small text-ink-muted"
          >
            {t('noEmployee')}
          </p>
        ) : (
          <>
            {/* For: <self> — no picker, own data only */}
            <div className="mb-5 flex flex-wrap items-center gap-2 text-small">
              <span className="text-ink-muted">{t('forEmployee')}</span>
              <span className="font-semibold text-ink" data-testid="generator-self-name">
                {employeeName}
              </span>
              <span className="humi-tag humi-tag--accent">{t('selfBadge')}</span>
            </div>

            {/* Letter picker */}
            <div className="mb-5">
              <p className="mb-2 text-small font-semibold uppercase tracking-[0.08em] text-ink-muted">
                {t('pickLetter')}
              </p>
              <div className="grid gap-2 sm:grid-cols-2" data-testid="generator-letter-picker">
                {GENERATABLE_LETTERS.map((letter) => {
                  const active = letter.id === selectedId;
                  return (
                    <button
                      key={letter.id}
                      type="button"
                      onClick={() => setSelectedId(letter.id)}
                      data-testid={`generator-letter-${letter.id}`}
                      aria-pressed={active}
                      className={`flex items-start gap-2.5 rounded-md border px-3 py-2.5 text-left transition-colors cursor-pointer ${
                        active
                          ? 'border-accent bg-accent-soft text-accent'
                          : 'border-hairline bg-surface text-ink hover:bg-canvas-soft'
                      }`}
                    >
                      <FileText size={16} aria-hidden className="mt-0.5 shrink-0" />
                      <span className="text-small font-medium leading-snug">
                        {locale === 'th' ? letter.nameTh : letter.nameEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Merged preview */}
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-small font-semibold uppercase tracking-[0.08em] text-ink-muted">
                {t('previewHeading')}
              </p>
            </div>
            <p className="mb-2 text-small text-ink-muted">{t('previewHint')}</p>
            {merged && (
              <pre
                data-testid="generator-preview"
                className="max-h-72 overflow-y-auto whitespace-pre-wrap rounded-md border border-hairline bg-canvas-soft px-5 py-4 font-display text-body leading-relaxed text-ink"
              >
                {merged.filledBody}
              </pre>
            )}

            {merged && merged.missingFields.length > 0 && (
              <p
                data-testid="generator-missing-notice"
                className="mt-2 text-small text-ink-muted"
              >
                {t('missingNotice', { fields: merged.missingFields.join(', ') })}
              </p>
            )}

            {/* Actions — instant download / print, no submission */}
            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <Button variant="ghost" type="button" onClick={onClose}>
                {t('close')}
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={handlePrint}
                data-testid="generator-print"
              >
                <Printer size={15} aria-hidden />
                {t('print')}
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={handleDownload}
                data-testid="generator-download"
              >
                <Download size={15} aria-hidden />
                {t('download')}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
