import { useState } from 'react';
import { X, MessageCircle, CheckCircle } from 'lucide-react';

export interface DialogueStep {
  speaker: 'partner' | 'you';
  text: string;
  choices?: { text: string; feedback: string; good: boolean }[];
}

interface ConversationSimProps {
  title: string;
  scenario: string;
  icon: string;
  steps: DialogueStep[];
  onClose: () => void;
}

export function ConversationSim({ title, scenario, icon, steps, onClose }: ConversationSimProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;
  const hasChoices = step.choices && step.choices.length > 0;

  const handleChoice = (choice: { text: string; feedback: string; good: boolean }) => {
    setFeedback(choice.feedback);
    if (isLast) {
      setDone(true);
    }
  };

  const handleContinue = () => {
    setFeedback(null);
    if (isLast) setDone(true);
    else setStepIndex(i => i + 1);
  };

  if (done) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-xl text-center">
          <div className="text-5xl mb-4">{icon}</div>
          <div className="w-16 h-16 bg-[#fbb80f]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-[#fbb80f]" />
          </div>
          <h2 className="text-2xl font-bold text-[#253439] mb-2">Simulação concluída!</h2>
          <p className="text-[#7c898b] mb-6">{title}</p>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-lg bg-[#fbb80f] text-white font-medium hover:bg-[#253439]"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#b29e84]/20 flex items-center justify-between bg-[#f6f4f1]">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{icon}</span>
            <div>
              <h2 className="text-lg font-semibold text-[#253439]">{title}</h2>
              <p className="text-xs text-[#7c898b]">{scenario}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#b29e84]/20 text-[#7c898b]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className={`flex gap-3 ${step.speaker === 'partner' ? '' : 'flex-row-reverse'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              step.speaker === 'partner' ? 'bg-[#253439] text-white' : 'bg-[#fbb80f] text-white'
            }`}>
              {step.speaker === 'partner' ? (
                <MessageCircle className="w-5 h-5" />
              ) : (
                <span className="text-sm font-bold">V</span>
              )}
            </div>
            <div className={`flex-1 p-4 rounded-xl ${
              step.speaker === 'partner' ? 'bg-[#f6f4f1] text-[#253439]' : 'bg-[#fbb80f]/10 text-[#253439] border border-[#fbb80f]/30'
            }`}>
              <p className="text-sm font-medium text-[#7c898b] mb-1">
                {step.speaker === 'partner' ? 'Interlocutor' : 'Você'}
              </p>
              <p>{step.text}</p>
            </div>
          </div>

          {feedback && (
            <div className="p-4 rounded-xl bg-[#fbb80f]/10 border border-[#fbb80f]/30 text-[#253439]">
              <p className="text-sm font-medium text-[#7c898b] mb-1">Feedback</p>
              <p>{feedback}</p>
              <button
                onClick={handleContinue}
                className="mt-4 w-full py-2.5 rounded-lg bg-[#fbb80f] text-white font-medium hover:bg-[#253439]"
              >
                {isLast ? 'Concluir' : 'Continuar'}
              </button>
            </div>
          )}

          {!feedback && step.choices && step.choices.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-[#7c898b]">Escolha sua resposta:</p>
              {step.choices.map((choice, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleChoice(choice)}
                  className="w-full py-3 px-4 rounded-lg text-left font-medium bg-[#f6f4f1] text-[#253439] border-2 border-transparent hover:border-[#fbb80f] transition-all"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}

          {!feedback && !step.choices && (
            <button
              onClick={handleContinue}
              className="w-full py-3 rounded-lg bg-[#fbb80f] text-white font-medium hover:bg-[#253439]"
            >
              {isLast ? 'Concluir' : 'Continuar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
