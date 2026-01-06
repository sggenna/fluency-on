import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export function About() {
  const stats = [
    { number: "15", label: "Anos de Experiência" },
    { number: "4", label: "Anos na Flórida" },
    { number: "100%", label: "Online" },
    { icon: <CheckCircle className="w-8 h-8" />, label: "Certificado" }
  ];

  return (
    <section className="py-32 px-6 bg-white" id="sobre">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Left side - Profile */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-white border-2 border-[#b29e84]/30 rounded-none p-12 text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#fbb80f]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="w-48 h-48 mx-auto mb-8 bg-[#fbb80f] flex items-center justify-center relative"
                >
                  <span className="text-8xl font-bold text-white">JO</span>
                </motion.div>
                <h3 className="text-3xl font-bold text-[#253439] mb-6 tracking-tight">Conheça Sua Professora</h3>
                <div className="w-24 h-0.5 bg-[#fbb80f] mx-auto"></div>
              </div>
            </div>
          </motion.div>
          
          {/* Right side - Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg text-[#253439] mb-12 leading-relaxed">
              Sou <strong className="text-[#fbb80f] font-semibold">Jamile Oliveira</strong>, professora de inglês há 15 anos, 
              especializada em desenvolvimento de fluência e em transformar aprendizado em confiança para se comunicar. 
              Formada em Comunicação Social e Letras – Inglês, e com 4 anos de experiência vivendo na Flórida, 
              fundei minha escola digital, onde ensino de forma estruturada, com metodologia clara, foco no uso real 
              do inglês e acompanhamento personalizado para que você conquiste seus objetivos!
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  className="bg-[#f6f4f1] p-8 text-center border-l-4 border-[#fbb80f] transition-all duration-300"
                >
                  {stat.icon ? (
                    <div className="text-[#fbb80f] flex justify-center mb-3">
                      {stat.icon}
                    </div>
                  ) : (
                    <div className="text-5xl font-bold text-[#fbb80f] mb-3">
                      {stat.number}
                    </div>
                  )}
                  <div className="text-sm text-[#7c898b] font-medium uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}