import type { Metadata } from "next";
import SeoLocalLayout from "@/components/seo/SeoLocalLayout";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Photographe Montréal — Studio Photo & Vidéo Premium | Massishoots",
  description: "Massishoots, photographe et vidéaste premium à Montréal. Contenu mensuel, événements, mariages. 50+ marques accompagnées. Devis gratuit sous 24h.",
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <SeoLocalLayout
      slug="photographe-montreal"
      badge="Studio Premium · Montréal"
      h1={"Photographe &\nVidéaste Montréal"}
      heroSubtitle="Contenu cinématique pour entrepreneurs et marques basés à Montréal."
      heroDescription="Basé à Montréal, Massishoots accompagne les entrepreneurs et marques de la métropole avec du contenu visuel qui performe sur Instagram et au-delà. 50+ clients montréalais accompagnés."
      heroImage="/portfolio/eventt/1.jpg"
      servicesSectionTitle="NOS SERVICES À MONTRÉAL"
      services={[
        {
          icon: "📸",
          title: "Contenu Mensuel",
          desc: "Un forfait mensuel clés en main pour alimenter vos réseaux sociaux avec du contenu professionnel tourné à Montréal — photos, reels et vidéos adaptés à votre marque.",
        },
        {
          icon: "🎬",
          title: "Couverture Événements",
          desc: "Galas, lancements, conférences et soirées d'entreprise partout à Montréal. On capte l'énergie du moment pour que vos photos durent bien après l'événement.",
        },
        {
          icon: "📣",
          title: "Publicité & Ads",
          desc: "Vidéos et visuels conçus pour performer sur Meta Ads. Tournage à Montréal, montage optimisé pour la conversion — contenu qui vend.",
        },
        {
          icon: "💍",
          title: "Mariage & Célébrations",
          desc: "Reportage photo et vidéo de mariage dans tous les lieux de réception montréalais. Esthétique cinématique, mémoire éternelle.",
        },
      ]}
      whyLabel="— Pourquoi nous choisir"
      whyTitle="MASSISHOOTS À MONTRÉAL"
      arguments={[
        {
          icon: "🚗",
          title: "Studio mobile — on vient à vous",
          desc: "Peu importe le quartier — Rosemont, NDG, Côte-des-Neiges, Outremont — on se déplace avec tout l'équipement pour shooter là où votre marque vit.",
        },
        {
          icon: "🤝",
          title: "Réseau établi dans toute la ville",
          desc: "50+ clients accompagnés dans tous les secteurs de Montréal. On connaît les lieux, les lumières et les contextes qui font de belles images dans chaque quartier.",
        },
        {
          icon: "⚡",
          title: "Disponible 7j/7 pour vos urgents",
          desc: "Besoin de contenu pour demain ? On s'adapte à votre agenda. Livraison express en 24-48h pour les projets urgents.",
        },
      ]}
      ctaTitle="VOTRE PROJET MÉRITE LE MEILLEUR CONTENU"
      ctaSubtitle="Un appel de 30 minutes pour tout définir."
      ctaText="On discute de vos objectifs, on vous propose une stratégie visuelle sur mesure, et on démarre la semaine même si vous le souhaitez."
      otherNeighborhoods={[
        { label: "Photographe Griffintown", href: "/photographe-griffintown" },
        { label: "Photographe Plateau-Mont-Royal", href: "/photographe-plateau-montreal" },
        { label: "Photographe Vieux-Montréal", href: "/photographe-vieux-montreal" },
      ]}
      schemaAreaServed="Montréal, Québec"
    />
  );
}
