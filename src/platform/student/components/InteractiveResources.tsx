import { useState } from 'react';
import { 
  Gamepad2, 
  Brain, 
  MessageCircle, 
  Target,
  PlayCircle,
  Trophy,
  ChevronRight
} from 'lucide-react';
import { VocabularyMatchGame } from './activities/VocabularyMatchGame';
import { QuizRunner } from './activities/QuizRunner';
import { ConversationSim } from './activities/ConversationSim';
import { QUIZZES } from './activities/quizData';
import { CONVERSATION_SIMS } from './activities/conversationSimData';

type ActiveActivity =
  | { type: 'game'; id: number }
  | { type: 'quiz'; id: number }
  | { type: 'sim'; id: number }
  | null;

export function InteractiveResources() {
  const [activeActivity, setActiveActivity] = useState<ActiveActivity>(null);
  const [gameScores, setGameScores] = useState<Record<number, number>>({});
  const [quizScores, setQuizScores] = useState<Record<number, { score: number; total: number }>>({});

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
      playable: true as const,
      completed: gameScores[1] !== undefined,
      score: gameScores[1]
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
      playable: true as const,
      quizId: 1,
      completed: quizScores[1] !== undefined,
      score: quizScores[1] ? Math.round((quizScores[1].score / quizScores[1].total) * 100) : undefined
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
      playable: false,
      completed: false,
      score: undefined
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
      playable: false,
      completed: false,
      score: undefined
    },
  ];

  const quizzes = [
    {
      id: 1,
      title: 'Present Perfect Quiz',
      questions: 15,
      duration: '10 min',
      topic: 'Gramática',
      completed: quizScores[1] !== undefined,
      score: quizScores[1]?.score,
      totalQuestions: 15
    },
    {
      id: 2,
      title: 'Business Vocabulary Test',
      questions: 20,
      duration: '15 min',
      topic: 'Vocabulário',
      completed: quizScores[2] !== undefined,
      score: quizScores[2]?.score,
      totalQuestions: 20
    },
    {
      id: 3,
      title: 'Phrasal Verbs Challenge',
      questions: 25,
      duration: '20 min',
      topic: 'Vocabulário',
      completed: quizScores[3] !== undefined,
      score: quizScores[3]?.score,
      totalQuestions: 25
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

  const handleStartGame = (game: (typeof games)[0]) => {
    if (game.id === 1) setActiveActivity({ type: 'game', id: 1 });
    else if (game.id === 2 && 'quizId' in game) setActiveActivity({ type: 'quiz', id: game.quizId });
    else if (!game.playable) setActiveActivity({ type: 'game', id: game.id }); // will show coming soon
  };

  const handleStartQuiz = (quizId: number) => setActiveActivity({ type: 'quiz', id: quizId });
  const handleStartSim = (simId: number) => setActiveActivity({ type: 'sim', id: simId });

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
      {/* Activity overlays */}
      {activeActivity?.type === 'game' && activeActivity.id === 1 && (
        <VocabularyMatchGame
          onClose={() => setActiveActivity(null)}
          onComplete={(score) => setGameScores((s) => ({ ...s, 1: score }))}
        />
      )}
      {activeActivity?.type === 'game' && (activeActivity.id === 3 || activeActivity.id === 4) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-8 shadow-xl text-center">
            <div className="text-5xl mb-4">🚧</div>
            <h2 className="text-xl font-bold text-[#253439] mb-2">Em breve</h2>
            <p className="text-[#7c898b] mb-6">
              Este recurso está em desenvolvimento. Volte em breve!
            </p>
            <button
              onClick={() => setActiveActivity(null)}
              className="w-full py-3 rounded-lg bg-[#fbb80f] text-white font-medium hover:bg-[#253439]"
            >
              Voltar
            </button>
          </div>
        </div>
      )}
      {activeActivity?.type === 'quiz' && (() => {
        const quiz = QUIZZES.find((q) => q.id === activeActivity.id);
        if (!quiz) return null;
        return (
          <QuizRunner
            title={quiz.title}
            questions={quiz.questions}
            onClose={() => setActiveActivity(null)}
            onComplete={(score, total) =>
              setQuizScores((s) => ({ ...s, [quiz.id]: { score, total } }))
            }
          />
        );
      })()}
      {activeActivity?.type === 'sim' && (() => {
        const sim = CONVERSATION_SIMS.find((s) => s.id === activeActivity.id);
        if (!sim) return null;
        return (
          <ConversationSim
            title={sim.title}
            scenario={sim.scenario}
            icon={sim.icon}
            steps={sim.steps}
            onClose={() => setActiveActivity(null)}
          />
        );
      })()}

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

                  <button
                    onClick={() => handleStartGame(game)}
                    className="w-full mt-4 bg-[#fbb80f] text-white py-2.5 rounded-lg hover:bg-[#253439] transition-colors flex items-center justify-center gap-2"
                  >
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
              <div
                key={quiz.id}
                onClick={() => handleStartQuiz(quiz.id)}
                className="border border-[#b29e84]/30 rounded-lg p-4 hover:border-[#fbb80f] hover:bg-[#fbb80f]/5 transition-all cursor-pointer"
              >
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartQuiz(quiz.id);
                    }}
                    className="text-[#fbb80f] hover:text-[#253439] text-sm font-medium flex items-center gap-1"
                  >
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
              <div
                key={sim.id}
                onClick={() => handleStartSim(sim.id)}
                className="border border-[#b29e84]/30 rounded-lg p-4 hover:border-[#fbb80f] hover:bg-[#fbb80f]/5 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{sim.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#253439] mb-1">{sim.title}</h3>
                    <p className="text-sm text-[#7c898b] mb-3">{sim.scenario}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-[#b29e84]/20 text-[#253439] px-2 py-1 rounded font-medium">
                        {sim.level}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartSim(sim.id);
                        }}
                        className="text-[#fbb80f] hover:text-[#253439] text-sm font-medium flex items-center gap-1"
                      >
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
