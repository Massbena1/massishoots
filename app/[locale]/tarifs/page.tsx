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
  return {
    title: "Tarifs | Massishoots — Studio Photo & Vidéo Montréal",
    description:
      "Des offres sur mesure adaptées à vos objectifs. Contenu mensuel, événements, publicité et mariages — investissement selon votre projet.",
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
