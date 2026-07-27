import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle, ArrowUpRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

const POSTS = [
  {
    image: 'https://scontent-gru1-1.cdninstagram.com/v/t51.82787-15/552464486_18076912064073395_5566934798341540721_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ig_cache_key=MjQwMTc3NjA2OTA2Mjc1NDIyMg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjgyOC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=ofzZ2QkkxZMQ7kNvwF9dRxR&_nc_oc=Adpm4x4R3RJb0tOBDypKWIr5UzIgcBcFqk9Ip1DCCgErQuMSmHXexXXzz8s5EIXHdEk&_nc_zt=23&_nc_ht=scontent-gru1-1.cdninstagram.com&_nc_gid=EQWBdg3BJF93ZS3-cAEoRg&_nc_ss=7e6a8&oh=00_AQDcVzZUlagLA5NLtECHAupufD1U57I2rj33BwDP3k8wWQ&oe=6A6DA031',
    likes: '1.2k',
    comments: '48',
    caption: 'Doces artesanais feitos com amor e dedicacao',
  },
  {
    image: 'https://scontent-gru1-2.cdninstagram.com/v/t51.82787-15/559243245_18291310699256730_8826552871746242384_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=MTk2ODkxMzUxNTg1NTI5MDYyMg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjEwMjQuc2RyLnJlZ3VsYXJfcGhvdG8uQzMifQ%3D%3D&_nc_ohc=6wvYRbr7R08Q7kNvwG06S9V&_nc_oc=Adqq3ra6AAxrZeYXtFVbK0KmA-6cpTHas4fEHD06rXwz6PDHztJX5OH5LyFaKPka6JI&_nc_zt=23&_nc_ht=scontent-gru1-2.cdninstagram.com&_nc_gid=7G8M5wdZ_bOtAqO7fVUqww&_nc_ss=7e6a8&oh=00_AQDN8H3HOeVg3XtOa5i8hHGNi-2xNyjcUjPA5nEHC29u1A&oe=6A6DA132',
    likes: '2.1k',
    comments: '89',
    caption: 'Criacoes especiais para momentos unicos',
  },
  {
    image: 'https://scontent-gru2-2.cdninstagram.com/v/t51.82787-15/553883087_18097794304726119_7834661113638679457_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MjQyNzI1ODY3NTI3OTQ1NDQ2Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjgyOC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=e3BgA6ZoigAQ7kNvwHdTYRo&_nc_oc=Adp85XxBqx6Mh8viP9uignhXtD8-2t-bE_N4TnzS7RfdeNKmvIMw7frhnB3Ok1fsvdE&_nc_zt=23&_nc_ht=scontent-gru2-2.cdninstagram.com&_nc_gid=EQWBdg3BJF93ZS3-cAEoRg&_nc_ss=7e6a8&oh=00_AQC4gvIkadbPcu1kSuIFU9fh7E3hcXpG9ynlUXqelIak-g&oe=6A6D9469',
    likes: '1.5k',
    comments: '67',
    caption: 'Cada detalhe pensado com carinho',
  },
];

const InstagramShowcase = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="instagram" className="py-24 md:py-32 bg-gradient-to-b from-[#FFF8F0] via-white to-[#FDF6F9] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#B5446E]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#D4956A]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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

        {/* Featured mosaic layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 max-w-6xl mx-auto">
          {/* Large featured image */}
          <motion.a
            href="https://www.instagram.com/cyntiarinaldidoces"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative md:col-span-7 aspect-[4/3] md:aspect-[4/5] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <img
              src={POSTS[0].image}
              alt={POSTS[0].caption}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
              <p className="text-white text-sm md:text-base font-poppins font-medium mb-3">
                {POSTS[0].caption}
              </p>
              <div className="flex items-center gap-4 text-white/90 text-xs font-poppins">
                <span className="flex items-center gap-1.5">
                  <Heart size={14} fill="white" className="text-white" /> {POSTS[0].likes}
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle size={14} /> {POSTS[0].comments}
                </span>
              </div>
            </div>
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-12">
              <ArrowUpRight size={18} className="text-white" />
            </div>
            {/* Instagram gradient border effect on hover */}
            <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-[#B5446E]/40 transition-all duration-300" />
          </motion.a>

          {/* Right column with two stacked images */}
          <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-5">
            <motion.a
              href="https://www.instagram.com/cyntiarinaldidoces"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative aspect-square md:aspect-[5/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={POSTS[1].image}
                alt={POSTS[1].caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                <p className="text-white text-xs md:text-sm font-poppins font-medium mb-2">
                  {POSTS[1].caption}
                </p>
                <div className="flex items-center gap-3 text-white/90 text-[11px] font-poppins">
                  <span className="flex items-center gap-1">
                    <Heart size={12} fill="white" className="text-white" /> {POSTS[1].likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={12} /> {POSTS[1].comments}
                  </span>
                </div>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-12">
                <ArrowUpRight size={14} className="text-white" />
              </div>
              <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-[#D4956A]/40 transition-all duration-300" />
            </motion.a>

            <motion.a
              href="https://www.instagram.com/cyntiarinaldidoces"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onMouseEnter={() => setHoveredIndex(2)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative aspect-square md:aspect-[5/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={POSTS[2].image}
                alt={POSTS[2].caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                <p className="text-white text-xs md:text-sm font-poppins font-medium mb-2">
                  {POSTS[2].caption}
                </p>
                <div className="flex items-center gap-3 text-white/90 text-[11px] font-poppins">
                  <span className="flex items-center gap-1">
                    <Heart size={12} fill="white" className="text-white" /> {POSTS[2].likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={12} /> {POSTS[2].comments}
                  </span>
                </div>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-12">
                <ArrowUpRight size={14} className="text-white" />
              </div>
              <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-[#B5446E]/40 transition-all duration-300" />
            </motion.a>
          </div>
        </div>

        {/* CTA button */}
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
          <p className="font-poppins text-[#8B6F47]/60 text-xs mt-4">
            +8 fotos no nosso perfil
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramShowcase;
