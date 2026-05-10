'use client';

// ════════════════════════════════════════════════════════════
// /me/documents — ESS document library  BRD #173
// ════════════════════════════════════════════════════════════

import { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Download, FileText, Filter, Plus } from 'lucide-react';
import Link from 'next/link';
import { HUMI_HR_DOCS, HR_DOC_TYPE_LABELS, type HrDocType, type HumiHrDoc } from '@/lib/humi-mock-data';
import { formatDate } from '@/lib/date';

type FilterValue = 'all' | HrDocType;

const EN_DOC_TYPE_LABELS: Record<HrDocType, string> = {
  'employment-letter': 'Employment letters',
  'income-cert': 'Income certificates',
  'tax-form': 'Tax forms',
  'payslip-archive': 'Payslip archive',
};

function isFilterValue(value: string | null): value is FilterValue {
  return value === 'all' ||
    value === 'employment-letter' ||
    value === 'income-cert' ||
    value === 'tax-form' ||
    value === 'payslip-archive';
}

export default function MeDocumentsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) ?? 'th';
  const isTh = locale !== 'en';
  const typeParam = searchParams.get('type');
  const [filter, setFilter] = useState<FilterValue>(isFilterValue(typeParam) ? typeParam : 'all');

  const typeLabels = isTh ? HR_DOC_TYPE_LABELS : EN_DOC_TYPE_LABELS;
  const copy = {
    title: isTh ? 'เอกสารส่วนบุคคล' : 'Personal documents',
    subtitle: isTh ? 'ดูและดาวน์โหลดเอกสารส่วนบุคคลของคุณ' : 'View and download your personal documents',
    requestNew: isTh ? 'ขอเอกสารใหม่' : 'Request document',
    all: isTh ? 'ทั้งหมด' : 'All',
    empty: isTh ? 'ไม่พบเอกสาร' : 'No documents found',
    name: isTh ? 'ชื่อเอกสาร' : 'Document name',
    type: isTh ? 'ประเภท' : 'Type',
    issuedDate: isTh ? 'วันที่ออก' : 'Issued date',
    download: isTh ? 'ดาวน์โหลด' : 'Download',
  };

  const filterOptions: Array<{ value: FilterValue; label: string }> = [
    { value: 'all', label: copy.all },
    { value: 'employment-letter', label: typeLabels['employment-letter'] },
    { value: 'income-cert', label: typeLabels['income-cert'] },
    { value: 'tax-form', label: typeLabels['tax-form'] },
    { value: 'payslip-archive', label: typeLabels['payslip-archive'] },
  ];

  const filtered: HumiHrDoc[] = filter === 'all'
    ? HUMI_HR_DOCS
    : HUMI_HR_DOCS.filter((d) => d.type === filter);

  return (
    <div data-testid="me-documents-page" className="max-w-3xl mx-auto px-7 py-6">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink mb-1.5">
            {copy.title}
          </h1>
          <p className="text-sm text-ink-muted">
            {copy.subtitle}
          </p>
        </div>
        <Link
          href={`/${locale}/me/documents/request`}
          data-testid="request-doc-cta"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-small font-semibold text-white transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Plus size={15} aria-hidden />
          {copy.requestNew}
        </Link>
      </header>

      {/* ── Filter ──────────────────────────────────────────────── */}
      <div
        className="flex flex-wrap gap-2 mb-5 items-center"
        data-testid="docs-filter"
      >
        <Filter size={16} aria-hidden className="text-ink-muted" />
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setFilter(opt.value)}
            data-testid={`docs-filter-${opt.value}`}
            className={`humi-tag cursor-pointer${filter === opt.value ? ' humi-tag--accent' : ''}`}
            aria-pressed={filter === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* ── Document list / empty state ─────────────────────────── */}
      {filtered.length === 0 ? (
        <div
          data-testid="docs-empty"
          className="humi-card p-12 text-center text-ink-muted"
        >
          <FileText size={36} aria-hidden className="mx-auto mb-3 opacity-40 block" />
          <p>{copy.empty}</p>
        </div>
      ) : (
        <div data-testid="docs-list" className="humi-card overflow-hidden p-0">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface-muted text-xs text-ink-muted">
                <th className="px-3.5 py-2.5 text-left font-semibold">{copy.name}</th>
                <th className="px-3.5 py-2.5 text-left font-semibold">{copy.type}</th>
                <th className="px-3.5 py-2.5 text-left font-semibold">{copy.issuedDate}</th>
                <th className="px-3.5 py-2.5 text-right font-semibold">{copy.download}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc) => (
                <tr
                  key={doc.id}
                  data-testid={`doc-row-${doc.id}`}
                  className="border-t border-ink-faint"
                >
                  <td className="px-3.5 py-3 text-sm">{doc.name}</td>
                  <td className="px-3.5 py-3 text-xs text-ink-muted">
                    {typeLabels[doc.type]}
                  </td>
                  <td className="px-3.5 py-3 text-xs text-ink-muted">
                    {formatDate(doc.issuedDate, 'medium', locale)}
                  </td>
                  <td className="px-3.5 py-3 text-right">
                    <a
                      href={doc.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`doc-download-${doc.id}`}
                      className="humi-row gap-1 text-xs text-accent justify-end no-underline"
                    >
                      <Download size={14} aria-hidden />
                      {copy.download}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
