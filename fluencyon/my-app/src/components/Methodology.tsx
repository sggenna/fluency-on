import React from 'react';
import ScrollReveal from './ScrollReveal';

interface MethodologyItem {
  title: string;
  description: string;
  icon: string;
}

const methodologyItems: MethodologyItem[] = [
  {
    title: 'Abordagem Comunicativa',
    description: 'Uso prático do inglês desde a primeira aula',
    icon: '💬',
  },
  {
    title: 'Aprendizagem Ativa',
    description: 'Participação constante através de atividades dinâmicas',
    icon: '🎯',
  },
  {
    title: 'Task-Based Learning',
    description: 'Ensino baseado em situações reais e objetivos claros',
    icon: '📋',
  },
  {
    title: 'Gamificação',
    description: 'Jogos e desafios que tornam o aprendizado mais eficiente',
    icon: '🎮',
  },
];

const Methodology: React.FC = () => {
  return (
    <section id="methodology" className="py-16 md:py-24 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-green text-center mb-12 md:mb-16">
          Nossa Metodologia de Ensino
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {methodologyItems.map((item, index) => (
            <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
              <div
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-light-yellow h-full"
              >
                <div className="text-5xl mb-4 text-center">{item.icon}</div>
                <h3 className="text-xl font-bold text-dark-green mb-3 text-center">
                  {item.title}
                </h3>
                <p className="text-dark-green/80 text-center">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-dark-green text-center leading-relaxed">
            Tudo isso dentro de uma jornada de aprendizado bem estruturada, com material exclusivo, que combina teoria, prática e desenvolvimento das quatro habilidades: <strong>fala, escuta, leitura e escrita</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Methodology;

