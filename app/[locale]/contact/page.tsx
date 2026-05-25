import { getTranslations } from "next-intl/server";
import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    alternates: getAlternates("/contact"),
    openGraph: getOpenGraph(locale, "/contact", title, description),
    twitter: getTwitter(title, description),
  };
}

export default function ContactPage() {
  return (
    <main>
      <Contact />
      <Footer />
    </main>
  );
}
