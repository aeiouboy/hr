'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Briefcase, Building, UserCheck } from 'lucide-react';
import { FieldGroup } from '@/components/ui/field-group';
import { Field } from '@/components/ui/field';
import { Card } from '@/components/humi';
import { formatDate } from '@/lib/date';
import { Skeleton } from '@/components/ui/skeleton';
import { EffectiveDateGate } from '@/components/profile/EffectiveDateGate';
import { EditPencilButton } from '@/components/profile/EditPencilButton';

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
 {/* EffectiveDateGate — Employment Details */}
 <EffectiveDateGate
 open={editingSection ==='employment-details'}
 onClose={() => setEditingSection(null)}
 onConfirm={(date, values) => {
 console.log('Employment Details save:', { date, values });
 setEditingSection(null);
 }}
 sectionTitle={t('employment.details')}
 >
 {(effectiveDate) => (
 <div className="space-y-2">
 <p className="text-sm text-ink-muted">
 {/* Sprint 3 จะ build form fields จริง */}
 Edit form coming in Sprint 3
 </p>
 <p className="text-xs text-ink-muted font-mono">
 Effective: {effectiveDate.toLocaleDateString()}
 </p>
 </div>
 )}
 </EffectiveDateGate>

 {/* Org Chart */}
 {orgChart && (
 <Card>
 <div className="overflow-hidden">
 <div className="px-6 py-4 border-l-2 border-accent">
 <h3 className="text-sm font-semibold text-ink">{t('employment.orgChart')}</h3>
 </div>
 <div className="px-6 pb-4">
 <OrgChartMini orgChart={orgChart} />
 </div>
 </div>
 </Card>
 )}

 {/* รายละเอียดการจ้างงาน */}
 {details && (
 <FieldGroup
 title={t('employment.details')}
 icon={<Briefcase className="h-5 w-5" />}
 action={<EditPencilButton onClick={() => setEditingSection('employment-details')} />}
 >
 <Field label={t('employment.hireDate')} value={formatDate(details.hireDate,'long', locale)} mono />
 <Field label={t('employment.originalStartDate')} value={formatDate(details.originalStartDate,'long', locale)} mono />
 <Field label={t('employment.seniorityStartDate')} value={formatDate(details.seniorityStartDate,'long', locale)} mono />
 <Field label={t('employment.yearsOfService')} value={details.yearsOfService} />
 <Field label={t('employment.passProbationDate')} value={formatDate(details.passProbationDate,'long', locale)} mono />
 <Field label={t('employment.corporateTitle')} value={details.corporateTitle} />
 <Field label={t('employment.currentJobEffectiveDate')} value={formatDate(details.currentJobEffectiveDate,'long', locale)} mono />
 <Field label={t('employment.currentYearsInJob')} value={details.currentYearsInJob} />
 <Field label={t('employment.currentPositionEffective')} value={formatDate(details.currentPositionEffectiveDate,'long', locale)} mono />
 <Field label={t('employment.currentYearsInPosition')} value={details.currentYearsInPosition} />
 </FieldGroup>
 )}

 {/* หน่วยงาน */}
 {org && (
 <FieldGroup title={t('employment.organization')} icon={<Building className="h-5 w-5" />}>
 <Field label={t('employment.company')} value={org.company} />
 <Field label={t('employment.position')} value={org.position} />
 <Field label={t('employment.group')} value={org.group} />
 <Field label={t('employment.businessUnit')} value={org.businessUnit} />
 <Field label={t('employment.function')} value={org.function} />
 <Field label={t('employment.department')} value={org.department} />
 <Field label={t('employment.storeBranchCode')} value={org.storeBranchCode} mono />
 <Field label={t('employment.hrDistrict')} value={org.hrDistrict} />
 <Field label={t('employment.costCenter')} value={org.costCenter} mono />
 <Field label={t('employment.workLocation')} value={org.workLocation} />
 </FieldGroup>
 )}

 {/* ข้อมูลตำแหน่ง */}
 {job && (
 <FieldGroup title={t('employment.job')} icon={<UserCheck className="h-5 w-5" />}>
 <Field label={t('employment.employeeStatus')} value={job.employeeStatus} />
 <Field label={t('employment.supervisor')} value={job.supervisorName} />
 <Field label={t('employment.country')} value={job.country} />
 <Field label={t('employment.jobFamily')} value={job.jobFamily} />
 <Field label={t('employment.jobCode')} value={job.jobCode} mono />
 <Field label={t('employment.jobRole')} value={job.jobRole} />
 <Field label={t('employment.jobType')} value={job.jobType} />
 <Field label={t('employment.employeeGroup')} value={job.employeeGroup} />
 <Field label={t('employment.contractType')} value={job.contractType} />
 </FieldGroup>
 )}
 </div>
 );
}

/* Mini Org Chart — tokenized */
function OrgChartMini({ orgChart }: { orgChart: Record<string, unknown> }) {
 const supervisor = orgChart.supervisor as OrgChartNode | undefined;
 const emp = orgChart.employee as OrgChartNode | undefined;
 const directReports = orgChart.directReports as OrgChartNode[] | undefined;

 const renderNode = (node: OrgChartNode, highlight = false) => (
 <div className={`flex items-center gap-3 p-3 rounded-md border ${highlight ?'border-accent bg-accent-tint' :'border-hairline bg-surface'}`}>
 <div className="w-10 h-10 rounded-md overflow-hidden bg-surface-raised shrink-0">
 {node.photo ? (
 <img src={node.photo} alt={node.name} className="w-full h-full object-cover" />
 ) : (
 <div className="w-full h-full flex items-center justify-center text-sm font-medium text-ink-muted">
 {node.name.substring(0, 2).toUpperCase()}
 </div>
 )}
 </div>
 <div className="min-w-0">
 <p className="text-sm font-medium text-ink truncate">{node.name}</p>
 <p className="text-xs text-ink-muted truncate">{node.title}</p>
 </div>
 </div>
 );

 return (
 <div className="flex flex-col items-center gap-2">
 {supervisor && (
 <>
 <div className="w-full max-w-xs">{renderNode(supervisor)}</div>
 <div className="w-px h-6 bg-hairline" />
 </>
 )}
 {emp && <div className="w-full max-w-xs">{renderNode(emp, true)}</div>}
 {directReports && directReports.length > 0 && (
 <>
 <div className="w-px h-6 bg-hairline" />
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
