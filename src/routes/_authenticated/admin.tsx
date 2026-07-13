import { createFileRoute, Outlet, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, Package, Mail, ExternalLink, ShoppingBag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async ({ context }) => {
    const user = (context as { user?: { id: string } }).user;
    if (!user) throw redirect({ to: "/auth" });
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (error || !data) throw redirect({ to: "/auth" });
  },
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Você saiu");
    navigate({ to: "/auth" });
  };

  return (
    <div className="min-h-screen bg-[#F5F1ED]">
      <header className="bg-white border-b border-[#8B6F47]/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link to="/admin/produtos" className="font-playfair text-xl font-bold text-[#6B4423]">
              Admin
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/admin/produtos"
                className="px-3 py-2 rounded-md text-sm font-poppins text-[#6B5344] hover:bg-[#8B6F47]/10 flex items-center gap-2"
                activeProps={{ className: "px-3 py-2 rounded-md text-sm font-poppins bg-[#8B6F47]/15 text-[#6B4423] flex items-center gap-2 font-semibold" }}
              >
                <Package size={16} /> Produtos
              </Link>
              <Link
                to="/admin/pedidos"
                className="px-3 py-2 rounded-md text-sm font-poppins text-[#6B5344] hover:bg-[#8B6F47]/10 flex items-center gap-2"
                activeProps={{ className: "px-3 py-2 rounded-md text-sm font-poppins bg-[#8B6F47]/15 text-[#6B4423] flex items-center gap-2 font-semibold" }}
              >
                <ShoppingBag size={16} /> Pedidos
              </Link>
              <Link
                to="/admin/mensagens"
                className="px-3 py-2 rounded-md text-sm font-poppins text-[#6B5344] hover:bg-[#8B6F47]/10 flex items-center gap-2"
                activeProps={{ className: "px-3 py-2 rounded-md text-sm font-poppins bg-[#8B6F47]/15 text-[#6B4423] flex items-center gap-2 font-semibold" }}
              >
                <Mail size={16} /> Mensagens
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#8B6F47] hover:underline hidden sm:flex items-center gap-1 font-poppins"
            >
              Ver site <ExternalLink size={12} />
            </a>
            <span className="hidden lg:inline text-xs text-[#6B5344]/70 font-poppins">{email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut size={14} /> Sair
            </Button>
          </div>
        </div>
        <nav className="md:hidden flex border-t border-[#8B6F47]/10 px-2">
          <Link
            to="/admin/produtos"
            className="flex-1 text-center py-2 text-sm font-poppins text-[#6B5344]"
            activeProps={{ className: "flex-1 text-center py-2 text-sm font-poppins text-[#6B4423] font-semibold border-b-2 border-[#8B6F47]" }}
          >
            Produtos
          </Link>
          <Link
            to="/admin/pedidos"
            className="flex-1 text-center py-2 text-sm font-poppins text-[#6B5344]"
            activeProps={{ className: "flex-1 text-center py-2 text-sm font-poppins text-[#6B4423] font-semibold border-b-2 border-[#8B6F47]" }}
          >
            Pedidos
          </Link>
          <Link
            to="/admin/mensagens"
            className="flex-1 text-center py-2 text-sm font-poppins text-[#6B5344]"
            activeProps={{ className: "flex-1 text-center py-2 text-sm font-poppins text-[#6B4423] font-semibold border-b-2 border-[#8B6F47]" }}
          >
            Mensagens
          </Link>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
