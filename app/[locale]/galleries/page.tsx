import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
import Galleries from "@/components/Galleries";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Galeries Photos — Retrouvez vos photos d'événement | Massishoots";
  const description = "Accédez à vos photos d'événement, mariage ou corporate. Galeries privées sécurisées, téléchargement inclus.";
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
    <main>
      <PageHeader
        label="Vos photos"
        title="Galeries privées"
        subtitle="Retrouvez les photos de votre événement. Accès sécurisé, téléchargement inclus."
      />
      <Galleries />
      <Footer />
    </main>
  );
}
