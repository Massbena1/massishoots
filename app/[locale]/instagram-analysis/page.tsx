import { getTranslations } from "next-intl/server";
import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
import AnalyseInstagram from "@/components/AnalyseInstagram";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.analyseInstagram" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    alternates: getAlternates(locale === "fr" ? "/analyse-instagram" : "/instagram-analysis"),
    openGraph: getOpenGraph(locale, locale === "fr" ? "/analyse-instagram" : "/instagram-analysis", title, description),
    twitter: getTwitter(title, description),
  };
}

export default function InstagramAnalysisPage() {
  return (
    <main>
      <AnalyseInstagram />
      <Footer />
    </main>
  );
}