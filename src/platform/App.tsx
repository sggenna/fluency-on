import { useState } from 'react';
import { GraduationCap, User } from 'lucide-react';
import StudentApp from './student/App';
import ProfessorApp from './professor/App';

export default function App() {
  const [platform, setPlatform] = useState<'student' | 'professor' | null>(null);

  if (platform === 'student') {
    return <StudentApp />;
  }

  if (platform === 'professor') {
    return <ProfessorApp />;
  }

  return (
    <div className="selector-page">
      <div className="selector-container">
        <div className="selector-header">
          <div className="selector-logo">
            <GraduationCap />
          </div>
          <h1 className="selector-title">FluencyOn</h1>
          <p className="selector-subtitle">Plataforma Educacional</p>
        </div>

        <div className="selector-cards">
          <button
            type="button"
            onClick={() => setPlatform('student')}
            className="selector-card selector-card-student"
          >
            <div className="selector-card-icon">
              <User />
            </div>
            <h2 className="selector-card-title">Portal do Aluno</h2>
            <p className="selector-card-desc">
              Acesse suas aulas, materiais, tarefas e acompanhe seu progresso de aprendizado
            </p>
            <div className="selector-card-features">
              <div className="selector-card-feature">
                <div className="selector-card-feature-dot" />
                <span>Dashboard personalizado</span>
              </div>
              <div className="selector-card-feature">
                <div className="selector-card-feature-dot" />
                <span>Biblioteca de lições</span>
              </div>
              <div className="selector-card-feature">
                <div className="selector-card-feature-dot" />
                <span>Tarefas e materiais</span>
              </div>
              <div className="selector-card-feature">
                <div className="selector-card-feature-dot" />
                <span>Acompanhamento de progresso</span>
              </div>
            </div>
            <div className="selector-card-cta">Acessar Portal →</div>
          </button>

          <button
            type="button"
            onClick={() => setPlatform('professor')}
            className="selector-card selector-card-professor"
          >
            <div className="selector-card-icon">
              <GraduationCap />
            </div>
            <h2 className="selector-card-title">Portal do Professor</h2>
            <p className="selector-card-desc">
              Gerencie alunos, cursos, lições, materiais e acompanhe o desempenho da turma
            </p>
            <div className="selector-card-features">
              <div className="selector-card-feature">
                <div className="selector-card-feature-dot" />
                <span>Gestão de alunos e cursos</span>
              </div>
              <div className="selector-card-feature">
                <div className="selector-card-feature-dot" />
                <span>Upload de lições e materiais</span>
              </div>
              <div className="selector-card-feature">
                <div className="selector-card-feature-dot" />
                <span>Correção de tarefas</span>
              </div>
              <div className="selector-card-feature">
                <div className="selector-card-feature-dot" />
                <span>Analytics e relatórios</span>
              </div>
            </div>
            <div className="selector-card-cta">Acessar Portal →</div>
          </button>
        </div>

        <div className="selector-footer">
          <div className="selector-info">
            <p>
              <strong>FluencyOn</strong> - Transforme Seu Inglês em Confiança Real
            </p>
            <p>Prof. Jamile Oliveira • 15 anos de experiência • 4 anos na Flórida</p>
          </div>
        </div>
      </div>
    </div>
  );
}
