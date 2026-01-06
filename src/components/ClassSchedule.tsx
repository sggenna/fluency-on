import { Calendar, Clock, Users, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { CONFIG } from "../constants/config";

export function ClassSchedule() {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${CONFIG.whatsapp.number}?text=${encodeURIComponent(CONFIG.whatsapp.message)}`, '_blank');
  };
  const classes = [
    { day: "Segunda", time: "19:00", level: "B1", status: "available" },
    { day: "Terça", time: "19:00", level: "A2", status: "available" },
    { day: "Quarta", time: "19:00", level: "Conversation", status: "available" },
    { day: "Quinta", time: "19:00", level: "B2-C1", status: "full" },
    { day: "Sexta", time: "19:00", level: "A1", status: "available" }
  ];

  return (
    <section className="py-20 px-6 bg-[#f6f4f1]" id="turmas">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#253439] mb-4">
            Turmas Abertas
          </h2>
          <p className="text-xl text-[#7c898b] mb-4">
            Matrículas abertas para turmas de julho
          </p>
          <div className="w-24 h-1 bg-[#fbb80f] mx-auto"></div>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls, index) => (
            <Card 
              key={index}
              className={`border-2 ${
                cls.status === "full" 
                  ? "border-[#7c898b]/30 bg-gray-100" 
                  : "border-[#fbb80f] bg-white hover:shadow-lg"
              } transition-all duration-300`}
            >
              <CardHeader>
                <CardTitle className="text-[#253439] flex items-center justify-between">
                  <span>{cls.day}</span>
                  {cls.status === "full" && (
                    <span className="text-sm px-2 py-1 bg-[#7c898b] text-white rounded-full">
                      Lotado
                    </span>
                  )}
                  {cls.status === "available" && (
                    <span className="text-sm px-2 py-1 bg-[#fbb80f] text-[#253439] rounded-full">
                      Vagas
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-[#7c898b]">
                  <Clock className="w-5 h-5" />
                  <span>{cls.time}</span>
                </div>
                <div className="flex items-center gap-3 text-[#7c898b]">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold text-[#fbb80f]">{cls.level}</span>
                </div>
                <div className="flex items-center gap-3 text-[#7c898b]">
                  {cls.status === "full" ? (
                    <>
                      <XCircle className="w-5 h-5" />
                      <span>Vagas Esgotadas</span>
                    </>
                  ) : (
                    <>
                      <Users className="w-5 h-5" />
                      <span>Vagas Disponíveis</span>
                    </>
                  )}
                </div>
                <Button 
                  disabled={cls.status === "full"}
                  onClick={cls.status === "available" ? handleWhatsApp : undefined}
                  className={`w-full ${
                    cls.status === "full"
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#fbb80f] hover:bg-[#fbb80f]/90 text-[#253439]"
                  }`}
                >
                  {cls.status === "full" ? "Turma Lotada" : "Reserve Sua Vaga"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
