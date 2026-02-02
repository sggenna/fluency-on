import { useState } from 'react';
import { 
  Plus,
  Search,
  BookOpen,
  Users,
  Video,
  Clock,
  Edit,
  Eye,
  MoreVertical,
  TrendingUp,
  Calendar,
  ArrowLeft,
  X,
  FileText,
  GraduationCap
} from 'lucide-react';

interface Course {
  id: number;
  title: string;
  level: string;
  description: string;
  students: number;
  lessons: number;
  duration: string;
  status: 'active' | 'draft';
  thumbnail: string;
  color: string;
}

const COURSE_COLORS = ['from-[#b29e84] to-[#7c898b]', 'from-[#7c898b] to-[#253439]', 'from-[#fbb80f] to-[#fbee0f]', 'from-[#fbee0f] to-[#fbb80f]', 'from-[#253439] to-[#7c898b]', 'from-[#fbb80f] to-[#253439]', 'from-[#b29e84] to-[#fbb80f]'];

export function CourseManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({ title: '', level: 'A1', description: '', duration: '12h', status: 'active' as const });

  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: 'A1 - Beginner',
      level: 'A1',
      description: 'Curso inicial para estudantes que estão começando no inglês',
      students: 12,
      lessons: 24,
      duration: '12h',
      status: 'active',
      thumbnail: '',
      color: 'from-[#b29e84] to-[#7c898b]'
    },
    {
      id: 2,
      title: 'A2 - Elementary',
      level: 'A2',
      description: 'Desenvolvimento de habilidades básicas de comunicação',
      students: 10,
      lessons: 28,
      duration: '14h',
      status: 'active',
      thumbnail: '',
      color: 'from-[#7c898b] to-[#253439]'
    },
    {
      id: 3,
      title: 'B1 - Intermediate',
      level: 'B1',
      description: 'Aprimoramento de fluência e confiança no idioma',
      students: 15,
      lessons: 32,
      duration: '16h',
      status: 'active',
      thumbnail: '',
      color: 'from-[#fbb80f] to-[#fbee0f]'
    },
    {
      id: 4,
      title: 'B2-C1 - Advanced',
      level: 'B2',
      description: 'Alcance fluência avançada e domínio completo',
      students: 8,
      lessons: 36,
      duration: '18h',
      status: 'active',
      thumbnail: '',
      color: 'from-[#fbee0f] to-[#fbb80f]'
    },
    {
      id: 5,
      title: 'Conversation 1',
      level: 'Conv',
      description: 'Prática de conversação em situações cotidianas',
      students: 18,
      lessons: 20,
      duration: '10h',
      status: 'active',
      thumbnail: '',
      color: 'from-[#253439] to-[#7c898b]'
    },
    {
      id: 6,
      title: 'Business English',
      level: 'Business',
      description: 'Inglês profissional para o ambiente corporativo',
      students: 10,
      lessons: 24,
      duration: '12h',
      status: 'active',
      thumbnail: '',
      color: 'from-[#fbb80f] to-[#253439]'
    },
    {
      id: 7,
      title: 'Travel English',
      level: 'Special',
      description: 'Prepare-se para viajar com confiança',
      students: 5,
      lessons: 16,
      duration: '8h',
      status: 'draft',
      thumbnail: '',
      color: 'from-[#b29e84] to-[#fbb80f]'
    },
  ]);

  const handleCreateCourse = () => {
    if (!createForm.title.trim()) return;
    const color = COURSE_COLORS[courses.length % COURSE_COLORS.length];
    setCourses(prev => [...prev, {
      id: Date.now(),
      title: createForm.title.trim(),
      level: createForm.level,
      description: createForm.description.trim() || '-',
      students: 0,
      lessons: 0,
      duration: createForm.duration,
      status: createForm.status,
      thumbnail: '',
      color
    }]);
    setShowCreateModal(false);
    setCreateForm({ title: '', level: 'A1', description: '', duration: '12h', status: 'active' });
  };

  const openCourseDetail = (course: Course) => {
    setSelectedCourse(course);
    setViewMode('detail');
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const stats = [
    { label: 'Total de Cursos', value: courses.length, icon: BookOpen, color: 'bg-[#253439]/10 text-[#253439]' },
    { label: 'Cursos Ativos', value: courses.filter(c => c.status === 'active').length, icon: TrendingUp, color: 'bg-[#fbb80f]/10 text-[#fbb80f]' },
    { label: 'Total de Lições', value: courses.reduce((acc, c) => acc + c.lessons, 0), icon: Video, color: 'bg-[#fbee0f]/20 text-[#fbee0f]' },
    { label: 'Total de Alunos', value: courses.reduce((acc, c) => acc + c.students, 0), icon: Users, color: 'bg-[#b29e84]/20 text-[#b29e84]' },
  ];

  return (
    <div className="p-8">
      {viewMode === 'list' && (
        <>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-[#253439] mb-2">Gestão de Cursos</h1>
            <p className="text-[#7c898b]">Organize e gerencie todos os seus cursos</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#fbb80f] text-white px-6 py-3 rounded-lg hover:bg-[#253439] transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Criar Novo Curso
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
      <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
            <input
              type="text"
              placeholder="Buscar cursos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
            />
          </div>
          
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white"
          >
            <option value="all">Todos os Níveis</option>
            <option value="A1">A1 - Beginner</option>
            <option value="A2">A2 - Elementary</option>
            <option value="B1">B1 - Intermediate</option>
            <option value="B2">B2-C1 - Advanced</option>
            <option value="Conv">Conversation</option>
            <option value="Business">Business</option>
            <option value="Special">Special Courses</option>
          </select>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl border border-[#b29e84]/20 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Card Header */}
            <div className={`h-32 bg-gradient-to-br ${course.color} relative p-6 flex items-center justify-center`}>
              <BookOpen className="w-16 h-16 text-white/20 absolute" />
              <div className="absolute top-4 right-4 flex gap-2">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  course.status === 'active'
                    ? 'bg-white/20 text-white backdrop-blur-sm'
                    : 'bg-white text-[#7c898b]'
                }`}>
                  {course.status === 'active' ? 'Ativo' : 'Rascunho'}
                </span>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="text-xs font-semibold text-white/80 bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                  {course.level}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#253439] mb-2">{course.title}</h3>
              <p className="text-sm text-[#7c898b] mb-4 line-clamp-2">{course.description}</p>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-[#f6f4f1] rounded-lg">
                  <Users className="w-5 h-5 text-[#fbb80f] mx-auto mb-1" />
                  <p className="text-lg font-bold text-[#253439]">{course.students}</p>
                  <p className="text-xs text-[#7c898b]">Alunos</p>
                </div>
                <div className="text-center p-3 bg-[#f6f4f1] rounded-lg">
                  <Video className="w-5 h-5 text-[#fbee0f] mx-auto mb-1" />
                  <p className="text-lg font-bold text-[#253439]">{course.lessons}</p>
                  <p className="text-xs text-[#7c898b]">Lições</p>
                </div>
                <div className="text-center p-3 bg-[#f6f4f1] rounded-lg">
                  <Clock className="w-5 h-5 text-[#b29e84] mx-auto mb-1" />
                  <p className="text-lg font-bold text-[#253439]">{course.duration}</p>
                  <p className="text-xs text-[#7c898b]">Duração</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openCourseDetail(course)}
                  className="flex-1 bg-[#fbb80f] text-white py-2.5 rounded-lg hover:bg-[#253439] transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                  Ver Detalhes
                </button>
                <button className="w-10 h-10 bg-[#f6f4f1] text-[#253439] rounded-lg hover:bg-[#b29e84]/20 transition-colors flex items-center justify-center">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 bg-[#f6f4f1] text-[#253439] rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
        </>
      )}

      {/* Course Detail Page */}
      {viewMode === 'detail' && selectedCourse && (
        <div className="p-8">
          <button
            onClick={() => { setViewMode('list'); setSelectedCourse(null); }}
            className="flex items-center gap-2 text-[#7c898b] hover:text-[#253439] mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar aos cursos
          </button>
          <div className={`rounded-2xl bg-gradient-to-br ${selectedCourse.color} p-8 mb-8 text-white`}>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">{selectedCourse.title}</h1>
                <p className="opacity-90 text-sm mb-4 max-w-2xl">{selectedCourse.description}</p>
                <div className="flex gap-4 text-sm">
                  <span>Nível: {selectedCourse.level}</span>
                  <span>•</span>
                  <span>{selectedCourse.lessons} lições</span>
                  <span>•</span>
                  <span>{selectedCourse.students} alunos</span>
                  <span>•</span>
                  <span>{selectedCourse.duration}</span>
                </div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${selectedCourse.status === 'active' ? 'bg-white/20' : 'bg-white/10'}`}>
                {selectedCourse.status === 'active' ? 'Ativo' : 'Rascunho'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Aulas (Classes) */}
            <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
              <h2 className="font-semibold text-[#253439] mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#fbb80f]" />
                Aulas deste curso
              </h2>
              <ul className="space-y-2 text-sm text-[#7c898b]">
                <li className="flex justify-between p-3 bg-[#f6f4f1] rounded-lg">
                  <span>Segunda 19:00 – Grammar Review</span>
                  <span className="text-[#253439] font-medium">Meet</span>
                </li>
                <li className="flex justify-between p-3 bg-[#f6f4f1] rounded-lg">
                  <span>Quarta 19:00 – Conversation</span>
                  <span className="text-[#253439] font-medium">Meet</span>
                </li>
              </ul>
            </div>

            {/* Lições */}
            <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
              <h2 className="font-semibold text-[#253439] mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-[#fbb80f]" />
                Lições
              </h2>
              <ul className="space-y-2 text-sm">
                {['Welcome & Overview', 'Present Simple', 'Present Continuous', 'Past Simple'].slice(0, selectedCourse.lessons || 4).map((title, i) => (
                  <li key={i} className="flex items-center gap-2 p-3 bg-[#f6f4f1] rounded-lg text-[#253439]">
                    <Video className="w-4 h-4 text-[#7c898b]" />
                    {title}
                  </li>
                ))}
              </ul>
            </div>

            {/* Materiais */}
            <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
              <h2 className="font-semibold text-[#253439] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#fbb80f]" />
                Materiais
              </h2>
              <ul className="space-y-2 text-sm text-[#7c898b]">
                <li className="p-3 bg-[#f6f4f1] rounded-lg">Student&apos;s Book - Módulos 1-4.pdf</li>
                <li className="p-3 bg-[#f6f4f1] rounded-lg">Slides das Aulas.pdf</li>
                <li className="p-3 bg-[#f6f4f1] rounded-lg">Áudios das Atividades.zip</li>
              </ul>
            </div>

            {/* Alunos */}
            <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
              <h2 className="font-semibold text-[#253439] mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#fbb80f]" />
                Alunos ({selectedCourse.students})
              </h2>
              <ul className="space-y-2 text-sm">
                {['Ana Maria Santos', 'Carlos Eduardo', 'Mariana Costa', 'Pedro Henrique'].slice(0, Math.max(1, selectedCourse.students)).map((name, i) => (
                  <li key={i} className="flex items-center gap-2 p-3 bg-[#f6f4f1] rounded-lg text-[#253439]">
                    <div className="w-8 h-8 rounded-full bg-[#253439]/10 flex items-center justify-center text-xs font-semibold">
                      {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCreateModal(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#253439]">Criar Novo Curso</h2>
              <button type="button" onClick={() => setShowCreateModal(false)} className="p-2 rounded-lg hover:bg-[#f6f4f1]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#253439] mb-1">Título *</label>
                <input
                  type="text"
                  value={createForm.title}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: A1 - Beginner"
                  className="w-full px-4 py-2 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#253439] mb-1">Nível</label>
                <select
                  value={createForm.level}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, level: e.target.value }))}
                  className="w-full px-4 py-2 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white"
                >
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="Conv">Conv</option>
                  <option value="Business">Business</option>
                  <option value="Special">Special</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#253439] mb-1">Descrição</label>
                <textarea
                  value={createForm.description}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição do curso..."
                  rows={3}
                  className="w-full px-4 py-2 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#253439] mb-1">Duração</label>
                  <input
                    type="text"
                    value={createForm.duration}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="12h"
                    className="w-full px-4 py-2 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#253439] mb-1">Status</label>
                  <select
                    value={createForm.status}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, status: e.target.value as 'active' | 'draft' }))}
                    className="w-full px-4 py-2 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white"
                  >
                    <option value="active">Ativo</option>
                    <option value="draft">Rascunho</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 py-2.5 rounded-lg border border-[#b29e84]/30 text-[#253439] font-medium">
                Cancelar
              </button>
              <button type="button" onClick={handleCreateCourse} className="flex-1 py-2.5 rounded-lg bg-[#fbb80f] text-white font-medium hover:bg-[#253439]">
                Criar Curso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
