import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle, ArrowUpRight } from 'lucide-react';

const POSTS = [
  {
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '1.2k',
    comments: '48',
    caption: 'Brigadeiros gourmet — pistache, maracujá e tradicional',
  },
  {
    image: 'https://images.pexels.com/photos/1076644/pexels-photo-1076644.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '894',
    comments: '32',
    caption: 'Bolo personalizado para aniversário infantil',
  },
  {
    image: 'https://images.pexels.com/photos/206395/pexels-photo-206395.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '1.5k',
    comments: '67',
    caption: 'Mesa de doces finos para casamento',
  },
  {
    image: 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '2.1k',
    comments: '89',
    caption: 'Torta de frutas vermelhas — frescor e elegância',
  },
  {
    image: 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '1.8k',
    comments: '54',
    caption: 'Detalhes que transformam cada celebração',
  },
  {
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '967',
    comments: '41',
    caption: 'Doces personalizados com carinho e arte',
  },
];

const InstagramShowcase = () => {
  return (
    <section id="instagram" className="py-20 md:py-28 bg-gradient-to-b from-[#FFF8F0] to-[#FDF6F9]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B5446E] to-[#9b3359] text-white px-4 py-1.5 rounded-full text-xs font-poppins font-semibold uppercase tracking-widest mb-4">
            <Instagram size={14} />
            @cyntiarinaldidoces
          </div>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-[#6B4423] mb-4">
            Siga nossas criações
          </h2>
          <p className="font-poppins text-[#8B6F47] max-w-2xl mx-auto text-sm md:text-base">
            Acompanhe os bastidores, novos sabores e encomendas reais no nosso Instagram
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {POSTS.map((post, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/cyntiarinaldidoces"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative aspect-square rounded-xl overflow-hidden bg-[#F0E0E8] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={post.image}
                alt={post.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2b1a14]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="text-white text-[10px] md:text-xs font-poppins line-clamp-2 mb-2">
                  {post.caption}
                </p>
                <div className="flex items-center gap-3 text-white/90 text-[10px] font-poppins">
                  <span className="flex items-center gap-1">
                    <Heart size={11} fill="white" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={11} /> {post.comments}
                  </span>
                </div>
              </div>
              <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={14} className="text-white" />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/cyntiarinaldidoces"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B5446E] to-[#9b3359] text-white px-8 py-3.5 rounded-full font-poppins font-semibold text-sm md:text-base hover:shadow-[0_8px_24px_rgba(181,68,110,0.35)] hover:scale-105 transition-all"
          >
            <Instagram size={18} />
            Seguir no Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramShowcase;
