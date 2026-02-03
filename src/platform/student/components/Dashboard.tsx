import { 
  BookOpen, 
  Clock, 
  Trophy, 
  TrendingUp,
  PlayCircle,
  CheckCircle2,
  Calendar,
  ArrowRight,
  User
} from 'lucide-react';

interface DashboardProps {
  onNavigateToLessons?: (courseId?: string) => void;
}

export function Dashboard({ onNavigateToLessons }: DashboardProps) {
  const enrolledCourses = [
    {
      id: 1,
      courseId: 'b1',
      title: 'B1 - Intermediate',
      progress: 68,
      nextLesson: 'Module 8: Past Perfect Tense',
      totalLessons: 24,
      completedLessons: 16,
      color: 'from-[#253439] to-[#7c898b]',
      level: 'B1'
    },
    {
      id: 2,
      courseId: 'business',
      title: 'Business English',
      progress: 45,
      nextLesson: 'Module 4: Meetings & Presentations',
      totalLessons: 20,
      completedLessons: 9,
      color: 'from-[#b29e84] to-[#7c898b]',
      level: 'Business'
    },
    {
      id: 3,
      courseId: 'conv1',
      title: 'Conversation 1',
      progress: 82,
      nextLesson: 'Session 15: Daily Routines',
      totalLessons: 18,
      completedLessons: 15,
      color: 'from-[#fbb80f] to-[#fbee0f]',
      level: 'Conv. 1'
    }
  ];

  const recentLessons = [
    { id: 1, title: 'Present Perfect vs Past Simple', course: 'B1 - Intermediate', duration: '24 min', completed: true },
    { id: 2, title: 'Vocabulary: Travel & Tourism', course: 'B1 - Intermediate', duration: '18 min', completed: true },
    { id: 3, title: 'Email Writing Basics', course: 'Business English', duration: '32 min', completed: false },
  ];

  const upcomingClasses = [
    { id: 1, title: 'Aula ao Vivo: Grammar Review', date: '2026-01-10', time: '19:00', teacher: 'Prof. Jamile Oliveira' },
    { id: 2, title: 'Conversation Practice', date: '2026-01-12', time: '19:00', teacher: 'Prof. Jamile Oliveira' },
    { id: 3, title: 'Business English Workshop', date: '2026-01-15', time: '19:00', teacher: 'Prof. Jamile Oliveira' },
  ];

  const stats = [
    { label: 'Horas de Estudo', value: '42h', icon: Clock, color: 'text-[#253439] bg-[#253439]/10' },
    { label: 'Lições Completas', value: '40', icon: CheckCircle2, color: 'text-[#fbb80f] bg-[#fbb80f]/10' },
    { label: 'Conquistas', value: '12', icon: Trophy, color: 'text-[#fbee0f] bg-[#fbee0f]/10' },
    { label: 'Sequência', value: '7 dias', icon: TrendingUp, color: 'text-[#b29e84] bg-[#b29e84]/10' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#253439] mb-2">Olá, Ana Maria! 👋</h1>
        <p className="text-sm sm:text-base text-[#7c898b]">Pronto para continuar aprendendo hoje?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-[#b29e84]/20">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-2xl font-bold text-[#253439] mb-1">{stat.value}</p>
              <p className="text-sm text-[#7c898b]">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Enrolled Courses */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#253439]">Meus Cursos</h2>
          <button
            onClick={() => onNavigateToLessons?.()}
            className="text-[#fbb80f] hover:text-[#253439] text-sm font-medium flex items-center gap-1"
          >
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl border border-[#b29e84]/20 overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`h-32 bg-gradient-to-br ${course.color} p-6 flex items-center justify-center`}>
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-white bg-[#253439] px-2 py-1 rounded">
                    {course.level}
                  </span>
                </div>
                <h3 className="font-semibold text-[#253439] mb-2">{course.title}</h3>
                <p className="text-sm text-[#7c898b] mb-4">{course.completedLessons} de {course.totalLessons} lições completas</p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#7c898b]">Progresso</span>
                    <span className="text-sm font-semibold text-[#253439]">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-[#b29e84]/20 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${course.color}`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="bg-[#f6f4f1] rounded-lg p-3 mb-4">
                  <p className="text-xs text-[#7c898b] mb-1">Próxima lição:</p>
                  <p className="text-sm font-medium text-[#253439]">{course.nextLesson}</p>
                </div>

                <button
                  onClick={() => onNavigateToLessons?.(course.courseId)}
                  className="w-full bg-[#fbb80f] text-white py-2.5 rounded-lg hover:bg-[#253439] transition-colors flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-5 h-5" />
                  Continuar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Lessons */}
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <h2 className="text-xl font-semibold text-[#253439] mb-4">Lições Recentes</h2>
          <div className="space-y-3">
            {recentLessons.map((lesson) => (
              <div key={lesson.id} className="flex items-center gap-4 p-4 bg-[#f6f4f1] rounded-lg hover:bg-[#b29e84]/10 transition-colors cursor-pointer">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  lesson.completed ? 'bg-[#fbb80f]/20' : 'bg-[#253439]/10'
                }`}>
                  {lesson.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#fbb80f]" />
                  ) : (
                    <PlayCircle className="w-5 h-5 text-[#253439]" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#253439]">{lesson.title}</p>
                  <p className="text-sm text-[#7c898b]">{lesson.course} • {lesson.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <h2 className="text-xl font-semibold text-[#253439] mb-4">Próximas Aulas</h2>
          <div className="space-y-3">
            {upcomingClasses.map((cls) => (
              <div key={cls.id} className="flex items-start gap-4 p-4 bg-[#f6f4f1] rounded-lg hover:bg-[#b29e84]/10 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-[#fbb80f]/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#fbb80f]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#253439]">{cls.title}</p>
                  <p className="text-sm text-[#7c898b]">{cls.teacher}</p>
                  <p className="text-sm text-[#7c898b] mt-1">
                    {new Date(cls.date).toLocaleDateString('pt-BR')} às {cls.time}
                  </p>
                </div>
                <button className="text-[#fbb80f] hover:text-[#253439] text-sm font-medium">
                  Entrar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teacher Section */}
      <div className="mt-6 bg-gradient-to-br from-[#253439] to-[#7c898b] rounded-xl p-8 text-white">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-2">Sua Professora</h3>
            <h4 className="text-xl font-bold text-[#fbb80f] mb-3">Jamile Oliveira</h4>
            <p className="text-white/90 mb-4 leading-relaxed">
              Professora de inglês há 15 anos, especializada em desenvolvimento de fluência. 
              Formada em Comunicação Social e Letras – Inglês, com 4 anos de experiência vivendo na Flórida.
            </p>
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#fbb80f]" />
                <span>15 anos de experiência</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#fbb80f]" />
                <span>4 anos na Flórida</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
