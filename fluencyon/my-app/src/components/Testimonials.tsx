import React, { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Maria Silva',
    text: 'A metodologia da Jamile é incrível! Em poucos meses já senti uma diferença enorme na minha confiança ao falar inglês. As aulas são dinâmicas e o material é muito completo.',
    rating: 5,
  },
  {
    id: 2,
    name: 'João Santos',
    text: 'Finalmente encontrei uma professora que realmente entende como ensinar inglês de forma prática. O suporte via WhatsApp é um diferencial enorme!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ana Costa',
    text: 'As aulas em grupo são perfeitas - conseguimos praticar muito e ainda temos atenção individualizada. Recomendo muito!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Pedro Oliveira',
    text: 'Consegui evoluir do nível básico para intermediário em menos de um ano. A estrutura do curso e o acompanhamento fazem toda a diferença.',
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-dark-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-light-gray text-center mb-12 md:mb-16">
          O Que Meus Alunos Dizem
        </h2>

        <div className="max-w-4xl mx-auto relative">
          {/* Quote Mark */}
          <div className="absolute -top-8 -left-8 text-light-yellow text-8xl md:text-9xl opacity-30 font-serif">
            "
          </div>

          {/* Testimonial Card */}
          <div className="bg-light-gray rounded-2xl p-8 md:p-12 shadow-2xl relative">
            <div className="flex justify-center mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 md:w-8 md:h-8 text-gold-yellow"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className="text-dark-green text-lg md:text-xl leading-relaxed mb-8 text-center">
              "{testimonials[currentIndex].text}"
            </p>

            <div className="text-center">
              <p className="text-dark-green font-bold text-xl md:text-2xl">
                {testimonials[currentIndex].name}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-gold-yellow hover:bg-gold-yellow/90 text-dark-green p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-gold-yellow hover:bg-gold-yellow/90 text-dark-green p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
            aria-label="Next testimonial"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gold-yellow w-8'
                    : 'bg-light-gray/50 hover:bg-light-gray/75'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

