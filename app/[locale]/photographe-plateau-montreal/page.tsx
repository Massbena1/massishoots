import type { Metadata } from "next";
import SeoLocalLayout from "@/components/seo/SeoLocalLayout";

export const metadata: Metadata = {
  title: "Photographe Plateau-Mont-Royal Montréal — Massishoots",
  description: "Photographe et vidéaste sur le Plateau-Mont-Royal à Montréal. Contenu premium pour marques créatives et entrepreneurs. Massishoots — réservez votre appel gratuit.",
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <SeoLocalLayout
      slug="photographe-plateau-montreal"
      badge="Studio Premium · Plateau-Mont-Royal"
      h1={"Photographe &\nVidéaste Plateau-Mont-Royal, Montréal"}
      heroSubtitle="Contenu cinématique pour marques créatives et entrepreneurs du Plateau."
      heroDescription="Le Plateau-Mont-Royal — quartier de la créativité, de la culture et des marques qui ont du caractère. Massishoots traduit votre identité unique en contenu visuel qui vous ressemble."
      heroImage="/portfolio/lyfestyle/1.jpg"
      servicesSectionTitle="NOS SERVICES AU PLATEAU-MONT-ROYAL"
      services={[
        {
          icon: "🍽️",
          title: "Photo & Vidéo Restaurants & Cafés",
          desc: "Mise en valeur de votre ambiance, de votre carte et de l'expérience client. On capte l'âme de votre établissement pour attirer une clientèle fidèle sur Instagram.",
        },
        {
          icon: "🧍",
          title: "Personal Branding & Portrait",
          desc: "Séances photo en intérieur ou en extérieur sur les rues iconiques du Plateau. Des portraits authentiques qui reflètent qui vous êtes vraiment.",
        },
        {
          icon: "🎉",
          title: "Événements & Lancements",
          desc: "Vernissages, pop-ups, soirées de lancement — on documente vos moments avec une esthétique qui colle à l'énergie du quartier.",
        },
        {
          icon: "📱",
          title: "Contenu Mensuel pour Entrepreneurs",
          desc: "Un forfait récurrent pour alimenter vos réseaux toute l'année. Shooting mensuel au Plateau, contenu livré et prêt à publier.",
        },
      ]}
      whyLabel="— Ce qui nous distingue au Plateau"
      whyTitle="POURQUOI MASSISHOOTS AU PLATEAU"
      arguments={[
        {
          icon: "🌆",
          title: "Shootings sur les rues iconiques",
          desc: "Avenue Mont-Royal, rue Saint-Denis, parc Lafontaine — on maîtrise les lumières et les angles du Plateau pour créer des visuels qui résonnent avec l'identité du quartier.",
        },
        {
          icon: "🏪",
          title: "Restaurants, boutiques & artistes locaux",
          desc: "On comprend les besoins spécifiques des commerces de proximité et des créateurs indépendants du Plateau. Du contenu qui raconte votre histoire sans faux-semblant.",
        },
        {
          icon: "🎞️",
          title: "Esthétique qui capture l'âme du quartier",
          desc: "Chaleur, authenticité, grain cinématique — notre approche visuelle s'adapte à l'identité créative et humaine du Plateau-Mont-Royal.",
        },
      ]}
      ctaTitle="RACONTEZ VOTRE MARQUE AVEC LES MOTS DU PLATEAU"
      ctaSubtitle="Un appel pour construire votre identité visuelle."
      ctaText="Que vous soyez restaurateur, artiste, entrepreneur ou boutique, on crée ensemble le contenu qui vous représente honnêtement et qui convertit sur les réseaux."
      otherNeighborhoods={[
        { label: "Photographe Montréal", href: "/photographe-montreal" },
        { label: "Photographe Griffintown", href: "/photographe-griffintown" },
        { label: "Photographe Vieux-Montréal", href: "/photographe-vieux-montreal" },
      ]}
      schemaAreaServed="Plateau-Mont-Royal, Montréal, Québec"
    />
  );
}
