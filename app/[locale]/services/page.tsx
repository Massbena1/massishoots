import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
import Footer from "@/components/Footer";
import ServicesPageContent from "@/components/ServicesPageContent";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Nos Services — Studio Photo & Vidéo Premium | Massishoots Montréal";
  const description = "Contenu mensuel, événements, publicité et mariage à Montréal. Massishoots crée du contenu cinématique sur mesure pour entrepreneurs et marques premium. Réservez votre appel gratuit.";
  return {
    title,
    description,
    alternates: getAlternates("/services"),
    openGraph: getOpenGraph(locale, "/services", title, description),
    twitter: getTwitter(title, description),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return (
    <>
      <ServicesPageContent />
      <Footer />
    </>
  );
}
