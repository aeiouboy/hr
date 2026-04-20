import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// ════════════════════════════════════════════════════════════
// Humi Button — primary / secondary / ghost / danger
// Tokens only. focus-visible ring uses --color-accent (teal).
// Danger = pumpkin (orange-leaning) per NO-RED guardrail.
// ════════════════════════════════════════════════════════════

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-md font-medium',
    'font-sans transition-[background,border,box-shadow,color] duration-[var(--dur-fast)]',
    'ease-[var(--ease-spring)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'focus-visible:ring-accent focus-visible:ring-offset-canvas',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none whitespace-nowrap',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-accent text-white',
          'shadow-sm hover:shadow-md',
          'hover:bg-[color-mix(in_oklab,var(--color-accent)_92%,black)]',
          'active:bg-[color-mix(in_oklab,var(--color-accent)_85%,black)]',
        ].join(' '),
        secondary: [
          'bg-transparent text-accent border border-accent',
          'hover:bg-accent-soft',
          'active:bg-[color-mix(in_oklab,var(--color-accent-soft)_85%,var(--color-accent))]',
        ].join(' '),
        ghost: [
          'bg-transparent text-accent border border-transparent',
          'hover:bg-accent-soft/70',
          'active:bg-accent-soft',
        ].join(' '),
        danger: [
          'bg-danger text-white',
          'shadow-sm hover:shadow-md',
          'hover:bg-[color-mix(in_oklab,var(--color-danger)_92%,black)]',
          'active:bg-[color-mix(in_oklab,var(--color-danger)_85%,black)]',
        ].join(' '),
      },
      size: {
        sm: 'h-8 px-3 text-small',
        md: 'h-10 px-4 text-body',
        lg: 'h-12 px-6 text-body',
      },
      block: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      block: false,
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof buttonVariants> {
  /** Shows spinner + disables click. Preserves label width to avoid layout shift. */
  loading?: boolean;
  /** Standard HTML disabled; combined with `loading` for visual state. */
  disabled?: boolean;
  /** Optional leading icon (rendered before children). Hidden when loading. */
  leadingIcon?: React.ReactNode;
  /** Optional trailing icon (rendered after children). Hidden when loading. */
  trailingIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      block,
      loading = false,
      disabled = false,
      leadingIcon,
      trailingIcon,
      children,
      type,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    return (
      <button
        ref={ref}
        type={type ?? 'button'}
        className={cn(buttonVariants({ variant, size, block }), className)}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <Loader2
            className="h-[1em] w-[1em] animate-spin"
            aria-hidden="true"
          />
        ) : (
          leadingIcon && (
            <span className="inline-flex shrink-0" aria-hidden="true">
              {leadingIcon}
            </span>
          )
        )}
        <span className={cn(loading && 'opacity-90')}>{children}</span>
        {!loading && trailingIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </button>
    );
  }
);
Button.displayName = 'HumiButton';

export { buttonVariants };
