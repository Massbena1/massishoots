import { getTranslations } from "next-intl/server";
import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.portfolio" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    alternates: getAlternates("/portfolio"),
    openGraph: getOpenGraph(locale, "/portfolio", title, description),
    twitter: getTwitter(title, description),
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio.page" });

  return (
    <main>
      <PageHeader
        label={t("label")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <Portfolio />
      <Footer />
    </main>
  );
}
