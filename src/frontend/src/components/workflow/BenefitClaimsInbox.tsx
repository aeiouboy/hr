'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, Clock, Paperclip, RotateCcw, Workflow, X } from 'lucide-react';
import { Button } from '@/components/humi';
import { useAuthStore } from '@/stores/auth-store';
import {
  BENEFIT_STATUS_LABEL,
  BENEFIT_TYPE_LABEL,
  useBenefitClaimsStore,
  type BenefitClaimRequest,
} from '@/stores/benefit-claims';
import {
  completeTask,
  listPendingTasks,
  type PendingTaskSummary,
} from '@/lib/workflow-api';
import {
  mergeBenefitInboxRows,
  type BenefitInboxRow,
} from './benefitInboxMerge';

// Polling cadence for live Camunda benefit-request tasks.
const CAMUNDA_POLL_MS = 12_000;
// Demo fallback assignee — used when the auth store has no userId.
// Matches Camunda Run's default `demo` user, who is also the managerId
// hardcoded in seeded benefit-request instances.
//
// Camunda task semantics: when a user task has `assignee` set, the engine
// considers it "claimed" — querying by `candidateGroups` then returns 0
// results. So we filter by assignee = current logged-in user instead.
//
// TODO(phase-2): also fetch unclaimed tasks where current user is in the
// candidate group, so a manager can pick up a colleague's overflow.
const CAMUNDA_FALLBACK_ASSIGNEE = 'demo';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function formatTHB(amount: number): string {
  try {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `฿${amount.toLocaleString('th-TH')}`;
  }
}

