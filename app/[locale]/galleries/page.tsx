import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
import Footer from "@/components/Footer";
import GalleriesPageContent from "@/components/GalleriesPageContent";
import type { Metadata } from "next";
import { kv } from "@vercel/kv";
import type { Gallery } from "@/lib/galleries";

export const revalidate = 30;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Galeries Photos Événements — Massishoots Montréal";
  const description = "Accédez à vos photos d'événements. Galeries privées Massishoots — studio photo premium à Montréal.";
  return {
    title,
    description,
    alternates: getAlternates("/galleries"),
    openGraph: getOpenGraph("fr", "/galleries", title, description),
    twitter: getTwitter(title, description),
  };
}

export default async function GalleriesPage() {
  let galleries: ReturnType<typeof mapGalleries> = [];
  try {
    const raw = ((await kv.get<Gallery[]>("galleries")) ?? []).filter(Boolean);
    galleries = mapGalleries(raw);
  } catch {
    galleries = [];
  }

  return (
    <>
      <GalleriesPageContent galleries={galleries} />
      <Footer />
    </>
  );
}

function mapGalleries(raw: Gallery[]) {
  return raw
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(g => ({
      nom: g.name,
      date: g.date,
      cover: g.cover,
      photos: g.photos,
      accessible: !g.password,
      url: !g.password ? g.pixiesetUrl : undefined,
    }));
}
