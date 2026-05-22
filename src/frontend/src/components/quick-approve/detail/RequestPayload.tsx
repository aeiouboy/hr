'use client';

import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';
import { Capability } from '@/components/humi';
import type {
  PendingRequest,
  LeaveDetails,
  OvertimeDetails,
  ClaimDetails,
  TransferDetails,
} from '@/lib/quick-approve-api';

// ── Helpers ──────────────────────────────────────────────────────────────────

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 py-2 border-b border-hairline last:border-0">
      <dt className="w-40 shrink-0 text-small font-medium text-ink-muted">{label}</dt>
      <dd className="flex-1 text-small text-ink">{value}</dd>
    </div>
  );
}

function HiddenFieldPlaceholder() {
  const t = useTranslations('quick_approve_detail');
  return (
    <div className="flex items-center justify-center rounded-[var(--radius-md)] border border-dashed border-hairline bg-accent-soft/40 py-8 text-small text-ink-muted">
      {t('claimHidden')}
    </div>
  );
}

function money(value: number | undefined, currency: string) {
  return typeof value === 'number' ? `${value.toLocaleString()} ${currency}` : '—';
}

// ── Sub-renderers ─────────────────────────────────────────────────────────────

function LeavePayload({ details, t }: { details: LeaveDetails; t: ReturnType<typeof useTranslations> }) {
  return (
    <dl>
      <Row label={t('leaveType')} value={details.leaveType} />
      <Row label={t('startDate')} value={details.startDate} />
      <Row label={t('endDate')} value={details.endDate} />
      <Row label={t('totalDays')} value={`${details.totalDays} ${t('days')}`} />
      <Row label={t('balance')} value={`${details.balance} ${t('days')}`} />
      <Row label={t('reason')} value={details.reason} />
    </dl>
  );
}

function OvertimePayload({ details, t }: { details: OvertimeDetails; t: ReturnType<typeof useTranslations> }) {
  return (
    <dl>
      <Row label={t('date')} value={details.date} />
      <Row label={t('hours')} value={`${details.hours} ${t('hoursUnit')}`} />
      <Row label={t('rate')} value={`${details.rate}x`} />
      <Row label={t('reason')} value={details.reason} />
    </dl>
  );
}

