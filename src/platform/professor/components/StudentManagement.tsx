import { useState, useEffect, useCallback } from 'react';
import { 
  Search,
  Filter,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  Users,
  TrendingUp,
  X
} from 'lucide-react';
import { AddStudentWizard } from './AddStudentWizard';
import { studentsApi, type Student as ApiStudent } from '../../../api/students';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  level: string;
  courses: string[];
  enrollmentDate: string;
  status: 'active' | 'inactive';
  progress: number;
  avatar?: string;
}

function mapApiStudent(s: ApiStudent): Student {
  const firstEnrollment = s.enrollments?.[0];
  return {
    id: s.id,
    name: s.name,
    email: s.email,
    phone: s.phone ?? '',
    level: s.level ?? '—',
    courses: (s.enrollments ?? []).map((e) => e.courseTitle),
    enrollmentDate: firstEnrollment ? new Date(firstEnrollment.enrolledAt).toISOString().slice(0, 10) : '—',
    status: (s.enrollments?.length ?? 0) > 0 ? 'active' : 'inactive',
    progress: 0,
  };
}

export function StudentManagement() {
  const [showAddWizard, setShowAddWizard] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStudents = useCallback(async () => {
    try {
      setError(null);
      const list = await studentsApi.list();
      setStudents(list.map(mapApiStudent));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar alunos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const handleDeleteStudent = async (id: string) => {
    try {
      await studentsApi.delete(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      setShowDeleteConfirm(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao excluir');
    }
  };

  const handleToggleStatus = (id: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s
      )
    );
  };

  const handleStudentAdded = () => {
    setShowAddWizard(false);
    loadStudents();
  };

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-[#7c898b]">Carregando alunos...</p>
      </div>
    );
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === 'all' || student.level === filterLevel;
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const avgProgress = students.length ? Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length) : 0;
  const stats = [
    { label: 'Total de Alunos', value: String(students.length), icon: Users, color: 'bg-[#253439]/10 text-[#253439]' },
    { label: 'Alunos Ativos', value: String(students.filter(s => s.status === 'active').length), icon: CheckCircle2, color: 'bg-[#fbb80f]/10 text-[#fbb80f]' },
    { label: 'Média de Progresso', value: `${avgProgress}%`, icon: TrendingUp, color: 'bg-[#fbee0f]/20 text-[#fbee0f]' },
    { label: 'Novos Este Mês', value: '—', icon: UserPlus, color: 'bg-[#b29e84]/20 text-[#b29e84]' },
  ];

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      'A1': 'bg-[#b29e84]/20 text-[#b29e84] border-[#b29e84]/30',
      'A2': 'bg-[#7c898b]/20 text-[#7c898b] border-[#7c898b]/30',
      'B1': 'bg-[#fbb80f]/20 text-[#fbb80f] border-[#fbb80f]/30',
      'B2': 'bg-[#fbee0f]/20 text-[#fbee0f] border-[#fbee0f]/30',
      'C1': 'bg-[#253439]/20 text-[#253439] border-[#253439]/30',
    };
    return colors[level] || colors['A1'];
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
            {error}
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-[#253439] mb-2">Gestão de Alunos</h1>
            <p className="text-[#7c898b]">Gerencie todos os seus estudantes</p>
          </div>
          <button
            onClick={() => setShowAddWizard(true)}
            className="bg-[#fbb80f] text-white px-6 py-3 rounded-lg hover:bg-[#253439] transition-colors flex items-center gap-2 font-medium"
          >
            <UserPlus className="w-5 h-5" />
            Adicionar Aluno
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

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#b29e84]/20 p-4 sm:p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white appearance-none"
            >
              <option value="all">Todos os Níveis</option>
              <option value="A1">A1 - Beginner</option>
              <option value="A2">A2 - Elementary</option>
              <option value="B1">B1 - Intermediate</option>
              <option value="B2">B2 - Upper Intermediate</option>
              <option value="C1">C1 - Advanced</option>
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white appearance-none"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-xl border border-[#b29e84]/20 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Card Header */}
            <div className={`h-24 bg-gradient-to-br ${student.status === 'active' ? 'from-[#fbb80f] to-[#fbee0f]' : 'from-[#b29e84] to-[#7c898b]'} relative`}>
              <div className="absolute -bottom-8 left-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#253439] to-[#7c898b] rounded-full flex items-center justify-center text-white font-bold text-xl border-4 border-white">
                  {student.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <div className="relative group">
                  <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                    <MoreVertical className="w-5 h-5 text-white" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-[#b29e84]/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                    <button 
                      onClick={() => setSelectedStudent(student)}
                      className="w-full px-4 py-2 text-left text-sm text-[#253439] hover:bg-[#f6f4f1] flex items-center gap-2 rounded-t-lg"
                    >
                      <Eye className="w-4 h-4" />
                      Ver Detalhes
                    </button>
                    <button 
                      onClick={() => handleToggleStatus(student.id)}
                      className="w-full px-4 py-2 text-left text-sm text-[#253439] hover:bg-[#f6f4f1] flex items-center gap-2"
                    >
                      {student.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                      {student.status === 'active' ? 'Desativar' : 'Ativar'}
                    </button>
                    <button 
                      onClick={() => setShowDeleteConfirm(student)}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-b-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="pt-10 px-6 pb-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#253439] mb-1">{student.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded border ${getLevelColor(student.level)}`}>
                    {student.level}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    student.status === 'active' 
                      ? 'bg-[#fbb80f]/20 text-[#fbb80f]' 
                      : 'bg-[#7c898b]/20 text-[#7c898b]'
                  }`}>
                    {student.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-[#7c898b]">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{student.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#7c898b]">
                  <Phone className="w-4 h-4" />
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#7c898b]">
                  <Calendar className="w-4 h-4" />
                  <span>Matrícula: {new Date(student.enrollmentDate).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-[#7c898b]" />
                  <span className="text-sm text-[#7c898b]">Cursos inscritos:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {student.courses.map((course, idx) => (
                    <span key={idx} className="text-xs bg-[#f6f4f1] text-[#253439] px-2 py-1 rounded">
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#7c898b]">Progresso Geral</span>
                  <span className="text-sm font-semibold text-[#253439]">{student.progress}%</span>
                </div>
                <div className="w-full bg-[#b29e84]/20 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-[#fbb80f] to-[#fbee0f]"
                    style={{ width: `${student.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedStudent(student)}
                  className="flex-1 bg-[#fbb80f] text-white py-2 rounded-lg hover:bg-[#253439] transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                  Ver Perfil
                </button>
                <button 
                  onClick={() => handleToggleStatus(student.id)}
                  className="w-10 h-10 bg-[#f6f4f1] text-[#253439] rounded-lg hover:bg-[#b29e84]/20 transition-colors flex items-center justify-center"
                  title={student.status === 'active' ? 'Desativar' : 'Ativar'}
                >
                  {student.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(student)}
                  className="w-10 h-10 bg-[#f6f4f1] text-[#253439] rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Student Wizard Modal */}
      {showAddWizard && (
        <AddStudentWizard
          onClose={() => setShowAddWizard(false)}
          onSuccess={handleStudentAdded}
        />
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className={`bg-gradient-to-r ${selectedStudent.status === 'active' ? 'from-[#fbb80f] to-[#fbee0f]' : 'from-[#b29e84] to-[#7c898b]'} p-6 text-white relative`}>
              <button
                onClick={() => setSelectedStudent(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-2xl border-4 border-white/30">
                  {selectedStudent.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">{selectedStudent.name}</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {selectedStudent.level}
                    </span>
                    <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {selectedStudent.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#253439] mb-3">Informações de Contato</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-[#f6f4f1] rounded-lg">
                      <Mail className="w-5 h-5 text-[#7c898b]" />
                      <div>
                        <p className="text-xs text-[#7c898b]">Email</p>
                        <p className="text-sm font-medium text-[#253439]">{selectedStudent.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#f6f4f1] rounded-lg">
                      <Phone className="w-5 h-5 text-[#7c898b]" />
                      <div>
                        <p className="text-xs text-[#7c898b]">Telefone</p>
                        <p className="text-sm font-medium text-[#253439]">{selectedStudent.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#f6f4f1] rounded-lg">
                      <Calendar className="w-5 h-5 text-[#7c898b]" />
                      <div>
                        <p className="text-xs text-[#7c898b]">Data de Matrícula</p>
                        <p className="text-sm font-medium text-[#253439]">{new Date(selectedStudent.enrollmentDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#253439] mb-3">Cursos Inscritos</h3>
                  <div className="space-y-2">
                    {selectedStudent.courses.map((course, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-[#f6f4f1] rounded-lg">
                        <BookOpen className="w-5 h-5 text-[#fbb80f]" />
                        <span className="text-sm font-medium text-[#253439]">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#253439] mb-3">Progresso Geral</h3>
                  <div className="p-4 bg-gradient-to-br from-[#fbb80f]/10 to-[#fbee0f]/10 rounded-lg border border-[#fbb80f]/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#7c898b]">Conclusão Total</span>
                      <span className="text-2xl font-bold text-[#253439]">{selectedStudent.progress}%</span>
                    </div>
                    <div className="w-full bg-[#b29e84]/20 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full bg-gradient-to-r from-[#fbb80f] to-[#fbee0f]"
                        style={{ width: `${selectedStudent.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#b29e84]/20 p-4 bg-[#f6f4f1] flex gap-3">
              <button
                onClick={() => {
                  handleToggleStatus(selectedStudent.id);
                  setSelectedStudent({...selectedStudent, status: selectedStudent.status === 'active' ? 'inactive' : 'active'});
                }}
                className="flex-1 bg-white text-[#253439] px-4 py-2.5 rounded-lg hover:bg-[#b29e84]/20 transition-colors font-medium flex items-center justify-center gap-2"
              >
                {selectedStudent.status === 'active' ? <XCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                {selectedStudent.status === 'active' ? 'Desativar Aluno' : 'Ativar Aluno'}
              </button>
              <button
                onClick={() => setSelectedStudent(null)}
                className="flex-1 bg-[#fbb80f] text-white px-4 py-2.5 rounded-lg hover:bg-[#253439] transition-colors font-medium"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-[#253439] text-center mb-2">Excluir Aluno</h3>
            <p className="text-[#7c898b] text-center mb-6">
              Tem certeza que deseja excluir <strong>{showDeleteConfirm.name}</strong>? Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 bg-[#f6f4f1] text-[#253439] px-4 py-2.5 rounded-lg hover:bg-[#b29e84]/20 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteStudent(showDeleteConfirm.id)}
                className="flex-1 bg-red-600 text-white px-4 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}