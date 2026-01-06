import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { motion } from "framer-motion";

export function CourseContent() {
  const modules = [
    {
      level: "A1",
      title: "Beginner",
      content: "Conteúdo programático será adicionado em breve"
    },
    {
      level: "A2",
      title: "Elementary",
      content: "Conteúdo programático será adicionado em breve"
    },
    {
      level: "B1",
      title: "Intermediate",
      content: "Conteúdo programático será adicionado em breve"
    },
    {
      level: "B2-C1",
      title: "Upper Intermediate to Advanced",
      content: "Conteúdo programático será adicionado em breve"
    },
    {
      level: "Conversation 1",
      title: "Conversação",
      content: "Conteúdo programático será adicionado em breve"
    },
    {
      level: "Conversation 2",
      title: "Conversação Avançada",
      content: "Conteúdo programático será adicionado em breve"
    },
    {
      level: "Travel English",
      title: "Viagens",
      content: "Conteúdo programático será adicionado em breve"
    },
    {
      level: "Business English",
      title: "Negócios",
      content: "Conteúdo programático será adicionado em breve"
    }
  ];

  return (
    <section className="py-32 px-6 bg-white" id="conteudo-programatico">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-[#253439] mb-6 tracking-tight">
            Conteúdo Programático
          </h2>
          <div className="w-24 h-0.5 bg-[#fbb80f] mx-auto mb-6"></div>
          <p className="text-lg text-[#7c898b] max-w-2xl mx-auto">
            Explore o conteúdo detalhado de cada módulo
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-[#f6f4f1] border-2 border-[#b29e84]/30 rounded-lg overflow-hidden hover:border-[#fbb80f] transition-all duration-300 shadow-lg hover:shadow-xl">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`module-${index}`} className="border-none">
                    <AccordionTrigger className="px-6 py-6 hover:no-underline">
                      <div className="flex flex-col items-center text-center w-full">
                        <div className="w-20 h-20 bg-[#fbb80f] text-[#253439] font-bold text-xl rounded-lg flex items-center justify-center mb-3">
                          {module.level}
                        </div>
                        <h3 className="text-lg font-bold text-[#253439]">
                          {module.title}
                        </h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-[#7c898b] text-center">
                      {module.content}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

