import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle, ArrowUpRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

const POSTS = [
  {
    image: 'https://scontent-gru2-2.cdninstagram.com/v/t51.82787-15/557712606_18101582125619723_3208727456305280616_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=MjQyNDE0MzY3MjU5NDc0NTExNA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjgyOC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=gomwLOR7IY0Q7kNvwGK0R5N&_nc_oc=Ado3dAEwI5WLjOu1fFInnjGCYlRkPmneG5kHbS9zLS7Cg0tUnwMed2x8cHUCDynZzzw&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-gru2-2.cdninstagram.com&_nc_gid=1S_oKp_XQubOEKfuG6hFXQ&_nc_ss=7a22e&oh=00_AQB4v3Mcv0cRjbdO7anZMzEd0-cAiIZAyBV2N9cKRFEsMw&oe=6A6D7F7E',
    likes: '1.2k',
    comments: '48',
  },
  {
    image: 'https://scontent-gru1-1.cdninstagram.com/v/t51.82787-15/552464486_18076912064073395_5566934798341540721_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ig_cache_key=MjQwMTc3NjA2OTA2Mjc1NDIyMg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjgyOC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=ofzZ2QkkxZMQ7kNvwF9dRxR&_nc_oc=Adpm4x4R3RJb0tOBDypKWIr5UzIgcBcFqk9Ip1DCCgErQuMSmHXexXXzz8s5EIXHdEk&_nc_zt=23&_nc_ht=scontent-gru1-1.cdninstagram.com&_nc_gid=EQWBdg3BJF93ZS3-cAEoRg&_nc_ss=7e6a8&oh=00_AQDcVzZUlagLA5NLtECHAupufD1U57I2rj33BwDP3k8wWQ&oe=6A6DA031',
    likes: '2.1k',
    comments: '89',
  },

  {
    image: 'https://scontent-gru1-2.cdninstagram.com/v/t51.82787-15/559243245_18291310699256730_8826552871746242384_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=MTk2ODkxMzUxNTg1NTI5MDYyMg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjEwMjQuc2RyLnJlZ3VsYXJfcGhvdG8uQzMifQ%3D%3D&_nc_ohc=6wvYRbr7R08Q7kNvwG06S9V&_nc_oc=Adqq3ra6AAxrZeYXtFVbK0KmA-6cpTHas4fEHD06rXwz6PDHztJX5OH5LyFaKPka6JI&_nc_zt=23&_nc_ht=scontent-gru1-2.cdninstagram.com&_nc_gid=7G8M5wdZ_bOtAqO7fVUqww&_nc_ss=7e6a8&oh=00_AQDN8H3HOeVg3XtOa5i8hHGNi-2xNyjcUjPA5nEHC29u1A&oe=6A6DA132',
    likes: '1.5k',
    comments: '56',
  },
  {
    image: 'https://scontent-gru1-2.cdninstagram.com/v/t51.82787-15/572205105_18324858760246632_7259210201030346035_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ig_cache_key=MjQwMTc4MDc1ODIyNzQ5OTQzNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjgyOC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=pQ0Ie3uSLwwQ7kNvwGHVpT9&_nc_oc=Ado0enowiGpU4UofUD2A7blrQNmHHZ0WmzcUlDCz-PEwnTO04ZbHU0wlzvSDeqL95GA&_nc_zt=23&_nc_ht=scontent-gru1-2.cdninstagram.com&_nc_gid=EQWBdg3BJF93ZS3-cAEoRg&_nc_ss=7e6a8&oh=00_AQCkl9MCKHBv3SGdPoop-d0DNDccPa6_XMd95XsetrE2AA&oe=6A6D9C3B',
    likes: '1.8k',
    comments: '67',
  },
  {
    image: 'https://scontent-gru2-2.cdninstagram.com/v/t51.82787-15/560536700_18295968103265941_8355073567196491254_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ig_cache_key=MTk2ODkyMDIzMTU5MDQxNzAzNA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjEwMjQuc2RyLnJlZ3VsYXJfcGhvdG8uQzMifQ%3D%3D&_nc_ohc=AomrLxPk0t8Q7kNvwEeII7Z&_nc_oc=Adpp649B5R8-VUyq37zbg2tKNxQ-ajfNdV_TLrDCHDr40pSmFCh87CcuGpUlvW-e6c0&_nc_zt=23&_nc_ht=scontent-gru2-2.cdninstagram.com&_nc_gid=7G8M5wdZ_bOtAqO7fVUqww&_nc_ss=7e6a8&oh=00_AQBb4d-SpnrbWqSM7ESpRl0ys-9O2mAZKY86EfYFHD2FqQ&oe=6A6D8475',
    likes: '987',
    comments: '41',
  },
  {
    image: 'https://scontent-gru2-1.cdninstagram.com/v/t51.82787-15/583708921_18316395580221217_8216098977920859796_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MjQzNzM4MzQ2NzgzMTgwNjU4Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjgyOC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=uKPuUUBD9oYQ7kNvwHs3P9S&_nc_oc=AdoZX0YnXnnzBDczIUWwtY0lunN5S8qc97lFUAf46-moIWrhkc2nRjf1JdXlpqFgGvw&_nc_zt=23&_nc_ht=scontent-gru2-1.cdninstagram.com&_nc_gid=kNlByCr3DM6MAVIRSExlPQ&_nc_ss=7e6a8&oh=00_AQADHOpSFKleOcHJLK-5x49U7Wsj0RDXbbblMUPUgO9BqQ&oe=6A6D9908',
    likes: '1.6k',
    comments: '63',
  },
  {
    image: 'https://scontent-gru1-1.cdninstagram.com/v/t51.82787-15/567633501_18106020025614985_2576937598809293258_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MjQ0MzI5MjY4MjIyODI2NzYwNQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjgyOC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=cs-pgmi_iLkQ7kNvwFgncX6&_nc_oc=Adq-hrGECuHWP8GXw2u3buvvZiF5rJAwoOpUiSXCsQSL-gaa3bv1DOLhXTU0b6vpLyY&_nc_zt=23&_nc_ht=scontent-gru1-1.cdninstagram.com&_nc_gid=kNlByCr3DM6MAVIRSExlPQ&_nc_ss=7e6a8&oh=00_AQCxMKE93IXahaEHF11yFd_eKA9CMCI6KeG9q6NdNxuI7w&oe=6A6DA62D',
    likes: '2.3k',
    comments: '95',
  },
  {
    image: 'https://scontent-gru2-2.cdninstagram.com/v/t51.82787-15/553883087_18097794304726119_7834661113638679457_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MjQyNzI1ODY3NTI3OTQ1NDQ2Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjgyOC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=e3BgA6ZoigAQ7kNvwHdTYRo&_nc_oc=Adp85XxBqx6Mh8viP9uignhXtD8-2t-bE_N4TnzS7RfdeNKmvIMw7frhnB3Ok1fsvdE&_nc_zt=23&_nc_ht=scontent-gru2-2.cdninstagram.com&_nc_gid=EQWBdg3BJF93ZS3-cAEoRg&_nc_ss=7e6a8&oh=00_AQC4gvIkadbPcu1kSuIFU9fh7E3hcXpG9ynlUXqelIak-g&oe=6A6D9469',
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