function ClaimPayload({ details, t }: { details: ClaimDetails; t: ReturnType<typeof useTranslations> }) {
  return (
    <dl>
      <Row label={t('remainingAmount')} value={money(details.remainingAmount, details.currency)} />
      <Row label={t('receiptDate')} value={details.receiptDate ?? '—'} />
      <Row label={t('receiptNo')} value={details.receiptNo ?? '—'} />
      <Row label={t('receiptAmount')} value={money(details.receiptAmount, details.currency)} />
      <Row label={t('totalClaimAmount')} value={money(details.totalClaimAmount ?? details.amount, details.currency)} />
      <Row label={t('remark')} value={details.remark ?? '—'} />
      <Row
        label={t('amount')}
        value={`${details.amount.toLocaleString()} ${details.currency}`}
      />
      <Row label={t('category')} value={details.category} />
      <Row label={t('merchant')} value={details.merchant} />
      {details.receiptUrl && (
        <Row
          label={t('receipt')}
          value={
            <a
              href={details.receiptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent underline-offset-2 hover:underline"
            >
              {t('viewReceipt')} <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          }
        />
      )}
      <Row
        label={t('policyChecks')}
        value={
          <ul className="space-y-1">
            {details.policyChecks.map((check) => (
              <li key={check.rule} className="flex items-center gap-2">
                <span
                  className={
                    check.passed
                      ? 'h-2 w-2 rounded-full bg-success'
                      : 'h-2 w-2 rounded-full bg-danger'
                  }
                  aria-hidden
                />
                <span className={check.passed ? 'text-success' : 'text-danger'}>{check.rule}</span>
              </li>
            ))}
          </ul>
        }
      />
    </dl>
  );
}

function TransferPayload({ details, t }: { details: TransferDetails; t: ReturnType<typeof useTranslations> }) {
  return (
    <dl>
      <Row label={t('fromDepartment')} value={details.fromDepartment} />
      <Row label={t('toDepartment')} value={details.toDepartment} />
      <Row label={t('fromPosition')} value={details.fromPosition} />
      <Row label={t('toPosition')} value={details.toPosition} />
      <Row label={t('effectiveDate')} value={details.effectiveDate} />
      <Row label={t('reason')} value={details.reason} />
    </dl>
  );
}

function maskValue(field: string, value: unknown) {
  const text = String(value ?? '—');
  const sensitive = /bank|account|salary|compensation|national|tax|dependent|document|payroll/i.test(field);
  if (!sensitive) return text;
  if (text.includes('***') || text === '—') return text;
  return `•••• ${text.slice(-4)}`;
}

function ChangeRequestPayload({
  details,
}: {
  details: Record<string, unknown>;
}) {
  const fieldDiffs = Array.isArray(details.fieldDiffs)
    ? details.fieldDiffs as Array<{ field: string; label: string; before: unknown; after: unknown; sensitive?: boolean }>
    : [
        {
          field: String(details.field ?? details.changeType ?? 'change'),
          label: String(details.changeType ?? details.field ?? 'Change'),
          before: details.oldValue ?? details.currentValue ?? '—',
          after: details.newValue ?? details.accountNumber ?? '—',
          sensitive: true,
        },
      ];

  return (
    <div className="space-y-4">
      <div className="rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-3 text-small text-ink-soft">
        Manager view shows only what is needed to decide. Salary, bank, national ID, Tax ID,
        dependent identifiers, and document contents stay masked in this demo.
      </div>
      <dl>
        {typeof details.approvalState === 'string' && <Row label="สถานะ" value={details.approvalState} />}
        {typeof details.reason === 'string' && <Row label="เหตุผล" value={details.reason} />}
        {typeof details.effectiveDate === 'string' && (
          <Row label="วันที่มีผลสำหรับ demo" value={details.effectiveDate} />
        )}
      </dl>
      <div>
        <h4 className="mb-2 text-small font-semibold text-ink">ก่อน / หลัง — decision preview only</h4>
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-hairline">
          <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-canvas-soft px-3 py-2 text-small font-semibold text-ink">
            <span>Field</span>
            <span>ก่อน</span>
            <span>หลัง</span>
          </div>
          {fieldDiffs.map((diff) => (
            <div
              key={`${diff.field}-${diff.label}`}
              className="grid grid-cols-[1.2fr_1fr_1fr] border-t border-hairline px-3 py-2 text-small text-ink"
            >
              <span>
                {diff.label}
                {diff.sensitive && <span className="ml-2 text-ink-muted">(masked)</span>}
              </span>
              <span>{diff.sensitive ? maskValue(diff.field, diff.before) : String(diff.before ?? '—')}</span>
              <span>{diff.sensitive ? maskValue(diff.field, diff.after) : String(diff.after ?? '—')}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-small text-ink-muted">
          Attachments are mock previews only; this is not audit-grade history or document storage.
        </p>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface RequestPayloadProps {
  request: PendingRequest;
}

export function RequestPayload({ request }: RequestPayloadProps) {
  const t = useTranslations('quick_approve_detail');

  const inner = () => {
    switch (request.type) {
      case 'leave':
        return <LeavePayload details={request.details as LeaveDetails} t={t} />;
      case 'overtime':
        return <OvertimePayload details={request.details as OvertimeDetails} t={t} />;
      case 'claim':
        return <ClaimPayload details={request.details as ClaimDetails} t={t} />;
      case 'transfer':
        return <TransferPayload details={request.details as TransferDetails} t={t} />;
      case 'change_request':
        return <ChangeRequestPayload details={request.details as Record<string, unknown>} />;
      default:
        return (
          <dl>
            {Object.entries(request.details as Record<string, unknown>).map(([k, v]) => (
              <Row key={k} label={k} value={String(v)} />
            ))}
          </dl>
        );
    }
  };

  const content = (
    <div className="rounded-[var(--radius-lg)] border border-hairline bg-surface p-5">
      <h3 className="mb-4 text-base font-semibold text-ink">{t('requestDetails')}</h3>
      {inner()}
    </div>
  );

  if (request.type === 'claim') {
    return (
      <Capability entity="BenefitEmployeeClaim" fallback={<HiddenFieldPlaceholder />}>
        {content}
      </Capability>
    );
  }

  return content;
}
