'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { User, Phone, MapPin, AlertTriangle, Users, Shield } from 'lucide-react';
import { FieldGroup } from '@/components/ui/field-group';
import { Field } from '@/components/ui/field';
import { Badge } from '@/components/ui/badge';
import { formatDate, maskValue } from '@/lib/date';
import { Skeleton } from '@/components/ui/skeleton';
import { EffectiveDateGate } from '@/components/profile/EffectiveDateGate';
import { EditPencilButton } from '@/components/profile/EditPencilButton';

interface PersonalInfoTabProps {
 employee: Record<string, unknown> | null;
 loading?: boolean;
}

export function PersonalInfoTab({ employee, loading }: PersonalInfoTabProps) {
 const t = useTranslations();
 const pathname = usePathname();
 const locale = pathname.startsWith('/th') ?'th' :'en';
 const [editingSection, setEditingSection] = useState<string | null>(null);

 if (loading) {
 return (
 <div className="space-y-6">
 {[1, 2, 3].map((i) => (
 <div key={i} className="rounded-md bg-surface shadow-card p-6">
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
 {/* EffectiveDateGate — Personal Information */}
 <EffectiveDateGate
 open={editingSection ==='personal-info'}
 onClose={() => setEditingSection(null)}
 onConfirm={(date, values) => {
 // parent page.tsx wires submitChangeRequest — this tab just closes gate
 void date;
 void values;
 setEditingSection(null);
 }}
 sectionTitle={t('personal.basicInfo')}
 >
 {(effectiveDate) => (
 <div className="space-y-3">
 <p className="text-xs text-ink-muted font-mono">
 Effective: {effectiveDate.toLocaleDateString()}
 </p>
 <p className="text-sm text-ink-muted">
 แก้ไขข้อมูลที่หน้าโปรไฟล์หลัก (use main profile page)
 </p>
 </div>
 )}
 </EffectiveDateGate>

 {/* ข้อมูลส่วนตัว */}
 <FieldGroup
 title={t('personal.basicInfo')}
 icon={<User className="h-5 w-5" />}
 action={<EditPencilButton onClick={() => setEditingSection('personal-info')} />}
 >
 <Field label={t('personal.salutation')} value={locale ==='th' ? info.salutationTh : info.salutationEn} />
 <Field label={t('personal.firstName')} value={locale ==='th' ? info.firstNameTh : info.firstNameEn} />
 <Field label={t('personal.lastName')} value={locale ==='th' ? info.lastNameTh : info.lastNameEn} />
 <Field label={t('personal.nickname')} value={info.nickname} />
 <Field label={t('personal.gender')} value={info.gender ? t(`gender.${info.gender}`) : undefined} />
 <Field label={t('personal.dateOfBirth')} value={formatDate(info.dateOfBirth,'long', locale)} mono />
 <Field label={t('personal.nationality')} value={info.nationality} />
 <Field label={t('personal.nationalId')} value={maskValue(info.nationalId)} mono />
 <Field label={t('personal.maritalStatus')} value={info.maritalStatus ? t(`maritalStatus.${info.maritalStatus}`) : undefined} />
 <Field label={t('personal.maritalStatusSince')} value={formatDate(info.maritalStatusSince,'long', locale)} mono />
 <Field label={t('personal.salutationEn')} value={info.salutationEn} />
 <Field label={t('personal.salutationTh')} value={info.salutationTh} />
 <Field label={t('personal.otherTitleTh')} value={info.otherTitleTh} />
 <Field label={t('personal.middleNameEn')} value={info.middleNameEn} />
 <Field label={t('personal.lastNameTh')} value={info.lastNameTh} />
 </FieldGroup>

 {/* ช่องทางติดต่อ */}
 <FieldGroup title={t('personal.contact')} icon={<Phone className="h-5 w-5" />}>
 <Field label={t('personal.businessEmail')} value={contact.businessEmail} />
 <Field label={t('personal.personalEmail')} value={contact.personalEmail} />
 <Field label={t('personal.businessPhone')} value={contact.businessPhone} mono />
 <Field label={t('personal.personalMobile')} value={contact.personalMobile} mono />
 <Field label={t('personal.homePhone')} value={contact.homePhone} mono />
 </FieldGroup>

 {/* ที่อยู่ */}
 <FieldGroup title={t('personal.address')} icon={<MapPin className="h-5 w-5" />} collapsible columns={1}>
 {addresses?.map((addr) => (
 <div key={addr.id} className="py-3">
 <h4 className="text-sm font-medium text-ink mb-1">
 {addr.addressType ==='permanent' ? t('personal.permanentAddress') : t('personal.currentAddress')}
 </h4>
 <p className="text-sm text-ink-soft">
 {addr.addressLine1}
 {addr.addressLine2 && <>, {addr.addressLine2}</>}
 </p>
 <p className="text-sm text-ink-soft">
 {addr.subDistrict}, {addr.district}, {addr.province} {addr.postalCode}
 </p>
 <p className="text-sm text-ink-muted">{addr.country}</p>
 </div>
 ))}
 </FieldGroup>

 {/* ผู้ติดต่อฉุกเฉิน */}
 <FieldGroup title={t('personal.emergencyContacts')} icon={<AlertTriangle className="h-5 w-5" />} collapsible columns={1}>
 {emergencyContacts?.map((ec) => (
 <div key={ec.id as string} className="flex items-center justify-between py-3 border-b border-hairline last:border-b-0">
 <div>
 <p className="text-sm font-medium text-ink">{ec.name as string}</p>
 <p className="text-sm text-ink-muted">
 {t(`relationship.${ec.relationship as string}`)} · {ec.phone as string}
 </p>
 </div>
 {(ec.isPrimary as boolean) && (
 <Badge variant="info">
 {t('personal.primary')}
 </Badge>
 )}
 </div>
 ))}
 </FieldGroup>

 {/* ผู้อยู่ในอุปการะ */}
 <FieldGroup title={t('personal.dependents')} icon={<Users className="h-5 w-5" />} collapsible columns={1}>
 {dependents?.map((dep) => (
 <div key={dep.id} className="flex items-center justify-between py-3 border-b border-hairline last:border-b-0">
 <div>
 <p className="text-sm font-medium text-ink">{dep.name}</p>
 <p className="text-sm text-ink-muted">
 {t(`relationship.${dep.relationship}`)} · {formatDate(dep.dateOfBirth,'medium', locale)}
 </p>
 </div>
 </div>
 ))}
 </FieldGroup>

 {/* ใบอนุญาตทำงาน */}
 {workPermit && (
 <FieldGroup title={t('personal.workPermit')} icon={<Shield className="h-5 w-5" />} collapsible>
 <Field label={t('personal.permitNumber')} value={workPermit.permitNumber} mono />
 <Field label={t('personal.permitType')} value={workPermit.permitType ? t(`visaType.${workPermit.permitType}`) : undefined} />
 <Field label={t('personal.issueDate')} value={formatDate(workPermit.issueDate,'long', locale)} mono />
 <Field label={t('personal.expiryDate')} value={formatDate(workPermit.expiryDate,'long', locale)} mono />
 <Field label={t('personal.issuingAuthority')} value={workPermit.issuingAuthority} />
 <Field
 label={t('personal.permitStatus')}
 value={
 <Badge variant={
 workPermit.status ==='active' ?'success' :
 workPermit.status ==='expiring' ?'warning' :'error'
 }>
 {workPermit.status ==='active' ? t('personal.statusActive') :
 workPermit.status ==='expiring' ? t('personal.statusExpiring') :
 t('personal.statusExpired')}
 </Badge>
 }
 />
 </FieldGroup>
 )}

 {/* ข้อมูลเพิ่มเติม */}
 {advancedInfo && (
 <FieldGroup title={t('personal.advancedInfo')} collapsible defaultOpen={false}>
 <Field label={t('personal.religion')} value={advancedInfo.religion ? t(`religion.${advancedInfo.religion}`) : undefined} />
 <Field label={t('personal.bloodType')} value={advancedInfo.bloodType || undefined} />
 <Field label={t('personal.militaryStatus')} value={advancedInfo.militaryStatus ? t(`militaryStatus.${advancedInfo.militaryStatus}`) : undefined} />
 </FieldGroup>
 )}
 </div>
 );
}
