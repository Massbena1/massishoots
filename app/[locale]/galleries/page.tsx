import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
import { kv } from "@vercel/kv";
import Galleries from "@/components/Galleries";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";
import type { Gallery } from "@/lib/galleries";

export const revalidate = 0;

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

export default async function GalleriesPage() {
  let galleries: Gallery[] = [];
  try {
    galleries = (await kv.get<Gallery[]>("galleries")) ?? [];
  } catch {
    galleries = [];
  }

  return (
    <main>
      <PageHeader
        label="Vos photos"
        title="Galeries privées"
        subtitle="Retrouvez les photos de votre événement. Accès sécurisé, téléchargement inclus."
      />
      <Galleries initialGalleries={galleries} />
      <Footer />
    </main>
  );
}
