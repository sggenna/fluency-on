import React from 'react';
import { CONFIG } from '../constants/config';

const FinalCTA: React.FC = () => {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${CONFIG.whatsapp.number}?text=${encodeURIComponent(CONFIG.whatsapp.message)}`, '_blank');
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="final-cta"
      className="relative py-20 md:py-32 bg-bright-red overflow-hidden"
    >
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #f6f4f1 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-light-gray mb-6 md:mb-8">
          Comece Sua Transformação Hoje
        </h2>
        <p className="text-xl md:text-2xl text-light-gray/90 mb-10 md:mb-12">
          Não perca mais tempo. Sua jornada para a fluência em inglês começa agora!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
          <button
            onClick={handleWhatsApp}
            className="bg-gold-yellow hover:bg-gold-yellow/90 text-dark-green font-bold py-4 px-8 md:py-5 md:px-12 rounded-lg text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            Fale Comigo no WhatsApp
          </button>
          <button
            onClick={() => scrollToSection('#calendar')}
            className="bg-transparent border-2 border-dark-green hover:bg-dark-green text-light-gray hover:text-light-gray font-bold py-4 px-8 md:py-5 md:px-12 rounded-lg text-lg md:text-xl transition-all duration-300 transform hover:scale-105"
          >
            Agende Uma Aula Experimental
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

