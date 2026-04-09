import { cn } from '@/lib/utils';

// Precision Cool Card — @theme tokens only, no hardcoded dark: overrides.
// Radius locked at 6px (rounded-md). Elevation via hairline border, not shadow.
// Tone/size axes deliberately deferred — MK2 lint rule lands in follow-up.
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-md border border-hairline bg-surface',
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col gap-1.5 p-6', className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'text-base font-semibold leading-tight tracking-tight text-ink',
        className
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center p-6 pt-0 border-t border-hairline',
        className
      )}
      {...props}
    />
  );
}
