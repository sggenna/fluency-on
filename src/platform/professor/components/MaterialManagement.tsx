import { useRef, useState } from 'react';
import { 
  Upload,
  FileText,
  Headphones,
  Presentation,
  BookOpen,
  Eye,
  Download,
  Trash2,
  Filter,
  Search
} from 'lucide-react';
import { uploadFile, uploadsUrl } from '../../../api/upload';

interface Material {
  id: number;
  name: string;
  category: 'books' | 'homework' | 'audio' | 'slides';
  size: string;
  uploadDate: string;
  downloads: number;
  linkedCourses: string[];
}

export function MaterialManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [materials, setMaterials] = useState<Material[]>([
    {
      id: 1,
      name: "Student's Book - B1 Módulos 1-4.pdf",
      category: 'books',
      size: '12.4 MB',
      uploadDate: '2026-01-05',
      downloads: 48,
      linkedCourses: ['B1 - Intermediate']
    },
    {
      id: 2,
      name: "Student's Homework - B1 Exercícios.pdf",
      category: 'homework',
      size: '8.8 MB',
      uploadDate: '2026-01-06',
      downloads: 45,
      linkedCourses: ['B1 - Intermediate']
    },
    {
      id: 3,
      name: 'Apostila de Games - B1.pdf',
      category: 'homework',
      size: '6.5 MB',
      uploadDate: '2026-01-06',
      downloads: 42,
      linkedCourses: ['B1 - Intermediate']
    },
    {
      id: 4,
      name: 'Áudios das Atividades - B1 Complete.zip',
      category: 'audio',
      size: '245 MB',
      uploadDate: '2026-01-05',
      downloads: 38,
      linkedCourses: ['B1 - Intermediate']
    },
    {
      id: 5,
      name: 'Slides das Aulas - Grammar Overview.pdf',
      category: 'slides',
      size: '15.8 MB',
      uploadDate: '2026-01-04',
      downloads: 52,
      linkedCourses: ['B1 - Intermediate', 'A2 - Elementary']
    },
    {
      id: 6,
      name: 'Business English - Presentation Templates.pdf',
      category: 'slides',
      size: '18.1 MB',
      uploadDate: '2026-01-05',
      downloads: 28,
      linkedCourses: ['Business English']
    },
  ]);

  const inferCategory = (file: File): Material['category'] => {
    const name = file.name.toLowerCase();
    if (name.endsWith('.mp3') || name.endsWith('.wav') || name.endsWith('.zip')) return 'audio';
    if (name.endsWith('.pdf')) return name.includes('homework') || name.includes('exerc') ? 'homework' : 'slides';
    return 'slides';
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploadError(null);
    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const { filename } = await uploadFile(file);
        const fileUrl = uploadsUrl(filename);
        setMaterials(prev => [
          ...prev,
          {
            id: Date.now() + i,
            name: file.name,
            category: inferCategory(file),
            size: formatSize(file.size),
            uploadDate: new Date().toISOString().split('T')[0],
            downloads: 0,
            linkedCourses: []
          }
        ]);
      } catch (e) {
        setUploadError(e instanceof Error ? e.message : 'Falha no upload');
      }
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || material.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'books', label: "Student's Books", icon: BookOpen, color: 'bg-[#253439]/10 text-[#253439]', count: materials.filter(m => m.category === 'books').length },
    { id: 'homework', label: 'Homework & Games', icon: FileText, color: 'bg-[#fbb80f]/10 text-[#fbb80f]', count: materials.filter(m => m.category === 'homework').length },
    { id: 'audio', label: 'Áudios', icon: Headphones, color: 'bg-[#b29e84]/20 text-[#b29e84]', count: materials.filter(m => m.category === 'audio').length },
    { id: 'slides', label: 'Slides', icon: Presentation, color: 'bg-[#fbee0f]/20 text-[#fbee0f]', count: materials.filter(m => m.category === 'slides').length },
  ];


  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'books':
        return { icon: BookOpen, color: 'bg-[#253439]/10 text-[#253439]' };
      case 'homework':
        return { icon: FileText, color: 'bg-[#fbb80f]/10 text-[#fbb80f]' };
      case 'audio':
        return { icon: Headphones, color: 'bg-[#b29e84]/20 text-[#b29e84]' };
      case 'slides':
        return { icon: Presentation, color: 'bg-[#fbee0f]/20 text-[#fbee0f]' };
      default:
        return { icon: FileText, color: 'bg-[#7c898b]/10 text-[#7c898b]' };
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-[#253439] mb-2">Biblioteca de Materiais</h1>
            <p className="text-[#7c898b]">Organize todos os materiais didáticos</p>
          </div>
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setFilterCategory(category.id)}
              className={`bg-white rounded-xl p-6 border-2 transition-all text-left ${
                filterCategory === category.id
                  ? 'border-[#fbb80f] shadow-lg'
                  : 'border-[#b29e84]/20 hover:border-[#b29e84]'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold text-[#253439] mb-1">{category.count}</p>
              <p className="text-sm text-[#7c898b]">{category.label}</p>
            </button>
          );
        })}
      </div>

      {/* Upload Area */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        accept=".pdf,.doc,.docx,.mp3,.wav,.zip,.ppt,.pptx"
        onChange={(e) => handleFileSelect(e.target.files)}
      />
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`mb-8 border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-[#fbb80f] bg-[#fbb80f]/10 scale-105'
            : 'border-[#b29e84]/30 bg-white hover:border-[#fbb80f]/50 hover:bg-[#fbb80f]/5'
        } ${uploading ? 'pointer-events-none opacity-70' : ''}`}
      >
        <div className="max-w-md mx-auto pointer-events-none">
          <div className="w-20 h-20 bg-gradient-to-br from-[#fbb80f] to-[#fbee0f] rounded-full flex items-center justify-center mx-auto mb-6">
            <Upload className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-[#253439] mb-2">
            {uploading ? 'Enviando...' : isDragging ? 'Solte os materiais aqui' : 'Fazer Upload de Materiais'}
          </h3>
          <p className="text-[#7c898b] mb-6">
            Arraste e solte ou clique para selecionar
          </p>
          <button type="button" className="bg-[#fbb80f] text-white px-6 py-3 rounded-lg hover:bg-[#253439] transition-colors font-medium">
            Selecionar Arquivos
          </button>
        </div>
        {uploadError && (
          <p className="mt-4 text-red-600 text-sm pointer-events-none">{uploadError}</p>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
            <input
              type="text"
              placeholder="Buscar materiais..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white appearance-none"
            >
              <option value="all">Todas as Categorias</option>
              <option value="books">Student's Books</option>
              <option value="homework">Homework & Games</option>
              <option value="audio">Áudios</option>
              <option value="slides">Slides</option>
            </select>
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => {
          const { icon: Icon, color } = getCategoryIcon(material.category);
          return (
            <div key={material.id} className="bg-white rounded-xl border border-[#b29e84]/20 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Card Header */}
              <div className={`h-24 ${color.replace('text-', 'bg-').replace('/10', '/20').replace('/20', '/30')} flex items-center justify-center`}>
                <Icon className="w-12 h-12 opacity-50" />
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="font-semibold text-[#253439] mb-3 line-clamp-2">{material.name}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#7c898b]">Tamanho:</span>
                    <span className="font-medium text-[#253439]">{material.size}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#7c898b]">Downloads:</span>
                    <span className="font-medium text-[#253439]">{material.downloads}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#7c898b]">Upload:</span>
                    <span className="font-medium text-[#253439]">
                      {new Date(material.uploadDate).toLocaleDateString('pt-BR')}
                    </span>

                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-[#7c898b] mb-2">Vinculado a:</p>
                  <div className="flex flex-wrap gap-2">
                    {material.linkedCourses.map((course, idx) => (
                      <span key={idx} className="text-xs bg-[#f6f4f1] text-[#253439] px-2 py-1 rounded">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-[#fbb80f] text-white py-2.5 rounded-lg hover:bg-[#253439] transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button className="w-10 h-10 bg-[#f6f4f1] text-[#253439] rounded-lg hover:bg-[#b29e84]/20 transition-colors flex items-center justify-center">
                    <Download className="w-4 h-4" />
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
  );
}
