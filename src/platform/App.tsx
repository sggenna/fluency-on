import { useState, useEffect } from 'react';
import { GraduationCap, User } from 'lucide-react';
import StudentApp from './student/App';
import TeacherApp from './professor/App';
import { LoginForm } from './LoginForm';
import { login as apiLogin, logout as apiLogout, type AuthUser } from '../api/auth';
import {
  type ClassSchedule,
  type StudentCalendarEvent,
  DEFAULT_SCHEDULES,
  loadSchedulesFromStorage,
  saveSchedulesToStorage,
} from './types/schedule';

/** Convert teacher schedules to student calendar events (non-cancelled only). */
function schedulesToStudentEvents(schedules: ClassSchedule[]): StudentCalendarEvent[] {
  const teacherName = 'Prof. Jamile Oliveira';
  return schedules
    .filter((s) => s.status !== 'cancelled')
    .map((s) => ({
      id: s.id,
      title: s.title,
      date: s.date,
      time: s.time,
      duration: `${s.duration} min`,
      teacher: teacherName,
      type: 'live' as const,
      meetLink: s.meetLink,
    }));
}

export default function App() {
  const [platform, setPlatform] = useState<'student' | 'teacher' | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [pendingPlatform, setPendingPlatform] = useState<'student' | 'teacher' | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [schedules, setSchedules] = useState<ClassSchedule[]>(() => {
    const stored = loadSchedulesFromStorage();
    return stored ?? DEFAULT_SCHEDULES;
  });

  useEffect(() => {
    saveSchedulesToStorage(schedules);
  }, [schedules]);

  const handleLogout = () => {
    apiLogout();
    setPlatform(null);
    setUser(null);
    setPendingPlatform(null);
    setAuthError(null);
  };

  const handleLoginSuccess = (loggedInUser: AuthUser) => {
    const expectedRole = pendingPlatform === 'student' ? 'STUDENT' : 'TEACHER';
    if (loggedInUser.role !== expectedRole) {
      apiLogout();
      setAuthError(
        pendingPlatform === 'student'
          ? 'Use uma conta de aluno para acessar o Portal do Aluno.'
          : 'Use uma conta de professor para acessar o Portal do Professor.'
      );
      return;
    }
    setAuthError(null);
    setUser(loggedInUser);
    setPlatform(pendingPlatform);
    setPendingPlatform(null);
  };

  const handleSelectPortal = (selected: 'student' | 'teacher') => {
    setAuthError(null);
    setPendingPlatform(selected);
  };

  const studentEvents = schedulesToStudentEvents(schedules);

  // Show login form when user chose a portal but hasn't logged in yet
  if (pendingPlatform) {
    return (
      <LoginForm
        platformLabel={pendingPlatform === 'student' ? 'Portal do Aluno' : 'Portal do Professor'}
        onBack={() => { setPendingPlatform(null); setAuthError(null); }}
        onSuccess={handleLoginSuccess}
        error={authError}
      />
    );
  }

  if (platform === 'student' && user) {
    return (
      <StudentApp
        onLogout={handleLogout}
        user={user}
        onUserUpdate={setUser}
        events={studentEvents}
      />
    );
  }

  if (platform === 'teacher' && user) {
    return (
      <TeacherApp
        onLogout={handleLogout}
        user={user}
        schedules={schedules}
        setSchedules={setSchedules}
      />
    );
  }

  return (
    <div className="sel platform-portal-enter min-h-screen bg-gradient-to-br from-[#f6f4f1] via-[#f6f4f1] to-[#b29e84]/20 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="wrap max-w-4xl w-full">
        {/* Header */}
        <div className="head text-center mb-8 sm:mb-12">
          <div className="logo w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#253439] to-[#7c898b] rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="title text-3xl sm:text-4xl font-bold text-[#253439] mb-2 sm:mb-3">FluencyOn</h1>
          <p className="sub text-lg sm:text-xl text-[#7c898b]">Plataforma Educacional</p>
        </div>

        {/* Platform Selection */}
        <div className="cards grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Student Portal */}
          <div className="sel-card sel-card-student group bg-white rounded-2xl p-5 sm:p-6 lg:p-8 border-2 border-[#b29e84]/20 hover:border-[#fbb80f] transition-all shadow-lg text-left flex flex-col">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#fbb80f] to-[#fbee0f] rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <User className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#253439] mb-2 sm:mb-3">Portal do Aluno</h2>
            <p className="text-sm sm:text-base text-[#7c898b] mb-4 sm:mb-6">
              Acesse suas aulas, materiais, tarefas e acompanhe seu progresso de aprendizado
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#7c898b]">
                <div className="w-1.5 h-1.5 bg-[#fbb80f] rounded-full"></div>
                <span>Dashboard personalizado</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#7c898b]">
                <div className="w-1.5 h-1.5 bg-[#fbb80f] rounded-full"></div>
                <span>Biblioteca de lições</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#7c898b]">
                <div className="w-1.5 h-1.5 bg-[#fbb80f] rounded-full"></div>
                <span>Tarefas e materiais</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#7c898b]">
                <div className="w-1.5 h-1.5 bg-[#fbb80f] rounded-full"></div>
                <span>Acompanhamento de progresso</span>
              </div>
            </div>
            <div className="mt-auto pt-4 sm:pt-6">
              <button
                type="button"
                onClick={() => handleSelectPortal('student')}
                className="w-full py-3 px-4 rounded-xl bg-[#fbb80f] text-white font-semibold hover:bg-[#253439] transition-colors touch-manipulation min-h-[44px]"
              >
                Entrar
              </button>
            </div>
          </div>

          {/* Teacher Portal */}
          <div className="card card-teacher group bg-white rounded-2xl p-5 sm:p-6 lg:p-8 border-2 border-[#b29e84]/20 hover:border-[#253439] transition-all shadow-lg text-left flex flex-col">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#253439] to-[#7c898b] rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#253439] mb-2 sm:mb-3">Portal do Professor</h2>
            <p className="text-sm sm:text-base text-[#7c898b] mb-4 sm:mb-6">
              Gerencie alunos, cursos, lições, materiais e acompanhe o desempenho da turma
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#7c898b]">
                <div className="w-1.5 h-1.5 bg-[#253439] rounded-full"></div>
                <span>Gestão de alunos e cursos</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#7c898b]">
                <div className="w-1.5 h-1.5 bg-[#253439] rounded-full"></div>
                <span>Upload de lições e materiais</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#7c898b]">
                <div className="w-1.5 h-1.5 bg-[#253439] rounded-full"></div>
                <span>Correção de tarefas</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#7c898b]">
                <div className="w-1.5 h-1.5 bg-[#253439] rounded-full"></div>
                <span>Analytics e relatórios</span>
              </div>
            </div>
            <div className="mt-auto pt-4 sm:pt-6">
              <button
                type="button"
                onClick={() => handleSelectPortal('teacher')}
                className="w-full py-3 px-4 rounded-xl bg-[#253439] text-white font-semibold hover:bg-[#7c898b] transition-colors touch-manipulation min-h-[44px]"
              >
                Entrar
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="sel-foot mt-8 sm:mt-12 text-center">
          <div className="info bg-white/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-[#b29e84]/20">
            <p className="text-sm text-[#7c898b]">
              <strong className="text-[#253439]">FluencyOn</strong> - Transforme Seu Inglês em Confiança Real
            </p>
            <p className="text-xs text-[#7c898b] mt-2">
              Prof. Jamile Oliveira • 15 anos de experiência • 4 anos na Flórida
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
