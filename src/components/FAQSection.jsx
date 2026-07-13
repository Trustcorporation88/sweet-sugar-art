import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-[#D4AF37]/20 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-4 md:py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`font-playfair text-base md:text-lg font-semibold transition-colors pr-4 ${isOpen ? 'text-[#D4AF37]' : 'text-[#003366] group-hover:text-[#D4AF37]'}`}>
          {question}
        </span>
        <span className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? (
            <Minus className="text-[#D4AF37]" size={20} />
          ) : (
            <Plus className="text-[#003366]/50 group-hover:text-[#D4AF37]" size={20} />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="overflow-hidden transition-all duration-300">
          <p className="pb-4 md:pb-6 font-poppins text-sm md:text-base text-gray-600 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Qual é o prazo de entrega?",
      answer: "Como nossos produtos são artesanais e feitos sob medida, pedimos um prazo mínimo de 3 a 5 dias para encomendas menores e 15 dias para grandes eventos. Para datas comemorativas, recomendamos antecedência maior."
    },
    {
      question: "Posso personalizar meus doces?",
      answer: "Sim! Trabalhamos com personalização completa, desde as cores e sabores até a decoração com pasta americana. Podemos adaptar os doces ao tema da sua festa ou evento corporativo."
    },
    {
      question: "Como faço meu pedido?",
      answer: "Os pedidos são realizados exclusivamente pelo nosso WhatsApp. Lá podemos conversar sobre os detalhes, verificar a disponibilidade na agenda e fechar o orçamento personalizado."
    },
    {
      question: "Qual é o valor mínimo?",
      answer: "Trabalhamos com um pedido mínimo de 20 unidades para doces tradicionais e 10 unidades para doces personalizados maiores (como cupcakes e pães de mel). Consulte-nos para kits de degustação."
    },
    {
      question: "Vocês entregam em qual região?",
      answer: "Realizamos entregas em toda a cidade de Bauru e região próxima. A taxa de entrega é calculada de acordo com o bairro. Também oferecemos a opção de retirada em nosso ateliê."
    }
  ];

  return (
    <section id="faq" className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-[#D4AF37] font-poppins uppercase tracking-[0.2em] text-xs md:text-sm font-semibold mb-2 block">
            Dúvidas Frequentes
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#003366] mb-4 md:mb-6">
            Perguntas & Respostas
          </h2>
        </div>

        <div className="bg-[#FDF6F9] rounded-2xl p-5 md:p-8 shadow-lg border border-[#F4D4E6]">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;