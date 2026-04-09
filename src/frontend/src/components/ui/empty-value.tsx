import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

type EmptyKind ='unknown' |'not-applicable' |'restricted' |'pending';

interface EmptyValueProps {
 kind?: EmptyKind;
 className?: string;
}

const EMPTY_COPY: Record<EmptyKind, { th: string; en: string }> = {
 unknown: { th:'ยังไม่ได้ระบุ', en:'Not provided' },
'not-applicable': { th:'ไม่มี', en:'N/A' },
 restricted: { th:'ข้อมูลจำกัดสิทธิ์', en:'Restricted' },
 pending: { th:'รอการอนุมัติ', en:'Pending approval' },
};

export function EmptyValue({ kind ='unknown', className }: EmptyValueProps) {
 const copy = EMPTY_COPY[kind];

 if (kind ==='restricted') {
 return (
 <span className={cn('inline-flex items-center gap-1 text-sm italic text-ink-muted', className)}>
 <Lock className="h-3 w-3" />
 <span>{copy.th}</span>
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
 {copy.th}
 </span>
 );
 }

 return (
 <span className={cn('text-sm italic text-ink-muted', className)}>
 {copy.th}
 </span>
 );
}
