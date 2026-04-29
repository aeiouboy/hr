'use client'

import { ChevronDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SectionHeader } from './SectionHeader'

interface CollapsibleSectionCardProps {
  id: string
  icon: LucideIcon
  eyebrow: string
  title: string
  sub: string
  collapsed?: boolean
  onToggle: () => void
  children: React.ReactNode
}

export function CollapsibleSectionCard({
  id,
  icon,
  eyebrow,
  title,
  sub,
  collapsed = false,
  onToggle,
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
          className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-md border border-hairline bg-surface px-3 py-2 text-small font-semibold text-ink-soft transition-colors hover:bg-canvas-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          aria-expanded={!collapsed}
          aria-controls={contentId}
          onClick={onToggle}
        >
          {collapsed ? 'ขยาย' : 'ย่อ'}
          <ChevronDown
            size={16}
            aria-hidden
            className={cn('transition-transform', collapsed ? '-rotate-90' : 'rotate-0')}
          />
        </button>
      </div>
      <div
        id={contentId}
        // Keep descendants mounted while visually hiding collapsed sections so
        // field state and validation effects remain active across toggles.
        hidden={collapsed}
        className="humi-step-section"
      >
        {children}
      </div>
    </section>
  )
}
