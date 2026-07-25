import React from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import OrnamentalDivider from '@/components/ui/OrnamentalDivider';
import DecorativePattern from '@/components/ui/DecorativePattern';
import heroBg from '@/assets/images/hero-bg.svg';
import { getWhatsAppUrl, handleWhatsAppClick } from '@/lib/whatsapp';

const HeroSection = () => {
  const whatsappMessage = 'Quero fazer um pedido na Cyntia Rinaldi Doces';

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

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FDF6F9]"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]">
        <DecorativePattern className="opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 lg:py-32 text-center mt-16 md:mt-0">
        <div className="space-y-6 md:space-y-8">
          {/* Decorative Top Element */}
          <div className="flex justify-center mb-2 md:mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-[#D4AF37] md:w-10 md:h-10">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
            </svg>
          </div>

          {/* Headline */}
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-7xl font-bold text-[#6B4423] leading-tight tracking-wide drop-shadow-sm text-center">
            Transformando seu <span className="text-[#E85B8A] italic block sm:inline">desejo</span> em doce
          </h1>

          {/* Subheadline */}
          <p className="font-poppins text-base md:text-xl lg:text-2xl text-[#6B4423]/80 max-w-3xl mx-auto font-light tracking-wider text-center px-2">
            Doces premium, feitos artesanalmente, ideais para eventos e presentes
          </p>

          <OrnamentalDivider className="text-[#D4AF37]/50 max-w-xs md:max-w-md mx-auto" />

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 pt-4">
            <a
              href={getWhatsAppUrl(whatsappMessage)}
              onClick={(event) => handleWhatsAppClick(event, whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto group bg-gradient-to-r from-[#E85B8A] to-[#D84A79] text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-playfair font-bold text-base md:text-lg hover:shadow-[0_0_20px_rgba(232,91,138,0.5)] transition-all hover:scale-105 flex items-center justify-center gap-3 border border-[#D4AF37]/30"
            >
              Faça seu pedido aqui
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <button
              onClick={() => scrollToSection('produtos')}
              className="w-full md:w-auto group bg-transparent border-2 border-[#6B4423] text-[#6B4423] px-8 md:px-10 py-3 md:py-4 rounded-full font-playfair font-bold text-base md:text-lg hover:bg-[#6B4423] hover:text-white transition-all flex items-center justify-center gap-3 hover:shadow-lg"
            >
              <Eye size={20} />
              Ver doces
            </button>
          </div>

          {/* Trust Line */}
          <div className="pt-8 md:pt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-[#6B4423]/70 text-xs sm:text-sm md:text-base font-poppins tracking-widest uppercase">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#D4AF37] rounded-full rotate-45"></div>
              <span>Bauru e região</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#D4AF37] rounded-full rotate-45"></div>
              <span>produtos de qualidade</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block">
        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-[#D4AF37]/50 rounded-full flex items-start justify-center p-1 md:p-2 animate-bounce">
          <div className="w-1 h-1.5 md:h-2 bg-[#D4AF37] rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;