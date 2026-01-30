import { useState } from 'react';
import { 
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  MessageSquare,
  Calendar,
  User,
  FileText,
  X
} from 'lucide-react';

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  totalStudents: number;
  submitted: number;
  graded: number;
  pending: number;
  status: 'active' | 'closed';
}

interface Submission {
  id: number;
  studentName: string;
  assignmentTitle: string;
  submittedDate: string;
  status: 'pending' | 'graded';
  grade?: number;
}

export function AssignmentManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [view, setView] = useState<'assignments' | 'submissions'>('assignments');
  const [showAddModal, setShowAddModal] = useState(false);

  const assignments: Assignment[] = [
    {
      id: 1,
      title: 'Essay: My Daily Routine',
      course: 'B1 - Intermediate',
      dueDate: '2026-01-12',
      totalStudents: 15,
      submitted: 12,
      graded: 8,
      pending: 4,
      status: 'active'
    },
    {
      id: 2,
      title: 'Grammar Exercise: Past Tenses',
      course: 'B1 - Intermediate',
      dueDate: '2026-01-15',
      totalStudents: 15,
      submitted: 5,
      graded: 0,
      pending: 5,
      status: 'active'
    },
    {
      id: 3,
      title: 'Vocabulary Quiz Preparation',
      course: 'Business English',
      dueDate: '2026-01-14',
      totalStudents: 10,
      submitted: 8,
      graded: 8,
      pending: 0,
      status: 'active'
    },
    {
      id: 4,
      title: 'Reading Comprehension',
      course: 'B1 - Intermediate',
      dueDate: '2026-01-08',
      totalStudents: 15,
      submitted: 15,
      graded: 15,
      pending: 0,
      status: 'closed'
    },
  ];

  const submissions: Submission[] = [
    {
      id: 1,
      studentName: 'Ana Maria Santos',
      assignmentTitle: 'Essay: My Daily Routine',
      submittedDate: '2026-01-09T14:30:00',
      status: 'pending'
    },
    {
      id: 2,
      studentName: 'Carlos Eduardo Silva',
      assignmentTitle: 'Essay: My Daily Routine',
      submittedDate: '2026-01-09T16:20:00',
      status: 'pending'
    },
    {
      id: 3,
      studentName: 'Mariana Costa',
      assignmentTitle: 'Reading Comprehension',
      submittedDate: '2026-01-07T10:15:00',
      status: 'graded',
      grade: 9.5
    },
    {
      id: 4,
      studentName: 'Pedro Henrique',
      assignmentTitle: 'Vocabulary Quiz Preparation',
      submittedDate: '2026-01-08T18:45:00',
      status: 'graded',
      grade: 8.0
    },
  ];

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || assignment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const pendingSubmissions = submissions.filter(s => s.status === 'pending');

  const stats = [
    { label: 'Total de Tarefas', value: assignments.length, icon: FileText, color: 'bg-[#253439]/10 text-[#253439]' },
    { label: 'Entregas Pendentes', value: pendingSubmissions.length, icon: Clock, color: 'bg-[#fbb80f]/10 text-[#fbb80f]' },
    { label: 'Tarefas Ativas', value: assignments.filter(a => a.status === 'active').length, icon: AlertCircle, color: 'bg-[#fbee0f]/20 text-[#fbee0f]' },
    { label: 'Corrigidas Hoje', value: 8, icon: CheckCircle2, color: 'bg-[#b29e84]/20 text-[#b29e84]' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-[#253439] mb-2">Gestão de Tarefas</h1>
            <p className="text-[#7c898b]">Acompanhe e corrija as entregas dos alunos</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#fbb80f] text-white px-6 py-3 rounded-lg hover:bg-[#253439] transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Nova Tarefa
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

      {/* View Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setView('assignments')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            view === 'assignments'
              ? 'bg-[#fbb80f] text-white'
              : 'bg-white text-[#253439] border border-[#b29e84]/20 hover:bg-[#f6f4f1]'
          }`}
        >
          Tarefas Criadas
        </button>
        <button
          onClick={() => setView('submissions')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
            view === 'submissions'
              ? 'bg-[#fbb80f] text-white'
              : 'bg-white text-[#253439] border border-[#b29e84]/20 hover:bg-[#f6f4f1]'
          }`}
        >
          Entregas Recebidas
          {pendingSubmissions.length > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {pendingSubmissions.length}
            </span>
          )}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
            <input
              type="text"
              placeholder="Buscar tarefas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white appearance-none"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativas</option>
              <option value="closed">Encerradas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Assignments View */}
      {view === 'assignments' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAssignments.map((assignment) => (
            <div key={assignment.id} className="bg-white rounded-xl border border-[#b29e84]/20 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#253439] mb-2">{assignment.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-[#7c898b] mb-3">
                    <span>{assignment.course}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(assignment.dueDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  assignment.status === 'active'
                    ? 'bg-[#fbb80f]/20 text-[#fbb80f]'
                    : 'bg-[#7c898b]/20 text-[#7c898b]'
                }`}>
                  {assignment.status === 'active' ? 'Ativa' : 'Encerrada'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-[#f6f4f1] rounded-lg">
                  <p className="text-2xl font-bold text-[#253439]">{assignment.submitted}</p>
                  <p className="text-xs text-[#7c898b]">Entregas</p>
                </div>
                <div className="text-center p-3 bg-[#fbb80f]/10 rounded-lg">
                  <p className="text-2xl font-bold text-[#fbb80f]">{assignment.pending}</p>
                  <p className="text-xs text-[#7c898b]">Pendentes</p>
                </div>
                <div className="text-center p-3 bg-[#fbee0f]/10 rounded-lg">
                  <p className="text-2xl font-bold text-[#fbee0f]">{assignment.graded}</p>
                  <p className="text-xs text-[#7c898b]">Corrigidas</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#7c898b]">Progresso</span>
                  <span className="text-sm font-semibold text-[#253439]">
                    {Math.round((assignment.submitted / assignment.totalStudents) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-[#b29e84]/20 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-[#fbb80f] to-[#fbee0f]"
                    style={{ width: `${(assignment.submitted / assignment.totalStudents) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-[#fbb80f] text-white py-2.5 rounded-lg hover:bg-[#253439] transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                  <Eye className="w-4 h-4" />
                  Ver Entregas
                </button>
                {assignment.pending > 0 && (
                  <button className="px-4 py-2.5 bg-[#f6f4f1] text-[#253439] rounded-lg hover:bg-[#b29e84]/20 transition-colors text-sm font-medium">
                    Corrigir ({assignment.pending})
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submissions View */}
      {view === 'submissions' && (
        <div className="bg-white rounded-xl border border-[#b29e84]/20 overflow-hidden">
          <div className="p-4 border-b border-[#b29e84]/20 bg-[#f6f4f1]">
            <h2 className="font-semibold text-[#253439]">Entregas Recebidas</h2>
          </div>

          <div className="divide-y divide-[#b29e84]/20">
            {submissions.map((submission) => (
              <div key={submission.id} className="p-6 hover:bg-[#f6f4f1] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#253439] to-[#7c898b] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {submission.studentName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-[#253439]">{submission.studentName}</h3>
                        <p className="text-sm text-[#7c898b]">{submission.assignmentTitle}</p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        submission.status === 'graded'
                          ? 'bg-[#fbee0f]/20 text-[#fbee0f]'
                          : 'bg-[#fbb80f]/20 text-[#fbb80f]'
                      }`}>
                        {submission.status === 'graded' ? 'Corrigida' : 'Pendente'}
                      </span>
                    </div>

                    <p className="text-sm text-[#7c898b] mb-3">
                      Enviado em {new Date(submission.submittedDate).toLocaleDateString('pt-BR')} às{' '}
                      {new Date(submission.submittedDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>

                    {submission.status === 'graded' ? (
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[#7c898b]">Nota:</span>
                          <span className="text-lg font-bold text-[#fbb80f]">{submission.grade}</span>
                        </div>
                        <button className="text-[#253439] hover:text-[#fbb80f] text-sm font-medium flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          Ver Feedback
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button className="bg-[#fbb80f] text-white px-4 py-2 rounded-lg hover:bg-[#253439] transition-colors text-sm font-medium flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Corrigir Agora
                        </button>
                        <button className="bg-[#f6f4f1] text-[#253439] px-4 py-2 rounded-lg hover:bg-[#b29e84]/20 transition-colors text-sm font-medium">
                          Visualizar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Add Assignment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-[#253439] to-[#7c898b] p-6 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Criar Nova Tarefa</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#253439] mb-2">Título da Tarefa</label>
                  <input
                    type="text"
                    placeholder="Ex: Essay: My Daily Routine"
                    className="w-full px-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#253439] mb-2">Curso</label>
                  <select className="w-full px-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white">
                    <option value="">Selecione um curso</option>
                    <option>A1 - Beginner</option>
                    <option>A2 - Elementary</option>
                    <option>B1 - Intermediate</option>
                    <option>B2-C1 - Advanced</option>
                    <option>Conversation 1</option>
                    <option>Conversation 2</option>
                    <option>Business English</option>
                    <option>Travel English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#253439] mb-2">Data de Entrega</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#253439] mb-2">Tipo de Tarefa</label>
                  <select className="w-full px-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white">
                    <option>Essay</option>
                    <option>Grammar Exercise</option>
                    <option>Reading Comprehension</option>
                    <option>Listening Exercise</option>
                    <option>Speaking Practice</option>
                    <option>Vocabulary Quiz</option>
                    <option>Writing Practice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#253439] mb-2">Instruções</label>
                  <textarea
                    rows={5}
                    placeholder="Descreva as instruções da tarefa..."
                    className="w-full px-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#253439] mb-2">Pontos</label>
                    <input
                      type="number"
                      placeholder="10"
                      min="0"
                      max="100"
                      className="w-full px-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#253439] mb-2">Tentativas Permitidas</label>
                    <input
                      type="number"
                      placeholder="1"
                      min="1"
                      max="5"
                      className="w-full px-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#253439] mb-2">
                    Anexar Materiais (Opcional)
                  </label>
                  <div className="border-2 border-dashed border-[#b29e84]/30 rounded-lg p-6 text-center hover:border-[#fbb80f] transition-colors cursor-pointer">
                    <FileText className="w-8 h-8 text-[#7c898b] mx-auto mb-2" />
                    <p className="text-sm text-[#7c898b]">Clique para fazer upload ou arraste arquivos aqui</p>
                    <p className="text-xs text-[#b29e84] mt-1">PDF, DOC, DOCX até 10MB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#b29e84]/20 p-4 bg-[#f6f4f1] flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-white text-[#253439] px-4 py-2.5 rounded-lg hover:bg-[#b29e84]/20 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // Add logic to save assignment
                  setShowAddModal(false);
                }}
                className="flex-1 bg-[#fbb80f] text-white px-4 py-2.5 rounded-lg hover:bg-[#253439] transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Criar Tarefa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}