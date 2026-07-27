import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2, AlertCircle, RefreshCw, ShoppingBag } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import QuadrantPhotoCard from '@/components/QuadrantPhotoCard';
import { supabase } from '@/integrations/supabase/client';

const ProductGallerySection = () => {
  const [activeCat, setActiveCat] = useState('Todos');

  const { data: products = [], isLoading, error, refetch } = useQuery({
    queryKey: ['products', 'active'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, category, description, image_urls, sort_order')
        .eq('active', true)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ['Todos', ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(
    () => (activeCat === 'Todos' ? products : products.filter((p) => p.category === activeCat)),
    [products, activeCat],
  );

  return (
    <section id="produtos" className="py-12 md:py-16 lg:py-24 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F5F1ED] via-[#8B6F47]/30 to-[#F5F1ED]"></div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-[#8B6F47] font-poppins uppercase tracking-[0.2em] text-xs md:text-sm font-semibold mb-2 md:mb-3 block">
            Nossas Criações
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#6B4423] mb-6 md:mb-8">
            Galeria de Doces
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold font-poppins border-2 transition-all ${
                  activeCat === cat
                    ? 'bg-[#B5446E] border-[#B5446E] text-white shadow-md'
                    : 'border-[#E8D4DC] text-[#8B6F47] hover:border-[#B5446E] hover:text-[#B5446E]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[300px] md:min-h-[400px] relative">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-64 gap-4">
              <Loader2 className="h-10 w-10 md:h-12 md:w-12 animate-spin text-[#8B6F47]" />
              <p className="text-[#8B6F47]/70 font-poppins text-sm">Carregando produtos...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 text-red-500 gap-4 px-4 text-center">
              <AlertCircle className="h-10 w-10 md:h-12 md:w-12" />
              <p className="text-sm md:text-base">Não foi possível carregar os produtos no momento.</p>
              <Button onClick={() => refetch()} variant="outline" className="flex items-center gap-2">
                <RefreshCw size={16} /> Tentar Novamente
              </Button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex justify-center items-center h-64 text-gray-500 text-center px-4">
              <p className="text-sm md:text-base">Nenhum produto disponível nesta categoria no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filtered.map((product) => (
                <div key={product.id} className="h-full transition-all duration-300">
                  <QuadrantPhotoCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <Link
            to="/pedidos"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B5446E] to-[#9b3359] text-white px-8 py-4 rounded-full font-playfair font-bold text-base md:text-lg hover:shadow-[0_8px_24px_rgba(181,68,110,0.35)] hover:scale-105 transition-all"
          >
            <ShoppingBag size={20} />
            Monte seu pedido agora
          </Link>
          <p className="text-[#8B6F47] font-poppins text-xs md:text-sm mt-3">
            Escolha os doces, personalize e finalize pelo WhatsApp em minutos
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductGallerySection;
