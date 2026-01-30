import { 
  BookOpen, 
  PlayCircle,
  CheckCircle2,
  Calendar,
  ArrowRight,
  User,
  Trophy
} from 'lucide-react';
import { 
  getDashboardStats, 
  getEnrolledCourses, 
  getRecentLessons, 
  getUpcomingClasses,
  getStudentName,
  getStudentLevel
} from '../data/dashboardData';

export function Dashboard() {
  // Data from centralized data file - easy to replace with API calls
  const enrolledCourses = getEnrolledCourses();
  const recentLessons = getRecentLessons();
  const upcomingClasses = getUpcomingClasses();
  const stats = getDashboardStats();
  const studentName = getStudentName();
  const studentLevel = getStudentLevel();

  const accentYellow = '#FDB022';

  return (
    <div className="dashboard-container">
      {/* Dashboard Header - spacious */}
      <div className="dashboard-header mb-10">
        <h1 className="dashboard-header-title text-2xl font-semibold text-[#253439] mb-2">
          Olá, {studentName}! 👋
        </h1>
        <p className="dashboard-header-subtitle text-base text-[#6b7280]">
          Pronto para continuar aprendendo hoje?
        </p>
      </div>

      {/* Stats Cards - 4-col, gap 24px, inside cards 24-28px */}
      <div className="dashboard-stats grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="dashboard-stat-card bg-white rounded-xl shadow-md border border-gray-100/80 p-8"
            >
              <div className={`dashboard-stat-icon w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-5`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="dashboard-stat-value text-2xl font-bold text-[#253439] mb-2">{stat.value}</p>
              <p className="dashboard-stat-label text-sm text-[#6b7280]">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Meus Cursos - 48px below stats, 24px below header, cards gap 24-32px */}
      <div className="dashboard-courses mb-14">
        <div className="dashboard-courses-header flex items-center justify-between mb-6">
          <h2 className="dashboard-courses-title text-xl font-semibold text-[#253439]">Meus Cursos</h2>
          <button
            className="dashboard-courses-view-all text-sm font-medium flex items-center gap-1 transition-colors"
            style={{ color: accentYellow }}
          >
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="dashboard-courses-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrolledCourses.map((course) => (
            <div
              key={course.id}
              className="dashboard-course-card bg-white rounded-[12px] overflow-hidden shadow-md border border-gray-100/80 flex flex-col min-h-[520px]"
            >
              {/* Header/banner: ~40% of card, ~200px, solid color, white book icon, badge on top */}
              <div
                className="dashboard-course-banner relative h-[200px] flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: course.bannerBackground }}
              >
                <BookOpen className="w-14 h-14 text-white" aria-hidden />
                <span className="dashboard-course-badge absolute top-4 left-4 text-xs font-semibold text-white bg-[#253439] px-3 py-1.5 rounded">
                  {course.level}
                </span>
              </div>
              {/* Card body: more padding and spacing between elements */}
              <div className="dashboard-course-content flex flex-col flex-1 pt-8 px-8 pb-8">
                <h3 className="dashboard-course-title text-lg font-semibold text-[#253439] mb-5">{course.title}</h3>
                <div className="dashboard-course-progress-row flex items-center justify-between text-sm mb-5">
                  <span className="text-[#6b7280]">
                    {course.completedLessons} de {course.totalLessons} lições completas
                  </span>
                  <span className="font-semibold text-[#253439]">{course.progress}%</span>
                </div>
                {/* Visual progress bar - visible horizontal bar */}
                <div className="dashboard-course-progress-bar-container w-full rounded-full mb-6 overflow-hidden" style={{ height: '10px', backgroundColor: '#E5E7EB' }}>
                  <div
                    className="dashboard-course-progress-bar rounded-full h-full transition-[width]"
                    style={{ width: `${course.progress}%`, backgroundColor: accentYellow }}
                  />
                </div>
                <div className="dashboard-course-next-lesson bg-[#F3F4F6] rounded-lg p-5 mb-6">
                  <p className="dashboard-course-next-lesson-label text-xs text-[#6b7280] mb-1.5">Próxima lição:</p>
                  <p className="dashboard-course-next-lesson-title text-sm font-medium text-[#253439]">{course.nextLesson}</p>
                </div>
                <button
                  className="dashboard-course-continue-button w-full py-3.5 rounded-lg font-medium flex items-center justify-center gap-2 text-white transition-opacity hover:opacity-90 mt-auto"
                  style={{ backgroundColor: accentYellow }}
                >
                  <PlayCircle className="w-5 h-5" />
                  Continuar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lições Recentes & Próximas Aulas - 48px from courses, generous padding inside */}
      <div className="dashboard-content-grid grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
        <div className="dashboard-recent-lessons bg-white rounded-xl shadow-md border border-gray-100/80 p-8">
          <h2 className="dashboard-section-title text-lg font-semibold text-[#253439] mb-7">Lições Recentes</h2>
          <div className="dashboard-recent-lessons-list space-y-5">
            {recentLessons.map((lesson) => (
              <div key={lesson.id} className="dashboard-lesson-item flex items-center gap-4 p-5 bg-[#F9FAFB] rounded-lg hover:bg-[#F3F4F6] transition-colors cursor-pointer">
                <div className={`dashboard-lesson-icon w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  lesson.completed ? 'bg-[#FDB022]/20' : 'bg-[#253439]/10'
                }`}>
                  {lesson.completed ? (
                    <CheckCircle2 className="w-5 h-5" style={{ color: accentYellow }} />
                  ) : (
                    <PlayCircle className="w-5 h-5 text-[#253439]" />
                  )}
                </div>
                <div className="dashboard-lesson-info flex-1 min-w-0">
                  <p className="dashboard-lesson-title font-medium text-[#253439] text-sm mb-1">{lesson.title}</p>
                  <p className="dashboard-lesson-meta text-xs text-[#6b7280]">{lesson.course} • {lesson.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="dashboard-upcoming-classes bg-white rounded-xl shadow-md border border-gray-100/80 p-8">
          <h2 className="dashboard-section-title text-lg font-semibold text-[#253439] mb-7">Próximas Aulas</h2>
          <div className="dashboard-upcoming-classes-list space-y-5">
            {upcomingClasses.map((cls) => (
              <div key={cls.id} className="dashboard-class-item flex items-start gap-4 p-5 bg-[#F9FAFB] rounded-lg hover:bg-[#F3F4F6] transition-colors cursor-pointer">
                <div className="dashboard-class-icon w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#FDB022]/20">
                  <Calendar className="w-5 h-5" style={{ color: accentYellow }} />
                </div>
                <div className="dashboard-class-info flex-1 min-w-0">
                  <p className="dashboard-class-title font-medium text-[#253439] text-sm mb-1">{cls.title}</p>
                  <p className="dashboard-class-teacher text-xs text-[#6b7280] mb-1">{cls.teacher}</p>
                  <p className="dashboard-class-date text-xs text-[#6b7280]">
                    {new Date(cls.date).toLocaleDateString('pt-BR')} às {cls.time}
                  </p>
                </div>
                <button className="dashboard-class-join-button text-sm font-medium flex-shrink-0" style={{ color: accentYellow }}>
                  Entrar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sua Professora - full width, dark gray, white legible text, roomy inside */}
      <div
        className="dashboard-teacher-section rounded-xl shadow-md flex items-start gap-8 p-12"
        style={{ backgroundColor: '#374151' }}
      >
        <div className="dashboard-teacher-avatar w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 bg-white/10">
          <User className="w-10 h-10 text-white" />
        </div>
        <div className="dashboard-teacher-info flex-1 min-w-0">
          <h3 className="dashboard-teacher-section-title text-lg font-semibold text-white mb-2">Sua Professora</h3>
          <h4 className="dashboard-teacher-name text-xl font-bold mb-4" style={{ color: accentYellow }}>Jamile Oliveira</h4>
          <p className="dashboard-teacher-description text-sm leading-relaxed mb-5" style={{ color: '#FFFFFF' }}>
            Professora de inglês há 15 anos, especializada em desenvolvimento de fluência. Formada em Comunicação Social e Letras – Inglês, com 4 anos de experiência vivendo na Flórida.
          </p>
          <div className="dashboard-teacher-credentials flex flex-wrap gap-6 text-sm" style={{ color: '#FFFFFF' }}>
            <div className="dashboard-teacher-credential flex items-center gap-2">
              <Trophy className="w-5 h-5 flex-shrink-0" style={{ color: accentYellow }} />
              <span>15 anos de experiência</span>
            </div>
            <div className="dashboard-teacher-credential flex items-center gap-2">
              <BookOpen className="w-5 h-5 flex-shrink-0" style={{ color: accentYellow }} />
              <span>4 anos na Flórida</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
