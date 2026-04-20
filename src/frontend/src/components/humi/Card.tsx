import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ════════════════════════════════════════════════════════════
// Humi Card — surface card with optional header / footer slots.
// Raised = shadow elevation on cream canvas.
// Flat  = hairline border, used for nested / inline cards.
// Tokens only. Radius via --radius-md (14px) / --radius-lg (20px).
// ════════════════════════════════════════════════════════════

const cardVariants = cva(
  ['bg-surface text-ink', 'transition-shadow duration-[var(--dur-base)] ease-[var(--ease-spring)]'].join(' '),
  {
    variants: {
      variant: {
        raised: 'shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-md)]',
        flat: 'border border-hairline shadow-none',
      },
      size: {
        md: 'rounded-[var(--radius-md)]',
        lg: 'rounded-[var(--radius-lg)]',
      },
      tone: {
        surface: 'bg-surface',
        canvas: 'bg-canvas-soft',
        accent: 'bg-accent-soft',
      },
    },
    defaultVariants: {
      variant: 'raised',
      size: 'md',
      tone: 'surface',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Optional header slot rendered above children with hairline divider */
  header?: React.ReactNode;
  /** Optional footer slot rendered below children with hairline divider */
  footer?: React.ReactNode;
  /** Remove inner padding (for DataTable / media-filled cards) */
  flush?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, tone, header, footer, flush = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size, tone }), className)}
        {...props}
      >
        {header && (
          <div className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-4">
            {header}
          </div>
        )}
        <div className={cn(!flush && 'p-5')}>{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-hairline px-5 py-3">
            {footer}
          </div>
        )}
      </div>
    );
  }
);
Card.displayName = 'HumiCard';

/** Card title helper — display-h3 via CPN Condensed. */
export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'font-display text-[length:var(--text-display-h3)] leading-[var(--text-display-h3--line-height)]',
        'font-semibold tracking-tight text-ink',
        className
      )}
      {...props}
    />
  );
}

/** Eyebrow label — 11px uppercase, for section headers inside cards. */
export function CardEyebrow({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'text-[length:var(--text-eyebrow)] leading-[var(--text-eyebrow--line-height)]',
        'font-semibold uppercase tracking-[0.14em] text-ink-muted',
        className
      )}
      {...props}
    />
  );
}

export { cardVariants };
