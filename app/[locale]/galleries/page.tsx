import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
import Footer from "@/components/Footer";
import GalleriesPageContent from "@/components/GalleriesPageContent";
import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";

export const revalidate = 60;

interface GalleryEntry {
  nom: string;
  url?: string;
  code?: string;
  date: string;
  actif: boolean;
  public?: boolean;
  cover?: string;
  photos?: number;
}

function loadGalleries() {
  try {
    const raw = readFileSync(join(process.cwd(), "data", "galleries.json"), "utf-8");
    const all: GalleryEntry[] = JSON.parse(raw);
    return all
      .filter(g => g.actif)
      .sort((a, b) => b.date.localeCompare(a.date))
      .map(({ nom, url, date, cover, photos, public: pub }) => ({
        nom, date, cover, photos,
        accessible: !!pub,
        url: pub ? url : undefined,
      }));
  } catch {
    return [];
  }
}

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

export default function GalleriesPage() {
  const galleries = loadGalleries();
  return (
    <>
      <GalleriesPageContent galleries={galleries} />
      <Footer />
    </>
  );
}
