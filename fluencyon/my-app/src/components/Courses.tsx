import React, { useState } from 'react';

interface Course {
  id: string;
  name: string;
  level: string;
  description: string;
}

const courses: Course[] = [
  { id: 'a1', name: 'A1', level: 'Beginner', description: 'Inicie sua jornada no inglês com fundamentos sólidos' },
  { id: 'a2', name: 'A2', level: 'Elementary', description: 'Desenvolva suas habilidades básicas de comunicação' },
  { id: 'b1', name: 'B1', level: 'Intermediate', description: 'Aprimore sua fluência e confiança no idioma' },
  { id: 'b2-c1', name: 'B2-C1', level: 'Upper Intermediate to Advanced', description: 'Alcance fluência avançada e domínio completo' },
  { id: 'conv1', name: 'Conversation 1', level: 'Conversação', description: 'Pratique conversação em situações cotidianas' },
  { id: 'conv2', name: 'Conversation 2', level: 'Conversação Avançada', description: 'Eleve seu nível de conversação para temas complexos' },
  { id: 'travel', name: 'Travel English', level: 'Viagens', description: 'Prepare-se para viajar com confiança' },
  { id: 'business', name: 'Business English', level: 'Negócios', description: 'Inglês profissional para o ambiente corporativo' },
];

const Courses: React.FC = () => {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  return (
    <section id="courses" className="py-16 md:py-24 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-green text-center mb-12 md:mb-16">
          Nossos Cursos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`bg-light-gray rounded-lg p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                expandedCourse === course.id
                  ? 'border-4 border-gold-yellow shadow-2xl'
                  : 'border-2 border-transparent hover:border-gold-yellow shadow-lg'
              }`}
              onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gold-yellow rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-dark-green"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
              </div>

              {/* Level Badge */}
              <div className="text-center mb-3">
                <span className="inline-block bg-gold-yellow text-dark-green px-3 py-1 rounded-full text-sm font-semibold">
                  {course.level}
                </span>
              </div>

              {/* Course Name */}
              <h3 className="text-xl font-bold text-dark-green text-center mb-2">
                {course.name}
              </h3>

              {/* Description */}
              <p className="text-dark-green/80 text-sm text-center mb-4">
                {course.description}
              </p>

              {/* Expanded Content */}
              {expandedCourse === course.id && (
                <div className="mt-4 pt-4 border-t border-dark-green/20 animate-fade-in">
                  <p className="text-dark-green text-center font-medium">
                    Conteúdo programático em breve
                  </p>
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

export default Courses;

