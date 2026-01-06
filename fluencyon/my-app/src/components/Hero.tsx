import React from 'react';
import ScrollReveal from './ScrollReveal';

const Hero: React.FC = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-dark-green pt-16 md:pt-20 overflow-hidden"
    >
      {/* Background Pattern - Subtle & Professional */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #f6f4f1 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal animation="fade-up">
          {/* Accent Badge */}
          <div className="mb-8 flex justify-center">
            <span className="inline-block py-1 px-3 rounded-full bg-beige/20 border border-beige/30 text-beige text-sm font-semibold tracking-wider uppercase backdrop-blur-sm">
              Escola Digital de Inglês
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-light-gray mb-6 leading-tight tracking-tight">
            Fluency On
          </h1>
          
          <div className="text-2xl md:text-3xl lg:text-4xl text-light-gray mb-10 font-light max-w-4xl mx-auto">
            Transforme Seu Inglês em <br className="hidden md:block" />
            <span className="text-gold-yellow font-semibold relative inline-block mt-2 md:mt-0">
              Confiança Real
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-gold-yellow opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </div>
          
          <p className="text-lg md:text-xl text-light-gray/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            15 anos de experiência ensinando você a se comunicar com o mundo.
            <br />Metodologia comprovada, foco em conversação e resultados reais.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('#package')}
              className="w-full sm:w-auto bg-gold-yellow hover:bg-gold-yellow/90 text-dark-green font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-gold-yellow/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              Comece Sua Jornada
            </button>
            <button
              onClick={() => scrollToSection('#bio')}
              className="w-full sm:w-auto bg-transparent border-2 border-light-gray/30 hover:border-light-gray/60 text-light-gray font-semibold py-4 px-10 rounded-full text-lg transition-all duration-300 hover:bg-light-gray/5"
            >
              Conheça a Professora
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gold-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;

