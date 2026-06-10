import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
import Footer from "@/components/Footer";
import PortfolioPageContent from "@/components/PortfolioPageContent";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Portfolio — Massishoots | Studio Photo & Vidéo Premium Montréal";
  const description = "Découvrez les réalisations de Massishoots : événements, personal branding, mariages et publicité à Montréal. Contenu cinématique pour marques et entrepreneurs premium.";
  return {
    title,
    description,
    alternates: getAlternates("/portfolio"),
    openGraph: getOpenGraph(locale, "/portfolio", title, description),
    twitter: getTwitter(title, description),
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return (
    <>
      <PortfolioPageContent />
      <Footer />
    </>
  );
}
