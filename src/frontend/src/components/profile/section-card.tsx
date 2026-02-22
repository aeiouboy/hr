'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <div className="bg-white rounded-xl border shadow-sm">
      <div
        className={cn(
          'flex items-center justify-between px-6 py-4',
          collapsible && 'cursor-pointer hover:bg-gray-50'
        )}
        onClick={collapsible ? () => setOpen(!open) : undefined}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-gray-400">{icon}</span>}
          <h3 className="text-base font-semibold text-cg-dark">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {action && <div onClick={(e) => e.stopPropagation()}>{action}</div>}
          {collapsible && (
            open ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}
