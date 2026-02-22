'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrgNode {
  id: string;
  name: string;
  title: string;
  department?: string;
  photo?: string;
  children?: OrgNode[];
}

interface OrgChartProps {
  supervisor?: OrgNode | null;
  current: OrgNode;
  directReports?: OrgNode[];
  onNodeClick?: (id: string) => void;
}

function NodeCard({
  node,
  highlight = false,
  onClick,
}: {
  node: OrgNode;
  highlight?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 p-3 rounded-lg border transition-all text-left w-full',
        highlight
          ? 'border-cg-red bg-cg-red/5 ring-1 ring-cg-red/20'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      )}
    >
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
        {node.photo ? (
          <img src={node.photo} alt={node.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm font-medium text-gray-500">
            {node.name.substring(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900 truncate">{node.name}</p>
        <p className="text-xs text-gray-500 truncate">{node.title}</p>
        {node.department && (
          <p className="text-xs text-gray-400 truncate">{node.department}</p>
        )}
      </div>
    </button>
  );
}

function CollapsibleReports({
  reports,
  onNodeClick,
}: {
  reports: OrgNode[];
  onNodeClick?: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const t = useTranslations();

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 mb-2"
      >
        {expanded ? (
          <ChevronDown className="h-3.5 w-3.5" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5" />
        )}
        {reports.length} direct report{reports.length !== 1 ? 's' : ''}
      </button>
      {expanded && (
        <div className="flex flex-wrap justify-center gap-3 w-full">
          {reports.map((dr) => (
            <div key={dr.id} className="w-full max-w-[220px]">
              <NodeCard node={dr} onClick={() => onNodeClick?.(dr.id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function OrgChart({ supervisor, current, directReports = [], onNodeClick }: OrgChartProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-4">
      {/* Supervisor */}
      {supervisor && (
        <>
          <div className="w-full max-w-xs">
            <NodeCard node={supervisor} onClick={() => onNodeClick?.(supervisor.id)} />
          </div>
          <div className="w-px h-6 bg-gray-300" />
        </>
      )}

      {/* Current Employee */}
      <div className="w-full max-w-xs">
        <NodeCard node={current} highlight />
      </div>

      {/* Direct Reports */}
      {directReports.length > 0 && (
        <>
          <div className="w-px h-6 bg-gray-300" />
          <CollapsibleReports reports={directReports} onNodeClick={onNodeClick} />
        </>
      )}
    </div>
  );
}
