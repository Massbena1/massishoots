import { getTranslations } from "next-intl/server";
import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
import AnalyseInstagramV2 from "@/components/AnalyseInstagramV2";
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

export default function AnalyseInstagramPage() {
  return (
    <main>
      <AnalyseInstagramV2 />
      <Footer />
    </main>
  );
}