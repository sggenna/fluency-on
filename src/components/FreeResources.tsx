import { useState } from "react";
import { Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export function FreeResources() {
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");

  const handleDownload1 = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock download functionality
    alert(`E-book de Fonética será enviado para: ${email1}`);
    setEmail1("");
  };

  const handleDownload2 = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock download functionality
    alert(`100 Expressões será enviado para: ${email2}`);
    setEmail2("");
  };

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-[#253439] mb-6 tracking-tight">
            Recursos Gratuitos
          </h2>
          <div className="w-24 h-0.5 bg-[#fbb80f] mx-auto mb-6"></div>
          <p className="text-lg text-[#7c898b] max-w-2xl mx-auto">
            Comece sua jornada com materiais exclusivos
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Free Resource 1 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8 }}
          >
            <Card className="border-2 border-[#fbee0f] bg-white shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardHeader>
                <div className="inline-block px-4 py-1.5 bg-[#fbee0f] text-[#253439] text-sm font-bold mb-6 w-fit uppercase tracking-wider">
                  Grátis
                </div>
                <CardTitle className="text-3xl text-[#253439] mb-3">
                  E-book de Fonética Grátis
                </CardTitle>
                <CardDescription className="text-[#7c898b] text-base">
                  Aprenda a pronunciar corretamente desde o início
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDownload1} className="space-y-5">
                  <Input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={email1}
                    onChange={(e) => setEmail1(e.target.value)}
                    required
                    className="border-2 border-[#b29e84]/30 focus:border-[#fbee0f] bg-white py-6 transition-all duration-300"
                  />
                  <Button 
                    type="submit"
                    className="w-full bg-[#fbee0f] hover:bg-[#253439] text-[#253439] hover:text-white py-6 transition-all duration-500 hover:shadow-xl"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Agora
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Free Resource 2 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -8 }}
          >
            <Card className="border-2 border-[#fbb80f] bg-white shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardHeader>
                <div className="inline-block px-4 py-1.5 bg-[#fbb80f] text-white text-sm font-bold mb-6 w-fit uppercase tracking-wider">
                  Grátis
                </div>
                <CardTitle className="text-3xl text-[#253439] mb-3">
                  100 Expressões de Inglês Básico para Iniciantes
                </CardTitle>
                <CardDescription className="text-[#7c898b] text-base">
                  Expressões essenciais para começar a se comunicar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDownload2} className="space-y-5">
                  <Input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={email2}
                    onChange={(e) => setEmail2(e.target.value)}
                    required
                    className="border-2 border-[#b29e84]/30 focus:border-[#fbb80f] bg-white py-6 transition-all duration-300"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-[#fbb80f] hover:bg-[#253439] text-[#253439] hover:text-white py-6 transition-all duration-500 hover:shadow-xl"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Agora
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}