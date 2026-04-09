'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CalendarEvent } from '@/lib/manager-dashboard-api';
import { cn } from '@/lib/utils';

interface TeamCalendarProps {
 events: CalendarEvent[];
 month: number;
 year: number;
 onMonthChange: (month: number, year: number) => void;
 loading?: boolean;
}

const EVENT_COLORS: Record<string, string> = {
 shift:'bg-blue-400',
 annual_leave:'bg-green-400',
 sick_leave:'bg-red-400',
 wfh:'bg-purple-400',
 holiday:'bg-yellow-400',
};

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = [
'January','February','March','April','May','June',
'July','August','September','October','November','December',
];

export function TeamCalendar({
 events,
 month,
 year,
 onMonthChange,
 loading,
}: TeamCalendarProps) {
 const t = useTranslations('managerDashboard.calendar');

 const prevMonth = () => {
 if (month === 1) onMonthChange(12, year - 1);
 else onMonthChange(month - 1, year);
 };

 const nextMonth = () => {
 if (month === 12) onMonthChange(1, year + 1);
 else onMonthChange(month + 1, year);
 };

 const { days, startDay } = useMemo(() => {
 const daysInMonth = new Date(year, month, 0).getDate();
 const startDay = new Date(year, month - 1, 1).getDay();
 return { days: daysInMonth, startDay };
 }, [month, year]);

 const eventsByDate = useMemo(() => {
 const map = new Map<number, CalendarEvent[]>();
 events.forEach((e) => {
 const d = new Date(e.date);
 if (d.getMonth() + 1 === month && d.getFullYear() === year) {
 const day = d.getDate();
 if (!map.has(day)) map.set(day, []);
 map.get(day)!.push(e);
 }
 });
 return map;
 }, [events, month, year]);

 const today = new Date();
 const isToday = (day: number) =>
 day === today.getDate() && month === today.getMonth() + 1 && year === today.getFullYear();

 return (
 <Card>
 <CardHeader className="pb-3">
 <div className="flex items-center justify-between">
 <CardTitle>{t('calendarView')}</CardTitle>
 <div className="flex items-center gap-2">
 <button
 onClick={prevMonth}
 className="p-1 rounded hover:bg-surface-raised hover:bg-surface-raised transition"
 aria-label="Previous month"
 >
 <ChevronLeft className="h-4 w-4" />
 </button>
 <span className="text-sm font-medium min-w-[120px] text-center">
 {MONTHS[month - 1]} {year}
 </span>
 <button
 onClick={nextMonth}
 className="p-1 rounded hover:bg-surface-raised hover:bg-surface-raised transition"
 aria-label="Next month"
 >
 <ChevronRight className="h-4 w-4" />
 </button>
 </div>
 </div>
 </CardHeader>
 <CardContent>
 {loading ? (
 <div className="h-64 bg-surface-raised rounded-md animate-pulse" />
 ) : (
 <>
 {/* Day headers */}
 <div className="grid grid-cols-7 mb-1">
 {DAYS.map((d) => (
 <div
 key={d}
 className="text-center text-xs font-medium text-ink-muted py-1"
 >
 {d}
 </div>
 ))}
 </div>

 {/* Calendar grid */}
 <div className="grid grid-cols-7 gap-px bg-surface-raised rounded-md overflow-hidden">
 {/* Empty cells before first day */}
 {Array.from({ length: startDay }).map((_, i) => (
 <div key={`empty-${i}`} className="bg-surface p-1 min-h-[56px]" />
 ))}

 {/* Days */}
 {Array.from({ length: days }).map((_, i) => {
 const day = i + 1;
 const dayEvents = eventsByDate.get(day) ?? [];
 return (
 <div
 key={day}
 className={cn(
'bg-surface p-1 min-h-[56px]',
 isToday(day) &&'ring-2 ring-inset ring-brand'
 )}
 >
 <span
 className={cn(
'text-xs',
 isToday(day) ?'font-bold text-brand' :'text-ink-muted'
 )}
 >
 {day}
 </span>
 <div className="flex flex-wrap gap-0.5 mt-0.5">
 {dayEvents.slice(0, 3).map((ev, idx) => (
 <span
 key={idx}
 className={cn('w-2 h-2 rounded-full', EVENT_COLORS[ev.type] ??'bg-gray-300')}
 title={`${ev.employeeName}: ${ev.type}`}
 />
 ))}
 {dayEvents.length > 3 && (
 <span className="text-[9px] text-ink-muted">+{dayEvents.length - 3}</span>
 )}
 </div>
 </div>
 );
 })}
 </div>

 {/* Legend */}
 <div className="flex flex-wrap gap-3 mt-3 text-xs text-ink-muted">
 {Object.entries(EVENT_COLORS).map(([type, color]) => (
 <div key={type} className="flex items-center gap-1">
 <span className={cn('w-2.5 h-2.5 rounded-full', color)} />
 <span>{type.replace('_','')}</span>
 </div>
 ))}
 </div>
 </>
 )}
 </CardContent>
 </Card>
 );
}
