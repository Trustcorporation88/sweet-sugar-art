import { createFileRoute } from "@tanstack/react-router";
import LinkBioPage from "@/pages/LinkBioPage";

export const Route = createFileRoute("/link")({
  head: () => ({
    meta: [
      { title: "Cyntia Rinaldi Doces — Link na Bio" },
      {
        name: "description",
        content:
          "Doces artesanais em Bauru. Faça seu pedido, fale no WhatsApp ou visite nosso site completo.",
      },
      { property: "og:title", content: "Cyntia Rinaldi Doces — Doces Artesanais em Bauru" },
      {
        property: "og:description",
        content:
          "Brigadeiros gourmet, bolos personalizados e doces finos. Encomendas abertas!",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LinkBioPage,
});
