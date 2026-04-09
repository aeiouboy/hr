'use client';

import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import type { RJSFSchema, UiSchema, IconButtonProps } from '@rjsf/utils';
import { ArrowUp, ArrowDown, Trash2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

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

      {/* Tailwind-scoped styles for rjsf default DOM */}
      <style jsx>{`
        .rjsf-light :global(.rjsf) {
          color: rgb(31 41 55);
        }
        .rjsf-light :global(legend),
        .rjsf-light :global(label) {
          font-size: 0.875rem;
          font-weight: 500;
          color: rgb(55 65 81);
          display: block;
          margin-bottom: 0.375rem;
        }
        .rjsf-light :global(legend) {
          font-size: 1rem;
          font-weight: 600;
          color: rgb(17 24 39);
          margin-top: 1rem;
          margin-bottom: 0.5rem;
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
          line-height: 1.25rem;
          color: rgb(17 24 39);
          background-color: white;
          border: 1px solid rgb(209 213 219);
          border-radius: 0.5rem;
          outline: none;
          transition: border-color 150ms, box-shadow 150ms;
        }
        .rjsf-light :global(input:focus),
        .rjsf-light :global(textarea:focus),
        .rjsf-light :global(select:focus) {
          border-color: rgb(220 38 38);
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
        }
        .rjsf-light :global(.field-description) {
          font-size: 0.75rem;
          color: rgb(107 114 128);
          margin-top: 0.25rem;
          margin-bottom: 0.5rem;
        }
        .rjsf-light :global(.help-block) {
          font-size: 0.75rem;
          color: rgb(107 114 128);
          margin-top: 0.25rem;
        }
        .rjsf-light :global(.field) {
          margin-bottom: 1rem;
        }
        .rjsf-light :global(fieldset) {
          border: 1px solid rgb(229 231 235);
          border-radius: 0.5rem;
          padding: 1rem;
          margin-bottom: 1rem;
          background-color: rgb(249 250 251);
        }
        .rjsf-light :global(.field-array .array-item) {
          padding: 0.75rem;
          border: 1px solid rgb(229 231 235);
          border-radius: 0.5rem;
          background-color: white;
          margin-bottom: 0.5rem;
        }
        /* rjsf uses Bootstrap 3 col-xs-9 / col-xs-3 split → override to flex row */
        .rjsf-light :global(.field-array .array-item) {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .rjsf-light :global(.field-array .array-item > .col-xs-9),
        .rjsf-light :global(.field-array .array-item > .col-xs-3) {
          width: auto;
          padding: 0;
          float: none;
        }
        /* Inline the per-item fieldset: category + field + access side-by-side */
        .rjsf-light :global(.field-array .array-item .field-object > fieldset) {
          border: none;
          padding: 0;
          background: transparent;
          margin: 0;
        }
        .rjsf-light :global(.field-array .array-item .field-object > fieldset > legend) {
          font-size: 0.75rem;
          font-weight: 600;
          color: rgb(107 114 128);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 0.5rem 0;
          padding: 0;
        }
        /* 3-col grid for text/select fields, requiresReason spans full width */
        .rjsf-light :global(.field-array .array-item .field-object > fieldset) {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0.75rem;
          align-items: start;
        }
        .rjsf-light :global(.field-array .array-item .field-object > fieldset > legend) {
          grid-column: 1 / -1;
        }
        .rjsf-light :global(.field-array .array-item .field-object > fieldset > .field) {
          margin-bottom: 0;
          min-width: 0;
        }
        .rjsf-light :global(.field-array .array-item .field-object > fieldset > .field-boolean) {
          grid-column: 1 / -1;
        }
        .rjsf-light :global(.field-array .array-item-toolbox) {
          display: flex;
          justify-content: flex-end;
          gap: 0.25rem;
          padding-top: 0.5rem;
          border-top: 1px dashed rgb(229 231 235);
        }
        .rjsf-light :global(fieldset) {
          max-width: 100%;
        }
        .rjsf-light :global(.form-group) {
          max-width: 100%;
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
          color: rgb(55 65 81);
          background-color: white;
          border: 1px solid rgb(209 213 219);
          border-radius: 0.375rem;
          margin-right: 0.25rem;
          cursor: pointer;
          line-height: 1;
        }
        .rjsf-light :global(.array-item-toolbox button:hover),
        .rjsf-light :global(.array-item-add button:hover),
        .rjsf-light :global(button[title="Move up"]:hover),
        .rjsf-light :global(button[title="Move down"]:hover),
        .rjsf-light :global(button[title="Add item"]:hover) {
          background-color: rgb(243 244 246);
          border-color: rgb(156 163 175);
        }
        .rjsf-light :global(.rjsf-btn-danger) {
          color: rgb(220 38 38) !important;
          border-color: rgb(252 165 165) !important;
        }
        .rjsf-light :global(.rjsf-btn-danger:hover) {
          background-color: rgb(254 242 242) !important;
          border-color: rgb(220 38 38) !important;
        }
        .rjsf-light :global(.array-item-add) {
          margin-top: 0.5rem;
        }
        .rjsf-light :global(.checkbox label) {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 400;
        }
        .rjsf-light :global(input[type='checkbox']) {
          width: 1rem;
          height: 1rem;
          accent-color: rgb(220 38 38);
        }
        .rjsf-light :global(.text-danger),
        .rjsf-light :global(.error-detail) {
          font-size: 0.75rem;
          color: rgb(220 38 38);
          margin-top: 0.25rem;
        }
        .rjsf-light :global(.required) {
          color: rgb(220 38 38);
          margin-left: 0.125rem;
        }
      `}</style>
    </div>
  );
}
