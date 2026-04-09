/**
 * HR Permission POC schemas — 3 realistic patterns for permission setting pages.
 *
 * In production these would live in DB (admin-editable without redeploy).
 * rjsf renders any valid JSON Schema → form.
 *
 * Note: enum labels live in uiSchema as `ui:enumNames` (the schema-level
 * `enumNames` is deprecated in rjsf v5 and removed in v6).
 */

import type { RJSFSchema, UiSchema } from '@rjsf/utils';

// ─────────────────────────────────────────────────────────────
// Schema 1: Simple Permission Role
// Use case: create named role with coarse access level + effective window
// ─────────────────────────────────────────────────────────────

export const simpleRoleSchema: RJSFSchema = {
 title:'Permission Role — Simple',
 description:'Define a named permission role with effective period.',
 type:'object',
 required: ['roleName','accessLevel','effectiveFrom'],
 properties: {
 roleName: {
 type:'string',
 title:'Role Name',
 minLength: 3,
 maxLength: 50,
 pattern:'^[A-Za-z0-9 _-]+$',
 description:'Human-readable name (e.g."HR Admin North Region")',
 },
 description: {
 type:'string',
 title:'Description',
 maxLength: 500,
 },
 accessLevel: {
 type:'string',
 title:'Access Level',
 enum: ['none','view','edit','admin'],
 default:'view',
 },
 targetScope: {
 type:'string',
 title:'Target Scope',
 enum: ['self','direct_reports','business_unit','all'],
 default:'self',
 },
 effectiveFrom: {
 type:'string',
 title:'Effective From',
 format:'date',
 },
 effectiveTo: {
 type:'string',
 title:'Effective To (optional)',
 format:'date',
 },
 requiresApproval: {
 type:'boolean',
 title:'Changes to this role require approval',
 default: true,
 },
 },
};

export const simpleRoleUiSchema: UiSchema = {
 description: {
'ui:widget':'textarea',
'ui:options': { rows: 3 },
 },
 accessLevel: {
'ui:enumNames': ['No Access','View Only','View + Edit','Full Admin'],
 },
 targetScope: {
'ui:enumNames': ['Self Only','Direct Reports','My Business Unit','All Employees'],
 },
 requiresApproval: {
'ui:help':'When ON, any edit to this role triggers a 2-step approval workflow.',
 },
};

export const simpleRoleInitialData = {
 roleName:'HR Viewer Sample',
 description:'Read-only access for new HR staff during onboarding.',
 accessLevel:'view',
 targetScope:'business_unit',
 effectiveFrom:'2026-04-01',
 requiresApproval: true,
};

// ─────────────────────────────────────────────────────────────
// Schema 2: Field-Level Permission Matrix
// Use case: fine-grained per-field read/write control
// This is the CORE HR permission pattern (SuccessFactors-style)
// ─────────────────────────────────────────────────────────────

export const fieldMatrixSchema: RJSFSchema = {
 title:'Field-Level Permission Matrix',
 description:'Grant per-field access to employee data categories.',
 type:'object',
 required: ['roleName','targetPopulation','fieldPermissions'],
 properties: {
 roleName: {
 type:'string',
 title:'Role Name',
 minLength: 3,
 },
 targetPopulation: {
 type:'object',
 title:'Target Population',
 description:'Which employees does this role apply to?',
 required: ['scope'],
 properties: {
 scope: {
 type:'string',
 title:'Scope',
 enum: ['all','business_unit','department','direct_reports','custom_filter'],
 },
 businessUnit: {
 type:'string',
 title:'Business Unit',
 enum: ['north','south','central','international'],
 },
 department: {
 type:'string',
 title:'Department',
 },
 excludeInactive: {
 type:'boolean',
 title:'Exclude inactive employees',
 default: true,
 },
 },
 },
 fieldPermissions: {
 type:'array',
 title:'Field Permissions',
 description:'Per-field access rules. Add one entry per field category.',
 minItems: 1,
 items: {
 type:'object',
 required: ['category','field','access'],
 properties: {
 category: {
 type:'string',
 title:'Category',
 enum: ['personal','employment','compensation','performance','benefits'],
 },
 field: {
 type:'string',
 title:'Field',
 description:'Field name within category (e.g."base_salary")',
 },
 access: {
 type:'string',
 title:'Access',
 enum: ['none','view','edit'],
 default:'view',
 },
 requiresReason: {
 type:'boolean',
 title:'Require reason when editing',
 default: false,
 },
 },
 },
 },
 },
};

