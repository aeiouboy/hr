'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { User, Phone, MapPin, AlertTriangle, Users, Shield } from 'lucide-react';
import { SectionCard } from '../section-card';
import { DataGrid } from '../data-grid';
import { formatDate, maskValue } from '@/lib/date';
import { Skeleton } from '@/components/ui/skeleton';

interface PersonalInfoTabProps {
  employee: Record<string, unknown> | null;
  loading?: boolean;
}

export function PersonalInfoTab({ employee, loading }: PersonalInfoTabProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.startsWith('/th') ? 'th' : 'en';

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((j) => (
                <div key={j}>
                  <Skeleton className="h-3 w-20 mb-2" />
                  <Skeleton className="h-5 w-32" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!employee) return null;

  const info = employee.personalInfo as Record<string, string>;
  const contact = employee.contactInfo as Record<string, string>;
  const addresses = employee.addresses as Record<string, string>[];
  const emergencyContacts = employee.emergencyContacts as Record<string, unknown>[];
  const dependents = employee.dependents as Record<string, string>[];
  const workPermit = employee.workPermit as Record<string, string> | undefined;
  const advancedInfo = employee.advancedInfo as Record<string, string> | undefined;

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <SectionCard title={t('personal.basicInfo')} icon={<User className="h-5 w-5" />}>
        <DataGrid
          items={[
            { label: t('personal.salutation'), value: locale === 'th' ? info.salutationTh : info.salutationEn },
            { label: t('personal.firstName'), value: locale === 'th' ? info.firstNameTh : info.firstNameEn },
            { label: t('personal.lastName'), value: locale === 'th' ? info.lastNameTh : info.lastNameEn },
            { label: t('personal.nickname'), value: info.nickname },
            { label: t('personal.gender'), value: info.gender ? t(`gender.${info.gender}`) : '-' },
            { label: t('personal.dateOfBirth'), value: formatDate(info.dateOfBirth, 'long', locale) },
            { label: t('personal.nationality'), value: info.nationality },
            { label: t('personal.nationalId'), value: maskValue(info.nationalId) },
            { label: t('personal.maritalStatus'), value: info.maritalStatus ? t(`maritalStatus.${info.maritalStatus}`) : '-' },
            { label: t('personal.maritalStatusSince'), value: formatDate(info.maritalStatusSince, 'long', locale) },
          ]}
        />
      </SectionCard>

      {/* Contact Info */}
      <SectionCard title={t('personal.contact')} icon={<Phone className="h-5 w-5" />}>
        <DataGrid
          items={[
            { label: t('personal.businessEmail'), value: contact.businessEmail },
            { label: t('personal.personalEmail'), value: contact.personalEmail },
            { label: t('personal.businessPhone'), value: contact.businessPhone },
            { label: t('personal.personalMobile'), value: contact.personalMobile },
            { label: t('personal.homePhone'), value: contact.homePhone },
          ]}
        />
      </SectionCard>

      {/* Addresses */}
      <SectionCard title={t('personal.address')} icon={<MapPin className="h-5 w-5" />} collapsible>
        <div className="space-y-4">
          {addresses?.map((addr) => (
            <div key={addr.id} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                {addr.addressType === 'permanent' ? t('personal.permanentAddress') : t('personal.currentAddress')}
              </h4>
              <p className="text-sm text-gray-600">
                {addr.addressLine1}
                {addr.addressLine2 && <>, {addr.addressLine2}</>}
              </p>
              <p className="text-sm text-gray-600">
                {addr.subDistrict}, {addr.district}, {addr.province} {addr.postalCode}
              </p>
              <p className="text-sm text-gray-500">{addr.country}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Emergency Contacts */}
      <SectionCard title={t('personal.emergencyContacts')} icon={<AlertTriangle className="h-5 w-5" />} collapsible>
        <div className="space-y-3">
          {emergencyContacts?.map((ec) => (
            <div key={ec.id as string} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{ec.name as string}</p>
                <p className="text-sm text-gray-500">
                  {t(`relationship.${ec.relationship as string}`)} &middot; {ec.phone as string}
                </p>
              </div>
              {ec.isPrimary ? (
                <span className="text-xs bg-cg-red/10 text-cg-red px-2 py-1 rounded-full font-medium">
                  {t('personal.primary')}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Dependents */}
      <SectionCard title={t('personal.dependents')} icon={<Users className="h-5 w-5" />} collapsible>
        <div className="space-y-3">
          {dependents?.map((dep) => (
            <div key={dep.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{dep.name}</p>
                <p className="text-sm text-gray-500">
                  {t(`relationship.${dep.relationship}`)} &middot; {formatDate(dep.dateOfBirth, 'medium', locale)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Work Permit */}
      {workPermit && (
        <SectionCard title={t('personal.workPermit')} icon={<Shield className="h-5 w-5" />} collapsible>
          <DataGrid
            items={[
              { label: t('personal.permitNumber'), value: workPermit.permitNumber },
              { label: t('personal.permitType'), value: workPermit.permitType ? t(`visaType.${workPermit.permitType}`) : '-' },
              { label: t('personal.issueDate'), value: formatDate(workPermit.issueDate, 'long', locale) },
              { label: t('personal.expiryDate'), value: formatDate(workPermit.expiryDate, 'long', locale) },
              { label: t('personal.issuingAuthority'), value: workPermit.issuingAuthority },
              {
                label: t('personal.permitStatus'),
                value: (
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    workPermit.status === 'active' ? 'bg-green-100 text-green-800' :
                    workPermit.status === 'expiring' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {workPermit.status === 'active' ? t('personal.statusActive') :
                     workPermit.status === 'expiring' ? t('personal.statusExpiring') :
                     t('personal.statusExpired')}
                  </span>
                ),
              },
            ]}
          />
        </SectionCard>
      )}

      {/* Advanced Info */}
      {advancedInfo && (
        <SectionCard title={t('personal.advancedInfo')} collapsible defaultOpen={false}>
          <DataGrid
            items={[
              { label: t('personal.religion'), value: advancedInfo.religion ? t(`religion.${advancedInfo.religion}`) : '-' },
              { label: t('personal.bloodType'), value: advancedInfo.bloodType || '-' },
              { label: t('personal.militaryStatus'), value: advancedInfo.militaryStatus ? t(`militaryStatus.${advancedInfo.militaryStatus}`) : '-' },
            ]}
          />
        </SectionCard>
      )}
    </div>
  );
}
