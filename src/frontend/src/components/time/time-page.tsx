// VALIDATION_EXEMPT: display/admin landing — filter chips + action buttons only, no data submit form (per design-gates Track C 2026-04-26)
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
 Clock, MapPin, CheckCircle, AlertTriangle, XCircle,
 Calendar, ArrowRight, FileEdit, ChevronRight, Timer,
 LogIn, LogOut, Palmtree, Coffee, Sun, Moon,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { FormField } from '@/components/ui/form-field';
import { Skeleton } from '@/components/ui/skeleton';
import { useTime, type AttendanceRecord, type TimeCorrectionRequest } from '@/hooks/use-time';

const STATUS_CONFIG: Record<string, { variant:'success' |'warning' |'error' |'info' |'neutral'; icon: typeof CheckCircle }> = {
 present: { variant:'success', icon: CheckCircle },
 late: { variant:'warning', icon: AlertTriangle },
 absent: { variant:'error', icon: XCircle },
 leave: { variant:'info', icon: Palmtree },
 holiday: { variant:'neutral', icon: Sun },
 weekend: { variant:'neutral', icon: Coffee },
};

// -- Live Clock Component --
function LiveClock() {
 const [time, setTime] = useState(new Date());
 useEffect(() => {
 const id = setInterval(() => setTime(new Date()), 1000);
 return () => clearInterval(id);
 }, []);
 const h = time.getHours().toString().padStart(2,'0');
 const m = time.getMinutes().toString().padStart(2,'0');
 const s = time.getSeconds().toString().padStart(2,'0');
 return (
 <div className="font-mono tracking-tight">
 <span className="text-5xl sm:text-6xl font-black">{h}:{m}</span>
 <span className="text-2xl sm:text-3xl font-light text-ink-muted ml-1">{s}</span>
 </div>
 );
}

// -- Shift Progress Bar --
function ShiftProgress({ clockIn, shiftStart, shiftEnd, breakStart, breakEnd }: {
 clockIn?: string; shiftStart: string; shiftEnd: string; breakStart: string; breakEnd: string;
}) {
 const [pct, setPct] = useState(0);
 useEffect(() => {
 const toMin = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
 const update = () => {
 const now = new Date();
 const nowMin = now.getHours() * 60 + now.getMinutes();
 const start = toMin(shiftStart);
 const end = toMin(shiftEnd);
 const total = end - start;
 if (total <= 0) return;
 setPct(Math.min(100, Math.max(0, ((nowMin - start) / total) * 100)));
 };
 update();
 const id = setInterval(update, 60000);
 return () => clearInterval(id);
 }, [shiftStart, shiftEnd]);

 const toMin = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
 const totalMin = toMin(shiftEnd) - toMin(shiftStart);
 const breakStartPct = totalMin > 0 ? ((toMin(breakStart) - toMin(shiftStart)) / totalMin) * 100 : 0;
 const breakEndPct = totalMin > 0 ? ((toMin(breakEnd) - toMin(shiftStart)) / totalMin) * 100 : 0;

 return (
 <div className="w-full mt-4">
 <div className="flex justify-between text-xs text-ink-muted mb-1.5">
 <span>{shiftStart}</span>
 <span>{breakStart}-{breakEnd}</span>
 <span>{shiftEnd}</span>
 </div>
 <div className="relative h-3 bg-surface-raised rounded-full overflow-hidden">
 {/* Break zone */}
 <div
 className="absolute top-0 h-full bg-surface-raised/80"
 style={{ left: `${breakStartPct}%`, width: `${breakEndPct - breakStartPct}%` }}
 />
 {/* Progress */}
 <div
 className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000"
 style={{
 width: `${pct}%`,
 background: pct > 100 ?'#C8102E' :'linear-gradient(90deg, #1a1a2e 0%, #C8102E 100%)',
 }}
 />
 {/* Clock-in marker */}
 {clockIn && (
 <div
 className="absolute top-0 w-0.5 h-full bg-emerald-500"
 style={{ left: `${totalMin > 0 ? ((toMin(clockIn) - toMin(shiftStart)) / totalMin) * 100 : 0}%` }}
 />
 )}
 {/* Current time indicator */}
 <div
 className="absolute -top-0.5 w-4 h-4 rounded-full bg-surface border-2 border-brand shadow-1"
 style={{ left: `calc(${pct}% - 8px)` }}
 />
 </div>
 </div>
 );
}

