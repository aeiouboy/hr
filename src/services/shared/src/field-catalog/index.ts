// field-catalog barrel — public API for @hrms/shared consumers.
//
// Consumers:
//   Frontend   → Zustand slice generation + Zod schema emission
//   Future BE  → Prisma model snippets + class-validator DTO skeletons
//
// Keep this file tiny: types re-export + the two lookup helpers the spec
// requires (getFieldsByFlow / getFieldsBySection). No other helpers — per
// Rule C3 Simplicity: add abstractions only when there is a second caller.

import { EC_CORE_FIELDS } from './ec-core';
import type { FieldDef, FlowId } from './types';

export type { FieldDef, FieldType, FlowId, ReadOnlyRule } from './types';
export { EC_CORE_FIELDS } from './ec-core';

/**
 * Return every FieldDef that participates in `flow`. Preserves declaration
 * order from `ec-core.ts` so the wizard renders fields in the order the
 * BRD author arranged them (identity → name → biographical → …).
 */
export function getFieldsByFlow(flow: FlowId): FieldDef[] {
  return EC_CORE_FIELDS.filter((f) => f.flowsUsedIn.includes(flow));
}

/**
 * Return every FieldDef that belongs to the given UI `section` bucket
 * (e.g. 'name', 'address', 'bankAccount'). Case-sensitive — sections are
 * spelled exactly as declared in ec-core.ts.
 */
export function getFieldsBySection(section: string): FieldDef[] {
  return EC_CORE_FIELDS.filter((f) => f.section === section);
}
