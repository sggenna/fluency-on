import { useRef, useState } from 'react';
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
  Download,
  X
} from 'lucide-react';
import { uploadFile, uploadsUrl } from '../../../api/upload';

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
  videoUrl?: string;
}

const COURSES = ['B1 - Intermediate', 'Conversation 1', 'Business English', 'A1 - Beginner', 'A2 - Elementary'];

export function LessonManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [isDragging, setIsDragging] = useState(false);
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonCourse, setNewLessonCourse] = useState(COURSES[0]);
  const [newLessonFile, setNewLessonFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const lessonFileRef = useRef<HTMLInputElement>(null);

  const [lessons, setLessons] = useState<Lesson[]>([
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
  ]);

  const inferLessonType = (file: File): Lesson['type'] => {
    const name = file.name.toLowerCase();
    if (name.endsWith('.mp4') || name.endsWith('.mov') || name.endsWith('.webm')) return 'video';
    if (name.endsWith('.mp3') || name.endsWith('.wav')) return 'audio';
    return 'pdf';
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleAddLessonSubmit = async () => {
    if (!newLessonTitle.trim() || !newLessonFile) return;
    setUploadError(null);
    setUploading(true);
    try {
      const { filename } = await uploadFile(newLessonFile);
      const fileUrl = uploadsUrl(filename);
      const type = inferLessonType(newLessonFile);
      setLessons(prev => [
        ...prev,
        {
          id: Date.now(),
          title: newLessonTitle.trim(),
          course: newLessonCourse,
          type,
          duration: type === 'video' || type === 'audio' ? '–' : '-',
          uploadDate: new Date().toISOString().split('T')[0],
          status: 'published',
          views: 0,
          size: formatSize(newLessonFile.size),
          videoUrl: fileUrl
        }
      ]);
      setShowAddLesson(false);
      setNewLessonTitle('');
      setNewLessonCourse(COURSES[0]);
      setNewLessonFile(null);
      if (lessonFileRef.current) lessonFileRef.current.value = '';
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Falha no upload');
    }
    setUploading(false);
  };

  const handleDropOrSelect = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const { filename } = await uploadFile(file);
      const fileUrl = uploadsUrl(filename);
      const type = inferLessonType(file);
      const title = file.name.replace(/\.[^/.]+$/, '');
      setLessons(prev => [
        ...prev,
        {
          id: Date.now(),
          title: title || file.name,
          course: COURSES[0],
          type,
          duration: '-',
          uploadDate: new Date().toISOString().split('T')[0],
          status: 'published',
          views: 0,
          size: formatSize(file.size),
          videoUrl: fileUrl
        }
      ]);
      if (lessonFileRef.current) lessonFileRef.current.value = '';
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Falha no upload');
    }
    setUploading(false);
  };

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

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleDropOrSelect(e.dataTransfer.files);
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
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#253439] mb-2">Gestão de Lições</h1>
            <p className="text-[#7c898b]">Faça upload e organize materiais de aula (aulas gravadas)</p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddLesson(true)}
            className="bg-[#fbb80f] text-white p-3 sm:px-6 sm:py-3 rounded-lg hover:bg-[#253439] transition-colors flex items-center justify-center gap-2 font-medium min-h-[44px] min-w-[44px] sm:min-w-0"
            aria-label="Nova Lição"
          >
            <Plus className="w-5 h-5 flex-shrink-0" />
            <span className="hidden sm:inline">Nova Lição</span>
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

      {/* Upload Area - quick add by drop/select */}
      <input
        ref={lessonFileRef}
        type="file"
        className="hidden"
        accept=".mp4,.mov,.webm,.pdf,.mp3,.wav"
        onChange={(e) => handleDropOrSelect(e.target.files)}
      />
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => lessonFileRef.current?.click()}
        className={`mb-8 border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
          isDragging ? 'border-[#fbb80f] bg-[#fbb80f]/10 scale-105' : 'border-[#b29e84]/30 bg-white hover:border-[#fbb80f]/50 hover:bg-[#fbb80f]/5'
        } ${uploading ? 'pointer-events-none opacity-70' : ''}`}
      >
        <div className="max-w-md mx-auto pointer-events-none">
          <div className="w-20 h-20 bg-gradient-to-br from-[#fbb80f] to-[#fbee0f] rounded-full flex items-center justify-center mx-auto mb-6">
            <Upload className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-[#253439] mb-2">
            {uploading ? 'Enviando...' : isDragging ? 'Solte os arquivos aqui' : 'Aulas gravadas: arraste ou clique'}
          </h3>
          <p className="text-[#7c898b] mb-6">Vídeos (MP4, MOV), PDFs, Áudios (MP3)</p>
          <button type="button" className="bg-[#fbb80f] text-white px-6 py-3 rounded-lg hover:bg-[#253439] transition-colors font-medium">
            Selecionar Arquivo
          </button>
        </div>
        {uploadError && <p className="mt-4 text-red-600 text-sm pointer-events-none">{uploadError}</p>}
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

      {/* Nova Lição modal */}
      {showAddLesson && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddLesson(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#253439]">Nova lição (aula gravada)</h2>
              <button type="button" onClick={() => setShowAddLesson(false)} className="p-2 rounded-lg hover:bg-[#f6f4f1]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#253439] mb-1">Título</label>
                <input
                  type="text"
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  placeholder="Ex: Present Perfect - Parte 1"
                  className="w-full px-4 py-2 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#253439] mb-1">Curso</label>
                <select
                  value={newLessonCourse}
                  onChange={(e) => setNewLessonCourse(e.target.value)}
                  className="w-full px-4 py-2 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white"
                >
                  {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#253439] mb-1">Arquivo (vídeo, PDF ou áudio)</label>
                <input
                  type="file"
                  ref={lessonFileRef}
                  accept=".mp4,.mov,.webm,.pdf,.mp3,.wav"
                  onChange={(e) => setNewLessonFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-2 border border-[#b29e84]/30 rounded-lg text-[#253439] text-sm"
                />
                {newLessonFile && <p className="text-sm text-[#7c898b] mt-1">{newLessonFile.name}</p>}
              </div>
              {uploadError && <p className="text-red-600 text-sm">{uploadError}</p>}
            </div>
            <div className="flex gap-2 mt-6">
              <button type="button" onClick={() => setShowAddLesson(false)} className="flex-1 py-2.5 rounded-lg border border-[#b29e84]/30 text-[#253439] font-medium">
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAddLessonSubmit}
                disabled={!newLessonTitle.trim() || !newLessonFile || uploading}
                className="flex-1 py-2.5 rounded-lg bg-[#fbb80f] text-white font-medium hover:bg-[#253439] disabled:opacity-50 disabled:pointer-events-none"
              >
                {uploading ? 'Enviando...' : 'Publicar lição'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