export function BenefitClaimsInbox() {
  const claims = useBenefitClaimsStore((s) => s.claims);
  const approveClaim = useBenefitClaimsStore((s) => s.approveClaim);
  const rejectClaim = useBenefitClaimsStore((s) => s.rejectClaim);
  const sendBackClaim = useBenefitClaimsStore((s) => s.sendBackClaim);
  const actorName = useAuthStore((s) => s.username) ?? 'SPD Benefits';
  const camundaAssignee = useAuthStore((s) => s.userId) ?? CAMUNDA_FALLBACK_ASSIGNEE;

  const [camundaTasks, setCamundaTasks] = useState<PendingTaskSummary[]>([]);
  const [camundaError, setCamundaError] = useState<string | null>(null);

  const refreshCamunda = useCallback(async () => {
    try {
      const next = await listPendingTasks({ assignee: camundaAssignee });
      setCamundaTasks(next);
      setCamundaError(null);
    } catch (e) {
      // Gateway may simply be offline in dev — surface the error inline but
      // keep the legacy mock lane usable.
      setCamundaError(e instanceof Error ? e.message : String(e));
    }
  }, [camundaAssignee]);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      if (cancelled) return;
      await refreshCamunda();
    };
    void tick();
    const handle = window.setInterval(tick, CAMUNDA_POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(handle);
    };
  }, [refreshCamunda]);

  const pendingMockClaims = useMemo(
    () => claims.filter((claim) => claim.status === 'pending_spd'),
    [claims],
  );
  const history = useMemo(
    () => claims.filter((claim) => claim.status !== 'pending_spd').slice(0, 5),
    [claims],
  );

  const rows: BenefitInboxRow[] = useMemo(
    () => mergeBenefitInboxRows(pendingMockClaims, camundaTasks),
    [pendingMockClaims, camundaTasks],
  );

  const actor = { role: 'spd' as const, name: actorName };

  const handleCamundaDecision = useCallback(
    async (taskId: string, approved: boolean, reviewerComment?: string) => {
      // Optimistic remove — refetch picks up the authoritative state on the
      // next poll tick.
      setCamundaTasks((prev) => prev.filter((t) => t.id !== taskId));
      try {
        await completeTask(taskId, { approved, reviewerComment });
      } catch (e) {
        setCamundaError(e instanceof Error ? e.message : String(e));
      } finally {
        void refreshCamunda();
      }
    },
    [refreshCamunda],
  );

  return (
    <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h1 className="font-display text-[22px] font-semibold text-ink">Benefit Reimbursement — SPD</h1>
        <p className="text-small text-ink-muted mt-1">สวัสดิการรอ SPD ตรวจสอบ</p>
        <p className="text-small text-ink-muted mt-1">ตรวจคำขอเบิกสวัสดิการจาก Employee Self Service พร้อม approve / reject / send back</p>
      </div>

      <div className="humi-row" style={{ gap: 12, flexWrap: 'wrap' }}>
        <div className="humi-card humi-card--cream" style={{ padding: '10px 16px', minWidth: 140 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}><Clock size={10} className="inline mr-1" aria-hidden />รอ SPD</div>
          <div className="text-body font-semibold text-ink">{rows.length} รายการ</div>
        </div>
        <div className="humi-card humi-card--cream" style={{ padding: '10px 16px', minWidth: 140 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}><Workflow size={10} className="inline mr-1" aria-hidden />Camunda</div>
          <div className="text-body font-semibold text-ink">{camundaTasks.length} รายการ</div>
        </div>
        <div className="humi-card humi-card--cream" style={{ padding: '10px 16px', minWidth: 140 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ประวัติ</div>
          <div className="text-body font-semibold text-ink">{history.length} รายการ</div>
        </div>
      </div>

      {camundaError && (
        <div className="humi-card" style={{ padding: '10px 14px', borderColor: 'var(--color-danger, #c0392b)' }}>
          <p className="text-small text-ink-muted">Camunda gateway: {camundaError}</p>
        </div>
      )}

      <section>
        <div className="humi-eyebrow" style={{ marginBottom: 10 }}>คำขอเบิกสวัสดิการรออนุมัติ</div>
        {rows.length === 0 ? (
          <div className="humi-card humi-card--cream" style={{ textAlign: 'center', padding: 40 }}>
            <p className="text-body text-ink-muted">ไม่มีคำขอเบิกสวัสดิการรอ SPD</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {rows.map((row) =>
              row.source === 'mock' ? (
                <BenefitClaimCard
                  key={row.key}
                  claim={row.claim}
                  onApprove={(note) => approveClaim(row.claim.id, actor, note)}
                  onReject={(reason) => rejectClaim(row.claim.id, actor, reason)}
                  onSendBack={(reason) => sendBackClaim(row.claim.id, actor, reason)}
                />
              ) : (
                <CamundaTaskCard
                  key={row.key}
                  task={row.task}
                  onApprove={(note) => handleCamundaDecision(row.task.id, true, note)}
                  onReject={(reason) => handleCamundaDecision(row.task.id, false, reason)}
                />
              ),
            )}
          </div>
        )}
      </section>

      {history.length > 0 && (
        <section>
          <div className="humi-eyebrow" style={{ marginBottom: 10 }}>ประวัติล่าสุด</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {history.map((claim) => (
              <details
                key={claim.id}
                className="humi-card humi-card--cream"
                style={{ padding: '10px 14px' }}
              >
                <summary
                  className="humi-row"
                  style={{ gap: 8, flexWrap: 'wrap', alignItems: 'center', cursor: 'pointer', listStyle: 'none' }}
                >
                  <span className="text-small font-medium text-ink" style={{ flex: 1 }}>{claim.workflowRequestId} — {claim.employeeName} — {claim.benefitName}</span>
                  <span className="humi-tag">{BENEFIT_STATUS_LABEL[claim.status]}</span>
                  <span className="text-small text-ink-muted">{formatDate(claim.updatedAt)}</span>
                </summary>
                <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--color-hairline)', display: 'grid', gap: 12 }}>
                  <div className="humi-row" style={{ gap: 16, flexWrap: 'wrap' }}>
                    <div>
                      <div className="humi-eyebrow">เลขที่ใบเสร็จ</div>
                      <div className="text-small font-medium text-ink">{claim.receiptNo || '—'}</div>
                    </div>
                    <div>
                      <div className="humi-eyebrow">จำนวนเงินเบิก</div>
                      <div className="text-small font-medium text-ink">฿{claim.totalClaimAmount.toLocaleString('th-TH')}</div>
                    </div>
                    <div>
                      <div className="humi-eyebrow">ส่งเมื่อ</div>
                      <div className="text-small font-medium text-ink">{formatDate(claim.submittedAt)}</div>
                    </div>
                    {claim.attachments.length > 0 && (
                      <div>
                        <div className="humi-eyebrow">ไฟล์แนบ</div>
                        <div className="text-small text-ink-muted">{claim.attachments.length} ไฟล์</div>
                      </div>
                    )}
                  </div>
                  {claim.correctionReason && (
                    <div>
                      <div className="humi-eyebrow">เหตุผล</div>
                      <div className="text-small text-ink-muted">{claim.correctionReason}</div>
                    </div>
                  )}
                  {claim.audit.length > 0 && (
                    <div>
                      <div className="humi-eyebrow" style={{ marginBottom: 6 }}>Timeline</div>
                      <ol style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 0, listStyle: 'none' }}>
                        {claim.audit.map((entry, idx) => (
                          <li key={`${claim.id}-audit-${idx}`} className="text-small">
                            <span className="text-ink-muted" style={{ marginRight: 6 }}>{formatDate(entry.at)}</span>
                            <span className="font-medium text-ink">{entry.actorName}</span>
                            <span className="text-ink-muted"> · {entry.action}</span>
                            {entry.note && <span className="text-ink-muted"> — {entry.note}</span>}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export function BenefitClaimCard({ claim, onApprove, onReject, onSendBack }: { claim: BenefitClaimRequest; onApprove: (note?: string) => void; onReject: (reason: string) => void; onSendBack: (reason: string) => void }) {
  const [comment, setComment] = useState('');

  return (
    <div className="humi-card" style={{ padding: 18 }}>
      <div className="humi-row" style={{ gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>
            {claim.workflowRequestId} · {claim.id}
            {claim.workflowInstanceId && (
              <>
                {' · '}
                <span style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)', textTransform: 'none', letterSpacing: 0 }}>
                  flow {claim.workflowInstanceId.slice(0, 8)}
                </span>
              </>
            )}
          </div>
          <div className="text-body font-semibold text-ink">{BENEFIT_TYPE_LABEL[claim.benefitType]} — {claim.employeeName}</div>
          <div className="text-small text-ink-muted mt-0.5">{claim.employeeId} · ส่งเมื่อ {formatDate(claim.submittedAt)} · {claim.company}/{claim.businessUnit}</div>
        </div>
        <span className="humi-tag">Mock</span>
        <span className="humi-tag humi-tag--butter">{BENEFIT_STATUS_LABEL[claim.status]}</span>
      </div>

      <div style={{ marginTop: 14, borderTop: '1px solid var(--color-hairline-soft)', paddingTop: 14 }}>
        <div className="humi-eyebrow" style={{ marginBottom: 8 }}>รายละเอียดคำขอ</div>
        <dl className="grid gap-2 md:grid-cols-2 text-small">
          <Info label="Benefit code" value={claim.benefitCode} />
          <Info label="Flow ID (Camunda)" value={claim.workflowInstanceId ?? '— ไม่ผูก Camunda —'} />
          <Info label="ใบเสร็จ/เลขที่เอกสาร" value={claim.receiptNo} />
          <Info label="วันที่เอกสาร" value={claim.receiptDate} />
          <Info label="จำนวนเงินขอเบิก" value={`฿${claim.totalClaimAmount.toLocaleString('th-TH')}`} />
          <Info label="โรงพยาบาล" value={claim.hospitalName ?? '-'} />
          <Info label="รายละเอียดโรค/การรักษา" value={claim.diseaseDetails ?? '-'} />
        </dl>
      </div>

      <div style={{ marginTop: 12, borderTop: '1px solid var(--color-hairline-soft)', paddingTop: 12 }}>
        <div className="humi-eyebrow" style={{ marginBottom: 8 }}><Paperclip size={11} className="inline mr-1" aria-hidden />เอกสารแนบ ({claim.attachments.length})</div>
        {claim.attachments.length === 0 ? <p className="text-small text-ink-muted">ไม่มีเอกสารแนบ</p> : claim.attachments.map((file) => (
          <div key={file.id} className="text-small text-ink" style={{ padding: '6px 10px', background: 'var(--color-canvas-soft)', borderRadius: 8 }}>{file.filename} · {file.sizeMb} MB</div>
        ))}
      </div>

      <div style={{ marginTop: 14, borderTop: '1px solid var(--color-hairline-soft)', paddingTop: 14 }}>
        <label className="humi-label" htmlFor={`${claim.id}-benefit-comment`}>เหตุผล (จำเป็นเมื่อปฏิเสธหรือส่งกลับ)</label>
        <textarea id={`${claim.id}-benefit-comment`} value={comment} onChange={(e) => setComment(e.target.value)} rows={3} className="w-full rounded-md border border-hairline bg-surface px-3 py-2 text-body text-ink placeholder:text-ink-faint transition-[border-color,box-shadow] duration-[var(--dur-fast)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas" style={{ minHeight: 80 }} />
        <div className="humi-row" style={{ justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
          <Button variant="ghost" size="sm" onClick={() => { onSendBack(comment.trim()); setComment(''); }} disabled={!comment.trim()}><RotateCcw size={14} aria-hidden />ส่งกลับแก้ไข</Button>
          <Button variant="ghost" size="sm" onClick={() => { onReject(comment.trim()); setComment(''); }} disabled={!comment.trim()}><X size={14} aria-hidden />ปฏิเสธ</Button>
          <Button variant="primary" size="sm" onClick={() => { onApprove(comment.trim() || undefined); setComment(''); }}><Check size={14} aria-hidden />อนุมัติ</Button>
        </div>
      </div>
    </div>
  );
}

export function CamundaTaskCard({ task, onApprove, onReject }: { task: PendingTaskSummary; onApprove: (note?: string) => void; onReject: (reason: string) => void }) {
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (decision: 'approve' | 'reject') => {
    if (submitting) return;
    if (decision === 'reject' && !comment.trim()) return;
    setSubmitting(true);
    try {
      const note = comment.trim() || undefined;
      if (decision === 'approve') onApprove(note);
      else onReject(comment.trim());
      setComment('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="humi-card" style={{ padding: 18 }}>
      <div className="humi-row" style={{ gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>{task.processDefinitionKey} · {task.id}</div>
          <div className="text-body font-semibold text-ink">{task.name} — {task.variables.requesterId}</div>
          <div className="text-small text-ink-muted mt-0.5">{task.variables.benefitType} · ส่งเมื่อ {formatDate(task.created)} · assignee {task.assignee ?? '—'}</div>
        </div>
        <span className="humi-tag humi-tag--butter"><Workflow size={10} className="inline mr-1" aria-hidden />Camunda</span>
      </div>

      <div style={{ marginTop: 14, borderTop: '1px solid var(--color-hairline-soft)', paddingTop: 14 }}>
        <div className="humi-eyebrow" style={{ marginBottom: 8 }}>รายละเอียดคำขอ (live workflow)</div>
        <dl className="grid gap-2 md:grid-cols-2 text-small">
          <Info label="Requester" value={task.variables.requesterId} />
          <Info label="Manager" value={task.variables.managerId} />
          <Info label="Benefit type" value={task.variables.benefitType} />
          <Info label="Amount" value={formatTHB(task.variables.amount)} />
          <Info label="Description" value={task.variables.description || '-'} />
          <Info label="Instance" value={task.instanceId} />
        </dl>
      </div>

      <div style={{ marginTop: 14, borderTop: '1px solid var(--color-hairline-soft)', paddingTop: 14 }}>
        <label className="humi-label" htmlFor={`${task.id}-camunda-comment`}>ความคิดเห็นถึงผู้ขอ (จำเป็นเมื่อปฏิเสธ)</label>
        <textarea id={`${task.id}-camunda-comment`} value={comment} onChange={(e) => setComment(e.target.value)} rows={3} className="w-full rounded-md border border-hairline bg-surface px-3 py-2 text-body text-ink placeholder:text-ink-faint transition-[border-color,box-shadow] duration-[var(--dur-fast)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas" style={{ minHeight: 80 }} />
        <div className="humi-row" style={{ justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
          <Button variant="ghost" size="sm" onClick={() => submit('reject')} disabled={submitting || !comment.trim()}><X size={14} aria-hidden />ปฏิเสธ</Button>
          <Button variant="primary" size="sm" onClick={() => submit('approve')} disabled={submitting}><Check size={14} aria-hidden />อนุมัติ</Button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div style={{ padding: '6px 10px', background: 'var(--color-canvas-soft)', borderRadius: 8 }}><dt className="text-ink-muted">{label}</dt><dd className="font-medium text-ink">{value}</dd></div>;
}
