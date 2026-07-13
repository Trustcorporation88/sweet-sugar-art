import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/pages/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cyntia Rinaldi Doces — Doces Premium Artesanais em Bauru" },
      {
        name: "description",
        content:
          "Doces premium feitos à mão em Bauru. Brigadeiros gourmet, bolos personalizados e tortas artesanais para eventos e presentes.",
      },
      { property: "og:title", content: "Cyntia Rinaldi Doces — Doces Premium Artesanais em Bauru" },
      {
        property: "og:description",
        content: "Doces premium artesanais para eventos e presentes. Bauru e região.",
      },
    ],
  }),
  component: HomePage,
});
