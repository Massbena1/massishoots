import type { Metadata } from "next";
import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
import SimulateurClient from "@/components/SimulateurClient";

const title = "Simulateur IA Gratuit — 3 Idées de Reels pour votre Business | Massishoots";
const description = "Générez 3 idées de Reels personnalisées pour votre secteur en 10 secondes grâce à notre simulateur IA gratuit. Propulsé par Massishoots, studio vidéo premium à Montréal.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title,
    description,
    alternates: getAlternates("/simulateur"),
    openGraph: getOpenGraph(locale, "/simulateur", title, description),
    twitter: getTwitter(title, description),
  };
}

export default function SimulateurPage() {
  return <SimulateurClient />;
}
