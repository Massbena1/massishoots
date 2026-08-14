import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
import Footer from "@/components/Footer";
import PortfolioPageContent from "@/components/PortfolioPageContent";
import type { Metadata } from "next";
import { readdirSync, existsSync } from "fs";
import { join } from "path";
import { brandingClients, eventProjects } from "@/data/portfolio";

const CF = "https://videodelivery.net";

const IMG_EXT = /\.(jpg|jpeg|JPG|png|webp)$/;

// Cloudflare Stream UIDs — mapped by original filename
const CF_UIDS: Record<string, string> = {
  "andrea-facecam-1": "3c43f95647720c6ad1fe37966a414152",
  "andrea-facecam-2": "366b95359a582484e385412eb86b5b9e",
  "andrea-facecam-3": "bdc3ee9f89f35c1f6dc48db673adcedf",
  "stephanie-facecam-1": "4851e3847ff9c4641554b6e5cf30a7fa",
  "stephanie-facecam-2": "d9988064eebd3bff8b2a71cd3ee409d9",
  "stephanie-facecam-3": "9b1d002b6177b60edd34c3d27ecd7723",
  "stephanie-facecam-4": "77d815ef017004c0b72dd7d2a0b21155",
  "stephanie-facecam-5": "0fcef21c0ca3660cee3ae0593178b11c",
  "laura-facecam-1": "6d9eb82bb841a02a2173c8ff15ece8e4",
  "laura-facecam-2": "4df46c15b1d58b593679cd50c62d3268",
  "laura-facecam-3": "2d73c832cd265f13accd9ff43100dd6a",
  "laura-facecam-4": "b5b69e4ae658db4275b70ecf8abacca9",
  "laura-facecam-5": "e9f30e14ae97bfb0da15db0eaaef0524",
  "christine-facecam-1": "8d388f7dbb4d0d5a9e74e336578ab309",
  "christine-facecam-2": "4a7b51be3f8a7d54904cd70c6a02683b",
  "christine-facecam-3": "e81f5faae8d7dc97bba8704f97fa246f",
  "brand-1": "02a9f535b9271e28d437b6fb66bdee5b",
  "brand-2": "c0c16bda3a89ddf03e0a2a3d76310cad",
  "brand-3": "0e853f3e0c60d620766dc71153d0ab65",
  "corpo-1": "0e03e8088bc55d14185e37a239bb708b",
  "corpo-2": "ccfa7b3c618bc1e453b56b84ccabddf2",
  "event-1": "423422c9fc06fd4ab1512c2cfe7363ff",
  "event-1.1": "33d605a96ed11dd86c65cd224311b9c5",
  "event-2": "c3763e9534f9dda9c21623e5405e3f76",
  "facecam-1": "1a703ddc9bc010e47c50d76973ae186d",
  "facecam-2": "0b9170bfb757c4236c15a31e514bf7f4",
  "facecam-3": "0d7c513506d89cdfbd7b205883ea204f",
  "facecam-4": "0f6fb704c5de599e5d9b030adbb57352",
  "facecam-5": "6b98229299ebed639830da2c7af71213",
  "facecam-6": "4f6eeb2539fce6617be55227f4786c2d",
};

function cfUrl(uid: string) {
  return `${CF}/${uid}/iframe`;
}
function cfThumb(uid: string) {
  return `${CF}/${uid}/thumbnails/thumbnail.jpg?time=1s&height=400`;
}

function scanDir(rel: string): string[] {
  try {
    const abs = join(process.cwd(), "public", rel);
    return readdirSync(abs)
      .filter(f => IMG_EXT.test(f))
      .sort()
      .map(f => `/${rel}/${f}`);
  } catch { return []; }
}

function scanEventFolder(folder: string): string[] {
  const rel = `portfolio/eventt/${folder}`;
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
  const photos = files.filter(f => IMG_EXT.test(f) && !f.startsWith("cover") && !f.startsWith("facecam"));

  // Build videos from Cloudflare Stream UIDs for this client
  const clientVideos = Object.entries(CF_UIDS)
    .filter(([key]) => key.startsWith(`${slug.trim().toLowerCase()}-facecam`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, uid]) => ({
      src: cfUrl(uid),
      thumb: cfThumb(uid),
      label: "Face Caméra",
      isStream: true,
    }));

  return {
    cover: cover ? `/${base}/${cover}` : (photos[0] ? `/${base}/${photos[0]}` : ""),
    videos: clientVideos,
    photos: photos.map(f => `/${base}/${f}`),
  };
}

function scanVideos() {
  const entries: { key: string; label: string }[] = [
    { key: "facecam-1", label: "Face Caméra" },
    { key: "facecam-2", label: "Face Caméra" },
    { key: "facecam-3", label: "Face Caméra" },
    { key: "facecam-4", label: "Face Caméra" },
    { key: "facecam-5", label: "Face Caméra" },
    { key: "facecam-6", label: "Face Caméra" },
    { key: "brand-1", label: "Branding" },
    { key: "brand-2", label: "Branding" },
    { key: "brand-3", label: "Branding" },
    { key: "event-1", label: "Événement" },
    { key: "event-1.1", label: "Événement" },
    { key: "event-2", label: "Événement" },
    { key: "corpo-1", label: "Corporate" },
    { key: "corpo-2", label: "Corporate" },
  ];
  return entries
    .filter(e => CF_UIDS[e.key])
    .map(e => ({
      src: cfUrl(CF_UIDS[e.key]),
      thumb: cfThumb(CF_UIDS[e.key]),
      label: e.label,
      isStream: true,
    }));
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

  const eventsWithPhotos = eventProjects.map(ev => ({
    ...ev,
    photos: ev.photoFolder ? scanEventFolder(ev.photoFolder) : [],
  }));

  const data = {
    clients,
    events: eventsWithPhotos,
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
