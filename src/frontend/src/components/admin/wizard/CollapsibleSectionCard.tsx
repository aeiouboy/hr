'use client'

import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SectionHeader } from './SectionHeader'

interface CollapsibleSectionCardProps {
  id: string
  icon: LucideIcon
  eyebrow: string
  title: string
  sub: string
  collapsed?: boolean
  onCollapsedChange: (collapsed: boolean) => void
  children: ReactNode
}

export function CollapsibleSectionCard({
  id,
  icon,
  eyebrow,
  title,
  sub,
  collapsed = false,
  onCollapsedChange,
  children,
}: CollapsibleSectionCardProps) {
  const contentId = `${id}-content`

  return (
    <section className="humi-card" aria-labelledby={`${id}-title`}>
      <div className="flex items-start justify-between gap-3">
        <div id={`${id}-title`} className="min-w-0 flex-1">
          <SectionHeader icon={icon} eyebrow={eyebrow} title={title} sub={sub} />
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-hairline bg-surface text-ink-soft transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          aria-expanded={!collapsed}
          aria-controls={contentId}
          onClick={() => onCollapsedChange(!collapsed)}
        >
          <span className="sr-only">{collapsed ? 'Expand section' : 'Collapse section'}</span>
          <ChevronDown
            size={18}
            aria-hidden
            className={cn('transition-transform', collapsed ? '-rotate-90' : 'rotate-0')}
          />
        </button>
      </div>

      {/* Keep the form subtree mounted while visually hiding collapsed content so local input state,
          validation effects, and store subscriptions are not reset by a collapse/expand cycle. */}
      <div
        id={contentId}
        className={cn('humi-step-section', collapsed && 'hidden')}
        aria-hidden={collapsed}
      >
        {children}
      </div>
    </section>
  )
}
