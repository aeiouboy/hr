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
    <div className="humi-row" style={{ alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
        <Icon size={20} aria-hidden />
      </div>
      <div>
        <div className="humi-eyebrow">{eyebrow}</div>
        <h3 className="humi-section-title">{title}</h3>
        <p className="humi-section-sub" style={{ marginBottom: 0 }}>{sub}</p>
      </div>
    </div>
  )
}
