import { getTranslations } from "next-intl/server";
import Footer from "@/components/Footer";
import TarifsHero from "@/components/TarifsHero";
import TarifsExpertise from "@/components/TarifsExpertise";
import TarifsWhy from "@/components/TarifsWhy";
import TarifsStats from "@/components/TarifsStats";
import TarifsCTA from "@/components/TarifsCTA";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const description = "Massishoots propose des offres sur mesure en photo, vidéo, contenu mensuel et couverture d'événements à Montréal. Réservez un appel gratuit de 30 minutes pour discuter de votre projet.";
  return {
    title: "Tarifs & Services — Massishoots | Studio Photo & Vidéo Premium Montréal",
    description,
    openGraph: {
      title: "Tarifs — Massishoots Studio Premium Montréal",
      description,
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      type: "website",
    },
  };
}

export default async function TarifsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return (
    <>
      <TarifsHero />
      <TarifsExpertise />
      <TarifsWhy />
      <TarifsStats />
      <TarifsCTA />
      <Footer />
    </>
  );
}
