import React from "react";
import { Mail, Phone, Instagram, Facebook } from "lucide-react";
import { CONFIG } from "../constants/config";

/** TikTok icon (lucide doesn't include it) */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

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
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href={`mailto:${CONFIG.email}`} className="hover:text-[#fbb80f] transition-colors break-all">
                  {CONFIG.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-[#7c898b]">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href={`tel:${CONFIG.phoneTel}`} className="hover:text-[#fbb80f] transition-colors">
                  {CONFIG.phone}
                </a>
              </div>
              <div className="flex gap-4 mt-4">
                <a
                  href={CONFIG.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#fbb80f]/20 rounded-full flex items-center justify-center hover:bg-[#fbb80f] hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={CONFIG.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#fbb80f]/20 rounded-full flex items-center justify-center hover:bg-[#fbb80f] hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={CONFIG.socialMedia.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#fbb80f]/20 rounded-full flex items-center justify-center hover:bg-[#fbb80f] hover:text-white transition-colors"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-5 h-5" />
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