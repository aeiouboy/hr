import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type DemoValuesDisclaimerProps = React.HTMLAttributes<HTMLDivElement> & {
  compact?: boolean;
};

export function DemoValuesDisclaimer({ compact = false, className, ...props }: DemoValuesDisclaimerProps) {
  return (
    <div
      role="note"
      aria-label="Demo values disclaimer"
      className={cn(
        'flex items-start gap-3 rounded-[var(--radius-md)] border border-hairline bg-canvas-soft text-ink-soft',
        compact ? 'px-3 py-2 text-small' : 'px-4 py-3 text-small shadow-[var(--shadow-sm)]',
        className,
      )}
      {...props}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
      <p>
        <span className="font-semibold text-ink">ข้อมูลที่แสดงเป็นตัวอย่างสำหรับการนำเสนอ</span>
        {' '}· Sample data shown for demonstration.
      </p>
    </div>
  );
}
