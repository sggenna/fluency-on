import { useState } from 'react';
import { 
  Plus,
  Megaphone,
  Users,
  Send,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  message: string;
  targetAudience: 'all' | 'course' | 'student';
  targetDetails?: string;
  createdDate: string;
  scheduledDate?: string;
  status: 'draft' | 'scheduled' | 'published';
  views: number;
}

export function AnnouncementManagement() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    targetAudience: 'all',
    targetDetails: '',
    scheduledDate: ''
  });

  const announcements: Announcement[] = [
    {
      id: 1,
      title: 'Nova Lição Disponível: Conditional Sentences',
      message: 'Foi adicionada uma nova lição sobre Conditional Sentences no Module 4 do B1 - Intermediate. Não deixe de conferir!',
      targetAudience: 'course',
      targetDetails: 'B1 - Intermediate',
      createdDate: '2026-01-09T10:30:00',
      status: 'published',
      views: 42
    },
    {
      id: 2,
      title: 'Lembrete: Aula ao Vivo Amanhã',
      message: 'Não esqueça da nossa aula de Grammar Review amanhã às 19:00. O link do Google Meet já está disponível no calendário.',
      targetAudience: 'course',
      targetDetails: 'B1 - Intermediate',
      createdDate: '2026-01-09T09:00:00',
      status: 'published',
      views: 38
    },
    {
      id: 3,
      title: 'Novos Materiais na Biblioteca',
      message: 'Foram adicionados novos Slides das Aulas e áudios de pronúncia. Aproveite para estudar!',
      targetAudience: 'all',
      createdDate: '2026-01-07T11:00:00',
      status: 'published',
      views: 65
    },
    {
      id: 4,
      title: 'Feedback Importante - Ana Maria',
      message: 'Sua tarefa "Reading Comprehension" foi corrigida. Parabéns pelo excelente trabalho!',
      targetAudience: 'student',
      targetDetails: 'Ana Maria Santos',
      createdDate: '2026-01-08T15:30:00',
      status: 'published',
      views: 1
    },
    {
      id: 5,
      title: 'Novo Módulo em Breve',
      message: 'Estou preparando um novo módulo especial sobre English for Interviews. Fique atento!',
      targetAudience: 'all',
      createdDate: '2026-01-06T14:00:00',
      scheduledDate: '2026-01-12T09:00:00',
      status: 'scheduled',
      views: 0
    },
  ];

  const stats = [
    { label: 'Total de Anúncios', value: announcements.length, icon: Megaphone, color: 'bg-[#253439]/10 text-[#253439]' },
    { label: 'Publicados', value: announcements.filter(a => a.status === 'published').length, icon: CheckCircle, color: 'bg-[#fbb80f]/10 text-[#fbb80f]' },
    { label: 'Agendados', value: announcements.filter(a => a.status === 'scheduled').length, icon: Clock, color: 'bg-[#fbee0f]/20 text-[#fbee0f]' },
    { label: 'Total de Views', value: announcements.reduce((acc, a) => acc + a.views, 0), icon: Eye, color: 'bg-[#b29e84]/20 text-[#b29e84]' },
  ];

  const getAudienceLabel = (announcement: Announcement) => {
    switch (announcement.targetAudience) {
      case 'all':
        return 'Todos os Alunos';
      case 'course':
        return announcement.targetDetails || 'Curso';
      case 'student':
        return announcement.targetDetails || 'Aluno Individual';
      default:
        return 'N/A';
    }
  };

  const getAudienceColor = (targetAudience: string) => {
    switch (targetAudience) {
      case 'all':
        return 'bg-[#fbb80f]/20 text-[#fbb80f]';
      case 'course':
        return 'bg-[#253439]/20 text-[#253439]';
      case 'student':
        return 'bg-[#b29e84]/20 text-[#b29e84]';
      default:
        return 'bg-[#7c898b]/20 text-[#7c898b]';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-[#253439] mb-2">Gerenciar Anúncios</h1>
            <p className="text-[#7c898b]">Comunique-se com seus alunos de forma eficaz</p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-[#fbb80f] text-white px-6 py-3 rounded-lg hover:bg-[#253439] transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Novo Anúncio
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-[#b29e84]/20">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold text-[#253439] mb-1">{stat.value}</p>
              <p className="text-sm text-[#7c898b]">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Create Announcement Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#253439] mb-4">Criar Novo Anúncio</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#253439] mb-2">
                Título do Anúncio *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Digite o título do anúncio"
                className="w-full px-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#253439] mb-2">
                Mensagem *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Digite a mensagem do anúncio"
                rows={4}
                className="w-full px-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#253439] mb-2">
                  Público-Alvo *
                </label>
                <select
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  className="w-full px-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white"
                >
                  <option value="all">Todos os Alunos</option>
                  <option value="course">Curso Específico</option>
                  <option value="student">Aluno Específico</option>
                </select>
              </div>

              {formData.targetAudience !== 'all' && (
                <div>
                  <label className="block text-sm font-medium text-[#253439] mb-2">
                    {formData.targetAudience === 'course' ? 'Selecione o Curso' : 'Selecione o Aluno'}
                  </label>
                  <select
                    value={formData.targetDetails}
                    onChange={(e) => setFormData({ ...formData, targetDetails: e.target.value })}
                    className="w-full px-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white"
                  >
                    <option value="">Selecione...</option>
                    {formData.targetAudience === 'course' ? (
                      <>
                        <option value="B1 - Intermediate">B1 - Intermediate</option>
                        <option value="Business English">Business English</option>
                        <option value="Conversation 1">Conversation 1</option>
                      </>
                    ) : (
                      <>
                        <option value="Ana Maria Santos">Ana Maria Santos</option>
                        <option value="Carlos Eduardo Silva">Carlos Eduardo Silva</option>
                        <option value="Mariana Costa">Mariana Costa</option>
                      </>
                    )}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#253439] mb-2">
                  Agendar para (Opcional)
                </label>
                <input
                  type="datetime-local"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  className="w-full px-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2.5 rounded-lg font-medium text-[#7c898b] hover:bg-[#f6f4f1] transition-colors"
              >
                Cancelar
              </button>
              <button className="flex-1 bg-[#f6f4f1] text-[#253439] px-6 py-2.5 rounded-lg hover:bg-[#b29e84]/20 transition-colors font-medium">
                Salvar como Rascunho
              </button>
              <button className="flex-1 bg-[#fbb80f] text-white px-6 py-2.5 rounded-lg hover:bg-[#253439] transition-colors font-medium flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                {formData.scheduledDate ? 'Agendar' : 'Publicar Agora'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div className="bg-white rounded-xl border border-[#b29e84]/20 overflow-hidden">
        <div className="p-4 border-b border-[#b29e84]/20 bg-[#f6f4f1]">
          <h2 className="font-semibold text-[#253439]">Todos os Anúncios</h2>
        </div>

        <div className="divide-y divide-[#b29e84]/20">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="p-6 hover:bg-[#f6f4f1] transition-colors">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg ${
                  announcement.status === 'published' 
                    ? 'bg-[#fbb80f]/10 text-[#fbb80f]'
                    : announcement.status === 'scheduled'
                    ? 'bg-[#fbee0f]/20 text-[#fbee0f]'
                    : 'bg-[#7c898b]/10 text-[#7c898b]'
                } flex items-center justify-center flex-shrink-0`}>
                  <Megaphone className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-[#253439]">{announcement.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getAudienceColor(announcement.targetAudience)}`}>
                        <Target className="w-3 h-3 inline mr-1" />
                        {getAudienceLabel(announcement)}
                      </span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        announcement.status === 'published'
                          ? 'bg-[#fbb80f]/20 text-[#fbb80f]'
                          : announcement.status === 'scheduled'
                          ? 'bg-[#fbee0f]/20 text-[#fbee0f]'
                          : 'bg-[#7c898b]/20 text-[#7c898b]'
                      }`}>
                        {announcement.status === 'published' ? 'Publicado' : announcement.status === 'scheduled' ? 'Agendado' : 'Rascunho'}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-[#7c898b] mb-3 line-clamp-2">{announcement.message}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-[#7c898b]">
                      <span>
                        Criado em {new Date(announcement.createdDate).toLocaleDateString('pt-BR')}
                      </span>
                      {announcement.scheduledDate && (
                        <>
                          <span>•</span>
                          <span>
                            Agendado para {new Date(announcement.scheduledDate).toLocaleDateString('pt-BR')} às{' '}
                            {new Date(announcement.scheduledDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </>
                      )}
                      {announcement.status === 'published' && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {announcement.views} visualizações
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button className="w-10 h-10 bg-[#f6f4f1] text-[#253439] rounded-lg hover:bg-[#b29e84]/20 transition-colors flex items-center justify-center">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="w-10 h-10 bg-[#f6f4f1] text-[#253439] rounded-lg hover:bg-[#b29e84]/20 transition-colors flex items-center justify-center">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="w-10 h-10 bg-[#f6f4f1] text-[#253439] rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
