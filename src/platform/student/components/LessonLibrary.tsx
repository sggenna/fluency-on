import { useState, useEffect } from 'react';
import { 
  Play, 
  Download, 
  CheckCircle, 
  Circle, 
  FileText, 
  Headphones, 
  Presentation,
  ChevronRight,
  ChevronDown,
  Star,
  Lock
} from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  videoUrl?: string;
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
  progress: number;
}

interface CourseOption {
  id: string;
  title: string;
  level: string;
}

const ENROLLED_COURSES: CourseOption[] = [
  { id: 'b1', title: 'B1 - Intermediate', level: 'B1' },
  { id: 'a1', title: 'A1 - Beginner', level: 'A1' },
  { id: 'business', title: 'Business English', level: 'Business' },
  { id: 'conv1', title: 'Conversation 1', level: 'Conv. 1' },
];

interface LessonLibraryProps {
  initialCourseId?: string | null;
}

export function LessonLibrary({ initialCourseId }: LessonLibraryProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    () => ENROLLED_COURSES.find(c => c.id === (initialCourseId ?? ''))?.id ?? ENROLLED_COURSES[0]?.id ?? ''
  );

  useEffect(() => {
    if (initialCourseId != null && ENROLLED_COURSES.some(c => c.id === initialCourseId)) {
      setSelectedCourseId(initialCourseId);
    }
  }, [initialCourseId]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);
  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: 'Module 1: Introduction to English',
      progress: 100,
      lessons: [
        { id: 1, title: 'Welcome & Course Overview', duration: '12 min', completed: true, locked: false, videoUrl: 'intro' },
        { id: 2, title: 'The English Alphabet', duration: '15 min', completed: true, locked: false },
        { id: 3, title: 'Basic Greetings', duration: '18 min', completed: true, locked: false },
        { id: 4, title: 'Numbers 1-100', duration: '20 min', completed: true, locked: false },
      ]
    },
    {
      id: 2,
      title: 'Module 2: Grammar Fundamentals',
      progress: 75,
      lessons: [
        { id: 5, title: 'Present Simple Tense', duration: '25 min', completed: true, locked: false },
        { id: 6, title: 'Present Continuous', duration: '22 min', completed: true, locked: false },
        { id: 7, title: 'Past Simple - Regular Verbs', duration: '28 min', completed: true, locked: false },
        { id: 8, title: 'Past Simple - Irregular Verbs', duration: '30 min', completed: false, locked: false },
      ]
    },
    {
      id: 3,
      title: 'Module 3: Vocabulary Building',
      progress: 40,
      lessons: [
        { id: 9, title: 'Common Phrasal Verbs', duration: '24 min', completed: true, locked: false },
        { id: 10, title: 'Food & Cooking', duration: '20 min', completed: true, locked: false },
        { id: 11, title: 'Travel & Transportation', duration: '26 min', completed: false, locked: false },
        { id: 12, title: 'Weather & Seasons', duration: '18 min', completed: false, locked: false },
        { id: 13, title: 'Jobs & Professions', duration: '22 min', completed: false, locked: true },
      ]
    },
    {
      id: 4,
      title: 'Module 4: Advanced Topics',
      progress: 0,
      lessons: [
        { id: 14, title: 'Conditional Sentences', duration: '32 min', completed: false, locked: true },
        { id: 15, title: 'Passive Voice', duration: '28 min', completed: false, locked: true },
        { id: 16, title: 'Reported Speech', duration: '30 min', completed: false, locked: true },
      ]
    }
  ]);

  const selectedCourse = ENROLLED_COURSES.find(c => c.id === selectedCourseId) ?? ENROLLED_COURSES[0];

  const markLessonComplete = (lessonId: number) => {
    setModules(prev => prev.map(mod => {
      if (!mod.lessons.some(l => l.id === lessonId)) return mod;
      const newLessons = mod.lessons.map(l => l.id === lessonId ? { ...l, completed: true } : l);
      const done = newLessons.filter(l => l.completed).length;
      const progress = Math.round((done / newLessons.length) * 100);
      return { ...mod, lessons: newLessons, progress };
    }));
    if (selectedLesson?.id === lessonId) setSelectedLesson(prev => prev ? { ...prev, completed: true } : null);
  };

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const materials = [
    { id: 1, name: "Student's Book - Módulos 1-4.pdf", type: 'pdf', size: '12.4 MB', icon: FileText },
    { id: 2, name: "Student's Homework - Exercícios.pdf", type: 'pdf', size: '8.2 MB', icon: FileText },
    { id: 3, name: 'Apostila de Games.pdf', type: 'pdf', size: '6.5 MB', icon: FileText },
    { id: 4, name: 'Áudios das Atividades.zip', type: 'audio', size: '245 MB', icon: Headphones },
    { id: 5, name: 'Slides das Aulas.pdf', type: 'slides', size: '15.8 MB', icon: Presentation },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#253439] mb-2">Biblioteca de Lições</h1>
        <p className="text-[#7c898b] mb-4">Todas as suas videoaulas e materiais em um só lugar</p>
        <div className="flex flex-wrap gap-2">
          {ENROLLED_COURSES.map((course) => (
            <button
              key={course.id}
              onClick={() => setSelectedCourseId(course.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                selectedCourseId === course.id
                  ? 'bg-[#fbb80f] text-white'
                  : 'bg-white border border-[#b29e84]/30 text-[#253439] hover:border-[#fbb80f]'
              }`}
            >
              {course.title}
            </button>
          ))}
        </div>
        <p className="text-sm text-[#7c898b] mt-2">
          Curso selecionado: <span className="font-semibold text-[#253439]">{selectedCourse?.title}</span> ({selectedCourse?.level})
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lesson List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl border border-[#b29e84]/20 p-4">
            <h2 className="font-semibold text-[#253439] mb-4">Conteúdo do Curso – {selectedCourse?.title}</h2>
            <div className="space-y-2">
              {modules.map((module) => (
                <div key={module.id}>
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center justify-between p-3 hover:bg-[#f6f4f1] rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {expandedModules.includes(module.id) ? (
                        <ChevronDown className="w-5 h-5 text-[#7c898b]" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-[#7c898b]" />
                      )}
                      <div className="text-left">
                        <p className="font-medium text-[#253439] text-sm">{module.title}</p>
                        <p className="text-xs text-[#7c898b]">{module.lessons.length} lições</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#253439]">{module.progress}%</p>
                    </div>
                  </button>

                  {expandedModules.includes(module.id) && (
                    <div className="ml-4 mt-2 space-y-1">
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => !lesson.locked && setSelectedLesson(lesson)}
                          disabled={lesson.locked}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            selectedLesson?.id === lesson.id
                              ? 'bg-[#fbb80f]/10 border border-[#fbb80f]/30'
                              : lesson.locked
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:bg-[#f6f4f1]'
                          }`}
                        >
                          {lesson.locked ? (
                            <Lock className="w-4 h-4 text-[#7c898b]" />
                          ) : lesson.completed ? (
                            <CheckCircle className="w-4 h-4 text-[#fbb80f]" />
                          ) : (
                            <Circle className="w-4 h-4 text-[#7c898b]" />
                          )}
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-[#253439]">{lesson.title}</p>
                            <p className="text-xs text-[#7c898b]">{lesson.duration}</p>
                          </div>
                          {selectedLesson?.id === lesson.id && (
                            <Play className="w-4 h-4 text-[#fbb80f]" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Player & Content */}
        <div className="lg:col-span-2 space-y-6">
          {selectedLesson ? (
            <>
              {/* Video Player */}
              <div className="bg-white rounded-xl border border-[#b29e84]/20 overflow-hidden">
                <div className="aspect-video bg-[#253439] flex items-center justify-center relative">
                  <Play className="w-20 h-20 text-white opacity-80" />
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {selectedLesson.duration}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-[#253439] mb-2">{selectedLesson.title}</h2>
                      <p className="text-[#7c898b]">Assista e aprenda no seu próprio ritmo</p>
                    </div>
                    {selectedLesson.completed && (
                      <div className="flex items-center gap-2 bg-[#fbb80f]/10 text-[#fbb80f] px-3 py-1.5 rounded-full border border-[#fbb80f]/30">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Completo</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-[#fbb80f] text-white py-3 rounded-lg hover:bg-[#253439] transition-colors flex items-center justify-center gap-2">
                      <Play className="w-5 h-5" />
                      Assistir Aula
                    </button>
                    {!selectedLesson.completed && (
                      <button
                        onClick={() => markLessonComplete(selectedLesson.id)}
                        className="px-6 py-3 border border-[#b29e84]/50 rounded-lg hover:bg-[#f6f4f1] transition-colors flex items-center gap-2 text-[#253439]"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Marcar como Completa
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Lesson Materials */}
              <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
                <h3 className="font-semibold text-[#253439] mb-4">Materiais da Lição</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-[#f6f4f1] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#253439]/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#253439]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#253439]">Lesson Notes.pdf</p>
                        <p className="text-sm text-[#7c898b]">2.4 MB</p>
                      </div>
                    </div>
                    <button className="text-[#fbb80f] hover:text-[#253439] flex items-center gap-2">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#f6f4f1] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#b29e84]/20 rounded-lg flex items-center justify-center">
                        <Headphones className="w-5 h-5 text-[#b29e84]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#253439]">Audio Track.mp3</p>
                        <p className="text-sm text-[#7c898b]">5.8 MB</p>
                      </div>
                    </div>
                    <button className="text-[#fbb80f] hover:text-[#253439] flex items-center gap-2">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#f6f4f1] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#fbb80f]/20 rounded-lg flex items-center justify-center">
                        <Presentation className="w-5 h-5 text-[#fbb80f]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#253439]">Slides.pdf</p>
                        <p className="text-sm text-[#7c898b]">3.2 MB</p>
                      </div>
                    </div>
                    <button className="text-[#fbb80f] hover:text-[#253439] flex items-center gap-2">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl border border-[#b29e84]/20 p-12 text-center">
              <Play className="w-16 h-16 text-[#7c898b] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#253439] mb-2">Selecione uma Lição</h3>
              <p className="text-[#7c898b]">Escolha uma lição no menu à esquerda para começar</p>
            </div>
          )}

          {/* Download Materials Section */}
          <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
            <h3 className="font-semibold text-[#253439] mb-4">Download de Materiais</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {materials.map((material) => {
                const Icon = material.icon;
                return (
                  <div key={material.id} className="border border-[#b29e84]/30 rounded-lg p-4 hover:border-[#fbb80f] hover:bg-[#fbb80f]/5 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-[#f6f4f1] rounded-lg flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-[#253439]" />
                    </div>
                    <p className="font-medium text-[#253439] mb-1 text-sm">{material.name}</p>
                    <p className="text-xs text-[#7c898b] mb-3">{material.size}</p>
                    <button className="w-full bg-[#fbb80f] text-white py-2 rounded-lg hover:bg-[#253439] transition-colors flex items-center justify-center gap-2 text-sm">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}