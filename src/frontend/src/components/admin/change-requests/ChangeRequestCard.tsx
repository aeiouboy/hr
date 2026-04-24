'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@/components/humi/Card';
import { Button } from '@/components/humi/Button';
import type { PendingChange, FileAttachment, SectionKey } from '@/stores/humi-profile-slice';

// ════════════════════════════════════════════════════════════
// ChangeRequestCard — displays one pending change with diff,
// attachments, and approve/reject action buttons.
// ════════════════════════════════════════════════════════════

export interface ChangeRequestCardProps {
  cr: PendingChange;
  attachments: FileAttachment[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

function formatBytes(size: number): string {
  if (size >= 1_048_576) return `${(size / 1_048_576).toFixed(1)} MB`;
  return `${Math.round(size / 1024)} KB`;
}

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function ChangeRequestCard({ cr, attachments, onApprove, onReject }: ChangeRequestCardProps) {
  const t = useTranslations();

  const sectionLabel = (key: SectionKey | undefined): string =>
    t(`ess.sections.${key ?? 'personal'}` as Parameters<typeof t>[0]);

  const resolvedAttachments = cr.attachmentIds
    .map((id) => attachments.find((a) => a.id === id))
    .filter((a): a is FileAttachment => a !== undefined);

  return (
    <Card variant="flat" className="w-full">
      <div className="flex flex-col gap-3">
        {/* Top row: section badge + timestamp */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-accent-soft px-2.5 py-0.5 text-small font-medium text-accent">
            {sectionLabel(cr.sectionKey)}
          </span>
          <span className="text-small text-ink-muted">{formatDate(cr.requestedAt)}</span>
        </div>

        {/* Field diff */}
        <div className="rounded-md bg-canvas-soft px-4 py-3 text-small">
          <p className="font-medium text-ink mb-1">{cr.field}</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-ink-muted line-through">{cr.oldValue || '—'}</span>
            <span className="text-ink-muted">→</span>
            <span className="font-medium text-ink">{cr.newValue || '—'}</span>
          </div>
        </div>

        {/* Effective date */}
        <p className="text-small text-ink-muted">
          <span className="font-medium text-ink">{t('ess.approver.card.effectiveDate')}</span>
          {': '}
          {formatDate(cr.effectiveDate)}
        </p>

        {/* Attachments */}
        {resolvedAttachments.length > 0 && (
          <div className="flex flex-col gap-1">
            <p className="text-small font-medium text-ink">{t('ess.approver.card.attachments')}</p>
            <ul className="flex flex-col gap-1">
              {resolvedAttachments.map((att) => (
                <li key={att.id}>
                  <button
                    type="button"
                    className="text-small text-accent underline-offset-2 hover:underline"
                    onClick={() => window.open(att.base64, '_blank')}
                  >
                    {att.filename}
                    <span className="ml-1 text-ink-muted">({formatBytes(att.size)})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-end gap-2 pt-1">
          <Button variant="secondary" size="sm" onClick={() => onReject(cr.id)}>
            {t('ess.approver.card.reject')}
          </Button>
          <Button variant="primary" size="sm" onClick={() => onApprove(cr.id)}>
            {t('ess.approver.card.approve')}
          </Button>
        </div>
      </div>
    </Card>
  );
}
