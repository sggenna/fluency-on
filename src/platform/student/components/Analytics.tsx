import { 
  TrendingUp, 
  Clock, 
  Target, 
  Award,
  Calendar,
  BookOpen,
  CheckCircle,
  BarChart3,
  Download,
  Trophy,
  Flame
} from 'lucide-react';

export function Analytics() {
  const weeklyActivity = [
    { day: 'Seg', minutes: 45, completed: 3 },
    { day: 'Ter', minutes: 60, completed: 4 },
    { day: 'Qua', minutes: 30, completed: 2 },
    { day: 'Qui', minutes: 75, completed: 5 },
    { day: 'Sex', minutes: 50, completed: 3 },
    { day: 'Sáb', minutes: 40, completed: 2 },
    { day: 'Dom', minutes: 65, completed: 4 },
  ];

  const courseProgress = [
    { course: 'B1 - Intermediate', progress: 68, hours: 28, lessons: 16 },
    { course: 'Business English', progress: 45, hours: 12, lessons: 9 },
    { course: 'Conversation 1', progress: 82, hours: 15, lessons: 15 },
  ];

  const skills = [
    { name: 'Grammar', level: 85, trend: 'up' },
    { name: 'Vocabulary', level: 78, trend: 'up' },
    { name: 'Listening', level: 72, trend: 'stable' },
    { name: 'Speaking', level: 68, trend: 'up' },
    { name: 'Reading', level: 90, trend: 'up' },
    { name: 'Writing', level: 75, trend: 'up' },
  ];

  const monthlyStats = [
    { month: 'Set', hours: 18 },
    { month: 'Out', hours: 22 },
    { month: 'Nov', hours: 25 },
    { month: 'Dez', hours: 28 },
    { month: 'Jan', hours: 32 },
  ];

  const maxMinutes = Math.max(...weeklyActivity.map(d => d.minutes));
  const maxHours = Math.max(...monthlyStats.map(m => m.hours));

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#253439] mb-2">Meu Progresso</h1>
            <p className="text-[#7c898b]">Analise seu desempenho e acompanhe seu desenvolvimento</p>
          </div>
          <button className="bg-[#fbb80f] text-white px-4 py-2.5 rounded-lg hover:bg-[#253439] transition-colors flex items-center gap-2">
            <Download className="w-5 h-5" />
            Exportar Relatório
          </button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#253439]/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#253439]" />
            </div>
            <TrendingUp className="w-5 h-5 text-[#fbb80f]" />
          </div>
          <p className="text-sm text-[#7c898b] mb-1">Total de Horas</p>
          <p className="text-3xl font-bold text-[#253439]">42h</p>
          <p className="text-sm text-[#fbb80f] mt-2">+8h esta semana</p>
        </div>

        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#fbb80f]/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#fbb80f]" />
            </div>
            <TrendingUp className="w-5 h-5 text-[#fbb80f]" />
          </div>
          <p className="text-sm text-[#7c898b] mb-1">Lições Completas</p>
          <p className="text-3xl font-bold text-[#253439]">40</p>
          <p className="text-sm text-[#fbb80f] mt-2">+6 esta semana</p>
        </div>

        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#fbee0f]/20 rounded-lg flex items-center justify-center">
              <Flame className="w-6 h-6 text-[#fbee0f]" />
            </div>
            <Trophy className="w-5 h-5 text-[#fbb80f]" />
          </div>
          <p className="text-sm text-[#7c898b] mb-1">Sequência Atual</p>
          <p className="text-3xl font-bold text-[#253439]">7 dias</p>
          <p className="text-sm text-[#7c898b] mt-2">Recorde: 21 dias</p>
        </div>

        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#b29e84]/20 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-[#b29e84]" />
            </div>
            <TrendingUp className="w-5 h-5 text-[#fbb80f]" />
          </div>
          <p className="text-sm text-[#7c898b] mb-1">Média Geral</p>
          <p className="text-3xl font-bold text-[#253439]">8.8</p>
          <p className="text-sm text-[#fbb80f] mt-2">+0.3 este mês</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Activity */}
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <h2 className="text-xl font-semibold text-[#253439] mb-6">Atividade Semanal</h2>
          <div className="space-y-4">
            {weeklyActivity.map((day) => (
              <div key={day.day}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#253439]">{day.day}</span>
                  <span className="text-sm text-[#7c898b]">{day.minutes} min • {day.completed} lições</span>
                </div>
                <div className="w-full bg-[#b29e84]/20 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 bg-gradient-to-r from-[#fbb80f] to-[#fbee0f] rounded-full transition-all"
                    style={{ width: `${(day.minutes / maxMinutes) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <h2 className="text-xl font-semibold text-[#253439] mb-6">Tendência Mensal (Horas)</h2>
          <div className="h-64 flex items-end justify-between gap-3">
            {monthlyStats.map((stat) => (
              <div key={stat.month} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full relative" style={{ height: '200px' }}>
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-[#fbb80f] to-[#fbee0f] rounded-t-lg transition-all hover:from-[#253439] hover:to-[#7c898b] cursor-pointer"
                    style={{ height: `${(stat.hours / maxHours) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#253439] text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                      {stat.hours}h
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium text-[#253439]">{stat.month}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Progress */}
      <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6 mb-6">
        <h2 className="text-xl font-semibold text-[#253439] mb-6">Progresso por Habilidade</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-[#253439]">{skill.name}</span>
                <div className="flex items-center gap-2">
                  {skill.trend === 'up' && <TrendingUp className="w-4 h-4 text-[#fbb80f]" />}
                  <span className="text-sm font-semibold text-[#253439]">{skill.level}%</span>
                </div>
              </div>
              <div className="w-full bg-[#b29e84]/20 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all ${
                    skill.level >= 80
                      ? 'bg-gradient-to-r from-[#fbb80f] to-[#fbee0f]'
                      : skill.level >= 60
                      ? 'bg-gradient-to-r from-[#253439] to-[#7c898b]'
                      : 'bg-gradient-to-r from-[#b29e84] to-[#7c898b]'
                  }`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Progress */}
      <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
        <h2 className="text-xl font-semibold text-[#253439] mb-6">Progresso por Curso</h2>
        <div className="space-y-6">
          {courseProgress.map((course) => (
            <div key={course.course} className="border border-[#b29e84]/20 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#fbb80f] to-[#fbee0f] rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#253439] mb-1">{course.course}</h3>
                    <div className="flex items-center gap-4 text-sm text-[#7c898b]">
                      <span>{course.lessons} lições completas</span>
                      <span>•</span>
                      <span>{course.hours} horas</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-[#253439]">{course.progress}%</p>
                </div>
              </div>
              <div className="w-full bg-[#b29e84]/20 rounded-full h-4 overflow-hidden">
                <div
                  className="h-4 bg-gradient-to-r from-[#fbb80f] to-[#fbee0f] rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}