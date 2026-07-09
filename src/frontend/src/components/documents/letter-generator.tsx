'use client';

// ════════════════════════════════════════════════════════════
// LetterGenerator — SF "Document Generation" admin path
// HR Admin picks an EMPLOYEE + a curated letter → mergeLetter fills
// it with that employee's data → live preview → download (mock PDF).
//
// INSTANT generate — does NOT touch the SLA request queue
// (MOCK_DOC_REQUESTS) and never submits a request.
// ════════════════════════════════════════════════════════════

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Search, FileText, Download, Printer, User } from 'lucide-react';
import { Button } from '@/components/humi';
import { useToast } from '@/components/humi/molecules/toast';
import { ALL_PORTED_EMPLOYEES } from '@/lib/all-ported-employees';
import { GENERATABLE_LETTERS, type GeneratableLetter } from '@/data/documents/templates';
import {
  mergeLetter,
  letterToHtml,
  downloadLetter,
  mockMonthlySalary,
  mockHireDate,
  type MergeResult,
} from '@/lib/documents/merge-letter';
import { formatDate } from '@/lib/date';
import type { HumiEmployee } from '@/lib/humi-mock-data';

function employeeLabel(emp: HumiEmployee, locale: string): string {
  const name =
    locale === 'th'
      ? `${emp.firstNameTh} ${emp.lastNameTh}`
      : `${emp.firstNameEn || emp.firstNameTh} ${emp.lastNameEn || emp.lastNameTh}`;
  return `${name.trim()} · ${emp.employeeCode}`;
}

