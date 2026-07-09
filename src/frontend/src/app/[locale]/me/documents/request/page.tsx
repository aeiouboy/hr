'use client';

// ════════════════════════════════════════════════════════════
// /me/documents/request — Employee document request form
// Employee submits → HR Admin queue (no manager step)
// ════════════════════════════════════════════════════════════

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { FileText, Mail, Printer, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/humi';
import { useToast } from '@/components/humi/molecules/toast';
import { DOCUMENT_TEMPLATES, type DeliveryMode, type DocumentTemplate } from '@/data/documents/templates';
import { DOCUMENT_STORYBOARD_BOUNDARY_EN, DOCUMENT_STORYBOARD_BOUNDARY_TH } from '@/lib/document-boundary';

type Step = 'template' | 'details';

export default function DocumentRequestPage() {
  const locale = useLocale();
  const t = useTranslations('doc_request');
  const router = useRouter();
  const { toast } = useToast();

  const [step, setStep] = useState<Step>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [purpose, setPurpose] = useState('');
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('email');
  const [submitting, setSubmitting] = useState(false);

  function handleSelectTemplate(tpl: DocumentTemplate) {
    setSelectedTemplate(tpl);
    setDeliveryMode(tpl.defaultDeliveryMode);
    setStep('details');
  }

  function handleBack() {
    setStep('template');
    setSelectedTemplate(null);
    setPurpose('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedTemplate) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    toast('success', t('submitSuccess'));
    router.push(`/${locale}/ess/workflows`);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Breadcrumb */}
      <nav aria-label={t('breadcrumbLabel')} className="mb-6 flex items-center gap-1 text-small text-ink-muted">
        <Link href={`/${locale}/me/documents`} className="hover:text-ink transition-colors">
          {t('breadcrumbDocs')}
        </Link>
        <ChevronRight size={14} aria-hidden />
        <span className="text-ink">{t('breadcrumbRequest')}</span>
      </nav>

      <header className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink mb-1.5">
          {t('title')}
        </h1>
        <p className="text-sm text-ink-muted">{t('subtitle')}</p>
        <p className="mt-2 text-small text-ink-muted" data-testid="document-boundary-notice">
          {locale === 'th' ? DOCUMENT_STORYBOARD_BOUNDARY_TH : DOCUMENT_STORYBOARD_BOUNDARY_EN}
        </p>
      </header>

      {step === 'template' && (
        <section aria-label={t('pickTemplate')}>
          <h2 className="text-small font-semibold uppercase tracking-[0.1em] text-ink-muted mb-4">
            {t('pickTemplate')}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {DOCUMENT_TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => handleSelectTemplate(tpl)}
                data-testid={`template-${tpl.id}`}
                className="humi-card text-left transition-shadow hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
                style={{ padding: 16 }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="flex shrink-0 items-center justify-center rounded-md"
                    style={{
                      width: 36,
                      height: 36,
                      background: 'var(--color-accent-soft)',
                      color: 'var(--color-accent)',
                    }}
                    aria-hidden
                  >
                    <FileText size={18} />
                  </span>
                  <div>
                    <div className="text-body font-semibold text-ink leading-snug">
                      {locale === 'th' ? tpl.nameTh : tpl.nameEn}
                    </div>
                    <div className="text-small text-ink-muted mt-0.5 leading-snug">
                      {locale === 'th' ? tpl.descriptionTh : tpl.descriptionEn}
                    </div>
                    <div className="mt-1.5 text-xs text-ink-faint">
                      {t('sla', { days: tpl.sla })}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 'details' && selectedTemplate && (
        <form onSubmit={handleSubmit} noValidate>
          {/* Selected template summary */}
          <div
            className="humi-card humi-card--cream mb-6"
            style={{ padding: 14 }}
            data-testid="selected-template-summary"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex shrink-0 items-center justify-center rounded-md"
                style={{
                  width: 34,
                  height: 34,
                  background: 'var(--color-accent-soft)',
                  color: 'var(--color-accent)',
                }}
                aria-hidden
              >
                <FileText size={16} />
              </span>
              <div>
                <div className="text-body font-semibold text-ink">
                  {locale === 'th' ? selectedTemplate.nameTh : selectedTemplate.nameEn}
                </div>
                <div className="text-small text-ink-muted">
                  {t('sla', { days: selectedTemplate.sla })}
                </div>
              </div>
              <button
                type="button"
                onClick={handleBack}
                className="ml-auto text-small text-accent hover:underline"
                data-testid="change-template-btn"
              >
                {t('changeTemplate')}
              </button>
            </div>
          </div>

          {/* Purpose textarea */}
          <div className="mb-5">
            <label
              htmlFor="doc-purpose"
              className="mb-1.5 block text-small font-medium text-ink"
            >
              {t('purposeLabel')}
              <span className="ml-1 text-danger" aria-hidden>*</span>
            </label>
            <textarea
              id="doc-purpose"
              data-testid="purpose-textarea"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
              rows={3}
              placeholder={t('purposePlaceholder')}
              className="w-full rounded-md border border-hairline bg-surface px-3 py-2 text-body text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-none"
            />
          </div>

          {/* Delivery mode picker */}
          <fieldset className="mb-8">
            <legend className="mb-2 text-small font-medium text-ink">
              {t('deliveryLabel')}
            </legend>
            <div className="flex flex-col gap-2 sm:flex-row">
              {(
                [
                  { value: 'email' as DeliveryMode, icon: Mail, labelKey: 'deliveryEmail' },
                  { value: 'print_pickup' as DeliveryMode, icon: Printer, labelKey: 'deliveryPrint' },
                ] as const
              ).map(({ value, icon: Icon, labelKey }) => (
                <label
                  key={value}
                  data-testid={`delivery-${value}`}
                  className={`flex flex-1 cursor-pointer items-center gap-3 rounded-md border px-4 py-3 transition-colors ${
                    deliveryMode === value
                      ? 'border-accent bg-accent-soft text-accent'
                      : 'border-hairline bg-surface text-ink hover:bg-canvas-soft'
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery-mode"
                    value={value}
                    checked={deliveryMode === value}
                    onChange={() => setDeliveryMode(value)}
                    className="sr-only"
                  />
                  <Icon size={18} aria-hidden />
                  <span className="text-small font-medium">{t(labelKey)}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3">
            <Button variant="ghost" type="button" onClick={handleBack}>
              {t('back')}
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={!purpose.trim() || submitting}
              data-testid="submit-btn"
            >
              {submitting ? t('submitting') : t('submit')}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
