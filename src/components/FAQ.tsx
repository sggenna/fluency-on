import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "Qual é o material utilizado?",
      answer: "Utilizamos um material completo, estruturado para proporcionar uma jornada de aprendizado clara, prática e eficiente, alinhada ao CEFR (Quadro Europeu Comum de Referência para Línguas). O conteúdo é organizado em módulos, com unidades focadas em vocabulário, gramática, leitura, compreensão auditiva, conversação e escrita, além de warm-ups e atividades interativas para tornar o aprendizado dinâmico e envolvente.\n\nO material é 100% digital, pensado para que você possa acessá-lo facilmente de qualquer dispositivo — computador, tablet ou celular —, e também pode ser impresso para facilitar seus estudos.\n\nO custo é de R$137,00 por módulo, podendo ser pago à vista no ato da matrícula ou parcelado ao longo dos 6 meses do módulo, junto com as mensalidades."
    },
    {
      question: "O que está incluso no pacote completo do material?",
      answer: "O pacote completo inclui:\n\n✅ Student's Book (apostila principal em PDF)\n✅ Student's Homework (apostila de exercícios em PDF)\n✅ Apostila de Games (atividades lúdicas em PDF)\n✅ Pasta com todos os áudios das atividades e lições\n✅ Slides das aulas (bônus exclusivo para reforçar o conteúdo visual)\n✅ Cronograma semanal de estudos (para te ajudar a se organizar e manter a consistência)\n✅ Acesso ao aplicativo de games e revisão, para praticar de forma leve e divertida, onde e quando quiser."
    },
    {
      question: "As aulas são individuais ou em grupo?",
      answer: "Ofereço tanto aulas individuais quanto pequenas turmas, com número reduzido de no máximo 6 alunos, garantindo um acompanhamento de qualidade em ambos os formatos."
    },
    {
      question: "Como funcionam as aulas?",
      answer: "As aulas são 100% online, ao vivo, via Google Meet e seguem uma metodologia estruturada, com foco no desenvolvimento da fluência e na comunicação prática. Cada encontro é planejado para ser dinâmico, interativo e direcionado às suas necessidades no idioma."
    },
    {
      question: "Qual a duração das aulas?",
      answer: "🧑‍🤝‍🧑 Aulas em grupo: têm duração de 1h40, uma vez por semana.\n\n👩‍🏫 Aulas individuais: a duração é flexível e definida de acordo com o combinado entre professor e aluno, conforme a necessidade e disponibilidade de cada um."
    },
    {
      question: "E se eu não puder comparecer à aula?",
      answer: "Se você faltar, não perde o conteúdo! Você recebe:\n\n▶️ A gravação da aula\n📝 Um resumo escrito dos principais pontos abordados\n💬 A transcrição do chat da aula, com tudo o que foi compartilhado e conversado."
    },
    {
      question: "Tenho suporte fora das aulas?",
      answer: "Sim! Ofereço suporte via WhatsApp durante a semana para tirar dúvidas rápidas, enviar áudios, orientações e acompanhar seu progresso entre as aulas."
    },
    {
      question: "Tem taxa de matrícula?",
      answer: "Não. Aqui você não paga matrícula!"
    },
    {
      question: "Em quanto tempo eu fico fluente?",
      answer: "O tempo para alcançar fluência depende de fatores como frequência de estudo, dedicação, prática fora das aulas e seu objetivo específico. Meu compromisso é te guiar nesse caminho, com clareza sobre seus avanços desde o primeiro dia."
    },
    {
      question: "Existe certificado?",
      answer: "Sim! Ao concluir o curso, você recebe um certificado oficial que comprova sua dedicação e o domínio do conteúdo aprendido. Além disso, acompanho seu progresso com relatórios detalhados para garantir que você está sempre evoluindo."
    }
  ];

  return (
    <section className="py-20 px-6 bg-[#f6f4f1]" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#253439] mb-4">
            Perguntas Frequentes
          </h2>
          <div className="w-24 h-1 bg-[#fbb80f] mx-auto"></div>
          <p className="text-lg text-[#7c898b] mt-6 max-w-2xl mx-auto">
            Tudo o que você precisa saber sobre material, aulas, suporte e valores
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white border-2 border-[#b29e84]/20 rounded-lg px-6 hover:border-[#fbb80f]/50 transition-colors"
            >
              <AccordionTrigger className="text-left text-[#253439] hover:text-[#fbb80f] py-5 font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#7c898b] pb-5 whitespace-pre-line leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
