import type { Metadata } from "next";
import SeoLocalLayout from "@/components/seo/SeoLocalLayout";

export const metadata: Metadata = {
  title: "Photographe Vieux-Montréal — Studio Premium | Massishoots",
  description: "Photographe et vidéaste dans le Vieux-Montréal. Massishoots crée du contenu cinématique premium pour marques et entrepreneurs. Réservez votre appel gratuit.",
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <SeoLocalLayout
      slug="photographe-vieux-montreal"
      badge="Studio Premium · Vieux-Montréal"
      h1={"Photographe &\nVidéaste Vieux-Montréal"}
      heroSubtitle="Contenu cinématique premium au cœur du Vieux-Montréal."
      heroDescription="Le Vieux-Montréal — l'élégance historique au service de votre image de marque. Massishoots utilise l'architecture unique du Vieux-Port comme toile de fond cinématique pour vos projets premium."
      heroImage="/portfolio/mariage/1.jpg"
      servicesSectionTitle="NOS SERVICES AU VIEUX-MONTRÉAL"
      services={[
        {
          icon: "💍",
          title: "Mariage & Événements de Prestige",
          desc: "Le Vieux-Montréal offre les plus beaux décors pour vos cérémonies et réceptions. Reportage photo et vidéo cinématique dans les lieux les plus élégants de la ville.",
        },
        {
          icon: "🏨",
          title: "Hôtels & Restaurants Gastronomiques",
          desc: "Mise en valeur de vos espaces, de votre ambiance et de votre offre. Du contenu haut de gamme pour une clientèle exigeante qui choisit sur Instagram.",
        },
        {
          icon: "✨",
          title: "Luxury Personal Branding",
          desc: "Séances photo dans les ruelles pavées, cours intérieures et bords de fleuve du Vieux-Port. Un personal branding qui reflète votre niveau d'excellence.",
        },
        {
          icon: "🎬",
          title: "Vidéo Cinématique Premium",
          desc: "Films de marque et aftermovies événementiels avec l'architecture du Vieux-Montréal en toile de fond. Un rendu qui inspire confiance et désir.",
        },
      ]}
      whyLabel="— L'avantage du Vieux-Montréal"
      whyTitle="POURQUOI MASSISHOOTS AU VIEUX-MONTRÉAL"
      arguments={[
        {
          icon: "🪨",
          title: "Décors naturels uniques & inimitables",
          desc: "Pavés centenaires, façades en pierre grise, fleuve Saint-Laurent, lanternes dorées — le Vieux-Montréal est un studio naturel à ciel ouvert pour du contenu haut de gamme.",
        },
        {
          icon: "💎",
          title: "Idéal pour le luxe et l'haut de gamme",
          desc: "Personal branding de dirigeants, campagnes pour marques de luxe, événements privés — notre esthétique s'aligne parfaitement avec les exigences du marché premium.",
        },
        {
          icon: "🍾",
          title: "Hôtels, gastronomie & marques d'exception",
          desc: "On collabore avec des établissements hôteliers, des restaurants étoilés et des marques premium. On sait comment mettre en valeur l'excellence sans en faire trop.",
        },
      ]}
      ctaTitle="VOTRE MARQUE MÉRITE UN ÉCRIN À SA MESURE"
      ctaSubtitle="Le Vieux-Montréal comme scène. Votre histoire, notre regard."
      ctaText="Un appel de 30 minutes pour explorer comment les décors uniques du Vieux-Port peuvent amplifier votre image de marque et transformer votre présence visuelle en ligne."
      otherNeighborhoods={[
        { label: "Photographe Montréal", href: "/photographe-montreal" },
        { label: "Photographe Griffintown", href: "/photographe-griffintown" },
        { label: "Photographe Plateau-Mont-Royal", href: "/photographe-plateau-montreal" },
      ]}
      schemaAreaServed="Vieux-Montréal, Montréal, Québec"
    />
  );
}
