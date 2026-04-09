'use client';

import { useState, useCallback } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmptyValue } from './empty-value';

type EmptyKind ='unknown' |'not-applicable' |'restricted' |'pending';

interface FieldProps {
 label: string;
 value?: React.ReactNode;
 /** Format hint for display — tabular-nums for numeric/date/currency */
 mono?: boolean;
 /** Show edit affordance on hover */
 editable?: boolean;
 /** Callback when inline edit is confirmed */
 onSave?: (value: string) => void | Promise<void>;
 /** Icon slot (left of label) */
 icon?: React.ReactNode;
 /** Which empty state to show when value is falsy */
 emptyKind?: EmptyKind;
 /** Optional badge next to the value */
 badge?: React.ReactNode;
 /** Hide label (useful when value is self-describing like email/phone) */
 hideLabel?: boolean;
 className?: string;
}

export function Field({
 label,
 value,
 mono,
 editable,
 onSave,
 icon,
 emptyKind ='unknown',
 badge,
 hideLabel,
 className,
}: FieldProps) {
 const [editing, setEditing] = useState(false);
 const [draft, setDraft] = useState('');
 const [saving, setSaving] = useState(false);

 const startEdit = useCallback(() => {
 setDraft(typeof value ==='string' ? value :'');
 setEditing(true);
 }, [value]);

 const confirmEdit = useCallback(async () => {
 if (!onSave) return;
 setSaving(true);
 try {
 await onSave(draft);
 setEditing(false);
 } finally {
 setSaving(false);
 }
 }, [draft, onSave]);

 const cancelEdit = useCallback(() => {
 setEditing(false);
 }, []);

 const hasValue = value !== null && value !== undefined && value !=='' && value !=='-';

 return (
 <div
 className={cn(
'group flex items-center min-h-[48px] py-2',
'border-b border-hairline last:border-b-0',
 className,
 )}
 >
 {/* Label */}
 {!hideLabel && (
 <div className="flex items-center gap-1.5 w-[160px] shrink-0">
 {icon && <span className="text-ink-muted">{icon}</span>}
 <span className="text-sm text-ink-muted">{label}</span>
 </div>
 )}

 {/* Value */}
 <div className="flex-1 min-w-0 flex items-center gap-2">
 {editing ? (
 <div className="flex items-center gap-1.5 flex-1">
 <input
 type="text"
 value={draft}
 onChange={(e) => setDraft(e.target.value)}
 onKeyDown={(e) => {
 if (e.key ==='Enter') confirmEdit();
 if (e.key ==='Escape') cancelEdit();
 }}
 disabled={saving}
 autoFocus
 className={cn(
'flex-1 text-sm bg-surface-raised border border-hairline rounded-md px-2 py-1',
'text-ink outline-none focus:ring-1 focus:ring-accent',
 )}
 />
 <button
 onClick={confirmEdit}
 disabled={saving}
 className="p-1 text-success hover:bg-success-tint rounded-md"
 >
 <Check className="h-3.5 w-3.5" />
 </button>
 <button
 onClick={cancelEdit}
 className="p-1 text-ink-muted hover:bg-surface-raised rounded-md"
 >
 <X className="h-3.5 w-3.5" />
 </button>
 </div>
 ) : (
 <>
 {hasValue ? (
 <span className={cn(
'text-sm text-ink truncate',
 mono &&'font-mono tabular-nums',
 )}>
 {value}
 </span>
 ) : (
 <EmptyValue kind={emptyKind} />
 )}
 {badge}
 </>
 )}

 {/* Edit pencil — hover only */}
 {editable && !editing && (
 <button
 onClick={startEdit}
 className="ml-auto p-1 opacity-0 group-hover:opacity-100 transition-opacity text-ink-muted hover:text-accent"
 >
 <Pencil className="h-3.5 w-3.5" />
 </button>
 )}
 </div>
 </div>
 );
}
