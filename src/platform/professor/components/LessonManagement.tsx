import { useState } from 'react';
import { 
  Upload,
  Video,
  FileText,
  Headphones,
  Eye,
  Edit,
  Trash2,
  GripVertical,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Download
} from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  course: string;
  type: 'video' | 'pdf' | 'audio';
  duration: string;
  uploadDate: string;
  status: 'published' | 'draft';
  views: number;
  size: string;
}

export function LessonManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [isDragging, setIsDragging] = useState(false);

  const lessons: Lesson[] = [
    {
      id: 1,
      title: 'Welcome & Course Overview',
      course: 'B1 - Intermediate',
      type: 'video',
      duration: '12 min',
      uploadDate: '2026-01-05',
      status: 'published',
      views: 45,
      size: '124 MB'
    },
    {
      id: 2,
      title: 'Present Perfect Tense',
      course: 'B1 - Intermediate',
      type: 'video',
      duration: '24 min',
      uploadDate: '2026-01-04',
      status: 'published',
      views: 38,
      size: '256 MB'
    },
    {
      id: 3,
      title: "Student's Book - Module 1-4",
      course: 'B1 - Intermediate',
      type: 'pdf',
      duration: '-',
      uploadDate: '2026-01-03',
      status: 'published',
      views: 52,
      size: '12.4 MB'
    },
    {
      id: 4,
      title: 'Listening Practice - Dialogues',
      course: 'Conversation 1',
      type: 'audio',
      duration: '18 min',
      uploadDate: '2026-01-02',
      status: 'published',
      views: 31,
      size: '28 MB'
    },
    {
      id: 5,
      title: 'Business Email Templates',
      course: 'Business English',
      type: 'pdf',
      duration: '-',
      uploadDate: '2026-01-01',
      status: 'draft',
      views: 0,
      size: '5.2 MB'
    },
  ];

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = filterCourse === 'all' || lesson.course === filterCourse;
    const matchesType = filterType === 'all' || lesson.type === filterType;
    return matchesSearch && matchesCourse && matchesType;
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file upload logic here
    const files = Array.from(e.dataTransfer.files);
    console.log('Files dropped:', files);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return { icon: Video, color: 'bg-[#fbb80f]/10 text-[#fbb80f]' };
      case 'pdf':
        return { icon: FileText, color: 'bg-[#253439]/10 text-[#253439]' };
      case 'audio':
        return { icon: Headphones, color: 'bg-[#b29e84]/20 text-[#b29e84]' };
      default:
        return { icon: FileText, color: 'bg-[#7c898b]/10 text-[#7c898b]' };
    }
  };

  const stats = [
    { label: 'Total de Lições', value: lessons.length, icon: Video, color: 'bg-[#253439]/10 text-[#253439]' },
    { label: 'Publicadas', value: lessons.filter(l => l.status === 'published').length, icon: CheckCircle2, color: 'bg-[#fbb80f]/10 text-[#fbb80f]' },
    { label: 'Total de Views', value: lessons.reduce((acc, l) => acc + l.views, 0), icon: Eye, color: 'bg-[#fbee0f]/20 text-[#fbee0f]' },
    { label: 'Rascunhos', value: lessons.filter(l => l.status === 'draft').length, icon: Clock, color: 'bg-[#b29e84]/20 text-[#b29e84]' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-[#253439] mb-2">Gestão de Lições</h1>
            <p className="text-[#7c898b]">Faça upload e organize materiais de aula</p>
          </div>
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

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`mb-8 border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
          isDragging
            ? 'border-[#fbb80f] bg-[#fbb80f]/10 scale-105'
            : 'border-[#b29e84]/30 bg-white hover:border-[#fbb80f]/50 hover:bg-[#fbb80f]/5'
        }`}
      >
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-[#fbb80f] to-[#fbee0f] rounded-full flex items-center justify-center mx-auto mb-6">
            <Upload className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-[#253439] mb-2">
            {isDragging ? 'Solte os arquivos aqui' : 'Arraste e solte seus arquivos'}
          </h3>
          <p className="text-[#7c898b] mb-6">
            ou clique para selecionar
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-[#7c898b] mb-4">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span>Vídeos (MP4, MOV)</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>PDFs</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4" />
              <span>Áudios (MP3)</span>
            </div>
          </div>
          <button className="bg-[#fbb80f] text-white px-6 py-3 rounded-lg hover:bg-[#253439] transition-colors font-medium">
            Selecionar Arquivos
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
            <input
              type="text"
              placeholder="Buscar lições..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white appearance-none"
            >
              <option value="all">Todos os Cursos</option>
              <option value="B1 - Intermediate">B1 - Intermediate</option>
              <option value="Conversation 1">Conversation 1</option>
              <option value="Business English">Business English</option>
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white appearance-none"
            >
              <option value="all">Todos os Tipos</option>
              <option value="video">Vídeos</option>
              <option value="pdf">PDFs</option>
              <option value="audio">Áudios</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="bg-white rounded-xl border border-[#b29e84]/20 overflow-hidden">
        <div className="p-4 border-b border-[#b29e84]/20 bg-[#f6f4f1]">
          <h2 className="font-semibold text-[#253439]">Lições ({filteredLessons.length})</h2>
        </div>

        <div className="divide-y divide-[#b29e84]/20">
          {filteredLessons.map((lesson) => {
            const { icon: Icon, color } = getTypeIcon(lesson.type);
            return (
              <div
                key={lesson.id}
                className="p-6 hover:bg-[#f6f4f1] transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                    <GripVertical className="w-5 h-5 text-[#7c898b]" />
                  </button>

                  <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[#253439]">{lesson.title}</h3>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        lesson.status === 'published'
                          ? 'bg-[#fbb80f]/20 text-[#fbb80f]'
                          : 'bg-[#7c898b]/20 text-[#7c898b]'
                      }`}>
                        {lesson.status === 'published' ? 'Publicado' : 'Rascunho'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#7c898b]">
                      <span>{lesson.course}</span>
                      <span>•</span>
                      <span>{lesson.type.toUpperCase()}</span>
                      {lesson.duration !== '-' && (
                        <>
                          <span>•</span>
                          <span>{lesson.duration}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{lesson.size}</span>
                      <span>•</span>
                      <span>{lesson.views} views</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 bg-[#f6f4f1] text-[#253439] rounded-lg hover:bg-[#fbb80f]/20 hover:text-[#fbb80f] transition-colors flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 bg-[#f6f4f1] text-[#253439] rounded-lg hover:bg-[#b29e84]/20 transition-colors flex items-center justify-center">
                      <Download className="w-4 h-4" />
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
