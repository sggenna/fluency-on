import { useState } from 'react';
import { 
  Plus,
  Megaphone,
  Send,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Target,
  X
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
  const [viewingAnnouncement, setViewingAnnouncement] = useState<Announcement | null>(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [announcementsList, setAnnouncementsList] = useState<Announcement[]>([
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
  ]);

  const stats = [
    { label: 'Total de Anúncios', value: announcementsList.length, icon: Megaphone, color: 'bg-[#253439]/10 text-[#253439]' },
    { label: 'Publicados', value: announcementsList.filter(a => a.status === 'published').length, icon: CheckCircle, color: 'bg-[#fbb80f]/10 text-[#fbb80f]' },
    { label: 'Agendados', value: announcementsList.filter(a => a.status === 'scheduled').length, icon: Clock, color: 'bg-[#fbee0f]/20 text-[#fbee0f]' },
    { label: 'Total de Views', value: announcementsList.reduce((acc, a) => acc + a.views, 0), icon: Eye, color: 'bg-[#b29e84]/20 text-[#b29e84]' },
  ];

  const handleSaveEdit = () => {
    if (!editingAnnouncement) return;
    setAnnouncementsList(prev =>
      prev.map(a =>
        a.id === editingAnnouncement.id
          ? { ...a, title: formData.title, message: formData.message, targetAudience: formData.targetAudience as Announcement['targetAudience'], targetDetails: formData.targetDetails }
          : a
      )
    );
    setEditingAnnouncement(null);
    setFormData({ title: '', message: '', targetAudience: 'all', targetDetails: '', scheduledDate: '' });
  };

  const handleDelete = (id: number) => {
    setAnnouncementsList(prev => prev.filter(a => a.id !== id));
    setDeleteConfirmId(null);
  };

  const openEdit = (a: Announcement) => {
    setEditingAnnouncement(a);
    setFormData({
      title: a.title,
      message: a.message,
      targetAudience: a.targetAudience,
      targetDetails: a.targetDetails || '',
      scheduledDate: a.scheduledDate || '',
    });
    setShowCreateForm(false);
  };

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
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#253439] mb-2">Gerenciar Anúncios</h1>
            <p className="text-[#7c898b]">Comunique-se com seus alunos de forma eficaz</p>
          </div>
          <button
            type="button"
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-[#fbb80f] text-white p-3 sm:px-6 sm:py-3 rounded-lg hover:bg-[#253439] transition-colors flex items-center justify-center gap-2 font-medium min-h-[44px] min-w-[44px] sm:min-w-0"
            aria-label="Novo Anúncio"
          >
            <Plus className="w-5 h-5 flex-shrink-0" />
            <span className="hidden sm:inline">Novo Anúncio</span>
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
          {announcementsList.map((announcement) => (
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
                      <button
                        onClick={() => setViewingAnnouncement(announcement)}
                        className="w-10 h-10 bg-[#f6f4f1] text-[#253439] rounded-lg hover:bg-[#b29e84]/20 transition-colors flex items-center justify-center"
                        title="Visualizar"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEdit(announcement)}
                        className="w-10 h-10 bg-[#f6f4f1] text-[#253439] rounded-lg hover:bg-[#b29e84]/20 transition-colors flex items-center justify-center"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(announcement.id)}
                        className="w-10 h-10 bg-[#f6f4f1] text-[#253439] rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center"
                        title="Excluir"
                      >
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

      {/* View modal */}
      {viewingAnnouncement && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setViewingAnnouncement(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#253439]">{viewingAnnouncement.title}</h2>
              <button type="button" onClick={() => setViewingAnnouncement(null)} className="p-2 rounded-lg hover:bg-[#f6f4f1] text-[#7c898b]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-[#7c898b] mb-2">Público: {getAudienceLabel(viewingAnnouncement)}</p>
            <p className="text-sm text-[#7c898b] mb-4">
              Criado em {new Date(viewingAnnouncement.createdDate).toLocaleDateString('pt-BR')} · {viewingAnnouncement.views} visualizações
            </p>
            <p className="text-[#253439] whitespace-pre-wrap">{viewingAnnouncement.message}</p>
            <button type="button" onClick={() => setViewingAnnouncement(null)} className="w-full mt-6 py-2.5 rounded-lg bg-[#253439] text-white font-medium hover:bg-[#fbb80f]">
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Edit form (when editing) */}
      {editingAnnouncement && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditingAnnouncement(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold text-[#253439] mb-4">Editar anúncio</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#253439] mb-1">Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#253439] mb-1">Mensagem</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#253439] mb-1">Público</label>
                <select
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  className="w-full px-4 py-2 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white"
                >
                  <option value="all">Todos</option>
                  <option value="course">Curso</option>
                  <option value="student">Aluno</option>
                </select>
              </div>
              {formData.targetAudience !== 'all' && (
                <div>
                  <label className="block text-sm font-medium text-[#253439] mb-1">Detalhe</label>
                  <input
                    type="text"
                    value={formData.targetDetails}
                    onChange={(e) => setFormData({ ...formData, targetDetails: e.target.value })}
                    className="w-full px-4 py-2 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-6">
              <button type="button" onClick={() => setEditingAnnouncement(null)} className="flex-1 py-2.5 rounded-lg border border-[#b29e84]/30 text-[#253439] font-medium">
                Cancelar
              </button>
              <button type="button" onClick={handleSaveEdit} className="flex-1 py-2.5 rounded-lg bg-[#fbb80f] text-white font-medium hover:bg-[#253439]">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirmId(null)}>
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <p className="text-[#253439] font-medium mb-4">Excluir este anúncio? Esta ação não pode ser desfeita.</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => setDeleteConfirmId(null)} className="flex-1 py-2.5 rounded-lg border border-[#b29e84]/30 text-[#253439] font-medium">
                Cancelar
              </button>
              <button type="button" onClick={() => handleDelete(deleteConfirmId)} className="flex-1 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700">
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
