import { 
  Trophy, 
  Award, 
  Star, 
  Flame, 
  Target,
  TrendingUp,
  CheckCircle,
  Lock,
  Sparkles
} from 'lucide-react';

export function ProgressTracking() {
  const badges = [
    { id: 1, name: 'Primeira Aula', description: 'Completou sua primeira lição', icon: Star, unlocked: true, color: 'from-[#fbb80f] to-[#fbee0f]' },
    { id: 2, name: 'Streak 7 Dias', description: 'Estudou por 7 dias consecutivos', icon: Flame, unlocked: true, color: 'from-[#fbee0f] to-[#fbb80f]' },
    { id: 3, name: 'Gramática Master', description: 'Completou 10 lições de gramática', icon: Award, unlocked: true, color: 'from-[#253439] to-[#7c898b]' },
    { id: 4, name: '50 Lições', description: 'Completou 50 lições', icon: Trophy, unlocked: false, color: 'from-[#b29e84] to-[#7c898b]', progress: 40 },
    { id: 5, name: 'Vocabulário Pro', description: 'Aprendeu 500 palavras novas', icon: Sparkles, unlocked: false, color: 'from-[#b29e84] to-[#7c898b]', progress: 68 },
    { id: 6, name: 'Perfeccionista', description: 'Obteve 100% em 10 quizzes', icon: Target, unlocked: false, color: 'from-[#b29e84] to-[#7c898b]', progress: 20 },
  ];

  const achievements = [
    { date: '2026-01-08', title: 'Completou Module 2 - B1 Intermediate', points: 100 },
    { date: '2026-01-06', title: 'Streak de 7 dias alcançado', points: 50 },
    { date: '2026-01-03', title: 'Quiz perfeito - Grammar Basics', points: 75 },
  ];

  const stats = [
    { label: 'Total de Pontos', value: '2,450', icon: Star, color: 'bg-[#fbb80f]/10 text-[#fbb80f]' },
    { label: 'Nível Atual', value: 'B1', icon: TrendingUp, color: 'bg-[#253439]/10 text-[#253439]' },
    { label: 'Conquistas', value: '12/24', icon: Trophy, color: 'bg-[#fbee0f]/20 text-[#fbee0f]' },
    { label: 'Streak Record', value: '21 dias', icon: Flame, color: 'bg-[#b29e84]/20 text-[#b29e84]' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-2xl font-bold text-[#253439] mb-1">{stat.value}</p>
              <p className="text-sm text-[#7c898b]">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Badges Section */}
      <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
        <h2 className="text-xl font-semibold text-[#253439] mb-6">Badges e Conquistas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.id} className="text-center">
                <div className={`relative w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br ${badge.color} ${
                  !badge.unlocked ? 'opacity-40' : ''
                } flex items-center justify-center shadow-lg`}>
                  {badge.unlocked ? (
                    <Icon className="w-10 h-10 text-white" />
                  ) : (
                    <Lock className="w-8 h-8 text-white" />
                  )}
                </div>
                <p className={`font-medium text-sm mb-1 ${badge.unlocked ? 'text-[#253439]' : 'text-[#7c898b]'}`}>
                  {badge.name}
                </p>
                <p className="text-xs text-[#7c898b]">{badge.description}</p>
                {!badge.unlocked && badge.progress !== undefined && (
                  <div className="mt-2">
                    <div className="w-full bg-[#b29e84]/20 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full bg-gradient-to-r from-[#fbb80f] to-[#fbee0f]"
                        style={{ width: `${badge.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#7c898b] mt-1">{badge.progress}%</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-xl border border-[#b29e84]/20 p-6">
        <h2 className="text-xl font-semibold text-[#253439] mb-4">Conquistas Recentes</h2>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#fbb80f]/10 to-[#fbee0f]/10 rounded-lg border border-[#fbb80f]/20">
              <div className="w-12 h-12 bg-[#fbb80f] rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#253439]">{achievement.title}</p>
                <p className="text-sm text-[#7c898b]">
                  {new Date(achievement.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#fbb80f]">+{achievement.points}</p>
                <p className="text-xs text-[#7c898b]">pontos</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
