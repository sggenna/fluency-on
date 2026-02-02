import { useState } from 'react';
import { X, Trophy, ChevronRight, RotateCcw } from 'lucide-react';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

interface QuizRunnerProps {
  title: string;
  questions: QuizQuestion[];
  onClose: () => void;
  onComplete?: (score: number, total: number) => void;
}

export function QuizRunner({ title, questions, onClose, onComplete }: QuizRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const resetAndRetry = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswered(false);
    setCorrectCount(0);
    setDone(false);
  };

  const q = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelectedOption(index);
    setAnswered(true);
    const correct = index === q.correctIndex;
    if (correct) setCorrectCount(c => c + 1);
  };

  const handleNext = () => {
    if (!answered) return;
    if (isLast) {
      setDone(true);
      onComplete?.(correctCount, questions.length);
      return;
    }
    setCurrentIndex(i => i + 1);
    setSelectedOption(null);
    setAnswered(false);
  };

  if (done) {
    const score = correctCount;
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-xl text-center">
          <div className="w-16 h-16 bg-[#fbb80f]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-[#fbb80f]" />
          </div>
          <h2 className="text-2xl font-bold text-[#253439] mb-2">Quiz concluído!</h2>
          <p className="text-[#7c898b] mb-4">{title}</p>
          <p className="text-4xl font-bold text-[#fbb80f] mb-6">{pct}%</p>
          <p className="text-sm text-[#7c898b] mb-6">{score} de {questions.length} corretas</p>
          <div className="flex gap-3">
            <button
              onClick={resetAndRetry}
              className="flex-1 py-3 rounded-lg border border-[#b29e84]/30 text-[#253439] font-medium flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Refazer
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-lg bg-[#fbb80f] text-white font-medium hover:bg-[#253439]"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#b29e84]/20 flex items-center justify-between bg-[#f6f4f1]">
          <h2 className="text-lg font-semibold text-[#253439]">{title}</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#7c898b]">{currentIndex + 1} / {questions.length}</span>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#b29e84]/20 text-[#7c898b]">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <p className="text-lg font-medium text-[#253439] mb-6">{q.question}</p>
          <div className="space-y-3">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                disabled={answered}
                className={`w-full py-3 px-4 rounded-lg text-left font-medium transition-all border-2 ${
                  !answered
                    ? 'border-[#b29e84]/20 bg-[#f6f4f1] text-[#253439] hover:border-[#fbb80f]'
                    : idx === q.correctIndex
                    ? 'border-[#22c55e] bg-[#22c55e]/10 text-[#253439]'
                    : idx === selectedOption
                    ? 'border-[#ef4444] bg-[#ef4444]/10 text-[#253439]'
                    : 'border-[#b29e84]/20 bg-[#f6f4f1] text-[#7c898b]'
                }`}
              >
                {opt}
                {answered && idx === q.correctIndex && ' ✓'}
                {answered && idx === selectedOption && idx !== q.correctIndex && ' ✗'}
              </button>
            ))}
          </div>
          {answered && (
            <button
              onClick={handleNext}
              className="w-full mt-6 py-3 rounded-lg bg-[#fbb80f] text-white font-medium hover:bg-[#253439] flex items-center justify-center gap-2"
            >
              {isLast ? 'Ver resultado' : 'Próxima'}
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
