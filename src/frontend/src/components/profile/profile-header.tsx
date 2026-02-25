'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Mail, Phone, Building, Edit, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { isHR } from '@/lib/rbac';
import { useAuthStore } from '@/stores/auth-store';

interface ProfileHeaderProps {
  employee: Record<string, unknown> | null;
  loading?: boolean;
  onEditProfile?: () => void;
  onViewOrgChart?: () => void;
}

const STATUS_VARIANT = {
  active: 'success',
  probation: 'warning',
  inactive: 'neutral',
  terminated: 'error',
} as const;

export function ProfileHeader({ employee, loading, onEditProfile, onViewOrgChart }: ProfileHeaderProps) {
  const t = useTranslations();
  const { roles } = useAuthStore();

  if (loading) {
    return (
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!employee) return null;

  const info = employee.personalInfo as Record<string, string>;
  const empInfo = employee.employmentInfo as Record<string, Record<string, string>>;
  const contact = employee.contactInfo as Record<string, string>;
  const photo = employee.photo as string;

  const fullNameEn = `${info?.firstNameEn || ''} ${info?.lastNameEn || ''}`.trim();
  const fullNameTh = `${info?.firstNameTh || ''} ${info?.lastNameTh || ''}`.trim();
  const position = empInfo?.organization?.position || '';
  const department = empInfo?.organization?.department || '';
  const location = empInfo?.organization?.workLocation || '';
  const status = empInfo?.job?.employeeStatus || 'active';

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden bg-cg-red flex items-center justify-center text-white text-2xl font-bold shrink-0 ring-2 ring-gray-100">
            {photo ? (
              <img src={photo} alt={fullNameEn} className="w-full h-full object-cover" />
            ) : (
              fullNameEn.substring(0, 2).toUpperCase()
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <h1 className="text-xl font-bold text-cg-dark truncate">{fullNameEn}</h1>
              <Badge variant={STATUS_VARIANT[status as keyof typeof STATUS_VARIANT] ?? 'neutral'}>
                {status}
              </Badge>
            </div>
            {fullNameTh && fullNameTh.trim() !== '' && (
              <p className="text-sm text-gray-500 mt-0.5">{fullNameTh}</p>
            )}
            <p className="text-sm text-gray-600">{position}</p>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Building className="h-3.5 w-3.5" />
                {department}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {location}
              </span>
              {contact?.businessEmail && (
                <span className="flex items-center gap-1 min-w-0">
                  <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate max-w-[200px]">{contact.businessEmail}</span>
                </span>
              )}
              {contact?.businessPhone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  {contact.businessPhone}
                </span>
              )}
            </div>
          </div>

          {/* Right side: Employee ID + Actions */}
          <div className="flex flex-col items-stretch sm:items-end gap-2 shrink-0 w-full sm:w-auto">
            <div className="text-right hidden sm:block">
              <span className="text-xs text-gray-400">{t('profile.employeeId')}</span>
              <p className="font-mono font-semibold text-cg-dark">{employee.employeeId as string}</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              {isHR(roles) && onEditProfile && (
                <Button variant="outline" size="sm" onClick={onEditProfile} className="flex-1 sm:flex-none">
                  <Edit className="mr-1.5 h-4 w-4" />
                  {t('common.edit')}
                </Button>
              )}
              {onViewOrgChart && (
                <Button variant="ghost" size="sm" onClick={onViewOrgChart} className="flex-1 sm:flex-none">
                  <Network className="mr-1.5 h-4 w-4" />
                  {t('employment.orgChart')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
