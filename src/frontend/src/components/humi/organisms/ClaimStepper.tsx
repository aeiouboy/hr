'use client';

// ClaimStepper — variable-length numbered stepper for benefits-hub in-flight
// cards. Node count comes from the caller (status-faithful — never a hardcoded
// 5). Done nodes = bg-accent; the active node = ring --color-warning; future
// nodes = neutral. Token-only; no red.

import { cn } from '@/lib/utils';

export interface ClaimStepperProps {
  steps: string[];
  /** 0-based index of the currently active node. */
  activeIndex: number;
}

export function ClaimStepper({ steps, activeIndex }: ClaimStepperProps) {
  if (steps.length === 0) return null;

  return (
    <ol className="flex items-center gap-1" aria-label="ขั้นตอนคำขอ">
      {steps.map((label, i) => {
        const done = i < activeIndex;
        const active = i === activeIndex;
        return (
          <li key={`${label}-${i}`} className="flex items-center gap-1">
            <span className="flex flex-col items-center gap-1">
              <span
                aria-current={active ? 'step' : undefined}
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[length:var(--text-eyebrow)] font-semibold tabular-nums',
                  done && 'bg-accent text-white',
                  active &&
                    'bg-surface text-ink ring-2 ring-[color:var(--color-warning)] ring-offset-1 ring-offset-surface',
                  !done && !active && 'bg-canvas-soft text-ink-muted',
                )}
              >
                {i + 1}
              </span>
              <span
                className={cn(
                  'max-w-[4.5rem] text-center text-[length:var(--text-eyebrow)] leading-tight',
                  active ? 'text-ink font-medium' : 'text-ink-muted',
                )}
              >
                {label}
              </span>
            </span>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  '-mt-4 h-px w-4 shrink-0',
                  i < activeIndex ? 'bg-accent' : 'bg-hairline',
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
