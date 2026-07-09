'use client';

import { Button } from '../atoms/Button';
import { Modal } from './Modal';

// CancelRequestModal — shared, presentational confirm dialog for employee
// self-cancel of a request still at its FIRST approval stage (STA-175,
// generalizing STA-157's leave-only flow). Renders the five spec fields plus a
// pumpkin warning box (NO-RED — uses --color-danger, never red/hex). TH/EN via
// the `locale` prop (inline ternaries — matches the surfaces' existing style).

export interface CancelRequestModalFields {
  /** Localized request-type label, e.g. "ลาพักร้อน" / "OT". */
  typeLabel: string;
  /** Date or date-range, BE-formatted via lib/date.ts formatDate. */
  period: string;
  /** Free-text reason/remark where the type carries one. */
  reason?: string;
  /** Current approval step, e.g. "รอหัวหน้าอนุมัติ" / "Awaiting manager". */
  currentStep: string;
  /** Current status, e.g. "รออนุมัติ" / "Pending Approval". */
  currentStatus: string;
}

export interface CancelRequestModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  locale: 'th' | 'en';
  fields: CancelRequestModalFields;
}

export function CancelRequestModal({
  open,
  onClose,
  onConfirm,
  locale,
  fields,
}: CancelRequestModalProps) {
  const isTh = locale === 'th';
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isTh ? 'ยกเลิกคำขอ' : 'Cancel request'}
      widthClass="max-w-md"
    >
      <div className="mb-4 rounded-[var(--radius-md)] border border-hairline bg-canvas-soft px-4 py-3">
        <dl className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-1.5 text-small">
          <dt className="text-ink-muted">{isTh ? 'ประเภทคำขอ' : 'Request type'}</dt>
          <dd className="font-medium text-ink">{fields.typeLabel}</dd>

          <dt className="text-ink-muted">{isTh ? 'วันที่' : 'Date / period'}</dt>
          <dd className="font-medium text-ink">{fields.period}</dd>

          {fields.reason ? (
            <>
              <dt className="text-ink-muted">{isTh ? 'เหตุผล' : 'Reason'}</dt>
              <dd className="font-medium text-ink">{fields.reason}</dd>
            </>
          ) : null}

          <dt className="text-ink-muted">{isTh ? 'ขั้นการอนุมัติปัจจุบัน' : 'Current step'}</dt>
          <dd className="font-medium text-ink">{fields.currentStep}</dd>

          <dt className="text-ink-muted">{isTh ? 'สถานะปัจจุบัน' : 'Current status'}</dt>
          <dd className="font-medium text-ink">{fields.currentStatus}</dd>
        </dl>
      </div>

      {/* Pumpkin warning box — NO-RED (--color-danger). */}
      <div
        role="alert"
        className="flex flex-col gap-1.5 rounded-[var(--radius-md)] border border-[color:var(--color-danger)] bg-[color:var(--color-danger-soft)] p-3 text-[color:var(--color-danger)]"
      >
        <p className="text-small font-medium">
          {isTh
            ? 'หากยืนยัน คำขอนี้จะถูกยกเลิกและไม่สามารถแก้ไขได้'
            : 'Once confirmed, this request will be cancelled and can no longer be edited.'}
        </p>
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <Button variant="ghost" size="md" onClick={onClose}>
          {isTh ? 'ไม่ยกเลิก' : 'Keep Request'}
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={onConfirm}
          className="bg-[color:var(--color-danger)] text-canvas hover:bg-[color:var(--color-danger)]/90"
        >
          {isTh ? 'ยืนยันการยกเลิก' : 'Confirm cancellation'}
        </Button>
      </div>
    </Modal>
  );
}
