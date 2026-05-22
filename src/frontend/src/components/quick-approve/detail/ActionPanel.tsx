'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, XCircle, RotateCcw, Route, ShieldAlert } from 'lucide-react';
import { Button, Modal, FormField, Capability } from '@/components/humi';
import { cn } from '@/lib/utils';
import type { RequestType } from '@/lib/quick-approve-api';

interface ActionPanelProps {
  requestId: string;
  requestType?: RequestType;
  onApprove?: (id: string, comment: string) => void;
  onReject?: (id: string, reason: string) => void;
  onReturn?: (id: string, reason: string) => void;
  onReroute?: (id: string, target: string) => void;
  onOverride?: (id: string, reason: string) => void;
}

type ActionType = 'approve' | 'reject' | 'return' | 'reroute' | 'override';

export function ActionPanel({
  requestId,
  requestType,
  onApprove,
  onReject,
  onReturn,
  onReroute,
  onOverride,
}: ActionPanelProps) {
  const t = useTranslations('quick_approve_detail');
  const [activeAction, setActiveAction] = useState<ActionType | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleOpen = (action: ActionType) => {
    setActiveAction(action);
    setInputValue('');
  };

  const handleClose = () => {
    setActiveAction(null);
    setInputValue('');
  };

  const handleConfirm = async () => {
    if (!activeAction) return;
    setSubmitting(true);
    try {
      switch (activeAction) {
        case 'approve':
          onApprove?.(requestId, inputValue);
          break;
        case 'reject':
          onReject?.(requestId, inputValue);
          break;
        case 'return':
          onReturn?.(requestId, inputValue);
          break;
        case 'reroute':
          onReroute?.(requestId, inputValue);
          break;
        case 'override':
          onOverride?.(requestId, inputValue);
          break;
      }
    } finally {
      setSubmitting(false);
      handleClose();
    }
  };

  const modalTitle: Record<ActionType, string> = {
    approve: t('confirmApprove'),
    reject: t('confirmReject'),
    return: t('confirmReturn'),
    reroute: t('confirmReroute'),
    override: t('confirmOverride'),
  };

  const inputLabel: Record<ActionType, string> = {
    approve: t('commentOptional'),
    reject: t('rejectReason'),
    return: t('returnReason'),
    reroute: t('rerouteTarget'),
    override: t('overrideReason'),
  };

  const inputRequired: Record<ActionType, boolean> = {
    approve: false,
    reject: true,
    return: true,
    reroute: true,
    override: true,
  };

  const canSubmit = activeAction
    ? !inputRequired[activeAction] || inputValue.trim().length > 0
    : false;
  const isClaim = requestType === 'claim';

  return (
    <>
      {/* Action buttons */}
      <div className="sticky bottom-0 z-10 flex flex-wrap items-center gap-3 rounded-[var(--radius-lg)] border border-hairline bg-surface p-4 shadow-[var(--shadow-sm)]">
        <Capability action="approve">
          <Button
            variant="primary"
            size="md"
            onClick={() => handleOpen('approve')}
            className="flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            {t('approve')}
          </Button>
          {!isClaim && (
            <Button
              variant="danger"
              size="md"
              onClick={() => handleOpen('reject')}
              className="flex items-center gap-2"
            >
              <XCircle className="h-4 w-4" aria-hidden />
              {t('reject')}
            </Button>
          )}
          <Button
            variant="secondary"
            size="md"
            onClick={() => handleOpen('return')}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            {t('return')}
          </Button>
        </Capability>

        {!isClaim && (
          <>
            <Capability action="reroute">
              <Button
                variant="secondary"
                size="md"
                onClick={() => handleOpen('reroute')}
                className="flex items-center gap-2"
              >
                <Route className="h-4 w-4" aria-hidden />
                {t('reroute')}
              </Button>
            </Capability>

            <Capability action="override">
              <Button
                variant="secondary"
                size="md"
                onClick={() => handleOpen('override')}
                className={cn('flex items-center gap-2 border-warning text-warning hover:bg-warning-soft')}
              >
                <ShieldAlert className="h-4 w-4" aria-hidden />
                {t('override')}
              </Button>
            </Capability>
          </>
        )}
      </div>

      {/* Confirmation modal */}
      {activeAction && (
        <Modal
          open
          onClose={handleClose}
          title={modalTitle[activeAction]}
        >
          <div className="flex flex-col gap-4 p-4">
            <FormField
              label={inputLabel[activeAction]}
              required={inputRequired[activeAction]}
            >
              {(controlProps) => (
                <textarea
                  {...controlProps}
                  rows={3}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={inputRequired[activeAction] ? t('required') : t('optional')}
                  className="w-full rounded-[var(--radius-md)] border border-hairline bg-surface px-3 py-2 text-body text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1"
                />
              )}
            </FormField>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" size="md" onClick={handleClose} disabled={submitting}>
                {t('cancel')}
              </Button>
              <Button
                variant={activeAction === 'approve' ? 'primary' : 'danger'}
                size="md"
                onClick={handleConfirm}
                disabled={!canSubmit || submitting}
              >
                {submitting ? t('submitting') : t('confirm')}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
