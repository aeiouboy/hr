'use client';

import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FormField } from '@/components/ui/form-field';
import type { OcrResult } from '@/hooks/use-claims';

interface OCRResultCardProps {
  ocrResult: OcrResult;
  editedValues: {
    merchant: string;
    amount: string;
    date: string;
    category: string;
  };
  onEdit: (field: string, value: string) => void;
  categoryOptions: { value: string; label: string }[];
}

function getConfidenceVariant(confidence: number): 'success' | 'warning' | 'error' {
  if (confidence >= 0.8) return 'success';
  if (confidence >= 0.6) return 'warning';
  return 'error';
}

export function OCRResultCard({ ocrResult, editedValues, onEdit, categoryOptions }: OCRResultCardProps) {
  const t = useTranslations('smartClaims.ocr');
  const variant = getConfidenceVariant(ocrResult.confidence);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t('title') ?? 'OCR Results'}</CardTitle>
          <Badge variant={variant}>
            {t('confidence')}: {Math.round(ocrResult.confidence * 100)}%
          </Badge>
        </div>
        {ocrResult.confidence < 0.8 && (
          <p className="text-sm text-yellow-700 bg-yellow-50 rounded-lg px-3 py-2 mt-2">
            {t('lowConfidence')}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label={t('vendor')}
            name="merchant"
            value={editedValues.merchant}
            onChange={(v) => onEdit('merchant', v)}
          />
          <FormField
            label={t('amount')}
            name="amount"
            value={editedValues.amount}
            onChange={(v) => onEdit('amount', v)}
          />
          <FormField
            label={t('date')}
            name="date"
            type="date"
            value={editedValues.date}
            onChange={(v) => onEdit('date', v)}
          />
          <FormField
            label={t('category')}
            name="category"
            type="select"
            value={editedValues.category}
            onChange={(v) => onEdit('category', v)}
            options={categoryOptions}
          />
        </div>
      </CardContent>
    </Card>
  );
}