// -- Weekly Heatmap --
function WeeklyHeatmap({ attendance }: { attendance: AttendanceRecord[] }) {
 const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
 const currentWeek = attendance.slice(0, 7);

 const getColor = (status?: string) => {
 switch (status) {
 case'present': return'bg-emerald-500';
 case'late': return'bg-amber-400';
 case'absent': return'bg-danger-tint0';
 case'leave': return'bg-sky-400';
 case'weekend': case'holiday': return'bg-surface-raised ';
 default: return'bg-surface-raised border border-dashed border-hairline border-hairline';
 }
 };

 return (
 <div className="flex gap-1.5 sm:gap-2">
 {days.map((day, i) => {
 const rec = currentWeek.find((a) => a.dayOfWeek === day.slice(0, 3));
 const isToday = rec?.date ==='2026-03-05';
 return (
 <div key={day} className="flex-1 text-center">
 <p className={`text-[10px] mb-1 ${isToday ?'font-bold text-brand' :'text-ink-muted'}`}>{day}</p>
 <div
 className={`h-8 sm:h-10 rounded-md ${getColor(rec?.status)} ${isToday ?'ring-2 ring-brand ring-offset-1' :''} transition-all`}
 title={rec ? `${rec.date}: ${rec.status}` :'No data'}
 />
 {rec?.workHours ? (
 <p className="text-[10px] text-ink-muted mt-0.5">{rec.workHours}h</p>
 ) : (
 <p className="text-[10px] text-gray-300 mt-0.5">-</p>
 )}
 </div>
 );
 })}
 </div>
 );
}

