import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
import Footer from "@/components/Footer";
import PortfolioPageContent from "@/components/PortfolioPageContent";
import type { Metadata } from "next";
import { readdirSync, existsSync } from "fs";
import { join } from "path";
import { brandingClients } from "@/data/portfolio";

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

function scanClientFolder(slug: string) {
  const base = `portfolio/brand/${slug}`;
  const abs = join(process.cwd(), "public", base);
  if (!existsSync(abs)) return { cover: "", videos: [], photos: [] };

  const files = readdirSync(abs).filter(f => !f.startsWith(".")).sort();
  const cover = files.find(f => f.startsWith("cover") && IMG_EXT.test(f));
  const mp4s = files.filter(f => VID_EXT.test(f));
  const photos = files.filter(f => IMG_EXT.test(f) && !f.startsWith("cover") && !f.startsWith("facecam"));

  const videos = mp4s.map(f => {
    const base2 = f.replace(".mp4", "");
    const thumb = files.find(x => x.startsWith(base2) && IMG_EXT.test(x));
    return {
      src: `/${base}/${f}`,
      thumb: thumb ? `/${base}/${thumb}` : "",
      label: "Face Caméra",
    };
  });

  return {
    cover: cover ? `/${base}/${cover}` : (photos[0] ? `/${base}/${photos[0]}` : ""),
    videos,
    photos: photos.map(f => `/${base}/${f}`),
  };
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
      return { src: `/portfolio/videos/${f}`, thumb: thumb ? `/portfolio/videos/${thumb}` : "", label };
    });
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = "Portfolio — Massishoots | Personal Branding & Événements Montréal";
  const description = "Découvrez les réalisations de Massishoots : personal branding, couverture d'événements et vidéos cinématiques pour entrepreneurs et marques premium à Montréal.";
  return {
    title, description,
    alternates: getAlternates("/portfolio"),
    openGraph: getOpenGraph(locale, "/portfolio", title, description),
    twitter: getTwitter(title, description),
  };
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;

  const clients = brandingClients
    .filter(c => c.slug && c.client)
    .map(c => ({ ...c, media: scanClientFolder(c.slug) }))
    .filter(c => c.media.cover || c.media.photos.length > 0 || c.media.videos.length > 0);

  const data = {
    clients,
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
