import React, { useState } from 'react';
import { getImageUrl } from '@/lib/utils';
import ImageLightbox from '@/components/ImageLightbox';
import { ZoomIn } from 'lucide-react';

const QuadrantPhotoCard = ({ product }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Construct photos array using the updated getImageUrl utility
  // Prioritize the imageUrls array if it exists (from Express API)
  // Fallback to individual photo fields (from PocketBase or legacy data)
  const photos = product.imageUrls && product.imageUrls.length > 0 
    ? [
        product.imageUrls[0] || null,
        product.imageUrls[1] || null,
        product.imageUrls[2] || null,
        product.imageUrls[3] || null
      ]
    : [
        getImageUrl(product, product.image || product.photo1 || product.foto),
        getImageUrl(product, product.photo2),
        getImageUrl(product, product.photo3),
        getImageUrl(product, product.photo4)
      ];

  // Filter out nulls for the lightbox
  const validPhotos = photos.filter(Boolean);

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextElementSibling.style.display = 'flex';
  };

  const handleImageClick = (originalIndex) => {
    if (!photos[originalIndex]) return;
    
    // Find the index of this photo in the validPhotos array
    const clickedPhotoUrl = photos[originalIndex];
    const validIndex = validPhotos.indexOf(clickedPhotoUrl);
    
    if (validIndex !== -1) {
      setSelectedImageIndex(validIndex);
      setIsLightboxOpen(true);
    }
  };

  return (
    <>
      <div className="group flex flex-col h-full bg-[#F5F1ED] rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#8B6F47]/10">
        {/* 2x2 Grid of Photos with white gaps */}
        <div className="grid grid-cols-2 aspect-square w-full gap-[3px] bg-white border-b border-[#8B6F47]/20 p-[3px]">
          {photos.map((imgSrc, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden aspect-square bg-[#E8E4E0] ${imgSrc ? 'cursor-pointer' : ''}`}
              onClick={() => handleImageClick(index)}
            >
              {imgSrc ? (
                <>
                  <img
                    src={imgSrc}
                    alt={`${product.name || product.nome} - view ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="hidden w-full h-full items-center justify-center absolute inset-0 bg-[#E8E4E0]">
                    <span className="text-[#8B6F47]/60 text-[10px]">Erro ao carregar</span>
                  </div>
                  {/* Hover Overlay with Zoom Icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="bg-white/80 p-2 rounded-full text-[#6B5344] backdrop-blur-sm transform scale-50 hover:scale-100 transition-transform duration-300">
                      <ZoomIn size={18} />
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[#8B6F47]/60 text-[10px]">Sem foto</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Card Content */}
        <div className="p-4 text-center flex flex-col flex-grow justify-between bg-[#F5F1ED]">
          <div>
            <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-[#8B6F47]/70 mb-2 font-poppins border-b border-[#8B6F47]/20 pb-1">
              {product.category || product.categoria}
            </span>
            <h3 className="font-playfair text-lg font-bold text-[#6B5344] mb-2 leading-tight group-hover:text-[#8B6F47] transition-colors">
              {product.name || product.nome}
            </h3>
            <p className="text-[#6B5344]/80 font-poppins text-xs leading-relaxed line-clamp-3">
              {product.description || product.descricao}
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
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