import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { CONFIG } from "../constants/config";

export function Hero() {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${CONFIG.whatsapp.number}?text=${encodeURIComponent(CONFIG.whatsapp.message)}`, '_blank');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <section className="relative bg-[#f6f4f1] text-[#253439] py-32 md:py-48 px-6 overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 right-20 w-96 h-96 border-2 border-[#fbb80f]/20 rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-72 h-72 border-2 border-[#b29e84]/20 rounded-full"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, -90, 0]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-8 px-6 py-2 bg-white rounded-full border border-[#fbb80f]/30 shadow-sm"
        >
          <span className="text-[#fbb80f] font-medium tracking-widest text-sm uppercase">Fluency On</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight"
        >
          Transforme Seu Inglês em<br />
          <span className="relative inline-block mt-2">
            <span className="text-[#fbb80f]">Confiança Real</span>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-[#fbb80f]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            />
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xl md:text-2xl text-[#7c898b] mb-14 max-w-3xl mx-auto font-light"
        >
          15 anos de experiência | Escola digital especializada em fluência
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <Button 
            size="lg" 
            onClick={handleWhatsApp}
            className="bg-[#fbb80f] hover:bg-[#253439] text-white px-10 py-7 text-lg transition-all duration-500 hover:shadow-2xl hover:scale-105"
          >
            Comece Sua Jornada Agora
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => scrollToSection('#sobre')}
            className="border-2 border-[#253439] text-[#253439] hover:bg-[#253439] hover:text-white px-10 py-7 text-lg transition-all duration-500 hover:shadow-xl"
          >
            Conheça Sua Professora
          </Button>
        </motion.div>
      </div>
    </section>
  );
}