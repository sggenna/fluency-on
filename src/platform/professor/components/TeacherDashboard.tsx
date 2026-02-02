import { 
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  UserPlus,
  Upload,
  MessageSquare,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Award,
  Video,
  ArrowRight
} from 'lucide-react';

interface TeacherDashboardProps {
  onNavigate?: (view: string) => void;
}

export function TeacherDashboard({ onNavigate }: TeacherDashboardProps) {
  const stats = [
    { label: 'Total de Alunos', value: '48', icon: Users, color: 'bg-[#253439]/10 text-[#253439]', change: '+5 este mês' },
    { label: 'Cursos Ativos', value: '8', icon: BookOpen, color: 'bg-[#fbb80f]/10 text-[#fbb80f]', change: '2 em andamento' },
    { label: 'Taxa de Conclusão', value: '87%', icon: TrendingUp, color: 'bg-[#fbee0f]/20 text-[#fbee0f]', change: '+12% vs mês anterior' },
    { label: 'Horas de Aula', value: '124h', icon: Clock, color: 'bg-[#b29e84]/20 text-[#b29e84]', change: 'Este mês' },
  ];

  const quickActions = [
    { 
      label: 'Adicionar Aluno', 
      icon: UserPlus, 
      color: 'from-[#253439] to-[#7c898b]',
      description: 'Cadastrar novo estudante',
      action: () => onNavigate?.('students')
    },
    { 
      label: 'Upload de Lição', 
      icon: Upload, 
      color: 'from-[#fbb80f] to-[#fbee0f]',
      description: 'Adicionar nova aula',
      action: () => onNavigate?.('lessons')
    },
    { 
      label: 'Enviar Mensagem', 
      icon: MessageSquare, 
      color: 'from-[#b29e84] to-[#7c898b]',
      description: 'Comunicar com alunos',
      action: () => onNavigate?.('announcements')
    },
    { 
      label: 'Agendar Aula', 
      icon: Calendar, 
      color: 'from-[#fbee0f] to-[#fbb80f]',
      description: 'Criar evento no calendário',
      action: () => onNavigate?.('schedule')
    },
  ];

  const recentActivities = [
    { 
      id: 1, 
      type: 'submission',
      student: 'Ana Maria Santos',
      action: 'Enviou tarefa "Essay: My Daily Routine"',
      time: 'Há 15 minutos',
      icon: CheckCircle2,
      color: 'text-[#fbb80f] bg-[#fbb80f]/10'
    },
    { 
      id: 2, 
      type: 'enrollment',
      student: 'Carlos Eduardo Silva',
      action: 'Inscrito no curso B1 - Intermediate',
      time: 'Há 1 hora',
      icon: UserPlus,
      color: 'text-[#253439] bg-[#253439]/10'
    },
    { 
      id: 3, 
      type: 'completion',
      student: 'Mariana Costa',
      action: 'Completou Module 3: Vocabulary Building',
      time: 'Há 2 horas',
      icon: Award,
      color: 'text-[#fbee0f] bg-[#fbee0f]/20'
    },
    { 
      id: 4, 
      type: 'alert',
      student: 'Pedro Henrique',
      action: 'Tarefa atrasada: Grammar Exercise',
      time: 'Há 4 horas',
      icon: AlertCircle,
      color: 'text-[#b29e84] bg-[#b29e84]/20'
    },
  ];

  const upcomingClasses = [
    {
      id: 1,
      title: 'B1 - Intermediate',
      time: 'Hoje às 19:00',
      students: 12,
      duration: '60 min',
      meetLink: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: 2,
      title: 'Conversation 1',
      time: 'Amanhã às 19:00',
      students: 8,
      duration: '45 min',
      meetLink: 'https://meet.google.com/xyz-uvwx-rst'
    },
    {
      id: 3,
      title: 'Business English',
      time: '12 Jan às 19:00',
      students: 10,
      duration: '90 min',
      meetLink: 'https://meet.google.com/123-4567-890'
    },
  ];

  const pendingTasks = [
    { id: 1, task: 'Corrigir 8 tarefas pendentes', count: 8, priority: 'high' },
    { id: 2, task: 'Revisar progresso de 3 alunos', count: 3, priority: 'medium' },
    { id: 3, task: 'Preparar material para próxima aula', count: 1, priority: 'high' },
    { id: 4, task: 'Responder mensagens dos alunos', count: 5, priority: 'medium' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#253439] mb-2">Olá, Prof. Jamile! 👋</h1>
        <p className="text-sm sm:text-base text-[#7c898b]">Aqui está um resumo da sua atividade de ensino</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-[#b29e84]/20 hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold text-[#253439] mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-[#253439] mb-2">{stat.label}</p>
              <p className="text-xs text-[#7c898b]">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#253439] mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className={`bg-gradient-to-br ${action.color} p-6 rounded-xl text-white hover:shadow-lg transition-all hover:scale-105 text-left`}
              >
                <Icon className="w-8 h-8 mb-3" />
                <p className="font-semibold mb-1">{action.label}</p>
                <p className="text-sm text-white/80">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 lg:mb-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#253439]">Atividades Recentes</h2>
            <button
              onClick={() => onNavigate?.('progress')}
              className="text-[#fbb80f] hover:text-[#253439] text-sm font-medium flex items-center gap-1 transition-colors"
            >
              Ver todas
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-4 p-4 bg-[#f6f4f1] rounded-lg hover:bg-[#b29e84]/10 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#253439]">{activity.student}</p>
                    <p className="text-sm text-[#7c898b]">{activity.action}</p>
                    <p className="text-xs text-[#b29e84] mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <h2 className="text-xl font-semibold text-[#253439] mb-4">Próximas Aulas</h2>
          <div className="space-y-3">
            {upcomingClasses.map((cls) => (
              <div key={cls.id} className="p-4 bg-[#f6f4f1] rounded-lg hover:bg-[#b29e84]/10 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-semibold text-[#253439] mb-1">{cls.title}</p>
                    <p className="text-sm text-[#7c898b]">{cls.time}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#7c898b]">
                    <Users className="w-4 h-4" />
                    <span>{cls.students}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-[#7c898b]">
                    <Clock className="w-4 h-4" />
                    <span>{cls.duration}</span>
                  </div>
                  <a 
                    href={cls.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#fbb80f] hover:text-[#253439] text-sm font-medium flex items-center gap-1"
                  >
                    <Video className="w-4 h-4" />
                    Iniciar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="bg-gradient-to-br from-[#fbb80f]/10 to-[#fbee0f]/10 border border-[#fbb80f]/30 rounded-xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-[#253439] mb-4">Tarefas Pendentes</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {pendingTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-lg p-4 border border-[#b29e84]/20">
              <div className="flex items-start justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  task.priority === 'high' ? 'bg-[#fbb80f]/20 text-[#fbb80f]' : 'bg-[#b29e84]/20 text-[#b29e84]'
                }`}>
                  <span className="font-bold">{task.count}</span>
                </div>
                {task.priority === 'high' && (
                  <span className="text-xs bg-[#fbb80f] text-white px-2 py-1 rounded-full">Urgente</span>
                )}
              </div>
              <p className="text-sm font-medium text-[#253439]">{task.task}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}