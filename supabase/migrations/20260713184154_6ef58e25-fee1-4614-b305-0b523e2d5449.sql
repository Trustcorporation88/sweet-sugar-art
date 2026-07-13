
-- Roles enum + user_roles + has_role
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

-- updated_at helper
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Categories
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are public" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins manage categories" ON public.categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_categories_updated BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2),
  image_urls TEXT[] NOT NULL DEFAULT '{}',
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active products public" ON public.products FOR SELECT USING (active = true);
CREATE POLICY "Admins read all products" ON public.products FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage products" ON public.products FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_products_updated BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Contact messages
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send message" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read messages" ON public.contact_messages FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete messages" ON public.contact_messages FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Seed sample products with placeholder images (Unsplash) so gallery has content
INSERT INTO public.categories (name) VALUES
  ('Brigadeiros'), ('Bolos'), ('Tortas'), ('Doces Finos');

INSERT INTO public.products (name, category, description, image_urls, sort_order) VALUES
  ('Brigadeiros Gourmet', 'Brigadeiros', 'Brigadeiros artesanais em sabores exclusivos: tradicional, pistache, maracujá e beijinho.',
   ARRAY[
     'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800',
     'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800',
     'https://images.unsplash.com/photo-1587244141670-6d089ce6a1a1?w=800',
     'https://images.unsplash.com/photo-1626803775151-61d756612f97?w=800'
   ], 1),
  ('Bolo de Aniversário', 'Bolos', 'Bolos personalizados para tornar seu evento único e inesquecível.',
   ARRAY[
     'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
     'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800',
     'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800',
     'https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=800'
   ], 2),
  ('Torta de Frutas Vermelhas', 'Tortas', 'Massa amanteigada com creme e frutas vermelhas frescas.',
   ARRAY[
     'https://images.unsplash.com/photo-1464195244916-405fa0a82545?w=800',
     'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800',
     'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800',
     'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800'
   ], 3),
  ('Mesa de Doces Finos', 'Doces Finos', 'Seleção premium de doces finos para casamentos e eventos elegantes.',
   ARRAY[
     'https://images.unsplash.com/photo-1519869325930-281384150729?w=800',
     'https://images.unsplash.com/photo-1587248720327-8eb72564be1e?w=800',
     'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800',
     'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800'
   ], 4);
