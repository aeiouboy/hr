'use client';

// resignation-page.tsx — ESS ลาออก (Chain 1 / BRD #172)
//
// พนักงานยื่นคำขอลาออก → stores ใน termination-approvals → SPD อนุมัติ
// Reason codes: 17 SF TERM_* codes (sf-extract/qas-fields-2026-04-25 zVoluntary picklist)
// เมื่อ submit: addRequest() → toast "ส่งคำขอลาออกแล้ว — รอ SPD อนุมัติ"

import { useState } from 'react';
import { FileX, CheckCircle } from 'lucide-react';
import {
  useTerminationApprovals,
  TERMINATION_REASON_LABEL,
  type TerminationReasonCode,
} from '@/stores/termination-approvals';
import { useAuthStore } from '@/stores/auth-store';

function formatDateTh(iso: string): string {
  return new Date(iso).toLocaleDateString('th-TH', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export function ResignationPage() {
  const addRequest = useTerminationApprovals((s) => s.addRequest);
  const requests = useTerminationApprovals((s) => s.requests);
  const userId = useAuthStore((s) => s.userId) ?? 'EMP001';
  const userName = useAuthStore((s) => s.username) ?? 'พนักงาน';

  const [lastWorkingDate, setLastWorkingDate] = useState('');
  const [reasonCode, setReasonCode] = useState<TerminationReasonCode | ''>('');
  const [comment, setComment] = useState('');
  const [attachmentName, setAttachmentName] = useState<string | undefined>(undefined);
  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  // Find a pending or approved request by this user.
  // If the most recent request is `rejected`, allow re-submission — the form
  // re-renders and the rejected request is shown as a notice (see banner below).
  // Pre-Phase-5 fix: any-status `find()` blocked the form forever once a seeded
  // demo request existed for the default `EMP001` userId.
  const myRequest = requests.find(
    (r) => r.employeeId === userId && r.status !== 'rejected',
  );
  const lastRejected = requests.find(
    (r) => r.employeeId === userId && r.status === 'rejected',
  );

  const hasPending =
    myRequest?.status === 'pending_manager' || myRequest?.status === 'pending_spd';
  const isApproved = myRequest?.status === 'approved';
  const isFormValid =
    !!lastWorkingDate && !!reasonCode && !hasPending && !isApproved;

  const handleSubmit = () => {
    if (!isFormValid || !reasonCode) return;
    const id = addRequest({
      employeeId: userId,
      employeeName: userName,
      requestedLastDay: lastWorkingDate,
      reasonCode: reasonCode as TerminationReasonCode,
      reasonText: comment.trim() || undefined,
      attachments: attachmentName ? [attachmentName] : undefined,
      submittedBy: { id: userId, name: userName, role: 'employee' },
    });
    setSubmittedId(id);
    setSubmitted(true);
  };

  // Only show the post-submit success view on a FRESH in-session submit.
  // Pre-existing pending/approved/rejected requests should NOT replace the form
  // on revisit — the form is the canonical landing surface, with status shown
  // as a banner above it (see lastPending / approved / lastRejected blocks).
  if (submitted) {
    const req = requests.find((r) => r.id === submittedId);
    return (
      <div className="pb-8 flex flex-col gap-5">
        <div>
          <h1 className="font-display text-[22px] font-semibold text-ink">คำขอลาออก</h1>
          <p className="text-small text-ink-muted mt-1">
            ยื่นคำขอลาออกผ่านระบบ Self-Service (BRD #172)
          </p>
        </div>

        <div className="humi-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <CheckCircle size={28} className="text-success" aria-hidden />
            <div>
              <div className="font-display text-body font-semibold text-ink">
                ส่งคำขอลาออกแล้ว — รอ SPD อนุมัติ
              </div>
              <div className="text-small text-ink-muted">
                รหัสคำขอ: {req?.id}
              </div>
            </div>
          </div>

          {req && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <div className="humi-eyebrow">วันทำงานวันสุดท้าย</div>
                <div className="text-body font-medium text-ink">
                  {formatDateTh(req.requestedLastDay)}
                </div>
              </div>
              <div>
                <div className="humi-eyebrow">เหตุผล</div>
                <div className="text-body font-medium text-ink">
                  {TERMINATION_REASON_LABEL[req.reasonCode]}
                </div>
              </div>
              {req.reasonText && (
                <div className="sm:col-span-2">
                  <div className="humi-eyebrow">หมายเหตุเพิ่มเติม</div>
                  <div className="text-body text-ink">{req.reasonText}</div>
                </div>
              )}
              <div>
                <div className="humi-eyebrow">สถานะ</div>
                <span className="humi-tag humi-tag--butter">
                  {req.status === 'pending_manager'
                    ? 'รอ Manager อนุมัติ'
                    : req.status === 'pending_spd'
                    ? 'รอ SPD อนุมัติ'
                    : req.status === 'approved'
                    ? 'อนุมัติแล้ว'
                    : 'ถูกปฏิเสธ'}
                </span>
              </div>
              <div>
                <div className="humi-eyebrow">ส่งเมื่อ</div>
                <div className="text-body text-ink">
                  {new Date(req.submittedAt).toLocaleDateString('th-TH', {
                    year: 'numeric', month: 'short', day: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-8 flex flex-col gap-5">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-ink">คำขอลาออก</h1>
        <p className="text-small text-ink-muted mt-1">
          ยื่นคำขอลาออกผ่านระบบ Self-Service — SPD จะรับทราบและดำเนินการต่อ (BRD #172)
        </p>
      </div>

      {myRequest?.status === 'pending_manager' && (
        <div className="humi-card humi-card--info p-4">
          <div className="humi-eyebrow">มีคำขอที่ยังรอ Manager อนุมัติ</div>
          <div className="text-small text-ink">
            รหัส {myRequest.id} — รออนุมัติจาก Manager ส่งคำขอใหม่ไม่ได้จนกว่า Manager จะตัดสิน
          </div>
        </div>
      )}

      {myRequest?.status === 'pending_spd' && (
        <div className="humi-card humi-card--info p-4">
          <div className="humi-eyebrow">มีคำขอที่ยังรอ SPD อนุมัติ</div>
          <div className="text-small text-ink">
            รหัส {myRequest.id} — Manager อนุมัติแล้ว รออนุมัติครั้งสุดท้ายจาก SPD
          </div>
        </div>
      )}

      {myRequest?.status === 'approved' && (
        <div className="humi-card humi-card--success p-4">
          <div className="humi-eyebrow">คำขอลาออกได้รับการอนุมัติแล้ว</div>
          <div className="text-small text-ink">
            รหัส {myRequest.id} — วันทำงานสุดท้าย {formatDateTh(myRequest.requestedLastDay)}
          </div>
        </div>
      )}

      {lastRejected && (
        <div className="humi-card humi-card--warning p-4">
          <div className="humi-eyebrow">คำขอก่อนหน้านี้ถูกปฏิเสธ</div>
          <div className="text-small text-ink">
            รหัส {lastRejected.id} — ส่งใหม่ได้ ปรับเหตุผลหรือเอกสารแนบให้ครบก่อนส่ง
          </div>
        </div>
      )}

      {/* Form */}
      <div className="humi-card p-6">
        <div className="humi-eyebrow mb-4">กรอกข้อมูลการลาออก</div>

        <div className="space-y-5">
          {/* วันทำงานวันสุดท้าย */}
          <div>
            <label htmlFor="lastWorkingDate" className="humi-label">
              วันทำงานวันสุดท้าย <span className="humi-asterisk">*</span>
            </label>
            <input
              id="lastWorkingDate"
              type="date"
              value={lastWorkingDate}
              onChange={(e) => setLastWorkingDate(e.target.value)}
              min={new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10)}
              className="humi-input max-w-[220px]"
            />
            <p className="text-small text-ink-muted mt-1">
              กรุณาแจ้งล่วงหน้าอย่างน้อย 30 วัน
            </p>
          </div>

          {/* เหตุผลการลาออก */}
          <div>
            <label htmlFor="reasonCode" className="humi-label">
              เหตุผลการลาออก <span className="humi-asterisk">*</span>
            </label>
            <select
              id="reasonCode"
              value={reasonCode}
              onChange={(e) => setReasonCode(e.target.value as TerminationReasonCode | '')}
              className="humi-input max-w-[360px]"
            >
              <option value="">-- เลือกเหตุผล --</option>
              {(Object.entries(TERMINATION_REASON_LABEL) as [TerminationReasonCode, string][]).map(
                ([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ),
              )}
            </select>
          </div>

          {/* หมายเหตุ */}
          <div>
            <label htmlFor="comment" className="humi-label">
              หมายเหตุเพิ่มเติม <span className="text-small text-ink-muted">(ไม่จำเป็น)</span>
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="ระบุรายละเอียดเพิ่มเติม (ถ้ามี)"
              className="humi-input w-full resize-y max-w-[520px]"
            />
          </div>

          {/* เอกสารแนบ */}
          <div>
            <label htmlFor="attachment" className="humi-label">
              เอกสารแนบ <span className="text-small text-ink-muted">(ไม่จำเป็น)</span>
            </label>
            <input
              id="attachment"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setAttachmentName(file ? file.name : undefined);
              }}
              className="block text-small text-ink-soft mt-1"
            />
            {attachmentName && (
              <p className="text-small text-accent mt-1">{attachmentName}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-5">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="humi-btn humi-btn--primary"
            aria-disabled={!isFormValid}
          >
            ส่งคำขอลาออก
          </button>
        </div>
      </div>

      {/* Info note */}
      <div className="humi-card humi-card--cream px-4 py-3">
        <div className="text-small text-ink-muted">
          เมื่อส่งคำขอแล้ว SPD จะรับทราบผ่านกล่องอนุมัติ และดำเนินการกระบวนการสิ้นสุดการจ้างงานต่อไป
        </div>
      </div>
    </div>
  );
}
