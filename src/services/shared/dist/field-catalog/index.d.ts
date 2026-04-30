import type { FieldDef, FlowId } from './types';
export type { FieldDef, FieldType, FlowId, ReadOnlyRule } from './types';
export { EC_CORE_FIELDS } from './ec-core';
/**
 * Return every FieldDef that participates in `flow`. Preserves declaration
 * order from `ec-core.ts` so the wizard renders fields in the order the
 * BRD author arranged them (identity → name → biographical → …).
 */
export declare function getFieldsByFlow(flow: FlowId): FieldDef[];
/**
 * Return every FieldDef that belongs to the given UI `section` bucket
 * (e.g. 'name', 'address', 'bankAccount'). Case-sensitive — sections are
 * spelled exactly as declared in ec-core.ts.
 */
export declare function getFieldsBySection(section: string): FieldDef[];
//# sourceMappingURL=index.d.ts.map