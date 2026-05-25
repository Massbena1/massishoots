import { getTranslations } from "next-intl/server";
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
  return { title: t("title"), description: t("description") };
}

export default function ContactPage() {
  return (
    <main>
      <Contact />
      <Footer />
    </main>
  );
}
