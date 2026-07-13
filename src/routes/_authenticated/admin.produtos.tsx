import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { Loader2, Plus, Pencil, Trash2, X, Upload, GripVertical, Eye, EyeOff, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import SafeImage from "@/components/SafeImage";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/produtos")({
  component: ProductsPage,
});

type Product = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number | null;
  image_urls: string[];
  active: boolean;
  sort_order: number;
};

const emptyProduct: Omit<Product, "id"> = {
  name: "",
  category: "",
  description: "",
  price: null,
  image_urls: [],
  active: true,
  sort_order: 0,
};

// Long-lived signed URL (~5 years). Bucket is private (workspace blocks public buckets).
const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 5;

function ProductsPage() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<(Product | (Omit<Product, "id"> & { id?: string })) | null>(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Product[];
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este produto?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error("Erro ao excluir");
    toast.success("Produto excluído");
    qc.invalidateQueries({ queryKey: ["admin", "products"] });
    qc.invalidateQueries({ queryKey: ["products", "active"] });
  };

  const toggleActive = async (p: Product) => {
    const { error } = await supabase.from("products").update({ active: !p.active }).eq("id", p.id);
    if (error) return toast.error("Erro");
    qc.invalidateQueries({ queryKey: ["admin", "products"] });
    qc.invalidateQueries({ queryKey: ["products", "active"] });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="font-playfair text-2xl md:text-3xl font-bold text-[#6B4423]">Produtos</h1>
        <Button onClick={() => setEditing(emptyProduct)} className="bg-[#8B6F47] hover:bg-[#6B4423] text-white gap-2">
          <Plus size={16} /> Novo produto
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-[#8B6F47]" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className={`bg-white rounded-lg border border-[#8B6F47]/10 overflow-hidden ${!p.active ? "opacity-60" : ""}`}>
              <div className="aspect-square bg-[#F5F1ED] grid grid-cols-2 gap-[2px]">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="bg-[#E8E4E0] overflow-hidden">
                    {p.image_urls[i] ? (
                      <img src={p.image_urls[i]} alt="" className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="p-3">
                <div className="text-[10px] uppercase tracking-widest text-[#8B6F47] font-poppins">{p.category}</div>
                <div className="font-semibold text-[#6B4423] font-poppins truncate">{p.name}</div>
                {p.price != null && (
                  <div className="text-sm text-[#6B5344] font-poppins mt-1">R$ {Number(p.price).toFixed(2)}</div>
                )}
                <div className="flex items-center gap-1 mt-3">
                  <Button size="sm" variant="outline" onClick={() => setEditing(p)} className="flex-1 gap-1">
                    <Pencil size={12} /> Editar
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => toggleActive(p)} title={p.active ? "Ocultar" : "Mostrar"}>
                    {p.active ? <Eye size={14} /> : <EyeOff size={14} />}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(p.id)} className="text-red-600 hover:bg-red-50">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <ProductEditor
          initial={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            qc.invalidateQueries({ queryKey: ["admin", "products"] });
            qc.invalidateQueries({ queryKey: ["products", "active"] });
          }}
        />
      )}
    </div>
  );
}

