'use client';

import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import type { RJSFSchema, UiSchema, IconButtonProps } from '@rjsf/utils';
import { ArrowUp, ArrowDown, Trash2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CustomSelectWidget } from './custom-select-widget';

interface RjsfFormProps {
  schema: RJSFSchema;
  uiSchema?: UiSchema;
  formData: unknown;
  onChange: (data: unknown) => void;
  className?: string;
}

// rjsf v5 default icons rely on Bootstrap glyphicon font which we don't ship.
// Override with lucide-react (already a HR dep) so Move/Remove/Add buttons
// actually have visible content instead of the empty pills the user reported.
function MoveUpButton(props: IconButtonProps) {
  const { icon: _icon, iconType: _iconType, uiSchema: _ui, registry: _reg, ...rest } = props;
  return (
    <button type="button" {...rest} title="Move up">
      <ArrowUp size={14} aria-hidden />
      <span>Up</span>
    </button>
  );
}

function MoveDownButton(props: IconButtonProps) {
  const { icon: _icon, iconType: _iconType, uiSchema: _ui, registry: _reg, ...rest } = props;
  return (
    <button type="button" {...rest} title="Move down">
      <ArrowDown size={14} aria-hidden />
      <span>Down</span>
    </button>
  );
}

function RemoveButton(props: IconButtonProps) {
  const { icon: _icon, iconType: _iconType, uiSchema: _ui, registry: _reg, ...rest } = props;
  return (
    <button type="button" {...rest} title="Remove" className="rjsf-btn-danger">
      <Trash2 size={14} aria-hidden />
      <span>Remove</span>
    </button>
  );
}

function AddButton(props: IconButtonProps) {
  const { icon: _icon, iconType: _iconType, uiSchema: _ui, registry: _reg, ...rest } = props;
  return (
    <button type="button" {...rest} title="Add item">
      <Plus size={14} aria-hidden />
      <span>Add item</span>
    </button>
  );
}

/**
 * Light-theme rjsf wrapper styled with Tailwind to match HR brand.
 *
 * Notes:
 * - Submit button hidden — caller controls persistence elsewhere.
 * - liveValidate ON to surface schema errors as the admin types.
 * - Tailwind selectors target rjsf's default DOM (`.rjsf` root, label/input/button).
 */
