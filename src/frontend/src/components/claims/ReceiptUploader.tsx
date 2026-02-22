'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Upload, FileText, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ReceiptUploaderProps {
  onFileSelected: (file: File) => void;
  onProcess: () => void;
  file: File | null;
  processing: boolean;
  onClear: () => void;
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export function ReceiptUploader({ onFileSelected, onProcess, file, processing, onClear }: ReceiptUploaderProps) {
  const t = useTranslations('smartClaims.upload');
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSet = useCallback((f: File) => {
    setError(null);
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError('Invalid file type. Accepted: JPG, PNG, PDF');
      return;
    }
    if (f.size > MAX_SIZE) {
      setError('File too large. Maximum: 10MB');
      return;
    }
    if (f.type.startsWith('image/')) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
    onFileSelected(f);
  }, [onFileSelected]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) validateAndSet(f);
  }, [validateAndSet]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragOver(false), []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) validateAndSet(f);
  }, [validateAndSet]);

  const handleClear = useCallback(() => {
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
    onClear();
  }, [onClear]);

  const isPdf = file?.type === 'application/pdf';

  return (
    <div className="space-y-4">
      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
          aria-label={t('dragDrop')}
          className={cn(
            'flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-colors',
            dragOver ? 'border-cg-red bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
          )}
        >
          <Upload className={cn('h-10 w-10', dragOver ? 'text-cg-red' : 'text-gray-400')} />
          <p className="text-sm font-medium text-gray-700">{t('dragDrop')}</p>
          <p className="text-xs text-gray-500">{t('orBrowse')}</p>
          <p className="text-xs text-gray-400">{t('acceptedFormats')} &middot; {t('maxSize')}</p>
        </div>
      ) : (
        <div className="rounded-xl border bg-white p-4">
          <div className="flex items-start gap-4">
            {/* Preview */}
            <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
              {preview ? (
                <img src={preview} alt="Receipt preview" className="w-full h-full object-cover" />
              ) : isPdf ? (
                <FileText className="h-8 w-8 text-red-500" />
              ) : (
                <ImageIcon className="h-8 w-8 text-gray-400" />
              )}
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            {/* Remove */}
            <button
              onClick={handleClear}
              className="rounded-lg p-1.5 hover:bg-gray-100 transition-colors"
              aria-label="Remove file"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleFileInput}
        className="hidden"
        aria-hidden="true"
      />

      {error && <p className="text-sm text-cg-error">{error}</p>}

      {file && (
        <Button onClick={onProcess} disabled={processing} className="w-full sm:w-auto">
          {processing ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Processing...
            </>
          ) : (
            t('processReceipt')
          )}
        </Button>
      )}
    </div>
  );
}
