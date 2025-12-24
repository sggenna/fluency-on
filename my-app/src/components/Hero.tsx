import React from 'react';

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
      className="relative min-h-screen flex items-center justify-center bg-dark-green pt-16 md:pt-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #f6f4f1 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Accent underline */}
          <div className="mb-6 flex justify-center">
            <div className="h-1 w-24 bg-light-yellow"></div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-light-gray mb-6 leading-tight">
            Fluency On
          </h1>
          <div className="text-xl md:text-2xl lg:text-3xl text-light-gray mb-8 font-medium">
            Transforme Seu Inglês em<br />
            <span className="text-light-yellow">Confiança Real</span>
          </div>
          
          <p className="text-lg md:text-xl text-light-gray/90 mb-10 max-w-3xl mx-auto">
            15 anos de experiência | Escola digital especializada em fluência
          </p>

          <button
            onClick={() => scrollToSection('#package')}
            className="bg-bright-red hover:bg-bright-red/90 text-light-gray font-bold py-4 px-8 md:py-5 md:px-12 rounded-lg text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Comece Sua Jornada Agora
          </button>
        </div>

      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Hero;