export function RjsfForm({
  schema,
  uiSchema,
  formData,
  onChange,
  className,
}: RjsfFormProps) {
  return (
    <div className={cn('rjsf-light', className)}>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        validator={validator}
        liveValidate
        showErrorList={false}
        onChange={(e) => onChange(e.formData)}
        widgets={{
          SelectWidget: CustomSelectWidget,
        }}
        templates={{
          ButtonTemplates: {
            MoveUpButton,
            MoveDownButton,
            RemoveButton,
            AddButton,
          },
        }}
      >
        {/* hide submit — preview-only POC */}
        <button type="submit" className="hidden" aria-hidden="true" tabIndex={-1} />
      </Form>

      {/* Precision Cool — token-only styles for rjsf default DOM.
          Every color references a @theme var from globals.css — NO hardcoded
          rgb() or hex. Labels/inputs/focus rings/required stars all resolve
          via CSS variables so any future palette swap is zero-diff. */}
      <style jsx>{`
        .rjsf-light :global(.rjsf) {
          color: var(--color-ink);
          font-family: var(--font-sans);
        }
        /* Top-level fieldset legend (section titles inside the form) */
        .rjsf-light :global(legend) {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--color-ink);
          letter-spacing: 0;
          margin: 0 0 0.5rem 0;
          padding: 0;
        }
        /* Field labels — override rjsf's .control-label default gray */
        .rjsf-light :global(label),
        .rjsf-light :global(.control-label) {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--color-ink-soft);
          display: block;
          margin-bottom: 0.3125rem;
          letter-spacing: 0;
          line-height: 1.4;
        }
        .rjsf-light :global(input[type='text']),
        .rjsf-light :global(input[type='number']),
        .rjsf-light :global(input[type='date']),
        .rjsf-light :global(input[type='email']),
        .rjsf-light :global(textarea),
        .rjsf-light :global(select) {
          width: 100%;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          line-height: 1.4;
          font-family: var(--font-sans);
          color: var(--color-ink);
          background-color: var(--color-surface);
          border: 1px solid var(--color-hairline);
          border-radius: var(--radius-md);
          outline: none;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }
        /* Focus rings = cobalt accent (Precision Cool signature) */
        .rjsf-light :global(input:focus),
        .rjsf-light :global(textarea:focus),
        .rjsf-light :global(select:focus) {
          border-color: var(--color-accent);
          box-shadow: 0 0 0 3px rgba(29, 111, 232, 0.18);
        }
        .rjsf-light :global(.field-description) {
          font-size: 0.75rem;
          color: var(--color-ink-muted);
          margin-top: 0.25rem;
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }
        .rjsf-light :global(.help-block) {
          font-size: 0.75rem;
          color: var(--color-ink-muted);
          margin-top: 0.25rem;
          line-height: 1.5;
        }
        .rjsf-light :global(.field) {
          margin-bottom: 1rem;
        }
        /* Nested fieldsets (Target Population, Effect, etc.) */
        .rjsf-light :global(fieldset) {
          border: 1px solid var(--color-hairline);
          border-radius: var(--radius-md);
          padding: 1rem;
          margin-bottom: 1rem;
          background-color: var(--color-surface-raised);
          max-width: 100%;
        }
        .rjsf-light :global(.form-group) {
          max-width: 100%;
        }
        /* Array items (Field Permissions rows) */
        .rjsf-light :global(.field-array .array-item) {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 1px solid var(--color-hairline);
          border-radius: var(--radius-md);
          background-color: var(--color-surface);
          margin-bottom: 0.5rem;
        }
        /* Undo rjsf's Bootstrap 3 col-xs-9/col-xs-3 float grid */
        .rjsf-light :global(.field-array .array-item > .col-xs-9),
        .rjsf-light :global(.field-array .array-item > .col-xs-3) {
          width: auto;
          padding: 0;
          float: none;
        }
        /* Inline per-item fieldset: 3-col grid (Category / Field / Access) */
        .rjsf-light :global(.field-array .array-item .field-object > fieldset) {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0.75rem;
          align-items: start;
          border: none;
          padding: 0;
          background: transparent;
          margin: 0;
        }
        .rjsf-light :global(.field-array .array-item .field-object > fieldset > legend) {
          grid-column: 1 / -1;
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--color-ink-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin: 0 0 0.375rem 0;
        }
        .rjsf-light :global(.field-array .array-item .field-object > fieldset > .field) {
          margin-bottom: 0;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        /* Hide inline descriptions + help blocks inside non-boolean array
           item columns — they create height variance (Field col has 2-line
           wrap, Category has none → inputs misalign horizontally). rjsf
           still exposes the text via aria-describedby for screen readers.
           .field-boolean columns keep their help because they span full width.
           With descriptions hidden, natural DOM order (label → widget)
           already aligns all 3 columns uniformly — no order: hack needed. */
        .rjsf-light :global(.field-array .array-item .field-object > fieldset > .field:not(.field-boolean) > .field-description),
        .rjsf-light :global(.field-array .array-item .field-object > fieldset > .field:not(.field-boolean) > p.field-description),
        .rjsf-light :global(.field-array .array-item .field-object > fieldset > .field:not(.field-boolean) > .help-block),
        .rjsf-light :global(.field-array .array-item .field-object > fieldset > .field:not(.field-boolean) > p.help-block) {
          display: none;
        }
        .rjsf-light :global(.field-array .array-item .field-object > fieldset > .field-boolean) {
          grid-column: 1 / -1;
        }
        /* Item toolbox (Up / Down / Remove) */
        .rjsf-light :global(.field-array .array-item-toolbox) {
          display: flex;
          justify-content: flex-end;
          gap: 0.25rem;
          padding-top: 0.5rem;
          border-top: 1px dashed var(--color-hairline);
        }
        .rjsf-light :global(.array-item-toolbox button),
        .rjsf-light :global(.array-item-add button),
        .rjsf-light :global(button[title="Move up"]),
        .rjsf-light :global(button[title="Move down"]),
        .rjsf-light :global(button[title="Remove"]),
        .rjsf-light :global(button[title="Add item"]) {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.375rem 0.625rem;
          font-size: 0.75rem;
          font-weight: 500;
          font-family: var(--font-sans);
          color: var(--color-ink-soft);
          background-color: var(--color-surface);
          border: 1px solid var(--color-hairline);
          border-radius: var(--radius-md);
          margin-right: 0.25rem;
          cursor: pointer;
          line-height: 1;
          transition: all 150ms ease;
        }
        .rjsf-light :global(.array-item-toolbox button:hover),
        .rjsf-light :global(.array-item-add button:hover),
        .rjsf-light :global(button[title="Move up"]:hover),
        .rjsf-light :global(button[title="Move down"]:hover),
        .rjsf-light :global(button[title="Add item"]:hover) {
          background-color: var(--color-surface-raised);
          color: var(--color-ink);
          border-color: var(--color-ink-muted);
        }
        .rjsf-light :global(.rjsf-btn-danger) {
          color: var(--color-danger) !important;
          border-color: var(--color-hairline) !important;
        }
        .rjsf-light :global(.rjsf-btn-danger:hover) {
          background-color: var(--color-danger-tint) !important;
          border-color: var(--color-danger) !important;
        }
        .rjsf-light :global(.array-item-add) {
          margin-top: 0.5rem;
        }
        /* Checkbox list — multi-select widget wraps as:
             .checkbox > label > span > (input + span.text)
           Boolean field wraps as:
             .field-boolean > .checkbox > label > (input + span.text)
           Apply flex+gap to BOTH layers so the gap lands regardless. */
        .rjsf-light :global(.checkbox) {
          position: relative;
          padding: 0;
          margin-bottom: 0.25rem;
        }
        .rjsf-light :global(.checkbox label) {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 400;
          font-size: 0.875rem;
          color: var(--color-ink);
          cursor: pointer;
          margin-bottom: 0;
          line-height: 1.5;
        }
        /* Inner span (multi-select only) */
        .rjsf-light :global(.checkbox label > span) {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: inherit;
        }
        .rjsf-light :global(.checkbox input[type='checkbox']),
        .rjsf-light :global(input[type='checkbox']) {
          width: 1rem;
          height: 1rem;
          margin: 0;
          flex-shrink: 0;
          accent-color: var(--color-accent);
          cursor: pointer;
        }
        /* Multi-select container: vertical rhythm between items */
        .rjsf-light :global(.checkboxes) {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          padding: 0.25rem 0;
        }
        /* Field-boolean: gap between checkbox row and its help text */
        .rjsf-light :global(.field-boolean .help-block) {
          margin-top: 0.375rem;
          margin-left: 1.5rem;
        }
        /* Validation errors */
        .rjsf-light :global(.text-danger),
        .rjsf-light :global(.error-detail) {
          font-size: 0.75rem;
          color: var(--color-danger);
          margin-top: 0.25rem;
        }
        /* Required star */
        .rjsf-light :global(.required) {
          color: var(--color-brand);
          margin-left: 0.125rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
