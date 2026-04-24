'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Modal } from '@/components/humi/Modal';
import { Button } from '@/components/humi/Button';
import { FormField } from '@/components/humi/FormField';
import { useHumiProfileStore } from '@/stores/humi-profile-slice';

// ════════════════════════════════════════════════════════════
// ReasonModal — shared approve/reject confirmation dialog.
// Hooks order invariant: all hooks declared BEFORE early return.
// ════════════════════════════════════════════════════════════

export interface ReasonModalProps {
  open: boolean;
  mode: 'approve' | 'reject';
  changeId: string | null;
  onClose: () => void;
}

export function ReasonModal({ open, mode, changeId, onClose }: ReasonModalProps) {
  const t = useTranslations();
  const [reason, setReason] = useState('');

  // Reset textarea content each time the modal opens
  useEffect(() => {
    if (open) setReason('');
  }, [open]);

  // --- hooks declared above this guard ---
  if (!open || !changeId) return null;

  const rejectWithoutReason = mode === 'reject' && reason.trim() === '';

  const handleConfirm = () => {
    const store = useHumiProfileStore.getState();
    if (mode === 'approve') {
      store.adminApproveWithReason(changeId, reason.trim() || undefined);
    } else {
      store.adminRejectWithReason(changeId, reason.trim());
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t(
        mode === 'approve'
          ? 'ess.approver.modal.approveTitle'
          : 'ess.approver.modal.rejectTitle'
      )}
    >
      <div className="flex flex-col gap-4">
        <FormField label={t('ess.approver.modal.reasonLabel')}>
          {(controlProps) => (
            <textarea
              {...controlProps}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-hairline bg-surface px-3 py-2 text-body text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas resize-none"
            />
          )}
        </FormField>

        {rejectWithoutReason && (
          <p className="text-small font-medium text-[color:var(--color-danger-ink)]">
            {t('ess.approver.modal.reasonRequired')}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            {t('ess.approver.modal.cancel')}
          </Button>
          <Button
            variant="primary"
            disabled={rejectWithoutReason}
            onClick={handleConfirm}
          >
            {t('ess.approver.modal.confirm')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
