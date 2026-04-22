'use client';

// ════════════════════════════════════════════════════════════
// FileUploadField — drag-drop + click-to-browse atom.
// - Accept: .pdf / .jpg / .jpeg / .png (mime whitelist enforced)
// - Max 5MB per file (configurable via maxSizeMB prop)
// - Preview: icon + filename (truncated) + size in KB + remove button
// - Converts file → base64 via native FileReader (no extra deps)
// - Calls addAttachment() from Zustand store; fires onUpload(id) callback
// - Accessible: labelled <input type="file">, aria-live upload status
// - Tokens: --color-canvas-soft / --color-hairline / --color-ink-muted (Humi)
// - Rule 26b: NO global * reset — Tailwind preflight only
// ════════════════════════════════════════════════════════════

import { useCallback, useId, useRef, useState } from 'react';
import { FileText, ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHumiProfileStore } from '@/stores/humi-profile-slice';

// ── Allowed MIME types (mirrors accept attribute) ──────────────────────────

const ALLOWED_MIME: readonly string[] = [
  'application/pdf',
  'image/jpeg',
  'image/png',
];

const ALLOWED_EXTENSIONS = '.pdf,.jpg,.jpeg,.png';

// ── Props ──────────────────────────────────────────────────────────────────

export interface FileUploadFieldProps {
  /** Visible label rendered above the drop zone. */
  label?: string;
  /** Helper text shown below the zone when no error. */
  helperText?: string;
  /** Marks field as required (asterisk + aria-required). */
  required?: boolean;
  /** Max file size in MB. Defaults to 5. */
  maxSizeMB?: number;
  /** Called with the generated attachment id after successful upload. */
  onUpload?: (id: string) => void;
  /** Called with the attachment id when the user removes a file. */
  onRemove?: (id: string) => void;
  /** Extra class on the outer wrapper. */
  className?: string;
}

// ── Preview item type (local UI state, not persisted directly) ─────────────

interface PreviewItem {
  id: string;         // attachment id from store
  filename: string;
  sizeKb: number;
  mimeType: string;
}

// ── Component ──────────────────────────────────────────────────────────────

