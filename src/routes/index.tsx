import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/pages/HomePage";

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "Cyntia Rinaldi Doces",
  description:
    "Doces premium feitos à mão em Bauru. Brigadeiros gourmet, bolos personalizados e tortas artesanais para eventos e presentes.",
  url: "https://cyntiarinaldidoces.com",
  email: "cyntia@cyntiarinaldidoces.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bauru",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  areaServed: "Bauru e região",
  priceRange: "$$",
  servesCuisine: "Doces e Confeitaria",
  sameAs: [
    "https://www.instagram.com/cyntiarinaldidoces",
    "https://www.facebook.com/cyntiarinaldidoces",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "120",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "19:00",
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cyntia Rinaldi Doces — Brigadeiros Gourmet e Bolos Personalizados em Bauru" },
      {
        name: "description",
        content:
          "Encomende brigadeiros gourmet, bolos personalizados, tortas e doces finos feitos à mão em Bauru/SP. Monte seu pedido online e finalize pelo WhatsApp.",
      },
      { property: "og:title", content: "Cyntia Rinaldi Doces — Doces Premium Artesanais em Bauru" },
      {
        property: "og:description",
        content:
          "Brigadeiros gourmet, bolos personalizados e tortas artesanais — feitos à mão em Bauru. Encomendas abertas para eventos e presentes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cyntiarinaldidoces.com" },
      { property: "og:locale", content: "pt_BR" },
      { name: "keywords", content: "brigadeiros gourmet, bolos personalizados, doces finos, confeitaria Bauru, encomenda doces, torta frutas vermelhas, mesa de doces, Cyntia Rinaldi" },
    ],
    links: [
      { rel: "canonical", href: "https://cyntiarinaldidoces.com" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(businessJsonLd),
      },
    ],
  }),
  component: HomePage,
});
