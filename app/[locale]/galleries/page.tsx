import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
import Footer from "@/components/Footer";
import GalleriesPageContent from "@/components/GalleriesPageContent";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Galeries Photos Événements — Massishoots Montréal";
  const description = "Accédez à vos photos d'événements avec votre code personnel. Galeries privées Massishoots — studio photo premium à Montréal.";
  return {
    title,
    description,
    alternates: getAlternates("/galleries"),
    openGraph: getOpenGraph("fr", "/galleries", title, description),
    twitter: getTwitter(title, description),
  };
}

export default function GalleriesPage() {
  return (
    <>
      <GalleriesPageContent />
      <Footer />
    </>
  );
}
