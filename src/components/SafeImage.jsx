import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

export function SafeImage({ src, alt, className, fallbackClassName = 'flex items-center justify-center bg-[#E8E4E0]' }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className={`${className} ${fallbackClassName}`}>
        <div className="text-center px-2">
          <ImageOff size={18} className="mx-auto mb-1 text-[#8B6F47]/50" />
          <span className="text-[#8B6F47]/60 text-[10px]">Sem foto</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || ''}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth === 0) setFailed(true);
      }}
    />
  );
}

export default SafeImage;