export function FileUploadField({
  label,
  helperText,
  required = false,
  maxSizeMB = 5,
  onUpload,
  onRemove,
  className,
}: FileUploadFieldProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const addAttachment = useHumiProfileStore((s) => s.addAttachment);
  const removeAttachment = useHumiProfileStore((s) => s.removeAttachment);

  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [previews, setPreviews] = useState<PreviewItem[]>([]);

  const maxBytes = maxSizeMB * 1024 * 1024;

  // ── File processing ──────────────────────────────────────

  const processFile = useCallback(
    (file: File) => {
      setError(null);

      // Validate MIME
      if (!ALLOWED_MIME.includes(file.type)) {
        const msg = `ไฟล์ประเภท ${file.type || 'ไม่รู้จัก'} ไม่รองรับ — ใช้ PDF, JPG, หรือ PNG เท่านั้น`;
        setError(msg);
        console.warn('[FileUploadField] rejected mime:', file.type);
        return;
      }

      // Validate size
      if (file.size > maxBytes) {
        const sizeMb = (file.size / 1024 / 1024).toFixed(1);
        const msg = `ไฟล์ขนาด ${sizeMb} MB เกินกว่า ${maxSizeMB} MB ที่อนุญาต`;
        setError(msg);
        console.warn('[FileUploadField] rejected size:', file.size, 'bytes');
        return;
      }

      // Read as DataURL (base64)
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        try {
          const id = addAttachment({
            filename: file.name,
            size: file.size,
            mimeType: file.type,
            base64,
          });

          setPreviews((prev) => [
            ...prev,
            {
              id,
              filename: file.name,
              sizeKb: Math.round(file.size / 1024),
              mimeType: file.type,
            },
          ]);

          setStatusMessage(`อัปโหลด ${file.name} สำเร็จ`);
          onUpload?.(id);
        } catch (err) {
          const msg = 'เกิดข้อผิดพลาดในการบันทึกไฟล์ — กรุณาลองใหม่';
          setError(msg);
          console.warn('[FileUploadField] addAttachment error:', err);
        }
      };

      reader.onerror = () => {
        const msg = 'ไม่สามารถอ่านไฟล์ได้ — กรุณาลองใหม่';
        setError(msg);
        console.warn('[FileUploadField] FileReader error:', reader.error);
      };

      reader.readAsDataURL(file);
    },
    [addAttachment, maxBytes, maxSizeMB, onUpload]
  );

  // ── Input change handler ──────────────────────────────────

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach(processFile);
    // reset input so same file can be re-selected after removal
    e.target.value = '';
  };

  // ── Drag events ───────────────────────────────────────────

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach(processFile);
  };

  // ── Remove handler ────────────────────────────────────────

  const handleRemove = (id: string) => {
    removeAttachment(id);
    setPreviews((prev) => prev.filter((p) => p.id !== id));
    setStatusMessage('ลบไฟล์แล้ว');
    onRemove?.(id);
  };

  // ── Render ────────────────────────────────────────────────

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="text-small font-medium text-ink leading-[var(--text-small--line-height)]"
        >
          {label}
          {required && (
            <span aria-hidden className="ml-1 text-danger">
              *
            </span>
          )}
        </label>
      )}

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        aria-label={label ?? 'อัปโหลดไฟล์'}
        aria-required={required || undefined}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'flex flex-col items-center justify-center gap-2 rounded-lg cursor-pointer',
          'border-2 border-dashed px-4 py-6',
          'bg-[var(--color-canvas-soft)] text-[var(--color-ink-muted)]',
          'transition-[border-color,background-color] duration-[var(--dur-fast)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
          isDragOver
            ? 'border-accent bg-accent-soft/30'
            : 'border-[var(--color-hairline)] hover:border-accent hover:bg-accent-soft/20'
        )}
      >
        <FileText size={24} aria-hidden className="text-[var(--color-ink-muted)]" />
        <p className="text-small text-center">
          ลากไฟล์มาวางที่นี่ หรือ{' '}
          <span className="font-medium text-accent underline underline-offset-2">
            คลิกเพื่อเลือกไฟล์
          </span>
        </p>
        <p className="text-small text-[var(--color-ink-muted)]">
          PDF, JPG, PNG — สูงสุด {maxSizeMB} MB
        </p>
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={ALLOWED_EXTENSIONS}
        multiple
        aria-required={required || undefined}
        className="sr-only"
        onChange={handleInputChange}
      />

      {/* aria-live region for screen readers */}
      <p aria-live="polite" className="sr-only">
        {statusMessage}
      </p>

      {/* Error message */}
      {error && (
        <p
          role="alert"
          className="text-small font-medium text-[color:var(--color-danger-ink)]"
        >
          {error}
        </p>
      )}

      {/* Helper text (shown when no error) */}
      {!error && helperText && (
        <p className="text-small text-[var(--color-ink-muted)]">{helperText}</p>
      )}

      {/* Preview list */}
      {previews.length > 0 && (
        <ul className="flex flex-col gap-2 mt-1" aria-label="ไฟล์ที่อัปโหลดแล้ว">
          {previews.map((item) => (
            <li
              key={item.id}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2',
                'border border-[var(--color-hairline)] bg-surface'
              )}
            >
              {/* File type icon */}
              <span className="shrink-0 text-[var(--color-ink-muted)]" aria-hidden>
                {item.mimeType.startsWith('image/') ? (
                  <ImageIcon size={16} />
                ) : (
                  <FileText size={16} />
                )}
              </span>

              {/* Filename + size */}
              <span className="flex-1 min-w-0">
                <span
                  className="block text-small font-medium text-ink truncate"
                  title={item.filename}
                >
                  {item.filename}
                </span>
                <span className="block text-small text-[var(--color-ink-muted)]">
                  {item.sizeKb} KB
                </span>
              </span>

              {/* Remove button */}
              <button
                type="button"
                aria-label={`ลบ ${item.filename}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item.id);
                }}
                className={cn(
                  'shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full',
                  'text-[var(--color-ink-muted)] hover:text-ink hover:bg-[var(--color-canvas-soft)]',
                  'transition-colors duration-[var(--dur-fast)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-surface'
                )}
              >
                <X size={14} aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

FileUploadField.displayName = 'HumiFileUploadField';
