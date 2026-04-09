'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { GraduationCap, Briefcase, Languages, Award, MapPin } from 'lucide-react';
import { FieldGroup } from '@/components/ui/field-group';
import { EmptyValue } from '@/components/ui/empty-value';
import { formatDate } from '@/lib/date';
import { Skeleton } from '@/components/ui/skeleton';

interface ProfileDetailsTabProps {
 employee: Record<string, unknown> | null;
 loading?: boolean;
}

export function ProfileDetailsTab({ employee, loading }: ProfileDetailsTabProps) {
 const t = useTranslations();
 const pathname = usePathname();
 const locale = pathname.startsWith('/th') ?'th' :'en';

 if (loading) {
 return (
 <div className="space-y-6">
 {[1, 2, 3, 4].map((i) => (
 <div key={i} className="bg-surface rounded-md border border-hairline p-6">
 <Skeleton className="h-6 w-40 mb-4" />
 <Skeleton className="h-20 w-full" />
 </div>
 ))}
 </div>
 );
 }

 if (!employee) return null;

 const details = employee.profileDetails as Record<string, unknown> | undefined;
 const education = (details?.education as Record<string, unknown>[]) || [];
 const prevEmployment = (details?.previousEmployment as Record<string, string>[]) || [];
 const languages = (details?.languages as Record<string, string>[]) || [];
 const certifications = (details?.certifications as Record<string, string>[]) || [];
 const awards = (details?.awards as Record<string, string>[]) || [];
 const mobility = details?.mobility as Record<string, unknown> | undefined;

 return (
 <div className="space-y-6">
 {/* Education */}
 <FieldGroup title={t('profileDetails.education')} icon={<GraduationCap className="h-5 w-5" />} collapsible columns={1}>
 {education.length === 0 ? (
 <div className="text-center py-4"><EmptyValue kind="not-applicable" /></div>
 ) : (
 <div className="space-y-3">
 {education.map((edu, i) => (
 <div key={i} className="flex items-start gap-4 p-4 bg-surface-raised rounded-md">
 <div className="p-2 bg-accent-tint rounded-md shrink-0">
 <GraduationCap className="h-5 w-5 text-accent" />
 </div>
 <div>
 <h4 className="font-medium text-ink">{edu.degree as string}</h4>
 <p className="text-sm text-ink-muted">{edu.institution as string}</p>
 <p className="text-sm text-ink-muted">{edu.major as string}</p>
 <p className="text-xs text-ink-muted mt-1">{t('profileDetails.graduationYear')}: {edu.graduationYear as number}</p>
 </div>
 </div>
 ))}
 </div>
 )}
 </FieldGroup>

 {/* Previous Employment */}
 <FieldGroup title={t('profileDetails.previousEmployment')} icon={<Briefcase className="h-5 w-5" />} collapsible columns={1}>
 {prevEmployment.length === 0 ? (
 <div className="text-center py-4"><EmptyValue kind="not-applicable" /></div>
 ) : (
 <div className="space-y-3">
 {prevEmployment.map((job, i) => (
 <div key={i} className="flex items-start gap-4 p-4 bg-surface-raised rounded-md">
 <div className="p-2 bg-info-tint rounded-md shrink-0">
 <Briefcase className="h-5 w-5 text-info" />
 </div>
 <div>
 <h4 className="font-medium text-ink">{job.jobTitle}</h4>
 <p className="text-sm text-ink-muted">{job.companyName}</p>
 <p className="text-xs text-ink-muted mt-1">
 {formatDate(job.startDate,'medium', locale)} - {formatDate(job.endDate,'medium', locale)}
 </p>
 </div>
 </div>
 ))}
 </div>
 )}
 </FieldGroup>

 {/* Languages */}
 <FieldGroup title={t('profileDetails.languages')} icon={<Languages className="h-5 w-5" />} collapsible columns={1}>
 {languages.length === 0 ? (
 <div className="text-center py-4"><EmptyValue kind="not-applicable" /></div>
 ) : (
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b border-hairline">
 <th className="text-left py-2 px-2 text-xs font-medium text-ink-muted">{t('profileDetails.language')}</th>
 <th className="text-left py-2 px-2 text-xs font-medium text-ink-muted">{t('profileDetails.reading')}</th>
 <th className="text-left py-2 px-2 text-xs font-medium text-ink-muted">{t('profileDetails.writing')}</th>
 <th className="text-left py-2 px-2 text-xs font-medium text-ink-muted">{t('profileDetails.speaking')}</th>
 </tr>
 </thead>
 <tbody>
 {languages.map((lang, i) => (
 <tr key={i} className="border-b border-hairline last:border-0">
 <td className="py-2 px-2 font-medium text-ink">{lang.language}</td>
 <td className="py-2 px-2 text-ink-muted">{lang.reading}</td>
 <td className="py-2 px-2 text-ink-muted">{lang.writing}</td>
 <td className="py-2 px-2 text-ink-muted">{lang.speaking}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}
 </FieldGroup>

 {/* Certifications */}
 <FieldGroup title={t('profileDetails.certifications')} collapsible columns={1}>
 {certifications.length === 0 ? (
 <div className="text-center py-4"><EmptyValue kind="not-applicable" /></div>
 ) : (
 <div className="space-y-3">
 {certifications.map((cert, i) => (
 <div key={i} className="p-4 bg-surface-raised rounded-md">
 <h4 className="font-medium text-ink">{cert.certName}</h4>
 <p className="text-sm text-ink-muted">{cert.issuer}</p>
 <p className="text-xs text-ink-muted mt-1">
 {formatDate(cert.issueDate,'medium', locale)} - {formatDate(cert.expiryDate,'medium', locale)}
 </p>
 </div>
 ))}
 </div>
 )}
 </FieldGroup>

 {/* Awards */}
 <FieldGroup title={t('profileDetails.awards')} icon={<Award className="h-5 w-5" />} collapsible columns={1}>
 {awards.length === 0 ? (
 <div className="text-center py-4"><EmptyValue kind="not-applicable" /></div>
 ) : (
 <div className="space-y-3">
 {awards.map((award, i) => (
 <div key={i} className="flex items-center gap-4 p-4 bg-surface-raised rounded-md">
 <div className="p-2 bg-warning-tint rounded-md shrink-0">
 <Award className="h-5 w-5 text-warning" />
 </div>
 <div>
 <h4 className="font-medium text-ink">{award.awardName}</h4>
 <p className="text-xs text-ink-muted">{formatDate(award.awardDate,'medium', locale)}</p>
 </div>
 </div>
 ))}
 </div>
 )}
 </FieldGroup>

 {/* Mobility */}
 {mobility && (
 <FieldGroup title={t('profileDetails.mobility')} icon={<MapPin className="h-5 w-5" />} collapsible defaultOpen={false} columns={1}>
 <div className="space-y-2">
 <p className="text-sm">
 <span className="text-ink-muted">{t('profileDetails.willingToRelocate')}:</span>{' '}
 <span className="font-medium">{mobility.willingToRelocate ? t('common.yes') : t('common.no')}</span>
 </p>
 {(mobility.preferredLocations as string[])?.length > 0 && (
 <div>
 <span className="text-sm text-ink-muted">{t('profileDetails.preferredLocations')}:</span>
 <div className="flex flex-wrap gap-2 mt-1">
 {(mobility.preferredLocations as string[]).map((loc) => (
 <span key={loc} className="text-xs bg-surface-raised text-ink-soft px-2 py-1 rounded-full">{loc}</span>
 ))}
 </div>
 </div>
 )}
 </div>
 </FieldGroup>
 )}
 </div>
 );
}
