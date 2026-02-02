import { useState, useMemo } from 'react';
import { X, Trophy, RotateCcw } from 'lucide-react';

export interface WordPair {
  en: string;
  pt: string;
}

const DEFAULT_PAIRS: WordPair[] = [
  { en: 'Hello', pt: 'Olá' },
  { en: 'Goodbye', pt: 'Tchau' },
  { en: 'Thank you', pt: 'Obrigado(a)' },
  { en: 'Please', pt: 'Por favor' },
  { en: 'Water', pt: 'Água' },
  { en: 'Book', pt: 'Livro' },
  { en: 'Friend', pt: 'Amigo(a)' },
  { en: 'House', pt: 'Casa' },
];

interface VocabularyMatchGameProps {
  onClose: () => void;
  onComplete?: (score: number) => void;
}

export function VocabularyMatchGame({ onClose, onComplete }: VocabularyMatchGameProps) {
  const [runKey, setRunKey] = useState(0);
  const pairs = useMemo(() => [...DEFAULT_PAIRS].sort(() => Math.random() - 0.5), [runKey]);
  const leftWords = useMemo(() => pairs.map(p => p.en).sort(() => Math.random() - 0.5), [pairs]);
  const rightWords = useMemo(() => pairs.map(p => p.pt).sort(() => Math.random() - 0.5), [pairs]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedLeft, setMatchedLeft] = useState<Set<string>>(new Set());
  const [matchedRight, setMatchedRight] = useState<Set<string>>(new Set());
  const [attempts, setAttempts] = useState(0);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  const resetAndPlayAgain = () => {
    setRunKey((k) => k + 1);
    setDone(false);
    setScore(0);
    setMatchedLeft(new Set());
    setMatchedRight(new Set());
    setSelectedLeft(null);
    setSelectedRight(null);
    setAttempts(0);
  };

  const pairMap = useMemo(() => {
    const map = new Map<string, string>();
    pairs.forEach(p => {
      map.set(p.en, p.pt);
      map.set(p.pt, p.en);
    });
    return map;
  }, [pairs]);

  const checkMatch = () => {
    if (!selectedLeft || !selectedRight) return;
    setAttempts(a => a + 1);
    const expectedPt = pairMap.get(selectedLeft);
    const isCorrect = expectedPt === selectedRight;
    if (isCorrect) {
      setMatchedLeft(m => new Set(m).add(selectedLeft));
      setMatchedRight(m => new Set(m).add(selectedRight));
      setScore(s => {
        const newScore = s + 1;
        if (newScore === pairs.length) {
          setDone(true);
          onComplete?.(Math.round((newScore / pairs.length) * 100));
        }
        return newScore;
      });
    }
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const handleLeft = (word: string) => {
    if (matchedLeft.has(word)) return;
    if (selectedLeft === word) {
      setSelectedLeft(null);
      return;
    }
    setSelectedLeft(word);
    if (selectedRight) checkMatch();
  };

  const handleRight = (word: string) => {
    if (matchedRight.has(word)) return;
    if (selectedRight === word) {
      setSelectedRight(null);
      return;
    }
    setSelectedRight(word);
    if (selectedLeft) checkMatch();
  };

  if (done) {
    const pct = Math.round((score / pairs.length) * 100);
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-xl text-center">
          <div className="w-16 h-16 bg-[#fbb80f]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-[#fbb80f]" />
          </div>
          <h2 className="text-2xl font-bold text-[#253439] mb-2">Parabéns!</h2>
          <p className="text-[#7c898b] mb-4">Você completou o Vocabulary Match.</p>
          <p className="text-4xl font-bold text-[#fbb80f] mb-6">{pct}%</p>
          <p className="text-sm text-[#7c898b] mb-6">{score} de {pairs.length} pares corretos</p>
          <div className="flex gap-3">
            <button
              onClick={resetAndPlayAgain}
              className="flex-1 py-3 rounded-lg border border-[#b29e84]/30 text-[#253439] font-medium flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Jogar de novo
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
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#b29e84]/20 flex items-center justify-between bg-[#f6f4f1]">
          <h2 className="text-lg font-semibold text-[#253439]">Vocabulary Match</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#7c898b]">Pares: {score}/{pairs.length}</span>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#b29e84]/20 text-[#7c898b]">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p className="p-4 text-sm text-[#7c898b]">Combine cada palavra em inglês com sua tradução em português. Clique em uma de cada coluna.</p>
        <div className="p-4 grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-xs font-medium text-[#7c898b] uppercase mb-2">Inglês</p>
            {leftWords.map((word) => (
              <button
                key={word}
                type="button"
                onClick={() => handleLeft(word)}
                disabled={matchedLeft.has(word)}
                className={`w-full py-3 px-4 rounded-lg text-left font-medium transition-all ${
                  matchedLeft.has(word)
                    ? 'bg-[#fbb80f]/20 text-[#253439] border-2 border-[#fbb80f] line-through'
                    : selectedLeft === word
                    ? 'bg-[#fbb80f] text-white border-2 border-[#fbb80f]'
                    : 'bg-[#f6f4f1] text-[#253439] border-2 border-transparent hover:border-[#b29e84]/30'
                }`}
              >
                {word}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-[#7c898b] uppercase mb-2">Português</p>
            {rightWords.map((word) => (
              <button
                key={word}
                type="button"
                onClick={() => handleRight(word)}
                disabled={matchedRight.has(word)}
                className={`w-full py-3 px-4 rounded-lg text-left font-medium transition-all ${
                  matchedRight.has(word)
                    ? 'bg-[#fbb80f]/20 text-[#253439] border-2 border-[#fbb80f] line-through'
                    : selectedRight === word
                    ? 'bg-[#fbb80f] text-white border-2 border-[#fbb80f]'
                    : 'bg-[#f6f4f1] text-[#253439] border-2 border-transparent hover:border-[#b29e84]/30'
                }`}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
