import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
import Footer from "@/components/Footer";
import PortfolioPageContent from "@/components/PortfolioPageContent";
import type { Metadata } from "next";
import { readdirSync } from "fs";
import { join } from "path";

const IMG_EXT = /\.(jpg|jpeg|JPG|png|webp)$/;
const VID_EXT = /\.mp4$/;

function scanDir(rel: string): string[] {
  try {
    const abs = join(process.cwd(), "public", rel);
    return readdirSync(abs)
      .filter(f => IMG_EXT.test(f))
      .sort()
      .map(f => `/${rel}/${f}`);
  } catch { return []; }
}

function scanVideos() {
  try {
    const abs = join(process.cwd(), "public/portfolio/videos");
    const files = readdirSync(abs);
    const mp4s = files.filter(f => VID_EXT.test(f)).sort();
    return mp4s.map(f => {
      const base = f.replace(".mp4", "");
      const thumb = files.find(x => x.startsWith(base) && IMG_EXT.test(x));
      const label = f.includes("facecam") ? "Face Caméra"
        : f.includes("brand") ? "Branding"
        : f.includes("event") ? "Événement"
        : f.includes("corpo") ? "Corporate"
        : "Vidéo";
      return {
        src: `/portfolio/videos/${f}`,
        thumb: thumb ? `/portfolio/videos/${thumb}` : "",
        label,
      };
    });
  } catch { return []; }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Portfolio — Massishoots | Personal Branding & Événements Montréal";
  const description = "Découvrez les réalisations de Massishoots : personal branding, couverture d'événements et vidéos cinématiques pour entrepreneurs et marques premium à Montréal.";
  return {
    title,
    description,
    alternates: getAlternates("/portfolio"),
    openGraph: getOpenGraph(locale, "/portfolio", title, description),
    twitter: getTwitter(title, description),
  };
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  const data = {
    brand: scanDir("portfolio/brand"),
    eventt: scanDir("portfolio/eventt"),
    videos: scanVideos(),
    corpo: scanDir("portfolio/corpo"),
    lyfestyle: scanDir("portfolio/lyfestyle"),
    mariage: scanDir("portfolio/mariage"),
    professionel: scanDir("portfolio/professionel"),
  };

  return (
    <>
      <PortfolioPageContent data={data} />
      <Footer />
    </>
  );
}
