'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/humi';

interface FieldGroupProps {
 title: string;
 icon?: React.ReactNode;
 children: React.ReactNode;
 /** Number of columns for the field grid (default 2) */
 columns?: 1 | 2 | 3;
 collapsible?: boolean;
 defaultOpen?: boolean;
 /** Action slot (e.g. Edit button) — top right */
 action?: React.ReactNode;
 className?: string;
}

export function FieldGroup({
 title,
 icon,
 children,
 columns = 2,
 collapsible = false,
 defaultOpen = true,
 action,
 className,
}: FieldGroupProps) {
 const [open, setOpen] = useState(defaultOpen);

 const colClass =
 columns === 3 ?'md:grid-cols-3' :
 columns === 1 ?'grid-cols-1' :
'md:grid-cols-2';

 return (
 <Card className={cn('overflow-hidden', className)}>
 {/* Header — 2px cobalt left hairline per mk7 spec */}
 <div
 className={cn(
'flex items-center justify-between px-6 py-4',
'border-l-2 border-accent',
 collapsible &&'cursor-pointer select-none hover:bg-surface-raised transition-colors',
 )}
 onClick={collapsible ? () => setOpen(!open) : undefined}
 >
 <div className="flex items-center gap-2">
 {icon && <span className="text-ink-muted">{icon}</span>}
 <h3 className="text-sm font-semibold text-ink">{title}</h3>
 </div>
 <div className="flex items-center gap-2">
 {action && <div onClick={(e) => e.stopPropagation()}>{action}</div>}
 {collapsible && (
 <ChevronDown
 className={cn(
'h-4 w-4 text-ink-muted transition-transform',
 open &&'rotate-180',
 )}
 />
 )}
 </div>
 </div>

 {/* Content — grid of Field children */}
 {open && (
 <div className={cn(
'grid gap-x-8 gap-y-0 px-6 pb-4',
 colClass,
 )}>
 {children}
 </div>
 )}
 </Card>
 );
}
