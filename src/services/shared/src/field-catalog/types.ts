// FieldDef — shared contract for every EC-Core field.
//
// One entry = one admin-visible field. Every entry MUST trace back to either
// a BRD row (`brdRow`) or a SAP SuccessFactors entity column (`sfEntity` +
// `sfField`) — preferably both. No invented fields (Rule C8 source-grounding).
//
// `flowsUsedIn` is the primary index the wizard-template factory queries via
// `getFieldsByFlow('hire' | 'rehire' | ...)`. `section` is the secondary
// index used when a flow wants to group fields (e.g. Hire cluster "Who" =
// identity + name + nationalId + biographical).
//
// Sources:
//   - BRD-EC-summary.md (207 requirements, 11 flows)
//     at projects/hr-platform-replacement/BRD-EC-summary.md
//   - docs/entity-schemas/** (69 SF entities)
//     at projects/hr-platform-replacement/docs/entity-schemas/
//
// Deliberately zero framework deps (no React / NestJS / Zod) so this is
// consumable by FE (Zustand + Zod) and future BE (Prisma + class-validator)
// without rework — per phase0-foundation-progressive-plan.md §Architecture.

/** Atomic value types — maps 1-to-1 onto TS primitives, Zod types, and Prisma types. */
export type FieldType =
  | 'string'
  | 'number'
  | 'date'
  | 'datetime'
  | 'boolean'
  | 'picklist'
  | 'multi-picklist';

/**
 * Downstream flows that may consume a field. Values align with
 * phase0-foundation-progressive-plan.md §"Step by Step Tasks" Task 1 +
 * BRD flow-09 Employee Lifecycle (Hire / Rehire / Transfer / Terminate /
 * Contract Renewal / Probation) plus flow-06 Personal Info "empData"
 * read-only baseline used by My Profile screens.
 */
export type FlowId =
  | 'hire'
  | 'rehire'
  | 'transfer'
  | 'terminate'
  | 'contractRenewal'
  | 'probation'
  | 'empData';

/** Role-gated read-only rule (e.g. salary readOnly for non-HRBP). Optional. */
export interface ReadOnlyRule {
  /** Roles that see the field in read-only mode. Empty = visible for all. */
  role?: string[];
  /** Optional DSL expression that must be true for read-only to apply. */
  condition?: string;
}

export interface FieldDef {
  /** camelCase business identifier — unique across the catalog. */
  id: string;

  /** BRD-EC-summary.md row number if the field traces to a BRD line item. */
  brdRow: number | null;

  /** SAP SuccessFactors entity (table) that owns this field. Empty string only if BRD-only. */
  sfEntity: string;

  /** SAP SuccessFactors column on `sfEntity`. Empty string only if BRD-only. */
  sfField: string;

  /** Thai label — MANDATORY (Rule C10 Thai-primary). Shown in the wizard UI. */
  labelTh: string;

  /** English label — MANDATORY per spec AC-1 "non-null labelEn". Secondary UI locale. */
  labelEn: string;

  /** Value type — drives input widget selection + Zod schema emission. */
  type: FieldType;

  /** Must be filled before Next/Submit when the field is visible. */
  required: boolean;

  /** Role- or condition-gated read-only. Omit for fully editable fields. */
  readOnly?: ReadOnlyRule;

  /** Max character length (strings only). Pulled from SF VARCHAR(n). */
  maxLength?: number;

  /** Min character length (strings only). Rare; used for National ID (13). */
  minLength?: number;

  /** Format regex (strings only). Used for Thai NID, phone, email, etc. */
  regex?: string;

  /**
   * Picklist source identifier when `type === 'picklist'` or `'multi-picklist'`.
   * Resolved at render time via `@hrms/shared/picklists` (F2 deliverable).
   */
  picklistId?: string;

  /** Value pre-populated when the admin opens the form for the first time. */
  defaultValue?: unknown;

  /**
   * Conditional visibility DSL, evaluated against other field values in the
   * same form. Example: "employeeClass === 'CONTRACT'".
   * Null = always visible.
   */
  visibleWhen?: string;

  /**
   * Conditional required DSL — field is required only when this evaluates
   * true. Example: contractEndDate required only when class='CONTRACT'.
   * Null = required is taken verbatim from `required`.
   */
  mandatoryWhen?: string;

  /**
   * UI grouping bucket. Flows compose multiple sections per cluster (e.g.
   * Hire cluster "Who" = identity + name + nationalId + biographical).
   */
  section: string;

  /** Flows that consume this field. Empty array = not yet surfaced. */
  flowsUsedIn: FlowId[];
}
