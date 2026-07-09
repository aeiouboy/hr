import { Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

type EmptyKind ='unknown' |'not-applicable' |'restricted' |'pending';

interface EmptyValueProps {
 kind?: EmptyKind;
 className?: string;
}

const KIND_KEY: Record<EmptyKind, string> = {
 unknown: 'emptyValue.unknown',
'not-applicable': 'emptyValue.notApplicable',
 restricted: 'emptyValue.restricted',
 pending: 'emptyValue.pending',
};

export function EmptyValue({ kind ='unknown', className }: EmptyValueProps) {
 const t = useTranslations();
 const label = t(KIND_KEY[kind]);

 if (kind ==='restricted') {
 return (
 <span className={cn('inline-flex items-center gap-1 text-sm italic text-ink-muted', className)}>
 <Lock className="h-3 w-3" />
 <span>{label}</span>
 </span>
 );
 }

 if (kind ==='pending') {
 return (
 <span className={cn(
'inline-flex items-center text-sm italic',
'text-warning bg-warning-tint px-1.5 py-0.5 rounded-md',
 className,
 )}>
 {label}
 </span>
 );
 }

 return (
 <span className={cn('text-sm italic text-ink-muted', className)}>
 {label}
 </span>
 );
}
