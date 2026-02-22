'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface BulkActionBarProps {
  count: number;
  onApprove: () => void;
  onReject: () => void;
  onClear: () => void;
}

export function BulkActionBar({ count, onApprove, onReject, onClear }: BulkActionBarProps) {
  const t = useTranslations('quickApprove');

  if (count === 0) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-cg-dark">
          {t('bulkBar.selected', { count })}
        </span>

        <div className="flex items-center gap-3">
          <Button
            variant="default"
            size="sm"
            onClick={onApprove}
            className="bg-green-600 hover:bg-green-700 focus-visible:ring-green-600"
          >
            <CheckCircle2 className="h-4 w-4 mr-1.5" />
            {t('bulkBar.approveAll')}
          </Button>
          <Button variant="destructive" size="sm" onClick={onReject}>
            <XCircle className="h-4 w-4 mr-1.5" />
            {t('bulkBar.rejectAll')}
          </Button>
          <button
            onClick={onClear}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <X className="h-3.5 w-3.5" />
            {t('bulkBar.clearSelection')}
          </button>
        </div>
      </div>
    </div>
  );
}