export const fieldMatrixUiSchema: UiSchema = {
 targetPopulation: {
 scope: {
'ui:help':'Determines which employees the role can affect.',
'ui:enumNames': [
'All employees',
'Specific business unit',
'Specific department',
'Direct reports only',
'Custom filter',
 ],
 },
 },
 fieldPermissions: {
'ui:options': {
 orderable: true,
 addable: true,
 removable: true,
 },
 items: {
 category: {
'ui:enumNames': [
'Personal Info',
'Employment',
'Compensation',
'Performance',
'Benefits',
 ],
 },
 access: {
'ui:help':'Hidden = field not returned from API at all.',
'ui:enumNames': ['Hidden','View Only','View + Edit'],
 },
 requiresReason: {
'ui:help':'Audit trail: forces admin to type reason when changing this field.',
 },
 },
 },
};

export const fieldMatrixInitialData = {
 roleName:'HR Compensation Reviewer',
 targetPopulation: {
 scope:'business_unit',
 businessUnit:'central',
 excludeInactive: true,
 },
 fieldPermissions: [
 { category:'personal', field:'full_name', access:'view', requiresReason: false },
 { category:'employment', field:'job_title', access:'view', requiresReason: false },
 { category:'compensation', field:'base_salary', access:'edit', requiresReason: true },
 { category:'compensation', field:'bonus', access:'view', requiresReason: false },
 ],
};

// ─────────────────────────────────────────────────────────────
// Schema 3: Conditional Rule Builder
// Use case: dynamic permission rules ("if X then allow Y")
// Demonstrates nested objects + array of fields with checkbox widget
// ─────────────────────────────────────────────────────────────

export const conditionalRuleSchema: RJSFSchema = {
 title:'Conditional Permission Rule',
 description:
'Rules applied dynamically at query time. Example:"Managers can see salary of direct reports only during performance review cycle."',
 type:'object',
 required: ['ruleName','condition','effect'],
 properties: {
 ruleName: {
 type:'string',
 title:'Rule Name',
 minLength: 3,
 },
 priority: {
 type:'integer',
 title:'Priority',
 minimum: 1,
 maximum: 100,
 default: 50,
 description:'Higher priority rules evaluate first.',
 },
 condition: {
 type:'object',
 title:'Condition (IF)',
 required: ['attribute','operator','value'],
 properties: {
 attribute: {
 type:'string',
 title:'Attribute',
 enum: [
'user.role',
'user.department',
'user.business_unit',
'target.manager_id',
'context.current_phase',
'context.is_review_cycle',
'time.within_business_hours',
 ],
 },
 operator: {
 type:'string',
 title:'Operator',
 enum: ['equals','not_equals','in','not_in','contains'],
 },
 value: {
 type:'string',
 title:'Value',
 },
 },
 },
 effect: {
 type:'object',
 title:'Effect (THEN)',
 required: ['action','target'],
 properties: {
 action: {
 type:'string',
 title:'Action',
 enum: ['allow','deny','mask','require_approval'],
 },
 target: {
 type:'string',
 title:'Target',
 enum: ['read','write','delete','export'],
 },
 fields: {
 type:'array',
 title:'Applies to fields',
 items: {
 type:'string',
 enum: [
'salary',
'bonus',
'performance_rating',
'personal_email',
'national_id',
'bank_account',
 ],
 },
 uniqueItems: true,
 },
 },
 },
 auditLog: {
 type:'boolean',
 title:'Log every evaluation of this rule',
 default: true,
 },
 },
};

export const conditionalRuleUiSchema: UiSchema = {
 effect: {
 action: {
'ui:enumNames': [
'Allow',
'Deny',
'Mask value (show ***)',
'Require 2nd approval',
 ],
 },
 fields: {
'ui:widget':'checkboxes',
 },
 },
 auditLog: {
'ui:help':
'When ON, every time this rule is checked (read, write, etc.) an audit entry is created. Off = only denials logged.',
 },
};

export const conditionalRuleInitialData = {
 ruleName:'Manager salary view during review cycle',
 priority: 80,
 condition: {
 attribute:'context.is_review_cycle',
 operator:'equals',
 value:'true',
 },
 effect: {
 action:'allow',
 target:'read',
 fields: ['salary','bonus'],
 },
 auditLog: true,
};

export type SchemaKey ='simple' |'matrix' |'conditional';

export const SCHEMA_REGISTRY: Record<
 SchemaKey,
 {
 label: string;
 schema: RJSFSchema;
 uiSchema: UiSchema;
 initialData: Record<string, unknown>;
 }
> = {
 simple: {
 label:'Simple Role',
 schema: simpleRoleSchema,
 uiSchema: simpleRoleUiSchema,
 initialData: simpleRoleInitialData,
 },
 matrix: {
 label:'Field Matrix',
 schema: fieldMatrixSchema,
 uiSchema: fieldMatrixUiSchema,
 initialData: fieldMatrixInitialData,
 },
 conditional: {
 label:'Conditional Rule',
 schema: conditionalRuleSchema,
 uiSchema: conditionalRuleUiSchema,
 initialData: conditionalRuleInitialData,
 },
};
