import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';

const CustomCTASection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-[#FDF6F9]">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6B4423] to-[#4A2E1B]"></div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#E85B8A] rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#D4AF37] rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-md bg-white/10 border border-white/20 p-10 md:p-16 rounded-3xl shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-16 mx-auto bg-[#E85B8A]/20 rounded-full flex items-center justify-center mb-6"
          >
            <Sparkles className="text-[#E85B8A] w-8 h-8" />
          </motion.div>

          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Está procurando algo diferente ou personalizado? ✨
          </h2>
          
          <p className="font-poppins text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto font-light">
            Me chame no WhatsApp! Estou pronta para atender você e criar a combinação perfeita para sua ocasião.
          </p>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/5514997091179?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido%20personalizado%20na%20Cyntia%20Rinaldi%20Doces"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] transition-all duration-300"
          >
            <MessageCircle size={24} />
            Falar no WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomCTASection;