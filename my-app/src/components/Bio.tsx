import React from 'react';

const Bio: React.FC = () => {
  return (
    <section id="bio" className="py-16 md:py-24 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-green text-center mb-12 md:mb-16">
          Conheça Sua Professora
        </h2>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gold-yellow rounded-full transform rotate-6 opacity-30"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gold-yellow shadow-xl">
                <div className="w-full h-full bg-gradient-to-br from-beige to-dark-gray flex items-center justify-center text-6xl md:text-8xl text-light-gray">
                  JO
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-lg md:text-xl text-dark-green leading-relaxed mb-8">
              Sou <strong>Jamile Oliveira</strong>, professora de inglês há 15 anos, especializada em desenvolvimento de fluência e em transformar aprendizado em confiança para se comunicar. Formada em Comunicação Social e Letras – Inglês, e com 4 anos de experiência vivendo na Flórida, fundei minha escola digital, onde ensino de forma estruturada, com metodologia clara, foco no uso real do inglês e acompanhamento personalizado para que você conquiste seus objetivos!
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-beige/50 rounded-lg p-4 text-center border-2 border-gold-yellow/30">
                <div className="text-3xl md:text-4xl font-bold text-dark-green">15</div>
                <div className="text-sm md:text-base text-dark-green/80">Anos de Experiência</div>
              </div>
              <div className="bg-beige/50 rounded-lg p-4 text-center border-2 border-gold-yellow/30">
                <div className="text-3xl md:text-4xl font-bold text-dark-green">4</div>
                <div className="text-sm md:text-base text-dark-green/80">Anos na Flórida</div>
              </div>
              <div className="bg-beige/50 rounded-lg p-4 text-center border-2 border-gold-yellow/30">
                <div className="text-3xl md:text-4xl font-bold text-dark-green">100%</div>
                <div className="text-sm md:text-base text-dark-green/80">Online</div>
              </div>
              <div className="bg-beige/50 rounded-lg p-4 text-center border-2 border-gold-yellow/30">
                <div className="text-3xl md:text-4xl font-bold text-dark-green">✓</div>
                <div className="text-sm md:text-base text-dark-green/80">Certificado</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bio;

