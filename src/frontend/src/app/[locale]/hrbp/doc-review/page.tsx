'use client';

// ════════════════════════════════════════════════════════════
// /hrbp/doc-review — SPD document-review queue
// Pending-review documents (pending + processing) → review/act in mock.
// Split out of /admin/documents (P2 follow-up): SPD owns this surface;
// HR Admin keeps the full request queue at /admin/documents.
// NOT an approval inbox — this is a document review surface (unified
// approvals stay under /quick-approve).
// ════════════════════════════════════════════════════════════

import { useState, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { FileText, ClipboardCheck, Clock, CheckCircle2 } from 'lucide-react';
import { Button, Modal } from '@/components/humi';
import { useToast } from '@/components/humi/molecules/toast';
import {
  DOCUMENT_TEMPLATES,
  GENERATABLE_LETTERS,
  LETTER_COMPANY_TH,
  LETTER_COMPANY_EN,
  MOCK_DOC_REQUESTS,
  type DocRequest,
} from '@/data/documents/templates';

// Review queue = documents still awaiting an SPD review decision.
// 'pending' (not yet picked up) + 'processing' (in review) are the review-pending set;
// 'ready'/'delivered' have already cleared review.
const REVIEW_PENDING_STATUSES = ['pending', 'processing'] as const;

function templateName(templateId: string, locale: string): string {
  const tpl = DOCUMENT_TEMPLATES.find((t) => t.id === templateId);
  if (!tpl) return templateId;
  return locale === 'th' ? tpl.nameTh : tpl.nameEn;
}

function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Merge the request's employee data into the matching letter template body so the
// reviewer previews the actual document that will be issued. Returns null when the
// request type has no generatable letter (issued from a standard form instead).
function mergeBody(req: DocRequest, locale: string): string | null {
  const letter = GENERATABLE_LETTERS.find((l) => l.id === req.templateId);
  if (!letter) return null;
  const isTh = locale === 'th';
  const vals: Record<string, string> = {
    fullName: req.employeeName,
    firstName: req.employeeName.split(' ')[0] ?? req.employeeName,
    lastName: req.employeeName.split(' ').slice(1).join(' '),
    employeeCode: req.employeeId,
    department: req.employeeDept,
    position: isTh ? 'พนักงาน' : 'Staff',
    startDate: isTh ? '1 ตุลาคม 2566' : '1 Oct 2023',
    salary: isTh ? '45,000 บาท/เดือน' : 'THB 45,000/month',
    today: formatDate(req.submittedAt, locale),
    company: isTh ? LETTER_COMPANY_TH : LETTER_COMPANY_EN,
  };
  return (isTh ? letter.bodyTh : letter.bodyEn).replace(
    /\{\{(\w+)\}\}/g,
    (_, k: string) => vals[k] ?? '—',
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-ink">{value}</p>
    </div>
  );
}

export default function HrbpDocReviewPage() {
  const locale = useLocale();
  const t = useTranslations('doc_review');
  const { toast } = useToast();

  // Mock-only review state: ids the reviewer has marked reviewed this session.
  const [reviewed, setReviewed] = useState<Set<string>>(new Set());
  // Request whose review-detail panel is open (click a row to inspect).
  const [detail, setDetail] = useState<DocRequest | null>(null);

  const queue = useMemo<DocRequest[]>(
    () =>
      MOCK_DOC_REQUESTS.filter((r) =>
        (REVIEW_PENDING_STATUSES as readonly string[]).includes(r.status),
      ),
    [],
  );

  const outstanding = queue.filter((r) => !reviewed.has(r.id));

  function handleMarkReviewed(req: DocRequest) {
    setReviewed((prev) => {
      const next = new Set(prev);
      next.add(req.id);
      return next;
    });
    toast(
      'success',
      locale === 'th'
        ? `ตรวจเอกสาร ${req.id} เรียบร้อย`
        : `Reviewed ${req.id}`,
    );
  }

  return (
    <div className="px-4 py-8">
      {/* Page header */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex-1">
          <p className="text-small font-medium uppercase tracking-wide text-ink-muted">
            {t('eyebrow')}
          </p>
          <h1 className="font-display text-2xl font-semibold text-ink">
            {t('title')}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">{t('subtitle')}</p>
        </div>
        {outstanding.length > 0 && (
          <span
            className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-2 text-small font-semibold text-white"
            data-testid="doc-review-count"
          >
            {outstanding.length}
          </span>
        )}
      </div>

      {/* Review queue */}
      {outstanding.length === 0 ? (
        <div
          data-testid="doc-review-empty"
          className="humi-card p-12 text-center text-ink-muted"
        >
          <CheckCircle2 size={36} aria-hidden className="mx-auto mb-3 block opacity-30" />
          <p>{t('empty')}</p>
        </div>
      ) : (
        <div className="humi-card overflow-hidden p-0">
          <table className="w-full border-collapse" data-testid="doc-review-table">
            <thead>
              <tr className="bg-surface-muted text-xs text-ink-muted">
                <th className="px-3.5 py-2.5 text-left font-semibold">{t('colRequestId')}</th>
                <th className="px-3.5 py-2.5 text-left font-semibold">{t('colEmployee')}</th>
                <th className="px-3.5 py-2.5 text-left font-semibold">{t('colDocType')}</th>
                <th className="px-3.5 py-2.5 text-left font-semibold">{t('colPurpose')}</th>
                <th className="px-3.5 py-2.5 text-left font-semibold">{t('colSubmitted')}</th>
                <th className="px-3.5 py-2.5 text-left font-semibold">{t('colStatus')}</th>
                <th className="px-3.5 py-2.5 text-right font-semibold">{t('colAction')}</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((req) => {
                const isReviewed = reviewed.has(req.id);
                return (
                  <tr
                    key={req.id}
                    data-testid={`doc-review-row-${req.id}`}
                    onClick={() => setDetail(req)}
                    className="cursor-pointer border-t border-ink-faint transition-colors hover:bg-canvas-soft"
                  >
                    <td className="px-3.5 py-3 font-mono text-xs text-ink-muted">{req.id}</td>
                    <td className="px-3.5 py-3">
                      <div className="text-sm font-medium text-ink">{req.employeeName}</div>
                      <div className="text-xs text-ink-muted">{req.employeeDept}</div>
                    </td>
                    <td className="px-3.5 py-3 text-sm text-ink">
                      {templateName(req.templateId, locale)}
                    </td>
                    <td
                      className="max-w-[180px] truncate px-3.5 py-3 text-xs text-ink-muted"
                      title={req.purpose}
                    >
                      {req.purpose}
                    </td>
                    <td className="whitespace-nowrap px-3.5 py-3 text-xs text-ink-muted">
                      {formatDate(req.submittedAt, locale)}
                    </td>
                    <td className="px-3.5 py-3">
                      {isReviewed ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-hairline bg-canvas-soft px-2.5 py-0.5 text-xs font-medium text-ink-muted">
                          <ClipboardCheck size={13} aria-hidden />
                          {t('statusReviewed')}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full border border-accent-soft bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-ink">
                          <Clock size={13} aria-hidden />
                          {t('statusAwaiting')}
                        </span>
                      )}
                    </td>
                    <td className="px-3.5 py-3 text-right">
                      {isReviewed ? (
                        <span className="text-xs text-ink-muted">{t('done')}</span>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          leadingIcon={<FileText size={14} />}
                          onClick={(e) => { e.stopPropagation(); handleMarkReviewed(req); }}
                          data-testid={`doc-review-action-${req.id}`}
                        >
                          {t('markReviewed')}
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Review-detail panel — the document HR verifies before issuing. */}
      {detail && (() => {
        const isTh = locale === 'th';
        const body = mergeBody(detail, locale);
        const isReviewed = reviewed.has(detail.id);
        return (
          <Modal
            open
            onClose={() => setDetail(null)}
            widthClass="max-w-3xl"
            title={isTh ? `ตรวจเอกสาร · ${detail.id}` : `Review · ${detail.id}`}
          >
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                <DetailField label={isTh ? 'พนักงาน' : 'Employee'} value={detail.employeeName} />
                <DetailField label={isTh ? 'แผนก' : 'Department'} value={detail.employeeDept} />
                <DetailField label={isTh ? 'รหัสพนักงาน' : 'Employee ID'} value={detail.employeeId} />
                <DetailField label={isTh ? 'ประเภทเอกสาร' : 'Document type'} value={templateName(detail.templateId, locale)} />
                <DetailField label={isTh ? 'วัตถุประสงค์' : 'Purpose'} value={detail.purpose} />
                <DetailField label={isTh ? 'วันที่ยื่น' : 'Submitted'} value={formatDate(detail.submittedAt, locale)} />
              </div>

              <div>
                <p className="mb-2 text-small font-semibold uppercase tracking-wide text-ink-muted">
                  {isTh ? 'เอกสารที่จะออก' : 'Document to be issued'}
                </p>
                <div className="max-h-[42vh] overflow-auto rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-6">
                  {body ? (
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink">{body}</pre>
                  ) : (
                    <p className="text-sm text-ink-muted">
                      {isTh
                        ? 'เอกสารนี้ออกตามแบบฟอร์มมาตรฐาน — ตรวจสอบข้อมูลพนักงานและวัตถุประสงค์ก่อนอนุมัติ'
                        : 'Issued from a standard form — verify the employee details and purpose before approving.'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-hairline pt-4">
              <Button variant="secondary" onClick={() => setDetail(null)}>
                {isTh ? 'ตีกลับ' : 'Send back'}
              </Button>
              {!isReviewed && (
                <Button
                  variant="primary"
                  leadingIcon={<FileText size={16} />}
                  onClick={() => { handleMarkReviewed(detail); setDetail(null); }}
                >
                  {isTh ? 'ตรวจแล้ว · ออกเอกสาร' : 'Mark reviewed · issue'}
                </Button>
              )}
            </div>
          </Modal>
        );
      })()}
    </div>
  );
}
