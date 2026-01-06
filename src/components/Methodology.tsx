import { MessageCircle, Target, ClipboardList, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";

export function Methodology() {
  const methods = [
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: "Abordagem Comunicativa",
      description: "Uso prático do inglês desde a primeira aula"
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Aprendizagem Ativa",
      description: "Participação constante através de atividades dinâmicas"
    },
    {
      icon: <ClipboardList className="w-12 h-12" />,
      title: "Task-Based Learning",
      description: "Ensino baseado em situações reais e objetivos claros"
    },
    {
      icon: <Gamepad2 className="w-12 h-12" />,
      title: "Gamificação",
      description: "Jogos e desafios que tornam o aprendizado mais eficiente"
    }
  ];

  return (
    <section className="py-32 px-6 bg-white" id="metodologia">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-[#253439] mb-6 tracking-tight">
            Nossa Metodologia de Ensino
          </h2>
          <div className="w-24 h-0.5 bg-[#fbb80f] mx-auto mb-6"></div>
          <p className="text-lg text-[#7c898b] max-w-2xl mx-auto">
            Uma abordagem moderna e eficaz para o aprendizado de inglês
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {methods.map((method, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center justify-center w-28 h-28 bg-[#fbb80f] mb-6 text-white shadow-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#253439] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <div className="relative z-10">{method.icon}</div>
              </motion.div>
              <h3 className="text-xl font-bold text-[#253439] mb-4">
                {method.title}
              </h3>
              <p className="text-[#7c898b] leading-relaxed">
                {method.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-[#f6f4f1] p-8 md:p-12 border-l-4 border-[#fbb80f] shadow-xl">
            <p className="text-lg text-[#253439] leading-relaxed mb-4">
              Minha metodologia é baseada na <strong className="text-[#fbb80f]">Abordagem Comunicativa</strong>, que prioriza o uso prático do inglês desde a primeira aula. O foco é desenvolver sua capacidade de se comunicar de forma natural, entendendo e aplicando o idioma em situações do dia a dia.
            </p>
            <p className="text-lg text-[#253439] leading-relaxed mb-4">
              Também aplico a <strong className="text-[#fbb80f]">Aprendizagem Ativa</strong>, onde você participa o tempo todo por meio de atividades dinâmicas, conversação, simulações e exercícios práticos.
            </p>
            <p className="text-lg text-[#253439] leading-relaxed mb-4">
              Além disso, sigo os princípios da <strong className="text-[#fbb80f]">Task-Based Learning</strong>, ou seja, do ensino baseado em tarefas. Cada aula tem objetivos claros, sempre focando em situações reais e no uso funcional do inglês — como se apresentar, falar sobre rotinas, experiências e interagir em diferentes contextos.
            </p>
            <p className="text-lg text-[#253439] leading-relaxed mb-4">
              A <strong className="text-[#fbb80f]">Gamificação</strong> também faz parte da nossa rotina, com jogos e desafios que tornam o aprendizado mais leve, dinâmico e eficiente.
            </p>
            <p className="text-xl text-center text-[#253439] leading-relaxed font-semibold mt-6 pt-6 border-t border-[#b29e84]/30">
              Tudo isso dentro de uma jornada de aprendizado bem estruturada, com material exclusivo, que combina teoria, prática e desenvolvimento das quatro habilidades:{" "}
              <span className="font-bold text-[#fbb80f]">fala, escuta, leitura e escrita.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
