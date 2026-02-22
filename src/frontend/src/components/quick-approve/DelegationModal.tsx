'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus } from 'lucide-react';
import type { Delegation } from '@/lib/quick-approve-api';

const WORKFLOW_TYPE_OPTIONS = ['leave', 'overtime', 'claim', 'transfer', 'change_request'];

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
      className="max-w-xl"
    >
      <div className="space-y-5">
        {/* Active delegations */}
        <div>
          <h4 className="text-sm font-medium text-cg-dark mb-2">{t('activeDelegations')}</h4>
          {delegations.length === 0 ? (
            <p className="text-sm text-gray-400">{t('noDelegations')}</p>
          ) : (
            <ul className="space-y-2">
              {delegations.map((d) => (
                <li
                  key={d.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-cg-dark">{d.delegateTo.name}</p>
                    <p className="text-xs text-gray-500">
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
                  {d.status === 'active' && (
                    <button
                      onClick={() => onRevokeDelegation(d.id)}
                      className="p-1.5 rounded hover:bg-red-50 text-red-500 transition"
                      aria-label={t('revoke')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Create form */}
        {showForm ? (
          <div className="border rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-medium text-cg-dark">{t('createNew')}</h4>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                {t('delegateTo')}
              </label>
              <input
                type="text"
                value={delegateTo}
                onChange={(e) => setDelegateTo(e.target.value)}
                placeholder={t('delegateToPlaceholder')}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cg-red focus:ring-1 focus:ring-cg-red outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {t('startDate')}
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cg-red focus:ring-1 focus:ring-cg-red outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {t('endDate')}
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cg-red focus:ring-1 focus:ring-cg-red outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                {t('workflowTypes')}
              </label>
              <div className="flex flex-wrap gap-2">
                {WORKFLOW_TYPE_OPTIONS.map((wt) => (
                  <button
                    key={wt}
                    type="button"
                    onClick={() => toggleType(wt)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                      selectedTypes.includes(wt)
                        ? 'bg-cg-red text-white border-cg-red'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-cg-red'
                    }`}
                  >
                    {wt}
                  </button>
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
          <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-1.5" />
            {t('addDelegation')}
          </Button>
        )}
      </div>
    </Modal>
  );
}
