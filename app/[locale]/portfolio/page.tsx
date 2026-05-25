import { getTranslations } from "next-intl/server";
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
  return { title: t("title"), description: t("description") };
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
