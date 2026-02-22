'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Briefcase, Building, UserCheck } from 'lucide-react';
import { SectionCard } from '../section-card';
import { DataGrid } from '../data-grid';
import { formatDate } from '@/lib/date';
import { Skeleton } from '@/components/ui/skeleton';

interface OrgChartNode {
  id: string;
  name: string;
  title: string;
  photo?: string;
}

interface EmploymentTabProps {
  employee: Record<string, unknown> | null;
  loading?: boolean;
}

export function EmploymentTab({ employee, loading }: EmploymentTabProps) {
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
                <div key={j}><Skeleton className="h-3 w-20 mb-2" /><Skeleton className="h-5 w-32" /></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!employee) return null;

  const empInfo = employee.employmentInfo as Record<string, Record<string, string>>;
  const orgChart = employee.orgChart as Record<string, unknown> | undefined;
  const details = empInfo?.details;
  const org = empInfo?.organization;
  const job = empInfo?.job;

  return (
    <div className="space-y-6">
      {/* Org Chart */}
      {orgChart && (
        <SectionCard title={t('employment.orgChart')} collapsible>
          <OrgChartMini orgChart={orgChart} />
        </SectionCard>
      )}

      {/* Employment Details */}
      {details && (
        <SectionCard title={t('employment.details')} icon={<Briefcase className="h-5 w-5" />}>
          <DataGrid
            items={[
              { label: t('employment.hireDate'), value: formatDate(details.hireDate, 'long', locale) },
              { label: t('employment.originalStartDate'), value: formatDate(details.originalStartDate, 'long', locale) },
              { label: t('employment.seniorityStartDate'), value: formatDate(details.seniorityStartDate, 'long', locale) },
              { label: t('employment.yearsOfService'), value: details.yearsOfService },
              { label: t('employment.passProbationDate'), value: formatDate(details.passProbationDate, 'long', locale) },
              { label: t('employment.currentJobEffectiveDate'), value: formatDate(details.currentJobEffectiveDate, 'long', locale) },
              { label: t('employment.currentYearsInJob'), value: details.currentYearsInJob },
              { label: t('employment.currentPositionEffective'), value: formatDate(details.currentPositionEffectiveDate, 'long', locale) },
              { label: t('employment.currentYearsInPosition'), value: details.currentYearsInPosition },
            ]}
          />
        </SectionCard>
      )}

      {/* Organization */}
      {org && (
        <SectionCard title={t('employment.organization')} icon={<Building className="h-5 w-5" />}>
          <DataGrid
            items={[
              { label: t('employment.company'), value: org.company },
              { label: t('employment.position'), value: org.position },
              { label: t('employment.group'), value: org.group },
              { label: t('employment.businessUnit'), value: org.businessUnit },
              { label: t('employment.function'), value: org.function },
              { label: t('employment.department'), value: org.department },
              { label: t('employment.storeBranchCode'), value: org.storeBranchCode },
              { label: t('employment.hrDistrict'), value: org.hrDistrict },
              { label: t('employment.costCenter'), value: org.costCenter },
              { label: t('employment.workLocation'), value: org.workLocation },
            ]}
          />
        </SectionCard>
      )}

      {/* Job Info */}
      {job && (
        <SectionCard title={t('employment.job')} icon={<UserCheck className="h-5 w-5" />}>
          <DataGrid
            items={[
              { label: t('employment.employeeStatus'), value: job.employeeStatus },
              { label: t('employment.supervisor'), value: job.supervisorName },
              { label: t('employment.country'), value: job.country },
              { label: t('employment.jobFamily'), value: job.jobFamily },
              { label: t('employment.jobCode'), value: job.jobCode },
              { label: t('employment.jobRole'), value: job.jobRole },
              { label: t('employment.jobType'), value: job.jobType },
              { label: t('employment.employeeGroup'), value: job.employeeGroup },
              { label: t('employment.contractType'), value: job.contractType },
            ]}
          />
        </SectionCard>
      )}
    </div>
  );
}

/* Mini Org Chart Component */
function OrgChartMini({ orgChart }: { orgChart: Record<string, unknown> }) {
  const supervisor = orgChart.supervisor as OrgChartNode | undefined;
  const emp = orgChart.employee as OrgChartNode | undefined;
  const directReports = orgChart.directReports as OrgChartNode[] | undefined;

  const renderNode = (node: OrgChartNode, highlight = false) => (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${highlight ? 'border-cg-red bg-cg-red/5' : 'border-gray-200 bg-white'}`}>
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
        {node.photo ? (
          <img src={node.photo} alt={node.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm font-medium text-gray-500">
            {node.name.substring(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{node.name}</p>
        <p className="text-xs text-gray-500 truncate">{node.title}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Supervisor */}
      {supervisor && (
        <>
          <div className="w-full max-w-xs">{renderNode(supervisor)}</div>
          <div className="w-px h-6 bg-gray-300" />
        </>
      )}

      {/* Current Employee */}
      {emp && <div className="w-full max-w-xs">{renderNode(emp, true)}</div>}

      {/* Direct Reports */}
      {directReports && directReports.length > 0 && (
        <>
          <div className="w-px h-6 bg-gray-300" />
          <div className="flex flex-wrap justify-center gap-3 w-full">
            {directReports.map((dr) => (
              <div key={dr.id} className="w-full max-w-[200px]">{renderNode(dr)}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
