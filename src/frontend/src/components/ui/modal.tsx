'use client';

import { useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, footer, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 m-0 h-full w-full max-h-full max-w-full bg-transparent backdrop:bg-black/50"
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={contentRef}
          className={cn('relative w-full max-w-lg rounded-xl bg-white shadow-xl', className)}
        >
          {title && (
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-semibold text-cg-dark">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1 hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          )}
          <div className="p-6">{children}</div>
          {footer && <div className="border-t px-6 py-4">{footer}</div>}
        </div>
      </div>
    </dialog>
  );
}
