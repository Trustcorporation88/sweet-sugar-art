import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';

const PromoBanner = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-r from-[#B5446E] via-[#9b3359] to-[#6B4423] text-white text-center py-2.5 px-4 text-xs md:text-sm font-poppins font-medium tracking-wide">
      <span className="inline-flex items-center gap-2">
        <Sparkles size={14} className="text-[#D4AF37]" />
        Encomendas abertas para eventos de agosto e setembro — reserve sua data com 5 dias de antecedência
      </span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
        aria-label="Fechar aviso"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default PromoBanner;
