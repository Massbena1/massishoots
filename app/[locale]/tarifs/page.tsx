import { getTranslations } from "next-intl/server";
import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
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
  const title = "Tarifs & Offres Sur Mesure — Massishoots Montréal";
  const description = "Offres personnalisées en photo et vidéo premium à Montréal. Réservez un appel gratuit de 30 minutes avec Massi.";
  return {
    title,
    description,
    alternates: getAlternates("/tarifs"),
    openGraph: getOpenGraph(locale, "/tarifs", title, description),
    twitter: getTwitter(title, description),
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
