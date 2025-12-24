import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Qual é o material utilizado?',
    answer: 'Utilizamos um material completo, estruturado para proporcionar uma jornada de aprendizado clara, prática e eficiente, alinhada ao CEFR (Quadro Europeu Comum de Referência para Línguas). O conteúdo é organizado em módulos, com unidades focadas em vocabulário, gramática, leitura, compreensão auditiva, conversação e escrita, além de warm-ups e atividades interativas para tornar o aprendizado dinâmico e envolvente. O material é 100% digital, pensado para que você possa acessá-lo facilmente de qualquer dispositivo — computador, tablet ou celular —, e também pode ser impresso para facilitar seus estudos. O custo é de R$137,00 por módulo, podendo ser pago à vista no ato da matrícula ou parcelado ao longo dos 6 meses do módulo, junto com as mensalidades.',
  },
  {
    question: 'O que está incluso no pacote completo do material?',
    answer: 'O pacote completo inclui: ✅ Student\'s Book (apostila principal em PDF) ✅ Student\'s Homework (apostila de exercícios em PDF) ✅ Apostila de Games (atividades lúdicas em PDF) ✅ Pasta com todos os áudios das atividades e lições ✅ Slides das aulas (bônus exclusivo para reforçar o conteúdo visual) ✅ Cronograma semanal de estudos (para te ajudar a se organizar e manter a consistência) ✅ Acesso ao aplicativo de games e revisão, para praticar de forma leve e divertida, onde e quando quiser.',
  },
  {
    question: 'As aulas são individuais ou em grupo?',
    answer: 'Ofereço tanto aulas individuais quanto pequenas turmas, com número reduzido de no máximo 6 alunos, garantindo um acompanhamento de qualidade em ambos os formatos.',
  },
  {
    question: 'Como funcionam as aulas?',
    answer: 'As aulas são 100% online, ao vivo, via Google Meet e seguem uma metodologia estruturada, com foco no desenvolvimento da fluência e na comunicação prática. Cada encontro é planejado para ser dinâmico, interativo e direcionado às suas necessidades no idioma.',
  },
  {
    question: 'Qual a duração das aulas?',
    answer: '🧑‍🤝‍🧑 Aulas em grupo: têm duração de 1h40, uma vez por semana. 👩‍🏫 Aulas individuais: a duração é flexível e definida de acordo com o combinado entre professor e aluno, conforme a necessidade e disponibilidade de cada um.',
  },
  {
    question: 'E se eu não puder comparecer à aula?',
    answer: 'Se você faltar, não perde o conteúdo! Você recebe: ▶️ A gravação da aula 📝 Um resumo escrito dos principais pontos abordados 💬 A transcrição do chat da aula, com tudo o que foi compartilhado e conversado.',
  },
  {
    question: 'Tenho suporte fora das aulas?',
    answer: 'Sim! Ofereço suporte via WhatsApp durante a semana para tirar dúvidas rápidas, enviar áudios, orientações e acompanhar seu progresso entre as aulas.',
  },
  {
    question: 'Tem taxa de matrícula?',
    answer: 'Não. Aqui você não paga matrícula!',
  },
  {
    question: 'Em quanto tempo eu fico fluente?',
    answer: 'O tempo para alcançar fluência depende de fatores como frequência de estudo, dedicação, prática fora das aulas e seu objetivo específico. Meu compromisso é te guiar nesse caminho, com clareza sobre seus avanços desde o primeiro dia.',
  },
  {
    question: 'Existe certificado?',
    answer: 'Sim! Ao concluir o curso, você recebe um certificado oficial que comprova sua dedicação e o domínio do conteúdo aprendido. Além disso, acompanho seu progresso com relatórios detalhados para garantir que você está sempre evoluindo.',
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-beige">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-green text-center mb-12 md:mb-16">
          Perguntas Frequentes
        </h2>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`rounded-lg overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? 'bg-dark-green shadow-xl'
                  : 'bg-light-gray shadow-lg hover:shadow-xl'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-6 flex justify-between items-center transition-colors duration-300 ${
                  openIndex === index
                    ? 'text-light-gray hover:bg-dark-green/90'
                    : 'text-dark-green hover:bg-light-gray/80'
                }`}
              >
                <span className="font-bold text-lg md:text-xl pr-4">
                  {item.question}
                </span>
                <div
                  className={`flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  <svg
                    className={`w-6 h-6 ${
                      openIndex === index ? 'text-light-yellow' : 'text-gold-yellow'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 animate-fade-in">
                  <div className="border-l-4 border-light-yellow pl-4">
                    <p className="text-light-gray leading-relaxed text-base md:text-lg whitespace-pre-line">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default FAQ;

