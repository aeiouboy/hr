// Humi Modal — lightweight dialog overlay.
// Renders via React portal (body). Traps focus, closes on Esc + backdrop click.

'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  /** Max-width class — defaults to 'max-w-lg'. On mobile the dialog is always full-width with mx-4 gutters. */
  widthClass?: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, widthClass = 'max-w-lg', children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        'bg-ink/40 backdrop-blur-sm'
      )}
    >
      <div
        className={cn(
          'relative w-full rounded-[var(--radius-lg)] bg-surface shadow-xl',
          'border border-hairline',
          'mx-4 sm:mx-auto',
          widthClass
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title !== undefined) && (
          <div className="flex items-center justify-between gap-3 border-b border-hairline px-6 py-4">
            <h2 className="font-display text-[length:var(--text-display-h3)] leading-snug font-semibold tracking-tight text-ink">
              {title}
            </h2>
            <button
              type="button"
              aria-label="ปิด"
              onClick={onClose}
              className={cn(
                'inline-flex h-8 w-8 items-center justify-center rounded-full',
                'text-ink-muted hover:text-ink hover:bg-canvas-soft transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface'
              )}
            >
              <X size={16} aria-hidden />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}
