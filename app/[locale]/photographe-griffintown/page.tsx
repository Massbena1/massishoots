import type { Metadata } from "next";
import SeoLocalLayout from "@/components/seo/SeoLocalLayout";

export const metadata: Metadata = {
  title: "Photographe Griffintown Montréal — Massishoots Studio Premium",
  description: "Photographe et vidéaste à Griffintown, Montréal. Massishoots crée du contenu premium pour entrepreneurs et marques du quartier. Réservez votre appel gratuit.",
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <SeoLocalLayout
      slug="photographe-griffintown"
      badge="Studio Premium · Griffintown"
      h1={"Photographe &\nVidéaste Griffintown, Montréal"}
      heroSubtitle="Contenu cinématique pour entrepreneurs et marques basés à Griffintown."
      heroDescription="Griffintown — le quartier le plus dynamique de Montréal pour les entrepreneurs et startups. Massishoots crée le contenu visuel qui reflète l'ambition et l'énergie de votre marque."
      heroImage="/portfolio/corpo/1.1.jpg"
      servicesSectionTitle="NOS SERVICES À GRIFFINTOWN"
      services={[
        {
          icon: "💻",
          title: "Contenu pour Startups & Tech",
          desc: "Photos et vidéos corporate qui reflètent l'ambition des équipes tech de Griffintown — team shots, culture d'entreprise, pitch decks visuels.",
        },
        {
          icon: "🎬",
          title: "Vidéo de Présentation",
          desc: "Films corporate tournés dans les lofts et espaces industriels-chic de Griffintown. Une esthétique moderne qui dit tout de votre positionnement.",
        },
        {
          icon: "📣",
          title: "Publicité & Contenu Social",
          desc: "Visuels et vidéos conçus pour LinkedIn, Meta et Instagram. Formés aux besoins des marques B2B et DTC actives à Griffintown.",
        },
        {
          icon: "👤",
          title: "Personal Branding & Headshots",
          desc: "Portraits professionnels pour fondateurs, dirigeants et freelances. Shooting en studio ou dans les espaces de coworking du secteur.",
        },
      ]}
      whyLabel="— Ce qui nous distingue à Griffintown"
      whyTitle="POURQUOI MASSISHOOTS GRIFFINTOWN"
      arguments={[
        {
          icon: "🏗️",
          title: "Architecture industrielle-chic maîtrisée",
          desc: "Béton, brique, grandes fenêtres, lumière diffuse — on connaît les décors de Griffintown et on sait les exploiter pour créer du contenu esthétique et distinctif.",
        },
        {
          icon: "🚀",
          title: "Clients startups tech & agences créatives",
          desc: "On a déjà travaillé avec des équipes tech, des agences et des lofts créatifs du secteur. On parle votre langue et on comprend vos enjeux de marque.",
        },
        {
          icon: "📅",
          title: "Disponibilités prioritaires pour le secteur",
          desc: "Les clients basés à Griffintown bénéficient de créneaux prioritaires. Moins de déplacement, plus de réactivité, tournage possible le jour même.",
        },
      ]}
      ctaTitle="VOTRE STARTUP MÉRITE DU CONTENU À SA HAUTEUR"
      ctaSubtitle="30 minutes pour bâtir votre stratégie visuelle."
      ctaText="On discute de votre marque, de vos objectifs et on vous propose un plan de contenu concret adapté à l'énergie de Griffintown et aux attentes de votre audience."
      otherNeighborhoods={[
        { label: "Photographe Montréal", href: "/photographe-montreal" },
        { label: "Photographe Plateau-Mont-Royal", href: "/photographe-plateau-montreal" },
        { label: "Photographe Vieux-Montréal", href: "/photographe-vieux-montreal" },
      ]}
      schemaAreaServed="Griffintown, Montréal, Québec"
    />
  );
}
