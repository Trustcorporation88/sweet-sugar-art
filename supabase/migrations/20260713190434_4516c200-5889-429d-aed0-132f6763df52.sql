-- 1) Move has_role to a private schema so PostgREST does not expose it and
--    linter no longer flags anon/authenticated EXECUTE on a public DEFINER fn.
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- 2) Recreate every policy that referenced public.has_role to use private.has_role.
DROP POLICY IF EXISTS "Admins manage categories" ON public.categories;
CREATE POLICY "Admins manage categories" ON public.categories
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins read all products" ON public.products;
CREATE POLICY "Admins read all products" ON public.products
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins manage products" ON public.products;
CREATE POLICY "Admins manage products" ON public.products
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins read messages" ON public.contact_messages;
CREATE POLICY "Admins read messages" ON public.contact_messages
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins delete messages" ON public.contact_messages;
CREATE POLICY "Admins delete messages" ON public.contact_messages
  FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- 3) Drop the now-unused public.has_role.
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- 4) Replace the always-true INSERT policy on contact_messages with real
--    validation of inbound values (fixes "RLS policy always true" and
--    the contact_messages spoof-flood finding).
DROP POLICY IF EXISTS "Anyone can send message" ON public.contact_messages;
CREATE POLICY "Anyone can send message" ON public.contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(btrim(nome)) BETWEEN 1 AND 100
    AND length(btrim(telefone)) BETWEEN 8 AND 30
    AND length(btrim(mensagem)) BETWEEN 1 AND 2000
  );

-- 5) Belt-and-braces trigger: trim whitespace and enforce the same limits
--    server-side so any future insert path is also validated.
CREATE OR REPLACE FUNCTION public.validate_contact_message()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.nome := btrim(NEW.nome);
  NEW.telefone := btrim(NEW.telefone);
  NEW.mensagem := btrim(NEW.mensagem);

  IF length(NEW.nome) < 1 OR length(NEW.nome) > 100 THEN
    RAISE EXCEPTION 'Invalid name length';
  END IF;
  IF length(NEW.telefone) < 8 OR length(NEW.telefone) > 30 THEN
    RAISE EXCEPTION 'Invalid phone length';
  END IF;
  IF length(NEW.mensagem) < 1 OR length(NEW.mensagem) > 2000 THEN
    RAISE EXCEPTION 'Invalid message length';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_contact_message_trg ON public.contact_messages;
CREATE TRIGGER validate_contact_message_trg
  BEFORE INSERT ON public.contact_messages
  FOR EACH ROW EXECUTE FUNCTION public.validate_contact_message();
