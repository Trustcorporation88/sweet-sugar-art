import { createFileRoute } from "@tanstack/react-router";
import OrderPage from "@/pages/OrderPage";

export const Route = createFileRoute("/pedidos")({
  head: () => ({
    meta: [
      { title: "Faça seu Pedido — Cyntia Rinaldi Doces" },
      {
        name: "description",
        content:
          "Monte seu pedido de brigadeiros gourmet e doces personalizados artesanais em Bauru. Envio direto pelo WhatsApp.",
      },
      { property: "og:title", content: "Faça seu Pedido — Cyntia Rinaldi Doces" },
      {
        property: "og:description",
        content:
          "Escolha seus doces, personalize e finalize seu pedido pelo WhatsApp.",
      },
    ],
  }),
  component: OrderPage,
});
