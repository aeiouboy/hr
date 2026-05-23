/**
 * predicates.ts — persona × tab predicate functions for Smart Tabs (STA-28 PR-B v2)
 *
 * These pure functions are consumed by a SINGLE useMemo in quick-approve-page.tsx
 * keyed on (currentUserId, persona, dataset). Never call these from 3 separate
 * memoized adapters — derive all tab counts from one memoized sweep.
 */

import type { PendingRequest } from '@/lib/quick-approve-api';
import type { Role } from '@/lib/rbac';

export type SmartTab = 'action' | 'watching' | 'history';

// Low-risk plan types where bulk Approve is enabled.
// Maps to PendingRequest.type values.
export const LOW_RISK_TYPES = new Set<string>(['gas', 'toll', 'parking']);

// High-risk types where bulk Approve is DISABLED.
// Anything NOT in LOW_RISK_TYPES is considered high-risk by default.
export function isHighRiskType(type: string): boolean {
  return !LOW_RISK_TYPES.has(type);
}

// ── History window ──────────────────────────────────────────────────────────

const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;

function isWithin90Days(submittedAt: string): boolean {
  return Date.now() - new Date(submittedAt).getTime() <= NINETY_DAYS_MS;
}

function isHistorical(status: string | undefined): boolean {
  return status === 'approved' || status === 'rejected' || status === 'sent_back';
}

// ── Persona classification ──────────────────────────────────────────────────

export type PersonaGroup = 'manager' | 'hrbp_spd' | 'hr_admin_manager';

export function getPersonaGroup(persona: Role): PersonaGroup {
  if (persona === 'manager') return 'manager';
  if (persona === 'hrbp' || persona === 'spd') return 'hrbp_spd';
  return 'hr_admin_manager'; // hr_admin | hr_manager
}

// ── Tab predicates ──────────────────────────────────────────────────────────

function getAssigneeId(row: PendingRequest & Record<string, unknown>): string | undefined {
  return (row.assigneeId as string | undefined) ?? row.assignedApprover?.id;
}

/**
 * Action Required tab predicate.
 * Fields that may not exist on mock data (escalatedToHR, slaOverrun, assigneeId)
 * degrade gracefully to sensible defaults.
 */
export function isActionRequired(
  row: PendingRequest & Record<string, unknown>,
  personaGroup: PersonaGroup,
  currentUserId: string,
): boolean {
  const assigneeId = getAssigneeId(row);
  const escalatedToHR = (row.escalatedToHR as boolean | undefined) ?? false;
  const slaOverrun = (row.slaOverrun as boolean | undefined) ?? false;
  // Derive pending status from approval timeline
  const isPending = row.approvalTimeline.some((s) => s.status === 'pending');

  switch (personaGroup) {
    case 'manager':
      // Demo/mock requests predate explicit assignment metadata. Treat rows with
      // no assigneeId as actionable for the manager inbox instead of falling
      // back to requester.id, which is an employee id and hides all rows.
      return (!assigneeId || assigneeId === currentUserId) && isPending;
    case 'hrbp_spd':
      // partneredDepts not in mock data — default to true (all items visible)
      return !escalatedToHR && isPending;
    case 'hr_admin_manager':
      return escalatedToHR || slaOverrun;
  }
}

/**
 * Watching tab predicate.
 * Represents broader visibility beyond direct action items.
 */
export function isWatching(
  row: PendingRequest & Record<string, unknown>,
  personaGroup: PersonaGroup,
  currentUserId: string,
): boolean {
  const assigneeId = getAssigneeId(row);
  const escalatedToHR = (row.escalatedToHR as boolean | undefined) ?? false;
  const isPending = row.approvalTimeline.some((s) => s.status === 'pending');

  switch (personaGroup) {
    case 'manager':
      // Direct reports' indirect items — rows not directly assigned to this manager
      // but still pending. Rows without assigneeId are legacy/demo action items,
      // not watching-only items.
      return !!assigneeId && assigneeId !== currentUserId && isPending;
    case 'hrbp_spd':
      // Full visibility across partnered depts (all pending, including escalated)
      return isPending;
    case 'hr_admin_manager':
      // Items not yet escalated — full visibility
      return !escalatedToHR && isPending;
  }
}

/**
 * History tab predicate.
 * Last 90 days of completed items, scoped by persona.
 */
export function isHistory(
  row: PendingRequest & Record<string, unknown>,
  personaGroup: PersonaGroup,
  currentUserId: string,
): boolean {
  if (!isWithin90Days(row.submittedAt)) return false;
  const assigneeId = getAssigneeId(row);
  // Determine resolved status from timeline
  const allResolved = row.approvalTimeline.every((s) => s.status !== 'pending');
  const anyHistorical = row.approvalTimeline.some((s) => isHistorical(s.status));
  const isDone = allResolved && anyHistorical;

  switch (personaGroup) {
    case 'manager':
      return (!assigneeId || assigneeId === currentUserId) && isDone;
    case 'hrbp_spd':
      return isDone;
    case 'hr_admin_manager':
      return isDone;
  }
}

// ── Single-sweep tab counts ─────────────────────────────────────────────────

export interface TabCounts {
  action: number;
  watching: number;
  history: number;
  all: number;
}

/**
 * Compute all tab counts in a SINGLE pass over the dataset.
 * Call this inside one useMemo keyed on (currentUserId, persona, dataset).
 * Do NOT call isActionRequired / isWatching / isHistory separately.
 */
export function computeTabCounts(
  items: (PendingRequest & Record<string, unknown>)[],
  personaGroup: PersonaGroup,
  currentUserId: string,
): TabCounts {
  const counts: TabCounts = { action: 0, watching: 0, history: 0, all: items.length };
  for (const row of items) {
    if (isActionRequired(row, personaGroup, currentUserId)) counts.action++;
    if (isWatching(row, personaGroup, currentUserId)) counts.watching++;
    if (isHistory(row, personaGroup, currentUserId)) counts.history++;
  }
  return counts;
}
