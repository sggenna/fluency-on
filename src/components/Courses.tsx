import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";

export function Courses() {
  const courses = [
    {
      title: "Beginner",
      level: "A1",
      description: "Inicie sua jornada no inglês com fundamentos sólidos"
    },
    {
      title: "Elementary",
      level: "A2",
      description: "Desenvolva suas habilidades básicas de comunicação"
    },
    {
      title: "Intermediate",
      level: "B1",
      description: "Aprimore sua fluência e confiança no idioma"
    },
    {
      title: "Upper Intermediate to Advanced",
      level: "B2-C1",
      description: "Alcance fluência avançada e domínio completo"
    },
    {
      title: "Conversação",
      level: "Conversation 1",
      description: "Pratique conversação em situações cotidianas"
    },
    {
      title: "Conversação Avançada",
      level: "Conversation 2",
      description: "Eleve seu nível de conversação para temas complexos"
    },
    {
      title: "Viagens",
      level: "Travel English",
      description: "Prepare-se para viajar com confiança"
    },
    {
      title: "Negócios",
      level: "Business English",
      description: "Inglês profissional para o ambiente corporativo"
    }
  ];

  return (
    <section className="py-32 px-6 bg-[#f6f4f1]" id="cursos">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-[#253439] mb-6 tracking-tight">
            Nossos Cursos
          </h2>
          <div className="w-24 h-0.5 bg-[#fbb80f] mx-auto mb-6"></div>
          <p className="text-lg text-[#7c898b] max-w-2xl mx-auto">
            Escolha o curso ideal para o seu nível e objetivos
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -12 }}
            >
              <Card 
                className="border-none bg-white shadow-lg hover:shadow-2xl transition-all duration-500 h-full group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#fbb80f] translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <CardHeader className="relative z-10">
                  <div className="inline-block px-4 py-1 bg-[#fbb80f] group-hover:bg-white text-white group-hover:text-[#fbb80f] rounded-full text-sm font-semibold mb-4 transition-all duration-500 w-fit">
                    {course.level}
                  </div>
                  <CardTitle className="text-[#253439] group-hover:text-white transition-colors duration-500 text-xl">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-[#7c898b] group-hover:text-white/90 transition-colors duration-500">
                    {course.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}