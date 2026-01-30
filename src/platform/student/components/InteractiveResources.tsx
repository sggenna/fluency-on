import { 
  Gamepad2, 
  Brain, 
  MessageCircle, 
  Target,
  PlayCircle,
  Trophy,
  ChevronRight
} from 'lucide-react';

export function InteractiveResources() {
  const games = [
    {
      id: 1,
      title: 'Vocabulary Match',
      description: 'Combine palavras em inglês com suas traduções',
      category: 'Vocabulário',
      difficulty: 'Fácil',
      duration: '10 min',
      icon: Brain,
      color: 'from-[#b29e84] to-[#7c898b]',
      completed: true,
      score: 95
    },
    {
      id: 2,
      title: 'Grammar Quest',
      description: 'Aventura interativa para praticar tempos verbais',
      category: 'Gramática',
      difficulty: 'Médio',
      duration: '15 min',
      icon: Target,
      color: 'from-[#253439] to-[#7c898b]',
      completed: false
    },
    {
      id: 3,
      title: 'Pronunciation Practice',
      description: 'Grave sua voz e compare com nativos',
      category: 'Pronúncia',
      difficulty: 'Médio',
      duration: '12 min',
      icon: MessageCircle,
      color: 'from-[#fbb80f] to-[#fbee0f]',
      completed: true,
      score: 88
    },
    {
      id: 4,
      title: 'Listening Challenge',
      description: 'Ouça diálogos e responda perguntas',
      category: 'Compreensão',
      difficulty: 'Difícil',
      duration: '20 min',
      icon: Gamepad2,
      color: 'from-[#fbee0f] to-[#fbb80f]',
      completed: false
    },
  ];

  const quizzes = [
    {
      id: 1,
      title: 'Present Perfect Quiz',
      questions: 15,
      duration: '10 min',
      topic: 'Gramática',
      completed: true,
      score: 13,
      totalQuestions: 15
    },
    {
      id: 2,
      title: 'Business Vocabulary Test',
      questions: 20,
      duration: '15 min',
      topic: 'Vocabulário',
      completed: true,
      score: 18,
      totalQuestions: 20
    },
    {
      id: 3,
      title: 'Phrasal Verbs Challenge',
      questions: 25,
      duration: '20 min',
      topic: 'Vocabulário',
      completed: false
    },
  ];

  const conversationSimulations = [
    {
      id: 1,
      title: 'Pedindo no Restaurante',
      scenario: 'Pratique fazer pedidos em inglês',
      level: 'Básico',
      icon: '🍽️'
    },
    {
      id: 2,
      title: 'Entrevista de Emprego',
      scenario: 'Simule uma entrevista profissional',
      level: 'Avançado',
      icon: '💼'
    },
    {
      id: 3,
      title: 'Check-in no Hotel',
      scenario: 'Aprenda vocabulário de viagem',
      level: 'Intermediário',
      icon: '🏨'
    },
    {
      id: 4,
      title: 'Conversa Casual',
      scenario: 'Pratique small talk e expressões do dia-a-dia',
      level: 'Básico',
      icon: '💬'
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'text-[#fbb80f] bg-[#fbb80f]/10';
      case 'Médio': return 'text-[#fbee0f] bg-[#fbee0f]/10';
      case 'Difícil': return 'text-[#253439] bg-[#253439]/10';
      default: return 'text-[#7c898b] bg-[#7c898b]/10';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#253439] mb-2">Recursos Interativos</h1>
        <p className="text-[#7c898b]">Jogos, quizzes e simulações para tornar o aprendizado mais divertido</p>
      </div>

      {/* Games Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#253439]">Jogos Educativos</h2>
          <button className="text-[#fbb80f] hover:text-[#253439] text-sm font-medium flex items-center gap-1">
            Ver todos
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => {
            const Icon = game.icon;
            return (
              <div key={game.id} className="bg-white rounded-xl border border-[#b29e84]/20 overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
                <div className={`h-32 bg-gradient-to-br ${game.color} p-6 flex items-center justify-center relative`}>
                  <Icon className="w-12 h-12 text-white" />
                  {game.completed && (
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                      ✓ Completo
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-[#7c898b]">{game.category}</span>
                    <span className="text-xs text-[#b29e84]">•</span>
                    <span className="text-xs text-[#7c898b]">{game.duration}</span>
                  </div>
                  <h3 className="font-semibold text-[#253439] mb-2">{game.title}</h3>
                  <p className="text-sm text-[#7c898b] mb-4">{game.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${getDifficultyColor(game.difficulty)}`}>
                      {game.difficulty}
                    </span>
                    {game.completed && game.score !== undefined && (
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-[#fbb80f]" />
                        <span className="text-sm font-semibold text-[#253439]">{game.score}%</span>
                      </div>
                    )}
                  </div>

                  <button className="w-full mt-4 bg-[#fbb80f] text-white py-2.5 rounded-lg hover:bg-[#253439] transition-colors flex items-center justify-center gap-2">
                    <PlayCircle className="w-5 h-5" />
                    {game.completed ? 'Jogar Novamente' : 'Começar'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quizzes and Simulations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quizzes */}
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <h2 className="text-xl font-semibold text-[#253439] mb-4">Quizzes e Testes</h2>
          <div className="space-y-3">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="border border-[#b29e84]/30 rounded-lg p-4 hover:border-[#fbb80f] hover:bg-[#fbb80f]/5 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#253439] mb-1">{quiz.title}</h3>
                    <p className="text-sm text-[#7c898b]">
                      {quiz.questions} questões • {quiz.duration}
                    </p>
                  </div>
                  {quiz.completed && quiz.score !== undefined && (
                    <div className="bg-[#fbb80f]/10 text-[#fbb80f] px-3 py-1 rounded-full text-sm font-medium border border-[#fbb80f]/30">
                      {quiz.score}/{quiz.totalQuestions}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs bg-[#f6f4f1] text-[#253439] px-2 py-1 rounded">
                    {quiz.topic}
                  </span>
                  <button className="text-[#fbb80f] hover:text-[#253439] text-sm font-medium flex items-center gap-1">
                    {quiz.completed ? 'Refazer' : 'Iniciar'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation Simulations */}
        <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
          <h2 className="text-xl font-semibold text-[#253439] mb-4">Simulações de Conversação</h2>
          <div className="space-y-3">
            {conversationSimulations.map((sim) => (
              <div key={sim.id} className="border border-[#b29e84]/30 rounded-lg p-4 hover:border-[#fbb80f] hover:bg-[#fbb80f]/5 transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{sim.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#253439] mb-1">{sim.title}</h3>
                    <p className="text-sm text-[#7c898b] mb-3">{sim.scenario}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-[#b29e84]/20 text-[#253439] px-2 py-1 rounded font-medium">
                        {sim.level}
                      </span>
                      <button className="text-[#fbb80f] hover:text-[#253439] text-sm font-medium flex items-center gap-1">
                        Praticar
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Practice Exercises */}
      <div className="mt-6 bg-gradient-to-br from-[#fbb80f]/10 to-[#fbee0f]/10 rounded-xl border border-[#fbb80f]/30 p-8 text-center">
        <Brain className="w-16 h-16 text-[#fbb80f] mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-[#253439] mb-2">Exercícios Práticos</h3>
        <p className="text-[#7c898b] mb-6 max-w-2xl mx-auto">
          Acesse centenas de exercícios interativos organizados por tópico e nível de dificuldade
        </p>
        <button className="bg-[#fbb80f] text-white px-8 py-3 rounded-lg hover:bg-[#253439] transition-colors">
          Explorar Exercícios
        </button>
      </div>
    </div>
  );
}
