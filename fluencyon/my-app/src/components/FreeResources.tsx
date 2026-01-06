import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

interface Resource {
  id: string;
  title: string;
  description: string;
}

const resources: Resource[] = [
  {
    id: 'phonetics',
    title: 'E-book de Fonética Grátis',
    description: 'Aprenda a pronunciar corretamente desde o início',
  },
  {
    id: 'expressions',
    title: '100 Expressões de Inglês Básico para Iniciantes',
    description: 'Expressões essenciais para começar a se comunicar',
  },
];

const FreeResources: React.FC = () => {
  const [email, setEmail] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState<{ [key: string]: boolean }>({});

  const handleSubmit = (e: React.FormEvent, resourceId: string) => {
    e.preventDefault();
    if (email[resourceId] && email[resourceId].includes('@')) {
      setSubmitted({ ...submitted, [resourceId]: true });
      // Here you would typically send the email to your backend
      console.log(`Email captured for ${resourceId}:`, email[resourceId]);
    }
  };

  return (
    <section id="resources" className="py-16 md:py-24 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-green text-center mb-12 md:mb-16">
          Recursos Gratuitos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {resources.map((resource, index) => (
            <ScrollReveal key={resource.id} animation="fade-up" delay={index * 100} className="h-full">
              <div
                className="bg-light-gray rounded-2xl p-8 shadow-xl relative overflow-hidden h-full flex flex-col"
              >
                {/* FREE Badge */}
                <div className="absolute top-4 right-4 bg-dark-green text-white px-4 py-2 rounded-full font-bold text-sm md:text-base shadow-lg border border-gold-yellow/30">
                  GRÁTIS
                </div>

                <div className="mt-8 flex-1 flex flex-col">
                  <h3 className="text-2xl md:text-3xl font-bold text-dark-green mb-4">
                    {resource.title}
                  </h3>
                  <p className="text-dark-green/80 mb-6 text-lg flex-1">
                    {resource.description}
                  </p>

                  {!submitted[resource.id] ? (
                    <form
                      onSubmit={(e) => handleSubmit(e, resource.id)}
                      className="space-y-4 mt-auto"
                    >
                      <input
                        type="email"
                        value={email[resource.id] || ''}
                        onChange={(e) =>
                          setEmail({ ...email, [resource.id]: e.target.value })
                        }
                        placeholder="Seu melhor e-mail"
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-dark-green/20 focus:border-gold-yellow focus:outline-none text-dark-green text-lg"
                      />
                      <button
                        type="submit"
                        className="w-full bg-gold-yellow hover:bg-gold-yellow/90 text-dark-green font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        Baixar Agora
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-4 mt-auto">
                      <div className="text-4xl mb-4">✓</div>
                      <p className="text-dark-green font-semibold text-lg">
                        E-mail confirmado! Verifique sua caixa de entrada.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};


export default FreeResources;

