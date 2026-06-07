import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import ClientResults from "@/components/ClientResults";
import SimulateurCta from "@/components/SimulateurCta";
import Faq from "@/components/Faq";
import CtaFinal from "@/components/CtaFinal";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  const title = t("title");
  const description = t("description");
  const keywords = t("keywords");
  return {
    title,
    description,
    keywords,
    alternates: getAlternates(""),
    openGraph: getOpenGraph(locale, "", title, description),
    twitter: getTwitter(title, description),
  };
}

function Divider() {
  return <hr className="section-divider" />;
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Clients />
      <Stats />
      <Divider />
      <Services />
      <Portfolio />
      <Divider />
      <Process />
      <WhyUs />
      <Divider />
      <ClientResults />
      <Testimonials />
      <Divider />
      <SimulateurCta />
      <Faq />
      <CtaFinal />
      <Footer />
    </main>
  );
}
