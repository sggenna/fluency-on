import { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  Filter,
} from 'lucide-react';

import type { StudentCalendarEvent } from '../../types/schedule';

const DEFAULT_EVENTS: StudentCalendarEvent[] = [
  { id: 1, title: 'Aula ao Vivo: Grammar Review', date: '2026-01-10', time: '19:00', duration: '60 min', teacher: 'Prof. Jamile Oliveira', type: 'live', meetLink: 'https://meet.google.com/abc-defg-hij' },
  { id: 2, title: 'Conversation Practice', date: '2026-01-12', time: '19:00', duration: '45 min', teacher: 'Prof. Jamile Oliveira', type: 'live', meetLink: 'https://meet.google.com/xyz-uvwx-rst' },
  { id: 3, title: 'Business English Workshop', date: '2026-01-15', time: '19:00', duration: '90 min', teacher: 'Prof. Jamile Oliveira', type: 'live', meetLink: 'https://meet.google.com/123-4567-890' },
  { id: 4, title: 'Aula Gravada: Past Perfect', date: '2026-01-08', time: '19:00', duration: '45 min', teacher: 'Prof. Jamile Oliveira', type: 'recording', recordingLink: '#' },
  { id: 5, title: 'Grammar Basics', date: '2026-01-06', time: '10:00', duration: '60 min', teacher: 'Prof. Jamile Oliveira', type: 'live', meetLink: '#' },
  { id: 6, title: 'Listening Practice', date: '2026-01-07', time: '14:00', duration: '60 min', teacher: 'Prof. Jamile Oliveira', type: 'live', meetLink: '#' },
];

const ROW_HEIGHT = 56;
const HOURS_START = 7;
const HOURS_END = 22;
const HOURS = Array.from(
  { length: HOURS_END - HOURS_START },
  (_, i) => HOURS_START + i
);

function parseTime(timeStr: string): { h: number; m: number } {
  const [h, m] = timeStr.split(':').map(Number);
  return { h: h ?? 0, m: m ?? 0 };
}

function parseDuration(dur: string): number {
  const match = dur.match(/(\d+)\s*min/);
  return match ? Number(match[1]) : 60;
}

interface CalendarProps {
  /** When provided (from platform shared schedule), these events are shown. Otherwise default sample events are used. */
  events?: StudentCalendarEvent[];
}

