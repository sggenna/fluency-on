import { useState } from 'react';
import { 
  Search,
  TrendingUp,
  TrendingDown,
  Award,
  Clock,
  Target,
  Eye,
  BarChart3,
  User,
  X
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface StudentProgress {
  id: number;
  name: string;
  level: string;
  courses: number;
  overallProgress: number;
  studyHours: number;
  completedLessons: number;
  trend: 'up' | 'down' | 'stable';
  lastActive: string;
}

export function ProgressTracking() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentProgress | null>(null);

  const students: StudentProgress[] = [
    {
      id: 1,
      name: 'Ana Maria Santos',
      level: 'B1',
      courses: 2,
      overallProgress: 68,
      studyHours: 28,
      completedLessons: 16,
      trend: 'up',
      lastActive: '2026-01-09'
    },
    {
      id: 2,
      name: 'Carlos Eduardo Silva',
      level: 'A2',
      courses: 1,
      overallProgress: 12,
      studyHours: 8,
      completedLessons: 3,
      trend: 'up',
      lastActive: '2026-01-08'
    },
    {
      id: 3,
      name: 'Mariana Costa',
      level: 'B1',
      courses: 2,
      overallProgress: 82,
      studyHours: 35,
      completedLessons: 20,
      trend: 'up',
      lastActive: '2026-01-09'
    },
    {
      id: 4,
      name: 'Pedro Henrique',
      level: 'A1',
      courses: 1,
      overallProgress: 45,
      studyHours: 15,
      completedLessons: 11,
      trend: 'down',
      lastActive: '2026-01-05'
    },
    {
      id: 5,
      name: 'Juliana Oliveira',
      level: 'B2',
      courses: 2,
      overallProgress: 91,
      studyHours: 42,
      completedLessons: 28,
      trend: 'up',
      lastActive: '2026-01-09'
    },
  ];

  const weeklyProgressData = [
    { day: 'Seg', horas: 3.5, lições: 2 },
    { day: 'Ter', horas: 2.8, lições: 1 },
    { day: 'Qua', horas: 4.2, lições: 3 },
    { day: 'Qui', horas: 3.1, lições: 2 },
    { day: 'Sex', horas: 5.0, lições: 4 },
    { day: 'Sáb', horas: 2.5, lições: 1 },
    { day: 'Dom', horas: 1.5, lições: 1 },
  ];

  const courseCompletionData = [
    { course: 'A1', completion: 65 },
    { course: 'A2', completion: 45 },
    { course: 'B1', completion: 75 },
    { course: 'B2', completion: 88 },
    { course: 'Conv', completion: 70 },
    { course: 'Business', completion: 52 },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: 'Média de Progresso', value: `${Math.round(students.reduce((acc, s) => acc + s.overallProgress, 0) / students.length)}%`, icon: Target, color: 'bg-[#253439]/10 text-[#253439]' },
    { label: 'Total Horas de Estudo', value: `${students.reduce((acc, s) => acc + s.studyHours, 0)}h`, icon: Clock, color: 'bg-[#fbb80f]/10 text-[#fbb80f]' },
    { label: 'Lições Completadas', value: students.reduce((acc, s) => acc + s.completedLessons, 0), icon: Award, color: 'bg-[#fbee0f]/20 text-[#fbee0f]' },
    { label: 'Alunos Progredindo', value: students.filter(s => s.trend === 'up').length, icon: TrendingUp, color: 'bg-[#b29e84]/20 text-[#b29e84]' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#253439] mb-2">Acompanhamento de Progresso</h1>
        <p className="text-[#7c898b]">Monitore o desempenho individual de cada aluno</p>
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Progress Chart */}
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <h2 className="text-lg font-semibold text-[#253439] mb-4">Atividade Semanal</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#b29e84" opacity={0.2} />
              <XAxis dataKey="day" stroke="#7c898b" />
              <YAxis stroke="#7c898b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #b29e84',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="horas" stroke="#fbb80f" strokeWidth={3} name="Horas de Estudo" />
              <Line type="monotone" dataKey="lições" stroke="#253439" strokeWidth={3} name="Lições Completas" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Course Completion Chart */}
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <h2 className="text-lg font-semibold text-[#253439] mb-4">Taxa de Conclusão por Curso</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={courseCompletionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#b29e84" opacity={0.2} />
              <XAxis dataKey="course" stroke="#7c898b" />
              <YAxis stroke="#7c898b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #b29e84',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="completion" fill="#fbb80f" name="Conclusão %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
          <input
            type="text"
            placeholder="Buscar aluno..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
          />
        </div>
      </div>

      {/* Student Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-xl border border-[#b29e84]/20 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#253439] to-[#7c898b] rounded-full flex items-center justify-center text-white font-bold">
                  {student.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <h3 className="font-semibold text-[#253439]">{student.name}</h3>
                  <span className="text-xs font-semibold bg-[#fbb80f]/20 text-[#fbb80f] px-2 py-1 rounded">
                    {student.level}
                  </span>
                </div>
              </div>
              {student.trend === 'up' ? (
                <TrendingUp className="w-5 h-5 text-[#fbb80f]" />
              ) : student.trend === 'down' ? (
                <TrendingDown className="w-5 h-5 text-red-500" />
              ) : null}
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-[#7c898b]">Progresso Geral</span>
                  <span className="text-sm font-bold text-[#253439]">{student.overallProgress}%</span>
                </div>
                <div className="w-full bg-[#b29e84]/20 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-[#fbb80f] to-[#fbee0f]"
                    style={{ width: `${student.overallProgress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#f6f4f1] rounded-lg p-2">
                  <p className="text-lg font-bold text-[#253439]">{student.studyHours}h</p>
                  <p className="text-xs text-[#7c898b]">Estudo</p>
                </div>
                <div className="bg-[#f6f4f1] rounded-lg p-2">
                  <p className="text-lg font-bold text-[#253439]">{student.completedLessons}</p>
                  <p className="text-xs text-[#7c898b]">Lições</p>
                </div>
                <div className="bg-[#f6f4f1] rounded-lg p-2">
                  <p className="text-lg font-bold text-[#253439]">{student.courses}</p>
                  <p className="text-xs text-[#7c898b]">Cursos</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#7c898b]">Último acesso:</span>
                <span className="text-[#253439] font-medium">
                  {new Date(student.lastActive).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedStudent(student)}
              className="w-full bg-[#fbb80f] text-white py-2.5 rounded-lg hover:bg-[#253439] transition-colors flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Eye className="w-4 h-4" />
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>

      {/* Ver detalhes modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedStudent(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-[#253439] to-[#7c898b] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {selectedStudent.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#253439]">{selectedStudent.name}</h2>
                  <span className="text-sm font-medium bg-[#fbb80f]/20 text-[#fbb80f] px-2 py-1 rounded">{selectedStudent.level}</span>
                </div>
              </div>
              <button type="button" onClick={() => setSelectedStudent(null)} className="text-[#7c898b] hover:text-[#253439] p-2 rounded-lg hover:bg-[#f6f4f1]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-[#7c898b] mb-1">Progresso Geral</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-[#b29e84]/20 rounded-full h-3">
                    <div className="h-3 rounded-full bg-gradient-to-r from-[#fbb80f] to-[#fbee0f]" style={{ width: `${selectedStudent.overallProgress}%` }} />
                  </div>
                  <span className="text-sm font-bold text-[#253439]">{selectedStudent.overallProgress}%</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-[#f6f4f1] rounded-lg p-3">
                  <p className="text-2xl font-bold text-[#253439]">{selectedStudent.studyHours}h</p>
                  <p className="text-xs text-[#7c898b]">Horas de estudo</p>
                </div>
                <div className="bg-[#f6f4f1] rounded-lg p-3">
                  <p className="text-2xl font-bold text-[#253439]">{selectedStudent.completedLessons}</p>
                  <p className="text-xs text-[#7c898b]">Lições completas</p>
                </div>
                <div className="bg-[#f6f4f1] rounded-lg p-3">
                  <p className="text-2xl font-bold text-[#253439]">{selectedStudent.courses}</p>
                  <p className="text-xs text-[#7c898b]">Cursos</p>
                </div>
              </div>
              <p className="text-sm text-[#7c898b]">
                Último acesso: <span className="font-medium text-[#253439]">{new Date(selectedStudent.lastActive).toLocaleDateString('pt-BR')}</span>
              </p>
            </div>
            <button type="button" onClick={() => setSelectedStudent(null)} className="w-full bg-[#253439] text-white py-2.5 rounded-lg hover:bg-[#fbb80f] transition-colors font-medium">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
