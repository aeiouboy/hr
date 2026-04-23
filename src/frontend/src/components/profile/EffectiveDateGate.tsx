'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

interface EffectiveDateGateProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (effectiveDate: Date, formValues: unknown) => void;
  sectionTitle: string;
  children: (effectiveDate: Date) => React.ReactNode;
}

type Step = 'date' | 'form';

function toDateInputValue(d: Date): string {
  // YYYY-MM-DD in local timezone
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function EffectiveDateGate({
  open,
  onClose,
  onConfirm,
  sectionTitle,
  children,
}: EffectiveDateGateProps) {
  const t = useTranslations();
  const [step, setStep] = useState<Step>('date');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');

  const today = toDateInputValue(new Date());

  const isValidDate = useCallback((): boolean => {
    if (!selectedDate) return false;
    return selectedDate >= today;
  }, [selectedDate, today]);

  const handleClose = useCallback(() => {
    // Reset internal state on close
    setStep('date');
    setSelectedDate('');
    setDateError('');
    onClose();
  }, [onClose]);

  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSelectedDate(val);
    if (val && val < today) {
      setDateError(t('gate.invalidDate'));
    } else {
      setDateError('');
    }
  }, [today, t]);

  const handleContinue = useCallback(() => {
    if (!isValidDate()) return;
    setStep('form');
  }, [isValidDate]);

  const handleBack = useCallback(() => {
    setStep('date');
  }, []);

  const handleSave = useCallback(() => {
    if (!isValidDate()) return;
    const effectiveDate = new Date(selectedDate + 'T00:00:00');
    onConfirm(effectiveDate, {});
    // Reset after confirm
    setStep('date');
    setSelectedDate('');
    setDateError('');
  }, [isValidDate, selectedDate, onConfirm]);

  const effectiveDateObj = selectedDate ? new Date(selectedDate + 'T00:00:00') : null;

  const footerStep1 = (
    <div className="flex justify-end gap-3">
      <Button variant="outline" onClick={handleClose}>
        {t('gate.cancel')}
      </Button>
      <Button
        variant="default"
        onClick={handleContinue}
        disabled={!isValidDate()}
        aria-disabled={!isValidDate()}
      >
        {t('gate.continue')}
      </Button>
    </div>
  );

  const footerStep2 = (
    <div className="flex justify-between gap-3">
      <Button variant="ghost" onClick={handleBack}>
        {t('gate.back')}
      </Button>
      <div className="flex gap-3">
        <Button variant="outline" onClick={handleClose}>
          {t('gate.cancel')}
        </Button>
        <Button variant="default" onClick={handleSave}>
          {t('gate.save')}
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      footer={step === 'date' ? footerStep1 : footerStep2}
    >
      {step === 'date' && (
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-ink">{sectionTitle}</h2>
          <div className="space-y-2">
            <label
              htmlFor="effective-date-input"
              className="block text-sm font-medium text-ink"
            >
              {t('gate.title')}
            </label>
            <input
              id="effective-date-input"
              type="date"
              min={today}
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full rounded-md border border-hairline bg-surface px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
            />
            {dateError && (
              <p role="alert" className="text-xs text-danger mt-1">
                {dateError}
              </p>
            )}
          </div>
        </div>
      )}

      {step === 'form' && effectiveDateObj && (
        <div className="space-y-4">
          {children(effectiveDateObj)}
        </div>
      )}
    </Modal>
  );
}
