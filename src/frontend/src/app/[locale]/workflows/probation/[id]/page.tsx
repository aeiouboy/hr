'use client';

import { useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowLeft, CheckCircle, XCircle, Clock, AlertTriangle, Send } from 'lucide-react';
import { PersonHero } from '@/components/ui/person-hero';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { FieldGroup } from '@/components/ui/field-group';
import { Field } from '@/components/ui/field';
import { useProbationCase, STATUS_LABEL, type ProbationStatus, type ProbationTimelineEntry } from '@/hooks/use-probation';
import { formatDate } from '@/lib/date';

const STATUS_BADGE: Record<ProbationStatus, 'warning' | 'info' | 'success' | 'error' | 'neutral'> = {
  pending_manager: 'warning',
  pending_hr: 'info',
  approved: 'success',
  rejected: 'error',
  extended: 'warning',
  escalated_ceo: 'error',
};

const TIMELINE_ICON: Record<string, React.ReactNode> = {
  System: <Clock className="h-4 w-4 text-ink-muted" />,
  Manager: <CheckCircle className="h-4 w-4 text-accent" />,
  'HR Director': <AlertTriangle className="h-4 w-4 text-info" />,
};

function TimelineItem({ entry }: { entry: ProbationTimelineEntry }) {
  const icon = TIMELINE_ICON[entry.actorRole] ?? <Clock className="h-4 w-4 text-ink-muted" />;
  const isSystem = entry.actorRole === 'System';

  return (
    <div className="flex gap-3">
      {/* Dot + line */}
      <div className="flex flex-col items-center">
        <div className="p-1">{icon}</div>
        <div className="flex-1 w-px bg-hairline" />
      </div>
      {/* Content */}
      <div className="pb-6 flex-1">
        <div className="flex items-baseline gap-2">
          <span className={`text-sm ${isSystem ? 'text-ink-muted' : 'font-medium text-ink'}`}>
            {entry.actor}
          </span>
          <span className="text-xs text-ink-muted">
            {formatDate(entry.date, 'long', 'th')} {new Date(entry.date).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <p className={`text-sm mt-0.5 ${isSystem ? 'text-ink-muted' : 'text-ink-soft'}`}>
          {entry.action}
        </p>
        {entry.comment && (
          <div className="mt-2 px-3 py-2 bg-surface-raised rounded-md border border-hairline">
            <p className="text-sm text-ink italic">"{entry.comment}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProbationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const pathname = usePathname();
  const locale = pathname.startsWith('/th') ? 'th' : 'en';
  const { probationCase: c, loading, approve, reject } = useProbationCase(id);
  const t = useTranslations();

  const [comment, setComment] = useState('');
  const [showActions, setShowActions] = useState(false);

  if (loading) {
    return (
      <>
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-40 w-full mb-6" />
        <Skeleton className="h-60 w-full" />
      </>
    );
  }

  if (!c) {
    return (
      <Card className="p-12 text-center">
        <p className="text-ink-muted">{t('probation.notFound')} {id}</p>
      </Card>
    );
  }

  const isPending = c.status === 'pending_manager' || c.status === 'pending_hr';
  const slaMs = new Date(c.slaDeadline).getTime() - Date.now();
  const slaHours = Math.max(0, Math.round(slaMs / (1000 * 60 * 60)));
  const isUrgent = isPending && slaHours < 12;

  const heroStatus = c.status === 'approved' ? 'active' as const :
    c.status === 'rejected' ? 'terminated' as const : 'probation' as const;

  return (
    <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <a
              href={`/${locale}/workflows/probation`}
              className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('probation.backToList')}
            </a>

            {/* PersonHero — the employee */}
            <PersonHero
              avatar={{ src: c.photo, fallback: c.fullNameEn.substring(0, 2).toUpperCase(), status: heroStatus }}
              name={{ th: c.fullNameTh, en: c.fullNameEn }}
              employeeId={c.employeeId}
              subtitle={c.position}
              meta={`${c.department} · ${t('probation.startedWork')} ${formatDate(c.hireDate, 'medium', locale)}`}
              status={heroStatus}
              statusContext={
                isPending
                  ? `${t('probation.probationDue')} ${formatDate(c.probationEndDate, 'long', locale)}`
                  : c.status === 'approved'
                    ? t('probation.passedPermanent')
                    : `${t('probation.extendedUntil')} ${formatDate(c.slaDeadline, 'long', locale)}`
              }
              stats={[
                { label: t('probation.statusLabel'), value: STATUS_LABEL[c.status], tone: c.status === 'approved' ? 'success' : c.status === 'extended' || c.status === 'rejected' ? 'danger' : 'warning' },
                ...(isPending ? [{ label: t('probation.slaRemaining'), value: `${slaHours} ${t('common.hours')}`, tone: isUrgent ? 'danger' as const : 'warning' as const }] : []),
                { label: t('probation.approver'), value: c.currentApprover.name },
              ]}
              className="mb-6"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Timeline */}
              <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                  <div className="px-6 py-4 border-l-2 border-accent">
                    <h3 className="text-sm font-semibold text-ink">Workflow Timeline</h3>
                  </div>
                  <div className="px-6 pb-4">
                    {c.timeline.map((entry, i) => (
                      <TimelineItem key={i} entry={entry} />
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right: Info + Actions */}
              <div className="space-y-6">
                {/* Probation Info */}
                <FieldGroup title={t('probation.infoTitle')} columns={1}>
                  <Field label={t('probation.hireDate')} value={formatDate(c.hireDate, 'long', locale)} mono />
                  <Field label={t('probation.probationEnd')} value={formatDate(c.probationEndDate, 'long', locale)} mono />
                  <Field label="SLA Deadline" value={formatDate(c.slaDeadline, 'long', locale)} mono />
                  <Field label={t('probation.currentApprover')} value={`${c.currentApprover.name} (${c.currentApprover.role})`} />
                </FieldGroup>

                {/* Action panel — only show for pending */}
                {isPending && (
                  <Card className="overflow-hidden border-t-[3px] border-t-accent">
                    <div className="px-6 py-4">
                      <h3 className="text-sm font-semibold text-ink mb-3">{t('probation.takeAction')}</h3>

                      {/* Comment */}
                      <label className="block text-xs text-ink-muted mb-1">{t('probation.commentLabel')}</label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder={t('probation.commentPlaceholder')}
                        rows={3}
                        className="w-full text-sm bg-surface border border-hairline rounded-md px-3 py-2 text-ink outline-none focus:ring-1 focus:ring-accent resize-none mb-4"
                      />

                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1 bg-success text-white hover:bg-success/90"
                          onClick={() => { approve(comment); setComment(''); }}
                        >
                          <CheckCircle className="mr-1.5 h-4 w-4" />
                          {t('probation.approve')}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-danger text-danger hover:bg-danger-tint"
                          onClick={() => { reject(comment); setComment(''); }}
                        >
                          <XCircle className="mr-1.5 h-4 w-4" />
                          {t('probation.reject')}
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Completed badge */}
                {!isPending && (
                  <Card className="p-6 text-center">
                    <Badge variant={STATUS_BADGE[c.status]} className="text-base px-4 py-1">
                      {STATUS_LABEL[c.status]}
                    </Badge>
                    <p className="text-xs text-ink-muted mt-2">{t('probation.workflowCompleted')}</p>
                  </Card>
                )}
              </div>
            </div>
    </div>
  );
}
