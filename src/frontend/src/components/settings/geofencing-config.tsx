'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Plus, Trash2, Pencil } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { FormField } from '@/components/ui/form-field';
import { useGeofencing, type GeofenceZone } from '@/hooks/use-geofencing';

type ZoneForm = {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  radius: string;
  isActive: boolean;
  assignedEmployeeCount: string;
};

const EMPTY_FORM: ZoneForm = {
  name: '',
  address: '',
  latitude: '',
  longitude: '',
  radius: '200',
  isActive: true,
  assignedEmployeeCount: '0',
};

export function GeofencingConfig() {
  const t = useTranslations('geofencing');
  const { zones, addZone, updateZone, deleteZone, toggleZoneActive } = useGeofencing();

  const [editingZone, setEditingZone] = useState<GeofenceZone | null>(null);
  const [zoneToDelete, setZoneToDelete] = useState<GeofenceZone | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState<ZoneForm>(EMPTY_FORM);

  const title = useMemo(() => (editingZone ? `${t('title')} - Edit` : `${t('title')} - Add`), [editingZone, t]);

  const openCreateModal = () => {
    setEditingZone(null);
    setForm(EMPTY_FORM);
    setOpenModal(true);
  };

  const openEditModal = (zone: GeofenceZone) => {
    setEditingZone(zone);
    setForm({
      name: zone.name,
      address: zone.address,
      latitude: String(zone.latitude),
      longitude: String(zone.longitude),
      radius: String(zone.radius),
      isActive: zone.isActive,
      assignedEmployeeCount: String(zone.assignedEmployeeCount),
    });
    setOpenModal(true);
  };

  const handleSave = async () => {
    const payload = {
      name: form.name.trim(),
      address: form.address.trim(),
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      radius: Number(form.radius),
      isActive: form.isActive,
      assignedEmployeeCount: Number(form.assignedEmployeeCount),
    };

    if (editingZone) {
      await updateZone(editingZone.id, payload);
    } else {
      await addZone(payload);
    }

    setOpenModal(false);
    setEditingZone(null);
    setForm(EMPTY_FORM);
  };

  const handleDelete = async () => {
    if (!zoneToDelete) return;
    await deleteZone(zoneToDelete.id);
    setZoneToDelete(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle>{t('title')}</CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('zones')}</p>
          </div>
          <Button onClick={openCreateModal}>
            <Plus className="h-4 w-4 mr-1" />
            {t('addZone')}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-5 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {zones.map((zone) => (
            <div key={zone.id} className="rounded-xl border dark:border-gray-700 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">{zone.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{zone.address}</p>
                </div>
                <Badge variant={zone.isActive ? 'success' : 'neutral'}>{zone.isActive ? 'Active' : 'Inactive'}</Badge>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('radius')}</p>
                  <p className="font-medium">{zone.radius} m</p>
                </div>
                <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('employees')}</p>
                  <p className="font-medium">{zone.assignedEmployeeCount}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-2 col-span-2">
                  <p className="text-xs text-gray-500">Coordinates</p>
                  <p className="font-medium text-sm">
                    <MapPin className="inline h-3.5 w-3.5 mr-1" />
                    {zone.latitude.toFixed(6)}, {zone.longitude.toFixed(6)}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => openEditModal(zone)}>
                  <Pencil className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" onClick={() => void toggleZoneActive(zone.id)}>
                  {zone.isActive ? 'Deactivate' : 'Activate'}
                </Button>
                <Button size="sm" variant="destructive" onClick={() => setZoneToDelete(zone)}>
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <Modal open={openModal} onClose={() => setOpenModal(false)} title={title}>
        <div className="space-y-3">
          <FormField label={t('addZone')} name="zoneName" value={form.name} onChange={(value) => setForm((prev) => ({ ...prev, name: value }))} required />
          <FormField label="Address" name="zoneAddress" value={form.address} onChange={(value) => setForm((prev) => ({ ...prev, address: value }))} required />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField label={t('latitude')} name="zoneLatitude" value={form.latitude} onChange={(value) => setForm((prev) => ({ ...prev, latitude: value }))} required />
            <FormField label={t('longitude')} name="zoneLongitude" value={form.longitude} onChange={(value) => setForm((prev) => ({ ...prev, longitude: value }))} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField label={t('radius')} name="zoneRadius" value={form.radius} onChange={(value) => setForm((prev) => ({ ...prev, radius: value }))} required />
            <FormField label={t('employees')} name="assignedEmployees" value={form.assignedEmployeeCount} onChange={(value) => setForm((prev) => ({ ...prev, assignedEmployeeCount: value }))} />
          </div>

          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(event) => setForm((prev) => ({ ...prev, isActive: event.target.checked }))}
              className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-brand focus:ring-brand"
            />
            Active
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button
              onClick={() => void handleSave()}
              disabled={!form.name.trim() || !form.address.trim() || !form.latitude || !form.longitude || !form.radius}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={!!zoneToDelete} onClose={() => setZoneToDelete(null)} title="Delete Zone">
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Are you sure you want to delete <span className="font-semibold">{zoneToDelete?.name}</span>?
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setZoneToDelete(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => void handleDelete()}>Delete</Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}
