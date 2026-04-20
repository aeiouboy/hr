'use client';

import { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

// ════════════════════════════════════════════════════════════
// Humi Toggle — iOS-style switch with Thai-first label block.
// - Real <button role="switch" aria-checked>. ไม่ใช้ <div>.
// - teal (--color-accent) = on, cream-raised (--color-surface-raised) = off.
// - Track 36×20, thumb 16×16 บน cream surface.
// - Keyboard: Space/Enter toggles (native button behaviour).
// - focus-visible ring บน teal ตาม Humi primitives.
// ════════════════════════════════════════════════════════════

export interface ToggleProps {
  /** Controlled state. */
  checked: boolean;
  /** Called with the *new* value when toggled. */
  onChange: (next: boolean) => void;
  /** Disable interaction. */
  disabled?: boolean;
  /** Label rendered beside the switch (clickable). */
  label?: React.ReactNode;
  /** Optional secondary description under the label. */
  description?: React.ReactNode;
  /** When `label` is absent, callers must pass this for a11y. */
  ariaLabel?: string;
  /** Extra class on the outer row. */
  className?: string;
  /** Extra class on the switch button. */
  switchClassName?: string;
  /** Optional id — auto-generated if omitted. */
  id?: string;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      checked,
      onChange,
      disabled = false,
      label,
      description,
      ariaLabel,
      className,
      switchClassName,
      id: idProp,
    },
    ref
  ) => {
    const autoId = useId();
    const id = idProp ?? `humi-toggle-${autoId}`;
    const descId = description ? `${id}-desc` : undefined;

    const handleToggle = () => {
      if (disabled) return;
      onChange(!checked);
    };

    const switchEl = (
      <button
        ref={ref}
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        aria-label={label ? undefined : ariaLabel}
        aria-describedby={descId}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full',
          'border border-transparent cursor-pointer',
          'transition-[background-color,box-shadow] duration-[var(--dur-base)]',
          'ease-[var(--ease-spring)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          'focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
          'disabled:cursor-not-allowed disabled:opacity-50',
          checked ? 'bg-accent' : 'bg-surface-raised border-hairline',
          switchClassName
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none inline-block h-4 w-4 rounded-full',
            'bg-surface shadow-[var(--shadow-sm)]',
            'transition-transform duration-[var(--dur-base)] ease-[var(--ease-spring)]',
            checked ? 'translate-x-4' : 'translate-x-0.5'
          )}
        />
      </button>
    );

    if (!label && !description) {
      return <span className={cn('inline-flex', className)}>{switchEl}</span>;
    }

    return (
      <div
        className={cn(
          'flex items-start justify-between gap-4 py-2',
          className
        )}
      >
        <div className="flex-1 min-w-0 pr-2">
          {label && (
            <label
              htmlFor={id}
              className="block text-body font-medium text-ink cursor-pointer"
            >
              {label}
            </label>
          )}
          {description && (
            <p
              id={descId}
              className="mt-0.5 text-small text-ink-muted leading-[var(--text-small--line-height)]"
            >
              {description}
            </p>
          )}
        </div>
        {switchEl}
      </div>
    );
  }
);
Toggle.displayName = 'HumiToggle';
