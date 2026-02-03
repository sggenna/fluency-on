import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { CONFIG } from "../constants/config";

export function Pricing() {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${CONFIG.whatsapp.number}?text=${encodeURIComponent(CONFIG.whatsapp.message)}`, '_blank');
  };
  const packageFeatures = [
    "Student's Book (apostila principal em PDF)",
    "Student's Homework (apostila de exercícios em PDF)",
    "Apostila de Games (atividades lúdicas em PDF)",
    "Pasta com todos os áudios das atividades",
    "Slides das aulas (bônus exclusivo)",
    "Cronograma semanal de estudos",
    "Acesso ao aplicativo de games e revisão"
  ];

  return (
    <section className="py-32 px-6 bg-[#f6f4f1]" id="precos">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-[#253439] mb-6 tracking-tight">
            Planos e Investimento
          </h2>
          <div className="w-24 h-0.5 bg-[#fbb80f] mx-auto mb-6"></div>
          <p className="text-lg text-[#7c898b] max-w-2xl mx-auto">
            Escolha o plano ideal para sua jornada de aprendizado
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Package 1 - Group Classes */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -12 }}
          >
            <Card className="border-4 border-[#fbb80f] bg-white shadow-2xl relative overflow-hidden h-full">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#fbb80f]"></div>
              <div className="absolute top-6 right-6 bg-[#fbb80f] text-white px-6 py-2 text-sm font-bold uppercase tracking-wider">
                Popular
              </div>
              <CardHeader className="text-center pt-16 pb-8">
                <CardTitle className="text-4xl text-[#253439] mb-4 tracking-tight">
                  Pacote Completo
                </CardTitle>
                <CardDescription className="text-[#7c898b] text-lg mb-6">
                  Aulas em grupo por apenas
                </CardDescription>
                <div className="relative inline-block">
                  <div className="text-7xl font-bold text-[#fbb80f]">
                    R$ 200<span className="text-3xl text-[#7c898b]">/mês</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-10">
                <div className="mb-8">
                  <h4 className="font-bold text-[#253439] mb-6 text-lg uppercase tracking-wider">O que está incluído:</h4>
                  <ul className="space-y-4">
                    {packageFeatures.map((feature, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <Check className="w-5 h-5 text-[#fbb80f] flex-shrink-0 mt-0.5" />
                        <span className="text-[#253439]">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <Button
                  onClick={handleWhatsApp}
                  className="w-full bg-[#fbb80f] hover:bg-[#253439] text-white py-7 text-lg transition-all duration-500 hover:shadow-2xl"
                >
                  Comece Agora
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Package 2 - Digital Material */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -12 }}
          >
            <Card className="border-2 border-[#b29e84]/40 bg-white shadow-xl h-full">
              <CardHeader className="text-center pt-10">
                <CardTitle className="text-4xl text-[#253439] mb-4 tracking-tight">
                  Material Digital Completo
                </CardTitle>
                <CardDescription className="text-[#7c898b] text-lg mb-6">
                  À vista no ato da matrícula ou parcelado em 6 meses
                </CardDescription>
                <div className="text-7xl font-bold text-[#253439]">
                  R$ 137<span className="text-3xl text-[#7c898b]">/módulo</span>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-10">
                <div className="mb-8">
                  <p className="text-[#7c898b] mb-10 leading-relaxed text-lg">
                    Acesso completo ao material didático digital de cada módulo para estudar no seu ritmo.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#b29e84] flex-shrink-0 mt-0.5" />
                      <span className="text-[#253439]">Material completo em PDF</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#b29e84] flex-shrink-0 mt-0.5" />
                      <span className="text-[#253439]">Áudios das atividades</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#b29e84] flex-shrink-0 mt-0.5" />
                      <span className="text-[#253439]">Acesso vitalício</span>
                    </li>
                  </ul>
                </div>
                <Button
                  variant="outline"
                  onClick={handleWhatsApp}
                  className="w-full border-2 border-[#253439] text-[#253439] hover:bg-[#253439] hover:text-white py-7 text-lg transition-all duration-500 hover:shadow-xl"
                >
                  Saiba Mais
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}