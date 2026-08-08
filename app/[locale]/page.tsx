import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAlternates, getOpenGraph, getTwitter } from "@/lib/hreflang";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Stats from "@/components/Stats";
import Services from "@/components/Services";

const Portfolio     = dynamic(() => import("@/components/Portfolio"),      { ssr: false });
const Process       = dynamic(() => import("@/components/Process"),        { ssr: false });
const WhyUs         = dynamic(() => import("@/components/WhyUs"),          { ssr: false });
const Testimonials  = dynamic(() => import("@/components/Testimonials"),   { ssr: false });
const ClientResults = dynamic(() => import("@/components/ClientResults"),  { ssr: false });
const SimulateurCta = dynamic(() => import("@/components/SimulateurCta"),  { ssr: false });
const Faq           = dynamic(() => import("@/components/Faq"),            { ssr: false });
const CtaFinal      = dynamic(() => import("@/components/CtaFinal"),       { ssr: false });
const Footer        = dynamic(() => import("@/components/Footer"),         { ssr: false });

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
