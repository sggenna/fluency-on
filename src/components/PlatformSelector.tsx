import { useState } from 'react';
import { GraduationCap, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { StudentApp } from '../student/StudentApp';
import TeacherApp from '../teacher/App';

export function PlatformSelector() {
  const [selectedPlatform, setSelectedPlatform] = useState<'student' | 'teacher' | null>(null);

  // Render selected platform
  if (selectedPlatform === 'student') {
    return <StudentApp />;
  }

  if (selectedPlatform === 'teacher') {
    return <TeacherApp />;
  }

  // Platform selection screen
  return (
    <div className="platform-selector-container min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-8">
      <div className="platform-selector-content max-w-4xl w-full">
        {/* Header Section */}
        <motion.div 
          className="platform-selector-header text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="platform-selector-logo-container w-20 h-20 bg-gradient-to-br from-primary to-muted-foreground rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <GraduationCap className="platform-selector-logo-icon w-10 h-10 text-white" />
          </div>
          <h1 className="platform-selector-title text-4xl font-bold text-foreground mb-3">
            FluencyOn
          </h1>
          <p className="platform-selector-subtitle text-xl text-muted-foreground">
            Plataforma Educacional
          </p>
        </motion.div>

        {/* Platform Selection Cards */}
        <div className="platform-selector-cards grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Portal Card */}
          <motion.button
            onClick={() => setSelectedPlatform('student')}
            className="platform-card platform-card-student group bg-card rounded-2xl p-8 border-2 border-border hover:border-accent transition-all hover:shadow-xl text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="platform-card-icon-container w-16 h-16 bg-gradient-to-br from-accent to-accent-foreground rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
              <User className="platform-card-icon w-8 h-8 text-white" />
            </div>
            
            <h2 className="platform-card-title text-2xl font-bold text-card-foreground mb-3">
              Portal do Aluno
            </h2>
            
            <p className="platform-card-description text-muted-foreground mb-6">
              Acesse suas aulas, materiais, tarefas e acompanhe seu progresso de aprendizado
            </p>
            
            <div className="platform-card-features space-y-2">
              <div className="platform-card-feature flex items-center gap-2 text-sm text-muted-foreground">
                <div className="platform-card-feature-dot w-1.5 h-1.5 bg-accent rounded-full"></div>
                <span>Dashboard personalizado</span>
              </div>
              <div className="platform-card-feature flex items-center gap-2 text-sm text-muted-foreground">
                <div className="platform-card-feature-dot w-1.5 h-1.5 bg-accent rounded-full"></div>
                <span>Biblioteca de lições</span>
              </div>
              <div className="platform-card-feature flex items-center gap-2 text-sm text-muted-foreground">
                <div className="platform-card-feature-dot w-1.5 h-1.5 bg-accent rounded-full"></div>
                <span>Tarefas e materiais</span>
              </div>
              <div className="platform-card-feature flex items-center gap-2 text-sm text-muted-foreground">
                <div className="platform-card-feature-dot w-1.5 h-1.5 bg-accent rounded-full"></div>
                <span>Acompanhamento de progresso</span>
              </div>
            </div>
            
            <div className="platform-card-cta mt-6 text-accent font-semibold group-hover:translate-x-2 transition-transform flex items-center gap-2">
              Acessar Portal
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.button>

          {/* Teacher Portal Card */}
          <motion.button
            onClick={() => setSelectedPlatform('teacher')}
            className="platform-card platform-card-teacher group bg-card rounded-2xl p-8 border-2 border-border hover:border-primary transition-all hover:shadow-xl text-left"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="platform-card-icon-container w-16 h-16 bg-gradient-to-br from-primary to-muted-foreground rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
              <GraduationCap className="platform-card-icon w-8 h-8 text-white" />
            </div>
            
            <h2 className="platform-card-title text-2xl font-bold text-card-foreground mb-3">
              Portal do Professor
            </h2>
            
            <p className="platform-card-description text-muted-foreground mb-6">
              Gerencie alunos, cursos, lições, materiais e acompanhe o desempenho da turma
            </p>
            
            <div className="platform-card-features space-y-2">
              <div className="platform-card-feature flex items-center gap-2 text-sm text-muted-foreground">
                <div className="platform-card-feature-dot w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>Gestão de alunos e cursos</span>
              </div>
              <div className="platform-card-feature flex items-center gap-2 text-sm text-muted-foreground">
                <div className="platform-card-feature-dot w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>Upload de lições e materiais</span>
              </div>
              <div className="platform-card-feature flex items-center gap-2 text-sm text-muted-foreground">
                <div className="platform-card-feature-dot w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>Correção de tarefas</span>
              </div>
              <div className="platform-card-feature flex items-center gap-2 text-sm text-muted-foreground">
                <div className="platform-card-feature-dot w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>Analytics e relatórios</span>
              </div>
            </div>
            
            <div className="platform-card-cta mt-6 text-primary font-semibold group-hover:translate-x-2 transition-transform flex items-center gap-2">
              Acessar Portal
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.button>
        </div>

        {/* Footer Info Section */}
        <motion.div 
          className="platform-selector-footer mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="platform-selector-info bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
            <p className="platform-selector-info-text text-sm text-muted-foreground">
              <strong className="text-foreground">FluencyOn</strong> - Transforme Seu Inglês em Confiança Real
            </p>
            <p className="platform-selector-info-subtext text-xs text-muted-foreground mt-2">
              Prof. Jamile Oliveira • 15 anos de experiência • 4 anos na Flórida
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
