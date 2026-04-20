'use client';

import { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

// ════════════════════════════════════════════════════════════
// Humi FormField — label + input wrapper.
// - Label above, help below, error text in pumpkin (--color-danger-ink)
// - Consistent spacing, focus ring uses --color-accent (teal)
// - Passes a11y wiring: id, aria-describedby, aria-invalid
// ════════════════════════════════════════════════════════════

export interface FormFieldProps {
  /** Field id. Auto-generated if omitted. */
  id?: string;
  /** Visible label. */
  label: React.ReactNode;
  /** Help text rendered below input when no error. */
  help?: React.ReactNode;
  /** Error text. Swaps help when present; sets aria-invalid. */
  error?: React.ReactNode;
  /** Mark field as required (visual asterisk + aria-required on child). */
  required?: boolean;
  /** Optional leading description between label and input. */
  description?: React.ReactNode;
  /**
   * Render prop — called with wiring props `{ id, 'aria-describedby', 'aria-invalid', 'aria-required' }`
   * that MUST be spread on the control (input / select / textarea).
   */
  children: (controlProps: {
    id: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    'aria-required'?: boolean;
  }) => React.ReactNode;
  /** Extra class on the outer wrapper. */
  className?: string;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ id: idProp, label, help, error, required, description, children, className }, ref) => {
    const autoId = useId();
    const id = idProp ?? `humi-field-${autoId}`;
    const helpId = help ? `${id}-help` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const descId = description ? `${id}-desc` : undefined;

    const describedBy =
      [errorId, helpId, descId].filter(Boolean).join(' ') || undefined;

    return (
      <div ref={ref} className={cn('flex flex-col gap-1.5', className)}>
        <label
          htmlFor={id}
          className={cn(
            'text-small leading-[var(--text-small--line-height)]',
            'font-medium text-ink'
          )}
        >
          {label}
          {required && (
            <span aria-hidden className="ml-1 text-danger">
              *
            </span>
          )}
        </label>

        {description && (
          <p id={descId} className="text-small text-ink-muted">
            {description}
          </p>
        )}

        {children({
          id,
          'aria-describedby': describedBy,
          'aria-invalid': error ? true : undefined,
          'aria-required': required || undefined,
        })}

        {error ? (
          <p
            id={errorId}
            role="alert"
            className={cn(
              'text-small leading-[var(--text-small--line-height)]',
              'text-[color:var(--color-danger-ink)] font-medium'
            )}
          >
            {error}
          </p>
        ) : (
          help && (
            <p id={helpId} className="text-small text-ink-muted">
              {help}
            </p>
          )
        )}
      </div>
    );
  }
);
FormField.displayName = 'HumiFormField';

// ────────────────────────────────────────────────────────────
// Convenience input — styled <input> that matches Humi tokens.
// Optional: most callers pass their own control via the render
// prop in <FormField>, but this covers the common case.
// ────────────────────────────────────────────────────────────

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'h-10 w-full rounded-md border bg-surface px-3',
          'text-body text-ink placeholder:text-ink-faint',
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
FormInput.displayName = 'HumiFormInput';
