import { MessageCircle, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { CONFIG } from "../constants/config";

export function CTA() {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${CONFIG.whatsapp.number}?text=${encodeURIComponent(CONFIG.whatsapp.message)}`, '_blank');
  };

  return (
    <section className="relative py-32 px-6 bg-[#f6f4f1] text-[#253439] overflow-hidden">
      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 border-2 border-[#fbb80f]/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 border-2 border-[#b29e84]/30 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-8 tracking-tight"
        >
          Comece Sua Transformação Hoje
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-[#7c898b] mb-14 max-w-2xl mx-auto"
        >
          Não perca mais tempo. Sua jornada para a fluência em inglês começa agora!
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Button 
            size="lg"
            onClick={handleWhatsApp}
            className="bg-[#fbb80f] hover:bg-[#253439] text-white px-10 py-7 text-lg transition-all duration-500 hover:shadow-2xl hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Fale Comigo no WhatsApp
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleWhatsApp}
            className="border-2 border-[#253439] text-[#253439] hover:bg-[#253439] hover:text-white px-10 py-7 text-lg transition-all duration-500 hover:shadow-xl"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Agende Uma Aula Experimental
          </Button>
        </motion.div>
      </div>
    </section>
  );
}