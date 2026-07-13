import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Área Administrativa — Cyntia Rinaldi Doces" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/produtos" });
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error("E-mail ou senha inválidos");
      return;
    }
    toast.success("Bem-vinda!");
    navigate({ to: "/admin/produtos" });
  };

  return (
    <div className="min-h-screen bg-[#F5F1ED] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-[#8B6F47]/10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#8B6F47]/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-[#8B6F47]" />
          </div>
          <h1 className="font-playfair text-2xl font-bold text-[#6B4423]">Área Administrativa</h1>
          <p className="text-sm text-[#6B5344]/70 mt-2 font-poppins">Cyntia Rinaldi Doces</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#6B4423] mb-1 font-poppins">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-[#8B6F47]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B6F47] font-poppins"
              placeholder="voce@exemplo.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6B4423] mb-1 font-poppins">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-[#8B6F47]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B6F47] font-poppins"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8B6F47] hover:bg-[#6B4423] text-white"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Entrar"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-[#8B6F47] hover:underline font-poppins">
            ← Voltar para o site
          </Link>
        </div>
      </div>
    </div>
  );
}
