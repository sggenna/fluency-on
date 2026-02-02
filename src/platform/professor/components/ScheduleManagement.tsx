import { useState } from 'react';
import {
  Plus,
  Calendar as CalendarIcon,
  Clock,
  Users,
  Video,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
} from 'lucide-react';
import type { ClassSchedule } from '../../types/schedule';

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

function formatTimeLabel(hour: number) {
  if (hour === 12) return '12 PM';
  if (hour < 12) return `${hour} AM`;
  return `${hour - 12} PM`;
}

interface ScheduleManagementProps {
  schedules: ClassSchedule[];
  setSchedules: React.Dispatch<React.SetStateAction<ClassSchedule[]>>;
}

export function ScheduleManagement({ schedules, setSchedules }: ScheduleManagementProps) {
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 0, 1)); // Jan 2026 so sample classes are visible in month view
  const [weekStart, setWeekStart] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - d.getDay());
    return d;
  });
  const [view, setView] = useState<'week' | 'month'>('week');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingScheduleId, setEditingScheduleId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'live'>('all'); // all = scheduled + completed, live = scheduled only
  const [filterCourse, setFilterCourse] = useState<string>('all');
  const [addForm, setAddForm] = useState({
    title: '',
    date: '',
    time: '19:00',
    course: 'B1 - Intermediate',
    duration: 60,
    maxStudents: 15,
    meetLink: '',
    type: 'group' as 'group' | 'individual',
    individualStudent: '',
  });

  const stats = [
    { label: 'Aulas Esta Semana', value: 5, icon: CalendarIcon, color: 'bg-[#253439]/10 text-[#253439]' },
    { label: 'Total de Alunos', value: 40, icon: Users, color: 'bg-[#fbb80f]/10 text-[#fbb80f]' },
    { label: 'Horas Agendadas', value: '12h', icon: Clock, color: 'bg-[#fbee0f]/20 text-[#fbee0f]' },
    { label: 'Próxima Aula', value: 'Hoje 19:00', icon: Video, color: 'bg-[#b29e84]/20 text-[#b29e84]' },
  ];

  const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const dayLabels = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
  const INDIVIDUAL_STUDENTS = ['Ana Maria Santos', 'Carlos Eduardo Silva', 'Mariana Costa', 'Pedro Henrique', 'Juliana Oliveira'];

  const plannerWeekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const formatWeekRange = () => {
    const end = new Date(weekStart);
    end.setDate(end.getDate() + 6);
    return `${weekStart.getDate()} ${weekStart.toLocaleDateString('pt-BR', { month: 'short' })} – ${end.getDate()} ${end.toLocaleDateString('pt-BR', { month: 'short' })} ${weekStart.getFullYear()}`;
  };

  const getEventPlacement = (schedule: ClassSchedule) => {
    const eventDate = new Date(schedule.date);
    const dayIndex = Math.round((eventDate.getTime() - weekStart.getTime()) / (24 * 60 * 60 * 1000));
    if (dayIndex < 0 || dayIndex > 6) return null;
    const { h, m } = parseTime(schedule.time);
    const durationMin = schedule.duration;
    const startMinutes = (h - HOURS_START) * 60 + m;
    if (startMinutes < 0) return null;
    const durationSlots = Math.max(1, Math.ceil(durationMin / 60));
    const rowStart = 1 + Math.floor(startMinutes / 60);
    if (rowStart + durationSlots > HOURS.length + 1) return null;
    return { dayIndex, rowStart, durationSlots };
  };

  const filteredSchedules = schedules.filter((s) => {
    if (s.status === 'cancelled') return false;
    if (filterType === 'live' && s.status !== 'scheduled') return false;
    if (filterCourse !== 'all' && s.course !== filterCourse) return false;
    return true;
  });

  const getSchedulesForDate = (date: string) => {
    return filteredSchedules.filter(s => s.date === date);
  };

  const getWeekDays = (ref: Date) => {
    const start = new Date(ref);
    start.setDate(start.getDate() - start.getDay() + (start.getDay() === 0 ? -6 : 1));
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
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

  const handleCancelSchedule = (id: number) => {
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, status: 'cancelled' as const } : s));
  };

  const handleEditSchedule = (schedule: ClassSchedule) => {
    setEditingScheduleId(schedule.id);
    setAddForm({
      title: schedule.isIndividual && schedule.studentName ? '' : schedule.title,
      date: schedule.date,
      time: schedule.time,
      course: schedule.course,
      duration: schedule.duration,
      maxStudents: schedule.maxStudents,
      meetLink: schedule.meetLink,
      type: schedule.isIndividual ? 'individual' : 'group',
      individualStudent: schedule.studentName || ''
    });
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingScheduleId(null);
    setAddForm({ title: '', date: '', time: '19:00', course: 'B1 - Intermediate', duration: 60, maxStudents: 15, meetLink: '', type: 'group', individualStudent: '' });
  };

  const handleUpdateSchedule = () => {
    if (editingScheduleId == null) return;
    const isIndividual = addForm.type === 'individual';
    if (isIndividual && !addForm.individualStudent) return;
    if (!isIndividual && !addForm.title.trim()) return;
    setSchedules(prev => prev.map(s => {
      if (s.id !== editingScheduleId) return s;
      return {
        ...s,
        title: isIndividual && addForm.individualStudent ? `Aula individual - ${addForm.individualStudent}` : addForm.title.trim(),
        date: addForm.date,
        time: addForm.time,
        duration: addForm.duration,
        course: addForm.course,
        maxStudents: isIndividual ? 1 : addForm.maxStudents,
        meetLink: addForm.meetLink || s.meetLink,
        isIndividual: isIndividual || undefined,
        studentName: isIndividual ? addForm.individualStudent : undefined
      };
    }));
    handleCloseModal();
  };

  const handleAddSchedule = () => {
    if (editingScheduleId != null) {
      handleUpdateSchedule();
      return;
    }
    if (!addForm.date || !addForm.time) return;
    const isIndividual = addForm.type === 'individual';
    if (isIndividual && !addForm.individualStudent) return;
    if (!isIndividual && !addForm.title.trim()) return;
    const maxStudents = isIndividual ? 1 : addForm.maxStudents;
    const students = isIndividual ? 1 : 0;
    setSchedules(prev => [
      ...prev,
      {
        id: Date.now(),
        title: isIndividual && addForm.individualStudent ? `Aula individual - ${addForm.individualStudent}` : addForm.title,
        date: addForm.date,
        time: addForm.time,
        duration: addForm.duration,
        course: addForm.course,
        students,
        maxStudents,
        meetLink: addForm.meetLink || 'https://meet.google.com/new',
        status: 'scheduled',
        isIndividual: isIndividual || undefined,
        studentName: isIndividual ? addForm.individualStudent : undefined
      }
    ]);
    handleCloseModal();
  };

  const formatTime = (time: string, duration: number) => {
    const [hour, minute] = time.split(':');
    const endHour = parseInt(hour) + Math.floor(duration / 60);
    const endMinute = parseInt(minute) + (duration % 60);
    return `${time} - ${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month (use local date string so schedules match)
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({ day, dateString, schedules: getSchedulesForDate(dateString) });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const isToday = (dateString: string) => {
    const d = new Date();
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return dateString === today;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-[#253439] mb-2">Calendário de Aulas</h1>
            <p className="text-[#7c898b]">Gerencie seus horários e aulas agendadas</p>
          </div>
          <button 
            onClick={() => {
              setEditingScheduleId(null);
              setAddForm({ title: '', date: '', time: '19:00', course: 'B1 - Intermediate', duration: 60, maxStudents: 15, meetLink: '', type: 'group', individualStudent: '' });
              setShowAddModal(true);
            }}
            className="bg-[#fbb80f] text-white px-6 py-3 rounded-lg hover:bg-[#253439] transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Agendar Aula
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-[#b29e84]/20">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold text-[#253439] mb-1">{stat.value}</p>
              <p className="text-sm text-[#7c898b]">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Calendar Controls */}
      <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => changeMonth(-1)}
              className="w-10 h-10 bg-[#f6f4f1] rounded-lg hover:bg-[#b29e84]/20 transition-colors flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-[#253439]" />
            </button>
            <h2 className="text-xl font-semibold text-[#253439] capitalize">
              {monthName}
            </h2>
            <button 
              onClick={() => changeMonth(1)}
              className="w-10 h-10 bg-[#f6f4f1] rounded-lg hover:bg-[#b29e84]/20 transition-colors flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 text-[#253439]" />
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => setView('week')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === 'week'
                  ? 'bg-[#fbb80f] text-white'
                  : 'bg-[#f6f4f1] text-[#253439] hover:bg-[#b29e84]/20'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setView('month')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === 'month'
                  ? 'bg-[#fbb80f] text-white'
                  : 'bg-[#f6f4f1] text-[#253439] hover:bg-[#b29e84]/20'
              }`}
            >
              Mês
            </button>
            <button
              onClick={() => setShowFilters((f) => !f)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${showFilters ? 'bg-[#fbb80f] text-white' : 'bg-[#f6f4f1] text-[#253439] hover:bg-[#b29e84]/20'}`}
            >
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6 mb-6">
          <p className="text-sm font-semibold text-[#253439] mb-3">Filtros</p>
          <div className="flex flex-wrap gap-6 items-end">
            <div>
              <label className="block text-xs font-medium text-[#7c898b] mb-1">Status</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterType === 'all' ? 'bg-[#fbb80f] text-white' : 'bg-[#f6f4f1] text-[#253439] hover:bg-[#b29e84]/20'}`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setFilterType('live')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterType === 'live' ? 'bg-[#fbb80f] text-white' : 'bg-[#f6f4f1] text-[#253439] hover:bg-[#b29e84]/20'}`}
                >
                  Agendadas
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#7c898b] mb-1">Curso</label>
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="px-4 py-2 rounded-lg border border-[#b29e84]/30 text-[#253439] bg-white text-sm font-medium focus:outline-none focus:border-[#fbb80f]"
              >
                <option value="all">Todos os cursos</option>
                {Array.from(new Set(schedules.map((s) => s.course))).sort().map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Grid */}
      {view === 'month' && (
        <div className="bg-white rounded-xl border border-[#b29e84]/20 overflow-hidden mb-6">
          {/* Day headers */}
          <div className="grid grid-cols-7 bg-[#f6f4f1] border-b border-[#b29e84]/20">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
              <div key={day} className="p-3 text-center font-semibold text-[#253439] text-sm">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {calendarDays.map((dayData, index) => {
              if (!dayData) {
                return <div key={`empty-${index}`} className="border border-[#b29e84]/10 bg-[#f6f4f1]/30 min-h-[120px]" />;
              }

              const { day, dateString, schedules: daySchedules } = dayData;
              const todayClass = isToday(dateString);

              return (
                <div 
                  key={dateString} 
                  className={`border border-[#b29e84]/10 p-2 min-h-[120px] hover:bg-[#f6f4f1] transition-colors ${
                    todayClass ? 'bg-[#fbb80f]/5' : ''
                  }`}
                >
                  <div className={`text-sm font-semibold mb-2 ${
                    todayClass 
                      ? 'w-7 h-7 bg-[#fbb80f] text-white rounded-full flex items-center justify-center' 
                      : 'text-[#253439]'
                  }`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {daySchedules.map((schedule) => (
                      <div 
                        key={schedule.id}
                        className="text-xs bg-gradient-to-r from-[#fbb80f] to-[#fbee0f] text-white p-1.5 rounded cursor-pointer hover:shadow-md transition-shadow"
                        title={`${schedule.title} - ${schedule.time}`}
                      >
                        <div className="font-semibold truncate">{schedule.time}</div>
                        <div className="truncate opacity-90">{schedule.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Weekly Planner view - same styling as student portal */}
      {view === 'week' && (
        <div className="bg-white rounded-2xl border border-[#b29e84]/20 overflow-hidden mb-6 shadow-lg shadow-[#b29e84]/10">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-[#b29e84]/20 bg-[#f6f4f1]">
            <h2 className="text-xl font-semibold text-[#253439]">Agenda Semanal</h2>
            <div className="flex items-center gap-3">
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
          </div>
        </div>

          <div className="grid border-b-2 border-[#b29e84]/25 bg-[#f6f4f1]" style={{ gridTemplateColumns: `72px repeat(7, minmax(0, 1fr))` }}>
            <div className="p-3 border-r border-[#b29e84]/25" />
            {plannerWeekDays.map((d, i) => (
              <div key={i} className="p-3 border-r border-[#b29e84]/25 last:border-r-0 text-center">
                <div className="text-[10px] font-bold text-[#7c898b] uppercase tracking-wider">{dayLabels[i]}</div>
                <div className="text-base font-bold text-[#253439] mt-0.5">{d.getDate()}</div>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-380px)]">
            <div
              className="grid min-w-[700px] relative bg-[#faf9f8]"
              style={{
                gridTemplateColumns: `72px repeat(7, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${HOURS.length}, ${ROW_HEIGHT}px)`,
              }}
            >
              {HOURS.map((hour, i) => (
                <div
                  key={hour}
                  className="sticky left-0 z-10 border-r-2 border-b border-[#b29e84]/20 bg-white py-2 pr-2 text-right text-xs font-semibold text-[#5a6b72]"
                  style={{ gridColumn: 1, gridRow: i + 1 }}
                >
                  {formatTimeLabel(hour)}
                </div>
              ))}

              {HOURS.map((_, row) =>
                Array.from({ length: 7 }).map((_, col) => (
                  <div
                    key={`${row}-${col}`}
                    className={`border-r border-b border-[#b29e84]/15 last:border-r-0 ${row % 2 === 0 ? 'bg-white' : 'bg-[#f6f4f1]/70'}`}
                    style={{ gridColumn: col + 2, gridRow: row + 1 }}
                  />
                ))
              )}

              {filteredSchedules.map((schedule) => {
                  const placement = getEventPlacement(schedule);
                  if (!placement) return null;
                  const { dayIndex, rowStart, durationSlots } = placement;
                  return (
                    <div
                      key={schedule.id}
                      className="pointer-events-auto flex flex-col rounded-lg border-2 border-[#fbb80f]/50 overflow-hidden shadow-md hover:shadow-lg hover:border-[#fbb80f]/70 transition-all duration-200 bg-white/95"
                      style={{
                        gridColumn: dayIndex + 2,
                        gridRow: `${rowStart} / span ${durationSlots}`,
                        background: schedule.status === 'scheduled'
                          ? 'linear-gradient(135deg, rgba(251,184,15,0.2) 0%, rgba(251,238,15,0.14) 100%)'
                          : 'linear-gradient(135deg, rgba(178,158,132,0.14) 0%, rgba(124,137,139,0.1) 100%)',
                        minHeight: ROW_HEIGHT * durationSlots - 6,
                        margin: '3px',
                      }}
                    >
                      <div className="p-2.5 flex-1 overflow-y-auto overflow-x-hidden flex flex-col min-h-0">
                        <div className="flex items-start gap-1.5 mb-1">
                          <Video className="w-4 h-4 text-[#fbb80f] flex-shrink-0 mt-0.5" />
                          <span className="text-xs font-bold text-[#253439] break-words leading-snug">
                            {schedule.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#5a6b72] break-words leading-snug font-medium">
                          {schedule.course}
                        </p>
                        <p className="text-[11px] text-[#7c898b] mt-auto pt-1">
                          {schedule.time} · {schedule.duration} min
                        </p>
                        <p className="text-[11px] text-[#7c898b]">{schedule.students}/{schedule.maxStudents} alunos</p>
                      </div>
                      {schedule.status === 'scheduled' && schedule.meetLink && (
                        <a
                          href={schedule.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pointer-events-auto block w-full py-2 text-center text-[11px] font-bold text-[#fbb80f] hover:bg-[#fbb80f]/20 border-t border-[#fbb80f]/40 transition-colors shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Iniciar
                        </a>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Classes */}
      {view === 'week' && (
        <div className="bg-white rounded-xl border border-[#b29e84]/20 overflow-hidden mb-6">
          <div className="p-4 border-b border-[#b29e84]/20 bg-[#f6f4f1]">
            <h2 className="font-semibold text-[#253439]">Próximas Aulas</h2>
          </div>

          <div className="divide-y divide-[#b29e84]/20">
            {filteredSchedules
              .filter(s => s.status === 'scheduled')
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((schedule) => (
                <div key={schedule.id} className="p-6 hover:bg-[#f6f4f1] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#fbb80f] to-[#fbee0f] rounded-xl flex flex-col items-center justify-center text-white flex-shrink-0">
                      <span className="text-2xl font-bold">
                        {new Date(schedule.date).getDate()}
                      </span>
                      <span className="text-xs">
                        {new Date(schedule.date).toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase()}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-[#253439] mb-1">{schedule.title}</h3>
                          <p className="text-sm text-[#7c898b]">{schedule.course}</p>
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          schedule.status === 'scheduled'
                            ? 'bg-[#fbb80f]/20 text-[#fbb80f]'
                            : schedule.status === 'completed'
                            ? 'bg-[#fbee0f]/20 text-[#fbee0f]'
                            : 'bg-[#7c898b]/20 text-[#7c898b]'
                        }`}>
                          {schedule.status === 'scheduled' ? 'Agendada' : schedule.status === 'completed' ? 'Concluída' : 'Cancelada'}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center gap-2 text-sm text-[#7c898b]">
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(schedule.time, schedule.duration)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#7c898b]">
                          <Users className="w-4 h-4" />
                          <span>{schedule.students}/{schedule.maxStudents} alunos</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#7c898b]">
                          <Video className="w-4 h-4" />
                          <span>Google Meet</span>
                        </div>
                      </div>

                      {schedule.status === 'scheduled' && (
                        <div className="flex gap-2">
                          <a
                            href={schedule.meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#fbb80f] text-white px-4 py-2 rounded-lg hover:bg-[#253439] transition-colors text-sm font-medium flex items-center gap-2"
                          >
                            <Video className="w-4 h-4" />
                            Iniciar Aula
                          </a>
                          <button
                            onClick={() => handleEditSchedule(schedule)}
                            className="bg-[#f6f4f1] text-[#253439] px-4 py-2 rounded-lg hover:bg-[#b29e84]/20 transition-colors text-sm font-medium flex items-center gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            Editar
                          </button>
                          <button
                            onClick={() => handleCancelSchedule(schedule.id)}
                            className="bg-[#f6f4f1] text-[#253439] px-4 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Cancelar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Quick Schedule Template */}
      <div className="bg-gradient-to-br from-[#fbb80f]/10 to-[#fbee0f]/10 border border-[#fbb80f]/30 rounded-xl p-6">
        <h3 className="font-semibold text-[#253439] mb-4">Horários Regulares</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {weekDays.slice(0, 5).map((day) => (
            <div key={day} className="bg-white rounded-lg p-4 text-center border border-[#b29e84]/20">
              <p className="text-sm font-medium text-[#253439] mb-2">{day}</p>
              <p className="text-lg font-bold text-[#fbb80f]">19:00</p>
              <p className="text-xs text-[#7c898b] mt-1">60 min</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-[#fbb80f] to-[#fbee0f] p-6 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{editingScheduleId != null ? 'Editar Aula' : 'Agendar Nova Aula'}</h2>
                <button
                  onClick={handleCloseModal}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#253439] mb-2">Tipo de aula</label>
                  <select
                    value={addForm.type}
                    onChange={(e) => setAddForm(prev => ({ ...prev, type: e.target.value as 'group' | 'individual' }))}
                    className="w-full px-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white"
                  >
                    <option value="group">Grupo</option>
                    <option value="individual">Aula individual (aluno específico)</option>
                  </select>
                </div>

                {addForm.type === 'individual' ? (
                  <div>
                    <label className="block text-sm font-medium text-[#253439] mb-2">Aluno</label>
                    <select
                      value={addForm.individualStudent}
                      onChange={(e) => setAddForm(prev => ({ ...prev, individualStudent: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white"
                    >
                      <option value="">Selecione o aluno</option>
                      {INDIVIDUAL_STUDENTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-[#253439] mb-2">Título da Aula</label>
                    <input
                      type="text"
                      value={addForm.title}
                      onChange={(e) => setAddForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Ex: Grammar Review - Present Perfect"
                      className="w-full px-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#253439] mb-2">Data</label>
                    <input
                      type="date"
                      value={addForm.date}
                      onChange={(e) => setAddForm(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#253439] mb-2">Horário</label>
                    <input
                      type="time"
                      value={addForm.time}
                      onChange={(e) => setAddForm(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#253439] mb-2">Curso</label>
                  <select
                    value={addForm.course}
                    onChange={(e) => setAddForm(prev => ({ ...prev, course: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white"
                  >
                    <option>B1 - Intermediate</option>
                    <option>A1 - Beginner</option>
                    <option>A2 - Elementary</option>
                    <option>B2-C1 - Advanced</option>
                    <option>Conversation 1</option>
                    <option>Conversation 2</option>
                    <option>Business English</option>
                    <option>Travel English</option>
                  </select>
                </div>

                {addForm.type === 'group' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#253439] mb-2">Duração (minutos)</label>
                      <select
                        value={addForm.duration}
                        onChange={(e) => setAddForm(prev => ({ ...prev, duration: Number(e.target.value) }))}
                        className="w-full px-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white"
                      >
                        <option value={30}>30 minutos</option>
                        <option value={45}>45 minutos</option>
                        <option value={60}>60 minutos</option>
                        <option value={90}>90 minutos</option>
                        <option value={120}>120 minutos</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#253439] mb-2">Máx. de Alunos</label>
                      <input
                        type="number"
                        value={addForm.maxStudents}
                        onChange={(e) => setAddForm(prev => ({ ...prev, maxStudents: Number(e.target.value) || 15 }))}
                        min={1}
                        max={50}
                        className="w-full px-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                      />
                    </div>
                  </div>
                )}

                {addForm.type === 'individual' && (
                  <div>
                    <label className="block text-sm font-medium text-[#253439] mb-2">Duração (minutos)</label>
                    <select
                      value={addForm.duration}
                      onChange={(e) => setAddForm(prev => ({ ...prev, duration: Number(e.target.value) }))}
                      className="w-full px-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white"
                    >
                      <option value={30}>30 minutos</option>
                      <option value={45}>45 minutos</option>
                      <option value={60}>60 minutos</option>
                      <option value={90}>90 minutos</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#253439] mb-2">Link do Google Meet (opcional)</label>
                  <input
                    type="url"
                    value={addForm.meetLink}
                    onChange={(e) => setAddForm(prev => ({ ...prev, meetLink: e.target.value }))}
                    placeholder="https://meet.google.com/..."
                    className="w-full px-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-[#b29e84]/20 p-4 bg-[#f6f4f1] flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 bg-white text-[#253439] px-4 py-2.5 rounded-lg hover:bg-[#b29e84]/20 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddSchedule}
                className="flex-1 bg-[#fbb80f] text-white px-4 py-2.5 rounded-lg hover:bg-[#253439] transition-colors font-medium flex items-center justify-center gap-2"
              >
                <CalendarIcon className="w-5 h-5" />
                {editingScheduleId != null ? 'Salvar alterações' : 'Agendar Aula'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}