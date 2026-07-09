// VALIDATION_EXEMPT: display/admin landing — filter chips + action buttons only, no data submit form (per design-gates Track C 2026-04-26)
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Modal, Button, FormField, FormInput } from '@/components/humi';
import { Badge } from '@/components/humi/atoms/badge';
import { Trash2, Plus } from 'lucide-react';
import type { Delegation } from '@/lib/quick-approve-api';

const WORKFLOW_TYPE_OPTIONS = ['leave','overtime','claim','transfer','change_request'];

interface DelegationModalProps {
 open: boolean;
 onClose: () => void;
 delegations: Delegation[];
 onCreateDelegation: (data: {
 delegate_to: string;
 start_date: string;
 end_date: string;
 workflow_types: string[];
 }) => Promise<void>;
 onRevokeDelegation: (id: string) => Promise<void>;
}

export function DelegationModal({
 open,
 onClose,
 delegations,
 onCreateDelegation,
 onRevokeDelegation,
}: DelegationModalProps) {
 const t = useTranslations('quickApprove.delegation');
 const [showForm, setShowForm] = useState(false);
 const [delegateTo, setDelegateTo] = useState('');
 const [startDate, setStartDate] = useState('');
 const [endDate, setEndDate] = useState('');
 const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
 const [submitting, setSubmitting] = useState(false);

 const resetForm = () => {
 setDelegateTo('');
 setStartDate('');
 setEndDate('');
 setSelectedTypes([]);
 setShowForm(false);
 };

 const handleCreate = async () => {
 if (!delegateTo || !startDate || !endDate || selectedTypes.length === 0) return;
 setSubmitting(true);
 try {
 await onCreateDelegation({
 delegate_to: delegateTo,
 start_date: startDate,
 end_date: endDate,
 workflow_types: selectedTypes,
 });
 resetForm();
 } finally {
 setSubmitting(false);
 }
 };

 const toggleType = (type: string) => {
 setSelectedTypes((prev) =>
 prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
 );
 };

 return (
 <Modal
 open={open}
 onClose={onClose}
 title={t('title')}
 widthClass="max-w-xl"
 >
 <div className="space-y-5">
 {/* Active delegations */}
 <div>
 <h4 className="text-sm font-medium text-ink mb-2">{t('activeDelegations')}</h4>
 {delegations.length === 0 ? (
 <p className="text-sm text-ink-muted">{t('noDelegations')}</p>
 ) : (
 <ul className="space-y-2">
 {delegations.map((d) => (
 <li
 key={d.id}
 className="flex items-center justify-between p-3 bg-surface-raised rounded-md"
 >
 <div>
 <p className="text-sm font-medium text-ink">{d.delegateTo.name}</p>
 <p className="text-xs text-ink-muted">
 {d.startDate} — {d.endDate}
 </p>
 <div className="flex gap-1 mt-1 flex-wrap">
 {d.workflowTypes.map((wt) => (
 <Badge key={wt} variant="info">
 {wt}
 </Badge>
 ))}
 </div>
 </div>
 {d.status ==='active' && (
 <Button
 variant="ghost"
 size="sm"
 onClick={() => onRevokeDelegation(d.id)}
 aria-label={t('revoke')}
 className="!p-2 hover:bg-danger-tint text-danger"
 >
 <Trash2 className="h-4 w-4" />
 </Button>
 )}
 </li>
 ))}
 </ul>
 )}
 </div>

 {/* Create form */}
 {showForm ? (
 <div className="border border-hairline rounded-md p-4 space-y-3">
 <h4 className="text-sm font-medium text-ink">{t('createNew')}</h4>

 <FormField label={t('delegateTo')}>
 {(ctrl) => (
 <FormInput
 {...ctrl}
 type="text"
 value={delegateTo}
 onChange={(e) => setDelegateTo(e.target.value)}
 placeholder={t('delegateToPlaceholder')}
 />
 )}
 </FormField>

 <div className="grid grid-cols-2 gap-3">
 <FormField label={t('startDate')}>
 {(ctrl) => (
 <FormInput
 {...ctrl}
 type="date"
 value={startDate}
 onChange={(e) => setStartDate(e.target.value)}
 />
 )}
 </FormField>
 <FormField label={t('endDate')}>
 {(ctrl) => (
 <FormInput
 {...ctrl}
 type="date"
 value={endDate}
 onChange={(e) => setEndDate(e.target.value)}
 />
 )}
 </FormField>
 </div>

 <div>
 <label className="block text-xs font-medium text-ink-muted mb-1">
 {t('workflowTypes')}
 </label>
 <div className="flex flex-wrap gap-2">
 {WORKFLOW_TYPE_OPTIONS.map((wt) => (
 <Button
 key={wt}
 type="button"
 size="sm"
 variant={selectedTypes.includes(wt) ? 'primary' : 'ghost'}
 onClick={() => toggleType(wt)}
 className="rounded-full"
 >
 {wt}
 </Button>
 ))}
 </div>
 </div>

 <div className="flex justify-end gap-2 pt-1">
 <Button variant="secondary" size="sm" onClick={resetForm}>
 {t('cancel')}
 </Button>
 <Button
 size="sm"
 onClick={handleCreate}
 disabled={submitting || !delegateTo || !startDate || !endDate || selectedTypes.length === 0}
 >
 {submitting ? t('creating') : t('create')}
 </Button>
 </div>
 </div>
 ) : (
 <Button variant="secondary" size="sm" onClick={() => setShowForm(true)}>
 <Plus className="h-4 w-4 mr-1.5" />
 {t('addDelegation')}
 </Button>
 )}
 </div>
 </Modal>
 );
}
