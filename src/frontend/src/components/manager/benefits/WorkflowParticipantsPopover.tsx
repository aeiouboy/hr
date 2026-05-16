'use client';

// STA-28 PR-A — Workflow participants popover shared across Manager/HRBP/SPD/Admin surfaces
import { useState } from 'react';
import { CheckCircle2, Clock, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface WorkflowParticipant {
  role: 'employee' | 'manager' | 'hrbp' | 'spd' | 'hr_admin';
  name: string;
  status: 'pending' | 'completed' | 'skipped';
}

export interface WorkflowParticipantsPopoverProps {
  participants: WorkflowParticipant[];
  isTh: boolean;
}

const ROLE_LABEL_TH: Record<WorkflowParticipant['role'], string> = {
  employee: 'พนักงาน',
  manager: 'หัวหน้า',
  hrbp: 'HRBP',
  spd: 'SPD',
  hr_admin: 'HR Admin',
};

const ROLE_LABEL_EN: Record<WorkflowParticipant['role'], string> = {
  employee: 'Employee',
  manager: 'Manager',
  hrbp: 'HRBP',
  spd: 'SPD',
  hr_admin: 'HR Admin',
};

function StatusIcon({ status }: { status: WorkflowParticipant['status'] }) {
  if (status === 'completed') return <CheckCircle2 className="h-4 w-4 text-success" aria-label="completed" />;
  if (status === 'skipped') return <Minus className="h-4 w-4 text-ink-muted" aria-label="skipped" />;
  return <Clock className="h-4 w-4 text-warning" aria-label="pending" />;
}

export function WorkflowParticipantsPopover({ participants, isTh }: WorkflowParticipantsPopoverProps) {
  const [open, setOpen] = useState(false);
  const roleLabel = isTh ? ROLE_LABEL_TH : ROLE_LABEL_EN;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1 rounded-[var(--radius-sm)] border border-hairline bg-surface px-2.5 py-1 text-xs font-medium text-ink-muted hover:bg-surface-raised transition"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {isTh ? 'ดูขั้นตอน' : 'View workflow'}
        {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>

      {open && (
        <>
          {/* Backdrop to close on outside click */}
          <div
            className="fixed inset-0 z-40"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute left-0 top-full z-50 mt-1 w-64 rounded-[var(--radius-md)] border border-hairline bg-surface shadow-lg"
            role="dialog"
            aria-label={isTh ? 'ขั้นตอนการอนุมัติ' : 'Approval workflow'}
          >
            <div className="border-b border-hairline px-3 py-2">
              <p className="text-xs font-semibold text-ink">
                {isTh ? 'ขั้นตอนการอนุมัติ' : 'Approval workflow'}
              </p>
            </div>
            <ul className="divide-y divide-hairline">
              {participants.map((p, i) => (
                <li key={i} className="flex items-center gap-2.5 px-3 py-2">
                  <StatusIcon status={p.status} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-ink truncate">{p.name}</p>
                    <p className={cn(
                      'text-xs font-medium uppercase tracking-wide',
                      p.status === 'completed' ? 'text-success' :
                      p.status === 'skipped' ? 'text-ink-muted' : 'text-warning'
                    )}>
                      {roleLabel[p.role]}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
