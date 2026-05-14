'use client';

import { useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowLeft, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { PersonHero } from '@/components/ui/person-hero';
import { Card, Capability, Modal } from '@/components/humi';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/humi';
import { Skeleton } from '@/components/ui/skeleton';
import { FieldGroup } from '@/components/ui/field-group';
import { Field } from '@/components/ui/field';
import { useAuthStore } from '@/stores/auth-store';
import {
  useProbationCase,
  STATUS_LABEL,
  type ProbationStatus,
  type ProbationTimelineEntry,
} from '@/hooks/use-probation';
import { formatDate } from '@/lib/date';

const STATUS_BADGE: Record<ProbationStatus, 'warning' | 'info' | 'success' | 'error' | 'neutral'> =
  {
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

function displayValue(value?: string) {
  return value?.trim() || 'TBD';
}

function TimelineItem({ entry }: { entry: ProbationTimelineEntry }) {
  const icon = TIMELINE_ICON[entry.actorRole] ?? <Clock className="h-4 w-4 text-ink-muted" />;
  const isSystem = entry.actorRole === 'System';

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className="p-1">{icon}</div>
        <div className="flex-1 w-px bg-hairline" />
      </div>
      <div className="pb-6 flex-1">
        <div className="flex items-baseline gap-2">
          <span className={`text-sm ${isSystem ? 'text-ink-muted' : 'font-medium text-ink'}`}>
            {entry.actor}
          </span>
          <span className="text-xs text-ink-muted">
            {formatDate(entry.date, 'long', 'th')}{' '}
            {new Date(entry.date).toLocaleTimeString('th-TH', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        <p className={`text-sm mt-0.5 ${isSystem ? 'text-ink-muted' : 'text-ink-soft'}`}>
          {entry.action}
        </p>
        {entry.comment && (
          <div className="mt-2 px-3 py-2 bg-surface-raised rounded-md border border-hairline">
            <p className="text-sm text-ink italic">&ldquo;{entry.comment}&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  );
}

type DecisionAction = 'approve' | 'reject';

const REQUIRED_FIELD_LABELS = ['employeeId', 'fullNameEn', 'probationEndDate'] as const;

export default function ProbationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const pathname = usePathname();
  const locale = pathname.startsWith('/th') ? 'th' : 'en';
  const { probationCase: c, loading, approve, reject } = useProbationCase(id);
  const t = useTranslations();
  const roles = useAuthStore((s) => s.roles);

  const [comment, setComment] = useState('');
  const [activeAction, setActiveAction] = useState<DecisionAction | null>(null);
  const [savingAction, setSavingAction] = useState<DecisionAction | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
        <p className="text-ink-muted">
          {t('probation.notFound')} {id}
        </p>
      </Card>
    );
  }

  const isPending = c.status === 'pending_manager' || c.status === 'pending_hr';
  const canDecide =
    roles.includes('manager') || roles.includes('hr_manager') || roles.includes('hr_admin');
  const isReadOnly = !isPending || !canDecide;
  const slaMs = new Date(c.slaDeadline).getTime() - Date.now();
  const slaHours = Math.max(0, Math.round(slaMs / (1000 * 60 * 60)));
  const isUrgent = isPending && slaHours < 12;
  const isSaving = savingAction !== null;
  const isTh = locale === 'th';
  const rejectRequiresComment = comment.trim().length === 0;
  const missingCriticalFields = REQUIRED_FIELD_LABELS.filter((field) => !c[field]);

  const heroStatus =
    c.status === 'approved'
      ? ('active' as const)
      : c.status === 'rejected'
        ? ('terminated' as const)
        : ('probation' as const);

  const openConfirm = (action: DecisionAction) => {
    setError('');
    setSuccess('');
    if (action === 'reject' && rejectRequiresComment) {
      setError(isTh ? 'ต้องระบุเหตุผลก่อนปฏิเสธ' : 'Manager comment/reason is required before rejecting.');
      return;
    }
    setActiveAction(action);
  };

  const closeConfirm = () => {
    if (!isSaving) setActiveAction(null);
  };

  const submitDecision = async () => {
    if (!activeAction) return;
    if (activeAction === 'reject' && rejectRequiresComment) {
      setError(isTh ? 'ต้องระบุเหตุผลก่อนปฏิเสธ' : 'Manager comment/reason is required before rejecting.');
      return;
    }

    setSavingAction(activeAction);
    setError('');
    try {
      // Typed mock action until EC/probation decision API is available.
      await new Promise((resolve) => setTimeout(resolve, 150));
      if (activeAction === 'approve') {
        approve(comment.trim());
        setSuccess(isTh ? 'อนุมัติผลทดลองงานแล้ว' : 'Probation decision approved.');
      } else {
        reject(comment.trim());
        setSuccess(isTh ? 'บันทึกการปฏิเสธ/ขยายทดลองงานแล้ว' : 'Probation rejection/extension recorded.');
      }
      setComment('');
      setActiveAction(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : (isTh ? 'บันทึกไม่สำเร็จ' : 'Unable to save decision.'));
    } finally {
      setSavingAction(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <a
        href={`/${locale}/workflows/probation`}
        className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('probation.backToList')}
      </a>

      {!canDecide && isPending && (
        <Card className="mb-4 border-l-[3px] border-l-warning p-4" role="alert">
          <p className="text-sm font-medium text-ink">{t('probation.noPermissionTitle')}</p>
          <p className="mt-1 text-sm text-ink-muted">{t('probation.noPermissionBody')}</p>
        </Card>
      )}

      <PersonHero
        avatar={{
          src: c.photo,
          fallback: c.fullNameEn.substring(0, 2).toUpperCase(),
          status: heroStatus,
        }}
        name={{ th: c.fullNameTh, en: c.fullNameEn }}
        employeeId={c.employeeId}
        subtitle={c.position}
        meta={`${c.department} · ${displayValue(c.company)} · ${t('probation.startedWork')} ${formatDate(c.hireDate, 'medium', locale)}`}
        status={heroStatus}
        statusContext={
          isPending
            ? `${t('probation.probationDue')} ${formatDate(c.probationEndDate, 'long', locale)}`
            : c.status === 'approved'
              ? t('probation.passedPermanent')
              : c.status === 'rejected'
                ? t('probation.rejectedByManager')
                : `${t('probation.extendedUntil')} ${formatDate(c.slaDeadline, 'long', locale)}`
        }
        stats={[
          {
            label: t('probation.statusLabel'),
            value: STATUS_LABEL[c.status],
            tone:
              c.status === 'approved'
                ? 'success'
                : c.status === 'extended' || c.status === 'rejected'
                  ? 'danger'
                  : 'warning',
          },
          ...(isPending
            ? [
                {
                  label: t('probation.slaRemaining'),
                  value: `${slaHours} ${t('common.hours')}`,
                  tone: isUrgent ? ('danger' as const) : ('warning' as const),
                },
              ]
            : []),
          { label: t('probation.approver'), value: c.currentApprover.name },
        ]}
        className="mb-6"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FieldGroup title={t('probation.employeeContextTitle')} columns={2}>
            <Field label={t('probation.employeeId')} value={c.employeeId} mono />
            <Field label={t('probation.position')} value={displayValue(c.position)} />
            <Field label={t('probation.department')} value={displayValue(c.department)} />
            <Field label={t('probation.company')} value={displayValue(c.company)} />
            <Field label={t('probation.businessUnit')} value={displayValue(c.businessUnit)} />
            <Field label={t('probation.location')} value={displayValue(c.location)} />
            <Field label={t('probation.jobLevel')} value={displayValue(c.jobLevel)} />
          </FieldGroup>

          <FieldGroup title={t('probation.assessmentTitle')} columns={1}>
            <Field label={t('probation.requestType')} value={displayValue(c.requestType)} />
            <Field label={t('probation.requestReason')} value={displayValue(c.requestReason)} />
            <Field
              label={t('probation.assessmentSummary')}
              value={displayValue(c.assessmentSummary)}
            />
            <Field label={t('probation.managerRemarks')} value={displayValue(c.managerRemarks)} />
            <Field label={t('probation.hrRemarks')} value={displayValue(c.hrRemarks)} />
          </FieldGroup>

            {/* Critical-data guard + visible typed mock mapping note. */}
            {missingCriticalFields.length > 0 && (
              <Card className="mb-6 border-l-[3px] border-l-danger p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-danger shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {isTh ? 'ข้อมูลสำคัญไม่ครบ' : 'Critical probation data is missing'}
                    </p>
                    <p className="text-sm text-ink-muted">
                      {missingCriticalFields.join(', ')}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            <Card className="mb-6 border-l-[3px] border-l-info p-4">
              <p className="text-sm font-medium text-ink">
                {isTh ? 'หมายเหตุข้อมูล' : 'Data note'}
              </p>
              <p className="text-sm text-ink-muted mt-1">
                {isTh
                  ? 'หน้านี้ใช้ typed mock/sample probation workflow data; การ map กับ Employee Central / Probation API ยังเป็น TBD และแสดงค่า TBD เมื่อข้อมูล non-critical ยังไม่มา'
                  : 'This page uses typed mock/sample probation workflow data; Employee Central / Probation API mappings are TBD and non-critical missing values render as TBD indicators.'}
              </p>
            </Card>

            {success && (
              <Card className="mb-6 border-l-[3px] border-l-success p-4">
                <p className="text-sm font-semibold text-success">{success}</p>
              </Card>
            )}
            {error && !isPending && (
              <Card className="mb-6 border-l-[3px] border-l-danger p-4">
                <p className="text-sm font-semibold text-danger">{error}</p>
              </Card>
            )}

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
                {/* Employee org/job context */}
                <FieldGroup title={isTh ? 'บริบทพนักงาน / องค์กร' : 'Employee org/job context'} columns={1}>
                  <Field label={isTh ? 'บริษัท' : 'Company'} value={c.company} emptyKind="pending" />
                  <Field label={isTh ? 'หน่วยธุรกิจ' : 'Business Unit'} value={c.businessUnit} emptyKind="pending" />
                  <Field label={isTh ? 'แผนก' : 'Department'} value={c.department} />
                  <Field label={isTh ? 'ตำแหน่ง' : 'Position'} value={c.position} />
                  <Field label={isTh ? 'รหัสงาน' : 'Job Code'} value={c.jobCode} emptyKind="pending" mono />
                  <Field label={isTh ? 'ระดับงาน' : 'Job Level'} value={c.jobLevel} emptyKind="pending" />
                  <Field label={isTh ? 'กลุ่มพนักงาน' : 'Employee Group'} value={c.employeeGroup} emptyKind="pending" />
                  <Field label={isTh ? 'สถานที่ทำงาน' : 'Location'} value={c.location} emptyKind="pending" />
                </FieldGroup>

                {/* Request and manager context */}
                <FieldGroup title={isTh ? 'บริบทคำขอ / ผู้จัดการ' : 'Request / manager context'} columns={1}>
                  <Field label={isTh ? 'รหัสคำขอ' : 'Request ID'} value={c.id} mono />
                  <Field label={isTh ? 'สร้างโดย' : 'Requested By'} value={`${c.request.requestedBy} (${c.request.requestedRole})`} />
                  <Field label={isTh ? 'วันที่สร้างคำขอ' : 'Requested At'} value={formatDate(c.request.requestedAt, 'long', locale)} mono />
                  <Field label={isTh ? 'แหล่งข้อมูล' : 'Source'} value={c.request.source} emptyKind="pending" />
                  <Field
                    label={isTh ? 'ผู้จัดการโดยตรง' : 'Direct Manager'}
                    value={`${c.manager.name}${c.manager.employeeId ? ` (${c.manager.employeeId})` : ''}`}
                    emptyKind="pending"
                  />
                  <Field label={isTh ? 'ผู้อนุมัติปัจจุบัน' : 'Current Approver'} value={`${c.currentApprover.name} (${c.currentApprover.role})`} />
                </FieldGroup>

                {/* Probation Info */}
                <FieldGroup title={t('probation.infoTitle')} columns={1}>
                  <Field label={t('probation.hireDate')} value={formatDate(c.hireDate, 'long', locale)} mono />
                  <Field label={t('probation.probationEnd')} value={formatDate(c.probationEndDate, 'long', locale)} mono />
                  <Field label="SLA Deadline" value={formatDate(c.slaDeadline, 'long', locale)} mono />
                  <Field label={t('probation.statusLabel')} value={STATUS_LABEL[c.status]} />
                </FieldGroup>

                {/* Assessment/result context */}
                <FieldGroup title={isTh ? 'ผลประเมิน / เหตุผล / หมายเหตุ' : 'Assessment / reason / remarks'} columns={1}>
                  <Field label={isTh ? 'ผลลัพธ์' : 'Result'} value={c.assessment.result} emptyKind="pending" />
                  <Field label={isTh ? 'คะแนน / ระดับ' : 'Score / Rating'} value={c.assessment.score} emptyKind="pending" />
                  <Field label={isTh ? 'เหตุผล' : 'Reason'} value={c.assessment.reason} emptyKind="pending" />
                  <Field label={isTh ? 'หมายเหตุ' : 'Remarks'} value={c.assessment.remarks} emptyKind="pending" />
                </FieldGroup>

                {/* Action panel — only show for pending */}
                {isPending && (
                  <Capability
                    action="approve"
                    fallback={
                      <Card className="p-6 border-l-[3px] border-l-warning">
                        <p className="text-sm font-semibold text-ink">
                          {isTh ? 'ไม่มีสิทธิ์อนุมัติรายการนี้' : 'No permission to approve this request'}
                        </p>
                        <p className="text-xs text-ink-muted mt-1">
                          {isTh ? 'ใช้ permission model เดิมผ่าน Capability(action=\"approve\")' : 'Existing Capability(action=\"approve\") gate is denying action access.'}
                        </p>
                      </Card>
                    }
                  >
                    <Card className="overflow-hidden border-t-[3px] border-t-accent">
                      <div className="px-6 py-4">
                        <h3 className="text-sm font-semibold text-ink mb-3">{t('probation.takeAction')}</h3>

                        {success && (
                          <div className="mb-3 rounded-md border border-success bg-success-tint px-3 py-2 text-sm text-success">
                            {success}
                          </div>
                        )}
                        {error && (
                          <div className="mb-3 rounded-md border border-danger bg-danger-tint px-3 py-2 text-sm text-danger">
                            {error}
                          </div>
                        )}

                        {/* Comment */}
                        <label className="block text-xs text-ink-muted mb-1">{t('probation.commentLabel')}</label>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder={t('probation.commentPlaceholder')}
                          rows={3}
                          disabled={isSaving}
                          className="w-full text-sm bg-surface border border-hairline rounded-md px-3 py-2 text-ink outline-none focus:ring-1 focus:ring-accent resize-none mb-2 disabled:opacity-60"
                        />
                        <p className="mb-4 text-xs text-ink-muted">
                          {isTh ? 'อนุมัติ: ความเห็นไม่บังคับ · ปฏิเสธ: ต้องระบุเหตุผล' : 'Approve: comment optional · Reject: manager comment/reason required'}
                        </p>

                        <div className="flex gap-2">
                          <Button
                            variant="primary"
                            size="sm"
                            className="flex-1 bg-success text-white hover:bg-success/90"
                            onClick={() => openConfirm('approve')}
                            disabled={isSaving || missingCriticalFields.length > 0}
                            loading={savingAction === 'approve'}
                          >
                            <CheckCircle className="mr-1.5 h-4 w-4" />
                            {t('probation.approve')}
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="flex-1 border-danger text-danger hover:bg-danger-tint"
                            onClick={() => openConfirm('reject')}
                            disabled={isSaving || missingCriticalFields.length > 0}
                            loading={savingAction === 'reject'}
                          >
                            <XCircle className="mr-1.5 h-4 w-4" />
                            {t('probation.reject')}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Capability>
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
      </div>

      {activeAction && (
        <Modal
          open
          onClose={closeConfirm}
          title={
            activeAction === 'approve'
              ? (isTh ? 'ยืนยันการอนุมัติ' : 'Confirm probation approval')
              : (isTh ? 'ยืนยันการปฏิเสธ' : 'Confirm probation rejection')
          }
        >
          <div className="space-y-4">
            <p className="text-sm text-ink-muted">
              {activeAction === 'approve'
                ? (isTh ? `ยืนยันให้ ${c.fullNameTh} ผ่านทดลองงานหรือไม่?` : `Approve probation for ${c.fullNameEn}?`)
                : (isTh ? `ยืนยันการปฏิเสธ/ขยายทดลองงานของ ${c.fullNameTh} หรือไม่?` : `Reject/extend probation for ${c.fullNameEn}?`)}
            </p>
            {comment.trim() && (
              <div className="rounded-md bg-surface-raised px-3 py-2">
                <p className="text-xs text-ink-muted">{isTh ? 'ความเห็นผู้จัดการ' : 'Manager comment'}</p>
                <p className="text-sm text-ink mt-1">{comment.trim()}</p>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="md" onClick={closeConfirm} disabled={isSaving}>
                {isTh ? 'ยกเลิก' : 'Cancel'}
              </Button>
              <Button
                variant={activeAction === 'approve' ? 'primary' : 'danger'}
                size="md"
                onClick={submitDecision}
                disabled={isSaving}
                loading={savingAction === activeAction}
              >
                {isTh ? 'ยืนยัน' : 'Confirm'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
