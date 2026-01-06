import React from 'react';

const PackageValue: React.FC = () => {
  const includedItems = [
    "Student's Book (apostila principal em PDF)",
    "Student's Homework (apostila de exercícios em PDF)",
    "Apostila de Games (atividades lúdicas em PDF)",
    "Pasta com todos os áudios das atividades",
    "Slides das aulas (bônus exclusivo)",
    "Cronograma semanal de estudos",
    "Acesso ao aplicativo de games e revisão",
  ];

  return (
    <section id="package" className="py-16 md:py-24 bg-dark-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-light-gray text-center mb-12 md:mb-16">
          Pacote Completo
        </h2>

        {/* Highlight Box */}
        <div className="bg-gold-yellow rounded-2xl p-8 md:p-12 mb-12 text-center shadow-2xl">
          <div className="text-4xl md:text-5xl font-bold text-dark-green mb-4">
            Aulas em grupo por apenas
          </div>
          <div className="text-5xl md:text-7xl font-extrabold text-dark-green">
            R$ 200,00/mês
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-light-gray/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-light-gray mb-8 text-center">
            O que está incluído:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {includedItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-6 h-6 text-light-yellow"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-light-gray text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Material Cost Card */}
        <div className="bg-dark-gray rounded-2xl p-8 md:p-12 text-center shadow-2xl max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-light-gray mb-6">
            Material Digital Completo
          </h3>
          <div className="text-3xl md:text-4xl font-bold text-light-gray mb-4">
            R$ 137,00 por módulo
          </div>
          <p className="text-light-gray/90 text-lg">
            À vista no ato da matrícula ou parcelado em 6 meses
          </p>
        </div>
      </div>
    </section>
  );
};

export default PackageValue;



