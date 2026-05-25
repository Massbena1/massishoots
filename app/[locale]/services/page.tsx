import { getTranslations } from "next-intl/server";
import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.services" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    alternates: getAlternates("/services"),
    openGraph: getOpenGraph(locale, "/services", title, description),
    twitter: getTwitter(title, description),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.page" });

  return (
    <main>
      <PageHeader
        label={t("label")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <Services />
      <Process />
      <Footer />
    </main>
  );
}
