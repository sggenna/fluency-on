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

  return (
    <div className="dashboard-container p-8 lg:p-12">
      {/* Dashboard Header */}
      <div className="dashboard-header mb-10">
        <h1 className="dashboard-header-title text-3xl font-semibold text-[#253439] mb-2">
          Olá, {studentName}! 👋
        </h1>
        <p className="dashboard-header-subtitle text-[#7c898b]">
          Pronto para continuar aprendendo hoje?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="dashboard-stat-card bg-white rounded-xl p-8 border border-[#b29e84]/20 shadow-sm hover:shadow-md transition-shadow">
              <div className={`dashboard-stat-icon w-14 h-14 rounded-lg ${stat.color} flex items-center justify-center mb-5`}>
                <Icon className="w-7 h-7" />
              </div>
              <p className="dashboard-stat-value text-3xl font-bold text-[#253439] mb-2">{stat.value}</p>
              <p className="dashboard-stat-label text-sm text-[#7c898b]">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Enrolled Courses Section */}
      <div className="dashboard-courses mb-10">
        <div className="dashboard-courses-header flex items-center justify-between mb-6">
          <h2 className="dashboard-courses-title text-2xl font-semibold text-[#253439]">Meus Cursos</h2>
          <button className="dashboard-courses-view-all text-[#fbb80f] hover:text-[#253439] text-sm font-medium flex items-center gap-1 transition-colors">
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="dashboard-courses-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="dashboard-course-card bg-white rounded-xl border border-[#b29e84]/20 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className={`dashboard-course-header h-40 bg-gradient-to-br ${course.color} p-8 flex items-center justify-center`}>
                <BookOpen className="w-14 h-14 text-white" />
              </div>
              <div className="dashboard-course-content p-8">
                <div className="dashboard-course-badge flex items-center gap-2 mb-3">
                  <span className="dashboard-course-level text-xs font-semibold text-white bg-[#253439] px-3 py-1.5 rounded">
                    {course.level}
                  </span>
                </div>
                <h3 className="dashboard-course-title text-lg font-semibold text-[#253439] mb-3">{course.title}</h3>
                <p className="dashboard-course-progress-text text-sm text-[#7c898b] mb-6">
                  {course.completedLessons} de {course.totalLessons} lições completas
                </p>
                
                <div className="dashboard-course-progress mb-6">
                  <div className="dashboard-course-progress-header flex items-center justify-between mb-3">
                    <span className="dashboard-course-progress-label text-sm text-[#7c898b]">Progresso</span>
                    <span className="dashboard-course-progress-percentage text-sm font-semibold text-[#253439]">{course.progress}%</span>
                  </div>
                  <div className="dashboard-course-progress-bar-container w-full bg-[#b29e84]/20 rounded-full h-2.5">
                    <div 
                      className={`dashboard-course-progress-bar h-2.5 rounded-full bg-gradient-to-r ${course.color}`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="dashboard-course-next-lesson bg-[#f6f4f1] rounded-lg p-4 mb-6">
                  <p className="dashboard-course-next-lesson-label text-xs text-[#7c898b] mb-1.5">Próxima lição:</p>
                  <p className="dashboard-course-next-lesson-title text-sm font-medium text-[#253439]">{course.nextLesson}</p>
                </div>

                <button className="dashboard-course-continue-button w-full bg-[#fbb80f] text-white py-3 rounded-lg hover:bg-[#253439] transition-colors flex items-center justify-center gap-2 font-medium">
                  <PlayCircle className="w-5 h-5" />
                  Continuar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="dashboard-content-grid grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Recent Lessons Section */}
        <div className="dashboard-recent-lessons bg-white rounded-xl border border-[#b29e84]/20 p-8 shadow-sm">
          <h2 className="dashboard-section-title text-xl font-semibold text-[#253439] mb-6">Lições Recentes</h2>
          <div className="dashboard-recent-lessons-list space-y-4">
            {recentLessons.map((lesson) => (
              <div key={lesson.id} className="dashboard-lesson-item flex items-center gap-4 p-5 bg-[#f6f4f1] rounded-lg hover:bg-[#b29e84]/10 transition-colors cursor-pointer">
                <div className={`dashboard-lesson-icon w-12 h-12 rounded-lg flex items-center justify-center ${
                  lesson.completed ? 'bg-[#fbb80f]/20' : 'bg-[#253439]/10'
                }`}>
                  {lesson.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-[#fbb80f]" />
                  ) : (
                    <PlayCircle className="w-6 h-6 text-[#253439]" />
                  )}
                </div>
                <div className="dashboard-lesson-info flex-1">
                  <p className="dashboard-lesson-title font-medium text-[#253439] mb-1">{lesson.title}</p>
                  <p className="dashboard-lesson-meta text-sm text-[#7c898b]">{lesson.course} • {lesson.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Classes Section */}
        <div className="dashboard-upcoming-classes bg-white rounded-xl border border-[#b29e84]/20 p-8 shadow-sm">
          <h2 className="dashboard-section-title text-xl font-semibold text-[#253439] mb-6">Próximas Aulas</h2>
          <div className="dashboard-upcoming-classes-list space-y-4">
            {upcomingClasses.map((cls) => (
              <div key={cls.id} className="dashboard-class-item flex items-start gap-4 p-5 bg-[#f6f4f1] rounded-lg hover:bg-[#b29e84]/10 transition-colors cursor-pointer">
                <div className="dashboard-class-icon w-12 h-12 bg-[#fbb80f]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-[#fbb80f]" />
                </div>
                <div className="dashboard-class-info flex-1">
                  <p className="dashboard-class-title font-medium text-[#253439] mb-1">{cls.title}</p>
                  <p className="dashboard-class-teacher text-sm text-[#7c898b] mb-1">{cls.teacher}</p>
                  <p className="dashboard-class-date text-sm text-[#7c898b]">
                    {new Date(cls.date).toLocaleDateString('pt-BR')} às {cls.time}
                  </p>
                </div>
                <button className="dashboard-class-join-button text-[#fbb80f] hover:text-[#253439] text-sm font-medium transition-colors flex-shrink-0">
                  Entrar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teacher Section */}
      <div className="dashboard-teacher-section bg-gradient-to-br from-[#253439] to-[#7c898b] rounded-xl p-10 text-white shadow-lg">
        <div className="dashboard-teacher-content flex items-start gap-6">
          <div className="dashboard-teacher-avatar w-20 h-20 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="dashboard-teacher-info flex-1">
            <h3 className="dashboard-teacher-section-title text-2xl font-semibold mb-2">Sua Professora</h3>
            <h4 className="dashboard-teacher-name text-xl font-bold text-[#fbb80f] mb-3">Jamile Oliveira</h4>
            <p className="dashboard-teacher-description text-white/90 mb-4 leading-relaxed">
              Professora de inglês há 15 anos, especializada em desenvolvimento de fluência. 
              Formada em Comunicação Social e Letras – Inglês, com 4 anos de experiência vivendo na Flórida.
            </p>
            <div className="dashboard-teacher-credentials flex gap-6 text-sm">
              <div className="dashboard-teacher-credential flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#fbb80f]" />
                <span>15 anos de experiência</span>
              </div>
              <div className="dashboard-teacher-credential flex items-center gap-2">
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
