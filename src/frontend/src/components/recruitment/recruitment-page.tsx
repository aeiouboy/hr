'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { UserPlus, Briefcase, Users, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Modal } from '@/components/ui/modal';
import { useRecruitment, type ApplicationStatus } from '@/hooks/use-recruitment';
import { formatCurrency } from '@/lib/date';

export function RecruitmentPage() {
 const t = useTranslations('recruitment');
 const { jobs, candidates, stats, loading, updateCandidateStatus } = useRecruitment();
 const [activeTab, setActiveTab] = useState('jobBoard');
 const [selectedCandidate, setSelectedCandidate] = useState<typeof candidates[0] | null>(null);
 const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);

 const tabs = [
 { key:'jobBoard', label: t('jobBoard') },
 { key:'applications', label: t('allApplications') },
 { key:'manage', label: t('manage') },
 ];

 if (loading) {
 return <div className="space-y-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-40 w-full" />)}</div>;
 }

 const STATUS_VARIANT: Record<string,'neutral' |'info' |'warning' |'success' |'error'> = {
 applied:'neutral', screening:'info', interview:'warning', offer:'info', hired:'success', rejected:'error',
 };

 return (
 <>
 <div className="mb-6">
 <h1 className="text-2xl font-bold text-ink">{t('title')}</h1>
 <p className="text-ink-muted mt-1">{t('subtitle')}</p>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
 <Card><CardContent className="p-5 sm:p-6 lg:p-8 flex items-center gap-3"><Briefcase className="h-8 w-8 text-brand" /><div><p className="text-2xl font-bold">{stats.openPositions}</p><p className="text-xs text-ink-muted">{t('openPositions')}</p></div></CardContent></Card>
 <Card><CardContent className="p-5 sm:p-6 lg:p-8 flex items-center gap-3"><Users className="h-8 w-8 text-accent" /><div><p className="text-2xl font-bold">{stats.totalApplications}</p><p className="text-xs text-ink-muted">{t('totalApplications')}</p></div></CardContent></Card>
 <Card><CardContent className="p-5 sm:p-6 lg:p-8 flex items-center gap-3"><UserPlus className="h-8 w-8 text-success" /><div><p className="text-2xl font-bold">{stats.newApplications}</p><p className="text-xs text-ink-muted">{t('newApplications')}</p></div></CardContent></Card>
 <Card><CardContent className="p-5 sm:p-6 lg:p-8 flex items-center gap-3"><Clock className="h-8 w-8 text-yellow-500" /><div><p className="text-2xl font-bold">{stats.inInterview}</p><p className="text-xs text-ink-muted">{t('inInterview')}</p></div></CardContent></Card>
 </div>

 <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

 {activeTab ==='jobBoard' && (
 <div className="space-y-4">
 {jobs.filter((j) => j.status ==='open').map((job) => (
 <Card key={job.id} className="hover:shadow-1 transition-shadow">
 <CardContent className="p-5 sm:p-6 lg:p-8">
 <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
 <div>
 <div className="flex items-center gap-2 mb-1">
 <h3 className="font-semibold text-ink text-lg">{job.titleEn}</h3>
 {job.urgent && <Badge variant="error">{t('urgent')}</Badge>}
 </div>
 <p className="text-sm text-ink-muted mb-2">{job.department} - {job.location}</p>
 <div className="flex flex-wrap gap-3 text-sm text-ink-muted">
 <span>{job.employmentType}</span>
 <span>{formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}</span>
 <span>{job.openings} {t('openings')}</span>
 </div>
 </div>
 <div className="text-right">
 <p className="text-sm text-ink-muted">{t('closingDate')}: {job.closingDate}</p>
 <p className="text-sm text-ink-muted mt-1">{job.applicationCount} applications</p>
 <Button size="sm" className="mt-2" onClick={() => setSelectedJob(job)}>{t('viewDetails')}</Button>
 </div>
 </div>
 </CardContent>
 </Card>
 ))}
 </div>
 )}

 {activeTab ==='applications' && (
 <Card>
 <CardContent className="p-0">
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b border-hairline bg-surface-raised">
 <th className="text-left py-3 px-4 text-xs font-medium text-ink-muted uppercase">{t('candidate')}</th>
 <th className="text-left py-3 px-4 text-xs font-medium text-ink-muted uppercase">{t('position')}</th>
 <th className="text-left py-3 px-4 text-xs font-medium text-ink-muted uppercase">{t('appliedDate')}</th>
 <th className="text-left py-3 px-4 text-xs font-medium text-ink-muted uppercase">{t('source')}</th>
 <th className="text-left py-3 px-4 text-xs font-medium text-ink-muted uppercase">{t('status')}</th>
 <th className="text-center py-3 px-4 text-xs font-medium text-ink-muted uppercase"></th>
 </tr>
 </thead>
 <tbody>
 {candidates.map((c) => (
 <tr key={c.id} className="border-b border-hairline last:border-0 hover:bg-surface-raised/30 cursor-pointer" onClick={() => setSelectedCandidate(c)}>
 <td className="py-3 px-4">
 <div className="flex items-center gap-2">
 {c.photo && <img src={c.photo} alt="" className="w-8 h-8 rounded-full" />}
 <span className="font-medium">{c.name}</span>
 </div>
 </td>
 <td className="py-3 px-4 text-ink-muted">{c.position}</td>
 <td className="py-3 px-4 text-ink-muted">{c.appliedDate}</td>
 <td className="py-3 px-4 text-ink-muted">{c.source}</td>
 <td className="py-3 px-4"><Badge variant={STATUS_VARIANT[c.status]}>{c.status}</Badge></td>
 <td className="py-3 px-4 text-center"><Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setSelectedCandidate(c); }}>{t('viewDetails')}</Button></td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </CardContent>
 </Card>
 )}

 {activeTab ==='manage' && (
 <div className="space-y-4">
 {jobs.map((job) => (
 <Card key={job.id}>
 <CardContent className="p-5 sm:p-6 lg:p-8">
 <div className="flex items-center justify-between">
 <div>
 <h3 className="font-semibold text-ink">{job.titleEn}</h3>
 <p className="text-sm text-ink-muted">{job.department}</p>
 </div>
 <div className="flex items-center gap-3">
 <Badge variant={job.status ==='open' ?'success' : job.status ==='draft' ?'neutral' :'error'}>{job.status}</Badge>
 <span className="text-sm text-ink-muted">{job.applicationCount} apps</span>
 </div>
 </div>
 </CardContent>
 </Card>
 ))}
 </div>
 )}

 {/* Job Detail Modal */}
 <Modal open={!!selectedJob} onClose={() => setSelectedJob(null)} title={selectedJob?.titleEn ||''} className="max-w-2xl">
 {selectedJob && (
 <div className="space-y-4">
 <div className="flex items-center gap-2 flex-wrap">
 <Badge variant={selectedJob.status ==='open' ?'success' :'neutral'}>{selectedJob.status}</Badge>
 {selectedJob.urgent && <Badge variant="error">{t('urgent')}</Badge>}
 <span className="text-sm text-ink-muted">{selectedJob.department} - {selectedJob.location}</span>
 </div>
 <div className="grid grid-cols-2 gap-4 text-sm">
 <div><span className="text-ink-muted">Employment Type</span><p className="font-medium">{selectedJob.employmentType}</p></div>
 <div><span className="text-ink-muted">Salary Range</span><p className="font-medium">{formatCurrency(selectedJob.salaryMin)} - {formatCurrency(selectedJob.salaryMax)}</p></div>
 <div><span className="text-ink-muted">Openings</span><p className="font-medium">{selectedJob.openings}</p></div>
 <div><span className="text-ink-muted">{t('closingDate')}</span><p className="font-medium">{selectedJob.closingDate}</p></div>
 </div>
 <div>
 <h4 className="text-sm font-semibold text-ink-soft mb-1">Description</h4>
 <p className="text-sm text-ink-muted">{selectedJob.description}</p>
 </div>
 {selectedJob.requirements && selectedJob.requirements.length > 0 && (
 <div>
 <h4 className="text-sm font-semibold text-ink-soft mb-1">Requirements</h4>
 <ul className="list-disc list-inside text-sm text-ink-muted space-y-1">
 {selectedJob.requirements.map((req, i) => <li key={i}>{req}</li>)}
 </ul>
 </div>
 )}
 <div className="pt-4 border-t border-hairline">
 <Button onClick={() => setSelectedJob(null)}>Apply Now</Button>
 </div>
 </div>
 )}
 </Modal>

 {/* Candidate Detail Modal */}
 <Modal open={!!selectedCandidate} onClose={() => setSelectedCandidate(null)} title={t('applicationDetails')} className="max-w-2xl">
 {selectedCandidate && (
 <div className="space-y-4">
 <div className="flex items-center gap-3">
 {selectedCandidate.photo && <img src={selectedCandidate.photo} alt="" className="w-12 h-12 rounded-full" />}
 <div>
 <h3 className="font-semibold text-lg">{selectedCandidate.name}</h3>
 <p className="text-sm text-ink-muted">{selectedCandidate.email} | {selectedCandidate.phone}</p>
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4 text-sm">
 <div><span className="text-ink-muted">{t('positionApplied')}</span><p className="font-medium">{selectedCandidate.position}</p></div>
 <div><span className="text-ink-muted">{t('experience')}</span><p className="font-medium">{selectedCandidate.experience}</p></div>
 <div><span className="text-ink-muted">{t('source')}</span><p className="font-medium">{selectedCandidate.source}</p></div>
 <div><span className="text-ink-muted">{t('status')}</span><Badge variant={STATUS_VARIANT[selectedCandidate.status]}>{selectedCandidate.status}</Badge></div>
 </div>
 <div>
 <span className="text-sm text-ink-muted">{t('skills')}</span>
 <div className="flex flex-wrap gap-1 mt-1">{selectedCandidate.skills.map((s) => <Badge key={s} variant="neutral">{s}</Badge>)}</div>
 </div>
 <div className="flex gap-2 pt-4 border-t border-hairline">
 {selectedCandidate.status !=='hired' && selectedCandidate.status !=='rejected' && (
 <>
 <Button size="sm" variant="outline" onClick={() => { const next: Record<string, ApplicationStatus> = { applied:'screening', screening:'interview', interview:'offer', offer:'hired' }; const nextStatus = next[selectedCandidate.status]; if (nextStatus) { updateCandidateStatus(selectedCandidate.id, nextStatus); setSelectedCandidate({ ...selectedCandidate, status: nextStatus }); } }}>
 Advance Stage
 </Button>
 <Button size="sm" variant="destructive" onClick={() => { updateCandidateStatus(selectedCandidate.id,'rejected'); setSelectedCandidate(null); }}>
 Reject
 </Button>
 </>
 )}
 </div>
 </div>
 )}
 </Modal>
 </>
 );
}
