import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Mail, Phone, Trash2, ShoppingBag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/pedidos")({
  component: OrdersPage,
});

function OrdersPage() {
  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ["admin", "contact_messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este pedido/orçamento?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) return toast.error("Erro ao excluir");
    toast.success("Pedido excluído");
    refetch();
  };

  return (
    <div>
      <h1 className="font-playfair text-2xl md:text-3xl font-bold text-[#6B4423] mb-2">Pedidos & Orçamentos</h1>
      <p className="text-sm text-[#6B5344]/70 font-poppins mb-6">
        Mensagens recebidas pelo formulário de contato e pedidos de orçamento.
      </p>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-[#8B6F47]" /></div>
      ) : data.length === 0 ? (
        <div className="bg-white rounded-lg p-12 text-center text-[#6B5344]/70 font-poppins">
          <ShoppingBag className="w-10 h-10 mx-auto mb-3 text-[#8B6F47]/50" />
          Nenhum pedido ou orçamento recebido ainda.
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((m) => (
            <div key={m.id} className="bg-white rounded-lg border border-[#8B6F47]/10 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <div>
                  <div className="font-semibold text-[#6B4423] font-poppins">{m.nome}</div>
                  <div className="flex items-center gap-3 text-xs text-[#6B5344]/70 mt-1">
                    <a href={`https://wa.me/55${m.telefone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#8B6F47]">
                      <Phone size={12} /> {m.telefone}
                    </a>
                    <span>{new Date(m.created_at).toLocaleString("pt-BR")}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(m.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Trash2 size={14} />
                </Button>
              </div>
              <p className="text-sm text-[#6B5344] font-poppins whitespace-pre-wrap mt-2 border-t border-[#8B6F47]/10 pt-3 flex gap-2">
                <Mail size={14} className="text-[#8B6F47] shrink-0 mt-0.5" />
                {m.mensagem}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
