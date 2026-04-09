import { cn } from '@/lib/utils';

type StatTone ='default' |'cobalt' |'success' |'warning' |'danger';

interface StatChipProps {
 label: string;
 value: React.ReactNode;
 trend?: string;
 tone?: StatTone;
 className?: string;
}

const TONE_CLASSES: Record<StatTone, string> = {
 default:'bg-surface-raised text-ink',
 cobalt:'bg-accent-tint text-accent',
 success:'bg-success-tint text-success',
 warning:'bg-warning-tint text-warning',
 danger:'bg-danger-tint text-danger',
};

export function StatChip({ label, value, trend, tone ='default', className }: StatChipProps) {
 return (
 <div className={cn(
'inline-flex items-center gap-2 rounded-md px-3 py-1.5',
 TONE_CLASSES[tone],
 className,
 )}>
 <span className="text-xs text-ink-muted">{label}</span>
 <span className="text-sm font-semibold font-mono tabular-nums">{value}</span>
 {trend && (
 <span className="text-xs text-ink-muted">{trend}</span>
 )}
 </div>
 );
}
