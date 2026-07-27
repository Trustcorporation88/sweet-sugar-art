import React from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  MessageCircle,
  Instagram,
  Globe,
  Heart,
  Star,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { getWhatsAppUrl, handleWhatsAppClick } from '@/lib/whatsapp';

const CATEGORIES = [
  { emoji: '🍫', label: 'Brigadeiros Gourmet' },
  { emoji: '🎂', label: 'Bolos Personalizados' },
  { emoji: '🍰', label: 'Tortas Artesanais' },
  { emoji: '✨', label: 'Doces Finos' },
];

const LinkBioPage = () => {
  const whatsappMessage = 'Oi! Vi seu Instagram e quero fazer um pedido';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF6F9] via-[#FFF8F0] to-[#FDF6F9] flex flex-col items-center px-4 py-8 md:py-12">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-8"
      >
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-full border-[3px] border-[#D4AF37] p-1">
            <img
              src="/images/logo.png"
              alt="Cyntia Rinaldi Doces"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#B5446E] text-white text-[10px] font-poppins font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
            Encomendas abertas
          </div>
        </div>

        <h1 className="font-playfair text-2xl md:text-3xl font-bold text-[#6B4423] text-center">
          Cyntia Rinaldi <span className="text-[#D4AF37]">Doces</span>
        </h1>
        <p className="font-poppins text-sm text-[#8B6F47] mt-1.5 text-center max-w-xs">
          Doces artesanais feitos com amor para seus momentos especiais
        </p>

        <div className="flex items-center gap-3 mt-3 text-xs font-poppins text-[#8B6F47]">
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-[#D4AF37]" />
            Bauru/SP
          </span>
          <span className="flex items-center gap-0.5 text-[#D4AF37]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} fill="currentColor" />
            ))}
          </span>
          <span className="font-semibold">5.0</span>
        </div>
      </motion.div>

      {/* Main Actions */}
      <div className="w-full max-w-sm space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Link
            to="/pedidos"
            className="flex items-center gap-3 w-full bg-gradient-to-r from-[#B5446E] to-[#9b3359] text-white px-6 py-4 rounded-2xl font-poppins font-semibold text-sm shadow-lg shadow-[#B5446E]/25 hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <ShoppingBag size={18} />
            </div>
            <div className="flex-1 text-left">
              <span className="block font-bold">Monte seu pedido</span>
              <span className="block text-[11px] text-white/80 font-normal">
                Escolha os doces e finalize pelo WhatsApp
              </span>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <a
            href={getWhatsAppUrl(whatsappMessage)}
            onClick={(event) => handleWhatsAppClick(event, whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full bg-[#25D366] text-white px-6 py-4 rounded-2xl font-poppins font-semibold text-sm shadow-lg shadow-[#25D366]/25 hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <MessageCircle size={18} />
            </div>
            <div className="flex-1 text-left">
              <span className="block font-bold">Fale no WhatsApp</span>
              <span className="block text-[11px] text-white/80 font-normal">
                Tire duvidas, peca orcamentos e combine entregas
              </span>
            </div>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Link
            to="/"
            className="flex items-center gap-3 w-full bg-white border-2 border-[#E8D4DC] text-[#6B4423] px-6 py-4 rounded-2xl font-poppins font-semibold text-sm hover:border-[#B5446E] hover:shadow-md hover:scale-[1.02] transition-all"
          >
            <div className="w-10 h-10 bg-[#FDF6F9] rounded-full flex items-center justify-center shrink-0">
              <Globe size={18} className="text-[#B5446E]" />
            </div>
            <div className="flex-1 text-left">
              <span className="block font-bold">Visite nosso site</span>
              <span className="block text-[11px] text-[#8B6F47] font-normal">
                Galeria, depoimentos e tudo sobre a marca
              </span>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <a
            href="https://www.instagram.com/cyntiarinaldidoces"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full bg-white border-2 border-[#E8D4DC] text-[#6B4423] px-6 py-4 rounded-2xl font-poppins font-semibold text-sm hover:border-[#B5446E] hover:shadow-md hover:scale-[1.02] transition-all"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#F7E8EF] to-[#FDF3E3] rounded-full flex items-center justify-center shrink-0">
              <Instagram size={18} className="text-[#B5446E]" />
            </div>
            <div className="flex-1 text-left">
              <span className="block font-bold">@cyntiarinaldidoces</span>
              <span className="block text-[11px] text-[#8B6F47] font-normal">
                Siga para novidades e bastidores
              </span>
            </div>
          </a>
        </motion.div>
      </div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full max-w-sm mt-8"
      >
        <h2 className="font-playfair text-lg font-bold text-[#6B4423] text-center mb-4">
          O que fazemos
        </h2>
        <div className="grid grid-cols-2 gap-2.5">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={i}
              to="/pedidos"
              className="bg-white border border-[#E8D4DC] rounded-xl px-4 py-3.5 text-center hover:border-[#B5446E] hover:shadow-sm transition-all group"
            >
              <span className="text-2xl block mb-1">{cat.emoji}</span>
              <span className="font-poppins text-xs font-semibold text-[#6B4423] group-hover:text-[#B5446E] transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Trust Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-10 text-center"
      >
        <div className="flex items-center justify-center gap-4 text-[10px] md:text-xs font-poppins text-[#8B6F47] uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Heart size={11} className="text-[#B5446E]" /> Feito a mao
          </span>
          <span className="text-[#D4AF37]">|</span>
          <span className="flex items-center gap-1">
            <Sparkles size={11} className="text-[#D4AF37]" /> Premium
          </span>
          <span className="text-[#D4AF37]">|</span>
          <span className="flex items-center gap-1">
            <Star size={11} className="text-[#D4AF37]" /> 5.0
          </span>
        </div>
        <p className="text-[10px] text-[#8B6F47]/60 font-poppins mt-4">
          Cyntia Rinaldi Doces — Bauru/SP
        </p>
      </motion.div>
    </div>
  );
};

export default LinkBioPage;
