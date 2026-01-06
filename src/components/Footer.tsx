import React from "react";
import { Mail, Phone, Instagram, Facebook, LinkedinIcon } from "lucide-react";

export function Footer() {
  const links = [
    { label: "Início", href: "#" },
    { label: "Sobre", href: "#sobre" },
    { label: "Cursos", href: "#cursos" },
    { label: "Metodologia", href: "#metodologia" },
    { label: "Preços", href: "#precos" },
    { label: "FAQ", href: "#faq" },
    { label: "Contato", href: "#contato" }
  ];

  return (
    <footer className="bg-[#f6f4f1] text-[#253439] py-16 px-6 border-t border-[#b29e84]/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-[#253439] mb-4">Fluency On</h3>
            <p className="text-[#7c898b] leading-relaxed">
              Transforme seu inglês em confiança real com uma metodologia comprovada e 
              acompanhamento personalizado.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold text-[#253439] mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-[#7c898b] hover:text-[#fbb80f] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[#253439] mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[#7c898b]">
                <Mail className="w-5 h-5" />
                <a href="mailto:contato@fluencyon.com" className="hover:text-[#fbb80f] transition-colors">
                  contato@fluencyon.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-[#7c898b]">
                <Phone className="w-5 h-5" />
                <a href="tel:+5511999999999" className="hover:text-[#fbb80f] transition-colors">
                  (11) 99999-9999
                </a>
              </div>
              <div className="flex gap-4 mt-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-[#fbb80f]/20 rounded-full flex items-center justify-center hover:bg-[#fbb80f] hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-[#fbb80f]/20 rounded-full flex items-center justify-center hover:bg-[#fbb80f] hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-[#fbb80f]/20 rounded-full flex items-center justify-center hover:bg-[#fbb80f] hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#b29e84]/20 pt-8 text-center text-[#7c898b]">
          <p>&copy; {new Date().getFullYear()} Fluency On. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}