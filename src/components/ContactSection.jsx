import React, { useState } from 'react';
import { MessageCircle, Instagram, Mail, Send } from 'lucide-react';
import { toast } from 'sonner';
import FlourishElement from '@/components/ui/FlourishElement';
import { supabase } from '@/integrations/supabase/client';
import { getWhatsAppUrl, handleWhatsAppClick, openWhatsApp } from '@/lib/whatsapp';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error('Erro', { description: 'Por favor, preencha seu nome.' });
      return;
    }

    if (!formData.phone.trim()) {
      toast.error('Erro', { description: 'Por favor, preencha seu telefone.' });
      return;
    }

    if (!formData.message.trim()) {
      toast.error('Erro', { description: 'Por favor, escreva uma mensagem.' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create record directly in PocketBase
      const { error } = await supabase.from('contact_messages').insert({ nome: formData.name, telefone: formData.phone, mensagem: formData.message });
      if (error) throw error;

      toast.success('Mensagem enviada com sucesso!', { description: 'Entraremos em contato em breve. Obrigado!' });

      // Reset form
      setFormData({
        name: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Erro', { description: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    {
      icon: <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />,
      title: 'WhatsApp',
      description: 'Fale conosco agora',
      whatsappMessage: 'Olá! Gostaria de fazer um pedido na Cyntia Rinaldi Doces',
      link: getWhatsAppUrl('Olá! Gostaria de fazer um pedido na Cyntia Rinaldi Doces'),
      linkText: 'Enviar mensagem'
    },
    {
      icon: <Instagram className="w-6 h-6 md:w-8 md:h-8" />,
      title: 'Instagram',
      description: 'Siga nosso perfil',
      link: 'https://www.instagram.com/cyntiarinaldidoces',
      linkText: '@cyntiarinaldiDoces'
    },
    {
      icon: <Mail className="w-6 h-6 md:w-8 md:h-8" />,
      title: 'E-mail',
      description: 'Envie um e-mail',
      link: 'mailto:cyntia@cyntiarinaldidoces.com',
      linkText: 'cyntia@cyntiarinaldidoces.com'
    }
  ];

  return (
    <section id="contato" className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-[#FDF6F9] to-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#003366] mb-4">
            Entre em Contato
          </h2>
          <p className="font-poppins text-sm md:text-base lg:text-xl text-gray-600 max-w-2xl mx-auto font-light px-2">
            Estamos prontos para atender você e criar doces incríveis para sua ocasião especial
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          {contactCards.map((card, index) => (
            <a
              key={index}
              href={card.link}
              onClick={(event) => {
                if (card.whatsappMessage) handleWhatsAppClick(event, card.whatsappMessage);
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all group border border-[#F4D4E6] hover:border-[#D4AF37] relative overflow-hidden flex flex-col items-center text-center"
            >
              <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-[#FFF8F0] rounded-bl-full -mr-8 -mt-8 md:-mr-10 md:-mt-10 transition-transform group-hover:scale-150"></div>
              
              <div className="relative z-10 flex flex-col items-center w-full">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#FF8C00] to-[#FF7A00] text-white rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-md border-2 border-white shrink-0">
                  {card.icon}
                </div>
                <h3 className="font-playfair text-xl md:text-2xl font-bold text-[#003366] mb-2">
                  {card.title}
                </h3>
                <p className="font-poppins text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                  {card.description}
                </p>
                <span className="text-[#FF8C00] font-semibold group-hover:text-[#D4AF37] transition-colors font-poppins text-xs md:text-sm break-all w-full">
                  {card.linkText}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-[#F4D4E6] relative">
          <FlourishElement position="top-left" className="hidden md:block" />
          <FlourishElement position="bottom-right" className="hidden md:block" />

          <h3 className="font-playfair text-2xl md:text-3xl font-bold text-[#003366] mb-6 md:mb-8 text-center">
            Envie sua Mensagem
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 relative z-10">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-xs md:text-sm font-semibold text-[#003366] mb-1.5 md:mb-2 font-poppins uppercase tracking-wider">
                Nome *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 md:px-4 md:py-4 border border-[#E8C5D8] rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none transition-all bg-[#FDF6F9]/30 text-gray-900 font-poppins text-sm md:text-base"
                placeholder="Seu nome completo"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs md:text-sm font-semibold text-[#003366] mb-1.5 md:mb-2 font-poppins uppercase tracking-wider">
                Telefone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 md:px-4 md:py-4 border border-[#E8C5D8] rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none transition-all bg-[#FDF6F9]/30 text-gray-900 font-poppins text-sm md:text-base"
                placeholder="(14) 99999-9999"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-xs md:text-sm font-semibold text-[#003366] mb-1.5 md:mb-2 font-poppins uppercase tracking-wider">
                Mensagem *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-3 md:px-4 md:py-4 border border-[#E8C5D8] rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none transition-all resize-none bg-[#FDF6F9]/30 text-gray-900 font-poppins text-sm md:text-base"
                placeholder="Conte-nos sobre seu pedido ou dúvida..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#003366] to-[#004488] text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg hover:from-[#FF8C00] hover:to-[#FF7A00] transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 md:gap-3 shadow-lg font-playfair mt-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={18} className="md:w-5 md:h-5" />
                  Enviar Mensagem
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;