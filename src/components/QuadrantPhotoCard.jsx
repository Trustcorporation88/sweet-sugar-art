import React, { useState } from 'react';
import ImageLightbox from '@/components/ImageLightbox';
import SafeImage from '@/components/SafeImage';
import { ZoomIn, ImageOff } from 'lucide-react';

const QuadrantPhotoCard = ({ product }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const urls = product.image_urls || product.imageUrls || [];
  const photos = [urls[0] || null, urls[1] || null, urls[2] || null, urls[3] || null];
  const validPhotos = photos.filter(Boolean);

  const handleImageClick = (originalIndex) => {
    if (!photos[originalIndex]) return;
    const idx = validPhotos.indexOf(photos[originalIndex]);
    if (idx !== -1) {
      setSelectedImageIndex(idx);
      setIsLightboxOpen(true);
    }
  };

  return (
    <>
      <div className="group flex flex-col h-full bg-[#F5F1ED] rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#8B6F47]/10">
        <div className="grid grid-cols-2 aspect-square w-full gap-[3px] bg-white border-b border-[#8B6F47]/20 p-[3px]">
          {photos.map((imgSrc, index) => (
            <div
              key={index}
              className={`relative overflow-hidden aspect-square bg-[#E8E4E0] ${imgSrc ? 'cursor-pointer' : ''}`}
              onClick={() => handleImageClick(index)}
            >
              {imgSrc ? (
                <>
                  <SafeImage
                    src={imgSrc}
                    alt={`${product.name} - view ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="bg-white/80 p-2 rounded-full text-[#6B5344] backdrop-blur-sm transform scale-50 hover:scale-100 transition-transform duration-300">
                      <ZoomIn size={18} />
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <ImageOff size={18} className="mb-1 text-[#8B6F47]/40" />
                  <span className="text-[#8B6F47]/60 text-[10px]">Sem foto</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 text-center flex flex-col flex-grow justify-between bg-[#F5F1ED]">
          <div>
            <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-[#8B6F47]/70 mb-2 font-poppins border-b border-[#8B6F47]/20 pb-1">
              {product.category}
            </span>
            <h3 className="font-playfair text-lg font-bold text-[#6B5344] mb-2 leading-tight group-hover:text-[#8B6F47] transition-colors">
              {product.name}
            </h3>
            <p className="text-[#6B5344]/80 font-poppins text-xs leading-relaxed line-clamp-3">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {isLightboxOpen && validPhotos.length > 0 && (
        <ImageLightbox
          images={validPhotos}
          initialIndex={selectedImageIndex}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </>
  );
};

export default QuadrantPhotoCard;