function ProductEditor({
  initial,
  onClose,
  onSaved,
}: {
  initial: Product | (Omit<Product, "id"> & { id?: string });
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const isNew = !("id" in form && form.id);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const newUrls: string[] = [];
      for (const file of Array.from(files)) {
        if (form.image_urls.length + newUrls.length >= 4) {
          toast.error("Máximo de 4 fotos por produto");
          break;
        }
        const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage.from("product-images").upload(path, file, {
          cacheControl: "31536000",
          upsert: false,
        });
        if (upErr) throw upErr;
        const { data: signed, error: signErr } = await supabase.storage
          .from("product-images")
          .createSignedUrl(path, SIGNED_URL_TTL);
        if (signErr) throw signErr;
        newUrls.push(signed.signedUrl);
      }
      setForm({ ...form, image_urls: [...form.image_urls, ...newUrls] });
      toast.success(`${newUrls.length} foto(s) enviada(s)`);
    } catch (e) {
      console.error(e);
      toast.error("Falha no upload");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const removeImage = (idx: number) => {
    setForm({ ...form, image_urls: form.image_urls.filter((_, i) => i !== idx) });
  };

  const moveImage = (idx: number, dir: -1 | 1) => {
    const next = [...form.image_urls];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    setForm({ ...form, image_urls: next });
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.category.trim()) {
      toast.error("Nome e categoria são obrigatórios");
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      description: form.description?.trim() || null,
      price: form.price === null || form.price === undefined || (form.price as unknown as string) === "" ? null : Number(form.price),
      image_urls: form.image_urls,
      active: form.active,
      sort_order: Number(form.sort_order) || 0,
    };
    const { error } = isNew
      ? await supabase.from("products").insert(payload)
      : await supabase.from("products").update(payload).eq("id", (form as Product).id);
    setSaving(false);
    if (error) return toast.error("Erro ao salvar: " + error.message);
    toast.success(isNew ? "Produto criado" : "Produto atualizado");
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-[#8B6F47]/10 px-6 py-4 flex items-center justify-between">
          <h2 className="font-playfair text-xl font-bold text-[#6B4423]">
            {isNew ? "Novo produto" : "Editar produto"}
          </h2>
          <button onClick={onClose} className="text-[#6B5344] hover:text-[#6B4423]"><X size={20} /></button>
        </div>

        <div className="p-6 space-y-4">
          {/* Photos */}
          <div>
            <label className="block text-sm font-medium text-[#6B4423] mb-2 font-poppins">Fotos (até 4)</label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {form.image_urls.map((url, i) => (
                <div key={i} className="relative aspect-square bg-[#F5F1ED] rounded overflow-hidden group">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition">
                    <button onClick={() => removeImage(i)} className="text-white p-1 hover:bg-red-500 rounded"><Trash2 size={14} /></button>
                    <div className="flex gap-1">
                      <button onClick={() => moveImage(i, -1)} className="text-white text-xs px-2 hover:bg-white/20 rounded" disabled={i === 0}>←</button>
                      <button onClick={() => moveImage(i, 1)} className="text-white text-xs px-2 hover:bg-white/20 rounded" disabled={i === form.image_urls.length - 1}>→</button>
                    </div>
                  </div>
                  <div className="absolute top-1 left-1 bg-white/90 text-[10px] px-1.5 rounded font-poppins">{i + 1}</div>
                </div>
              ))}
              {form.image_urls.length < 4 && (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="aspect-square border-2 border-dashed border-[#8B6F47]/40 rounded flex flex-col items-center justify-center text-[#8B6F47] hover:bg-[#8B6F47]/5"
                >
                  {uploading ? <Loader2 size={20} className="animate-spin" /> : <><Upload size={20} /><span className="text-[10px] mt-1 font-poppins">Adicionar</span></>}
                </button>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <p className="text-xs text-[#6B5344]/60 font-poppins">A primeira foto é a capa. Passe o mouse para reordenar ou remover.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Nome *">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-[#8B6F47]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B6F47] font-poppins"
              />
            </Field>
            <Field label="Categoria *">
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Ex: Brigadeiros"
                className="w-full px-3 py-2 border border-[#8B6F47]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B6F47] font-poppins"
              />
            </Field>
          </div>

          <Field label="Descrição">
            <textarea
              rows={3}
              value={form.description ?? ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 border border-[#8B6F47]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B6F47] font-poppins"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Preço (R$)">
              <input
                type="number"
                step="0.01"
                value={form.price ?? ""}
                onChange={(e) => setForm({ ...form, price: e.target.value === "" ? null : Number(e.target.value) })}
                className="w-full px-3 py-2 border border-[#8B6F47]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B6F47] font-poppins"
              />
            </Field>
            <Field label="Ordem">
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-[#8B6F47]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B6F47] font-poppins"
              />
            </Field>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="w-4 h-4 accent-[#8B6F47]"
            />
            <span className="text-sm text-[#6B4423] font-poppins">Produto ativo (visível no site)</span>
          </label>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-[#8B6F47]/10 px-6 py-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} disabled={saving} className="bg-[#8B6F47] hover:bg-[#6B4423] text-white gap-2">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#6B4423] mb-1 font-poppins">{label}</label>
      {children}
    </div>
  );
}
