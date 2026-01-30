import { useState } from 'react';
import { 
  Plus,
  Search,
  BookOpen,
  Users,
  Video,
  Clock,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  FileText,
  TrendingUp
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

export function CourseManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');

  const courses: Course[] = [
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
  ];

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
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-[#253439] mb-2">Gestão de Cursos</h1>
            <p className="text-[#7c898b]">Organize e gerencie todos os seus cursos</p>
          </div>
          <button className="bg-[#fbb80f] text-white px-6 py-3 rounded-lg hover:bg-[#253439] transition-colors flex items-center gap-2 font-medium">
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
                <button className="flex-1 bg-[#fbb80f] text-white py-2.5 rounded-lg hover:bg-[#253439] transition-colors flex items-center justify-center gap-2 text-sm font-medium">
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
    </div>
  );
}
