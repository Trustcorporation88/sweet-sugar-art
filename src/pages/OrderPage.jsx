import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import {
  Loader2, AlertCircle, RefreshCw, Check, Minus, Plus,
  ShoppingBag, Calendar, Truck, MessageCircle, ArrowLeft, ArrowRight, Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import SafeImage from '@/components/SafeImage';

const WHATSAPP_NUMBER = '5514997091179';
const MIN_TOTAL = 30;

const STEPS = [
  { id: 1, label: 'Produtos', icon: ShoppingBag },
  { id: 2, label: 'Detalhes', icon: Sparkles },
  { id: 3, label: 'Entrega', icon: Truck },
  { id: 4, label: 'Confirmar', icon: Check },
];

const OrderPage = () => {
  const [step, setStep] = useState(1);
  const [activeCat, setActiveCat] = useState('Todos');
  const [qty, setQty] = useState({}); // { productId: number }

  const [details, setDetails] = useState({
    occasion: '',
    theme: '',
    guests: '',
    notes: '',
  });

  const [delivery, setDelivery] = useState({
    mode: 'retirada', // 'retirada' | 'entrega'
    date: '',
    time: '',
    address: '',
  });

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const { data: products = [], isLoading, error, refetch } = useQuery({
    queryKey: ['products', 'active', 'order'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, category, description, image_urls, price, sort_order')
        .eq('active', true)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ['Todos', ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(
    () => (activeCat === 'Todos' ? products : products.filter((p) => p.category === activeCat)),
    [products, activeCat],
  );

  const selected = useMemo(
    () => products.filter((p) => (qty[p.id] ?? 0) > 0).map((p) => ({ ...p, qty: qty[p.id] })),
    [products, qty],
  );

  const totalItems = selected.reduce((s, p) => s + p.qty, 0);
  const totalPrice = selected.reduce((s, p) => s + (p.price ? Number(p.price) * p.qty : 0), 0);
  const anyPriced = selected.some((p) => p.price);

  const setQ = (id, delta) =>
    setQty((prev) => {
      const next = Math.max(0, (prev[id] ?? 0) + delta);
      const copy = { ...prev };
      if (next === 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });

  const canNext = () => {
    if (step === 1) return totalItems > 0;
    if (step === 2) return details.occasion.trim().length > 0;
    if (step === 3) {
      if (!delivery.date) return false;
      if (delivery.mode === 'entrega' && !delivery.address.trim()) return false;
      return true;
    }
    return true;
  };

  const buildMessage = () => {
    const lines = [];
    lines.push('*Novo Pedido — Cyntia Rinaldi Doces* 🍫');
    lines.push('');
    lines.push('*Cliente*');
    lines.push(`• Nome: ${customer.name || '—'}`);
    if (customer.phone) lines.push(`• Telefone: ${customer.phone}`);
    if (customer.email) lines.push(`• Email: ${customer.email}`);
    lines.push('');
    lines.push('*Itens*');
    selected.forEach((p) => {
      const price = p.price ? ` — R$ ${(Number(p.price) * p.qty).toFixed(2)}` : '';
      lines.push(`• ${p.qty}x ${p.name}${price}`);
    });
    if (anyPriced) lines.push(`\n*Subtotal estimado:* R$ ${totalPrice.toFixed(2)}`);
    lines.push('');
    lines.push('*Detalhes*');
    lines.push(`• Ocasião: ${details.occasion}`);
    if (details.theme) lines.push(`• Tema: ${details.theme}`);
    if (details.guests) lines.push(`• Convidados: ${details.guests}`);
    if (details.notes) lines.push(`• Observações: ${details.notes}`);
    lines.push('');
    lines.push('*Entrega*');
    lines.push(`• Modalidade: ${delivery.mode === 'entrega' ? 'Entrega' : 'Retirada'}`);
    lines.push(`• Data: ${delivery.date}${delivery.time ? ` às ${delivery.time}` : ''}`);
    if (delivery.mode === 'entrega') lines.push(`• Endereço: ${delivery.address}`);
    return lines.join('\n');
  };

  const submit = () => {
    if (!customer.name.trim() || !customer.phone.trim()) {
      toast.error('Preencha seu nome e telefone antes de enviar.');
      return;
    }
    if (anyPriced && totalPrice < MIN_TOTAL) {
      toast.error(`Pedido mínimo de R$ ${MIN_TOTAL.toFixed(2)}.`);
      return;
    }
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    toast.success('Pedido enviado para o WhatsApp!');
  };

  return (
    <div className="min-h-screen bg-[#FDF6F9]">
      {/* Top bar */}
      <header className="bg-white border-b border-[#F0E0E8] sticky top-0 z-40">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-playfair text-xl text-[#B5446E]">
            Cyntia Rinaldi <span className="text-[#C9933A]">Doces</span>
          </Link>
          <Link
            to="/"
            className="text-sm text-[#6B4423] hover:text-[#B5446E] font-poppins flex items-center gap-1"
          >
            <ArrowLeft size={16} /> Voltar
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#F7E8EF] to-[#FDF3E3] text-center py-12 md:py-16 px-4">
        <span className="inline-block bg-[#B5446E] text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
          ✨ Faça seu pedido
        </span>
        <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-[#6B4423] font-bold mb-3">
          Monte seu pedido de <em className="text-[#B5446E] not-italic">doces artesanais</em>
        </h1>
        <p className="text-[#8B6F47] max-w-xl mx-auto font-poppins text-sm md:text-base">
          Brigadeiros gourmet e doces personalizados feitos com amor em Bauru
        </p>
        <p className="text-[#B5446E] font-medium text-xs md:text-sm mt-3">
          ⏰ Prazo mínimo: 3 a 5 dias úteis para produção
        </p>
      </section>

      {/* Stepper */}
      <div className="max-w-[1100px] mx-auto px-4 pt-8">
        <ol className="flex items-center justify-center flex-wrap gap-2 md:gap-0">
          {STEPS.map((s, i) => {
            const state = step === s.id ? 'active' : step > s.id ? 'done' : 'idle';
            const Icon = s.icon;
            return (
              <li key={s.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      state === 'active'
                        ? 'bg-[#B5446E] text-white shadow-lg scale-110'
                        : state === 'done'
                          ? 'bg-[#C9933A] text-white'
                          : 'bg-[#E8D4DC] text-[#8B6F47]'
                    }`}
                  >
                    {state === 'done' ? <Check size={18} /> : <Icon size={16} />}
                  </div>
                  <span className="text-[11px] md:text-xs text-[#8B6F47] font-poppins mt-1.5">
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`w-8 md:w-16 h-0.5 mx-1 md:mx-2 mb-5 ${
                      step > s.id ? 'bg-[#C9933A]' : 'bg-[#E8D4DC]'
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Main */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
        {/* LEFT — steps */}
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(181,68,110,0.10)] p-6 md:p-8">
          {step === 1 && (
            <>
              <h2 className="font-playfair text-2xl text-[#6B4423] mb-1">🍫 Escolha seus doces</h2>
              <p className="text-sm text-[#8B6F47] mb-6 font-poppins">
                Selecione os produtos e a quantidade desejada
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCat(c)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold font-poppins border-2 transition ${
                      activeCat === c
                        ? 'bg-[#B5446E] border-[#B5446E] text-white'
                        : 'border-[#E8D4DC] text-[#8B6F47] hover:border-[#B5446E] hover:text-[#B5446E]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center py-12 gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-[#B5446E]" />
                  <p className="text-sm text-[#8B6F47]">Carregando produtos...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center py-12 gap-3 text-red-500">
                  <AlertCircle className="w-8 h-8" />
                  <p className="text-sm">Não foi possível carregar os produtos.</p>
                  <Button onClick={() => refetch()} variant="outline" className="gap-2">
                    <RefreshCw size={14} /> Tentar novamente
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {filtered.map((p) => {
                    const q = qty[p.id] ?? 0;
                    const active = q > 0;
                    const img = p.image_urls?.[0];
                    return (
                      <div
                        key={p.id}
                        className={`relative rounded-xl overflow-hidden border-2 bg-white transition ${
                          active
                            ? 'border-[#B5446E] ring-2 ring-[#B5446E]/20'
                            : 'border-[#F0E0E8] hover:border-[#B5446E]/50'
                        }`}
                      >
                        <span className="absolute top-2 left-2 z-10 bg-[#C9933A] text-white text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded">
                          {p.category}
                        </span>
                        {active && (
                          <span className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-[#B5446E] text-white flex items-center justify-center">
                            <Check size={14} />
                          </span>
                        )}
                        <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#F7E8EF] to-[#FDF3E3] overflow-hidden">
                          {img ? (
                            <img src={img} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                          ) : (
                            <div className="flex items-center justify-center h-full text-3xl">🍫</div>
                          )}
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-semibold text-[#6B4423] font-poppins line-clamp-1">
                            {p.name}
                          </p>
                          {p.description && (
                            <p className="text-[11px] text-[#8B6F47] mt-0.5 line-clamp-2 font-poppins">
                              {p.description}
                            </p>
                          )}
                          {p.price && (
                            <p className="text-sm font-bold text-[#B5446E] mt-1">
                              R$ {Number(p.price).toFixed(2)}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => setQ(p.id, -1)}
                              disabled={q === 0}
                              className="w-7 h-7 rounded-full border-2 border-[#B5446E] text-[#B5446E] flex items-center justify-center hover:bg-[#B5446E] hover:text-white transition disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#B5446E]"
                              aria-label="Diminuir"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="min-w-[24px] text-center font-bold text-sm text-[#6B4423]">
                              {q}
                            </span>
                            <button
                              onClick={() => setQ(p.id, 1)}
                              className="w-7 h-7 rounded-full border-2 border-[#B5446E] text-[#B5446E] flex items-center justify-center hover:bg-[#B5446E] hover:text-white transition"
                              aria-label="Aumentar"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-playfair text-2xl text-[#6B4423] mb-1">✨ Detalhes do evento</h2>
              <p className="text-sm text-[#8B6F47] mb-6 font-poppins">
                Conte pra gente para quem são os doces
              </p>

              <div className="space-y-4">
                <Field label="Ocasião *">
                  <select
                    className="input"
                    value={details.occasion}
                    onChange={(e) => setDetails({ ...details, occasion: e.target.value })}
                  >
                    <option value="">Selecione...</option>
                    <option>Aniversário Infantil</option>
                    <option>Aniversário Adulto</option>
                    <option>Casamento</option>
                    <option>Chá de Bebê / Revelação</option>
                    <option>Evento Corporativo</option>
                    <option>Presente</option>
                    <option>Outro</option>
                  </select>
                </Field>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Tema / Cores">
                    <input
                      className="input"
                      placeholder="Ex: Rosa e dourado, Turma do Mickey..."
                      value={details.theme}
                      onChange={(e) => setDetails({ ...details, theme: e.target.value })}
                    />
                  </Field>
                  <Field label="Nº de convidados">
                    <input
                      className="input"
                      type="number"
                      min="1"
                      placeholder="Ex: 30"
                      value={details.guests}
                      onChange={(e) => setDetails({ ...details, guests: e.target.value })}
                    />
                  </Field>
                </div>
                <Field label="Observações">
                  <textarea
                    className="input min-h-[110px] resize-y"
                    placeholder="Alergias, preferências, decoração especial..."
                    value={details.notes}
                    onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                  />
                </Field>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="font-playfair text-2xl text-[#6B4423] mb-1">
                <Calendar className="inline mr-2 -mt-1" size={22} />
                Entrega ou retirada
              </h2>
              <p className="text-sm text-[#8B6F47] mb-6 font-poppins">
                Escolha a modalidade e a data desejada
              </p>

              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { key: 'retirada', icon: '🏠', label: 'Retirada', sub: 'No ateliê em Bauru' },
                  { key: 'entrega', icon: '🚚', label: 'Entrega', sub: 'Bauru e região' },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setDelivery({ ...delivery, mode: opt.key })}
                    className={`rounded-xl border-2 p-4 text-center transition ${
                      delivery.mode === opt.key
                        ? 'border-[#B5446E] bg-[#F7E8EF]'
                        : 'border-[#F0E0E8] hover:border-[#B5446E]/50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{opt.icon}</div>
                    <div className="font-semibold text-[#6B4423] font-poppins text-sm">{opt.label}</div>
                    <div className="text-xs text-[#8B6F47]">{opt.sub}</div>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Data desejada *">
                  <input
                    className="input"
                    type="date"
                    min={new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]}
                    value={delivery.date}
                    onChange={(e) => setDelivery({ ...delivery, date: e.target.value })}
                  />
                </Field>
                <Field label="Horário">
                  <input
                    className="input"
                    type="time"
                    value={delivery.time}
                    onChange={(e) => setDelivery({ ...delivery, time: e.target.value })}
                  />
                </Field>
              </div>

              {delivery.mode === 'entrega' && (
                <div className="mt-4">
                  <Field label="Endereço completo *">
                    <textarea
                      className="input min-h-[80px] resize-y"
                      placeholder="Rua, número, bairro, cidade, ponto de referência..."
                      value={delivery.address}
                      onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
                    />
                  </Field>
                </div>
              )}
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="font-playfair text-2xl text-[#6B4423] mb-1">✅ Confirmar pedido</h2>
              <p className="text-sm text-[#8B6F47] mb-6 font-poppins">
                Seus dados para finalizarmos pelo WhatsApp
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Field label="Seu nome *">
                  <input
                    className="input"
                    placeholder="Nome completo"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  />
                </Field>
                <Field label="WhatsApp *">
                  <input
                    className="input"
                    placeholder="(14) 99999-9999"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  />
                </Field>
                <div className="md:col-span-2">
                  <Field label="Email (opcional)">
                    <input
                      className="input"
                      type="email"
                      placeholder="voce@email.com"
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    />
                  </Field>
                </div>
              </div>

              <div className="bg-[#FDF6F9] rounded-xl p-4 border border-[#F0E0E8]">
                <h3 className="font-playfair text-lg text-[#6B4423] mb-3">Resumo</h3>
                <div className="text-sm text-[#8B6F47] font-poppins space-y-1.5">
                  <p><b>{totalItems}</b> itens selecionados</p>
                  <p><b>Ocasião:</b> {details.occasion || '—'}</p>
                  <p>
                    <b>{delivery.mode === 'entrega' ? 'Entrega' : 'Retirada'}:</b>{' '}
                    {delivery.date ? new Date(delivery.date + 'T00:00').toLocaleDateString('pt-BR') : '—'}
                    {delivery.time ? ` às ${delivery.time}` : ''}
                  </p>
                </div>
              </div>

              <button
                onClick={submit}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1db954] text-white font-bold py-4 rounded-full transition shadow-lg shadow-[#25D366]/30"
              >
                <MessageCircle size={20} />
                Enviar pedido pelo WhatsApp
              </button>
              <p className="text-xs text-[#8B6F47] text-center mt-3 font-poppins">
                Você será redirecionado ao WhatsApp com todos os detalhes prontos ✨
              </p>
            </>
          )}

          {/* Nav buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#F0E0E8]">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="flex items-center gap-1 text-sm font-semibold text-[#8B6F47] hover:text-[#B5446E] disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ArrowLeft size={16} /> Voltar
            </button>
            {step < 4 ? (
              <button
                onClick={() => canNext() && setStep((s) => s + 1)}
                disabled={!canNext()}
                className="flex items-center gap-1 bg-[#B5446E] hover:bg-[#9b3359] disabled:bg-[#E8D4DC] disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-2.5 rounded-full transition"
              >
                Continuar <ArrowRight size={16} />
              </button>
            ) : (
              <span className="text-xs text-[#8B6F47]">Etapa final</span>
            )}
          </div>
        </div>

        {/* RIGHT — summary */}
        <aside className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(181,68,110,0.10)] p-6 lg:sticky lg:top-24">
          <h3 className="font-playfair text-xl text-[#6B4423] pb-3 border-b-2 border-[#F7E8EF] mb-4">
            Seu pedido
          </h3>
          {selected.length === 0 ? (
            <div className="text-center py-6 text-[#8B6F47]">
              <div className="text-4xl mb-2">🍫</div>
              <p className="text-sm font-poppins">Nenhum doce selecionado ainda</p>
            </div>
          ) : (
            <>
              <ul className="space-y-2 mb-4">
                {selected.map((p) => (
                  <li
                    key={p.id}
                    className="flex justify-between items-start py-2 border-b border-[#F5EAF0] text-sm"
                  >
                    <div>
                      <p className="font-semibold text-[#6B4423] font-poppins">{p.name}</p>
                      <p className="text-xs text-[#8B6F47]">
                        {p.qty}x {p.price ? `· R$ ${Number(p.price).toFixed(2)}/un` : ''}
                      </p>
                    </div>
                    {p.price && (
                      <span className="font-bold text-[#B5446E] whitespace-nowrap">
                        R$ {(Number(p.price) * p.qty).toFixed(2)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <div className="border-t-2 border-dashed border-[#F0E0E8] pt-3 flex justify-between font-bold">
                <span className="text-[#6B4423]">Total</span>
                <span className="text-[#B5446E]">
                  {anyPriced ? `R$ ${totalPrice.toFixed(2)}` : `${totalItems} itens`}
                </span>
              </div>
              {anyPriced && (
                <p className="text-xs text-[#8B6F47] text-center mt-2 font-poppins">
                  Pedido mínimo: R$ {MIN_TOTAL.toFixed(2)}
                </p>
              )}
            </>
          )}

          <div className="flex justify-center gap-3 mt-5 text-[11px] text-[#8B6F47] font-poppins">
            <span>💖 Feito à mão</span>
            <span>·</span>
            <span>⭐ 5.0 avaliação</span>
          </div>
        </aside>
      </div>

      <footer className="bg-[#2b1a14] text-white/60 text-center py-5 text-xs font-poppins">
        © {new Date().getFullYear()} Cyntia Rinaldi Doces · Bauru/SP
      </footer>

      <style>{`
        .input {
          width: 100%;
          padding: 11px 14px;
          border: 2px solid #F0E0E8;
          border-radius: 10px;
          font-size: 0.9rem;
          color: #6B4423;
          background: white;
          outline: none;
          transition: border-color .2s;
          font-family: inherit;
        }
        .input:focus { border-color: #B5446E; }
      `}</style>
    </div>
  );
};

const Field = ({ label, children }) => (
  <label className="block">
    <span className="block text-sm font-semibold text-[#6B4423] mb-1.5 font-poppins">{label}</span>
    {children}
  </label>
);

export default OrderPage;
