'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/humi';

interface SectionCardProps {
 title: string;
 icon?: React.ReactNode;
 children: React.ReactNode;
 collapsible?: boolean;
 defaultOpen?: boolean;
 action?: React.ReactNode;
}

export function SectionCard({
 title,
 icon,
 children,
 collapsible = false,
 defaultOpen = true,
 action,
}: SectionCardProps) {
 const [open, setOpen] = useState(defaultOpen);

 return (
 <Card
  header={
   <div
    className={cn('flex items-center justify-between w-full', collapsible && 'cursor-pointer')}
    onClick={collapsible ? () => setOpen(!open) : undefined}
   >
    <div className="flex items-center gap-3">
     {icon && <span className="text-ink-muted">{icon}</span>}
     <h3 className="text-base font-semibold text-ink">{title}</h3>
    </div>
    <div className="flex items-center gap-2">
     {action && <div onClick={(e) => e.stopPropagation()}>{action}</div>}
     {collapsible && (
      open ? <ChevronUp className="h-5 w-5 text-ink-muted" /> : <ChevronDown className="h-5 w-5 text-ink-muted" />
     )}
    </div>
   </div>
  }
 >
  {open && <div className="px-6 pb-6">{children}</div>}
 </Card>
 );
}
