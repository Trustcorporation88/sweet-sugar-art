import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ImageLightbox = ({ images, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    
    // Prevent scrolling on body when lightbox is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, onClose]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
          aria-label="Fechar"
        >
          <X size={24} />
        </button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-2 md:left-8 text-white/70 hover:text-white z-50 p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft size={32} className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-2 md:right-8 text-white/70 hover:text-white z-50 p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
              aria-label="Próxima"
            >
              <ChevronRight size={32} className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </>
        )}

        {/* Image Container */}
        <div 
          className="relative w-full max-w-[95vw] md:max-w-[85vw] h-[85vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={images[currentIndex]}
              alt={`Imagem ${currentIndex + 1} de ${images.length}`}
              className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
            />
          </AnimatePresence>
          
          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white/70 font-poppins text-sm tracking-widest bg-black/50 px-4 py-1.5 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageLightbox;