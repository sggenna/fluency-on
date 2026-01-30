import { 
  FileText, 
  Download, 
  Headphones, 
  Presentation, 
  BookOpen,
  FolderOpen,
  Search
} from 'lucide-react';
import { useState } from 'react';

export function Materials() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Todos', count: 24 },
    { id: 'books', label: "Student's Book", count: 6 },
    { id: 'homework', label: 'Homework', count: 8 },
    { id: 'audio', label: 'Áudios', count: 5 },
    { id: 'slides', label: 'Slides', count: 5 },
  ];

  const materials = [
    { id: 1, name: "Student's Book - B1 Módulos 1-4.pdf", category: 'books', size: '12.4 MB', date: '2026-01-05', icon: BookOpen, color: 'bg-[#253439]/10 text-[#253439]' },
    { id: 2, name: "Student's Book - B1 Módulos 5-8.pdf", category: 'books', size: '14.2 MB', date: '2026-01-05', icon: BookOpen, color: 'bg-[#253439]/10 text-[#253439]' },
    { id: 3, name: "Student's Homework - B1 Exercícios.pdf", category: 'homework', size: '8.8 MB', date: '2026-01-06', icon: FileText, color: 'bg-[#fbb80f]/10 text-[#fbb80f]' },
    { id: 4, name: 'Apostila de Games - B1.pdf', category: 'homework', size: '6.5 MB', date: '2026-01-06', icon: FileText, color: 'bg-[#fbb80f]/10 text-[#fbb80f]' },
    { id: 5, name: 'Homework - Business English.pdf', category: 'homework', size: '5.2 MB', date: '2026-01-07', icon: FileText, color: 'bg-[#fbb80f]/10 text-[#fbb80f]' },
    { id: 6, name: 'Áudios das Atividades - B1 Complete.zip', category: 'audio', size: '245 MB', date: '2026-01-05', icon: Headphones, color: 'bg-[#b29e84]/20 text-[#b29e84]' },
    { id: 7, name: 'Áudio - Listening Practice Módulo 1-3.zip', category: 'audio', size: '82 MB', date: '2026-01-05', icon: Headphones, color: 'bg-[#b29e84]/20 text-[#b29e84]' },
    { id: 8, name: 'Áudio - Pronunciation Guide.mp3', category: 'audio', size: '28 MB', date: '2026-01-06', icon: Headphones, color: 'bg-[#b29e84]/20 text-[#b29e84]' },
    { id: 9, name: 'Slides das Aulas - Grammar Overview.pdf', category: 'slides', size: '15.8 MB', date: '2026-01-04', icon: Presentation, color: 'bg-[#fbee0f]/20 text-[#fbee0f]' },
    { id: 10, name: 'Slides - Vocabulary Building.pdf', category: 'slides', size: '12.2 MB', date: '2026-01-04', icon: Presentation, color: 'bg-[#fbee0f]/20 text-[#fbee0f]' },
    { id: 11, name: 'Slides - Business English Module 1-4.pdf', category: 'slides', size: '18.1 MB', date: '2026-01-05', icon: Presentation, color: 'bg-[#fbee0f]/20 text-[#fbee0f]' },
    { id: 12, name: "Grammar Reference Guide - B1.pdf", category: 'books', size: '7.6 MB', date: '2026-01-03', icon: BookOpen, color: 'bg-[#253439]/10 text-[#253439]' },
  ];

  const filteredMaterials = materials.filter(material => {
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#253439] mb-2">Materiais</h1>
        <p className="text-[#7c898b]">Acesse todos os materiais do curso em um só lugar</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7c898b] w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar materiais..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbb80f] focus:border-transparent"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-[#fbb80f] text-white'
                : 'bg-white text-[#253439] border border-[#b29e84]/30 hover:bg-[#f6f4f1]'
            }`}
          >
            {category.label}
            <span className={`ml-2 ${
              selectedCategory === category.id ? 'text-white/80' : 'text-[#7c898b]'
            }`}>
              ({category.count})
            </span>
          </button>
        ))}
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => {
          const Icon = material.icon;
          return (
            <div key={material.id} className="bg-white rounded-xl border border-[#b29e84]/20 p-6 hover:shadow-lg transition-all">
              <div className={`w-14 h-14 ${material.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-[#253439] mb-2 line-clamp-2">{material.name}</h3>
              <div className="flex items-center justify-between text-sm text-[#7c898b] mb-4">
                <span>{material.size}</span>
                <span>{new Date(material.date).toLocaleDateString('pt-BR')}</span>
              </div>
              <button className="w-full bg-[#fbb80f] text-white py-2.5 rounded-lg hover:bg-[#253439] transition-colors flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>
          );
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-12 text-center">
          <FolderOpen className="w-16 h-16 text-[#7c898b] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#253439] mb-2">Nenhum material encontrado</h3>
          <p className="text-[#7c898b]">Tente ajustar seus filtros ou termo de busca</p>
        </div>
      )}

      {/* Quick Access Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#253439]/10 to-[#b29e84]/10 border border-[#b29e84]/30 rounded-xl p-6">
          <BookOpen className="w-10 h-10 text-[#253439] mb-3" />
          <h3 className="text-lg font-semibold text-[#253439] mb-2">Student's Book Completo</h3>
          <p className="text-sm text-[#7c898b] mb-4">Baixe todos os PDFs do Student's Book em um único arquivo</p>
          <button className="bg-[#fbb80f] text-white px-4 py-2 rounded-lg hover:bg-[#253439] transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Completo
          </button>
        </div>

        <div className="bg-gradient-to-br from-[#fbb80f]/10 to-[#fbee0f]/10 border border-[#fbb80f]/30 rounded-xl p-6">
          <Headphones className="w-10 h-10 text-[#fbb80f] mb-3" />
          <h3 className="text-lg font-semibold text-[#253439] mb-2">Todos os Áudios</h3>
          <p className="text-sm text-[#7c898b] mb-4">Baixe todos os arquivos de áudio para prática offline</p>
          <button className="bg-[#fbb80f] text-white px-4 py-2 rounded-lg hover:bg-[#253439] transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Completo
          </button>
        </div>
      </div>
    </div>
  );
}