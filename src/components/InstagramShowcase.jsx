import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle, ArrowUpRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

const POSTS = [
  {
    image: 'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '1.2k',
    comments: '48',
  },
  {
    image: 'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '2.1k',
    comments: '89',
  },
  {
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '1.5k',
    comments: '56',
  },
  {
    image: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '1.8k',
    comments: '67',
  },
  {
    image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '987',
    comments: '41',
  },
  {
    image: 'https://images.pexels.com/photos/3992134/pexels-photo-3992134.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '1.6k',
    comments: '63',
  },
  {
    image: 'https://images.pexels.com/photos/1998635/pexels-photo-1998635.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '2.3k',
    comments: '95',
  },
  {
    image: 'https://images.pexels.com/photos/2693447/pexels-photo-2693447.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '1.4k',
    comments: '52',
  },
];

const PhotoCard = ({ post, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLarge = index === 0 || index === 5;

  return (
    <motion.a
      href="https://www.instagram.com/cyntiarinaldidoces"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 ${
        isLarge ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <div className={`w-full ${isLarge ? 'aspect-square' : 'aspect-square'}`}>
        <img
          src={post.image}
          alt="Doces artesanais Cyntia Rinaldi"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="flex items-center gap-5 text-white">
          <span className="flex items-center gap-1.5 text-sm font-poppins font-semibold">
            <Heart size={18} fill="white" className="text-white" />
            {post.likes}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-poppins font-semibold">
            <MessageCircle size={18} fill="white" className="text-white" />
            {post.comments}
          </span>
        </div>
      </div>

      {/* Corner arrow */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-12">
        <ArrowUpRight size={14} className="text-white" />
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-[#B5446E]/50 transition-all duration-300" />
    </motion.a>
  );
};

const InstagramShowcase = () => {
  return (
    <section id="instagram" className="py-24 md:py-32 bg-gradient-to-b from-[#FFF8F0] via-white to-[#FDF6F9] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#B5446E]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#D4956A]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B5446E] to-[#D4956A] text-white px-5 py-2 rounded-full text-xs font-poppins font-semibold uppercase tracking-widest mb-6 shadow-lg shadow-[#B5446E]/20"
          >
            <Instagram size={14} />
            @cyntiarinaldidoces
            <Sparkles size={12} />
          </motion.div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[#6B4423] mb-5">
            Siga nossas criações
          </h2>
          <p className="font-poppins text-[#8B6F47] max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Acompanhe os bastidores, novos sabores e encomendas reais no nosso Instagram
          </p>
        </motion.div>

        {/* Photo grid - 4 columns with 2 large featured items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
          {POSTS.map((post, index) => (
            <PhotoCard key={index} post={post} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-14"
        >
          <a
            href="https://www.instagram.com/cyntiarinaldidoces"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#B5446E] to-[#9b3359] text-white px-10 py-4 rounded-full font-poppins font-semibold text-sm md:text-base shadow-lg shadow-[#B5446E]/25 hover:shadow-[0_12px_32px_rgba(181,68,110,0.4)] hover:scale-105 transition-all duration-300"
          >
            <Instagram size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            Seguir no Instagram
            <ArrowUpRight size={16} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramShowcase;
