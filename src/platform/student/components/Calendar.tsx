import { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  MapPin,
  ChevronLeft,
  ChevronRight,
  PlayCircle
} from 'lucide-react';

interface ClassEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  teacher: string;
  type: 'live' | 'recording';
  meetLink?: string;
  recordingLink?: string;
  location?: string;
}

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 9)); // January 9, 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const events: ClassEvent[] = [
    {
      id: 1,
      title: 'Aula ao Vivo: Grammar Review',
      date: '2026-01-10',
      time: '19:00',
      duration: '60 min',
      teacher: 'Prof. Jamile Oliveira',
      type: 'live',
      meetLink: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: 2,
      title: 'Conversation Practice',
      date: '2026-01-12',
      time: '19:00',
      duration: '45 min',
      teacher: 'Prof. Jamile Oliveira',
      type: 'live',
      meetLink: 'https://meet.google.com/xyz-uvwx-rst'
    },
    {
      id: 3,
      title: 'Business English Workshop',
      date: '2026-01-15',
      time: '19:00',
      duration: '90 min',
      teacher: 'Prof. Jamile Oliveira',
      type: 'live',
      meetLink: 'https://meet.google.com/123-4567-890'
    },
    {
      id: 4,
      title: 'Aula Gravada: Past Perfect',
      date: '2026-01-08',
      time: '19:00',
      duration: '45 min',
      teacher: 'Prof. Jamile Oliveira',
      type: 'recording',
      recordingLink: '#'
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const hasEventOnDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.some(event => event.date === dateStr);
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#253439] mb-2">Calendário</h1>
        <p className="text-[#7c898b]">Visualize suas aulas agendadas e acesse gravações</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#253439]">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-[#f6f4f1] rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-[#7c898b]" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-[#f6f4f1] rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-[#7c898b]" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
              <div key={day} className="text-center text-sm font-semibold text-[#7c898b] py-2">
                {day}
              </div>
            ))}
            
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const isToday = 
                day === 9 && 
                currentDate.getMonth() === 0 && 
                currentDate.getFullYear() === 2026;
              const hasEvent = hasEventOnDate(day);
              const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const isSelected = 
                selectedDate?.getDate() === day &&
                selectedDate?.getMonth() === currentDate.getMonth() &&
                selectedDate?.getFullYear() === currentDate.getFullYear();

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateObj)}
                  className={`aspect-square flex flex-col items-center justify-center rounded-lg transition-all ${
                    isToday
                      ? 'bg-[#fbb80f] text-white font-semibold'
                      : isSelected
                      ? 'bg-[#fbb80f]/10 text-[#253439] font-semibold border border-[#fbb80f]/30'
                      : hasEvent
                      ? 'bg-[#b29e84]/10 text-[#253439] hover:bg-[#b29e84]/20'
                      : 'text-[#253439] hover:bg-[#f6f4f1]'
                  }`}
                >
                  <span>{day}</span>
                  {hasEvent && !isToday && !isSelected && (
                    <div className="w-1.5 h-1.5 bg-[#fbb80f] rounded-full mt-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Date Events */}
          {selectedDate && (
            <div className="mt-6 pt-6 border-t border-[#b29e84]/20">
              <h3 className="font-semibold text-[#253439] mb-3">
                Eventos - {selectedDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
              </h3>
              {getEventsForDate(selectedDate).length > 0 ? (
                <div className="space-y-3">
                  {getEventsForDate(selectedDate).map((event) => (
                    <div key={event.id} className="bg-[#fbb80f]/5 border border-[#fbb80f]/20 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#253439]">{event.title}</h4>
                          <p className="text-sm text-[#7c898b] mt-1">{event.teacher}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-[#7c898b]">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {event.time} ({event.duration})
                            </div>
                          </div>
                        </div>
                        {event.type === 'live' && event.meetLink && (
                          <button className="bg-[#fbb80f] text-white px-4 py-2 rounded-lg hover:bg-[#253439] transition-colors text-sm">
                            Entrar
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#7c898b] text-sm">Nenhum evento agendado para esta data</p>
              )}
            </div>
          )}
        </div>

        {/* Upcoming Classes Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Classes */}
          <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
            <h2 className="text-xl font-semibold text-[#253439] mb-4">Próximas Aulas</h2>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border border-[#b29e84]/20 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      event.type === 'live' ? 'bg-[#fbb80f]/10' : 'bg-[#b29e84]/10'
                    }`}>
                      {event.type === 'live' ? (
                        <Video className={`w-5 h-5 ${event.type === 'live' ? 'text-[#fbb80f]' : 'text-[#7c898b]'}`} />
                      ) : (
                        <PlayCircle className="w-5 h-5 text-[#7c898b]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#253439] text-sm mb-1">{event.title}</h3>
                      <p className="text-xs text-[#7c898b]">{event.teacher}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-[#7c898b] mb-3">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString('pt-BR', { 
                        weekday: 'short', 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {event.time} - {event.duration}
                    </div>
                  </div>
                  {event.type === 'live' && event.meetLink && (
                    <button className="w-full bg-[#fbb80f] text-white py-2 rounded-lg hover:bg-[#253439] transition-colors text-sm flex items-center justify-center gap-2">
                      <Video className="w-4 h-4" />
                      Entrar na Aula
                    </button>
                  )}
                  {event.type === 'recording' && event.recordingLink && (
                    <button className="w-full bg-[#253439] text-white py-2 rounded-lg hover:bg-[#7c898b] transition-colors text-sm flex items-center justify-center gap-2">
                      <PlayCircle className="w-4 h-4" />
                      Assistir Gravação
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-[#fbb80f]/10 to-[#fbee0f]/10 border border-[#fbb80f]/30 rounded-xl p-6">
            <h3 className="font-semibold text-[#253439] mb-4">Este Mês</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[#7c898b]">Aulas Agendadas</span>
                <span className="text-2xl font-bold text-[#253439]">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#7c898b]">Horas de Aula</span>
                <span className="text-2xl font-bold text-[#253439]">12h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#7c898b]">Participação</span>
                <span className="text-2xl font-bold text-[#fbb80f]">100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}