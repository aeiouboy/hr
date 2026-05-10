'use client'

// SectionHeader.tsx — Shared section header for Cluster wizard cards
// C7: Single source of truth — extracted from 5 duplicate definitions
// in ClusterWho, ClusterJob, ClusterReview (hire) + ClusterEmployee,
// ClusterAssessment, ClusterReview (probation).
import type { LucideIcon } from 'lucide-react'

interface SectionHeaderProps {
  icon: LucideIcon
  eyebrow: string
  title: string
  sub: string
}

export function SectionHeader({ icon: Icon, eyebrow, title, sub }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Icon size={18} aria-hidden />
      </div>
      <div className="min-w-0">
        <div className="mb-0.5 text-[11px] font-semibold tracking-[0.08em] text-ink-muted">{eyebrow}</div>
        <h3 className="humi-section-title">{title}</h3>
        <p className="humi-section-sub" style={{ marginBottom: 0 }}>{sub}</p>
      </div>
    </div>
  )
}
