'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, rows = 3, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          'w-full rounded-md border bg-surface px-3 py-2.5',
          'text-body text-ink placeholder:text-ink-faint',
          'resize-y',
          'transition-[border-color,box-shadow] duration-[var(--dur-fast)]',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas',
          invalid
            ? 'border-danger focus:ring-danger'
            : 'border-hairline focus:border-accent',
          'disabled:bg-canvas-soft disabled:text-ink-muted disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'HumiTextarea';
