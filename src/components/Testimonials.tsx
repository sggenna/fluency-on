import { Quote } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function Testimonials() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#253439] mb-4">
            O Que Meus Alunos Dizem
          </h2>
          <div className="w-24 h-1 bg-[#fbb80f] mx-auto"></div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-[#fbb80f]/30 bg-gradient-to-br from-[#fbb80f]/5 to-white shadow-lg">
            <CardContent className="p-8">
              <Quote className="w-12 h-12 text-[#fbb80f] mb-4" />
              <p className="text-lg text-[#253439] mb-6 leading-relaxed italic">
                "A metodologia da Jamile é incrível! Em poucos meses já senti uma diferença enorme 
                na minha confiança ao falar inglês. As aulas são dinâmicas e o material é muito completo."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#fbb80f] rounded-full flex items-center justify-center">
                  <span className="text-[#253439] font-bold">MS</span>
                </div>
                <div>
                  <p className="font-semibold text-[#253439]">Maria Silva</p>
                  <p className="text-sm text-[#7c898b]">Aluna B1</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
