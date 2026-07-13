# Painel Admin — Cyntia Rinaldi Doces

Um único painel controla tudo: os produtos aparecem tanto na **galeria do site** quanto na **página de pedidos** (`/pedidos`), porque ambos leem da mesma tabela.

## O que você vai poder fazer

**Login seguro em `/admin`**
- Entrar com e-mail e senha (só você tem acesso)
- Sair a qualquer momento

**Gerenciar produtos em `/admin/produtos`**
- Ver todos os produtos em uma lista
- Criar produto novo
- Editar: nome, categoria, descrição, preço, ordem de exibição, ativo/inativo
- **Upload de fotos arrastando ou clicando** — até 4 fotos por produto
- Reordenar fotos, remover foto
- Excluir produto

**Ver mensagens de contato em `/admin/mensagens`**
- Ler mensagens enviadas pelo formulário do site

## Como as fotos funcionam

Você arrasta a foto no navegador → ela é enviada para um armazenamento seguro na nuvem → aparece imediatamente no site e na página de pedidos. Sem precisar hospedar em outro lugar.

## Plano de execução

1. **Ativar login** com e-mail/senha
2. **Criar seu usuário admin** — você me diz o e-mail que quer usar e eu configuro para ser administrador
3. **Criar bucket de armazenamento** público para as fotos dos produtos
4. **Página `/auth`** com formulário de login
5. **Área `/admin`** protegida (só entra quem tem papel de admin)
   - `/admin/produtos` — lista + editor com upload de fotos
   - `/admin/mensagens` — leitura de mensagens de contato
6. **Botão discreto de admin** no rodapé para você acessar facilmente

## Detalhes técnicos

- Auth via Lovable Cloud (email/password); papel `admin` na tabela `user_roles` já existente
- Novo bucket `product-images` (público, com policies restringindo upload/delete a admins)
- Upload usa `supabase.storage.from('product-images').upload(...)` e salva a URL pública em `products.image_urls`
- Rotas TanStack: `/auth` (pública), `/admin/*` sob layout `_authenticated` com gate adicional de role admin
- Reuso do design system existente (cores rose/dourado, Playfair + Poppins)

## O que preciso de você antes de começar

1. **Qual e-mail** você quer usar para logar como admin?
2. Uma **senha inicial** (pode trocar depois) — ou prefere que eu gere e você defina no primeiro login?
