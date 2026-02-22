'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { GraduationCap, Briefcase, Languages, Award, MapPin } from 'lucide-react';
import { SectionCard } from '../section-card';
import { formatDate } from '@/lib/date';
import { Skeleton } from '@/components/ui/skeleton';

interface ProfileDetailsTabProps {
  employee: Record<string, unknown> | null;
  loading?: boolean;
}

export function ProfileDetailsTab({ employee, loading }: ProfileDetailsTabProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.startsWith('/th') ? 'th' : 'en';

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl border p-6">
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
      <SectionCard title={t('profileDetails.education')} icon={<GraduationCap className="h-5 w-5" />} collapsible>
        {education.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">{t('common.noData')}</p>
        ) : (
          <div className="space-y-3">
            {education.map((edu, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{edu.degree as string}</h4>
                  <p className="text-sm text-gray-600">{edu.institution as string}</p>
                  <p className="text-sm text-gray-500">{edu.major as string}</p>
                  <p className="text-xs text-gray-400 mt-1">{t('profileDetails.graduationYear')}: {edu.graduationYear as number}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Previous Employment */}
      <SectionCard title={t('profileDetails.previousEmployment')} icon={<Briefcase className="h-5 w-5" />} collapsible>
        {prevEmployment.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">{t('common.noData')}</p>
        ) : (
          <div className="space-y-3">
            {prevEmployment.map((job, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-2 bg-purple-100 rounded-lg shrink-0">
                  <Briefcase className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{job.jobTitle}</h4>
                  <p className="text-sm text-gray-600">{job.companyName}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(job.startDate, 'medium', locale)} - {formatDate(job.endDate, 'medium', locale)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Languages */}
      <SectionCard title={t('profileDetails.languages')} icon={<Languages className="h-5 w-5" />} collapsible>
        {languages.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">{t('common.noData')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 text-xs font-medium text-gray-400 uppercase">{t('profileDetails.language')}</th>
                  <th className="text-left py-2 px-2 text-xs font-medium text-gray-400 uppercase">{t('profileDetails.reading')}</th>
                  <th className="text-left py-2 px-2 text-xs font-medium text-gray-400 uppercase">{t('profileDetails.writing')}</th>
                  <th className="text-left py-2 px-2 text-xs font-medium text-gray-400 uppercase">{t('profileDetails.speaking')}</th>
                </tr>
              </thead>
              <tbody>
                {languages.map((lang, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2 px-2 font-medium text-gray-900">{lang.language}</td>
                    <td className="py-2 px-2 text-gray-600">{lang.reading}</td>
                    <td className="py-2 px-2 text-gray-600">{lang.writing}</td>
                    <td className="py-2 px-2 text-gray-600">{lang.speaking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      {/* Certifications */}
      <SectionCard title={t('profileDetails.certifications')} collapsible>
        {certifications.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">{t('common.noData')}</p>
        ) : (
          <div className="space-y-3">
            {certifications.map((cert, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">{cert.certName}</h4>
                <p className="text-sm text-gray-600">{cert.issuer}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(cert.issueDate, 'medium', locale)} - {formatDate(cert.expiryDate, 'medium', locale)}
                </p>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Awards */}
      <SectionCard title={t('profileDetails.awards')} icon={<Award className="h-5 w-5" />} collapsible>
        {awards.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">{t('common.noData')}</p>
        ) : (
          <div className="space-y-3">
            {awards.map((award, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-2 bg-yellow-100 rounded-lg shrink-0">
                  <Award className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{award.awardName}</h4>
                  <p className="text-xs text-gray-400">{formatDate(award.awardDate, 'medium', locale)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Mobility */}
      {mobility && (
        <SectionCard title={t('profileDetails.mobility')} icon={<MapPin className="h-5 w-5" />} collapsible defaultOpen={false}>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="text-gray-500">{t('profileDetails.willingToRelocate')}:</span>{' '}
              <span className="font-medium">{mobility.willingToRelocate ? t('common.yes') : t('common.no')}</span>
            </p>
            {(mobility.preferredLocations as string[])?.length > 0 && (
              <div>
                <span className="text-sm text-gray-500">{t('profileDetails.preferredLocations')}:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(mobility.preferredLocations as string[]).map((loc) => (
                    <span key={loc} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{loc}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      )}
    </div>
  );
}