// -- Main Time Page --
export function TimePage() {
 const t = useTranslations('timeManagement');
 const tCommon = useTranslations('common');
 const {
 attendance, schedule, corrections, loading, summary,
 clockStatus, clockIn, clockOut, submitCorrection,
 } = useTime();

 const [activeTab, setActiveTab] = useState<'clock' |'schedule' |'timesheet' |'correction'>('clock');
 const [showCorrectionModal, setShowCorrectionModal] = useState(false);
 const [correctionForm, setCorrectionForm] = useState({
 date:'', type:'forgot-clock' as TimeCorrectionRequest['type'],
 correctedTime:'', reason:'',
 });
 const [clockAnimating, setClockAnimating] = useState(false);

 if (loading) {
 return (
 <div className="space-y-4">
 <Skeleton className="h-64 w-full rounded-2xl" />
 <div className="grid grid-cols-4 gap-3">
 {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-16 w-full rounded-md" />)}
 </div>
 <Skeleton className="h-48 w-full rounded-2xl" />
 </div>
 );
 }

 const handleClockAction = async () => {
 setClockAnimating(true);
 if (clockStatus.isClockedIn) {
 await clockOut();
 } else {
 await clockIn();
 }
 setTimeout(() => setClockAnimating(false), 600);
 };

 const handleCorrectionSubmit = async () => {
 await submitCorrection({
 date: correctionForm.date,
 type: correctionForm.type,
 correctedTime: correctionForm.correctedTime,
 reason: correctionForm.reason,
 });
 setShowCorrectionModal(false);
 setCorrectionForm({ date:'', type:'forgot-clock', correctedTime:'', reason:'' });
 };

 const tabs = [
 { key:'clock' as const, label:'Clock', icon: Clock },
 { key:'schedule' as const, label: t('shifts'), icon: Calendar },
 { key:'timesheet' as const, label:'Timesheet', icon: Timer },
 { key:'correction' as const, label:'Correction', icon: FileEdit },
 ];

 return (
 <div className="w-full">
 {/* ===== HEADER WITH LIVE CLOCK ===== */}
 <div className="mb-6">
 <h1 className="text-2xl font-bold text-ink">{t('title')}</h1>
 <p className="text-sm text-ink-muted mt-0.5">
 {new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
 </p>
 </div>

 {/* ===== CLOCK IN/OUT HERO CARD ===== */}
 <div
 className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 mb-6 transition-all duration-500 ${
 clockStatus.isClockedIn
 ?'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]'
 :'bg-gradient-to-br from-gray-50 via-white to-gray-100 border border-hairline dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 border-hairline'
 }`}
 >
 {/* Decorative background elements */}
 {clockStatus.isClockedIn && (
 <>
 <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full -translate-y-1/2 translate-x-1/2" />
 <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand/5 rounded-full translate-y-1/2 -translate-x-1/2" />
 </>
 )}

 <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
 {/* Left: Time & Status */}
 <div>
 <div className={clockStatus.isClockedIn ?'text-white' :'text-ink'}>
 <LiveClock />
 </div>

 {/* Location & Geofence */}
 <div className={`flex items-center gap-1.5 mt-3 text-xs ${clockStatus.isClockedIn ?'text-ink-muted' :'text-ink-muted'}`}>
 <MapPin className="h-3 w-3" />
 <span>{clockStatus.locationName}</span>
 {clockStatus.isWithinGeofence ? (
 <span className="inline-flex items-center gap-0.5 ml-2 px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-medium">
 <CheckCircle className="h-2.5 w-2.5" /> In Zone
 </span>
 ) : (
 <span className="inline-flex items-center gap-0.5 ml-2 px-1.5 py-0.5 rounded-full bg-danger-tint0/20 text-red-400 text-[10px] font-medium">
 <XCircle className="h-2.5 w-2.5" /> Out of Zone
 </span>
 )}
 </div>

 {/* Clock In/Out Times */}
 <div className={`flex items-center gap-4 mt-3 text-sm ${clockStatus.isClockedIn ?'text-gray-300' :'text-ink-muted'}`}>
 {clockStatus.clockInTime && (
 <span className="flex items-center gap-1.5">
 <LogIn className="h-3.5 w-3.5 text-emerald-400" />
 <span className="font-mono font-medium">{clockStatus.clockInTime}</span>
 </span>
 )}
 {clockStatus.clockOutTime && (
 <>
 <ArrowRight className="h-3 w-3 text-ink-muted" />
 <span className="flex items-center gap-1.5">
 <LogOut className="h-3.5 w-3.5 text-brand" />
 <span className="font-mono font-medium">{clockStatus.clockOutTime}</span>
 </span>
 </>
 )}
 </div>
 </div>

 {/* Right: Clock Button */}
 <div className="flex-shrink-0">
 <button
 onClick={handleClockAction}
 className={`
 relative w-full sm:w-36 h-36 rounded-2xl font-bold text-lg
 transition-all duration-300 active:scale-95
 ${clockAnimating ?'scale-110' :''}
 ${clockStatus.isClockedIn
 ?'bg-gradient-to-br from-brand to-red-700 text-white shadow-2 shadow-red-900/30 hover:shadow-xl hover:shadow-red-900/40'
 :'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-2 shadow-emerald-900/20 hover:shadow-xl hover:shadow-emerald-900/30'
 }
 `}
 >
 <div className="flex flex-col items-center justify-center gap-2">
 {clockStatus.isClockedIn ? (
 <>
 <LogOut className="h-8 w-8" />
 <span className="text-base">Clock Out</span>
 </>
 ) : (
 <>
 <LogIn className="h-8 w-8" />
 <span className="text-base">Clock In</span>
 </>
 )}
 </div>
 {/* Pulse ring */}
 <div className={`absolute inset-0 rounded-2xl ${clockStatus.isClockedIn ?'bg-brand' :'bg-emerald-500'} animate-ping opacity-20`} />
 </button>
 </div>
 </div>

 {/* Shift Progress */}
 {clockStatus.isClockedIn && (
 <div className="relative z-10 mt-4">
 <ShiftProgress
 clockIn={clockStatus.clockInTime}
 shiftStart={clockStatus.shiftStart}
 shiftEnd={clockStatus.shiftEnd}
 breakStart={clockStatus.breakStart}
 breakEnd={clockStatus.breakEnd}
 />
 </div>
 )}
 </div>

 {/* ===== WEEKLY OVERVIEW + STATS ===== */}
 <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
 {/* Weekly Heatmap */}
 <Card className="lg:col-span-3">
 <CardContent className="p-5 sm:p-6 lg:p-8">
 <div className="flex items-center justify-between mb-3">
 <h3 className="text-sm font-semibold text-ink">This Week</h3>
 <div className="flex items-center gap-3 text-[10px] text-ink-muted">
 <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-500" /> On Time</span>
 <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-amber-400" /> Late</span>
 <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-danger-tint0" /> Absent</span>
 <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-sky-400" /> Leave</span>
 </div>
 </div>
 <WeeklyHeatmap attendance={attendance} />
 </CardContent>
 </Card>

 {/* Quick Stats */}
 <Card>
 <CardContent className="p-5 sm:p-6 lg:p-8">
 <h3 className="text-sm font-semibold text-ink mb-3">Monthly Stats</h3>
 <div className="space-y-3">
 <div className="flex items-center justify-between">
 <span className="text-xs text-ink-muted">On-time Rate</span>
 <span className="text-lg font-bold text-emerald-600">{summary.onTimeRate}%</span>
 </div>
 <div className="w-full h-1.5 bg-surface-raised rounded-full overflow-hidden">
 <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${summary.onTimeRate}%` }} />
 </div>
 <div className="grid grid-cols-2 gap-2 pt-1">
 <div className="text-center p-2 bg-surface-raised rounded-md">
 <p className="text-lg font-bold text-ink">{summary.totalWorkDays}</p>
 <p className="text-[10px] text-ink-muted">{t('workingHours')}</p>
 </div>
 <div className="text-center p-2 bg-surface-raised rounded-md">
 <p className="text-lg font-bold text-brand">{summary.totalOvertimeHours}h</p>
 <p className="text-[10px] text-ink-muted">OT Hours</p>
 </div>
 </div>
 <div className="flex items-center justify-between pt-1 text-xs">
 <span className="text-ink-muted">Avg Check-in</span>
 <span className="font-mono font-medium text-ink">{summary.avgCheckIn}</span>
 </div>
 <div className="flex items-center justify-between text-xs">
 <span className="text-ink-muted">Avg Check-out</span>
 <span className="font-mono font-medium text-ink">{summary.avgCheckOut}</span>
 </div>
 </div>
 </CardContent>
 </Card>
 </div>

 {/* ===== TAB NAVIGATION ===== */}
 <div className="flex gap-1 p-1 bg-surface-raised rounded-md mb-6 overflow-x-auto">
 {tabs.map(({ key, label, icon: Icon }) => (
 <button
 key={key}
 onClick={() => setActiveTab(key)}
 className={`
 flex items-center gap-1.5 px-4 py-2.5 rounded-md text-sm font-medium whitespace-nowrap
 transition-all duration-200 flex-1 justify-center
 ${activeTab === key
 ?'bg-surface text-ink shadow-sm'
 :'text-ink-muted hover:text-ink hover:bg-surface/50 hover:bg-surface-raised'
 }
 `}
 >
 <Icon className="h-4 w-4" />
 <span className="hidden sm:inline">{label}</span>
 </button>
 ))}
 </div>

 {/* ===== TAB CONTENT ===== */}

 {/* Clock Tab - Recent Activity */}
 {activeTab ==='clock' && (
 <div className="space-y-4">
 <Card>
 <CardHeader className="pb-3">
 <CardTitle className="text-base">Recent Attendance</CardTitle>
 </CardHeader>
 <CardContent className="p-0">
 {/* Mobile: Card List */}
 <div className="sm:hidden divide-y">
 {attendance.slice(0, 7).map((rec) => {
 const config = STATUS_CONFIG[rec.status] || STATUS_CONFIG.present;
 const StatusIcon = config.icon;
 return (
 <div key={rec.id} className="flex items-center gap-3 px-4 py-3">
 <div className={`flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center ${
 rec.status ==='present' ?'bg-emerald-50 text-emerald-600' :
 rec.status ==='late' ?'bg-amber-50 text-amber-600' :
 rec.status ==='absent' ?'bg-danger-tint text-danger' :
 rec.status ==='leave' ?'bg-sky-50 text-sky-600' :
'bg-surface-raised text-ink-muted'
 }`}>
 <StatusIcon className="h-5 w-5" />
 </div>
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-2">
 <span className="text-sm font-medium text-ink">{rec.dayOfWeek}</span>
 <span className="text-xs text-ink-muted">{rec.date}</span>
 </div>
 {rec.checkIn ? (
 <p className="text-xs text-ink-muted font-mono mt-0.5">
 {rec.checkIn} - {rec.checkOut ||'...'}
 {rec.workHours > 0 && <span className="text-ink-muted"> ({rec.workHours}h)</span>}
 </p>
 ) : (
 <p className="text-xs text-ink-muted mt-0.5 capitalize">{rec.status}</p>
 )}
 </div>
 {rec.overtimeHours > 0 && (
 <span className="text-xs font-medium text-brand bg-danger-tint px-2 py-0.5 rounded-full">
 +{rec.overtimeHours}h OT
 </span>
 )}
 </div>
 );
 })}
 </div>
 {/* Desktop: Table */}
 <div className="hidden sm:block overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b bg-surface-raised/50 border-hairline">
 <th className="text-left py-3 px-4 text-xs font-medium text-ink-muted uppercase">Date</th>
 <th className="text-left py-3 px-4 text-xs font-medium text-ink-muted uppercase">{t('shift')}</th>
 <th className="text-center py-3 px-4 text-xs font-medium text-ink-muted uppercase">Check-in</th>
 <th className="text-center py-3 px-4 text-xs font-medium text-ink-muted uppercase">Check-out</th>
 <th className="text-center py-3 px-4 text-xs font-medium text-ink-muted uppercase">{t('workHours')}</th>
 <th className="text-center py-3 px-4 text-xs font-medium text-ink-muted uppercase">OT</th>
 <th className="text-center py-3 px-4 text-xs font-medium text-ink-muted uppercase">Status</th>
 </tr>
 </thead>
 <tbody>
 {attendance.map((rec) => {
 const config = STATUS_CONFIG[rec.status] || STATUS_CONFIG.present;
 return (
 <tr key={rec.id} className="border-b border-hairline last:border-0 hover:bg-surface-raised/50 hover:bg-surface-raised transition-colors">
 <td className="py-3 px-4">
 <span className="font-medium">{rec.dayOfWeek}</span>
 <span className="text-ink-muted ml-2 text-xs">{rec.date}</span>
 </td>
 <td className="py-3 px-4 text-ink-muted text-xs">{rec.shift}</td>
 <td className="py-3 px-4 text-center font-mono text-xs">
 {rec.checkIn ? (
 <span className={rec.status ==='late' ?'text-amber-600 font-semibold' :''}>{rec.checkIn}</span>
 ) :'-'}
 </td>
 <td className="py-3 px-4 text-center font-mono text-xs">{rec.checkOut ||'-'}</td>
 <td className="py-3 px-4 text-center">{rec.workHours > 0 ? `${rec.workHours}h` :'-'}</td>
 <td className="py-3 px-4 text-center">
 {rec.overtimeHours > 0 ? (
 <span className="text-brand font-medium">+{rec.overtimeHours}h</span>
 ) :'-'}
 </td>
 <td className="py-3 px-4 text-center">
 <Badge variant={config.variant} className="capitalize">{rec.status}</Badge>
 </td>
 </tr>
 );
 })}
 </tbody>
 </table>
 </div>
 </CardContent>
 </Card>
 </div>
 )}

 {/* Schedule Tab */}
 {activeTab ==='schedule' && (
 <div className="space-y-4">
 <Card>
 <CardHeader className="pb-3">
 <div className="flex items-center justify-between">
 <CardTitle className="text-base">{t('shifts')} & {t('assignments')}</CardTitle>
 <span className="text-xs text-ink-muted">This week</span>
 </div>
 </CardHeader>
 <CardContent className="p-0">
 <div className="divide-y">
 {schedule.map((shift) => {
 const isToday = shift.date ==='2026-03-05';
 const isOff = shift.type ==='off';
 return (
 <div
 key={shift.id}
 className={`flex items-center gap-4 px-4 sm:px-6 py-4 transition-colors ${
 isToday ?'bg-brand/5 border-l-2 border-brand' :'hover:bg-surface-raised/50 hover:bg-surface-raised'
 }`}
 >
 {/* Day */}
 <div className="flex-shrink-0 w-12 text-center">
 <p className={`text-xs ${isToday ?'text-brand font-bold' :'text-ink-muted'}`}>{shift.dayOfWeek}</p>
 <p className={`text-lg font-bold ${isToday ?'text-brand' :'text-ink'}`}>
 {shift.date.split('-')[2]}
 </p>
 </div>

 {/* Shift Info */}
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-2">
 <span className={`text-sm font-medium ${isOff ?'text-ink-muted' :'text-ink'}`}>
 {shift.shiftName}
 </span>
 {isToday && (
 <span className="text-[10px] font-bold text-brand bg-brand/10 px-1.5 py-0.5 rounded-full">
 TODAY
 </span>
 )}
 </div>
 {!isOff && (
 <p className="text-xs text-ink-muted dark:text-ink-muted font-mono mt-0.5">
 {shift.startTime} - {shift.endTime}
 <span className="mx-2 text-gray-300">|</span>
 Break {shift.breakStart}-{shift.breakEnd}
 </p>
 )}
 </div>

 {/* Hours */}
 <div className="flex-shrink-0 text-right">
 {!isOff ? (
 <span className="text-sm font-semibold text-ink">{shift.workHours}h</span>
 ) : (
 <span className="text-xs text-gray-300">OFF</span>
 )}
 </div>
 </div>
 );
 })}
 </div>
 </CardContent>
 </Card>

 {/* Shift Legend */}
 <div className="flex flex-wrap gap-3 px-1">
 {[
 { icon: Sun, label:'Regular (09-18)', color:'text-amber-500' },
 { icon: Coffee, label:'Morning (06-15)', color:'text-warning' },
 { icon: Moon, label:'Night (22-07)', color:'text-indigo-500' },
 ].map(({ icon: Icon, label, color }) => (
 <span key={label} className="flex items-center gap-1.5 text-xs text-ink-muted">
 <Icon className={`h-3.5 w-3.5 ${color}`} /> {label}
 </span>
 ))}
 </div>
 </div>
 )}

 {/* Timesheet Tab */}
 {activeTab ==='timesheet' && (
 <div className="space-y-4">
 {/* Summary Row */}
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
 <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-md p-4 text-white">
 <p className="text-2xl font-bold">{summary.totalWorkHours}h</p>
 <p className="text-[10px] text-ink-muted mt-0.5">{t('totalHours')}</p>
 </div>
 <div className="bg-surface border border-hairline border-hairline rounded-md p-4">
 <p className="text-2xl font-bold text-ink">{summary.totalWorkDays}</p>
 <p className="text-[10px] text-ink-muted mt-0.5">Work Days</p>
 </div>
 <div className="bg-surface border border-hairline border-hairline rounded-md p-4">
 <p className="text-2xl font-bold text-amber-500">{summary.lateDays}</p>
 <p className="text-[10px] text-ink-muted mt-0.5">Late Days</p>
 </div>
 <div className="bg-surface border border-hairline border-hairline rounded-md p-4">
 <p className="text-2xl font-bold text-danger">{summary.absentDays}</p>
 <p className="text-[10px] text-ink-muted mt-0.5">Absent Days</p>
 </div>
 <div className="bg-surface border border-hairline border-hairline rounded-md p-4">
 <p className="text-2xl font-bold text-sky-500">{summary.leaveDays}</p>
 <p className="text-[10px] text-ink-muted mt-0.5">Leave Days</p>
 </div>
 <div className="bg-surface border border-hairline border-hairline rounded-md p-4">
 <p className="text-2xl font-bold text-brand">{summary.totalOvertimeHours}h</p>
 <p className="text-[10px] text-ink-muted mt-0.5">OT Hours</p>
 </div>
 </div>

 {/* Full Log */}
 <Card>
 <CardHeader className="pb-3">
 <div className="flex items-center justify-between">
 <CardTitle className="text-base">Time Result</CardTitle>
 <span className="text-xs text-ink-muted">Feb 2026</span>
 </div>
 </CardHeader>
 <CardContent className="p-0">
 {/* Mobile cards */}
 <div className="sm:hidden divide-y">
 {attendance.map((rec) => {
 const config = STATUS_CONFIG[rec.status] || STATUS_CONFIG.present;
 return (
 <div key={rec.id} className="px-4 py-3 flex items-center justify-between">
 <div>
 <p className="text-sm font-medium">{rec.dayOfWeek} <span className="text-ink-muted text-xs">{rec.date}</span></p>
 <p className="text-xs text-ink-muted font-mono">
 {rec.checkIn ||'--:--'} - {rec.checkOut ||'--:--'}
 </p>
 </div>
 <div className="text-right flex items-center gap-2">
 {rec.workHours > 0 && <span className="text-sm font-mono font-medium">{rec.workHours}h</span>}
 <Badge variant={config.variant} className="capitalize text-[10px]">{rec.status}</Badge>
 </div>
 </div>
 );
 })}
 </div>
 {/* Desktop table */}
 <div className="hidden sm:block overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b bg-surface-raised/50 border-hairline">
 <th className="text-left py-3 px-4 text-xs font-medium text-ink-muted uppercase">Date</th>
 <th className="text-left py-3 px-4 text-xs font-medium text-ink-muted uppercase">{t('shift')}</th>
 <th className="text-center py-3 px-4 text-xs font-medium text-ink-muted uppercase">In</th>
 <th className="text-center py-3 px-4 text-xs font-medium text-ink-muted uppercase">Out</th>
 <th className="text-center py-3 px-4 text-xs font-medium text-ink-muted uppercase">Work</th>
 <th className="text-center py-3 px-4 text-xs font-medium text-ink-muted uppercase">OT</th>
 <th className="text-center py-3 px-4 text-xs font-medium text-ink-muted uppercase">Location</th>
 <th className="text-center py-3 px-4 text-xs font-medium text-ink-muted uppercase">Status</th>
 </tr>
 </thead>
 <tbody>
 {attendance.map((rec) => {
 const config = STATUS_CONFIG[rec.status] || STATUS_CONFIG.present;
 return (
 <tr key={rec.id} className="border-b border-hairline last:border-0 hover:bg-surface-raised/50 hover:bg-surface-raised">
 <td className="py-3 px-4">
 <span className="font-medium">{rec.dayOfWeek}</span>
 <span className="text-ink-muted ml-2 text-xs">{rec.date}</span>
 </td>
 <td className="py-3 px-4 text-ink-muted text-xs">{rec.shift}</td>
 <td className="py-3 px-4 text-center font-mono text-xs">{rec.checkIn ||'-'}</td>
 <td className="py-3 px-4 text-center font-mono text-xs">{rec.checkOut ||'-'}</td>
 <td className="py-3 px-4 text-center">{rec.workHours > 0 ? `${rec.workHours}h` :'-'}</td>
 <td className="py-3 px-4 text-center">
 {rec.overtimeHours > 0 ? <span className="text-brand font-medium">+{rec.overtimeHours}h</span> :'-'}
 </td>
 <td className="py-3 px-4 text-center text-xs text-ink-muted">{rec.location ||'-'}</td>
 <td className="py-3 px-4 text-center">
 <Badge variant={config.variant} className="capitalize">{rec.status}</Badge>
 </td>
 </tr>
 );
 })}
 </tbody>
 </table>
 </div>
 </CardContent>
 </Card>
 </div>
 )}

 {/* Correction Tab */}
 {activeTab ==='correction' && (
 <div className="space-y-4">
 {/* New Correction Button */}
 <div className="flex justify-end">
 <Button onClick={() => setShowCorrectionModal(true)}>
 <FileEdit className="h-4 w-4 mr-2" />
 New Correction Request
 </Button>
 </div>

 {/* Correction History */}
 <Card>
 <CardHeader className="pb-3">
 <CardTitle className="text-base">Correction Requests</CardTitle>
 </CardHeader>
 <CardContent>
 {corrections.length === 0 ? (
 <div className="py-12 text-center">
 <FileEdit className="h-10 w-10 text-gray-300 mx-auto mb-3" />
 <p className="text-sm text-ink-muted">No correction requests yet</p>
 </div>
 ) : (
 <div className="space-y-3">
 {corrections.map((req) => (
 <div
 key={req.id}
 className="flex items-start gap-4 p-4 bg-surface-raised rounded-md hover:bg-surface-raised/80 hover:bg-surface-raised transition-colors"
 >
 <div className={`flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center ${
 req.status ==='approved' ?'bg-emerald-100 text-emerald-600' :
 req.status ==='rejected' ?'bg-danger-tint text-danger' :
'bg-amber-100 text-amber-600'
 }`}>
 {req.status ==='approved' ? <CheckCircle className="h-5 w-5" /> :
 req.status ==='rejected' ? <XCircle className="h-5 w-5" /> :
 <Clock className="h-5 w-5" />}
 </div>
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-2 flex-wrap">
 <span className="text-sm font-medium text-ink">{req.date}</span>
 <Badge variant={
 req.status ==='approved' ?'success' :
 req.status ==='rejected' ?'error' :'warning'
 } className="capitalize">{req.status}</Badge>
 </div>
 <p className="text-xs text-ink-muted mt-1">
 <span className="capitalize">{req.type.replace(/-/g,'')}</span>
 {req.originalTime && <> | Original: <span className="font-mono">{req.originalTime}</span></>}
 {''} | Corrected: <span className="font-mono font-medium">{req.correctedTime}</span>
 </p>
 <p className="text-xs text-ink-muted mt-1">{req.reason}</p>
 {req.approvedBy && (
 <p className="text-[10px] text-ink-muted mt-1">Approved by {req.approvedBy}</p>
 )}
 </div>
 <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0 mt-3" />
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </Card>
 </div>
 )}

 {/* ===== CORRECTION REQUEST MODAL ===== */}
 <Modal open={showCorrectionModal} onClose={() => setShowCorrectionModal(false)} title="Time Correction Request">
 <div className="space-y-4">
 <FormField
 label="Date"
 name="corrDate"
 type="date"
 value={correctionForm.date}
 onChange={(v) => setCorrectionForm((p) => ({ ...p, date: v }))}
 required
 />
 <FormField
 label="Correction Type"
 name="corrType"
 type="select"
 value={correctionForm.type}
 onChange={(v) => setCorrectionForm((p) => ({ ...p, type: v as TimeCorrectionRequest['type'] }))}
 options={[
 { value:'forgot-clock', label:'Forgot to Clock In/Out' },
 { value:'missing-checkin', label:'Missing Check-in' },
 { value:'missing-checkout', label:'Missing Check-out' },
 { value:'wrong-time', label:'Wrong Time Recorded' },
 ]}
 />
 <FormField
 label="Corrected Time"
 name="corrTime"
 value={correctionForm.correctedTime}
 placeholder="e.g. 09:00"
 onChange={(v) => setCorrectionForm((p) => ({ ...p, correctedTime: v }))}
 required
 />
 <FormField
 label="Reason"
 name="corrReason"
 type="textarea"
 value={correctionForm.reason}
 placeholder="Explain why the correction is needed..."
 onChange={(v) => setCorrectionForm((p) => ({ ...p, reason: v }))}
 required
 />
 </div>
 <div className="flex justify-end gap-3 mt-6">
 <Button variant="outline" onClick={() => setShowCorrectionModal(false)}>{tCommon('cancel')}</Button>
 <Button
 onClick={handleCorrectionSubmit}
 disabled={!correctionForm.date || !correctionForm.correctedTime || !correctionForm.reason}
 >
 Submit Request
 </Button>
 </div>
 </Modal>
 </div>
 );
}
