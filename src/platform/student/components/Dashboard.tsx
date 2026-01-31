import { useEffect, useState } from 'react';
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
import { useAuth } from '../../../auth/AuthContext';
import { enrollmentsApi, type Enrollment } from '../../../api/enrollments';
import { progressApi, type Progress } from '../../../api/progress';
import { lessonsApi, type Lesson } from '../../../api/lessons';
import { schedulesApi, type ClassSchedule } from '../../../api/schedules';

const COURSE_COLORS: Record<string, string> = {
  A1: 'from-[#253439] to-[#7c898b]',
  A2: 'from-[#b29e84] to-[#7c898b]',
  B1: 'from-[#253439] to-[#7c898b]',
  'B2-C1': 'from-[#b29e84] to-[#7c898b]',
  'Conversation 1': 'from-[#fbb80f] to-[#fbee0f]',
  'Conversation 2': 'from-[#fbb80f] to-[#fbee0f]',
  'Business English': 'from-[#b29e84] to-[#7c898b]',
  'Travel English': 'from-[#253439] to-[#7c898b]',
};

function getCourseColor(level: string): string {
  return COURSE_COLORS[level] || 'from-[#253439] to-[#7c898b]';
}

export function Dashboard() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [lessonsByCourse, setLessonsByCourse] = useState<Record<string, Lesson[]>>({});
  const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [enr, prog, sched] = await Promise.all([
          enrollmentsApi.list(),
          progressApi.list(),
          schedulesApi.list(),
        ]);
        if (cancelled) return;
        setEnrollments(enr);
        setProgress(prog);
        setSchedules(sched);
        const courseIds = [...new Set(enr.map((e) => e.course?.id).filter(Boolean))] as string[];
        const lessonsMap: Record<string, Lesson[]> = {};
        await Promise.all(
          courseIds.map(async (cid) => {
            const list = await lessonsApi.listByCourse(cid);
            if (!cancelled) lessonsMap[cid] = list;
          })
        );
        if (!cancelled) setLessonsByCourse(lessonsMap);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Erro ao carregar');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const completedByLesson = new Set(progress.filter((p) => p.completed).map((p) => p.lessonId));
  const totalCompleted = progress.filter((p) => p.completed).length;
  const totalWatchSeconds = progress.reduce((s, p) => s + (p.watchTime || 0), 0);
  const hoursStudied = Math.floor(totalWatchSeconds / 3600);

  const enrolledCourses = enrollments
    .filter((e) => e.course)
    .map((e) => {
      const course = e.course!;
      const lessons = lessonsByCourse[course.id] || [];
      const totalLessons = (course as { _count?: { lessons: number } })._count?.lessons ?? lessons.length;
      const completedLessons = lessons.filter((l) => completedByLesson.has(l.id)).length;
      const progressPct = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;
      const nextLesson = lessons.find((l) => !completedByLesson.has(l.id));
      return {
        id: course.id,
        title: course.title,
        progress: progressPct,
        nextLesson: nextLesson?.title ?? '—',
        totalLessons,
        completedLessons,
        color: getCourseColor(course.level),
        level: course.level,
      };
    });

  const recentLessons: { id: string; title: string; course: string; duration: string; completed: boolean }[] = [];
  enrollments.forEach((e) => {
    const course = e.course;
    if (!course) return;
    const lessons = lessonsByCourse[course.id] || [];
    lessons.slice(0, 2).forEach((l) => {
      recentLessons.push({
        id: l.id,
        title: l.title,
        course: course.title,
        duration: l.duration ? `${l.duration} min` : '—',
        completed: completedByLesson.has(l.id),
      });
    });
  });
  recentLessons.splice(3);

  const upcomingClasses = schedules.slice(0, 3).map((s, i) => ({
    id: String(s.id),
    title: `Aula ao Vivo: ${s.level}`,
    date: new Date().toISOString().slice(0, 10),
    time: s.time,
    teacher: 'Prof. Jamile Oliveira',
  }));

  const stats = [
    { label: 'Horas de Estudo', value: `${hoursStudied}h`, icon: Clock, color: 'text-[#253439] bg-[#253439]/10' },
    { label: 'Lições Completas', value: String(totalCompleted), icon: CheckCircle2, color: 'text-[#fbb80f] bg-[#fbb80f]/10' },
    { label: 'Conquistas', value: '—', icon: Trophy, color: 'text-[#fbee0f] bg-[#fbee0f]/10' },
    { label: 'Sequência', value: '—', icon: TrendingUp, color: 'text-[#b29e84] bg-[#b29e84]/10' },
  ];

  const firstName = user?.firstName ?? '';
  const greeting = firstName ? `Olá, ${firstName}! 👋` : 'Olá! 👋';

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-[#7c898b]">Carregando...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#253439] mb-2">{greeting}</h1>
        <p className="text-[#7c898b]">Pronto para continuar aprendendo hoje?</p>
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
          <button className="text-[#fbb80f] hover:text-[#253439] text-sm font-medium flex items-center gap-1">
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

                <button className="w-full bg-[#fbb80f] text-white py-2.5 rounded-lg hover:bg-[#253439] transition-colors flex items-center justify-center gap-2">
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
