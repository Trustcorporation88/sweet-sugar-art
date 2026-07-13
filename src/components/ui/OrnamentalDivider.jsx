import React from 'react';
import { motion } from 'framer-motion';

const OrnamentalDivider = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center w-full py-8 ${className}`}>
      <motion.svg
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        width="300"
        height="40"
        viewBox="0 0 300 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#D4AF37]"
      >
        <path
          d="M150 20C130 20 120 10 100 10C80 10 70 20 50 20C30 20 20 10 0 10"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="opacity-60"
        />
        <path
          d="M150 20C170 20 180 10 200 10C220 10 230 20 250 20C270 20 280 10 300 10"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="opacity-60"
        />
        <circle cx="150" cy="20" r="4" fill="currentColor" />
        <circle cx="130" cy="20" r="2" fill="currentColor" className="opacity-60" />
        <circle cx="170" cy="20" r="2" fill="currentColor" className="opacity-60" />
      </motion.svg>
    </div>
  );
};

export default OrnamentalDivider;