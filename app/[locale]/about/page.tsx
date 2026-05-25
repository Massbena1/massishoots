import { getTranslations } from "next-intl/server";
import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    alternates: getAlternates("/about"),
    openGraph: getOpenGraph(locale, "/about", title, description),
    twitter: getTwitter(title, description),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.page" });

  return (
    <main>
      <PageHeader
        label={t("label")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <About />
      <Stats />
      <Footer />
    </main>
  );
}
