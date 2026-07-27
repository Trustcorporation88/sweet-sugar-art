import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Palette, ChefHat, ClipboardCheck, Truck } from 'lucide-react';

const OrderProcessSection = () => {
  const steps = [
    {
      icon: <ShoppingCart size={24} className="md:w-7 md:h-7" />,
      title: "Pedido",
      description: "Escolha seus doces favoritos e entre em contato pelo WhatsApp."
    },
    {
      icon: <Palette size={24} className="md:w-7 md:h-7" />,
      title: "Personalização",
      description: "Definimos juntos os detalhes, cores e temas da sua encomenda."
    },
    {
      icon: <ChefHat size={24} className="md:w-7 md:h-7" />,
      title: "Fabricação",
      description: "Produção artesanal com ingredientes frescos e selecionados."
    },
    {
      icon: <ClipboardCheck size={24} className="md:w-7 md:h-7" />,
      title: "Qualidade",
      description: "Rigoroso controle de qualidade para garantir a perfeição."
    },
    {
      icon: <Truck size={24} className="md:w-7 md:h-7" />,
      title: "Entrega",
      description: "Seus doces chegam até você com todo cuidado e segurança."
    }
  ];

  return (
    <section id="processo" className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-[#FDF6F9] to-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-[#D4AF37] font-poppins uppercase tracking-[0.2em] text-xs md:text-sm font-semibold mb-2 block">
            Passo a Passo
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#6B4423] mb-4 md:mb-6">
            Como Funciona
          </h2>
          <p className="font-poppins text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-2">
            Do pedido à entrega, cada etapa é feita com carinho e dedicação.
            <br />
            <span className="text-[#D4AF37] font-semibold text-xs md:text-sm mt-2 block">
              * Por serem artesanais, nossos doces demandam tempo de fabricação.
            </span>
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-1 bg-gradient-to-r from-[#F4D4E6] via-[#D4AF37] to-[#F4D4E6] transform -translate-y-1/2 z-0 opacity-30"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-2 border-[#D4AF37] flex items-center justify-center text-[#6B4423] shadow-lg mb-4 md:mb-6 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-300 relative shrink-0">
                  {step.icon}
                  <div className="absolute -bottom-2 bg-[#B5446E] text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-playfair font-bold text-lg md:text-xl text-[#6B4423] mb-2 md:mb-3">
                  {step.title}
                </h3>
                <p className="font-poppins text-xs md:text-sm text-gray-600 leading-relaxed px-2 md:px-0">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderProcessSection;