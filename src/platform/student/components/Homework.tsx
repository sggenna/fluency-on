import { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Upload, 
  FileText, 
  Calendar,
  MessageSquare,
  Star,
  ChevronRight
} from 'lucide-react';

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
  description: string;
}

export function Homework() {
  const [selectedTab, setSelectedTab] = useState<'pending' | 'submitted' | 'graded'>('pending');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const assignments: Assignment[] = [
    {
      id: 1,
      title: 'Essay: My Daily Routine',
      course: 'B1 - Intermediate',
      dueDate: '2026-01-12',
      status: 'pending',
      description: 'Escreva um texto de 200-250 palavras sobre sua rotina diária usando Present Simple e Present Continuous. Use o Student\'s Homework como referência.'
    },
    {
      id: 2,
      title: 'Grammar Exercise: Past Tenses',
      course: 'B1 - Intermediate',
      dueDate: '2026-01-15',
      status: 'pending',
      description: 'Complete os exercícios do Student\'s Homework páginas 42-44. Foque em Past Simple e Past Continuous.'
    },
    {
      id: 3,
      title: 'Vocabulary Quiz Preparation',
      course: 'Business English',
      dueDate: '2026-01-14',
      status: 'pending',
      description: 'Estude o vocabulário das unidades 3-4 para o quiz da próxima aula. Use a Apostila de Games para praticar.'
    },
    {
      id: 4,
      title: 'Reading Comprehension',
      course: 'B1 - Intermediate',
      dueDate: '2026-01-08',
      status: 'submitted',
      description: 'Leia o texto "A Day in New York" do Student\'s Book e responda às perguntas de compreensão.'
    },
    {
      id: 5,
      title: 'Speaking Practice Recording',
      course: 'Conversation 1',
      dueDate: '2026-01-06',
      status: 'graded',
      grade: 9.5,
      feedback: 'Excelente pronúncia e fluência! Continue praticando o uso de phrasal verbs no contexto conversacional. Parabéns pelo progresso!',
      description: 'Grave um áudio de 3-5 minutos falando sobre seus hobbies e interesses.'
    },
    {
      id: 6,
      title: 'Business Email Practice',
      course: 'Business English',
      dueDate: '2026-01-05',
      status: 'graded',
      grade: 8.0,
      feedback: 'Boa estrutura formal e uso adequado de vocabulário profissional. Preste atenção ao uso de expressões de cortesia e closing remarks.',
      description: 'Escreva um email formal solicitando informações sobre um produto.'
    },
  ];

  const filteredAssignments = assignments.filter(a => a.status === selectedTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-[#fbb80f] bg-[#fbb80f]/10 border-[#fbb80f]/30';
      case 'submitted': return 'text-[#253439] bg-[#253439]/10 border-[#253439]/30';
      case 'graded': return 'text-[#fbb80f] bg-[#fbb80f]/10 border-[#fbb80f]/30';
      default: return 'text-[#7c898b] bg-[#7c898b]/10 border-[#7c898b]/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'submitted': return 'Enviado';
      case 'graded': return 'Avaliado';
      default: return status;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#253439] mb-2">Tarefas</h1>
        <p className="text-[#7c898b]">Gerencie suas atividades e acompanhe o feedback do professor</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#7c898b] mb-1">Pendentes</p>
              <p className="text-3xl font-bold text-[#fbb80f]">
                {assignments.filter(a => a.status === 'pending').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#fbb80f]/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#fbb80f]" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#7c898b] mb-1">Enviados</p>
              <p className="text-3xl font-bold text-[#253439]">
                {assignments.filter(a => a.status === 'submitted').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#253439]/10 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-[#253439]" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#7c898b] mb-1">Média de Notas</p>
              <p className="text-3xl font-bold text-[#fbb80f]">8.8</p>
            </div>
            <div className="w-12 h-12 bg-[#fbb80f]/10 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-[#fbb80f]" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assignment List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-[#b29e84]/20 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-[#b29e84]/20">
              <button
                onClick={() => setSelectedTab('pending')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  selectedTab === 'pending'
                    ? 'text-[#fbb80f] border-b-2 border-[#fbb80f] bg-[#fbb80f]/5'
                    : 'text-[#7c898b] hover:text-[#253439]'
                }`}
              >
                Pendentes ({assignments.filter(a => a.status === 'pending').length})
              </button>
              <button
                onClick={() => setSelectedTab('submitted')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  selectedTab === 'submitted'
                    ? 'text-[#fbb80f] border-b-2 border-[#fbb80f] bg-[#fbb80f]/5'
                    : 'text-[#7c898b] hover:text-[#253439]'
                }`}
              >
                Enviados ({assignments.filter(a => a.status === 'submitted').length})
              </button>
              <button
                onClick={() => setSelectedTab('graded')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  selectedTab === 'graded'
                    ? 'text-[#fbb80f] border-b-2 border-[#fbb80f] bg-[#fbb80f]/5'
                    : 'text-[#7c898b] hover:text-[#253439]'
                }`}
              >
                Avaliados ({assignments.filter(a => a.status === 'graded').length})
              </button>
            </div>

            {/* Assignment List */}
            <div className="divide-y divide-[#b29e84]/20">
              {filteredAssignments.map((assignment) => {
                const daysUntil = getDaysUntilDue(assignment.dueDate);
                return (
                  <button
                    key={assignment.id}
                    onClick={() => setSelectedAssignment(assignment)}
                    className={`w-full p-4 text-left hover:bg-[#f6f4f1] transition-colors ${
                      selectedAssignment?.id === assignment.id ? 'bg-[#fbb80f]/5' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-[#253439] pr-2">{assignment.title}</p>
                      {selectedAssignment?.id === assignment.id && (
                        <ChevronRight className="w-5 h-5 text-[#fbb80f] flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-[#7c898b] mb-2">{assignment.course}</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#7c898b]" />
                      <span className="text-sm text-[#7c898b]">
                        {new Date(assignment.dueDate).toLocaleDateString('pt-BR')}
                      </span>
                      {assignment.status === 'pending' && daysUntil <= 3 && daysUntil > 0 && (
                        <span className="text-xs text-[#fbb80f] font-medium">
                          ({daysUntil} {daysUntil === 1 ? 'dia' : 'dias'})
                        </span>
                      )}
                      {assignment.status === 'pending' && daysUntil <= 0 && (
                        <span className="text-xs text-destructive font-medium">(Atrasado)</span>
                      )}
                    </div>
                    {assignment.grade !== undefined && (
                      <div className="mt-2 flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#fbb80f] fill-[#fbb80f]" />
                        <span className="font-semibold text-[#253439]">{assignment.grade}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Assignment Detail */}
        <div className="lg:col-span-2">
          {selectedAssignment ? (
            <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-[#253439] mb-2">{selectedAssignment.title}</h2>
                  <p className="text-[#7c898b]">{selectedAssignment.course}</p>
                </div>
                <div className={`px-3 py-1.5 rounded-full border ${getStatusColor(selectedAssignment.status)}`}>
                  <span className="text-sm font-medium">{getStatusLabel(selectedAssignment.status)}</span>
                </div>
              </div>

              <div className="bg-[#f6f4f1] rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-[#253439]" />
                  <span className="font-medium text-[#253439]">Data de Entrega</span>
                </div>
                <p className="text-[#7c898b]">
                  {new Date(selectedAssignment.dueDate).toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-[#253439] mb-3">Descrição</h3>
                <p className="text-[#7c898b] leading-relaxed">{selectedAssignment.description}</p>
              </div>

              {selectedAssignment.status === 'pending' && (
                <div className="border-2 border-dashed border-[#b29e84]/50 rounded-lg p-8 text-center mb-6">
                  <Upload className="w-12 h-12 text-[#7c898b] mx-auto mb-3" />
                  <h4 className="font-medium text-[#253439] mb-2">Enviar Trabalho</h4>
                  <p className="text-sm text-[#7c898b] mb-4">
                    Arraste e solte seus arquivos aqui ou clique para selecionar
                  </p>
                  <button className="bg-[#fbb80f] text-white px-6 py-2.5 rounded-lg hover:bg-[#253439] transition-colors">
                    Escolher Arquivo
                  </button>
                </div>
              )}

              {selectedAssignment.status === 'submitted' && (
                <div className="bg-[#253439]/5 border border-[#253439]/20 rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-[#253439]" />
                    <h4 className="font-semibold text-[#253439]">Trabalho Enviado</h4>
                  </div>
                  <p className="text-[#7c898b] mb-3">Seu trabalho foi enviado com sucesso e está aguardando correção.</p>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#7c898b]" />
                    <span className="text-sm text-[#7c898b]">essay_daily_routine.pdf (245 KB)</span>
                  </div>
                </div>
              )}

              {selectedAssignment.status === 'graded' && (
                <>
                  <div className="bg-[#fbb80f]/10 border border-[#fbb80f]/30 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Star className="w-8 h-8 text-[#fbb80f] fill-[#fbb80f]" />
                        <div>
                          <h4 className="font-semibold text-[#253439]">Nota Atribuída</h4>
                          <p className="text-3xl font-bold text-[#253439]">{selectedAssignment.grade}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedAssignment.feedback && (
                    <div className="border border-[#b29e84]/30 rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <MessageSquare className="w-5 h-5 text-[#253439]" />
                        <h4 className="font-semibold text-[#253439]">Feedback do Professor</h4>
                      </div>
                      <p className="text-[#7c898b] leading-relaxed">{selectedAssignment.feedback}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#b29e84]/20 p-12 text-center">
              <FileText className="w-16 h-16 text-[#7c898b] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#253439] mb-2">Selecione uma Tarefa</h3>
              <p className="text-[#7c898b]">Escolha uma tarefa na lista para ver os detalhes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}