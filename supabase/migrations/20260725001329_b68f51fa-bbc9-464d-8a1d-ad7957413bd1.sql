-- Normalize categories to the two original groups: Gourmet and Personalizados
DELETE FROM public.categories WHERE name IN ('Brigadeiros', 'Bolos', 'Tortas', 'Doces Finos');

INSERT INTO public.categories (name) VALUES ('Gourmet'), ('Personalizados')
ON CONFLICT (name) DO NOTHING;

-- Recategorize existing products
UPDATE public.products SET category = 'Gourmet' WHERE category = 'Brigadeiros Gourmet';
UPDATE public.products SET category = 'Personalizados' WHERE category = 'Doces Personalizados';