import React from 'react';
import { Heart } from 'lucide-react';

const MyStorySection = () => {
  return (
    <section id="historia" className="py-20 md:py-32 bg-gradient-to-b from-[#FDF6F9] to-[#FFF8F0] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#F4D4E6]/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#E8C5D8]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E8C5D8]/30 p-8 md:p-16 text-center">
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#FDF6F9] rounded-full flex items-center justify-center shadow-sm border border-[#E8C5D8]/50">
              <Heart className="w-8 h-8 text-[#E85B8A]" strokeWidth={1.5} />
            </div>
          </div>

          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-[#6B4423] mb-8 tracking-wide">
            Minha História
          </h2>
          
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-10"></div>

          <div className="space-y-6 font-poppins text-[#6B4423]/80 text-base md:text-lg leading-relaxed text-justify md:text-center">
            <p>
              A paixão pela confeitaria sempre esteve presente em minha vida. Desde pequena, observava encantada as transformações mágicas que aconteciam na cozinha, onde ingredientes simples se tornavam verdadeiras obras de arte que traziam sorrisos e uniam as pessoas.
            </p>
            <p>
              A Cyntia Rinaldi Doces Personalizados nasceu desse amor profundo por criar momentos inesquecíveis. Cada doce que sai da nossa cozinha carrega não apenas ingredientes da mais alta qualidade, mas também dedicação, carinho e uma atenção meticulosa aos detalhes.
            </p>
            <p>
              Acreditamos que um doce não é apenas uma sobremesa, mas uma experiência sensorial que marca celebrações, eterniza memórias e demonstra afeto. Nosso compromisso é entregar não apenas sabor excepcional, mas também uma apresentação impecável que encante os olhos antes mesmo da primeira mordida.
            </p>
            <p className="font-medium text-[#E85B8A] pt-4 text-xl font-playfair italic">
              "Transformando açúcar e afeto em doces memórias."
            </p>
          </div>
          
          <div className="mt-12 flex justify-center">
            <img 
              src="/images/logo.png" 
              alt="Cyntia Rinaldi Assinatura" 
              className="w-24 h-24 rounded-full object-cover border-4 border-[#FDF6F9] shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyStorySection;