import { useState } from 'react';
import { GraduationCap, User } from 'lucide-react';
import StudentApp from './student/App';
import TeacherApp from './professor/App';

export default function App() {
  const [platform, setPlatform] = useState<'student' | 'teacher' | null>(null);

  const handleLogout = () => setPlatform(null);

  if (platform === 'student') {
    return <StudentApp onLogout={handleLogout} />;
  }

  if (platform === 'teacher') {
    return <TeacherApp onLogout={handleLogout} />;
  }

  return (
    <div className="sel min-h-screen bg-gradient-to-br from-[#f6f4f1] via-[#f6f4f1] to-[#b29e84]/20 flex items-center justify-center p-8">
      <div className="wrap max-w-4xl w-full">
        {/* Header */}
        <div className="head text-center mb-12">
          <div className="logo w-20 h-20 bg-gradient-to-br from-[#253439] to-[#7c898b] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="title text-4xl font-bold text-[#253439] mb-3">FluencyOn</h1>
          <p className="sub text-xl text-[#7c898b]">Plataforma Educacional</p>
        </div>

        {/* Platform Selection */}
        <div className="cards grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Portal */}
          <button
            onClick={() => setPlatform('student')}
            className="sel-card sel-card-student group bg-white rounded-2xl p-8 border-2 border-[#b29e84]/20 hover:border-[#fbb80f] transition-all hover:shadow-xl text-left"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#fbb80f] to-[#fbee0f] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#253439] mb-3">Portal do Aluno</h2>
            <p className="text-[#7c898b] mb-6">
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
            <div className="mt-6 text-[#fbb80f] font-semibold group-hover:translate-x-2 transition-transform">
              Acessar Portal →
            </div>
          </button>

          {/* Teacher Portal */}
          <button
            onClick={() => setPlatform('teacher')}
            className="card card-teacher group bg-white rounded-2xl p-8 border-2 border-[#b29e84]/20 hover:border-[#253439] transition-all hover:shadow-xl text-left"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#253439] to-[#7c898b] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#253439] mb-3">Portal do Professor</h2>
            <p className="text-[#7c898b] mb-6">
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
            <div className="mt-6 text-[#253439] font-semibold group-hover:translate-x-2 transition-transform">
              Acessar Portal →
            </div>
          </button>
        </div>

        {/* Info */}
        <div className="sel-foot mt-12 text-center">
          <div className="info bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-[#b29e84]/20">
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
