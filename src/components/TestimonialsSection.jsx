import React from 'react';
import { Star, Quote } from 'lucide-react';
import DecorativePattern from '@/components/ui/DecorativePattern';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Mariana Silva",
      role: "Noiva",
      content: "Os doces da Cyntia foram o destaque do meu casamento! Além de lindos, o sabor é incomparável. O brigadeiro gourmet é simplesmente divino.",
      rating: 5
    },
    {
      name: "Fernanda Oliveira",
      role: "Cliente Recorrente",
      content: "Sempre encomendo para os aniversários da família. A qualidade é constante e o atendimento é maravilhoso. Recomendo de olhos fechados!",
      rating: 5
    },
    {
      name: "Juliana Santos",
      role: "Empresária",
      content: "Fizemos os brindes corporativos com a Cyntia e foi um sucesso absoluto. A apresentação é impecável e muito elegante.",
      rating: 5
    }
  ];

  return (
    <section id="depoimentos" className="py-12 md:py-16 lg:py-24 bg-[#FFF8F0] relative overflow-hidden">
      <DecorativePattern className="opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-[#D4AF37] font-poppins uppercase tracking-[0.2em] text-xs md:text-sm font-semibold mb-2 block">
            O que dizem nossos clientes
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#003366] mb-4 md:mb-6">
            Depoimentos
          </h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-[#F4D4E6] to-[#D4AF37] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#F4D4E6]/50 relative group flex flex-col"
            >
              <div className="absolute top-4 right-4 md:top-6 md:right-8 text-[#F4D4E6] group-hover:text-[#D4AF37]/20 transition-colors">
                <Quote size={36} className="md:w-12 md:h-12" fill="currentColor" />
              </div>

              <div className="flex gap-1 mb-4 md:mb-6 justify-center md:justify-start">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="md:w-[18px] md:h-[18px] text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>

              <p className="font-poppins text-sm md:text-base text-gray-600 italic mb-6 leading-relaxed relative z-10 flex-grow text-center md:text-left">
                "{testimonial.content}"
              </p>

              <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4D4E6] to-[#D4AF37] flex items-center justify-center text-white font-playfair font-bold text-lg shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="text-left">
                  <h4 className="font-playfair font-bold text-[#003366] text-sm md:text-base">{testimonial.name}</h4>
                  <span className="text-[10px] md:text-xs font-poppins text-[#D4AF37] uppercase tracking-wider">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;