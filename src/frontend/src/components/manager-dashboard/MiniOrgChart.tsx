'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardTitle } from '@/components/humi';
import { ChevronDown, ChevronRight, User } from 'lucide-react';
import type { OrgNode } from '@/lib/manager-dashboard-api';
import { cn } from '@/lib/utils';

interface MiniOrgChartProps {
 root: OrgNode | null;
 loading?: boolean;
}

function OrgNodeItem({ node, depth = 0 }: { node: OrgNode; depth?: number }) {
 const [expanded, setExpanded] = useState(depth === 0);
 const hasChildren = node.children && node.children.length > 0;

 return (
    <div className={cn(depth > 0 && 'ml-5 pl-3 border-l border-hairline')}>
 <div className="flex items-center gap-2 py-2">
 {hasChildren ? (
 <button
 onClick={() => setExpanded(!expanded)}
           className="p-0.5 rounded hover:bg-surface-raised transition"
 aria-label={expanded ?'Collapse' :'Expand'}
 >
 {expanded ? (
 <ChevronDown className="h-4 w-4 text-ink-muted" />
 ) : (
 <ChevronRight className="h-4 w-4 text-ink-muted" />
 )}
 </button>
 ) : (
 <span className="w-5" />
 )}

 <a
 href={`/profile?id=${node.id}`}
             className="flex items-center gap-2 hover:bg-surface-raised rounded-md px-2 py-1 transition"
 >
 <div className="w-8 h-8 rounded-full bg-surface-raised flex items-center justify-center shrink-0">
 {node.avatar ? (
 <img
 src={node.avatar}
 alt={node.name}
 className="w-8 h-8 rounded-full object-cover"
 />
 ) : (
 <User className="h-4 w-4 text-ink-muted" />
 )}
 </div>
 <div>
 <p className="text-sm font-medium text-ink">{node.name}</p>
 <p className="text-xs text-ink-muted">{node.position}</p>
 </div>
 </a>
 </div>

 {expanded && hasChildren && (
 <div>
 {node.children!.map((child) => (
 <OrgNodeItem key={child.id} node={child} depth={depth + 1} />
 ))}
 </div>
 )}
 </div>
 );
}

export function MiniOrgChart({ root, loading }: MiniOrgChartProps) {
 const t = useTranslations('managerDashboard');

 return (
 <Card header={<CardTitle>{t('teamStructure')}</CardTitle>}>
 {loading ? (
 <div className="space-y-3">
 {[1, 2, 3].map((i) => (
 <div key={i} className="h-10 bg-surface-raised rounded-md animate-pulse" />
 ))}
 </div>
 ) : root ? (
 <OrgNodeItem node={root} />
 ) : (
 <p className="text-sm text-ink-muted py-4 text-center">No data</p>
 )}
 </Card>
 );
}
