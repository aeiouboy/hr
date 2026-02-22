'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
    <div className={cn(depth > 0 && 'ml-6 border-l pl-4')}>
      <div className="flex items-center gap-2 py-2">
        {hasChildren ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-0.5 rounded hover:bg-gray-100 transition"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </button>
        ) : (
          <span className="w-5" />
        )}

        <a
          href={`/profile?id=${node.id}`}
          className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 -mx-1 transition"
        >
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
            {node.avatar ? (
              <img
                src={node.avatar}
                alt={node.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <User className="h-4 w-4 text-gray-400" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-cg-dark">{node.name}</p>
            <p className="text-xs text-gray-400">{node.position}</p>
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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>{t('teamStructure')}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : root ? (
          <OrgNodeItem node={root} />
        ) : (
          <p className="text-sm text-gray-400 py-4 text-center">No data</p>
        )}
      </CardContent>
    </Card>
  );
}
