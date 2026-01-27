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

export function Dashboard() {
  const enrolledCourses = [
    {
      id: 1,
      title: 'B1 - Intermediate',
      progress: 68,
      nextLesson: 'Module 8: Past Perfect Tense',
      totalLessons: 24,
      completedLessons: 16,
      color: 'from-primary to-muted-foreground',
      level: 'B1'
    },
    {
      id: 2,
      title: 'Business English',
      progress: 45,
      nextLesson: 'Module 4: Meetings & Presentations',
      totalLessons: 20,
      completedLessons: 9,
      color: 'from-secondary to-muted-foreground',
      level: 'Business'
    },
    {
      id: 3,
      title: 'Conversation 1',
      progress: 82,
      nextLesson: 'Session 15: Daily Routines',
      totalLessons: 18,
      completedLessons: 15,
      color: 'from-accent to-accent-foreground',
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
    { label: 'Horas de Estudo', value: '42h', icon: Clock, color: 'text-primary bg-primary/10' },
    { label: 'Lições Completas', value: '40', icon: CheckCircle2, color: 'text-accent bg-accent/10' },
    { label: 'Conquistas', value: '12', icon: Trophy, color: 'text-accent-foreground bg-accent-foreground/10' },
    { label: 'Sequência', value: '7 dias', icon: TrendingUp, color: 'text-secondary bg-secondary/10' },
  ];

  return (
    <div className="dashboard-container min-h-screen bg-background p-8">
      {/* Dashboard Header */}
      <div className="dashboard-header mb-8">
        <h1 className="dashboard-header-title text-3xl font-semibold text-foreground mb-2">
          Olá, Ana Maria! 👋
        </h1>
        <p className="dashboard-header-subtitle text-muted-foreground">
          Pronto para continuar aprendendo hoje?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="dashboard-stat-card bg-card rounded-xl p-6 border border-border">
              <div className={`dashboard-stat-icon w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="dashboard-stat-value text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="dashboard-stat-label text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Enrolled Courses Section */}
      <div className="dashboard-courses mb-8">
        <div className="dashboard-courses-header flex items-center justify-between mb-4">
          <h2 className="dashboard-courses-title text-xl font-semibold text-foreground">Meus Cursos</h2>
          <button className="dashboard-courses-view-all text-accent hover:text-foreground text-sm font-medium flex items-center gap-1">
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="dashboard-courses-grid grid grid-cols-1 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="dashboard-course-card bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`dashboard-course-header h-32 bg-gradient-to-br ${course.color} p-6 flex items-center justify-center`}>
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <div className="dashboard-course-content p-6">
                <div className="dashboard-course-badge flex items-center gap-2 mb-2">
                  <span className="dashboard-course-level text-xs font-semibold text-white bg-primary px-2 py-1 rounded">
                    {course.level}
                  </span>
                </div>
                <h3 className="dashboard-course-title font-semibold text-foreground mb-2">{course.title}</h3>
                <p className="dashboard-course-progress-text text-sm text-muted-foreground mb-4">
                  {course.completedLessons} de {course.totalLessons} lições completas
                </p>
                
                <div className="dashboard-course-progress mb-4">
                  <div className="dashboard-course-progress-header flex items-center justify-between mb-2">
                    <span className="dashboard-course-progress-label text-sm text-muted-foreground">Progresso</span>
                    <span className="dashboard-course-progress-percentage text-sm font-semibold text-foreground">{course.progress}%</span>
                  </div>
                  <div className="dashboard-course-progress-bar-container w-full bg-secondary/20 rounded-full h-2">
                    <div 
                      className={`dashboard-course-progress-bar h-2 rounded-full bg-gradient-to-r ${course.color}`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="dashboard-course-next-lesson bg-background rounded-lg p-3 mb-4">
                  <p className="dashboard-course-next-lesson-label text-xs text-muted-foreground mb-1">Próxima lição:</p>
                  <p className="dashboard-course-next-lesson-title text-sm font-medium text-foreground">{course.nextLesson}</p>
                </div>

                <button className="dashboard-course-continue-button w-full bg-accent text-accent-foreground py-2.5 rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Continuar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="dashboard-content-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Lessons Section */}
        <div className="dashboard-recent-lessons bg-card rounded-xl border border-border p-6">
          <h2 className="dashboard-section-title text-xl font-semibold text-foreground mb-4">Lições Recentes</h2>
          <div className="dashboard-recent-lessons-list space-y-3">
            {recentLessons.map((lesson) => (
              <div key={lesson.id} className="dashboard-lesson-item flex items-center gap-4 p-4 bg-background rounded-lg hover:bg-secondary/10 transition-colors cursor-pointer">
                <div className={`dashboard-lesson-icon w-10 h-10 rounded-lg flex items-center justify-center ${
                  lesson.completed ? 'bg-accent/20' : 'bg-primary/10'
                }`}>
                  {lesson.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  ) : (
                    <PlayCircle className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div className="dashboard-lesson-info flex-1">
                  <p className="dashboard-lesson-title font-medium text-foreground">{lesson.title}</p>
                  <p className="dashboard-lesson-meta text-sm text-muted-foreground">{lesson.course} • {lesson.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Classes Section */}
        <div className="dashboard-upcoming-classes bg-card rounded-xl border border-border p-6">
          <h2 className="dashboard-section-title text-xl font-semibold text-foreground mb-4">Próximas Aulas</h2>
          <div className="dashboard-upcoming-classes-list space-y-3">
            {upcomingClasses.map((cls) => (
              <div key={cls.id} className="dashboard-class-item flex items-start gap-4 p-4 bg-background rounded-lg hover:bg-secondary/10 transition-colors cursor-pointer">
                <div className="dashboard-class-icon w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div className="dashboard-class-info flex-1">
                  <p className="dashboard-class-title font-medium text-foreground">{cls.title}</p>
                  <p className="dashboard-class-teacher text-sm text-muted-foreground">{cls.teacher}</p>
                  <p className="dashboard-class-date text-sm text-muted-foreground mt-1">
                    {new Date(cls.date).toLocaleDateString('pt-BR')} às {cls.time}
                  </p>
                </div>
                <button className="dashboard-class-join-button text-accent hover:text-foreground text-sm font-medium">
                  Entrar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teacher Section */}
      <div className="dashboard-teacher-section mt-6 bg-gradient-to-br from-primary to-muted-foreground rounded-xl p-8 text-white">
        <div className="dashboard-teacher-content flex items-start gap-6">
          <div className="dashboard-teacher-avatar w-20 h-20 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="dashboard-teacher-info flex-1">
            <h3 className="dashboard-teacher-section-title text-2xl font-semibold mb-2">Sua Professora</h3>
            <h4 className="dashboard-teacher-name text-xl font-bold text-accent mb-3">Jamile Oliveira</h4>
            <p className="dashboard-teacher-description text-white/90 mb-4 leading-relaxed">
              Professora de inglês há 15 anos, especializada em desenvolvimento de fluência. 
              Formada em Comunicação Social e Letras – Inglês, com 4 anos de experiência vivendo na Flórida.
            </p>
            <div className="dashboard-teacher-credentials flex gap-6 text-sm">
              <div className="dashboard-teacher-credential flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" />
                <span>15 anos de experiência</span>
              </div>
              <div className="dashboard-teacher-credential flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                <span>4 anos na Flórida</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
