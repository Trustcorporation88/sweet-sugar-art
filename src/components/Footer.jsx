import React from 'react';
import { Instagram, Facebook, MapPin, Mail } from 'lucide-react';
import OrnamentalDivider from '@/components/ui/OrnamentalDivider.jsx';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'produtos', label: 'Produtos' },
    { id: 'depoimentos', label: 'Sobre' },
    { id: 'contato', label: 'Contato' }
  ];

  return (
    <footer className="bg-gradient-to-b from-[#6B4423] to-[#4A2E1B] text-white pt-12 md:pt-16 lg:pt-20 pb-8 md:pb-10 relative overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 md:h-2 bg-gradient-to-r from-[#F4D4E6] via-[#D4AF37] to-[#F4D4E6]"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 mb-12 md:mb-16 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[#FFF8F0]">
              Cyntia Rinaldi <span className="text-[#D4AF37]">Doces</span>
            </h3>
            <p className="font-poppins text-sm md:text-base text-[#FFF8F0]/80 leading-relaxed font-light mb-6 max-w-sm">
              Doces premium, feitos à mão com ingredientes selecionados. Transformando momentos especiais em memórias deliciosas.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a 
                href="https://www.instagram.com/cyntiarinaldidoces" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-[#FFF8F0]/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-all duration-300 hover:shadow-lg"
                aria-label="Visite nosso perfil no Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.facebook.com/cyntiarinaldidoces" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-[#FFF8F0]/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-all duration-300 hover:shadow-lg"
                aria-label="Visite nossa página no Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-playfair text-lg md:text-xl font-semibold mb-4 md:mb-6 text-[#D4AF37]">Links Rápidos</h4>
            <nav className="flex flex-col space-y-3 items-center md:items-start">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="font-poppins text-sm md:text-base text-[#FFF8F0]/80 hover:text-[#E85B8A] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"></span>
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-playfair text-lg md:text-xl font-semibold mb-4 md:mb-6 text-[#D4AF37]">Contato</h4>
            <div className="space-y-4 text-[#FFF8F0]/80 font-poppins text-sm md:text-base flex flex-col items-center md:items-start">
              <p className="flex items-center gap-2 md:gap-3">
                <MapPin className="text-[#D4AF37]" size={18} />
                Bauru e região
              </p>
              <a
                href="mailto:cyntia@cyntiarinaldidoces.com"
                className="flex items-center gap-2 md:gap-3 hover:text-[#E85B8A] transition-colors break-all text-center md:text-left"
              >
                <Mail className="text-[#D4AF37] shrink-0" size={18} />
                cyntia@cyntiarinaldidoces.com
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#FFF8F0]/10 pt-6 md:pt-8 flex flex-col items-center">
          <OrnamentalDivider className="text-[#D4AF37]/30 max-w-[200px] md:max-w-xs mb-4 md:mb-6 py-0" />
          <p className="text-center text-[#FFF8F0]/50 text-xs md:text-sm font-poppins px-4">
            © 2026 Cyntia Rinaldi Doces. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;