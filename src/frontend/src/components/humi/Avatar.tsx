import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ════════════════════════════════════════════════════════════
// Humi Avatar — initials fallback on teal-soft background.
// 3 sizes (sm/md/lg). Optional src for image. Token-only colors.
// ════════════════════════════════════════════════════════════

const avatarVariants = cva(
  [
    'inline-flex items-center justify-center shrink-0 select-none overflow-hidden',
    'font-display font-semibold tracking-tight',
    'bg-accent-soft text-accent-ink',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-8 w-8 rounded-[10px] text-[12px]',
        md: 'h-12 w-12 rounded-[14px] text-[16px]',
        lg: 'h-[72px] w-[72px] rounded-[18px] text-[24px]',
      },
      tone: {
        teal: 'bg-accent-soft text-accent-ink',
        sage: 'bg-[color:var(--color-sage-soft)] text-ink',
        butter: 'bg-[color:var(--color-butter-soft)] text-ink',
        ink: 'bg-ink text-canvas',
      },
    },
    defaultVariants: {
      size: 'md',
      tone: 'teal',
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  /** Full name — used for initials fallback + alt text. */
  name: string;
  /** Optional photo URL. */
  src?: string;
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p.charAt(0)).join('').toUpperCase();
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, tone, name, src, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(avatarVariants({ size, tone }), className)}
        aria-label={name}
        {...props}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span aria-hidden="true">{initialsOf(name)}</span>
        )}
      </span>
    );
  }
);
Avatar.displayName = 'HumiAvatar';

export { avatarVariants };
