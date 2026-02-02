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
  MapPin,
  X
} from 'lucide-react';

interface ClassSchedule {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: number;
  course: string;
  students: number;
  maxStudents: number;
  meetLink: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  isIndividual?: boolean;
  studentName?: string;
}

export function ScheduleManagement() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'week' | 'month'>('week');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    title: '',
    date: '',
    time: '19:00',
    course: 'B1 - Intermediate',
    duration: 60,
    maxStudents: 15,
    meetLink: '',
    type: 'group' as 'group' | 'individual',
    individualStudent: ''
  });
  const [schedules, setSchedules] = useState<ClassSchedule[]>([
    {
      id: 1,
      title: 'Aula ao Vivo: Grammar Review',
      date: '2026-01-10',
      time: '19:00',
      duration: 60,
      course: 'B1 - Intermediate',
      students: 12,
      maxStudents: 15,
      meetLink: 'https://meet.google.com/abc-defg-hij',
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Conversation Practice',
      date: '2026-01-12',
      time: '19:00',
      duration: 45,
      course: 'Conversation 1',
      students: 8,
      maxStudents: 10,
      meetLink: 'https://meet.google.com/xyz-uvwx-rst',
      status: 'scheduled'
    },
    {
      id: 3,
      title: 'Business English Workshop',
      date: '2026-01-15',
      time: '19:00',
      duration: 90,
      course: 'Business English',
      students: 10,
      maxStudents: 12,
      meetLink: 'https://meet.google.com/123-4567-890',
      status: 'scheduled'
    },
    {
      id: 4,
      title: 'Grammar Basics',
      date: '2026-01-08',
      time: '19:00',
      duration: 60,
      course: 'A2 - Elementary',
      students: 10,
      maxStudents: 10,
      meetLink: 'https://meet.google.com/past-class-001',
      status: 'completed'
    },
  ]);

  const stats = [
    { label: 'Aulas Esta Semana', value: 5, icon: CalendarIcon, color: 'bg-[#253439]/10 text-[#253439]' },
    { label: 'Total de Alunos', value: 40, icon: Users, color: 'bg-[#fbb80f]/10 text-[#fbb80f]' },
    { label: 'Horas Agendadas', value: '12h', icon: Clock, color: 'bg-[#fbee0f]/20 text-[#fbee0f]' },
    { label: 'Próxima Aula', value: 'Hoje 19:00', icon: Video, color: 'bg-[#b29e84]/20 text-[#b29e84]' },
  ];

  const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const INDIVIDUAL_STUDENTS = ['Ana Maria Santos', 'Carlos Eduardo Silva', 'Mariana Costa', 'Pedro Henrique', 'Juliana Oliveira'];

  const getSchedulesForDate = (date: string) => {
    return schedules.filter(s => s.date === date && s.status !== 'cancelled');
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

  const handleCancelSchedule = (id: number) => {
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, status: 'cancelled' as const } : s));
  };

  const handleAddSchedule = () => {
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
    setShowAddModal(false);
    setAddForm({ title: '', date: '', time: '19:00', course: 'B1 - Intermediate', duration: 60, maxStudents: 15, meetLink: '', type: 'group', individualStudent: '' });
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
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
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
    const today = new Date().toISOString().split('T')[0];
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
            onClick={() => setShowAddModal(true)}
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

          <div className="flex gap-2">
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
          </div>
        </div>
      </div>

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

      {/* Semana view - 7-day grid */}
      {view === 'week' && (
        <div className="bg-white rounded-xl border border-[#b29e84]/20 overflow-hidden mb-6">
          <div className="p-4 border-b border-[#b29e84]/20 bg-[#f6f4f1] flex items-center justify-between">
            <h2 className="font-semibold text-[#253439]">Vista Semana</h2>
            <div className="flex gap-2">
              <button type="button" onClick={() => setCurrentDate(prev => { const d = new Date(prev); d.setDate(d.getDate() - 7); return d; })} className="p-2 rounded-lg hover:bg-[#b29e84]/20">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-[#7c898b] min-w-[140px] text-center">
                {getWeekDays(currentDate)[0].toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} – {getWeekDays(currentDate)[6].toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <button type="button" onClick={() => setCurrentDate(prev => { const d = new Date(prev); d.setDate(d.getDate() + 7); return d; })} className="p-2 rounded-lg hover:bg-[#b29e84]/20">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 border-b border-[#b29e84]/20">
            {getWeekDays(currentDate).map((day) => {
              const dateStr = day.toISOString().split('T')[0];
              const daySchedules = getSchedulesForDate(dateStr);
              return (
                <div key={dateStr} className="border-r border-[#b29e84]/10 last:border-r-0 p-3 min-h-[100px]">
                  <div className="text-xs font-semibold text-[#7c898b] mb-1">{weekDays[day.getDay() === 0 ? 6 : day.getDay() - 1]}</div>
                  <div className={`text-lg font-bold mb-2 ${isToday(dateStr) ? 'text-[#fbb80f]' : 'text-[#253439]'}`}>{day.getDate()}</div>
                  <div className="space-y-1">
                    {daySchedules.map((s) => (
                      <div key={s.id} className="text-xs bg-[#fbb80f]/20 text-[#253439] p-1.5 rounded truncate" title={s.title}>
                        {s.time} {s.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
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
            {schedules
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
                          <button className="bg-[#f6f4f1] text-[#253439] px-4 py-2 rounded-lg hover:bg-[#b29e84]/20 transition-colors text-sm font-medium flex items-center gap-2">
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

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-[#fbb80f] to-[#fbee0f] p-6 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Agendar Nova Aula</h2>
                <button
                  onClick={() => setShowAddModal(false)}
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
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-white text-[#253439] px-4 py-2.5 rounded-lg hover:bg-[#b29e84]/20 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddSchedule}
                className="flex-1 bg-[#fbb80f] text-white px-4 py-2.5 rounded-lg hover:bg-[#253439] transition-colors font-medium flex items-center justify-center gap-2"
              >
                <CalendarIcon className="w-5 h-5" />
                Agendar Aula
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}