export function LetterGenerator() {
  const locale = useLocale();
  const isTh = locale === 'th';
  const t = useTranslations('doc_generate');
  const { toast } = useToast();

  const [query, setQuery] = useState('');
  const [empId, setEmpId] = useState<string | null>(null);
  const [letterId, setLetterId] = useState<string>(GENERATABLE_LETTERS[0]?.id ?? '');

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_PORTED_EMPLOYEES.slice(0, 8);
    return ALL_PORTED_EMPLOYEES.filter((e) =>
      [
        e.employeeCode,
        e.firstNameTh,
        e.lastNameTh,
        e.firstNameEn,
        e.lastNameEn,
        e.position,
        e.department,
      ]
        .filter(Boolean)
        .some((f) => (f as string).toLowerCase().includes(q)),
    ).slice(0, 8);
  }, [query]);

  const emp = useMemo(
    () => ALL_PORTED_EMPLOYEES.find((e) => e.id === empId) ?? null,
    [empId],
  );

  const letter: GeneratableLetter | undefined = useMemo(
    () => GENERATABLE_LETTERS.find((l) => l.id === letterId),
    [letterId],
  );

  const merged: MergeResult | null = useMemo(() => {
    if (!emp || !letter) return null;
    return mergeLetter(letter, emp, isTh ? 'th' : 'en', {
      today: formatDate(new Date(), 'long', locale),
      // Salary pool has no real figure → deterministic mock so the cert is complete.
      salaryMonthly: mockMonthlySalary(emp),
      // Synthetic-core rows have no hireDate → deterministic mock so {{startDate}} fills.
      hireDate: emp.hireDate ?? mockHireDate(emp),
    });
  }, [emp, letter, isTh, locale]);

  function buildFilename(): string {
    const code = emp?.employeeCode ?? 'employee';
    return `${letterId}-${code}.html`;
  }

  function handleDownload() {
    if (!merged) return;
    downloadLetter(letterToHtml(merged, isTh ? 'th' : 'en'), buildFilename());
    toast('success', t('downloaded'));
  }

  function handlePrint() {
    if (!merged) return;
    const html = letterToHtml(merged, isTh ? 'th' : 'en');
    const w = window.open('', '_blank');
    if (!w) {
      toast('warning', t('printBlocked'));
      return;
    }
    w.document.write(html);
    w.document.close();
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,360px)_1fr]" data-testid="letter-generator">
      {/* ── Left: pickers ───────────────────────────────────── */}
      <div className="space-y-5">
        {/* Employee picker */}
        <div className="humi-card p-4">
          <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="lg-emp-search">
            {t('employeeLabel')}
          </label>
          <div className="relative">
            <Search
              size={15}
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              id="lg-emp-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('employeePlaceholder')}
              data-testid="lg-employee-search"
              className="w-full rounded-[var(--radius-md)] border border-hairline bg-surface py-2 pl-9 pr-3 text-sm text-ink outline-none focus:ring-2 focus:ring-accent-soft"
            />
          </div>
          <ul className="mt-3 max-h-72 space-y-1 overflow-y-auto" data-testid="lg-employee-results">
            {matches.length === 0 ? (
              <li className="px-2 py-3 text-sm text-ink-muted">{t('noEmployees')}</li>
            ) : (
              matches.map((e) => {
                const active = e.id === empId;
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => setEmpId(e.id)}
                      data-testid={`lg-emp-${e.id}`}
                      aria-pressed={active}
                      className={`flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2 py-2 text-left text-sm transition-colors ${
                        active
                          ? 'bg-accent-soft text-accent-ink'
                          : 'text-ink hover:bg-canvas-soft'
                      }`}
                    >
                      <User size={14} aria-hidden className="shrink-0 text-ink-muted" />
                      <span className="flex-1 truncate">{employeeLabel(e, locale)}</span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>

        {/* Letter picker */}
        <div className="humi-card p-4">
          <span className="mb-2 block text-sm font-semibold text-ink">{t('letterLabel')}</span>
          <div className="space-y-1.5" role="radiogroup" aria-label={t('letterLabel')}>
            {GENERATABLE_LETTERS.map((l) => {
              const active = l.id === letterId;
              return (
                <button
                  key={l.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setLetterId(l.id)}
                  data-testid={`lg-letter-${l.id}`}
                  className={`flex w-full items-center gap-2 rounded-[var(--radius-sm)] border px-3 py-2 text-left text-sm transition-colors ${
                    active
                      ? 'border-accent bg-accent-soft text-accent-ink'
                      : 'border-hairline bg-surface text-ink hover:bg-canvas-soft'
                  }`}
                >
                  <FileText size={14} aria-hidden className="shrink-0 text-ink-muted" />
                  <span className="flex-1">{isTh ? l.nameTh : l.nameEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Right: preview + actions ────────────────────────── */}
      <div className="humi-card flex flex-col p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h2 className="flex-1 text-sm font-semibold text-ink">{t('previewTitle')}</h2>
          <Button
            variant="secondary"
            leadingIcon={<Printer size={15} />}
            onClick={handlePrint}
            disabled={!merged}
            data-testid="lg-print-btn"
          >
            {t('print')}
          </Button>
          <Button
            variant="primary"
            leadingIcon={<Download size={15} />}
            onClick={handleDownload}
            disabled={!merged}
            data-testid="lg-download-btn"
          >
            {t('download')}
          </Button>
        </div>

        {!merged ? (
          <div
            data-testid="lg-preview-empty"
            className="flex flex-1 flex-col items-center justify-center rounded-[var(--radius-md)] border border-dashed border-hairline py-16 text-center text-ink-muted"
          >
            <FileText size={32} aria-hidden className="mb-3 opacity-30" />
            <p className="text-sm">{t('previewEmpty')}</p>
          </div>
        ) : (
          <div className="flex flex-1 flex-col">
            <pre
              data-testid="lg-preview"
              className="flex-1 overflow-auto whitespace-pre-wrap rounded-[var(--radius-md)] border border-hairline bg-surface p-5 font-sans text-sm leading-relaxed text-ink"
            >
              {merged.filledBody}
            </pre>
            {merged.missingFields.length > 0 && (
              <p
                data-testid="lg-missing-note"
                className="mt-3 rounded-[var(--radius-sm)] bg-warning-tint px-3 py-2 text-xs text-ink-muted"
              >
                {t('missingNote', { fields: merged.missingFields.join(', ') })}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