export function Calendar({ events: eventsProp }: CalendarProps) {
  const [view, setView] = useState<'week' | 'month'>('week');
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 0, 1)); // Jan 2026 so sample events are visible
  const [weekStart, setWeekStart] = useState(() => {
    const d = new Date(2026, 0, 4); // Jan 4, 2026 (Sunday)
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'live' | 'recording'>('all');

  const events = eventsProp ?? DEFAULT_EVENTS;

  const dayLabels = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
  const filteredEvents = events.filter((e) => {
    if (filterType === 'all') return true;
    if (filterType === 'live') return e.type === 'live';
    return e.type === 'recording';
  });

  const getEventsForDate = (dateString: string) =>
    filteredEvents.filter((e) => e.date === dateString);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  // Month view: generate calendar days with local date string
  const generateCalendarDays = (): (null | { day: number; dateString: string; events: StudentCalendarEvent[] })[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days: (null | { day: number; dateString: string; events: StudentCalendarEvent[] })[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({ day, dateString, events: getEventsForDate(dateString) });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const changeMonth = (delta: number) => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + delta);
    setCurrentDate(d);
  };
  const isToday = (dateStr: string) => {
    const d = new Date();
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return dateStr === today;
  };

  const previousWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setWeekStart(d);
  };

  const nextWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d);
  };

  const formatWeekRange = () => {
    const end = new Date(weekStart);
    end.setDate(end.getDate() + 6);
    return `${weekStart.getDate()} ${weekStart.toLocaleDateString('pt-BR', { month: 'short' })} – ${end.getDate()} ${end.toLocaleDateString('pt-BR', { month: 'short' })} ${weekStart.getFullYear()}`;
  };

  const getEventPlacement = (event: StudentCalendarEvent) => {
    const eventDate = new Date(event.date);
    const dayIndex = Math.round((eventDate.getTime() - weekStart.getTime()) / (24 * 60 * 60 * 1000));
    if (dayIndex < 0 || dayIndex > 6) return null;
    const { h, m } = parseTime(event.time);
    const durationMin = parseDuration(event.duration);
    const startMinutes = (h - HOURS_START) * 60 + m;
    if (startMinutes < 0) return null;
    const durationSlots = Math.max(1, Math.ceil(durationMin / 60));
    const rowStart = 1 + Math.floor(startMinutes / 60);
    if (rowStart + durationSlots > HOURS.length + 1) return null;
    return { dayIndex, rowStart, durationSlots };
  };

  const formatTimeLabel = (hour: number) => {
    if (hour === 12) return '12 PM';
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-[#253439] mb-2">Calendário</h1>
        <p className="text-[#7c898b]">Visualize suas aulas em formato de agenda semanal</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#b29e84]/20 overflow-hidden shadow-lg shadow-[#b29e84]/10">
        {/* Header: view toggle + week/month nav + filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-[#b29e84]/20 bg-[#f6f4f1]">
          <h2 className="text-xl font-semibold text-[#253439]">
            {view === 'week' ? 'Agenda Semanal' : 'Calendário do Mês'}
          </h2>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex gap-2">
              <button
                onClick={() => setView('week')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${view === 'week' ? 'bg-[#fbb80f] text-white' : 'bg-white text-[#253439] border border-[#b29e84]/30 hover:bg-[#b29e84]/10'}`}
              >
                Semana
              </button>
              <button
                onClick={() => setView('month')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${view === 'month' ? 'bg-[#fbb80f] text-white' : 'bg-white text-[#253439] border border-[#b29e84]/30 hover:bg-[#b29e84]/10'}`}
              >
                Mês
              </button>
            </div>
            {view === 'week' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={previousWeek}
                  className="p-2 rounded-lg hover:bg-[#b29e84]/20 text-[#253439] transition-colors"
                  aria-label="Semana anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium text-[#253439] min-w-[200px] text-center">
                  {formatWeekRange()}
                </span>
                <button
                  onClick={nextWeek}
                  className="p-2 rounded-lg hover:bg-[#b29e84]/20 text-[#253439] transition-colors"
                  aria-label="Próxima semana"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
            {view === 'month' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-2 rounded-lg hover:bg-[#b29e84]/20 text-[#253439] transition-colors"
                  aria-label="Mês anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-semibold text-[#253439] min-w-[180px] text-center capitalize">
                  {monthName}
                </span>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-2 rounded-lg hover:bg-[#b29e84]/20 text-[#253439] transition-colors"
                  aria-label="Próximo mês"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
            <button
              onClick={() => setShowFilters((f) => !f)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${showFilters ? 'bg-[#fbb80f] text-white border-[#fbb80f]' : 'border-[#b29e84]/30 text-[#253439] hover:bg-white'}`}
            >
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="p-4 border-b border-[#b29e84]/20 bg-white">
            <p className="text-sm font-medium text-[#253439] mb-2">Tipo de aula</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterType === 'all' ? 'bg-[#fbb80f] text-white' : 'bg-[#f6f4f1] text-[#253439] hover:bg-[#b29e84]/20'}`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterType('live')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${filterType === 'live' ? 'bg-[#fbb80f] text-white' : 'bg-[#f6f4f1] text-[#253439] hover:bg-[#b29e84]/20'}`}
              >
                <Video className="w-4 h-4" />
                Ao vivo
              </button>
              <button
                onClick={() => setFilterType('recording')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${filterType === 'recording' ? 'bg-[#fbb80f] text-white' : 'bg-[#f6f4f1] text-[#253439] hover:bg-[#b29e84]/20'}`}
              >
                <PlayCircle className="w-4 h-4" />
                Gravações
              </button>
            </div>
          </div>
        )}

        {/* Month view */}
        {view === 'month' && (
          <div className="overflow-hidden">
            <div className="grid grid-cols-7 bg-[#f6f4f1] border-b-2 border-[#b29e84]/25">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                <div key={day} className="p-2 text-center font-semibold text-[#253439] text-sm">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 bg-[#faf9f8]">
              {calendarDays.map((dayData, index) => {
                if (!dayData) {
                  return <div key={`empty-${index}`} className="border border-[#b29e84]/10 min-h-[100px] bg-[#f6f4f1]/50" />;
                }
                const { day, dateString, events: dayEvents } = dayData;
                const todayClass = isToday(dateString);
                return (
                  <div
                    key={dateString}
                    className={`border border-[#b29e84]/15 p-2 min-h-[100px] hover:bg-white transition-colors ${todayClass ? 'bg-[#fbb80f]/10' : ''}`}
                  >
                    <div className={`text-sm font-semibold mb-1.5 ${todayClass ? 'w-7 h-7 bg-[#fbb80f] text-white rounded-full flex items-center justify-center' : 'text-[#253439]'}`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          className="text-xs bg-gradient-to-r from-[#fbb80f]/90 to-[#fbee0f]/90 text-white p-1.5 rounded cursor-default hover:shadow-md transition-shadow"
                          title={`${event.title} - ${event.time}`}
                        >
                          <div className="font-semibold truncate">{event.time}</div>
                          <div className="truncate opacity-95">{event.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Week view: calendar grid day headers + grid */}
        {view === 'week' && (
        <>
        <div
          className="grid border-b-2 border-[#b29e84]/25 bg-[#f6f4f1]"
          style={{ gridTemplateColumns: `72px repeat(7, minmax(0, 1fr))` }}
        >
          <div className="p-3 border-r border-[#b29e84]/25" />
          {weekDays.map((d, i) => (
            <div
              key={i}
              className="p-3 border-r border-[#b29e84]/25 last:border-r-0 text-center"
            >
              <div className="text-[10px] font-bold text-[#7c898b] uppercase tracking-wider">
                {dayLabels[i]}
              </div>
              <div className="text-base font-bold text-[#253439] mt-0.5">{d.getDate()}</div>
            </div>
          ))}
        </div>

        {/* Calendar grid: time column + cells + event blocks */}
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-280px)]">
          <div
            className="grid min-w-[700px] bg-[#faf9f8]"
            style={{
              gridTemplateColumns: `72px repeat(7, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${HOURS.length}, ${ROW_HEIGHT}px)`,
            }}
          >
            {/* Time labels - styled calendar column */}
            {HOURS.map((hour, i) => (
              <div
                key={hour}
                className="sticky left-0 z-10 border-r-2 border-b border-[#b29e84]/20 bg-white py-2 pr-2 text-right text-xs font-semibold text-[#5a6b72]"
                style={{ gridColumn: 1, gridRow: i + 1 }}
              >
                {formatTimeLabel(hour)}
              </div>
            ))}

            {/* Grid cells - alternating rows, clear borders */}
            {HOURS.map((_, row) =>
              Array.from({ length: 7 }).map((_, col) => (
                <div
                  key={`${row}-${col}`}
                  className={`border-r border-b border-[#b29e84]/15 last:border-r-0 ${row % 2 === 0 ? 'bg-white' : 'bg-[#f6f4f1]/70'}`}
                  style={{ gridColumn: col + 2, gridRow: row + 1 }}
                />
              ))
            )}

            {/* Event blocks - full text visible, scroll if needed */}
            {filteredEvents.map((event) => {
              const placement = getEventPlacement(event);
              if (!placement) return null;
              const { dayIndex, rowStart, durationSlots } = placement;
              return (
                <div
                  key={event.id}
                  className="pointer-events-auto flex flex-col rounded-lg border-2 border-[#fbb80f]/50 overflow-hidden shadow-md hover:shadow-lg hover:border-[#fbb80f]/70 transition-all duration-200 bg-white/95"
                  style={{
                    gridColumn: dayIndex + 2,
                    gridRow: `${rowStart} / span ${durationSlots}`,
                    background: event.type === 'live'
                      ? 'linear-gradient(135deg, rgba(251,184,15,0.2) 0%, rgba(251,238,15,0.14) 100%)'
                      : 'linear-gradient(135deg, rgba(178,158,132,0.14) 0%, rgba(124,137,139,0.1) 100%)',
                    minHeight: ROW_HEIGHT * durationSlots - 6,
                    margin: '3px',
                  }}
                >
                  <div className="p-2.5 flex-1 overflow-y-auto overflow-x-hidden flex flex-col min-h-0">
                    <div className="flex items-start gap-1.5 mb-1">
                      {event.type === 'live' ? (
                        <Video className="w-4 h-4 text-[#fbb80f] flex-shrink-0 mt-0.5" />
                      ) : (
                        <PlayCircle className="w-4 h-4 text-[#7c898b] flex-shrink-0 mt-0.5" />
                      )}
                      <span className="text-xs font-bold text-[#253439] break-words leading-snug">
                        {event.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5a6b72] break-words leading-snug font-medium">
                      {event.teacher}
                    </p>
                    <p className="text-[11px] text-[#7c898b] mt-auto pt-1">
                      {event.time} · {event.duration}
                    </p>
                  </div>
                  {event.type === 'live' && event.meetLink && (
                    <a
                      href={event.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto block w-full py-2 text-center text-[11px] font-bold text-[#fbb80f] hover:bg-[#fbb80f]/20 border-t border-[#fbb80f]/40 transition-colors shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Entrar
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        </>
        )}
      </div>

      {/* Legend / upcoming list on small screens or optional sidebar could go here */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#b29e84]/20 p-4">
          <h3 className="font-semibold text-[#253439] mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#fbb80f]" />
            Próximas aulas
          </h3>
          <ul className="space-y-2">
            {filteredEvents
              .filter((e) => new Date(e.date) >= new Date(weekStart))
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 5)
              .map((event) => (
                <li key={event.id} className="flex items-center justify-between py-2 border-b border-[#b29e84]/10 last:border-0">
                  <div>
                    <p className="font-medium text-[#253439] text-sm">{event.title}</p>
                    <p className="text-xs text-[#7c898b]">
                      {new Date(event.date).toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })} · {event.time}
                    </p>
                  </div>
                  {event.type === 'live' && event.meetLink && (
                    <a
                      href={event.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[#fbb80f] hover:text-[#253439]"
                    >
                      Entrar
                    </a>
                  )}
                </li>
              ))}
          </ul>
        </div>
        <div className="bg-gradient-to-br from-[#fbb80f]/10 to-[#fbee0f]/10 border border-[#fbb80f]/30 rounded-xl p-4">
          <h3 className="font-semibold text-[#253439] mb-3">Esta semana</h3>
          <div className="space-y-2 text-sm text-[#7c898b]">
            <p>Aulas agendadas: <span className="font-semibold text-[#253439]">{filteredEvents.filter((e) => {
              const d = new Date(e.date);
              return d >= weekStart && d < new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
            }).length}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
