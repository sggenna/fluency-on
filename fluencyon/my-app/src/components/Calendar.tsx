import React from 'react';
import ScrollReveal from './ScrollReveal';

interface TimeSlot {
  time: string;
  level: string;
  available: boolean;
}

const Calendar: React.FC = () => {
  const timeSlots: TimeSlot[] = [
    { time: 'Segunda, 19:00', level: 'B1', available: true },
    { time: 'Terça, 19:00', level: 'A2', available: true },
    { time: 'Quarta, 19:00', level: 'Conversation', available: true },
    { time: 'Quinta, 19:00', level: 'B2-C1', available: false },
    { time: 'Sexta, 19:00', level: 'A1', available: true },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="calendar" className="py-16 md:py-24 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-green text-center mb-8">
          Turmas Abertas
        </h2>

        {/* Highlight Badge */}
        <ScrollReveal animation="fade-up">
          <div className="flex justify-center mb-12">
            <div className="bg-dark-green text-light-gray px-6 py-3 rounded-full font-bold text-lg md:text-xl shadow-lg border-2 border-gold-yellow/30">
              Matrículas abertas para turmas de julho
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {timeSlots.map((slot, index) => (
            <div
              key={index}
              className={`bg-beige rounded-lg p-6 shadow-lg ${
                slot.available ? 'border-2 border-gold-yellow' : 'opacity-60'
              }`}
            >
              <div className="text-center">
                <div className="text-xl font-bold text-dark-green mb-2">
                  {slot.time}
                </div>
                <div className="text-dark-green/80 mb-4">{slot.level}</div>
                {slot.available ? (
                  <div className="inline-block bg-gold-yellow text-dark-green px-4 py-2 rounded-full text-sm font-semibold">
                    Vagas Disponíveis
                  </div>
                ) : (
                  <div className="inline-block bg-dark-gray text-light-gray px-4 py-2 rounded-full text-sm font-semibold">
                    Lotado
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <ScrollReveal animation="fade-up" delay={200}>
          <div className="text-center">
            <button
              onClick={() => scrollToSection('#final-cta')}
              className="bg-gold-yellow hover:bg-gold-yellow/90 text-dark-green font-bold py-4 px-8 md:py-5 md:px-12 rounded-lg text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Reserve Sua Vaga
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Calendar;

