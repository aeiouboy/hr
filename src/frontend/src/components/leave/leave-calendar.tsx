'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LEAVE_TYPE_COLORS } from './leave-balance';
import type { CalendarEvent, ThaiHoliday, LeaveType } from '@/hooks/use-leave';

interface LeaveCalendarProps {
  events: CalendarEvent[];
  holidays: ThaiHoliday[];
  onDateClick?: (date: string) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function formatDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function LeaveCalendar({ events, holidays, onDateClick }: LeaveCalendarProps) {
  const t = useTranslations('leave');
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const monthName = new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfWeek(currentYear, currentMonth);

  const holidayMap = useMemo(() => {
    const map = new Map<string, ThaiHoliday>();
    holidays.forEach((h) => map.set(h.date, h));
    return map;
  }, [holidays]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    events.forEach((evt) => {
      const start = new Date(evt.startDate);
      const end = new Date(evt.endDate);
      const cursor = new Date(start);
      while (cursor <= end) {
        const key = cursor.toISOString().split('T')[0];
        const existing = map.get(key) || [];
        existing.push(evt);
        map.set(key, existing);
        cursor.setDate(cursor.getDate() + 1);
      }
    });
    return map;
  }, [events]);

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const goToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  };

  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <div className="rounded-lg bg-surface p-4 sm:p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-ink">{t('calendar')}</p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={goToPrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <button onClick={goToToday} className="text-sm font-medium text-ink min-w-[160px] text-center hover:text-accent transition">
            {monthName}
          </button>
          <Button variant="ghost" size="sm" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((day) => (
          <div key={day} className={cn('text-center text-xs font-medium py-2', day === 'Sun' || day === 'Sat' ? 'text-danger' : 'text-ink-muted')}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {/* Empty cells for first week offset */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="min-h-[60px] md:min-h-[80px] border-t border-hairline" />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, dayIdx) => {
          const day = dayIdx + 1;
          const dateKey = formatDateKey(currentYear, currentMonth, day);
          const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          const isToday = dateKey === todayKey;
          const holiday = holidayMap.get(dateKey);
          const dayEvents = eventsByDate.get(dateKey) || [];

          return (
            <div
              key={day}
              onClick={() => onDateClick?.(dateKey)}
              className={cn(
                'min-h-[60px] md:min-h-[80px] border-t border-hairline p-1 cursor-pointer hover:bg-surface-raised/50 transition',
                isWeekend && 'bg-surface-raised/30',
                holiday && 'bg-danger-tint/40'
              )}
            >
              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    'text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full',
                    isToday && 'bg-accent text-white',
                    isWeekend && !isToday && 'text-danger',
                    !isWeekend && !isToday && 'text-ink-soft'
                  )}
                >
                  {day}
                </span>
              </div>

              {holiday && (
                <div className="mt-0.5">
                  <span className="text-[10px] leading-tight text-danger line-clamp-1">{holiday.nameEn}</span>
                </div>
              )}

              {/* Leave events */}
              <div className="mt-0.5 space-y-0.5">
                {dayEvents.slice(0, 2).map((evt) => {
                  const colors = LEAVE_TYPE_COLORS[evt.type as LeaveType] || LEAVE_TYPE_COLORS.annual;
                  return (
                    <div
                      key={evt.id}
                      className={cn(
                        'text-[10px] leading-tight px-1 py-0.5 rounded truncate',
                        colors.bg,
                        colors.text,
                        evt.status === 'pending' && 'border border-dashed border-current'
                      )}
                    >
                      {evt.typeNameEn}
                    </div>
                  );
                })}
                {dayEvents.length > 2 && (
                  <span className="text-[10px] text-ink-muted">+{dayEvents.length - 2} more</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-hairline flex flex-wrap gap-3">
        {Object.entries(LEAVE_TYPE_COLORS)
          .filter(([key]) => events.some((e) => e.type === key))
          .map(([key, colors]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className={cn('w-3 h-3 rounded', colors.bar)} />
              <span className="text-xs text-ink-muted capitalize">{key}</span>
            </div>
          ))}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-danger-tint" />
          <span className="text-xs text-ink-muted">Holiday</span>
        </div>
      </div>
    </div>
  );
}
